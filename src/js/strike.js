// strike — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/* Durchstreichen: erst nach der fertigen Auswahl einen farbigen Strich speichern.
 * Das bestehende freie Strichformat unterstützt Export, Radierer und Bereichskopien.
 */
const strikeTool = { active: false, selection: null, pointer: null, page: null };

function cancelStrike() {
  strikeTool.active = false;
  strikeTool.selection = null;
  if (strikeTool.pointer !== null && $('paper').hasPointerCapture(strikeTool.pointer)) {
    $('paper').releasePointerCapture(strikeTool.pointer);
  }
  strikeTool.pointer = null;
  $('strikeToggle').setAttribute('aria-pressed', 'false');
  $('paper').classList.remove('strike-mode');
  document.querySelector('.strike-selection')?.remove();
}

function drawStrikeSelection() {
  document.querySelector('.strike-selection')?.remove();
  if (!strikeTool.selection) return;
  const r = strikeTool.selection;
  const box = document.createElement('div');
  box.className = 'strike-selection';
  Object.assign(box.style, {
    left: (5 + r.x * 5) + 'mm', top: (5 + r.y * 5) + 'mm',
    width: r.w * 5 + 'mm', height: r.h * 5 + 'mm'
  });
  $('paper').append(box);
}

function initialiseStrike() {
  $('strikeToggle').onclick = () => {
    if (strikeTool.active) { cancelStrike(); return; }
    finishMark();
    cancelRegion();
    cancelNumberLine(false);
    hideCompass();
    geo.visible = false;
    geo.placing = false;
    geo.gesture = null;
    resetCorner();
    strikeTool.active = true;
    strikeTool.page = page;
    $('strikeToggle').setAttribute('aria-pressed', 'true');
    $('paper').classList.add('strike-mode');
    renderLines();
    status('Durchstreichen: Bereich mit links aufziehen · Esc bricht ab');
  };
  // Capture before paper tools, leaving the rest of the interface accessible.
  for (const type of ['pointerdown', 'pointermove', 'pointerup', 'pointercancel']) {
    window.addEventListener(type, event => {
      if (!strikeTool.active) return;
      if (strikeTool.page !== page) { cancelStrike(); return; }
      if (event.type === 'pointerdown') {
        if (!event.target.closest?.('#paper')) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        if (event.button !== 0) return;
        const point = markerPoint(event);
        if (!point) return;
        strikeTool.start = point;
        strikeTool.selection = regionRect(point, point);
        strikeTool.pointer = event.pointerId;
        $('paper').setPointerCapture(event.pointerId);
        drawStrikeSelection();
        return;
      }
      if (strikeTool.pointer !== event.pointerId) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.type === 'pointercancel') { cancelStrike(); return; }
      const point = markerPoint(event);
      if (point) strikeTool.selection = regionRect(strikeTool.start, point);
      drawStrikeSelection();
      if (event.type !== 'pointerup') return;
      const r = strikeTool.selection;
      checkpoint();
      doc.freehand[page].push({ color: ink, width: .35, points: [
        [5 + r.x * 5 + .4, 5 + (r.y + r.h) * 5 - .4],
        [5 + (r.x + r.w) * 5 - .4, 5 + r.y * 5 + .4]
      ] });
      cancelStrike();
      changed();
      select(pos);
    }, { capture: true, passive: false });
  }
  window.addEventListener('keydown', event => {
    if (!strikeTool.active || event.key !== 'Escape' || keyboardArea?.mode === 'strike') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    cancelStrike();
    status('Durchstreichen abgebrochen');
  }, true);
  // Changing tools or pages discards a still unfinished selection.
  document.querySelector('header').addEventListener('click', event => {
    if (strikeTool.active && !event.target.closest('#strikeToggle') &&
        event.target.closest('button,select')) cancelStrike();
  }, true);
  window.addEventListener('blur', () => { if (strikeTool.active) cancelStrike(); });
}
