/* Maths — the day. What "today" resolves to, and what is in it.
 *
 * Run: node tests/math-day.js
 */
global.window = global.window || {};
require("../curriculum/math-sequence.js");
require("../curriculum/math-day.js");

const SEQ = window.__CURR.MATH_SEQ;
const D   = window.__CURR.MATH_DAY;

let fails = 0, checks = 0;
function ok(cond, what){
  checks++;
  if(!cond){ console.log("  FAIL  " + what); fails++; }
}
function eq(a, b, what){ ok(a === b, what + "  (got " + JSON.stringify(a) + ", want " + JSON.stringify(b) + ")"); }

/* A small course: mission 1 weeks 1-2, five days each. Ids in the shapes
 * math-sequence actually parses. */
const SETS = [];
for(let d = 1; d <= 5; d++) SETS.push({id:"p"+d,        label:"1."+d, w:1});
for(let d = 1; d <= 5; d++) SETS.push({id:"u1w2p"+d,    label:"2."+d, w:2});
for(let d = 1; d <= 5; d++) SETS.push({id:"u2w1p"+d,    label:"1."+d, w:1});
const ORDER = SEQ.orderedIds(SETS).map(x => x.id);

const graded = (...ids) => { const o = {}; ids.forEach(i => o[i + "|all"] = true); return o; };

// ── today, with no pin ────────────────────────────────────────────────────
console.log("today from the frontier");
{
  eq(D.resolveDay(SETS, {}, null).set.id, ORDER[0], "a fresh record opens on the first day");
  eq(D.resolveDay(SETS, {}, null).source, "frontier", "and says so");

  const done2 = graded(ORDER[0], ORDER[1]);
  eq(D.resolveDay(SETS, done2, null).set.id, ORDER[2], "two days done opens on the third");

  // The messy case this whole module exists for.
  const scattered = graded(ORDER[0], ORDER[7], ORDER[8], ORDER[11]);
  eq(D.resolveDay(SETS, scattered, null).set.id, ORDER[1],
     "a scattered record drags the frontier back to the earliest hole");
}

// ── today, pinned ─────────────────────────────────────────────────────────
console.log("today from an anchor");
{
  const scattered = graded(ORDER[0], ORDER[7], ORDER[8], ORDER[11]);
  const r = D.resolveDay(SETS, scattered, ORDER[9]);
  eq(r.set.id, ORDER[9], "a pin overrides the frontier");
  eq(r.source, "anchor", "and is reported as a pin, not a computed day");

  // Self-advancing: the pin is a starting point, not a fixed day.
  const andNine = graded(ORDER[0], ORDER[7], ORDER[8], ORDER[11], ORDER[9]);
  eq(D.resolveDay(SETS, andNine, ORDER[9]).set.id, ORDER[10],
     "finishing the pinned day moves today forward without re-pinning");

  // Holes behind the pin are deliberately ignored — they are the test runs.
  ok(D.resolveDay(SETS, andNine, ORDER[9]).set.id !== ORDER[1],
     "a hole behind the pin does not drag today backwards");

  // A pin on a day already done skips forward to the first unfinished one.
  eq(D.resolveDay(SETS, graded(ORDER[5], ORDER[6]), ORDER[5]).set.id, ORDER[7],
     "pinning an already-finished day opens the next unfinished one");
}

// ── a pin that cannot be honoured ─────────────────────────────────────────
console.log("bad and spent pins");
{
  const r = D.resolveDay(SETS, {}, "not-a-real-set-id");
  eq(r.set.id, ORDER[0], "a dangling pin falls back to the frontier rather than opening nothing");
  eq(r.source, "frontier", "and does not claim to be a pin");

  const allDone = graded.apply(null, ORDER);
  const done = D.resolveDay(SETS, allDone, null);
  eq(done.set, null, "a finished course has no day");
  eq(done.complete, true, "and says it is complete");

  // Everything from the pin onward finished, but holes behind it.
  const tailDone = graded(ORDER[12], ORDER[13], ORDER[14]);
  const t = D.resolveDay(SETS, tailDone, ORDER[12]);
  eq(t.complete, true, "a spent pin reports complete rather than rewinding behind itself");
  eq(t.set, null, "and offers no day");
}

// ── what the teacher is told about a pin ──────────────────────────────────
console.log("pin diagnostics");
{
  const scattered = graded(ORDER[0], ORDER[7], ORDER[8]);
  eq(D.skippedBehind(SETS, scattered, ORDER[9]), 6,
     "the teacher is told how many genuine holes the pin skips over");
  eq(D.skippedBehind(SETS, {}, null), 0, "no pin, nothing skipped");
  eq(D.skippedBehind(SETS, {}, "nope"), 0, "a dangling pin skips nothing");

  ok(D.anchorIsRedundant(SETS, graded(ORDER[0]), ORDER[1]),
     "a pin sitting exactly on the frontier is flagged as doing nothing");
  ok(!D.anchorIsRedundant(SETS, graded(ORDER[0], ORDER[7]), ORDER[8]),
     "a pin that genuinely moves today is not flagged");
  ok(!D.anchorIsRedundant(SETS, {}, null), "no pin is not redundant, it is absent");
}

// ── the seven sections ────────────────────────────────────────────────────
console.log("the sections");
{
  eq(D.KEYS.join(","), "lesson,review,sprint,warmup,challenge,core,bonus",
     "the order is the one a child meets, and it lives in one place");
  ok(D.KEYS.indexOf("challenge") < D.KEYS.indexOf("core"),
     "challenge comes before core, since beating it can excuse core");

  const full = D.sectionsFor(
    {lesson:1, review:3, sprint:12, warmup:6, core:5, challenge:2, bonus:4},
    {bonusUnlocked:true});
  eq(full.length, 7, "every section is present");
  ok(full.every(s => s.state === "ready"), "a full day is all ready");
  eq(D.nextSection(full).key, "lesson", "the day starts at the lesson");

  // Each section names one source. Three of them used to share the review
  // queue, which is the overlap this rework removed.
  const froms = D.SECTIONS.map(s => s.from);
  eq(new Set(froms).size, froms.length, "no two sections claim the same source");

  // An empty section is shown, not hidden — the shape of a day is constant.
  const noChallenge = D.sectionsFor({lesson:1, review:0, sprint:12, warmup:6, core:5, challenge:0, bonus:0}, {});
  eq(noChallenge.length, 7, "a day with no challenge items still has seven rows");
  eq(noChallenge.find(s => s.key === "challenge").state, "empty", "the empty one is marked, not dropped");
  eq(noChallenge.find(s => s.key === "review").state, "empty", "an empty review queue reads empty");

  // Bonus is generated from the work, so it cannot be open before it.
  eq(D.sectionsFor({bonus:3}, {bonusUnlocked:false}).find(s => s.key === "bonus").state, "locked",
     "bonus is locked until the sections above have run");
  eq(D.sectionsFor({bonus:3}, {bonusUnlocked:true}).find(s => s.key === "bonus").state, "ready",
     "and opens once they have");
}

// ── finishing a day ───────────────────────────────────────────────────────
console.log("finishing");
{
  const counts = {lesson:1, review:2, sprint:10, warmup:6, core:5, challenge:2, bonus:0};
  const part = D.sectionsFor(counts, {lesson:true, review:true});
  eq(D.nextSection(part).key, "sprint", "start opens the first section with work left");
  ok(!D.dayComplete(part), "a part-done day is not complete");

  const all = D.sectionsFor(counts,
    {lesson:true, review:true, sprint:true, warmup:true, core:true, challenge:true});
  ok(D.dayComplete(all), "every section with work done finishes the day");

  // The trap: a day with nothing authored in a section must still finish.
  const thin = D.sectionsFor({lesson:1, review:0, sprint:0, warmup:6, core:5, challenge:0, bonus:0},
                             {lesson:true, warmup:true, core:true});
  ok(D.dayComplete(thin), "empty and locked sections cannot hold a day open");

  ok(!D.dayComplete(D.sectionsFor({}, {})), "a day with no work at all is not 'complete'");
  eq(D.nextSection(D.sectionsFor({}, {})), null, "and has nothing to open");
}

// ── junk in, no throw ─────────────────────────────────────────────────────
console.log("junk");
{
  ok(D.resolveDay(null, null, null).set === null, "no sets, no day, no throw");
  ok(D.resolveDay([], {}, "x").set === null, "empty course, no day");
  eq(D.sectionsFor(null, null).length, 7, "no counts still yields the day's shape");
  eq(D.sectionsFor({core:-4}, {}).find(s => s.key === "core").count, 0, "a negative count cannot appear");
}

// ── beating challenge can excuse core, but only on a thick enough day ─────
console.log("challenge excusing core");
{
  const thick = {lesson:1, review:2, sprint:8, warmup:6, challenge:4, core:5, bonus:0};
  const thin  = {lesson:1, review:2, sprint:8, warmup:6, challenge:2, core:5, bonus:0};

  eq(D.CHALLENGE_SKIP_MIN, 4, "the floor is 4 — the size Challenge actually is in most authored sets");

  ok(!D.coreOptional(thick, {}), "core is required until the challenge is actually beaten");
  ok(D.coreOptional(thick, {challenge:true}), "beating a 4-item challenge excuses core");
  ok(!D.coreOptional(thin, {challenge:true}),
     "beating a 2-item challenge does NOT — two right puzzle answers cannot buy a skip");
  ok(!D.coreOptional(thick, {challenge:true, core:true}),
     "core already done is not 'optional', it is finished");

  const s = D.sectionsFor(thick, {challenge:true});
  eq(s.find(x => x.key === "core").state, "optional", "core reads as optional on the day view");
  ok(s.find(x => x.key === "core").note.length > 0, "and says why");
  eq(s.find(x => x.key === "core").count, 5, "while still showing what is in there");

  eq(D.sectionsFor(thin, {challenge:true}).find(x => x.key === "core").state, "ready",
     "on a thin day core stays required");

  // An excused core must not strand the child on an unfinishable day.
  const rest = D.sectionsFor(thick, {lesson:true, review:true, sprint:true, warmup:true, challenge:true});
  ok(D.dayComplete(rest), "an excused core does not hold the day open");
  eq(D.nextSection(rest), null, "and nothing is left to open");
}

// ── the one line that answers "am I finished?" ────────────────────────────
console.log("progress");
{
  const counts = {lesson:1, review:2, sprint:8, warmup:6, challenge:4, core:5, bonus:0};
  const none = D.progress(D.sectionsFor(counts, {}));
  eq(none.done, 0, "nothing done yet");
  eq(none.total, 6, "six sections hold work on this day");
  ok(!none.complete, "and it is not complete");

  const some = D.progress(D.sectionsFor(counts, {lesson:true, review:true}));
  eq(some.done, 2, "two done");
  eq(some.total, 6, "denominator does not drift as work is done");

  const all = D.progress(D.sectionsFor(counts,
    {lesson:true, review:true, sprint:true, warmup:true, challenge:true, core:true}));
  ok(all.complete, "everything done reads complete");
  eq(all.done, all.total, "and the numbers agree");

  /* The denominator must SHRINK when core is excused, or the header would sit
   * at 5 of 6 on a day the child was told they had finished. */
  const excused = D.progress(D.sectionsFor(counts,
    {lesson:true, review:true, sprint:true, warmup:true, challenge:true}));
  eq(excused.total, 5, "an excused core leaves the denominator");
  ok(excused.complete, "so the day reads complete");
  eq(excused.extra, 1, "and the optional work is still counted as available");
}

// ── the page actually uses it ─────────────────────────────────────────────
/* The module can be perfect and the screen still blank. Every one of these
 * caught, or would have caught, a real mistake while this was being built:
 * the script tag was genuinely missing the first time, and an unbound {{ }}
 * renders EMPTY and only warns — it does not throw, so nothing else notices. */
console.log("wired into the page");
{
  const fs = require("fs");
  const page = fs.readFileSync(__dirname + "/../index.html", "utf8");

  ok(/<script src="\.\/curriculum\/math-day\.js/.test(page),
     "index.html loads math-day.js — without the tag MATH_DAY is undefined and the day view is blank");
  ok(page.indexOf("curriculum/math-sequence.js") < page.indexOf("curriculum/math-day.js"),
     "and loads it after math-sequence, which it reads at call time");

  ok(page.indexOf('<sc-if value="{{ isDay }}"') > 0, "the day view exists in the markup");

  // Maths must ENTER on the day, not on the mission map.
  ok(/s\.open==="builtin"/.test(page) && /view:hasDay\?"day":"map"/.test(page),
     "choosing maths opens the day, not the mission browser");

  // Every binding the day view draws must be produced by dayVals.
  const i = page.indexOf('<sc-if value="{{ isDay }}"');
  const blk = page.slice(i, page.indexOf("</sc-if>", i));
  const vals = page.slice(page.indexOf("  dayVals(){"), page.indexOf("  openDaySection="));
  const binds = [...new Set((blk.match(/\{\{ (?:day[A-Za-z]*|s\.[a-zA-Z]+) \}\}/g) || [])
    .map(b => b.slice(3, -3)))];
  ok(binds.length > 10, "the day view binds a real number of things (" + binds.length + ")");
  binds.forEach(b => {
    const key = b.startsWith("s.") ? b.slice(2) : b;
    ok(vals.indexOf(key + ":") >= 0, "dayVals produces {{ " + b + " }}");
  });

  ok(vals.indexOf("MATH_DAY") > 0, "the view asks the module for the order, rather than hardcoding it");

  /* The finished-course screen. resolveDay returns {set:null, complete:true}
   * when everything from the pin onward is done — a state every successful
   * child reaches. Binding the headline straight off `set` left it EMPTY, under
   * a progress line that still said "Next up: Sprint", so finishing the year
   * was rewarded with a broken-looking page. */
  ok(/dayName:set\?[\s\S]{0,240}r\.complete\?/.test(vals),
     "a finished course gets a real headline, not an empty one");
  ok(/sprint:\s*set\?1:0/.test(vals),
     "and does not claim a sprint on a day that does not exist");
  ok(/dayNote:!set/.test(vals),
     "and the progress line does not invent a next section with no day");

  /* Routing now hard-depends on the module. If it fails to load, the maths
   * entry must fall back to the Mission Map rather than render nothing. */
  ok(/hasDay\?"day":"map"/.test(page),
     "a missing module falls back to the map instead of a blank page");
  // The seven names must not be re-listed in the view — one source of order.
  const relisted = /daySections\s*=\s*\[/.test(vals);
  ok(!relisted, "the view does not keep its own copy of the section list");
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
