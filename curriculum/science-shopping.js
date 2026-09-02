/* ============================================================================
 * SCIENCE SHOPPING — one shop per month, both boys at once
 * ----------------------------------------------------------------------------
 * Builds the list from the actual Day A material lists in science-lessons.js,
 * so it can never drift from what the labs need. Change a lab's materials and
 * next month's list changes with it.
 *
 * FOUR DECISIONS WORTH KNOWING ABOUT:
 *
 * 1. BOTH BOYS ON ONE LIST. A parent shops for a household, not a course. So
 *    3rd and 5th grade are merged and deduplicated: if both need a magnet in
 *    March, the magnet appears once, tagged with both weeks. Quantities are
 *    NOT doubled automatically, because most things (a thermometer, a magnet,
 *    a hand lens) are shared, while some (bean seeds, paper plates) are not.
 *    The list flags which is which rather than guessing.
 *
 * 2. STAPLES ARE SEPARATED FROM PURCHASES. Water, paper, a spoon and a ruler
 *    do not belong on a shopping list every month — burying two real purchases
 *    among fifteen things you already own is how a list stops being read. Each
 *    month therefore has a short BUY section and a longer "you probably have
 *    this" section.
 *
 * 3. FIRST-NEED ONLY, WITH REUSE NOTED. A thermometer bought in one month is
 *    not re-listed the next. Reusable items appear once, in the month they are
 *    first needed, with the later weeks listed so nothing is thrown out early.
 *    Consumables — seeds, vinegar, plaster, bread — are re-listed every time.
 *
 * 4. TWO ORPHAN MONTHS ARE MERGED. The school year starts on the last Monday
 *    of August and ends in the first week of June, so those two calendar
 *    months hold one school week each. Sending a parent to the shop twice for
 *    one week's worth of materials defeats the point, so August folds into the
 *    September shop and June into May's.
 * ==========================================================================*/
(function(){

  /* Things a house almost certainly already has. Matched loosely, so
   * "3 cups with holes in the bottom" is recognised as cups. */
  const STAPLE_PATTERNS = [
    "water","paper","pencil","spoon","cup","plate","bowl","tray","ruler","timer",
    "scissors","tape","string","jar","bottle","bag","towel","glove","marker",
    "notebook","book","map","atlas","reference","picture","card","adult","shoe",
    "camera","freezer","fridge","windowsill","sunny","dark","warm room","hands",
    "mirror","clock","salt","sugar","soap","oil","flour","ice","milk","bread",
    "wool","balloon","straw","nail","penny","coin","dish","glass","block","sod"
  ];

  /* Consumables: used up, so re-list every month they appear. */
  const CONSUMABLE_PATTERNS = [
    "seed","bean","vinegar","baking soda","plaster","yeast","bread","milk",
    "food colouring","food coloring","steel wool","iodine","methylene",
    "petroleum jelly","filter","glitter","lotion","battery","clay","soil",
    "sand","gravel","elodea","pond","onion","feather","cotton","ice"
  ];

  /* Not shoppable: people, weather, places, and things the child produced
   * earlier in the course. These appear in a lesson's material list because
   * the lesson genuinely needs them, but putting "a willing tester" or "dry
   * day" on a shopping list makes the list look careless and trains a parent
   * to skim it. They are dropped entirely rather than filed under staples. */
  const NOT_SHOPPABLE = [
    "adult","sibling","willing tester","pet, sibling","observation of an animal",
    "dry day","room air","sunny spot","sunny windowsill","warm room","dark and light",
    "freezer","fridge","hands","your ","all your","a week of household waste",
    "shoes for outside","tree or patterned surface","local","atlas or reference",
    "reference books","reference on","reference pages","willing family",
    "twenty written example","whatever you choose","working circuit",
    "box of about 20 mixed object","scales if available","pictures of",
    "twenty household material","organism card","animal card","animal picture",
    "organism picture","graph paper","outline map","coloured pencil",
    "willing tester","your notebook","your animal card","your region map",
    "your 8 rock","your three cup","all your","your temperature"
  ];

  /* Wording that means the same purchase. Normalising these stops "battery"
   * and "batteries", or "bulb" and "bulb in holder", appearing as two lines. */
  const ALIAS = [
    [/^\d+\s+/, ""],
    [/^(two|three|four|five|six|ten|twenty)\s+/, ""],
    [/^a packet of the same seed type$/, "seed packet"],
    [/^batteries$/, "battery"],
    [/^bulb in holder$/, "bulb"],
    [/^bulbs in holders$/, "bulb"],
    [/^sand water$/, "sand"],
    [/^salt water$/, "salt"],
    [/^dry sand and dry soil$/, "sand"],
    [/^sand, clay, loam$/, "sand"],
    [/^hand lens if you have specimens$/, "hand lens"],
    [/^hand lens or microscope$/, "microscope"],
    [/^microscope or strong lens$/, "microscope"],
    [/^methylene blue or iodine$/, "iodine"],
    [/^iodine \(adult, optional\)$/, "iodine"],
    [/^plaster of paris \(adult\)$/, "plaster of paris"],
    [/^heat source \(adult\)$/, "heat source"],
    [/^candle \(adult only\)$/, "candle"],
    [/^a candle \(adult only\)$/, "candle"],
    [/^modelling clay in two colours$/, "modelling clay"],
    [/^2 identical cups of water$/, "cups"],
    [/^slide and cover slip or clear tape$/, "slides and cover slips"],
    [/ ?\(adult[^)]*\)$/, ""],
    [/ ?if you have.*$/, ""],
    [/ ?or available.*$/, ""],
    [/^insulated wire$/, "wire"],
    [/^wires$/, "wire"],
    [/^bar magnets?$/, "bar magnet"],
    [/^magnets$/, "magnet"],
    [/^thermometers?$/, "thermometer"],
    [/^thermometers \(two\)$/, "thermometer"],
    [/^bean seeds$/, "bean seeds"],
    [/^small objects to bury$/, "small objects to bury"],
    [/^a shell or leaf$/, "shell"],
    [/^shell or marine fossil$/, "fossil (shell or marine)"],
    [/^real or replica fossils?$/, "fossils (real or replica)"],
    [/^rocks from outside$/, "rocks (collect outside)"],
    [/^scratch tools$/, "scratch tools (nail, penny)"],
    [/^spoon for adding sand$/, "spoon"],
    [/^catch (basin|bucket|pans?)$/, "catch basin or pan"],
    [/^sand and fine silt$/, "fine silt"],
    [/^porous rock or plaster block$/, "porous rock or plaster block"],
    [/^glitter or flour$/, "glitter"],
    [/^feather or cotton wool$/, "feather or cotton wool"],
    [/^pond or puddle water$/, "pond water"],
    [/^filter paper or coffee filter$/, "coffee filters"],
    [/^elodea or other aquatic plant leaf$/, "elodea (aquatic plant)"],
    [/^small dam or levee material$/, "levee material (foam or wood)"]
  ];

  function normalise(name){
    let n = String(name).trim().toLowerCase();
    ALIAS.forEach(([re,to])=>{ n = n.replace(re, to); });
    // No blanket trailing-s strip: it turned "hand lens" into "hand len" and
    // "compass" into "compas". Plurals are handled by explicit aliases above.
    return n.trim().replace(/\s+/g," ");
  }

  const matches = (item, pats) => {
    const s = String(item).toLowerCase();
    return pats.some(p => s.indexOf(p) >= 0);
  };

  const MONTHS = ["January","February","March","April","May","June","July",
                  "August","September","October","November","December"];

  /* CACHING, and why it is not premature. Every one of these walks the school
   * calendar day by day, and shopKeyOfWeek() used to re-derive all 36 weeks on
   * each call just to count how many share a month. Called once per row per
   * render, that is roughly 36 x 36 x 1200 date steps for a single frame - the
   * page test went from instant to hanging, and a browser would have stuttered
   * the same way. The calendar and the lessons never change at runtime, so the
   * whole result is computed once and reused. */
  let _monthCache = null, _countCache = null, _byMonthCache = null;

  /* Which calendar month each school week falls in, using the shared school
   * calendar so breaks are already accounted for. */
  function monthOfWeek(week){
    if(!_monthCache){
      _monthCache = {};
      for(let w=1; w<=36; w++) _monthCache[w] = _monthOfWeekUncached(w);
    }
    return _monthCache[week] || null;
  }

  function _monthOfWeekUncached(week){
    const CAL = window.__CURR && window.__CURR.LA_CALENDAR;
    if(!CAL || !CAL.dateForIndex) return null;
    const dt = CAL.dateForIndex((week-1)*5);       // the Monday of that week
    if(!dt) return null;
    return {y:dt.getFullYear(), m:dt.getMonth(), key:dt.getFullYear()+"-"+String(dt.getMonth()+1).padStart(2,"0"),
            label:MONTHS[dt.getMonth()]+" "+dt.getFullYear()};
  }

  function monthCounts(){
    if(!_countCache){
      _countCache = {};
      for(let w=1; w<=36; w++){ const x=monthOfWeek(w); if(x) _countCache[x.key]=(_countCache[x.key]||0)+1; }
    }
    return _countCache;
  }

  /* Merge the one-week orphan months into their neighbours. */
  function shopKeyOfWeek(week){
    const m = monthOfWeek(week);
    if(!m) return null;
    const counts = monthCounts();
    if(counts[m.key] > 1) return m;
    // orphan: fold forward at the start of the year, backward at the end
    const step = (week <= 6) ? 1 : -1;
    for(let w = week + step; w >= 1 && w <= 36; w += step){
      const n = monthOfWeek(w);
      if(n && n.key !== m.key && counts[n.key] > 1){
        return {...n, mergedFrom:m.label};
      }
    }
    return m;
  }

  /* The whole year's shopping, month by month. Computed once. */
  function byMonth(){
    if(_byMonthCache) return _byMonthCache;
    return (_byMonthCache = _byMonthUncached());
  }

  function _byMonthUncached(){
    const L = window.__CURR.SCI_LESSONS;
    if(!L) return [];
    const shops = {};   // key -> {label, weeks, items:{name -> entry}}
    const firstSeen = {};   // reusable item -> the shop key that already lists it

    for(let week=1; week<=36; week++){
      const shop = shopKeyOfWeek(week);
      if(!shop) continue;
      if(!shops[shop.key]) shops[shop.key] = {key:shop.key, label:shop.label,
        mergedFrom:shop.mergedFrom||null, weeks:[], items:{}};
      const S = shops[shop.key];
      if(S.weeks.indexOf(week) < 0) S.weeks.push(week);

      [["y3","BROCK"],["y5","HANK"]].forEach(([g,who])=>{
        const A = L.lessonFor(g, week, "A");
        (A.materials||[]).forEach(raw=>{
          const name = String(raw).trim();
          if(matches(name, NOT_SHOPPABLE)) return;   // people, weather, own work
          const norm = normalise(name);
          if(!norm) return;
          const consumable = matches(name, CONSUMABLE_PATTERNS);
          const staple = matches(name, STAPLE_PATTERNS) && !consumable;

          // A reusable item already bought earlier is not re-listed; the week
          // it is needed again is recorded on the original entry instead.
          if(!consumable && firstSeen[norm] && firstSeen[norm] !== shop.key){
            const prev = shops[firstSeen[norm]];
            const e = prev && prev.items[norm];
            if(e && e.alsoWeeks.indexOf(week) < 0) e.alsoWeeks.push(week);
            return;
          }
          if(!consumable) firstSeen[norm] = shop.key;

          const display = norm.charAt(0).toUpperCase()+norm.slice(1);
          if(!S.items[norm]) S.items[norm] = {name:display, staple:staple,
            consumable:consumable, who:[], weeks:[], alsoWeeks:[]};
          const e = S.items[norm];
          if(e.who.indexOf(who) < 0) e.who.push(who);
          if(e.weeks.indexOf(week) < 0) e.weeks.push(week);
          // the normalised wording is the label; nothing to widen
        });
      });
    }

    return Object.keys(shops).sort().map(k=>{
      const S = shops[k];
      const all = Object.keys(S.items).map(n=>S.items[n]);
      const sortFn = (a,b)=> a.name.localeCompare(b.name);
      return {
        key:S.key, label:S.label, mergedFrom:S.mergedFrom,
        weeks:S.weeks.sort((a,b)=>a-b),
        buy:      all.filter(i=>!i.staple).sort(sortFn),
        probablyHave: all.filter(i=>i.staple).sort(sortFn)
      };
    });
  }

  /* Everything for the year as ONE continuous list, in the order it is
   * needed, each line carrying the month it is wanted for.
   *
   * The month-by-month view answers "what do I buy today?". This one answers
   * "what does this course cost me, and what am I in for?" — it is the list
   * to print once, stick inside a cupboard, and tick off across the year.
   * Same items, same dedupe rules, one column added. */
  let _allCache = null, _staplesCache = null;
  function allItems(){
    if(_allCache) return _allCache;
    const out = [];
    byMonth().forEach(function(m){
      m.buy.forEach(function(i){
        out.push({
          name: i.name,
          month: m.label,
          monthShort: m.label.split(" ")[0],
          weeks: i.weeks.slice(),
          alsoWeeks: i.alsoWeeks.slice(),
          who: i.who.slice(),
          consumable: !!i.consumable,
          section: "buy"
        });
      });
    });
    return (_allCache = out);
  }

  /* The staples, gathered once across the whole year rather than repeated in
   * every month — a parent only needs to check the cupboard for these once. */
  function allStaples(){
    if(_staplesCache) return _staplesCache;
    const seen = {}, out = [];
    byMonth().forEach(function(m){
      m.probablyHave.forEach(function(i){
        const k = i.name.toLowerCase();
        if(seen[k]) return;
        seen[k] = 1;
        out.push({name:i.name, month:m.label, monthShort:m.label.split(" ")[0]});
      });
    });
    return (_staplesCache = out.sort(function(a,b){ return a.name.localeCompare(b.name); }));
  }

  /* Anything worth ordering ahead rather than finding locally. */
  const ORDER_AHEAD = [
    "hand lens or microscope","real or replica fossils","iron filings",
    "bar magnets","elodea or other aquatic plant leaf","slides and cover slips",
    "plaster of Paris","thermometers (two)","insulated wire","bulbs in holders"
  ];

  window.__CURR = window.__CURR || {};
  window.__CURR.SCI_SHOPPING = {byMonth, allItems, allStaples, monthOfWeek, shopKeyOfWeek, ORDER_AHEAD, MONTHS};
})();
