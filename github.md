repo: mikerasmussen1/school
branch: main

## Last sync

date: 2026-08-31T00:21:36Z

### Updated in this project

- Pulled all 68 changed files' sources from main (5 commits ahead): index.html, firestore.rules, HANDOFF.md, .firebaserc, and all 32 pack .dc.html files now match the repo.
- Repo confirms Claude Code completed the handoff: all 32 PDFs generated and committed; worksheets live.

## Sync history

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
| Worksheets, all weeks both years | `Unit N Worksheets.dc.html`, `Y2 Unit N Worksheets.dc.html` |
| Japan history unit (8 weeks, 16 lessons, both boys) | `japan.dc.html`, `image-slot.js` — linked from the index.html header |
| Security rules | `firestore.rules`, `firebase.json` |
| Project notes | `HANDOFF.md`, `BACKEND.md` |
