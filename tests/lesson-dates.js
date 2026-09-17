/* Word Voyagers is self-paced: every lesson shows today's date, and nothing
 * says which lesson belongs to which day or which one he "should" be on. */
const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{}; global.setTimeout=(f)=>f&&f(); global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
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
const CAL=window.__CURR.LA_CALENDAR;
let fail=[];

const MONTHS=["January","February","March","April","May","June","July","August","September","October","November","December"];
const now=new Date();
const TODAY=MONTHS[now.getMonth()]+" "+now.getDate()+", "+now.getFullYear();
const sameDay=(a,b)=>a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();

function view(g,w,d,tab){
  const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day=d;
  if(tab) c.state.view=tab;
  c.startDay(); return c.renderVals();
}
// Every way a scheduled date could be written on the page.
function spellings(dt){
  const W=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return [CAL.longDate(dt), CAL.shortDate(dt),
          MONTHS[dt.getMonth()]+" "+dt.getDate()+", "+dt.getFullYear(),
          dt.getDate()+" "+MONTHS[dt.getMonth()]+" "+dt.getFullYear(),
          W[dt.getDay()]+", "+MONTHS[dt.getMonth()]+" "+dt.getDate()];
}

console.log("=== every lesson shows today's date, both grades ===");
["y1","y2"].forEach(g=>{
  for(let w=1;w<=36;w++) ["Mon","Tue","Wed","Thu","Fri"].forEach((d,i)=>{
    const v=view(g,w,d);
    if(v.todayDate!==TODAY) fail.push(g+" w"+w+" "+d+" shows '"+v.todayDate+"' instead of today, "+TODAY);
    // No scheduled date for this lesson anywhere in what the page renders,
    // unless the schedule happens to fall on today.
    const dt=CAL.dateForIndex((w-1)*5+i);
    if(dt && !sameDay(dt,now)){
      const all=JSON.stringify(v, (k,x)=>typeof x==="function"?undefined:x);
      spellings(dt).forEach(sp=>{ if(all.indexOf(sp)>=0) fail.push(g+" w"+w+" "+d+" still shows its scheduled date: "+sp); });
    }
  });
});
console.log("  360 grade-days: today is "+TODAY+", and no lesson shows a scheduled date");

console.log("\n=== nothing says which lesson he should be on ===");
{ const v=view("y1",20,"Thu");
  const all=JSON.stringify(v, (k,x)=>typeof x==="function"?undefined:x);
  [/school day \d+ of 180/i, /This lesson is for/i, /falls on/i, /Year ends/i, /week \d+, (Mon|Tue|Wed|Thu|Fri) \(day/i, /the 180th school day/i]
    .forEach(re=>{ if(re.test(all)) fail.push("the page still says: "+(all.match(re)||[""])[0]); });
  console.log("  lesson header : Today is "+v.todayDate);
  console.log("  progress      : "+v.pacingText);
  console.log("  year tab      : "+v.calToday+" / "+v.calPace);
}

console.log("\n=== the markup shows today's date and no schedule ===");
{ const i=h.indexOf('{{ dayHeading }}');
  const seg=h.slice(i, i+600);
  if(seg.indexOf('Today is {{ todayDate }}')<0) fail.push("the lesson header does not show today's date");
  ["{{ lessonDate }}","{{ datesSame }}","{{ datesDiffer }}","{{ dayDateLine }}","{{ calFirstDay }}","{{ calLastDay }}","{{ calBreaks }}","Scheduled breaks"]
    .forEach(k=>{ if(h.indexOf(k)>=0) fail.push("the page still shows "+k); });
  console.log("  header binds today's date; no lesson date, school-day line, year end or break schedule");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: every lesson shows today's date, and nothing sets a pace.");
process.exit(fail.length?1:0);
