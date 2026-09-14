/* Does the grader accept what a child actually types?
 *
 * Two separate jobs, and the second is the one that makes the first safe:
 *
 *   1. Place names and ordinary misspellings must COUNT. "hundreths" is a
 *      spelling slip; the question was about place value.
 *   2. The tolerance that buys (1) must never turn one real answer into a
 *      DIFFERENT real answer. That is checked below against every answer in
 *      the real banks — not against a handful of examples chosen to pass.
 *
 * Run: node tests/answer-matching.js
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

const QT = window.QTypes, C = window.__CURR;
let fails = 0, checks = 0;
const ok = (c, what) => { checks++; if(!c){ console.log("  FAIL  " + what); fails++; } };

/* short-answer is the type every one of these flows through. */
const sa = (a, q) => ({type:"short-answer", q: q || "which place is the 7 in?", a: a});
const takes  = (key, resp, q) => ok(QT.grade(sa(key, q), resp) === true,
                                    '"' + resp + '" should count for "' + key + '"');
const refuses = (key, resp, q) => ok(QT.grade(sa(key, q), resp) !== true,
                                    '"' + resp + '" must NOT count for "' + key + '"');

console.log("place names — spelling and number are forgiven");
takes("hundredths", "hundreths");
takes("hundredths", "hundredth");
takes("hundreds", "hundreds place");
takes("hundreds", "the hundreds place");
takes("hundreds", "hundered");
takes("hundreds", "hunderds");
takes("tenths", "tenth");
takes("thousandths", "thousanths");
takes("thousands", "thousend");
takes("millions", "milions");
takes("ones", "unit");
takes("hundred thousands", "hundred thousand");
takes("hundred thousands", "hunderd thousands place");
takes("ten thousands", "ten thousand");

console.log("...but the -th is never forgiven");
refuses("tenths", "tens");
refuses("tens", "tenths");
refuses("hundredths", "hundreds");
refuses("hundreds", "hundredths");
refuses("thousandths", "thousands");
refuses("thousands", "thousandths");

console.log("place names stay distinct from each other");
refuses("hundreds", "thousands");
refuses("ten thousands", "thousands");
refuses("thousands", "ten thousands");
refuses("hundred thousands", "ten thousands");
refuses("tens", "ones");

console.log("ordinary misspellings count");
takes("triangle", "triangel");
takes("rectangle", "rectangel");
takes("perimeter", "perimiter");
takes("isosceles", "isosceles");
takes("trapezoid", "trapazoid");
takes("parallel", "paralel");
takes("smaller", "smaler");

console.log("...but a different answer never does");
refuses("more", "mode");          // too short to fuzz
refuses("mode", "more");
refuses("1kg", "2kg");            // digits compared exactly
refuses("600g", "500g");
refuses("yes", "no");
refuses("odd", "even");
refuses("acute", "obtuse");
refuses("bigger", "smaller");
refuses("always", "never");

console.log("the number handling still works");
takes("0.6", ".6");
takes("1/2", "3/6");
refuses("2/3", "4/6", "write 4/6 in simplest form");
refuses("1/2", "0.5", "type your answer as a/b");

/* ── THE GUARD THAT MAKES THE TOLERANCE SAFE ──────────────────────────────
 * Every distinct word answer in the real banks, checked against every other.
 * If the matcher accepts one for another, the tolerance is too loose and this
 * fails with the offending pair named. */
console.log("no two real answers in the banks collapse into each other");
{
  const words = new Set();
  const isWord = s => /[a-z]/i.test(s) && !/^[\d\s,.\/$+-]*$/.test(s);
  const walk = it => {
    if(!it) return;
    (Array.isArray(it.a) ? it.a : [it.a]).forEach(a => {
      const s = String(a == null ? "" : a).trim();
      if(s && isWord(s)) words.add(s.toLowerCase());
    });
    (it.parts || []).forEach(walk);
  };
  (C.ALL_SETS || []).forEach(s => (s.items || []).forEach(walk));
  Object.values(C.EXTRA || {}).forEach(l => (l || []).forEach(walk));

  const list = [...words];
  const bad = [];
  for(const key of list)
    for(const other of list)
      if(key !== other && QT.grade(sa(key), other) === true) bad.push(other + " counted for " + key);

  ok(list.length > 40, "the banks supplied a real vocabulary to test (" + list.length + " answers)");
  ok(bad.length === 0,
     "no pair collapses" + (bad.length ? " — " + bad.length + ": " + bad.slice(0,6).join("; ") : ""));
}

/* Place names must also survive the same sweep against each other, including
 * the ones the generated banks do not happen to contain today. */
console.log("and the full place vocabulary is mutually distinct");
{
  const PLACES = ["ones","tens","hundreds","thousands","ten thousands",
                  "hundred thousands","millions","tenths","hundredths","thousandths"];
  const bad = [];
  PLACES.forEach(k => PLACES.forEach(o => {
    if(k !== o && QT.grade(sa(k), o) === true) bad.push(o + " counted for " + k);
  }));
  ok(bad.length === 0, "each place is its own answer" + (bad.length ? " — " + bad.join("; ") : ""));
}

console.log("fill-in-the-blank gets the same treatment");
{
  const it = {type:"fill-blank", q:"the 7 is in the ___ place", a:["hundredths"]};
  ok(QT.grade(it, ["hundreths"]) === true, "a blank forgives a misspelling");
  ok(QT.grade(it, ["hundreds"]) !== true, "a blank still refuses a different place");
  const n = {type:"fill-blank", q:"___ of the cake", a:["0.6"]};
  ok(QT.grade(n, [".6"]) === true, "a blank accepts .6 for 0.6");
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
