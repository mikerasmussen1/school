/* ============================================================================
 * WORD VOYAGERS — 3RD GRADE (36 weeks · 180 days)
 * ----------------------------------------------------------------------------
 * Nine unit studies, four weeks each. Every unit carries a Big Question, a
 * virtue it is built around, and a project; every week names the one language
 * skill it drills and the standard it answers to.
 *
 * END-OF-YEAR BENCHMARKS this course is built to hit:
 *   - Independent reading in the Lexile 420–820 range (guided-reading P–R)
 *   - Fluent oral reading of grade-level text
 *   - A coherent multi-paragraph piece with introduction, supporting details
 *     and a conclusion
 * These are listed in BENCHMARKS below and shown on the For Parents tab.
 *
 * This file is structure only — no questions, no passages. Content lives in:
 *   la-y1-words.js     36 weekly spelling lists (pattern-grouped)
 *   la-y1-grammar.js   36 weekly grammar sets
 *   la-y1-reading.js   36 weekly passages + comprehension questions
 *   la-y1-tasks.js     handwriting, writing, research and speaking tasks
 *   la-books.js        the year's reading list
 *
 * Splitting it this way is deliberate: CONTRIBUTING.md's whole argument for
 * curriculum/ is that two people never edit the same file. A year of content
 * in one file would undo that.
 *
 * THE FIVE-DAY RHYTHM. Each week is five days and each day is one screen the
 * child can start alone:
 *   Mon  Reading      passage + comprehension questions
 *   Tue  Grammar      the week's grammar drill
 *   Wed  Spelling     the week's word list + spelling drill
 *   Thu  Handwriting  written on paper, photographed, graded by LAGrader
 *   Fri  Speak & Show the week's speaking/listening task, then a review drill
 *
 * 36 weeks x 5 days = 180 days.
 *
 * SPEAKING, LISTENING AND WRITING ARE NOT AUTO-GRADED, AND SHOULD NOT BE.
 * A child reporting on a topic out loud, or taking notes for a research
 * project, has no right answer to check. Those days carry a `looksLike`
 * rubric, the child records or writes the work, and it is marked by a person
 * or (for the written ones) photographed and read by the model. Anything
 * claiming to auto-score a spoken discussion would be theatre.
 * ==========================================================================*/
(function(){

  /* ------------------------------------------------------------------------
   * THE LEVEL THIS YEAR IS PITCHED AT, in one place, so the three strands can
   * be checked against each other rather than drifting apart.
   *
   * Third grade standards, taught properly, with a short stretch tail on every
   * strand. Not a fourth-grade course wearing a third-grade label.
   *
   *   READING   5 questions a passage (was 3). Detail, vocabulary in context
   *             and central message, then two harder ones: inference and why
   *             the writer put a particular detail there. Passages average
   *             ~178 words, up from 145.
   *   SPELLING  14 words a week (was 12). Twelve on the week's pattern, then
   *             two that follow the same pattern one step further.
   *   GRAMMAR   8 items a week (was 6). Six on the skill, then one applying it
   *             to a longer sentence and one asking the child to say the rule
   *             back.
   *
   * The shape is deliberately identical across all three: keep the core at
   * grade level, add roughly a quarter more as stretch. A child who does only
   * the core is doing third grade properly. A child who takes the tail is
   * being extended without being moved up a year.
   *
   * An earlier pass went further than this — six comprehension questions,
   * 240-word passages, words like gabelle and miasma. That was a fourth or
   * fifth grade reading experience with a third grade label on it, and it was
   * pulled back to here on purpose.
   * --------------------------------------------------------------------- */

  /* ---- The nine unit studies ------------------------------------------- */
  const UNITS = [
    {n:1, weeks:"1–4",  color:"#B23A2E", badge:"¶",
     name:"Words That Build",     virtue:"Truthful speech",
     bigQ:"What makes a sentence a sentence, and not just a pile of words?",
     goal:"Name nouns, pronouns and verbs, and build complete simple sentences.",
     why:"Proverbs says a word fitly spoken is like apples of gold. Before you can speak fitly, you have to be able to build a sentence that holds together.",
     project:"Write and illustrate six complete sentences about your own week, then read them aloud to the family."},

    {n:2, weeks:"5–8",  color:"#C79319", badge:"❖",
     name:"Creation and Order",   virtue:"Stewardship",
     bigQ:"Why does it matter that words agree with each other?",
     goal:"Regular and irregular plurals, abstract nouns, and subject-verb agreement.",
     why:"The first chapter of Genesis is a picture of order coming out of chaos. Grammar is a small version of the same work: putting things in right relation.",
     project:"Make a field guide to one created thing — a bird, a tree, a bug — with at least eight labeled sentences that agree."},

    {n:3, weeks:"9–12", color:"#3E6B4F", badge:"★",
     name:"Courage in the Crowd", virtue:"Courage",
     bigQ:"How do the right words make a description come alive?",
     goal:"Adjectives, adverbs, and comparative and superlative forms.",
     why:"Daniel, Esther and David all stood out from the crowd. Describing well is how you make a reader see someone worth standing beside.",
     project:"Write a character sketch of someone brave — from Scripture, history, or your own life — using at least five vivid adjectives and three adverbs."},

    {n:4, weeks:"13–16", color:"#5B6B78", badge:"⚒",
     name:"The Careful Craftsman", virtue:"Diligence",
     bigQ:"How do you join two ideas so a reader can follow the seam?",
     goal:"Coordinating and subordinating conjunctions; simple, compound and complex sentences.",
     why:"Whatever your hand finds to do, do it with your might. A well-joined sentence is honest workmanship — the reader never sees the seam, but it holds.",
     project:"Rewrite a page of short choppy sentences into smooth compound and complex ones, then read both versions aloud and hear the difference."},

    {n:5, weeks:"17–20", color:"#8E2C22", badge:"❝",
     name:"Honest Words",         virtue:"Honesty",
     bigQ:"How do you show, on paper, exactly what someone said?",
     goal:"Capitalizing titles; commas in addresses and dialogue; quotation marks.",
     why:"Quoting someone accurately is a form of telling the truth. Putting words in someone's mouth that they never said is a form of bearing false witness.",
     project:"Interview a grandparent or older friend and write up the conversation with correct dialogue punctuation."},

    {n:6, weeks:"21–24", color:"#7C5CBF", badge:"⌂",
     name:"Belonging To",         virtue:"Family and belonging",
     bigQ:"How does language show what belongs to whom?",
     goal:"Possessives, and pronoun-antecedent agreement.",
     why:"'I am my beloved's and my beloved is mine.' Belonging is one of the deepest ideas in Scripture, and English has a small mark — the apostrophe — that carries it.",
     project:"Build a family tree page where every caption uses a possessive correctly."},

    {n:7, weeks:"25–28", color:"#2E7D6B", badge:"⚘",
     name:"Roots and Branches",   virtue:"Wisdom and growth",
     bigQ:"How can you work out a word you have never seen before?",
     goal:"Prefixes, suffixes, root words, and context clues.",
     why:"A tree planted by streams of water sends out roots. Words have roots too, and knowing them lets you grow your vocabulary on your own.",
     project:"Keep a root-word notebook for four weeks: every new word, its root, and two relatives that share it."},

    {n:8, weeks:"29–32", color:"#B5651D", badge:"◈",
     name:"More Than It Says",    virtue:"Discernment",
     bigQ:"When do words mean something other than exactly what they say?",
     goal:"Literal vs. nonliteral language, idioms, similes, and shades of meaning.",
     why:"Jesus taught in parables — stories that mean more than they say. Learning to hear the second meaning is how you read both literature and life.",
     project:"Collect ten idioms, draw the literal meaning of one as a joke, then explain what it actually means."},

    {n:9, weeks:"33–36", color:"#1D4ED8", badge:"✍",
     name:"Tell It Well",         virtue:"Witness and service",
     bigQ:"How do you find out something true, and then tell it clearly to someone else?",
     goal:"Short research projects, note-taking, sorting evidence, and multi-paragraph writing.",
     why:"Always be prepared to give a reason for the hope that is in you. That means doing the work to know, and then saying it plainly.",
     project:"A five-paragraph research report with an introduction, three supporting paragraphs and a conclusion, presented aloud with a visual display."}
  ];

  /* ---- The 36 weeks ----------------------------------------------------
   * Compact table, expanded below. Columns:
   *   week, unit, title, grammar focus (drives la-y1-grammar.js),
   *   spelling pattern (drives la-y1-words.js), standard tag
   * Kept as a table rather than 36 hand-written objects because the shape is
   * genuinely identical every week — the differences are the four strings.   */
  const W = [
    // Unit 1 — Words That Build
    [1,1,"Nouns Name Things","nouns","short vowels & -s plurals","L.3.1a"],
    [2,1,"Verbs Do Things","verbs","consonant blends","L.3.1a"],
    [3,1,"Complete Sentences","sentences","long a patterns","L.3.1i"],
    [4,1,"Pronouns Stand In","pronouns","long e patterns","L.3.1a"],
    // Unit 2 — Creation and Order
    [5,2,"Regular Plurals","plurals-regular","plurals -s / -es","L.3.1b"],
    [6,2,"Irregular Plurals","plurals-irregular","irregular plurals","L.3.1b"],
    [7,2,"Abstract Nouns","abstract-nouns","-tion & -sion","L.3.1c"],
    [8,2,"Subject-Verb Agreement","sv-agreement","long i patterns","L.3.1f"],
    // Unit 3 — Courage in the Crowd
    [9,3,"Adjectives Describe","adjectives","long o patterns","L.3.1a"],
    [10,3,"Adverbs Tell How","adverbs","-ly endings","L.3.1a"],
    [11,3,"Comparatives (-er)","comparatives","-er & -est","L.3.1g"],
    [12,3,"Superlatives (-est, most)","superlatives","double consonants","L.3.1g"],
    // Unit 4 — The Careful Craftsman
    [13,4,"Coordinating Conjunctions","conj-coordinating","r-controlled ar / or","L.3.1h"],
    [14,4,"Subordinating Conjunctions","conj-subordinating","r-controlled er / ir / ur","L.3.1h"],
    [15,4,"Compound Sentences","compound-sentences","diphthongs ou / ow","L.3.1i"],
    [16,4,"Complex Sentences","complex-sentences","diphthongs oi / oy","L.3.1i"],
    // Unit 5 — Honest Words
    [17,5,"Capitalizing Titles","capitalization","silent letters","L.3.2a"],
    [18,5,"Commas in Addresses","commas-addresses","hard & soft c","L.3.2b"],
    [19,5,"Commas in Dialogue","commas-dialogue","hard & soft g","L.3.2c"],
    [20,5,"Quotation Marks","quotation-marks","compound words","L.3.2c"],
    // Unit 6 — Belonging To
    [21,6,"Singular Possessives","possessive-singular","possessives & apostrophes","L.3.2d"],
    [22,6,"Plural Possessives","possessive-plural","contractions","L.3.2d"],
    [23,6,"Pronoun-Antecedent Agreement","pronoun-antecedent","homophones I","L.3.1f"],
    [24,6,"Its vs. It's","its-vs-its","homophones II","L.3.2d"],
    // Unit 7 — Roots and Branches
    [25,7,"Prefixes un-, re-, pre-","prefixes","prefixes un- re- pre-","L.3.4b"],
    [26,7,"Prefixes dis-, mis-, non-","prefixes-2","prefixes dis- mis- non-","L.3.4b"],
    [27,7,"Suffixes -ful, -less, -ness","suffixes","suffixes -ful -less -ness","L.3.4b"],
    [28,7,"Context Clues","context-clues","suffixes -able -ment","L.3.4a"],
    // Unit 8 — More Than It Says
    [29,8,"Literal vs. Nonliteral","literal-nonliteral","multisyllable words I","L.3.5a"],
    [30,8,"Idioms","idioms","multisyllable words II","L.3.5a"],
    [31,8,"Similes and Metaphors","similes","tricky spellings I","L.3.5a"],
    [32,8,"Shades of Meaning","shades-of-meaning","tricky spellings II","L.3.5c"],
    // Unit 9 — Tell It Well
    [33,9,"Taking Notes","research-notes","academic words I","W.3.8"],
    [34,9,"Sorting Evidence","research-evidence","academic words II","W.3.8"],
    [35,9,"Paragraphs That Build","paragraphs","time & space words","W.3.2"],
    [36,9,"Report and Present","reporting","review: year's tricky words","SL.3.4"]
  ];

  const WEEKS = W.map(r=>({
    n:r[0], unit:r[1], title:r[2], grammar:r[3], spelling:r[4], standard:r[5],
    days:[
      {day:"Mon", kind:"reading",     label:"Reading"},
      {day:"Tue", kind:"grammar",     label:"Grammar"},
      {day:"Wed", kind:"spelling",    label:"Spelling"},
      {day:"Thu", kind:"handwriting", label:"Handwriting"},
      {day:"Fri", kind:"speaking",    label:"Speak & Show"}
    ]
  }));

  const unitOf   = wk => UNITS[Math.floor((wk-1)/4)];
  const weeksOf  = un => WEEKS.filter(w=>w.unit===un);

  /* ---- What each standard maps to, for the parent view ------------------ */
  const STANDARDS = [
    {tag:"L.3.1a", text:"Explain the function of nouns, pronouns, verbs, adjectives and adverbs.", weeks:"1, 2, 4, 9, 10"},
    {tag:"L.3.1b", text:"Form and use regular and irregular plural nouns.", weeks:"5, 6"},
    {tag:"L.3.1c", text:"Use abstract nouns.", weeks:"7"},
    {tag:"L.3.1d", text:"Form and use regular and irregular verbs.", weeks:"2"},
    {tag:"L.3.1e", text:"Form and use the simple verb tenses (I walked; I walk; I will walk).", weeks:"2"},
    {tag:"L.3.1f", text:"Ensure subject-verb and pronoun-antecedent agreement.", weeks:"8, 23"},
    {tag:"L.3.1g", text:"Form and use comparative and superlative adjectives and adverbs.", weeks:"11, 12"},
    {tag:"L.3.1h", text:"Use coordinating and subordinating conjunctions.", weeks:"13, 14"},
    {tag:"L.3.1i", text:"Produce simple, compound and complex sentences.", weeks:"3, 15, 16"},
    {tag:"L.3.2a", text:"Capitalize appropriate words in titles.", weeks:"17"},
    {tag:"L.3.2b", text:"Use commas in addresses.", weeks:"18"},
    {tag:"L.3.2c", text:"Use commas and quotation marks in dialogue.", weeks:"19, 20"},
    {tag:"L.3.2d", text:"Form and use possessives.", weeks:"21, 22, 24"},
    {tag:"L.3.2e-g", text:"Spell high-frequency words and use spelling patterns; consult references.", weeks:"every week's list"},
    {tag:"L.3.4a", text:"Use sentence-level context as a clue to a word's meaning.", weeks:"28"},
    {tag:"L.3.4b", text:"Determine meaning of new words formed by known affixes and roots.", weeks:"25, 26, 27"},
    {tag:"L.3.5a", text:"Distinguish literal from nonliteral language.", weeks:"29, 30, 31"},
    {tag:"L.3.5c", text:"Distinguish shades of meaning among related words.", weeks:"32"},
    {tag:"L.3.6", text:"Acquire grade-appropriate academic and domain-specific words, including time and space words.", weeks:"33, 34, 35"},
    {tag:"W.3.1", text:"Opinion writing: introduce the topic, state an opinion, give reasons, use linking words, provide a conclusion.", weeks:"Thursdays; Unit 3 and 9 projects"},
    {tag:"W.3.2", text:"Informative/explanatory writing: introduce a topic, group related information, develop with facts and details, conclude.", weeks:"Thursdays; Unit 2 and 6 projects"},
    {tag:"W.3.3", text:"Narrative writing: establish a situation, introduce characters, use dialogue and description, provide closure.", weeks:"Thursdays; Unit 5 and 8 projects"},
    {tag:"W.3.4-6", text:"Plan, revise and edit with guidance; use technology to produce and publish.", weeks:"Thursday every week; Unit 9"},
    {tag:"W.3.8",  text:"Conduct short research projects; take notes and sort evidence.", weeks:"33, 34"},
    {tag:"W.3.10", text:"Write routinely over short and extended time frames.", weeks:"Thursday every week"},
    {tag:"SL.3.1", text:"Participate in collaborative discussions, building on others' ideas.", weeks:"Friday every week"},
    {tag:"SL.3.2", text:"Determine main ideas and supporting details presented orally or in media.", weeks:"Friday, Units 2, 5, 8"},
    {tag:"SL.3.3", text:"Ask and answer questions about a speaker's information.", weeks:"Friday, Units 3, 6"},
    {tag:"SL.3.4", text:"Report on a topic or text, tell a story, or recount an experience.", weeks:"Friday every week; Week 36"},
    {tag:"SL.3.5", text:"Create audio recordings or visual displays.", weeks:"Units 4, 7, 9"},
    {tag:"RF.3.3", text:"Apply phonics and word-analysis skills: prefixes and suffixes, multisyllabic words, irregularly spelled words.", weeks:"every spelling day; 25–28"},
    {tag:"RF.3.4", text:"Read grade-level text orally with accuracy, appropriate rate and expression.", weeks:"Monday every week"},
    {tag:"RL/RI.3.10", text:"Read and comprehend at the high end of the 2–3 band (Lexile ~420–820).", weeks:"Monday every week"}
  ];

  const GRADE = {label:"3rd Grade", short:"3rd", lexile:"420\u2013820", guided:"P\u2013R"};

  const BENCHMARKS = [
    "Independent reading of texts in the Lexile 420\u2013820 range (guided-reading levels around P\u2013R).",
    "Fluent oral reading of grade-level text with appropriate rate and expression.",
    "A coherent multi-paragraph piece with an introduction, supporting details and a conclusion."
  ];

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y1 = Object.assign(window.__CURR.LA_Y1||{}, {UNITS, WEEKS, STANDARDS, unitOf, weeksOf, GRADE, BENCHMARKS});
})();
