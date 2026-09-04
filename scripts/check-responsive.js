#!/usr/bin/env node
/*
 * Does anything run off the side of the screen on a phone or an iPad?
 *
 *   node scripts/check-responsive.js              report every width
 *   node scripts/check-responsive.js --w 390      just one width
 *
 * WHY MEASURED RATHER THAN READ
 * index.html styles almost everything inline, so you cannot tell by reading the
 * CSS what a 390px screen does with it — there is no stylesheet to reason about
 * and a media query cannot reach an inline style anyway. The only honest answer
 * comes from laying the page out at that width and asking the browser.
 *
 * WHAT IT MEASURES
 * The page is loaded inside an iframe pinned to a device width, then every
 * element is asked for its box. Anything whose right edge sits past the viewport
 * is reported, worst first, along with the inline style that did it. A page that
 * scrolls sideways on a tablet is the specific failure this exists to catch:
 * a child cannot see the right-hand column and has no reason to suspect it is
 * there.
 *
 * index.html keeps its current view in memory rather than in the URL, so the
 * screens past the landing page cannot be linked to. They are reached the way a
 * child reaches them — by pressing the buttons — and a click path that finds
 * nothing to press reports that rather than quietly measuring the wrong screen.
 *
 * WHAT IT DOES NOT COVER, said plainly
 * The maths screens for one level, and the subject pages at their entry state.
 * Word Voyagers and Field Notes are measured as they open, not lesson by lesson,
 * and no screen is checked after a child has answered anything. A green run
 * means these screens fit; it is not a claim that every screen in the app does.
 *
 * Needs Chrome, and serves over http because the pages compile at runtime.
 */
const { spawnSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
process.chdir(ROOT);

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 8974;
const PROBE = ".rwd-probe.html";

if (!fs.existsSync(CHROME)) {
  console.log("  Chrome not found — cannot measure layout, skipping");
  process.exit(0);
}

// The widths that matter here: the boys use an iPad, and a phone is the
// narrowest thing this will ever meet.
const wi = process.argv.indexOf("--w");
const WIDTHS = wi > 0
  ? [{ w: parseInt(process.argv[wi + 1], 10), label: "custom" }]
  : [
      { w: 390, label: "iPhone portrait" },
      { w: 768, label: "iPad portrait" },
      { w: 1024, label: "iPad landscape" }
    ];

/* What to measure. `clicks` drives the app to a screen that cannot be reached by
 * URL — index.html keeps its view in memory, so the only way to see Practice Bay
 * is to press the buttons a child presses.
 *
 * The inner maths screens are the point of this list. Measuring only what
 * renders on load would have passed a build where the header ran off a phone
 * and Teacher HQ could not be tapped at all. */
const PAGES = [
  { page: "index.html", label: "landing" },
  { page: "index.html", label: "maths · mission map",
    clicks: [{ t: "5th Grade", i: 0 }, { t: "Start", i: 0 }] },
  { page: "index.html", label: "maths · practice bay",
    clicks: [{ t: "5th Grade", i: 0 }, { t: "Start", i: 0 }, { t: "Practice Bay", i: 0 }] },
  { page: "index.html", label: "maths · teacher hq",
    clicks: [{ t: "5th Grade", i: 0 }, { t: "Start", i: 0 }, { t: "Teacher HQ", i: 0 }] },
  { page: "word-voyagers.dc.html", label: "" },
  { page: "field-notes.dc.html", label: "" },
  { page: "japan.dc.html", label: "" }
];

/* The probe. It has to live under the served root to be same-origin with the
 * page it measures — reading a cross-origin iframe's layout is exactly what the
 * browser refuses to allow. Removed again in the finally below. */
fs.writeFileSync(PROBE, `<!doctype html><meta charset="utf-8">
<body style="margin:0"><pre id="out">pending</pre><script>
/* The markers are assembled at runtime and never written literally here. Spelt
 * out in the source, --dump-dom returns this script's own text and the reader
 * below matches the SOURCE rather than the result — which it did, reporting a
 * confident failure for every page while measuring nothing. */
var A="<"+"<RWD", B="RWD>"+">";
var p=new URLSearchParams(location.search), t=p.get("t"), w=+p.get("w");
var clicks=JSON.parse(p.get("c")||"[]");
var f=document.createElement("iframe");
f.setAttribute("style","width:"+w+"px;height:1200px;border:0");
f.src=t;
document.body.appendChild(f);
function emit(o){ document.getElementById("out").textContent=A+JSON.stringify(o)+B; }
function clickable(d){ return Array.prototype.slice.call(d.querySelectorAll(
  "button,[onclick],[style*='cursor:pointer'],[style*='cursor: pointer']")); }
/* Walk the click path, pausing between steps so each screen can render. A step
 * that finds nothing to press is reported rather than skipped — silently
 * measuring the wrong screen is how this check would lie. */
function step(n){
  if(n>=clicks.length) return setTimeout(measure, 2500);
  try{
    var d=f.contentDocument, want=clicks[n];
    var hits=clickable(d).filter(function(e){
      return (e.textContent||"").replace(/\\s+/g," ").trim().indexOf(want.t)>=0; });
    if(!hits[want.i||0]) return emit({ok:false, err:"click path broke: nothing matching "+JSON.stringify(want.t)});
    hits[want.i||0].click();
  }catch(e){ return emit({ok:false, err:String(e&&e.message||e)}); }
  setTimeout(function(){ step(n+1); }, 2500);
}
function measure(){
  var rep;
  try{
    var d=f.contentDocument, over=[], all=d.querySelectorAll("*");
    /* Content inside a deliberate horizontal scroller is not a defect — that is
     * the sanctioned way to carry something wide, and the mission map uses it.
     * What matters is whether the PAGE scrolls sideways, so anything sitting in
     * its own scrollable box is skipped. Without this the check condemns the fix
     * it asked for. */
    function inScroller(el){
      for(var p=el.parentElement;p;p=p.parentElement){
        var ox=f.contentWindow.getComputedStyle(p).overflowX;
        if(ox==="auto"||ox==="scroll") return true;
      }
      return false;
    }
    for(var i=0;i<all.length;i++){
      var el=all[i], r=el.getBoundingClientRect();
      if(r.width===0&&r.height===0) continue;
      if(r.right>w+1){
        if(inScroller(el)) continue;
        over.push({tag:el.tagName.toLowerCase(),
          right:Math.round(r.right), width:Math.round(r.width),
          txt:(el.textContent||"").replace(/\\s+/g," ").trim().slice(0,46),
          style:(el.getAttribute("style")||"").slice(0,120)});
      }
    }
    over.sort(function(a,b){return b.right-a.right;});
    rep={ok:true, scrollW:d.documentElement.scrollWidth, clientW:w,
         count:over.length, worst:over.slice(0,10)};
  }catch(e){ rep={ok:false, err:String(e&&e.message||e)}; }
  emit(rep);
}
setTimeout(function(){ step(0); }, 4500);
</script></body>`);

/* --dump-dom returns the DOM as HTML, so the probe's JSON comes back with its
 * quotes and angle brackets escaped. Decoding &amp; last matters: doing it
 * first would turn a literal &amp;quot; in question text into a quote and
 * corrupt the JSON. */
const unescapeHtml = s => s
  .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/&amp;/g, "&");

const server = spawn("python3", ["-m", "http.server", String(PORT)],
  { cwd: ROOT, stdio: "ignore" });
spawnSync("sh", ["-c",
  `until curl -s -o /dev/null http://localhost:${PORT}/; do sleep 0.3; done`],
  { timeout: 15000 });

let failed = false;
try {
  for (const { w, label } of WIDTHS) {
    console.log("\n  " + w + "px — " + label);
    for (const spec of PAGES) {
      const page = spec.page;
      const name = page + (spec.label ? "  [" + spec.label + "]" : "");
      const url = `http://localhost:${PORT}/${PROBE}` +
                  `?t=${encodeURIComponent(page)}&w=${w}` +
                  `&c=${encodeURIComponent(JSON.stringify(spec.clicks || []))}`;
      const r = spawnSync(CHROME, ["--headless", "--disable-gpu", "--no-sandbox",
        "--virtual-time-budget=20000", "--dump-dom", url],
        { encoding: "utf8", timeout: 90000, maxBuffer: 64 * 1024 * 1024 });
      const dom = r.stdout || "";
      // Escaped form only: the raw form would match the probe's own source.
      const m = dom.match(/&lt;&lt;RWD([\s\S]*?)RWD&gt;&gt;/);
      if (!m) {
        failed = true;
        console.log("    FAIL  " + name + " — probe produced no measurement");
        continue;
      }
      let rep;
      try { rep = JSON.parse(unescapeHtml(m[1])); }
      catch (e) {
        failed = true;
        console.log("    FAIL  " + name + " — unreadable report: " + e.message);
        continue;
      }

      if (!rep.ok) {
        failed = true;
        console.log("    FAIL  " + name + " — " + rep.err);
        continue;
      }
      if (rep.count === 0) {
        console.log("    ok    " + name + "  (nothing past " + w + "px)");
        continue;
      }
      failed = true;
      console.log("    FAIL  " + name + " — " + rep.count +
                  " element(s) overflow; page scrolls to " + rep.scrollW + "px");
      for (const o of rep.worst.slice(0, 5)) {
        console.log("            <" + o.tag + "> right=" + o.right +
                    " w=" + o.width + (o.txt ? "  " + JSON.stringify(o.txt) : ""));
        if (o.style) console.log("              style=" + o.style);
      }
    }
  }
} finally {
  try { server.kill(); } catch (e) {}
  try { fs.unlinkSync(PROBE); } catch (e) {}
}

console.log();
process.exit(failed ? 1 : 0);
