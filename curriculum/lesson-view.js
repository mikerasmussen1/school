/* ============================================================================
 * MATH — WHAT A LESSON STEP ACTUALLY DRAWS
 * ----------------------------------------------------------------------------
 * WHY THIS FILE EXISTS.
 *
 * This maths lived inside learnVals(), in the middle of an 8,500-line
 * component, so nothing could call it. Every test written against it could
 * only grep index.html as TEXT — asserting that a string appears in the
 * source, never that the app draws anything. That is exactly how 158 green
 * checks sat beside a screen with no visuals on it for six rounds:
 *
 *   - the generator computed magnitude bars and the serialiser silently
 *     dropped them; the test checked the generator mentioned `barFor`
 *   - every lesson past week 1 opened on a text-only step, so the visual pane
 *     was blank until you clicked Next; nothing could see the first frame
 *   - a Bonus block landed inside the wrong card; the test checked text order,
 *     which cannot see nesting
 *
 * Pulled out here it is ordinary arithmetic on plain objects, so a test can
 * ask the real question — "does this day draw?" — and get a real answer.
 *
 * NOTHING ABOUT THE LOOK IS DECIDED HERE. Colours, fonts and spacing stay in
 * the view. This answers only: is there a diagram, how big is it, and does it
 * have anything in it.
 * ==========================================================================*/
(function(){

  /* The view's own constants, mirrored. If the component changes these, this
   * goes out of step and the tests keep passing — so they are named and kept
   * together rather than scattered as literals. */
  const MAX_UNIT      = 19;   // a cell never draws bigger than this
  const MAX_GRID_H    = 250;  // tallest a diagram may be
  const STAGE_PADDING = 52;   // page padding
  const LABEL_GUTTER  = 46;   // room for the row labels down the left
  const MIN_AVAIL     = 150;  // narrowest stage worth laying out for
  const DEFAULT_STAGE = 360;

  const total = (a, k) => (a || []).reduce((n, x) => n + (x[k] !== undefined ? x[k] : x.s), 0);

  /* The unit square, in pixels. Chosen per LESSON, not per step, so a diagram
   * does not resize as the child steps through it. */
  function unitFor(lesson, stageW){
    const steps = (lesson && lesson.steps) || [];
    const maxC = Math.max(1, ...steps.map(s => total(s.cols, "s")));
    const maxR = Math.max(1, ...steps.map(s => total(s.rows, "s")));
    const avail = Math.max(MIN_AVAIL, (stageW || DEFAULT_STAGE) - STAGE_PADDING - LABEL_GUTTER);
    return {u: Math.min(MAX_UNIT, avail / maxC, MAX_GRID_H / maxR), maxC: maxC, maxR: maxR};
  }

  /* What step `i` of this lesson puts on screen.
   *
   * kind  "dots"  a dot diagram
   *       "fig"   a teaching figure (curriculum/lesson-figures.js)
   *       "rooms" an area model / magnitude bar
   *       "none"  nothing — the visual pane is empty
   * draws is the question worth asking: will the child see a picture? */
  function stepVisual(lesson, i, stageW){
    const steps = (lesson && lesson.steps) || [];
    const step = steps[i];
    if(!step) return {kind:"none", w:0, h:0, cells:0, draws:false};
    const {u} = unitFor(lesson, stageW);
    if(step.fig)
      return {kind:"fig", w:0, h:0, cells:1, draws:!!step.fig.k};
    if(step.dots)
      return {kind:"dots", w:0, h:0, cells:(step.dots.r||0)*(step.dots.c||0),
              draws:(step.dots.r||0) > 0 && (step.dots.c||0) > 0};
    const w = total(step.cols, "s") * u, h = total(step.rows, "s") * u;
    const cells = (step.cells || []).length;
    return {kind: cells ? "rooms" : "none", w:w, h:h, cells:cells,
            draws: w > 1 && h > 1 && cells > 0};
  }

  /* Every step of a lesson, plus the two facts that actually matter.
   *
   * opensBlank is the one that caused the trouble: lstep defaults to 0, so
   * step 0 is what a child sees the instant a lesson opens. A lesson whose
   * first step draws nothing looks broken even when every later step is fine. */
  function lessonVisuals(lesson, stageW){
    const steps = (lesson && lesson.steps) || [];
    const out = steps.map((_, i) => stepVisual(lesson, i, stageW));
    return {steps: out,
            total: out.length,
            drawing: out.filter(v => v.draws).length,
            opensBlank: out.length > 0 && !out[0].draws,
            allBlank: out.length > 0 && out.every(v => !v.draws)};
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LESSON_VIEW = {unitFor, stepVisual, lessonVisuals,
                               MAX_UNIT, MAX_GRID_H, STAGE_PADDING, LABEL_GUTTER,
                               MIN_AVAIL, DEFAULT_STAGE};
})();
