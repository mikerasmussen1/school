/* A spelling test marks spelling. No near-misses. */
global.window=global; global.__CURR={}; window.__CURR={};
const D=__dirname+'/../curriculum/';
['question-types','la-y1-spine','la-y1-words','la-y1-grammar','la-y1-reading','la-y1-tasks',
 'la-y2-spine','la-y2-words','la-y2-grammar','la-y2-reading','la-y2-tasks','la-daily-fix']
 .forEach(f=>{try{require(D+f+'.js')}catch(e){}});
const T=window.QTypes;
let fail=[], words=0, variants=0;

console.log("=== the two words that were reported ===");
{ const Y=window.__CURR.LA_Y2;
  [["visible","visable"],["perspective","perspectiv"]].forEach(([right,wrong])=>{
    const it=Y.spellingSetFor(2).items.find(i=>i.a[0]===right);
    if(!it){ fail.push(right+" is not in 5th grade week 2"); return; }
    const okRight=T.grade(it,right), okWrong=T.grade(it,wrong);
    console.log("  "+right.padEnd(13)+JSON.stringify(right)+" -> "+(okRight?"correct":"WRONG")+
                "   "+JSON.stringify(wrong)+" -> "+(okWrong?"STILL ACCEPTED":"rejected"));
    if(!okRight) fail.push(right+" rejects its own spelling");
    if(okWrong)  fail.push(right+" still accepts "+wrong);
  });
}

console.log("\n=== every word, every single-letter change, both grades ===");
[["LA_Y1","3rd"],["LA_Y2","5th"]].forEach(([k,label])=>{
  const Y=window.__CURR[k];
  for(let w=1;w<=36;w++){
    Y.spellingSetFor(w).items.forEach(it=>{
      const word=it.a[0]; words++;
      if(it.type!=="spelling") fail.push(label+" w"+w+" \""+word+"\" is type "+it.type+", not spelling");
      if(!T.grade(it,word))             fail.push(label+" w"+w+" rejects its own word");
      if(!T.grade(it,word.toUpperCase())) fail.push(label+" w"+w+" rejects capitals");
      if(!T.grade(it," "+word+" "))     fail.push(label+" w"+w+" rejects surrounding space");
      if(T.grade(it,""))                fail.push(label+" w"+w+" accepts an empty answer");
      for(let i=0;i<word.length;i++){
        const swap=word.slice(0,i)+(word[i]==="a"?"e":"a")+word.slice(i+1);
        if(swap!==word){ variants++; if(T.grade(it,swap)) fail.push(label+" w"+w+" accepts \""+swap+"\""); }
        const drop=word.slice(0,i)+word.slice(i+1);
        if(drop!==word){ variants++; if(T.grade(it,drop)) fail.push(label+" w"+w+" accepts \""+drop+"\""); }
      }
      const dbl=word[0]+word;   // a doubled first letter
      variants++; if(T.grade(it,dbl)) fail.push(label+" w"+w+" accepts \""+dbl+"\"");
    });
  }
});
console.log("  "+words+" words, "+variants+" misspellings tried: "+(fail.length?"SOME ACCEPTED":"every one rejected"));

console.log("\n=== no typed-answer drill still uses the lenient grader ===");
{ const seen={};
  [["LA_Y1","3rd"],["LA_Y2","5th"]].forEach(([k])=>{
    const Y=window.__CURR[k];
    for(let w=1;w<=36;w++){
      Y.spellingSetFor(w).items.forEach(i=>seen[i.type]=1);
      Y.grammarSetFor(w).items.forEach(i=>seen[i.type]=1);
      Y.passageFor(w).questions.forEach(i=>seen[i.type]=1);
    }
  });
  const F=window.__CURR.LA_FIX;
  ["y1","y2"].forEach(g=>{ for(let w=1;w<=36;w++) F.DAYS.forEach(d=>
    F.drillFor(g,w,d).items.forEach(i=>seen[i.type]=1)); });
  const types=Object.keys(seen);
  console.log("  types in use: "+types.join(", "));
  ["fill-blank","short-answer"].forEach(t=>{
    if(seen[t]) fail.push("a Word Voyagers drill still uses "+t+", which tolerates typos");
  });
}

console.log("\n=== the tolerance stays where it was deliberately wanted ===");
{ const geo={type:"fill-blank", a:["triangle"]};
  const strict={type:"fill-blank", a:["triangle"], fuzzy:false};
  const lenient=T.grade(geo,"triangel");
  console.log("  a geometry answer still forgives \"triangel\" : "+lenient);
  console.log("  fuzzy:false insists on exactness            : "+!T.grade(strict,"triangel"));
  if(!lenient) fail.push("math vocabulary lost a tolerance that tests/answer-matching.js requires");
  if(T.grade(strict,"triangel")) fail.push("fuzzy:false does not force exactness");
  if(!T.grade({type:"short-answer",a:["12"]},"12.0")) fail.push("number matching was broken");
}

console.log("\n=== no item anywhere in Word Voyagers opts in ===");
{ let opted=0;
  [["LA_Y1","3rd"],["LA_Y2","5th"]].forEach(([k])=>{
    const Y=window.__CURR[k];
    for(let w=1;w<=36;w++){
      Y.spellingSetFor(w).items.forEach(i=>{ if(i.fuzzy) opted++; });
      Y.grammarSetFor(w).items.forEach(i=>{ if(i.fuzzy) opted++; });
    }
  });
  console.log("  items carrying fuzzy:true : "+opted);
  if(opted) fail.push(opted+" Word Voyagers items opt in to the typo tolerance");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: spelling is exact; the tolerance stays only where it was wanted.");
process.exit(fail.length?1:0);
