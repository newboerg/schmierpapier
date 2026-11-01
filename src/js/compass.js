// compass — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let compass = {
  active: false,
  phase: 'center',
  cx: 105,
  cy: 120,
  radius: 25,
  angle: 0,
  page: 0,
  stroke: null,
  move: null
};

// @part part-02
function groupLegacyCompassArcs(lines) {
  const adjacency = new Map(),
    eligible = [];
  const key = p => p.join(',');
  lines.forEach((line, i) => {
    const length = Math.hypot(line[2] - line[0], line[3] - line[1]);
    if (line[4] || length < .002 || length > .75) return;
    eligible.push(i);
    for (const point of [line.slice(0, 2), line.slice(2, 4)]) {
      const k = key(point);
      if (!adjacency.has(k)) adjacency.set(k, []);
      adjacency.get(k).push(i)
    }
  });
  const seen = new Set();
  for (const first of eligible) {
    if (seen.has(first)) continue;
    const component = [],
      pending = [first];
    while (pending.length) {
      const i = pending.pop();
      if (seen.has(i)) continue;
      seen.add(i);
      component.push(i);
      for (const point of [lines[i].slice(0, 2), lines[i].slice(2, 4)])
        for (const next of adjacency.get(key(point)) || [])
          if (!seen.has(next)) pending.push(next)
    }
    if (component.length < 8) continue;
    const vertices = new Map();
    for (const i of component)
      for (const point of [lines[i].slice(0, 2), lines[i].slice(2, 4)]) vertices.set(key(point), point);
    if ([...vertices.keys()].some(k => adjacency.get(k).length > 2)) continue;
    let point = [...vertices].find(([k]) => adjacency.get(k).length === 1)?.[1] || lines[first].slice(0, 2);
    const used = new Set(),
      points = [point];
    while (used.size < component.length) {
      const next = (adjacency.get(key(point)) || []).find(i => !used.has(i));
      if (next === undefined) break;
      used.add(next);
      const line = lines[next];
      point = key(line.slice(0, 2)) === key(point) ? line.slice(2, 4) : line.slice(0, 2);
      points.push(point)
    }
    if (used.size !== component.length) continue;
    let total = 0,
      signed = 0,
      maxTurn = 0;
    for (let i = 2; i < points.length; i++) {
      const a = [points[i - 1][0] - points[i - 2][0], points[i - 1][1] - points[i - 2][1]],
        b = [points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]],
        turn = Math.atan2(a[0] * b[1] - a[1] * b[0], a[0] * b[0] + a[1] * b[1]);
      total += Math.abs(turn);
      signed += turn;
      maxTurn = Math.max(maxTurn, Math.abs(turn))
    }
    if (total < .04 || maxTurn > .45 || Math.abs(signed) < total * .8) continue;
    const id = newPencilStrokeId();
    for (const i of component) lines[i].push(id);
  }
}

function newPencilStrokeId() {
  return 'arc-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 12)
}

// @part part-03
function compassPoint(angle = compass.angle) {
  return [compass.cx + compass.radius * Math.cos(angle), compass.cy + compass.radius * Math.sin(angle)]
}

function buildCompassOverlay() {
  const root = geoSvg('svg', {
    id: 'compassOverlay',
    class: 'compass-overlay',
    viewBox: '0 0 210 297',
    'aria-label': 'Zirkel: Mittelpunkt, Radius und Bleistiftspitze'
  });
  geoSvg('path', {
    'data-compass-trace': 'true',
    class: 'compass-trace'
  }, root);
  const body = geoSvg('g', {
    'data-compass-body': 'true'
  }, root);
  geoSvg('circle', {
    cx: 0,
    cy: 0,
    r: 25,
    class: 'compass-guide',
    'data-compass-circle': 'true'
  }, body);
  geoSvg('line', {
    x1: 0,
    y1: 0,
    x2: 25,
    y2: 0,
    class: 'compass-guide',
    'data-compass-radius': 'true'
  }, body);
  geoSvg('path', {
    class: 'compass-metal',
    'data-compass-leg': 'needle'
  }, body);
  geoSvg('path', {
    class: 'compass-highlight',
    'data-compass-leg': 'shine'
  }, body);
  geoSvg('path', {
    stroke: '#465761',
    'stroke-width': '2.7',
    'stroke-linecap': 'round',
    fill: 'none',
    'data-compass-leg': 'pencil-back'
  }, body);
  geoSvg('path', {
    stroke: '#dfb448',
    'stroke-width': '1.7',
    'stroke-linecap': 'round',
    fill: 'none',
    'data-compass-leg': 'pencil'
  }, body);
  geoSvg('path', {
    fill: '#c9a078',
    stroke: '#806e58',
    'stroke-width': '.15',
    'data-compass-lead': 'true'
  }, body);
  geoSvg('path', {
    stroke: '#39444b',
    'stroke-width': '.38',
    'data-compass-needle': 'true'
  }, body);
  const hinge = geoSvg('g', {
    'data-compass-hinge': 'true'
  }, body);
  geoSvg('rect', {
    x: -1.25,
    y: -10,
    width: 2.5,
    height: 7,
    rx: .8,
    fill: '#3b5362',
    stroke: '#263b46',
    'stroke-width': '.25'
  }, hinge);
  geoSvg('circle', {
    r: 3.3,
    fill: '#aebbc1',
    stroke: '#5c6f7c',
    'stroke-width': '.35'
  }, hinge);
  geoSvg('circle', {
    r: 1.4,
    fill: '#6c808d',
    stroke: '#edf4f6',
    'stroke-width': '.3'
  }, hinge);
  geoSvg('path', {
    d: 'M -.9 -.9 .9 .9',
    stroke: '#344c5a',
    'stroke-width': '.3'
  }, hinge);
  const pivot = geoSvg('circle', {
    cx: 0,
    cy: 0,
    r: 2.5,
    class: 'compass-pivot',
    'data-compass-handle': 'center'
  }, body);
  geoSvg('title', {}, pivot).textContent = 'Mittelpunkt mit links greifen und verschieben';
  geoSvg('path', {
    d: 'M -1.4 0 H 1.4 M 0 -1.4 V 1.4',
    stroke: '#ad4536',
    'stroke-width': '.25',
    'pointer-events': 'none'
  }, body);
  const tip = geoSvg('circle', {
    cx: 25,
    cy: 0,
    r: 2.3,
    class: 'compass-tip',
    'data-compass-handle': 'radius'
  }, body);
  geoSvg('title', {}, tip).textContent =
    'Mit links Radius neu wählen. Mit gedrückter rechter Maustaste Kreisbogen zeichnen.';
  $('paper').append(root);
  return root;
}

// Optionales echtes Geodreieck als mitdrehende Messhilfe, ohne Zahlenanzeige.
function hideCompassRadiusGuide() {
  if (!compass.radiusGuide) return;
  compass.radiusGuide = false;
  $('geoToggle').classList.toggle('radius-hint', compass.active && compass.phase === 'radius');
  geo.visible = false;
  geo.placing = false;
  geo.gesture = null;
  renderGeo();
}

function renderCompass() {
  $('geoToggle').classList.toggle('radius-hint',
    compass.active && compass.phase === 'radius' && !compass.radiusGuide);
  if (compass.radiusGuide) {
    if (!compass.active || compass.phase !== 'radius') hideCompassRadiusGuide();
    else {
      geo.visible = true;
      geo.keyboard = null;
      geo.placing = false;
      geo.x = compass.cx;
      geo.y = compass.cy;
      geo.angle = compass.angle * 180 / Math.PI;
      renderGeo();
    }
  }
  $('compassToggle').setAttribute('aria-pressed', String(compass.active));
  $('paper').classList.toggle('compass-mode', compass.active);
  let root = $('compassOverlay');
  if (!compass.active) {
    root?.remove();
    return
  }
  if (!root) root = buildCompassOverlay();
  const body = root.querySelector('[data-compass-body]'),
    r = Math.max(2, compass.radius),
    hx = r / 2,
    hy = -Math.min(55, Math.max(15, r * .65)),
    degrees = compass.angle * 180 / Math.PI;
  body.setAttribute('transform', `translate(${compass.cx} ${compass.cy}) rotate(${degrees})`);
  body.setAttribute('opacity', compass.phase === 'center' ? '.45' : '1');
  root.querySelector('[data-compass-leg="needle"]').setAttribute('d', `M 0 -3 L ${hx} ${hy}`);
  root.querySelector('[data-compass-leg="shine"]').setAttribute('d', `M .1 -3.2 L ${hx+.1} ${hy}`);
  for (const name of ['pencil-back', 'pencil']) root.querySelector(`[data-compass-leg="${name}"]`)
    .setAttribute('d', `M ${hx} ${hy} L ${r-.6} -3.7`);
  root.querySelector('[data-compass-lead]').setAttribute('d', `M ${r-1.8} -4 L ${r+.7} -3.5 L ${r} 0 Z`);
  root.querySelector('[data-compass-needle]').setAttribute('d', 'M 0 -3 L 0 0');
  root.querySelector('[data-compass-hinge]').setAttribute('transform', `translate(${hx} ${hy})`);
  const tip = root.querySelector('[data-compass-handle="radius"]');
  tip.setAttribute('cx', r);
  const guide = root.querySelector('[data-compass-circle]');
  guide.setAttribute('r', r);
  guide.setAttribute('visibility', compass.phase === 'radius' ? 'visible' : 'hidden');
  const radial = root.querySelector('[data-compass-radius]');
  radial.setAttribute('x2', r);
  radial.setAttribute('visibility', compass.phase === 'radius' ? 'visible' : 'hidden');
  const points = compass.keyboard?.preview || compass.stroke?.points || [];
  const trace = root.querySelector('[data-compass-trace]');
  trace.style.stroke = compass.keyboard ? '#d52d35' : '';
  trace.style.strokeDasharray = compass.keyboard ? '1 1' : '';
  root.querySelector('[data-compass-trace]').setAttribute('d', points.map((p, i) => (i ? 'L' : 'M') + p.join(
    ' ')).join(' '));
}

function finishCompassStroke(commit = true, redraw = true) {
  const stroke = compass.stroke;
  if (!stroke) return;
  compass.stroke = null;
  if (commit && stroke.points.length > 1 && doc.pencilLines[stroke.page]) {
    const added = [],
      keys = new Set(doc.pencilLines[stroke.page].map(line => {
        const a = line.slice(0, 2).join(','),
          b = line.slice(2, 4).join(',');
        return a < b ? a + '|' + b : b + '|' + a
      }));
    for (let i = 1; i < stroke.points.length; i++) {
      const clipped = clipPencilLine([...stroke.points[i - 1], ...stroke.points[i]], 0, 0, 210, 297);
      if (!clipped) continue;
      const line = clipped.line.map(n => Math.round(n * 1000) / 1000);
      if (Math.hypot(line[2] - line[0], line[3] - line[1]) < .002) continue;
      const a = line.slice(0, 2).join(','),
        b = line.slice(2, 4).join(','),
        key = a < b ? a + '|' + b : b + '|' + a;
      if (!keys.has(key)) {
        keys.add(key);
        added.push([...line, stroke.id])
      }
    }
    if (added.length) {
      checkpoint();
      doc.pencilLines[stroke.page].push(...added);
      if (redraw) changed();
      else persist()
    }
  }
  if (redraw) {
    renderLines();
    renderCompass()
  }
}

function hideCompass(commit = true, redraw = true) {
  hideCompassRadiusGuide();
  if (!compass.active) return;
  finishCompassStroke(commit, false);
  compass.active = false;
  compass.keyboard = null;
  $('geoToggle').classList.remove('radius-hint');
  compass.move = null;
  $('paper').classList.remove('compass-mode');
  $('compassToggle').setAttribute('aria-pressed', 'false');
  $('compassOverlay')?.remove();
  if (redraw) renderLines()
}

function toggleCompass() {
  if (compass.active) {
    hideCompass();
    return
  }
  finishNumberLabels();
  finishMark();
  cancelRegion();
  cancelNumberLine(false);
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
  compass = {
    active: true,
    phase: 'center',
    cx: 105,
    cy: 120,
    radius: 25,
    angle: 0,
    page,
    stroke: null,
    move: null
  };
  $('editor').blur();
  renderLines();
  renderCompass();
  status('Zirkel: Mittelpunkt mit links auf einen Rasterkreuzpunkt setzen.');
}
$('compassToggle').onclick = toggleCompass;

function beginKeyboardCompass() {
  cancelKeyboardArea();
  cancelKeyboardLine();
  cancelStrike();
  if (compass.active) hideCompass(false);
  toggleCompass();
  [compass.cx, compass.cy] = snapPaperPoint([5 + (pos % COLS) * 5, 5 + Math.floor(pos / COLS) * 5]);
  compass.keyboard = { stage: 'center', start: 0, sweep: 0, preview: [] };
  select(pos);
  renderCompass();
  keyboardCompassHint();
}

function keyboardCompassHint() {
  const hints = {
    center: 'Zirkel per Tastatur: Pfeile verschieben den Mittelpunkt · K oder Enter bestätigt · Esc beendet',
    radius: 'Zirkelradius: Links/Rechts ändern um 1 mm · K oder Enter bestätigt · Esc beendet',
    start: 'Bogenanfang: Pfeile drehen den Zirkel · K oder Enter bestätigt · Esc beendet',
    end: 'Bogenende: Pfeile ändern die gestrichelte Vorschau · K oder Enter zeichnet · Esc verwirft'
  };
  status(tr(hints[compass.keyboard.stage]));
}

function updateKeyboardCompassArc() {
  const state = compass.keyboard;
  const steps = Math.max(1, Math.ceil(Math.abs(state.sweep) * compass.radius / .65));
  state.preview = state.sweep === 0 ? [] : Array.from({ length: steps + 1 }, (_, i) =>
    compassPoint(state.start + state.sweep * i / steps));
  compass.angle = state.start + state.sweep;
}

// Registered before the other writing shortcuts: only a long K enables this workflow.
window.addEventListener('keydown', event => {
  if (!compass.active || !compass.keyboard || tutorial) return;
  if (event.key.toLowerCase() === 'g') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const state = compass.keyboard;
  if (event.key === 'Escape') { hideCompass(false); select(pos); return; }
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
  if (event.key.toLowerCase() === 'k' || event.key === 'Enter') {
    if (event.repeat) return;
    if (state.stage === 'center') {
      state.stage = 'radius'; compass.phase = 'radius';
    } else if (state.stage === 'radius') {
      state.stage = 'start'; compass.phase = 'ready'; hideCompassRadiusGuide();
    } else if (state.stage === 'start') {
      state.stage = 'end'; state.start = compass.angle; state.sweep = 0; state.preview = [];
    } else {
      if (!state.preview.length) return;
      compass.stroke = { page, id: newPencilStrokeId(), points: state.preview };
      state.preview = [];
      finishCompassStroke();
      state.stage = 'start'; state.start = compass.angle; state.sweep = 0;
    }
  } else if (event.key.startsWith('Arrow')) {
    const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
    if (state.stage === 'center') {
      const step = drawingGridStep();
      if (['ArrowLeft', 'ArrowRight'].includes(event.key)) compass.cx = Math.max(5, Math.min(205, compass.cx + direction * step));
      else compass.cy = Math.max(5, Math.min(290, compass.cy + direction * step));
    } else if (state.stage === 'radius') {
      if (['ArrowLeft', 'ArrowRight'].includes(event.key)) compass.radius = Math.max(2, Math.min(300, compass.radius + direction));
    } else if (state.stage === 'start') {
      compass.angle += direction * Math.PI / 180;
    } else {
      state.sweep = Math.max(-2 * Math.PI, Math.min(2 * Math.PI, state.sweep + direction * Math.PI / 180));
      updateKeyboardCompassArc();
    }
  }
  renderCompass();
  keyboardCompassHint();
}, true);

function compassAngleAt(point) {
  if (Math.hypot(point[0] - compass.cx, point[1] - compass.cy) < 1.5) return compass.angle;
  return Math.atan2(point[1] - compass.cy, point[0] - compass.cx)
}

function appendCompassAngle(angle) {
  const stroke = compass.stroke;
  if (stroke) {
    const delta = Math.atan2(Math.sin(angle - compass.angle), Math.cos(angle - compass.angle)),
      steps = Math.max(1, Math.ceil(Math.abs(delta) * compass.radius / .65));
    for (let i = 1; i <= steps; i++) {
      const t = compass.angle + delta * i / steps;
      stroke.points.push(compassPoint(t))
    }
  }
  compass.angle = angle;
}
let compassClickUntil = 0;

function compassCapture(e) {
  if (!compass.active || e.target.closest?.('.axis-label-editor')) return;
  e.stopImmediatePropagation();
  if (compass.keyboard) { e.preventDefault(); return; }
  const point = paperPoint(e);
  if (e.type === 'pointerdown') {
    e.preventDefault();
    compassClickUntil = Date.now() + 400;
    if (compass.phase === 'center') {
      if (e.button !== 0) {
        status('Zuerst mit links den Mittelpunkt setzen.');
        return
      } [compass.cx, compass.cy] = snapPaperPoint(point);
      compass.phase = 'radius';
      renderCompass();
      status('Zirkel: Radius durch einen zweiten Linksklick wählen.');
      return
    }
    if (compass.phase === 'radius') {
      if (e.button !== 0) return;
      const distance = Math.hypot(point[0] - compass.cx, point[1] - compass.cy);
      if (distance < 2) {
        status('Wähle einen Radius von mindestens 2 mm.');
        return
      }
      compass.radius = distance;
      compass.angle = Math.atan2(point[1] - compass.cy, point[0] - compass.cx);
      compass.phase = 'ready';
      renderCompass();
      status(
        'Zirkel bereit: Maus um den Mittelpunkt bewegen. Rechte Maustaste halten zum Zeichnen, loslassen für eine Pause.'
        );
      return
    }
    if (e.button === 2) {
      compass.angle = compassAngleAt(point);
      compass.stroke = {
        page,
        id: newPencilStrokeId(),
        points: [compassPoint()]
      };
      $('paper').setPointerCapture(e.pointerId);
      renderCompass();
      return
    }
    if (e.button === 0) {
      const tip = compassPoint();
      if (Math.hypot(point[0] - compass.cx, point[1] - compass.cy) <= 3) {
        compass.move = {
          offset: [point[0] - compass.cx, point[1] - compass.cy]
        };
        $('paper').setPointerCapture(e.pointerId)
      } else if (Math.hypot(point[0] - tip[0], point[1] - tip[1]) <= 4) {
        compass.phase = 'radius';
        status('Zirkel: neuen Radius mit einem Linksklick festlegen.')
      } else status(
        'Mit rechts ziehen zum Zeichnen. Mittelpunkt mit links greifen zum Versetzen; Zirkelspitze mit links für einen neuen Radius.'
        );
      renderCompass();
      return
    }
  }
  if (e.type === 'pointermove') {
    if (compass.phase === 'center') {
      [compass.cx, compass.cy] = snapPaperPoint(point)
    } else if (compass.phase === 'radius') {
      compass.radius = Math.max(2, Math.hypot(point[0] - compass.cx, point[1] - compass.cy));
      compass.angle = Math.atan2(point[1] - compass.cy, point[0] - compass.cx)
    } else if (compass.move) {
      [compass.cx, compass.cy] = snapPaperPoint([point[0] - compass.move.offset[0], point[1] - compass.move
        .offset[1]
      ])
    } else {
      if (compass.stroke && !(e.buttons & 2)) finishCompassStroke();
      appendCompassAngle(compassAngleAt(point))
    }
    renderCompass();
    return;
  }
  if (e.type === 'pointerup') {
    e.preventDefault();
    if (e.button === 2 && compass.stroke) {
      appendCompassAngle(compassAngleAt(point));
      finishCompassStroke()
    }
    if (e.button === 0) compass.move = null;
    if ($('paper').hasPointerCapture(e.pointerId)) $('paper').releasePointerCapture(e.pointerId);
    renderCompass();
  }
}
for (const type of ['pointerdown', 'pointermove', 'pointerup']) $('paper').addEventListener(type,
  compassCapture, true);
$('paper').addEventListener('click', e => {
  if (compass.active || Date.now() < compassClickUntil) {
    e.preventDefault();
    e.stopImmediatePropagation()
  }
}, true);
$('paper').addEventListener('pointercancel', () => {
  if (compass.stroke) finishCompassStroke();
  compass.move = null
}, true);
window.addEventListener('blur', () => {
  finishCompassStroke();
  compass.move = null
});
window.addEventListener('keydown', e => {
  if (!compass.active || e.key !== 'Escape') return;
  e.preventDefault();
  e.stopImmediatePropagation();
  if (compass.stroke) {
    finishCompassStroke(false);
    status('Aktuellen Kreisbogen abgebrochen. Der Zirkel bleibt bereit.')
  } else hideCompass()
}, true);

// Feature action called by the shared keyboard dispatcher.
function holdCompass(code) {
  beginKeyboardCompass();
}
