/* ============================================================================
 * WORD VOYAGERS — YEAR ONE READING (36 weekly passages)
 * ----------------------------------------------------------------------------
 * One passage a week, alternating literature and informational text, each tied
 * to its unit's theme and virtue. Passages run roughly 130–200 words, which is
 * the right length for a third grader to read aloud fluently in one sitting —
 * the standard asks for accuracy and expression, and a passage too long to
 * finish well teaches neither.
 *
 * All passages are original to this curriculum. Where one retells a biblical
 * or historical account it is a retelling in our own words, not a quotation.
 *
 * Questions are auto-graded multiple choice covering: explicit detail, main
 * idea or central message, vocabulary in context, and inference. Ids are
 * permanent (`la-y1-rd-w<week>-q<i>`).
 *
 * Monday's screen also carries the fluency task — read it ALOUD once before
 * answering. That is RF.3.4 and it is not machine-checkable; the page tells
 * the child to do it and Friday's speaking task is where it gets heard.
 * ==========================================================================*/
(function(){

  /* [title, type, text, [ [prompt,[options],answerIdx], ... ] ] */
  const P = {

  /* ---- Unit 1 · Words That Build ------------------------------------- */
  1:["The Boy Who Kept His Word","Literature",
   "Caleb promised his neighbor, Mr. Hollis, that he would feed the chickens every morning while the old man was away. The first morning was easy. The second morning it rained. By the fifth morning, Caleb's friends were meeting at the creek, and the chickens were the last thing he wanted to think about.\n\nHe stood at the end of his driveway for a long moment. Then he turned toward Mr. Hollis's gate.\n\nThe chickens came running when they heard the latch. Caleb scattered the feed, filled the water, and checked the nesting boxes the way he had been shown. It took eleven minutes.\n\nWhen Mr. Hollis came home, he found every bird healthy and a note on the counter listing how many eggs there had been each day. He never asked whether Caleb had come every morning. He did not have to.",
   [["What did Caleb promise to do?",["mow the lawn","feed the chickens","paint the fence","walk the dog"],1],
    ["What is the central message of this story?",["Chickens are hard work","Keeping a promise matters even when it is inconvenient","Neighbors should pay for help","Rain makes chores difficult"],1],
    ["How do you know Mr. Hollis trusted Caleb?",["He paid him extra","He never had to ask whether Caleb came","He watched him on camera","He asked the neighbors"],1]]],

  2:["How a Seed Becomes a Tree","Informational",
   "A seed looks like a small, dry stone. Inside, though, it holds a tiny plant that is waiting.\n\nWhen a seed lands in warm, damp soil, it begins to soak up water. The seed swells until its hard coat splits open. A root pushes downward first, anchoring the plant and drinking from the soil. Only after the root takes hold does a shoot push upward toward the light.\n\nThe shoot breaks the surface and opens its first leaves. Those leaves begin the plant's real work: catching sunlight and turning it into food. Scientists call this photosynthesis.\n\nFor the first year, most of the growing happens underground where no one can see it. A young oak may stand only a few inches tall while its roots reach several feet down. That hidden work is what lets it stand for a hundred years afterward.",
   [["What pushes out of the seed first?",["a leaf","a flower","a root","a branch"],2],
    ["What does the word 'anchoring' mean in this passage?",["holding firmly in place","growing quickly","drying out","floating away"],0],
    ["Why does the passage say most early growing happens underground?",["the roots grow far down before the tree grows tall","seeds are afraid of light","leaves grow underground","trees grow at night"],0]]],

  3:["The Widow's Two Coins","Literature",
   "The temple courtyard was loud with the clink of coins. Wealthy men stepped up to the treasury box and poured in handfuls of silver. Some paused first, so that others could see.\n\nA teacher sat across the courtyard with his students, watching.\n\nAn old woman came last. Her clothes were worn thin at the elbows. She reached into a fold of cloth and dropped in two small copper coins — together worth less than a penny. Then she turned and walked away without looking at anyone.\n\nThe students barely noticed her. But the teacher leaned forward.\n\n\"That woman,\" he said, \"has put in more than all the others.\"\n\nHis students frowned. The rich men had given far more.\n\n\"They gave out of what they had left over,\" the teacher said. \"She gave out of what she needed. That is a different thing entirely.\"",
   [["How much were the widow's two coins worth?",["a great deal of silver","less than a penny","exactly one penny","the passage does not say"],1],
    ["Why did the teacher say she gave more than the others?",["her coins were rare","she gave out of what she needed, not her leftovers","she gave more coins","she gave last"],1],
    ["What does the detail about men pausing so others could see suggest?",["they were tired","some wanted to be noticed giving","they were counting","they were praying"],1]]],

  4:["Why Bees Dance","Informational",
   "A honeybee that finds a good patch of flowers has a problem. She cannot describe the place in words. So she dances.\n\nBack at the hive, the bee walks a pattern shaped like a figure eight across the honeycomb. The straight run in the middle is the important part. The direction she points during that run tells the other bees which way to fly, using the sun as a reference. The length of the run tells them how far to go — a longer waggle means a longer trip.\n\nThe other bees crowd around, touching her with their antennae to feel the rhythm in the dark.\n\nA scientist named Karl von Frisch spent years watching this before he understood it. In 1973 he was given a Nobel Prize for the discovery. He had proven that an insect the size of a fingernail was giving directions.",
   [["What does the length of the bee's waggle run tell the other bees?",["how sweet the flowers are","how far away the flowers are","how many flowers there are","what color the flowers are"],1],
    ["How do the other bees sense the dance in the dark hive?",["by smell","by touching her with their antennae","by seeing it","by listening"],1],
    ["What is the main idea of this passage?",["Bees make honey","Bees communicate the location of food by dancing","Karl von Frisch won a prize","Hives are dark places"],1]]],

  /* ---- Unit 2 · Creation and Order ----------------------------------- */
  5:["The Boy Who Counted Everything","Literature",
   "Nathan counted things. He counted the stairs to his room (fourteen), the fence posts along the drive (sixty-two), and the seconds it took the kettle to whistle (ninety-eight).\n\nHis older sister thought it was strange. His grandmother did not.\n\n\"Come outside,\" she said one clear night, and handed him a blanket.\n\nThey lay on their backs in the cold grass. Nathan started counting stars and lost his place at forty. He started again and lost it at fifty-five.\n\n\"You cannot,\" his grandmother said gently. \"There are more than you or I could count in a lifetime. Astronomers guess there are more stars than grains of sand on every beach on earth.\"\n\nNathan lay quietly for a while.\n\n\"Then why do I count things?\" he asked.\n\n\"Because paying attention is a kind of praise,\" she said. \"You just picked something too big to finish.\"",
   [["How many fence posts were along the drive?",["fourteen","fifty-five","sixty-two","ninety-eight"],2],
    ["Why could Nathan not finish counting the stars?",["it got too cold","there are far too many to count","he fell asleep","his grandmother stopped him"],1],
    ["What does the grandmother mean by 'paying attention is a kind of praise'?",["counting is a chore","noticing carefully honors what was made","stars are countable","praise means numbers"],1]]],

  6:["The Longest Migration","Informational",
   "Every year, the Arctic tern makes the longest journey of any animal on earth.\n\nThe bird breeds in the far north during the northern summer. When the days shorten, it flies south — not to a warmer state, but all the way to Antarctica, arriving in time for the southern summer. Then it turns around and does it again.\n\nA single tern travels roughly 44,000 miles in a year. Because it follows summer around the planet, it sees more daylight than any other creature alive.\n\nThe birds do not fly in a straight line. They ride wind patterns out over the open ocean, curving thousands of miles out of their way because the winds there push them along faster. Going the long way, it turns out, gets them there sooner.\n\nA tern may live thirty years. Over a lifetime, its travels could reach the moon and back three times.",
   [["Where does the Arctic tern fly for the southern summer?",["the tropics","Antarctica","the Arctic","North America"],1],
    ["Why do terns curve far out over the ocean instead of flying straight?",["to find food","the winds there push them along faster","to avoid predators","to rest on islands"],1],
    ["What does the passage mean by 'it sees more daylight than any other creature alive'?",["it has better eyesight","by following summer, it lives in long days year-round","it never sleeps","it flies only in daytime"],1]]],

  7:["The Gift Nobody Saw","Literature",
   "Every Saturday, someone left firewood stacked by the Aldens' back door.\n\nThe family had fallen on hard times that winter. Mr. Alden had been laid off in October, and the woodpile had run low by December. Then, one Saturday morning, there it was: a neat stack of split oak, enough for a week.\n\nIt happened again the next week. And the next.\n\nMrs. Alden asked at church. Nobody knew. She asked the neighbors. Nobody knew.\n\nIn March, Mr. Alden found work again, and the wood stopped coming. It had never been mentioned by anyone, in any conversation, all winter.\n\nYears later, at a funeral for a quiet man named Tom Petrie who had lived alone at the end of the road, someone mentioned that he had owned a wood splitter and had never once used it for himself.\n\nMrs. Alden did not say anything. She just cried a little.",
   [["What did the Aldens find by their back door each Saturday?",["food","split firewood","money","letters"],1],
    ["Why did the wood stop coming in March?",["Tom Petrie moved away","Mr. Alden found work again","winter ended suddenly","the family asked him to stop"],1],
    ["What quality does this story most clearly show?",["generosity that does not want credit","hard work","honesty","patience"],0]]],

  8:["How Rivers Shape the Land","Informational",
   "Water looks gentle. Given enough time, it is the strongest carving tool on earth.\n\nA river carries more than water. It carries sand, gravel and small stones, and it drags them along its bed. Those stones scrape the rock beneath, a little at a time. One year's scraping is invisible. A million years of it cuts a canyon.\n\nRivers move fastest on the outside of a bend, so they cut into that bank hardest. On the inside of the bend the water slows and drops what it was carrying, building a sandbar. This is why rivers grow curvier over centuries, looping back and forth across their valleys.\n\nThe Colorado River has been cutting through the Grand Canyon for roughly six million years. It is now about a mile deep. The river did not move a mountain. It simply refused to stop.",
   [["What does a river use to scrape away rock?",["only water","sand, gravel and stones it carries","wind","ice"],1],
    ["Where does a river cut into its bank the hardest?",["the inside of a bend","the outside of a bend","the middle","the source"],1],
    ["What does the last sentence mean?",["rivers are lazy","slow, steady action over long time causes huge change","mountains cannot move","the river stopped"],1]]],

  /* ---- Unit 3 · Courage in the Crowd --------------------------------- */
  9:["The Girl Who Would Not Sit Down","Literature",
   "The classroom went quiet when Mr. Barrow announced the vote.\n\nA new boy named Ezra had joined in September. He spoke with an accent, wore the same brown coat every day, and ate lunch alone. Now the class was voting on who would be left off the field-trip bus for lack of seats, and someone had suggested Ezra, and hands were going up.\n\nMaya sat with her hands in her lap. Around her, arms rose one after another, and the room began to feel like a current pulling in one direction.\n\nThen she stood up.\n\n\"I'll give him my seat,\" she said. Her voice came out thinner than she wanted.\n\nNobody clapped. A few people laughed. Mr. Barrow looked at her for a long second and then wrote something on his clipboard.\n\nOn the morning of the trip, there were two extra seats on the bus. Nobody ever explained why.",
   [["Why was Ezra suggested to be left off the bus?",["he was late","he was new and sat alone, and the class was voting","he was sick","he did not want to go"],1],
    ["What does 'the room began to feel like a current pulling in one direction' mean?",["it was windy","everyone was going along with the same choice","the bus was moving","the room was cold"],1],
    ["What makes Maya's action brave?",["she shouted","she stood alone against what everyone else was doing","she was the oldest","she was the teacher's favorite"],1]]],

  10:["The Bird That Cannot Be Scared Off","Informational",
   "The honey badger is not large. A grown one weighs about as much as a medium dog. It is, by many accounts, the most stubborn animal in Africa.\n\nHoney badgers have loose, thick skin that lets them twist around inside their own hide when something bites them. Their skin is tough enough to resist bee stings, and they will tear open a beehive and eat their fill while being stung hundreds of times.\n\nThey have been recorded driving lions away from a kill — not by strength, but by refusing to leave. They simply keep coming back, snarling, until the larger animal decides the meal is not worth the trouble.\n\nScientists studying them describe the same behavior over and over: the honey badger does not calculate the odds. It has one strategy, and the strategy is persistence.",
   [["About how much does a grown honey badger weigh?",["as much as a lion","as much as a medium dog","as much as a mouse","as much as a person"],1],
    ["How do honey badgers drive lions away from a kill?",["by being stronger","by refusing to leave and coming back again and again","by hiding","by calling for help"],1],
    ["What does the word 'persistence' mean in this passage?",["cleverness","refusing to give up","great size","speed"],1]]],

  11:["Esther Before the King","Literature",
   "The law was clear: anyone who entered the king's inner court uninvited could be put to death. Anyone at all. Even the queen.\n\nEsther had been queen for five years. She had also kept a secret that whole time — she was a Jew, and a decree had just been signed ordering the death of every Jew in the kingdom.\n\nHer cousin Mordecai sent word: You are in the palace. Do not imagine you will escape. Perhaps you were brought here for exactly this moment.\n\nEsther sent back one instruction: fast for me, three days.\n\nOn the third day she put on her royal robes and walked into the inner court, unsummoned.\n\nThe king looked up. The whole room waited.\n\nHe extended his golden scepter toward her, and she was allowed to live, and to speak.",
   [["What was the penalty for entering the king's inner court uninvited?",["banishment","possible death","a fine","nothing"],1],
    ["What did Esther ask her people to do before she went?",["hide","fast for three days","fight","leave the kingdom"],1],
    ["What did Mordecai mean by 'perhaps you were brought here for exactly this moment'?",["it was luck","her position may have been given to her for this purpose","she should leave","the king would help"],1]]],

  12:["The Coldest Race Ever Run","Informational",
   "In January 1925, the town of Nome, Alaska, ran out of medicine during a diphtheria outbreak. Children were dying. The nearest supply was nearly seven hundred miles away, and the harbor was frozen solid. No ship could come. No plane of that era could fly in the weather.\n\nSo they used dogs.\n\nTwenty teams of sled dogs and their drivers ran the serum north in relay, handing it off team to team across the Alaskan interior. Temperatures dropped below minus fifty. One driver, Leonhard Seppala, crossed unstable sea ice in a blizzard to save time, a shortcut that could have killed his whole team.\n\nThe medicine reached Nome in five and a half days — a trip that normally took a month. It was still frozen, but it worked.\n\nA statue of one lead dog, Balto, stands in New York's Central Park today.",
   [["Why could no ship reach Nome?",["the harbor was frozen","there were no ships","it was too expensive","the town refused"],0],
    ["How was the serum carried to Nome?",["by plane","by sled dog teams running in relay","by train","by boat"],1],
    ["How long did the delivery take compared to normal?",["a month instead of five days","five and a half days instead of about a month","the same time","one day"],1]]],

  /* ---- Unit 4 · The Careful Craftsman -------------------------------- */
  13:["The Cabinet That Took a Year","Literature",
   "Grandpa Ruiz built one cabinet a year. Only one.\n\nWhen Lucia asked why he did not build more and sell them, he handed her a piece of sandpaper and pointed at a drawer front.\n\n\"Feel that,\" he said.\n\nShe ran her hand across it. It was smooth.\n\n\"Now feel here.\" He guided her fingers to the underside of the drawer — a place no one would ever see, inside a cabinet that would sit against a wall.\n\nIt was just as smooth.\n\n\"Nobody will ever look there,\" Lucia said.\n\n\"I will know,\" he said. \"And the wood will know. And whoever opens this drawer in eighty years, when I am gone, will run their hand under it looking for a rough spot, and there will not be one. That is the whole message.\"\n\nLucia sanded the underside of the next drawer for two hours.",
   [["How many cabinets did Grandpa Ruiz build each year?",["one","five","twelve","as many as he could"],0],
    ["Why did he sand a part nobody would see?",["it was required","because he would know, and the work should be honest throughout","to sell it for more","by accident"],1],
    ["What does this story say about doing careful work?",["speed matters most","quality matters even where no one is watching","only visible work counts","sanding is difficult"],1]]],

  14:["How a Bridge Holds Itself Up","Informational",
   "A bridge does not fight gravity. It redirects it.\n\nIn an arch bridge, the weight of everything above pushes down, and the curved shape turns that downward push into a sideways push traveling along the arch to solid ground at each end. Roman engineers understood this two thousand years ago. Some of their arch bridges still carry traffic today.\n\nA suspension bridge works the other way. Long cables hang between tall towers, and the roadway hangs from those cables. The weight pulls the cables tight, and the cables pull on the towers, and the towers press down into deep foundations.\n\nIn both designs, the trick is the same: no single piece carries the whole load. The force is shared across the structure and passed along to the ground.\n\nA bridge that tries to be strong in one place fails. A bridge that spreads the work stands.",
   [["In an arch bridge, what happens to the downward weight?",["it disappears","it becomes a sideways push traveling to the ground","it pushes upward","it is stored"],1],
    ["In a suspension bridge, what holds up the roadway?",["arches","cables hanging from towers","the water","stone pillars"],1],
    ["What is the main idea of this passage?",["Bridges are old","Bridges work by sharing force across the whole structure","Romans were good builders","Cables are strong"],1]]],

  15:["The Long Way Home","Literature",
   "Micah could have taken the shortcut. Everyone did. The path behind the Coles' barn cut fifteen minutes off the walk home from school.\n\nBut Mr. Cole had asked them not to. He had a sick horse in the back paddock, he said, and the noise unsettled her.\n\nMicah's friends kept using the shortcut anyway. Mr. Cole was old and never came out. Nobody would know.\n\nFor three weeks Micah walked the long way, alone, while his friends disappeared through the gap in the hedge.\n\nIn April, Mr. Cole flagged him down at the fence.\n\n\"You are the boy who goes around,\" he said. It was not a question.\n\nMicah nodded, embarrassed.\n\nMr. Cole was quiet for a moment. \"The mare foaled last week,\" he said. \"Come see her. Bring nobody else.\"",
   [["Why had Mr. Cole asked the children not to use the shortcut?",["it was dangerous","a sick horse was unsettled by the noise","it was private property","it was muddy"],1],
    ["What did Micah's friends do?",["walked with him","kept using the shortcut anyway","told Mr. Cole","stopped walking home"],1],
    ["Why does Mr. Cole invite only Micah?",["he dislikes the others","he noticed Micah's honesty when nobody was watching","Micah asked to come","Micah lives closest"],1]]],

  16:["The Machine With No Wasted Motion","Informational",
   "A hummingbird's wings beat about fifty times every second. Holding still in the air costs more energy, pound for pound, than almost anything else an animal does.\n\nTo pay for it, a hummingbird must eat roughly half its body weight in nectar daily, visiting well over a thousand flowers. It has almost no room for error.\n\nSo its body wastes nothing. Its wings rotate in a figure eight, generating lift on both the forward stroke and the backward stroke — most birds only get lift going one way. Its heart beats over twelve hundred times a minute while flying. At night, when it cannot feed, it drops into a state called torpor, slowing its heart and cooling its body to save fuel until morning.\n\nEvery part of the design answers the same question: how do you keep going when you cannot afford to stop?",
   [["About how many times per second do a hummingbird's wings beat?",["five","fifty","five hundred","twelve hundred"],1],
    ["What does the word 'torpor' mean in this passage?",["fast flying","a slowed state that saves energy at night","a kind of flower","a type of nest"],1],
    ["Why does the hummingbird get lift on both strokes?",["its wings rotate in a figure eight","it is very light","it flies downward","it has large wings"],0]]],

  /* ---- Unit 5 · Honest Words ----------------------------------------- */
  17:["What the Receipt Said","Literature",
   "The cashier handed Jonah too much change. He noticed on the sidewalk: a twenty where a ten should have been.\n\nHis first thought was that it was not his mistake. His second thought was that the store made plenty of money. His third thought was of his father saying, years ago, \"You find out what a person is when it costs them something.\"\n\nHe went back in. The line was six people long now.\n\nWhen he finally reached the front, the cashier — a young woman with tired eyes — went pale as he explained.\n\n\"They take it out of my pay,\" she said quietly. \"Every register shortage. I've had two this month.\"\n\nJonah had not known that. He had thought he was being honest with a store.\n\nHe walked out understanding something he had not walked in with: honesty is almost never only about money.",
   [["What mistake did the cashier make?",["gave too little change","gave a twenty instead of a ten","charged the wrong price","forgot the receipt"],1],
    ["Why did the shortage matter so much to the cashier?",["she would be fired","the shortage came out of her own pay","she would be embarrassed","she had to stay late"],1],
    ["What did Jonah realize at the end?",["stores are wealthy","honesty affects real people, not just businesses","he should not shop there","he lost money"],1]]],

  18:["The Man Who Mapped the Cholera","Informational",
   "In 1854, a deadly outbreak swept a London neighborhood. Most doctors believed disease traveled through bad-smelling air.\n\nA physician named John Snow doubted it. Instead of arguing, he walked the streets with a map.\n\nHe marked every death as a small bar on the map, house by house. As the marks accumulated, a shape appeared: the deaths clustered tightly around a single public water pump on Broad Street. Households that drew water elsewhere were largely spared. A nearby brewery, where the workers drank beer rather than pump water, lost almost no one.\n\nSnow brought his map to the local officials and asked them to remove the pump handle. They did. The outbreak faded.\n\nHe had not won the argument with a better speech. He had won it by gathering evidence and letting anyone who looked at the map see the same thing he saw.",
   [["What did most doctors in 1854 believe caused the disease?",["dirty water","bad-smelling air","rats","cold weather"],1],
    ["What did John Snow do instead of arguing?",["left the city","mapped every death to find a pattern","wrote a book","closed the brewery"],1],
    ["Why did the brewery workers mostly avoid the illness?",["they were stronger","they drank beer rather than water from the pump","they lived far away","they were vaccinated"],1]]],

  19:["The Note in the Locker","Literature",
   "Somebody had written something cruel about Priya on the back wall of the gym.\n\nBy lunch, everyone had seen it. By the end of the day, three different people had told Coach Nowak that they knew who did it, and all three had named different students.\n\nCoach Nowak called each of them in.\n\n\"Did you see it happen?\" he asked the first.\n\n\"No, but everybody says —\"\n\n\"That is not what I asked.\"\n\nHe asked the second. Same answer. He asked the third.\n\nThe third boy, Andre, was quiet for a moment. \"No, sir,\" he said. \"I don't actually know. I just repeated what I heard.\"\n\n\"Thank you,\" Coach Nowak said. \"That is the first honest thing anybody has told me today.\"\n\nThey never did find out who wrote it. But nobody repeated a name again.",
   [["How many students named a suspect to Coach Nowak?",["one","two","three","four"],2],
    ["What made Andre's answer different?",["he named someone","he admitted he did not actually know","he saw it happen","he refused to speak"],1],
    ["What is the central message of this story?",["Gym walls should be repainted","Repeating what you heard is not the same as knowing it","Coaches are strict","Somebody always gets caught"],1]]],

  20:["How a Dictionary Gets Made","Informational",
   "A dictionary is not a list of what words should mean. It is a record of how people actually use them.\n\nLexicographers — the people who write dictionaries — spend their days reading. They read newspapers, novels, menus, court records and instruction manuals, watching for words used in new ways. When they find one, they save the sentence as a citation.\n\nA word does not enter the dictionary because someone likes it. It enters when there is enough evidence: many citations, from many different writers, over a stretch of years. That is why slang a teenager invents this month will not appear next month, and may never appear at all.\n\nWhen the editors finally write the definition, they are describing what the evidence shows. If people begin using a word differently in twenty years, the entry will change. The dictionary follows the language, not the other way around.",
   [["What is a citation, in this passage?",["a fine","a saved sentence showing a word in use","a definition","a spelling"],1],
    ["What does a word need before it enters the dictionary?",["a famous supporter","enough evidence from many writers over years","a vote","a new spelling"],1],
    ["What is the main idea?",["Dictionaries decide what words mean","Dictionaries record how people actually use words","Slang is bad","Editors read novels"],1]]],

  /* ---- Unit 6 · Belonging To ----------------------------------------- */
  21:["Ruth's Choice","Literature",
   "The road forked outside Moab, and Naomi stopped walking.\n\nShe had lost her husband and both her sons. She was going home to Bethlehem with nothing, and she turned to her two daughters-in-law and told them to go back. Back to their mothers' houses. Back to their own people, where they might marry again and be safe.\n\nOrpah wept, kissed her, and went.\n\nRuth did not move.\n\nNaomi tried again, more sharply. There was nothing for Ruth in Bethlehem. No family. No standing. She would be a foreigner.\n\nRuth answered quietly, and what she said was not a plan or an argument. It was a decision about belonging: where you go, I will go. Your people will be my people.\n\nThey walked into Bethlehem together at the start of the barley harvest, two widows with nothing, and Ruth went out the next morning to glean in the fields.",
   [["Why did Naomi tell her daughters-in-law to go back?",["she was angry","she had nothing to offer them and they might remarry safely","they walked too slowly","they were not welcome"],1],
    ["What did Orpah do?",["stayed with Naomi","wept, kissed her, and returned home","went to Bethlehem first","refused to speak"],1],
    ["What does Ruth's answer show about her?",["she had a clever plan","she chose to belong to Naomi's people whatever it cost","she was afraid to travel alone","she expected wealth"],1]]],

  22:["The Wolves and the Elk","Informational",
   "When wolves were removed from Yellowstone National Park in the 1920s, nobody expected the rivers to change.\n\nWithout wolves, the elk population grew and grew. The elk stood in the valleys and ate young willow and aspen shoots faster than they could grow. The streambanks, once held together by roots, began to crumble and wash away.\n\nIn 1995, wolves were brought back. The elk did not simply decline in number — they changed their behavior, avoiding the open valleys where they could be caught. The willows and aspens grew back. Beavers, who need willow, returned and built dams. The dams made ponds. The ponds brought fish, and ducks, and otters.\n\nAnd the tree roots gripped the banks again, so the rivers narrowed and steadied.\n\nEcologists call this a trophic cascade: one change moving through a whole web of living things that belong to each other.",
   [["What happened to the elk population after wolves were removed?",["it shrank","it grew a great deal","it stayed the same","the elk left the park"],1],
    ["What does 'trophic cascade' mean in this passage?",["a waterfall","one change moving through a whole web of living things","a type of wolf","a kind of tree"],1],
    ["Why did beavers return?",["hunters left","willow trees grew back","the water warmed","wolves brought them"],1]]],

  23:["The Name on the Cup","Literature",
   "The coffee shop wrote names on cups. Amara had spelled hers out loud a hundred times and gotten back Amara, Amora, Tamara, and once, mysteriously, Brian.\n\nShe had stopped correcting people. It seemed easier.\n\nThen a new barista started. When Amara ordered, he stopped, set down the marker, and said, \"Say it again for me?\"\n\nShe said it.\n\n\"A-MA-ra,\" he repeated. \"Stress on the second part?\"\n\n\"Yes.\"\n\nHe wrote it carefully and handed it over.\n\nIt was a small thing. Amara carried the cup to her table and found that she felt oddly steadier than she had all week, and it took her a while to work out why.\n\nHer grandmother had chosen that name. Somebody getting it right meant her grandmother's choice had survived the trip across an ocean and two generations, and still arrived intact.",
   [["What had Amara stopped doing?",["ordering coffee","correcting people who got her name wrong","spelling her name","visiting the shop"],1],
    ["What did the new barista do differently?",["gave her free coffee","asked her to say her name again and learned it","wrote nothing","remembered her order"],1],
    ["Why did the correctly spelled name matter so much to her?",["it was faster","her grandmother chose it, and getting it right honored that","she disliked the old baristas","she collected cups"],1]]],

  24:["Why Geese Fly in a V","Informational",
   "A flock of geese in a V is not showing off. It is sharing work.\n\nAs a goose flaps, its wingtips push air downward and outward, creating a small swirl of rising air just behind and to the side. A bird flying in that spot gets lifted slightly for free. Positioned correctly, a goose can save a meaningful share of the energy it would burn flying alone.\n\nThe bird at the point of the V gets no such help. It does the hardest work. So the flock rotates — when the leader tires, it drops back into the formation and another takes the front.\n\nResearchers have measured heart rates in flight and found them lowest for birds in the middle positions and highest at the point, exactly as expected.\n\nThe formation only works because no single bird is asked to lead the whole way.",
   [["Which bird in the V does the hardest work?",["the last one","the one at the point","the middle ones","they are equal"],1],
    ["What happens when the leader gets tired?",["the flock lands","it drops back and another bird takes the front","it flies alone","the flock stops"],1],
    ["What did researchers find when measuring heart rates?",["all birds were the same","heart rates were highest at the point and lowest in the middle","heart rates were highest in the middle","geese have slow hearts"],1]]],

  /* ---- Unit 7 · Roots and Branches ----------------------------------- */
  25:["The Word Detective","Literature",
   "Sam hated vocabulary lists. Twenty words every Monday, a test every Friday, forgotten by Saturday.\n\nThen Mrs. Okafor did something different. She wrote one word on the board — PORT — and underneath it: to carry.\n\n\"Now,\" she said. \"Transport.\"\n\n\"Carry across?\" someone guessed.\n\n\"Import.\"\n\n\"Carry in!\"\n\n\"Export. Portable. Porter. Deport. Support.\"\n\nThe class got faster. Sam realized he was working out words he had never studied, from a root he had learned four minutes ago.\n\n\"There are about a hundred roots that unlock thousands of English words,\" Mrs. Okafor said. \"You can memorize twenty words a week for the rest of your life, or you can learn the roots and get them by the hundred.\"\n\nSam wrote PORT in his notebook and drew a small tree around it, with branches.",
   [["What does the root PORT mean?",["to see","to carry","to build","to speak"],1],
    ["What does 'import' mean, using the root?",["carry out","carry across","carry in","carry under"],2],
    ["What is Mrs. Okafor's main point?",["memorizing lists is best","learning roots unlocks many words at once","vocabulary tests are unfair","English is difficult"],1]]],

  26:["The Oldest Living Things","Informational",
   "High in the White Mountains of California grow bristlecone pines. Some are more than four thousand years old — alive when the pyramids were being built.\n\nThey do not survive by growing fast. They survive by growing almost unbelievably slowly, in the worst soil on the mountain, where almost nothing else will compete with them. In a bad year, a bristlecone may add a layer of wood thinner than a sheet of paper.\n\nThat slowness makes their wood incredibly dense — so dense that insects and rot cannot get in. A bristlecone that dies may stand for another thousand years without falling.\n\nScientists read their rings like a record book. Because each ring is one year, and rings from overlapping trees can be matched together, bristlecones have given researchers a continuous year-by-year weather record stretching back nearly nine thousand years.",
   [["How do bristlecone pines survive so long?",["by growing very fast","by growing extremely slowly in harsh soil","by growing in rich valleys","by staying small"],1],
    ["Why can insects and rot not get into bristlecone wood?",["it is poisonous","slow growth makes the wood extremely dense","it is too cold","the bark is thick"],1],
    ["What can scientists learn from the rings?",["the tree's name","a year-by-year weather record going back thousands of years","how tall it will grow","where seeds fell"],1]]],

  27:["The Boy Who Rebuilt the Wall","Literature",
   "The wall around the city had been broken for a hundred and forty years. People had grown used to the gaps.\n\nNehemiah was a cupbearer to a foreign king — a comfortable job, far away. When travelers brought news of the ruined wall, he wept, and then he did something more useful than weeping: he asked for time off, letters of permission, and timber.\n\nIn Jerusalem he rode out at night, alone, and inspected every break in the wall before saying a word to anyone. Only then did he call the people together.\n\nHe did not assign the work by skill. He assigned it by address. Each family repaired the section in front of their own house.\n\nEnemies mocked them. Some workers built with one hand and held a weapon in the other.\n\nThe wall was finished in fifty-two days.",
   [["What was Nehemiah's job before he went to Jerusalem?",["a builder","a cupbearer to a foreign king","a soldier","a farmer"],1],
    ["What did Nehemiah do before telling anyone his plan?",["called a meeting","inspected the broken wall at night alone","hired workers","wrote a letter"],1],
    ["How did he assign the work?",["by skill","by age","by address — each family fixed the part by their own house","at random"],2]]],

  28:["How Salt Changed the World","Informational",
   "For most of history, salt was not seasoning. It was survival.\n\nBefore refrigeration, salt was the only reliable way to keep meat and fish from spoiling. A community without salt could not store food through winter or carry provisions on a long journey. Whole economies grew around it.\n\nRoman soldiers were sometimes paid partly in salt or given an allowance to buy it. The Latin word for that allowance was salarium — and it is where the English word salary comes from. When we say someone is worth their salt, we are repeating a two-thousand-year-old idea.\n\nSalt roads crossed Africa and Europe. Cities were founded on salt deposits. Wars were fought over salt taxes; India's independence movement included a famous march to the sea to make salt in defiance of British law.\n\nA mineral we now spill without noticing once decided where people could live.",
   [["Why was salt essential before refrigeration?",["it tasted good","it was the main way to keep food from spoiling","it was rare","it made roads"],1],
    ["What English word comes from the Latin salarium?",["salad","salary","sailor","saline"],1],
    ["What does the last sentence suggest?",["salt is worthless now","something now common was once so vital it shaped where people settled","salt should cost more","people waste salt"],1]]],

  /* ---- Unit 8 · More Than It Says ------------------------------------ */
  29:["The Lost Sheep","Literature",
   "A shepherd counted his flock at dusk, the way he did every evening. Ninety-eight. Ninety-nine.\n\nHe counted again. Ninety-nine.\n\nOne was missing.\n\nAny reasonable person would have done the arithmetic. Ninety-nine safe sheep in the fold, one wandering somewhere in the dark hills where there were wolves and cliffs and cold. The sensible thing was to shut the gate.\n\nHe left the ninety-nine and went out.\n\nHe searched half the night. When he found her — tangled in a thicket, exhausted, too frightened to move — he did not scold her and he did not drive her home ahead of him. He lifted her across his shoulders and carried her the whole way back.\n\nWhen he reached the village he woke his neighbors, which no reasonable person does either, and told them to celebrate with him, because what was lost had been found.",
   [["How many sheep were safe in the fold?",["one","ninety-eight","ninety-nine","one hundred"],2],
    ["What did the shepherd do when he found the lost sheep?",["scolded her","drove her home ahead of him","carried her on his shoulders","left her there"],2],
    ["This story means more than it says. What is it really about?",["counting animals","how much a single lost one is valued","sheep farming at night","the danger of wolves"],1]]],

  30:["Reading the Sky","Informational",
   "Long before weather forecasts, sailors and farmers read clouds — and much of what they learned holds up.\n\nHigh, wispy cirrus clouds are made of ice crystals miles up. They often arrive a day or so ahead of a warm front, which is why the old saying warns that a mackerel sky means rain within a day. There is real physics behind it.\n\nTall, dark cumulonimbus clouds with flat anvil tops are storm clouds. The anvil forms where the rising column of air hits a ceiling in the atmosphere and spreads sideways, unable to climb further.\n\nA red sky at sunset often means clear air to the west, where weather usually comes from in the middle latitudes — so red sky at night, sailor's delight has a reason behind it too.\n\nThe old sayings were not superstition. They were centuries of careful observation, compressed into rhyme so people could remember them.",
   [["What are cirrus clouds made of?",["water droplets","ice crystals","dust","smoke"],1],
    ["Why does a cumulonimbus cloud form a flat anvil top?",["wind blows it flat","rising air hits a ceiling and spreads sideways","it is very cold","rain weighs it down"],1],
    ["What is the main idea of this passage?",["Old weather sayings are superstition","Old weather sayings compress real observation into rhyme","Clouds are unpredictable","Sailors invented forecasting"],1]]],

  31:["The Talents","Literature",
   "Before a long journey, a man divided money among three servants — five bags to one, two to another, one to the last — and left.\n\nThe first servant traded with his five and made five more. The second did the same with his two.\n\nThe third dug a hole and buried his one bag in the ground, where it would be perfectly safe.\n\nWhen the master returned, the first two showed him what they had made, and he was delighted with both. He did not praise the larger amount over the smaller. He said the same words to each of them.\n\nThe third servant explained himself. He had been afraid. He had not wanted to lose anything. Here was the bag, exactly as it had been given, not one coin missing.\n\nThe master was not pleased. Nothing had been lost — but nothing had been risked, and nothing had grown.",
   [["What did the third servant do with his bag?",["traded with it","buried it in the ground","gave it away","lost it"],1],
    ["How did the master respond to the first two servants?",["he praised the larger amount more","he said the same words to both","he was disappointed","he said nothing"],1],
    ["What is the story really about?",["burying money is unsafe","using what you are given rather than hiding it out of fear","the value of gold","how to trade"],1]]],

  32:["The Words We Use for Rain","Informational",
   "English has a great many words for rain, and they are not interchangeable.\n\nA drizzle is fine and steady. A shower is brief and may pass in minutes. A downpour is heavy and sudden. A deluge suggests flooding. A monsoon is a seasonal wind system that brings months of rain to a whole region.\n\nSpeakers choose between these without thinking, but the choice carries real information. Saying it drizzled tells a listener something different from saying it poured, even though both mean water fell from the sky.\n\nThis is called shades of meaning, and every subject has it. A writer who reaches for the exactly right word is not showing off. They are being precise — handing the reader a sharper picture than a general word would.\n\nA vague word makes the reader guess. A precise word makes them see.",
   [["Which word suggests rain heavy enough to cause flooding?",["drizzle","shower","deluge","mist"],2],
    ["What does 'shades of meaning' refer to?",["colors of clouds","small differences between related words","rainfall amounts","weather forecasts"],1],
    ["According to the passage, why should a writer choose a precise word?",["to sound intelligent","to give the reader a sharper picture","to use longer words","to fill space"],1]]],

  /* ---- Unit 9 · Tell It Well ----------------------------------------- */
  33:["The Question That Started It","Literature",
   "Ada's report topic was supposed to be simple: pick an animal.\n\nShe picked the axolotl because it looked like it was smiling. Then she read one sentence that changed the assignment: an axolotl can regrow a lost leg, and not just the leg — the bone, the muscle, the nerves, correctly arranged.\n\nAda stopped and read it three times.\n\nShe filled two pages of notes and found she now had a question instead of a topic: why can this animal do that when we cannot?\n\nThe library books did not agree with each other. One said scientists fully understood the process. A newer one said they did not. Ada wrote down both, with the dates, because her teacher had said that when sources disagree you say so rather than pick the one you like.\n\nHer report was not the longest in the class. It was the only one that ended with a question nobody had answered yet.",
   [["Why did Ada originally choose the axolotl?",["it was rare","it looked like it was smiling","her teacher assigned it","it was in the first book"],1],
    ["What did Ada do when her sources disagreed?",["picked the one she liked","wrote down both, with the dates","stopped researching","asked a friend"],1],
    ["What made Ada's report different from the others?",["it was the longest","it ended with a question nobody had answered","it had pictures","it was finished first"],1]]],

  34:["How Scientists Check Each Other","Informational",
   "A scientific discovery is not finished when the scientist believes it. It is finished when other people cannot break it.\n\nWhen researchers complete a study, they write it up and send it to a journal. Editors send that write-up to other experts in the same field — often without naming the author — and those experts try to find the holes. Is the sample large enough? Could something else explain the result? Were the measurements fair?\n\nThis is called peer review, and most submissions come back demanding changes. Many are rejected outright.\n\nEven after publication, the checking continues. Other laboratories attempt to repeat the experiment. A result that cannot be reproduced by anyone else is treated with suspicion, no matter how famous the scientist who first reported it.\n\nThe system is slow and often frustrating. It is also the main reason science corrects its own mistakes.",
   [["What is peer review?",["scientists voting","other experts examining a study for weaknesses","publishing quickly","repeating an experiment"],1],
    ["What happens to a result other laboratories cannot reproduce?",["it is celebrated","it is treated with suspicion","it is published again","it is ignored entirely"],1],
    ["According to the passage, what is the main benefit of this slow system?",["it makes scientists famous","it lets science correct its own mistakes","it saves money","it speeds up discovery"],1]]],

  35:["The Speech He Almost Did Not Give","Literature",
   "Theo had written four paragraphs and rewritten them nine times.\n\nHis topic was the community garden his neighborhood wanted to close. He had counted the plots. He had interviewed two families who grew food there because groceries were expensive. He had a paragraph of facts, a paragraph of interviews, and a paragraph about what would replace it — a parking lot for eleven cars.\n\nStanding outside the meeting room, he felt his introduction fall out of his head entirely.\n\nHis mother said, \"You are not performing. You are telling them something they do not know.\"\n\nHe walked in and told them. He went slower than he had practiced. When a woman asked how many families used the garden, he said nineteen, because he had counted, and he could say it without guessing.\n\nThe vote was postponed for further study. It was not a victory. It was a delay, which was what he had actually asked for.",
   [["How many paragraphs had Theo written?",["two","three","four","nine"],2],
    ["Why could Theo answer the woman's question confidently?",["he guessed well","he had actually counted the families","his mother told him","he read it somewhere"],1],
    ["What was the outcome of the meeting?",["the garden was saved permanently","the vote was postponed for further study","the garden closed","nothing happened"],1]]],

  36:["What a Year of Reading Does","Informational",
   "Reading changes the brain in ways that can be measured.\n\nWhen researchers scan the brains of experienced readers, they find a region on the left side that has been partly repurposed for recognizing letters and words. Nobody is born with it. It develops through practice, and it develops differently depending on the writing system a person learns.\n\nVocabulary grows the same way — mostly through reading rather than conversation. Everyday speech recycles a fairly small set of common words. Books introduce rarer ones, in context, over and over, which is how most people learn the bulk of the words they know without ever looking them up.\n\nStudies also find that people who read fiction score somewhat higher on tests of understanding what others are feeling. Following a character's thinking for three hundred pages appears to be practice for following a real person's.\n\nA year of reading is not just a year of stories. It is a year of building equipment you will use for the rest of your life.",
   [["Where does the brain region for recognizing words develop?",["people are born with it","it develops through reading practice","only in childhood sleep","in the right side only"],1],
    ["According to the passage, how do most people learn rare words?",["by looking them up","through reading them in context repeatedly","in conversation","in school lessons only"],1],
    ["What is the main idea of this passage?",["Fiction is better than nonfiction","Reading physically and mentally builds lasting abilities","Brain scans are accurate","Conversation is unimportant"],1]]]
  };

  function passageFor(week){
    const r = P[week];
    if(!r) return null;
    const spine = (window.__CURR.LA_Y1 && window.__CURR.LA_Y1.WEEKS) || [];
    const wk = spine.find(w=>w.n===week);
    return {
      id: "la-y1-w"+week+"-reading",
      w: week,
      title: r[0],
      type: r[1],
      label: r[1]+": \""+r[0]+"\"",
      text: r[2],
      readAloud: "Read this out loud once before you answer. Go slowly enough to say every word clearly.",
      unit: wk ? wk.unit : null,
      questions: r[3].map((q,i)=>({
        id: "la-y1-rd-w"+week+"-q"+(i+1),
        type: "multiple-choice",
        t: i===0 ? 0 : i===r[3].length-1 ? 2 : 1,
        q: q[0], options: q[1], a: q[2]
      }))
    };
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y1 = Object.assign(window.__CURR.LA_Y1||{}, {PASSAGE_ROWS: P, passageFor});
})();
