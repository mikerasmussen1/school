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

// ── review builds itself, with no teacher in the loop ─────────────────────
console.log("automatic review");
{
  const sug = n => Array.from({length:n}, (_, i) => ({qid:"s"+i, kind:"red"}));

  eq(D.DAILY_REVIEW, 5, "a morning's review is capped, however deep the backlog");

  eq(D.autoReview(sug(20), [], {}).length, 5,
     "a 20-deep backlog serves five, not twenty — a wall of corrections is a punishment");
  eq(D.autoReview(sug(2), [], {}).length, 2, "a short backlog serves what there is");
  eq(D.autoReview([], [], {}).length, 0, "nothing missed, nothing to review");

  // The old model needed a grown-up every morning. This one does not.
  ok(D.autoReview(sug(6), [], {}).length > 0,
     "review happens with an empty teacher queue — no approval step");

  // A teacher's explicit pick still outranks the mill's ranking.
  const withPick = D.autoReview(sug(6), [{qid:"teacher-pick"}], {});
  eq(withPick[0].qid, "teacher-pick", "anything a teacher queued is served first");
  eq(withPick.length, 5, "and still inside the day's cap");

  // Answering a question today must not hand it straight back.
  const done = D.autoReview(sug(9), [], {s0:true, s1:true});
  ok(!done.some(x => x.qid === "s0" || x.qid === "s1"),
     "a question answered today does not come back today");
  eq(done.length, 5, "and the slots it freed are filled from further down");
  eq(done[0].qid, "s2", "starting from the next one the mill ranked");
  // With a shallow backlog there is simply less to serve, and that is correct.
  eq(D.autoReview(sug(6), [], {s0:true, s1:true}).length, 4,
     "a backlog smaller than the cap serves what is left, not a padded five");

  // No duplicates, even when the teacher queued something the mill also found.
  const both = D.autoReview(sug(6), [{qid:"s3"}], {});
  eq(both.filter(x => x.qid === "s3").length, 1,
     "a question the teacher queued AND the mill found is served once");

  eq(D.autoReview(null, null, null).length, 0, "junk in, no throw");
  eq(D.autoReview(sug(9), [], {}, 3).length, 3, "the cap is overridable");
  eq(D.autoReview(sug(9), [], {}, 0).length, 0, "and zero means zero");
  ok(!D.autoReview([{qid:null},{qid:"ok"}], [], {}).some(x => !x.qid),
     "an entry with no question id is dropped, not served as a blank");
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

  /* There is no separate "Today" screen. It existed briefly and was wrong:
   * it LINKED to the day's work, which only moved the browsing one step later,
   * and the links landed on the old un-ordered practice layout. The practice
   * page IS the day now, so every day — today's or any other — is identical. */
  ok(page.indexOf('<sc-if value="{{ isDay }}"') < 0,
     "there is no separate launcher screen that links to the day");
  ok(/goToSet\(r\.set\.id/.test(page),
     "choosing maths opens today's day page itself");

  /* THE BUG THIS CLASS OF NAVIGATION CAUSES. curSet() resolves pset inside
   * setsForWeek(uview, pweek) and falls back to that week's FIRST day when it
   * cannot find it, so any route that sets pset WITHOUT uview/pweek silently
   * opens the wrong day — "I click 2.2 and get 2.1". Every route must go
   * through goToSet, which unpacks the id into all three. */
  ok(/goToSet\(setId, \{pTier:TIER\[key\]\}\)/.test(page),
     "opening a tier section goes through goToSet");
  {
    const gts = page.slice(page.indexOf("  goToSet(setId, extra)"), page.indexOf("  goToSet(setId, extra)") + 900);
    ok(/patch\.uview\s*=/.test(gts) && /patch\.pweek\s*=/.test(gts),
       "goToSet sets uview and pweek, not just pset");
  }
  /* No route may move to an ARBITRARY day by pset alone. Two initialisation
   * paths set pset to mission 1's first set while pinning uview/pweek to 1 in
   * the same flow — those are fine, and the rule has to allow them or it just
   * gets deleted the first time it fires. Everything else must carry the week. */
  {
    const strays = [];
    let at = 0;
    for(;;){
      const i = page.indexOf("setState({pset:", at);
      if(i < 0) break;
      at = i + 1;
      const call = page.slice(i, page.indexOf("})", i) + 2);
      const carriesWeek = /uview/.test(call) && /pweek/.test(call);
      const missionOneDefault = /setsFor\(1\)\[0\]|first\.id/.test(call);
      if(!carriesWeek && !missionOneDefault) strays.push(call.slice(0, 60));
    }
    ok(strays.length === 0,
       "no route jumps to a day by pset alone" + (strays.length ? ": " + strays.join(" | ") : ""));
  }

  /* THE HOLE THE FIRST VERSION OF THIS TEST LEFT. It only inspected
   * setState({pset:...}) — but most day links navigate with
   * nav({view:"practice", ... pset:...}), and the unit page's links passed a
   * STALE pweek (the week the list was built for, not the clicked day's). The
   * header moved and the content did not, because curSet could not find the
   * set in the week it was told to look in. */
  {
    const strays = [];
    let at = 0;
    for(;;){
      const i = page.indexOf('nav({view:"practice"', at);
      if(i < 0) break;
      at = i + 1;
      const call = page.slice(i, page.indexOf("})", i) + 2);
      if(/pset:/.test(call) && !(/uview/.test(call) && /pweek/.test(call)))
        strays.push(call.replace(/\s+/g, " ").slice(0, 70));
    }
    ok(strays.length === 0,
       "no nav() opens a day without carrying its week" + (strays.length ? ": " + strays.join(" | ") : ""));
  }

  /* THE WEEK TABS AND THE DAY LIST MUST AGREE.
   *
   * The unit page's week tabs write st.week, but uDays was built from
   * mathToday() and ignored them — picking Week 3 moved the heading while the
   * days underneath stayed on week 1, so "day 4" opened week 1's day 4. The
   * symptom reads as "the header updates but the content does not", which is
   * indistinguishable from a navigation bug and sent me looking in the wrong
   * place twice. */
  {
    const tabs = page.slice(page.indexOf("weekTabs:WKS.map"), page.indexOf("weekTabs:WKS.map") + 200);
    ok(/setState\(\{week:w\.n\}\)/.test(tabs), "the week tabs write st.week");
    const ud = page.slice(page.indexOf("uDays:(()=>{"), page.indexOf("uDays:(()=>{") + 2600);
    ok(/const w=st\.week/.test(ud), "and the day list reads st.week, so the two cannot disagree");
    ok(/setsForWeek\(st\.uview,w\)/.test(ud), "listing that week's days");
    ok(/this\.goToSet\(s\.id\)/.test(ud), "and opening them with their own week attached");
  }

  /* THE DAY THAT IS OPEN IS THE ONE pset NAMES — full stop.
   *
   * curSet() used to resolve inside setsForWeek(uview, pweek), so the open day
   * depended on three pieces of state agreeing and fell back to the week's
   * FIRST day when they did not. That fallback is why "click 3.4, get 3.1" was
   * invisible: the page rendered a real day, just the wrong one, with no error.
   * Several callers set pset without the matching week; rather than chase each
   * one, the id — which already encodes mission and week — is now authoritative
   * and a stale week cannot change which day opens. */
  {
    const cs = page.slice(page.indexOf("  curSet(){"), page.indexOf("  curSet(){") + 700);
    ok(/allSetsForCurriculum\(\)/.test(cs) || /setsFor\(u\)/.test(cs),
       "curSet resolves pset beyond the currently-displayed week");
    ok(/weekOfOpenSet\(\)\{/.test(page), "the open set's own week is derived from its id");
    const st = page.slice(page.indexOf("  sets(){"), page.indexOf("  sets(){") + 180);
    ok(/weekOfOpenSet\(\)/.test(st),
       "and the day list shows the week the open set is in, so list and day agree");
  }

  /* A WEEK'S SHARED LESSON MUST SAY SO.
   *
   * Week 1 of a mission authors a lesson per day; every later week has ONE
   * method lesson across all five — 285 sets across the two years. Unlabelled, stepping
   * 2.2 -> 2.3 changed every question while the lesson stayed identical, and
   * that was reported (repeatedly, and reasonably) as "the day is not
   * loading". The page now names it. */
  {
    const lv = page.slice(page.indexOf("  learnVals(){"), page.indexOf("  learnVals(){") + 6000);
    ok(/lWeekly\s*=\s*sibs\.length>1 && titles\.size===1/.test(lv),
       "a shared lesson is detected by comparing the week's days, not hardcoded");
    ok(/lKicker:lWeekly/.test(lv), "and the header says which kind of lesson this is");
    ok(/lDayNo\+" of "\+lDayTotal/.test(lv),
       "naming which day of the week you are on, so the repeat reads as deliberate");
    ok(page.indexOf("{{ lKicker }}") > 0, "and the markup shows it");
    ok(page.indexOf("Learn it first · {{ lStepNo }}") < 0,
       "the old unconditional 'Learn it first' label is gone");
  }

  /* EVERY DAY HAS ITS OWN LESSON.
   *
   * 285 of the 365 sets across both years (190 Year One, 175 Year Two) used to share their week's single method lesson, so the
   * largest thing on the page never changed as you stepped through a week —
   * indistinguishable from a day that had not loaded. The generated lessons
   * fill that, and the generator NEVER overwrites hand-authored ones: the
   * week-1 lessons (dot diagrams, area models) are the best teaching in the
   * course and nothing generated can match them. */
  {
    const fsx = require("fs");
    const daily = __dirname + "/../curriculum/math-lessons-daily.js";
    ok(fsx.existsSync(daily), "the generated lessons file exists");
    ok(/<script src="\.\/curriculum\/math-lessons-daily\.js/.test(page),
       "and index.html loads it");
    ok(page.indexOf("math-lessons-daily.js") < page.indexOf("curriculum/registry.js"),
       "before registry.js, which is what assembles ALL_LESSONS");

    const reg = fsx.readFileSync(__dirname + "/../curriculum/registry.js", "utf8");
    const i = reg.indexOf("const ALL_LESSONS");
    const line = reg.slice(i, reg.indexOf(";", i));
    ok(line.indexOf("LESSONS_DAILY") < line.indexOf("LESSONS,"),
       "generated lessons merge FIRST, so authored ones override them");

    const src = fsx.readFileSync(daily, "utf8");
    ok(/DO NOT EDIT BY HAND/.test(src), "the file says it is generated");
    ok(!/"p1":\{/.test(src) && !/"y5u1p1":\{/.test(src),
       "and contains no entry for a hand-authored week-1 day");

    /* IDEMPOTENCE. The generator first read ALL_LESSONS to decide what was
     * already authored — which, after one run, contained its own output. The
     * second run therefore saw all 365 days as authored, generated nothing,
     * and wrote an EMPTY file over a good one. It reads the authored sources
     * directly now, so re-running always reproduces the same file. */
    const gen = fsx.readFileSync(__dirname + "/../scripts/gen-daily-lessons.js", "utf8");
    ok(/const AUTHORED = Object\.assign/.test(gen),
       "the generator builds its authored list from the authored sources");
    ok(!/const ALL_LESSONS = C\.ALL_LESSONS/.test(gen),
       "and never from ALL_LESSONS, which would include its own output");
    const n = (src.match(/^  "/gm) || []).length;
    ok(n > 250, "the generated file is not empty (" + n + " lessons)");
  }

  /* HAND-AUTHORED LESSONS OVERRIDE THE GENERATED FLOOR.
   *
   * Three tiers: generated stand-ins, then real authored teaching, then the
   * original week-1 lessons. Each overwrites the one before, so a day can be
   * upgraded by adding one entry and nothing else. */
  {
    const fsx = require("fs");
    const authored = __dirname + "/../curriculum/math-lessons-authored.js";
    ok(fsx.existsSync(authored), "the authored-lessons file exists");
    ok(/<script src="\.\/curriculum\/math-lessons-authored\.js/.test(page),
       "index.html loads it");
    ok(page.indexOf("math-lessons-authored.js") > page.indexOf("math-lessons-daily.js"),
       "after the generated floor it replaces");

    const reg = fsx.readFileSync(__dirname + "/../curriculum/registry.js", "utf8");
    const i = reg.indexOf("const ALL_LESSONS");
    const line = reg.slice(i, reg.indexOf(";", i));
    ok(line.indexOf("LESSONS_DAILY") < line.indexOf("LESSONS_AUTHORED"),
       "authored lessons merge AFTER the generated ones, so they win");
    ok(line.indexOf("LESSONS_AUTHORED") < line.indexOf("LESSONS,"),
       "and the original week-1 authoring still wins over both");
  }

  /* ONE CACHE TOKEN FOR EVERY CURRICULUM FILE.
   *
   * registry.js was edited to merge the new lesson tiers, but its ?v= token
   * was left alone — so browsers kept serving the cached copy whose
   * ALL_LESSONS predated the change, lessonFor fell through to the weekly
   * lesson, and the fix looked like it had done nothing. Content changed while
   * its URL did not. A single shared token makes that impossible to get wrong:
   * bumping it updates every curriculum file at once. */
  {
    const toks = [...new Set((page.match(/curriculum\/[^"?]+\.js\?v=([^"]+)/g) || [])
      .map(m => m.split("?v=")[1]))];
    eq(toks.length, 1, "every curriculum script shares one cache-bust token (found " + toks.join(", ") + ")");
    const n = (page.match(/curriculum\/[^"?]+\.js\?v=/g) || []).length;
    ok(n > 30, "and all " + n + " of them carry one");
  }

  /* THE TAB ORDER IS THE ORDER OF USE. */
  {
    const t = page.slice(page.indexOf("      tabs:[["), page.indexOf("      tabs:[[") + 200);
    ok(/\["practice","★ Today"\]/.test(t), "Today is first and starred");
    ok(t.indexOf('"practice"') < t.indexOf('"unit"'), "before the mission page");
    ok(t.indexOf('"unit"') < t.indexOf('"map"'), "which is before the map");
    ok(t.indexOf('"map"') < t.indexOf('"hq"'), "and Teacher HQ is last");
    /* The retired name survives in exactly one place: the comment explaining
     * the rename, so it stays legible to whoever reads it next. Anywhere else
     * — a label, a heading, a back-button — is a miss. */
    const hits = (page.match(/Practice Bay/g) || []).length;
    eq(hits, 2, "the old name appears only in the comment recording the rename");
    ok(/the Practice Bay\. \(That name survives in this comment only/.test(page),
       "and that is the occurrence it is");
  }

  /* THE LESSONS HAVE TO DRAW SOMETHING.
   *
   * The weekly lessons these replaced carried a magnitude bar on 82 of their
   * 84 steps — a cell whose WIDTH is the size of the answer, so 0.42 is a
   * sliver and 2400 is long. The first generated pass computed those bars and
   * then threw them away, because the serialiser only wrote `cap` and `sum`.
   * Every day past week 1 came out text-only and the visuals were reported
   * lost, correctly. */
  {
    const fsx = require("fs");
    const src = fsx.readFileSync(__dirname + "/../curriculum/math-lessons-daily.js", "utf8");
    const bars = (src.match(/cols:\[/g) || []).length;
    ok(bars > 700, "the generated lessons carry magnitude bars (" + bars + " steps)");

    const gen = fsx.readFileSync(__dirname + "/../scripts/gen-daily-lessons.js", "utf8");
    ok(/if\(s\.cols\)/.test(gen) && /if\(s\.cells\)/.test(gen),
       "and the serialiser writes every field a step carries, not a fixed pair");

    const auth = fsx.readFileSync(__dirname + "/../curriculum/math-lessons-authored.js", "utf8");
    ok((auth.match(/cols:\[/g) || []).length > 50,
       "the hand-authored lessons draw too");
  }

  /* And the positive statement: goToSet is how you open a day. */
  ok((page.match(/this\.goToSet\(/g) || []).length >= 5,
     "every day link routes through goToSet");
  ok(/view:"map",subjectView:null\}\); return; \}/.test(page),
     "and falls back to the mission map if the module did not load");

  // Every binding the day view draws must be produced by dayVals.
  // The day header rides on the practice page now, so that is where its
  // bindings live.
  const i = page.indexOf('value="{{ isPractice }}"');
  const blk = page.slice(i, page.indexOf("{{ pTierNote }}", i));
  const vals = page.slice(page.indexOf("  dayVals(){"), page.indexOf("  openDaySection="));
  /* Only the day header's own bindings. The `{{ s.* }}` half of this pattern
   * belonged to the launcher's section loop, which no longer exists — left in,
   * it matched other loops on the page that happen to use `s` as their item. */
  const binds = [...new Set((blk.match(/\{\{ day[A-Za-z]* \}\}/g) || [])
    .map(b => b.slice(3, -3)))];
  ok(binds.length > 10, "the day view binds a real number of things (" + binds.length + ")");
  binds.forEach(b => ok(vals.indexOf(b + ":") >= 0, "dayVals produces {{ " + b + " }}"));

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

  /* THE ORDER ON THE PAGE ITSELF. The whole point of the rework: every day
   * page runs the seven sections in the module's order, so there is no such
   * thing as an "old style" day left to land on. */
  {
    const prac = page.slice(page.indexOf('value="{{ isPractice }}"'));
    const at = k => prac.indexOf(k);
    ok(at("{{ dayProgress }}") > 0, "every day page says where it is and whether it is finished");
    ok(at("lHasLesson") < at("pReviewHas"), "lesson comes before review — taught before tested");
    ok(at("pReviewHas") < at("sprOn"), "review before sprint");
    ok(at("sprOn") < at("pTierChips"), "sprint before the day's own tiers");
    ok(at("pTierChips") < at("dynReady"), "bonus is last — it is built FROM the work above");
    ok(at("dynReady") > at("pAllRight"), "and really is at the end of the page, not the top");

    /* ORDER IS NOT PLACEMENT. These blocks were moved by cutting and pasting
     * matched <sc-if> ranges, and text order cannot see that a block landed
     * INSIDE the wrong container. Bonus did exactly that on the first attempt:
     * it read last on the page while sitting nested in the questions card,
     * which would have drawn a bordered card inside a bordered card. Depth is
     * measured from the view's <main>, so it is the DOM shape, not the text. */
    const main = page.indexOf("<main", page.indexOf('value="{{ isPractice }}"'));
    const depthAt = needle => {
      const seg = page.slice(main, page.indexOf(needle, main));
      return (seg.match(/<div\b/g) || []).length - (seg.match(/<\/div>/g) || []).length;
    };
    eq(depthAt("{{ dynReady }}"), 0, "bonus is a top-level section, not nested in the questions card");
    eq(depthAt("{{ dynBusy }}"), 0, "and so is the round it announces");
    ok(depthAt("{{ pAllRight }}") > 0, "while the cleared-board banner really is inside that card");

    /* THE TITLE NAMES THE DAY ON SCREEN. It used to name whatever mathToday()
     * resolved, so navigating to another day left the heading reading "Day 2 ·
     * Mission 01 · Week 1" with the calendar sentence under it — describing a
     * day the child had navigated away from. */
    const vals2 = page.slice(page.indexOf("    const TODAY=this.mathToday();"),
                             page.indexOf("pTierChips:"));
    ok(/VIEW_POS/.test(vals2), "the title is computed from the viewed set's position");
    ok(/pDayLabel: VIEW_POS \?/.test(page), "the day number follows the viewed day");
    ok(/pDayWhere: VIEW_POS/.test(page), "and so does the mission and week");
    ok(/pDayCalendar: VIEW_IS_TODAY/.test(page),
       "the 'school day N of 180' sentence is a fact about today, so it shows only on today");
    ok(/VIEW_POS\.n===TODAY\.dayNumber/.test(page),
       "and 'is this today' compares positions in the same ordered list");
  }
  // The seven names must not be re-listed in the view — one source of order.
  const relisted = /daySections\s*=\s*\[/.test(vals);
  ok(!relisted, "the view does not keep its own copy of the section list");
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
