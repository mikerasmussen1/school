/* ============================================================================
 * SUBJECT REGISTRY — Baskin School
 * ----------------------------------------------------------------------------
 * A "subject" is one course a child can choose on the landing page: Math,
 * Language Arts, the Japan unit. Each subject lives in its own file under
 * curriculum/ and registers itself here, so two people can author two subjects
 * without ever editing the same file.
 *
 * To add a subject:
 *   1. write curriculum/<your-subject>.js and call Subjects.register({...})
 *   2. add one <script src> line for it in index.html, after this file
 *   3. that's all — the landing page, the header and Teacher HQ pick it up
 *
 * Registration shape:
 *   id       short key, permanent. It is the key progress is stored under in
 *            the database, so renaming one orphans a child's record.
 *   name     what the child sees on the card
 *   tagline  one short line under the name
 *   blurb    two sentences on the card
 *   color    hex accent, used for the card, the chip and the header
 *   glyph    one character for the tile
 *   gradient CSS for the tile background
 *   open     "builtin"        the app's own screens handle it (math)
 *            "stub"           render the placeholder screen from `stub`
 *            {href:"x.html"}  a separate page; the card links out
 *   status   "live" | "soon" — "soon" cards are visible but muted
 *   order    sort position on the landing page (lower first)
 *   levels   optional [{id, label, sub}] — the child picks one on the landing
 *            card before the subject opens. Use it for grade levels or tracks.
 *            The pick is saved as slice.subjects[<id>].level, per child.
 *   stub     {heading, lines:[...], footer} for status:"soon" subjects
 *   summary  optional. What Teacher HQ shows for this subject — see below.
 *
 * TELLING TEACHER HQ WHAT YOU KNOW
 * Mission Control cannot read inside your `data` — it does not know what a
 * "step" or a "week" means in your course, and it should not have to. So it
 * asks you:
 *
 *   summary(data, ctx) -> null | {
 *     detail: "one line, the headline"       shown under the subject name
 *     rows:   [{label, value, tone}]         the numbers worth seeing
 *     flags:  [{text, tone}]                 things a parent should ACT on
 *   }
 *
 * `tone` is "" (neutral), "good", "watch" or "urgent". Mission Control owns
 * what those look like; you only say which one it is.
 *
 * `ctx` carries what the shell already knows: {opened, days, level, recent,
 * lastDay, today, slice}. Return null when nothing is finished yet — HQ has
 * its own wording for that case and it is better than an empty row.
 *
 * Only report what your own data proves. A flag is a claim that something
 * needs a parent's attention, and a false one costs their trust in all the
 * others. Be careful about pace especially: Word Voyagers deliberately does
 * not judge a child against a schedule (see the long note in la-calendar.js),
 * and a summary is not the place to reintroduce that through the back door.
 *
 * This runs inside Mission Control's render. If it throws, that subject's row
 * loses its detail and every other row still draws — but it is your bug and
 * it will be silent, so keep it total and cheap.
 *
 * PROGRESS IN THE DATABASE
 * Every subject gets its own namespace inside the child's saved record:
 *
 *   slice.subjects[<id>] = {
 *     opened: 12,            // times this subject was started
 *     last:   1756...,       // ms timestamp of the last visit
 *     days:   [20693, ...],  // day numbers visited, last 60 kept
 *     level:  "y3",          // which of `levels` the child picked
 *     data:   { ... }        // yours. The app never reads or writes inside it
 *   }
 *
 * `data` is private to your subject. Put whatever your course needs in there
 * and it syncs to Firestore with everything else, per child, automatically.
 * Do not write outside your own namespace — the math keys (pHist, pAns,
 * pStreak, sprintHist …) sit at the top level for historical reasons and are
 * not yours to touch.
 * ==========================================================================*/
(function(){
  const list = [];
  const byId = {};

  const Subjects = {
    register(def){
      if(!def || !def.id) throw new Error("Subjects.register needs an id");
      if(byId[def.id]) throw new Error("duplicate subject id: "+def.id);
      const s = Object.assign({
        name: def.id,
        tagline: "",
        blurb: "",
        color: "#94A3B8",
        glyph: "•",
        gradient: "linear-gradient(150deg,#94A3B8,#64748B)",
        open: "stub",
        status: "live",
        order: 100,
        levels: null,
        stub: null,
        summary: null
      }, def);
      list.push(s); byId[s.id] = s;
      list.sort((a,b)=> (a.order-b.order) || a.name.localeCompare(b.name));
      return s;
    },
    all(){ return list.slice(); },
    get(id){ return byId[id] || null; },
    has(id){ return !!byId[id]; },

    /* ONE STREAK ACROSS EVERY SUBJECT, counted in school days.
     *
     * It lives here because it is defined over the shape this file documents —
     * slice.subjects[<id>].days — and over ALL of them at once. No subject can
     * answer it alone, and it must not become something a subject can game.
     *
     * WHY NOT PER SUBJECT. Field Notes runs once a week by design, so a daily
     * science streak would break every Tuesday for doing exactly what the course
     * asks. Word Voyagers deliberately refuses to judge a child against a
     * schedule at all (the long note in la-calendar.js). Counting school days on
     * which ANY subject was touched leaves both of those intact.
     *
     * THREE RULES, each there to stop it becoming a stick:
     *
     *  1. Weekends and holidays are SKIPPED, not counted and not missed, so a
     *     fortnight off at Christmas costs nothing. The caller supplies the
     *     school calendar; without one, every day counts as a school day.
     *  2. Today is never a miss. The day is not over, and a streak that reads
     *     zero at breakfast is a reproach for not having started yet.
     *  3. It only counts up. There is deliberately no "you lost it" anywhere —
     *     a broken streak simply shows a smaller number.
     *
     * Work done ON a weekend neither extends the streak nor breaks it: the day
     * is skipped whatever is in it. Counting it would make "school days in a
     * row" mean something else, and a child who works on Saturday should not be
     * setting a pace they then have to keep.
     */
    streak(records, isSchoolDay, today, maxLookback){
      const recs = records || {};
      const ids = Object.keys(recs);
      const did = d => ids.some(id => (((recs[id] || {}).days) || []).indexOf(d) >= 0);
      const school = typeof isSchoolDay === "function" ? isSchoolDay : null;
      const back = maxLookback || 400;
      let n = 0;
      for(let d = today; d > today - back; d--){
        if(school && !school(Subjects.localDateOf(d))) continue;
        if(did(d)){ n++; continue; }
        if(d === today) continue;                  // the day is not over yet
        break;
      }
      return n;
    },

    /* A day number as a LOCAL midnight.
     *
     * Day numbers are floor(ms / 86400000), which is midnight UTC, but a school
     * calendar asks getDay() in local time. Handed the raw date, a UTC midnight
     * is the previous evening anywhere west of Greenwich — so every weekend
     * would land a day early and the streak would break on Mondays. */
    localDateOf(dayNumber){
      const u = new Date(dayNumber * 86400000);
      return new Date(u.getUTCFullYear(), u.getUTCMonth(), u.getUTCDate());
    }
  };

  window.Subjects = Subjects;
  window.__CURR = window.__CURR || {};
  window.__CURR.Subjects = Subjects;
})();
