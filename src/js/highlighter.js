// highlighter — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * MARKIEREN UND RADIEREN
 * Textmarker bleiben an Schreibkästchen gebunden. Radieren prüft den gesamten Mausweg,
 * damit schnelle Bewegungen keine Linien überspringen. Zirkelbögen behalten ihre Strichgruppe.
 */
function styleCell(i) {
  nodes[i].style.color = doc.inks[page][i] || '#172e65';
  nodes[i].style.backgroundColor = doc.highlights[page][i] ? doc.highlights[page][i] + '80' : ''
}

// @part part-02
function markerPoint(e) {
  const [x, y] = paperPoint(e), col = Math.floor((x - 5) / 5), row = Math.floor((y - 5) / 5);
  return col >= 0 && col < COLS && row >= 0 && row < ROWS ? [col, row] : null
}

function paintTo(point) {
  if (!point) return;
  const previous = markDrag.last || point,
    dx = point[0] - previous[0],
    dy = point[1] - previous[1],
    steps = Math.max(Math.abs(dx), Math.abs(dy), 1);
  for (let i = 0; i <= steps; i++) {
    const col = Math.round(previous[0] + dx * i / steps),
      row = Math.round(previous[1] + dy * i / steps),
      index = row * COLS + col;
    if (tool === 'eraser') delete doc.highlights[page][index];
    else doc.highlights[page][index] = markerColor;
    styleCell(index)
  }
  markDrag.last = point;
  select(pos, false)
}

function finishMark() {
  if (!markDrag) return;
  markDrag = null;
  changed()
}

// @part part-03
function applyMarkerEvent(e) {
  if (tool === 'eraser') eraseLineSweep(paperPoint(e));
  paintTo(markerPoint(e))
}
$('paper').addEventListener('pointerdown', e => {
  if (tool === 'pen' || geo.visible || e.button !== 0) return;
  const point = markerPoint(e),
    mm = paperPoint(e);
  if (tool === 'eraser' ? (mm[0] < 0 || mm[0] > 210 || mm[1] < 0 || mm[1] > 297) : !point) return;
  e.preventDefault();
  checkpoint();
  markDrag = {
    last: point,
    lastPaper: mm
  };
  $('paper').setPointerCapture(e.pointerId);
  applyMarkerEvent(e)
});
$('paper').addEventListener('pointermove', e => {
  if (markDrag) {
    e.preventDefault();
    applyMarkerEvent(e)
  }
});
$('paper').addEventListener('pointerup', e => {
  if (e.button === 0 && markDrag) {
    applyMarkerEvent(e);
    finishMark();
    if ($('paper').hasPointerCapture(e.pointerId)) $('paper').releasePointerCapture(e.pointerId)
  }
});
$('paper').addEventListener('pointercancel', finishMark);
window.addEventListener('blur', finishMark);
