#!/usr/bin/env node
/*
 * Rebuild each printed page's tier SECTIONS from the bank, not just its text.
 *
 *   node scripts/rebuild-worksheets.js            report what would change
 *   node scripts/rebuild-worksheets.js --write    apply it
 *
 * WHY THIS EXISTS
 * regen-worksheets.js replaces the question text at each printed position and
 * nothing else. The three sections a page is divided into — "Warm-Up · recall",
 * "Core GRADED · show your working", "Challenge · not graded" — are static
 * markup with a fixed number of slots, authored once against whatever the tier
 * composition was that day. So the moment a set's composition changes, the text
 * slides across the section boundaries and the headings start lying: on 89
 * pages, 400 Challenge problems print under a GRADED banner, and a child is
 * told to hand in work that is not scored.
 *
 * Both existing checkers stay green through that, because they rebuild the same
 * tier-ordered array the generator used and only ask "is the text at position N
 * the question the bank puts at position N". Neither asks which BOX position N
 * is in. check-tier-sections.js was written to ask exactly that, and it is the
 * measure this script has to move.
 *
 * WHAT IT DOES
 * For every page it can resolve to a set: find each tier section, take its
 * FIRST existing cell as the mould, and re-emit the whole section from the
 * bank — right number of cells, right numbers, right questions, right hints.
 * Styles are read off that mould rather than hardcoded, so each mission keeps
 * its own accent colour and any layout variation survives untouched.
 *
 * Hints are rebuilt too, and they had drifted independently: on set 1.1's back
 * page the hint "(84 ÷ 6)" sat on "How many rectangles have area 36?", because
 * text was replaced under it while it stayed put.
 *
 * The front page carries Warm-Up and Core; the back carries Challenge. A page
 * with none of those headings — covers, answer keys, the reference pages — is
 * left alone.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);
const WRITE = process.argv.includes("--write");

// ── the app's ordering, same contract as check-paper-mapping.js ──────────
function sheetFor(set) {
  const seen = new Set(), uniq = [];
  (set.items || []).forEach(it => {
    const q = String(it.q).replace(/\s+/g, "").toLowerCase();
    if (seen.has(q)) return;
    seen.add(q); uniq.push(it);
  });
  const out = [];
  [0, 1, 2].forEach(t => uniq.forEach(it => { if (it.t === t) out.push({ it, n: out.length + 1 }); }));
  return out;
}

// ── load the curriculum the way the browser does ─────────────────────────
function loadCurriculum() {
  const ctx = { console: { log(){}, warn(){}, error(){} }, setTimeout,
    document: { querySelector: () => null, createElement: () => ({}), addEventListener(){}, head:{ appendChild(){} } },
    localStorage: { getItem: () => null, setItem(){} }, fetch: () => Promise.reject(new Error("no net")) };
  ctx.window = ctx; ctx.globalThis = ctx; ctx.self = ctx;
  vm.createContext(ctx);
  const order = fs.readFileSync("index.html", "utf8")
    .match(/curriculum\/[a-z0-9-]*\.js/g).map(s => s.split("/")[1])
    .filter((v, i, a) => a.indexOf(v) === i);
  for (const f of order) {
    try { vm.runInContext(fs.readFileSync(path.join("curriculum", f), "utf8"), ctx, { filename: f }); }
    catch (e) { console.error(`  cannot load curriculum/${f}: ${e.message}`); process.exit(2); }
  }
  return ctx.window.__CURR || {};
}
const C = loadCurriculum();

const byId = {}, byTitle = {};
const add = s => {
  if (!s || !s.id) return;
  byId[s.id] = s;
  const t = String(s.title || s.label || "").trim();
  if (!t) return;
  byTitle[t] = byTitle[t] === undefined ? s : null;      // null = ambiguous, refuse
};
(C.ALL_SETS || []).forEach(add);
Object.entries(C.EXTRA || {}).forEach(([id, items]) => {
  if (!Array.isArray(items)) return;
  byId[id] = byId[id] ? { ...byId[id], items: (byId[id].items || []).concat(items) } : { id, items };
});

const dec = s => String(s).replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
  .replace(/&minus;/g, "−").replace(/&times;/g, "×").replace(/&divide;/g, "÷").trim();
const enc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function resolve(file, label) {
  const u = (file.match(/Unit (\d+)/) || [])[1];
  if (!u) return null;
  const unit = +u, y2 = /^Y2 /.test(file);
  const m = label.match(/^(\d+)\.(\d+)/);
  if (m) {
    const week = +m[1], page = +m[2];
    const cands = y2
      ? [week === 1 ? `y5u${unit}p${page}` : null, `y5u${unit}w${week}p${page}`]
      : [week === 1 && unit === 1 ? `p${page}` : null,
         week === 1 ? `u${unit}p${page}` : null, `u${unit}w${week}p${page}`];
    for (const c of cands) if (c && byId[c]) return byId[c];
  }
  const t = dec(label).replace(/\s*·\s*back$/i, "").replace(/^[\d.]+\s*[·-]?\s*/, "").trim();
  return byTitle[t] || null;
}

/* One tier section inside a page: the heading, the container holding its
 * numbered cells, and those cells.
 *
 * The container is NOT simply the element after the heading. Core's heading is
 * followed by the "Stop rule" box, and taking the next sibling picked that up
 * instead — two cells of prose where twelve problems were expected. So find the
 * container by what it CONTAINS: the first sibling after the heading holding a
 * numbered span at this tier's own font size, which is the styling contract
 * CONTRIBUTING.md states (Warm-Up 9.5px, Core 10px, Challenge 10.5px). */
const TIER_SIZE = { "Warm-Up": "9\\.5", "Core": "10", "Challenge": "10\\.5" };
function sectionAt(page, tierName) {
  const h = page.indexOf(">" + tierName + "</div>");
  if (h < 0) return null;
  const numbered = new RegExp(`font-size:${TIER_SIZE[tierName]}px[^>]*>\\d+\\.?</span>`);
  let k = h;
  while (k < page.length) {
    const openIdx = page.indexOf("<div style=", k);
    if (openIdx < 0) return null;
    let d = 0, j = openIdx;
    while (j < page.length) {
      if (page.startsWith("<div", j)) { d++; j = page.indexOf(">", j) + 1; continue; }
      if (page.startsWith("</div>", j)) { d--; j += 6; if (!d) break; continue; }
      j++;
    }
    const open = page.slice(openIdx, page.indexOf(">", openIdx) + 1);
    const inner = page.slice(page.indexOf(">", openIdx) + 1, j - 6);
    if (numbered.test(inner)) return { headIdx: h, openIdx, endIdx: j, open, inner };
    k = j;                                   // not this sibling; try the next
    // Do not run past the next tier heading — that section is not ours.
    const nextHead = Math.min(...Object.keys(TIER_SIZE)
      .map(t => { const x = page.indexOf(">" + t + "</div>", h + 1); return x < 0 ? Infinity : x; }));
    if (k > nextHead) return null;
  }
  return null;
}

/* Split a container's children into top-level cells. */
function cells(inner) {
  const out = []; let d = 0, start = 0, k = 0;
  while (k < inner.length) {
    if (inner.startsWith("<div", k)) { if (!d) start = k; d++; k = inner.indexOf(">", k) + 1; continue; }
    if (inner.startsWith("</div>", k)) { d--; k += 6; if (!d) out.push(inner.slice(start, k)); continue; }
    k++;
  }
  return out;
}

/* Read the styles off a section's cells so a rebuilt one is indistinguishable.
 *
 * Takes the WHOLE section, not just its first cell. Reading the hint style off
 * cell one produced <span style=""> on every hint in the section whenever that
 * first cell happened to have no hint — Challenge opens on a bare "12 × 3" —
 * so the hints printed in the question's font instead of the muted mono they
 * are meant to be. The style is whatever the section's first HINTED cell uses;
 * a section with no hints at all needs none. */
function mould(all) {
  const cell = all[0];
  const numSpan = cell.match(/<span style="([^"]*)">\s*\d+\.?\s*<\/span>/);
  let hintStyle = "";
  for (const c of all) {
    const m = c.match(/<span style="([^"]*)">\([^)]*\)<\/span>/);
    if (m) { hintStyle = m[1]; break; }
  }
  const dotted = /\d+\.<\/span>/.test(cell);
  /* Two sections have no hinted cell anywhere to copy from, yet items that
   * carry hints — Warm-Up on "3.1 Factor Pairs", Challenge on "2.3 Three
   * Digits by One". Falling back to the number's own style keeps the hint in
   * the same muted mono rather than emitting style="" and letting it print in
   * the question's font. */
  return { numStyle: numSpan ? numSpan[1] : "", dotted,
           hintStyle: hintStyle || (numSpan ? numSpan[1] : ""), sample: cell };
}

/* Emit one cell in the mould's shape, carrying n / question / hint. */
function emit(m, n, q, hint) {
  const num = `<span style="${m.numStyle}">${n}${m.dotted ? "." : ""}</span>`;
  /* A space before the hint. The sheets ran it straight onto the question —
   * "4 × 13(40 + 12)", "Area 84, one side 6. Other side?(84 ÷ 6)" — which was
   * there before this rebuild and is just hard to read. */
  const hintHtml = hint ? ` <span style="${m.hintStyle}">(${enc(hint)})</span>` : "";
  // Rebuild by substituting into the sample, which keeps every wrapper exactly.
  let out = m.sample;
  out = out.replace(/<span style="[^"]*">\s*\d+\.?\s*<\/span>/, num);
  // question text sits between "&nbsp; " and the hint span or the closing tag
  out = out.replace(/(&nbsp;\s*)([^<]*)/, (all, sp) => sp + enc(q));
  // replace or drop the existing hint span
  if (/<span style="[^"]*">\([^)]*\)<\/span>/.test(out))
    out = out.replace(/\s*<span style="[^"]*">\([^)]*\)<\/span>/, hintHtml);
  else if (hintHtml)
    out = out.replace(/(<\/div>|<\/span>)(?=(<div|<span)[^>]*border-bottom)/, hintHtml + "$1");
  return out;
}

/* How many cells a printed section can hold.
 *
 * A sheet was never meant to carry a set's whole bank. Sets run to 52 items
 * after deduping — u4w4p3 is 5 Warm-Up, 21 Core, 26 Challenge — because the
 * app's bank and the day's paper are different things: Practice Bay adapts and
 * stops when a child has proved it, the sheet is one page each side.
 *
 * So each section prints its tier's items up to what fits, in bank order. The
 * paper-to-app contract survives because it is positional, not sequential:
 * "printed number N is the item at position N in sheetFor order". Capping a
 * section leaves a gap in the numbers — Warm-Up may end at 12 and Core start at
 * 15 — and check-paper-mapping still resolves each printed number correctly,
 * because it looks the number up rather than counting along.
 *
 * The caps are the capacities the pages were authored to: twelve Warm-Up cells
 * in a four-column grid and six Core rows on the front, and a back that also
 * has to hold working space and the error journal. */
const CAP = { 0: 12, 1: 6, 2: 12 };

const TIERS = [["Warm-Up", 0], ["Core", 1], ["Challenge", 2]];
let files = 0, pagesTouched = 0, cellsBefore = 0, cellsAfter = 0, skipped = [], capped = [];

for (const file of fs.readdirSync(".").filter(f => /Worksheets\.dc\.html$/.test(f))) {
  const html = fs.readFileSync(file, "utf8");
  const parts = html.split(/(?=<section class="page")/);
  let touched = 0;
  const out = parts.map(page => {
    const label = (page.match(/data-screen-label="([^"]*)"/) || [])[1];
    if (!label) return page;
    const set = resolve(file, label);
    if (!set) { skipped.push(`${file} · ${label}`); return page; }
    const sheet = sheetFor(set);
    let pg = page, changed = false;

    // Later sections shift as earlier ones resize, so rebuild back to front.
    for (const [name, tier] of [...TIERS].reverse()) {
      const sec = sectionAt(pg, name);
      if (!sec) continue;
      const existing = cells(sec.inner);
      if (!existing.length) continue;
      const all = sheet.filter(x => x.it.t === tier);
      if (!all.length) continue;
      const want = all.slice(0, CAP[tier]);
      if (all.length > want.length) capped.push(`${file} · ${label} · ${name}: ${all.length} -> ${want.length}`);
      const m = mould(existing);
      const rebuilt = want.map(x => emit(m, x.n, dec(x.it.q), x.it.hint ? dec(x.it.hint) : null)).join("");
      cellsBefore += existing.length; cellsAfter += want.length;
      if (rebuilt !== sec.inner) {
        pg = pg.slice(0, sec.openIdx) + sec.open + rebuilt + "</div>" + pg.slice(sec.endIdx);
        changed = true;
      }
      // the Warm-Up heading is the only one carrying a count
      if (name === "Warm-Up")
        pg = pg.replace(/(>Warm-Up<\/div>\s*<div style="[^"]*">)\d+( items)/, `$1${want.length}$2`);
    }
    if (changed) { touched++; }
    return pg;
  }).join("");

  /* The teacher answer key has to describe THIS sheet, not the whole bank.
   * regen-worksheets.js builds its ranges from every item of a tier, which was
   * right while the sheet printed them all. With sections capped it is not: set
   * 1.3's key listed "Challenge 5–30, 26 answers" against a sheet printing 5–16.
   * A key with rows the sheet has no problems for is worse than useless to
   * whoever is marking, so the key is regenerated here, from the same capped
   * list the page was built from. */
  let keyed = out, keyBlocks = 0;
  keyed = keyed.replace(
    /(font-size:16px">)([\d.]+) · ([^<]*)(<\/div><div style="[^"]*">out of )(\d+)(<\/div><\/div>)([\s\S]{0,4000}?)(<\/div><\/div>)/g,
    (whole, h1, lab, title, mid, oldTotal, h2, rows, tail) => {
      const set = resolve(file, lab + " " + dec(title)) || byTitle[dec(title)];
      if (!set) return whole;
      const sheet = sheetFor(set);
      let newRows = rows, scored = 0;
      for (const [name, tier] of TIERS) {
        const band = sheet.filter(x => x.it.t === tier).slice(0, CAP[tier]);
        if (tier < 2) scored += band.length;
        const rx = new RegExp("(>" + name + " · )[\\d–-]+( · <\\/span>)([^<]*)");
        if (!rx.test(newRows)) continue;
        const range = band.length
          ? (band.length === 1 ? String(band[0].n) : `${band[0].n}–${band[band.length - 1].n}`)
          : "—";
        const body = band.map(x => String(x.it.a == null ? "" : x.it.a)).join(" &nbsp;|&nbsp; ");
        newRows = newRows.replace(rx, "$1" + range + "$2" + body);
      }
      keyBlocks++;
      return h1 + lab + " · " + title + mid + scored + h2 + newRows + tail;
    });

  if (touched || keyed !== out) {
    files++; pagesTouched += touched;
    if (WRITE) fs.writeFileSync(file, keyed);
    console.log(`  ${WRITE ? "rebuilt" : "would rebuild"} ${String(touched).padStart(3)} pages` +
      (keyBlocks ? ` and ${keyBlocks} answer keys` : "") + ` in ${file}`);
  }
}
console.log(`\n  ${pagesTouched} pages across ${files} files; ${cellsBefore} printed cells -> ${cellsAfter}`);
if (skipped.length) console.log(`  ${skipped.length} pages not resolved to a set, left untouched`);
if (capped.length) {
  console.log(`  ${capped.length} sections hold more than the page fits; the rest stay in Practice Bay:`);
  capped.slice(0, 6).forEach(c => console.log("     " + c));
  if (capped.length > 6) console.log(`     … +${capped.length - 6} more`);
}
if (!WRITE) console.log("  re-run with --write to apply");
