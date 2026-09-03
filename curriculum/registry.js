/* Curriculum registry. Add a subject by loading its file before this one
// and adding an entry to CURRICULA.
   Plain script, loaded before the app. Exports onto window.__CURR. */
(function(){
window.__CURR = window.__CURR || {};
const {TIERS, GATES, GATES_SHORT, GATES_LONG, GATES_TINY, BANDS, RHYTHM, ASSESS, COMPACT, WATCHOUTS, PRAISE, mkWeek, GATE_FULL, q, GATE_OUT, GATE_QUIZ, GATE_TEST, UNITS, WEEKS, PUZZLES, WEEKS_U2, WEEKS_U3, WEEKS_U4, WEEKS_U5, WEEKS_U6, WEEKS_U7, WEEKS_U8, PUZZLES_U6, STANDARDS_U6, PUZZLES_U7, STANDARDS_U7, PUZZLES_U8, STANDARDS_U8, PUZZLES_U5, STANDARDS_U5, PUZZLES_U4, STANDARDS_U4, PUZZLES_U3, STANDARDS_U3, PUZZLES_U2, STANDARDS_U2, STANDARDS, PRACTICE, PRACTICE_U2, PRACTICE_U3, PRACTICE_U4, PRACTICE_U5, PRACTICE_U6, PRACTICE_U7, PRACTICE_U8, PRACTICE_U1_W2, PRACTICE_U1_W3, PRACTICE_U1_W4, PRACTICE_U1_W5, PRACTICE_U2_W2, PRACTICE_U2_W3, PRACTICE_U2_W4, PRACTICE_U2_W5, PRACTICE_U3_W2, PRACTICE_U3_W3, PRACTICE_U3_W4, PRACTICE_U4_W2, PRACTICE_U4_W3, PRACTICE_U4_W4, PRACTICE_U4_W5, PRACTICE_U4_W6, PRACTICE_U5_W2, PRACTICE_U5_W3, PRACTICE_U5_W4, PRACTICE_U6_W2, PRACTICE_U6_W3, PRACTICE_U6_W4, PRACTICE_U6_W5, PRACTICE_U7_W2, PRACTICE_U7_W3, PRACTICE_U8_W2, PRACTICE_U8_W3, PRACTICE_U8_W4, ALL_SETS, U, LESSONS, LESSONS_U2, LESSONS_U3, LESSONS_U4, LESSONS_U5, LESSONS_U6, LESSONS_U7, LESSONS_U8, LESSONS_WEEKLY, UNITS_Y5, WEEKS_Y5, STANDARDS_Y5, PUZZLES_Y5, PRACTICE_Y5, PRACTICE_Y5_W, PRACTICE_Y5_W2, PRACTICE_Y5_W3, PRACTICE_Y5_W4, PRACTICE_Y5_W5, PRACTICE_Y5_W6, ALL_SETS_Y5, Y5_BRIEFINGS, LESSONS_Y5_U1, LESSONS_Y5_U2, LESSONS_Y5_U3, LESSONS_Y5_U4, LESSONS_Y5_U5, LESSONS_Y5_U6, LESSONS_Y5_U7, LESSONS_Y5_U8, LESSONS_WEEKLY_Y5, EXTRA} = window.__CURR;

const CURRICULA = {  y3:{id:"y3", label:"3rd Grade Math", sub:"Year One · Missions 01–08", color:"#FF9F1C",
      blurb:"Multiplication, division, fractions, decimals, geometry and data — the third-grade year, reaching a grade or two above where it can."},
  y5:{id:"y5", label:"5th Grade Math", sub:"Year Two · Missions 01–08", color:"#38BDF8",
      blurb:"Powers of ten, the multiplication and division algorithms, decimal and fraction operations, volume and the coordinate plane."}
};

/* Weeks 2–5 of Mission 01. Sets carry an explicit `w`; anything without one
 * is Week 1, which keeps every previously authored set working untouched. */
const lessonFor = id => ALL_LESSONS[id] || LESSONS_WEEKLY[String(id).replace(/p\d+$/,"")];

const ALL_LESSONS = Object.assign({}, LESSONS, LESSONS_U2, LESSONS_U3, LESSONS_U4, LESSONS_U5, LESSONS_U6, LESSONS_U7, LESSONS_U8,
  LESSONS_Y5_U1, LESSONS_Y5_U2, LESSONS_Y5_U3, LESSONS_Y5_U4, LESSONS_Y5_U5, LESSONS_Y5_U6, LESSONS_Y5_U7, LESSONS_Y5_U8);

// Year Two sets join the global lookup list once both years have loaded.
ALL_SETS.push(...ALL_SETS_Y5);

/* Math's entry on the Baskin School landing page. The two courses inside it
 * (3rd grade, 5th grade) stay a per-child setting — see CURRICULA above — so
 * the landing page shows one Math card and the child's own course under it. */
window.Subjects.register({
  id: "math",
  name: "Adventures in Big Math",
  tagline: "Missions · Practice Bay · Streak Runs",
  color: "#FF9F1C",
  glyph: "×",
  gradient: "linear-gradient(150deg,#FF9F1C,#F472B6)",
  blurb: "Eight missions a year, each with a Big Question. Practice adapts to what you already know and stops when you have proved it.",
  status: "live",
  order: 10,
  // The child picks their year on the landing card. Both years are the same
  // eight-mission shape; the sets, banks and worksheets differ.
  // The grade alone. A signed-in child is choosing their own placement, not
  // choosing between people, and must never see another child's name here.
  levels: Object.keys(CURRICULA).map(k=>{
    const ST = window.__CURR && window.__CURR.STUDENTS;
    return {id:k,
      label: ST ? ST.levelLabel(k) : CURRICULA[k].label.replace(/ Math$/,""),
      sub:   ST ? ST.gradeOf(k) : CURRICULA[k].sub.split(" \u00b7 ")[0]};
  }),
  open: "builtin"
});

Object.assign(window.__CURR, {CURRICULA, lessonFor, ALL_LESSONS});
})();
