/* ============================================================================
 * FIELD NOTES — 3RD GRADE SCIENCE, Georgia Standards of Excellence
 * ----------------------------------------------------------------------------
 * 36 weeks, ONE lesson a week, 36 lessons total.
 *
 * Each week is a single sitting in three parts:
 *   1 INVESTIGATE  hands-on. A question, a procedure, a notebook entry.
 *   2 EXPLAIN      a short reading, then one claim written with its evidence.
 *   3 CHECK        a few auto-graded questions, where they exist.
 *
 * WHAT CHANGED AND WHAT DID NOT. This course used to run twice a week. Going
 * to once a week merged the two days rather than deleting one: every lab,
 * every reading, every claim prompt and every standard is still here. What
 * changed is that they now happen in one sitting instead of two.
 *
 * That is a real trade and worth saying plainly: the weekly session is now
 * roughly twice as long as either old day. A lab, a reading and a written
 * claim in one go is a substantial block for a third grader especially. If
 * that proves too long, the honest fix is to cut content rather than to
 * pretend it fits — say so and units can be shortened deliberately.
 *
 * HOW THE YEAR IS WEIGHTED. Georgia's Grade 3 content is fairly even across
 * Earth, physical and life — but that is even across STANDARDS, not across
 * teaching time. Earth carries two standards (rocks/soils/erosion, fossils),
 * life carries two (regions/adaptations, pollution), and physical carries one
 * (heat). So the year runs 15 weeks Earth, 16 life, 5 physical. Habitats is
 * the longest unit, which is also how Georgia schools usually run it. Five
 * weeks on heat is not neglect; S3P1 is genuinely one standard with three
 * parts, and stretching it to twelve weeks would be padding.
 *
 * PLACE-BASED ON PURPOSE. Grade 3 GSE is unusually local: Georgia's five
 * regions, Georgia soils, a washout in your own yard. Wherever a lesson can
 * use what is outside the door instead of a picture in a book, it does.
 *
 * ON FAITH IN THIS SUBJECT. The science is the Georgia standards, taught
 * straight. The Christian frame is in what surrounds it: wonder that the world
 * holds still long enough to be studied, stewardship as the actual reason
 * S3L2 exists, and honesty about evidence as a moral habit and not merely a
 * lab rule — S3E2.a and S3L1.c both ask a third grader to argue from what he
 * observed, and not overstating your evidence is the same virtue Word
 * Voyagers teaches about quoting a text exactly.
 *
 * WORTH KNOWING, said plainly rather than left to surprise you. Grade 3 GSE
 * asks a child to argue that fossils are evidence of past organisms and the
 * environments they lived in (S3E2.a), and to model the conditions needed for
 * fossilisation (S3E2.b). It does not require any claim about how long that
 * took, and no lesson here supplies one. Families differ on the age of the
 * earth; that question is genuinely not in these standards, so nothing has
 * been bent either to raise it or to dodge it. Where a lesson would naturally
 * invite it, the notebook prompt asks what the evidence shows and leaves the
 * larger question to you.
 *
 * A CONSTRAINT TO BE HONEST ABOUT. The reading and the check a child can do
 * alone. The investigation is real, with real materials, and an adult should
 * be nearby — more so at this age than in fifth grade. Every lesson lists its
 * materials and flags supervision, so a week can be planned rather than
 * discovered. Merging the days means that adult is now needed for part of
 * every single science session rather than for one of two.
 * ==========================================================================*/
(function(){

  const UNITS = [
    {n:1, weeks:"1–4", strand:"Earth", code:"S3E1.a", color:"#8B7355", badge:"◈",
     name:"What Rocks Are Made Of",
     bigQ:"How can you tell two rocks apart without being told what they are?",
     goal:"Classify rocks by colour, texture, lustre and hardness using simple tests.",
     why:"Looking closely is a skill before it is a science. A rock will not tell you what it is; you have to ask it properly.",
     project:"A labelled rock collection of eight specimens, each sorted by all four properties."},

    {n:2, weeks:"5–8", strand:"Earth", code:"S3E1.b", color:"#A0522D", badge:"▤",
     name:"The Ground Underneath",
     bigQ:"Why will a bean grow well in one kind of dirt and badly in another?",
     goal:"Investigate sand, clay and loam: colour, texture, water-holding, and plant growth.",
     why:"The parable of the sower is about soil. A boy who has actually grown beans in sand and in loam reads that parable differently.",
     project:"Three cups, three soils, one bean each — measured weekly for a month."},

    {n:3, weeks:"9–11", strand:"Earth", code:"S3E1.c", color:"#6B8E23", badge:"≈",
     name:"Water and Wind at Work",
     bigQ:"What made that bare patch under the downspout?",
     goal:"Observe the local environment and explain how water or wind changed soil or rock over time.",
     why:"The evidence is in your own yard. Learning to see it there is the difference between studying science and doing it.",
     project:"Photograph three changed places outside your house and explain what moved the dirt."},

    {n:4, weeks:"12–15", strand:"Earth", code:"S3E2", color:"#5F4B32", badge:"❋",
     name:"Fossils and What They Show",
     bigQ:"How can a rock be evidence of something that was once alive?",
     goal:"Argue from fossils that they are evidence of past organisms and their environments; model how fossilisation happens.",
     why:"A fossil is a record nobody wrote down on purpose. Reading it carefully, and not claiming more than it shows, is honest work.",
     project:"Press-and-layer your own fossil in clay and tell the sequence that made it."},

    {n:5, weeks:"16–20", strand:"Life", code:"S3L1.a", color:"#3E6B4F", badge:"⛰",
     name:"Georgia's Five Regions",
     bigQ:"Why does the north of this state look nothing like the coast?",
     goal:"Tell plants, animals and habitats apart across Georgia's five geographic regions.",
     why:"You live in one of these. Knowing your own place well is the beginning of caring for it.",
     project:"One page per region: the land, two plants, two animals, and what makes it different."},

    {n:6, weeks:"21–24", strand:"Life", code:"S3L1.b", color:"#2E7D6B", badge:"◑",
     name:"Built to Survive",
     bigQ:"What does an animal have, or do, that lets it live where it lives?",
     goal:"Explain how external features and adaptations help animals survive: camouflage, hibernation, migration, mimicry.",
     why:"Every creature is fitted to somewhere. Noticing how carefully is most of the wonder.",
     project:"Pick one Georgia animal and diagram three features that suit it to its habitat."},

    {n:7, weeks:"25–27", strand:"Life", code:"S3L1.c", color:"#4A7C59", badge:"⇄",
     name:"Why Here and Not There",
     bigQ:"Would a marsh animal survive in the mountains?",
     goal:"Use evidence to explain why an organism thrives in one habitat and not another.",
     why:"The answer is never 'it just does'. There is always a reason, and finding it is the assignment.",
     project:"Move one animal to the wrong region on paper and list exactly what would go wrong."},

    {n:8, weeks:"28–31", strand:"Life", code:"S3L2", color:"#5F8D4E", badge:"♻",
     name:"Keeping the Garden",
     bigQ:"What are people doing to this place, and what can be done about it?",
     goal:"Record sources and effects of air, land and water pollution; research and communicate conservation solutions.",
     why:"The first job given to people was to tend a garden and keep it. This unit is that job, in Georgia, now.",
     project:"Sort a week of household waste, then carry out one conservation change and measure it."},

    {n:9, weeks:"32–36", strand:"Physical", code:"S3P1", color:"#C79319", badge:"☀",
     name:"Heat on the Move",
     bigQ:"Where does heat come from, and which way does it always go?",
     goal:"Identify heat sources; use thermometers to chart how sunlight affects objects; show heat moves from warmer to cooler.",
     why:"A thermometer turns 'it feels hot' into something you can write down and defend. That is the whole method in one tool.",
     project:"A two-week temperature chart comparing four surfaces in sun and shade."}
  ];

  /* [week, unit, title, standard, investigation focus, reading focus] */
  const W = [
    [1,1,"Colour and Texture","S3E1.a","Sorting eight rocks by eye and touch","Properties you can see"],
    [2,1,"Lustre","S3E1.a","Shiny or dull, wet and dry","How a rock catches light"],
    [3,1,"The Scratch Test","S3E1.a","Fingernail, penny, nail","Hardness and the Mohs idea"],
    [4,1,"Sorting It All Together","S3E1.a","Four-property sorting chart","Classifying by more than one thing"],
    [5,2,"Sand, Clay and Loam","S3E1.b","Feel, roll and squeeze each","Three soils, three textures"],
    [6,2,"Holding Water","S3E1.b","Pour-through timing test","Why some soils drain fast"],
    [7,2,"Growing in Soil","S3E1.b","Plant beans in all three","What roots actually need"],
    [8,2,"Two Weeks Later","S3E1.b","Measure and chart the beans","Reading your own data"],
    [9,3,"After the Rain","S3E1.c","Walk the yard, photograph washouts","Water moves dirt downhill"],
    [10,3,"Ripples and Bare Patches","S3E1.c","Wind and a tray of dry soil","Wind moves the light stuff"],
    [11,3,"Slowing It Down","S3E1.c","Bare slope vs. planted slope","What holds soil in place"],
    [12,4,"What a Fossil Is","S3E2.a","Examine real or replica fossils","Evidence of something once alive"],
    [13,4,"Reading the Environment","S3E2.a","Shell fossils far from the sea","What the fossil says about the place"],
    [14,4,"Burial and Time","S3E2.b","Press a shell into clay","The conditions fossilising needs"],
    [15,4,"Layer by Layer","S3E2.b","Build sediment layers in a jar","Telling the sequence in order"],
    [16,5,"Five Regions","S3L1.a","Map Georgia and mark all five","Blue Ridge to Coastal Plain"],
    [17,5,"Blue Ridge and the Plateau","S3L1.a","Mountain habitat page","Cold, steep and forested"],
    [18,5,"Valley and Ridge","S3L1.a","Ridge and valley model in clay","Long ridges, long valleys"],
    [19,5,"The Piedmont","S3L1.a","Local survey — likely your own","Red clay and rolling hills"],
    [20,5,"The Coastal Plain","S3L1.a","Marsh and barrier island page","Flat, wet and salty at the edge"],
    [21,6,"Camouflage","S3L1.b","Hide paper moths on bark","Not being seen"],
    [22,6,"Hibernation","S3L1.b","Chart a bear's year","Sleeping through the lean season"],
    [23,6,"Migration","S3L1.b","Track a bird route on the map","Leaving and coming back"],
    [24,6,"Mimicry","S3L1.b","Compare a viceroy and a monarch","Looking like something you are not"],
    [25,7,"Matching Animal to Home","S3L1.c","Sort ten animals to regions","What each one needs"],
    [26,7,"The Wrong Habitat","S3L1.c","Move one animal, list the problems","Why it would not survive"],
    [27,7,"Arguing From Evidence","S3L1.c","Claim, evidence, reasoning practice","Saying why, not just what"],
    [28,8,"Where Pollution Comes From","S3L2.a","Walk and log what you find","Air, land and water sources"],
    [29,8,"What It Does","S3L2.a","Oil-and-feather demonstration","Effects on plants and animals"],
    [30,8,"Recycling","S3L2.b","Sort a week of household waste","What can be used again"],
    [31,8,"Conservation","S3L2.b","Pick one change and measure it","Using less on purpose"],
    [32,9,"Where Heat Comes From","S3P1.a","Sunlight, friction, burning (adult)","Three sources of heat"],
    [33,9,"Reading a Thermometer","S3P1.b","Practice readings, build a table","Turning warm into a number"],
    [34,9,"Sun and Shade","S3P1.b","Black and white paper in the sun","Colour changes what heats"],
    [35,9,"Warmer to Cooler","S3P1.c","Warm water, cool spoon, timed","Which way heat always moves"],
    [36,9,"Proving It With Data","S3P1.c","Chart two weeks of readings","What the year's numbers show"]
  ];

  const DAYS = ["W"];
  const DAY_NAME = {W:"Science"};

  const WEEKS = W.map(r=>({
    n:r[0], unit:r[1], title:r[2], standard:r[3], labFocus:r[4], readFocus:r[5],
    days:[{day:"W", kind:"weekly", label:"Science"}]
  }));

  const unitOf = wk => UNITS[(WEEKS.find(w=>w.n===wk)||{unit:1}).unit - 1];

  const STANDARDS = [
    {tag:"S3E1.a", text:"Classify rocks by colour, texture, lustre and hardness using simple tests.", weeks:"1–4"},
    {tag:"S3E1.b", text:"Investigate soils (sand, clay, loam): colour, texture, water-holding, and support for plant growth.", weeks:"5–8"},
    {tag:"S3E1.c", text:"Observe the local environment and explain how water and/or wind changed soil or rocks over time.", weeks:"9–11"},
    {tag:"S3E2.a", text:"Argue from observations of fossils that they are evidence of past organisms and their environments.", weeks:"12, 13"},
    {tag:"S3E2.b", text:"Develop a model of the sequence and conditions needed for an organism to become fossilised.", weeks:"14, 15"},
    {tag:"S3L1.a", text:"Tell plants, animals and habitats apart across Georgia's five geographic regions.", weeks:"16–20"},
    {tag:"S3L1.b", text:"Explain how external features and adaptations help animals survive: camouflage, hibernation, migration, mimicry.", weeks:"21–24"},
    {tag:"S3L1.c", text:"Use evidence to explain why an organism can thrive in one habitat and not another.", weeks:"25–27"},
    {tag:"S3L2.a", text:"Ask questions and keep records of sources and effects of air, land and water pollution.", weeks:"28, 29"},
    {tag:"S3L2.b", text:"Research and communicate solutions such as conservation and recycling.", weeks:"30, 31"},
    {tag:"S3P1.a", text:"Identify sources of heat: sunlight, friction, burning.", weeks:"32"},
    {tag:"S3P1.b", text:"Use thermometers to collect data and chart how sunlight affects different objects.", weeks:"33, 34"},
    {tag:"S3P1.c", text:"Investigate how heat moves from warmer objects to cooler ones and explain the transfer with data.", weeks:"35, 36"},
    {tag:"Practices", text:"Ask investigable questions, use tools, keep unaltered records, separate observation from guess, sort and classify, build models, use tables and charts, argue from evidence, work safely.", weeks:"every week"}
  ];

  /* NOT required at Grade 3, listed so nobody teaches ahead of the standard
   * by accident — Georgia holds these back deliberately. */
  const NOT_YET = [
    "Sedimentary, igneous and metamorphic rock types (Grade 6)",
    "Cleavage and streak tests (Grade 6)",
    "Cast, mould, trace and true-fossil terminology (later grades)",
    "Conduction, convection and radiation as vocabulary (later grades)"
  ];

  function strandWeeks(){
    const out={Earth:0, Life:0, Physical:0};
    WEEKS.forEach(w=>{ out[UNITS[w.unit-1].strand]++; });
    return out;
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.SCI_Y3 = Object.assign(window.__CURR.SCI_Y3||{}, {
    UNITS, WEEKS, STANDARDS, NOT_YET, DAYS, DAY_NAME, unitOf, strandWeeks,
    GRADE:{label:"3rd Grade Science", short:"3rd", set:"Georgia Standards of Excellence"}
  });
})();
