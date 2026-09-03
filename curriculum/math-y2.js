/* MATH · Year Two (Grade 5). Missions 01–08.
   Plain script, loaded before the app. Exports onto window.__CURR. */
(function(){
window.__CURR = window.__CURR || {};
const {TIERS, GATES, GATES_SHORT, GATES_LONG, GATES_TINY, BANDS, RHYTHM, ASSESS, COMPACT, WATCHOUTS, PRAISE, mkWeek, GATE_FULL, q, GATE_OUT, GATE_QUIZ, GATE_TEST, UNITS, WEEKS, PUZZLES, WEEKS_U2, WEEKS_U3, WEEKS_U4, WEEKS_U5, WEEKS_U6, WEEKS_U7, WEEKS_U8, PUZZLES_U6, STANDARDS_U6, PUZZLES_U7, STANDARDS_U7, PUZZLES_U8, STANDARDS_U8, PUZZLES_U5, STANDARDS_U5, PUZZLES_U4, STANDARDS_U4, PUZZLES_U3, STANDARDS_U3, PUZZLES_U2, STANDARDS_U2, STANDARDS, PRACTICE, PRACTICE_U2, PRACTICE_U3, PRACTICE_U4, PRACTICE_U5, PRACTICE_U6, PRACTICE_U7, PRACTICE_U8, PRACTICE_U1_W2, PRACTICE_U1_W3, PRACTICE_U1_W4, PRACTICE_U1_W5, PRACTICE_U2_W2, PRACTICE_U2_W3, PRACTICE_U2_W4, PRACTICE_U2_W5, PRACTICE_U3_W2, PRACTICE_U3_W3, PRACTICE_U3_W4, PRACTICE_U4_W2, PRACTICE_U4_W3, PRACTICE_U4_W4, PRACTICE_U4_W5, PRACTICE_U4_W6, PRACTICE_U5_W2, PRACTICE_U5_W3, PRACTICE_U5_W4, PRACTICE_U6_W2, PRACTICE_U6_W3, PRACTICE_U6_W4, PRACTICE_U6_W5, PRACTICE_U7_W2, PRACTICE_U7_W3, PRACTICE_U8_W2, PRACTICE_U8_W3, PRACTICE_U8_W4, ALL_SETS, U, LESSONS, LESSONS_U2, LESSONS_U3, LESSONS_U4, LESSONS_U5, LESSONS_U6, LESSONS_U7, LESSONS_U8, LESSONS_WEEKLY} = window.__CURR;

const UNITS_Y5 = [
  {n:1,name:"Powers of Ten",short:"Powers of Ten",color:"#38BDF8",weeks:"1–4",badge:"10³",size:92,glyph:"26px",
   bigQ:"When you multiply by ten, why do the digits move instead of the decimal point?",
   skills:["Place value to thousandths","× and ÷ by powers of ten","Exponent notation","Reading and writing decimals","Comparing decimals","Rounding"],
   project:"Zoom Atlas — pick one real object and draw it at ten times, a hundred times and a thousandth of its size, labelling every jump.",
   game:"Decimal Duel — draw four digit cards, build the largest number you can, defend it against your opponent's.",
   badgeName:"The Magnitude Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 01 test and explaining the Big Question out loud."},
  {n:2,name:"Big Multiplication",short:"Big Multiplication",color:"#FF9F1C",weeks:"5–7",badge:"×",size:80,glyph:"38px",
   bigQ:"The standard algorithm hides the area model inside it — where exactly?",
   skills:["Area model with large numbers","Partial products","Standard algorithm","Estimating to check","Multiplying by multiples of ten"],
   project:"Floor Plan at Scale — measure a real room, scale it up by a factor you choose, and find the true area two ways.",
   game:"Partial Product Poker — deal digits, build the biggest product, show the partials.",
   badgeName:"The Algorithm Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 02 test and explaining the Big Question out loud."},
  {n:3,name:"Long Division",short:"Long Division",color:"#2DD4BF",weeks:"8–11",badge:"÷",size:86,glyph:"38px",
   bigQ:"Every division is really a question about how many groups fit — so what is the algorithm counting?",
   skills:["Four-digit ÷ two-digit","Partial quotients","Estimating the quotient","Remainders in context","Checking by multiplying"],
   project:"Road Trip Budget — plan a real journey and divide fuel, food and hours across the days.",
   game:"Quotient Hunt — nearest estimate to the true quotient wins the round.",
   badgeName:"The Long Haul Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 03 test and explaining the Big Question out loud."},
  {n:4,name:"Decimal Operations",short:"Decimal Operations",color:"#A3E635",weeks:"12–16",badge:".7",size:76,glyph:"32px",
   bigQ:"Why does multiplying by a decimal sometimes make a number smaller?",
   skills:["Adding and subtracting decimals","Multiplying decimals","Dividing decimals","Placing the point by estimation","Decimals in money and measurement"],
   project:"Unit Price Investigation — compare real supermarket prices per unit and find where the bigger box loses.",
   game:"Point Placement — given the digits, race to place the decimal point correctly.",
   badgeName:"The Precision Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 04 test and explaining the Big Question out loud."},
  {n:5,name:"Fraction Sums",short:"Fraction Sums",color:"#F472B6",weeks:"17–21",badge:"⅞",size:90,glyph:"34px",
   bigQ:"Why can't you add two fractions until the pieces are the same size?",
   skills:["Equivalent fractions","Common denominators","Adding and subtracting unlike fractions","Mixed numbers","Estimating with benchmarks"],
   project:"Double the Recipe — take a real recipe, scale it by a fraction, and cook the result.",
   game:"Benchmark Battle — sort fractions either side of one half before the timer runs out.",
   badgeName:"The Common Ground Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 05 test and explaining the Big Question out loud."},
  {n:6,name:"Fraction Products",short:"Fraction Products",color:"#A78BFA",weeks:"22–26",badge:"½×",size:84,glyph:"25px",
   bigQ:"Dividing by one half makes the answer bigger. What is the question actually asking?",
   skills:["Fraction × whole number","Fraction × fraction as area","Scaling without computing","Dividing with unit fractions","Fraction as division"],
   project:"Half a Garden — design a plot, then work out what two thirds of each bed actually holds.",
   game:"Scaling Showdown — predict bigger, smaller or the same before you calculate.",
   badgeName:"The Scaling Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 06 test and explaining the Big Question out loud."},
  {n:7,name:"Volume & Measure",short:"Volume & Measure",color:"#FBBF24",weeks:"27–30",badge:"㎥",size:78,glyph:"24px",
   bigQ:"Area covers a floor and volume fills a room — so why is one squared and the other cubed?",
   skills:["Converting within a system","Volume by counting cubes","Volume formulas","Composite solids","Line plots with fractions"],
   project:"Box It — design three boxes with the same volume and different shapes, then argue for the best one.",
   game:"Cube Count — read a drawn solid and call its volume before your opponent does.",
   badgeName:"The Cubic Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 07 test and explaining the Big Question out loud."},
  {n:8,name:"Coordinate Geometry",short:"Coordinate Geometry",color:"#FB7185",weeks:"31–34",badge:"xy",size:82,glyph:"28px",
   bigQ:"Two number patterns can be plotted as one line of points — what does that line tell you?",
   skills:["Plotting in the first quadrant","Ordered pairs from rules","Graphing two patterns together","Classifying quadrilaterals","Hierarchy of shapes"],
   project:"Map My Block — put a real neighbourhood on a coordinate grid and write directions in ordered pairs.",
   game:"Rule Race — one player plots, the other names the rule.",
   badgeName:"The Coordinate Badge",badgeReq:"Earned by scoring 85% or higher on the Mission 08 test and explaining the Big Question out loud."}
];

const WEEKS_Y5 = {
 1:[mkWeek(1,"Place Value",...GATE_FULL,true,"Decimals stop being “little numbers after a dot” and become tenths, hundredths and thousandths that obey exactly the rules whole numbers do.",[
     ["Mon · 1.1","Ten times bigger","Each place is ten of the place to its right. Say it while you write it."],
     ["Tue · 1.2","Down to thousandths","The same rule running the other way. Three places past the point."],
     ["Wed · 1.3","Read it out loud","0.406 is four hundred six thousandths. The word tells you the last place."],
     ["Thu · 1.4","Compare and order","Line up the points, not the digits. Trailing zeros are free."],
     ["Fri · Enrichment","Decimal Duel","Build the biggest number from four cards, then defend it.",[2]]]),
   mkWeek(2,"Multiply by Ten",...GATE_OUT,false,"Multiplying by ten does not move the point. It moves every digit one place left, and the point stays exactly where it always was.",[
     ["Mon · 2.1","× 10, × 100, × 1000","Watch the digits move. The point never does."],
     ["Tue · 2.2","÷ 10, ÷ 100, ÷ 1000","The same journey in reverse."],
     ["Wed · 2.3","Exponent shorthand","10³ means three tens multiplied, which is three places."],
     ["Thu · 2.4","Patterns in zeros","Why 4 × 100 ends in two zeros and 0.4 × 100 does not."],
     ["Fri · Enrichment","Zoom Atlas begins","Pick the object. Draw it at true size first.",[2]]]),
   mkWeek(3,"Rounding",...GATE_QUIZ,false,"Rounding is a decision about which place matters, and this week he has to say which place he chose and why. Mid-unit quiz on Friday.",[
     ["Mon · 3.1","Round to a named place","Find the place, look one to its right, decide."],
     ["Tue · 3.2","Rounding decimals","Same method, smaller places."],
     ["Wed · 3.3","Which place matters","Money rounds to hundredths. Distance rarely does."],
     ["Thu · 3.4","Estimate to check","Round first, compute second, compare."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–3. 85% to keep flying.",[1]]]),
   mkWeek(4,"Proof",...GATE_TEST,false,"The Zoom Atlas gets finished and defended, and the Mission 01 test closes the mission.",[
     ["Mon · 4.1","Finish the atlas","Every jump labelled with its power of ten.",[0,2]],
     ["Tue · 4.2","Explain a jump","Pick one panel and say what moved and what stayed.",[1,2]],
     ["Wed · 4.3","Mixed review","Place value, powers, rounding, in one set."],
     ["Thu · Review","Error journal sweep","Fix only what repeats.",[0,1]],
     ["Fri · Test","Mission 01 test","12 items + one explanation.",[1,2]]])],
 2:[mkWeek(1,"Area to Algorithm",...GATE_FULL,true,"The area model gets big enough to be annoying, which is exactly the moment the standard algorithm earns its keep.",[
     ["Mon · 1.1","Big area models","Three-digit by two-digit, drawn out in four boxes."],
     ["Tue · 1.2","Partial products","Same four boxes, written as four numbers."],
     ["Wed · 1.3","Stack it up","The standard algorithm, with the partials still visible."],
     ["Thu · 1.4","Where did the boxes go","Point at the line in the algorithm that is each box."],
     ["Fri · Enrichment","Partial Product Poker","Biggest product from the dealt digits.",[2]]]),
   mkWeek(2,"Fluency",...GATE_QUIZ,false,"Speed comes from estimating first, so a wrong answer announces itself. Mid-unit quiz on Friday.",[
     ["Mon · 2.1","Multiples of ten","40 × 60 before 43 × 67."],
     ["Tue · 2.2","Estimate, then compute","Round both, multiply, then do it properly."],
     ["Wed · 2.3","Four digits by two","Longer, not harder."],
     ["Thu · 2.4","Catch the error","Given a wrong worked answer, find the line it went wrong."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–2.",[1]]]),
   mkWeek(3,"Scale & Proof",...GATE_FULL,true,"Floor Plan at Scale gets measured, scaled and checked two ways, and the Mission 02 test closes the mission.",[
     ["Mon · 3.1","Measure the room","Real tape measure, real numbers.",[0,2]],
     ["Tue · 3.2","Scale it up","Multiply every dimension by your factor.",[1,2]],
     ["Wed · 3.3","Area two ways","Area model and algorithm must agree."],
     ["Thu · 3.4","Mark somebody's work","Six worked answers, three wrong. Find them by estimating.",[0,1]],
     ["Fri · Test","Mission 02 test","12 items + one explanation.",[1,2]]]),
   mkWeek(4,"Stadium Capacity",...GATE_TEST,false,"A project week whose work was already written with no plan attached to it: three sets existed for week 4 while this summary stopped at three, so nothing on the page ever sent a child to them. One question runs the week — how many seats are in the stadium — answered by multiplying up from a single section, then explaining the gap against the published figure.",[
     ["Mon · 4.1","Count a section","Seats per row, rows per section. Small numbers, carefully."],
     ["Tue · 4.2","Scale it up","One section times the number of sections — 3-digit by 2-digit, which is exactly 5.NR.2."],
     ["Wed · 4.3","Explain the gap","Compare with the published capacity and account for the difference."],
     ["Thu · Journal","Error journal","Fix only what repeats.",[0,1]],
     ["Fri · Test","Mission 02 test","12 items + one explanation.",[1,2]]])],
 3:[mkWeek(1,"What Division Counts",...GATE_FULL,true,"Before any algorithm, the question: how many groups of this size fit inside that? Every step of long division answers it once.",[
     ["Mon · 1.1","Groups that fit","Estimate how many 30s fit in 400 before dividing anything."],
     ["Tue · 1.2","Partial quotients","Take out chunks you can see. Add the chunks."],
     ["Wed · 1.3","Three digits ÷ two","The standard layout, one place at a time."],
     ["Thu · 1.4","Check by multiplying","Quotient × divisor + remainder = the number you started with."],
     ["Fri · Enrichment","Quotient Hunt","Closest estimate wins.",[2]]]),
   mkWeek(2,"Four Digits",...GATE_OUT,false,"Longer numbers, same four moves: divide, multiply, subtract, bring down.",[
     ["Mon · 2.1","Four digits ÷ two","Where the first digit of the quotient goes, and why."],
     ["Tue · 2.2","Zeros in the quotient","The place that gets skipped is the place people lose."],
     ["Wed · 2.3","Estimate first","A rough answer means a wrong one gets noticed."],
     ["Thu · 2.4","Divisor near a ten","Rounding 29 to 30 makes the guessing quick."],
     ["Fri · Enrichment","Road Trip Budget begins","Pick the route, gather the real numbers.",[2]]]),
   mkWeek(3,"Remainders",...GATE_QUIZ,false,"The remainder is a decision, not a leftover. Round up, round down, or write it as a fraction — the situation decides. Mid-unit quiz on Friday.",[
     ["Mon · 3.1","Remainder in context","Buses, boxes and money each treat it differently."],
     ["Tue · 3.2","Remainder as a fraction","17 ÷ 4 is four and a quarter."],
     ["Wed · 3.3","Which way to round","Say the reason out loud before writing the answer."],
     ["Thu · 3.4","Word problems","Two-step problems where division comes second."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–3.",[1]]]),
   mkWeek(4,"Proof",...GATE_TEST,false,"The Road Trip Budget gets costed to the last dollar and the Mission 03 test closes the mission.",[
     ["Mon · 4.1","Cost the trip","Fuel, food and hours divided across the days.",[0,2]],
     ["Tue · 4.2","Defend one remainder","One decision, one sentence of reasoning.",[1,2]],
     ["Wed · 4.3","Mixed review","Division with and without remainders."],
     ["Thu · Review","Error journal sweep","Fix only what repeats.",[0,1]],
     ["Fri · Test","Mission 03 test","12 items + one explanation.",[1,2]]])],
 4:[mkWeek(1,"Adding Decimals",...GATE_FULL,true,"Line up the points and everything from Mission 01 does the work. The hard part is trusting that 3.5 and 3.50 are the same number.",[
     ["Mon · 1.1","Line up the point","Not the last digit. The point."],
     ["Tue · 1.2","Filling with zeros","3.5 becomes 3.50 so the columns match."],
     ["Wed · 1.3","Subtracting decimals","Same alignment, borrowing across the point."],
     ["Thu · 1.4","Estimate to check","Round to whole numbers and see if the answer is plausible."],
     ["Fri · Enrichment","Receipt check","Add a real receipt by hand and find the till's total.",[2]]]),
   mkWeek(2,"Multiplying Decimals",...GATE_OUT,false,"Multiply as if the points were not there, then count how many digits were behind them. The count tells you where the point goes.",[
     ["Mon · 2.1","Ignore the point","Multiply the digits first."],
     ["Tue · 2.2","Count the places","Two decimal digits in, two decimal digits out."],
     ["Wed · 2.3","Estimate to place it","0.4 × 60 is about 24, so the point can only be in one spot."],
     ["Thu · 2.4","Smaller than you started","Why × 0.5 halves instead of doubling."],
     ["Fri · Enrichment","Point Placement","Race to place the decimal point.",[2]]]),
   mkWeek(3,"Dividing Decimals",...GATE_OUT,false,"Move both numbers the same number of places and the answer does not change — which turns every decimal division into one he already knows.",[
     ["Mon · 3.1","Decimal ÷ whole","The point comes straight up."],
     ["Tue · 3.2","Whole ÷ decimal","Shift both, then divide as usual."],
     ["Wed · 3.3","Decimal ÷ decimal","Same shift, both numbers."],
     ["Thu · 3.4","Money problems","Unit prices and change."],
     ["Fri · Enrichment","Unit Price Investigation begins","Collect real prices and sizes.",[2]]]),
   mkWeek(4,"Mixed Operations",...GATE_QUIZ,false,"All four operations on decimals in one week, which is the first time he has to choose the operation rather than be told it. Mid-unit quiz on Friday.",[
     ["Mon · 4.1","Choose the operation","The words tell you. Read them twice."],
     ["Tue · 4.2","Two-step problems","Multiply then subtract, in that order."],
     ["Wed · 4.3","Measurement contexts","Metres, litres and kilograms with decimals."],
     ["Thu · 4.4","Estimate everything first","Write the estimate before the working."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–4.",[1]]]),
   mkWeek(5,"Proof",...GATE_TEST,false,"The Unit Price Investigation gets published with a recommendation, and the Mission 04 test closes the mission.",[
     ["Mon · 5.1","Compute unit prices","Divide price by size for every item.",[0,2]],
     ["Tue · 5.2","Find the trap","Name one product where the bigger box costs more per unit.",[1,2]],
     ["Wed · 5.3","Write the recommendation","One paragraph a shopper could act on."],
     ["Thu · Review","Error journal sweep","Fix only what repeats.",[0,1]],
     ["Fri · Test","Mission 04 test","12 items + one explanation.",[1,2]]])],
 5:[mkWeek(1,"Same-Size Pieces",...GATE_FULL,true,"Halves and thirds cannot be added while they are still halves and thirds. This week is entirely about why, using paper he folds himself.",[
     ["Mon · 1.1","Why not just add","Fold paper and see that 1/2 + 1/3 is not 2/5."],
     ["Tue · 1.2","Equivalent fractions","The same amount, cut more finely."],
     ["Wed · 1.3","Finding a common denominator","Any common multiple works. The smallest is tidiest."],
     ["Thu · 1.4","Add unlike fractions","Convert both, then add the numerators only."],
     ["Fri · Enrichment","Benchmark Battle","Above or below one half, at speed.",[2]]]),
   mkWeek(2,"Subtracting",...GATE_OUT,false,"Subtraction with unlike denominators, including the borrow that turns one whole into a pile of fifths.",[
     ["Mon · 2.1","Subtract unlike fractions","Same conversion, different sign."],
     ["Tue · 2.2","Borrowing from a whole","1 becomes 5/5 so you have something to take from."],
     ["Wed · 2.3","Mixed numbers","Whole parts and fraction parts, handled separately."],
     ["Thu · 2.4","Word problems","Two-step problems with a subtraction inside."],
     ["Fri · Enrichment","Double the Recipe begins","Pick the recipe, write the scaled amounts.",[2]]]),
   mkWeek(3,"Estimating",...GATE_OUT,false,"Benchmarks of 0, one half and 1 turn a fraction sum into something he can sanity-check before computing it.",[
     ["Mon · 3.1","Nearest benchmark","Is 7/8 closer to a half or to one?"],
     ["Tue · 3.2","Estimate the sum","About a half plus about one is about one and a half."],
     ["Wed · 3.3","Is this answer sensible","Given a worked answer, decide before checking."],
     ["Thu · 3.4","Compare fractions","Common denominator, or reason from benchmarks."],
     ["Fri · Enrichment","Cook it","Make the scaled recipe for real.",[2]]]),
   mkWeek(4,"Mixed Practice",...GATE_QUIZ,false,"Adding and subtracting mixed together, so he has to read before he reaches for a method. Mid-unit quiz on Friday.",[
     ["Mon · 4.1","Add or subtract","Mixed set, no signposting."],
     ["Tue · 4.2","Three fractions","One common denominator for all three."],
     ["Wed · 4.3","Simplify the answer","6/8 is right, 3/4 is finished."],
     ["Thu · 4.4","Word problems","Recipes, distances and time."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–4.",[1]]]),
   mkWeek(5,"Proof",...GATE_TEST,false,"The scaled recipe is served and defended, and the Mission 05 test closes the mission.",[
     ["Mon · 5.1","Write up the scaling","Every amount, before and after.",[0,2]],
     ["Tue · 5.2","Explain one conversion","Why that denominator, in one sentence.",[1,2]],
     ["Wed · 5.3","Mixed review","Everything from the mission in one set."],
     ["Thu · Review","Error journal sweep","Fix only what repeats.",[0,1]],
     ["Fri · Test","Mission 05 test","12 items + one explanation.",[1,2]]])],
 6:[mkWeek(1,"Fraction of a Number",...GATE_FULL,true,"“Of” means multiply, and two thirds of twelve is a picture before it is a calculation.",[
     ["Mon · 1.1","Fraction of a whole number","Two thirds of 12, drawn then computed."],
     ["Tue · 1.2","Whole number × fraction","The same product, written the other way round."],
     ["Wed · 1.3","Mixed numbers","Convert to an improper fraction first."],
     ["Thu · 1.4","Word problems","Three quarters of the class, two fifths of the money."],
     ["Fri · Enrichment","Half a Garden begins","Sketch the plot and its beds.",[2]]]),
   mkWeek(2,"Fraction × Fraction",...GATE_OUT,false,"A fraction of a fraction is an area, and folding paper twice shows why the denominators multiply.",[
     ["Mon · 2.1","Fold it twice","Half of a third is a sixth, on paper."],
     ["Tue · 2.2","The area model","A rectangle cut both ways."],
     ["Wed · 2.3","Multiply across","Numerators, then denominators."],
     ["Thu · 2.4","Simplify as you go","Cancel before multiplying to keep numbers small."],
     ["Fri · Enrichment","Scaling Showdown","Bigger, smaller or the same — predict first.",[2]]]),
   mkWeek(3,"Scaling",...GATE_OUT,false,"Multiplying by more than one grows a number, by less than one shrinks it, and by exactly one leaves it alone. Predict before computing.",[
     ["Mon · 3.1","Bigger or smaller","Decide without calculating."],
     ["Tue · 3.2","Why × 1 changes nothing","3/3 is one in disguise."],
     ["Wed · 3.3","Compare products","Which is larger, without working either out."],
     ["Thu · 3.4","Word problems","Scaling recipes, distances and prices."],
     ["Fri · Enrichment","Measure the garden","Real beds, real fractions.",[2]]]),
   mkWeek(4,"Dividing Fractions",...GATE_QUIZ,false,"How many halves fit in three? Six — and that question is what dividing by a unit fraction means. Mid-unit quiz on Friday.",[
     ["Mon · 4.1","Whole ÷ unit fraction","How many quarters fit in 2."],
     ["Tue · 4.2","Unit fraction ÷ whole","Sharing a third between four."],
     ["Wed · 4.3","Fraction as division","3/4 is literally 3 ÷ 4."],
     ["Thu · 4.4","Word problems","Ribbon, pizza and time."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–4.",[1]]]),
   mkWeek(5,"Proof",...GATE_TEST,false,"Half a Garden gets planted on paper with every bed costed, and the Mission 06 test closes the mission.",[
     ["Mon · 5.1","Finish the garden plan","Every bed with its fraction and its area.",[0,2]],
     ["Tue · 5.2","Explain a shrink","Name one product smaller than its starting number and say why.",[1,2]],
     ["Wed · 5.3","Mixed review","Multiply and divide together."],
     ["Thu · Review","Error journal sweep","Fix only what repeats.",[0,1]],
     ["Fri · Test","Mission 06 test","12 items + one explanation.",[1,2]]])],
 7:[mkWeek(1,"Converting Units",...GATE_FULL,true,"Every conversion is a multiplication or a division by a power of ten, which makes Mission 01 do most of the work.",[
     ["Mon · 1.1","Metric conversions","Millimetres to metres and back."],
     ["Tue · 1.2","Bigger or smaller unit","Decide whether the number should grow before you compute."],
     ["Wed · 1.3","Multi-step conversions","Grams to kilograms to tonnes."],
     ["Thu · 1.4","Conversions in problems","Add lengths given in different units."],
     ["Fri · Enrichment","Measure the house","Five real measurements, all converted twice.",[2]]]),
   mkWeek(2,"Volume",...GATE_OUT,false,"Volume is counting cubes before it is a formula, and the formula only earns trust once the counting is slow enough to be annoying.",[
     ["Mon · 2.1","Count the cubes","Build it, count it, write it."],
     ["Tue · 2.2","Layers","One layer, times the height."],
     ["Wed · 2.3","The formula","Length × width × height, and where each comes from."],
     ["Thu · 2.4","Find a missing edge","Given volume and two edges, work out the third."],
     ["Fri · Enrichment","Cube Count","Read the drawing, call the volume.",[2]]]),
   mkWeek(3,"Composite Solids",...GATE_QUIZ,false,"Two boxes stuck together, split into parts that can each be measured. Mid-unit quiz on Friday.",[
     ["Mon · 3.1","Split the solid","Draw the dividing line first."],
     ["Tue · 3.2","Add the volumes","Two boxes, one total."],
     ["Wed · 3.3","Line plots","Plot measurements to the nearest eighth."],
     ["Thu · 3.4","Read the plot","Total, difference and redistribution."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–3.",[1]]]),
   mkWeek(4,"Proof",...GATE_TEST,false,"Box It gets built, argued and judged, and the Mission 07 test closes the mission.",[
     ["Mon · 4.1","Design three boxes","Same volume, different shapes.",[0,2]],
     ["Tue · 4.2","Argue for one","Which shape is best, and for what.",[1,2]],
     ["Wed · 4.3","Mixed review","Conversions and volume together."],
     ["Thu · Review","Error journal sweep","Fix only what repeats.",[0,1]],
     ["Fri · Test","Mission 07 test","12 items + one explanation.",[1,2]]])],
 8:[mkWeek(1,"The Grid",...GATE_FULL,true,"Ordered pairs are an instruction, not a label: along first, then up. Getting them backwards is the single commonest error of the mission.",[
     ["Mon · 1.1","Plot a point","Along the hall, then up the stairs."],
     ["Tue · 1.2","Name a point","Read the pair off the grid."],
     ["Wed · 1.3","Distance on a grid","Count squares along one axis."],
     ["Thu · 1.4","Shapes from points","Plot four points, name the shape."],
     ["Fri · Enrichment","Map My Block begins","Sketch the neighbourhood on a grid.",[2]]]),
   mkWeek(2,"Patterns as Points",...GATE_OUT,false,"Two rules generate two sequences, and pairing them turns arithmetic into a line you can see.",[
     ["Mon · 2.1","Two rules at once","Add 3 and add 6, side by side."],
     ["Tue · 2.2","Make the ordered pairs","Pair the terms in order."],
     ["Wed · 2.3","Plot the pairs","They land on a straight line. Say why."],
     ["Thu · 2.4","Relate the sequences","Every second term is double the first."],
     ["Fri · Enrichment","Rule Race","One plots, one names the rule.",[2]]]),
   mkWeek(3,"Shapes",...GATE_QUIZ,false,"A square is a rectangle is a parallelogram is a quadrilateral, and the hierarchy is what makes that sentence true. Mid-unit quiz on Friday.",[
     ["Mon · 3.1","Properties of quadrilaterals","Sides, angles, parallels."],
     ["Tue · 3.2","The hierarchy","Every square is a rectangle, but not the reverse."],
     ["Wed · 3.3","Classify triangles","By sides and by angles."],
     ["Thu · 3.4","Always, sometimes, never","Statements to judge and justify."],
     ["Fri · Quiz","Mid-unit quiz","8 items across Weeks 1–3.",[1]]]),
   mkWeek(4,"Year's End",...GATE_TEST,false,"Map My Block gets navigated by somebody else, and the Mission 08 test closes the year.",[
     ["Mon · 4.1","Finish the map","Ten landmarks, ten ordered pairs.",[0,2]],
     ["Tue · 4.2","Write the directions","Somebody else must be able to follow them.",[1,2]],
     ["Wed · 4.3","Walk somebody through it","Fix any pair that misleads them.",[2]],
     ["Thu · Review","Year-end sweep","All eight error journals. Name the habit that fixed itself.",[0,1]],
     ["Fri · Test","Mission 08 test","12 items + one explanation.",[1,2]]])]
};

const STANDARDS_Y5 = {
 1:[{code:"5.NBT.A.1",where:"Week 1",text:"Recognise that a digit in one place represents ten times what it represents to its right and 1/10 of what it represents to its left."},
    {code:"5.NBT.A.2",where:"Week 2",text:"Explain patterns in the number of zeros and in the placement of the decimal point when multiplying or dividing by powers of 10; denote powers of 10 with exponents."},
    {code:"5.NBT.A.3.A",where:"Week 1",text:"Read and write decimals to thousandths using base-ten numerals, number names and expanded form."},
    {code:"5.NBT.A.3.B",where:"Week 1",text:"Compare two decimals to thousandths based on the meaning of the digits in each place."},
    {code:"5.NBT.A.4",where:"Week 3",text:"Use place-value understanding to round decimals to any place."}],
 2:[{code:"5.NBT.B.5",where:"Weeks 1–2",text:"Fluently multiply multi-digit whole numbers using the standard algorithm."},
    {code:"5.NBT.A.2",where:"Week 2",text:"Multiplying by multiples of ten, carried forward from Mission 01 as the estimation tool."},
    {code:"5.OA.A.1",where:"Week 2",text:"Use parentheses and brackets in numerical expressions, and evaluate expressions with these symbols."},
    {code:"5.NF.B.4.B",where:"Week 3 ceiling",text:"Find the area of a rectangle by tiling and multiplying side lengths — the bridge to Mission 06."},
    {code:"5.MD.A.1",where:"Week 3",text:"Convert among different-sized standard measurement units when solving multi-step problems."}],
 3:[{code:"5.NBT.B.6",where:"Weeks 1–2",text:"Find whole-number quotients of whole numbers with up to four-digit dividends and two-digit divisors."},
    {code:"5.NBT.B.6",where:"Week 1",text:"Illustrate and explain the calculation using equations, rectangular arrays or area models."},
    {code:"5.OA.A.2",where:"Week 3",text:"Write simple expressions that record calculations with numbers, and interpret them without evaluating."},
    {code:"4.OA.A.3",where:"Week 3",text:"Interpret remainders in multi-step word problems — revisited at grade-5 number sizes."},
    {code:"5.NF.B.3",where:"Week 3 ceiling",text:"Interpret a fraction as division of the numerator by the denominator — the bridge to Mission 06."}],
 4:[{code:"5.NBT.B.7",where:"Week 1",text:"Add and subtract decimals to hundredths using concrete models or drawings and strategies based on place value."},
    {code:"5.NBT.B.7",where:"Week 2",text:"Multiply decimals to hundredths, relating the strategy to a written method."},
    {code:"5.NBT.B.7",where:"Week 3",text:"Divide decimals to hundredths, relating the strategy to a written method."},
    {code:"5.NBT.A.4",where:"Week 4",text:"Round decimals to estimate before computing — the error-catching habit of this mission."},
    {code:"5.MD.A.1",where:"Week 5",text:"Use decimal conversions in real measurement and money contexts."}],
 5:[{code:"5.NF.A.1",where:"Weeks 1–2",text:"Add and subtract fractions with unlike denominators by replacing them with equivalent fractions with a common denominator."},
    {code:"5.NF.A.2",where:"Week 4",text:"Solve word problems involving addition and subtraction of fractions referring to the same whole."},
    {code:"5.NF.A.2",where:"Week 3",text:"Use benchmark fractions and number sense to estimate mentally and assess the reasonableness of answers."},
    {code:"4.NF.A.1",where:"Week 1",text:"Explain why a fraction is equivalent to another using visual models — the foundation this mission rebuilds."},
    {code:"5.NF.A.1",where:"Week 2",text:"Add and subtract mixed numbers with unlike denominators."}],
 6:[{code:"5.NF.B.4.A",where:"Weeks 1–2",text:"Interpret the product (a/b) × q as a parts of a partition of q into b equal parts."},
    {code:"5.NF.B.4.B",where:"Week 2",text:"Find the area of a rectangle with fractional side lengths by tiling with unit squares."},
    {code:"5.NF.B.5",where:"Week 3",text:"Interpret multiplication as scaling: compare the size of a product to one factor without performing the multiplication."},
    {code:"5.NF.B.7",where:"Week 4",text:"Divide unit fractions by whole numbers and whole numbers by unit fractions."},
    {code:"5.NF.B.3",where:"Week 4",text:"Interpret a fraction as division and solve word problems leading to answers in the form of fractions."}],
 7:[{code:"5.MD.A.1",where:"Week 1",text:"Convert among different-sized standard measurement units within a given system and use these conversions in multi-step problems."},
    {code:"5.MD.C.3",where:"Week 2",text:"Recognise volume as an attribute of solid figures and understand concepts of volume measurement."},
    {code:"5.MD.C.4",where:"Week 2",text:"Measure volumes by counting unit cubes."},
    {code:"5.MD.C.5.B",where:"Weeks 2–3",text:"Apply the formulas V = l × w × h and V = b × h to find volumes of right rectangular prisms."},
    {code:"5.MD.B.2",where:"Week 3",text:"Make a line plot to display a data set of measurements in fractions of a unit, and solve problems using the data."}],
 8:[{code:"5.G.A.1",where:"Week 1",text:"Use a pair of perpendicular number lines to define a coordinate system; understand that the first number indicates travel along the x-axis."},
    {code:"5.G.A.2",where:"Weeks 1–4",text:"Represent real-world and mathematical problems by graphing points in the first quadrant and interpret coordinate values."},
    {code:"5.OA.B.3",where:"Week 2",text:"Generate two numerical patterns using two given rules, form ordered pairs from corresponding terms, and graph them."},
    {code:"5.G.B.3",where:"Week 3",text:"Understand that attributes belonging to a category of two-dimensional figures also belong to all subcategories."},
    {code:"5.G.B.4",where:"Week 3",text:"Classify two-dimensional figures in a hierarchy based on properties."}]
};

const PUZZLES_Y5 = {
 1:[{label:"C1",pre:"0.",post:"5 is bigger than 0.35",answer:"4",hint:"C1: The tenths digit decides it first."},
    {label:"C2",pre:"6.2 × 10",post:" = 620",answer:"2",hint:"C2: Two places left means two tens."},
    {label:"C3",pre:"0.07 is ",post:" hundredths",answer:"7",hint:"C3: Read the last place out loud."}],
 2:[{label:"C1",pre:"30 × ",post:"0 = 1200",answer:"4",hint:"C1: 3 × 4 is 12, then the zeros."},
    {label:"C2",pre:"2",post:" × 10 = 240",answer:"4",hint:"C2: Divide 240 by 10 first."},
    {label:"C3",pre:"12 × 12 = 14",post:"",answer:"4",hint:"C3: A dozen dozen."}],
 3:[{label:"C1",pre:"",post:"00 ÷ 20 = 30",answer:"6",hint:"C1: 30 twenties."},
    {label:"C2",pre:"91 ÷ 1",post:" = 7",answer:"3",hint:"C2: Seven of what makes 91?"},
    {label:"C3",pre:"17 ÷ 5 = 3 r ",post:"",answer:"2",hint:"C3: Three fives is 15."}],
 4:[{label:"C1",pre:"0.5 × 8 = ",post:"",answer:"4",hint:"C1: Half of eight."},
    {label:"C2",pre:"1.2 + 0.",post:" = 2",answer:"8",hint:"C2: How far from 1.2 to 2?"},
    {label:"C3",pre:"6 ÷ 0.5 = 1",post:"",answer:"2",hint:"C3: How many halves in six?"}],
 5:[{label:"C1",pre:"1/2 + 1/4 = ",post:"/4",answer:"3",hint:"C1: Turn the half into quarters."},
    {label:"C2",pre:"2/3 = ",post:"/9",answer:"6",hint:"C2: Times both by three."},
    {label:"C3",pre:"1 − 3/8 = ",post:"/8",answer:"5",hint:"C3: One is eight eighths."}],
 6:[{label:"C1",pre:"1/2 × 1/3 = 1/",post:"",answer:"6",hint:"C1: Multiply the denominators."},
    {label:"C2",pre:"2/3 of 9 = ",post:"",answer:"6",hint:"C2: A third of nine is three."},
    {label:"C3",pre:"3 ÷ 1/2 = ",post:"",answer:"6",hint:"C3: How many halves fit in three?"}],
 7:[{label:"C1",pre:"2 × 3 × ",post:" = 24",answer:"4",hint:"C1: Six times what is 24?"},
    {label:"C2",pre:"1 m = ",post:"00 cm",answer:"1",hint:"C2: A hundred centimetres."},
    {label:"C3",pre:"3000 g = ",post:" kg",answer:"3",hint:"C3: A thousand grams each."}],
 8:[{label:"C1",pre:"(3, ",post:") is three along, five up",answer:"5",hint:"C1: Along first, then up."},
    {label:"C2",pre:"Rule + 4 from 2: 2, 6, 1",post:"",answer:"0",hint:"C2: Six and four more."},
    {label:"C3",pre:"A square has ",post:" right angles",answer:"4",hint:"C3: One at every corner."}]
};

// Practice sets. Tier 0 = Warm-Up, 1 = Core, 2 = Challenge.
const PRACTICE_Y5 = {
 1:[
  {id:"y5u1p1",label:"1.1",title:"Ten Times Bigger",note:"Every place is ten of the place to its right. Say it as you write it.",items:[
    q(0,"The 4 in 40 is worth","40"),q(0,"The 4 in 400 is worth","400"),q(0,"Ten times 30","300"),q(0,"Ten times 700","7000"),q(0,"One tenth of 500","50"),q(0,"One tenth of 60","6"),
    q(1,"The 7 in 7,000 is how many times the 7 in 700","10"),q(1,"The 3 in 300 is how many times the 3 in 3","100","Two jumps left"),q(1,"100 times 40","4000"),q(1,"One hundredth of 900","9"),q(1,"The 5 in 50,000 is worth","50000"),
    q(2,"The 6 in 60,000 is how many times the 6 in 60","1000","Three jumps"),q(2,"A digit moves two places left. Its value is multiplied by","100")]},
  {id:"y5u1p2",label:"1.2",title:"Down to Thousandths",note:"Three places past the point. Type decimals with a leading zero, like 0.45.",items:[
    q(0,"Write four tenths as a decimal","0.4"),q(0,"Write seven hundredths","0.07"),q(0,"Write three thousandths","0.003"),q(0,"Write twenty-five hundredths","0.25"),q(0,"The 5 in 0.5 means five","tenths"),q(0,"Write one half as a decimal","0.5"),
    q(1,"Write four hundred six thousandths","0.406"),q(1,"Write two and thirty-five hundredths","2.35"),q(1,"0.60 written more simply","0.6"),q(1,"Write sixty-two thousandths","0.062"),q(1,"How many hundredths in 0.3","30"),
    q(2,"Write nine and nine thousandths","9.009"),q(2,"How many thousandths in 0.25","250")]},
  {id:"y5u1p3",label:"1.3",title:"Powers of Ten",note:"The digits move. The point stays put.",items:[
    q(0,"3.5 × 10","35"),q(0,"3.5 × 100","350"),q(0,"42 ÷ 10","4.2"),q(0,"42 ÷ 100","0.42"),q(0,"10² as a number","100"),q(0,"10³ as a number","1000"),
    q(1,"0.06 × 100","6"),q(1,"7 ÷ 1000","0.007"),q(1,"2.4 × 10³","2400"),q(1,"850 ÷ 10²","8.5"),q(1,"10⁴ as a number","10000"),
    q(2,"0.035 × 10⁴","350"),q(2,"Which power of ten takes 0.7 to 700","1000","Three places")]},
  {id:"y5u1p4",label:"1.4",title:"Compare & Round",note:"Line up the points. Trailing zeros cost nothing.",items:[
    q(0,"Larger: 0.5 or 0.35 — type it","0.5"),q(0,"Larger: 0.7 or 0.70","equal"),q(0,"Round 4.7 to the nearest whole","5"),q(0,"Round 0.34 to the nearest tenth","0.3"),q(0,"Round 128 to the nearest ten","130"),q(0,"Round 0.86 to the nearest tenth","0.9"),
    q(1,"Round 2.451 to the nearest hundredth","2.45"),q(1,"Round 9.96 to the nearest tenth","10"),q(1,"Larger: 0.406 or 0.41","0.41"),q(1,"Round 0.0475 to the nearest thousandth","0.048"),q(1,"Round 4,829 to the nearest hundred","4800"),
    q(2,"A number rounds to 5.3 to the nearest tenth. Type its smallest possible value","5.25"),q(2,"Round 0.999 to the nearest hundredth","1")]},
  {id:"y5u1p5",label:"Fri",title:"Decimal Duel & Zoom Atlas",note:"Enrichment. Build big, then justify it.",items:[
    q(0,"Biggest number from digits 4, 7, 1, 9","9741"),q(0,"Smallest number from those digits","1479"),
    q(1,"Biggest decimal under 1 from 4, 7, 1 — type it","0.741"),q(1,"A model is 100 times a 3 cm object. Its size in cm","300"),
    q(2,"An object is drawn one thousandth of true size. True length 4000 mm, so drawn length in mm","4"),q(2,"Digits 2, 5, 8: the value closest to 1 you can build as 0.___","0.852","Biggest is nearest to one"),q(2,"How many times bigger is 8.5 than 0.085","100")]}],
 2:[
  {id:"y5u2p1",label:"1.1",title:"Multiples of Ten",note:"Get these automatic and the algorithm gets easy.",items:[
    q(0,"20 × 30","600"),q(0,"40 × 50","2000"),q(0,"60 × 70","4200"),q(0,"30 × 300","9000"),q(0,"80 × 20","1600"),q(0,"90 × 40","3600"),
    q(1,"400 × 60","24000"),q(1,"700 × 800","560000"),q(1,"25 × 40","1000"),q(1,"120 × 50","6000"),q(1,"36 × 200","7200"),
    q(2,"250 × 400","100000"),q(2,"1250 × 80","100000")]},
  {id:"y5u2p2",label:"1.2",title:"Partial Products",note:"Four boxes, four numbers, one total.",items:[
    q(0,"23 × 10","230"),q(0,"23 × 4","92"),q(0,"Add 230 and 92","322"),q(0,"So 23 × 14 is","322"),q(0,"31 × 20","620"),q(0,"31 × 2","62"),
    q(1,"31 × 22","682"),q(1,"45 × 23","1035"),q(1,"64 × 35","2240"),q(1,"128 × 12","1536"),q(1,"216 × 30","6480"),
    q(2,"216 × 34","7344"),q(2,"347 × 26","9022")]},
  {id:"y5u2p3",label:"1.3",title:"The Standard Algorithm",note:"Stack it, but keep an estimate in your head.",items:[
    q(0,"14 × 12","168"),q(0,"25 × 11","275"),q(0,"32 × 21","672"),q(0,"18 × 15","270"),q(0,"43 × 13","559"),q(0,"52 × 12","624"),
    q(1,"237 × 45","10665"),q(1,"418 × 27","11286"),q(1,"506 × 34","17204"),q(1,"725 × 18","13050"),q(1,"1234 × 12","14808"),
    q(2,"2450 × 36","88200"),q(2,"3081 × 47","144807")]},
  {id:"y5u2p4",label:"1.4",title:"Estimate to Check",note:"Round both numbers, multiply, compare. A wrong answer should look wrong.",items:[
    q(0,"Estimate 19 × 21 by rounding both","400"),q(0,"Estimate 48 × 52","2500"),q(0,"Estimate 31 × 29","900"),q(0,"Estimate 39 × 11","400"),q(0,"Estimate 62 × 18","1200"),q(0,"Estimate 78 × 22","1600"),
    q(1,"Estimate 412 × 19","8000"),q(1,"Estimate 289 × 31","9000"),q(1,"True value of 412 × 19","7828"),q(1,"Estimate 5,120 × 48","250000"),q(1,"Estimate 197 × 203","40000"),
    q(2,"Someone says 34 × 26 = 68. Type the real answer","884","They multiplied by 2, not 26"),q(2,"Someone says 250 × 40 = 1000. Type the real answer","10000")]},
  {id:"y5u2p5",label:"Fri",title:"Poker & Floor Plan",note:"Enrichment. Area two ways, and they must agree.",items:[
    q(0,"Area of a 12 by 10 room, in squares","120"),q(0,"Area of a 20 by 15 room","300"),
    q(1,"A 14 by 12 room scaled by 3: new length","42"),q(1,"That scaled room's area","1512","42 by 36"),
    q(2,"Digits 3, 4, 7, 2 — biggest product from two 2-digit numbers: type it","3298","73 × 42"),q(2,"Area of a 26 by 34 room","884"),q(2,"Double both sides of a 15 by 20 room. Area multiplies by","4")]}],
 3:[
  {id:"y5u3p1",label:"1.1",title:"How Many Fit",note:"Estimate before you divide anything.",items:[
    q(0,"How many 10s in 80","8"),q(0,"How many 20s in 60","3"),q(0,"How many 30s in 90","3"),q(0,"90 ÷ 30","3"),q(0,"120 ÷ 40","3"),q(0,"200 ÷ 50","4"),
    q(1,"About how many 30s in 400","13","13 thirties is 390"),q(1,"600 ÷ 20","30"),q(1,"840 ÷ 40","21"),q(1,"960 ÷ 30","32"),q(1,"1200 ÷ 60","20"),
    q(2,"About how many 48s in 2,400","50"),q(2,"7,200 ÷ 90","80")]},
  {id:"y5u3p2",label:"1.2",title:"Long Division",note:"Divide, multiply, subtract, bring down. Every answer here comes out whole.",items:[
    q(0,"84 ÷ 12","7"),q(0,"96 ÷ 16","6"),q(0,"75 ÷ 15","5"),q(0,"91 ÷ 13","7"),q(0,"144 ÷ 12","12"),q(0,"156 ÷ 13","12"),
    q(1,"552 ÷ 24","23"),q(1,"784 ÷ 28","28"),q(1,"945 ÷ 35","27"),q(1,"1,224 ÷ 36","34"),q(1,"1,472 ÷ 32","46"),
    q(2,"3,036 ÷ 23","132"),q(2,"5,152 ÷ 46","112")]},
  {id:"y5u3p3",label:"1.3",title:"Four Digits",note:"Longer, not harder. Watch the place where the quotient has a zero.",items:[
    q(0,"1,000 ÷ 10","100"),q(0,"2,400 ÷ 12","200"),q(0,"3,600 ÷ 12","300"),q(0,"4,200 ÷ 20","210"),q(0,"5,000 ÷ 25","200"),q(0,"6,300 ÷ 30","210"),
    q(1,"3,384 ÷ 24","141"),q(1,"4,536 ÷ 21","216"),q(1,"7,308 ÷ 36","203","Note the zero in the middle"),q(1,"8,464 ÷ 46","184"),q(1,"9,072 ÷ 24","378"),
    q(2,"9,594 ÷ 26","369"),q(2,"6,120 ÷ 24","255")]},
  {id:"y5u3p4",label:"1.4",title:"Remainders",note:"The situation decides what happens to the leftover.",items:[
    q(0,"17 ÷ 5 — the remainder","2"),q(0,"17 ÷ 5 — the whole-number quotient","3"),q(0,"23 ÷ 4 — remainder","3"),q(0,"50 ÷ 7 — remainder","1"),q(0,"100 ÷ 9 — remainder","1"),q(0,"45 ÷ 6 — remainder","3"),
    q(1,"127 children, 30 per bus. Buses needed","5","You cannot leave seven behind"),q(1,"127 ÷ 30 — the remainder","7"),q(1,"$100 shared by 8 — dollars each, rounded down","12"),q(1,"95 eggs into boxes of 12 — full boxes","7"),q(1,"95 eggs into boxes of 12 — eggs left over","11"),
    q(2,"17 ÷ 4 as a mixed number — type the fraction part as a/b","1/4"),q(2,"A rope of 250 cm cut into 40 cm pieces. Whole pieces","6")]},
  {id:"y5u3p5",label:"Fri",title:"Quotient Hunt & Road Trip",note:"Enrichment. Estimate out loud before computing.",items:[
    q(0,"600 miles over 3 days — miles a day","200"),q(0,"$120 for 4 days of food — dollars a day","30"),
    q(1,"1,200 miles at 60 mph — hours driving","20"),q(1,"A tank does 400 miles. Tanks needed for 1,000 miles","3","Two and a half is not enough"),
    q(2,"$1,440 shared over 12 days","120"),q(2,"960 miles over 4 days, 8 hours a day — average mph","30"),q(2,"Estimate 4,850 ÷ 48 to the nearest ten","100")]}],
 4:[
  {id:"y5u4p1",label:"1.1",title:"Adding Decimals",note:"Line up the points, fill with zeros, then add as normal.",items:[
    q(0,"0.3 + 0.4","0.7"),q(0,"1.2 + 2.5","3.7"),q(0,"0.25 + 0.25","0.5"),q(0,"3.5 + 1.5","5"),q(0,"0.6 + 0.9","1.5"),q(0,"2.75 + 1.25","4"),
    q(1,"3.5 + 0.47","3.97"),q(1,"12.6 + 4.85","17.45"),q(1,"0.125 + 0.875","1"),q(1,"9.4 + 0.68","10.08"),q(1,"$14.75 + $8.60 — type the number","23.35"),
    q(2,"2.5 + 3.75 + 0.125","6.375"),q(2,"What adds to 4.6 to make 10","5.4")]},
  {id:"y5u4p2",label:"1.2",title:"Subtracting Decimals",note:"Same alignment. Fill the gaps with zeros before you borrow.",items:[
    q(0,"0.9 − 0.4","0.5"),q(0,"3.7 − 1.2","2.5"),q(0,"1 − 0.5","0.5"),q(0,"2.5 − 0.5","2"),q(0,"0.75 − 0.25","0.5"),q(0,"5.5 − 2.5","3"),
    q(1,"4 − 1.35","2.65"),q(1,"10 − 0.07","9.93"),q(1,"8.2 − 3.45","4.75"),q(1,"$20 − $13.68 — type the number","6.32"),q(1,"6.05 − 2.5","3.55"),
    q(2,"12.4 − 7.856","4.544"),q(2,"A 2.5 m board with 0.85 m cut off — metres left","1.65")]},
  {id:"y5u4p3",label:"1.3",title:"Multiplying Decimals",note:"Multiply the digits, then count the decimal places.",items:[
    q(0,"0.5 × 4","2"),q(0,"0.2 × 6","1.2"),q(0,"1.5 × 2","3"),q(0,"0.25 × 4","1"),q(0,"3 × 0.1","0.3"),q(0,"0.5 × 10","5"),
    q(1,"0.4 × 0.2","0.08","Two decimal digits in, two out"),q(1,"1.2 × 0.5","0.6"),q(1,"2.5 × 1.4","3.5"),q(1,"0.06 × 40","2.4"),q(1,"3.2 × 2.5","8"),
    q(2,"0.125 × 8","1"),q(2,"1.25 × 0.8","1")]},
  {id:"y5u4p4",label:"1.4",title:"Dividing Decimals",note:"Shift both numbers the same number of places, then divide as usual.",items:[
    q(0,"4.8 ÷ 2","2.4"),q(0,"0.9 ÷ 3","0.3"),q(0,"6.4 ÷ 4","1.6"),q(0,"2.5 ÷ 5","0.5"),q(0,"0.36 ÷ 6","0.06"),q(0,"7.2 ÷ 8","0.9"),
    q(1,"6 ÷ 0.5","12","How many halves in six"),q(1,"4 ÷ 0.25","16"),q(1,"1.5 ÷ 0.5","3"),q(1,"9.6 ÷ 1.2","8"),q(1,"$7.50 shared by 3 — type the number","2.5"),
    q(2,"0.144 ÷ 0.12","1.2"),q(2,"A 4.5 m rope cut into 0.75 m pieces — how many","6")]},
  {id:"y5u4p5",label:"Fri",title:"Unit Price Investigation",note:"Enrichment. Price per unit is the only fair comparison.",items:[
    q(0,"$6 for 2 kg — price per kg","3"),q(0,"$10 for 5 L — price per litre","2"),
    q(1,"$4.50 for 3 kg — price per kg","1.5"),q(1,"$7.20 for 0.8 kg — price per kg","9"),
    q(2,"Box A: $5 for 400 g. Box B: $9 for 800 g. Price per 100 g of B","1.125"),q(2,"Same boxes — price per 100 g of A","1.25"),q(2,"So which box is better value — type A or B","B")]}],
 5:[
  {id:"y5u5p1",label:"1.1",title:"Equivalent Fractions",note:"Same amount, cut more finely. Type fractions like 3/4.",items:[
    q(0,"1/2 = ?/4 — type the numerator","2"),q(0,"1/2 = ?/6","3"),q(0,"1/3 = ?/9","3"),q(0,"2/3 = ?/6","4"),q(0,"3/4 = ?/8","6"),q(0,"1/5 = ?/10","2"),
    q(1,"2/5 = ?/15","6"),q(1,"3/8 = ?/24","9"),q(1,"Simplify 6/8 — type as a/b","3/4"),q(1,"Simplify 10/15","2/3"),q(1,"Simplify 12/16","3/4"),
    q(2,"Smallest common denominator of 1/4 and 1/6","12"),q(2,"Smallest common denominator of 2/3 and 3/5","15")]},
  {id:"y5u5p2",label:"1.2",title:"Adding Unlike Fractions",note:"Convert both, then add numerators only. Answers here stay under two.",items:[
    q(0,"1/4 + 1/4 — type as a/b","1/2"),q(0,"1/3 + 1/3","2/3"),q(0,"1/8 + 3/8","1/2"),q(0,"2/5 + 1/5","3/5"),q(0,"1/6 + 1/6","1/3"),q(0,"3/10 + 2/10","1/2"),
    q(1,"1/2 + 1/4","3/4"),q(1,"1/3 + 1/6","1/2"),q(1,"2/3 + 1/6","5/6"),q(1,"1/4 + 2/5","13/20"),q(1,"3/8 + 1/4","5/8"),
    q(2,"2/3 + 3/4","17/12"),q(2,"1/2 + 1/3 + 1/6","1")]},
  {id:"y5u5p3",label:"1.3",title:"Subtracting Fractions",note:"Same conversion. Borrowing turns one whole into a pile of pieces.",items:[
    q(0,"3/4 − 1/4 — type as a/b","1/2"),q(0,"5/6 − 1/6","2/3"),q(0,"7/8 − 3/8","1/2"),q(0,"1 − 1/2","1/2"),q(0,"1 − 1/4","3/4"),q(0,"4/5 − 2/5","2/5"),
    q(1,"1/2 − 1/3","1/6"),q(1,"3/4 − 1/3","5/12"),q(1,"1 − 3/8","5/8"),q(1,"5/6 − 1/2","1/3"),q(1,"2/3 − 1/4","5/12"),
    q(2,"2 − 5/8 — type as a/b","11/8"),q(2,"1 1/4 − 2/3 — type as a/b","7/12")]},
  {id:"y5u5p4",label:"1.4",title:"Benchmarks",note:"Is it nearer 0, a half, or 1? Estimate before you compute.",items:[
    q(0,"Is 1/8 nearer 0 or 1 — type 0 or 1","0"),q(0,"Is 7/8 nearer 0 or 1","1"),q(0,"Is 4/8 exactly what — type as a/b","1/2"),q(0,"Is 5/6 nearer 1/2 or 1 — type 1/2 or 1","1"),q(0,"Is 2/5 nearer 0 or 1/2 — type 0 or 1/2","1/2"),q(0,"Larger: 3/4 or 1/2 — type it","3/4"),
    q(1,"About how much is 7/8 + 1/8","1"),q(1,"Estimate 5/6 + 1/8 to the nearest half","1"),q(1,"Larger: 5/8 or 2/3 — type it","2/3"),q(1,"Larger: 3/5 or 5/8","5/8"),q(1,"Order 1/3, 1/2, 2/5 — type the smallest","1/3"),
    q(2,"Estimate 11/12 + 7/8 to the nearest whole","2"),q(2,"Is 2/3 + 1/4 more or less than 1 — type more or less","less")]},
  {id:"y5u5p5",label:"Fri",title:"Double the Recipe",note:"Enrichment. Real amounts, doubled and halved.",items:[
    q(0,"Double 1/4 cup — type as a/b","1/2"),q(0,"Double 1/2 cup","1"),
    q(1,"Half of 3/4 cup — type as a/b","3/8"),q(1,"Double 2/3 cup — type as a/b","4/3"),
    q(2,"A recipe needs 3/4 cup and you have 1/2 — how much more, as a/b","1/4"),q(2,"Triple 3/8 cup — type as a/b","9/8"),q(2,"1/2 cup + 1/3 cup + 1/4 cup — type as a/b","13/12")]}],
 6:[
  {id:"y5u6p1",label:"1.1",title:"Fraction of a Number",note:"Divide by the bottom, multiply by the top.",items:[
    q(0,"1/2 of 10","5"),q(0,"1/3 of 9","3"),q(0,"1/4 of 12","3"),q(0,"1/5 of 20","4"),q(0,"1/2 of 30","15"),q(0,"1/6 of 18","3"),
    q(1,"2/3 of 12","8"),q(1,"3/4 of 20","15"),q(1,"2/5 of 35","14"),q(1,"5/6 of 24","20"),q(1,"3/8 of 40","15"),
    q(2,"2/3 of 45","30"),q(2,"7/10 of 250","175")]},
  {id:"y5u6p2",label:"1.2",title:"Fraction × Fraction",note:"Multiply across. Type answers like 1/6.",items:[
    q(0,"1/2 × 1/2 — type as a/b","1/4"),q(0,"1/2 × 1/3","1/6"),q(0,"1/3 × 1/3","1/9"),q(0,"1/2 × 1/4","1/8"),q(0,"1/5 × 1/2","1/10"),q(0,"1/4 × 1/4","1/16"),
    q(1,"2/3 × 1/2","1/3"),q(1,"3/4 × 2/3","1/2"),q(1,"2/5 × 3/4","3/10"),q(1,"5/6 × 3/5","1/2"),q(1,"3/8 × 4/9","1/6"),
    q(2,"2/3 × 3/4 × 1/2","1/4"),q(2,"Area of a rectangle 2/3 by 3/5 — type as a/b","2/5")]},
  {id:"y5u6p3",label:"1.3",title:"Scaling",note:"Predict bigger or smaller before you calculate.",items:[
    q(0,"6 × 2 — bigger or smaller than 6","bigger"),q(0,"6 × 1/2 — bigger or smaller","smaller"),q(0,"6 × 1 — bigger, smaller or same","same"),q(0,"6 × 1/2","3"),q(0,"8 × 1/4","2"),q(0,"10 × 3/5","6"),
    q(1,"20 × 3/4 — bigger or smaller than 20","smaller"),q(1,"20 × 5/4 — bigger or smaller","bigger"),q(1,"20 × 5/4","25"),q(1,"12 × 7/6","14"),q(1,"Why does × 4/4 change nothing — type the value of 4/4","1"),
    q(2,"Larger: 15 × 3/4 or 15 × 4/3 — type the fraction","4/3"),q(2,"36 × 5/6","30")]},
  {id:"y5u6p4",label:"1.4",title:"Dividing with Fractions",note:"How many of these fit inside that?",items:[
    q(0,"How many halves in 1","2"),q(0,"How many halves in 3","6"),q(0,"How many quarters in 1","4"),q(0,"How many quarters in 2","8"),q(0,"How many thirds in 2","6"),q(0,"4 ÷ 1/2","8"),
    q(1,"5 ÷ 1/4","20"),q(1,"1/2 ÷ 4 — type as a/b","1/8"),q(1,"1/3 ÷ 2 — type as a/b","1/6"),q(1,"3/4 as a division — type 3÷4 as a decimal","0.75"),q(1,"7 ÷ 1/3","21"),
    q(2,"A 3 m ribbon cut into 1/4 m pieces — how many","12"),q(2,"1/4 of a pizza shared by 3 — each gets, as a/b","1/12")]},
  {id:"y5u6p5",label:"Fri",title:"Half a Garden",note:"Enrichment. Fractions of real areas.",items:[
    q(0,"Half of a 12 m² bed","6"),q(0,"A quarter of 20 m²","5"),
    q(1,"2/3 of a 18 m² bed","12"),q(1,"A bed 1/2 m by 3/4 m — area as a/b","3/8"),
    q(2,"3/5 of a 45 m² plot","27"),q(2,"A 2/3 m by 3/4 m bed — area as a/b","1/2"),q(2,"How many 1/4 m² tiles cover 3 m²","12")]}],
 7:[
  {id:"y5u7p1",label:"1.1",title:"Converting Units",note:"Every conversion is a power of ten.",items:[
    q(0,"1 m in cm","100"),q(0,"1 km in m","1000"),q(0,"1 kg in g","1000"),q(0,"2 m in cm","200"),q(0,"3 km in m","3000"),q(0,"5 L in mL","5000"),
    q(1,"250 cm in m","2.5"),q(1,"1,500 g in kg","1.5"),q(1,"0.75 km in m","750"),q(1,"3,200 mL in L","3.2"),q(1,"45 mm in cm","4.5"),
    q(2,"2.5 kg in mg — type the number","2500000"),q(2,"Add 1.2 m and 85 cm — answer in cm","205")]},
  {id:"y5u7p2",label:"1.2",title:"Counting Cubes",note:"Volume is a count before it is a formula.",items:[
    q(0,"A 2 by 2 by 2 cube — volume","8"),q(0,"A 3 by 1 by 1 box","3"),q(0,"A 2 by 3 by 1 box","6"),q(0,"A 4 by 2 by 1 box","8"),q(0,"A 3 by 3 by 1 box","9"),q(0,"A 1 by 1 by 5 box","5"),
    q(1,"A 4 by 3 by 2 box","24"),q(1,"A 5 by 4 by 3 box","60"),q(1,"One layer of a 5 by 4 box holds","20"),q(1,"That box 3 layers high","60"),q(1,"A 6 by 5 by 2 box","60"),
    q(2,"A 10 by 8 by 4 box","320"),q(2,"Volume 48, base 4 by 3 — the height","4")]},
  {id:"y5u7p3",label:"1.3",title:"Volume Formulas",note:"Length × width × height, and a missing edge you have to find.",items:[
    q(0,"2 × 3 × 4","24"),q(0,"5 × 5 × 2","50"),q(0,"10 × 2 × 3","60"),q(0,"1 × 7 × 4","28"),q(0,"6 × 2 × 2","24"),q(0,"3 × 3 × 3","27"),
    q(1,"Volume 120, base area 20 — the height","6"),q(1,"Volume 100, height 5 — the base area","20"),q(1,"A 12 by 5 by 4 tank","240"),q(1,"Volume 72, edges 6 and 3 — the third edge","4"),q(1,"A cube of edge 4","64"),
    q(2,"Two boxes: 4×3×2 and 5×2×2 — total volume","44"),q(2,"A cube of volume 125 — its edge","5")]},
  {id:"y5u7p4",label:"1.4",title:"Line Plots",note:"Fractional measurements, plotted and then reasoned about.",items:[
    q(0,"Four items at 1/2 each — total","2"),q(0,"Eight items at 1/4 each — total","2"),q(0,"Two items at 3/4 each — total, as a/b","3/2"),q(0,"Three items at 1/3 each","1"),q(0,"Six items at 1/2 each","3"),q(0,"Longest of 1/4, 1/2, 3/8 — type it","1/2"),
    q(1,"1/2 + 1/4 + 1/4 — total","1"),q(1,"Range of 1/8 and 7/8 — type as a/b","3/4"),q(1,"Five items totalling 5/2 — the mean, as a/b","1/2"),q(1,"Difference between 7/8 and 3/8 — as a/b","1/2"),q(1,"Four measurements of 3/4 — total","3"),
    q(2,"Six pencils totalling 9/2 inches, shared equally — each, as a/b","3/4"),q(2,"Two at 1/8, three at 1/4, one at 1/2 — total, as a/b","3/2")]},
  {id:"y5u7p5",label:"Fri",title:"Box It",note:"Enrichment. Same volume, different shapes.",items:[
    q(0,"A box of volume 24: 2 by 3 by ?","4"),q(0,"A box of volume 24: 1 by 4 by ?","6"),
    q(1,"A box of volume 36: 3 by 3 by ?","4"),q(1,"A box of volume 60: 5 by 4 by ?","3"),
    q(2,"How many whole boxes of volume 8 fit in one of volume 96","12"),q(2,"A cube with the same volume as a 2×4×8 box — its edge","4"),q(2,"Double every edge of a 2×3×4 box. Volume multiplies by","8")]}],
 8:[
  {id:"y5u8p1",label:"1.1",title:"Plotting Points",note:"Along the hall, then up the stairs. Type coordinates like 3,5.",items:[
    q(0,"In (3, 5), the number along","3"),q(0,"In (3, 5), the number up","5"),q(0,"The origin — type it as a,b","0,0"),q(0,"4 along, 2 up — type as a,b","4,2"),q(0,"0 along, 6 up — type as a,b","0,6"),q(0,"In (7, 1), the x value","7"),
    q(1,"Distance from (2,3) to (7,3)","5"),q(1,"Distance from (4,1) to (4,8)","7"),q(1,"(1,2), (1,6), (5,6), (5,2) — how many sides","4"),q(1,"That shape's side length along the bottom","4"),q(1,"A point 3 right of (2,5) — type as a,b","5,5"),
    q(2,"(1,1), (1,5), (6,5), (6,1) — the area","20"),q(2,"Perimeter of that rectangle","18")]},
  {id:"y5u8p2",label:"1.2",title:"Patterns as Points",note:"Two rules, paired term by term.",items:[
    q(0,"Rule + 3 from 0: 0, 3, 6, ?","9"),q(0,"Rule + 6 from 0: 0, 6, 12, ?","18"),q(0,"Rule + 2 from 1: 1, 3, 5, ?","7"),q(0,"Rule + 5 from 0 — the third term","10"),q(0,"Rule + 4 from 2 — the fourth term","14"),q(0,"Rule + 10 from 0 — the fifth term","40"),
    q(1,"Rules +3 and +6 from 0. Second is how many times the first","2"),q(1,"Pair the third terms of +3 and +6 from 0 — type as a,b","6,12"),q(1,"Rules +2 and +4 from 0 — pair the fourth terms as a,b","6,12"),q(1,"Rule + 5 from 0 — the tenth term","45"),q(1,"Rule × 2 from 1 — the fifth term","16"),
    q(2,"Rules +3 and +9 — second is how many times the first","3"),q(2,"Rule + 7 from 3 — the twentieth term","136")]},
  {id:"y5u8p3",label:"1.3",title:"Quadrilaterals",note:"Properties first, names second.",items:[
    q(0,"Sides on a quadrilateral","4"),q(0,"Right angles in a rectangle","4"),q(0,"Equal sides on a square","4"),q(0,"Pairs of parallel sides in a parallelogram","2"),q(0,"Sides on a triangle","3"),q(0,"Right angles in a square","4"),
    q(1,"Is every square a rectangle — yes or no","yes"),q(1,"Is every rectangle a square — yes or no","no"),q(1,"Is every rectangle a parallelogram — yes or no","yes"),q(1,"Angles in any triangle add to","180"),q(1,"Angles in any quadrilateral add to","360"),
    q(2,"A quadrilateral with exactly one pair of parallel sides — type its name","trapezoid"),q(2,"A rhombus with right angles is also called a","square")]},
  {id:"y5u8p4",label:"1.4",title:"Always, Sometimes, Never",note:"Judge the statement, then justify it out loud.",items:[
    q(0,"A square is a rectangle — always, sometimes or never","always"),q(0,"A rectangle is a square","sometimes"),q(0,"A triangle has four sides","never"),q(0,"A parallelogram has parallel sides","always"),q(0,"A quadrilateral has a right angle","sometimes"),q(0,"A square is a quadrilateral","always"),
    q(1,"A rhombus is a square","sometimes"),q(1,"A trapezoid is a parallelogram","sometimes"),q(1,"A rectangle's diagonals are equal","always"),q(1,"A triangle has two right angles","never"),q(1,"A parallelogram is a rectangle","sometimes"),
    q(2,"Every rhombus is a parallelogram","always"),q(2,"A shape with four equal sides is a square","sometimes")]},
  {id:"y5u8p5",label:"Fri",title:"Map My Block",note:"Enrichment. Real places, ordered pairs.",items:[
    q(0,"Landmarks on a ten-stop map","10"),q(0,"The origin of your map — type as a,b","0,0"),
    q(1,"From (2,3), move 4 right and 1 up — type as a,b","6,4"),q(1,"Blocks from (1,1) to (1,9)","8"),
    q(2,"From (0,0) to (6,8) going only along and up — total blocks","14"),q(2,"A park at (3,4) and a school at (9,4) — blocks apart","6"),q(2,"Rule: each block is 2 units. (5,5) is how many units from the origin along x","10")]}]
};

/* Year Two, Weeks 2+. Merged into PRACTICE_Y5 below so every lookup, the
 * mastery engine and Teacher HQ keep working unchanged. */
const PRACTICE_Y5_W = {
 1:[
  {id:"y5u1w2p1",w:2,label:"2.1",title:"Multiply by Ten",note:"The digits move. The point stays exactly where it was.",items:[
    q(0,"4.2 × 10","42"),q(0,"4.2 × 100","420"),q(0,"0.7 × 10","7"),q(0,"0.7 × 100","70"),q(0,"3 × 10","30"),q(0,"3 × 1000","3000"),
    q(1,"0.06 × 100","6"),q(1,"2.4 × 1000","2400"),q(1,"0.035 × 100","3.5"),q(1,"12.5 × 10","125"),q(1,"0.008 × 1000","8"),
    q(2,"0.0405 × 1000","40.5"),q(2,"Which power of ten takes 0.7 to 7000","10000")]},
  {id:"y5u1w2p2",w:2,label:"2.2",title:"Divide by Ten",note:"The same journey in reverse.",items:[
    q(0,"42 ÷ 10","4.2"),q(0,"420 ÷ 100","4.2"),q(0,"7 ÷ 10","0.7"),q(0,"70 ÷ 100","0.7"),q(0,"300 ÷ 10","30"),q(0,"5000 ÷ 1000","5"),
    q(1,"6 ÷ 100","0.06"),q(1,"850 ÷ 100","8.5"),q(1,"7 ÷ 1000","0.007"),q(1,"125 ÷ 10","12.5"),q(1,"9 ÷ 10","0.9"),
    q(2,"40.5 ÷ 1000","0.0405"),q(2,"0.5 ÷ 100","0.005")]},
  {id:"y5u1w2p3",w:2,label:"2.3",title:"Exponent Shorthand",note:"10³ means three tens multiplied, which is three places.",items:[
    q(0,"10¹","10"),q(0,"10²","100"),q(0,"10³","1000"),q(0,"10⁴","10000"),q(0,"Zeros in 10⁵","5"),q(0,"10⁶","1000000"),
    q(1,"3 × 10²","300"),q(1,"4.5 × 10³","4500"),q(1,"7 × 10⁴","70000"),q(1,"0.6 × 10³","600"),q(1,"2.5 × 10²","250"),
    q(2,"10³ × 10²","100000"),q(2,"0.035 × 10⁴","350")]},
  {id:"y5u1w2p4",w:2,label:"2.4",title:"Patterns in Zeros",note:"Why 4 × 100 ends in two zeros and 0.4 × 100 does not.",items:[
    q(0,"4 × 100","400"),q(0,"0.4 × 100","40"),q(0,"40 × 100","4000"),q(0,"0.04 × 100","4"),q(0,"Zeros at the end of 4 × 1000","3"),q(0,"0.4 × 1000","400"),
    q(1,"25 × 100","2500"),q(1,"0.25 × 100","25"),q(1,"0.025 × 100","2.5"),q(1,"1.5 × 1000","1500"),q(1,"0.015 × 1000","15"),
    q(2,"0.0025 × 10000","25"),q(2,"How many times bigger is 8.5 than 0.085","100")]},
  {id:"y5u1w2p5",w:2,label:"Fri",title:"Zoom Atlas Begins",note:"Pick the object. Draw it at true size first.",items:[
    q(0,"A 3 cm object at 10 times — cm","30"),q(0,"At 100 times — cm","300"),
    q(1,"A 4 m object at one hundredth — cm","4"),q(1,"A 250 cm object at one tenth — cm","25"),
    q(2,"A 4000 mm object at one thousandth — mm","4"),q(2,"A 2.5 cm object at 1000 times — metres","25"),q(2,"From 0.5 mm to 5 m — the multiplier","10000")]}
 ],
 2:[
  {id:"y5u2w2p1",w:2,label:"2.1",title:"Multiples of Ten First",note:"40 × 60 before 43 × 67. Every time.",items:[
    q(0,"20 × 30","600"),q(0,"40 × 60","2400"),q(0,"50 × 50","2500"),q(0,"70 × 30","2100"),q(0,"80 × 40","3200"),q(0,"90 × 90","8100"),
    q(1,"400 × 70","28000"),q(1,"600 × 500","300000"),q(1,"250 × 40","10000"),q(1,"120 × 60","7200"),q(1,"35 × 200","7000"),
    q(2,"1250 × 80","100000"),q(2,"2500 × 400","1000000")]},
  {id:"y5u2w2p2",w:2,label:"2.2",title:"Estimate, Then Compute",note:"Round both, multiply, then do it properly and compare.",items:[
    q(0,"Estimate 19 × 21","400"),q(0,"Estimate 48 × 52","2500"),q(0,"Estimate 31 × 29","900"),q(0,"Estimate 62 × 18","1200"),q(0,"Estimate 78 × 22","1600"),q(0,"Estimate 39 × 11","400"),
    q(1,"Estimate 412 × 19","8000"),q(1,"True value of 412 × 19","7828"),q(1,"Estimate 289 × 31","9000"),q(1,"True value of 289 × 31","8959"),q(1,"Estimate 197 × 203","40000"),
    q(2,"Estimate 5,120 × 48","250000"),q(2,"Someone says 34 × 26 = 68. The real answer","884")]},
  {id:"y5u2w2p3",w:2,label:"2.3",title:"Four Digits by Two",note:"Longer, not harder. Keep the estimate in your head.",items:[
    q(0,"1000 × 10","10000"),q(0,"2000 × 20","40000"),q(0,"1200 × 10","12000"),q(0,"3000 × 30","90000"),q(0,"1500 × 20","30000"),q(0,"2500 × 10","25000"),
    q(1,"1234 × 12","14808"),q(1,"2450 × 36","88200"),q(1,"1875 × 24","45000"),q(1,"3081 × 47","144807"),q(1,"4206 × 15","63090"),
    q(2,"5678 × 43","244154"),q(2,"9999 × 99","989901")]},
  {id:"y5u2w2p4",w:2,label:"2.4",title:"Catch the Error",note:"Given a wrong worked answer, find the line it went wrong.",items:[
    q(0,"23 × 14","322"),q(0,"23 × 4","92"),q(0,"23 × 10","230"),q(0,"92 + 230","322"),q(0,"31 × 22","682"),q(0,"45 × 23","1035"),
    q(1,"Someone got 23 × 14 = 92. What did they forget — type the missing partial","230"),q(1,"Someone got 45 × 23 = 135. The real answer","1035"),q(1,"Someone got 38 × 24 = 152. The real answer","912"),q(1,"Someone got 56 × 27 = 392. The real answer","1512"),q(1,"63 × 48","3024"),
    q(2,"237 × 45","10665"),q(2,"Someone got 237 × 45 = 1185. The missing partial product","9480")]},
  {id:"y5u2w2p5",w:2,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–2. 85% to keep flying.",items:[
    q(0,"40 × 60","2400"),q(0,"23 × 14","322"),
    q(1,"45 × 23","1035"),q(1,"237 × 45","10665"),q(1,"Estimate 412 × 19","8000"),q(1,"1234 × 12","14808"),q(1,"506 × 34","17204"),
    q(2,"2450 × 36","88200")]}
 ],
 3:[
  {id:"y5u3w2p1",w:2,label:"2.1",title:"Four Digits by Two",note:"Where the first digit of the quotient goes, and why.",items:[
    q(0,"1200 ÷ 12","100"),q(0,"2400 ÷ 12","200"),q(0,"3600 ÷ 12","300"),q(0,"1000 ÷ 10","100"),q(0,"4200 ÷ 20","210"),q(0,"5000 ÷ 25","200"),
    q(1,"4536 ÷ 21","216"),q(1,"8464 ÷ 46","184"),q(1,"9072 ÷ 24","378"),q(1,"3384 ÷ 24","141"),q(1,"6120 ÷ 24","255"),
    q(2,"9594 ÷ 26","369"),q(2,"5152 ÷ 46","112")]},
  {id:"y5u3w2p2",w:2,label:"2.2",title:"Zeros in the Quotient",note:"The place that gets skipped is the place people lose.",items:[
    q(0,"600 ÷ 6","100"),q(0,"800 ÷ 8","100"),q(0,"606 ÷ 6","101"),q(0,"404 ÷ 4","101"),q(0,"900 ÷ 9","100"),q(0,"1000 ÷ 5","200"),
    q(1,"7308 ÷ 36","203"),q(1,"4080 ÷ 8","510"),q(1,"6036 ÷ 6","1006"),q(1,"2050 ÷ 25","82"),q(1,"5025 ÷ 25","201"),
    q(2,"12060 ÷ 60","201"),q(2,"8064 ÷ 32","252")]},
  {id:"y5u3w2p3",w:2,label:"2.3",title:"Estimate the Quotient",note:"A rough answer means a wrong one gets noticed.",items:[
    q(0,"Estimate 400 ÷ 20","20"),q(0,"Estimate 600 ÷ 30","20"),q(0,"Estimate 900 ÷ 30","30"),q(0,"Estimate 1200 ÷ 40","30"),q(0,"Estimate 800 ÷ 20","40"),q(0,"Estimate 1000 ÷ 50","20"),
    q(1,"Estimate 4850 ÷ 48 to the nearest ten","100"),q(1,"Estimate 3120 ÷ 39","80"),q(1,"Estimate 6300 ÷ 68 to the nearest ten","90"),q(1,"Estimate 2450 ÷ 51","50"),q(1,"Estimate 7800 ÷ 19 to the nearest hundred","400"),
    q(2,"True value of 3120 ÷ 39","80"),q(2,"True value of 4850 ÷ 50","97")]},
  {id:"y5u3w2p4",w:2,label:"2.4",title:"Divisors Near a Ten",note:"Rounding 29 to 30 makes the guessing quick.",items:[
    q(0,"600 ÷ 30","20"),q(0,"620 ÷ 20","31"),q(0,"900 ÷ 30","30"),q(0,"840 ÷ 40","21"),q(0,"960 ÷ 30","32"),q(0,"720 ÷ 20","36"),
    q(1,"812 ÷ 29","28"),q(1,"1178 ÷ 31","38"),q(1,"1449 ÷ 21","69"),q(1,"2451 ÷ 43","57"),q(1,"1764 ÷ 42","42"),
    q(2,"3196 ÷ 47","68"),q(2,"5688 ÷ 79","72")]},
  {id:"y5u3w2p5",w:2,label:"Fri",title:"Road Trip Budget Begins",note:"Pick the route, gather the real numbers.",items:[
    q(0,"600 miles over 3 days — miles a day","200"),q(0,"$120 over 4 days — dollars a day","30"),
    q(1,"1200 miles at 60 mph — hours","20"),q(1,"A tank does 400 miles — tanks for 1000 miles","3"),
    q(2,"$1440 over 12 days","120"),q(2,"960 miles over 4 days, 8 hours a day — average mph","30"),q(2,"2400 miles at 55 mph — hours, rounded up","44")]}
 ],
 4:[
  {id:"y5u4w2p1",w:2,label:"2.1",title:"Ignore the Point",note:"Multiply the digits first, then count the places.",items:[
    q(0,"5 × 4","20"),q(0,"0.5 × 4","2"),q(0,"12 × 5","60"),q(0,"1.2 × 5","6"),q(0,"25 × 4","100"),q(0,"0.25 × 4","1"),
    q(1,"0.4 × 0.2","0.08"),q(1,"1.2 × 0.5","0.6"),q(1,"2.5 × 1.4","3.5"),q(1,"0.06 × 40","2.4"),q(1,"3.2 × 2.5","8"),
    q(2,"0.125 × 8","1"),q(2,"1.25 × 0.8","1")]},
  {id:"y5u4w2p2",w:2,label:"2.2",title:"Count the Places",note:"Two decimal digits in, two decimal digits out.",items:[
    q(0,"Decimal digits in 0.4","1"),q(0,"In 0.25","2"),q(0,"In 1.234","3"),q(0,"0.2 × 0.3","0.06"),q(0,"0.5 × 0.2","0.1"),q(0,"0.1 × 0.1","0.01"),
    q(1,"0.25 × 0.4","0.1"),q(1,"1.5 × 0.02","0.03"),q(1,"0.12 × 0.5","0.06"),q(1,"2.4 × 0.25","0.6"),q(1,"0.75 × 0.8","0.6"),
    q(2,"0.125 × 0.4","0.05"),q(2,"1.25 × 1.6","2")]},
  {id:"y5u4w2p3",w:2,label:"2.3",title:"Place It by Estimating",note:"0.4 × 60 is about 24, so the point can only go one place.",items:[
    q(0,"Estimate 0.5 × 40","20"),q(0,"0.5 × 40","20"),q(0,"Estimate 2 × 30","60"),q(0,"1.9 × 30","57"),q(0,"Estimate 0.25 × 80","20"),q(0,"0.25 × 80","20"),
    q(1,"Estimate 0.4 × 60","24"),q(1,"0.4 × 62","24.8"),q(1,"Estimate 4.9 × 21","100"),q(1,"4.9 × 20","98"),q(1,"Estimate 0.9 × 150","135"),
    q(2,"0.75 × 240","180"),q(2,"Estimate 1.02 × 500","500")]},
  {id:"y5u4w2p4",w:2,label:"2.4",title:"Smaller Than You Started",note:"Why × 0.5 halves instead of doubling.",items:[
    q(0,"10 × 0.5","5"),q(0,"10 × 2","20"),q(0,"10 × 1","10"),q(0,"8 × 0.5","4"),q(0,"20 × 0.25","5"),q(0,"6 × 0.5","3"),
    q(1,"40 × 0.75 — bigger or smaller than 40","smaller"),q(1,"40 × 0.75","30"),q(1,"40 × 1.25 — bigger or smaller","bigger"),q(1,"40 × 1.25","50"),q(1,"100 × 0.1","10"),
    q(2,"Multiplying by a number under 1 makes it — type bigger or smaller","smaller"),q(2,"60 × 0.05","3")]},
  {id:"y5u4w2p5",w:2,label:"Fri",title:"Point Placement",note:"Given the digits, race to place the decimal point.",items:[
    q(0,"Digits 24, one decimal place — the number","2.4"),q(0,"Digits 24, two places","0.24"),
    q(1,"0.6 × 0.4 — digits 24, so the answer","0.24"),q(1,"6 × 0.4 — the answer","2.4"),
    q(2,"1.5 × 0.16 — digits 240, so the answer","0.24"),q(2,"0.15 × 1.6","0.24"),q(2,"15 × 0.016","0.24")]}
 ]
};
Object.keys(PRACTICE_Y5_W).forEach(k=>{ PRACTICE_Y5[k]=PRACTICE_Y5[k].concat(PRACTICE_Y5_W[k]); });

const PRACTICE_Y5_W2 = {
 4:[
  {id:"y5u4w3p1",w:3,label:"3.1",title:"Decimal ÷ Whole",note:"The point comes straight up. Nothing else moves.",items:[
    q(0,"4.8 ÷ 2","2.4"),q(0,"0.9 ÷ 3","0.3"),q(0,"6.4 ÷ 4","1.6"),q(0,"2.5 ÷ 5","0.5"),q(0,"0.36 ÷ 6","0.06"),q(0,"7.2 ÷ 8","0.9"),
    q(1,"9.6 ÷ 4","2.4"),q(1,"1.44 ÷ 12","0.12"),q(1,"5.25 ÷ 5","1.05"),q(1,"8.4 ÷ 7","1.2"),q(1,"0.72 ÷ 9","0.08"),
    q(2,"12.5 ÷ 4","3.125"),q(2,"7.35 ÷ 15","0.49")]},
  {id:"y5u4w3p2",w:3,label:"3.2",title:"Whole ÷ Decimal",note:"Shift both the same number of places, then divide as usual.",items:[
    q(0,"6 ÷ 0.5","12"),q(0,"4 ÷ 0.5","8"),q(0,"10 ÷ 0.5","20"),q(0,"4 ÷ 0.25","16"),q(0,"3 ÷ 0.5","6"),q(0,"2 ÷ 0.25","8"),
    q(1,"9 ÷ 0.3","30"),q(1,"12 ÷ 0.4","30"),q(1,"5 ÷ 0.125","40"),q(1,"7 ÷ 0.7","10"),q(1,"20 ÷ 0.8","25"),
    q(2,"15 ÷ 0.06","250"),q(2,"1 ÷ 0.004","250")]},
  {id:"y5u4w3p3",w:3,label:"3.3",title:"Decimal ÷ Decimal",note:"Same shift, applied to both numbers.",items:[
    q(0,"0.6 ÷ 0.2","3"),q(0,"0.8 ÷ 0.4","2"),q(0,"1.5 ÷ 0.5","3"),q(0,"0.9 ÷ 0.3","3"),q(0,"2.4 ÷ 0.6","4"),q(0,"1.2 ÷ 0.4","3"),
    q(1,"9.6 ÷ 1.2","8"),q(1,"0.144 ÷ 0.12","1.2"),q(1,"4.5 ÷ 1.5","3"),q(1,"6.25 ÷ 2.5","2.5"),q(1,"0.81 ÷ 0.09","9"),
    q(2,"7.5 ÷ 0.25","30"),q(2,"0.0144 ÷ 0.012","1.2")]},
  {id:"y5u4w3p4",w:3,label:"3.4",title:"Money Problems",note:"Unit prices and change, to the cent.",items:[
    q(0,"$6 for 2 — each","3"),q(0,"$10 for 4 — each","2.5"),q(0,"$9 for 3 — each","3"),q(0,"$20 − $12.50","7.5"),q(0,"$5 ÷ 4","1.25"),q(0,"3 at $2.50","7.5"),
    q(1,"$7.50 shared by 3","2.5"),q(1,"$4.50 for 3 kg — per kg","1.5"),q(1,"$7.20 for 0.8 kg — per kg","9"),q(1,"$20 − 3 at $4.99","5.03"),q(1,"$15 ÷ 12","1.25"),
    q(2,"$5 for 400 g — per 100 g","1.25"),q(2,"$9 for 800 g — per 100 g","1.125")]},
  {id:"y5u4w3p5",w:3,label:"Fri",title:"Unit Price Investigation Begins",note:"Collect real prices and sizes. No conclusions yet.",items:[
    q(0,"$8 for 4 — each","2"),q(0,"$12 for 6 — each","2"),
    q(1,"$3.60 for 4 — each","0.9"),q(1,"$11.25 for 5 — each","2.25"),
    q(2,"1 kg at $8, or 750 g at $5.40 — per kg for the small one","7.2"),q(2,"Which is better value — type 1kg or 750g","750g"),q(2,"$2.40 for 6 — each","0.4")]},
  {id:"y5u4w4p1",w:4,label:"4.1",title:"Choose the Operation",note:"The words tell you. Read them twice before reaching for a method.",items:[
    q(0,"3 items at $2.50 — total","7.5"),q(0,"$10 shared by 4","2.5"),q(0,"$5.50 + $2.50","8"),q(0,"$10 − $3.25","6.75"),q(0,"4 at $1.25","5"),q(0,"$9 ÷ 3","3"),
    q(1,"2.5 kg at $4 per kg","10"),q(1,"$12 buys how many at $2.40","5"),q(1,"1.5 m plus 0.85 m — metres","2.35"),q(1,"6 at $3.99 — total","23.94"),q(1,"$50 − $27.45","22.55"),
    q(2,"0.75 kg at $6.40 per kg","4.8"),q(2,"$18 buys how many at $0.75","24")]},
  {id:"y5u4w4p2",w:4,label:"4.2",title:"Two-Step Problems",note:"Multiply then subtract, in that order.",items:[
    q(0,"3 at $2, change from $10","4"),q(0,"4 at $1.50, change from $10","4"),q(0,"2 at $3.25 — total","6.5"),q(0,"Change from $10","3.5"),q(0,"5 at $2 — total","10"),q(1,"Change from $20","10"),
    q(1,"3 at $4.99, change from $20","5.03"),q(1,"6 at $1.75 — total","10.5"),q(1,"Change from $20","9.5"),q(1,"2.5 kg at $3.20, change from $10","2"),q(1,"4 at $6.25 — total","25"),
    q(2,"$40 less 3 dinners at $11.25","6.25"),q(2,"1.5 kg at $4.80 plus $2.50 delivery","9.7")]},
  {id:"y5u4w4p3",w:4,label:"4.3",title:"Measurement Contexts",note:"Metres, litres and kilograms, all carrying decimals.",items:[
    q(0,"1.5 m + 0.5 m","2"),q(0,"2.5 L − 1 L","1.5"),q(0,"0.5 kg × 4","2"),q(0,"3 m ÷ 2","1.5"),q(0,"1.2 m + 0.8 m","2"),q(0,"4.5 kg − 1.5 kg","3"),
    q(1,"1.25 m × 4","5"),q(1,"7.5 L shared into 0.5 L bottles — how many","15"),q(1,"2.4 kg ÷ 3","0.8"),q(1,"0.75 m × 6","4.5"),q(1,"12.5 L − 4.75 L","7.75"),
    q(2,"A 4.5 m rope into 0.75 m pieces — how many","6"),q(2,"3.6 kg shared by 8 — kg each","0.45")]},
  {id:"y5u4w4p4",w:4,label:"4.4",title:"Estimate Everything First",note:"Write the estimate before the working, every time.",items:[
    q(0,"Estimate 4.9 + 3.1","8"),q(0,"Estimate 9.8 − 4.9","5"),q(0,"Estimate 2.1 × 4","8"),q(0,"Estimate 11.9 ÷ 4","3"),q(0,"Estimate 0.9 + 1.1","2"),q(0,"Estimate 5.2 × 2","10"),
    q(1,"Estimate 12.4 − 7.9","4"),q(1,"True value of 12.4 − 7.856","4.544"),q(1,"Estimate 0.49 × 100","50"),q(1,"True value of 0.49 × 100","49"),q(1,"Estimate 19.8 ÷ 5","4"),
    q(2,"Estimate 6 items at $4.95","30"),q(2,"True cost of 6 at $4.95","29.7")]},
  {id:"y5u4w4p5",w:4,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–4. 85% to keep flying.",items:[
    q(0,"0.3 + 0.4","0.7"),q(0,"0.5 × 4","2"),
    q(1,"3.5 + 0.47","3.97"),q(1,"8.2 − 3.45","4.75"),q(1,"0.4 × 0.2","0.08"),q(1,"6 ÷ 0.5","12"),q(1,"$7.20 for 0.8 kg — per kg","9"),
    q(2,"12.4 − 7.856","4.544")]},
  {id:"y5u4w5p1",w:5,label:"5.1",title:"Compute Unit Prices",note:"Divide price by size for every item on the list.",items:[
    q(0,"$6 for 2 kg — per kg","3"),q(0,"$10 for 5 L — per L","2"),q(0,"$8 for 4 — each","2"),q(0,"$12 for 3 — each","4"),q(0,"$15 for 5 — each","3"),q(0,"$9 for 3 — each","3"),
    q(1,"$4.50 for 3 kg — per kg","1.5"),q(1,"$7.20 for 0.8 kg — per kg","9"),q(1,"$11.25 for 5 — each","2.25"),q(1,"$2.40 for 6 — each","0.4"),q(1,"$13.50 for 1.5 kg — per kg","9"),
    q(2,"$5 for 400 g — per 100 g","1.25"),q(2,"$9 for 800 g — per 100 g","1.125")]},
  {id:"y5u4w5p2",w:5,label:"5.2",title:"Find the Trap",note:"Name one product where the bigger box costs more per unit.",items:[
    q(0,"$4 for 2 — each","2"),q(0,"$9 for 5 — each","1.8"),q(0,"Cheaper each — type 1.8 or 2","1.8"),q(0,"$6 for 3 — each","2"),q(0,"$10 for 4 — each","2.5"),q(0,"Cheaper each — type 2 or 2.5","2"),
    q(1,"400 g at $5 — per 100 g","1.25"),q(1,"800 g at $9 — per 100 g","1.125"),q(1,"Better value — type 400 or 800","800"),q(1,"500 g at $4 — per 100 g","0.8"),q(1,"1 kg at $9 — per 100 g","0.9"),
    q(2,"So which is better value — type 500g or 1kg","500g"),q(2,"The saving per 100 g by picking it","0.1")]},
  {id:"y5u4w5p3",w:5,label:"5.3",title:"Write the Recommendation",note:"One paragraph a shopper could act on.",items:[
    q(0,"$1.25 per 100 g — the cost of 400 g","5"),q(0,"$0.90 per 100 g — the cost of 1 kg","9"),q(0,"$2 each — the cost of 5","10"),q(0,"$1.80 each — the cost of 5","9"),q(0,"The saving","1"),q(0,"$3 per kg — the cost of 2 kg","6"),
    q(1,"Saving $0.125 per 100 g on 800 g","1"),q(1,"Buying 800 g weekly — the yearly saving over 52 weeks","52"),q(1,"$1.25 vs $1.125 per 100 g — the percent saved, to the nearest whole","10"),q(1,"$9 vs $10 — the percent saved","10"),q(1,"Saving $1 a week for a year","52"),
    q(2,"A $0.10 per 100 g saving on 2 kg weekly, over 52 weeks","104"),q(2,"Which matters more for a weekly buy — type per-unit or total","per-unit")]},
  {id:"y5u4w5p4",w:5,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",items:[
    q(0,"0.25 + 0.25","0.5"),q(0,"1 − 0.5","0.5"),q(0,"0.5 × 4","2"),q(0,"4.8 ÷ 2","2.4"),q(0,"0.6 + 0.9","1.5"),q(0,"$10 for 5 — each","2"),
    q(1,"12.6 + 4.85","17.45"),q(1,"10 − 0.07","9.93"),q(1,"0.4 × 0.2","0.08"),q(1,"9.6 ÷ 1.2","8"),q(1,"2.5 × 1.4","3.5"),
    q(2,"12.4 − 7.856","4.544"),q(2,"1.25 × 0.8","1")]},
  {id:"y5u4w5p5",w:5,label:"Fri",title:"Mission 04 Test",note:"Twelve items plus the Big Question, answered out loud.",items:[
    q(0,"1.2 + 2.5","3.7"),q(0,"0.9 − 0.4","0.5"),
    q(1,"3.5 + 0.47","3.97"),q(1,"4 − 1.35","2.65"),q(1,"1.2 × 0.5","0.6"),q(1,"3.2 × 2.5","8"),q(1,"6 ÷ 0.5","12"),q(1,"9.6 ÷ 1.2","8"),q(1,"$4.50 for 3 kg — per kg","1.5"),q(1,"3 at $4.99 — change from $20","5.03"),
    q(2,"12.4 − 7.856","4.544"),q(2,"A 4.5 m rope into 0.75 m pieces — how many","6")]}
 ]
};
Object.keys(PRACTICE_Y5_W2).forEach(k=>{ PRACTICE_Y5[k]=PRACTICE_Y5[k].concat(PRACTICE_Y5_W2[k]); });

const PRACTICE_Y5_W3 = {
 5:[
  {id:"y5u5w2p1",w:2,label:"2.1",title:"Subtract Unlike Fractions",note:"Same conversion as adding, different sign. Type fractions like 3/4.",items:[
    q(0,"3/4 − 1/4","1/2"),q(0,"5/6 − 1/6","2/3"),q(0,"7/8 − 3/8","1/2"),q(0,"4/5 − 2/5","2/5"),q(0,"2/3 − 1/3","1/3"),q(0,"9/10 − 4/10","1/2"),
    q(1,"1/2 − 1/3","1/6"),q(1,"3/4 − 1/3","5/12"),q(1,"5/6 − 1/2","1/3"),q(1,"2/3 − 1/4","5/12"),q(1,"7/8 − 1/2","3/8"),
    q(2,"5/6 − 3/8","11/24"),q(2,"7/10 − 2/15","17/30")]},
  {id:"y5u5w2p2",w:2,label:"2.2",title:"Borrowing from a Whole",note:"1 becomes 5/5 so you have something to take from.",items:[
    q(0,"1 − 1/2","1/2"),q(0,"1 − 1/4","3/4"),q(0,"1 − 1/3","2/3"),q(0,"1 − 3/8","5/8"),q(0,"1 − 2/5","3/5"),q(0,"1 − 5/6","1/6"),
    q(1,"2 − 1/2","3/2"),q(1,"2 − 3/4","5/4"),q(1,"3 − 1/3","8/3"),q(1,"2 − 5/8","11/8"),q(1,"4 − 1/4","15/4"),
    q(2,"2 − 5/6","7/6"),q(2,"3 − 7/8","17/8")]},
  {id:"y5u5w2p3",w:2,label:"2.3",title:"Mixed Numbers",note:"Whole parts and fraction parts, handled separately.",items:[
    q(0,"1 1/2 as an improper fraction","3/2"),q(0,"2 1/2 as an improper fraction","5/2"),q(0,"1 1/4 as an improper fraction","5/4"),q(0,"3/2 — the whole part","1"),q(0,"7/2 — the whole part","3"),q(0,"5/4 — the whole part","1"),
    q(1,"1 1/2 + 1/2","2"),q(1,"2 1/4 + 1/4","5/2"),q(1,"1 1/3 + 2/3","2"),q(1,"2 3/4 − 1/4","5/2"),q(1,"1 1/2 − 3/4","3/4"),
    q(2,"2 1/3 + 1 1/2","23/6"),q(2,"3 1/4 − 1 1/2","7/4")]},
  {id:"y5u5w2p4",w:2,label:"2.4",title:"Fraction Word Problems",note:"Two-step problems with a subtraction hiding inside.",items:[
    q(0,"Ate 1/4, then 1/4 more — total","1/2"),q(0,"Had 3/4, ate 1/4 — left","1/2"),q(0,"1/2 hour plus 1/2 hour — hours","1"),q(0,"1 whole minus 1/3","2/3"),q(0,"1/8 + 1/8","1/4"),q(0,"2/5 + 1/5","3/5"),
    q(1,"Walked 1/2 mile then 1/4 — total","3/4"),q(1,"A 3/4 cup recipe, you have 1/2 — how much more","1/4"),q(1,"Read 2/3 then 1/6 more — total","5/6"),q(1,"Ran 5/6 km, walked 1/3 km — total","7/6"),q(1,"1 hour minus 1/4 hour — minutes","45"),
    q(2,"A tank 3/4 full, 1/3 used — fraction left","5/12"),q(2,"2/3 of an hour in minutes","40")]},
  {id:"y5u5w2p5",w:2,label:"Fri",title:"Double the Recipe Begins",note:"Pick the recipe, write the scaled amounts.",items:[
    q(0,"Double 1/4 cup","1/2"),q(0,"Double 1/2 cup","1"),
    q(1,"Double 2/3 cup","4/3"),q(1,"Half of 3/4 cup","3/8"),
    q(2,"Triple 3/8 cup","9/8"),q(2,"1/2 + 1/3 + 1/4 cup — total","13/12"),q(2,"Double 1 1/2 cups","3")]},
  {id:"y5u5w3p1",w:3,label:"3.1",title:"Nearest Benchmark",note:"Is it closer to 0, a half, or 1? Decide before computing.",items:[
    q(0,"Is 1/8 nearer 0 or 1","0"),q(0,"Is 7/8 nearer 0 or 1","1"),q(0,"4/8 simplified","1/2"),q(0,"Is 5/6 nearer 1/2 or 1","1"),q(0,"Is 2/5 nearer 0 or 1/2","1/2"),q(0,"Is 3/5 more or less than 1/2","more"),
    q(1,"Is 5/9 more or less than 1/2","more"),q(1,"Is 4/9 more or less than 1/2","less"),q(1,"Is 7/16 more or less than 1/2","less"),q(1,"Nearest benchmark to 11/12 — type 0, 1/2 or 1","1"),q(1,"Nearest benchmark to 1/9","0"),
    q(2,"Is 13/25 more or less than 1/2","more"),q(2,"Nearest benchmark to 8/15","1/2")]},
  {id:"y5u5w3p2",w:3,label:"3.2",title:"Estimate the Sum",note:"About a half plus about one is about one and a half.",items:[
    q(0,"Estimate 1/8 + 7/8","1"),q(0,"Estimate 1/2 + 1/2","1"),q(0,"Estimate 1/4 + 1/4","1/2"),q(0,"Estimate 1/8 + 1/8","0"),q(0,"1/2 + 1/2","1"),q(0,"Estimate 7/8 + 7/8","2"),
    q(1,"Estimate 5/6 + 1/8 to the nearest half","1"),q(1,"Estimate 11/12 + 7/8 to the nearest whole","2"),q(1,"Is 2/3 + 1/4 more or less than 1","less"),q(1,"Is 5/6 + 1/3 more or less than 1","more"),q(1,"Estimate 1/9 + 1/10","0"),
    q(2,"Is 4/9 + 5/11 more or less than 1","less"),q(2,"Estimate 7/8 + 1/9 + 1/10 to the nearest whole","1")]},
  {id:"y5u5w3p3",w:3,label:"3.3",title:"Is This Answer Sensible",note:"Given a worked answer, judge it before you check it.",items:[
    q(0,"1/2 + 1/2","1"),q(0,"1/4 + 1/4","1/2"),q(0,"Is 1/2 + 1/3 equal to 2/5 — yes or no","no"),q(0,"1/2 + 1/3","5/6"),q(0,"Is 1/4 + 1/4 equal to 2/8 — yes or no","no"),q(0,"1/3 + 1/3","2/3"),
    q(1,"Someone says 2/3 + 3/4 = 5/7. The real answer","17/12"),q(1,"Someone says 1/2 + 1/4 = 2/6. The real answer","3/4"),q(1,"Can two fractions under 1 add to more than 1 — yes or no","yes"),q(1,"3/4 + 1/2","5/4"),q(1,"Is 5/6 + 1/6 equal to 1 — yes or no","yes"),
    q(2,"Adding numerators and denominators is always wrong — type yes or no","yes"),q(2,"2/3 + 3/4","17/12")]},
  {id:"y5u5w3p4",w:3,label:"3.4",title:"Compare Fractions",note:"Common denominator, or reason from benchmarks. Say which.",items:[
    q(0,"Larger: 1/2 or 1/3","1/2"),q(0,"Larger: 3/4 or 1/2","3/4"),q(0,"Larger: 1/4 or 1/8","1/4"),q(0,"Larger: 2/3 or 1/3","2/3"),q(0,"Smaller: 1/5 or 1/6","1/6"),q(0,"Larger: 5/8 or 3/8","5/8"),
    q(1,"Larger: 2/3 or 3/4","3/4"),q(1,"Larger: 3/5 or 5/8","5/8"),q(1,"Larger: 5/6 or 7/9","5/6"),q(1,"Smallest of 1/3, 2/5, 1/4","1/4"),q(1,"Largest of 2/3, 5/8, 7/12","2/3"),
    q(2,"Order 3/4, 5/6, 7/8 — type the largest","7/8"),q(2,"Larger: 11/15 or 7/10","11/15")]},
  {id:"y5u5w3p5",w:3,label:"Fri",title:"Cook It",note:"Make the scaled recipe for real. Measure honestly.",items:[
    q(0,"Double 1/3 cup","2/3"),q(0,"Double 1/8 cup","1/4"),
    q(1,"Half of 2/3 cup","1/3"),q(1,"Triple 1/4 cup","3/4"),
    q(2,"1 1/2 cups doubled","3"),q(2,"2/3 cup plus 3/4 cup","17/12"),q(2,"Half of 1 1/2 cups","3/4")]},
  {id:"y5u5w4p1",w:4,label:"4.1",title:"Add or Subtract",note:"Mixed set, no signposting. Read before you reach for a method.",items:[
    q(0,"1/4 + 1/4","1/2"),q(0,"3/4 − 1/4","1/2"),q(0,"1/3 + 1/3","2/3"),q(0,"5/6 − 1/6","2/3"),q(0,"1/8 + 3/8","1/2"),q(0,"7/8 − 3/8","1/2"),
    q(1,"1/2 + 1/3","5/6"),q(1,"3/4 − 1/3","5/12"),q(1,"2/3 + 1/4","11/12"),q(1,"5/6 − 1/2","1/3"),q(1,"3/8 + 1/4","5/8"),
    q(2,"2/3 + 3/4","17/12"),q(2,"5/6 − 3/8","11/24")]},
  {id:"y5u5w4p2",w:4,label:"4.2",title:"Three Fractions",note:"One common denominator for all three.",items:[
    q(0,"1/4 + 1/4 + 1/4","3/4"),q(0,"1/3 + 1/3 + 1/3","1"),q(0,"1/8 + 1/8 + 1/8","3/8"),q(0,"1/6 + 1/6 + 1/6","1/2"),q(0,"1/5 + 1/5 + 1/5","3/5"),q(0,"1/2 + 1/4 + 1/4","1"),
    q(1,"1/2 + 1/3 + 1/6","1"),q(1,"1/2 + 1/4 + 1/8","7/8"),q(1,"1/3 + 1/4 + 1/6","3/4"),q(1,"2/3 + 1/6 + 1/6","1"),q(1,"1/2 + 1/3 + 1/4","13/12"),
    q(2,"1/2 + 1/3 + 1/5","31/30"),q(2,"3/4 + 1/6 + 1/12","1")]},
  {id:"y5u5w4p3",w:4,label:"4.3",title:"Simplify the Answer",note:"6/8 is right. 3/4 is finished.",items:[
    q(0,"2/4 simplified","1/2"),q(0,"3/6","1/2"),q(0,"4/8","1/2"),q(0,"2/6","1/3"),q(0,"5/10","1/2"),q(0,"3/9","1/3"),
    q(1,"6/8","3/4"),q(1,"10/15","2/3"),q(1,"12/16","3/4"),q(1,"18/24","3/4"),q(1,"20/25","4/5"),
    q(2,"36/48","3/4"),q(2,"1/4 + 1/4 + 1/4 + 1/4 — simplified","1")]},
  {id:"y5u5w4p4",w:4,label:"4.4",title:"Recipes, Distances, Time",note:"Real contexts, unlike denominators.",items:[
    q(0,"1/2 hour in minutes","30"),q(0,"1/4 hour in minutes","15"),q(0,"3/4 hour in minutes","45"),q(0,"1/2 + 1/4 hour — minutes","45"),q(0,"1/3 hour in minutes","20"),q(0,"2/3 hour in minutes","40"),
    q(1,"Walked 2/3 km then 1/4 km — total","11/12"),q(1,"A 1/2 hour lesson plus 1/3 hour — minutes","50"),q(1,"3/4 cup less 1/3 cup","5/12"),q(1,"Ran 5/8 mile then 1/4 — total","7/8"),q(1,"1/6 hour in minutes","10"),
    q(2,"5/6 hour minus 1/4 hour — minutes","35"),q(2,"1/2 + 1/3 + 1/12 hour — minutes","55")]},
  {id:"y5u5w4p5",w:4,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–4. 85% to keep flying.",items:[
    q(0,"1/4 + 1/4","1/2"),q(0,"1 − 1/3","2/3"),
    q(1,"1/2 + 1/3","5/6"),q(1,"3/4 − 1/3","5/12"),q(1,"2/3 = ?/9 — the numerator","6"),q(1,"Is 5/9 more or less than 1/2","more"),q(1,"12/16 simplified","3/4"),
    q(2,"2/3 + 3/4","17/12")]},
  {id:"y5u5w5p1",w:5,label:"5.1",title:"Write Up the Scaling",note:"Every amount, before and after.",items:[
    q(0,"Double 1/4","1/2"),q(0,"Double 1/3","2/3"),q(0,"Double 3/8","3/4"),q(0,"Half of 1/2","1/4"),q(0,"Half of 2/3","1/3"),q(0,"Double 1/8","1/4"),
    q(1,"Double 2/3","4/3"),q(1,"Double 5/6","5/3"),q(1,"Triple 1/4","3/4"),q(1,"Half of 3/4","3/8"),q(1,"Triple 3/8","9/8"),
    q(2,"Double 1 1/2","3"),q(2,"Half of 1 1/4","5/8")]},
  {id:"y5u5w5p2",w:5,label:"5.2",title:"Explain One Conversion",note:"Why that denominator, in one sentence.",items:[
    q(0,"Common denominator of 1/2 and 1/4","4"),q(0,"Of 1/3 and 1/6","6"),q(0,"Of 1/2 and 1/3","6"),q(0,"Of 1/4 and 1/8","8"),q(0,"Of 1/5 and 1/10","10"),q(0,"Of 1/2 and 1/5","10"),
    q(1,"Of 2/3 and 3/4","12"),q(1,"Of 5/6 and 3/8","24"),q(1,"Of 3/5 and 1/2","10"),q(1,"Of 7/10 and 2/15","30"),q(1,"Of 1/4, 1/6 and 1/8","24"),
    q(2,"Of 2/9 and 5/12","36"),q(2,"Of 3/7 and 1/2","14")]},
  {id:"y5u5w5p3",w:5,label:"5.3",title:"Mission Review",note:"Everything from five weeks, mixed together.",items:[
    q(0,"1/2 = ?/4 — the numerator","2"),q(0,"1/4 + 1/4","1/2"),q(0,"1 − 1/4","3/4"),q(0,"6/8 simplified","3/4"),q(0,"Larger: 1/2 or 1/3","1/2"),q(0,"5/6 − 1/6","2/3"),
    q(1,"1/2 + 1/3","5/6"),q(1,"2/3 + 1/4","11/12"),q(1,"3/4 − 1/3","5/12"),q(1,"1 1/2 − 3/4","3/4"),q(1,"Is 4/9 more or less than 1/2","less"),
    q(2,"1/2 + 1/3 + 1/6","1"),q(2,"5/6 − 3/8","11/24")]},
  {id:"y5u5w5p4",w:5,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",items:[
    q(0,"1/3 + 1/3","2/3"),q(0,"1 − 1/2","1/2"),q(0,"2/4 simplified","1/2"),q(0,"1/8 + 3/8","1/2"),q(0,"Larger: 3/4 or 1/2","3/4"),q(0,"7/8 − 3/8","1/2"),
    q(1,"1/2 + 1/4","3/4"),q(1,"2/3 − 1/4","5/12"),q(1,"10/15 simplified","2/3"),q(1,"1/2 + 1/4 + 1/8","7/8"),q(1,"Larger: 5/6 or 7/9","5/6"),
    q(2,"2/3 + 3/4","17/12"),q(2,"3 − 7/8","17/8")]},
  {id:"y5u5w5p5",w:5,label:"Fri",title:"Mission 05 Test",note:"Twelve items plus the Big Question, answered out loud.",items:[
    q(0,"1/4 + 1/4","1/2"),q(0,"1 − 1/3","2/3"),
    q(1,"1/2 = ?/6 — the numerator","3"),q(1,"18/24 simplified","3/4"),q(1,"1/2 + 1/3","5/6"),q(1,"2/3 + 1/4","11/12"),q(1,"3/4 − 1/3","5/12"),q(1,"2 − 5/8","11/8"),q(1,"Larger: 3/5 or 5/8","5/8"),q(1,"Common denominator of 5/6 and 3/8","24"),
    q(2,"2/3 + 3/4","17/12"),q(2,"1/2 + 1/3 + 1/4","13/12")]}
 ]
};
Object.keys(PRACTICE_Y5_W3).forEach(k=>{ PRACTICE_Y5[k]=PRACTICE_Y5[k].concat(PRACTICE_Y5_W3[k]); });

const PRACTICE_Y5_W4 = {
 6:[
  {id:"y5u6w2p1",w:2,label:"2.1",title:"Fold It Twice",note:"Half of a third is a sixth. Do it on paper before you do it on paper.",items:[
    q(0,"1/2 × 1/2","1/4"),q(0,"1/2 × 1/3","1/6"),q(0,"1/3 × 1/3","1/9"),q(0,"1/2 × 1/4","1/8"),q(0,"1/5 × 1/2","1/10"),q(0,"1/4 × 1/4","1/16"),
    q(1,"1/2 × 1/5","1/10"),q(1,"1/3 × 1/4","1/12"),q(1,"1/6 × 1/2","1/12"),q(1,"1/3 × 1/5","1/15"),q(1,"1/4 × 1/5","1/20"),
    q(2,"1/2 × 1/3 × 1/4","1/24"),q(2,"1/8 × 1/8","1/64")]},
  {id:"y5u6w2p2",w:2,label:"2.2",title:"The Area Model",note:"A rectangle cut both ways. The overlap is the answer.",items:[
    q(0,"A 1/2 by 1/2 square — its area","1/4"),q(0,"A 1/2 by 1/3 rectangle","1/6"),q(0,"A 1/3 by 1/4 rectangle","1/12"),q(0,"Pieces when a square is cut in halves both ways","4"),q(0,"Cut in thirds both ways","9"),q(0,"Cut in halves and thirds","6"),
    q(1,"A 2/3 by 1/2 rectangle","1/3"),q(1,"A 3/4 by 2/3 rectangle","1/2"),q(1,"A 2/5 by 3/4 rectangle","3/10"),q(1,"A 2/3 by 3/5 rectangle","2/5"),q(1,"A 5/6 by 3/5 rectangle","1/2"),
    q(2,"A 3/8 by 4/9 rectangle","1/6"),q(2,"A 2/3 by 3/4 by 1/2 box — its volume","1/4")]},
  {id:"y5u6w2p3",w:2,label:"2.3",title:"Multiply Across",note:"Numerators, then denominators. Then simplify.",items:[
    q(0,"1/2 × 2/3","1/3"),q(0,"2/3 × 1/2","1/3"),q(0,"1/4 × 2/3","1/6"),q(0,"3/4 × 1/3","1/4"),q(0,"2/5 × 1/2","1/5"),q(0,"1/3 × 3/4","1/4"),
    q(1,"3/4 × 2/3","1/2"),q(1,"2/5 × 3/4","3/10"),q(1,"5/6 × 3/5","1/2"),q(1,"3/8 × 4/9","1/6"),q(1,"4/5 × 5/8","1/2"),
    q(2,"2/3 × 3/4 × 1/2","1/4"),q(2,"6/7 × 7/12","1/2")]},
  {id:"y5u6w2p4",w:2,label:"2.4",title:"Simplify as You Go",note:"Cancel before multiplying and the numbers stay small.",items:[
    q(0,"2/4 simplified","1/2"),q(0,"3/6","1/2"),q(0,"4/8","1/2"),q(0,"6/9","2/3"),q(0,"5/10","1/2"),q(0,"8/12","2/3"),
    q(1,"2/3 × 3/8 — simplified","1/4"),q(1,"4/9 × 3/8","1/6"),q(1,"5/12 × 6/10","1/4"),q(1,"9/10 × 5/6","3/4"),q(1,"7/8 × 4/7","1/2"),
    q(2,"12/25 × 5/6","2/5"),q(2,"15/16 × 8/45","1/6")]},
  {id:"y5u6w2p5",w:2,label:"Fri",title:"Scaling Showdown",note:"Bigger, smaller or the same — predict before you calculate.",items:[
    q(0,"6 × 2 — bigger or smaller than 6","bigger"),q(0,"6 × 1/2 — bigger or smaller","smaller"),
    q(1,"20 × 3/4 — bigger or smaller","smaller"),q(1,"20 × 5/4 — bigger or smaller","bigger"),
    q(2,"20 × 4/4 — bigger, smaller or same","same"),q(2,"Larger: 15 × 3/4 or 15 × 4/3 — type the fraction","4/3"),q(2,"36 × 5/6","30")]},
  {id:"y5u6w3p1",w:3,label:"3.1",title:"Bigger or Smaller",note:"Decide without calculating. Then check yourself.",items:[
    q(0,"10 × 2 — bigger or smaller than 10","bigger"),q(0,"10 × 1/2","smaller"),q(0,"10 × 1 — bigger, smaller or same","same"),q(0,"8 × 1/4 — bigger or smaller","smaller"),q(0,"8 × 3 — bigger or smaller","bigger"),q(0,"8 × 1/2","4"),
    q(1,"24 × 2/3 — bigger or smaller","smaller"),q(1,"24 × 2/3","16"),q(1,"24 × 3/2 — bigger or smaller","bigger"),q(1,"24 × 3/2","36"),q(1,"12 × 7/6","14"),
    q(2,"Multiplying by a fraction under 1 makes it — type bigger or smaller","smaller"),q(2,"45 × 4/5","36")]},
  {id:"y5u6w3p2",w:3,label:"3.2",title:"Why × 1 Changes Nothing",note:"3/3 is one wearing a costume.",items:[
    q(0,"3/3 as a whole number","1"),q(0,"5/5","1"),q(0,"8/8","1"),q(0,"12 × 1","12"),q(0,"12 × 3/3","12"),q(0,"7 × 4/4","7"),
    q(1,"20 × 5/5","20"),q(1,"2/3 × 4/4 — type as a/b","8/12"),q(1,"8/12 simplified","2/3"),q(1,"15 × 6/6","15"),q(1,"3/4 × 5/5 — type as a/b","15/20"),
    q(2,"Any number × n/n equals — type same or zero","same"),q(2,"9 × 11/11","9")]},
  {id:"y5u6w3p3",w:3,label:"3.3",title:"Compare Products",note:"Which is larger, without working either one out.",items:[
    q(0,"Larger: 10 × 2 or 10 × 3 — type the multiplier","3"),q(0,"Larger: 10 × 1/2 or 10 × 1/3","1/2"),q(0,"Larger: 8 × 1 or 8 × 2","2"),q(0,"Larger: 6 × 1/4 or 6 × 1/2","1/2"),q(0,"10 × 1/2","5"),q(0,"10 × 1/3 — bigger or smaller than 5","smaller"),
    q(1,"Larger: 20 × 3/4 or 20 × 4/5 — type the fraction","4/5"),q(1,"Larger: 12 × 5/6 or 12 × 7/8","7/8"),q(1,"20 × 4/5","16"),q(1,"12 × 7/8","10.5"),q(1,"Larger: 30 × 2/3 or 30 × 3/5","2/3"),
    q(2,"Larger: 24 × 5/8 or 24 × 7/12","5/8"),q(2,"24 × 5/8","15")]},
  {id:"y5u6w3p4",w:3,label:"3.4",title:"Scaling in Context",note:"Recipes, distances and prices, scaled up and down.",items:[
    q(0,"Half of 20 km","10"),q(0,"Double 15 km","30"),q(0,"1/4 of $40","10"),q(0,"3/4 of 20","15"),q(0,"1/2 of $18","9"),q(0,"2/3 of 12","8"),
    q(1,"3/4 of a $60 price","45"),q(1,"A 2/3 scaled recipe from 18 cups","12"),q(1,"5/6 of a 24 km route","20"),q(1,"A price of $80 at 3/5","48"),q(1,"7/8 of 32","28"),
    q(2,"A $250 item at 4/5 of the price","200"),q(2,"3/8 of 96","36")]},
  {id:"y5u6w3p5",w:3,label:"Fri",title:"Measure the Garden",note:"Real beds, real fractions.",items:[
    q(0,"Half of a 12 m² bed","6"),q(0,"A quarter of 20 m²","5"),
    q(1,"2/3 of an 18 m² bed","12"),q(1,"A bed 1/2 m by 3/4 m — area","3/8"),
    q(2,"3/5 of a 45 m² plot","27"),q(2,"A 2/3 m by 3/4 m bed — area","1/2"),q(2,"How many 1/4 m² tiles cover 3 m²","12")]},
  {id:"y5u6w4p1",w:4,label:"4.1",title:"Whole ÷ Unit Fraction",note:"How many of these fit inside that?",items:[
    q(0,"How many halves in 1","2"),q(0,"How many halves in 3","6"),q(0,"How many quarters in 1","4"),q(0,"How many quarters in 2","8"),q(0,"How many thirds in 2","6"),q(0,"4 ÷ 1/2","8"),
    q(1,"5 ÷ 1/4","20"),q(1,"7 ÷ 1/3","21"),q(1,"3 ÷ 1/8","24"),q(1,"6 ÷ 1/5","30"),q(1,"10 ÷ 1/2","20"),
    q(2,"A 3 m ribbon into 1/4 m pieces","12"),q(2,"12 ÷ 1/6","72")]},
  {id:"y5u6w4p2",w:4,label:"4.2",title:"Unit Fraction ÷ Whole",note:"Sharing a third between four people.",items:[
    q(0,"1/2 ÷ 2","1/4"),q(0,"1/2 ÷ 3","1/6"),q(0,"1/3 ÷ 2","1/6"),q(0,"1/4 ÷ 2","1/8"),q(0,"1/5 ÷ 2","1/10"),q(0,"1/3 ÷ 3","1/9"),
    q(1,"1/2 ÷ 4","1/8"),q(1,"1/3 ÷ 4","1/12"),q(1,"1/4 ÷ 3","1/12"),q(1,"1/5 ÷ 4","1/20"),q(1,"1/6 ÷ 2","1/12"),
    q(2,"1/4 of a pizza shared by 3","1/12"),q(2,"1/8 ÷ 4","1/32")]},
  {id:"y5u6w4p3",w:4,label:"4.3",title:"Fraction as Division",note:"3/4 is literally 3 ÷ 4.",items:[
    q(0,"1 ÷ 2 as a decimal","0.5"),q(0,"1 ÷ 4 as a decimal","0.25"),q(0,"3 ÷ 4 as a decimal","0.75"),q(0,"1 ÷ 5 as a decimal","0.2"),q(0,"2 ÷ 5 as a decimal","0.4"),q(0,"1 ÷ 10 as a decimal","0.1"),
    q(1,"3 ÷ 8 as a decimal","0.375"),q(1,"5 ÷ 8 as a decimal","0.625"),q(1,"7 ÷ 10 as a decimal","0.7"),q(1,"3 pizzas between 4 — each, as a/b","3/4"),q(1,"5 cakes between 2 — each, as a/b","5/2"),
    q(2,"7 ÷ 8 as a decimal","0.875"),q(2,"9 metres between 4 — each, as a decimal","2.25")]},
  {id:"y5u6w4p4",w:4,label:"4.4",title:"Ribbon, Pizza and Time",note:"Real contexts for dividing with fractions.",items:[
    q(0,"A 2 m ribbon into 1/2 m pieces","4"),q(0,"A 3 m ribbon into 1/2 m pieces","6"),q(0,"Half a pizza between 2","1/4"),q(0,"A whole pizza in quarters — slices","4"),q(0,"An hour in half hours","2"),q(0,"An hour in quarter hours","4"),
    q(1,"A 4.5 m rope into 1/2 m pieces","9"),q(1,"1/3 of a cake between 2","1/6"),q(1,"2 hours in 1/4 hours","8"),q(1,"A 5 m ribbon into 1/4 m bows","20"),q(1,"1/2 of a pie between 3","1/6"),
    q(2,"A 3 m ribbon into 1/8 m pieces","24"),q(2,"3 hours in 1/6 hours","18")]},
  {id:"y5u6w4p5",w:4,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–4. 85% to keep flying.",items:[
    q(0,"1/2 × 1/3","1/6"),q(0,"2/3 of 9","6"),
    q(1,"3/4 × 2/3","1/2"),q(1,"24 × 2/3","16"),q(1,"5 ÷ 1/4","20"),q(1,"1/3 ÷ 4","1/12"),q(1,"20 × 3/4 — bigger or smaller than 20","smaller"),
    q(2,"2/3 × 3/4 × 1/2","1/4")]},
  {id:"y5u6w5p1",w:5,label:"5.1",title:"Finish the Garden Plan",note:"Every bed with its fraction and its area.",items:[
    q(0,"1/2 of 20 m²","10"),q(0,"1/4 of 24 m²","6"),q(0,"1/3 of 27 m²","9"),q(0,"2/3 of 12 m²","8"),q(0,"3/4 of 16 m²","12"),q(0,"1/5 of 30 m²","6"),
    q(1,"2/5 of 45 m²","18"),q(1,"5/6 of 36 m²","30"),q(1,"A 3/4 m by 2/3 m bed — area","1/2"),q(1,"3/8 of 64 m²","24"),q(1,"7/10 of 50 m²","35"),
    q(2,"A 2/3 m by 5/6 m bed — area","5/9"),q(2,"How many 1/8 m² tiles cover 2 m²","16")]},
  {id:"y5u6w5p2",w:5,label:"5.2",title:"Explain a Shrink",note:"Name one product smaller than its starting number and say why.",items:[
    q(0,"12 × 1/2","6"),q(0,"12 × 1/3","4"),q(0,"12 × 1/4","3"),q(0,"12 × 2","24"),q(0,"12 × 1","12"),q(0,"12 × 3/4","9"),
    q(1,"Which shrinks 12: × 3/4 or × 5/4 — type the fraction","3/4"),q(1,"30 × 2/5","12"),q(1,"30 × 5/2","75"),q(1,"Which grows 30 — type 2/5 or 5/2","5/2"),q(1,"40 × 7/8","35"),
    q(2,"A fraction shrinks a number when its top is — type smaller or larger than its bottom","smaller"),q(2,"60 × 5/6","50")]},
  {id:"y5u6w5p3",w:5,label:"5.3",title:"Multiply and Divide Together",note:"Mixed set. Read before you reach for a method.",items:[
    q(0,"1/2 × 1/2","1/4"),q(0,"2 ÷ 1/2","4"),q(0,"1/2 of 8","4"),q(0,"1/3 ÷ 2","1/6"),q(0,"1/4 × 1/2","1/8"),q(0,"3 ÷ 1/3","9"),
    q(1,"3/4 × 2/3","1/2"),q(1,"5 ÷ 1/4","20"),q(1,"2/5 of 35","14"),q(1,"1/4 ÷ 3","1/12"),q(1,"24 × 5/6","20"),
    q(2,"2/3 × 3/4 × 1/2","1/4"),q(2,"A 3 m ribbon into 1/4 m pieces","12")]},
  {id:"y5u6w5p4",w:5,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",items:[
    q(0,"1/2 × 1/4","1/8"),q(0,"1/3 of 12","4"),q(0,"4 ÷ 1/2","8"),q(0,"1/2 ÷ 2","1/4"),q(0,"3/4 of 20","15"),q(0,"1/5 × 1/2","1/10"),
    q(1,"2/5 × 3/4","3/10"),q(1,"7 ÷ 1/3","21"),q(1,"5/6 of 24","20"),q(1,"1/5 ÷ 4","1/20"),q(1,"24 × 3/2","36"),
    q(2,"15/16 × 8/45","1/6"),q(2,"3 ÷ 1/8","24")]},
  {id:"y5u6w5p5",w:5,label:"Fri",title:"Mission 06 Test",note:"Twelve items plus the Big Question, answered out loud.",items:[
    q(0,"1/2 × 1/3","1/6"),q(0,"1/4 of 20","5"),
    q(1,"2/3 of 12","8"),q(1,"3/4 × 2/3","1/2"),q(1,"2/5 × 3/4","3/10"),q(1,"24 × 2/3","16"),q(1,"20 × 5/4","25"),q(1,"5 ÷ 1/4","20"),q(1,"1/3 ÷ 4","1/12"),q(1,"3 ÷ 4 as a decimal","0.75"),
    q(2,"2/3 × 3/4 × 1/2","1/4"),q(2,"A 2/3 m by 3/4 m bed — area","1/2")]}
 ]
};
Object.keys(PRACTICE_Y5_W4).forEach(k=>{ PRACTICE_Y5[k]=PRACTICE_Y5[k].concat(PRACTICE_Y5_W4[k]); });

const PRACTICE_Y5_W5 = {
 7:[
  {id:"y5u7w2p1",w:2,label:"2.1",title:"Count the Cubes",note:"Build it, count it, write it. The formula comes later.",items:[
    q(0,"A 2 by 2 by 2 cube","8"),q(0,"A 3 by 1 by 1 box","3"),q(0,"A 2 by 3 by 1 box","6"),q(0,"A 4 by 2 by 1 box","8"),q(0,"A 3 by 3 by 1 box","9"),q(0,"A 1 by 1 by 5 box","5"),
    q(1,"A 4 by 3 by 2 box","24"),q(1,"A 5 by 4 by 3 box","60"),q(1,"One layer of a 5 by 4 box","20"),q(1,"That box 3 layers high","60"),q(1,"A 6 by 5 by 2 box","60"),
    q(2,"A 10 by 8 by 4 box","320"),q(2,"Volume 48, base 4 by 3 — the height","4")]},
  {id:"y5u7w2p2",w:2,label:"2.2",title:"Layers",note:"One layer, times the height. That is the whole idea.",items:[
    q(0,"A 3 by 4 base — cubes in one layer","12"),q(0,"Two such layers","24"),q(0,"A 5 by 2 base — one layer","10"),q(0,"Three such layers","30"),q(0,"A 6 by 1 base — one layer","6"),q(0,"Four such layers","24"),
    q(1,"A 7 by 3 base, 4 high","84"),q(1,"A 8 by 5 base, 2 high","80"),q(1,"Base area 20, height 6","120"),q(1,"Base area 15, height 4","60"),q(1,"Volume 100, base area 20 — the height","5"),
    q(2,"Volume 288, base 12 by 4 — the height","6"),q(2,"Base area 36, height 10","360")]},
  {id:"y5u7w2p3",w:2,label:"2.3",title:"The Formula",note:"Length × width × height, and where each one comes from.",items:[
    q(0,"2 × 3 × 4","24"),q(0,"5 × 5 × 2","50"),q(0,"10 × 2 × 3","60"),q(0,"1 × 7 × 4","28"),q(0,"6 × 2 × 2","24"),q(0,"3 × 3 × 3","27"),
    q(1,"A 12 by 5 by 4 tank","240"),q(1,"A cube of edge 4","64"),q(1,"A 9 by 3 by 2 box","54"),q(1,"A cube of edge 5","125"),q(1,"A 20 by 10 by 5 box","1000"),
    q(2,"A cube of volume 125 — its edge","5"),q(2,"A cube of volume 216 — its edge","6")]},
  {id:"y5u7w2p4",w:2,label:"2.4",title:"Find a Missing Edge",note:"Given volume and two edges, work out the third.",items:[
    q(0,"Volume 12, edges 2 and 3 — the third","2"),q(0,"Volume 24, edges 2 and 3","4"),q(0,"Volume 30, edges 5 and 3","2"),q(0,"Volume 8, edges 2 and 2","2"),q(0,"Volume 20, edges 5 and 2","2"),q(0,"Volume 36, edges 6 and 3","2"),
    q(1,"Volume 72, edges 6 and 3","4"),q(1,"Volume 120, edges 5 and 4","6"),q(1,"Volume 240, edges 12 and 5","4"),q(1,"Volume 100, height 5 — the base area","20"),q(1,"Volume 96, edges 8 and 4","3"),
    q(2,"Volume 360, edges 9 and 5","8"),q(2,"Volume 1000 with equal edges — one edge","10")]},
  {id:"y5u7w2p5",w:2,label:"Fri",title:"Cube Count",note:"Read the drawing, call the volume before your opponent does.",items:[
    q(0,"A 2 by 2 by 3 box","12"),q(0,"A 3 by 3 by 2 box","18"),
    q(1,"A 4 by 4 by 4 cube","64"),q(1,"A 5 by 3 by 4 box","60"),
    q(2,"Two boxes: 4×3×2 and 5×2×2 — total","44"),q(2,"Double every edge of a 2×3×4 box — volume multiplies by","8"),q(2,"A 6×6×6 cube","216")]},
  {id:"y5u7w3p1",w:3,label:"3.1",title:"Split the Solid",note:"Draw the dividing line first, then measure each part.",items:[
    q(0,"A 2 by 2 by 2 plus a 2 by 2 by 1","12"),q(0,"A 3 by 2 by 1 plus a 3 by 2 by 1","12"),q(0,"A 4 by 2 by 2 plus a 2 by 2 by 2","24"),q(0,"A 5 by 1 by 1 plus a 3 by 1 by 1","8"),q(0,"Parts in an L-shaped solid","2"),q(0,"A 2 by 2 by 5 box","20"),
    q(1,"A 6×4×2 plus a 3×4×2","72"),q(1,"A 10×5×2 minus a 4×5×2","60"),q(1,"An L of 8×3×2 and 4×3×2","72"),q(1,"A 5×5Õ4 minus a 2×2Õ4","84"),q(1,"A T of 6×2×2 and 2×4×2","40"),
    q(2,"A 10×10×5 with a 4×4×5 hole","420"),q(2,"A 12×6×3 plus a 6×6×3","324")]},
  {id:"y5u7w3p2",w:3,label:"3.2",title:"Add the Volumes",note:"Two boxes, one total. Check each part before adding.",items:[
    q(0,"12 + 8","20"),q(0,"24 + 16","40"),q(0,"A 2×2×2 and a 3×2×2 — total","20"),q(0,"A 4×2×1 and a 4×2×1","16"),q(0,"30 + 45","75"),q(0,"A 5×2×2 and a 5×2×2","40"),
    q(1,"A 6×5×2 and a 4×3×2","84"),q(1,"A 8×4×3 and a 2×2×3","108"),q(1,"A 10×3×2 and a 5×3×2","90"),q(1,"Three 4×3×2 boxes","72"),q(1,"A 7×4×2 and a 3×4×2","80"),
    q(2,"A 12×8×4 and a 6×4×4","480"),q(2,"Five 6×5×2 boxes","300")]},
  {id:"y5u7w3p3",w:3,label:"3.3",title:"Line Plots",note:"Plot measurements to the nearest eighth, then reason about them.",items:[
    q(0,"Four items at 1/2 — total","2"),q(0,"Eight items at 1/4 — total","2"),q(0,"Three items at 1/3 — total","1"),q(0,"Six items at 1/2 — total","3"),q(0,"Two items at 3/4 — total","3/2"),q(0,"Longest of 1/4, 1/2, 3/8","1/2"),
    q(1,"1/2 + 1/4 + 1/4","1"),q(1,"Range of 1/8 and 7/8","3/4"),q(1,"Five items totalling 5/2 — the mean","1/2"),q(1,"Difference between 7/8 and 3/8","1/2"),q(1,"Four measurements of 3/4 — total","3"),
    q(2,"Six pencils totalling 9/2 inches shared equally — each","3/4"),q(2,"Two at 1/8, three at 1/4, one at 1/2 — total","3/2")]},
  {id:"y5u7w3p4",w:3,label:"3.4",title:"Read the Plot",note:"Total, difference, and redistribution.",items:[
    q(0,"Five values of 1/2 — total","5/2"),q(1,"Their mean","1/2"),q(0,"Four values of 1/4 — total","1"),q(1,"Their mean","1/4"),q(0,"Range of 1/4 and 3/4","1/2"),q(0,"Range of 1/8 and 5/8","1/2"),
    q(1,"Values 1/4, 1/2, 3/4 — total","3/2"),q(1,"Their mean","1/2"),q(1,"Values 1/8, 3/8, 1/2 — total","1"),q(1,"Four values totalling 3 — the mean","3/4"),q(1,"Range of 1/8 and 1","7/8"),
    q(2,"Eight values totalling 5 — the mean","5/8"),q(2,"Redistribute 9/2 across 6 equally — each","3/4")]},
  {id:"y5u7w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",items:[
    q(0,"1 m in cm","100"),q(0,"A 2 by 3 by 4 box","24"),
    q(1,"250 cm in m","2.5"),q(1,"1500 g in kg","1.5"),q(1,"A 5 by 4 by 3 box","60"),q(1,"Volume 120, base area 20 — the height","6"),q(1,"Four measurements of 3/4 — total","3"),
    q(2,"A 10×10×5 with a 4×4×5 hole","420")]},
  {id:"y5u7w4p1",w:4,label:"4.1",title:"Design Three Boxes",note:"Same volume, different shapes. All three must check out.",items:[
    q(0,"A box of volume 24: 2 by 3 by ?","4"),q(0,"Volume 24: 1 by 4 by ?","6"),q(0,"Volume 24: 2 by 2 by ?","6"),q(0,"Volume 12: 2 by 3 by ?","2"),q(0,"Volume 36: 3 by 3 by ?","4"),q(0,"Volume 60: 5 by 4 by ?","3"),
    q(1,"Volume 48: 4 by 4 by ?","3"),q(1,"Volume 72: 6 by 3 by ?","4"),q(1,"Volume 96: 8 by 4 by ?","3"),q(1,"Volume 120: 6 by 5 by ?","4"),q(1,"Volume 64 with equal edges — one edge","4"),
    q(2,"A cube with the same volume as a 2×4×8 box — its edge","4"),q(2,"How many whole boxes of volume 8 fit in one of volume 96","12")]},
  {id:"y5u7w4p2",w:4,label:"4.2",title:"Argue for One",note:"Which shape is best, and best for what?",items:[
    q(0,"A 2×2×6 box — volume","24"),q(0,"A 2×3×4 box — volume","24"),q(0,"A 1×4×6 box — volume","24"),q(0,"Are those volumes equal — yes or no","yes"),q(0,"A 24 cm³ box on a 12 cm² base — its height","2"),q(0,"A cube of edge 3 — volume","27"),
    q(1,"Surface area of a 2×2×6 box","56"),q(1,"Surface area of a 2×3×4 box","52"),q(1,"Which uses less card — type 2x2x6 or 2x3x4","2x3x4"),q(1,"Surface area of a cube of edge 3","54"),q(1,"Surface area of a 1×4×6 box","68"),
    q(2,"For a fixed volume, the shape using least material is nearest a — type cube or slab","cube"),q(2,"Surface area of a cube of edge 4","96")]},
  {id:"y5u7w4p3",w:4,label:"4.3",title:"Conversions and Volume",note:"Both strands together, which is how they arrive in real problems.",items:[
    q(0,"1 m in cm","100"),q(0,"1 kg in g","1000"),q(0,"2 m in cm","200"),q(0,"3 L in mL","3000"),q(0,"A 2×2×2 box","8"),q(0,"500 g in kg","0.5"),
    q(1,"250 cm in m","2.5"),q(1,"1500 g in kg","1.5"),q(1,"A 100 by 50 by 20 cm box — volume in cubic cm","100000"),q(1,"3200 mL in L","3.2"),q(1,"A 2 by 1 by 0.5 m tank — volume in cubic m","1"),
    q(2,"1000 cubic cm in litres","1"),q(2,"A 2 by 1 by 0.5 m tank in litres","1000")]},
  {id:"y5u7w4p4",w:4,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",items:[
    q(0,"1 km in m","1000"),q(0,"A 3 by 3 by 3 cube","27"),q(0,"1 L in mL","1000"),q(0,"A 4 by 2 by 1 box","8"),q(0,"2 kg in g","2000"),q(0,"Four items at 1/2 — total","2"),
    q(1,"45 mm in cm","4.5"),q(1,"A 5 by 4 by 3 box","60"),q(1,"Volume 72, edges 6 and 3 — the third","4"),q(1,"0.75 km in m","750"),q(1,"Range of 1/8 and 7/8","3/4"),
    q(2,"A cube of volume 216 — its edge","6"),q(2,"Add 1.2 m and 85 cm — answer in cm","205")]},
  {id:"y5u7w4p5",w:4,label:"Fri",title:"Mission 07 Test",note:"Twelve items plus the Big Question, answered out loud.",items:[
    q(0,"1 m in cm","100"),q(0,"A 2 by 3 by 4 box","24"),
    q(1,"250 cm in m","2.5"),q(1,"3200 mL in L","3.2"),q(1,"A 5 by 4 by 3 box","60"),q(1,"A cube of edge 4","64"),q(1,"Volume 120, base area 20 — the height","6"),q(1,"Volume 96, edges 8 and 4 — the third","3"),q(1,"A 6×5×2 and a 4×3×2 — total","84"),q(1,"Five items totalling 5/2 — the mean","1/2"),
    q(2,"A cube of volume 125 — its edge","5"),q(2,"Double every edge of a 2×3×4 box — volume multiplies by","8")]}
 ],
 8:[
  {id:"y5u8w2p1",w:2,label:"2.1",title:"Two Rules at Once",note:"Add 3 and add 6, side by side, from the same start.",items:[
    q(0,"Rule + 3 from 0: 0, 3, 6, ?","9"),q(0,"Rule + 6 from 0: 0, 6, 12, ?","18"),q(0,"Rule + 2 from 0 — the third term","4"),q(0,"Rule + 4 from 0 — the third term","8"),q(0,"Rule + 5 from 0 — the fourth term","15"),q(0,"Rule + 10 from 0 — the fourth term","30"),
    q(1,"Rules +3 and +6 — the second is how many times the first","2"),q(1,"Rules +2 and +6 — how many times","3"),q(1,"Rules +5 and +10 — how many times","2"),q(1,"Rule + 3 from 0 — the tenth term","27"),q(1,"Rule + 6 from 0 — the tenth term","54"),
    q(2,"Rules +3 and +9 — how many times","3"),q(2,"Rule + 7 from 3 — the twentieth term","136")]},
  {id:"y5u8w2p2",w:2,label:"2.2",title:"Make the Ordered Pairs",note:"Pair the terms in order. First rule across, second up.",items:[
    q(0,"First terms of +3 and +6 from 0 — type as a,b","0,0"),q(0,"Second terms — type as a,b","3,6"),q(0,"Third terms — type as a,b","6,12"),q(0,"Fourth terms — type as a,b","9,18"),q(0,"In (3,6), the across value","3"),q(0,"In (3,6), the up value","6"),
    q(1,"Rules +2 and +4, third terms — type as a,b","4,8"),q(1,"Rules +5 and +10, second terms — type as a,b","5,10"),q(1,"Rules +1 and +3, fourth terms — type as a,b","3,9"),q(1,"In every pair from +3 and +6, up is how many times across","2"),q(1,"Rules +2 and +6, fourth terms — type as a,b","6,18"),
    q(2,"Rules +4 and +12, third terms — type as a,b","8,24"),q(2,"If across is 15 under rules +3 and +6, the up value","30")]},
  {id:"y5u8w2p3",w:2,label:"2.3",title:"Plot the Pairs",note:"They land on a straight line through the origin. Say why.",items:[
    q(0,"Plot (0,0) — the across value","0"),q(0,"Plot (3,6) — the up value","6"),q(0,"Do (0,0), (3,6), (6,12) lie on a line — yes or no","yes"),q(0,"Distance across from (0,0) to (3,6)","3"),q(0,"Distance up from (0,0) to (3,6)","6"),q(0,"The up value when across is 6","12"),
    q(1,"On that line, the up value when across is 9","18"),q(1,"When across is 12","24"),q(1,"When across is 20","40"),q(1,"The rule linking them — type the multiplier","2"),q(1,"When up is 30, the across value","15"),
    q(2,"Rules +2 and +6 — the multiplier linking them","3"),q(2,"On that line, up when across is 14","42")]},
  {id:"y5u8w2p4",w:2,label:"2.4",title:"Relate the Sequences",note:"Every second term is double the first. Prove it three times.",items:[
    q(0,"Double 3","6"),q(0,"Double 6","12"),q(0,"Double 9","18"),q(0,"Half of 12","6"),q(0,"Half of 18","9"),q(0,"Triple 4","12"),
    q(1,"Rules +3 and +6, the fifth terms — type the second one","24"),q(1,"Rules +4 and +8, the third terms — type the second one","16"),q(1,"If the first sequence reaches 21, the second reaches","42"),q(1,"Rules +5 and +15 — the multiplier","3"),q(1,"Rules +2 and +8 — the multiplier","4"),
    q(2,"Rules +6 and +9 — the second is how many times the first, as a/b","3/2"),q(2,"If the first reaches 24 under +6, the second under +9 reaches","36")]},
  {id:"y5u8w2p5",w:2,label:"Fri",title:"Rule Race",note:"One plots, the other names the rule.",items:[
    q(0,"Pairs (1,2), (2,4), (3,6) — the multiplier","2"),q(0,"Pairs (1,3), (2,6) — the multiplier","3"),
    q(1,"Pairs (1,5), (2,10), (3,15) — up when across is 6","30"),q(1,"Pairs (2,8), (3,12) — the multiplier","4"),
    q(2,"Pairs (1,4), (2,7), (3,10) — the rule is × 3 + ? — type the add","1"),q(2,"That rule — up when across is 10","31"),q(2,"Pairs (2,9), (3,13) — the multiplier","4")]},
  {id:"y5u8w3p1",w:3,label:"3.1",title:"Properties of Quadrilaterals",note:"Sides, angles, parallels. Name it from what it does.",items:[
    q(0,"Sides on a quadrilateral","4"),q(0,"Right angles in a rectangle","4"),q(0,"Equal sides on a square","4"),q(0,"Pairs of parallel sides in a parallelogram","2"),q(0,"Right angles in a square","4"),q(0,"Equal sides on a rhombus","4"),
    q(1,"Pairs of parallel sides in a trapezoid","1"),q(1,"Angles in any quadrilateral add to","360"),q(1,"A quadrilateral with three 90° angles — the fourth","90"),q(1,"Equal opposite sides on a parallelogram — how many pairs","2"),q(1,"Lines of symmetry in a rectangle","2"),
    q(2,"A quadrilateral with exactly one pair of parallel sides","trapezoid"),q(2,"A rhombus with right angles is also a","square")]},
  {id:"y5u8w3p2",w:3,label:"3.2",title:"The Hierarchy",note:"Every square is a rectangle. Not the other way round.",items:[
    q(0,"Is every square a rectangle — yes or no","yes"),q(0,"Is every rectangle a square","no"),q(0,"Is every square a quadrilateral","yes"),q(0,"Is every quadrilateral a square","no"),q(0,"Is a square a rhombus","yes"),q(0,"Is every rhombus a square","no"),
    q(1,"Is every rectangle a parallelogram — yes or no","yes"),q(1,"Is every parallelogram a rectangle","no"),q(1,"Is every rhombus a parallelogram","yes"),q(1,"Is a trapezoid a parallelogram","no"),q(1,"Is every square a parallelogram","yes"),
    q(2,"The most specific name for a 4-sided shape with 4 equal sides and 4 right angles","square"),q(2,"The most general of square, rectangle, quadrilateral — type it","quadrilateral")]},
  {id:"y5u8w3p3",w:3,label:"3.3",title:"Classify Triangles",note:"By sides and by angles. Two answers for every triangle.",items:[
    q(0,"Sides on a triangle","3"),q(0,"Angles in a triangle add to","180"),q(0,"Equal sides on an equilateral triangle","3"),q(0,"Equal sides on an isosceles triangle","2"),q(0,"Equal sides on a scalene triangle","0"),q(0,"Each angle of an equilateral triangle","60"),
    q(1,"A triangle with a 90° angle — type its name","right"),q(1,"A triangle with 90° and 30° — the third angle","60"),q(1,"A triangle with 40° and 60° — the third","80"),q(1,"An isosceles triangle with a 40° apex — each base angle","70"),q(1,"Can a triangle have two right angles — yes or no","no"),
    q(2,"A triangle with all angles under 90° — type its name","acute"),q(2,"An isosceles right triangle — each of its other two angles","45")]},
  {id:"y5u8w3p4",w:3,label:"3.4",title:"Always, Sometimes, Never",note:"Judge the statement, then justify it out loud.",items:[
    q(0,"A square is a rectangle","always"),q(0,"A rectangle is a square","sometimes"),q(0,"A triangle has four sides","never"),q(0,"A parallelogram has parallel sides","always"),q(0,"A quadrilateral has a right angle","sometimes"),q(0,"A square is a quadrilateral","always"),
    q(1,"A rhombus is a square","sometimes"),q(1,"A trapezoid is a parallelogram","sometimes"),q(1,"A rectangle's diagonals are equal","always"),q(1,"A triangle has two right angles","never"),q(1,"A parallelogram is a rectangle","sometimes"),
    q(2,"Every rhombus is a parallelogram","always"),q(2,"A shape with four equal sides is a square","sometimes")]},
  {id:"y5u8w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",items:[
    q(0,"In (3, 5), the across value","3"),q(0,"Sides on a quadrilateral","4"),
    q(1,"Distance from (2,3) to (7,3)","5"),q(1,"Rules +3 and +6, third terms — type as a,b","6,12"),q(1,"Angles in any quadrilateral add to","360"),q(1,"Is every square a rectangle — yes or no","yes"),q(1,"A triangle with 90° and 30° — the third angle","60"),
    q(2,"(1,1), (1,5), (6,5), (6,1) — the area","20")]},
  {id:"y5u8w4p1",w:4,label:"4.1",title:"Finish the Map",note:"Ten landmarks, ten ordered pairs, no ambiguity.",items:[
    q(0,"Landmarks on the map","10"),q(0,"The origin — type as a,b","0,0"),q(0,"3 across, 4 up — type as a,b","3,4"),q(0,"In (6,2), the up value","2"),q(0,"Distance from (0,0) to (5,0)","5"),q(0,"Distance from (0,0) to (0,8)","8"),
    q(1,"From (2,3), 4 right and 1 up — type as a,b","6,4"),q(1,"Blocks from (1,1) to (1,9)","8"),q(1,"A park at (3,4), a school at (9,4) — blocks apart","6"),q(1,"From (0,0) to (6,8) across-and-up — blocks","14"),q(1,"Halfway between (0,0) and (10,4) — type as a,b","5,2"),
    q(2,"Each block is 2 units — (5,5) is how many units across from the origin","10"),q(2,"A square route (1,1),(7,1),(7,7),(1,7) — total distance","24")]},
  {id:"y5u8w4p2",w:4,label:"4.2",title:"Write the Directions",note:"Somebody else must be able to follow them exactly.",items:[
    q(0,"From (0,0) move 4 across — type as a,b","4,0"),q(0,"Then 3 up — type as a,b","4,3"),q(0,"Total distance","7"),q(0,"From (2,2) move 2 up — type as a,b","2,4"),q(0,"From (2,2) move 2 across — type as a,b","4,2"),q(0,"Are (2,4) and (4,2) the same — yes or no","no"),
    q(1,"(1,1) to (1,7) to (5,7) — total distance","10"),q(1,"(2,2) to (8,2) to (8,9) — total distance","13"),q(1,"A round trip (0,0) to (6,0) and back","12"),q(1,"(3,3) to (3,10) — distance","7"),q(1,"A square patrol of side 5 — total distance","20"),
    q(2,"A patrol (1,1),(7,1),(7,5),(1,5) and back — total distance","20"),q(2,"The area enclosed by that patrol","24")]},
  {id:"y5u8w4p3",w:4,label:"4.3",title:"Walk Somebody Through It",note:"Fix any pair that misleads them. Mark it honestly.",items:[
    q(0,"10 stops, 8 followed correctly — the percent","80"),q(0,"10 stops, 9 correct — the percent","90"),q(0,"10 minus 7","3"),q(0,"Half of 10 stops","5"),q(0,"10 stops, 5 correct — the percent","50"),q(0,"10 stops, 10 correct — the percent","100"),
    q(1,"4 minutes a stop, 10 stops — minutes","40"),q(1,"Two pairs rewritten out of 10 — the percent","20"),q(1,"85% of 10 stops","8.5"),q(1,"If 9 of 10 are followable, the percent that are not","10"),q(1,"A 40-minute walk over 10 stops — mean minutes each","4"),
    q(2,"12 points a stop, 10 stops, scored 96 — the percent","80"),q(2,"To score 85% of 120 points, she needs","102")]},
  {id:"y5u8w4p4",w:4,label:"Thu",title:"Year-End Sweep",note:"All eight error journals. Name the habit that fixed itself.",items:[
    q(0,"4.2 × 10","42"),q(0,"23 × 14","322"),q(0,"84 ÷ 12","7"),q(0,"0.3 + 0.4","0.7"),q(0,"1/4 + 1/4","1/2"),q(0,"A 2 by 3 by 4 box","24"),
    q(1,"0.035 × 100","3.5"),q(1,"237 × 45","10665"),q(1,"4536 ÷ 21","216"),q(1,"1/2 + 1/3","5/6"),q(1,"3/4 × 2/3","1/2"),
    q(2,"12.4 − 7.856","4.544"),q(2,"5 ÷ 1/4","20")]},
  {id:"y5u8w4p5",w:4,label:"Fri",title:"Mission 08 Test",note:"Twelve items plus the completed map. Final trophy band awarded.",items:[
    q(0,"In (3, 5), the up value","5"),q(0,"Sides on a quadrilateral","4"),
    q(1,"Distance from (4,1) to (4,8)","7"),q(1,"(1,1), (1,5), (6,5), (6,1) — the area","20"),q(1,"Rules +3 and +6, fourth terms — type as a,b","9,18"),q(1,"Rules +2 and +8 — the multiplier","4"),q(1,"Angles in a triangle add to","180"),q(1,"A triangle with 40° and 60° — the third","80"),q(1,"Is every rectangle a parallelogram — yes or no","yes"),q(1,"A rhombus is a square — always, sometimes or never","sometimes"),
    q(2,"A patrol (1,1),(7,1),(7,5),(1,5) — the area enclosed","24"),q(2,"On the line from rules +3 and +6, up when across is 14","28")]}
 ]
};
Object.keys(PRACTICE_Y5_W5).forEach(k=>{ PRACTICE_Y5[k]=PRACTICE_Y5[k].concat(PRACTICE_Y5_W5[k]); });

/* Weeks 3–4 for Year Two Missions 01–03, completing the 34-week year. */
const PRACTICE_Y5_W6 = {
 1:[
  {id:"y5u1w3p1",w:3,label:"3.1",title:"Round to a Named Place",note:"Find the place, look one to its right, decide.",items:[
    q(0,"Round 47 to the nearest ten","50"),q(0,"Round 43 to the nearest ten","40"),q(0,"Round 250 to the nearest hundred","300"),q(0,"Round 4.7 to the nearest whole","5"),q(0,"Round 3.2 to the nearest whole","3"),q(0,"Round 9.8 to the nearest whole","10"),
    q(1,"Round 4,829 to the nearest thousand","5000"),q(1,"Round 4,829 to the nearest hundred","4800"),q(1,"Round 12.5 to the nearest whole","13"),q(1,"Round 0.48 to the nearest tenth","0.5"),q(1,"Round 2.451 to the nearest hundredth","2.45"),
    q(2,"Round 9.96 to the nearest tenth","10"),q(2,"Round 0.0475 to the nearest thousandth","0.048")]},
  {id:"y5u1w3p2",w:3,label:"3.2",title:"Rounding Decimals",note:"Same method, smaller places.",items:[
    q(0,"Round 0.4 to the nearest whole","0"),q(0,"Round 0.6 to the nearest whole","1"),q(0,"Round 1.5 to the nearest whole","2"),q(0,"Round 2.4 to the nearest whole","2"),q(0,"Round 0.35 to the nearest tenth","0.4"),q(0,"Round 0.24 to the nearest tenth","0.2"),
    q(1,"Round 3.456 to the nearest hundredth","3.46"),q(1,"Round 3.456 to the nearest tenth","3.5"),q(1,"Round 0.075 to the nearest hundredth","0.08"),q(1,"Round 12.349 to the nearest tenth","12.3"),q(1,"Round 7.005 to the nearest hundredth","7.01"),
    q(2,"Round 0.9999 to the nearest thousandth","1"),q(2,"Round 2.4999 to the nearest whole","2")]},
  {id:"y5u1w3p3",w:3,label:"3.3",title:"Which Place Matters",note:"Money rounds to hundredths. Distance rarely does.",items:[
    q(0,"Round $4.56 to the nearest cent","4.56"),q(0,"Round $4.567 to the nearest cent","4.57"),q(0,"Round 4.7 to the nearest whole","5"),q(0,"Round 250 to the nearest hundred","300"),q(0,"Round 0.5 to the nearest whole","1"),q(0,"Round $9.49 to the nearest dollar","9"),
    q(1,"Round $19.99 to the nearest dollar","20"),q(1,"Round 1.005 m to the nearest centimetre","1.01"),q(1,"Round 47 minutes to the nearest ten","50"),q(1,"4.4 buses of people — buses needed","5"),q(1,"Round 2.44 km to the nearest tenth","2.4"),
    q(2,"Round $0.075 to the nearest cent","0.08"),q(2,"A price of $2.994 charged to the cent","2.99")]},
  {id:"y5u1w3p4",w:3,label:"3.4",title:"Estimate to Check",note:"Round first, compute second, compare.",items:[
    q(0,"Estimate 4.9 + 3.1","8"),q(0,"Estimate 9.8 − 4.9","5"),q(0,"Estimate 2.1 × 4","8"),q(0,"Estimate 11.9 ÷ 4","3"),q(0,"Estimate 0.9 + 1.1","2"),q(0,"Estimate 5.2 × 2","10"),
    q(1,"Estimate 412 × 19","8000"),q(1,"Estimate 0.49 × 100","50"),q(1,"True value of 0.49 × 100","49"),q(1,"Estimate 19.8 ÷ 5","4"),q(1,"Estimate 12.4 − 7.9","4"),
    q(2,"Estimate 5,120 × 48","250000"),q(2,"True value of 12.4 − 7.856","4.544")]},
  {id:"y5u1w3p5",w:3,label:"Fri",title:"Mid-Unit Quiz",note:"Eight items across Weeks 1–3. 85% to keep flying.",items:[
    q(0,"The 7 in 7,000 is how many times the 7 in 700","10"),q(0,"Write four hundred six thousandths","0.406"),
    q(1,"0.06 × 100","6"),q(1,"850 ÷ 10²","8.5"),q(1,"Write 10⁴ as an ordinary number","10000"),q(1,"Round 2.451 to the nearest hundredth","2.45"),q(1,"Larger: 0.406 or 0.41","0.41"),
    q(2,"Which power of ten takes 0.7 to 7,000","10000")]},
  {id:"y5u1w4p1",w:4,label:"4.1",title:"Finish the Atlas",note:"Every jump labelled with its power of ten.",items:[
    q(0,"A 3 cm object at 10 times — cm","30"),q(0,"At 100 times — cm","300"),q(0,"A 4 m object at one hundredth — cm","4"),q(0,"A 250 cm object at one tenth — cm","25"),q(0,"0.5 mm at 10 times — mm","5"),q(0,"A 2.5 cm object at 100 times — cm","250"),
    q(1,"A 4,000 mm object at one thousandth — mm","4"),q(1,"A 2.5 cm object at 1000 times — metres","25"),q(1,"From 0.5 mm to 5 m — the multiplier","10000"),q(1,"3.5 m at 100 times — metres","350"),q(1,"0.035 × 10⁴","350"),
    q(2,"0.0405 × 1000","40.5"),q(2,"A model one thousandth of 4,000 mm — mm","4")]},
  {id:"y5u1w4p2",w:4,label:"4.2",title:"Explain a Jump",note:"Pick one panel and say what moved and what stayed.",items:[
    q(0,"4.2 × 10","42"),q(0,"42 ÷ 10","4.2"),q(0,"0.7 × 100","70"),q(0,"70 ÷ 100","0.7"),q(0,"3 × 1000","3000"),q(0,"3000 ÷ 1000","3"),
    q(1,"0.06 × 100","6"),q(1,"6 ÷ 100","0.06"),q(1,"2.4 × 1000","2400"),q(1,"2400 ÷ 1000","2.4"),q(1,"0.008 × 1000","8"),
    q(2,"40.5 ÷ 1000","0.0405"),q(2,"How many times bigger is 8.5 than 0.085","100")]},
  {id:"y5u1w4p3",w:4,label:"4.3",title:"Mixed Review",note:"Place value, powers and rounding in one set.",items:[
    q(0,"The 4 in 400 is how many times the 4 in 40","10"),q(0,"One tenth of 500","50"),q(0,"10³","1000"),q(0,"Zeros in 10⁵","5"),q(0,"Larger: 0.5 or 0.35","0.5"),q(0,"Round 4.7 to the nearest whole","5"),
    q(1,"3.5 × 100","350"),q(1,"42 ÷ 100","0.42"),q(1,"0.035 × 100","3.5"),q(1,"Round 4,829 to the nearest thousand","5000"),q(1,"Smallest of 0.6, 0.55, 0.506, 0.65","0.506"),
    q(2,"0.0025 × 10000","25"),q(2,"Round 2.451 to the nearest hundredth","2.45")]},
  {id:"y5u1w4p4",w:4,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",items:[
    q(0,"Tenths in 0.3","3"),q(0,"10²","100"),q(0,"4.2 × 10","42"),q(0,"7 ÷ 1000","0.007"),q(0,"Is 0.4 the same as 0.40 — yes or no","yes"),q(0,"0.05 — name the last place","hundredths"),
    q(1,"0.125 + 0.875","1"),q(1,"850 ÷ 100","8.5"),q(1,"0.06 × 100","6"),q(1,"Round 9.96 to the nearest tenth","10"),q(1,"Larger: 0.08 or 0.075","0.08"),
    q(2,"12.4 − 7.856","4.544"),q(2,"0.0405 × 1000","40.5")]},
  {id:"y5u1w4p5",w:4,label:"Fri",title:"Mission 01 Test",note:"Twelve items plus the Big Question, answered out loud.",items:[
    q(0,"The 3 in 300 is how many times the 3 in 3","100"),q(0,"Write sixty-two thousandths","0.062"),
    q(1,"Hundredths in 0.3","30"),q(1,"2.4 × 10³","2400"),q(1,"7 ÷ 1000","0.007"),q(1,"Round 9.96 to the nearest tenth","10"),q(1,"Round 0.0475 to the nearest thousandth","0.048"),q(1,"Which power of ten takes 0.7 to 700","1000"),q(1,"Smallest of 0.6, 0.55, 0.506, 0.65","0.506"),q(1,"0.035 × 10⁴","350"),
    q(2,"3 + 0.4 + 0.007 as one decimal","3.407"),q(2,"A model one thousandth of 4,000 mm — mm","4")]}
 ],
 2:[
  {id:"y5u2w3p1",w:3,label:"3.1",title:"Round to Estimate",note:"Which way to round, and what it costs you.",items:[
    q(0,"Estimate 19 × 21","400"),q(0,"Estimate 48 × 52","2500"),q(0,"Estimate 31 × 29","900"),q(0,"Estimate 62 × 18","1200"),q(0,"Estimate 78 × 22","1600"),q(0,"Estimate 39 × 11","400"),
    q(1,"Estimate 412 × 19","8000"),q(1,"True value of 412 × 19","7828"),q(1,"Estimate 289 × 31","9000"),q(1,"True value of 289 × 31","8959"),q(1,"Estimate 197 × 203","40000"),
    q(2,"Estimate 5,120 × 48","250000"),q(2,"Estimate 2,450 × 36","90000")]},
  {id:"y5u2w3p2",w:3,label:"3.2",title:"Over or Under",note:"Say before you compute whether your estimate is high or low.",items:[
    q(0,"Rounding both numbers up gives an estimate that is — over or under","over"),q(0,"Rounding both down gives — over or under","under"),q(0,"19 × 21","399"),q(0,"48 × 52","2496"),q(0,"20 × 30","600"),q(0,"40 × 60","2400"),
    q(1,"Estimate 412 × 19 as 400 × 20","8000"),q(1,"True value","7828"),q(1,"Was the estimate over or under","over"),q(1,"Estimate 78 × 22 as 80 × 20","1600"),q(1,"True value of 78 × 22","1716"),
    q(2,"63 × 48","3024"),q(2,"Estimating that as 60 × 50 = 3000 — over or under","under")]},
  {id:"y5u2w3p3",w:3,label:"3.3",title:"Order of Magnitude",note:"Is it hundreds, thousands or tens of thousands?",items:[
    q(0,"30 × 40","1200"),q(0,"300 × 40","12000"),q(0,"300 × 400","120000"),q(0,"3 × 4","12"),q(0,"30 × 4","120"),q(0,"3000 × 4","12000"),
    q(1,"Estimate 34 × 26 to the nearest hundred","900"),q(1,"Estimate 340 × 26","9000"),q(1,"Estimate 3,400 × 26","90000"),q(1,"Digits in the answer to 34 × 26","3"),q(1,"Digits in the answer to 340 × 26","4"),
    q(2,"Someone says 34 × 26 = 68. The real answer","884"),q(2,"Someone says 237 × 45 = 1,185. The real answer","10665")]},
  {id:"y5u2w3p4",w:3,label:"3.4",title:"Mark Somebody's Work",note:"Six worked answers, three wrong. Find them by estimating.",items:[
    q(0,"23 × 14","322"),q(0,"45 × 23","1035"),q(0,"31 × 22","682"),q(0,"38 × 24","912"),q(0,"56 × 27","1512"),q(0,"12 × 12","144"),
    q(1,"23 × 14 given as 92 — the missing partial product","230"),q(1,"45 × 23 given as 135 — the missing partial product","900"),q(1,"237 × 45 given as 1,185 — the missing partial product","9480"),q(1,"56 × 27 with the second row as 112 — it should be","1120"),q(1,"That answer is out by","1008"),
    q(2,"78 × 46","3588"),q(2,"94 × 68","6392")]},
  {id:"y5u2w3p5",w:3,label:"Fri",title:"Stadium Count Begins",note:"Estimate from the photo before looking anything up.",items:[
    q(0,"24 seats × 38 rows","912"),q(0,"20 × 25","500"),q(0,"500 × 16","8000"),q(0,"30 × 30","900"),q(0,"40 × 25","1000"),q(0,"1000 × 16","16000"),
    q(1,"38 × 24","912"),q(1,"912 × 16","14592"),q(1,"Estimate 40 × 25 × 16","16000"),q(1,"The gap between that estimate and the true count","1408"),q(1,"38 × 24 × 8","7296"),
    q(2,"2,450 × 36","88200"),q(2,"1,875 × 24","45000")]},
  {id:"y5u2w4p1",w:4,label:"4.1",title:"Count a Section",note:"Seats per row, rows per section, sections per stadium.",items:[
    q(0,"24 × 2","48"),q(0,"24 × 10","240"),q(0,"24 × 20","480"),q(0,"24 × 30","720"),q(0,"24 × 38","912"),q(0,"12 × 24","288"),
    q(1,"26 × 42","1092"),q(1,"32 × 48","1536"),q(1,"28 × 36","1008"),q(1,"30 × 45","1350"),q(1,"22 × 54","1188"),
    q(2,"38 × 24 × 4","3648"),q(2,"38 × 24 × 16","14592")]},
  {id:"y5u2w4p2",w:4,label:"4.2",title:"Scale It Up",note:"One section times the number of sections.",items:[
    q(0,"900 × 10","9000"),q(0,"900 × 16","14400"),q(0,"1000 × 16","16000"),q(0,"500 × 16","8000"),q(0,"900 × 2","1800"),q(0,"900 × 4","3600"),
    q(1,"912 × 16","14592"),q(1,"912 × 8","7296"),q(1,"1,092 × 12","13104"),q(1,"1,536 × 10","15360"),q(1,"1,008 × 20","20160"),
    q(2,"14,592 to the nearest thousand","15000"),q(2,"912 × 20","18240")]},
  {id:"y5u2w4p3",w:4,label:"4.3",title:"Explain the Gap",note:"Compare to the published capacity and account for the difference.",items:[
    q(0,"16,000 − 14,592","1408"),q(0,"900 − 884","16"),q(0,"15,000 − 14,592","408"),q(0,"16,000 − 15,000","1000"),q(0,"1000 − 912","88"),q(0,"2500 − 2496","4"),
    q(1,"Estimating 38 × 24 as 40 × 25 — over by","88"),q(1,"That gap multiplied by 16","1408"),q(1,"1,408 as a percent of 14,592, to the nearest whole","10"),q(1,"Estimating 197 × 48 as 200 × 50 — the estimate","10000"),q(1,"True value of 197 × 48","9456"),
    q(2,"197 × 203","39991"),q(2,"An estimate of 40,000 is over by","9")]},
  {id:"y5u2w4p4",w:4,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",items:[
    q(0,"7 × 8","56"),q(0,"40 × 60","2400"),q(0,"23 × 14","322"),q(0,"12 × 6","72"),q(0,"400 × 70","28000"),q(0,"9 × 9","81"),
    q(1,"45 × 23","1035"),q(1,"237 × 45","10665"),q(1,"506 × 34","17204"),q(1,"1,234 × 12","14808"),q(1,"Estimate 412 × 19","8000"),
    q(2,"9,999 × 99","989901"),q(2,"2,450 × 36","88200")]},
  {id:"y5u2w4p5",w:4,label:"Fri",title:"Mission 02 Test",note:"Twelve items plus the Big Question, answered out loud.",items:[
    q(0,"50 × 50","2500"),q(0,"38 × 24","912"),
    q(1,"56 × 27","1512"),q(1,"289 × 31","8959"),q(1,"125 × 24","3000"),q(1,"2,450 × 36","88200"),q(1,"Estimate 5,120 × 48","250000"),q(1,"Estimate 197 × 203","40000"),q(1,"1,875 × 24","45000"),q(1,"9,999 × 99","989901"),
    q(2,"237 × 45 given as 1,185 — the missing partial product","9480"),q(2,"38 rows of 24 seats in 16 sections","14592")]}
 ],
 3:[
  {id:"y5u3w3p1",w:3,label:"3.1",title:"Find the Remainder",note:"It is always smaller than the divisor. Always.",items:[
    q(0,"17 ÷ 5 — the remainder","2"),q(0,"23 ÷ 4 — the remainder","3"),q(0,"50 ÷ 6 — the remainder","2"),q(0,"100 ÷ 3 — the remainder","1"),q(0,"20 ÷ 5 — the remainder","0"),q(0,"19 ÷ 6 — the remainder","1"),
    q(1,"100 ÷ 7 — the remainder","2"),q(1,"500 ÷ 23 — the remainder","17"),q(1,"750 ÷ 24 — the remainder","6"),q(1,"1000 ÷ 31 — the remainder","8"),q(1,"250 ÷ 12 — the remainder","10"),
    q(2,"Dividing by 23, the remainder must be less than","23"),q(2,"The largest possible remainder when dividing by 24","23")]},
  {id:"y5u3w3p2",w:3,label:"3.2",title:"Round Up or Down",note:"Buses round up. Full boxes round down.",items:[
    q(0,"100 people, buses hold 30 — buses","4"),q(0,"100 pencils, boxes of 30 — full boxes","3"),q(0,"50 people, cars hold 4 — cars","13"),q(0,"50 pencils, packs of 4 — full packs","12"),q(0,"10 people, tables of 4 — tables","3"),q(0,"10 pencils, packs of 4 — full packs","2"),
    q(1,"200 people, buses hold 45 — buses","5"),q(1,"200 items, boxes of 45 — full boxes","4"),q(1,"1,000 miles at 200 a day — days","5"),q(1,"1,050 miles at 200 a day — days","6"),q(1,"90 cupcakes, trays of 12 — trays","8"),
    q(2,"1,200 miles with no day over 200 — days","6"),q(2,"145 people, buses hold 30 — buses","5")]},
  {id:"y5u3w3p3",w:3,label:"3.3",title:"Keep It as a Fraction",note:"Pizza does not round. Neither does money.",items:[
    q(0,"$10 split 4 ways","2.5"),q(0,"$5 split 2 ways","2.5"),q(0,"$9 split 2 ways","4.5"),q(0,"$20 split 8 ways","2.5"),q(0,"$6 split 4 ways","1.5"),q(0,"$12 split 8 ways","1.5"),
    q(1,"$50 split 4 ways, to the cent","12.5"),q(1,"$100 split 30 ways, to the cent","3.33"),q(1,"$40 split 3 ways, to the cent","13.33"),q(1,"7 pizzas split 4 ways, as a decimal","1.75"),q(1,"$15 split 4 ways","3.75"),
    q(2,"100 ÷ 7 as a decimal to two places","14.29"),q(2,"$100 split 30 ways — cents left over","10")]},
  {id:"y5u3w3p4",w:3,label:"3.4",title:"Four Questions, One Division",note:"100 ÷ 30 answered four ways, all correct.",items:[
    q(0,"100 ÷ 30 — the whole part","3"),q(1,"100 ÷ 30 — the remainder","10"),q(0,"100 ÷ 30 rounded up","4"),q(0,"100 ÷ 30 rounded down","3"),q(0,"30 × 3","90"),q(0,"100 − 90","10"),
    q(1,"100 people, buses of 30 — buses","4"),q(1,"100 pencils, full boxes of 30","3"),q(1,"$100 split 30 ways, to the cent","3.33"),q(1,"100 ÷ 30 — the remainder","10"),q(1,"30 × 3 + 10","100"),
    q(2,"For money, which answer suits — type decimal or remainder","decimal"),q(2,"For buses, which suits — type up or down","up")]},
  {id:"y5u3w3p5",w:3,label:"Fri",title:"Budget the Miles",note:"Miles per day, tanks per trip, dollars per person.",items:[
    q(0,"600 miles over 3 days — miles a day","200"),q(0,"$120 over 4 days — dollars a day","30"),q(0,"1200 ÷ 6","200"),q(0,"400 × 3","1200"),q(0,"60 × 20","1200"),q(0,"240 × 5","1200"),
    q(1,"1,200 miles at 60 mph — hours","20"),q(1,"A tank does 400 miles — tanks for 1,200","3"),q(1,"$1,440 over 12 days","120"),q(1,"960 miles over 4 days","240"),q(1,"2,400 miles at 55 mph — hours, rounded up","44"),
    q(2,"1,200 miles over 5 equal days — miles a day","240"),q(2,"Capped at 200 miles a day — days","6")]},
  {id:"y5u3w4p1",w:4,label:"4.1",title:"Finish the Budget",note:"Every line item divided out and totalled.",items:[
    q(0,"3 days at $120","360"),q(0,"$360 + $200","560"),q(0,"5 × $40","200"),q(0,"$600 − $560","40"),q(0,"4 × $50","200"),q(0,"$1,000 ÷ 5","200"),
    q(1,"12 days at $120","1440"),q(1,"3 tanks at $65","195"),q(1,"$1,440 + $195","1635"),q(1,"$1,635 split 4 people, to the cent","408.75"),q(1,"1,200 miles over 3 tanks","400"),
    q(2,"$1,635 over 12 days, to the cent","136.25"),q(2,"A $2,000 budget less $1,635","365")]},
  {id:"y5u3w4p2",w:4,label:"4.2",title:"Defend the Rounding",note:"Pick three lines and say why each rounded the way it did.",items:[
    q(0,"2.9 tanks of fuel — tanks bought","3"),q(0,"2.9 rounded down","2"),q(0,"Round 13.334 to the cent","13.33"),q(0,"Round 2.5 up","3"),q(0,"Round 2.4 down","2"),q(0,"Round $9.996 to the cent","10"),
    q(1,"1,250 miles, a tank does 400 — tanks needed","4"),q(1,"1,250 miles — full tanks used","3"),q(1,"$50 split 3 ways, to the cent","16.67"),q(1,"Cents left over on that split","1"),q(1,"1,200 ÷ 400","3"),
    q(2,"1,250 miles with 4 tanks bought — miles of spare range","350"),q(2,"$1,635 split 12 ways, to the cent","136.25")]},
  {id:"y5u3w4p3",w:4,label:"4.3",title:"Mixed Review",note:"Long division and remainder interpretation together.",items:[
    q(0,"84 ÷ 12","7"),q(0,"372 ÷ 3","124"),q(0,"100 ÷ 7 — the whole part","14"),q(0,"100 ÷ 7 — the remainder","2"),q(0,"600 ÷ 30","20"),q(0,"936 ÷ 24","39"),
    q(1,"4,536 ÷ 21","216"),q(1,"7,308 ÷ 36","203"),q(1,"812 ÷ 29","28"),q(1,"8,464 ÷ 46","184"),q(1,"750 ÷ 24 — the remainder","6"),
    q(2,"12,060 ÷ 60","201"),q(2,"100 people, buses of 30 — buses","4")]},
  {id:"y5u3w4p4",w:4,label:"Thu",title:"Error Journal Sweep",note:"Re-read every entry from the mission. Fix only what repeats.",items:[
    q(0,"72 ÷ 8","9"),q(0,"618 ÷ 6","103"),q(0,"63 ÷ 9","7"),q(0,"300 ÷ 5","60"),q(0,"120 ÷ 4","30"),q(0,"360 ÷ 6","60"),
    q(1,"936 ÷ 24","39"),q(1,"3,120 ÷ 39","80"),q(1,"1,178 ÷ 31","38"),q(1,"9,072 ÷ 24","378"),q(1,"2,451 ÷ 43","57"),
    q(2,"6,036 ÷ 6","1006"),q(2,"500 ÷ 23 — the remainder","17")]},
  {id:"y5u3w4p5",w:4,label:"Fri",title:"Mission 03 Test",note:"Twelve items plus the Big Question, answered out loud.",items:[
    q(0,"618 ÷ 6","103"),q(0,"884 ÷ 34","26"),
    q(1,"8,464 ÷ 46","184"),q(1,"9,072 ÷ 24","378"),q(1,"6,036 ÷ 6","1006"),q(1,"1,178 ÷ 31","38"),q(1,"750 ÷ 24 — the remainder","6"),q(1,"Estimate 6,300 ÷ 68 to the nearest ten","90"),q(1,"100 people, buses of 30 — buses","4"),q(1,"100 pencils, full boxes of 30","3"),
    q(2,"$100 split 30 ways, to the cent","3.33"),q(2,"1,200 miles capped at 200 a day — days","6")]}
 ]
};
Object.keys(PRACTICE_Y5_W6).forEach(k=>{ PRACTICE_Y5[k]=PRACTICE_Y5[k].concat(PRACTICE_Y5_W6[k]); });

const ALL_SETS_Y5 = [].concat(...Object.keys(PRACTICE_Y5).map(k=>PRACTICE_Y5[k]));

// ── Extended item banks ───────────────────────────────────────────────────
// Append-only. Each key is a set id; its items are concatenated onto that
// set's own items, doubling the bank the Streak Run draws from. Nothing
// above this line is modified, so ids, labels and week grouping are intact.
const Y5_BRIEFINGS = {
  1:"Every place is ten of the one beside it. Learn that once and half of fifth grade stops being new material.",
  2:"The algorithm is the area model folded up small. If you can't point at where a box went, you're copying steps rather than doing maths.",
  3:"Long division is four moves repeated until you run out of digits. Say the four out loud until your hand does them without you.",
  4:"Estimate first, always. A decimal point in the wrong place is the difference between a coffee and a car.",
  5:"You cannot add halves to thirds. Cut both into sixths and the argument disappears.",
  6:"Multiplying does not always make things bigger. That sentence undoes four years of habit, so take your time with it.",
  7:"Area covers, volume fills. Squared for the first, cubed for the second, and the units tell you which you meant.",
  8:"Along the hall, then up the stairs. Get that order wrong and every point on your map lands somewhere else.",
};

const LESSONS_Y5_U1 = {
  y5u1p1:{title:"Every place is ten of the next",sub:"Why the ladder never stops",steps:[
    {cap:"One unit. A single square — the ones place.",cols:[{l:"1",s:1}],rows:[{l:"1",s:1}],cells:[{v:"1"}]},
    {cap:"Ten of those in a row. That strip is the tens place, and it is exactly ten times the square.",cols:[{l:"10",s:10}],rows:[{l:"1",s:1}],cells:[{v:"10"}]},
    {cap:"Ten strips stacked. Now you have a hundred — ten times the strip, a hundred times the square.",cols:[{l:"10",s:10}],rows:[{l:"10",s:10}],cells:[{v:"100"}]},
    {cap:"The 4 in 40 is four strips. The 4 in 400 is four of those big squares — ten times as much.",cols:[{l:"10",s:10},{l:"10",s:10},{l:"10",s:10},{l:"10",s:10}],rows:[{l:"1",s:1}],cells:[{v:"10"},{v:"10"},{v:"10"},{v:"10"}],sum:"4 in 40 → 4 in 400 is ten times bigger"},
    {cap:"Going the other way divides by ten each step. Cut the ones square into ten and each sliver is a tenth: 0.1.",cols:[{l:"0.1",s:1},{l:"",s:1},{l:"",s:1},{l:"",s:1},{l:"",s:1},{l:"",s:1},{l:"",s:1},{l:"",s:1},{l:"",s:1},{l:"",s:1}],rows:[{l:"1",s:2}],cells:[{v:"·"},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}]},
    {cap:"That is the whole system. Left is ten times, right is one tenth, and the decimal point only marks where the whole numbers stop.",cols:[{l:"100",s:10},{l:"10",s:6},{l:"1",s:3},{l:"0.1",s:1}],rows:[{l:"",s:4}],cells:[{v:"100"},{v:"10"},{v:"1"},{v:"·"}],sum:"× 10 going left · ÷ 10 going right"}
  ]},
  y5u1p2:{title:"Three places past the point",sub:"Tenths, hundredths, thousandths",steps:[
    {cap:"One whole bar. Everything below is a piece of this.",cols:[{l:"1 whole",s:20}],rows:[{l:"",s:5}],cells:[{v:"1"}]},
    {cap:"Cut it into ten. Each strip is a tenth — 0.1. Four of them is 0.4.",cols:[{l:"0.1",s:2},{l:"0.1",s:2},{l:"0.1",s:2},{l:"0.1",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2}],rows:[{l:"",s:5}],cells:[{v:"·"},{v:"·"},{v:"·"},{v:"·"},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}],sum:"4 tenths = 0.4"},
    {cap:"Cut one tenth into ten again. Each of those is a hundredth — 0.01. It takes a hundred to rebuild the whole.",cols:[{l:"0.01",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2}],rows:[{l:"one tenth",s:3}],cells:[{v:"·"},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}]},
    {cap:"Once more and you have thousandths. So 0.406 is four tenths, no hundredths, six thousandths.",cols:[{l:"0.4",s:8},{l:"0.00",s:1},{l:"0.006",s:3}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:"0"},{v:"6"}],sum:"0.406 = four hundred six thousandths"},
    {cap:"Say the last place and you have named the whole number. The zero is not decoration — it holds the hundredths column open.",cols:[{l:"0.4",s:8},{l:"0.00",s:1},{l:"0.006",s:3}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:"0"},{v:"6"}],sum:"Drop the zero and you get 0.46 — a different number"}
  ]},
  y5u1p3:{title:"Three ways to write one number",sub:"Standard, words, expanded",steps:[
    {cap:"2.35. Two wholes and some part left over.",cols:[{l:"2",s:12},{l:".35",s:4}],rows:[{l:"",s:5}],cells:[{v:"2"},{v:"?"}]},
    {cap:"The part is three tenths and five hundredths. Both pieces have names.",cols:[{l:"0.3",s:6},{l:"0.05",s:1}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"5"}]},
    {cap:"Add the pieces back: 2 + 0.3 + 0.05. That is expanded form, and it is just the place-value ladder written as a sum.",cols:[{l:"2",s:12},{l:"0.3",s:6},{l:"0.05",s:1}],rows:[{l:"",s:4}],cells:[{v:"2"},{v:"0.3"},{v:"0.05"}],sum:"2 + 0.3 + 0.05 = 2.35"},
    {cap:"Now say it: two and thirty-five hundredths. The last place gives the whole decimal its name.",cols:[{l:"2",s:12},{l:"35 hundredths",s:7}],rows:[{l:"",s:4}],cells:[{v:"2"},{v:"35"}],sum:"Three ways, one number"}
  ]},
  y5u1p4:{title:"Why 0.41 beats 0.406",sub:"Compare place by place",steps:[
    {cap:"Both start with 4 tenths. That column tells you nothing, so ignore it.",cols:[{l:"0.4",s:8}],rows:[{l:"both",s:4}],cells:[{v:"4"}]},
    {cap:"Move one place right. 0.406 has zero hundredths.",cols:[{l:"0.4",s:8},{l:"0",s:1}],rows:[{l:"0.406",s:4}],cells:[{v:"4"},{v:"0"}]},
    {cap:"0.41 has one hundredth. One beats none, and the comparison is settled right there.",cols:[{l:"0.4",s:8},{l:"1",s:2}],rows:[{l:"0.41",s:4}],cells:[{v:"4"},{v:"1"}],sum:"0.41 > 0.406"},
    {cap:"Write 0.41 as 0.410 and the columns line up on sight. A trailing zero costs nothing and settles most arguments.",cols:[{l:"4",s:8},{l:"1",s:2},{l:"0",s:1}],rows:[{l:"0.410",s:4}],cells:[{v:"4"},{v:"1"},{v:"0"}],sum:"More digits does not mean bigger"}
  ]},
  y5u1p5:{title:"Where to put your best digit",sub:"The strategy behind Decimal Duel",steps:[
    {cap:"Four cards to place: _ . _ _ _ . Every slot is worth ten times the one to its right.",cols:[{l:"ones",s:10},{l:"0.1",s:5},{l:"0.01",s:2},{l:"0.001",s:1}],rows:[{l:"",s:4}],cells:[{v:"?"},{v:"?"},{v:"?"},{v:"?"}]},
    {cap:"Say you draw 8, 5, 2 and 9. Put the 9 in the ones place — that slot is worth more than all the others combined.",cols:[{l:"9",s:10},{l:"",s:5},{l:"",s:2},{l:"",s:1}],rows:[{l:"",s:4}],cells:[{v:"9"},{v:""},{v:""},{v:""}]},
    {cap:"Next biggest into tenths, and so on down. Greedy works here precisely because each place is ten times the next.",cols:[{l:"9",s:10},{l:"8",s:5},{l:"5",s:2},{l:"2",s:1}],rows:[{l:"",s:4}],cells:[{v:"9"},{v:"8"},{v:"5"},{v:"2"}],sum:"9.852 — the largest arrangement"},
    {cap:"The thousandths card barely matters. Swapping the last two digits changes the number by three thousandths; swapping the first two changes it by more than one.",cols:[{l:"9",s:10},{l:"8",s:5},{l:"2",s:2},{l:"5",s:1}],rows:[{l:"",s:4}],cells:[{v:"9"},{v:"8"},{v:"2"},{v:"5"}],sum:"9.852 vs 9.825 — a gap of only 0.027"}
  ]}
};

const LESSONS_Y5_U2 = {
  y5u2p1:{title:"Four rooms, always four",sub:"Two digits times two digits",steps:[
    {cap:"23 × 14. Both numbers are big, so draw the rectangle instead of guessing.",cols:[{l:"23",s:23}],rows:[{l:"14",s:14}],cells:[{v:"?"}]},
    {cap:"Cut the width into tens and ones: 20 and 3.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"14",s:14}],cells:[{v:""},{v:""}]},
    {cap:"Cut the height too: 10 and 4. Four rooms — never three.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:""},{v:""},{v:""},{v:""}]},
    {cap:"20 × 10 = 200. The biggest room is the easiest one.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:""},{v:""},{v:""}]},
    {cap:"3 × 10 = 30, and 20 × 4 = 80.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:""}]},
    {cap:"3 × 4 = 12. That corner is where almost every wrong answer hides.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}]},
    {cap:"Add all four. Somebody who answers 92 found only the bottom row — a whole 230 of rectangle went missing.",cols:[{l:"20",s:20},{l:"3",s:3}],rows:[{l:"10",s:10},{l:"4",s:4}],cells:[{v:"200"},{v:"30"},{v:"80"},{v:"12"}],sum:"23 × 14 = 200 + 30 + 80 + 12 = 322"}
  ]},
  y5u2p2:{title:"Six rooms now",sub:"Three digits times two",steps:[
    {cap:"237 × 45. One more digit means one more column of rooms.",cols:[{l:"237",s:24}],rows:[{l:"45",s:14}],cells:[{v:"?"}]},
    {cap:"Split 237 into 200, 30 and 7. Split 45 into 40 and 5. Three columns by two rows is six rooms.",cols:[{l:"200",s:14},{l:"30",s:6},{l:"7",s:3}],rows:[{l:"40",s:10},{l:"5",s:4}],cells:[{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}]},
    {cap:"Top row, times 40: 8000, 1200, 280.",cols:[{l:"200",s:14},{l:"30",s:6},{l:"7",s:3}],rows:[{l:"40",s:10},{l:"5",s:4}],cells:[{v:"8000"},{v:"1200"},{v:"280"},{v:""},{v:""},{v:""}]},
    {cap:"Bottom row, times 5: 1000, 150, 35.",cols:[{l:"200",s:14},{l:"30",s:6},{l:"7",s:3}],rows:[{l:"40",s:10},{l:"5",s:4}],cells:[{v:"8000"},{v:"1200"},{v:"280"},{v:"1000"},{v:"150"},{v:"35"}]},
    {cap:"Estimate before you add: 240 × 45 is about 10,800, so the answer should land just under that.",cols:[{l:"200",s:14},{l:"30",s:6},{l:"7",s:3}],rows:[{l:"40",s:10},{l:"5",s:4}],cells:[{v:"8000"},{v:"1200"},{v:"280"},{v:"1000"},{v:"150"},{v:"35"}],sum:"237 × 45 = 10,665 — and 10,800 was close"}
  ]},
  y5u2p3:{title:"Why the second row shifts",sub:"The zero you stopped writing",steps:[
    {cap:"45 × 23 the written way. The first row is 45 × 3 = 135.",cols:[{l:"45",s:22}],rows:[{l:"3",s:3}],cells:[{v:"135"}]},
    {cap:"The second row is NOT 45 × 2. It is 45 × 20, which is 900 — ten times as tall.",cols:[{l:"45",s:22}],rows:[{l:"20",s:12}],cells:[{v:"900"}]},
    {cap:"Stack them and you can see why one row is a sliver and the other is the bulk of the answer.",cols:[{l:"45",s:22}],rows:[{l:"20",s:12},{l:"3",s:3}],cells:[{v:"900"},{v:"135"}],sum:"900 + 135 = 1035"},
    {cap:"Writing 900 as 90 loses 810 of that rectangle. The shift left is the zero you are allowed to stop writing — once you know it is there.",cols:[{l:"45",s:22}],rows:[{l:"20",s:12},{l:"3",s:3}],cells:[{v:"900"},{v:"135"}],sum:"Write the zero until you no longer need it"}
  ]},
  y5u2p4:{title:"Estimate first, always",sub:"How a rough answer catches a wrong one",steps:[
    {cap:"46 × 32. Before any arithmetic, round: 50 × 30 = 1500. That is your net.",cols:[{l:"50",s:25}],rows:[{l:"30",s:15}],cells:[{v:"1500"}]},
    {cap:"Now the real rectangle. 40 and 6 across, 30 and 2 down.",cols:[{l:"40",s:20},{l:"6",s:6}],rows:[{l:"30",s:15},{l:"2",s:2}],cells:[{v:"1200"},{v:"180"},{v:"80"},{v:"12"}]},
    {cap:"1200 + 180 + 80 + 12 = 1472. Close to 1500, so it is believable.",cols:[{l:"40",s:20},{l:"6",s:6}],rows:[{l:"30",s:15},{l:"2",s:2}],cells:[{v:"1200"},{v:"180"},{v:"80"},{v:"12"}],sum:"46 × 32 = 1472 · estimate 1500 ✓"},
    {cap:"An answer of 147 or 14,720 would fail the net instantly — a misplaced digit is always wrong by a factor of ten, and that is the easiest error to spot.",cols:[{l:"40",s:20},{l:"6",s:6}],rows:[{l:"30",s:15},{l:"2",s:2}],cells:[{v:"1200"},{v:"180"},{v:"80"},{v:"12"}],sum:"The estimate checks the size, not the steps"}
  ]},
  y5u2p5:{title:"Rounding one up and one down",sub:"Why 48 × 52 estimates so well",steps:[
    {cap:"48 × 52. Round both up to 50 × 60 and you get 3000 — far too big.",cols:[{l:"50",s:25}],rows:[{l:"60",s:18}],cells:[{v:"3000"}]},
    {cap:"Round one up and one down instead: 50 × 50 = 2500. The two errors work against each other.",cols:[{l:"50",s:25}],rows:[{l:"50",s:15}],cells:[{v:"2500"}]},
    {cap:"The true answer is 2496. Four away from an estimate you did in your head.",cols:[{l:"48",s:24},{l:"2",s:2}],rows:[{l:"50",s:15},{l:"2",s:2}],cells:[{v:"2400"},{v:"100"},{v:"96"},{v:"4"}],sum:"48 × 52 = 2496 · estimate 2500"},
    {cap:"That is not luck. Losing two from one side and gaining two on the other nearly cancels — which is why numbers straddling a friendly ten are the easiest of all to estimate.",cols:[{l:"48",s:24},{l:"2",s:2}],rows:[{l:"50",s:15},{l:"2",s:2}],cells:[{v:"2400"},{v:"100"},{v:"96"},{v:"4"}],sum:"Errors that pull opposite ways cancel"}
  ]}
};

const LESSONS_Y5_U3 = {
  y5u3p1:{title:"Division is a missing side",sub:"The four steps, seen as area",steps:[
    {cap:"372 ÷ 3. Think of it as a rectangle of area 372 that is 3 tall. How wide?",cols:[{l:"?",s:24}],rows:[{l:"3",s:3}],cells:[{v:"372"}]},
    {cap:"Take the biggest easy chunk first: 3 × 100 = 300. That uses up most of the area.",cols:[{l:"100",s:20},{l:"?",s:4}],rows:[{l:"3",s:3}],cells:[{v:"300"},{v:"72"}]},
    {cap:"72 left, still 3 tall. 3 × 20 = 60.",cols:[{l:"100",s:18},{l:"20",s:4},{l:"?",s:2}],rows:[{l:"3",s:3}],cells:[{v:"300"},{v:"60"},{v:"12"}]},
    {cap:"12 left. 3 × 4 = 12 exactly, and the rectangle closes.",cols:[{l:"100",s:18},{l:"20",s:4},{l:"4",s:2}],rows:[{l:"3",s:3}],cells:[{v:"300"},{v:"60"},{v:"12"}],sum:"100 + 20 + 4 = 124"},
    {cap:"Long division writes exactly this, one place at a time. Multiply your answer back — 124 × 3 = 372 — and the check is free.",cols:[{l:"124",s:24}],rows:[{l:"3",s:3}],cells:[{v:"372"}],sum:"372 ÷ 3 = 124 ✓"}
  ]},
  y5u3p2:{title:"Guess, check, adjust",sub:"Two-digit divisors",steps:[
    {cap:"936 ÷ 24. Area 936, height 24 — and 24 is not a number you know by heart.",cols:[{l:"?",s:26}],rows:[{l:"24",s:12}],cells:[{v:"936"}]},
    {cap:"Round 24 down to 20 to guess. 20 into 93 is about 4, so try 24 × 40 = 960 — too big, it overflows the rectangle.",cols:[{l:"40",s:26}],rows:[{l:"24",s:12}],cells:[{v:"960"}],strip:true},
    {cap:"Back off to 30: 24 × 30 = 720. That fits, with 216 to spare.",cols:[{l:"30",s:20},{l:"?",s:6}],rows:[{l:"24",s:12}],cells:[{v:"720"},{v:"216"}]},
    {cap:"216 left. 24 × 9 = 216 exactly.",cols:[{l:"30",s:20},{l:"9",s:6}],rows:[{l:"24",s:12}],cells:[{v:"720"},{v:"216"}],sum:"30 + 9 = 39"},
    {cap:"The first guess being wrong is normal. Rounding the divisor down makes your guess too big; rounding it up makes it too small. Expect to adjust.",cols:[{l:"39",s:26}],rows:[{l:"24",s:12}],cells:[{v:"936"}],sum:"936 ÷ 24 = 39 ✓"}
  ]},
  y5u3p3:{title:"How many digits will it have?",sub:"Sizing the answer before you start",steps:[
    {cap:"4536 ÷ 21. Before dividing, ask how wide the rectangle roughly is.",cols:[{l:"?",s:26}],rows:[{l:"21",s:10}],cells:[{v:"4536"}]},
    {cap:"21 × 100 = 2100. That fits inside 4536, so the answer is at least a hundred.",cols:[{l:"100",s:13},{l:"?",s:13}],rows:[{l:"21",s:10}],cells:[{v:"2100"},{v:"2436"}]},
    {cap:"21 × 1000 = 21,000 — far too big. So the answer sits in the hundreds: three digits.",cols:[{l:"1000",s:26}],rows:[{l:"21",s:10}],cells:[{v:"21000"}],strip:true},
    {cap:"Now divide knowing what to expect. The answer is 216 — three digits, as predicted.",cols:[{l:"200",s:18},{l:"16",s:8}],rows:[{l:"21",s:10}],cells:[{v:"4200"},{v:"336"}],sum:"4536 ÷ 21 = 216"},
    {cap:"Somebody who answers 26 has dropped a digit. You know that without checking a single step of their arithmetic.",cols:[{l:"216",s:26}],rows:[{l:"21",s:10}],cells:[{v:"4536"}],sum:"Wrong number of digits = wrong answer"}
  ]},
  y5u3p4:{title:"What is left over",sub:"Remainders, and the rule that bounds them",steps:[
    {cap:"100 ÷ 7. Area 100, height 7 — this one will not come out even.",cols:[{l:"?",s:22}],rows:[{l:"7",s:7}],cells:[{v:"100"}]},
    {cap:"7 × 14 = 98. That fits, and 2 is left over.",cols:[{l:"14",s:20},{l:"",s:2}],rows:[{l:"7",s:7}],cells:[{v:"98"},{v:"2"}],sum:"100 ÷ 7 = 14 r 2"},
    {cap:"Check it: 14 × 7 + 2 = 100. Quotient times divisor plus remainder always rebuilds what you started with.",cols:[{l:"14",s:20},{l:"",s:2}],rows:[{l:"7",s:7}],cells:[{v:"98"},{v:"2"}],sum:"14 × 7 + 2 = 100 ✓"},
    {cap:"The remainder must be smaller than the divisor. If somebody says 13 r 9, that leftover 9 still has a whole 7 inside it — the quotient was too small.",cols:[{l:"13",s:18},{l:"9",s:4}],rows:[{l:"7",s:7}],cells:[{v:"91"},{v:"9"}],strip:true,sum:"A remainder bigger than the divisor is always wrong"}
  ]},
  y5u3p5:{title:"Same division, four answers",sub:"What the leftover means",steps:[
    {cap:"100 ÷ 30. The arithmetic gives 3 with 10 left over — every time, whatever the question was.",cols:[{l:"3",s:18},{l:"10",s:6}],rows:[{l:"30",s:12}],cells:[{v:"90"},{v:"10"}],sum:"100 ÷ 30 = 3 r 10"},
    {cap:"100 people, buses hold 30. Three buses leave ten people standing, so you need four. Round up.",cols:[{l:"4 buses",s:24}],rows:[{l:"30",s:12}],cells:[{v:"120 seats"}],sum:"Answer: 4"},
    {cap:"100 pencils into boxes of 30. Only complete boxes count, so the answer is three and ten pencils sit loose. Round down.",cols:[{l:"3 boxes",s:18},{l:"10 loose",s:6}],rows:[{l:"30",s:12}],cells:[{v:"90"},{v:"10"}],sum:"Answer: 3"},
    {cap:"$100 split thirty ways. Money divides, so keep going past the point: $3.33 each, with ten cents over.",cols:[{l:"$3.33",s:24}],rows:[{l:"30",s:12}],cells:[{v:"99.90"}],sum:"Answer: 3.33"},
    {cap:"One division, three different right answers. The arithmetic gives you a number — the situation tells you what to do with it.",cols:[{l:"3",s:18},{l:"10",s:6}],rows:[{l:"30",s:12}],cells:[{v:"90"},{v:"10"}],sum:"Up · down · or keep the remainder"}
  ]}
};

const LESSONS_Y5_U4 = {
  y5u4p1:{title:"Line up the point, not the digits",sub:"Why 3.5 becomes 3.50",steps:[
    {cap:"3.5 + 0.47. Two numbers of different lengths — that is the whole difficulty.",cols:[{l:"3.5",s:18},{l:"0.47",s:3}],rows:[{l:"",s:4}],cells:[{v:"?"},{v:"?"}]},
    {cap:"Line up the last digits and the 7 hundredths lands in the tenths column. That is how you get 3.52 — wrong.",cols:[{l:"3.5",s:18},{l:"0.47",s:3}],rows:[{l:"wrong",s:4}],cells:[{v:"3.52"},{v:"✗"}],strip:true},
    {cap:"Write 3.5 as 3.50. Both numbers are now two places long, and a trailing zero adds nothing to the value.",cols:[{l:"3.50",s:18}],rows:[{l:"",s:4}],cells:[{v:"3.50"}]},
    {cap:"Now the columns match themselves up: 50 hundredths plus 47 hundredths is 97 hundredths.",cols:[{l:"3",s:14},{l:"0.97",s:5}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"0.97"}],sum:"3.50 + 0.47 = 3.97"},
    {cap:"Ten seconds writing zeros saves the whole problem. Do it before you start, every time.",cols:[{l:"3",s:14},{l:"0.97",s:5}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"0.97"}],sum:"Same length in, right answer out"}
  ]},
  y5u4p2:{title:"A whole number in disguise",sub:"Subtracting across the point",steps:[
    {cap:"4 − 1.35. There is nothing in the hundredths column to take 5 from.",cols:[{l:"4",s:20}],rows:[{l:"",s:4}],cells:[{v:"4"}]},
    {cap:"Write 4 as 4.00. Same amount, but now every column exists.",cols:[{l:"4.00",s:20}],rows:[{l:"",s:4}],cells:[{v:"4.00"}]},
    {cap:"Take 1.35 away. Borrowing works exactly as it does with whole numbers — the point does not change the rules.",cols:[{l:"2.65",s:13},{l:"1.35",s:7}],rows:[{l:"",s:4}],cells:[{v:"2.65"},{v:"1.35"}],sum:"4.00 − 1.35 = 2.65"},
    {cap:"Check by adding back: 2.65 + 1.35 = 4.00. Subtraction always hands you that check, and it takes five seconds.",cols:[{l:"2.65",s:13},{l:"1.35",s:7}],rows:[{l:"",s:4}],cells:[{v:"2.65"},{v:"1.35"}],sum:"The two pieces rebuild the whole ✓"}
  ]},
  y5u4p3:{title:"Multiply the digits, then place the point",sub:"Two easy jobs instead of one hard one",steps:[
    {cap:"0.6 × 0.4. Ignore the points completely and multiply 6 × 4 = 24.",cols:[{l:"6",s:12},{l:"",s:0}],rows:[{l:"4",s:8}],cells:[{v:"24"}]},
    {cap:"Now count the decimal places going in: one in 0.6, one in 0.4. Two in total.",cols:[{l:"0.6",s:12}],rows:[{l:"0.4",s:8}],cells:[{v:"?"}],sum:"1 place + 1 place = 2 places"},
    {cap:"So put two decimal places in the answer: 0.24. Not 2.4, not 24.",cols:[{l:"0.6",s:12}],rows:[{l:"0.4",s:8}],cells:[{v:"0.24"}],sum:"0.6 × 0.4 = 0.24"},
    {cap:"Sanity check with the picture: you are taking six tenths of four tenths — a small piece of a small piece. It has to come out under both.",cols:[{l:"0.6",s:12},{l:"",s:8}],rows:[{l:"0.4",s:8},{l:"",s:12}],cells:[{v:"0.24"},{v:""},{v:""},{v:""}],sum:"A part of a part is smaller than both"},
    {cap:"Same digits, four answers: 6 × 4 = 24, 6 × 0.4 = 2.4, 0.6 × 0.4 = 0.24, 0.06 × 0.4 = 0.024. Only the place count changed.",cols:[{l:"0.06",s:3},{l:"0.4",s:10}],rows:[{l:"",s:6}],cells:[{v:"0.024"},{v:""}],sum:"Count the places, place the point"}
  ]},
  y5u4p4:{title:"Why × 0.5 makes it smaller",sub:"The factor decides the direction",steps:[
    {cap:"Start with 40. One whole copy of it — multiplying by 1 changes nothing.",cols:[{l:"40",s:20}],rows:[{l:"1",s:6}],cells:[{v:"40"}]},
    {cap:"× 2 gives two copies: 80. Bigger, which is what multiplying is supposed to do.",cols:[{l:"40",s:20}],rows:[{l:"2",s:12}],cells:[{v:"80"}]},
    {cap:"× 0.5 asks for half a copy. You are taking part of 40, not adding copies of it — so 20.",cols:[{l:"40",s:20}],rows:[{l:"0.5",s:3}],cells:[{v:"20"}],sum:"40 × 0.5 = 20"},
    {cap:"× 0.75 is three quarters of one copy: 30. Still under 40, because the factor is still under 1.",cols:[{l:"40",s:20}],rows:[{l:"0.75",s:5}],cells:[{v:"30"}],sum:"40 × 0.75 = 30"},
    {cap:"That is the whole rule. Factor under 1 shrinks, exactly 1 stays, over 1 grows — and comparing the factor to 1 takes a second.",cols:[{l:"40",s:20}],rows:[{l:"1.25",s:8}],cells:[{v:"50"}],sum:"× 1.25 = 50 · under 1 shrinks, over 1 grows"}
  ]},
  y5u4p5:{title:"Price per one",sub:"The only fair comparison",steps:[
    {cap:"Four for $5.00, or eight for $9.00. Nine is more than five and eight is more than four — neither number tells you which is better.",cols:[{l:"4 for $5",s:12},{l:"8 for $9",s:12}],rows:[{l:"",s:5}],cells:[{v:"?"},{v:"?"}]},
    {cap:"Divide price by count. $5.00 ÷ 4 = $1.25 each.",cols:[{l:"$1.25",s:6},{l:"",s:6},{l:"",s:6},{l:"",s:6}],rows:[{l:"pack of 4",s:5}],cells:[{v:"1.25"},{v:"1.25"},{v:"1.25"},{v:"1.25"}],sum:"$5.00 ÷ 4 = $1.25"},
    {cap:"$9.00 ÷ 8 = $1.125 each. Three decimal places — money usually stops at two, but a unit price does not have to.",cols:[{l:"$1.125",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3},{l:"",s:3}],rows:[{l:"pack of 8",s:5}],cells:[{v:"1.125"},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""},{v:""}],sum:"$9.00 ÷ 8 = $1.125"},
    {cap:"Now they are comparable: $1.125 beats $1.25 by twelve and a half cents an item. The bigger pack wins — this time.",cols:[{l:"$1.25",s:12},{l:"$1.125",s:11}],rows:[{l:"",s:5}],cells:[{v:"dearer"},{v:"cheaper"}],sum:"Always compare price per one"}
  ]}
};

const LESSONS_Y5_U5 = {
  y5u5p1:{title:"Same amount, new name",sub:"Why multiplying top and bottom is allowed",steps:[
    {cap:"One bar cut in two. Shade one piece — that is 1/2.",cols:[{l:"1/2",s:10},{l:"",s:10}],rows:[{l:"",s:6}],cells:[{v:"1"},{v:""}]},
    {cap:"Now cut each half into three. Six pieces, and three of them are shaded.",cols:[{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3}],rows:[{l:"",s:6}],cells:[{v:"1"},{v:"1"},{v:"1"},{v:""},{v:""},{v:""}],sum:"1/2 = 3/6"},
    {cap:"The shaded amount never moved. Three times as many pieces, three times as many shaded — that is why you multiply top and bottom by the same number.",cols:[{l:"3/6",s:10},{l:"",s:10}],rows:[{l:"",s:6}],cells:[{v:"3"},{v:""}],sum:"× 3 on top, × 3 underneath"},
    {cap:"Adding 1 to each instead gives 2/3 — a genuinely different amount. Multiplying preserves the ratio; adding destroys it.",cols:[{l:"2/3",s:13},{l:"",s:7}],rows:[{l:"",s:6}],cells:[{v:"2"},{v:""}],strip:true,sum:"1/2 ≠ 2/3 — adding is not allowed"}
  ]},
  y5u5p2:{title:"The bottom names the unit",sub:"Adding when the denominators match",steps:[
    {cap:"Eight equal pieces. Three of them shaded: 3/8.",cols:[{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:"1"},{v:"1"},{v:""},{v:""},{v:""},{v:""},{v:""}]},
    {cap:"Shade two more of the same size. Now five are shaded.",cols:[{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5},{l:"",s:2.5}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:"1"},{v:"1"},{v:"2"},{v:"2"},{v:""},{v:""},{v:""}],sum:"3/8 + 2/8 = 5/8"},
    {cap:"Three eighths plus two eighths is five eighths, the same way three apples plus two apples is five apples. The unit does not change.",cols:[{l:"5/8",s:12},{l:"",s:8}],rows:[{l:"",s:5}],cells:[{v:"5"},{v:""}],sum:"Add the tops. Leave the bottom alone."},
    {cap:"Somebody who answers 5/16 has added the bottoms too — and made the pieces smaller, which is the opposite of what adding does.",cols:[{l:"5/16",s:6},{l:"",s:14}],rows:[{l:"",s:5}],cells:[{v:"5"},{v:""}],strip:true,sum:"5/16 is less than 3/8 — impossible"}
  ]},
  y5u5p3:{title:"Half as a landmark",sub:"Comparing without a common denominator",steps:[
    {cap:"Is 3/8 more or less than a half? Double the top: 6 is less than 8, so it is under a half.",cols:[{l:"3/8",s:7},{l:"",s:13}],rows:[{l:"",s:5}],cells:[{v:"3"},{v:""}],sum:"3/8 < 1/2"},
    {cap:"And 5/9? Double the top: 10 beats 9, so it is over a half.",cols:[{l:"5/9",s:11},{l:"",s:9}],rows:[{l:"",s:5}],cells:[{v:"5"},{v:""}],sum:"5/9 > 1/2"},
    {cap:"One is under, one is over. The comparison is settled with no arithmetic at all.",cols:[{l:"3/8",s:7},{l:"5/9",s:11}],rows:[{l:"",s:5}],cells:[{v:"less"},{v:"more"}],sum:"5/9 wins"},
    {cap:"When both sit the same side of a half, fall back on a common denominator — but try the landmark first. It settles most pairs in a second.",cols:[{l:"7/12",s:11},{l:"5/8",s:12}],rows:[{l:"",s:5}],cells:[{v:"14/24"},{v:"15/24"}],sum:"Both over a half → 5/8 is larger"}
  ]},
  y5u5p4:{title:"Why 2/5 cannot be right",sub:"The answer must be bigger than what you started with",steps:[
    {cap:"1/2 + 1/3. You start with a half.",cols:[{l:"1/2",s:10},{l:"",s:10}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:""}]},
    {cap:"Then you add something to it. Whatever the answer is, it has to be MORE than a half.",cols:[{l:"1/2",s:10},{l:"+ 1/3",s:7},{l:"",s:3}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:"?"},{v:""}]},
    {cap:"But 2/5 is less than a half. So it is wrong before you check any arithmetic — and that check took one second.",cols:[{l:"2/5",s:8},{l:"",s:12}],rows:[{l:"",s:5}],cells:[{v:"2"},{v:""}],strip:true,sum:"2/5 < 1/2 — impossible"},
    {cap:"Rename both into sixths: 3/6 and 2/6. Now the pieces match and they can be counted.",cols:[{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3},{l:"",s:3.3}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:"1"},{v:"1"},{v:"2"},{v:"2"},{v:""}],sum:"3/6 + 2/6 = 5/6"},
    {cap:"Five sixths — comfortably more than the half you began with. Adding the bottoms shrinks the pieces, which is the opposite of adding.",cols:[{l:"5/6",s:17},{l:"",s:3}],rows:[{l:"",s:5}],cells:[{v:"5"},{v:""}],sum:"1/2 + 1/3 = 5/6"}
  ]},
  y5u5p5:{title:"The smallest shared bottom",sub:"Why 4 and 6 give 12, not 24",steps:[
    {cap:"Quarters and sixths. Multiplying the bottoms gives 24 — that always works, but it is rarely the smallest.",cols:[{l:"1/4",s:6},{l:"1/6",s:4}],rows:[{l:"",s:5}],cells:[{v:"?"},{v:"?"}]},
    {cap:"List the multiples of 4: 4, 8, 12, 16, 20, 24.",cols:[{l:"4",s:4},{l:"8",s:4},{l:"12",s:4},{l:"16",s:4},{l:"20",s:4},{l:"24",s:4}],rows:[{l:"",s:3}],cells:[{v:"4"},{v:"8"},{v:"12"},{v:"16"},{v:"20"},{v:"24"}]},
    {cap:"And of 6: 6, 12, 18, 24. The first number in both lists is 12.",cols:[{l:"6",s:6},{l:"12",s:6},{l:"18",s:6},{l:"24",s:6}],rows:[{l:"",s:3}],cells:[{v:"6"},{v:"12"},{v:"18"},{v:"24"}],sum:"First shared multiple: 12"},
    {cap:"So use twelfths, not twenty-fourths. 1/4 becomes 3/12 and 1/6 becomes 2/12 — smaller numbers, less to simplify at the end.",cols:[{l:"3/12",s:6},{l:"2/12",s:4},{l:"",s:14}],rows:[{l:"",s:5}],cells:[{v:"3"},{v:"2"},{v:""}],sum:"3/12 + 2/12 = 5/12"},
    {cap:"The product only IS the smallest when the two bottoms share no factor — 3 and 5 give 15, but 4 and 6 share a 2, so they meet early.",cols:[{l:"12",s:12},{l:"24",s:12}],rows:[{l:"",s:4}],cells:[{v:"smallest"},{v:"works too"}],sum:"Share a factor → they meet sooner"}
  ]}
};

const LESSONS_Y5_U6 = {
  y5u6p1:{title:"Of means multiply",sub:"Divide by the bottom, times by the top",steps:[
    {cap:"3/4 of 12. Start with twelve, drawn as a strip.",cols:[{l:"12",s:24}],rows:[{l:"",s:5}],cells:[{v:"12"}]},
    {cap:"Quarters means four equal parts. Divide by the bottom: 12 ÷ 4 = 3 in each part.",cols:[{l:"3",s:6},{l:"3",s:6},{l:"3",s:6},{l:"3",s:6}],rows:[{l:"",s:5}],cells:[{v:"3"},{v:"3"},{v:"3"},{v:"3"}],sum:"One quarter of 12 is 3"},
    {cap:"You want three of those parts. Multiply by the top: 3 × 3 = 9.",cols:[{l:"3",s:6},{l:"3",s:6},{l:"3",s:6},{l:"3",s:6}],rows:[{l:"",s:5}],cells:[{v:"3"},{v:"3"},{v:"3"},{v:""}],sum:"3/4 of 12 = 9"},
    {cap:"The other order works too — 12 × 3 = 36, then ÷ 4 = 9 — but dividing first keeps the numbers small, and small numbers mean fewer mistakes.",cols:[{l:"9",s:18},{l:"",s:6}],rows:[{l:"",s:5}],cells:[{v:"9"},{v:""}],sum:"Divide by the bottom first"}
  ]},
  y5u6p2:{title:"Straight across",sub:"And why no common denominator is needed",steps:[
    {cap:"2/3 × 3/4. Adding these would need a common bottom. Multiplying does not — and here is why.",cols:[{l:"2/3",s:12},{l:"3/4",s:9}],rows:[{l:"",s:5}],cells:[{v:"?"},{v:"?"}]},
    {cap:"Adding counts pieces, so the pieces must match in size. Multiplying takes a part OF a part — you make brand new pieces by cutting twice.",cols:[{l:"cut 1",s:12},{l:"cut 2",s:9}],rows:[{l:"",s:5}],cells:[{v:"→"},{v:"→"}]},
    {cap:"Tops multiply: 2 × 3 = 6. Bottoms multiply: 3 × 4 = 12.",cols:[{l:"6",s:10},{l:"12",s:10}],rows:[{l:"",s:5}],cells:[{v:"tops"},{v:"bottoms"}],sum:"6/12"},
    {cap:"6/12 simplifies to 1/2. Notice the answer is smaller than both fractions you started with — taking a part of a part always is.",cols:[{l:"1/2",s:10},{l:"",s:10}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:""}],sum:"2/3 × 3/4 = 1/2"},
    {cap:"Cancel before you multiply and the numbers stay small: 4/5 × 5/8 — the fives go, leaving 4/8 = 1/2 with no big products at all.",cols:[{l:"4/5",s:12},{l:"5/8",s:7}],rows:[{l:"",s:5}],cells:[{v:"cancel"},{v:"the 5s"}],sum:"4/5 × 5/8 = 1/2"}
  ]},
  y5u6p3:{title:"Cut it twice",sub:"The overlap is the answer",steps:[
    {cap:"One square. Cut it into four columns and shade three — that is 3/4.",cols:[{l:"",s:5},{l:"",s:5},{l:"",s:5},{l:"",s:5}],rows:[{l:"",s:12}],cells:[{v:"1"},{v:"1"},{v:"1"},{v:""}]},
    {cap:"Now cut the same square into three rows and take two of them — that is 2/3, running the other way.",cols:[{l:"",s:5},{l:"",s:5},{l:"",s:5},{l:"",s:5}],rows:[{l:"",s:4},{l:"",s:4},{l:"",s:4}],cells:[{v:"1"},{v:"1"},{v:"1"},{v:""},{v:"1"},{v:"1"},{v:"1"},{v:""},{v:""},{v:""},{v:""},{v:""}]},
    {cap:"Two cuts made 3 × 4 = 12 small boxes. The overlap — shaded both ways — is 2 × 3 = 6 of them.",cols:[{l:"",s:5},{l:"",s:5},{l:"",s:5},{l:"",s:5}],rows:[{l:"",s:4},{l:"",s:4},{l:"",s:4}],cells:[{v:"6"},{v:"6"},{v:"6"},{v:""},{v:"6"},{v:"6"},{v:"6"},{v:""},{v:""},{v:""},{v:""},{v:""}],sum:"6 out of 12 = 1/2"},
    {cap:"There is the rule, drawn: tops multiply because the overlap is 2 × 3, bottoms multiply because the cuts make 3 × 4.",cols:[{l:"2 × 3",s:10},{l:"3 × 4",s:10}],rows:[{l:"",s:5}],cells:[{v:"6"},{v:"12"}],sum:"The picture IS the procedure"}
  ]},
  y5u6p4:{title:"Bigger or smaller — call it first",sub:"Compare the factor to one",steps:[
    {cap:"12 × 1 = 12. Exactly one copy, so nothing changes.",cols:[{l:"12",s:20}],rows:[{l:"1",s:6}],cells:[{v:"12"}]},
    {cap:"12 × 3/4 asks for three quarters of a copy. Less than one whole copy, so the answer shrinks: 9.",cols:[{l:"12",s:20}],rows:[{l:"3/4",s:4}],cells:[{v:"9"}],sum:"Factor under 1 → smaller"},
    {cap:"12 × 5/4 asks for one and a quarter copies. More than one, so it grows: 15.",cols:[{l:"12",s:20}],rows:[{l:"5/4",s:8}],cells:[{v:"15"}],sum:"Factor over 1 → bigger"},
    {cap:"Compare the top to the bottom and you know the direction before you compute. Top smaller means the answer shrinks.",cols:[{l:"3/4",s:9},{l:"5/4",s:11}],rows:[{l:"",s:5}],cells:[{v:"shrinks"},{v:"grows"}],sum:"One second, and most errors are caught"}
  ]},
  y5u6p5:{title:"How many fit inside",sub:"Why dividing by a half doubles",steps:[
    {cap:"6 ÷ 1/2. The question is not 'share six between a half' — it is 'how many halves fit inside six?'",cols:[{l:"6",s:24}],rows:[{l:"",s:5}],cells:[{v:"6"}]},
    {cap:"Six wholes, each cut in two. Count the halves: twelve.",cols:[{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2},{l:"",s:2}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:"4"},{v:"5"},{v:"6"},{v:"7"},{v:"8"},{v:"9"},{v:"10"},{v:"11"},{v:"12"}],sum:"6 ÷ 1/2 = 12"},
    {cap:"Small pieces means lots of them fit. That is the whole reason the answer grew — nothing was created.",cols:[{l:"12 halves",s:24}],rows:[{l:"",s:5}],cells:[{v:"12"}],sum:"Smaller divisor → more of them fit"},
    {cap:"Flipping and multiplying — 6 × 2/1 = 12 — gives the same answer. It is a shortcut for the counting, not a spell.",cols:[{l:"6 × 2",s:24}],rows:[{l:"",s:5}],cells:[{v:"12"}],sum:"The flip is the shortcut, not the reason"},
    {cap:"Test it the other way: 1/2 ÷ 4 asks how much each gets when a half is shared four ways — 1/8. Dividing by something bigger than one still shrinks.",cols:[{l:"1/8",s:3},{l:"",s:21}],rows:[{l:"",s:5}],cells:[{v:"1/8"},{v:""}],sum:"1/2 ÷ 4 = 1/8"}
  ]}
};

const LESSONS_Y5_U7 = {
  y5u7p1:{title:"Layers of area",sub:"Why volume is length × width × height",steps:[
    {cap:"A 2 by 3 base. That is an area you already know: 6 square units.",cols:[{l:"3",s:9},{l:"",s:0}],rows:[{l:"2",s:6}],cells:[{v:"6"}]},
    {cap:"Stack a second identical layer on top. Twelve unit cubes now.",cols:[{l:"3",s:9}],rows:[{l:"2",s:6},{l:"2",s:6}],cells:[{v:"6"},{v:"6"}],sum:"2 layers × 6 = 12"},
    {cap:"Four layers deep: 6 × 4 = 24 cubes.",cols:[{l:"3",s:9}],rows:[{l:"2",s:5},{l:"2",s:5},{l:"2",s:5},{l:"2",s:5}],cells:[{v:"6"},{v:"6"},{v:"6"},{v:"6"}],sum:"2 × 3 × 4 = 24"},
    {cap:"That is all the formula says: find the area of one layer, then multiply by how many layers deep it goes.",cols:[{l:"24",s:12}],rows:[{l:"cubic units",s:6}],cells:[{v:"24"}],sum:"Area of a layer × number of layers"},
    {cap:"Write the units. Area is squared because two lengths were multiplied; volume is cubed because three were.",cols:[{l:"cm²",s:9},{l:"cm³",s:9}],rows:[{l:"",s:5}],cells:[{v:"2 sides"},{v:"3 sides"}],sum:"The units name what you found"}
  ]},
  y5u7p2:{title:"Same volume, different box",sub:"Why a cube uses least cardboard",steps:[
    {cap:"Twenty-four cubes in a single line: 1 by 1 by 24. It holds 24 — and needs 98 units of cardboard.",cols:[{l:"24",s:24}],rows:[{l:"1",s:2}],cells:[{v:"24"}]},
    {cap:"The same 24 cubes as a 2 by 2 by 6. Volume unchanged, cardboard down to 56.",cols:[{l:"6",s:12},{l:"",s:0}],rows:[{l:"2",s:4},{l:"2",s:4}],cells:[{v:"12"},{v:"12"}],sum:"Volume 24 · surface 56"},
    {cap:"And as a 2 by 3 by 4 — the most compact arrangement. Cardboard down again to 52.",cols:[{l:"4",s:8},{l:"",s:0}],rows:[{l:"3",s:6},{l:"3",s:6}],cells:[{v:"12"},{v:"12"}],sum:"Volume 24 · surface 52"},
    {cap:"Three boxes, identical capacity, wildly different cost. The closer to a cube, the less wrapping — and that is the whole shipping problem.",cols:[{l:"98",s:14},{l:"56",s:9},{l:"52",s:8}],rows:[{l:"",s:5}],cells:[{v:"line"},{v:"2×2×6"},{v:"2×3×4"}],sum:"Same inside, very different outside"}
  ]},
  y5u7p3:{title:"Finding a missing edge",sub:"Divide the volume by the base",steps:[
    {cap:"A box holds 120 cubic units. Its base is 5 by 6. How deep is it?",cols:[{l:"6",s:12}],rows:[{l:"5",s:10}],cells:[{v:"30"}]},
    {cap:"Work out the base area first: 5 × 6 = 30. One layer holds thirty cubes.",cols:[{l:"6",s:12}],rows:[{l:"5",s:10}],cells:[{v:"30"}],sum:"One layer = 30"},
    {cap:"So how many layers make 120? Divide: 120 ÷ 30 = 4.",cols:[{l:"30",s:8},{l:"30",s:8},{l:"30",s:8},{l:"30",s:8}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:"4"}],sum:"120 ÷ 30 = 4 layers"},
    {cap:"Check by multiplying back: 5 × 6 × 4 = 120. Every one of these problems hands you that check for free.",cols:[{l:"5 × 6 × 4",s:20}],rows:[{l:"",s:5}],cells:[{v:"120"}],sum:"Height = 4 ✓"}
  ]},
  y5u7p4:{title:"Split it into boxes",sub:"Compound solids",steps:[
    {cap:"An L-shaped solid. It is not a box, so there is no single formula — but it is made of boxes.",cols:[{l:"5",s:10},{l:"",s:0}],rows:[{l:"4",s:8}],cells:[{v:"?"}]},
    {cap:"Split it vertically into two boxes and work each out separately.",cols:[{l:"3",s:6},{l:"2",s:4}],rows:[{l:"4",s:8}],cells:[{v:"36"},{v:"12"}],sum:"36 + 12 = 48"},
    {cap:"Or enclose the whole thing in one big box and subtract the missing corner.",cols:[{l:"5",s:10}],rows:[{l:"4",s:8}],cells:[{v:"60"}],sum:"60 − 12 = 48"},
    {cap:"Both routes give 48, because the solid never changed — only the way you described it. Pick whichever makes the two numbers easier.",cols:[{l:"add",s:9},{l:"subtract",s:9}],rows:[{l:"",s:5}],cells:[{v:"48"},{v:"48"}],sum:"Same solid, two descriptions"}
  ]},
  y5u7p5:{title:"Double every edge",sub:"Why volume goes up eight times",steps:[
    {cap:"A 3 by 3 by 3 cube. Volume 27.",cols:[{l:"3",s:9}],rows:[{l:"3",s:9}],cells:[{v:"27"}]},
    {cap:"Double just the width. Volume doubles to 54 — so far, so obvious.",cols:[{l:"6",s:18}],rows:[{l:"3",s:9}],cells:[{v:"54"}],sum:"× 2 once"},
    {cap:"Now double the height too. Doubled twice: 108.",cols:[{l:"6",s:18}],rows:[{l:"6",s:18}],cells:[{v:"108"}],sum:"× 2 twice = × 4"},
    {cap:"And the depth. Three dimensions, each doubled: 2 × 2 × 2 = 8 times the original.",cols:[{l:"6",s:18}],rows:[{l:"6",s:18}],cells:[{v:"216"}],sum:"27 → 216, which is 8 × 27"},
    {cap:"Surface area only quadruples, because a face has two dimensions rather than three. That gap is why big boxes are cheaper per cubic unit to wrap.",cols:[{l:"volume ×8",s:14},{l:"surface ×4",s:11}],rows:[{l:"",s:5}],cells:[{v:"3 sides"},{v:"2 sides"}],sum:"Count the dimensions and you know the factor"}
  ]}
};

const LESSONS_Y5_U8 = {
  y5u8p1:{title:"Across the hall, then up the stairs",sub:"Why the order cannot change",steps:[
    {cap:"Start at the corner — the origin, (0, 0). No distance across, no distance up.",cols:[{l:"0",s:2}],rows:[{l:"0",s:2}],cells:[{v:"•"}]},
    {cap:"(3, 5) means three across first, then five up. Say it out loud as you plot.",cols:[{l:"3 across",s:9}],rows:[{l:"5 up",s:15}],cells:[{v:"•"}],sum:"(3, 5)"},
    {cap:"(5, 3) means five across and three up. Same two digits, a completely different room.",cols:[{l:"5 across",s:15}],rows:[{l:"3 up",s:9}],cells:[{v:"•"}],sum:"(5, 3)"},
    {cap:"Put them side by side and the gap is obvious. Coordinates are an ordered pair — the order carries as much meaning as the numbers.",cols:[{l:"(3,5)",s:9},{l:"(5,3)",s:15}],rows:[{l:"",s:5}],cells:[{v:"here"},{v:"there"}],sum:"Only equal numbers survive a swap"}
  ]},
  y5u8p2:{title:"How far apart",sub:"Subtract along a line, add around a corner",steps:[
    {cap:"(2, 3) to (7, 3). Same height, so only the across value changed.",cols:[{l:"2",s:6},{l:"5",s:15}],rows:[{l:"3",s:6}],cells:[{v:"start"},{v:"→"}],sum:"7 − 2 = 5"},
    {cap:"When two points share a row or a column, distance is one subtraction. Nothing more.",cols:[{l:"5 units",s:21}],rows:[{l:"",s:5}],cells:[{v:"5"}]},
    {cap:"(2, 3) to (8, 7) shares neither. Go across six, then up four.",cols:[{l:"6 across",s:18},{l:"",s:0}],rows:[{l:"4 up",s:12}],cells:[{v:"→↑"}],sum:"6 + 4 = 10 blocks"},
    {cap:"Ten units following streets. The straight-line gap is shorter — you can see that on the grid — and finding it exactly needs maths from a couple of years' time.",cols:[{l:"10 by street",s:18}],rows:[{l:"",s:5}],cells:[{v:"10"}],sum:"Say which kind of distance you mean"},
    {cap:"Halfway is the middle of each number separately: between (2,2) and (8,6) sits (5,4).",cols:[{l:"5",s:15},{l:"",s:0}],rows:[{l:"4",s:12}],cells:[{v:"•"}],sum:"Midpoint (5, 4)"}
  ]},
  y5u8p3:{title:"Four corners tell you everything",sub:"Perimeter and area from coordinates",steps:[
    {cap:"Corners at (1,1), (6,1), (6,5) and (1,5). Plot them and a rectangle appears.",cols:[{l:"",s:15}],rows:[{l:"",s:12}],cells:[{v:"?"}]},
    {cap:"Width comes from the across values: 6 − 1 = 5.",cols:[{l:"5",s:15}],rows:[{l:"",s:12}],cells:[{v:"?"}]},
    {cap:"Height from the up values: 5 − 1 = 4.",cols:[{l:"5",s:15}],rows:[{l:"4",s:12}],cells:[{v:"?"}]},
    {cap:"Area is 5 × 4 = 20. Perimeter is 5 + 4 + 5 + 4 = 18. No ruler involved — just subtraction.",cols:[{l:"5",s:15}],rows:[{l:"4",s:12}],cells:[{v:"20"}],sum:"Area 20 · perimeter 18"},
    {cap:"Given three corners you can always find the fourth: it borrows one number from each of its neighbours.",cols:[{l:"5",s:15}],rows:[{l:"4",s:12}],cells:[{v:"(6,1)"}],sum:"(1,1) (1,4) (6,4) → (6,1)"}
  ]},
  y5u8p4:{title:"Directions somebody can follow",sub:"Why coordinates exist at all",steps:[
    {cap:"“Go along a bit, then head up past the park.” Nobody who is not already there can follow that.",cols:[{l:"a bit?",s:10},{l:"",s:8}],rows:[{l:"",s:6}],cells:[{v:"?"},{v:""}],strip:true},
    {cap:"“Start at (1,1). Go 6 across to (7,1).” Now there is nothing to interpret.",cols:[{l:"6 across",s:18}],rows:[{l:"",s:4}],cells:[{v:"→"}]},
    {cap:"“Then 5 up to (7,6).” Two instructions, no ambiguity, eleven blocks travelled.",cols:[{l:"6",s:18},{l:"",s:0}],rows:[{l:"5",s:15}],cells:[{v:"→↑"}],sum:"11 blocks"},
    {cap:"The real test is whether somebody else lands in the right place. A route that needs explaining afterwards has already failed.",cols:[{l:"(7,6)",s:18}],rows:[{l:"",s:5}],cells:[{v:"arrived"}],sum:"Precision is the point, not the maths"}
  ]},
  y5u8p5:{title:"Halving the search",sub:"The strategy behind Treasure Grid",steps:[
    {cap:"A 10 by 10 grid — a hundred places the treasure could be.",cols:[{l:"10",s:20}],rows:[{l:"10",s:20}],cells:[{v:"100"}]},
    {cap:"Guess a corner, say (1,1), and “colder” rules out almost nothing. A bad first move.",cols:[{l:"1",s:2},{l:"",s:18}],rows:[{l:"1",s:2},{l:"",s:18}],cells:[{v:"•"},{v:""},{v:""},{v:""}],strip:true},
    {cap:"Guess the middle instead, around (5,5). Whichever answer comes back, roughly half the grid is gone.",cols:[{l:"5",s:10},{l:"5",s:10}],rows:[{l:"5",s:10},{l:"5",s:10}],cells:[{v:"•"},{v:"?"},{v:"?"},{v:"?"}],sum:"100 → about 50"},
    {cap:"Halve again, and again. Seven good guesses can search a hundred squares — the same idea behind looking up a word in a dictionary.",cols:[{l:"50",s:10},{l:"25",s:5},{l:"12",s:3},{l:"6",s:2}],rows:[{l:"",s:5}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:"4"}],sum:"Halve the search, not the grid"}
  ]}
};

/* ── Weekly walkthroughs for Weeks 2+ ──────────────────────────────────────
 * One authored lesson per week — the week's method — served to all five of
 * that week's sets via lessonFor(). Keyed by id prefix (u1w2, y5u4w3…).   */
const LESSONS_WEEKLY_Y5 = {
 y5u1w2:{title:"The digits move, not the point",sub:"Week 2 · × and ÷ by ten",steps:[
  {cap:"4.2 × 10. Every digit slides one seat left; the point stays put. 42.",cols:[{l:"42",s:20}],rows:[{l:"",s:4}],cells:[{v:"42"}],sum:"4.2 × 10 = 42"},
  {cap:"Dividing slides everything right instead: 42 ÷ 100 = 0.42. Same machine, reverse gear.",cols:[{l:"0.42",s:5},{l:"",s:15}],rows:[{l:"",s:4}],cells:[{v:"0.42"},{v:""}],sum:"42 ÷ 100 = 0.42"},
  {cap:"10³ is shorthand for three of those slides. 2.4 × 10³ = 2400 — the exponent counts the moves.",cols:[{l:"2400",s:24}],rows:[{l:"",s:4}],cells:[{v:"2400"}],sum:"Exponent = number of slides"},
  {cap:"Why 0.4 × 100 has no trailing zero: the 4 lands in the tens seat and stops. Watch the digit, not the zeros.",cols:[{l:"40",s:16}],rows:[{l:"",s:4}],cells:[{v:"40"}],sum:"0.4 × 100 = 40"}]},
 y5u1w3:{title:"Find the place, look right, decide",sub:"Week 3 · rounding",steps:[
  {cap:"2.451 to the nearest hundredth. Find the hundredths seat: 5. Look one door right: 1.",cols:[{l:"2",s:12},{l:"4",s:6},{l:"5",s:3},{l:"1",s:1}],rows:[{l:"",s:4}],cells:[{v:"2"},{v:"4"},{v:"5"},{v:"1"}]},
  {cap:"A 1 says stay: 2.45. A 5 or more would have pushed it up to 2.46.",cols:[{l:"2.45",s:20}],rows:[{l:"",s:4}],cells:[{v:"2.45"}],sum:"Round 2.451 → 2.45"},
  {cap:"Which place matters is the question's choice: money to cents, estimates to wholes, buses always up.",cols:[{l:"cents",s:8},{l:"wholes",s:8},{l:"up",s:4}],rows:[{l:"",s:4}],cells:[{v:"$"},{v:"≈"},{v:"bus"}],sum:"Name the place before you round"},
  {cap:"Round first to estimate: 4.9 + 3.1 ≈ 8, so 7.93 is believable and 79.3 is not. The estimate polices the point.",cols:[{l:"8",s:16}],rows:[{l:"",s:4}],cells:[{v:"≈8"}],sum:"Estimate catches the misplaced point"}]},
 y5u1w4:{title:"The atlas is the ladder",sub:"Week 4 · proof week",steps:[
  {cap:"Your object at true size, ×10, ×100 — every jump one slide of the digits. Label each with its power of ten.",cols:[{l:"×1",s:2},{l:"×10",s:7},{l:"×100",s:14}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"30"},{v:"300"}],sum:"Each panel = one power"},
  {cap:"Going down works the same: one thousandth of 4,000 mm is 4 mm. Three slides right.",cols:[{l:"4",s:2},{l:"",s:18}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:""}],sum:"4000 ÷ 10³ = 4"},
  {cap:"The test replays the mission: places, powers, rounding, comparing. One system — every place ten of its neighbour.",cols:[{l:"×10",s:10},{l:"÷10",s:10}],rows:[{l:"",s:4}],cells:[{v:"left"},{v:"right"}],sum:"The whole mission in one rule"}]},
 y5u2w2:{title:"Longer, not harder",sub:"Week 2 · bigger numbers",steps:[
  {cap:"Multiples of ten first: 40 × 60 is 4 × 6 with two zeros carried along — 2400.",cols:[{l:"40",s:20}],rows:[{l:"60",s:18}],cells:[{v:"2400"}],sum:"Digits times digits, zeros count themselves"},
  {cap:"1234 × 12 is just more rooms: eight of them, each one easy.",cols:[{l:"1000",s:14},{l:"200",s:6},{l:"34",s:3}],rows:[{l:"10",s:8},{l:"2",s:2}],cells:[{v:"10000"},{v:"2000"},{v:"340"},{v:"2000"},{v:"400"},{v:"68"}],sum:"Add the rooms: 14,808"},
  {cap:"Estimate before every one: 1234 × 12 ≈ 1200 × 10 = 12,000. The answer must land near it.",cols:[{l:"≈12000",s:20}],rows:[{l:"",s:4}],cells:[{v:"14808 ✓"}],sum:"Right size = probably right"},
  {cap:"Catching errors is estimation applied: 45 × 23 = 135 fails the net instantly — 40 × 20 alone is 800.",cols:[{l:"135?",s:4},{l:"",s:16}],rows:[{l:"",s:4}],cells:[{v:"✗"},{v:""}],strip:true,sum:"The net catches what checking misses"}]},
 y5u2w3:{title:"The estimate is the answer's size",sub:"Week 3 · estimation habits",steps:[
  {cap:"Round both, multiply: 412 × 19 ≈ 400 × 20 = 8000.",cols:[{l:"400",s:20}],rows:[{l:"20",s:10}],cells:[{v:"8000"}],sum:"True: 7,828"},
  {cap:"Call over or under before computing: 400 went down, 20 went up — nearly cancel, slightly over.",cols:[{l:"over",s:11},{l:"under",s:9}],rows:[{l:"",s:4}],cells:[{v:"↑0"},{v:"↓0"}],sum:"Opposite pulls cancel"},
  {cap:"Order of magnitude is the coarsest, fastest check: 34 × 26 lives in the hundreds. An answer of 68 or 8,840 is dead on arrival.",cols:[{l:"hundreds",s:14}],rows:[{l:"",s:4}],cells:[{v:"884"}],sum:"Right neighbourhood first"},
  {cap:"Marking somebody's work, estimate each line before trusting a digit of it. Three of the six will fail the size test alone.",cols:[{l:"est",s:8},{l:"then check",s:12}],rows:[{l:"",s:4}],cells:[{v:"1st"},{v:"2nd"}],sum:"Size before steps"}]},
 y5u2w4:{title:"Count one, scale up, explain the gap",sub:"Week 4 · stadium proof",steps:[
  {cap:"One section: 38 rows of 24 seats — 912. The only careful count you need.",cols:[{l:"24",s:16}],rows:[{l:"38",s:19}],cells:[{v:"912"}],sum:"38 × 24 = 912"},
  {cap:"Sixteen sections: 912 × 16 = 14,592. One multiplication scales the whole stadium.",cols:[{l:"912 × 16",s:24}],rows:[{l:"",s:4}],cells:[{v:"14592"}],sum:"Count once, multiply once"},
  {cap:"Your estimate said 16,000. The gap — 1,408, about 10% — has causes you can name: rounding 38 up, 24 up.",cols:[{l:"14592",s:18},{l:"gap",s:2}],rows:[{l:"",s:4}],cells:[{v:"true"},{v:"1408"}],sum:"A named gap is understanding"}]},
 y5u3w2:{title:"Four digits under the bar",sub:"Week 2 · big dividends",steps:[
  {cap:"4536 ÷ 21. Size it first: 21 × 100 fits, 21 × 1000 does not — a three-digit answer.",cols:[{l:"100s",s:22}],rows:[{l:"21",s:10}],cells:[{v:"4536"}],sum:"Three digits coming"},
  {cap:"Peel chunks: 21 × 200 = 4200, leaving 336. Then 21 × 16 = 336 exactly.",cols:[{l:"200",s:18},{l:"16",s:4}],rows:[{l:"21",s:10}],cells:[{v:"4200"},{v:"336"}],sum:"200 + 16 = 216"},
  {cap:"Zeros in the quotient are seats that contribute nothing but must stay open: 7308 ÷ 36 = 203, never 23.",cols:[{l:"2",s:9},{l:"0",s:2},{l:"3",s:9}],rows:[{l:"",s:4}],cells:[{v:"2"},{v:"0"},{v:"3"}],sum:"The zero holds the tens seat"},
  {cap:"Divisors near a ten round for guessing: 29 → 30 makes the guess quick, and slightly small. Adjust without shame.",cols:[{l:"≈30",s:15}],rows:[{l:"29",s:10}],cells:[{v:"guess"}],sum:"First guess wrong is normal"}]},
 y5u3w3:{title:"One division, four answers",sub:"Week 3 · the remainder decides",steps:[
  {cap:"100 ÷ 30: three thirties and ten left. The arithmetic ends here; the thinking starts.",cols:[{l:"3",s:18},{l:"10",s:6}],rows:[{l:"30",s:12}],cells:[{v:"90"},{v:"10"}],sum:"3 r 10"},
  {cap:"Buses: everyone rides, so 4. Boxes: only full ones count, so 3. Money: keep dividing — $3.33 each.",cols:[{l:"4",s:7},{l:"3",s:7},{l:"3.33",s:8}],rows:[{l:"",s:4}],cells:[{v:"up"},{v:"down"},{v:"decimal"}],sum:"The situation picks"},
  {cap:"The remainder is bounded: dividing by 30 it can never reach 30 — a leftover that big still holds a whole thirty.",cols:[{l:"r < 30",s:14}],rows:[{l:"",s:4}],cells:[{v:"rule"}],sum:"r must be smaller than the divisor"}]},
 y5u3w4:{title:"The budget defends itself",sub:"Week 4 · proof week",steps:[
  {cap:"Every line divides something real: miles by days, dollars by people, miles by tank.",cols:[{l:"1200÷5",s:9},{l:"1635÷4",s:9}],rows:[{l:"",s:4}],cells:[{v:"240"},{v:"408.75"}],sum:"Division is the budget's engine"},
  {cap:"Each rounding gets defended: 2.9 tanks means buying 3; $16.666 a person means $16.67; full boxes round down.",cols:[{l:"up",s:8},{l:"cent",s:8},{l:"down",s:8}],rows:[{l:"",s:4}],cells:[{v:"fuel"},{v:"cash"},{v:"boxes"}],sum:"Every leftover, a reason"},
  {cap:"The test asks the mission's whole move: divide, bound the remainder, choose up, down or decimal — and say why.",cols:[{l:"÷",s:8},{l:"r",s:6},{l:"why",s:8}],rows:[{l:"",s:4}],cells:[{v:"do"},{v:"bound"},{v:"choose"}],sum:"Interpretation is the skill"}]},
 y5u4w2:{title:"Digits first, point second",sub:"Week 2 · multiplying decimals",steps:[
  {cap:"0.6 × 0.4: multiply digits — 24 — then count places in: one plus one is two.",cols:[{l:"24",s:12}],rows:[{l:"",s:4}],cells:[{v:"24"}],sum:"Two places in → two out"},
  {cap:"So 0.24. Same digits give 2.4, 24, 0.024 — only the place count differs.",cols:[{l:"0.24",s:6},{l:"",s:14}],rows:[{l:"",s:4}],cells:[{v:"0.24"},{v:""}],sum:"0.6 × 0.4 = 0.24"},
  {cap:"Estimating places the point without counting: 0.4 × 62 ≈ 24, so 24.8 — never 2.48 or 248.",cols:[{l:"≈24",s:20}],rows:[{l:"",s:4}],cells:[{v:"24.8"}],sum:"Two roads to the same point"},
  {cap:"A factor under one shrinks: 40 × 0.75 = 30, because you took three quarters OF it. Call the direction before you compute.",cols:[{l:"40",s:20}],rows:[{l:"0.75",s:5}],cells:[{v:"30"}],sum:"Under 1 shrinks · over 1 grows"}]},
 y5u4w3:{title:"Shift both, then divide",sub:"Week 3 · dividing decimals",steps:[
  {cap:"4.8 ÷ 2: the point comes straight up. 2.4, no ceremony.",cols:[{l:"2.4",s:12},{l:"2.4",s:12}],rows:[{l:"",s:4}],cells:[{v:"2.4"},{v:"2.4"}],sum:"Decimal ÷ whole: point rides up"},
  {cap:"6 ÷ 0.5 asks how many halves fit in six — twelve. Dividing by less than one gives MORE.",cols:[{l:"12 halves",s:24}],rows:[{l:"",s:4}],cells:[{v:"12"}],sum:"Small pieces → many fit"},
  {cap:"The shift trick: multiply both by ten until the divisor is whole. 9.6 ÷ 1.2 becomes 96 ÷ 12 = 8. Same answer, easier sum.",cols:[{l:"96 ÷ 12",s:20}],rows:[{l:"",s:4}],cells:[{v:"8"}],sum:"Shift both the same amount"},
  {cap:"Money divides to the cent: $7.20 for 0.8 kg is $9 per kilo — the unit price machine from Mission 05, now with decimals both sides.",cols:[{l:"$9/kg",s:18}],rows:[{l:"",s:4}],cells:[{v:"9"}],sum:"7.2 ÷ 0.8 = 9"}]},
 y5u4w4:{title:"The words choose the operation",sub:"Week 4 · mixed problems",steps:[
  {cap:"'2.5 kg at $4 per kg' — groups of equal size: multiply. $10.",cols:[{l:"4",s:8},{l:"4",s:8},{l:"2",s:4}],rows:[{l:"",s:4}],cells:[{v:"4"},{v:"4"},{v:"2"}],sum:"2.5 × 4 = 10"},
  {cap:"'$12 buys how many at $2.40' — how many fit inside: divide. 5.",cols:[{l:"5 × 2.40",s:20}],rows:[{l:"",s:4}],cells:[{v:"5"}],sum:"12 ÷ 2.4 = 5"},
  {cap:"Two-step problems chain them: 3 at $4.99, THEN change from $20. Multiply, then subtract — in that order.",cols:[{l:"14.97",s:15},{l:"5.03",s:5}],rows:[{l:"",s:4}],cells:[{v:"spent"},{v:"change"}],sum:"Order inside the story"},
  {cap:"Estimate every step: 3 × $5 = $15, change about $5. The net travels with you through both steps.",cols:[{l:"≈15",s:15},{l:"≈5",s:5}],rows:[{l:"",s:4}],cells:[{v:"✓"},{v:"✓"}],sum:"Estimate first, always"}]},
 y5u4w5:{title:"The trap in the big box",sub:"Week 5 · unit price proof",steps:[
  {cap:"Every item gets a per-unit price: $5 for 400 g is $1.25 per 100 g; $9 for 800 g is $1.125.",cols:[{l:"1.25",s:12},{l:"1.125",s:11}],rows:[{l:"",s:4}],cells:[{v:"small"},{v:"big"}],sum:"Divide price by size"},
  {cap:"Sometimes the big box loses — that is the trap you hunt this week. One real product where bigger costs more per unit.",cols:[{l:"?",s:20}],rows:[{l:"",s:4}],cells:[{v:"find it"}],sum:"Check, never assume"},
  {cap:"The write-up is one paragraph a shopper could act on: which size, how much saved per week, per year. Numbers with a job.",cols:[{l:"52 weeks",s:20}],rows:[{l:"",s:4}],cells:[{v:"× saving"}],sum:"Small savings compound"}]},
 y5u5w2:{title:"Wholes and parts together",sub:"Week 2 · mixed numbers",steps:[
  {cap:"7/4 is seven quarter-pieces: four make a whole, three remain. 1 3/4.",cols:[{l:"1",s:12},{l:"3/4",s:9}],rows:[{l:"",s:4}],cells:[{v:"4/4"},{v:"3/4"}],sum:"7/4 = 1 3/4"},
  {cap:"Adding mixed numbers: wholes first, parts second. 1 1/2 + 2 1/4 = 3 + 3/4.",cols:[{l:"3",s:15},{l:"3/4",s:4}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"3/4"}],sum:"= 3 3/4"},
  {cap:"Subtracting can need a borrow: 3 − 1 3/4 turns one whole into 4/4 first. 2 4/4 − 1 3/4 = 1 1/4.",cols:[{l:"2",s:12},{l:"4/4",s:6}],rows:[{l:"",s:4}],cells:[{v:"2"},{v:"4/4"}],sum:"Borrow from the whole"},
  {cap:"Word problems hide a subtraction inside: 'a 3/4 cup recipe, you have 1/2' — the question is the gap, 1/4.",cols:[{l:"1/2",s:10},{l:"gap",s:5}],rows:[{l:"",s:4}],cells:[{v:"have"},{v:"1/4"}],sum:"Find the gap"}]},
 y5u5w3:{title:"Is the answer sensible",sub:"Week 3 · benchmarks",steps:[
  {cap:"Every fraction sits near a landmark: 0, 1/2 or 1. 5/8 is just over a half; 1/12 is nearly nothing.",cols:[{l:"0",s:1},{l:"1/2",s:10},{l:"1",s:10}],rows:[{l:"",s:3}],cells:[{v:""},{v:"•"},{v:"•"}],sum:"Place it before you compute"},
  {cap:"Estimate the sum from the landmarks: 5/8 + 1/3 ≈ 1/2 + 1/3, just under one. An answer of 23/24 passes; 7/24 cannot.",cols:[{l:"≈ 1",s:20}],rows:[{l:"",s:4}],cells:[{v:"23/24 ✓"}],sum:"The landmark is the net"},
  {cap:"Cooking makes it physical: half a cup plus a third of a cup visibly fails to fill the cup. The kitchen grades honestly.",cols:[{l:"5/6 cup",s:17},{l:"",s:3}],rows:[{l:"",s:4}],cells:[{v:"■"},{v:""}],sum:"Measuring cups don't lie"}]},
 y5u5w4:{title:"Rename, add, simplify",sub:"Week 4 · the full method",steps:[
  {cap:"2/3 + 1/4. Different pieces — rename both twelfths: 8/12 and 3/12.",cols:[{l:"8/12",s:8},{l:"3/12",s:3},{l:"",s:9}],rows:[{l:"",s:4}],cells:[{v:"8"},{v:"3"},{v:""}],sum:"Smallest shared bottom: 12"},
  {cap:"Count: 11/12. Then check against the landmark — 2/3 + 1/4 should be just under one, and 11/12 is.",cols:[{l:"11/12",s:11},{l:"",s:1}],rows:[{l:"",s:4}],cells:[{v:"11"},{v:""}],sum:"= 11/12 ✓"},
  {cap:"Three fractions, same machine: 2/3 + 1/4 + 1/2 renames all three to twelfths — 8 + 3 + 6 = 17/12 = 1 5/12.",cols:[{l:"17/12",s:17}],rows:[{l:"",s:4}],cells:[{v:"1 5/12"}],sum:"Over one whole — and it should be"},
  {cap:"Not finished until simplified: 10/12 must leave as 5/6. Top and bottom share nothing — that is the finish line.",cols:[{l:"5/6",s:20}],rows:[{l:"",s:4}],cells:[{v:"done"}],sum:"Simplest form ends the problem"}]},
 y5u5w5:{title:"The recipe is the proof",sub:"Week 5 · proof week",steps:[
  {cap:"Doubling 1 1/3 cups: 2 2/3. Every scaled line is a fraction sum you can taste.",cols:[{l:"1 1/3",s:8},{l:"1 1/3",s:8}],rows:[{l:"",s:4}],cells:[{v:"+"},{v:"="}],sum:"2 2/3 cups"},
  {cap:"The write-up explains one conversion out loud — why 3/4 doubled is 1 1/2 and not 6/8 of anything.",cols:[{l:"3/4 × 2",s:18}],rows:[{l:"",s:4}],cells:[{v:"3/2"}],sum:"= 1 1/2"},
  {cap:"The test replays the mission: rename, add, subtract, borrow, simplify — with the size check on every line.",cols:[{l:"rename",s:8},{l:"count",s:6},{l:"simplify",s:8}],rows:[{l:"",s:4}],cells:[{v:"1"},{v:"2"},{v:"3"}],sum:"The whole method, graded"}]},
 y5u6w2:{title:"A part of a part",sub:"Week 2 · multiplying fractions",steps:[
  {cap:"2/3 × 3/4 on a folded square: cut in four columns, shade three; cut in three rows, take two.",cols:[{l:"",s:5},{l:"",s:5},{l:"",s:5},{l:"",s:5}],rows:[{l:"",s:4},{l:"",s:4},{l:"",s:4}],cells:[{v:"■"},{v:"■"},{v:"■"},{v:""},{v:"■"},{v:"■"},{v:"■"},{v:""},{v:""},{v:""},{v:""},{v:""}],sum:"Overlap: 6 of 12"},
  {cap:"Tops multiply (the overlap), bottoms multiply (the cuts). 6/12 = 1/2.",cols:[{l:"6",s:10},{l:"12",s:10}],rows:[{l:"",s:4}],cells:[{v:"2×3"},{v:"3×4"}],sum:"Straight across, then simplify"},
  {cap:"Cancel early and the numbers stay tiny: 4/5 × 5/8 — the fives cancel before anything is multiplied.",cols:[{l:"4/8",s:10},{l:"",s:10}],rows:[{l:"",s:4}],cells:[{v:"1/2"},{v:""}],sum:"Simplify as you go"}]},
 y5u6w3:{title:"The factor tells the direction",sub:"Week 3 · scaling",steps:[
  {cap:"12 × 3/4 shrinks to 9; 12 × 5/4 grows to 15; 12 × 4/4 stays. Compare top to bottom and call it first.",cols:[{l:"9",s:9},{l:"12",s:12},{l:"15",s:15}],rows:[{l:"",s:4}],cells:[{v:"×¾"},{v:"×1"},{v:"×½⁵⁄₄"}],sum:"Under 1 shrinks · over 1 grows"},
  {cap:"× 1 in disguise changes nothing: × 4/4, × 7/7. Renaming a fraction was this all along.",cols:[{l:"× 4/4",s:20}],rows:[{l:"",s:4}],cells:[{v:"= same"}],sum:"Multiplying by one"},
  {cap:"Scaling in context: half-scale halves every length. The garden plan this week is multiplication wearing a tape measure.",cols:[{l:"12 ft",s:24}],rows:[{l:"×½",s:4}],cells:[{v:"6 ft"}],sum:"Every measurement × the scale"}]},
 y5u6w4:{title:"How many fit · how much each",sub:"Week 4 · dividing with fractions",steps:[
  {cap:"6 ÷ 1/2 asks how many halves live in six: twelve. Dividing by less than one gives more.",cols:[{l:"12 halves",s:24}],rows:[{l:"",s:4}],cells:[{v:"12"}],sum:"6 ÷ 1/2 = 12"},
  {cap:"1/2 ÷ 4 shares a half among four: each gets 1/8. Dividing by more than one still shrinks.",cols:[{l:"1/8",s:3},{l:"",s:21}],rows:[{l:"",s:4}],cells:[{v:"⅛"},{v:""}],sum:"1/2 ÷ 4 = 1/8"},
  {cap:"A fraction IS a division: 3/4 means 3 ÷ 4. Three pizzas among four people — three quarters each.",cols:[{l:"3 ÷ 4",s:18}],rows:[{l:"",s:4}],cells:[{v:"3/4"}],sum:"The bar is a division sign"},
  {cap:"Ribbon, pizza, time — the two questions alternate: how many pieces fit, or how much each share gets. Name which before you divide.",cols:[{l:"fit?",s:10},{l:"each?",s:10}],rows:[{l:"",s:4}],cells:[{v:"count"},{v:"share"}],sum:"Two questions, one symbol"}]},
 y5u6w5:{title:"The garden closes the mission",sub:"Week 5 · proof week",steps:[
  {cap:"The plan runs both machines: beds scaled by 3/4, paths divided into 1/2-ft stones.",cols:[{l:"×¾",s:9},{l:"÷½",s:12}],rows:[{l:"",s:4}],cells:[{v:"shrink"},{v:"count"}],sum:"Multiply and divide together"},
  {cap:"Explaining a shrink is the oral exam: why did × 2/3 make the bed smaller? Because two thirds of a copy is less than a copy.",cols:[{l:"2/3",s:13},{l:"",s:7}],rows:[{l:"",s:4}],cells:[{v:"of it"},{v:""}],sum:"Say the reason, not the rule"},
  {cap:"The test wants direction calls before every answer — bigger or smaller — then the arithmetic to prove the call.",cols:[{l:"call",s:10},{l:"prove",s:10}],rows:[{l:"",s:4}],cells:[{v:"1st"},{v:"2nd"}],sum:"Prediction, then proof"}]},
 y5u7w2:{title:"Layers make volume",sub:"Week 2 · the formula",steps:[
  {cap:"Count a 2×3×4 stack the slow way once: 24 cubes. Then never again.",cols:[{l:"3",s:9}],rows:[{l:"2",s:6}],cells:[{v:"6"}],sum:"One layer = 6 cubes"},
  {cap:"Four layers of six: the formula is just layers. l × w gives the layer, × h stacks it.",cols:[{l:"6",s:6},{l:"6",s:6},{l:"6",s:6},{l:"6",s:6}],rows:[{l:"",s:4}],cells:[{v:"1"},{v:"2"},{v:"3"},{v:"4"}],sum:"2 × 3 × 4 = 24"},
  {cap:"A missing edge is the formula backwards: volume 120, base 5×6 — divide by the layer, 120 ÷ 30 = 4 deep.",cols:[{l:"120 ÷ 30",s:20}],rows:[{l:"",s:4}],cells:[{v:"4"}],sum:"Divide by the base"},
  {cap:"Cubic units, always: three lengths multiplied. If you cannot name the unit you have not finished.",cols:[{l:"cm³",s:14}],rows:[{l:"",s:4}],cells:[{v:"3D"}],sum:"The unit names the dimension"}]},
 y5u7w3:{title:"Split solids, honest plots",sub:"Week 3 · compound volume and line plots",steps:[
  {cap:"An L-solid is two boxes glued. Split, solve each, add — or enclose and subtract the notch.",cols:[{l:"36",s:12},{l:"12",s:5}],rows:[{l:"",s:6}],cells:[{v:"A"},{v:"B"}],sum:"36 + 12 = 48 either way"},
  {cap:"A line plot stacks an X per measurement over its value — a bar chart that keeps every data point visible.",cols:[{l:"¼",s:4},{l:"½",s:8},{l:"¾",s:6}],rows:[{l:"",s:4}],cells:[{v:"××"},{v:"××××"},{v:"×××"}],sum:"Every X is one measurement"},
  {cap:"Reading it is fraction arithmetic: total ribbon = each column's value times its X count, summed. The plot and the mission meet.",cols:[{l:"sum",s:20}],rows:[{l:"",s:4}],cells:[{v:"Σ"}],sum:"Plots feed fraction sums"}]},
 y5u7w4:{title:"Three boxes, one argument",sub:"Week 4 · proof week",steps:[
  {cap:"Design three boxes holding the same 24 objects: long, flat, near-cube. Volume identical by design.",cols:[{l:"1×1×24",s:10},{l:"2×2×6",s:7},{l:"2×3×4",s:6}],rows:[{l:"",s:4}],cells:[{v:"24"},{v:"24"},{v:"24"}],sum:"Same inside"},
  {cap:"Surface areas differ: 98, 56, 52. The argument for one box is a surface-area computation with a conclusion.",cols:[{l:"98",s:14},{l:"56",s:8},{l:"52",s:7}],rows:[{l:"",s:4}],cells:[{v:"✗"},{v:""},{v:"✓"}],sum:"Least cardboard wins"},
  {cap:"Conversions ride along: a 240 L tank with an 8×5 base is 6 deep, because a litre fills a unit cube. Test Friday.",cols:[{l:"240 ÷ 40",s:20}],rows:[{l:"",s:4}],cells:[{v:"6"}],sum:"Volume ÷ base = depth"}]},
 y5u8w2:{title:"Rules become lines",sub:"Week 2 · patterns on the plane",steps:[
  {cap:"Rule × 2: in 1→2, 2→4, 3→6. Each row of the table is an ordered pair.",cols:[{l:"(1,2)",s:5},{l:"(2,4)",s:7},{l:"(3,6)",s:9}],rows:[{l:"",s:4}],cells:[{v:"•"},{v:"•"},{v:"•"}],sum:"Table → pairs"},
  {cap:"Plot the pairs and they fall on a straight line — always, for a steady rule.",cols:[{l:"",s:12}],rows:[{l:"",s:12}],cells:[{v:"↗"}],sum:"Steady rule = straight line"},
  {cap:"Two rules at once: × 2 and × 2 + 3 make parallel lines — same steepness, one lifted by 3.",cols:[{l:"×2",s:10},{l:"+3",s:3}],rows:[{l:"",s:5}],cells:[{v:"↗"},{v:"↗"}],sum:"The +3 only shifts it up"},
  {cap:"Relating sequences is reading the gap between the lines — it is 3 everywhere, because the rules differ by exactly that.",cols:[{l:"gap",s:3},{l:"",s:17}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:""}],sum:"Compare rules, not points"}]},
 y5u8w3:{title:"Always, sometimes, never",sub:"Week 3 · the shape hierarchy",steps:[
  {cap:"A square is a rectangle with equal sides, and a rectangle is a parallelogram with right angles. Names nest.",cols:[{l:"squares",s:5},{l:"rectangles",s:8},{l:"parallelograms",s:11}],rows:[{l:"",s:4}],cells:[{v:"⊂"},{v:"⊂"},{v:""}],sum:"Each ring inside the next"},
  {cap:"So 'a square is a rectangle' is ALWAYS true; 'a rectangle is a square' only SOMETIMES.",cols:[{l:"always",s:10},{l:"sometimes",s:10}],rows:[{l:"",s:4}],cells:[{v:"→"},{v:"←"}],sum:"Direction matters"},
  {cap:"Triangles classify twice — by sides (scalene, isosceles, equilateral) and by angles (acute, right, obtuse). Every triangle owns one of each.",cols:[{l:"sides",s:10},{l:"angles",s:10}],rows:[{l:"",s:4}],cells:[{v:"3"},{v:"3"}],sum:"Two names per triangle"},
  {cap:"Properties decide, never appearance: count sides, check parallels, test angles — then say the most specific name that fits.",cols:[{l:"test",s:10},{l:"name",s:10}],rows:[{l:"",s:4}],cells:[{v:"1st"},{v:"2nd"}],sum:"Most specific true name"}]},
 y5u8w4:{title:"The map closes the year",sub:"Week 4 · capstone",steps:[
  {cap:"Ten landmarks, ten ordered pairs — the whole plane in one drawing of your own.",cols:[{l:"10 pairs",s:20}],rows:[{l:"",s:6}],cells:[{v:"•••"}],sum:"Plot, label, check"},
  {cap:"Directions somebody else can walk: coordinates and block counts only. If they end up lost, the pair was wrong — fix it, not them.",cols:[{l:"(1,2)→(8,2)",s:14},{l:"↑6",s:6}],rows:[{l:"",s:4}],cells:[{v:"7"},{v:"6"}],sum:"13 blocks, zero ambiguity"},
  {cap:"Thursday sweeps all eight journals; Friday's test ends Year Two. Two years, sixteen missions, one habit: check the size before trusting the steps.",cols:[{l:"Year 2",s:20}],rows:[{l:"",s:4}],cells:[{v:"✓"}],sum:"The year, closed"}]}
};
Object.assign(LESSONS_WEEKLY, LESSONS_WEEKLY_Y5);
Object.assign(window.__CURR, {UNITS_Y5, WEEKS_Y5, STANDARDS_Y5, PUZZLES_Y5, PRACTICE_Y5, PRACTICE_Y5_W, PRACTICE_Y5_W2, PRACTICE_Y5_W3, PRACTICE_Y5_W4, PRACTICE_Y5_W5, PRACTICE_Y5_W6, ALL_SETS_Y5, Y5_BRIEFINGS, LESSONS_Y5_U1, LESSONS_Y5_U2, LESSONS_Y5_U3, LESSONS_Y5_U4, LESSONS_Y5_U5, LESSONS_Y5_U6, LESSONS_Y5_U7, LESSONS_Y5_U8, LESSONS_WEEKLY_Y5});
})();
