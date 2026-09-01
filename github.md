repo: mikerasmussen1/school
branch: main

## Last sync

date: 2026-09-01T12:52:00Z

### Updated in this project

- Renamed the app to **Baskin School**; "Adventures in Big Math" is now the name of the math subject, not the product.
- New subject registry `curriculum/subjects.js` — each subject self-registers from its own file, so a second author never edits a shared one. Adding a subject costs one `<script src>` line in index.html.
- New `curriculum/language-arts.js` (**Word Voyagers**, stubbed) and `curriculum/japan-unit.js`. Math registers its card from `registry.js`.
- Students land on a subject picker after sign-in (`view:"today"`), with a this-week strip; the header carries the current subject and an "All subjects" way back.
- Grade level moved off the login screen onto the landing card, per subject: a child picks 3rd/5th for math and for language arts independently, and a subject with `levels` will not open until one is picked.
- Per-subject progress is tracked per child in the synced record under `slice.subjects.<id>` (`opened`, `last`, `days`, plus a private `data` namespace); Teacher HQ gained a Subjects card reading it.
- Earlier pull of main at tree 3601ea0 (28 files) — local copies were pre-commit drafts.

## Sync history

date: 2026-09-01T12:30:04Z — pulled main at tree 3601ea0 (index.html, docs, 5 curriculum files, 16 worksheet packs); new upstream `scripts/check-paper-mapping.js`.

date: 2026-09-01T00:51:42Z — rebuilt all 16 worksheet packs as two-page sheets (whole bank per set, printed stop rule, back page working space + error journal); wired printed-number → bank-index scanner mapping; Teacher HQ sprint + streak panels.

date: 2026-08-31T00:21:36Z — pulled all 68 changed files from main (5 commits ahead); repo confirmed Claude Code's handoff: all 32 PDFs generated and committed.

date: 2026-08-23T00:00:00Z — 355 practice sets, walkthrough coverage via lessonFor(), 16 worksheet packs generated, print regime applied, grader normalization fix.
date: 2026-08-22T16:06:43Z · commit e25c0114a253 — pulled full repo (18 files); vendored React; print-fit wired into 8 packs; Firestore sync, PaperReader, account model landed.

## Cloud services

Live, and deliberately client-side. Do not "fix" these without reading `BACKEND.md` first.

- `REMOTE_PROJECT_ID = "big-math-adventures"` (`index.html` ~3703) turns Firestore sync on. Empty string = local-only.
- `GEMINI_API_KEY` (`index.html` ~3773) is a browser key by design: restricted to the
  `mikerasmussen1.github.io` + localhost referrers and to the Generative Language API,
  on a project with **no billing account attached**. Committing it is intended, and worst
  case is free-tier quota burn, which degrades to the old "mark it done" button.
  If a billing account is ever attached to this project, the key must move behind a proxy first.
- `firestore.rules` is committed and byte-identical to the deployed ruleset (verified Aug 12).
  `list` and `delete` are denied everywhere; `get`/`create`/`update` are open, with unguessable
  name+code doc ids acting as the login.

## Screen map

| Screen / file | Built from |
| --- | --- |
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
| Japan history unit (8 weeks, 16 lessons, both boys) | `curriculum/japan-unit.js` — **not loaded**. `japan.dc.html` and `image-slot.js` have never been in this repo, so the card would 404. Add both files, then restore the script tag in index.html |
| Security rules | `firestore.rules`, `firebase.json` |
| Project notes | `HANDOFF.md`, `BACKEND.md` |
