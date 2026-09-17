/* Two children, one device. Word Voyagers progress belongs to whoever is
 * signed in: working as one child, or erasing one child's year, must never
 * reach the other child's record - on this device or in the database.
 *
 * Uses the real sync.js and the real page against an in-memory stand-in for
 * the Firestore documents, so pull, push and reset all run for real. */
const store={};
global.localStorage={getItem:k=>(k in store?store[k]:null),setItem:(k,v)=>{store[k]=String(v)},removeItem:k=>{delete store[k]}};
global.window=global; global.scrollTo=()=>{};
// Timers run nothing: the test pushes explicitly with pushNow.
global.setTimeout=()=>0; global.clearTimeout=()=>{};
global.addEventListener=()=>{}; global.document={addEventListener:()=>{},visibilityState:"visible",createElement:()=>({style:{}})};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.URL={createObjectURL:()=>"b",revokeObjectURL:()=>{}};
window.location={search:"", reload(){}}; global.location=window.location;

// ---- the database: one document per child, keyed by record id
const docs={};
global.fetch=async(url,opt)=>{
  const id=decodeURIComponent(String(url).split("/students/")[1]||"");
  if(opt && opt.method==="PATCH"){ docs[id]=JSON.parse(opt.body).fields; return {ok:true, json:async()=>({})}; }
  if(!docs[id]) return {ok:false, json:async()=>({})};
  return {ok:true, json:async()=>({fields:docs[id]})};
};
const recordOf=id=>{ const f=docs[id]; if(!f) return null; const b=JSON.parse(f.blob.stringValue); return ((b.subjects||{}).la||{}).data||null; };

const fs=require('fs'), D=__dirname+'/../curriculum/';
window.Subjects={register(){},all:()=>[],get(){return null;}};
const h=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1]).forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const SRC="(function(){ "+h.split('data-dc-script>')[1].split('</script>')[0]+"\n return Component; })()";
const SY=window.__CURR.SYNC;
let fail=[];
const ok=(c,m)=>{ if(!c) fail.push(m); };

store["abm.profiles.v1"]=JSON.stringify({profiles:[{id:"p1",name:"Hank",rkey:"HANKKEY"},{id:"p2",name:"Nana",rkey:"NANAKEY"}]});
const signIn=rkey=>{ store["abm.session.v1"]=JSON.stringify({key:rkey}); };
// A fresh page load: the page's state is read from storage when it is built.
const page=()=>{ const C=eval(SRC); const c=new C(); c.state.landed=true; return c; };
const ticks=(c)=>Object.keys(c.state.stepDone||{}).length;
// Opening a view starts the page's background pull. A parent reaches the reset
// button long after it has landed; the test waits for it the same way.
const settle=async()=>{ for(let i=0;i<20;i++) await new Promise(r=>setImmediate(r)); };

(async()=>{
  console.log("=== Hank works, then Nana signs in on the same device ===");
  signIn("HANKKEY");
  let hank=page();
  hank.state.year="y2";
  hank.syncSave({stepDone:{"y2:1:Mon:quote":true,"y2:1:Mon:fix":true,"y2:1:Mon:end":true}});
  try{ localStorage.setItem(LAKof("la.stepDone"), JSON.stringify(hank.state.stepDone)); }catch(e){}
  await SY.pushNow("la");
  ok(Object.keys((recordOf("HANKKEY")||{}).stepDone||{}).length===3, "Hank's record holds his 3 ticks");
  console.log("  Hank's record: "+Object.keys((recordOf("HANKKEY")||{}).stepDone||{}).length+" ticks");

  signIn("NANAKEY");
  let nana=page();
  ok(ticks(nana)===0, "Nana's page opens with Hank's ticks on it ("+ticks(nana)+")");
  const pulled=await SY.pull("la");
  ok(Object.keys((pulled||{}).stepDone||{}).length===0, "Nana's pull brought back Hank's work");
  nana.state.year="y2";
  nana.syncSave({stepDone:{"y2:1:Mon:quote":true}});
  await SY.pushNow("la");
  ok(Object.keys((recordOf("NANAKEY")||{}).stepDone||{}).length===1, "Nana's record holds her 1 tick");
  ok(Object.keys((recordOf("HANKKEY")||{}).stepDone||{}).length===3, "Hank's record changed while Nana worked");
  console.log("  Nana's record: "+Object.keys((recordOf("NANAKEY")||{}).stepDone||{}).length+" tick, Hank's still "+Object.keys((recordOf("HANKKEY")||{}).stepDone||{}).length);

  console.log("\n=== Nana erases her year ===");
  const v=nana.renderVals();
  await settle();
  console.log("  button : "+v.resetButtonLabel);
  console.log("  confirm: "+v.resetConfirmText);
  ok(v.resetButtonLabel==="Erase Nana's Word Voyagers progress", "the reset button does not name Nana: "+v.resetButtonLabel);
  ok(/Nana/.test(v.resetConfirmText) && /No other child/.test(v.resetConfirmText), "the confirm does not say only Nana is erased");
  nana.doReset();
  await settle();
  await SY.pushNow("la");
  ok(Object.keys((recordOf("NANAKEY")||{}).stepDone||{}).length===0, "Nana's record was not erased");
  ok(Object.keys((recordOf("HANKKEY")||{}).stepDone||{}).length===3, "Nana's reset reached Hank's record");

  console.log("\n=== Hank signs back in on that device ===");
  signIn("HANKKEY");
  hank=page();
  ok(ticks(hank)===3, "Hank's page lost his local ticks after Nana's reset ("+ticks(hank)+")");
  const back=await SY.pull("la");
  ok(Object.keys((back||{}).stepDone||{}).length===3, "Hank's pull came back empty after Nana's reset");
  await SY.pushNow("la");
  ok(Object.keys((recordOf("HANKKEY")||{}).stepDone||{}).length===3, "Hank signing in pushed an empty year over his record");
  console.log("  Hank's page: "+ticks(hank)+" ticks, record: "+Object.keys((recordOf("HANKKEY")||{}).stepDone||{}).length);

  console.log("\n=== signed out, the device keeps its old single copy ===");
  delete store["abm.session.v1"];
  const lk=SY.local.key ? SY.local.key("la") : "(sync.js has no per-child key)";
  ok(lk==="sync.la", "signed out, the local key is not sync.la: "+lk);
  const anon=page();
  ok(anon.renderVals().resetButtonLabel==="Reset this device's progress", "signed out, the reset is not described as this device's");

  console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,8).join("\n  ")):"\nRESULT: each child's Word Voyagers progress is theirs alone, on a shared device and in the database.");
  process.exit(fail.length?1:0);
})().catch(e=>{ console.log("FAILURES:\n  crashed: "+(e&&e.stack||e)); process.exit(1); });

// The page's own key helper, as the page defines it, for writing Hank's local ticks.
function LAKof(k){
  const m=h.match(/function LAK\(k\)\{[\s\S]*?\n\}/);
  return m ? eval("("+m[0]+")")(k) : k;
}
