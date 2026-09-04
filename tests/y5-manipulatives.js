/* Year Two's eight manipulatives — one per mission, and each one CORRECT.
 *
 * Hank had none of these while Brock had eight. That is why they exist, but it
 * is not what this test is for. A manipulative is the one screen a child is
 * invited to trust over their own arithmetic, so a wrong one teaches the wrong
 * thing with the app's authority behind it.
 *
 * The case that made this test necessary: the place-value column for 0.7
 * showed a 6, because 0.7/0.1 is 6.999999999999999 in floating point and the
 * obvious implementation floors it. Nothing else in the pipeline could have
 * caught that — the page rendered, every binding resolved, and the number was
 * simply wrong. Digits are taken in integer thousandths now.
 */
const fs=require('fs'), D=__dirname+'/../curriculum/';
const LS={};
global.window=global;
global.localStorage={getItem:k=>k in LS?LS[k]:null,setItem:(k,v)=>{LS[k]=String(v)},removeItem:k=>{delete LS[k]}};
global.document={addEventListener(){},removeEventListener(){},visibilityState:"visible",createElement:()=>({style:{}}),body:{}};
global.addEventListener=global.removeEventListener=function(){};
global.setInterval=()=>0; global.clearInterval=()=>{}; global.setTimeout=()=>0; global.clearTimeout=()=>{};
global.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
global.fetch=async()=>({ok:false,json:async()=>({})});
global.location={search:"",href:""}; global.navigator={onLine:true};
global.speechSynthesis={cancel(){},speak(){}}; global.SpeechSynthesisUtterance=function(){};
global.React={createElement:(t,p,...c)=>({__el:t,props:p,children:c})};

const h=fs.readFileSync(__dirname+'/../index.html','utf8');
[...h.matchAll(/src="\.\/curriculum\/([^"?]+)\.js(?:\?[^"]*)?"/g)].map(m=>m[1])
  .forEach(m=>{try{require(D+m+'.js')}catch(e){}});
class DCLogic{ setState(p){ this.state={...this.state,...p}; } }
global.DCLogic=DCLogic;
const parts=h.split('data-dc-script>');
const src=(parts[1]||h.split(/<script(?![^>]*src)[^>]*>/).pop()).split('</script>')[0];
const C=eval("(function(){ "+src+"\n return Component; })()");

let fail=[];
const has=(w,c,got)=>{ console.log("  "+(c?"ok  ":"FAIL")+"  "+w+(c?"":"   got "+got));
                       if(!c) fail.push(w+" (got "+got+")"); };
const at=(u,extra,level)=>{ const c=new C(); c.props={};
  c.state={...c.state,view:"unit",unit:u,uview:u,week:1,
           subjects:{math:{level:level||"y5"}},...(extra||{})};
  return c.renderVals(); };

console.log("=== one per mission, and only one ===");
for(let u=1;u<=8;u++){
  const v=at(u);
  const on=[1,2,3,4,5,6,7,8].filter(n=>v["isY5M"+n]);
  has("mission "+u+" opens exactly its own: ["+on.join(",")+"]", on.length===1&&on[0]===u, on.join(","));
}
{
  const v=at(3,null,"y3");
  has("a Year One pilot opens none of them",
      ![1,2,3,4,5,6,7,8].some(n=>v["isY5M"+n]), "some open");
}

console.log("\n=== M1 · the digits move, not the point ===");
{
  let v=at(1,{ptV:"0.7",ptE:0});
  has("0.7 shows 7 in tenths, not 6 (the float trap)",
      v.ptBefore.filter(c=>c.label==="tenths")[0].d==="7",
      v.ptBefore.filter(c=>c.label==="tenths")[0].d);
  v=at(1,{ptV:"0.375",ptE:0});
  const row=l=>v.ptBefore.filter(c=>c.label===l)[0].d;
  has("0.375 reads 3 tenths, 7 hundredths, 5 thousandths",
      row("tenths")==="3"&&row("hundredths")==="7"&&row("thousandths")==="5",
      row("tenths")+row("hundredths")+row("thousandths"));
  v=at(1,{ptV:"0.7",ptE:3});
  has("0.7 x10^3 = 700", v.ptResult==="700", v.ptResult);
  has("  and the 7 has moved to hundreds",
      v.ptAfter.filter(c=>c.label==="hundreds")[0].d==="7", "");
  v=at(1,{ptV:"900",ptE:3});
  has("the shift stops before a digit falls off the columns",
      parseFloat(v.ptResult)<=999999, v.ptResult);
  v=at(1,{ptV:"0.5",ptE:-3});
  has("and stops at thousandths going down", parseFloat(v.ptResult)>=0.001, v.ptResult);
}

console.log("\n=== M2 · the area model inside the algorithm ===");
{
  [["243","36"],["999","99"],["100","10"]].forEach(([a,b])=>{
    const v=at(2,{bmA:a,bmB:b});
    const sum=v.bmCells.reduce((n,c)=>n+parseInt(c.v,10),0);
    has(a+" x "+b+": six rooms sum to the product",
        sum===(+a)*(+b) && v.bmTotal===String((+a)*(+b)), sum);
  });
  has("there are exactly six rooms", at(2).bmCells.length===6, at(2).bmCells.length);
}

console.log("\n=== M3 · how many groups fit ===");
{
  [["748","4"],["9407","7"],["1000","3"],["99","12"]].forEach(([a,b])=>{
    const v=at(3,{ldA:a,ldB:b});
    const q=Math.floor((+a)/(+b)), r=(+a)%(+b);
    has(a+" / "+b+" = "+q+" r"+r, v.ldQ===String(q)&&v.ldR===String(r), v.ldQ+" r"+v.ldR);
    has("  one step per digit of "+a, v.ldSteps.length===a.length, v.ldSteps.length);
  });
}

console.log("\n=== M4 · why multiplying can shrink ===");
{
  let v=at(4,{dmA:"6",dmB:"0.4"});
  has("6 x 0.4 = 2.4, flagged as shrinking", v.dmOut==="2.4"&&v.dmShrinks===true, v.dmOut);
  has("  and it says it is still multiplying", /still multiplying/.test(v.dmSays), "");
  v=at(4,{dmA:"6",dmB:"2.5"});
  has("6 x 2.5 = 15, not shrinking", v.dmOut==="15"&&v.dmShrinks===false, v.dmOut);
  v=at(4,{dmA:"6",dmB:"1"});
  has("x1 is neither", v.dmShrinks===false&&v.dmOut==="6", v.dmOut);
}

console.log("\n=== M5 · you cannot add unlike pieces ===");
{
  let v=at(5,{fsA:"2",fsB:"3",fsC:"3",fsD:"4"});
  has("2/3 + 3/4 -> 8/12 + 9/12 = 17/12", v.fsRetiled==="8/12 + 9/12 = 17/12", v.fsRetiled);
  has("  flagged as over one whole", v.fsOver===true, v.fsOver);
  has("  both strips are retiled to the same count",
      v.fsTopL.length===12 && v.fsBotL.length===12, v.fsTopL.length+"/"+v.fsBotL.length);
  v=at(5,{fsA:"1",fsB:"2",fsC:"1",fsD:"4"});
  has("1/2 + 1/4 = 3/4 in quarters, not eighths", v.fsRetiled==="2/4 + 1/4 = 3/4", v.fsRetiled);
}

console.log("\n=== M6 · how many halves fit ===");
{
  [["3","2",6],["4","3",12],["1","8",8]].forEach(([n,d,want])=>{
    const v=at(6,{fpN:n,fpD:d});
    has(n+" / (1/"+d+") = "+want, v.fpAns===String(want), v.fpAns);
    has("  "+n+" wholes drawn, each in "+d,
        v.fpWholes.length===+n && v.fpWholes[0].parts.length===+d,
        v.fpWholes.length+"x"+v.fpWholes[0].parts.length);
  });
}

console.log("\n=== M7 · squared covers, cubed fills ===");
{
  const v=at(7,{vL:"5",vW:"4",vH:"3"});
  has("5x4 layer is 20 squares", v.vArea==="20", v.vArea);
  has("stacked 3 high is 60 cubes", v.vVol==="60", v.vVol);
  has("  the layer is drawn cell by cell", v.vLayer.length===20, v.vLayer.length);
  has("  and stacked the right number of times", v.vStack.length===3, v.vStack.length);
}

console.log("\n=== M8 · two patterns, one line ===");
{
  let v=at(8,{cgA:"2",cgB:"3"});
  has("x+2, y+3 plots (0,0)(2,3)(4,6)(6,9)",
      v.cgRows.map(r=>r.label).join(" ")==="(0, 0) (2, 3) (4, 6) (6, 9)",
      v.cgRows.map(r=>r.label).join(" "));
  v=at(8,{cgA:"1",cgB:"1"});
  has("x+1, y+1 gives 11 points on the diagonal", v.cgRows.length===11, v.cgRows.length);
  has("  the grid is 11x11", v.cgCells.length===121, v.cgCells.length);
}

console.log("\n=== nothing renders blank ===");
{
  // Every binding these eight use must be produced for its own mission.
  const lines=h.split('\n');
  const s=lines.findIndex(l=>/THE MATH IS THE ART · YEAR TWO/.test(l));
  const e=lines.findIndex((l,i)=>i>s && /What this mission builds/.test(l));
  const region=lines.slice(s,e).join('\n');
  const locals=new Set([...region.matchAll(/as="(\w+)"/g)].map(m=>m[1]));
  const used=[...new Set([...region.matchAll(/\{\{\s*([\w.]+)/g)].map(m=>m[1].split('.')[0])
    .filter(k=>!locals.has(k)&&k!=='true'&&k!=='false'))];
  console.log("  "+used.length+" bindings across the eight");
  for(let u=1;u<=8;u++){
    const v=at(u);
    const missing=used.filter(k=>!(k in v));
    has("mission "+u+": all bindings present"+(missing.length?" — MISSING "+missing.join(", "):""),
        missing.length===0, missing.join(","));
  }
}

console.log("");
if(fail.length){ console.log("FAILED "+fail.length+":"); fail.forEach(f=>console.log("  - "+f)); process.exit(1); }
console.log("all checks passed");
