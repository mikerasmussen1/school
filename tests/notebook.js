/* The notebook entry is a record: dated, numbered, and checkable by a parent. */
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
const CL=window.__CURR.LA_CLOSE;
let fail=[];

console.log("=== the notebook is one numbered sequence of three ===");
{ const fs2=require('fs');
  const src=fs2.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const qi=src.indexOf('{{ quoteTasks }}');
  if(qi<0) fail.push("the quote card does not carry notebook tasks");
  const ci=src.indexOf('{{ aClose }}');
  const cseg=src.slice(ci, src.indexOf('{{ aRead }}', ci));
  // Tasks 4 and 5 (copy the challenge sentence, answer the thinking question)
  // were removed from the notebook. Nothing may still ask for them: not the
  // lesson panel, not the quote card, not the parent tab.
  ["Task #4","Task #5",">Task 4<",">Task 5<","Tasks 4 and 5"].forEach(t=>{ if(src.indexOf(t)>=0) fail.push("the page still asks for "+t.replace(/[<>]/g,"")); });
  if(/copy your chosen sentence/i.test(src)) fail.push("the page still asks him to copy the challenge sentence");
  ["Task #1","Task #2","Task #3"].forEach(t=>{ if(cseg.indexOf(t)>=0) fail.push(t+" is repeated after the passage"); });
  if(cseg.indexOf('{{ lessonDateLine }}')>=0) fail.push("the date is still asked for twice");
  // the quote card must carry 1 to 3, in order
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Mon";
  const v=c.renderVals();
  const t=v.quoteTasks||[];
  if(t.length!==3) fail.push("the quote offers "+t.length+" tasks, not 3");
  t.forEach((x,i)=>{ if(x.n!=="Task #"+(i+1)) fail.push("quote task "+i+" is labelled "+x.n); });
  if(!/date/i.test(t[0].text))                 fail.push("Task 1 is not the date");
  if(!/word for word/i.test(t[1].text))        fail.push("Task 2 does not ask for the quote word for word");
  if(!/where it came from/i.test(t[1].text))   fail.push("Task 2 does not ask where the quote came from");
  if(!/means/i.test(t[2].text))                fail.push("Task 3 does not ask what the quote means");
  console.log("  quote card: Task 1 date, Task 2 quote and source, Task 3 meaning");
  console.log("  lesson panel: the challenge to decide, with no notebook tasks after it");
}

console.log("\n=== every lesson is named and says what to look for ===");
["y1","y2"].forEach(g=>{
  CL.ORDER.forEach(d=>{
    const L=CL.lessonFor(g,d);
    if(!L.lesson || L.lesson.length<12) fail.push(g+" "+d+" has no lesson name");
    if(!Array.isArray(L.look) || L.look.length<2) fail.push(g+" "+d+" gives fewer than two things to look for");
    L.look.forEach(x=>{ if(x.length<25) fail.push(g+" "+d+" has a look-for line too short to be useful"); });
  });
});
console.log("  10 grade-days named, each with 3 things to look for");

console.log("\n=== three numbered tasks, the third always the self-check ===");
["y1","y2"].forEach(g=>{
  CL.ORDER.forEach(d=>{
    const L=CL.lessonFor(g,d);
    if(L.tasks.length!==3) fail.push(g+" "+d+" has "+L.tasks.length+" tasks, not 3");
    if(!/^Check your work/.test(L.tasks[2])) fail.push(g+" "+d+" Task 3 is not the self-check");
    if(!/best handwriting/.test(L.tasks[2])) fail.push(g+" "+d+" Task 3 does not ask about handwriting");
  });
});
console.log("  all 10 grade-days: Task 1, Task 2, Task 3 = check your work");

console.log("\n=== the date to write is the lesson's scheduled date, every day, both grades ===");
{ // Task 1 used to show one fixed example date all year. It must name the
  // school day the calendar assigns to that lesson, which is also the date in
  // the lesson header, so the notebook and the schedule agree.
  const CAL=window.__CURR.LA_CALENDAR;
  const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
  const seen=new Set();
  ["y1","y2"].forEach(g=>{
    for(let w=1;w<=36;w++) CL.ORDER.forEach((d,i)=>{
      const dt=CAL.dateForIndex((w-1)*5+i);
      const want=MONTHS[dt.getMonth()]+" "+dt.getDate()+", "+dt.getFullYear();
      const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d;
      const v=c.renderVals();
      const line=(v.quoteTasks||[])[0] ? v.quoteTasks[0].text : "";
      if(!/date at the top/.test(line)) fail.push(g+" w"+w+" "+d+" Task 1 does not ask for the date");
      if(!line.endsWith(": "+want)) fail.push(g+" w"+w+" "+d+" Task 1 says '"+line.split(": ").pop()+"', schedule says "+want);
      if(v.lessonDate!==CAL.longDate(dt)) fail.push(g+" w"+w+" "+d+" header date and notebook date come from different days");
      if(g==="y1") seen.add(want);
    });
  });
  if(seen.size!==180) fail.push("the 180 lessons produce "+seen.size+" distinct notebook dates, not 180");
  // Days that prove it follows the calendar, not a count of weekdays.
  [[1,"Mon","August 31, 2026"],[2,"Mon","September 8, 2026"],[36,"Fri","June 8, 2027"]].forEach(([w,d,want])=>{
    const line=CL.dateLineFor(w,d);
    console.log("  week "+String(w).padStart(2)+" "+d+"  ->  "+line.split(": ").pop());
    if(!line.endsWith(": "+want)) fail.push("week "+w+" "+d+" should be "+want+", got "+line);
  });
  console.log("  360 grade-days: Task 1 matches the scheduled date and the lesson header");
}

console.log("\n=== the panel prints them in lesson order ===");
{ const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ aClose }}');
  const seg=src.slice(i, src.indexOf('{{ aRead }}', i));
  // The date is now Task 1 on the quote card, and the old generic task list
  // was replaced by the challenge. What must still be in order here is the
  // lesson name, what to look for, the passage, then the challenge.
  const order=["lessonName","lessonLook","rdText","challengeAsk","challengeB"];
  let last=-1;
  order.forEach(k=>{
    const at=seg.indexOf("{{ "+k+" }}");
    if(at<0){ fail.push("the lesson panel does not bind "+k); return; }
    if(at<last) fail.push(k+" appears out of order in the lesson panel");
    last=at;
  });
  if(!/>Lesson</.test(seg)) fail.push("the panel is not labelled LESSON");
  if(!/Look for this while you read/.test(seg)) fail.push("the look-for block is not labelled");
  if(/In your notebook/.test(seg)) fail.push("the lesson panel still has a notebook block");
  if(seg.indexOf("{{ challengeA }}")<0 || seg.indexOf("{{ challengeB }}")<0)
    fail.push("the lesson panel does not name both candidate sentences");
  console.log("  LESSON -> look for -> passage -> challenge");
}

console.log("\n=== the parent tab says what to check, for all five days ===");
["y1","y2"].forEach(g=>{
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=1; c.state.day="Mon"; c.state.view="parent";
  const v=c.renderVals();
  if((v.notebookGuide||[]).length!==5) fail.push(g+" parent guide covers "+(v.notebookGuide||[]).length+" days, not 5");
  (v.notebookGuide||[]).forEach(row=>{
    if(!row.day || !row.lesson) fail.push(g+" a guide row is missing its day or lesson");
    if(!row.parent || row.parent.length<60) fail.push(g+" "+row.day+" gives the parent nothing specific to check");
  });
});
{ const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Mon"; c.state.view="parent";
  const v=c.renderVals();
  console.log("  " + v.notebookGuide[0].day + " \u2014 " + v.notebookGuide[0].lesson);
  console.log("  " + v.notebookGuide[0].parent.slice(0,96) + "...");
}

console.log("\n=== each grade gets its own guidance ===");
CL.ORDER.forEach(d=>{
  if(CL.lessonFor("y1",d).parent===CL.lessonFor("y2",d).parent)
    fail.push(d+" gives both grades identical parent guidance");
  if(CL.lessonFor("y1",d).tasks[0]===CL.lessonFor("y2",d).tasks[0])
    fail.push(d+" gives both grades an identical Task 1");
});
console.log("  five days, different tasks and different guidance per grade");

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: dated, numbered notebook entries, with parent guidance for each day.");
process.exit(fail.length?1:0);
