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
 * items changed tier and 68 of 268 pages drifted. Rewriting the sheets by hand
 * is both enormous and the wrong shape of job — the curriculum is the source
 * of truth and the sheet is the artifact, so the artifact should be generated.
 *
 * The ordering below is deliberately COPIED from check-paper-mapping.js rather
 * than re-derived, and the loader and id-resolver likewise, so a change to the
 * contract cannot leave the generator and the checker disagreeing about it.
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
const enc = s => String(s)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

let files = 0, pages = 0, changed = 0, unresolved = [];
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
    return sec.replace(
      /(font-size:9\.5px[^>]*>(\d+)<\/span>&nbsp;\s*)([\s\S]{0,220}?)(<\/div>)/g,
      (whole, head, num, body, tail) => {
        const want = expect[+num - 1];
        if (!want) return whole;                 // printed past the bank: leave alone
        const encoded = enc(want.q);
        if (body.trim() === encoded.trim()) return whole;
        touched++;
        return head + encoded + tail;
      });
  }).join("");
  if (touched) {
    changed += touched; files++;
    if (WRITE) fs.writeFileSync(file, out);
    console.log(`  ${WRITE ? "rewrote" : "would rewrite"} ${String(touched).padStart(4)} problems in ${file}`);
  }
}
console.log(`\n  ${pages} pages scanned, ${changed} problems ${WRITE ? "rewritten" : "to rewrite"} across ${files} files`);
if (unresolved.length) console.log(`  unresolved labels (left untouched): ${unresolved.length}`);
if (!WRITE) console.log("  re-run with --write to apply");
