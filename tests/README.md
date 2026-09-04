# Baskin School tests

Run any of these with `node tests/<file>.js` from the repository root. Each
exits non-zero on failure and prints what it checked.

Most of these are Word Voyagers, which is where the suite started.
`subject-summary.js` is the first that spans every subject.

| file | what it asserts |
|---|---|
| `today-content.js` | Every step of every day, both grades, all 36 weeks, opens exactly one assignment on the Today tab **and that assignment has real content** — a passage over 80 characters, a prompt over 20, a word list with words, a drill ready to start. 1,512 step-assignments. |
| `find-the-mistake.js` | The daily correction drill: present on every day as step 2, two stages in order, the sentence shown once and never repeated inside the question, options that are real words from the sentence, the prompt matching the kind of fault, four distinct repair options, the step ticking with a score, and a finished drill not surviving a change of day, week or grade. |
| `handwriting.js` | All 72 handwriting assignments carry a title, instructions, a labelled sentence and a working listen button; no week in either grade still tells the child to photograph the page; and no prompt says "this sentence" without supplying one. |
| `no-photo.js` | Neither grade has a photo step or capture buttons, the grown-up marking step survives, steps renumber with no gap, and a child can still finish Thursday. |
| `parent-override.js` | A parent can pass a broken step in either grade on any day; a note is required; the row reads "Passed by a grown-up" rather than "Done" and never claims a score; the day can still be finished; the override is listed on the parent tab with grade, week, day and note, can be cleared with "Fixed", syncs, and is wiped by a reset. |
| `quote.js` | The quote ticks from the card it is printed on, on all five days, and opening an assignment does not scroll the page away from it. |
| `math-storage.js` | **Maths.** Where maths' twelve progress bags are stored. They now go both to the top level of a child's slice (where they have always lived) and to `subjects.math.data` (where every other subject writes), and reads prefer whichever is newer. Asserts every bag survives a round trip, a never-migrated record still reads, a namespace-only record still reads, and — the one that matters — that an older build rewriting the flat keys wins over the stale namespaced copy it carried along. Also that restarting the year clears both copies while keeping the grade placement. |
| `mission-page.js` | **Maths.** Year One's eight missions render from one template, not eight copies: a single `<main>`, eight manipulative gates that are mutually exclusive, and every one of the ~200 bindings resolving for every mission (an unbound one renders *empty* and only warns). The week heading is recomputed from the bank — the copies had drifted, Mission 07 still claiming three weeks after its bank grew to five — and the per-mission prose, accents and print packs are checked to be genuinely per-mission rather than one shared sentence. Also that a Year Two pilot gets the Year Two page and none of Year One's manipulatives. |
| `y5-manipulatives.js` | **Maths.** Year Two's eight manipulatives — one per mission, the right one open and no other, none open for a Year One pilot, and every binding resolving so none renders blank. Mostly it checks they are *correct*, because a manipulative is the one screen a child is invited to trust over their own arithmetic: partial products summing to the product, long division reconstructing quotient and remainder with one step per digit, unlike fractions retiling to the true LCD, and the place-value column for 0.7 showing a **7** — it showed a 6, since `0.7/0.1` is `6.999999999999999` and the obvious version floors it. Digits are taken in integer thousandths now. |
| `subject-summary.js` | **All subjects.** Every course that syncs a working record gives Teacher HQ a `summary()`, and its numbers mean what their labels say: Word Voyagers counts a day only by its `:end` key (not the four step-keys inside it) and keeps each grade's work separate; a gap is a day gone past, never a day not yet reached, and never an excused one; Field Notes counts weeks and never days, and a finished week with no check is not scored zero; maths stays thin because its own drill-down sits below. Also that a summary returns `null` rather than an empty row, survives a junk record without throwing, and only emits the four tones Mission Control knows how to draw. |

## Why these live here now

They were written in a scratch directory and lost their history every time the
environment reset. Several bugs in this app were only ever caught because one
of these existed — the drill that scored zero while looking correct, the
assignment panel that showed the wrong block, the reset that did nothing
because it ran after `setState`. They are worth keeping.

## The one thing they cannot do

Everything here is Node driving the component's view-model. Nothing renders a
real browser, so a fault that lives purely in CSS or in the DSL's rendering —
an undefined class, a panel below the fold, a button hidden behind another
element — passes every one of these. Three separate bugs of exactly that kind
reached the running site. Test in a browser as well.
