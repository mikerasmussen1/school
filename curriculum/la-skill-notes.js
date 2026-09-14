/* ============================================================================
 * WORD VOYAGERS — WHAT THE WEEK'S SKILL ACTUALLY IS
 * ----------------------------------------------------------------------------
 * The skill step used to show a title and a standard code and nothing else:
 * "Quoting Exactly / Standard RL.5.1". The step tells the child to read the
 * skill name and the note under it, and there was no note — a code from a
 * state document is not an explanation, and a ten year old cannot learn
 * anything from it.
 *
 * Each week now carries a short teaching note and one concrete example. Both
 * grades, all 36 weeks.
 *
 * TWO RULES THESE FOLLOW.
 *
 * Say the rule, then show it. An example does more work than a second sentence
 * of explanation, which is why every entry has one and none has three
 * sentences of prose.
 *
 * Name the trap where there is one. Its/it's, fewer/less, paraphrasing that is
 * really copying, a tense that slips mid-sentence — the note says what goes
 * wrong, because that is what the child is about to do.
 *
 * FORMAT  week: [teaching note, example]
 * ==========================================================================*/
(function(){

  const Y1 = {
   1:["A noun names a person, a place, a thing or an idea. If you can put \"the\" in front of it, it is usually a noun.","the shepherd, the river, courage"],
   2:["A verb is what the subject does or is. Every complete sentence has one.","The dog barked. She is tall."],
   3:["A complete sentence needs a subject (who or what) and a verb (what it does), and it must make sense on its own.","\"The boy ran.\" is complete. \"Running fast.\" is not."],
   4:["A pronoun stands in for a noun you have already named, so you do not have to repeat it.","Caleb fed the hens. He counted the eggs."],
   5:["Most nouns add -s to mean more than one. Words ending in s, x, ch or sh add -es.","one box, two boxes"],
   6:["Some plurals change the word instead of adding -s. These have to be learned, not worked out.","one mouse, two mice; one leaf, two leaves"],
   7:["An abstract noun names something real that you cannot touch or see.","courage, honesty, freedom"],
   8:["A singular subject takes a singular verb; a plural subject takes a plural verb.","The dog runs. The dogs run."],
   9:["An adjective describes a noun \u2014 what kind, which one, how many.","the brown dog, three coins, an ancient wall"],
   10:["An adverb tells how, when or where something happened. Many end in -ly.","She sang quietly. He left early."],
   11:["To compare exactly two things, add -er to a short adjective.","Her rope is longer than mine."],
   12:["To compare three or more, add -est, or use \"most\" for longer words.","the longest rope; the most careful worker"],
   13:["And, but, or, so join two equal parts. Put a comma before one joining two complete sentences.","He worked hard, but he finished late."],
   14:["Because, when, if, although make one part depend on the other. That part cannot stand alone.","Because it rained, we stayed in."],
   15:["A compound sentence joins two complete sentences with a joining word and a comma.","The bell rang, and the class stood up."],
   16:["A complex sentence joins a complete idea to one that cannot stand alone.","When the bell rang, the class stood up."],
   17:["Capitalise the first, last and every important word in a title. Leave small joining words lowercase.","The Wind in the Willows"],
   18:["Put a comma between the street and the town, and between the town and the state.","Savannah, Georgia"],
   19:["A comma separates what was said from who said it.","\"Come inside,\" she said."],
   20:["Quotation marks go around the exact words a person spoke, and nothing else.","He said, \"I will be there.\""],
   21:["One owner takes an apostrophe and then an s. The apostrophe goes before the s when a single person owns the thing.","the boy's coat"],
   22:["More than one owner already ending in s takes the apostrophe after the s.","the boys' coats"],
   23:["A pronoun must match the noun it stands for, in number.","The team lost its game. The players lost their game."],
   24:["Its means belonging to it. It's is short for it is. The apostrophe is the missing letter, never ownership.","It's raining. The dog wagged its tail."],
   25:["Un- means not. Re- means again. Pre- means before.","unhappy, rebuild, preheat"],
   26:["Dis- and mis- and non- all reverse or spoil the meaning.","disagree, misspell, nonsense"],
   27:["-ful means full of. -less means without. -ness makes it a thing.","hopeful, hopeless, kindness"],
   28:["When a word is new, the sentence around it usually tells you enough. Read the whole sentence before you guess.","\"The badger was tenacious \u2014 it would not let go.\""],
   29:["Literal means the words mean exactly what they say. Nonliteral means they do not.","\"It is raining\" is literal. \"It is raining cats and dogs\" is not."],
   30:["An idiom is a phrase whose meaning you cannot work out from its words. You have to learn it.","over the moon means very happy"],
   31:["A simile compares using like or as. A metaphor says one thing IS another.","as quiet as a mouse; the wind was a hammer"],
   32:["Words that mean nearly the same thing can be stronger or weaker. Choose the one that fits.","warm, hot, scalding"],
   33:["A note is in your own words. If you copy the words, put quotation marks around them and say where they came from.","Source said: \"the river is 400 miles long.\""],
   34:["Sort what you find into what supports your point and what does not. Keep both.","for: it rained all week. against: the field was still dry."],
   35:["A paragraph makes one point, gives evidence for it, and then says what the evidence shows.","point, evidence, so what"],
   36:["When you present, say your claim first, then your evidence, then your claim again in different words.","Say it, show it, say it again"]
  };

  const Y2 = {
   1:["Quoting exactly means copying a writer's words without changing one of them \u2014 not the wording, not the punctuation. If you change anything, it is no longer a quotation.","He wrote \"a word fitly spoken\", not \"a word spoken fitly\"."],
   2:["Explicit means the text says it outright. An inference is what you work out from what it says. Both must be grounded in the words.","Explicit: he wore the same coat daily. Inference: he had little money."],
   3:["Evidence is the specific line that supports your claim. A claim without a line behind it is only an opinion.","Claim: he was loyal. Evidence: \"He counted the eggs on the fifth day.\""],
   4:["A summary states the main idea in your own words. If you are lifting phrases, you are copying, not summarising.","Not \"eleven minutes\" but \"he did the chore even when tempted not to\"."],
   5:["A theme is what the story says about life, not what happens in it. Say it as a sentence, not a word.","Not \"courage\" but \"courage costs something when nobody is watching\"."],
   6:["Characters reveal themselves by what they do when it is difficult, not by what they say about themselves.","Maya stood up when the room was going the other way."],
   7:["Summarising a whole text means finding the one idea that runs through all of it, not listing each part.","Ask: if I could keep one sentence, which would it be?"],
   8:["Look at how a text is built \u2014 order, sections, what comes first \u2014 because the shape carries meaning.","A writer who saves a fact for last wants it to land hard."],
   9:["Compare two characters by what they do in the same situation, not by describing each separately.","Orpah went back; Ruth stayed. Same moment, opposite choice."],
   10:["Informational texts are organised by cause and effect, comparison, sequence or problem and solution. Naming the structure helps you find the point.","\"Why Bees Dance\" is problem then solution."],
   11:["When two accounts describe the same event differently, the difference is the evidence. Ask what each writer could see.","A soldier's letter and a general's report of one battle."],
   12:["Point of view is who is telling it and what they can know. A narrator inside the story cannot see everything.","First person: I, we. Third person: he, she, they."],
   13:["Present perfect uses have or has plus the past participle, for something finished but still relevant now.","I have written three pages."],
   14:["Past perfect uses had plus the participle, for what happened before something else in the past.","He had left before we arrived."],
   15:["Future perfect uses will have plus the participle, for what will be finished by a point ahead.","By June we will have read thirty-six passages."],
   16:["Keep one tense unless the time genuinely changes. A tense that slips mid-sentence confuses the reader.","Wrong: He walked in and sits down."],
   17:["A preposition shows where, when or how something stands in relation to something else.","under the porch, before dawn, with care"],
   18:["Conjunctions join. Interjections interrupt, and take a comma or an exclamation mark.","and, but, so; Well, that changes things."],
   19:["Correlative conjunctions come in pairs and both halves must match in form.","either...or, neither...nor, not only...but also"],
   20:["Use a comma between items in a list of three or more.","flour, sugar and eggs"],
   21:["A phrase that opens a sentence before the subject is followed by a comma.","On Monday, we left early."],
   22:["Set off the name of the person you are addressing, and a question tagged on the end, with commas.","Caleb, come here. That is right, isn't it?"],
   23:["Italicise or underline long works; put short works in quotation marks.","the book Hatchet; the poem \"Sea Fever\""],
   24:["Combining short sentences shows how ideas relate. Expanding one adds the detail a reader needs.","Two facts joined by \"because\" say more than two facts."],
   25:["Greek roots build many English words. Knowing one unlocks words you have never met.","tele = far off; graph = writing; telegraph"],
   26:["Latin roots do the same, and are especially common in formal and scientific words.","port = carry; transport, export, portable"],
   27:["A prefix changes meaning at the front; a suffix changes the job the word does at the end.","un- + help + -ful"],
   28:["Many words carry more than one meaning. The sentence around them decides which one is meant.","bank of a river; bank that holds money"],
   29:["A simile compares with like or as; a metaphor states the comparison outright. Both make an abstract idea concrete.","The argument was a wall."],
   30:["Idioms, adages and proverbs carry meanings their words do not state. They must be learned, and they date.","A stitch in time saves nine."],
   31:["Synonyms mean nearly the same, antonyms the opposite, homographs are spelled alike but differ in meaning.","lead the team; a lead pipe"],
   32:["Register is how formal your language is. Dialect is the variety a speaker uses. Both are choices, and both suit some situations and not others.","You would not write a letter the way you text."],
   33:["When you use several sources, note where each fact came from as you go. Doing it afterwards never works.","Two sources agreeing is worth more than one."],
   34:["Paraphrase means rewriting in your own words AND saying where it came from. Changing a few words is still copying.","Reword it fully, then name the source."],
   35:["An opinion piece states a position, supports it with evidence, and answers the strongest argument against it.","Say what someone who disagreed would argue."],
   36:["When you present, state the claim, give the evidence in order, and finish by saying what it adds up to.","Claim, evidence, so what."]
  };

  function noteFor(grade, week){
    const bank = (grade==="y2") ? Y2 : Y1;
    const row = bank[week] || bank[1];
    return {teach: row[0], example: row[1]};
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_SKILL_NOTES = {Y1, Y2, noteFor};
})();
