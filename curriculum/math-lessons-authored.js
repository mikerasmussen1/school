/* ============================================================================
 * MATH — HAND-AUTHORED DAILY LESSONS
 * ----------------------------------------------------------------------------
 * Real teaching for days that had none. Week 1 of each mission was already
 * authored; every later week shared one method lesson across five days, and
 * the generated stand-ins in math-lessons-daily.js are a floor — a title and
 * three worked examples — not teaching.
 *
 * These replace the floor a day at a time. An entry here wins over the
 * generated one (see registry.js), so this file can grow without any other
 * change, and a day that is not here yet still has something.
 *
 * HOW THESE ARE WRITTEN, so later batches match:
 *   - One idea per lesson. The day already has 26 questions to drill it; the
 *     lesson's job is to make the first one make sense, not to cover the set.
 *   - Every number comes from that day's own questions, so the lesson is
 *     rehearsing exactly what the child is about to meet.
 *   - Name the trap out loud. Most of these skills have one specific way they
 *     go wrong, and saying it is worth more than another worked example.
 *   - Short sentences. The reader is nine or ten and reading this alone.
 *   - `sum` is the line they should be able to say back. Not every step has
 *     one; a step that is only an idea does not need arithmetic attached.
 * ==========================================================================*/
const LESSONS_AUTHORED = {

  /* ── YEAR TWO · MISSION 01 · WEEK 2 — times and divide by powers of ten ── */

  "y5u1w2p1":{title:"Multiply by Ten",sub:"Mission 01 · Week 2 · the digits move",steps:[
    {cap:"A decimal point is not a thing that moves. It marks where the ones are, and it stays there. What moves is the digits.",cols:[{l:"42",s:12}],rows:[{l:"",s:4}],cells:[{v:"42"}]},
    {cap:"Take 4.2. The 4 is in the ones place. Multiply by ten and every digit steps ONE place to the left: the 4 becomes ten times bigger, so it lands in the tens.",sum:"4.2 × 10 = 42",cols:[{l:"42",s:12}],rows:[{l:"",s:4}],cells:[{v:"42"}]},
    {cap:"Multiply by a hundred and every digit steps TWO places. Ten is one step, a hundred is two, a thousand is three. Count the zeros, that is your number of steps.",sum:"4.2 × 100 = 420",cols:[{l:"420",s:17}],rows:[{l:"",s:4}],cells:[{v:"420"}]},
    {cap:"It works the same when the number starts small. 0.06 — the 6 is in the hundredths. Two steps left and it lands in the ones.",sum:"0.06 × 100 = 6",cols:[{l:"6",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"6"},{v:""}]},
    {cap:"Three zeros, three steps. The 2 goes ones → tens → hundreds → thousands.",sum:"2.4 × 1000 = 2400",cols:[{l:"2400",s:21}],rows:[{l:"",s:4}],cells:[{v:"2400"}]},
    {cap:"THE TRAP. People say \"add a zero\". That works for whole numbers and quietly lies about decimals: 0.035 × 100 is not 0.03500. Move the digits two places and read what you get.",sum:"0.035 × 100 = 3.5",cols:[{l:"3.5",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"3.5"},{v:""}]},
    {cap:"So: count the zeros, step the digits that many places left, and fill any empty place with a zero. That is the whole move.",cols:[{l:"42",s:12}],rows:[{l:"",s:4}],cells:[{v:"42"}]}
  ]},

  "y5u1w2p2":{title:"Divide by Ten",sub:"Mission 01 · Week 2 · the same move, backwards",steps:[
    {cap:"Dividing by ten is yesterday's move run in reverse. The digits step to the RIGHT instead of the left, because everything is getting smaller.",cols:[{l:"4.2",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"4.2"},{v:""}]},
    {cap:"42 ÷ 10. The 4 is in the tens. One step right and it is in the ones, the 2 falls into the tenths.",sum:"42 ÷ 10 = 4.2",cols:[{l:"4.2",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"4.2"},{v:""}]},
    {cap:"Two zeros, two steps right. Check it against the multiplying: 4.2 × 100 was 420, so 420 ÷ 100 must come back to 4.2. It does.",sum:"420 ÷ 100 = 4.2",cols:[{l:"4.2",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"4.2"},{v:""}]},
    {cap:"When the digits run off the end of the ones place, zeros hold the empty places open. 6 ÷ 100 — the 6 steps ones → tenths → hundredths.",sum:"6 ÷ 100 = 0.06",cols:[{l:"0.06",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0.06"},{v:""}]},
    {cap:"Three steps right, and two zeros are needed just to hold the place.",sum:"7 ÷ 1000 = 0.007",cols:[{l:"0.007",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0.007"},{v:""}]},
    {cap:"THE TRAP. Do not \"take a zero off\". 850 ÷ 100 is not 85. Step the digits two places and the 8 lands in the ones.",sum:"850 ÷ 100 = 8.5",cols:[{l:"8.5",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"8.5"},{v:""}]},
    {cap:"Every ÷ has a × that undoes it. If you are not sure, multiply your answer back and see whether you land where you started.",cols:[{l:"4.2",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"4.2"},{v:""}]}
  ]},

  "y5u1w2p3":{title:"Exponent Shorthand",sub:"Mission 01 · Week 2 · writing the zeros once",steps:[
    {cap:"Writing 10 × 10 × 10 × 10 gets old fast. The small raised number says how many tens are multiplied together — nothing more clever than that.",cols:[{l:"100",s:14}],rows:[{l:"",s:4}],cells:[{v:"100"}]},
    {cap:"10¹ is one ten. 10² is 10 × 10. The exponent is also the number of zeros, which is the part you will actually use.",sum:"10² = 100",cols:[{l:"100",s:14}],rows:[{l:"",s:4}],cells:[{v:"100"}]},
    {cap:"So 10⁴ is four tens multiplied, and four zeros written out.",sum:"10⁴ = 10000",cols:[{l:"10000",s:24}],rows:[{l:"",s:4}],cells:[{v:"10000"}]},
    {cap:"Now join it to last lesson. 3 × 10² means \"step the 3 two places left\" — the exponent IS the number of steps.",sum:"3 × 10² = 300",cols:[{l:"300",s:16}],rows:[{l:"",s:4}],cells:[{v:"300"}]},
    {cap:"Same with a decimal. Three steps left from 4.5.",sum:"4.5 × 10³ = 4500",cols:[{l:"4500",s:22}],rows:[{l:"",s:4}],cells:[{v:"4500"}]},
    {cap:"THE TRAP. 10² is not 20. The exponent counts how many tens are multiplied, not what to multiply ten by. 10² = 100, and 10 × 2 = 20 is a different question.",cols:[{l:"100",s:14}],rows:[{l:"",s:4}],cells:[{v:"100"}]},
    {cap:"Read 10ⁿ as \"1 followed by n zeros\" and you will never be caught by it.",sum:"0.6 × 10³ = 600",cols:[{l:"600",s:18}],rows:[{l:"",s:4}],cells:[{v:"600"}]}
  ]},

  "y5u1w2p4":{title:"Patterns in Zeros",sub:"Mission 01 · Week 2 · why the pattern holds",steps:[
    {cap:"Three days of this now. Today is about seeing the pattern as one rule instead of three tricks.",cols:[{l:"400",s:17}],rows:[{l:"",s:4}],cells:[{v:"400"}]},
    {cap:"Start where it is obvious. 4 × 100 — two steps left, two zeros appear.",sum:"4 × 100 = 400",cols:[{l:"400",s:17}],rows:[{l:"",s:4}],cells:[{v:"400"}]},
    {cap:"Now shrink the number by ten and watch the answer shrink by ten with it. Same two steps, smaller start.",sum:"0.4 × 100 = 40",cols:[{l:"40",s:12}],rows:[{l:"",s:4}],cells:[{v:"40"}]},
    {cap:"Shrink it again. The move has not changed once; only where you began.",sum:"0.025 × 100 = 2.5",cols:[{l:"2.5",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"2.5"},{v:""}]},
    {cap:"That is the whole idea: the number of zeros tells you how many places to step, and it does not care whether you started with a whole number or a decimal.",sum:"25 × 100 = 2500",cols:[{l:"2500",s:21}],rows:[{l:"",s:4}],cells:[{v:"2500"}]},
    {cap:"THE TRAP. Counting zeros in the ANSWER instead of steps in the move. 0.25 × 100 = 25 has no zeros in it at all, and it is still two steps left.",sum:"0.25 × 100 = 25",cols:[{l:"25",s:11}],rows:[{l:"",s:4}],cells:[{v:"25"}]},
    {cap:"Count zeros in what you multiply BY. Step that many places. Read the result.",cols:[{l:"400",s:17}],rows:[{l:"",s:4}],cells:[{v:"400"}]}
  ]},

  "y5u1w2p5":{title:"Zoom Atlas Begins",sub:"Mission 01 · Week 2 · Friday · the same rule, in the world",steps:[
    {cap:"A model, a map and a microscope all do the same arithmetic you did this week. \"Ten times bigger\" is × 10 whether it is a number or an ant.",cols:[{l:"30 cm",s:11}],rows:[{l:"",s:4}],cells:[{v:"30 cm"}]},
    {cap:"A 3 cm beetle at ten times. One step left.",sum:"3 cm at 10 times = 30 cm",cols:[{l:"30 cm",s:11}],rows:[{l:"",s:4}],cells:[{v:"30 cm"}]},
    {cap:"At a hundred times, two steps. Now it is three metres long — worth picturing before you believe it.",sum:"3 cm at 100 times = 300 cm",cols:[{l:"300 cm",s:16}],rows:[{l:"",s:4}],cells:[{v:"300 cm"}]},
    {cap:"Shrinking is division. \"One tenth\" means one step right.",sum:"250 cm at one tenth = 25 cm",cols:[{l:"25 cm",s:11}],rows:[{l:"",s:4}],cells:[{v:"25 cm"}]},
    {cap:"\"One hundredth\" is two steps right. A four-metre boat becomes a four-centimetre model — and notice the digits never changed, only their places.",sum:"4 m at one hundredth = 4 cm",cols:[{l:"4 cm",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"4 cm"},{v:""}]},
    {cap:"THE TRAP. The units move with the number. Check your answer is the size you would expect: if a model boat comes out bigger than the real one, you stepped the wrong way.",cols:[{l:"30 cm",s:11}],rows:[{l:"",s:4}],cells:[{v:"30 cm"}]},
    {cap:"Bigger means left. Smaller means right. The number of zeros says how far.",sum:"480 cm at one tenth = 48 cm",cols:[{l:"48 cm",s:12}],rows:[{l:"",s:4}],cells:[{v:"48 cm"}]}
  ]},

  /* ── YEAR TWO · MISSION 01 · WEEK 3 — rounding ─────────────────────────── */

  "y5u1w3p1":{title:"Round to a Named Place",sub:"Mission 01 · Week 3 · find it, look right, decide",steps:[
    {cap:"Rounding is three moves in a fixed order. Find the place you were asked for. Look at the digit to its RIGHT. Five or more rounds up, four or less stays.",cols:[{l:"50",s:13}],rows:[{l:"",s:4}],cells:[{v:"50"}]},
    {cap:"Round 47 to the nearest ten. The tens digit is 4. To its right is 7. Seven is five or more, so the 4 goes up to 5.",sum:"47 → 50",cols:[{l:"50",s:13}],rows:[{l:"",s:4}],cells:[{v:"50"}]},
    {cap:"Round 43 the same way. The digit to the right is 3, so the tens digit stays where it is.",sum:"43 → 40",cols:[{l:"40",s:12}],rows:[{l:"",s:4}],cells:[{v:"40"}]},
    {cap:"It is identical with big numbers. 4,829 to the nearest thousand: the thousands digit is 4, and to its right is 8. Up it goes.",sum:"4,829 → 5,000",cols:[{l:"5,000",s:22}],rows:[{l:"",s:4}],cells:[{v:"5,000"}]},
    {cap:"Same number, different place asked for. To the nearest hundred: the hundreds digit is 8, to its right is 2, so 8 stays.",sum:"4,829 → 4,800",cols:[{l:"4,800",s:22}],rows:[{l:"",s:4}],cells:[{v:"4,800"}]},
    {cap:"THE TRAP. Looking at the whole rest of the number instead of ONE digit. For 4,829 to the nearest hundred you look at the 2 and nothing else — the 9 behind it gets no vote.",cols:[{l:"50",s:13}],rows:[{l:"",s:4}],cells:[{v:"50"}]},
    {cap:"One place named. One digit to its right. That is the entire decision.",sum:"12.5 → 13",cols:[{l:"13",s:10}],rows:[{l:"",s:4}],cells:[{v:"13"}]}
  ]},

  "y5u1w3p2":{title:"Rounding Decimals",sub:"Mission 01 · Week 3 · the same rule, past the point",steps:[
    {cap:"Nothing new today. The rule from yesterday works past the decimal point without a single change — the places just have different names.",cols:[{l:"0",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0"},{v:""}]},
    {cap:"Round 0.4 to the nearest whole. The ones digit is 0, the digit to its right is 4, so it stays.",sum:"0.4 → 0",cols:[{l:"0",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0"},{v:""}]},
    {cap:"0.6 the same way, and the 6 sends it up.",sum:"0.6 → 1",cols:[{l:"1",s:6},{l:"",s:20}],rows:[{l:"",s:4}],cells:[{v:"1"},{v:""}]},
    {cap:"Round 3.456 to the nearest hundredth. Hundredths is the 5. To its right is 6, so the 5 becomes 6 and everything past it goes.",sum:"3.456 → 3.46",cols:[{l:"3.46",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"3.46"},{v:""}]},
    {cap:"Same number, nearest tenth. Tenths is the 4, to its right is 5, so up.",sum:"3.456 → 3.5",cols:[{l:"3.5",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"3.5"},{v:""}]},
    {cap:"THE TRAP. Rounding twice. For 3.456 to the nearest tenth you do NOT round to 3.46 first and then to 3.5 — you look once, at the hundredths digit, and decide. Doing it in two hops can give the wrong answer.",cols:[{l:"0",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0"},{v:""}]},
    {cap:"Name the place. Look once, one digit right. Cut everything after it.",sum:"0.075 → 0.08",cols:[{l:"0.08",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0.08"},{v:""}]}
  ]},

  "y5u1w3p3":{title:"Which Place Matters",sub:"Mission 01 · Week 3 · what the question is really asking",steps:[
    {cap:"Out in the world nobody says \"round to the nearest hundredth\". They say \"to the nearest cent\", and you have to know which place that is.",cols:[{l:"$4.57",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"$4.57"},{v:""}]},
    {cap:"Money has two decimal places. The nearest cent IS the nearest hundredth. $4.567 has a third digit that has to go.",sum:"$4.567 → $4.57",cols:[{l:"$4.57",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"$4.57"},{v:""}]},
    {cap:"If it is already exact, rounding changes nothing. Do not invent a change because you were asked to round.",sum:"$4.56 → $4.56",cols:[{l:"$4.56",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"$4.56"},{v:""}]},
    {cap:"Metres and centimetres work the same: a centimetre is a hundredth of a metre, so \"nearest centimetre\" means two decimal places.",sum:"1.005 m → 1.01 m",cols:[{l:"1.01 m",s:6},{l:"",s:20}],rows:[{l:"",s:4}],cells:[{v:"1.01 m"},{v:""}]},
    {cap:"And sometimes the situation overrules the arithmetic. 4.4 buses would round DOWN to 4 — but 4 buses leaves people standing on the pavement.",sum:"4.4 buses → 5 buses",cols:[{l:"5 buses",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"5 buses"},{v:""}]},
    {cap:"THE TRAP. Rounding on autopilot when the answer has to be a whole thing. Buses, tables, tickets and boxes round UP whenever there is any remainder at all, whatever the digit says.",cols:[{l:"$4.57",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"$4.57"},{v:""}]},
    {cap:"Ask what the place is called, then ask whether a leftover means one more.",sum:"$19.99 → $20",cols:[{l:"$20",s:11}],rows:[{l:"",s:4}],cells:[{v:"$20"}]}
  ]},

  "y5u1w3p4":{title:"Estimate to Check",sub:"Mission 01 · Week 3 · rounding as a safety net",steps:[
    {cap:"Rounding is not only an exercise. Its real job is telling you when an answer is nonsense before you hand it in.",cols:[{l:"8",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"8"},{v:""}]},
    {cap:"Estimate first, exactly, in your head. 4.9 is nearly 5 and 3.1 is nearly 3.",sum:"4.9 + 3.1 ≈ 8",cols:[{l:"8",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"8"},{v:""}]},
    {cap:"Same with subtraction. Round both, then take one from the other.",sum:"9.8 − 4.9 ≈ 5",cols:[{l:"5",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"5"},{v:""}]},
    {cap:"Now a big one. 412 × 19 — round to 400 × 20, which you can do in your head. If your worked answer comes out near 8,000, it is believable.",sum:"412 × 19 ≈ 8000",cols:[{l:"8000",s:24}],rows:[{l:"",s:4}],cells:[{v:"8000"}]},
    {cap:"An estimate is meant to be close, not right. 0.49 × 100 estimates to 50 and truly is 49 — near enough to catch a mistake, not near enough to hand in.",sum:"0.49 × 100 ≈ 50, true 49",cols:[{l:"50",s:13}],rows:[{l:"",s:4}],cells:[{v:"50"}]},
    {cap:"THE TRAP. Estimating AFTER you get an answer, which just talks you into whatever you already wrote. Do it first, on rough paper, before the real working.",cols:[{l:"8",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"8"},{v:""}]},
    {cap:"Estimate, work it out, compare. If they are far apart, one of them is wrong and it is usually not the estimate.",sum:"19.8 ÷ 5 ≈ 4",cols:[{l:"4",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:""}]}
  ]},

  "y5u1w3p5":{title:"Mid-Unit Quiz",sub:"Mission 01 · Week 3 · Friday · what three weeks bought you",steps:[
    {cap:"Nothing new today. This is a check on the three ideas of the mission, and it is meant to tell you where to look again — not to catch you out.",cols:[{l:"10 times",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10 times"},{v:""}]},
    {cap:"ONE: place value is multiplicative. Each place is ten times the one to its right, so a 7 one place further left is worth ten of the other.",sum:"7,000 vs 700 = 10 times",cols:[{l:"10 times",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10 times"},{v:""}]},
    {cap:"TWO: decimal place names. Thousandths is the third place past the point.",sum:"four hundred six thousandths = 0.406",cols:[{l:"0.406",s:5},{l:"",s:21}],rows:[{l:"",s:4}],cells:[{v:"0.406"},{v:""}]},
    {cap:"THREE: × and ÷ by powers of ten move the digits. Two zeros, two places left.",sum:"0.06 × 100 = 6",cols:[{l:"6",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"6"},{v:""}]},
    {cap:"And in exponent shorthand, which means exactly the same thing.",sum:"850 ÷ 10² = 8.5",cols:[{l:"8.5",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"8.5"},{v:""}]},
    {cap:"FOUR: rounding is find the place, look one digit right, decide.",sum:"2.451 → 2.45",cols:[{l:"2.45",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"2.45"},{v:""}]},
    {cap:"If one of those five felt shaky, that is the lesson to reopen. The quiz is a map, not a verdict.",cols:[{l:"10 times",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10 times"},{v:""}]}
  ]},

  /* ── YEAR TWO · MISSION 01 · WEEK 4 — putting it together ──────────────── */

  "y5u1w4p1":{title:"Finish the Atlas",sub:"Mission 01 · Week 4 · scaling across units",steps:[
    {cap:"Last week you scaled things by ten and a hundred. Today the jumps get bigger and the units change underneath you, which is where it gets interesting.",cols:[{l:"30 cm",s:11}],rows:[{l:"",s:4}],cells:[{v:"30 cm"}]},
    {cap:"Warm up on a familiar one. Ten times is one step left.",sum:"3 cm at 10 times = 30 cm",cols:[{l:"30 cm",s:11}],rows:[{l:"",s:4}],cells:[{v:"30 cm"}]},
    {cap:"A thousandth is three steps right. A 4,000 mm girder becomes 4 mm on the model.",sum:"4,000 mm at one thousandth = 4 mm",cols:[{l:"4 mm",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"4 mm"},{v:""}]},
    {cap:"Watch the units here. 2.5 cm at a thousand times is 2,500 cm — and 2,500 cm is 25 metres. The arithmetic and the unit conversion are two separate jobs.",sum:"2.5 cm at 1000 times = 25 m",cols:[{l:"25 m",s:11}],rows:[{l:"",s:4}],cells:[{v:"25 m"}]},
    {cap:"You can also work out the multiplier itself. From 0.5 mm to 5 m: that is 0.5 mm → 5,000 mm, so ten thousand times.",sum:"0.5 mm → 5 m = ×10000",cols:[{l:"×10000",s:24}],rows:[{l:"",s:4}],cells:[{v:"×10000"}]},
    {cap:"THE TRAP. Changing the unit and forgetting to change the number, or changing it twice. Do the scaling first, write the answer with its unit, THEN convert if you were asked for a different one.",cols:[{l:"30 cm",s:11}],rows:[{l:"",s:4}],cells:[{v:"30 cm"}]},
    {cap:"Scale. Write the unit. Convert only if asked.",sum:"3.5 m at 100 times = 350 m",cols:[{l:"350 m",s:17}],rows:[{l:"",s:4}],cells:[{v:"350 m"}]}
  ]},

  "y5u1w4p2":{title:"Explain a Jump",sub:"Mission 01 · Week 4 · saying why, not just what",steps:[
    {cap:"You can already do these. Today is about being able to say WHY, which is what the test asks and what makes it stick.",cols:[{l:"42",s:12}],rows:[{l:"",s:4}],cells:[{v:"42"}]},
    {cap:"4.2 × 10 = 42. Say it out loud: \"each digit moves one place left, because every place is worth ten of the one to its right.\"",sum:"4.2 × 10 = 42",cols:[{l:"42",s:12}],rows:[{l:"",s:4}],cells:[{v:"42"}]},
    {cap:"And back again. \"Dividing by ten moves each digit one place right, because it undoes the multiplying.\"",sum:"42 ÷ 10 = 4.2",cols:[{l:"4.2",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"4.2"},{v:""}]},
    {cap:"Two zeros, two places. Notice the pair: whatever × did, ÷ undoes exactly.",sum:"0.06 × 100 = 6",cols:[{l:"6",s:8},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"6"},{v:""}]},
    {cap:"Here is that same pair run backwards, landing exactly where it started.",sum:"6 ÷ 100 = 0.06",cols:[{l:"0.06",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0.06"},{v:""}]},
    {cap:"THE TRAP. Saying \"the point moves\". It is not wrong on paper and it stops working the moment the numbers get strange. The places are fixed; the digits are what travel.",cols:[{l:"42",s:12}],rows:[{l:"",s:4}],cells:[{v:"42"}]},
    {cap:"If you can say why it works, you can rebuild it when you forget it.",sum:"2400 ÷ 1000 = 2.4",cols:[{l:"2.4",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"2.4"},{v:""}]}
  ]},

  "y5u1w4p3":{title:"Mixed Review",sub:"Mission 01 · Week 4 · everything, shuffled",steps:[
    {cap:"Mixed on purpose. Doing twenty of the same question teaches your hand; mixing them teaches you to recognise which question you are looking at.",cols:[{l:"10 times",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10 times"},{v:""}]},
    {cap:"Place value, stated as a comparison.",sum:"400 vs 40 = 10 times",cols:[{l:"10 times",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10 times"},{v:""}]},
    {cap:"A tenth of something is one step right.",sum:"one tenth of 500 = 50",cols:[{l:"50",s:13}],rows:[{l:"",s:4}],cells:[{v:"50"}]},
    {cap:"Multiplying: two zeros, two places left.",sum:"3.5 × 100 = 350",cols:[{l:"350",s:17}],rows:[{l:"",s:4}],cells:[{v:"350"}]},
    {cap:"Dividing: two places right, and a zero holding the tenths open.",sum:"42 ÷ 100 = 0.42",cols:[{l:"0.42",s:5},{l:"",s:21}],rows:[{l:"",s:4}],cells:[{v:"0.42"},{v:""}]},
    {cap:"And a rounding one dropped in among them, so you have to notice the switch.",sum:"4,829 → 5,000",cols:[{l:"5,000",s:22}],rows:[{l:"",s:4}],cells:[{v:"5,000"}]},
    {cap:"THE TRAP. Answering the question you just did instead of the one in front of you. Read the operation before you read the numbers.",cols:[{l:"10 times",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10 times"},{v:""}]}
  ]},

  "y5u1w4p4":{title:"Error Journal Sweep",sub:"Mission 01 · Week 4 · Thursday · the ones that bit",steps:[
    {cap:"Today is built from mistakes — the specific ones this mission tends to produce. Getting these right is worth more than twenty easy ones.",cols:[{l:"3",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:""}]},
    {cap:"Place names first, because half the errors start here. 0.3 is three tenths.",sum:"tenths in 0.3 = 3",cols:[{l:"3",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:""}]},
    {cap:"And the shorthand, which is only ever \"1 followed by that many zeros\".",sum:"10² = 100",cols:[{l:"100",s:14}],rows:[{l:"",s:4}],cells:[{v:"100"}]},
    {cap:"Decimals that complete a whole. Worth knowing on sight: 0.125 and 0.875 are an eighth and seven eighths.",sum:"0.125 + 0.875 = 1",cols:[{l:"1",s:6},{l:"",s:20}],rows:[{l:"",s:4}],cells:[{v:"1"},{v:""}]},
    {cap:"The division that most often gets a zero wrongly chopped off it.",sum:"850 ÷ 100 = 8.5",cols:[{l:"8.5",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"8.5"},{v:""}]},
    {cap:"THE TRAP, and it is the big one this mission. Rounding where the digit rolls over: 9.96 to the nearest tenth is not 9.10. The 9 tenths becomes 10 tenths, which is a whole one.",sum:"9.96 → 10",cols:[{l:"10",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10"},{v:""}]},
    {cap:"When rounding pushes a 9 up, it carries — exactly like adding. That is the error to hunt for in your own working.",cols:[{l:"3",s:7},{l:"",s:19}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:""}]}
  ]},

  "y5u1w4p5":{title:"Mission 01 Test",sub:"Mission 01 · Week 4 · Friday · the whole mission",steps:[
    {cap:"Everything from four weeks, in one place. Nothing here is new — if a question looks unfamiliar, it is one of these five ideas wearing different numbers.",cols:[{l:"100 times",s:14}],rows:[{l:"",s:4}],cells:[{v:"100 times"}]},
    {cap:"Place value as a multiplying relationship, two places apart this time.",sum:"300 vs 3 = 100 times",cols:[{l:"100 times",s:14}],rows:[{l:"",s:4}],cells:[{v:"100 times"}]},
    {cap:"Writing a decimal from its words. Thousandths is three places past the point.",sum:"sixty-two thousandths = 0.062",cols:[{l:"0.062",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0.062"},{v:""}]},
    {cap:"Counting a smaller place inside a bigger one: each tenth holds ten hundredths.",sum:"hundredths in 0.3 = 30",cols:[{l:"30",s:11}],rows:[{l:"",s:4}],cells:[{v:"30"}]},
    {cap:"Exponent shorthand joined to the digit move.",sum:"2.4 × 10³ = 2400",cols:[{l:"2400",s:21}],rows:[{l:"",s:4}],cells:[{v:"2400"}]},
    {cap:"Dividing far enough that zeros have to hold the places open.",sum:"7 ÷ 1000 = 0.007",cols:[{l:"0.007",s:4},{l:"",s:22}],rows:[{l:"",s:4}],cells:[{v:"0.007"},{v:""}]},
    {cap:"And the rollover rounding from yesterday, because it is the one worth checking twice.",sum:"9.96 → 10",cols:[{l:"10",s:9},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"10"},{v:""}]}
  ]}

};

window.__CURR = window.__CURR || {};
window.__CURR.LESSONS_AUTHORED = LESSONS_AUTHORED;
