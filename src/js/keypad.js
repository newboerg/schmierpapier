// keypad — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/* Nicht-modaler Nummernblock: Pointer-Eingaben verschieben den Fokus nicht.
 * Die vorhandenen Tastaturhandler bleiben für Kästchen und Achsenbeschriftungen zuständig.
 * Sichtbarkeit und Fensterposition gelten nur für diese Sitzung.
 */
let keypadEditingTarget = null;
let keypadDrag = null;
const keypadKeys = [
  ['⌫', 'Backspace', 'Backspace', 'Letztes Zeichen löschen'],
  ['Entf', 'Delete', 'Delete', 'Zeichen löschen'],
  ['←', 'ArrowLeft', 'ArrowLeft', 'Nach links'],
  ['→', 'ArrowRight', 'ArrowRight', 'Nach rechts'],
  ['7', '7', 'Numpad7'], ['8', '8', 'Numpad8'], ['9', '9', 'Numpad9'], [':', '/', 'NumpadDivide'],
  ['4', '4', 'Numpad4'], ['5', '5', 'Numpad5'], ['6', '6', 'Numpad6'], ['·', '*', 'NumpadMultiply'],
  ['1', '1', 'Numpad1'], ['2', '2', 'Numpad2'], ['3', '3', 'Numpad3'], ['−', '-', 'NumpadSubtract'],
  ['0', '0', 'Numpad0'], [',', ',', 'NumpadDecimal', 'Dezimaltrennzeichen'],
  ['=', 'Enter', 'NumpadEnter', 'Gleichzeichen / Nummernblock-Enter'], ['+', '+', 'NumpadAdd'],
  ['↑', 'ArrowUp', 'ArrowUp', 'Nach oben'], ['↓', 'ArrowDown', 'ArrowDown', 'Nach unten']
];

function keypadTarget() {
  const usable = node => node instanceof HTMLInputElement && node.isConnected &&
    !node.disabled && !node.readOnly && ['text', 'search', 'tel'].includes(node.type);
  if (usable(document.activeElement)) return document.activeElement;
  if (usable(keypadEditingTarget)) return keypadEditingTarget;
  return $('editor');
}

function positionKeypad(left, top) {
  const panel = $('virtualKeypad');
  const bounds = panel.getBoundingClientRect();
  panel.style.left = Math.max(8, Math.min(Math.max(8, innerWidth - bounds.width - 8), left)) + 'px';
  panel.style.top = Math.max(8, Math.min(Math.max(8, innerHeight - bounds.height - 8), top)) + 'px';
}

function toggleKeypad(force) {
  const panel = $('virtualKeypad');
  const show = typeof force === 'boolean' ? force : panel.hidden;
  panel.hidden = !show;
  $('keypadToggle').setAttribute('aria-expanded', String(show));
  $('keypadToggle').setAttribute('aria-pressed', String(show));
  if (show) {
    const viewport = workspaceViewport();
    const left = panel.style.left ? parseFloat(panel.style.left) : Math.max(viewport.left + 8, viewport.right - panel.offsetWidth - 20);
    const top = panel.style.top ? parseFloat(panel.style.top) : viewport.top + 12;
    positionKeypad(left, top);
  }
}

function pressKeypadKey(code, modifiers = {}) {
  const definition = keypadKeys.find(item => item[2] === code);
  if (!definition) return;
  const target = keypadTarget();
  const key = code === 'NumpadDecimal' ? (language === 'en' ? '.' : ',') : definition[1];
  const event = new KeyboardEvent('keydown', {
    key, code, location: code.startsWith('Numpad') ? 3 : 0,
    bubbles: true, cancelable: true,
    shiftKey: !!modifiers.shiftKey, ctrlKey: !!modifiers.ctrlKey,
    altKey: !!modifiers.altKey, metaKey: !!modifiers.metaKey
  });
  // Synthetic keydown does not perform the browser's native text editing default.
  if (!target.dispatchEvent(event)) return;
  if (target === $('editor')) {
    if (key.length === 1 && !event.ctrlKey && !event.altKey && !event.metaKey) write(key);
    return;
  }
  if (event.ctrlKey || event.altKey || event.metaKey) return;
  const start = target.selectionStart ?? target.value.length;
  const end = target.selectionEnd ?? start;
  if (code.startsWith('Arrow')) {
    const next = code === 'ArrowLeft' ? Math.max(0, start - 1) : code === 'ArrowRight'
      ? Math.min(target.value.length, end + 1) : code === 'ArrowUp' ? 0 : target.value.length;
    target.setSelectionRange(next, next);
    return;
  }
  if (key.length !== 1 && !['Backspace', 'Delete'].includes(code)) return;
  let from = start, to = end, text = key.length === 1 ? key : '';
  if (from === to && code === 'Backspace') from = Math.max(0, from - 1);
  if (from === to && code === 'Delete') to = Math.min(target.value.length, to + 1);
  if (target.maxLength >= 0) text = text.slice(0, Math.max(0, target.maxLength - target.value.length + to - from));
  target.setRangeText(text, from, to, 'end');
  target.dispatchEvent(new InputEvent('input', {
    bubbles: true, inputType: text ? 'insertText' : code === 'Backspace' ? 'deleteContentBackward' : 'deleteContentForward',
    data: text || null
  }));
}

function updateKeypadLanguage() {
  const decimal = $('virtualKeypad').querySelector('[data-keypad-code="NumpadDecimal"]');
  if (decimal) decimal.textContent = language === 'en' ? '.' : ',';
}

function initialiseKeypad() {
  const panel = $('virtualKeypad');
  for (const [label, key, code, title] of keypadKeys) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.keypadCode = code;
    button.textContent = label;
    button.title = title || label;
    if (title) button.setAttribute('aria-label', title);
    if (code === 'Delete') button.title = 'Zeichen löschen';
    if (['ArrowUp', 'ArrowDown'].includes(code)) button.className = 'keypad-wide';
    button.onclick = event => pressKeypadKey(code, event);
    $('keypadKeys').append(button);
  }
  updateKeypadLanguage();
  // Prevent pointer focus changes before the button's click handler runs.
  for (const node of [panel, $('keypadToggle')]) {
    node.addEventListener('pointerdown', event => {
      if (event.target.closest('button')) event.preventDefault();
    }, { passive: false });
  }
  document.addEventListener('focusin', event => {
    if (event.target instanceof HTMLInputElement && !panel.contains(event.target)) {
      if (['text', 'search', 'tel'].includes(event.target.type)) keypadEditingTarget = event.target;
    }
  });
  $('keypadToggle').onclick = () => toggleKeypad();
  $('keypadClose').onclick = () => toggleKeypad(false);
  const handle = $('keypadDrag');
  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.target.closest('button')) return;
    event.preventDefault();
    const bounds = panel.getBoundingClientRect();
    keypadDrag = { id: event.pointerId, x: event.clientX - bounds.left, y: event.clientY - bounds.top };
    handle.setPointerCapture(event.pointerId);
  });
  window.addEventListener('pointermove', event => {
    if (keypadDrag?.id !== event.pointerId) return;
    positionKeypad(event.clientX - keypadDrag.x, event.clientY - keypadDrag.y);
  }, true);
  const finishDrag = event => {
    if (keypadDrag?.id !== event.pointerId) return;
    keypadDrag = null;
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
  };
  for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) window.addEventListener(type, finishDrag, true);
  handle.addEventListener('keydown', event => {
    if (event.target !== handle || !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const bounds = panel.getBoundingClientRect();
    positionKeypad(bounds.left + (event.key === 'ArrowLeft' ? -10 : event.key === 'ArrowRight' ? 10 : 0),
      bounds.top + (event.key === 'ArrowUp' ? -10 : event.key === 'ArrowDown' ? 10 : 0));
  });
  window.addEventListener('resize', () => {
    if (!panel.hidden) {
      const bounds = panel.getBoundingClientRect();
      positionKeypad(bounds.left, bounds.top);
    }
  });
  localiseInterface();
}
