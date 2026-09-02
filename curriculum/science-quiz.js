/* ============================================================================
 * FIELD NOTES — auto-graded checks for Day B
 * ----------------------------------------------------------------------------
 * Four multiple-choice items per week, drawn from that week's own
 * investigation and reading — never generic science trivia.
 *
 * COVERAGE, STATED HONESTLY. Third grade is now complete: all 36 weeks, 144
 * items. Fifth grade has none yet.
 *
 * Weeks without items get the written claim-and-evidence only, and the page
 * says so rather than showing an empty drill. hasCheck() is the honest test
 * and the For Parents tab reports the exact count, so a gap is visible rather
 * than disguised as a finished feature.
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
  16:[
   ["How many geographic regions does Georgia have?",["three", "four", "five", "seven"],2,"Blue Ridge, Valley and Ridge, Appalachian Plateau, Piedmont, Coastal Plain."],
   ["Which region covers the middle of the state?",["Blue Ridge", "Piedmont", "Coastal Plain", "Appalachian Plateau"],1,"The Piedmont is the wide band of rolling hills."],
   ["Georgia has five regions because it has five kinds of:",["weather", "land", "animals", "rivers"],1,"The land itself differs from north to south."],
   ["The smallest region, in the far northwest corner, is the:",["Piedmont", "Coastal Plain", "Appalachian Plateau", "Blue Ridge"],2,"It is a small flat-topped corner with caves."]],
  17:[
   ["The Blue Ridge is Georgia's:",["flattest land", "highest ground", "driest land", "saltiest land"],1,"Height is what makes it different."],
   ["Compared with the rest of the state, the Blue Ridge is:",["hotter and drier", "cooler and wetter", "flatter", "sandier"],1,"Elevation cools and wets it."],
   ["Trout live in mountain streams because they need:",["salt water", "cold water", "still water", "muddy water"],1,"Cold fast water is their requirement."],
   ["Height changes what lives somewhere because it changes:",["the temperature", "the colour", "the day length", "the soil colour only"],0,"Cooler air supports different trees and animals."]],
  18:[
   ["Valley and Ridge is made of:",["flat plains", "long parallel ridges and valleys", "sand dunes", "marshes"],1,"Ridges and valleys run northeast to southwest."],
   ["The ridges stand higher because their rock is:",["softer", "harder", "wetter", "younger"],1,"Softer rock wore down into valleys."],
   ["Farms there usually sit:",["on the ridge tops", "in the valleys", "in caves", "on the coast"],1,"Valley soil is deeper."],
   ["Folding the clay strips modelled how:",["rain falls", "rock layers buckle", "animals move", "soil forms"],1,"Pushing from both ends folds the layers."]],
  19:[
   ["Most Georgians live in which region?",["Blue Ridge", "Piedmont", "Appalachian Plateau", "Valley and Ridge"],1,"Atlanta, Macon and Athens are all in it."],
   ["Piedmont clay is red because of:",["iron", "salt", "plants", "sand"],0,"Iron in the soil gives the colour."],
   ["Clay soil drains:",["quickly", "badly", "not at all in any soil", "only uphill"],1,"Packed clay holds water and drains slowly."],
   ["Describing your own soil as 'gritty' is:",["a conclusion", "an observation", "a prediction", "a guess"],1,"You felt it directly."]],
  20:[
   ["The Coastal Plain covers which part of Georgia?",["the north", "the middle", "the southern half", "only the islands"],2,"It is flat, sandy and low."],
   ["A salt marsh is:",["dry land", "open sea", "between land and sea", "a mountain lake"],2,"It is neither fully land nor fully sea."],
   ["Barrier islands protect the mainland by:",["blocking rivers", "taking storm force first", "growing trees", "holding salt"],1,"They absorb the first impact."],
   ["Many young fish and crabs grow up in the marsh, which makes it:",["unimportant", "a nursery", "a desert", "a mountain"],1,"It shelters juveniles."]],
  21:[
   ["Camouflage helps an animal by making it:",["faster", "harder to see", "larger", "louder"],1,"It avoids being spotted."],
   ["Camouflage only works:",["everywhere", "in the right place", "at night", "in water"],1,"A pale moth is obvious on dark bark."],
   ["Camouflage can help a predator by letting it:",["run faster", "sneak up on prey", "see better", "smell better"],1,"It works in both directions."],
   ["Which moths were hardest to find in your test?",["the brightest", "the ones matching the bark", "the largest", "the ones on top"],1,"Matching the background is the point."]],
  22:[
   ["Hibernation helps an animal survive a season when:",["it is too bright", "food is scarce", "it rains", "days are long"],1,"It waits out the shortage."],
   ["During hibernation an animal's heartbeat:",["speeds up", "slows down", "stops", "stays the same"],1,"Everything slows to save energy."],
   ["A hibernating animal lives off:",["stored fat", "fresh food", "water only", "sunlight"],0,"Fat built up beforehand."],
   ["Georgia black bears den less deeply than northern bears because:",["they are smaller", "winters here are milder", "they are older", "they eat more"],1,"Food is not gone as completely."]],
  23:[
   ["Migration means moving:",["only once", "with the seasons", "underground", "in circles"],1,"Animals follow the food."],
   ["Many birds breed in the north in summer because:",["it is warmer there", "insects are plentiful", "it is quieter", "it is darker"],1,"Food supply drives it."],
   ["Migration is worth its enormous energy cost because:",["staying would cost more", "it is fun", "birds get lost", "it is short"],0,"Staying through winter would be worse."],
   ["Some birds pass through Georgia twice a year without staying. They are:",["hibernating", "migrating", "nesting", "lost"],1,"Georgia sits on their route."]],
  24:[
   ["Mimicry means one animal:",["hides underground", "resembles another", "changes colour daily", "sleeps all winter"],1,"Looking like something else helps it."],
   ["A harmless animal that looks like a harmful one may be:",["eaten first", "left alone", "brighter", "larger"],1,"Predators avoid the original."],
   ["Mimicry stops working if the copies become:",["rarer", "more common than the real thing", "smaller", "faster"],1,"Predators stop avoiding the pattern."],
   ["Comparing a viceroy and a monarch shows mimicry because they:",["are the same species", "look similar but are different species", "both migrate", "both hibernate"],1,"Resemblance across species is the point."]],
  25:[
   ["An organism thrives where its needs are met, including:",["colour and size", "food, water, shelter and temperature", "name and group", "age and weight"],1,"Those four decide where it can live."],
   ["Trout live in mountain streams because they need:",["tidal mud", "cold fast water", "salt water", "dry sand"],1,"Their requirement is cold moving water."],
   ["Fiddler crabs live in the marsh because they need:",["tidal mud", "mountain rock", "pine forest", "cold streams"],0,"They burrow in tidal mud."],
   ["Matching an animal to a place means matching its:",["picture", "needs", "colour", "size"],1,"Needs, not appearance."]],
  26:[
   ["A fiddler crab in the mountains would first lack:",["friends", "tidal mud and salt water", "sunlight", "air"],1,"Its habitat requirements are absent."],
   ["Asking why an animal CANNOT live somewhere is useful because it:",["is easier", "reveals what it actually needs", "takes less time", "avoids evidence"],1,"The failures name the requirements."],
   ["An animal is not merely near its habitat; it is:",["bored by it", "fitted to it", "larger than it", "older than it"],1,"Its features match the place."],
   ["Listing three problems instead of one makes your answer:",["longer only", "better evidenced", "harder to read", "less accurate"],1,"More evidence supports the claim."]],
  27:[
   ["A claim is:",["what you observed", "what you think is true", "a measurement", "a question"],1,"It is the position you are arguing."],
   ["Evidence is:",["your opinion", "what you observed", "your conclusion", "a guess"],1,"It is the record of what happened."],
   ["Reasoning is the part that:",["repeats the claim", "connects evidence to claim", "adds new data", "asks a question"],1,"It explains why the evidence supports the claim."],
   ["Giving a claim with no evidence means your argument is:",["complete", "incomplete", "proven", "measured"],1,"Assertion is not support."]],
  28:[
   ["Pollution is anything added to air, land or water that:",["looks untidy", "harms living things", "costs money", "smells"],1,"Harm is what defines it."],
   ["Litter is obvious pollution. Fertiliser running into a creek is:",["not pollution", "less obvious pollution", "only a smell", "harmless"],1,"Runoff is harder to see but still harmful."],
   ["Recording where and how much you found turns an impression into:",["an opinion", "evidence", "a guess", "a story"],1,"Records make it checkable."],
   ["Keeping a record of sources and effects is asked for by:",["nobody", "the standards", "the weather", "the map"],1,"S3L2.a asks for exactly this."]],
  29:[
   ["Oil harms a bird mainly by:",["poisoning it instantly", "ruining the feathers' ability to trap air", "making it heavy only", "scaring it"],1,"It cannot stay warm or float."],
   ["The feather was hardest to clean with:",["soap and water", "water alone", "a dry wipe", "nothing"],2,"A dry wipe removed the least."],
   ["Pollution often harms animals by:",["being eaten", "ruining something they depended on", "changing their colour", "making noise"],1,"It removes what they needed."],
   ["This investigation is a model, so it:",["proves everything", "shows the idea but not every detail", "is useless", "replaces real study"],1,"Models simplify."]],
  30:[
   ["Recycling means:",["throwing away", "using a material again", "burning waste", "burying waste"],1,"The material re-enters use."],
   ["Which materials recycle best, many times over?",["paper", "metal and glass", "food waste", "cloth"],1,"They can be melted and reused repeatedly."],
   ["Paper can be recycled:",["forever", "a limited number of times", "never", "only once"],1,"Fibres shorten each time."],
   ["Whether a plastic can be recycled depends on:",["its colour", "your local area's rules", "its weight", "its age"],1,"Acceptance varies by place."]],
  31:[
   ["Conservation means:",["using it again", "using less so more is left", "burning it", "burying it"],1,"It reduces use in the first place."],
   ["Conservation differs from recycling because it deals with:",["what you already used", "what you have not used yet", "only metal", "only water"],1,"It prevents the use."],
   ["Turning off the tap while brushing saves water that was:",["already dirty", "never dirtied", "recycled", "frozen"],1,"It never entered the waste stream."],
   ["Small changes matter most when they are:",["intended", "measured and kept", "announced", "short"],1,"Measurement is what makes it real."]],
  32:[
   ["Which is a source of heat?",["sunlight", "friction", "burning", "all three"],3,"All three appear in S3P1.a."],
   ["Rubbing your hands warms them through:",["sunlight", "friction", "burning", "cooling"],1,"Movement becomes heat."],
   ["Brakes get hot because of:",["sunlight", "friction", "burning", "freezing"],1,"Rubbing surfaces produce heat."],
   ["Burning releases heat that was:",["created from nothing", "stored in a fuel", "taken from the air", "made by light"],1,"The fuel held the energy."]],
  33:[
   ["A thermometer is useful because it turns a feeling into:",["a colour", "a number", "a guess", "a picture"],1,"Numbers can be compared and checked."],
   ["You should wait before reading a thermometer until:",["one second passes", "the reading stops moving", "it looks right", "it is warm"],1,"It needs to reach the temperature."],
   ["Always write the temperature with its:",["colour", "unit", "date only", "name"],1,"20\u00b0C and 20\u00b0F are very different."],
   ["Reading at eye level prevents:",["breaking it", "a misread number", "heat loss", "evaporation"],1,"Angle can distort the reading."]],
  34:[
   ["Dark surfaces heat faster because they:",["reflect more light", "absorb more light", "are heavier", "are thinner"],1,"Absorbed light becomes heat."],
   ["Light surfaces stay cooler because they:",["absorb more", "reflect more away", "are colder", "are thicker"],1,"Reflected light does not warm them."],
   ["A black car is hotter inside than a white one on the same day because of:",["size", "colour and absorption", "age", "windows only"],1,"Colour changes how much light is absorbed."],
   ["Recording temperatures every five minutes gives you:",["one reading", "a pattern over time", "a guess", "a colour"],1,"Repeated readings show a trend."]],
  35:[
   ["Heat always moves from:",["cooler to warmer", "warmer to cooler", "light to dark", "high to low"],1,"That direction never reverses."],
   ["The spoon in warm water will:",["cool down", "warm up", "stay the same", "freeze"],1,"Heat flows into the cooler spoon."],
   ["The water with the spoon in it will:",["warm slightly", "cool slightly", "boil", "freeze"],1,"It gives up heat to the spoon."],
   ["A cold drink warms in a room because:",["the room cools it", "heat moves from the room into the drink", "cold rises", "nothing happens"],1,"Heat moves toward the cooler thing."]],
  36:[
   ["A single reading is an anecdote; many readings are:",["a guess", "evidence", "an opinion", "a colour"],1,"Repetition makes a pattern visible."],
   ["Charting your data makes visible:",["your handwriting", "a pattern", "the temperature only", "nothing"],1,"Graphs show trends numbers hide."],
   ["Saying what your data does NOT show is:",["a weakness", "part of an honest result", "unnecessary", "a mistake"],1,"Limits are part of the finding."],
   ["Which is the most honest statement?",["my data proves everything", "my data shows the black paper got hotter, but I only tested one day", "black is always hotter", "colour never matters"],1,"It states the finding and its limit."]],
  };

  const Y5 = {};   // not yet authored; hasCheck() returns false, page adapts

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
