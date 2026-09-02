/* ============================================================================
 * FIELD NOTES — registration
 * ----------------------------------------------------------------------------
 * Georgia Standards of Excellence science, two grade tracks, two lessons a
 * week. The course lives in
 *   science-y3-spine.js / science-y5-spine.js   units, weeks, standards
 *   science-lessons.js                          144 lessons, both grades
 *   science-quiz.js                             Day B checks (partial, see file)
 * and is presented by field-notes.dc.html, its own page.
 *
 * TWICE A WEEK BY DESIGN, not by omission. Georgia's practices standards are
 * built on doing investigations and keeping records, which does not divide
 * neatly into five short sittings. One real lab and one explain-and-check per
 * week gives each half enough room, and leaves the other three days for the
 * subjects that do want daily repetition.
 * ==========================================================================*/
(function(){
  window.Subjects.register({
    id: "sci",
    name: "Field Notes",
    tagline: "Georgia GSE \u00b7 3rd \u0026 5th Grade",
    color: "#2E7D6B",
    glyph: "\u2697",
    gradient: "linear-gradient(150deg,#2E7D6B,#7CC4A5)",
    blurb: "Science twice a week: one hands-on investigation, one reading with a claim to defend. Nine units a year, weighted to the Georgia standards.",
    status: "live",
    order: 25,
    open: {href:"field-notes.dc.html"}
  });
})();
