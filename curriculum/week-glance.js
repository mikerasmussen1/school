/* ============================================================================
 * WEEK GLANCE — one week of a child's work, readable in one look.
 * ----------------------------------------------------------------------------
 * Feeds the teacher's weekly panel: a grid of every question the child met
 * this week, coloured by what actually happened to it, then what went well,
 * what was a struggle, and which missed questions are worth another meeting.
 *
 * FOUR COLOURS, AND WHAT EACH ONE CLAIMS
 *   green   right on the FIRST recorded try. The honest signal — corrections
 *           are a virtue but they are a different fact.
 *   yellow  wrong first, right later. The child fixed their own work; that is
 *           worth seeing as itself, not laundered into green or left as red.
 *   red     tried, never got it right. These are the only cells that turn
 *           into review suggestions — yellow already got its correction, and
 *           gray was never met at all.
 *   gray    in the week's bank but no attempt recorded. Deliberately NOT
 *           called wrong: pLog keeps the last 60 entries per set, so an old
 *           answer can age out, and "not seen" must never read as "failed".
 *
 * Everything here is pure and takes the record as arguments, so it can be
 * tested without a browser and reused by any screen. Nothing in here writes;
 * approving a suggestion returns a NEW queue for the caller to store.
 *
 * THE REVIEW QUEUE
 * A teacher-approved list of question ids, shown to the child at the top of
 * practice until each is answered right once. Entries carry the question ID
 * (QTypes.idFor — content, not position) and the set it came from, so the
 * attempt logs against the real item and history stays coherent. Capped,
 * deduped, and done entries are kept (not deleted) so a resolved suggestion
 * does not come straight back next week.
 * ==========================================================================*/
(function(){
  /* Sized for a WEEK of review, not a morning. Around twenty questions a
   * week is the target — a real second pass over what last week missed — but
   * no morning ever sees more than a handful: serve() below paces the queue
   * out at a few per day across warm-up and sprint, so the queue can be deep
   * while the child's day stays light. */
  const QUEUE_CAP = 24;      // room for a full week's approvals plus carryover
  const SUGGEST_CAP = 20;    // about a week's worth of review, bundled by day
  const DONE_KEEP_DAYS = 28; // how long a resolved item blocks re-suggestion
  const SERVE_WARMUP = 3;    // review questions per morning in the practice block
  const SERVE_SPRINT = 2;    // quick-fire review questions folded into the sprint

  /* One item's colour, from its attempts oldest-first.
   * `ok:null` entries are ungraded types riding along in the log — they are
   * evidence of contact but not of correctness, so alone they stay gray. */
  function itemStatus(entries){
    const graded = (entries||[]).filter(e => e && e.ok !== null && e.ok !== undefined);
    if(!graded.length) return "gray";
    const first = graded[0];
    const everRight = graded.some(e => e.ok === true);
    if(first.ok === true) return "green";
    return everRight ? "yellow" : "red";
  }

  /* The grid for one week of sets.
   *
   * `sets` are the week's five, in order — the sets ARE the days in this
   * curriculum, so columns are days without any date arithmetic. Cells are in
   * bank order and numbered from 1, matching how the child and the printed
   * sheet both count.
   */
  function weekGrid(sets, pLog, idFor, pAns){
    return (sets||[]).map(set => {
      const byQid = {};
      ((pLog||{})[set.id]||[]).forEach(e => {
        (byQid[e.qid] = byQid[e.qid] || []).push(e);
      });
      const typed = (pAns||{})[set.id]||{};
      const cells = (set.items||[]).map((it, i) => {
        const qid = idFor(set, it);
        let status = itemStatus(byQid[qid]);
        /* ANSWERED BUT NOT YET CHECKED. pAns holds what the child has typed,
         * saved as they type it — so work in progress is visible on the
         * teacher's glance in real time, before Check is ever pressed. It is
         * its own colour, not green: an unchecked answer is evidence of
         * effort, not of correctness, and a glance that pre-judged it either
         * way would be guessing. Any graded attempt outranks it. */
        if(status === "gray" && String(typed[i]==null?"":typed[i]).trim() !== "")
          status = "pending";
        return {n:i+1, qid, setId:set.id, t:(it.t==null?null:it.t),
                q:String(it.q||""), status};
      });
      return {setId:set.id, label:set.label||set.id, title:set.title||"", cells};
    });
  }

  /* What went well / what was a struggle, as short factual lines.
   *
   * Claims are counted, not adjectived: "9 of 13 right first try" can be
   * checked against the grid above it; "did great" cannot. A day with nothing
   * attempted contributes nothing — absence of evidence stays absent.
   */
  function summarise(grid){
    const well = [], struggle = [];
    let weekGreen = 0, weekTried = 0;
    const redByTier = {};
    let pending = 0;
    grid.forEach(col => {
      pending += col.cells.filter(c => c.status === "pending").length;
      const tried = col.cells.filter(c => c.status !== "gray" && c.status !== "pending");
      if(!tried.length) return;
      const green = tried.filter(c => c.status === "green").length;
      const yellow = tried.filter(c => c.status === "yellow").length;
      const red = tried.filter(c => c.status === "red");
      weekGreen += green; weekTried += tried.length;
      if(green === tried.length && tried.length >= 3)
        well.push(col.label+" "+col.title+" — all "+tried.length+" right first try");
      else if(red.length === 0 && yellow > 0)
        well.push(col.label+" "+col.title+" — "+yellow+" fixed without help, none left wrong");
      red.forEach(c => { const k = c.t==null?"?":c.t; redByTier[k]=(redByTier[k]||0)+1; });
      if(red.length)
        struggle.push(col.label+" "+col.title+" — "+red.length+" never corrected"+
          (green ? " ("+green+" of "+tried.length+" right first try)" : ""));
    });
    // The aggregate line is a fallback for a decent week with no standout day,
    // not a header — a day that earned its own line should lead with it.
    if(weekTried && !struggle.length && well.length === 0)
      well.push(weekGreen+" of "+weekTried+" attempted questions right first try");
    return {well, struggle, pending,
            attempted:weekTried, firstTryRight:weekGreen};
  }

  /* Which never-corrected questions deserve another meeting.
   *
   * Only red cells — yellow got its correction and gray was never met. Ranked
   * newest-wrong-first because that is what the coming week should answer.
   * Anything already queued, or resolved within the keep window, stays out so
   * approving is idempotent and a fixed item does not nag.
   */
  function suggest(grid, pLog, queue, today, vouched){
    const q = queue||[];
    const blocked = new Set(q
      .filter(e => !e.done || (today - (e.doneAt||0)) < DONE_KEEP_DAYS)
      .map(e => e.qid));
    const v = vouched||{};
    const reds = [], yellows = [];
    grid.forEach(col => col.cells.forEach(c => {
      /* A VOUCHED day is a teacher's word that the work happened — recorded
       * when the app and the child disagreed (a curriculum change landed
       * mid-morning, work done that the log never saw). The grid stays honest
       * about what the log holds, but a vouched day's misses must not feed
       * the suggestion mill: the teacher already said the day is settled. */
      if(v[c.setId]) return;
      if(blocked.has(c.qid)) return;
      if(c.status !== "red" && c.status !== "yellow") return;
      const entries = ((pLog||{})[c.setId]||[]).filter(e => e.qid === c.qid && e.ok === false);
      const lastWrong = entries.length ? Math.max.apply(null, entries.map(e => e.d||0)) : 0;
      const tries = entries.length;
      const sug = {qid:c.qid, setId:c.setId, n:c.n, t:c.t, q:c.q, lastWrong, tries,
        kind:c.status,          // "red" | "yellow" — consumers may care which
        evidence: c.status === "red"
          ? tries+" wrong "+(tries===1?"try":"tries")+", never corrected"
          : "missed once, then fixed — worth checking it stuck"};
      (c.status === "red" ? reds : yellows).push(sug);
    }));
    /* Never-corrected first, always — a yellow was already fixed once, so it
     * only fills the space the reds leave. Both ranks run newest-wrong-first
     * with tries as the tiebreak. A week's suggestions can now genuinely fill
     * a week of review rather than one morning's. */
    const rank = (a,b) => (b.lastWrong-a.lastWrong) || (b.tries-a.tries);
    reds.sort(rank); yellows.sort(rank);
    return reds.concat(yellows).slice(0, SUGGEST_CAP);
  }

  /* Approve: a new queue with this suggestion in it. Refuses quietly past the
   * cap — the caller shows why — and never duplicates a live entry. */
  function approve(queue, sug, today){
    const q = (queue||[]).slice();
    if(q.some(e => e.qid === sug.qid && !e.done)) return {queue:q, added:false, why:"already queued"};
    const live = q.filter(e => !e.done).length;
    if(live >= QUEUE_CAP) return {queue:q, added:false, why:"queue full ("+QUEUE_CAP+")"};
    q.push({qid:sug.qid, setId:sug.setId, t:(sug.t==null?null:sug.t),
            addedAt:today, tries:0, done:false});
    return {queue:q, added:true};
  }

  /* The child answered a review item. Right retires it; wrong counts the try.
   * Entries are never deleted here — done ones block re-suggestion above and
   * are pruned only when stale. */
  function record(queue, qid, ok, today){
    let changed = false;
    const q = (queue||[]).map(e => {
      if(e.qid !== qid || e.done) return e;
      changed = true;
      return ok ? {...e, done:true, doneAt:today}
                : {...e, tries:(e.tries||0)+1, lastTry:today};
    });
    return changed ? prune(q, today) : q;
  }

  /* Suggestions grouped into bundles — one per source set, in rank order.
   * A bundle is the unit a teacher thinks in ("Tuesday's misses"), so it is
   * the unit they approve in. Grouping never reorders within a bundle. */
  function bundle(sugs){
    const by = {}, order = [];
    (sugs||[]).forEach(s => {
      if(!by[s.setId]){ by[s.setId] = []; order.push(s.setId); }
      by[s.setId].push(s);
    });
    return order.map(id => ({setId:id, sugs:by[id]}));
  }

  /* Approve several at once — a bundle, or everything on screen.
   *
   * Fills the queue as far as it goes and reports what would not fit, rather
   * than refusing the lot or silently dropping the tail. Approving a bundle
   * twice adds nothing the second time, same as single approve. */
  function approveMany(queue, sugs, today){
    let q = (queue||[]).slice();
    let added = 0; const skipped = [];
    (sugs||[]).forEach(s => {
      const r = approve(q, s, today);
      q = r.queue;
      if(r.added) added++;
      else skipped.push({qid:s.qid, why:r.why});
    });
    return {queue:q, added:added, skipped:skipped};
  }

  function due(queue){ return (queue||[]).filter(e => !e.done); }

  /* TODAY'S portion of the queue, split across the two places review lives.
   *
   * A deep queue must not become a wall: the child sees a few questions per
   * morning, every morning, until the queue drains — that is what makes
   * twenty a week feel like review instead of punishment. An entry answered
   * wrong today does not come back today (lastTry); tomorrow it does.
   *
   * CHANNELS. Warm-Up-tier questions (t 0) go to the SPRINT — they are
   * quick-fire facts and the sprint is the quick-fire place. Everything else
   * goes to the practice block, where there is room to think. Sprint-bound
   * entries overflow into the practice block when the sprint's daily slots
   * are full, never the reverse: a Challenge question fired at sprint pace
   * is what made the Year-Two sprints harder than the lessons.
   */
  function serve(queue, today, caps, sprintFit){
    const c = caps || {};
    const wCap = c.warmup != null ? c.warmup : SERVE_WARMUP;
    const sCap = c.sprint != null ? c.sprint : SERVE_SPRINT;
    const fresh = due(queue).filter(e => e.lastTry !== today);
    const sprint = [], warmup = [];
    fresh.forEach(e => {
      /* sprintFit is the caller saying which entries the sprint can PHYSICALLY
       * take — its answer box is a numeric keypad, so "tenths" cannot be typed
       * there no matter how warm-up-ish the question is. An unfit entry falls
       * through to the practice block instead of being routed somewhere it can
       * never be answered, which would strand it in the queue forever. */
      if(e.t === 0 && (!sprintFit || sprintFit(e)) && sprint.length < sCap) sprint.push(e);
      else if(warmup.length < wCap) warmup.push(e);
    });
    return {sprint, warmup, remaining:fresh.length - sprint.length - warmup.length};
  }

  function prune(queue, today){
    return (queue||[]).filter(e => !e.done || (today-(e.doneAt||0)) < DONE_KEEP_DAYS);
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.WeekGlance = {itemStatus, weekGrid, summarise, suggest,
                              approve, approveMany, bundle, record, due, serve, prune,
                              QUEUE_CAP, SUGGEST_CAP, DONE_KEEP_DAYS,
                              SERVE_WARMUP, SERVE_SPRINT};
})();
