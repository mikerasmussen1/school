#!/usr/bin/env node
/*
 * One command that takes a curriculum change all the way to print.
 *
 *   node scripts/build.js            regenerate everything, then verify
 *   node scripts/build.js --check    verify only, change nothing
 *   node scripts/build.js --no-pdf   regenerate sheets, skip the PDF export
 *
 * WHY THIS EXISTS
 * The curriculum is the source of truth. Three things are DERIVED from it: the
 * sets the app serves, the printed worksheets, and the PDFs that get printed.
 * Until now only the first was automatic. Changing a question meant remembering
 * to regenerate the sheets, then remembering to re-export the PDFs, then
 * remembering to run both checkers — and every one of those had already been
 * forgotten at least once:
 *
 *   - a grade-alignment pass moved ~1,300 items and left 135 of 268 printed
 *     pages stale (fixed by regen-worksheets.js)
 *   - the sheets were regenerated on 2 Sep and the PDFs were not re-exported
 *     until 3 Sep, so for a day the committed PDFs disagreed with the app
 *
 * Both had the same consequence, which is the reason this is worth automating
 * rather than documenting: a printed sheet numbers its problems 1..N, and the
 * app maps a photographed NUMBER back through the CURRENT bank. Any drift
 * between the two marks a child wrong for work they got right. So the order
 * below is not arbitrary — sheets follow the bank, PDFs follow the sheets, and
 * the checkers run last and get the final say.
 *
 * The PDF step needs Chrome and serves the folder over http, because the pages
 * compile their markup at runtime; file:// gives a blank render.
 */
const { spawnSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");


const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

const CHECK_ONLY = process.argv.includes("--check");
const NO_PDF = process.argv.includes("--no-pdf");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 8971;

let failed = false;
const step = t => console.log(`\n── ${t} ${"─".repeat(Math.max(0, 58 - t.length))}`);
const die = m => { console.error("  FAIL  " + m); failed = true; };

function run(cmd, args, label) {
  const r = spawnSync(cmd, args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const out = (r.stdout || "") + (r.stderr || "");
  process.stdout.write(out.split("\n").map(l => l ? "  " + l : l).join("\n"));
  if (r.status !== 0) die(`${label} exited ${r.status}`);
  return { ok: r.status === 0, out };
}

// ── 1. sheets follow the bank ───────────────────────────────────────────
step("1. Worksheets from the curriculum");
if (CHECK_ONLY) {
  const { out } = run("node", ["scripts/rebuild-worksheets.js"], "rebuild-worksheets");
  const m = out.match(/(\d+) pages across/);
  if (m && +m[1] > 0) die(`${m[1]} printed pages no longer match the bank — run without --check`);
} else {
  run("node", ["scripts/rebuild-worksheets.js", "--write"], "rebuild-worksheets");
}

// ── 2. PDFs follow the sheets ───────────────────────────────────────────
// Only re-export a sheet whose PDF is older than it, so an unchanged unit is
// not rewritten just to churn a 3MB binary. Freshness is judged by git commit
// time for the same reason qa-verify does: a checkout rewrites mtime.
function lastCommit(p) {
  const r = spawnSync("git", ["log", "-1", "--format=%ct", "--", p], { encoding: "utf8" });
  return r.status === 0 && r.stdout.trim() ? +r.stdout.trim() : null;
}
function needsExport(dc) {
  const pdf = dc.replace(/\.dc\.html$/, ".pdf");
  if (!fs.existsSync(pdf)) return true;
  const dirty = spawnSync("git", ["status", "--porcelain", "--", dc], { encoding: "utf8" }).stdout.trim();
  if (dirty) return true;                       // sheet just changed in this run
  const a = lastCommit(dc), b = lastCommit(pdf);
  return a !== null && b !== null && b < a;
}

if (!NO_PDF && !CHECK_ONLY) {
  step("2. PDF export");
  const printable = fs.readdirSync(".").filter(f => /(Print Pack|Worksheets)\.dc\.html$/.test(f));
  const todo = printable.filter(needsExport);
  if (!todo.length) console.log("  every PDF is already newer than its sheet — nothing to export");
  else if (!fs.existsSync(CHROME)) die(`Chrome not found at ${CHROME} — export the PDFs manually`);
  else {
    /* python's http.server, not a hand-rolled one. A node server written for
     * this hung Chrome indefinitely — the page kept a request open and
     * --virtual-time-budget does not advance while the renderer is waiting on
     * the network, so the budget never expired and the export never returned.
     * python -m http.server is what these PDFs were exported with by hand and
     * is known to finish, so it is what the automated path uses. */
    const server = spawn("python3", ["-m", "http.server", String(PORT)],
      { cwd: ROOT, stdio: "ignore", detached: false });
    spawnSync("sh", ["-c", `until curl -s -o /dev/null http://localhost:${PORT}/; do sleep 0.3; done`],
      { timeout: 15000 });
    console.log(`  exporting ${todo.length} of ${printable.length}`);
    for (const f of todo) {
      const pdf = f.replace(/\.dc\.html$/, ".pdf");
      const before = fs.existsSync(pdf) ? pageCount(pdf) : null;
      // A hung renderer must fail this file, not the whole night.
      const r = spawnSync(CHROME, ["--headless", "--disable-gpu", "--no-pdf-header-footer",
        "--virtual-time-budget=25000", "--run-all-compositor-stages-before-draw",
        `--print-to-pdf=${path.join(ROOT, pdf)}`,
        `http://localhost:${PORT}/${encodeURIComponent(f)}`],
        { encoding: "utf8", timeout: 120000 });
      const after = fs.existsSync(pdf) ? pageCount(pdf) : null;
      if (r.error && r.error.code === "ETIMEDOUT") { die(`${pdf} timed out rendering`); continue; }
      if (r.status !== 0 || !after) { die(`${pdf} did not render`); continue; }
      // A silent truncation is the failure this step can actually have, and it
      // is invisible in the file size. Page count is the cheap tell.
      if (before !== null && after !== before)
        die(`${pdf}: ${before} pages before, ${after} after — the render changed the page count`);
      else console.log(`  ok  ${pdf} (${after} pages)`);
    }
    server.kill();
  }
}
function pageCount(pdf) {
  const r = spawnSync("pdfinfo", [pdf], { encoding: "utf8" });
  const m = (r.stdout || "").match(/^Pages:\s*(\d+)/m);
  return m ? +m[1] : null;
}

// ── 3. the checkers get the final say ───────────────────────────────────
step("3. Verify");
run("node", ["scripts/check-paper-mapping.js"], "check-paper-mapping");
/* Reads the tier off the printed styling instead of rebuilding the generator's
 * array, so it can disagree with the generator — which the other two cannot,
 * since they share its ordering code. It is a ratchet against a known backlog,
 * so it fails only when a change makes the misplacement worse. */
run("node", ["scripts/check-tier-sections.js"], "check-tier-sections");
/* Measures what the other three cannot see: whether a page had to be shrunk to
 * fit, and how far. All three were green on a worksheet scaled to about 5pt. */
run("node", ["scripts/check-print-fit.js"], "check-print-fit");
/* An undefined var(--token) invalidates its declaration, so the element keeps
 * whatever colour it inherited — silently, and it can look deliberate. Field
 * Notes shipped four of those. */
run("node", ["scripts/check-css-tokens.js"], "check-css-tokens");
run("node", ["scripts/qa-verify.js"], "qa-verify");

console.log();
if (failed) { console.error("BUILD FAILED — do not print or deploy from this tree.\n"); process.exit(1); }
console.log("BUILD OK — app sets, printed sheets and PDFs all agree with the curriculum.\n");
