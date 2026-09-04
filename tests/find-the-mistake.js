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
const M=window.__CURR.LA_MASTERY, F=window.__CURR.LA_FIX;
let fail=[];

console.log("=== a Find the mistake step on every day, both grades ===");
["y1","y2"].forEach(g=>{ ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
  const keys=M.dayPlan(g,9,d).steps.map(s=>s.key);
  if(keys.indexOf("fix")<0) fail.push(g+" "+d+" has no fix step");
  if(keys[1]!=="fix") fail.push(g+" "+d+" fix is not step 2, got "+keys[1]);
});});
console.log("  10 grade-days checked: present on every one, as step 2");

console.log("\n=== the drill ticks its step and shows the correction ===");
["y1","y2"].forEach(g=>{
  Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=1; c.state.day="Mon";
  c.startDay(); c.openAssignment("fix");
  let v=c.renderVals();
  if(!v.aFix) fail.push(g+" fix panel does not open");
  if(!v.fixSentence) fail.push(g+" no sentence shown");
  v.fxStart(); v=c.renderVals();
  // two stages now: find the word, then choose the corrected sentence
  if(c.state.fx.items.length!==2) fail.push(g+" drill is not two stages");
  const s1=c.state.fx.items[0];
  c.quizAnswer("fx", s1.a); c.renderVals().fxNext();
  const mid=c.renderVals();
  if(!/written correctly/.test(mid.fxPrompt||"")) fail.push(g+" stage two is not the repair question");
  if((mid.fxChoices||[]).length!==4) fail.push(g+" stage two does not offer four sentences");
  if(!mid.fixSentence) fail.push(g+" the faulty sentence is not on screen during the drill");
  const s2=c.state.fx.items[1];
  c.quizAnswer("fx", s2.a); c.renderVals().fxNext();
  v=c.renderVals();
  const row=v.daySteps[1];
  console.log("  "+(g==="y1"?"3rd":"5th")+": \""+v.fixSentence+"\"");
  console.log("       answered -> ["+row.btnLabel+"] "+row.doneNote);
  console.log("       correction: "+v.fixCorrected);
  if(row.btnLabel!=="Done") fail.push(g+" the fix step did not tick");
  if(!/Scored 2 out of 2/.test(row.doneNote||"")) fail.push(g+" both stages not scored");
  if(!v.fixCorrected) fail.push(g+" correction not shown");
});

// A finished drill must not survive a change of day, week or grade. The fix
// slot was missing from every reset list, so Wednesday opened showing
// Tuesday's completed drill - correction included - before the child had
// guessed anything.
// The sentence must appear ONCE on screen: in its box, not also inside the
// question. Printing it twice reads as two different sentences being shown.
// Reopening a completed drill must offer the exercise again, never the
// mistake and its answer side by side with nothing to do.
console.log("\n=== reopening a finished drill gives a fresh attempt ===");
{ let bad=0;
  ["y1","y2"].forEach(g=>{ F.DAYS.forEach(d=>{
    Object.keys(store).forEach(k=>delete store[k]);
    const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=1; c.state.day=d;
    c.startDay(); c.openAssignment("fix");
    let v=c.renderVals(); v.fxStart();
    while(c.state.fx && c.state.fx.idx<c.state.fx.items.length){
      const it=c.state.fx.items[c.state.fx.idx]; c.quizAnswer("fx", it.a); c.renderVals().fxNext();
    }
    const done=c.renderVals();
    if(!done.fxDone) fail.push(g+" "+d+" drill did not finish");
    if(typeof done.fxAgain!=="function") fail.push(g+" "+d+" finished state offers no way to try again");
    c.closeAssignment(); c.openAssignment("fix");
    const re=c.renderVals();
    if(re.fxDone || !re.fxNotStarted){ bad++;
      fail.push(g+" "+d+" reopens showing the answer with nothing to attempt"); }
    // and the redo button works from the finished state
    const c2=new C(); c2.state.landed=true; c2.state.year=g; c2.state.week=1; c2.state.day=d;
    c2.startDay(); c2.openAssignment("fix");
    let w=c2.renderVals(); w.fxStart();
    while(c2.state.fx && c2.state.fx.idx<c2.state.fx.items.length){
      const it=c2.state.fx.items[c2.state.fx.idx]; c2.quizAnswer("fx", it.a); c2.renderVals().fxNext();
    }
    c2.renderVals().fxAgain();
    if(!c2.renderVals().fxNotStarted) fail.push(g+" "+d+" Try it again does not restart the drill");
  });});
  console.log("  10 grade-days: reopened unstarted, and Try it again restarts it");
}

console.log("\n=== the faulty sentence is shown once, and only once ===");
{ let dup=0, missing=0;
  ["y1","y2"].forEach(g=>{ for(let w=1;w<=36;w++) F.DAYS.forEach(d=>{
    const set=F.setFor(g,w,d);
    const q=set.items[0].q;
    const sent=F.fixFor(g,w,d).sentence;
    if(q.indexOf(sent)>=0) dup++;
    if(!/^Which word is wrong\?$|^Which word needs punctuation after it\?$|^Which word has a punctuation mark that should not be there\?$/.test(q)) missing++;
  });});
  console.log("  questions that repeat the sentence: "+dup);
  console.log("  questions with an unexpected prompt: "+missing);
  if(dup)     fail.push(dup+" questions print the sentence a second time");
  if(missing) fail.push(missing+" questions have an unexpected prompt");

  // and the two stages must stay in order: find the word, THEN repair
  let wrongOrder=0;
  ["y1","y2"].forEach(g=>{ for(let w=1;w<=36;w++) F.DAYS.forEach(d=>{
    const items=F.drillFor(g,w,d).items;
    if(!/^Which word/.test(items[0].q)) wrongOrder++;
    if(!/written correctly/.test(items[1].q)) wrongOrder++;
  });});
  console.log("  drills with the stages out of order: "+wrongOrder);
  if(wrongOrder) fail.push(wrongOrder+" drills show the repair before the child has guessed");
}

console.log("\n=== a finished drill does not follow you to the next day ===");
{ const moves=[
    ["next day",   c=>c.setDay("Wed")],
    ["next week",  c=>c.setWeek(2)],
    ["other grade",c=>c.setYear("y2")]
  ];
  moves.forEach(([label, move])=>{
    Object.keys(store).forEach(k=>delete store[k]);
    const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1;
    c.setDay("Tue"); c.startDay(); c.openAssignment("fix");
    let v=c.renderVals(); v.fxStart();
    while(c.state.fx && c.state.fx.idx<c.state.fx.items.length){
      const it=c.state.fx.items[c.state.fx.idx]; c.quizAnswer("fx", it.a); c.renderVals().fxNext();
    }
    if(!c.renderVals().fxDone) fail.push("setup: Tuesday drill did not finish");
    move(c); c.startDay(); c.openAssignment("fix");
    const nv=c.renderVals();
    console.log("  after "+label.padEnd(12)+"fxNotStarted="+nv.fxNotStarted+"  fxDone="+nv.fxDone);
    if(nv.fxDone)       fail.push("after "+label+" the drill opens already finished, showing the answer");
    if(!nv.fxNotStarted) fail.push("after "+label+" the drill does not start clean");
  });
  // the same must hold for every other drill slot
  ["gz","sq","rq","rv"].forEach(slot=>{
    const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Tue";
    c.state[slot]={idx:99,items:[],score:0};
    c.setDay("Wed");
    if(c.state[slot]) fail.push(slot+" survives a day change");
  });
  console.log("  every drill slot cleared on a day change: yes");
}

console.log("\n=== every day of the year has a sentence, and it changes ===");
["y1","y2"].forEach(g=>{
  const seen={}, all=[];
  for(let w=1;w<=36;w++) ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const f=F.fixFor(g,w,d);
    if(!f.sentence) fail.push(g+" w"+w+d+" empty");
    all.push(f.sentence); seen[f.sentence]=(seen[f.sentence]||0)+1;
  });
  const uniq=Object.keys(seen).length;
  const twice=Object.values(seen).filter(n=>n===2).length;
  console.log("  "+(g==="y1"?"3rd":"5th")+": "+all.length+" days, "+uniq+" distinct sentences, "+twice+" seen exactly twice");
  if(uniq!==90) fail.push(g+" expected 90 distinct sentences, got "+uniq);
  if(twice!==90) fail.push(g+" repeats are not evenly spread");
  // the repeat must be far away, not next week
  const first=F.indexFor(1,"Mon"), second=first+90;
  if(F.fixFor(g,1,"Mon").sentence!==F.fixFor(g,19,"Mon").sentence)
    fail.push(g+" the repeat is not 18 weeks later");
});


// no item may ask "which word is wrong" when only punctuation changes, and
// every option must be a word from the sentence
{ const strip=x=>x.replace(/[.,;:!?\u201c\u201d"]/g,'').replace(/\s+/g,' ').trim();
  let n=0;
  ["y1","y2"].forEach(g=>{
    (g==="y2"?F.Y2:F.Y1).forEach((r,i)=>{
      const [sent,opts,ans,fixed,kind]=r; n++;
      opts.forEach(o=>{ if(sent.indexOf(o)<0) fail.push(g+" #"+(i+1)+" offers an option that is not in the sentence: "+o); });
      const punctOnly = strip(sent)===strip(fixed);
      if(punctOnly && !kind) fail.push(g+" #"+(i+1)+" is punctuation-only but asks which WORD is wrong");
      if(kind && !punctOnly)  fail.push(g+" #"+(i+1)+" is tagged "+kind+" but a word changed too");
      if(sent===fixed) fail.push(g+" #"+(i+1)+" correction is identical");
    });
  });
  console.log("\n"+n+" bank items checked: options real, prompt matches the fault");
  // stage two must always offer four DISTINCT whole sentences, one right
  let short=0, dup=0;
  ["y1","y2"].forEach(g2=>{ for(let w=1;w<=36;w++) F.DAYS.forEach(d=>{
    const ch=F.choicesFor(g2,w,d);
    if(ch.options.length!==4) short++;
    if(new Set(ch.options).size!==ch.options.length) dup++;
    if(ch.options.indexOf(ch.answer)<0) fail.push(g2+" w"+w+d+" repair answer not among the options");
  });});
  if(short) fail.push(short+" repair questions offer fewer than four options");
  if(dup)   fail.push(dup+" repair questions repeat an option");
  console.log("360 repair questions: four distinct sentences each, answer always present");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.join("\n  ")):"\nRESULT: a mistake to find every day, in both grades, ticking its own step.");
process.exit(fail.length?1:0);
