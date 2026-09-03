/* A parent can pass a broken step, and it never looks like work the child did. */
const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.URL={createObjectURL:()=>"b",revokeObjectURL:()=>{}};
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:""};
const fs=require('fs'), D=__dirname+'/../curriculum/';
window.Subjects={register(){},all:()=>[]};
const h=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const C=eval("(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()");
const M=window.__CURR.LA_MASTERY;
let fail=[];

console.log("=== available in both grades, on every day ===");
["y1","y2"].forEach(g=>{ ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=1; c.state.day=d; c.state.view="parent";
  const v=c.renderVals();
  const steps=M.dayPlan(g,1,d).steps.length;
  if((v.ovSteps||[]).length!==steps) fail.push(g+" "+d+" offers "+(v.ovSteps||[]).length+" of "+steps+" steps");
  if(!v.ovDayLabel) fail.push(g+" "+d+" no day label");
});});
console.log("  10 grade-days: every step of the day can be overridden");

console.log("\n=== a note is required ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Tue"; c.state.view="parent";
  let v=c.renderVals();
  if(!v.ovNotPicked) fail.push("starts with a step already picked");
  v.ovSteps[2].onClick(); v=c.renderVals();
  if(!v.ovPicked) fail.push("picking a step did not open the note field");
  v.ovSubmit();                                  // no reason yet
  if(Object.keys(c.state.overrides||{}).length) fail.push("overrode with no note");
  console.log("  submitted with no note: refused");
  console.log("  hint says: "+v.ovHint.slice(0,60)+"...");
  v.ovSetReason({target:{value:"the Next button does nothing"}});
  v=c.renderVals();
  v.ovSubmit();
  const n=Object.keys(c.state.overrides||{}).length;
  console.log("  submitted with a note: "+(n===1?"recorded":"FAILED"));
  if(n!==1) fail.push("override not recorded");
}

console.log("\n=== it unblocks the child but is not counted as his work ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Tue";
  c.startDay();
  const plan=M.dayPlan("y1",1,"Tue");
  const gz=plan.steps.filter(s=>s.key==="gz")[0];
  c.overrideStep(gz, "drill will not load");
  const v=c.renderVals();
  const i=plan.steps.findIndex(s=>s.key==="gz");
  const row=v.daySteps[i];
  console.log("  row reads: ["+row.btnLabel+"] "+row.doneNote);
  if(row.btnLabel==="Done") fail.push("an override reads exactly like completed work");
  if(!/grown-up/.test(row.doneNote||"")) fail.push("the row does not say a grown-up passed it");
  // daySteps exposes btnLabel, not a raw done flag; "Passed" IS the unblocked
  // state, and the step must no longer be the one asking to be worked
  if(row.btnLabel!=="Passed") fail.push("the override does not unblock the step: "+row.btnLabel);
  // no score is invented
  if(/Scored/.test(row.doneNote||"")) fail.push("an override claims a score");
  // and the day can now be finished
  const M2=window.__CURR.LA_MASTERY;
  M2.dayPlan("y1",1,"Tue").steps.forEach(s=>{
    if(s.key==="gz") return;
    const idx=M2.dayPlan("y1",1,"Tue").steps.findIndex(x=>x.key===s.key);
    const vv=c.renderVals();
    if(vv.daySteps[idx].btnLabel==="Done") return;
    if(s.key==="quote"){ vv.quoteMarkRead(); return; }
    c.overrideStep(s, "test");
  });
  console.log("  day complete after overrides: "+c.renderVals().showDayComplete);
  if(!c.renderVals().showDayComplete) fail.push("the child still cannot finish the day");
}

console.log("\n=== the parent tab lists what needs fixing, and can clear it ===");
{ Object.keys(store).forEach(k=>delete store[k]);   // blocks share one store
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Tue"; c.state.view="parent";
  const plan=M.dayPlan("y1",1,"Tue");
  c.overrideStep(plan.steps[2], "spelling audio silent");
  let v=c.renderVals();
  if(!v.hasOverrides) fail.push("override not listed on the parent tab");
  const e=v.overrideList[0];
  console.log("  "+e.where);
  console.log("  "+e.reason+"   ("+e.when+")");
  if(!/3rd Grade/.test(e.where)) fail.push("entry does not say which grade");
  if(!/week 1/.test(e.where))    fail.push("entry does not say which week");
  e.onClear();
  v=c.renderVals();
  console.log("  after pressing Fixed: "+(v.noOverrides?"cleared":"STILL LISTED"));
  if(!v.noOverrides) fail.push("Fixed did not clear the entry");
}

console.log("\n=== overrides sync and are cleared by a reset ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Tue";
  c.overrideStep(M.dayPlan("y1",1,"Tue").steps[1], "broken");
  c.syncSave({});
  const sent=JSON.parse(store["sync.la"]||"{}");
  if(!sent.overrides) fail.push("overrides are not synced");
  console.log("  in the synced payload: "+!!sent.overrides);
  c.state.view="parent"; c.renderVals();
  c.doReset();
  console.log("  after a full reset: "+Object.keys(c.state.overrides||{}).length+" overrides");
  if(Object.keys(c.state.overrides||{}).length) fail.push("overrides survived the reset");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.join("\n  ")):"\nRESULT: a parent can unblock a step, and it never reads as the child's work.");
process.exit(fail.length?1:0);
