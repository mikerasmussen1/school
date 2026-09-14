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
 * FORMAT  purpose: [ [fact, the tie back to the lesson] ]
 * ==========================================================================*/
(function(){

  /* [topic, fact, how it ties back to today's lesson] */
  const FACTS = {

    /* MONDAY — what the passage actually says. Precise, checkable detail. */
    says: [
      ["Evolution","Magikarp learns Splash, a move that does nothing, and cannot learn a damaging move until it evolves at level 20.","A precise number, like a sentence you can point at."],
      ["The games","There were 151 Pokémon in the first games. There are now well over a thousand.","Exact counts, not 'lots' — the difference the lesson is about."],
      ["Records","Wailord is the longest Pokémon at 14.5 metres, yet weighs less than Groudon, which is a third its size.","Two facts that sound contradictory until you read them properly."],
      ["Oddities","Shedinja always has exactly 1 hit point, however it is raised.","Always exactly one. No 'usually'."],
      ["Odds","A shiny Pokémon appeared roughly once in 8,192 encounters in the older games.","A number worth quoting exactly rather than calling 'rare'."],
      ["Pokédex","Slowpoke's Pokédex entry says it takes five seconds for it to feel pain.","The entry says five. Not 'a while'."],
      ["Moves","Ditto and Mew are the only Pokémon that learn Transform naturally.","Only two. A claim precise enough to be wrong, which is what makes it useful."],
      ["Legendaries","Arceus changes type depending on the plate it holds, giving it eighteen possible types.","Eighteen, countable."],
      ["Poké Balls","A Great Ball works better than a Poké Ball, and an Ultra Ball better still. The order is fixed.","An order you can state exactly."],
      ["Colours","Every Pokémon is filed in the Pokédex under one of ten colour groups, including 'brown' and 'purple'.","Ten. A category, not an impression."],
      ["Records","Onix is 8.8 metres long, one of the longest Pokémon of the first generation.","A measurement, quoted."],
      ["Pokédex","Chansey's entries say it lays an egg every day.","Every day. The entry is specific, so the retelling should be too."],
      ["Evolution","Eevee has more evolutions than any other Pokémon, and they branch rather than follow one line.","'Branches' is a precise word. 'Lots' is not."],
      ["Types","There are eighteen types. Fairy was added years after the first games, bringing it from seventeen.","A number that changed, which is why you check rather than remember."],
      ["Starters","Every main game gives you a choice of three starters: one Grass, one Fire, one Water.","Three, in that pattern, every time."],
      ["Villains","Team Rocket's leader Giovanni is also the eighth Gym Leader, in Viridian City.","Two roles, one person. Easy to miss if you skim."],
      ["Mascot","Pikachu is Pokémon number 25 in the Pokédex, not number 1.","The famous one is not the first one."],
      ["Battling","A Pokémon can hold only four moves at once, so learning a fifth means forgetting one.","Exactly four. The limit is the rule."]
    ],

    /* TUESDAY — words you had to work out. Where names come from. */
    words: [
      ["Etymology","Aerodactyl is aero, Greek for air, joined to dactyl, finger — the same root as pterodactyl.","Two parts, each with a meaning, exactly like today's words."],
      ["Etymology","Bulbasaur is bulb plus the -saur of dinosaur, from the Greek sauros, lizard.","You can take the name apart the way you took apart today's words."],
      ["Etymology","Charizard joins char, to burn, with a clipped form of lizard.","Char is a real English word. That is the clue."],
      ["Etymology","Exeggutor is a pun on egg and executor, with two g's doing the work.","A word can carry two meanings at once."],
      ["Etymology","Gengar is thought to come from doppelgänger, German for a ghostly double.","A borrowed word, like many English ones."],
      ["Etymology","Lapras comes from the French la place, and it is the Pokémon you ride across water.","Knowing the root tells you what it does."],
      ["Etymology","Arcanine contains canine, from the Latin canis, dog.","The root hides in the middle, not at the start."],
      ["Etymology","Abra, Kadabra and Alakazam are three pieces of 'abracadabra', split across one evolution line.","One word broken into three — a kind of prefix and suffix."],
      ["Etymology","Squirtle joins squirt with turtle: two everyday words pushed together.","A compound word, the sort you studied in week 20."],
      ["Etymology","Psyduck begins with psy-, from the Greek psyche, mind — the root behind psychology.","A Greek root you will meet again in much harder words."],
      ["Phrases","'Gotta catch 'em all' is a contraction of 'got to catch them all' — three shortenings in five words.","Contractions, which you met in week 24."],
      ["Names","A Poké Ball is simply Pocket Monster Ball shortened, because 'Pokémon' itself is short for Pocket Monsters.","The whole franchise is named by clipping two words."],
      ["Etymology","Snorlax joins snore with a relaxed ending, and it does nothing but sleep.","The name states the behaviour before you see it."],
      ["Etymology","Jigglypuff is two describing words stuck together, and both describe how it looks.","Adjectives can become a name."],
      ["Regions","Kanto, Johto and Hoenn are named after real regions of Japan.","Borrowed proper nouns, capitalised for the same reason yours are."],
      ["Etymology","Vaporeon, Jolteon and Flareon end in -eon, the shared ending that marks them as Eevee's line.","A suffix that tells you what family a word belongs to."],
      ["Phrases","A Pokémon 'faints' rather than dies, in every game, deliberately and without exception.","One word choice, held to for thirty years."],
      ["Etymology","Kabutops takes its name from kabuto, the Japanese word for a samurai helmet.","A word borrowed whole from another language."]
    ],

    /* WEDNESDAY — what it shows without saying. Inference. */
    shows: [
      ["Backstory","Cubone wears the skull of its dead mother. The games never say so plainly — you assemble it from Pokédex entries and one scene in Lavender Town.","Shown, never stated. Exactly today's lesson."],
      ["The games","Every Pokémon Centre heals your team for free, and nobody ever explains how or why.","You infer a whole world from what is left out."],
      ["Items","The ghosts of Lavender Town can only be identified with the Silph Scope, which says something about fear and what you can see.","The game shows an idea rather than explaining it."],
      ["Villains","Team Rocket grunts are never shown being paid, but they complain about their jobs constantly.","What people say sideways tells you more than a description."],
      ["Evolution","Slowbro's entries suggest the Shellder biting its tail is what makes it stand upright.","The entry suggests. It does not state."],
      ["Design","Sudowoodo is a Rock-type that looks like a tree, and it is weak to Water — which is how you find out.","The game lets you discover it rather than telling you."],
      ["Backstory","The abandoned Mansion on Cinnabar Island tells Mewtwo's whole story through diary pages left lying around.","A story assembled from fragments, which is what inference is."],
      ["Design","Drowzee borrows from the baku, a creature of Japanese folklore said to eat dreams.","The design tells you what it does without a word."],
      ["Moves","Wobbuffet cannot attack first. Every one of its main moves only responds.","What something cannot do tells you what it is."],
      ["Design","Parasect is controlled by the mushroom on its back, and its eyes are blank white.","The detail is the whole story, and nobody narrates it."],
      ["Legendaries","The three legendary birds are never explained. They are simply there, one to each element.","A story can decline to explain something on purpose."],
      ["Rivals","Your rival always picks the starter that beats yours. Nobody points this out.","A pattern you notice rather than are told."],
      ["Colours","Shiny Pokémon are a different colour and nothing else. No stat, no move, no advantage.","Something that looks significant and is not."],
      ["The games","Gym Leaders hand over badges willingly after losing, which tells you what the badges are for.","Behaviour carrying meaning the text never states."],
      ["Backstory","Blaine's Gym is on the same island as the laboratory that made Mewtwo, and he never mentions it.","What a character does not say is evidence too."],
      ["Evolution","A Pokémon that evolves by trade cannot do it alone, however strong it gets.","A rule that quietly says something about people."],
      ["Design","Koffing and Weezing both have skull-and-crossbones markings, which is a warning aimed at you.","A detail placed for the reader, not the world."],
      ["Lore","No adult ever stops you leaving home at eleven with one Pokémon, and the games never remark on it.","The strangest things go unmentioned."]
    ],

    /* THURSDAY — why the writer put that there. Deliberate choices. */
    why: [
      ["Mascot","Pikachu was not the original mascot. Clefairy was planned for the anime, and Pikachu was chosen partly because its colour reads clearly at small sizes.","A detail chosen for a reason, like a word in a sentence."],
      ["The games","The first games were Red and Green in Japan. Blue was a later, improved version.","Knowing why it changed explains what you have."],
      ["Design","Ken Sugimori drew the original artwork in watercolour, which is why the earliest art looks softer.","The method chosen shapes how the thing feels."],
      ["Backstory","Pokémon began with Satoshi Tajiri's childhood insect collecting, which is why catching matters more than fighting.","Where an idea comes from explains what it emphasises."],
      ["The games","The Game Boy link cable is why trading exists: two players had to connect, so evolution by trade was built to use it.","A limitation turned into a feature, on purpose."],
      ["Oddities","Missingno. exists because of an error in how the game generates Pokémon on certain shores — not by design.","Not every detail is a choice. Some are accidents, and telling them apart matters."],
      ["Battling","Type advantages are built so no type is best, which stops any one team always winning.","A rule written to produce a feeling, not just a result."],
      ["Design","Many designs come from real animals: Seel from a seal, Tangela from a tangle of vines, Krabby from a crab.","A detail borrowed from life so you recognise it instantly."],
      ["Design","Gyarados is based on a Chinese legend in which a carp that leaps a waterfall becomes a dragon.","The design carries a story never told in the game."],
      ["Design","Farfetch'd carries a leek because of a Japanese saying about a duck arriving with the onions to cook it with.","A joke only works if you know what it is made of."],
      ["The games","The Pokémon Centre and the Poké Mart are always side by side, so a player never has to hunt for either.","A choice made for the reader's convenience."],
      ["Starters","Starters are Grass, Fire and Water because those three beat each other in a ring, with no winner.","The shape of the choice is the point of the choice."],
      ["Poké Balls","The Master Ball never fails and you are given exactly one, which forces you to decide what it is for.","A limit that creates a decision."],
      ["Colours","Each Gym Leader's town, badge and Pokémon share a colour, so you can tell at a glance what you are walking into.","A signal repeated until it teaches itself."],
      ["Villains","Every villain team wants to control something enormous — the sea, the land, time itself — so that stopping them is always the same shape of story.","Repetition is a choice, not laziness."],
      ["Music","Lavender Town has its own music, unlike any other town, and it is the only place you meet the dead.","Sound doing the work a sentence would otherwise do."],
      ["Design","Nurse Joy and Officer Jenny look identical everywhere because the anime needed familiar faces in unfamiliar towns.","A practical problem solved inside the story."],
      ["Evolution","Most starters evolve at levels 16 and 36, which spaces the two moments across a whole game.","Pacing decided in advance, like paragraphs."]
    ],

    /* FRIDAY — what it is really about. Theme. */
    theme: [
      ["The games","The games are built so that running away is almost always allowed. Very little forces a fight.","What a story permits tells you what it values."],
      ["Rivals","Your rival is not evil. He is simply faster than you, and that is a different kind of opponent.","A theme is rarely about good against bad."],
      ["The games","Every Pokémon you catch can be released, and the game does not punish you for it.","What a story lets go of is part of what it means."],
      ["Lore","The Pokédex is a research tool. The stated goal of the first games is to record, not to win.","The real aim is often not the obvious one."],
      ["Evolution","Pokémon that evolve through friendship cannot be forced to it by battling alone.","Some things only happen at their own pace."],
      ["Villains","Team Rocket's plan always fails because they treat Pokémon as things to be sold.","Stories tend to punish the attitude they disagree with."],
      ["The games","Trading is the only way to complete the Pokédex in the original games. You cannot finish alone.","A design that says something about people."],
      ["Backstory","Mewtwo's story is about being made for someone else's purpose, and refusing it.","That sentence is a theme. 'A Pokémon escapes a lab' is a plot."],
      ["The games","Losing a battle costs money and a walk back, but never a Pokémon.","What a story refuses to take away is a choice."],
      ["Lore","The strongest Pokémon in the first games is not the one you are given, and never is.","Earning and receiving are treated differently throughout."],
      ["Legendaries","Many legendary Pokémon are guarding something rather than attacking anyone.","Power in these stories is usually a responsibility."],
      ["Lore","The first games end not with a final battle but with your Pokédex half full, and somewhere left to go.","An ending that is not a conclusion is saying something deliberate."],
      ["Phrases","A Pokémon faints and is carried to a Centre. Nothing in the games dies.","A word held to for thirty years is an argument about what the story is for."],
      ["Starters","You are given your first Pokémon. Every one after it you have to catch yourself.","The first thing is a gift, and the rest is work."],
      ["Colours","Shiny Pokémon are rarer than anything else in the games and confer no advantage at all.","Value that is not usefulness."],
      ["Villains","Giovanni runs a Gym honestly and a criminal empire at the same time, and the games let both be true.","People in a story can be two things."],
      ["Evolution","Some Pokémon never evolve, and a few of those are among the strongest in the games.","Growth and change are not the same thing."],
      ["Lore","The professor who sends you out is named after a tree, as is every professor after him.","A pattern kept for decades because it means something."]
    ]
  };

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

  function count(){
    return Object.keys(FACTS).reduce(function(n,k){ return n + FACTS[k].length; }, 0);
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_FACTS = {FACTS, DAY_PURPOSE, CYCLE, factFor, count};
})();
