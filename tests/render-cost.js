/* What does ONE KEYSTROKE cost?
 *
 * React re-renders the whole component on every setState, and typing an answer
 * calls setState per character — so everything renderVals() touches runs once
 * per letter. That was ~340ms a keystroke for a child two thirds through the
 * year, and typing was unusable.
 *
 * The cause was not any one slow function. QBank.setsFor() re-normalised the
 * file sets on every call, handing back FRESH OBJECTS each time, and mix.js
 * caches a composed set against the source object it came from
 * (`hit.from === set`). Fresh objects meant that cache never hit once, so every
 * keystroke recomposed the unit — shuffling every item of every earlier set.
 *
 * So the thing to guard is not a stopwatch, it is the IDENTITY. If setsFor ever
 * goes back to returning new objects for the same input, the cache silently
 * stops hitting and the app gets slow again with every test still green. The
 * budget at the bottom is the backstop for causes nobody predicted.
 *
 * Run: node tests/render-cost.js
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), D = ROOT + "/curriculum/";

global.window = global; window.__CURR = {};
window.Subjects = {register(){}, all:()=>[], get:()=>null, has:()=>false};
global.localStorage = {getItem:()=>null, setItem(){}, removeItem(){}};
global.document = {addEventListener(){}, removeEventListener(){}, createElement:()=>({style:{}}), body:{}};
global.addEventListener = global.removeEventListener = function(){};
global.setInterval = ()=>0; global.clearInterval = ()=>{};
global.setTimeout = ()=>0; global.clearTimeout = ()=>{};
global.matchMedia = ()=>({matches:false, addEventListener(){}, removeEventListener(){}});
global.fetch = async()=>({ok:false, json:async()=>({})});
global.location = {search:"", href:""}; global.navigator = {onLine:true};
global.speechSynthesis = {cancel(){},speak(){}}; global.SpeechSynthesisUtterance = function(){};
global.React = {createElement:(t,p,...c)=>({__el:t, props:p, children:c})};
global.scrollTo = ()=>{};

const page = fs.readFileSync(ROOT + "/index.html", "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m => m[1])
  .forEach(m => { try { require(D + m + ".js"); } catch(e){} });
class DCLogic{ setState(p){ this.state = {...this.state, ...(typeof p==="function"?p(this.state):p)}; } }
global.DCLogic = DCLogic;
const parts = page.split("data-dc-script>");
const src = (parts[1] || page.split(/<script(?![^>]*src)[^>]*>/).pop()).split("</script>")[0];
const C = eval("(function(){ " + src + "\n return Component; })()");

const CUR = window.__CURR, SETS = CUR.ALL_SETS || [], QT = window.QTypes;
let fails = 0, checks = 0;
const ok = (c, what) => { checks++; if(!c){ console.log("  FAIL  " + what); fails++; } };

const c = new C({});
c.props = {}; c.state = {};
if(c.initState) Object.assign(c.state, c.initState() || {});
c.state.profiles = [{id:"p1", name:"Brock", grade:5}];
c.state.activeId = "p1";

console.log("the same unit resolves to the SAME objects");
{
  const a = c.setsFor(1), b = c.setsFor(1);
  ok(a.length > 0, "a unit has sets (" + a.length + ")");
  ok(a.every((s, i) => s === b[i]),
     "every set is the identical object on a second call — mix.js caches on this");

  // A published bank replaces the file version; identity must hold there too.
  const bank = window.QBank;
  const before = bank.banks["y3"];
  bank._index("y3", (CUR.ALL_SETS || []).slice(0, 12).map(s => ({...s})), {source:"db", version:1});
  const d = bank.setsFor("y3", 1, []), e = bank.setsFor("y3", 1, []);
  ok(d.every((s, i) => s === e[i]), "a published bank is stable too");
  if(before) bank.banks["y3"] = before; else delete bank.banks["y3"];
}

console.log("but a real change is not cached over");
{
  const bank = window.QBank;
  const one = [{id:"t1", u:99, w:1, items:[{q:"2+2", a:"4"}]}];
  const two = [{id:"t1", u:99, w:1, items:[{q:"2+2", a:"4"}, {q:"3+3", a:"6"}]}];
  const r1 = bank.setsFor("y3", 99, one);
  const r2 = bank.setsFor("y3", 99, two);
  ok(r2.length === 1 && (r2[0].items || []).length === 2,
     "different file sets produce a fresh answer, not the cached one");
  const r3 = bank.setsFor("y3", 99, two);
  ok(r3[0] === r2[0], "and the new answer is itself stable");
  ok(r1 !== r2, "the two results are genuinely different objects");
}

console.log("the mix cache actually hits");
{
  const MIX = CUR.MIX;
  if(MIX){
    let composed = 0;
    const real = MIX.compose;
    // applyAll calls the module-local compose, so count through setsFor timing
    // instead: a second call must not do the work again.
    const t0 = process.hrtime.bigint(); c.setsFor(3); const first = Number(process.hrtime.bigint()-t0)/1e6;
    const t1 = process.hrtime.bigint(); for(let i=0;i<50;i++) c.setsFor(3);
    const each = Number(process.hrtime.bigint()-t1)/1e6/50;
    ok(each < Math.max(first, 0.05),
       "a repeat call is cheaper than the first (" + first.toFixed(2) + "ms then " + each.toFixed(3) + "ms)");
    ok(each < 1, "and a repeat call is under a millisecond (" + each.toFixed(3) + "ms)");
  } else ok(false, "mix.js is loaded");
}

/* ── the backstop ─────────────────────────────────────────────────────────
 * A child most of the way through the year, typing. Budgets are deliberately
 * loose — this is here to catch a hundredfold regression, not to police a
 * millisecond. */
console.log("a keystroke stays cheap for a child late in the year");
{
  const pAns={}, pChecked={}, pLog={}, pHist={}, lstep={}, pStreak={};
  SETS.slice(0, 240).forEach((s, n) => {
    const items = s.items || [];
    pChecked[s.id + "|all"] = true; pAns[s.id] = {};
    items.forEach((it, i) => { pAns[s.id][i] = String(it.a).slice(0, 8); });
    pLog[s.id] = items.slice(0, 60).map((it, i) =>
      ({qid: QT ? QT.idFor(s, it) : s.id + "-" + i, ok: i % 3 !== 0, d: 100 + n, ts: 1, i: i}));
    pHist[s.id] = [{n: items.length, r: (items.length * 0.8) | 0, d: 100 + n}];
    lstep[s.id] = 3;
    pStreak[s.id + "|1"] = {att: 5, right: 5, d: 100 + n, goal: 5, closed: true};
  });
  Object.assign(c.state, {pAns, pChecked, pLog, pHist, lstep, pStreak,
    gate: false, view: "practice", pset: (SETS[240] || SETS[0]).id, subject: "math"});

  const time = fn => { fn(); const t = process.hrtime.bigint();
    for(let i = 0; i < 10; i++) fn();
    return Number(process.hrtime.bigint() - t) / 1e6 / 10; };

  const day = time(() => c.dayVals());
  const learn = time(() => c.learnVals());
  const review = time(() => c.reviewRows());
  const total = day + learn + review;
  console.log("     dayVals " + day.toFixed(2) + "ms · learnVals " + learn.toFixed(2) +
              "ms · reviewRows " + review.toFixed(2) + "ms");
  ok(day < 25, "dayVals stays well under the 168ms it once cost (" + day.toFixed(2) + "ms)");
  ok(learn < 25, "learnVals likewise (" + learn.toFixed(2) + "ms)");
  ok(review < 25, "reviewRows likewise (" + review.toFixed(2) + "ms)");
  ok(total < 50, "and the three together stay typeable (" + total.toFixed(2) + "ms)");
}

/* The one thing here that reading the source CAN settle: that persist() goes
 * through the coalescing path at all rather than writing inline. Whether that
 * path then behaves — collapses a burst, always lands, flushes on pagehide,
 * never writes a stale blob — is a question about behaviour, and it is asked
 * properly against the real functions and a fake clock in tests/local-save.js.
 * This is the wiring check, and it does not claim to be more. */
console.log("persist() goes through the coalescing write");
{
  ok(/queueLocalSave\(this\.store\)/.test(page),
     "persist() queues the write rather than writing inline");
  ok(!/\bStorage\.save\(this\.store\)/.test(page),
     "and nothing still writes the store synchronously on the render path");
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
