/* Both grades read the passage before they re-read it. The first lesson of each
 * week is the only one with "Read the passage out loud"; it must come before
 * "Read it again, looking for one thing", every week of the year. Everything
 * else about the order - and 3rd grade - is unchanged. */
global.window=global; window.__CURR={};
const D=__dirname+'/../curriculum/';
['la-y1-spine','la-y1-reading','la-y2-spine','la-y2-reading','la-mastery'].forEach(f=>require(D+f+'.js'));
const M=window.__CURR.LA_MASTERY;
let fail=[];
const keys=(g,w,d)=>M.dayPlan(g,w,d).steps.map(s=>s.key);

console.log("=== both grades: read aloud, then read again, every first lesson of the week ===");
["y1","y2"].forEach(g=>{ for(let w=1;w<=36;w++){
  const k=keys(g,w,"Mon");
  if(k.join(">")!=="quote>fix>read>close>rq>end") fail.push(g+" week "+w+" first lesson order is "+k.join(" > "));
  const n=M.dayPlan(g,w,"Mon").steps.map(s=>s.n).join(",");
  if(n!=="1,2,3,4,5,6") fail.push(g+" week "+w+" steps are numbered "+n);
}});
console.log("  "+M.dayPlan("y1",1,"Mon").steps.map(s=>s.n+". "+s.label).join("\n  "));

console.log("\n=== the other lessons keep their order ===");
// (5th grade's 4th lesson merges its assignment and writing steps - see
//  tests/assignment-one-step.js - so it is compared there, not here.)
["Tue","Wed","Fri"].forEach(d=>{
  if(keys("y2",1,d).join(">")!==keys("y1",1,d).join(">")) fail.push("5th grade "+d+" order changed: "+keys("y2",1,d).join(" > "));
});
console.log("  the other four lessons match in both grades");

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: both grades read the passage aloud before reading it again.");
process.exit(fail.length?1:0);
