/* ============================================================================
 * WORD VOYAGERS — registration
 * ----------------------------------------------------------------------------
 * This file only puts the subject on the landing page. Two full courses sit
 * behind it, each 36 weeks / 180 days in nine unit studies:
 *   3rd Grade — la-y1-*.js, la-books.js
 *   5th Grade — la-y2-*.js, la-books-y2.js
 *
 * The y1/y2 file prefixes and state keys are internal and stay as they are —
 * renaming them would break every stored progress key ("y1:14"). What the
 * child and parent see is the grade, which each spine declares in its GRADE
 * export; the page reads that rather than hardcoding a label.
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
    tagline: "3rd \u0026 5th Grade \u00b7 Reading \u00b7 Writing \u00b7 Words",
    color: "#A78BFA",
    glyph: "A",
    gradient: "linear-gradient(150deg,#A78BFA,#60A5FA)",
    blurb: "3rd Grade and 5th Grade, each 36 weeks in nine unit studies. Reading, grammar and spelling drills that grade themselves, a handwritten page each week graded from a photo, and one speaking task done out loud.",
    status: "live",
    order: 20,
    // A signed-in child picks their own level here. The label is the grade
    // alone — no child sees another child's name or track. Word Voyagers
    // stores y1/y2 internally; the label maps through students.js.
    levels: [
      {id:"y1", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y3"):"3rd", sub:"3rd Grade"},
      {id:"y2", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y5"):"5th", sub:"5th Grade"}
    ],
    open: {href:"word-voyagers.dc.html"}
  });
})();
