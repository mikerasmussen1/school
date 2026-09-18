/* Getting a child's progress back.
 *
 * 1. THE COPY FROM BEFORE. Progress used to be one shared copy per device
 *    ("la.stepDone", "sync.la"). Once it was split per child, a signed-in child
 *    read their own empty keys and opened on Lesson 1 with a year of work still
 *    sitting in the old ones. The first signed-in child to open the page takes
 *    that copy over; the brother never picks it up as well; nothing is deleted.
 * 2. PUT HIM BACK ON A LESSON. The parent tab can set the lesson a child is on
 *    by excusing every earlier unfinished lesson - no invented ticks or scores. */
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
const SRC="(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()";
const M=window.__CURR.LA_MASTERY, SY=window.__CURR.SYNC;
let fail=[];
const page=()=>{ const C=eval(SRC); const c=new C(); c.state.landed=true; return c; };
const signIn=k=>{ store["abm.session.v1"]=JSON.stringify({key:k}); };

// A year of work in the old shared keys: lessons 1 to 13 finished.
function legacyProgress(){
  const done={};
  for(let i=0;i<13;i++){
    const at=M.fromAbs(i);
    M.dayPlan("y2",at.week,at.day).steps.forEach(s=>{ done["y2:"+at.week+":"+at.day+":"+s.key]=true; });
  }
  return done;
}

console.log("=== the copy from before is taken over by the first child to sign in ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  const done=legacyProgress();
  store["la.stepDone"]=JSON.stringify(done);
  store["la.year"]="y2"; store["la.week"]="3"; store["la.day"]="Thu";
  store["sync.la"]=JSON.stringify({year:"y2", stepDone:done, __at:Date.now()});

  signIn("HANKKEY");
  const hank=page();
  const open=M.firstIncomplete("y2", hank.state.stepDone, hank.state.excused)+1;
  console.log("  Hank signs in: Lesson "+open+", "+Object.keys(hank.state.stepDone||{}).length+" ticks");
  if(Object.keys(hank.state.stepDone||{}).length!==Object.keys(done).length) fail.push("Hank did not get the old progress back ("+Object.keys(hank.state.stepDone||{}).length+" ticks)");
  if(open!==14) fail.push("Hank opens on Lesson "+open+", not 14");
  if(store["la.legacy.claimedBy"]!=="HANKKEY") fail.push("the device did not record who took the old copy");
  if(!store["la.stepDone"]) fail.push("the old keys were deleted instead of copied");
  const syncData=SY.local.get("la");
  if(Object.keys((syncData||{}).stepDone||{}).length!==Object.keys(done).length) fail.push("the subject's synced copy was not taken over too");

  signIn("NANAKEY");
  const nana=page();
  console.log("  Nana signs in next: "+Object.keys(nana.state.stepDone||{}).length+" ticks");
  if(Object.keys(nana.state.stepDone||{}).length!==0) fail.push("Nana picked up Hank's old copy as well");
  if(Object.keys((SY.local.get("la")||{}).stepDone||{}).length!==0) fail.push("Nana's synced copy picked up the old one too");
}

console.log("\n=== a child who already has their own progress keeps it ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  signIn("HANKKEY");
  const mine={"y2:1:Mon:quote":true};
  store["la.HANKKEY.stepDone"]=JSON.stringify(mine);
  store["la.stepDone"]=JSON.stringify(legacyProgress());
  const c=page();
  if(Object.keys(c.state.stepDone||{}).length!==1) fail.push("the old copy overwrote work this child already had");
  console.log("  own ticks kept: "+Object.keys(c.state.stepDone||{}).length);
}

console.log("\n=== put him back on a lesson ===");
{ Object.keys(store).forEach(k=>delete store[k]);
  signIn("HANKKEY");
  const c=page(); c.state.year="y2"; c.state.view="parent";
  // one lesson genuinely finished already: it must not be marked excused
  M.dayPlan("y2",1,"Tue").steps.forEach(s=>{ c.state.stepDone["y2:1:Tue:"+s.key]=true; });
  let v=c.renderVals();
  console.log("  "+v.catchUpNow);
  c.setCatchUp({target:{value:"14"}});
  v=c.renderVals();
  console.log("  "+v.catchUpConfirm);
  if(!/Lessons 1 to 13/.test(v.catchUpConfirm) || !/opens on Lesson 14/.test(v.catchUpConfirm)) fail.push("the confirmation does not say what it will do: "+v.catchUpConfirm);
  c.catchUpTo("14");
  const open=M.firstIncomplete("y2", c.state.stepDone, c.state.excused)+1;
  console.log("  after: open at Lesson "+open+", "+Object.keys(c.state.excused).length+" lessons excused");
  if(open!==14) fail.push("the course opens at Lesson "+open+", not 14");
  if(c.state.excused[M.excuseKey("y2",1,"Tue")]) fail.push("a lesson he really finished was marked excused");
  if(Object.keys(c.state.excused).length!==12) fail.push(Object.keys(c.state.excused).length+" lessons excused, expected 12");
  if(Object.keys(c.state.stepDone||{}).length!==M.dayPlan("y2",1,"Tue").steps.length) fail.push("catching up invented step ticks");
  if(c.state.week!==3 || c.state.day!=="Thu") fail.push("it did not open on that lesson ("+c.state.week+"/"+c.state.day+")");
}

console.log("\n=== the control is on the parent tab ===");
{ const a=h.indexOf('<sc-if value="{{ isParent }}"'), b=h.indexOf('Start the year again');
  const seg=h.slice(a,b);
  ["Put him back on a lesson","{{ catchUpTarget }}","{{ armCatchUp }}","{{ catchUpDo }}","{{ catchUpConfirm }}"].forEach(k=>{
    if(seg.indexOf(k)<0) fail.push("the parent tab is missing "+k);
  });
  if(seg.indexOf("{{ catchUpDo }}")>h.indexOf("Start the year again")) fail.push("the control is not above Start the year again");
  console.log("  above “Start the year again”, with the lesson number and a confirmation");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,8).join("\n  ")):"\nRESULT: lost progress comes back, and a parent can set the lesson a child is on.");
process.exit(fail.length?1:0);
