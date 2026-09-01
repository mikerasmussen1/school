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
const srcs = [...index.matchAll(/<script src="([^"]+)"/g)].map(m => m[1].replace(/^\.\//, ""));
if (!srcs.length) fail("index.html declares no <script src> tags — did it get truncated?");
for (const s of srcs) {
  fs.existsSync(s) ? pass(`index.html -> ${s} exists`) : fail(`index.html loads "${s}" but the file is missing`);
}
if (!/<\/html>\s*$/.test(index.trim())) fail("index.html does not end with </html> — likely truncated");
else pass("index.html closes properly");

// ── 2. The curriculum boots (the real fragility) ─────────────────────────
// registry.js destructures ~130 names off window.__CURR. If any bank file
// stops exporting one, the app dies at load with a blank page — and nothing
// else in this repo would catch it.
section("2. Curriculum boots (simulated browser load)");
const curriculumSrcs = srcs.filter(s => s.startsWith("curriculum/"));
const sandbox = { window: { __CURR: {} }, console };
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
function countsFor(loader) {
  const sb = { __CURR: {} }; sb.window = sb;
  for (const f of curriculumSrcs) new Function("window", "console", loader(f))(sb, { log() {}, warn() {}, error() {} });
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
    const now = countsFor(f => fs.readFileSync(f, "utf8"));
    const was = countsFor(f => execSync(`git show ${base}:${f}`, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 }));
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
for (const f of dcFiles) {
  const pdf = f.replace(/\.dc\.html$/, ".pdf");
  fs.existsSync(pdf) ? pass(`${f} has a matching PDF`) : fail(`${f} has no matching ${pdf}`);
}
for (const f of dcFiles.filter(f => /Print Pack/.test(f))) {
  const pages = (fs.readFileSync(f, "utf8").match(/class="page"/g) || []).length;
  pages === 15 ? pass(`${f}: 15 pages`) : fail(`${f}: ${pages} pages (print packs are 15)`);
}
for (const f of dcFiles) {
  const html = fs.readFileSync(f, "utf8");
  if (!/<\/html>\s*$/.test(html.trim())) fail(`${f} does not end with </html> — truncated?`);
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
