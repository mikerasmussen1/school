/* 5th grade "Look for this while you read": two clear steps and a worked
 * example from that week's passage, for every lesson of the year. The example
 * is quoted word for word and never uses that lesson's challenge sentences,
 * so it models the skill without giving away the A-or-B answer. */
global.window=global; window.__CURR={};
const fs=require('fs'), D=__dirname+'/../curriculum/';
['la-y1-spine','la-y1-reading','la-y2-spine','la-y2-reading','la-challenge','la-close-reading','la-look-y2']
  .forEach(f=>require(D+f+'.js'));
const L=window.__CURR.LA_LOOK_Y2, Y2=window.__CURR.LA_Y2, CH=window.__CURR.LA_CHALLENGE, CL=window.__CURR.LA_CLOSE;
let fail=[], n=0;
const DAYS=["Mon","Tue","Wed","Thu","Fri"];

console.log("=== every 5th grade lesson has steps and a worked example ===");
for(let w=1;w<=36;w++){
  const text=Y2.passageFor(w).text;
  DAYS.forEach(d=>{
    const b=L.lookFor(w,d), ex=(L.EX[w]||{})[d];
    if(!b || b.length!==3){ fail.push("w"+w+" "+d+" has "+(b?b.length:0)+" bullets, not 3"); return; }
    if(!ex){ fail.push("w"+w+" "+d+" has no example"); return; }
    n++;
    const [quote, note]=ex;
    if(text.indexOf(quote)<0) fail.push("w"+w+" "+d+" example is not in the passage: "+quote.slice(0,50));
    const c=CH.challengeFor("y2",w,d);
    if(c && (c.a.indexOf(quote)>=0 || c.b.indexOf(quote)>=0))
      fail.push("w"+w+" "+d+" example uses that lesson's challenge sentence: "+quote.slice(0,50));
    if(!b[2].startsWith("Example from this passage: “"+quote+"”")) fail.push("w"+w+" "+d+" third bullet does not open with the quoted example");
    if(note.length<60) fail.push("w"+w+" "+d+" example explanation is too thin");
    if(d==="Mon" && !(/STATED/.test(note) && /INFERRED/.test(note))) fail.push("w"+w+" Mon example does not model stated vs inferred");
    if(d==="Fri" && !(/theme/i.test(note) && /complicates/i.test(note))) fail.push("w"+w+" Fri example does not model theme and what complicates it");
  });
}
console.log("  "+n+" of 180 lessons: 2 steps + 1 example, each quote verbatim and clear of the challenge");

console.log("\n=== the page prints them for 5th grade, and 3rd grade is unchanged ===");
{ const h=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  if(!/curriculum\/la-look-y2\.js/.test(h)) fail.push("word-voyagers.dc.html does not load la-look-y2.js");
  const store={};
  global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
  global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
  global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
  global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
  global.fetch=async()=>({ok:false,json:async()=>({})}); global.location={search:""};
  window.Subjects={register(){},all:()=>[],get(){return null;}};
  [...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
  class DCLogic{ setState(p){ this.state={...this.state,...p}; } } global.DCLogic=DCLogic;
  const C=eval("(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()");
  const view=(g,w,d)=>{ const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d; return c.renderVals(); };
  const v5=view("y2",12,"Tue");
  const got=(v5.lessonLook||[]).map(x=>x.text);
  if(JSON.stringify(got)!==JSON.stringify(L.lookFor(12,"Tue"))) fail.push("5th grade week 12 Tuesday does not show the new bullets");
  got.forEach(t=>console.log("  • "+t.slice(0,110)+(t.length>110?"...":"")));
  const v3=view("y1",12,"Tue");
  if(JSON.stringify((v3.lessonLook||[]).map(x=>x.text))!==JSON.stringify(CL.lessonFor("y1","Tue").look))
    fail.push("3rd grade look-for bullets changed");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,10).join("\n  ")):"\nRESULT: every 5th grade lesson teaches the skill with steps and a passage example.");
process.exit(fail.length?1:0);
