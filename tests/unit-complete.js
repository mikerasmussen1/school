/* Finishing a unit study is the largest thing that happens in either course,
 * and until now both let it pass in silence.
 *
 * The two things that make a celebration worth having are that it is TRUE and
 * that it is RARE. So this checks it fires only when every day (or week) of the
 * unit is genuinely finished, that it fires once rather than on every visit to
 * a unit already done, and that a parent-excused day still counts as finished —
 * that is la-mastery's own rule, and a moment that disagreed with the frontier
 * the child is actually on would be worse than no moment.
 */
const fs=require('fs'), D=__dirname+'/../curriculum/';
let LS={};
global.window=global;
global.localStorage={getItem:k=>k in LS?LS[k]:null,setItem:(k,v)=>{LS[k]=String(v)},removeItem:k=>{delete LS[k]}};
global.document={addEventListener(){},removeEventListener(){},visibilityState:"visible",createElement:()=>({style:{}})};
global.addEventListener=global.removeEventListener=function(){};
global.setInterval=()=>0; global.clearInterval=()=>{};
global.setTimeout=f=>{ if(typeof f==="function") f(); return 0; }; global.clearTimeout=()=>{};
global.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:"",href:""}; global.scrollTo=()=>{};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.URL={createObjectURL:()=>"b",revokeObjectURL(){}};

let fail=[];
const has=(w,c,got)=>{ console.log("  "+(c?"ok  ":"FAIL")+"  "+w+(c?"":"   got "+got));
                       if(!c) fail.push(w); };

function build(file){
  LS={};
  window.Subjects={register(){},all:()=>[],get:()=>null};
  const h=fs.readFileSync(__dirname+'/../'+file,'utf8');
  [...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1])
    .forEach(m=>{try{require(D+m+'.js')}catch(e){}});
  class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
  global.DCLogic=DCLogic;
  const src=h.split('data-dc-script>')[1].split('</script>')[0];
  return eval("(function(){ "+src+"\n return Component; })()");
}

console.log("=== unitWeeks parses the printed range ===");
{
  const C=build('word-voyagers.dc.html');
  // "5–8" uses an EN DASH. Splitting on a hyphen yields one number, and every
  // unit then looks like a single week that is already finished.
  has("'5–8' (en dash) is four weeks",
      JSON.stringify(C.unitWeeks({weeks:"5–8"}))==="[5,6,7,8]",
      JSON.stringify(C.unitWeeks({weeks:"5–8"})));
  has("'5-8' (hyphen) also works",
      JSON.stringify(C.unitWeeks({weeks:"5-8"}))==="[5,6,7,8]",
      JSON.stringify(C.unitWeeks({weeks:"5-8"})));
  has("a missing range is no weeks, not one",
      JSON.stringify(C.unitWeeks({}))==="[]", JSON.stringify(C.unitWeeks({})));
}

console.log("\n=== Word Voyagers · fires only on the last day of the unit ===");
{
  const C=build('word-voyagers.dc.html');
  const M=window.__CURR.LA_MASTERY;
  const Y=window.__CURR.LA_Y1;
  const unit=Y.unitOf(1);
  const weeks=C.unitWeeks(unit);
  const DAYS=["Mon","Tue","Wed","Thu","Fri"];
  const c=new C(); c.state={...c.state, year:"y1", week:1, landed:true};

  // finish every day of the unit except the very last
  const done={};
  weeks.forEach(w=>DAYS.forEach(d=>{ done[M.endKey("y1",w,d)]=true; }));
  const lastKey=M.endKey("y1", weeks[weeks.length-1], "Fri");
  delete done[lastKey];
  c.state={...c.state, stepDone:done, week:weeks[weeks.length-1], day:"Fri"};

  c.completeStep({key:"gz"});            // an ordinary step, not the day's end
  has("an ordinary step does not fire it", c.state.unitJustDone==null, c.state.unitJustDone);

  c.state={...c.state, stepDone:{...c.state.stepDone}};
  c.completeStep({key:"end"});           // the last day of the last week
  has("the unit's final day fires it", c.state.unitJustDone===unit.n, c.state.unitJustDone);

  // and it does not re-fire once dismissed
  c.closeUnitDone();
  has("closing it clears the moment", c.state.unitJustDone==null, c.state.unitJustDone);
  c.completeStep({key:"end"});
  has("re-finishing a day in a unit already celebrated does not fire it again",
      c.state.unitJustDone==null, c.state.unitJustDone);
  has("  and the unit is recorded as seen",
      !!(c.state.unitSeen||{})["y1:"+unit.n], JSON.stringify(c.state.unitSeen));
}

console.log("\n=== Word Voyagers · an excused day still counts ===");
{
  const C=build('word-voyagers.dc.html');
  const M=window.__CURR.LA_MASTERY, Y=window.__CURR.LA_Y1;
  const unit=Y.unitOf(1), weeks=C.unitWeeks(unit), DAYS=["Mon","Tue","Wed","Thu","Fri"];
  const c=new C(); c.state={...c.state, year:"y1", landed:true};
  const done={}, excused={};
  weeks.forEach(w=>DAYS.forEach(d=>{ done[M.endKey("y1",w,d)]=true; }));
  // a day he never did, that a parent excused
  delete done[M.endKey("y1", weeks[0], "Wed")];
  excused[M.excuseKey("y1", weeks[0], "Wed")]=true;
  const last=M.endKey("y1", weeks[weeks.length-1], "Fri");
  delete done[last];
  c.state={...c.state, stepDone:done, excused:excused,
           week:weeks[weeks.length-1], day:"Fri"};
  c.completeStep({key:"end"});
  has("a unit with one excused day still completes",
      c.state.unitJustDone===unit.n, c.state.unitJustDone);
}

console.log("\n=== Word Voyagers · an unfinished day blocks it ===");
{
  const C=build('word-voyagers.dc.html');
  const M=window.__CURR.LA_MASTERY, Y=window.__CURR.LA_Y1;
  const unit=Y.unitOf(1), weeks=C.unitWeeks(unit), DAYS=["Mon","Tue","Wed","Thu","Fri"];
  const c=new C(); c.state={...c.state, year:"y1", landed:true};
  const done={};
  weeks.forEach(w=>DAYS.forEach(d=>{ done[M.endKey("y1",w,d)]=true; }));
  delete done[M.endKey("y1", weeks[0], "Wed")];        // simply skipped
  const last=M.endKey("y1", weeks[weeks.length-1], "Fri");
  delete done[last];
  c.state={...c.state, stepDone:done, week:weeks[weeks.length-1], day:"Fri"};
  c.completeStep({key:"end"});
  has("a skipped day means the unit is not finished",
      c.state.unitJustDone==null, c.state.unitJustDone);
}

console.log("\n=== Field Notes · fires on the unit's last week ===");
{
  const C=build('field-notes.dc.html');
  const S=window.__CURR.SCI_Y3;
  const unit=S.unitOf(1), weeks=C.unitWeeks(unit);
  const c=new C(); c.state={...c.state, grade:"y3"};

  const completed={};
  weeks.slice(0,-1).forEach(w=>{ completed["y3:"+w]={at:1,score:4,total:5}; });
  c.state={...c.state, completed, week:weeks[weeks.length-2]};
  c.markWeekDone(4,5);
  has("finishing a middle week does not fire it", c.state.unitJustDone==null, c.state.unitJustDone);

  c.state={...c.state, week:weeks[weeks.length-1]};
  c.markWeekDone(5,5);
  has("finishing the unit's last week fires it", c.state.unitJustDone===unit.n, c.state.unitJustDone);
  c.closeUnitDone();
  has("closing it clears the moment", c.state.unitJustDone==null, c.state.unitJustDone);
  c.markWeekDone(5,5);
  has("re-finishing a week in a unit already celebrated does not fire it again",
      c.state.unitJustDone==null, c.state.unitJustDone);
  has("  and the unit is recorded as seen",
      !!(c.state.unitSeen||{})["y3:"+unit.n], JSON.stringify(c.state.unitSeen));
}

console.log("\n=== what the panel says is true ===");
{
  const C=build('field-notes.dc.html');
  const S=window.__CURR.SCI_Y3;
  const unit=S.unitOf(1), weeks=C.unitWeeks(unit);
  const c=new C();
  const completed={};
  weeks.forEach(w=>{ completed["y3:"+w]={at:1,score:4,total:5}; });
  c.state={...c.state, grade:"y3", week:weeks[weeks.length-1],
           completed, unitJustDone:unit.n, view:"week"};
  const v=c.renderVals();
  has("it is shown", v.ucShow===true, v.ucShow);
  has("it names the unit", v.ucName===unit.name, v.ucName);
  has("it counts the right weeks: "+v.ucLine,
      v.ucLine.indexOf(weeks.length+" week")===0, v.ucLine);
  has("it reports the real check average (16/20 = 80%)",
      /80%/.test(v.ucLine), v.ucLine);
  has("it hands back the Big Question", v.ucBigQ===unit.bigQ, v.ucBigQ);
  has("it carries the unit's own colour", v.ucStyle.indexOf(unit.color)>=0, "");
  // and nothing shows when nothing was finished
  c.state={...c.state, unitJustDone:null};
  const v2=c.renderVals();
  has("hidden when no unit was just finished", v2.ucShow===false, v2.ucShow);
}

console.log("\n=== the moment does not replay on a second device ===");
{
  /* unitSeen was pushed to the record but never read back out of it, so
   * "once per unit, on any device" was only true on the device that
   * celebrated. A second device would replay the moment on the same unit.
   *
   * Both pages pull a WHITELIST of fields; a writer who adds a field and
   * forgets the whitelist gets exactly this, silently. So the test asks the
   * pull path itself, not the state. */
  const files = ["word-voyagers.dc.html", "field-notes.dc.html"];
  files.forEach(f => {
    const src = fs.readFileSync(__dirname + '/../' + f, 'utf8');
    const pull = src.slice(src.indexOf("SY.pull("), src.indexOf("SY.pull(") + 900);
    has(f + ": the pull path reads unitSeen back", /d\.unitSeen/.test(pull), "");
    // and it is still being written, or there would be nothing to read
    has(f + ": syncSave still writes unitSeen", /unitSeen\s*:\s*st\.unitSeen/.test(src), "");
  });

  // a record arriving from another device must suppress the moment
  const C = build('field-notes.dc.html');
  const S = window.__CURR.SCI_Y3;
  const unit = S.unitOf(1), weeks = C.unitWeeks(unit);
  const c = new C();
  const completed = {};
  weeks.slice(0, -1).forEach(w => { completed["y3:" + w] = {at:1, score:4, total:5}; });
  // this device has never celebrated it; the pulled record says otherwise
  c.state = {...c.state, grade:"y3", completed, week:weeks[weeks.length - 1],
             unitSeen:{["y3:" + unit.n]: true}};
  c.markWeekDone(5, 5);
  has("a unit already celebrated elsewhere does not fire again",
      c.state.unitJustDone == null, c.state.unitJustDone);
}

console.log("");
if(fail.length){ console.log("FAILED "+fail.length+":"); fail.forEach(f=>console.log("  - "+f)); process.exit(1); }
console.log("all checks passed");
