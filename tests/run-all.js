#!/usr/bin/env node
/*
 * Runs every test in this folder, in order, and exits non-zero if any fails.
 *
 *   node tests/run-all.js            the whole suite
 *   node tests/run-all.js math la    only files whose name contains one of the words
 *
 * Each test is its own process (they share nothing and several stub `window`),
 * with a hard timeout so a test that passes and then forgets to exit — the
 * curriculum scripts reach Node's real timers through the sandbox — is reported
 * rather than waited on forever.
 */
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const root = path.resolve(dir, "..");
const files = fs.readdirSync(dir).filter(f => /\.js$/.test(f) && f !== "run-all.js").sort();
const only = process.argv.slice(2);
const pick = only.length ? files.filter(f => only.some(o => f.includes(o))) : files;
if (!pick.length) { console.error("no tests match " + only.join(" ")); process.exit(2); }

const failed = [];
const t0 = Date.now();
for (const f of pick) {
  const s = Date.now();
  const r = spawnSync(process.execPath, [path.join(dir, f)],
    { encoding: "utf8", cwd: root, timeout: 10 * 60 * 1000, maxBuffer: 64 * 1024 * 1024 });
  const ok = !r.error && r.status === 0;
  const secs = ((Date.now() - s) / 1000).toFixed(1);
  console.log(`${ok ? "PASS" : "FAIL"}  ${f}  (${secs}s)${r.error ? "  " + r.error.code : ""}`);
  if (!ok) {
    failed.push(f);
    const out = ((r.stdout || "") + (r.stderr || "")).trim();
    console.log(out.split("\n").slice(-25).map(l => "      " + l).join("\n"));
  }
}
console.log("-".repeat(52));
console.log(`${pick.length - failed.length} passed, ${failed.length} failed` +
  (failed.length ? ": " + failed.join(", ") : "") + `  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
process.exit(failed.length ? 1 : 0);
