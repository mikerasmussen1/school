/* Every day carries comprehension work and runs near half an hour. */
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
const M=window.__CURR.LA_MASTERY, CL=window.__CURR.LA_CLOSE;
let fail=[];

console.log("=== every day has comprehension work ===");
["y1","y2"].forEach(g=>{
  ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const keys=M.dayPlan(g,9,d).steps.map(s=>s.key);
    if(keys.indexOf("close")<0) fail.push(g+" "+d+" has no close-reading step");
  });
});
console.log("  10 grade-days: a close read on every one (it was Monday only)");

console.log("\n=== each day estimates near thirty minutes ===");
["y1","y2"].forEach(g=>{
  let line="  "+(g==="y1"?"3rd":"5th")+": ";
  ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const m=CL.dayMinutes(M.dayPlan(g,9,d).steps);
    line+=d+" "+m+"  ";
    if(m<22) fail.push(g+" "+d+" is only "+m+" minutes");
    if(m>38) fail.push(g+" "+d+" is "+m+" minutes, too long for one sitting");
  });
  console.log(line);
});

console.log("\n=== the five purposes are distinct, in both grades ===");
["y1","y2"].forEach(g=>{
  const seen={};
  CL.ORDER.forEach(d=>{
    const c=CL.closeFor(g,d);
    // focus is a heading, so it is SHORT by design; the other three are prose
    if(!c.focus || c.focus.length<8) fail.push(g+" "+d+" focus is missing or too short");
    ["look","write","check"].forEach(k=>{
      if(!c[k] || String(c[k]).length<40) fail.push(g+" "+d+" "+k+" is missing or too short");
    });
    if(seen[c.focus]) fail.push(g+" repeats the purpose \""+c.focus+"\"");
    seen[c.focus]=1;
  });
  console.log("  "+(g==="y1"?"3rd":"5th")+": "+CL.ORDER.map(d=>CL.closeFor(g,d).focus).join(" | "));
});

console.log("\n=== the two grades ask different things ===");
CL.ORDER.forEach(d=>{
  if(CL.closeFor("y1",d).write===CL.closeFor("y2",d).write)
    fail.push(d+" gives both grades the identical written task");
});
console.log("  five days: each grade has its own wording and demand");

console.log("\n=== the panel renders the whole step ===");
["y1","y2"].forEach(g=>{
  for(const d of ["Mon","Tue","Wed","Thu","Fri"]){
    for(const w of [1,18,36]){
      const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d;
      c.startDay(); c.openAssignment("close");
      const v=c.renderVals();
      if(!v.aClose) fail.push(g+" "+d+" w"+w+" close panel does not open");
      ["lessonName","lessonDateLine","lessonParent"].forEach(k=>{
        if(!v[k]) fail.push(g+" "+d+" w"+w+" missing "+k);
      });
      if((v.lessonLook||[]).length<2) fail.push(g+" "+d+" w"+w+" has fewer than two things to look for");
      if((v.lessonTasks||[]).length!==3) fail.push(g+" "+d+" w"+w+" does not have three numbered tasks");
      v.lessonTasks.forEach((t,i)=>{ if(t.n!=="Task #"+(i+1)) fail.push(g+" "+d+" task "+i+" is labelled "+t.n); });
      if(!/Check your work/.test(v.lessonTasks[2].text)) fail.push(g+" "+d+" Task #3 is not the self-check");
      if(String(v.rdText||"").length<150) fail.push(g+" "+d+" w"+w+" no passage to re-read");
      if(!v.dayMinutes) fail.push(g+" "+d+" w"+w+" no time estimate shown");
    }
  }
});
console.log("  30 grade-day-weeks: purpose, passage, writing task and self-check all present");

console.log("\n=== the markup binds them ===");
{ const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ aClose }}');
  const seg=src.slice(i, src.indexOf('{{ aRead }}', i));
  ["lessonName","rdText","challengeAsk"].forEach(k=>{
    if(seg.indexOf("{{ "+k+" }}")<0) fail.push("the lesson panel does not bind "+k);
  });
  ["lessonLook"].forEach(k=>{
    if(seg.indexOf("{{ "+k+" }}")<0) fail.push("the lesson panel does not loop over "+k);
  });
  // The date is Task #1 of the day's notebook entry and is printed with the quote.
  if(src.indexOf('sc-for list="{{ quoteTasks }}"')<0)
    fail.push("the date line (Task #1) is not printed with the quote");
  // what to look for must come BEFORE the passage, or it is a quiz not a purpose
  if(seg.indexOf("{{ lessonLook }}") > seg.indexOf("{{ rdText }}"))
    fail.push("the things to look for are printed AFTER the passage");
  // the notebook challenge (Tasks #4 and #5) comes after the passage
  if(seg.indexOf("{{ rdText }}") > seg.indexOf("{{ challengeAsk }}"))
    fail.push("the notebook challenge is printed BEFORE the passage");
  if(src.indexOf("{{ s.mins }}")<0)     fail.push("step times are not shown on the checklist");
  if(src.indexOf("{{ dayMinutes }}")<0) fail.push("the day total is not shown");
  console.log("  purpose, passage, task, self-check, per-step and per-day times all bound");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: comprehension every day, and a day that runs about half an hour.");
process.exit(fail.length?1:0);
