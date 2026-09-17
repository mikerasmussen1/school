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

console.log("=== the notebook is one numbered sequence of six ===");
{ const fs2=require('fs');
  const src=fs2.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const qi=src.indexOf('{{ quoteTasks }}');
  if(qi<0) fail.push("the quote card does not carry notebook tasks");
  const ci=src.indexOf('{{ aClose }}');
  const cseg=src.slice(ci, src.indexOf('{{ aRead }}', ci));
  ["Task #5","Task #6"].forEach(t=>{ if(cseg.indexOf(t)<0) fail.push("the lesson panel is missing "+t); });
  ["Task #1","Task #2","Task #3","Task #4"].forEach(t=>{ if(cseg.indexOf(t)>=0) fail.push(t+" is repeated after the passage"); });
  if(!/Tasks 5 and 6 come later, after the reading passage\./.test(src)) fail.push("the quote card does not say Tasks 5 and 6 come later");
  if(!/Done \u2014 tasks 1 to 4 written/.test(src)) fail.push("the quote card's button does not say tasks 1 to 4");
  if(cseg.indexOf('{{ lessonDateLine }}')>=0) fail.push("the date is still asked for twice");
  // the quote card must carry 1 to 3, in order
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Mon";
  const v=c.renderVals();
  const t=v.quoteTasks||[];
  if(t.length!==4) fail.push("the quote offers "+t.length+" tasks, not 4");
  t.forEach((x,i)=>{ if(x.n!=="Task #"+(i+1)) fail.push("quote task "+i+" is labelled "+x.n); });
  if(!/date/i.test(t[0].text))                 fail.push("Task 1 is not the date");
  const WANT={1:"Copy today's quote word for word, exactly as it is written.",
              2:"Write where it came from to give proper credit to the author.",
              3:"Write what this quote's translation means to you (or what you think it means.) One or two sentences is sufficient."};
  [1,2,3].forEach(i=>{ if(!t[i] || t[i].text!==WANT[i]) fail.push("Task #"+(i+1)+" is not the agreed wording: "+(t[i]||{}).text); });
  const TASK3="Write what this quote's translation means to you (or what you think it means.) One or two sentences is sufficient.";
  ["y1","y2"].forEach(g=>{ const c2=new C(); c2.state.landed=true; c2.state.year=g; c2.state.week=20; c2.state.day="Thu";
    const t4=((c2.renderVals().quoteTasks||[])[3]||{}).text;
    if(t4!==TASK3) fail.push(g+" Task 4 is not the agreed wording: "+t4); });
  // The line under the quote's source is labelled "Translation:". The quote is
  // shown in one place: the quote step's panel.
  { const labels=(fs2.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8').match(/>(\w+): <\/span>\{\{ qThink \}\}/g)||[]);
    if(labels.length!==1 || labels[0].indexOf(">Translation: <")!==0) fail.push("the line under the quote is not labelled Translation: "+labels.join(", ")); }
  console.log("  quote card: Task 1 date, Task 2 the quote, Task 3 where it came from, Task 4 what the translation means");
  console.log("  lesson panel: Task 5 challenge sentence, Task 6 critical thinking");
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

console.log("\n=== Task 1 asks for today's date, in each grade's own wording, every day ===");
{ // Self-paced course: Task 1 asks for the day the work is done, never a
  // lesson's scheduled date. Both grades give the weekday format with one
  // fixed example date each.
  const WANT={
    y1:"Write today's date in your notebook following this format: Weekday, Month, Day, Year.  Example: Friday, January 5, 2018 (one of the best days of Nana's life!)",
    y2:"Write today's date in your notebook following this format: Weekday, Month, Day, Year.  Example: Saturday, March 5, 2016 (one of the best days of Nana's life!)"
  };
  ["y1","y2"].forEach(g=>{
    console.log("  "+g+": "+CL.dateLineFor(g));
    if(CL.dateLineFor(g)!==WANT[g]) fail.push(g+" Task 1 wording is not the agreed text: "+CL.dateLineFor(g));
    for(let w=1;w<=36;w++) CL.ORDER.forEach(d=>{
      const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d;
      const v=c.renderVals();
      const line=((v.quoteTasks||[])[0]||{}).text||"";
      if(line!==WANT[g]) fail.push(g+" w"+w+" "+d+" Task 1 differs: "+line);
    });
    const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=1; c.state.day="Mon"; c.state.view="parent";
    const p=c.renderVals().dateTaskParent||"";
    if(!/Weekday, Month Day, Year/.test(p) || !(g==="y2" ? /March 5, 2016/ : /January 5, 2018/).test(p))
      fail.push(g+" parent tab describes Task 1 as: "+p);
  });
  if((WANT.y1.match(/\d{4}/g)||[]).join()!=="2018") fail.push("3rd grade Task 1 shows a date other than the example");
  if((WANT.y2.match(/\d{4}/g)||[]).join()!=="2016") fail.push("5th grade Task 1 shows a date other than the example");
  console.log("  360 grade-days: each grade's Task 1 exactly as agreed, and the parent tab matches");
}

console.log("\n=== the panel prints them in lesson order ===");
{ const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ aClose }}');
  const seg=src.slice(i, src.indexOf('{{ aRead }}', i));
  // The date is now Task 1 on the quote card, and the old generic task list
  // was replaced by the challenge. What must still be in order here is the
  // lesson name, what to look for, the passage, then the challenge.
  const order=["lessonName","lessonLook","rdText","challengeAsk","challengeThink"];
  let last=-1;
  order.forEach(k=>{
    const at=seg.indexOf("{{ "+k+" }}");
    if(at<0){ fail.push("the lesson panel does not bind "+k); return; }
    if(at<last) fail.push(k+" appears out of order in the lesson panel");
    last=at;
  });
  if(!/>Lesson</.test(seg)) fail.push("the panel is not labelled LESSON");
  if(!/Look for this while you read/.test(seg)) fail.push("the look-for block is not labelled");
  if(!/In your notebook/.test(seg)) fail.push("the notebook block is not labelled");
  if(seg.indexOf("{{ challengeA }}")<0 || seg.indexOf("{{ challengeB }}")<0)
    fail.push("the lesson panel does not name both candidate sentences");
  console.log("  LESSON -> look for -> passage -> challenge -> critical thinking");
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
