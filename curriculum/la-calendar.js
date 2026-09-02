/* ============================================================================
 * WORD VOYAGERS — SCHOOL CALENDAR
 * ----------------------------------------------------------------------------
 * Anchors the 180 school days to real dates.
 *
 *   FIRST DAY: Monday 31 August 2026 = Week 1, Monday.
 *
 * Weekdays only. With no breaks the 180th day lands on Friday 7 May 2027.
 * Real families take breaks, so BREAKS below lists date ranges that are not
 * school days; every break pushes the end of the year later rather than
 * consuming a lesson. Edit BREAKS freely — it is the one part of this file
 * a parent is expected to change.
 *
 * TWO DIFFERENT QUESTIONS, kept deliberately separate:
 *   "What day SHOULD he be on?"  the calendar answers this — scheduledDay()
 *   "What day CAN he work on?"   the frontier answers this — la-mastery.js
 *
 * They are not the same and should not be merged. The calendar is a schedule,
 * not a gate: falling two days behind must not lock a child out of school, it
 * should tell him he is two days behind. The sequencing rule already stops him
 * skipping. So the app always opens on the frontier (the actionable day) and
 * uses the calendar only to say whether he is ahead, on schedule, or behind.
 *
 * If you take an unplanned week off and do not add it to BREAKS, he will read
 * as five days behind — accurate, but if you never intend to make those days
 * up, excuse them on the For Parents tab and the count corrects itself.
 * ==========================================================================*/
(function(){

  const START = {y:2026, m:8, d:31};      // m is 1-based: 8 = August
  const DAYS  = ["Mon","Tue","Wed","Thu","Fri"];
  const TOTAL = 180;

  /* Date ranges that are NOT school days, inclusive both ends.
   * Add your own; the year simply extends. */
  /* Holiday schedule as supplied by the family.
   *
   * There is no fixed last day. The year runs its 180 school days and ends
   * when they are used up: with the breaks below that is Tuesday 8 June 2027.
   * Adding a break pushes that date later rather than costing a lesson, so
   * BREAKS can be edited freely without doing arithmetic. It is the one part
   * of this file a parent is expected to change.                             */
  const BREAKS = [
    {from:{y:2026,m:9, d:7},  to:{y:2026,m:9, d:7},  name:"Labor Day"},
    {from:{y:2026,m:11,d:23}, to:{y:2026,m:11,d:27}, name:"Thanksgiving Holidays"},
    {from:{y:2026,m:12,d:21}, to:{y:2027,m:1, d:1},  name:"Christmas / Winter Holidays"},
    {from:{y:2027,m:3, d:26}, to:{y:2027,m:4, d:2},  name:"Spring Holidays"}
  ];

  const toDate = o => new Date(o.y, o.m-1, o.d);
  const startDate = () => toDate(START);

  /* Local-date key, so timezone never shifts which day it is. */
  function ymd(dt){ return dt.getFullYear()*10000 + (dt.getMonth()+1)*100 + dt.getDate(); }

  function isWeekend(dt){ const w=dt.getDay(); return w===0 || w===6; }

  function inBreak(dt){
    const k = ymd(dt);
    for(let i=0;i<BREAKS.length;i++){
      const b = BREAKS[i];
      if(k >= ymd(toDate(b.from)) && k <= ymd(toDate(b.to))) return b;
    }
    return null;
  }

  function isSchoolDay(dt){ return !isWeekend(dt) && !inBreak(dt); }

  /* How many school days have STARTED as of dt, counting the first day as 1.
   * Returns 0 before the year begins. */
  function schoolDayNumber(dt){
    const s = startDate();
    if(ymd(dt) < ymd(s)) return 0;
    let n = 0;
    const cur = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    const target = ymd(dt);
    let guard = 0;
    while(ymd(cur) <= target && n < TOTAL && guard++ < 1200){
      if(isSchoolDay(cur)) n++;
      cur.setDate(cur.getDate()+1);
    }
    return n;
  }

  /* {week, day, index} the calendar says he should be on, or a reason why not. */
  function scheduledDay(dt){
    const d = dt || new Date();
    const s = startDate();
    if(ymd(d) < ymd(s)){
      return {before:true, week:1, day:"Mon", index:0,
              note:"The school year starts "+longDate(s)+"."};
    }
    const br = inBreak(d);
    if(br) return {onBreak:true, breakName:br.name, week:null, day:null, index:null,
                   note:br.name+" — no school today."};
    if(isWeekend(d)) return {weekend:true, week:null, day:null, index:null,
                             note:"It is the weekend. No school day scheduled."};
    const n = schoolDayNumber(d);
    if(n<=0 || n>TOTAL) return {after:true, week:36, day:"Fri", index:TOTAL-1,
                                note:"The 180-day year is complete."};
    const idx = n-1;
    return {week: Math.floor(idx/5)+1, day: DAYS[idx%5], index: idx, dayNumber: n};
  }

  /* The date a given school day falls on, for display. */
  function dateForIndex(idx){
    const s = startDate();
    const cur = new Date(s.getFullYear(), s.getMonth(), s.getDate());
    let n = 0, guard = 0;
    while(guard++ < 1200){
      if(isSchoolDay(cur)){ if(n===idx) return new Date(cur); n++; }
      cur.setDate(cur.getDate()+1);
    }
    return null;
  }

  const MONTHS=["January","February","March","April","May","June","July",
                "August","September","October","November","December"];
  const WEEKDAYS=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  function longDate(dt){
    if(!dt) return "";
    return WEEKDAYS[dt.getDay()]+" "+dt.getDate()+" "+MONTHS[dt.getMonth()]+" "+dt.getFullYear();
  }
  function shortDate(dt){
    if(!dt) return "";
    return WEEKDAYS[dt.getDay()].slice(0,3)+" "+dt.getDate()+" "+MONTHS[dt.getMonth()].slice(0,3);
  }

  /* WHERE HE IS IN THE YEAR — stated, not judged.
   *
   * This used to return "behind by 2 days" / "ahead by 3 days" by measuring
   * him against the calendar. That was right when there was a fixed last day
   * to hit. There is not one any more: the year ends when the 180 days are
   * done. So a pace verdict would be inventing a deadline nobody set, and
   * telling a nine-year-old he is failing to keep up with it.
   *
   * What is left is the useful half: which day it is, which school day he is
   * on, and how many remain. No behind, no ahead, no schedule to fall off.
   * The one thing still flagged is an actual GAP — a day skipped over — and
   * that is a fact about his work, not about the calendar.                  */
  function progress(frontierIndex, dt){
    const d = dt || new Date();
    const done = Math.max(0, Math.min(TOTAL, frontierIndex));
    const onDay = Math.min(TOTAL, done + 1);
    const br = inBreak(d);
    const today = br ? (br.name+" \u2014 no school today.")
                : isWeekend(d) ? "It is the weekend."
                : longDate(d)+".";
    if(done >= TOTAL){
      return {complete:true, done:done,
              text:today+" All 180 school days are finished. That is the whole year."};
    }
    return {complete:false, done:done, onDay:onDay,
            text:today+" You are on school day "+onDay+" of "+TOTAL+
                 ". "+(TOTAL-done)+" to go, and no deadline on them."};
  }

  /* Kept under the old name so nothing calling pacing() breaks; it simply no
   * longer returns a verdict. */
  const pacing = progress;

  window.__CURR = window.__CURR || {};
  /* When the 180th school day falls, given the breaks. */
  function yearEnd(){ return dateForIndex(TOTAL-1); }

  window.__CURR.LA_CALENDAR = {
    START, BREAKS, TOTAL, DAYS, yearEnd,
    startDate, isSchoolDay, inBreak, schoolDayNumber,
    scheduledDay, dateForIndex, longDate, shortDate, progress, pacing
  };
})();
