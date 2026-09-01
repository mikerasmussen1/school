repo: mikerasmussen1/school
branch: main

## Last sync

date: 2026-09-01T17:49:05Z

### Updated in this project

- Merged main at tree c076f134. Took upstream `curriculum/qbank.js`, `firestore.rules`, `BACKEND.md` and the new `.gitignore`; upstream `index.html` was unchanged since the last pull, so the local copy (dynamic difficulty, drill-down review) is ahead.
- **Adopted upstream's security decision and extended it to lessons.** Client writes to `questionbanks` are denied outright — bank ids are public, so the unguessable-id protection the rest of the ruleset relies on does not apply. The same now goes for `lessons`: read public, client writes denied.
- Consequence, handled: a generated lesson no longer tries to publish itself. It is stored inline in the child's own record and teaches them there; promoting one into the shared reuse pool is an admin step, and Teacher HQ grew a "Copy lesson JSON" button per generated round to hand the object over for the Firebase console.
- `LessonBank.publish`/`score` kept and re-documented as admin-only — the validation is the part worth having.

## Sync history

date: 2026-09-01T17:05:00Z

- **Dynamic difficulty.** A set closing under 70% now goes to `curriculum/tutor.js`: proficiency read (went well / did not / one line for the child), the concept behind the misses, and a 6–8 slide lesson with 5–10 new questions. The child taps through it immediately, answers, and the round closes at 70%. Three rounds max, each told to change representation rather than difficulty; after three, generation stops and Teacher HQ flags it red.
- **Lessons are data** — `curriculum/lessons.js` loads `lessons/{bankId}` like question banks, keyed by `concept` so a lesson that already taught an idea gets reused. (Write-back superseded by the 17:49 merge: admin-only.)
- **Teacher HQ Review is a drill-down**: pilot → day → set → every answer, with typed answers, per-item time, tier filters, a ranked "struggled with" list, and a jump straight to every answer behind it. It also pulls every pilot on the open teacher roster, not just this device.
- New **Dynamic difficulty** section in Teacher HQ: every round, whether the lesson was generated or reused, the post-lesson score, and a red "needs you" card after three rounds.
- `firestore.rules` gained a `lessons` block. (Superseded by the 17:49 merge: read public, client writes denied.) Still not deployed.
- Fixed: browser autofill was pre-filling the Streak Run answer box and grading junk.

date: 2026-09-01T16:42:00Z

- Pulled main at tree 0c30ab6c. The question-platform work is on main, with edits on top of what was handed over: `index.html` (444,388 bytes), `curriculum/qbank.js`, `curriculum/question-types.js`, `Worksheet Builder.dc.html`, `CONTRIBUTING.md`, `DB-TASK.md`, `scripts/qa-verify.js`.
- `japan.dc.html` and `image-slot.js` are now committed, and `index.html` loads `curriculum/japan-unit.js` — the Japan card is live rather than held back.
- `firestore.rules` on main carries the `questionbanks` public-read block. Nothing in the repo says it has been deployed.
- No `scripts/seed-questionbanks.js` on main yet, so no bank has been published: the app is still running on the file questions.

date: 2026-09-01T15:40:00Z

### Updated in this project

- **Question platform.** `curriculum/question-types.js` defines eight standard types (short-answer, number-with-units, multiple-choice, true-false, fill-blank, ordering, multi-part, written-response) with one grader, one answer-key formatter and an authoring validator. Legacy `q(t,q,a,hint)` items are short-answer, so every existing exercise is unchanged.
- **Questions load from the database.** `curriculum/qbank.js` reads `questionbanks/{y3|y5|la|japan}` from Firestore and the database wins; a device falls back to its last cached copy, then to the files in the repo. Publishing a fixed question is no longer a code change (`QBank.publish`). New public-read rule for `questionbanks` in `firestore.rules` — needs deploying.
- **Streak Runs are mixed.** Banks are authored easy-first, so five in a row used to mean five Warm-Up items. Each run now gets its own order: repeating windows of 1 Warm-Up, 2 Core, 2 Challenge (`QTypes.mixOrder`), backfilled from the nearest tier when a bank lacks that shape.
- **Teacher HQ shows every completed exercise.** New card: one row per set per day with a per-item grid, the score, and each miss spelled out — what the child typed and the right answer. Backed by a new per-item `pLog` in the synced record (capped at 60 entries per set).
- **`Worksheet Builder.dc.html`** prints any level/mission from the loaded bank, with a spinner while it fetches and an answer key. The 32 static `Unit N` packs stay as frozen snapshots.

date: 2026-09-01T15:09:05Z — pulled main at tree 575cbbef. Everything except `index.html` was already byte-identical locally; pulled the newer upstream `index.html`.

date: 2026-09-01T12:52:00Z

- Renamed the app to **Baskin School**; "Adventures in Big Math" is now the name of the math subject, not the product.
- New subject registry `curriculum/subjects.js` — each subject self-registers from its own file, so a second author never edits a shared one. Adding a subject costs one `<script src>` line in index.html.
- New `curriculum/language-arts.js` (**Word Voyagers**, stubbed) and `curriculum/japan-unit.js`. Math registers its card from `registry.js`.
- Students land on a subject picker after sign-in (`view:"today"`), with a this-week strip; the header carries the current subject and an "All subjects" way back.
- Grade level moved off the login screen onto the landing card, per subject: a child picks 3rd/5th for math and for language arts independently, and a subject with `levels` will not open until one is picked.
- Per-subject progress is tracked per child in the synced record under `slice.subjects.<id>` (`opened`, `last`, `days`, plus a private `data` namespace); Teacher HQ gained a Subjects card reading it.
- Earlier pull of main at tree 3601ea0 (28 files) — local copies were pre-commit drafts.

date: 2026-09-01T12:30:04Z — pulled main at tree 3601ea0 (index.html, docs, 5 curriculum files, 16 worksheet packs); new upstream `scripts/check-paper-mapping.js`.

date: 2026-09-01T00:51:42Z — rebuilt all 16 worksheet packs as two-page sheets (whole bank per set, printed stop rule, back page working space + error journal); wired printed-number → bank-index scanner mapping; Teacher HQ sprint + streak panels.

date: 2026-08-31T00:21:36Z — pulled all 68 changed files from main (5 commits ahead); repo confirmed Claude Code's handoff: all 32 PDFs generated and committed.

date: 2026-08-23T00:00:00Z — 355 practice sets, walkthrough coverage via lessonFor(), 16 worksheet packs generated, print regime applied, grader normalization fix.
date: 2026-08-22T16:06:43Z · commit e25c0114a253 — pulled full repo (18 files); vendored React; print-fit wired into 8 packs; Firestore sync, PaperReader, account model landed.

## Cloud services

Live, and deliberately client-side. Do not "fix" these without reading `BACKEND.md` first.

- `REMOTE_PROJECT_ID = "big-math-adventures"` (`index.html` ~3703) turns Firestore sync on. Empty string = local-only.
- `GEMINI_API_KEY` is **not in the repo**. It was, it leaked, Google disabled it.
  It now lives in localStorage per device — see BACKEND.md. Do not re-commit it.
- `firestore.rules` is committed and byte-identical to the deployed ruleset (verified Aug 12).
  `list` and `delete` are denied everywhere; `get`/`create`/`update` are open, with unguessable
  name+code doc ids acting as the login.

## Screen map

| Screen / file | Built from |
| --- | --- |
| Question types + grading | `curriculum/question-types.js` |
| Lessons as data + reuse pool | `curriculum/lessons.js`, `firestore.rules` (`lessons`) |
| Dynamic difficulty (model call, rounds) | `curriculum/tutor.js`; `index.html` — `maybeDynamic`, `coachVals`, `dynRows` |
| Teacher HQ review drill-down | `index.html` — `drillVals`, `reviewStudents`, `loadRosterSlices` |
| Question sets loaded from the DB | `curriculum/qbank.js`, `firestore.rules` (`questionbanks`) |
| Completed-exercise log (Teacher HQ) | `index.html` — `logAttempt`, `logAttempts`, `pLog`, `tExRows` |
| Streak Run difficulty mix | `index.html` — `streamVals`; `QTypes.mixOrder` |
| Printable sheets from the live bank | `Worksheet Builder.dc.html`, `doc-page.js` |
| Landing page (subject picker) + subject registry | `index.html` — `subjectVals`, `openSubject`; `curriculum/subjects.js` |
| Math subject (mission map, Practice Bay, Teacher HQ) | `index.html`, `support.js`, `vendor/react*.js`, `curriculum/registry.js` |
| Word Voyagers (language arts, stub) | `curriculum/language-arts.js` |
| Cloud progress sync seam | `index.html` — `REMOTE_PROJECT_ID`, `Remote` (~3703–3770) |
| Photo-homework reader + diagnostics | `index.html` — `GEMINI_API_KEY`, `PaperReader` (~3773+), `paperlog/` |
| Account gate (name + secret code) | `index.html` — `Remote` account key helpers |
| Print packs, Missions 01–08 both years | `Unit N Print Pack.dc.html`, `Y2 Unit N Print Pack.dc.html`, `doc-page.js`, `print-fit.js` |
| Worksheets, all weeks both years (two-page sheets) | `Unit N Worksheets.dc.html`, `Y2 Unit N Worksheets.dc.html`, banks in `curriculum/` |
| Photo scan → app answers mapping | `index.html` — `pOnPaper` sheet numbering, `PaperReader.read` prompt, `paperPicked` |
| Curriculum content, split by subject | `curriculum/shared.js`, `math-y1.js`, `math-y2.js`, `extra-banks.js`, `registry.js`, `CONTRIBUTING.md` |
| QA + review agents | `scripts/qa-verify.js`, `scripts/check-paper-mapping.js`, `.claude/agents/` |
| Japan history unit (8 weeks, 16 lessons, both boys) | `japan.dc.html`, `image-slot.js` — linked from the index.html header |
| Security rules | `firestore.rules`, `firebase.json` |
| Project notes | `HANDOFF.md`, `BACKEND.md` |
