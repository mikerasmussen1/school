/* ============================================================================
 * MATH · YEAR TWO · MISSION 02 — Big Multiplication · Weeks 2–4
 * ----------------------------------------------------------------------------
 * Hand-authored daily lessons for 5th Grade. Same rules as the Week 1 sets:
 * one idea per day, numbers taken from that day's questions, the trap named.
 * Pictures teach — place-value shifts, area-model rooms, the algorithm with
 * one line lit, number lines that show where an estimate lands.
 *
 * Merges into LESSONS_AUTHORED; beats the generated floor.
 * ==========================================================================*/
(function(){
const A="#FBBF24", G="#4ADE80", P="#F472B6", R="#FB7185";
const L={

/* ── WEEK 2 · longer, not harder ──────────────────────────────────────────── */

y5u2w2p1:{title:"Multiples of Ten First",sub:"Week 2 · the small fact, then the zeros",steps:[
  {cap:"40 × 60. Ignore the zeros for a moment: 4 × 6 = 24. That is the fact. Everything else is place value.",cols:[{l:"6",s:6}],rows:[{l:"4",s:4}],cells:[{v:"24"}],sum:"4 × 6 = 24"},
  {cap:"Now put the zeros back. 40 is 4 tens; 60 is 6 tens. Tens times tens are hundreds — so 24 hundreds.",fig:{k:"pv",places:["ten-thousands","thousands","hundreds","tens","ones"],rows:[{d:["","","","2","4"],l:"4 × 6"},{d:["","2","4","0","0"],l:"40 × 60"}],shift:{by:2,dir:"L",l:"one zero from 40, one from 60"}},sum:"40 × 60 = 2400"},
  {cap:"Count the zeros in the question. 400 × 70: two zeros and one zero — three altogether. 4 × 7 = 28, then three zeros: 28,000.",fig:{k:"pv",places:["ten-thousands","thousands","hundreds","tens","ones"],rows:[{d:["","","","2","8"],l:"4 × 7"},{d:["2","8","0","0","0"],l:"400 × 70"}],shift:{by:3,dir:"L",l:"3 zeros in the question → 3 zeros on"}},sum:"400 × 70 = 28,000"},
  {cap:"Here is the one that catches people. 50 × 50. The fact is 5 × 5 = 25, and the question has two zeros. So 2,500 — the fact already had no zero to add.",fig:{k:"col",lines:["  50","× 50"],res:["2500"],hl:[[2,2],[2,3]],notes:["5 × 5 = 25, then two zeros"]},sum:"50 × 50 = 2500"},
  {cap:"But 250 × 40. The fact is 25 × 4 = 100 — and that fact ENDS in zeros of its own. Keep them. Then add the two from the question: 10,000.",fig:{k:"pv",places:["ten-thousands","thousands","hundreds","tens","ones"],rows:[{d:["","","1","0","0"],l:"25 × 4"},{d:["1","0","0","0","0"],l:"250 × 40"}],shift:{by:2,dir:"L"}},sum:"250 × 40 = 10,000"},
  {cap:"2500 × 400. Fact: 25 × 4 = 100. Question zeros: two and two, four. One million.",fig:{k:"pv",places:["millions","hundred-th","ten-th","thousands","hundreds","tens","ones"],rows:[{d:["","","","","1","0","0"],l:"25 × 4"},{d:["1","0","0","0","0","0","0"],l:"×10⁴"}],shift:{by:4,dir:"L"}},sum:"2500 × 400 = 1,000,000"},
  {cap:"THE TRAP. Dropping a zero because the fact made one. 250 × 40 is not 1,000. Do the fact with ALL its digits, then bolt on exactly the zeros the question had.",fig:{k:"col",lines:[" 250","× 40"],res:["10000"],hl:[[2,2],[2,3],[2,4]],notes:["100 from the fact + 00 from the question"]}}
]},

y5u2w2p2:{title:"Estimate, Then Compute",sub:"Week 2 · say the size before you start",steps:[
  {cap:"412 × 19. Before touching it: 412 is about 400, 19 is about 20. 400 × 20 = 8,000. That is where the answer should land.",fig:{k:"nl",min:0,max:10000,step:1000,marks:[{v:8000,l:"≈ 8000",c:A}]},sum:"412 × 19 ≈ 400 × 20 = 8000"},
  {cap:"Now compute. Two rooms: 412 × 10 = 4,120 and 412 × 9 = 3,708. Total 7,828.",cols:[{l:"412",s:24}],rows:[{l:"10",s:10},{l:"9",s:9}],cells:[{v:"4120"},{v:"3708"}],sum:"4120 + 3708 = 7828"},
  {cap:"7,828 sits just under 8,000 — exactly where it should, since we rounded 19 UP to 20. Believe it.",fig:{k:"nl",min:7000,max:9000,step:200,marks:[{v:8000,l:"estimate",c:A},{v:7828,l:"7828",up:18}]},sum:"412 × 19 = 7828 ✓"},
  {cap:"289 × 31. Round: 300 × 30 = 9,000. Compute: 289 × 30 = 8,670 and 289 × 1 = 289. Total 8,959.",cols:[{l:"289",s:24}],rows:[{l:"30",s:15},{l:"1",s:3}],cells:[{v:"8670"},{v:"289"}],sum:"≈ 9000 · exactly 8959"},
  {cap:"197 × 203. Both are within 3 of 200, so 200 × 200 = 40,000, and the real answer is within a few hundred of that. You do not always need the exact number.",fig:{k:"nl",min:30000,max:50000,step:5000,marks:[{v:40000,l:"≈ 40,000",c:A}]},sum:"197 × 203 ≈ 40,000"},
  {cap:"Now the payoff. Someone says 34 × 26 = 68. Estimate: 30 × 30 = 900. Is 68 anywhere near 900? They added instead of multiplying. Real answer: 884.",fig:{k:"nl",min:0,max:1000,step:100,marks:[{v:68,l:"68?",c:R},{v:900,l:"≈ 900",c:A},{v:884,l:"884",up:18,c:G}]},sum:"34 × 26 = 884"},
  {cap:"THE TRAP. Estimating AFTER. Once you have an answer you will talk yourself into it. Round · predict · compute · compare, in that order, every time.",fig:{k:"nl",min:0,max:10000,step:1000,marks:[{v:8000,l:"predict first",c:A}]}}
]},

y5u2w2p3:{title:"Four Digits by Two",sub:"Week 2 · longer, not harder",steps:[
  {cap:"1234 × 12. Before anything: 1000 × 10 = 10,000 and a bit more. Somewhere around 12,000 to 15,000.",fig:{k:"nl",min:0,max:20000,step:5000,marks:[{v:12000,l:"≈ 12,000+",c:A}]}},
  {cap:"The rectangle is longer — four columns instead of three — but the rule is the same. Cut at the places: 1000, 200, 30, 4. Two rows: 10 and 2.",cols:[{l:"1000",s:20},{l:"200",s:8},{l:"30",s:4},{l:"4",s:3}],rows:[{l:"10",s:10},{l:"2",s:3}],cells:[{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}]},
  {cap:"The 10-row is easy: 1234 × 10 = 12,340. Every room gets a zero.",cols:[{l:"1000",s:20},{l:"200",s:8},{l:"30",s:4},{l:"4",s:3}],rows:[{l:"10",s:10},{l:"2",s:3}],cells:[{v:"10000"},{v:"2000"},{v:"300"},{v:"40"},{v:""},{v:""},{v:""},{v:""}],sum:"1234 × 10 = 12,340"},
  {cap:"The 2-row: 2000, 400, 60, 8. That is 2,468.",cols:[{l:"1000",s:20},{l:"200",s:8},{l:"30",s:4},{l:"4",s:3}],rows:[{l:"10",s:10},{l:"2",s:3}],cells:[{v:"10000"},{v:"2000"},{v:"300"},{v:"40"},{v:"2000"},{v:"400"},{v:"60"},{v:"8"}],sum:"1234 × 2 = 2468"},
  {cap:"The algorithm is just those two rows, one under the other. 2468 then 12340. Add: 14,808. In the estimate's range.",fig:{k:"col",lines:[" 1234","×  12"],res:[" 2468","12340","14808"],hl:[[4,0],[4,1],[4,2],[4,3],[4,4]]},sum:"1234 × 12 = 14,808"},
  {cap:"2450 × 36. Estimate 2500 × 40 = 100,000 — a bit less. 2450 × 6 = 14,700. 2450 × 30 = 73,500. Total 88,200. Same two lines; the numbers are just longer.",fig:{k:"col",lines:[" 2450","×  36"],res:["14700","73500","88200"]},sum:"2450 × 36 = 88,200"},
  {cap:"THE TRAP. Losing the place of the second line. The 30-row must start one place LEFT — write its 0 first. 73500, not 7350. If you drop it the estimate will scream at you: 22,050 is nowhere near 100,000.",fig:{k:"col",lines:[" 2450","×  36"],res:["14700","73500"],hl:[[3,4]],notes:["that 0 is the whole point of the row"]}}
]},

y5u2w2p4:{title:"Catch the Error",sub:"Week 2 · find the line that went wrong",steps:[
  {cap:"Someone got 23 × 14 = 92. Here is their work. What is missing?",fig:{k:"col",lines:["  23","× 14"],res:["  92"],notes:["only one line under the bar"]}},
  {cap:"They did 23 × 4 = 92 and stopped. The 23 × 10 = 230 line never happened. Two-digit multiplier, two lines — always.",fig:{k:"col",lines:["  23","× 14"],res:["  92"," 230"," 322"],hl:[[3,1],[3,2],[3,3]],notes:["missing partial: 230"]},sum:"23 × 14 = 92 + 230 = 322"},
  {cap:"In rooms: they built the bottom row and forgot the top. Half the rectangle.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"200 + 30 is the forgotten half"},
  {cap:"Someone got 45 × 23 = 135. Same mistake: 45 × 3 = 135, then nothing. The 45 × 20 = 900 line is missing. Real answer 1,035.",fig:{k:"col",lines:["  45","× 23"],res:[" 135"," 900","1035"],hl:[[3,1],[3,2],[3,3]]},sum:"45 × 23 = 1035"},
  {cap:"A subtler one. 56 × 27, second row written as 112. What should it be? 56 × 20, not 56 × 2 — so 1,120. They forgot the zero that shifts the row left.",fig:{k:"col",lines:["  56","× 27"],res:[" 392"," 112"],hl:[[3,1],[3,2],[3,3]],notes:["112 should be 1120"]}},
  {cap:"Fix it: 392 + 1120 = 1,512. The estimate would have caught this too — 60 × 30 = 1,800, and 504 is not close.",fig:{k:"col",lines:["  56","× 27"],res:[" 392","1120","1512"],hl:[[3,0]]},sum:"56 × 27 = 1512"},
  {cap:"THE TRAP. Marking the final answer instead of the lines. A wrong answer has a wrong LINE. Find the line; that is where the learning is. 237 × 45 = 1,185 is missing 237 × 40 = 9,480.",fig:{k:"col",lines:[" 237","× 45"],res:["1185","9480","10665"],hl:[[3,0],[3,1],[3,2],[3,3]]},sum:"237 × 45 = 10,665"}
]},

y5u2w2p5:{title:"Mid-Unit Quiz",sub:"Friday · two weeks, three ideas",steps:[
  {cap:"Nothing new today. Three ideas — if one wobbles, that is the lesson to reopen.",fig:{k:"col",lines:["  23","× 14"],res:["  92"," 230"," 322"]}},
  {cap:"ONE: multiples of ten. Do the fact, then bolt on exactly the zeros the question had. 40 × 60: 4 × 6 = 24, two zeros, 2,400.",fig:{k:"pv",places:["thousands","hundreds","tens","ones"],rows:[{d:["","","2","4"],l:"4 × 6"},{d:["2","4","0","0"],l:"40 × 60"}],shift:{by:2,dir:"L"}},sum:"40 × 60 = 2400"},
  {cap:"TWO: the algorithm is rows of rooms. A two-digit multiplier means two lines, the second shifted left.",cols:[{l:"200",s:20},{l:"30",s:6},{l:"7",s:3}],rows:[{l:"40",s:10},{l:"5",s:3}],cells:[{v:"8000"},{v:"1200"},{v:"280"},{v:"1000"},{v:"150"},{v:"35"}],sum:"237 × 45 = 9480 + 1185 = 10,665"},
  {cap:"THREE: estimate first. 412 × 19 ≈ 400 × 20 = 8,000; 508 × 21 ≈ 500 × 20 = 10,000.",fig:{k:"nl",min:0,max:12000,step:2000,marks:[{v:8000,l:"412 × 19",c:A},{v:10000,l:"508 × 21",c:G}]}},
  {cap:"And longer numbers are not harder. 1234 × 12: two lines, add, done.",fig:{k:"col",lines:[" 1234","×  12"],res:[" 2468","12340","14808"]},sum:"1234 × 12 = 14,808"}
]},

/* ── WEEK 3 · the estimate is the answer's size ───────────────────────────── */

y5u2w3p1:{title:"Round to Estimate",sub:"Week 3 · which way to round, and what it costs",steps:[
  {cap:"Rounding means sliding to the nearest friendly number. 47 sits between 40 and 50, closer to 50.",fig:{k:"nl",min:40,max:50,step:1,marks:[{v:47,l:"47"},{v:50,l:"→ 50",c:G}],span:[45,50]},sum:"47 rounds to 50"},
  {cap:"19 × 21. Round each to the nearest ten: 20 and 20. Estimate 400.",fig:{k:"nl",min:15,max:25,step:1,marks:[{v:19,l:"19"},{v:21,l:"21"},{v:20,l:"20",c:A,up:18}]},sum:"19 × 21 ≈ 20 × 20 = 400"},
  {cap:"62 × 18. 62 → 60, 18 → 20. Estimate 1,200. The true answer is 1,116 — close.",fig:{k:"nl",min:0,max:2000,step:250,marks:[{v:1200,l:"≈ 1200",c:A},{v:1116,l:"1116",up:18}]},sum:"62 × 18 ≈ 60 × 20 = 1200"},
  {cap:"Bigger numbers, bigger rounding. 412 × 19: round 412 to the nearest HUNDRED, 400. 5,120 × 48: nearest thousand, 5,000, and 48 → 50. 250,000.",fig:{k:"nl",min:0,max:300000,step:50000,marks:[{v:250000,l:"≈ 250,000",c:A}]},sum:"5120 × 48 ≈ 5000 × 50 = 250,000"},
  {cap:"Rounding has a cost. 48 × 52 → 50 × 50 = 2,500. True: 2,496. Cost: 4. Tiny, because each number moved only 2.",fig:{k:"nl",min:2490,max:2510,step:2,marks:[{v:2500,l:"estimate",c:A},{v:2496,l:"2496",up:18}]},sum:"off by 4"},
  {cap:"But 2,450 × 36 → 2,000 × 40 = 80,000 moved 2,450 a long way. Round to 2,500 × 40 = 100,000 instead — the halfway number is a friendly number too.",fig:{k:"nl",min:0,max:120000,step:20000,marks:[{v:80000,l:"2000×40",c:R},{v:100000,l:"2500×40",c:A},{v:88200,l:"88,200",up:18,c:G}]},sum:"2450 × 36 = 88,200"},
  {cap:"THE TRAP. Rounding one number and not the other. 39 × 11 → 40 × 11 is still hard. Round BOTH: 40 × 10 = 400. Then it is a fact you know.",fig:{k:"nl",min:0,max:500,step:100,marks:[{v:400,l:"40 × 10",c:A},{v:429,l:"429",up:18}]},sum:"39 × 11 ≈ 400 · exactly 429"}
]},

y5u2w3p2:{title:"Over or Under",sub:"Week 3 · know which side your estimate is on",steps:[
  {cap:"412 × 19 as 400 × 20. You rounded 412 DOWN and 19 UP. The true answer, 7,828, came out under the estimate. Why?",fig:{k:"nl",min:7000,max:9000,step:250,marks:[{v:8000,l:"8000",c:A},{v:7828,l:"7828",up:18}]}},
  {cap:"Look at it as rooms. Rounding 19 up to 20 added a whole row of 412. Rounding 412 down to 400 took away a thin column of 20 × 12. The row you added is bigger than the column you lost — so the estimate is OVER.",cols:[{l:"400",s:30},{l:"12",s:3}],rows:[{l:"19",s:19},{l:"1",s:2}],cells:[{v:"7600"},{v:"228"},{v:"400"},{v:"strip"}],strip:true,sum:"+400 added · −228 lost → over"},
  {cap:"Round BOTH up and you must be over. 19 × 21 → 20 × 21? No — 19 → 20 (up), 21 → 20 (down). 399 vs 400: over by 1, because the up-move was on the bigger number's partner.",fig:{k:"nl",min:390,max:410,step:2,marks:[{v:400,l:"400",c:A},{v:399,l:"399",up:18}]},sum:"19 × 21 = 399 — estimate over"},
  {cap:"Round both DOWN and you must be under. 63 × 48 → 60 × 50? That is down and up. Try 63 × 48 → 60 × 48 = 2,880 — down only, so definitely under 3,024.",cols:[{l:"60",s:60},{l:"3",s:3}],rows:[{l:"48",s:24}],cells:[{v:"2880"},{v:"144"}],sum:"60 × 48 = 2880 < 3024"},
  {cap:"78 × 22 → 80 × 20. Up on 78 (adds 2 × 22 = 44), down on 22 (loses 2 × 80 = 160). Lost more than gained — so this estimate is UNDER. True: 1,716 > 1,600.",cols:[{l:"78",s:39},{l:"2",s:2}],rows:[{l:"20",s:10},{l:"2",s:2}],cells:[{v:"1560"},{v:"40"},{v:"156"},{v:"4"}],sum:"1600 estimate · 1716 true → under"},
  {cap:"Why care? If your estimate is OVER and your answer comes out ABOVE it, something is wrong. Direction turns a rough check into a sharp one.",fig:{k:"nl",min:7000,max:9000,step:250,marks:[{v:8000,l:"over-estimate",c:A},{v:8300,l:"8300? ✗",up:18,c:R},{v:7828,l:"7828 ✓",up:18,c:G}]}},
  {cap:"THE TRAP. Saying 'over' because you rounded one number up. It is a tug-of-war between both moves. Both up: over. Both down: under. One each: work out which move was bigger.",cols:[{l:"400",s:30},{l:"12",s:3}],rows:[{l:"19",s:19},{l:"1",s:2}],cells:[{v:"7600"},{v:"228"},{v:"400"},{v:"strip"}],strip:true}
]},

y5u2w3p3:{title:"Order of Magnitude",sub:"Week 3 · hundreds, thousands or ten-thousands?",steps:[
  {cap:"3 × 4 = 12. Every one of today's questions is that fact wearing zeros.",cols:[{l:"4",s:4}],rows:[{l:"3",s:3}],cells:[{v:"12"}],sum:"3 × 4 = 12"},
  {cap:"30 × 4 = 120. 30 × 40 = 1,200. 300 × 40 = 12,000. 300 × 400 = 120,000. Each extra zero slides the 12 one place left.",fig:{k:"pv",places:["hundred-th","ten-th","thousands","hundreds","tens","ones"],rows:[{d:["","","","","1","2"],l:"3 × 4"},{d:["","","","1","2","0"],l:"30 × 4"},{d:["","","1","2","0","0"],l:"30 × 40"},{d:["","1","2","0","0","0"],l:"300 × 40"},{d:["1","2","0","0","0","0"],l:"300 × 400"}]}},
  {cap:"So before you compute, ask: what SIZE is the answer? 34 × 26 is about 30 × 30 = 900 — hundreds. Three digits.",fig:{k:"nl",min:0,max:1000,step:100,marks:[{v:900,l:"hundreds",c:A}]},sum:"34 × 26 → 3 digits"},
  {cap:"340 × 26 is ten times bigger: about 9,000 — thousands, four digits. 3,400 × 26: about 90,000, five digits.",fig:{k:"pv",places:["ten-th","thousands","hundreds","tens","ones"],rows:[{d:["","","8","8","4"],l:"34 × 26"},{d:["","8","8","4","0"],l:"340 × 26"},{d:["8","8","4","0","0"],l:"3400 × 26"}]},sum:"884 · 8,840 · 88,400"},
  {cap:"Now the check that takes two seconds. Someone says 237 × 45 = 1,185. Size: 200 × 50 = 10,000, five digits. 1,185 has four. Wrong before you read a single line.",fig:{k:"nl",min:0,max:12000,step:2000,marks:[{v:1185,l:"1185? ✗",c:R},{v:10000,l:"≈ 10,000",c:A},{v:10665,l:"10,665",up:18,c:G}]},sum:"237 × 45 = 10,665"},
  {cap:"THE TRAP. Counting zeros in the answer instead of the size. 25 × 4 = 100 has two zeros and three digits; 30 × 40 = 1,200 has two zeros and four digits. Zeros are not size. Digits are.",fig:{k:"col",lines:[" 100","1200"],res:[],notes:["same zeros · different size"]}}
]},

y5u2w3p4:{title:"Mark Somebody's Work",sub:"Week 3 · six answers, three wrong",steps:[
  {cap:"Six worked answers. Three are wrong. You are the marker — and the tool is estimation, not re-doing every sum.",fig:{k:"col",lines:["23 × 14 = 322","45 × 23 = 135","31 × 22 = 682"],res:[]}},
  {cap:"23 × 14 = 322. Size: 20 × 15 = 300. Fits. Tick.",fig:{k:"nl",min:0,max:500,step:100,marks:[{v:300,l:"≈ 300",c:A},{v:322,l:"322 ✓",up:18,c:G}]}},
  {cap:"45 × 23 = 135. Size: 50 × 20 = 1,000. 135 is a tenth of that — only one line was done. The missing partial product is 45 × 20 = 900.",fig:{k:"col",lines:["  45","× 23"],res:[" 135"," 900","1035"],hl:[[3,1],[3,2],[3,3]],notes:["missing 900"]},sum:"45 × 23 = 1035 ✗ marked"},
  {cap:"56 × 27 with the second row as 112. Size check: 60 × 30 = 1,800. 392 + 112 = 504. Too small. The second row should be 56 × 20 = 1,120, not 56 × 2.",fig:{k:"col",lines:["  56","× 27"],res:[" 392","1120","1512"],hl:[[3,0]]},sum:"1512 — the wrong answer was out by 1008"},
  {cap:"237 × 45 = 1,185. Size: 10,000. Four digits given, five expected. Missing 237 × 40 = 9,480.",fig:{k:"col",lines:[" 237","× 45"],res:["1185","9480","10665"],hl:[[3,0],[3,1],[3,2],[3,3]]},sum:"237 × 45 = 10,665"},
  {cap:"78 × 46 = 3,588 and 94 × 68 = 6,392. Sizes: 80 × 50 = 4,000 and 90 × 70 = 6,300. Both fit. Both tick — without redoing them.",fig:{k:"nl",min:3000,max:7000,step:500,marks:[{v:4000,l:"≈ 4000",c:A},{v:3588,l:"3588 ✓",up:18,c:G},{v:6300,l:"≈ 6300",c:A},{v:6392,l:"6392 ✓",up:18,c:G}]}},
  {cap:"THE TRAP. Marking by redoing. A marker who recomputes everything is slow and makes their own mistakes. Size first. Only open the lines of the ones that fail the size test.",fig:{k:"col",lines:["23 × 14 = 322 ✓","45 × 23 = 135 ✗","31 × 22 = 682 ✓"],res:[]}}
]},

y5u2w3p5:{title:"Stadium Count Begins",sub:"Friday · estimate from the photo first",steps:[
  {cap:"The Stadium Count. One section: 24 seats in a row, 38 rows. Before counting anything — how many seats, roughly?",cols:[{l:"24",s:24}],rows:[{l:"38",s:38}],cells:[{v:"?"}]},
  {cap:"Round: 25 seats, 40 rows. 25 × 40 = 1,000. So a section is about a thousand seats.",cols:[{l:"25",s:25}],rows:[{l:"40",s:40}],cells:[{v:"1000"}],sum:"≈ 25 × 40 = 1000"},
  {cap:"Exactly: 24 × 38. Rooms: 20 × 30 = 600, 4 × 30 = 120, 20 × 8 = 160, 4 × 8 = 32. Total 912. Under 1,000, as it must be — both numbers were rounded up.",cols:[{l:"20",s:20},{l:"4",s:4}],rows:[{l:"30",s:30},{l:"8",s:8}],cells:[{v:"600"},{v:"120"},{v:"160"},{v:"32"}],sum:"24 × 38 = 912"},
  {cap:"The stadium has 16 sections. Estimate: 1,000 × 16 = 16,000.",fig:{k:"nl",min:0,max:20000,step:4000,marks:[{v:16000,l:"≈ 16,000",c:A}]},sum:"1000 × 16 = 16,000"},
  {cap:"Exactly: 912 × 16. 912 × 10 = 9,120; 912 × 6 = 5,472. Total 14,592.",fig:{k:"col",lines:["  912","×  16"],res:[" 5472"," 9120","14592"]},sum:"912 × 16 = 14,592"},
  {cap:"The gap between estimate and truth: 16,000 − 14,592 = 1,408. Nearly a tenth of the stadium. Next week you explain where it went.",fig:{k:"nl",min:14000,max:16500,step:500,marks:[{v:16000,l:"estimate",c:A},{v:14592,l:"14,592",up:18,c:G}],jumps:[{a:14592,b:16000,l:"gap 1408",c:R}]},sum:"gap = 1408"},
  {cap:"Half the stadium — 8 sections — is 912 × 8 = 7,296. Twice that is the whole. Everything in this project is one section, scaled.",fig:{k:"tape",parts:[{v:"7296",l:"8 sections"},{v:"7296",l:"8 sections"}],total:"14,592"}}
]},

/* ── WEEK 4 · count one, scale up, explain the gap ────────────────────────── */

y5u2w4p1:{title:"Count a Section",sub:"Week 4 · build 24 × 38 from easy rows",steps:[
  {cap:"24 seats in a row. Two rows: 48. Ten rows: 240. Each answer is a fact about 24 you can just say.",cols:[{l:"24",s:24}],rows:[{l:"2",s:2}],cells:[{v:"48"}],sum:"24 × 2 = 48 · 24 × 10 = 240"},
  {cap:"Twenty rows is two tens: 480. Thirty rows: 720.",cols:[{l:"24",s:24}],rows:[{l:"10",s:5},{l:"10",s:5},{l:"10",s:5}],cells:[{v:"240"},{v:"240"},{v:"240"}],sum:"24 × 30 = 720"},
  {cap:"38 rows is 30 rows plus 8 rows. 720 + 192 = 912. You built the section from pieces you could say out loud.",cols:[{l:"24",s:24}],rows:[{l:"30",s:15},{l:"8",s:4}],cells:[{v:"720"},{v:"192"}],sum:"24 × 38 = 912"},
  {cap:"A different section: 26 seats, 42 rows. 26 × 40 = 1,040 and 26 × 2 = 52. 1,092.",cols:[{l:"26",s:26}],rows:[{l:"40",s:20},{l:"2",s:2}],cells:[{v:"1040"},{v:"52"}],sum:"26 × 42 = 1092"},
  {cap:"32 × 48. Split the 48: 32 × 40 = 1,280 and 32 × 8 = 256. Total 1,536. Or split the 32 instead — same answer, your choice.",cols:[{l:"32",s:32}],rows:[{l:"40",s:20},{l:"8",s:4}],cells:[{v:"1280"},{v:"256"}],sum:"32 × 48 = 1536"},
  {cap:"Four sections of 912: 3,648. Sixteen sections: four times that, 14,592. Count one, then scale.",fig:{k:"tape",parts:[{v:"3648",l:"4"},{v:"3648",l:"4"},{v:"3648",l:"4"},{v:"3648",l:"4"}],total:"38 × 24 × 16 = 14,592"}},
  {cap:"THE TRAP. Splitting BOTH numbers when one is enough. 24 × 38 as 20/4 × 30/8 is four rooms; as 24 × 30 and 24 × 8 it is two. Fewer rooms, fewer places to slip.",cols:[{l:"24",s:24}],rows:[{l:"30",s:15},{l:"8",s:4}],cells:[{v:"720"},{v:"192"}]}
]},

y5u2w4p2:{title:"Scale It Up",sub:"Week 4 · one section times the number of sections",steps:[
  {cap:"About 900 a section. Ten sections: 9,000. Just the place-value slide.",fig:{k:"pv",places:["ten-th","thousands","hundreds","tens","ones"],rows:[{d:["","","9","0","0"],l:"1 section"},{d:["","9","0","0","0"],l:"10 sections"}],shift:{by:1,dir:"L"}},sum:"900 × 10 = 9000"},
  {cap:"Sixteen sections: ten of them, plus six more. 9,000 + 5,400 = 14,400.",cols:[{l:"900",s:30}],rows:[{l:"10",s:10},{l:"6",s:6}],cells:[{v:"9000"},{v:"5400"}],sum:"900 × 16 = 14,400"},
  {cap:"Now the exact section, 912. 912 × 16: 912 × 10 = 9,120 and 912 × 6 = 5,472. Total 14,592. Only 192 more than the 900-estimate — because 912 is only 12 more than 900, sixteen times.",cols:[{l:"900",s:30},{l:"12",s:3}],rows:[{l:"10",s:10},{l:"6",s:6}],cells:[{v:"9000"},{v:"120"},{v:"5400"},{v:"72"}],sum:"912 × 16 = 14,592"},
  {cap:"Different stadium: 1,092 a section, 12 sections. 1,092 × 10 = 10,920; 1,092 × 2 = 2,184. Total 13,104.",fig:{k:"col",lines:[" 1092","×  12"],res:[" 2184","10920","13104"]},sum:"1092 × 12 = 13,104"},
  {cap:"Doubling is the easiest scale. 912 × 2 = 1,824. × 4 = 3,648. × 8 = 7,296. × 16 = 14,592. Four doublings.",fig:{k:"nl",min:0,max:16000,step:2000,marks:[{v:912,l:"912"},{v:1824},{v:3648,l:"3648"},{v:7296,l:"7296"},{v:14592,l:"14,592",c:G}],jumps:[{a:912,b:1824,l:"×2"},{a:1824,b:3648,l:"×2"},{a:3648,b:7296,l:"×2"},{a:7296,b:14592,l:"×2"}]}},
  {cap:"To the nearest thousand, 14,592 is 15,000 — the hundreds digit is 5, so round up. That is the number you would say in a conversation.",fig:{k:"nl",min:14000,max:15000,step:100,marks:[{v:14592,l:"14,592"},{v:15000,l:"→ 15,000",c:G}],span:[14500,15000]},sum:"14,592 ≈ 15,000"},
  {cap:"THE TRAP. Scaling the estimate and calling it the answer. 900 × 16 = 14,400 is a fine check; 912 × 16 = 14,592 is the count. Know which one you are holding.",fig:{k:"nl",min:14000,max:15000,step:100,marks:[{v:14400,l:"estimate",c:A},{v:14592,l:"count",up:18,c:G}]}}
]},

y5u2w4p3:{title:"Explain the Gap",sub:"Week 4 · where 1,408 seats came from",steps:[
  {cap:"Estimate 16,000. Count 14,592. Gap 1,408. The estimate was over — and you can say exactly why.",fig:{k:"nl",min:14000,max:16500,step:500,marks:[{v:16000,l:"16,000",c:A},{v:14592,l:"14,592",c:G}],jumps:[{a:14592,b:16000,l:"1408",c:R}]},sum:"16,000 − 14,592 = 1408"},
  {cap:"Start with one section. 24 × 38 was rounded to 25 × 40. That added one seat to every row and two whole rows.",cols:[{l:"24",s:24},{l:"1",s:1}],rows:[{l:"38",s:38},{l:"2",s:2}],cells:[{v:"912"},{v:"38"},{v:"48"},{v:"2"}],sum:"1000 − 912 = 88 extra per section"},
  {cap:"The strip down the side is 38 seats. The strip along the bottom is 48. The corner is 2. 38 + 48 + 2 = 88 phantom seats per section.",fig:{k:"tape",parts:[{v:"912",s:912,l:"real"},{v:"88",s:88,l:"phantom",c:R}],total:"1000"}},
  {cap:"88 phantom seats, 16 sections. 88 × 16 = 1,408. That is the whole gap, accounted for.",fig:{k:"col",lines:["  88","× 16"],res:[" 528"," 880","1408"]},sum:"88 × 16 = 1408 ✓"},
  {cap:"How big is the gap? 1,408 out of 14,592 is about a tenth — 10%. Two small round-ups, one per side, compound to a tenth of the answer.",fig:{k:"g100",n:10,l:"≈ 10%"},sum:"1408 ÷ 14592 ≈ 0.10"},
  {cap:"Same idea, different numbers. 197 × 48 → 200 × 50 = 10,000. True 9,456. Over by 544, both because both numbers rounded up.",fig:{k:"nl",min:9000,max:10500,step:250,marks:[{v:10000,l:"10,000",c:A},{v:9456,l:"9456",c:G}],jumps:[{a:9456,b:10000,l:"544",c:R}]},sum:"gap 544"},
  {cap:"THE TRAP. Calling the gap 'error'. Nothing went wrong. The estimate did its job — told you the size in two seconds — and the gap is the price of two round-ups, which you can now name to the seat.",cols:[{l:"24",s:24},{l:"1",s:1}],rows:[{l:"38",s:38},{l:"2",s:2}],cells:[{v:"912"},{v:"38"},{v:"48"},{v:"2"}]}
]},

y5u2w4p4:{title:"Error Journal Sweep",sub:"Thursday · fix only what repeats",steps:[
  {cap:"Built from the mistakes this mission produces most. Look for the one YOU keep making.",fig:{k:"col",lines:["  23","× 14"],res:["  92"," 230"," 322"]}},
  {cap:"MISTAKE ONE: a dropped zero on a multiple of ten. 400 × 70: 4 × 7 = 28, then THREE zeros. 28,000, not 2,800.",fig:{k:"pv",places:["ten-th","thousands","hundreds","tens","ones"],rows:[{d:["","","","2","8"],l:"4 × 7"},{d:["2","8","0","0","0"],l:"400 × 70"}],shift:{by:3,dir:"L"}},sum:"400 × 70 = 28,000"},
  {cap:"MISTAKE TWO: one line under the bar when there should be two. 45 × 23 is 135 AND 900.",fig:{k:"col",lines:["  45","× 23"],res:[" 135"," 900","1035"],hl:[[3,1],[3,2],[3,3]]},sum:"45 × 23 = 1035"},
  {cap:"MISTAKE THREE: the second line not shifted. 506 × 34: the 30-row is 15,180 — it starts one place left. Answer 17,204.",fig:{k:"col",lines:["  506","×  34"],res:[" 2024","15180","17204"],hl:[[3,4]]},sum:"506 × 34 = 17,204"},
  {cap:"MISTAKE FOUR: skipping the estimate. 1,234 × 12 ≈ 1,000 × 12 = 12,000. If you wrote 148,080 or 1,480, the estimate would have caught it.",fig:{k:"nl",min:0,max:20000,step:5000,marks:[{v:12000,l:"≈ 12,000",c:A},{v:14808,l:"14,808",up:18,c:G}]},sum:"1234 × 12 = 14,808"},
  {cap:"MISTAKE FIVE: fear of big numbers. 9,999 × 99 looks brutal. It is 9,999 × 100 − 9,999 = 999,900 − 9,999 = 989,901. Or two lines. Longer, not harder.",fig:{k:"col",lines:[" 9999","×  99"],res:["89991","899910","989901"]},sum:"9999 × 99 = 989,901"},
  {cap:"And the facts underneath everything: 7 × 8 = 56, 9 × 9 = 81, 12 × 6 = 72. If one of these is slow, every big sum is slow.",cols:[{l:"8",s:8}],rows:[{l:"7",s:7}],cells:[{v:"56"}],sum:"7 × 8 = 56"}
]},

y5u2w4p5:{title:"Mission 02 Test",sub:"Friday · the whole mission, and the Big Question",steps:[
  {cap:"Everything from four weeks. Every question is one of these pictures wearing different numbers.",cols:[{l:"20",s:20},{l:"4",s:4}],rows:[{l:"30",s:30},{l:"8",s:8}],cells:[{v:"600"},{v:"120"},{v:"160"},{v:"32"}]},
  {cap:"Multiples of ten: the fact, then the zeros. 50 × 50 = 2,500. 30 × 40 = 1,200.",fig:{k:"pv",places:["thousands","hundreds","tens","ones"],rows:[{d:["","","2","5"],l:"5 × 5"},{d:["2","5","0","0"],l:"50 × 50"}],shift:{by:2,dir:"L"}},sum:"50 × 50 = 2500"},
  {cap:"Two digits by two: four rooms or two lines. 56 × 27 = 1,512. 38 × 24 = 912.",fig:{k:"col",lines:["  56","× 27"],res:[" 392","1120","1512"]},sum:"56 × 27 = 1512"},
  {cap:"Longer numbers, same two lines. 2,450 × 36 = 88,200. 1,875 × 24 = 45,000.",fig:{k:"col",lines:[" 1875","×  24"],res:[" 7500","37500","45000"]},sum:"1875 × 24 = 45,000"},
  {cap:"Estimate for size. 5,120 × 48 ≈ 5,000 × 50 = 250,000. 197 × 203 ≈ 40,000. Both numbers up → over; both down → under.",fig:{k:"nl",min:0,max:300000,step:50000,marks:[{v:250000,l:"≈ 250,000",c:A},{v:40000,l:"≈ 40,000",c:G}]}},
  {cap:"Catch the error by size. 237 × 45 given as 1,185 — four digits where five belong. Missing 9,480.",fig:{k:"col",lines:[" 237","× 45"],res:["1185","9480","10665"],hl:[[3,0],[3,1],[3,2],[3,3]]},sum:"237 × 45 = 10,665"},
  {cap:"The Big Question, out loud: why does a wrong answer LOOK wrong? Because you knew its size before you started. 38 rows × 24 seats × 16 sections is about 16,000 — and exactly 14,592, with the gap explained to the seat.",fig:{k:"nl",min:14000,max:16500,step:500,marks:[{v:16000,l:"size",c:A},{v:14592,l:"count",c:G}],jumps:[{a:14592,b:16000,l:"88 × 16",c:R}]},sum:"14,592 seats"}
]}

};
window.__CURR = window.__CURR || {};
window.__CURR.LESSONS_AUTHORED = Object.assign(window.__CURR.LESSONS_AUTHORED || {}, L);
})();
