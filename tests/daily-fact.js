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

console.log("\n=== the brothers never get the same fact on the same day ===");
{ let clashes=0;
  for(let w=1;w<=36;w++) ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    if(F.factFor("y1",w,d).fact===F.factFor("y2",w,d).fact) clashes++;
  });
  console.log("  clashes across the year: "+clashes);
  if(clashes) fail.push(clashes+" days give both boys the same fact");
}

console.log("\n=== each boy still sees all twelve of each kind ===");
["y1","y2"].forEach(g=>{
  ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const seen={};
    for(let w=1;w<=36;w++) seen[F.factFor(g,w,d).fact]=1;
    if(Object.keys(seen).length!==12) fail.push(g+" "+d+" shows "+Object.keys(seen).length+" distinct facts, not 12");
  });
});
console.log("  12 distinct facts per weekday per grade over 36 weeks");

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

console.log("\n=== the banner binds it ===");
{ const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ showDayComplete }}');
  const seg=src.slice(i, i+1400);
  if(seg.indexOf('{{ factText }}')<0) fail.push("the end-of-day banner does not bind the fact");
  if(seg.indexOf('{{ factTie }}')<0)  fail.push("the banner does not bind the tie back to the lesson");
  if(!/Pok/.test(seg)) fail.push("the fact block is not labelled");
  console.log("  fact and its tie both printed in the end-of-day banner");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,5).join("\n  ")):"\nRESULT: a fact that fits the lesson, earned by finishing it.");
process.exit(fail.length?1:0);
