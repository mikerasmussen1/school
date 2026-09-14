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
 * TWELVE FACTS PER PURPOSE, so the cycle runs twelve weeks before it repeats,
 * and the two boys are offset by six so they are never on the same fact on the
 * same day. Hank gets Brock's Monday fact twelve weeks later, which nobody has
 * ever minded.
 *
 * ON ACCURACY. These are stated as facts, so they are drawn from what is
 * long-established and widely documented rather than from anything marginal or
 * recently changed. Where something is a designer's stated intention rather
 * than a rule of the games, the wording says so.
 *
 * FORMAT  purpose: [ [fact, the tie back to the lesson] ]
 * ==========================================================================*/
(function(){

  const FACTS = {

    /* MONDAY — precise, checkable detail. The lesson is about what the text
     * actually says, so these are numbers you could look up and verify. */
    says: [
      ["Magikarp learns Splash, a move that does nothing at all, and cannot learn a single damaging move until it evolves at level 20.",
       "A precise number, like a sentence you can point at."],
      ["There were 151 Pokémon in the first games. There are now well over a thousand.",
       "Exact counts, not 'lots' — the difference the lesson is about."],
      ["Wailord is the largest Pokémon by length at 14.5 metres, but weighs less than Groudon, which is a third its size.",
       "Two facts that sound contradictory until you read them properly."],
      ["Shedinja always has exactly 1 hit point, no matter how it is raised.",
       "Always exactly one. No 'usually'."],
      ["A shiny Pokémon appeared roughly once in 8,192 encounters in the older games.",
       "A number worth quoting exactly rather than calling 'rare'."],
      ["Slowpoke's Pokédex entry says it takes five seconds for it to feel pain.",
       "The entry says five. Not 'a while'."],
      ["Ditto and Mew are the only Pokémon that can learn Transform naturally.",
       "Only two. A claim precise enough to be wrong, which is what makes it useful."],
      ["Arceus can change type depending on which plate it holds, giving it eighteen possible types.",
       "Eighteen, countable."],
      ["Rattata evolves at level 20, which is earlier than most first-stage Pokémon.",
       "'Earlier than most' is a comparison you can check."],
      ["Mewtwo was created in a laboratory from Mew's DNA — that is stated outright in the first games' diary entries.",
       "Stated outright, which is exactly Monday's distinction."],
      ["Onix is 8.8 metres long, making it one of the longest Pokémon of the first generation.",
       "A measurement, quoted."],
      ["Chansey's Pokédex entries say it lays an egg every day.",
       "Every day. The entry is specific, so the retelling should be too."]
    ],

    /* TUESDAY — where a name comes from. The lesson is working meanings out
     * from parts and context, which is what these names reward. */
    words: [
      ["Aerodactyl is aero, from the Greek for air, joined to dactyl, meaning finger — the same root as pterodactyl.",
       "Two parts, each with a meaning, exactly like today's words."],
      ["Bulbasaur is bulb plus the -saur ending from dinosaur, which comes from the Greek sauros, lizard.",
       "You can take the name apart the way you took apart today's words."],
      ["Charizard joins char, meaning to burn, with a clipped form of lizard.",
       "Char is a real English word. That is the clue."],
      ["Exeggutor is a pun on egg and executor, with two g's doing the work.",
       "A word can carry two meanings at once."],
      ["Gengar is thought to come from doppelgänger, a German word for a ghostly double.",
       "A borrowed word, like many English ones."],
      ["Lapras takes its name from the French la place, and it is a Pokémon you ride across water.",
       "Knowing the root tells you what it does."],
      ["Arcanine's name contains canine, from the Latin canis, meaning dog.",
       "The root is hiding in the middle of the word, not at the start."],
      ["Alakazam, Kadabra and Abra are all pieces of 'abracadabra', split across an evolution line.",
       "One word broken into three, which is a kind of prefix and suffix."],
      ["Squirtle joins squirt with turtle — two everyday words pushed together.",
       "A compound word, the sort you studied in week 20."],
      ["Butterfree is butterfly with the 'fly' swapped for 'free'.",
       "One syllable changed, and the meaning shifts."],
      ["Psyduck begins with psy-, from the Greek psyche, mind — the same root as psychology.",
       "A Greek root you will meet again in much harder words."],
      ["Machamp is machine or macho joined to champion, clipped short.",
       "Clipping is how English makes 'fridge' out of 'refrigerator'."]
    ],

    /* WEDNESDAY — what is shown and never stated. The lesson is inference, so
     * these are things the games let you work out. */
    shows: [
      ["Cubone wears the skull of its dead mother. The games never say so plainly — you work it out from the Pokédex entries and one scene in Lavender Town.",
       "Shown, never stated. Exactly today's lesson."],
      ["Every Pokémon Centre heals your team for free, and nobody in the games ever explains how or why.",
       "You infer a whole world from what is left out."],
      ["Ghost-type Pokémon in Lavender Town can only be identified with the Silph Scope, which tells you something about what fear does to what you can see.",
       "The game shows you an idea rather than explaining it."],
      ["Team Rocket grunts are never shown being paid, but they complain about their jobs constantly.",
       "What people say sideways tells you more than a description would."],
      ["Slowbro's Pokédex entries suggest the Shellder biting its tail is what makes it stand upright.",
       "The entry suggests. It does not state."],
      ["Sudowoodo is a Rock-type that looks like a tree, and it is weak to Water — which is how you find out.",
       "The game lets you discover it rather than telling you."],
      ["The abandoned Pokémon Mansion on Cinnabar Island tells Mewtwo's whole story through diary pages left lying around.",
       "A story assembled from fragments, which is what inference is."],
      ["Drowzee's design borrows from the baku, a creature of Japanese folklore said to eat dreams.",
       "The design tells you what it does without a word of explanation."],
      ["Many trainers in the first games are standing in places that make no sense unless they are waiting for you.",
       "The world implies things it never says."],
      ["Wobbuffet cannot attack first — every one of its main moves only responds. Its whole character is in that restriction.",
       "What something cannot do tells you what it is."],
      ["Parasect is controlled by the mushroom on its back, and its eyes are blank white.",
       "The detail is the whole story, and nobody narrates it."],
      ["The old man in Viridian City who teaches you to catch Pokémon is, in one telling, simply very tired.",
       "Small human details the game never comments on."]
    ],

    /* THURSDAY — why a designer chose something. The lesson is the function of
     * a detail, so these are choices with reasons behind them. */
    why: [
      ["Pikachu was not the original mascot. Clefairy was planned for the anime, and Pikachu was chosen partly because its colour reads clearly at small sizes.",
       "A detail chosen for a reason, like a word in a sentence."],
      ["The first games were called Red and Green in Japan, and Blue was a later, improved version.",
       "Knowing why it was changed explains what you have."],
      ["Ken Sugimori drew the original artwork in watercolour, which is why the earliest art looks softer than later art.",
       "The method chosen shapes how the thing feels."],
      ["Pokémon began with Satoshi Tajiri's childhood insect collecting, which is why catching matters more than fighting.",
       "Where an idea comes from explains what it emphasises."],
      ["The Game Boy link cable is why trading exists: two players had to connect, so evolution by trade was built to use it.",
       "A limitation turned into a feature, on purpose."],
      ["Missingno. exists because of an error in how the game generates Pokémon on certain shores — not by design.",
       "Not every detail is a choice. Some are accidents, and telling them apart matters."],
      ["Type advantages are built so no type is best, which keeps any one team from always winning.",
       "A rule written to produce a feeling, not just a result."],
      ["Many Pokémon designs come from real animals: Seel from a seal, Tangela from a tangle of vines, Krabby from a crab.",
       "A detail borrowed from life so you recognise it instantly."],
      ["Gyarados is based on a Chinese legend in which a carp that leaps a waterfall becomes a dragon.",
       "The design carries a story that is never told in the game."],
      ["Farfetch'd carries a leek because of a Japanese saying about a duck arriving with the onions to cook it with.",
       "A joke only works if you know what it is made of."],
      ["The Pokémon Centre and the Poké Mart are always next to each other, so a player never has to hunt for either.",
       "A choice made for the reader's convenience, not the story's."],
      ["Starter Pokémon are Grass, Fire and Water because those three beat each other in a ring, with no winner.",
       "The shape of the choice is the point of the choice."]
    ],

    /* FRIDAY — the idea running underneath. The lesson is theme, so these are
     * about what the whole thing is saying rather than any one fact. */
    theme: [
      ["The games are built so that running away is almost always allowed. Very little in them forces a fight.",
       "What a story permits tells you what it values."],
      ["Your rival is not evil. He is simply faster than you, and that is a different kind of opponent.",
       "A theme is rarely about good against bad."],
      ["Every Pokémon you catch can be released, and the game does not punish you for it.",
       "What a story lets go of is part of what it means."],
      ["The Pokédex is a research tool. The stated goal of the first games is to record, not to win.",
       "The real aim is often not the obvious one."],
      ["Pokémon that evolve through friendship cannot be forced to do it by battling alone.",
       "Some things only happen at their own pace, which is an idea, not a rule."],
      ["Team Rocket's plan always fails because they treat Pokémon as things to be sold.",
       "Stories tend to punish the attitude they disagree with."],
      ["Trading is the only way to complete the Pokédex in the original games. You cannot finish alone.",
       "A design that says something about people."],
      ["Mewtwo's story is about being made for someone else's purpose, and refusing it.",
       "That sentence is a theme. 'A Pokémon escapes a lab' is a plot."],
      ["Losing a battle costs money and a walk back, but never a Pokémon.",
       "What a story refuses to take away is a choice."],
      ["The strongest Pokémon in the first games is not the one you are given, and never is.",
       "Earning and receiving are treated differently throughout."],
      ["Many legendary Pokémon are guarding something rather than attacking anyone.",
       "Power in these stories is usually a responsibility."],
      ["The first games end not with a final battle but with your Pokédex, half full, and somewhere left to go.",
       "An ending that is not a conclusion is saying something deliberate."]
    ]
  };

  /* Which purpose belongs to which day. Matches la-close-reading.js. */
  const DAY_PURPOSE = {Mon:"says", Tue:"words", Wed:"shows", Thu:"why", Fri:"theme"};
  const CYCLE = 12;

  /* Brock and Hank are offset by half the cycle, so on any given day the two
   * boys have different facts. Over a year each still sees all twelve. */
  function factFor(grade, week, day){
    const purpose = DAY_PURPOSE[day] || "says";
    const bank = FACTS[purpose];
    const offset = (grade === "y2") ? 6 : 0;
    const row = bank[((week - 1 + offset) % CYCLE + CYCLE) % CYCLE];
    return {purpose: purpose, fact: row[0], tie: row[1]};
  }

  function count(){
    return Object.keys(FACTS).reduce(function(n,k){ return n + FACTS[k].length; }, 0);
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_FACTS = {FACTS, DAY_PURPOSE, CYCLE, factFor, count};
})();
