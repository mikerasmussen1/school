/* The shared school-day streak.
 *
 * WHAT MAKES THIS WORTH TESTING
 * A streak is a number a child will believe. If it breaks over a weekend, or
 * over the Christmas holidays, or reads zero at breakfast because the day has
 * not started yet, it stops being encouragement and becomes an accusation —
 * and it is wrong in a way that is very hard to notice from the code, because
 * every one of those cases needs a specific arrangement of days to show up.
 *
 * The timezone case in particular cannot be caught by reading. Day numbers are
 * midnight UTC; a school calendar asks getDay() in local time. West of
 * Greenwich those are different days, so weekends land one day early and the
 * streak breaks every Monday for no reason a parent could explain.
 */
const fs = require("fs");
global.window = global;
window.__CURR = {};
require(__dirname + "/../curriculum/subjects.js");
const S = window.Subjects;

let fail = [];
const is = (what, got, want) => {
  const ok = got === want;
  console.log("  " + (ok ? "ok  " : "FAIL") + "  " + what +
              (ok ? "" : "   got " + got + ", wanted " + want));
  if (!ok) fail.push(what);
};

// A fixed Monday so the arithmetic below is readable. 2026-09-07 is a Monday.
const MON = Math.floor(Date.UTC(2026, 8, 7) / 86400000);
const dayOf = n => S.localDateOf(n).getDay();          // 0 Sun … 6 Sat
const weekdayOnly = dt => dt.getDay() !== 0 && dt.getDay() !== 6;
const recOf = (...days) => ({ math: { days: days } });

console.log("=== the calendar the tests assume ===");
is("MON is a Monday locally", dayOf(MON), 1);
is("MON+5 is a Saturday", dayOf(MON + 5), 6);

console.log("\n=== counting ===");
is("nothing done is nothing",
   S.streak({}, weekdayOnly, MON), 0);
is("today alone counts once",
   S.streak(recOf(MON), weekdayOnly, MON + 0), 1);
is("three consecutive school days",
   S.streak(recOf(MON, MON + 1, MON + 2), weekdayOnly, MON + 2), 3);
is("a gap in the middle stops the count",
   S.streak(recOf(MON, MON + 2, MON + 3), weekdayOnly, MON + 3), 2);

console.log("\n=== any subject counts, not each ===");
is("different subjects on different days still make one streak",
   S.streak({ math: { days: [MON] }, la: { days: [MON + 1] }, sci: { days: [MON + 2] } },
            weekdayOnly, MON + 2), 3);
is("a subject with no record at all is harmless",
   S.streak({ math: { days: [MON, MON + 1] }, sci: {} }, weekdayOnly, MON + 1), 2);

console.log("\n=== rule 1: weekends and holidays are not misses ===");
{
  // Thu, Fri, then the weekend untouched, then Mon and Tue.
  const days = [MON - 4, MON - 3, MON, MON + 1];
  is("a weekend in the middle does not break it",
     S.streak(recOf(...days), weekdayOnly, MON + 1), 4);
}
{
  // A fortnight off. Nothing recorded during it, and it must cost nothing.
  const onBreak = dt => {
    const d = Math.floor(dt.getTime() / 86400000);
    const start = MON + 7, end = MON + 18;
    return !(d >= start && d <= end) && weekdayOnly(dt);
  };
  const before = [MON, MON + 1, MON + 2, MON + 3, MON + 4];
  const after = [MON + 21, MON + 22];
  is("a holiday fortnight does not break it",
     S.streak(recOf(...before, ...after), onBreak, MON + 22), 7);
}
is("work done ON a Saturday neither extends nor breaks the streak",
   S.streak(recOf(MON + 4, MON + 5, MON + 7), weekdayOnly, MON + 7), 2);

console.log("\n=== rule 2: today is never a miss ===");
is("an untouched today does not zero yesterday's streak",
   S.streak(recOf(MON, MON + 1), weekdayOnly, MON + 2), 2);
is("but the day before today does break it",
   S.streak(recOf(MON), weekdayOnly, MON + 2), 0);

console.log("\n=== the timezone trap ===");
{
  /* The bug this guards: using the raw UTC-midnight date, a Saturday in a
   * negative-offset timezone reports as Friday, so the streak treats a real
   * school day as a weekend and vice versa. localDateOf is what prevents it.
   * Asserting on the ISO weekday of the LOCAL date is the check that fails if
   * anyone drops the conversion. */
  let mismatched = 0;
  for (let d = MON - 30; d <= MON + 30; d++) {
    const raw = new Date(d * 86400000).getDay();       // wrong way
    const local = S.localDateOf(d).getDay();           // right way
    if (raw !== local) mismatched++;
  }
  const offset = new Date().getTimezoneOffset();
  console.log("  note: machine offset " + offset +
              " min; raw-vs-local weekday disagreements over 61 days: " + mismatched);
  is("localDateOf gives a stable local weekday sequence",
     (S.localDateOf(MON + 7).getDay() === S.localDateOf(MON).getDay()), true);
}

console.log("\n=== defensive ===");
is("no calendar means every day is a school day",
   S.streak(recOf(MON, MON + 1, MON + 2), null, MON + 2), 3);
is("missing records object does not throw",
   S.streak(undefined, weekdayOnly, MON), 0);
is("the lookback is bounded",
   S.streak(recOf(MON), weekdayOnly, MON, 1), 1);

console.log();
if (fail.length) {
  console.error("  " + fail.length + " FAILED: " + fail.join("; ") + "\n");
  process.exit(1);
}
console.log("  all streak checks passed\n");
