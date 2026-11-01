// pen-input — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * Direkte Stifteingabe (vorerst ohne sichtbaren Modusschalter).
 * Freihandpunkte liegen in Millimetern und sind unabhängig vom Schreibkästchenraster.
 * Ein Kontakt ist ein Strich bzw. eine Radiergeste und ein gemeinsamer Undo-Schritt.
 */
let penGesture = null;
let penContactUntil = 0;

function freehandPath(points) {
  const [first, ...rest] = points;
  if (!first) return '';
  return `M ${first[0]} ${first[1]}` + (rest.length
    ? rest.map(point => ` L ${point[0]} ${point[1]}`).join('')
    : ` l .001 0`);
}

function renderFreehand() {
  let layer = $('paper').querySelector('.freehand-layer');
  if (!layer) {
    layer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    layer.setAttribute('class', 'freehand-layer');
    layer.setAttribute('viewBox', '0 0 210 297');
    layer.setAttribute('preserveAspectRatio', 'none');
    layer.setAttribute('aria-hidden', 'true');
    $('paper').append(layer);
  }
  layer.replaceChildren();
  for (const stroke of doc.freehand?.[page] || []) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', freehandPath(stroke.points));
    path.setAttribute('stroke', stroke.color);
    path.setAttribute('stroke-width', stroke.width);
    layer.append(path);
  }
}

function freehandTouches(stroke, from, to, radius) {
  const tolerance = (radius + stroke.width / 2) ** 2;
  return stroke.points.some((point, index) => segmentDistanceSquared(
    from, to, stroke.points[Math.max(0, index - 1)], point
  ) <= tolerance);
}

function eraseFreehand(pageIndex, from, to, radius = 1.2) {
  const strokes = doc.freehand?.[pageIndex] || [];
  const remaining = strokes.filter(stroke => !freehandTouches(stroke, from, to, radius));
  if (remaining.length === strokes.length) return false;
  doc.freehand[pageIndex] = remaining;
  return true;
}

function penPoint(event) {
  return paperPoint(event).map((value, axis) =>
    Math.round(Math.max(0, Math.min(axis ? 297 : 210, value)) * 1000) / 1000
  );
}

function penIsEraser(event) {
  return event.button === 5 || (event.buttons & 32) !== 0 || tool === 'eraser';
}

function startPenGesture(event) {
  const target = event.target.closest?.('.paper:not(.blank-page)');
  if (!target) return false;
  if (target.classList.contains('companion')) {
    page = page % 2 === 0 ? page + 1 : page - 1;
    render();
  }
  resetCorner();
  const point = penPoint(event);
  penGesture = {
    pointerId: event.pointerId,
    page,
    erase: penIsEraser(event),
    previous: point,
    checkpointed: false,
    stroke: null
  };
  if (!penGesture.erase) {
    checkpoint();
    penGesture.checkpointed = true;
    const stroke = { color: ink, width: .45, points: [point] };
    doc.freehand ??= doc.pages.map(() => []);
    doc.freehand[page].push(stroke);
    penGesture.stroke = stroke;
  } else {
    updatePenGesture(event);
  }
  try { $('paper').setPointerCapture(event.pointerId); } catch {}
  renderFreehand();
  return true;
}

function updatePenGesture(event) {
  const gesture = penGesture;
  if (!gesture || gesture.page !== page) return;
  let samples;
  try { samples = event.getCoalescedEvents?.(); } catch {}
  const events = samples?.length ? [...samples, event] : [event];
  for (const sample of events) {
    const point = penPoint(sample);
    if (gesture.erase) {
      const strokes = doc.freehand?.[page] || [];
      if (strokes.some(stroke => freehandTouches(stroke, gesture.previous, point, 1.2))) {
        if (!gesture.checkpointed) {
          checkpoint();
          gesture.checkpointed = true;
        }
        eraseFreehand(page, gesture.previous, point);
      }
    } else {
      const points = gesture.stroke.points;
      const last = points[points.length - 1];
      if (points.length < 50000 && Math.hypot(point[0] - last[0], point[1] - last[1]) >= .08) {
        points.push(point);
      }
    }
    gesture.previous = point;
  }
  renderFreehand();
}

function finishPenGesture() {
  if (!penGesture) return;
  const gesture = penGesture;
  penGesture = null;
  penContactUntil = Date.now() + 500;
  try {
    if ($('paper').hasPointerCapture(gesture.pointerId)) {
      $('paper').releasePointerCapture(gesture.pointerId);
    }
  } catch {}
  if (gesture.checkpointed) changed();
}

function capturePen(event) {
  // Palm contacts during/just after writing must not operate mouse-style tools.
  if (event.pointerType === 'touch' && (penGesture || Date.now() < penContactUntil)) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  if (event.pointerType !== 'pen' || tutorial || stretchBracket || $('helpDialog').open) return;
  if (event.type === 'pointerdown') {
    if (penGesture || !(event.buttons & 33) && ![0, 5].includes(event.button)) return;
    if (!startPenGesture(event)) return;
  } else {
    if (!penGesture || penGesture.pointerId !== event.pointerId) return;
    if (event.type === 'pointermove') {
      if (event.buttons === 0) {
        finishPenGesture();
      } else if (penIsEraser(event) !== penGesture.erase) {
        finishPenGesture();
        startPenGesture(event);
      } else updatePenGesture(event);
    } else {
      if (event.type === 'pointerup') updatePenGesture(event);
      finishPenGesture();
    }
  }
  penContactUntil = Date.now() + 500;
  event.preventDefault();
  event.stopImmediatePropagation();
}

for (const type of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel']) {
  window.addEventListener(type, capturePen, { capture: true, passive: false });
}
window.addEventListener('click', event => {
  if (!stretchBracket && event.pointerType === 'pen' && event.target.closest?.('.paper:not(.blank-page)')) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);
window.addEventListener('blur', finishPenGesture);
$('paper').addEventListener('lostpointercapture', finishPenGesture);

function paintFreehand(context, scale, strokes) {
  context.save();
  context.scale(scale, scale);
  context.lineCap = 'round';
  context.lineJoin = 'round';
  for (const stroke of strokes) {
    context.strokeStyle = stroke.color;
    context.lineWidth = stroke.width;
    context.stroke(new Path2D(freehandPath(stroke.points)));
  }
  context.restore();
}

// Region editing clips freehand polylines just like other drawings.
function splitFreehandRegion(strokes, rectangle) {
  const inside = [], outside = [];
  const left = (rectangle.x + 1) * 5, top = (rectangle.y + 1) * 5;
  const right = left + rectangle.w * 5, bottom = top + rectangle.h * 5;
  const contains = point => point[0] >= left && point[0] <= right && point[1] >= top && point[1] <= bottom;
  for (const stroke of strokes) {
    if (stroke.points.length === 1) {
      (contains(stroke.points[0]) ? inside : outside).push({ ...stroke, points: stroke.points.map(p => [...p]) });
      continue;
    }
    const split = splitPencilRegion(stroke.points.slice(1).map((point, index) => [
      ...stroke.points[index], ...point
    ]), rectangle);
    for (const [segments, target] of [[split.inside, inside], [split.outside, outside]]) {
      let current = null;
      for (const [x1, y1, x2, y2] of segments) {
        const last = current?.points[current.points.length - 1];
        if (!last || Math.hypot(last[0] - x1, last[1] - y1) > .001) {
          current = { ...stroke, points: [[x1, y1]] };
          target.push(current);
        }
        current.points.push([x2, y2]);
      }
    }
  }
  return { inside, outside };
}
