/* Friday's speaking passage: Hank reads ahead, Brock reads the week's own. */
const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
let spoken=[];
global.speechSynthesis={cancel(){},speak(u){ spoken.push(u&&u.text||""); }};
global.SpeechSynthesisUtterance=function(t){ this.text=t; };
global.URL={createObjectURL:()=>"b",revokeObjectURL:()=>{}};
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:""};
const fs=require('fs'), D=__dirname+'/../curriculum/';
window.Subjects={register(){},all:()=>[]};
const h=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const C=eval("(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()");
const Y1=window.__CURR.LA_Y1, Y2=window.__CURR.LA_Y2;
let fail=[];

function speakPanel(g,w){
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day="Fri";
  c.startDay(); c.openAssignment("speak");
  return {v:c.renderVals(), c:c};
}

console.log("=== 5th grade reads NEXT week's passage, cold ===");
for(let w=1;w<=35;w++){
  const {v}=speakPanel("y2",w);
  const want=Y2.passageFor(w+1);
  const thisWeek=Y2.passageFor(w);
  if(v.skPassage.title!==want.title) fail.push("5th w"+w+" shows "+v.skPassage.title+", expected "+want.title);
  if(v.skPassage.title===thisWeek.title) fail.push("5th w"+w+" is still showing the week's own passage");
  if(!/cold/i.test(v.skPassage.label)) fail.push("5th w"+w+" is not labelled as a cold read");
  if(!v.skPassage.note) fail.push("5th w"+w+" has no note explaining why it is unfamiliar");
  if(String(v.skPassage.text||"").length<150) fail.push("5th w"+w+" passage is empty or too short");
}
console.log("  weeks 1-35: all show the following week's passage, labelled cold");

console.log("\n=== week 36 has no week 37, so it falls back ===");
{ const {v}=speakPanel("y2",36);
  console.log("  5th w36 shows: \""+v.skPassage.title+"\"  ("+v.skPassage.label+")");
  if(v.skPassage.title!==Y2.passageFor(36).title) fail.push("week 36 does not fall back to its own passage");
  if(/cold/i.test(v.skPassage.label)) fail.push("week 36 is wrongly labelled a cold read");
  if(v.skPassage.note) fail.push("week 36 still carries the unfamiliar-text note");
}

console.log("\n=== 3rd grade is unchanged: its own week's passage ===");
for(let w=1;w<=36;w++){
  const {v}=speakPanel("y1",w);
  const own=Y1.passageFor(w);
  if(v.skPassage.title!==own.title) fail.push("3rd w"+w+" shows "+v.skPassage.title+", expected its own "+own.title);
  if(/cold/i.test(v.skPassage.label)) fail.push("3rd w"+w+" was given the cold-read treatment");
}
console.log("  36 weeks: all show the week's own passage, as before");

console.log("\n=== the listen button reads the passage on screen ===");
["y1","y2"].forEach(g=>{
  const {v}=speakPanel(g,1);
  spoken=[]; v.skPassageListen();
  const said=spoken.join(" ");
  const head=String(v.skPassage.text).replace(/\n+/g," ").slice(0,40);
  console.log("  "+(g==="y1"?"3rd":"5th")+": reads \""+v.skPassage.title+"\"");
  if(said.indexOf(head)<0) fail.push(g+" listen reads a different passage from the one shown");
});

console.log("\n=== Monday still reads the week's own passage in both grades ===");
["y1","y2"].forEach(g=>{
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=5; c.state.day="Mon";
  c.startDay(); c.openAssignment("read");
  const v=c.renderVals();
  const own=(g==="y2"?Y2:Y1).passageFor(5);
  if(v.rdTitle!==own.title) fail.push(g+" Monday no longer shows the week's passage");
});
console.log("  reading step untouched");

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,5).join("\n  ")):"\nRESULT: Hank reads ahead on Friday; Brock reads the week he has just had.");
process.exit(fail.length?1:0);
