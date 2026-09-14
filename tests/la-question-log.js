/* Language Arts must record progress the way maths does: one entry per
 * question, written AS the child answers.
 *
 * What went wrong before, and what each part of this guards:
 *
 *   - a drill lived entirely in setState, so a child who answered six of ten
 *     questions and closed the tab left nothing behind at all
 *   - markDone wrote localStorage and state and never called syncSave, so a
 *     finished step was recorded on that device and nowhere the teacher looks
 *   - only a score per step was ever kept, so "what did he actually get wrong"
 *     had no answer
 *
 * The last check is the one that keeps this true: it reads the source and
 * fails if any grading path forgets to log.
 *
 * Run: node tests/la-question-log.js
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), D = ROOT + "/curriculum/";

const mem = {};
global.localStorage = {getItem:k=>(k in mem?mem[k]:null), setItem:(k,v)=>{mem[k]=String(v)}, removeItem:k=>{delete mem[k]}};
global.window = global; global.scrollTo = ()=>{};
global.setTimeout = f => { if(f) f(); return 0; }; global.clearTimeout = ()=>{};
global.setInterval = ()=>0; global.clearInterval = ()=>{};
global.addEventListener = global.removeEventListener = function(){};
global.document = {addEventListener(){}, removeEventListener(){}, visibilityState:"visible", createElement:()=>({style:{}})};
global.speechSynthesis = {cancel(){}, speak(){}}; global.SpeechSynthesisUtterance = function(){};
global.URL = {createObjectURL:()=>"b", revokeObjectURL:()=>{}};
global.fetch = async()=>({ok:false, json:async()=>({})});
global.location = {search:"", href:""};
global.matchMedia = ()=>({matches:false, addEventListener(){}, removeEventListener(){}});
window.Subjects = {_all:[], register(d){ this._all.push(d); }, all(){ return this._all; },
                   get(id){ return this._all.filter(s=>s.id===id)[0]||null; },
                   has(id){ return !!this.get(id); }};

const laPage = fs.readFileSync(ROOT + "/word-voyagers.dc.html", "utf8");
[...laPage.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m => m[1])
  .forEach(m => { try { require(D + m + ".js"); } catch(e){} });
// language-arts.js registers the subject; it is loaded by index.html, not the DC.
try { require(D + "language-arts.js"); } catch(e){}

/* Capture what syncSave would push, so "is it saved" is a real question and
 * not "did it set state". */
const pushed = [];
window.__CURR = window.__CURR || {};
window.__CURR.SYNC = {save:(id, data)=>{ pushed.push({id, data:JSON.parse(JSON.stringify(data))}); },
                      pull:async()=>null, pushNow:async()=>true, signedIn:()=>true};

class DCLogic{ setState(p){ this.state = {...this.state, ...(typeof p==="function"?p(this.state):p)}; } }
global.DCLogic = DCLogic;
const C = eval("(function(){ " + laPage.split("data-dc-script>")[1].split("</script>")[0] + "\n return Component; })()");

let fails = 0, checks = 0;
const ok = (c, what) => { checks++; if(!c){ console.log("  FAIL  " + what); fails++; } };
/* Checks that can only be read after a promise settles. Collected here and
 * awaited before the summary, so an async failure can never be reported as a
 * pass simply because the process finished first. */
const pending = [];

/* A clean child every time. The state field loads from localStorage, so
 * without wiping it each case would inherit the previous case's answers —
 * which is exactly the kind of cross-talk that makes a suite lie. */
function fresh(){
  Object.keys(mem).forEach(k => delete mem[k]);
  const c = new C({});
  c.props = {};
  c.state = {...(c.state||{})};
  c.state.year = "y1"; c.state.week = 3; c.state.day = "Tue";
  c.state.laLog = {}; c.state.stepDone = {}; c.state.done = {};
  return c;
}

console.log("an answer is recorded the moment it is given");
{
  const c = fresh();
  pushed.length = 0;
  const item = {id:"q1", q:"Which word is the verb?", a:"ran", type:"short-answer"};
  c.logAnswer("gz", item, "ran", true);

  const key = "y1:3:Tue:gz";
  const log = c.state.laLog[key] || [];
  ok(log.length === 1, "one entry written (" + log.length + ")");
  ok(log[0] && log[0].q === item.q, "the question is kept");
  ok(log[0] && log[0].resp === "ran", "the child's answer is kept");
  ok(log[0] && log[0].ok === true, "the verdict is kept");
  ok(log[0] && log[0].ts > 0, "and it is stamped");

  ok(pushed.length === 1 && pushed[0].id === "la", "it was pushed to the record, not just to state");
  ok(!!(pushed[0].data || {}).laLog, "the pushed payload carries the log");
  ok(JSON.parse(mem["la.laLog"] || "{}")[key].length === 1, "and it is on disk locally too");
}

console.log("a half-finished drill still holds its answers");
{
  const c = fresh();
  const items = [
    {id:"a", q:"one?", a:"1"}, {id:"b", q:"two?", a:"2"},
    {id:"c", q:"three?", a:"3"}, {id:"d", q:"four?", a:"4"}
  ];
  c.logAnswer("rq", items[0], "1", true);
  c.logAnswer("rq", items[1], "9", false);
  // ...and the child walks away. Nothing marks the step done.

  const la = window.Subjects.get("la");
  ok(!!la && typeof la.questionLog === "function", "Language Arts offers a questionLog");
  const groups = la.questionLog({laLog:c.state.laLog, stepDone:{}});
  ok(!!groups && groups.length === 1, "the unfinished drill is reported");
  const g = groups[0];
  ok(g.done === false, "and reported as still working");
  ok(g.marked === 2 && g.right === 1, "with the score so far (" + g.right + " of " + g.marked + ")");
  ok(g.rows.length === 2, "both answers are there");
  ok(g.rows[1].ok === false && g.rows[1].answer === "9", "including the wrong one, with what was typed");
  ok(/Week 3/.test(g.where) && /Tuesday/.test(g.where), "labelled by week and day: " + g.where);
}

console.log("a finished drill says so");
{
  const c = fresh();
  c.logAnswer("sq", {id:"s", q:"spell it", a:"because"}, "because", true);
  const la = window.Subjects.get("la");
  const groups = la.questionLog({laLog:c.state.laLog, stepDone:{"y1:3:Tue:sq":true}});
  ok(groups[0].done === true, "done is taken from stepDone, not from the answer count");
}

/* ── THE SPELLING DRILL ───────────────────────────────────────────────────
 * The case the first version of this test missed, because it used invented
 * items whose question text differed. Real spelling items all ask the SAME
 * thing — "Spell the word you hear: ___" — and differ only in the answer, so
 * deduping on the prompt collapsed a fourteen-word test into one row. This
 * runs the real week's list through the real drill. */
console.log("a whole spelling drill is kept, word by word");
{
  const Y1 = window.__CURR.LA_Y1;
  const set = Y1.spellingSetFor(3);
  const items = (set && set.items) || [];
  ok(items.length > 5, "the real week has a full list (" + items.length + " words)");
  ok(new Set(items.map(i => i.q)).size === 1,
     "and every one of them asks the identical question — which is the trap");

  const c = fresh();
  items.forEach(it => c.logAnswer("sq", it, it.a[0], true));

  const log = c.state.laLog["y1:3:Tue:sq"] || [];
  ok(log.length === items.length,
     "every word is kept, not just the last (" + log.length + " of " + items.length + ")");
  ok(new Set(log.map(e => e.resp)).size === items.length,
     "and each row holds its own word");

  const la = window.Subjects.get("la");
  const g = (la.questionLog({laLog:c.state.laLog, stepDone:{}}) || [])[0];
  ok(g && g.marked === items.length,
     "the teacher sees all " + items.length + " (" + (g ? g.marked : 0) + ")");
}

console.log("answering again replaces the earlier attempt");
{
  const c = fresh();
  const item = {id:"x", q:"Which word is the verb?", a:"ran"};
  c.logAnswer("gz", item, "dog", false);
  c.logAnswer("gz", item, "ran", true);
  const log = c.state.laLog["y1:3:Tue:gz"];
  ok(log.length === 1, "one row, not two (" + log.length + ")");
  ok(log[0].ok === true, "and it is the later attempt");
}

/* ── TWO DEVICES ──────────────────────────────────────────────────────────
 * The pull merges the record into what this device already holds. Taking
 * whichever side had more rows and dropping the other lost real graded work
 * whenever the two were disjoint — which is precisely the two-device case. */
console.log("pulling the record keeps answers from both devices");
{
  const c = fresh();
  // this device answered two questions of the drill
  c.logAnswer("gz", {id:"g1", q:"one?", a:"1"}, "1", true);
  c.logAnswer("gz", {id:"g2", q:"two?", a:"2"}, "2", true);

  // the record holds three OTHER questions of the same drill, from elsewhere
  const remote = {laLog:{"y1:3:Tue:gz":[
    {qid:"g3", q:"three?", a:"3", resp:"3", ok:true,  ts:10},
    {qid:"g4", q:"four?",  a:"4", resp:"9", ok:false, ts:11},
    {qid:"g5", q:"five?",  a:"5", resp:"5", ok:true,  ts:12}
  ]}};

  c.pulled = false;
  window.__CURR.SYNC.pull = async()=>remote;
  c.pullOnce();

  // pullOnce resolves on a promise; let it land before reading the result.
  pending.push(Promise.resolve().then(()=>Promise.resolve()).then(()=>{
    const rows = (c.state.laLog||{})["y1:3:Tue:gz"] || [];
    const ids = rows.map(r=>r.qid).sort().join(",");
    ok(rows.length === 5, "all five answers survive the merge (" + rows.length + ")");
    ok(ids === "g1,g2,g3,g4,g5", "from both sides: " + ids);
    ok(rows.filter(r=>r.ok===false).length === 1, "and the one miss is still a miss");
    window.__CURR.SYNC.pull = async()=>null;   // leave the stub as we found it
  }));
}

console.log("and the later answer wins where both sides have one");
{
  const c = fresh();
  c.logAnswer("gz", {id:"g1", q:"one?", a:"1"}, "wrong-here", false);
  const mine = (c.state.laLog||{})["y1:3:Tue:gz"][0];

  const remote = {laLog:{"y1:3:Tue:gz":[
    {qid:"g1", q:"one?", a:"1", resp:"stale", ok:false, ts:(mine.ts||0)-5000}
  ]}};
  c.pulled = false;
  window.__CURR.SYNC.pull = async()=>remote;
  c.pullOnce();

  pending.push(Promise.resolve().then(()=>Promise.resolve()).then(()=>{
    const rows = (c.state.laLog||{})["y1:3:Tue:gz"] || [];
    ok(rows.length === 1, "still one row for one question (" + rows.length + ")");
    ok(rows[0].resp === "wrong-here", "the newer attempt is the one kept");
    window.__CURR.SYNC.pull = async()=>null;
  }));
}

console.log("markDone reaches the record");
{
  const c = fresh();
  pushed.length = 0;
  c.markDone("spelling");
  ok(pushed.length === 1, "markDone pushed (" + pushed.length + ")");
  ok(!!((pushed[0] || {}).data || {}).done, "and the payload carries what was finished");
}

console.log("a day reset clears only that day's answers");
{
  const c = fresh();
  c.logAnswer("gz", {id:"1", q:"tue q", a:"a"}, "a", true);
  c.state.day = "Wed";
  c.logAnswer("gz", {id:"2", q:"wed q", a:"b"}, "b", true);
  ok(Object.keys(c.state.laLog).length === 2, "two days logged");

  const prefix = "y1:3:Wed:";
  const stripped = {};
  Object.keys(c.state.laLog).forEach(k => { if(k.indexOf(prefix) !== 0) stripped[k] = c.state.laLog[k]; });
  ok(Object.keys(stripped).length === 1 && !!stripped["y1:3:Tue:gz"],
     "the day prefix strips exactly one day — the shape resetOneDay relies on");
}

/* ── THE GUARD ────────────────────────────────────────────────────────────
 * Every place the drill decides an answer is right or wrong must write it
 * down. This is what stops the next drill added from quietly skipping it. */
console.log("every grading path logs");
{
  const graders = [...laPage.matchAll(/QTypes\.grade\(/g)].length;
  ok(graders >= 2, "found the grading calls (" + graders + ")");

  /* Each grade() call sits inside a handler that must also call logAnswer.
   * Scope to the 12 lines after each grade so an unrelated later call cannot
   * cover for a missing one. */
  const lines = laPage.split("\n");
  const missing = [];
  lines.forEach((ln, i) => {
    if(!/QTypes\.grade\(/.test(ln)) return;
    const near = lines.slice(i, i + 12).join("\n");
    if(!/logAnswer\(/.test(near)) missing.push(i + 1);
  });
  ok(missing.length === 0,
     "each grading path logs the answer" + (missing.length ? " — not at line(s) " + missing.join(", ") : ""));

  ok(!/markDone=\(key\)=>\{[^}]*this\.setState\(\{done\}\)/.test(laPage),
     "markDone does not end at setState");
  ok(/laLog:st\.laLog/.test(laPage), "syncSave carries the log");
  ok(/"la\.laLog"/.test(laPage), "the log survives a reload locally");
}

/* ── WHAT TEACHER HQ ACTUALLY PRODUCES ────────────────────────────────────
 * Not "does index.html contain the string subjectQuestionVals". The real
 * method, run against a real slice, must return rows a grown-up can read. */
console.log("Teacher HQ turns the log into rows");
{
  const page = fs.readFileSync(ROOT + "/index.html", "utf8");

  // The maths app's component, in this same harness — Subjects already holds
  // the registered LA course, which is what the method reads.
  global.React = {createElement:(t,p,...c)=>({__el:t, props:p, children:c})};
  global.navigator = {onLine:true};
  const parts = page.split("data-dc-script>");
  const src = (parts[1] || page.split(/<script(?![^>]*src)[^>]*>/).pop()).split("</script>")[0];
  let M = null;
  try { M = eval("(function(){ " + src + "\n return Component; })()"); } catch(e){ M = null; }
  ok(!!M, "the maths component loads" );

  if(M){
    const child = fresh();
    child.logAnswer("gz", {id:"h1", q:"Which word is the verb?", a:"ran"}, "ran", true);
    child.logAnswer("gz", {id:"h2", q:"Which word is the noun?", a:"dog"}, "cat", false);

    const app = new M({});
    app.props = {}; app.state = {};
    if(app.initState) Object.assign(app.state, app.initState() || {});
    const slice = {subjects:{la:{data:{laLog:child.state.laLog, stepDone:{}}}}};
    app.reviewStudents = () => [{id:"p1", name:"Brock", slice:slice}];

    const v = app.subjectQuestionVals();
    ok(v.hqQAny === true, "it reports there is something to show");
    ok((v.hqQGroups||[]).length === 1, "one drill (" + (v.hqQGroups||[]).length + ")");
    const g = (v.hqQGroups||[])[0] || {};
    ok(g.state === "Still working", "an unfinished drill says so, not 'Finished'");
    ok((g.rows||[]).length === 2, "both questions listed (" + (g.rows||[]).length + ")");
    ok((g.rows||[]).some(r=>r.q === "Which word is the verb?"), "the question text is carried");
    ok((g.rows||[]).some(r=>r.answer === "cat"), "and what the child typed");
    const wrong = (g.rows||[]).filter(r=>r.mark === "✗")[0];
    ok(!!wrong, "the miss is marked");
    ok(wrong && wrong.showCorrect === true && wrong.correct === "dog",
       "and the right answer is shown beside it");
    const rightRow = (g.rows||[]).filter(r=>r.mark === "✓")[0];
    ok(rightRow && rightRow.showCorrect === false,
       "but not beside one they got right");

    // Nothing answered at all must not claim a panel.
    app.reviewStudents = () => [{id:"p1", name:"Brock", slice:{subjects:{}}}];
    const empty = app.subjectQuestionVals();
    ok(empty.hqQAny === false, "and an untouched student shows nothing");

    // A subject whose hook throws must not take the screen down with it.
    const la = window.Subjects.get("la");
    const good = la.questionLog;
    la.questionLog = () => { throw new Error("boom"); };
    let threw = false;
    try { app.subjectQuestionVals(); } catch(e){ threw = true; }
    la.questionLog = good;
    ok(!threw, "a broken subject hook loses its rows, never the screen");
  }

  ok(/\{\{ hqQGroups \}\}/.test(page), "the template lists the groups");
  ok(/questionLog/.test(fs.readFileSync(D + "subjects.js", "utf8")),
     "the hook is documented in the subject contract");

  /* ── CLICKING A DAY IN THE GLANCE ──────────────────────────────────────
   * The squares were five anonymous cells that did nothing. A parent's
   * instinct is to click the day, so the day is what opens. */
  if(M){
    const la = window.Subjects.get("la");

    // Monday answered, Tuesday not touched at all.
    const kid = fresh();
    kid.state.week = 1; kid.state.day = "Mon";
    kid.logAnswer("gz", {id:"m1", q:"Which word is the verb?", a:"ran"}, "ran", true);
    kid.logAnswer("gz", {id:"m2", q:"Which word is the noun?",  a:"dog"}, "cat", false);
    const data = {laLog: kid.state.laLog, stepDone: {}, week: 1, year: "y1"};

    const glance = la.weekGlance(data, {week: 1});
    const cells = ((glance.columns || [])[0] || {}).cells || [];
    ok(cells.length === 5, "the week still draws five days (" + cells.length + ")");
    ok(cells.map(c => c.label).join("") === "MTWTF",
       "each square says which day it is (" + cells.map(c => c.label).join("") + ")");

    const mon = cells[0], tue = cells[1];
    ok(mon.id === "y1:1:Mon", "Monday carries its day id (" + mon.id + ")");
    ok(!tue.id, "a day with nothing recorded is not clickable");

    // Clicking Monday must produce Monday's questions, and only Monday's.
    const app2 = new M({});
    app2.props = {}; app2.state = {};
    if(app2.initState) Object.assign(app2.state, app2.initState() || {});
    const v = app2.pickedDayVals(la, data, null, mon.id);
    ok(v.hasPicked === true, "clicking it opens a panel");
    ok(/Week 1/.test(v.pickedLabel) && /Monday/.test(v.pickedLabel),
       "headed by the week and day: " + v.pickedLabel);
    ok(v.pickedDrills.length === 1, "one drill that day (" + v.pickedDrills.length + ")");
    const d0 = v.pickedDrills[0] || {};
    ok((d0.rows || []).length === 2, "both questions (" + (d0.rows || []).length + ")");
    ok((d0.rows || []).some(r => r.q === "Which word is the verb?"), "the question asked");
    ok((d0.rows || []).some(r => r.answer === "cat"), "and what was answered");
    const miss = (d0.rows || []).filter(r => r.mark === "✗")[0];
    ok(miss && miss.correct === "dog", "with the right answer against the miss");

    // A different day must not leak into it.
    kid.state.day = "Wed";
    kid.logAnswer("gz", {id:"w1", q:"Wednesday question", a:"x"}, "x", true);
    const both = {laLog: kid.state.laLog, stepDone: {}, week: 1, year: "y1"};
    const monOnly = app2.pickedDayVals(la, both, null, "y1:1:Mon");
    const qs = monOnly.pickedDrills.flatMap(d => d.rows.map(r => r.q));
    ok(!qs.some(q => /Wednesday/.test(q)),
       "Monday's panel holds no other day's questions");
    ok(app2.pickedDayVals(la, both, null, "y1:1:Wed").pickedDrills.length === 1,
       "and Wednesday opens its own");

    /* Same day name, different week, must not collide. Week 2 has to hold
     * evidence of its own to be viewable at all — an unknown week falls back
     * to the newest rather than drawing an empty grid, which is deliberate. */
    kid.state.week = 2; kid.state.day = "Tue";
    kid.logAnswer("gz", {id:"t2", q:"Week two question", a:"y"}, "y", true);
    const twoWeeks = {laLog: kid.state.laLog, stepDone: {}, week: 2, year: "y1"};

    const w1 = ((la.weekGlance(twoWeeks, {week:1}).columns||[])[0]||{}).cells||[];
    const w2 = ((la.weekGlance(twoWeeks, {week:2}).columns||[])[0]||{}).cells||[];
    ok(w1[0].id === "y1:1:Mon", "week 1's Monday is week 1's (" + w1[0].id + ")");
    ok(!w1[1].id, "and week 1's Tuesday has nothing behind it");
    ok(!w2[0].id, "week 2's Monday has nothing behind it");
    ok(w2[1].id === "y1:2:Tue", "week 2's Tuesday is week 2's (" + w2[1].id + ")");

    /* Both layers filter, so test both. The shell re-filters defensively by
     * the `cell` each group carries, which means a subject that ignored
     * ctx.cell would still look right on screen — and its own contract would
     * be quietly broken for the next course that copies it. */
    const askedMon = la.questionLog(twoWeeks, {cell:"y1:1:Mon"});
    ok((askedMon||[]).length === 1,
       "the hook itself honours ctx.cell (" + (askedMon||[]).length + " groups)");
    ok((askedMon||[]).every(g => g.cell === "y1:1:Mon"),
       "and returns only that day");
    ok((la.questionLog(twoWeeks, {}) || []).length === 3,
       "with no cell asked for, it still returns everything");

    const openW2 = app2.pickedDayVals(la, twoWeeks, null, "y1:2:Tue");
    const w2qs = openW2.pickedDrills.flatMap(d => d.rows.map(r => r.q));
    ok(w2qs.length === 1 && /Week two/.test(w2qs[0]),
       "and it opens only its own question");

    // The toggle.
    app2.state.wgPick = {};
    app2.pickGlanceCell("la", "y1:1:Mon");
    ok((app2.state.wgPick || {}).la === "y1:1:Mon", "clicking selects the day");
    app2.pickGlanceCell("la", "y1:1:Mon");
    ok((app2.state.wgPick || {}).la === "", "clicking it again closes it");

    /* ── WORK DONE BEFORE THE LOG EXISTED ───────────────────────────────
     * The real case on Mike's screen: Monday finished, "Mon fix check: 2/2"
     * and "Mon rq check: 2/4" in the glance, and laLog empty because the work
     * predates per-question saving. The square sat inert and the day could not
     * be opened at all — a day with obvious work in it behaving as if it had
     * none. It must open and say what it knows. */
    const legacy = {
      laLog: {},
      stepDone: {"y1:1:Mon:end":true, "y1:1:Mon:fix":true, "y1:1:Mon:rq":true},
      stepResult: {
        "y1:1:Mon:fix": {score:2, total:2, at:1000},
        "y1:1:Mon:rq":  {score:2, total:4, at:1001}
      },
      week: 1, year: "y1"
    };
    const lg = la.weekGlance(legacy, {week:1});
    ok(!!lg, "a week with only scores still draws a glance");
    const lgCells = ((lg.columns||[])[0]||{}).cells||[];
    ok(lgCells[0].id === "y1:1:Mon",
       "and its Monday IS clickable on a score alone (" + (lgCells[0].id||"none") + ")");
    ok(!lgCells[1].id, "while a day with nothing at all still is not");

    const openLegacy = app2.pickedDayVals(la, legacy, null, "y1:1:Mon");
    ok(openLegacy.hasPicked === true, "it opens");
    ok(openLegacy.pickedDrills.length === 2,
       "both scored drills are listed (" + openLegacy.pickedDrills.length + ")");
    const byName = {};
    openLegacy.pickedDrills.forEach(d => { byName[d.what] = d; });
    ok(!!byName["Find the mistake"], "the fix drill is named properly, not 'fix'");
    ok(byName["Find the mistake"] && byName["Find the mistake"].score === "2 of 2 correct",
       "with its real score");
    ok(byName["Reading comprehension"] && byName["Reading comprehension"].score === "2 of 4 correct",
       "and so is the reading check");
    ok(openLegacy.pickedDrills.every(d => d.noDetail === true),
       "each says the questions themselves were not kept");
    ok(openLegacy.pickedDrills.every(d => /only the score was saved/.test(d.noDetailNote||"")),
       "in words a parent can read");

    /* And the two records must not double up once both exist for one drill. */
    const kid3 = fresh();
    kid3.state.week = 1; kid3.state.day = "Mon";
    kid3.logAnswer("fx", {id:"f1", q:"Find the mistake here", a:"their"}, "their", true);
    const mixed = {
      laLog: kid3.state.laLog,
      stepDone: {},
      stepResult: {"y1:1:Mon:fix": {score:1, total:1, at:1000},
                   "y1:1:Mon:rq":  {score:2, total:4, at:1001}},
      week: 1, year: "y1"
    };
    const openMixed = app2.pickedDayVals(la, mixed, null, "y1:1:Mon");
    ok(openMixed.pickedDrills.length === 2,
       "a drill with a log and a score appears once, not twice (" +
       openMixed.pickedDrills.length + " drills)");
    const fx = openMixed.pickedDrills.filter(d => d.what === "Find the mistake")[0];
    ok(fx && fx.noDetail === false, "and it is the detailed record that survives");
    ok(fx && (fx.rows||[]).length === 1, "with its question in it");

    /* A week whose ONLY evidence is a scored drill on a day that was never
     * closed out. `seen` decides whether the panel exists at all, so getting
     * this wrong loses the whole week, not one square. */
    const scoredOnly = {
      laLog: {}, stepDone: {}, excused: {},
      stepResult: {"y1:4:Wed:gz": {score:3, total:5, at:2000}},
      week: 4, year: "y1"
    };
    const sg = la.weekGlance(scoredOnly, {week:4});
    ok(!!sg, "a week evidenced only by a score still draws its panel");
    if(sg){
      const sc = ((sg.columns||[])[0]||{}).cells||[];
      ok(sc[2] && sc[2].id === "y1:4:Wed",
         "with that day clickable (" + ((sc[2]||{}).id||"none") + ")");
      ok(sc.every(c => c.status !== "red"),
         "and nothing turned red on the strength of a score alone");
      const openScored = app2.pickedDayVals(la, scoredOnly, null, "y1:4:Wed");
      ok(openScored.pickedDrills.length === 1, "opening it shows the drill");
      ok(openScored.pickedDrills[0].score === "3 of 5 correct", "with its score");
    }

    ok(/\{\{ c\.pick \}\}/.test(page), "the template wires the click");
    ok(/\{\{ p\.pickedDrills \}\}/.test(page), "and draws the opened day");
    ok(/\{\{ d\.noDetailNote \}\}/.test(page), "and prints the no-detail note");
  }
}

Promise.all(pending).then(()=>{
  console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
  process.exit(fails ? 1 : 0);
});
