/* ============================================================================
 * WORD VOYAGERS — YEAR ONE GRAMMAR (36 weekly drills)
 * ----------------------------------------------------------------------------
 * Six items a week, drilling the one skill the spine names for that week, in
 * tier order: two Warm-Up, three Core, one Challenge.
 *
 * Items are written as tuples to keep 216 of them readable in one file:
 *   [tier, prompt, [options], correctIndex, hint]
 * expand() turns them into ordinary QTypes multiple-choice items. Every item
 * gets a permanent id (`la-y1-gr-w<week>-<i>`) — never renumber them.
 *
 * The hint is shown only after a miss and is written to TEACH, not to give the
 * answer away: "a verb shows the action", not "the answer is jumped".
 * ==========================================================================*/
(function(){

  const G = {

  /* ---- Unit 1 · Words That Build ------------------------------------- */
  1:[ // nouns
   [0,'Which word is a noun? "The dog ran fast."',["dog","ran","fast","The"],0,"A noun names a person, place or thing."],
   [0,'Which word is a noun? "My sister sings loudly."',["sings","loudly","sister","My"],2,"Ask: what word names a person here?"],
   [1,'How many nouns are in this sentence? "The boy fed the horse."',["one","two","three","four"],1,"Count the words that name people, places or things."],
   [1,'Which word names a PLACE?',["happy","kitchen","quickly","jumped"],1,"A place is somewhere you can go or be."],
   [1,'Which sentence has a noun naming an idea, not an object?',["The rock is heavy.","Her kindness surprised me.","The dog barked.","We ate lunch."],1,"Some nouns name things you cannot touch."],
   [2,'In "The shepherd led his flock to the river," how many nouns are there?',["two","three","four","five"],2,"shepherd, flock, river — count carefully."]],

  2:[ // verbs
   [0,'Which word is the verb? "The bird sings."',["The","bird","sings","."],2,"A verb shows the action."],
   [0,'Which word is the verb? "Daniel prayed quietly."',["Daniel","prayed","quietly","."],1,"What did Daniel DO?"],
   [1,'Which sentence has TWO verbs?',["She ran fast.","He jumped and shouted.","The tall boy.","A quiet room."],1,"Look for two action words joined together."],
   [1,'Which word is a verb that does NOT show action you can see?',["ran","jumped","believe","climbed"],2,"Some verbs happen inside you."],
   [1,'Choose the correct past-tense verb: "Yesterday we ___ to church."',["go","goes","went","going"],2,"Yesterday means it already happened."],
   [2,'Which sentence uses the verb "to be" correctly?',["They is happy.","They are happy.","They be happy.","They am happy."],1,"Match the verb to a plural subject."]],

  3:[ // complete sentences
   [0,'Which one is a complete sentence?',["Running down the hill.","The dog barked.","After the storm.","A very tall tree."],1,"A sentence needs someone AND something they do."],
   [0,'Which one is NOT a complete sentence?',["Birds fly.","She reads books.","Under the big table.","We prayed."],2,"Ask: who or what, and what do they do?"],
   [1,'What is missing? "Jumped over the fence."',["a verb","a subject","a period","nothing"],1,"Who jumped? Nobody is named."],
   [1,'What is missing? "The three loud puppies."',["a verb","a subject","a capital letter","nothing"],0,"What did the puppies DO?"],
   [1,'Which sentence is punctuated correctly?',["the boy ran home","The boy ran home.","The boy ran home","the boy ran home."],1,"Capital at the start, period at the end."],
   [2,'Which of these is a complete sentence?',["Because it rained all day.","When we finished the chores.","We finished the chores.","Although the sun came out."],2,"Some word groups sound complete but leave you hanging."]],

  4:[ // pronouns
   [0,'Which word is a pronoun? "She likes apples."',["She","likes","apples","."],0,"A pronoun stands in for a noun."],
   [0,'Which pronoun replaces "the book"?',["he","she","it","they"],2,"A book is not a person."],
   [1,'Which pronoun replaces "Maria and Josh"?',["He","She","It","They"],3,"Two people together are plural."],
   [1,'Fill in: "Grandma baked cookies and gave ___ to us."',["they","them","their","theirs"],1,"The cookies receive the action."],
   [1,'Which sentence uses the pronoun correctly?',["Me and him went outside.","Him and me went outside.","He and I went outside.","I and him went outside."],2,"Try each person alone: 'He went' and 'I went'."],
   [2,'Which pronoun correctly finishes: "Each of the boys brought ___ own Bible."',["their","his","them","they"],1,"'Each' is singular, even with 'boys' nearby."]],

  /* ---- Unit 2 · Creation and Order ----------------------------------- */
  5:[ // regular plurals
   [0,'What is the plural of "book"?',["book","books","bookes","bookies"],1,"Most nouns just add -s."],
   [0,'What is the plural of "box"?',["boxs","boxes","boxies","box"],1,"Words ending in -x add -es."],
   [1,'What is the plural of "church"?',["churchs","churches","churchies","church"],1,"Words ending in -ch add -es."],
   [1,'What is the plural of "baby"?',["babys","babyes","babies","babie"],2,"Change the y to i, then add -es."],
   [1,'What is the plural of "leaf"?',["leafs","leaves","leafes","leafies"],1,"Some -f words change to -ves."],
   [2,'Which plural is spelled correctly?',["potatos","tomatos","heroes","echos"],2,"Some -o words take -es."]],

  6:[ // irregular plurals
   [0,'What is the plural of "child"?',["childs","children","childes","childrens"],1,"This one does not add -s at all."],
   [0,'What is the plural of "foot"?',["foots","feets","feet","footes"],2,"The vowel sound changes."],
   [1,'What is the plural of "mouse"?',["mouses","mice","mices","mouse"],1,"Not the computer kind — the animal."],
   [1,'What is the plural of "sheep"?',["sheeps","sheepes","sheep","sheepies"],2,"Some animals do not change at all."],
   [1,'What is the plural of "woman"?',["womans","women","womens","womanes"],1,"The middle vowel changes."],
   [2,'Which sentence uses an irregular plural correctly?',["The gooses flew south.","The geese flew south.","The geeses flew south.","The goosen flew south."],1,"Goose changes its vowel sound."]],

  7:[ // abstract nouns
   [0,'Which word names something you CANNOT touch?',["chair","love","rock","cup"],1,"Abstract nouns name ideas and feelings."],
   [0,'Which is an abstract noun?',["table","courage","dog","shoe"],1,"Can you hold it in your hand?"],
   [1,'Which sentence contains an abstract noun?',["The apple fell.","Her honesty impressed us.","The car is red.","We ate dinner."],1,"Look for a word naming a quality."],
   [1,'Which abstract noun comes from the word "kind"?',["kindly","kinder","kindness","kinding"],2,"Add -ness to make a noun."],
   [1,'Which abstract noun comes from "brave"?',["bravely","bravery","braver","braving"],1,"Add -ry to make the idea a thing."],
   [2,'Which list contains ONLY abstract nouns?',["joy, peace, patience","joy, chair, peace","dog, love, tree","hope, ball, faith"],0,"Every word must name something you cannot touch."]],

  8:[ // subject-verb agreement
   [0,'Which is correct?',["The dogs barks.","The dogs bark.","The dog bark.","The dogs barking."],1,"A plural subject takes the plural verb."],
   [0,'Which is correct?',["She run fast.","She running fast.","She runs fast.","She to run fast."],2,"A singular subject usually takes -s on the verb."],
   [1,'Fill in: "The children ___ playing outside."',["is","are","was","am"],1,"Children is plural."],
   [1,'Fill in: "My brother ___ to school every day."',["walk","walks","walking","walken"],1,"One brother is singular."],
   [1,'Which is correct?',["Everyone are here.","Everyone is here.","Everyone were here.","Everyone am here."],1,"'Everyone' is singular, even though it sounds like many."],
   [2,'Which is correct?',["The box of crayons are open.","The box of crayons is open.","The box of crayons were open.","The box of crayons am open."],1,"The subject is 'box', not 'crayons'."]],

  /* ---- Unit 3 · Courage in the Crowd --------------------------------- */
  9:[ // adjectives
   [0,'Which word is an adjective? "The red barn."',["The","red","barn","."],1,"An adjective describes a noun."],
   [0,'Which word describes the noun? "A brave shepherd stood."',["A","brave","shepherd","stood"],1,"Which word tells you what kind of shepherd?"],
   [1,'How many adjectives are in "The small brown dog slept."?',["one","two","three","four"],1,"small and brown both describe dog."],
   [1,'Which adjective tells HOW MANY?',["blue","seven","soft","loud"],1,"Some adjectives count instead of describe."],
   [1,'Which sentence has an adjective after the verb?',["The tall boy ran.","The soup is hot.","She sang loudly.","They left quickly."],1,"Sometimes the describing word comes after 'is'."],
   [2,'In "Esther showed quiet courage before the angry king," which word is NOT an adjective?',["quiet","courage","angry","none of these"],1,"Courage is the thing itself, not a description."]],

  10:[ // adverbs
   [0,'Which word is an adverb? "He ran quickly."',["He","ran","quickly","."],2,"An adverb often tells HOW."],
   [0,'Which word tells HOW she sang?',["She sang beautifully.","She","sang","beautifully"],3,"Look for the -ly word."],
   [1,'Which adverb tells WHEN?',["softly","yesterday","loudly","brightly"],1,"Not all adverbs end in -ly."],
   [1,'Which adverb tells WHERE?',["slowly","outside","gladly","quietly"],1,"Some adverbs name a place."],
   [1,'Which sentence contains an adverb?',["The tall tree swayed.","He waited patiently.","A red door opened.","The soup was hot."],1,"Look for a word describing the verb."],
   [2,'In "The very tired boy walked home slowly," which word is an adverb describing an ADJECTIVE?',["very","tired","walked","slowly"],0,"'Very' tells you how tired."]],

  11:[ // comparatives
   [0,'Fill in: "This rock is ___ than that one."',["heavy","heavier","heaviest","most heavy"],1,"Comparing two things uses -er."],
   [0,'Fill in: "Today is ___ than yesterday."',["warm","warmer","warmest","most warm"],1,"Two days are being compared."],
   [1,'Which is correct?',["more taller","tallerer","taller","most taller"],2,"Short words take -er alone."],
   [1,'Fill in: "This book is ___ than that one."',["interestinger","more interesting","most interesting","interestingest"],1,"Long adjectives use 'more'."],
   [1,'What is the comparative of "good"?',["gooder","more good","better","goodest"],2,"This one is irregular."],
   [2,'Which sentence is correct?',["She is more kinder than him.","She is kinder than he is.","She is most kind than him.","She is kindest than him."],1,"Never use 'more' and -er together."]],

  12:[ // superlatives
   [0,'Fill in: "Of all three, this one is the ___."',["big","bigger","biggest","more big"],2,"Three or more things use -est."],
   [0,'Fill in: "That was the ___ day of the year."',["cold","colder","coldest","more cold"],2,"Only one day can be the most cold."],
   [1,'Fill in: "She is the ___ runner on the team."',["fast","faster","fastest","most fast"],2,"Comparing everyone on the team."],
   [1,'Fill in: "This is the ___ story in the book."',["beautifullest","more beautiful","most beautiful","beautifuller"],2,"Long adjectives use 'most'."],
   [1,'What is the superlative of "bad"?',["baddest","worse","worst","most bad"],2,"This one is irregular."],
   [2,'Which sentence is correct?',["He is the most fastest boy.","He is the fastest boy.","He is the most fast boy.","He is the faster boy of all."],1,"Use one superlative form, not two."]],

  /* ---- Unit 4 · The Careful Craftsman -------------------------------- */
  13:[ // coordinating conjunctions
   [0,'Which word joins these? "I was tired ___ I kept working."',["and","but","or","so"],1,"The two ideas disagree with each other."],
   [0,'Which word joins these? "We sang ___ we prayed."',["but","and","or","yet"],1,"Both things happened together."],
   [1,'Which word shows a REASON? "It rained, ___ we stayed inside."',["but","or","so","yet"],2,"The rain caused the staying."],
   [1,'Which word offers a CHOICE? "You may read ___ draw."',["and","but","or","so"],2,"Pick one of the two."],
   [1,'Which sentence uses "but" correctly?',["I like apples but oranges.","I like apples, but I prefer oranges.","I like but apples oranges.","But I like apples oranges."],1,"'But' joins two complete ideas."],
   [2,'Which conjunction best fits? "He had no money, ___ did he have a plan."',["nor","and","so","or"],0,"'Nor' continues a negative idea."]],

  14:[ // subordinating conjunctions
   [0,'Which word begins a dependent idea? "___ it rained, we stayed home."',["Because","And","But","So"],0,"It gives the reason."],
   [0,'Fill in: "We waited ___ the storm passed."',["and","until","but","or"],1,"It tells WHEN."],
   [1,'Which word shows a condition?',["if","and","but","so"],0,"It sets up a maybe."],
   [1,'Fill in: "___ he was afraid, Daniel prayed anyway."',["Because","Although","So","And"],1,"The two ideas contrast."],
   [1,'Which sentence uses a subordinating conjunction?',["I ran and jumped.","I ran because I was late.","I ran, but I stopped.","I ran or walked."],1,"'Because' makes one idea depend on the other."],
   [2,'Where does the comma go? "Before we eat we pray."',["Before, we eat we pray.","Before we eat, we pray.","Before we, eat we pray.","No comma needed."],1,"A dependent idea at the front is followed by a comma."]],

  15:[ // compound sentences
   [0,'Which is a compound sentence?',["The wind blew hard.","The wind blew, and the kite soared.","The strong cold wind.","Blowing very hard."],1,"Two complete ideas joined together."],
   [0,'What joins the two halves of a compound sentence?',["a period","a comma and a joining word","a question mark","nothing"],1,"Comma plus and, but, or, so."],
   [1,'Which sentence is compound?',["She sang and danced.","She sang, and he danced.","Singing and dancing.","The girl who sang."],1,"Each half must stand alone as a sentence."],
   [1,'Where does the comma go? "I finished my work and I went outside."',["I finished, my work and I went outside.","I finished my work, and I went outside.","I finished my work and, I went outside.","No comma needed."],1,"The comma goes before the joining word."],
   [1,'Which is NOT a compound sentence?',["He read, and she wrote.","We ate, but they left.","The tall boy ran home.","I called, so she answered."],2,"Only one complete idea here."],
   [2,'Which correctly joins: "The sun set. The stars appeared."',["The sun set the stars appeared.","The sun set, the stars appeared.","The sun set, and the stars appeared.","The sun set and, the stars appeared."],2,"You need both a comma AND a joining word."]],

  16:[ // complex sentences
   [0,'Which is a complex sentence?',["I ran and jumped.","When the bell rang, we lined up.","The dog barked loudly.","She sang, and he clapped."],1,"One part cannot stand alone."],
   [0,'Which part of "Because it snowed, school closed" cannot stand alone?',["Because it snowed","school closed","both","neither"],0,"It leaves you waiting for more."],
   [1,'Which sentence is complex?',["We ate dinner.","We ate dinner, and we prayed.","After we ate dinner, we prayed.","We ate and prayed."],2,"'After we ate dinner' depends on the rest."],
   [1,'Fill in to make it complex: "___ she practiced daily, she improved."',["And","Because","But","So"],1,"Show the cause."],
   [1,'Which sentence needs a comma?',["We prayed before we ate.","Before we ate we prayed.","We ate and prayed.","We prayed quietly."],1,"The dependent part comes first here."],
   [2,'Which is BOTH compound and complex?',["I ran home.","When it rained, I ran home, and I dried off.","I ran home and dried off.","When it rained, I ran home."],1,"It has a dependent part AND two joined complete ideas."]],

  /* ---- Unit 5 · Honest Words ----------------------------------------- */
  17:[ // capitalizing titles
   [0,'Which book title is capitalized correctly?',["charlotte's web","Charlotte's web","Charlotte's Web","CHARLOTTE'S web"],2,"Capitalize the important words."],
   [0,'Which is correct?',["the lion, the witch and the wardrobe","The Lion, the Witch and the Wardrobe","The lion, The witch and The wardrobe","the Lion, the Witch and the Wardrobe"],1,"First word and all main words."],
   [1,'In a title, which kind of word usually stays lowercase?',["nouns","verbs","short words like 'the' and 'of' in the middle","adjectives"],2,"Small joining words stay small unless first."],
   [1,'Which is correct?',["Little house on the Prairie","Little House on the Prairie","little house on the prairie","Little House On The Prairie"],1,"'on' and 'the' stay lowercase in the middle."],
   [1,'Which is correct?',["a wrinkle in time","A Wrinkle in Time","A wrinkle In time","a Wrinkle in Time"],1,"First word always capitalized, even 'a'."],
   [2,'Which is correct?',["the tale of two cities","The Tale Of Two Cities","The Tale of Two Cities","The tale of Two Cities"],2,"'of' stays lowercase; the rest are main words."]],

  18:[ // commas in addresses
   [0,'Which is correct?',["Savannah Georgia","Savannah, Georgia","Savannah ,Georgia","Savannah Georgia,"],1,"A comma separates city and state."],
   [0,'Which is correct?',["Dallas, Texas","Dallas Texas","Dallas,Texas","Dallas ,Texas"],0,"Comma directly after the city."],
   [1,'Which is correct?',["We moved to Austin Texas last year.","We moved to Austin, Texas, last year.","We moved to Austin ,Texas last year.","We moved to, Austin Texas last year."],1,"Commas go both before and after the state."],
   [1,'Which date is punctuated correctly?',["June 4 2025","June 4, 2025","June, 4 2025","June 4 ,2025"],1,"Comma between day and year."],
   [1,'Which is correct?',["She was born on May 3, 2016, in Ohio.","She was born on May 3 2016 in Ohio.","She was born on May, 3, 2016 in Ohio.","She was born on May 3, 2016 in, Ohio."],0,"Comma after the year too."],
   [2,'Which address line is correct?',["112 Oak Street Macon, Georgia","112 Oak Street, Macon, Georgia","112, Oak Street, Macon Georgia","112 Oak Street Macon Georgia"],1,"Commas separate street, city and state."]],

  19:[ // commas in dialogue
   [0,'Which is correct?',['She said "I am ready."','She said, "I am ready."','She said "I am ready".','She, said "I am ready."'],1,"A comma comes before the quotation."],
   [0,'Which is correct?',['"Come here," he called.','"Come here" he called.','"Come here." he called.','"Come here", he called.'],0,"Comma goes inside the quotation marks."],
   [1,'Which is correct?',['Mom asked, "Are you finished?"','Mom asked "Are you finished?"','Mom asked, "Are you finished"?','Mom, asked "Are you finished?"'],0,"Comma before, question mark inside."],
   [1,'Which is correct?',['"I will go," said Ruth, "if you come too."','"I will go" said Ruth "if you come too."','"I will go," said Ruth "if you come too."','"I will go" said Ruth, "if you come too."'],0,"A split quotation needs commas on both sides."],
   [1,'Where does the period go?',['"We are home."','"We are home".','"We are home"','We are home."'],0,"Punctuation stays inside the quotation marks."],
   [2,'Which is correct?',['"Wait!" shouted David.','"Wait!," shouted David.','"Wait," shouted David!','"Wait"! shouted David.'],0,"An exclamation mark replaces the comma."]],

  20:[ // quotation marks
   [0,'What do quotation marks show?',["a question","someone's exact words","a list","a title of a book"],1,"They mark exactly what was said."],
   [0,'Which sentence needs quotation marks?',["She said she was tired.","She said, I am tired.","She was tired.","Tired, she sat down."],1,"His exact words need marking."],
   [1,'Which is punctuated correctly?',['Peter said, "I will follow you."',"Peter said, I will follow you.",'Peter said "I will follow you.',"Peter said I will follow you."],0,"Open and close the quotation."],
   [1,'Which sentence does NOT need quotation marks?',['He shouted, "Run!"',"He said that he would run.",'She asked, "Why?"','"Stop," he said.'],1,"Reporting what someone said, not quoting it."],
   [1,'Which title uses quotation marks correctly?',['I read the poem "The Road Not Taken."',"I read the poem The Road Not Taken.","I read the poem 'The Road Not Taken.","I read the poem The Road Not Taken\"."],0,"Short works like poems use quotation marks."],
   [2,'Which is correct?',['"Did you hear," she whispered, "what he said?"','"Did you hear" she whispered "what he said?"','"Did you hear," she whispered "what he said?"','"Did you hear" she whispered, "what he said?"'],0,"Both halves of the split quote are punctuated."]],

  /* ---- Unit 6 · Belonging To ----------------------------------------- */
  21:[ // singular possessives
   [0,'Which shows the dog owns the bone?',["the dogs bone","the dog's bone","the dogs' bone","the dog bone"],1,"Apostrophe then s for one owner."],
   [0,'Which is correct?',["Sarahs book","Sarah's book","Sarahs' book","Sarah book"],1,"One girl owns the book."],
   [1,'Which is correct? "That is ___ backpack."',["James","James'","James's","Jameses"],2,"Even names ending in s usually add 's."],
   [1,'Which is correct?',["the childs toy","the child's toy","the childs' toy","the childes toy"],1,"One child owns it."],
   [1,"What does \"the teacher's desk\" mean?",["many teachers","the desk belongs to one teacher","the teacher is a desk","teachers and desks"],1,"Apostrophe-s shows ownership."],
   [2,'Which sentence uses a possessive correctly?',["The birds nest is empty.","The bird's nest is empty.","The birds' nest is empty for one bird.","The birds nest's is empty."],1,"One bird, one nest."]],

  22:[ // plural possessives
   [0,'Which shows a bone belonging to MANY dogs?',["the dog's bone","the dogs' bone","the dogs bone","the dogses bone"],1,"Plural first, then just an apostrophe."],
   [0,'Which is correct? Many girls own the room.',["the girl's room","the girls' room","the girls room","the girls's room"],1,"Add the apostrophe after the s."],
   [1,'Which is correct? Many children own the toys.',["the childrens' toys","the children's toys","the childrens toys","the childrens's toys"],1,"'Children' is already plural without an s."],
   [1,"What is the difference between \"the boy's books\" and \"the boys' books\"?",["no difference","one boy vs. many boys","one book vs. many books","one is wrong"],1,"Where the apostrophe sits tells you how many owners."],
   [1,'Which is correct? Many men own the coats.',["the mens' coats","the men's coats","the mens coats","the man's coats"],1,"'Men' is already plural."],
   [2,'Which sentence is correct?',["The three sister's dresses hung there.","The three sisters' dresses hung there.","The three sisters dresses hung there.","The three sisters's dresses hung there."],1,"Three sisters — apostrophe after the s."]],

  23:[ // pronoun-antecedent agreement
   [0,'Fill in: "Sarah lost ___ hat."',["his","her","their","its"],1,"Sarah is one girl."],
   [0,'Fill in: "The boys finished ___ chores."',["his","her","their","its"],2,"More than one boy."],
   [1,'Fill in: "The dog wagged ___ tail."',["his","her","its","their"],2,"An animal we do not know the name of takes 'its'."],
   [1,'Which sentence agrees correctly?',["Every student brought their book.","Every student brought his book.","Every students brought their book.","Every student brought they book."],1,"'Every student' is singular."],
   [1,'Fill in: "The team celebrated ___ victory."',["their","its","his","her"],1,"A team is one group."],
   [2,'Which sentence has an agreement error?',["The girls raised their hands.","Each boy raised his hand.","Everyone raised their hand.","The boy raised his hand."],2,"'Everyone' is singular in careful writing."]],

  24:[ // its vs it's
   [0,'Which means "it is"?',["its","it's","its'","its's"],1,"The apostrophe replaces the missing letter."],
   [0,'Fill in: "___ raining outside."',["Its","It's","Its'","Itss"],1,"It IS raining."],
   [1,'Fill in: "The bird built ___ nest."',["it's","its","its'","it is"],1,"The nest belongs to the bird."],
   [1,'Which sentence is correct?',["Its a beautiful day.","It's a beautiful day.","Its' a beautiful day.","It is'nt a beautiful day."],1,"Try replacing it with 'it is'."],
   [1,'Which sentence is correct?',["The dog lost it's collar.","The dog lost its collar.","The dog lost its' collar.","The dog lost it is collar."],1,"Possessive 'its' has no apostrophe."],
   [2,'Which sentence uses BOTH correctly?',["Its raining and the cat lost it's toy.","It's raining and the cat lost its toy.","Its' raining and the cat lost its toy.","It's raining and the cat lost it's toy."],1,"One means 'it is', the other shows belonging."]],

  /* ---- Unit 7 · Roots and Branches ----------------------------------- */
  25:[ // prefixes un-, re-, pre-
   [0,'What does "unhappy" mean?',["very happy","not happy","happy again","happy before"],1,"'un-' means not."],
   [0,'What does "rewrite" mean?',["write badly","not write","write again","write before"],2,"'re-' means again."],
   [1,'What does "preview" mean?',["view again","not view","view before","view badly"],2,"'pre-' means before."],
   [1,'Which word means "not kind"?',["rekind","prekind","unkind","kindness"],2,"Add the prefix meaning not."],
   [1,'Which word means "to heat before"?',["reheat","unheat","preheat","heater"],2,"You do it ahead of time."],
   [2,'In "The unprepared student had to redo the test," what does "unprepared" mean?',["prepared again","not prepared","prepared before","preparing"],1,"'un-' reverses the meaning."]],

  26:[ // prefixes dis-, mis-, non-
   [0,'What does "disagree" mean?',["agree again","not agree","agree before","agree loudly"],1,"'dis-' means not or the opposite."],
   [0,'What does "misspell" mean?',["spell again","spell before","spell wrongly","not spell"],2,"'mis-' means wrongly."],
   [1,'What does "nonfiction" mean?',["fiction again","not fiction","fiction before","bad fiction"],1,"'non-' means not."],
   [1,'Which word means "to behave wrongly"?',["rebehave","misbehave","nonbehave","prebehave"],1,"Add the prefix meaning wrongly."],
   [1,'Which word means "not honest"?',["rehonest","prehonest","dishonest","honestly"],2,"'dis-' reverses it."],
   [2,'Which prefix would you add to "place" to mean "put in the wrong spot"?',["re-","dis-","non-","mis-"],3,"Wrongly placed."]],

  27:[ // suffixes -ful, -less, -ness
   [0,'What does "hopeful" mean?',["without hope","full of hope","hope again","not hope"],1,"'-ful' means full of."],
   [0,'What does "hopeless" mean?',["full of hope","without hope","hope again","hope before"],1,"'-less' means without."],
   [1,'What does "-ness" do to a word?',["makes it an action","makes it a quality or state","makes it negative","makes it plural"],1,"Kind becomes kindness — the quality itself."],
   [1,'Which word means "without fear"?',["fearful","fearless","fearness","refear"],1,"'-less' means without."],
   [1,'Which word means "the state of being dark"?',["darkful","darkless","darkness","redark"],2,"'-ness' names the state."],
   [2,'"Her thankfulness was endless." Which suffix means "without"?',["-ful","-ness","-less","none"],2,"Endless means without end."]],

  28:[ // context clues
   [0,'"The arid desert had no water for miles." What does "arid" mean?',["wet","very dry","cold","crowded"],1,"The sentence tells you there is no water."],
   [0,'"He was famished, so he ate three plates." What does "famished" mean?',["full","very hungry","tired","angry"],1,"Look at what he did next."],
   [1,'"The path was treacherous, and two hikers slipped." What does "treacherous" mean?',["safe","dangerous","short","flat"],1,"People slipped on it."],
   [1,'"She spoke in a timid voice, barely above a whisper." What does "timid" mean?',["loud","shy","angry","fast"],1,"Barely a whisper tells you."],
   [1,'"The ancient oak had stood for four hundred years." What does "ancient" mean?',["small","very old","new","dead"],1,"Four hundred years is the clue."],
   [2,'"Despite the tumult outside, the chapel stayed calm." What does "tumult" mean?',["silence","noisy confusion","darkness","cold"],1,"'Despite' signals the opposite of calm."]],

  /* ---- Unit 8 · More Than It Says ------------------------------------ */
  29:[ // literal vs nonliteral
   [0,'"He was buried in homework." Is this literal or nonliteral?',["literal","nonliteral","both","neither"],1,"He is not actually under the ground."],
   [0,'Which sentence is literal?',["Time flies.","The dog ran to the fence.","She has a heart of gold.","He was all ears."],1,"It means exactly what it says."],
   [1,'"The room was an oven." What does this really mean?',["the room had an oven","the room was very hot","the room was for baking","the room was small"],1,"Ovens are hot."],
   [1,'"She was drowning in paperwork." What does this mean?',["she fell in water","she had a great deal of paperwork","she lost her papers","she was swimming"],1,"Too much to handle."],
   [1,'Which sentence is nonliteral?',["The sun rose at six.","My backpack weighs a ton.","We walked two miles.","She read the book."],1,"A backpack cannot really weigh 2,000 pounds."],
   [2,'"His words cut deeper than any knife." What does this mean?',["he used a knife","his words hurt badly","he was cooking","he was sharp"],1,"Words can wound without touching."]],

  30:[ // idioms
   [0,'What does "it\'s raining cats and dogs" mean?',["animals are falling","it is raining hard","the pets are outside","it is not raining"],1,"An idiom does not mean what it says."],
   [0,'What does "break a leg" mean?',["hurt yourself","good luck","run fast","sit down"],1,"People say it before a performance."],
   [1,'What does "hold your tongue" mean?',["grab your tongue","stay quiet","speak louder","eat something"],1,"It is about not speaking."],
   [1,'What does "a piece of cake" mean?',["dessert","something easy","something sweet","a small amount"],1,"Nothing to do with baking."],
   [1,'What does "let the cat out of the bag" mean?',["free a cat","reveal a secret","go shopping","make a mess"],1,"It is about telling something."],
   [2,'"Bite off more than you can chew" means:',["eat too fast","take on too much","chew carefully","be hungry"],1,"It is about taking on tasks, not food."]],

  31:[ // similes and metaphors
   [0,'Which sentence is a simile?',["The moon was a silver coin.","She was as quiet as a mouse.","He ran fast.","The dog barked."],1,"A simile uses 'like' or 'as'."],
   [0,'What two words signal a simile?',["is and was","like and as","and and but","the and a"],1,"Look for the comparison words."],
   [1,'Which sentence is a metaphor?',["He is as brave as a lion.","He is a lion in battle.","He fought like a lion.","He saw a lion."],1,"A metaphor says one thing IS another."],
   [1,'"Her smile was sunshine." This is a:',["simile","metaphor","idiom","fact"],1,"No 'like' or 'as' — it says it IS."],
   [1,'"The clouds were like cotton balls." This is a:',["simile","metaphor","idiom","literal statement"],0,"'Like' makes it a simile."],
   [2,'Which is a metaphor, not a simile?',["Life is like a race.","Faith is an anchor.","He runs like the wind.","She sings like a bird."],1,"It states it directly with no 'like' or 'as'."]],

  32:[ // shades of meaning
   [0,'Which word means the MOST happy?',["glad","pleased","overjoyed","content"],2,"Some words are stronger than others."],
   [0,'Which word means the LEAST warm?',["hot","boiling","cool","scorching"],2,"Order them by strength."],
   [1,'Which word is stronger than "big"?',["large","enormous","medium","small"],1,"Enormous is far bigger than big."],
   [1,'Which word shows the most fear?',["nervous","terrified","uneasy","concerned"],1,"Rank them from mild to strong."],
   [1,'Which word is gentler than "shouted"?',["screamed","yelled","said","hollered"],2,"The quietest option."],
   [2,'Put in order from weakest to strongest: chuckle, laugh, roar.',["roar, laugh, chuckle","chuckle, laugh, roar","laugh, chuckle, roar","chuckle, roar, laugh"],1,"Start with the quietest sound."]],

  /* ---- Unit 9 · Tell It Well ----------------------------------------- */
  33:[ // taking notes
   [0,'When taking notes, you should write:',["every word you read","the key ideas in your own words","nothing at all","only the title"],1,"Notes are shorter than the source."],
   [0,'Why write notes in your own words?',["it is faster","it proves you understood","it looks nicer","it is required"],1,"Copying does not prove understanding."],
   [1,'Which is the BEST note from: "Bees pollinate about one-third of the food we eat."',["Bees pollinate about one-third of the food we eat.","Bees — pollinate ~1/3 of our food","Bees are nice insects","Food is important"],1,"Short, in your words, keeps the key fact."],
   [1,'What should you always record along with a note?',["the weather","where the fact came from","your mood","the page color"],1,"You need to credit the source."],
   [1,'Which belongs in notes for a report on eagles?',["My favorite color is blue","Eagles can see four times farther than humans","I like birds","Birds are everywhere"],1,"A specific, relevant fact."],
   [2,'You find the same fact in two different books. This means the fact is:',["definitely false","more likely reliable","not worth using","too common"],1,"Two independent sources agreeing is a good sign."]],

  34:[ // sorting evidence
   [0,'Which is a FACT?',["Dogs are the best pets.","Dogs have four legs.","Dogs are cuter than cats.","Everyone should own a dog."],1,"A fact can be checked."],
   [0,'Which is an OPINION?',["The sun is a star.","Water freezes at 32°F.","Winter is the best season.","Georgia is a state."],2,"You cannot prove 'best'."],
   [1,'Your report says eagles hunt fish. Which note supports it?',["Eagles are beautiful","Eagles catch fish with their talons","I saw an eagle once","Eagles live in trees"],1,"It directly backs the claim."],
   [1,'Which note does NOT belong in a report on the water cycle?',["Water evaporates into vapor","Clouds form when vapor cools","My uncle likes rain","Rain falls as precipitation"],2,"A personal preference is not evidence."],
   [1,'What should you do with a fact that contradicts your point?',["hide it","ignore it","mention it honestly","delete the report"],2,"Honest writing deals with the whole picture."],
   [2,'Two sources disagree about a date. What is the best next step?',["pick the one you like","check a third reliable source","use neither","guess the middle"],1,"Go find more evidence."]],

  35:[ // paragraphs that build
   [0,'What does a topic sentence do?',["ends the paragraph","tells the main idea","adds a detail","asks a question"],1,"It says what the paragraph is about."],
   [0,'Where does a topic sentence usually go?',["first","last","middle","anywhere"],0,"It sets up what follows."],
   [1,'Which sentence would NOT belong in a paragraph about honey bees?',["Bees live in hives.","Bees make honey.","My bike is red.","Bees pollinate flowers."],2,"Stay on topic."],
   [1,'What is the job of a concluding sentence?',["add a new idea","wrap up the main point","ask a question","start the topic"],1,"It closes the paragraph."],
   [1,'Which transition word signals an ADDED point?',["however","although","furthermore","instead"],2,"It adds rather than contrasts."],
   [2,'In a three-paragraph report, what usually goes in the FIRST paragraph?',["the conclusion","the introduction with your main idea","the strongest evidence","a list of sources"],1,"Tell the reader what you will show."]],

  36:[ // reporting and presenting
   [0,'When reporting aloud, you should speak:',["as fast as possible","clearly at an understandable pace","very quietly","only in a whisper"],1,"Your listener has to follow you."],
   [0,'What makes a report easier for listeners to follow?',["random order","a clear beginning, middle and end","no pauses","reading very fast"],1,"Structure helps the ear."],
   [1,'What is a good reason to add a visual display?',["to fill time","to help listeners picture the idea","to hide mistakes","to make it longer"],1,"Visuals support understanding."],
   [1,'A listener asks a question you cannot answer. The best response is:',["make something up","say you do not know and offer to find out","ignore them","change the subject"],1,"Honesty is better than a guess."],
   [1,'When listening to someone else report, you should:',["interrupt often","listen for the main idea and supporting details","look away","talk to a neighbor"],1,"Listening well is a skill too."],
   [2,'Which question best builds on a speaker\'s idea about recycling?',["What is your favorite color?","How much waste does recycling actually save?","Are you finished?","Can I go next?"],1,"It asks for more on the same topic."]]
  };

  function setFor(week){
    const rows = G[week] || [];
    const spine = (window.__CURR.LA_Y1 && window.__CURR.LA_Y1.WEEKS) || [];
    const wk = spine.find(w=>w.n===week);
    return {
      id: "la-y1-w"+week+"-grammar",
      w: week,
      label: "W"+week,
      title: "Grammar — " + (wk ? wk.title : "Week "+week),
      note: "Six questions. Read each one twice before you answer.",
      standard: wk ? wk.standard : "",
      items: rows.map((r,i)=>({
        id: "la-y1-gr-w"+week+"-"+(i+1),
        type: "multiple-choice",
        t: r[0], q: r[1], options: r[2], a: r[3], hint: r[4]
      }))
    };
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y1 = Object.assign(window.__CURR.LA_Y1||{}, {GRAMMAR_ROWS: G, grammarSetFor: setFor});
})();
