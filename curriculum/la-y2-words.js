/* ============================================================================
 * WORD VOYAGERS — YEAR TWO SPELLING (36 weekly lists)
 * ----------------------------------------------------------------------------
 * Twelve words a week. Fifth grade spelling is really morphology: the standard
 * asks for roots and affixes used to read unfamiliar multisyllabic words, so
 * most weeks are a root family rather than a phonics pattern. Learning
 * "spect = look" pays off across inspect, spectator, perspective and
 * conspicuous at once — which a phonics list cannot do at this level.
 *
 * Same drill mechanics as Year One: the page speaks the word, the child types
 * it, the word is never shown. Ids are permanent (`la-y2-sp-w<week>-<i>`).
 * ==========================================================================*/
(function(){

  const LISTS = {
    1:["graph","autograph","paragraph","biography","photograph","telegram","diagram","grammar","graphic","calligraphy","seismograph","bibliography"],
    2:["inspect","spectator","perspective","conspicuous","spectacle","prospect","visible","envision","revise","supervise","evident","provide"],
    3:["dictate","predict","verdict","contradict","dictionary","indicate","vocal","advocate","vocabulary","evoke","provoke","invoke"],
    4:["scribble","describe","prescribe","subscribe","manuscript","transcript","inscription","scripture","description","prescription","postscript","scribe"],
    5:["transport","export","import","portable","support","report","transfer","translate","transmit","transform","transition","transparent"],
    6:["structure","construct","instruct","destruction","infrastructure","obstruct","factory","manufacture","benefit","efficient","satisfaction","artificial"],
    7:["chronic","chronicle","chronology","synchronize","anachronism","telephone","symphony","microphone","phonics","megaphone","homophone","saxophone"],
    8:["formal","transform","uniform","conform","formula","information","permit","submit","transmit","admit","mission","commit"],
    9:["pedal","pedestrian","pedestal","expedition","impede","centipede","manual","manufacture","manuscript","manage","maintain","manipulate"],
    10:["thermal","thermometer","thermostat","thermos","photograph","photosynthesis","photocopy","telephoto","telescope","television","telegraph","telepathy"],
    11:["audience","auditory","audible","audition","auditorium","tactile","contact","intact","tangible","contagious","intangible","tactics"],
    12:["biology","biography","biosphere","antibiotic","symbiotic","geography","geology","geometry","geothermal","geologist","biodiversity","biodegradable"],
    13:["attention","invention","description","conclusion","decision","division","expression","impression","tension","mission","confusion","persuasion"],
    14:["importance","distance","balance","substance","assistance","difference","reference","confidence","evidence","conference","independence","experience"],
    15:["possible","responsible","visible","terrible","flexible","valuable","comfortable","reasonable","reliable","remarkable","predictable","considerable"],
    16:["famous","nervous","curious","obvious","generous","enormous","tremendous","courageous","gorgeous","outrageous","spontaneous","simultaneous"],
    17:["interact","interrupt","international","interview","interfere","intersection","intramural","intranet","interpret","intermediate","interval","interior"],
    18:["submarine","subtract","substitute","suburb","subject","submerge","superior","supervise","supermarket","supernatural","superintendent","superb"],
    19:["transatlantic","transcontinental","transaction","transplant","circumference","circumstance","circumnavigate","circulate","circuit","circular","transcend","transient"],
    20:["antique","anticipate","antecedent","postpone","postscript","posterior","postgraduate","antibiotic","anticipation","postwar","antechamber","posthumous"],
    21:["their","there","theyre","principal","principle","stationary","stationery","complement","compliment","accept","except","affect"],
    22:["effect","weather","whether","allowed","aloud","capital","capitol","desert","dessert","peace","piece","presence"],
    23:["definitely","separate","necessary","occasion","embarrass","recommend","accommodate","occurrence","privilege","rhythm","conscience","conscious"],
    24:["knowledge","acknowledge","column","solemn","condemn","subtle","doubt","debtor","receipt","succeed","possess","assess"],
    25:["democracy","astronomy","astronaut","asterisk","disaster","hydrogen","hydrant","dehydrate","hydraulic","psychology","physical","technology"],
    26:["credible","incredible","credentials","fracture","fragment","fragile","rupture","interrupt","abrupt","tenacious","retain","sustain"],
    27:["responsible","irresponsible","reversible","irreversible","significant","insignificant","dependent","independent","legible","illegible","relevant","irrelevant"],
    28:["current","content","object","record","present","produce","conduct","contract","permit","refuse","subject","address"],
    29:["metaphor","simile","imagery","symbolism","personification","hyperbole","analogy","comparison","figurative","literal","vivid","descriptive"],
    30:["proverb","adage","idiom","maxim","wisdom","folly","diligence","prudence","integrity","humility","perseverance","gratitude"],
    31:["synonym","antonym","homograph","homophone","nuance","connotation","denotation","precise","ambiguous","distinction","subtle","implication"],
    32:["formal","informal","dialect","register","standard","colloquial","slang","audience","appropriate","context","convention","etiquette"],
    33:["research","source","citation","reference","credible","evidence","analysis","synthesis","summarize","paraphrase","bibliography","documentation"],
    34:["plagiarism","attribute","quotation","excerpt","verbatim","interpret","corroborate","substantiate","validate","authentic","original","acknowledge"],
    35:["however","although","nevertheless","similarly","moreover","furthermore","consequently","therefore","meanwhile","otherwise","regardless","alternatively"],
    36:["achievement","necessary","definitely","separate","conscience","privilege","perseverance","independence","recommendation","responsibility","acknowledgment","extraordinary"]
  };

  function setFor(week){
    const words = LISTS[week] || [];
    const spine = (window.__CURR.LA_Y2 && window.__CURR.LA_Y2.WEEKS) || [];
    const wk = spine.find(w=>w.n===week);
    const pattern = wk ? wk.spelling : "";
    return {
      id:"la-y2-w"+week+"-spelling", w:week, label:"W"+week,
      title:"Spelling — "+(pattern||"this week's words"),
      note:"Listen, then type. Say the root out loud first — it usually tells you the spelling.",
      pattern, words,
      items: words.map((word,i)=>({
        id:"la-y2-sp-w"+week+"-"+(i+1),
        type:"fill-blank",
        t: i<4 ? 0 : i<9 ? 1 : 2,
        q:"Spell the word you hear: ___",
        a:[word]
      }))
    };
  }

  window.__CURR = window.__CURR || {};
  window.__CURR.LA_Y2 = Object.assign(window.__CURR.LA_Y2||{}, {SPELLING_LISTS:LISTS, spellingSetFor:setFor});
})();
