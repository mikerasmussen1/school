/* Word Voyagers names lessons by number ("Lesson 12"), never by a weekday slot
 * ("Monday", "Tue", "End of day"). The course is self-paced, so a lesson is not
 * a day of the week. Every tab is rendered for both grades and searched. */
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

const WEEKDAY=/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Mon|Tue|Wed|Thu|Fri)s?\b/;
// Text that is content, not a label: book titles, passages, sentences to fix,
// the dates written as Weekday, Month Day, Year (today, the finish date, and
// Task 1's example), and the "Monday to Friday" pace rule.
const ALLOWED=/The Wednesday Wars|\d{4}|Monday to Friday|Weekday, Month/;
const SKIP_KEYS=new Set(["day","fixSentence","fixCorrected","fxSentence","fxCorrected","rdText","rdParas","skPassage"]);

function walk(o,path,out){
  if(o==null||typeof o==="function") return;
  if(typeof o==="string"){ if(WEEKDAY.test(o) && !ALLOWED.test(o)) out.push(path+": "+o.slice(0,90)); return; }
  if(Array.isArray(o)) return o.forEach((x,i)=>walk(x,path+"["+i+"]",out));
  if(typeof o==="object") Object.keys(o).forEach(k=>{ if(!SKIP_KEYS.has(k)) walk(o[k],path?path+"."+k:k,out); });
}

console.log("=== no weekday slot labels on any tab, both grades ===");
const tabs=["today","year","reading","grammar","spelling","handwriting","speaking","books","parent"];
const seen=new Set();
["y1","y2"].forEach(g=>tabs.forEach(t=>[[1,"Mon"],[20,"Thu"],[36,"Fri"]].forEach(([w,d])=>{
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d; c.state.view=t;
  c.state.stuck={[g+":"+w+":"+d+":gz"]:true};
  c.state.overrides={k:{year:g,week:w,day:d,label:"Grammar drill",reason:"x",at:1}};
  try{ c.startDay(); }catch(e){}
  const out=[]; walk(c.renderVals(),"",out);
  out.forEach(x=>{ const k=x.replace(/\[\d+\]/g,"[]"); if(!seen.has(k)){ seen.add(k); fail.push(g+" "+t+" w"+w+" "+d+" -> "+x); } });
})));
console.log("  9 tabs x 2 grades x 3 lessons rendered and searched");

console.log("\n=== the labels that replaced them ===");
{ const c=new C(); c.state.landed=true; c.state.year="y2"; c.state.week=20; c.state.day="Thu"; c.startDay();
  const v=c.renderVals();
  const want={qDayLabel:"Lesson 99", endHeading:"Lesson 99 complete", nextDayLabel:"Start Lesson 100"};
  Object.keys(want).forEach(k=>{ console.log("  "+k.padEnd(13)+" "+v[k]); if(v[k]!==want[k]) fail.push(k+" is '"+v[k]+"', want '"+want[k]+"'"); });
  const pick=v.dayPicker.map(x=>x.label.replace("\u00b7","")).join(", ");
  console.log("  dayPicker     "+pick);
  if(pick!=="Lesson 96, Lesson 97, Lesson 98, Lesson 99, Lesson 100") fail.push("the lesson buttons read: "+pick);
}
{ const src=h.slice(0, h.indexOf("data-dc-script>"));
  if(/>End of day</.test(src)) fail.push("the end banner still says End of day");
  if(!/>End of lesson</.test(src)) fail.push("the end banner does not say End of lesson");
  const text=src.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g,"").replace(/<[^>]+>/g," ");
  const m=text.match(/[^.]{0,40}\b(Monday|Tuesday|Wednesday|Thursday|Friday)s?\b[^.]{0,40}/g)||[];
  m.filter(x=>!ALLOWED.test(x)).forEach(x=>fail.push("page text still names a weekday: "+x.trim()));
  console.log("  end banner    End of lesson");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,8).join("\n  ")):"\nRESULT: every Word Voyagers label names a lesson number, never a weekday.");
process.exit(fail.length?1:0);
