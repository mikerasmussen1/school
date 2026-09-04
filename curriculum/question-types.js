/* Standard question types — the one place that decides what a question IS.
 * ---------------------------------------------------------------------------
 * Every exercise in every subject, on screen or on paper, is a list of items
 * that pass through here. An item is:
 *
 *   { id, type, t, q, a, hint, ...type-specific fields }
 *
 *   id    stable string. Never reused, never renumbered — the attempt log,
 *         the printed sheets and the scanner all key off it. Retire an item
 *         by setting retired:true; do not delete it.
 *   type  one of TYPES below. Missing type means "short-answer".
 *   t     tier: 0 Warm-Up, 1 Core, 2 Challenge.
 *   q     the prompt.
 *   a     the answer, in the shape that type expects.
 *   hint  optional, shown after a miss.
 *
 * Legacy items authored as q(t,q,a,hint) — every math item today — normalize
 * to short-answer untouched, which is why nothing in the existing curriculum
 * had to be rewritten.
 *
 * Plain script. Exports window.QTypes. No dependencies.
 * ------------------------------------------------------------------------ */
(function(){

  const norm = v => String(v==null?"":v).replace(/[\s,]/g,"").toLowerCase().replace(/^0+(?=\d)/,"");
  const loose = v => String(v==null?"":v).trim().replace(/\s+/g," ").toLowerCase();
  const numOf = v => { const m=String(v==null?"":v).replace(/[\s,$]/g,"").match(/-?\d*\.?\d+/); return m?parseFloat(m[0]):NaN; };
  const unitOf = v => String(v==null?"":v).replace(/[\s,]/g," ").replace(/-?\d*\.?\d+/,"").trim().toLowerCase();
  const arr = v => Array.isArray(v)?v:(v==null?[]:[v]);
  // Answers that can actually be answered. An empty or whitespace-only string
  // is NOT an answer, but arr("") has length 1, so a plain length check waves
  // it through — and grade() then returns false for every input a child could
  // type, making the question impossible rather than merely hard. That matters
  // most for tutor-generated lessons: validate() is the only gate between raw
  // model output and a child's screen, and a hallucinated "a": "" used to pass
  // it with zero errors, so no retry fired.
  const answers = v => arr(v).filter(x => String(x==null?"":x).trim() !== "");

  /* ---- Does the child's answer MEAN the same as the key? ----------------
   *
   * String comparison alone marked correct work wrong, on a scale worth
   * stating: every one of the ~9,300 maths items carries exactly one accepted
   * string, 1,007 of them fractions. A child who wrote .6 for 0.6, or 0.60, or
   * 3/6 where the key said 1/2, was told they were wrong. norm() did not help
   * — it strips leading zeros only before a DIGIT, so "0.6" and ".6" stayed
   * different strings.
   *
   * Fixing it in the grader rather than in the data is deliberate. The
   * alternative was adding an array of accepted forms to a thousand items,
   * which is a thousand chances to miss one and does nothing for the next item
   * anybody writes.
   *
   * WHAT IS NOT ACCEPTED, and why. A fraction is only matched by value when
   * the question is not asking about form. "Simplest form: 4/6" wants 2/3, and
   * taking 4/6 for it would mark the child correct for doing none of the work
   * the question is about — so when the prompt says simplest, lowest terms or
   * simplify, the key must be matched exactly. A decimal typed where a
   * fraction was asked for is likewise not accepted: "type as a/b" is teaching
   * notation, and 0.5 is not the answer to it. */
  const valueOf = s => {
    const t = String(s==null?"":s).replace(/[\s,$]/g,"");
    if(t === "") return NaN;
    let m = t.match(/^(-?\d+)\/(\d+)$/);                 // 3/6
    if(m) return +m[2] === 0 ? NaN : +m[1] / +m[2];
    m = t.match(/^(-?\d+)(\d+)\/(\d+)$/);                // 1 1/2 (spaces stripped)
    if(m) return +m[3] === 0 ? NaN : +m[1] + (+m[2] / +m[3]);
    if(/^-?(\d+\.?\d*|\.\d+)$/.test(t)) return parseFloat(t);
    return NaN;
  };
  const isFraction = s => /^\s*-?\d+\s*\/\s*\d+\s*$/.test(String(s==null?"":s));
  const wantsForm = it => /simplest|lowest term|simplify|reduce/i.test(String((it&&it.q)||""));

  const sameValue = (it, key, resp) => {
    if(norm(key) === norm(resp)) return true;               // exact, as before
    const a = valueOf(key), b = valueOf(resp);
    if(isNaN(a) || isNaN(b)) return false;
    // A question about form is answered by the form, not the value.
    if(wantsForm(it)) return false;
    // Do not let a decimal answer a question that asked for a fraction.
    if(isFraction(key) && !isFraction(resp)) return false;
    return Math.abs(a - b) < 1e-9;
  };

  /* Each type answers four questions:
   *   input   what the child is given to answer with
   *   grade   (item, response) -> true | false | null   (null = needs a human)
   *   text    the answer as prose, for the teacher and the answer key
   *   check   authoring validation: returns an error string or null      */
  const TYPES = {

    "short-answer": {
      label:"Short answer", input:"text", graded:true,
      grade:(it,r)=> norm(r)!=="" && arr(it.a).some(a=>sameValue(it,a,r)),
      text:it=> arr(it.a).join(" or "),
      check:it=> answers(it.a).length ? null : "needs an answer"
    },

    "number-units": {
      label:"Number with units", input:"text", graded:true,
      // 3.50 == 3.5, and the unit must match if the item names one.
      grade:(it,r)=>{
        if(norm(r)==="") return false;
        const want=numOf(it.a), got=numOf(r);
        if(isNaN(want)||isNaN(got)) return false;
        const tol=it.tol==null?0:Number(it.tol);
        if(Math.abs(want-got) > tol + 1e-9) return false;
        const wu=it.unit!=null?String(it.unit).toLowerCase():unitOf(it.a);
        if(!wu) return true;
        const gu=unitOf(r);
        return gu==="" ? !it.unitRequired : gu===wu || arr(it.unitAlso).some(u=>String(u).toLowerCase()===gu);
      },
      text:it=> String(it.a),
      check:it=> isNaN(numOf(it.a)) ? "answer has no number in it" : null
    },

    "multiple-choice": {
      label:"Multiple choice", input:"choice", graded:true,
      // a is the index, or the text of the correct option.
      grade:(it,r)=>{
        const opts=arr(it.options);
        const want = typeof it.a==="number" ? it.a
          : opts.findIndex(o=>loose(o)===loose(it.a));
        const got = typeof r==="number" ? r : opts.findIndex(o=>loose(o)===loose(r));
        return got>=0 && got===want;
      },
      text:it=>{
        const opts=arr(it.options);
        return typeof it.a==="number" ? String(opts[it.a]) : String(it.a);
      },
      check:it=>{
        const opts=arr(it.options);
        if(opts.length<2) return "needs at least two options";
        if(typeof it.a==="number") return (it.a>=0&&it.a<opts.length)?null:"answer index is outside the options";
        return opts.some(o=>loose(o)===loose(it.a))?null:"answer is not one of the options";
      }
    },

    "true-false": {
      label:"True / false", input:"choice", graded:true,
      grade:(it,r)=>{
        const t=v=>{ const s=loose(v); return s==="true"||s==="t"||s==="yes"||v===true; };
        const f=v=>{ const s=loose(v); return s==="false"||s==="f"||s==="no"||v===false; };
        if(!t(r)&&!f(r)) return false;
        return t(r)===t(it.a);
      },
      text:it=> (loose(it.a)==="true"||it.a===true) ? "True" : "False",
      check:()=> null,
      options:["True","False"]
    },

    "fill-blank": {
      label:"Fill in the blank", input:"blanks", graded:true,
      // q carries one or more ___ runs; a is an array, one answer per blank.
      grade:(it,r)=>{
        const want=arr(it.a), got=arr(r);
        if(got.length<want.length) return false;
        return want.every((w,i)=> arr(w).some(alt=>norm(alt)===norm(got[i])));
      },
      text:it=> arr(it.a).map(w=>arr(w)[0]).join(" · "),
      check:it=>{
        const blanks=(String(it.q).match(/_{2,}/g)||[]).length;
        if(!blanks) return "prompt has no ___ blank in it";
        const a=arr(it.a);
        if(a.length!==blanks) return "has "+blanks+" blanks but "+a.length+" answers";
        // Right count, but a blank whose only answer is "" is still unanswerable.
        return a.every(w=>answers(w).length) ? null : "a blank has no answer";
      }
    },

    "ordering": {
      label:"Put in order", input:"order", graded:true,
      // a is the correct sequence of the option strings (or their indexes).
      grade:(it,r)=>{
        const want=arr(it.a).map(loose), got=arr(r).map(loose);
        return want.length>0 && want.length===got.length && want.every((w,i)=>w===got[i]);
      },
      text:it=> arr(it.a).join(" → "),
      check:it=> arr(it.a).length>1 ? null : "needs at least two items to order"
    },

    "multi-part": {
      label:"Multi-part (a / b / c)", input:"parts", graded:true,
      // parts:[{label,q,a,type}] — each part is graded by its own type.
      grade:(it,r)=>{
        const parts=arr(it.parts), got=r&&typeof r==="object"?r:{};
        if(!parts.length) return false;
        let any=false;
        const all=parts.every((p,i)=>{
          const key=p.label||String(i);
          const resp=got[key]!==undefined?got[key]:got[i];
          if(resp!==undefined&&String(resp)!=="") any=true;
          return TYPES[p.type||"short-answer"].grade({...p,a:p.a}, resp)===true;
        });
        return any && all;
      },
      text:it=> arr(it.parts).map((p,i)=>(p.label||String.fromCharCode(97+i))+") "+TYPES[p.type||"short-answer"].text(p)).join("   "),
      check:it=> arr(it.parts).length ? null : "needs parts"
    },

    "written-response": {
      label:"Written response", input:"textarea", graded:false,
      // No machine grade. The rubric is what the grown-up marks against, and
      // the attempt log keeps the child's text for them to read.
      grade:()=> null,
      text:it=> it.exemplar ? String(it.exemplar) : "Teacher-marked against the rubric",
      check:it=> arr(it.rubric).length ? null : "needs a rubric"
    }
  };

  const DEFAULT="short-answer";
  const typeOf = it => (it && TYPES[it.type]) ? it.type : DEFAULT;
  const def = it => TYPES[typeOf(it)];

  /* Canonical form. Safe to call on an item that is already normalized. */
  function normalize(it, fallbackId){
    if(!it || typeof it!=="object") return null;
    const o={...it};
    o.type = typeOf(o);
    o.t = (o.t==null?1:Number(o.t));
    if(o.id==null) o.id = fallbackId==null ? null : String(fallbackId);
    if(o.type==="true-false" && !o.options) o.options=["True","False"];
    return o;
  }

  function normalizeSet(set, i){
    if(!set||typeof set!=="object") return null;
    const id=set.id||("set"+(i==null?"":i));
    return {...set, id, items:arr(set.items).map((it,k)=>normalize(it, id+"-i"+(k+1))).filter(Boolean)};
  }

  /* true / false / null-for-human. Never throws on a malformed item. */
  function grade(it, response){
    try{ const r=def(it).grade(normalize(it), response); return r===null?null:!!r; }
    catch(e){ return false; }
  }
  function answerText(it){ try{ return def(it).text(normalize(it)); }catch(e){ return String(it&&it.a); } }
  function isAutoGraded(it){ return def(it).graded!==false; }
  function inputKind(it){ return def(it).input; }
  function typeLabel(it){ return def(it).label; }

  /* Authoring guard. Runs over a whole DB payload before it is trusted. */
  function validateSet(set){
    const errs=[];
    const s=normalizeSet(set,0);
    if(!s) return {ok:false, errors:["not an object"]};
    if(!s.items.length) errs.push("set "+s.id+": no items");
    const seen={};
    s.items.forEach((it,i)=>{
      const where="set "+s.id+" item "+(it.id||i+1);
      if(!TYPES[it.type]) errs.push(where+": unknown type "+it.type);
      if(it.id){ if(seen[it.id]) errs.push(where+": duplicate id"); seen[it.id]=1; }
      if(!String(it.q||"").trim()) errs.push(where+": empty prompt");
      if(it.t<0||it.t>2) errs.push(where+": tier must be 0, 1 or 2");
      const e=def(it).check(it);
      if(e) errs.push(where+": "+e);
    });
    return {ok:!errs.length, errors:errs};
  }

  /* ---- difficulty mix -----------------------------------------------------
   * The Streak Run used to walk the bank in author order, and banks are
   * written easy-first, so five in a row was five Warm-Up items. This lays
   * the bank out in repeating windows of five — 1 Warm-Up, 2 Core, 2
   * Challenge — shuffled inside each tier, and backfills from the nearest
   * tier when a bank does not have that shape. Retired items never appear.
   * ---------------------------------------------------------------------- */
  const MIX=[1,2,2];
  function mixOrder(items, rnd){
    const R = rnd || Math.random;
    const live=[]; arr(items).forEach((it,i)=>{ if(!it||!it.retired) live.push(i); });
    const bucket=[[],[],[]];
    live.forEach(i=>{ const t=Math.min(2,Math.max(0,Number(items[i].t)||0)); bucket[t].push(i); });
    bucket.forEach(b=>{ for(let i=b.length-1;i>0;i--){ const j=Math.floor(R()*(i+1)); [b[i],b[j]]=[b[j],b[i]]; } });
    // Nearest non-empty tier, preferring harder — a Warm-Up slot filled by a
    // Core item is a smaller lie than a Challenge slot filled by a Warm-Up.
    const take=t=>{
      const order = t===0?[0,1,2] : t===1?[1,2,0] : [2,1,0];
      for(const k of order) if(bucket[k].length) return bucket[k].shift();
      return null;
    };
    const out=[];
    while(bucket.some(b=>b.length)){
      for(let t=0;t<3;t++) for(let k=0;k<MIX[t];k++){
        if(!bucket.some(b=>b.length)) break;
        const i=take(t); if(i!=null) out.push(i);
      }
    }
    return out;
  }

  /* ---- WHICH QUESTION WAS THIS? -----------------------------------------
   *
   * The header above promises every item carries a stable id that "the attempt
   * log, the printed sheets and the scanner all key off". Not one of the 9,300
   * items has ever had one, so logAttempt fell back to `set.id + "-i" + (n+1)`
   * — the item's POSITION.
   *
   * That is not an id, it is a slot number, and it silently re-points history.
   * Insert one question at the top of a set and yesterday's "u1w1p1-i3" names a
   * different question; every stored attempt for that set shifts by one and
   * nothing says so. Most-missed, dynamic difficulty and the teacher drill-down
   * all read that log.
   *
   * idFor derives the id from the item's CONTENT instead. That fixes the real
   * failure — inserting and reordering no longer disturb anything — without
   * rewriting 9,300 authored items. The trade is worth stating plainly: edit a
   * question's text and its id changes, so its history detaches. That is the
   * better of the two errors. A slot number keeps the history and quietly
   * attaches it to a different question; a content id admits that the question
   * is not the one that was answered.
   *
   * Ids frozen into the source data would survive text edits as well, and are
   * still the eventual answer. This is the part that needed no mass mutation.
   *
   * Exact duplicates exist — 222 of them, identical in both question and answer
   * — so occurrences are numbered to keep ids unique inside a set.
   */
  function fnv1a(str){
    let h = 0x811c9dc5;
    for(let i=0;i<str.length;i++){
      h ^= str.charCodeAt(i);
      h = (h + ((h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24))) >>> 0;
    }
    return h >>> 0;
  }
  function fingerprint(it){
    const q = String((it&&it.q)==null?"":it.q).replace(/\s+/g," ").trim().toLowerCase();
    const a = arr(it&&it.a).map(x=>String(x==null?"":x).trim().toLowerCase()).join("");
    const t = (it&&it.t)==null ? "" : String(it.t);
    return fnv1a(q+""+a+""+t).toString(36);
  }
  function idFor(set, item){
    if(item && item.id) return String(item.id);      // an authored id always wins
    const fp = fingerprint(item);
    const items = (set && set.items) || [];
    /* Occurrence is counted only up to THIS item, found by identity. If the
     * caller handed us a copy rather than the item itself — or a synthetic set
     * with no items at all, which the tutor path does — we cannot know which
     * occurrence it is, and counting matches would invent a ".1" and split one
     * question's history in two. Occurrence 0 is the honest answer there: it
     * names the first item with this content, which is what a copy came from. */
    let n = 0, found = false;
    for(let i=0;i<items.length;i++){
      if(items[i] === item){ found = true; break; }
      if(!items[i] || items[i].id) continue;
      if(fingerprint(items[i]) === fp) n++;
    }
    const base = ((set && set.id) ? set.id : "?") + ":" + fp;
    return (found && n) ? (base + "." + n) : base;
  }

  window.QTypes = {
    TYPES, DEFAULT, MIX,
    idFor, fingerprint,
    normalize, normalizeSet, grade, answerText, isAutoGraded,
    inputKind, typeLabel, typeOf, validateSet, mixOrder,
    norm, looseNorm:loose,
    list(){ return Object.keys(TYPES).map(k=>({id:k, label:TYPES[k].label, input:TYPES[k].input, graded:TYPES[k].graded!==false})); }
  };
})();
