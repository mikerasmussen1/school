/* Tutor — the model call behind Dynamic Difficulty.
 * ---------------------------------------------------------------------------
 * When a set closes below the bar, the attempt log is handed to the model and
 * it comes back with three things:
 *
 *   1. a proficiency read: what went well, what did not, in plain words
 *   2. a concept slug naming the one thing to fix
 *   3. a lesson (6–8 slides, two worked examples, concrete → abstract) and
 *      5–10 practice questions on that concept
 *
 * Everything it returns is validated before it is allowed near a child:
 * lessons through LessonBank.validate, questions through QTypes.validateSet.
 * One retry with the errors fed back, then it gives up and the round is
 * marked "needs you" rather than showing a broken lesson.
 *
 * Only auto-gradable types are allowed, so a round can close on its own:
 * short-answer, number-units, fill-blank.
 *
 * Plain script. Needs question-types.js and lessons.js. Exports window.Tutor.
 * ------------------------------------------------------------------------ */
(function(){

  const MODEL="gemini-flash-latest";
  // Sonnet 5 by default: this writes teaching material for a child, so quality
  // matters more than the per-call saving. Override `model` in the Firestore
  // config doc to switch — claude-haiku-4-5-20251001 is the cheaper option.
  const CLAUDE_MODEL="claude-sonnet-5";
  const ALLOWED=["short-answer","number-units","fill-blank"];
  const Q = () => window.QTypes;

  const Tutor = {
    apiKey:"",
    model:"",
    proxyUrl:"",
    /* A proxyUrl means the key lives on a server and the browser never holds
     * one — see worker/tutor-proxy.js. It takes precedence over any key, so a
     * config document carrying both cannot accidentally keep shipping the key
     * to clients. */
    workspaceId:"",
    configure(key, model, proxyUrl, workspaceId){
      this.apiKey=key||""; this.model=model||""; this.proxyUrl=proxyUrl||"";
      this.workspaceId=workspaceId||"";
      return this;
    },
    get enabled(){ return !!(this.proxyUrl || this.apiKey); },

    /* Provider is inferred from the key, so switching is a one-field edit in
     * Firestore with no deploy: an "sk-ant-" key routes to Anthropic, anything
     * else to Gemini. `model` can be overridden from the same document. */
    get provider(){ return /^sk-ant-/.test(this.apiKey) ? "anthropic" : "gemini"; },

    async _call(prompt){
      if(this.proxyUrl) return this._callProxy(prompt);
      return this.provider==="anthropic" ? this._callClaude(prompt) : this._callGemini(prompt);
    },

    /* Proxy mode: no credential leaves this file, because there is none here.
     * The Worker replies with Anthropic's own body, so the parsing below is
     * identical to _callClaude — including re-attaching the prefilled brace. */
    async _callProxy(prompt){
      const r=await fetch(this.proxyUrl,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({prompt:prompt, model:this.model||undefined})});
      if(!r.ok){
        let detail=""; try{ const e=await r.json(); detail=(e.error&&(e.error.message||e.error))||""; }catch(e){}
        try{ window.Diag && Diag.tutor("http-error", {provider:"proxy", status:r.status, detail:String(detail).slice(0,160)}); }catch(e){}
        throw new Error(r.status===429
          ? "The tutor is busy — try again in a little while."
          : "Tutor proxy "+r.status+(detail?": "+String(detail).slice(0,120):""));
      }
      const j=await r.json();
      const txt=((j.content||[]).find(c=>c.type==="text")||{}).text||"";
      return this._json("{"+txt);
    },

    async _callGemini(prompt){
      const body={contents:[{parts:[{text:prompt}]}],
        generationConfig:{response_mime_type:"application/json", temperature:0.4}};
      const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/"+
        (this.model||MODEL)+":generateContent?key="+this.apiKey,
        {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
      if(!r.ok){
        let detail=""; try{ detail=((await r.json()).error||{}).message||""; }catch(e){}
        try{ window.Diag && Diag.tutor("http-error", {provider:"gemini", status:r.status, detail:detail.slice(0,160)}); }catch(e){}
        throw new Error("Gemini "+r.status+(detail?": "+detail.slice(0,140):""));
      }
      const j=await r.json();
      const parts=(((j.candidates||[])[0]||{}).content||{}).parts;
      return this._json((parts&&parts[0]&&parts[0].text)||"{}");
    },

    async _callClaude(prompt){
      /* Identity-linked keys require anthropic-workspace-id and 400 without it;
       * workspace-scoped keys ignore it. Set `workspaceId` on the config doc if
       * calling Anthropic directly with the former. */
      /* anthropic-dangerous-direct-browser-access is REQUIRED: the API blocks
       * browser origins by default, and without it every call fails CORS. The
       * header name is a warning, not a formality — it exists because calling
       * this API from a browser means shipping a BILLED key to the client. */
      const r=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:Object.assign({"Content-Type":"application/json",
                 "x-api-key":this.apiKey,
                 "anthropic-version":"2023-06-01",
                 "anthropic-dangerous-direct-browser-access":"true"},
                 this.workspaceId?{"anthropic-workspace-id":this.workspaceId}:{}),
        body:JSON.stringify({
          model:this.model||CLAUDE_MODEL,
          max_tokens:4096,
          // No temperature: newer Claude models reject it with a 400,
          // "'temperature' is deprecated for this model". Same reason as the
          // worker proxy — see worker/tutor-proxy.js.
          // Prefill an opening brace so the reply starts as JSON rather than
          // "Here is the lesson:" — Claude has no response_mime_type.
          messages:[{role:"user",content:prompt},
                    {role:"assistant",content:"{"}]})});
      if(!r.ok){
        let detail=""; try{ detail=((await r.json()).error||{}).message||""; }catch(e){}
        try{ window.Diag && Diag.tutor("http-error", {provider:"anthropic", status:r.status, detail:detail.slice(0,160)}); }catch(e){}
        throw new Error("Claude "+r.status+(detail?": "+detail.slice(0,140):""));
      }
      const j=await r.json();
      const txt=((j.content||[]).find(c=>c.type==="text")||{}).text||"";
      return this._json("{"+txt);   // put the prefilled brace back
    },

    /* Tolerant JSON read. Gemini honours response_mime_type; Claude does not,
     * so a reply can arrive fenced in ```json or with a trailing sentence. */
    _json(text){
      let t=String(text||"").trim();
      t=t.replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/,"").trim();
      try{ return JSON.parse(t); }catch(e){}
      const a=t.indexOf("{"), b=t.lastIndexOf("}");
      if(a>=0 && b>a) return JSON.parse(t.slice(a,b+1));
      throw new Error("model did not return JSON");
    },

    _prompt(ctx, priorErrors){
      const {set, attempts, round, history, grade, childName, recovered} = ctx;
      const missed=attempts.filter(a=>a.ok===false);
      const got=attempts.filter(a=>a.ok===true);
      const tierName=["Warm-Up","Core","Challenge"];
      const lines=[
        "You are a patient elementary maths tutor writing for ONE child, "+(childName||"a student")+", working a year or two above grade level ("+(grade==="y5"?"5th grade":"3rd grade")+" curriculum).",
        "",
        "They have just finished a practice set and did not reach the bar.",
        "Set: "+(set.title||set.id)+(set.note?" — "+set.note:""),
        "",
        "Every answer they gave, in order (t is the tier: 0 Warm-Up, 1 Core, 2 Challenge):",
        JSON.stringify(attempts.map(a=>({q:a.q, they_answered:a.given, correct:a.exp, right:a.ok, t:a.t}))),
        "",
        "They got "+got.length+" right and missed "+missed.length+".",
        "The misses were mostly in: "+(missed.length?[...new Set(missed.map(m=>tierName[m.t==null?1:m.t]))].join(", "):"nothing"),
        ""
      ];
      if(round>1){
        lines.push("This is remediation ROUND "+round+" for the same set. Earlier rounds did not land:");
        lines.push(JSON.stringify((history||[]).map(h=>({round:h.n, concept:h.concept, lesson:h.title, score:h.score, approach:h.approach}))));
        lines.push("");
        lines.push("Do NOT repeat the earlier explanation. Change the REPRESENTATION, not the difficulty: if the last round used an area model, try equal groups, a number line, or physical objects. Use fewer, slower steps and fewer questions.");
        lines.push("");
      }
      lines.push(
        "Write the proficiency read for a parent-teacher: specific, calm, no praise inflation, no jargon. Also write one short line FOR THE CHILD, kind and plain, that names what to work on without making them feel behind.",
        "",
        "Then write a lesson that fixes the ONE concept most responsible for the misses:",
        "- 6 to 8 slides.",
        "- Slide kinds, in this order: one \"why\" (name what went wrong, gently), two or three \"teach\" (build the idea concretely first — objects, groups, a drawing — then abstract), TWO \"example\" slides worked all the way through with the arithmetic shown line by line, one \"your-turn\", one \"recap\".",
        "- Each slide: head (max 8 words), body (2–4 short sentences, second person), optional work (array of calculation lines, each a string, shown as a worked calculation), optional note (one short aside).",
        "- No emoji. No markdown. Plain sentences a 9-year-old reads comfortably.",
        "",
        "Then write 5 to 10 practice questions on that same concept, easiest first, ending harder than the child's misses.",
        "- Allowed types only: "+ALLOWED.join(", ")+".",
        "- short-answer: a is the exact answer string. number-units: a includes the unit, and set unit. fill-blank: q contains ___ for each blank and a is an array with one answer per blank.",
        "- Every question needs t (0, 1 or 2) and a hint that teaches rather than gives the answer away.",
        "- Do not reuse the exact questions they just missed. Same concept, different numbers.",
        "",
        "Respond with ONLY this JSON:",
        "{",
        "  \"needs_help\": true|false,",
        "  \"concept\": \"short-slug-naming-the-concept\",",
        "  \"concept_label\": \"Human readable concept name\",",
        "  \"approach\": \"one phrase naming the representation you used, e.g. equal groups on a number line\",",
        "  \"went_well\": \"1-2 sentences for the teacher\",",
        "  \"not_well\": \"1-2 sentences for the teacher\",",
        "  \"for_child\": \"one kind plain sentence for the child\",",
        "  \"lesson\": {\"title\": \"...\", \"slides\": [{\"kind\":\"why\",\"head\":\"...\",\"body\":\"...\",\"work\":[\"...\"],\"note\":\"...\"}]},",
        "  \"questions\": [{\"type\":\"short-answer\",\"t\":1,\"q\":\"...\",\"a\":\"...\",\"hint\":\"...\"}]",
        "}",
        "",
        (recovered
          ? "IMPORTANT: this run ended with five correct IN A ROW — they struggled early and then got there. Do NOT treat that as a gap they still have, and do NOT congratulate them for needing help. But needs_help MUST be true: write a SHORT consolidation lesson that locks in what they just worked out, using the representation that finally clicked, and fewer, easier questions than usual. Frame every word as building on a win, never as remediation."
          : "Set needs_help to false ONLY if the misses were careless slips on facts they clearly own; in that case still fill in went_well and not_well, and leave lesson and questions out.")
      );
      if(priorErrors&&priorErrors.length){
        lines.push("", "Your previous attempt was rejected by the validator. Fix exactly these problems and return the whole JSON again:", priorErrors.slice(0,12).join("\n"));
      }
      return lines.join("\n");
    },

    _shape(raw, ctx){
      const concept=String(raw.concept||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
      const items=(raw.questions||[]).map((q,i)=>({
        id:"gen-"+ctx.set.id+"-"+concept+"-r"+ctx.round+"-i"+(i+1),
        type:ALLOWED.indexOf(q.type)>=0?q.type:"short-answer",
        t:q.t==null?1:Math.max(0,Math.min(2,Number(q.t))),
        q:String(q.q||""), a:q.a, hint:String(q.hint||""),
        ...(q.unit?{unit:q.unit}:{})
      }));
      const lesson={
        id:"gen-"+ctx.set.id+"-"+concept+"-r"+ctx.round+"-"+Date.now().toString(36),
        setId:ctx.set.id, concept, source:"generated",
        title:String((raw.lesson&&raw.lesson.title)||raw.concept_label||"A closer look"),
        tier:ctx.tier==null?1:ctx.tier,
        slides:((raw.lesson&&raw.lesson.slides)||[]),
        items
      };
      return {
        needsHelp:raw.needs_help!==false,
        concept, conceptLabel:String(raw.concept_label||concept||"this skill"),
        approach:String(raw.approach||""),
        wentWell:String(raw.went_well||""), notWell:String(raw.not_well||""),
        forChild:String(raw.for_child||""),
        lesson, items
      };
    },

    /* ctx: {set, attempts, round, history, grade, childName, tier}
     * Returns {ok, needsHelp, summary, lesson, errors} — never throws. */
    async assess(ctx){
      if(!this.enabled) return {ok:false, errors:["no API key configured"]};
      let errors=[];
      for(let attempt=0; attempt<2; attempt++){
        let raw;
        try{ raw=await this._call(this._prompt(ctx, attempt?errors:null)); }
        catch(e){ return {ok:false, errors:[String(e&&e.message||e)]}; }
        const shaped=this._shape(raw, ctx);
        const summary={wentWell:shaped.wentWell, notWell:shaped.notWell, forChild:shaped.forChild,
                       concept:shaped.concept, conceptLabel:shaped.conceptLabel, approach:shaped.approach};
        if(!shaped.needsHelp) return {ok:true, needsHelp:false, summary};
        const v=window.LessonBank.validate(shaped.lesson);
        if(v.ok) return {ok:true, needsHelp:true, summary, lesson:shaped.lesson};
        errors=v.errors;
      }
      return {ok:false, needsHelp:true, errors};
    }
  };

  window.Tutor = Tutor;
})();
