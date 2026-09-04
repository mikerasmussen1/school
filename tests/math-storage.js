/* Where maths' progress is stored, and that moving it cannot lose any.
 *
 * Maths' twelve bags sat at the top level of a child's slice while every other
 * subject wrote into slice.subjects[id].data. They now go to both places, and
 * reads prefer whichever is newer. Both halves of that matter:
 *
 *   - write both, because Brock and Hank are mid-year with real work in these
 *     bags and a device that has not reloaded still runs the old build. Writing
 *     only the new place makes their progress vanish there.
 *   - prefer newer, because that old build rewrites the flat keys and carries
 *     the namespaced copy along untouched. Its stale copy must not win.
 *
 * A record written by this build must also still be readable by the old one,
 * which is what the flat keys guarantee. */
const fs=require('fs'), D=__dirname+'/../curriculum/';
const store={};
global.window=global;
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.document={addEventListener(){},removeEventListener(){},visibilityState:"visible",createElement:()=>({style:{}}),body:{}};
global.addEventListener=global.removeEventListener=function(){};
global.setInterval=()=>0; global.clearInterval=()=>{}; global.setTimeout=()=>0; global.clearTimeout=()=>{};
global.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:"",href:""}; global.navigator={onLine:true};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.React={createElement:(t,p,...c)=>({__el:t,props:p,children:c})};

const h=fs.readFileSync(__dirname+'/../index.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1])
  .forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const parts=h.split('data-dc-script>');
const src=(parts[1]||h.split(/<script(?![^>]*src)[^>]*>/).pop()).split('</script>')[0];
const C=eval("(function(){ "+src+"\n return Component; })()");

let fail=[];
const has=(w,c)=>{ console.log("  "+(c?"ok  ":"FAIL")+"  "+w); if(!c) fail.push(w); };
const eq=(w,g,e)=>has(w+": "+JSON.stringify(g), JSON.stringify(g)===JSON.stringify(e));

const BAGS=C.MATH_BAGS;
console.log("  bags: "+BAGS.join(", "));

// a slice with something distinguishable in every bag
const mk=(tag,updated)=>{
  const s={subjects:{la:{opened:2,data:{week:3}}}, curriculum:"y3", updated:updated||1000};
  BAGS.forEach((k,i)=>{ s[k]={[tag+i]:tag+"-"+k}; });
  return s;
};

console.log("\n=== every bag survives a round trip ===");
{
  const flat=mk("v");
  const packed=C.packMath(flat);
  const back=C.unpackMath(packed);
  const lost=BAGS.filter(k=>JSON.stringify(back[k])!==JSON.stringify(flat[k]));
  has("all "+BAGS.length+" bags come back identical"+(lost.length?" — LOST "+lost.join(", "):""),
      lost.length===0);
  has("other subjects' namespaces are untouched",
      JSON.stringify(packed.subjects.la)===JSON.stringify(flat.subjects.la));
  has("curriculum survives", back.curriculum==="y3");
}

console.log("\n=== it writes BOTH places, so the old build still reads it ===");
{
  const packed=C.packMath(mk("v"));
  const missingFlat=BAGS.filter(k=>packed[k]===undefined);
  has("the flat keys are still there for a device on the old build"
      +(missingFlat.length?" — MISSING "+missingFlat.join(", "):""), missingFlat.length===0);
  const d=packed.subjects.math.data;
  const missingNs=BAGS.filter(k=>d[k]===undefined);
  has("and the namespaced copy is complete"
      +(missingNs.length?" — MISSING "+missingNs.join(", "):""), missingNs.length===0);
  has("the namespaced copy is stamped", typeof d.__at==="number");
}

console.log("\n=== a record that never migrated still reads ===");
{
  const legacy=mk("old");                 // flat only, no subjects.math at all
  delete legacy.subjects.math;
  const back=C.unpackMath(legacy);
  const lost=BAGS.filter(k=>JSON.stringify(back[k])!==JSON.stringify(legacy[k]));
  has("a pre-migration slice is returned untouched"+(lost.length?" — LOST "+lost.join(", "):""),
      lost.length===0);
}

console.log("\n=== the old build's stale namespace copy must not win ===");
{
  // This build wrote at t=1000. Then an old build wrote the flat keys at
  // t=2000, carrying the t=1000 namespace copy along unchanged.
  const mine=C.packMath(mk("new",1000));
  const afterOldBuild={...mine, updated:2000};
  BAGS.forEach((k,i)=>{ afterOldBuild[k]={["fresh"+i]:"fresh-"+k}; });
  const back=C.unpackMath(afterOldBuild);
  const wrong=BAGS.filter(k=>JSON.stringify(back[k])!==JSON.stringify(afterOldBuild[k]));
  has("the newer flat keys win over the stale namespaced copy"
      +(wrong.length?" — WRONG "+wrong.join(", "):""), wrong.length===0);
  has("and nothing came from the stale copy",
      !JSON.stringify(back.pChecked).includes("new-"));
}

console.log("\n=== when the namespaced copy is the newer one, it wins ===");
{
  const s=mk("stale",1000);
  s.subjects.math={data:{}};
  BAGS.forEach((k,i)=>{ s.subjects.math.data[k]={["ns"+i]:"ns-"+k}; });
  s.subjects.math.data.__at=5000;
  const back=C.unpackMath(s);
  const wrong=BAGS.filter(k=>!JSON.stringify(back[k]).includes("ns-"));
  has("the newer namespaced copy is used"+(wrong.length?" — WRONG "+wrong.join(", "):""),
      wrong.length===0);
}

console.log("\n=== restarting the year clears BOTH copies ===");
{
  const lived=C.packMath(mk("work"));
  lived.subjects.math={...lived.subjects.math, level:"y3"};
  const reset=C.resetSlice(lived);
  const back=C.unpackMath(reset);
  const dirty=BAGS.filter(k=>{
    const v=back[k];
    return v && typeof v==="object" && Object.keys(v).length>0;
  });
  has("no bag still holds work"+(dirty.length?" — STILL SET "+dirty.join(", "):""),
      dirty.length===0);
  has("the namespaced copy is emptied too",
      Object.keys((reset.subjects.math||{}).data||{}).length===0);
  has("but the grade placement survives", (reset.subjects.math||{}).level==="y3");
}

console.log("\n=== the component hydrates a migrated record ===");
{
  const c=new C(); c.props={};
  const packed=C.packMath(mk("live"));
  // strip the flat keys, as a fully-migrated record eventually will not have them
  const nsOnly={subjects:packed.subjects, curriculum:"y3", updated:1000};
  const back=C.unpackMath(nsOnly);
  const lost=BAGS.filter(k=>back[k]===undefined);
  has("a namespace-only record still yields every bag"
      +(lost.length?" — LOST "+lost.join(", "):""), lost.length===0);
  has("pChecked is the one from the namespace",
      JSON.stringify(back.pChecked).includes("live-pChecked"));
}

console.log("");
if(fail.length){
  console.log("FAILED "+fail.length+":");
  fail.forEach(f=>console.log("  - "+f));
  process.exit(1);
}
console.log("all checks passed");
