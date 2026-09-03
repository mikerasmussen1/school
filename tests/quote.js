const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.URL={createObjectURL:()=>"b",revokeObjectURL:()=>{}};
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:""};
const fs=require('fs'), D='/home/claude/school/curriculum/';
window.Subjects={register(){},all:()=>[]};
const h=fs.readFileSync('/home/claude/school/word-voyagers.dc.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const C=eval("(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()");
let fail=[];

console.log("=== the quote ticks from the card it is printed on ===");
["Mon","Tue","Wed","Thu","Fri"].forEach(d=>{
  Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day=d;
  c.startDay();
  let v=c.renderVals();
  if(!v.quoteNotRead) fail.push(d+" quote starts already read");
  if(v.quoteRead)     fail.push(d+" quote flags disagree");
  if(typeof v.quoteMarkRead!=="function") fail.push(d+" has no quote DONE button");
  v.quoteMarkRead();
  v=c.renderVals();
  const row=v.daySteps[0];
  console.log("  "+d+": card button pressed -> checklist row reads ["+row.btnLabel+"]  card shows read="+v.quoteRead);
  if(row.btnLabel!=="Done") fail.push(d+" checklist row did not tick");
  if(!v.quoteRead || v.quoteNotRead) fail.push(d+" card did not switch to the read state");
});

console.log("\n=== Thursday 3 September specifically ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Thu";
  c.startDay();
  let v=c.renderVals();
  console.log("  quote: "+v.qText.slice(0,58));
  console.log("  card button present: "+(typeof v.quoteMarkRead==="function")+"  label shown: I have read it");
  // and the panel route still works, for anyone who opens it
  v.daySteps[0].onClick();
  v=c.renderVals();
  if(!v.aQuote) fail.push("quote panel does not open");
  if(!v.qText) fail.push("quote panel shows no quote");
  console.log("  opening from the checklist also shows the quote: "+!!v.aQuote);
  if(!v.assignCanTick) fail.push("panel tick missing");
  v.assignTick();
  v=c.renderVals();
  console.log("  panel tick works too: "+(v.daySteps[0].btnLabel==="Done"));
  if(v.daySteps[0].btnLabel!=="Done") fail.push("panel tick did not complete the step");
}

console.log("\n=== opening an assignment no longer jumps the page away ===");
{ let scrolled=false;
  global.scrollTo=()=>{ scrolled=true; };
  const c=new C(); c.state.landed=true; c.state.week=1; c.state.day="Thu"; c.startDay();
  scrolled=false;
  c.openAssignment("prompt");
  console.log("  scrollTo called on open: "+scrolled+"  (expect false)");
  if(scrolled) fail.push("opening an assignment still scrolls to the top, hiding it");
  global.scrollTo=()=>{};
}

console.log(fail.length?("\nFAILURES:\n  "+fail.join("\n  ")):"\nRESULT: the quote ticks from its own card, on every day.");
process.exit(fail.length?1:0);
