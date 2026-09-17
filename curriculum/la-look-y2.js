/* ============================================================================
 * WORD VOYAGERS 5TH GRADE — "LOOK FOR THIS WHILE YOU READ"
 * ----------------------------------------------------------------------------
 * The close-reading panel tells the child what to hunt for BEFORE the passage.
 * The old bullets were the same every week and said what to notice without
 * showing how. A teacher would give the steps and then model them on the page
 * in front of the class, so each lesson now has:
 *
 *   1-2  two clear steps for that lesson's purpose (the same every week, so
 *        they become a routine)
 *   3    a worked example from THIS week's passage: a quotation, word for
 *        word, and what a careful reader does with it
 *
 * The five purposes match la-close-reading.js (Y2):
 *   Mon  stated and unstated        Thu  how the passage is built
 *   Tue  the writer's word choices  Fri  theme, and the case against it
 *   Wed  the strongest evidence
 *
 * THE EXAMPLE NEVER GIVES AWAY THE CHALLENGE. Every quotation is chosen from
 * outside that lesson's two challenge sentences (la-challenge.js), so modelling
 * the skill does not hand over the A-or-B answer. tests/look-for-y2.js checks
 * that, and that every quotation appears verbatim in the week's passage.
 * ==========================================================================*/
(function(){

  const STEPS = {
    Mon: ["As you read, sort what you learn into two piles: what the passage STATES outright, and what you only INFER (work out yourself from clues).",
          "To test one, ask: can I point to words that say this exactly? If yes, it is stated. If you had to put clues together, it is an inference."],
    Tue: ["Find a word or phrase where the writer could have used a plainer one.",
          "Ask two questions: what plainer word would do the same job, and what does the writer's choice add — a picture, a feeling, or a judgement?"],
    Wed: ["First, say to yourself in one sentence what the passage is arguing or showing.",
          "Then hunt for the line that proves it best. Ask: if someone disagreed, which line would be hardest for them to argue with?"],
    Thu: ["Notice the order: what the writer tells you first, and what is saved for later.",
          "Find the turn — the sentence after which the passage starts doing something different — and ask why it comes there and not earlier."],
    Fri: ["Work out what the passage says about life or people, not just what happens in it. Put it in one sentence of your own.",
          "Then test your idea: find one detail that does not fit neatly, and ask what it adds."]
  };

  // week: { day: [quotation, what a careful reader does with it] }
  const EX = {
    1: {
      Mon: ["He pushed the page across the table.", "STATED: Anselm pushes the page back to the boy. INFERRED: he wants it done again — this sentence never says so; you work it out from the push and what he says next."],
      Tue: ["he smoothed it", "A plainer word is “changed.” “Smoothed” makes the change sound gentle and helpful, which is exactly how the boy saw it — and why it was dangerous."],
      Wed: ["He will build an argument on them.", "If the passage is showing that changing a text misleads readers, this line proves it well: it names a real harm to a real reader, not just a rule."],
      Thu: ["The boy was quiet.", "Before this line the boy is sure he is right; after it, he begins to understand. The writer puts the silence here so the lesson can land before Anselm explains it."],
      Fri: ["Every clumsy word.", "A possible theme: honest copying matters more than improving someone's words. What complicates it: Anselm admits the words ARE clumsy — the boy's version may really have been better. Honesty wins anyway."]
    },
    2: {
      Mon: ["Then they can open the bubbles and measure precisely how much carbon dioxide the air held at any given depth.", "STATED: scientists can measure the carbon dioxide in very old air. INFERRED: that tells us what the climate was like long ago — you can work that out, but this sentence does not say it."],
      Tue: ["it traps things", "A plainer word is “holds.” “Traps” makes the snow sound as if it is catching evidence on purpose, which helps you picture the ice as a record."],
      Wed: ["those bubbles survive unchanged for hundreds of thousands of years", "If the passage is arguing that ice cores are trustworthy records, this is strong evidence: it explains WHY the old air can still be measured today."],
      Thu: ["Within them, researchers found something striking", "Up to here the passage explains how ice cores work. From “something striking” on, it proves they can be trusted. The proof is saved for the end so it lands last."],
      Fri: ["they can count its annual layers much as one counts tree rings", "A possible theme: the strongest evidence is the kind nobody has to guess at. What complicates it: someone still has to count the layers, and counting can go wrong."]
    },
    3: {
      Mon: ["The vote was postponed one week.", "STATED: the vote was delayed. INFERRED: Delia's father made people unsure — the passage never says he changed minds; you work it out from the delay."],
      Tue: ["sentiment was no substitute for steel", "A plainer way to say it is “feelings don't matter.” Voss's phrase sounds strong and makes people who love the old bridge seem silly — the words are doing the arguing."],
      Wed: ["The engineer's letter says within twenty-two years, and only if the county stops maintenance.", "If the passage shows that Voss's numbers cannot be trusted, this is the strongest line: it compares his claim with a written document anyone can check."],
      Thu: ["I counted.", "The opening sets up Voss's confident speech. The turn is “I counted.” — from here the passage stops describing and starts checking facts. Two words carry the whole shift."],
      Fri: ["He knew it.", "A possible theme: careful facts can beat a smooth speech. What complicates it: the passage never says who was right about the bridge — Delia's father wins a delay, not the argument."]
    },
    4: {
      Mon: ["Researchers who study reading comprehension have found that summarizing ability predicts later academic performance better than reading speed does.", "STATED: summarizing predicts school success better than reading speed. INFERRED: practising summaries is worth your time — the passage never tells you to, but you can work it out."],
      Tue: ["they will hand back the first three sentences, shortened", "A plainer version is “they will write a short copy.” “Hand back” and “shortened” make the student sound as if they did not really think — the words gently poke fun."],
      Wed: ["A student who did not really follow an argument can still recognize its vocabulary, and can still answer a detail question by scanning back.", "If the passage is arguing that summaries show real understanding, this is strong evidence: it shows what a student CAN fake, which proves what cannot be faked."],
      Thu: ["There is also a difference between summarizing and paraphrasing that trips people up.", "Before this sentence the passage explains why summaries are hard. After it, the passage turns to a new problem. The last line then ties both together."],
      Fri: ["which means holding the whole thing in mind at once and then judging what can be cut without damage", "A possible theme: understanding shows in what you choose to keep. What complicates it: “judging” means two good readers might keep different things."]
    },
    5: {
      Mon: ["Her son had left for the capital at nineteen, during the troubles, and had written twice in the first year and not again.", "STATED: her son stopped writing after the first year. INFERRED: something may have happened to him — the passage never says he died; you put that together from the silence."],
      Tue: ["lost the path", "A plainer phrase is “got lost.” “Lost the path” — and then “found their own doors” — makes the lamp sound like a guide home, just what she hoped it would be for her son."],
      Wed: ["The lamp was so that if he came back at night, down the long road from the junction, he would see which house was still his.", "If the passage shows that the lamp meant hope, this is the strongest line: it gives her exact reason, not just the fact that she lit it."],
      Thu: ["Then a young woman named Chidi, who had been one of the children who grew up navigating by it, began putting a lamp in her own window.", "Before this sentence the lamp belongs to Mrs. Okonkwo. After it, the lamp belongs to the village. Chidi is held back until after the death so the lamp does not end with her."],
      Fri: ["and the village argued about the lamp for a week", "A possible theme: a private act of love can end up helping everyone. What complicates it: the village argued for a week — not everyone agreed the lamp should go on."]
    },
    6: {
      Mon: ["Tobias ran for the equipment.", "STATED: Tobias went to save the machines. INFERRED: he is the brother who thinks in numbers — this sentence shows it; the passage only explains it months later."],
      Tue: ["jointly and badly", "A plainer word is “together.” Adding “and badly” turns a fact into a judgement: in two words you learn the brothers could not work as a team."],
      Wed: ["Rafe ran for the Halvorsen place downstream, where an old woman lived alone with no telephone.", "If the passage shows Rafe put a person before property, this is strong evidence: it gives WHY he ran — she was alone and could not call for help."],
      Thu: ["It was Tobias walking down to Rafe's kitchen in February", "The passage turns when Tobias walks to Rafe's kitchen. Before it, the brothers are split by their choices; after it, they start to understand each other. Waiting until February shows change takes time."],
      Fri: ["because it was the decision he could measure", "A possible theme: being honest about how you chose can mend a relationship. What complicates it: Tobias's choice was not simply wrong — the passage never says who chose better."]
    },
    7: {
      Mon: ["A book that once cost a year's wages could be had for a few days'.", "STATED: books became far cheaper. INFERRED: many more ordinary people could now own books — the passage lets you work that out without saying it."],
      Tue: ["the entire machinery of shared scholarship", "A plainer phrase is “all the ways scholars share work.” Calling it “machinery” makes footnotes and indexes sound like parts of a machine that only runs if every part matches."],
      Wed: ["Suddenly a scholar in Basel could write that a claim appeared on page 214, and a scholar in Bologna could turn to page 214 and find it.", "If the passage argues identical copies mattered most, this is the strongest evidence: a real example you can picture — two cities, one page number, the same words."],
      Thu: ["When every copy was hand-made, every copy differed.", "The passage starts with the usual story, cheaper and faster. From here it explains the change most people miss. The surprise comes second so it can correct the first."],
      Fri: ["Scholarly argument across distance was nearly impossible, because nobody could cite a page number that would mean anything to anyone else.", "A possible theme: the most important change is not always the most obvious one. What complicates it: this problem mattered mostly to scholars \u2014 for most readers, cheaper books may have been the bigger change."]
    },
    8: {
      Mon: ["Psychologists call it the Zeigarnik effect, after a researcher who noticed in the 1920s that waiters remembered unpaid orders in detail and forgot them almost immediately after payment.", "STATED: waiters forgot orders once they were paid. INFERRED: readers keep thinking about a chapter that has not finished — the passage links the two but lets you make the jump."],
      Tue: ["lands like a hammer stroke", "A plainer word is “stands out.” “Lands like a hammer stroke” makes you feel the short chapter hit you — the very effect it describes."],
      Wed: ["The reader closes the book but does not close the question, and the unresolved tension does the author's work overnight.", "If the passage shows that chapter endings shape readers, this is strong evidence: it shows the effect working on a real reader even after the book is shut."],
      Thu: ["In each case, the reader is being given instructions about how to weight what they just read", "The passage moves from novels, to chapters, to poems and plays. At “In each case” it stops giving examples and gathers them into one idea, ready for the last line."],
      Fri: ["exploits this directly", "A possible theme: the shape of writing guides what we pay attention to. What complicates it: “exploits” suggests writers can hold us whether or not the story deserves it."]
    },
    9: {
      Mon: ["His letter is one page and mentions his own experience of the storm in a single clause", "STATED: Brandt barely mentions himself. INFERRED: he thought his job was to report facts, not feelings — you work that out from what he left out."],
      Tue: ["the schoolteacher roped the children together to walk them home", "The writer could have said “helped the children home.” “Roped together” makes you picture how dangerous the storm was without being told."],
      Wed: ["and the difference in what they recorded is not a disagreement — it is the reason historians want both", "If the passage argues both letters are needed, this is the strongest line: it answers the obvious objection — that the letters disagree — head on."],
      Thu: ["A reader wanting to know how cold it was should use Brandt.", "The first paragraphs describe each letter. At this sentence the passage turns from describing them to judging how to use them, and saves its biggest idea for the end."],
      Fri: ["having been myself delayed some hours", "A possible theme: two honest records can show different truths. What complicates it: Brandt's tiny mention of his own delay hints that facts-only writing can hide a real human experience."]
    },
    10: {
      Mon: ["May 18, 8:32 a.m.: an earthquake triggers the largest landslide in recorded history, which uncorks the mountain sideways.", "STATED: an earthquake caused a huge landslide. INFERRED: the landslide released the pressure all at once — the word “uncorks” lets you work that out."],
      Tue: ["uncorks the mountain sideways", "A plainer word is “opens.” “Uncorks” makes you picture a bottle under pressure suddenly released — it explains the blast in one word."],
      Wed: ["If you are reading chronologically and want mechanism, you will be frustrated", "If the passage argues that structure should match your question, this is strong evidence: it shows exactly what goes wrong when they do not match."],
      Thu: ["It opens with plate tectonics", "The passage describes one book, then the other, then compares them. It turns when the second book begins: the same facts, rebuilt from the cause up."],
      Fri: ["not because the book is bad, but because you are asking it a question it was not built to answer", "A possible theme: choose writing that fits your question. What complicates it: sometimes you do not know your question yet, so you cannot know which book to pick."]
    },
    11: {
      Mon: ["The surveyor counted households registered for tax", "STATED: he counted only households that paid tax. INFERRED: people outside the tax records were invisible to him — the passage lets you see that before it says so."],
      Tue: ["a market that never appeared in any tax record", "The writer could have said “trade the surveyor missed.” “Never appeared in any tax record” makes the weaving sound hidden but real — the whole point."],
      Wed: ["The schoolmaster counted everyone who slept in the valley in a given month, because that was who he might have to teach.", "If the passage shows that a definition decides what a record can see, this is strong evidence: it gives the schoolmaster's REASON for his rule, not just his number."],
      Thu: ["He classified industry by what people spent their hours doing", "The passage first sets up two numbers, then explains each observer's rules. The turn is the move from WHAT they recorded to WHY, so you puzzle before you understand."],
      Fri: ["most people wove — for their own households, for barter within the valley", "A possible theme: every record is shaped by the question behind it. What complicates it: even the ledger could not count weaving done for free at home."]
    },
    12: {
      Mon: ["He described the driver's face in detail", "STATED: Wilkes described the driver's face. INFERRED: he could not really have seen it, because he was behind the cart — the passage leaves you to put those facts together."],
      Tue: ["an accurate map of their own uncertainty", "A plainer phrase is “honest about what they didn't see.” Calling it a “map” makes uncertainty sound like something you can draw clearly — and use."],
      Wed: ["not because she was necessarily the most honest, but because she was the only one who had clearly marked the boundary of what she could see", "If the passage argues that honest limits matter more than certainty, this is strong evidence: the foreman gives his exact reason and rules out the easy one."],
      Thu: ["He also said, in the last line of his statement, that he had been thinking about his daughter's fever and could not now recall whether he had actually called out or only intended to.", "The three statements build up, and this last line turns the driver's confident account into a doubtful one. It sits at the end of his statement, just where he put it."],
      Fri: ["who had been on the loading platform above", "A possible theme: honest uncertainty makes a better witness. What complicates it: Oyelaran also had the best view — maybe her position, not only her honesty, made her useful."]
    },
    13: {
      Mon: ["Her aunt wrote that she had written a nearly identical letter eleven years earlier, to Junia's mother, and had never sent it.", "STATED: the aunt once wrote to Junia's mother and never sent it. INFERRED: Junia's mother might have come north, if asked — the passage never says so."],
      Tue: ["What she had not expected was the last paragraph.", "A plainer version is “The last paragraph surprised her.” Starting with “What she had not expected” makes you wait for the surprise, the way Junia did."],
      Wed: ["She had thought she was leaving.", "If the passage shows the letter changed how Junia understood her move, this is strong evidence: it states her old understanding just before the new one."],
      Thu: ["But something else had.", "Up to here the story is about a decision already made. At “But something else had.” it turns from what Junia DID to what she now UNDERSTANDS."],
      Fri: ["that there was room, that the work was hard, that she should come", "A possible theme: a kind word left unsaid can matter for years. What complicates it: the letter says the work is hard — the invitation is honest, not simply warm."]
    },
    14: {
      Mon: ["By the time a ship had crossed the Atlantic, an error of a few minutes had become an error of dozens of miles.", "STATED: a small time error became a big distance error. INFERRED: ships could miss land or hit rocks — the passage lets you work out the danger."],
      Tue: ["a watch about five inches across", "The writer could have said “a small clock.” Giving the size in inches makes you see how tiny the answer was compared with forty-three years of work."],
      Wed: ["Longitude requires knowing what time it is somewhere else.", "If the passage argues a clock solved longitude, this is strong evidence: it explains exactly why a clock, not a star chart, was the answer."],
      Thu: ["His fourth attempt, finished in 1759", "The passage spends four paragraphs on the problem before the answer arrives. Holding back the finished watch makes the forty-three years feel long."],
      Fri: ["which anyone with a sextant can measure", "A possible theme: the best solutions make hard problems simple. What complicates it: making longitude simple took one man forty-three years of very clever work."]
    },
    15: {
      Mon: ["He was not a skilled woodworker and had to learn, badly and slowly, things his grandfather could have shown him in an afternoon.", "STATED: Elias learned slowly. INFERRED: he regrets not learning from his grandfather while he could — the passage never uses the word “regret.”"],
      Tue: ["the boat sat under a tarp for nineteen years", "The writer could have said “the boat was left.” “Sat under a tarp” makes the boat sound patient, as if it were waiting for him."],
      Wed: ["Several times he did a thing wrong, undid it, and did it again.", "If the passage argues a late promise is still worth keeping, this is strong evidence: it shows Elias keeping it the hard way, not just meaning to."],
      Thu: ["What finally brought him home for good was ordinary — a job ending, a lease expiring.", "Before this line the promise is broken by time. After it, the story turns to keeping it. The reason is ordinary so the change feels real, not heroic."],
      Fri: ["He made the promise at sixteen, standing in a workshop that smelled of cedar, and he meant it entirely.", "A possible theme: late is better than never. What complicates it: he meant it entirely and still let nineteen years pass — meaning it was not enough."]
    },
    16: {
      Mon: ["In 1999, NASA lost a spacecraft because two engineering teams had used different units.", "STATED: two teams used different units. INFERRED: the teams were not checking each other's work — you work that out; this sentence does not say it."],
      Tue: ["a small error you have learned to live with", "A plainer phrase is “a small error you ignore.” “Learned to live with” makes it sound comfortable and familiar — which is exactly why it was dangerous."],
      Wed: ["and the discrepancies had been reviewed, and no one had traced them to their cause", "If the passage argues the error survived because people stopped investigating, this is strong evidence: the problem WAS noticed and reviewed, and still missed."],
      Thu: ["The investigation found that software built by one contractor had produced thruster values in pound-seconds, while the navigation software expected newton-seconds.", "The passage first tells the crash, then turns at the investigation to the cause — and then turns again to the real lesson."],
      Fri: ["ground controllers fired its engines to place it in orbit", "A possible theme: small problems you get used to can become disasters. What complicates it: the long flight went right — the team was mostly doing excellent work."]
    },
    17: {
      Mon: ["You wait for a bus but wait on a customer.", "STATED: we say “wait for” a bus and “wait on” a customer. INFERRED: the small word changes what “wait” means — the passage lets you notice it yourself."],
      Tue: ["you have no picture at all", "The writer could have said “the meaning is unclear.” Talking about a “picture” helps you SEE what a preposition does."],
      Wed: ["Consider the difference between a decision made with the committee and a decision made for the committee and a decision made by the committee.", "If the passage argues prepositions carry real meaning, this is strong evidence: change one small word and who holds the power changes."],
      Thu: ["Some prepositions carry more meaning than whole clauses.", "The passage first shows prepositions making pictures, then why they are hard. At this sentence it turns to its biggest claim — tiny words can carry power."],
      Fri: ["You are in a car but on a train.", "A possible theme: choose small words carefully. What complicates it: there is no logic to choose with here — sometimes you can only learn the word, not reason it out."]
    },
    18: {
      Mon: ["It was one syllable, spoken by a woman in the third row who had not been called as a witness and had no formal part in the proceedings.", "STATED: she was not a witness. INFERRED: nobody expected her to matter — which makes what happens next a surprise."],
      Tue: ["Textbooks treat it as a scrap.", "A plainer word is “unimportant.” “Scrap” makes an interjection sound like a leftover bit of paper — so it is more surprising when it wins the case."],
      Wed: ["and that the date read aloud was the date of the fire", "If the passage shows the man could not have written the letter, this is strong evidence: a second event on the same date places him somewhere else."],
      Thu: ["And yet a single syllable, correctly timed, had just done something no argument in the room had managed", "The passage pauses the story to explain grammar, then turns back at “And yet” to show the grammar lesson working in real life."],
      Fri: ["it had communicated recognition", "A possible theme: small honest reactions can matter more than arguments. What complicates it: the “Oh” only showed recognition — it still took her explanation and a check of the letter."]
    },
    19: {
      Mon: ["is not, and never was, an official motto of the United States Postal Service", "STATED: it is not an official motto. INFERRED: many people must think it is — otherwise the writer would not need to say so."],
      Tue: ["insists neither is subordinate", "A plainer word than “insists” is “shows.” “Insists” makes the grammar sound as if it is arguing on the writer's behalf."],
      Wed: ["Not only... but also builds an escalation.", "If the passage argues that sentence patterns create emphasis, this is strong evidence: a second pattern with its own effect shows the idea works beyond one motto."],
      Thu: ["What makes the line memorable is partly its grammar.", "The first paragraphs are history — where the line came from. At this sentence the passage turns to grammar, its real subject."],
      Fri: ["not because the meaning is unclear but because the halves do not match", "A possible theme: the shape of a sentence carries meaning. What complicates it: a sentence can break the rule and still be clear — the rule is about style, not being understood."]
    },
    20: {
      Mon: ["The drivers argued it covered only \"packing for shipment or distribution,\" a single activity, which they did not do.", "STATED: the drivers said they did not pack for shipment. INFERRED: if the court agreed, they were owed overtime — you work out what was at stake."],
      Tue: ["Most of the time that ambiguity is harmless and nobody notices.", "The writer could have said “does not matter.” “Harmless” makes the missing comma sound like a sleeping danger — fine until it is not."],
      Wed: ["The dairy company argued the exemption covered distribution", "If the passage argues one comma decided a real case, this is strong evidence: both sides read the SAME words differently, so the problem was real."],
      Thu: ["Maine law exempted from overtime pay workers involved in", "The passage opens with the result, then goes back to the exact words of the law. Starting with the verdict makes you curious how a comma could matter."],
      Fri: ["not by adding the comma, but by rewriting the list with semicolons", "A possible theme: tiny marks can decide big questions. What complicates it: Maine chose a clearer structure, not one mark — the fix was about clear writing."]
    },
    21: {
      Mon: ["An introductory element is anything that comes before a sentence's main clause, and English asks you to mark where it ends.", "STATED: the introduction to a sentence gets marked. INFERRED: readers need help finding where the main idea starts — the next paragraph explains why."],
      Tue: ["cause a stumble", "A plainer word is “confusion.” “Stumble” makes reading sound like walking — which matches the picture of a garden path."],
      Wed: ["\"While the family was eating the dog wandered in.\"", "If the passage argues commas prevent misreading, this is strong evidence: it lets you FEEL the misreading yourself, not just be told about it."],
      Thu: ["Transition words — however, therefore, nevertheless, moreover — take a comma too, and for the same reason.", "The passage adds one kind of introduction at a time: clauses, then phrases, then transition words. Only after all of them does it turn to the reason behind the rule."],
      Fri: ["They orient the reader to how this sentence relates to the last one before the sentence itself begins.", "A possible theme: punctuation is a courtesy to the reader. What complicates it: this sentence shows commas also do logic — showing how ideas connect — not only politeness."]
    },
    22: {
      Mon: ["At dinner, if someone said \"me and Jonah went,\" she would repeat the sentence back correctly, mildly, as though continuing the conversation, and everyone would carry on.", "STATED: she corrected people's grammar at dinner. INFERRED: she did it kindly, not to embarrass anyone — “mildly” lets you work that out."],
      Tue: ["an apology for the love itself", "The writer could have said “it sounds sad.” “An apology for the love itself” tells you exactly WHY it is sad, in six words."],
      Wed: ["Her grandmother stared at that one a long time.", "If the passage shows the notes brought them closer, this is strong evidence: the note clearly mattered to her, without the writer naming her feeling."],
      Thu: ["She never asked which Nadia had meant.", "The notes build from funny to sad. The turn comes after the second note: the grandmother stops correcting and accepts that some meanings can stay open."],
      Fri: ["Nadia knew exactly what she was doing", "A possible theme: small marks change meaning, sometimes movingly. What complicates it: Nadia left the marks out on purpose — leaving them out was its own kind of skill."]
    },
    23: {
      Mon: ["A magazine is a container; an article is its content.", "STATED: a magazine holds articles. INFERRED: so a magazine's name gets italics and an article's name gets quotation marks — you apply the rule yourself."],
      Tue: ["The mark survived into handwriting because it always meant the same thing.", "A plainer word than “survived” is “stayed.” “Survived” makes the underline sound as if it lived through a big change — from print shops to handwriting."],
      Wed: ["In quotation marks, it refers to the single track that shares its name.", "If the passage argues the marks tell readers exactly what you mean, this is strong evidence: the same words mean two things, and only the mark tells them apart."],
      Thu: ["This is why the same title can be marked differently depending on what you mean.", "The first paragraph gives the rule and the second gives examples. This sentence turns to WHY the rule matters in real reading."],
      Fri: ["the underline was the typesetter's instruction to set that text in italics", "A possible theme: marks exist to make meaning exact. What complicates it: the underline began as a note to a printer, not a message to readers — some rules are just history."]
    },
    24: {
      Mon: ["His own example, which he showed every year, was a paragraph about his father that he had rewritten forty times over eleven years.", "STATED: he rewrote one paragraph forty times. INFERRED: that paragraph mattered deeply to him — it was about his father."],
      Tue: ["made him locally famous", "The writer could have said “known in town.” “Locally famous” is gently funny — famous, but only nearby — and shows the assignment was talked about."],
      Wed: ["Between forty and twenty, students had to start cutting things they liked.", "If the passage argues that cutting teaches judgement, this is strong evidence: it pinpoints the moment the task stops being easy."],
      Thu: ["The hard part came later.", "Up to here, cutting is easy — removing wasted words. At “The hard part came later.” the passage turns to the real lesson: cutting things that are good."],
      Fri: ["He said he was sure that writing the other twenty-eight had taught him what the two sentences meant.", "A possible theme: shorter writing is better writing. What complicates it: Adeyemi was not sure the shortest version was best — what he gained was understanding."]
    },
    25: {
      Mon: ["This means that a student who learns a few hundred roots and affixes acquires a tool that generates meaning for tens of thousands of words they have never encountered.", "STATED: a few hundred roots unlock tens of thousands of words. INFERRED: learning roots grows your vocabulary much faster than learning words one at a time."],
      Tue: ["acquires a tool", "A plainer word is “learns.” Calling roots “a tool” makes them something you can pick up and USE on a word you have never seen."],
      Wed: ["A student without morphological knowledge, meeting an unknown word, has two options: skip it or look it up.", "If the passage argues roots let you read on your own, this is strong evidence: it sets up two poor options, so the third — reasoning it out — clearly wins."],
      Thu: ["This is not merely a vocabulary trick.", "The passage first explains how roots work. At this sentence it turns to a bigger claim: roots change what a reader can do alone."],
      Fri: ["produce a reasonable guess", "A possible theme: some knowledge keeps producing more knowledge. What complicates it: roots give a guess, not a certain answer — you still check it against the sentence."]
    },
    26: {
      Mon: ["\"Nice\" descends from the Latin nescius, meaning ignorant.", "STATED: “nice” comes from a word meaning ignorant. INFERRED: a word can travel very far from where it started — the passage shows the journey step by step."],
      Tue: ["A word's meaning is a record of how a community has actually used it, and communities change.", "The writer could have said “meaning comes from use.” Calling meaning “a record” makes words sound like history you can read."],
      Wed: ["A reader who encounters \"awful majesty\" in an eighteenth-century sermon and imports the modern sense will misread the sentence completely", "If the passage argues drift can fool readers of old texts, this is strong evidence: a real phrase from a real kind of old text shows the mistake happening."],
      Thu: ["This matters for reading older texts.", "The passage first gives words that flipped their meaning. At this sentence it turns to why YOU should care: reading old writing."],
      Fri: ["and will not know they have, because the sentence still parses", "A possible theme: read old words carefully. What complicates it: the passage says drift is normal — the problem is the reader's assumption, not the language."]
    },
    27: {
      Mon: ["Add dis- and you get disestablishment, the act of removing that institution's official status.", "STATED: “dis-” turns establishment into removing it. INFERRED: “dis-” often means undoing something — test it on words you know, like “disagree.”"],
      Tue: ["Strip it apart.", "A plainer phrase is “Break it down.” “Strip it apart” sounds hands-on, like taking an engine to pieces — matching the machine idea in the title."],
      Wed: ["It is long only because six operations were stacked.", "If the passage argues long words are built rather than mysterious, this is strong evidence: it gives the exact reason for the length, and the reason is simple."],
      Thu: ["Add -ment and it becomes a noun", "The passage builds the word one layer at a time, in order, like the machine in its title. The step-by-step order IS the lesson."],
      Fri: ["A reader who knows each piece can disassemble a word they have never seen and reassemble its meaning", "A possible theme: hard things become manageable when you take them apart. What complicates it: it only works if you know each piece first."]
    },
    28: {
      Mon: ["The sentence had a man sitting, and people sit on riverbanks.", "STATED: people sit on riverbanks. INFERRED: that is why most students would pick “riverbank” without thinking — you work out the trap."],
      Tue: ["a flaw in the sentence rather than a subtlety in it", "A plainer version is “badly written, not clever.” Choosing “flaw” over “subtlety” shows Amara picking words as carefully as the test should have."],
      Wed: ["that the sentence did not contain enough information, and that a well-written passage would have supplied it", "If the passage shows the test sentence was unclear, this is strong evidence: Amara names exactly what was missing, not just that it felt hard."],
      Thu: ["What she eventually wrote in the margin, and what her teacher later read aloud to the class, was this", "The passage first shows Amara stuck. At this sentence it turns from her struggle to her answer — and her answer is about the question itself."],
      Fri: ["that the ambiguity was probably deliberate on the test-writer's part", "A possible theme: good thinkers question the question. What complicates it: a trick question can be deliberate and still unfair — Amara calls it a flaw anyway."]
    },
    29: {
      Mon: ["Researchers who study language have documented how deeply this runs.", "STATED: researchers have studied this. INFERRED: the writer's claim is backed by evidence, not just opinion — “documented” lets you work that out."],
      Tue: ["It is doing the thinking.", "The writer could have said “it shapes our ideas.” “Doing the thinking” is bolder — it makes the metaphor sound like it is working inside your head."],
      Wed: ["a long meeting, a short wait, the week ahead, looking back", "If the passage argues metaphors shape thought, this is strong evidence: everyday phrases you use yourself, so you can check the claim in your own speech."],
      Thu: ["And it is why a badly chosen one causes lasting confusion.", "The passage praises metaphor for most of its length. At “And it is why a badly chosen one” it turns to the danger, so it ends on a warning."],
      Fri: ["A metaphor is often explained as a decoration — a fancier way of saying something plain.", "A possible theme: metaphors do real thinking, so choose them carefully. What complicates it: many people see them as decoration — and sometimes a metaphor is just that."]
    },
    30: {
      Mon: ["Grandmother Yusuf had a proverb for everything, and her grandson Ibrahim had spent a year collecting the contradictions.", "STATED: Ibrahim collected contradictions for a year. INFERRED: he was trying to win an argument with her — a year of collecting tells you so."],
      Tue: ["He who hesitates is lost is for people who are about to stall.", "A plainer word than “stall” is “wait.” “Stall” sounds like an engine stopping — it shows hesitating as a breakdown, not a rest."],
      Wed: ["A proverb claims something narrower and more useful: that in a certain kind of situation, a certain danger is common and easy to miss.", "If the passage argues proverbs are advice, not laws, this is strong evidence: it defines exactly what a proverb promises, so two opposites can both be true."],
      Thu: ["She explained it this way.", "The first half is Ibrahim's case. At “She explained it this way.” the passage turns to her answer — and his argument becomes her lesson."],
      Fri: ["Absence makes the heart grow fonder — but out of sight, out of mind.", "A possible theme: wisdom is choosing the right advice for today. What complicates it: for this pair it is hard to say who each proverb is for."]
    },
    31: {
      Mon: ["Thrifty and stingy both describe a person reluctant to spend.", "STATED: both words describe someone who dislikes spending. INFERRED: the difference must be about opinion, not facts — the passage explains that next."],
      Tue: ["why writers who claim to be reporting are sometimes arguing", "A plainer phrase is “writers are biased.” “Claim to be reporting” and “arguing” show the trick: pretending to describe while persuading."],
      Wed: ["A crowd can be described as a gathering, an assembly, a mob, or a throng.", "If the passage argues word choice can judge people, this is strong evidence: four real choices for one scene, so you can feel which one accuses the crowd."],
      Thu: ["Careful readers learn to notice this.", "The passage explains how words carry attitudes, then turns at this sentence from explaining to telling YOU what to do about it."],
      Fri: ["Linguists separate two layers here.", "A possible theme: notice the attitude hidden in word choice. What complicates it: even a plain word carries some attitude — no description is perfectly neutral."]
    },
    32: {
      Mon: ["By twenty-five he could move between them without thinking, and had come to regard the first as something to be hidden.", "STATED: he hid the way he spoke at home. INFERRED: he had been made to feel his family's speech was wrong — you work out where the shame came from."],
      Tue: ["a dialect with rules as consistent as any other", "The writer could have said “a real way of speaking.” “Rules as consistent as any other” makes the point with evidence, not just kindness."],
      Wed: ["That is a fact about the society, not about the dialect.", "If the passage argues dialects are not broken, this is strong evidence: it separates how a language is judged from how it actually works."],
      Thu: ["He came to a position he still holds.", "The passage moves from shame, to a new idea, to struggle. At this sentence it turns to where Marcus ends up, so it closes on a settled view."],
      Fri: ["He had built a career on the second variety and had been told his whole life that it was the right one.", "A possible theme: new skills add to who you are rather than replace it. What complicates it: his success really did depend on formal English."]
    },
    33: {
      Mon: ["The first is a sleep researcher's study finding that adolescent circadian rhythms shift roughly two hours later at puberty, and that later start times correlate with improved attendance and test scores.", "STATED: later start times go with better attendance and scores. INFERRED: tired students do worse early in the day — the study suggests it, but this sentence does not say it."],
      Tue: ["That is not fence-sitting.", "A plainer phrase is “not avoiding a decision.” “Fence-sitting” paints someone refusing to climb down on either side."],
      Wed: ["The third addresses whether one community currently wants it.", "If the passage argues the sources answer different questions, this is strong evidence: the survey is about opinions, not sleep or cost, so it cannot really disagree with the study."],
      Thu: ["The second addresses what one specific implementation would cost.", "The passage lists three sources, then two weak ways to use them, then the strong way. Saving the best move for last lets you compare it with the weak ones."],
      Fri: ["because buses currently run three staggered routes", "A possible theme: careful researchers ask what question each source answers. What complicates it: a real decision still has to weigh cost against sleep."]
    },
    34: {
      Mon: ["In 2011, a graduate student checking citations in a widely cited psychology paper found that one of its central claims traced back to nothing.", "STATED: a student found a claim with no real source. INFERRED: many experts had used it without checking — “widely cited” lets you work that out."],
      Tue: ["The practice has a name: citation laundering.", "The writer could have said “citation copying.” “Laundering” borrows from money laundering — making something suspicious look clean."],
      Wed: ["The failure was that nobody followed the chain to its origin.", "If the passage argues nobody checked the chain, this is strong evidence: it names the exact failure after ruling out fraud."],
      Thu: ["This is the practical reason scholarship demands source lists rather than assertions.", "The passage tells the story of the chain, then turns at this sentence from the story to the lesson for anyone who writes."],
      Fri: ["Each author cited a real source that really said what they claimed.", "A possible theme: always trace a claim back to where it started. What complicates it: every author did the normal, honest thing — the system, not one person, let it spread."]
    },
    35: {
      Mon: ["For the first month, Teodora found it maddening.", "STATED: she hated the rule at first. INFERRED: her feelings changed later — “for the first month” hints at that before the passage tells you."],
      Tue: ["A straw man is an argument built to be knocked down.", "A plainer phrase is “a weak version of an argument.” A straw man is a scarecrow — easy to knock over and not a real person, just like the fake argument."],
      Wed: ["she often found that the version she had planned to attack was not the version anyone actually held", "If the passage argues steelmanning improves your thinking, this is strong evidence: it shows what Teodora discovered herself, not just what the coach said."],
      Thu: ["The change came slowly.", "The passage starts with the rule and Teodora hating it. At “The change came slowly.” it turns to what she learned; the coach's words come after, to explain it."],
      Fri: ["You had a preference.", "A possible theme: take the other side seriously. What complicates it: Teodora lost more rounds that year — thinking better did not mean winning more."]
    },
    36: {
      Mon: ["When you have spent three weeks with a topic, its structure feels obvious.", "STATED: the structure feels obvious to the speaker. INFERRED: it is NOT obvious to the audience — you can work out the gap before the passage explains it."],
      Tue: ["Nervous speakers accelerate", "A plainer word is “speed up.” “Accelerate” sounds like a car, which fits the idea of losing control on familiar ground."],
      Wed: ["Everything a listener understands, they must understand in the sequence you deliver it, at the speed you deliver it.", "If the passage argues listeners need more help than readers, this is strong evidence: it names exactly what a listener cannot do that a reader can."],
      Thu: ["It is that the speaker knows the material too well.", "The passage opens with a surprise — the problem is knowing too much — and every piece of advice after it follows from that first turn."],
      Fri: ["Repetition that would be tiresome on the page is often exactly right aloud.", "A possible theme: good speakers serve their listeners. What complicates it: the repetition that helps a listener would bore a reader — the right choice depends on the audience."]
    }
  };

  /* The three bullets for one lesson: two steps, then the worked example. */
  function lookFor(week, day){
    const steps = STEPS[day];
    const ex = (EX[week] || {})[day];
    if(!steps) return null;
    const out = steps.slice();
    if(ex) out.push("Example from this passage: “" + ex[0] + "” — " + ex[1]);
    return out;
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_LOOK_Y2 = {STEPS, EX, lookFor};
})();
