# Adding curriculum

Baskin School is one app with several subjects. Content lives in `curriculum/`;
`index.html` reads it and does not need to change when a subject grows.

```
curriculum/subjects.js        the subject registry — read this first
curriculum/shared.js          tiers, gates, bands, weekly rhythm
curriculum/math-y1.js         Grade 3 math, Missions 01–08
curriculum/math-y2.js         Grade 5 math, Missions 01–08
curriculum/extra-banks.js     extra practice items, appended by set id
curriculum/registry.js        math's courses + its landing-page card
curriculum/language-arts.js   Word Voyagers
curriculum/japan-unit.js      the Japan unit's landing-page card
```

Each file is a plain script. They load in the order above, so a file can use
anything defined in the ones before it.

## The landing page

When a child signs in they land on a subject picker, not on math. Each card
comes from a `Subjects.register({...})` call. The full field list is documented
at the top of `curriculum/subjects.js` — read that before writing a subject.

```js
window.Subjects.register({
  id: "la",                       // permanent: progress is stored under it
  name: "Word Voyagers",
  tagline: "Reading · Writing · Words",
  color: "#A78BFA",
  glyph: "A",
  gradient: "linear-gradient(150deg,#A78BFA,#60A5FA)",
  blurb: "Two sentences for the card.",
  status: "soon",                 // "live" once there is something to do
  order: 20,
  levels: [                       // optional — the child picks one on the card
    {id:"g3", label:"3rd Grade", sub:"Year One"},
    {id:"g5", label:"5th Grade", sub:"Year Two"}
  ],
  open: "stub",                   // "builtin" | "stub" | {href:"your-page.html"}
  stub: {heading:"…", lines:["…"], footer:"…"}
});
```

Levels are per subject and per child: a child can read at one level and do math
at another. A subject that declares `levels` will not open until the child has
picked one, and the pick is saved as `slice.subjects.<id>.level`. Leave `levels`
off for a subject that has only one track — the Japan unit does.

## Progress in the database

Every subject gets its own namespace inside each child's record, and that record
syncs to Firestore per child automatically:

```
slice.subjects.<id> = {
  opened: 12,             // times started — the app maintains these four
  last:   1756...,        // ms timestamp
  days:   [20693, ...],   // day numbers, last 60
  level:  "g5",           // which of your `levels` the child picked
  data:   { ... }         // yours alone
}
```

Put anything your subject needs in `data`. Nothing outside your subject reads
or writes it. Do **not** write at the top level of the slice — the math keys
(`pHist`, `pAns`, `pStreak`, `sprintHist`, `curriculum`) live there for
historical reasons and are not yours. Teacher HQ shows sessions, last-opened and
days-this-week per subject with no work from you.

## Working on this together

Add yourself as a collaborator on the repo and work on a branch:

```
git checkout -b language-arts
# edit curriculum/language-arts.js
git add . && git commit -m "Word Voyagers, Unit 01"
git push -u origin language-arts
```

Then open a pull request. Nobody edits the same file, so merges stay clean —
that is the whole reason the content is split out. The only shared file a new
subject touches is the one `<script src>` line in `index.html`.

## Adding a subject

1. Write `curriculum/<your-subject>.js` and call `Subjects.register({...})`.
2. Add one `<script src="./curriculum/<your-subject>.js"></script>` line in
   `index.html`, after `registry.js`.
3. That is all. The landing page, the header and Teacher HQ pick it up.

A subject can be a page of its own (`open:{href:"word-voyagers.dc.html"}`) — the
Japan unit works that way — or it can ask for screens inside the app. A page of
your own is the easier place to start: you own the whole file.

## The math shapes (a reference, not a requirement)

Math uses tiered problem banks because arithmetic has right answers. Reading and
writing probably want passages, prompts and rubrics instead. Borrow from the
shapes below only where they fit.

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
