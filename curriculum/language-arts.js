/* ============================================================================
 * WORD VOYAGERS — registration
 * ----------------------------------------------------------------------------
 * This file only puts the subject on the landing page. Two full courses sit
 * behind it, each 36 weeks / 180 days in nine unit studies:
 *   3rd Grade — la-y1-*.js, la-books.js
 *   5th Grade — la-y2-*.js, la-books-y2.js
 *
 * The y1/y2 file prefixes and state keys are internal and stay as they are —
 * renaming them would break every stored progress key ("y1:14"). What the
 * child and parent see is the grade, which each spine declares in its GRADE
 * export; the page reads that rather than hardcoding a label.
 * Both expose the identical interface (UNITS, WEEKS, STANDARDS, unitOf,
 * passageFor, grammarSetFor, spellingSetFor, taskFor, READ_ALOUDS,
 * INDEPENDENT) so the page renders either from one set of views.
 *
 * Year One files:
 *   la-y1-spine.js    units, weeks, standards map, the five-day rhythm
 *   la-y1-words.js    36 weekly spelling lists
 *   la-y1-grammar.js  36 weekly grammar drills
 *   la-y1-reading.js  36 weekly passages + comprehension questions
 *   la-y1-tasks.js    handwriting, writing and speaking tasks
 *   la-books.js       the year's reading list
 * and presented by word-voyagers.dc.html, its own page (same pattern as the
 * Japan unit — see CONTRIBUTING.md).
 *
 * Photo grading of the handwritten day lives in la-grader.js.
 *
 * The year switcher lives inside word-voyagers.dc.html rather than in a
 * `levels` array here, because progress is namespaced per year ("y1:14") and
 * the page owns that state. Adding a Year Three means adding la-y3-*.js and
 * one entry in the page's yearItems list — nothing here changes.
 * ==========================================================================*/
(function(){
  window.Subjects.register({
    id: "la",
    name: "Word Voyagers",
    tagline: "3rd \u0026 5th Grade \u00b7 Reading \u00b7 Writing \u00b7 Words",
    color: "#A78BFA",
    glyph: "A",
    gradient: "linear-gradient(150deg,#A78BFA,#60A5FA)",
    blurb: "3rd Grade and 5th Grade, each 36 weeks in nine unit studies. Reading, grammar and spelling drills that grade themselves, a handwritten page each week graded from a photo, and one speaking task done out loud.",
    status: "live",
    order: 20,
    // A signed-in child picks their own level here. The label is the grade
    // alone — no child sees another child's name or track. Word Voyagers
    // stores y1/y2 internally; the label maps through students.js.
    levels: [
      {id:"y1", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y3"):"3rd", sub:"3rd Grade"},
      {id:"y2", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y5"):"5th", sub:"5th Grade"}
    ],
    open: {href:"word-voyagers.dc.html"},

    /* What Teacher HQ shows for Word Voyagers. See the `summary` contract in
     * subjects.js. This used to live as an `if(s.id==="la")` branch inside
     * index.html; it belongs here, next to the course that knows what its own
     * keys mean.
     *
     * A DAY IS FINISHED ONLY BY ITS :end KEY. stepDone also holds every part
     * of every day — grammar, spelling, reading, the task — so counting all of
     * its keys reports four or five times the work actually done. The end key
     * is the same one la-mastery.js gates sequencing on, so this number and
     * the child's own frontier can never disagree.
     *
     * NO PACE VERDICT. la-calendar.js removed "behind by N days" on purpose,
     * and that decision is not undone here. What is reported instead is a gap:
     * a school day he went PAST without finishing, which is a fact about his
     * work rather than a deadline invented for him. Days he has not reached
     * yet are not gaps, and a day a parent excused is not a gap either. */
    summary: function(data){
      const DAYS = ["Mon","Tue","Wed","Thu","Fri"];
      const done    = data.stepDone   || {};
      const stuck   = data.stuck      || {};
      const excused = data.excused    || {};
      const result  = data.stepResult || {};
      const year    = data.year || "y1";
      const mine    = function(k){ return String(k).split(":")[0] === year; };

      // Finished days, as absolute indices 0..179, this year's track only.
      const at = {};
      Object.keys(done).forEach(function(k){
        if(!done[k] || !mine(k)) return;
        const p = String(k).split(":");
        if(p.length !== 4 || p[3] !== "end") return;
        const w = parseInt(p[1], 10), d = DAYS.indexOf(p[2]);
        if(!(w > 0) || d < 0) return;
        at[(w - 1) * 5 + d] = true;
      });
      const idx = Object.keys(at).map(Number).sort(function(a, b){ return a - b; });
      if(!idx.length) return null;          // opened, nothing finished — HQ words that itself

      const first = idx[0], last = idx[idx.length - 1];
      let gaps = 0;
      for(let i = first; i <= last; i++){
        if(at[i]) continue;
        const w = Math.floor(i / 5) + 1, d = DAYS[i % 5];
        if(excused[year + ":" + w + ":" + d + ":excused"]) continue;
        gaps++;
      }

      const flagged = Object.keys(stuck).filter(function(k){
        return stuck[k] && mine(k);
      }).length;

      // Graded checks, newest first. Only ones that actually carry a score.
      const scored = Object.keys(result).filter(mine).map(function(k){ return result[k]; })
        .filter(function(r){ return r && typeof r.score === "number" && r.total > 0; })
        .sort(function(a, b){ return (b.at || 0) - (a.at || 0); });
      const recent = scored.slice(0, 8);
      const pct = function(a){
        if(!a.length) return null;
        let s = 0, t = 0;
        a.forEach(function(r){ s += r.score; t += r.total; });
        return t ? Math.round(s / t * 100) : null;
      };
      const recentPct = pct(recent);

      const rows = [
        {label:"Days finished", value: idx.length + " of 180", tone:""},
        {label:"On week", value: String(data.week || Math.floor(last / 5) + 1), tone:""}
      ];
      const nChecks = recent.length === 1 ? "Last check" : "Last " + recent.length + " checks";
      if(recentPct !== null){
        rows.push({label: nChecks,
                   value: recentPct + "%",
                   tone: recentPct >= 80 ? "good" : recentPct >= 65 ? "" : "watch"});
      }
      if(gaps)    rows.push({label:"Skipped days", value:String(gaps),   tone:"watch"});
      if(flagged) rows.push({label:"Flagged stuck", value:String(flagged), tone:"watch"});

      const flags = [];
      if(flagged){
        flags.push({text: flagged + (flagged === 1 ? " step he" : " steps he") +
          " marked stuck — he asked for help and was let through, so this is waiting on you.",
          tone:"watch"});
      }
      if(gaps){
        flags.push({text: gaps + (gaps === 1 ? " school day was" : " school days were") +
          " skipped over rather than finished. Not a pace problem — just work still owed.",
          tone:"watch"});
      }
      if(recentPct !== null && recentPct < 65){
        flags.push({text: (recent.length === 1
            ? "His last check scored " + recentPct + "%."
            : "His last " + recent.length + " checks average " + recentPct + "%.") +
          " Worth sitting with him on the next one rather than reading the score afterwards.",
          tone: recentPct < 50 ? "urgent" : "watch"});
      }

      return {
        detail: idx.length + " of 180 days finished" +
                (data.week ? " · currently on week " + data.week : ""),
        rows: rows,
        flags: flags
      };
    }
  });
})();
