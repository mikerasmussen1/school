/* The fact is earned, matches the day's lesson, and differs between brothers. */
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
const F=window.__CURR.LA_FACTS, CL=window.__CURR.LA_CLOSE, M=window.__CURR.LA_MASTERY;
let fail=[];

console.log("=== a fact for every day of the year, both grades ===");
["y1","y2"].forEach(g=>{
  for(let w=1;w<=36;w++) F.ORDER===undefined && ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const f=F.factFor(g,w,d);
    if(!f.fact || f.fact.length<40) fail.push(g+" w"+w+" "+d+" has no fact");
    if(!f.tie || f.tie.length<20)   fail.push(g+" w"+w+" "+d+" has no tie back to the lesson");
    if(!f.topic || f.topic.length<3) fail.push(g+" w"+w+" "+d+" has no topic label");
  });
});
console.log("  360 grade-days covered by "+F.count()+" facts on a "+F.CYCLE+"-week cycle");

console.log("\n=== the fact matches the day's lesson purpose ===");
const EXPECT={Mon:"says",Tue:"words",Wed:"shows",Thu:"why",Fri:"theme"};
["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
  const p=F.factFor("y1",1,d).purpose;
  if(p!==EXPECT[d]) fail.push(d+" uses the "+p+" bank, expected "+EXPECT[d]);
});
console.log("  Mon says | Tue words | Wed shows | Thu why | Fri theme");
{ // and the purposes line up with the lesson module, not just with themselves
  ["y1","y2"].forEach(g=>CL.ORDER.forEach(d=>{
    if(!CL.lessonFor(g,d).lesson) fail.push(g+" "+d+" has no lesson to match");
  }));
  if(Object.keys(F.DAY_PURPOSE).join()!==CL.ORDER.join())
    fail.push("the fact days and the lesson days do not match");
  console.log("  the five fact purposes map onto the five lesson days");
}

console.log("\n=== the facts cover more than etymology ===");
{ const topics={};
  Object.keys(F.FACTS).forEach(k=>F.FACTS[k].forEach(r=>{ topics[r[0]]=(topics[r[0]]||0)+1; }));
  const names=Object.keys(topics).sort();
  console.log("  "+names.length+" topics: "+names.join(", "));
  if(names.length<15) fail.push("only "+names.length+" topics; the point was variety");
  const etym=topics["Etymology"]||0;
  if(etym > F.count()*0.35) fail.push("etymology is "+etym+" of "+F.count()+" facts, still dominating");
  ["Mascot","Colours","Pok\u00e9 Balls","Legendaries","Villains","Backstory","Phrases","Evolution","Rivals","Starters"]
    .forEach(t=>{ if(!topics[t]) fail.push("no facts tagged "+t); });
  // no single lesson day may be all one topic
  Object.keys(F.FACTS).forEach(k=>{
    const t={}; F.FACTS[k].forEach(r=>t[r[0]]=1);
    if(Object.keys(t).length<4) fail.push(k+" draws on only "+Object.keys(t).length+" topics");
  });
  console.log("  every lesson day draws on at least four different topics");
}

console.log("\n=== the brothers never get the same fact on the same day ===");
{ let clashes=0;
  for(let w=1;w<=36;w++) ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    if(F.factFor("y1",w,d).fact===F.factFor("y2",w,d).fact) clashes++;
  });
  console.log("  clashes across the year: "+clashes);
  if(clashes) fail.push(clashes+" days give both boys the same fact");
}

console.log("\n=== each boy still sees all eighteen of each kind ===");
["y1","y2"].forEach(g=>{
  ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const seen={};
    for(let w=1;w<=36;w++) seen[F.factFor(g,w,d).fact]=1;
    if(Object.keys(seen).length!==18) fail.push(g+" "+d+" shows "+Object.keys(seen).length+" distinct facts, not 18");
  });
});
console.log("  18 distinct facts per weekday per grade over 36 weeks");

console.log("\n=== it is a reward: nothing until the day is finished ===");
["y1","y2"].forEach(g=>{
  Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=1; c.state.day="Mon";
  c.startDay();
  let v=c.renderVals();
  const before = v.factText ? "shown" : "hidden";   // captured, not re-read later
  if(v.factText) fail.push(g+" shows the fact before the day is done");
  if(v.showDayComplete) fail.push(g+" reports the day complete at the start");
  // finish every step. Scored steps need a recorded RESULT as well as a tick
  // — that is the rule that stops a drill reading "Done" with nothing behind
  // it, and a test that sets only the tick does not actually finish the day.
  const done={}, res={};
  M.dayPlan(g,1,"Mon").steps.forEach(s=>{
    done[g+":1:Mon:"+s.key]=true;
    if(s.gate==="score") res[g+":1:Mon:"+s.key]={score:1,total:1,at:Date.now()};
  });
  c.setState({stepDone:done, stepResult:res});
  v=c.renderVals();
  console.log("  "+(g==="y1"?"3rd":"5th")+": before = "+before+" ... after finishing = "+(v.factText?"shown":"HIDDEN"));
  if(!v.showDayComplete) fail.push(g+" day did not complete");
  if(!v.factText) fail.push(g+" no fact after finishing the day");
  if(!v.factTie)  fail.push(g+" no tie back to the lesson after finishing");
});

console.log("\n=== a joke too, with the punchline held back ===");
{ let clashes=0, seen={};
  for(let w=1;w<=36;w++) ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const a=F.jokeFor("y1",w,d), b=F.jokeFor("y2",w,d);
    if(!a.setup || !a.punchline) fail.push("y1 w"+w+" "+d+" joke is incomplete");
    if(a.setup===b.setup) clashes++;
    seen[a.setup]=1;
  });
  console.log("  "+F.jokeCount()+" jokes, "+Object.keys(seen).length+" distinct over the year, clashes between brothers: "+clashes);
  if(clashes) fail.push(clashes+" days tell both boys the same joke");
  if(F.jokeCount()<40) fail.push("only "+F.jokeCount()+" jokes; the cycle repeats too soon");
  // every joke must actually have two parts
  F.JOKES.forEach((j,i)=>{
    if(j[0].length<12 || j[1].length<4) fail.push("joke "+i+" is missing a half");
    if(j[0]===j[1]) fail.push("joke "+i+" has the same setup and punchline");
  });
}

{ Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Mon";
  c.startDay();
  const done={}, res={};
  M.dayPlan("y1",1,"Mon").steps.forEach(s2=>{
    done["y1:1:Mon:"+s2.key]=true;
    if(s2.gate==="score") res["y1:1:Mon:"+s2.key]={score:1,total:1,at:Date.now()};
  });
  c.setState({stepDone:done, stepResult:res});
  let v=c.renderVals();
  console.log("  setup shown    : "+JSON.stringify(v.jokeSetup));
  if(!v.jokeSetup) fail.push("no joke after finishing the day");
  if(!v.jokeHidden) fail.push("the punchline is showing before it is asked for");
  if(v.jokeShown)   fail.push("the joke opens already revealed");
  v.jokeReveal();
  v=c.renderVals();
  console.log("  punchline after: "+JSON.stringify(v.jokePunchline));
  if(!v.jokeShown) fail.push("Tell me did not reveal the punchline");
  // and it closes again on the next day
  c.setDay("Tue");
  if(c.state.jokeOpen) fail.push("the punchline stays revealed into the next day");
  console.log("  closes again on the next day: yes");
}

console.log("\n=== the banner binds it ===");
{ const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ showDayComplete }}');
  // the banner holds the fact AND the joke, so the slice has to reach both
  const seg=src.slice(i, src.indexOf('{{ showNeedsLook }}', i));
  if(seg.indexOf('{{ factText }}')<0) fail.push("the end-of-day banner does not bind the fact");
  if(seg.indexOf('{{ factTie }}')<0)  fail.push("the banner does not bind the tie back to the lesson");
  if(seg.indexOf('{{ factTopic }}')<0) fail.push("the banner does not show the topic label");
  if(!/Pok/.test(seg)) fail.push("the fact block is not labelled");
  if(seg.indexOf('{{ jokeSetup }}')<0)     fail.push("the banner does not bind the joke");
  if(seg.indexOf('{{ jokePunchline }}')<0) fail.push("the banner does not bind the punchline");
  if(seg.indexOf('{{ jokeReveal }}')<0)    fail.push("there is no way to ask for the punchline");
  console.log("  fact and its tie both printed in the end-of-day banner");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,5).join("\n  ")):"\nRESULT: a fact that fits the lesson, earned by finishing it.");
process.exit(fail.length?1:0);
