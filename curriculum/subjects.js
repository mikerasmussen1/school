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
        stub: null
      }, def);
      list.push(s); byId[s.id] = s;
      list.sort((a,b)=> (a.order-b.order) || a.name.localeCompare(b.name));
      return s;
    },
    all(){ return list.slice(); },
    get(id){ return byId[id] || null; },
    has(id){ return !!byId[id]; }
  };

  window.Subjects = Subjects;
  window.__CURR = window.__CURR || {};
  window.__CURR.Subjects = Subjects;
})();
