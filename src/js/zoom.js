// zoom — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let manualZoom = null;
try {
  const savedZoom = Number(readAppStorage('schmierpapier.zoom'));
  if (savedZoom >= .25 && savedZoom <= 2) manualZoom = savedZoom
} catch {}

// @part part-02
/*
 * ANSICHT, ZOOM UND VOLLBILD
 */
function scaleSpread() {
  const available = document.querySelector('.workspace').clientWidth - 40,
    pages = pageView === '2' ? 2 : 1;
  const width = $('paper').offsetWidth * pages + (pages - 1) * 24;
  const zoom = manualZoom ?? Math.min(1, Math.max(.2, available / width));
  $('spread').style.zoom = String(zoom);
  $('zoomReset').textContent = Math.round(zoom * 100) + ' %';
  $('zoomReset').setAttribute('aria-label', 'Zoom ' + Math.round(zoom * 100) +
    ' Prozent. An Fenster anpassen.');
  $('zoomOut').disabled = zoom <= .25;
  $('zoomIn').disabled = zoom >= 2;
  if (tutorial) positionTutorial()
}

function centerZoomOnSelection() {
  const cell = nodes[pos];
  if (!cell) return;
  const workspace = document.querySelector('.workspace');
  const view = workspace.getBoundingClientRect();
  let rect = cell.getBoundingClientRect();
  // Horizontal overflow belongs to the workspace, vertical scrolling to the page.
  workspace.scrollBy({ left: rect.left + rect.width / 2 - view.left - workspace.clientWidth / 2, behavior: 'instant' });
  rect = cell.getBoundingClientRect();
  const headerBottom = Math.max(0, Math.min(innerHeight, document.querySelector('header').getBoundingClientRect().bottom));
  const targetY = headerBottom + (innerHeight - headerBottom) / 2;
  window.scrollBy({ top: rect.top + rect.height / 2 - targetY, behavior: 'instant' });
}

function setZoom(delta) {
  const current = Number($('spread').style.zoom) || 1;
  manualZoom = delta === null ? null : Math.max(.25, Math.min(2, Math.round((current + delta) * 100) / 100));
  try {
    if (!tutorial) {
      if (manualZoom === null) removeAppStorage('schmierpapier.zoom');
      else writeAppStorage('schmierpapier.zoom', String(manualZoom))
    }
  } catch {}
  scaleSpread();
  if (delta > 0) centerZoomOnSelection();
}

// @part part-03
$('zoomOut').onclick = () => setZoom(-.1);
$('zoomIn').onclick = () => setZoom(.1);
$('zoomReset').onclick = () => setZoom(null);

// Feature action called by the shared keyboard dispatcher.
function holdZoom(code) {
  const zoomKey = actionHolds.get(code)?.key;
  setZoom(zoomKey === '+' ? .1 : -.1);
}
