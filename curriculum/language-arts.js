/* ============================================================================
 * WORD VOYAGERS — registration
 * ----------------------------------------------------------------------------
 * This file only puts the subject on the landing page. Two full courses sit
 * behind it, each 36 weeks / 180 days in nine unit studies:
 *   Year One  (3rd grade) — la-y1-*.js, la-books.js
 *   Year Two  (5th grade) — la-y2-*.js, la-books-y2.js
 * Both expose the identical interface (UNITS, WEEKS, STANDARDS, unitOf,
 * passageFor, grammarSetFor, spellingSetFor, taskFor, READ_ALOUDS,
 * INDEPENDENT) so the page renders either from one set of views.
 *
 * Year One files:
 *   la-y1-spine.js    units, weeks, standards map, the five-day rhythm
 *   la-y1-words.js    36 weekly spelling lists
 *   la-y1-grammar.js  36 weekly grammar drills
 *   la-y1-reading.js  36 weekly passages + comprehension questions
 *   la-y1-tasks.js    handwriting, writing and speaking tasks
 *   la-books.js       the year's reading list
 * and presented by word-voyagers.dc.html, its own page (same pattern as the
 * Japan unit — see CONTRIBUTING.md).
 *
 * Photo grading of the handwritten day lives in la-grader.js.
 *
 * The year switcher lives inside word-voyagers.dc.html rather than in a
 * `levels` array here, because progress is namespaced per year ("y1:14") and
 * the page owns that state. Adding a Year Three means adding la-y3-*.js and
 * one entry in the page's yearItems list — nothing here changes.
 * ==========================================================================*/
(function(){
  window.Subjects.register({
    id: "la",
    name: "Word Voyagers",
    tagline: "Reading \u00b7 Writing \u00b7 Words",
    color: "#A78BFA",
    glyph: "A",
    gradient: "linear-gradient(150deg,#A78BFA,#60A5FA)",
    blurb: "Two full years, 3rd and 5th grade. Each is 36 weeks in nine unit studies: reading, grammar and spelling drills that grade themselves, a handwritten page each week graded from a photo, and one speaking task done out loud.",
    status: "live",
    order: 20,
    open: {href:"word-voyagers.dc.html"}
  });
})();
