/* ============================================================================
 * WHO EACH TRACK BELONGS TO
 * ----------------------------------------------------------------------------
 * Every subject in this app runs two grade tracks under the same two ids —
 * "y3" and "y5" — so the boys can be named once, here, instead of having their
 * names pasted into the maths registry, the Word Voyagers page and the Field
 * Notes page separately. Change a name in this file and it changes everywhere.
 *
 * WHY THIS FILE EXISTS AT ALL. A nine-year-old choosing between two buttons
 * marked "3rd Grade" and "5th Grade" has to remember which one is his. A
 * button marked BROCK does not need remembering. That is the whole point, so
 * the name comes FIRST in the label and the grade follows as the smaller
 * detail: "BROCK · 3rd" rather than "3rd Grade (Brock)".
 *
 * The ids stay y3/y5 on purpose. They are written into every saved progress
 * key already — "y1:14", "sci.grade", pChecked entries — so renaming them to
 * the boys' names would wipe completed work for no visible benefit. Names are
 * a display layer over stable ids, which is also what makes them safe to
 * change later.
 * ==========================================================================*/
(function(){

  const STUDENTS = {
    y3: {name:"BROCK", grade:"3rd Grade", short:"3rd", colour:"#FF9F1C"},
    y5: {name:"HANK",  grade:"5th Grade", short:"5th", colour:"#38BDF8"}
  };

  /* "BROCK · 3rd" — for a chip or tab where space is tight. */
  function tab(id){
    const s = STUDENTS[id];
    return s ? (s.name + " \u00b7 " + s.short) : String(id||"");
  }

  /* "BROCK — 3rd Grade" — for a heading with room to breathe. */
  function full(id){
    const s = STUDENTS[id];
    return s ? (s.name + " \u2014 " + s.grade) : String(id||"");
  }

  function nameOf(id){ const s=STUDENTS[id]; return s?s.name:""; }
  function gradeOf(id){ const s=STUDENTS[id]; return s?s.grade:""; }

  window.__CURR = window.__CURR || {};
  window.__CURR.STUDENTS = {STUDENTS, tab, full, nameOf, gradeOf};
})();
