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
let fail=[];

console.log("=== the handwriting assignment, every week, both grades ===");
["y1","y2"].forEach(g=>{
  for(let w=1;w<=36;w++){
    const c=new C(); c.state.landed=true; c.state.year=g; c.state.week=w; c.state.day="Thu";
    c.startDay(); c.openAssignment("prompt");
    const v=c.renderVals();
    if(!v.aTask)          fail.push(g+" w"+w+" no task panel");
    if(!v.asTitle)        fail.push(g+" w"+w+" no title");
    if(!v.asPrompt || String(v.asPrompt).length<25) fail.push(g+" w"+w+" no sentence to copy");
    if(!v.asPromptLabel)  fail.push(g+" w"+w+" the copy box is unlabelled");
    if(typeof v.asListen!=="function") fail.push(g+" w"+w+" nothing to listen to");
    // 3rd grade must not be told to use a button it does not have
    if(/photo|Grade this work/i.test(v.asInstructions))
      fail.push(g+" w"+w+" still told to photograph the page");
    if(g==="y2" && /photo|Grade this work/i.test(v.asInstructions))
      fail.push("5th w"+w+" still told to photograph the page");
  }
});
console.log("  72 handwriting assignments: title, instructions, labelled sentence, listen button");

// A prompt that says "copy THIS sentence" must actually contain one. Week 1
// of fifth grade - the unit called Quoting Exactly - told the child to copy a
// sentence exactly and never gave him a sentence.
console.log("\n=== every prompt that names a sentence actually supplies it ===");
{ let missing=[];
  [["LA_Y1","3rd"],["LA_Y2","5th"]].forEach(([k,label])=>{
    const Y=window.__CURR[k];
    for(let w=1;w<=36;w++){
      ["handwriting","writing","speaking"].forEach(kind=>{
        const t=Y.taskFor(w,kind)||{};
        const pr=String(t.prompt||"");
        // deictic reference to one specific sentence, line or verse
        const deictic=/\b(this|the following) (sentence|line|verse|quotation)\b/i.test(pr);
        const supplies=/["\u201c\u2018']/.test(pr);
        if(deictic && !supplies) missing.push(label+" w"+w+" "+kind);
      });
    }
  });
  console.log("  prompts naming a sentence they never give: "+(missing.length?missing.join(", "):"none"));
  missing.forEach(m=>fail.push(m+" says 'this sentence' but supplies none"));
}

console.log("\n=== Thursday 3 September, 3rd grade, item 3 ===");
{ const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Thu";
  c.startDay(); c.openAssignment("prompt");
  const v=c.renderVals();
  console.log("  "+v.asTitle);
  console.log("  "+v.asInstructions);
  console.log("  ["+v.asPromptLabel+"]");
  console.log("  "+v.asPrompt);
  spoken=[]; v.asListen();
  const said=spoken.join(" ");
  console.log("\n  Read it to me says "+said.split(/\s+/).length+" words");
  if(said.indexOf(String(v.asPrompt).slice(0,30))<0) fail.push("listen does not read the sentence to copy");
  if(said.indexOf(String(v.asInstructions).slice(0,25))<0) fail.push("listen does not read the instructions");
}

console.log("\n=== item 4 shows the same assignment to write ===");
{ const c=new C(); c.state.landed=true; c.state.year="y1"; c.state.week=1; c.state.day="Thu";
  c.startDay(); c.openAssignment("write");
  const v=c.renderVals();
  console.log("  ["+v.asPromptLabel+"] "+String(v.asPrompt).slice(0,60)+"...");
  if(!v.asPrompt) fail.push("item 4 shows no sentence");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: the assignment is on screen, labelled, and can be read aloud.");
process.exit(fail.length?1:0);
