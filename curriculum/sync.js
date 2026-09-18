/* ============================================================================
 * SUBJECT SYNC — progress that follows the child, not the device
 * ----------------------------------------------------------------------------
 * Word Voyagers and Field Notes are standalone pages. Until now they kept
 * their progress in localStorage, so a week finished on the iPad was invisible
 * from anywhere else and Teacher HQ could only report "opened 6 times". This
 * module gives them the same database the maths app already writes to.
 *
 * HOW IT WORKS, and why a standalone page can do this at all. The app has no
 * login tokens: a child's record lives at an unguessable Firestore document id
 * derived from their name and code, and holding that id IS the credential.
 * index.html leaves the signed-in id in localStorage under the session key. So
 * these pages read the same session, fetch the same record, and write back to
 * it. No new account system, no second source of truth.
 *
 * THE DANGEROUS PART, handled deliberately. A push replaces the ENTIRE record
 * blob. If this module fetched once at load and wrote later, it would happily
 * overwrite maths progress made in another tab in between. So every save
 * re-fetches the record first and merges only into
 * slice.subjects[<id>].data — its own namespace, nothing else touched.
 *
 * That narrows the race to "two devices writing the SAME subject within a
 * second or two of each other", which for two brothers on one course is
 * essentially never. It does not eliminate it. Last write wins, and a
 * simultaneous edit on two devices can still lose one side. Fixing that
 * properly needs server-side merge logic that Firestore REST alone will not
 * give us, and pretending otherwise would be worse than saying it here.
 *
 * LOCALSTORAGE IS STILL THE FLOOR. Every save writes locally first and
 * immediately. The remote push is best-effort and debounced. If the network is
 * down or the child never signed in, everything still works exactly as it did
 * — it simply stays on that device, which is the old behaviour, not a new
 * failure. Nothing is ever blocked on the network.
 *
 * MIGRATION. The first time a signed-in child opens a subject, any progress
 * already sitting in localStorage is pushed up before anything is read down,
 * so work done before this existed is not thrown away.
 * ==========================================================================*/
(function(){

  const PROJECT     = "big-math-adventures";
  const SESSION_KEY = "abm.session.v1";
  const STORE_KEY   = "abm.profiles.v1";

  const docUrl = (col, id) =>
    "https://firestore.googleapis.com/v1/projects/"+PROJECT+
    "/databases/(default)/documents/"+col+"/"+id;

  function session(){
    try{ return JSON.parse(localStorage.getItem(SESSION_KEY)||"null"); }catch(e){ return null; }
  }

  /* The signed-in child's record id, or null if nobody is signed in here. */
  function studentKey(){
    const s = session();
    return (s && s.key) ? s.key : null;
  }

  /* Their profile, for the name/colour a push has to send back. */
  function profile(){
    const key = studentKey();
    if(!key) return null;
    try{
      const store = JSON.parse(localStorage.getItem(STORE_KEY)||"null");
      const list  = (store && store.profiles) || [];
      return list.find(p => p.rkey === key) || null;
    }catch(e){ return null; }
  }

  async function fetchRecord(key){
    try{
      const r = await fetch(docUrl("students", key));
      if(!r.ok) return null;
      const f = (await r.json()).fields || {};
      return {
        name:  f.name  ? f.name.stringValue  : "",
        color: f.color ? f.color.stringValue : "",
        slice: f.blob  ? JSON.parse(f.blob.stringValue) : null
      };
    }catch(e){ return null; }
  }

  async function pushRecord(key, prof, slice){
    const body = JSON.stringify({fields:{
      name:  {stringValue: (prof&&prof.name)  || (slice&&slice.name)  || ""},
      color: {stringValue: (prof&&prof.color) || (slice&&slice.color) || ""},
      blob:  {stringValue: JSON.stringify(slice||{})},
      updated:{integerValue: String(Date.now())}
    }});
    try{
      await fetch(docUrl("students", key),
        {method:"PATCH", headers:{"Content-Type":"application/json"}, body});
      return true;
    }catch(e){ return false; }
  }

  /* ---- the API a subject page actually uses ---------------------------- */

  /* ONE LOCAL COPY PER CHILD. Two children share a device, so the local copy
   * is keyed by whoever is signed in. It used to be one "sync.<subject>" for
   * the whole browser: work done as one child sat in the same slot the other
   * child then signed into, and because pull() keeps whichever copy is newer,
   * that newer-looking copy was pushed over the other child's record. A reset
   * on one profile could erase a brother's year that way.
   *
   * Signed out, the key is the old "sync.<subject>", so a device nobody signs
   * in to behaves exactly as before. A signed-in child never reads that
   * unowned copy: nothing says whose it is, so the record wins. */
  function localKey(subjectId){
    const key = studentKey();
    return "sync." + subjectId + (key ? "." + key : "");
  }
  /* THE COPY FROM BEFORE THIS DEVICE KNEW WHOSE IT WAS.
   *
   * Until progress was keyed by child, a device kept one "sync.<subject>" for
   * everybody. A child signing in after that change looked at their own empty
   * key and appeared to be back at the first lesson, with the old copy sitting
   * untouched beside it. So the first signed-in child to open the subject
   * adopts that copy, and the device records who took it: one child, once,
   * never the brother as well. A child whose record already holds work keeps
   * the record - pull() decides that - so this only ever fills an empty slot. */
  function claimKey(subjectId){ return "sync." + subjectId + ".claimedBy"; }
  function adoptLegacy(subjectId){
    const key = studentKey();
    if(!key) return null;
    try{
      const mine = localStorage.getItem(localKey(subjectId));
      if(mine && Object.keys(JSON.parse(mine)||{}).length) return null;   // already has its own
      const claimed = localStorage.getItem(claimKey(subjectId));
      if(claimed && claimed !== key) return null;                          // the other child took it
      const legacy = localStorage.getItem("sync." + subjectId);
      if(!legacy) return null;
      const data = JSON.parse(legacy);
      if(!data || !Object.keys(data).length) return null;
      localStorage.setItem(localKey(subjectId), legacy);
      localStorage.setItem(claimKey(subjectId), key);
      return data;
    }catch(e){ return null; }
  }

  const local = {
    key: localKey,
    adoptLegacy,
    get(subjectId){
      try{
        const raw = localStorage.getItem(localKey(subjectId));
        if(!raw || !Object.keys(JSON.parse(raw)||{}).length){
          const taken = adoptLegacy(subjectId);
          if(taken) return taken;
        }
        return JSON.parse(raw||"{}");
      }
      catch(e){ return {}; }
    },
    set(subjectId, data){
      try{ localStorage.setItem(localKey(subjectId), JSON.stringify(data||{})); }catch(e){}
    }
  };

  /* Debounced so a burst of ticks in one lesson is one network write. */
  const timers = {};
  function schedulePush(subjectId, delay){
    clearTimeout(timers[subjectId]);
    timers[subjectId] = setTimeout(function(){ pushNow(subjectId); }, delay==null?1200:delay);
  }

  async function pushNow(subjectId){
    const key = studentKey();
    if(!key) return false;                       // nobody signed in: local only
    const rec = await fetchRecord(key);          // re-read so we merge, not clobber
    const slice = (rec && rec.slice) || {};
    const subs  = Object.assign({}, slice.subjects||{});
    const mine  = Object.assign({opened:0, days:[], data:{}}, subs[subjectId]||{});
    mine.data = local.get(subjectId);
    mine.syncedAt = Date.now();
    subs[subjectId] = mine;
    slice.subjects = subs;
    slice.updated = Date.now();
    return pushRecord(key, profile()||rec, slice);
  }

  /* Read the child's stored progress for one subject.
   * Remote wins when it is newer, because that is the whole point — a week
   * finished on another device should appear here. */
  async function pull(subjectId){
    const key = studentKey();
    const here = local.get(subjectId);
    if(!key) return here;
    const rec = await fetchRecord(key);
    const there = (((rec&&rec.slice&&rec.slice.subjects)||{})[subjectId]||{}).data;
    if(!there) {
      // Nothing upstream yet: migrate what this device already has.
      if(here && Object.keys(here).length) schedulePush(subjectId, 0);
      return here;
    }
    const hereAt  = Number(here && here.__at)  || 0;
    const thereAt = Number(there && there.__at) || 0;
    if(thereAt >= hereAt){ local.set(subjectId, there); return there; }
    schedulePush(subjectId, 0);
    return here;
  }

  /* Write progress. Local immediately, remote shortly after. */
  function save(subjectId, data){
    const stamped = Object.assign({}, data||{}, {__at: Date.now()});
    local.set(subjectId, stamped);
    schedulePush(subjectId);
    return stamped;
  }

  function flush(){
    Object.keys(timers).forEach(function(id){
      clearTimeout(timers[id]);
      pushNow(id);
    });
  }
  if(typeof window!=="undefined" && window.addEventListener){
    window.addEventListener("pagehide", flush);
    if(typeof document!=="undefined" && document.addEventListener){
      document.addEventListener("visibilitychange", function(){
        if(document.visibilityState==="hidden") flush();
      });
    }
  }

  function signedIn(){ return !!studentKey(); }

  window.__CURR = window.__CURR || {};
  window.__CURR.SYNC = {
    pull, save, flush, pushNow, signedIn, studentKey, profile,
    fetchRecord, pushRecord, local
  };
})();
