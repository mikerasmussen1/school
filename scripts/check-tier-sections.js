#!/usr/bin/env node
/*
 * Does each printed problem sit under the SECTION that matches its tier?
 *
 *   node scripts/check-tier-sections.js          report
 *   node scripts/check-tier-sections.js --strict  exit 1 on any misplacement
 *
 * WHY THIS EXISTS, AND WHY IT DOES NOT SHARE CODE WITH THE OTHERS
 * check-paper-mapping.js asks "is the text at printed position N the question
 * the bank puts at position N?" That is necessary and it is not sufficient,
 * because it says nothing about which BOX position N is printed in. A worksheet
 * page is three labelled sections — "Warm-Up · recall", "Core GRADED · SHOW
 * YOUR WORKING · STOP RULE", and "Challenge · NOT GRADED" — and those sections
 * are static markup. regen-worksheets.js only replaces question TEXT inside
 * them; it never resizes them. So the moment a set's tier COMPOSITION changes,
 * the text slides across section boundaries and the labels start lying, while
 * both existing checkers stay green.
 *
 * That is not hypothetical. Moving 34 items out of Core in Mission 01 left the
 * printed day-4 sheet showing 36 x 25, 47 x 32 and 58 x 46 under "Core GRADED",
 * which are the exact grade-4 items the change existed to stop grading, and put
 * the new on-grade Core work in the Warm-Up grid. On screen it was right; on
 * paper it was inverted.
 *
 * The two existing tools could not catch it because they rebuild the same
 * tier-ordered array the generator used and compare against it — a shared blind
 * spot agrees with itself. So this reads the tier a DIFFERENT way: off the
 * printed page's own styling, which is the contract CONTRIBUTING.md states and
 * which a human reading the sheet actually sees.
 *
 *   Warm-Up    font-size:9.5px,  no trailing dot
 *   Core       font-size:10px,   trailing dot
 *   Challenge  font-size:10.5px, trailing dot
 *
 * It then asks the curriculum what tier that item really is. Any disagreement
 * means the printed page is telling a child something the app does not.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

/* Now a gate, not a ratchet. This started at 674 — 400 of them Challenge work
 * printed under a GRADED banner — because the sheets were authored once against
 * a tier composition that had since moved, and the generator only ever replaced
 * text inside boxes that never resized. rebuild-worksheets.js re-emits the
 * sections themselves, which took it to zero, so zero is now the standard: any
 * problem printed under the wrong heading fails the build. */
const BASELINE = 0;
const STRICT = process.argv.includes("--strict");
const SIZE_TIER = { "9.5": 0, "10": 1, "10.5": 2 };
const NAME = ["Warm-Up", "Core", "Challenge"];

// ── load the curriculum the way the browser does ────────────────────────
function loadCurriculum() {
  const ctx = {
    console: { log(){}, warn(){}, error(){} }, setTimeout,
    document: { querySelector: () => null, createElement: () => ({}), addEventListener(){}, head: { appendChild(){} } },
    localStorage: { getItem: () => null, setItem(){} },
    fetch: () => Promise.reject(new Error("no net")),
  };
  ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
  vm.createContext(ctx);
  const order = fs.readFileSync("index.html", "utf8")
    .match(/curriculum\/[a-z0-9-]*\.js/g).map(s => s.split("/")[1])
    .filter((v, i, a) => a.indexOf(v) === i);
  for (const f of order) {
    try { vm.runInContext(fs.readFileSync(path.join("curriculum", f), "utf8"), ctx, { filename: f }); }
    catch (e) { console.error(`  could not load curriculum/${f}: ${e.message}`); process.exit(2); }
  }
  return ctx.window.__CURR || {};
}
const C = loadCurriculum();

const dec = s => String(s).replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/&minus;/g, "−").replace(/&times;/g, "×").replace(/&divide;/g, "÷").trim();

/* Every set, keyed by id AND by title. ALL_SETS already holds both years once
 * registry.js has run; EXTRA carries the weeks-2-onward banks keyed by set id.
 * A title that is not unique is dropped rather than guessed at: "Mission 07
 * Test" is two different sets, and resolving to the wrong one would report
 * confident nonsense. */
const byId = {}, byTitle = {};
const add = s => {
  if (!s || !s.id) return;
  byId[s.id] = s;
  const t = String(s.title || s.label || "").trim();
  if (!t) return;
  byTitle[t] = byTitle[t] === undefined ? s : null;      // null marks ambiguous
};
(C.ALL_SETS || []).forEach(add);
Object.entries(C.EXTRA || {}).forEach(([id, items]) => {
  if (!Array.isArray(items)) return;
  if (byId[id]) byId[id] = { ...byId[id], items: (byId[id].items || []).concat(items) };
  else byId[id] = { id, items };
});

/* Resolve a page label to its set the same way check-paper-mapping.js does.
 * Sharing THIS is deliberate and safe: the independence this file exists for is
 * in how it reads the TIER (off the printed styling, not off a rebuilt array).
 * Re-deriving set resolution as well would only add a way to be wrong. */
function resolve(file, label) {
  const m = label.match(/^(\d+)\.(\d+)/);
  const u = (file.match(/Unit (\d+)/) || [])[1];
  if (!u) return null;
  const unit = +u, y2 = /^Y2 /.test(file);
  if (m) {
    const week = +m[1], page = +m[2];
    const cands = y2
      ? [week === 1 ? `y5u${unit}p${page}` : null, `y5u${unit}w${week}p${page}`]
      : [week === 1 && unit === 1 ? `p${page}` : null,
         week === 1 ? `u${unit}p${page}` : null, `u${unit}w${week}p${page}`];
    for (const c of cands) if (c && byId[c]) return byId[c];
  }
  // Tests, quizzes and duels carry a title instead of "N.N".
  const t = dec(label).replace(/\s*·\s*back$/i, "").replace(/^[\d.]+\s*[·-]?\s*/, "").trim();
  const hit = byTitle[t];
  return hit || null;                                    // null also covers ambiguous
}

/* The printed order: dedupe by question text in bank order, then group
 * Warm-Up, Core, Challenge. Stated in CONTRIBUTING.md. Written out here rather
 * than imported so that a change to the generator's copy cannot silently move
 * this checker with it — the point of this file is to disagree when they drift.
 */
function printedOrder(set) {
  const seen = new Set(), uniq = [];
  (set.items || []).forEach(it => {
    const k = String(it.q).replace(/\s+/g, "").toLowerCase();
    if (seen.has(k)) return;
    seen.add(k); uniq.push(it);
  });
  const out = [];
  [0, 1, 2].forEach(t => uniq.forEach(it => { if (it.t === t) out.push(it); }));
  return out;                                            // index 0 == printed #1
}

let pages = 0, checked = 0, bad = [], unresolved = 0;
for (const file of fs.readdirSync(".").filter(f => /Worksheets\.dc\.html$/.test(f))) {
  const html = fs.readFileSync(file, "utf8");
  for (const sec of html.split(/(?=<section class="page")/)) {
    const label = (sec.match(/data-screen-label="([^"]*)"/) || [])[1];
    if (!label) continue;
    // "1.4 The Four Rooms" -> try the title half, then the whole label
    const set = resolve(file, label);
    if (!set) { unresolved++; continue; }
    pages++;
    const order = printedOrder(set);
    for (const m of sec.matchAll(/font-size:(9\.5|10|10\.5)px[^>]*>(\d+)\.?<\/span>/g)) {
      const printedTier = SIZE_TIER[m[1]];
      const n = +m[2];
      const item = order[n - 1];
      if (!item) continue;                                // printed past the bank
      checked++;
      if (item.t !== printedTier)
        bad.push({ file, label, n, printed: printedTier, real: item.t, q: String(item.q).slice(0, 44) });
    }
  }
}

console.log(`tier-section check: ${pages} pages, ${checked} printed problems`);
if (unresolved) console.log(`  ${unresolved} pages could not be resolved to a set (not checked)`);
if (!checked) {
  // A checker that verifies nothing must never report success. This file was
  // green on its first run precisely because it resolved zero pages.
  console.error("  FAIL  resolved no pages at all — this check verified nothing\n");
  process.exit(2);
}
if (!bad.length) {
  console.log("  every printed problem sits under the section matching its tier\n");
  process.exit(0);
}

// The harmful direction is singled out: a Challenge item printed under a
// heading that says GRADED tells a child to hand in work that is not scored,
// and on the day this was written those were the grade-4 items.
const graded = bad.filter(b => b.real === 2 && b.printed < 2);
const bySet = {};
bad.forEach(b => { (bySet[`${b.file} · ${b.label}`] = bySet[`${b.file} · ${b.label}`] || []).push(b); });
console.log(`  MISPLACED: ${bad.length} problems across ${Object.keys(bySet).length} pages`);
console.log(`  of those, ${graded.length} are Challenge items printed under a GRADED heading:`);
graded.slice(0, 12).forEach(b =>
  console.log(`     ${b.file} · ${b.label}  #${b.n} "${b.q}" printed as ${NAME[b.printed]}, really ${NAME[b.real]}`));
if (graded.length > 12) console.log(`     … +${graded.length - 12} more`);
console.log();
if (bad.length > BASELINE) {
  console.error(`  FAIL  ${bad.length} misplaced, above the baseline of ${BASELINE} — this change made it worse.`);
  console.error("        Fix the new ones, or lower nothing: the baseline only ever goes down.\n");
  process.exit(1);
}
console.log(`  baseline is ${BASELINE}; this run is ${bad.length}${bad.length < BASELINE ? " — better, lower BASELINE" : ", unchanged"}`);
console.log("  The sheets\' section boxes are static markup; regen-worksheets.js");
console.log("  replaces the text inside them but never resizes them. Until it");
console.log("  rebuilds page structure, a set whose tier composition changed");
console.log("  prints its tiers under the wrong headings.\n");
process.exit(STRICT && bad.length ? 1 : 0);
