/* Maths — do the lessons actually DRAW?
 *
 * The test that was missing. Everything else written for the lesson work
 * greps index.html as text: it can confirm a string exists in the source and
 * cannot confirm the app puts a single pixel on screen. Six rounds of "still
 * no images" passed 158 green checks, because none of them asked this.
 *
 * This one loads the real curriculum, resolves the real lesson for every real
 * day, and runs the view's own arithmetic over it.
 *
 * Run: node tests/lesson-visuals.js
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), D = ROOT + "/curriculum/";

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

const page = fs.readFileSync(ROOT + "/index.html", "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m => m[1])
  .forEach(m => { try { require(D + m + ".js"); } catch(e){} });

const C = window.__CURR, V = C.LESSON_VIEW, SEQ = C.MATH_SEQ, lessonFor = C.lessonFor;

let fails = 0, checks = 0;
const ok = (c, what) => { checks++; if(!c){ console.log("  FAIL  " + what); fails++; } };

console.log("the module is wired");
ok(!!V, "LESSON_VIEW is loaded");
ok(/<script src="\.\/curriculum\/lesson-view\.js/.test(page), "index.html loads it");
if(!V){ console.log("\nCANNOT CONTINUE"); process.exit(1); }

/* ── the bug that took six rounds ─────────────────────────────────────────
 * lstep defaults to 0. A lesson whose FIRST step draws nothing opens on an
 * empty pane, which is indistinguishable from broken however good step 2 is.
 * Week 1's authored lessons open on a dot diagram, which is exactly why only
 * the later weeks were reported. */
/* ── the module must be the ONE copy, not a second one ────────────────────
 * This shipped once as a COPY: learnVals() kept its own inlined version of the
 * same arithmetic while this module sat beside it, exercised only by tests. A
 * test over a shadow implementation is worse than no test — it stays green
 * while production ships a blank diagram, which is the precise failure the
 * module exists to prevent. Review caught it; this keeps it caught. */
console.log("production uses the module, not a copy of it");
{
  ok(/LESSON_VIEW/.test(page), "index.html references LESSON_VIEW");
  /* Scope to learnVals itself. A fixed character window overran into the next
   * method and counted its arithmetic too. */
  const start = page.indexOf("  learnVals(){");
  const after = page.slice(start + 10);
  const end = start + 10 + after.search(/\n  [a-zA-Z_$]+\s*[=(]/);
  const lv = page.slice(start, end);

  ok(/LV\.unitFor\(/.test(lv), "learnVals asks the module for the unit square");

  /* The unit formula is the one that divides the available width by the widest
   * step. Naming it by SHAPE rather than by variable name catches a re-inline
   * however it spells its locals — an earlier guard keyed to `avail/maxC` would
   * have missed the fallback's own `av/mC`. One occurrence is expected: the
   * module-failed-to-load fallback. Two means it was copied back in.
   * (19 also appears here as a font-size cap, which is a different thing and
   * must not be counted.) */
  const unitFormula = (lv.match(/Math\.min\(19\s*,[^;]*?\/\s*m(?:ax)?C\b/g) || []).length;
  ok(unitFormula <= 1,
     "the unit maths appears at most once — the dead-load fallback (" + unitFormula + " found)");
}

console.log("no lesson opens on a blank frame");
{
  const blank = [], allBlank = [];
  (C.ALL_SETS || []).forEach(s => {
    const L = lessonFor(s.id); if(!L) return;
    const v = V.lessonVisuals(L);
    if(v.allBlank) allBlank.push(s.id);
    else if(v.opensBlank) blank.push(s.id);
  });
  ok(blank.length === 0,
     "every lesson draws on its first step" + (blank.length ? " — " + blank.length + " do not: " + blank.slice(0,6).join(", ") : ""));
  ok(allBlank.length === 0,
     "and none is blank throughout" + (allBlank.length ? " — " + allBlank.length + ": " + allBlank.slice(0,6).join(", ") : ""));
}

console.log("every day draws something");
{
  let drew = 0, total = 0; const none = [];
  (C.ALL_SETS || []).forEach(s => {
    const L = lessonFor(s.id); if(!L) return; total++;
    const v = V.lessonVisuals(L);
    if(v.drawing > 0) drew++; else none.push(s.id);
  });
  ok(total > 350, "all " + total + " days resolve a lesson");
  ok(drew / total > 0.95,
     drew + " of " + total + " days draw something" + (none.length ? " — not: " + none.slice(0,5).join(", ") : ""));
}

/* ── the geometry has to be real, not merely present ────────────────────── */
console.log("the diagrams have real size");
{
  const tiny = [];
  (C.ALL_SETS || []).forEach(s => {
    const L = lessonFor(s.id); if(!L) return;
    V.lessonVisuals(L).steps.forEach((v, i) => {
      if(v.kind === "rooms" && v.cells > 0 && (v.w < 20 || v.h < 10)) tiny.push(s.id + " step" + (i+1) + " " + Math.round(v.w) + "x" + Math.round(v.h));
    });
  });
  ok(tiny.length < 20,
     "diagrams are big enough to see" + (tiny.length ? " — " + tiny.length + " are not, e.g. " + tiny.slice(0,4).join(", ") : ""));

  // A narrow phone must not collapse them.
  const L = lessonFor("y5u1w2p2");
  const narrow = V.lessonVisuals(L, 320);
  ok(!narrow.opensBlank, "still draws on a 320px screen");
  ok(narrow.steps[0].w > 50, "and the diagram keeps real width there (" + Math.round(narrow.steps[0].w) + "px)");
}

/* ── the whole point: one lesson per day, and each draws its own ────────── */
console.log("a week's days differ");
{
  const weeks = {};
  (C.ALL_SETS || []).forEach(s => {
    const p = SEQ.parseId(s.id); if(!p) return;
    const L = lessonFor(s.id); if(!L) return;
    const k = p.y + "u" + p.u + "w" + p.w;
    (weeks[k] = weeks[k] || []).push(L.title);
  });
  const shared = Object.keys(weeks).filter(k => weeks[k].length > 1 && new Set(weeks[k]).size === 1);
  ok(shared.length === 0,
     "no week serves one lesson to all its days" + (shared.length ? " — " + shared.length + " still do" : ""));
}

/* ── the cache token must match the content it stamps ────────────────────
 * Hand-typed tokens went stale: registry.js changed without a bump, browsers
 * kept the old copy, and every fix after it was invisible. The token is a hash
 * of the curriculum now, so a stale one means somebody edited a file and did
 * not re-stamp. */
console.log("the cache token matches the files");
{
  const crypto = require("crypto");
  const files = [...new Set([...page.matchAll(/curriculum\/([^"?]+\.js)/g)].map(m => m[1]))].sort();
  const h = crypto.createHash("sha1");
  files.forEach(f => { try { h.update(f); h.update(fs.readFileSync(D + f)); } catch(e){} });
  const want = h.digest("hex").slice(0, 12);
  const seen = [...new Set([...page.matchAll(/curriculum\/[^"?]+\.js\?v=([^"]+)/g)].map(m => m[1]))];
  ok(seen.length === 1, "one token across every curriculum script (" + seen.length + ")");
  ok(seen[0] === want,
     "and it matches the current content — run scripts/stamp-version.js" +
     (seen[0] === want ? "" : " (have " + seen[0] + ", want " + want + ")"));
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
