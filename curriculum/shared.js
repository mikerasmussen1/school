/* Shared teaching framework — tiers, gates, bands, weekly rhythm, helpers.
// Used by every curriculum. Edits here affect all subjects.
   Plain script, loaded before the app. Exports onto window.__CURR. */
(function(){
window.__CURR = window.__CURR || {};

const TIERS = [
  {name:"Warm-Up",icon:"✦",color:"#4ADE80",meta:"6 items · 5 minutes",desc:"Facts you already own, kept sharp. If this takes more than five minutes, stop and tell your teacher."},
  {name:"Core",icon:"◆",color:"#38BDF8",meta:"5 items · grade level +1",desc:"The new skill, one year ahead of grade. Show your work — the drawing counts as much as the answer."},
  {name:"Challenge",icon:"★",color:"#FBBF24",meta:"2–3 items · no ceiling",desc:"Puzzles and proofs. You are not expected to finish these on the first try. Getting stuck here is the point."}
];

const GATES = [
  {when:"Day 1 of the unit",color:"#4ADE80",name:"Pre-assessment",desc:"12 items across the unit's five strands. Anything already mastered gets removed from the calendar before the unit starts.",rule:"2/2 in a strand → compact it"},
  {when:"Every Friday",color:"#38BDF8",name:"Weekly check",desc:"Five items from the week, mixed tiers. Not graded for a report card — graded to decide what Monday looks like.",rule:"< 4/5 → reteach Monday"},
  {when:"End of week 3",color:"#FBBF24",name:"Mid-unit quiz",desc:"Eight items covering Weeks 1–3. Catches a shaky area model before it becomes a shaky algorithm.",rule:"85% to advance"},
  {when:"End of week 5",color:"#F472B6",name:"Unit test",desc:"Twelve items plus one 'explain your thinking' question scored on reasoning. Trophy band and badge awarded here.",rule:"85% earns the badge"}
];

// Four-week missions reuse the gates with the badge gate moved a week earlier.
const GATES_SHORT = GATES.map(g=> g.when==="End of week 5" ? {...g, when:"End of week 4"} : g);
const GATES_LONG  = GATES.map(g=> g.when==="End of week 5" ? {...g, when:"End of week 6"} : g);
// Mission 07 runs three weeks: the quiz lands a week earlier and the test closes week 3.
const GATES_TINY = GATES.map(g=> g.when==="End of week 3" ? {...g, when:"End of week 2", desc:"Eight items covering Weeks 1–2. Catches a shaky measure of centre before the project depends on it."}
  : g.when==="End of week 5" ? {...g, when:"End of week 3"} : g);

const BANDS = [
  {range:"85–100%",name:"Mission Commander",color:"#FBBF24",desc:"Badge earned. Move to Mission 02 and take the Challenge tier as your new Core.",bg:"rgba(251,191,36,.13)",bd:"rgba(251,191,36,.4)"},
  {range:"70–84%",name:"Flight Engineer",color:"#38BDF8",desc:"Close. Reteach only the flagged items — two days, not two weeks — then retake those items.",bg:"rgba(56,189,248,.11)",bd:"rgba(56,189,248,.32)"},
  {range:"Below 70%",name:"Ground Crew",color:"#A78BFA",desc:"The model didn't land. Rebuild Week 1 with physical blocks before touching the algorithm again.",bg:"rgba(167,139,250,.11)",bd:"rgba(167,139,250,.32)"}
];

const RHYTHM = [
  {day:"Mon",color:"#4ADE80",role:"Teach the new idea",blocks:[{min:"0–5",what:"Warm-Up tier, timed loosely"},{min:"5–20",what:"Direct teach with manipulatives"},{min:"20–40",what:"Core tier together, then alone"},{min:"40–45",what:"Error journal"}]},
  {day:"Tue",color:"#38BDF8",role:"Practise it",blocks:[{min:"0–5",what:"Warm-Up tier"},{min:"5–15",what:"Re-teach yesterday's snag"},{min:"15–38",what:"Core tier independent"},{min:"38–45",what:"Challenge tier, start only"}]},
  {day:"Wed",color:"#A78BFA",role:"Go deeper",blocks:[{min:"0–5",what:"Warm-Up tier"},{min:"5–15",what:"Fluency game"},{min:"15–45",what:"Challenge tier — this is the main event"}]},
  {day:"Thu",color:"#F472B6",role:"Apply it",blocks:[{min:"0–5",what:"Warm-Up tier"},{min:"5–30",what:"Core + project work"},{min:"30–45",what:"Talk through the Big Question"}]},
  {day:"Fri",color:"#FBBF24",role:"Prove it & play",blocks:[{min:"0–15",what:"Weekly check, 5 items"},{min:"15–25",what:"Score it together, out loud"},{min:"25–45",what:"Enrichment day / games"}]}
];

const ASSESS = [
  {tag:"Unit day 1",color:"#4ADE80",name:"Pre-assessment + skip chart",desc:"Twelve items, five strands. Mark each strand mastered / partial / new, then cross the mastered weeks off the plan."},
  {tag:"Fridays",color:"#38BDF8",name:"Weekly check",desc:"Five items. Score it with him in the room and say the reasoning out loud — this is instruction, not testing."},
  {tag:"Week 3",color:"#FBBF24",name:"Mid-unit quiz",desc:"Eight items. Below 85% means two targeted days, then a retake of only the missed items."},
  {tag:"Week 5",color:"#F472B6",name:"Unit test + explanation",desc:"Twelve items plus one written explanation. The explanation is half the grade and is scored on reasoning, not handwriting."}
];

const COMPACT = [
  {score:"2 / 2",color:"#4ADE80",action:"Strand mastered — skip those lessons. Keep the enrichment day and the project."},
  {score:"1 / 2",color:"#FBBF24",action:"Partial — teach it in one compressed day, then jump to the Challenge tier."},
  {score:"0 / 2",color:"#F472B6",action:"New material — run the full week as written."},
  {score:"12 / 12",color:"#38BDF8",action:"Whole unit compacted. Do the project and the Challenge tier only, then move to Mission 02 in week 2."}
];

const WATCHOUTS = [
  {name:"Perfectionism",icon:"◎",color:"#F472B6",looks:"He erases until the paper tears, refuses to write anything he isn't sure of, or quits a Challenge problem within thirty seconds because he can't see the whole path.",
   fix:"Make the Challenge tier explicitly ungraded and expect blank spots. Ask for a wrong first attempt on purpose — 'give me a bad guess we can improve.' Praise the crossed-out work as evidence.",
   script:"I want to see the messy version. Neat comes second."},
  {name:"Boredom in disguise",icon:"◇",color:"#38BDF8",looks:"Careless arithmetic on work he clearly understands, silly answers, dawdling. This reads as sloppiness but is almost always an under-challenge signal.",
   fix:"Do not respond with more of the same problems. Cut the Core tier in half and move him up a tier. If accuracy returns immediately, the problem was difficulty, not attention.",
   script:"You're rushing because this is too easy. Let's go find something harder."},
  {name:"Asynchrony",icon:"◐",color:"#A78BFA",looks:"He reasons about primes like a twelve-year-old and then falls apart over a smudged pencil line or a lost eraser. His maths age and his emotional age are not the same age.",
   fix:"Scribe for him when writing is the bottleneck, not the maths. Accept oral answers on Challenge problems. Keep the session at 45 minutes even on a great day — stop while it's still fun.",
   script:"Your thinking is way ahead of your hands right now. That's normal. I'll write."},
  {name:"Fear of the ceiling",icon:"◈",color:"#4ADE80",looks:"After a year of acing everything, the first genuinely hard problem can feel like evidence that he's 'not smart anymore.' Watch for tears at exactly the point the work gets good.",
   fix:"Name the 70–80% target out loud before the unit starts. Tell him missing two or three is the design, not the failure. Keep a visible list of problems he beat after being stuck.",
   script:"Being stuck is your brain growing. You're supposed to miss some — that's how we know it's the right level."}
];

const PRAISE = [
  {good:"You broke that into rooms before you started. That's a strategy.",bad:"You're so smart!"},
  {good:"You stayed on that for eleven minutes. That's the part that matters.",bad:"That was fast!"},
  {good:"Your error journal caught the same mistake twice — nice pattern spotting.",bad:"Careful, you made a silly mistake."},
  {good:"Tell me the part that's confusing. That's the interesting bit.",bad:"It's easy, just try again."}
];

const mkWeek = (n,title,gate,gateColor,isFull,summary,days) => ({n,title,gate,gateColor,isFull,summary,
  days:days.map(d=>({day:d[0],title:d[1],detail:d[2],tiers:d[3]||[0,1,2]}))});
const GATE_FULL=["Full worksheets","#4ADE80"], GATE_OUT=["Outlined","#38BDF8"],
      GATE_QUIZ=["Quiz Friday","#FBBF24"], GATE_TEST=["Unit test","#F472B6"];

const q=(t,q,a,hint)=>hint?{t,q,a,hint}:{t,q,a};
Object.assign(window.__CURR, {TIERS, GATES, GATES_SHORT, GATES_LONG, GATES_TINY, BANDS, RHYTHM, ASSESS, COMPACT, WATCHOUTS, PRAISE, mkWeek, GATE_FULL, q, GATE_OUT, GATE_QUIZ, GATE_TEST});
})();
