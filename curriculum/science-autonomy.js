/* ============================================================================
 * FIELD NOTES — HOW SELF-DIRECTED EACH WEEK CAN BE
 * ----------------------------------------------------------------------------
 * The original supervision flag was one bit: adult, or not. That bit was set
 * conservatively, so 22 of 72 investigations demanded a grown-up — including
 * ones whose only risk was going out to the yard or handling rubbish with
 * gloves on. Those do not need a person standing there. They need a rule.
 *
 * So one flag becomes three tiers:
 *
 *   SOLO   Do it on your own. Nothing here can hurt you.
 *   RULE   On your own, AFTER reading one safety rule and following it.
 *          The rule is the control, not the adult — safety glasses, gloves,
 *          stay in the yard, keep the bag sealed.
 *   ADULT  A grown-up genuinely needs to be here. Flame, a heat source,
 *          stains, plaster dust, biological samples.
 *
 * WHAT WAS NOT DONE, and it matters. No lab was downgraded to make a number
 * look better. The six that remain ADULT are the six with a real hazard, and
 * they stay ADULT. What is offered instead is a SWAP: an alternative version
 * of that same investigation, hitting the same standard, with the hazard
 * removed. Take the swap and the week becomes solo. Refuse it and you keep
 * the richer lab and sit with him for twenty minutes. Both are honest; being
 * told which is which is the point.
 *
 * A candle cannot be made safe by writing "be careful" next to it. It can be
 * replaced by sunlight and friction, which demonstrate the same standard —
 * S3P1.a asks for sources of heat, and two sources prove the idea.
 * ==========================================================================*/
(function(){

  const SOLO  = "solo";
  const RULE  = "rule";
  const ADULT = "adult";

  /* Weeks needing a rule rather than a grown-up, with the rule itself.
   * Keyed grade -> week. */
  const RULES = {
    y3: {
      9:  "Stay in your own yard where a grown-up can see you from the house. Do not climb anything or go near the road.",
      10: "Wear the safety glasses before you blow, and blow across the tray, never down into it. Keep your face back.",
      11: "Carry water outside in a jug, not a full bucket. Pour slowly so you do not soak yourself.",
      19: "Dig only where a grown-up has already said you may. Carry the trowel pointing down, and wash your hands afterwards.",
      28: "Wear gloves the whole time. Pick up nothing sharp, nothing broken, and nothing you cannot name \u2014 point it out to a grown-up instead. Stay on your own street.",
      29: "Cooking oil only, and keep it off the floor. Wash your hands when you are finished.",
      30: "Gloves on. Only clean recycling \u2014 no food waste, nothing sharp, nothing that leaked.",
      33: "Warm tap water only, never hot. If it is too warm to hold your finger in, it is too warm for this.",
      34: "Leave the thermometers where they are and read them in place. Do not carry glass thermometers around.",
      35: "Warm tap water only, never hot."
    },
    y5: {
      18: "Handle slides by the edges. If one chips or cracks, leave it and tell a grown-up rather than picking up the pieces.",
      20: "Pond water goes back outside when you are done, and wash your hands properly afterwards.",
      22: "Keep every bag sealed for the whole week. Do not open them to look or to smell \u2014 you can see everything you need through the plastic. A grown-up throws them away unopened.",
      34: "Keep the iron filings in their sealed bag or shaker. Loose filings get into eyes and are very hard to get out.",
      35: "One battery only, and disconnect it between tries. If the wire or the nail feels hot, disconnect and let it cool.",
      36: "One battery at a time, brief connections only. If anything feels hot, stop and let it cool before the next test."
    }
  };

  /* The genuinely hazardous ones, and how to do the same standard without the
   * hazard. Every swap was checked against what the week is actually meant to
   * teach — none of them drop the standard. */
  const SWAPS = {
    y3: {
      14: {hazard:"Mixing plaster of Paris: the dry powder is bad to breathe and it warms as it sets.",
           swap:"Use air-dry modelling clay for the second half instead of plaster. Press the shell into one piece of clay, let it dry hard, then press a second colour of clay into that hardened impression.",
           keeps:"S3E2.b still met: you model an impression being preserved and copied, which is the point of the week."},
      32: {hazard:"An open flame.",
           swap:"Skip the candle. Do sunlight and friction only, then look up burning as a heat source and write what it has in common with the other two.",
           keeps:"S3P1.a asks you to identify sources of heat. Two done by hand and one researched still identifies all three."}
    },
    y5: {
      17: {hazard:"Iodine stains skin, clothes and worktops, and should not be handled alone.",
           swap:"Leave the iodine out entirely. Onion skin is visible in plain water \u2014 the stain only adds contrast.",
           keeps:"S5L3 is about observing cells with a magnifier. Unstained onion cells show the pattern clearly."},
      19: {hazard:"Taking a cheek sample, plus methylene blue or iodine stain.",
           swap:"Use a prepared animal-cell slide instead of your own cheek cells, and skip the stain.",
           keeps:"S5L3 asks you to identify and compare animal cell parts. A prepared slide shows them better than a home smear usually does."},
      26: {hazard:"Heating water to boiling on a stove.",
           swap:"Run the cold half only: ice in a cup, thermometer in, and record every minute as it melts and warms to room temperature. Stop there.",
           keeps:"S5P1.b is about state change driven by temperature. Melting shows the flat part of the curve, which is the part that matters."},
      28: {hazard:"Five reaction stations including steel wool and vinegar.",
           swap:"Run three stations rather than five: vinegar and baking soda, milk and food colouring with a drop of soap, and salt dissolving in water. Leave out the steel wool.",
           keeps:"S5P1.c asks you to judge chemical change from evidence. Three stations give gas, colour change and a physical control to compare against."}
    }
  };

  /* The tier for one week, derived from the lesson's own supervision flag and
   * the tables above rather than duplicated by hand. */
  function tierFor(grade, week){
    const L = window.__CURR.SCI_LESSONS;
    const lab = L ? L.lessonFor(grade, week, "A") : {};
    const swap = (SWAPS[grade]||{})[week];
    const rule = (RULES[grade]||{})[week];
    if(swap)  return {tier:ADULT, rule:null, swap:swap,
                      label:"A grown-up needs to be here",
                      short:"Grown-up needed"};
    if(rule)  return {tier:RULE, rule:rule, swap:null,
                      label:"On your own \u2014 read the rule first",
                      short:"Rule first"};
    if(lab.supervision) return {tier:RULE, rule:"Ask a grown-up to look over what you are about to do before you start.",
                      swap:null, label:"On your own \u2014 check in first", short:"Check in first"};
    return {tier:SOLO, rule:null, swap:null,
            label:"You can do this one on your own", short:"On your own"};
  }

  function counts(grade){
    const out = {solo:0, rule:0, adult:0};
    for(let w=1; w<=36; w++) out[tierFor(grade, w).tier]++;
    return out;
  }

  /* Weeks a parent must be present for, so a term can be planned around them. */
  function adultWeeks(grade){
    const out = [];
    for(let w=1; w<=36; w++) if(tierFor(grade, w).tier===ADULT) out.push(w);
    return out;
  }

  /* Applying every offered swap: how many weeks are then fully solo. */
  function soloIfSwapped(grade){
    let n = 0;
    for(let w=1; w<=36; w++){
      const t = tierFor(grade, w);
      if(t.tier!==ADULT || t.swap) n++;
    }
    return n;
  }

  /* A self-check for the written claim. The claim cannot be machine-graded
   * fairly, but a child can be taught to audit his own sentence against the
   * same three things a parent would look for. This is not marking; it is the
   * habit the practices standards are actually after. */
  const CLAIM_CHECK = [
    "Does my claim answer the question that was asked?",
    "Did I write down what I actually observed, not what I expected?",
    "Does my evidence come from THIS investigation, not from memory?",
    "Have I said WHY the evidence supports the claim, in its own sentence?",
    "Is there anything my evidence does not prove? Did I say so?"
  ];

  window.__CURR = window.__CURR || {};
  window.__CURR.SCI_AUTONOMY = {
    SOLO, RULE, ADULT, RULES, SWAPS, CLAIM_CHECK,
    tierFor, counts, adultWeeks, soloIfSwapped
  };
})();
