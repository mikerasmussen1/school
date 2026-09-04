#!/usr/bin/env node
/*
 * Every var(--token) must be defined in the file that uses it.
 *
 * WHY THIS EXISTS
 * field-notes.dc.html asked for var(--brick-dark) in four places and never
 * defined it. An undefined custom property makes the whole declaration
 * invalid, so those alert boxes drew their text with no colour: the dark green
 * body ink inherited through onto a pink ground. It looked deliberate. Nothing
 * failed, nothing warned, and it sat there.
 *
 * That is the same silent-failure shape as an unbound {{ }} in the DSL, and it
 * needs the same kind of gate. A colour that renders as "whatever the parent
 * had" is not a colour anybody chose.
 *
 * The three subjects keep three different palettes on purpose — parchment,
 * field notebook, mission control. This does not compare them to each other.
 * It only asks that each file define what it uses.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");

const FILES = fs.readdirSync(ROOT).filter(f => /\.(html)$/.test(f) && !/^__/.test(f));
let bad = 0, checked = 0;

for (const f of FILES) {
  const src = fs.readFileSync(path.join(ROOT, f), "utf8");
  const used = new Set([...src.matchAll(/var\(\s*--([A-Za-z0-9_-]+)\s*[,)]/g)].map(m => m[1]));
  if (!used.size) continue;
  checked++;
  // Definitions anywhere in the file's own CSS, not only :root — a token may
  // legitimately be set on a scoped selector.
  const defined = new Set([...src.matchAll(/--([A-Za-z0-9_-]+)\s*:/g)].map(m => m[1]));
  const missing = [...used].filter(t => !defined.has(t)).sort();
  if (missing.length) {
    bad++;
    console.error(`  FAIL  ${f}: uses ${missing.length} undefined token(s): ${missing.join(", ")}`);
    missing.forEach(t => {
      const line = src.slice(0, src.indexOf("var(--" + t)).split("\n").length;
      console.error(`          --${t} first used at ${f}:${line}`);
    });
  } else {
    console.log(`  ok    ${f}: ${used.size} token(s), all defined`);
  }
}

console.log("");
if (!checked) { console.error("  FAIL  no file used a CSS custom property — did this check find anything?\n"); process.exit(2); }
if (bad) {
  console.error(`  ${bad} file(s) reference a token nothing defines. An undefined var()`);
  console.error("  invalidates the declaration, so the element renders with the colour");
  console.error("  it inherited rather than the one that was asked for — silently.\n");
  process.exit(2);
}
console.log(`  ${checked} file(s) checked, every token defined where it is used\n`);
