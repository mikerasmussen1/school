/* ============================================================================
 * WORD VOYAGERS — THE FACT AT THE END
 * ----------------------------------------------------------------------------
 * A Pokémon fact, shown once the day's lesson is finished. It is a reward, so
 * it is only unlocked by completing the work — a reward handed over first is
 * just decoration.
 *
 * EACH FACT MATCHES THE DAY'S LESSON, which is the part that makes this worth
 * building rather than bolting a random fact on the end:
 *
 *   Mon  what the passage actually says      -> precise, checkable numbers
 *   Tue  words you had to work out           -> where a name comes from
 *   Wed  what it shows without saying        -> something the games never state
 *   Thu  why the writer put that there       -> why a designer chose something
 *   Fri  what it is really about             -> an idea running underneath
 *
 * Tuesday is the one that earns its place. Pokémon names are built from the
 * same Greek and Latin roots the curriculum teaches in weeks 25 to 27 —
 * Aerodactyl is air plus finger, Lapras is a borrowing, Exeggutor is a pun a
 * child can take apart. A vocabulary lesson that ends in etymology is not a
 * change of subject.
 *
 * EIGHTEEN FACTS PER PURPOSE, each tagged with a topic so the same lesson day
 * does not always bring the same kind of fact. Across the five purposes the
 * topics run: mascot, colours, Poké Balls, legendaries, villains, rivals,
 * starters, evolution, moves, items, backstory, design, regions, music,
 * phrases, records, odds, types, battling, lore and the games themselves.
 * Etymology is still the largest single group on Tuesday, because that is the
 * day it genuinely belongs to.
 *
 * The cycle runs eighteen weeks, and the two boys are offset by nine, so they
 * are never on the same fact on the same day and each sees every fact twice
 * across the year.
 *
 * ON ACCURACY. These are stated as facts, so they are drawn from what is
 * long-established and widely documented rather than from anything marginal or
 * recently changed. Where something is a designer's stated intention rather
 * than a rule of the games, the wording says so.
 *
 * FORMAT  purpose: [ [topic, fact, the tie back to the lesson, [joke setup, punchline]] ]
 * ==========================================================================*/
(function(){

  /* [topic, fact, how it ties back to today's lesson, [joke setup, punchline]] */
  const FACTS = {

    /* MONDAY — what the passage actually says. Precise, checkable detail. */
    says: [
      ["Evolution","Magikarp learns Splash, a move that does nothing, and cannot learn a damaging move until it evolves at level 20.","A precise number, like a sentence you can point at.",
       ["Why did Magikarp fail its spelling test?", "It only knew how to make a Splash."]],
      ["The games","There were 151 Pokémon in the first games. There are now well over a thousand.","Exact counts, not 'lots' — the difference the lesson is about.",
       ["Why did the Pokédex go to the gym?", "It had to get strong enough to carry over a thousand Pokémon."]],
      ["Records","Wailord is the longest Pokémon at 14.5 metres, yet weighs less than Groudon, which is a third its size.","Two facts that sound contradictory until you read them properly.",
       ["Why doesn't Wailord worry about the scales?", "It's the longest whale around, but it's lighter than it looks."]],
      ["Oddities","Shedinja always has exactly 1 hit point, however it is raised.","Always exactly one. No 'usually'.",
       ["Why does Shedinja never argue about its health?", "It only has one point to make."]],
      ["Odds","A shiny Pokémon appeared roughly once in 8,192 encounters in the older games.","A number worth quoting exactly rather than calling 'rare'.",
       ["Why are shiny Pokémon so hard to find?", "The odds are one in eight thousand, and they're never home when you call."]],
      ["Pokédex","Slowpoke's Pokédex entry says it takes five seconds for it to feel pain.","The entry says five. Not 'a while'.",
       ["Why did Slowpoke laugh at the joke five seconds late?", "That's how long it takes for anything to reach it."]],
      ["Moves","Ditto and Mew are the only Pokémon that learn Transform naturally.","Only two. A claim precise enough to be wrong, which is what makes it useful.",
       ["What is Ditto's favourite school subject?", "Copying."]],
      ["Legendaries","Arceus changes type depending on the plate it holds, giving it eighteen possible types.","Eighteen, countable.",
       ["Why can't Arceus decide what to wear?", "It has eighteen types to choose from."]],
      ["Poké Balls","A Great Ball works better than a Poké Ball, and an Ultra Ball better still. The order is fixed.","An order you can state exactly.",
       ["Why did the Poké Ball feel left out?", "Everyone said the Great Ball was great and the Ultra Ball was even better."]],
      ["Colours","Every Pokémon is filed in the Pokédex under one of ten colour groups, including 'brown' and 'purple'.","Ten. A category, not an impression.",
       ["Why does the Pokédex sort Pokémon by colour?", "So it can tell them apart at a glance. A real shade of genius."]],
      ["Records","Onix is 8.8 metres long, one of the longest Pokémon of the first generation.","A measurement, quoted.",
       ["Why is Onix bad at keeping secrets?", "Everything it says is set in stone."]],
      ["Pokédex","Chansey's entries say it lays an egg every day.","Every day. The entry is specific, so the retelling should be too.",
       ["What did Chansey say about the hard test?", "Take your time. I brought an egg."]],
      ["Evolution","Eevee has more evolutions than any other Pokémon, and they branch rather than follow one line.","'Branches' is a precise word. 'Lots' is not.",
       ["Why did Eevee struggle to choose a topic?", "There were too many ways to go."]],
      ["Types","There are eighteen types. Fairy was added years after the first games, bringing it from seventeen.","A number that changed, which is why you check rather than remember.",
       ["Why was Fairy the last type to join?", "It was waiting for the magic moment."]],
      ["Starters","Every main game gives you a choice of three starters: one Grass, one Fire, one Water.","Three, in that pattern, every time.",
       ["Why do starters always come in threes?", "Grass, Fire and Water can never agree on who goes first."]],
      ["Villains","Team Rocket's leader Giovanni is also the eighth Gym Leader, in Viridian City.","Two roles, one person. Easy to miss if you skim.",
       ["Why is Giovanni's Gym the very last one?", "He needed time to finish his other job."]],
      ["Mascot","Pikachu is Pokémon number 25 in the Pokédex, not number 1.","The famous one is not the first one.",
       ["Why isn't Pikachu number 1 in the Pokédex?", "It's too busy being number 1 everywhere else."]],
      ["Battling","A Pokémon can hold only four moves at once, so learning a fifth means forgetting one.","Exactly four. The limit is the rule.",
       ["Why do Pokémon never carry a fifth move?", "Their pockets only hold four."]]
    ],

    /* TUESDAY — words you had to work out. Where names come from. */
    words: [
      ["Etymology","Aerodactyl is aero, Greek for air, joined to dactyl, finger — the same root as pterodactyl.","Two parts, each with a meaning, exactly like today's words.",
       ["Why is Aerodactyl good at pointing the way?", "Its name means air finger."]],
      ["Etymology","Bulbasaur is bulb plus the -saur of dinosaur, from the Greek sauros, lizard.","You can take the name apart the way you took apart today's words.",
       ["Why did Bulbasaur do well in the plants unit?", "It already knew how to grow."]],
      ["Etymology","Charizard joins char, to burn, with a clipped form of lizard.","Char is a real English word. That is the clue.",
       ["Why doesn't Charizard need a toaster?", "Its name already starts with char."]],
      ["Etymology","Exeggutor is a pun on egg and executor, with two g's doing the work.","A word can carry two meanings at once.",
       ["Why did Exeggcute work well in groups?", "There were six of them already."]],
      ["Etymology","Gengar is thought to come from doppelgänger, German for a ghostly double.","A borrowed word, like many English ones.",
       ["Why is Gengar never lonely?", "Its name comes from a ghostly double."]],
      ["Etymology","Lapras comes from the French la place, and it is the Pokémon you ride across water.","Knowing the root tells you what it does.",
       ["What do you call a Lapras that gives good summaries?", "A smooth crossing."]],
      ["Etymology","Arcanine contains canine, from the Latin canis, dog.","The root hides in the middle, not at the start.",
       ["Why did Arcanine get top marks in Latin?", "It already knew canine meant dog."]],
      ["Etymology","Abra, Kadabra and Alakazam are three pieces of 'abracadabra', split across one evolution line.","One word broken into three — a kind of prefix and suffix.",
       ["What does Abra say when it evolves twice?", "Abra... Kadabra... Alakazam!"]],
      ["Etymology","Squirtle joins squirt with turtle: two everyday words pushed together.","A compound word, the sort you studied in week 20.",
       ["What do you call a Squirtle that reads all day?", "A bookworm in a shell."]],
      ["Etymology","Psyduck begins with psy-, from the Greek psyche, mind — the root behind psychology.","A Greek root you will meet again in much harder words.",
       ["Why did Psyduck stop reading?", "All the thinking was giving it a headache."]],
      ["Phrases","'Gotta catch 'em all' is a contraction of 'got to catch them all' — three shortenings in five words.","Contractions, which you met in week 24.",
       ["Why did the trainer shorten \"got to catch them all\"?", "They were in too much of a hurry to catch 'em."]],
      ["Names","A Poké Ball is simply Pocket Monster Ball shortened, because 'Pokémon' itself is short for Pocket Monsters.","The whole franchise is named by clipping two words.",
       ["Why is it called a Poké Ball?", "Pocket Monster Ball was too long to fit on the ball."]],
      ["Etymology","Snorlax joins snore with a relaxed ending, and it does nothing but sleep.","The name states the behaviour before you see it.",
       ["What do you call a Snorlax that has finished all its work?", "Rested."]],
      ["Etymology","Jigglypuff is two describing words stuck together, and both describe how it looks.","Adjectives can become a name.",
       ["What is Jigglypuff's least favourite part of a lesson?", "The bit where everyone stays awake."]],
      ["Regions","Kanto, Johto and Hoenn are named after real regions of Japan.","Borrowed proper nouns, capitalised for the same reason yours are.",
       ["Why did the trainer bring a map of Japan?", "To find Kanto without getting lost."]],
      ["Etymology","Vaporeon, Jolteon and Flareon end in -eon, the shared ending that marks them as Eevee's line.","A suffix that tells you what family a word belongs to.",
       ["Why do Vaporeon, Jolteon and Flareon all end in -eon?", "It's been an eon since they agreed on anything else."]],
      ["Phrases","A Pokémon 'faints' rather than dies, in every game, deliberately and without exception.","One word choice, held to for thirty years.",
       ["Why don't Pokémon ever lose badly?", "They just faint and take a nap at the Pokémon Centre."]],
      ["Etymology","Kabutops takes its name from kabuto, the Japanese word for a samurai helmet.","A word borrowed whole from another language.",
       ["Why is Kabutops never worried in a storm?", "Its name already comes with a helmet."]]
    ],

    /* WEDNESDAY — what it shows without saying. Inference. */
    shows: [
      ["Backstory","Cubone wears the skull of its dead mother. The games never say so plainly — you assemble it from Pokédex entries and one scene in Lavender Town.","Shown, never stated. Exactly today's lesson.",
       ["Why was Cubone good at inference?", "It had learned a lot from very little."]],
      ["The games","Every Pokémon Centre heals your team for free, and nobody ever explains how or why.","You infer a whole world from what is left out.",
       ["Why is the Pokémon Centre so popular?", "The healing is free and nobody asks how."]],
      ["Items","The ghosts of Lavender Town can only be identified with the Silph Scope, which says something about fear and what you can see.","The game shows an idea rather than explaining it.",
       ["Why couldn't the trainer see the ghost in Lavender Town?", "They forgot the Silph Scope. A case of mistaken invisibility."]],
      ["Villains","Team Rocket grunts are never shown being paid, but they complain about their jobs constantly.","What people say sideways tells you more than a description.",
       ["Why do Team Rocket grunts complain so much?", "They blast off every day and never get paid for overtime."]],
      ["Evolution","Slowbro's entries suggest the Shellder biting its tail is what makes it stand upright.","The entry suggests. It does not state.",
       ["Why does Slowbro stand up so straight?", "Something has a very firm grip on its tail."]],
      ["Design","Sudowoodo is a Rock-type that looks like a tree, and it is weak to Water — which is how you find out.","The game lets you discover it rather than telling you.",
       ["Why did Sudowoodo run from the water?", "It's only pretending to be a tree."]],
      ["Backstory","The abandoned Mansion on Cinnabar Island tells Mewtwo's whole story through diary pages left lying around.","A story assembled from fragments, which is what inference is.",
       ["What does Mewtwo write in its notebook?", "Everything, twice, in case."]],
      ["Design","Drowzee borrows from the baku, a creature of Japanese folklore said to eat dreams.","The design tells you what it does without a word.",
       ["Why is Drowzee never hungry at bedtime?", "It eats dreams for a midnight snack."]],
      ["Moves","Wobbuffet cannot attack first. Every one of its main moves only responds.","What something cannot do tells you what it is.",
       ["Why doesn't Wobbuffet ever start an argument?", "It only ever answers back."]],
      ["Design","Parasect is controlled by the mushroom on its back, and its eyes are blank white.","The detail is the whole story, and nobody narrates it.",
       ["Who's really in charge of Parasect?", "The mushroom. It's a fungi to be around."]],
      ["Legendaries","The three legendary birds are never explained. They are simply there, one to each element.","A story can decline to explain something on purpose.",
       ["Why did Zapdos finish first?", "It works in flashes."]],
      ["Rivals","Your rival always picks the starter that beats yours. Nobody points this out.","A pattern you notice rather than are told.",
       ["Why does your rival always pick the starter that beats yours?", "They wait for you to choose first."]],
      ["Colours","Shiny Pokémon are a different colour and nothing else. No stat, no move, no advantage.","Something that looks significant and is not.",
       ["Why don't shiny Pokémon brag?", "A new colour doesn't make you any stronger."]],
      ["The games","Gym Leaders hand over badges willingly after losing, which tells you what the badges are for.","Behaviour carrying meaning the text never states.",
       ["What did the Gym Leader say about the essay?", "It earned its badge."]],
      ["Backstory","Blaine's Gym is on the same island as the laboratory that made Mewtwo, and he never mentions it.","What a character does not say is evidence too.",
       ["Why does Blaine ask so many riddles?", "So nobody asks about the lab on his island."]],
      ["Evolution","A Pokémon that evolves by trade cannot do it alone, however strong it gets.","A rule that quietly says something about people.",
       ["Why can't Kadabra evolve on its own?", "It needs a friend on the other end of the trade."]],
      ["Design","Koffing and Weezing both have skull-and-crossbones markings, which is a warning aimed at you.","A detail placed for the reader, not the world.",
       ["Why does Koffing wear a skull and crossbones?", "It's the polite way of saying \"stand back\"."]],
      ["Lore","No adult ever stops you leaving home at eleven with one Pokémon, and the games never remark on it.","The strangest things go unmentioned.",
       ["Why did the eleven-year-old pack only one Pokémon?", "The rest were still waiting to be caught."]]
    ],

    /* THURSDAY — why the writer put that there. Deliberate choices. */
    why: [
      ["Mascot","Pikachu was not the original mascot. Clefairy was planned for the anime, and Pikachu was chosen partly because its colour reads clearly at small sizes.","A detail chosen for a reason, like a word in a sentence.",
       ["What does Pikachu say when it gets the answer right?", "That's shocking."]],
      ["The games","The first games were Red and Green in Japan. Blue was a later, improved version.","Knowing why it changed explains what you have.",
       ["Why was Pokémon Blue made after Red and Green?", "They wanted a version that wasn't green around the edges."]],
      ["Design","Ken Sugimori drew the original artwork in watercolour, which is why the earliest art looks softer.","The method chosen shapes how the thing feels.",
       ["Why does the earliest Pokémon art look so soft?", "It was painted in watercolour. Very well brushed up."]],
      ["Backstory","Pokémon began with Satoshi Tajiri's childhood insect collecting, which is why catching matters more than fighting.","Where an idea comes from explains what it emphasises.",
       ["Why is Pokémon all about catching?", "Its creator started out catching bugs."]],
      ["The games","The Game Boy link cable is why trading exists: two players had to connect, so evolution by trade was built to use it.","A limitation turned into a feature, on purpose.",
       ["Why did Pokémon need a link cable?", "To stay connected with friends."]],
      ["Oddities","Missingno. exists because of an error in how the game generates Pokémon on certain shores — not by design.","Not every detail is a choice. Some are accidents, and telling them apart matters.",
       ["Why can't anyone find Missingno. in the Pokédex?", "It's always missing."]],
      ["Battling","Type advantages are built so no type is best, which stops any one team always winning.","A rule written to produce a feeling, not just a result.",
       ["Why is there no best type?", "Every type has something it's scared of."]],
      ["Design","Many designs come from real animals: Seel from a seal, Tangela from a tangle of vines, Krabby from a crab.","A detail borrowed from life so you recognise it instantly.",
       ["Why did Krabby fail comprehension?", "It kept going sideways."]],
      ["Design","Gyarados is based on a Chinese legend in which a carp that leaps a waterfall becomes a dragon.","The design carries a story never told in the game.",
       ["Why is Gyarados touchy about spelling?", "It used to be a Magikarp and nobody lets it forget."]],
      ["Design","Farfetch'd carries a leek because of a Japanese saying about a duck arriving with the onions to cook it with.","A joke only works if you know what it is made of.",
       ["Why did Farfetch'd bring a leek to school?", "For a well-seasoned argument."]],
      ["The games","The Pokémon Centre and the Poké Mart are always side by side, so a player never has to hunt for either.","A choice made for the reader's convenience.",
       ["What do you call the street with the Pokémon Centre and the Poké Mart on it?", "The best address in town."]],
      ["Starters","Starters are Grass, Fire and Water because those three beat each other in a ring, with no winner.","The shape of the choice is the point of the choice.",
       ["Why do Grass, Fire and Water never finish a race?", "They keep going round in circles."]],
      ["Poké Balls","The Master Ball never fails and you are given exactly one, which forces you to decide what it is for.","A limit that creates a decision.",
       ["Why did the trainer keep the Master Ball in a drawer?", "You only get one, so they were saving it for a rainy day."]],
      ["Colours","Each Gym Leader's town, badge and Pokémon share a colour, so you can tell at a glance what you are walking into.","A signal repeated until it teaches itself.",
       ["How can you tell you've reached Cerulean City?", "Everything is feeling a bit blue."]],
      ["Villains","Every villain team wants to control something enormous — the sea, the land, time itself — so that stopping them is always the same shape of story.","Repetition is a choice, not laziness.",
       ["Why do villain teams always want something enormous?", "Small plans don't make good boss battles."]],
      ["Music","Lavender Town has its own music, unlike any other town, and it is the only place you meet the dead.","Sound doing the work a sentence would otherwise do.",
       ["Why doesn't Lavender Town have a cheerful song?", "Nobody there is in the mood to dance."]],
      ["Design","Nurse Joy and Officer Jenny look identical everywhere because the anime needed familiar faces in unfamiliar towns.","A practical problem solved inside the story.",
       ["How do you tell Nurse Joy apart from her cousins?", "You don't. That's the whole point."]],
      ["Evolution","Most starters evolve at levels 16 and 36, which spaces the two moments across a whole game.","Pacing decided in advance, like paragraphs.",
       ["Why do starters evolve at level 16?", "They're finally old enough to get their licence."]]
    ],

    /* FRIDAY — what it is really about. Theme. */
    theme: [
      ["The games","The games are built so that running away is almost always allowed. Very little forces a fight.","What a story permits tells you what it values.",
       ["What's the fastest move in the whole game?", "Run away."]],
      ["Rivals","Your rival is not evil. He is simply faster than you, and that is a different kind of opponent.","A theme is rarely about good against bad.",
       ["Why is your rival always one step ahead?", "They left home before you finished breakfast."]],
      ["The games","Every Pokémon you catch can be released, and the game does not punish you for it.","What a story lets go of is part of what it means.",
       ["Why was the trainer so calm about releasing a Pokémon?", "It was a catch-and-release kind of day."]],
      ["Lore","The Pokédex is a research tool. The stated goal of the first games is to record, not to win.","The real aim is often not the obvious one.",
       ["Why did the trainer bring a notebook to the Gym?", "To take down some notes."]],
      ["Evolution","Pokémon that evolve through friendship cannot be forced to it by battling alone.","Some things only happen at their own pace.",
       ["How do you evolve a Pokémon through friendship?", "Be nice. It's not a battle."]],
      ["Villains","Team Rocket's plan always fails because they treat Pokémon as things to be sold.","Stories tend to punish the attitude they disagree with.",
       ["Why does Team Rocket's plan always fail?", "They keep blasting off again."]],
      ["The games","Trading is the only way to complete the Pokédex in the original games. You cannot finish alone.","A design that says something about people.",
       ["Why couldn't the trainer finish the Pokédex alone?", "Some Pokémon only turn up when you have a friend."]],
      ["Backstory","Mewtwo's story is about being made for someone else's purpose, and refusing it.","That sentence is a theme. 'A Pokémon escapes a lab' is a plot.",
       ["What did Mewtwo say to the scientists?", "\"I'll decide what I'm for, thanks.\""]],
      ["The games","Losing a battle costs money and a walk back, but never a Pokémon.","What a story refuses to take away is a choice.",
       ["Why are Pokémon trainers always short of money?", "They keep paying for their losses."]],
      ["Lore","The strongest Pokémon in the first games is not the one you are given, and never is.","Earning and receiving are treated differently throughout.",
       ["Why isn't your starter the strongest Pokémon?", "It has to leave room for the ones you catch."]],
      ["Legendaries","Many legendary Pokémon are guarding something rather than attacking anyone.","Power in these stories is usually a responsibility.",
       ["Why are legendary Pokémon so hard to meet?", "They're too busy guarding things to come to the door."]],
      ["Lore","The first games end not with a final battle but with your Pokédex half full, and somewhere left to go.","An ending that is not a conclusion is saying something deliberate.",
       ["Is the Pokédex half full or half empty at the end of the game?", "Half full. There's always somewhere left to go."]],
      ["Phrases","A Pokémon faints and is carried to a Centre. Nothing in the games dies.","A word held to for thirty years is an argument about what the story is for.",
       ["Why do Pokémon Centres never close?", "Fainting doesn't keep regular hours."]],
      ["Starters","You are given your first Pokémon. Every one after it you have to catch yourself.","The first thing is a gift, and the rest is work.",
       ["What's the only Pokémon you never have to chase?", "Your first one."]],
      ["Colours","Shiny Pokémon are rarer than anything else in the games and confer no advantage at all.","Value that is not usefulness.",
       ["Why don't shiny Pokémon win more battles?", "Sparkling isn't a move."]],
      ["Villains","Giovanni runs a Gym honestly and a criminal empire at the same time, and the games let both be true.","People in a story can be two things.",
       ["What do you call a Gym Leader who also runs Team Rocket?", "Busy."]],
      ["Evolution","Some Pokémon never evolve, and a few of those are among the strongest in the games.","Growth and change are not the same thing.",
       ["Why doesn't Tauros bother evolving?", "It's already tough enough."]],
      ["Lore","The professor who sends you out is named after a tree, as is every professor after him.","A pattern kept for decades because it means something.",
       ["Why are Pokémon professors all named after trees?", "They're really rooted in their research."]]
    ]
  };

  /* THE JOKE BELONGS TO THE FACT. Each fact row ends with its own joke
   * [setup, punchline], about the same Pokémon or the same idea, so the joke
   * lands straight after the fact it follows. They used to come from a
   * separate list on their own cycle, which paired a Wailord fact with a
   * Magikarp joke. Puns, because a nine-year-old and an eleven-year-old will
   * both groan at a pun and only one of them will admit to enjoying it. */

  /* Which purpose belongs to which day. Matches la-close-reading.js. */
  const DAY_PURPOSE = {Mon:"says", Tue:"words", Wed:"shows", Thu:"why", Fri:"theme"};
  const CYCLE = 18;

  /* Brock and Hank are offset by half the cycle, so on any given day the two
   * boys have different facts. Over a year each still sees all twelve. */
  function factFor(grade, week, day){
    const purpose = DAY_PURPOSE[day] || "says";
    const bank = FACTS[purpose];
    const offset = (grade === "y2") ? 9 : 0;
    const row = bank[((week - 1 + offset) % CYCLE + CYCLE) % CYCLE];
    return {purpose: purpose, topic: row[0], fact: row[1], tie: row[2]};
  }

  /* The joke for a lesson is the joke written for that lesson's fact, so it
   * always follows the fact it belongs to. The brothers never share a fact on
   * the same day (offset by nine), so they never share a joke either. */
  function jokeFor(grade, week, day){
    const purpose = DAY_PURPOSE[day] || "says";
    const offset = (grade === "y2") ? 9 : 0;
    const row = FACTS[purpose][((week - 1 + offset) % CYCLE + CYCLE) % CYCLE];
    return {setup: row[3][0], punchline: row[3][1], fact: row[1]};
  }

  /* Every joke, in fact order - one per fact. */
  const JOKES = Object.keys(FACTS).reduce(function(all, k){
    return all.concat(FACTS[k].map(function(r){ return r[3]; }));
  }, []);
  const JOKE_CYCLE = CYCLE;

  function jokeCount(){ return JOKES.length; }

  function count(){
    return Object.keys(FACTS).reduce(function(n,k){ return n + FACTS[k].length; }, 0);
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_FACTS = {FACTS, JOKES, DAY_PURPOSE, CYCLE, JOKE_CYCLE, factFor, jokeFor, count, jokeCount};
})();
