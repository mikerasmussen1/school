/* ============================================================================
 * WORD VOYAGERS — 5TH GRADE (36 weeks · 180 days)
 * ----------------------------------------------------------------------------
 * Same architecture as Year One, one grade up. The jump that matters at this
 * level is from "refer to the text" to QUOTING it accurately and explaining
 * how an author builds an idea — so nearly every reading week asks the child
 * to point at specific words, not just recall what happened.
 *
 * Content files:
 *   la-y2-words.js     36 spelling lists (Greek/Latin roots forward)
 *   la-y2-grammar.js   36 grammar drills
 *   la-y2-reading.js   36 passages (~200–260 words, 830–1010L range)
 *   la-y2-tasks.js     handwriting, writing and speaking tasks
 *   la-books-y2.js     the year's reading list
 *
 * FIVE-DAY RHYTHM (unchanged from Year One, because it works):
 *   Mon Reading · Tue Grammar · Wed Spelling · Thu Handwriting · Fri Speak & Show
 *   36 weeks x 5 = 180 days.
 *
 * WRITING IS HEAVIER THIS YEAR AND THAT IS DELIBERATE. Fifth grade asks for
 * three full piece types (opinion, informative, narrative) with evidence and
 * structure. Thursday carries a real writing task most weeks, not just a
 * copying exercise, and Units 3, 6 and 9 each end in a finished multi-
 * paragraph piece. Those are photographed and model-graded like everything
 * else on Thursday — but read the note in la-y2-tasks.js about what the model
 * can and cannot fairly judge in a piece of writing.
 * ==========================================================================*/
(function(){

  const UNITS = [
    {n:1, weeks:"1–4", color:"#1D4ED8", badge:"❝",
     name:"Say It Exactly", virtue:"Truthfulness",
     bigQ:"How do you prove what a text actually says, instead of what you remember it saying?",
     goal:"Quote accurately when explaining a text explicitly and when drawing inferences.",
     why:"Bearing false witness includes misquoting someone to win an argument. Learning to quote exactly is a moral skill before it is an academic one.",
     project:"Take one short text and write a page about it in which every claim you make is anchored to a quotation you copied exactly."},

    {n:2, weeks:"5–8", color:"#B23A2E", badge:"◑",
     name:"The Shape of a Story", virtue:"Perseverance",
     bigQ:"How do the parts of a story fit together to make one whole thing?",
     goal:"Theme, character response to challenge, summary, and how chapters or stanzas build structure.",
     why:"Scripture is largely narrative. Learning how a story is built is learning how to read the book your family reads most.",
     project:"Summarize a whole book in one page, then explain in a second page how its beginning set up its ending."},

    {n:3, weeks:"9–12", color:"#3E6B4F", badge:"⚖",
     name:"Two Accounts", virtue:"Humility in listening",
     bigQ:"When two people describe the same event differently, how do you think about it fairly?",
     goal:"Compare and contrast characters, settings, texts and structures; analyze multiple accounts and point of view.",
     why:"Four Gospels tell one story from four angles. Difference is not always contradiction — but working out which is which takes care and honesty.",
     project:"Find two accounts of one real event, chart what they agree on and where they differ, and write your own account citing both."},

    {n:4, weeks:"13–16", color:"#C79319", badge:"⧗",
     name:"Time and Sequence", virtue:"Faithfulness over time",
     bigQ:"How does English let you show that one thing happened before another?",
     goal:"Perfect verb tenses, using tense to convey sequence and condition, and correcting inappropriate tense shifts.",
     why:"A promise is a claim about the future; a testimony is a claim about the past. Both require getting time right in language.",
     project:"Write a narrative that moves between past, earlier past and future, keeping every tense correct."},

    {n:5, weeks:"17–20", color:"#7C5CBF", badge:"⁂",
     name:"Joining and Separating", virtue:"Peacemaking",
     bigQ:"How do small words hold big ideas together?",
     goal:"Conjunctions, prepositions, interjections, correlative conjunctions, and punctuation in a series.",
     why:"Blessed are the peacemakers — and joining two ideas fairly, without flattening either, is a small daily version of that work.",
     project:"Take a page of disconnected sentences and rebuild it into flowing paragraphs using varied joining words."},

    {n:6, weeks:"21–24", color:"#8E2C22", badge:"❖",
     name:"Marks That Matter", virtue:"Care and precision",
     bigQ:"How does punctuation change what a sentence means?",
     goal:"Commas for introductory elements, direct address, yes/no and tag questions; titles in quotation marks, italics or underlining.",
     why:"A misplaced comma can reverse a meaning. Precision in small things is a form of respect for whoever has to read you.",
     project:"Write an informative piece with headings, correct title formatting, and a source list."},

    {n:7, weeks:"25–28", color:"#2E7D6B", badge:"⚘",
     name:"Roots of Meaning", virtue:"Wisdom",
     bigQ:"How can you work out a word you have never met before?",
     goal:"Greek and Latin roots and affixes, syllabication, and multiple-meaning words in context.",
     why:"Get wisdom, and with all your getting, get understanding. Roots are how a reader becomes self-sufficient.",
     project:"Build a root dictionary of twenty roots with four relatives each, and use it to define ten words you have never seen."},

    {n:8, weeks:"29–32", color:"#B5651D", badge:"◈",
     name:"Figures and Nuance", virtue:"Discernment",
     bigQ:"How do you hear what someone means when they do not say it plainly?",
     goal:"Similes, metaphors, idioms, adages and proverbs; synonyms, antonyms, homographs; dialect and register.",
     why:"Proverbs is an entire book of compressed meaning. Learning to unpack a saying is learning to read wisdom literature.",
     project:"Collect ten proverbs or adages, explain each in your own words, and write a short story that earns one of them."},

    {n:9, weeks:"33–36", color:"#0F766E", badge:"✍",
     name:"Make the Case", virtue:"Witness",
     bigQ:"How do you research something honestly and then argue it well?",
     goal:"Research from several sources, summarizing and paraphrasing, listing sources, and opinion writing with evidence.",
     why:"Always be ready to give a reason. A reason is not a feeling loudly repeated — it is a claim with evidence behind it.",
     project:"A multi-source opinion paper with an introduction, grouped reasons, linking words, a conclusion, and a source list — presented aloud with a visual display."}
  ];

  /* [week, unit, title, grammar key, spelling pattern, standard] */
  const W = [
    [1,1,"Quoting Exactly","quoting","Greek root: graph / gram","RL.5.1"],
    [2,1,"Explicit vs. Inference","inference","Latin root: spect / vis","RL.5.1"],
    [3,1,"Evidence for a Claim","evidence","Latin root: dict / voc","RI.5.1"],
    [4,1,"Summarizing Without Copying","paraphrase","Latin root: scrib / script","RI.5.2"],
    [5,2,"Finding a Theme","theme","Latin root: port / trans","RL.5.2"],
    [6,2,"How Characters Respond","character","Latin root: struct / fac","RL.5.3"],
    [7,2,"Summarizing a Whole Text","summary","Greek root: chron / phon","RL.5.2"],
    [8,2,"How the Parts Fit","structure","Latin root: form / mit","RL.5.5"],
    [9,3,"Comparing Characters","compare-char","Latin root: ped / man","RL.5.3"],
    [10,3,"Comparing Structures","compare-struct","Greek root: therm / photo","RI.5.5"],
    [11,3,"Multiple Accounts","accounts","Latin root: aud / tact","RI.5.6"],
    [12,3,"Narrator's Point of View","point-of-view","Greek root: bio / geo","RL.5.6"],
    [13,4,"Present Perfect","present-perfect","-tion / -sion endings","L.5.1b"],
    [14,4,"Past Perfect","past-perfect","-ance / -ence endings","L.5.1b"],
    [15,4,"Future Perfect","future-perfect","-ible / -able endings","L.5.1b"],
    [16,4,"Fixing Tense Shifts","tense-shifts","-ous / -eous endings","L.5.1d"],
    [17,5,"Prepositions","prepositions","prefixes inter- / intra-","L.5.1a"],
    [18,5,"Conjunctions and Interjections","conj-interj","prefixes sub- / super-","L.5.1a"],
    [19,5,"Correlative Conjunctions","correlative","prefixes trans- / circum-","L.5.1e"],
    [20,5,"Commas in a Series","series-commas","prefixes ante- / post-","L.5.2a"],
    [21,6,"Introductory Commas","intro-commas","homophones I","L.5.2b"],
    [22,6,"Direct Address and Tag Questions","address-commas","homophones II","L.5.2c"],
    [23,6,"Titles of Works","titles","commonly confused words","L.5.2d"],
    [24,6,"Expanding and Combining Sentences","sentence-craft","silent letters & doubles","L.5.3a"],
    [25,7,"Greek Roots","greek-roots","Greek roots review","L.5.4b"],
    [26,7,"Latin Roots","latin-roots","Latin roots review","L.5.4b"],
    [27,7,"Prefixes and Suffixes","affixes","academic suffixes","L.5.4b"],
    [28,7,"Multiple-Meaning Words","multi-meaning","multisyllable words","L.5.4a"],
    [29,8,"Similes and Metaphors","figurative","figurative-language words","L.5.5a"],
    [30,8,"Idioms, Adages, Proverbs","idioms-adages","idiom key words","L.5.5b"],
    [31,8,"Synonyms, Antonyms, Homographs","word-relations","homographs","L.5.5c"],
    [32,8,"Dialect and Register","register","formal register words","L.5.3b"],
    [33,9,"Research from Several Sources","research","research vocabulary","W.5.7"],
    [34,9,"Paraphrase and Cite","citing","citation vocabulary","W.5.8"],
    [35,9,"Opinion with Evidence","opinion","logical-relationship words","W.5.1"],
    [36,9,"Present and Defend","presenting","year review: tricky words","SL.5.4"]
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

  const unitOf = wk => UNITS[Math.floor((wk-1)/4)];

  const STANDARDS = [
    {tag:"RL.5.1 / RI.5.1", text:"Quote accurately when explaining a text explicitly and when drawing inferences.", weeks:"1–4, and every reading day"},
    {tag:"RL.5.2", text:"Determine a theme from details; summarize the text.", weeks:"5, 7"},
    {tag:"RL.5.3", text:"Compare and contrast characters, settings or events, drawing on specific details.", weeks:"6, 9"},
    {tag:"RL.5.4 / L.5.5a", text:"Determine meaning of words and phrases, including figurative language.", weeks:"29, 31"},
    {tag:"RL.5.5", text:"Explain how chapters, scenes or stanzas fit together to provide structure.", weeks:"8"},
    {tag:"RL.5.6", text:"Describe how a narrator's point of view influences how events are described.", weeks:"12"},
    {tag:"RL.5.7", text:"Analyze how visual and multimedia elements contribute to the meaning, tone or beauty of a text.", weeks:"10; Unit 9 visual display"},
    {tag:"RL.5.9", text:"Compare and contrast stories in the same genre on similar themes.", weeks:"10"},
    {tag:"RL.5.10", text:"Read and comprehend literature at the high end of the grades 4–5 band independently.", weeks:"every reading day"},
    {tag:"RI.5.2", text:"Determine two or more main ideas and explain how key details support them.", weeks:"4, 7"},
    {tag:"RI.5.3", text:"Explain relationships between individuals, events, ideas or concepts.", weeks:"11"},
    {tag:"RI.5.4", text:"Determine the meaning of general academic and domain-specific words and phrases in a text.", weeks:"25–28; every spelling day"},
    {tag:"RI.5.5", text:"Compare and contrast the overall structure of two or more texts.", weeks:"10"},
    {tag:"RI.5.6", text:"Analyze multiple accounts of the same event, noting differences in point of view.", weeks:"11, 12"},
    {tag:"RI.5.7", text:"Draw on information from multiple print or digital sources to locate an answer or solve a problem efficiently.", weeks:"33, 34"},
    {tag:"RI.5.8", text:"Explain how an author uses reasons and evidence to support particular points.", weeks:"3, 35"},
    {tag:"RI.5.9 / W.5.7", text:"Integrate information from several texts; conduct short research projects.", weeks:"33, 34"},
    {tag:"RI.5.10", text:"Read and comprehend informational texts at the high end of the grades 4–5 band independently.", weeks:"every reading day"},
    {tag:"RF.5.3", text:"Use letter-sound, syllabication and morphology to read unfamiliar multisyllabic words.", weeks:"25–28; every spelling day"},
    {tag:"RF.5.4", text:"Read grade-level text with accuracy, appropriate rate and expression.", weeks:"every reading day"},
    {tag:"W.5.1", text:"Opinion writing: introduce, state an opinion, group reasons logically, link, conclude.", weeks:"35; Unit 3 and 9 projects"},
    {tag:"W.5.2", text:"Informative/explanatory writing with headings, facts, definitions and precise language.", weeks:"Unit 6 project; Thursdays"},
    {tag:"W.5.3", text:"Narrative writing with dialogue, description, pacing and transitions.", weeks:"Unit 4 project; Thursdays"},
    {tag:"W.5.4", text:"Produce clear and coherent writing appropriate to task, purpose and audience.", weeks:"Thursday every week; 32"},
    {tag:"W.5.5", text:"Develop and strengthen writing by planning, revising, editing and rewriting.", weeks:"Thursday every week"},
    {tag:"W.5.6", text:"Use technology to produce and publish writing and to collaborate.", weeks:"Units 6, 9"},
    {tag:"W.5.8", text:"Summarize or paraphrase from sources; provide a list of sources.", weeks:"4, 34"},
    {tag:"W.5.9", text:"Draw evidence from texts to support analysis and reflection.", weeks:"1–4, 35"},
    {tag:"W.5.10", text:"Write routinely over extended and shorter time frames.", weeks:"Thursday every week"},
    {tag:"SL.5.1", text:"Engage effectively in collaborative discussions; pose and respond to specific questions.", weeks:"Friday every week"},
    {tag:"SL.5.2", text:"Summarize a text read aloud or information from diverse media.", weeks:"Fridays, Units 1, 3"},
    {tag:"SL.5.3", text:"Summarize a speaker's points and explain how each claim is supported.", weeks:"Fridays, Units 3, 9"},
    {tag:"SL.5.4", text:"Report on a topic or present an opinion, sequencing ideas logically.", weeks:"36; Fridays"},
    {tag:"SL.5.5", text:"Include multimedia components and visual displays.", weeks:"Units 6, 9"},
    {tag:"SL.5.6", text:"Adapt speech to context, using formal English when appropriate.", weeks:"32, 36"},
    {tag:"L.5.1a", text:"Explain the function of conjunctions, prepositions and interjections.", weeks:"17, 18"},
    {tag:"L.5.1b-d", text:"Perfect verb tenses; use tense to convey sequence; correct inappropriate shifts.", weeks:"13–16"},
    {tag:"L.5.1e", text:"Use correlative conjunctions.", weeks:"19"},
    {tag:"L.5.2a-d", text:"Series punctuation; introductory commas; direct address and tag questions; titles.", weeks:"20–23"},
    {tag:"L.5.2e", text:"Spell grade-appropriate words correctly, consulting references as needed.", weeks:"every spelling day"},
    {tag:"L.5.3a", text:"Expand, combine and reduce sentences for meaning and style.", weeks:"24"},
    {tag:"L.5.3b", text:"Compare and contrast varieties of English used in stories, dramas or poems.", weeks:"32"},
    {tag:"L.5.4", text:"Use context, Greek and Latin roots, and reference materials to clarify meaning.", weeks:"25–28"},
    {tag:"L.5.5b-c", text:"Idioms, adages and proverbs; synonyms, antonyms and homographs.", weeks:"30, 31"},
    {tag:"L.5.6", text:"Acquire academic words, including those signaling contrast, addition and logical relationships.", weeks:"35; every spelling day"}
  ];

  const GRADE = {label:"5th Grade", short:"5th", lexile:"830\u20131010", guided:"grades 4\u20135 band"};

  const BENCHMARKS = [
    "Independent reading and comprehension in the grades 4\u20135 complexity band (roughly Lexile 830\u20131010).",
    "Fluent oral reading with accuracy, appropriate rate and expression, self-correcting from context.",
    "Organized multi-paragraph writing that uses evidence, quotes sources accurately, and follows a clear structure."
  ];

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y2 = Object.assign(window.__CURR.LA_Y2||{}, {UNITS, WEEKS, STANDARDS, unitOf, GRADE, BENCHMARKS});
})();
