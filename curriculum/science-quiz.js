/* ============================================================================
 * FIELD NOTES — auto-graded checks for Day B
 * ----------------------------------------------------------------------------
 * Four multiple-choice items per week, drawn from that week's own
 * investigation and reading — never generic science trivia.
 *
 * COVERAGE IS PARTIAL AND THE PAGE KNOWS IT. Weeks with items get a check;
 * weeks without get the written claim-and-evidence only, and the page says so
 * rather than showing an empty drill. That is not a placeholder pretending to
 * be finished: hasCheck() is the honest test, and the For Parents tab reports
 * exactly which weeks are covered.
 *
 * This ordering is deliberate. The claim-with-evidence sentence is the thing
 * Georgia's practices standards actually ask for, and it is written by hand
 * and read by a person. The multiple-choice check is support for it, not a
 * substitute, so a week without items still teaches the standard properly.
 *
 * FORMAT  [prompt, [options], correctIndex, hint]
 * ==========================================================================*/
(function(){

  const Y3 = {
  1:[
   ["Which pair are both properties you can observe without tools?",["colour and texture", "hardness and streak", "cleavage and lustre", "age and depth"],0,"Colour and texture need only eyes and fingers."],
   ["A rock is 'grey with white specks'. That is a:",["guess", "observation", "conclusion", "prediction"],1,"You can see it, so it is an observation."],
   ["Why is 'rough' better evidence than 'pretty'?",["it is shorter", "someone else can check it", "it sounds scientific", "it is always true"],1,"Evidence has to be checkable by another person."],
   ["Sorting rocks into two piles requires you to:",["guess", "state the rule you used", "use a microscope", "know their names"],1,"A grouping is only useful if the rule is stated."]],
  2:[
   ["Lustre means how a rock:",["feels", "catches light", "smells", "weighs"],1,"Lustre is about light, not touch."],
   ["A dull rock can look shiny when wet because water:",["dissolves it", "fills the tiny pits", "adds minerals", "cools it"],1,"Water fills surface pits and smooths the reflection."],
   ["Geologists describe lustre on a dry rock because:",["water changes the appearance", "wet rocks are heavy", "it is traditional", "water is dirty"],0,"Wetting can make a dull rock look glassy."],
   ["Which is a lustre word?",["gritty", "metallic", "heavy", "large"],1,"Metallic describes how light reflects."]],
  3:[
   ["A harder material will:",["be scratched by a softer one", "scratch a softer one", "weigh more", "be darker"],1,"Harder scratches softer, never the reverse."],
   ["Your fingernail scratched a rock. That rock is:",["very hard", "softer than your fingernail", "metallic", "a fossil"],1,"If a nail scratches it, it is softer than the nail."],
   ["Roughly which is hardest?",["fingernail", "copper penny", "iron nail", "all the same"],2,"An iron nail is around 5.5 on the Mohs scale."],
   ["The Mohs scale measures:",["weight", "hardness", "colour", "age"],1,"It ranks resistance to scratching."]],
  4:[
   ["Sorting by four properties instead of one is better because:",["it takes longer", "one property alone can mislead", "it uses more paper", "teachers prefer it"],1,"Several properties together are more reliable."],
   ["Two rocks share a colour. That means they:",["are the same rock", "may still be very different", "are both hard", "are both soft"],1,"Colour alone predicts almost nothing."],
   ["A good group is one where you can:",["name every rock", "say why they belong together", "count them quickly", "see them all"],1,"A stated rule is what makes it testable."],
   ["Classification is scientific when membership:",["looks tidy", "tells you something new", "uses colour", "is decided fast"],1,"Useful groups carry information."]],
  5:[
   ["Which soil has the largest grains?",["clay", "loam", "sand", "all equal"],2,"Sand grains are large enough to feel separately."],
   ["Clay holds a rolled ball because its grains are:",["large", "tiny and sticky together", "dry", "round"],1,"Small grains cling to one another."],
   ["Loam is:",["pure sand", "pure clay", "a mixture with plant material", "a kind of rock"],2,"Loam mixes sand, clay and decayed matter."],
   ["Which is an observation, not a conclusion?",["this soil is best for beans", "this soil felt gritty", "this soil is loam", "this soil came from a river"],1,"Gritty is what you felt."]],
  6:[
   ["Water runs fastest through soil with:",["large gaps", "tiny gaps", "no gaps", "wet gaps"],0,"Big gaps let water pass quickly."],
   ["Which soil is likely to hold the most water?",["sand", "clay", "gravel", "none"],1,"Tiny packed grains hold water."],
   ["Pouring the same amount of water into each cup makes the test:",["prettier", "fair", "faster", "harder"],1,"Keeping variables the same is what makes it fair."],
   ["Recording how much water came out turns your test into:",["an opinion", "data", "a guess", "a model"],1,"Numbers you wrote down are data."]],
  7:[
   ["Roots need water, anchorage and:",["sunlight directly", "air", "salt", "noise"],1,"Roots need air in the soil as well as water."],
   ["Sand often grows plants poorly because it:",["holds too much water", "drains too fast", "is too dark", "is too cold"],1,"Water leaves before roots can use it."],
   ["Clay can be hard on roots because it:",["packs tightly", "is too loose", "has no minerals", "is too warm"],0,"Packed clay blocks roots and air."],
   ["Giving all three cups the same water and light makes this:",["a fair test", "a model", "an opinion", "a guess"],0,"Only the soil differs, so soil is what is being tested."]],
  8:[
   ["A prediction that turns out wrong is:",["a failed experiment", "a result", "a mistake to erase", "not science"],1,"A result is a result either way."],
   ["Changing your recorded data afterwards is:",["allowed if you were close", "not allowed", "a good habit", "required"],1,"Records must stay unaltered."],
   ["A bar chart of three heights makes it easier to:",["hide the result", "compare them", "grow plants", "water evenly"],1,"Charts make comparison visible."],
   ["Which sentence is honest reporting?",["the loam won as I predicted", "the loam grew tallest; my prediction was right", "loam is best", "I knew loam would win"],1,"It states the data and the prediction separately."]],
  9:[
   ["Fast-moving water tends to:",["drop material", "pick material up", "stay still", "freeze"],1,"Speed lets water carry material."],
   ["A fan of dirt collects where water:",["speeds up", "slows down", "freezes", "evaporates"],1,"Slowing water drops its load."],
   ["A bare patch under a downspout is evidence of:",["deposition", "erosion", "fossils", "pollution"],1,"Water carried the soil away."],
   ["The same two processes shape:",["only yards", "only rivers", "whole coastlines", "nothing else"],2,"They act at every scale."]],
  10:[
   ["Wind moves which soil first?",["wet and heavy", "dry and light", "frozen", "packed"],1,"Light dry particles move most easily."],
   ["Damp soil resists wind because it:",["is heavier and sticks together", "is colder", "is darker", "has roots"],0,"Moisture makes particles cling."],
   ["Ripples in dry dirt are made much like ripples in:",["a streambed", "a mirror", "a window", "a book"],0,"Both are made by a fluid pushing particles."],
   ["Wearing safety glasses to blow soil is about:",["speed", "working safely", "accuracy", "fairness"],1,"Eye protection is a safety practice."]],
  11:[
   ["Roots hold soil the way:",["threads hold cloth", "water holds sand", "wind holds dust", "ice holds rock"],0,"Roots bind the soil together."],
   ["Plant cover also helps by:",["heating the soil", "breaking the fall of raindrops", "adding clay", "drying the ground"],1,"Leaves absorb the impact of rain."],
   ["Which tray lost more soil?",["the planted one", "the bare one", "both equally", "neither"],1,"Bare soil washes away far more."],
   ["Farmers plant cover crops mainly to:",["look tidy", "prevent erosion", "raise temperature", "make clay"],1,"Keeping something growing holds soil."]],
  12:[
   ["A fossil is evidence that:",["a rock is old", "something was once alive", "the weather changed", "water was present"],1,"Fossils record living organisms."],
   ["'This has ridges' is:",["a conclusion", "an observation", "a prediction", "a guess"],1,"You can see ridges directly."],
   ["'This was a shellfish' is:",["an observation", "a conclusion", "a measurement", "a fact you saw"],1,"It goes beyond what you observed."],
   ["Drawing the parts you do not understand is:",["a waste", "good recording", "cheating", "optional"],1,"Records should show what is actually there."]],
  13:[
   ["A sea-shell fossil found far inland suggests that place was once:",["a desert", "underwater", "a mountain", "frozen"],1,"The organism needed water to live."],
   ["Fossil ferns suggest a climate that was:",["cold and dry", "warm and wet", "salty", "windy"],1,"Ferns need warmth and moisture."],
   ["Fossils tell you about organisms and also about:",["prices", "environments", "names", "colours"],1,"They are evidence about places too."],
   ["The strongest claim you can make from one shell fossil is that:",["the whole state was sea", "this spot was once underwater", "fossils are common", "the shell was large"],1,"Claim only what your evidence supports."]],
  14:[
   ["Most living things never become fossils because:",["they are too small", "quick burial rarely happens", "they float", "they are eaten by rocks"],1,"Rapid burial is the rare step."],
   ["Which part of an organism usually survives?",["soft tissue", "hard parts", "colour", "smell"],1,"Bones and shells last; soft parts decay."],
   ["Sediment must arrive:",["slowly over centuries", "quickly, before decay", "only in winter", "after the rock hardens"],1,"Speed is what protects the remains."],
   ["Making a plaster copy of a clay impression models:",["erosion", "how a shape can be preserved", "hardness", "classification"],1,"It models preservation of form."]],
  15:[
   ["In undisturbed layers, the bottom layer was laid down:",["last", "first", "at the same time", "never"],1,"Lower means earlier."],
   ["A shell between two layers arrived:",["before both", "after both", "after the lower, before the upper", "at no time"],2,"It is bracketed by the two layers."],
   ["Layering tells you:",["exact dates", "the order of events", "the temperature", "the weight"],1,"Sequence, not age."],
   ["Sequence and age are:",["the same question", "different questions", "both unanswerable", "both about colour"],1,"Order can be known without dates."]],
  };

  const Y5 = {};   // authored next; hasCheck() returns false meanwhile

  function hasCheck(grade, week){
    const t = grade==="y5" ? Y5 : Y3;
    return !!(t[week] && t[week].length);
  }

  function setFor(grade, week){
    const t = grade==="y5" ? Y5 : Y3;
    const rows = t[week] || [];
    return {
      id: "sci-"+grade+"-w"+week+"-check",
      w: week,
      title: "Check your understanding",
      items: rows.map((r,i)=>({
        id: "sci-"+grade+"-q-w"+week+"-"+(i+1),
        type: "multiple-choice",
        t: i===0 ? 0 : i===rows.length-1 ? 2 : 1,
        q: r[0], options: r[1], a: r[2], hint: r[3]
      }))
    };
  }

  /* Which weeks have a check, so the parent view can state it plainly. */
  function coverage(grade){
    const t = grade==="y5" ? Y5 : Y3;
    const have = [];
    for(let w=1; w<=36; w++) if(t[w] && t[w].length) have.push(w);
    return {weeks:have, count:have.length, total:36,
            items:have.reduce((n,w)=>n+t[w].length,0)};
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.SCI_QUIZ = {Y3, Y5, hasCheck, setFor, coverage};
})();
