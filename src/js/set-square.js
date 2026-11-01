// set-square — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let geo = {
  visible: false,
  placing: false,
  x: 105,
  y: 120,
  angle: 0,
  gesture: null
};

// @part part-02
function buildGeoOverlay() {
  const root = geoSvg('svg', {
    id: 'geoOverlay',
    class: 'geo-overlay',
    viewBox: '0 0 210 297',
    'aria-label': 'Geodreieck: Nullpunkt verschieben, Spitzen drehen'
  });
  const group = geoSvg('g', {
    'data-geo-body': 'true'
  }, root);
  geoSvg('polygon', {
    points: '-80,0 80,0 0,-80',
    fill: '#dbedef',
    'fill-opacity': '.24',
    stroke: '#809598',
    'stroke-width': '.3',
    class: 'geo-body'
  }, group);
  geoSvg('path', {
    d: 'M -78.5 -.7 0 -78.8 78.5 -.7',
    fill: 'none',
    stroke: 'white',
    'stroke-opacity': '.7',
    'stroke-width': '.45'
  }, group);
  const marks = geoSvg('g', {
    class: 'geo-markings'
  }, group);

  function stroke(x1, y1, x2, y2, width = .12, color = '#526165') {
    geoSvg('line', {
      x1,
      y1,
      x2,
      y2,
      stroke: color,
      'stroke-width': width
    }, marks)
  }

  function label(x, y, text, size = 2.4, rotate = 0) {
    const el = geoSvg('text', {
      x,
      y,
      'font-size': size,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      transform: `rotate(${rotate} ${x} ${y})`
    }, marks);
    el.textContent = text;
    return el
  }
  // Parallelhilfslinien alle 5 mm, mit Zentimeter-Markierung.
  for (let depth = 5; depth <= 65; depth += 5) {
    const extent = 80 - depth - 4;
    stroke(-extent, -depth, extent, -depth, depth % 10 === 0 ? .14 : .09, '#6f828580');
    if (depth % 10 === 0) {
      const labelX = Math.min(22, extent - 3);
      label(-labelX, -depth, String(depth / 10), 2);
      label(labelX, -depth, String(depth / 10), 2)
    }
  }
  stroke(0, 0, 0, -76, .16);
  stroke(-40, 0, 0, -40, .11);
  stroke(40, 0, 0, -40, .11);
  // Gelber Halbkreis mit zwei gegenläufigen Winkelskalen.
  geoSvg('path', {
    d: 'M -48 0 A 48 48 0 0 1 48 0 L 43 0 A 43 43 0 0 0 -43 0 Z',
    fill: '#ffe500',
    'fill-opacity': '.78',
    stroke: 'none'
  }, marks);
  for (let degree = 0; degree <= 180; degree++) {
    const rad = degree * Math.PI / 180,
      cs = Math.cos(rad),
      sn = Math.sin(rad),
      outer = 42,
      inner = outer - (degree % 10 === 0 ? 3.6 : degree % 5 === 0 ? 2.5 : 1.3);
    stroke(inner * cs, -inner * sn, outer * cs, -outer * sn, degree % 10 === 0 ? .15 : .09);
    if (degree % 10 === 0 && degree > 0 && degree < 180) {
      label(45.4 * cs, -45.4 * sn, String(degree), degree === 90 ? 3.3 : 2.35, 90 - degree);
      label(38 * cs, -38 * sn, String(180 - degree), 2.05, 90 - degree)
    }
  }
  // Hypotenuse: symmetrische Millimeterskala mit Nullpunkt in der Mitte.
  for (let mm = 1; mm < 160; mm++) {
    const x = -80 + mm,
      tick = mm % 10 === 0 ? 4.6 : mm % 5 === 0 ? 3.1 : 1.8;
    stroke(x, 0, x, -tick, mm % 10 === 0 ? .14 : .085)
  }
  for (let cm = -7; cm <= 7; cm++) label(cm * 10, -6.3, String(Math.abs(cm)), 2.8);
  // Beide Katheten beginnen am rechten Winkel und messen entlang der Kante.
  const apex = [0, -80];
  for (const [side, tip, rotation] of [
      ['left', [-80, 0], -45],
      ['right', [80, 0], 45]
    ]) {
    const dx = tip[0] - apex[0],
      dy = tip[1] - apex[1],
      length = Math.hypot(dx, dy),
      ux = dx / length,
      uy = dy / length,
      nx = side === 'left' ? uy : -uy,
      ny = side === 'left' ? -ux : ux;
    for (let mm = 1; mm < length; mm++) {
      const x = apex[0] + ux * mm,
        y = apex[1] + uy * mm,
        tick = mm % 10 === 0 ? 4.6 : mm % 5 === 0 ? 3.1 : 1.8;
      stroke(x, y, x + nx * tick, y + ny * tick, mm % 10 === 0 ? .14 : .085)
    }
    for (let cm = 1; cm * 10 < length; cm++) {
      const inset = cm === 11 ? 1.15 : 6.6;
      const number = label(apex[0] + ux * cm * 10 + nx * inset, apex[1] + uy * cm * 10 + ny * inset, String(
        cm), cm === 11 ? 1.6 : 2.5, rotation);
      number.setAttribute('data-geo-scale', side);
      number.setAttribute('data-cm', cm)
    }
  }
  const zeroLabel = label(0, -75, '0', 2.2);
  zeroLabel.setAttribute('data-geo-scale', 'origin');
  const title = label(0, -56, 'GEODREIECK', 2.2);
  title.setAttribute('letter-spacing', '.3');
  for (let i = 0; i < 3; i++) {
    const a = GEO_VERTICES[i],
      b = GEO_VERTICES[(i + 1) % 3];
    geoSvg('line', {
      x1: a[0],
      y1: a[1],
      x2: b[0],
      y2: b[1],
      class: 'geo-edge',
      'data-geo-edge': i
    }, group)
  }
  for (let i = 0; i < 3; i++) {
    const [x, y] = GEO_VERTICES[i], handle = geoSvg('circle', {
      cx: x,
      cy: y,
      r: 3,
      class: 'geo-handle',
      'data-geo-handle': 'rotate'
    }, group);
    geoSvg('title', {}, handle).textContent = 'Spitze mit links greifen und um den Nullpunkt drehen'
  }
  const zero = geoSvg('circle', {
    cx: 0,
    cy: 0,
    r: 3.1,
    class: 'geo-handle geo-zero',
    'data-geo-handle': 'move'
  }, group);
  geoSvg('title', {}, zero).textContent =
    'Nullpunkt: mit links greifen und auf einen Rasterkreuzpunkt verschieben';
  geoSvg('path', {
    d: 'M -2 0 H 2 M 0 -2 V 2',
    stroke: '#b84632',
    'stroke-width': '.3',
    'pointer-events': 'none'
  }, group);
  geoSvg('line', {
    class: 'geo-preview',
    visibility: 'hidden',
    'data-geo-preview': 'true'
  }, root);
  $('paper').append(root);
  return root;
}

function renderGeo() {
  $('geoToggle').setAttribute('aria-pressed', String(geo.visible));
  $('paper').classList.toggle('geo-placing', geo.visible && geo.placing);
  let root = $('geoOverlay');
  if (!geo.visible) {
    root?.remove();
    return
  }
  if (!root) root = buildGeoOverlay();
  root.querySelector('[data-geo-body]').setAttribute('transform',
    `translate(${geo.x} ${geo.y}) rotate(${geo.angle})`);
  root.querySelector('[data-geo-body]').setAttribute('opacity', geo.placing ? '.55' : '1');
  const preview = root.querySelector('[data-geo-preview]'),
    gesture = geo.gesture;
  if (gesture?.kind === 'draw') {
    ['x1', 'y1', 'x2', 'y2'].forEach((key, i) => preview.setAttribute(key, [...gesture.start, ...gesture.end][
      i
    ]));
    preview.setAttribute('visibility', 'visible')
  } else preview.setAttribute('visibility', 'hidden');
  renderKeyboardGeoPencil(root);
}

function toggleGeo() {
  if (compass.active && compass.phase === 'radius') {
    if (compass.radiusGuide) hideCompassRadiusGuide();
    else {
      compass.radiusGuide = true;
      geo.gesture = null;
      renderCompass();
    }
    return;
  }
  hideCompass();
  geo.keyboard = null;
  cancelNumberLine(false);
  if (geo.visible) {
    geo.visible = false;
    geo.placing = false;
    geo.gesture = null;
    renderGeo();
    return
  }
  finishMark();
  cancelRegion();
  resetCorner();
  tool = 'pen';
  smallMode = null;
  smallFresh = false;
  $('carryMode').setAttribute('aria-pressed', 'false');
  $('powerMode').setAttribute('aria-pressed', 'false');
  $('paper').classList.remove('marking');
  document.querySelectorAll('.swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool ===
    'pen' && b.dataset.color === ink)));
  geo.visible = true;
  geo.placing = true;
  geo.gesture = null;
  renderLines();
  renderGeo();
  status(
    'Geodreieck: Nullpunkt auf einen Rasterkreuzpunkt klicken. Danach am Nullpunkt schieben oder an einer Spitze drehen.'
    );
}
$('geoToggle').onclick = toggleGeo;

function beginKeyboardGeo() {
  cancelKeyboardArea(); cancelKeyboardLine(); cancelStrike();
  geo.visible = false; geo.keyboard = null;
  toggleGeo();
  [geo.x, geo.y] = snapPaperPoint([5 + (pos % COLS) * 5, 5 + Math.floor(pos / COLS) * 5]);
  geo.angle = 0;
  geo.keyboard = { stage: 'position', edge: 0, distance: 80 };
  select(pos); renderGeo(); keyboardGeoHint();
}

function keyboardGeoPoint() {
  const state = geo.keyboard, a = GEO_VERTICES[state.edge], b = GEO_VERTICES[(state.edge + 1) % 3];
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  return geoWorld([a[0] + (b[0] - a[0]) * state.distance / length,
    a[1] + (b[1] - a[1]) * state.distance / length]);
}

function renderKeyboardGeoPencil(root) {
  root.querySelector('[data-keyboard-geo-pencil]')?.remove();
  if (!geo.keyboard) return;
  const point = ['position', 'rotate'].includes(geo.keyboard.stage) ? [geo.x, geo.y] : keyboardGeoPoint();
  const marker = geoSvg('g', { 'data-keyboard-geo-pencil': 'true',
    transform: `translate(${point[0]} ${point[1]})`, 'pointer-events': 'none' }, root);
  geoSvg('circle', { r: 2.5, fill: '#fff', stroke: '#d52d35', 'stroke-width': '.6' }, marker);
  geoSvg('path', { d: 'M0 0 L2 -7 L4 -9 L7 -6 L5 -4 Z', fill: '#ffd648', stroke: '#162840',
    'stroke-width': '.65', 'stroke-linejoin': 'round' }, marker);
  geoSvg('path', { d: 'M0 0 L2 -3 L3 -1 Z', fill: '#162840' }, marker);
}

function keyboardGeoHint() {
  const hints = {
    position: 'Geodreieck: Pfeile verschieben den Nullpunkt · G oder Enter bestätigt · Esc beendet',
    rotate: 'Geodreieck drehen: Pfeile drehen · G oder Enter bestätigt · Esc beendet',
    start: 'Geodreieck: Links/Rechts fährt den Stift · Hoch/Runter wechselt die Kante · G oder Enter setzt den Strichanfang',
    end: 'Geodreieck: Links/Rechts wählt das Strichende · G oder Enter zeichnet · Esc verwirft'
  };
  status(tr(hints[geo.keyboard.stage]));
}

window.addEventListener('keydown', event => {
  if (!geo.visible || !geo.keyboard || tutorial) return;
  event.preventDefault(); event.stopImmediatePropagation();
  const state = geo.keyboard;
  if (event.key === 'Escape') {
    geo.keyboard = null; geo.gesture = null; geo.visible = false; geo.placing = false;
    renderGeo(); select(pos); return;
  }
  if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
  if (event.key.toLowerCase() === 'g' || event.key === 'Enter') {
    if (event.repeat) return;
    if (state.stage === 'position') { state.stage = 'rotate'; geo.placing = false; }
    else if (state.stage === 'rotate') state.stage = 'start';
    else if (state.stage === 'start') {
      state.stage = 'end';
      geo.gesture = { kind: 'draw', start: keyboardGeoPoint(), end: keyboardGeoPoint() };
    } else {
      const clipped = clipPencilLine([...geo.gesture.start, ...geo.gesture.end], 0, 0, 210, 297);
      if (!clipped || Math.hypot(clipped.line[2] - clipped.line[0], clipped.line[3] - clipped.line[1]) < .3) return;
      checkpoint();
      doc.pencilLines[page] = togglePencilCoverage(doc.pencilLines[page], clipped.line.slice(0, 2),
        clipped.line.slice(2, 4)).map(line => line.map((value, i) => i < 4 ? Math.round(value * 1000) / 1000 : value));
      geo.gesture = null; state.stage = 'start'; changed();
    }
  } else if (event.key.startsWith('Arrow')) {
    const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
    if (state.stage === 'position') {
      const step = drawingGridStep();
      if (['ArrowLeft', 'ArrowRight'].includes(event.key)) geo.x = Math.max(5, Math.min(205, geo.x + direction * step));
      else geo.y = Math.max(5, Math.min(290, geo.y + direction * step));
    } else if (state.stage === 'rotate') geo.angle += direction;
    else if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      if (state.stage === 'start') { state.edge = (state.edge + direction + 3) % 3; state.distance = 0; }
    } else {
      const length = edge => Math.hypot(GEO_VERTICES[(edge + 1) % 3][0] - GEO_VERTICES[edge][0],
        GEO_VERTICES[(edge + 1) % 3][1] - GEO_VERTICES[edge][1]);
      state.distance += direction;
      if (state.stage === 'end') state.distance = Math.max(0, Math.min(length(state.edge), state.distance));
      else if (state.distance < 0) { state.edge = (state.edge + 2) % 3; state.distance += length(state.edge); }
      else if (state.distance > length(state.edge)) { state.distance -= length(state.edge); state.edge = (state.edge + 1) % 3; }
      if (state.stage === 'end') geo.gesture.end = keyboardGeoPoint();
    }
  }
  renderGeo(); keyboardGeoHint();
}, true);

function geoWorld(point) {
  const rad = geo.angle * Math.PI / 180,
    c = Math.cos(rad),
    s = Math.sin(rad);
  return [geo.x + point[0] * c - point[1] * s, geo.y + point[0] * s + point[1] * c]
}

function geoProjection(point, a, b) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1],
    t = Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / (dx * dx + dy * dy)));
  return [a[0] + dx * t, a[1] + dy * t]
}

function nearestGeoEdge(point) {
  let best = null;
  const candidates = [];
  for (let i = 0; i < 3; i++) {
    const a = geoWorld(GEO_VERTICES[i]),
      b = geoWorld(GEO_VERTICES[(i + 1) % 3]),
      projection = geoProjection(point, a, b),
      distance = Math.hypot(point[0] - projection[0], point[1] - projection[1]),
      edge = {
        a,
        b,
        projection,
        distance,
        index: i
      };
    candidates.push(edge);
    if (!best || distance < best.distance) best = edge
  }
  return {
    ...best,
    candidates: candidates.filter(edge => edge.distance <= 3 && edge.distance <= best.distance + .65)
  }
}

function resolveGeoDraw(gesture, point) {
  if (gesture.locked || Math.hypot(point[0] - gesture.startPoint[0], point[1] - gesture.startPoint[1]) < .6)
    return;
  let best = null;
  for (const edge of gesture.candidates) {
    const p = geoProjection(point, edge.a, edge.b),
      distance = Math.hypot(point[0] - p[0], point[1] - p[1]);
    if (!best || distance < best.distance) best = {
      ...edge,
      distance
    }
  }
  if (best) {
    gesture.a = best.a;
    gesture.b = best.b;
    gesture.start = geoProjection(gesture.startPoint, best.a, best.b);
    gesture.locked = true
  }
}

// @part part-03
let geoClickUntil = 0;

/*
 * GEODREIECK ZWISCHEN SEITEN BEWEGEN
 * Beim Übertritt wird die Zielseite aktiv. Der laufende Griff bleibt erhalten;
 * die Zielpapierart bestimmt die neue Rastung.
 */
function transferGeoToCompanion(e) {
  if (pageView !== '2' || !geo.visible || geo.gesture?.kind !== 'move') return false;
  const companion = document.querySelector('#spread .companion:not(.blank-page)');
  if (!companion) return false;
  const r = companion.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return false;
  const point = [(e.clientX - r.left) * 210 / r.width, (e.clientY - r.top) * 297 / r.height],
    offset = geo.gesture.offset;
  page = page % 2 === 0 ? page + 1 : page - 1;
  [geo.x, geo.y] = snapPaperPoint([point[0] - offset[0], point[1] - offset[1]]);
  geoClickUntil = Date.now() + 400;
  render();
  status('Geodreieck auf Blatt ' + (page + 1) + ' · Nullpunkt weiterziehen oder loslassen');
  return true;
}

function geoCapture(e) {
  if (!geo.visible || region || e.target.closest?.('.axis-label-editor')) return;
  if (geo.keyboard) { e.preventDefault(); e.stopImmediatePropagation(); return; }
  if ((e.type === 'pointermove' || e.type === 'pointerup') && transferGeoToCompanion(e) && e.type ===
    'pointermove') {
    e.preventDefault();
    e.stopImmediatePropagation();
    return
  }
  const point = paperPoint(e),
    handle = e.target.closest?.('[data-geo-handle]'),
    onInstrument = !!e.target.closest?.('.geo-overlay');
  if (e.type === 'pointerdown') {
    if (geo.placing) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.button !== 0) {
        status('Zuerst mit links den Nullpunkt setzen.');
        return
      } [geo.x, geo.y] = snapPaperPoint(point);
      geo.placing = false;
      geoClickUntil = Date.now() + 400;
      renderGeo();
      status(
        'Geodreieck: Nullpunkt greifen zum Schieben, Spitzen zum Drehen, rechte Maustaste an einer Kante zum Zeichnen.'
        );
      return
    }
    if (e.button === 2) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const edge = nearestGeoEdge(point);
      if (edge.distance > 3) {
        status('Zum Zeichnen mit rechts nahe an einer der drei Außenkanten beginnen.');
        return
      }
      geo.gesture = {
        kind: 'draw',
        a: edge.a,
        b: edge.b,
        start: edge.projection,
        end: edge.projection,
        startPoint: [...point],
        candidates: edge.candidates,
        locked: edge.candidates.length === 1
      }
    } else if (e.button === 0 && handle) {
      e.preventDefault();
      e.stopImmediatePropagation();
      geo.gesture = handle.dataset.geoHandle === 'move' ? {
        kind: 'move',
        offset: [point[0] - geo.x, point[1] - geo.y]
      } : {
        kind: 'rotate',
        angle: geo.angle,
        pointerAngle: Math.atan2(point[1] - geo.y, point[0] - geo.x)
      }
    } else if (onInstrument) {
      e.preventDefault();
      e.stopImmediatePropagation();
      status('Zum Verschieben den roten Nullpunkt greifen; zum Drehen eine Spitze.');
      return
    } else return;
    geoClickUntil = Date.now() + 400;
    $('paper').setPointerCapture(e.pointerId);
    renderGeo();
    return;
  }
  if (e.type === 'pointermove') {
    if (geo.placing) {
      [geo.x, geo.y] = snapPaperPoint(point);
      renderGeo();
      e.stopImmediatePropagation();
      return
    }
    const g = geo.gesture;
    if (!g) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (g.kind === 'move') {
      [geo.x, geo.y] = snapPaperPoint([point[0] - g.offset[0], point[1] - g.offset[1]])
    } else if (g.kind === 'rotate') {
      const next = Math.atan2(point[1] - geo.y, point[0] - geo.x),
        delta = Math.atan2(Math.sin(next - g.pointerAngle), Math.cos(next - g.pointerAngle)) * 180 / Math.PI;
      geo.angle = ((g.angle + delta + 180) % 360 + 360) % 360 - 180
    } else {
      resolveGeoDraw(g, point);
      g.end = geoProjection(point, g.a, g.b)
    }
    renderGeo();
    return;
  }
  if (e.type === 'pointerup' && geo.gesture) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const g = geo.gesture;
    geo.gesture = null;
    geoClickUntil = Date.now() + 400;
    if (g.kind === 'draw') {
      resolveGeoDraw(g, point);
      const end = geoProjection(point, g.a, g.b),
        clipped = clipPencilLine([...g.start, ...end], 0, 0, 210, 297);
      if (clipped && Math.hypot(clipped.line[2] - clipped.line[0], clipped.line[3] - clipped.line[1]) >= .3) {
        checkpoint();
        doc.pencilLines[page] = togglePencilCoverage(doc.pencilLines[page], clipped.line.slice(0, 2), clipped
          .line.slice(2, 4)).map(line => line.map((value, i) => i < 4 ? Math.round(value * 1000) / 1000 :
          value));
        changed()
      }
    }
    if ($('paper').hasPointerCapture(e.pointerId)) $('paper').releasePointerCapture(e.pointerId);
    renderGeo();
  }
}
for (const type of ['pointerdown', 'pointermove', 'pointerup']) $('paper').addEventListener(type, geoCapture,
  true);
$('paper').addEventListener('click', e => {
  if (geo.visible && (geo.placing || Date.now() < geoClickUntil || e.target.closest?.('.geo-overlay'))) {
    e.preventDefault();
    e.stopImmediatePropagation()
  }
}, true);
$('paper').addEventListener('pointercancel', () => {
  if (geo.gesture) {
    geo.gesture = null;
    renderGeo()
  }
}, true);
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && geo.visible) {
    if (geo.gesture) {
      geo.gesture = null;
      renderGeo()
    } else if (geo.placing) {
      geo.visible = false;
      geo.placing = false;
      renderGeo()
    }
  }
});

// Feature action called by the shared keyboard dispatcher.
function holdSetSquare(code) {
  if (compass.active && compass.phase === 'radius') toggleGeo();
  else beginKeyboardGeo();
}
