/* Third grade sits between average and gifted, and never above fifth. */
global.window=global; global.__CURR={}; window.__CURR={};
const D=__dirname+'/../curriculum/';
['question-types','la-y1-spine','la-y1-reading','la-y1-words','la-y1-grammar',
 'la-y2-spine','la-y2-reading','la-y2-words','la-y2-grammar'].forEach(f=>{try{require(D+f+'.js')}catch(e){}});
const T=window.QTypes, Y1=window.__CURR.LA_Y1, Y2=window.__CURR.LA_Y2;
let fail=[];

function dials(Y){
  let q=0,sp=0,gr=0,w=0,sent=0,longw=0,tot=0;
  for(let i=1;i<=36;i++){
    const p=Y.passageFor(i), words=p.text.split(/\s+/);
    q+=p.questions.length; sp+=Y.spellingSetFor(i).words.length; gr+=Y.grammarSetFor(i).items.length;
    w+=words.length; sent+=p.text.split(/[.!?]+/).filter(x=>x.trim()).length;
    words.forEach(x=>{ tot++; if(x.replace(/[^a-z]/gi,'').length>=9) longw++; });
  }
  return {q:q/36, sp:sp/36, gr:gr/36, words:Math.round(w/36),
          perSentence:Math.round(w/sent), longPct:+(100*longw/tot).toFixed(1)};
}
const a=dials(Y1), b=dials(Y2);
console.log("                 3rd      5th");
["q","sp","gr","words","longPct"].forEach(k=>
  console.log("  "+k.padEnd(13)+String(a[k]).padEnd(9)+b[k]));

console.log("\n=== above a typical third grade on every dial ===");
if(a.q<4)      fail.push("questions are at or below the typical 3");
if(a.sp<13)    fail.push("spelling is at or below the typical 12");
if(a.gr<7)     fail.push("grammar is at or below the typical 6");
if(a.words<160) fail.push("passages are down at typical third grade length");
console.log("  4 questions, 13 spelling, 7 grammar, "+a.words+"-word passages");

console.log("\n=== but never MORE work than fifth grade ===");
if(a.q>b.q)   fail.push("third grade has more comprehension questions than fifth");
if(a.sp>b.sp+1) fail.push("third grade has more spelling words than fifth by more than its stretch word");
if(a.gr>b.gr+1) fail.push("third grade has more grammar items than fifth by more than its stretch item");
if(a.words>=b.words) fail.push("third grade passages are as long as fifth grade's");
console.log("  questions "+a.q+" vs "+b.q+", passages "+a.words+" vs "+b.words+" words");

console.log("\n=== and easier reading than fifth grade ===");
if(a.longPct>=b.longPct) fail.push("third grade uses as many long words as fifth ("+a.longPct+"% vs "+b.longPct+"%)");
console.log("  long words "+a.longPct+"% vs "+b.longPct+"%");

console.log("\n=== every set still validates ===");
{ let bad=0, ids={};
  for(let w=1;w<=36;w++){
    const p=Y1.passageFor(w), s=Y1.spellingSetFor(w), g=Y1.grammarSetFor(w);
    [T.validateSet({id:"r"+w,items:p.questions}),T.validateSet(s),T.validateSet(g)]
      .forEach(v=>{ if(!v.ok){ bad++; fail.push("w"+w+": "+v.errors[0]); }});
    [].concat(p.questions,s.items,g.items).forEach(i=>{
      if(ids[i.id]) fail.push("duplicate id "+i.id); ids[i.id]=1; });
    if(p.questions.length!==4) fail.push("w"+w+" has "+p.questions.length+" questions");
    if(s.words.length!==13)    fail.push("w"+w+" has "+s.words.length+" spelling words");
    if(g.items.length!==7)     fail.push("w"+w+" has "+g.items.length+" grammar items");
  }
  console.log("  36 weeks x 3 strands validate, no duplicate ids");
}

console.log("\n=== the spine states the measured pitch, not an intended one ===");
{ const fs=require('fs');
  const sp=fs.readFileSync(D+'la-y1-spine.js','utf8');
  if(!/between average and gifted/i.test(sp)) fail.push("the spine does not state the pitch");
  if(sp.indexOf(String(a.words)+" w")<0) fail.push("the spine's passage length does not match the measurement");
  // the note is wrapped across lines, so match on its substance rather than
  // on one line of it
  const flat=sp.replace(/\*/g," ").replace(/\s+/g," ");
  if(!/Sentence length averages \d+ words here and \d+ in fifth grade/.test(flat))
    fail.push("the spine does not record the outstanding sentence-length gap");
  console.log("  pitch, and the one gap not yet closed, both written down");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: third grade is above average, below fifth, and coherent.");
process.exit(fail.length?1:0);
