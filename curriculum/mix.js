/* ============================================================================
 * MATH DAILY MIX — review · current · challenge
 * ----------------------------------------------------------------------------
 * WHY THIS EXISTS. A day's practice was the base set alone: about twelve items,
 * all on the skill being taught that day. Two problems with that. It is short
 * enough that a fluent nine-year-old is finished in under ten minutes, and
 * everything in it is the same skill, which is the least durable way to spend
 * the time — massed practice of one thing is well known to fade faster than the
 * same number of questions spread across days and mixed with older material.
 *
 * So a served set is now three blocks:
 *
 *   CURRENT    the base set, untouched, in its original order.
 *   REVIEW     items pulled from sets the child has already worked through,
 *              deliberately split between recent work and older work so the
 *              spacing is real rather than "yesterday again".
 *   CHALLENGE  harder items for this same set, taken from the extra bank that
 *              was already written and, until now, only ever reached the
 *              printed worksheets.
 *
 * The extra bank is the reason this is cheap: EXTRA already holds roughly one
 * more set's worth of items for every set in both years, tier-tagged, written
 * by the same hand as the base. Nothing here invents questions.
 *
 * TWO THINGS THAT MUST NOT BREAK, and how they are protected:
 *
 * 1. ATTEMPT HISTORY. An item with no `id` is keyed by its POSITION
 *    (`normalizeSet` names it `<setId>-i<n>`), so reordering a set silently
 *    re-points every answer a child has already given. The base block is
 *    therefore left exactly where it was — same items, same order, same
 *    positions — and the new blocks are APPENDED after it. Everything added
 *    carries an explicit id, so it never takes a positional name and never
 *    displaces one.
 *
 * 2. STABILITY BETWEEN VISITS. Selection is seeded off the set id, not a
 *    random source, so a set composes identically every time it is opened.
 *    A child who answers six questions, closes the iPad and comes back must
 *    find the same six questions, not a fresh draw.
 *
 * Tiers keep their existing meaning, which is what Today renders as
 * sections: review lands in Warm-Up (tier 0), where recalling something you
 * already know belongs, and challenge lands in tier 2.
 *
 * Turn the whole thing off with MIX.CONFIG.enabled = false; the served set is
 * then byte-identical to what it was before this file existed.
 * ==========================================================================*/
(function(){
  window.__CURR = window.__CURR || {};

  const CONFIG = {
    enabled: true,
    review: 6,        // items drawn from earlier sets
    challenge: 6,     // harder items for this set, from the extra bank
    recentShare: 0.5, // half the review from the last few sets, half from older
    recentWindow: 4   // "recent" means this many sets back
  };

  /* PER CHILD, because one mix cannot serve both pilots.
   *
   * The attempt logs (8 days, Sept 2026) say the two need opposite things, and
   * a single global setting would have to be wrong for one of them:
   *
   *   Hank   works FIFTH-grade sets and scores 58%, under the 80% bar on five
   *          of seven. He is not short of difficulty. More recall, little stretch.
   *   Brock  works THIRD-grade sets and scores 91% on everything he actually
   *          answers — then leaves the rest of the page blank. He is not short
   *          of practice. Stretch, not repetition.
   *
   * Keyed by profile name, lowercased, because that is what the app already
   * knows about a pilot at the point the sets are built. A name with no entry
   * here simply gets the defaults above. */
  const BY_NAME = {
    hank:  {review: 10, challenge: 2},
    brock: {review: 4,  challenge: 12}
  };

  const configFor = who => {
    const k = String(who||"").trim().toLowerCase();
    return BY_NAME[k] ? Object.assign({}, CONFIG, BY_NAME[k]) : CONFIG;
  };

  /* Deterministic PRNG. Same set id, same draw, every time — see note 2. */
  function rng(seed){
    let h = 2166136261 >>> 0;
    const s = String(seed);
    for(let i=0;i<s.length;i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return function(){
      h ^= h << 13; h >>>= 0;
      h ^= h >> 17;
      h ^= h << 5;  h >>>= 0;
      return h / 4294967296;
    };
  }
  function shuffled(list, rand){
    const a = (list||[]).slice();
    for(let i=a.length-1;i>0;i--){ const j = Math.floor(rand()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; }
    return a;
  }
  const usable = it => it && !it.retired && String(it.q||"").trim();

  /* WHICH YEAR A SET BELONGS TO. ALL_SETS holds BOTH curricula (190 third-grade
   * sets and 175 fifth-grade ones), so "every set before this one in the array"
   * is not the same thing as "work this child has already done". A fifth
   * grader reviewing third-grade sets they never sat is not review, it is
   * below-grade filler. The app passes a single-curriculum list today, but the
   * composer must not depend on the caller getting that right. */
  const familyOf = id => /^y5/.test(String(id||"")) ? "y5" : "y3";
  const sameFamily = (id, list) => (list||[]).filter(s => s && familyOf(s.id) === familyOf(id));

  /* An added item is a copy carrying its own id, so it is never keyed by
   * position and can never collide with a base item's positional name. */
  function tag(it, id, tier){
    const out = Object.assign({}, it, {id: id});
    if(tier != null) out.t = tier;
    return out;
  }

  /* ---- the three blocks ------------------------------------------------ */

  /* REVIEW. Items from sets before this one, split between recent and older so
   * the gap is genuinely varied. Their own challenge items are left behind —
   * this block is meant to be recall, not a second challenge section.
   *
   * IDENTITY IS THE ORIGINAL INDEX, never the shuffled position. Keying an
   * item by where it landed in a shuffle meant the same question drew a
   * different id on a second pass, so the dedup below compared SLOTS rather
   * than questions and let duplicates through — 96% of composed pages repeated
   * a question, one of them asking "7 x 7" three times. */
  function candidates(sets, keep, prefix, rand){
    return shuffled(sets, rand).flatMap(s =>
      shuffled((s.items||[]).map((it, idx) => ({it, idx})), rand)
        .filter(x => usable(x.it) && keep(x.it))
        .map(x => ({id: prefix + s.id + "-" + x.idx, it: x.it})));
  }

  /* Two questions are "the same" when their text matches once whitespace and
   * case are taken out — the same rule the printed sheet and the app already
   * use to drop repeats. */
  const qkey = it => String((it && it.q) || "").replace(/\s+/g, "").toLowerCase();

  function take(cands, want, seenIds, seenQs, tier, out){
    for(const c of cands){
      if(out.length >= want) return;
      if(seenIds[c.id] || seenQs[qkey(c.it)]) continue;
      seenIds[c.id] = 1; seenQs[qkey(c.it)] = 1;
      out.push(tag(c.it, c.id, tier));
    }
  }

  function reviewItems(setId, ordered, want, rand, cfg, seenIds, seenQs){
    if(want <= 0) return [];
    const fam = sameFamily(setId, ordered);
    const at = fam.findIndex(s => s && s.id === setId);
    if(at <= 0) return [];                       // first set of the year: nothing to review
    const prior = fam.slice(0, at);
    const cut = Math.max(0, prior.length - cfg.recentWindow);
    const recent = prior.slice(cut), older = prior.slice(0, cut);
    const keep = it => (it.t||0) <= 1;

    const picked = [];
    take(candidates(recent, keep, "mixr-", rand), Math.round(want * cfg.recentShare), seenIds, seenQs, 0, picked);
    take(candidates(older,  keep, "mixr-", rand), want, seenIds, seenQs, 0, picked);
    take(candidates(recent, keep, "mixr-", rand), want, seenIds, seenQs, 0, picked);
    return picked;
  }

  /* CHALLENGE. The extra bank for THIS set, hardest first. Falls back to the
   * extra bank's easier items, then to challenge items from earlier sets, so a
   * set with a thin extra bank still fills its block. Same identity rule as
   * review: the id is the item's index in its own bank. */
  function challengeItems(setId, ordered, want, rand, seenIds, seenQs){
    if(want <= 0) return [];
    const EXTRA = window.__CURR.EXTRA || {};
    const mine = (EXTRA[setId]||[]).map((it, idx) => ({it, idx})).filter(x => usable(x.it));
    const mk = xs => shuffled(xs, rand).map(x => ({id: "mixc-" + setId + "-" + x.idx, it: x.it}));

    const picked = [];
    take(mk(mine.filter(x => (x.it.t||0) === 2)), want, seenIds, seenQs, 2, picked);
    take(mk(mine.filter(x => (x.it.t||0) !== 2)), want, seenIds, seenQs, 2, picked);
    if(picked.length >= want) return picked;

    const fam = sameFamily(setId, ordered);
    const at = fam.findIndex(s => s && s.id === setId);
    const prior = at > 0 ? fam.slice(0, at) : [];
    take(candidates(prior, it => (it.t||0) === 2, "mixc-", rand), want, seenIds, seenQs, 2, picked);
    return picked;
  }

  /* ---- compose --------------------------------------------------------- */

  /* setsFor() is called from render paths — several times per frame in places —
   * and composing shuffles a few hundred items each time. The result is
   * deterministic, so it is computed once per set and kept. Cleared whenever
   * the config changes, which is the only thing that can alter the outcome. */
  let cache = {};
  function invalidate(){ cache = {}; }

  function compose(set, ordered, who){
    const cfg = configFor(who);
    if(!cfg.enabled || !set || !Array.isArray(set.items) || !set.items.length) return set;
    if(set.__mixed) return set;                   // never compose twice
    /* The child is part of the cache key: two pilots on the same set get
     * different mixes, and caching one under the other would serve Brock's
     * twelve challenge items to Hank. */
    const ck = String(who||"") + "|" + familyOf(set.id) + ":" + set.id;
    const hit = cache[ck];
    if(hit && hit.from === set) return hit.out;   // same source object → same answer
    const rand = rng(set.id);
    /* Seeded with the base set's own questions: an added item must not repeat
     * something the child is already being asked on this page. */
    const seenIds = {}, seenQs = {};
    set.items.forEach(it => { if(it && it.id) seenIds[it.id] = 1; seenQs[qkey(it)] = 1; });
    const review = reviewItems(set.id, ordered||[], cfg.review, rand, cfg, seenIds, seenQs);
    const challenge = challengeItems(set.id, ordered||[], cfg.challenge, rand, seenIds, seenQs);
    if(!review.length && !challenge.length){ cache[ck]={from:set, out:set}; return set; }
    const add = review.concat(challenge);
    const out = Object.assign({}, set, {
      __mixed: true,
      items: set.items.concat(add),                // base block keeps positions 0..n-1
      mix: {current: set.items.length, review: review.length, challenge: challenge.length}
    });
    cache[ck] = {from: set, out: out};
    return out;
  }

  function applyAll(sets, ordered, who){
    if(!Array.isArray(sets)) return sets;
    return sets.map(s => compose(s, ordered, who));
  }

  /* Changing the mix from the console is a supported thing to do — it is how
   * the counts get tuned against a real child — so it must drop the cache. */
  function configure(patch){ Object.assign(CONFIG, patch||{}); invalidate(); return CONFIG; }
  /* Tune one pilot without touching the other: MIX.setFor("brock",{challenge:16}) */
  function setFor(who, patch){
    const k=String(who||"").trim().toLowerCase();
    BY_NAME[k]=Object.assign({}, BY_NAME[k]||{}, patch||{});
    invalidate(); return BY_NAME[k];
  }

  window.__CURR.MIX = {CONFIG, BY_NAME, compose, applyAll, configure, setFor, configFor, invalidate};
})();
