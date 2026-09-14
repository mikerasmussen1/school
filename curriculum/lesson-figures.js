/* ============================================================================
 * MATH — TEACHING FIGURES
 * ----------------------------------------------------------------------------
 * A lesson step may carry `fig` instead of `dots` or cols/rows/cells. A fig is
 * a small plain object describing a picture that teaches: a number line with
 * jumps on it, a place-value chart with the digits sliding, a fraction bar,
 * a hundred grid, a coordinate plane, an angle, a bar graph, base-ten blocks,
 * column arithmetic with the carry shown, a box of unit cubes.
 *
 * Drawn as inline SVG so it scales to the stage and never resizes as a child
 * steps through a lesson. Colours come from the app's CSS variables.
 *
 *   {fig:{k:"nl",  min:0, max:100, step:10, marks:[{v:47,l:"47"}], jumps:[{a:47,b:50,l:"+3"}], span:[45,55]}}
 *   {fig:{k:"pv",  places:["tens","ones","tenths"], rows:[{d:["","4","2"],l:"4.2"},{d:["4","2",""],l:"42"}], shift:{by:1,dir:"L"}}}
 *   {fig:{k:"bars", bars:[{n:4,k:3,l:"3/4"},{n:8,k:6,l:"6/8"}]}}
 *   {fig:{k:"g100", n:35, l:"0.35"}}
 *   {fig:{k:"xy",  w:8, h:6, pts:[{x:3,y:4,l:"(3, 4)"}], path:true}}
 *   {fig:{k:"ang", deg:90, l:"90°"}}
 *   {fig:{k:"bar", bars:[{l:"Mon",v:12},{l:"Tue",v:9}], step:2}}
 *   {fig:{k:"pict", rows:[{l:"Mon",n:3}], each:4}}
 *   {fig:{k:"b10", h:2, t:3, o:4}}
 *   {fig:{k:"col", lines:["  23","× 14"], res:["  92","230 ","322"], hl:[[1,3]]}}
 *   {fig:{k:"vol", l:4, w:3, h:2}}
 *   {fig:{k:"groups", g:4, n:6}}
 *   {fig:{k:"tape", parts:[{v:"24",l:""},{v:"?",l:""}], total:"30"}}
 *   {fig:{k:"poly", pts:[[0,0],[6,0],[6,4],[0,4]], sides:["6","4","6","4"], right:[0,1,2,3]}}
 *   {fig:{k:"ruler", len:6, sub:4, pt:2.75, l:"2¾"}}
 *   {fig:{k:"ld", d:"3", n:"372", q:"124", work:["-3  "," 07 ","- 6 ","  12","- 12","   0"]}}
 *   {fig:{k:"clock", h:3, m:40}}
 * ==========================================================================*/
(function(){
  const SKY="#38BDF8", GREEN="#4ADE80", PINK="#F472B6", AMBER="#FBBF24", ROSE="#FB7185", INK="var(--ink,#EEF2FF)";
  const TONES=[SKY,GREEN,PINK,AMBER];
  const DIM="rgba(var(--line-rgb,255,255,255),.18)";
  const MONO="'JetBrains Mono',monospace", SANS="Fredoka,sans-serif";
  const col=(c,i)=>c||TONES[(i||0)%4];
  const fmt=v=>{ if(typeof v!=="number") return String(v); const s=+v.toFixed(3); return String(s); };

  /* EVERY LIST A FIGURE READS COMES THROUGH ONE OF THESE — AND WHICH ONE IS A
   * REAL DECISION, NOT A STYLE CHOICE.
   *
   * Guarding the array and then trusting its contents is half a guard: a fig
   * whose `bars` is present but holds a null entry threw just as hard as one
   * with no `bars` at all, and an entry going missing while a lesson is edited
   * is the likelier slip of the two.
   *
   * But dropping a hole is only safe when POSITION CARRIES NO MEANING.
   *
   *   list()   a bag of things — bars, marks, jumps, parts. Nothing outside
   *            the list refers to an index in it, so closing the gap is fine.
   *
   *   slots()  a list whose INDEX IS THE POINT. `poly.sides[i]` labels the
   *            edge leaving `pts[i]`; `col.lines`/`res` are the rows that
   *            `hl:[[row,col]]` points at. Removing an entry here does not
   *            crash and does not look broken — it silently slides every later
   *            entry one place, so a rectangle's "4" ends up on the wrong
   *            edge, or a highlight lands on the wrong row. A hole is filled
   *            with "" instead, which every caller already treats as "skip
   *            this one", so length and alignment survive.
   *
   * That distinction was learned the hard way: routing `sides` through the
   * filtering helper turned a skipped label into a mislabelled shape, which is
   * worse than a crash because nothing reports it. */
  const list=a=>Array.isArray(a)?a.filter(x=>x!=null&&x!==false):[];
  const strs=a=>list(a).map(String);
  const slots=a=>Array.isArray(a)?a.map(x=>(x==null||x===false)?"":String(x)):[];

  /* NOTHING HERE MAY THROW.
   *
   * This runs inside the lesson render. An exception is not confined to the
   * diagram — it takes the lesson down, so a single mistyped field in one of
   * hundreds of authored steps would blank a child's screen. A figure that
   * cannot be drawn draws nothing, and the tests are what catch that: they
   * render every fig in every lesson and fail on any that produces no shapes.
   *
   * An unknown kind returns nothing rather than printing its name in red. That
   * message was written for whoever is authoring the lesson, and the person who
   * would actually have read it is a nine-year-old doing their maths. */
  function render(fig, React, stageW){
    if(!fig || !React || typeof React.createElement !== "function") return null;
    const h=React.createElement;
    const W=Math.max(220, Math.min(440, (stageW||400)-52));
    const draw = KINDS[fig.k];
    if(!draw) return null;
    const out = draw(fig, W, h);
    if(!out || !out.el) return null;
    const kids=[out.el];
    if(fig.title) kids.push(h("div",{key:"t",style:{marginTop:8,fontFamily:MONO,fontSize:12,color:AMBER,textAlign:"center"}},fig.title));
    return h("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},kids);
  }
  const svg=(h,W,H,kids,extra)=>h("svg",Object.assign({width:W,height:H,viewBox:`0 0 ${W} ${H}`,style:{overflow:"visible",display:"block",transition:"all .5s"}},extra||{}),kids);
  const txt=(h,x,y,s,o)=>h("text",Object.assign({x,y,fill:INK,fontFamily:SANS,fontSize:13,textAnchor:"middle",dominantBaseline:"middle"},o||{}),s);

  const KINDS={};

  /* Number line. */
  KINDS.nl=(f,W,h)=>{
    const min=f.min??0, max=f.max??10, step=f.step||((max-min)>20?Math.pow(10,Math.floor(Math.log10(max-min))-0):1);
    const pad=26, y=f.jumps&&f.jumps.length?96:66, H=y+40;
    const X=v=>pad+(v-min)/(max-min)*(W-2*pad);
    const kids=[];
    if(f.span) kids.push(h("rect",{key:"sp",x:X(f.span[0]),y:y-16,width:X(f.span[1])-X(f.span[0]),height:32,rx:8,fill:"rgba(74,222,128,.18)",stroke:"rgba(74,222,128,.6)"}));
    kids.push(h("line",{key:"ax",x1:pad-10,y1:y,x2:W-pad+10,y2:y,stroke:INK,strokeWidth:2,opacity:.8}));
    kids.push(h("path",{key:"ar",d:`M${W-pad+10},${y} l-7,-5 v10 z`,fill:INK,opacity:.8}));
    const labels=f.labels||null; const dec=(String(step).split(".")[1]||"").length;
    const nTicks=Math.round((max-min)/step); let lastLx=-99;
    for(let i=0;i<=nTicks;i++){
      const v=+(min+i*step).toFixed(dec+2), x=X(v), big=labels?labels.includes(v):true;
      kids.push(h("line",{key:"t"+i,x1:x,y1:y-(big?7:4),x2:x,y2:y+(big?7:4),stroke:INK,opacity:.7}));
      const want=big && (nTicks<=12 || i%Math.ceil(nTicks/12)===0 || (labels&&labels.includes(v)));
      if(want && x-lastLx>=(String(fmt(v)).length*7+6)){ kids.push(txt(h,x,y+22,fmt(v),{fontFamily:MONO,fontSize:12,opacity:.9})); lastLx=x; }
    }
    (f.minor||0)&&[...Array(nTicks*f.minor)].forEach((_,i)=>{ const v=min+i*step/f.minor; kids.push(h("line",{key:"m"+i,x1:X(v),y1:y-3,x2:X(v),y2:y+3,stroke:INK,opacity:.35})); });
    list(f.jumps).forEach((j,i)=>{
      const a=X(j.a), b=X(j.b), c=col(j.c,i), up=-(28+Math.min(22,Math.abs(b-a)/6));
      kids.push(h("path",{key:"j"+i,d:`M${a},${y-8} Q${(a+b)/2},${y+up*1.6} ${b},${y-8}`,fill:"none",stroke:c,strokeWidth:2.5}));
      kids.push(h("circle",{key:"jb"+i,cx:b,cy:y-8,r:3.5,fill:c}));
      if(j.l) kids.push(txt(h,(a+b)/2,y+up*.85-6,j.l,{fill:c,fontFamily:MONO,fontSize:13}));
    });
    list(f.marks).forEach((m,i)=>{
      const x=X(m.v), c=col(m.c,i+2);
      kids.push(h("circle",{key:"c"+i,cx:x,cy:y,r:7,fill:c,stroke:"#0b0f24",strokeWidth:2}));
      if(m.l) kids.push(txt(h,x,y-20-(m.up||0),m.l,{fill:c,fontFamily:MONO,fontSize:14,fontWeight:700}));
    });
    return {el:svg(h,W,H,kids)};
  };

  /* Place-value chart. Digits sit in named columns; a shift arrow between rows
   * shows the digits travelling left or right. */
  KINDS.pv=(f,W,h)=>{
    /* Every field a figure reads needs its own fallback. A lesson author who
     * leaves one out should get a figure that draws nothing, not an exception
     * that takes the whole lesson down with it. */
    const places=slots(f.places), n=Math.max(1, places.length), rows=list(f.rows);
    const cw=Math.min(64,(W-60)/n), x0=(W-cw*n)/2, rh=40, hy=30, H=hy+14+rows.length*rh+(f.shift?26:8);
    const kids=[];
    const onesIdx=places.findIndex(p=>/^ones?$/i.test(p));
    places.forEach((p,i)=>{
      const x=x0+i*cw, small=i>onesIdx&&onesIdx>=0;
      kids.push(h("rect",{key:"h"+i,x,y:0,width:cw-3,height:hy,rx:6,fill:small?"rgba(244,114,182,.18)":"rgba(56,189,248,.18)"}));
      kids.push(txt(h,x+cw/2-1.5,hy/2,p,{fontSize:cw<50?9:11,fontFamily:MONO,fill:small?"#F9A8D4":"#7DD3FC"}));
    });
    rows.forEach((r,ri)=>{
      const y=hy+14+ri*rh;
      places.forEach((p,i)=>{
        const x=x0+i*cw, d=(r.d||[])[i]||"";
        kids.push(h("rect",{key:`c${ri}-${i}`,x,y,width:cw-3,height:rh-6,rx:6,fill:d?"rgba(var(--line-rgb,255,255,255),.06)":"transparent",stroke:DIM}));
        if(d) kids.push(txt(h,x+cw/2-1.5,y+(rh-6)/2,d,{fontSize:22,fontFamily:MONO,fontWeight:700,fill:r.c||(ri===rows.length-1&&rows.length>1?GREEN:INK)}));
        if(i===onesIdx && onesIdx<n-1) kids.push(h("circle",{key:`pt${ri}`,cx:x+cw-1.5,cy:y+rh-12,r:3.5,fill:AMBER}));
      });
      if(r.l) kids.push(txt(h,x0-18,y+(rh-6)/2,r.l,{textAnchor:"end",fontFamily:MONO,fontSize:13,fill:AMBER}));
    });
    if(f.shift){
      const y=hy+14+rows.length*rh+6, dir=f.shift.dir==="R"?1:-1, len=cw*f.shift.by;
      const xs=x0+cw*n/2-dir*len/2, xe=xs+dir*len;
      kids.push(h("line",{key:"sh",x1:xs,y1:y,x2:xe,y2:y,stroke:GREEN,strokeWidth:2.5}));
      kids.push(h("path",{key:"sha",d:`M${xe},${y} l${-dir*8},-5 v10 z`,fill:GREEN}));
      kids.push(txt(h,(xs+xe)/2,y+14,f.shift.l||`${f.shift.by} place${f.shift.by>1?"s":""} ${dir<0?"left":"right"}`,{fontFamily:MONO,fontSize:11,fill:GREEN}));
    }
    return {el:svg(h,W,H+(f.shift?14:0),kids)};
  };

  /* Fraction bars: each bar is n equal cells, k of them shaded. */
  KINDS.bars=(f,W,h)=>{
    /* `bars`, not `f.bars` — the local is the one carrying the fallback, and
     * reading back through the raw field threw on a fig that omitted it. */
    const bars=list(f.bars), bh=f.bh||34, gap=16, lw=bars.some(b=>b&&b.l)?56:0, bw=W-lw-8;
    const H=bars.length*(bh+gap)-gap+4;
    const kids=[];
    bars.forEach((b,bi)=>{
      const y=2+bi*(bh+gap), c=col(b.c,bi), cw=bw/b.n, shaded=Array.isArray(b.k)?b.k:[...Array(b.k||0)].map((_,i)=>i);
      for(let i=0;i<b.n;i++){
        const on=shaded.includes(i), x=4+i*cw;
        kids.push(h("rect",{key:`${bi}-${i}`,x,y,width:cw-2,height:bh,rx:4,fill:on?c:"rgba(var(--line-rgb,255,255,255),.05)",fillOpacity:on?.75:1,stroke:on?c:DIM,strokeWidth:1.5,style:{transition:"all .5s"}}));
        if(b.cell) kids.push(txt(h,x+cw/2-1,y+bh/2,b.cell,{fontSize:11,fontFamily:MONO,opacity:.85}));
      }
      if(b.cut) for(let i=1;i<b.cut;i++){ const x=4+i*(bw/b.cut)-1; kids.push(h("line",{key:`cut${bi}-${i}`,x1:x,y1:y-4,x2:x,y2:y+bh+4,stroke:AMBER,strokeWidth:2,strokeDasharray:"4 3"})); }
      if(b.l) kids.push(txt(h,W-lw/2+2,y+bh/2,b.l,{fontFamily:MONO,fontSize:15,fill:c,fontWeight:700}));
    });
    return {el:svg(h,W,H,kids)};
  };

  /* Hundred grid: rows×cols, first n cells shaded (n2 more in a second colour),
   * or explicit `cells` / `cells2` lists of 1-based numbers. `nums` prints the
   * number in every cell (a real hundred chart). */
  KINDS.g100=(f,W,h)=>{
    const rows=f.rows||10, cols=f.cols||10, S=Math.min(f.nums?26:22,(W-(f.l?70:0))/cols), x0=4, kids=[];
    const c1=f.cells?new Set(f.cells):null, c2=f.cells2?new Set(f.cells2):null;
    for(let i=0;i<rows*cols;i++){
      const r=Math.floor(i/cols), c=i%cols, on=c1?c1.has(i+1):i<(f.n||0), on2=c2?c2.has(i+1):(!on&&i<(f.n||0)+(f.n2||0));
      const xo=on&&f.cross;
      kids.push(h("rect",{key:i,x:x0+c*S,y:r*S,width:S-2,height:S-2,rx:2,fill:xo?"rgba(251,113,133,.10)":on?SKY:on2?PINK:"rgba(var(--line-rgb,255,255,255),.05)",fillOpacity:(on||on2)&&!xo?.8:1,stroke:xo?"rgba(251,113,133,.35)":on?SKY:on2?PINK:DIM,strokeWidth:1,style:{transition:"all .4s"}}));
      if(xo) kids.push(h("line",{key:"x"+i,x1:x0+c*S+4,y1:r*S+S-6,x2:x0+c*S+S-6,y2:r*S+4,stroke:ROSE,strokeWidth:2,opacity:.8}));
      if(f.nums) kids.push(txt(h,x0+c*S+S/2-1,r*S+S/2-1,String(i+1),{fontFamily:MONO,fontSize:S<24?9:10,fill:(on||on2)&&!xo?"#0b0f24":INK,opacity:xo?.45:on||on2?1:.75,fontWeight:(on||on2)&&!xo?700:500}));
    }
    if(f.l) kids.push(txt(h,x0+cols*S+34,rows*S/2,f.l,{fontFamily:MONO,fontSize:16,fill:SKY,fontWeight:700}));
    return {el:svg(h,W,rows*S,kids)};
  };

  /* Coordinate plane, first quadrant. */
  KINDS.xy=(f,W,h)=>{
    const gw=f.w||10, gh=f.h||10, pad=28, S=Math.min((W-pad-10)/gw,(240-pad)/gh), x0=pad, y0=gh*S+6, kids=[];
    const X=x=>x0+x*S, Y=y=>y0-y*S;
    for(let i=0;i<=gw;i++) kids.push(h("line",{key:"v"+i,x1:X(i),y1:Y(0),x2:X(i),y2:Y(gh),stroke:i?DIM:INK,strokeWidth:i?1:2}));
    for(let j=0;j<=gh;j++) kids.push(h("line",{key:"h"+j,x1:X(0),y1:Y(j),x2:X(gw),y2:Y(j),stroke:j?DIM:INK,strokeWidth:j?1:2}));
    for(let i=0;i<=gw;i+=(gw>12?2:1)) kids.push(txt(h,X(i),y0+14,String(i),{fontSize:10,fontFamily:MONO,opacity:.8}));
    for(let j=1;j<=gh;j+=(gh>12?2:1)) kids.push(txt(h,x0-12,Y(j),String(j),{fontSize:10,fontFamily:MONO,opacity:.8}));
    const pts=list(f.pts).filter(p=>p&&typeof p==="object");
    if(f.path&&pts.length>1) kids.push(h("path",{key:"p",d:pts.map((p,i)=>(i?"L":"M")+X(p.x)+","+Y(p.y)).join(" ")+(f.close?" Z":""),fill:f.close?"rgba(56,189,248,.15)":"none",stroke:SKY,strokeWidth:2}));
    pts.forEach((p,i)=>{
      const c=col(p.c,i+1);
      if(p.trace){ kids.push(h("line",{key:"tx"+i,x1:X(0),y1:Y(0),x2:X(p.x),y2:Y(0),stroke:AMBER,strokeWidth:3})); kids.push(h("line",{key:"ty"+i,x1:X(p.x),y1:Y(0),x2:X(p.x),y2:Y(p.y),stroke:GREEN,strokeWidth:3})); }
      kids.push(h("circle",{key:"c"+i,cx:X(p.x),cy:Y(p.y),r:6,fill:c,stroke:"#0b0f24",strokeWidth:2}));
      if(p.l) kids.push(txt(h,X(p.x)+(p.dx||0),Y(p.y)-14+(p.dy||0),p.l,{fontFamily:MONO,fontSize:12,fill:c}));
    });
    return {el:svg(h,W,y0+24,kids)};
  };

  /* An angle as an amount of turn from the base ray. */
  KINDS.ang=(f,W,h)=>{
    const deg=f.deg||90, R=Math.min(110,W/3), cx=W/2-(deg>180?0:20), cy=deg>180?130:150, H=deg>180?260:170, kids=[];
    const rad=-deg*Math.PI/180, ex=cx+R*Math.cos(rad), ey=cy+R*Math.sin(rad);
    const r2=R*.42, large=deg>180?1:0;
    kids.push(h("path",{key:"arc",d:`M${cx+r2},${cy} A${r2},${r2} 0 ${large} 0 ${cx+r2*Math.cos(rad)},${cy+r2*Math.sin(rad)}`,fill:"rgba(251,191,36,.25)",stroke:AMBER,strokeWidth:2.5}));
    if(deg===90) kids.push(h("path",{key:"sq",d:`M${cx+18},${cy} v-18 h-18`,fill:"none",stroke:AMBER,strokeWidth:2}));
    kids.push(h("line",{key:"b",x1:cx,y1:cy,x2:cx+R,y2:cy,stroke:INK,strokeWidth:3,strokeLinecap:"round"}));
    kids.push(h("line",{key:"r",x1:cx,y1:cy,x2:ex,y2:ey,stroke:SKY,strokeWidth:3,strokeLinecap:"round"}));
    kids.push(h("circle",{key:"v",cx,cy,r:4,fill:INK}));
    if(f.l) kids.push(txt(h,cx+r2*1.7*Math.cos(rad/2),cy+r2*1.7*Math.sin(rad/2),f.l,{fontFamily:MONO,fontSize:15,fill:AMBER,fontWeight:700}));
    if(f.name) kids.push(txt(h,W/2,H-8,f.name,{fontSize:13,opacity:.8}));
    return {el:svg(h,W,H,kids)};
  };

  /* Bar graph with a labelled scale. */
  KINDS.bar=(f,W,h)=>{
    const bars=list(f.bars), step=f.step||1, max=f.max||Math.ceil(Math.max(...bars.map(b=>b.v))/step)*step, pad=34, H=200, gh=H-40;
    const bw=Math.min(52,(W-pad-10)/bars.length-10), kids=[];
    const Y=v=>10+gh-(v/max)*gh;
    for(let v=0;v<=max;v+=step){ kids.push(h("line",{key:"g"+v,x1:pad,y1:Y(v),x2:W-4,y2:Y(v),stroke:v?DIM:INK})); kids.push(txt(h,pad-10,Y(v),String(v),{textAnchor:"end",fontSize:10,fontFamily:MONO,opacity:.85})); }
    bars.forEach((b,i)=>{
      const x=pad+12+i*((W-pad-16)/bars.length), c=col(b.c,i);
      kids.push(h("rect",{key:"b"+i,x,y:Y(b.v),width:bw,height:Y(0)-Y(b.v),rx:5,fill:c,fillOpacity:.75,stroke:c,style:{transition:"all .5s"}}));
      if(f.vals!==false) kids.push(txt(h,x+bw/2,Y(b.v)-10,String(b.v),{fontFamily:MONO,fontSize:12,fill:c}));
      kids.push(txt(h,x+bw/2,Y(0)+14,b.l,{fontSize:11}));
    });
    return {el:svg(h,W,H,kids)};
  };

  /* Pictograph: rows of symbols, each worth `each`. Half symbols allowed. */
  KINDS.pict=(f,W,h)=>{
    const rows=list(f.rows), S=22, lw=54, kids=[];
    rows.forEach((r,ri)=>{
      const y=ri*(S+10)+S/2+2;
      kids.push(txt(h,lw-8,y,r.l,{textAnchor:"end",fontSize:12}));
      const whole=Math.floor(r.n), half=r.n%1>0;
      for(let i=0;i<whole;i++) kids.push(h("circle",{key:`${ri}-${i}`,cx:lw+8+i*(S+4),cy:y,r:S/2-2,fill:AMBER,fillOpacity:.85}));
      if(half) kids.push(h("path",{key:`${ri}-h`,d:`M${lw+8+whole*(S+4)},${y-S/2+2} a${S/2-2},${S/2-2} 0 0 0 0,${S-4} z`,fill:AMBER,fillOpacity:.85}));
      if(f.vals) kids.push(txt(h,lw+8+(whole+(half?1:0))*(S+4)+14,y,"= "+(r.n*(f.each||1)),{textAnchor:"start",fontFamily:MONO,fontSize:12,fill:GREEN}));
    });
    kids.push(txt(h,W/2,rows.length*(S+10)+12,`● = ${f.each||1}`,{fontFamily:MONO,fontSize:12,fill:AMBER}));
    return {el:svg(h,W,rows.length*(S+10)+26,kids)};
  };

  /* Base-ten blocks: hundreds flats, tens rods, ones. `names` relabels for decimals. */
  KINDS.b10=(f,W,h)=>{
    const u=8, kids=[], names=f.names||["hundreds","tens","ones"]; let x=4; const H=10*u+40;
    const hN=f.h||0, tN=f.t||0, oN=f.o||0;
    const flatW=10*u+2, rodW=u+2;
    for(let i=0;i<hN;i++){ for(let r=0;r<10;r++)for(let c=0;c<10;c++) kids.push(h("rect",{key:`h${i}-${r}-${c}`,x:x+c*u,y:r*u,width:u-1,height:u-1,fill:SKY,fillOpacity:.7})); x+=flatW+10; }
    if(hN){ kids.push(txt(h,(4+x-10)/2,10*u+16,`${hN} ${names[0]}`,{fontSize:11,fontFamily:MONO,fill:SKY})); x+=8; }
    const tx0=x;
    for(let i=0;i<tN;i++){ for(let r=0;r<10;r++) kids.push(h("rect",{key:`t${i}-${r}`,x,y:r*u,width:u-1,height:u-1,fill:GREEN,fillOpacity:.75})); x+=rodW+4; }
    if(tN){ kids.push(txt(h,(tx0+x-4)/2,10*u+16,`${tN} ${names[1]}`,{fontSize:11,fontFamily:MONO,fill:GREEN})); x+=12; }
    const ox0=x;
    for(let i=0;i<oN;i++){ kids.push(h("rect",{key:`o${i}`,x:x+(i%5)*(u+2),y:(10-1-Math.floor(i/5))*u,width:u-1,height:u-1,fill:PINK,fillOpacity:.85})); }
    if(oN){ const ow=Math.min(oN,5)*(u+2); kids.push(txt(h,ox0+ow/2,10*u+16,`${oN} ${names[2]}`,{fontSize:11,fontFamily:MONO,fill:PINK})); x+=ow; }
    const total=Math.max(W,x+4);
    return {el:svg(h,W,H,kids,{viewBox:`0 0 ${total} ${H}`,preserveAspectRatio:"xMidYMid meet"})};
  };

  /* Column arithmetic. `lines` are the working rows (monospace, right-aligned
   * by you); `res` rows go under the line; `hl` = [[row,col]] cells to light;
   * `carry` = string drawn above the top line. Row index counts lines then res. */
  KINDS.col=(f,W,h)=>{
    const lines=slots(f.lines), res=slots(f.res), all=lines.concat(res), n=Math.max(...all.map(s=>s.length)), cw=26, rh=32;
    const x0=(W-cw*n)/2, kids=[], hl=list(f.hl).filter(Array.isArray);
    let y=(f.carry?26:6);
    if(f.carry){ [...f.carry].forEach((ch,i)=>{ if(ch!==" ") kids.push(txt(h,x0+i*cw+cw/2,10,ch,{fontFamily:MONO,fontSize:12,fill:PINK})); }); }
    all.forEach((s,ri)=>{
      if(ri===lines.length) { kids.push(h("line",{key:"ln",x1:x0-6,y1:y-2,x2:x0+cw*n+6,y2:y-2,stroke:INK,strokeWidth:2})); y+=6; }
      const pad=n-s.length;
      [...s].forEach((ch,i)=>{
        const ci=i+pad, lit=hl.some(p=>p[0]===ri&&p[1]===ci);
        if(lit) kids.push(h("rect",{key:`hl${ri}-${ci}`,x:x0+ci*cw+1,y:y,width:cw-2,height:rh-4,rx:6,fill:"rgba(251,191,36,.25)",stroke:AMBER}));
        if(ch!==" ") kids.push(txt(h,x0+ci*cw+cw/2,y+rh/2-2,ch,{fontFamily:MONO,fontSize:24,fill:lit?AMBER:(ri>=lines.length?GREEN:INK),fontWeight:ri>=lines.length?700:500}));
      });
      y+=rh;
    });
    strs(f.notes).forEach((nt,i)=>kids.push(txt(h,W/2,y+8+i*16,nt,{fontFamily:MONO,fontSize:12,fill:AMBER})));
    return {el:svg(h,W,y+10+strs(f.notes).length*16,kids)};
  };

  /* A box of unit cubes, drawn in a simple oblique view. `layers` shows only
   * that many layers filled (for teaching volume as stacked areas). */
  KINDS.vol=(f,W,h)=>{
    const L=f.l||3, D=f.w||2, Hh=f.h||2, layers=f.layers??Hh, s=Math.min(30,(W-60)/(L+D*.6)), ox=.55*s, oy=.32*s;
    const x0=20, y0=Hh*s+D*oy+10, kids=[];
    const P=(x,y,z)=>[x0+x*s+y*ox, y0-z*s-y*oy];
    for(let z=0;z<Hh;z++)for(let y=D-1;y>=0;y--)for(let x=0;x<L;x++){
      const on=z<layers, c=on?TONES[z%4]:"rgba(var(--line-rgb,255,255,255),.03)", st=on?c:DIM;
      const [ax,ay]=P(x,y,z),[bx,by]=P(x+1,y,z),[cx,cy]=P(x+1,y,z+1),[dx,dy]=P(x,y,z+1);
      const [ex,ey]=P(x,y+1,z+1),[fx,fy]=P(x+1,y+1,z+1),[gx,gy]=P(x+1,y+1,z);
      kids.push(h("path",{key:`f${x}${y}${z}`,d:`M${ax},${ay}L${bx},${by}L${cx},${cy}L${dx},${dy}Z`,fill:c,fillOpacity:on?.75:1,stroke:st}));
      kids.push(h("path",{key:`t${x}${y}${z}`,d:`M${dx},${dy}L${cx},${cy}L${fx},${fy}L${ex},${ey}Z`,fill:c,fillOpacity:on?.45:1,stroke:st}));
      kids.push(h("path",{key:`s${x}${y}${z}`,d:`M${bx},${by}L${gx},${gy}L${fx},${fy}L${cx},${cy}Z`,fill:c,fillOpacity:on?.3:1,stroke:st}));
    }
    const [lx,ly]=P(L/2,0,0),[wx,wy]=P(L,D/2,0),[hx,hy]=P(0,0,Hh/2);
    if(f.labels!==false){ kids.push(txt(h,lx,ly+16,String(L),{fontFamily:MONO,fill:SKY})); kids.push(txt(h,wx+22,wy+4,String(D),{fontFamily:MONO,fill:GREEN})); kids.push(txt(h,hx-14,hy,String(Hh),{fontFamily:MONO,fill:PINK})); }
    return {el:svg(h,W,y0+24,kids)};
  };

  /* Equal groups: g rings, n dots in each. */
  KINDS.groups=(f,W,h)=>{
    const g=f.g||3, n=f.n||4, per=Math.min(g,4), R=Math.min(44,(W-16)/per/2-6), rows=Math.ceil(g/per), kids=[];
    for(let i=0;i<g;i++){
      const cx=8+R+(i%per)*(2*R+12), cy=8+R+Math.floor(i/per)*(2*R+12), c=TONES[i%4];
      kids.push(h("circle",{key:"g"+i,cx,cy,r:R,fill:c,fillOpacity:.12,stroke:c,strokeWidth:1.5}));
      const cols=Math.ceil(Math.sqrt(n)), rws=Math.ceil(n/cols), d=Math.min(9,(R*1.3)/cols);
      for(let k=0;k<n;k++){ const kc=k%cols, kr=Math.floor(k/cols); kids.push(h("circle",{key:`d${i}-${k}`,cx:cx-(cols-1)*d+kc*2*d,cy:cy-(rws-1)*d+kr*2*d,r:d*.7,fill:c})); }
      if(f.each) kids.push(txt(h,cx,cy+R+12,f.each,{fontSize:11,fontFamily:MONO,fill:c}));
    }
    if(f.extra){ const cx=8+R+(g%per)*(2*R+12), cy=8+R+Math.floor(g/per)*(2*R+12); for(let k=0;k<f.extra;k++) kids.push(h("circle",{key:"x"+k,cx:cx-12+k*12,cy,r:5,fill:ROSE})); }
    return {el:svg(h,W,rows*(2*R+12)+(f.each?14:4)+(f.extra&&g%per===0?2*R+12:0),kids)};
  };

  /* Tape (bar model): parts with a total bracket. */
  KINDS.tape=(f,W,h)=>{
    const parts=list(f.parts), tot=parts.reduce((a,p)=>a+(p.s||1),0), bh=44, y=f.total?30:6, kids=[]; let x=6;
    parts.forEach((p,i)=>{ const w=(W-12)*(p.s||1)/tot, c=col(p.c,i), unk=p.v==="?"; kids.push(h("rect",{key:"p"+i,x,y,width:w-3,height:bh,rx:6,fill:unk?"transparent":c,fillOpacity:.7,stroke:c,strokeWidth:1.5,strokeDasharray:unk?"5 4":"none"})); kids.push(txt(h,x+w/2-1.5,y+bh/2,p.v,{fontFamily:MONO,fontSize:17,fill:unk?c:INK,fontWeight:700})); if(p.l) kids.push(txt(h,x+w/2-1.5,y+bh+14,p.l,{fontSize:11,fill:c})); x+=w; });
    if(f.total){ kids.push(h("path",{key:"br",d:`M8,${y-8} v-8 H${W-8} v8`,fill:"none",stroke:AMBER,strokeWidth:1.5})); kids.push(txt(h,W/2,8,f.total,{fontFamily:MONO,fontSize:13,fill:AMBER})); }
    return {el:svg(h,W,y+bh+(parts.some(p=>p.l)?22:6),kids)};
  };

  /* Polygon with side labels and right-angle marks. Units are grid units. */
  KINDS.poly=(f,W,h)=>{
    /* pts IS the positional list here — sides[i] labels the edge leaving
     * pts[i], and right[i] indexes into it — but a missing vertex has no
     * placeholder the way a missing label has "". Dropping one slides every
     * later label onto the wrong corner, silently.
     *
     * So this is the third case: not a bag to close up, not a slot to blank,
     * but a shape that cannot be drawn correctly at all. The file's rule for
     * that is already written — draw nothing — and this extends it one field
     * further. A hole at the END was caught by the !pts[i] guards below; one
     * in the MIDDLE was not. */
    const raw=Array.isArray(f.pts)?f.pts:[];
    const pts=raw.filter(p=>Array.isArray(p)&&p.length>1);
    if(pts.length<2 || pts.length!==raw.length) return null;
    const xs=pts.map(p=>p[0]), ys=pts.map(p=>p[1]), mnx=Math.min(...xs), mxx=Math.max(...xs), mny=Math.min(...ys), mxy=Math.max(...ys);
    const S=Math.min(30,(W-70)/Math.max(1,mxx-mnx),(190)/Math.max(1,mxy-mny)), x0=35, y0=(mxy-mny)*S+22, kids=[];
    const P=p=>[x0+(p[0]-mnx)*S, y0-(p[1]-mny)*S];
    if(f.grid) for(let i=mnx;i<=mxx;i++)for(let j=mny;j<=mxy;j++){ const [gx,gy]=P([i,j]); kids.push(h("rect",{key:`g${i}${j}`,x:gx,y:gy-S,width:S,height:S,fill:"none",stroke:DIM})); }
    kids.push(h("path",{key:"p",d:pts.map((p,i)=>(i?"L":"M")+P(p).join(",")).join(" ")+" Z",fill:f.fill===false?"none":"rgba(56,189,248,.18)",stroke:SKY,strokeWidth:2.5,strokeLinejoin:"round"}));
    slots(f.sides).forEach((l,i)=>{ if(!l || !pts[i]) return; const a=P(pts[i]), b=P(pts[(i+1)%pts.length]); const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2; const cx=x0+(mxx-mnx)*S/2, cy=y0-(mxy-mny)*S/2; const dx=mx-cx, dy=my-cy, d=Math.hypot(dx,dy)||1; kids.push(txt(h,mx+dx/d*18,my+dy/d*18,l,{fontFamily:MONO,fontSize:13,fill:AMBER})); });
    list(f.right).forEach(i=>{ if(!pts[i]) return; const c=P(pts[i]), a=P(pts[(i+pts.length-1)%pts.length]), b=P(pts[(i+1)%pts.length]); const ua=[(a[0]-c[0]),(a[1]-c[1])], ub=[(b[0]-c[0]),(b[1]-c[1])]; const na=Math.hypot(...ua), nb=Math.hypot(...ub); const k=12; const p1=[c[0]+ua[0]/na*k,c[1]+ua[1]/na*k], p2=[c[0]+ub[0]/nb*k,c[1]+ub[1]/nb*k], p3=[p1[0]+ub[0]/nb*k,p1[1]+ub[1]/nb*k]; kids.push(h("path",{key:"r"+i,d:`M${p1.join(",")} L${p3.join(",")} L${p2.join(",")}`,fill:"none",stroke:AMBER,strokeWidth:1.5})); });
    if(f.inner) kids.push(txt(h,x0+(mxx-mnx)*S/2,y0-(mxy-mny)*S/2,f.inner,{fontFamily:MONO,fontSize:16,fill:"#7DD3FC",fontWeight:700}));
    return {el:svg(h,W,y0+20,kids)};
  };

  /* Ruler: len whole units, `sub` marks per unit, a highlighted point. */
  KINDS.ruler=(f,W,h)=>{
    const len=f.len||6, sub=f.sub||4, pad=20, y=40, uw=(W-2*pad)/len, kids=[];
    kids.push(h("rect",{key:"body",x:pad-8,y:y-30,width:W-2*pad+16,height:52,rx:6,fill:"rgba(251,191,36,.12)",stroke:"rgba(251,191,36,.5)"}));
    for(let i=0;i<=len*sub;i++){ const x=pad+i*uw/sub, whole=i%sub===0, half=(sub%2===0)&&(i%(sub/2)===0); kids.push(h("line",{key:"t"+i,x1:x,y1:y-30,x2:x,y2:y-30+(whole?22:half?14:8),stroke:INK,strokeWidth:whole?2:1,opacity:whole?.9:.6})); if(whole) kids.push(txt(h,x,y+8,String(i/sub),{fontFamily:MONO,fontSize:12})); }
    if(f.pt!=null){ const x=pad+f.pt*uw; kids.push(h("line",{key:"pt",x1:x,y1:y-40,x2:x,y2:y+26,stroke:PINK,strokeWidth:2.5})); if(f.l) kids.push(txt(h,x,y+40,f.l,{fontFamily:MONO,fontSize:14,fill:PINK,fontWeight:700})); }
    if(f.unit) kids.push(txt(h,W-pad+8,y+40,f.unit,{fontSize:11,opacity:.7,textAnchor:"end"}));
    return {el:svg(h,W,y+52,kids)};
  };

  /* Long division. `d` divisor, `n` dividend (strings), `q` quotient so far,
   * `work` = rows under the dividend (each already right-aligned to the
   * dividend's width by you, e.g. "12 ", " 6"); `hl` = [[row,col]] where row 0
   * is the quotient, 1 the dividend, 2+ the work rows; `notes` under. */
  KINDS.ld=(f,W,h)=>{
    const d=String(f.d||""), n=String(f.n||""), q=String(f.q||""), work=slots(f.work), cw=26, rh=32;
    const nw=n.length, x0=(W-cw*(nw+d.length+1))/2+cw*(d.length+1), kids=[], hl=list(f.hl).filter(Array.isArray);
    const cell=(s,ri,y,color,bold)=>{ const pad=nw-s.length; [...s].forEach((ch,i)=>{ const ci=i+pad, lit=hl.some(p=>p[0]===ri&&p[1]===ci); if(lit) kids.push(h("rect",{key:`hl${ri}-${ci}`,x:x0+ci*cw+1,y:y-rh/2+2,width:cw-2,height:rh-4,rx:6,fill:"rgba(251,191,36,.25)",stroke:AMBER})); if(ch!==" ") kids.push(txt(h,x0+ci*cw+cw/2,y,ch,{fontFamily:MONO,fontSize:24,fill:lit?AMBER:color,fontWeight:bold?700:500})); }); };
    let y=rh/2+4;
    cell(q,0,y,GREEN,true); y+=rh;
    kids.push(h("path",{key:"bar",d:`M${x0-4},${y-rh/2} H${x0+cw*nw+4} M${x0-4},${y-rh/2} q-8,${rh/2} -8,${rh}`,fill:"none",stroke:INK,strokeWidth:2}));
    [...d].forEach((ch,i)=>kids.push(txt(h,x0-cw*(d.length-i)-8,y,ch,{fontFamily:MONO,fontSize:24})));
    cell(n,1,y,INK); y+=rh;
    work.forEach((w,i)=>{ const minus=w.startsWith("-"); const s=minus?w.slice(1):w; if(minus) kids.push(txt(h,x0-10,y,"−",{fontFamily:MONO,fontSize:20,fill:PINK})); cell(s,i+2,y,minus?PINK:INK); if(minus) kids.push(h("line",{key:"u"+i,x1:x0-4,y1:y+rh/2-2,x2:x0+cw*nw+4,y2:y+rh/2-2,stroke:INK,strokeWidth:1.5,opacity:.7})); y+=rh; });
    strs(f.notes).forEach((nt,i)=>kids.push(txt(h,W/2,y+i*16,nt,{fontFamily:MONO,fontSize:12,fill:AMBER})));
    return {el:svg(h,W,y+6+strs(f.notes).length*16,kids)};
  };

  /* Analogue clock. */
  KINDS.clock=(f,W,h)=>{
    const R=80, cx=W/2, cy=90, kids=[], hr=(f.h||12)%12, mn=f.m||0;
    kids.push(h("circle",{key:"f",cx,cy,r:R,fill:"rgba(var(--line-rgb,255,255,255),.04)",stroke:INK,strokeWidth:2}));
    for(let i=0;i<60;i++){ const a=i*6*Math.PI/180, big=i%5===0; kids.push(h("line",{key:"t"+i,x1:cx+(R-(big?12:6))*Math.sin(a),y1:cy-(R-(big?12:6))*Math.cos(a),x2:cx+(R-2)*Math.sin(a),y2:cy-(R-2)*Math.cos(a),stroke:INK,opacity:big?.9:.4,strokeWidth:big?2:1})); }
    for(let i=1;i<=12;i++){ const a=i*30*Math.PI/180; kids.push(txt(h,cx+(R-24)*Math.sin(a),cy-(R-24)*Math.cos(a),String(i),{fontFamily:MONO,fontSize:12})); }
    const ha=(hr+mn/60)*30*Math.PI/180, ma=mn*6*Math.PI/180;
    kids.push(h("line",{key:"hh",x1:cx,y1:cy,x2:cx+R*.5*Math.sin(ha),y2:cy-R*.5*Math.cos(ha),stroke:SKY,strokeWidth:5,strokeLinecap:"round"}));
    kids.push(h("line",{key:"mh",x1:cx,y1:cy,x2:cx+R*.75*Math.sin(ma),y2:cy-R*.75*Math.cos(ma),stroke:PINK,strokeWidth:3,strokeLinecap:"round"}));
    kids.push(h("circle",{key:"c",cx,cy,r:4,fill:INK}));
    if(f.l) kids.push(txt(h,cx,cy+R+18,f.l,{fontFamily:MONO,fontSize:14,fill:AMBER}));
    return {el:svg(h,W,cy+R+30,kids)};
  };

  window.__CURR = window.__CURR || {};
  window.__CURR.FIGURES = {render, kinds:Object.keys(KINDS)};
})();
