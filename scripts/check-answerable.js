#!/usr/bin/env node
/*
 * Can a child actually TYPE the answer the grader is waiting for?
 *
 * THE BUG THIS EXISTS FOR
 * The practice answer box stripped every character except 0-9 and cut what was
 * left to seven. Against the banks as they stand, that made 2,365 of 9,300
 * answers — 25% — impossible to enter: 858 decimals, 1,010 fractions, 370
 * worded keys like "tenths" or "equal", and 127 others. A child typing 0.741
 * left 0741 in the box and was marked wrong. It was reported as "week 1 Friday
 * won't let me type a dot", because that set happens to be all decimals, but
 * every decimal in both years behaved the same way and had done all along.
 *
 * WHY NOTHING ELSE CAUGHT IT
 * Every other check in this pipeline compares the app against the printed sheet
 * or the bank against itself, and all three agreed: the QUESTION and the KEY
 * were fine everywhere. The defect was in the one step nothing modelled — what
 * the input element permits between the child's fingers and the grader. The
 * grader itself is innocent and always was; QTypes.grade deliberately accepts
 * .6 for 0.6 and 3/6 for 1/2, and short-answer declares input:"text".
 *
 * EVERY WAY AN ANSWER GETS IN, not just the typed one. There are three: the
 * practice box, the tutor's coach box, and the photo of the paper sheet. The
 * paper path kept its own copy of this same bug after the typed box was fixed,
 * because the first version of this check only knew about boxes — it stripped
 * to [0-9./-], so a photographed "yes" or "isosceles" became empty and was
 * dropped without a word to the child.
 *
 * HOW THIS CHECK AVOIDS GOING STALE
 * It does not hardcode what any of them allow. It reads the handlers and the
 * input markup back out of index.html and RUNS them against every answer in
 * every bank. Reintroduce a filter and this fails naming the answers it breaks;
 * tighten a length cap and it fails naming what it truncates.
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

const sets = window.__CURR.ALL_SETS || [];
if (!sets.length) {
  console.error("  FAIL  no sets loaded — nothing was checked\n");
  process.exit(2);
}

/* ---- What does the box actually do to what you type? ------------------- */

/* EVERY answer box, not the first one found.
 *
 * There are two — the practice sets and the tutor's coach lessons — and an
 * earlier draft of this check matched only the first `set:e=>{` in the file,
 * which is the coach's. It read that one's limits, found them fine, and
 * reported the practice box green while the practice box was the broken one.
 * A check that inspects the wrong element is worse than no check, because it
 * answers the question it was asked.
 *
 * Braces are matched rather than regexed: the handler body contains object
 * spreads, so a non-greedy `.*?}` stops in the middle of one. */
function bodyAfter(src, at) {
  const open = src.indexOf("{", at);
  if (open < 0) return null;
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") { depth--; if (depth === 0) return src.slice(open + 1, i); }
  }
  return null;
}

/* The handler is RUN, not pattern-matched.
 *
 * An earlier version of this check read the filter with a regex hunting for
 * [^0-9]. That meant the behaviourally identical \D sailed straight past it and
 * the check cheerfully reported "no character filter" while the box was
 * stripping digits again — as would a named length constant in place of a
 * literal 24. A check that is defeated by respelling the bug is not a check,
 * and this one had already shipped one false green.
 *
 * So the handler's own value expression is pulled out of index.html and
 * executed against real input. Spelling stops mattering; behaviour is what is
 * measured.
 *
 * It FAILS CLOSED. Anything that cannot be extracted or run is reported as a
 * failure, because "I could not tell" and "it is fine" must never print the
 * same. */

// `const v = <expression>;` — the statement that turns a keystroke into the
// value that gets stored. Everything after it is persistence, which would need
// the live component to run.
function valueExprOf(body) {
  const m = body.match(/const\s+[A-Za-z_$][\w$]*\s*=\s*([\s\S]*?);/);
  return m ? m[1] : null;
}

// Plain `const NAME = 24;` declarations, so that hoisting the cap into a named
// constant is a refactor rather than an instant build failure.
const consts = {};
for (const m of page.matchAll(/\bconst\s+([A-Z][A-Z0-9_]*)\s*=\s*(-?\d+(?:\.\d+)?)\s*[;,]/g))
  consts[m[1]] = Number(m[2]);
const constNames = Object.keys(consts);
const constVals = constNames.map(n => consts[n]);

function makeBox(body, line) {
  const expr = valueExprOf(body);
  if (expr == null) return { line, error: "no `const v = ...` value expression found" };
  let fn;
  try { fn = new Function("e", ...constNames, "return (" + expr + ");"); }
  catch (err) { return { line, error: "value expression would not compile: " + err.message }; }

  const box = {
    line,
    expr: expr.replace(/\s+/g, " ").trim().slice(0, 88),
    apply(raw) { return String(fn({ target: { value: raw } }, ...constVals)); }
  };
  // Prove it runs before trusting what it says about 9,300 answers.
  try { box.apply("probe"); }
  catch (err) { return { line, error: "value expression threw when run: " + err.message }; }
  return box;
}

const boxes = [];
for (const m of page.matchAll(/\bset:\s*e\s*=>\s*\{/g)) {
  const body = bodyAfter(page, m.index);
  if (body == null) continue;
  boxes.push(makeBox(body, page.slice(0, m.index).split("\n").length));
}

/* THE OTHER WAY AN ANSWER GETS IN: photographed off the paper sheet.
 *
 * This check was written for the typed box and found only that, which is how
 * the paper path kept its own copy of the same bug for a while afterwards — it
 * stripped to [0-9./-] and cut at 9, so a photographed "yes" or "isosceles"
 * became empty and was dropped without a word to the child.
 *
 * An answer is an answer however it arrives, so the ingestion line is measured
 * with the same bank and the same rule. Matched on the assignment rather than a
 * function boundary because it is one statement inside a saveState callback. */
{
  const m = page.match(/const\s+v\s*=\s*String\(ansMap\[k\][\s\S]*?;/);
  if (!m) {
    console.error("  FAIL  could not find the paper-photo answer line in index.html");
    console.error("        If it moved, update this check — do not delete it.\n");
    process.exit(2);
  }
  const expr = (m[0].match(/=\s*([\s\S]*);$/) || [])[1];
  let fn = null;
  try { fn = new Function("ansMap", "k", ...constNames, "return (" + expr + ");"); }
  catch (e) { fn = null; }
  boxes.push(fn ? {
    line: page.slice(0, m.index).split("\n").length,
    expr: ("paper photo: " + expr.replace(/\s+/g, " ")).slice(0, 88),
    apply(raw) { return String(fn({ k: raw }, "k", ...constVals)); }
  } : {
    line: page.slice(0, m.index).split("\n").length,
    error: "the paper-photo answer line would not compile"
  });
}
if (!boxes.length) {
  console.error("  FAIL  found no answer handlers in index.html");
  console.error("        If they were renamed, update this check — do not delete it.\n");
  process.exit(2);
}

/* And what the on-screen keyboard offers, which is a SECOND, independent gate.
 * A numeric keypad has no decimal point, no slash and no letters, so fixing
 * only the JS filter would leave a tablet still unable to type 0.741. */
const inputModes = [...page.matchAll(/<input value="\{\{ it\.value \}\}"[^>]*>/g)]
  .map(m => ({
    line: page.slice(0, m.index).split("\n").length,
    mode: (m[0].match(/inputMode="([^"]*)"/) || [])[1] || ""
  }));

const throughBox = (s, box) => box.apply(s);

/* ---- Every answer, through the box ------------------------------------ */

const answersOf = it => {
  const a = it && it.a;
  if (a == null) return [];
  return (Array.isArray(a) ? a : [a]).map(x => String(x == null ? "" : x));
};

// The answers a child types, gathered once and run through each box.
const typed = [];
for (const set of sets) {
  for (const it of (set.items || [])) {
    // Only the types the child keys in. A multiple-choice key is never typed,
    // and flagging it would bury the real failures in noise.
    const t = it.type || "short-answer";
    if (t !== "short-answer" && t !== "number-units" && t !== "fill-blank") continue;
    for (const a of answersOf(it)) {
      if (a !== "") typed.push({ set: set.id, q: String(it.q || "").slice(0, 52), a });
    }
  }
}

/* ---- Report ----------------------------------------------------------- */

console.log("  typed answers in the banks: " + typed.length);
console.log("  answer boxes found: " + boxes.length +
            ", keyboards found: " + inputModes.length);

let failed = false;

for (const box of boxes) {
  // Fail closed. A box whose behaviour could not be established is reported as
  // broken, never as fine — the whole point of running the handler instead of
  // reading it is that this check must not be able to shrug.
  if (box.error) {
    failed = true;
    console.log("\n  FAIL  index.html:" + box.line + " — could not exercise this answer box");
    console.log("        " + box.error);
    console.log("        Update this check to match the new shape. Do not delete it:");
    console.log("        it exists because 25% of the banks were once untypeable and");
    console.log("        every other check in the build stayed green throughout.");
    continue;
  }

  const mangled = [];
  const chars = new Map();
  for (const t of typed) {
    const got = throughBox(t.a, box);
    if (got === t.a) continue;
    mangled.push({ ...t, got });
    for (const ch of new Set(t.a)) {
      if (throughBox(ch, box) !== ch) chars.set(ch, (chars.get(ch) || 0) + 1);
    }
  }

  const desc = "index.html:" + box.line + "  " + box.expr;

  if (!mangled.length) { console.log("  ok    " + desc); continue; }

  failed = true;
  console.log("\n  FAIL  " + desc);
  console.log("        " + mangled.length + " of " + typed.length +
              " answers cannot be entered as written (" +
              (mangled.length * 100 / Math.max(typed.length, 1)).toFixed(1) + "%)");
  if (chars.size) {
    console.log("        blocked characters, by answers needing them:");
    [...chars.entries()].sort((a, b) => b[1] - a[1]).slice(0, 12)
      .forEach(([c, n]) => console.log("          " + JSON.stringify(c) + "  " + n));
  }
  console.log("        examples:");
  mangled.slice(0, 8).forEach(m =>
    console.log("          [" + m.set + "] " + JSON.stringify(m.q) +
                "  want " + JSON.stringify(m.a) + "  box gives " + JSON.stringify(m.got)));
}

/* The keyboard is a separate gate from the filter, and only one of them was
 * ever visible in the JS. A numeric keypad offers no dot, slash or letters, so
 * it re-breaks exactly the answers the filter used to. */
const needsMoreThanDigits = (() => {
  for (const set of sets)
    for (const it of (set.items || [])) {
      const t = it.type || "short-answer";
      if (t !== "short-answer" && t !== "number-units" && t !== "fill-blank") continue;
      for (const a of answersOf(it)) if (a !== "" && !/^[0-9]*$/.test(a)) return a;
    }
  return null;
})();

for (const k of inputModes) {
  if (needsMoreThanDigits && /^(numeric|tel)$/.test(k.mode)) {
    failed = true;
    console.log("\n  FAIL  index.html:" + k.line + " inputMode=\"" + k.mode +
                "\" gives a digits-only keypad, but answers like " +
                JSON.stringify(needsMoreThanDigits) + " need more than digits.");
    console.log("        On a tablet this blocks them even with no JS filter at all.");
  } else {
    console.log("  ok    index.html:" + k.line + " keyboard reaches every character " +
                "(inputMode=" + (k.mode || "unset, so the full keyboard") + ")");
  }
}

console.log();
process.exit(failed ? 1 : 0);
