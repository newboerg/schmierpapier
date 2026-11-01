// number-line — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let numberLabelSession = null;
let numberLineTool = {
  active: false,
  start: null,
  end: null,
  page: 0
};

// @part part-02
/*
 * ZAHLENSTRAHL-GEOMETRIE
 * Schnittpunkte bestimmen Ursprung und Teilung. Beschriftungen bleiben händische Dokumentdaten.
 */
function numberLineShape(axis, axes = doc.numberLines[page], straight = doc.lines[page], pencil = doc
  .pencilLines[page]) {
  const [x1, y1, x2, y2] = axis, a = [x1 * 5, y1 * 5], b = [x2 * 5, y2 * 5], length = Math.hypot(b[0] - a[0],
    b[1] - a[1]);
  if (length < .01) return {
    segments: [],
    arrow: [],
    start: a,
    ticks: [],
    labels: [],
    origin: 0
  };
  const ux = (b[0] - a[0]) / length,
    uy = (b[1] - a[1]) / length,
    nx = -uy,
    ny = ux,
    segments = [
      [...a, ...b]
    ],
    marks = new Map(),
    crossings = [];
  const round = value => Math.round(value * 1000) / 1000;
  // Existing perpendicular axes and drawn straight lines can establish the origin.
  for (const other of [...axes, ...straight, ...pencil.map(line => line.slice(0, 4).map(value => value /
    5))]) {
    if (other === axis) continue;
    const horizontal = y1 === y2,
      otherHorizontal = Math.abs(other[1] - other[3]) < 1e-7,
      otherVertical = Math.abs(other[0] - other[2]) < 1e-7;
    if (horizontal ? !otherVertical : !otherHorizontal) continue;
    const cx = horizontal ? other[0] : x1,
      cy = horizontal ? y1 : other[1],
      eps = 1e-7;
    if (cx < Math.min(x1, x2) - eps || cx > Math.max(x1, x2) + eps || cy < Math.min(y1, y2) - eps || cy > Math
      .max(y1, y2) + eps || cx < Math.min(other[0], other[2]) - eps || cx > Math.max(other[0], other[2]) +
      eps || cy < Math.min(other[1], other[3]) - eps || cy > Math.max(other[1], other[3]) + eps) continue;
    const distance = round((cx * 5 - a[0]) * ux + (cy * 5 - a[1]) * uy);
    if (!crossings.includes(distance)) crossings.push(distance);
  }
  const origin = crossings[0] ?? 0;
  // Tick phase is anchored at the intersection, not at the stroke's starting point.
  for (let step = Math.ceil(-origin / 5); origin + step * 5 < length - 1.8; step++) {
    const distance = round(origin + step * 5);
    if (distance >= 0) marks.set(distance, Math.abs(step) % 2 === 0)
  }
  for (const distance of crossings) marks.set(distance, true);
  const ticks = [...marks].sort((a, b) => a[0] - b[0]).map(([distance, large]) => {
    const half = large ? 1.8 : 1,
      x = a[0] + ux * distance,
      y = a[1] + uy * distance,
      value = round((distance - origin) / 10),
      zero = Math.abs(distance - origin) < .001;
    segments.push([x - nx * half, y - ny * half, x + nx * half, y + ny * half]);
    return {
      distance,
      large,
      x,
      y,
      value,
      zero
    }
  });
  const arrow = [b, [b[0] - ux * 3 + nx * 1.3, b[1] - uy * 3 + ny * 1.3],
    [b[0] - ux * 3 - nx * 1.3, b[1] - uy * 3 - ny * 1.3]
  ];
  const labels = [];
  for (const tick of ticks) {
    if (!tick.large || tick.zero) continue;
    const text = axis[5]?.[tick.distance];
    if (text) {
      const layout = numberLabelLayout(axis, tick);
      labels.push({
        ...layout,
        text,
        distance: tick.distance
      })
    }
  }
  return {
    segments,
    arrow,
    start: a,
    ticks,
    labels,
    origin
  };
}

function numberLabelLayout(axis, tick) {
  if (axis[1] === axis[3]) return {
    x: Math.max(4, Math.min(206, tick.x)),
    y: Math.max(3, Math.min(294, tick.y + 4.2)),
    anchor: 'middle'
  };
  const left = tick.x >= 11;
  return {
    x: Math.max(3, Math.min(207, tick.x + (left ? -3.2 : 3.2))),
    y: Math.max(3, Math.min(294, tick.y)),
    anchor: left ? 'end' : 'start'
  };
}

function drawNumberLineSvg(layer, axis, preview = false) {
  const shape = numberLineShape(axis),
    group = geoSvg('g', {
      class: preview ? 'numberline-preview' : 'numberline'
    }, layer);
  for (const [x1, y1, x2, y2] of shape.segments) geoSvg('line', {
    x1,
    y1,
    x2,
    y2,
    stroke: axis[4],
    'stroke-width': '.3',
    'stroke-linecap': 'round'
  }, group);
  if (shape.arrow.length) geoSvg('polygon', {
    points: shape.arrow.map(point => point.join(',')).join(' '),
    fill: axis[4]
  }, group);
  if (preview) geoSvg('circle', {
    cx: shape.start[0],
    cy: shape.start[1],
    r: 1,
    fill: '#24644e'
  }, group);
  if (!preview)
    for (const label of shape.labels) {
      const text = geoSvg('text', {
        x: label.x,
        y: label.y,
        fill: axis[4],
        'font-size': 3.6,
        'font-family': 'OfflineHandschrift, OfflineSymbols, cursive',
        'text-anchor': label.anchor,
        'dominant-baseline': 'central',
        class: 'numberline-label',
        'data-axis-index': doc.numberLines[page].indexOf(axis),
        'data-distance': label.distance
      }, group);
      text.textContent = label.text;
      if (Array.from(label.text).length > 4) {
        text.setAttribute('textLength', '10');
        text.setAttribute('lengthAdjust', 'spacingAndGlyphs')
      }
    }
}

function numberAxesCross(a, b) {
  if ((a[1] === a[3]) === (b[1] === b[3])) return false;
  const horizontal = a[1] === a[3],
    x = horizontal ? b[0] : a[0],
    y = horizontal ? a[1] : b[1];
  return [a, b].every(line => x >= Math.min(line[0], line[2]) && x <= Math.max(line[0], line[2]) && y >= Math
    .min(line[1], line[3]) && y <= Math.max(line[1], line[3]))
}

/*
 * ZAHLENSTRAHL-WERKZEUG UND BESCHRIFTUNG
 * Ein Werkzeugdurchlauf zeichnet bis zu zwei Strahlen und merkt sich das vorherige Werkzeug.
 * Die anschließenden Eingabefelder sind temporär; nur ausdrücklich eingegebene Werte werden gespeichert.
 */
function nextNumberLabelAxis() {
  const remaining = numberLabelSession?.remaining || [];
  finishNumberLabels();
  if (remaining.length) beginNumberLabels(remaining[0], null, remaining.slice(1));
  else status(numberLineTool.active ?
    'Erster Zahlenstrahl fertig. Jetzt den zweiten zeichnen: Startpunkt anklicken.' :
    'Beschriftung beendet. Nicht eingegebene Marken bleiben leer.')
}

function numberLineInRegion(axis, r) {
  return [axis.slice(0, 2), axis.slice(2, 4)].every(([x, y]) => x >= r.x + 1 && x <= r.x + 1 + r.w && y >= r
    .y + 1 && y <= r.y + 1 + r.h)
}

function cancelNumberLine(redraw = true, restorePrevious = false) {
  const previous = numberLineTool.previous;
  numberLineTool = {
    active: false,
    start: null,
    end: null,
    page
  };
  $('numberLineToggle').setAttribute('aria-pressed', 'false');
  $('paper').classList.remove('numberline-mode');
  if (restorePrevious && previous) {
    tool = previous.tool;
    ink = previous.ink;
    markerColor = previous.markerColor;
    smallMode = previous.smallMode;
    geo = {
      ...previous.geo,
      gesture: null
    };
    compass = {
      ...previous.compass,
      stroke: null,
      move: null
    };
    $('carryMode').setAttribute('aria-pressed', String(smallMode === 'carries'));
    $('powerMode').setAttribute('aria-pressed', String(smallMode === 'powers'));
    $('paper').classList.toggle('marking', tool !== 'pen');
    document.querySelectorAll('.swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool ===
      tool && (tool === 'eraser' || b.dataset.color === (tool === 'pen' ? ink : markerColor)))));
    $('toolHint').textContent = tool === 'eraser' ? 'Radierer' : tool === 'marker' ? 'Textmarker' : 'Stift';
    renderGeo();
    renderCompass()
  }
  if (redraw) renderLines()
}

function toggleNumberLine() {
  if (numberLineTool.active) {
    finishNumberLabels();
    cancelNumberLine(true, true);
    return
  }
  finishCompassStroke();
  const previous = {
    tool,
    ink,
    markerColor,
    smallMode,
    geo: {
      ...geo
    },
    compass: {
      ...compass
    }
  };
  hideCompass();
  finishNumberLabels();
  finishMark();
  cancelRegion();
  resetCorner();
  geo.visible = false;
  geo.placing = false;
  geo.gesture = null;
  renderGeo();
  tool = 'pen';
  smallMode = null;
  $('carryMode').setAttribute('aria-pressed', 'false');
  $('powerMode').setAttribute('aria-pressed', 'false');
  $('paper').classList.remove('marking');
  document.querySelectorAll('.swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool ===
    'pen' && b.dataset.color === ink)));
  numberLineTool = {
    active: true,
    start: null,
    end: null,
    page,
    count: 0,
    previous
  };
  $('numberLineToggle').setAttribute('aria-pressed', 'true');
  $('paper').classList.add('numberline-mode');
  $('editor').blur();
  renderLines();
  status('Zahlenstrahl: Startkreuzpunkt mit links anklicken.');
}
$('numberLineToggle').onclick = toggleNumberLine;
let numberLineClickUntil = 0;

function numberLineCapture(e) {
  if (!numberLineTool.active || e.target.closest?.('.axis-label-editor')) return;
  e.stopImmediatePropagation();
  const point = paperPoint(e);
  if (e.type === 'pointermove') {
    if (numberLineTool.start) {
      numberLineTool.end = snappedEnd(numberLineTool.start, point, true);
      renderLines()
    }
    return
  }
  if (e.type !== 'pointerdown') return;
  e.preventDefault();
  numberLineClickUntil = Date.now() + 400;
  if (e.button !== 0) {
    status('Zahlenstrahl: Start und Ziel mit der linken Maustaste anklicken.');
    return
  }
  if (!numberLineTool.start) {
    numberLineTool.start = paperGridPoint(point);
    numberLineTool.end = [...numberLineTool.start];
    renderLines();
    status('Zahlenstrahl: Zielkreuzpunkt anklicken. Die Richtung rastet waagerecht oder senkrecht ein.');
    return
  }
  const end = snappedEnd(numberLineTool.start, point, true),
    start = numberLineTool.start;
  if (start[0] === end[0] && start[1] === end[1]) {
    status('Das Ziel muss mindestens ein Kästchen vom Start entfernt liegen.');
    return
  }
  commitNumberLine(start, end);
}

// Mouse and keyboard use the same insertion, crossing and label workflow.
function commitNumberLine(start, end) {
  checkpoint();
  doc.numberLines[page].push([...start, ...end, ink, {}]);
  const index = doc.numberLines[page].length - 1,
    axis = doc.numberLines[page][index],
    affected = [];
  for (let i = 0; i < index; i++)
    if (numberAxesCross(axis, doc.numberLines[page][i])) {
      doc.numberLines[page][i][5] = {};
      affected.push(i)
    } numberLineTool.count++;
  if (numberLineTool.count >= 2) cancelNumberLine(false, true);
  else {
    numberLineTool.start = null;
    numberLineTool.end = null
  }
  changed();
  beginNumberLabels(index, null, affected);
}
for (const type of ['pointerdown', 'pointermove', 'pointerup']) $('paper').addEventListener(type,
  numberLineCapture, true);
$('paper').addEventListener('click', e => {
  if ((numberLineTool.active || Date.now() < numberLineClickUntil) && !e.target.closest?.(
      '.numberline-label')) {
    e.preventDefault();
    e.stopImmediatePropagation()
  }
}, true);
window.addEventListener('keydown', e => {
  if (!numberLineTool.active || e.target.closest?.('.axis-label-editor')) return;
  if (numberLineTool.keyboard && (e.key.startsWith('Arrow') || e.code === 'KeyN')) return;
  if (e.key === 'Escape') {
    if (keyboardLine?.numberAxis) cancelKeyboardLine();
    e.preventDefault();
    e.stopImmediatePropagation();
    cancelNumberLine(true, true);
    status('Zahlenstrahl abgebrochen')
  } else if (e.target === $('editor')) {
    e.preventDefault();
    e.stopImmediatePropagation()
  }
}, true);

function finishNumberLabels(redraw = true) {
  if (!numberLabelSession) return;
  numberLabelSession = null;
  const labelEditor = document.querySelector('.axis-label-editor');
  const restoreFocus = labelEditor?.contains(document.activeElement);
  labelEditor?.remove();
  if (restoreFocus) select(pos);
  if (redraw) renderLines();
}

function saveNumberLabel(distance, value) {
  const session = numberLabelSession;
  if (!session || session.page !== page) return;
  const axis = doc.numberLines[page][session.index];
  if (!axis) return;
  const text = Array.from(value.replace(/[\u0000-\u001f\u007f]/g, '')).slice(0, 12).join('');
  axis[5] ??= {};
  if ((axis[5][distance] || '') === text) return;
  if (!session.edited.has(distance)) {
    checkpoint();
    session.edited.add(distance)
  }
  if (text) axis[5][distance] = text;
  else delete axis[5][distance];
  renderLines();
  persist();
}

function beginNumberLabels(index, firstDistance = null, remaining = []) {
  finishNumberLabels();
  const axis = doc.numberLines[page][index];
  if (!axis) return;
  const ticks = numberLineShape(axis).ticks.filter(tick => tick.large && !tick.zero).sort((a, b) => {
    if (a.value > 0 && b.value < 0) return -1;
    if (a.value < 0 && b.value > 0) return 1;
    return a.value > 0 ? a.value - b.value : b.value - a.value
  });
  if (!ticks.length) {
    if (remaining.length) beginNumberLabels(remaining[0], null, remaining.slice(1));
    else status('Dieser Zahlenstrahl hat außer dem unbeschrifteten Nullpunkt noch keine großen Marken.');
    return
  }
  numberLabelSession = {
    page,
    index,
    remaining,
    edited: new Set()
  };
  const root = document.createElement('div');
  root.className = 'axis-label-editor';
  root.setAttribute('role', 'group');
  root.setAttribute('aria-label', 'Große Teilstriche des Zahlenstrahls beschriften');
  const fields = [];
  ticks.forEach((tick, i) => {
    const layout = numberLabelLayout(axis, tick),
      input = document.createElement('input');
    input.className = 'axis-label-input';
    input.type = 'text';
    input.maxLength = 12;
    input.placeholder = '…';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.value = axis[5]?.[tick.distance] || '';
    input.dataset.side = tick.value > 0 ? 'positive' : 'negative';
    input.setAttribute('aria-label',
      `${tick.value>0?'Positive':'Negative'} Marke ${i+1} von ${ticks.length}, Zahlenstrahl ${index+1}`);
    input.title =
      'Marke händisch eintragen. Enter: speichern und weiter. Esc: restliche Marken dieses Strahls leer lassen.';
    const left = layout.anchor === 'middle' ? layout.x - 4 : layout.anchor === 'end' ? layout.x - 8 :
      layout.x;
    Object.assign(input.style, {
      left: Math.max(0, Math.min(202, left)) + 'mm',
      top: Math.max(0, Math.min(292, layout.y - 2.5)) + 'mm',
      color: axis[4],
      textAlign: layout.anchor === 'end' ? 'right' : layout.anchor === 'start' ? 'left' : 'center'
    });
    input.addEventListener('input', () => saveNumberLabel(tick.distance, input.value));
    input.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Escape') {
        e.preventDefault();
        saveNumberLabel(tick.distance, '');
        nextNumberLabelAxis();
        return
      }
      if (e.key === 'Enter' || e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        saveNumberLabel(tick.distance, input.value);
        if (i + 1 < fields.length) {
          fields[i + 1].focus({
            preventScroll: true
          });
          fields[i + 1].select()
        } else nextNumberLabelAxis()
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveFile()
      }
    });
    input.addEventListener('focus', () => {
      root.querySelectorAll('.axis-label-input').forEach(field => field.classList.toggle('current',
        field === input));
      status(
        `Zahlenstrahl ${index+1} · ${tick.value>0?'positive':'negative'} Marke ${i+1}/${ticks.length} · händisch eintragen · Enter: weiter · Esc: diesen Strahl überspringen`
        )
    });
    root.append(input);
    fields.push(input);
  });
  for (const type of ['pointerdown', 'pointerup', 'click']) root.addEventListener(type, e => e
    .stopPropagation());
  $('paper').append(root);
  const selected = Math.max(0, ticks.findIndex(t => t.distance === firstDistance));
  fields[selected].focus({
    preventScroll: true
  });
  fields[selected].select();
}
// Clicking outside ends annotation; values already entered are preserved.
window.addEventListener('pointerdown', e => {
  if (numberLabelSession && !e.target.closest?.('.axis-label-editor,#virtualKeypad,#keypadToggle')) finishNumberLabels()
}, true);
$('paper').addEventListener('click', e => {
  const label = e.target.closest?.('.numberline-label');
  if (!label || tool !== 'pen' || geo.visible || region || numberLineTool.active) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  beginNumberLabels(Number(label.dataset.axisIndex), Number(label.dataset.distance))
}, true);
$('paper').addEventListener('dblclick', e => {
  if (tool !== 'pen' || geo.visible || region || numberLineTool.active) return;
  const point = paperPoint(e);
  const index = doc.numberLines[page].findIndex(axis => pointSegmentDistanceSquared(point, [axis[0] * 5,
    axis[1] * 5
  ], [axis[2] * 5, axis[3] * 5]) <= 2.25);
  if (index >= 0) {
    e.preventDefault();
    e.stopImmediatePropagation();
    beginNumberLabels(index)
  }
}, true);

// @part part-03
function orientNumberAxis(horizontal, negative = false) {
  const x = pos % COLS + 1, y = Math.floor(pos / COLS) + 1;
  const anchor = horizontal ? x : y;
  keyboardLine = { horizontal, page, anchor, cursor: anchor,
    numberAxis: true, awaitingDirection: false,
    start: horizontal ? [negative ? x + 1 : x, y + 1] : [x, negative ? y + 1 : y],
    end: horizontal ? [negative ? x : x + 1, y + 1] : [x, negative ? y : y + 1] };
  renderLines();
}

// Feature action called by the shared keyboard dispatcher.
function holdNumberLine(code) {
  if (keyboardLine?.numberAxis) {
    if (!keyboardLine.awaitingDirection) keyboardChord(keyboardLine.horizontal);
  }
  else {
    cancelKeyboardLine();
    if (!numberLineTool.active) toggleNumberLine();
    numberLineTool.keyboard = true;
    select(pos);
    const x = pos % COLS + 1, y = Math.floor(pos / COLS) + 1;
    keyboardLine = { page, numberAxis: true, awaitingDirection: true, horizontal: null,
      start: [x, y + 1], end: [x, y + 1] };
    renderLines();
  }
}
