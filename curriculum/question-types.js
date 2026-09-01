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

  /* Each type answers four questions:
   *   input   what the child is given to answer with
   *   grade   (item, response) -> true | false | null   (null = needs a human)
   *   text    the answer as prose, for the teacher and the answer key
   *   check   authoring validation: returns an error string or null      */
  const TYPES = {

    "short-answer": {
      label:"Short answer", input:"text", graded:true,
      grade:(it,r)=> norm(r)!=="" && arr(it.a).some(a=>norm(a)===norm(r)),
      text:it=> arr(it.a).join(" or "),
      check:it=> arr(it.a).length ? null : "needs an answer"
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
        return arr(it.a).length===blanks ? null : "has "+blanks+" blanks but "+arr(it.a).length+" answers";
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

  window.QTypes = {
    TYPES, DEFAULT, MIX,
    normalize, normalizeSet, grade, answerText, isAutoGraded,
    inputKind, typeLabel, typeOf, validateSet, mixOrder,
    norm, looseNorm:loose,
    list(){ return Object.keys(TYPES).map(k=>({id:k, label:TYPES[k].label, input:TYPES[k].input, graded:TYPES[k].graded!==false})); }
  };
})();
