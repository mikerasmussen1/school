/* ============================================================================
 * WORD VOYAGERS — FIND THE MISTAKE
 * ----------------------------------------------------------------------------
 * One wrong sentence a day, in both grades. The child picks the word that is
 * wrong, then sees the sentence put right.
 *
 * WHY PICK THE WORD RATHER THAN NAME THE ERROR. Asking "is this spelling,
 * grammar or punctuation?" tests whether a child knows three labels. Asking
 * WHICH WORD is wrong tests whether he can find it, which is the actual skill
 * and the harder one. The options are always words taken from the sentence
 * itself, so there is nowhere to hide: he has to read it properly.
 *
 * NINETY SENTENCES PER GRADE, EACH SEEN TWICE. 180 school days and 90
 * sentences means every sentence returns once, about eighteen weeks later.
 * That is deliberate rather than a shortcut. Eighteen weeks is far too long to
 * remember an answer, so the second showing is a real test of whether the
 * error type stuck — and error-spotting is a skill built by meeting the same
 * traps again, not by meeting a new one every day and never revisiting it.
 *
 * WHAT THE TWO BANKS COVER
 *   3rd  the errors a third grader actually makes: freind, dont, the boxs,
 *        he runned, missing capitals, missing end punctuation, "me and Jake",
 *        its/it's, their/there, apostrophes in plurals.
 *   5th  the ones that survive into fifth: subject-verb agreement across a
 *        long phrase, fewer/less, affect/effect, who/whom, comma splices,
 *        dangling modifiers, "should of", between/among, principal/principle.
 *
 * THREE KINDS OF FAULT, AND THREE QUESTIONS. "Which word is wrong?" only fits
 * when a word is actually wrong. For a missing comma, no word is wrong at all
 * — asking which one is, teaches a child to look for something that is not
 * there. So an item may carry a kind:
 *
 *   (default)  a word is wrong        "Which word is wrong?"
 *   "add"      punctuation is missing "Which word needs punctuation after it?"
 *   "remove"   punctuation is wrong   "Which word has a mark that should not
 *                                      be there?"
 *
 * The answer for a punctuation item is the word the mark belongs after, or the
 * word carrying the mark that has to go.
 *
 * FORMAT  [sentence, [four words from it], indexOfTheAnswer, corrected, kind?]
 * ==========================================================================*/
(function(){

  const Y1 = [
   ["My freind came over on Saturday.",["freind", "came", "over", "Saturday"],0,"My friend came over on Saturday."],
   ["the dog barked all night.",["the", "dog", "barked", "night"],0,"The dog barked all night."],
   ["She have three brothers.",["She", "have", "three", "brothers"],1,"She has three brothers."],
   ["We went to the store and i bought milk.",["went", "store", "i", "milk"],2,"We went to the store and I bought milk."],
   ["The boxs are on the shelf.",["boxs", "are", "on", "shelf"],0,"The boxes are on the shelf."],
   ["He runned all the way home.",["He", "runned", "way", "home"],1,"He ran all the way home."],
   ["Wheres my coat",["Wheres", "my", "coat", "Where"],0,"Where's my coat?"],
   ["I have alot of homework.",["have", "alot", "of", "homework"],1,"I have a lot of homework."],
   ["The childrens coats are wet.",["The", "childrens", "coats", "wet"],1,"The children's coats are wet."],
   ["My mom said we can go swiming.",["mom", "said", "can", "swiming"],3,"My mom said we can go swimming."],
   ["Theres a bird on the fence.",["Theres", "bird", "on", "fence"],0,"There's a bird on the fence."],
   ["Him and I walked to school.",["Him", "and", "walked", "school"],0,"He and I walked to school."],
   ["We seen the movie last week.",["We", "seen", "movie", "week"],1,"We saw the movie last week."],
   ["The cat licked it's paw.",["cat", "licked", "it's", "paw"],2,"The cat licked its paw."],
   ["I dont know the answer.",["I", "dont", "know", "answer"],1,"I don't know the answer."],
   ["My sister is more taller than me.",["sister", "more", "taller", "me"],1,"My sister is taller than me."],
   ["Can you pass me the salt please",["Can", "pass", "salt", "please"],3,"Can you pass me the salt, please?","add"],
   ["He goed to the library.",["He", "goed", "the", "library"],1,"He went to the library."],
   ["Their going to be late.",["Their", "going", "be", "late"],0,"They're going to be late."],
   ["We ate lunch at noon we then went outside.",["ate", "lunch", "noon", "we"],3,"We ate lunch at noon. Then we went outside."],
   ["The teacher gave the books to Sam and I.",["teacher", "gave", "books", "I"],3,"The teacher gave the books to Sam and me."],
   ["This is the bestest day ever.",["This", "bestest", "day", "ever"],1,"This is the best day ever."],
   ["My brothers bike is broken.",["My", "brothers", "bike", "broken"],1,"My brother's bike is broken."],
   ["She writed a letter to grandma.",["She", "writed", "letter", "grandma"],1,"She wrote a letter to grandma."],
   ["The leafs fell off the tree.",["The", "leafs", "fell", "tree"],1,"The leaves fell off the tree."],
   ["Its raining outside today.",["Its", "raining", "outside", "today"],0,"It's raining outside today."],
   ["We was late for the bus.",["We", "was", "late", "bus"],1,"We were late for the bus."],
   ["I seen a deer in the yard.",["I", "seen", "deer", "yard"],1,"I saw a deer in the yard."],
   ["Ben asked do you want to come with me.",["Ben", "asked", "do", "come"],2,"Ben asked, \"Do you want to come with me?\""],
   ["The mouses ran under the porch.",["The", "mouses", "ran", "porch"],1,"The mice ran under the porch."],
   ["He dont want any dessert.",["He", "dont", "want", "dessert"],1,"He doesn't want any dessert."],
   ["My birthday is in july.",["My", "birthday", "in", "july"],3,"My birthday is in July."],
   ["She is more happier now.",["She", "more", "happier", "now"],1,"She is happier now."],
   ["We buyed apples at the market.",["We", "buyed", "apples", "market"],1,"We bought apples at the market."],
   ["Nobody knowed the answer.",["Nobody", "knowed", "the", "answer"],1,"Nobody knew the answer."],
   ["Your going to love this book.",["Your", "going", "love", "book"],0,"You're going to love this book."],
   ["The wind blowed the door shut.",["wind", "blowed", "door", "shut"],1,"The wind blew the door shut."],
   ["I can't find my shoes anywhere",["can't", "find", "shoes", "anywhere"],3,"I can't find my shoes anywhere.","add"],
   ["We have four sheeps on the farm.",["have", "four", "sheeps", "farm"],2,"We have four sheep on the farm."],
   ["Me and Jake built a fort.",["Me", "and", "built", "fort"],0,"Jake and I built a fort."],
   ["The soup tasted deliciously.",["The", "soup", "tasted", "deliciously"],3,"The soup tasted delicious."],
   ["He layed the book on the table.",["He", "layed", "book", "table"],1,"He laid the book on the table."],
   ["Their are two cats outside.",["Their", "are", "cats", "outside"],0,"There are two cats outside."],
   ["The rabbit hopped quick across the grass.",["rabbit", "hopped", "quick", "grass"],2,"The rabbit hopped quickly across the grass."],
   ["We visited the grand canyon last summer.",["visited", "grand", "canyon", "summer"],1,"We visited the Grand Canyon last summer."],
   ["She dont have her homework.",["She", "dont", "have", "homework"],1,"She doesn't have her homework."],
   ["The two teams was tied.",["two", "teams", "was", "tied"],2,"The two teams were tied."],
   ["I would of come if I had known.",["would", "of", "come", "known"],1,"I would have come if I had known."],
   ["We road our bikes to the park.",["We", "road", "bikes", "park"],1,"We rode our bikes to the park."],
   ["Put the milk in the refrigerater.",["Put", "milk", "in", "refrigerater"],3,"Put the milk in the refrigerator."],
   ["He is the tallest of the two boys.",["He", "tallest", "two", "boys"],1,"He is the taller of the two boys."],
   ["The girls dresses hung in the closet.",["The", "girls", "dresses", "closet"],1,"The girls' dresses hung in the closet."],
   ["My dad and me fixed the fence.",["dad", "me", "fixed", "fence"],1,"My dad and I fixed the fence."],
   ["She sung a song at the concert.",["She", "sung", "song", "concert"],1,"She sang a song at the concert."],
   ["Wich book do you want?",["Wich", "book", "you", "want"],0,"Which book do you want?"],
   ["The baby sleeped all afternoon.",["baby", "sleeped", "all", "afternoon"],1,"The baby slept all afternoon."],
   ["We didnt have enough chairs.",["We", "didnt", "enough", "chairs"],1,"We didn't have enough chairs."],
   ["I like apples oranges and pears.",["like", "apples", "oranges", "pears"],1,"I like apples, oranges and pears.","add"],
   ["The knifes are in the drawer.",["The", "knifes", "are", "drawer"],1,"The knives are in the drawer."],
   ["He throwed the ball over the fence.",["He", "throwed", "ball", "fence"],1,"He threw the ball over the fence."],
   ["Us kids helped clean the yard.",["Us", "kids", "helped", "yard"],0,"We kids helped clean the yard."],
   ["The store is open on mondays.",["store", "open", "on", "mondays"],3,"The store is open on Mondays."],
   ["She catched the ball with one hand.",["She", "catched", "ball", "hand"],1,"She caught the ball with one hand."],
   ["Theres too many people in here.",["Theres", "too", "many", "here"],0,"There are too many people in here."],
   ["My cousin lives in atlanta.",["cousin", "lives", "in", "atlanta"],3,"My cousin lives in Atlanta."],
   ["We done our chores already.",["We", "done", "chores", "already"],1,"We did our chores already."],
   ["The teacher said sit down.",["teacher", "said", "sit", "down"],2,"The teacher said, \"Sit down.\""],
   ["He brang his lunch to school.",["He", "brang", "lunch", "school"],1,"He brought his lunch to school."],
   ["That is a interesting story.",["That", "a", "interesting", "story"],1,"That is an interesting story."],
   ["The dogs tail wagged fast.",["The", "dogs", "tail", "wagged"],1,"The dog's tail wagged fast."],
   ["We seen him at the game yesterday.",["We", "seen", "him", "yesterday"],1,"We saw him at the game yesterday."],
   ["I have wrote three pages.",["I", "have", "wrote", "pages"],2,"I have written three pages."],
   ["Neither of the boys were ready.",["Neither", "boys", "were", "ready"],2,"Neither of the boys was ready."],
   ["She sat quiet through the whole film.",["She", "sat", "quiet", "film"],2,"She sat quietly through the whole film."],
   ["The wether was cold all week.",["The", "wether", "cold", "week"],1,"The weather was cold all week."],
   ["Him and his brother play soccer.",["Him", "his", "brother", "soccer"],0,"He and his brother play soccer."],
   ["We planted flowers in march.",["planted", "flowers", "in", "march"],3,"We planted flowers in March."],
   ["The chair leg was broke.",["chair", "leg", "was", "broke"],3,"The chair leg was broken."],
   ["Their coming over after dinner.",["Their", "coming", "after", "dinner"],0,"They're coming over after dinner."],
   ["I could of finished sooner.",["I", "could", "of", "sooner"],2,"I could have finished sooner."],
   ["The bread was stale so we throwed it out.",["bread", "stale", "so", "throwed"],3,"The bread was stale, so we threw it out."],
   ["Each of the students have a book.",["Each", "students", "have", "book"],2,"Each of the students has a book."],
   ["We walked slow up the hill.",["We", "walked", "slow", "hill"],2,"We walked slowly up the hill."],
   ["She past the ball to her teammate.",["She", "past", "ball", "teammate"],1,"She passed the ball to her teammate."],
   ["The oxes pulled the heavy cart.",["The", "oxes", "pulled", "cart"],1,"The oxen pulled the heavy cart."],
   ["Whos going to help me?",["Whos", "going", "help", "me"],0,"Who's going to help me?"],
   ["He hurted his ankle running.",["He", "hurted", "ankle", "running"],1,"He hurt his ankle running."],
   ["The recipe calls for flour sugar and eggs.",["recipe", "flour", "sugar", "eggs"],1,"The recipe calls for flour, sugar and eggs.","add"],
   ["Me and my sister share a room.",["Me", "my", "sister", "room"],0,"My sister and I share a room."],
   ["We finished the project it took two weeks.",["finished", "project", "it", "weeks"],2,"We finished the project. It took two weeks."]
  ];

  const Y2 = [
   ["The evidence suggest a different conclusion.",["evidence", "suggest", "different", "conclusion"],1,"The evidence suggests a different conclusion."],
   ["Between you and I, the plan is risky.",["Between", "I", "plan", "risky"],1,"Between you and me, the plan is risky."],
   ["The committee have reached a decision.",["committee", "have", "reached", "decision"],1,"The committee has reached a decision."],
   ["He is one of those people who always arrive early.",["one", "those", "who", "arrive"],3,"He is one of those people who always arrives early."],
   ["Running down the hall, the bell rang.",["Running", "hall", "bell", "rang"],0,"As we ran down the hall, the bell rang."],
   ["Their are fewer options than we thought.",["Their", "fewer", "options", "thought"],0,"There are fewer options than we thought."],
   ["The data is inconclusive but promising.",["data", "is", "inconclusive", "promising"],2,"The data is inconclusive, but promising.","add"],
   ["She had less reasons than he did.",["had", "less", "reasons", "did"],1,"She had fewer reasons than he did."],
   ["The study's conclusion were widely quoted.",["study's", "conclusion", "were", "quoted"],2,"The study's conclusion was widely quoted."],
   ["The principle reason was cost.",["principle", "reason", "was", "cost"],0,"The principal reason was cost."],
   ["We should of checked the source first.",["should", "of", "checked", "source"],1,"We should have checked the source first."],
   ["Neither the author nor the editors was available.",["Neither", "author", "editors", "was"],3,"Neither the author nor the editors were available."],
   ["He implied from her tone that she disagreed.",["implied", "from", "tone", "disagreed"],0,"He inferred from her tone that she disagreed."],
   ["The report that was published Tuesday are thorough.",["report", "that", "are", "thorough"],2,"The report that was published Tuesday is thorough."],
   ["Each of the samples were tested twice.",["Each", "samples", "were", "tested"],2,"Each of the samples was tested twice."],
   ["Their is no reason to rush this.",["Their", "no", "reason", "rush"],0,"There is no reason to rush this."],
   ["The teacher asked who's essay this was.",["teacher", "asked", "who's", "essay"],2,"The teacher asked whose essay this was."],
   ["We laid on the grass for an hour.",["We", "laid", "grass", "hour"],1,"We lay on the grass for an hour."],
   ["The affect of the change was immediate.",["The", "affect", "change", "immediate"],1,"The effect of the change was immediate."],
   ["Him and the other researchers disagreed.",["Him", "other", "researchers", "disagreed"],0,"He and the other researchers disagreed."],
   ["She sited three sources in her paper.",["She", "sited", "sources", "paper"],1,"She cited three sources in her paper."],
   ["The results was published last month.",["results", "was", "published", "month"],1,"The results were published last month."],
   ["Having finished the test, the room emptied.",["Having", "finished", "room", "emptied"],2,"Having finished the test, the students left the room."],
   ["Its been raining since Monday.",["Its", "been", "raining", "Monday"],0,"It's been raining since Monday."],
   ["He speaks more clearer than his brother.",["speaks", "more", "clearer", "brother"],2,"He speaks more clearly than his brother."],
   ["The amount of students has grown.",["amount", "of", "students", "grown"],0,"The number of students has grown."],
   ["We only have three days left.",["We", "only", "three", "left"],1,"We have only three days left. (\u201conly\u201d belongs beside what it limits)"],
   ["Their traveling to Boston next week.",["Their", "traveling", "Boston", "week"],0,"They're traveling to Boston next week."],
   ["The witness could not recall who he saw.",["witness", "recall", "who", "saw"],2,"The witness could not recall whom he saw."],
   ["Every one of the books were damaged.",["Every", "books", "were", "damaged"],2,"Every one of the books was damaged."],
   ["She done the research herself.",["She", "done", "research", "herself"],1,"She did the research herself."],
   ["The Senator, and his aides arrived late.",["Senator", "and", "aides", "arrived"],1,"The senator and his aides arrived late."],
   ["I have swam in that lake before.",["have", "swam", "lake", "before"],1,"I have swum in that lake before."],
   ["The problem was less severe then expected.",["problem", "less", "severe", "then"],3,"The problem was less severe than expected."],
   ["Whom is responsible for this decision?",["Whom", "responsible", "this", "decision"],0,"Who is responsible for this decision?"],
   ["We were unable to except the offer.",["unable", "to", "except", "offer"],2,"We were unable to accept the offer."],
   ["The book laying on the desk is mine.",["book", "laying", "desk", "mine"],1,"The book lying on the desk is mine."],
   ["Him and I finished the assignment.",["Him", "and", "finished", "assignment"],0,"He and I finished the assignment."],
   ["The argument was more stronger the second time.",["argument", "more", "stronger", "time"],1,"The argument was stronger the second time."],
   ["She had all ready submitted the form.",["had", "all ready", "submitted", "form"],1,"She had already submitted the form."],
   ["The dog wagged it's tail happily.",["dog", "wagged", "it's", "tail"],2,"The dog wagged its tail happily."],
   ["Neither answer are correct.",["Neither", "answer", "are", "correct"],2,"Neither answer is correct."],
   ["He was excepted into the program.",["He", "excepted", "into", "program"],1,"He was accepted into the program."],
   ["The reason is because the sample was small.",["reason", "is", "because", "sample"],2,"The reason is that the sample was small."],
   ["They divided the work between the four of them.",["divided", "work", "between", "four"],2,"They divided the work among the four of them."],
   ["We seen the results yesterday.",["We", "seen", "results", "yesterday"],1,"We saw the results yesterday."],
   ["The paper cites sources, however it lacks a conclusion.",["cites", "sources", "however", "conclusion"],1,"The paper cites sources; however, it lacks a conclusion.","add"],
   ["Their were several errors in the draft.",["Their", "were", "errors", "draft"],0,"There were several errors in the draft."],
   ["She is taller then her sister.",["She", "taller", "then", "sister"],2,"She is taller than her sister."],
   ["The teams captain gave a speech.",["The", "teams", "captain", "speech"],1,"The team's captain gave a speech."],
   ["Everyone should bring their own notebook.",["Everyone", "bring", "their", "notebook"],2,"Everyone should bring his or her own notebook."],
   ["He layed out the evidence carefully.",["He", "layed", "evidence", "carefully"],1,"He laid out the evidence carefully."],
   ["The two theories differ greatly from each other.",["theories", "differ", "greatly", "other"],2,"The two theories differ greatly."],
   ["We was not informed of the change.",["We", "was", "informed", "change"],1,"We were not informed of the change."],
   ["The affect on morale was obvious.",["The", "affect", "morale", "obvious"],1,"The effect on morale was obvious."],
   ["She asked weather the test was graded.",["asked", "weather", "test", "graded"],1,"She asked whether the test was graded."],
   ["Their is little evidence for that claim.",["Their", "little", "evidence", "claim"],0,"There is little evidence for that claim."],
   ["The scientist, who's work we read, spoke today.",["scientist", "who's", "work", "spoke"],1,"The scientist, whose work we read, spoke today."],
   ["Me and the team presented the findings.",["Me", "team", "presented", "findings"],0,"The team and I presented the findings."],
   ["The passage implies the narrator is unreliable it never says so.",["passage", "implies", "unreliable", "it"],2,"The passage implies the narrator is unreliable; it never says so.","add"],
   ["He rung the bell twice.",["He", "rung", "bell", "twice"],1,"He rang the bell twice."],
   ["Less people attended than last year.",["Less", "people", "attended", "year"],0,"Fewer people attended than last year."],
   ["The conclusion, is supported by the data.",["conclusion", "is", "supported", "data"],0,"The conclusion is supported by the data.","remove"],
   ["We had went there before.",["We", "had", "went", "before"],2,"We had gone there before."],
   ["Its important to check your sources.",["Its", "important", "check", "sources"],0,"It's important to check your sources."],
   ["The author quotes Lincoln, he does not cite the speech.",["author", "quotes", "Lincoln", "he"],3,"The author quotes Lincoln, but he does not cite the speech."],
   ["Each student must submit their essay.",["Each", "student", "submit", "their"],3,"Each student must submit his or her essay."],
   ["She has drank all the water.",["She", "has", "drank", "water"],2,"She has drunk all the water."],
   ["The river is more wider here.",["river", "more", "wider", "here"],1,"The river is wider here."],
   ["Who's book is on the table?",["Who's", "book", "on", "table"],0,"Whose book is on the table?"],
   ["The findings was surprising to everyone.",["findings", "was", "surprising", "everyone"],1,"The findings were surprising to everyone."],
   ["He begun the experiment on Monday.",["He", "begun", "experiment", "Monday"],1,"He began the experiment on Monday."],
   ["We discussed about the results.",["We", "discussed", "about", "results"],2,"We discussed the results."],
   ["The affect of salt on ice is measurable.",["The", "affect", "salt", "measurable"],1,"The effect of salt on ice is measurable."],
   ["Their going to publish the paper.",["Their", "going", "publish", "paper"],0,"They're going to publish the paper."],
   ["Neither of the explanations are complete.",["Neither", "explanations", "are", "complete"],2,"Neither of the explanations is complete."],
   ["The map, and the diagram disagree.",["map", "and", "diagram", "disagree"],0,"The map and the diagram disagree.","remove"],
   ["She could of predicted that outcome.",["She", "could", "of", "outcome"],2,"She could have predicted that outcome."],
   ["The sample was to small to be useful.",["sample", "was", "to", "useful"],2,"The sample was too small to be useful."],
   ["He is the most fastest runner on the team.",["is", "most", "fastest", "team"],1,"He is the fastest runner on the team."],
   ["Us students organised the fundraiser.",["Us", "students", "organised", "fundraiser"],0,"We students organised the fundraiser."],
   ["The evidence do not support that claim.",["evidence", "do", "support", "claim"],1,"The evidence does not support that claim."],
   ["She wrote the essay quick and carefully.",["wrote", "essay", "quick", "carefully"],2,"She wrote the essay quickly and carefully."],
   ["The two accounts differs in one detail.",["two", "accounts", "differs", "detail"],2,"The two accounts differ in one detail."],
   ["We have less options than before.",["have", "less", "options", "before"],1,"We have fewer options than before."],
   ["The passage describe three causes.",["passage", "describe", "three", "causes"],1,"The passage describes three causes."],
   ["Him and his sources were unreliable.",["Him", "his", "sources", "unreliable"],0,"He and his sources were unreliable."],
   ["I should of read the whole chapter.",["I", "should", "of", "chapter"],2,"I should have read the whole chapter."],
   ["Their argument rests on one assumption, it is untested.",["argument", "rests", "assumption", "it"],3,"Their argument rests on one assumption, and it is untested."],
   ["The results speaks for themselves.",["results", "speaks", "for", "themselves"],1,"The results speak for themselves."]
  ];

  const DAYS = ["Mon","Tue","Wed","Thu","Fri"];

  /* Which sentence a given day gets. Deterministic, so a child cannot reroll
   * for an easier one and a parent can look up what was set on any date. */
  function indexFor(week, day){
    const d = DAYS.indexOf(day);
    return ((week-1)*5 + (d<0?0:d));
  }

  function fixFor(grade, week, day){
    const bank = (grade==="y2") ? Y2 : Y1;
    const i = indexFor(week, day);
    const row = bank[i % bank.length];
    const secondTime = i >= bank.length;
    return {
      id: "la-"+grade+"-fix-w"+week+"-"+String(day).toLowerCase(),
      sentence: row[0],
      options: row[1].slice(),
      answer: row[1][row[2]],
      corrected: row[3],
      kind: row[4] || "word",
      prompt: (row[4]==="add")
        ? "Which word needs punctuation after it?"
        : (row[4]==="remove")
        ? "Which word has a punctuation mark that should not be there?"
        : "Which word is wrong?",
      secondTime: secondTime
    };
  }

  /* The auto-graded item, in the same shape every other drill uses. */
  function setFor(grade, week, day){
    const f = fixFor(grade, week, day);
    return {
      id: f.id+"-set",
      title: "Find the mistake",
      items: [{
        id: f.id,
        type: "multiple-choice",
        t: 1,
        /* The sentence is NOT repeated here. The page prints it once, in its
         * own box above the question, and printing it again inside the prompt
         * put the same sentence on screen twice — which reads as though two
         * different sentences are being shown. */
        q: f.prompt,
        options: f.options,
        /* An INDEX, not the word. prepMC resolves it with options[a] before
         * shuffling, so handing it the string made the answer undefined and
         * every attempt scored zero while still ticking the step. */
        a: f.options.indexOf(f.answer),
        hint: (f.kind==="word")
          ? "Read it aloud. The wrong word is the one that makes you stumble."
          : "Read it aloud and listen for where you pause. Punctuation goes where your voice does."
      }]
    };
  }

  /* Stage two: choose the sentence that is written correctly.
   *
   * Finding the fault and repairing it are different abilities. A child can
   * point at "freind" and still not produce "friend". So after he has found
   * the word, he is shown four whole sentences and has to pick the one that is
   * right.
   *
   * THE THREE WRONG ONES ARE BUILT, NOT WRITTEN, and it is worth being plain
   * about what that buys and what it does not. They are:
   *   1. the original, fault intact — always a fair distractor, and the one a
   *      careless reader picks
   *   2. the correction with its end punctuation removed
   *   3. the correction with its first word lowercased
   * Two and three are mechanical. They do not test the specific rule the
   * sentence is about; they test whether he checks capitals and end marks
   * before deciding a sentence is right, which is a real habit and the one
   * third graders most often skip. Hand-written distractors aimed at the
   * specific rule would be better and would take 540 authored sentences. */
  function lower1(t){ return t.charAt(0).toLowerCase() + t.slice(1); }
  function upper1(t){ return t.charAt(0).toUpperCase() + t.slice(1); }
  function stripEnd(t){ return t.replace(/[.?!]+$/, ""); }

  function choicesFor(grade, week, day){
    const f = fixFor(grade, week, day);
    const right = f.corrected;
    const out = [right];
    const add = (t) => {
      if(t && t!==right && out.indexOf(t)<0) out.push(t);
    };
    /* Generators are tried in order until four DISTINCT sentences exist.
     * They collide more often than you would expect: when the fault is the
     * missing capital, the lowercased correction IS the original, so a naive
     * list of three produced only two wrong answers and a three-option
     * question. The extras below exist to cover exactly that. */
    add(f.sentence);                      // the fault left in
    add(stripEnd(right));                 // no end mark
    add(lower1(right));                   // no opening capital
    add(stripEnd(lower1(right)));         // neither
    add(lower1(f.sentence));              // fault left in, no capital either
    add(stripEnd(f.sentence));            // fault left in, no end mark
    add(right.replace(/\.$/, "?"));       // wrong end mark
    add(right.replace(/,/, ""));          // a comma dropped
    return {answer: right, options: out.slice(0,4)};
  }

  function repairSetFor(grade, week, day){
    const f = fixFor(grade, week, day);
    const c = choicesFor(grade, week, day);
    return {
      id: f.id+"-repair",
      title: "Now put it right",
      items: [{
        id: f.id+"-r",
        type: "multiple-choice",
        t: 2,
        q: "Which sentence is written correctly?",
        options: c.options,
        a: c.options.indexOf(c.answer),
        hint: "Check the capital at the start and the mark at the end, not only the word you found."
      }]
    };
  }

  /* Both stages as one drill: find the word, then choose the repair. */
  function drillFor(grade, week, day){
    return {
      id: fixFor(grade, week, day).id+"-drill",
      title: "Find the mistake",
      items: setFor(grade, week, day).items.concat(repairSetFor(grade, week, day).items)
    };
  }

  function count(grade){ return ((grade==="y2")?Y2:Y1).length; }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_FIX = {Y1, Y2, DAYS, indexFor, fixFor, setFor, choicesFor, repairSetFor, drillFor, count};
})();
