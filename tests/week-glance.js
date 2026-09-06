/* The teacher's weekly glance and its review queue.
 *
 * WHAT MAKES THIS WORTH TESTING
 * Each colour in the grid is a CLAIM about a child's week that a parent will
 * act on. Green that should be yellow hides a struggle; red that should be
 * gray accuses the child of failing a question they never saw. And the queue
 * feeds questions back into the child's mornings, so an approve that
 * duplicates, a resolve that forgets, or a cap that silently drops all have a
 * child-facing cost.
 */
const fs = require("fs");
global.window = global;
window.__CURR = {};
require(__dirname + "/../curriculum/week-glance.js");
const G = window.__CURR.WeekGlance;

let fail = [];
const is = (what, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log("  " + (ok ? "ok  " : "FAIL") + "  " + what +
              (ok ? "" : "   got " + JSON.stringify(got) + ", wanted " + JSON.stringify(want)));
  if (!ok) fail.push(what);
};

const idFor = (set, it) => set.id + "::" + it.q;   // stand-in with the same shape
const D = 20700;                                    // an arbitrary day number

console.log("=== the four colours ===");
is("no attempts is gray", G.itemStatus([]), "gray");
is("right first try is green", G.itemStatus([{ok:true,d:D}]), "green");
is("wrong then right is yellow", G.itemStatus([{ok:false,d:D},{ok:true,d:D}]), "yellow");
is("wrong and never right is red", G.itemStatus([{ok:false,d:D},{ok:false,d:D+1}]), "red");
is("right then wrong later stays green — first try is the signal",
   G.itemStatus([{ok:true,d:D},{ok:false,d:D+1}]), "green");
is("ungraded entries alone stay gray, not wrong",
   G.itemStatus([{ok:null,d:D}]), "gray");
is("ungraded entries do not poison a graded one",
   G.itemStatus([{ok:null,d:D},{ok:true,d:D}]), "green");

console.log("\n=== the grid ===");
const SETS = [
  {id:"s1", label:"1.1", title:"Place Value", items:[{q:"a",t:0},{q:"b",t:1},{q:"c",t:2}]},
  {id:"s2", label:"1.2", title:"Thousandths", items:[{q:"d",t:0},{q:"e",t:1}]}
];
const LOG = {
  s1:[{qid:"s1::a",ok:true,d:D},{qid:"s1::b",ok:false,d:D},{qid:"s1::b",ok:true,d:D},
      {qid:"s1::c",ok:false,d:D},{qid:"s1::c",ok:false,d:D+1}],
  s2:[{qid:"s2::d",ok:false,d:D+1}]
};
const grid = G.weekGrid(SETS, LOG, idFor);
is("one column per set", grid.length, 2);
is("cells numbered from 1 in bank order", grid[0].cells.map(c=>c.n), [1,2,3]);
is("statuses land on the right cells",
   grid[0].cells.map(c=>c.status), ["green","yellow","red"]);
is("an item missing from the log is gray, never red",
   grid[1].cells.map(c=>c.status), ["red","gray"]);
is("a set with no log at all is all gray",
   G.weekGrid([{id:"s9",items:[{q:"z"}]}], {}, idFor)[0].cells[0].status, "gray");

console.log("\n=== the summary speaks in counts ===");
{
  const sum = G.summarise(grid);
  is("struggles name the never-corrected count",
     sum.struggle.length >= 1 && sum.struggle[0].includes("1 never corrected"), true);
  is("nothing attempted contributes nothing",
     G.summarise(G.weekGrid([{id:"s9",label:"9",title:"x",items:[{q:"z"}]}], {}, idFor)),
     {well:[], struggle:[], attempted:0, firstTryRight:0});
  const allGreen = G.weekGrid(
    [{id:"g",label:"1.3",title:"Rounding",items:[{q:"p"},{q:"r"},{q:"s"}]}],
    {g:[{qid:"g::p",ok:true,d:D},{qid:"g::r",ok:true,d:D},{qid:"g::s",ok:true,d:D}]}, idFor);
  is("a clean day is celebrated with its count",
     G.summarise(allGreen).well[0].includes("all 3 right first try"), true);
}

console.log("\n=== suggestions: only red, ranked by recency ===");
{
  const sugs = G.suggest(grid, LOG, [], D+2);
  is("only never-corrected questions suggested",
     sugs.map(s=>s.qid).sort(), ["s1::c","s2::d"].sort());
  // Both were last wrong on D+1; at equal recency the one with more failed
  // tries carries more evidence and leads.
  is("at equal recency, more wrong tries first", sugs[0].qid, "s1::c");
  is("recency beats tries when they differ",
     G.suggest(grid, {s1:[{qid:"s1::c",ok:false,d:D}],
                      s2:[{qid:"s2::d",ok:false,d:D+1}]},
               [], D+2)[0].qid, "s2::d");
  is("evidence states the tries", sugs.find(s=>s.qid==="s1::c").evidence,
     "2 wrong tries, never corrected");
  is("a queued item is not re-suggested",
     G.suggest(grid, LOG, [{qid:"s1::c",done:false}], D+2).map(s=>s.qid), ["s2::d"]);
  is("a recently resolved item stays out",
     G.suggest(grid, LOG, [{qid:"s1::c",done:true,doneAt:D}], D+2).map(s=>s.qid), ["s2::d"]);
  is("an anciently resolved item may return",
     G.suggest(grid, LOG, [{qid:"s1::c",done:true,doneAt:D-40}], D+2).map(s=>s.qid).includes("s1::c"),
     true);
}

console.log("\n=== the queue ===");
{
  let r = G.approve([], {qid:"s1::c",setId:"s1"}, D);
  is("approve adds", r.added, true);
  is("approve is idempotent", G.approve(r.queue, {qid:"s1::c",setId:"s1"}, D).added, false);
  let q = r.queue;
  for(let i=0;i<G.QUEUE_CAP+3;i++) q = G.approve(q, {qid:"x"+i,setId:"s"}, D).queue;
  is("the cap holds", G.due(q).length, G.QUEUE_CAP);
  is("past the cap it says why",
     G.approve(q, {qid:"y",setId:"s"}, D).why, "queue full ("+G.QUEUE_CAP+")");

  let q2 = G.approve([], {qid:"s1::c",setId:"s1"}, D).queue;
  q2 = G.record(q2, "s1::c", false, D+1);
  is("a wrong answer counts the try and keeps it due",
     [G.due(q2).length, q2[0].tries], [1,1]);
  q2 = G.record(q2, "s1::c", true, D+1);
  is("a right answer retires it", G.due(q2).length, 0);
  is("retired is remembered, not deleted", q2.length, 1);
  is("recording an unknown qid changes nothing",
     G.record(q2, "nope", true, D+1), q2);
  is("prune keeps recent done, drops stale done",
     G.prune([{qid:"a",done:true,doneAt:D},{qid:"b",done:true,doneAt:D-40},
              {qid:"c",done:false}], D+1).map(e=>e.qid), ["a","c"]);
}

console.log();
if (fail.length) {
  console.error("  " + fail.length + " FAILED: " + fail.join("; ") + "\n");
  process.exit(1);
}
console.log("  all week-glance checks passed\n");
