/* 5th grade reads the passage before it re-reads it. The first lesson of each
 * week is the only one with "Read the passage out loud"; it must come before
 * "Read it again, looking for one thing", every week of the year. Everything
 * else about the order - and 3rd grade - is unchanged. */
global.window=global; window.__CURR={};
const D=__dirname+'/../curriculum/';
['la-y1-spine','la-y1-reading','la-y2-spine','la-y2-reading','la-mastery'].forEach(f=>require(D+f+'.js'));
const M=window.__CURR.LA_MASTERY;
let fail=[];
const keys=(g,w,d)=>M.dayPlan(g,w,d).steps.map(s=>s.key);

console.log("=== 5th grade: read aloud, then read again, every first lesson of the week ===");
for(let w=1;w<=36;w++){
  const k=keys("y2",w,"Mon");
  if(k.join(">")!=="quote>fix>read>close>rq>end") fail.push("5th grade week "+w+" first lesson order is "+k.join(" > "));
  const n=M.dayPlan("y2",w,"Mon").steps.map(s=>s.n).join(",");
  if(n!=="1,2,3,4,5,6") fail.push("5th grade week "+w+" steps are numbered "+n);
}
console.log("  "+M.dayPlan("y2",1,"Mon").steps.map(s=>s.n+". "+s.label).join("\n  "));

console.log("\n=== the other lessons, and 3rd grade, keep their order ===");
["Tue","Wed","Thu","Fri"].forEach(d=>{
  if(keys("y2",1,d).join(">")!==keys("y1",1,d).join(">")) fail.push("5th grade "+d+" order changed: "+keys("y2",1,d).join(" > "));
});
if(keys("y1",1,"Mon").join(">")!=="quote>fix>close>read>rq>end") fail.push("3rd grade first lesson order changed: "+keys("y1",1,"Mon").join(" > "));
console.log("  3rd grade first lesson: "+keys("y1",1,"Mon").join(" > "));

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: in 5th grade the passage is read aloud before it is read again.");
process.exit(fail.length?1:0);
