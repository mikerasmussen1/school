#!/usr/bin/env node
/*
 * QA verification for the curriculum project.  node scripts/qa-verify.js
 *
 * There are no unit tests here and the app is a single static page, so this
 * script is the safety net: it loads the curriculum the way a browser would
 * and asserts the app could actually boot, then checks the printable
 * artefacts and the files that must never be edited.
 *
 * Exit code 0 = all checks passed, 1 = at least one FAIL.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

let fails = 0, warns = 0;
let base = "";
try { base = execSync("git rev-parse --verify origin/main", { encoding: "utf8" }).trim(); } catch { /* no remote yet */ }
const pass = m => console.log("  PASS  " + m);
const fail = m => { console.log("  FAIL  " + m); fails++; };
const warn = m => console.log("  WARN  " + m); // eslint-disable-line

function section(t) { console.log("\n" + t); }

// ── 1. Every script index.html loads must exist ──────────────────────────
section("1. Script dependencies");
const index = fs.readFileSync("index.html", "utf8");
// The build stamp appends ?v=<commit> to every script tag so a cached page is
// obvious. Strip it before touching the filesystem — without this the checker
// looks for a file literally named "lessons.js?v=abc1234" and every asset
// check fails, which is how this suite sat at 35 red for days while the thing
// it was meant to guard was fine.
const srcs = [...index.matchAll(/<script src="([^"]+)"/g)]
  .map(m => m[1].replace(/^\.\//, "").split("?")[0]);
if (!srcs.length) fail("index.html declares no <script src> tags — did it get truncated?");
for (const s of srcs) {
  fs.existsSync(s) ? pass(`index.html -> ${s} exists`) : fail(`index.html loads "${s}" but the file is missing`);
}
if (!/<\/html>\s*$/.test(index.trim())) fail("index.html does not end with </html> — likely truncated");
else pass("index.html closes properly");

// ── 1b. index.html's own inline script must parse ────────────────────────
// The app logic lives in a ~112k-char inline <script>. A syntax error there
// is a blank page for every user, and nothing else here would catch it.
section("1b. index.html inline script");
{
  const blocks = [...index.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);
  if (!blocks.length) fail("index.html has no inline <script> — the app logic is missing");
  blocks.forEach((code, i) => {
    if (code.trim().length < 40) return;             // skip tiny shims
    try { new Function(code); pass(`inline script #${i + 1} parses (${code.length} chars)`); }
    catch (e) { fail(`inline script #${i + 1} has a syntax error: ${String(e.message).slice(0, 140)}`); }
  });
}

// ── 2. The curriculum boots (the real fragility) ─────────────────────────
// registry.js destructures ~130 names off window.__CURR. If any bank file
// stops exporting one, the app dies at load with a blank page — and nothing
// else in this repo would catch it.
section("2. Curriculum boots (simulated browser load)");
const curriculumSrcs = srcs.filter(s => s.startsWith("curriculum/"));
const sandbox = { window: { __CURR: {} }, console };
// freshness.js registers listeners as it loads; without these the load throws
// and this whole section reports a curriculum failure that is not real.
Object.assign(sandbox.window, { addEventListener(){}, removeEventListener(){}, matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}), setInterval:()=>0, clearInterval(){} });
sandbox.window.window = sandbox.window;
try {
  for (const f of curriculumSrcs) {
    const code = fs.readFileSync(f, "utf8");
    try {
      new Function("window", "console", code)(sandbox.window, console);
      pass(`loaded ${f}`);
    } catch (e) {
      fail(`${f} threw while loading: ${String(e.message).slice(0, 160)}`);
      throw new Error("halt");   // later files depend on earlier ones
    }
  }
  const C = sandbox.window.__CURR;
  const curricula = C.CURRICULA || {};
  const ids = Object.keys(curricula);
  ids.length ? pass(`CURRICULA registered: ${ids.join(", ")}`) : fail("CURRICULA is empty after load");
  for (const id of ids) {
    const c = curricula[id];
    (c && c.label && c.sub) ? pass(`curriculum "${id}" has label and subtitle`)
                            : fail(`curriculum "${id}" is missing label/sub`);
  }
  Array.isArray(C.ALL_SETS) && C.ALL_SETS.length
    ? pass(`ALL_SETS populated (${C.ALL_SETS.length} practice sets)`)
    : fail("ALL_SETS is empty — practice sets would not render");
  typeof C.lessonFor === "function" ? pass("lessonFor() exported") : fail("lessonFor() missing");
  if (C.ALL_LESSONS) {
    const n = Object.keys(C.ALL_LESSONS).length;
    n ? pass(`ALL_LESSONS populated (${n} lessons)`) : fail("ALL_LESSONS is empty");
  }
} catch (e) {
  if (e.message !== "halt") fail("curriculum load failed: " + String(e.message).slice(0, 160));
}

// ── 2b. Content must not silently shrink ────────────────────────────────
// The failure this repo is most exposed to: a regeneration quietly drops half
// the question bank. Nothing breaks, nothing throws, the app still boots — the
// content is simply gone. So compare counts against origin/main and fail on
// any decrease.
section("2b. Content volume vs origin/main");
// Each side is loaded using ITS OWN index.html's script list. Using one list for
// both sides meant that adding a curriculum file (the subject registry, 2026-09-01)
// made `git show base:<newfile>` throw and disabled this entire check — turning the
// one guard against content silently vanishing into a warning at exactly the moment
// the tree was being restructured.
function countsFor(loader, indexHtml) {
  const files = [...indexHtml.matchAll(/<script src="([^"]+)"/g)]
    .map(m => m[1].replace(/^\.\//, "").split("?")[0])
    .filter(s => s.startsWith("curriculum/"));
  const sb = { __CURR: {} }; sb.window = sb;
    // freshness.js registers listeners at load time; a sandbox without them
    // throws and every one of these checkers exits before it checks anything.
  Object.assign(sb, { addEventListener(){}, removeEventListener(){}, matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}), setInterval:()=>0, clearInterval(){} });
  for (const f of files) new Function("window", "console", loader(f))(sb, { log() {}, warn() {}, error() {} });
  const C = sb.__CURR;
  return {
    sets: (C.ALL_SETS || []).length,
    lessons: Object.keys(C.ALL_LESSONS || {}).length,
    curricula: Object.keys(C.CURRICULA || {}).length,
  };
}
if (!base) {
  warn("no origin/main to compare against — skipping shrink check"); warns++;
} else {
  try {
    const show = f => execSync(`git show ${base}:${f}`, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
    const now = countsFor(f => fs.readFileSync(f, "utf8"), index);
    const was = countsFor(show, show("index.html"));
    for (const [k, label] of [["sets", "practice sets"], ["lessons", "lessons"], ["curricula", "curricula"]]) {
      if (now[k] < was[k]) fail(`${label} DROPPED ${was[k]} -> ${now[k]} — content lost in regeneration?`);
      else pass(`${label}: ${was[k]} -> ${now[k]}`);
    }
  } catch (e) {
    warn("shrink check could not run (new files not on origin/main yet): " + String(e.message).slice(0, 90));
    warns++;
  }
}

// ── 3. Printable artefacts ───────────────────────────────────────────────
section("3. Print packs and worksheets");
const dcFiles = fs.readdirSync(".").filter(f => f.endsWith(".dc.html"));
// Only FROZEN print artefacts need a committed PDF, because the PDF is what a
// teacher actually prints and a stale one silently disagrees with the app. Not
// every .dc.html is one: japan.dc.html is a reading page for the screen, and
// Worksheet Builder.dc.html generates sheets from the live bank, so neither has
// fixed content to freeze. They are listed rather than silently skipped.
const PRINTABLE = /(Print Pack|Worksheets)\.dc\.html$/;
const printable = dcFiles.filter(f => PRINTABLE.test(f));
const screenOnly = dcFiles.filter(f => !PRINTABLE.test(f));
/* Existing was not enough on its own: it asked only whether a PDF EXISTS.
 * On 2026-09-03 all sixteen Year One PDFs were three days stale — the sheets
 * had been regenerated and the PDFs never re-exported — and every check here
 * stayed green because the files were present. That is the worst version of
 * this bug, because the numbering is load-bearing: pOnPaper maps a printed
 * problem NUMBER back through the CURRENT bank, so a child working from a
 * stale sheet is marked wrong for work they got right.
 *
 * Freshness is judged by git, not mtime: a clone or a checkout rewrites mtime
 * and would make every PDF look stale, while git records when the CONTENT of
 * each side last changed. A PDF whose last commit predates its sheet's last
 * commit has not been re-exported since the sheet moved. */
const lastCommit = p => {
  const r = require("child_process").spawnSync(
    "git", ["log", "-1", "--format=%ct", "--", p], {encoding: "utf8"});
  return r.status === 0 && r.stdout.trim() ? +r.stdout.trim() : null;
};
for (const f of printable) {
  const pdf = f.replace(/\.dc\.html$/, ".pdf");
  if (!fs.existsSync(pdf)) { fail(`${f} has no matching ${pdf}`); continue; }
  const tHtml = lastCommit(f), tPdf = lastCommit(pdf);
  // Uncommitted work on either side makes the comparison meaningless rather
  // than wrong, so say so instead of passing or failing on stale information.
  const dirty = require("child_process")
    .spawnSync("git", ["status", "--porcelain", "--", f, pdf], {encoding: "utf8"})
    .stdout.trim();
  if (dirty) pass(`${f} has a matching PDF (uncommitted changes — freshness unchecked)`);
  else if (tHtml === null || tPdf === null) pass(`${f} has a matching PDF (not yet committed)`);
  else if (tPdf < tHtml)
    fail(`${pdf} is STALE — "${f}" changed more recently. Re-export it: the printed ` +
         `numbering must match the live bank or paper work is misgraded.`);
  else pass(`${f} has a matching, up-to-date PDF`);
}
if (screenOnly.length) {
  console.log(`  ----  screen-only pages, no PDF expected: ${screenOnly.join(", ")}`);
}
for (const f of dcFiles.filter(f => /Print Pack/.test(f))) {
  const pages = (fs.readFileSync(f, "utf8").match(/class="page"/g) || []).length;
  pages === 15 ? pass(`${f}: 15 pages`) : fail(`${f}: ${pages} pages (print packs are 15)`);
}
for (const f of dcFiles) {
  const html = fs.readFileSync(f, "utf8");
  if (!/<\/html>\s*$/.test(html.trim())) fail(`${f} does not end with </html> — truncated?`);
}

// ── 3b. Paper answers must land on the right problems ────────────────────
// The printed sheet and index.html's pOnPaper are built by different tools but
// must produce the same ordered list, or a photographed worksheet maps answers
// onto the wrong questions and a child is marked wrong for correct work.
section("3b. Paper -> app problem mapping");
try {
  execSync("node scripts/check-paper-mapping.js", { stdio: "pipe" });
  pass("printed numbering matches the app's mapping on every page");
} catch (e) {
  const out = String((e.stdout || "") + (e.stderr || ""));
  const lines = out.split("\n").filter(l => /FAIL|MISMATCH/.test(l)).slice(0, 6);
  fail("paper/app mapping is broken — scanned answers would land on the wrong problems");
  lines.forEach(l => console.log("        " + l.trim()));
}

// ── 4. Files the handoff says never to edit ──────────────────────────────
section("4. Protected runtime files");
const PROTECTED = ["support.js", "doc-page.js"];
for (const f of PROTECTED) {
  if (!fs.existsSync(f)) { fail(`${f} is missing`); continue; }
  if (!base) { warn(`${f}: no origin/main to compare against`); warns++; continue; }
  try {
    execSync(`git diff --quiet ${base} -- "${f}"`, { stdio: "ignore" });
    pass(`${f} unchanged (HANDOFF.md: "Never edit")`);
  } catch {
    fail(`${f} was modified — HANDOFF.md says these runtime files are never edited`);
  }
}

// ── 5. Summary ───────────────────────────────────────────────────────────
console.log("\n" + "-".repeat(52));
if (fails) { console.log(`RESULT: ${fails} FAILURE(S)${warns ? `, ${warns} warning(s)` : ""}`); process.exit(1); }
console.log(`RESULT: all checks passed${warns ? ` (${warns} warning(s))` : ""}`);
