/* Give every school day its own lesson.
 *
 * WHY. Week 1 of each mission authors a lesson per day. Every week after it
 * shares ONE method lesson across all five days — 285 of the 365 sets across both years (190 Year One, 175 Year Two). The questions differ every day (Monday multiplies by ten, Tuesday
 * divides, Wednesday does exponents) while the lesson above them did not move,
 * which reads exactly like a day that failed to load.
 *
 * WHAT THIS DOES. For every day with no lesson of its own, it writes one built
 * from that day's OWN material:
 *   - the title is the set's own title ("Divide by Ten"), not the week's
 *   - the worked examples are that day's actual questions, with that day's
 *     actual answers
 *   - the method framing comes from the week's lesson, so a day still sits
 *     inside the week's idea rather than contradicting it
 *
 * THE MATHS CANNOT BE WRONG, because none of it is invented: every number and
 * every answer is copied from the authored question bank. That is the whole
 * reason it is generated this way rather than written freehand.
 *
 * WHAT IT WILL NOT DO. It never overwrites a hand-authored lesson. The week-1
 * lessons are the best teaching in the course — dot diagrams, area models
 * built room by room — and nothing here can match them. They are left alone.
 *
 * Run: node scripts/gen-daily-lessons.js
 * Writes: curriculum/math-lessons-daily.js
 */
const fs = require("fs"), path = require("path");
const D = path.join(__dirname, "..", "curriculum") + "/";

global.window = global; window.__CURR = {};
window.Subjects = {register(){}, all:()=>[], get:()=>null, has:()=>false};
global.localStorage = {getItem:()=>null, setItem(){}, removeItem(){}};
global.document = {addEventListener(){}, removeEventListener(){}, createElement:()=>({style:{}})};
global.addEventListener = global.removeEventListener = function(){};
global.setInterval = ()=>0; global.clearInterval = ()=>{};
global.setTimeout = ()=>0; global.clearTimeout = ()=>{};
global.matchMedia = ()=>({matches:false, addEventListener(){}, removeEventListener(){}});
global.fetch = async()=>({ok:false, json:async()=>({})});
global.location = {search:"", href:""};

const page = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m => m[1])
  .forEach(m => { try { require(D + m + ".js"); } catch(e){} });

const C = window.__CURR, SEQ = C.MATH_SEQ;

/* HAND-AUTHORED ONLY — deliberately NOT ALL_LESSONS.
 *
 * ALL_LESSONS now includes this script's own previous output, so reading it
 * made the generator non-idempotent: the second run saw all 365 days as
 * "already authored", generated nothing, and wrote an EMPTY file over a good
 * one. Reading the authored sources directly means a re-run always reproduces
 * the same result, and the file can be regenerated safely at any time. */
const AUTHORED = Object.assign({},
  C.LESSONS, C.LESSONS_U2, C.LESSONS_U3, C.LESSONS_U4,
  C.LESSONS_U5, C.LESSONS_U6, C.LESSONS_U7, C.LESSONS_U8,
  C.LESSONS_Y5_U1, C.LESSONS_Y5_U2, C.LESSONS_Y5_U3, C.LESSONS_Y5_U4,
  C.LESSONS_Y5_U5, C.LESSONS_Y5_U6, C.LESSONS_Y5_U7, C.LESSONS_Y5_U8,
  /* The growing hand-authored tier counts as authored too. Without this, every
   * day given a real lesson still got a redundant floor entry generated for it
   * — harmless, because registry.js's override order wins, but it means the
   * generated file quietly carries dead weight that grows as authoring does. */
  C.LESSONS_AUTHORED);
const ALL_LESSONS = AUTHORED;
const weeklyFor = id => (C.LESSONS_WEEKLY || {})[String(id).replace(/p\d+$/, "")]
                     || (C.LESSONS_WEEKLY_Y5 || {})[String(id).replace(/p\d+$/, "")];

/* Text that has to survive being embedded in a single-quoted JS string. The
 * question bank contains apostrophes, × ÷ and superscripts; none of that is
 * escaped away, only the quote and backslash that would break the file. */
const esc = s => String(s == null ? "" : s).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

/* Pick the examples a lesson walks through.
 *
 * Core first — it is the day's actual new skill — then Warm-Up to fill, and
 * Challenge only if nothing else exists. Skips anything whose answer is not a
 * short literal (a written explanation, a list) because a walkthrough line
 * reading "= see working" teaches nothing. */
function examplesFor(set){
  const items = (set.items || []);
  const usable = it => {
    const a = Array.isArray(it.a) ? it.a[0] : it.a;
    const q = String(it.q || "").trim();
    if(!q || a == null) return false;
    const as = String(a).trim();
    return as.length > 0 && as.length <= 14 && q.length <= 60;
  };
  const byTier = t => items.filter(it => it.t === t && usable(it));
  const picked = [];
  [1, 0, 2].forEach(t => byTier(t).forEach(it => { if(picked.length < 3) picked.push(it); }));
  return picked.map(it => ({q: String(it.q).trim(),
                            a: String(Array.isArray(it.a) ? it.a[0] : it.a).trim()}));
}

/* Openers and closers rotate by the day's position so five consecutive days
 * do not read as five copies of one sentence. They are deliberately plain —
 * a generated line that tries to be charming ages badly next to the authored
 * lessons it sits beside. */
const OPENERS = [
  d => "Today is " + d + ". Here is the shape of it before you start.",
  d => d + " today. Three worked ones first, then the same move on new numbers.",
  d => "Today: " + d + ". Watch these three, then the practice below is the same idea.",
  d => d + ". Read the three examples, then go — the questions repeat the move.",
  d => "Today is " + d + ". Three to watch, then it is yours."
];
const CLOSERS = [
  "That is the whole move. Everything below is the same thing on different numbers.",
  "Same method every time. The numbers change, the move does not.",
  "That is today. If the practice below stops making sense, come back to these three.",
  "Nothing below is harder than these. It is the same step with new numbers.",
  "That is it. Work down the page — you have already seen how each one goes."
];
const LEAD = ["Start with one you can check.", "Now a second one.", "One more, then it is yours."];

/* THE MAGNITUDE BAR — the visual the authored lessons use, and the one this
 * generator dropped on its first pass.
 *
 * A worked line on its own is arithmetic; a bar whose WIDTH is the size of the
 * answer is the thing that makes place value visible. 0.42 renders as a sliver
 * beside empty space, 2400 as a long bar, and a child can see a hundredfold
 * jump instead of counting zeros. The weekly lessons this replaced carried one
 * on 82 of their 84 steps — losing them made every day past week 1 text-only,
 * which was reported as "the images are gone", and rightly.
 *
 * Width is logarithmic because the values span 0.007 to 70,000; linear would
 * make everything below a hundred invisible. Clamped so the smallest still
 * draws and the largest still fits. */
function barFor(answer){
  const raw = String(answer == null ? "" : answer).trim();
  if(!raw) return null;
  const n = Math.abs(parseFloat(raw.replace(/[^0-9.\-]/g, "")));
  /* A WORD ANSWER STILL HAS TO DRAW.
   *
   * Some days answer in words — "ten times", "the tenths". There is no
   * magnitude to scale, and returning null here left those days with a blank
   * visual pane, which is the very failure this bar exists to prevent. They
   * get a plain labelled card instead: no size claim, but something on screen. */
  if(!isFinite(n)){
    const lab = raw.slice(0, 18);
    return {cols:[{l:lab, s:18}], rows:[{l:"", s:4}], cells:[{v:lab}]};
  }
  const w = Math.max(3, Math.min(26, Math.round(4 + 5 * Math.log10(n + 1))));
  const label = String(answer);
  // A small value gets empty space beside it, so "small" reads as small rather
  // than as a short bar that fills its own box.
  return w < 10
    ? {cols: [{l: label, s: w}, {l: "", s: 26 - w}], rows: [{l: "", s: 4}],
       cells: [{v: label}, {v: ""}]}
    : {cols: [{l: label, s: w}], rows: [{l: "", s: 4}], cells: [{v: label}]};
}

function build(set, pos){
  const ex = examplesFor(set);
  if(!ex.length) return null;                    // nothing safe to walk through
  const weekly = weeklyFor(set.id);
  const dayTitle = (set.title || set.label || "Today's work").trim();
  /* THE FIRST STEP MUST DRAW.
   *
   * lstep defaults to 0, so step 1 is what a child sees the instant the lesson
   * opens. The first version made it a text-only welcome, which meant every
   * day past week 1 opened on an empty visual pane — reported, repeatedly and
   * correctly, as "no images". The bars were there; they were one click away
   * behind a blank slide. Week 1's authored lessons open on a dot diagram or
   * an area model, which is why only the later weeks looked broken.
   *
   * So the opener carries the day's first answer, and the closer carries its
   * last. Nothing in this file may ship a blank first step. */
  const openBar = barFor(ex[0].a);
  const openStep = {cap: OPENERS[pos % OPENERS.length](dayTitle)};
  if(openBar) Object.assign(openStep, openBar);
  const steps = [openStep];
  if(weekly && weekly.title){
    const methodStep = {cap: "The method is the week's: " + weekly.title.replace(/\.$/, "") + "."};
    const mb = barFor(ex[Math.min(1, ex.length - 1)].a);
    if(mb) Object.assign(methodStep, mb);
    steps.push(methodStep);
  }
  ex.forEach((e, i) => {
    const step = {cap: LEAD[i] || "Another.", sum: e.q + " = " + e.a};
    const bar = barFor(e.a);
    if(bar) Object.assign(step, bar);         // the answer, drawn to scale
    steps.push(step);
  });
  const closeStep = {cap: CLOSERS[pos % CLOSERS.length]};
  const cb = barFor(ex[ex.length - 1].a);
  if(cb) Object.assign(closeStep, cb);
  steps.push(closeStep);
  return {title: dayTitle,
          sub: (weekly && weekly.sub) ? weekly.sub : "",
          steps: steps};
}

const sets = (C.ALL_SETS || []).concat(C.ALL_SETS_Y5 || []);
const seen = {};
const out = {};
let skippedAuthored = 0, skippedNoExamples = 0;

sets.forEach(set => {
  if(!set || !set.id || seen[set.id]) return;
  seen[set.id] = 1;
  if(ALL_LESSONS[set.id]) { skippedAuthored++; return; }   // never overwrite authoring
  const p = SEQ.parseId(set.id);
  const lesson = build(set, p ? p.d : 0);
  if(!lesson) { skippedNoExamples++; return; }
  out[set.id] = lesson;
});

const ids = Object.keys(out).sort();
const body = ids.map(id => {
  const L = out[id];
  /* Write EVERY field the step carries. The first version emitted only cap and
   * sum, so the magnitude bars were computed and then silently thrown away —
   * the generated file had no visuals at all and every day past week 1 came
   * out text-only. A serialiser that knows a fixed list of keys will drop the
   * next field added too, so this walks what is actually there. */
  const lit = v => typeof v === "number" ? String(v) : '"' + esc(v) + '"';
  const cellList = a => "[" + (a || []).map(c =>
      "{" + Object.keys(c).map(k => k + ":" + lit(c[k])).join(",") + "}").join(",") + "]";
  const steps = L.steps.map(s => {
    const parts = ['cap:"' + esc(s.cap) + '"'];
    if(s.sum)   parts.push('sum:"' + esc(s.sum) + '"');
    if(s.cols)  parts.push("cols:" + cellList(s.cols));
    if(s.rows)  parts.push("rows:" + cellList(s.rows));
    if(s.cells) parts.push("cells:" + cellList(s.cells));
    return "    {" + parts.join(",") + "}";
  }).join(",\n");
  return '  "' + id + '":{title:"' + esc(L.title) + '",sub:"' + esc(L.sub) + '",steps:[\n'
       + steps + "\n  ]}";
}).join(",\n");

const file = `/* ============================================================================
 * MATH — A LESSON FOR EVERY DAY   (generated; see scripts/gen-daily-lessons.js)
 * ----------------------------------------------------------------------------
 * Week 1 of each mission has a hand-authored lesson per day. Every week after
 * it shared ONE method lesson across all five days, so stepping from 2.2 to
 * 2.3 changed every question on the page while the lesson above them did not
 * move — which reads exactly like a day that failed to load, and was reported
 * as one.
 *
 * 285 sets across the two years (190 Year One, 175 Year Two) were affected.
 *
 * These fill that gap. Each is built from its OWN day: the set's own title,
 * and three worked examples taken verbatim from that day's questions with
 * that day's answers, each drawn as a magnitude bar so the size of the\n * answer is visible and not merely stated. No arithmetic here was invented — it is copied from the
 * authored bank — so a generated lesson cannot teach a wrong sum.
 *
 * They are deliberately plainer than the hand-authored ones, which use dot
 * diagrams and area models built room by room. These are a floor, not a
 * ceiling: authoring a real lesson for any day simply overrides the entry
 * here, because lessonFor checks ALL_LESSONS first.
 *
 * DO NOT EDIT BY HAND — regenerate with:  node scripts/gen-daily-lessons.js
 * ${ids.length} lessons.
 * ==========================================================================*/
const LESSONS_DAILY = {
${body}
};

window.__CURR = window.__CURR || {};
window.__CURR.LESSONS_DAILY = LESSONS_DAILY;
`;

fs.writeFileSync(path.join(D, "math-lessons-daily.js"), file);

console.log("  days examined        : " + Object.keys(seen).length);
console.log("  already hand-authored: " + skippedAuthored + "  (left untouched)");
console.log("  no usable examples   : " + skippedNoExamples);
console.log("  lessons generated    : " + ids.length);
console.log("  -> curriculum/math-lessons-daily.js");
