#!/usr/bin/env node
/*
 * The Language Arts pace rule, and the two drills that grew.
 *
 * The pace rule deliberately overrides a documented design decision ("there is
 * NO CAP in front of you"), so it has to behave exactly as advertised or it
 * should not exist:
 *
 * 1. A child who has closed nothing today can work — the frontier is open.
 * 2. A child who has closed the limit is held at "paced", NOT "ahead": he is
 *    not blocked by a gap and must not be told to go and finish Monday.
 * 3. Yesterday's closes never count against today.
 * 4. setPace(0) restores the original uncapped behaviour exactly.
 * 5. Days already finished stay reachable — the cap must never re-lock work
 *    that is done, or a child loses access to his own week.
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
global.setInterval = () => 0; global.clearInterval = () => {};
global.setTimeout = () => 0; global.clearTimeout = () => {};
global.matchMedia = () => ({matches:false, addEventListener(){}, removeEventListener(){}});
global.fetch = async () => ({ ok:false, json: async () => ({}) });
global.location = { search:"", href:"" };

/* The LA modules are loaded by the Word Voyagers page, not index.html, so the
 * file list comes from there — same reason the other checks read a page rather
 * than carrying a hardcoded array that goes stale. */
["index.html", "word-voyagers.dc.html"].forEach(f => {
  const page = fs.readFileSync(path.join(ROOT, f), "utf8");
  [...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)]
    .map(m => m[1])
    .forEach(m => { try { require(path.join(ROOT, "curriculum", m + ".js")); } catch (e) {} });
});

const M = window.__CURR.LA_MASTERY;
const fails = [];
const note = m => fails.push(m);
if (!M || !M.dayStatus) { console.error("  FAIL  LA_MASTERY did not load\n"); process.exit(2); }

const G = "y1";
const now = new Date(2026, 8, 8, 10, 0, 0).getTime();          // 8 Sep 2026, 10am
const yesterday = now - 24 * 3600 * 1000;
const doneMonday = { [M.endKey(G, 1, "Mon")]: true };

// 1. nothing closed today → the frontier is open
let st = M.dayStatus(G, 1, "Tue", doneMonday, {}, {}, now);
if (st.state !== "current") note(`open frontier should be "current", got "${st.state}"`);

// 2. at the limit → paced, not "ahead"
const closedTwoToday = { [G + ":1:Mon"]: now - 3000, [G + ":1:Tue"]: now - 1000 };
const doneMonTue = { [M.endKey(G,1,"Mon")]: true, [M.endKey(G,1,"Tue")]: true };
st = M.dayStatus(G, 1, "Wed", doneMonTue, {}, closedTwoToday, now);
if (st.state !== "paced") note(`at the limit should be "paced", got "${st.state}"`);
if (st.state === "paced" && !st.blocked) note("paced day is not marked blocked");
if (st.state === "ahead") note('paced day reported as "ahead" — child would be told to finish an earlier day');

// 3. yesterday does not count
const closedYesterday = { [G + ":1:Mon"]: yesterday, [G + ":1:Tue"]: yesterday };
st = M.dayStatus(G, 1, "Wed", doneMonTue, {}, closedYesterday, now);
if (st.state !== "current") note(`yesterday's closes should not cap today, got "${st.state}"`);

// 4. setPace(0) restores the old behaviour
M.setPace(0);
st = M.dayStatus(G, 1, "Wed", doneMonTue, {}, closedTwoToday, now);
if (st.state !== "current") note(`setPace(0) should be uncapped, got "${st.state}"`);
M.setPace(2);

// 5. finished days stay reachable
st = M.dayStatus(G, 1, "Mon", doneMonTue, {}, closedTwoToday, now);
if (st.state !== "past") note(`a finished day should stay "past", got "${st.state}"`);

// 6. a missing closedAt map caps nobody (older saves)
st = M.dayStatus(G, 1, "Wed", doneMonTue, {}, undefined, now);
if (st.state !== "current") note(`no closedAt map should mean no cap, got "${st.state}"`);

/* 7. The cap must be a cap. A paced day has to hide the start control AND
 * refuse the action, or it is a banner the child presses past — which is
 * exactly the behaviour that prompted the rule. Checked by reading the page,
 * since there is no browser here to click. */
{
  const page = fs.readFileSync(path.join(ROOT, "word-voyagers.dc.html"), "utf8");
  if (!/showStart:[^,]*seq\.state!=="paced"/.test(page))
    note("showStart does not exclude the paced state — the START button would still render");
  const sd = page.slice(page.indexOf("startDay=()=>"), page.indexOf("startDay=()=>") + 700);
  if (!/state==="paced"/.test(sd) || !/return;/.test(sd))
    note("startDay does not refuse a paced day — the action is reachable without the button");
  // and the excuse valve must still exist, or a paced day has no way through
  if (typeof M.excuseKey !== "function") note("no excuse valve — a paced day would have no key");
}

console.log(`  pace: limit ${M.DAYS_PER_SITTING}/day · paced-not-ahead · yesterday ignored · setPace(0) uncaps · start blocked`);

// ---- the two drills that grew ------------------------------------------
for (const [label, key] of [["y1", "LA_Y1"], ["y2", "LA_Y2"]]) {
  const Y = window.__CURR[key];
  if (!Y || !Y.spellingSetFor) { note(`${label}: curriculum did not load`); continue; }
  const sp = Y.spellingSetFor(1).items.length;
  const list = (Y.SPELLING_LISTS[1] || []).length;
  if (sp !== list) note(`${label}: spelling set serves ${sp} of ${list} words`);
  console.log(`  ${label}: spelling bank ${list} words · grammar bank ${Y.grammarSetFor(1).items.length} items`);
}

// The Friday review draws on several weeks now, so the bank it pulls from must
// actually grow with the week number — otherwise "cumulative" is a comment.
const Y1 = window.__CURR.LA_Y1;
if (Y1 && Y1.grammarSetFor) {
  const wk = w => { const o = []; const seen = {};
    for (let x = w; x > w - 4 && x >= 1; x--) (Y1.grammarSetFor(x).items || []).forEach(i => { if (!seen[i.id]) { seen[i.id] = 1; o.push(i); } });
    return o.length; };
  const w1 = wk(1), w6 = wk(6);
  console.log(`  Friday review pool: week 1 → ${w1} items · week 6 → ${w6} items (draws 10)`);
  if (w6 <= w1) note("cumulative pool does not grow with the week — review is not cumulative");
  if (w6 < 10) note(`cumulative pool at week 6 is only ${w6}, fewer than the 10 served`);
}

if (fails.length) {
  console.error("\n  FAIL\n" + fails.map(f => "   - " + f).join("\n") + "\n");
  process.exit(1);
}
console.log("  PASS  pace rule behaves, drills serve their full banks, review is cumulative\n");

// Explicit exit: scripts that load the curriculum into a fake window can leave Node's timers alive.
process.exit(0);
