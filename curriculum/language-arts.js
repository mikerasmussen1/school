/* ============================================================================
 * WORD VOYAGERS — language arts
 * ----------------------------------------------------------------------------
 * Grammar and spelling as tiered, auto-graded QTypes practice sets (same shape
 * math uses); reading comprehension as passages with auto-graded multiple-
 * choice questions; a daily handwritten assignment in all four areas, done on
 * paper, photographed, and graded by the model the same way PaperReader grades
 * a scanned math worksheet — see word-voyagers.dc.html for that page and
 * LAGrader for the vision call once they exist. A recommended book list rounds
 * it out; that part is discussion, not graded.
 *
 * This file is data only. Nothing outside curriculum/ changes as it grows.
 *
 *   - Store a child's progress under slice.subjects.la.data — see the contract
 *     at the top of subjects.js. It syncs to Firestore per child for free.
 *   - Two tracks, g3 and g5, exactly like math's y3/y5 — a child picks one on
 *     the landing card (slice.subjects.la.level) independent of their math
 *     level.
 *   - status stays "soon" / open stays "stub" until word-voyagers.dc.html is
 *     built and reads this data. Flip both once that page is real.
 *
 * DATA SHAPES USED HERE
 *
 *   Practice set (grammar, spelling) — identical to math's, see CONTRIBUTING:
 *     {id, w, label, title, note, items:[{id, type, t, q, a, hint, options}]}
 *     id is permanent — progress is stored under it, so never reuse or renumber.
 *
 *   Passage (reading comprehension) — its own shape; the questions inside are
 *   still ordinary QTypes multiple-choice items, so they grade the same way:
 *     {id, label, type:"Literature"|"Informational", text,
 *      questions:[{id, type:"multiple-choice", t, q, options, a, hint}]}
 *
 *   Handwritten assignment bank — not graded by QTypes at all: the child
 *   writes on paper, photographs it, and the model grades the photo against
 *   `rubric`. `prompts` rotates; the page should pick one at random per visit.
 *     {subject, instructions, rubric, prompts:["...", "..."]}
 *
 *   Book — discussion only, nothing here is graded:
 *     {title, author, category, ageRange, blurb}
 * ==========================================================================*/
(function(){

  /* ---------------------------------------------------------------------
   * GRAMMAR — Unit 1, Week 1. One practice set per grade, tiered 0/1/2.
   * ------------------------------------------------------------------- */
  const GRAMMAR = {

    g3: {id:"la-g3-w1-grammar", w:1, label:"1.1", title:"Sentences and Parts of Speech",
      note:"Nouns, verbs, adjectives, adverbs, subject-verb agreement, plurals, comparatives, conjunctions.",
      items:[
        {id:"la-g3-gr-01", type:"multiple-choice", t:0, q:'Which word in this sentence is the verb? "The clever fox jumped over the fence."', options:["clever","fox","jumped","fence"], a:2, hint:"A verb shows the action."},
        {id:"la-g3-gr-02", type:"multiple-choice", t:0, q:'Which word is an adjective? "My grandmother baked a warm apple pie."', options:["baked","warm","pie","My"], a:1, hint:"An adjective describes a noun."},
        {id:"la-g3-gr-03", type:"multiple-choice", t:0, q:'Which word is an adverb? "The puppy barked loudly at the mail carrier."', options:["puppy","barked","loudly","mail"], a:2, hint:"An adverb often tells how something happens."},
        {id:"la-g3-gr-04", type:"multiple-choice", t:0, q:'Which sentence is correct?', options:["The dogs barks at night.","The dogs bark at night.","The dog bark at night.","The dog barking at night."], a:1, hint:"A plural subject needs a plural verb."},
        {id:"la-g3-gr-05", type:"multiple-choice", t:0, q:'What is the plural of "child"?', options:["childs","childes","children","childrens"], a:2, hint:"This one does not just add -s."},
        {id:"la-g3-gr-06", type:"multiple-choice", t:0, q:'What is the plural of "box"?', options:["boxs","boxes","boxies","box"], a:1, hint:"Words ending in -x usually add -es."},
        {id:"la-g3-gr-07", type:"multiple-choice", t:1, q:'What is the plural of "mouse"?', options:["mouses","mices","mouse","mice"], a:3, hint:"This is an irregular plural."},
        {id:"la-g3-gr-08", type:"multiple-choice", t:1, q:'Fill in the blank: "This puzzle is ___ than the last one."', options:["harder","more hard","hardest","most hard"], a:0, hint:"Short adjectives usually add -er to compare two things."},
        {id:"la-g3-gr-09", type:"multiple-choice", t:1, q:'Fill in the blank: "Of all three trails, this one is the ___."', options:["beautifuller","more beautiful","most beautiful","beautifulest"], a:2, hint:"Longer adjectives use \"most,\" not -est."},
        {id:"la-g3-gr-10", type:"multiple-choice", t:1, q:'Which word best joins these ideas? "I wanted to go outside, ___ it started to rain."', options:["and","but","so","or"], a:1, hint:"Look for the word that shows contrast."},
        {id:"la-g3-gr-11", type:"multiple-choice", t:1, q:'Which sentence is compound (two complete ideas joined together)?', options:["The wind blew hard.","The wind blew hard, and the kite soared.","The strong wind.","Blowing hard, the wind."], a:1, hint:"Look for two complete sentences joined by a comma and a joining word."},
        {id:"la-g3-gr-12", type:"multiple-choice", t:2, q:'"It\'s raining cats and dogs" is an example of:', options:["a simile","an idiom","a fact","a compound sentence"], a:1, hint:"An idiom does not mean what it literally says."},
        {id:"la-g3-gr-13", type:"multiple-choice", t:2, q:'Which sentence uses a simile?', options:["The moon was a silver coin.","She was as quiet as a mouse.","The clock ticked loudly.","He ran to the store."], a:1, hint:"A simile compares using \"like\" or \"as.\""}
      ]},

    g5: {id:"la-g5-w1-grammar", w:1, label:"1.1", title:"Prepositions, Perfect Tenses, and Commas",
      note:"Prepositions, interjections, perfect verb tenses, correlative conjunctions, comma rules, titles, figurative language.",
      items:[
        {id:"la-g5-gr-01", type:"multiple-choice", t:0, q:'Which word is a preposition? "The cat hid beneath the old porch."', options:["cat","hid","beneath","porch"], a:2, hint:"A preposition shows where something is in relation to something else."},
        {id:"la-g5-gr-02", type:"multiple-choice", t:0, q:'Which word is an interjection? "Wow, that sunset is beautiful!"', options:["Wow","sunset","beautiful","that"], a:0, hint:"An interjection expresses sudden feeling."},
        {id:"la-g5-gr-03", type:"multiple-choice", t:0, q:'Which sentence uses the present perfect tense correctly?', options:["I have finished my homework.","I finish my homework.","I will finished my homework.","I finishing my homework."], a:0, hint:"Present perfect uses have/has plus a past participle."},
        {id:"la-g5-gr-04", type:"multiple-choice", t:0, q:'Which sentence uses the past perfect tense correctly?', options:["She had left before I arrived.","She left before I arrived.","She has left before I arrived.","She leaving before I arrived."], a:0, hint:"Past perfect uses \"had\" to show one past action happened before another."},
        {id:"la-g5-gr-05", type:"multiple-choice", t:0, q:'Which sentence uses the future perfect tense correctly?', options:["By next year, I will have graduated.","By next year, I have graduated.","By next year, I graduate.","By next year, I graduated."], a:0, hint:"Future perfect uses \"will have.\""},
        {id:"la-g5-gr-06", type:"multiple-choice", t:1, q:'Which sentence corrects this tense shift? "She walked into the room and sees her friend."', options:["She walked into the room and saw her friend.","She walks into the room and sees her friend.","She walking into the room and sees her friend.","She walked into the room and seeing her friend."], a:0, hint:"Keep both verbs in the same tense."},
        {id:"la-g5-gr-07", type:"multiple-choice", t:1, q:'Which word correctly completes this sentence? "Neither the teacher ___ the students wanted to skip recess."', options:["nor","or","and","but"], a:0, hint:"\"Neither\" pairs with a specific word."},
        {id:"la-g5-gr-08", type:"multiple-choice", t:1, q:'Which sentence uses commas correctly?', options:["I packed a jacket, boots, and a flashlight.","I packed a jacket boots, and a flashlight.","I packed a jacket, boots and, a flashlight.","I packed a jacket, boots, and, a flashlight."], a:0, hint:"Commas separate every item in a series."},
        {id:"la-g5-gr-09", type:"multiple-choice", t:1, q:'Which sentence correctly punctuates the introductory element?', options:["After the storm passed, we went outside.","After the storm passed we went outside.","After, the storm passed we went outside.","After the storm, passed we went outside."], a:0, hint:"A comma separates the introductory clause from the main sentence."},
        {id:"la-g5-gr-10", type:"multiple-choice", t:1, q:'In handwriting, how should you show the title of a book?', options:["Put it in quotation marks","Underline it","Write it in all capital letters","Circle it"], a:1, hint:"Underlining stands in for italics when handwriting."},
        {id:"la-g5-gr-11", type:"multiple-choice", t:2, q:'"Time is money" is an example of:', options:["a simile","a metaphor","an idiom","a proverb"], a:1, hint:"A metaphor says one thing IS another, without \"like\" or \"as.\""},
        {id:"la-g5-gr-12", type:"multiple-choice", t:2, q:'Which transition word signals an added point rather than a contrast? "The trail was steep. ___, it offered a beautiful view."', options:["Moreover","However","Although","Unless"], a:0, hint:"This word adds a point instead of showing contrast."},
        {id:"la-g5-gr-13", type:"multiple-choice", t:2, q:'Which sentence best combines these two ideas? "The hikers were tired. They kept climbing."', options:["Although the hikers were tired, they kept climbing.","The hikers were tired they kept climbing.","The hikers were tired, kept climbing.","Tired the hikers kept climbing."], a:0, hint:"Look for the sentence that reads as one clear, complete idea."}
      ]}
  };

  /* ---------------------------------------------------------------------
   * SPELLING — Unit 1, Week 1. Word groups for study, plus a matching
   * practice set. g3 groups by prefix/suffix; g5 groups by Greek/Latin root.
   * ------------------------------------------------------------------- */
  const SPELLING_GROUPS = {
    g3: [
      {title:"Prefixes: un-, re-, pre-", words:["unhappy","rewrite","preview","unfair","replay","preheat"]},
      {title:"Suffixes: -ful, -less, -ness", words:["careful","helpless","kindness","joyful","hopeless","darkness"]},
      {title:"Multisyllabic words", words:["adventure","mountain","different","question","remember","important"]},
      {title:"Irregularly spelled words", words:["because","friend","through","beautiful","island","answer"]}
    ],
    g5: [
      {title:'Greek root "graph" (write)', words:["autograph","paragraph","telegraph","biography","photograph"]},
      {title:'Latin root "spect" (look)', words:["inspect","spectator","respect","spectacle","prospect"]},
      {title:'Latin root "rupt" (break)', words:["interrupt","erupt","disrupt","rupture","bankrupt"]},
      {title:'Latin root "dict" (say)', words:["predict","dictate","verdict","contradict","dictionary"]},
      {title:'Latin root "struct" (build)', words:["construct","instruct","destruction","structure","obstruct"]}
    ]
  };

  // fill-blank items double as the "type the word" drill: the prompt speaks
  // the word (the page's TTS reads `q`'s bracketed word) and the blank is the
  // whole answer. Tier follows the group's rough order: warm-up first two
  // groups, core middle, challenge last group.
  const wordSet = (grade, id, label, title) => {
    const groups = SPELLING_GROUPS[grade];
    const items = [];
    groups.forEach((g,gi)=> g.words.forEach((w,wi)=>{
      const t = gi===0 ? 0 : gi===groups.length-1 ? 2 : 1;
      items.push({id:"la-"+grade+"-sp-"+gi+"-"+wi, type:"fill-blank", t,
        q:"Spell the word: ___  (hint: "+g.title.replace(/\s*\(.*\)/,"")+")", a:[w]});
    }));
    return {id, w:1, label, title, note:"Study the list, then spell each word from the read-aloud.", items};
  };
  const SPELLING = {
    g3: wordSet("g3", "la-g3-w1-spelling", "1.1", "Prefixes, Suffixes, and Tricky Words"),
    g5: wordSet("g5", "la-g5-w1-spelling", "1.1", "Greek and Latin Roots")
  };

  /* ---------------------------------------------------------------------
   * READING COMPREHENSION — two passages per grade, questions auto-graded.
   * ------------------------------------------------------------------- */
  const PASSAGES = {
    g3: [
      {id:"la-g3-samaritan", label:'Literature: "The Traveler Who Stopped"', type:"Literature",
        text:[
          "A man was walking the long, rocky road from Jerusalem to Jericho when robbers attacked him. They took his cloak and his coin purse, beat him, and left him at the roadside, too hurt to stand.",
          "A priest came down the road. He saw the man lying there, crossed to the far side, and walked on without stopping. Soon after, a temple assistant passed by. He, too, looked, then hurried on the other side of the road.",
          "Then a traveler from a distant region came along — a man whose people and the injured man's people did not usually get along. But when he saw the wounded man, he felt sorry for him. He knelt down, cleaned and bandaged the man's wounds, and lifted him onto his own donkey. He led him to an inn, paid for his room, and told the innkeeper, \"Take care of him. If it costs more, I will pay you when I return.\"",
          "The two men who passed by had good reasons to be busy. But the traveler who stopped did not ask what he would get from helping — only who needed him."
        ].join("\n\n"),
        questions:[
          {id:"la-g3-sam-q1", type:"multiple-choice", t:0, q:"What is the central message, or lesson, of this story?", options:["Travel is dangerous.","Being a good neighbor means helping whoever needs you, even a stranger.","Donkeys make good transportation.","Priests are always busy."], a:1},
          {id:"la-g3-sam-q2", type:"multiple-choice", t:0, q:"Why does the passage say the traveler stopped to help?", options:["He was told to by the innkeeper.","He felt sorry for the injured man.","He wanted a reward.","He knew the injured man personally."], a:1},
          {id:"la-g3-sam-q3", type:"multiple-choice", t:1, q:"What explicit detail shows the traveler planned to keep helping after leaving?", options:["He crossed to the other side of the road.","He told the innkeeper he would pay more if needed when he returned.","He took the man's cloak.","He walked on without stopping."], a:1},
          {id:"la-g3-sam-q4", type:"multiple-choice", t:1, q:"How is the traveler's action different from the priest's and the temple assistant's?", options:["He was in a hurry, they were not.","He stopped and helped; they walked past.","He knew the man; they did not.","He was wealthier than they were."], a:1}
        ]},
      {id:"la-g3-carver", label:'Informational: "The Man Who Talked to Peanuts"', type:"Informational",
        text:[
          "George Washington Carver was born into slavery in Missouri in the early 1860s. After slavery ended, he was raised by the family that had once enslaved him, and he grew up with a deep curiosity about plants. Neighbors began calling him \"the plant doctor\" because he could nurse sick plants back to health.",
          "Carver worked hard to get an education at a time when few doors were open to him. He eventually became a teacher and researcher at Tuskegee Institute in Alabama, where he spent decades studying soil and crops.",
          "At the time, many Southern farmers grew only cotton, which wore out the soil year after year. Carver taught farmers to rotate their crops, planting peanuts and sweet potatoes to restore nutrients to the ground. To make sure farmers would have a market for these new crops, he found more than one hundred uses for peanuts alone.",
          "Carver credited his curiosity and his faith with guiding his work. He often said he studied nature to better understand its Creator, and he kept his research notes and his prayers in the same worn notebooks."
        ].join("\n\n"),
        questions:[
          {id:"la-g3-car-q1", type:"multiple-choice", t:0, q:"What is the main idea of this passage?", options:["Peanuts are the tastiest crop.","George Washington Carver used his curiosity and faith to help farmers improve their soil and crops.","Cotton farming was always successful.","Carver invented printer's ink."], a:1},
          {id:"la-g3-car-q2", type:"multiple-choice", t:0, q:"Why did Carver want farmers to grow peanuts and sweet potatoes instead of only cotton?", options:["They sold for a higher price.","They restored nutrients that cotton had worn out of the soil.","They were easier to plant.","Farmers preferred the taste."], a:1},
          {id:"la-g3-car-q3", type:"multiple-choice", t:1, q:"What was the effect of Carver finding many uses for peanuts?", options:["Farmers had a market for the new crop he wanted them to grow.","Cotton became more popular.","Farmers stopped growing crops.","Carver moved away from Tuskegee."], a:0},
          {id:"la-g3-car-q4", type:"multiple-choice", t:2, q:'In this passage, what does "patented" most likely mean?', options:["Watered regularly","Legally claimed ownership of an invention","Sold at a store","Grown in a garden"], a:1}
        ]}
    ],
    g5: [
      {id:"la-g5-boybow", label:'Literature: "The Boy Who Would Not Bow"', type:"Literature",
        text:[
          "In a kingdom far from his home, a boy named Tobias served in the royal court, trained alongside the finest young scholars in the land. He had been taken there as a captive years before, but his skill with numbers and language had earned him a place among the king's advisors-in-training. He had not forgotten who he was, or whose he was.",
          "The king, proud of his growing empire, ordered a towering golden statue built on the plain outside the city. When the royal horns sounded, every official in the kingdom was commanded to bow low before it. \"Whoever refuses,\" the herald announced, \"will be thrown into the furnace before nightfall.\"",
          "The horns sounded. Around Tobias, robes rustled to the ground as officials bowed in rows. Tobias remained standing, his heart pounding.",
          "A court official grabbed his arm. \"Bow, Tobias, or you will die today,\" he hissed. \"No one will know the difference. It is only a statue.\"",
          "\"I cannot bow to what is not God,\" Tobias answered quietly, \"even if I am the only one standing.\" His voice did not rise, but it did not waver either.",
          "He was led toward the furnace at dawn. But those who watched that morning would say later that his face did not look like a man walking toward his death — it looked like a man who had already decided, long before that day, what he would do when the moment came."
        ].join("\n\n"),
        questions:[
          {id:"la-g5-boy-q1", type:"multiple-choice", t:0, q:"Which quotation shows exactly what Tobias said when pressured to bow?", options:['"No one will know the difference."','"I cannot bow to what is not God, even if I am the only one standing."','"Whoever refuses will be thrown into the furnace."','"Bow, Tobias, or you will die today."'], a:1},
          {id:"la-g5-boy-q2", type:"multiple-choice", t:0, q:"Which sentence best states the theme of this passage?", options:["It is dangerous to work for a king.","Staying true to your convictions can require real courage, even when everyone around you disagrees.","Golden statues are impressive to look at.","Officials should always follow orders."], a:1},
          {id:"la-g5-boy-q3", type:"multiple-choice", t:1, q:'The last line says his face "looked like a man who had already decided, long before that day, what he would do." What does this suggest about the narrator\'s point of view?', options:["The narrator thinks Tobias was foolish.","The narrator admires Tobias's steady conviction.","The narrator is unsure how Tobias felt.","The narrator focuses only on the king's feelings."], a:1},
          {id:"la-g5-boy-q4", type:"multiple-choice", t:2, q:'In this passage, what does "waver" most likely mean?', options:["To shake or grow uncertain","To grow louder","To speak a foreign language","To bow down"], a:0}
        ]},
      {id:"la-g5-wilberforce", label:'Informational: "The Long Fight of William Wilberforce"', type:"Informational",
        text:[
          "In 1787, a young member of the British Parliament named William Wilberforce made a decision that would define the rest of his life. A few years earlier, he had experienced a deep renewal of his Christian faith, and he concluded that ending Britain's slave trade was one of the two great tasks God had set before him.",
          "At the time, the slave trade was enormously profitable, and many powerful people in Parliament depended on it for their income. Wilberforce faced fierce opposition for over twenty years. He gathered eyewitness accounts describing the brutal conditions aboard slave ships and reminded his fellow lawmakers that they could no longer claim ignorance once they had heard the evidence for themselves.",
          "Wilberforce introduced bills to abolish the slave trade year after year, and year after year they were defeated. He was mocked in the press and worn down by chronic illness. But he kept building alliances with other reformers and kept bringing the matter back before Parliament.",
          "In 1807, after two decades of effort, Parliament finally passed a law abolishing the slave trade throughout the British Empire. Wilberforce continued working for the complete abolition of slavery itself, and in 1833, just three days before he died, Parliament passed a law that would free enslaved people throughout British territories."
        ].join("\n\n"),
        questions:[
          {id:"la-g5-wil-q1", type:"multiple-choice", t:0, q:"What is the main idea of this passage?", options:["William Wilberforce enjoyed serving in Parliament.","William Wilberforce's faith drove him to fight for over twenty years to end the slave trade, despite fierce opposition.","The slave trade was very profitable in the 1700s.","Parliament quickly agreed to abolish the slave trade."], a:1},
          {id:"la-g5-wil-q2", type:"multiple-choice", t:0, q:"What evidence does the passage say Wilberforce used to support his argument?", options:["Popularity polls","Eyewitness accounts of conditions aboard slave ships","Letters from the king","Predictions about future profits"], a:1},
          {id:"la-g5-wil-q3", type:"multiple-choice", t:1, q:"What is the relationship between the 1807 law and the 1833 law described in the passage?", options:["The 1807 law ended the slave trade; the 1833 law, near the end of his life, freed enslaved people throughout British territories.","The two laws covered the same thing and were passed on the same day.","The 1833 law came first and the 1807 law followed it.","The two laws are unrelated to each other."], a:0},
          {id:"la-g5-wil-q4", type:"multiple-choice", t:2, q:'In this passage, what does "abolish" most likely mean?', options:["To officially end or put a stop to something","To make something more popular","To celebrate something","To study something closely"], a:0}
        ]}
    ]
  };

  /* ---------------------------------------------------------------------
   * HANDWRITTEN ASSIGNMENTS — photographed and model-graded, not typed.
   * `rubric` is what the vision call is told to judge; `prompts` rotates.
   * ------------------------------------------------------------------- */
  const HANDWRITTEN = {
    g3: {
      handwriting: {
        instructions:"Copy the sentence neatly on paper, then photograph the page.",
        rubric:"Judge legibility and letter formation only — not spelling.",
        prompts:["The early bird catches the worm.","Kindness is a language everyone can understand.",
          "Love your neighbor as yourself.","A cheerful heart is good medicine.",
          "The quick brown fox jumps over the lazy dog.","Honesty is always the best policy.",
          "Slow and steady wins the race.","Many hands make light work."]},
      spelling: {
        instructions:"Write each word from this week's list, then use two of them in complete sentences.",
        rubric:"Judge spelling accuracy against the word list for "+"this grade's spelling groups.",
        prompts:["This week's word list"]},
      grammar: {
        instructions:"Write out the sentences on paper, following the instructions.",
        rubric:"Judge whether the sentences follow the instructions and use correct grammar for a 3rd grader.",
        prompts:["Write three sentences about your day: one simple sentence, one compound sentence, and one sentence with an adjective.",
          "Write two sentences using irregular plurals (for example: children, mice, geese, teeth).",
          "Write three sentences, each using a different conjunction: and, but, so.",
          "Write one sentence using a comparative adjective (bigger, faster) and one using a superlative (biggest, fastest)."]},
      reading: {
        instructions:"Write a short paragraph by hand answering the prompt, using evidence from the passage.",
        rubric:"Judge whether the response is on-topic, in the student's own words, and reasonably complete for a 3rd grader. Do not penalize imperfect grammar heavily.",
        prompts:['In 3–4 sentences, describe the lesson "The Traveler Who Stopped" teaches about being a good neighbor.',
          "Write a short paragraph (3–5 sentences) about how George Washington Carver's curiosity and faith worked together in his life.",
          "Write 3–4 sentences describing a time you helped someone the way the traveler helped the injured man."]}
    },
    g5: {
      handwriting: {
        instructions:"Copy the sentence neatly on paper, then photograph the page.",
        rubric:"Judge legibility and letter formation only — not spelling.",
        prompts:["Faith is the substance of things hoped for.","Practice makes progress, not perfection.",
          "To whom much is given, much is required.","A gentle answer turns away wrath.",
          "The pen is mightier than the sword.","Actions speak louder than words.",
          "Where there is no vision, the people perish.","Do not merely listen to the word, but do what it says."]},
      spelling: {
        instructions:"Write each word from this week's list, then use three of them in complete sentences.",
        rubric:"Judge spelling accuracy against this grade's spelling groups.",
        prompts:["This week's word list"]},
      grammar: {
        instructions:"Write out the sentences on paper, following the instructions.",
        rubric:"Judge whether the sentences follow the instructions and use correct grammar for a 5th grader.",
        prompts:["Write three sentences using perfect verb tenses: one present perfect, one past perfect, one future perfect.",
          "Write two sentences using correlative conjunctions (either/or, neither/nor, both/and, not only/but also).",
          "Write a short paragraph (4–5 sentences) using a comma to set off an introductory element and a series of three items.",
          "Write two sentences that each use a different preposition, and one sentence using an interjection."]},
      reading: {
        instructions:"Write a paragraph by hand answering the prompt, using evidence from the text.",
        rubric:"Judge whether the response is on-topic, uses evidence from the text, and is reasonably thorough for a 5th grader. Do not penalize imperfect grammar heavily.",
        prompts:['In 4–5 sentences, explain the theme of "The Boy Who Would Not Bow" and quote one line that supports your answer.',
          "Write a paragraph (5–6 sentences) explaining two reasons Wilberforce gave for opposing the slave trade, using evidence from the passage.",
          "Write a paragraph comparing how Tobias and Wilberforce both faced pressure to go along with what was easy, and how each responded."]}
    }
  };

  /* ---------------------------------------------------------------------
   * BOOK LIST — recommended reading, not graded. Categorized per grade.
   * ------------------------------------------------------------------- */
  const BOOKS = {
    g3: [
      {title:"The Lion, the Witch and the Wardrobe", author:"C.S. Lewis", category:"Read-alouds & family favorites", ageRange:"6–10", blurb:"Sacrifice, redemption, and courage told as adventure, with Aslan's story pointing gently toward the Gospel."},
      {title:"Little Pilgrim's Progress", author:"Helen L. Taylor", category:"Read-alouds & family favorites", ageRange:"7–11", blurb:"A child-friendly retelling of Bunyan's allegory, following Christian's journey to the Celestial City."},
      {title:"The Boxcar Children", author:"Gertrude Chandler Warner", category:"Read-alouds & family favorites", ageRange:"6–10", blurb:"Four siblings rely on resourcefulness, honesty, and looking out for one another."},
      {title:"The Little House series", author:"Laura Ingalls Wilder", category:"Read-alouds & family favorites", ageRange:"7–10", blurb:"Pioneer family life built on hard work, thankfulness, and trust in God through hardship."},
      {title:"The Sugar Creek Gang", author:"Paul Hutchens", category:"Independent chapter books", ageRange:"8–12", blurb:"A group of boys navigate friendship and right-from-wrong with an explicitly Christian worldview."},
      {title:"The Berenstain Bears Big Chapter Books", author:"Stan & Jan Berenstain", category:"Independent chapter books", ageRange:"7–10", blurb:"Simple, values-driven stories about honesty, obedience, and family."},
      {title:"Adventures in Odyssey chapter books", author:"Focus on the Family", category:"Independent chapter books", ageRange:"8–11", blurb:"Character-driven stories tackling everyday choices through a biblical lens."},
      {title:"Christian Heroes: Then & Now series", author:"Janet & Geoff Benge", category:"Faith & character", ageRange:"8–12", blurb:"True missionary biographies (Hudson Taylor, George Müller, and others) showing real courage for faith."},
      {title:"Egermeier's Bible Story Book", author:"Elsie E. Egermeier", category:"Faith & character", ageRange:"7–10", blurb:"A full sweep of Bible narratives retold at a 3rd-grade reading level."},
      {title:"Charlotte's Web", author:"E.B. White", category:"Classic literature", ageRange:"7–11", blurb:"Friendship, sacrifice, and the value of a life well lived."},
      {title:"Understood Betsy", author:"Dorothy Canfield Fisher", category:"Classic literature", ageRange:"8–12", blurb:"A sheltered city girl learns responsibility and confidence on a Vermont farm."}
    ],
    g5: [
      {title:"The Voyage of the Dawn Treader / The Silver Chair", author:"C.S. Lewis", category:"Read-alouds & family favorites", ageRange:"9–13", blurb:"Later Narnia titles leaning into temptation, obedience, and trusting Aslan's word even when it's hard."},
      {title:"The Bronze Bow", author:"Elizabeth George Speare", category:"Read-alouds & family favorites", ageRange:"10–14", blurb:"Newbery winner set in Roman-occupied Judea; a boy consumed by hatred is changed by an encounter with Jesus."},
      {title:"The Swiss Family Robinson", author:"Johann David Wyss", category:"Read-alouds & family favorites", ageRange:"9–13", blurb:"A shipwrecked family survives through resourcefulness and a steady thread of gratitude to God."},
      {title:"The Wingfeather Saga", author:"Andrew Peterson", category:"Independent chapter books", ageRange:"9–13", blurb:"An imaginative fantasy series with real stakes, written by a Christian author whose redemption themes run underneath."},
      {title:"Carry On, Mr. Bowditch", author:"Jean Lee Latham", category:"Independent chapter books", ageRange:"10–13", blurb:"A true story of quiet perseverance and self-teaching against long odds."},
      {title:"Amos Fortune, Free Man", author:"Elizabeth Yates", category:"Independent chapter books", ageRange:"10–14", blurb:"The true story of an African prince sold into slavery who keeps his faith and dignity, then helps others find freedom."},
      {title:"Christian Heroes: Then & Now series", author:"Janet & Geoff Benge", category:"Faith & character", ageRange:"9–13", blurb:"True missionary biographies (Eric Liddell, Gladys Aylward, and others)."},
      {title:"Hinds' Feet on High Places", author:"Hannah Hurnard", category:"Faith & character", ageRange:"10–14", blurb:"An allegory of a fearful young woman's journey toward the High Places with the Shepherd; best for a strong reader."},
      {title:"The Hobbit", author:"J.R.R. Tolkien", category:"Classic literature", ageRange:"10–14", blurb:"A reluctant hero grows into courage and generosity, written by a Christian author with a real sense of providence."},
      {title:"Number the Stars", author:"Lois Lowry", category:"Classic literature", ageRange:"9–12", blurb:"A Danish family risks everything to protect their Jewish neighbors during WWII."},
      {title:"A Wrinkle in Time", author:"Madeleine L'Engle", category:"Classic literature", ageRange:"10–13", blurb:"A science-fantasy adventure by an openly Christian author, where love and light stand against darkness."}
    ]
  };

  window.Subjects.register({
    id: "la",
    name: "Word Voyagers",
    tagline: "Reading · Writing · Words",
    color: "#A78BFA",
    glyph: "A",
    gradient: "linear-gradient(150deg,#A78BFA,#60A5FA)",
    blurb: "Grammar and spelling drills, reading comprehension with real passages, and a daily handwritten assignment graded from a photo — mostly self-led.",
    status: "soon",
    order: 20,
    levels: [
      {id:"g3", label:"3rd Grade", sub:"Year One"},
      {id:"g5", label:"5th Grade", sub:"Year Two"}
    ],
    open: "stub",
    stub: {
      heading: "Word Voyagers is being built.",
      lines: [
        "Unit 1's content is written — grammar, spelling, two reading passages, handwritten assignments and a book list, for both grade tracks.",
        "The page that puts it in front of a child (word-voyagers.dc.html) isn't wired up yet."
      ],
      footer: "Pick Math or the Japan unit for today."
    }
  });

  window.__CURR = window.__CURR || {};
  window.__CURR.LA = {GRAMMAR, SPELLING_GROUPS, SPELLING, PASSAGES, HANDWRITTEN, BOOKS};
})();
