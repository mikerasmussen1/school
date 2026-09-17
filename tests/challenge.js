/* Notebook challenges name two real sentences and have a right answer. */
global.window=global; global.__CURR={}; window.__CURR={};
const D=__dirname+'/../curriculum/';
['la-y1-spine','la-y1-reading','la-y2-spine','la-y2-reading','la-challenge','la-close-reading']
  .forEach(f=>{try{require(D+f+'.js')}catch(e){}});
const CH=window.__CURR.LA_CHALLENGE, CL=window.__CURR.LA_CLOSE;
let fail=[], checked=0;

console.log("=== every quoted sentence is verbatim in its passage ===");
[["y1","LA_Y1","3rd"],["y2","LA_Y2","5th"]].forEach(([g,k,label])=>{
  const Y=window.__CURR[k];
  CH.weeksWritten(g).forEach(w=>{
    const text=Y.passageFor(w).text;
    CL.ORDER.forEach(d=>{
      const c=CH.challengeFor(g,w,d);
      if(!c){ fail.push(label+" w"+w+" "+d+" is missing"); return; }
      checked++;
      ["a","b"].forEach(x=>{
        if(text.indexOf(c[x])<0) fail.push(label+" w"+w+" "+d+" ("+x+") is not in the passage: "+c[x].slice(0,40));
      });
      // Task 4 says "copy it exactly", so each must be a WHOLE sentence: it
      // starts where a passage sentence starts (not after "Mr." / "Mrs." /
      // "Dr.", which is how "Okonkwo put a lamp..." lost its opening), ends on
      // sentence punctuation, and does not leave a quotation mark open.
      ["a","b"].forEach(x=>{
        const s=c[x], at=text.indexOf(s); if(at<0) return;
        const before=text.slice(0,at).replace(/["\u201C\u2018\s]+$/,"");
        const startsOk = before==="" || /[.!?:\u2014]["\u201D\u2019]?$/.test(before) && !/\b(Mr|Mrs|Ms|Dr|St)\.$/.test(before);
        if(!startsOk) fail.push(label+" w"+w+" "+d+" ("+x+") starts mid-sentence: "+s.slice(0,40));
        if(!/[.!?]["\u201D\u2019]?$/.test(s)) fail.push(label+" w"+w+" "+d+" ("+x+") does not end a sentence: "+s.slice(-30));
        if(((s.match(/"/g)||[]).length)%2) fail.push(label+" w"+w+" "+d+" ("+x+") has an unbalanced quotation mark");
      });
      if(c.a===c.b) fail.push(label+" w"+w+" "+d+" offers the same sentence twice");
      if(c.pick!=="a" && c.pick!=="b") fail.push(label+" w"+w+" "+d+" has no valid answer");
    });
  });
});
console.log("  "+checked+" challenges, both sentences found verbatim in every one");

console.log("\n=== each has a real decision and a thinking question ===");
[["y1","3rd"],["y2","5th"]].forEach(([g,label])=>{
  CH.weeksWritten(g).forEach(w=>CL.ORDER.forEach(d=>{
    const c=CH.challengeFor(g,w,d); if(!c) return;
    if(!/\?$/.test(c.ask))   fail.push(label+" w"+w+" "+d+" the decision is not phrased as a question");
    if(!/\?$/.test(c.think)) fail.push(label+" w"+w+" "+d+" the thinking task is not a question");
    if(c.think.length<40)    fail.push(label+" w"+w+" "+d+" thinking question is too thin");
    // it must be about THIS passage, not a frame that would fit any text
    // A generic question is one that would fit ANY passage — "find one thing
    // that...", "any sentence which...". Matching the bare word "something"
    // flagged ordinary prose like "finding something sad", so match the
    // frames themselves.
    if(/\bfind (one thing|something|a sentence)\b|\bany sentence\b|\bone thing the passage\b/i.test(c.think))
      fail.push(label+" w"+w+" "+d+" thinking question is a generic frame");
  }));
});
console.log("  every decision and every thinking question is specific to its passage");

console.log("\n=== the two grades never share a challenge ===");
{ let shared=0;
  CH.weeksWritten("y1").forEach(w=>CL.ORDER.forEach(d=>{
    const a=CH.challengeFor("y1",w,d), b=CH.challengeFor("y2",w,d);
    if(a&&b&&a.ask===b.ask) shared++;
  }));
  console.log("  shared wordings: "+shared);
  if(shared) fail.push(shared+" challenges are identical across the grades");
}

console.log("\n=== weeks not yet written say so, rather than going vague ===");
{ const c=CH.challengeFor("y1",30,"Mon");
  console.log("  3rd week 30: "+(c===null?"null, so the page shows the not-written notice":"HAS DATA"));
  if(c!==null) fail.push("week 30 unexpectedly has data");
  console.log("  written so far: 3rd "+CH.weeksWritten("y1").join(",")+" | 5th "+CH.weeksWritten("y2").join(","));
}

console.log("\n=== the page prints the challenge, not a generic task ===");
{ const fs=require('fs');
  const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  const i=src.indexOf('{{ aClose }}');
  const seg=src.slice(i, src.indexOf('{{ aRead }}', i));
  ["challengeAsk","challengeA","challengeB","challengeThink"].forEach(k=>{
    if(seg.indexOf("{{ "+k+" }}")<0) fail.push("the lesson panel does not bind "+k);
  });
  if(seg.indexOf("{{ lessonTasks }}")>=0)
    fail.push("the old generic task list is still being printed");
  if(seg.indexOf("{{ noChallengeNote }}")<0)
    fail.push("there is no notice for weeks that are not written");
  // The date is Task #1 of the notebook entry, so it now lives with the quote
  // at the start of the lesson rather than in the closing panel.
  if(src.indexOf('sc-for list="{{ quoteTasks }}"')<0 || src.indexOf("C.DATE_LINE")<0)
    fail.push("the date line is not printed as Task #1 with the quote");
  if(!/curriculum\/la-challenge\.js/.test(src))
    fail.push("the page does not load the challenge module");
  console.log("  challenge, both sentences, date line and thinking question all bound");
}

console.log("\n=== the parent tab gives the answer, not a description ===");
{ const fs=require('fs');
  const src=fs.readFileSync(__dirname+'/../word-voyagers.dc.html','utf8');
  if(src.indexOf("{{ ng.answer }}")<0) fail.push("the parent tab does not show which choice is correct");
  if(src.indexOf("{{ ng.answerText }}")<0) fail.push("the parent tab does not show the correct sentence");
  console.log("  correct choice and its sentence both shown to the parent");
}

console.log(fail.length?("\nFAILURES:\n  "+fail.slice(0,6).join("\n  ")):"\nRESULT: specific sentences, a real decision, and an answer a parent can check.");
process.exit(fail.length?1:0);
