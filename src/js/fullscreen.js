// fullscreen — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function syncFullscreen() {
  const active = !!document.fullscreenElement,
    button = $('fullscreen');
  button.setAttribute('aria-pressed', String(active));
  const label = active ? 'Vollbild verlassen' : 'Vollbild einschalten';
  button.title = label;
  button.setAttribute('aria-label', label);
  button.querySelector('[data-fullscreen-icon]').setAttribute('d', active ?
    'M3 8h5V3M21 8h-5V3M8 21v-5H3M16 21v-5h5' : 'M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5');
  if (typeof localeObserver !== 'undefined') localiseInterface()
}
async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
    } else if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen()
    } else {
      status('Vollbild ist in diesem Browser nicht verfügbar.');
      return
    }
    syncFullscreen()
  } catch {
    status('Vollbild konnte nicht umgeschaltet werden.')
  }
}
$('fullscreen').onclick = toggleFullscreen;
document.addEventListener('fullscreenchange', () => {
  syncFullscreen();
  scaleSpread()
});
document.addEventListener('fullscreenerror', () => status('Vollbild konnte nicht umgeschaltet werden.'));

// @part part-02
window.addEventListener('resize', scaleSpread);
