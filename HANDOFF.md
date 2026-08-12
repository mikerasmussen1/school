# Handoff — Year One complete (Units 1–8)

Read this file, then `index.html`. All eight missions are
built: app sections, practice sets, animated lessons, widgets, standards blocks,
and one 15-page print pack each. Nothing is outstanding. If you extend this,
copy the existing structure rather than redesigning it.

## What exists

| File | What it is |
| --- | --- |
| `index.html` | The app. Four tabs + profile picker. |
| `Unit 1 Print Pack.dc.html` | 15 printable pages for Mission 01, on `<doc-page>`. |
| `Unit 2 Print Pack.dc.html` | 15 printable pages for Mission 02, same 15-page shape. |
| `Unit 3 Print Pack.dc.html` | 15 printable pages for Mission 03. Four-week mission. |
| `Unit 4 Print Pack.dc.html` | 15 printable pages for Mission 04. Six-week mission. |
| `Unit 5 Print Pack.dc.html` | 15 printable pages for Mission 05. Four-week mission. |
| `Unit 6 Print Pack.dc.html` | 15 printable pages for Mission 06. Five-week mission. |
| `Unit 7 Print Pack.dc.html` | 15 printable pages for Mission 07. Three-week mission. |
| `Unit 8 Print Pack.dc.html` | 15 printable pages for Mission 08. Four-week mission + capstone. |
| `BACKEND.md` | Database handoff notes. Do not change the `Storage` seam. |
| `doc-page.js`, `support.js` | Runtime files. Never edit. |

## The app's four views

Switched by `state.view`: `map`, `unit`, `practice`, `hq`. A profile picker
(`state.gate`) sits over all of them.

- **Mission Map** — 8 planets from the `UNITS` array. Already covers all 8 units.
- **Mission 0N** — deep-dive on one unit. Units 1 and 2 exist, as two separate
  `sc-if` sections (`isUnit1` … `isUnit6`) so every inline style stays literal. `state.uview` says which one is open; `openUnit(n)` switches it and
  resets `week` and `pset` together.
- **Practice Bay** — animated lesson (`LESSONS`) above graded problems (`PRACTICE`).
- **Teacher HQ** — rhythm, assessment, gifted watch-outs, pilot roster.

## Where content lives

All near the top of the logic class, as plain constants:

- `UNITS` — all 8 already written: name, color, badge, Big Question, skills,
  project, game, badge name. **Do not rewrite these.** They are the spine.
- `TIERS` — Warm-Up / Core / Challenge. Fixed. Every worksheet uses all three.
- `WEEKS` / `WEEKS_U2` — the 5 weeks of each unit. Add `WEEKS_U3` and switch on
  `st.uview` in `renderVals`.
- `PRACTICE` / `PRACTICE_U2` — 5 graded sets each (`p1`–`p5`, `u2p1`–`u2p5`) =
  Week 1. `ALL_SETS` concatenates them; the roster in Teacher HQ counts across all.
- `LESSONS` / `LESSONS_U2` — animated walkthroughs, keyed to the same set ids and
  merged into `ALL_LESSONS`. Keep every drawn width under about 30 units or the
  auto-fit shrinks the rectangle to nothing.
- `PUZZLES` / `PUZZLES_U2` — the missing-digit widget. Answers are single digits;
  typed values are keyed `uview-index`.
- `STANDARDS` / `STANDARDS_U2` — one block per unit in Teacher HQ.
- `GATES`, `BANDS`, `RHYTHM`, `ASSESS`, `COMPACT`, `WATCHOUTS`, `PRAISE` —
  pedagogy. Unit-agnostic. Reuse as-is.

## Data shapes

```js
// PRACTICE entry
{ id:"p1", label:"1.1", title:"...", note:"...",
  items:[ {t:0, q:"6 × 7", a:"42"},              // t: 0 Warm-Up, 1 Core, 2 Challenge
          {t:1, q:"4 × 13", a:"52", hint:"40 + 12"} ] }  // hint shows only after a wrong check

// LESSONS entry — steps animate one at a time, auto-play every 2.6s
{ title:"...", sub:"...", steps:[
  { cap:"...", dots:{r:6,c:7,split:5}, sum:"30 + 12 = 42" },   // dot array
  { cap:"...", cols:[{l:"10",s:10},{l:"3",s:3}],               // area model
    rows:[{l:"4",s:4}], cells:[{v:"40"},{v:"12"}], sum:"..." },
  { cap:"...", strip:true, ... }                               // last col renders as a
] }                                                            // dashed "take it back" strip
```

`s` is the true size in units — rectangles are drawn to scale and auto-fit the
stage. Cells fill row-major. Reveal values one step at a time by leaving `v:""`.

Answers compare as strings with whitespace and commas stripped. Numeric only —
the input filters non-digits. **Never write an item whose answer isn't a plain
number.** Put reasoning prompts on the printed worksheet instead.

## Adding a unit

1. **App.** Add `WEEKS_U7`, `PRACTICE_U7` (`u7p1`–`u7p5`), `LESSONS_U7`,
   `PUZZLES_U7`, `STANDARDS_U7`, then extend `ALL_SETS`, `ALL_LESSONS`,
   `setsFor()`, and the `uview` switches in `renderVals`. Duplicate the Unit 6
   `sc-if` section and recolour its literals — do not parameterise it. Add the
   open button on the mission map (`sel.isUnitSeven`) and the HQ standards block.
2. **Print pack.** Copy `Unit 6 Print Pack.dc.html`, rename, swap the content.
   15 pages: cover, pre-assessment, skip chart, 5 Week-1 worksheets, weeks 2–5
   plan, quiz, test (2), answer keys (3). After writing it, check every
   `.page` for `scrollHeight > clientHeight` and trim until all fifteen fit.
3. Use the unit's own color from `UNITS` throughout, plus a darker print-safe
   shade for text on cream. Unit 1 orange `#FF9F1C`/`#EA580C`; Unit 2 teal
   `#2DD4BF`/`#0D9488`; Unit 3 violet `#A78BFA`/`#6D28D9`; Unit 4 pink
   `#F472B6`/`#BE185D`; Unit 5 lime `#A3E635`/`#4D7C0F`; Unit 6 blue
   `#60A5FA`/`#1D4ED8`; Unit 7 is `#FB7185`, Unit 8 `#FCD34D`.
4. Each unit's "math is the art" row gets its own two interactive widgets —
   Unit 1 the Area Model Machine and factor rainbow, Unit 2 the Leftover Machine
   and Divisibility Tester, Unit 3 the Place Value Machine and Expression Duel,
   Unit 4 the Equivalence Stacker and Fraction Face-Off, Unit 5 the Decimal Grid
   and Change Counter, Unit 6 Fence & Grass and the Coordinate Plotter, Unit 7 the
   Average Machine and Chance Bag, Unit 8 the Function Machine and Balance Scale.
5. Missions vary in length. Three weeks uses `GATES_TINY` (quiz end of week 2),
   four uses `GATES_SHORT`, five uses `GATES`, six uses `GATES_LONG`;
   `renderVals` picks by `WKS.length`. Check `UNITS[n].weeks` before writing a
   week array and match the print pack's plan page to it.
6. Practice answers must be plain numbers — the input strips everything else.
   For fractions ask for a numerator or denominator by name (Unit 4); for money
   and decimals ask for cents or hundredths (Unit 5). Anything needing words goes
   on the printed worksheet instead. Widget inputs are yours, so those may accept
   decimal points — only the graded practice input is digits-only.

## Rules that came from the user

- Only Week 1 of each unit is written out in full. Weeks 2–5 are outlined.
- Real, solvable problems with correct answer keys. No placeholders.
- Standards codes in Teacher HQ only — never on the kid's pages.
- Every new concept gets an animated walkthrough before the practice.
- 45-minute daily sessions. Base-ten blocks, dice, cards, graph paper available.
- Mascot AXIOM: warm veteran commander. Treats the kid as a colleague.
  No babyish language. "Being stuck is your brain growing."
- Student is Brock, 8, gifted, bored by his last curriculum.

## Do not touch

- The `Storage` object and every `BACKEND` comment.
- The profile picker, grading logic, or the "I did this on paper" flow.
- `support.js`, `doc-page.js`.

## Persistence keys

Progress is keyed by practice-set id and item **index**. Reordering items in an
existing set silently corrupts saved answers. Append rather than reorder, or
give items stable ids first and migrate.
