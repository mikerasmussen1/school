/* 5th grade's 4th lesson of every week has ONE writing step: read today's
 * assignment (or listen to it) and write it by hand on paper. It used to be two
 * checklist steps for one piece of work. 3rd grade keeps its two steps. */
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
const LABEL="Read today's assignment and write it by hand on paper";

console.log("=== 5th grade, every week: one step for the assignment and the writing ===");
for(let w=1;w<=36;w++){
  const p=M.dayPlan("y2",w,"Thu");
  const keys=p.steps.map(s=>s.key).join(">");
  if(keys!=="quote>fix>close>write>approve>end") fail.push("5th grade week "+w+" lesson 4 steps are "+keys);
  const s=p.steps.find(x=>x.key==="write")||{};
  if(s.label!==LABEL) fail.push("week "+w+" writing step is labelled "+s.label);
  if(!/Read the assignment, or press the listen button\./.test(s.detail||"") || !/write the whole thing out on paper/.test(s.detail||""))
    fail.push("week "+w+" writing step does not say to read the assignment and write it out");
  if(p.steps.map(x=>x.n).join(",")!=="1,2,3,4,5,6") fail.push("week "+w+" steps are not numbered 1 to 6");
}
{ const p=M.dayPlan("y2",4,"Thu");
  p.steps.forEach(s=>console.log("  "+s.n+". "+s.label+" · "+(s.minutes||CL.minutesFor(s.key))+" min"));
  if(CL.dayMinutes(p.steps)!==CL.dayMinutes(M.dayPlan("y1",4,"Thu").steps)) fail.push("merging changed the lesson's total minutes");
}

console.log("\n=== the merged step opens the assignment, and ticking it finishes the writing ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y2"; c.state.week=4; c.state.day="Thu"; c.startDay();
  let v=c.renderVals();
  const row=v.daySteps.find(x=>/Read today's assignment and write it/.test(x.label));
  if(!row) fail.push("the checklist has no merged writing row");
  else if(row.mins!=="12 min") fail.push("the merged row shows "+row.mins);
  c.openAssignment("write"); v=c.renderVals();
  if(!v.aTask) fail.push("opening the merged step does not show the assignment");
  if(!v.asTitle || !v.asInstructions) fail.push("the assignment has no title or instructions");
  console.log("  opens: "+v.asTitle+" — "+String(v.asInstructions).slice(0,60)+"...");
  if(!v.assignCanTick) fail.push("the merged step cannot be ticked");
  v.assignTick();
  if(!c.state.stepDone["y2:4:Thu:write"]) fail.push("ticking the merged step did not record the writing");
  if(c.state.stepDone["y2:4:Thu:prompt"]) fail.push("a separate assignment tick was recorded");
  if(c.renderVals().daySteps.some(x=>/^\d+\. Read today's assignment$/.test(x.label))) fail.push("a separate Read today's assignment row is still shown");
}

console.log("\n=== the grown-up step asks for feedback and changes, both grades ===");
["y1","y2"].forEach(g=>{
  const a=M.dayPlan(g,4,"Thu").steps.find(x=>x.key==="approve")||{};
  if(a.detail!=="Carry the paper to a grown-up. They look at the real page, and provide feedback here. Make any changes to address their feedback.")
    fail.push(g+" the grown-up step reads: "+a.detail);
});
console.log("  "+(M.dayPlan("y2",4,"Thu").steps.find(x=>x.key==="approve")||{}).label+": "+(M.dayPlan("y2",4,"Thu").steps.find(x=>x.key==="approve")||{}).detail);

console.log("\n=== 3rd grade keeps its two steps ===");
{ const keys=M.dayPlan("y1",4,"Thu").steps.map(s=>s.key).join(">");
  if(keys!=="quote>fix>close>prompt>write>approve>end") fail.push("3rd grade lesson 4 changed: "+keys);
  console.log("  3rd grade: "+M.dayPlan("y1",4,"Thu").steps.map(s=>s.label).join(" > "));
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,8).join("\n  ")):"\nRESULT: 5th grade reads and writes its assignment as one step.");
process.exit(fail.length?1:0);
