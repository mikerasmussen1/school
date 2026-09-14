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

  /* A SECOND CHECK, WHILE THE PAGE IS OPEN.
   *
   * Checking only at load is not enough for the way this app is actually used.
   * A page opened before a fix is deployed keeps the old code for the whole
   * session, however long that is — which is how three spelling words were
   * reported one after another, all of them already fixed and deployed, none
   * of them reaching the screen.
   *
   * So the check repeats every three minutes. But a later check must NOT
   * reload on its own: the child may be halfway through a drill, and throwing
   * that away to deliver a fix he did not ask for is a worse bug than the one
   * being fixed. It offers instead, and he chooses when.
   */
  const EVERY = 3*60*1000;

  function offerReload(build){
    if(typeof document==="undefined" || !document.body) return;
    if(document.getElementById("build-stale")) return;
    const bar=document.createElement("div");
    bar.id="build-stale";
    bar.setAttribute("style",
      "position:fixed;left:50%;transform:translateX(-50%);bottom:18px;z-index:9999;"+
      "background:#1F2937;color:#fff;border-radius:999px;padding:10px 16px;"+
      "font-family:'Public Sans',system-ui,sans-serif;font-size:14px;display:flex;"+
      "gap:12px;align-items:center;box-shadow:0 6px 24px rgba(0,0,0,.28)");
    const msg=document.createElement("span");
    msg.textContent="An update is ready.";
    const go=document.createElement("button");
    go.textContent="Reload";
    go.setAttribute("style",
      "background:#4ADE80;color:#0B1220;border:0;border-radius:999px;padding:6px 14px;"+
      "font-weight:700;cursor:pointer;font-size:14px");
    go.onclick=function(){ markTried(build); try{ window.location.reload(); }catch(e){} };
    const no=document.createElement("button");
    no.textContent="Not now";
    no.setAttribute("style",
      "background:transparent;color:rgba(255,255,255,.65);border:0;cursor:pointer;font-size:13px");
    no.onclick=function(){ try{ bar.remove(); }catch(e){} };
    bar.appendChild(msg); bar.appendChild(go); bar.appendChild(no);
    document.body.appendChild(bar);
  }

  async function recheck(){
    const mine=currentBuild();
    if(!mine) return;
    let latest=null;
    try{
      const r=await fetch("build.json?t="+Date.now(), {cache:"no-store"});
      if(!r.ok) return;
      latest=(await r.json()).build;
    }catch(e){ return; }
    if(!latest || latest===mine) return;
    offerReload(latest);
  }

  if(typeof window!=="undefined"){
    if(typeof document!=="undefined" && document.addEventListener){
      // after load, so a slow check never delays the page appearing
      if(document.readyState==="complete") check();
      else window.addEventListener("load", check);
    } else {
      check();
    }
    // and then keep looking, offering rather than reloading
    if(typeof setInterval!=="undefined") setInterval(recheck, EVERY);
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.FRESHNESS = {check, recheck, offerReload, currentBuild, EVERY};
})();
