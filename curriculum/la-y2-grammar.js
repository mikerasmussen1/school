/* ============================================================================
 * WORD VOYAGERS — YEAR TWO GRAMMAR (36 weekly drills)
 * ----------------------------------------------------------------------------
 * Six items a week: two Warm-Up, three Core, one Challenge.
 * Tuple format: [tier, prompt, [options], correctIndex, hint]
 * Ids permanent: `la-y2-gr-w<week>-<i>`.
 *
 * Weeks 1–12 drill READING skills (quoting, inference, theme, point of view)
 * rather than sentence grammar, because at fifth grade those are what the
 * standards weight most heavily and they need the same daily repetition
 * a grammar rule does. Weeks 13–32 are conventions and vocabulary;
 * 33–36 are research and argument.
 * ==========================================================================*/
(function(){

  const G = {

  /* ---- Unit 1 · Say It Exactly --------------------------------------- */
  1:[
   [0,'When you quote a text, you should copy the words:',["approximately","exactly, word for word","in your own words","only the important ones"],1,"A quotation is a promise that these were the actual words."],
   [0,'Which punctuation marks show you are quoting exactly?',["parentheses","quotation marks","brackets","a dash"],1,"They fence off someone else's words from your own."],
   [1,'The text reads: "The road was long and bitterly cold." Which is an accurate quotation?',['The author says the road was "long and bitterly cold."','The author says the road was "very long and cold."','The author says it was "a long, cold road."','The author says the road was "bitter."'],0,"Only one option reproduces the words in the order they appear."],
   [1,'Why is it wrong to change a word inside quotation marks?',["it looks untidy","it claims someone said something they did not","it makes the sentence longer","there is no reason"],1,"You are putting words in their mouth."],
   [1,'If you need to leave words out of the middle of a quotation, you use:',["a comma","an ellipsis (...)","a semicolon","nothing"],1,"It signals to the reader that something was skipped."],
   [2,'Which sentence both quotes accurately AND explains the quotation?',['The author writes that the road was "long and bitterly cold," which suggests the journey exhausted them.','The road was long and cold.','The author says "long and bitterly cold."','The journey was probably hard.'],0,"A strong sentence gives the evidence and then what it shows."]],

  2:[
   [0,'An inference is:',["a direct quotation","a conclusion drawn from evidence in the text","a wild guess","the title"],1,"You reason from what the text gives you."],
   [0,'Which of these is stated EXPLICITLY if a text says "Maria slammed the door"?',["Maria was angry","Maria slammed the door","Maria had a bad day","Maria was tired"],1,"Explicit means it is right there in the words."],
   [1,'"Maria slammed the door and did not speak at dinner." A reasonable inference is that Maria:',["was hungry","was upset about something","liked the meal","had homework"],1,"Two details point the same direction."],
   [1,'What makes an inference reasonable rather than a guess?',["it feels right","it is supported by details in the text","it is interesting","the teacher agrees"],1,"Evidence is the difference."],
   [1,'A text says a character "checked the lock three times before bed." You could reasonably infer the character:',["is a locksmith","is anxious or cautious","is going on a trip","dislikes bedtime"],1,"Repeated checking suggests a state of mind."],
   [2,'Which response best supports an inference?',['She was nervous, because the text says she "checked the lock three times."',"She was nervous.","I think she was nervous about something.","The text is about a nervous person."],0,"Claim plus quoted evidence."]],

  3:[
   [0,'Evidence in an essay means:',["your opinion","facts or quotations that support your claim","the introduction","a summary"],1,"It is what backs the claim up."],
   [0,'An author supports a point most strongly with:',["repetition","specific reasons and evidence","a loud tone","a long sentence"],1,"Assertion is not support."],
   [1,'A writer claims recycling saves energy. Which sentence is evidence?',["Recycling is very important.","Recycling aluminum uses 95% less energy than making it new.","Everyone should recycle.","Recycling is the right thing to do."],1,"Only one gives a checkable fact."],
   [1,'Which sentence is a CLAIM rather than evidence?',["The survey included 400 students.","Ninety percent chose the second option.","School should start later in the morning.","The study ran for six weeks."],2,"A claim is a position someone could disagree with."],
   [1,'If two reasons support different points in an essay, a good reader should:',["ignore the weaker one","identify which reason supports which point","combine them","skip both"],1,"The standard asks you to match reasons to points."],
   [2,'An author writes: "Later start times improve test scores. A 2019 study of 9,000 students found scores rose 4%." The second sentence is:',["a second claim","evidence supporting the first sentence","an opinion","a conclusion"],1,"It gives data backing the assertion before it."]],

  4:[
   [0,'To paraphrase means to:',["copy exactly","restate in your own words","summarize in one word","quote"],1,"Same meaning, different words."],
   [0,'A summary should be:',["longer than the original","about the same length","shorter, covering the main points","only the first paragraph"],2,"You are condensing."],
   [1,'Which is a proper paraphrase of "The storm destroyed nearly every home along the coast"?',['The storm "destroyed nearly every home" on the coast.',"Almost all coastal houses were ruined by the storm.","The storm destroyed nearly all homes along the coast.","A storm happened."],1,"Changed wording AND sentence structure, same meaning."],
   [1,'Changing only two or three words of a sentence and calling it your own is:',["good paraphrasing","still too close to the original","a summary","a quotation"],1,"Real paraphrase rewrites the structure, not just some words."],
   [1,'Do you need to credit a source when you paraphrase?',["no, the words are yours","yes, the idea is still theirs","only if you quote","only for books"],1,"The idea belongs to them even in your words."],
   [2,'Which belongs in a summary of an article about bee decline?',["The author has a nice writing style.","Bee populations have fallen sharply, likely from pesticides and habitat loss.","I have seen bees in my yard.","Bees are interesting insects."],1,"Main idea plus the key supporting reasons."]],

  /* ---- Unit 2 · The Shape of a Story --------------------------------- */
  5:[
   [0,'A theme is:',["what happens in the story","the underlying message or idea","the main character","the setting"],1,"Plot is what happens; theme is what it means."],
   [0,'Which is a theme rather than a plot summary?',["A boy loses his dog and finds it.","Loyalty is worth the cost.","The dog ran away on Tuesday.","They lived on a farm."],1,"A theme is a statement about life."],
   [1,'How do you find a theme?',["read the title","look at repeated details and how the character changes","ask a friend","read the last line only"],1,"Themes emerge from patterns across the whole text."],
   [1,'A character starts selfish and ends generous after losing something. A likely theme is:',["farms are hard work","loss can teach us what matters","dogs are loyal","winter is cold"],1,"Track what the change teaches."],
   [1,'Can one story have more than one theme?',["no, only one","yes, longer texts often carry several","only in poems","only in nonfiction"],1,"Rich texts do more than one thing."],
   [2,'Which best states a theme with evidence?',['Courage often costs something; the narrator "walked in knowing he might lose everything."',"The story is about courage.","Courage is good.","He was very brave in this story."],0,"Theme statement anchored to a quotation."]],

  6:[
   [0,'When we ask how a character "responds to a challenge," we mean:',["what they look like","what they do and how they change","where they live","who wrote the story"],1,"Action under pressure reveals character."],
   [0,'A character trait is:',["a single action","a quality the character consistently shows","the setting","a quotation"],1,"Traits show up more than once."],
   [1,'Which evidence best shows a character is determined?',['She "tried the door a fourth time" after three failures.',"She was determined.","She had brown hair.","She lived nearby."],0,"Show, do not tell."],
   [1,'A character says one thing but does another. A careful reader should:',["believe the words","notice the gap and ask what it reveals","ignore it","assume a mistake"],1,"The gap is usually the point."],
   [1,'How characters respond to the same event differently mostly reveals:',["the setting","their different values or fears","the author's age","the genre"],1,"Same pressure, different reactions."],
   [2,'Which sentence compares two characters using specific detail?',['Ruth stayed while Orpah "wept, kissed her, and went," showing two different kinds of love.',"Ruth and Orpah were different.","Ruth was better than Orpah.","Both women were sad."],0,"Comparison plus quoted detail."]],

  7:[
   [0,'A good summary includes:',["every detail","the main events in order","only the ending","your opinion"],1,"Main points, in sequence."],
   [0,'A summary should leave out:',["the main conflict","the resolution","minor details and your own opinions","the main characters"],2,"Keep it to what carries the text."],
   [1,'A summary of a nonfiction text should be organized around:',["the order you read it","the main ideas and their support","the longest paragraph","the pictures"],1,"Structure it by idea, not by page."],
   [1,'How many main ideas can an informational text have?',["always one","two or more, each with supporting details","as many as paragraphs","none"],1,"The fifth grade standard says two or more."],
   [1,'Which sentence would NOT belong in a summary?',["The author argues bees are declining.","Two causes are named: pesticides and habitat loss.","I really like honey.","The article closes with three proposed solutions."],2,"Personal reaction is not summary."],
   [2,'Which is the strongest one-sentence summary?',["The article is about bees.","Bee populations are falling sharply, mainly from pesticides and habitat loss, and the author proposes three remedies.","Bees are important insects that make honey.","The author cares about bees a lot."],1,"Main idea plus key support, compressed."]],

  8:[
   [0,'Chapters, scenes and stanzas are:',["decorations","the structural parts that build a whole text","summaries","titles"],1,"They are how a text is put together."],
   [0,'A stanza is a unit of:',["a novel","a poem","a play","an essay"],1,"Poems are built from stanzas."],
   [1,'Why might an author end a chapter on an unresolved moment?',["to save paper","to create tension that pulls you forward","by accident","to end the book"],1,"Structure creates suspense."],
   [1,'In a play, a scene change usually signals:',["the end","a shift in time or place","a new author","a summary"],1,"Scenes mark movement."],
   [1,'The first chapter of a novel most often does what?',["resolves the conflict","establishes characters, setting and the problem","summarizes","lists sources"],1,"It sets up what follows."],
   [2,'How does a final stanza that repeats the first stanza affect a poem?',["it wastes space","it frames the poem and can show what has or has not changed","it confuses readers","it means the poet forgot"],1,"Repetition with a shift is a structural move."]],

  /* ---- Unit 3 · Two Accounts ----------------------------------------- */
  9:[
   [0,'To compare means to look at:',["only differences","similarities","only one thing","the title"],1,"Compare is alike; contrast is different."],
   [0,'To contrast means to look at:',["similarities","differences","the author","the length"],1,"Contrast highlights what separates them."],
   [1,'A strong comparison of two characters uses:',["general impressions","specific details from the text about each","only one character","the cover art"],1,"Detail on both sides."],
   [1,'Two characters face the same loss; one grows bitter, one grows kind. This contrast most likely reveals:',["the setting","that response, not circumstance, shapes character","the author's age","the genre"],1,"Same input, different output points at the person."],
   [1,'Which sentence contrasts two settings with evidence?',['The city was "loud at every hour," while the farm was "quiet enough to hear the fence tick."',"The city and farm were different places.","One was better than the other.","Both had people living there."],0,"Quoted detail on each side."],
   [2,'When comparing two stories in the same genre, you should focus on:',["which is longer","how each approaches similar themes","the covers","the publication dates"],1,"That is exactly what the standard asks."]],

  10:[
   [0,'The "structure" of a text means:',["its length","how its information is organized","its cover","its vocabulary"],1,"Organization, not content."],
   [0,'Which is a common informational text structure?',["cause and effect","alphabetical","random","rhyming"],0,"Others include compare/contrast, sequence, problem/solution."],
   [1,'A text that explains what happened first, next and last uses which structure?',["compare and contrast","chronological sequence","problem and solution","description"],1,"Time order."],
   [1,'Two articles cover the same topic; one uses problem/solution and one uses chronology. This means:',["one is wrong","they organize the same information differently for different purposes","they are identical","one is fiction"],1,"Structure serves purpose."],
   [1,'Headings and subheadings help a reader by:',["filling space","signaling how the information is grouped","adding length","looking nice"],1,"They reveal the structure."],
   [2,'Why would an author choose problem/solution structure over chronology?',["it is shorter","to emphasize what should be done rather than what happened","it is easier","there is no reason"],1,"Structure carries argument."]],

  11:[
   [0,'Two accounts of the same event may differ because:',["one person is always lying","people notice and emphasize different things","events change","one is fiction"],1,"Perspective shapes the account."],
   [0,'A firsthand account is written by:',["a researcher later","someone who was there","a novelist","an editor"],1,"They experienced it directly."],
   [1,'A secondhand account has the advantage of:',["being more emotional","drawing on multiple sources and hindsight","being shorter","being always right"],1,"Distance can add perspective."],
   [1,'If two reliable accounts disagree on a detail, a careful reader should:',["pick the one they like","note the difference and look for more evidence","discard both","assume both are lies"],1,"Difference is data, not a verdict."],
   [1,'Two accounts agreeing on a detail makes that detail:',["definitely false","more likely accurate","irrelevant","an opinion"],1,"Independent confirmation strengthens it."],
   [2,'A soldier and a general describe one battle. The most likely difference is:',["the date","the level of detail and what each thought mattered","the country","the outcome"],1,"Position shapes what you see and value."]],

  12:[
   [0,'Point of view in a story means:',["the setting","who is telling it and how they see events","the theme","the length"],1,"Whose eyes are you looking through?"],
   [0,'A first-person narrator uses:',["he and she","I and me","you","they only"],1,"The narrator is in the story."],
   [1,'An unreliable narrator is one who:',["speaks quietly","gives an account the reader has reason to doubt","tells the truth","narrates in third person"],1,"You read around them."],
   [1,'How does a first-person narrator LIMIT a story?',["it makes it shorter","you only learn what that character knows or notices","it removes dialogue","it changes the theme"],1,"Their blind spots become yours."],
   [1,'A third-person omniscient narrator can:',["only follow one character","reveal the thoughts of multiple characters","never describe feelings","only report speech"],1,"Omniscient means all-knowing."],
   [2,'Retelling a story from a different character\'s point of view would most change:',["the events","which events seem important and how they are judged","the setting","the genre"],1,"Same facts, different weight."]],

  /* ---- Unit 4 · Time and Sequence ------------------------------------ */
  13:[
   [0,'Which sentence uses the present perfect?',["I finished my work.","I have finished my work.","I will finish my work.","I am finishing my work."],1,"Have or has plus a past participle."],
   [0,'Present perfect is formed with:',["was/were + verb","have/has + past participle","will + verb","is + verb-ing"],1,"Have or has plus the participle."],
   [1,'Which sentence is correct?',["She have lived here for years.","She has lived here for years.","She having lived here for years.","She has live here for years."],1,"Singular subject takes has."],
   [1,'Present perfect is used for an action that:',["will happen tomorrow","began in the past and matters now","happened and is fully over","is happening right now"],1,"It connects past to present."],
   [1,'Which is correct? "They ___ that book three times."',["has read","have read","have readed","having read"],1,"Plural subject plus the correct participle."],
   [2,'Which sentence correctly uses present perfect to show ongoing relevance?',["I have lost my keys, so I cannot drive.","I lost my keys yesterday at noon.","I will lose my keys.","I am losing my keys."],0,"The loss still affects the present."]],

  14:[
   [0,'Which sentence uses the past perfect?',["She left before I arrived.","She had left before I arrived.","She has left before I arrived.","She leaves before I arrive."],1,"Had plus a past participle."],
   [0,'Past perfect is formed with:',["have + participle","had + past participle","will have + participle","was + verb-ing"],1,"Always had, for any subject."],
   [1,'Past perfect shows that one past action happened:',["at the same time as another","before another past action","after another past action","in the future"],1,"It is the earlier of two past events."],
   [1,'Which is correct?',["By the time we arrived, the show has started.","By the time we arrived, the show had started.","By the time we arrived, the show starts.","By the time we arrived, the show will start."],1,"The starting came first."],
   [1,'Fill in: "He realized he ___ his wallet at home."',["has left","had left","have left","leaves"],1,"Leaving happened before realizing."],
   [2,'Which sentence correctly orders three past events?',["He had studied for weeks, so when the test came he passed easily.","He studied for weeks, so when the test had come he passes easily.","He has studied for weeks, so when the test came he had passed.","He studies for weeks, so when the test came he passed."],0,"Earliest event in past perfect, the rest in simple past."]],

  15:[
   [0,'Which sentence uses the future perfect?',["I will finish by Friday.","I will have finished by Friday.","I finish by Friday.","I have finished by Friday."],1,"Will have plus a past participle."],
   [0,'Future perfect is formed with:',["will + verb","will have + past participle","have + verb","had + participle"],1,"Will have plus the participle."],
   [1,'Future perfect describes an action that will be complete:',["right now","before a specific future time","in the past","never"],1,"Finished by some future point."],
   [1,'Fill in: "By next June, she ___ here for ten years."',["will work","will have worked","has worked","had worked"],1,"Completed by a future moment."],
   [1,'Which is correct?',["By midnight they will have arrived.","By midnight they will has arrived.","By midnight they will have arrive.","By midnight they have will arrived."],0,"Will have plus the correct participle form."],
   [2,'Which sentence needs future perfect rather than simple future?',["Tomorrow I will call you.","By the time you read this, I will have left the country.","I will be there soon.","She will win the race."],1,"One future action completes before another."]],

  16:[
   [0,'An inappropriate tense shift means:',["using the past tense","changing tense without a reason","using two verbs","writing in first person"],1,"Unmotivated switching confuses the reader."],
   [0,'Fix the shift: "She opened the door and sees a package."',["She opens the door and sees a package.","She opened the door and saw a package.","She opened the door and seeing a package.","Both A and B are correct fixes."],3,"Either tense works, as long as both verbs match."],
   [1,'Which sentence has an inappropriate tense shift?',["He walked in, sat down, and opened his book.","He walks in, sits down, and opens his book.","He walked in, sits down, and opened his book.","He will walk in and sit down."],2,"One verb jumps to present for no reason."],
   [1,'When IS a tense change appropriate?',["never","when the time frame genuinely changes","every other sentence","only in dialogue"],1,"Change tense when the timing actually changes."],
   [1,'Fix: "Yesterday we visit the museum and learned about fossils."',["Yesterday we visited the museum and learned about fossils.","Yesterday we visit the museum and learn about fossils.","Yesterday we will visit the museum and learned about fossils.","No change needed."],0,"Yesterday requires past throughout."],
   [2,'Which sentence changes tense APPROPRIATELY?',["I walked to school and I see my friend.","I studied hard last week, and now I feel ready.","She runs fast and won the race.","They ate lunch and are eating dinner then."],1,"Past and present are each anchored to their own time."]],

  /* ---- Unit 5 · Joining and Separating -------------------------------- */
  17:[
   [0,'A preposition shows:',["an action","a relationship, often of place or time","strong feeling","a name"],1,"Under, before, between, through."],
   [0,'Which word is a preposition? "The book beneath the table."',["book","beneath","table","the"],1,"It locates one noun relative to another."],
   [1,'A prepositional phrase includes the preposition and:',["a verb","its object (a noun or pronoun)","an adverb","nothing else"],1,"Beneath the table: preposition plus object."],
   [1,'Which sentence contains TWO prepositional phrases?',["She ran fast.","She ran through the park to the river.","She was running.","She ran and jumped."],1,"Through the park; to the river."],
   [1,'Prepositional phrases can act as:',["verbs","adjectives or adverbs","conjunctions","interjections"],1,"They modify nouns or verbs."],
   [2,'In "The letter from my grandmother arrived on Tuesday," the phrase "from my grandmother" tells us:',["when it arrived","which letter","how it arrived","who received it"],1,"It modifies the noun, acting as an adjective."]],

  18:[
   [0,'An interjection expresses:',["a relationship","sudden feeling","an action","possession"],1,"Wow! Ouch! Well,"],
   [0,'Which is an interjection? "Ouch, that hurt!"',["Ouch","that","hurt","!"],0,"It stands apart from the sentence structure."],
   [1,'A coordinating conjunction joins:',["a dependent to an independent clause","two equal parts","a noun to a verb","nothing"],1,"and, but, or, so, for, nor, yet."],
   [1,'A subordinating conjunction makes one clause:',["equal","dependent on the other","a question","an interjection"],1,"because, although, since, while."],
   [1,'Which sentence uses a subordinating conjunction?',["I ran and jumped.","I stayed because it rained.","I ran, but I stopped.","I ran or walked."],1,"Because makes the second clause dependent."],
   [2,'In "Although she was tired, she finished, and she smiled," how many conjunctions are there?',["one","two","three","four"],1,"Although (subordinating) and and (coordinating)."]],

  19:[
   [0,'Correlative conjunctions always come:',["alone","in pairs","at the end","in threes"],1,"either/or, neither/nor, both/and."],
   [0,'Which completes it? "Neither the rain ___ the wind stopped them."',["or","nor","and","but"],1,"Neither pairs with nor."],
   [1,'Which completes it? "Not only did she finish, ___ she finished first."',["and","but also","or","nor"],1,"Not only pairs with but also."],
   [1,'Which sentence uses correlative conjunctions correctly?',["Both my brother or I play piano.","Either my brother and I play piano.","Both my brother and I play piano.","Neither my brother or I play piano."],2,"Both pairs with and."],
   [1,'Correlative conjunctions should join elements that are:',["different in form","grammatically parallel","always nouns","always verbs"],1,"Match noun to noun, phrase to phrase."],
   [2,'Which sentence is parallel?',["She likes not only reading but also to swim.","She likes not only reading but also swimming.","She not only likes reading but also swimming.","She likes not only to read but also swimming."],1,"Both halves use the -ing form."]],

  20:[
   [0,'Which uses series commas correctly?',["I packed shirts, socks and shoes.","I packed shirts socks and shoes.","I packed shirts, socks, and shoes.","I packed, shirts, socks, and shoes."],2,"A comma separates each item, including before the final and."],
   [0,'Commas in a series separate:',["two items","three or more items","clauses only","nothing"],1,"Two items joined by and take no comma."],
   [1,'Which is correct?',["We visited Rome, Paris, and Madrid.","We visited Rome Paris and Madrid.","We visited, Rome, Paris and Madrid.","We visited Rome, Paris and, Madrid."],0,"Comma after each item in the list."],
   [1,'When a series contains items that already have commas, you should use:',["more commas","semicolons to separate the items","dashes","nothing"],1,"Semicolons prevent confusion."],
   [1,'Which is correct?',["She packed a coat, which was heavy, boots, and gloves.","She packed a coat, which was heavy; boots; and gloves.","She packed a coat which was heavy boots and gloves.","She packed a coat; which was heavy, boots, and gloves."],1,"Semicolons keep the three items clear."],
   [2,'Which sentence correctly punctuates a series of actions?',["He locked the door, turned off the lights, and went to bed.","He locked the door turned off the lights and went to bed.","He locked the door, turned off the lights and, went to bed.","He, locked the door, turned off the lights, and went to bed."],0,"Each action is one item in the series."]],

  /* ---- Unit 6 · Marks That Matter ------------------------------------- */
  21:[
   [0,'An introductory element is followed by:',["a period","a comma","a colon","nothing"],1,"It separates the opener from the main clause."],
   [0,'Which is correct?',["After the storm we went outside.","After the storm, we went outside.","After, the storm we went outside.","After the storm we, went outside."],1,"Comma after the introductory phrase."],
   [1,'Which sentence needs an introductory comma?',["We went outside after the storm.","After the storm we went outside.","The storm passed quickly.","We waited."],1,"The dependent element comes first."],
   [1,'Which is correct?',["However we decided to continue.","However, we decided to continue.","However we, decided to continue.","However; we decided to continue."],1,"Introductory transition words take a comma."],
   [1,'Which is correct?',["Running quickly down the hall he tripped.","Running quickly down the hall, he tripped.","Running, quickly down the hall he tripped.","Running quickly, down the hall he tripped."],1,"The participial opener is set off."],
   [2,'Which sentence does NOT need an introductory comma?',["Before we eat we pray.","In the morning we walk.","We pray before we eat.","Although it rained we went."],2,"The dependent clause comes second here."]],

  22:[
   [0,'Which uses direct address correctly?',["Please pass the salt Grandpa.","Please pass the salt, Grandpa.","Please, pass the salt Grandpa.","Please pass, the salt Grandpa."],1,"A comma sets off the person addressed."],
   [0,'Which is correct?',["Yes I will come.","Yes, I will come.","Yes; I will come.","Yes: I will come."],1,"Yes and no are set off by commas."],
   [1,'A tag question is punctuated how? "You are coming ___"',["arent you?","aren't you?",", aren't you?",". Aren't you?"],2,"A comma joins the tag to the sentence."],
   [1,'Which is correct?',["That was difficult, wasn't it?","That was difficult wasn't it?","That was difficult; wasn't it?","That was difficult. wasn't it?"],0,"Comma before the tag, question mark at the end."],
   [1,'Which is correct?',["No, I have not finished, Mom.","No I have not finished Mom.","No, I have not finished Mom.","No I have not finished, Mom."],0,"Both the no and the direct address are set off."],
   [2,'Which sentence uses all three conventions correctly?',["Yes Sarah you were right weren't you?","Yes, Sarah, you were right, weren't you?","Yes, Sarah you were right weren't you?","Yes Sarah, you were right, weren't you?"],1,"Yes, direct address, and tag question all set off."]],

  23:[
   [0,'Book titles in print are shown with:',["quotation marks","italics","all capitals","parentheses"],1,"Underlining stands in when handwriting."],
   [0,'Short works like poems and songs use:',["italics","quotation marks","underlining","capitals"],1,"Short works get quotation marks."],
   [1,'Which is correct?',['I read <i>Charlotte\'s Web</i> and the poem "Fog."','I read "Charlotte\'s Web" and the poem <i>Fog</i>.',"I read Charlotte's Web and the poem Fog.",'I read "Charlotte\'s Web" and the poem "Fog."'],0,"Long work italic, short work in quotation marks."],
   [1,'A magazine title should be:',["in quotation marks","italicized or underlined","in capitals","unmarked"],1,"The whole publication is a long work."],
   [1,'An article within a magazine should be:',["italicized","in quotation marks","underlined","in capitals"],1,"The part gets quotation marks; the whole gets italics."],
   [2,'Which is formatted correctly?',['The article "Bees in Decline" appeared in <i>National Geographic</i>.','The article <i>Bees in Decline</i> appeared in "National Geographic".',"The article Bees in Decline appeared in National Geographic.",'The article "Bees in Decline" appeared in "National Geographic".'],0,"Article in quotes, magazine in italics."]],

  24:[
   [0,'Combining two short sentences usually makes writing:',["longer and worse","smoother and clearer","harder to read","incorrect"],1,"Variety helps the reader."],
   [0,'Reducing a sentence means:',["adding words","cutting unnecessary words while keeping meaning","deleting the verb","making it a question"],1,"Say the same thing with less."],
   [1,'Best combination of "The dog was small. The dog barked loudly."',["The dog was small and the dog barked loudly.","The small dog barked loudly.","The dog, small, barked loudly.","The dog was small, it barked loudly."],1,"Turn the description into an adjective."],
   [1,'Which sentence is most concise without losing meaning?',["Due to the fact that it was raining, we stayed inside.","Because it was raining, we stayed inside.","On account of the rain occurring, we stayed inside.","It was raining and because of that we stayed inside."],1,"Same meaning, fewer words."],
   [1,'Sentence variety means:',["all sentences the same length","mixing short and long sentences","only long sentences","only questions"],1,"Rhythm keeps a reader engaged."],
   [2,'Best combination of "Maria studied hard. She was nervous. She passed the exam."',["Maria studied hard and she was nervous and she passed the exam.","Although she was nervous, Maria studied hard and passed the exam.","Maria studied hard, she was nervous, she passed the exam.","Maria, studying hard, nervous, passed the exam."],1,"Subordination shows the relationship between ideas."]],

  /* ---- Unit 7 · Roots of Meaning -------------------------------------- */
  25:[
   [0,'The Greek root "bio" means:',["earth","life","water","light"],1,"Biology, biography, antibiotic."],
   [0,'The Greek root "geo" means:',["life","earth","sound","time"],1,"Geography, geology, geothermal."],
   [1,'"Chronology" most likely means the study or arrangement of:',["places","time","sound","light"],1,"Chron means time."],
   [1,'"Photosynthesis" combines roots meaning:',["life and earth","light and putting together","sound and time","water and heat"],1,"Photo (light) plus synthesis (putting together)."],
   [1,'A "thermometer" measures:',["distance","heat","light","sound"],1,"Therm means heat; meter means measure."],
   [2,'Using roots, "geothermal energy" most likely means energy from:',["sunlight","the earth's heat","moving water","living things"],1,"Geo plus therm."]],

  26:[
   [0,'The Latin root "dict" means:',["see","say","carry","build"],1,"Dictate, predict, verdict."],
   [0,'The Latin root "port" means:',["say","carry","see","break"],1,"Transport, portable, export."],
   [1,'"Incredible" contains a root meaning:',["see","believe","carry","build"],1,"Cred means believe; in- means not."],
   [1,'"Interrupt" contains a root meaning:',["join","break","carry","speak"],1,"Rupt means break; inter- means between."],
   [1,'"Manuscript" combines roots meaning:',["machine and paper","hand and write","many and script","mind and story"],1,"Manu (hand) plus script (write)."],
   [2,'Using roots, "conspicuous" most likely means:',["hidden","easily seen","carried together","spoken aloud"],1,"Con- (with) plus spic (look) — standing out to be seen."]],

  27:[
   [0,'The suffix -able generally means:',["without","capable of being","full of","before"],1,"Readable: able to be read."],
   [0,'The prefix "ir-" in "irresponsible" means:',["again","not","before","under"],1,"It negates the root."],
   [1,'"Irreversible" means:',["able to be reversed","not able to be reversed","reversed again","reversing"],1,"ir- (not) + revers + -ible (able to be)."],
   [1,'The prefix "trans-" means:',["under","across","before","against"],1,"Transport, transatlantic, transfer."],
   [1,'The prefix "circum-" means:',["through","around","under","before"],1,"Circumference, circumnavigate."],
   [2,'Using affixes, "insignificant" most likely means:',["very important","not important","important again","importantly"],1,"in- (not) + significant."]],

  28:[
   [0,'A multiple-meaning word is one that:',["is very long","has more than one meaning depending on context","is misspelled","is a proper noun"],1,"Bank, current, present."],
   [0,'In "The current is strong today," current most likely means:',["present-day","a flow of water","electricity bill","modern"],1,"Context points to water."],
   [1,'In "She will present the award," present means:',["a gift","to give formally","now","attending"],1,"Here it is a verb."],
   [1,'What tells you which meaning applies?',["the dictionary order","the surrounding context","the word length","the first letter"],1,"Context decides."],
   [1,'In "The contract is binding," binding means:',["book covers","legally obligating","tying rope","edging fabric"],1,"Legal context."],
   [2,'In "The scientist will record the record temperature," the two uses of record differ in:',["spelling","meaning, part of speech and stress","nothing","tense only"],1,"First is a verb (re-CORD), second an adjective (RE-cord)."]],

  /* ---- Unit 8 · Figures and Nuance ------------------------------------ */
  29:[
   [0,'A simile compares using:',["is or was","like or as","and or but","never"],1,"As quiet as a mouse."],
   [0,'A metaphor compares by:',["using like","stating one thing IS another","asking a question","listing"],1,"Her smile was sunshine."],
   [1,'"The classroom was a zoo." This is:',["a simile","a metaphor","an idiom","literal"],1,"It states it directly."],
   [1,'Personification gives human qualities to:',["people","non-human things","only animals","nothing"],1,"The wind whispered."],
   [1,'"Hyperbole" means:',["understatement","deliberate exaggeration","exact measurement","comparison"],1,"I have told you a million times."],
   [2,'"Hope is the thing with feathers." This works as a metaphor because it:',["uses like","says hope IS something else, inviting comparison","is literally true","is a question"],1,"Direct identification, not comparison with like or as."]],

  30:[
   [0,'A proverb is:',["a long poem","a short traditional saying carrying wisdom","a definition","a question"],1,"Look before you leap."],
   [0,'An adage is closest in meaning to:',["a proverb","a metaphor","a synonym","a homograph"],0,"Both are traditional sayings."],
   [1,'"Don\'t count your chickens before they hatch" means:',["chickens are unreliable","do not assume something will happen before it does","count carefully","raise chickens"],1,"Do not depend on an uncertain outcome."],
   [1,'"A stitch in time saves nine" means:',["sewing is useful","fixing a small problem early prevents a bigger one","time is short","nine is lucky"],1,"Early action prevents larger trouble."],
   [1,'"Pride goes before a fall" warns against:',["walking fast","overconfidence","falling down","being proud of work"],1,"Arrogance precedes disaster."],
   [2,'Which sentence uses an adage correctly in context?',['He rushed the repair and it failed again — a stitch in time saves nine.','He fixed it perfectly the first time — a stitch in time saves nine.','He counted his chickens carefully — pride goes before a fall.','She was humble and succeeded — pride goes before a fall.'],0,"The saying matches what actually happened."]],

  31:[
   [0,'Synonyms are words with:',["opposite meanings","similar meanings","the same spelling","the same sound"],1,"Happy and glad."],
   [0,'Antonyms are words with:',["similar meanings","opposite meanings","the same spelling","no meaning"],1,"Hot and cold."],
   [1,'Homographs are words that:',["sound the same but are spelled differently","are spelled the same but have different meanings","mean the same thing","are always nouns"],1,"Bass the fish, bass the sound."],
   [1,'Which pair are antonyms?',["diligent and hardworking","diligent and lazy","diligent and careful","diligent and busy"],1,"Opposite qualities."],
   [1,'Which word has the strongest connotation?',["said","stated","screamed","mentioned"],2,"Connotation is the feeling a word carries."],
   [2,'"Thrifty" and "stingy" both describe careful spending. The difference is:',["meaning","connotation — one is positive, one negative","spelling","part of speech"],1,"Same denotation, opposite connotation."]],

  32:[
   [0,'Register means:',["how loud you speak","the level of formality in language","your accent","your vocabulary size"],1,"Formal, informal, casual."],
   [0,'Which is more formal?',["Hey, what's up?","Good morning. How are you?","Yo!","Sup"],1,"Formal register suits professional settings."],
   [1,'A dialect is:',["incorrect English","a regional or social variety of a language","slang only","a foreign language"],1,"Dialects are varieties, not errors."],
   [1,'Authors write characters in dialect mainly to:',["show poor education","convey where a character is from and who they are","confuse readers","fill space"],1,"It is characterization."],
   [1,'Which situation calls for formal English?',["texting a friend","a college application essay","talking at recess","a family dinner"],1,"Audience and purpose set the register."],
   [2,'Adapting your speech to your audience shows:',["dishonesty","awareness of context and respect for listeners","weakness","confusion"],1,"That is what the standard asks for."]],

  /* ---- Unit 9 · Make the Case ---------------------------------------- */
  33:[
   [0,'A credible source is one that is:',["longest","trustworthy and well-supported","most recent only","easiest to read"],1,"Check who wrote it and what backs it."],
   [0,'Why use several sources instead of one?',["to make the report longer","to check facts and get a fuller picture","teachers require it","no reason"],1,"One source can be wrong or one-sided."],
   [1,'Which is likely the MOST credible source on climate?',["a personal blog","a peer-reviewed scientific journal","a social media post","an advertisement"],1,"Peer review means experts checked it."],
   [1,'If two credible sources disagree, you should:',["pick one at random","report the disagreement and look for more evidence","ignore both","use the shorter one"],1,"Honesty about disagreement is part of research."],
   [1,'A primary source is:',["a summary written later","an original document or firsthand account","a textbook","an encyclopedia"],1,"It comes directly from the event or person."],
   [2,'A website with no author, no date and many ads is probably:',["highly credible","of questionable credibility","a primary source","peer reviewed"],1,"Missing accountability is a warning sign."]],

  34:[
   [0,'Plagiarism means:',["quoting with credit","using someone else's words or ideas as your own","paraphrasing with a citation","summarizing"],1,"It is a form of theft."],
   [0,'You must cite a source when you:',["quote it","paraphrase it","use its ideas","all of these"],3,"Words AND ideas both need credit."],
   [1,'Which does NOT require a citation?',["a direct quotation","a paraphrased argument","a statistic from a study","the fact that water freezes at 0°C"],3,"Common knowledge needs no citation."],
   [1,'A source list at the end of a report should include:',["only websites","every source you actually used","every source you looked at","only books"],1,"List what you drew on."],
   [1,'Putting a quotation in your own words without credit is:',["fine","still plagiarism","a summary","a citation"],1,"Changing words does not transfer ownership."],
   [2,'Which sentence correctly integrates a source?',['According to a 2019 Stanford study, later start times raised test scores by 4%.',"A study says scores went up.","Test scores rose 4%.","Someone found that scores improved."],0,"Names the source, the date and the specific finding."]],

  35:[
   [0,'An opinion piece should begin by:',["listing sources","clearly introducing the topic and stating the opinion","telling a joke","giving the conclusion only"],1,"The reader needs to know your position."],
   [0,'Reasons in an opinion piece should be:',["random","grouped logically","alphabetical","hidden"],1,"Organization helps the argument land."],
   [1,'Which linking phrase signals CONTRAST?',["moreover","furthermore","however","similarly"],2,"It turns the argument."],
   [1,'Which linking phrase signals an ADDED point?',["however","nevertheless","furthermore","although"],2,"It adds rather than opposes."],
   [1,'A strong opinion piece addresses opposing views because:',["it fills space","it shows you considered the evidence fairly","it is required","it confuses readers"],1,"Fair treatment strengthens credibility."],
   [2,'Which is the strongest concluding move?',["Repeat the introduction word for word.","Restate the position and show what follows from the reasons given.","Introduce a brand new reason.","Apologize for the length."],1,"A conclusion consolidates; it does not open new ground."]],

  36:[
   [0,'When presenting, speaking at an understandable pace means:',["as fast as possible","slowly enough for listeners to follow","in a whisper","without pauses"],1,"Your listener sets the speed, not your nerves."],
   [0,'Sequencing ideas logically means:',["random order","an order the audience can follow","longest first","alphabetically"],1,"Structure carries meaning aloud too."],
   [1,'A visual display should:',["repeat everything you say","support and clarify your main ideas","replace your talk","be decorative only"],1,"It enhances, it does not duplicate."],
   [1,'A listener asks a question you cannot answer. Best response:',["make something up","say you do not know and offer to find out","change the subject","end the presentation"],1,"Honesty beats a confident guess."],
   [1,'When summarizing a speaker, you should explain:',["how long they spoke","each claim and the evidence supporting it","what they wore","your opinion only"],1,"That is exactly what SL.5.3 asks."],
   [2,'Which question best builds on a speaker\'s point about recycling costs?',["What is your favorite color?","You said recycling costs more upfront — over what timeframe does it break even?","Are you done?","Can I go next?"],1,"It engages the specific claim and asks for evidence."]]
  };

  function setFor(week){
    const rows=G[week]||[];
    const spine=(window.__CURR.LA_Y2 && window.__CURR.LA_Y2.WEEKS)||[];
    const wk=spine.find(w=>w.n===week);
    return {
      id:"la-y2-w"+week+"-grammar", w:week, label:"W"+week,
      title:(wk?wk.title:"Week "+week),
      note:"Six questions. At this level, read the whole option list before choosing.",
      standard: wk?wk.standard:"",
      items: rows.map((r,i)=>({
        id:"la-y2-gr-w"+week+"-"+(i+1),
        type:"multiple-choice",
        t:r[0], q:r[1], options:r[2], a:r[3], hint:r[4]
      }))
    };
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y2 = Object.assign(window.__CURR.LA_Y2||{}, {GRAMMAR_ROWS:G, grammarSetFor:setFor});
})();
