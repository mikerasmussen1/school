/* ============================================================================
 * WORD VOYAGERS — language arts
 * ----------------------------------------------------------------------------
 * Read a classic book, then write about it. That is the whole course: one book
 * at a time, read on a schedule, with writing that comes out of the reading
 * rather than sitting beside it.
 *
 * This file is the entire subject. Nothing outside curriculum/ changes as it
 * grows, and no other curriculum file needs to be touched to work on it.
 *
 *   - Keep everything inside this file (or files this one loads).
 *   - Store a child's progress under slice.subjects.la.data — see the contract
 *     at the top of subjects.js. It syncs to Firestore per child for free.
 *   - Change the name, colour, glyph and copy below freely. They are yours.
 *
 * A SHAPE TO START FROM (a suggestion, not a rule)
 *
 *   BOOKS = [{
 *     id:      "treasure-island",   // permanent — progress is stored under it
 *     title:   "Treasure Island",
 *     author:  "Robert Louis Stevenson",
 *     year:    1883,
 *     weeks:   4,
 *     why:     "One line: why this book, for this child, now.",
 *     reading: [                    // one entry per sitting
 *       {n:1, chapters:"1–3", pages:28,
 *        watch:"What to notice while reading — a question, not a task.",
 *        words:[{w:"schooner", say:"SKOO-ner", means:"a two-masted sailing ship"}]}
 *     ],
 *     writing: [                    // fewer of these than readings
 *       {n:1, after:1, kind:"paragraph",
 *        prompt:"The prompt, in your voice.",
 *        looksLike:"What a good answer does — the thing you actually mark.",
 *        length:"One paragraph, five sentences or so."}
 *     ]
 *   }]
 *
 * Writing is marked by a person, not by the app: there is no right answer to
 * check, so `looksLike` is the rubric and a grown-up reads the piece. Keep the
 * child's drafts in slice.subjects.la.data so they survive the iPad.
 *
 * When there is something to do, switch status to "live" and either point
 * `open` at a page of your own ({href:"word-voyagers.dc.html"}) or ask for the
 * in-app screens to be wired up.
 * ==========================================================================*/
(function(){

  // The reading list. Add books here; the first unfinished one is "current".
  const BOOKS = [];

  window.Subjects.register({
    id: "la",
    name: "Word Voyagers",
    tagline: "Classic books · Writing about them",
    color: "#A78BFA",
    glyph: "A",
    gradient: "linear-gradient(150deg,#A78BFA,#60A5FA)",
    blurb: "Read a classic book a few chapters at a time, then write about what happened and what you made of it.",
    status: "soon",
    order: 20,
    // Same two years as math, so a child reads the classics at their level.
    // Rename or re-cut these freely — the ids are what progress is stored under.
    levels: [
      {id:"g3", label:"3rd Grade", sub:"Year One"},
      {id:"g5", label:"5th Grade", sub:"Year Two"}
    ],
    open: "stub",
    stub: {
      heading: "Word Voyagers is being written.",
      lines: [
        "Mom is building this one. It is not ready to sail yet.",
        "When it opens you'll be reading a classic book a few chapters at a time, and writing about it — what happened, what a character wanted, whether you believed them."
      ],
      footer: "Pick Math or the Japan unit for today."
    }
  });

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_BOOKS = BOOKS;
})();
