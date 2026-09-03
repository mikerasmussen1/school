/* Every step, every week, both grades: the assignment must show real content,
   not just a title. This is the check that was missing — the previous harness
   only asserted that ONE block was shown, never that the block had anything
   in it. That is how Friday's speaking step showed Thursday's handwriting. */
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
const M=window.__CURR.LA_MASTERY;
let fail=[], checked=0;

// what "has content" means for each step
const ALLWEEKS=Array.from({length:36},(_,i)=>i+1);
const CONTENT={
  quote: v=>v.qText && v.qThink,
  fix:   v=>v.fixSentence && (v.fxNotStarted===true || v.fxActive===true),
  read:  v=>v.rdTitle && v.rdText && v.rdText.length>80,
  rq:    v=>v.rqNotStarted===true || v.rqActive===true,
  skill: v=>v.gzTitle && v.gzStandard,
  gz:    v=>v.gzNotStarted===true || v.gzActive===true,
  study: v=>Array.isArray(v.spWords) && v.spWords.length>0,
  sq:    v=>v.sqNotStarted===true || v.sqActive===true,
  prompt:v=>v.asTitle && v.asPrompt && String(v.asPrompt).length>20,
  write: v=>v.asTitle && v.asPrompt && String(v.asPrompt).length>20,
  photo: v=>v.asPrompt && typeof v.asPick==="function",
  speak: v=>v.skTitle && v.skPrompt && String(v.skPrompt).length>20,
  approve: v=>Array.isArray(v.approveGrades) && v.approveGrades.length===4 && !!v.approveFocus,
  rv:    v=>v.rvNotStarted===true || v.rvActive===true
};
const BLOCK={quote:"aQuote",fix:"aFix",read:"aRead",rq:"aRq",skill:"aSkill",gz:"aGz",
             study:"aStudy",sq:"aSq",prompt:"aTask",write:"aTask",photo:"aPhoto",
             speak:"aSpeak",rv:"aRv",approve:"aApprove"};

for(const y of ['y1','y2']){
  for(const w of ALLWEEKS){
    for(const d of ['Mon','Tue','Wed','Thu','Fri']){
      const plan=M.dayPlan(y,w,d);
      plan.steps.forEach(step=>{
        if(step.gate==="end") return;
        const c=new C(); c.state.landed=true; c.state.year=y; c.state.week=w; c.state.day=d;
        c.startDay(); c.openAssignment(step.key);
        const v=c.renderVals();
        checked++;
        const want=BLOCK[step.key];
        const shown=["aQuote","aFix","aRead","aRq","aSkill","aGz","aStudy","aSq","aTask","aPhoto","aSpeak","aRv","aApprove"].filter(k=>v[k]);
        if(shown.length!==1 || shown[0]!==want)
          fail.push(y+" w"+w+" "+d+" "+step.key+": showed "+(shown.join(",")||"nothing")+", expected "+want);
        else if(!CONTENT[step.key](v))
          fail.push(y+" w"+w+" "+d+" "+step.key+": block is EMPTY");
      });
    }
  }
}
console.log(checked+" step-assignments checked across 2 grades x 36 weeks x 5 days");

// spot-check the ones that were wrong, and show they now differ
{ const c=new C(); c.state.landed=true; c.state.week=9; c.state.day="Thu";
  c.startDay(); c.openAssignment("prompt");
  const t=c.renderVals();
  const c2=new C(); c2.state.landed=true; c2.state.week=9; c2.state.day="Fri";
  c2.startDay(); c2.openAssignment("speak");
  const s2=c2.renderVals();
  console.log("\nThu prompt : "+t.asTitle);
  console.log("   to copy : \""+String(t.asPrompt).slice(0,72)+"...\"");
  console.log("Fri speak  : "+s2.skTitle);
  console.log("   task    : \""+String(s2.skPrompt).slice(0,72)+"...\"");
  if(String(t.asPrompt)===String(s2.skPrompt)) fail.push("speaking still shows the handwriting task");
  const c3=new C(); c3.state.landed=true; c3.state.week=9; c3.state.day="Fri";
  c3.startDay(); c3.openAssignment("rv");
  const r=c3.renderVals();
  console.log("Fri review : drill ready = "+(r.rvNotStarted===true));
  if(r.aTask) fail.push("week review still renders a task block");
}

console.log(fail.length?("\nFAILURES ("+fail.length+"):\n  "+fail.slice(0,10).join("\n  ")):"\nRESULT: every step of every day shows its own assignment, with content.");
process.exit(fail.length?1:0);
