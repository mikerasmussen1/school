/* ============================================================================
 * MATH — DAY SEQUENCING
 * ----------------------------------------------------------------------------
 * The same rule Word Voyagers uses, applied to maths:
 *   NO GAP BEHIND YOU. A set with unfinished work before it is flagged.
 *   NO CAP IN FRONT OF YOU. Once caught up, there is no limit on how far
 *   ahead a child may work in one sitting.
 *
 * AND NOTHING IS LOCKED. Per instruction, every set stays clickable. What
 * this module produces is a status, not a barrier: the picker tints
 * out-of-order sets and the page names the set to go back to. Sequencing here
 * is advice a child can overrule, and the parent view records what happened.
 *
 * WHAT COUNTS AS A DAY. Maths has no day-completion marker — it tracks
 * practice sets. But the sets ARE the days: five per week, labelled 1.1, 1.2,
 * and so on, 180 of them in third grade and 175 in fifth. So a set is the
 * unit of sequencing, and "done" means it has been graded at any tier, which
 * is what pChecked already records.
 *
 * ORDERING — the part that needed care. ALL_SETS is in AUTHORING order, not
 * curriculum order: every week-2-and-later set comes first and all the week-1
 * sets are appended at the end, so u8w4p5 is immediately followed by u2p1.
 * Sequencing on array position would therefore have told a child working
 * through Unit 2 Week 1 that he had skipped most of the year. The ids encode
 * unit, week and day, so this module parses and sorts by those instead.
 * Verified: all 180 third-grade and 175 fifth-grade ids parse, with no
 * duplicate positions in either year.
 * ==========================================================================*/
(function(){

  /* id -> {u, w, d}. Handles every shape in use:
   *   p3            unit 1, week 1, day 3
   *   u4p2          unit 4, week 1, day 2
   *   u4w3p2        unit 4, week 3, day 2
   *   y5-prefixed   the same three, for fifth grade                         */
  function parseId(id){
    const s = String(id||"");
    let m;
    if((m = s.match(/^y5u(\d+)w(\d+)p(\d+)$/))) return {u:+m[1], w:+m[2], d:+m[3], y:5};
    if((m = s.match(/^y5u(\d+)p(\d+)$/)))       return {u:+m[1], w:1,     d:+m[2], y:5};
    if((m = s.match(/^u(\d+)w(\d+)p(\d+)$/)))   return {u:+m[1], w:+m[2], d:+m[3], y:3};
    if((m = s.match(/^u(\d+)p(\d+)$/)))         return {u:+m[1], w:1,     d:+m[2], y:3};
    if((m = s.match(/^p(\d+)$/)))               return {u:1,     w:1,     d:+m[1], y:3};
    return null;
  }

  const rank = p => p ? (p.u*10000 + p.w*100 + p.d) : Infinity;

  /* Curriculum-ordered ids for a course. Sets with unparseable ids are put at
   * the end rather than dropped, so nothing silently disappears from a picker
   * if an id shape is added later. */
  function orderedIds(sets){
    return (sets||[])
      .map(s => {
        const p = parseId(s.id);
        // Labels repeat across missions — every unit has a "1.1" — so a bare
        // label in a "go back to 1.3" message would be ambiguous. Carry a
        // mission-qualified name for anything shown to a child.
        return {id:s.id, label:s.label, p:p,
                fullLabel: p ? ("Mission "+p.u+" \u00b7 "+(s.label||("Week "+p.w+", day "+p.d)))
                             : (s.label||s.id)};
      })
      .sort((a,b) => rank(a.p) - rank(b.p) || String(a.id).localeCompare(String(b.id)));
  }

  /* A set is done once it has been graded at any tier. pChecked keys look like
   * "p1|all" or "p1|2", and older saves used the bare id. */
  function isDone(setId, pChecked){
    if(!pChecked) return false;
    if(pChecked[setId]) return true;
    const prefix = setId + "|";
    for(const k in pChecked){ if(pChecked[k] && k.indexOf(prefix)===0) return true; }
    return false;
  }

  /* Index of the first set not yet done. equals length when the year is done. */
  function frontier(sets, pChecked){
    const ord = orderedIds(sets);
    for(let i=0;i<ord.length;i++){ if(!isDone(ord[i].id, pChecked)) return i; }
    return ord.length;
  }

  /* "past" | "current" | "ahead" for one set, plus the set to go back to. */
  function statusOf(setId, sets, pChecked){
    const ord = orderedIds(sets);
    const idx = ord.findIndex(x => x.id === setId);
    const f   = frontier(sets, pChecked);
    if(idx < 0) return {state:"unknown", idx:-1, frontier:f, gap:false};
    if(idx <  f) return {state:"past",    idx, frontier:f, gap:false};
    if(idx === f) return {state:"current", idx, frontier:f, gap:false};
    return {state:"ahead", idx, frontier:f, gap:true,
            mustFinish: ord[f] || null, skipped: idx - f};
  }

  function summary(sets, pChecked){
    const ord = orderedIds(sets);
    const f = frontier(sets, pChecked);
    const doneCount = ord.filter(x => isDone(x.id, pChecked)).length;
    return {total: ord.length, frontier: f, done: doneCount,
            complete: f >= ord.length,
            next: ord[f] || null,
            // Days finished out of order — done, but with a gap before them.
            outOfOrder: Math.max(0, doneCount - f)};
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.MATH_SEQ = {parseId, rank, orderedIds, isDone, frontier, statusOf, summary};
})();
