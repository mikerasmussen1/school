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
const fs=require('fs'), D=__dirname+'/../curriculum/';
window.Subjects={register(){},all:()=>[]};
const h=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
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
  close: v=>v.closeFocus && v.closeLook && v.closeWrite && v.closeCheck
            && String(v.rdText||"").length>150,
  fix:   v=>v.fixSentence && (v.fxNotStarted===true || v.fxActive===true),
  read:  v=>v.rdTitle && v.rdText && v.rdText.length>80,
  rq:    v=>v.rqNotStarted===true || v.rqActive===true,
  // a title and a standard code teach nobody anything: the skill step must
  // carry a real explanation and a concrete example
  skill: v=>v.gzTitle && v.gzStandard
            && String(v.skillTeach||"").length>40
            && String(v.skillExample||"").length>8,
  gz:    v=>v.gzNotStarted===true || v.gzActive===true,
  study: v=>Array.isArray(v.spWords) && v.spWords.length>0,
  sq:    v=>v.sqNotStarted===true || v.sqActive===true,
  prompt:v=>v.asTitle && v.asPrompt && String(v.asPrompt).length>20,
  write: v=>v.asTitle && v.asPrompt && String(v.asPrompt).length>20,
  photo: v=>v.asPrompt && typeof v.asPick==="function",
  // a speaking task must come with the week's passage: several say "read a
  // paragraph aloud", and without text on screen there is nothing to read
  // the passage is rendered from rdText, one binding, so that is what must be
  // present and substantial - not the paragraph array the panel no longer uses
  // the passage shown on Friday is skPassage, which differs by grade: third
  // grade gets the week it has just had, fifth gets the next one, cold
  speak: v=>v.skTitle && v.skPrompt && String(v.skPrompt).length>20
            && !!(v.skPassage && v.skPassage.title)
            && String((v.skPassage||{}).text||"").length>150,
  approve: v=>Array.isArray(v.approveGrades) && v.approveGrades.length===4 && !!v.approveFocus,
  rv:    v=>v.rvNotStarted===true || v.rvActive===true
};
const BLOCK={quote:"aQuote",fix:"aFix",close:"aClose",read:"aRead",rq:"aRq",skill:"aSkill",gz:"aGz",
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
        const shown=["aQuote","aFix","aClose","aRead","aRq","aSkill","aGz","aStudy","aSq","aTask","aPhoto","aSpeak","aRv","aApprove"].filter(k=>v[k]);
        if(shown.length!==1 || shown[0]!==want)
          fail.push(y+" w"+w+" "+d+" "+step.key+": showed "+(shown.join(",")||"nothing")+", expected "+want);
        else if(!CONTENT[step.key](v))
          fail.push(y+" w"+w+" "+d+" "+step.key+": block is EMPTY");
      });
    }
  }
}
console.log(checked+" step-assignments checked across 2 grades x 36 weeks x 5 days");

// The speaking panel must actually print the passage. Checking the view-model
// alone would pass even if the markup never bound it, which is how a missing
// paragraph survived a green run once already.
{ const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ aSpeak }}');
  const seg=src.slice(i, src.indexOf('</sc-if>', src.indexOf('passage-box', i)));
  if(seg.indexOf('{{ skPassage.text }}')<0) fail.push("the speaking panel does not bind the passage text");
  if(seg.indexOf('{{ skPassage.title }}')<0) fail.push("the speaking panel does not bind the passage title");
  if(!/passage-flow/.test(seg)) fail.push("the speaking passage has no whitespace-preserving class");
  if(!/\.passage-flow\s*\{[^}]*white-space:\s*pre-wrap/.test(src))
    fail.push("passage-flow does not preserve the line breaks");
  console.log("speaking panel binds the passage title and text, with breaks preserved");

  const j=src.indexOf('{{ aSkill }}');
  const sk=src.slice(j, src.indexOf('</sc-if>', j));
  if(sk.indexOf('{{ skillTeach }}')<0)   fail.push("the skill panel does not bind its explanation");
  if(sk.indexOf('{{ skillExample }}')<0) fail.push("the skill panel does not bind its example");
  console.log("skill panel binds the explanation and the example");

  // and no drill note may misstate how many questions it has
  const G=window.__CURR;
  ["LA_Y1","LA_Y2"].forEach(k=>{
    const Y=G[k]; if(!Y) return;
    for(let w=1;w<=36;w++){
      const g=Y.grammarSetFor(w);
      // no prose anywhere may state a question count; the page derives it
      if(/\d+ questions|(Six|Seven|Eight|Nine|Ten) questions/i.test(String(g.note||"")))
        fail.push(k+" w"+w+" note hardcodes a question count instead of leaving it to the set");
    }
  });
  console.log("no drill note hardcodes a question count");
}

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
