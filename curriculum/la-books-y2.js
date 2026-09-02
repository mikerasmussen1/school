/* ============================================================================
 * WORD VOYAGERS — YEAR TWO BOOK LIST (5th grade)
 * ----------------------------------------------------------------------------
 * One read-aloud per unit, plus independent titles grouped by category. The
 * year's independent band is roughly 830–1010L; read-alouds sit above it on
 * purpose, since a read-aloud is where a child meets language they cannot yet
 * decode alone.
 *
 * Fifth grade is where books start dealing with real moral weight — death,
 * injustice, betrayal, faith tested. Several titles here do. The `discuss`
 * field flags what is in each one, not so you can avoid it, but so you are not
 * surprised by it in the middle of a chapter with a child on your lap. Read
 * ahead. These are conversations worth having on purpose rather than by
 * accident.
 * ==========================================================================*/
(function(){

  const READ_ALOUDS = [
    {unit:1, title:"The Bronze Bow", author:"Elizabeth George Speare", lexile:"760L",
     why:"A boy consumed by hatred for Rome meets Jesus and is slowly, unwillingly changed. Pairs with Unit 1 because Daniel's account of events keeps proving less reliable than he thinks.",
     discuss:"Daniel's rage and desire for violent revenge are treated seriously, not tidily resolved."},
    {unit:2, title:"The Hobbit", author:"J.R.R. Tolkien", lexile:"1000L",
     why:"A near-perfect text for studying structure: every chapter has a clear job, and the ending answers the beginning. Written by a Christian whose sense of providence runs underneath everything.",
     discuss:"Battle deaths near the end, including characters the reader has grown attached to."},
    {unit:3, title:"Number the Stars", author:"Lois Lowry", lexile:"670L"
     , why:"A Danish family shelters their Jewish neighbors. Excellent for Unit 3 because Annemarie repeatedly learns that adults are telling her partial versions of events, for good reasons.",
     discuss:"The Holocaust, handled at an age-appropriate level but not softened into nothing."},
    {unit:4, title:"Tuck Everlasting", author:"Natalie Babbitt", lexile:"770L",
     why:"A family that cannot die. The whole book is an argument about time and sequence, which is Unit 4's subject, and the prose is genuinely beautiful.",
     discuss:"A death, and a sustained argument that endless life would be a curse rather than a gift."},
    {unit:5, title:"Where the Red Fern Grows", author:"Wilson Rawls", lexile:"700L",
     why:"Work, faithfulness, and a boy's prayers answered slowly through his own labor. The pacing of the sentences is a lesson in joining ideas.",
     discuss:"Two dogs die, and a boy dies in a hunting accident. This book makes readers cry; that is largely the point."},
    {unit:6, title:"The Wednesday Wars", author:"Gary D. Schmidt", lexile:"990L",
     why:"A seventh grader reads Shakespeare with his teacher during the Vietnam War. Superb model of precise, funny, carefully punctuated prose.",
     discuss:"Vietnam-era anxiety, a father who is emotionally harsh, and a classmate's brother missing in action."},
    {unit:7, title:"The Phantom Tollbooth", author:"Norton Juster", lexile:"1000L",
     why:"An entire novel built out of wordplay, idiom and root meaning. If Unit 7 lands, this book becomes twice as funny.",
     discuss:""},
    {unit:8, title:"The Giver", author:"Lois Lowry", lexile:"760L",
     why:"A society that has removed pain by removing choice. Nearly every sentence means more than it says, which is exactly Unit 8's skill.",
     discuss:"Infanticide is revealed partway through, presented soberly. Preview this one before starting; some families wait a year."},
    {unit:9, title:"Carry On, Mr. Bowditch", author:"Jean Lee Latham", lexile:"1010L",
     why:"A boy teaches himself navigation and rewrites the standard tables by checking every figure himself. The best possible model for Unit 9's research work.",
     discuss:"Several family deaths, treated matter-of-factly as they were in the period."}
  ];

  const INDEPENDENT = [
    {title:"The Chronicles of Narnia (later volumes)", author:"C.S. Lewis", lexile:"870L", cat:"Faith and imagination",
     why:"The Silver Chair and The Last Battle deal with obedience under confusion and holding to what you were told when circumstances argue otherwise."},
    {title:"Hinds' Feet on High Places", author:"Hannah Hurnard", lexile:"890L", cat:"Faith and imagination",
     why:"A sustained allegory of fear giving way to trust. Demands the reading-for-second-meaning skill Unit 8 builds."},
    {title:"Christian Heroes: Then & Now series", author:"Janet & Geoff Benge", lexile:"850L", cat:"Faith and imagination",
     why:"Missionary biographies that do not tidy up the cost — Eric Liddell, Gladys Aylward, Jim Elliot. Good models for Unit 9's research writing."},
    {title:"The Wingfeather Saga", author:"Andrew Peterson", lexile:"830L", cat:"Faith and imagination",
     why:"Fantasy with real stakes and a redemption arc that earns its ending. Four books, so it can carry a whole term of independent reading."},
    {title:"Roll of Thunder, Hear My Cry", author:"Mildred D. Taylor", lexile:"920L", cat:"Justice and courage",
     why:"A Black family in Depression-era Mississippi holds onto its land and its dignity. Hard, honest, and one of the best-written books on this list.",
     discuss:"Racial violence, including a burning and a near-lynching."},
    {title:"Bud, Not Buddy", author:"Christopher Paul Curtis", lexile:"950L", cat:"Justice and courage",
     why:"A funny, warm Depression-era novel about a boy searching for his father. Excellent first-person voice for Unit 3's point-of-view work."},
    {title:"Esperanza Rising", author:"Pam Muñoz Ryan", lexile:"750L", cat:"Justice and courage",
     why:"A wealthy Mexican girl becomes a farm laborer in California and learns what her mother is made of."},
    {title:"Hatchet", author:"Gary Paulsen", lexile:"1020L", cat:"Survival and problem-solving",
     why:"A boy alone after a plane crash, solving one concrete problem at a time. Reliable for a reader who says books are boring."},
    {title:"The Wild Robot", author:"Peter Brown", lexile:"740L", cat:"Survival and problem-solving",
     why:"Short chapters, real warmth, and a surprisingly deep argument about what makes something a person."},
    {title:"Island of the Blue Dolphins", author:"Scott O'Dell", lexile:"1000L", cat:"Survival and problem-solving",
     why:"Based on a true account of a woman alone on an island for eighteen years. Sits at the top of the year's band."},
    {title:"Who Was...? and I Survived series", author:"various", lexile:"800L", cat:"Nonfiction and research",
     why:"Accessible nonfiction to keep the informational half of the standard fed. Let your child pick the subjects."},
    {title:"Boys of Steel / Bomb (young readers editions)", author:"Steve Sheinkin and others", lexile:"920L", cat:"Nonfiction and research",
     why:"Narrative nonfiction that actually reads like a thriller — and models how to build an argument from sources."},
    {title:"A Wrinkle in Time", author:"Madeleine L'Engle", lexile:"740L", cat:"Stretch reads",
     why:"Science-fantasy by an openly Christian author, where love stands against conformity and darkness. Denser than its Lexile suggests."},
    {title:"The Watsons Go to Birmingham — 1963", author:"Christopher Paul Curtis", lexile:"920L", cat:"Stretch reads",
     why:"Very funny for two hundred pages, then devastating. A masterclass in how tone shift creates meaning.",
     discuss:"The 16th Street Baptist Church bombing."},
    {title:"Treasure Island", author:"Robert Louis Stevenson", lexile:"1010L", cat:"Stretch reads",
     why:"Genuine nineteenth-century prose. Slow going at first, then unstoppable — worth pushing through the first three chapters."}
  ];

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y2 = Object.assign(window.__CURR.LA_Y2||{}, {READ_ALOUDS, INDEPENDENT});
})();
