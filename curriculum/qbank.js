/* QBank — where exercises come from.
 * ---------------------------------------------------------------------------
 * The database is authoritative. Question sets live in Firestore, one document
 * per bank, so a bad question can be fixed without shipping a new index.html
 * and without breaking anything that references it by id.
 *
 *   questionbanks/{bankId}
 *     sets     stringValue  JSON array of sets (schema: curriculum/question-types.js)
 *     version  integerValue bumped by whoever writes it
 *     updated  integerValue ms
 *
 *   bankId is the curriculum id: "y3", "y5", "la", "japan".
 *
 * Resolution order, per bank:
 *   1. the live document
 *   2. the last document this device saw (localStorage) — an offline device
 *      still gets the newest questions it has ever been given, not the file ones
 *   3. the files compiled into the app, unchanged
 *
 * Step 3 is why nothing breaks on day one: with no document published, every
 * exercise is exactly the one that is in the repo today.
 *
 * Plain script. Needs question-types.js. Exports window.QBank.
 * ------------------------------------------------------------------------ */
(function(){

  const CACHE_PREFIX="abm.qbank.v1.";
  const Q = () => window.QTypes;

  const QBank = {
    projectId:"",
    // bankId -> {sets, byId, byUnit, version, source, updated}
    banks:{},
    _inflight:{},
    _subs:[],

    configure(projectId){ this.projectId=projectId||""; return this; },
    get remote(){ return !!this.projectId; },

    _url(bankId){
      return "https://firestore.googleapis.com/v1/projects/"+this.projectId+
             "/databases/(default)/documents/questionbanks/"+encodeURIComponent(bankId);
    },

    onChange(fn){ this._subs.push(fn); return ()=>{ this._subs=this._subs.filter(f=>f!==fn); }; },
    _emit(bankId){ this._subs.slice().forEach(f=>{ try{ f(bankId, this.banks[bankId]); }catch(e){} }); },

    /* ---- state a screen can render ------------------------------------- */
    // "loading" | "db" | "cache" | "files"
    sourceOf(bankId){ const b=this.banks[bankId]; return b?b.source:(this._inflight[bankId]?"loading":"idle"); },
    isLoading(bankId){ return !!this._inflight[bankId] && !this.banks[bankId]; },
    versionOf(bankId){ const b=this.banks[bankId]; return b?b.version:null; },
    statusLine(bankId){
      const b=this.banks[bankId];
      if(!b) return this._inflight[bankId] ? "Loading questions…" : "Questions not loaded yet";
      if(b.source==="db")    return "Questions v"+b.version+" · loaded from the database";
      if(b.source==="cache") return "Questions v"+b.version+" · saved copy (offline)";
      return "Questions from the app files — nothing published to the database for this level yet";
    },

    _index(bankId, sets, meta){
      const norm=(sets||[]).map((s,i)=>Q().normalizeSet(s,i)).filter(Boolean);
      const byId={}, byUnit={};
      norm.forEach(s=>{
        byId[s.id]=s;
        const u=Number(s.u||s.unit||1);
        (byUnit[u]=byUnit[u]||[]).push(s);
      });
      const rec={sets:norm, byId, byUnit, version:(meta&&meta.version)||0,
                 updated:(meta&&meta.updated)||0, source:(meta&&meta.source)||"files"};
      this.banks[bankId]=rec;
      return rec;
    },

    _cacheRead(bankId){
      try{
        const raw=localStorage.getItem(CACHE_PREFIX+bankId);
        if(!raw) return null;
        const o=JSON.parse(raw);
        return (o&&Array.isArray(o.sets)) ? o : null;
      }catch(e){ return null; }
    },
    _cacheWrite(bankId,o){ try{ localStorage.setItem(CACHE_PREFIX+bankId,JSON.stringify(o)); }catch(e){} },

    /* ---- load ----------------------------------------------------------
     * fileSets is the compiled-in bank, passed by the caller so this file
     * never has to know which subject it is serving. Resolves to the record.
     * Concurrent calls for the same bank share one fetch.
     * ------------------------------------------------------------------ */
    load(bankId, fileSets){
      if(this.banks[bankId] && this.banks[bankId].source!=="files") return Promise.resolve(this.banks[bankId]);
      if(this._inflight[bankId]) return this._inflight[bankId];

      const fallback=(source)=>{
        const cached=this._cacheRead(bankId);
        if(cached) return this._index(bankId, cached.sets, {version:cached.version, updated:cached.updated, source:"cache"});
        return this._index(bankId, fileSets||[], {source:"files"});
      };

      if(!this.remote){
        const rec=fallback();
        this._emit(bankId);
        return Promise.resolve(rec);
      }

      const p=(async()=>{
        try{
          const r=await fetch(this._url(bankId), {cache:"no-store"});
          if(r.status===404){ return fallback(); }           // nothing published yet
          if(!r.ok) throw new Error("HTTP "+r.status);
          const f=(await r.json()).fields||{};
          const sets=f.sets?JSON.parse(f.sets.stringValue):null;
          if(!Array.isArray(sets)||!sets.length) return fallback();
          const version=f.version?Number(f.version.integerValue||f.version.doubleValue||0):0;
          const updated=f.updated?Number(f.updated.integerValue||0):Date.now();
          const bad=[];
          sets.forEach(s=>{ const v=Q().validateSet(s); if(!v.ok) bad.push.apply(bad,v.errors); });
          if(bad.length) console.warn("[QBank] "+bankId+" has "+bad.length+" problem(s):", bad.slice(0,8));
          this._cacheWrite(bankId,{sets,version,updated});
          return this._index(bankId, sets, {version, updated, source:"db"});
        }catch(e){
          console.warn("[QBank] "+bankId+" unreachable, using local questions:", e&&e.message);
          return fallback();
        }
      })().then(rec=>{ delete this._inflight[bankId]; this._emit(bankId); return rec; });

      this._inflight[bankId]=p;
      return p;
    },

    /* ---- read ----------------------------------------------------------
     * Callers pass their compiled-in sets every time, so a screen renders
     * correctly before the load resolves and after it fails.
     * ------------------------------------------------------------------ */
    setsFor(bankId, unit, fileSets){
      const b=this.banks[bankId];
      if(!b || b.source==="files") return (fileSets||[]).map((s,i)=>Q().normalizeSet(s,i)).filter(Boolean);
      const got=b.byUnit[Number(unit)]||[];
      // A published bank that says nothing about this unit keeps the file
      // version of that unit rather than showing the child an empty week.
      if(!got.length) return (fileSets||[]).map((s,i)=>Q().normalizeSet(s,i)).filter(Boolean);
      return got;
    },
    set(bankId, setId, fileSets){
      const b=this.banks[bankId];
      if(b && b.byId[setId]) return b.byId[setId];
      const f=(fileSets||[]).find(s=>s.id===setId);
      return f?Q().normalizeSet(f,0):null;
    },

    /* ---- publish -------------------------------------------------------
     * No editor UI yet by design. This is the seam whatever writes the DB
     * uses — call it from the console, a script, or a future Teacher HQ
     * screen. It validates first and refuses to publish a broken bank.
     * ------------------------------------------------------------------ */
    payloadFrom(sets){
      return (sets||[]).map((s,i)=>{
        const n=Q().normalizeSet(s,i);
        return {id:n.id, u:Number(n.u||n.unit||1), w:Number(n.w||1), label:n.label, title:n.title,
                note:n.note, items:n.items};
      });
    },
    /* Publishing is an ADMIN operation. firestore.rules denies client writes to
     * questionbanks outright: bank ids are public ("y3", "y5"...), so the
     * unguessable-id protection the rest of the ruleset relies on does not
     * apply, and with no auth in the app any credential a browser can present,
     * an attacker can manufacture. Run this from a context holding
     * service-account credentials, or edit the document in the Firebase
     * console; both bypass rules. From a browser this will 403, by design.
     *
     * Kept because the validation and payload shaping below are the valuable
     * part — it refuses to publish a bank that would not load. */
    async publish(bankId, sets, version){
      if(!this.remote) throw new Error("no project configured");
      const payload=this.payloadFrom(sets);
      const errs=[]; payload.forEach(s=>{ const v=Q().validateSet(s); if(!v.ok) errs.push.apply(errs,v.errors); });
      if(errs.length) throw new Error("refusing to publish, "+errs.length+" problem(s):\n"+errs.slice(0,20).join("\n"));
      const v=version==null ? (this.versionOf(bankId)||0)+1 : Number(version);
      const body=JSON.stringify({fields:{
        sets:{stringValue:JSON.stringify(payload)},
        version:{integerValue:String(v)},
        updated:{integerValue:String(Date.now())}}});
      const r=await fetch(this._url(bankId),{method:"PATCH",headers:{"Content-Type":"application/json"},body});
      if(!r.ok) throw new Error("publish failed: HTTP "+r.status);
      delete this.banks[bankId];
      return this.load(bankId, sets);
    }
  };

  window.QBank = QBank;
})();
