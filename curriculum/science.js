/* ============================================================================
 * FIELD NOTES — registration
 * ----------------------------------------------------------------------------
 * Georgia Standards of Excellence science, two grade tracks, two lessons a
 * week. The course lives in
 *   science-y3-spine.js / science-y5-spine.js   units, weeks, standards
 *   science-lessons.js                          144 lessons, both grades
 *   science-quiz.js                             weekly checks (partial, see file)
 * and is presented by field-notes.dc.html, its own page.
 *
 * ONCE A WEEK. One sitting: investigate, explain, check. Nothing was cut when
 * this dropped from twice a week — the two days were merged, so every lab,
 * reading, claim and standard is still here. The session is simply longer.
 * Georgia's practices standards are built on doing investigations and keeping
 * records, which never divided neatly into short daily sittings anyway.
 * ==========================================================================*/
(function(){
  window.Subjects.register({
    id: "sci",
    name: "Field Notes",
    tagline: "Georgia GSE \u00b7 once a week \u00b7 3rd \u0026 5th Grade",
    color: "#2E7D6B",
    glyph: "\u2697",
    gradient: "linear-gradient(150deg,#2E7D6B,#7CC4A5)",
    blurb: "Science once a week: a hands-on investigation, a short reading, and a claim to defend with evidence. Nine units a year, weighted to the Georgia standards.",
    status: "live",
    order: 25,
    // A signed-in child picks their own level here. The label is the grade
    // alone — no child sees another child's name or track.
    levels: [
      {id:"y3", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y3"):"3rd", sub:"3rd Grade"},
      {id:"y5", label:(window.__CURR&&window.__CURR.STUDENTS)?window.__CURR.STUDENTS.levelLabel("y5"):"5th", sub:"5th Grade"}
    ],
    open: {href:"field-notes.dc.html"},

    /* The teacher's one-look stretch — the weekGlance contract in subjects.js.
     *
     * Science's unit of work is a WEEK, so the cells are the last eight weeks
     * up to wherever the child is, not days — a daily grid would paint six
     * gray cells for every green one on a course that is correctly untouched
     * six days out of seven. A finished week with no check is green with a
     * note, not a zero: science-quiz.js is partial by design, and that
     * decision holds here too.
     */
    weekGlance: function(data, ctx){
      const c = data.completed || {};
      const grade = data.grade || "y3";
      const doneAt = {};
      Object.keys(c).forEach(function(k){
        const p = String(k).split(":");
        if(p[0] !== grade) return;
        const w = parseInt(p[1], 10);
        if(w > 0) doneAt[w] = c[k] || {};
      });
      const weeks = Object.keys(doneAt).map(Number).sort(function(a,b){ return a-b; });
      if(!weeks.length) return null;

      /* Looking back re-anchors the eight-week window on the asked week
       * instead of the newest. Only finished weeks are offered, and an asked
       * week that holds no evidence falls back to the newest — the picker must
       * never conjure an empty stretch. */
      const asked = ctx && ctx.week;
      const latest = doneAt[asked] ? asked : weeks[weeks.length - 1];
      /* The window opens at the child's own first finished week, not week 1:
       * a course begun mid-year has no "skipped" weeks before it began — red
       * is only for a week passed BETWEEN finished ones. */
      const from = Math.max(weeks[0], latest - 7);
      const cells = [];
      const well = [], struggle = [];
      for(let w = from; w <= latest; w++){
        const r = doneAt[w];
        if(!r){
          cells.push({status:"red", hint:"Week "+w+" — skipped past"});
          struggle.push("Week "+w+" skipped past");
          continue;
        }
        const scored = typeof r.score === "number" && r.total > 0;
        if(!scored){
          cells.push({status:"green", hint:"Week "+w+" — done (no check that week)"});
          continue;
        }
        const pct = r.score / r.total;
        const line = "Week "+w+" check: "+r.score+"/"+r.total;
        if(pct >= 0.8){ cells.push({status:"green", hint:line}); well.push(line); }
        else if(pct >= 0.6){ cells.push({status:"yellow", hint:line+" — shaky"}); struggle.push(line); }
        else { cells.push({status:"red", hint:line}); struggle.push(line); }
      }
      if(!struggle.length)
        well.unshift(weeks.length + " week" + (weeks.length===1?"":"s") + " finished, none skipped");

      return {title:"Weeks " + from + "–" + latest,
              columns:[{label:"W"+from+"–"+latest, cells:cells}],
              well:well, struggle:struggle,
              weeks:weeks.slice().reverse()};
    },

    /* What Teacher HQ shows for Field Notes. See the `summary` contract in
     * subjects.js; this used to be an `if(s.id==="sci")` branch in index.html.
     *
     * THE UNIT HERE IS A WEEK, NOT A DAY. This course runs one lesson a week,
     * 36 of them, so every number below is in weeks and nothing daily is
     * reported. A "days active" figure would look alarming on a course that is
     * correctly untouched six days out of seven.
     *
     * Not every week has a check — science-quiz.js is partial by design — so a
     * finished week with no score is normal and must not read as a zero. Those
     * weeks count as done and stay out of the accuracy figure. */
    summary: function(data){
      const TOTAL = 36;
      const c     = data.completed || {};
      const grade = data.grade || "y3";
      const keys  = Object.keys(c).filter(function(k){
        return String(k).split(":")[0] === grade;
      });
      if(!keys.length) return null;

      const weeks = keys.map(function(k){ return parseInt(String(k).split(":")[1], 10); })
        .filter(function(n){ return n > 0; }).sort(function(a, b){ return a - b; });
      if(!weeks.length) return null;

      const at = {}; weeks.forEach(function(w){ at[w] = true; });
      let gaps = 0;
      for(let w = weeks[0]; w <= weeks[weeks.length - 1]; w++) if(!at[w]) gaps++;

      const scored = keys.map(function(k){ return c[k]; })
        .filter(function(r){ return r && typeof r.score === "number" && r.total > 0; })
        .sort(function(a, b){ return (b.at || 0) - (a.at || 0); });
      const recent = scored.slice(0, 6);
      let s = 0, t = 0;
      recent.forEach(function(r){ s += r.score; t += r.total; });
      const recentPct = t ? Math.round(s / t * 100) : null;

      const rows = [
        {label:"Weeks finished", value: weeks.length + " of " + TOTAL, tone:""},
        {label:"On week", value: String(data.week || weeks[weeks.length - 1]), tone:""}
      ];
      const nChecks = recent.length === 1 ? "Last check" : "Last " + recent.length + " checks";
      if(recentPct !== null){
        rows.push({label: nChecks,
                   value: recentPct + "%",
                   tone: recentPct >= 80 ? "good" : recentPct >= 65 ? "" : "watch"});
      }
      if(scored.length < weeks.length){
        rows.push({label:"Weeks without a check",
                   value: String(weeks.length - scored.length), tone:""});
      }
      if(gaps) rows.push({label:"Skipped weeks", value:String(gaps), tone:"watch"});

      const flags = [];
      if(gaps){
        flags.push({text: gaps + (gaps === 1 ? " week was" : " weeks were") +
          " skipped over. On a once-a-week course that is a whole lab and reading gone, not a light day.",
          tone: gaps >= 3 ? "urgent" : "watch"});
      }
      if(recentPct !== null && recentPct < 65){
        flags.push({text: (recent.length === 1
            ? "His last check scored " + recentPct + "%."
            : "His last " + recent.length + " checks average " + recentPct + "%.") +
          " The check follows the hands-on lab, so a low score here usually means the " +
          "investigation got rushed rather than that the reading was too hard.",
          tone: recentPct < 50 ? "urgent" : "watch"});
      }

      return {
        detail: weeks.length + " of " + TOTAL + " weeks finished" +
                (data.week ? " · currently on week " + data.week : ""),
        rows: rows,
        flags: flags
      };
    }
  });
})();
