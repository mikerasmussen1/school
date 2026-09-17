# Baskin School — notes for Claude Code

A single static page (`index.html`) plus plain scripts under `curriculum/`.
No package.json, no bundler: everything below is `node` from the repo root.
Read `CONTRIBUTING.md` before authoring content, `HANDOFF.md` for the history
and the protected files, `BACKEND.md` before touching storage.

## The gates, in order, before anything is pushed

1. `node tests/run-all.js` — the unit suite (`tests/`, one process per file;
   `tests/README.md` says what each guards). Any FAIL blocks.
2. `node scripts/build.js --check` — worksheet ↔ bank drift, then every
   `scripts/check-*.js` gate and `scripts/qa-verify.js`. Needs Google Chrome
   (print-fit, responsive), `pdfinfo` and `python3`. Verify only; never run it
   with `--write` to make a check pass without saying so in the change.
3. `node scripts/qa-verify.js` alone is the quick check after a content-only
   edit: boots the curriculum headlessly and checks the print packs.
4. The `qa-verifier` agent, then the `pr-reviewer` agent (`.claude/agents`).
   Push only on `QA PASS` and `APPROVED`. Work lands on a branch and a pull
   request, never straight onto main.
5. Open it in a browser. The suite drives view-models in Node and cannot see
   CSS or DOM faults; three such bugs reached the live site with a green suite.

A gate that fails on main before your change is still reported, with the
evidence that it is pre-existing — it is never silently skipped.

## Writing a test that can actually fail

These were each learned from a bug that shipped past a green suite.

- Drive the real banks (`ALL_SETS`, `spellingSetFor`, `lessonFor`, …) and
  assert on returned values. Never grep `index.html` as text to prove
  behaviour: 158 green source-greps sat beside a screen with no lesson visuals
  for six rounds, until the render maths was extracted to
  `curriculum/lesson-view.js` so a test could ask "does this day draw?".
- Invented fixtures lie. A per-question log deduped on question text passed
  with `"one?"` and `"two?"` while every real spelling item shares one question
  text and differs only in the answer, so a fourteen-word drill collapsed to
  one row. If a fixture is unavoidable, first assert it has the property that
  makes the test real.
- Instantiate the real component and call the real method; never re-implement
  it inside the test.
- Prove the guard: reintroduce the bug and watch the test fail before claiming
  coverage.
- Every checker and test must `process.exit` explicitly. Curriculum scripts
  loaded into a fake `window` reach Node's real timers, and a script that has
  printed PASS then never returns — `check-paper-mapping.js` held
  `build.js --check` for eleven minutes that way.

## Repo rules the gates enforce

- `support.js` and `doc-page.js` are never edited (HANDOFF.md).
- A changed `.dc.html` ships with its re-exported `.pdf` in the same change.
  Freshness is judged by git commit time, not mtime, so re-export after the
  sheet is committed. Every Print Pack is 15 pages.
- `index.html` loads every `curriculum/*.js`, with `registry.js` last: it
  destructures `window.__CURR` at parse time and cannot see later files.
- Progress is written with `saveState`, never `setState` (memory only; it
  vanishes on reload while the child watches it work).
- Set and lesson counts never drop silently: compare counts, not impressions.
