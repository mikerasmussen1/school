/* ============================================================================
 * MATH — THE DAY
 * ----------------------------------------------------------------------------
 * One question, answered in one place: WHAT IS TODAY, and what is in it?
 *
 * Before this, a child arriving at maths landed in a browser — mission, then
 * week, then set, then tier — and had to work out for themselves where they
 * had got to. Word Voyagers never asked that: it opens on the day. This module
 * is the maths half of that, so both subjects answer "what do I do now" the
 * same way.
 *
 * A SET IS A DAY. math-sequence.js established it and the vouch system relies
 * on it ("he did this" is recorded against a set). Nothing here re-litigates
 * that; it takes the ordered sets from MATH_SEQ and works in the same units.
 *
 * THE ANCHOR — why today is not simply the frontier.
 *
 * The frontier is DERIVED: the first set with no grade recorded. That is the
 * right default and it is what a child who works in order always gets. But it
 * is computed from evidence, so a record scattered by testing — days done in
 * several different weeks, out of order — puts the frontier at the earliest
 * hole, which may be nowhere near where the child actually is.
 *
 * The fix is NOT to fake the missing evidence. Marking those sets "done" to
 * move the frontier would write grades that never happened into pChecked,
 * which the grader, the suggestion mill and the teacher's week grid all read.
 * The record has to stay honest about what was actually answered.
 *
 * So an anchor is a PIN, held beside the record rather than inside it: "start
 * counting my days from here". Today is then the first unfinished set AT OR
 * AFTER the pin. That makes the pin self-advancing — pin day 12, finish 12 and
 * 13, and today is 14 without touching the pin again — and it deliberately
 * ignores holes BEHIND the pin, which is the whole point: those are the test
 * runs, and the child should not be dragged back to them every morning.
 * Clearing the anchor restores plain frontier behaviour.
 *
 * THE SEVEN SECTIONS, in the order a child meets them. The order is fixed and
 * lives here rather than in the view, so it is one decision in one place.
 * ==========================================================================*/
(function(){

  /* Order matters and is the point of the module. `from` names where the
   * section's questions come from, because three of them used to overlap:
   * the review queue was served INTO the sprint and the warm-up block, so a
   * question could appear twice under two different names. Each section now
   * draws from exactly one source. */
  const SECTIONS = [
    {key:"lesson",    name:"Lesson",    from:"today's concept, plus review concepts carried forward",
     tier:null, blurb:"What today is about."},
    {key:"review",    name:"Review",    from:"what you have missed, picked automatically each morning",
     tier:null, blurb:"The things you got wrong before, back for another go."},
    {key:"sprint",    name:"Sprint",    from:"number facts below the current lesson",
     tier:null, blurb:"Fast and timed. Facts you already own."},
    {key:"warmup",    name:"Warm-Up",   from:"this day's own tier-0 questions",
     tier:0,    blurb:"Facts you already own, kept sharp."},
    /* Challenge sits BEFORE Core deliberately. Beating it can excuse the day's
     * Core (see coreOptional), so it has to be offered first or the excuse
     * arrives after the work it was meant to save. */
    {key:"challenge", name:"Challenge", from:"this day's own tier-2 questions",
     tier:2,    blurb:"Puzzles and proofs. Getting stuck here is the point."},
    {key:"core",      name:"Core",      from:"this day's own tier-1 questions",
     tier:1,    blurb:"The new skill."},
    {key:"bonus",     name:"Bonus",     from:"generated from how the sections above went",
     tier:null, blurb:"Built for you, from today."}
  ];

  const KEYS = SECTIONS.map(s => s.key);

  function seq(){ return (window.__CURR||{}).MATH_SEQ; }

  /* BEATING CHALLENGE CAN EXCUSE CORE — but only on a day thick enough for
   * that to mean something.
   *
   * The streak bar already bends to the tier (min(5, items in it)), so a
   * two-item Challenge "closes" on two right answers. That is fine as a badge
   * and far too thin as a reason to skip the day's actual instruction: Core is
   * grade level +1, it IS the new skill, while Challenge is explicitly work
   * nobody is expected to finish first time.
   *
   * So the excuse is gated on the tier holding at least this many items.
   * Measured against the authored banks before choosing the number — counting
   * sets that hold AT LEAST four Challenge items, which is what this gate
   * actually asks:
   *     Year One   178 of 190 sets   93.7%
   *     Year Two   168 of 175 sets   96.0%
   * So a floor of 4 leaves the skip available on all but ~12 days of Year One
   * and ~7 of Year Two. Those genuinely thin days never offer it, which is the
   * right answer for them anyway.
   *
   * (Note for anyone re-measuring: ALL_SETS holds BOTH years — 190 Year One
   * plus 175 Year Two — so a tally of it is not a Year One figure. An earlier
   * version of this comment made exactly that mistake.)
   *
   * Raising this to 5 would switch the feature off for most of the year;
   * lowering it to 2 would let two right puzzle answers buy a skip. */
  const CHALLENGE_SKIP_MIN = 4;

  function coreOptional(counts, done){
    const c = counts || {}, d = done || {};
    return (c.challenge | 0) >= CHALLENGE_SKIP_MIN && !!d.challenge && !d.core;
  }

  /* REVIEW BUILDS ITSELF.
   *
   * Review used to require a teacher: the mill suggested, a grown-up approved,
   * the approved questions queued, the queue served a few a morning. Two things
   * were wrong with that. It put a daily adult step between a child and the
   * work they most needed — miss the step and review simply stopped. And the
   * queue had a hard cap of 24, which, once full, silently refused every new
   * approval: the teacher pressed "add these 20" and nothing happened, with no
   * message, because the refusal reason was discarded by the caller.
   *
   * So the approval is gone. Review is now assembled every morning from the
   * same evidence the mill always used — what was missed and never corrected,
   * newest first — and served straight to the child.
   *
   * WHAT IT WILL NOT DO:
   *   - repeat a question already answered today (that is a re-test, not review)
   *   - resurrect a question a teacher vouched away (their word still settles it)
   *   - serve more than DAILY_REVIEW in one morning, however deep the backlog;
   *     a wall of corrections is a punishment, and the backlog is not going
   *     anywhere.
   *
   * Anything a teacher HAS explicitly queued is served first, so the manual
   * route still works for anyone who wants it — it is just no longer required
   * for review to happen at all.                                            */
  const DAILY_REVIEW = 5;

  function autoReview(suggestions, queued, answeredToday, cap){
    const n = (cap == null ? DAILY_REVIEW : Math.max(0, cap | 0));
    if(!n) return [];
    const seen = {}, out = [];
    const answered = answeredToday || {};

    const take = list => {
      (list || []).forEach(s => {
        if(out.length >= n) return;
        const qid = s && s.qid;
        if(!qid || seen[qid] || answered[qid]) return;
        seen[qid] = 1;
        out.push(s);
      });
    };

    // A teacher's explicit pick outranks the mill's — they know something it
    // does not. Everything else is filled from the evidence.
    take(queued);
    take(suggestions);
    return out;
  }

  /* WHICH SET IS TODAY.
   *
   * Returns {set, idx, source, complete}. `source` is "anchor" when a pin is
   * in play, "frontier" when it is not, and the caller shows the difference so
   * a pinned day is never silently different from a computed one.
   *
   * An anchor pointing at an id that is not in this course (a bank switch, a
   * year change, a typo) is IGNORED rather than fatal — falling back to the
   * frontier always yields a real day, where honouring a dangling pin would
   * open nothing at all. */
  function resolveDay(sets, pChecked, anchor){
    const S = seq();
    if(!S) return {set:null, idx:-1, source:"none", complete:false};
    const ord = S.orderedIds(sets||[]);
    if(!ord.length) return {set:null, idx:-1, source:"none", complete:false};

    let start = 0, source = "frontier";
    if(anchor){
      const a = ord.findIndex(x => x.id === anchor);
      if(a >= 0){ start = a; source = "anchor"; }
    }

    for(let i = start; i < ord.length; i++){
      if(!S.isDone(ord[i].id, pChecked))
        return {set:ord[i], idx:i, source:source, complete:false};
    }
    /* Everything from the pin onward is finished. Report complete rather than
     * silently rewinding to a hole behind the pin — the child has genuinely
     * finished the run they were pointed at, and a teacher moving the pin is
     * the honest way out. */
    return {set:null, idx:ord.length, source:source, complete:true};
  }

  /* Is this pin actually doing anything? A pin that sits exactly where the
   * frontier already is, is noise — worth telling a teacher so they can clear
   * it rather than wonder what it is holding. */
  function anchorIsRedundant(sets, pChecked, anchor){
    if(!anchor) return false;
    const withPin = resolveDay(sets, pChecked, anchor);
    const without = resolveDay(sets, pChecked, null);
    return !!withPin.set && !!without.set && withPin.set.id === without.set.id;
  }

  /* How many days were skipped over by pinning here — stated so the teacher
   * setting the pin sees the cost, rather than discovering it later in the
   * grid. Counts only genuine holes BEFORE the pin. */
  function skippedBehind(sets, pChecked, anchor){
    const S = seq(); if(!S || !anchor) return 0;
    const ord = S.orderedIds(sets||[]);
    const a = ord.findIndex(x => x.id === anchor);
    if(a < 0) return 0;
    let n = 0;
    for(let i = 0; i < a; i++) if(!S.isDone(ord[i].id, pChecked)) n++;
    return n;
  }

  /* THE DAY'S SECTIONS, in order, each with enough for the view to draw a row
   * without asking anything else.
   *
   * counts come from the caller because every source lives somewhere
   * different — items on the set, the queue in week-glance, facts in the
   * sprint, rounds in dyn. This module owns the ORDER and the STATE rules;
   * it does not reach into those stores itself, which is what keeps it pure
   * and testable.
   *
   *   state "ready"  something to do
   *         "done"   finished today
   *         "empty"  nothing here for this day (no challenge items authored,
   *                  an empty review queue) — shown greyed, never hidden, so
   *                  the shape of a day is the same every morning
   *         "locked" deliberately not open yet (bonus before the work)
   *         "optional" open, worth doing, but no longer required today —
   *                  Core once the day's Challenge has been beaten           */
  function sectionsFor(counts, done){
    const c = counts || {}, d = done || {};
    const skip = coreOptional(c, d);
    return SECTIONS.map(s => {
      const n = Math.max(0, (c[s.key] | 0));
      let state;
      if(s.key === "bonus" && !d.bonusUnlocked)    state = "locked";
      else if(n === 0)                             state = "empty";
      else if(d[s.key])                            state = "done";
      else if(s.key === "core" && skip)            state = "optional";
      else                                         state = "ready";
      return {key:s.key, name:s.name, from:s.from, blurb:s.blurb,
              tier:s.tier, count:n, state:state,
              note: state === "optional"
                ? "Optional — you beat today's Challenge. Do it if you want more."
                : ""};
    });
  }

  /* The first section with work left — what a "start" button should open, and
   * what the page scrolls to. Null when the day is finished. */
  function nextSection(sections){
    const list = sections || [];
    for(let i = 0; i < list.length; i++) if(list[i].state === "ready") return list[i];
    return null;
  }

  /* A day is finished when every section that HAD REQUIRED work is done.
   *
   * Empty, locked and optional sections cannot hold a day open: a day with no
   * Challenge authored must still be finishable, and a Core excused by beating
   * the Challenge must not leave the child staring at an unfinished day they
   * were just told they could skip. */
  /* WHAT THE DAY REQUIRES. One definition, because dayComplete and progress
   * must never disagree — a header reading "5 of 5" beside a day the app still
   * considers unfinished is the exact confusion this screen exists to remove.
   * They used to filter separately; an edit to one would have desynced them. */
  function required(sections){
    return (sections || []).filter(s => s.state === "ready" || s.state === "done");
  }

  function dayComplete(sections){
    const req = required(sections);
    return req.length > 0 && req.every(s => s.state === "done");
  }

  /* "3 of 5 done" for the header — the one line that answers "am I finished?"
   * without reading seven rows. Counts only what the day actually requires, so
   * the denominator matches what dayComplete is waiting for. */
  function progress(sections){
    const list = sections || [];
    const req = required(sections);
    const done = req.filter(s => s.state === "done").length;
    /* Only what is genuinely AVAILABLE but not required. A locked section is
     * neither — offering "1 extra" for something the child cannot open yet
     * would be a promise the page does not keep. */
    const extra = list.filter(s => s.state === "optional").length;
    return {done: done, total: req.length,
            complete: dayComplete(sections),
            extra: extra};
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.MATH_DAY = {SECTIONS, KEYS, CHALLENGE_SKIP_MIN, DAILY_REVIEW,
                            autoReview, resolveDay,
                            anchorIsRedundant, skippedBehind, coreOptional,
                            sectionsFor, nextSection, dayComplete, progress};
})();
