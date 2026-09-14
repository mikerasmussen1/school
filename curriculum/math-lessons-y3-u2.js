/* ============================================================================
 * MATH · YEAR ONE · MISSION 02 — Division Detectives · Weeks 2–5
 * ----------------------------------------------------------------------------
 * Hand-authored daily lessons. One idea per day, numbers from that day's
 * questions, the trap named. Pictures teach: equal groups with the leftover
 * shown, the missing-side rectangle, number lines that jump, the long-division
 * bracket built one line at a time (curriculum/lesson-figures.js).
 * ==========================================================================*/
(function(){
const A="#FBBF24", G="#4ADE80", P="#F472B6", R="#FB7185";
const L={

/* ── WEEK 2 · what to do with the leftover ────────────────────────────────── */

u2w2p1:{title:"Round It Up",sub:"Week 2 · two leftovers still need a whole van",steps:[
  {cap:"13 people, vans of 4. Fill the vans: 4, 8, 12. One person is left standing.",fig:{k:"groups",g:3,n:4,extra:1},sum:"13 ÷ 4 = 3 remainder 1"},
  {cap:"Do you leave them behind? No. They need a van too — a fourth van with one person in it. Vans needed: 4.",fig:{k:"groups",g:4,n:4,each:""},sum:"13 people → 4 vans"},
  {cap:"On a number line: jumps of 4 from 0. Three jumps reach 12. 13 is past that, so you need the fourth jump even though it overshoots.",fig:{k:"nl",min:0,max:16,step:1,labels:[0,4,8,12,16],jumps:[{a:0,b:4},{a:4,b:8},{a:8,b:12},{a:12,b:16,c:A,l:"the extra van"}],marks:[{v:13,l:"13",c:R}]}},
  {cap:"127 children, buses of 30. 30 × 4 = 120, so four buses take 120. Seven children left. Fifth bus.",fig:{k:"nl",min:0,max:150,step:30,jumps:[{a:0,b:30},{a:30,b:60},{a:60,b:90},{a:90,b:120},{a:120,b:150,c:A,l:"bus 5"}],marks:[{v:127,l:"127",c:R}]},sum:"127 ÷ 30 = 4 r 7 → 5 buses"},
  {cap:"How many seats sit empty? The fifth bus has 30 seats and 7 children. 30 − 7 = 23 empty.",fig:{k:"tape",parts:[{v:"7",s:7,l:"children"},{v:"23",s:23,l:"empty",c:R}],total:"bus 5: 30 seats"},sum:"23 empty seats"},
  {cap:"200 seats in rows of 18. 18 × 11 = 198 — two seats short. Twelve rows.",fig:{k:"nl",min:180,max:216,step:18,marks:[{v:198,l:"11 rows"},{v:200,l:"200",c:R},{v:216,l:"12 rows",c:A}]},sum:"200 ÷ 18 = 11 r 2 → 12 rows"},
  {cap:"THE TRAP. Ignoring a small remainder. Remainder 1 or remainder 29 — it does not matter how big. If ANYONE is left over, they need one more. Round up every time the question is 'how many needed'.",fig:{k:"groups",g:3,n:4,extra:1}}
]},

u2w2p2:{title:"Drop It",sub:"Week 2 · whole ones each — the rest stays on the plate",steps:[
  {cap:"26 cookies, 6 people. Deal them out: one each, two each, three each, four each. That uses 24.",fig:{k:"groups",g:6,n:4},sum:"6 × 4 = 24"},
  {cap:"Two cookies left. Not enough for a fifth round — you would need six. So everyone gets 4, and 2 stay on the plate.",fig:{k:"groups",g:6,n:4,extra:2},sum:"26 ÷ 6 = 4 r 2 → 4 each, 2 left"},
  {cap:"Yesterday the remainder pushed the answer UP. Today it gets dropped. Same maths — different question. 'How many EACH' means whole ones only.",fig:{k:"nl",min:0,max:30,step:6,jumps:[{a:0,b:6},{a:6,b:12},{a:12,b:18},{a:18,b:24}],marks:[{v:26,l:"26",c:R},{v:24,l:"4 rounds",c:G}]}},
  {cap:"$50 shared by 8. 8 × 6 = 48. Six whole dollars each, $2 left over. (Unless you break the dollars into coins — that is tomorrow.)",fig:{k:"tape",parts:[{v:"48",s:48,l:"8 × $6"},{v:"2",s:2,l:"left",c:R}],total:"$50"},sum:"50 ÷ 8 = 6 r 2"},
  {cap:"90 cm of ribbon, 14 cm bows. 14 × 6 = 84. Six whole bows. The 6 cm left is not a bow — it is waste.",fig:{k:"nl",min:0,max:98,step:14,jumps:[{a:0,b:14},{a:14,b:28},{a:28,b:42},{a:42,b:56},{a:56,b:70},{a:70,b:84}],marks:[{v:90,l:"90 cm",c:R}]},sum:"6 bows, 6 cm wasted"},
  {cap:"145 ÷ 12. 12 × 12 = 144. Twelve each, one left. Big numbers, same idea.",fig:{k:"tape",parts:[{v:"144",s:144,l:"12 × 12"},{v:"1",s:4,c:R}],total:"145"},sum:"145 ÷ 12 = 12 r 1"},
  {cap:"THE TRAP. Rounding up out of habit. 26 ÷ 6 is 4 whole cookies each, not 5 — nobody can get a fifth cookie that does not exist. Read the question: 'how many needed' rounds up; 'how many each' drops.",fig:{k:"groups",g:6,n:4,extra:2}}
]},

u2w2p3:{title:"Share It Out",sub:"Week 2 · cut the leftover and the remainder becomes a fraction",steps:[
  {cap:"9 ÷ 2. Two people, nine cookies. Four each, one left. Now — cut the last one in half.",fig:{k:"bars",bars:[{n:2,k:1,l:"½"}]},sum:"9 ÷ 2 = 4 and a half"},
  {cap:"A half is 0.5 as a decimal. So 9 ÷ 2 = 4.5. The remainder did not vanish; it got shared.",fig:{k:"nl",min:4,max:5,step:0.1,labels:[4,4.5,5],marks:[{v:4.5,l:"4.5",c:G}]},sum:"9 ÷ 2 = 4.5"},
  {cap:"Quarters are the other one to know. 1 ÷ 4 = a quarter = 0.25. Three quarters = 0.75.",fig:{k:"bars",bars:[{n:4,k:1,l:"¼ = 0.25"},{n:4,k:3,l:"¾ = 0.75"}]}},
  {cap:"17 ÷ 4. Four each uses 16, one left. One cookie cut four ways: a quarter each. 4¼, or 4.25.",fig:{k:"nl",min:4,max:5,step:0.25,marks:[{v:4.25,l:"4¼ = 4.25",c:G}]},sum:"17 ÷ 4 = 4 r 1 = 4¼"},
  {cap:"$45 shared by 4. $11 each uses $44. The last dollar splits into quarters — 25 cents each. $11.25.",fig:{k:"tape",parts:[{v:"44",s:44,l:"4 × $11"},{v:"1",s:3,l:"→ 4 × 25¢",c:A}],total:"$45"},sum:"45 ÷ 4 = 11.25"},
  {cap:"3 pizzas, 4 people. Fewer pizzas than people — nobody gets a whole one. Cut each pizza into 4 and everyone takes a slice from each: three quarters each.",fig:{k:"bars",bars:[{n:4,k:1},{n:4,k:1},{n:4,k:1,l:"¾ each"}]},sum:"3 ÷ 4 = ¾"},
  {cap:"THE TRAP. Sharing what cannot be shared. 15 apples for 7 kids is 2 each, 1 left — you CAN cut an apple. 15 vans for 7 groups: you cannot cut a van. Ask whether the leftover is cuttable before you write a fraction.",fig:{k:"groups",g:7,n:2,extra:1}}
]},

u2w2p4:{title:"The Remainder Is the Answer",sub:"Week 2 · clocks and patterns — the leftover is the whole point",steps:[
  {cap:"Beads: red, blue, green, red, blue, green… What colour is the 10th bead? Count in threes: 3, 6, 9. Then one more.",fig:{k:"nl",min:0,max:12,step:1,jumps:[{a:0,b:3},{a:3,b:6},{a:6,b:9}],marks:[{v:10,l:"10th",c:R}]},sum:"10 ÷ 3 = 3 r 1"},
  {cap:"Remainder 1 means it is the FIRST bead of a new group — red. Nobody cares that there were three full groups. The remainder is the answer.",fig:{k:"g100",rows:1,cols:12,nums:true,cells:[10],cells2:[3,6,9]},sum:"remainder 1 → 1st in the pattern → red"},
  {cap:"A 4-colour pattern, 63rd item. 63 ÷ 4 = 15 r 3. Fifteen full groups, then the 3rd item of the next one.",fig:{k:"nl",min:52,max:64,step:1,labels:[52,56,60,64],jumps:[{a:52,b:56},{a:56,b:60}],marks:[{v:63,l:"63rd",c:R},{v:60,l:"15 groups"}]},sum:"63rd → 3rd in the group"},
  {cap:"Clocks. It is 9 o'clock. 25 hours later? A day is 24 hours — the hand goes all the way round and lands back on 9. Then one more hour: 10.",fig:{k:"clock",h:10,m:0,l:"25 ÷ 24 = 1 r 1 → 9 + 1 = 10"},sum:"25 hours later: 10 o'clock"},
  {cap:"Days. 100 days from a Monday. 100 ÷ 7 = 14 r 2. Fourteen full weeks land back on Monday; two more days is Wednesday.",fig:{k:"nl",min:84,max:105,step:7,labels:[84,91,98,105],jumps:[{a:84,b:91},{a:91,b:98}],marks:[{v:100,l:"day 100",c:R},{v:98,l:"14 weeks"}]},sum:"100 ÷ 7 = 14 r 2"},
  {cap:"365 days in a year. 365 ÷ 7 = 52 r 1. That single day is why your birthday moves forward one weekday every year.",fig:{k:"tape",parts:[{v:"364",s:52,l:"52 weeks"},{v:"1",s:2,c:A}],total:"365"},sum:"365 ÷ 7 = 52 r 1"},
  {cap:"THE TRAP. Writing the quotient. If the question is 'what colour' or 'what day', the 14 or the 15 is scaffolding. Cross it out. The remainder — 1, 2, 3 — is what you look up in the pattern.",fig:{k:"g100",rows:1,cols:12,nums:true,cells:[10],cells2:[3,6,9]}}
]},

u2w2p5:{title:"Snack Run Planning",sub:"Friday · every leftover decision written down",steps:[
  {cap:"The Snack Run. You are buying for 6 people, 7 snacks each. Packs hold 10. This is a plan, so every decision gets written down.",fig:{k:"groups",g:6,n:7}},
  {cap:"Total needed: 6 × 7 = 42 snacks.",fig:{k:"groups",g:6,n:7,each:"7"},sum:"6 × 7 = 42"},
  {cap:"Packs of 10. 42 ÷ 10 = 4 r 2. Four packs is 40 — two short. Somebody goes hungry. Round UP: 5 packs.",fig:{k:"nl",min:0,max:50,step:10,jumps:[{a:0,b:10},{a:10,b:20},{a:20,b:30},{a:30,b:40},{a:40,b:50,c:A,l:"pack 5"}],marks:[{v:42,l:"42 needed",c:R}]},sum:"5 packs"},
  {cap:"5 packs is 50 snacks. 50 − 42 = 8 left over. Write it down: '5 packs, 8 spare'.",fig:{k:"tape",parts:[{v:"42",s:42,l:"eaten"},{v:"8",s:8,l:"spare",c:A}],total:"50"},sum:"8 left over"},
  {cap:"A pack of 18 grapes for 5 people. 18 ÷ 5 = 3 r 3. Three each, three on the plate — grapes get dropped, not rounded.",fig:{k:"groups",g:5,n:3,extra:3},sum:"3 each, 3 left"},
  {cap:"$12 of snacks split 5 ways. 12 ÷ 5 = 2 r 2. Money CAN be cut: $2 left is 200 cents ÷ 5 = 40 cents each. $2.40.",fig:{k:"nl",min:2,max:3,step:0.2,labels:[2,2.4,3],marks:[{v:2.4,l:"$2.40",c:G}]},sum:"12 ÷ 5 = 2.4"},
  {cap:"Three leftovers, three different calls: packs round up, grapes drop, money splits. The plan says which — that is the whole project.",fig:{k:"tape",parts:[{v:"↑",l:"packs"},{v:"↓",l:"grapes"},{v:"÷",l:"money"}],total:"the leftover rule"}}
]},

/* ── WEEK 3 · under the bar ───────────────────────────────────────────────── */

u2w3p1:{title:"Under the Bar",sub:"Week 3 · chunks, written in the standard layout",steps:[
  {cap:"84 ÷ 4. You know how to chunk this: 4 × 20 = 80, then 4 × 1 = 4. Today those same chunks go under a bar.",cols:[{l:"20",s:20},{l:"1",s:1}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"4"}],sum:"84 = 80 + 4"},
  {cap:"The bracket. Divisor outside, dividend inside, answer on top. Start with the tens: how many 4s in 8 tens? Two tens. Write 2 above the 8.",fig:{k:"ld",d:"4",n:"84",q:"2 ",hl:[[0,0],[1,0]],notes:["8 tens ÷ 4 = 2 tens"]}},
  {cap:"2 tens × 4 = 8 tens. Write 8 under the 8, subtract: nothing left in the tens.",fig:{k:"ld",d:"4",n:"84",q:"2 ",work:["-8 "," 0 "],hl:[[2,0]]}},
  {cap:"Bring down the 4 ones. How many 4s in 4? One. Write 1 above the 4. 1 × 4 = 4, subtract, zero left.",fig:{k:"ld",d:"4",n:"84",q:"21",work:["-8 "," 04","- 4","  0"],hl:[[0,1],[3,1]]},sum:"84 ÷ 4 = 21"},
  {cap:"Same thing, one more step. 126 ÷ 3. Hundreds: 1 ÷ 3 does not go, so look at 12 tens. 12 ÷ 3 = 4 tens. Write 4 above the 2.",fig:{k:"ld",d:"3",n:"126",q:" 4 ",work:["-12 ","  0 "],hl:[[0,1],[1,0],[1,1]],notes:["12 tens ÷ 3 = 4 tens"]}},
  {cap:"Bring down 6. 6 ÷ 3 = 2. Answer 42. The rooms were 3 × 40 and 3 × 2 — the bar just wrote them top to bottom.",fig:{k:"ld",d:"3",n:"126",q:" 42",work:["-12 ","  06","-  6","   0"],hl:[[0,2]]},sum:"126 ÷ 3 = 42"},
  {cap:"THE TRAP. Putting the first digit of the answer in the wrong place. In 126 ÷ 3 the 4 goes above the 2 — the TENS — because it means 4 tens. Above the 1 it would mean 400. Line up your places.",fig:{k:"ld",d:"3",n:"126",q:" 42",work:["-12 ","  06","-  6","   0"],hl:[[0,1]]}}
]},

u2w3p2:{title:"Three-Digit Dividends",sub:"Week 3 · estimate first, out loud",steps:[
  {cap:"372 ÷ 3. Before the bar: 300 ÷ 3 = 100, and there is a bit more. Answer is a bit over 100.",fig:{k:"nl",min:0,max:200,step:50,marks:[{v:100,l:"a bit over 100",c:A}]},sum:"372 ÷ 3 ≈ 100+"},
  {cap:"Hundreds: 3 ÷ 3 = 1. Write 1 above the 3. Subtract 3, nothing left.",fig:{k:"ld",d:"3",n:"372",q:"1  ",work:["-3  "," 0  "],hl:[[0,0]]}},
  {cap:"Bring down 7 tens. 7 ÷ 3 = 2, with 1 left. Write 2 above the 7; the leftover ten waits.",fig:{k:"ld",d:"3",n:"372",q:"12 ",work:["-3  "," 07 ","- 6 ","  1 "],hl:[[0,1],[5,1]],notes:["7 tens = 2 × 3 tens, 1 ten left"]}},
  {cap:"Bring down the 2. The leftover ten and the 2 ones make 12. 12 ÷ 3 = 4. Answer 124 — a bit over 100, as predicted.",fig:{k:"ld",d:"3",n:"372",q:"124",work:["-3  "," 07 ","- 6 ","  12","- 12","   0"],hl:[[0,2]]},sum:"372 ÷ 3 = 124"},
  {cap:"728 ÷ 8. Estimate: 720 ÷ 8 = 90, so about 90. Hundreds: 7 ÷ 8 does not go — so start with 72 tens. 72 ÷ 8 = 9 tens.",fig:{k:"ld",d:"8",n:"728",q:" 9 ",work:["-72 ","  0 "],hl:[[0,1],[1,0],[1,1]],notes:["7 < 8, so use 72"]}},
  {cap:"Bring down 8. 8 ÷ 8 = 1. Answer 91. Two digits, not three — the estimate said 'about 90', so a three-digit answer would have been a red flag.",fig:{k:"ld",d:"8",n:"728",q:" 91",work:["-72 ","  08","-  8","   0"],hl:[[0,2]]},sum:"728 ÷ 8 = 91"},
  {cap:"THE TRAP. Skipping the estimate. 864 ÷ 6 is about 800 ÷ 6, well over 100, so three digits: 144. If you get 24 or 1,440, the estimate would have caught it before you wrote it down.",fig:{k:"nl",min:0,max:200,step:50,marks:[{v:133,l:"≈ 800 ÷ 6",c:A},{v:144,l:"144",up:18,c:G}]},sum:"864 ÷ 6 = 144"}
]},

u2w3p3:{title:"Zeros in the Quotient",sub:"Week 3 · the place nobody remembers to hold",steps:[
  {cap:"618 ÷ 6. Estimate: 600 ÷ 6 = 100, plus a little. Three digits, starting with 1.",fig:{k:"nl",min:0,max:200,step:50,marks:[{v:100,l:"≈ 100+",c:A}]}},
  {cap:"Hundreds: 6 ÷ 6 = 1. Bring down 1 ten. How many 6s in 1? None.",fig:{k:"ld",d:"6",n:"618",q:"1  ",work:["-6  "," 01 "],hl:[[1,1]],notes:["1 ÷ 6 does not go"]}},
  {cap:"Here is the moment. You MUST write a 0 above the 1. That place is not empty — it is zero tens. Skip it and the answer collapses to 13.",fig:{k:"ld",d:"6",n:"618",q:"10 ",work:["-6  "," 01 ","- 0 ","  1 "],hl:[[0,1]],notes:["hold the place with 0"]}},
  {cap:"Bring down 8: 18. 18 ÷ 6 = 3. Answer 103. Check it against the estimate — 100 and a bit. Yes.",fig:{k:"ld",d:"6",n:"618",q:"103",work:["-6  "," 01 ","- 0 ","  18","- 18","   0"],hl:[[0,2]]},sum:"618 ÷ 6 = 103"},
  {cap:"915 ÷ 3. 9 ÷ 3 = 3. 1 ÷ 3 does not go — zero. 15 ÷ 3 = 5. 305.",fig:{k:"ld",d:"3",n:"915",q:"305",work:["-9  "," 01 ","- 0 ","  15","- 15","   0"],hl:[[0,1]]},sum:"915 ÷ 3 = 305"},
  {cap:"The zero can be at the end too. 4,080 ÷ 8. 40 ÷ 8 = 5, 8 ÷ 8 = 1, 0 ÷ 8 = 0. 510 — not 51.",fig:{k:"ld",d:"8",n:"4080",q:" 510",work:["-40  ","  08 ","-  8 ","   00","-   0","    0"],hl:[[0,3]]},sum:"4080 ÷ 8 = 510"},
  {cap:"THE TRAP. The size check catches every one of these. 618 ÷ 6 is about 100. If you wrote 13, you are off by a factor of ten — and the missing zero is why. Estimate, then count the digits in your answer.",fig:{k:"nl",min:0,max:150,step:25,marks:[{v:13,l:"13? ✗",c:R},{v:103,l:"103 ✓",c:G}]}}
]},

u2w3p4:{title:"Check by Multiplying",sub:"Week 3 · self-marking from here on",steps:[
  {cap:"Division and multiplication are the same rectangle read two ways. 56 ÷ 8 = 7 because 7 × 8 = 56.",cols:[{l:"7",s:7}],rows:[{l:"8",s:8}],cells:[{v:"56"}],sum:"7 × 8 = 56 ↔ 56 ÷ 8 = 7"},
  {cap:"So every division checks itself: multiply the answer back. 372 ÷ 3 = 124? Then 124 × 3 must be 372.",fig:{k:"col",lines:[" 124","×  3"],res:[" 372"],hl:[[2,1],[2,2],[2,3]]},sum:"124 × 3 = 372 ✓"},
  {cap:"With a remainder, add it back on. 58 ÷ 5 = 11 r 3. Check: 11 × 5 = 55, plus 3 = 58.",fig:{k:"tape",parts:[{v:"55",s:55,l:"11 × 5"},{v:"3",s:5,l:"r",c:A}],total:"58"},sum:"11 × 5 + 3 = 58 ✓"},
  {cap:"106 ÷ 6. You get 17 r 4. Check: 17 × 6 = 102, plus 4 = 106. Marked — by you.",fig:{k:"tape",parts:[{v:"102",s:102,l:"17 × 6"},{v:"4",s:8,l:"r",c:A}],total:"106"},sum:"17 × 6 + 4 = 106 ✓"},
  {cap:"Run it backwards. Quotient 23, remainder 5, divisor 9 — what was the number? 23 × 9 = 207, plus 5 = 212.",fig:{k:"col",lines:["  23","×  9"],res:[" 207","+  5"," 212"]},sum:"the dividend was 212"},
  {cap:"Quotient 47 r 3, divisor 12. 47 × 12 = 564, plus 3 = 567.",fig:{k:"col",lines:["  47","× 12"],res:["  94"," 470"," 564","+  3"," 567"]},sum:"the dividend was 567"},
  {cap:"THE TRAP. A remainder bigger than the divisor. 58 ÷ 5 = 10 r 8 checks out (50 + 8 = 58) but it is wrong — 8 is more than 5, so another 5 fits. The check must pass AND the remainder must be smaller than the divisor.",fig:{k:"groups",g:5,n:11,extra:3,each:"11"}}
]},

u2w3p5:{title:"Mid-Unit Quiz",sub:"Friday · three weeks, four ideas",steps:[
  {cap:"Nothing new. Four ideas from three weeks. If one wobbles, reopen that lesson.",fig:{k:"ld",d:"3",n:"372",q:"124",work:["-3  "," 07 ","- 6 ","  12","- 12","   0"]}},
  {cap:"ONE: division is the missing side. 42 ÷ 6 — a rectangle of 42 with one side 6. The other side is 7.",cols:[{l:"?",s:7}],rows:[{l:"6",s:6}],cells:[{v:"42"}],sum:"42 ÷ 6 = 7"},
  {cap:"TWO: the leftover has three fates. 127 kids in buses of 30 → round up to 5. 26 cookies for 4 → cut it, 6.5. The 10th bead in a 3-pattern → the remainder IS the answer.",fig:{k:"tape",parts:[{v:"↑",l:"buses"},{v:"÷",l:"cookies"},{v:"r",l:"beads"}],total:"which leftover?"}},
  {cap:"THREE: under the bar, one place at a time, and hold every place — even with a zero. 618 ÷ 6 = 103.",fig:{k:"ld",d:"6",n:"618",q:"103",work:["-6  "," 01 ","- 0 ","  18","- 18","   0"],hl:[[0,1]]},sum:"618 ÷ 6 = 103"},
  {cap:"FOUR: multiply back to check. 23 r 5 with divisor 9 → 23 × 9 + 5 = 212.",fig:{k:"tape",parts:[{v:"207",s:207,l:"23 × 9"},{v:"5",s:12,c:A}],total:"212"},sum:"23 × 9 + 5 = 212"},
  {cap:"And always estimate first. 1440 ÷ 12 is about 1200 ÷ 12 = 100 and more — 120.",fig:{k:"nl",min:0,max:200,step:50,marks:[{v:100,l:"≈ 100+",c:A},{v:120,l:"120",up:18,c:G}]},sum:"1440 ÷ 12 = 120"}
]},

/* ── WEEK 4 · tests, longer bars, two-digit divisors ─────────────────────── */

u2w4p1:{title:"Tests for 2, 5 and 10",sub:"Week 4 · why the last digit is enough",steps:[
  {cap:"Is 46 divisible by 2? Here it is: 4 tens and 6 ones. Every ten splits into two 5s — so the tens are already fine. Only the 6 matters.",fig:{k:"b10",t:4,o:6},sum:"46 → look at the 6"},
  {cap:"6 is even, so 46 divides by 2. The rule: divisible by 2 if the LAST digit is 0, 2, 4, 6 or 8.",fig:{k:"g100",rows:1,cols:10,nums:true,cells:[2,4,6,8,10]},sum:"46 ÷ 2 = 23 ✓"},
  {cap:"Same trick for 5. Every ten is two 5s, so only the ones digit can spoil it. 45 ends in 5 — yes. 999 ends in 9 — no.",fig:{k:"b10",t:4,o:5},sum:"divisible by 5 ↔ ends in 0 or 5"},
  {cap:"And 10 is the strictest: the ones digit must be 0 — nothing left over after the tens. 3,450 yes. 75 no.",fig:{k:"g100",rows:1,cols:10,nums:true,cells:[10]},sum:"divisible by 10 ↔ ends in 0"},
  {cap:"Divisible by 2 AND by 5 means it ends in an even digit that is 0 or 5 — only 0 works. So 'by 2 and 5' is the same as 'by 10'. Below 50: 10, 20, 30, 40 — four of them.",fig:{k:"g100",rows:5,cols:10,nums:true,cells:[10,20,30,40]},sum:"2 and 5 → 10"},
  {cap:"How many multiples of 10 below 200? 10, 20 … 190. That is 190 ÷ 10 = 19 of them. (Not 20 — 200 itself is not below 200.)",fig:{k:"nl",min:0,max:200,step:10,labels:[0,50,100,150,190,200],marks:[{v:190,l:"19th",c:G},{v:200,l:"not below",c:R}]},sum:"19 multiples"},
  {cap:"THE TRAP. Looking at the wrong end. 128: the 1 and the 2 are irrelevant; the 8 is even, so yes. The FIRST digit tells you nothing about 2, 5 or 10.",fig:{k:"b10",h:1,t:2,o:8}}
]},

u2w4p2:{title:"Tests for 3 and 9",sub:"Week 4 · why that ridiculous digit trick works",steps:[
  {cap:"Is 24 divisible by 3? The rule says: add the digits. 2 + 4 = 6, and 6 is in the 3s, so yes. Fine — but WHY?",fig:{k:"b10",t:2,o:4},sum:"2 + 4 = 6 → yes"},
  {cap:"Look at a ten. It is 9 + 1. So 2 tens is two 9s plus two 1s. And 24 is two 9s, plus 2, plus 4.",fig:{k:"tape",parts:[{v:"9"},{v:"9"},{v:"2",c:A},{v:"4",c:A}],total:"24 = 9 + 9 + (2 + 4)"}},
  {cap:"The 9s are already divisible by 3. What is left is 2 + 4 — the digit sum. If THAT divides by 3, the whole thing does. Not magic. Nines hiding inside every ten.",fig:{k:"tape",parts:[{v:"18",s:18,l:"two 9s"},{v:"6",s:6,l:"digit sum",c:A}],total:"24"},sum:"18 ÷ 3 ✓  and  6 ÷ 3 ✓  → 24 ÷ 3 ✓"},
  {cap:"It works for hundreds too: 100 = 99 + 1, and 99 is 11 nines. So 738 = a pile of 9s plus 7 + 3 + 8 = 18. 18 is in the 9s — so 738 is divisible by 9.",fig:{k:"col",lines:[" 738"],res:[],notes:["7 + 3 + 8 = 18 → ÷9 ✓"]},sum:"738 ÷ 9 = 82"},
  {cap:"17: 1 + 7 = 8. Not in the 3s. No. 1,234: 1 + 2 + 3 + 4 = 10. No. 5,346: 5 + 3 + 4 + 6 = 18. Divisible by 9 — and by 3, since 9 is 3 × 3.",fig:{k:"col",lines:["  17","1234","5346"],res:[],notes:["8 ✗    10 ✗    18 ✓"]}},
  {cap:"Smallest digit d making 45d divisible by 9? 4 + 5 = 9 already. Add d: need 9 or 18. d = 0 works — 450 ÷ 9 = 50.",fig:{k:"col",lines:[" 45?"],res:[" 450"],hl:[[1,3]],notes:["9 + d in the 9s → d = 0 or 9"]},sum:"d = 0"},
  {cap:"THE TRAP. Applying the last-digit rule to 3. Ending in 3 means nothing: 13 is not divisible by 3, 51 is. For 3 and 9 it is the digit SUM — because of the nines inside the tens.",fig:{k:"col",lines:["  13","  51"],res:[],hl:[[0,3]],notes:["1 + 3 = 4 ✗     5 + 1 = 6 ✓"]}}
]},

u2w4p3:{title:"Four-Digit Dividends",sub:"Week 4 · same method, longer bar",steps:[
  {cap:"3,472 ÷ 8. Estimate: 3,200 ÷ 8 = 400, so a bit over 400. Three digits.",fig:{k:"nl",min:0,max:600,step:100,marks:[{v:400,l:"≈ 400+",c:A}]}},
  {cap:"Thousands: 3 ÷ 8 does not go. So start with 34 hundreds. 34 ÷ 8 = 4, remainder 2. Write 4 above the 4.",fig:{k:"ld",d:"8",n:"3472",q:" 4  ",work:["-32  ","  2  "],hl:[[0,1],[1,0],[1,1]],notes:["3 < 8, so use 34"]}},
  {cap:"Bring down 7: 27. 27 ÷ 8 = 3 r 3. Write 3.",fig:{k:"ld",d:"8",n:"3472",q:" 43 ",work:["-32  ","  27 ","- 24 ","   3 "],hl:[[0,2]]}},
  {cap:"Bring down 2: 32. 32 ÷ 8 = 4. Answer 434. Over 400 — the estimate is happy.",fig:{k:"ld",d:"8",n:"3472",q:" 434",work:["-32  ","  27 ","- 24 ","   32","-  32","    0"],hl:[[0,3]]},sum:"3472 ÷ 8 = 434"},
  {cap:"5,432 ÷ 4. This time the first digit DOES go: 5 ÷ 4 = 1 r 1. So the answer has four digits — about 1,300. 1,358.",fig:{k:"ld",d:"4",n:"5432",q:"1358",work:["-4   "," 14  ","-12  ","  23 ","- 20 ","   32","-  32","    0"],hl:[[0,0]]},sum:"5432 ÷ 4 = 1358"},
  {cap:"8,127 ÷ 9. 8 does not go; 81 ÷ 9 = 9. Bring down 2: 2 ÷ 9 does not go — write 0! Bring down 7: 27 ÷ 9 = 3. 903.",fig:{k:"ld",d:"9",n:"8127",q:" 903",work:["-81  ","  02 ","-  0 ","   27","-  27","    0"],hl:[[0,2]]},sum:"8127 ÷ 9 = 903"},
  {cap:"THE TRAP. Flinching. A four-digit number under the bar is the same three moves — divide, multiply, subtract, bring down — done one more time. The estimate tells you how many digits to expect; the bar delivers them one at a time.",fig:{k:"nl",min:0,max:1500,step:250,marks:[{v:434,l:"3472 ÷ 8"},{v:903,l:"8127 ÷ 9"},{v:1358,l:"5432 ÷ 4"}]}}
]},

u2w4p4:{title:"Two-Digit Divisors",sub:"Week 4 · estimate, adjust, estimate again",steps:[
  {cap:"224 ÷ 14. A two-digit divisor. The only new thing is that you do not know the 14 times table — so you estimate each digit.",fig:{k:"nl",min:0,max:30,step:5,marks:[{v:16,l:"≈ 224 ÷ 14?",c:A}]}},
  {cap:"22 tens ÷ 14. Think 14 ≈ 10-something: how many 14s in 22? One. 1 × 14 = 14. 22 − 14 = 8.",fig:{k:"ld",d:"14",n:"224",q:" 1 ",work:["-14 ","  8 "],hl:[[0,1]],notes:["one 14 in 22"]}},
  {cap:"Bring down 4: 84. How many 14s in 84? Guess: 14 × 5 = 70, 14 × 6 = 84. Exactly 6.",fig:{k:"ld",d:"14",n:"224",q:" 16",work:["-14 ","  84","- 84","   0"],hl:[[0,2]]},sum:"224 ÷ 14 = 16"},
  {cap:"Check: 16 × 14. 16 × 10 = 160, 16 × 4 = 64. 224. Yes.",cols:[{l:"10",s:10},{l:"4",s:4}],rows:[{l:"16",s:16}],cells:[{v:"160"},{v:"64"}],sum:"16 × 14 = 224 ✓"},
  {cap:"391 ÷ 17. Round the divisor to guess: 17 ≈ 20. 39 ÷ 20 ≈ 2. Try 2 × 17 = 34. 39 − 34 = 5. Good — less than 17.",fig:{k:"ld",d:"17",n:"391",q:" 2 ",work:["-34 ","  5 "],hl:[[0,1]],notes:["guess with 20, check with 17"]}},
  {cap:"Bring down 1: 51. 51 ÷ 20 ≈ 2, but 2 × 17 = 34 leaves 17 — that is a whole extra 17. Adjust up: 3 × 17 = 51. Exactly. 23.",fig:{k:"ld",d:"17",n:"391",q:" 23",work:["-34 ","  51","- 51","   0"],hl:[[0,2]],notes:["2 left too much → try 3"]},sum:"391 ÷ 17 = 23"},
  {cap:"THE TRAP. Sticking with a bad guess. Guessing is the METHOD here, not a failure. If what is left is bigger than the divisor, your digit was too small: go up one. If the subtraction goes negative, too big: go down one.",fig:{k:"ld",d:"35",n:"945",q:" 27",work:["-70 "," 245","-245","   0"]},sum:"945 ÷ 35 = 27"}
]},

u2w4p5:{title:"Perfect Numbers",sub:"Friday · when the factors add up to the number",steps:[
  {cap:"Enrichment. Take 6. Its factors below itself: 1, 2, 3. Add them: 1 + 2 + 3 = 6. The number rebuilt itself from its own parts. That is called a perfect number.",fig:{k:"tape",parts:[{v:"1",s:1},{v:"2",s:2},{v:"3",s:3}],total:"6"},sum:"1 + 2 + 3 = 6 — perfect"},
  {cap:"Try 8. Factors below 8: 1, 2, 4. Sum 7. Short by one — not perfect. (Numbers like this are called deficient.)",fig:{k:"tape",parts:[{v:"1",s:1},{v:"2",s:2},{v:"4",s:4},{v:"?",s:1,c:R}],total:"8"},sum:"1 + 2 + 4 = 7 < 8"},
  {cap:"12. Factors: 1, 2, 3, 4, 6. Sum 16. Too much — abundant. Most numbers miss one way or the other.",fig:{k:"tape",parts:[{v:"1",s:1},{v:"2",s:2},{v:"3",s:3},{v:"4",s:4},{v:"6",s:6}],total:"16 > 12"},sum:"1 + 2 + 3 + 4 + 6 = 16"},
  {cap:"Hunt the next one. 28: factors 1, 2, 4, 7, 14. Sum: 1 + 2 + 4 + 7 + 14 = 28. Perfect.",fig:{k:"tape",parts:[{v:"1",s:1},{v:"2",s:2},{v:"4",s:4},{v:"7",s:7},{v:"14",s:14}],total:"28"},sum:"28 — the second perfect number"},
  {cap:"The third is 496. Its factors below it: 1, 2, 4, 8, 16, 31, 62, 124, 248 — nine of them — and they add to exactly 496. The fourth is 8,128. Nobody has ever found an odd one.",fig:{k:"nl",min:0,max:500,step:100,marks:[{v:6,l:"6"},{v:28,l:"28",up:18},{v:496,l:"496"}]},sum:"6, 28, 496, 8128…"},
  {cap:"Back to earth: 2016 ÷ 12. Estimate 2400 ÷ 12 = 200, so under 200. 20 ÷ 12 = 1 r 8, 81 ÷ 12 = 6 r 9, 96 ÷ 12 = 8. 168.",fig:{k:"ld",d:"12",n:"2016",q:" 168",work:["-12  ","  81 ","- 72 ","   96","-  96","    0"]},sum:"2016 ÷ 12 = 168"}
]},

/* ── WEEK 5 · working backwards and the project ───────────────────────────── */

u2w5p1:{title:"Missing-Digit Division",sub:"Week 5 · reason backwards from the answer",steps:[
  {cap:"? ÷ 4 = 6. The rectangle has side 4 and side 6. The missing number is its area: 4 × 6 = 24.",cols:[{l:"6",s:6}],rows:[{l:"4",s:4}],cells:[{v:"?"}],sum:"? = 4 × 6 = 24"},
  {cap:"36 ÷ ? = 9. Now the area and one side are known. 9 × ? = 36 → 4.",cols:[{l:"9",s:9}],rows:[{l:"?",s:4}],cells:[{v:"36"}],sum:"? = 36 ÷ 9 = 4"},
  {cap:"So a missing DIVIDEND is a multiplication; a missing DIVISOR is another division. Both come from the same rectangle.",cols:[{l:"12",s:12}],rows:[{l:"5",s:5}],cells:[{v:"60"}],sum:"? ÷ 5 = 12 → 60    ·    48 ÷ ? = 6 → 8"},
  {cap:"? ÷ 6 = 103. Multiply back: 103 × 6 = 618. Watch the zero in the middle — it produces the 1 ten in 618.",fig:{k:"col",lines:[" 103","×  6"],res:[" 618"],hl:[[0,1],[2,1]]},sum:"? = 618"},
  {cap:"With a remainder: ? ÷ 9 = 47 r 3. 47 × 9 = 423, plus the 3 = 426.",fig:{k:"col",lines:["  47","×  9"],res:[" 423","+  3"," 426"]},sum:"? = 426"},
  {cap:"A 3-digit number ÷ 7 = 43 exactly. 43 × 7 = 301. Three digits — it fits. (Reasoning: 43 × 7 must end in 1, since 3 × 7 = 21.)",fig:{k:"col",lines:["  43","×  7"],res:[" 301"],hl:[[2,3]]},sum:"the number is 301"},
  {cap:"THE TRAP. Dividing when you should multiply. 'Something ÷ 4 = 6' — the something is BIGGER than 6, so it cannot be 6 ÷ 4. Draw the rectangle; the missing piece tells you which operation.",cols:[{l:"6",s:6}],rows:[{l:"4",s:4}],cells:[{v:"24"}]}
]},

u2w5p2:{title:"Snack Run",sub:"Week 5 · the real run — every leftover call, written down",steps:[
  {cap:"The Snack Run for real. 9 people, 5 snacks each. Packs of 12. Total first.",fig:{k:"groups",g:9,n:5},sum:"9 × 5 = 45 snacks"},
  {cap:"45 ÷ 12 = 3 r 9. Three packs is 36 — nine short. Round up: 4 packs, 48 snacks, 3 spare. Written down.",fig:{k:"nl",min:0,max:48,step:12,jumps:[{a:0,b:12},{a:12,b:24},{a:24,b:36},{a:36,b:48,c:A,l:"pack 4"}],marks:[{v:45,l:"45",c:R}]},sum:"4 packs · 3 left over"},
  {cap:"A 44-pack of grapes for 6. 44 ÷ 6 = 7 r 2. Seven each, two on the plate. Dropped.",fig:{k:"groups",g:6,n:7,extra:2},sum:"7 each, 2 left"},
  {cap:"$18 split 4 ways. 18 ÷ 4 = 4 r 2. Money splits: $2 ÷ 4 = 50¢. $4.50 each.",fig:{k:"nl",min:4,max:5,step:0.25,marks:[{v:4.5,l:"$4.50",c:G}]},sum:"18 ÷ 4 = 4.5"},
  {cap:"$25 buys packs at $4. 25 ÷ 4 = 6 r 1. Six whole packs — you cannot buy a quarter of a pack — and $1 change.",fig:{k:"tape",parts:[{v:"24",s:24,l:"6 × $4"},{v:"1",s:2,l:"change",c:A}],total:"$25"},sum:"6 packs, $1 change"},
  {cap:"Four divisions, four leftover calls: packs UP, grapes DROP, money SPLIT, purchases DROP with change. The write-up is the deliverable, not the numbers.",fig:{k:"tape",parts:[{v:"↑",l:"packs"},{v:"↓",l:"grapes"},{v:"÷",l:"money"},{v:"↓",l:"buying"}],total:"the leftover rule"}}
]},

u2w5p3:{title:"Remainder Defence",sub:"Week 5 · one division, four right answers",steps:[
  {cap:"27 ÷ 4. Here is the whole thing, once: 6 groups of 4, and 3 left. Every answer today comes from this picture.",fig:{k:"groups",g:4,n:6,extra:3},sum:"27 ÷ 4 = 6 r 3"},
  {cap:"'27 ÷ 4 — the whole part': 6. '27 ÷ 4 — the remainder': 3. Two questions, two numbers, same picture.",fig:{k:"tape",parts:[{v:"24",s:24,l:"4 × 6"},{v:"3",s:3,l:"r",c:A}],total:"27"}},
  {cap:"'27 children in cars of 4 — cars needed': you cannot leave three children in the car park. 7.",fig:{k:"nl",min:0,max:28,step:4,jumps:[{a:0,b:4},{a:4,b:8},{a:8,b:12},{a:12,b:16},{a:16,b:20},{a:20,b:24},{a:24,b:28,c:A,l:"car 7"}],marks:[{v:27,l:"27",c:R}]},sum:"7 cars"},
  {cap:"'27 cookies between 4 — whole each': 6, and three stay on the plate. '27 ÷ 4 as a decimal': cut the three. 3 ÷ 4 = 0.75. 6.75.",fig:{k:"bars",bars:[{n:4,k:3,l:"¾ = 0.75"}]},sum:"6 each  ·  6.75"},
  {cap:"53 ÷ 8 = 6 r 5. Whole part 6. Vans needed 7. Dollars each, whole: 6. As a decimal: 5 ÷ 8 = 0.625, so 6.625.",fig:{k:"bars",bars:[{n:8,k:5,l:"⅝ = 0.625"}]},sum:"53 ÷ 8 = 6 r 5 = 6.625"},
  {cap:"THE TRAP. Doing the division and stopping. 6 r 3 is not an answer to anything — it is the raw material. The question tells you which of the four to hand in: 6, 3, 7, or 6.75. Say which, and why.",fig:{k:"tape",parts:[{v:"6",l:"whole"},{v:"3",l:"remainder"},{v:"7",l:"needed"},{v:"6.75",l:"shared"}],total:"27 ÷ 4 — four answers"}}
]},

u2w5p4:{title:"Error Journal Sweep",sub:"Thursday · fix only what repeats",steps:[
  {cap:"Built from the mistakes this mission produces most. Find the one YOU keep making.",fig:{k:"ld",d:"6",n:"618",q:"103",work:["-6  "," 01 ","- 0 ","  18","- 18","   0"]}},
  {cap:"MISTAKE ONE: the missing zero. 618 ÷ 6 is 103, not 13. When a digit does not go, write 0 and move on. The estimate (about 100) catches it.",fig:{k:"ld",d:"6",n:"618",q:"103",work:["-6  "," 01 ","- 0 ","  18","- 18","   0"],hl:[[0,1]]},sum:"618 ÷ 6 = 103"},
  {cap:"MISTAKE TWO: the wrong leftover rule. 26 ÷ 6 — the remainder is 2; that is the question. Not 4, not 5, not 4.33. Read what is asked.",fig:{k:"groups",g:6,n:4,extra:2},sum:"26 ÷ 6 → remainder 2"},
  {cap:"MISTAKE THREE: last-digit rule for 9. 45 is divisible by 9 because 4 + 5 = 9 — the digit SUM.",fig:{k:"col",lines:["  45"],res:[],notes:["4 + 5 = 9 ✓"]},sum:"45 ÷ 9 = 5"},
  {cap:"MISTAKE FOUR: a bad guess kept. 552 ÷ 24: 55 ÷ 24 — try 2 (48), 7 left, fine. 72 ÷ 24 = 3. 23. If you tried 3 first, 72 > 55 — go down.",fig:{k:"ld",d:"24",n:"552",q:" 23",work:["-48 ","  72","- 72","   0"]},sum:"552 ÷ 24 = 23"},
  {cap:"MISTAKE FIVE: forgetting to add the remainder back. ? ÷ 9 = 47 r 3 → 47 × 9 = 423, PLUS 3 = 426.",fig:{k:"col",lines:["  47","×  9"],res:[" 423","+  3"," 426"],hl:[[3,3]]},sum:"426"},
  {cap:"And the facts underneath: 63 ÷ 9, 81 ÷ 9, 120 ÷ 4. If these are slow, every long division is slow.",cols:[{l:"7",s:7}],rows:[{l:"9",s:9}],cells:[{v:"63"}],sum:"63 ÷ 9 = 7 · 81 ÷ 9 = 9 · 120 ÷ 4 = 30"}
]},

u2w5p5:{title:"Mission 02 Test",sub:"Friday · the whole mission, and the Big Question",steps:[
  {cap:"Everything from five weeks. Every question is one of these pictures wearing different numbers.",fig:{k:"ld",d:"3",n:"372",q:"124",work:["-3  "," 07 ","- 6 ","  12","- 12","   0"]}},
  {cap:"Division is the missing side. 48 ÷ 6 = 8. 150 ÷ 5 = 30.",cols:[{l:"?",s:8}],rows:[{l:"6",s:6}],cells:[{v:"48"}],sum:"48 ÷ 6 = 8"},
  {cap:"Under the bar, one place at a time, holding every place. 915 ÷ 3 = 305. 3,472 ÷ 8 = 434.",fig:{k:"ld",d:"3",n:"915",q:"305",work:["-9  "," 01 ","- 0 ","  15","- 15","   0"],hl:[[0,1]]},sum:"915 ÷ 3 = 305"},
  {cap:"Two-digit divisors: guess, check, adjust. 945 ÷ 35 = 27. 96 ÷ 16 = 6.",fig:{k:"ld",d:"35",n:"945",q:" 27",work:["-70 "," 245","-245","   0"]},sum:"945 ÷ 35 = 27"},
  {cap:"Divisibility: last digit for 2, 5, 10; digit sum for 3 and 9. 5,346 → 18 → yes, by 9.",fig:{k:"col",lines:["5346"],res:[],notes:["5 + 3 + 4 + 6 = 18 ✓"]},sum:"5346 ÷ 9 = 594"},
  {cap:"The leftover: buses round UP (127 ÷ 30 → 5), cookies SPLIT (26 ÷ 4 = 6.5), patterns keep the REMAINDER (100 ÷ 7 → 2). Check by multiplying back: 23 × 9 + 5 = 212.",fig:{k:"tape",parts:[{v:"↑",l:"buses"},{v:"÷",l:"cookies"},{v:"r",l:"patterns"}],total:"the leftover rule"}},
  {cap:"The Big Question, out loud: what should you do with a leftover? It depends on what the leftover IS. If it is people, one more. If it is cake, cut it. If it is a position in a pattern, it is the answer. Division gives you 6 r 3; the world tells you what to do with it.",fig:{k:"groups",g:4,n:6,extra:3}}
]}

};
window.__CURR = window.__CURR || {};
window.__CURR.LESSONS_AUTHORED = Object.assign(window.__CURR.LESSONS_AUTHORED || {}, L);
})();
