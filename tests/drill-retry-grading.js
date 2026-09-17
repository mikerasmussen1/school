/* Retry rounds grade correctly, from every tab. A child deliberately gets the
 * first round wrong, the second wrong again, then answers the third correctly:
 * every correct answer must be marked correct, every short round must offer
 * the next, and passing must tick the drill's own lesson - whichever lesson is
 * selected when the drill is taken. Both grades; reading, grammar, week review
 * and find the mistake (multiple choice) and spelling (typed). */
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
let fail=[], marked=0, rounds=0;
const DAYS=["Mon","Tue","Wed","Thu","Fri"];

// slot, the tab it lives on, the step it reports to, the lesson that step belongs to
const MC=[["rq","reading","rq","Mon"],["gz","grammar","gz","Tue"],["rv","speaking","rv","Fri"]];

function mcRound(c, slot, right, label){
  let q=c.state[slot]; rounds++;
  while(q.idx<q.items.length){
    const it=q.items[q.idx];
    if(it.a===undefined || (it.options||[]).indexOf(it.a)<0){ fail.push(label+" round "+rounds+": a question has no correct option ("+(it.q||"").slice(0,40)+")"); return; }
    c.quizAnswer(slot, right ? it.a : it.options.find(o=>o!==it.a));
    if(right){ marked++; if(!c.state[slot].ok) fail.push(label+": the correct answer was marked wrong: "+(it.q||"").slice(0,50)); }
    c.quizNext(slot, null); q=c.state[slot];
  }
}
function sqRound(c, right, label){
  let s=c.state.sq; rounds++;
  while(s.idx<s.items.length){
    const it=s.items[s.idx];
    c.sqSet({target:{value: right ? it.a[0] : "zzqx"}}); c.sqCheck();
    if(right){ marked++; if(!c.state.sq.ok) fail.push(label+": the correct spelling was marked wrong: "+it.a[0]); }
    c.sqNext(); s=c.state.sq;
  }
}

console.log("=== wrong, wrong, then right - from every lesson, both grades ===");
["y1","y2"].forEach(g=>[1,14,36].forEach(w=>DAYS.forEach(sel=>{
  MC.forEach(([slot,tab,key,home])=>{
    Object.keys(store).forEach(k=>delete store[k]);
    const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=sel; c.state.view=tab;
    const label=g+" w"+w+" "+slot+" (lesson "+sel+" selected)";
    let v=c.renderVals(); v[slot+"Start"]();
    mcRound(c,slot,false,label);
    for(const right of [false,true]){
      v=c.renderVals();
      if(!v[slot+"Failed"]){ fail.push(label+": no retry offered after a short round"); return; }
      v[slot+"RemStart"](); mcRound(c,slot,right,label);
    }
    v=c.renderVals();
    if(!v[slot+"Passed"]) fail.push(label+": a round answered correctly did not pass ("+v[slot+"Final"]+")");
    if(!c.state.stepDone[g+":"+w+":"+home+":"+key]) fail.push(label+": passing did not tick the "+home+" lesson's step");
  });
  { Object.keys(store).forEach(k=>delete store[k]);
    const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=sel; c.state.view="spelling";
    const label=g+" w"+w+" sq (lesson "+sel+" selected)";
    c.sqStart(); sqRound(c,false,label);
    for(const right of [false,true]){
      const v=c.renderVals();
      if(!v.sqFailed){ fail.push(label+": no retry offered after a short round"); break; }
      v.sqRemStart(); sqRound(c,right,label);
    }
    if(!c.state.stepDone[g+":"+w+":Wed:sq"]) fail.push(label+": passing did not tick the Wed lesson's spelling step");
  }
})));
console.log("  "+rounds+" rounds; "+marked+" correct answers given in retry rounds, all checked");

console.log("\n=== find the mistake, wrong then right, on its own lesson ===");
["y1","y2"].forEach(g=>{
  Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=5; c.state.day="Thu"; c.startDay();
  c.openAssignment("fix");
  let v=c.renderVals(); v.fxStart(); mcRound(c,"fx",false,g+" fx");
  if(c.state.stepDone[g+":5:Thu:fix"]) fail.push(g+" fx: a wrong answer ticked the step");
  v=c.renderVals(); v.fxAgain(); c.renderVals().fxStart(); mcRound(c,"fx",true,g+" fx");
  if(!c.state.stepDone[g+":5:Thu:fix"]) fail.push(g+" fx: the right answer did not tick the step");
});
console.log("  both grades: wrong keeps it open, right ticks it");

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,8).join("\n  ")):"\nRESULT: retry rounds mark correct answers correct, from every tab and lesson.");
process.exit(fail.length?1:0);
