/* ============================================================================
 * FIELD NOTES — 5TH GRADE SCIENCE, Georgia Standards of Excellence
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
 * changed is that they now happen in one sitting instead of two, so the
 * weekly session is roughly twice as long as either old day. If that proves
 * too long, the honest fix is to cut content deliberately rather than to
 * pretend it fits.
 *
 * WEIGHTED TO THE STATE TEST, not split evenly. Georgia Milestones Grade 5
 * Science is roughly 42% life, 35% physical, 23% earth, so the year is
 * 15 weeks life, 13 physical, 8 earth. An even split would have over-taught
 * earth science by half and under-taught life science by a third.
 *
 * ON FAITH AND THIS PARTICULAR SUBJECT, said plainly because it matters.
 * The science content here is the Georgia standards, taught straight. The
 * Christian frame is in what surrounds it: wonder at how much order there is
 * to find, stewardship as the reason to care about erosion and water and
 * microbes, and honesty about evidence as a moral habit rather than merely a
 * lab rule. That last one is not decoration — S5E1.a and S5L4 both literally
 * ask a child to "argue from evidence", and refusing to overstate what your
 * data shows is the same virtue Word Voyagers Unit 1 teaches about quoting.
 *
 * Worth knowing: Georgia's Grade 5 standards do not include evolution or the
 * age of the earth. S5L2 is inherited traits versus learned behaviours, not
 * genetics or common descent. So at this grade there is no point where the
 * required content and a family's position on origins collide, and nothing
 * here has been bent to avoid one. If that comes up it will be in a later
 * grade, and it should be met honestly then rather than pre-empted now.
 *
 * A CONSTRAINT TO BE HONEST ABOUT. The other subjects here are self-led.
 * Science is not. The reading and the check a child can do alone, but the
 * investigation uses real materials — vinegar, batteries, magnets, a candle
 * in two of them — and an adult should be in the room. Every lesson lists its
 * materials and flags the ones needing supervision. Now that the days are
 * merged, that adult is needed during part of every science session rather
 * than one of two.
 * ==========================================================================*/
(function(){

  const UNITS = [
    {n:1, weeks:"1–4", strand:"Earth", code:"S5E1", color:"#B5651D", badge:"⛰",
     name:"Reading the Land",
     bigQ:"How can you look at a landform and tell what built it or wore it down?",
     goal:"Argue from evidence whether a feature was made by constructive or destructive processes.",
     why:"The land keeps a record. Learning to read deltas, dunes and canyons is learning that the world is legible — that it rewards patient looking.",
     project:"Photograph or sketch three landforms near you and argue, with evidence, what made each one."},

    {n:2, weeks:"5–8", strand:"Earth", code:"S5E1", color:"#8B5A2B", badge:"≋",
     name:"Holding Back the Water",
     bigQ:"What can people actually do about erosion and flooding, and what can they not?",
     goal:"Model constructive and destructive processes; ask questions about how technology limits or predicts them.",
     why:"Stewardship is not the same as control. Dams, levees and beach reclamation are real goods and real limits — Georgia's own coast is the case study.",
     project:"Build a stream table, run it three ways, and write a recommendation for a town on a river."},

    {n:3, weeks:"9–12", strand:"Life", code:"S5L1", color:"#3E6B4F", badge:"❦",
     name:"Sorting the Living World",
     bigQ:"Why do scientists group living things the way they do, instead of by size or colour?",
     goal:"Group organisms using scientific classification procedures, and explain why the groups were made.",
     why:"Adam's first assignment was naming the animals. Classification is that work continued: looking closely enough to see what actually belongs with what.",
     project:"Build a dichotomous key that a stranger could use to identify ten organisms from your yard."},

    {n:4, weeks:"13–16", strand:"Life", code:"S5L2", color:"#2E7D6B", badge:"⚯",
     name:"Given and Learned",
     bigQ:"Which parts of a creature were handed to it, and which did it have to learn?",
     goal:"Distinguish inherited traits from learned behaviours; discuss offspring traits from parents.",
     why:"A useful question about people too: what you were given, what you were taught, and what you are responsible for doing with both.",
     project:"Chart one inherited trait and one learned behaviour across three generations of your own family."},

    {n:5, weeks:"17–20", strand:"Life", code:"S5L3", color:"#4A7C59", badge:"◉",
     name:"Inside the Cell",
     bigQ:"What is every living thing built out of, and how would you know?",
     goal:"Use magnifiers to observe cells; identify and compare plant and animal cell parts.",
     why:"Fearfully and wonderfully made is a claim about something. A magnifier is how a ten-year-old checks it for himself.",
     project:"Draw, label and compare a plant cell and an animal cell from your own slides, not from a book."},

    {n:6, weeks:"21–23", strand:"Life", code:"S5L4", color:"#5F8D4E", badge:"✺",
     name:"The Unseen World",
     bigQ:"How can something too small to see be both the reason bread rises and the reason people get sick?",
     goal:"Argue from evidence how microorganisms can be beneficial or harmful to other organisms.",
     why:"Almost nothing in creation is simply good or simply bad in every use. Microbes are the clearest lesson a ten-year-old can hold in his hand.",
     project:"Run a yeast investigation and a mould investigation side by side, and write up both honestly."},

    {n:7, weeks:"24–28", strand:"Physical", code:"S5P1", color:"#B23A2E", badge:"⚗",
     name:"Change and Change Back",
     bigQ:"How do you tell a change that can be undone from one that cannot?",
     goal:"Investigate physical changes; argue that state changes are caused by temperature; identify chemical change from evidence.",
     why:"Some changes reverse and some do not. That is worth knowing about vinegar and baking soda, and worth knowing about words said in anger.",
     project:"A five-station lab where each station must be judged physical or chemical, with the evidence written down."},

    {n:8, weeks:"29–32", strand:"Physical", code:"S5P2", color:"#C79319", badge:"⚡",
     name:"Making the Circuit",
     bigQ:"What has to be true before electricity will flow at all?",
     goal:"Distinguish static from harnessed electricity; design a complete circuit; test conductors and insulators.",
     why:"A circuit works only when it is complete. There is no partial credit in a loop — which is a fair picture of a promise, or a chain of people relying on each other.",
     project:"Build a working circuit with a switch, then test twenty household materials and chart the results."},

    {n:9, weeks:"33–36", strand:"Physical", code:"S5P3", color:"#7C5CBF", badge:"⌁",
     name:"The Invisible Pull",
     bigQ:"How are a magnet and an electric current the same thing wearing different clothes?",
     goal:"Argue how an electromagnet differs from a permanent magnet; investigate magnetic fields.",
     why:"A field you cannot see, doing measurable work you can. Good practice for believing in things on the strength of what they do.",
     project:"Build an electromagnet, then find the three variables that make it stronger and prove each one."}
  ];

  /* [week, unit, title, standard, dayA lab focus, dayB reading focus] */
  const W = [
    [1,1,"Constructive and Destructive","S5E1.a","Sand, water and slope","What builds up, what wears down"],
    [2,1,"Weathering and Erosion","S5E1.a","Freeze-thaw in a bottle","How rock becomes soil"],
    [3,1,"Deposition and Deltas","S5E1.a","Building a delta in a tray","Why rivers drop what they carry"],
    [4,1,"Dunes, Canyons, Volcanoes","S5E1.a","Wind table and dune shapes","Reading four landforms"],
    [5,2,"Modelling the Processes","S5E1.b","Stream table, run one","Why scientists build models"],
    [6,2,"Measuring Change","S5E1.b","Stream table with data table","Turning observation into numbers"],
    [7,2,"Dams, Levees, Storm Drains","S5E1.c","Levee test and failure point","What engineering can hold back"],
    [8,2,"Georgia's Coast","S5E1.c","Beach reclamation model","Barrier islands and hard choices"],
    [9,3,"Why Group at All","S5L1","Sorting a box of objects","Grouping that carries information"],
    [10,3,"The Big Groups","S5L1","Sorting organism cards","Kingdoms down to species"],
    [11,3,"Vertebrate and Invertebrate","S5L1","Skeleton hunt and sort","Backbones and what follows"],
    [12,3,"Building a Key","S5L1","Write a dichotomous key","Keys a stranger can use"],
    [13,4,"Traits You Were Given","S5L2","Family trait survey","Inherited means handed down"],
    [14,4,"Behaviours You Learned","S5L2","Pet or sibling observation","Learned means acquired"],
    [15,4,"Telling Them Apart","S5L2","Sorting twenty examples","The test that distinguishes"],
    [16,4,"Parents and Offspring","S5L2","Seed variation count","Predicting what offspring show"],
    [17,5,"Using a Magnifier","S5L3","Onion skin, first slide","Seeing what is actually there"],
    [18,5,"Plant Cells","S5L3","Elodea and cell wall","The parts of a plant cell"],
    [19,5,"Animal Cells","S5L3","Cheek cell slide","The parts of an animal cell"],
    [20,5,"One Cell or Many","S5L3","Pond water hunt","Single-celled and multicellular"],
    [21,6,"Microbes That Help","S5L4","Yeast and warm water","Bread, yogurt, digestion"],
    [22,6,"Microbes That Harm","S5L4","Bread mould, sealed","Spoilage and illness"],
    [23,6,"Arguing From Evidence","S5L4","Handwashing comparison","Claim, evidence, reasoning"],
    [24,7,"Physical Change","S5P1.a","Mixing and separating","Change you can undo"],
    [25,7,"Separating Mixtures","S5P1.a","Filter, magnet, evaporate","Getting it back out"],
    [26,7,"States of Water","S5P1.b","Melting and freezing curve","Temperature moves particles"],
    [27,7,"Evaporation and Condensation","S5P1.b","Cold glass and a lid","Where the water went"],
    [28,7,"Chemical Change","S5P1.c","Five reaction stations","Five kinds of evidence"],
    [29,8,"Static Electricity","S5P2.a","Balloons and pepper","Electricity nobody harnessed"],
    [30,8,"The Complete Circuit","S5P2.b","Bulb, battery, wire","Why the loop must close"],
    [31,8,"Switches and Series","S5P2.b","Adding a switch","Controlling the flow"],
    [32,8,"Conductors and Insulators","S5P2.c","Testing twenty materials","What lets current through"],
    [33,9,"Permanent Magnets","S5P3.b","Poles, attraction, repulsion","Fields you can map"],
    [34,9,"Mapping a Field","S5P3.b","Iron filings and compass","The shape of the pull"],
    [35,9,"Building an Electromagnet","S5P3.a","Nail, wire, battery","Electricity making magnetism"],
    [36,9,"Stronger and Weaker","S5P3.a","Three variables tested","What the year proved"]
  ];

  const DAYS = ["W"];
  const DAY_NAME = {W:"Science"};

  const WEEKS = W.map(r=>({
    n:r[0], unit:r[1], title:r[2], standard:r[3], labFocus:r[4], readFocus:r[5],
    days:[{day:"W", kind:"weekly", label:"Science"}]
  }));

  const unitOf = wk => UNITS[(WEEKS.find(w=>w.n===wk)||{unit:1}).unit - 1];

  const STANDARDS = [
    {tag:"S5E1.a", text:"Argue from evidence whether a feature was caused by constructive and/or destructive processes.", weeks:"1–4"},
    {tag:"S5E1.b", text:"Build simple models and collect data showing how those processes change the surface.", weeks:"5, 6"},
    {tag:"S5E1.c", text:"Ask questions about how technology limits or predicts those processes.", weeks:"7, 8"},
    {tag:"S5L1",   text:"Group organisms using scientific classification procedures; explain how and why groups were made.", weeks:"9–12"},
    {tag:"S5L2",   text:"Distinguish inherited traits from learned behaviours; discuss offspring traits from parents.", weeks:"13–16"},
    {tag:"S5L3",   text:"Use magnifiers to observe cells; identify and compare plant and animal cell parts; single-celled vs. multicellular.", weeks:"17–20"},
    {tag:"S5L4",   text:"Argue from evidence how microorganisms can be beneficial or harmful.", weeks:"21–23"},
    {tag:"S5P1.a", text:"Investigate physical changes by mixing, separating and manipulating dry and liquid materials.", weeks:"24, 25"},
    {tag:"S5P1.b", text:"Argue that changes in the state of water are due to temperature moving unseen particles.", weeks:"26, 27"},
    {tag:"S5P1.c", text:"Investigate whether a chemical change occurred using evidence: colour, gas, temperature, odour, new substance.", weeks:"28"},
    {tag:"S5P2.a", text:"Explain the difference between naturally occurring and human-harnessed electricity.", weeks:"29"},
    {tag:"S5P2.b", text:"Design a complete simple circuit and name the necessary parts.", weeks:"30, 31"},
    {tag:"S5P2.c", text:"Test common materials as conductors or insulators.", weeks:"32"},
    {tag:"S5P3.a", text:"Argue from experiments how an electromagnet differs from a permanent magnet.", weeks:"35, 36"},
    {tag:"S5P3.b", text:"Investigate how a magnetic field interacts with a magnetic object.", weeks:"33, 34"},
    {tag:"Practices", text:"Ask questions, plan investigations, keep unaltered records, separate observation from opinion, use measurement and graphs, work safely, communicate findings.", weeks:"every week"},
    {tag:"GA numeracy", text:"Convert fractions to decimals in calculations; compare numerical values when describing objects.", weeks:"6, 16, 32, 36"}
  ];

  /* Blueprint check, exposed so the parent view can show it rather than assert it. */
  function strandWeeks(){
    const out={Earth:0, Life:0, Physical:0};
    WEEKS.forEach(w=>{ out[UNITS[w.unit-1].strand]++; });
    return out;
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.SCI_Y5 = Object.assign(window.__CURR.SCI_Y5||{}, {
    UNITS, WEEKS, STANDARDS, DAYS, DAY_NAME, unitOf, strandWeeks,
    GRADE:{label:"5th Grade Science", short:"5th", set:"Georgia Standards of Excellence"}
  });
})();
