// Preferences remain session-only unless local storage has been explicitly allowed.
// @part part-01
const SETTINGS_KEY = 'schmierpapier.settings';
const DEFAULT_SETTINGS = Object.freeze({ holdDelay: 600, font: 'handwriting', toolbarPosition: 'top' });
let settings = { ...DEFAULT_SETTINGS };
function normaliseSettings(value) {
  return {
    holdDelay: Number.isInteger(value?.holdDelay) && value.holdDelay >= 200 && value.holdDelay <= 3000
      ? value.holdDelay : DEFAULT_SETTINGS.holdDelay,
    font: value?.font === 'console' ? 'console' : 'handwriting',
    toolbarPosition: ['top', 'bottom', 'left', 'right'].includes(value?.toolbarPosition) ? value.toolbarPosition : 'top'
  };
}
try { settings = normaliseSettings(JSON.parse(readAppStorage(SETTINGS_KEY))); } catch {}
function writingFont() {
  return settings.font === 'console' ? 'OfflineConsole, OfflineSymbols, monospace' :
    'OfflineHandschrift, OfflineSymbols, cursive';
}
function saveSettings() {
  try { writeAppStorage(SETTINGS_KEY, JSON.stringify(settings)); } catch {
    status(tr('Browserspeicher nicht verfügbar – bitte als .schmier speichern'));
  }
}
function applySettings(value, save = false) {
  settings = normaliseSettings(value);
  document.documentElement.style.setProperty('--writing-font', writingFont());
  applyToolbarPosition(settings.toolbarPosition);
  if (save) saveSettings();
}
function initialiseSettings() {
  applySettings(settings);
  $('settingsOpen').onclick = () => {
    if (tutorial) return;
    $('holdDelay').value = settings.holdDelay;
    $('writingFont').value = settings.font;
    $('toolbarPosition').value = settings.toolbarPosition;
    $('settingsStorageNote').textContent = tr(storageAllowed ?
      'Einstellungen werden in diesem Browser gespeichert.' : 'Ohne Speicherzustimmung gelten Einstellungen nur in dieser Sitzung.');
    $('settingsDialog').showModal();
    $('holdDelay').focus();
  };
  $('settingsForm').addEventListener('submit', event => {
    event.preventDefault();
    applySettings({ holdDelay: Number($('holdDelay').value), font: $('writingFont').value, toolbarPosition: $('toolbarPosition').value }, true);
    $('settingsDialog').close();
    render(); select(pos); persist();
    localiseInterface();
  });
  $('settingsCancel').onclick = () => $('settingsDialog').close();
  $('settingsDialog').addEventListener('close', () => select(pos));
}
// Install before geometry capture so modal fields never reach document shortcuts.
window.addEventListener('keydown', event => {
  if (!$('settingsDialog').open && !$('releaseDialog').open) return;
  event.stopImmediatePropagation();
  if (event.key === 'Escape') {
    event.preventDefault();
    ($('settingsDialog').open ? $('settingsDialog') : $('releaseDialog')).close();
  }
}, true);
