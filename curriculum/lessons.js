/* Lessons as data.
 * ---------------------------------------------------------------------------
 * A lesson is a tap-through of slides. Authored lessons used to live only in
 * the curriculum files; now they load from the database like question sets do,
 * and generated remediation lessons are written back into the same bank so the
 * next child who misses the same concept gets the lesson that already exists
 * instead of a fresh generation.
 *
 *   lessons/{bankId}
 *     lessons  stringValue  JSON array of lessons
 *     version  integerValue
 *     updated  integerValue
 *
 * A lesson:
 *
 *   {
 *     id:        stable string. Generated ones are "gen-<setId>-<concept>-<n>".
 *     setId:     the practice set this teaches, when it maps to one.
 *     concept:   short slug, e.g. "area-model-2x1". THE MATCH KEY for reuse.
 *     title:     shown at the top of the walkthrough.
 *     source:    "authored" | "generated"
 *     tier:      0|1|2, the tier the misses were in
 *     slides:    [{kind, head, body, work, note}]
 *                kind: "why" | "teach" | "example" | "your-turn" | "recap"
 *                work: optional array of lines shown as a worked calculation
 *     items:     the practice questions that follow the slides (question-types.js)
 *     uses:      how many times it has been served (bumped on reuse)
 *     wins:      how many times a child closed a round on it
 *   }
 *
 * Plain script. Needs question-types.js. Exports window.LessonBank.
 * ------------------------------------------------------------------------ */
(function(){

  const CACHE="abm.lessons.v1.";
  const Q = () => window.QTypes;
  const arr = v => Array.isArray(v)?v:(v==null?[]:[v]);
  const SLIDE_KINDS=["why","teach","example","your-turn","recap"];

  const LessonBank = {
    projectId:"",
    banks:{},          // bankId -> {lessons, byId, byConcept, version, source}
    _inflight:{},

    configure(projectId){ this.projectId=projectId||""; return this; },
    get remote(){ return !!this.projectId; },
    _url(bankId){
      return "https://firestore.googleapis.com/v1/projects/"+this.projectId+
             "/databases/(default)/documents/lessons/"+encodeURIComponent(bankId);
    },

    /* ---- schema -------------------------------------------------------- */
    normalize(l, i){
      if(!l||typeof l!=="object") return null;
      const id=l.id||("lesson"+(i==null?"":i));
      const slides=arr(l.slides).map(s=>({
        kind:SLIDE_KINDS.indexOf(s&&s.kind)>=0?s.kind:"teach",
        head:String((s&&s.head)||""),
        body:String((s&&s.body)||""),
        work:arr(s&&s.work).map(String),
        note:String((s&&s.note)||"")
      })).filter(s=>s.head||s.body);
      return {...l, id, source:l.source==="generated"?"generated":"authored",
        concept:String(l.concept||"").trim(),
        slides, items:arr(l.items).map((it,k)=>Q().normalize(it, id+"-i"+(k+1))).filter(Boolean),
        uses:Number(l.uses||0), wins:Number(l.wins||0)};
    },
    validate(l){
      const errs=[];
      const n=this.normalize(l,0);
      if(!n) return {ok:false, errors:["not a lesson object"]};
      if(!n.concept) errs.push("lesson "+n.id+": no concept slug (reuse needs it)");
      if(n.slides.length<3) errs.push("lesson "+n.id+": needs at least 3 slides");
      if(n.slides.length>10) errs.push("lesson "+n.id+": more than 10 slides");
      if(!n.items.length) errs.push("lesson "+n.id+": no practice questions");
      if(n.items.length<5||n.items.length>10) errs.push("lesson "+n.id+": needs 5–10 questions, has "+n.items.length);
      const v=Q().validateSet({id:n.id, items:n.items});
      if(!v.ok) errs.push.apply(errs, v.errors);
      return {ok:!errs.length, errors:errs};
    },

    _index(bankId, lessons, meta){
      const norm=arr(lessons).map((l,i)=>this.normalize(l,i)).filter(Boolean);
      const byId={}, byConcept={};
      norm.forEach(l=>{ byId[l.id]=l; if(l.concept) (byConcept[l.concept]=byConcept[l.concept]||[]).push(l); });
      const rec={lessons:norm, byId, byConcept, version:(meta&&meta.version)||0,
                 updated:(meta&&meta.updated)||0, source:(meta&&meta.source)||"files"};
      this.banks[bankId]=rec;
      return rec;
    },
    _cacheRead(bankId){ try{ const o=JSON.parse(localStorage.getItem(CACHE+bankId)||"null"); return (o&&Array.isArray(o.lessons))?o:null; }catch(e){ return null; } },
    _cacheWrite(bankId,o){ try{ localStorage.setItem(CACHE+bankId,JSON.stringify(o)); }catch(e){} },

    load(bankId, fileLessons){
      if(this.banks[bankId] && this.banks[bankId].source!=="files") return Promise.resolve(this.banks[bankId]);
      if(this._inflight[bankId]) return this._inflight[bankId];
      const fallback=()=>{
        const c=this._cacheRead(bankId);
        if(c) return this._index(bankId, c.lessons, {version:c.version, source:"cache"});
        return this._index(bankId, fileLessons||[], {source:"files"});
      };
      if(!this.remote) return Promise.resolve(fallback());

      const p=(async()=>{
        try{
          const r=await fetch(this._url(bankId),{cache:"no-store"});
          if(r.status===404) return fallback();
          if(!r.ok) throw new Error("HTTP "+r.status);
          const f=(await r.json()).fields||{};
          const lessons=f.lessons?JSON.parse(f.lessons.stringValue):null;
          if(!Array.isArray(lessons)||!lessons.length) return fallback();
          const version=f.version?Number(f.version.integerValue||0):0;
          this._cacheWrite(bankId,{lessons,version});
          return this._index(bankId, lessons, {version, source:"db"});
        }catch(e){
          console.warn("[LessonBank] "+bankId+" unreachable, using local lessons:", e&&e.message);
          return fallback();
        }
      })().then(rec=>{ delete this._inflight[bankId]; return rec; });
      this._inflight[bankId]=p;
      return p;
    },

    /* ---- reuse ---------------------------------------------------------
     * Before asking the model for a new lesson, look for one that already
     * teaches this concept. Best = most wins, then fewest uses, so a lesson
     * that works spreads and an untested one still gets a turn.
     * ------------------------------------------------------------------ */
    findForConcept(bankId, concept, opts){
      const b=this.banks[bankId];
      if(!b||!concept) return null;
      const skip=(opts&&opts.exclude)||[];
      const pool=(b.byConcept[String(concept).trim()]||[]).filter(l=>skip.indexOf(l.id)<0);
      if(!pool.length) return null;
      return pool.slice().sort((a,b2)=>(b2.wins-a.wins)||(a.uses-b2.uses))[0];
    },
    forSet(bankId, setId){
      const b=this.banks[bankId];
      if(!b) return [];
      return b.lessons.filter(l=>l.setId===setId);
    },
    get(bankId, id){ const b=this.banks[bankId]; return (b&&b.byId[id])||null; },

    /* ---- write back ----------------------------------------------------
     * ADMIN ONLY. firestore.rules denies client writes to lessons for the same
     * reason it denies them to questionbanks: bank ids are public, so the
     * unguessable-id protection the rest of the ruleset relies on does not
     * apply, and letting anyone overwrite teaching material a child reads is
     * worse than letting them overwrite a question. From a browser this 403s,
     * by design.
     *
     * A generated lesson therefore does NOT publish itself. It lives inline in
     * the child's own record and teaches them there. Promoting one that worked
     * into the shared pool is a deliberate step: Teacher HQ shows the lesson
     * JSON, and the Firebase console or a service-account script writes it.
     *
     * Kept because the validation below is the valuable part — it refuses to
     * publish a lesson that would not render or could not be graded.
     * ------------------------------------------------------------------ */
    async publish(bankId, lesson, fileLessons){
      if(!this.remote) throw new Error("no project configured");
      await this.load(bankId, fileLessons);
      const v=this.validate(lesson);
      if(!v.ok) throw new Error("lesson rejected:\n"+v.errors.join("\n"));
      const b=this.banks[bankId];
      const next=b.lessons.filter(l=>l.id!==lesson.id).concat([this.normalize(lesson,0)]);
      const version=(b.version||0)+1;
      const body=JSON.stringify({fields:{
        lessons:{stringValue:JSON.stringify(next)},
        version:{integerValue:String(version)},
        updated:{integerValue:String(Date.now())}}});
      const r=await fetch(this._url(bankId),{method:"PATCH",headers:{"Content-Type":"application/json"},body});
      if(!r.ok) throw new Error("publish failed: HTTP "+r.status);
      this._cacheWrite(bankId,{lessons:next,version});
      return this._index(bankId, next, {version, source:"db"});
    },
    // Bump usage counters. Admin-only like publish, so this is a no-op from a
    // browser; the counters move when a grown-up promotes the lesson.
    async score(bankId, lessonId, won, fileLessons){
      const l=this.get(bankId, lessonId);
      if(!l) return;
      const updated={...l, uses:(l.uses||0)+1, wins:(l.wins||0)+(won?1:0)};
      try{ await this.publish(bankId, updated, fileLessons); }catch(e){}
    }
  };

  window.LessonBank = LessonBank;
})();
