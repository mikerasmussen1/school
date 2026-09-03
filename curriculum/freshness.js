/* ============================================================================
 * AM I STALE? — and if so, fix it without asking
 * ----------------------------------------------------------------------------
 * The whole app lives inside its HTML files, so versioning the script URLs
 * cannot help them: a cached index.html or word-voyagers.dc.html keeps serving
 * old logic no matter how fresh the modules are. That has now hidden four
 * separate shipped changes, and every time the answer has been "hard-refresh",
 * which is a poor thing to ask of a nine-year-old on a tablet.
 *
 * So the page checks for itself. build.json is written on every deploy and
 * fetched with cache:"no-store", which is the one request the browser is not
 * allowed to answer from its cache. If the build it reports differs from the
 * build baked into the page, the page is old and reloads itself.
 *
 * TWO THINGS THAT MAKE THIS SAFE:
 *
 * A reload loop would be far worse than a stale page — it would make the app
 * unusable rather than merely out of date. So a reload is attempted at most
 * ONCE per build per tab, recorded in sessionStorage. If the reload does not
 * actually pick up the new file, the second check finds the flag already set,
 * gives up, and leaves the page working. Stale beats spinning.
 *
 * Every failure path is silent and harmless: no build.json, no network, a
 * parse error, blocked storage — all just return, and the app carries on
 * exactly as before. Nothing here is allowed to break a page that is fine.
 * ==========================================================================*/
(function(){

  function currentBuild(){
    return (typeof window!=="undefined" && window.__BUILD__) ? String(window.__BUILD__) : null;
  }

  function alreadyTried(build){
    try{ return sessionStorage.getItem("build.reloaded")===build; }
    catch(e){ return true; }        // storage blocked: never risk a loop
  }
  function markTried(build){
    try{ sessionStorage.setItem("build.reloaded", build); }catch(e){}
  }

  async function check(){
    const mine = currentBuild();
    if(!mine) return;               // page carries no stamp; nothing to compare
    let latest = null;
    try{
      const r = await fetch("build.json?t="+Date.now(), {cache:"no-store"});
      if(!r.ok) return;
      latest = (await r.json()).build;
    }catch(e){ return; }            // offline or missing: carry on quietly
    if(!latest || latest === mine) return;
    if(alreadyTried(latest)) return;   // one attempt only, then leave it alone
    markTried(latest);
    try{ window.location.reload(); }catch(e){}
  }

  if(typeof window!=="undefined"){
    if(typeof document!=="undefined" && document.addEventListener){
      // after load, so a slow check never delays the page appearing
      if(document.readyState==="complete") check();
      else window.addEventListener("load", check);
    } else {
      check();
    }
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.FRESHNESS = {check, currentBuild};
})();
