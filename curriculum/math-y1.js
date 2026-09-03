/* MATH · Year One (Grade 3). Missions 01–08: units, weeks, standards,
// puzzles, practice sets and lesson walkthroughs.
   Plain script, loaded before the app. Exports onto window.__CURR. */
(function(){
window.__CURR = window.__CURR || {};
const {TIERS, GATES, GATES_SHORT, GATES_LONG, GATES_TINY, BANDS, RHYTHM, ASSESS, COMPACT, WATCHOUTS, PRAISE, mkWeek, GATE_FULL, q, GATE_OUT, GATE_QUIZ, GATE_TEST} = window.__CURR;

const UNITS = [
  {n:1,name:"Multiplication Masters",short:"Multiplication Masters",color:"#FF9F1C",weeks:"1–5",badge:"×",size:96,glyph:"42px",
   bigQ:"Why does 6 rows of 7 give the same answer as 7 rows of 6?",
   skills:["Equal groups and arrays", "Facts within 100", "Properties as strategies", "Fact automaticity", "2-digit x 1-digit (extension)"],
   project:"Launch Bay Blueprint — design a rocket hangar on graph paper, then find its area two different ways and prove they match.",
   game:"Product Blockout — two dice, multiply, shade that rectangle on a 10×10 grid. First to block the board wins.",
   badgeName:"The Array Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 01 test and explaining the Big Question out loud.",
   blurb:"Multiplication stops being a fact table and becomes a shape. Rectangles, arrays, factor rainbows — every answer in this mission is something you can see, break apart, and rebuild a different way.",
   quote:"If you can already do 47 × 32, don't sit through five weeks of it. Take the pre-assessment, prove it, and skip straight to the puzzles. That's not cheating — that's flight planning.",
   closing:"Answer it out loud on Day 20, in your own words, with a drawing. That's the real test — the unit test is just the paperwork."},
  {n:2,name:"Division Decoded",short:"Division Decoded",color:"#2DD4BF",weeks:"6–10",badge:"÷",size:78,glyph:"36px",
   bigQ:"If you know 6 x 7, why do you already know 42 divided by 6?",
   skills:["Sharing vs grouping", "Division within 100", "Division as an unknown factor", "The inverse of multiplication", "Remainders (extension)"],
   project:"Snack Run — split real quantities among real people and defend every remainder decision.",
   game:"Remainder Race — deal cards, divide, score the remainder.",
   badgeName:"The Sharing Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 02 test and explaining the Big Question out loud.",
   blurb:"Division is the rectangle from Mission 01 with one side rubbed out. You know the area, you know one side, and the job is to find the other. Then something new happens: sometimes the pieces don't fit, and the leftover needs a decision.",
   quote:"Every pilot I've flown with wanted the remainder to go away. It doesn't. Learn to say what it means and you're ahead of most adults.",
   closing:"Answer it out loud on Day 20, in your own words, with an example where two people divide the same numbers and get two different right answers."},
  {n:3,name:"Number Power",short:"Number Power",color:"#A78BFA",weeks:"11–14",badge:"10\u00b3",size:70,glyph:"22px",
   bigQ:"Why is the 4 in 4,271 worth more than the 7?",
   skills:["Place value to 10,000", "Rounding to 10 and 100", "Comparing numbers", "Estimating to check", "Past 10,000 (extension)"],
   project:"A Million Dots — estimate, then prove how much space a million of something takes.",
   game:"Expression Duel — build the biggest value from four cards and any operations.",
   badgeName:"The Place Value Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 03 test and explaining the Big Question out loud.",
   blurb:"A shorter mission with a big idea in it. Numbers get large enough that you need a system to hold them, and expressions get long enough that the order you read them in changes the answer. Both problems have the same fix: agreed rules.",
   quote:"The order of operations isn't a law of nature. It's an agreement, so that everyone reading the same line gets the same number. Agreements are still worth understanding.",
   closing:"Answer it on Day 16 by writing one expression that two people could read two ways, then showing which reading the rule picks and why that reading matches the picture."},
  {n:4,name:"Fraction Universe",short:"Fraction Universe",color:"#F472B6",weeks:"15–20",badge:"¾",size:88,glyph:"34px",
   bigQ:"Why is 1/4 smaller than 1/3 when 4 is bigger than 3?",
   skills:["Unit fractions", "Fractions on a number line", "Comparing fractions", "Simple equivalents", "Equal-area partitions"],
   project:"Fold the Universe — build a paper number line to 1 and land every fraction you meet on it.",
   game:"Closest to One — draw cards, build a fraction, get nearest without going over.",
   badgeName:"The Fraction Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 04 test and explaining the Big Question out loud.",
   blurb:"The longest mission of the year, and the one most people never really finish. A fraction is one number, not two — it has a place on the number line, it can be renamed without changing, and every hard fraction question turns out to be the same question: are the pieces the same size yet?",
   quote:"Six weeks is a long tour. Most pilots who struggle later struggle here, and they struggle because they treated a fraction as two numbers instead of one. Don't.",
   closing:"Answer it on Day 24 with the folded paper line in your hand: show two fractions landing on exactly the same point, and explain why cutting the pieces smaller never changed the amount."},
  {n:5,name:"Adding & Subtracting",short:"Add & Subtract",color:"#A3E635",weeks:"21–24",badge:"+\u2212",size:72,glyph:"32px",
   bigQ:"Why does lining up the columns matter more than the digits themselves?",
   skills:["Adding within 1,000", "Subtracting within 1,000", "Two-step problems", "Estimating to check", "Money and decimals (extension)"],
   project:"The Thousand Club - reach exactly 1,000 from a pile of three-digit numbers.",
   game:"Carry Race - who spots the regrouping first.",
   badgeName:"The Column Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 05 test and explaining the Big Question out loud.",
   blurb:"Adding and subtracting stop being something you do to two numbers and become something you do to columns. Line the places up and 1,000 is no harder than 10 — and that same habit is what makes money behave, because a decimal point is only another column marker.",
   quote:"This is the first mission where being wrong costs actual money. Take the receipt seriously — it's the only marker that doesn't care how you feel about it.",
   closing:"Answer it on Day 16 with the grocery receipt in your hand: name one job decimals do better, one job fractions do better, and show an amount where you'd genuinely choose each."},
  {n:6,name:"Geometry Quest",short:"Geometry Quest",color:"#60A5FA",weeks:"25–29",badge:"\u25b1",size:84,glyph:"38px",
   bigQ:"Two shapes can have the same perimeter and different areas. How?",
   skills:["Quadrilaterals and polygons", "Lines of symmetry", "Area by tiling", "Area as length x width", "Perimeter"],
   project:"Map a Planet — invent a world on the coordinate plane and give sailing directions by coordinates.",
   game:"Angle Guess — estimate an angle, then measure. Closest guess scores.",
   badgeName:"The Shape Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 06 test and explaining the Big Question out loud.",
   blurb:"Shapes stop being pictures and start being claims you can check. An angle is an amount of turn, a square is a rectangle that got strict, and the fence around a field tells you almost nothing about how much grass is inside it.",
   quote:"Navigation is geometry with consequences. Get a coordinate backwards on a real chart and you don't arrive. Across first, then up — say it out loud until it's boring.",
   closing:"Answer it on Day 20 with two drawings: same fence, wildly different grass. Then say which shape wins and why the square always does."},
  {n:7,name:"Data Detective",short:"Data Detective",color:"#FB7185",weeks:"30-34",badge:"▮▮",size:66,glyph:"18px",
   bigQ:"What can a graph hide as easily as it shows?",
   skills:["Picture and bar graphs", "Length and the ruler", "Volume and mass", "Time and elapsed time", "Line plots"],
   project:"Ask 20 People — write a real survey question, collect real answers, publish the findings.",
   game:"Predict the Roll — call the outcome, tally 50 trials, compare to your prediction.",
   badgeName:"The Measure Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 07 test and explaining the Big Question out loud.",
   blurb:"Every graph is somebody making a claim. This mission is about checking the claim: what got counted, what got left out, and which number actually describes a typical one of the things being measured.",
   quote:"Every briefing I've ever been handed came with an average on it. The good officers asked what got averaged. Ask that, every time, and you'll be right more often than the room.",
   closing:"Answer it on Day 20 with one set of numbers, two measures, and a sentence about which one you would print in a newspaper."},
  {n:8,name:"Algebra Sparks",short:"Algebra Sparks",color:"#FCD34D",weeks:"33–36",badge:"x",size:80,glyph:"38px",
   bigQ:"What does the equals sign actually promise?",
   skills:["Patterns in the tables", "Numeric patterns", "The meaning of the equal sign", "A letter for the unknown", "Function machines (extension)"],
   project:"The Math Trail — build a numbered trail through your own house where every stop is a problem you wrote. Mom walks it.",
   game:"Guess My Rule — one person runs the machine, the other cracks it in five inputs.",
   badgeName:"The Pattern Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 08 test, plus a completed Math Trail.",
   blurb:"The last mission of the year, and the one that names what he has been doing since Mission 01. A pattern becomes a rule, a rule becomes a machine, and the letter in the middle is just a number waiting to be found.",
   quote:"You've been doing algebra since Mission 01 — every time you worked out what number belonged in a gap. This mission just gives it a name and a letter. Last leg. Fly it properly.",
   closing:"Answer it on Day 16, standing at his own Math Trail, in a sentence that does not use the word “mystery.”"}
];

const WEEKS = [
  {n:1,title:"Arrays & Area",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"Multiplication becomes a rectangle. By Friday he can break any 2-digit × 2-digit problem into four rooms and explain why the rooms add up.",
   days:[
     {day:"Mon · 1.1",title:"Arrays become area",detail:"Build 6×7 with base-ten blocks, then draw it as a rectangle. Same 42, new picture.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"Breaking apart",detail:"1-digit × 2-digit split into tens and ones: 8×34 = 8×30 + 8×4.",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"Mental math moves",detail:"19×6 as 20×6 − 6. Compensation on graph paper first, then in his head.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"The four rooms",detail:"2-digit × 2-digit. 23×14 as four partial products, all four labelled.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Rectangle Hunt",detail:"Find every rectangle with area 36. Then argue about why area 37 has only one.",tiers:[2]}
   ]},
  {n:2,title:"The Algorithm",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Lay the standard algorithm on top of the area model and find each partial product hiding inside it. This is the week the Big Question gets answered.",
   days:[
     {day:"Mon · 2.1",title:"Where the rooms hide",detail:"Match each line of the algorithm to a room in the model.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"Fluency with carrying",detail:"2-digit × 2-digit, algorithm only, area model as the check.",tiers:[0,1]},
     {day:"Wed · 2.3",title:"3-digit × 1-digit",detail:"Extending the same logic to bigger rectangles.",tiers:[0,1,2]},
     {day:"Thu · 2.4",title:"Estimate first",detail:"Round, predict, compute, compare. Catch your own errors.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Lattice detour",detail:"Learn a 500-year-old method and decide whether it's better.",tiers:[2]}
   ]},
  {n:3,title:"Factors",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"Factor pairs, factor rainbows, and the moment he notices you only have to test up to the square root. Mid-unit quiz on Friday.",
   days:[
     {day:"Mon · 3.1",title:"Factor pairs",detail:"Build every rectangle for a number; each one is a factor pair.",tiers:[0,1,2]},
     {day:"Tue · 3.2",title:"Factor rainbows",detail:"Draw the arcs. Notice where they stop and ask why.",tiers:[0,1,2]},
     {day:"Wed · 3.3",title:"Common factors",detail:"Two numbers, shared factors, greatest one.",tiers:[0,1,2]},
     {day:"Thu · 3.4",title:"Square numbers",detail:"Why do squares have an odd number of factors?",tiers:[1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–3. 85% to keep flying.",tiers:[1]}
   ]},
  {n:4,title:"Multiples & Primes",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Multiples, divisibility shortcuts, and the Sieve of Eratosthenes on a 100-grid — the prettiest page in the unit.",
   days:[
     {day:"Mon · 4.1",title:"Multiples",detail:"Skip-count patterns on a 100-grid; find the overlaps.",tiers:[0,1,2]},
     {day:"Tue · 4.2",title:"Divisibility rules",detail:"Tests for 2, 3, 5, 9, 10 — and why the 3-rule works.",tiers:[0,1,2]},
     {day:"Wed · 4.3",title:"Primes & composites",detail:"Colour the sieve. Every prime below 100 in one page.",tiers:[0,1,2]},
     {day:"Thu · 4.4",title:"Prime factor trees",detail:"Break a number all the way down to primes.",tiers:[1,2]},
     {day:"Fri · Enrichment",title:"Twin primes",detail:"Hunt pairs two apart. Nobody knows if they run out.",tiers:[2]}
   ]},
  {n:5,title:"Proof & Project",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"Missing-digit puzzles, the Launch Bay Blueprint project, and the Mission 01 test with its explain-your-thinking question.",
   days:[
     {day:"Mon · 5.1",title:"Missing-digit puzzles",detail:"Reason backwards from the product to the digits.",tiers:[0,2]},
     {day:"Tue · 5.2",title:"Launch Bay Blueprint",detail:"Design the hangar on graph paper; compute area two ways.",tiers:[1,2]},
     {day:"Wed · 5.3",title:"Blueprint defence",detail:"Present the plan and prove both area methods agree.",tiers:[2]},
     {day:"Thu · Review",title:"Error journal sweep",detail:"Re-read every entry from the mission. Fix only what repeats.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 01 test",detail:"12 items + one explanation. Trophy band awarded.",tiers:[1,2]}
   ]}
];

const PUZZLES = [
  {label:"C1",pre:"6 × 4",post:" = 276",answer:"6",hint:"C1: The product ends in 6. Which digit times 6 ends in 6? Then check the size."},
  {label:"C2",pre:"2",post:"3 × 4 = 932",answer:"3",hint:"C2: Divide 932 by 4 first, then read the hundreds digit off your answer."},
  {label:"C3",pre:"1",post:" × 15 = 240",answer:"6",hint:"C3: 15 × 10 = 150, and you need 90 more. How many 15s is that?"}
];

const WEEKS_U2 = [
  {n:1,title:"Sharing & Grouping",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"Division stops being a fact you recall and becomes a rectangle with one side missing. By Friday he can pull big chunks out of a dividend and say what the leftover means.",
   days:[
     {day:"Mon · 1.1",title:"Two kinds of division",detail:"Deal 42 counters into 6 rows, then into groups of 7. Same picture, two different questions.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"The missing side",detail:"Area 84, one side 4. Division is the hunt for the side you don't have.",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"When it doesn't fit",detail:"Remainders arrive. Name them out loud instead of hiding them.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"Chunks get tidy",detail:"Three-digit dividends. Pull out the biggest easy chunk, then finish.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Remainder Race",detail:"Deal cards, divide, score the leftover. Then argue about who wins a tie.",tiers:[2]}
   ]},
  {n:2,title:"Remainders",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"One division, four different right answers depending on what you asked. This is the week the Big Question gets answered.",
   days:[
     {day:"Mon · 2.1",title:"Round it up",detail:"Vans, boats, buses. When two leftovers force one more of everything.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"Drop it",detail:"Whole cookies each. When the leftover simply sits on the plate.",tiers:[0,1]},
     {day:"Wed · 2.3",title:"Share it out",detail:"The remainder becomes a fraction of the thing being divided.",tiers:[0,1,2]},
     {day:"Thu · 2.4",title:"The remainder IS the answer",detail:"Clock problems, repeating patterns, every-nth questions.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Snack Run planning",detail:"Real quantities, real people. Every remainder decision written down.",tiers:[2]}
   ]},
  {n:3,title:"Long Division",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"Partial quotients get folded into the standard layout, and he checks every answer by multiplying it back. Mid-unit quiz on Friday.",
   days:[
     {day:"Mon · 3.1",title:"Under the bar",detail:"Watch partial quotients shrink into the standard layout, line by line.",tiers:[0,1,2]},
     {day:"Tue · 3.2",title:"Three-digit dividends",detail:"372 ÷ 3 under the bar. Estimate before you start, every time.",tiers:[0,1,2]},
     {day:"Wed · 3.3",title:"Zeros in the quotient",detail:"The place nobody remembers to hold. 618 ÷ 6 catches everybody once.",tiers:[0,1,2]},
     {day:"Thu · 3.4",title:"Check by multiplying",detail:"Quotient × divisor + remainder = dividend. Self-marking from here on.",tiers:[1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–3. 85% to keep flying.",tiers:[1]}
   ]},
  {n:4,title:"Divisibility & Big Numbers",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Shortcuts that tell you whether a division will come out clean before you do it, then four-digit dividends and a first look at two-digit divisors.",
   days:[
     {day:"Mon · 4.1",title:"Tests for 2, 5, 10",detail:"Why the last digit is enough on its own.",tiers:[0,1,2]},
     {day:"Tue · 4.2",title:"Tests for 3 and 9",detail:"Add the digits — then find out why that ridiculous trick works.",tiers:[0,1,2]},
     {day:"Wed · 4.3",title:"Four-digit dividends",detail:"Same method, longer bar. 3,472 ÷ 8 without flinching.",tiers:[0,1,2]},
     {day:"Thu · 4.4",title:"Two-digit divisors",detail:"Grade-five ceiling. Estimate, adjust, estimate again.",tiers:[1,2]},
     {day:"Fri · Enrichment",title:"Perfect numbers",detail:"6 = 1 + 2 + 3. Its factors add up to itself. Hunt the next one.",tiers:[2]}
   ]},
  {n:5,title:"Proof & Project",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"Missing-digit division, the Snack Run project, and the Mission 02 test with its explain-your-thinking question.",
   days:[
     {day:"Mon · 5.1",title:"Missing-digit division",detail:"Reason backwards from the quotient to the digits under the bar.",tiers:[0,2]},
     {day:"Tue · 5.2",title:"Snack Run",detail:"Split real quantities among real people. Write down every leftover call.",tiers:[1,2]},
     {day:"Wed · 5.3",title:"Remainder defence",detail:"Present the plan and justify each decision out loud.",tiers:[2]},
     {day:"Thu · Review",title:"Error journal sweep",detail:"Re-read every entry from the mission. Fix only what repeats.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 02 test",detail:"12 items + one explanation. Trophy band awarded.",tiers:[1,2]}
   ]}
];

const WEEKS_U3 = [
  {n:1,title:"Place Value to 10,000",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"Four digits, and what each one is worth. Georgia asks for numbers up to 10,000 in third grade \u2014 the millions come back as the Challenge tier, where they belong.",
   days:[
     {day:"Mon · 1.1",title:"How big is a million",detail:"Build the place-value chart out to millions. Read and write numbers off it.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"Ten times bigger",detail:"Each place is ten of the place on its right. That single rule runs the whole system.",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"Compare, order, round",detail:"Line up the places, not the digits — then round to whichever place you were asked for.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"Order of operations",detail:"First look at why 5 + 3 × 4 has one legal answer. Week 3 goes deeper.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"A Million Dots begins",detail:"Estimate how much space a million dots takes. Write the guess down before measuring anything.",tiers:[2]}
   ]},
  {n:2,title:"Rounding & Estimating",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Rounding to the nearest 10 and 100, and using it before a calculation rather than after: an estimate is how you catch a wrong answer without redoing it.",
   days:[
     {day:"Mon · 2.1",title:"Estimate first, always",detail:"Round both numbers, compute the rough answer, then do the real one.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"How wrong is your estimate?",detail:"Compare estimate to exact. Was it high or low, and why?",tiers:[0,1]},
     {day:"Wed · 2.3",title:"Fermi questions",detail:"How many hairs on a dog? Estimate with reasons, not with facts.",tiers:[1,2]},
     {day:"Thu · 2.4",title:"Is that answer sensible?",detail:"Given four answers, pick the only possible one without computing.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"A Million Dots, measured",detail:"Prove the estimate. Count one square, scale it up, defend the number.",tiers:[2]}
   ]},
  {n:3,title:"Comparing & Ordering",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"Which is bigger, and how you know without counting. Place value does the work once the digits line up.",
   days:[
     {day:"Mon · 3.1",title:"Two answers, one expression",detail:"5 + 3 × 4 gives 17 or 32 depending on who's reading. That's the problem.",tiers:[0,1,2]},
     {day:"Tue · 3.2",title:"Groups go first",detail:"Multiplication builds a group; addition sets loose things beside it.",tiers:[0,1,2]},
     {day:"Wed · 3.3",title:"Brackets overrule",detail:"Brackets are how you say “no, do this bit first.”",tiers:[0,1,2]},
     {day:"Thu · 3.4",title:"Write your own",detail:"Build an expression that equals 24 in three different ways.",tiers:[1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–3. 85% to keep flying.",tiers:[1]}
   ]},
  {n:4,title:"Beyond Ten Thousand",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"The extension week: past 10,000, powers of ten and exponent notation. Fourth and fifth grade content, offered on top of a finished grade-three foundation rather than instead of it.",
   days:[
     {day:"Mon · 4.1",title:"The little raised number",detail:"2³ means three 2s multiplied — not 2 × 3. This trips up everybody once.",tiers:[0,1,2]},
     {day:"Tue · 4.2",title:"Powers of ten",detail:"10⁶ is a 1 with six zeros. Now place value and exponents are the same idea.",tiers:[0,1,2]},
     {day:"Wed · 4.3",title:"Expression Duel",detail:"Four cards, any operations and powers. Build the biggest value.",tiers:[1,2]},
     {day:"Thu · Review",title:"Million Dots display",detail:"Finish the display and the write-up. Error journal sweep.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 03 test",detail:"12 items + one explanation. Trophy band awarded.",tiers:[1,2]}
   ]}
];

const WEEKS_U4 = [
  {n:1,title:"Fractions Are Numbers",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"A fraction is not two numbers stacked up — it is one number, and it has a place on the number line. By Friday he can build any fraction, find it on a line, and say what each half of the symbol means.",
   days:[
     {day:"Mon · 1.1",title:"One whole, cut up",detail:"The bottom number says how many pieces; the top counts the ones you took.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"Same number, new name",detail:"Cut every piece in two and 1/2 becomes 2/4. Nothing moved.",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"Which is bigger",detail:"You can't compare pieces of different sizes. Make them match first.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"Adding needs matching pieces",detail:"1/2 + 1/4 only works once both are quarters.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Fold the Universe begins",detail:"Fold a paper strip into halves, quarters, eighths. Mark every fraction you meet.",tiers:[2]}
   ]},
  {n:2,title:"Equivalence",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Why multiplying top and bottom by the same number leaves the value alone — and why that is the single most useful move in the whole mission.",
   days:[
     {day:"Mon · 2.1",title:"Multiply top and bottom",detail:"×2, ×3, ×4 — the same amount wearing different clothes.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"Simplest form",detail:"Divide instead of multiplying. Stop when nothing divides both.",tiers:[0,1,2]},
     {day:"Wed · 2.3",title:"Missing numerators",detail:"3/4 = ?/12. Work out what the bottom was multiplied by.",tiers:[0,1,2]},
     {day:"Thu · 2.4",title:"Fraction families",detail:"Every fraction equal to 1/2, listed. What do they have in common?",tiers:[1,2]},
     {day:"Fri · Enrichment",title:"Equivalence wall",detail:"Build a wall of fraction strips and find every pair that lines up.",tiers:[2]}
   ]},
  {n:3,title:"Comparing & Ordering",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"Common denominators, benchmark fractions, and ordering a handful of awkward ones. Mid-unit quiz on Friday.",
   days:[
     {day:"Mon · 3.1",title:"Common denominators",detail:"Make the pieces the same size, then just count them.",tiers:[0,1,2]},
     {day:"Tue · 3.2",title:"Benchmarks",detail:"Is it more or less than 1/2? Often that settles it without any work.",tiers:[0,1,2]},
     {day:"Wed · 3.3",title:"Ordering four at once",detail:"Put 3/5, 2/3, 7/10 and 1/2 in order and defend the order.",tiers:[0,1,2]},
     {day:"Thu · 3.4",title:"Closer to 1 or to 0?",detail:"7/8 against 5/6 — compare the gaps, not the fractions.",tiers:[1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–3. 85% to keep flying.",tiers:[1]}
   ]},
  {n:4,title:"Adding & Subtracting",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Like denominators first, then unlike ones — which is the grade-five ceiling and the part that pays off later.",
   days:[
     {day:"Mon · 4.1",title:"Like denominators",detail:"Count the pieces. The bottom number does not change.",tiers:[0,1,2]},
     {day:"Tue · 4.2",title:"Unlike denominators",detail:"Convert one, then add. 1/2 + 1/4 the honest way.",tiers:[0,1,2]},
     {day:"Wed · 4.3",title:"Both need changing",detail:"1/2 + 1/3. Neither fits the other, so both move to sixths.",tiers:[0,1,2]},
     {day:"Thu · 4.4",title:"Subtracting from a whole",detail:"2 − 3/5. Turn the whole into fifths first.",tiers:[1,2]},
     {day:"Fri · Enrichment",title:"Closest to One",detail:"Draw cards, build a fraction, get nearest to 1 without going over.",tiers:[2]}
   ]},
  {n:5,title:"Fraction of a Set",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Fractions stop being pieces of one thing and become operators on a group — 2/5 of 30 counters, of 30 dollars, of 30 minutes.",
   days:[
     {day:"Mon · 5.1",title:"Split, then take",detail:"The bottom number splits the set; the top number takes groups.",tiers:[0,1,2]},
     {day:"Tue · 5.2",title:"Bigger sets",detail:"5/6 of 42. Divide first, multiply second — always that order.",tiers:[0,1,2]},
     {day:"Wed · 5.3",title:"Working backwards",detail:"3/4 of a number is 18. What was the number?",tiers:[1,2]},
     {day:"Thu · 5.4",title:"Fractions of time and money",detail:"2/3 of an hour, 3/8 of $40. Same move, real units.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Fold the Universe, built",detail:"Finish the paper number line to 1 with every fraction landed on it.",tiers:[2]}
   ]},
  {n:6,title:"Proof & Project",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"The equivalence proof, the finished number line, and the Mission 04 test with its explain-your-thinking question.",
   days:[
     {day:"Mon · 6.1",title:"Prove an equivalence",detail:"Show with a drawing why 2/3 = 8/12, without multiplying anything.",tiers:[0,2]},
     {day:"Tue · 6.2",title:"Number line defence",detail:"Present the folded line and justify where each fraction sits.",tiers:[1,2]},
     {day:"Wed · 6.3",title:"Mixed problems",detail:"Compare, add and take a fraction of a set, all in one page.",tiers:[1,2]},
     {day:"Thu · Review",title:"Error journal sweep",detail:"Re-read every entry from the mission. Fix only what repeats.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 04 test",detail:"12 items + one explanation. Trophy band awarded.",tiers:[1,2]}
   ]}
];

const WEEKS_U5 = [
  {n:1,title:"Adding to 1,000",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"The domain Year One never taught. Georgia and Common Core both ask for fluency in addition and subtraction within 1,000 by the end of third grade, and this is where it is built.",
   days:[
     {day:"Mon · 1.1",title:"Tenths and hundredths",detail:"0.3 is 3/10. 0.07 is 7/100. The places carry on to the right of the point.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"Decimals on the line",detail:"Where does 0.7 sit? Between which two tenths is 0.65?",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"Compare and round",detail:"0.5 against 0.45 — line up the points, not the digit counts.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"Money is decimals",detail:"$3.45 is three whole dollars and 45 hundredths of one.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"The $40 Mission begins",detail:"Plan three dinners on paper for a real $40 budget. No shopping yet.",tiers:[2]}
   ]},
  {n:2,title:"Subtracting to 1,000",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Regrouping across zeros, and estimating first so a wrong answer announces itself before the working does.",
   days:[
     {day:"Mon · 2.1",title:"Line up the points",detail:"Not the right-hand ends. The points.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"Holding places with zeros",detail:"3.4 + 0.75 works once you write 3.40.",tiers:[0,1,2]},
     {day:"Wed · 2.3",title:"Making change",detail:"Subtract from $20.00. The zeros are doing real work.",tiers:[0,1,2]},
     {day:"Thu · 2.4",title:"Estimate first",detail:"Round to the nearest dollar before you add anything.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Change Sprint",detail:"Make an exact amount with the fewest coins. Beat your own record.",tiers:[2]}
   ]},
  {n:3,title:"Two-Step Problems",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"Two operations, one story, and a letter standing in for the unknown. The step most word problems actually turn on.",
   days:[
     {day:"Mon · 3.1",title:"Rounding to the nearest cent",detail:"And to the nearest dollar. Two different questions.",tiers:[0,1,2]},
     {day:"Tue · 3.2",title:"Unit price",detail:"Which is cheaper per item? Divide, then compare.",tiers:[0,1,2]},
     {day:"Wed · 3.3",title:"Is it a deal?",detail:"Three for $5 against $1.75 each. Prove your answer.",tiers:[0,1,2]},
     {day:"Thu · 3.4",title:"Multi-step money",detail:"Buy three things, pay with a twenty, count the change.",tiers:[1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–3. 85% to keep flying.",tiers:[1]}
   ]},
  {n:4,title:"Money & Decimals",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"The extension week: money in decimal notation and the grocery project. Both frameworks place decimals in grade four, so this sits on top rather than in the middle.",
   days:[
     {day:"Mon · 4.1",title:"Build the budget",detail:"Three dinners, one $40 ceiling, every price estimated first.",tiers:[0,1,2]},
     {day:"Tue · 4.2",title:"Shop it",detail:"Real store, real prices, running total kept by hand.",tiers:[1,2]},
     {day:"Wed · 4.3",title:"Reconcile the receipt",detail:"Estimate against actual. Where were you wrong, and by how much?",tiers:[1,2]},
     {day:"Thu · Review",title:"Error journal sweep",detail:"Re-read every entry from the mission. Fix only what repeats.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 05 test",detail:"12 items + one explanation. Trophy band awarded.",tiers:[1,2]}
   ]}
];

const WEEKS_U6 = [
  {n:1,title:"Quadrilaterals & Polygons",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"Shapes sorted by what is true about them rather than what they look like \u2014 parallel sides, right angles, and why a square is also a rectangle.",
   days:[
     {day:"Mon · 1.1",title:"What an angle is",detail:"Not a corner — an amount of turn. A right angle is a quarter of the way round.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"Measure and draw",detail:"Protractor in hand. Estimate first, then measure, then check the gap.",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"Angles that add up",detail:"On a straight line they make 180°. Round a point, 360°.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"Sorting shapes",detail:"A square is also a rectangle. Sort by properties, not by looks.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Angle Guess",detail:"Estimate an angle, then measure it. Closest guess scores.",tiers:[2]}
   ]},
  {n:2,title:"Symmetry & Perimeter",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Lines of symmetry, then perimeter: the distance round the outside, and finding a missing side when you know the rest.",
   days:[
     {day:"Mon · 2.1",title:"Perimeter is the fence",detail:"Add the sides. Area is the grass. Two different measurements.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"Area of rectangles",detail:"Back to Mission 01's rectangle, now with units attached.",tiers:[0,1,2]},
     {day:"Wed · 2.3",title:"Same fence, different grass",detail:"Every rectangle with perimeter 24 — which holds the most?",tiers:[0,1,2]},
     {day:"Thu · 2.4",title:"Compound shapes",detail:"Cut an L-shape into two rectangles and add.",tiers:[1,2]},
     {day:"Fri · Enrichment",title:"The biggest pen",detail:"24 metres of fence and a wall to build against. Now what?",tiers:[2]}
   ]},
  {n:3,title:"Area by Tiling",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"Cover it in unit squares and count them. Then notice you were multiplying the whole time \u2014 which is the discovery the standard actually asks for, not the formula.",
   days:[
     {day:"Mon · 3.1",title:"Across, then up",detail:"(3, 5) is not (5, 3). Plot both and see why.",tiers:[0,1,2]},
     {day:"Tue · 3.2",title:"Plot a shape",detail:"Four points, one rectangle. Read its side lengths off the grid.",tiers:[0,1,2]},
     {day:"Wed · 3.3",title:"Distance on the grid",detail:"How far from (2,3) to (7,3)? Count, then subtract.",tiers:[0,1,2]},
     {day:"Thu · 3.4",title:"Sailing directions",detail:"Give a route as a list of coordinates and have someone follow it.",tiers:[1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–3. 85% to keep flying.",tiers:[1]}
   ]},
  {n:4,title:"Angles (extension)",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"Degrees, protractors and angle sums. Fourth-grade content: grade three classifies shapes without measuring angles, so this is the acceleration tier.",
   days:[
     {day:"Mon · 4.1",title:"Lines of symmetry",detail:"Fold it. If the halves match, that fold is a line of symmetry.",tiers:[0,1,2]},
     {day:"Tue · 4.2",title:"How many lines?",detail:"A square has four. A rectangle has two. Why the difference?",tiers:[0,1,2]},
     {day:"Wed · 4.3",title:"Flips and turns",detail:"Reflect a shape across a line, then rotate it a quarter turn.",tiers:[0,1,2]},
     {day:"Thu · 4.4",title:"Symmetry in the room",detail:"Photograph or sketch five symmetric things you actually own.",tiers:[0,1]},
     {day:"Fri · Enrichment",title:"Tessellation",detail:"Which shapes tile a floor with no gaps? Test three and explain.",tiers:[2]}
   ]},
  {n:5,title:"Coordinates & Project",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"The extension project: Map a Planet on the coordinate plane. Fifth-grade content, and a good use of a week once the grade-three geometry is secure.",
   days:[
     {day:"Mon · 5.1",title:"Design the planet",detail:"Coastline, three landmarks, all plotted on labelled axes.",tiers:[0,2]},
     {day:"Tue · 5.2",title:"Write the directions",detail:"A route by coordinates only. No landmarks named.",tiers:[1,2]},
     {day:"Wed · 5.3",title:"Sail someone else's map",detail:"Follow Mom's directions exactly. Where do the two maps disagree?",tiers:[2]},
     {day:"Thu · Review",title:"Error journal sweep",detail:"Re-read every entry from the mission. Fix only what repeats.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 06 test",detail:"12 items + one explanation. Trophy band awarded.",tiers:[1,2]}
   ]}
];

const WEEKS_U7 = [
  {n:1,title:"Graphs & Averages",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"Data stops being a pile of numbers and becomes a claim someone is making. By Friday he can compute all four measures and say which one is telling the truth.",
   days:[
     {day:"Mon · 1.1",title:"Reading a graph",detail:"Find the scale before you read a single bar. Every graph makes a choice about scale.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"Building a graph",detail:"Tally, choose a scale, draw the bars. Label the axes or the graph says nothing.",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"The four measures",detail:"Mean, median, mode, range — computed on the same set, then compared.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"When the average lies",detail:"One huge value drags the mean and leaves the median alone. That is the Big Question.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Predict the Roll",detail:"Call the outcome, tally 50 trials, compare prediction to reality.",tiers:[2]}
   ]},
  {n:2,title:"Survey & Probability",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"He writes his own question, collects twenty real answers, and meets the difference between what is likely and what actually happened. Mid-unit quiz on Friday.",
   days:[
     {day:"Mon · 2.1",title:"Write the question",detail:"A question that doesn't push the answer. Rewrite three loaded ones until they're fair.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"Ask 20 people",detail:"Real people, tallied on paper as they answer. No editing afterwards.",tiers:[1,2]},
     {day:"Wed · 2.3",title:"Graph what you got",detail:"Bar graph plus all four measures of his own data.",tiers:[0,1,2]},
     {day:"Thu · 2.4",title:"Chance as a number",detail:"Impossible to certain, written as a count out of the total.",tiers:[0,1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–2. 85% to keep flying.",tiers:[1]}
   ]},
  {n:3,title:"Proof & Project",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"Ask 20 People gets published — headline, graph, and one honest sentence about what the data cannot tell you — and the Mission 07 test closes the mission.",
   days:[
     {day:"Mon · 3.1",title:"Publish the findings",detail:"One headline, one graph, one sentence on what twenty people can't prove.",tiers:[0,2]},
     {day:"Tue · 3.2",title:"The misleading graph",detail:"Start the axis at 90 instead of 0 and watch a tiny gap look enormous.",tiers:[1,2]},
     {day:"Wed · 3.3",title:"50 trials",detail:"Predict, roll fifty times, tally, and explain the gap between the two.",tiers:[1,2]},
     {day:"Thu · Review",title:"Error journal sweep",detail:"Re-read every entry from the mission. Fix only what repeats.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 07 test",detail:"12 items + one explanation. Trophy band awarded.",tiers:[1,2]}
   ]},
  {n:4,title:"Measure It Properly",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"The half of 3.MDR.5 this course never taught: a ruler read to the quarter inch, and litres and grams handled as real amounts rather than words in a problem. None of it can be learned from a flashcard, which is exactly why it needs a week rather than a sprint.",
   days:[
     {day:"Mon · 4.1",title:"The ruler, honestly",detail:"Whole, half and quarter inches. Read the marks; do not estimate between them.",tiers:[0,1,2]},
     {day:"Tue · 4.2",title:"Litres and millilitres",detail:"Pour it. A jug, a cup and a bottle beat any diagram.",tiers:[0,1,2]},
     {day:"Wed · 4.3",title:"Grams and kilograms",detail:"Balance scales and a bag of flour. What a kilogram actually feels like.",tiers:[0,1,2]},
     {day:"Thu · 4.4",title:"Mixed measures",detail:"Length, volume and mass in one sitting, so the units stop blurring.",tiers:[0,1]},
     {day:"Fri · Fri",title:"Measurement check",detail:"Six questions across all three measures.",tiers:[0,1,2]}
   ]},
  {n:5,title:"Telling the Time",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"Time to the nearest minute, then how long something took. Georgia asks for elapsed time to the hour, half hour and quarter hour, and this is the week that earns the Mission 07 test.",
   days:[
     {day:"Mon · 5.1",title:"Time to the minute",detail:"Every minute on the face, not just o'clock and half past.",tiers:[0,1,2]},
     {day:"Tue · 5.2",title:"Elapsed time",detail:"Start, finish, and the gap between — hours, halves and quarters.",tiers:[0,1,2]},
     {day:"Wed · 5.3",title:"Clocks and calendars",detail:"Read the day's real timetable off a real clock.",tiers:[0,1]},
     {day:"Thu · 5.4",title:"Error journal",detail:"Fix only what repeats.",tiers:[0,1]},
     {day:"Fri · Fri",title:"Mission 07 test",detail:"Graphs, measures and time together.",tiers:[0,1,2]}
   ]}
];

const WEEKS_U8 = [
  {n:1,title:"Patterns & Machines",gate:"Full worksheets",gateColor:"#4ADE80",isFull:true,
   summary:"A pattern becomes a rule you can name, and a rule becomes a machine you can run forwards or backwards. By Friday he can find the hundredth term without writing the first ninety-nine.",
   days:[
     {day:"Mon · 1.1",title:"Find the rule",detail:"Extend the pattern, then say the rule out loud in one sentence.",tiers:[0,1,2]},
     {day:"Tue · 1.2",title:"Function machines",detail:"In goes a number, out comes a number. Build the in/out table.",tiers:[0,1,2]},
     {day:"Wed · 1.3",title:"Two-step rules",detail:"× 3 then + 2. Order matters, exactly as in Mission 03.",tiers:[0,1,2]},
     {day:"Thu · 1.4",title:"Working backwards",detail:"Given the output, undo the machine one step at a time.",tiers:[0,1,2]},
     {day:"Fri · Enrichment",title:"Guess My Rule",detail:"One runs the machine, the other cracks it in five inputs.",tiers:[2]}
   ]},
  {n:2,title:"Variables & Expressions",gate:"Outlined",gateColor:"#38BDF8",isFull:false,
   summary:"The letter is not a mystery and not a label — it is a number that hasn't been named yet, and 3n means three of whatever it turns out to be.",
   days:[
     {day:"Mon · 2.1",title:"What a letter is",detail:"n is a seat a number sits in. 3n is three of them.",tiers:[0,1,2]},
     {day:"Tue · 2.2",title:"Evaluate it",detail:"Put the number in, work it out, one substitution at a time.",tiers:[0,1,2]},
     {day:"Wed · 2.3",title:"Write the expression",detail:"Turn a sentence into an expression: 'five more than double n'.",tiers:[0,1,2]},
     {day:"Thu · 2.4",title:"Two letters",detail:"a and b in the same expression. Substitute both before simplifying.",tiers:[1,2]},
     {day:"Fri · Enrichment",title:"Perimeter as a rule",detail:"Write the perimeter of any square as 4s, then test it on three squares.",tiers:[2]}
   ]},
  {n:3,title:"One-Step Equations",gate:"Quiz Friday",gateColor:"#FBBF24",isFull:false,
   summary:"Equations are scales that must stay level. Whatever you do to one side you do to the other, and the unknown falls out on its own. Mid-unit quiz on Friday.",
   days:[
     {day:"Mon · 3.1",title:"Keep it level",detail:"x + 7 = 19. Take seven from both sides and read what's left.",tiers:[0,1,2]},
     {day:"Tue · 3.2",title:"Multiply and divide",detail:"3x = 21. Divide both sides by three.",tiers:[0,1,2]},
     {day:"Wed · 3.3",title:"Check your answer",detail:"Put it back in. If both sides match, you're done — no marking needed.",tiers:[0,1,2]},
     {day:"Thu · 3.4",title:"Word to equation",detail:"Turn a real situation into an equation, then solve it.",tiers:[1,2]},
     {day:"Fri · Quiz",title:"Mid-unit quiz",detail:"8 items across Weeks 1–3. 85% to keep flying.",tiers:[1]}
   ]},
  {n:4,title:"The Math Trail",gate:"Unit test",gateColor:"#F472B6",isFull:false,
   summary:"The capstone. A numbered trail through the house where every stop is a problem he wrote, drawing on all eight missions — and Mom has to walk it.",
   days:[
     {day:"Mon · 4.1",title:"Design the trail",detail:"Ten stops, one per mission plus two of his choosing. Map it first.",tiers:[0,2]},
     {day:"Tue · 4.2",title:"Write the problems",detail:"Each stop gets a problem and a hidden answer key in his handwriting.",tiers:[1,2]},
     {day:"Wed · 4.3",title:"Mom walks it",detail:"He marks her work. Any ambiguous question gets rewritten on the spot.",tiers:[2]},
     {day:"Thu · Review",title:"Error journal sweep",detail:"Re-read every entry from all eight missions. Name the one habit that fixed itself.",tiers:[0,1]},
     {day:"Fri · Test",title:"Mission 08 test",detail:"12 items + the completed trail. Final trophy band awarded.",tiers:[1,2]}
   ]}
];

const PUZZLES_U6 = [
  {label:"C1",pre:"90 + ",post:"0 = 180",answer:"9",hint:"C1: Two right angles make a straight line."},
  {label:"C2",pre:"Perimeter 24, sides 8 and ",post:"",answer:"4",hint:"C2: 8 + 8 is 16, and the two short sides share what's left."},
  {label:"C3",pre:"A square has ",post:" lines of symmetry",answer:"4",hint:"C3: Two folds through the middle, two through the corners."}
];

const STANDARDS_U6 = [
  {code:"3.GSR.6",level:"on-grade",where:"Weeks 1–2",text:"Describe attributes of polygons \u2014 parallel and perpendicular segments, right angles and lines of symmetry \u2014 with a focus on classifying quadrilaterals."},
  {code:"3.GSR.7",level:"on-grade",where:"Week 3",text:"Find the area of rectangles, first by tiling and counting, then by discovering that area comes from multiplying the dimensions."},
  {code:"3.GSR.8",level:"on-grade",where:"Week 3",text:"Find the perimeter of polygons, including rectangles with the same perimeter but different areas and the reverse."},
  {code:"3.MD.7",level:"on-grade",where:"Week 3",text:"Relate area to multiplication and addition \u2014 tiling, the distributive property, and the additive area of composite rectangles. (Common Core.)"},
  {code:"4.MD.C.5",level:"acceleration",where:"Weeks 4–5",text:"Angle measurement in degrees. Fourth grade: grade 3 classifies shapes without measuring angles."},
  {code:"5.G.A.1",level:"acceleration",where:"Week 5",text:"The coordinate plane. Fifth grade."},
];

const PUZZLES_U7 = [
  {label:"C1",pre:"Mean of 6, 8 and ",post:" is 7",answer:"7",hint:"C1: The three have to total 21."},
  {label:"C2",pre:"Median of 3, ",post:", 9 is 5",answer:"5",hint:"C2: The middle number when they're in order."},
  {label:"C3",pre:"Range of 4 and 1",post:" is 8",answer:"2",hint:"C3: Biggest minus smallest, so the big one is 12."}
];

const STANDARDS_U7 = [
  {code:"3.MDR.5",level:"on-grade",where:"Weeks 1–2",text:"Measure length, liquid volume, mass and time, and answer statistical questions using picture and bar graphs."},
  {code:"3.MD.4",level:"on-grade",where:"Week 4",text:"Measure lengths to the nearest half and quarter inch and show them on a line plot. (Common Core.)"},
  {code:"6.SP.A.2",level:"acceleration",where:"Week 3",text:"Centre and spread of a data set. Sixth-grade statistics."},
];

const PUZZLES_U8 = [
  {label:"C1",pre:"x + 5 = 12, so x = ",post:"",answer:"7",hint:"C1: Take five from both sides."},
  {label:"C2",pre:"4 × ",post:" = 28",answer:"7",hint:"C2: Divide both sides by four."},
  {label:"C3",pre:"Rule × 3 + 1. In 3, out 1",post:"",answer:"0",hint:"C3: Three threes is nine, and one more."}
];

const STANDARDS_U8 = [
  {code:"3.PAR.3",level:"on-grade",where:"Weeks 1–2",text:"Multiply and divide within 100, including numeric patterns, the inverse relationship, the properties of operations, one-digit numbers by multiples of 10, the meaning of the equal sign, and equations using a letter for the unknown."},
  {code:"3.OA.9",level:"on-grade",where:"Weeks 1–3",text:"Identify and explain arithmetic patterns, including patterns in the addition and multiplication tables. (Common Core.)"},
  {code:"4.OA.C.5",level:"acceleration",where:"Week 3",text:"Generate and analyse a pattern from a rule."},
  {code:"5.OA.B.3",level:"acceleration",where:"Week 4",text:"Two patterns compared. Fifth grade."},
];

const PUZZLES_U5 = [
  {label:"C1",pre:"0.",post:" = 3/10",answer:"3",hint:"C1: The first place after the point is tenths."},
  {label:"C2",pre:"$4.",post:"5 + $0.25 = $5.00",answer:"7",hint:"C2: Work backwards — $5.00 − $0.25 is what you started with."},
  {label:"C3",pre:"0.",post:"0 = 1/2",answer:"5",hint:"C3: Half of one hundred hundredths."}
];

const STANDARDS_U5 = [
  {code:"3.PAR.2",level:"on-grade",where:"Weeks 1–3",text:"Add and subtract within 10,000, with fluency required within 1,000 by the end of the year."},
  {code:"3.PAR.3",level:"on-grade",where:"Week 3",text:"Multiply and divide within 100, including numeric patterns, the inverse relationship, the properties of operations, one-digit numbers by multiples of 10, the meaning of the equal sign, and equations using a letter for the unknown."},
  {code:"4.NF.C.6",level:"acceleration",where:"Week 4",text:"Decimal notation. Georgia and Common Core both place decimals in grade 4."},
  {code:"4.MD.A.2",level:"acceleration",where:"Week 4",text:"Money problems in decimal notation."},
];

const PUZZLES_U4 = [
  {label:"C1",pre:"3/4 = ",post:"/12",answer:"9",hint:"C1: The bottom was multiplied by 3, so the top has to be as well."},
  {label:"C2",pre:"",post:"/8 = 1/2",answer:"4",hint:"C2: Half of eight pieces."},
  {label:"C3",pre:"2/3 + 1/6 = ",post:"/6",answer:"5",hint:"C3: Turn 2/3 into sixths before you add anything."}
];

const STANDARDS_U4 = [
  {code:"3.NR.4",level:"on-grade",where:"Weeks 1–4",text:"Represent fractions with denominators of 2, 3, 4, 6 and 8: unit fractions, fractions on a number line, fractions greater than one, comparing two unit fractions, and simple equivalents."},
  {code:"3.G.2",level:"on-grade",where:"Week 4",text:"Partition shapes into parts with equal areas and name each part as a unit fraction of the whole. (Common Core.)"},
  {code:"4.NF.A.1",level:"acceleration",where:"Week 5",text:"Equivalence by multiplying numerator and denominator."},
  {code:"4.NF.B.3",level:"acceleration",where:"Weeks 5–6",text:"Adding and subtracting fractions. Grade 3 is representation and comparison only \u2014 the right place to compact for a child who is ahead."},
];

const PUZZLES_U3 = [
  {label:"C1",pre:"3 + 4 × ",post:" = 23",answer:"5",hint:"C1: The multiplying happens first, so 4 × ▢ has to be 20."},
  {label:"C2",pre:"(6 + ",post:") × 3 = 27",answer:"3",hint:"C2: Work backwards — the brackets must come out as 9."},
  {label:"C3",pre:"2^",post:" = 32",answer:"5",hint:"C3: Keep doubling from 2 and count how many doublings it takes."}
];

const STANDARDS_U3 = [
  {code:"3.NR.1",level:"on-grade",where:"Weeks 1–3",text:"Use place value to read, write and compare numbers up to 10,000, and round whole numbers up to 1,000 to the nearest 10 or 100."},
  {code:"4.NBT.A.2",level:"acceleration",where:"Week 4",text:"Numbers past 10,000. Fourth-grade place value."},
  {code:"5.NBT.A.2",level:"acceleration",where:"Week 4",text:"Powers of ten in exponent form. Fifth grade."},
];

const PUZZLES_U2 = [
  {label:"C1",pre:"",post:"6 ÷ 4 = 24",answer:"9",hint:"C1: 4 × 24 = 96. Now read the tens digit off it."},
  {label:"C2",pre:"1",post:"5 ÷ 5 = 23",answer:"1",hint:"C2: 5 × 23 = 115. Which digit is missing from the middle?"},
  {label:"C3",pre:"8",post:" ÷ 7 = 12",answer:"4",hint:"C3: 7 × 12 = 84. The ones digit has to make it land exactly."}
];

const STANDARDS_U2 = [
  {code:"3.PAR.3",level:"on-grade",where:"Weeks 1–3",text:"Multiply and divide within 100, including numeric patterns, the inverse relationship, the properties of operations, one-digit numbers by multiples of 10, the meaning of the equal sign, and equations using a letter for the unknown."},
  {code:"3.OA.7",level:"on-grade",where:"Weeks 1–5",text:"Fluently multiply and divide within 100, knowing all products of two one-digit numbers from memory by the end of grade 3. (Common Core; Georgia has no explicit automaticity standard.)"},
  {code:"4.NBT.B.6",level:"acceleration",where:"Weeks 4–5",text:"Long division and remainders. Grade 3 avoids remainders entirely."},
];

const STANDARDS = [
  {code:"3.PAR.3",level:"on-grade",where:"Weeks 1–3",text:"Multiply and divide within 100, including numeric patterns, the inverse relationship, the properties of operations, one-digit numbers by multiples of 10, the meaning of the equal sign, and equations using a letter for the unknown."},
  {code:"3.OA.7",level:"on-grade",where:"Weeks 1–5",text:"Fluently multiply and divide within 100, knowing all products of two one-digit numbers from memory by the end of grade 3. (Common Core; Georgia has no explicit automaticity standard.)"},
  {code:"4.NBT.B.5",level:"acceleration",where:"Weeks 4–5",text:"Multi-digit multiplication. Fourth grade: grade 3 stops at facts within 100."},
  {code:"4.OA.B.4",level:"acceleration",where:"Week 5",text:"Factor pairs, primes and composites. Number-theory extension."},
];

const PRACTICE = [
  {id:"p1",label:"1.1",title:"Arrays Become Area",note:"Warm-Up facts, then break each big number into tens and ones.",
   items:[
     {t:0,q:"6 × 7",a:"42"},{t:0,q:"8 × 4",a:"32"},{t:0,q:"9 × 6",a:"54"},{t:0,q:"7 × 7",a:"49"},{t:2,q:"12 × 3",a:"36"},{t:2,q:"11 × 5",a:"55"},
     {t:2,q:"4 × 13",a:"52",hint:"40 + 12"},{t:2,q:"6 × 14",a:"84",hint:"60 + 24"},{t:2,q:"3 × 27",a:"81",hint:"60 + 21"},{t:2,q:"5 × 18",a:"90",hint:"50 + 40"},{t:2,q:"7 × 16",a:"112",hint:"70 + 42"},
     {t:2,q:"Area 84, one side 6. Other side?",a:"14",hint:"84 ÷ 6"},{t:2,q:"How many rectangles have area 36?",a:"5",hint:"1×36, 2×18, 3×12, 4×9, 6×6"}
   ]},
  {id:"p2",label:"1.2",title:"Breaking Apart",note:"One-digit times two-digit. Two rooms every time.",
   items:[
     {t:0,q:"5 × 9",a:"45"},{t:0,q:"8 × 8",a:"64"},{t:0,q:"7 × 8",a:"56"},{t:0,q:"6 × 9",a:"54"},{t:2,q:"4 × 12",a:"48"},{t:2,q:"3 × 11",a:"33"},
     {t:2,q:"8 × 34",a:"272",hint:"240 + 32"},{t:2,q:"6 × 47",a:"282",hint:"240 + 42"},{t:2,q:"9 × 26",a:"234",hint:"180 + 54"},{t:2,q:"7 × 58",a:"406",hint:"350 + 56"},{t:2,q:"4 × 96",a:"384",hint:"360 + 24"},
     {t:2,q:"6 × 4▢ = 2▲6 — what is ▢?",a:"6",hint:"6 × 46 = 276"},{t:2,q:"4 × 68 = ?",a:"272",hint:"Same as 8 × 34"}
   ]},
  {id:"p3",label:"1.3",title:"Mental Math Moves",note:"Go past the number, then take back the extra. No pencil.",
   items:[
     {t:2,q:"25 × 4",a:"100"},{t:2,q:"25 × 8",a:"200"},{t:2,q:"50 × 6",a:"300"},{t:2,q:"20 × 7",a:"140"},{t:2,q:"15 × 4",a:"60"},{t:2,q:"30 × 9",a:"270"},
     {t:2,q:"19 × 6",a:"114",hint:"20 × 6 − 6"},{t:2,q:"99 × 7",a:"693",hint:"700 − 7"},{t:2,q:"48 × 5",a:"240",hint:"Half of 480"},{t:2,q:"25 × 12",a:"300",hint:"100 × 3"},{t:2,q:"102 × 4",a:"408",hint:"400 + 8"},{t:2,q:"35 × 6",a:"210",hint:"180 + 30"},
     {t:2,q:"998 × 5",a:"4990",hint:"5000 − 10"},{t:2,q:"16 × 25",a:"400",hint:"Double–halve twice → 4 × 100"}
   ]},
  {id:"p4",label:"1.4",title:"The Four Rooms",note:"Two 2-digit numbers make four rooms. Count them before you add.",
   items:[
     {t:0,q:"10 × 10",a:"100"},{t:0,q:"20 × 30",a:"600"},{t:0,q:"40 × 50",a:"2000"},{t:0,q:"12 × 10",a:"120"},{t:0,q:"60 × 70",a:"4200"},{t:0,q:"90 × 80",a:"7200"},
     {t:2,q:"23 × 14",a:"322",hint:"200 + 80 + 30 + 12"},{t:2,q:"36 × 25",a:"900",hint:"600 + 150 + 120 + 30"},{t:2,q:"47 × 32",a:"1504",hint:"1200 + 210 + 80 + 14"},{t:2,q:"58 × 46",a:"2668",hint:"2000 + 320 + 300 + 48"},{t:2,q:"64 × 27",a:"1728",hint:"1200 + 420 + 80 + 28"},
     {t:2,q:"In 23 × 14, which two rooms make 92? Type their sum.",a:"92",hint:"80 + 12"},{t:2,q:"25 × 25 = 625. What is 26 × 26?",a:"676",hint:"625 + 25 + 25 + 1"}
   ]},
  {id:"p5",label:"Fri",title:"Rectangle Hunt & Puzzles",note:"Enrichment day. Reason it out — no guessing.",
   items:[
     {t:2,q:"6 × 4▢ = 276 → ▢",a:"6",hint:"6 × 46 = 276"},
     {t:2,q:"2▢3 × 4 = 932 → ▢",a:"3",hint:"932 ÷ 4 = 233"},
     {t:2,q:"1▢ × 15 = 240 → ▢",a:"6",hint:"16 × 15 = 240"},
     {t:2,q:"3▢ × 7 = 252 → ▢",a:"6",hint:"36 × 7 = 252"},
     {t:2,q:"▢▢ × 11 = 484 → ▢▢",a:"44",hint:"484 ÷ 11 = 44"},
     {t:2,q:"Rectangles with area 48?",a:"5",hint:"1×48, 2×24, 3×16, 4×12, 6×8"},
     {t:2,q:"Rectangles with area 37?",a:"1",hint:"37 is prime"},
     {t:2,q:"Rectangles with area 100?",a:"5",hint:"1×100, 2×50, 4×25, 5×20, 10×10"}
   ]}
];

const PRACTICE_U2 = [
  {id:"u2p1",label:"1.1",title:"Two Kinds of Division",note:"Facts first, then split the dividend into friendly pieces.",
   items:[
     {t:0,q:"42 ÷ 6",a:"7"},{t:0,q:"56 ÷ 8",a:"7"},{t:0,q:"63 ÷ 9",a:"7"},{t:0,q:"36 ÷ 4",a:"9"},{t:0,q:"72 ÷ 8",a:"9"},{t:0,q:"45 ÷ 5",a:"9"},
     {t:1,q:"84 ÷ 4",a:"21",hint:"80 ÷ 4 = 20, then 4 ÷ 4 = 1"},{t:1,q:"96 ÷ 6",a:"16",hint:"60 ÷ 6 = 10, then 36 ÷ 6 = 6"},{t:1,q:"75 ÷ 5",a:"15",hint:"50 ÷ 5 = 10, then 25 ÷ 5 = 5"},{t:1,q:"90 ÷ 6",a:"15",hint:"60 ÷ 6 = 10, then 30 ÷ 6 = 5"},{t:1,q:"78 ÷ 3",a:"26",hint:"60 ÷ 3 = 20, then 18 ÷ 3 = 6"},
     {t:2,q:"Area 96, one side 6. Other side?",a:"16",hint:"96 ÷ 6"},{t:2,q:"72 pencils, 8 per box. Boxes?",a:"9",hint:"72 ÷ 8"}
   ]},
  {id:"u2p2",label:"1.2",title:"The Missing Side",note:"Area and one side are given. Break the area up and hunt the other side.",
   items:[
     {t:0,q:"24 ÷ 3",a:"8"},{t:0,q:"54 ÷ 6",a:"9"},{t:0,q:"81 ÷ 9",a:"9"},{t:0,q:"32 ÷ 8",a:"4"},{t:0,q:"49 ÷ 7",a:"7"},{t:0,q:"60 ÷ 5",a:"12"},
     {t:1,q:"128 ÷ 4",a:"32",hint:"120 ÷ 4 = 30, then 8 ÷ 4 = 2"},{t:1,q:"156 ÷ 6",a:"26",hint:"120 ÷ 6 = 20, then 36 ÷ 6 = 6"},{t:1,q:"144 ÷ 3",a:"48",hint:"120 ÷ 3 = 40, then 24 ÷ 3 = 8"},{t:1,q:"175 ÷ 5",a:"35",hint:"150 ÷ 5 = 30, then 25 ÷ 5 = 5"},{t:1,q:"168 ÷ 7",a:"24",hint:"140 ÷ 7 = 20, then 28 ÷ 7 = 4"},
     {t:2,q:"Area 252, one side 7. Other side?",a:"36",hint:"210 ÷ 7 = 30, then 42 ÷ 7 = 6"},{t:2,q:"Bigger answer: 144 ÷ 6 or 168 ÷ 8? Type it.",a:"24",hint:"144 ÷ 6 = 24 and 168 ÷ 8 = 21"}
   ]},
  {id:"u2p3",label:"1.3",title:"When It Doesn't Fit",note:"Quotient and remainder are two different answers. Read which one is being asked for.",
   items:[
     {t:2,q:"17 ÷ 5 → remainder",a:"2"},{t:2,q:"23 ÷ 4 → remainder",a:"3"},{t:2,q:"38 ÷ 6 → remainder",a:"2"},{t:2,q:"50 ÷ 7 → remainder",a:"1"},{t:2,q:"29 ÷ 3 → remainder",a:"2"},{t:2,q:"45 ÷ 8 → remainder",a:"5"},
     {t:1,q:"17 ÷ 5 → quotient",a:"3",hint:"3 fives is 15, and 2 are left"},{t:1,q:"94 ÷ 4 → quotient",a:"23",hint:"80 ÷ 4 = 20, then 12 ÷ 4 = 3"},{t:2,q:"94 ÷ 4 → remainder",a:"2",hint:"4 × 23 = 92"},{t:1,q:"137 ÷ 6 → quotient",a:"22",hint:"120 ÷ 6 = 20, then 12 ÷ 6 = 2"},{t:2,q:"137 ÷ 6 → remainder",a:"5",hint:"6 × 22 = 132"},
     {t:2,q:"26 kids, vans hold 6. Vans needed?",a:"5",hint:"Four vans carry 24 — two kids still need a seat"},{t:2,q:"26 cookies for 6 friends. Whole cookies each?",a:"4",hint:"This time the leftover stays on the plate"}
   ]},
  {id:"u2p4",label:"1.4",title:"Chunks Get Tidy",note:"Bigger dividends. Pull out the biggest easy chunk first, then finish.",
   items:[
     {t:0,q:"120 ÷ 4",a:"30"},{t:0,q:"150 ÷ 5",a:"30"},{t:0,q:"240 ÷ 6",a:"40"},{t:0,q:"350 ÷ 7",a:"50"},{t:0,q:"180 ÷ 9",a:"20"},{t:0,q:"160 ÷ 8",a:"20"},
     {t:1,q:"372 ÷ 3",a:"124",hint:"300 ÷ 3 = 100, 60 ÷ 3 = 20, 12 ÷ 3 = 4"},{t:1,q:"465 ÷ 5",a:"93",hint:"450 ÷ 5 = 90, then 15 ÷ 5 = 3"},{t:1,q:"728 ÷ 8",a:"91",hint:"720 ÷ 8 = 90, then 8 ÷ 8 = 1"},{t:1,q:"594 ÷ 6",a:"99",hint:"540 ÷ 6 = 90, then 54 ÷ 6 = 9"},{t:1,q:"952 ÷ 7",a:"136",hint:"700 ÷ 7 = 100, 210 ÷ 7 = 30, 42 ÷ 7 = 6"},
     {t:2,q:"845 ÷ 4 → quotient",a:"211",hint:"800 ÷ 4 = 200, then 44 ÷ 4 = 11"},{t:2,q:"845 ÷ 4 → remainder",a:"1",hint:"4 × 211 = 844"}
   ]},
  {id:"u2p5",label:"Fri",title:"Remainder Race & Puzzles",note:"Enrichment day. Every leftover needs a decision — say which one you made.",
   items:[
     {t:2,q:"100 ÷ 7 → quotient",a:"14",hint:"7 × 14 = 98"},
     {t:2,q:"100 ÷ 7 → remainder",a:"2",hint:"100 − 98"},
     {t:2,q:"7 × ▢ = 91 → ▢",a:"13",hint:"70 + 21 = 91"},
     {t:2,q:"▢ ÷ 6 = 14 → ▢",a:"84",hint:"6 × 14"},
     {t:2,q:"53 people, 8 per table. Tables?",a:"7",hint:"Six tables seat 48 — round up"},
     {t:2,q:"$53, tickets cost $8. Tickets?",a:"6",hint:"Drop the leftover — you can't buy part of a ticket"},
     {t:2,q:"Smallest number over 50 that 7 divides?",a:"56",hint:"7 × 8"},
     {t:2,q:"9 × ▢ = 108 → ▢",a:"12",hint:"90 + 18 = 108"}
   ]}
];

const PRACTICE_U3 = [
  {id:"u3p1",label:"1.1",title:"How Big Is a Million",note:"Read the place, then say what the digit is worth. Type digits only — no commas needed.",
   items:[
     {t:0,q:"How many tens in 100?",a:"10"},{t:0,q:"How many hundreds in 1,000?",a:"10"},{t:2,q:"How many thousands in 10,000?",a:"10"},{t:0,q:"10 × 100",a:"1000"},{t:0,q:"100 × 100",a:"10000"},{t:0,q:"1,000 × 10",a:"10000"},
     {t:2,q:"In 3,472,861 — what is the 4 worth?",a:"400000",hint:"It sits in the hundred-thousands place"},{t:2,q:"In 3,472,861 — what is the 7 worth?",a:"70000",hint:"Ten-thousands place"},{t:2,q:"In 5,208,043 — what is the 2 worth?",a:"200000",hint:"Count the places from the right"},{t:2,q:"How many thousands make 4,000,000?",a:"4000",hint:"4,000 × 1,000 = 4,000,000"},{t:1,q:"Write six million forty thousand five",a:"6040005",hint:"6,040,005 — hold the empty places with zeros"},
     {t:2,q:"How many zeros in one million?",a:"6",hint:"1,000,000"},{t:2,q:"1,000 × 1,000",a:"1000000",hint:"A thousand thousands"}
   ]},
  {id:"u3p2",label:"1.2",title:"Ten Times Bigger",note:"Multiplying by ten shifts every digit one place left. Watch the zeros.",
   items:[
     {t:0,q:"40 × 10",a:"400"},{t:0,q:"700 × 10",a:"7000"},{t:0,q:"60 × 100",a:"6000"},{t:0,q:"8 × 1,000",a:"8000"},{t:0,q:"3,200 ÷ 10",a:"320"},{t:2,q:"45,000 ÷ 1,000",a:"45"},
     {t:1,q:"230 × 100",a:"23000",hint:"Two more zeros"},{t:1,q:"9,000 ÷ 100",a:"90",hint:"Take two zeros away"},{t:2,q:"56 × 1,000",a:"56000",hint:"Three more zeros"},{t:2,q:"740,000 ÷ 10,000",a:"74",hint:"Four zeros off"},{t:2,q:"How many times bigger is 800,000 than 800?",a:"1000",hint:"Three places left"},
     {t:2,q:"The 6 in 6,000 is worth how many times the 6 in 60?",a:"100",hint:"Two places apart"},{t:2,q:"How many 10,000s make one million?",a:"100",hint:"1,000,000 ÷ 10,000"}
   ]},
  {id:"u3p3",label:"1.3",title:"Compare, Order, Round",note:"Rounding depends on which place you were asked for. Read the question twice.",
   items:[
     {t:0,q:"Round 47 to the nearest ten",a:"50"},{t:0,q:"Round 83 to the nearest ten",a:"80"},{t:0,q:"Round 65 to the nearest ten",a:"70"},{t:0,q:"Round 128 to the nearest ten",a:"130"},{t:0,q:"Round 254 to the nearest ten",a:"250"},{t:0,q:"Round 999 to the nearest ten",a:"1000"},
     {t:2,q:"Round 47,382 to the nearest thousand",a:"47000",hint:"382 down beats 618 up"},{t:2,q:"Round 47,382 to the nearest ten thousand",a:"50000",hint:"Now the ends are 40,000 and 50,000"},{t:2,q:"Round 863,209 to the nearest hundred thousand",a:"900000",hint:"63,209 up to 900,000 is the shorter trip"},{t:2,q:"Larger number: 408,916 or 480,169? Type it.",a:"480169",hint:"Compare the ten-thousands place"},{t:1,q:"Round 2,499 to the nearest hundred",a:"2500",hint:"Look at the tens digit only"},
     {t:2,q:"Largest number that rounds to 5,000 at the nearest thousand",a:"5499",hint:"One less than the halfway point up"},{t:2,q:"Smallest number that rounds to 5,000 at the nearest thousand",a:"4500",hint:"Exactly halfway rounds up"}
   ]},
  {id:"u3p4",label:"1.4",title:"Order of Operations",note:"Build the groups first, then add and subtract what's left loose.",
   items:[
     {t:0,q:"3 + 4 × 2",a:"11"},{t:0,q:"10 − 2 × 3",a:"4"},{t:0,q:"12 ÷ 4 + 5",a:"8"},{t:0,q:"6 + 6 ÷ 2",a:"9"},{t:0,q:"2 × 3 + 4 × 5",a:"26"},{t:0,q:"20 − (4 + 6)",a:"10"},
     {t:1,q:"5 + 3 × 4",a:"17",hint:"Multiply first: 3 × 4 = 12"},{t:1,q:"(5 + 3) × 4",a:"32",hint:"Brackets overrule everything"},{t:1,q:"18 ÷ (3 + 6)",a:"2",hint:"3 + 6 = 9 first"},{t:1,q:"40 − 6 × 5 + 2",a:"12",hint:"40 − 30 + 2"},{t:1,q:"3 × (12 − 4) ÷ 6",a:"4",hint:"3 × 8 = 24, then ÷ 6"},
     {t:2,q:"2 + 3 × 4 − 6 ÷ 2",a:"11",hint:"2 + 12 − 3"},{t:2,q:"(8 + 4) × (9 − 6)",a:"36",hint:"12 × 3"}
   ]},
  {id:"u3p5",label:"Fri",title:"Powers & Expression Duel",note:"Enrichment day. The little raised number counts copies, not multiples.",
   items:[
     {t:2,q:"2³",a:"8",hint:"2 × 2 × 2"},
     {t:2,q:"5²",a:"25",hint:"5 × 5"},
     {t:2,q:"10⁴",a:"10000",hint:"A 1 with four zeros"},
     {t:2,q:"3² + 4²",a:"25",hint:"9 + 16"},
     {t:2,q:"2⁵ − 2³",a:"24",hint:"32 − 8"},
     {t:2,q:"Bigger value: 4³ or 3⁴? Type it.",a:"81",hint:"64 against 81"},
     {t:2,q:"10⁶ ÷ 10³",a:"1000",hint:"Six zeros take away three"},
     {t:2,q:"How many zeros in 10⁸?",a:"8",hint:"The exponent counts them"}
   ]}
];

const PRACTICE_U4 = [
  {id:"u4p1",label:"1.1",title:"One Whole, Cut Up",note:"Answers are whole numbers — when a question asks for a numerator, type just that number.",
   items:[
     {t:0,q:"Halves in one whole",a:"2"},{t:0,q:"Quarters in one whole",a:"4"},{t:0,q:"Eighths in one whole",a:"8"},{t:0,q:"1/2 = ?/4 → numerator",a:"2"},{t:0,q:"1/2 = ?/8 → numerator",a:"4"},{t:0,q:"3/3 = how many wholes?",a:"1"},
     {t:2,q:"1/4 + 1/4 + 1/4 = ?/4 → numerator",a:"3",hint:"Count the quarters"},{t:1,q:"How many thirds in 2 wholes?",a:"6",hint:"Three in each whole"},{t:1,q:"5/5 = how many wholes?",a:"1",hint:"All five pieces"},{t:1,q:"7/4 — how many whole ones?",a:"1",hint:"4/4 makes one whole"},{t:1,q:"7/4 — how many quarters left over?",a:"3",hint:"7 − 4"},
     {t:2,q:"Marks between 0 and 1 when you cut into fifths (not counting 0 and 1)",a:"4",hint:"Five pieces need four cuts"},{t:2,q:"3/8 and 5/8 — how many eighths apart?",a:"2",hint:"5 − 3"}
   ]},
  {id:"u4p2",label:"1.2",title:"Same Number, New Name",note:"Multiply top and bottom by the same thing and nothing about the amount changes.",
   items:[
     {t:0,q:"1/2 = ?/6 → numerator",a:"3"},{t:0,q:"1/3 = ?/6 → numerator",a:"2"},{t:0,q:"2/3 = ?/6 → numerator",a:"4"},{t:0,q:"1/4 = ?/8 → numerator",a:"2"},{t:0,q:"3/4 = ?/8 → numerator",a:"6"},{t:0,q:"1/5 = ?/10 → numerator",a:"2"},
     {t:1,q:"3/4 = ?/12 → numerator",a:"9",hint:"The bottom was tripled"},{t:1,q:"2/5 = ?/20 → numerator",a:"8",hint:"The bottom was multiplied by 4"},{t:1,q:"6/8 in quarters = ?/4 → numerator",a:"3",hint:"Divide both by 2"},{t:1,q:"10/15 simplified → numerator",a:"2",hint:"Divide both by 5"},{t:1,q:"9/12 simplified → denominator",a:"4",hint:"Divide both by 3"},
     {t:2,q:"8/12 = ?/3 → numerator",a:"2",hint:"Divide both by 4"},{t:2,q:"How many fractions equal 1/2 with a denominator under 20?",a:"9",hint:"2, 4, 6 … 18"}
   ]},
  {id:"u4p3",label:"1.3",title:"Which Is Bigger",note:"Make the pieces the same size first. Then it's just counting.",
   items:[
     {t:0,q:"Bigger: 1/2 or 1/4 → its denominator",a:"2"},{t:0,q:"Bigger: 1/3 or 1/5 → its denominator",a:"3"},{t:0,q:"Bigger: 3/4 or 1/4 → its numerator",a:"3"},{t:0,q:"Bigger: 2/5 or 3/5 → its numerator",a:"3"},{t:0,q:"Bigger: 5/6 or 5/8 → its denominator",a:"6"},{t:0,q:"Bigger: 7/10 or 3/10 → its numerator",a:"7"},
     {t:1,q:"2/3 or 3/5 in fifteenths → bigger numerator",a:"10",hint:"10/15 against 9/15"},{t:1,q:"3/4 or 5/8 in eighths → bigger numerator",a:"6",hint:"6/8 against 5/8"},{t:1,q:"5/6 or 7/9 in eighteenths → bigger numerator",a:"15",hint:"15/18 against 14/18"},{t:1,q:"Closer to 1: 7/8 or 5/6 → its denominator",a:"8",hint:"A gap of 1/8 beats a gap of 1/6"},{t:1,q:"2/3 and 3/4 in twelfths → bigger numerator",a:"9",hint:"8/12 against 9/12"},
     {t:2,q:"Largest of 3/5, 2/3, 7/10 in thirtieths → its numerator",a:"21",hint:"18/30, 20/30, 21/30"},{t:2,q:"Halfway between 1/2 and 3/4 as ?/8 → numerator",a:"5",hint:"Between 4/8 and 6/8"}
   ]},
  {id:"u4p4",label:"1.4",title:"Adding Needs Matching Pieces",note:"Change one fraction, or both, until the bottoms agree. Then count.",
   items:[
     {t:2,q:"1/4 + 1/4 = ?/4 → numerator",a:"2"},{t:2,q:"2/5 + 1/5 = ?/5 → numerator",a:"3"},{t:2,q:"3/8 + 2/8 = ?/8 → numerator",a:"5"},{t:2,q:"5/6 − 2/6 = ?/6 → numerator",a:"3"},{t:0,q:"7/10 − 4/10 = ?/10 → numerator",a:"3"},{t:2,q:"3/4 + 1/4 = how many wholes?",a:"1"},
     {t:2,q:"1/2 + 1/4 = ?/4 → numerator",a:"3",hint:"2/4 + 1/4"},{t:2,q:"2/3 + 1/6 = ?/6 → numerator",a:"5",hint:"4/6 + 1/6"},{t:2,q:"3/4 − 1/8 = ?/8 → numerator",a:"5",hint:"6/8 − 1/8"},{t:2,q:"5/6 − 1/3 = ?/6 → numerator",a:"3",hint:"5/6 − 2/6"},{t:2,q:"1/2 + 1/3 = ?/6 → numerator",a:"5",hint:"3/6 + 2/6"},
     {t:2,q:"3/4 + 2/3 = ?/12 → numerator",a:"17",hint:"9/12 + 8/12"},{t:2,q:"2 − 3/5 = ?/5 → numerator",a:"7",hint:"10/5 − 3/5"}
   ]},
  {id:"u4p5",label:"Fri",title:"Fraction of a Set & Closest to One",note:"Enrichment day. Divide by the bottom, multiply by the top — always that order.",
   items:[
     {t:2,q:"1/4 of 20",a:"5",hint:"20 ÷ 4"},
     {t:2,q:"2/5 of 30",a:"12",hint:"30 ÷ 5 = 6, then × 2"},
     {t:2,q:"3/8 of 40",a:"15",hint:"40 ÷ 8 = 5, then × 3"},
     {t:2,q:"2/3 of 45",a:"30",hint:"45 ÷ 3 = 15, then × 2"},
     {t:2,q:"5/6 of 42",a:"35",hint:"42 ÷ 6 = 7, then × 5"},
     {t:2,q:"3/4 of a number is 18. The number?",a:"24",hint:"18 ÷ 3 = 6 is one quarter"},
     {t:2,q:"Closest to 1 without going over: 5/6, 7/8, 9/10 → its denominator",a:"10",hint:"Gaps of 1/6, 1/8, 1/10"},
     {t:2,q:"Eighths in 2 wholes and 3 eighths",a:"19",hint:"16 + 3"}
   ]}
];

const PRACTICE_U5 = [
  {id:"u5p1",label:"1.1",title:"Tenths and Hundredths",note:"Answers are whole numbers. When a question says “in hundredths” or “in cents”, type just that count.",
   items:[
     {t:2,q:"0.3 = ?/10 → numerator",a:"3"},{t:2,q:"0.7 = ?/10 → numerator",a:"7"},{t:2,q:"0.09 = ?/100 → numerator",a:"9"},{t:2,q:"0.5 in hundredths",a:"50"},{t:2,q:"1/2 in hundredths",a:"50"},{t:2,q:"1/4 in hundredths",a:"25"},
     {t:2,q:"0.6 in hundredths",a:"60",hint:"6/10 is the same as 60/100"},{t:2,q:"$2.35 in cents",a:"235",hint:"Two dollars is 200 cents"},{t:2,q:"$0.08 in cents",a:"8",hint:"Eight hundredths of a dollar"},{t:1,q:"3/10 + 4/10 = ?/10 → numerator",a:"7",hint:"Count the tenths"},{t:2,q:"0.25 + 0.25 in hundredths",a:"50",hint:"25 + 25"},
     {t:2,q:"Bigger: 0.7 or 0.65 → in hundredths",a:"70",hint:"Write 0.7 as 0.70 first"},{t:2,q:"Hundredths in one whole",a:"100",hint:"Ten tenths, each cut into ten"}
   ]},
  {id:"u5p2",label:"1.2",title:"Decimals on the Line",note:"Every decimal has a place between 0 and 1. More digits does not mean bigger.",
   items:[
     {t:2,q:"0.4 in hundredths",a:"40"},{t:2,q:"0.9 in hundredths",a:"90"},{t:2,q:"0.05 in hundredths",a:"5"},{t:2,q:"0.75 in hundredths",a:"75"},{t:2,q:"0.1 in hundredths",a:"10"},{t:2,q:"1.0 in hundredths",a:"100"},
     {t:2,q:"0.65 sits below which tenth? In hundredths",a:"70",hint:"Between 0.60 and 0.70"},{t:2,q:"Halfway between 0.2 and 0.3, in hundredths",a:"25",hint:"20 and 30 hundredths"},{t:2,q:"0.8 in tenths",a:"8",hint:"Eight tenths"},{t:2,q:"Bigger: 0.4 or 0.35 → in hundredths",a:"40",hint:"0.40 against 0.35"},{t:2,q:"0.3 + 0.45 in hundredths",a:"75",hint:"30 + 45"},
     {t:2,q:"Largest of 0.5, 0.45, 0.055 → in thousandths",a:"500",hint:"500, 450 and 55 thousandths"},{t:2,q:"0.9 − 0.35 in hundredths",a:"55",hint:"90 − 35"}
   ]},
  {id:"u5p3",label:"1.3",title:"Money Math",note:"Money is just hundredths with a dollar sign. Answer everything in cents.",
   items:[
     {t:2,q:"$1.50 in cents",a:"150"},{t:2,q:"$0.75 in cents",a:"75"},{t:2,q:"$3.05 in cents",a:"305"},{t:2,q:"$10.00 in cents",a:"1000"},{t:2,q:"$0.99 in cents",a:"99"},{t:2,q:"$2.20 in cents",a:"220"},
     {t:2,q:"$3.45 + $2.30 in cents",a:"575",hint:"345 + 230"},{t:2,q:"$20.00 − $13.75 in cents",a:"625",hint:"Count up: 25 cents to $14, then $6"},{t:2,q:"$4.99 + $3.99 in cents",a:"898",hint:"$5 + $4 is 900, then take 2 off"},{t:2,q:"Three items at $2.50 — total in cents",a:"750",hint:"250 × 3"},{t:2,q:"$10 − ($2.50 + $3.75) in cents",a:"375",hint:"1000 − 625"},
     {t:2,q:"Cheaper per item: 4 for $6.00 or $1.60 each? In cents",a:"150",hint:"600 ÷ 4 against 160"},{t:2,q:"$20 shared 8 ways, in cents",a:"250",hint:"2000 ÷ 8"}
   ]},
  {id:"u5p4",label:"1.4",title:"Rounding & Estimating",note:"Round before you compute, then check the exact answer against the estimate.",
   items:[
     {t:2,q:"$3.45 to the nearest dollar, in dollars",a:"3"},{t:2,q:"$7.80 to the nearest dollar",a:"8"},{t:2,q:"$12.50 to the nearest dollar",a:"13"},{t:2,q:"$0.60 to the nearest dollar",a:"1"},{t:2,q:"$9.49 to the nearest dollar",a:"9"},{t:2,q:"$5.55 to the nearest dollar",a:"6"},
     {t:2,q:"Round $4.678 to the nearest cent, in cents",a:"468",hint:"The thousandths digit decides"},{t:2,q:"Round $23.49 to the nearest dollar, in dollars",a:"23",hint:"49 cents is under half"},{t:2,q:"Estimate $3.95 + $6.10 to the nearest dollar, in dollars",a:"10",hint:"$4 + $6"},{t:2,q:"Exact $3.95 + $6.10 in cents",a:"1005",hint:"395 + 610"},{t:2,q:"Round 0.482 to the nearest hundredth, in hundredths",a:"48",hint:"The 2 rounds down"},
     {t:2,q:"$19.99 × 3 in cents",a:"5997",hint:"$20 × 3 is 6000, then take 3 off"},{t:2,q:"Change from $50 after $19.99 × 2, in cents",a:"1002",hint:"5000 − 3998"}
   ]},
  {id:"u5p5",label:"Fri",title:"The $40 Mission & Change Sprint",note:"Enrichment day. Real prices, real change, everything in cents.",
   items:[
     {t:2,q:"Budget $40, spent $27.85. Left, in cents",a:"1215",hint:"4000 − 2785"},
     {t:2,q:"Fewest coins to make 67¢",a:"6",hint:"25, 25, 10, 5, 1, 1"},
     {t:2,q:"Fewest coins to make 41¢",a:"4",hint:"25, 10, 5, 1"},
     {t:2,q:"$5.00 shared 4 ways, in cents",a:"125",hint:"500 ÷ 4"},
     {t:2,q:"$12.40 + $9.85 + $15.30 in cents",a:"3755",hint:"1240 + 985 + 1530"},
     {t:2,q:"That total against a $40 budget — left over, in cents",a:"245",hint:"4000 − 3755"},
     {t:2,q:"$1.29 × 4 in cents",a:"516",hint:"129 × 4"},
     {t:2,q:"Cheaper per ounce: 12 oz for $3.60 or 16 oz for $4.00? In cents",a:"25",hint:"30¢ an ounce against 25¢"}
   ]}
];

const PRACTICE_U6 = [
  {id:"u6p1",label:"1.1",title:"What an Angle Is",note:"Every answer is a number of degrees, or a count. Type digits only.",
   items:[
     {t:2,q:"Degrees in a right angle",a:"90"},{t:2,q:"Degrees in a straight line",a:"180"},{t:2,q:"Degrees all the way round",a:"360"},{t:0,q:"Right angles in a full turn",a:"4"},{t:2,q:"Degrees in half a right angle",a:"45"},{t:0,q:"Right angles in a straight line",a:"2"},
     {t:2,q:"On a straight line: 130° and ?°",a:"50",hint:"180 − 130"},{t:2,q:"Round a point: 90°, 120° and ?°",a:"150",hint:"360 − 210"},{t:2,q:"Three angles of a triangle: 60°, 70° and ?°",a:"50",hint:"They add to 180"},{t:2,q:"An angle of 200° — how far past a straight line?",a:"20",hint:"200 − 180"},{t:2,q:"Two equal angles on a straight line — each is ?°",a:"90",hint:"180 shared evenly"},
     {t:2,q:"Angles in a square, added up",a:"360",hint:"Four right angles"},{t:2,q:"Turn 90° four times — total degrees",a:"360",hint:"All the way round"}
   ]},
  {id:"u6p2",label:"1.2",title:"Perimeter & Area",note:"Perimeter is the fence. Area is the grass. Read which one is being asked for.",
   items:[
     {t:0,q:"Perimeter of a 5 by 3 rectangle",a:"16"},{t:0,q:"Area of a 5 by 3 rectangle",a:"15"},{t:0,q:"Perimeter of a square with side 6",a:"24"},{t:0,q:"Area of a square with side 6",a:"36"},{t:0,q:"Perimeter of a 10 by 2 rectangle",a:"24"},{t:0,q:"Area of a 10 by 2 rectangle",a:"20"},
     {t:1,q:"Area 48, one side 6 — the other side",a:"8",hint:"48 ÷ 6"},{t:1,q:"Perimeter 30, one side 9 — the other side",a:"6",hint:"9 + 9 is 18, and 12 is left for two sides"},{t:1,q:"Area of a 12 by 7 rectangle",a:"84",hint:"84 square units"},{t:1,q:"Perimeter of a 12 by 7 rectangle",a:"38",hint:"12 + 12 + 7 + 7"},{t:1,q:"L-shape: a 6 by 4 block plus a 3 by 2 block — total area",a:"30",hint:"24 + 6"},
     {t:2,q:"Biggest area with perimeter 24 (whole sides)",a:"36",hint:"The 6 by 6 square"},{t:2,q:"Smallest area with perimeter 24 (whole sides)",a:"11",hint:"1 by 11"}
   ]},
  {id:"u6p3",label:"1.3",title:"The Coordinate Plane",note:"Across first, then up. (3, 5) is a different place from (5, 3).",
   items:[
     {t:0,q:"In (3, 5), the across number",a:"3"},{t:0,q:"In (3, 5), the up number",a:"5"},{t:0,q:"In (7, 2), the across number",a:"7"},{t:0,q:"In (0, 4), the across number",a:"0"},{t:0,q:"In (6, 6), the up number",a:"6"},{t:0,q:"In (9, 1), the up number",a:"1"},
     {t:1,q:"Distance from (2, 3) to (7, 3)",a:"5",hint:"Only the across number changed"},{t:1,q:"Distance from (4, 1) to (4, 8)",a:"7",hint:"8 − 1"},{t:1,q:"Rectangle at (1,1), (6,1), (6,4), (1,4) — its perimeter",a:"16",hint:"5 wide and 3 tall"},{t:1,q:"That same rectangle — its area",a:"15",hint:"5 × 3"},{t:1,q:"Start at (2,2), go 4 across and 3 up — the up number now",a:"5",hint:"2 + 3"},
     {t:2,q:"Square with corners (0,0), (5,0), (5,5) — the fourth corner's up number",a:"5",hint:"It sits at (0, 5)"},{t:2,q:"Distance from (1,2) to (1,9) plus (3,4) to (8,4)",a:"12",hint:"7 + 5"}
   ]},
  {id:"u6p4",label:"1.4",title:"Sorting Shapes & Symmetry",note:"Sort by what is true about a shape, not by what it looks like.",
   items:[
     {t:0,q:"Sides on a hexagon",a:"6"},{t:0,q:"Sides on a pentagon",a:"5"},{t:0,q:"Right angles in a rectangle",a:"4"},{t:0,q:"Equal sides on an equilateral triangle",a:"3"},{t:0,q:"Sides on an octagon",a:"8"},{t:0,q:"Pairs of parallel sides in a rectangle",a:"2"},
     {t:1,q:"Lines of symmetry in a square",a:"4",hint:"Two through the middle, two through the corners"},{t:1,q:"Lines of symmetry in a rectangle (not a square)",a:"2",hint:"The corner folds don't match"},{t:1,q:"Lines of symmetry in an equilateral triangle",a:"3",hint:"One from each corner"},{t:1,q:"Lines of symmetry in a circle — type 0 if too many to count",a:"0",hint:"Infinitely many, so type 0"},{t:2,q:"Degrees in a quarter turn",a:"90",hint:"A right angle"},
     {t:2,q:"Lines of symmetry in a regular hexagon",a:"6",hint:"One per pair of opposite corners and sides"},{t:2,q:"Sides of a shape whose angles add to 360",a:"4",hint:"Any quadrilateral"}
   ]},
  {id:"u6p5",label:"Fri",title:"Angle Guess & Map a Planet",note:"Enrichment day. Estimate before you measure, every single time.",
   items:[
     {t:2,q:"Angle on a straight line next to 47°",a:"133",hint:"180 − 47"},
     {t:2,q:"Angles round a point: 100°, 130° and ?°",a:"130",hint:"360 − 230"},
     {t:2,q:"Rectangle perimeter 20 with the largest area — that area",a:"25",hint:"The 5 by 5 square"},
     {t:2,q:"Rectangle area 36 with the smallest perimeter — that perimeter",a:"24",hint:"6 by 6"},
     {t:2,q:"Distance from (3,7) to (11,7)",a:"8",hint:"11 − 3"},
     {t:2,q:"A shape with 4 lines of symmetry and 4 equal sides — its angle count",a:"4",hint:"It's a square"},
     {t:2,q:"Turn 45° eight times — total degrees",a:"360",hint:"45 × 8"},
     {t:2,q:"Interior angles of a triangle, added",a:"180",hint:"Always"}
   ]}
];

const PRACTICE_U7 = [
  {id:"u7p1",label:"1.1",title:"Reading a Graph",note:"Each question describes a graph in words. Find the scale before you answer anything.",
   items:[
     {t:0,q:"Each ★ = 5 books. Monday has 3 ★ — books",a:"15"},{t:0,q:"Each ★ = 5 books. Friday has 6 ★ — books",a:"30"},{t:0,q:"A bar reaches 40 on a scale marked every 10 — its value",a:"40"},{t:0,q:"Each ▮ = 2 goals. A bar of 7 ▮ — goals",a:"14"},{t:0,q:"Bars: Red 8, Blue 5 — total",a:"13"},{t:0,q:"Bars: Red 8, Blue 5 — difference",a:"3"},
     {t:1,q:"Scale every 5. A bar halfway between 20 and 30",a:"25",hint:"Halfway is one mark up"},{t:1,q:"Three full groups of five tallies plus 2 — total",a:"17",hint:"15 and 2 more"},{t:1,q:"Graph shows Mon 12, Tue 9, Wed 15 — three-day total",a:"36"},{t:1,q:"Each ▮ = 2 goals. 24 goals is how many ▮",a:"12",hint:"24 ÷ 2"},{t:1,q:"Each ★ = 4 pets. 6 ★ and a half ★ — pets",a:"26",hint:"Half a star is 2"},
     {t:2,q:"Mon 12, Tue 9, Wed 15, Thu 0 — mean of the four days",a:"9",hint:"36 ÷ 4 — the zero still counts as a day"},{t:2,q:"Each ★ = 5. Four rows total 90 books — stars altogether",a:"18",hint:"90 ÷ 5"}
   ]},
  {id:"u7p2",label:"1.2",title:"Mean, Median, Mode, Range",note:"Every set here is chosen so the answer comes out whole. Put the numbers in order before you look for a middle.",
   items:[
     {t:2,q:"Mean of 4, 6, 8",a:"6"},{t:2,q:"Mean of 10 and 20",a:"15"},{t:0,q:"Range of 3, 9, 12",a:"9"},{t:0,q:"Mode of 5, 7, 7, 9",a:"7"},{t:0,q:"Median of 2, 5, 9",a:"5"},{t:0,q:"Total of 6, 7, 8, 9",a:"30"},
     {t:2,q:"Mean of 4, 7, 7, 9, 13",a:"8",hint:"They total 40"},{t:1,q:"Median of 4, 7, 7, 9, 13",a:"7"},{t:1,q:"Range of 4, 7, 7, 9, 13",a:"9",hint:"13 − 4"},{t:1,q:"Median of 2, 4, 6, 8",a:"5",hint:"Halfway between the two middles"},{t:2,q:"Mean of 12, 14, 16, 18",a:"15"},
     {t:2,q:"Five numbers have mean 10 — their total",a:"50",hint:"Mean × how many"},{t:2,q:"Four scores total 32. Add a fifth score of 8 — new mean",a:"8",hint:"40 ÷ 5"}
   ]},
  {id:"u7p3",label:"1.3",title:"When the Average Lies",note:"One extreme value. Watch carefully which measures move and which do not.",
   items:[
     {t:2,q:"Mean of 5, 5, 5, 5",a:"5"},{t:0,q:"Median of 5, 5, 5, 5",a:"5"},{t:2,q:"Mean of 5, 5, 5, 25",a:"10"},{t:0,q:"Median of 5, 5, 5, 25",a:"5"},{t:0,q:"Range of 5, 5, 5, 25",a:"20"},{t:0,q:"Mode of 5, 5, 5, 25",a:"5"},
     {t:2,q:"Four people earn 10 each, a fifth earns 60 — mean",a:"20",hint:"100 ÷ 5"},{t:1,q:"Those same five people — median",a:"10"},{t:1,q:"Those same five people — range",a:"50"},{t:2,q:"Remove the 60. Mean of the four left",a:"10"},{t:1,q:"Type the value of the measure that best describes a typical one of those five people",a:"10",hint:"The median, 10 — the mean of 20 describes nobody"},
     {t:2,q:"Six houses cost 200 each and one costs 900 — mean",a:"300",hint:"2100 ÷ 7"},{t:2,q:"Those same seven houses — median",a:"200"}
   ]},
  {id:"u7p4",label:"1.4",title:"Chance as a Number",note:"Chance is a count out of a total. Type the count that is asked for.",
   items:[
     {t:0,q:"Faces on one die",a:"6"},{t:0,q:"Ways to roll a 4 on one die",a:"1"},{t:0,q:"Even numbers on one die",a:"3"},{t:0,q:"Ways to roll more than 4 on one die",a:"2"},{t:0,q:"Bag of 3 red and 5 blue — total counters",a:"8"},{t:0,q:"That bag — how many draws out of 8 should be red",a:"3"},
     {t:1,q:"Chance of an even roll is _ out of 6 — type the top number",a:"3"},{t:1,q:"60 rolls of a die — expected number of 3s",a:"10",hint:"60 ÷ 6"},{t:1,q:"Bag of 3 red, 5 blue. 40 draws, replacing each time — expected reds",a:"15",hint:"3 in every 8, and 40 is five eights"},{t:1,q:"A coin flipped 50 times — expected heads",a:"25"},{t:1,q:"Spinner in 8 equal parts, 2 gold. 40 spins — expected golds",a:"10",hint:"2 in every 8"},
     {t:2,q:"Two dice — how many ways to total 7",a:"6",hint:"1+6, 2+5, 3+4 and each one reversed"},{t:2,q:"Two dice — how many outcomes are possible altogether",a:"36",hint:"6 for the first die, 6 for the second"}
   ]},
  {id:"u7p5",label:"Fri",title:"Predict the Roll & Ask 20 People",note:"Enrichment day. Predict first, in writing, every single time.",
   items:[
     {t:0,q:"People in the survey",a:"20"},{t:0,q:"Trials in Predict the Roll",a:"50"},
     {t:1,q:"20 people, 15 say yes — percent saying yes",a:"75",hint:"15 out of 20 is 75 out of 100"},{t:1,q:"20 people, 4 pick blue. Out of 100 people, expect",a:"20",hint:"Multiply both by 5"},
     {t:2,q:"50 rolls of a die — expected number of 6s",a:"8",hint:"50 ÷ 6 is 8 with 2 over"},{t:2,q:"20 people own a mean of 6 pets each — total pets",a:"120"},{t:2,q:"You predicted 8 sixes and rolled 14. Difference",a:"6",hint:"Real data misses the prediction. That is not an error."}
   ]}
];

const PRACTICE_U8 = [
  {id:"u8p1",label:"1.1",title:"Find the Rule",note:"Say the rule out loud in one sentence before you write the next number.",
   items:[
     {t:0,q:"3, 6, 9, 12 — next",a:"15"},{t:0,q:"5, 10, 15, 20 — next",a:"25"},{t:0,q:"2, 4, 8, 16 — next",a:"32"},{t:0,q:"20, 17, 14, 11 — next",a:"8"},{t:0,q:"1, 4, 7, 10 — next",a:"13"},{t:0,q:"100, 90, 80 — next",a:"70"},
     {t:1,q:"Rule × 3, starting at 2 — the fourth number",a:"54",hint:"2, 6, 18, 54"},{t:1,q:"1, 3, 7, 15 — next",a:"31",hint:"Double it and add one"},{t:1,q:"Rule × 2 + 1. Put in 5",a:"11"},{t:2,q:"4, 9, 14, 19 — the tenth number",a:"49",hint:"Start at 4 and add 5 nine times"},{t:1,q:"2, 5, 10, 17 — next",a:"26",hint:"The gaps go 3, 5, 7, 9"},
     {t:2,q:"Rule × 4 − 3. Put in 7",a:"25"},{t:2,q:"6, 11, 16, 21 — the twentieth number",a:"101",hint:"6 + 5 × 19"}
   ]},
  {id:"u8p2",label:"1.2",title:"Function Machines",note:"In goes a number, out comes a number. The machine never changes its mind halfway.",
   items:[
     {t:0,q:"Machine + 8. In 5",a:"13"},{t:0,q:"Machine × 6. In 4",a:"24"},{t:0,q:"Machine − 7. In 20",a:"13"},{t:0,q:"Machine × 10. In 9",a:"90"},{t:0,q:"Machine ÷ 2. In 18",a:"9"},{t:0,q:"Machine + 15. In 15",a:"30"},
     {t:1,q:"Machine × 3 + 4. In 6",a:"22",hint:"Multiply first"},{t:1,q:"Machine × 5 − 2. In 7",a:"33"},{t:1,q:"Machine × 2 + 9. In 12",a:"33"},{t:1,q:"Machine × 3 + 4. Out 25 — what went in",a:"7",hint:"Undo the + 4 first"},{t:1,q:"Machine × 4 − 1. Out 27 — what went in",a:"7"},
     {t:2,q:"In 2 gives 7, in 3 gives 10, in 4 gives 13. In 10 gives",a:"31",hint:"The rule is × 3 + 1"},{t:2,q:"In 1 gives 5, in 2 gives 9, in 3 gives 13. In 12 gives",a:"49",hint:"The rule is × 4 + 1"}
   ]},
  {id:"u8p3",label:"1.3",title:"Letters Standing for Numbers",note:"A letter is a number nobody has named yet. Put the number in, then work it out.",
   items:[
     {t:0,q:"n = 4. Value of n + 6",a:"10"},{t:0,q:"n = 4. Value of 3n",a:"12"},{t:0,q:"n = 7. Value of n − 3",a:"4"},{t:0,q:"n = 5. Value of 2n",a:"10"},{t:0,q:"n = 9. Value of n + n",a:"18"},{t:0,q:"n = 6. Value of 10 − n",a:"4"},
     {t:1,q:"n = 5. Value of 3n + 2",a:"17"},{t:1,q:"n = 8. Value of 2n − 5",a:"11"},{t:1,q:"a = 3, b = 7. Value of 4a + b",a:"19",hint:"12 and 7"},{t:1,q:"n = 6. Value of n × n",a:"36"},{t:1,q:"n = 12. Value of n ÷ 4 + 5",a:"8"},
     {t:2,q:"n = 4. Value of 2n + 3n",a:"20",hint:"That's 5n"},{t:2,q:"p = 9. Value of 100 − 8p",a:"28"}
   ]},
  {id:"u8p4",label:"1.4",title:"One-Step Equations",note:"Do the same thing to both sides. Type the value of the letter.",
   items:[
     {t:0,q:"x + 4 = 11",a:"7"},{t:0,q:"x − 5 = 9",a:"14"},{t:0,q:"3x = 21",a:"7"},{t:0,q:"x + 12 = 20",a:"8"},{t:0,q:"6x = 30",a:"5"},{t:0,q:"x ÷ 2 = 8",a:"16"},
     {t:1,q:"x + 17 = 42",a:"25"},{t:1,q:"8x = 96",a:"12",hint:"96 ÷ 8"},{t:1,q:"x − 23 = 19",a:"42"},{t:1,q:"x ÷ 5 = 13",a:"65"},{t:1,q:"4x = 100",a:"25"},
     {t:2,q:"2x + 5 = 19",a:"7",hint:"Take 5 from both sides, then halve"},{t:2,q:"3x − 7 = 26",a:"11"}
   ]},
  {id:"u8p5",label:"Fri",title:"Guess My Rule & the Math Trail",note:"Capstone day. Every stop on the trail is a problem you wrote yourself.",
   items:[
     {t:0,q:"Stops on a ten-stop trail",a:"10"},{t:0,q:"x + 9 = 9",a:"0"},
     {t:1,q:"Trail rule × 2 + 3. Stop number 6 gives",a:"15"},{t:1,q:"Ten stops, 3 minutes each — total minutes",a:"30"},
     {t:2,q:"In 5 gives 23, in 8 gives 35. In 10 gives",a:"43",hint:"The rule is × 4 + 3"},{t:2,q:"2x + 2x = 40",a:"10",hint:"That's 4x"},{t:2,q:"A rule turns 4 into 4 and 6 into 8. Put in 10",a:"16",hint:"× 2 − 4"}
   ]}
];

/* ============================================================================
 * FIFTH GRADE · YEAR TWO — eight missions, 34 weeks.
 * Sequenced the way the grade-5 standards build: place value and powers of ten
 * underwrite the multiplication algorithm, which underwrites long division,
 * which underwrites decimal operations. Fractions get ten weeks across two
 * missions because adding unlike denominators and multiplying fractions are
 * the two places fifth graders reliably come unstuck. Measurement and the
 * coordinate plane close the year, since both reward the algebra habits built
 * in the earlier missions.
 * ==========================================================================*/
const PRACTICE_U1_W2 = [
  {id:"u1w2p1",w:2,label:"2.1",title:"Where the Rooms Hide",note:"Every line of the algorithm is one of the four rooms. Find it before you trust it.",
   items:[
     {t:0,q:"20 × 10",a:"200"},{t:2,q:"3 × 10",a:"30"},{t:2,q:"20 × 4",a:"80"},{t:0,q:"3 × 4",a:"12"},{t:0,q:"Add 200, 30, 80 and 12",a:"322"},{t:0,q:"So 23 × 14 is",a:"322"},
     {t:2,q:"31 × 22 — the tens×tens room",a:"600",hint:"30 × 20"},{t:2,q:"31 × 22 — the ones×ones room",a:"2"},{t:2,q:"31 × 22 altogether",a:"682"},{t:2,q:"45 × 23",a:"1035"},{t:2,q:"18 × 26",a:"468"},
     {t:2,q:"In 47 × 35, which room is biggest — type its value",a:"1200",hint:"40 × 30"},{t:2,q:"47 × 35",a:"1645"}
   ]},
  {id:"u1w2p2",w:2,label:"2.2",title:"Fluency with Carrying",note:"Algorithm only. Use the area model to check, not to solve.",
   items:[
     {t:0,q:"14 × 12",a:"168"},{t:0,q:"21 × 13",a:"273"},{t:0,q:"32 × 11",a:"352"},{t:0,q:"15 × 15",a:"225"},{t:0,q:"24 × 12",a:"288"},{t:0,q:"13 × 13",a:"169"},
     {t:2,q:"38 × 24",a:"912"},{t:2,q:"56 × 27",a:"1512"},{t:2,q:"49 × 36",a:"1764"},{t:2,q:"63 × 48",a:"3024"},{t:2,q:"75 × 29",a:"2175"},
     {t:2,q:"87 × 64",a:"5568"},{t:2,q:"99 × 99",a:"9801",hint:"100 × 99 take one 99"}
   ]},
  {id:"u1w2p3",w:2,label:"2.3",title:"Three Digits by One",note:"A longer rectangle, split into three rooms instead of two.",
   items:[
     {t:2,q:"100 × 4",a:"400"},{t:2,q:"200 × 3",a:"600"},{t:2,q:"30 × 7",a:"210"},{t:2,q:"400 × 2",a:"800"},{t:2,q:"50 × 6",a:"300"},{t:0,q:"9 × 8",a:"72"},
     {t:2,q:"234 × 3",a:"702",hint:"600 + 90 + 12"},{t:2,q:"417 × 5",a:"2085"},{t:2,q:"326 × 4",a:"1304"},{t:2,q:"508 × 7",a:"3556"},{t:2,q:"739 × 6",a:"4434"},
     {t:2,q:"1,245 × 8",a:"9960"},{t:2,q:"A number × 6 is 2,742. The number",a:"457"}
   ]},
  {id:"u1w2p4",w:2,label:"2.4",title:"Estimate First",note:"Round, predict, compute, compare. A wrong answer should look wrong.",
   items:[
     {t:0,q:"Estimate 19 × 21 by rounding both",a:"400"},{t:0,q:"Estimate 29 × 31",a:"900"},{t:0,q:"Estimate 48 × 12",a:"500"},{t:0,q:"Estimate 39 × 41",a:"1600"},{t:0,q:"Estimate 22 × 18",a:"400"},{t:2,q:"Estimate 51 × 9",a:"500"},
     {t:2,q:"Estimate 187 × 4",a:"800"},{t:2,q:"True value of 187 × 4",a:"748"},{t:2,q:"Estimate 62 × 38",a:"2400"},{t:2,q:"True value of 62 × 38",a:"2356"},{t:2,q:"Estimate 296 × 5",a:"1500"},
     {t:2,q:"Someone says 43 × 27 = 301. Type the real answer",a:"1161",hint:"They only multiplied by the 7"},{t:2,q:"Estimate 412 × 19",a:"8000"}
   ]},
  {id:"u1w2p5",w:2,label:"Fri",title:"Lattice Detour",note:"Enrichment. A 500-year-old method — then decide whether it beats yours.",
   items:[
     {t:0,q:"6 × 7",a:"42"},{t:0,q:"Digits in the answer to 23 × 14",a:"3"},
     {t:1,q:"Lattice cells needed for 2 digits × 2 digits",a:"4"},{t:1,q:"Lattice cells for 3 digits × 2 digits",a:"6"},
     {t:2,q:"23 × 14 by lattice — the answer",a:"322"},{t:2,q:"456 × 23 — the answer",a:"10488"},{t:2,q:"Partial products in a 3-by-2 lattice",a:"6"}
   ]}
];

const PRACTICE_U1_W3 = [
  {id:"u1w3p1",w:3,label:"3.1",title:"Factor Pairs",note:"Every rectangle you can build is a factor pair.",
   items:[
     {t:0,q:"Factor pairs of 12 — how many",a:"3",hint:"1×12, 2×6, 3×4"},{t:0,q:"Smallest factor of any number",a:"1"},{t:0,q:"12 ÷ 3",a:"4"},{t:0,q:"Is 5 a factor of 20 — yes or no",a:"yes"},{t:0,q:"Is 7 a factor of 20",a:"no"},{t:0,q:"Largest factor of 20",a:"20"},
     {t:1,q:"Factor pairs of 24 — how many",a:"4"},{t:1,q:"Factor pairs of 36 — how many",a:"5"},{t:1,q:"All factors of 18 — how many",a:"6"},{t:1,q:"Factors of 30 — how many",a:"8"},{t:1,q:"The missing partner of 4 in 48",a:"12"},
     {t:2,q:"A number under 30 with exactly 8 factors",a:"24"},{t:2,q:"Highest factor of 48 below 48",a:"24"}
   ]},
  {id:"u1w3p2",w:3,label:"3.2",title:"Factor Rainbows",note:"Draw the arcs. Where they stop is the question worth asking.",
   items:[
     {t:0,q:"Factors of 16 — how many",a:"5"},{t:0,q:"Partner of 2 in 16",a:"8"},{t:0,q:"Partner of 1 in 16",a:"16"},{t:0,q:"Middle factor of 16",a:"4"},{t:0,q:"Factors of 9 — how many",a:"3"},{t:0,q:"Middle factor of 9",a:"3"},
     {t:1,q:"Highest number you must test for factors of 36",a:"6",hint:"Its square root"},{t:1,q:"Highest you must test for 100",a:"10"},{t:1,q:"Factors of 100 — how many",a:"9"},{t:1,q:"Arcs in the rainbow of 24",a:"4"},{t:1,q:"Factors of 49 — how many",a:"3"},
     {t:2,q:"A rainbow with an unpaired middle means the number is a",a:"square"},{t:2,q:"Factors of 144 — how many",a:"15"}
   ]},
  {id:"u1w3p3",w:3,label:"3.3",title:"Common Factors",note:"Two numbers, the factors they share, and the biggest of those.",
   items:[
     {t:0,q:"A factor shared by every pair of numbers",a:"1"},{t:0,q:"Common factors of 6 and 9 — the greatest",a:"3"},{t:0,q:"Greatest common factor of 4 and 8",a:"4"},{t:0,q:"GCF of 5 and 10",a:"5"},{t:0,q:"GCF of 3 and 7",a:"1"},{t:0,q:"GCF of 12 and 12",a:"12"},
     {t:1,q:"GCF of 12 and 18",a:"6"},{t:1,q:"GCF of 24 and 36",a:"12"},{t:1,q:"GCF of 15 and 25",a:"5"},{t:1,q:"GCF of 16 and 40",a:"8"},{t:1,q:"GCF of 27 and 45",a:"9"},
     {t:2,q:"GCF of 48 and 72",a:"24"},{t:2,q:"Two numbers whose only common factor is 1 are called",a:"coprime"}
   ]},
  {id:"u1w3p4",w:3,label:"3.4",title:"Square Numbers",note:"Why do squares have an odd number of factors? Build the rectangles and see.",
   items:[
     {t:0,q:"3 × 3",a:"9"},{t:0,q:"5 × 5",a:"25"},{t:0,q:"7 × 7",a:"49"},{t:0,q:"10 × 10",a:"100"},{t:0,q:"4 × 4",a:"16"},{t:0,q:"8 × 8",a:"64"},
     {t:2,q:"12 × 12",a:"144"},{t:1,q:"Factors of 25 — how many",a:"3"},{t:1,q:"Factors of 36 — how many",a:"9"},{t:1,q:"The square number between 60 and 70",a:"64"},{t:2,q:"15 × 15",a:"225"},
     {t:2,q:"Square numbers between 1 and 100 — how many",a:"10"},{t:2,q:"A square's factor count is always odd or even — type one",a:"odd"}
   ]},
  {id:"u1w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",
   items:[
     {t:0,q:"7 × 8",a:"56"},{t:2,q:"6 × 40",a:"240"},
     {t:2,q:"8 × 34",a:"272"},{t:2,q:"23 × 14",a:"322"},{t:1,q:"Factor pairs of 24 — how many",a:"4"},{t:1,q:"GCF of 12 and 18",a:"6"},{t:2,q:"Estimate 39 × 21",a:"800"},
     {t:2,q:"Area 84, one side 6 — the other",a:"14"}
   ]}
];

const PRACTICE_U1_W4 = [
  {id:"u1w4p1",w:4,label:"4.1",title:"Multiples",note:"Skip-count on the 100-grid and watch where the patterns cross.",
   items:[
     {t:0,q:"Third multiple of 4",a:"12"},{t:0,q:"Fifth multiple of 3",a:"15"},{t:0,q:"Fourth multiple of 6",a:"24"},{t:0,q:"Is 21 a multiple of 3 — yes or no",a:"yes"},{t:0,q:"Is 22 a multiple of 3",a:"no"},{t:2,q:"Tenth multiple of 5",a:"50"},
     {t:1,q:"First number that is a multiple of both 4 and 6",a:"12"},{t:1,q:"First multiple of both 3 and 5",a:"15"},{t:1,q:"First multiple of both 6 and 8",a:"24"},{t:1,q:"Multiples of 7 below 50 — how many",a:"7"},{t:1,q:"First multiple of both 4 and 10",a:"20"},
     {t:2,q:"Lowest common multiple of 9 and 12",a:"36"},{t:2,q:"Numbers below 100 that are multiples of both 3 and 4",a:"8"}
   ]},
  {id:"u1w4p2",w:4,label:"4.2",title:"Divisibility Rules",note:"Tests for 2, 3, 5, 9 and 10 — and why the 3-rule works at all.",
   items:[
     {t:0,q:"Is 48 divisible by 2 — yes or no",a:"yes"},{t:0,q:"Is 35 divisible by 5",a:"yes"},{t:0,q:"Is 47 divisible by 2",a:"no"},{t:0,q:"Is 90 divisible by 10",a:"yes"},{t:0,q:"Digit sum of 51",a:"6"},{t:0,q:"Is 51 divisible by 3",a:"yes"},
     {t:1,q:"Digit sum of 738",a:"18"},{t:1,q:"Is 738 divisible by 9 — yes or no",a:"yes"},{t:1,q:"Is 4,671 divisible by 3",a:"yes"},{t:1,q:"Is 1,234 divisible by 3",a:"no"},{t:1,q:"Smallest digit that makes 12_ divisible by 3",a:"0"},
     {t:2,q:"A number divisible by both 2 and 3 is divisible by",a:"6"},{t:2,q:"Is 9,999 divisible by 9 — yes or no",a:"yes"}
   ]},
  {id:"u1w4p3",w:4,label:"4.3",title:"Primes & Composites",note:"Colour the sieve. Every prime below 100 on one page.",
   items:[
     {t:0,q:"Is 7 prime — yes or no",a:"yes"},{t:0,q:"Is 9 prime",a:"no"},{t:0,q:"Is 2 prime",a:"yes"},{t:0,q:"Is 1 prime",a:"no"},{t:0,q:"Factors a prime has",a:"2"},{t:0,q:"The only even prime",a:"2"},
     {t:1,q:"Primes below 20 — how many",a:"8"},{t:1,q:"Primes below 50 — how many",a:"15"},{t:1,q:"The prime just after 23",a:"29"},{t:1,q:"Is 51 prime — yes or no",a:"no",hint:"3 × 17"},{t:1,q:"The largest prime below 100",a:"97"},
     {t:2,q:"Primes below 100 — how many",a:"25"},{t:2,q:"Is 91 prime — yes or no",a:"no",hint:"7 × 13"}
   ]},
  {id:"u1w4p4",w:4,label:"4.4",title:"Prime Factor Trees",note:"Break a number all the way down until only primes are left.",
   items:[
     {t:0,q:"12 as 2 × ?",a:"6"},{t:0,q:"6 as 2 × ?",a:"3"},{t:0,q:"Prime factors of 12 — how many, counting repeats",a:"3"},{t:0,q:"8 as 2 × 2 × ?",a:"2"},{t:0,q:"Prime factors of 10 — the larger one",a:"5"},{t:0,q:"Prime factors of 15 — the smaller",a:"3"},
     {t:1,q:"Prime factors of 36 counting repeats",a:"4",hint:"2×2×3×3"},{t:1,q:"Largest prime factor of 60",a:"5"},{t:1,q:"Largest prime factor of 84",a:"7"},{t:1,q:"Prime factors of 100 counting repeats",a:"4"},{t:1,q:"Largest prime factor of 45",a:"5"},
     {t:2,q:"Largest prime factor of 210",a:"7"},{t:2,q:"2 × 2 × 3 × 5 equals",a:"60"}
   ]},
  {id:"u1w4p5",w:4,label:"Fri",title:"Twin Primes",note:"Enrichment. Pairs two apart — and nobody knows whether they ever stop.",
   items:[
     {t:0,q:"The prime two above 3",a:"5"},{t:0,q:"The prime two above 5",a:"7"},
     {t:1,q:"The prime two above 11",a:"13"},{t:1,q:"The prime two above 17",a:"19"},
     {t:2,q:"Twin prime pairs below 50 — how many",a:"6"},{t:2,q:"The prime two above 29",a:"31"},{t:2,q:"The only prime three apart from another prime",a:"2",hint:"2 and 5"}
   ]}
];

const PRACTICE_U1_W5 = [
  {id:"u1w5p1",w:5,label:"5.1",title:"Missing-Digit Puzzles",note:"Reason backwards from the product. The last digit gives it away.",
   items:[
     {t:0,q:"4 × ? = 24",a:"6"},{t:0,q:"? × 7 = 56",a:"8"},{t:0,q:"9 × ? = 81",a:"9"},{t:0,q:"? × 6 = 42",a:"7"},{t:0,q:"12 × ? = 60",a:"5"},{t:0,q:"? × 11 = 88",a:"8"},
     {t:1,q:"3 × 4? = 129 — the missing digit",a:"3"},{t:1,q:"? × 14 = 322 — the number",a:"23"},{t:1,q:"6 × 4? = 276 — the missing digit",a:"6"},{t:1,q:"2? × 3 = 84 — the missing digit",a:"8"},{t:1,q:"? × 12 = 156",a:"13"},
     {t:2,q:"?? × ?? = 1,024 using two equal 2-digit numbers — type one",a:"32"},{t:2,q:"4? × 5 ends in 5. The missing digit can be 1, 3, 5, 7 or 9 — type the smallest",a:"1"}
   ]},
  {id:"u1w5p2",w:5,label:"5.2",title:"Launch Bay Blueprint",note:"Design the hangar, then find its area two different ways.",
   items:[
     {t:0,q:"Area of a 10 by 8 bay",a:"80"},{t:0,q:"Area of a 12 by 5 bay",a:"60"},{t:0,q:"Perimeter of a 10 by 8 bay",a:"36"},{t:0,q:"Area of a 6 by 6 bay",a:"36"},{t:0,q:"Area of a 20 by 3 bay",a:"60"},{t:0,q:"Perimeter of a 6 by 6 bay",a:"24"},
     {t:1,q:"A 14 by 12 hangar — area",a:"168"},{t:1,q:"That hangar split at 10: the 10 by 12 part",a:"120"},{t:1,q:"And the 4 by 12 part",a:"48"},{t:1,q:"Do the two parts add to the whole — type the total",a:"168"},{t:1,q:"A 23 by 14 hangar — area",a:"322"},
     {t:2,q:"A hangar of area 144 with equal sides — one side",a:"12"},{t:2,q:"Double both sides of a 14 by 12 hangar. Area multiplies by",a:"4"}
   ]},
  {id:"u1w5p3",w:5,label:"5.3",title:"Blueprint Defence",note:"Both methods must agree, and you have to say why they do.",
   items:[
     {t:0,q:"20 × 10",a:"200"},{t:2,q:"20 × 4",a:"80"},{t:2,q:"3 × 10",a:"30"},{t:0,q:"3 × 4",a:"12"},{t:0,q:"Sum of those four rooms",a:"322"},{t:0,q:"23 × 14 by algorithm",a:"322"},
     {t:1,q:"36 × 25 by area model — the total",a:"900"},{t:1,q:"36 × 25 by algorithm",a:"900"},{t:1,q:"The tens×tens room of 36 × 25",a:"600"},{t:1,q:"The ones×ones room of 36 × 25",a:"30"},{t:1,q:"47 × 18",a:"846"},
     {t:2,q:"Rooms in a 3-digit by 2-digit model",a:"6"},{t:2,q:"124 × 23",a:"2852"}
   ]},
  {id:"u1w5p4",w:5,label:"Thu",title:"Error Journal Sweep",note:"Mixed review of the whole mission. Fix only what repeats.",
   items:[
     {t:0,q:"8 × 7",a:"56"},{t:2,q:"6 × 40",a:"240"},{t:0,q:"Is 9 prime — yes or no",a:"no"},{t:0,q:"Factors of 16 — how many",a:"5"},{t:2,q:"5 × 18",a:"90"},{t:0,q:"Third multiple of 7",a:"21"},
     {t:2,q:"9 × 26",a:"234"},{t:1,q:"38 × 24",a:"912"},{t:1,q:"GCF of 24 and 36",a:"12"},{t:1,q:"Largest prime factor of 84",a:"7"},{t:2,q:"Estimate 296 × 5",a:"1500"},
     {t:2,q:"Primes below 100 — how many",a:"25"},{t:2,q:"87 × 64",a:"5568"}
   ]},
  {id:"u1w5p5",w:5,label:"Fri",title:"Mission 01 Test",note:"Twelve items plus the Big Question, answered out loud.",
   items:[
     {t:0,q:"7 × 9",a:"63"},{t:2,q:"8 × 30",a:"240"},
     {t:2,q:"6 × 47",a:"282"},{t:1,q:"23 × 14",a:"322"},{t:1,q:"45 × 23",a:"1035"},{t:2,q:"326 × 4",a:"1304"},{t:1,q:"Factor pairs of 36 — how many",a:"5"},{t:1,q:"GCF of 16 and 40",a:"8"},{t:1,q:"Is 51 prime — yes or no",a:"no"},{t:1,q:"Largest prime factor of 60",a:"5"},
     {t:2,q:"Area 84, one side 6 — the other",a:"14"},{t:2,q:"Estimate 62 × 38, then give the true value",a:"2356"}
   ]}
];

const PRACTICE_U2_W2 = [
  {id:"u2w2p1",w:2,label:"2.1",title:"Round It Up",note:"Vans, boats and buses. Two leftovers still force one more of everything.",
   items:[
     {t:0,q:"20 ÷ 5",a:"4"},{t:2,q:"21 ÷ 5 — the remainder",a:"1"},{t:0,q:"9 people, vans of 4 — vans needed",a:"3"},{t:0,q:"12 people, vans of 4",a:"3"},{t:0,q:"13 people, vans of 4",a:"4"},{t:0,q:"7 people, boats of 3",a:"3"},
     {t:1,q:"127 children, buses of 30 — buses needed",a:"5"},{t:1,q:"98 books, boxes of 12 — boxes needed",a:"9"},{t:1,q:"53 eggs, cartons of 6 — cartons needed",a:"9"},{t:1,q:"200 seats, rows of 18 — rows needed",a:"12"},{t:1,q:"75 guests, tables of 8 — tables needed",a:"10"},
     {t:2,q:"A bus holds 44. How many for 500 children",a:"12"},{t:2,q:"If 127 ÷ 30 needs 5 buses, how many seats sit empty",a:"23"}
   ]},
  {id:"u2w2p2",w:2,label:"2.2",title:"Drop It",note:"Whole ones each. The leftover just stays on the plate.",
   items:[
     {t:0,q:"26 ÷ 6 — whole cookies each",a:"4"},{t:0,q:"26 ÷ 6 — left on the plate",a:"2"},{t:0,q:"17 ÷ 5 — whole each",a:"3"},{t:0,q:"30 ÷ 7 — whole each",a:"4"},{t:0,q:"30 ÷ 7 — leftover",a:"2"},{t:0,q:"19 ÷ 4 — whole each",a:"4"},
     {t:1,q:"$50 shared by 8 — whole dollars each",a:"6"},{t:1,q:"$50 shared by 8 — dollars left",a:"2"},{t:1,q:"145 ÷ 12 — whole each",a:"12"},{t:1,q:"145 ÷ 12 — leftover",a:"1"},{t:1,q:"200 ÷ 30 — whole each",a:"6"},
     {t:2,q:"90 cm of ribbon into 14 cm bows — whole bows",a:"6"},{t:2,q:"That ribbon — cm wasted",a:"6"}
   ]},
  {id:"u2w2p3",w:2,label:"2.3",title:"Share It Out",note:"Cut the leftovers up and the remainder becomes a fraction.",
   items:[
     {t:2,q:"1 ÷ 2 as a decimal",a:"0.5"},{t:2,q:"1 ÷ 4 as a decimal",a:"0.25"},{t:0,q:"9 ÷ 2 — whole part",a:"4"},{t:2,q:"9 ÷ 2 as a decimal",a:"4.5"},{t:2,q:"7 ÷ 2 as a decimal",a:"3.5"},{t:2,q:"3 ÷ 4 as a decimal",a:"0.75"},
     {t:2,q:"26 ÷ 4 as a decimal",a:"6.5"},{t:1,q:"17 ÷ 4 — type the fraction part as a/b",a:"1/4"},{t:2,q:"13 ÷ 4 as a decimal",a:"3.25"},{t:1,q:"$45 shared by 4 — dollars each",a:"11.25"},{t:2,q:"22 ÷ 5 as a decimal",a:"4.4"},
     {t:2,q:"3 pizzas between 4 people — each gets, as a/b",a:"3/4"},{t:2,q:"$100 shared by 8 — dollars each",a:"12.5"}
   ]},
  {id:"u2w2p4",w:2,label:"2.4",title:"The Remainder Is the Answer",note:"Clocks and repeating patterns. Sometimes the leftover is the whole point.",
   items:[
     {t:2,q:"10 ÷ 3 — the remainder",a:"1"},{t:2,q:"14 ÷ 7 — the remainder",a:"0"},{t:2,q:"25 ÷ 4 — the remainder",a:"1"},{t:0,q:"Days in a week",a:"7"},{t:2,q:"9 ÷ 7 — the remainder",a:"2"},{t:2,q:"20 ÷ 6 — the remainder",a:"2"},
     {t:1,q:"Pattern red, blue, green repeating. The 10th bead — type 1, 2 or 3 for its place in the group",a:"1"},{t:2,q:"100 ÷ 7 — the remainder",a:"2"},{t:1,q:"It is 9 o'clock. 25 hours later, the hour shown",a:"10"},{t:2,q:"50 ÷ 12 — the remainder",a:"2"},{t:2,q:"365 ÷ 7 — the remainder",a:"1"},
     {t:2,q:"A 4-colour pattern. The 63rd item — its place in the group of 4",a:"3"},{t:2,q:"1,000 ÷ 7 — the remainder",a:"6"}
   ]},
  {id:"u2w2p5",w:2,label:"Fri",title:"Snack Run Planning",note:"Real quantities, real people. Every leftover decision written down.",
   items:[
     {t:0,q:"24 crackers between 4 — each",a:"6"},{t:0,q:"20 grapes between 3 — whole each",a:"6"},
     {t:1,q:"A pack of 18 between 5 — whole each",a:"3"},{t:1,q:"That pack — leftover",a:"3"},
     {t:2,q:"$12 of snacks split 5 ways — dollars each",a:"2.4"},{t:2,q:"You need 7 each for 6 people. Packs of 10 needed",a:"5"},{t:2,q:"Those packs — snacks left over",a:"8"}
   ]}
];

const PRACTICE_U2_W3 = [
  {id:"u2w3p1",w:3,label:"3.1",title:"Under the Bar",note:"Partial quotients folded into the standard layout, line by line.",
   items:[
     {t:0,q:"60 ÷ 3",a:"20"},{t:0,q:"80 ÷ 4",a:"20"},{t:0,q:"90 ÷ 3",a:"30"},{t:0,q:"48 ÷ 4",a:"12"},{t:0,q:"66 ÷ 6",a:"11"},{t:0,q:"84 ÷ 4",a:"21"},
     {t:1,q:"96 ÷ 4",a:"24"},{t:1,q:"126 ÷ 3",a:"42"},{t:1,q:"175 ÷ 5",a:"35"},{t:1,q:"192 ÷ 6",a:"32"},{t:1,q:"133 ÷ 7",a:"19"},
     {t:2,q:"288 ÷ 8",a:"36"},{t:2,q:"441 ÷ 9",a:"49"}
   ]},
  {id:"u2w3p2",w:3,label:"3.2",title:"Three-Digit Dividends",note:"Estimate before you start. Every time, out loud.",
   items:[
     {t:0,q:"300 ÷ 3",a:"100"},{t:0,q:"400 ÷ 4",a:"100"},{t:0,q:"360 ÷ 6",a:"60"},{t:0,q:"250 ÷ 5",a:"50"},{t:0,q:"280 ÷ 7",a:"40"},{t:0,q:"540 ÷ 9",a:"60"},
     {t:1,q:"372 ÷ 3",a:"124"},{t:1,q:"456 ÷ 4",a:"114"},{t:1,q:"595 ÷ 5",a:"119"},{t:1,q:"728 ÷ 8",a:"91"},{t:1,q:"651 ÷ 7",a:"93"},
     {t:2,q:"936 ÷ 8",a:"117"},{t:2,q:"864 ÷ 6",a:"144"}
   ]},
  {id:"u2w3p3",w:3,label:"3.3",title:"Zeros in the Quotient",note:"The place nobody remembers to hold. It catches everybody once.",
   items:[
     {t:0,q:"60 ÷ 6",a:"10"},{t:0,q:"90 ÷ 9",a:"10"},{t:0,q:"200 ÷ 2",a:"100"},{t:0,q:"606 ÷ 6",a:"101"},{t:0,q:"404 ÷ 4",a:"101"},{t:0,q:"800 ÷ 8",a:"100"},
     {t:1,q:"618 ÷ 6",a:"103"},{t:1,q:"721 ÷ 7",a:"103"},{t:1,q:"915 ÷ 3",a:"305"},{t:1,q:"832 ÷ 8",a:"104"},{t:1,q:"525 ÷ 5",a:"105"},
     {t:2,q:"4,080 ÷ 8",a:"510"},{t:2,q:"6,036 ÷ 6",a:"1006"}
   ]},
  {id:"u2w3p4",w:3,label:"3.4",title:"Check by Multiplying",note:"Quotient × divisor + remainder = dividend. Self-marking from here on.",
   items:[
     {t:0,q:"7 × 8",a:"56"},{t:0,q:"56 ÷ 8",a:"7"},{t:0,q:"9 × 6 + 2",a:"56"},{t:2,q:"12 × 4",a:"48"},{t:0,q:"48 ÷ 4",a:"12"},{t:2,q:"11 × 5 + 3",a:"58"},
     {t:2,q:"124 × 3 — the check for 372 ÷ 3",a:"372"},{t:2,q:"17 × 6 + 4",a:"106"},{t:1,q:"106 ÷ 6 — the quotient",a:"17"},{t:2,q:"106 ÷ 6 — the remainder",a:"4"},{t:2,q:"91 × 8",a:"728"},
     {t:2,q:"A quotient of 23 remainder 5 with divisor 9 — the dividend",a:"212"},{t:2,q:"A quotient of 47 remainder 3 with divisor 12 — the dividend",a:"567"}
   ]},
  {id:"u2w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",
   items:[
     {t:0,q:"42 ÷ 6",a:"7"},{t:0,q:"90 ÷ 3",a:"30"},
     {t:1,q:"372 ÷ 3",a:"124"},{t:1,q:"618 ÷ 6",a:"103"},{t:1,q:"127 children, buses of 30 — buses needed",a:"5"},{t:2,q:"26 ÷ 4 as a decimal",a:"6.5"},{t:2,q:"100 ÷ 7 — the remainder",a:"2"},
     {t:2,q:"A quotient of 23 remainder 5 with divisor 9 — the dividend",a:"212"}
   ]}
];

const PRACTICE_U2_W4 = [
  {id:"u2w4p1",w:4,label:"4.1",title:"Tests for 2, 5 and 10",note:"The last digit is enough on its own. Say why.",
   items:[
     {t:0,q:"Is 46 divisible by 2 — yes or no",a:"yes"},{t:0,q:"Is 45 divisible by 5",a:"yes"},{t:0,q:"Is 45 divisible by 2",a:"no"},{t:0,q:"Is 70 divisible by 10",a:"yes"},{t:0,q:"Is 75 divisible by 10",a:"no"},{t:0,q:"Is 128 divisible by 2",a:"yes"},
     {t:1,q:"Is 3,450 divisible by 10 — yes or no",a:"yes"},{t:1,q:"Is 1,275 divisible by 5",a:"yes"},{t:1,q:"Is 2,346 divisible by 2",a:"yes"},{t:1,q:"Numbers below 50 divisible by both 2 and 5",a:"4"},{t:1,q:"Is 999 divisible by 5",a:"no"},
     {t:2,q:"A number divisible by 2 and 5 is divisible by",a:"10"},{t:2,q:"Multiples of 10 below 200 — how many",a:"19"}
   ]},
  {id:"u2w4p2",w:4,label:"4.2",title:"Tests for 3 and 9",note:"Add the digits — then find out why that ridiculous trick works.",
   items:[
     {t:0,q:"Digit sum of 24",a:"6"},{t:0,q:"Is 24 divisible by 3 — yes or no",a:"yes"},{t:0,q:"Digit sum of 45",a:"9"},{t:0,q:"Is 45 divisible by 9",a:"yes"},{t:0,q:"Digit sum of 17",a:"8"},{t:0,q:"Is 17 divisible by 3",a:"no"},
     {t:1,q:"Digit sum of 738",a:"18"},{t:1,q:"Is 738 divisible by 9 — yes or no",a:"yes"},{t:1,q:"Is 1,234 divisible by 3",a:"no"},{t:1,q:"Is 5,346 divisible by 9",a:"yes"},{t:1,q:"Digit sum of 9,999",a:"36"},
     {t:2,q:"Smallest digit d making 45d divisible by 9",a:"0"},{t:2,q:"A number divisible by 9 is always divisible by",a:"3"}
   ]},
  {id:"u2w4p3",w:4,label:"4.3",title:"Four-Digit Dividends",note:"Same method, longer bar. Do not flinch.",
   items:[
     {t:0,q:"1,000 ÷ 2",a:"500"},{t:0,q:"2,000 ÷ 4",a:"500"},{t:0,q:"3,000 ÷ 3",a:"1000"},{t:0,q:"4,800 ÷ 8",a:"600"},{t:0,q:"5,600 ÷ 7",a:"800"},{t:0,q:"1,200 ÷ 6",a:"200"},
     {t:1,q:"3,472 ÷ 8",a:"434"},{t:1,q:"4,536 ÷ 6",a:"756"},{t:1,q:"5,432 ÷ 4",a:"1358"},{t:1,q:"6,741 ÷ 3",a:"2247"},{t:1,q:"8,127 ÷ 9",a:"903"},
     {t:2,q:"9,072 ÷ 8",a:"1134"},{t:2,q:"7,595 ÷ 5",a:"1519"}
   ]},
  {id:"u2w4p4",w:4,label:"4.4",title:"Two-Digit Divisors",note:"Grade-five ceiling. Estimate, adjust, estimate again.",
   items:[
     {t:0,q:"40 ÷ 20",a:"2"},{t:0,q:"60 ÷ 30",a:"2"},{t:0,q:"90 ÷ 30",a:"3"},{t:0,q:"80 ÷ 20",a:"4"},{t:0,q:"120 ÷ 40",a:"3"},{t:0,q:"150 ÷ 50",a:"3"},
     {t:1,q:"84 ÷ 12",a:"7"},{t:1,q:"96 ÷ 16",a:"6"},{t:1,q:"224 ÷ 14",a:"16"},{t:1,q:"375 ÷ 25",a:"15"},{t:1,q:"391 ÷ 17",a:"23"},
     {t:2,q:"552 ÷ 24",a:"23"},{t:2,q:"945 ÷ 35",a:"27"}
   ]},
  {id:"u2w4p5",w:4,label:"Fri",title:"Perfect Numbers",note:"6 = 1 + 2 + 3. Its factors add up to itself. Hunt the next one.",
   items:[
     {t:0,q:"Factors of 6 below 6 — their sum",a:"6"},{t:0,q:"Factors of 8 below 8 — their sum",a:"7"},
     {t:1,q:"Factors of 28 below 28 — their sum",a:"28"},{t:1,q:"Factors of 12 below 12 — their sum",a:"16"},
     {t:2,q:"The second perfect number",a:"28"},{t:2,q:"The third perfect number",a:"496"},{t:2,q:"Factors of 496 below 496 — their sum",a:"496"}
   ]}
];

const PRACTICE_U2_W5 = [
  {id:"u2w5p1",w:5,label:"5.1",title:"Missing-Digit Division",note:"Reason backwards from the quotient to the digits under the bar.",
   items:[
     {t:0,q:"? ÷ 4 = 6",a:"24"},{t:0,q:"? ÷ 7 = 8",a:"56"},{t:0,q:"36 ÷ ? = 9",a:"4"},{t:0,q:"81 ÷ ? = 9",a:"9"},{t:0,q:"? ÷ 5 = 12",a:"60"},{t:0,q:"48 ÷ ? = 6",a:"8"},
     {t:1,q:"? ÷ 6 = 103",a:"618"},{t:1,q:"372 ÷ ? = 124",a:"3"},{t:1,q:"? ÷ 8 = 91",a:"728"},{t:1,q:"? ÷ 12 = 15",a:"180"},{t:1,q:"595 ÷ ? = 119",a:"5"},
     {t:2,q:"A 3-digit number ÷ 7 = 43 exactly — the number",a:"301"},{t:2,q:"? ÷ 9 = 47 remainder 3",a:"426"}
   ]},
  {id:"u2w5p2",w:5,label:"5.2",title:"Snack Run",note:"Real quantities, real people, every leftover call written down.",
   items:[
     {t:0,q:"30 crackers between 5 — each",a:"6"},{t:0,q:"24 grapes between 4 — each",a:"6"},{t:0,q:"18 between 6 — each",a:"3"},{t:0,q:"25 between 5 — each",a:"5"},{t:0,q:"40 between 8 — each",a:"5"},{t:0,q:"21 between 7 — each",a:"3"},
     {t:1,q:"A 44-pack between 6 — whole each",a:"7"},{t:1,q:"That pack — leftover",a:"2"},{t:1,q:"$18 split 4 ways — dollars each",a:"4.5"},{t:1,q:"You need 5 each for 9 people. Packs of 12 needed",a:"4"},{t:1,q:"Those packs — snacks left over",a:"3"},
     {t:2,q:"$25 buys packs at $4 — whole packs",a:"6"},{t:2,q:"That purchase — dollars change",a:"1"}
   ]},
  {id:"u2w5p3",w:5,label:"5.3",title:"Remainder Defence",note:"One division, four right answers. Say which one the question wanted.",
   items:[
     {t:0,q:"27 ÷ 4 — the whole part",a:"6"},{t:2,q:"27 ÷ 4 — the remainder",a:"3"},{t:2,q:"27 ÷ 4 as a decimal",a:"6.75"},{t:0,q:"27 children in cars of 4 — cars needed",a:"7"},{t:0,q:"27 cookies between 4 — whole each",a:"6"},{t:0,q:"27 ÷ 4 rounded down",a:"6"},
     {t:1,q:"53 ÷ 8 — the whole part",a:"6"},{t:1,q:"53 people in vans of 8 — vans needed",a:"7"},{t:2,q:"53 ÷ 8 as a decimal",a:"6.625"},{t:2,q:"53 ÷ 8 — the remainder",a:"5"},{t:1,q:"$53 shared by 8 — whole dollars each",a:"6"},
     {t:2,q:"A 100-cm ribbon into 15-cm pieces — whole pieces",a:"6"},{t:2,q:"That ribbon — cm left",a:"10"}
   ]},
  {id:"u2w5p4",w:5,label:"Thu",title:"Error Journal Sweep",note:"Mixed review of the whole mission. Fix only what repeats.",
   items:[
     {t:0,q:"63 ÷ 9",a:"7"},{t:0,q:"120 ÷ 4",a:"30"},{t:0,q:"Is 45 divisible by 9 — yes or no",a:"yes"},{t:2,q:"26 ÷ 6 — the remainder",a:"2"},{t:0,q:"81 ÷ 9",a:"9"},{t:0,q:"200 ÷ 5",a:"40"},
     {t:1,q:"456 ÷ 4",a:"114"},{t:1,q:"618 ÷ 6",a:"103"},{t:1,q:"3,472 ÷ 8",a:"434"},{t:1,q:"84 ÷ 12",a:"7"},{t:2,q:"100 ÷ 7 — the remainder",a:"2"},
     {t:2,q:"552 ÷ 24",a:"23"},{t:2,q:"? ÷ 9 = 47 remainder 3",a:"426"}
   ]},
  {id:"u2w5p5",w:5,label:"Fri",title:"Mission 02 Test",note:"Twelve items plus the Big Question, answered out loud.",
   items:[
     {t:0,q:"48 ÷ 6",a:"8"},{t:0,q:"150 ÷ 5",a:"30"},
     {t:1,q:"372 ÷ 3",a:"124"},{t:1,q:"728 ÷ 8",a:"91"},{t:1,q:"915 ÷ 3",a:"305"},{t:1,q:"3,472 ÷ 8",a:"434"},{t:1,q:"96 ÷ 16",a:"6"},{t:1,q:"Is 5,346 divisible by 9 — yes or no",a:"yes"},{t:1,q:"127 children, buses of 30 — buses needed",a:"5"},{t:2,q:"26 ÷ 4 as a decimal",a:"6.5"},
     {t:2,q:"945 ÷ 35",a:"27"},{t:2,q:"A quotient of 23 remainder 5 with divisor 9 — the dividend",a:"212"}
   ]}
];

const PRACTICE_U3_W2 = [
  {id:"u3w2p1",w:2,label:"2.1",title:"Rounding to Any Place",note:"Find the place, look one to its right, decide.",
   items:[
     {t:0,q:"Round 48 to the nearest ten",a:"50"},{t:0,q:"Round 43 to the nearest ten",a:"40"},{t:0,q:"Round 250 to the nearest hundred",a:"300"},{t:0,q:"Round 149 to the nearest hundred",a:"100"},{t:0,q:"Round 75 to the nearest ten",a:"80"},{t:0,q:"Round 612 to the nearest ten",a:"610"},
     {t:1,q:"Round 4,829 to the nearest hundred",a:"4800"},{t:1,q:"Round 4,829 to the nearest thousand",a:"5000"},{t:2,q:"Round 27,500 to the nearest thousand",a:"28000"},{t:2,q:"Round 96,412 to the nearest ten thousand",a:"100000"},{t:1,q:"Round 8,950 to the nearest hundred",a:"9000"},
     {t:2,q:"A number rounds to 300 to the nearest hundred. Its smallest possible value",a:"250"},{t:2,q:"And its largest possible whole value",a:"349"}
   ]},
  {id:"u3w2p2",w:2,label:"2.2",title:"Estimate Before You Compute",note:"Round first. Then the real answer has something to be checked against.",
   items:[
     {t:0,q:"Estimate 48 + 31 by rounding both to tens",a:"80"},{t:0,q:"Estimate 62 − 19",a:"40"},{t:0,q:"Estimate 19 × 21",a:"400"},{t:0,q:"Estimate 81 ÷ 9",a:"9"},{t:0,q:"Estimate 297 + 104",a:"400"},{t:0,q:"Estimate 52 + 48",a:"100"},
     {t:1,q:"Estimate 4,812 + 3,190 to the nearest thousand",a:"8000"},{t:1,q:"Estimate 612 − 388 to the nearest hundred",a:"200"},{t:2,q:"Estimate 187 × 4",a:"800"},{t:2,q:"True value of 187 × 4",a:"748"},{t:1,q:"Estimate 3,964 ÷ 4",a:"1000"},
     {t:2,q:"Estimate the cost of 19 items at $4.95 each",a:"100"},{t:2,q:"Someone estimates 512 × 6 as 300. Type the real answer",a:"3072"}
   ]},
  {id:"u3w2p3",w:2,label:"2.3",title:"How Wrong Is the Estimate",note:"An estimate you never compare to anything teaches you nothing.",
   items:[
     {t:0,q:"Estimate of 48 + 31",a:"80"},{t:0,q:"True value of 48 + 31",a:"79"},{t:0,q:"The difference",a:"1"},{t:0,q:"True value of 19 × 21",a:"399"},{t:0,q:"Estimate of 19 × 21",a:"400"},{t:0,q:"The difference",a:"1"},
     {t:1,q:"True value of 612 − 388",a:"224"},{t:1,q:"Estimate of 612 − 388 to the nearest hundred",a:"200"},{t:1,q:"How far off was that estimate",a:"24"},{t:1,q:"True value of 4,812 + 3,190",a:"8002"},{t:1,q:"How far off was the thousand estimate",a:"2"},
     {t:2,q:"Rounding both numbers up always makes the estimate too high or too low — type high or low",a:"high"},{t:2,q:"Estimate 39 × 41, then give the true value",a:"1599"}
   ]},
  {id:"u3w2p4",w:2,label:"2.4",title:"Big Numbers in Context",note:"Millions stop being abstract when you attach them to something real.",
   items:[
     {t:0,q:"Zeros in one thousand",a:"3"},{t:0,q:"Zeros in one million",a:"6"},{t:0,q:"Thousands in a million",a:"1000"},{t:0,q:"Hundreds in a thousand",a:"10"},{t:0,q:"Tens in a thousand",a:"100"},{t:0,q:"Zeros in ten thousand",a:"4"},
     {t:1,q:"Days in about a million minutes, rounded to the nearest hundred",a:"700",hint:"A million minutes is about 694 days"},{t:1,q:"Dots per page 1,000 — pages for a million dots",a:"1000"},{t:1,q:"Seconds in an hour",a:"3600"},{t:1,q:"Hours in a week",a:"168"},{t:1,q:"Minutes in a day",a:"1440"},
     {t:2,q:"About how many years is a million days, to the nearest thousand",a:"3000"},{t:2,q:"A stack of 100 sheets is 1 cm. Height in metres of a million sheets",a:"100"}
   ]},
  {id:"u3w2p5",w:2,label:"Fri",title:"A Million Dots, Measured",note:"Prove the estimate. Count one square, scale it up, defend the number.",
   items:[
     {t:0,q:"Dots in a 10 by 10 square",a:"100"},{t:0,q:"Dots in ten such squares",a:"1000"},
     {t:1,q:"Squares of 100 dots needed for a million",a:"10000"},{t:1,q:"A 100 by 100 grid holds how many dots",a:"10000"},
     {t:2,q:"How many 100 by 100 grids make a million",a:"100"},{t:2,q:"If one grid is 20 cm wide, the width in metres of 100 side by side",a:"20"},{t:2,q:"Dots in a 1,000 by 1,000 grid",a:"1000000"}
   ]}
];

const PRACTICE_U3_W3 = [
  {id:"u3w3p1",w:3,label:"3.1",title:"Why Order Matters",note:"Without an agreed order, one expression has several answers.",
   items:[
     {t:0,q:"2 + 3 × 4",a:"14"},{t:0,q:"(2 + 3) × 4",a:"20"},{t:0,q:"10 − 2 × 3",a:"4"},{t:0,q:"(10 − 2) × 3",a:"24"},{t:0,q:"6 + 6 ÷ 2",a:"9"},{t:0,q:"(6 + 6) ÷ 2",a:"6"},
     {t:1,q:"5 + 4 × 3 − 2",a:"15"},{t:1,q:"(5 + 4) × (3 − 2)",a:"9"},{t:1,q:"20 − 3 × 4 + 2",a:"10"},{t:1,q:"36 ÷ (2 + 4)",a:"6"},{t:1,q:"36 ÷ 2 + 4",a:"22"},
     {t:2,q:"2 × (3 + 4) × 5",a:"70"},{t:2,q:"Place brackets in 8 + 2 × 5 to make 50 — type the answer you get",a:"50"}
   ]},
  {id:"u3w3p2",w:3,label:"3.2",title:"Brackets First",note:"Whatever is inside the brackets happens before anything else.",
   items:[
     {t:0,q:"(4 + 5) × 2",a:"18"},{t:0,q:"(9 − 3) ÷ 2",a:"3"},{t:0,q:"3 × (2 + 2)",a:"12"},{t:0,q:"(7 + 3) × 10",a:"100"},{t:0,q:"(12 − 4) ÷ 4",a:"2"},{t:0,q:"5 × (10 − 6)",a:"20"},
     {t:1,q:"(15 + 5) ÷ (2 + 2)",a:"5"},{t:1,q:"4 × (6 + 3) − 10",a:"26"},{t:2,q:"100 − (25 × 3)",a:"25"},{t:1,q:"(8 × 3) − (4 × 2)",a:"16"},{t:1,q:"2 × (50 − 15)",a:"70"},
     {t:2,q:"((4 + 2) × 3) − 8",a:"10"},{t:2,q:"120 ÷ (2 × (3 + 3))",a:"10"}
   ]},
  {id:"u3w3p3",w:3,label:"3.3",title:"Multi-Step Expressions",note:"Multiply and divide before you add and subtract. Left to right within each.",
   items:[
     {t:0,q:"12 ÷ 3 + 2",a:"6"},{t:0,q:"12 + 3 × 2",a:"18"},{t:0,q:"20 ÷ 4 × 2",a:"10"},{t:0,q:"18 − 6 ÷ 3",a:"16"},{t:0,q:"7 × 2 + 6",a:"20"},{t:0,q:"30 ÷ 5 − 2",a:"4"},
     {t:1,q:"48 ÷ 6 + 3 × 4",a:"20"},{t:2,q:"100 − 4 × 12",a:"52"},{t:1,q:"7 × 8 − 6 × 5",a:"26"},{t:1,q:"64 ÷ 8 ÷ 2",a:"4"},{t:1,q:"9 + 36 ÷ 4 − 3",a:"15"},
     {t:2,q:"144 ÷ 12 + 8 × 3 − 5",a:"31"},{t:2,q:"2 × 3 + 4 × 5 + 6 × 7",a:"68"}
   ]},
  {id:"u3w3p4",w:3,label:"3.4",title:"Write the Expression",note:"Turn the sentence into symbols, then work it out.",
   items:[
     {t:0,q:"Five more than three lots of four",a:"17"},{t:0,q:"Double seven, then add one",a:"15"},{t:0,q:"Ten less than six times three",a:"8"},{t:0,q:"Half of twenty, plus four",a:"14"},{t:0,q:"Three lots of nine",a:"27"},{t:0,q:"Twenty shared by four",a:"5"},
     {t:1,q:"The sum of 8 and 4, multiplied by 3",a:"36"},{t:1,q:"8 added to 4 lots of 3",a:"20"},{t:1,q:"100 less the product of 7 and 9",a:"37"},{t:1,q:"The difference of 20 and 8, divided by 4",a:"3"},{t:1,q:"Six lots of the sum of 2 and 3",a:"30"},
     {t:2,q:"Three times the difference between 15 and 7",a:"24"},{t:2,q:"The sum of 12 and 8, divided by the difference of 9 and 4",a:"4"}
   ]},
  {id:"u3w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",
   items:[
     {t:0,q:"Round 4,829 to the nearest hundred",a:"4800"},{t:0,q:"2 + 3 × 4",a:"14"},
     {t:1,q:"(5 + 4) × (3 − 2)",a:"9"},{t:1,q:"48 ÷ 6 + 3 × 4",a:"20"},{t:2,q:"Estimate 187 × 4",a:"800"},{t:1,q:"Zeros in one million",a:"6"},{t:1,q:"The sum of 8 and 4, multiplied by 3",a:"36"},
     {t:2,q:"144 ÷ 12 + 8 × 3 − 5",a:"31"}
   ]}
];

const PRACTICE_U3_W4 = [
  {id:"u3w4p1",w:4,label:"4.1",title:"The Little Raised Number",note:"An exponent counts how many times the base is multiplied by itself.",
   items:[
     {t:0,q:"2²",a:"4"},{t:0,q:"3²",a:"9"},{t:0,q:"5²",a:"25"},{t:0,q:"2³",a:"8"},{t:2,q:"10²",a:"100"},{t:0,q:"4²",a:"16"},
     {t:1,q:"3³",a:"27"},{t:1,q:"2⁴",a:"16"},{t:1,q:"5³",a:"125"},{t:2,q:"10³",a:"1000"},{t:1,q:"2⁵",a:"32"},
     {t:2,q:"2⁸",a:"256"},{t:2,q:"Which is bigger, 3⁴ or 4³ — type the value of the bigger",a:"81"}
   ]},
  {id:"u3w4p2",w:4,label:"4.2",title:"Powers of Ten",note:"The exponent is the number of zeros. That is the whole shortcut.",
   items:[
     {t:0,q:"10¹",a:"10"},{t:2,q:"10²",a:"100"},{t:2,q:"10³",a:"1000"},{t:2,q:"10⁴",a:"10000"},{t:2,q:"Zeros in 10⁵",a:"5"},{t:2,q:"10⁶",a:"1000000"},
     {t:2,q:"3 × 10²",a:"300"},{t:2,q:"7 × 10³",a:"7000"},{t:2,q:"4 × 10⁴",a:"40000"},{t:1,q:"Write 5,000 as a digit times a power of ten — type the exponent",a:"3"},{t:2,q:"25 × 10²",a:"2500"},
     {t:2,q:"10³ × 10²",a:"100000"},{t:2,q:"A million written as a power of ten — type the exponent",a:"6"}
   ]},
  {id:"u3w4p3",w:4,label:"4.3",title:"Expanded Form with Powers",note:"Every place value is a power of ten in disguise.",
   items:[
     {t:0,q:"The value of the 4 in 400",a:"400"},{t:0,q:"The value of the 7 in 70",a:"70"},{t:0,q:"The value of the 3 in 3,000",a:"3000"},{t:0,q:"200 + 30 + 5",a:"235"},{t:0,q:"4,000 + 200 + 10",a:"4210"},{t:0,q:"The value of the 9 in 900",a:"900"},
     {t:2,q:"6 × 10³ + 4 × 10² + 2",a:"6402"},{t:2,q:"3 × 10⁴ + 5 × 10²",a:"30500"},{t:2,q:"The value of the 8 in 84,000",a:"80000"},{t:2,q:"9 × 10² + 9 × 10¹ + 9",a:"999"},{t:2,q:"7 × 10⁵",a:"700000"},
     {t:2,q:"2 × 10⁵ + 6 × 10³ + 4 × 10¹",a:"206040"},{t:2,q:"The largest power of ten inside 47,300 — type its exponent",a:"4"}
   ]},
  {id:"u3w4p4",w:4,label:"Thu",title:"Error Journal Sweep",note:"Mixed review of the whole mission. Fix only what repeats.",
   items:[
     {t:0,q:"Round 149 to the nearest hundred",a:"100"},{t:0,q:"2 + 3 × 4",a:"14"},{t:2,q:"10³",a:"1000"},{t:0,q:"Zeros in one million",a:"6"},{t:0,q:"5²",a:"25"},{t:0,q:"(2 + 3) × 4",a:"20"},
     {t:2,q:"Round 96,412 to the nearest ten thousand",a:"100000"},{t:1,q:"48 ÷ 6 + 3 × 4",a:"20"},{t:2,q:"4 × 10⁴",a:"40000"},{t:1,q:"Estimate 3,964 ÷ 4",a:"1000"},{t:2,q:"6 × 10³ + 4 × 10² + 2",a:"6402"},
     {t:2,q:"144 ÷ 12 + 8 × 3 − 5",a:"31"},{t:2,q:"2⁸",a:"256"}
   ]},
  {id:"u3w4p5",w:4,label:"Fri",title:"Mission 03 Test",note:"Twelve items plus the Big Question, answered out loud.",
   items:[
     {t:0,q:"Round 612 to the nearest ten",a:"610"},{t:0,q:"3²",a:"9"},
     {t:1,q:"Round 4,829 to the nearest thousand",a:"5000"},{t:1,q:"10 − 2 × 3",a:"4"},{t:1,q:"(15 + 5) ÷ (2 + 2)",a:"5"},{t:2,q:"100 − 4 × 12",a:"52"},{t:2,q:"7 × 10³",a:"7000"},{t:1,q:"2⁵",a:"32"},{t:1,q:"Estimate 4,812 + 3,190 to the nearest thousand",a:"8000"},{t:1,q:"The sum of 12 and 8, divided by the difference of 9 and 4",a:"4"},
     {t:2,q:"2 × 10⁵ + 6 × 10³ + 4 × 10¹",a:"206040"},{t:2,q:"2 × 3 + 4 × 5 + 6 × 7",a:"68"}
   ]}
];

const PRACTICE_U4_W2 = [
  {id:"u4w2p1",w:2,label:"2.1",title:"Same Number, New Clothes",note:"Multiply top and bottom by the same thing and the value never moves. Type fractions like 3/4.",
   items:[
     {t:0,q:"1/2 = ?/4 — the numerator",a:"2"},{t:0,q:"1/2 = ?/6",a:"3"},{t:0,q:"1/3 = ?/6",a:"2"},{t:0,q:"1/4 = ?/8",a:"2"},{t:0,q:"2/3 = ?/6",a:"4"},{t:0,q:"3/4 = ?/8",a:"6"},
     {t:1,q:"2/5 = ?/15",a:"6"},{t:1,q:"3/8 = ?/24",a:"9"},{t:1,q:"5/6 = ?/18",a:"15"},{t:1,q:"4/7 = ?/21",a:"12"},{t:1,q:"7/10 = ?/100",a:"70"},
     {t:2,q:"9/12 in simplest form — type as a/b",a:"3/4"},{t:2,q:"What was 1/2 multiplied by to become 7/14 — type the number",a:"7"}
   ]},
  {id:"u4w2p2",w:2,label:"2.2",title:"Simplest Form",note:"Divide top and bottom by the same thing until nothing else fits.",
   items:[
     {t:0,q:"2/4 in simplest form — type as a/b",a:"1/2"},{t:0,q:"3/6",a:"1/2"},{t:0,q:"4/8",a:"1/2"},{t:0,q:"2/6",a:"1/3"},{t:0,q:"5/10",a:"1/2"},{t:0,q:"3/9",a:"1/3"},
     {t:1,q:"6/8",a:"3/4"},{t:1,q:"10/15",a:"2/3"},{t:1,q:"12/16",a:"3/4"},{t:1,q:"18/24",a:"3/4"},{t:1,q:"20/25",a:"4/5"},
     {t:2,q:"36/48",a:"3/4"},{t:2,q:"The number you divide by to simplify 24/36 in one step",a:"12"}
   ]},
  {id:"u4w2p3",w:2,label:"2.3",title:"Spot the Equivalent",note:"Cross-multiply, or find a common denominator. Either proof counts.",
   items:[
     {t:0,q:"Is 1/2 the same as 2/4 — yes or no",a:"yes"},{t:0,q:"Is 1/3 the same as 2/6",a:"yes"},{t:0,q:"Is 1/2 the same as 1/3",a:"no"},{t:0,q:"Is 3/4 the same as 6/8",a:"yes"},{t:0,q:"Is 2/5 the same as 4/10",a:"yes"},{t:0,q:"Is 2/3 the same as 3/4",a:"no"},
     {t:1,q:"Is 6/9 the same as 8/12 — yes or no",a:"yes"},{t:1,q:"Is 5/8 the same as 10/18",a:"no"},{t:1,q:"Is 9/12 the same as 15/20",a:"yes"},{t:1,q:"1/2 × 5/5 — type as a/b",a:"5/10"},{t:1,q:"Is 7/21 the same as 1/3",a:"yes"},
     {t:2,q:"Fractions equal to 1/2 with denominators under 20 — how many",a:"9"},{t:2,q:"Is 12/18 the same as 16/24 — yes or no",a:"yes"}
   ]},
  {id:"u4w2p4",w:2,label:"2.4",title:"Fractions Equal to One",note:"Any fraction with matching top and bottom is just 1 wearing a costume.",
   items:[
     {t:0,q:"5/5 as a whole number",a:"1"},{t:0,q:"8/8",a:"1"},{t:0,q:"12/12",a:"1"},{t:0,q:"4/4",a:"1"},{t:0,q:"100/100",a:"1"},{t:0,q:"2/2",a:"1"},
     {t:1,q:"6/3 as a whole number",a:"2"},{t:1,q:"12/4",a:"3"},{t:1,q:"20/5",a:"4"},{t:1,q:"How many quarters make 2",a:"8"},{t:1,q:"How many thirds make 3",a:"9"},
     {t:2,q:"7/2 as a mixed number — the whole part",a:"3"},{t:2,q:"11/4 — the whole part",a:"2"}
   ]},
  {id:"u4w2p5",w:2,label:"Fri",title:"Equivalence Wall",note:"Build the strips and find every pair that lines up.",
   items:[
     {t:0,q:"Halves in a whole",a:"2"},{t:0,q:"Quarters in a whole",a:"4"},
     {t:1,q:"Quarters that line up with 1/2 — type as a/b",a:"2/4"},{t:1,q:"Sixths that line up with 1/3",a:"2/6"},
     {t:2,q:"Twelfths that line up with 3/4 — type as a/b",a:"9/12"},{t:2,q:"Strips of 12 that line up with 2/3",a:"8/12"},{t:2,q:"The smallest denominator where halves, thirds and quarters all line up",a:"12"}
   ]}
];

const PRACTICE_U4_W3 = [
  {id:"u4w3p1",w:3,label:"3.1",title:"Common Denominators",note:"Cut both into the same size pieces, then just compare the counts.",
   items:[
     {t:0,q:"Common denominator of 1/2 and 1/4",a:"4"},{t:0,q:"Common denominator of 1/3 and 1/6",a:"6"},{t:0,q:"Common denominator of 1/2 and 1/3",a:"6"},{t:0,q:"1/2 as quarters — the numerator",a:"2"},{t:0,q:"1/3 as sixths — the numerator",a:"2"},{t:0,q:"Common denominator of 1/4 and 1/8",a:"8"},
     {t:1,q:"Common denominator of 2/3 and 3/4",a:"12"},{t:1,q:"Common denominator of 3/5 and 1/2",a:"10"},{t:1,q:"2/3 as twelfths — the numerator",a:"8"},{t:1,q:"3/4 as twelfths — the numerator",a:"9"},{t:1,q:"Common denominator of 5/6 and 3/8",a:"24"},
     {t:2,q:"Smallest common denominator of 1/4, 1/6 and 1/8",a:"24"},{t:2,q:"Common denominator of 7/10 and 2/15",a:"30"}
   ]},
  {id:"u4w3p2",w:3,label:"3.2",title:"Benchmarks",note:"Nearer 0, a half, or 1? Decide before you calculate anything.",
   items:[
     {t:0,q:"Is 1/8 nearer 0 or 1 — type 0 or 1",a:"0"},{t:0,q:"Is 7/8 nearer 0 or 1",a:"1"},{t:0,q:"4/8 simplified — type as a/b",a:"1/2"},{t:0,q:"Is 5/6 nearer 1/2 or 1 — type 1/2 or 1",a:"1"},{t:0,q:"Is 1/5 nearer 0 or 1/2 — type 0 or 1/2",a:"0"},{t:0,q:"Is 3/5 more or less than 1/2 — type more or less",a:"more"},
     {t:1,q:"Is 5/9 more or less than 1/2",a:"more"},{t:1,q:"Is 4/9 more or less than 1/2",a:"less"},{t:1,q:"Is 7/16 more or less than 1/2",a:"less"},{t:1,q:"Is 9/16 more or less than 1/2",a:"more"},{t:1,q:"Nearest benchmark to 11/12 — type 0, 1/2 or 1",a:"1"},
     {t:2,q:"Is 13/25 more or less than 1/2",a:"more"},{t:2,q:"Nearest benchmark to 8/15 — type 0, 1/2 or 1",a:"1/2"}
   ]},
  {id:"u4w3p3",w:3,label:"3.3",title:"Comparing & Ordering",note:"Common denominator, or reason from benchmarks. Say which you used.",
   items:[
     {t:0,q:"Larger: 1/2 or 1/3 — type it",a:"1/2"},{t:0,q:"Larger: 3/4 or 1/2",a:"3/4"},{t:0,q:"Larger: 1/4 or 1/8",a:"1/4"},{t:0,q:"Larger: 2/3 or 1/3",a:"2/3"},{t:0,q:"Smaller: 1/5 or 1/6",a:"1/6"},{t:0,q:"Larger: 5/8 or 3/8",a:"5/8"},
     {t:1,q:"Larger: 2/3 or 3/4 — type it",a:"3/4"},{t:1,q:"Larger: 3/5 or 5/8",a:"5/8"},{t:1,q:"Larger: 5/6 or 7/9",a:"5/6"},{t:1,q:"Smallest of 1/3, 2/5, 1/4 — type it",a:"1/4"},{t:1,q:"Largest of 2/3, 5/8, 7/12",a:"2/3"},
     {t:2,q:"Order 3/4, 5/6, 7/8 — type the largest",a:"7/8"},{t:2,q:"Larger: 11/15 or 7/10 — type it",a:"11/15"}
   ]},
  {id:"u4w3p4",w:3,label:"3.4",title:"On the Number Line",note:"Every fraction has one address between 0 and 1. Find it.",
   items:[
     {t:0,q:"Halfway between 0 and 1 — type as a/b",a:"1/2"},{t:0,q:"Halfway between 0 and 1/2",a:"1/4"},{t:0,q:"Halfway between 1/2 and 1",a:"3/4"},{t:0,q:"Marks between 0 and 1 if split into quarters",a:"3"},{t:0,q:"Marks if split into fifths",a:"4"},{t:2,q:"1/2 as a decimal",a:"0.5"},
     {t:2,q:"3/4 as a decimal",a:"0.75"},{t:2,q:"1/4 as a decimal",a:"0.25"},{t:2,q:"1/5 as a decimal",a:"0.2"},{t:2,q:"3/5 as a decimal",a:"0.6"},{t:1,q:"Halfway between 1/4 and 1/2 — type as a/b",a:"3/8"},
     {t:2,q:"7/8 as a decimal",a:"0.875"},{t:2,q:"A fraction exactly between 1/3 and 2/3 — type as a/b",a:"1/2"}
   ]},
  {id:"u4w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",
   items:[
     {t:0,q:"1/2 = ?/8 — the numerator",a:"4"},{t:0,q:"4/8 simplified — type as a/b",a:"1/2"},
     {t:1,q:"6/8 simplified",a:"3/4"},{t:1,q:"Common denominator of 2/3 and 3/4",a:"12"},{t:1,q:"Larger: 3/5 or 5/8 — type it",a:"5/8"},{t:1,q:"Is 5/9 more or less than 1/2",a:"more"},{t:2,q:"3/4 as a decimal",a:"0.75"},
     {t:2,q:"Order 3/4, 5/6, 7/8 — type the largest",a:"7/8"}
   ]}
];

const PRACTICE_U4_W4 = [
  {id:"u4w4p1",w:4,label:"4.1",title:"Adding Like Denominators",note:"Same size pieces already. Add the counts, leave the bottom alone.",
   items:[
     {t:2,q:"1/4 + 1/4 — type as a/b",a:"1/2"},{t:2,q:"1/5 + 2/5",a:"3/5"},{t:2,q:"1/8 + 3/8",a:"1/2"},{t:2,q:"2/6 + 1/6",a:"1/2"},{t:2,q:"1/3 + 1/3",a:"2/3"},{t:0,q:"3/10 + 2/10",a:"1/2"},
     {t:2,q:"3/8 + 3/8",a:"3/4"},{t:1,q:"5/12 + 3/12",a:"2/3"},{t:1,q:"7/10 + 1/10",a:"4/5"},{t:2,q:"2/9 + 4/9",a:"2/3"},{t:2,q:"5/6 + 1/6",a:"1"},
     {t:2,q:"7/8 + 5/8 — type as a/b",a:"3/2"},{t:2,q:"3/5 + 4/5",a:"7/5"}
   ]},
  {id:"u4w4p2",w:4,label:"4.2",title:"Subtracting Like Denominators",note:"Same move, other direction.",
   items:[
     {t:2,q:"3/4 − 1/4 — type as a/b",a:"1/2"},{t:2,q:"4/5 − 1/5",a:"3/5"},{t:2,q:"7/8 − 3/8",a:"1/2"},{t:2,q:"5/6 − 1/6",a:"2/3"},{t:2,q:"2/3 − 1/3",a:"1/3"},{t:0,q:"9/10 − 4/10",a:"1/2"},
     {t:1,q:"1 − 1/4",a:"3/4"},{t:1,q:"1 − 3/8",a:"5/8"},{t:1,q:"11/12 − 5/12",a:"1/2"},{t:1,q:"1 − 2/5",a:"3/5"},{t:2,q:"7/9 − 1/9",a:"2/3"},
     {t:2,q:"2 − 3/4 — type as a/b",a:"5/4"},{t:2,q:"1 1/2 − 3/4 — type as a/b",a:"3/4"}
   ]},
  {id:"u4w4p3",w:4,label:"4.3",title:"Unlike Denominators",note:"The grade-five ceiling. Convert first, then add.",
   items:[
     {t:2,q:"1/2 + 1/4 — type as a/b",a:"3/4"},{t:2,q:"1/3 + 1/6",a:"1/2"},{t:2,q:"1/2 + 1/8",a:"5/8"},{t:2,q:"1/4 + 1/8",a:"3/8"},{t:2,q:"1/2 − 1/4",a:"1/4"},{t:2,q:"2/3 − 1/6",a:"1/2"},
     {t:2,q:"1/2 + 1/3",a:"5/6"},{t:2,q:"3/4 + 1/8",a:"7/8"},{t:2,q:"2/3 + 1/4",a:"11/12"},{t:2,q:"3/4 − 1/3",a:"5/12"},{t:2,q:"5/6 − 1/2",a:"1/3"},
     {t:2,q:"2/3 + 3/4 — type as a/b",a:"17/12"},{t:2,q:"1/2 + 1/3 + 1/6",a:"1"}
   ]},
  {id:"u4w4p4",w:4,label:"4.4",title:"Fractions in Words",note:"Read it twice, then decide whether it is an add or a subtract.",
   items:[
     {t:0,q:"Ate 1/4 of a pizza, then 1/4 more — total, as a/b",a:"1/2"},{t:0,q:"Had 3/4, ate 1/4 — left",a:"1/2"},{t:0,q:"1/2 hour plus 1/2 hour — hours",a:"1"},{t:0,q:"2/5 of a jug plus 1/5 — as a/b",a:"3/5"},{t:0,q:"1 whole minus 1/3 — as a/b",a:"2/3"},{t:2,q:"1/8 + 1/8 — as a/b",a:"1/4"},
     {t:1,q:"Walked 1/2 mile then 1/4 mile — total, as a/b",a:"3/4"},{t:1,q:"A 3/4 cup recipe, you have 1/2 — how much more, as a/b",a:"1/4"},{t:1,q:"Read 2/3 of a book, then 1/6 more — total, as a/b",a:"5/6"},{t:1,q:"Ran 5/6 km and walked 1/3 km — total, as a/b",a:"7/6"},{t:1,q:"1 hour minus 1/4 hour — minutes",a:"45"},
     {t:2,q:"Three pieces of 3/8 — total, as a/b",a:"9/8"},{t:2,q:"2/3 of an hour in minutes",a:"40"}
   ]},
  {id:"u4w4p5",w:4,label:"Fri",title:"Closest to One",note:"Draw cards, build a fraction, get nearest to 1 without going over.",
   items:[
     {t:0,q:"Which is nearer 1: 3/4 or 1/2 — type it",a:"3/4"},{t:0,q:"Which is nearer 1: 7/8 or 3/4",a:"7/8"},
     {t:1,q:"From digits 5 and 6, the fraction under 1 — type as a/b",a:"5/6"},{t:1,q:"From 7 and 8, the fraction under 1",a:"7/8"},
     {t:2,q:"Nearer 1: 8/9 or 9/10 — type it",a:"9/10"},{t:2,q:"How far is 9/10 from 1 — type as a/b",a:"1/10"},{t:2,q:"From digits 3, 4, 5, 6 the closest to 1 without going over — type as a/b",a:"5/6"}
   ]}
];

const PRACTICE_U4_W5 = [
  {id:"u4w5p1",w:5,label:"5.1",title:"Fraction of a Set",note:"Divide by the bottom, multiply by the top.",
   items:[
     {t:0,q:"1/2 of 10",a:"5"},{t:0,q:"1/3 of 12",a:"4"},{t:0,q:"1/4 of 20",a:"5"},{t:0,q:"1/5 of 25",a:"5"},{t:0,q:"1/2 of 30",a:"15"},{t:0,q:"1/6 of 30",a:"5"},
     {t:1,q:"2/5 of 30",a:"12"},{t:1,q:"3/4 of 20",a:"15"},{t:1,q:"2/3 of 18",a:"12"},{t:1,q:"5/6 of 24",a:"20"},{t:1,q:"3/8 of 40",a:"15"},
     {t:2,q:"2/3 of 45",a:"30"},{t:2,q:"7/10 of 120",a:"84"}
   ]},
  {id:"u4w5p2",w:5,label:"5.2",title:"Of Money and Time",note:"The same operator, applied to dollars and minutes.",
   items:[
     {t:0,q:"1/2 of $20",a:"10"},{t:0,q:"1/4 of $40",a:"10"},{t:0,q:"1/2 of an hour in minutes",a:"30"},{t:0,q:"1/4 of an hour in minutes",a:"15"},{t:0,q:"1/3 of $30",a:"10"},{t:0,q:"1/5 of $50",a:"10"},
     {t:1,q:"3/4 of $60",a:"45"},{t:1,q:"2/3 of an hour in minutes",a:"40"},{t:1,q:"3/5 of $45",a:"27"},{t:1,q:"5/6 of an hour in minutes",a:"50"},{t:1,q:"2/5 of $75",a:"30"},
     {t:2,q:"3/8 of $96",a:"36"},{t:2,q:"7/12 of an hour in minutes",a:"35"}
   ]},
  {id:"u4w5p3",w:5,label:"5.3",title:"Working Backwards",note:"Given the part, find the whole.",
   items:[
     {t:0,q:"Half a number is 6. The number",a:"12"},{t:0,q:"A third is 4. The number",a:"12"},{t:0,q:"A quarter is 5. The number",a:"20"},{t:0,q:"A fifth is 3. The number",a:"15"},{t:0,q:"Half is 15. The number",a:"30"},{t:0,q:"A sixth is 2. The number",a:"12"},
     {t:1,q:"2/3 of a number is 12. The number",a:"18"},{t:1,q:"3/4 of a number is 15. The number",a:"20"},{t:1,q:"2/5 of a number is 10. The number",a:"25"},{t:1,q:"5/6 of a number is 20. The number",a:"24"},{t:1,q:"3/8 of a number is 9. The number",a:"24"},
     {t:2,q:"2/7 of a number is 18. The number",a:"63"},{t:2,q:"After spending 3/5, $20 is left. The starting amount",a:"50"}
   ]},
  {id:"u4w5p4",w:5,label:"5.4",title:"Mixed Fraction Problems",note:"No signposting. Read, decide, then compute.",
   items:[
     {t:0,q:"1/2 of 16",a:"8"},{t:2,q:"1/4 + 1/4 — type as a/b",a:"1/2"},{t:0,q:"1 − 1/2 — as a/b",a:"1/2"},{t:0,q:"2/6 simplified — as a/b",a:"1/3"},{t:0,q:"1/3 of 15",a:"5"},{t:2,q:"3/4 − 1/4 — as a/b",a:"1/2"},
     {t:2,q:"2/3 + 1/6 — as a/b",a:"5/6"},{t:1,q:"3/4 of 24",a:"18"},{t:2,q:"5/8 − 1/4 — as a/b",a:"3/8"},{t:1,q:"2/5 of a number is 8. The number",a:"20"},{t:1,q:"Larger: 5/8 or 2/3 — type it",a:"2/3"},
     {t:2,q:"2/3 + 3/4 — as a/b",a:"17/12"},{t:2,q:"7/12 of 60",a:"35"}
   ]},
  {id:"u4w5p5",w:5,label:"Fri",title:"Fold the Universe, Built",note:"Finish the paper number line with every fraction landed on it.",
   items:[
     {t:0,q:"Folds to get halves",a:"1"},{t:0,q:"Folds to get quarters",a:"2"},
     {t:1,q:"Folds to get eighths",a:"3"},{t:1,q:"Sections after 4 folds",a:"16"},
     {t:2,q:"Sections after 6 folds",a:"64"},{t:2,q:"Folds needed for 32 sections",a:"5"},{t:2,q:"Marks strictly between 0 and 1 on a sixteenths line",a:"15"}
   ]}
];

const PRACTICE_U4_W6 = [
  {id:"u4w6p1",w:6,label:"6.1",title:"The Equivalence Proof",note:"Show the same amount two different ways and say why they match.",
   items:[
     {t:0,q:"1/2 = ?/4 — the numerator",a:"2"},{t:0,q:"2/4 simplified — type as a/b",a:"1/2"},{t:0,q:"1/2 × 3/3 — type as a/b",a:"3/6"},{t:0,q:"3/6 simplified",a:"1/2"},{t:0,q:"3/3 as a whole number",a:"1"},{t:0,q:"Multiplying by 1 changes a number by how much",a:"0"},
     {t:1,q:"2/3 × 4/4 — type as a/b",a:"8/12"},{t:1,q:"8/12 simplified",a:"2/3"},{t:1,q:"5/6 × 3/3",a:"15/18"},{t:1,q:"15/18 simplified",a:"5/6"},{t:1,q:"What 3/4 was multiplied by to become 12/16",a:"4"},
     {t:2,q:"18/27 simplified — type as a/b",a:"2/3"},{t:2,q:"Two fractions equal to 4/6 — type the simplest",a:"2/3"}
   ]},
  {id:"u4w6p2",w:6,label:"6.2",title:"Number Line Defence",note:"Every fraction has one place. Put it there and argue for it.",
   items:[
     {t:2,q:"1/2 as a decimal",a:"0.5"},{t:2,q:"1/4 as a decimal",a:"0.25"},{t:2,q:"3/4 as a decimal",a:"0.75"},{t:2,q:"1/5 as a decimal",a:"0.2"},{t:2,q:"2/5 as a decimal",a:"0.4"},{t:2,q:"1/10 as a decimal",a:"0.1"},
     {t:2,q:"3/8 as a decimal",a:"0.375"},{t:2,q:"5/8 as a decimal",a:"0.625"},{t:2,q:"7/10 as a decimal",a:"0.7"},{t:2,q:"Which sits further right: 2/3 or 0.6 — type it",a:"2/3"},{t:2,q:"3/5 as a decimal",a:"0.6"},
     {t:2,q:"7/8 as a decimal",a:"0.875"},{t:2,q:"Between 0.3 and 0.4 — type 1/3 or 2/5, whichever fits",a:"1/3"}
   ]},
  {id:"u4w6p3",w:6,label:"6.3",title:"Mission Review",note:"Everything from six weeks, mixed together.",
   items:[
     {t:0,q:"6/8 simplified — type as a/b",a:"3/4"},{t:2,q:"1/4 + 1/4 — as a/b",a:"1/2"},{t:0,q:"1/2 of 14",a:"7"},{t:0,q:"1 − 1/3 — as a/b",a:"2/3"},{t:0,q:"Larger: 1/2 or 1/3 — type it",a:"1/2"},{t:2,q:"1/2 as a decimal",a:"0.5"},
     {t:2,q:"2/3 + 1/4 — as a/b",a:"11/12"},{t:1,q:"3/4 of 32",a:"24"},{t:1,q:"Common denominator of 5/6 and 3/8",a:"24"},{t:2,q:"3/4 − 1/3 — as a/b",a:"5/12"},{t:1,q:"2/5 of a number is 10. The number",a:"25"},
     {t:2,q:"1/2 + 1/3 + 1/6 — as a/b",a:"1"},{t:2,q:"7/12 of 60",a:"35"}
   ]},
  {id:"u4w6p4",w:6,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",
   items:[
     {t:0,q:"2/4 simplified — type as a/b",a:"1/2"},{t:2,q:"1/3 + 1/3 — as a/b",a:"2/3"},{t:0,q:"1/4 of 16",a:"4"},{t:0,q:"Is 3/6 the same as 1/2 — yes or no",a:"yes"},{t:2,q:"1/5 as a decimal",a:"0.2"},{t:2,q:"5/6 − 1/6 — as a/b",a:"2/3"},
     {t:2,q:"1/2 + 1/3 — as a/b",a:"5/6"},{t:1,q:"12/16 simplified",a:"3/4"},{t:1,q:"5/6 of 24",a:"20"},{t:1,q:"Larger: 2/3 or 3/4 — type it",a:"3/4"},{t:2,q:"3/8 as a decimal",a:"0.375"},
     {t:2,q:"2/3 + 3/4 — as a/b",a:"17/12"},{t:2,q:"After spending 3/5, $20 is left. The starting amount",a:"50"}
   ]},
  {id:"u4w6p5",w:6,label:"Fri",title:"Mission 04 Test",note:"Twelve items plus the Big Question, answered out loud.",
   items:[
     {t:0,q:"4/8 simplified — type as a/b",a:"1/2"},{t:2,q:"1/4 + 1/4 — as a/b",a:"1/2"},
     {t:1,q:"1/2 = ?/10 — the numerator",a:"5"},{t:1,q:"10/15 simplified",a:"2/3"},{t:2,q:"1/2 + 1/4 — as a/b",a:"3/4"},{t:2,q:"3/4 − 1/3 — as a/b",a:"5/12"},{t:1,q:"Larger: 3/5 or 5/8 — type it",a:"5/8"},{t:1,q:"2/3 of 18",a:"12"},{t:2,q:"3/4 as a decimal",a:"0.75"},{t:1,q:"Common denominator of 2/3 and 3/4",a:"12"},
     {t:2,q:"2/3 + 3/4 — as a/b",a:"17/12"},{t:2,q:"3/8 of a number is 9. The number",a:"24"}
   ]}
];

const PRACTICE_U5_W2 = [
  {id:"u5w2p1",w:2,label:"2.1",title:"Line Up the Point",note:"Not the last digit — the point. Fill the gaps with zeros.",
   items:[
     {t:2,q:"0.3 + 0.4",a:"0.7"},{t:2,q:"1.2 + 2.5",a:"3.7"},{t:2,q:"0.25 + 0.25",a:"0.5"},{t:2,q:"2.5 + 1.5",a:"4"},{t:2,q:"0.6 + 0.9",a:"1.5"},{t:2,q:"3.4 + 1.2",a:"4.6"},
     {t:2,q:"3.5 + 0.47",a:"3.97"},{t:2,q:"12.6 + 4.85",a:"17.45"},{t:2,q:"9.4 + 0.68",a:"10.08"},{t:2,q:"0.125 + 0.875",a:"1"},{t:2,q:"7.05 + 2.9",a:"9.95"},
     {t:2,q:"2.5 + 3.75 + 0.125",a:"6.375"},{t:2,q:"What adds to 4.6 to make 10",a:"5.4"}
   ]},
  {id:"u5w2p2",w:2,label:"2.2",title:"Subtracting Decimals",note:"Same alignment. Borrow across the point when you must.",
   items:[
     {t:2,q:"0.9 − 0.4",a:"0.5"},{t:2,q:"3.7 − 1.2",a:"2.5"},{t:2,q:"1 − 0.5",a:"0.5"},{t:2,q:"2.5 − 0.5",a:"2"},{t:2,q:"0.75 − 0.25",a:"0.5"},{t:2,q:"5.8 − 2.3",a:"3.5"},
     {t:2,q:"4 − 1.35",a:"2.65"},{t:2,q:"10 − 0.07",a:"9.93"},{t:2,q:"8.2 − 3.45",a:"4.75"},{t:2,q:"6.05 − 2.5",a:"3.55"},{t:2,q:"12.3 − 4.75",a:"7.55"},
     {t:2,q:"12.4 − 7.856",a:"4.544"},{t:2,q:"A 2.5 m board with 0.85 m cut off — metres left",a:"1.65"}
   ]},
  {id:"u5w2p3",w:2,label:"2.3",title:"Change from a Twenty",note:"Money is decimals wearing a dollar sign. Type numbers only.",
   items:[
     {t:0,q:"$20 − $5",a:"15"},{t:2,q:"$20 − $10.50",a:"9.5"},{t:2,q:"$10 − $2.50",a:"7.5"},{t:2,q:"$5 − $1.25",a:"3.75"},{t:0,q:"$20 − $15",a:"5"},{t:2,q:"$1 − $0.35",a:"0.65"},
     {t:2,q:"$20 − $13.68",a:"6.32"},{t:2,q:"$50 − $27.45",a:"22.55"},{t:2,q:"$20 − $4.99",a:"15.01"},{t:2,q:"$100 − $63.20",a:"36.8"},{t:2,q:"$20 − ($6.50 + $4.25)",a:"9.25"},
     {t:2,q:"Three items at $4.95 — change from $20",a:"5.15"},{t:2,q:"$20 buys items at $2.40 — how many whole ones",a:"8"}
   ]},
  {id:"u5w2p4",w:2,label:"2.4",title:"Adding Money Columns",note:"A receipt is just a column of decimals.",
   items:[
     {t:2,q:"$2.50 + $1.50",a:"4"},{t:2,q:"$3.25 + $1.75",a:"5"},{t:2,q:"$0.99 + $0.01",a:"1"},{t:2,q:"$4.20 + $3.80",a:"8"},{t:2,q:"$1.10 + $2.40",a:"3.5"},{t:2,q:"$6.75 + $0.25",a:"7"},
     {t:2,q:"$4.99 + $3.49",a:"8.48"},{t:2,q:"$12.75 + $8.60",a:"21.35"},{t:2,q:"$1.99 + $2.99 + $3.99",a:"8.97"},{t:2,q:"$15.40 + $9.85",a:"25.25"},{t:2,q:"$7.30 + $0.95 + $1.25",a:"9.5"},
     {t:2,q:"Four items at $6.25 — the total",a:"25"},{t:2,q:"$18.99 + $11.01 + $5.50",a:"35.5"}
   ]},
  {id:"u5w2p5",w:2,label:"Fri",title:"Change Sprint",note:"Make the amount with the fewest coins. Beat your own record.",
   items:[
     {t:0,q:"Cents in a quarter",a:"25"},{t:0,q:"Cents in a dime",a:"10"},
     {t:1,q:"Fewest coins for 30 cents",a:"2"},{t:1,q:"Fewest coins for 41 cents",a:"4"},
     {t:2,q:"Fewest coins for 99 cents",a:"9"},{t:2,q:"Fewest coins for 63 cents",a:"6"},{t:2,q:"Quarters in $3.75",a:"15"}
   ]}
];

const PRACTICE_U5_W3 = [
  {id:"u5w3p1",w:3,label:"3.1",title:"Rounding Money",note:"To the nearest dollar, dime or cent — say which before you round.",
   items:[
     {t:2,q:"Round $4.60 to the nearest dollar",a:"5"},{t:2,q:"Round $4.30 to the nearest dollar",a:"4"},{t:2,q:"Round $0.48 to the nearest dime",a:"0.5"},{t:2,q:"Round $9.99 to the nearest dollar",a:"10"},{t:2,q:"Round $12.50 to the nearest dollar",a:"13"},{t:2,q:"Round $0.94 to the nearest dime",a:"0.9"},
     {t:2,q:"Round $27.45 to the nearest dollar",a:"27"},{t:2,q:"Round $3.456 to the nearest cent",a:"3.46"},{t:2,q:"Round $149.50 to the nearest ten dollars",a:"150"},{t:2,q:"Round $0.075 to the nearest cent",a:"0.08"},{t:2,q:"Round $64.49 to the nearest dollar",a:"64"},
     {t:2,q:"An item is $7.99. Estimate the cost of 6 to the nearest dollar",a:"48"},{t:2,q:"True cost of 6 at $7.99",a:"47.94"}
   ]},
  {id:"u5w3p2",w:3,label:"3.2",title:"Unit Price",note:"Price per one is the only fair comparison.",
   items:[
     {t:0,q:"$6 for 2 — price each",a:"3"},{t:0,q:"$10 for 5 — price each",a:"2"},{t:0,q:"$12 for 4 — price each",a:"3"},{t:0,q:"$8 for 8 — price each",a:"1"},{t:0,q:"$20 for 10 — price each",a:"2"},{t:0,q:"$9 for 3 — price each",a:"3"},
     {t:2,q:"$4.50 for 3 — price each",a:"1.5"},{t:2,q:"$7.20 for 8 — price each",a:"0.9"},{t:2,q:"$11.25 for 5 — price each",a:"2.25"},{t:2,q:"$2.40 for 6 — price each",a:"0.4"},{t:1,q:"$15 for 12 — price each",a:"1.25"},
     {t:2,q:"Pack A: $5 for 4. Pack B: $9 for 8. Price each for B",a:"1.125"},{t:2,q:"Same packs — price each for A",a:"1.25"}
   ]},
  {id:"u5w3p3",w:3,label:"3.3",title:"Is It Actually a Deal",note:"Bigger box, better price? Only sometimes. Prove it.",
   items:[
     {t:0,q:"$1 each or $5 for 5 — cheaper per item, type the price each for the pack",a:"1"},{t:0,q:"$2 each or $9 for 5 — price each for the pack",a:"1.8"},{t:2,q:"Which is cheaper each — type 1.8 or 2",a:"1.8"},{t:0,q:"$3 each, buy 4 — total",a:"12"},{t:0,q:"$10 for 4 — price each",a:"2.5"},{t:0,q:"Save per item vs $3 each",a:"0.5"},
     {t:1,q:"400 g for $5 — price per 100 g",a:"1.25"},{t:1,q:"800 g for $9 — price per 100 g",a:"1.125"},{t:1,q:"Better value — type 400 or 800",a:"800"},{t:1,q:"A $12 item at 25% off — the price paid",a:"9"},{t:1,q:"Buy 2 get 1 free at $6 each — price each across 3",a:"4"},
     {t:2,q:"1 kg for $8 or 750 g for $5.40 — price per kg of the small one",a:"7.2"},{t:2,q:"So which is better value — type 1kg or 750g",a:"750g"}
   ]},
  {id:"u5w3p4",w:3,label:"3.4",title:"Multi-Step Money",note:"Two operations, in the right order, with an estimate first.",
   items:[
     {t:0,q:"3 items at $2 — total",a:"6"},{t:0,q:"Change from $10",a:"4"},{t:2,q:"4 items at $1.50 — total",a:"6"},{t:0,q:"Change from $20",a:"14"},{t:2,q:"2 items at $3.25 — total",a:"6.5"},{t:0,q:"Change from $10",a:"3.5"},
     {t:2,q:"3 at $4.99 — total",a:"14.97"},{t:1,q:"Change from $20",a:"5.03"},{t:2,q:"5 at $2.40 plus one at $3.10 — total",a:"15.1"},{t:1,q:"$50 split between 4 people — each",a:"12.5"},{t:2,q:"6 at $1.75 — total",a:"10.5"},
     {t:2,q:"$40 budget, 3 dinners at $11.25 — dollars left",a:"6.25"},{t:2,q:"$100 for items at $12.50 — how many whole ones",a:"8"}
   ]},
  {id:"u5w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",
   items:[
     {t:2,q:"0.3 + 0.4",a:"0.7"},{t:2,q:"Round $4.60 to the nearest dollar",a:"5"},
     {t:2,q:"3.5 + 0.47",a:"3.97"},{t:2,q:"$20 − $13.68",a:"6.32"},{t:2,q:"$4.50 for 3 — price each",a:"1.5"},{t:2,q:"8.2 − 3.45",a:"4.75"},{t:2,q:"3 at $4.99 — total",a:"14.97"},
     {t:2,q:"$40 budget, 3 dinners at $11.25 — dollars left",a:"6.25"}
   ]}
];

const PRACTICE_U5_W4 = [
  {id:"u5w4p1",w:4,label:"4.1",title:"Build the Budget",note:"Three dinners, $40, and no going over.",
   items:[
     {t:0,q:"$40 split 4 ways",a:"10"},{t:0,q:"$40 split 5 ways",a:"8"},{t:0,q:"$12 + $15",a:"27"},{t:0,q:"$40 − $27",a:"13"},{t:0,q:"$40 split 8 ways",a:"5"},{t:0,q:"3 items at $5",a:"15"},
     {t:2,q:"Three dinners at $11.25 — total",a:"33.75"},{t:1,q:"Left from $40",a:"6.25"},{t:1,q:"$40 ÷ 3, rounded down to the cent",a:"13.33"},{t:2,q:"Two dinners at $14.50 — total",a:"29"},{t:1,q:"Left from $40",a:"11"},
     {t:2,q:"Feeding 4 people three dinners on $40 — dollars per person per dinner",a:"3.33",hint:"$40 ÷ 12, to the cent"},{t:2,q:"$40 with 15% left as buffer — dollars to spend",a:"34"}
   ]},
  {id:"u5w4p2",w:4,label:"4.2",title:"Shop It",note:"Real prices, real quantities, running total in your head.",
   items:[
     {t:2,q:"$3.50 + $2.50",a:"6"},{t:2,q:"$6 + $4.25",a:"10.25"},{t:2,q:"2 at $1.99",a:"3.98"},{t:0,q:"3 at $2",a:"6"},{t:2,q:"$5.75 + $4.25",a:"10"},{t:2,q:"$8.40 + $1.60",a:"10"},
     {t:2,q:"2 at $3.49 plus 1 at $5.99 — total",a:"12.97"},{t:2,q:"$12.97 rounded to the nearest dollar",a:"13"},{t:2,q:"4 at $2.25 plus 2 at $1.10 — total",a:"11.2"},{t:2,q:"Left from $40 after spending $28.65",a:"11.35"},{t:2,q:"3 at $6.99 — total",a:"20.97"},
     {t:2,q:"A cart of $33.75 with $2.70 tax — total",a:"36.45"},{t:2,q:"Change from $40 on that cart",a:"3.55"}
   ]},
  {id:"u5w4p3",w:4,label:"4.3",title:"Reconcile the Receipt",note:"Your total against theirs. Find the gap and name it.",
   items:[
     {t:0,q:"Estimated $30, actual $32 — the difference",a:"2"},{t:0,q:"Estimated $25, actual $22 — the difference",a:"3"},{t:2,q:"$40 − $36.45",a:"3.55"},{t:2,q:"$20 − $18.50",a:"1.5"},{t:0,q:"$15 + $15",a:"30"},{t:0,q:"$50 − $30",a:"20"},
     {t:2,q:"Planned $33.75, paid $36.45 — over by",a:"2.7"},{t:2,q:"Planned $40, paid $37.20 — under by",a:"2.8"},{t:2,q:"A $2.70 gap on $33.75 — roughly what percent, to the nearest whole",a:"8"},{t:2,q:"Receipt says $24.99, you counted $24.89 — the gap",a:"0.1"},{t:2,q:"Three receipts of $12.50 — total",a:"37.5"},
     {t:2,q:"You budgeted $13.33 a dinner and spent $12.15 — saved across 3 dinners",a:"3.54"},{t:2,q:"$40 budget, spent $36.45, three dinners — average per dinner",a:"12.15"}
   ]},
  {id:"u5w4p4",w:4,label:"Thu",title:"Error Journal Sweep",note:"Mixed review of the whole mission. Fix only what repeats.",
   items:[
     {t:2,q:"0.25 + 0.25",a:"0.5"},{t:2,q:"1 − 0.5",a:"0.5"},{t:2,q:"Round $9.99 to the nearest dollar",a:"10"},{t:0,q:"$10 for 5 — price each",a:"2"},{t:0,q:"$20 − $15",a:"5"},{t:2,q:"$3.25 + $1.75",a:"5"},
     {t:2,q:"12.6 + 4.85",a:"17.45"},{t:2,q:"10 − 0.07",a:"9.93"},{t:2,q:"$7.20 for 8 — price each",a:"0.9"},{t:2,q:"3 at $4.99 — total",a:"14.97"},{t:2,q:"Round $3.456 to the nearest cent",a:"3.46"},
     {t:2,q:"12.4 − 7.856",a:"4.544"},{t:2,q:"$40 budget, 3 dinners at $11.25 — dollars left",a:"6.25"}
   ]},
  {id:"u5w4p5",w:4,label:"Fri",title:"Mission 05 Test",note:"Twelve items plus the Big Question, answered out loud.",
   items:[
     {t:2,q:"0.6 + 0.9",a:"1.5"},{t:2,q:"$20 − $10.50",a:"9.5"},
     {t:2,q:"3.5 + 0.47",a:"3.97"},{t:2,q:"8.2 − 3.45",a:"4.75"},{t:2,q:"$50 − $27.45",a:"22.55"},{t:2,q:"$11.25 for 5 — price each",a:"2.25"},{t:2,q:"Round $27.45 to the nearest dollar",a:"27"},{t:2,q:"3 at $4.99 — change from $20",a:"5.03"},{t:1,q:"$15 for 12 — price each",a:"1.25"},{t:2,q:"$12.75 + $8.60",a:"21.35"},
     {t:2,q:"12.4 − 7.856",a:"4.544"},{t:2,q:"$40 budget, spent $36.45, three dinners — average per dinner",a:"12.15"}
   ]}
];

const PRACTICE_U6_W2 = [
  {id:"u6w2p1",w:2,label:"2.1",title:"Perimeter",note:"The distance all the way round. Add every side, or be clever about it.",
   items:[
     {t:0,q:"Perimeter of a 4 by 3 rectangle",a:"14"},{t:0,q:"Perimeter of a 5 by 5 square",a:"20"},{t:0,q:"Perimeter of a 10 by 2 rectangle",a:"24"},{t:0,q:"Perimeter of a 6 by 6 square",a:"24"},{t:0,q:"Perimeter of a 7 by 1 rectangle",a:"16"},{t:0,q:"Perimeter of a 3 by 3 square",a:"12"},
     {t:1,q:"Perimeter of a 12 by 8 rectangle",a:"40"},{t:1,q:"A square of perimeter 36 — one side",a:"9"},{t:1,q:"A rectangle of perimeter 20, one side 6 — the other",a:"4"},{t:1,q:"Perimeter of a 15 by 9 rectangle",a:"48"},{t:1,q:"A square of perimeter 100 — one side",a:"25"},
     {t:2,q:"A rectangle of perimeter 30 with whole sides — how many different ones",a:"7"},{t:2,q:"Perimeter of an L made from a 5 by 5 square with a 2 by 2 corner removed",a:"20"}
   ]},
  {id:"u6w2p2",w:2,label:"2.2",title:"Area",note:"Length times width — and count the squares if you doubt it.",
   items:[
     {t:0,q:"Area of a 4 by 3 rectangle",a:"12"},{t:0,q:"Area of a 5 by 5 square",a:"25"},{t:0,q:"Area of a 10 by 2 rectangle",a:"20"},{t:0,q:"Area of a 6 by 6 square",a:"36"},{t:0,q:"Area of a 7 by 1 rectangle",a:"7"},{t:0,q:"Area of a 8 by 3 rectangle",a:"24"},
     {t:1,q:"Area of a 12 by 8 rectangle",a:"96"},{t:1,q:"Area 48, one side 6 — the other",a:"8"},{t:1,q:"Area of a 15 by 9 rectangle",a:"135"},{t:1,q:"A square of area 49 — one side",a:"7"},{t:1,q:"Area 144 with equal sides — one side",a:"12"},
     {t:2,q:"Area of an L: a 6 by 6 square minus a 2 by 3 corner",a:"30"},{t:2,q:"Double both sides of a 4 by 5 rectangle — the new area",a:"80"}
   ]},
  {id:"u6w2p3",w:2,label:"2.3",title:"Same Fence, Different Field",note:"Perimeter fixed, area wildly different. That is the Big Question.",
   items:[
     {t:0,q:"A 1 by 11 rectangle — perimeter",a:"24"},{t:0,q:"That rectangle — area",a:"11"},{t:0,q:"A 6 by 6 square — perimeter",a:"24"},{t:0,q:"That square — area",a:"36"},{t:0,q:"A 2 by 10 rectangle — area",a:"20"},{t:0,q:"A 4 by 8 rectangle — area",a:"32"},
     {t:1,q:"With 24 m of fence, the biggest whole-number area",a:"36"},{t:1,q:"With 20 m of fence, the biggest area",a:"25"},{t:1,q:"With 16 m of fence, the biggest area",a:"16"},{t:1,q:"With 24 m of fence, the smallest area using whole sides",a:"11"},{t:1,q:"With 30 m of fence, the biggest whole-number area",a:"56"},
     {t:2,q:"The shape that always gives the biggest area for a fixed perimeter — type square or circle",a:"circle"},{t:2,q:"Among rectangles with perimeter 40, the biggest area",a:"100"}
   ]},
  {id:"u6w2p4",w:2,label:"2.4",title:"Area of Compound Shapes",note:"Split it into rectangles, do each, add them up.",
   items:[
     {t:0,q:"A 3 by 2 plus a 3 by 2 — total area",a:"12"},{t:0,q:"A 4 by 4 plus a 2 by 2",a:"20"},{t:0,q:"A 5 by 3 plus a 5 by 1",a:"20"},{t:0,q:"A 6 by 2 plus a 3 by 2",a:"18"},{t:0,q:"A 10 by 1 plus a 5 by 2",a:"20"},{t:0,q:"A 7 by 3 plus a 1 by 3",a:"24"},
     {t:1,q:"An 8 by 6 with a 2 by 3 removed — area",a:"42"},{t:1,q:"A 10 by 10 with a 4 by 4 removed",a:"84"},{t:1,q:"An L of a 9 by 4 and a 5 by 3",a:"51"},{t:1,q:"A 12 by 5 with a 3 by 5 removed",a:"45"},{t:1,q:"A T of a 8 by 2 and a 2 by 6",a:"28"},
     {t:2,q:"A 20 by 15 room with a 4 by 5 alcove added — total area",a:"320"},{t:2,q:"A 12 by 12 with a 12 by 3 strip removed",a:"108"}
   ]},
  {id:"u6w2p5",w:2,label:"Fri",title:"The Biggest Pen",note:"24 metres of fence, and a wall to build against. Now what?",
   items:[
     {t:0,q:"With 24 m and no wall, the biggest area",a:"36"},{t:0,q:"Sides you must fence with a wall behind you",a:"3"},
     {t:1,q:"24 m against a wall, 8 m deep each side — the width",a:"8"},{t:1,q:"That pen's area",a:"64"},
     {t:2,q:"24 m against a wall, 6 m deep each side — the area",a:"72"},{t:2,q:"The biggest area for 24 m against a wall",a:"72"},{t:2,q:"How much bigger than the no-wall best",a:"36"}
   ]}
];

const PRACTICE_U6_W3 = [
  {id:"u6w3p1",w:3,label:"3.1",title:"Plotting Points",note:"Across the hall, then up the stairs. Type coordinates like 3,5.",
   items:[
     {t:0,q:"In (3, 5), the number across",a:"3"},{t:0,q:"In (3, 5), the number up",a:"5"},{t:0,q:"The origin — type as a,b",a:"0,0"},{t:0,q:"4 across, 2 up — type as a,b",a:"4,2"},{t:0,q:"0 across, 6 up — type as a,b",a:"0,6"},{t:0,q:"In (7, 1), the first number",a:"7"},
     {t:1,q:"3 right of (2,5) — type as a,b",a:"5,5"},{t:1,q:"2 up from (4,1) — type as a,b",a:"4,3"},{t:1,q:"Distance from (2,3) to (7,3)",a:"5"},{t:1,q:"Distance from (4,1) to (4,8)",a:"7"},{t:1,q:"Halfway between (0,0) and (8,0) — type as a,b",a:"4,0"},
     {t:2,q:"Halfway between (2,2) and (8,6) — type as a,b",a:"5,4"},{t:2,q:"From (0,0) to (6,8) going only across and up — total steps",a:"14"}
   ]},
  {id:"u6w3p2",w:3,label:"3.2",title:"Shapes on the Grid",note:"Plot the corners, then read off what you built.",
   items:[
     {t:0,q:"Corners on a rectangle",a:"4"},{t:0,q:"Corners on a triangle",a:"3"},{t:0,q:"(1,1) to (5,1) — the length",a:"4"},{t:0,q:"(1,1) to (1,4) — the length",a:"3"},{t:0,q:"Sides on a square",a:"4"},{t:0,q:"(0,0) to (3,0) — the length",a:"3"},
     {t:1,q:"(1,1), (1,5), (6,5), (6,1) — the area",a:"20"},{t:1,q:"That shape's perimeter",a:"18"},{t:1,q:"(2,2), (2,7), (5,7), (5,2) — the area",a:"15"},{t:1,q:"(0,0), (0,4), (4,4), (4,0) — the shape's name",a:"square"},{t:1,q:"The missing corner of a rectangle at (1,1),(1,4),(6,4) — type as a,b",a:"6,1"},
     {t:2,q:"(0,0), (8,0), (8,5), (0,5) — the area",a:"40"},{t:2,q:"A square with corners (2,2) and (7,7) opposite — its area",a:"25"}
   ]},
  {id:"u6w3p3",w:3,label:"3.3",title:"Reading a Map",note:"Coordinates are directions somebody else has to follow.",
   items:[
     {t:0,q:"From (0,0), move 3 across — type as a,b",a:"3,0"},{t:0,q:"From (3,0), move 2 up — type as a,b",a:"3,2"},{t:0,q:"From (5,5), move 1 across — type as a,b",a:"6,5"},{t:0,q:"From (2,2), move 2 up — type as a,b",a:"2,4"},{t:0,q:"Blocks from (0,0) to (4,0)",a:"4"},{t:0,q:"Blocks from (0,0) to (0,7)",a:"7"},
     {t:1,q:"From (1,2) to (6,2) then up 3 — type the end as a,b",a:"6,5"},{t:1,q:"Total blocks travelled on that route",a:"8"},{t:1,q:"A park at (3,4), a school at (9,4) — blocks apart",a:"6"},{t:1,q:"From (2,1) to (2,9) — blocks",a:"8"},{t:1,q:"From (0,0) to (5,5) across-and-up — blocks",a:"10"},
     {t:2,q:"A route (1,1) to (7,1) to (7,6) — total blocks",a:"11"},{t:2,q:"The shortest across-and-up route from (2,3) to (9,8) — blocks",a:"12"}
   ]},
  {id:"u6w3p4",w:3,label:"3.4",title:"Order Matters",note:"(3,5) and (5,3) are different places. Prove it every time.",
   items:[
     {t:0,q:"In (3,5), the across value",a:"3"},{t:0,q:"In (5,3), the across value",a:"5"},{t:0,q:"Are (3,5) and (5,3) the same — yes or no",a:"no"},{t:0,q:"In (0,4), the across value",a:"0"},{t:0,q:"In (4,0), the up value",a:"0"},{t:0,q:"A point on the bottom line has which value 0 — type across or up",a:"up"},
     {t:1,q:"(2,6) and (6,2) — how far apart across",a:"4"},{t:1,q:"Those two points — how far apart up",a:"4"},{t:1,q:"A point with the same across and up as (5,5) — type as a,b",a:"5,5"},{t:1,q:"Points where across equals up, from (0,0) to (5,5) — how many",a:"6"},{t:1,q:"Swap (7,2) — type the new point as a,b",a:"2,7"},
     {t:2,q:"Points on the line where across equals up, from 0 to 10 — how many",a:"11"},{t:2,q:"(1,4), (4,1), (1,1) — the area of that triangle",a:"4.5"}
   ]},
  {id:"u6w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",
   items:[
     {t:0,q:"Perimeter of a 4 by 3 rectangle",a:"14"},{t:0,q:"Area of a 4 by 3 rectangle",a:"12"},
     {t:1,q:"Area 48, one side 6 — the other",a:"8"},{t:1,q:"With 20 m of fence, the biggest area",a:"25"},{t:1,q:"An 8 by 6 with a 2 by 3 removed — area",a:"42"},{t:1,q:"Distance from (2,3) to (7,3)",a:"5"},{t:1,q:"(1,1), (1,5), (6,5), (6,1) — the area",a:"20"},
     {t:2,q:"A rectangle of perimeter 30 with whole sides — how many different ones",a:"7"}
   ]}
];

const PRACTICE_U6_W4 = [
  {id:"u6w4p1",w:4,label:"4.1",title:"Lines of Symmetry",note:"Fold it. If both halves land exactly, that fold is a line of symmetry.",
   items:[
     {t:0,q:"Lines of symmetry in a square",a:"4"},{t:0,q:"In a rectangle that is not a square",a:"2"},{t:0,q:"In a circle — type the word",a:"infinite"},{t:0,q:"In an equilateral triangle",a:"3"},{t:0,q:"In the letter A",a:"1"},{t:0,q:"In the letter H",a:"2"},
     {t:1,q:"In a regular pentagon",a:"5"},{t:1,q:"In a regular hexagon",a:"6"},{t:1,q:"In an isosceles triangle",a:"1"},{t:1,q:"In a scalene triangle",a:"0"},{t:1,q:"In a rhombus that is not a square",a:"2"},
     {t:2,q:"In a regular octagon",a:"8"},{t:2,q:"In a regular polygon with 12 sides",a:"12"}
   ]},
  {id:"u6w4p2",w:4,label:"4.2",title:"Flips and Turns",note:"Slide, flip, turn. The shape keeps its size and its angles.",
   items:[
     {t:2,q:"Degrees in a quarter turn",a:"90"},{t:2,q:"Degrees in a half turn",a:"180"},{t:2,q:"Degrees in a full turn",a:"360"},{t:0,q:"Quarter turns in a full turn",a:"4"},{t:2,q:"Degrees in three quarter turns",a:"270"},{t:0,q:"Half turns in a full turn",a:"2"},
     {t:2,q:"A square turned 90° looks the same — yes or no",a:"yes"},{t:2,q:"Turns of 90° before a square returns to start",a:"4"},{t:2,q:"A rectangle looks the same after how many degrees",a:"180"},{t:1,q:"(2,3) flipped over the vertical line through 0 — the across value becomes",a:"-2"},{t:1,q:"Slide (2,3) four right — type as a,b",a:"6,3"},
     {t:2,q:"An equilateral triangle looks the same after how many degrees",a:"120"},{t:2,q:"A regular hexagon — the smallest turn that leaves it unchanged, in degrees",a:"60"}
   ]},
  {id:"u6w4p3",w:4,label:"4.3",title:"Angles",note:"Right, acute, obtuse — and what they add to.",
   items:[
     {t:2,q:"Degrees in a right angle",a:"90"},{t:2,q:"Degrees on a straight line",a:"180"},{t:2,q:"Degrees round a point",a:"360"},{t:2,q:"An angle of 45° — type acute or obtuse",a:"acute"},{t:2,q:"An angle of 120° — acute or obtuse",a:"obtuse"},{t:0,q:"Angles in a triangle add to",a:"180"},
     {t:2,q:"Two angles on a line, one is 60° — the other",a:"120"},{t:2,q:"A triangle with 90° and 30° — the third angle",a:"60"},{t:1,q:"Angles in a quadrilateral add to",a:"360"},{t:2,q:"A quadrilateral with three 90° angles — the fourth",a:"90"},{t:2,q:"Three angles round a point, two are 100° — the third",a:"160"},
     {t:2,q:"Each angle of an equilateral triangle",a:"60"},{t:2,q:"Each angle of a regular hexagon",a:"120"}
   ]},
  {id:"u6w4p4",w:4,label:"4.4",title:"Classifying Shapes",note:"Sides, angles, parallels. Name it from its properties.",
   items:[
     {t:0,q:"Sides on a pentagon",a:"5"},{t:0,q:"Sides on a hexagon",a:"6"},{t:0,q:"Sides on an octagon",a:"8"},{t:0,q:"Sides on a quadrilateral",a:"4"},{t:0,q:"Equal sides on an equilateral triangle",a:"3"},{t:0,q:"Sides on a triangle",a:"3"},
     {t:1,q:"Is every square a rectangle — yes or no",a:"yes"},{t:1,q:"Is every rectangle a square",a:"no"},{t:1,q:"Pairs of parallel sides in a parallelogram",a:"2"},{t:1,q:"Pairs of parallel sides in a trapezoid",a:"1"},{t:2,q:"A triangle with one 90° angle — type its name",a:"right"},
     {t:2,q:"A rhombus with right angles is also called a",a:"square"},{t:2,q:"A triangle with all sides different — type its name",a:"scalene"}
   ]},
  {id:"u6w4p5",w:4,label:"Fri",title:"Tessellation",note:"Which shapes tile a floor with no gaps? Test three and explain.",
   items:[
     {t:0,q:"Do squares tile with no gaps — yes or no",a:"yes"},{t:0,q:"Do circles tile with no gaps",a:"no"},
     {t:1,q:"Do equilateral triangles tile — yes or no",a:"yes"},{t:1,q:"Do regular hexagons tile",a:"yes"},
     {t:2,q:"Do regular pentagons tile — yes or no",a:"no"},{t:2,q:"Angles must meet at a point adding to",a:"360"},{t:2,q:"Hexagons at a point: 360 ÷ 120 — how many meet",a:"3"}
   ]}
];

const PRACTICE_U6_W5 = [
  {id:"u6w5p1",w:5,label:"5.1",title:"Map a Planet",note:"An invented world on the coordinate plane, with real distances.",
   items:[
     {t:0,q:"A harbour at (2,3) — the across value",a:"2"},{t:0,q:"A peak at (7,7) — the up value",a:"7"},{t:0,q:"Distance from (2,3) to (6,3)",a:"4"},{t:0,q:"Distance from (5,1) to (5,6)",a:"5"},{t:0,q:"The origin — type as a,b",a:"0,0"},{t:0,q:"3 across, 8 up — type as a,b",a:"3,8"},
     {t:1,q:"Sailing (1,1) to (9,1) then to (9,5) — total distance",a:"12"},{t:1,q:"A square island (2,2) to (8,8) — its area",a:"36"},{t:1,q:"That island's perimeter",a:"24"},{t:1,q:"Halfway between (0,0) and (10,4) — type as a,b",a:"5,2"},{t:1,q:"A route (0,0) to (4,0) to (4,7) — distance",a:"11"},
     {t:2,q:"A rectangular sea from (1,1) to (11,6) — its area",a:"50"},{t:2,q:"Ten landmarks each 3 units apart in a line — total length",a:"27"}
   ]},
  {id:"u6w5p2",w:5,label:"5.2",title:"Sailing Directions",note:"Somebody else has to follow them. Ambiguity is the enemy.",
   items:[
     {t:0,q:"From (0,0) move 5 across — type as a,b",a:"5,0"},{t:0,q:"Then 3 up — type as a,b",a:"5,3"},{t:0,q:"Total distance travelled",a:"8"},{t:0,q:"From (4,4) move 2 up — type as a,b",a:"4,6"},{t:0,q:"From (4,4) move 2 across — type as a,b",a:"6,4"},{t:0,q:"Blocks from (0,0) to (3,4) across-and-up",a:"7"},
     {t:1,q:"(1,1) to (1,7) to (5,7) — total distance",a:"10"},{t:1,q:"(2,2) to (8,2) to (8,9) — total distance",a:"13"},{t:1,q:"A round trip (0,0) to (6,0) and back — distance",a:"12"},{t:1,q:"(3,3) to (3,10) — distance",a:"7"},{t:1,q:"A square patrol of side 5 — total distance",a:"20"},
     {t:2,q:"A patrol (1,1),(7,1),(7,5),(1,5) and back to start — total distance",a:"20"},{t:2,q:"The area enclosed by that patrol",a:"24"}
   ]},
  {id:"u6w5p3",w:5,label:"5.3",title:"Mission Review",note:"Everything from five weeks, mixed together.",
   items:[
     {t:0,q:"Perimeter of a 5 by 5 square",a:"20"},{t:0,q:"Area of a 5 by 5 square",a:"25"},{t:2,q:"Degrees in a right angle",a:"90"},{t:0,q:"Lines of symmetry in a square",a:"4"},{t:0,q:"In (3,5), the up value",a:"5"},{t:0,q:"Angles in a triangle add to",a:"180"},
     {t:1,q:"Area 96 with one side 12 — the other",a:"8"},{t:2,q:"A triangle with 90° and 30° — the third angle",a:"60"},{t:1,q:"With 24 m of fence, the biggest area",a:"36"},{t:1,q:"(2,2), (2,7), (5,7), (5,2) — the area",a:"15"},{t:1,q:"Lines of symmetry in a regular hexagon",a:"6"},
     {t:2,q:"A 10 by 10 with a 4 by 4 removed — area",a:"84"},{t:2,q:"Each angle of a regular hexagon",a:"120"}
   ]},
  {id:"u6w5p4",w:5,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",
   items:[
     {t:0,q:"Perimeter of a 6 by 6 square",a:"24"},{t:0,q:"Area of a 8 by 3 rectangle",a:"24"},{t:2,q:"Degrees round a point",a:"360"},{t:0,q:"Sides on a hexagon",a:"6"},{t:0,q:"Distance from (2,3) to (7,3)",a:"5"},{t:0,q:"Lines of symmetry in a rectangle",a:"2"},
     {t:1,q:"An 8 by 6 with a 2 by 3 removed — area",a:"42"},{t:1,q:"A square of perimeter 36 — one side",a:"9"},{t:2,q:"Two angles on a line, one is 60° — the other",a:"120"},{t:1,q:"(1,1), (1,5), (6,5), (6,1) — the perimeter",a:"18"},{t:1,q:"Is every square a rectangle — yes or no",a:"yes"},
     {t:2,q:"Among rectangles with perimeter 40, the biggest area",a:"100"},{t:2,q:"A regular hexagon — smallest turn leaving it unchanged, in degrees",a:"60"}
   ]},
  {id:"u6w5p5",w:5,label:"Fri",title:"Mission 06 Test",note:"Twelve items plus the Big Question, answered out loud.",
   items:[
     {t:0,q:"Perimeter of a 10 by 2 rectangle",a:"24"},{t:0,q:"Area of a 10 by 2 rectangle",a:"20"},
     {t:1,q:"Area of a 12 by 8 rectangle",a:"96"},{t:1,q:"A rectangle of perimeter 20, one side 6 — the other",a:"4"},{t:1,q:"With 20 m of fence, the biggest area",a:"25"},{t:1,q:"A 12 by 5 with a 3 by 5 removed — area",a:"45"},{t:1,q:"Distance from (4,1) to (4,8)",a:"7"},{t:1,q:"(1,1), (1,5), (6,5), (6,1) — the area",a:"20"},{t:1,q:"Lines of symmetry in a regular pentagon",a:"5"},{t:2,q:"A triangle with 90° and 30° — the third angle",a:"60"},
     {t:2,q:"A 20 by 15 room with a 4 by 5 alcove added — total area",a:"320"},{t:2,q:"A patrol (1,1),(7,1),(7,5),(1,5) — the area enclosed",a:"24"}
   ]}
];

const PRACTICE_U7_W2 = [
  {id:"u7w2p1",w:2,label:"2.1",title:"Write the Question",note:"A fair question doesn't push the answer. Rewrite the loaded ones.",
   items:[
     {t:0,q:"People you will ask",a:"20"},{t:0,q:"Answer choices in a yes/no question",a:"2"},{t:0,q:"20 people, 10 say yes — percent saying yes",a:"50"},{t:0,q:"20 people, 5 say yes — percent",a:"25"},{t:0,q:"20 people, 20 say yes — percent",a:"100"},{t:0,q:"20 people, 0 say yes — percent",a:"0"},
     {t:1,q:"20 people, 15 say yes — percent",a:"75"},{t:1,q:"20 people, 12 say yes — percent",a:"60"},{t:1,q:"20 people, 3 say yes — percent",a:"15"},{t:1,q:"If 60% of 20 said yes, how many people",a:"12"},{t:1,q:"20 people across 4 choices, evenly — each choice",a:"5"},
     {t:2,q:"20 people, 7 say yes — percent",a:"35"},{t:2,q:"Out of 100 people, expect how many yes if 7 of 20 said yes",a:"35"}
   ]},
  {id:"u7w2p2",w:2,label:"2.2",title:"Ask 20 People",note:"Tally as they answer. No tidying up afterwards.",
   items:[
     {t:0,q:"Four tally marks plus a cross-stroke — the count",a:"5"},{t:0,q:"Two groups of five",a:"10"},{t:0,q:"Three groups of five plus 2",a:"17"},{t:0,q:"Four groups of five",a:"20"},{t:0,q:"One group of five plus 3",a:"8"},{t:0,q:"20 minus 13",a:"7"},
     {t:1,q:"Counts 8, 6, 4, 2 — the total",a:"20"},{t:1,q:"Those counts — the largest",a:"8"},{t:1,q:"Those counts — the range",a:"6"},{t:1,q:"Counts 9, 5, 6 — the total",a:"20"},{t:1,q:"If three choices total 20 and two are 9 and 5 — the third",a:"6"},
     {t:2,q:"20 answers over 4 choices, one has 11 — the other three total",a:"9"},{t:2,q:"Counts 8, 6, 4, 2 — the mean",a:"5"}
   ]},
  {id:"u7w2p3",w:2,label:"2.3",title:"Graph What You Got",note:"Bar graph of your own data, plus all four measures.",
   items:[
     {t:0,q:"Counts 8, 6, 4, 2 — the total",a:"20"},{t:2,q:"Their mean",a:"5"},{t:0,q:"Their range",a:"6"},{t:0,q:"The mode of 5, 7, 7, 9",a:"7"},{t:0,q:"The median of 2, 5, 9",a:"5"},{t:0,q:"A scale marked every 2 — the value 3 marks up",a:"6"},
     {t:2,q:"Counts 12, 8, 6, 4 — the mean",a:"7.5"},{t:1,q:"Those counts — the median",a:"7"},{t:1,q:"Those counts — the range",a:"8"},{t:1,q:"Water 8, juice 6, milk 4, tea 2 — the mode",a:"water"},{t:1,q:"Out of 100 people, expect how many water",a:"40"},
     {t:2,q:"Counts 9, 5, 3, 2, 1 — the mean",a:"4"},{t:2,q:"Those counts — the median",a:"3"}
   ]},
  {id:"u7w2p4",w:2,label:"2.4",title:"Chance as a Number",note:"Chance is a count out of a total. Nothing more mysterious.",
   items:[
     {t:0,q:"Faces on one die",a:"6"},{t:0,q:"Ways to roll a 4",a:"1"},{t:0,q:"Even numbers on a die",a:"3"},{t:0,q:"Ways to roll more than 4",a:"2"},{t:0,q:"A bag of 3 red and 5 blue — total",a:"8"},{t:0,q:"Sides on a coin",a:"2"},
     {t:1,q:"60 rolls of a die — expected 3s",a:"10"},{t:1,q:"A coin flipped 50 times — expected heads",a:"25"},{t:1,q:"3 red in 8, drawn 40 times — expected reds",a:"15"},{t:1,q:"A spinner of 8 parts, 2 gold, 40 spins — expected golds",a:"10"},{t:1,q:"A bag of 4 red and 6 blue — reds expected in 20 draws",a:"8"},
     {t:2,q:"Two dice — ways to total 7",a:"6"},{t:2,q:"Two dice — total possible outcomes",a:"36"}
   ]},
  {id:"u7w2p5",w:2,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–2. 85% to keep flying.",
   items:[
     {t:0,q:"Each ★ = 5 books. 7 ★ — books",a:"35"},{t:2,q:"Mean of 6, 8, 10, 12",a:"9"},
     {t:1,q:"Median of 11, 4, 7, 20, 9",a:"9"},{t:1,q:"Mode and range of 3, 8, 8, 8, 15 — type the range",a:"12"},{t:2,q:"Six numbers with mean 9 — their total",a:"54"},{t:1,q:"A bag of 4 red and 6 blue — reds in 10 draws",a:"4"},{t:1,q:"60 rolls — expected 5s",a:"10"},
     {t:2,q:"2, 2, 2, 2, 22 — the mean",a:"6"}
   ]}
];

const PRACTICE_U7_W3 = [
  {id:"u7w3p1",w:3,label:"3.1",title:"Publish the Findings",note:"One headline, one graph, one honest limitation.",
   items:[
     {t:0,q:"People surveyed",a:"20"},{t:0,q:"15 of 20 — the percent",a:"75"},{t:0,q:"5 of 20 — the percent",a:"25"},{t:0,q:"Out of 100, expect how many if 15 of 20 said yes",a:"75"},{t:0,q:"8 of 20 — the percent",a:"40"},{t:0,q:"20 minus 8",a:"12"},
     {t:1,q:"12 of 20 — out of 100",a:"60"},{t:1,q:"A headline says most people. The smallest count of 20 that earns it",a:"11"},{t:1,q:"9 of 20 — the percent",a:"45"},{t:1,q:"Does 45% earn most — yes or no",a:"no"},{t:1,q:"17 of 20 — the percent",a:"85"},
     {t:2,q:"A survey of 20 predicting a town of 5,000 — people per person surveyed",a:"250"},{t:2,q:"If 15 of 20 said yes, the predicted yes count in 5,000",a:"3750"}
   ]},
  {id:"u7w3p2",w:3,label:"3.2",title:"The Misleading Graph",note:"Start the axis at 90 and watch a tiny gap look enormous.",
   items:[
     {t:0,q:"Bars at 95 and 98 — the true difference",a:"3"},{t:0,q:"Bars at 50 and 60 — the difference",a:"10"},{t:0,q:"An axis starting at 0 shows a bar of 95 as how tall, in units",a:"95"},{t:0,q:"An axis starting at 90 shows that bar as",a:"5"},{t:0,q:"Bars at 20 and 40 — the difference",a:"20"},{t:0,q:"40 is how many times 20",a:"2"},
     {t:1,q:"Bars at 95 and 98 on an axis from 90 — the drawn heights differ by",a:"3"},{t:1,q:"Drawn from 90, 98 appears how many times taller than 95",a:"1.6"},{t:2,q:"The true ratio of 98 to 95, to one decimal",a:"1"},{t:1,q:"An axis starting at 0 is honest — yes or no",a:"yes"},{t:1,q:"Bars at 102 and 104 from an axis at 100 — apparent times taller",a:"2"},
     {t:2,q:"Sales of 1,020 and 1,040 drawn from 1,000 — apparent times taller",a:"2"},{t:2,q:"Their true percent difference, to the nearest whole",a:"2"}
   ]},
  {id:"u7w3p3",w:3,label:"3.3",title:"Fifty Trials",note:"Predict, roll, tally, and explain the gap in writing.",
   items:[
     {t:0,q:"Trials",a:"50"},{t:0,q:"Faces on a die",a:"6"},{t:0,q:"50 ÷ 6 — the whole part",a:"8"},{t:2,q:"50 ÷ 6 — the remainder",a:"2"},{t:0,q:"A coin, 50 flips — expected heads",a:"25"},{t:0,q:"Six faces, expected each in 60 rolls",a:"10"},
     {t:1,q:"Predicted 8, rolled 14 — the difference",a:"6"},{t:1,q:"Predicted 8, rolled 3 — the difference",a:"5"},{t:1,q:"600 rolls — expected 6s",a:"100"},{t:1,q:"Is a spread of a few either way normal in 50 rolls — yes or no",a:"yes"},{t:1,q:"Six tallies totalling 50, five are 8 — the sixth",a:"10"},
     {t:2,q:"Two dice, 36 rolls — expected 7s",a:"6"},{t:2,q:"Two dice — ways to total 2",a:"1"}
   ]},
  {id:"u7w3p4",w:3,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",
   items:[
     {t:2,q:"Mean of 4, 6, 8",a:"6"},{t:0,q:"Median of 2, 5, 9",a:"5"},{t:0,q:"Mode of 5, 7, 7, 9",a:"7"},{t:0,q:"Range of 3, 9, 12",a:"9"},{t:0,q:"Each ★ = 5. 6 ★ — books",a:"30"},{t:0,q:"Even numbers on a die",a:"3"},
     {t:2,q:"Mean of 4, 7, 7, 9, 13",a:"8"},{t:1,q:"Median of that set",a:"7"},{t:2,q:"Five numbers with mean 10 — their total",a:"50"},{t:1,q:"60 rolls — expected 3s",a:"10"},{t:1,q:"15 of 20 — the percent",a:"75"},
     {t:2,q:"Six houses at 200 and one at 900 — the mean",a:"300"},{t:2,q:"Those same houses — the median",a:"200"}
   ]},
  {id:"u7w3p5",w:3,label:"Fri",title:"Mission 07 Test",note:"Twelve items plus the Big Question, answered out loud.",
   items:[
     {t:0,q:"A bar chart marked every 4, a bar at the third mark — its value",a:"12"},{t:0,q:"Each ▮ = 2 goals. 9 ▮ — goals",a:"18"},
     {t:2,q:"Mean of 14, 16, 18, 20",a:"17"},{t:1,q:"Median of 5, 12, 3, 8, 21, 9",a:"8.5"},{t:1,q:"Range of 7, 7, 19, 4, 11",a:"15"},{t:2,q:"Five scores total 45, a sixth of 9 added — new mean",a:"9"},{t:1,q:"A spinner of 8 parts, 2 gold, 40 spins — expected golds",a:"10"},{t:1,q:"20 people, 8 pick water — out of 100",a:"40"},{t:2,q:"Water 8, juice 6, milk 4, tea 2 — the mean",a:"5"},{t:1,q:"Those four — the mode",a:"water"},
     {t:2,q:"Two dice — ways to total 7",a:"6"},{t:2,q:"2, 2, 2, 2, 22 — mean and median; type the median",a:"2"}
   ]}
];

const PRACTICE_U7_W4 = [
  {id:"u7w4p4",w:4,label:"4.4",title:"Mixed Measures",note:"Length, volume and mass in one sitting so the units stop blurring.",
   items:[
     {t:0,q:"Inches in 4 and a half inches, in half inches",a:"9"},{t:0,q:"Inches in 3 and a half inches, in half inches",a:"7"},{t:0,q:"Inches in 5 and a half inches, in half inches",a:"11"},{t:0,q:"Inches in 7 and a half inches, in half inches",a:"15"},{t:0,q:"Inches in 2 and a half inches, in half inches",a:"5"},{t:0,q:"Inches in 2 and a half inches, in half inches",a:"5"},{t:0,q:"250 ml plus 250 ml",a:"500"},{t:0,q:"750 ml plus 750 ml",a:"1500"},{t:0,q:"250 ml plus 250 ml",a:"500"},{t:0,q:"500 ml plus 500 ml",a:"1000"},{t:0,q:"250 ml plus 250 ml",a:"500"},{t:0,q:"250 ml plus 250 ml",a:"500"},{t:1,q:"644 g plus 157 g",a:"801"},{t:1,q:"271 g plus 111 g",a:"382"},{t:1,q:"292 g plus 191 g",a:"483"},{t:1,q:"634 g plus 65 g",a:"699"},{t:1,q:"779 g plus 81 g",a:"860"},{t:1,q:"428 g plus 211 g",a:"639"},{t:1,q:"842 g plus 199 g",a:"1041"},{t:1,q:"12 quarter inches — how many whole inches",a:"3"},{t:1,q:"36 quarter inches — how many whole inches",a:"9"},{t:1,q:"12 quarter inches — how many whole inches",a:"3"},{t:1,q:"24 quarter inches — how many whole inches",a:"6"},{t:1,q:"12 quarter inches — how many whole inches",a:"3"},{t:2,q:"A 2 litre bottle poured into 250 ml cups — cups filled",a:"8"}
   ]},
  {id:"u7w4p5",w:4,label:"Fri",title:"Measurement Check",note:"Six questions across all three measures.",
   items:[
     {t:0,q:"250 ml doubled",a:"500"},{t:0,q:"500 ml doubled",a:"1000"},{t:0,q:"750 ml doubled",a:"1500"},{t:0,q:"300 ml doubled",a:"600"},{t:0,q:"400 ml doubled",a:"800"},{t:0,q:"Half inches in 3 whole inches",a:"6"},{t:0,q:"Half inches in 5 whole inches",a:"10"},{t:0,q:"Half inches in 7 whole inches",a:"14"},{t:0,q:"Half inches in 9 whole inches",a:"18"},{t:1,q:"450 g minus 250 g",a:"200"},{t:1,q:"680 g minus 320 g",a:"360"},{t:1,q:"900 g minus 450 g",a:"450"},{t:1,q:"16 quarter inches in whole inches",a:"4"},{t:1,q:"24 quarter inches in whole inches",a:"6"},{t:1,q:"32 quarter inches in whole inches",a:"8"},{t:1,q:"A 2 litre bottle in millilitres",a:"2000"},{t:2,q:"3 kg 750 g in grams",a:"3750"},
     {t:0,q:"Millilitres in 1 litre",a:"1000"},{t:0,q:"Grams in 1 kilogram",a:"1000"},{t:0,q:"Quarter inches in 2 whole inches",a:"8"},{t:1,q:"1500 ml — the millilitres part after 1 litre",a:"500"},{t:1,q:"A 750 g bag and a 400 g bag — total grams",a:"1150"},{t:2,q:"3 kg 250 g in grams",a:"3250"}
   ]},
  {id:"u7w5p3",w:5,label:"5.3",title:"Clocks and Calendars",note:"Read the day's real timetable off a real clock.",
   items:[
     {t:0,q:"Minute hand on 1 — minutes past",a:"5"},{t:0,q:"Minute hand on 2 — minutes past",a:"10"},{t:0,q:"Minute hand on 4 — minutes past",a:"20"},{t:0,q:"Minute hand on 5 — minutes past",a:"25"},{t:0,q:"Minute hand on 7 — minutes past",a:"35"},{t:0,q:"Minute hand on 8 — minutes past",a:"40"},{t:0,q:"Minute hand on 10 — minutes past",a:"50"},{t:1,q:"15 minutes past plus 20 more",a:"35"},{t:1,q:"25 minutes past plus 15 more",a:"40"},{t:1,q:"40 minutes past plus 10 more",a:"50"},{t:1,q:"Minutes from quarter past to quarter to",a:"30"},{t:1,q:"Hours from half past 9 to half past 2",a:"5"},{t:2,q:"A 100 minute film starting at 6 — the finishing hour",a:"7"},
     {t:0,q:"Minutes in a quarter of an hour",a:"15"},{t:0,q:"Minutes in half an hour",a:"30"},{t:0,q:"Minutes in three quarters of an hour",a:"45"},{t:1,q:"Quarter past 2 to quarter to 3 — minutes",a:"30"},{t:1,q:"10 past 9 to 25 past 9 — minutes",a:"15"},{t:2,q:"A lesson 8:50 to 9:35 — minutes",a:"45"}
   ]},
  {id:"u7w5p4",w:5,label:"5.4",title:"Error Journal",note:"Fix only what repeats.",
   items:[
     {t:0,q:"320 + 180",a:"500"},{t:0,q:"540 + 260",a:"800"},{t:0,q:"710 + 390",a:"1100"},{t:0,q:"800 − 350",a:"450"},{t:0,q:"650 − 280",a:"370"},{t:1,q:"1500 ml — whole litres",a:"1"},{t:1,q:"2400 ml — whole litres",a:"2"},{t:1,q:"3600 ml — whole litres",a:"3"},{t:1,q:"Minutes in 2 and a half hours",a:"150"},{t:1,q:"Minutes in 3 and a half hours",a:"210"},{t:1,q:"Minutes in 5 and a half hours",a:"330"},{t:1,q:"A ribbon 36 inches cut into 4 — inches each",a:"9"},{t:2,q:"2 kg minus 450 g, in grams",a:"1550"},
     {t:0,q:"Minutes in 2 hours",a:"120"},{t:0,q:"Grams in 2 kilograms",a:"2000"},{t:1,q:"A jug of 900 ml, 350 ml poured out — left",a:"550"},{t:1,q:"Half past 3 to half past 6 — hours",a:"3"},{t:2,q:"A 1 litre jug fills 4 equal cups — millilitres in each",a:"250"}
   ]},
  {id:"u7w5p5",w:5,label:"Fri",title:"Mission 07 Test",note:"Graphs, measures and time together.",
   items:[
     {t:0,q:"Millilitres in half a litre",a:"500"},{t:0,q:"Grams in half a kilogram",a:"500"},{t:0,q:"Quarter inches in 3 whole inches",a:"12"},{t:0,q:"Minutes in a quarter of an hour",a:"15"},{t:1,q:"A jug of 1 litre, 350 ml poured out — ml left",a:"650"},{t:1,q:"From 10 past 2 to 10 to 3 — minutes",a:"40"},{t:1,q:"A bar chart where each block is 4 — blocks for 28",a:"7"},{t:1,q:"A 20 inch ribbon shared by 5 — inches each",a:"4"},{t:2,q:"A 3 litre jug fills 250 ml cups — cups",a:"12"},{t:2,q:"Half past 8 to quarter past 11 — minutes",a:"165"},
     {t:0,q:"Minutes in 1 hour",a:"60"},{t:0,q:"Millilitres in 2 litres",a:"2000"},{t:1,q:"A bar chart where each block is 5 — blocks for 35",a:"7"},{t:1,q:"A ribbon 18 inches cut into 6 equal pieces — inches each",a:"3"},{t:1,q:"Quarter to 4 until 4 o'clock — minutes",a:"15"},{t:2,q:"A 2 kg bag split into 250 g packets — packets",a:"8"}
   ]},
  {id:"u7w4p1",w:4,label:"4.1",title:"The Ruler, Honestly",note:"Whole, half and quarter inches — read off a real ruler, not guessed.",
   items:[
     {t:0,q:"A line plot with 4 crosses above 3 inches — objects measuring 3 inches",a:"4"},{t:0,q:"Marks between 3 and 4 inches on a half-inch plot, not counting the ends",a:"1"},{t:0,q:"Marks between 3 and 4 inches on a quarter-inch plot, not counting the ends",a:"3"},{t:1,q:"A plot shows 3 at 2 inches and 5 at 2 and a half — how many altogether",a:"8"},{t:1,q:"Longest 4 inches, shortest 2 inches — the range in inches",a:"2"},{t:1,q:"Eight pencils measured to the quarter inch — crosses on the plot altogether",a:"8"},{t:2,q:"A plot has 3 at 2in, 5 at two-and-a-half, 2 at 3in — how many more at two-and-a-half than at 3",a:"3"},
     {t: 0, q: "Inches in 3 whole inches, counted on a ruler", a: "3"},{t: 0, q: "Inches in 5 whole inches, counted on a ruler", a: "5"},{t: 0, q: "Inches in 7 whole inches, counted on a ruler", a: "7"},{t: 0, q: "Inches in 9 whole inches, counted on a ruler", a: "9"},{t: 0, q: "Inches in 11 whole inches, counted on a ruler", a: "11"},{t: 0, q: "Half inches in 1 whole inches", a: "2"},{t: 0, q: "Half inches in 3 whole inches", a: "6"},{t: 0, q: "Half inches in 5 whole inches", a: "10"},{t: 0, q: "Half inches in 7 whole inches", a: "14"},{t: 0, q: "Quarter inches in 1 whole inches", a: "4"},{t: 0, q: "Quarter inches in 2 whole inches", a: "8"},{t: 0, q: "Quarter inches in 3 whole inches", a: "12"},{t: 0, q: "Quarter inches in 4 whole inches", a: "16"},{t: 0, q: "A pencil reaches the mark halfway between 4 and 5 inches. Write it as quarter inches", a: "18"},{t: 1, q: "A ribbon 12 inches long, cut off 7 inches. Left", a: "5"},{t: 1, q: "A ribbon 24 inches long, cut off 9 inches. Left", a: "15"},{t: 1, q: "A ribbon 36 inches long, cut off 15 inches. Left", a: "21"},{t: 1, q: "A ribbon 18 inches long, cut off 6 inches. Left", a: "12"},{t: 1, q: "9 inches shared into 3 equal pieces. Each piece", a: "3"},{t: 1, q: "12 inches shared into 4 equal pieces. Each piece", a: "3"},{t: 1, q: "15 inches shared into 5 equal pieces. Each piece", a: "3"},{t: 1, q: "Three quarter inches — how many quarters", a: "3"},{t: 1, q: "A line is 2 and a half inches. In half inches", a: "5"},{t: 1, q: "A line is 3 and a quarter inches. In quarter inches", a: "13"},{t: 2, q: "Two ribbons, 7 and a half and 4 and a half inches. Total in half inches", a: "24"},{t: 2, q: "A 24 inch strip cut into quarter inch pieces. How many pieces", a: "96"}
   ]},
  {id:"u7w4p2",w:4,label:"4.2",title:"Litres and Millilitres",note:"Liquid volume with real containers: jugs, cups and bottles.",
   items:[
     {t: 0, q: "250 ml plus 300 ml", a: "550"},{t: 0, q: "400 ml plus 150 ml", a: "550"},{t: 0, q: "600 ml plus 250 ml", a: "850"},{t: 0, q: "750 ml plus 200 ml", a: "950"},{t: 0, q: "Millilitres in 1 litre", a: "1000"},{t: 0, q: "Millilitres in 2 litres", a: "2000"},{t: 0, q: "Millilitres in 3 litres", a: "3000"},{t: 0, q: "Millilitres in 5 litres", a: "5000"},{t: 0, q: "2000 ml — how many whole litres", a: "2"},{t: 0, q: "3500 ml — how many whole litres", a: "3"},{t: 0, q: "4000 ml — how many whole litres", a: "4"},{t: 1, q: "A jug holds 500 ml, 200 ml is poured out. Left", a: "300"},{t: 1, q: "A jug holds 900 ml, 350 ml is poured out. Left", a: "550"},{t: 1, q: "A jug holds 1000 ml, 450 ml is poured out. Left", a: "550"},{t: 1, q: "How many 250 ml cups fill a 1 litre jug", a: "4"},{t: 1, q: "How many 500 ml cups fill a 1 litre jug", a: "2"},{t: 1, q: "Three 250 ml cups — total ml", a: "750"},{t: 2, q: "A 2 litre bottle fills 250 ml cups. How many", a: "8"},{t: 2, q: "1500 ml — litres and millilitres, give the millilitres part", a: "500"}
   ]},
  {id:"u7w4p3",w:4,label:"4.3",title:"Grams and Kilograms",note:"Mass on a balance: what a kilogram actually feels like.",
   items:[
     {t: 0, q: "Grams in 1 kilogram", a: "1000"},{t: 0, q: "Grams in 2 kilograms", a: "2000"},{t: 0, q: "Grams in 3 kilograms", a: "3000"},{t: 0, q: "Grams in 5 kilograms", a: "5000"},{t: 0, q: "2000 g — how many whole kilograms", a: "2"},{t: 0, q: "4500 g — how many whole kilograms", a: "4"},{t: 0, q: "6000 g — how many whole kilograms", a: "6"},{t: 0, q: "350 g plus 200 g", a: "550"},{t: 0, q: "480 g plus 150 g", a: "630"},{t: 0, q: "700 g plus 250 g", a: "950"},{t: 1, q: "A bag of 900 g, 400 g used. Left", a: "500"},{t: 1, q: "A bag of 1000 g, 650 g used. Left", a: "350"},{t: 1, q: "A bag of 750 g, 300 g used. Left", a: "450"},{t: 1, q: "How many 100 g weights balance 1 kilogram", a: "10"},{t: 1, q: "How many 200 g weights balance 1 kilogram", a: "5"},{t: 1, q: "How many 250 g weights balance 1 kilogram", a: "4"},{t: 1, q: "Four 250 g packets — total grams", a: "1000"},{t: 2, q: "A 3 kg bag split into 500 g bags. How many bags", a: "6"},{t: 2, q: "2 kg 400 g — total in grams", a: "2400"}
   ]},
];

const PRACTICE_U7_W5 = [
  {id:"u7w5p1",w:5,label:"5.1",title:"Time to the Minute",note:"Reading a clock face properly — every minute, not just o'clock and half past.",
   items:[
     {t: 0, q: "Minutes past the hour when the minute hand is on 1, counting by fives", a: "5"},{t: 0, q: "Minutes past the hour when the minute hand is on 2, counting by fives", a: "10"},{t: 0, q: "Minutes past the hour when the minute hand is on 3, counting by fives", a: "15"},{t: 0, q: "Minutes past the hour when the minute hand is on 4, counting by fives", a: "20"},{t: 0, q: "Minutes past the hour when the minute hand is on 5, counting by fives", a: "25"},{t: 0, q: "Minutes past the hour when the minute hand is on 6, counting by fives", a: "30"},{t: 0, q: "Minutes past the hour when the minute hand is on 8, counting by fives", a: "40"},{t: 0, q: "Minutes past the hour when the minute hand is on 9, counting by fives", a: "45"},{t: 0, q: "Minutes past the hour when the minute hand is on 10, counting by fives", a: "50"},{t: 0, q: "Minutes in 1 hour", a: "60"},{t: 0, q: "Minutes in 2 hours", a: "120"},{t: 0, q: "Minutes in 3 hours", a: "180"},{t: 0, q: "Minutes in 4 hours", a: "240"},{t: 0, q: "Minutes in half an hour", a: "30"},{t: 0, q: "Minutes in a quarter of an hour", a: "15"},{t: 0, q: "Minutes in three quarters of an hour", a: "45"},{t: 1, q: "20 minutes past, plus 15 more", a: "35"},{t: 1, q: "35 minutes past, plus 25 more minutes. Minutes past the next hour", a: "0"},{t: 1, q: "50 minutes past, plus 20 more minutes. Minutes past the next hour", a: "10"},{t: 1, q: "Quarter past plus half an hour — minutes past", a: "45"},{t: 1, q: "Twenty to the hour — minutes past", a: "40"},{t: 2, q: "90 minutes — hours and minutes, give the minutes part", a: "30"},{t: 2, q: "150 minutes in hours and minutes, give the hours part", a: "2"}
   ]},
  {id:"u7w5p2",w:5,label:"5.2",title:"Elapsed Time",note:"How long something took: hours, half hours and quarter hours.",
   items:[
     {t: 0, q: "From 9 o'clock to 11 o'clock — hours", a: "2"},{t: 0, q: "From 10 o'clock to 13 o'clock — hours", a: "3"},{t: 0, q: "From 14 o'clock to 17 o'clock — hours", a: "3"},{t: 0, q: "From 8 o'clock to 12 o'clock — hours", a: "4"},{t: 0, q: "From 30 minutes past to 45 minutes past — minutes", a: "15"},{t: 0, q: "From 15 minutes past to 45 minutes past — minutes", a: "30"},{t: 0, q: "From 10 minutes past to 40 minutes past — minutes", a: "30"},{t: 0, q: "Half past 2 to 3 o'clock — minutes", a: "30"},{t: 0, q: "Quarter past 4 to half past 4 — minutes", a: "15"},{t: 1, q: "45 minutes then 30 minutes — total minutes", a: "75"},{t: 1, q: "50 minutes then 40 minutes — total minutes", a: "90"},{t: 1, q: "35 minutes then 50 minutes — total minutes", a: "85"},{t: 1, q: "A lesson starts at 9 o'clock and runs 90 minutes. The finishing hour", a: "10"},{t: 1, q: "Quarter to 3 until 3 o'clock — minutes", a: "15"},{t: 1, q: "From half past 1 to half past 4 — hours", a: "3"},{t: 2, q: "A film starts quarter past 6 and lasts 105 minutes. Minutes past the hour at the end", a: "0"},{t: 2, q: "School 8:45 to 15:15 — total hours, rounded down", a: "6"}
   ]},
];

const PRACTICE_U8_W2 = [
  {id:"u8w2p1",w:2,label:"2.1",title:"What a Letter Is",note:"n is a seat a number sits in. 3n is three of them.",
   items:[
     {t:0,q:"n = 4. Value of n + 6",a:"10"},{t:0,q:"n = 4. Value of 3n",a:"12"},{t:0,q:"n = 7. Value of n − 3",a:"4"},{t:0,q:"n = 5. Value of 2n",a:"10"},{t:0,q:"n = 9. Value of n + n",a:"18"},{t:0,q:"n = 6. Value of 10 − n",a:"4"},
     {t:1,q:"n = 5. Value of 3n + 2",a:"17"},{t:1,q:"n = 8. Value of 2n − 5",a:"11"},{t:1,q:"n = 6. Value of n × n",a:"36"},{t:1,q:"n = 12. Value of n ÷ 4 + 5",a:"8"},{t:1,q:"n = 10. Value of 4n − 10",a:"30"},
     {t:2,q:"n = 4. Value of 2n + 3n",a:"20"},{t:2,q:"p = 9. Value of 100 − 8p",a:"28"}
   ]},
  {id:"u8w2p2",w:2,label:"2.2",title:"Evaluate It",note:"Substitute the number, then work it out. One step at a time.",
   items:[
     {t:0,q:"n = 2. Value of 5n",a:"10"},{t:0,q:"n = 3. Value of n + 7",a:"10"},{t:0,q:"n = 10. Value of n ÷ 2",a:"5"},{t:0,q:"n = 1. Value of 9n",a:"9"},{t:0,q:"n = 0. Value of 6n",a:"0"},{t:0,q:"n = 8. Value of n − 8",a:"0"},
     {t:1,q:"n = 7. Value of 4n + 1",a:"29"},{t:1,q:"n = 6. Value of 5n − 12",a:"18"},{t:1,q:"n = 9. Value of 2n + 2",a:"20"},{t:1,q:"n = 11. Value of 3n − 3",a:"30"},{t:1,q:"n = 4. Value of 25 − 3n",a:"13"},
     {t:2,q:"n = 12. Value of 2n ÷ 3",a:"8"},{t:2,q:"n = 5. Value of n² + n",a:"30"}
   ]},
  {id:"u8w2p3",w:2,label:"2.3",title:"Write the Expression",note:"Turn the sentence into symbols. Then check it on a number.",
   items:[
     {t:0,q:"Three lots of n, when n = 4",a:"12"},{t:0,q:"n more than 5, when n = 3",a:"8"},{t:0,q:"Double n, when n = 7",a:"14"},{t:0,q:"n less than 10, when n = 4",a:"6"},{t:0,q:"Half of n, when n = 8",a:"4"},{t:0,q:"n plus n, when n = 5",a:"10"},
     {t:1,q:"Five more than double n, when n = 6",a:"17"},{t:1,q:"Three less than four lots of n, when n = 5",a:"17"},{t:1,q:"Ten more than half of n, when n = 20",a:"20"},{t:1,q:"Triple n, plus 4, when n = 8",a:"28"},{t:1,q:"n multiplied by itself, when n = 7",a:"49"},
     {t:2,q:"Twice the sum of n and 3, when n = 5",a:"16"},{t:2,q:"The perimeter of a square of side s, when s = 7",a:"28"}
   ]},
  {id:"u8w2p4",w:2,label:"2.4",title:"Two Letters",note:"Substitute both before you simplify anything.",
   items:[
     {t:0,q:"a = 2, b = 3. Value of a + b",a:"5"},{t:0,q:"a = 2, b = 3. Value of ab",a:"6"},{t:0,q:"a = 5, b = 1. Value of a − b",a:"4"},{t:0,q:"a = 4, b = 4. Value of a + b",a:"8"},{t:0,q:"a = 3, b = 6. Value of b ÷ a",a:"2"},{t:0,q:"a = 1, b = 9. Value of ab",a:"9"},
     {t:1,q:"a = 3, b = 7. Value of 4a + b",a:"19"},{t:1,q:"a = 4, b = 6. Value of 3a + 2b",a:"24"},{t:1,q:"a = 5, b = 2. Value of a × b + 3",a:"13"},{t:1,q:"a = 6, b = 3. Value of 2a − b",a:"9"},{t:1,q:"a = 8, b = 2. Value of a ÷ b + 5",a:"9"},
     {t:2,q:"a = 4, b = 5. Value of 2a + 3b − 10",a:"13"},{t:2,q:"l = 7, w = 3. Value of 2l + 2w",a:"20"}
   ]},
  {id:"u8w2p5",w:2,label:"Fri",title:"Perimeter as a Rule",note:"Write it as 4s once, then test it on three squares.",
   items:[
     {t:0,q:"Perimeter of a square of side 3",a:"12"},{t:0,q:"Of side 5",a:"20"},
     {t:1,q:"Using 4s with s = 9 — the perimeter",a:"36"},{t:1,q:"A square of perimeter 28 — its side",a:"7"},
     {t:2,q:"Using 2l + 2w with l = 8, w = 5",a:"26"},{t:2,q:"A rectangle of perimeter 30 and length 10 — its width",a:"5"},{t:2,q:"Using 4s, the side when the perimeter is 100",a:"25"}
   ]}
];

const PRACTICE_U8_W3 = [
  {id:"u8w3p1",w:3,label:"3.1",title:"Keep It Level",note:"Take the same amount from both sides and the balance holds.",
   items:[
     {t:0,q:"x + 4 = 11",a:"7"},{t:0,q:"x + 5 = 12",a:"7"},{t:0,q:"x + 10 = 15",a:"5"},{t:0,q:"x + 2 = 9",a:"7"},{t:0,q:"x + 7 = 7",a:"0"},{t:0,q:"x + 12 = 20",a:"8"},
     {t:1,q:"x + 17 = 42",a:"25"},{t:1,q:"x − 5 = 9",a:"14"},{t:1,q:"x − 23 = 19",a:"42"},{t:1,q:"x + 38 = 100",a:"62"},{t:1,q:"x − 14 = 27",a:"41"},
     {t:2,q:"x + 156 = 400",a:"244"},{t:2,q:"x − 99 = 101",a:"200"}
   ]},
  {id:"u8w3p2",w:3,label:"3.2",title:"Multiply and Divide",note:"Divide both sides by the same number and the balance still holds.",
   items:[
     {t:0,q:"3x = 21",a:"7"},{t:0,q:"6x = 30",a:"5"},{t:0,q:"2x = 14",a:"7"},{t:0,q:"5x = 25",a:"5"},{t:0,q:"x ÷ 2 = 8",a:"16"},{t:0,q:"4x = 20",a:"5"},
     {t:1,q:"8x = 96",a:"12"},{t:1,q:"7x = 84",a:"12"},{t:1,q:"x ÷ 5 = 13",a:"65"},{t:1,q:"4x = 100",a:"25"},{t:1,q:"9x = 108",a:"12"},
     {t:2,q:"12x = 288",a:"24"},{t:2,q:"x ÷ 7 = 21",a:"147"}
   ]},
  {id:"u8w3p3",w:3,label:"3.3",title:"Check Your Answer",note:"Put it back in. If both sides match, you are done — no marking needed.",
   items:[
     {t:0,q:"x = 7 in x + 4 — the value",a:"11"},{t:0,q:"x = 5 in 3x — the value",a:"15"},{t:0,q:"x = 9 in x − 2",a:"7"},{t:0,q:"x = 4 in 2x + 1",a:"9"},{t:0,q:"x = 6 in x ÷ 2",a:"3"},{t:0,q:"x = 10 in x + 10",a:"20"},
     {t:1,q:"Solve then check: 3x = 27",a:"9"},{t:1,q:"Check x = 9 in 3x — the value",a:"27"},{t:1,q:"Solve then check: x + 19 = 31",a:"12"},{t:1,q:"Check x = 12 in x + 19",a:"31"},{t:1,q:"Solve: 6x = 72",a:"12"},
     {t:2,q:"2x + 5 = 19",a:"7"},{t:2,q:"Check x = 7 in 2x + 5",a:"19"}
   ]},
  {id:"u8w3p4",w:3,label:"3.4",title:"Word to Equation",note:"Turn the situation into an equation, then solve it.",
   items:[
     {t:0,q:"A number plus 5 is 12. The number",a:"7"},{t:0,q:"Double a number is 14. The number",a:"7"},{t:0,q:"A number less 3 is 8. The number",a:"11"},{t:0,q:"Three lots of a number is 18. The number",a:"6"},{t:0,q:"Half a number is 9. The number",a:"18"},{t:0,q:"A number plus itself is 16. The number",a:"8"},
     {t:1,q:"Four friends share equally and get 13 each. The total",a:"52"},{t:1,q:"After spending $18 you have $27. You started with",a:"45"},{t:1,q:"Five boxes hold 60 altogether. Each box",a:"12"},{t:1,q:"A number times 7 is 91. The number",a:"13"},{t:1,q:"Twice a number plus 3 is 21. The number",a:"9"},
     {t:2,q:"Three times a number, less 7, is 26. The number",a:"11"},{t:2,q:"A rectangle of perimeter 34 and width 5 — its length",a:"12"}
   ]},
  {id:"u8w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",
   items:[
     {t:0,q:"6, 11, 16, 21 — next",a:"26"},{t:0,q:"n = 4. Value of 3n",a:"12"},
     {t:1,q:"Machine × 4 + 2. In 9",a:"38"},{t:1,q:"That machine gives 30 — what went in",a:"7"},{t:1,q:"n = 7. Value of 3n − 4",a:"17"},{t:1,q:"x + 18 = 45",a:"27"},{t:1,q:"7x = 63",a:"9"},
     {t:2,q:"A pattern starts at 3 and adds 4 — its tenth number",a:"39"}
   ]}
];

const PRACTICE_U8_W4 = [
  {id:"u8w4p1",w:4,label:"4.1",title:"Design the Trail",note:"Ten stops, one per mission plus two of your own. Map it first.",
   items:[
     {t:0,q:"Stops on the trail",a:"10"},{t:0,q:"Missions in the year",a:"8"},{t:0,q:"Stops of your own choosing",a:"2"},{t:0,q:"3 minutes per stop, 10 stops — minutes",a:"30"},{t:0,q:"Half of 10 stops",a:"5"},{t:0,q:"Two stops per room — rooms needed",a:"5"},
     {t:1,q:"Trail rule × 2 + 3 — stop 6 gives",a:"15"},{t:1,q:"That rule — stop 10 gives",a:"23"},{t:1,q:"10 stops at 4 minutes each — minutes",a:"40"},{t:1,q:"If 3 stops are outdoors, the percent indoors",a:"70"},{t:1,q:"Stops numbered 1 to 10 — their total",a:"55"},
     {t:2,q:"A trail rule × 3 + 1 — stop 12 gives",a:"37"},{t:2,q:"Ten stops, each worth 12 points — the total",a:"120"}
   ]},
  {id:"u8w4p2",w:4,label:"4.2",title:"Write the Problems",note:"Every stop gets a problem and a hidden answer key in your handwriting.",
   items:[
     {t:0,q:"23 × 14",a:"322"},{t:0,q:"372 ÷ 3",a:"124"},{t:0,q:"2 + 3 × 4",a:"14"},{t:2,q:"1/2 + 1/4 — type as a/b",a:"3/4"},{t:2,q:"$20 − $13.68",a:"6.32"},{t:0,q:"Perimeter of a 4 by 3 rectangle",a:"14"},
     {t:2,q:"Mean of 4, 7, 7, 9, 13",a:"8"},{t:1,q:"x + 17 = 42",a:"25"},{t:1,q:"Area 48, one side 6 — the other",a:"8"},{t:1,q:"GCF of 24 and 36",a:"12"},{t:1,q:"Round 4,829 to the nearest thousand",a:"5000"},
     {t:2,q:"2/3 + 3/4 — type as a/b",a:"17/12"},{t:2,q:"A machine × 4 + 3 — in 10 gives",a:"43"}
   ]},
  {id:"u8w4p3",w:4,label:"4.3",title:"Mom Walks It",note:"You mark her work. Any ambiguous question gets rewritten on the spot.",
   items:[
     {t:0,q:"10 stops, 8 correct — the percent",a:"80"},{t:0,q:"10 stops, 9 correct — the percent",a:"90"},{t:0,q:"10 stops, 10 correct — the percent",a:"100"},{t:0,q:"10 minus 7",a:"3"},{t:0,q:"Half of 10 stops",a:"5"},{t:0,q:"10 stops, 5 correct — the percent",a:"50"},
     {t:1,q:"She takes 4 minutes a stop — total minutes",a:"40"},{t:1,q:"Two stops rewritten out of 10 — the percent",a:"20"},{t:1,q:"85% of 10 stops — how many",a:"8.5"},{t:1,q:"If 9 of 10 are solvable, the percent that are not",a:"10"},{t:2,q:"A 40-minute walk over 10 stops — mean minutes per stop",a:"4"},
     {t:2,q:"12 points per stop, 10 stops, she scores 96 — the percent",a:"80"},{t:2,q:"To score 85% of 120 points, she needs",a:"102"}
   ]},
  {id:"u8w4p4",w:4,label:"Thu",title:"Year-End Sweep",note:"All eight error journals. Name the one habit that fixed itself.",
   items:[
     {t:0,q:"7 × 8",a:"56"},{t:0,q:"84 ÷ 12",a:"7"},{t:0,q:"2 + 3 × 4",a:"14"},{t:0,q:"1/2 of 20",a:"10"},{t:2,q:"0.25 + 0.25",a:"0.5"},{t:2,q:"Degrees in a right angle",a:"90"},
     {t:1,q:"38 × 24",a:"912"},{t:1,q:"618 ÷ 6",a:"103"},{t:2,q:"2/3 + 1/4 — type as a/b",a:"11/12"},{t:2,q:"Mean of 6, 8, 10, 12",a:"9"},{t:1,q:"3x = 21",a:"7"},
     {t:2,q:"Primes below 100 — how many",a:"25"},{t:2,q:"2x + 5 = 19",a:"7"}
   ]},
  {id:"u8w4p5",w:4,label:"Fri",title:"Mission 08 Test",note:"Twelve items plus the completed trail. Final trophy band awarded.",
   items:[
     {t:0,q:"3, 6, 9, 12 — next",a:"15"},{t:0,q:"n = 5. Value of 2n",a:"10"},
     {t:1,q:"2, 6, 18, 54 — next",a:"162"},{t:1,q:"A pattern from 5 adding 6 — its twelfth number",a:"71"},{t:1,q:"Machine × 5 + 3. In 8",a:"43"},{t:1,q:"Machine × 6 − 4 gives 32 — what went in",a:"6"},{t:1,q:"n = 9. Value of 4n + 7",a:"43"},{t:1,q:"a = 4, b = 6. Value of 3a + 2b",a:"24"},{t:1,q:"x − 26 = 19",a:"45"},{t:1,q:"9x = 108",a:"12"},
     {t:2,q:"2x + 5 = 19",a:"7"},{t:2,q:"A machine turns 5 into 23 and 8 into 35 — in 10 gives",a:"43"}
   ]}
];

const ALL_SETS = PRACTICE.concat(PRACTICE_U1_W2, PRACTICE_U1_W3, PRACTICE_U1_W4, PRACTICE_U1_W5,
  PRACTICE_U2_W2, PRACTICE_U2_W3, PRACTICE_U2_W4, PRACTICE_U2_W5,
  PRACTICE_U3_W2, PRACTICE_U3_W3, PRACTICE_U3_W4,
  PRACTICE_U4_W2, PRACTICE_U4_W3, PRACTICE_U4_W4, PRACTICE_U4_W5, PRACTICE_U4_W6,
  PRACTICE_U5_W2, PRACTICE_U5_W3, PRACTICE_U5_W4,
  PRACTICE_U6_W2, PRACTICE_U6_W3, PRACTICE_U6_W4, PRACTICE_U6_W5,
  PRACTICE_U7_W2, PRACTICE_U7_W3, PRACTICE_U7_W4, PRACTICE_U7_W5,
  PRACTICE_U8_W2, PRACTICE_U8_W3, PRACTICE_U8_W4,PRACTICE_U2, PRACTICE_U3, PRACTICE_U4, PRACTICE_U5, PRACTICE_U6, PRACTICE_U7, PRACTICE_U8);

const U = 13; // px per unit — every rectangle on the teaching stage is drawn to true area

const LESSONS = {
  p1:{title:"From dots to a rectangle",sub:"Why multiplication has a shape",steps:[
    {cap:"Six rows of seven dots. Count them if you like — 42.",dots:{r:6,c:7,split:7}},
    {cap:"Split the columns: five here, two there. That's 30 and 12. Still the same 42 dots — you only moved a line.",dots:{r:6,c:7,split:5},sum:"30 + 12 = 42"},
    {cap:"Now stop drawing dots. Draw the rectangle instead. 6 tall, 7 wide. The area IS the answer.",cols:[{l:"7",s:7}],rows:[{l:"6",s:6}],cells:[{v:"42"}]},
    {cap:"Try a bigger one: 4 × 13. You don't know 13s by heart, and you don't need to.",cols:[{l:"13",s:13}],rows:[{l:"4",s:4}],cells:[{v:"?"}]},
    {cap:"Cut 13 where it's easy — 10 and 3. Two rooms.",cols:[{l:"10",s:10},{l:"3",s:3}],rows:[{l:"4",s:4}],cells:[{v:""},{v:""}]},
    {cap:"The big room: 4 × 10 = 40.",cols:[{l:"10",s:10},{l:"3",s:3}],rows:[{l:"4",s:4}],cells:[{v:"40"},{v:""}]},
    {cap:"The small room: 4 × 3 = 12.",cols:[{l:"10",s:10},{l:"3",s:3}],rows:[{l:"4",s:4}],cells:[{v:"40"},{v:"12"}]},
    {cap:"Add the rooms. That's the whole method, and it never changes for the rest of the mission.",cols:[{l:"10",s:10},{l:"3",s:3}],rows:[{l:"4",s:4}],cells:[{v:"40"},{v:"12"}],sum:"4 × 13 = 40 + 12 = 52"}
  ]},
  p2:{title:"Breaking a number apart",sub:"One digit times two digits",steps:[
    {cap:"8 × 34. Nobody knows this by heart. You're not supposed to.",cols:[{l:"34",s:34}],rows:[{l:"8",s:8}],cells:[{v:"?"}]},
    {cap:"Cut 34 into tens and ones: 30 and 4.",cols:[{l:"30",s:30},{l:"4",s:4}],rows:[{l:"8",s:8}],cells:[{v:""},{v:""}]},
    {cap:"8 × 30 = 240. If you know 8 × 3 = 24, you already knew this one.",cols:[{l:"30",s:30},{l:"4",s:4}],rows:[{l:"8",s:8}],cells:[{v:"240"},{v:""}]},
    {cap:"8 × 4 = 32.",cols:[{l:"30",s:30},{l:"4",s:4}],rows:[{l:"8",s:8}],cells:[{v:"240"},{v:"32"}]},
    {cap:"Add them. A hard problem became two easy ones — that's the trade you're making.",cols:[{l:"30",s:30},{l:"4",s:4}],rows:[{l:"8",s:8}],cells:[{v:"240"},{v:"32"}],sum:"8 × 34 = 240 + 32 = 272"}
  ]},
  p3:{title:"Go past, then take back",sub:"Compensation in your head",steps:[
    {cap:"19 × 6. Nineteen is an awkward number to multiply by.",cols:[{l:"19",s:19}],rows:[{l:"6",s:6}],cells:[{v:"?"}]},
    {cap:"So don't. Pretend it's 20. 20 × 6 = 120, and that one is easy.",cols:[{l:"20",s:20}],rows:[{l:"6",s:6}],cells:[{v:"120"}]},
    {cap:"But look what you did — you added a column that was never there. That strip is 1 × 6 = 6.",cols:[{l:"19",s:19},{l:"1",s:1}],rows:[{l:"6",s:6}],cells:[{v:""},{v:"6"}],strip:true},
    {cap:"Take the strip back and you're done. This works any time a number sits just under a friendly one.",cols:[{l:"19",s:19},{l:"1",s:1}],rows:[{l:"6",s:6}],cells:[{v:"114"},{v:"6"}],strip:true,sum:"19 × 6 = 120 − 6 = 114"}
  ]},
  p4:{title:"Four rooms",sub:"Two digits times two digits",steps:[
    {cap:"23 × 14. This time both numbers are big.",cols:[{l:"23",s:23}],rows:[{l:"14",s:14}],cells:[{v:"?"}]},
    {cap:"Cut the width first: 20 and 3.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"14",s:14}],cells:[{v:""},{v:""}]},
    {cap:"Now cut the height too: 10 and 4. That makes four rooms. Always four — never three.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:""},{v:""},{v:""},{v:""}]},
    {cap:"20 × 10 = 200. The biggest room is the easiest one.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:""},{v:""},{v:""}]},
    {cap:"3 × 10 = 30.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:""},{v:""}]},
    {cap:"20 × 4 = 80.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:""}]},
    {cap:"3 × 4 = 12. That little corner is where almost every mistake in this unit hides.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}]},
    {cap:"Add all four. When you do this with the standard algorithm later, 92 is the two rooms next to the 4, and 230 is the two next to the 10. Same four pieces.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"23 × 14 = 200 + 30 + 80 + 12 = 322"}
  ]},
  p5:{title:"Every rectangle with area 36",sub:"Factors, drawn to true size",steps:[
    {cap:"Area 36, one row deep. Long and skinny — but it's a rectangle, so it counts. 1 × 36.",cols:[{l:"36",s:36}],rows:[{l:"1",s:1}],cells:[{v:"36"}]},
    {cap:"2 × 18. Watch the shape: it gets shorter and taller, but the area never changes.",cols:[{l:"18",s:18}],rows:[{l:"2",s:2}],cells:[{v:"36"}]},
    {cap:"3 × 12.",cols:[{l:"12",s:12}],rows:[{l:"3",s:3}],cells:[{v:"36"}]},
    {cap:"4 × 9.",cols:[{l:"9",s:9}],rows:[{l:"4",s:4}],cells:[{v:"36"}]},
    {cap:"6 × 6. A perfect square — and this is where the hunt stops.",cols:[{l:"6",s:6}],rows:[{l:"6",s:6}],cells:[{v:"36"}]},
    {cap:"Why stop? Because 9 × 4 is just 4 × 9 turned on its side. Past the square, every rectangle repeats one you already drew. That's why you only test up to the square root.",cols:[{l:"6",s:6}],rows:[{l:"6",s:6}],cells:[{v:"36"}],sum:"36 has 5 rectangles: 1×36, 2×18, 3×12, 4×9, 6×6"}
  ]}
};

const LESSONS_U2 = {
  u2p1:{title:"The rectangle with a side missing",sub:"Two questions, one picture",steps:[
    {cap:"Forty-two dots, dealt into six equal rows. How many land in each row? That question is division.",dots:{r:6,c:7,split:7}},
    {cap:"Same 42 dots, asked the other way: how many rows of seven can you make? Sharing and grouping are the same picture read twice.",dots:{r:6,c:7,split:7},sum:"42 ÷ 6 = 7   and   42 ÷ 7 = 6"},
    {cap:"Stop counting dots and draw the rectangle. You know the area and one side. Division hunts the other side.",cols:[{l:"7",s:7}],rows:[{l:"6",s:6}],cells:[{v:"42"}]},
    {cap:"Bigger one: 84 ÷ 4. Area 84, one side 4, and the width is what you're missing.",cols:[{l:"?",s:21}],rows:[{l:"4",s:4}],cells:[{v:"84"}]},
    {cap:"Cut the 84 where it's easy — 80 and 4.",cols:[{l:"?",s:20},{l:"?",s:1}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"4"}]},
    {cap:"80 ÷ 4 = 20. That piece of the width is 20 long.",cols:[{l:"20",s:20},{l:"?",s:1}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"4"}]},
    {cap:"4 ÷ 4 = 1. One more.",cols:[{l:"20",s:20},{l:"1",s:1}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"4"}]},
    {cap:"Add the widths, not the areas. That's the answer — and it's the same rectangle you built in Mission 01, run backwards.",cols:[{l:"20",s:20},{l:"1",s:1}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"4"}],sum:"84 ÷ 4 = 20 + 1 = 21"}
  ]},
  u2p2:{title:"Take the biggest chunk you can",sub:"Partial quotients",steps:[
    {cap:"156 ÷ 6. Nobody knows this one by heart, and you're not supposed to.",cols:[{l:"?",s:26}],rows:[{l:"6",s:6}],cells:[{v:"156"}]},
    {cap:"Grab a chunk you can do in your head: twenty sixes. That's 120, and it fits inside 156.",cols:[{l:"20",s:20},{l:"?",s:6}],rows:[{l:"6",s:6}],cells:[{v:"120"},{v:""}]},
    {cap:"156 − 120 = 36 still to place. It's a rectangle too, still 6 tall.",cols:[{l:"20",s:20},{l:"?",s:6}],rows:[{l:"6",s:6}],cells:[{v:"120"},{v:"36"}]},
    {cap:"36 ÷ 6 = 6. That last piece is six wide.",cols:[{l:"20",s:20},{l:"6",s:6}],rows:[{l:"6",s:6}],cells:[{v:"120"},{v:"36"}]},
    {cap:"Twenty sixes plus six sixes is twenty-six sixes. Chunk size is up to you — take small ones if you like, it just takes longer.",cols:[{l:"20",s:20},{l:"6",s:6}],rows:[{l:"6",s:6}],cells:[{v:"120"},{v:"36"}],sum:"156 ÷ 6 = 20 + 6 = 26"}
  ]},
  u2p3:{title:"The piece that won't fit",sub:"Where remainders come from",steps:[
    {cap:"94 ÷ 4. Start exactly the same way: how many fours fit inside 94?",cols:[{l:"?",s:23}],rows:[{l:"4",s:4}],cells:[{v:"94"}]},
    {cap:"Twenty fours is 80. Take that chunk out first.",cols:[{l:"20",s:20},{l:"?",s:4}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:""}]},
    {cap:"14 is left. Three more fours make 12 of it.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"12"}]},
    {cap:"And now 2 refuse to fit. They can't build a full column four tall — that dashed sliver is the remainder.",cols:[{l:"20",s:20},{l:"3",s:3},{l:"r2",s:1}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"12"},{v:"2"}],strip:true},
    {cap:"Twenty-three whole columns, 2 left over. The arithmetic is finished — what you do with those 2 is a separate decision.",cols:[{l:"20",s:20},{l:"3",s:3},{l:"r2",s:1}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"12"},{v:"2"}],strip:true,sum:"94 ÷ 4 = 23 remainder 2"}
  ]},
  u2p4:{title:"Where the long-division bar hides",sub:"Chunks, written tighter",steps:[
    {cap:"168 ÷ 7. The standard algorithm is these same chunks in a narrower space.",cols:[{l:"?",s:24}],rows:[{l:"7",s:7}],cells:[{v:"168"}]},
    {cap:"The algorithm asks: how many sevens in 16 tens? Two. Two tens of sevens is 140.",cols:[{l:"20",s:20},{l:"?",s:4}],rows:[{l:"7",s:7}],cells:[{v:"140"},{v:""}]},
    {cap:"Subtract: 168 − 140 = 28. That's the 'bring down' step, drawn instead of written.",cols:[{l:"20",s:20},{l:"?",s:4}],rows:[{l:"7",s:7}],cells:[{v:"140"},{v:"28"}]},
    {cap:"28 ÷ 7 = 4. That 4 goes in the ones place on top of the bar.",cols:[{l:"20",s:20},{l:"4",s:4}],rows:[{l:"7",s:7}],cells:[{v:"140"},{v:"28"}]},
    {cap:"The digits above the bar are just the widths of these rooms: 2 tens and 4 ones. Check it by multiplying back — 7 × 24 = 168.",cols:[{l:"20",s:20},{l:"4",s:4}],rows:[{l:"7",s:7}],cells:[{v:"140"},{v:"28"}],sum:"168 ÷ 7 = 20 + 4 = 24"}
  ]},
  u2p5:{title:"One division, three answers",sub:"Who decides what happens to the leftover",steps:[
    {cap:"26 and 6. Six goes in four times and 2 are left standing. So far this is just arithmetic.",cols:[{l:"4",s:4},{l:"r2",s:1}],rows:[{l:"6",s:6}],cells:[{v:"24"},{v:"2"}],strip:true},
    {cap:"Question one: 26 kids, vans that hold 6. Those 2 kids still need a ride, so you call a fifth van.",cols:[{l:"5",s:5}],rows:[{l:"6",s:6}],cells:[{v:"30"}],sum:"26 kids ÷ 6 seats = 5 vans"},
    {cap:"Question two: 26 cookies shared by 6 friends. Now the leftovers just sit on the plate.",cols:[{l:"4",s:4},{l:"r2",s:1}],rows:[{l:"6",s:6}],cells:[{v:"24"},{v:"2"}],strip:true,sum:"26 ÷ 6 = 4 whole cookies each, 2 spare"},
    {cap:"Question three: cut the leftovers up. Two cookies split six ways gives everyone a third more.",cols:[{l:"4",s:4},{l:"r2",s:1}],rows:[{l:"6",s:6}],cells:[{v:"24"},{v:"2"}],strip:true,sum:"26 ÷ 6 = 4 ⅓ each"},
    {cap:"Five, four, and four and a third — all correct, all from the same division. The arithmetic never decides. The question does.",cols:[{l:"4",s:4},{l:"r2",s:1}],rows:[{l:"6",s:6}],cells:[{v:"24"},{v:"2"}],strip:true,sum:"Who decides? The question does."}
  ]}
};

const LESSONS_U3 = {
  u3p1:{title:"Ten times bigger, every step",sub:"How the places are built",steps:[
    {cap:"One dot. Everything starts here.",dots:{r:1,c:1,split:1}},
    {cap:"Ten of them in a row. That's the first jump — and every jump after it is the same jump.",dots:{r:1,c:10,split:10}},
    {cap:"Ten rows of ten. A hundred, and you can take it in at a glance.",dots:{r:10,c:10,split:10},sum:"10 × 10 = 100"},
    {cap:"Draw it as a rectangle instead of dots. Ten by ten.",cols:[{l:"10",s:10}],rows:[{l:"10",s:10}],cells:[{v:"100"}]},
    {cap:"Lay ten hundreds side by side and you have a thousand. Same move again.",cols:[{l:"100",s:26}],rows:[{l:"10",s:10}],cells:[{v:"1,000"}]},
    {cap:"Do it four more times and you're at a million. Every place on the chart is ten of the place to its right — that one rule builds the whole system.",cols:[{l:"100",s:26}],rows:[{l:"10",s:10}],cells:[{v:"1,000"}],sum:"1 → 10 → 100 → 1,000 → 10,000 → 100,000 → 1,000,000"}
  ]},
  u3p2:{title:"What a digit is worth",sub:"Place, not face",steps:[
    {cap:"Take 3,472,861. The 4 in it is not four. Where it sits decides what it's worth.",cols:[{l:"100,000",s:22}],rows:[{l:"4",s:4}],cells:[{v:"400,000"}]},
    {cap:"Four lots of a hundred thousand. That's the whole meaning of the 4.",cols:[{l:"100,000",s:22}],rows:[{l:"4",s:4}],cells:[{v:"400,000"}],sum:"4 × 100,000 = 400,000"},
    {cap:"The 7 sits one place to the right, so it's worth a tenth as much each: seven ten-thousands.",cols:[{l:"10,000",s:16}],rows:[{l:"7",s:7}],cells:[{v:"70,000"}]},
    {cap:"And the 8, four places further right, is just eight hundreds.",cols:[{l:"100",s:8}],rows:[{l:"8",s:8}],cells:[{v:"800"}]},
    {cap:"Every digit is its own rectangle. Add all seven and the number comes back — that's what expanded form is.",cols:[{l:"100",s:8}],rows:[{l:"8",s:8}],cells:[{v:"800"}],sum:"3,000,000 + 400,000 + 70,000 + 2,000 + 800 + 60 + 1"}
  ]},
  u3p3:{title:"Rounding is picking the nearer end",sub:"And the question picks the ends",steps:[
    {cap:"47,382. Round it to the nearest thousand, so the two ends are 47,000 and 48,000.",cols:[{l:"?",s:21}],rows:[{l:"gap",s:6}],cells:[{v:"47,382"}]},
    {cap:"The trip down to 47,000 is 382. The trip up to 48,000 is 618. Down is shorter.",cols:[{l:"382 down",s:8},{l:"618 up",s:13}],rows:[{l:"gap",s:6}],cells:[{v:"382"},{v:"618"}]},
    {cap:"So it rounds down. Nothing about the number changed — you just picked the nearer end.",cols:[{l:"382 down",s:8},{l:"618 up",s:13}],rows:[{l:"gap",s:6}],cells:[{v:"382"},{v:"618"}],sum:"47,382 → 47,000"},
    {cap:"Same number, coarser question: nearest ten thousand. Now the ends are 40,000 and 50,000, and the gaps are completely different.",cols:[{l:"7,382 down",s:15},{l:"2,618 up",s:6}],rows:[{l:"gap",s:6}],cells:[{v:"7,382"},{v:"2,618"}]},
    {cap:"This time up is nearer. Same number, different answer — because rounding always answers the question you were asked, not the number you were given.",cols:[{l:"7,382 down",s:15},{l:"2,618 up",s:6}],rows:[{l:"gap",s:6}],cells:[{v:"7,382"},{v:"2,618"}],sum:"47,382 → 47,000 to the thousand, 50,000 to the ten thousand"}
  ]},
  u3p4:{title:"Why the rules exist",sub:"Groups first, loose things after",steps:[
    {cap:"5 + 3 × 4. Two people read it and get 32 and 17. They can't both be right, so somebody had to make a rule.",cols:[{l:"?",s:17}],rows:[{l:"1",s:4}],cells:[{v:"?"}]},
    {cap:"Look at what's actually there. 3 × 4 is a group — a rectangle, twelve.",cols:[{l:"4",s:4}],rows:[{l:"3",s:3}],cells:[{v:"12"}]},
    {cap:"The 5 was never part of that group. It's five loose ones sitting beside the rectangle.",cols:[{l:"4",s:4},{l:"5",s:5}],rows:[{l:"3",s:3}],cells:[{v:"12"},{v:"5"}],strip:true},
    {cap:"So you build the group, then add what's loose. Seventeen. That's the rule, and it isn't arbitrary — it matches the picture.",cols:[{l:"4",s:4},{l:"5",s:5}],rows:[{l:"3",s:3}],cells:[{v:"12"},{v:"5"}],strip:true,sum:"5 + 3 × 4 = 12 + 5 = 17"},
    {cap:"Brackets are how you say “no — do the adding first.” Now it's a genuinely different rectangle: eight rows of four.",cols:[{l:"4",s:4}],rows:[{l:"8",s:8}],cells:[{v:"32"}],sum:"(5 + 3) × 4 = 32"}
  ]},
  u3p5:{title:"Exponents are repeated rectangles",sub:"The little number counts copies",steps:[
    {cap:"2² is a square, two by two. Four.",cols:[{l:"2",s:2}],rows:[{l:"2",s:2}],cells:[{v:"4"}]},
    {cap:"3² is three by three. Nine. The raised 2 means “two copies multiplied” — it does not mean times two.",cols:[{l:"3",s:3}],rows:[{l:"3",s:3}],cells:[{v:"9"}]},
    {cap:"5² is twenty-five. Every square number you hunted in Mission 01 was secretly an exponent.",cols:[{l:"5",s:5}],rows:[{l:"5",s:5}],cells:[{v:"25"}]},
    {cap:"2³ has three copies, so it stops being a square. 2 × 2 × 2 — eight.",cols:[{l:"4",s:4}],rows:[{l:"2",s:2}],cells:[{v:"8"}],sum:"2³ = 2 × 2 × 2 = 8"},
    {cap:"And 10⁴ is the whole place-value chart written short: four tens multiplied, four zeros in the answer.",cols:[{l:"100",s:20}],rows:[{l:"100",s:20}],cells:[{v:"10,000"}],sum:"10⁴ = 10 × 10 × 10 × 10 = 10,000"}
  ]}
};

const LESSONS_U4 = {
  u4p1:{title:"One whole, cut up",sub:"What the two numbers actually say",steps:[
    {cap:"One whole. Call it a chocolate bar, a pizza, a metre of ribbon — the maths doesn't care which.",cols:[{l:"1",s:24}],rows:[{l:"whole",s:8}],cells:[{v:"1"}]},
    {cap:"Cut it into two equal pieces. Each one is a half. The bottom number of a fraction says how many pieces the whole was cut into.",cols:[{l:"1/2",s:12},{l:"1/2",s:12}],rows:[{l:"",s:8}],cells:[{v:"1/2"},{v:"1/2"}]},
    {cap:"Cut each half in two again. Four quarters — and two of them still cover exactly one half.",cols:[{l:"1/4",s:6},{l:"1/4",s:6},{l:"1/4",s:6},{l:"1/4",s:6}],rows:[{l:"",s:8}],cells:[{v:"1/4"},{v:"1/4"},{v:"1/4"},{v:"1/4"}],sum:"2/4 = 1/2"},
    {cap:"Keep going: eight eighths. The pieces get smaller as the bottom number gets bigger, which catches everybody out at first.",cols:[{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3}],rows:[{l:"1/8 each",s:8}],cells:[{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}]},
    {cap:"Take three of them. That's 3/8 — the top number counts the pieces you took.",cols:[{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3}],rows:[{l:"3/8",s:8}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:""},{v:""},{v:""},{v:""},{v:""}],sum:"3/8 — bottom cuts, top counts"}
  ]},
  u4p2:{title:"Same number, different clothes",sub:"Why equivalence works",steps:[
    {cap:"Here is one half of a whole, shaded.",cols:[{l:"1/2",s:12},{l:"",s:12}],rows:[{l:"",s:8}],cells:[{v:"1/2"},{v:""}]},
    {cap:"Cut every piece in two. Nothing moved and nothing was added — but the same shaded part is now called 2/4.",cols:[{l:"",s:6},{l:"",s:6},{l:"",s:6},{l:"",s:6}],rows:[{l:"2/4",s:8}],cells:[{v:"1/4"},{v:"1/4"},{v:""},{v:""}],sum:"1/2 = 2/4"},
    {cap:"Cut again. Same shaded part, twice as many pieces, and now it's 4/8.",cols:[{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3}],rows:[{l:"4/8",s:8}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:"4"},{v:""},{v:""},{v:""},{v:""}],sum:"1/2 = 2/4 = 4/8"},
    {cap:"That's all “multiply top and bottom by the same number” ever means: cut every piece the same way. The amount is untouched.",cols:[{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3}],rows:[{l:"4/8",s:8}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:"4"},{v:""},{v:""},{v:""},{v:""}],sum:"1/2 = 2/4 = 4/8 = 8/16 — one number, many names"}
  ]},
  u4p3:{title:"Which is bigger",sub:"Make the pieces match",steps:[
    {cap:"2/3 against 3/5. You can't tell by looking, because the pieces aren't the same size.",cols:[{l:"2/3",s:10},{l:"",s:5}],rows:[{l:"",s:6}],cells:[{v:"2/3"},{v:""}]},
    {cap:"Cut both into fifteenths — a piece size that thirds and fifths can both be built from.",cols:[{l:"10/15",s:10},{l:"",s:5}],rows:[{l:"",s:6}],cells:[{v:"10/15"},{v:""}]},
    {cap:"3/5 turns out to be nine of those same pieces.",cols:[{l:"9/15",s:9},{l:"",s:6}],rows:[{l:"",s:6}],cells:[{v:"9/15"},{v:""}]},
    {cap:"Ten pieces beats nine pieces, and now it's obvious. Finding a common denominator is nothing more than making the pieces the same size.",cols:[{l:"9/15",s:9},{l:"",s:6}],rows:[{l:"",s:6}],cells:[{v:"9/15"},{v:""}],sum:"2/3 = 10/15  >  9/15 = 3/5"}
  ]},
  u4p4:{title:"Adding needs matching pieces",sub:"Why you can't just add across",steps:[
    {cap:"1/2 + 1/4. You can't add halves to quarters — they're different-sized pieces.",cols:[{l:"1/2",s:12},{l:"1/4",s:6},{l:"",s:6}],rows:[{l:"",s:7}],cells:[{v:"1/2"},{v:"1/4"},{v:""}]},
    {cap:"So rename the half as quarters. Same amount of bar, different label: 2/4.",cols:[{l:"2/4",s:12},{l:"1/4",s:6},{l:"",s:6}],rows:[{l:"",s:7}],cells:[{v:"2/4"},{v:"1/4"},{v:""}]},
    {cap:"Now every piece is a quarter, so you can just count them. Three.",cols:[{l:"3/4",s:18},{l:"",s:6}],rows:[{l:"",s:7}],cells:[{v:"3/4"},{v:""}],sum:"1/2 + 1/4 = 2/4 + 1/4 = 3/4"},
    {cap:"Notice what never happened: the bottom number didn't get added. You were counting quarters the whole time, and quarters they stayed.",cols:[{l:"3/4",s:18},{l:"",s:6}],rows:[{l:"",s:7}],cells:[{v:"3/4"},{v:""}],sum:"Add the tops. The bottom is the unit, not a quantity."}
  ]},
  u4p5:{title:"A fraction of a set",sub:"Not one thing cut up — a group split up",steps:[
    {cap:"Twenty counters. This time it isn't one whole cut into pieces, it's a set of separate things.",dots:{r:5,c:4,split:4}},
    {cap:"1/4 of them means: split into four equal groups, then take one group. Five.",dots:{r:5,c:4,split:1},sum:"1/4 of 20 = 5"},
    {cap:"Thirty counters, and the question is 2/5 of them. The bottom number does the splitting: five groups of six.",dots:{r:6,c:5,split:5}},
    {cap:"The top number does the taking: two of those groups.",dots:{r:6,c:5,split:2},sum:"2/5 of 30 = 12"},
    {cap:"Divide by the bottom, multiply by the top. Always that order — and it works on counters, minutes and dollars alike.",dots:{r:6,c:5,split:2},sum:"30 ÷ 5 = 6, then 6 × 2 = 12"}
  ]}
};

const LESSONS_U5 = {
  u5p1:{title:"A decimal is a fraction",sub:"The places carry on past the point",steps:[
    {cap:"One whole bar, cut into ten equal strips. Each strip is a tenth, and you write it 0.1.",cols:[{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2}],rows:[{l:"tenths",s:7}],cells:[{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}]},
    {cap:"Shade three of them. Three tenths — you can write that 3/10, or you can write it 0.3.",cols:[{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2}],rows:[{l:"0.3",s:7}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}],sum:"3/10 = 0.3"},
    {cap:"Now cut every strip into ten again. A hundred little squares, and each one is a hundredth — 0.01.",dots:{r:10,c:10,split:10}},
    {cap:"Those same three tenths are now thirty of the little squares. Nothing moved; you only counted in a smaller unit.",dots:{r:10,c:10,split:3},sum:"0.3 = 3/10 = 30/100 = 0.30"},
    {cap:"And a half is fifty hundredths. This is why 0.5 and 0.50 are the same number — and why a decimal is never anything but a fraction.",dots:{r:10,c:10,split:5},sum:"1/2 = 0.5 = 50/100"}
  ]},
  u5p2:{title:"Where decimals sit",sub:"More digits does not mean bigger",steps:[
    {cap:"Between 0 and 1 there are ten tenths. 0.7 is seven of them along.",cols:[{l:"0.7",s:14},{l:"",s:6}],rows:[{l:"",s:6}],cells:[{v:"0.7"},{v:""}]},
    {cap:"0.65 is not on a tenth mark at all. It's six tenths and five hundredths — just past the sixth mark.",cols:[{l:"0.6",s:12},{l:"0.05",s:1},{l:"",s:7}],rows:[{l:"",s:6}],cells:[{v:"0.6"},{v:""},{v:""}]},
    {cap:"Now the trap: which is bigger, 0.4 or 0.35? It is not the one with more digits.",cols:[{l:"0.4",s:8},{l:"",s:12}],rows:[{l:"",s:6}],cells:[{v:"0.40"},{v:""}]},
    {cap:"Write 0.4 as 0.40 and the question answers itself — forty hundredths against thirty-five.",cols:[{l:"0.35",s:7},{l:"",s:13}],rows:[{l:"",s:6}],cells:[{v:"0.35"},{v:""}],sum:"0.40  >  0.35"}
  ]},
  u5p3:{title:"Money is decimals",sub:"A dollar is a hundred hundredths",steps:[
    {cap:"One dollar, drawn as a hundred squares. Each square is a cent — which is exactly what a hundredth is.",dots:{r:10,c:10,split:10}},
    {cap:"Fifty cents is half the squares: $0.50.",dots:{r:10,c:10,split:5},sum:"50¢ = $0.50 = 1/2 of a dollar"},
    {cap:"A quarter is twenty-five of them — a quarter of the dollar, which is where the name comes from.",cols:[{l:"25¢",s:5},{l:"",s:15}],rows:[{l:"$1",s:6}],cells:[{v:"0.25"},{v:""}]},
    {cap:"So $3.45 is three whole dollars plus forty-five hundredths of one more.",cols:[{l:"$3",s:15},{l:"45¢",s:3}],rows:[{l:"",s:6}],cells:[{v:"3.00"},{v:"0.45"}],sum:"$3.45 = 345 cents = 3 + 45/100"}
  ]},
  u5p4:{title:"Line up the points",sub:"Not the right-hand ends",steps:[
    {cap:"3.4 + 0.75. The instinct is to line up the right-hand ends of the numbers. That instinct is wrong.",cols:[{l:"3.4",s:17},{l:"0.75",s:4}],rows:[{l:"",s:6}],cells:[{v:"3.4"},{v:"0.75"}]},
    {cap:"Write 3.4 as 3.40 and the places match up: tenths under tenths, hundredths under hundredths.",cols:[{l:"3.40",s:17},{l:"0.75",s:4}],rows:[{l:"",s:6}],cells:[{v:"3.40"},{v:"0.75"}]},
    {cap:"Now it's ordinary adding. 3.40 + 0.75 = 4.15.",cols:[{l:"4.15",s:21}],rows:[{l:"",s:6}],cells:[{v:"4.15"}],sum:"3.40 + 0.75 = 4.15"},
    {cap:"Check it against an estimate: 3.4 is about 3 and 0.75 is about 1, so the answer should be near 4. It is. That check costs three seconds and catches nearly every slip.",cols:[{l:"4.15",s:21}],rows:[{l:"",s:6}],cells:[{v:"4.15"}],sum:"Estimate ≈ 4 · exact 4.15"}
  ]},
  u5p5:{title:"The change from twenty",sub:"Count up instead of borrowing",steps:[
    {cap:"You have $20.00 and you spend $13.75. The change is whatever is left of the bar.",cols:[{l:"$13.75",s:14},{l:"?",s:6}],rows:[{l:"$20",s:6}],cells:[{v:"13.75"},{v:"?"}]},
    {cap:"Don't subtract — count up. Twenty-five cents takes you from $13.75 to $14.00.",cols:[{l:"$13.75",s:14},{l:"25¢",s:1},{l:"",s:5}],rows:[{l:"",s:6}],cells:[{v:"13.75"},{v:"0.25"},{v:""}]},
    {cap:"Then six whole dollars takes you from $14 to $20.",cols:[{l:"$13.75",s:14},{l:"25¢",s:1},{l:"$6",s:5}],rows:[{l:"",s:6}],cells:[{v:"13.75"},{v:"0.25"},{v:"6.00"}]},
    {cap:"Add what you counted up: $6.25. No borrowing, no crossed-out zeros — and it's how every shopkeeper on earth does it.",cols:[{l:"$13.75",s:14},{l:"25¢",s:1},{l:"$6",s:5}],rows:[{l:"",s:6}],cells:[{v:"13.75"},{v:"0.25"},{v:"6.00"}],sum:"$20.00 − $13.75 = $6.25"}
  ]}
};

const LESSONS_U6 = {
  u6p1:{title:"An angle is an amount of turn",sub:"Not a corner — a rotation",steps:[
    {cap:"Start facing along the bottom edge. A quarter turn brings you to the side edge — that turn is a right angle, 90°.",cols:[{l:"90°",s:10}],rows:[{l:"",s:10}],cells:[{v:"90"}]},
    {cap:"Two quarter turns face you the opposite way. That's a straight line: 180°.",cols:[{l:"90°",s:10},{l:"90°",s:10}],rows:[{l:"",s:10}],cells:[{v:"90"},{v:"90"}],sum:"90 + 90 = 180"},
    {cap:"Four of them bring you back where you started. All the way round is 360°.",cols:[{l:"90°",s:10},{l:"90°",s:10}],rows:[{l:"90°",s:10},{l:"90°",s:10}],cells:[{v:"90"},{v:"90"},{v:"90"},{v:"90"}],sum:"4 × 90 = 360"},
    {cap:"So if one angle on a straight line is 130°, the other has to be whatever fills the gap.",cols:[{l:"130°",s:13},{l:"?",s:7}],rows:[{l:"",s:8}],cells:[{v:"130"},{v:"?"}]},
    {cap:"Fifty degrees. You never measured it — you worked it out, which is faster and more reliable than any protractor.",cols:[{l:"130°",s:13},{l:"50°",s:7}],rows:[{l:"",s:8}],cells:[{v:"130"},{v:"50"}],sum:"180 − 130 = 50"}
  ]},
  u6p2:{title:"Same fence, different grass",sub:"Why perimeter doesn't fix area",steps:[
    {cap:"Twenty-four metres of fence. Make it 1 metre deep and it stretches 11 long — a very thin field.",cols:[{l:"11",s:22}],rows:[{l:"1",s:2}],cells:[{v:"11"}]},
    {cap:"Same 24 metres of fence, now 2 deep and 10 long. The fence didn't change. The grass doubled.",cols:[{l:"10",s:20}],rows:[{l:"2",s:4}],cells:[{v:"20"}]},
    {cap:"4 by 8. Still 24 metres of fence, and now 32 square metres inside.",cols:[{l:"8",s:16}],rows:[{l:"4",s:8}],cells:[{v:"32"}]},
    {cap:"6 by 6. The most grass you can get from 24 metres of fence — and it's the square, every time.",cols:[{l:"6",s:12}],rows:[{l:"6",s:12}],cells:[{v:"36"}]},
    {cap:"Perimeter and area are two different measurements. One is the edge, the other is the inside, and knowing one never tells you the other.",cols:[{l:"6",s:12}],rows:[{l:"6",s:12}],cells:[{v:"36"}],sum:"Perimeter 24 → area 11, 20, 32 or 36"}
  ]},
  u6p3:{title:"Points get addresses",sub:"Across first, then up",steps:[
    {cap:"A grid with numbered edges. Every square has an address, and the order of the two numbers is the whole trick.",dots:{r:8,c:8,split:8}},
    {cap:"(3, 5) means three across, then five up. Count along the bottom before you count anywhere else.",dots:{r:8,c:8,split:3}},
    {cap:"(5, 3) is a completely different square — five across, three up. Same digits, different place.",dots:{r:8,c:8,split:5}},
    {cap:"Plot four points and you have a shape. From (1,1) to (6,1) is five across; from (1,1) to (1,4) is three up.",cols:[{l:"5",s:10}],rows:[{l:"3",s:6}],cells:[{v:"15"}]},
    {cap:"And now the grid gives you the side lengths for free — so perimeter and area come straight off the coordinates.",cols:[{l:"5",s:10}],rows:[{l:"3",s:6}],cells:[{v:"15"}],sum:"Perimeter 16 · area 15"}
  ]},
  u6p4:{title:"Fold it and see",sub:"Lines of symmetry",steps:[
    {cap:"A rectangle. Fold it down the middle, top to bottom — the halves match, so that's a line of symmetry.",cols:[{l:"",s:14}],rows:[{l:"",s:4},{l:"",s:4}],cells:[{v:"top"},{v:"bottom"}]},
    {cap:"Fold it the other way, side to side. Also matches. That's two lines.",cols:[{l:"",s:7},{l:"",s:7}],rows:[{l:"",s:8}],cells:[{v:"left"},{v:"right"}],sum:"A rectangle has 2 lines of symmetry"},
    {cap:"Now try folding corner to corner. On a rectangle the halves don't match — so a diagonal fold is not a line of symmetry.",cols:[{l:"",s:14}],rows:[{l:"",s:8}],cells:[{v:"no match"}]},
    {cap:"On a square, the corner folds do match, because all four sides are the same length. That's why a square has four lines and a rectangle only two.",cols:[{l:"",s:5},{l:"",s:5}],rows:[{l:"",s:5},{l:"",s:5}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:"4"}],sum:"A square has 4 lines of symmetry"}
  ]},
  u6p5:{title:"Reading a map by numbers",sub:"Coordinates as directions",steps:[
    {cap:"An eight-by-eight sea. Your harbour is at (2, 2).",dots:{r:8,c:8,split:2}},
    {cap:"Sail to (6, 2): four squares across, none up. Distance is just the difference in the first number.",dots:{r:8,c:8,split:6},sum:"6 − 2 = 4 squares"},
    {cap:"Then to (6, 7): five up, none across. The second number does the work this time.",cols:[{l:"",s:4}],rows:[{l:"5",s:10}],cells:[{v:"5 up"}]},
    {cap:"Two legs, nine squares of sailing, and the whole route written as three pairs of numbers. No landmarks needed — that's the point of a coordinate system.",cols:[{l:"",s:4}],rows:[{l:"5",s:10}],cells:[{v:"5 up"}],sum:"(2,2) → (6,2) → (6,7) · 4 + 5 = 9 squares"}
  ]}
};

const LESSONS_U7 = {
  u7p1:{title:"A graph is a picture of a count",sub:"Read the scale first",steps:[
    {cap:"Twelve books on Monday, nine on Tuesday. Written down like this it's just two numbers.",cols:[{l:"Mon",s:12},{l:"Tue",s:9}],rows:[{l:"",s:2}],cells:[{v:"12"},{v:"9"}]},
    {cap:"Drawn to scale, the difference is something you see before you read anything.",cols:[{l:"Mon",s:12},{l:"Tue",s:9},{l:"Wed",s:15}],rows:[{l:"",s:2}],cells:[{v:"12"},{v:"9"},{v:"15"}]},
    {cap:"Three days, thirty-six books. The total is the whole graph added up.",cols:[{l:"Mon",s:12},{l:"Tue",s:9},{l:"Wed",s:15}],rows:[{l:"",s:2}],cells:[{v:"12"},{v:"9"},{v:"15"}],sum:"12 + 9 + 15 = 36 books"},
    {cap:"Level the three bars off and each day holds twelve. That levelling is exactly what the mean is.",cols:[{l:"Mean",s:12},{l:"Mean",s:12},{l:"Mean",s:12}],rows:[{l:"",s:2}],cells:[{v:"12"},{v:"12"},{v:"12"}],sum:"36 ÷ 3 = 12 a day"}
  ]},
  u7p2:{title:"Four measures, one set",sub:"Mean, median, mode, range",steps:[
    {cap:"Five numbers: 4, 7, 7, 9, 13. Already in order, which makes three of the four easy.",cols:[{l:"4",s:4},{l:"7",s:7},{l:"7",s:7},{l:"9",s:9}],rows:[{l:"",s:2}],cells:[{v:"4"},{v:"7"},{v:"7"},{v:"9"}]},
    {cap:"The median is the one in the middle of the line — the third of five. That's 7.",cols:[{l:"4",s:4},{l:"7",s:7},{l:"7",s:7},{l:"9",s:9}],rows:[{l:"",s:2}],cells:[{v:""},{v:""},{v:"med"},{v:""}],sum:"Median = 7"},
    {cap:"The mode is the value that shows up most. Seven appears twice, everything else once.",cols:[{l:"7",s:7},{l:"7",s:7}],rows:[{l:"",s:2}],cells:[{v:"7"},{v:"7"}],sum:"Mode = 7"},
    {cap:"The range is the whole width: biggest take smallest. It measures spread, not centre.",cols:[{l:"4",s:4},{l:"gap 9",s:9}],rows:[{l:"",s:2}],cells:[{v:"4"},{v:"→13"}],sum:"13 − 4 = 9"},
    {cap:"And the mean levels all five off: forty shared five ways.",cols:[{l:"8",s:8},{l:"8",s:8},{l:"8",s:8}],rows:[{l:"",s:2}],cells:[{v:"8"},{v:"8"},{v:"8"}],sum:"40 ÷ 5 = 8"}
  ]},
  u7p3:{title:"One number moves the mean",sub:"Why an average can lie",steps:[
    {cap:"Four people, two each. Mean two, median two, and both describe everybody honestly.",cols:[{l:"2",s:2},{l:"2",s:2},{l:"2",s:2},{l:"2",s:2}],rows:[{l:"",s:2}],cells:[{v:"2"},{v:"2"},{v:"2"},{v:"2"}],sum:"Mean 2 · Median 2"},
    {cap:"Now a fifth person arrives with twelve. Nobody else changed.",cols:[{l:"2",s:2},{l:"2",s:2},{l:"2",s:2},{l:"2",s:2},{l:"12",s:12}],rows:[{l:"",s:2}],cells:[{v:"2"},{v:"2"},{v:"2"},{v:"2"},{v:"12"}],sum:"Total 20"},
    {cap:"The mean jumps to four — and four describes not one single person in the room.",cols:[{l:"4",s:4},{l:"4",s:4},{l:"4",s:4},{l:"4",s:4},{l:"4",s:4}],rows:[{l:"",s:2}],cells:[{v:"4"},{v:"4"},{v:"4"},{v:"4"},{v:"4"}],sum:"20 ÷ 5 = 4"},
    {cap:"The median stayed at two, because the middle of the line didn't move. That's the answer to the Big Question.",cols:[{l:"2",s:2},{l:"2",s:2},{l:"2",s:2}],rows:[{l:"",s:2}],cells:[{v:""},{v:"med"},{v:""}],sum:"Median still 2"}
  ]},
  u7p4:{title:"Chance is a count",sub:"Out of the total, every time",steps:[
    {cap:"A bag with eight counters. Three of them red.",dots:{r:2,c:4,split:3}},
    {cap:"The chance of drawing red is three out of eight — the count you want over the count there is.",dots:{r:2,c:4,split:3},sum:"3 out of 8"},
    {cap:"Draw forty times, replacing each one. Forty is five eights, so expect five threes of red.",dots:{r:2,c:4,split:3},sum:"5 × 3 = 15 reds expected"},
    {cap:"Expected is not promised. Roll it for real and you'll get near fifteen, rarely exactly fifteen — and that gap is the whole point of Friday.",dots:{r:2,c:4,split:2}}
  ]},
  u7p5:{title:"Predict, then find out",sub:"Fifty trials",steps:[
    {cap:"One die, fifty rolls. Six outcomes, each as likely as the others.",dots:{r:1,c:6,split:1}},
    {cap:"Fifty divided by six is eight, with two left over. So predict about eight sixes.",dots:{r:1,c:6,split:1},sum:"50 ÷ 6 ≈ 8"},
    {cap:"Write the prediction down before rolling. A prediction you can change afterwards isn't a prediction.",dots:{r:2,c:4,split:8}},
    {cap:"Then roll, tally, and compare. If you got fourteen, the die isn't broken and neither is the maths — fifty trials is simply a small number.",dots:{r:2,c:7,split:14},sum:"Predicted 8 · Rolled 14"}
  ]}
};

const LESSONS_U8 = {
  u8p1:{title:"A pattern is a rule with a name",sub:"Say it in one sentence",steps:[
    {cap:"4, 9, 14, 19. Four numbers, and the gap between each pair is the same.",cols:[{l:"4",s:4},{l:"+5",s:5},{l:"+5",s:5},{l:"+5",s:5}],rows:[{l:"",s:2}],cells:[{v:"4"},{v:"9"},{v:"14"},{v:"19"}]},
    {cap:"The rule is 'add five'. Naming it means you never have to count the pattern out again.",cols:[{l:"4",s:4},{l:"+5",s:5},{l:"+5",s:5},{l:"+5",s:5}],rows:[{l:"",s:2}],cells:[{v:"4"},{v:"9"},{v:"14"},{v:"19"}],sum:"Start 4, add 5"},
    {cap:"To reach the tenth number you add five nine times — not ten, because the first number is already there.",cols:[{l:"4",s:4},{l:"9 × 5",s:22}],rows:[{l:"",s:2}],cells:[{v:"4"},{v:"45"}],sum:"4 + 45 = 49"},
    {cap:"Which is the whole trick of this mission: a rule gets you to the hundredth term without writing the first ninety-nine.",cols:[{l:"4",s:4},{l:"99 × 5",s:22}],rows:[{l:"",s:2}],cells:[{v:"4"},{v:"495"}],sum:"The 100th number is 499"}
  ]},
  u8p2:{title:"The machine, opened up",sub:"In, rule, out",steps:[
    {cap:"A machine with the rule × 3 + 1. Put in one and three ones come out, plus the extra.",cols:[{l:"in 1",s:3},{l:"+1",s:1}],rows:[{l:"",s:3}],cells:[{v:"3"},{v:"1"}],sum:"out 4"},
    {cap:"Put in two. The three grows, the one does not — that's the difference between the parts.",cols:[{l:"in 2",s:6},{l:"+1",s:1}],rows:[{l:"",s:3}],cells:[{v:"6"},{v:"1"}],sum:"out 7"},
    {cap:"Put in three. Each new input adds another three to the output, always.",cols:[{l:"in 3",s:9},{l:"+1",s:1}],rows:[{l:"",s:3}],cells:[{v:"9"},{v:"1"}],sum:"out 10"},
    {cap:"So going backwards, take the one off first and then divide by three. Undo in the opposite order you did.",cols:[{l:"out 22",s:21},{l:"−1",s:1}],rows:[{l:"",s:3}],cells:[{v:"21"},{v:"1"}],sum:"21 ÷ 3 = in 7"}
  ]},
  u8p3:{title:"The letter holds a seat",sub:"3n means three of them",steps:[
    {cap:"n is one block of unknown size. You don't know it yet, and you don't need to.",cols:[{l:"n",s:5}],rows:[{l:"",s:3}],cells:[{v:"n"}]},
    {cap:"3n is three of those blocks, side by side. Not the digit three next to a letter.",cols:[{l:"n",s:5},{l:"n",s:5},{l:"n",s:5}],rows:[{l:"",s:3}],cells:[{v:"n"},{v:"n"},{v:"n"}],sum:"3n"},
    {cap:"3n + 2 puts two single units on the end. They stay two whatever n turns out to be.",cols:[{l:"n",s:5},{l:"n",s:5},{l:"n",s:5},{l:"2",s:2}],rows:[{l:"",s:3}],cells:[{v:"n"},{v:"n"},{v:"n"},{v:"2"}],sum:"3n + 2"},
    {cap:"Now say n is five. Every block becomes a five and the expression collapses into a number.",cols:[{l:"5",s:5},{l:"5",s:5},{l:"5",s:5},{l:"2",s:2}],rows:[{l:"",s:3}],cells:[{v:"5"},{v:"5"},{v:"5"},{v:"2"}],sum:"3 × 5 + 2 = 17"}
  ]},
  u8p4:{title:"Keep the scales level",sub:"Whatever you do to one side",steps:[
    {cap:"x + 7 = 19. The left side and the right side weigh the same — that's what the equals sign claims.",cols:[{l:"x",s:12},{l:"7",s:7}],rows:[{l:"",s:3}],cells:[{v:"x"},{v:"7"}],sum:"= 19"},
    {cap:"Take seven off the left. Now it's lighter, and the claim is false.",cols:[{l:"x",s:12}],rows:[{l:"",s:3}],cells:[{v:"x"}],sum:"≠ 19"},
    {cap:"So take seven off the right too. Both sides changed by the same amount, so they still balance.",cols:[{l:"x",s:12}],rows:[{l:"",s:3}],cells:[{v:"x"}],sum:"x = 19 − 7 = 12"},
    {cap:"Check it by putting twelve back in. Twelve and seven is nineteen, so the answer marks itself.",cols:[{l:"12",s:12},{l:"7",s:7}],rows:[{l:"",s:3}],cells:[{v:"12"},{v:"7"}],sum:"12 + 7 = 19 ✓"}
  ]},
  u8p5:{title:"Cracking a rule in five inputs",sub:"Guess My Rule, played well",steps:[
    {cap:"Ask for one first. Whatever comes out tells you the multiplier and the add, tangled together.",cols:[{l:"in 1",s:4},{l:"+3",s:3}],rows:[{l:"",s:3}],cells:[{v:"4"},{v:"3"}],sum:"out 7"},
    {cap:"Then ask for two. The jump from one input to the next is the multiplier, on its own.",cols:[{l:"in 2",s:8},{l:"+3",s:3}],rows:[{l:"",s:3}],cells:[{v:"8"},{v:"3"}],sum:"out 11 · jumped 4"},
    {cap:"Four each step, so the rule multiplies by four. Now find the add: four ones is four, and seven came out, so three got added.",cols:[{l:"× 4",s:16},{l:"+3",s:3}],rows:[{l:"",s:3}],cells:[{v:"× 4"},{v:"+ 3"}],sum:"y = 4x + 3"},
    {cap:"Test it on a number you haven't asked about. If it predicts right, you've cracked it — that's two inputs used and three spare.",cols:[{l:"in 10",s:20},{l:"+3",s:3}],rows:[{l:"",s:3}],cells:[{v:"40"},{v:"3"}],sum:"out 43 ✓"}
  ]}
};

/* ── Year Two walkthroughs ───────────────────────────────────────────────
 * Same step grammar as Year One: an area/rectangle stage drawn to true
 * size, one caption per step. Keyed by Year Two set id (y5uNpN).           */
const LESSONS_WEEKLY = {
 u7w4:{title:"Measure it, do not guess it",sub:"Week 4 · length, volume and mass",steps:[
  {cap:"A ruler is a number line you can hold. The long marks are whole inches; the mark halfway between two of them is a half inch."},
  {cap:"Between those, the shorter marks cut each half in two again — quarter inches. Four quarters in every whole inch, which is why 3 and a quarter inches is 13 quarter inches."},
  {cap:"Volume is the same idea in a jug. A litre is 1000 millilitres, so a 250 ml cup fills it four times. Pour it once and you will not forget it."},
  {cap:"Mass works the same way on a balance: 1000 grams in a kilogram. Four 250 g packets balance one bag of flour."},
  {cap:"The unit is part of the answer. 500 on its own means nothing — 500 ml is half a litre, 500 g is half a kilogram."}]},
 u7w5:{title:"Time is a number line that wraps",sub:"Week 5 · clocks and elapsed time",steps:[
  {cap:"The minute hand moves 5 minutes for every number on the face. Pointing at 4 means 20 minutes past, not 4 minutes past."},
  {cap:"Quarter past is 15, half past is 30, quarter to is 45. Those three come up more than any others, so they are worth knowing without counting."},
  {cap:"Elapsed time is a subtraction with a wrap in it. From half past 1 to half past 4 is 3 whole hours — count the hours, then the minutes."},
  {cap:"When the minutes cross 60 the hour changes: 50 minutes past plus 20 more is 10 past the NEXT hour, not 70 past this one."},
  {cap:"Estimate first. A lesson does not last 5 minutes and it does not last 5 hours, so an answer outside that is wrong before you check it."}]},
 u1w2:{title:"The algorithm is the rooms",sub:"Week 2 · written multiplication",steps:[
  {cap:"23 × 14 as four rooms. You built this picture last week.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"200+30+80+12 = 322"},
  {cap:"The written algorithm adds the same rooms in a different order. The row '92' is the two rooms beside the 4: 80 + 12.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"4",s:4}],cells:[{v:"80"},{v:"12"}],sum:"45 × 4 row → 92"},
  {cap:"The row '230' is the two rooms beside the 10: 200 + 30. That is why it shifts left — it is a tens row.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10}],cells:[{v:"200"},{v:"30"}],sum:"× 10 row → 230"},
  {cap:"Every line of the written method is a room from the picture. When a line looks wrong, find its room.",cols:[{l:"92",s:9},{l:"230",s:14}],rows:[{l:"",s:5}],cells:[{v:"ones"},{v:"tens"}],sum:"92 + 230 = 322 — same four rooms"}]},
 u1w3:{title:"Factor pairs are rectangles",sub:"Week 3 · factors",steps:[
  {cap:"Area 24, one row deep: 1 × 24. The first factor pair.",cols:[{l:"24",s:24}],rows:[{l:"1",s:1}],cells:[{v:"24"}]},
  {cap:"2 × 12, then 3 × 8, then 4 × 6. Shorter and taller each time, area never changing.",cols:[{l:"6",s:6}],rows:[{l:"4",s:4}],cells:[{v:"24"}],sum:"1×24 · 2×12 · 3×8 · 4×6"},
  {cap:"Past the square root the rectangles repeat, turned on their side — 6 × 4 is 4 × 6 again. So the hunt stops there.",cols:[{l:"4",s:4}],rows:[{l:"6",s:6}],cells:[{v:"24"}],sum:"Test up to the square root, then stop"},
  {cap:"A common factor of 24 and 36 is a height that tiles both: 12 works for each, and nothing taller does.",cols:[{l:"2",s:2},{l:"3",s:3}],rows:[{l:"12",s:12}],cells:[{v:"24"},{v:"36"}],sum:"GCF(24, 36) = 12"}]},
 u1w4:{title:"Primes are skinny rectangles",sub:"Week 4 · multiples and primes",steps:[
  {cap:"The multiples of 6 are the areas its rectangles can reach: 6, 12, 18, 24… one more row each time.",cols:[{l:"6",s:6}],rows:[{l:"4",s:4}],cells:[{v:"24"}],sum:"6, 12, 18, 24, …"},
  {cap:"Try to draw 7 as a rectangle. Only 1 × 7 works — no other shape exists. That is what prime means.",cols:[{l:"7",s:7}],rows:[{l:"1",s:1}],cells:[{v:"7"}],sum:"Prime: exactly one rectangle"},
  {cap:"12 is composite — it breaks all the way down to 2 × 2 × 3, primes you cannot split further.",cols:[{l:"2",s:2},{l:"2",s:2},{l:"3",s:3}],rows:[{l:"",s:3}],cells:[{v:"2"},{v:"2"},{v:"3"}],sum:"12 = 2 × 2 × 3"},
  {cap:"Every composite number is built from primes exactly one way. Primes are the atoms of multiplication.",cols:[{l:"primes",s:12}],rows:[{l:"",s:4}],cells:[{v:"atoms"}],sum:"The factor tree always lands on the same primes"}]},
 u1w5:{title:"Working the method backwards",sub:"Week 5 · proof week",steps:[
  {cap:"A missing-digit puzzle: 6 × 4▢ = 276. Work from what the rooms must add to.",cols:[{l:"40",s:20},{l:"?",s:3}],rows:[{l:"6",s:6}],cells:[{v:"240"},{v:"?"}]},
  {cap:"The tens room gives 240, so the ones room owes 36. What times 6 makes 36? Six.",cols:[{l:"40",s:20},{l:"6",s:3}],rows:[{l:"6",s:6}],cells:[{v:"240"},{v:"36"}],sum:"6 × 46 = 276"},
  {cap:"Reversing the method is the test of owning it. This week you defend the blueprint out loud — the explanation is the mission.",cols:[{l:"46",s:23}],rows:[{l:"6",s:6}],cells:[{v:"276"}],sum:"Forwards, backwards, explained"}]},
 u2w2:{title:"What the leftover means",sub:"Week 2 · remainders",steps:[
  {cap:"50 ÷ 8. Six rows of eight fit, and two are left over.",cols:[{l:"6",s:18},{l:"2",s:2}],rows:[{l:"8",s:8}],cells:[{v:"48"},{v:"2"}],sum:"50 ÷ 8 = 6 r 2"},
  {cap:"50 kids, cars hold 8: six cars leave two standing, so SEVEN cars. Round up.",cols:[{l:"7 cars",s:21}],rows:[{l:"8",s:8}],cells:[{v:"56"}],sum:"People → round up"},
  {cap:"50 cookies, bags of 8: only full bags count. SIX bags, two cookies loose. Round down.",cols:[{l:"6 bags",s:18},{l:"2",s:2}],rows:[{l:"8",s:8}],cells:[{v:"48"},{v:"2"}],sum:"Full bags → round down"},
  {cap:"Same division, different answers. The maths gives the number; the situation decides what to do with the leftover.",cols:[{l:"6 r 2",s:20}],rows:[{l:"",s:5}],cells:[{v:"?"}],sum:"The question picks the answer"}]},
 u2w3:{title:"Under the bar",sub:"Week 3 · the written method",steps:[
  {cap:"372 ÷ 3 as a rectangle: area 372, height 3, width unknown.",cols:[{l:"?",s:24}],rows:[{l:"3",s:3}],cells:[{v:"372"}]},
  {cap:"Peel off the biggest easy chunk: 3 × 100 = 300. Then 3 × 20 = 60. Then 3 × 4 = 12.",cols:[{l:"100",s:17},{l:"20",s:4},{l:"4",s:2}],rows:[{l:"3",s:3}],cells:[{v:"300"},{v:"60"},{v:"12"}],sum:"100 + 20 + 4 = 124"},
  {cap:"Long division writes those chunks one place at a time. When a place contributes nothing, a zero holds its seat — that is the digit people drop.",cols:[{l:"103",s:21}],rows:[{l:"6",s:6}],cells:[{v:"618"}],sum:"618 ÷ 6 = 103, not 13"},
  {cap:"Multiply back to check: 103 × 6 = 618. Division always hands you the check for free.",cols:[{l:"check",s:21}],rows:[{l:"",s:4}],cells:[{v:"✓"}],sum:"Quotient × divisor = what you started with"}]},
 u2w4:{title:"Divisibility without dividing",sub:"Week 4 · the tests",steps:[
  {cap:"Ends in 0, 2, 4, 6 or 8 → divisible by 2. Ends in 0 or 5 → by 5. The last digit does all the work.",cols:[{l:"last digit",s:14}],rows:[{l:"",s:4}],cells:[{v:"2, 5, 10"}]},
  {cap:"For 3 and 9, add the digits. 741 → 7+4+1 = 12 → divisible by 3, not by 9.",cols:[{l:"7",s:7},{l:"4",s:4},{l:"1",s:1}],rows:[{l:"",s:4}],cells:[{v:"7"},{v:"4"},{v:"1"}],sum:"Digit sum 12 → ÷ 3 yes, ÷ 9 no"},
  {cap:"Why it works: 100 is one more than 99, so every hundred leaves 1 behind when you share by 9. Only the digits' own sum is ever at risk.",cols:[{l:"99",s:18},{l:"1",s:2}],rows:[{l:"",s:4}],cells:[{v:"÷9 clean"},{v:"left"}],sum:"Each place drops its 9s"},
  {cap:"The tests let you spot a factor before committing to the division — estimation's little sibling.",cols:[{l:"spot first",s:20}],rows:[{l:"",s:4}],cells:[{v:"then divide"}],sum:"Check the digits before the work"}]},
 u2w5:{title:"Division, defended",sub:"Week 5 · proof week",steps:[
  {cap:"Missing digit: 6▢ ÷ 4 = 17. Work backwards: 17 × 4 = 68.",cols:[{l:"17",s:17}],rows:[{l:"4",s:4}],cells:[{v:"68"}],sum:"▢ = 8"},
  {cap:"This week's snack run turns remainders into decisions — six per car or full bags only — and you defend each rounding out loud.",cols:[{l:"up",s:10},{l:"down",s:10}],rows:[{l:"",s:5}],cells:[{v:"cars"},{v:"bags"}],sum:"Every remainder gets a reason"},
  {cap:"The test closes the mission: divide, check by multiplying, and say what the leftover means. All three, every time.",cols:[{l:"÷",s:7},{l:"×",s:7},{l:"r",s:7}],rows:[{l:"",s:4}],cells:[{v:"do"},{v:"check"},{v:"explain"}],sum:"The full habit"}]},
 u3w2:{title:"Rounding is a place decision",sub:"Week 2 · estimation",steps:[
  {cap:"4,829 — round it to the nearest thousand. Find the place, then look one door to its right.",cols:[{l:"4",s:12},{l:"8",s:8},{l:"2",s:3},{l:"9",s:1}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:"8"},{v:"2"},{v:"9"}]},
  {cap:"The 8 next door says round up: 5,000. Rounding to the nearest hundred instead gives 4,800 — both right, different questions.",cols:[{l:"5000",s:15},{l:"4800",s:9}],rows:[{l:"",s:4}],cells:[{v:"thousand"},{v:"hundred"}],sum:"Name the place before you round"},
  {cap:"An estimate is a deliberate rounding: 4,829 + 3,164 ≈ 5,000 + 3,000 = 8,000. Close enough to catch a wild answer.",cols:[{l:"5000",s:13},{l:"3000",s:8}],rows:[{l:"",s:4}],cells:[{v:"+"},{v:"=8000"}],sum:"True answer 7,993 — the net held"},
  {cap:"How wrong was it? 7 out of 8,000 — tiny. Estimates are cheap, and the size of their error is itself worth knowing.",cols:[{l:"error",s:2},{l:"",s:20}],rows:[{l:"",s:4}],cells:[{v:"7"},{v:""}],sum:"Rough in, close out"}]},
 u3w3:{title:"Why order matters",sub:"Week 3 · operations",steps:[
  {cap:"2 + 3 × 4. Left to right gives 20. But × binds tighter than + — the multiplication is a package.",cols:[{l:"3×4",s:12},{l:"+2",s:2}],rows:[{l:"",s:4}],cells:[{v:"12"},{v:"2"}],sum:"2 + 3 × 4 = 14, not 20"},
  {cap:"Draw it: three fours is a rectangle, the +2 is loose squares. You cannot pour the 2 into the rectangle before it is built.",cols:[{l:"4",s:4},{l:"4",s:4},{l:"4",s:4},{l:"2",s:2}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:"4"},{v:"4"},{v:"+2"}]},
  {cap:"Brackets override everything: (2 + 3) × 4 builds the package first, and NOW it is 20.",cols:[{l:"5",s:5},{l:"5",s:5},{l:"5",s:5},{l:"5",s:5}],rows:[{l:"",s:4}],cells:[{v:"5"},{v:"5"},{v:"5"},{v:"5"}],sum:"(2+3) × 4 = 20"},
  {cap:"The rules are not arbitrary — they make one string of symbols mean exactly one picture. Brackets say which picture you meant.",cols:[{l:"one string",s:14}],rows:[{l:"",s:4}],cells:[{v:"one picture"}],sum:"Order = meaning"}]},
 u3w4:{title:"The little raised number",sub:"Week 4 · exponents",steps:[
  {cap:"10² is not 10 × 2. It is 10 × 10 — a square, which is why squaring is called squaring.",cols:[{l:"10",s:10}],rows:[{l:"10",s:10}],cells:[{v:"100"}],sum:"10² = 100"},
  {cap:"10³ stacks ten of those squares — a cube. 1,000.",cols:[{l:"10",s:10}],rows:[{l:"10 × 10 layers",s:10}],cells:[{v:"1000"}],sum:"10³ = 1,000"},
  {cap:"Each step up multiplies by ten again, so the exponent counts the zeros: 10⁵ is a 1 with five zeros.",cols:[{l:"10⁵",s:20}],rows:[{l:"",s:4}],cells:[{v:"100000"}],sum:"Exponent = zero count (for tens)"},
  {cap:"Expanded form with powers: 4,829 = 4×10³ + 8×10² + 2×10 + 9. Place value and exponents are the same machine.",cols:[{l:"4×10³",s:12},{l:"8×10²",s:8},{l:"29",s:3}],rows:[{l:"",s:4}],cells:[{v:"4000"},{v:"800"},{v:"29"}],sum:"Same ladder, new notation"}]},
 u4w2:{title:"Same number, new clothes",sub:"Week 2 · equivalence",steps:[
  {cap:"1/2 of a bar. Cut every piece in three and you hold 3/6 — the shading never moved.",cols:[{l:"1/2 = 3/6",s:10},{l:"",s:10}],rows:[{l:"",s:5}],cells:[{v:"■"},{v:""}],sum:"× 3 top and bottom"},
  {cap:"Simplest form runs the machine backwards: divide top and bottom by their common factor until none is left. 8/12 → 2/3.",cols:[{l:"2/3",s:13},{l:"",s:7}],rows:[{l:"",s:5}],cells:[{v:"÷4"},{v:""}],sum:"8/12 = 2/3"},
  {cap:"Any fraction with the same top and bottom is exactly 1 — 4/4, 9/9, 100/100. Multiplying by them is why renaming is legal.",cols:[{l:"4/4",s:20}],rows:[{l:"",s:5}],cells:[{v:"= 1"}],sum:"Renaming = multiplying by one"}]},
 u4w3:{title:"Which fraction is bigger",sub:"Week 3 · comparing",steps:[
  {cap:"Benchmark against a half first: double the top and compare to the bottom. 3/8 → 6 < 8, under. 5/9 → 10 > 9, over.",cols:[{l:"3/8",s:7},{l:"5/9",s:11}],rows:[{l:"",s:5}],cells:[{v:"under"},{v:"over"}],sum:"Settled in one second"},
  {cap:"Same tops? Bigger bottom means smaller pieces: 3/5 beats 3/8.",cols:[{l:"3/5",s:12},{l:"3/8",s:7}],rows:[{l:"",s:5}],cells:[{v:"wins"},{v:""}],sum:"Fifths are bigger than eighths"},
  {cap:"When neither trick lands, rename to a common denominator and count: 7/12 vs 5/8 → 14/24 vs 15/24.",cols:[{l:"14/24",s:11},{l:"15/24",s:12}],rows:[{l:"",s:5}],cells:[{v:""},{v:"wins"}],sum:"The slow way always works"},
  {cap:"On the number line every fraction has one home. Ordering is just plotting.",cols:[{l:"0",s:1},{l:"",s:10},{l:"1",s:1}],rows:[{l:"",s:3}],cells:[{v:""},{v:"•••"},{v:""}],sum:"Smallest first = left to right"}]},
 u4w4:{title:"Counting matching pieces",sub:"Week 4 · adding fractions",steps:[
  {cap:"3/8 + 2/8: the pieces match, so count them. Five eighths.",cols:[{l:"5/8",s:12},{l:"",s:8}],rows:[{l:"",s:5}],cells:[{v:"5"},{v:""}],sum:"Add tops, keep the bottom"},
  {cap:"1/2 + 1/4: halves and quarters are different pieces. Rename the half as 2/4 first.",cols:[{l:"2/4",s:10},{l:"1/4",s:5},{l:"",s:5}],rows:[{l:"",s:5}],cells:[{v:"2"},{v:"1"},{v:""}],sum:"1/2 + 1/4 = 3/4"},
  {cap:"Sanity check every sum: you added to a half, so the answer must beat a half. 3/4 does.",cols:[{l:"3/4",s:15},{l:"",s:5}],rows:[{l:"",s:5}],cells:[{v:"> 1/2 ✓"},{v:""}],sum:"The size check catches most errors"}]},
 u4w5:{title:"A fraction of a set",sub:"Week 5 · of means divide then multiply",steps:[
  {cap:"3/4 of 12. Deal twelve into four equal piles: three in each.",cols:[{l:"3",s:3},{l:"3",s:3},{l:"3",s:3},{l:"3",s:3}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"3"},{v:"3"},{v:"3"}],sum:"12 ÷ 4 = 3"},
  {cap:"Take three piles: 9. Divide by the bottom, multiply by the top.",cols:[{l:"3",s:3},{l:"3",s:3},{l:"3",s:3}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"3"},{v:"3"}],sum:"3/4 of 12 = 9"},
  {cap:"Backwards: 3/4 of a number is 18 — so one pile is 6, and the whole is 24. Same picture, read the other way.",cols:[{l:"6",s:6},{l:"6",s:6},{l:"6",s:6},{l:"6",s:6}],rows:[{l:"",s:4}],cells:[{v:"6"},{v:"6"},{v:"6"},{v:"?"}],sum:"Whole = 24"}]},
 u4w6:{title:"The equivalence proof",sub:"Week 6 · proof week",steps:[
  {cap:"This week you prove 1/2 = 2/4 = 4/8 with paper folds — the folds ARE the multiplication by one.",cols:[{l:"fold",s:10},{l:"fold",s:10}],rows:[{l:"",s:5}],cells:[{v:"×2/2"},{v:"×2/2"}],sum:"Each fold doubles both numbers"},
  {cap:"Then defend a number line: place 3/8, 1/2 and 3/4, and say how you knew the order without computing.",cols:[{l:"0",s:1},{l:"",s:15},{l:"1",s:1}],rows:[{l:"",s:3}],cells:[{v:""},{v:"• • •"},{v:""}],sum:"Benchmarks first, arithmetic last"},
  {cap:"The test closes Fraction Universe. Every answer in simplest form — not finished until top and bottom share nothing.",cols:[{l:"simplest",s:14}],rows:[{l:"",s:4}],cells:[{v:"2/3"}],sum:"Simplify to finish"}]},
 u5w2:{title:"The point lines up with itself",sub:"Week 2 · decimal add and subtract",steps:[
  {cap:"3.5 + 0.47. Different lengths — so write 3.5 as 3.50 and both are two places long.",cols:[{l:"3.50",s:18}],rows:[{l:"",s:4}],cells:[{v:"3.50"}],sum:"Trailing zeros are free"},
  {cap:"Now the columns match: 50 hundredths + 47 hundredths = 97. Answer 3.97.",cols:[{l:"3",s:14},{l:".97",s:5}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"0.97"}],sum:"3.5 + 0.47 = 3.97"},
  {cap:"Change from a twenty is the same skill: $20.00 − $13.68. Write in the zeros, borrow across the point as normal.",cols:[{l:"6.32",s:8},{l:"13.68",s:14}],rows:[{l:"",s:4}],cells:[{v:"change"},{v:"spent"}],sum:"$20 − $13.68 = $6.32"},
  {cap:"Money is decimals wearing a dollar sign — two places, always. Nothing else changes.",cols:[{l:"$",s:4},{l:".00",s:16}],rows:[{l:"",s:4}],cells:[{v:"$"},{v:"2 places"}],sum:"Same arithmetic, new costume"}]},
 u5w3:{title:"Price per one",sub:"Week 3 · unit price",steps:[
  {cap:"$6 for 2 or $10 for 4 — neither total settles it. Divide by the count.",cols:[{l:"$3",s:10},{l:"$2.50",s:9}],rows:[{l:"",s:5}],cells:[{v:"each"},{v:"each"}],sum:"$10 for 4 wins"},
  {cap:"Bigger box, better deal? Only sometimes. 400 g at $5 is $1.25 per 100 g; 800 g at $9 is $1.125. Check, never assume.",cols:[{l:"1.25",s:12},{l:"1.125",s:11}],rows:[{l:"",s:5}],cells:[{v:"small"},{v:"big"}],sum:"This time the big one wins"},
  {cap:"Rounding money follows the question: estimates round to dollars, receipts to cents. Say the place before you round.",cols:[{l:"$5",s:10},{l:"$4.79",s:10}],rows:[{l:"",s:5}],cells:[{v:"estimate"},{v:"receipt"}],sum:"Name the place"}]},
 u5w4:{title:"The budget is the test",sub:"Week 4 · proof week",steps:[
  {cap:"Three dinners, $40, no going over. Estimate each dinner to the dollar first — the estimate is your guard rail.",cols:[{l:"13",s:8},{l:"13",s:8},{l:"13",s:8}],rows:[{l:"",s:4}],cells:[{v:"$13"},{v:"$13"},{v:"$13"}],sum:"$40 ÷ 3 ≈ $13.33 each"},
  {cap:"Shop it with a running total, then reconcile: your total against the receipt, and name the gap.",cols:[{l:"33.75",s:17},{l:"2.70",s:2}],rows:[{l:"",s:4}],cells:[{v:"planned"},{v:"tax"}],sum:"$36.45 — over by the tax"},
  {cap:"The mission test asks the same three moves: line up the point, divide for unit price, defend the rounding.",cols:[{l:"+−",s:7},{l:"÷",s:7},{l:"round",s:7}],rows:[{l:"",s:4}],cells:[{v:"align"},{v:"unit"},{v:"defend"}],sum:"Money is the exam"}]},
 u6w2:{title:"Fence versus field",sub:"Week 2 · perimeter and area",steps:[
  {cap:"A 4 by 3 field. The fence walks the edge: 4+3+4+3 = 14. The grass fills the inside: 4 × 3 = 12.",cols:[{l:"4",s:8}],rows:[{l:"3",s:6}],cells:[{v:"12"}],sum:"Perimeter 14 · area 12"},
  {cap:"Same fence, different field: 24 m of fence makes 1×11 (area 11) or 6×6 (area 36). Perimeter fixed, area wildly loose.",cols:[{l:"6",s:12}],rows:[{l:"6",s:12}],cells:[{v:"36"}],sum:"The square wins every time"},
  {cap:"Compound shapes split into rectangles: an L is two fields glued. Add the areas; walk the outside for the fence.",cols:[{l:"a",s:8},{l:"b",s:5}],rows:[{l:"",s:6}],cells:[{v:"A"},{v:"B"}],sum:"Split, solve, sum"}]},
 u6w3:{title:"Two numbers, one place",sub:"Week 3 · coordinates",steps:[
  {cap:"(3, 5): three across, then five up. Always that order.",cols:[{l:"3",s:6}],rows:[{l:"5",s:10}],cells:[{v:"•"}],sum:"Across, then up"},
  {cap:"(5, 3) is a different room — same digits, swapped jobs.",cols:[{l:"5",s:10}],rows:[{l:"3",s:6}],cells:[{v:"•"}],sum:"Order carries meaning"},
  {cap:"Shapes come free: corners (1,1),(6,1),(6,5),(1,5) make a 5-by-4 rectangle. Width and height are subtractions.",cols:[{l:"5",s:10}],rows:[{l:"4",s:8}],cells:[{v:"20"}],sum:"Area from coordinates alone"},
  {cap:"Distance along a row is a subtraction too: (2,3) to (7,3) is 5. A map is arithmetic you can walk on.",cols:[{l:"5",s:10}],rows:[{l:"",s:2}],cells:[{v:"→"}],sum:"7 − 2 = 5 blocks"}]},
 u6w4:{title:"Fold it, turn it, name it",sub:"Week 4 · symmetry and angles",steps:[
  {cap:"Fold a square and the halves land exactly — four different folds work. A rectangle only allows two.",cols:[{l:"4 folds",s:10},{l:"2 folds",s:10}],rows:[{l:"",s:5}],cells:[{v:"square"},{v:"rect"}],sum:"Lines of symmetry"},
  {cap:"An angle is an amount of turn. Quarter turn 90°, half turn 180°, all the way round 360°.",cols:[{l:"90",s:6},{l:"180",s:12},{l:"360",s:6}],rows:[{l:"",s:4}],cells:[{v:"¼"},{v:"½"},{v:"full"}],sum:"Turn, not corner"},
  {cap:"Angles in a triangle always total 180° — given two, the third is a subtraction: 90 and 30 leave 60.",cols:[{l:"90",s:9},{l:"30",s:3},{l:"60",s:6}],rows:[{l:"",s:4}],cells:[{v:"90"},{v:"30"},{v:"60"}],sum:"180 − 90 − 30 = 60"},
  {cap:"Names follow properties: every square is a rectangle, but not the reverse. Count sides, check parallels, then name.",cols:[{l:"squares",s:6},{l:"rectangles",s:14}],rows:[{l:"",s:4}],cells:[{v:"⊂"},{v:""}],sum:"Properties first, names second"}]},
 u6w5:{title:"A map somebody can sail",sub:"Week 5 · proof week",steps:[
  {cap:"Your invented planet lives on the grid: harbour (2,3), peak (7,7). Every landmark is an ordered pair.",cols:[{l:"",s:10},{l:"",s:10}],rows:[{l:"",s:8}],cells:[{v:"⚓"},{v:"⛰"}],sum:"Plot, then label"},
  {cap:"Sailing directions are coordinates plus distances: (1,1) east to (9,1) is 8, north to (9,5) is 4 more.",cols:[{l:"8",s:16},{l:"",s:0}],rows:[{l:"4",s:8}],cells:[{v:"→↑"}],sum:"12 leagues total"},
  {cap:"The test replays the mission: perimeter, area, coordinates, angles — all four on one map you drew yourself.",cols:[{l:"map",s:20}],rows:[{l:"",s:4}],cells:[{v:"exam"}],sum:"Geometry, assembled"}]},
 u7w2:{title:"From tally to chance",sub:"Week 2 · collect and graph",steps:[
  {cap:"Ask 20 people one fair question. Tally in fives as they answer — no tidying afterwards.",cols:[{l:"8",s:8},{l:"6",s:6},{l:"4",s:4},{l:"2",s:2}],rows:[{l:"",s:4}],cells:[{v:"8"},{v:"6"},{v:"4"},{v:"2"}],sum:"Counts must total 20"},
  {cap:"Bar the counts. Mean 5, range 6, mode is the tallest bar. Four numbers, one picture.",cols:[{l:"water",s:8},{l:"juice",s:6},{l:"milk",s:4},{l:"tea",s:2}],rows:[{l:"",s:5}],cells:[{v:"8"},{v:"6"},{v:"4"},{v:"2"}],sum:"Mean · median · mode · range"},
  {cap:"Chance is a count out of a total: 3 red in a bag of 8 means 3/8 — and about 15 reds in 40 draws.",cols:[{l:"3",s:3},{l:"5",s:5}],rows:[{l:"",s:4}],cells:[{v:"red"},{v:"blue"}],sum:"Expected, not guaranteed"}]},
 u7w3:{title:"Graphs can lie politely",sub:"Week 3 · publish honestly",steps:[
  {cap:"Bars at 95 and 98 drawn from an axis starting at 90: the 98 towers, looking almost three times taller.",cols:[{l:"5",s:5},{l:"8",s:8}],rows:[{l:"",s:5}],cells:[{v:"95"},{v:"98"}],strip:true,sum:"Every number true — picture false"},
  {cap:"From zero the same bars are near twins. The axis start is the whole trick.",cols:[{l:"95",s:19},{l:"98",s:20}],rows:[{l:"",s:5}],cells:[{v:"95"},{v:"98"}],sum:"Start at zero, or say why not"},
  {cap:"Fifty dice rolls will not give 25 heads or eight of each face — spread is normal. Predict, roll, and explain the gap in writing.",cols:[{l:"8",s:8},{l:"±",s:4}],rows:[{l:"",s:4}],cells:[{v:"expect"},{v:"spread"}],sum:"Chance wobbles; the long run settles"}]},
 u8w2:{title:"A letter is a seat",sub:"Week 2 · variables",steps:[
  {cap:"n is a seat a number sits in. When n = 4, the expression 3n means three of them: 12.",cols:[{l:"n",s:4},{l:"n",s:4},{l:"n",s:4}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:"4"},{v:"4"}],sum:"3n = 12 when n = 4"},
  {cap:"3n + 2 is the rectangle plus two loose squares. Substitute first, then follow the order of operations.",cols:[{l:"3n",s:12},{l:"2",s:2}],rows:[{l:"",s:4}],cells:[{v:"12"},{v:"2"}],sum:"3n + 2 = 14"},
  {cap:"Two letters, two seats: a = 3, b = 7 makes 4a + b into 12 + 7. Fill every seat before simplifying.",cols:[{l:"4a",s:12},{l:"b",s:7}],rows:[{l:"",s:4}],cells:[{v:"12"},{v:"7"}],sum:"= 19"},
  {cap:"Perimeter as a rule: a square of side s has perimeter 4s. One formula, every square that will ever exist.",cols:[{l:"s",s:5},{l:"s",s:5},{l:"s",s:5},{l:"s",s:5}],rows:[{l:"",s:4}],cells:[{v:"s"},{v:"s"},{v:"s"},{v:"s"}],sum:"P = 4s"}]},
 u8w3:{title:"Keep the scale level",sub:"Week 3 · equations",steps:[
  {cap:"x + 4 = 11 is a balanced scale. Take 4 from both pans and it stays level: x = 7.",cols:[{l:"x",s:7},{l:"4",s:4}],rows:[{l:"",s:4}],cells:[{v:"x"},{v:"4"}],sum:"Remove 4 from both sides"},
  {cap:"3x = 21 shares into three equal pieces: x = 7. Divide both sides by the same number and the balance holds.",cols:[{l:"7",s:7},{l:"7",s:7},{l:"7",s:7}],rows:[{l:"",s:4}],cells:[{v:"7"},{v:"7"},{v:"7"}],sum:"x = 21 ÷ 3"},
  {cap:"Check by substituting back: 7 + 4 = 11 ✓. If both sides match, you are done — no marking needed.",cols:[{l:"check",s:14}],rows:[{l:"",s:4}],cells:[{v:"✓"}],sum:"Put it back in"},
  {cap:"Words become equations: 'after spending $18 you have $27' is x − 18 = 27. Translate, solve, check.",cols:[{l:"x",s:15},{l:"18",s:6}],rows:[{l:"",s:4}],cells:[{v:"45"},{v:"−18"}],sum:"x = 45"}]},
 u8w4:{title:"The trail is the year",sub:"Week 4 · capstone",steps:[
  {cap:"Ten stops through the house, one problem per mission plus two of your own. You write them; you hold the answer key.",cols:[{l:"10 stops",s:20}],rows:[{l:"",s:4}],cells:[{v:"trail"}],sum:"One stop per mission"},
  {cap:"Mom walks it and you mark her work. Any question she reads two ways gets rewritten on the spot — ambiguity is the bug.",cols:[{l:"clear",s:12},{l:"vague",s:8}],rows:[{l:"",s:4}],cells:[{v:"keep"},{v:"rewrite"}],sum:"A question must read one way"},
  {cap:"Thursday sweeps all eight error journals: name the one habit that fixed itself this year. Friday's test closes Year One.",cols:[{l:"8 journals",s:16}],rows:[{l:"",s:4}],cells:[{v:"1 habit"}],sum:"The year, in evidence"}]}
};

Object.assign(window.__CURR, {UNITS, WEEKS, PUZZLES, WEEKS_U2, WEEKS_U3, WEEKS_U4, WEEKS_U5, WEEKS_U6, WEEKS_U7, WEEKS_U8, PUZZLES_U6, STANDARDS_U6, PUZZLES_U7, STANDARDS_U7, PUZZLES_U8, STANDARDS_U8, PUZZLES_U5, STANDARDS_U5, PUZZLES_U4, STANDARDS_U4, PUZZLES_U3, STANDARDS_U3, PUZZLES_U2, STANDARDS_U2, STANDARDS, PRACTICE, PRACTICE_U2, PRACTICE_U3, PRACTICE_U4, PRACTICE_U5, PRACTICE_U6, PRACTICE_U7, PRACTICE_U8, PRACTICE_U1_W2, PRACTICE_U1_W3, PRACTICE_U1_W4, PRACTICE_U1_W5, PRACTICE_U2_W2, PRACTICE_U2_W3, PRACTICE_U2_W4, PRACTICE_U2_W5, PRACTICE_U3_W2, PRACTICE_U3_W3, PRACTICE_U3_W4, PRACTICE_U4_W2, PRACTICE_U4_W3, PRACTICE_U4_W4, PRACTICE_U4_W5, PRACTICE_U4_W6, PRACTICE_U5_W2, PRACTICE_U5_W3, PRACTICE_U5_W4, PRACTICE_U6_W2, PRACTICE_U6_W3, PRACTICE_U6_W4, PRACTICE_U6_W5, PRACTICE_U7_W2, PRACTICE_U7_W3, PRACTICE_U7_W4, PRACTICE_U7_W5, PRACTICE_U8_W2, PRACTICE_U8_W3, PRACTICE_U8_W4, ALL_SETS, U, LESSONS, LESSONS_U2, LESSONS_U3, LESSONS_U4, LESSONS_U5, LESSONS_U6, LESSONS_U7, LESSONS_U8, LESSONS_WEEKLY});
})();
