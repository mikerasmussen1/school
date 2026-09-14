/* A stale page fixes itself once at load, then offers rather than interrupts. */
let reloads=0, added=[], fetched=[];
const session={};
function setup(pageBuild, serverBuild, opts){
  opts=opts||{};
  reloads=0; added=[]; fetched=[];
  Object.keys(session).forEach(k=>delete session[k]);
  global.window=global;
  global.__BUILD__=pageBuild;
  global.sessionStorage={
    getItem:k=>(k in session?session[k]:null),
    setItem:(k,v)=>{ session[k]=String(v); }
  };
  global.location={reload(){ reloads++; }};
  const body={children:[], appendChild(el){ this.children.push(el); added.push(el); }};
  global.document={
    readyState:"complete", addEventListener(){},
    getElementById:(id)=>added.filter(e=>e.id===id)[0]||null,
    createElement:()=>({setAttribute(){}, appendChild(){}, remove(){}, set textContent(v){this._t=v;}, get textContent(){return this._t;}}),
    body:body
  };
  global.addEventListener=()=>{};
  let ticks=[];
  global.setInterval=(fn)=>{ ticks.push(fn); return 1; };
  global.fetch=async(u)=>{
    fetched.push(u);
    if(opts.network==="down") throw new Error("offline");
    return {ok:true, json:async()=>({build:serverBuild})};
  };
  delete require.cache[require.resolve(__dirname+'/../curriculum/freshness.js')];
  window.__CURR={};
  require(__dirname+'/../curriculum/freshness.js');
  return {F:window.__CURR.FRESHNESS, ticks};
}
const wait=()=>new Promise(r=>setImmediate(r));
let fail=[];
(async()=>{
  let r;

  r=setup("A","A"); await wait(); await wait();
  console.log("  current at load                 reloads="+reloads+"  banner="+added.length);
  if(reloads||added.length) fail.push("acted on a page that was already current");

  r=setup("A","B"); await wait(); await wait();
  console.log("  stale at load                   reloads="+reloads+"  (expect 1)");
  if(reloads!==1) fail.push("a stale page did not reload at load, got "+reloads);

  // a build that lands WHILE the page is open must not reload under the child
  r=setup("A","A"); await wait(); await wait();
  global.fetch=async(u)=>{ fetched.push(u); return {ok:true, json:async()=>({build:"C"})}; };
  await r.F.recheck(); await wait();
  console.log("  new build mid-session           reloads="+reloads+"  banner="+added.length+"  (expect 0 and 1)");
  if(reloads!==0) fail.push("RELOADED MID-SESSION, which can throw away a drill in progress");
  if(added.length!==1) fail.push("no reload was offered, so a long session never picks the fix up");

  // and it must not stack up one banner per check
  await r.F.recheck(); await wait();
  await r.F.recheck(); await wait();
  console.log("  three more checks               banners="+added.length+"  (expect still 1)");
  if(added.length!==1) fail.push("a banner is added on every check: "+added.length);

  // the periodic timer is actually installed
  console.log("  periodic check installed        "+(r.ticks.length===1));
  if(r.ticks.length!==1) fail.push("no periodic check was scheduled");
  if(r.F.EVERY < 60000) fail.push("the recheck interval is under a minute, too chatty");

  r=setup("A","B",{network:"down"}); await wait(); await wait();
  console.log("  offline                         reloads="+reloads+"  banner="+added.length);
  if(reloads||added.length) fail.push("acted while offline");

  r=setup(null,"B"); await wait(); await wait();
  console.log("  page carries no stamp           reloads="+reloads);
  if(reloads) fail.push("reloaded a page with nothing to compare");

  const fs=require('fs');
  const bj=JSON.parse(fs.readFileSync(__dirname+'/../build.json','utf8')).build;
  ["index.html","word-voyagers.dc.html","field-notes.dc.html"].forEach(f=>{
    const h=fs.readFileSync(__dirname+'/../'+f,'utf8');
    const m=h.match(/window\.__BUILD__="([^"]+)"/);
    if(!m||m[1]!==bj) fail.push(f+" stamp "+(m&&m[1])+" != build.json "+bj);
    if(!/curriculum\/freshness\.js/.test(h)) fail.push(f+" does not load freshness.js");
  });
  console.log("\n  build.json = "+bj+", matches all three pages, all three load the check");

  console.log(fail.length?("\nFAILURES:\n  "+fail.join("\n  ")):"\nRESULT: reloads once at load, then offers; never interrupts work in progress.");
  process.exit(fail.length?1:0);
})();
