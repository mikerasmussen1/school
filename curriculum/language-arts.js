/* ============================================================================
 * WORD VOYAGERS — registration
 * ----------------------------------------------------------------------------
 * This file only puts the subject on the landing page. The course itself is
 * Year One: 36 weeks, 180 days, nine unit studies, split across
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
 * There is deliberately no `levels` array. Year One is third grade. A second
 * year gets its own la-y2-*.js files and a level switcher at that point, not
 * before — an empty level that opens to nothing is worse than no level.
 * ==========================================================================*/
(function(){
  window.Subjects.register({
    id: "la",
    name: "Word Voyagers",
    tagline: "Reading \u00b7 Writing \u00b7 Words",
    color: "#A78BFA",
    glyph: "A",
    gradient: "linear-gradient(150deg,#A78BFA,#60A5FA)",
    blurb: "Third grade language arts: 36 weeks in nine unit studies. Reading, grammar and spelling drills that grade themselves, a handwritten page each week graded from a photo, and one speaking task done out loud.",
    status: "live",
    order: 20,
    open: {href:"word-voyagers.dc.html"}
  });
})();
