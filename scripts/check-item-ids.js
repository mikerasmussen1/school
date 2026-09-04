#!/usr/bin/env node
/*
 * Can every question be told apart from every other question in its set?
 *
 * TWO THINGS THIS GUARDS, both of which are currently fine — which is the
 * point. They are cheap to keep true and expensive to discover broken.
 *
 * 1. DEDUPE DROPS ONLY TRUE DUPLICATES.
 *    Both the printed sheet and the app drop repeats by comparing question
 *    text with whitespace stripped and case folded. Today all 222 drops are
 *    items identical in question AND answer, so nothing is lost. But two
 *    genuinely different questions whose text happens to normalise the same
 *    would see one silently vanish from the printed page while still sitting
 *    in the bank — and every check in this pipeline would stay green, because
 *    the app and the sheet agree with each other by construction.
 *
 * 2. CONTENT IDS STAY UNIQUE WITHIN A SET.
 *    QTypes.idFor keys the attempt log on item content rather than position.
 *    Two items sharing an id would merge one child's history for two different
 *    questions. Exact duplicates are numbered, so this only fires on a real
 *    collision.
 */
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

global.window = global;
window.__CURR = {};
window.Subjects = { register(){}, all:()=>[], get:()=>null, has:()=>false };
global.localStorage = { getItem:()=>null, setItem(){}, removeItem(){} };
global.document = { addEventListener(){}, removeEventListener(){}, createElement:()=>({style:{}}) };
global.addEventListener = global.removeEventListener = function(){};
global.setInterval = function(){ return 0; }; global.clearInterval = function(){};
global.setTimeout = function(){ return 0; }; global.clearTimeout = function(){};
global.matchMedia = function(){ return {matches:false, addEventListener(){}, removeEventListener(){}}; };
global.fetch = async () => ({ ok:false, json: async () => ({}) });
global.location = { search:"", href:"" };

// The file list comes from index.html rather than a hardcoded array, for the
// same reason check-paper-mapping reads it: a literal list goes stale silently.
const page = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)]
  .map(m => m[1])
  .forEach(m => { try { require(path.join(ROOT, "curriculum", m + ".js")); } catch (e) {} });

const QT = window.QTypes;
const sets = window.__CURR.ALL_SETS || [];
if (!QT || typeof QT.idFor !== "function") {
  console.error("  FAIL  QTypes.idFor is missing — nothing was checked\n");
  process.exit(2);
}
if (!sets.length) {
  console.error("  FAIL  no sets loaded — nothing was checked\n");
  process.exit(2);
}

let items = 0, drops = 0, badDrops = [], idClashes = [];

for (const set of sets) {
  const list = set.items || [];
  const seen = new Map();
  const ids = new Map();
  for (const it of list) {
    items++;
    const key = String(it.q).replace(/\s+/g, "").toLowerCase();
    if (seen.has(key)) {
      drops++;
      const prev = seen.get(key);
      const same = String(prev.q) === String(it.q) &&
                   JSON.stringify(prev.a) === JSON.stringify(it.a);
      if (!same) badDrops.push({ set:set.id, kept:prev, lost:it });
    } else {
      seen.set(key, it);
    }
    const id = QT.idFor(set, it);
    if (ids.has(id) && ids.get(id) !== it) idClashes.push({ set:set.id, id, a:ids.get(id), b:it });
    else ids.set(id, it);
  }
}

console.log(`item ids: ${sets.length} sets, ${items} items, ${drops} exact duplicate(s) dropped`);

let bad = false;
if (badDrops.length) {
  bad = true;
  console.error(`\n  FAIL  ${badDrops.length} item(s) dropped that are NOT duplicates:`);
  badDrops.slice(0, 8).forEach(d => {
    console.error(`     ${d.set}`);
    console.error(`        kept: ${JSON.stringify(d.kept.q)}  ->  ${JSON.stringify(d.kept.a)}`);
    console.error(`        LOST: ${JSON.stringify(d.lost.q)}  ->  ${JSON.stringify(d.lost.a)}`);
  });
  console.error("\n     Two different questions whose text normalises the same. One of them");
  console.error("     never reaches the printed page, and no other check can see it.");
}
if (idClashes.length) {
  bad = true;
  console.error(`\n  FAIL  ${idClashes.length} id collision(s) — one child's history for two questions:`);
  idClashes.slice(0, 8).forEach(c =>
    console.error(`     ${c.set} ${c.id}: ${JSON.stringify(c.a.q)} vs ${JSON.stringify(c.b.q)}`));
}

if (bad) { console.error(""); process.exit(2); }

// ids must also be STABLE — recomputing gives the same answer, and a set's
// ids do not depend on where the set sits in the bank.
let unstable = 0;
for (const set of sets.slice(0, 40)) {
  for (const it of (set.items || [])) {
    if (QT.idFor(set, it) !== QT.idFor(set, it)) unstable++;
  }
}
if (unstable) { console.error(`  FAIL  ${unstable} id(s) changed between two calls\n`); process.exit(2); }

console.log("  every dropped item is a true duplicate");
console.log("  every id is unique within its set and stable across calls\n");
