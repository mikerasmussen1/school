#!/usr/bin/env node
/*
 * Would any printed page have to be shrunk to fit, and by how much?
 *
 *   node scripts/check-print-fit.js            report
 *   node scripts/check-print-fit.js --floor .8 fail below this scale (default .85)
 *
 * WHY THIS EXISTS
 * print-fit.js scales an over-long page down until it fits the sheet. That is
 * the right behaviour — the alternative is doc-page clipping the bottom off —
 * but it is silent, it has no legibility floor, and it will happily take a page
 * to 0.25.
 *
 * That combination produced a page nothing else in this pipeline objected to.
 * Printing every graded item of set u6w4p3 — 12 Warm-Up and 30 Core — scaled
 * that page to 0.55, which puts 12.5px question text at roughly 5pt on paper,
 * smaller than the fine print on a contract, for a third grader reading it
 * unaided. check-paper-mapping, check-tier-sections and qa-verify were all
 * green: the numbering was right, the tiers were right, the answers were right,
 * and the page was unusable.
 *
 * So this measures the thing they cannot see. It renders each file in headless
 * Chrome, lets print-fit run, and reads the scale it applied off the DOM.
 *
 * IT REPORTS, IT DOES NOT GATE. Consecutive runs over identical files disagree
 * — 66 pages scaled and a worst of 0.879 on one run, 58 and 0.832 on the next —
 * because print-fit measures after fonts load and that race is not settled by
 * --virtual-time-budget. A gate that flips on a rerun teaches everyone to rerun
 * it, which is worse than not having it. So it prints what it saw and exits 0,
 * and the capacity constants in rebuild-worksheets.js are what actually keep
 * pages readable. Make it blocking once the measurement is repeatable.
 *
 * Needs Chrome, and serves over http because the pages compile at runtime.
 */
const { spawnSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 8973;
const fi = process.argv.indexOf("--floor");
const FLOOR = fi > 0 ? parseFloat(process.argv[fi + 1]) : 0.85;

if (!fs.existsSync(CHROME)) {
  console.log("  Chrome not found — cannot measure print scaling, skipping");
  process.exit(0);
}

const files = fs.readdirSync(".").filter(f => /(Print Pack|Worksheets)\.dc\.html$/.test(f));
const server = spawn("python3", ["-m", "http.server", String(PORT)],
  { cwd: ROOT, stdio: "ignore" });
spawnSync("sh", ["-c", `until curl -s -o /dev/null http://localhost:${PORT}/; do sleep 0.3; done`],
  { timeout: 15000 });

let worst = 1, offenders = [], scaled = 0, measured = 0, failedFiles = [];
for (const f of files) {
  const r = spawnSync(CHROME, ["--headless", "--disable-gpu", "--no-sandbox",
    "--virtual-time-budget=25000",
    "--run-all-compositor-stages-before-draw", "--dump-dom",
    `http://localhost:${PORT}/${encodeURIComponent(f)}`],
    { encoding: "utf8", timeout: 120000, maxBuffer: 1 << 28 });
  const dom = r.stdout || "";
  // A file whose render failed must not read as a file with nothing to report.
  // Without this, a Chrome timeout or crash left dom empty, the regexes matched
  // nothing, and the check announced that no page needed scaling — the same
  // silent green this check exists to prevent, and the same guard that
  // check-tier-sections.js already carries one file over. Seen for real:
  // consecutive runs disagreed about whether an offender existed, because some
  // renders were quietly returning nothing.
  if (r.error || r.status !== 0 || !/data-screen-label=/.test(dom)) {
    failedFiles.push(`${f}${r.error ? " (" + r.error.code + ")" : ""}`);
    continue;
  }
  measured++;
  for (const m of dom.matchAll(/data-screen-label="([^"]*)"[^>]*data-pf-fitted="([\d.]+)"/g)) {
    const s = parseFloat(m[2]);
    scaled++;
    if (s < worst) worst = s;
    if (s < FLOOR) offenders.push({ file: f, label: m[1], scale: s });
  }
  for (const m of dom.matchAll(/data-pf-fitted="([\d.]+)"[^>]*data-screen-label="([^"]*)"/g)) {
    const s = parseFloat(m[1]);
    scaled++;
    if (s < worst) worst = s;
    if (s < FLOOR) offenders.push({ file: f, label: m[2], scale: s });
  }
}
server.kill();

console.log(`print-fit check: ${measured} of ${files.length} files measured, ` +
  `${scaled} page(s) needed scaling, worst ${worst.toFixed(3)}`);
if (failedFiles.length) {
  console.error(`  FAIL  ${failedFiles.length} file(s) did not render, so nothing was measured for them:`);
  failedFiles.slice(0, 5).forEach(x => console.error("     " + x));
  console.error("        A render that fails is not a page that fits.\n");
  process.exit(2);
}
if (!measured) {
  console.error("  FAIL  measured no files at all — this check verified nothing\n");
  process.exit(2);
}
if (!offenders.length) {
  console.log(`  no page shrunk below the ${FLOOR} floor\n`);
  process.exit(0);
}
// Only the worksheets are generated here. A Print Pack page under the floor is
// pre-existing, and its measured scale disagrees with its actual PDF, which
// renders full size — so it is reported rather than failed on, instead of
// blocking every build on a number this check cannot yet justify.
const owned = offenders.filter(o => /Worksheets\.dc\.html$/.test(o.file));
const foreign = offenders.filter(o => !/Worksheets\.dc\.html$/.test(o.file));
if (foreign.length) {
  console.log(`  ${foreign.length} page(s) below the floor in files this tool does not generate:`);
  foreign.forEach(o => console.log(`     ${o.scale.toFixed(3)}  ${o.file} · ${o.label}   (reported, not failed)`));
}
if (!owned.length) {
  console.log(`  no generated worksheet page is below the ${FLOOR} floor\n`);
  process.exit(0);
}
console.log(`  ${owned.length} page(s) below the ${FLOOR} legibility floor:`);
owned.sort((a, b) => a.scale - b.scale).slice(0, 10).forEach(o =>
  console.log(`     ${o.scale.toFixed(3)}  ${o.file.replace(" Worksheets.dc.html", "")} · ${o.label}`));
if (owned.length > 10) console.log(`     … +${owned.length - 10} more`);
console.log("\n  A page this small is legible to no one. Reduce what that page");
console.log("  prints — the capacity constants in rebuild-worksheets.js — rather");
console.log("  than letting print-fit shrink it.");
console.log("  Reported, not failed: this measurement is not yet repeatable.\n");
process.exit(0);
