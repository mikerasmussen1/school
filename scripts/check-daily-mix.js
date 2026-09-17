#!/usr/bin/env node
/*
 * Does the daily mix hold its promises?
 *
 * The composer appends review and challenge blocks to every math set. Four
 * things have to stay true, and three of them are the kind that fail silently:
 *
 * 1. ATTEMPT HISTORY SURVIVES. Items without an `id` are keyed by position, so
 *    the base block must occupy exactly the positions it did before — same
 *    items, same order. If this breaks, every answer a child has already given
 *    quietly re-points to a different question.
 * 2. IDS STAY UNIQUE. Two items sharing an id merge one child's history for
 *    two different questions, and validateSet refuses the set outright.
 * 3. COMPOSITION IS STABLE. The same set opened twice must be the same set,
 *    or a child who answers half a page and comes back finds a fresh draw.
 * 4. REVIEW LOOKS BACKWARD. A "review" item taken from a set the child has not
 *    reached yet is not review; it is teaching them tomorrow's lesson by
 *    accident.
 * 5. NO QUESTION APPEARS TWICE ON A PAGE. Unique ids are not enough: two
 *    different ids can carry the same question, and the first version of this
 *    composer did exactly that on 96% of pages — one asked "7 x 7" three
 *    times — while this file reported PASS because it only compared ids.
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

const page = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)]
  .map(m => m[1])
  .forEach(m => { try { require(path.join(ROOT, "curriculum", m + ".js")); } catch (e) {} });

const MIX = window.__CURR.MIX;
const QT = window.QTypes;
if (!MIX) { console.error("  FAIL  MIX did not load — nothing was checked\n"); process.exit(2); }

let fails = [];
const note = (m) => fails.push(m);

for (const [label, key] of [["Y1 (Gr3)", "ALL_SETS"], ["Y2 (Gr5)", "ALL_SETS_Y5"]]) {
  // ALL_SETS holds BOTH curricula, so the Y1 pass must exclude the y5 sets or
  // it would check third-grade rules against fifth-grade material.
  const fam = key === "ALL_SETS" ? (id => !/^y5/.test(id)) : (id => /^y5/.test(id));
  const ordered = (window.__CURR[key] || [])
    .filter(s => s && s.items && s.items.length && fam(s.id));
  if (!ordered.length) { note(`${label}: no sets loaded`); continue; }

  let totals = [], mixes = [];
  for (const set of ordered) {
    const out = MIX.compose(set, ordered);
    const base = set.items;

    // 1. base block occupies its original positions, item for item
    for (let i = 0; i < base.length; i++) {
      if (out.items[i] !== base[i] && out.items[i].q !== base[i].q) {
        note(`${label} ${set.id}: base item ${i + 1} moved — attempt history would re-point`);
        break;
      }
    }
    if (out.items.length < base.length) note(`${label} ${set.id}: items were lost`);

    // 2. ids unique, and every appended item HAS one (else it takes a positional name)
    const seen = new Set();
    out.items.forEach((it, i) => {
      if (i >= base.length && !it.id) note(`${label} ${set.id}: appended item ${i + 1} has no id`);
      if (it.id) { if (seen.has(it.id)) note(`${label} ${set.id}: duplicate id ${it.id}`); seen.add(it.id); }
      if (it.t < 0 || it.t > 2) note(`${label} ${set.id}: bad tier ${it.t}`);
    });

    // validateSet is what the publish path would enforce
    if (QT && typeof QT.validateSet === "function") {
      const v = QT.validateSet(out);
      if (!v.ok) note(`${label} ${set.id}: validateSet — ${v.errors.slice(0, 2).join("; ")}`);
    }

    // 3. deterministic
    const again = MIX.compose(set, ordered);
    const sig = s => s.items.map(x => (x.id || "") + "|" + x.q).join("~");
    if (sig(out) !== sig(again)) note(`${label} ${set.id}: composition is not stable between calls`);

    /* 5. No ADDED item repeats a question already on the page — neither one of
     * the base items nor another added item.
     *
     * Scoped to added items on purpose. The base banks carry 222 exact
     * duplicates of their own (check-item-ids.js counts them, and both the app
     * and the printed sheet drop repeats at render), which is a pre-existing
     * property of the content, not something the mix caused or can fix. */
    const qseen = new Map();
    base.forEach(it => { const k = String(it.q || "").replace(/\s+/g, "").toLowerCase(); if (k && !qseen.has(k)) qseen.set(k, "base"); });
    out.items.slice(base.length).forEach(it => {
      const k = String(it.q || "").replace(/\s+/g, "").toLowerCase();
      if (!k) return;
      if (qseen.has(k)) note(`${label} ${set.id}: added item "${String(it.q).slice(0, 32)}" repeats ${qseen.get(k)}`);
      else qseen.set(k, it.id || "added");
    });

    // 4. review only ever looks backward
    const at = ordered.findIndex(s => s.id === set.id);
    const priorIds = new Set(ordered.slice(0, at).map(s => s.id));
    out.items.filter(it => String(it.id || "").startsWith("mixr-")).forEach(it => {
      const src = String(it.id).slice(5).replace(/-\d+$/, "");
      if (!priorIds.has(src)) note(`${label} ${set.id}: review item sourced from ${src}, which is not earlier`);
    });

    totals.push(out.items.length);
    if (out.mix) mixes.push(out.mix);
  }

  const avg = a => a.length ? (a.reduce((x, y) => x + y, 0) / a.length) : 0;
  const before = avg(ordered.map(s => s.items.length));
  console.log(`  ${label}: ${ordered.length} sets · ${before.toFixed(1)} → ${avg(totals).toFixed(1)} items ` +
    `(${(avg(totals) / before).toFixed(2)}x)  ` +
    `mix ≈ ${avg(mixes.map(m => m.current)).toFixed(1)} current / ` +
    `${avg(mixes.map(m => m.review)).toFixed(1)} review / ` +
    `${avg(mixes.map(m => m.challenge)).toFixed(1)} challenge`);
  const thin = totals.filter(t => t < 18).length;
  if (thin) console.log(`         ${thin} set(s) under 18 items (early sets have little to review)`);
}

/* Per-child tuning: the two pilots must get genuinely different pages, and one
 * child's cached mix must never be served to the other. */
{
  const y1 = (window.__CURR.ALL_SETS || []).filter(s => s && s.items && s.items.length && !/^y5/.test(s.id));
  const set = y1[40];
  if (set) {
    const h = MIX.compose(set, y1, "Hank"), b = MIX.compose(set, y1, "Brock");
    const d = MIX.compose(set, y1, "Nobody");
    console.log(`  per-child on ${set.id}: Hank ${h.mix.review}r/${h.mix.challenge}c · ` +
      `Brock ${b.mix.review}r/${b.mix.challenge}c · default ${d.mix.review}r/${d.mix.challenge}c`);
    if (h.mix.review === b.mix.review && h.mix.challenge === b.mix.challenge)
      note("per-child config had no effect — both pilots got the same mix");
    const sig = x => x.items.map(i => (i.id || "") + "|" + i.q).join("~");
    if (sig(h) === sig(b)) note("per-child cache collision — Hank and Brock served the same page");
    if (sig(MIX.compose(set, y1, "Hank")) !== sig(h)) note("per-child composition is not stable");
  }
}

if (fails.length) {
  console.error("\n  FAIL\n" + fails.slice(0, 20).map(f => "   - " + f).join("\n") + "\n");
  process.exit(1);
}
console.log("  PASS  base positions preserved, ids unique, stable, review looks backward\n");

// Explicit exit: scripts that load the curriculum into a fake window can leave Node's timers alive.
process.exit(0);
