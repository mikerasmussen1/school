/* The lesson's date and today's date are both on screen, and are not confused. */
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
const CAL=window.__CURR.LA_CALENDAR;
let fail=[];

function view(g,w,d){
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d;
  c.startDay(); return c.renderVals();
}

console.log("=== every day of the year carries a date, both grades ===");
["y1","y2"].forEach(g=>{
  for(let w=1;w<=36;w++) ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const v=view(g,w,d);
    if(!v.lessonDate) fail.push(g+" w"+w+" "+d+" has no lesson date");
    if(!v.todayDate)  fail.push(g+" w"+w+" "+d+" has no today date");
    if(v.datesSame===v.datesDiffer) fail.push(g+" w"+w+" "+d+" cannot decide whether the dates match");
  });
});
console.log("  360 grade-days: lesson date and today's date both present, exactly one state");

console.log("\n=== the lesson date is the SCHOOL day, not the weekday ===");
[[1,"Mon"],[1,"Fri"],[2,"Mon"],[20,"Thu"]].forEach(([w,d])=>{
  const v=view("y1",w,d);
  console.log("  week "+String(w).padStart(2)+" "+d+"  ->  "+v.lessonDate);
});
{ // week 2 Monday falls on a Tuesday because Labor Day removed a school day
  const v=view("y1",2,"Mon");
  if(!/Tuesday 8 September 2026/.test(v.lessonDate))
    fail.push("week 2 Monday should fall on Tuesday 8 September, got "+v.lessonDate);
}

console.log("\n=== when they differ, both are named and labelled ===");
{ const v=view("y1",20,"Thu");
  console.log("  lesson : "+v.lessonDate);
  console.log("  today  : "+v.todayDate);
  if(!v.datesDiffer) fail.push("a far-off lesson is not reported as differing from today");
  if(v.lessonDate===v.todayDate) fail.push("the two dates are identical when they should not be");
}

console.log("\n=== the markup shows both, and only one line when they match ===");
{ const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ dayHeading }}');
  const seg=src.slice(i, i+1200);
  if(seg.indexOf('{{ lessonDate }}')<0) fail.push("the header does not bind the lesson date");
  if(seg.indexOf('{{ todayDate }}')<0)  fail.push("the header does not bind today's date");
  if(seg.indexOf('{{ datesSame }}')<0 || seg.indexOf('{{ datesDiffer }}')<0)
    fail.push("the header does not switch between the matching and differing cases");
  if(!/This lesson is for/.test(seg)) fail.push("the differing case does not say which date is which");
  console.log("  both bound, with a single line when the lesson is today");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,5).join("\n  ")):"\nRESULT: the lesson's date and today's date are both shown, and distinguished.");
process.exit(fail.length?1:0);
