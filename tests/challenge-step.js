/* 5th grade answers the challenge on its own step. "Read it again, looking for
 * one thing" used to re-read the passage AND carry the challenge and notebook
 * Tasks 5 and 6. Now the re-read is one step and the challenge the next, every
 * lesson of the year. 3rd grade still does both in the re-read. */
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
const M=window.__CURR.LA_MASTERY, CL=window.__CURR.LA_CLOSE;
let fail=[];
const DAYS=["Mon","Tue","Wed","Thu","Fri"];

console.log("=== 5th grade: the challenge is a step of its own, every lesson ===");
for(let w=1;w<=36;w++) DAYS.forEach(d=>{
  const keys=M.dayPlan("y2",w,d).steps.map(s=>s.key);
  const i=keys.indexOf("close"), j=keys.indexOf("challenge");
  if(j<0) fail.push("5th grade week "+w+" "+d+" has no challenge step");
  else if(j!==i+1) fail.push("5th grade week "+w+" "+d+" puts the challenge at "+j+", not after the re-read");
  if(CL.dayMinutes(M.dayPlan("y2",w,d).steps)!==CL.dayMinutes(M.dayPlan("y1",w,d).steps))
    fail.push("week "+w+" "+d+" no longer takes the same time in both grades");
});
{ const s=M.dayPlan("y2",3,"Mon").steps.find(x=>x.key==="challenge");
  console.log("  "+s.label+" · "+s.minutes+" min");
  console.log("  "+s.detail);
  if(!/Tasks 5 and 6/.test(s.label)) fail.push("the step does not name Tasks 5 and 6: "+s.label);
  if(!/Decide between the two sentences/.test(s.detail)) fail.push("the step does not say to decide: "+s.detail);
}

console.log("\n=== the re-read shows the passage, the challenge step shows the challenge ===");
["y1","y2"].forEach(g=>{
  Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=3; c.state.day="Tue"; c.startDay();
  c.openAssignment("close");
  let v=c.renderVals();
  if(!v.aClose || !v.rdText) fail.push(g+" the re-read step does not show the passage");
  if(g==="y2" && v.challengeInClose) fail.push("5th grade still shows the challenge inside the re-read");
  if(g==="y1" && !v.challengeInClose) fail.push("3rd grade no longer shows the challenge in the re-read");
  if(g==="y2"){
    c.openAssignment("challenge"); v=c.renderVals();
    if(!v.aChallenge) fail.push("5th grade cannot open the challenge step");
    if(!v.challengeAsk || !v.challengeA || !v.challengeB) fail.push("the challenge step has no challenge");
    if(!v.assignCanTick) fail.push("the challenge step cannot be ticked");
    v.assignTick();
    if(!c.state.stepDone["y2:3:Tue:challenge"]) fail.push("ticking the challenge step did not record it");
    console.log("  5th grade: "+v.challengeAsk.slice(0,70)+"...");
  }
});

console.log("\n=== the markup keeps Tasks 5 and 6 with the challenge ===");
{ const a=h.indexOf('{{ aChallenge }}'), b=h.indexOf('{{ aRead }}', a);
  const seg=h.slice(a,b);
  ["{{ challengeAsk }}","{{ challengeA }}","{{ challengeB }}","Task #5","Task #6","{{ challengeThink }}"].forEach(k=>{
    if(seg.indexOf(k)<0) fail.push("the challenge step is missing "+k);
  });
  if(h.indexOf('{{ challengeInClose }}')<0) fail.push("the re-read does not switch the challenge off for 5th grade");
  console.log("  challenge, both sentences, Task #5 and Task #6 all on the challenge step");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,8).join("\n  ")):"\nRESULT: 5th grade re-reads on one step and answers the challenge on the next.");
process.exit(fail.length?1:0);
