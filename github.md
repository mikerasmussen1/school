repo: mikerasmussen1/school
branch: main

## Last sync

date: 2026-09-01T00:51:42Z

### Updated in this project

- Pulled index.html, CONTRIBUTING.md, github.md, HANDOFF.md, BACKEND.md and all 5 curriculum files from main, plus the new scripts/qa-verify.js and .claude/agents/ (pr-reviewer, qa-verifier).
- Rebuilt all 16 worksheet packs as two-page sheets carrying each set's whole bank — front Warm-Up + Core with a printed stop rule, back Challenge + working space + error journal. Answer keys regenerated.
- Worksheet problems now number 1..N straight through the sheet; `pOnPaper` builds the same deduped, tier-grouped list so the photo scanner maps printed number → bank index.
- Teacher HQ gained Daily review sprint and Streak runs panels (both roster and front-door views).

## Sync history

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
| Main app (mission map, Practice Bay, Teacher HQ) | `index.html`, `support.js`, `vendor/react*.js` |
| Cloud progress sync seam | `index.html` — `REMOTE_PROJECT_ID`, `Remote` (~3703–3770) |
| Photo-homework reader + diagnostics | `index.html` — `GEMINI_API_KEY`, `PaperReader` (~3773+), `paperlog/` |
| Account gate (name + secret code) | `index.html` — `Remote` account key helpers |
| Print packs, Missions 01–08 both years | `Unit N Print Pack.dc.html`, `Y2 Unit N Print Pack.dc.html`, `doc-page.js`, `print-fit.js` |
| Worksheets, all weeks both years (two-page sheets) | `Unit N Worksheets.dc.html`, `Y2 Unit N Worksheets.dc.html`, banks in `curriculum/` |
| Photo scan → app answers mapping | `index.html` — `pOnPaper` sheet numbering, `PaperReader.read` prompt, `paperPicked` |
| Curriculum content, split by subject | `curriculum/shared.js`, `math-y1.js`, `math-y2.js`, `extra-banks.js`, `registry.js`, `CONTRIBUTING.md` |
| QA + review agents | `scripts/qa-verify.js`, `.claude/agents/` |
| Japan history unit (8 weeks, 16 lessons, both boys) | `japan.dc.html`, `image-slot.js` — linked from the index.html header |
| Security rules | `firestore.rules`, `firebase.json` |
| Project notes | `HANDOFF.md`, `BACKEND.md` |
