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

## Question types

Every exercise in every subject is a list of items, and `curriculum/question-types.js`
is the one place that decides what an item is:

```js
{ id, type, t, q, a, hint }
```

- `id` — stable string, never reused or renumbered. The attempt log, the printed
  sheets and the photo scanner all key off it. Retire a bad item with
  `retired:true`; do not delete it.
- `type` — one of: `short-answer` (the default), `number-units`,
  `multiple-choice`, `true-false`, `fill-blank`, `ordering`, `multi-part`,
  `written-response`. `QTypes.list()` prints them.
- `t` — tier: `0` Warm-Up, `1` Core, `2` Challenge.
- `q` — the prompt. `a` — the answer in the shape the type expects
  (an array for `fill-blank` and `ordering`, an index or the option text for
  `multiple-choice`, absent for `written-response`, which takes a `rubric`).

An item written the old way — `q(t, question, answer, hint)` — is a
`short-answer` item, which is why the existing math banks needed no rewriting.
`QTypes.grade(item, response)` returns `true`, `false`, or `null` for
"a human marks this one". Never compare answers by hand.

Validate before you push: `QTypes.validateSet(set)` returns `{ok, errors}` and
catches an answer that is not one of the options, a blank count that does not
match, a missing rubric, a duplicate id.

## Questions come from the database

`curriculum/qbank.js` loads question sets from Firestore, one document per bank
(`questionbanks/y3`, `y5`, `la`, `japan`), and the database is authoritative.
Resolution order per bank:

1. the live document
2. the last document this device saw (localStorage) — an offline device keeps
   the newest questions it has ever been given
3. the files in this repo, unchanged

Step 3 is why nothing breaks: with nothing published, every exercise is the one
in the repo. A published bank that says nothing about a unit leaves that unit's
file version alone, so you can publish one mission at a time.

Publishing has no UI, and from a browser it cannot work: `firestore.rules`
denies client writes to `questionbanks` outright. Bank ids are public (`y3`,
`y5`), so the unguessable-id protection the rest of the ruleset relies on does
not apply, and an open write would let anyone who reads our JavaScript replace
every question a third-grader is served. Publishing is an ADMIN operation — the
Firebase console, or a script holding service-account credentials, both of which
bypass rules:

```js
QBank.publish("y3", mySets)   // validates first; refuses a broken bank
```

The validation and payload shaping are the valuable part of that function: it
refuses to publish a bank that would not load. Deploy the rules before expecting
a published bank to load.

`Worksheet Builder.dc.html` prints from the same loader, so a question fixed in
the database is fixed on the next printout. The 32 `Unit N` packs in this repo
are frozen snapshots and do not follow the database.

## Lessons are data too

`curriculum/lessons.js` loads `lessons/{bankId}` the same way question sets load:
database first, then this device's cached copy, then nothing. A lesson is slides
plus the questions that follow them:

```js
{id, setId, concept, title, source:"authored"|"generated", tier,
 slides:[{kind, head, body, work:[], note}], items:[…], uses, wins}
```

`kind` is one of `why`, `teach`, `example`, `your-turn`, `recap`. `concept` is
the match key — it is how a lesson gets reused instead of regenerated, so keep
slugs stable and specific (`area-model-2x1`, not `multiplication`).

The authored walkthroughs in `curriculum/math-y*.js` still use the older `steps`
shape and are NOT in this bank yet; the bank starts empty and fills up as
lessons are published.

## Dynamic difficulty

When a set closes under 70%, `curriculum/tutor.js` sends the run's per-item log
to the model and asks for three things: a proficiency read (what went well, what
did not), the one concept behind the misses, and a lesson (6–8 slides, two
worked examples, concrete → abstract) with 5–10 questions on that concept.

- Generated questions are limited to `short-answer`, `number-units` and
  `fill-blank`, so a round can be graded without a grown-up.
- Everything is validated before a child sees it: slides and question count
  through `LessonBank.validate`, questions through `QTypes.validateSet`. One
  retry with the errors fed back, then it gives up rather than show something
  broken.
- **Reuse before generation.** A lesson already in the bank for that concept
  wins over a new one, ranked by wins then fewest uses, so a lesson that works
  spreads.
- **Generated lessons do not publish themselves.** `firestore.rules` denies
  client writes to `lessons` for the same reason it denies them to
  `questionbanks`: bank ids are public, so the unguessable-id protection does
  not apply. The generated lesson is stored inline in that child's record, which
  is all the child needs. Promoting one that worked into the shared pool is an
  admin step — Teacher HQ's "Copy lesson JSON" hands over the object, and the
  Firebase console or a service-account script writes it.
- Three rounds maximum. Each later round is told what was already tried and is
  asked to change the representation, not the difficulty. After three, generation
  stops and Teacher HQ flags it red as "needs you".
- Rounds live inside each child's synced record under `dyn.<setId>.rounds`, with
  the lesson stored inline so it still works offline.

The model is Gemini, using the browser key already in `index.html` — which is
referrer-locked to `mikerasmussen1.github.io` and localhost. Generation therefore
only runs on the real site or a local server; anywhere else the call 403s and the
app carries on without it.

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
