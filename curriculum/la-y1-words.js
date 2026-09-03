/* ============================================================================
 * WORD VOYAGERS — YEAR ONE SPELLING (36 weekly lists)
 * ----------------------------------------------------------------------------
 * Twelve words a week, chosen to fit that week's pattern from the spine, with
 * high-frequency third-grade words folded in rather than taught separately.
 *
 * Each list becomes a gradeable set by the same route the Unit 1 pilot used:
 * a fill-blank item whose whole answer is the word. The page speaks the word
 * aloud and the child types it, so the drill is a real spelling test rather
 * than a word-recognition test — nothing on screen shows them the answer.
 *
 * Item ids are permanent (`la-y1-sp-w<week>-<i>`). Never renumber them; the
 * attempt log keys off them. Retire a bad word with retired:true.
 * ==========================================================================*/
(function(){

  /* week: [fourteen words] — the pattern for each week is named in the spine.
   *
   * TWELVE AT GRADE LEVEL, THEN TWO STRETCH WORDS. The last two of every list
   * follow the same pattern as the rest but sit a step beyond it: longer, or
   * with the pattern buried mid-word rather than at the end. Week 9's short-o
   * list ends on "approach" and "overflow"; week 24's forgiveness list ends on
   * "forgive" and "forgiven".
   *
   * The drill draws eight words at random, so a stretch word appears often
   * enough to be learned and rarely enough that a hard list never becomes a
   * wall of hard words. Missing one of them is not a failed week. */
  const LISTS = {
    1:["cat","hand","stop","desk","jump","grass","clock","stamp","truck","list","past","gift","swift","blunt"],
    2:["black","frog","climb","brave","train","dress","spill","stand","think","blend","crust","plant","strict","sprint"],
    3:["make","name","gate","rain","stay","paint","brave","trail","chase","plate","today","afraid","escape","remain"],
    4:["tree","seed","clean","dream","field","piece","between","really","people","either","reason","believe","achieve","receive"],
    5:["books","boxes","wishes","glasses","brushes","dishes","foxes","classes","churches","benches","lunches","branches","sandwiches","tomatoes"],
    6:["children","mice","geese","feet","teeth","women","men","oxen","sheep","deer","leaves","knives","loaves","hooves"],
    7:["action","station","nation","motion","fiction","mission","session","caution","portion","question","direction","attention","decision","invention"],
    8:["find","light","night","might","right","child","mild","sight","bright","tight","flight","kindness","frightful","delightful"],
    9:["hope","stone","boat","coach","grow","slow","window","yellow","below","float","toast","alone","approach","overflow"],
    10:["slowly","quickly","gladly","kindly","softly","loudly","bravely","quietly","politely","carefully","suddenly","honestly","patiently","obviously"],
    11:["faster","stronger","kinder","brighter","fastest","strongest","kindest","brightest","happier","happiest","earlier","earliest","heavier","heaviest"],
    12:["running","hopping","sitting","stopped","planned","begged","swimming","shopping","dropped","hugged","winner","bigger","forgetting","preferred"],
    13:["farm","start","sharp","garden","north","storm","short","corner","market","forest","morning","important","craftsman","workshop"],
    14:["her","bird","turn","first","third","hurt","perfect","person","circle","purple","further","service","measure","treasure"],
    15:["out","loud","round","found","cloud","house","brown","crown","down","town","mountain","around","shoulder","neighbour"],
    16:["oil","coin","point","join","boy","joy","toy","enjoy","voice","choice","spoil","destroy","patient","ancient"],
    17:["know","write","lamb","thumb","knee","wrong","comb","knife","wrist","climb","listen","castle","honest","honesty"],
    18:["city","circle","cent","pencil","center","cake","corn","cup","because","certain","practice","distance","promise","promised"],
    19:["giant","gentle","germ","magic","change","garden","goat","guess","large","village","strange","danger","character","courage"],
    20:["sunshine","baseball","birthday","something","everyone","outside","daylight","notebook","classroom","afternoon","grandmother","understand","everything","somebody"],
    21:["dog's","girl's","boy's","James's","teacher's","mother's","brother's","friend's","bird's","church's","sister's","neighbor's","belong","belonging"],
    22:["don't","can't","won't","isn't","didn't","haven't","it's","they're","we'll","I'm","you're","shouldn't","burden","carried"],
    23:["their","there","they're","your","you're","its","it's","to","too","two","hear","here","neighbour","neighbourly"],
    24:["knew","new","right","write","some","sum","would","wood","by","buy","know","no","forgive","forgiven"],
    25:["unhappy","unfair","unkind","undo","rewrite","return","replay","repeat","preview","prepare","pretend","prevent","prefix","suffix"],
    26:["disagree","dislike","disappear","dishonest","mistake","misspell","misplace","misbehave","nonsense","nonstop","nonfiction","nonliving","rebuild","unbroken"],
    27:["careful","joyful","thankful","hopeful","helpless","hopeless","fearless","endless","kindness","darkness","sadness","gentleness","helpful","helpless"],
    28:["comfortable","valuable","enjoyable","reasonable","movement","payment","moment","argument","agreement","statement","treatment","government","meaning","meaningful"],
    29:["adventure","important","different","remember","together","beautiful","wonderful","dangerous","exciting","suddenly","several","especially","compare","comparing"],
    30:["decided","surprised","imagine","continue","describe","discover","probably","actually","attention","opinion","favorite","interesting","signal","signature"],
    31:["through","though","enough","tough","cough","laugh","caught","taught","bought","brought","thought","daughter","prudent","prudence"],
    32:["friend","said","again","great","break","been","done","come","some","were","where","every","prepare","prevented"],
    33:["evidence","research","source","detail","notes","summary","topic","support","explain","describe","compare","conclude","evidence","reference"],
    34:["reason","example","because","therefore","however","although","finally","meanwhile","instead","besides","include","organize","generous","generously"],
    35:["before","after","during","beneath","above","below","beside","between","behind","toward","across","beyond","witness","witnessed"],
    36:["believe","because","beautiful","friend","enough","different","important","question","separate","tomorrow","weather","favorite","faithful","faithfully"]
  };

  const PATTERN = {}; // filled from the spine so the drill can name the pattern

  function setFor(week){
    const words = LISTS[week] || [];
    const spine = (window.__CURR.LA_Y1 && window.__CURR.LA_Y1.WEEKS) || [];
    const wk = spine.find(w=>w.n===week);
    const pattern = wk ? wk.spelling : "";
    return {
      id: "la-y1-w"+week+"-spelling",
      w: week,
      label: "W"+week,
      title: "Spelling — " + (pattern || "this week's words"),
      note: "Listen to each word, then type it. Say it out loud first if it helps.",
      pattern,
      words,
      items: words.map((word,i)=>({
        id: "la-y1-sp-w"+week+"-"+(i+1),
        type: "fill-blank",
        // Tier rises through the list: first four warm-up, next five core,
        // last three challenge — the lists are written easiest-first.
        t: i<4 ? 0 : i<9 ? 1 : 2,
        q: "Spell the word you hear: ___",
        a: [word]
      }))
    };
  }

  function groupsFor(week){
    // The study list, shown before the drill. One group per week — the pattern
    // IS the grouping at this grade, so splitting further would be noise.
    const spine = (window.__CURR.LA_Y1 && window.__CURR.LA_Y1.WEEKS) || [];
    const wk = spine.find(w=>w.n===week);
    return [{title: wk ? wk.spelling : ("Week "+week), words: LISTS[week]||[]}];
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y1 = Object.assign(window.__CURR.LA_Y1||{}, {
    SPELLING_LISTS: LISTS, spellingSetFor: setFor, spellingGroupsFor: groupsFor, PATTERN
  });
})();
