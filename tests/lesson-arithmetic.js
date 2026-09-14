/* Do the sums in the lessons actually add up?
 *
 * A lesson's `sum:` line is the thing a child is asked to believe — "600 + 160
 * + 120 + 32 = 912". These are hand-authored, hundreds of them, with hundreds
 * more still to be written, and a wrong one teaches the wrong fact with the
 * full authority of the page. It is also the single easiest kind of error to
 * check by machine and the hardest to catch by reading.
 *
 * WHAT THIS CHECKS, AND WHAT IT DELIBERATELY DOES NOT.
 * Only lines it can read with certainty: a chain of + - × ÷ and numbers with
 * an = and a number on the other side. Anything else — factor lists, "GCF(16,
 * 40) = 8", prose, a deliberately WRONG example shown as a trap — is skipped,
 * and the count of skips is printed so the coverage is never overstated.
 *
 * A skipped line is not a passed line. The number below is what was actually
 * verified.
 *
 * Run: node tests/lesson-arithmetic.js
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), D = ROOT + "/curriculum/";

global.window = global; window.__CURR = {};
window.Subjects = {register(){}, all:()=>[], get:()=>null, has:()=>false};
global.localStorage = {getItem:()=>null, setItem(){}, removeItem(){}};
global.document = {addEventListener(){}, removeEventListener(){}, createElement:()=>({style:{}})};
global.addEventListener = global.removeEventListener = function(){};
global.setInterval = ()=>0; global.clearInterval = ()=>{};
global.setTimeout = ()=>0; global.clearTimeout = ()=>{};
global.matchMedia = ()=>({matches:false, addEventListener(){}, removeEventListener(){}});
global.fetch = async()=>({ok:false, json:async()=>({})});
global.location = {search:"", href:""};

const page = fs.readFileSync(ROOT + "/index.html", "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m => m[1])
  .forEach(m => { try { require(D + m + ".js"); } catch(e){} });

const C = window.__CURR;
let fails = 0, checks = 0;
const ok = (c, what) => { checks++; if(!c){ console.log("  FAIL  " + what); fails++; } };

/* Read "1,234" and "2¾" and "×" as numbers and operators a machine can use. */
const FRAC = {"½":.5, "¼":.25, "¾":.75, "⅓":1/3, "⅔":2/3, "⅕":.2, "⅛":.125};
function tidy(s){
  let t = String(s);
  Object.keys(FRAC).forEach(f => { t = t.split(f).join("+" + FRAC[f]); });
  return t.replace(/,(?=\d{3}\b)/g, "")     // thousands separators only
          .replace(/[×✕x]/g, "*").replace(/[÷]/g, "/").replace(/[−–—]/g, "-")
          .replace(/\s+/g, " ").trim();
}

/* Only a pure arithmetic chain. Anything with a letter, a bracket, a comma
 * that is not a thousands separator, or a second `=` is left alone. */
const PURE = /^[-+*/.()\d\s]+$/;
function evaluate(expr){
  if(!PURE.test(expr)) return null;
  if(!/\d/.test(expr)) return null;
  try {
    const v = Function('"use strict";return (' + expr + ')')();
    return (typeof v === "number" && isFinite(v)) ? v : null;
  } catch(e){ return null; }
}

console.log("the lesson sums are arithmetically true");
{
  const A = C.LESSONS_AUTHORED || {};
  let readable = 0, skipped = 0, lessons = 0;
  const wrong = [];

  Object.keys(A).forEach(id => {
    lessons++;
    (A[id].steps || []).forEach((st, i) => {
      if(!st.sum) return;
      /* A line may hold several statements separated by · — check each. */
      String(st.sum).split("·").forEach(part => {
        const t = tidy(part);
        const halves = t.split("=");
        if(halves.length < 2){ skipped++; return; }
        /* Every `=` in the chain must agree, so "a = b = c" is two checks. */
        const vals = halves.map(evaluate);
        if(vals.some(v => v === null)){ skipped++; return; }
        readable++;
        const first = vals[0];
        if(vals.some(v => Math.abs(v - first) > 1e-6))
          wrong.push(id + " step" + (i+1) + ": " + part.trim() +
                     "  (" + vals.map(v => +v.toFixed(4)).join(" vs ") + ")");
      });
    });
  });

  console.log("     " + lessons + " authored lessons · " + readable +
              " statements verified · " + skipped + " not machine-readable");
  ok(lessons > 60, "there are lessons to check (" + lessons + ")");
  ok(readable > 100, "and a real number of them are checkable (" + readable + ")");
  ok(wrong.length === 0,
     "every checkable sum is correct" +
     (wrong.length ? " — " + wrong.length + " are not:\n        " + wrong.slice(0,10).join("\n        ") : ""));
}

/* The checker has to be able to fail, or the green above means nothing. */
console.log("the checker itself catches a wrong sum");
{
  const bad = tidy("600 + 160 + 120 + 32 = 913").split("=").map(evaluate);
  ok(bad[0] !== null && bad[1] !== null, "it can read that statement");
  ok(Math.abs(bad[0] - bad[1]) > 1e-6, "and it sees the two sides disagree");
  const good = tidy("600 + 160 + 120 + 32 = 912").split("=").map(evaluate);
  ok(Math.abs(good[0] - good[1]) < 1e-6, "while the true one agrees");
  const chain = tidy("234 * 3 = 600 + 90 + 12 = 702").split("=").map(evaluate);
  ok(chain.every(v => Math.abs(v - chain[0]) < 1e-6), "and a three-part chain checks end to end");
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
