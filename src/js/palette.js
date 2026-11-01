// palette — assembled in src/build.json order; shared classic-script scope.

// @part part-01
document.querySelectorAll('.swatch').forEach(button => button.addEventListener('click', () => {
  hideCompass();
  finishMark();
  cancelNumberLine(false);
  tool = button.dataset.tool;
  if (tool === 'eraser' && geo.visible) {
    geo.visible = false;
    geo.placing = false;
    geo.gesture = null
  }
  if (tool === 'pen') ink = button.dataset.color;
  else if (tool === 'marker') markerColor = button.dataset.color;
  document.querySelectorAll('.swatch').forEach(b => b.setAttribute('aria-pressed', String(b ===
    button)));
  $('paper').classList.toggle('marking', tool !== 'pen');
  $('toolHint').textContent = button.getAttribute('aria-label') + (tool === 'eraser' ?
    ' · Mit links über Markierungen oder Linien radieren' : tool === 'marker' ?
    ' · Kästchen anklicken oder mit links darüberziehen' : ' · schreiben und Linien ziehen');
  render();
  if (tool === 'pen') select(pos);
}));

// Feature action called by the shared keyboard dispatcher.
function holdExtraSymbol(code) {
  openExtraMenu('miscMenu', $('percent'));
}
