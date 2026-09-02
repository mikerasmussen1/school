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
  const BREAKS = [
    {from:{y:2026,m:11,d:23}, to:{y:2026,m:11,d:27}, name:"Thanksgiving week"},
    {from:{y:2026,m:12,d:21}, to:{y:2027,m:1,d:1},   name:"Christmas break"},
    {from:{y:2027,m:3,d:29},  to:{y:2027,m:4,d:2},   name:"Spring break"}
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

  /* Compare where he is against where the calendar says he should be.
   * frontierIndex comes from la-mastery.firstIncomplete().                  */
  function pacing(frontierIndex, dt){
    const sch = scheduledDay(dt);
    if(sch.before)   return {state:"before",  text:sch.note};
    if(sch.after)    return {state:"after",   text:sch.note};
    const expected = (sch.weekend || sch.onBreak)
      ? schoolDayNumber(dt || new Date())      // days that should be finished
      : sch.index;                             // today's day is not owed yet
    const diff = expected - frontierIndex;
    if(sch.onBreak) return {state:"break", diff:diff, text:sch.note};
    if(sch.weekend) return {state:"weekend", diff:diff, text:sch.note};
    if(diff > 0)  return {state:"behind", diff:diff,
      text:"Behind by "+diff+" day"+(diff===1?"":"s")+". Finish those before today's work opens."};
    if(diff < 0)  return {state:"ahead", diff:-diff,
      text:"Ahead by "+(-diff)+" day"+(diff===-1?"":"s")+". Good — that is how to cover a day you will be away."};
    return {state:"on", diff:0, text:"On schedule."};
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_CALENDAR = {
    START, BREAKS, TOTAL, DAYS,
    startDate, isSchoolDay, inBreak, schoolDayNumber,
    scheduledDay, dateForIndex, longDate, shortDate, pacing
  };
})();
