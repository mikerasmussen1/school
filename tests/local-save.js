/* The local write is coalesced. Does it still always land?
 *
 * persist() used to serialise the whole store to localStorage synchronously on
 * every saveState — and typing an answer calls saveState per keystroke, so a
 * child late in the year paid a half-megabyte JSON.stringify per character.
 * That write is now throttled.
 *
 * Throttling progress is only safe if it cannot LOSE progress, and there is a
 * standing requirement that any lesson's work is recorded for the teacher. So
 * this runs the real functions against a fake clock and a spying localStorage
 * and asks the questions that matter:
 *
 *   - does rapid typing collapse into few writes?           (the point)
 *   - does a write still land afterwards?                   (trailing edge)
 *   - is it the LATEST state that lands, never a stale one?
 *   - does a closing tab flush immediately?
 *
 * Run: node tests/local-save.js
 */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), D = ROOT + "/curriculum/";

/* A clock we drive by hand, so "250ms later" is exact instead of a real wait. */
let now = 0;
const timers = [];
global.setTimeout = (fn, ms) => { timers.push({at: now + (ms||0), fn: fn, live: true}); return timers.length; };
global.clearTimeout = id => { if(timers[id-1]) timers[id-1].live = false; };
const tick = ms => {
  now += ms;
  timers.filter(t => t.live && t.at <= now).forEach(t => { t.live = false; t.fn(); });
};

const writes = [];
global.localStorage = {
  getItem: () => null,
  setItem: (k, v) => { writes.push({k: k, v: v}); },
  removeItem(){}
};

const handlers = {};
global.window = global;
global.addEventListener = (name, fn) => { (handlers[name] = handlers[name] || []).push(fn); };
global.removeEventListener = function(){};
global.document = {
  addEventListener: (name, fn) => { (handlers["doc:" + name] = handlers["doc:" + name] || []).push(fn); },
  removeEventListener(){}, visibilityState: "visible", createElement: () => ({style:{}}), body: {}
};
global.setInterval = ()=>0; global.clearInterval = ()=>{};
global.matchMedia = ()=>({matches:false, addEventListener(){}, removeEventListener(){}});
global.fetch = async()=>({ok:false, json:async()=>({})});
global.location = {search:"", href:""}; global.navigator = {onLine:true};
global.speechSynthesis = {cancel(){},speak(){}}; global.SpeechSynthesisUtterance = function(){};
global.React = {createElement:(t,p,...c)=>({__el:t, props:p, children:c})};
global.scrollTo = ()=>{};
window.__CURR = {};
window.Subjects = {register(){}, all:()=>[], get:()=>null, has:()=>false};

const page = fs.readFileSync(ROOT + "/index.html", "utf8");
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m => m[1])
  .forEach(m => { try { require(D + m + ".js"); } catch(e){} });
class DCLogic{ setState(p){ this.state = {...this.state, ...(typeof p==="function"?p(this.state):p)}; } }
global.DCLogic = DCLogic;

/* Pull the real functions out of index.html's own scope — not a copy of them.
 * A test over a re-implementation of a throttle proves nothing about the one
 * that ships. */
const parts = page.split("data-dc-script>");
const src = (parts[1] || page.split(/<script(?![^>]*src)[^>]*>/).pop()).split("</script>")[0];
const A = eval("(function(){ " + src +
  "\n return {queueLocalSave: queueLocalSave, flushLocalSave: flushLocalSave, Storage: Storage}; })()");

let fails = 0, checks = 0;
const ok = (c, what) => { checks++; if(!c){ console.log("  FAIL  " + what); fails++; } };

ok(typeof A.queueLocalSave === "function", "the real queueLocalSave was found");
ok(typeof A.flushLocalSave === "function", "the real flushLocalSave was found");

const reset = () => { writes.length = 0; A.flushLocalSave(); writes.length = 0; };

console.log("typing a word does not write once per letter");
{
  reset();
  "hundredths".split("").forEach((_, i) => A.queueLocalSave({typed: i + 1}));
  ok(writes.length === 0, "nothing written while the keys are still coming (" + writes.length + ")");
  tick(300);
  ok(writes.length === 1, "one write, not ten (" + writes.length + ")");
  ok(JSON.parse(writes[0].v).typed === 10, "and it holds the LAST keystroke, not the first");
}

console.log("the write always lands, even if typing never stops");
{
  reset();
  // A debounce that resets on each key would starve here forever.
  for(let i = 0; i < 40; i++){ A.queueLocalSave({n: i}); tick(50); }
  ok(writes.length >= 6, "a long burst still writes repeatedly (" + writes.length + " writes)");
  ok(writes.length <= 12, "but nothing like once per key (" + writes.length + " for 40 keys)");
  const last = JSON.parse(writes[writes.length - 1].v).n;
  tick(300);
  const after = JSON.parse(writes[writes.length - 1].v).n;
  ok(after === 39, "and the final state lands when the burst ends (n=" + after + ", was " + last + ")");
}

console.log("a closing tab does not lose the last answer");
{
  reset();
  A.queueLocalSave({answer: "written just before the tab went"});
  ok(writes.length === 0, "still pending");
  (handlers["pagehide"] || []).forEach(fn => fn());
  ok(writes.length === 1, "pagehide flushed it (" + writes.length + ")");
  ok(JSON.parse(writes[0].v).answer === "written just before the tab went",
     "with the right content");
}

console.log("and neither does switching away from it");
{
  reset();
  A.queueLocalSave({answer: "backgrounded"});
  global.document.visibilityState = "hidden";
  (handlers["doc:visibilitychange"] || []).forEach(fn => fn());
  ok(writes.length === 1, "a hidden tab flushed it (" + writes.length + ")");
  global.document.visibilityState = "visible";
}

console.log("a flush leaves nothing behind to write twice");
{
  reset();
  A.queueLocalSave({x: 1});
  A.flushLocalSave();
  ok(writes.length === 1, "one write");
  tick(500);
  ok(writes.length === 1, "and the cancelled timer does not fire a second (" + writes.length + ")");
}

console.log("nothing queued means nothing written");
{
  reset();
  A.flushLocalSave();
  tick(500);
  ok(writes.length === 0, "an idle flush writes nothing (" + writes.length + ")");
}

console.log("the whole store is what gets written");
{
  reset();
  A.queueLocalSave({profiles:[{id:"p1"}], data:{p1:{pAns:{s1:{0:"7"}}}}});
  tick(300);
  const blob = JSON.parse(writes[0].v);
  ok(blob.data.p1.pAns.s1["0"] === "7", "the answer survives the round trip");
}

console.log(fails ? "\n" + fails + " FAILED of " + checks : "\nall " + checks + " checks passed");
process.exit(fails ? 1 : 0);
