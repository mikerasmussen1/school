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
    /* The teacher's one-look week — the weekGlance contract in subjects.js.
     *
     * A Word Voyagers week is five days, so the cells are days and each cell
     * is that day's fate. The colours follow this course's own standing
     * decisions: an EXCUSED day is gray with a note, never red — la-calendar
     * spent a long comment refusing to judge a child against a schedule, and
     * a glance must not sneak that judgement back in through a colour. Red is
     * only a day the child went PAST and left unfinished unexcused, the same
     * "gap" definition summary() below already uses. */
    weekGlance: function(data, ctx){
      const DAYS = ["Mon","Tue","Wed","Thu","Fri"];
      const done = data.stepDone || {}, excused = data.excused || {};
      const stuck = data.stuck || {}, result = data.stepResult || {};
      const year = data.year || "y1";

      // Every week with a finished day, newest first — the review-able past.
      // Alongside it, the child's global first and last finished day as
      // absolute indices (week 1 Monday = 0), because "passed by" is defined
      // against the whole record, not against one week.
      const seen = {};
      let firstAbs = Infinity, lastAbs = -1;
      Object.keys(done).forEach(function(k){
        if(!done[k]) return;
        const p = String(k).split(":");
        if(p[0] !== year || p.length !== 4 || p[3] !== "end") return;
        const w = parseInt(p[1], 10), d = DAYS.indexOf(p[2]);
        if(!(w > 0) || d < 0) return;
        seen[w] = true;
        const abs = (w - 1) * 5 + d;
        if(abs < firstAbs) firstAbs = abs;
        if(abs > lastAbs) lastAbs = abs;
      });
      /* A WEEK WITH ANSWERS IN IT IS ALSO WORTH LOOKING AT.
       *
       * `seen` used to mean "a week with a FINISHED day", so a child who
       * worked through half of Monday and stopped produced no glance at all —
       * the panel a parent would look at to find exactly that is the one that
       * did not appear. Answered questions are evidence.
       *
       * Deliberately NOT folded into firstAbs/lastAbs: those bound the "passed
       * by, not finished" red, and that definition is shared with summary() so
       * the two cannot disagree. Letting an unfinished day move those bounds
       * would start reddening days on the strength of work in progress. */
      Object.keys(data.laLog || {}).forEach(function(k){
        if(!((data.laLog || {})[k] || []).length) return;
        const p = String(k).split(":");
        if(p[0] !== year || p.length !== 4) return;
        const w = parseInt(p[1], 10);
        if(w > 0) seen[w] = true;
      });
      /* A graded check is evidence too. Without this, a week whose only record
       * is a drill scored on a day that was never closed out returns null from
       * here — and null is not one empty cell, it is the whole panel missing.
       * The child did the work, the score is sitting in the record, and the
       * screen that exists to show it does not appear. */
      Object.keys(result).forEach(function(k){
        const p = String(k).split(":");
        const r = result[k];
        if(p[0] !== year || p.length !== 4) return;
        if(!r || typeof r.score !== "number" || !(r.total > 0)) return;
        const w = parseInt(p[1], 10);
        if(w > 0) seen[w] = true;
      });

      const weeks = Object.keys(seen).map(Number).sort(function(a,b){ return b-a; });
      if(!weeks.length) return null;

      // The teacher's chosen week, if it is one that holds evidence; else the
      // most recent — an unknown choice must not conjure an empty grid.
      const asked = ctx && ctx.week;
      const week = seen[asked] ? asked : weeks[0];

      const ended = function(d){ return !!done[year+":"+week+":"+d+":end"]; };
      const wasStuck = function(d){
        return Object.keys(stuck).some(function(k){
          const p = String(k).split(":");
          return stuck[k] && p[0] === year && parseInt(p[1],10) === week && p[2] === d;
        });
      };
      /* ONE definition of "passed by", and it is summary()'s: an unfinished,
       * unexcused day strictly between the child's GLOBAL first and last
       * finished days. Both boundaries matter and both are global. Friday
       * unfinished on Wednesday sits after the last finished day anywhere, so
       * it is gray; and in a mid-week first-ever start, that week's Monday
       * sits before the first finished day anywhere, so it is gray too — the
       * child had not started, which is not the same as leaving it behind.
       *
       * The first version of the look-back used a per-week rule instead
       * ("in a past week everything unfinished is red") and it contradicted
       * the summary row on the very same screen: it reddened days from before
       * the child ever began. Review caught it; sharing summary()'s bounds is
       * what makes the two incapable of disagreeing again. */
      /* Each cell carries its day INITIAL and its day ID.
       *
       * The initial because five anonymous squares in a row tell a parent
       * nothing about which day they are looking at — the fate was legible and
       * the subject of it was not.
       *
       * The id because the square is the natural thing to click: it is the day.
       * The shell hands the id back to questionLog as ctx.cell, and the groups
       * below carry the same id, so clicking Tuesday opens Tuesday's questions.
       * A day with no answers recorded gets no id and stays inert rather than
       * opening an empty panel. */
      /* Keyed by year:week:day, not by day. The teacher can look back at any
       * week, and a bare day name would light Tuesday's square in every week
       * of the year because one Tuesday somewhere had answers in it.
       *
       * stepResult counts as evidence as well as laLog. Every day finished
       * before the per-question log existed has a SCORE and no questions, and
       * a square that sat inert on those days was the wrong answer twice over:
       * the day plainly had work in it, and the one place that says so — its
       * own record — is what the parent was trying to open. It opens, and says
       * honestly that the questions themselves were not kept. */
      const answered = {};
      Object.keys(data.laLog || {}).forEach(function(k){
        const p = String(k).split(":");
        if(p.length === 4 && ((data.laLog || {})[k] || []).length)
          answered[p[0] + ":" + p[1] + ":" + p[2]] = true;
      });
      Object.keys(result).forEach(function(k){
        const p = String(k).split(":");
        const r = result[k];
        if(p.length === 4 && r && typeof r.score === "number" && r.total > 0)
          answered[p[0] + ":" + p[1] + ":" + p[2]] = true;
      });

      const lessonOfWeek = function(w, d){
        return "Lesson " + ((parseInt(w,10)-1)*5 + Math.max(0, DAYS.indexOf(d)) + 1);
      };
      const cells = DAYS.map(function(d, i){
        const key = year + ":" + week + ":" + d;
        const id = answered[key] ? key : "";
        const abs = (week - 1) * 5 + i;
        const name = "Lesson " + (abs + 1);           // a number, not a weekday
        const at = {label: String(abs + 1), id: id, day: d};
        if(ended(d))
          return wasStuck(d)
            ? {...at, status:"yellow", hint:name+" — got stuck, finished anyway"}
            : {...at, status:"green", hint:name+" — finished"};
        if(excused[year+":"+week+":"+d+":excused"])
          return {...at, status:"gray", hint:name+" — excused"};
        if(abs > firstAbs && abs < lastAbs)
          return {...at, status:"red", hint:name+" — passed by, not finished"};
        return {...at, status:"gray", hint:name+" — not reached"};
      });

      const finished = cells.filter(function(c){ return c.status==="green"||c.status==="yellow"; }).length;
      const well = [], struggle = [];
      if(finished) well.push(finished + " of 5 lessons finished");

      // This week's graded checks, by their own numbers.
      Object.keys(result).forEach(function(k){
        const p = String(k).split(":");
        if(p[0] !== year || parseInt(p[1],10) !== week) return;
        const r = result[k];
        if(!r || typeof r.score !== "number" || !(r.total > 0)) return;
        const line = lessonOfWeek(p[1], p[2]) + " " + p[3] + " check: " + r.score + "/" + r.total;
        if(r.score / r.total >= 0.8) well.push(line);
        else if(r.score / r.total < 0.6) struggle.push(line);
      });
      cells.forEach(function(c){
        if(c.status === "yellow" || c.status === "red") struggle.push(c.hint);
      });

      return {title:"Week " + week,
              columns:[{label:"Week " + week, cells:cells}],
              well:well, struggle:struggle, weeks:weeks};
    },

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
    },

    /* Question by question — the contract in subjects.js.
     *
     * laLog is written one answer at a time, as the child answers, so a drill
     * still in progress is already here. `done` comes from stepDone rather than
     * from counting answers: a drill can be finished with questions missed, and
     * a drill can hold a full set of answers and still be open. */
    questionLog: function(data, ctx){
      const LOG = data.laLog || {}, DONE = data.stepDone || {};
      const RESULT = data.stepResult || {};
      /* The drill slot and the checklist step key are not always the same word
       * — the find-the-mistake drill runs in slot "fx" and its step is "fix" —
       * so both spellings are named here. A log entry and a score for the same
       * drill must land on the same name or the day shows it twice. */
      const NAMES = {rq:"Reading comprehension", gz:"Grammar drill", sq:"Spelling drill",
                     fx:"Find the mistake", fix:"Find the mistake", rv:"Week review"};
      const SLOT_OF = {fix:"fx"};
      /* Word Voyagers names lessons by number, never by a weekday slot. */
      const lessonOf = function(week, day){
        return "Lesson " + ((parseInt(week,10)-1)*5 + Math.max(0, ["Mon","Tue","Wed","Thu","Fri"].indexOf(day)) + 1);
      };
      /* ctx.cell is the square the teacher clicked in the glance — a
       * year:week:day handle this course minted itself. When it is set, only
       * that day's drills are wanted. */
      const only = ctx && ctx.cell ? String(ctx.cell) : null;
      const out = [];
      Object.keys(LOG).forEach(function(k){
        const rows = LOG[k] || [];
        if(!rows.length) return;
        const p = String(k).split(":");            // year:week:day:slot
        if(p.length !== 4) return;
        const cell = p[0] + ":" + p[1] + ":" + p[2];
        if(only && cell !== only) return;
        const marked = rows.filter(function(e){ return e && e.ok !== null; });
        out.push({
          cell: cell,
          slot: p[3],
          day: lessonOf(p[1], p[2]),
          where: "Week " + p[1] + " · " + lessonOf(p[1], p[2]) + " · " +
                 (NAMES[p[3]] || p[3]),
          what: NAMES[p[3]] || p[3],
          when: Math.max.apply(null, rows.map(function(e){ return (e && e.ts) || 0; })),
          done: !!DONE[k],
          right: marked.filter(function(e){ return e.ok; }).length,
          marked: marked.length,
          detail: true,
          rows: rows.map(function(e){
            return {q: e.q || "", answer: e.resp == null ? "" : String(e.resp),
                    correct: e.correct || e.a || "", ok: e.ok === null ? null : !!e.ok};
          })
        });
      });

      /* WORK DONE BEFORE THE PER-QUESTION LOG EXISTED.
       *
       * Those drills left a score and nothing else. Reporting only what laLog
       * holds meant a day that plainly had work in it opened empty, which
       * reads as "nothing happened here" — the opposite of the truth. So the
       * score is reported with detail:false, and the view says the questions
       * themselves were not kept rather than implying there were none.
       *
       * A drill that HAS a log is skipped here: the log is the better record
       * of the same work, and counting both would show the day twice. */
      const seenSlot = {};
      out.forEach(function(g){ seenSlot[g.cell + ":" + g.slot] = true; });
      Object.keys(RESULT).forEach(function(k){
        const r = RESULT[k];
        if(!r || typeof r.score !== "number" || !(r.total > 0)) return;
        const p = String(k).split(":");            // year:week:day:stepkey
        if(p.length !== 4) return;
        const cell = p[0] + ":" + p[1] + ":" + p[2];
        if(only && cell !== only) return;
        const slot = SLOT_OF[p[3]] || p[3];
        if(seenSlot[cell + ":" + slot]) return;    // the log already has it
        out.push({
          cell: cell,
          slot: slot,
          day: lessonOf(p[1], p[2]),
          where: "Week " + p[1] + " · " + lessonOf(p[1], p[2]) + " · " +
                 (NAMES[p[3]] || p[3]),
          what: NAMES[p[3]] || p[3],
          when: r.at || 0,
          done: true,                              // a score only exists once it finished
          right: r.score,
          marked: r.total,
          detail: false,
          rows: []
        });
      });

      return out.length ? out : null;
    }
  });
})();
