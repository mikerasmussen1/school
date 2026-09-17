/* The Today tab is the child's screen. Curriculum bookkeeping - the week's
 * spelling pattern and standards codes like "Standard RL.5.1" - belongs on the
 * parent and subject tabs, not here. Every binding the Today tab prints is
 * rendered for both grades across the year and searched. */
const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.URL={createObjectURL:()=>"b",revokeObjectURL:()=>{}};
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:""};
const fs=require('fs'), D=__dirname+'/../curriculum/';
window.Subjects={register(){},all:()=>[],get(){return null;}};
const h=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const C=eval("(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()");
let fail=[];

const a=h.indexOf('<sc-if value="{{ isHome }}"'), b=h.indexOf('<sc-if value="{{ isMap }}"');
if(a<0||b<0) { console.log("FAILURES:\n  cannot find the Today tab markup"); process.exit(1); }
const seg=h.slice(a,b);
const keys=[...new Set([...seg.matchAll(/\{\{\s*([a-zA-Z0-9_]+)(?:\.[a-zA-Z0-9_]+)?\s*\}\}/g)].map(m=>m[1]))];
const BAD=/Spelling pattern|\bStandards?\b|\b(RL|RI|RF|L|W|SL)\.\d/;

console.log("=== the Today tab prints no spelling pattern or standards code ===");
["y1","y2"].forEach(g=>{
  for(let w=1;w<=36;w+=5) ["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
    const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d; c.state.view="home";
    try{ c.startDay(); }catch(e){}
    const v=c.renderVals();
    const walk=(o,p)=>{ if(o==null||typeof o==="function") return;
      if(typeof o==="string"){ if(BAD.test(o)) fail.push(g+" w"+w+" "+d+" "+p+": "+o.slice(0,80)); return; }
      if(Array.isArray(o)) return o.forEach((x,i)=>walk(x,p+"["+i+"]"));
      if(typeof o==="object") Object.keys(o).forEach(k=>walk(o[k],p+"."+k)); };
    keys.forEach(k=>walk(v[k],k));
  });
});
const text=seg.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<[^>]+>/g," ");
if(/Spelling pattern|Standard/.test(text)) fail.push("the Today markup itself still says Spelling pattern or Standard");
console.log("  "+keys.length+" Today bindings, both grades, every fifth week, all five lessons");

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: the Today tab shows the child's work, not the curriculum's bookkeeping.");
process.exit(fail.length?1:0);
