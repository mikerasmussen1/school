/* LAGrader — grades a photo of a handwritten Word Voyagers assignment.
 * ---------------------------------------------------------------------------
 * Modeled directly on PaperReader in index.html: same on-device downscale,
 * same proxy → Claude-direct → Gemini-direct routing (see worker/tutor-proxy.js
 * and Tutor in curriculum/tutor.js), same "{" prefill + tolerant JSON parse.
 * The difference is the job: PaperReader matches answers to printed problem
 * numbers on a math worksheet; this grades freeform handwriting against a
 * plain-language rubric and returns short, kind, specific feedback.
 *
 * word-voyagers.dc.html is its own page, not part of index.html, so it never
 * gets index.html's boot sequence (loadSharedKey()) that configures Tutor.
 * loadConfig() below does the same small, public Firestore read itself —
 * config/app is deliberately public (see index.html's comment on that doc)
 * — so this page can reach whatever key or proxy is already configured
 * without duplicating credentials anywhere.
 *
 * If nothing is configured, enabled stays false and the page should say so
 * rather than offer a button that will only fail.
 *
 * Plain script. No dependencies beyond fetch/canvas/Image. Exports window.LAGrader.
 * ------------------------------------------------------------------------ */
(function(){

  const REMOTE_PROJECT_ID = "big-math-adventures";
  // Same default as Tutor: this reads a child's handwriting and writes them
  // feedback, so quality matters more than the per-call saving. config/app's
  // `model` overrides it.
  const CLAUDE_MODEL = "claude-sonnet-5";
  const _doc = (col,id) => "https://firestore.googleapis.com/v1/projects/"+REMOTE_PROJECT_ID+"/databases/(default)/documents/"+col+"/"+id;

  const LAGrader = {
    enabled: false,

    /* The credential this page is using.
     *
     * This used to be `window.Tutor || {}`, and word-voyagers.dc.html never
     * loads curriculum/tutor.js — so window.Tutor was always undefined here.
     * loadConfig() fetched the key from config/app, handed it to a Tutor that
     * did not exist, set enabled = true, and every grading call then went out
     * with no credential at all. The button appeared and could only fail.
     *
     * It holds its own config now. window.Tutor still wins when this script IS
     * loaded inside index.html, so the two pages cannot end up disagreeing
     * about which key is live — but nothing here depends on the maths tutor
     * being present to grade a handwriting photo. */
    cfg: { apiKey:"", model:"", proxyUrl:"", workspaceId:"" },
    _tutor(){
      const T = window.Tutor;
      return (T && (T.proxyUrl || T.apiKey)) ? T : this.cfg;
    },

    /* Fetch the same public config/app doc index.html reads. If window.Tutor
     * already has a proxyUrl or key (another script configured it first),
     * this leaves it alone rather than overwriting a live config. */
    async loadConfig(){
      try{
        const T = this._tutor();
        if(T.proxyUrl || T.apiKey){ this.enabled = true; return; }
        const r = await fetch(_doc("config","app"), {cache:"no-store"});
        if(!r.ok) return;                              // 404 = nothing published
        const f = (await r.json()).fields || {};
        const proxy = (f.proxyUrl && f.proxyUrl.stringValue) || "";
        const key = proxy ? "" : ((f.apiKey && f.apiKey.stringValue) || (f.gemini && f.gemini.stringValue) || "");
        const model = (f.model && f.model.stringValue) || "";
        const ws = (f.workspaceId && f.workspaceId.stringValue) || "";
        this.cfg = { apiKey:key, model:model, proxyUrl:proxy, workspaceId:ws };
        if(window.Tutor && window.Tutor.configure) window.Tutor.configure(key, model, proxy, ws);
        this.enabled = !!(proxy || key);
      }catch(e){ /* offline or blocked — stays disabled, page still works without grading */ }
    },

    /* Downscale on-device so a 12MP photo doesn't ship megabytes to the API.
     * Identical approach to PaperReader.shrink. */
    shrink(file){
      return new Promise((resolve,reject)=>{
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => {
          const MAX = 1280;
          let w = img.width, h = img.height;
          const k = Math.min(1, MAX/Math.max(w,h));
          w = Math.round(w*k); h = Math.round(h*k);
          const c = document.createElement("canvas");
          c.width = w; c.height = h;
          c.getContext("2d").drawImage(img,0,0,w,h);
          URL.revokeObjectURL(url);
          resolve({mime:"image/jpeg", b64:c.toDataURL("image/jpeg",0.85).split(",")[1]});
        };
        img.onerror = e => { URL.revokeObjectURL(url); reject(e); };
        img.src = url;
      });
    },

    _prompt(subjectLabel, instructions, rubric, promptText){
      return [
        "You are a warm, encouraging teacher reviewing a photo of a student's handwritten "+subjectLabel+" homework.",
        "Assignment instructions given to the student: "+instructions,
        "The specific prompt they were given: \""+promptText+"\"",
        "What to judge: "+rubric,
        "Look carefully at the handwriting in the photo. Be honest but kind — this is a child still developing these skills. If parts are too unclear to read, say so plainly rather than guessing.",
        "Respond with ONLY this JSON, no markdown fences, no preamble:",
        "{\"tier\":\"excellent\"|\"good\"|\"practice\", \"completed\":true|false, \"strengths\":\"1-2 sentences, specific to what you actually see\", \"focus_area\":\"1-2 sentences naming ONE kind, concrete next step\", \"note_to_parent\":\"one short sentence, e.g. flagging unclear handwriting or off-task work\"}"
      ].join("\n");
    },

    /* Tolerant JSON read — same reasoning as Tutor._json: Gemini honours
     * response_mime_type, Claude does not, so a reply can arrive fenced in
     * ```json or with stray text around it. */
    _json(text){
      let t = String(text||"").trim();
      t = t.replace(/^```(?:json)?\s*/i,"").replace(/```\s*$/,"").trim();
      try{ return JSON.parse(t); }catch(e){}
      const a = t.indexOf("{"), b = t.lastIndexOf("}");
      if(a>=0 && b>a) return JSON.parse(t.slice(a,b+1));
      throw new Error("model did not return JSON");
    },

    /* subjectLabel: "handwriting"|"spelling"|"grammar"|"reading response"
     * instructions, rubric, promptText: strings from HANDWRITTEN[level][category]
     * file: a File from an <input type="file"> change event
     * Returns {tier, completed, strengths, focus_area, note_to_parent}. Throws
     * on any failure — callers should catch and show a friendly retry. */
    async grade(subjectLabel, instructions, rubric, promptText, file){
      const img = await this.shrink(file);
      const prompt = this._prompt(subjectLabel, instructions, rubric, promptText);
      const T = this._tutor();
      const viaProxy = !!T.proxyUrl;
      const anthropic = viaProxy || /^sk-ant-/.test(T.apiKey || "");
      let r;
      if(viaProxy){
        r = await fetch(T.proxyUrl, {method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({prompt, image:{mime:img.mime, b64:img.b64},
            model:T.model||undefined})});
      } else if(anthropic){
        r = await fetch("https://api.anthropic.com/v1/messages", {method:"POST",
          headers: Object.assign({"Content-Type":"application/json", "x-api-key":T.apiKey,
            "anthropic-version":"2023-06-01", "anthropic-dangerous-direct-browser-access":"true"},
            T.workspaceId ? {"anthropic-workspace-id":T.workspaceId} : {}),
          // Follow the configured model the way Tutor does, so switching to
          // Haiku in config/app moves both pages rather than only the maths.
          body: JSON.stringify({model:(/^claude/.test(T.model||"") ? T.model : CLAUDE_MODEL),
            max_tokens:1024,
            messages:[{role:"user", content:[
              {type:"image", source:{type:"base64", media_type:img.mime, data:img.b64}},
              {type:"text", text:prompt}]},
              {role:"assistant", content:"{"}]})});
      } else {
        r = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/"+
            ((T.model && !/^claude/.test(T.model)) ? T.model : "gemini-flash-latest")+
            ":generateContent?key="+T.apiKey,
          {method:"POST", headers:{"Content-Type":"application/json"},
           body: JSON.stringify({contents:[{parts:[{text:prompt},{inline_data:{mime_type:img.mime, data:img.b64}}]}],
             generationConfig:{response_mime_type:"application/json"}})});
      }
      if(!r.ok){
        let detail=""; try{ const e=await r.json(); detail=(e.error&&(e.error.message||e.error))||""; }catch(e){}
        throw new Error((viaProxy?"Tutor proxy ":(anthropic?"Claude ":"Gemini "))+r.status+(detail?": "+String(detail).slice(0,120):""));
      }
      const j = await r.json();
      const raw = anthropic
        ? "{"+((((j.content)||[]).find(c=>c.type==="text")||{}).text||"")
        : ((((((j.candidates||[])[0]||{}).content||{}).parts)||[])[0]||{}).text||"{}";
      return this._json(raw);
    }
  };

  window.LAGrader = LAGrader;
})();
