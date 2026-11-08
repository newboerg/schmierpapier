// Construction marks in physical millimetres, independent of character cells.
// @part part-01
let constructionPointTool = null;
function validateConstructionPoints(data) {
  return data.pages.map((_,index) => {
    const points = data.constructionPoints?.[index] ?? [];
    if (!Array.isArray(points) || points.length > 10000) throw Error('Ungültige Konstruktionspunkte.');
    const occupied = new Set();
    return points.map(point => {
      if (!point || !Number.isFinite(point.x) || !Number.isFinite(point.y) || point.x < 0 || point.x > 210 ||
          point.y < 0 || point.y > 297 || typeof point.label !== 'string' || Array.from(point.label).length > 40 ||
          /[\u0000-\u001f\u007f]/.test(point.label) || !INKS.includes(point.color)) throw Error('Ungültige Konstruktionspunkte.');
      const key = point.x + ',' + point.y;
      if (occupied.has(key)) throw Error('Ungültige Konstruktionspunkte.');
      occupied.add(key);
      return {x:point.x,y:point.y,label:point.label,color:point.color};
    });
  });
}
function constructionPointInRegion(point, r) {
  return point.x >= (r.x+1)*5-1e-7 && point.x <= (r.x+r.w+1)*5+1e-7 &&
    point.y >= (r.y+1)*5-1e-7 && point.y <= (r.y+r.h+1)*5+1e-7;
}
function constructionLabelPosition(point) {
  const left = point.x > 105;
  return {x:point.x + (left ? -1.7 : 1.7),y:point.y < 5 ? point.y+3.8 : point.y-1.7,anchor:left?'end':'start',maxWidth:left?point.x-2.7:207.3-point.x};
}
function cancelConstructionPoint(focus = true) {
  if (!constructionPointTool) return;
  constructionPointTool = null;
  $('constructionPoint').setAttribute('aria-pressed','false');
  $('paper').classList.remove('construction-point-mode');
  $('paper').querySelectorAll('.construction-point-preview').forEach(node => node.remove());
  if (focus) select(pos);
}
function toggleConstructionPoint() {
  if (tutorial || document.querySelector('dialog[open]')) return;
  finishActionHold('KeyH');
  if (constructionPointTool) { cancelConstructionPoint(); return; }
  cancelImageSession(false); cancelKeyboardArea(); cancelKeyboardLine(); cancelRegion(); cancelStrike();
  finishMark(); hideCompass(); cancelNumberLine(false); resetCorner();
  geo.visible = false; geo.placing = false; geo.gesture = null;
  // Select the last writing pen before entering the point-placement mode.
  document.querySelector('.swatch[data-tool="pen"][data-color="'+ink+'"]').click();
  constructionPointTool = {page,document:doc,point:[5+(pos%COLS)*5,5+Math.floor(pos/COLS)*5]};
  $('constructionPoint').setAttribute('aria-pressed','true');
  $('paper').classList.add('construction-point-mode');
  status(tr('Konstruktionspunkt: klicken oder Pfeile zum Positionieren · Enter beschriftet · Esc beendet'));
  renderLines(); select(pos);
}
async function placeConstructionPoint() {
  const session = constructionPointTool;
  if (!session || session.page !== page || session.document !== doc) return;
  const [x,y] = session.point;
  const points = doc.constructionPoints?.[page] || [];
  const existing = points.find(point => Math.hypot(point.x-x,point.y-y)<1e-7);
  const value = await requestInput(tr('Punkt beschriften (zum Beispiel A, leer lassen für einen unbeschrifteten Punkt):'),{value:existing?.label || '',maxLength:40});
  if (value === null) { select(pos); return; }
  if (Array.from(value).length>40 || /[\u0000-\u001f\u007f]/.test(value)) {
    alert(tr('Die Punktbeschriftung darf höchstens 40 Zeichen in einer Zeile enthalten.')); select(pos); return;
  }
  if (!existing && points.length>=10000) { alert(tr('Maximal 10000 Konstruktionspunkte pro Seite.')); return; }
  checkpoint();
  doc.constructionPoints ??= doc.pages.map(() => []);
  if (existing) Object.assign(existing,{label:value,color:ink});
  else doc.constructionPoints[page].push({x,y,label:value,color:ink});
  cancelConstructionPoint(false);
  changed(); select(pos);
}
function drawConstructionPoints(layer) {
  function draw(point, preview=false) {
    const group = geoSvg('g',{class:preview?'construction-point-preview':'construction-point'},layer);
    geoSvg('path',{d:`M ${point.x-1} ${point.y} H ${point.x+1} M ${point.x} ${point.y-1} V ${point.y+1}`,
      fill:'none',stroke:preview?'#d52d35':point.color,'stroke-width':.3,
      'stroke-dasharray':preview?'.5 .35':'none'},group);
    if (point.label) {
      const label=constructionLabelPosition(point);
      const text = geoSvg('text',{x:label.x,y:label.y,'text-anchor':label.anchor,'font-family':writingFont(),
        'font-size':3.4,fill:point.color},group);
      text.textContent=point.label;
      tallTextMeasure.font='3.4px '+writingFont();
      if(tallTextMeasure.measureText(point.label).width>label.maxWidth){text.setAttribute('textLength',label.maxWidth);text.setAttribute('lengthAdjust','spacingAndGlyphs');}
    }
  }
  for (const point of doc.constructionPoints?.[page] || []) draw(point);
  if (constructionPointTool?.page===page && constructionPointTool.document===doc) {
    draw({x:constructionPointTool.point[0],y:constructionPointTool.point[1],label:''},true);
  }
}
function paintConstructionPoints(context, scale, p) {
  context.save(); context.scale(scale,scale); context.setLineDash([]); context.lineWidth=.3;
  context.font='3.4px '+writingFont(); context.textBaseline='alphabetic';
  for (const point of doc.constructionPoints?.[p] || []) {
    context.strokeStyle=context.fillStyle=point.color;
    context.beginPath();context.moveTo(point.x-1,point.y);context.lineTo(point.x+1,point.y);
    context.moveTo(point.x,point.y-1);context.lineTo(point.x,point.y+1);context.stroke();
    const label=constructionLabelPosition(point);context.textAlign=label.anchor==='end'?'right':'left';
    context.fillText(point.label,label.x,label.y,label.maxWidth);
  }
  context.restore();
}
function initialiseConstructionPoints() {
  $('constructionPoint').onclick=toggleConstructionPoint;
}
// Capture before geometry and editor listeners so placement cannot also write or draw.
window.addEventListener('keydown',event => {
  if (!constructionPointTool || document.querySelector('dialog[open]')) return;
  if (event.ctrlKey || event.metaKey || event.altKey || event.key==='Tab' || event.key==='F1') return;
  if (event.key.toLowerCase()==='j') return;
  event.preventDefault();event.stopImmediatePropagation();
  if (event.key==='Escape') {cancelConstructionPoint();return;}
  if (event.key==='Enter') {if(!event.repeat)placeConstructionPoint();return;}
  if (event.key.startsWith('Arrow')) {
    const step=drawingGridStep();const p=constructionPointTool.point;
    if(event.key==='ArrowLeft')p[0]-=step;if(event.key==='ArrowRight')p[0]+=step;
    if(event.key==='ArrowUp')p[1]-=step;if(event.key==='ArrowDown')p[1]+=step;
    constructionPointTool.point=snapPaperPoint(p);renderLines();
  }
},true);
window.addEventListener('pointermove',event => {
  if (!constructionPointTool || !event.target.closest?.('#paper')) return;
  event.stopImmediatePropagation();
  constructionPointTool.point=snapPaperPoint(paperPoint(event));renderLines();
},true);
window.addEventListener('pointerdown',event => {
  if (!constructionPointTool) return;
  if (event.target.closest?.('#toolbar') && !event.target.closest('#constructionPoint,#lineStyleToggle')) {
    cancelConstructionPoint(false);return;
  }
  if (!event.target.closest?.('#paper')) return;
  event.preventDefault();event.stopImmediatePropagation();
  if(event.button===0){constructionPointTool.point=snapPaperPoint(paperPoint(event));placeConstructionPoint();}
},true);
window.addEventListener('click',event => {
  if(constructionPointTool && event.target.closest?.('#paper')){event.preventDefault();event.stopImmediatePropagation();}
},true);
