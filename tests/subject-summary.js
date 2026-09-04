/* Every subject describes its own progress to Teacher HQ, and describes it
 * honestly.
 *
 * The thing this guards is not the wording — it is that the numbers mean what
 * the label says. Two ways that has already gone wrong in this codebase:
 *
 *   - Word Voyagers stores every PART of a day in stepDone (grammar, spelling,
 *     reading, the task) alongside the ":end" key that means the day is
 *     actually finished. Counting all of them reported roughly five times the
 *     work done. Only ":end" counts a day.
 *   - Field Notes runs once a week and its checks are partial by design, so a
 *     finished week with no quiz must count as done and must not drag an
 *     accuracy figure toward zero.
 *
 * It also pins the contract itself: a summary returns null when there is
 * nothing finished, never throws on an empty or junk record, and only claims a
 * flag when its own data proves it. */
const fs = require('fs'), D = __dirname + '/../curriculum/';
global.window = global;
global.localStorage = {getItem:()=>null, setItem:()=>{}, removeItem:()=>{}};
global.document = {addEventListener(){}, createElement:()=>({style:{}})};
global.addEventListener = global.removeEventListener = function(){};
global.setInterval = function(){ return 0; }; global.clearInterval = function(){};
global.matchMedia = function(){ return {matches:false, addEventListener(){}, removeEventListener(){}}; };
global.fetch = async()=>({ok:false, json:async()=>({})});
global.location = {search:""};

// Load exactly what index.html loads, in its order, so the registry ends up
// holding the real subjects rather than test doubles.
const idx = fs.readFileSync(__dirname + '/../index.html', 'utf8');
[...idx.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)]
  .map(m => m[1])
  .forEach(m => { try { require(D + m + '.js'); } catch(e) {} });

const S = window.Subjects;
let fail = [];
const eq = (what, got, want) => {
  const ok = String(got) === String(want);
  console.log("  " + (ok ? "ok  " : "FAIL") + "  " + what + ": " + got + (ok ? "" : "  (wanted " + want + ")"));
  if(!ok) fail.push(what + " = " + got + ", wanted " + want);
};
const has = (what, cond) => {
  console.log("  " + (cond ? "ok  " : "FAIL") + "  " + what);
  if(!cond) fail.push(what);
};

console.log("=== the contract ===");
const live = S.all().filter(s => s.status !== "soon");
has("at least three live subjects registered", live.length >= 3);

/* summary is OPTIONAL, and that is not a loophole — the Japan unit records no
 * progress at all, so it has nothing to report and correctly omits one. What
 * must hold is the other direction: a subject that syncs a working record owes
 * Teacher HQ a summary of it, or that work is invisible to a parent. */
const RECORDS_PROGRESS = ["math", "la", "sci"];
RECORDS_PROGRESS.forEach(id =>
  has(id + " records progress, so it implements summary()", typeof S.get(id).summary === "function"));
S.all().filter(s => RECORDS_PROGRESS.indexOf(s.id) < 0).forEach(s =>
  has(s.id + " records nothing, so no summary is required (has one: " +
      (typeof s.summary === "function") + ")", true));
const withSummary = live.filter(s => typeof s.summary === "function");

console.log("\n=== nothing finished yet returns null, not an empty row ===");
withSummary.forEach(s => {
  const out = s.summary({}, {opened:0, days:[], level:null, recent:0, lastDay:null, today:0, slice:{}});
  has(s.id + " on an empty record returns null", out === null);
});

console.log("\n=== junk in a record must not throw ===");
const junk = [null, undefined, {stepDone:null}, {stepDone:{"":1, "a:b":1, "y1:x:Mon:end":1}},
              {completed:{"nope":null, "y3:zz":{}}}, {stepDone:{"y1:3:Sat:end":true}}];
let threw = 0;
withSummary.forEach(s => {
  junk.forEach((j, i) => {
    try { s.summary(j || {}, {opened:1, slice:{}}); }
    catch(e) { threw++; fail.push(s.id + " threw on junk record #" + i + ": " + e.message); }
  });
});
has(withSummary.length * junk.length + " junk records across every summary", threw === 0);

console.log("\n=== Word Voyagers counts DAYS, not steps ===");
const la = S.get("la");
{
  // One finished day (Mon week 1) written the way the app writes it: four
  // part-keys and one ":end". A day is one day.
  const data = {year:"y1", week:1, stepDone:{
    "y1:1:Mon:gz":true, "y1:1:Mon:sp":true, "y1:1:Mon:rd":true, "y1:1:Mon:tk":true,
    "y1:1:Mon:end":true
  }};
  const out = la.summary(data, {opened:3, slice:{}});
  const days = out.rows.filter(r => r.label === "Days finished")[0];
  eq("five keys, one finished day", days.value, "1 of 180");
}
{
  // The other grade's work must not be counted into this one.
  const data = {year:"y1", week:2, stepDone:{
    "y1:1:Mon:end":true, "y1:1:Tue:end":true,
    "y2:1:Mon:end":true, "y2:1:Tue:end":true, "y2:1:Wed:end":true
  }};
  const out = la.summary(data, {opened:3, slice:{}});
  eq("y2's days stay out of y1's count",
     out.rows.filter(r => r.label === "Days finished")[0].value, "2 of 180");
}

console.log("\n=== a gap is a day skipped over, not a day not yet reached ===");
{
  // Mon, Tue, then Thu. Wed was gone past. Fri onward is simply the future.
  const data = {year:"y1", week:1, stepDone:{
    "y1:1:Mon:end":true, "y1:1:Tue:end":true, "y1:1:Thu:end":true
  }};
  const out = la.summary(data, {opened:3, slice:{}});
  const g = out.rows.filter(r => r.label === "Skipped days")[0];
  eq("one skipped day reported", g && g.value, "1");
  has("and it is flagged for the parent", out.flags.some(f => /skipped over/.test(f.text)));
}
{
  const data = {year:"y1", week:1,
    stepDone:{"y1:1:Mon:end":true, "y1:1:Tue:end":true, "y1:1:Thu:end":true},
    excused:{"y1:1:Wed:excused":true}};
  const out = la.summary(data, {opened:3, slice:{}});
  has("an excused day is not a gap", !out.rows.some(r => r.label === "Skipped days"));
  has("and raises no flag", !out.flags.some(f => /skipped over/.test(f.text)));
}
{
  const data = {year:"y1", week:1, stepDone:{"y1:1:Mon:end":true, "y1:1:Tue:end":true}};
  const out = la.summary(data, {opened:3, slice:{}});
  has("consecutive days report no gap", !out.rows.some(r => r.label === "Skipped days"));
}

console.log("\n=== stuck steps reach the parent ===");
{
  const data = {year:"y1", week:1, stepDone:{"y1:1:Mon:end":true},
                stuck:{"y1:1:Mon:gz":true, "y2:1:Mon:gz":true}};
  const out = la.summary(data, {opened:3, slice:{}});
  eq("only this year's stuck steps count",
     out.rows.filter(r => r.label === "Flagged stuck")[0].value, "1");
  has("flag says he was let through", out.flags.some(f => /let through/.test(f.text)));
}

console.log("\n=== check accuracy, and what it flags ===");
{
  const mk = (n, score, total) => {
    const o = {};
    for(let i = 0; i < n; i++) o["y1:1:Mon:q" + i] = {score, total, at:1000 + i};
    return o;
  };
  let out = la.summary({year:"y1", stepDone:{"y1:1:Mon:end":true}, stepResult:mk(4, 9, 10)},
                       {opened:3, slice:{}});
  eq("36/40 reads as 90%", out.rows.filter(r => /^Last /.test(r.label))[0].value, "90%");
  has("a strong average raises no flag", !out.flags.some(f => /average/.test(f.text)));

  out = la.summary({year:"y1", stepDone:{"y1:1:Mon:end":true}, stepResult:mk(4, 4, 10)},
                   {opened:3, slice:{}});
  eq("16/40 reads as 40%", out.rows.filter(r => /^Last /.test(r.label))[0].value, "40%");
  const f = out.flags.filter(x => /average/.test(x.text))[0];
  has("a weak average is flagged urgent", f && f.tone === "urgent");

  // An ungraded step carries no score and must not be read as zero.
  out = la.summary({year:"y1", stepDone:{"y1:1:Mon:end":true},
                    stepResult:{"y1:1:Mon:a":{score:10, total:10, at:1},
                                "y1:1:Mon:b":{score:null, total:null, at:2}}},
                   {opened:3, slice:{}});
  eq("an ungraded step is left out, not counted zero",
     out.rows.filter(r => /^Last /.test(r.label))[0].value, "100%");
}

console.log("\n=== Field Notes speaks in weeks, never days ===");
const sci = S.get("sci");
{
  const data = {grade:"y3", week:5, completed:{
    "y3:1":{at:1, score:4, total:5}, "y3:2":{at:2, score:5, total:5},
    "y3:3":{at:3, score:null, total:null}, "y5:1":{at:4, score:0, total:5}
  }};
  const out = sci.summary(data, {opened:4, slice:{}});
  eq("three weeks in this grade", out.rows.filter(r => r.label === "Weeks finished")[0].value, "3 of 36");
  has("no row talks about days", !out.rows.some(r => /day/i.test(r.label)));
  has("no flag talks about a daily streak", !out.flags.some(f => /streak|every day|daily/i.test(f.text)));
  eq("the unchecked week is named, not scored",
     out.rows.filter(r => r.label === "Weeks without a check")[0].value, "1");
  eq("accuracy is 9/10, ignoring the unchecked week and the other grade",
     out.rows.filter(r => /^Last /.test(r.label))[0].value, "90%");
}
{
  const data = {grade:"y3", week:9, completed:{
    "y3:1":{at:1, score:5, total:5}, "y3:5":{at:2, score:5, total:5}
  }};
  const out = sci.summary(data, {opened:4, slice:{}});
  eq("weeks 2-4 skipped", out.rows.filter(r => r.label === "Skipped weeks")[0].value, "3");
  const f = out.flags.filter(x => /skipped over/.test(x.text))[0];
  has("three skipped weeks is urgent on a weekly course", f && f.tone === "urgent");
  has("and it says what a skipped week costs", f && /lab/.test(f.text));
}

console.log("\n=== maths stays deliberately thin ===");
const math = S.get("math");
{
  has("unopened maths returns null", math.summary({}, {opened:0, slice:{}}) === null);
  const out = math.summary({}, {opened:9, slice:{}});
  has("opened maths points at its own drill-down", out && /working record/.test(out.detail));
  has("and adds no competing numbers", out && !out.rows);
}

console.log("\n=== tones stay inside the vocabulary Mission Control renders ===");
{
  const OK = ["", "good", "watch", "urgent"];
  const seen = new Set();
  const probes = [
    [la, {year:"y1", week:3, stepDone:{"y1:1:Mon:end":true, "y1:1:Thu:end":true},
          stuck:{"y1:1:Mon:gz":true},
          stepResult:{"y1:1:Mon:a":{score:1, total:10, at:1}}}],
    [sci, {grade:"y3", week:9, completed:{"y3:1":{at:1, score:1, total:5}, "y3:5":{at:2, score:1, total:5}}}]
  ];
  probes.forEach(([subj, data]) => {
    const out = subj.summary(data, {opened:5, slice:{}});
    (out.rows || []).forEach(r => seen.add(r.tone));
    (out.flags || []).forEach(f => seen.add(f.tone));
  });
  const bad = [...seen].filter(t => OK.indexOf(t) < 0);
  has("every tone emitted is one of \"\"/good/watch/urgent, saw [" + [...seen].join(", ") + "]",
      bad.length === 0);
}

console.log("");
if(fail.length){
  console.log("FAILED " + fail.length + ":");
  fail.forEach(f => console.log("  - " + f));
  process.exit(1);
}
console.log("all checks passed");
