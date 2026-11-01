// pen — assembled in src/build.json order; shared classic-script scope.

// @part part-01
// Linien liegen auf den Schnittpunkten des 5-mm-Rasters.
let corner = null,
  cornerTimer = null,
  armed = false,
  drag = null,
  suppressContextUntil = 0;

function resetCorner() {
  clearTimeout(cornerTimer);
  cornerTimer = null;
  corner = null;
  armed = false;
  drag = null
}

// @part part-02
/*
 * STIFTLINIEN
 * Kollineare Strecken werden auf die gewünschte Zeichenrichtung projiziert.
 * Ist die ganze angeforderte Strecke bedeckt, wird sie entfernt; sonst werden nur Lücken ergänzt.
 */
function toggleLineCoverage(lines, start, end, color) {
  const a = start,
    b = end,
    dx = b[0] - a[0],
    dy = b[1] - a[1],
    length = Math.hypot(dx, dy),
    eps = 1e-7;
  if (length < eps) return lines.map(line => [...line]);
  const ux = dx / length,
    uy = dy / length;
  const point = t => [a[0] + ux * t, a[1] + uy * t],
    project = (x, y) => (x - a[0]) * ux + (y - a[1]) * uy,
    matches = [],
    others = [];
  for (const line of lines) {
    if (Math.abs((line[0] - a[0]) * uy - (line[1] - a[1]) * ux) < eps && Math.abs((line[2] - a[0]) * uy - (
        line[3] - a[1]) * ux) < eps) {
      const ts = [project(line[0], line[1]), project(line[2], line[3])].sort((x, y) => x - y);
      matches.push({
        line,
        lo: ts[0],
        hi: ts[1]
      })
    } else others.push([...line])
  }
  const intervals = matches.map(m => [Math.max(0, m.lo), Math.min(length, m.hi)]).filter(([lo, hi]) => hi >
    lo + eps).sort((a, b) => a[0] - b[0]);
  let covered = 0;
  for (const [lo, hi] of intervals) {
    if (lo > covered + eps) break;
    covered = Math.max(covered, hi)
  }
  if (covered >= length - eps) {
    for (const m of matches) {
      if (m.hi <= eps || m.lo >= length - eps) {
        others.push([...m.line]);
        continue
      }
      if (m.lo < -eps) others.push([...point(m.lo), ...point(0), m.line[4] || color]);
      if (m.hi > length + eps) others.push([...point(length), ...point(m.hi), m.line[4] || color])
    }
    return others
  }
  const result = lines.map(line => [...line]);
  let cursor = 0;
  for (const [lo, hi] of intervals) {
    if (lo > cursor + eps) result.push([...point(cursor), ...point(lo), color]);
    cursor = Math.max(cursor, hi)
  }
  if (cursor < length - eps) result.push([...point(cursor), ...point(length), color]);
  return result;
}

function snappedEnd(start, point, orthogonal = false) {
  const [x, y] = paperGridPoint(point);
  if (!orthogonal && paperTypeAt() === 'millimeter') return [x, y];
  return Math.abs(x - start[0]) >= Math.abs(y - start[1]) ? [x, start[1]] : [start[0], y]
}
$('paper').addEventListener('pointermove', e => {
  if (tool !== 'pen' || geo.visible) return;
  const point = paperPoint(e);
  if (drag) {
    drag.end = snappedEnd(drag.start, point);
    renderLines();
    return
  }
  if (e.buttons) {
    resetCorner();
    renderLines();
    return
  }
  const next = paperGridPoint(point);
  // Relative to a 5-mm cell: its visible hit area scales with page AND browser zoom.
  const cornerDistance = Math.hypot((point[0] - next[0] * 5) / 5, (point[1] - next[1] * 5) / 5);
  if (next[0] < 0 || next[0] > 42 || next[1] < 0 || next[1] > 59.4 || cornerDistance > .48) {
    resetCorner();
    renderLines();
    return
  }
  if (corner && corner[0] === next[0] && corner[1] === next[1]) return;
  resetCorner();
  corner = next;
  renderLines();
  cornerTimer = setTimeout(() => {
    armed = true;
    renderLines()
  }, 62.5);
});
$('paper').addEventListener('pointerdown', e => {
  if (tool !== 'pen' || geo.visible || e.button !== 2 || !armed || !corner) return;
  e.preventDefault();
  drag = {
    start: [...corner],
    end: [...corner]
  };
  clearTimeout(cornerTimer);
  suppressContextUntil = Date.now() + 1000;
  $('paper').setPointerCapture(e.pointerId);
  renderLines();
});
$('paper').addEventListener('pointerup', e => {
  if (e.button !== 2 || !drag) return;
  e.preventDefault();
  const start = drag.start,
    end = snappedEnd(start, paperPoint(e));
  suppressContextUntil = Date.now() + 1000;
  if (start[0] !== end[0] || start[1] !== end[1]) {
    checkpoint();
    doc.lines[page] = toggleLineCoverage(doc.lines[page], start, end, ink);
    changed()
  } else {
    resetCorner();
    renderLines()
  }
  if ($('paper').hasPointerCapture(e.pointerId)) $('paper').releasePointerCapture(e.pointerId);
});
document.addEventListener('contextmenu', e => e.preventDefault());
$('paper').addEventListener('pointerleave', () => {
  if (!drag) {
    resetCorner();
    renderLines()
  }
});
$('paper').addEventListener('pointercancel', () => {
  resetCorner();
  renderLines()
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    resetCorner();
    renderLines()
  }
});
