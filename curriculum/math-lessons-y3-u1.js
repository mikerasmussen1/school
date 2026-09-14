/* ============================================================================
 * MATH · YEAR ONE · MISSION 01 — Multiplication Masters · Weeks 2–5
 * ----------------------------------------------------------------------------
 * Hand-authored daily lessons. Same rules as math-lessons-authored.js: one
 * idea per day, numbers taken from that day's own questions, the trap named
 * out loud, short sentences. Every step draws something that TEACHES — an
 * area model built room by room, a number line, a hundred chart, the
 * algorithm with the carry lit up (see curriculum/lesson-figures.js).
 *
 * Loaded after math-lessons-authored.js; merges into LESSONS_AUTHORED, so an
 * entry here beats the generated floor in math-lessons-daily.js.
 * ==========================================================================*/
(function(){
const L={

/* ── WEEK 2 · the algorithm is the rooms ──────────────────────────────────── */

u1w2p1:{title:"Where the Rooms Hide",sub:"Week 2 · the algorithm is the four rooms, written small",steps:[
  {cap:"You know 23 × 14 as four rooms. Today you find those same four rooms hiding inside the written method.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}]},
  {cap:"Here is the algorithm for the same sum. Two lines under the bar: 92 and 230. Where did they come from?",fig:{k:"col",lines:["  23","× 14"],res:["  92","230 ","322"]}},
  {cap:"The 92 is the bottom row of rooms — the 4 times both parts of 23. 4 × 3 = 12 and 4 × 20 = 80.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:""},{v:""},{v:"80"},{v:"12"}],sum:"80 + 12 = 92"},
  {cap:"So that line is two rooms in one number. The algorithm just adds them before you see them.",fig:{k:"col",lines:["  23","× 14"],res:["  92","230 ","322"],hl:[[2,2],[2,3]],notes:["92 = the 4-row: 80 + 12"]}},
  {cap:"The 230 is the top row — the 10 times both parts. 10 × 3 = 30 and 10 × 20 = 200.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:""},{v:""}],sum:"200 + 30 = 230"},
  {cap:"Same picture, written small. Two rows of rooms, two lines under the bar. Add them and you have all four.",fig:{k:"col",lines:["  23","× 14"],res:["  92","230 ","322"],hl:[[3,1],[3,2],[3,3]],notes:["230 = the 10-row: 200 + 30"]},sum:"92 + 230 = 322"},
  {cap:"THE TRAP. Trusting a line you cannot find in the picture. If a line under the bar is not a row of rooms, it is wrong. Find it before you trust it.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"23 × 14 = 322"}
]},

u1w2p2:{title:"Fluency with Carrying",sub:"Week 2 · when a room is too big for its column",steps:[
  {cap:"38 × 24. Today you use the algorithm only. The rooms are for checking, not solving.",fig:{k:"col",lines:["  38","× 24"],res:[]}},
  {cap:"Start with the 4. 4 × 8 = 32. Write the 2, and the 3 tens go up top — that is the carry.",fig:{k:"col",lines:["  38","× 24"],res:["   2"],hl:[[0,3],[1,3]],carry:"  3 ",notes:["4 × 8 = 32 → write 2, carry 3"]}},
  {cap:"Now 4 × 3 tens = 12 tens. Add the 3 you carried: 15 tens. Write 15. First line done: 152.",fig:{k:"col",lines:["  38","× 24"],res:[" 152"],hl:[[0,2],[1,3]],carry:"  3 ",notes:["4 × 3 = 12, plus the carried 3 = 15"]},sum:"4 × 38 = 152"},
  {cap:"Second line is the 2 tens. Write a 0 first — this whole line is tens, so it starts one place left. Then 2 × 8 = 16: write 6, carry 1.",fig:{k:"col",lines:["  38","× 24"],res:[" 152","  60"],hl:[[0,3],[1,2]],carry:" 1  ",notes:["2 × 8 = 16 → write 6, carry 1"]}},
  {cap:"2 × 3 = 6, plus the carried 1 is 7. Second line: 760.",fig:{k:"col",lines:["  38","× 24"],res:[" 152"," 760"],hl:[[0,2],[1,2]],carry:" 1  "},sum:"20 × 38 = 760"},
  {cap:"Add the two lines. 152 + 760 = 912.",fig:{k:"col",lines:["  38","× 24"],res:[" 152"," 760"," 912"],hl:[[4,1],[4,2],[4,3]]},sum:"38 × 24 = 912"},
  {cap:"Check it with rooms. 600 + 160 + 120 + 32 — is that 912? Yes. The two methods must agree, every time.",cols:[{l:"30",s:30},{l:"8",s:8}],rows:[{l:"20",s:20},{l:"4",s:4}],cells:[{v:"600"},{v:"160"},{v:"120"},{v:"32"}],sum:"600 + 160 + 120 + 32 = 912"},
  {cap:"THE TRAP. Adding the carry before you multiply. It is multiply first, THEN add what you carried. 4 × 3 + 3, never 4 × (3 + 3).",fig:{k:"col",lines:["  38","× 24"],res:[" 152"," 760"," 912"],carry:"  3 ",hl:[[0,2]],notes:["multiply, then add the carry"]}}
]},

u1w2p3:{title:"Three Digits by One",sub:"Week 2 · a longer rectangle, three rooms",steps:[
  {cap:"234 × 3. The number is longer, so the rectangle is longer. That is the only change.",cols:[{l:"234",s:29}],rows:[{l:"3",s:5}],cells:[{v:"?"}]},
  {cap:"Cut 234 where the places are: 200, 30 and 4. Three rooms instead of two.",cols:[{l:"200",s:20},{l:"30",s:6},{l:"4",s:3}],rows:[{l:"3",s:5}],cells:[{v:""},{v:""},{v:""}]},
  {cap:"Biggest room first. 3 × 200 = 600. If you know 3 × 2, you know this.",cols:[{l:"200",s:20},{l:"30",s:6},{l:"4",s:3}],rows:[{l:"3",s:5}],cells:[{v:"600"},{v:""},{v:""}]},
  {cap:"3 × 30 = 90.",cols:[{l:"200",s:20},{l:"30",s:6},{l:"4",s:3}],rows:[{l:"3",s:5}],cells:[{v:"600"},{v:"90"},{v:""}]},
  {cap:"3 × 4 = 12. Add the three rooms.",cols:[{l:"200",s:20},{l:"30",s:6},{l:"4",s:3}],rows:[{l:"3",s:5}],cells:[{v:"600"},{v:"90"},{v:"12"}],sum:"234 × 3 = 600 + 90 + 12 = 702"},
  {cap:"The algorithm does the same three rooms right to left. 3 × 4 = 12: write 2, carry 1. 3 × 3 = 9, plus 1 is 10: write 0, carry 1. 3 × 2 = 6, plus 1 is 7.",fig:{k:"col",lines:[" 234","×  3"],res:[" 702"],carry:" 11 ",hl:[[2,1],[2,2],[2,3]]},sum:"234 × 3 = 702"},
  {cap:"THE TRAP. Forgetting the middle room. 508 × 7 has a zero in the tens, and that room is worth exactly 0 — but you still have to carry through it. 7 × 8 = 56, carry 5. 7 × 0 = 0, plus 5 is 5. 7 × 5 = 35.",fig:{k:"col",lines:[" 508","×  7"],res:["3556"],carry:" 5  ",hl:[[0,2],[2,2]],notes:["the 0 room still takes the carry"]},sum:"508 × 7 = 3,556"}
]},

u1w2p4:{title:"Estimate First",sub:"Week 2 · a wrong answer should look wrong",steps:[
  {cap:"Before you multiply, guess the size. 187 × 4: 187 is nearly 200, and 200 × 4 is easy.",fig:{k:"nl",min:0,max:1000,step:100,marks:[{v:800,l:"≈ 800"}]},sum:"187 × 4 ≈ 200 × 4 = 800"},
  {cap:"Now do it properly. 748. Where does that land? Just under 800, which is exactly where 187 being just under 200 should put it.",fig:{k:"nl",min:0,max:1000,step:100,marks:[{v:800,l:"estimate",c:"#FBBF24"},{v:748,l:"748",up:18}]},sum:"187 × 4 = 748"},
  {cap:"Round both numbers when there are two. 62 × 38 becomes 60 × 40. Six fours are twenty-four, so 2,400.",fig:{k:"nl",min:0,max:3000,step:500,marks:[{v:2400,l:"≈ 2400"}]},sum:"62 × 38 ≈ 60 × 40 = 2400"},
  {cap:"The true answer is 2,356. Close to the estimate — so you believe it.",fig:{k:"nl",min:2000,max:3000,step:100,marks:[{v:2400,l:"estimate",c:"#FBBF24"},{v:2356,l:"2356",up:18}]},sum:"62 × 38 = 2356"},
  {cap:"Now the point of all this. Someone says 43 × 27 = 301. Estimate: 40 × 30 = 1,200. Is 301 anywhere near 1,200?",fig:{k:"nl",min:0,max:1500,step:300,marks:[{v:301,l:"301?",c:"#FB7185"},{v:1200,l:"≈ 1200",c:"#FBBF24"}]}},
  {cap:"No. It is not even close, so it is wrong — and you knew that without doing the sum. The real answer is 1,161.",fig:{k:"nl",min:0,max:1500,step:300,marks:[{v:1161,l:"1161"},{v:1200,l:"≈ 1200",c:"#FBBF24",up:18}]},sum:"43 × 27 = 1161, near 1200 ✓"},
  {cap:"THE TRAP. Estimating after you have an answer. Then you just talk yourself into it. Round, predict, compute, compare — in that order.",fig:{k:"nl",min:0,max:1500,step:300,marks:[{v:1200,l:"predict first",c:"#FBBF24"}]}}
]},

u1w2p5:{title:"Lattice Detour",sub:"Friday · a 500-year-old method",steps:[
  {cap:"Enrichment. The lattice method draws a grid with one cell per pair of digits. 23 × 14 has two digits each, so four cells — the same four rooms.",cols:[{l:"2",s:6},{l:"3",s:6}],rows:[{l:"1",s:6},{l:"4",s:6}],cells:[{v:""},{v:""},{v:""},{v:""}]},
  {cap:"Fill each cell with the product of its digits, written as two digits. 2 × 1 = 02. 3 × 1 = 03.",cols:[{l:"2",s:6},{l:"3",s:6}],rows:[{l:"1",s:6},{l:"4",s:6}],cells:[{v:"02"},{v:"03"},{v:""},{v:""}]},
  {cap:"2 × 4 = 08. 3 × 4 = 12. No carrying yet — that is the trick of it.",cols:[{l:"2",s:6},{l:"3",s:6}],rows:[{l:"1",s:6},{l:"4",s:6}],cells:[{v:"02"},{v:"03"},{v:"08"},{v:"12"}]},
  {cap:"Now add along the diagonals, starting bottom right. The ones diagonal has just the 2 of 12. Then 1 + 8 + 3 = 12: write 2, carry 1. Then 0 + 0 + 2, plus the carry, is 3.",fig:{k:"col",lines:["   2","  12","+ 3 "],res:[" 322"],hl:[[3,1],[3,2],[3,3]],notes:["ones · tens · hundreds diagonals"]},sum:"23 × 14 = 322"},
  {cap:"Same answer as the rooms and the algorithm. It has to be — it is the same four products, sorted a different way.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"200 + 30 + 80 + 12 = 322"},
  {cap:"Three digits by two: six cells. 456 × 23 by lattice comes to 10,488. Try it on paper and see whether it beats your method. It is allowed to lose.",cols:[{l:"4",s:5},{l:"5",s:5},{l:"6",s:5}],rows:[{l:"2",s:5},{l:"3",s:5}],cells:[{v:"08"},{v:"10"},{v:"12"},{v:"12"},{v:"15"},{v:"18"}],sum:"456 × 23 = 10,488"}
]},

/* ── WEEK 3 · factor pairs are rectangles ─────────────────────────────────── */

u1w3p1:{title:"Factor Pairs",sub:"Week 3 · every rectangle you can build",steps:[
  {cap:"A factor pair is two numbers that multiply to make yours. Every one of them is a rectangle. Here is 24 as 1 × 24.",cols:[{l:"24",s:24}],rows:[{l:"1",s:1}],cells:[{v:"24"}]},
  {cap:"2 × 12. Shorter and taller. Still 24 squares inside.",cols:[{l:"12",s:12}],rows:[{l:"2",s:2}],cells:[{v:"24"}]},
  {cap:"3 × 8.",cols:[{l:"8",s:8}],rows:[{l:"3",s:3}],cells:[{v:"24"}]},
  {cap:"4 × 6. Try 5 — twenty-four dots will not make five equal rows. Not a factor.",cols:[{l:"6",s:6}],rows:[{l:"4",s:4}],cells:[{v:"24"}]},
  {cap:"Try 6 and you get 6 × 4, which is the last one on its side. Stop. Four rectangles, four factor pairs.",cols:[{l:"6",s:6}],rows:[{l:"4",s:4}],cells:[{v:"24"}],sum:"24: 1×24, 2×12, 3×8, 4×6 — four pairs"},
  {cap:"Is 7 a factor of 20? Try to build it. Seven rows of 20 dots — you get two full rows and six left over. No.",dots:{r:3,c:7,split:6},sum:"20 = 2 rows of 7, plus 6 — so 7 is not a factor"},
  {cap:"THE TRAP. Forgetting the skinny one. 1 × the number is always a pair, so 1 is a factor of everything and the number is its own biggest factor.",cols:[{l:"20",s:20}],rows:[{l:"1",s:1}],cells:[{v:"20"}],sum:"Smallest factor of 20 is 1. Largest is 20."}
]},

u1w3p2:{title:"Factor Rainbows",sub:"Week 3 · draw the arcs, watch where they stop",steps:[
  {cap:"Write the factors of 16 in order and join each pair with an arc. 1 pairs with 16.",fig:{k:"nl",min:0,max:17,step:1,labels:[1,2,4,8,16],marks:[{v:1,l:"1"},{v:16,l:"16"}],jumps:[{a:1,b:16,l:"1 × 16"}]}},
  {cap:"2 pairs with 8. The arc sits inside the first one.",fig:{k:"nl",min:0,max:17,step:1,labels:[1,2,4,8,16],marks:[{v:1},{v:16},{v:2,l:"2"},{v:8,l:"8"}],jumps:[{a:1,b:16,l:"1 × 16"},{a:2,b:8,l:"2 × 8"}]}},
  {cap:"4 pairs with… 4. It is its own partner, so it stands alone in the middle. That is the rainbow — and the lonely middle means 16 is a square.",fig:{k:"nl",min:0,max:17,step:1,labels:[1,2,4,8,16],marks:[{v:1},{v:16},{v:2},{v:8},{v:4,l:"4",c:"#FBBF24"}],jumps:[{a:1,b:16,l:"1 × 16"},{a:2,b:8,l:"2 × 8"}]},sum:"Factors of 16: 1, 2, 4, 8, 16 — five of them"},
  {cap:"The middle is where you stop testing. For 36, the middle is 6 — because 6 × 6 = 36. Nothing above 6 is a new pair; it is an old pair turned round.",fig:{k:"nl",min:0,max:37,step:1,labels:[1,2,3,4,6,9,12,18,36],marks:[{v:6,l:"stop here",c:"#FBBF24"}],jumps:[{a:1,b:36},{a:2,b:18},{a:3,b:12},{a:4,b:9}]},sum:"Test up to 6 for 36. Test up to 10 for 100."},
  {cap:"9 has three factors: 1, 3, 9. A tiny rainbow with an unpaired 3 in the middle.",fig:{k:"nl",min:0,max:10,step:1,marks:[{v:1,l:"1"},{v:9,l:"9"},{v:3,l:"3",c:"#FBBF24"}],jumps:[{a:1,b:9,l:"1 × 9"}]},sum:"Factors of 9: 1, 3, 9"},
  {cap:"THE TRAP. Counting a pair twice. 2 × 8 and 8 × 2 are one arc, not two. The rainbow makes that impossible to get wrong, which is why you draw it.",fig:{k:"nl",min:0,max:25,step:1,labels:[1,2,3,4,6,8,12,24],jumps:[{a:1,b:24},{a:2,b:12},{a:3,b:8},{a:4,b:6}]},sum:"24 has 4 arcs — 8 factors"}
]},

u1w3p3:{title:"Common Factors",sub:"Week 3 · what two numbers share",steps:[
  {cap:"12 and 18. Skip-count in 3s and you land on both. So 3 is a factor they share — a common factor.",fig:{k:"nl",min:0,max:18,step:1,labels:[0,3,6,9,12,15,18],jumps:[{a:0,b:3},{a:3,b:6},{a:6,b:9},{a:9,b:12},{a:12,b:15},{a:15,b:18}],marks:[{v:12,l:"12"},{v:18,l:"18"}]},sum:"3 divides 12 and 18"},
  {cap:"Try 6. Two jumps to 12, three jumps to 18. Also shared — and bigger.",fig:{k:"nl",min:0,max:18,step:1,labels:[0,6,12,18],jumps:[{a:0,b:6,l:"6",c:"#4ADE80"},{a:6,b:12,l:"6",c:"#4ADE80"},{a:12,b:18,l:"6",c:"#4ADE80"}],marks:[{v:12,l:"12"},{v:18,l:"18"}]},sum:"6 divides 12 and 18"},
  {cap:"Try 9. It hits 18 but jumps straight over 12. Not shared. So the GREATEST common factor of 12 and 18 is 6.",fig:{k:"nl",min:0,max:18,step:1,labels:[0,9,12,18],jumps:[{a:0,b:9,l:"9",c:"#FB7185"},{a:9,b:18,l:"9",c:"#FB7185"}],marks:[{v:12,l:"missed",c:"#FB7185"},{v:18,l:"18"}]},sum:"GCF of 12 and 18 = 6"},
  {cap:"The long way is to list both rainbows and pick the biggest number in both. 24: 1, 2, 3, 4, 6, 8, 12, 24. 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. Biggest in both: 12.",fig:{k:"nl",min:0,max:37,step:1,labels:[1,2,3,4,6,12,24,36],marks:[{v:12,l:"12",c:"#FBBF24"},{v:24,l:"24"},{v:36,l:"36"}],jumps:[{a:0,b:12},{a:12,b:24},{a:24,b:36}]},sum:"GCF of 24 and 36 = 12"},
  {cap:"Sometimes the only thing shared is 1. 3 and 7 — nothing else divides both. Numbers like that are called coprime.",fig:{k:"nl",min:0,max:8,step:1,marks:[{v:3,l:"3"},{v:7,l:"7"},{v:1,l:"1",c:"#FBBF24"}]},sum:"GCF of 3 and 7 = 1 — coprime"},
  {cap:"THE TRAP. Stopping at the first common factor you find. 3 is common to 12 and 18, but you were asked for the GREATEST. Keep going until nothing bigger works.",fig:{k:"nl",min:0,max:18,step:1,labels:[0,6,12,18],jumps:[{a:0,b:6,c:"#4ADE80"},{a:6,b:12,c:"#4ADE80"},{a:12,b:18,c:"#4ADE80"}],marks:[{v:6,l:"greatest",c:"#4ADE80"}]}}
]},

u1w3p4:{title:"Square Numbers",sub:"Week 3 · why squares have an odd number of factors",steps:[
  {cap:"3 × 3. When both sides match, the rectangle is a square, and the answer is called a square number.",cols:[{l:"3",s:3}],rows:[{l:"3",s:3}],cells:[{v:"9"}],sum:"3 × 3 = 9"},
  {cap:"5 × 5 = 25. Same shape, bigger.",cols:[{l:"5",s:5}],rows:[{l:"5",s:5}],cells:[{v:"25"}],sum:"5 × 5 = 25"},
  {cap:"8 × 8 = 64. The squares below 100 are 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 — ten of them. Worth knowing on sight.",cols:[{l:"8",s:8}],rows:[{l:"8",s:8}],cells:[{v:"64"}],sum:"1 4 9 16 25 36 49 64 81 100"},
  {cap:"Now the rainbow for 25. 1 pairs with 25. 5 pairs with itself. That middle one has no partner.",fig:{k:"nl",min:0,max:26,step:1,labels:[1,5,25],marks:[{v:1,l:"1"},{v:25,l:"25"},{v:5,l:"5 × 5",c:"#FBBF24"}],jumps:[{a:1,b:25,l:"1 × 25"}]},sum:"Factors of 25: 1, 5, 25 — three"},
  {cap:"Every other number pairs its factors two by two, so the count is even. A square has one factor that pairs with itself, so the count is odd. That is the whole reason.",fig:{k:"nl",min:0,max:37,step:1,labels:[1,2,3,4,6,9,12,18,36],marks:[{v:6,l:"6 × 6",c:"#FBBF24"}],jumps:[{a:1,b:36},{a:2,b:18},{a:3,b:12},{a:4,b:9}]},sum:"Factors of 36: nine — odd, because 6 stands alone"},
  {cap:"THE TRAP. Thinking 'square' means the digit is doubled. 12 × 12 is not 24. It is 144 — twelve rows of twelve.",cols:[{l:"12",s:12}],rows:[{l:"12",s:12}],cells:[{v:"144"}],sum:"12 × 12 = 144"}
]},

u1w3p5:{title:"Mid-Unit Quiz",sub:"Friday · three weeks, four ideas",steps:[
  {cap:"Nothing new today. Four ideas from three weeks — if one feels shaky, that is the lesson to reopen.",cols:[{l:"30",s:30},{l:"4",s:4}],rows:[{l:"8",s:8}],cells:[{v:"240"},{v:"32"}]},
  {cap:"ONE: a hard multiplication is two easy rooms. 8 × 34 is 8 × 30 and 8 × 4.",cols:[{l:"30",s:30},{l:"4",s:4}],rows:[{l:"8",s:8}],cells:[{v:"240"},{v:"32"}],sum:"8 × 34 = 240 + 32 = 272"},
  {cap:"TWO: two digits by two digits is four rooms, and the algorithm is those rooms in two lines.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"23 × 14 = 322"},
  {cap:"THREE: estimate before you compute. 39 × 21 is about 40 × 20.",fig:{k:"nl",min:0,max:1000,step:100,marks:[{v:800,l:"≈ 800"}]},sum:"39 × 21 ≈ 800"},
  {cap:"FOUR: a factor pair is a rectangle, and a missing side is a division. Area 84, one side 6 — the other side is 14.",cols:[{l:"?",s:14}],rows:[{l:"6",s:6}],cells:[{v:"84"}],sum:"84 ÷ 6 = 14"},
  {cap:"And the greatest common factor is the biggest jump that lands on both numbers.",fig:{k:"nl",min:0,max:18,step:1,labels:[0,6,12,18],jumps:[{a:0,b:6,c:"#4ADE80"},{a:6,b:12,c:"#4ADE80"},{a:12,b:18,c:"#4ADE80"}],marks:[{v:12,l:"12"},{v:18,l:"18"}]},sum:"GCF of 12 and 18 = 6"}
]},

/* ── WEEK 4 · primes are skinny rectangles ────────────────────────────────── */

u1w4p1:{title:"Multiples",sub:"Week 4 · skip-count and watch the pattern",steps:[
  {cap:"The multiples of 4 are what you land on skip-counting in 4s. On a hundred chart they make stripes.",fig:{k:"g100",nums:true,rows:5,cells:[4,8,12,16,20,24,28,32,36,40,44,48]},sum:"4, 8, 12, 16, 20…"},
  {cap:"The third multiple of 4 is the third one you land on: 12. The tenth multiple of 5 is 50.",fig:{k:"nl",min:0,max:24,step:1,labels:[0,4,8,12,16,20,24],jumps:[{a:0,b:4,l:"1st"},{a:4,b:8,l:"2nd"},{a:8,b:12,l:"3rd"}],marks:[{v:12,l:"12"}]},sum:"3rd multiple of 4 = 12"},
  {cap:"Now the multiples of 6 in pink. Look where the two patterns cross.",fig:{k:"g100",nums:true,rows:5,cells:[4,8,12,16,20,24,28,32,36,40,44,48],cells2:[6,18,30,42]},sum:"6, 12, 18, 24, 30, 36, 42, 48"},
  {cap:"12 is the first number in both lists. That is the lowest common multiple of 4 and 6 — not 24, which is common but not lowest.",fig:{k:"nl",min:0,max:24,step:1,labels:[0,4,6,8,12,16,18,20,24],jumps:[{a:0,b:4},{a:4,b:8},{a:8,b:12},{a:0,b:6,c:"#F472B6"},{a:6,b:12,c:"#F472B6"}],marks:[{v:12,l:"12",c:"#FBBF24"}]},sum:"LCM of 4 and 6 = 12"},
  {cap:"Is 22 a multiple of 3? Skip-count: 3, 6, 9, 12, 15, 18, 21, 24. You jump straight over it. No.",fig:{k:"nl",min:0,max:24,step:1,labels:[0,3,6,9,12,15,18,21,24],jumps:[{a:0,b:3},{a:3,b:6},{a:6,b:9},{a:9,b:12},{a:12,b:15},{a:15,b:18},{a:18,b:21},{a:21,b:24}],marks:[{v:22,l:"22 — missed",c:"#FB7185"}]}},
  {cap:"THE TRAP. Mixing up factors and multiples. Factors of 12 are small and go INTO 12. Multiples of 12 are big and are MADE FROM 12 — 12, 24, 36, and they never stop.",fig:{k:"nl",min:0,max:48,step:12,marks:[{v:12,l:"12"},{v:24,l:"24"},{v:36,l:"36"},{v:48,l:"48"}]}}
]},

u1w4p2:{title:"Divisibility Rules",sub:"Week 4 · tests you can do without dividing",steps:[
  {cap:"Divisible by 2: the last digit is even. Divisible by 5: it ends in 0 or 5. Divisible by 10: it ends in 0. Only the ones digit matters, because every ten is already a multiple of 2, 5 and 10.",fig:{k:"b10",t:4,o:8},sum:"48 — ends in 8 → divisible by 2"},
  {cap:"The 3 rule is the strange one: add the digits. 51 → 5 + 1 = 6, and 6 is in the 3 times table, so 51 is divisible by 3. Why on earth does that work?",fig:{k:"col",lines:["  51"],res:[],notes:["5 + 1 = 6 → divisible by 3"]}},
  {cap:"Here is 51 as five tens and one. Every ten is 9 + 1. So 51 is five 9s, plus five 1s, plus one more.",fig:{k:"b10",t:5,o:1},sum:"51 = 5 × 9  +  5 + 1"},
  {cap:"The five 9s are already divisible by 3. What is left is 5 + 1 — the digit sum. If THAT divides by 3, the whole number does. The rule is not magic; it is the nines hiding inside every ten.",fig:{k:"tape",parts:[{v:"45",s:45,l:"five 9s"},{v:"6",s:6,l:"5 + 1"}],total:"51"},sum:"45 is 3 × 15, and 6 is 3 × 2 — so 51 is too"},
  {cap:"Same trick for 9, since every 10 is 9 + 1. 738 → 7 + 3 + 8 = 18. 18 is in the 9s, so 738 is divisible by 9.",fig:{k:"col",lines:[" 738"],res:[],notes:["7 + 3 + 8 = 18 → divisible by 9"]},sum:"738 ÷ 9 = 82"},
  {cap:"A number divisible by both 2 and 3 is divisible by 6. Check both rules, and you have checked for 6 too.",fig:{k:"nl",min:0,max:24,step:1,labels:[0,6,12,18,24],jumps:[{a:0,b:6},{a:6,b:12},{a:12,b:18},{a:18,b:24}]}},
  {cap:"THE TRAP. Using the last digit for 3. Ending in 3 means nothing — 13 is not divisible by 3, and 51 is. For 3 and 9 it is the digit SUM, every time.",fig:{k:"col",lines:["  13","  51"],res:[],hl:[[0,3]],notes:["1 + 3 = 4 ✗      5 + 1 = 6 ✓"]}}
]},

u1w4p3:{title:"Primes & Composites",sub:"Week 4 · the skinny rectangles",steps:[
  {cap:"7 dots. Try to make a rectangle that is more than one row deep. You cannot — 7 only builds the skinny 1 × 7. That is what prime means: exactly two factors, 1 and itself.",cols:[{l:"7",s:7}],rows:[{l:"1",s:1}],cells:[{v:"7"}],sum:"7 is prime — factors: 1, 7"},
  {cap:"9 dots make 3 × 3 as well as 1 × 9. More than two factors — so 9 is composite.",cols:[{l:"3",s:3}],rows:[{l:"3",s:3}],cells:[{v:"9"}],sum:"9 is composite — factors: 1, 3, 9"},
  {cap:"Now the sieve. Write 1 to 50. Cross out every multiple of 2 past 2 itself.",fig:{k:"g100",cross:true,nums:true,rows:5,cells:[4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50]}},
  {cap:"Cross out the multiples of 3 past 3, then of 5 past 5, then of 7 past 7. Everything crossed out had a rectangle, so it is composite.",fig:{k:"g100",cross:true,nums:true,rows:5,cells:[4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50]}},
  {cap:"What survives is prime. Fifteen of them below 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47. And 1 is not on the list — it has only ONE factor, not two.",fig:{k:"g100",cross:true,nums:true,rows:5,cells:[4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50],cells2:[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]},sum:"15 primes below 50 · 25 below 100"},
  {cap:"2 is the only even prime, because every other even number has 2 as a factor. And 51 looks prime but is not: 5 + 1 = 6, so 3 divides it. 51 = 3 × 17.",cols:[{l:"17",s:17}],rows:[{l:"3",s:3}],cells:[{v:"51"}],sum:"51 = 3 × 17 — composite"},
  {cap:"THE TRAP. Trusting a number because it looks odd and awkward. 91 = 7 × 13. Always test the primes up to the square root before you call it prime. The largest prime below 100 is 97.",cols:[{l:"13",s:13}],rows:[{l:"7",s:7}],cells:[{v:"91"}],sum:"91 = 7 × 13"}
]},

u1w4p4:{title:"Prime Factor Trees",sub:"Week 4 · break it down until only primes are left",steps:[
  {cap:"12. Split it into any factor pair you like. Say 2 × 6.",cols:[{l:"2",s:2}],rows:[{l:"6",s:6}],cells:[{v:"12"}],sum:"12 = 2 × 6"},
  {cap:"2 is prime — it stops. 6 is not, so split it too: 2 × 3.",cols:[{l:"2",s:2}],rows:[{l:"3",s:3},{l:"3",s:3}],cells:[{v:"6"},{v:"6"}],sum:"6 = 2 × 3"},
  {cap:"Now every piece is prime. 12 = 2 × 2 × 3. Three prime factors, counting the repeated 2.",fig:{k:"tape",parts:[{v:"2"},{v:"2"},{v:"3"}],total:"12 = 2 × 2 × 3"},sum:"prime factors of 12: 2, 2, 3"},
  {cap:"Start a different way — 3 × 4 — and you still end at 2 × 2 × 3. Every number has exactly one prime factorisation. The tree can look different; the leaves cannot.",fig:{k:"tape",parts:[{v:"3",c:"#F472B6"},{v:"2"},{v:"2"}],total:"12 = 3 × 4 = 3 × 2 × 2"}},
  {cap:"60. Split off tens: 6 × 10. Then 6 = 2 × 3 and 10 = 2 × 5.",fig:{k:"tape",parts:[{v:"2"},{v:"3"},{v:"2"},{v:"5"}],total:"60 = 6 × 10"},sum:"60 = 2 × 2 × 3 × 5 — largest prime factor 5"},
  {cap:"84 = 4 × 21 = 2 × 2 × 3 × 7. The largest prime factor is 7.",fig:{k:"tape",parts:[{v:"2"},{v:"2"},{v:"3"},{v:"7",c:"#FBBF24"}],total:"84"},sum:"largest prime factor of 84 = 7"},
  {cap:"THE TRAP. Stopping at a composite. 36 = 4 × 9 is not finished — 4 and 9 both split again. Keep going until every leaf is on the prime list.",fig:{k:"tape",parts:[{v:"2"},{v:"2"},{v:"3"},{v:"3"}],total:"36 = 4 × 9 = 2 × 2 × 3 × 3"},sum:"prime factors of 36: four, counting repeats"}
]},

u1w4p5:{title:"Twin Primes",sub:"Friday · pairs two apart",steps:[
  {cap:"Enrichment. Here are the primes below 50 on a line. Some of them come in pairs, two apart.",fig:{k:"nl",min:0,max:50,step:1,labels:[0,10,20,30,40,50],marks:[{v:2},{v:3},{v:5},{v:7},{v:11},{v:13},{v:17},{v:19},{v:23},{v:29},{v:31},{v:37},{v:41},{v:43},{v:47}]}},
  {cap:"3 and 5. 5 and 7. 11 and 13. 17 and 19. 29 and 31. 41 and 43. Six twin pairs below 50.",fig:{k:"nl",min:0,max:50,step:1,labels:[0,10,20,30,40,50],marks:[{v:3},{v:5},{v:7},{v:11},{v:13},{v:17},{v:19},{v:29},{v:31},{v:41},{v:43}],jumps:[{a:3,b:5,c:"#FBBF24"},{a:5,b:7,c:"#FBBF24"},{a:11,b:13,c:"#FBBF24"},{a:17,b:19,c:"#FBBF24"},{a:29,b:31,c:"#FBBF24"},{a:41,b:43,c:"#FBBF24"}]},sum:"6 twin pairs below 50"},
  {cap:"Why two apart and never one apart? Two numbers next to each other — one of them is even, and the only even prime is 2. So 2 and 3 are the only primes one apart, ever.",fig:{k:"nl",min:0,max:10,step:1,marks:[{v:2,l:"2",c:"#FBBF24"},{v:3,l:"3",c:"#FBBF24"},{v:5},{v:7}],jumps:[{a:2,b:3,l:"the only pair 1 apart",c:"#FBBF24"}]}},
  {cap:"Do the twins ever run out? Nobody knows. Mathematicians think there are infinitely many and have not been able to prove it. That is an open question, and you now know one.",fig:{k:"nl",min:0,max:50,step:1,labels:[0,10,20,30,40,50],jumps:[{a:3,b:5},{a:5,b:7},{a:11,b:13},{a:17,b:19},{a:29,b:31},{a:41,b:43}]}},
  {cap:"Back to earth for the practice: the algorithm. 26 × 12 — two lines, then add.",fig:{k:"col",lines:["  26","× 12"],res:["  52","260 ","312"]},sum:"26 × 12 = 312"}
]},

/* ── WEEK 5 · working the method backwards ────────────────────────────────── */

u1w5p1:{title:"Missing-Digit Puzzles",sub:"Week 5 · the last digit gives it away",steps:[
  {cap:"3 × 4? = 129. A digit is hidden. Do not guess — reason from the ones.",fig:{k:"col",lines:["  4?","×  3"],res:[" 129"],hl:[[0,3]]}},
  {cap:"The answer ends in 9. What times 3 ends in 9? 3 × 3 = 9. Only one digit works.",fig:{k:"col",lines:["  43","×  3"],res:[" 129"],hl:[[0,3],[2,3]],notes:["? × 3 ends in 9 → ? = 3"]},sum:"3 × 43 = 129 ✓"},
  {cap:"? × 14 = 322. You know this one from the rooms. But reason it anyway: what times 4 ends in 2? 3 × 4 = 12, or 8 × 4 = 32.",fig:{k:"col",lines:["  ??","× 14"],res:[" 322"],hl:[[2,3]]}},
  {cap:"Try 23: 23 × 14 = 322. Yes. (28 × 14 would be 392 — too big.) Check by working forwards.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"23 × 14 = 322"},
  {cap:"2? × 3 = 84. Ends in 4: what times 3 ends in 4? 8 × 3 = 24. So the digit is 8, and 28 × 3 = 84.",fig:{k:"col",lines:["  28","×  3"],res:["  84"],hl:[[0,3],[2,3]]},sum:"28 × 3 = 84"},
  {cap:"4? × 5 ends in 5. Anything odd times 5 ends in 5 — so the digit could be 1, 3, 5, 7 or 9. The smallest is 1. Sometimes the ones digit narrows it down; it does not always finish the job.",fig:{k:"col",lines:["  4?","×  5"],res:[" ??5"],hl:[[0,3]],notes:["odd × 5 ends in 5"]}},
  {cap:"THE TRAP. Forgetting to check. A digit that fits the ones place might not fit the whole answer. Fill it in, multiply forwards, and see the exact number come out.",fig:{k:"col",lines:["  43","×  3"],res:[" 129"]}}
]},

u1w5p2:{title:"Launch Bay Blueprint",sub:"Week 5 · one hangar, two ways to find its area",steps:[
  {cap:"A hangar 14 long and 12 wide. Area is the space inside: 14 × 12 squares.",fig:{k:"poly",pts:[[0,0],[14,0],[14,12],[0,12]],sides:["14","12","",""],right:[0,1,2,3],grid:true,inner:"?"}},
  {cap:"First way: split at 10. A 10 by 12 part and a 4 by 12 part. Two rooms.",cols:[{l:"10",s:10},{l:"4",s:4}],rows:[{l:"12",s:12}],cells:[{v:"120"},{v:"48"}],sum:"120 + 48 = 168"},
  {cap:"Second way: the algorithm. 14 × 12 — 28 and 140. Same 168. If the two ways disagree, one of them is wrong.",fig:{k:"col",lines:["  14","× 12"],res:["  28","140 ","168"]},sum:"14 × 12 = 168"},
  {cap:"Perimeter is a different question: the fence around the outside. 14 + 12 + 14 + 12 = 52. You ADD sides for perimeter; you MULTIPLY them for area.",fig:{k:"poly",pts:[[0,0],[14,0],[14,12],[0,12]],sides:["14","12","14","12"],right:[0,1,2,3],inner:"168"},sum:"perimeter 52 · area 168"},
  {cap:"A square hangar with area 144: both sides the same, and 12 × 12 = 144. So each side is 12.",cols:[{l:"12",s:12}],rows:[{l:"12",s:12}],cells:[{v:"144"}],sum:"side = 12"},
  {cap:"Double both sides of the 14 by 12 hangar: 28 by 24. Twice as long AND twice as wide — the area is four times bigger, not two. 672.",cols:[{l:"14",s:14},{l:"14",s:14}],rows:[{l:"12",s:12},{l:"12",s:12}],cells:[{v:"168"},{v:"168"},{v:"168"},{v:"168"}],sum:"4 × 168 = 672"},
  {cap:"THE TRAP. Mixing perimeter and area. A 10 by 8 bay has area 80 and perimeter 36 — two different numbers for two different questions. Read which one is asked.",fig:{k:"poly",pts:[[0,0],[10,0],[10,8],[0,8]],sides:["10","8","10","8"],right:[0,1,2,3],inner:"80"},sum:"area 80 · perimeter 36"}
]},

u1w5p3:{title:"Blueprint Defence",sub:"Week 5 · both methods must agree, and you say why",steps:[
  {cap:"36 × 25 by rooms. Cut 36 into 30 and 6, cut 25 into 20 and 5. Four rooms.",cols:[{l:"30",s:30},{l:"6",s:6}],rows:[{l:"20",s:20},{l:"5",s:5}],cells:[{v:""},{v:""},{v:""},{v:""}]},
  {cap:"600, 120, 150, 30. Add: 900.",cols:[{l:"30",s:30},{l:"6",s:6}],rows:[{l:"20",s:20},{l:"5",s:5}],cells:[{v:"600"},{v:"120"},{v:"150"},{v:"30"}],sum:"600 + 120 + 150 + 30 = 900"},
  {cap:"36 × 25 by algorithm. The 5-line: 5 × 36 = 180. That is the bottom row of rooms, 150 + 30.",fig:{k:"col",lines:["  36","× 25"],res:[" 180"],hl:[[2,1],[2,2],[2,3]],notes:["180 = 150 + 30"]}},
  {cap:"The 20-line: 20 × 36 = 720. That is the top row, 600 + 120. Add: 900. They agree — and now you can say WHY they agree.",fig:{k:"col",lines:["  36","× 25"],res:[" 180"," 720"," 900"],hl:[[3,1],[3,2],[3,3]],notes:["720 = 600 + 120"]},sum:"36 × 25 = 900"},
  {cap:"Three digits by two digits: six rooms. 124 × 23 — three columns, two rows.",cols:[{l:"100",s:20},{l:"20",s:6},{l:"4",s:3}],rows:[{l:"20",s:8},{l:"3",s:3}],cells:[{v:"2000"},{v:"400"},{v:"80"},{v:"300"},{v:"60"},{v:"12"}],sum:"124 × 23 = 2852"},
  {cap:"THE TRAP. Saying 'they agree because they got the same answer'. That is the result, not the reason. The reason: each line of the algorithm IS a row of rooms. Same pieces, added in a different order.",fig:{k:"col",lines:[" 124","× 23"],res:[" 372","2480","2852"]},sum:"372 = 300 + 60 + 12 · 2480 = 2000 + 400 + 80"}
]},

u1w5p4:{title:"Error Journal Sweep",sub:"Thursday · fix only what repeats",steps:[
  {cap:"Today is built from the mistakes this mission produces most. Look for the one YOU keep making.",cols:[{l:"30",s:30},{l:"8",s:8}],rows:[{l:"20",s:20},{l:"4",s:4}],cells:[{v:"600"},{v:"160"},{v:"120"},{v:"32"}]},
  {cap:"MISTAKE ONE: losing the small corner. 38 × 24 has four rooms and the 8 × 4 = 32 is the one that goes missing. Count your rooms.",cols:[{l:"30",s:30},{l:"8",s:8}],rows:[{l:"20",s:20},{l:"4",s:4}],cells:[{v:"600"},{v:"160"},{v:"120"},{v:"32"}],sum:"38 × 24 = 912"},
  {cap:"MISTAKE TWO: calling 9 prime because it is odd. 9 = 3 × 3. Odd does not mean prime.",cols:[{l:"3",s:3}],rows:[{l:"3",s:3}],cells:[{v:"9"}],sum:"9 is composite"},
  {cap:"MISTAKE THREE: miscounting factors of a square. 16: 1, 2, 4, 8, 16 — five, because 4 pairs with itself.",fig:{k:"nl",min:0,max:17,step:1,labels:[1,2,4,8,16],marks:[{v:4,l:"4",c:"#FBBF24"}],jumps:[{a:1,b:16},{a:2,b:8}]},sum:"Factors of 16: five"},
  {cap:"MISTAKE FOUR: a GCF that is common but not greatest. 24 and 36 share 2, 3, 4, 6 and 12. The answer is 12.",fig:{k:"nl",min:0,max:37,step:1,labels:[0,12,24,36],jumps:[{a:0,b:12},{a:12,b:24},{a:24,b:36}],marks:[{v:24,l:"24"},{v:36,l:"36"}]},sum:"GCF of 24 and 36 = 12"},
  {cap:"MISTAKE FIVE: a factor tree that stops early. 84 = 4 × 21 is not done. 2 × 2 × 3 × 7, largest prime factor 7.",fig:{k:"tape",parts:[{v:"2"},{v:"2"},{v:"3"},{v:"7",c:"#FBBF24"}],total:"84"},sum:"largest prime factor of 84 = 7"},
  {cap:"And always: estimate first. 296 × 5 is about 300 × 5 = 1,500. If your working says 14,800 or 148, the estimate catches it.",fig:{k:"nl",min:0,max:2000,step:500,marks:[{v:1500,l:"≈ 1500"},{v:1480,l:"1480",up:18,c:"#4ADE80"}]},sum:"296 × 5 = 1480"}
]},

u1w5p5:{title:"Mission 01 Test",sub:"Friday · the whole mission, and the Big Question",steps:[
  {cap:"Everything from five weeks. Nothing here is new — every question is one of these pictures wearing different numbers.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}]},
  {cap:"One digit by two: two rooms. 6 × 47 = 240 + 42.",cols:[{l:"40",s:40},{l:"7",s:7}],rows:[{l:"6",s:6}],cells:[{v:"240"},{v:"42"}],sum:"6 × 47 = 282"},
  {cap:"Two by two: four rooms, or two lines. 45 × 23.",fig:{k:"col",lines:["  45","× 23"],res:[" 135"," 900","1035"]},sum:"45 × 23 = 1035"},
  {cap:"Three by one: three rooms. 326 × 4.",cols:[{l:"300",s:20},{l:"20",s:5},{l:"6",s:3}],rows:[{l:"4",s:5}],cells:[{v:"1200"},{v:"80"},{v:"24"}],sum:"326 × 4 = 1304"},
  {cap:"Factors: rectangles, and a rainbow to count them. 36 has five pairs. 16 and 40 share 8 at most.",fig:{k:"nl",min:0,max:37,step:1,labels:[1,2,3,4,6,9,12,18,36],jumps:[{a:1,b:36},{a:2,b:18},{a:3,b:12},{a:4,b:9}],marks:[{v:6,c:"#FBBF24"}]},sum:"36: 1×36 2×18 3×12 4×9 6×6 · GCF(16, 40) = 8"},
  {cap:"Primes: skinny rectangles only. 51 is not one — 3 × 17. And 60 breaks down to 2 × 2 × 3 × 5.",fig:{k:"tape",parts:[{v:"2"},{v:"2"},{v:"3"},{v:"5",c:"#FBBF24"}],total:"60"},sum:"51 = 3 × 17 · largest prime factor of 60 = 5"},
  {cap:"The Big Question, out loud: why does breaking a number apart make multiplying easier? Because a rectangle cut into rooms has the same area as the whole — and each room is a fact you already know.",cols:[{l:"60",s:60},{l:"2",s:2}],rows:[{l:"30",s:30},{l:"8",s:8}],cells:[{v:"1800"},{v:"60"},{v:"480"},{v:"16"}],sum:"62 × 38 ≈ 2400 · exactly 2356"}
]}

};
window.__CURR = window.__CURR || {};
window.__CURR.LESSONS_AUTHORED = Object.assign(window.__CURR.LESSONS_AUTHORED || {}, L);
})();
