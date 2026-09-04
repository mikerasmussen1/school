/* An attempt has to keep naming the question that was actually answered.
 *
 * qid was `set.id + "-i" + (idx+1)` — the item's POSITION — for every one of
 * the 9,300 items, because none of them has ever carried the stable id the
 * question-types header promises. Insert one question at the top of a set and
 * yesterday's "u1w1p1-i3" names a different question: every attempt already
 * logged shifts by one, silently, and most-missed, dynamic difficulty and the
 * teacher drill-down all read that log.
 *
 * The trade is deliberate and tested both ways: content ids survive insertion
 * and reordering, and DO change when a question is rewritten — which detaches
 * that item's history rather than misattributing it. Detaching is the better
 * error.
 */
const fs=require('fs'), D=__dirname+'/../curriculum/';
global.window=global; window.__CURR={};
window.Subjects={register(){},all:()=>[],get:()=>null,has:()=>false};
global.localStorage={getItem:()=>null,setItem(){},removeItem(){}};
global.document={addEventListener(){},removeEventListener(){},createElement:()=>({style:{}})};
global.addEventListener=global.removeEventListener=function(){};
global.setInterval=()=>0; global.clearInterval=()=>{}; global.setTimeout=()=>0; global.clearTimeout=()=>{};
global.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:"",href:""};

const page=fs.readFileSync(__dirname+'/../index.html','utf8');
[...page.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1])
  .forEach(m=>{try{require(D+m+'.js')}catch(e){}});
const QT=window.QTypes;

let fail=[];
const has=(w,c,got)=>{ console.log("  "+(c?"ok  ":"FAIL")+"  "+w+(c?"":"   got "+got)); if(!c) fail.push(w); };

console.log("=== the failure this replaces ===");
{
  const before={id:"s1", items:[
    {t:0,q:"2 x 3",a:"6"}, {t:0,q:"4 x 5",a:"20"}, {t:1,q:"7 x 8",a:"56"}]};
  const target=before.items[2];
  const idBefore=QT.idFor(before,target);

  // the same set with one question inserted at the front
  const after={id:"s1", items:[{t:0,q:"1 x 1",a:"1"}, ...before.items]};
  const idAfter=QT.idFor(after,target);

  has("a slot number would have moved: was index 2, now 3", true, "");
  has("the content id does not move on insertion", idBefore===idAfter, idBefore+" vs "+idAfter);

  const shuffled={id:"s1", items:[before.items[2], before.items[0], before.items[1]]};
  has("nor on reordering", QT.idFor(shuffled,target)===idBefore, QT.idFor(shuffled,target));
}

console.log("\n=== rewriting a question detaches it, on purpose ===");
{
  const s={id:"s1", items:[{t:0,q:"2 x 3",a:"6"}]};
  const a=QT.idFor(s,s.items[0]);
  const s2={id:"s1", items:[{t:0,q:"What is 2 x 3?",a:"6"}]};
  has("a rewritten question gets a different id", a!==QT.idFor(s2,s2.items[0]), "");
  // whitespace and case are not a rewrite
  const s3={id:"s1", items:[{t:0,q:"2   X  3",a:"6"}]};
  has("but whitespace and case are not a rewrite", a===QT.idFor(s3,s3.items[0]),
      QT.idFor(s3,s3.items[0]));
}

console.log("\n=== it is scoped to its set, and to its answer ===");
{
  const a={id:"setA", items:[{t:0,q:"2 x 3",a:"6"}]};
  const b={id:"setB", items:[{t:0,q:"2 x 3",a:"6"}]};
  has("the same question in two sets gets two ids",
      QT.idFor(a,a.items[0])!==QT.idFor(b,b.items[0]), "");
  const c={id:"setA", items:[{t:0,q:"2 x 3",a:"7"}]};
  has("the same question with a different answer differs",
      QT.idFor(a,a.items[0])!==QT.idFor(c,c.items[0]), "");
  const d={id:"setA", items:[{t:2,q:"2 x 3",a:"6"}]};
  has("and a different tier differs", QT.idFor(a,a.items[0])!==QT.idFor(d,d.items[0]), "");
}

console.log("\n=== exact duplicates stay apart ===");
{
  const s={id:"s1", items:[{t:0,q:"2 x 3",a:"6"},{t:0,q:"2 x 3",a:"6"},{t:0,q:"2 x 3",a:"6"}]};
  const ids=s.items.map(it=>QT.idFor(s,it));
  has("three identical items get three ids: "+ids.join(" "),
      new Set(ids).size===3, ids.join(" "));
  has("and each is stable when asked twice",
      s.items.every(it=>QT.idFor(s,it)===QT.idFor(s,it)), "");
}

console.log("\n=== an authored id always wins ===");
{
  const s={id:"s1", items:[{id:"frozen-1",t:0,q:"2 x 3",a:"6"}]};
  has("a real id is used as-is", QT.idFor(s,s.items[0])==="frozen-1", QT.idFor(s,s.items[0]));
  // an item carrying a real id is skipped when counting occurrences, so the
  // content-id item beside it is still the first of its kind
  const s2={id:"s1", items:[{id:"frozen-1",t:0,q:"2 x 3",a:"6"},{t:0,q:"2 x 3",a:"6"}]};
  const solo={id:"s1", items:[{t:0,q:"2 x 3",a:"6"}]};
  has("an authored id is not counted as an occurrence",
      QT.idFor(s2,s2.items[1])===QT.idFor(solo,solo.items[0]),
      QT.idFor(s2,s2.items[1])+" vs "+QT.idFor(solo,solo.items[0]));
}

console.log("\n=== a copy, or a set with no items, does not invent an occurrence ===");
{
  const s={id:"s1", items:[{t:0,q:"2 x 3",a:"6"},{t:0,q:"2 x 3",a:"6"}]};
  const first=QT.idFor(s,s.items[0]);
  // a caller that hands us a COPY cannot be placed; it must not become ".1"
  const copy={t:0,q:"2 x 3",a:"6"};
  has("a copy resolves to the first occurrence, not a new one",
      QT.idFor(s,copy)===first, QT.idFor(s,copy)+" vs "+first);
  // the tutor path logs against a synthetic set that has no items array
  has("a set with no items still yields an id",
      /^lesson7:/.test(QT.idFor({id:"lesson7"},copy)), QT.idFor({id:"lesson7"},copy));
}

console.log("\n=== across the real bank ===");
{
  const sets=window.__CURR.ALL_SETS||[];
  has("the bank loaded", sets.length>300, sets.length);
  let n=0, clashes=0;
  for(const set of sets){
    const seen=new Map();
    for(const it of (set.items||[])){
      n++;
      const id=QT.idFor(set,it);
      if(seen.has(id) && seen.get(id)!==it) clashes++;
      seen.set(id,it);
    }
  }
  has(n+" items, 0 id collisions inside a set", clashes===0, clashes);
  // no id should be empty or contain a separator that breaks a log key
  const bad=[];
  for(const set of sets.slice(0,60))
    for(const it of (set.items||[])){
      const id=QT.idFor(set,it);
      if(!id || /\s/.test(id) || id.length>80) bad.push(id);
    }
  has("ids are non-empty, whitespace-free and short", bad.length===0, bad.slice(0,3).join(","));
}

console.log("");
if(fail.length){ console.log("FAILED "+fail.length+":"); fail.forEach(f=>console.log("  - "+f)); process.exit(1); }
console.log("all checks passed");
