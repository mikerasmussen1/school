/* ============================================================================
 * WORD VOYAGERS — DAILY PLAN AND MASTERY GATING
 * ----------------------------------------------------------------------------
 * Two jobs:
 *   1. dayPlan()  — turn a week + weekday into an ordered, visible checklist
 *                   with a clear start and a clear end.
 *   2. Mastery    — decide what "done" means for each step, and build a
 *                   remediation round when it is not met.
 *
 * WHAT "DONE" MEANS. A step is done when it is finished AND, for anything
 * scored, when the score clears the mastery bar. Finishing a drill with 3 out
 * of 6 does not complete the step; it triggers a second round built from what
 * was missed. This is the difference between a progress bar and an assessment.
 *
 *   MASTERY = 0.80   Four of five, five of six, seven of eight.
 *
 * WHERE REMEDIATION QUESTIONS COME FROM. Honestly, not from thin air:
 *   Grammar   the items missed, plus fresh items from other weeks that drill
 *             the SAME standard; if that week's standard is unique, from the
 *             other weeks of the same unit, which is the nearest skill.
 *   Spelling  the words missed, plus the words from that week's twelve that
 *             the first round did not reach.
 *   Reading   the questions missed, re-asked after an explicit instruction to
 *             read the passage again. There is no larger pool of questions for
 *             a single passage, and questions about a DIFFERENT passage would
 *             not test whether this one was understood. Re-read and retry is
 *             the honest remediation here, and the page says so plainly rather
 *             than pretending it has generated new material.
 *
 * THE STUCK VALVE — the part that matters most for a self-led curriculum.
 * A child who cannot clear the bar must not be trapped in a loop. After
 * MAX_ROUNDS attempts the gate opens anyway, the day is marked "needs a look",
 * and the child is told plainly to go get a grown-up. Three failures in a row
 * is not a discipline problem, it is a signal that something was not taught
 * well enough, and no amount of re-serving the same items fixes that. Locking
 * a nine-year-old out of their whole school day over it would be cruel and
 * would teach them to hate the subject.
 *
 * The "needs a look" flag is surfaced on the For Parents tab, which is the
 * point: minimal parent engagement should mean the parent is called when they
 * are actually needed, not never.
 * ==========================================================================*/
(function(){

  const MASTERY = 0.80;
  const MAX_ROUNDS = 3;

  const curr = grade => grade==="y2" ? window.__CURR.LA_Y2 : window.__CURR.LA_Y1;

  /* ---- Day plans -------------------------------------------------------
   * Each weekday becomes 3–4 visible steps. `gate` says what completes it:
   *   "ack"    the child confirms they did it (reading aloud, studying a list)
   *            — including the quote of the day, which is a real part of the
   *            day's work and so belongs in the checklist rather than floating
   *            above it with no way to tick it off
   *   "score"  a drill that must clear MASTERY
   *   "photo"  a handwritten page graded from a photo
   *   "approve" a grown-up looks at the actual paper and marks it. This is
   *            the only step a child cannot complete for himself, and it is
   *            deliberately last: the photo feedback is instant and useful,
   *            but a machine reading a photograph is not the same as a parent
   *            holding the page, and handwriting is exactly the subject where
   *            that difference matters most.
   *   "end"    the explicit close of the day
   */
  const PLANS = {
    Mon: [
      {key:"quote", label:"Quote of the day",                gate:"ack",
       detail:"Read today's quote and the line under it.",
       done:"You read it."},
      {key:"read",  label:"Read the passage out loud",      gate:"ack",
       detail:"Read the whole passage aloud, once, at a pace where every word is clear.",
       done:"You have read it aloud all the way through."},
      {key:"rq",    label:"Comprehension questions",         gate:"score",
       detail:"Answer using evidence from the text. You need 80% to pass.",
       done:"You scored 80% or better."},
      {key:"end",   label:"Finish Monday",                   gate:"end",
       detail:"Reading day complete.", done:"Day closed."}
    ],
    Tue: [
      {key:"quote", label:"Quote of the day",                gate:"ack",
       detail:"Read today's quote and the line under it.",
       done:"You read it."},
      {key:"skill", label:"Read this week's grammar focus",  gate:"ack",
       detail:"Read the skill name and the note under it before you start.",
       done:"You know what today's drill is about."},
      {key:"gz",    label:"Grammar drill",                   gate:"score",
       detail:"Six questions. You need 80% to pass.",
       done:"You scored 80% or better."},
      {key:"end",   label:"Finish Tuesday",                  gate:"end",
       detail:"Grammar day complete.", done:"Day closed."}
    ],
    Wed: [
      {key:"quote", label:"Quote of the day",                gate:"ack",
       detail:"Read today's quote and the line under it.",
       done:"You read it."},
      {key:"study", label:"Study the word list",             gate:"ack",
       detail:"Say each of the twelve words out loud before you start the drill.",
       done:"You have said every word aloud."},
      {key:"sq",    label:"Spelling drill",                  gate:"score",
       detail:"Listen and type. You need 80% to pass.",
       done:"You scored 80% or better."},
      {key:"end",   label:"Finish Wednesday",                gate:"end",
       detail:"Spelling day complete.", done:"Day closed."}
    ],
    Thu: [
      {key:"quote", label:"Quote of the day",                gate:"ack",
       detail:"Read today's quote and the line under it.",
       done:"You read it."},
      {key:"prompt",label:"Read today's assignment",         gate:"ack",
       detail:"Read the assignment, or press the listen button.",
       done:"You know what to write."},
      {key:"write", label:"Write it by hand on paper",       gate:"ack",
       detail:"Write the whole thing out. Take your time with your letters.",
       done:"Your page is finished."},
      {key:"photo", label:"Photograph it and get feedback",  gate:"photo",
       detail:"Take a picture of your page and press Grade this work.",
       done:"You have read your feedback."},
      {key:"approve", label:"Take it to a grown-up to mark", gate:"approve",
       detail:"Carry the paper to a grown-up. They look at the real page, not the photo, and mark it here.",
       done:"A grown-up has marked it."},
      {key:"end",   label:"Finish Thursday",                 gate:"end",
       detail:"Handwriting day complete.", done:"Day closed."}
    ],
    Fri: [
      {key:"quote", label:"Quote of the day",                gate:"ack",
       detail:"Read today's quote and the line under it.",
       done:"You read it."},
      {key:"speak", label:"Speak & Show task",               gate:"ack",
       detail:"Do this out loud with another person, then mark it done.",
       done:"You did it with someone."},
      {key:"rv",    label:"Week review drill",               gate:"score",
       detail:"Four mixed questions from this week. You need 80% to pass.",
       done:"You scored 80% or better."},
      {key:"end",   label:"Finish Friday and the week",      gate:"end",
       detail:"Week complete.", done:"Week closed."}
    ]
  };

  const DAYS = ["Mon","Tue","Wed","Thu","Fri"];
  const DAY_NAME = {Mon:"Monday",Tue:"Tuesday",Wed:"Wednesday",Thu:"Thursday",Fri:"Friday"};

  function dayPlan(grade, week, day){
    const Y = curr(grade);
    const wk = Y.WEEKS.find(w=>w.n===week);
    const steps = (PLANS[day]||PLANS.Mon).map((s,i)=>({...s, n:i+1}));
    return {
      day, dayName: DAY_NAME[day]||day,
      dayNumber: DAYS.indexOf(day)+1,
      totalDays: DAYS.length,
      week, weekTitle: wk?wk.title:"",
      steps, totalSteps: steps.length
    };
  }

  /* ---- Day sequencing --------------------------------------------------
   * The whole year is 180 ordered slots: (week-1)*5 + dayIndex, 0..179.
   *
   * THE RULE, which reconciles two things that sound opposed:
   *   You may not leave a GAP behind you. Day N is unavailable while any
   *   earlier day is unfinished — skipping Monday blocks Wednesday until
   *   Monday is done.
   *   There is NO CAP in front of you. The moment you are caught up, the next
   *   day opens, and finishing it opens the one after. A child preparing for
   *   a field trip can work as far forward in one sitting as he has stamina
   *   for; he simply cannot jump over anything.
   *
   * So "get current" and "get ahead" are the same mechanism seen from two
   * sides: the frontier is always the first unfinished day.
   *
   * excused: a parent can excuse a day (see excuseKey). An excused day counts
   * as finished for sequencing only. Without that, a family starting at week
   * 12, or one that genuinely lost a week to illness, would be walled out of
   * the rest of the year with no way through — a rule with no release valve
   * stops being a rule and becomes a trap.                                  */
  function absIndex(week, day){
    const d = DAYS.indexOf(day);
    return (week-1)*DAYS.length + (d<0?0:d);
  }
  function fromAbs(idx){
    const i = Math.max(0, Math.min(TOTAL_DAYS-1, idx));
    return {week: Math.floor(i/DAYS.length)+1, day: DAYS[i%DAYS.length]};
  }
  const TOTAL_DAYS = 36 * 5;

  function endKey(grade, week, day){ return grade+":"+week+":"+day+":end"; }
  function excuseKey(grade, week, day){ return grade+":"+week+":"+day+":excused"; }

  function dayFinished(grade, week, day, stepDone, excused){
    return !!(stepDone && stepDone[endKey(grade,week,day)]) ||
           !!(excused  && excused[excuseKey(grade,week,day)]);
  }

  /* The frontier: index of the first day not yet finished. 180 means the
   * whole year is done. */
  function firstIncomplete(grade, stepDone, excused){
    for(let i=0;i<TOTAL_DAYS;i++){
      const p = fromAbs(i);
      if(!dayFinished(grade, p.week, p.day, stepDone, excused)) return i;
    }
    return TOTAL_DAYS;
  }

  /* "past" already done · "current" the frontier · "ahead" blocked by a gap */
  function dayStatus(grade, week, day, stepDone, excused){
    const idx = absIndex(week, day);
    const frontier = firstIncomplete(grade, stepDone, excused);
    if(idx < frontier)  return {state:"past",    idx, frontier, blocked:false};
    if(idx === frontier) return {state:"current", idx, frontier, blocked:false};
    return {state:"ahead", idx, frontier, blocked:true, mustFinish:fromAbs(frontier)};
  }

  /* ---- Mastery --------------------------------------------------------- */
  function passed(score, total){
    if(!total) return false;
    return (score/total) >= MASTERY;
  }
  function neededFor(total){ return Math.ceil(total * MASTERY); }

  /* Fresh grammar items that drill the same thing, for a second round.
   * Prefers other weeks with the identical standard; falls back to the rest of
   * the unit. Never returns an item the child just saw. */
  function extraGrammarItems(grade, week, excludeIds, n){
    const Y = curr(grade);
    const wk = Y.WEEKS.find(w=>w.n===week);
    if(!wk) return [];
    const ex = {}; (excludeIds||[]).forEach(id=>ex[id]=1);

    const sameStandard = Y.WEEKS.filter(w=>w.n!==week && w.standard===wk.standard).map(w=>w.n);
    const sameUnit     = Y.WEEKS.filter(w=>w.n!==week && w.unit===wk.unit).map(w=>w.n);
    const order = sameStandard.concat(sameUnit.filter(x=>sameStandard.indexOf(x)===-1));

    const out = [];
    order.forEach(wn=>{
      if(out.length>=n) return;
      (Y.grammarSetFor(wn).items||[]).forEach(it=>{
        if(out.length<n && !ex[it.id]) { out.push(it); ex[it.id]=1; }
      });
    });
    return out;
  }

  /* Spelling words from this week the first round did not reach. */
  function extraSpellingItems(grade, week, excludeIds, n){
    const Y = curr(grade);
    const ex = {}; (excludeIds||[]).forEach(id=>ex[id]=1);
    return (Y.spellingSetFor(week).items||[]).filter(it=>!ex[it.id]).slice(0, n);
  }

  /* Build the next round after a failed attempt.
   * missed: the item objects the child got wrong (already answer-resolved)
   * seenIds: every item id served so far this day                         */
  function remediationRound(grade, week, kind, missed, seenIds, round){
    const missedList = (missed||[]).slice();
    let extra = [];
    let note = "";

    if(kind==="grammar"){
      extra = extraGrammarItems(grade, week, seenIds, Math.max(2, missedList.length));
      note = extra.length
        ? "Here are the ones you missed, plus a few more on the same skill."
        : "Here are the ones you missed. Read each question twice.";
    } else if(kind==="spelling"){
      extra = extraSpellingItems(grade, week, seenIds, Math.max(2, missedList.length));
      note = extra.length
        ? "The words you missed, plus a few more from this week's list."
        : "The words you missed. Listen to each one twice before typing.";
    } else { // reading
      extra = [];
      note = "Read the passage again before you answer. These are the questions you missed — there are no new questions for this passage, so the way to get them right is to go back to the text.";
    }

    return {
      items: missedList.concat(extra),
      note,
      round,
      isFinalRound: round >= MAX_ROUNDS
    };
  }

  /* What to say when a child has used up their attempts. Not a failure
   * message — a handoff. */
  function stuckMessage(kind){
    const what = kind==="reading" ? "this passage"
               : kind==="spelling" ? "these words"
               : "this grammar skill";
    return "You have given "+what+" a really good try. This one needs a grown-up, "+
           "not more attempts on your own — go and get someone, show them this screen, "+
           "and work through it together. That is the right move, not a failure. "+
           "You can carry on with the rest of the day.";
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_MASTERY = {
    MASTERY, MAX_ROUNDS, DAYS, DAY_NAME, PLANS,
    dayPlan, passed, neededFor,
    TOTAL_DAYS, absIndex, fromAbs, endKey, excuseKey,
    dayFinished, firstIncomplete, dayStatus,
    extraGrammarItems, extraSpellingItems, remediationRound, stuckMessage
  };
})();
