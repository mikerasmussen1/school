/* The weekGlance contract, as Word Voyagers and Field Notes implement it.
 *
 * Each cell is a claim a parent will act on, and the contract is explicit
 * about the one that matters most: absence is NEVER red. Word Voyagers has a
 * standing decision not to judge a child against a schedule, and Field Notes
 * is correctly untouched six days out of seven — a glance that painted either
 * of those red would re-litigate both decisions through a colour.
 */
const fs = require("fs");
global.window = global;
window.__CURR = {};
window.Subjects = (function(){
  const reg = {};
  return { register(d){ reg[d.id] = d; return d; },
           get(id){ return reg[id] || null; },
           all(){ return Object.keys(reg).map(k => reg[k]); },
           has(id){ return !!reg[id]; } };
})();
global.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
global.document = { addEventListener(){}, removeEventListener(){}, createElement:()=>({style:{}}) };
global.addEventListener = global.removeEventListener = function(){};
global.setInterval = ()=>0; global.clearInterval = ()=>{};
global.setTimeout = ()=>0; global.clearTimeout = ()=>{};
global.matchMedia = ()=>({matches:false, addEventListener(){}, removeEventListener(){}});
global.fetch = async()=>({ok:false, json:async()=>({})});
global.location = { search:"", href:"" };

const page = fs.readFileSync(__dirname + "/../index.html", "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m => m[1])
  .forEach(m => { try { require(__dirname + "/../curriculum/" + m + ".js"); } catch(e){} });

const LA = window.Subjects.get("la"), SCI = window.Subjects.get("sci");
let fail = [];
const is = (what, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  console.log("  " + (ok ? "ok  " : "FAIL") + "  " + what +
              (ok ? "" : "   got " + JSON.stringify(got) + ", wanted " + JSON.stringify(want)));
  if (!ok) fail.push(what);
};
const statuses = g => g.columns[0].cells.map(c => c.status);
const LEGAL = ["green","yellow","red","gray"];

console.log("=== the contract is wired ===");
is("la registers a weekGlance", typeof LA.weekGlance, "function");
is("sci registers a weekGlance", typeof SCI.weekGlance, "function");
is("math does not (the shell draws its own)",
   (window.Subjects.get("math")||{}).weekGlance == null, true);

console.log("\n=== Word Voyagers ===");
const end = (w,d) => "y1:"+w+":"+d+":end";
is("no finished day means null, not an empty grid",
   LA.weekGlance({year:"y1"}), null);
{
  const g = LA.weekGlance({year:"y1", stepDone:{[end(3,"Mon")]:true, [end(3,"Wed")]:true}});
  is("the most recent week with work is the week", g.title, "Week 3");
  is("finished green; passed-by red; not-yet-reached gray — Friday unfinished on Wednesday is NOT a gap",
     statuses(g), ["green","red","green","gray","gray"]);
}
{
  const g = LA.weekGlance({year:"y1",
    stepDone:{[end(2,"Mon")]:true, [end(2,"Wed")]:true},
    excused:{"y1:2:Tue:excused":true}});
  is("an excused day is gray with its note, never red",
     statuses(g), ["green","gray","green","gray","gray"]);
  is("and the note says so", g.columns[0].cells[1].hint.includes("excused"), true);
}
{
  const g = LA.weekGlance({year:"y1",
    stepDone:{[end(2,"Mon")]:true},
    stuck:{"y1:2:Mon:read":true}});
  is("finished-but-stuck is yellow", statuses(g)[0], "yellow");
  is("and lands in the struggle list",
     g.struggle.some(t => t.includes("stuck")), true);
}
{
  const g = LA.weekGlance({year:"y1",
    stepDone:{[end(2,"Mon")]:true, "y2:9:Tue:end":true}});
  is("the other grade's track is invisible here", g.title, "Week 2");
}
{
  const g = LA.weekGlance({year:"y1",
    stepDone:{[end(2,"Mon")]:true},
    stepResult:{"y1:2:drill":{score:5, total:6, at:1}, "y1:2:quiz":{score:1, total:6, at:2}}});
  is("a strong check goes to went-well",
     g.well.some(t => t.includes("5/6")), true);
  is("a weak check goes to struggle",
     g.struggle.some(t => t.includes("1/6")), true);
}

console.log("\n=== Field Notes ===");
const wk = (g,w,v) => ({[g+":"+w]: v});
is("nothing finished means null", SCI.weekGlance({grade:"y3"}), null);
{
  const g = SCI.weekGlance({grade:"y3", completed:{
    "y3:1":{score:5,total:6,at:1}, "y3:2":{}, "y3:4":{score:2,total:6,at:2}}});
  is("cells run from the window start to the latest week",
     statuses(g), ["green","green","red","red"]);
  is("a finished week with no check is green, not a zero",
     g.columns[0].cells[1].hint.includes("no check"), true);
  is("a skipped week is red and named",
     g.struggle.some(t => t.includes("Week 3 skipped")), true);
  is("a weak check is red and listed",
     g.struggle.some(t => t.includes("2/6")), true);
}
{
  const done = {};
  for(let w=1; w<=20; w++) done["y3:"+w] = {score:6,total:6,at:w};
  const g = SCI.weekGlance({grade:"y3", completed:done});
  is("the window is the last eight weeks, not the whole year",
     g.columns[0].cells.length, 8);
  is("a clean stretch says so",
     g.well.some(t => t.includes("none skipped")), true);
}
{
  const g = SCI.weekGlance({grade:"y3", completed:{"y3:5":{score:4,total:6,at:1}}});
  is("65-79% is yellow — shaky, not failed", statuses(g)[0], "yellow");
}

console.log("\n=== every status is one of the four words ===");
[LA.weekGlance({year:"y1", stepDone:{[end(2,"Mon")]:true, [end(2,"Fri")]:true},
                excused:{"y1:2:Tue:excused":true}, stuck:{"y1:2:Mon:x":true}}),
 SCI.weekGlance({grade:"y3", completed:{"y3:1":{score:1,total:6,at:1}, "y3:3":{}}})]
 .forEach((g,i) => is("glance "+i+" uses only legal statuses",
    g.columns.every(col => col.cells.every(c => LEGAL.includes(c.status))), true));

console.log();
if (fail.length) {
  console.error("  " + fail.length + " FAILED: " + fail.join("; ") + "\n");
  process.exit(1);
}
console.log("  all subject week-glance checks passed\n");
