/* No child is stopped for having done enough today. */
global.window=global; global.__CURR={}; window.__CURR={};
const D=__dirname+'/../curriculum/';
['la-y1-spine','la-y1-words','la-y1-grammar','la-y1-reading','la-y1-tasks',
 'la-y2-spine','la-y2-words','la-y2-grammar','la-y2-reading','la-y2-tasks',
 'la-daily-fix','la-skill-notes','la-mastery'].forEach(f=>{try{require(D+f+'.js')}catch(e){}});
const M=window.__CURR.LA_MASTERY;
let fail=[];
const now=Date.now();

console.log("=== the sitting cap is off ===");
console.log("  DAYS_PER_SITTING = "+M.DAYS_PER_SITTING);
if(M.DAYS_PER_SITTING!==0) fail.push("a sitting cap is still set: "+M.DAYS_PER_SITTING);

console.log("\n=== closing many days in one sitting never blocks the next ===");
["y1","y2"].forEach(g=>{
  const stepDone={}, closedAt={};
  const days=["Mon","Tue","Wed","Thu"];
  days.forEach(d=>{ stepDone[M.endKey(g,1,d)]=true; closedAt[g+":1:"+d]=now; });
  const st=M.dayStatus(g,1,"Fri",stepDone,{},closedAt,now);
  console.log("  "+(g==="y1"?"3rd":"5th")+": four days closed today -> Friday is \""+st.state+"\", blocked="+st.blocked);
  if(st.blocked) fail.push(g+" is still paced after four days in a sitting");
  if(st.state==="paced") fail.push(g+" still reports the paced state");
});

console.log("\n=== a whole week in one sitting is allowed ===");
["y1","y2"].forEach(g=>{
  const stepDone={}, closedAt={};
  let blockedAt=null;
  for(let i=0;i<10;i++){
    const p=M.fromAbs(i);
    const st=M.dayStatus(g,p.week,p.day,stepDone,{},closedAt,now);
    if(st.blocked && blockedAt===null) blockedAt=i+1;
    stepDone[M.endKey(g,p.week,p.day)]=true;
    closedAt[g+":"+p.week+":"+p.day]=now;
  }
  console.log("  "+(g==="y1"?"3rd":"5th")+": ten consecutive days in one sitting -> "+
              (blockedAt===null?"never blocked":"blocked at day "+blockedAt));
  if(blockedAt!==null) fail.push(g+" blocked at day "+blockedAt+" of a single sitting");
});

console.log("\n=== an unfinished day behind you still warns, as before ===");
{ const st=M.dayStatus("y1",1,"Wed",{},{},{},now);
  console.log("  Wednesday with Monday unfinished: \""+st.state+"\", blocked="+st.blocked);
  if(st.state!=="ahead") fail.push("the gap warning was removed along with the cap");
}

console.log("\n=== the brake can still be put back ===");
{ M.setPace(2);
  const stepDone={}, closedAt={};
  ["Mon","Tue"].forEach(d=>{ stepDone[M.endKey("y1",1,d)]=true; closedAt["y1:1:"+d]=now; });
  const st=M.dayStatus("y1",1,"Wed",stepDone,{},closedAt,now);
  console.log("  setPace(2) -> Wednesday is \""+st.state+"\"");
  if(st.state!=="paced") fail.push("setPace no longer restores the cap");
  M.setPace(0);
  if(M.DAYS_PER_SITTING!==0) fail.push("could not turn the cap back off");
  console.log("  setPace(0) -> back off");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.join("\n  ")):"\nRESULT: nothing stops a child who wants to keep going.");
process.exit(fail.length?1:0);
