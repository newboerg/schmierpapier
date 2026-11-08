// Startup guidance is a browser preference, never part of a .schmier document.
// @part part-01
const KEYBOARD_NOTICE_KEY = 'schmierpapier.keyboardNoticeDismissed';
let keyboardNoticeShown = false;

function showKeyboardNoticeWhenReady() {
  if (keyboardNoticeShown || document.querySelector('dialog[open]')) return;
  try {
    if (readAppStorage(KEYBOARD_NOTICE_KEY) === '1') return;
  } catch { /* Without browser storage the notice remains available each start. */ }
  keyboardNoticeShown = true;
  $('keyboardNoticeForget').checked = false;
  $('keyboardNoticeStorageNote').hidden = storageAllowed;
  localiseInterface();
  $('keyboardNoticeDialog').showModal();
  // Focus the heading so small screens start at the explanation, not at the bottom.
  $('keyboardNoticeTitle').focus({ preventScroll: true });
  $('keyboardNoticeDialog').scrollTop = 0;
}

function closeKeyboardNotice() {
  if ($('keyboardNoticeForget').checked) {
    try { writeAppStorage(KEYBOARD_NOTICE_KEY, '1'); }
    catch { status(tr('Browserspeicher nicht verfügbar – bitte als .schmier speichern')); }
  }
  $('keyboardNoticeDialog').close();
  select(pos);
}

function initialiseKeyboardNotice() {
  $('keyboardNoticeForm').addEventListener('submit', event => {
    event.preventDefault();
    closeKeyboardNotice();
  });
  $('keyboardNoticeDialog').addEventListener('cancel', event => {
    event.preventDefault();
    closeKeyboardNotice();
  });
  // Wait behind consent and release notes; never stack startup dialogs.
  document.addEventListener('close', () => queueMicrotask(showKeyboardNoticeWhenReady), true);
  showKeyboardNoticeWhenReady();
}

// Allow native Tab/Space controls, while protecting the modal from app shortcuts.
window.addEventListener('keydown', event => {
  if (!$('keyboardNoticeDialog')?.open) return;
  event.stopImmediatePropagation();
  if (event.key === 'Tab') {
    event.preventDefault();
    (document.activeElement === $('keyboardNoticeForget') ? $('keyboardNoticeContinue') : $('keyboardNoticeForget')).focus();
    return;
  }
  if ((event.key === 'Enter' || event.key === 'Escape') && !event.isComposing) {
    event.preventDefault();
    if (!event.repeat) closeKeyboardNotice();
  }
}, true);
