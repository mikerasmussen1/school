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

/* SUPERSEDED by scripts/rebuild-worksheets.js — do not run this to write.
 *
 * This script replaces the question TEXT at each printed position and leaves
 * the sections themselves alone, which is the whole reason 400 Challenge
 * problems ended up printing under a GRADED heading: when a set's tier
 * composition changed, the text slid across section boundaries that never
 * moved. rebuild-worksheets.js re-emits the sections from the bank instead.
 *
 * It is disarmed rather than deleted because its comments record how the
 * paper-to-app numbering contract works and what has gone wrong under it
 * before. Left runnable it would actively undo the fix: its answer-key pass
 * rebuilds every range from a tier's FULL item list, so it would restore keys
 * listing 26 Challenge answers against a sheet that prints 12.
 */
if (process.argv.includes("--write")) {
  console.error("regen-worksheets.js is superseded by rebuild-worksheets.js and will not write.");
  console.error("Run: node scripts/rebuild-worksheets.js --write");
  process.exit(2);
}


// ── the app's ordering, mirrored from index.html pOnPaper ────────────────
function sheetFor(set) {
  const seen = new Set(), uniq = [];
  set.items.forEach((it, i) => {
    const q = String(it.q).replace(/\s+/g, "").toLowerCase();
    if (seen.has(q)) return;
    seen.add(q); uniq.push({ it, i });
  });
  const sheet = [];
  [0, 1, 2].forEach(t => uniq.forEach(x => {
    if (x.it.t === t) sheet.push({ n: sheet.length + 1, q: x.it.q, it: x.it });
  }));
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

/* Pages whose label is not "N.N Something" — the Friday tests, the mid-unit
 * quizzes, the Thursday error-journal sweeps, the enrichment duels — were
 * skipped entirely by the id-pattern resolver, so they were never regenerated
 * AND never checked. That is the same shape of hole as the tier regex: a whole
 * class of page quietly outside the tooling. These carry the tests, which are
 * the worst pages to mis-map.
 *
 * So when the id pattern does not match, fall back to matching the page title
 * against the set title inside the same unit. "· back" is a reverse side of the
 * page before it and resolves to the same set — the numbering continues across
 * the two sides. */
const deent = s => String(s).replace(/&amp;/g, "&").replace(/&nbsp;/g, " ")
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
function resolveByTitle(file, label) {
  const u = (file.match(/Unit (\d+)/) || [])[1];
  if (!u) return null;
  const unit = +u, y2 = /^Y2 /.test(file);
  const want = deent(label)
    .replace(/^(Mon|Tue|Wed|Thu|Fri)\s+/i, "")
    .replace(/\s*·\s*back\s*$/i, "")
    .toLowerCase();
  if (!want) return null;
  /* Titles are NOT unique inside a unit — "Mission 07 Test" is both u7w3p5 and
   * u7w5p5, and "Chance as a Number" is both u7p4 and u7w2p4. Silently taking
   * the first match would write one set's questions onto the other's page,
   * which is the failure this whole exercise exists to prevent. So an
   * ambiguous title resolves to nothing and the page is left alone and
   * reported, rather than being confidently rewritten with the wrong content. */
  const pre = y2 ? `y5u${unit}` : `u${unit}`;
  const hits = (sb.__CURR.ALL_SETS || []).filter(s => {
    const id = String(s.id);
    return id.startsWith(pre) && y2 === id.startsWith("y5")
      && deent(s.title || "").toLowerCase() === want;
  });
  return hits.length === 1 ? hits[0] : null;
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


/* ── teacher answer keys ────────────────────────────────────────────────
 * The "Week N key" pages are what a parent actually marks against, and they
 * were outside BOTH scripts: resolve() never matched their label, and the
 * numbered-problem regex never matched their shape. So while the worksheet
 * bodies were being corrected, all 71 keys still listed the pre-retiering
 * answers — a parent checking problem 1 would look for "3" where the printed
 * question now answers 500. That is the third time a page type has been
 * silently outside the tooling, so this rewrites them from the same sheetFor()
 * the worksheets and the app use, and asserts it found every block it expected.
 *
 * A key block is one set: a "1.1 · Title" heading, an "out of N" count, then
 * one row per tier reading "Warm-Up · 1–12 · " followed by pipe-separated
 * answers. Ranges move when tiers move, so they are rewritten too. */
function regenKeys(file, html) {
  let blocks = 0, rewritten = 0;
  const out = html.replace(
    /(font-size:16px">)(\d+\.\d+) · ([^<]*)(<\/div><div style="[^"]*">out of )(\d+)(<\/div><\/div>)([\s\S]{0,4000}?)(<\/div><\/div>)/g,
    (whole, h1, label, title, mid, oldTotal, h2, rows, tail) => {
      const set = resolve(file, label + " " + title) || resolveByTitle(file, label + " " + title);
      if (!set) return whole;
      blocks++;
      const sheet = sheetFor(set);                       // [{n,q}] in printed order
      /* Read the tier and answer off the item carried through sheetFor, not
       * by looking the question text up again: a question that appears twice
       * in a set would otherwise resolve to whichever copy came first, which
       * is how 72 key rows came out wrong on the previous attempt. */
      const ans = x => String(x.it && x.it.a != null ? x.it.a : "");
      const band = t => sheet.filter(x => x.it && x.it.t === t);
      const NAMES = [["Warm-Up", 0], ["Core", 1], ["Challenge", 2]];
      let newRows = rows, changed = false;
      for (const [name, t] of NAMES) {
        const b = band(t);
        const rx = new RegExp('(>' + name + ' · )[\\d–-]+( · <\\/span>)([^<]*)');
        const m = newRows.match(rx);
        if (!m) continue;
        const range = b.length ? `${b[0].n}–${b[b.length - 1].n}` : "—";
        const body = b.map(ans).join(" &nbsp;|&nbsp; ");
        const repl = m[1] + range + m[2] + body;
        if (m[0] !== repl) changed = true;
        newRows = newRows.replace(rx, repl);
      }
      // "out of N" counts the Warm-Up and Core a child is scored on.
      const scored = band(0).length + band(1).length;
      const total = String(scored);
      if (total !== oldTotal) changed = true;
      if (changed) rewritten++;
      return h1 + label + " · " + title + mid + total + h2 + newRows + tail;
    });
  return { out, blocks, rewritten };
}

let files = 0, pages = 0, changed = 0, unresolved = [], shortfall = [], keyBlocks = 0, keyRewritten = 0;
for (const file of fs.readdirSync(".").filter(f => /Worksheets\.dc\.html$/.test(f))) {
  const html = fs.readFileSync(file, "utf8");
  // Walk section by section so a problem is only ever rewritten with the
  // question from ITS OWN set.
  const parts = html.split(/(?=<section class="page")/);
  let touched = 0;
  const out = parts.map(sec => {
    const label = (sec.match(/data-screen-label="([^"]*)"/) || [])[1];
    if (!label) return sec;
    const set = resolve(file, label) || resolveByTitle(file, label);
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
    /* A styling change must never narrow this silently again — that has now
     * happened twice. But asserting a fixed problem count was wrong too: the
     * Friday duels carry 8 and the mid-unit quizzes 11, so a threshold of 12
     * fired on every one of them, and a warning that always fires is one
     * nobody reads. Compare instead against a LOOSE scan of the same section:
     * any numbered span the precise regex failed to pick up is a real gap. */
    const loose = [...sec.matchAll(/>(\d{1,2})\.?<\/span>&nbsp;/g)].length;
    if (loose > seen) {
      shortfall.push(`${file} · ${label}: matched ${seen} of ${loose} numbered problems`);
    }
    return rewritten;
  }).join("");
  const keyed = regenKeys(file, out);
  keyBlocks += keyed.blocks; keyRewritten += keyed.rewritten;
  if (touched || keyed.rewritten) {
    changed += touched; files++;
    if (WRITE) fs.writeFileSync(file, keyed.out);
    console.log(`  ${WRITE ? "rewrote" : "would rewrite"} ${String(touched).padStart(4)} problems in ${file}`);
  }
}
console.log(`  answer-key blocks: ${keyBlocks} found, ${keyRewritten} ${WRITE ? "rewritten" : "to rewrite"}`);
console.log(`\n  ${pages} pages scanned, ${changed} problems ${WRITE ? "rewritten" : "to rewrite"} across ${files} files`);
if (unresolved.length) console.log(`  unresolved labels (left untouched): ${unresolved.length}`);
if (shortfall.length) { console.log(`\n  COVERAGE SHORTFALL on ${shortfall.length} page(s):`);
  shortfall.slice(0,6).forEach(s => console.log("    "+s)); process.exitCode = 1; }
if (!WRITE) console.log("  re-run with --write to apply");
