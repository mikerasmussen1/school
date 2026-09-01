# Adding curriculum

Content lives in `curriculum/`. The app (`index.html`) reads it and never needs
to change when you add a subject.

```
curriculum/shared.js       tiers, gates, bands, weekly rhythm — all subjects
curriculum/math-y1.js      Grade 3 math, Missions 01–08
curriculum/math-y2.js      Grade 5 math, Missions 01–08
curriculum/extra-banks.js  extra practice items, appended by set id
curriculum/registry.js     the list of curricula the login screen offers
```

Each file is a plain script that puts its exports on `window.__CURR`. They load
in the order above, so a file can use anything defined in the ones before it.

## Working on this together

Add yourself as a collaborator on the repo and work on a branch:

```
git checkout -b language-arts
# edit curriculum/language-arts.js
git add . && git commit -m "Language arts, Unit 01"
git push -u origin language-arts
```

Then open a pull request on GitHub. Nobody edits the same file, so merges stay
clean — that is the whole reason the content is split out.

## Adding a subject

1. Copy `curriculum/math-y1.js` to `curriculum/language-arts.js` and replace the
   content. Keep the `window.__CURR` header and footer; list your own names in
   the footer's `Object.assign`.
2. Add a `<script src="./curriculum/language-arts.js"></script>` line in
   `index.html`, before `registry.js`.
3. Add an entry to `CURRICULA` in `curriculum/registry.js`. That is what puts it
   on the student login screen.

## The shapes

**Unit** — one mission.

```js
{n:1, name:"Sentence Builders", short:"Sentences", color:"#38BDF8",
 weeks:"1–4", badge:"¶", size:92, glyph:"26px",
 bigQ:"What makes a sentence a sentence and not just words?",
 goal:"…", why:"…", project:"…"}
```

**Week** — one week of the mission. `days` drives the printed plan.

```js
{n:1, title:"Subjects and Predicates", gate:"Full worksheets",
 gateColor:"#4ADE80", isFull:true, summary:"…",
 days:[{day:"Mon · 1.1", title:"…", detail:"…", tiers:[0,1,2]}]}
```

**Practice set** — five per week. `w` is the week number; `label` shows on the
tab; `id` must be unique across the whole file and never change once students
have answered it (progress is stored by set id).

```js
{id:"la1w1p1", w:1, label:"1.1", title:"Find the Subject",
 note:"One line of instruction, in your voice.",
 items:[ /* see below */ ]}
```

**Item** — `t` is the tier: 0 warm-up, 1 core, 2 challenge. Aim for roughly
6 / 5 / 2 in that order, about 26 items per set. The Streak Run serves them in
array order and closes when a student gets 5 right in a row (minimum 10
attempted), so put your easiest items first.

```js
{t:0, q:"The dog barked. Type the subject.", a:"dog"}
{t:2, q:"…", a:"…", hint:"Shown only after a wrong answer."}
```

Answers are compared with spaces, commas and capitals removed, so `Dog`,
`dog` and ` dog ` all match `dog`. Numeric answers need no commas. Fractions
are written `3/4`. Keep answers short — students type them on a phone.

**Lesson walkthrough** — optional, keyed by set id. Steps animate on the
teaching stage above the practice.

```js
{title:"…", sub:"Week 1 · subjects", steps:[
  {cap:"What the narrator says on this step.",
   cols:[{l:"The dog", s:8}, {l:"barked", s:6}],
   rows:[{l:"", s:4}], cells:[{v:"S"}, {v:"P"}], sum:"Subject + predicate"}]}
```

A set with no walkthrough of its own falls back to its week's lesson, so one
lesson per week is enough to start.

## Before you push

Open `index.html` in a browser and check the console is clean, then click
through: your unit on the map, one week in Practice Bay, a Streak Run to the
end, and Teacher HQ. If a set id is wrong the set simply will not appear.

Print packs and worksheet packs are separate files (`Unit N Print Pack.dc.html`,
`Unit N Worksheets.dc.html`) and are generated to PDF by hand — ask before
touching those; there is a strict grid regime.

## How a worksheet relates to a set

A worksheet is a **replacement** for doing the set in the app, not an extra. It
prints the set's whole bank across two pages — front is Warm-Up and Core, back
is Challenge, working space and the error journal — so a paper day and a screen
day produce the same evidence.

Two rules the generator follows, and the app mirrors in code:

1. Items are deduped **in bank order** (same question text = one item), then
   grouped Warm-Up → Core → Challenge.
2. They are numbered **1..N straight through the sheet**, front to back. That
   printed number is what the photo scanner reads, and `pOnPaper` in
   `index.html` builds the same list to translate printed number back to the
   item's index in the bank.

If you change the dedupe or the grouping in one place you must change it in the
other, or scanned answers land on the wrong problems. The Core section also
prints a stop rule — the paper version of the Streak Run — so a fluent child
stops after six and a struggling one keeps going.

A set with a short Core (few unique tier-1 items) prints a short sheet, so put
real, distinct problems in the extra banks rather than repeating Warm-Up facts.
