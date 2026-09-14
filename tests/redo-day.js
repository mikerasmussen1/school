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

function parent(g){
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=1; c.state.day="Mon";
  c.state.view="parent"; return c;
}
function finish(c,g,w,d){
  const M=window.__CURR.LA_MASTERY;
  const done={...(c.state.stepDone||{})}, res={...(c.state.stepResult||{})};
  M.dayPlan(g,w,d).steps.forEach(s=>{
    done[g+":"+w+":"+d+":"+s.key]=true;
    if(s.gate==="score") res[g+":"+w+":"+d+":"+s.key]={score:1,total:1,at:Date.now()};
  });
  c.setState({stepDone:done, stepResult:res});
}
const count=(bag,pre)=>Object.keys(bag||{}).filter(k=>k.indexOf(pre)===0).length;

console.log("=== the picker reaches every day of the year, both grades ===");
["y1","y2"].forEach(g=>{
  const c=parent(g);
  let v=c.renderVals();
  if((v.redoWeekItems||[]).length!==36) fail.push(g+" offers "+(v.redoWeekItems||[]).length+" weeks, not 36");
  if((v.redoDayItems||[]).length!==5)   fail.push(g+" offers "+(v.redoDayItems||[]).length+" days, not 5");
  // it defaults to the day being viewed
  if(!/week 1/.test(v.dayResetTarget)) fail.push(g+" does not default to the viewed week");
});
console.log("  36 weeks x 5 days offered, defaulting to the day on screen");

console.log("\n=== choosing a far-off day names the right date ===");
{ const c=parent("y1");
  let v=c.renderVals();
  v.redoWeekItems[19].onClick();          // week 20
  v=c.renderVals();
  v.redoDayItems[3].onClick();            // Thursday
  v=c.renderVals();
  console.log("  " + v.dayResetTarget);
  console.log("  " + v.dayResetConfirm);
  if(!/week 20/.test(v.dayResetTarget))  fail.push("the card does not name week 20");
  if(!/Thursday/.test(v.dayResetConfirm)) fail.push("the confirm does not name Thursday");
  // the LESSON day and the CALENDAR date differ once holidays have shifted
  // things; the card must name the lesson day, not silently show a weekday
  // that contradicts the confirmation
  if(!/^Thursday of week 20/.test(v.dayResetTarget))
    fail.push("the card leads with something other than the lesson day: "+v.dayResetTarget);
  if(!/falls on/.test(v.dayResetTarget))
    fail.push("the card does not give the calendar date");
  if(!/Friday 5 February 2027/.test(v.dayResetTarget))
    fail.push("the calendar date is wrong or missing");
}

console.log("\n=== it clears the chosen day, not the one on screen ===");
["y1","y2"].forEach(g=>{
  Object.keys(store).forEach(k=>delete store[k]);
  const c=parent(g);
  finish(c,g,1,"Mon");                     // the day being viewed
  finish(c,g,20,"Thu");                    // the day to be redone
  finish(c,g,20,"Fri");                    // its neighbour
  let v=c.renderVals();
  v.redoWeekItems[19].onClick(); v=c.renderVals();
  v.redoDayItems[3].onClick();   v=c.renderVals();
  v.armDayReset(); c.renderVals().resetOneDay();
  const pre=g+":";
  const chosen=count(c.state.stepDone, pre+"20:Thu:");
  const neighbour=count(c.state.stepDone, pre+"20:Fri:");
  const viewed=count(c.state.stepDone, pre+"1:Mon:");
  console.log("  "+(g==="y1"?"3rd":"5th")+": chosen day "+chosen+" ticks, its neighbour "+neighbour+", the viewed day "+viewed);
  if(chosen)     fail.push(g+" did not clear the chosen day");
  if(!neighbour) fail.push(g+" cleared the neighbouring day too");
  if(!viewed)    fail.push(g+" cleared the day on screen instead of the chosen one");
  if(count(c.state.stepResult, pre+"20:Thu:")) fail.push(g+" left drill scores behind on the chosen day");
});

console.log("\n=== the other grade is untouched ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const c=parent("y1");
  finish(c,"y2",20,"Thu");
  let v=c.renderVals();
  v.redoWeekItems[19].onClick(); v=c.renderVals();
  v.redoDayItems[3].onClick();   v=c.renderVals();
  v.armDayReset(); c.renderVals().resetOneDay();
  const other=count(c.state.stepDone,"y2:20:Thu:");
  console.log("  redoing 3rd grade week 20 Thursday left 5th grade with "+other+" ticks");
  if(!other) fail.push("redoing one grade wiped the other");
}

console.log("\n=== two presses, and the selection resets after ===");
{ const c=parent("y1");
  let v=c.renderVals();
  if(!v.dayResetIdle) fail.push("starts armed");
  v.armDayReset(); v=c.renderVals();
  if(!v.dayResetArmed) fail.push("first press did not arm it");
  v.cancelDayReset(); v=c.renderVals();
  if(v.dayResetArmed) fail.push("cancel did not disarm");
  v.redoWeekItems[9].onClick(); v=c.renderVals();
  v.armDayReset(); c.renderVals().resetOneDay();
  const after=c.renderVals();
  if(!/week 1/.test(after.dayResetTarget)) fail.push("the picker did not return to the viewed day after use");
  console.log("  arms, cancels, and returns to the day on screen once used");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.join("\n  ")):"\nRESULT: any day of the year can be picked and redone, in either grade.");
process.exit(fail.length?1:0);
