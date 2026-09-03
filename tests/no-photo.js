const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.URL={createObjectURL:()=>"b",revokeObjectURL:()=>{}};
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:""};
const fs=require('fs'), D='/home/claude/school/curriculum/';
window.Subjects={register(){},all:()=>[]};
const h=fs.readFileSync('/home/claude/school/word-voyagers.dc.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const C=eval("(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()");
const M=window.__CURR.LA_MASTERY;
let fail=[];
/* Drive a day by STEP KEY, not by index. Every time a step is added to the
   plan every index-based harness breaks at once, which teaches nothing except
   that the indices moved. */
function stepIndex(c, key){
  const M=window.__CURR.LA_MASTERY;
  return M.dayPlan(c.state.year||"y1", c.state.week, c.state.day).steps.findIndex(s=>s.key===key);
}
function doStep(c, key){
  const i=stepIndex(c,key);
  if(i<0) return false;
  const M=window.__CURR.LA_MASTERY;
  const step=M.dayPlan(c.state.year||"y1", c.state.week, c.state.day).steps[i];
  let v=c.renderVals();
  if(v.daySteps[i].btnLabel==="Done") return true;
  if(key==="quote"){ v.quoteMarkRead(); return true; }
  v.daySteps[i].onClick();
  v=c.renderVals();
  if(step.gate==="ack"){ v.assignTick(); return true; }
  if(step.gate==="approve"){ v.approveGrades[2].onClick(); c.renderVals().approveSubmit(); return true; }
  if(step.gate==="end"){ v.daySteps[i].onClick(); return true; }
  if(step.gate==="photo"){ c.markStuck(step); return true; }
  // scored: answer every question correctly
  const slot={fix:"fx",rq:"rq",gz:"gz",sq:"sq",rv:"rv"}[key];
  if(!slot) return false;
  v=c.renderVals();
  if(slot==="sq"){
    c.sqStart();
    while(c.state.sq && c.state.sq.idx<c.state.sq.items.length){
      if(!c.state.sq.answered){ c.sqSet({target:{value:c.state.sq.items[c.state.sq.idx].a[0]}}); c.sqCheck(); }
      c.sqNext();
    }
    return true;
  }
  v[slot+"Start"]();
  while(c.state[slot] && c.state[slot].idx<c.state[slot].items.length){
    const it=c.state[slot].items[c.state[slot].idx];
    c.quizAnswer(slot, it.a);
    c.renderVals()[slot+"Next"]();
  }
  return true;
}
function finishWholeDay(c){
  const M=window.__CURR.LA_MASTERY;
  M.dayPlan(c.state.year||"y1", c.state.week, c.state.day).steps.forEach(s=>doStep(c, s.key));
  return c.renderVals();
}


console.log("=== NEITHER grade has a photo step ===");
for(let w=1;w<=36;w++){
  ["y1","y2"].forEach(g=>{
    const keys=M.dayPlan(g,w,"Thu").steps.map(s=>s.key);
    if(keys.indexOf("photo")>=0) fail.push(g+" w"+w+" still has the photo step");
    if(keys.indexOf("approve")<0) fail.push(g+" w"+w+" lost the grown-up step");
  });
}
console.log("  36 weeks x 2 grades: no photo step anywhere, grown-up step intact");

console.log("\n=== steps renumber with no gap ===");
{ const st=M.dayPlan("y1",9,"Thu").steps;
  console.log("  3rd Thu: "+st.map(s=>s.n+"."+s.key).join("  "));
  st.forEach((s,i)=>{ if(s.n!==i+1) fail.push("3rd Thu numbering has a gap at "+s.key); });
}

console.log("\n=== the Writing tab buttons are gone in both grades ===");
[["y1",false],["y2",false]].forEach(([g,want])=>{
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=9; c.state.view="writing";
  const v=c.renderVals();
  console.log("  "+(g==="y1"?"3rd":"5th")+": photo controls shown = "+v.photoGrading);
  if(v.photoGrading!==want) fail.push(g+" photoGrading is "+v.photoGrading+", expected "+want);
  if(!v.noPhotoNote) fail.push(g+" shows no explanation in place of the buttons");
  if(/photo|Grade this work/i.test(String(v.asInstructions)))
    fail.push(g+" handwriting instructions still mention photographing the page");
});

console.log("\n=== Thursday still completes for a 3rd grader ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Thu";
  c.startDay();
  const v0=finishWholeDay(c);
  console.log("  "+v0.daySteps.map(s=>s.btnLabel).join(" | "));
  console.log("  day complete: "+v0.showDayComplete);
  var v=v0;
  if(!v.showDayComplete) fail.push("a 3rd grader cannot finish Thursday");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.join("\n  ")):"\nRESULT: no photo step or buttons in either grade; the grown-up marks the page.");
process.exit(fail.length?1:0);
