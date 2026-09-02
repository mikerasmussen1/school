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
    y3: {name:"BROCK", grade:"3rd Grade", short:"3rd",
         colour:"#4ADE80", tint:"rgba(74,222,128,.13)", edge:"rgba(74,222,128,.42)"},
    y5: {name:"HANK",  grade:"5th Grade", short:"5th",
         colour:"#38BDF8", tint:"rgba(56,189,248,.13)", edge:"rgba(56,189,248,.42)"}
  };

  /* The three courses each boy has, as direct links.
   *
   * These are display names for the quick tabs only — the subjects keep their
   * own names on their cards and inside their pages. A nine-year-old scanning
   * a home page wants "Math Mission", not "Adventures in Big Math (choose a
   * level)", and wants it in his colour so he never has to read the other
   * boy's row at all.
   *
   * `level` is the track id inside that subject. Word Voyagers stores y1/y2
   * where the others store y3/y5, which is why it cannot simply be the
   * student id.                                                             */
  const TABS = [
    {subject:"math", label:"Math Mission",   level:{y3:"y3", y5:"y5"}},
    {subject:"la",   label:"Word Wisdom",    level:{y3:"y1", y5:"y2"}},
    {subject:"sci",  label:"Science Smarts", level:{y3:"y3", y5:"y5"}}
  ];

  /* Every tab for one boy, ready to render. */
  function tabsFor(id){
    const s = STUDENTS[id];
    if(!s) return [];
    return TABS.map(t => ({
      subject: t.subject,
      level: t.level[id],
      label: t.label,
      student: s.name,
      colour: s.colour, tint: s.tint, edge: s.edge
    }));
  }

  /* "BROCK - 3rd Grade" — the label on every level tab.
   * Spelled out in full rather than abbreviated to "3rd": these tabs are the
   * one place a boy decides which course is his, and a full grade name is
   * unambiguous where "3rd" alone reads as a rank or a date. */
  function tab(id){
    const s = STUDENTS[id];
    return s ? (s.name + " - " + s.grade) : String(id||"");
  }

  /* The short form, kept for anywhere genuinely tight. Not used on the tabs. */
  function shortTab(id){
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
  window.__CURR.STUDENTS = {STUDENTS, TABS, tabsFor, tab, shortTab, full, nameOf, gradeOf};
})();
