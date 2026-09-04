/* The Year One mission page is one template for eight missions.
 *
 * It used to be eight hand-written copies, and the copies drifted: Mission 07's
 * heading still said "Three weeks, gate to gate" long after its bank grew to
 * five, because nothing recomputed it. That is the failure this guards — one
 * template can only drift if the DATA is wrong, and the data is checked here
 * against the bank rather than against another copy of itself.
 *
 * The other failure it guards is the quiet one. An unbound {{ }} in this DSL
 * renders EMPTY and only console.warns, so a mission page can lose a whole
 * section and still look like a page. Every binding the template uses must
 * therefore resolve for every mission. */
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
global.React={createElement:(t,p,...c)=>({__el:t,props:p,children:c})};   // the factor rainbow is real SVG

const P=__dirname+'/../index.html';
const h=fs.readFileSync(P,'utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1])
  .forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const parts=h.split('data-dc-script>');
const bodyJs=(parts[1]||h.split(/<script(?![^>]*src)[^>]*>/).pop()).split('</script>')[0];
const C=eval("(function(){ "+bodyJs+"\n return Component; })()");

let fail=[];
const has=(what,cond)=>{ console.log("  "+(cond?"ok  ":"FAIL")+"  "+what); if(!cond) fail.push(what); };

const lines=h.split('\n');
const s=lines.findIndex(l=>/YEAR ONE · GENERIC MISSION PAGE/.test(l));
const e=lines.findIndex((l,i)=>i>s && /YEAR TWO · GENERIC MISSION PAGE/.test(l));
has("the Year One template exists as one region", s>=0 && e>s);
const region=lines.slice(s,e).join('\n');

/* Which course a child is on comes from subjects.math.level (curricId ->
 * levelOf), NOT from slice.curriculum — setting the latter looks like it works
 * because "y3" is also the default, and then the Year Two case silently tests
 * Year One. */
const at=(u,level)=>{
  const c=new C(); c.props={};
  c.state={...c.state, view:"unit", unit:u, uview:u, week:1,
           subjects:{math:{level:level||"y3"}}};
  return c;
};
const vals=u=>at(u).renderVals();

console.log("\n=== it is ONE page, not eight ===");
{
  // Exactly one <main> in the region: the template. Eight copies would mean
  // eight, which is how this looked before.
  const mains=(region.match(/<main\b/g)||[]).length;
  has("the region holds a single <main> ("+mains+")", mains===1);
  const gates=[...region.matchAll(/\{\{\s*isUnit(\d)\s\}\}/g)].map(m=>+m[1]);
  has("eight per-mission manipulative gates remain: "+gates.join(","),
      gates.length===8 && gates.join(",")==="1,2,3,4,5,6,7,8");
}

console.log("\n=== every binding resolves, for every mission ===");
{
  const locals=new Set([...region.matchAll(/as="(\w+)"/g)].map(m=>m[1]));
  const used=[...new Set([...region.matchAll(/\{\{\s*([\w.]+)/g)]
    .map(m=>m[1].split('.')[0])
    .filter(k=>!locals.has(k) && k!=='true' && k!=='false'))];
  console.log("  "+used.length+" distinct root bindings in the template");
  for(let u=1;u<=8;u++){
    let v=null, err=null;
    try{ v=vals(u); }catch(x){ err=x.message; }
    if(err){ has("mission "+u+" renders ("+err+")", false); continue; }
    const missing=used.filter(k=>!(k in v));
    has("mission "+u+": all bindings present"+(missing.length?" — MISSING "+missing.join(", "):""),
        missing.length===0);
  }
}

console.log("\n=== the week heading is computed from the bank, not hand-written ===");
{
  const WORD={1:"One",2:"Two",3:"Three",4:"Four",5:"Five",6:"Six",7:"Seven",8:"Eight"};
  for(let u=1;u<=8;u++){
    const c=at(u);
    const n=c.weeksFor(u).length;
    const want=WORD[n]+" weeks, gate to gate";
    const got=c.renderVals().uWeekHeading;
    has("mission "+u+" has "+n+" weeks of sets and says \""+got+"\"", got===want);
  }
  // The specific drift this replaced.
  const c=at(7);
  has("mission 07 no longer claims three weeks",
      !/Three weeks/.test(c.renderVals().uWeekHeading));
  has("the number is spelled out, not a numeral",
      !/^\d/.test(c.renderVals().uWeekHeading));
}

console.log("\n=== per-mission prose is real data, not one shared sentence ===");
{
  const keys=["uPractice","uQuote","uName","uBigQ","uClosing"];
  keys.forEach(k=>{
    const seen=new Set();
    let blank=0;
    for(let u=1;u<=8;u++){ const x=vals(u)[k]; if(!x) blank++; seen.add(x); }
    has(k+": 8 missions, "+seen.size+" distinct values, "+blank+" blank",
        seen.size===8 && blank===0);
  });
  // These two are legitimately shared by most missions — but not by all, which
  // is exactly why they cannot be a literal in the template.
  const tn=[...new Set([1,2,3,4,5,6,7,8].map(u=>vals(u).uTestNote))];
  has("uTestNote differs for the mission scored on the Math Trail ("+tn.length+" variants)",
      tn.length===2 && /Math Trail/.test(vals(8).uTestNote));
  const wn=[...new Set([1,2,3,4,5,6,7,8].map(u=>vals(u).uWeeksNote))];
  has("uWeeksNote differs for Mission 01 ("+wn.length+" variants)",
      wn.length===2 && /All five weeks/.test(vals(1).uWeeksNote));
}

console.log("\n=== accents and links follow the mission ===");
{
  const colours=new Set(), packs=new Set();
  for(let u=1;u<=8;u++){ const v=vals(u); colours.add(v.uColor); packs.add(v.uPackHref); }
  has("eight distinct accent colours", colours.size===8);
  has("eight distinct print packs", packs.size===8);
  has("mission 3's pack is Unit 3's", vals(3).uPackHref==="Unit 3 Print Pack.pdf");
  has("the briefing label names the mission", vals(6).uNo==="Mission 06");
}

console.log("\n=== the manipulative gates are mutually exclusive ===");
{
  for(let u=1;u<=8;u++){
    const v=vals(u);
    const on=[1,2,3,4,5,6,7,8].filter(n=>v["isUnit"+n]);
    has("on mission "+u+" exactly one manipulative is open: ["+on.join(",")+"]",
        on.length===1 && on[0]===u);
    if(u===1) has("and the Year One page itself is open", v.isUnitY3===true);
  }
  // Year Two must not draw the Year One page.
  const v5=at(1,"y5").renderVals();
  has("a Year Two pilot gets the Year Two page, not this one",
      v5.isUnitY3===false && v5.isUnitY5===true);
  has("and no Year One manipulative opens for them",
      ![1,2,3,4,5,6,7,8].some(n=>v5["isUnit"+n]));
}

console.log("");
if(fail.length){
  console.log("FAILED "+fail.length+":");
  fail.forEach(f=>console.log("  - "+f));
  process.exit(1);
}
console.log("all checks passed");
