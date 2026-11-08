// regions — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * BEREICHE KOPIEREN UND VERSCHIEBEN
 * Quelle und Ziel werden erst beim Einfügen geändert. So sind Abbruch und überlappende Ziele möglich.
 */
// Ein Bereich wird erst beim Einfügen verändert, damit Esc nichts verwirft.
let region = null,
  regionClickUntil = 0;
const REGION_FIELDS = ['pages', 'inks', 'highlights', 'carries', 'powers', 'decimalMarks'];

function regionRect(a, b) {
  return {
    x: Math.min(a[0], b[0]),
    y: Math.min(a[1], b[1]),
    w: Math.abs(a[0] - b[0]) + 1,
    h: Math.abs(a[1] - b[1]) + 1
  }
}

function inRegion(index, r) {
  const x = index % COLS,
    y = Math.floor(index / COLS);
  return x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h
}

function renderRegion() {
  document.querySelectorAll('.region-box').forEach(el => el.remove());
  if (!region) return;

  function box(r, target = false) {
    const el = document.createElement('div');
    el.className = 'region-box' + (target ? ' target' : '');
    Object.assign(el.style, {
      left: (5 + r.x * 5) + 'mm',
      top: (5 + r.y * 5) + 'mm',
      width: r.w * 5 + 'mm',
      height: r.h * 5 + 'mm'
    });
    $('paper').append(el)
  }
  if (region.rect && page === region.sourcePage) box(region.rect);
  if (region.phase === 'place' && region.target) box({
    ...region.target,
    w: region.rect.w,
    h: region.rect.h
  }, true);
}

function cancelRegion() {
  if (keyboardArea && keyboardArea.mode !== 'erase') {
    keyboardArea = null; document.querySelector('.keyboard-area')?.remove();
  }
  region = null;
  $('paper').classList.remove('region-mode');
  $('cutRegion').setAttribute('aria-pressed', 'false');
  $('copyRegion').setAttribute('aria-pressed', 'false');
  renderRegion()
}

function startRegion(mode) {
  hideCompass();
  cancelNumberLine(false);
  finishMark();
  resetCorner();
  renderLines();
  if (region?.mode === mode) {
    cancelRegion();
    return
  }
  cancelRegion();
  region = {
    mode,
    phase: 'select',
    sourcePage: page
  };
  $('paper').classList.add('region-mode');
  $(mode === 'cut' ? 'cutRegion' : 'copyRegion').setAttribute('aria-pressed', 'true');
  $('editor').blur();
  status('Bereich mit gedrückter linker Maustaste aufziehen · Esc bricht ab')
}
$('cutRegion').onclick = () => startRegion('cut');
$('copyRegion').onclick = () => startRegion('copy');

function splitRegionLines(lines, r) {
  const split = splitPencilRegion(lines.map(line => [...line.slice(0, 4).map(n => n * 5), line[4] || '#172e65', ...line.slice(5)]), r),
    convert = line => [...line.slice(0, 4).map(n => n / 5), ...line.slice(4)];
  return {
    inside: split.inside.map(convert),
    outside: split.outside.map(convert)
  }
}

function snapshotRegion(sourcePage, r) {
  const data = {};
  for (const field of REGION_FIELDS) {
    data[field] = {};
    for (const [k, v] of Object.entries(doc[field][sourcePage]))
      if (inRegion(+k, r)) data[field][k] = JSON.parse(JSON.stringify(v))
  }
  data.constructionPoints = (doc.constructionPoints?.[sourcePage] || []).filter(point => constructionPointInRegion(point, r)).map(point => ({ ...point }));
  data.images = (doc.images?.[sourcePage] || []).filter(image => imageWithinRect(image, r)).map(image => ({ ...image }));
  data.taskLabels = Object.fromEntries(Object.entries(doc.taskLabels[sourcePage]).filter(([key, label]) =>
    inRegion(+key, r) && inRegion(+key + 1 + (label.height - 1) * COLS, r)).map(([key, label]) => [key, { ...label }]));
  data.fractionEquals = Object.fromEntries(Object.entries(doc.fractionEquals[sourcePage]).filter(([k]) =>
    inRegion(+k, r) && inRegion(+k + COLS, r)));
  data.tallBrackets = doc.tallBrackets[sourcePage].filter(b => inRegion(b.upper, r) && inRegion(bracketLastIndex(b), r)).map(b => ({
    ...b
  }));
  data.lines = splitRegionLines(doc.lines[sourcePage], r).inside;
  data.pencilLines = splitPencilRegion(doc.pencilLines[sourcePage], r).inside;
  data.freehand = splitFreehandRegion(doc.freehand[sourcePage], r).inside;
  data.numberLines = doc.numberLines[sourcePage].filter(axis => numberLineInRegion(axis, r)).map(axis => [...
    axis.slice(0, 5), {
      ...axis[5]
    }, ...axis.slice(6)
  ]);
  return data;
}

function eraseRegion(targetPage, r) {
  if (doc.constructionPoints) doc.constructionPoints[targetPage] = doc.constructionPoints[targetPage].filter(point => !constructionPointInRegion(point, r));
  if (doc.images) doc.images[targetPage] = doc.images[targetPage].filter(image => !imageWithinRect(image, r));
  for (const field of REGION_FIELDS)
    for (const key of Object.keys(doc[field][targetPage]))
      if (inRegion(+key, r)) delete doc[field][targetPage][key];
  for (const [key, label] of Object.entries(doc.taskLabels[targetPage]))
    if (inRegion(+key, r) && inRegion(+key + 1 + (label.height - 1) * COLS, r)) delete doc.taskLabels[targetPage][key];
  for (const key of Object.keys(doc.fractionEquals[targetPage]))
    if (inRegion(+key, r) && inRegion(+key + COLS, r)) delete doc.fractionEquals[targetPage][key];
  doc.tallBrackets[targetPage] = doc.tallBrackets[targetPage].filter(b => !(inRegion(b.upper, r) && inRegion(bracketLastIndex(b), r)));
  doc.lines[targetPage] = splitRegionLines(doc.lines[targetPage], r).outside;
  doc.pencilLines[targetPage] = splitPencilRegion(doc.pencilLines[targetPage], r).outside;
  doc.freehand[targetPage] = splitFreehandRegion(doc.freehand[targetPage], r).outside;
  doc.numberLines[targetPage] = doc.numberLines[targetPage].filter(axis => !numberLineInRegion(axis, r));
}

function pasteRegion(point) {
  const r = region.rect,
    target = {
      x: point[0],
      y: point[1],
      w: r.w,
      h: r.h
    };
  if (target.x + target.w > COLS || target.y + target.h > ROWS) {
    status('Der Bereich passt hier nicht vollständig auf das Blatt. Bitte ein anderes Ziel wählen.');
    return
  }
  checkpoint();
  const data = region.data,
    dx = target.x - r.x,
    dy = target.y - r.y,
    offset = dy * COLS + dx;
  if (region.mode === 'cut') eraseRegion(region.sourcePage, r);
  eraseRegion(page, target);
  for (const field of REGION_FIELDS)
    for (const [k, v] of Object.entries(data[field])) doc[field][page][+k + offset] = JSON.parse(JSON
      .stringify(v));
  doc.constructionPoints ??= doc.pages.map(() => []);
  doc.constructionPoints[page].push(...(data.constructionPoints || []).map(point => ({ ...point, x: point.x + dx * 5, y: point.y + dy * 5 })));
  doc.images ??= doc.pages.map(() => []);
  doc.images[page].push(...(data.images || []).map(image => ({ ...image, x: image.x + dx, y: image.y + dy })));
  for (const [k, v] of Object.entries(data.taskLabels)) doc.taskLabels[page][+k + offset] = { ...v };
  for (const [k, v] of Object.entries(data.fractionEquals)) doc.fractionEquals[page][+k + offset] = v;
  doc.tallBrackets[page].push(...data.tallBrackets.map(b => ({
    ...b,
    upper: b.upper + offset
  })));
  doc.lines[page].push(...data.lines.map(([x1, y1, x2, y2, color, ...style]) => [x1 + dx, y1 + dy, x2 + dx, y2 + dy,
    color, ...style
  ]));
  doc.lines[page] = toggleLineCoverage(doc.lines[page], [0, 0], [0, 0], ink);
  doc.freehand[page].push(...data.freehand.map(stroke => ({
    ...stroke, points: stroke.points.map(([x, y]) => [x + dx * 5, y + dy * 5])
  })));
  const copiedStrokes = new Map();
  doc.pencilLines[page].push(...data.pencilLines.map(([x1, y1, x2, y2, stroke, dashed]) => {
    const line = [x1 + dx * 5, y1 + dy * 5, x2 + dx * 5, y2 + dy * 5];
    if (stroke) {
      if (!copiedStrokes.has(stroke)) copiedStrokes.set(stroke, newPencilStrokeId());
      line.push(copiedStrokes.get(stroke))
    }
    if (dashed === true) { if (!stroke) line.push(''); line.push(true); }
    return line
  }));
  doc.numberLines[page].push(...data.numberLines.map(([x1, y1, x2, y2, color, labels, ...style]) => [x1 + dx, y1 + dy,
    x2 + dx, y2 + dy, color, {
      ...labels
    }, ...style
  ]));
  const moved = region.mode === 'cut';
  pos = target.y * COLS + target.x;
  cancelRegion();
  changed();
  select(pos);
  status(moved ? 'Bereich verschoben' : 'Bereich kopiert');
}
$('paper').addEventListener('pointerdown', e => {
  if (!region) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.button !== 0) return;
  const point = markerPoint(e);
  if (!point) return;
  regionClickUntil = Date.now() + 500;
  if (region.phase === 'place') {
    pasteRegion(point);
    return
  }
  region.sourcePage = page;
  region.start = point;
  region.rect = regionRect(point, point);
  region.dragging = true;
  $('paper').setPointerCapture(e.pointerId);
  renderRegion()
}, true);
$('paper').addEventListener('pointermove', e => {
  if (!region) return;
  e.stopImmediatePropagation();
  const point = markerPoint(e);
  if (!point) return;
  if (region.dragging) region.rect = regionRect(region.start, point);
  else if (region.phase === 'place') region.target = {
    x: point[0],
    y: point[1]
  };
  renderRegion()
}, true);
$('paper').addEventListener('pointerup', e => {
  if (!region) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (!region.dragging || e.button !== 0) return;
  const point = markerPoint(e);
  if (point) region.rect = regionRect(region.start, point);
  region.dragging = false;
  region.phase = 'place';
  region.data = snapshotRegion(region.sourcePage, region.rect);
  if ($('paper').hasPointerCapture(e.pointerId)) $('paper').releasePointerCapture(e.pointerId);
  renderRegion();
  status('Bereich markiert. Ziel für die linke obere Ecke anklicken · Esc bricht ab')
}, true);
$('paper').addEventListener('click', e => {
  if (region || Date.now() < regionClickUntil) {
    e.preventDefault();
    e.stopImmediatePropagation()
  }
}, true);
$('paper').addEventListener('pointercancel', () => {
  if (region) cancelRegion()
}, true);
document.addEventListener('keydown', e => {
  if (!region) return;
  if (e.key === 'Escape') {
    e.preventDefault();
    cancelRegion();
    status('Bereichsauswahl abgebrochen')
  } else if (e.target === $('editor')) {
    e.preventDefault();
    e.stopImmediatePropagation()
  }
}, true);

// @part part-02
function renderKeyboardArea() {
  document.querySelector('.keyboard-area')?.remove();
  if (!keyboardArea || keyboardArea.phase !== 'select') return;
  const r = regionRect(keyboardArea.anchor, keyboardArea.cursor);
  const box = document.createElement('div');
  box.className = 'keyboard-area';
  Object.assign(box.style, {
    left: (5 + r.x * 5) + 'mm', top: (5 + r.y * 5) + 'mm',
    width: r.w * 5 + 'mm', height: r.h * 5 + 'mm'
  });
  $('paper').append(box);
  if (keyboardArea.mode === 'strike') { strikeTool.selection = r; drawStrikeSelection(); }
  if (region?.keyboard) { region.rect = r; renderRegion(); }
}

function cancelKeyboardArea() {
  const copying = keyboardArea && ['copy', 'cut'].includes(keyboardArea.mode);
  if (keyboardArea?.mode === 'strike') cancelStrike();
  keyboardArea = null;
  document.querySelector('.keyboard-area')?.remove();
  if (copying) cancelRegion();
}

function beginKeyboardArea(mode) {
  cancelKeyboardArea();
  cancelRegion(); cancelStrike(); cancelKeyboardLine();
  hideCompass(); cancelNumberLine(false); finishMark(); resetCorner();
  geo.visible = false; geo.placing = false; geo.gesture = null;
  if (mode === 'erase') {
    // Starting another erase rectangle must not toggle the active eraser off.
    if (tool !== 'eraser') document.querySelector('[data-tool="eraser"]').click();
  }
  else if (mode === 'strike') $('strikeToggle').click();
  else if (mode.startsWith('marker')) document.querySelectorAll('.swatch[data-tool="marker"]')[Number(mode.slice(-1)) - 5].click();
  else startRegion(mode);
  // A guided eraser/copy button step leads directly into its rectangle exercise.
  const step = tutorial?.steps[tutorial.index];
  const next = tutorial?.steps[tutorial.index + 1];
  if (step?.kind === 'button' && ['paint', 'regionSelect'].includes(next?.kind)) select(next.index);
  else if (['paint', 'regionSelect'].includes(step?.kind)) select(step.index);
  const point = [pos % COLS, Math.floor(pos / COLS)];
  keyboardArea = { mode, phase: 'select', anchor: point, cursor: [...point], page,
    color: mode === 'strike' ? ink : markerColor };
  if (region) { region.keyboard = true; region.start = point; region.rect = regionRect(point, point); }
  select(pos);
  renderLines(); renderKeyboardArea();
  status('Pfeiltasten markieren den Bereich · gleiche Taste oder Enter bestätigt · Esc bricht ab');
  scheduleTutorialCheck();
}

// @part part-03
function confirmKeyboardArea() {
  if (!keyboardArea) return;
  const area = keyboardArea;
  const step = tutorial?.steps[tutorial.index];
  if (area.phase === 'place') {
    if (step?.kind === 'regionPlace' && pos !== step.index) {
      tourFeedback('Gehe mit den Pfeiltasten zum gold markierten Zielkästchen.'); return;
    }
    pasteRegion([pos % COLS, Math.floor(pos / COLS)]);
    scheduleTutorialCheck();
    return;
  }
  const r = regionRect(area.anchor, area.cursor);
  if (step && ['paint', 'regionSelect'].includes(step.kind) &&
      (r.x !== step.index % COLS || r.y !== Math.floor(step.index / COLS) || r.w !== (step.w || 1) || r.h !== (step.h || 1))) {
    tourFeedback('Markiere genau den gold hervorgehobenen Bereich mit den Pfeiltasten.'); return;
  }
  if (area.mode === 'erase') { eraseKeyboardRectangle(r); scheduleTutorialCheck(); return; }
  if (area.mode === 'strike' || area.mode.startsWith('marker')) {
    checkpoint();
    if (area.mode === 'strike') doc.freehand[page].push({ color: area.color, width: .35, points: [
      [5 + r.x * 5 + .4, 5 + (r.y + r.h) * 5 - .4],
      [5 + (r.x + r.w) * 5 - .4, 5 + r.y * 5 + .4]
    ] });
    else for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) {
      doc.highlights[page][y * COLS + x] = area.color;
    }
    cancelKeyboardArea(); changed(); select(pos); return;
  }
  region.rect = r;
  region.sourcePage = page;
  region.data = snapshotRegion(page, r);
  region.phase = 'place';
  region.dragging = false;
  area.phase = 'place';
  select(r.y * COLS + r.x, true, true);
  region.target = { x: r.x, y: r.y };
  document.querySelector('.keyboard-area')?.remove(); renderRegion();
  status('Ziel mit Pfeiltasten wählen · Enter oder gleiche Taste fügt ein · Esc bricht ab');
  scheduleTutorialCheck();
}

// Feature action called by the shared keyboard dispatcher.
function holdPaintRegion(code) {
  const mode = code === 'KeyS' ? 'strike' : 'marker' + code.slice(-1);
  if (keyboardArea?.mode === mode) confirmKeyboardArea();
  else beginKeyboardArea(mode);
}

// Feature action called by the shared keyboard dispatcher.
function holdEditRegion(code) {
  const mode = { KeyR: 'erase', KeyX: 'cut', KeyC: 'copy' }[code];
  if (keyboardArea?.mode === mode) confirmKeyboardArea();
  else beginKeyboardArea(mode);
}
