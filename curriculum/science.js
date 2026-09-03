/* ============================================================================
 * FIELD NOTES — registration
 * ----------------------------------------------------------------------------
 * Georgia Standards of Excellence science, two grade tracks, two lessons a
 * week. The course lives in
 *   science-y3-spine.js / science-y5-spine.js   units, weeks, standards
 *   science-lessons.js                          144 lessons, both grades
 *   science-quiz.js                             weekly checks (partial, see file)
 * and is presented by field-notes.dc.html, its own page.
 *
 * ONCE A WEEK. One sitting: investigate, explain, check. Nothing was cut when
 * this dropped from twice a week — the two days were merged, so every lab,
 * reading, claim and standard is still here. The session is simply longer.
 * Georgia's practices standards are built on doing investigations and keeping
 * records, which never divided neatly into short daily sittings anyway.
 * ==========================================================================*/
(function(){
  window.Subjects.register({
    id: "sci",
    name: "Field Notes",
    tagline: "Georgia GSE \u00b7 once a week \u00b7 3rd \u0026 5th Grade",
    color: "#2E7D6B",
    glyph: "\u2697",
    gradient: "linear-gradient(150deg,#2E7D6B,#7CC4A5)",
    blurb: "Science once a week: a hands-on investigation, a short reading, and a claim to defend with evidence. Nine units a year, weighted to the Georgia standards.",
    status: "live",
    order: 25,
    // A signed-in child picks their own level here. The label is the grade
    // alone — no child sees another child's name or track.
    levels: [
      {id:"y3", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y3"):"3rd", sub:"3rd Grade"},
      {id:"y5", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y5"):"5th", sub:"5th Grade"}
    ],
    open: {href:"field-notes.dc.html"}
  });
})();
