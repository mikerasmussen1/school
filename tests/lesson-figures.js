/* The teaching figures: do they draw, and can a bad one take the screen down?
 *
 * lesson-figures.js turns a small plain object into an SVG picture — a number
 * line with jumps, a place-value chart, column arithmetic with the carry lit
 * up. It sits on the render path for every lesson step from here on, and each
 * of its kinds reads a DIFFERENT set of fields off that object.
 *
 * That is the hazard this file exists for. A lesson author writing the next
 * fifty lessons will eventually leave a field out, and the failure that
 * matters is not a wrong picture — it is an exception thrown through
 * learnVals, which loses the whole lesson rather than one diagram. Two such
 * dereferences shipped in the first version (`bars` and `pv`) and neither was
 * reachable from the lessons written so far, so nothing noticed.
 *
 * So every kind is rendered three ways: as the documentation says to use it,
 * with nothing in it at all, and with junk in it.
 *
 * Run: node tests/lesson-figures.js
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

const C = window.__CURR, F = C.FIGURES;
let fails = 0, checks = 0;
const ok = (c, what) => { checks++; if(!c){ console.log("  FAIL  " + what); fails++; } };

/* A React stub that records the tree, so "did it draw" is a real question. */
const React = {createElement:(t,p,...c)=>({t:t, p:p||{}, c:c.flat().filter(Boolean)})};
const shapes = node => {
  if(!node || typeof node !== "object") return 0;
  const self = /^(rect|circle|line|path|polygon|polyline|ellipse|text|g)$/.test(node.t) ? 1 : 0;
  return self + (node.c || []).reduce((n, k) => n + shapes(k), 0);
};

console.log("the engine is loaded and wired");
ok(!!F, "FIGURES is on window.__CURR");
ok(/<script src="\.\/curriculum\/lesson-figures\.js/.test(page), "index.html loads it");
if(!F){ console.log("\nCANNOT CONTINUE"); process.exit(1); }

/* One well-formed example of every kind, taken from the module's own header. */
const GOOD = {
  nl:    {k:"nl", min:0, max:100, step:10, marks:[{v:47,l:"47"}], jumps:[{a:47,b:50,l:"+3"}]},
  pv:    {k:"pv", places:["tens","ones","tenths"], rows:[{d:["","4","2"],l:"4.2"}], shift:{by:1,dir:"L"}},
  bars:  {k:"bars", bars:[{n:4,k:3,l:"3/4"},{n:8,k:6,l:"6/8"}]},
  g100:  {k:"g100", n:35, l:"0.35"},
  xy:    {k:"xy", w:8, h:6, pts:[{x:3,y:4,l:"(3, 4)"}], path:true},
  ang:   {k:"ang", deg:90, l:"90°"},
  bar:   {k:"bar", bars:[{l:"Mon",v:12},{l:"Tue",v:9}], step:2},
  pict:  {k:"pict", rows:[{l:"Mon",n:3}], each:4},
  b10:   {k:"b10", h:2, t:3, o:4},
  col:   {k:"col", lines:["  23","× 14"], res:["  92","230 ","322"], hl:[[1,3]]},
  vol:   {k:"vol", l:4, w:3, h:2},
  groups:{k:"groups", g:4, n:6},
  tape:  {k:"tape", parts:[{v:"24"},{v:"?"}], total:"30"},
  poly:  {k:"poly", pts:[[0,0],[6,0],[6,4],[0,4]], sides:["6","4","6","4"], right:[0,1,2,3]},
  ruler: {k:"ruler", len:6, sub:4, pt:2.75, l:"2¾"},
  ld:    {k:"ld", d:"3", n:"372", q:"124", work:["-3  "," 07 ","- 6 ","  12","- 12","   0"]},
  clock: {k:"clock", h:3, m:40}
};

console.log("every kind draws when used as documented");
{
  const kinds = Object.keys(GOOD);
  ok(kinds.length >= 16, "the documented kinds are covered (" + kinds.length + ")");
  const dead = [];
  kinds.forEach(k => {
    let out = null;
    try { out = F.render(GOOD[k], React, 360); }
    catch(e){ dead.push(k + " threw: " + e.message); return; }
    if(!out) { dead.push(k + " rendered nothing"); return; }
    if(shapes(out) < 1) dead.push(k + " produced no shapes");
  });
  ok(dead.length === 0, "all of them draw" + (dead.length ? " — " + dead.join("; ") : ""));
}

/* ── THE ONE THAT MATTERS ─────────────────────────────────────────────────
 * A lesson author leaves a field out. The figure may draw nothing — that is
 * fine and visible — but it must not throw, because the throw is not confined
 * to the diagram. */
console.log("a fig missing its fields never throws");
{
  const threw = [];
  Object.keys(GOOD).forEach(k => {
    try { F.render({k:k}, React, 360); } catch(e){ threw.push(k + ": " + e.message); }
  });
  ok(threw.length === 0,
     "every kind survives an empty fig" + (threw.length ? " — " + threw.join("; ") : ""));
}

console.log("...nor when the fields are the wrong shape");
{
  const JUNK = [null, undefined, 0, "", [], {}, {bars:null}, {places:null}, {pts:null},
                {lines:null}, {rows:null}, {parts:null}, {work:null}, {marks:null}, {jumps:null}];
  const threw = [];
  Object.keys(GOOD).forEach(k => {
    JUNK.forEach((j, i) => {
      try { F.render(Object.assign({k:k}, j && typeof j === "object" ? j : {}), React, 360); }
      catch(e){ threw.push(k + " #" + i + ": " + e.message); }
    });
  });
  ok(threw.length === 0,
     "junk fields do not throw" + (threw.length ? " — " + threw.slice(0,5).join("; ") : ""));
}

/* ── A HOLE IN A LIST, NOT A MISSING LIST ─────────────────────────────────
 * Guarding the array and then trusting its contents is half a guard. Six kinds
 * read elements straight out of their list, so `bars:[null]` threw exactly as
 * hard as no `bars` at all — and an entry going missing while a lesson is
 * being edited is the likelier slip of the two. */
console.log("a list with a hole in it never throws");
{
  /* One entry per list a kind reads — not one per kind. Testing only `lines`
   * for col and only `work` for ld is how `hl` stayed unguarded through a
   * round that was specifically looking for unguarded lists. */
  const LISTY = {bars:"bars", bar:"bars", pict:"rows", tape:"parts",
                 pv:"places", nl:"marks", xy:"pts",
                 col:"lines", "col ":"res", "col  ":"hl", "col   ":"notes",
                 ld:"work", "ld ":"hl", "ld  ":"notes",
                 poly:"pts", "poly ":"sides", "poly  ":"right",
                 "nl ":"jumps"};
  const threw = [];
  Object.keys(LISTY).forEach(key => {
    const k = key.trim(), field = LISTY[key];
    [[null], [undefined], [null, null], [false], [0], [""], [{}], [[]]].forEach(bad => {
      const fig = Object.assign({}, GOOD[k], {k:k});
      fig[field] = bad;
      try { F.render(fig, React, 360); }
      catch(e){ threw.push(k + "." + field + " = " + JSON.stringify(bad) + ": " + e.message); }
    });
    // and a hole punched into an otherwise valid list
    const fig = JSON.parse(JSON.stringify(GOOD[k]));
    fig.k = k;
    if(Array.isArray(fig[field]) && fig[field].length){
      fig[field] = [null].concat(fig[field]);
      try { F.render(fig, React, 360); }
      catch(e){ threw.push(k + "." + field + " with a leading hole: " + e.message); }
    }
  });
  ok(threw.length === 0,
     "every list-reading kind survives a hole" +
     (threw.length ? " — " + threw.length + ": " + threw.slice(0,5).join("; ") : ""));
}

/* ── THE ONE A CRASH TEST CANNOT SEE ──────────────────────────────────────
 * Skipping a label must not MOVE the labels after it.
 *
 * poly.sides[i] labels the edge leaving pts[i], so an author skips an edge by
 * leaving a hole in the list. Route that list through a filtering guard and
 * nothing throws, nothing renders empty, no test goes red — the later labels
 * just slide one edge along, and a rectangle teaches a child that its short
 * side is 6. That is worse than a crash, because nothing reports it.
 *
 * All three spellings of "skip this one" have to behave identically. */
console.log("skipping a side label does not move the others");
{
  const texts = fig => {
    const out = [];
    (function walk(n){
      if(!n || typeof n !== "object") return;
      if(n.t === "text") out.push({x:Math.round(n.p.x), y:Math.round(n.p.y), s:String(n.c[0])});
      (n.c || []).forEach(walk);
    })(F.render(fig, React, 360));
    return out;
  };
  const rect = sides => ({k:"poly", pts:[[0,0],[6,0],[6,4],[0,4]], sides:sides});

  const base = texts(rect(["6", "", "4", ""]));       // label the bottom and the top
  ok(base.length === 2, "two labels drawn (" + base.length + ")");

  [["6", null, "4", null], ["6", false, "4", false], ["6", undefined, "4", undefined]]
    .forEach(sides => {
      const got = texts(rect(sides));
      const spelling = JSON.stringify(sides[1]);
      ok(got.length === base.length,
         "skipping with " + spelling + " draws the same number of labels (" +
         got.length + " vs " + base.length + ")");
      ok(JSON.stringify(got) === JSON.stringify(base),
         "and puts them in the same places with " + spelling +
         (JSON.stringify(got) === JSON.stringify(base) ? "" :
          " — got " + JSON.stringify(got) + " want " + JSON.stringify(base)));
    });
}

/* The same hazard one level down: `pts` is itself the list that `sides` and
 * `right` are indexed against. A missing vertex has no placeholder the way a
 * missing label has "", so a shape with a hole in it cannot be drawn correctly
 * at all — and drawing it ANYWAY, with every later label slid onto the wrong
 * corner, is the failure this whole section exists to prevent.
 *
 * A hole at the END was already caught by the per-index guards; one in the
 * MIDDLE was not, which is why this tests the middle. */
console.log("a shape with a missing corner draws nothing, not a wrong shape");
{
  const labels = fig => {
    const out = [];
    (function walk(n){
      if(!n || typeof n !== "object") return;
      if(n.t === "text") out.push({x:Math.round(n.p.x), y:Math.round(n.p.y), s:String(n.c[0])});
      (n.c || []).forEach(walk);
    })(F.render(fig, React, 360));
    return out;
  };
  const five = [[0,0],[6,0],[6,4],[3,6],[0,4]];
  const side = ["A","B","C","D","E"];

  const whole = labels({k:"poly", pts:five, sides:side});
  ok(whole.length === 5, "the whole shape labels every edge (" + whole.length + ")");

  [0, 2, 4].forEach(at => {
    const holed = five.slice(); holed[at] = null;
    const got = labels({k:"poly", pts:holed, sides:side});
    ok(got.length === 0,
       "a hole at corner " + at + " draws nothing rather than a mislabelled shape" +
       (got.length ? " — drew " + JSON.stringify(got) : ""));
  });

  // and a shape whose points are all fine still draws exactly as before
  const again = labels({k:"poly", pts:five, sides:side});
  ok(JSON.stringify(again) === JSON.stringify(whole), "a good shape is unaffected");
}

console.log("an unknown kind is refused quietly");
{
  let out, crashed = false;
  try { out = F.render({k:"no-such-kind"}, React, 360); } catch(e){ crashed = true; }
  ok(!crashed, "it does not throw");
  ok(!out || shapes(out) === 0, "and it does not invent a picture");
  let c2 = false;
  try { F.render(null, React, 360); F.render({}, React, 360); } catch(e){ c2 = true; }
  ok(!c2, "neither does a missing fig");
}

/* ── REGRESSION: the two that shipped broken ──────────────────────────────
 * Both read a field back through `f.` after taking a local with the fallback,
 * so both threw on a fig that omitted it. Neither was reachable from the
 * lessons written at the time, which is exactly why they needed a test. */
console.log("the two dereferences that shipped broken stay fixed");
{
  let e1 = null, e2 = null;
  try { F.render({k:"bars"}, React, 400); } catch(e){ e1 = e.message; }
  try { F.render({k:"pv"}, React, 400); } catch(e){ e2 = e.message; }
  ok(!e1, "bars without `bars`" + (e1 ? " — " + e1 : ""));
  ok(!e2, "pv without `places`" + (e2 ? " — " + e2 : ""));
}

console.log("narrow screens still get a real picture");
{
  const flat = [];
  Object.keys(GOOD).forEach(k => {
    let out = null;
    try { out = F.render(GOOD[k], React, 320); } catch(e){ flat.push(k + " threw"); return; }
    if(!out || shapes(out) < 1) flat.push(k);
  });
  ok(flat.length === 0, "every kind draws at 320px" + (flat.length ? " — " + flat.join(", ") : ""));
}

/* ── THE REAL CONTENT ─────────────────────────────────────────────────────
 * Not a sample: every fig in every authored lesson, through the real engine. */
console.log("every figure in every authored lesson draws");
{
  const A = C.LESSONS_AUTHORED || {};
  let n = 0; const bad = [];
  Object.keys(A).forEach(id => {
    (A[id].steps || []).forEach((st, i) => {
      if(!st.fig) return;
      n++;
      let out = null;
      try { out = F.render(st.fig, React, 360); }
      catch(e){ bad.push(id + " step" + (i+1) + " threw"); return; }
      if(!out || shapes(out) < 1) bad.push(id + " step" + (i+1) + " drew nothing");
    });
  });
  ok(n > 200, "there are real figures to check (" + n + ")");
  ok(bad.length === 0,
     "all " + n + " draw" + (bad.length ? " — " + bad.length + ": " + bad.slice(0,5).join(", ") : ""));
}

/* ── THE MERGE THAT ORDER USED TO DECIDE ──────────────────────────────────
 * The authored lessons arrive in several files. One of them assigned to the
 * shared object rather than merging, so it only worked because it happened to
 * load first — reorder the script tags and 55 lessons would vanish silently. */
console.log("the authored lessons merge rather than overwrite");
{
  const files = ["math-lessons-authored.js", "math-lessons-y3-u1.js",
                 "math-lessons-y3-u2.js", "math-lessons-y5-u2.js"];
  const assigns = [];
  files.forEach(f => {
    let src = "";
    try { src = fs.readFileSync(D + f, "utf8"); } catch(e){ return; }
    const merges = /LESSONS_AUTHORED\s*=\s*\n?\s*Object\.assign\(/.test(src)
                || /Object\.assign\(\s*window\.__CURR\.LESSONS_AUTHORED/.test(src);
    if(!merges && /window\.__CURR\.LESSONS_AUTHORED\s*=/.test(src)) assigns.push(f);
  });
  ok(assigns.length === 0,
     "no file overwrites the shared set" + (assigns.length ? " — " + assigns.join(", ") : ""));

  const A = C.LESSONS_AUTHORED || {};
  ok(Object.keys(A).length > 60,
     "and all of them are present together (" + Object.keys(A).length + ")");
}

console.log("a figure that throws costs its picture, not the lesson");
{
  ok(/try\{ return FG\.render\(/.test(page) || /try\s*\{\s*return FG\.render/.test(page),
     "learnVals catches around the render");
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
