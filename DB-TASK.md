# Task: publish the question banks to Firestore

You are working in `mikerasmussen1/school` (Baskin School — a K–5 homeschool app,
static HTML, no build step, Firestore over the REST API from the browser).

A question platform was just added. The code that READS the database is done and
committed. Nothing has been WRITTEN to the database yet. Your job is to seed it,
verify it, and leave a repeatable way to update it.

## Read these first

- `curriculum/question-types.js` — the item schema and the grader. The only
  source of truth for what a question is.
- `curriculum/qbank.js` — the loader, the resolution order, and `publish()`.
- `CONTRIBUTING.md` — sections "Question types" and "Questions come from the
  database".
- `firestore.rules` — a `questionbanks` block was added and is NOT deployed yet.
- `BACKEND.md` — how the Firestore project is set up. Read before changing
  anything about cloud config.

## Files changed in the work you are picking up

    index.html                        modified  (script tags, setsFor -> QBank,
                                                 streak mix, per-item log, HQ card)
    curriculum/question-types.js      new
    curriculum/qbank.js               new
    Worksheet Builder.dc.html         new
    firestore.rules                   modified  (public read on questionbanks)
    CONTRIBUTING.md                   modified
    github.md                         modified

## The shape you are writing

One document per bank. `bankId` is the curriculum id: `y3`, `y5`, `la`, `japan`.

    questionbanks/{bankId}
      sets     stringValue   JSON array of sets
      version  integerValue  bump on every write
      updated  integerValue  ms epoch

A set:

    {id, u, w, label, title, note, items:[…]}

    id     stable, matches the ids already in the repo banks (p1, p2, …). The
           attempt log, Teacher HQ and the photo scanner all key off these.
           DO NOT renumber or reuse ids.
    u      unit / mission, 1–8
    w      week within the mission, defaults to 1
    items  see below

An item:

    {id, type, t, q, a, hint}

    id     stable and unique within the set. Use "<setId>-i<n>" for the items
           lifted out of the repo files, so they match what the loader would
           have generated on its own.
    type   short-answer | number-units | multiple-choice | true-false |
           fill-blank | ordering | multi-part | written-response
           Omitted means short-answer.
    t      tier: 0 Warm-Up, 1 Core, 2 Challenge
    a      the answer, in the shape the type expects (array for fill-blank and
           ordering, index or option text for multiple-choice, absent for
           written-response, which takes `rubric`)

Retire a bad item with `retired:true`. Never delete one — a deleted id orphans
every logged attempt against it.

## What to do

1. **Deploy the rules.** `firebase deploy --only firestore:rules` for project
   `big-math-adventures`. Until this lands, every fetch of `questionbanks/*`
   returns 403 and the app silently uses the file questions. Confirm with a
   plain `curl` of
   `https://firestore.googleapis.com/v1/projects/big-math-adventures/databases/(default)/documents/questionbanks/y3`
   — a 404 (not a 403) is the correct answer for a bank that does not exist yet.

2. **Write a seeding script** at `scripts/seed-questionbanks.js`, runnable with
   plain `node` (no new dependencies). It must:
   - load the repo banks the same way the app does — `curriculum/shared.js`,
     `math-y1.js`, `math-y2.js`, `extra-banks.js` are plain scripts that assign
     onto `window.__CURR`, so give them a `window` shim rather than rewriting them;
   - assemble one array of sets per bank using the SAME unit mapping as
     `App.fileSetsFor(u)` in `index.html` (Y5 comes from `PRACTICE_Y5[u]`, Y1
     concatenates `PRACTICE_Un` with its `_W*` continuation banks) and stamp
     each set with its `u`;
   - normalize every item through `QTypes.normalize` and give it a stable
     `id` of `<setId>-i<n>`;
   - run `QTypes.validateSet` over every set and REFUSE to write if anything
     fails — print the errors and exit non-zero;
   - PATCH `questionbanks/y3` and `questionbanks/y5` with `version: 1`;
   - support `--dry-run` (validate and print counts, write nothing) and
     `--bank=y3`.

3. **Seed y3 and y5.** The result must be byte-equivalent in meaning to what
   the files hold today: same sets, same order within a set, same answers, same
   tiers. This is a migration, not an edit. Do not improve any question.

4. **Verify against the running app.**
   - Open `index.html`, sign in as a test pilot, pick 3rd Grade, open Practice
     Bay. The line under the header must read
     "Questions v1 · loaded from the database".
   - Every set in Missions 01–08 must still list the same problems, in the same
     order, with the same answers as before the migration. Diff a few by hand
     against the repo banks.
   - Run one Streak Run: the first five items must not all be Warm-Up.
   - Check a worksheet, then open Teacher HQ → Completed exercises and confirm
     the item grid shows the answers, including what was typed on a miss.
   - Open `Worksheet Builder.dc.html`: spinner, then sheets, and the footer of
     each page must say `questions v1`.

5. **Prove an update is not a breaking change.** Edit one question's `hint` in
   the database, bump `version` to 2, reload the app, and confirm the new hint
   appears with no code change and no loss of logged progress for that item.

6. **Then, and only then**, retire the snapshots question: leave the 32
   `Unit N`/`Y2 Unit N` packs alone unless Mike says otherwise. They are frozen
   PDF sources and do not read the database.

## Rules of engagement

- Do not change the item schema or the loader. If a real question cannot be
  expressed in the eight types, stop and report it rather than inventing a type.
- Do not rewrite curriculum content, tiers, wording or answers during the
  migration.
- The Firestore key in `index.html` and the open write rules are deliberate —
  read `github.md` "Cloud services" and `BACKEND.md` before touching them.
- Keep the file banks in the repo. They are the offline fallback and the seed
  source; nothing about them becomes dead code.
- Update `github.md` (`## Last sync`, `## Screen map`) and `CONTRIBUTING.md`
  when you are done.

## Done means

`questionbanks/y3` and `questionbanks/y5` exist at v1, the app and the worksheet
builder both report loading from the database, every exercise is identical to
before, a hint edit in the database shows up with no deploy, and
`scripts/seed-questionbanks.js --dry-run` passes clean.
