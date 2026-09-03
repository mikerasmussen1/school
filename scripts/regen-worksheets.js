#!/usr/bin/env node
/*
 * Rewrite the printed worksheets so they match the app's bank again.
 *   node scripts/regen-worksheets.js          report what would change
 *   node scripts/regen-worksheets.js --write  apply it
 *
 * WHY THIS EXISTS
 * A printed sheet numbers its problems by walking a set's items — deduped by
 * question text, grouped Warm-Up then Core then Challenge, in array order.
 * Move one item between tiers and every problem after it renumbers. The
 * worksheets hardcode their problems and do not read the curriculum, so they
 * do not follow, and the app then maps a printed number onto a different
 * question. Scanned homework is graded on that number, so the child is marked
 * against work they were never asked to do.
 *
 * That is exactly what a grade-alignment pass across the banks did: ~1,300
 * items changed tier and 135 of 268 pages drifted. Rewriting the sheets by hand
 * is both enormous and the wrong shape of job — the curriculum is the source
 * of truth and the sheet is the artifact, so the artifact should be generated.
 *
 * ON SHARING CODE WITH THE CHECKER, and its cost. The ordering, loader and
 * id-resolver are copied from check-paper-mapping.js rather than re-derived,
 * so the two cannot disagree about the contract. That is worth having, but it
 * is not free and it bit hard once: both files matched only the Warm-Up number
 * style, so this script rewrote a third of every page, left Core and Challenge
 * stale, and the checker reported all 268 pages clean. Agreement is not
 * correctness — two programs sharing a blind spot agree perfectly. Anything
 * genuinely load-bearing here deserves an INDEPENDENT reading, not a re-run.
 *
 * Only the question TEXT of an existing numbered problem is ever replaced; the
 * surrounding markup, the numbering, and the number of problems on a page are
 * left exactly as they are.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);
const WRITE = process.argv.includes("--write");

// ── the app's ordering, mirrored from index.html pOnPaper ────────────────
function sheetFor(set) {
  const seen = new Set(), uniq = [];
  set.items.forEach((it, i) => {
    const q = String(it.q).replace(/\s+/g, "").toLowerCase();
    if (seen.has(q)) return;
    seen.add(q); uniq.push({ it, i });
  });
  const sheet = [];
  [0, 1, 2].forEach(t => uniq.forEach(x => { if (x.it.t === t) sheet.push({ n: sheet.length + 1, q: x.it.q }); }));
  return sheet;
}

// ── load the curriculum the way the browser does ─────────────────────────
const sb = { __CURR: {} }; sb.window = sb;
sb.Subjects = { register() {}, all: () => [], get: () => null };
const indexHtml = fs.readFileSync("index.html", "utf8");
const curriculumFiles = [...indexHtml.matchAll(/<script src="([^"]+)"/g)]
  .map(m => m[1].replace(/^\.\//, "").split("?")[0])
  .filter(f => /^curriculum\//.test(f));
for (const f of curriculumFiles) {
  new Function("window", "console", fs.readFileSync(f, "utf8"))(sb, { log() {}, warn() {}, error() {} });
}

const byId = new Map();
for (const s of sb.__CURR.ALL_SETS || []) byId.set(s.id, s);
function resolve(file, label) {
  const m = label.match(/^(\d+)\.(\d+)/);
  if (!m) return null;
  const week = +m[1], page = +m[2];
  const u = (file.match(/Unit (\d+)/) || [])[1];
  if (!u) return null;
  const unit = +u, y2 = /^Y2 /.test(file);
  const cands = y2
    ? [week === 1 ? `y5u${unit}p${page}` : null, `y5u${unit}w${week}p${page}`]
    : [week === 1 && unit === 1 ? `p${page}` : null,
       week === 1 ? `u${unit}p${page}` : null, `u${unit}w${week}p${page}`];
  for (const c of cands) if (c && byId.has(c)) return byId.get(c);
  return null;
}

// Printed pages carry HTML entities; the checker decodes before comparing, so
// encode on the way back out or a question containing & or < breaks the page.
// Numbered problems appear in THREE styles, one per tier, and matching only
// the first is how a generator and a checker sharing this regex both went
// blind to two thirds of every page:
//   Warm-Up   font-size:9.5px   ">1</span>"    no trailing dot
//   Core      font-size:10px    ">13.</span>"  trailing dot, hint span after
//   Challenge font-size:10.5px  ">25.</span>"  trailing dot
// The question runs from &nbsp; to the next tag, which stops before Core's
// hint span and before the dotted answer rule.
const PROBLEM_RX = /font-size:(?:9\.5|10|10\.5)px[^>]*>(\d+)\.?<\/span>(&nbsp;\s*)([^<]*)/g;

const enc = s => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

let files = 0, pages = 0, changed = 0, unresolved = [], shortfall = [];
for (const file of fs.readdirSync(".").filter(f => /Worksheets\.dc\.html$/.test(f))) {
  const html = fs.readFileSync(file, "utf8");
  // Walk section by section so a problem is only ever rewritten with the
  // question from ITS OWN set.
  const parts = html.split(/(?=<section class="page")/);
  let touched = 0;
  const out = parts.map(sec => {
    const label = (sec.match(/data-screen-label="([^"]*)"/) || [])[1];
    if (!label) return sec;
    const set = resolve(file, label);
    if (!set) { unresolved.push(`${file}: "${label}"`); return sec; }
    const expect = sheetFor(set);
    pages++;
    let seen = 0;
    const rewritten = sec.replace(PROBLEM_RX, (whole, num, gap, body) => {
      seen++;
      const want = expect[+num - 1];
      if (!want) return whole;                 // printed past the bank: leave alone
      const encoded = enc(want.q);
      if (body.trim() === encoded.trim()) return whole;
      touched++;
      return whole.slice(0, whole.length - body.length) + encoded;
    });
    /* A styling change must never be able to narrow this silently again: the
     * previous version of this script matched only the Warm-Up number style,
     * so it rewrote a third of each page, left Core and Challenge stale, and
     * the checker — sharing the same regex — reported every page clean.
     *
     * Reverse sides carry the tail of a set and legitimately hold only a few
     * problems, so they are exempt; asserting on them would make this fire on
     * every run and teach whoever sees it to ignore the warning. */
    const isBack = /·\s*back\s*$/i.test(label) || /key\s*$/i.test(label);
    if (!isBack && seen && seen < Math.min(expect.length, 12)) {
      shortfall.push(`${file} · ${label}: matched ${seen} problems, expected at least ${Math.min(expect.length, 12)}`);
    }
    return rewritten;
  }).join("");
  if (touched) {
    changed += touched; files++;
    if (WRITE) fs.writeFileSync(file, out);
    console.log(`  ${WRITE ? "rewrote" : "would rewrite"} ${String(touched).padStart(4)} problems in ${file}`);
  }
}
console.log(`\n  ${pages} pages scanned, ${changed} problems ${WRITE ? "rewritten" : "to rewrite"} across ${files} files`);
if (unresolved.length) console.log(`  unresolved labels (left untouched): ${unresolved.length}`);
if (shortfall.length) { console.log(`\n  COVERAGE SHORTFALL on ${shortfall.length} page(s):`);
  shortfall.slice(0,6).forEach(s => console.log("    "+s)); process.exitCode = 1; }
if (!WRITE) console.log("  re-run with --write to apply");
