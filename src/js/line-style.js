// Drawing preference; mathematical signs and fraction bars remain solid.
// @part part-01
function dashedLines() { return settings.lineStyle === 'dashed'; }
function updateLineStyleButton() {
  $('lineStyleIcon').setAttribute('stroke-dasharray', dashedLines() ? '4 3' : 'none');
  $('lineStyleToggle').setAttribute('aria-pressed', String(dashedLines()));
  $('lineStyleToggle').setAttribute('aria-label', dashedLines() ? 'Linientyp: gestrichelt' : 'Linientyp: durchgezogen');
}
function toggleLineStyle() {
  settings.lineStyle = dashedLines() ? 'solid' : 'dashed';
  updateLineStyleButton(); saveSettings(); persist(); renderLines();
  status(tr(dashedLines() ? 'Neue Linien werden gestrichelt gezeichnet' : 'Neue Linien werden durchgezogen gezeichnet'));
}
function initialiseLineStyle() { $('lineStyleToggle').onclick = toggleLineStyle; }

// Keep each compass arc as a single path so dash spacing continues across its segments.
function paintPencilStrokes(context, scale, lines) {
  const groups = new Map();
  lines.forEach((line,index) => {
    const key = line[4] || 'single-' + index;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(line);
  });
  context.save(); context.scale(scale, scale);
  context.strokeStyle = '#555b60'; context.lineWidth = .2; context.lineCap = 'round'; context.lineJoin = 'round';
  for (const group of groups.values()) {
    context.setLineDash(group[0][5] === true ? [1.5,1] : []);
    context.beginPath(); let previous = null;
    for (const [x1,y1,x2,y2] of group) {
      if (!previous || Math.hypot(x1-previous[0],y1-previous[1])>.003) context.moveTo(x1,y1);
      context.lineTo(x2,y2); previous=[x2,y2];
    }
    context.stroke();
  }
  context.restore();
}

// Registered before geometry capture: these shortcuts also work beside the ruler/compass.
let drawingShortcutHold = null;
function finishDrawingShortcut(short = false) {
  const held = drawingShortcutHold;
  if (!held) return;
  clearTimeout(held.timer); drawingShortcutHold = null;
  if (['g','k'].includes(held.key.toLowerCase())) {
    if (short && !held.fired && document.activeElement === held.target &&
        (held.key.toLowerCase() === 'g' ? geo.keyboard : compass.keyboard)) {
      held.target.dispatchEvent(new KeyboardEvent('keydown', {key:'Enter',code:'Enter',bubbles:true,cancelable:true}));
    }
    return;
  }
  if (short && !held.fired && held.target === $('editor') && document.activeElement === held.target &&
      !constructionPointTool && !compass.active && !geo.keyboard) write(held.key);
}
window.addEventListener('keydown', event => {
  if (drawingShortcutHold && event.code !== drawingShortcutHold.code) finishDrawingShortcut(true);
  const key = event.key.toLowerCase();
  const activeInstrument = key === 'g' && (geo.visible || compass.active && compass.phase === 'radius') || key === 'k' && compass.active;
  if ((!['j','h'].includes(key) && !activeInstrument) || !event.isTrusted || event.ctrlKey || event.shiftKey || event.altKey || event.metaKey ||
      tutorial || imageSession || document.querySelector('dialog[open]')) return;
  if (event.target !== $('editor') && (event.target.matches?.('input,textarea,select') ||
      !(geo.visible || compass.active || constructionPointTool))) return;
  event.preventDefault(); event.stopImmediatePropagation();
  if (!drawingShortcutHold && !event.repeat) {
    const held = {code:event.code,key:event.key,target:event.target,fired:false};
    held.timer = setTimeout(() => {
      if (document.activeElement !== held.target) return;
      held.fired = true;
      if (['g','k'].includes(key)) swallowedInputKeys.add(held.code);
      if (key === 'g') holdSetSquare(held.code);
      else if (key === 'k') holdCompass(held.code);
      else if (key === 'j') toggleLineStyle();
      else toggleConstructionPoint();
    }, settings.holdDelay);
    drawingShortcutHold = held;
    showButtonHoldProgress(held, $({j:'lineStyleToggle',h:'constructionPoint',g:'geoToggle',k:'compassToggle'}[key]), () => drawingShortcutHold === held);
  }
},true);
window.addEventListener('keyup',event => {
  if (drawingShortcutHold?.code !== event.code) return;
  event.preventDefault();event.stopImmediatePropagation();finishDrawingShortcut(true);
},true);
window.addEventListener('blur',() => finishDrawingShortcut());
window.addEventListener('pointerdown',() => finishDrawingShortcut(),true);
document.addEventListener('focusout',event => {if(event.target===drawingShortcutHold?.target)finishDrawingShortcut();});
