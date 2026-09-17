/* Every scored drill continues until 80%, in both grades. A short round never
 * ticks the step: it builds another round from what was missed, with no limit.
 * After three short rounds the drill is flagged for a grown-up, and the step
 * still waits for 80%. The real quiz flow is driven for reading, grammar and
 * the week review; spelling and find-the-mistake go through the same finish. */
const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.URL={createObjectURL:()=>"b",revokeObjectURL:()=>{}};
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:""};
const fs=require('fs'), D=__dirname+'/../curriculum/';
window.Subjects={register(){},all:()=>[],get(){return null;}};
const h=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const C=eval("(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()");
const M=window.__CURR.LA_MASTERY;
let fail=[];

const DRILLS=[["rq","Mon","reading"],["gz","Tue","grammar"],["sq","Wed","spelling"],["rv","Fri","grammar"],["fix","Mon","grammar"]];
function fresh(g,d){
  Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=3; c.state.day=d; c.startDay();
  return c;
}
const isDone=(c,key)=>{ const v=c.renderVals(); const r=v.daySteps.filter(x=>x.label===M.dayPlan(c.state.year,3,c.state.day).steps.find(s=>s.key===key).n+". "+M.dayPlan(c.state.year,3,c.state.day).steps.find(s=>s.key===key).label)[0];
  return !!c.state.stepDone[c.state.year+":3:"+c.state.day+":"+key]; };

console.log("=== a short round never ticks the step, however many rounds ===");
["y1","y2"].forEach(g=>DRILLS.forEach(([key,d,kind])=>{
  const c=fresh(g,d);
  const step=M.dayPlan(g,3,d).steps.find(s=>s.key===key);
  if(!step){ fail.push(g+" "+key+" has no step"); return; }
  const missed=[{id:"m1",q:"q",a:"a"}];
  for(let r=1;r<=6;r++){
    c.finishScored(step, kind, 1, 5, missed, ["m1"]);          // 20%
    if(isDone(c,key)) { fail.push(g+" "+key+" ticked off after short round "+r); break; }
    if(!c.state.remediation) { fail.push(g+" "+key+" offers no next round after short round "+r); break; }
    if(r<3 && c.state.stuck[g+":3:"+d+":"+key]) fail.push(g+" "+key+" flagged after only "+r+" short rounds");
    if(r===3 && !c.state.stuck[g+":3:"+d+":"+key]) fail.push(g+" "+key+" not flagged after 3 short rounds");
  }
  if(!c.state.stuck[g+":3:"+d+":"+key]) fail.push(g+" "+key+" not flagged for a grown-up after 6 short rounds");
  c.finishScored(step, kind, 4, 5, [], ["m1"]);                // 80%
  if(!isDone(c,key)) fail.push(g+" "+key+" did not tick off at 80%");
  if(c.state.remediation) fail.push(g+" "+key+" still offers a round after passing");
}));
console.log("  both grades x reading, grammar, spelling, week review, find the mistake: 6 short rounds, still open; 80% ticks it");

console.log("\n=== the real reading drill, answered wrong, then right ===");
{ const c=fresh("y2","Mon");
  c.openAssignment("rq");
  let v=c.renderVals(); v.rqStart();
  const answerAll=(right)=>{ let q=c.state.rq; while(q.idx<q.items.length){ const it=q.items[q.idx];
      const choice=right ? it.a : (it.options||[]).find(x=>x!==it.a) || "zzz";
      c.quizAnswer("rq", choice); c.quizNext("rq", null); q=c.state.rq; } };
  answerAll(false);
  v=c.renderVals();
  console.log("  all wrong: "+v.rqFinal+" · "+v.rqPct);
  if(isDone(c,"rq")) fail.push("a failed reading drill ticked its step");
  if(!v.rqFailed) fail.push("a failed reading drill shows no next round");
  if(!/Not finished yet/.test(h)) fail.push("the page never says the drill is not finished");
  console.log("  offers: "+v.rqRemLabel);
  v.rqRemStart();
  // the retry round is the questions that were missed, each still answerable
  if(c.state.rq.items.some(it=>it.a===undefined || (it.options||[]).indexOf(it.a)<0)) fail.push("a retry question has no answer among its options");
  answerAll(true);
  v=c.renderVals();
  console.log("  next round, all right: "+v.rqFinal+" · "+v.rqPct);
  if(!isDone(c,"rq")) fail.push("passing the next round did not tick the reading step");
}

console.log("\n=== the words on screen match the rule ===");
{ if(/ticked off either way/.test(h)) fail.push("a banner still says the step is ticked off either way");
  if(/under 80% still ticks its step off/.test(h)) fail.push("the parent tab still says under 80% ticks the step");
  if(/round "\+st\.remediation\.round\+" of "/.test(h)) fail.push("a round label still counts down to a limit");
  ["sqFailed","rvFailed"].forEach(k=>{
    const home=h.slice(h.indexOf('<sc-if value="{{ isHome }}"'), h.indexOf('<sc-if value="{{ isMap }}"'));
    if(home.indexOf("{{ "+k+" }}")<0) fail.push("the Today tab has no next round for "+k.slice(0,2));
  });
  console.log("  banners say “Not finished yet”; Today tab offers the next round for every drill");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,8).join("\n  ")):"\nRESULT: every drill continues until 80%, in both grades.");
process.exit(fail.length?1:0);
