// key-hints — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * ZIRKEL
 * Ein zusammenhängender Bogen besteht aus kurzen Bleistiftsegmenten mit gemeinsamer Strich-ID.
 * Diese ID hält Radieren, Rückgängig, Speichern und kopierte Bögen zusammen.
 */
// Zirkelspuren werden als kurze Bleistiftsegmente gespeichert. So unterstützen
// Radierer, Bereichsauswahl, .schmier, PDF und Druck auch beliebige Kreisbögen.
// Older files contain ungrouped, finely sampled compass curves. Recover only
// smooth connected chains; ordinary straight ruler strokes remain independent.
let shortcutHintsVisible = false, shortcutHintHold = null, shortcutHintsFrame = 0;

function updateShortcutHints() {
  shortcutHintsFrame = 0;
  const layer = $('shortcutHintsLayer');
  if (!layer) return;
  layer.replaceChildren();
  const bindings = [
    ['#settingsOpen', 'F…'], ['#shortcutHintsToggle', 'T…'], ['#helpOpen', 'F1'],
    ['#newFile', 'Strg+N'], ['#insertImage', 'B…'], ['#open', 'O…'], ['#fullscreen', 'F11'], ['#strikeToggle', 'S…'],
    ['#prev', 'Bild↑…'], ['#next', 'Bild↓…'], ['#pageView', 'D…'],
    ['#add', 'Einfg…'], ['#remove', 'Entf…'], ['#zoomIn', '+…'], ['#zoomOut', '−…'],
    ['#undo', 'Strg+Z'], ['#redo', 'Strg+Y'], ['#save', 'Strg+S'], ['#pdf', 'E…'], ['#print', 'Strg+P'],
    ['#lineStyleToggle', 'J…'], ['#constructionPoint', 'H…'], ['#fractionInsert', 'V…'], ['#taskLabel', 'A…'], ['#cutRegion', 'X…'], ['#copyRegion', 'C…'], ['#largeMode', 'U…'], ['#carryMode', 'Strg…'], ['#powerMode', 'Shift…'],
    ['.swatch[data-tool="eraser"]', 'R…'], ['#compassToggle', 'K…'], ['#geoToggle', 'G…'],
    ['#numberLineToggle', 'N…'], ['#integral', 'I…'],
    ['#greek', 'P…'], ['#parenOpen', '8…'],
    ['#parenClose', '9…'], ['#root', 'Q…'],
    ['#relationEqual', '↵…'], ['#logic', 'L…'], ['#sets', 'M…'], ['#percent', 'Z…']
  ];
  document.querySelectorAll('.swatch[data-tool="pen"]').forEach((button, i) => {
    bindings.push(['.swatch[data-tool="pen"][data-color="' + button.dataset.color + '"]', (i + 1) + '…']);
  });
  document.querySelectorAll('.swatch[data-tool="marker"]').forEach((button, i) => {
    bindings.push(['.swatch[data-tool="marker"][data-color="' + button.dataset.color + '"]', (i + 5) + '…']);
  });
  for (const [selector, key] of bindings) {
    if (!shortcutHintsVisible && selector !== '#shortcutHintsToggle') continue;
    const target = document.querySelector(selector);
    if (!target || !target.getClientRects().length) continue;
    const group = target.closest('.relation-buttons,.add-sheet-split');
    const rect = (group || target).getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight || rect.right < 0 || rect.left > innerWidth) continue;
    const badge = document.createElement('span');
    badge.className = 'shortcut-key-hint';
    badge.dataset.for = target.id || selector;
    badge.textContent = tr(key);
    badge.style.left = Math.max(15, Math.min(innerWidth - 15, rect.left + rect.width / 2)) + 'px';
    badge.style.top = Math.max(1, rect.top - 9) + 'px';
    if (target.disabled) badge.style.opacity = '.5';
    layer.append(badge);
  }
}

function scheduleShortcutHints() {
  if (!shortcutHintsFrame) shortcutHintsFrame = requestAnimationFrame(updateShortcutHints);
}

function toggleShortcutHints() {
  shortcutHintsVisible = !shortcutHintsVisible;
  $('shortcutHintsToggle').setAttribute('aria-pressed', String(shortcutHintsVisible));
  updateShortcutHints();
}

function finishShortcutHintHold(short = false) {
  const held = shortcutHintHold;
  if (!held) return;
  clearTimeout(held.timer); shortcutHintHold = null;
  if (short && !held.fired && document.activeElement === held.target && held.target === $('editor') &&
      !tutorial && !compass.active && !geo.keyboard && !keyboardArea) write(held.key);
}

// This capture listener precedes the geometry modes so T also works while drawing.
window.addEventListener('keydown', event => {
  if (shortcutHintHold && event.code !== shortcutHintHold.code) finishShortcutHintHold(true);
  if (event.key.toLowerCase() !== 't' || event.ctrlKey || event.shiftKey || event.altKey || event.metaKey ||
      !event.isTrusted || !([ $('editor'), $('shortcutHintsToggle') ].includes(event.target) ||
      !tutorial && (event.target === document.body || event.target.closest?.('header button,.paper')))) return;
  event.preventDefault(); event.stopImmediatePropagation();
  if (!shortcutHintHold) {
    const held = { code: event.code, key: event.key, target: event.target, fired: false };
    held.timer = setTimeout(() => {
      if (document.activeElement !== held.target) return;
      held.fired = true; toggleShortcutHints();
    }, settings.holdDelay);
    shortcutHintHold = held;
    showButtonHoldProgress(held, $('shortcutHintsToggle'), () => shortcutHintHold === held);
  }
}, true);
window.addEventListener('keyup', event => {
  if (!shortcutHintHold || event.code !== shortcutHintHold.code) return;
  event.preventDefault(); event.stopImmediatePropagation(); finishShortcutHintHold(true);
}, true);
window.addEventListener('blur', () => finishShortcutHintHold());
window.addEventListener('pointerdown', () => finishShortcutHintHold(), true);
document.addEventListener('focusout', event => {
  if (event.target === shortcutHintHold?.target) finishShortcutHintHold();
});

function initialiseShortcutHints() {
  const layer = document.createElement('div');
  layer.id = 'shortcutHintsLayer'; layer.setAttribute('aria-hidden', 'true');
  document.body.append(layer);
  $('shortcutHintsToggle').addEventListener('pointerdown', event => event.preventDefault());
  $('shortcutHintsToggle').onclick = toggleShortcutHints;
  updateShortcutHints();
  window.addEventListener('resize', scheduleShortcutHints);
  window.addEventListener('scroll', scheduleShortcutHints, true);
  $('language').addEventListener('change', scheduleShortcutHints);
  if (typeof ResizeObserver === 'function') new ResizeObserver(scheduleShortcutHints).observe(document.querySelector('header'));
  new MutationObserver(scheduleShortcutHints).observe(document.querySelector('header'), { childList: true, subtree: true, characterData: true });
}
