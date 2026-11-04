// keyboard — assembled in src/build.json order; shared classic-script scope.

// @part part-01
const penNumberHolds = new Map();
const actionHolds = new Map();
const modifierModeHolds = new Map();
let extraMenu = null, extraModifiers = {}, keyboardArea = null;

// @part part-02
let keyboardLine = null;
const lineKeys = new Set();
let arrowPending = null, chordLatched = false;

// @part part-03
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'y') {
    e.preventDefault();
    restore(future, history);
    return
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
    e.preventDefault();
    saveFile()
  }
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && e.target !== $('name')) {
    e.preventDefault();
    e.shiftKey ? restore(future, history) : restore(history, future)
  }
});

window.addEventListener('keydown', event => {
  if (tutorial || $('helpDialog').open || event.altKey || event.shiftKey) return;
  const command = (event.ctrlKey || event.metaKey) && ['n', 'o'].includes(event.key.toLowerCase());
  if (!command && event.key !== 'F11') return;
  event.preventDefault(); event.stopImmediatePropagation();
  if (event.repeat) return;
  if (event.key === 'F11') toggleFullscreen();
  else if (event.key.toLowerCase() === 'n') $('newFile').click();
  else $('open').click();
}, true);

// @part part-04
function drawKeyboardLine() {
  if (!keyboardLine || keyboardLine.page !== page) return;
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  ['x1', 'y1', 'x2', 'y2'].forEach((key, i) => el.setAttribute(key, [...keyboardLine.start, ...keyboardLine.end][i] * 5));
  el.setAttribute('class', 'drawn-line keyboard-line-preview');
  if (keyboardLine.numberAxis) {
    if (keyboardLine.awaitingDirection) {
      geoSvg('circle', { cx: keyboardLine.start[0] * 5, cy: keyboardLine.start[1] * 5,
        r: .7, fill: '#d52d35', class: 'keyboard-line-preview' }, $('lineLayer'));
      return;
    }
    const dx = keyboardLine.end[0] - keyboardLine.start[0];
    const dy = keyboardLine.end[1] - keyboardLine.start[1];
    const length = Math.hypot(dx, dy), ux = dx / length, uy = dy / length;
    const x = keyboardLine.end[0] * 5, y = keyboardLine.end[1] * 5;
    const bx = x - 1.8 * ux, by = y - 1.8 * uy;
    el.setAttribute('x2', bx);
    el.setAttribute('y2', by);
    const arrow = geoSvg('polygon', {
      points: `${x},${y} ${bx - .8 * uy},${by + .8 * ux} ${bx + .8 * uy},${by - .8 * ux}`,
      fill: '#d52d35', class: 'keyboard-line-preview'
    }, $('lineLayer'));
    arrow.style.setProperty('stroke', 'none', 'important');
  }
  $('lineLayer').append(el);
}

function cancelKeyboardLine() {
  keyboardLine = null;
  clearTimeout(arrowPending?.timer);
  arrowPending = null;
  lineKeys.clear();
  chordLatched = false;
  renderLines();
}

// @part part-05
function keyboardChord(horizontal) {
  if (keyboardLine?.awaitingDirection) {
    orientNumberAxis(horizontal);
    return;
  }
  if (keyboardLine) {
    if (keyboardLine.horizontal !== horizontal) {
      if (!keyboardLine.numberAxis) return;
      keyboardLine = null;
      keyboardChord(horizontal);
      keyboardLine.numberAxis = true;
      renderLines();
      return;
    }
    if (keyboardLine.numberAxis) {
      const { start, end } = keyboardLine;
      keyboardLine = null;
      commitNumberLine(start, end);
      return;
    }
    const step = tutorial?.steps[tutorial.index];
    if (step?.kind === 'line' && !(
      keyboardLine.start.every((v, i) => v === step.start[i]) && keyboardLine.end.every((v, i) => v === step.end[i]) ||
      keyboardLine.end.every((v, i) => v === step.start[i]) && keyboardLine.start.every((v, i) => v === step.end[i]))) {
      tourFeedback('Die Vorschau muss genau zwischen den goldenen Punkten liegen. Passe Länge und Kante mit den Pfeiltasten an.');
      return;
    }
    checkpoint();
    doc.lines[page] = toggleLineCoverage(doc.lines[page], keyboardLine.start, keyboardLine.end, ink);
    keyboardLine = null;
    changed();
    return;
  }
  const x = pos % COLS + 1, y = Math.floor(pos / COLS) + 1;
  keyboardLine = { horizontal, page, anchor: horizontal ? x : y, cursor: horizontal ? x : y,
    start: [x, horizontal ? y + 1 : y], end: horizontal ? [x + 1, y + 1] : [x, y + 1] };
  renderLines();
  status('Tastaturstrich: Pfeiltasten ändern Länge und Kante · gleiche Doppeltaste bestätigt · Esc bricht ab');
}

function flushArrow() {
  if (!arrowPending) return;
  const pending = arrowPending;
  clearTimeout(pending.timer);
  arrowPending = null;
  if (keyboardLine && pending.apply) { pending.apply(); return; }
  if (tutorial && tutorial.steps[tutorial.index]?.kind === 'line') return;
  if (document.activeElement === $('editor')) $('editor').dispatchEvent(new KeyboardEvent('keydown', {
    key: pending.key, code: pending.key, bubbles: true, cancelable: true, repeat: pending.repeat
  }));
}

// @part part-06
function finishPenNumberHold(code, insertDigit = false) {
  const held = penNumberHolds.get(code);
  if (!held) return;
  clearTimeout(held.timer);
  penNumberHolds.delete(code);
  if (insertDigit && !held.selected && document.activeElement === held.target && page === held.page) {
    if (tutorial) tourFeedback('Halte die angegebene Zahl etwas länger gedrückt, bis der Stift gewählt ist, oder klicke auf den markierten Stift.');
    else write(held.digit);
  }
}

function initialiseMathTools() {
  $('greek').onclick = event => insertGreek('π', event);
  $('greekMore').onclick = event => {
    if (greekMenuOpen) closeGreekMenu();
    else openGreekMenu(event);
  };
  for (const [symbol, name] of greekChoices) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = symbol;
    button.dataset.symbol = symbol;
    button.title = name;
    button.setAttribute('aria-label', name);
    button.onclick = event => chooseGreek(button, event);
    $('greekMenu').append(button);
  }
  for (const el of [$('greek'), $('greekMore'), $('greekMenu')]) {
    el.addEventListener('pointerdown', event => event.preventDefault());
  }
  $('root').onclick = event => insertBracket('√', event);
  $('relationEqual').onclick = event => insertRelation('=', event);
  $('relationMore').onclick = event => {
    if (relationMenuOpen) closeRelationMenu();
    else openRelationMenu(event);
  };
  for (const symbol of relationSymbols) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = symbol;
    button.dataset.symbol = symbol;
    button.title = symbol + ' · Strg: doppelhoch nach unten · Shift: nach oben';
    button.onclick = event => chooseRelation(button, event);
    $('relationMenu').append(button);
  }
  for (const el of [$('relationMenu'), $('relationMore'), $('relationEqual'), $('root')]) {
    el.addEventListener('pointerdown', event => event.preventDefault());
  }
  window.addEventListener('pointerdown', event => {
    if (relationMenuOpen && !event.target.closest?.('#relationMenu,#relationMore')) closeRelationMenu();
    if (greekMenuOpen && !event.target.closest?.('#greekMenu,#greekMore')) closeGreekMenu();
    if (keyboardLine) cancelKeyboardLine();
  }, true);
  window.addEventListener('keydown', event => {
    const editor = event.target === $('editor');
    // Flush an unfinished short digit before another key to preserve typing order.
    for (const code of [...penNumberHolds.keys()]) {
      if (code !== event.code) finishPenNumberHold(code, true);
    }
    const penDigit = event.code.match(/^(?:Digit|Numpad)([1-4])$/);
    if (editor && (!tutorial || tutorialPenDigit() === penDigit?.[1]) && !relationMenuOpen && !greekMenuOpen && event.isTrusted && penDigit &&
        !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (!penNumberHolds.has(event.code)) {
        const held = { digit: penDigit[1], target: event.target, page, selected: false };
        held.timer = setTimeout(() => {
          if (document.activeElement !== held.target || page !== held.page || (tutorial && tutorialPenDigit() !== held.digit)) return;
          held.selected = true;
          document.querySelectorAll('.swatch[data-tool="pen"]')[Number(held.digit) - 1].click();
        }, settings.holdDelay);
        penNumberHolds.set(event.code, held);
        showButtonHoldProgress(held, document.querySelectorAll('.swatch[data-tool="pen"]')[Number(held.digit) - 1], () => penNumberHolds.get(event.code) === held);
      }
      return;
    }
    if (relationMenuOpen || greekMenuOpen) {
      if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeRelationMenu(); closeGreekMenu(); return; }
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
        event.preventDefault(); event.stopImmediatePropagation();
        const buttons = [...$(greekMenuOpen ? 'greekMenu' : 'relationMenu').querySelectorAll('button')];
        let i = buttons.findIndex(b => b.classList.contains('menu-current'));
        if (event.key === 'Enter') {
          if (!event.repeat && !enterHold && !greekHold) {
            if (greekMenuOpen) chooseGreek(buttons[Math.max(i, 0)], event);
            else chooseRelation(buttons[Math.max(i, 0)], event);
          }
        } else {
          buttons.forEach(b => b.classList.remove('menu-current'));
          i = (i + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1) + buttons.length) % buttons.length;
          buttons[i].classList.add('menu-current');
          buttons[i].scrollIntoView({ block: 'nearest' });
        }
        return;
      }
    }
    // Delay P only in writing cells; names, search fields and browser Ctrl+P stay native.
    if (editor && (!tutorial || tutorial.steps[tutorial.index]?.symbol === 'π') && event.isTrusted && event.code === 'KeyP' && !event.ctrlKey && !event.altKey && !event.metaKey) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (!greekHold) {
        const held = { key: event.key, target: event.target, shiftKey: event.shiftKey, opened: false };
        held.timer = setTimeout(() => { held.opened = true; openGreekMenu(held); }, settings.holdDelay);
        greekHold = held;
        showButtonHoldProgress(held, $('greek'), () => greekHold === held);
      }
      return;
    }
    // Synthetic keypad and guided tutorial retain their existing immediate Enter behaviour.
    if (editor && (!tutorial || tutorial.steps[tutorial.index]?.symbol === '≠') && event.isTrusted && event.key === 'Enter' && !event.altKey && !event.metaKey) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (!enterHold) {
        const held = { code: event.code, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey, target: event.target, opened: false };
        held.timer = setTimeout(() => { held.opened = true; openRelationMenu(held); }, settings.holdDelay);
        enterHold = held;
        showButtonHoldProgress(held, $('relationEqual'), () => enterHold === held);
      }
      return;
    }
    if (!editor || (tutorial && tutorial.steps[tutorial.index]?.kind !== 'line') || !event.isTrusted || event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return;
    if (keyboardLine && event.key === 'Escape') {
      event.preventDefault(); event.stopImmediatePropagation();
      const numberAxis = keyboardLine.numberAxis;
      cancelKeyboardLine();
      if (numberAxis) cancelNumberLine(true, true);
      return;
    }
    if (!event.key.startsWith('Arrow') || tool !== 'pen' || geo.visible || compass.active || (numberLineTool.active && !numberLineTool.keyboard) || region || strikeTool.active) return;
    event.preventDefault(); event.stopImmediatePropagation();
    lineKeys.add(event.key);
    const horizontalPair = lineKeys.has('ArrowLeft') && lineKeys.has('ArrowRight');
    const verticalPair = lineKeys.has('ArrowUp') && lineKeys.has('ArrowDown');
    if (horizontalPair || verticalPair) {
      clearTimeout(arrowPending?.timer); arrowPending = null;
      if (!chordLatched) { chordLatched = true; keyboardChord(horizontalPair); }
      return;
    }
    if (chordLatched) return;
    // Wait briefly so the first key of a two-key chord does not move the cursor/line.
    flushArrow();
    const pending = { key: event.key, repeat: event.repeat };
    pending.apply = () => {
      const line = keyboardLine;
      if (line.awaitingDirection) {
        orientNumberAxis(['ArrowLeft', 'ArrowRight'].includes(event.key), ['ArrowLeft', 'ArrowUp'].includes(event.key));
        return;
      }
      const h = line.horizontal;
      if (h && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
        line.start[1] = line.end[1] = Math.floor(pos / COLS) + (event.key === 'ArrowUp' ? 1 : 2);
      } else if (!h && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        line.start[0] = line.end[0] = pos % COLS + (event.key === 'ArrowLeft' ? 1 : 2);
      } else {
        const axis = h ? 0 : 1;
        const delta = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1;
        // Both ends enclose complete cells, including the original cell in either direction.
        line.cursor = Math.max(1, Math.min(h ? COLS : ROWS, line.cursor + delta));
        line.start[axis] = line.cursor < line.anchor ? line.anchor + 1 : line.anchor;
        line.end[axis] = line.cursor < line.anchor ? line.cursor : line.cursor + 1;
      }
      renderLines();
    };
    pending.timer = setTimeout(() => {
      if (arrowPending === pending) flushArrow();
    }, 110);
    arrowPending = pending;
  }, true);
  window.addEventListener('keyup', event => {
    if (penNumberHolds.has(event.code)) {
      event.preventDefault(); event.stopImmediatePropagation();
      finishPenNumberHold(event.code, true);
      return;
    }
    if (event.code === 'KeyP' && greekHold) {
      const held = greekHold; greekHold = null; clearTimeout(held.timer);
      event.preventDefault(); event.stopImmediatePropagation();
      if (!held.opened && document.activeElement === held.target) {
        if (tutorial) tourFeedback('Halte P etwas länger gedrückt, bis das griechische Zeichenmenü erscheint.');
        else write(held.key);
      }
    }
    if (event.key === 'Enter' && enterHold) {
      const held = enterHold; enterHold = null; clearTimeout(held.timer);
      event.preventDefault(); event.stopImmediatePropagation();
      if (!held.opened && document.activeElement === held.target) held.target.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Enter', code: held.code, ctrlKey: held.ctrlKey, shiftKey: held.shiftKey, bubbles: true, cancelable: true
      }));
    }
    if (event.key.startsWith('Arrow')) {
      lineKeys.delete(event.key);
      if (!chordLatched) flushArrow();
      if (!lineKeys.size) chordLatched = false;
    }
  }, true);
  window.addEventListener('blur', () => {
    for (const code of [...penNumberHolds.keys()]) finishPenNumberHold(code);
    clearTimeout(enterHold?.timer); enterHold = null;
    clearTimeout(greekHold?.timer); greekHold = null;
    closeRelationMenu(); closeGreekMenu(); cancelKeyboardLine();
  });
  document.addEventListener('focusout', event => {
    if (event.target === $('editor')) {
      for (const code of [...penNumberHolds.keys()]) finishPenNumberHold(code);
      clearTimeout(enterHold?.timer); enterHold = null;
      clearTimeout(greekHold?.timer); greekHold = null;
    }
  });
  window.addEventListener('pointerdown', () => {
    for (const code of [...penNumberHolds.keys()]) finishPenNumberHold(code, true);
    clearTimeout(enterHold?.timer); enterHold = null;
    clearTimeout(greekHold?.timer); greekHold = null;
  }, true);
  window.addEventListener('resize', () => { closeRelationMenu(); closeGreekMenu(); });
  localiseInterface();
}

// @part part-07
/* Menüs und gehaltene Tasten: Änderungen erst nach bestätigter Auswahl. */
function closeExtraMenu() {
  if (!extraMenu) return;
  $(extraMenu).hidden = true;
  if (extraMenu === 'bracketOpenMenu') $('parenOpenMore').setAttribute('aria-expanded', 'false');
  if (extraMenu === 'bracketCloseMenu') $('parenCloseMore').setAttribute('aria-expanded', 'false');
  if (extraMenu === 'rootChoiceMenu') $('rootMore').setAttribute('aria-expanded', 'false');
  if (extraMenu === 'integralChoiceMenu') $('integralMore').setAttribute('aria-expanded', 'false');
  for (const name of ['logic', 'sets', 'misc']) $(name + 'More').setAttribute('aria-expanded', 'false');
  $('taskLabelMore').setAttribute('aria-expanded', 'false');
  extraMenu = null;
}

function openExtraMenu(id, anchor, modifiers = {}) {
  closeExtraMenu(); closeGreekMenu(); closeRelationMenu();
  extraMenu = id;
  extraModifiers = { ctrlKey: !!modifiers.ctrlKey, shiftKey: !!modifiers.shiftKey };
  const menu = $(id);
  menu.hidden = false;
  if (id === 'taskLabelMenu') $('taskLabelMore').setAttribute('aria-expanded', 'true');
  if (id === 'rootChoiceMenu') $('rootMore').setAttribute('aria-expanded', 'true');
  if (id === 'integralChoiceMenu') $('integralMore').setAttribute('aria-expanded', 'true');
  for (const name of ['logic', 'sets', 'misc']) if (id === name + 'Menu') $(name + 'More').setAttribute('aria-expanded', 'true');
  positionToolbarMenu(menu, anchor);
  menu.querySelectorAll('button').forEach((b, i) => b.classList.toggle('menu-current', i === (id === 'integralChoiceMenu' || id === 'rootChoiceMenu' ? 4 : id === 'bracketOpenMenu' || id === 'bracketCloseMenu' ? 8 : 0)));
  if (id === 'bracketOpenMenu') $('parenOpenMore').setAttribute('aria-expanded', 'true');
  if (id === 'bracketCloseMenu') $('parenCloseMore').setAttribute('aria-expanded', 'true');
}

function chooseExtra(button, event = {}) {
  const id = extraMenu;
  const modifiers = { ctrlKey: extraModifiers.ctrlKey || event.ctrlKey, shiftKey: extraModifiers.shiftKey || event.shiftKey };
  if (button.dataset.size === 'down') { modifiers.ctrlKey = true; modifiers.shiftKey = false; }
  if (button.dataset.size === 'up') { modifiers.ctrlKey = false; modifiers.shiftKey = true; }
  closeExtraMenu();
  if (id === 'taskLabelMenu') insertTaskLabel(Number(button.dataset.taskHeight));
  else if (id === 'paperChoiceMenu') addSheet(button.dataset.paper);
  else if (button.dataset.stretch) beginStretchChoice(button);
  else if (button.dataset.textSymbol) insertMathSymbol(button.dataset.symbol);
  else if (button.dataset.definite) insertDefiniteIntegral(modifiers);
  else if (button.dataset.rootDegree) insertIndexedRoot(modifiers);
  else insertBracket(button.dataset.symbol, modifiers);
  scheduleTutorialCheck();
}

// @part part-08
function finishActionHold(code, short = false) {
  const held = actionHolds.get(code);
  if (!held) return;
  clearTimeout(held.timer); actionHolds.delete(code);
  if (!short || held.fired || document.activeElement !== held.target) return;
  if (/^(?:Digit|Numpad)[5-9]$/.test(code)) {
    if (tutorial) tourFeedback('Halte die angegebene Taste länger gedrückt, bis die Aktion startet.');
    else write(code.slice(-1));
    return;
  }
  if (tutorial || keyboardArea) {
    tourFeedback('Halte die angegebene Taste länger gedrückt, bis die Aktion startet.'); return;
  }
  if (['+', '-'].includes(held.key)) write(held.key);
  else if (['KeyF', 'KeyA', 'KeyL', 'KeyM', 'KeyB', 'KeyO', 'KeyS', 'KeyG', 'KeyK', 'KeyI', 'KeyU', 'KeyZ', 'KeyQ', 'KeyW', 'KeyN', 'KeyR', 'KeyX', 'KeyC', 'KeyE', 'KeyD'].includes(code)) write(held.key);
  else if (code === 'Delete') held.target.dispatchEvent(new KeyboardEvent('keydown', {key: 'Delete', code, bubbles: true, cancelable: true}));
  else if (['PageUp', 'PageDown'].includes(code)) window.scrollBy(0, (code === 'PageUp' ? -1 : 1) * innerHeight * .85);
}

function runHeldAction(code) {
  const zoomKey = actionHolds.get(code)?.key;
  if (zoomKey === '+' || zoomKey === '-') holdZoom(code);
  else if (/^(?:Digit|Numpad)[89]$/.test(code)) holdBracketMenu(code);
  else if (code === 'KeyB' || code === 'KeyO') holdFileAction(code);
  else if (code === 'KeyS' || /^(?:Digit|Numpad)[5-7]$/.test(code)) holdPaintRegion(code);
  else if (['KeyR', 'KeyX', 'KeyC'].includes(code)) holdEditRegion(code);
  else if (code === 'PageUp' || code === 'PageDown') holdPageTravel(code);
  else if (code === 'KeyG') holdSetSquare(code);
  else if (code === 'KeyK') holdCompass(code);
  else if (code === 'KeyF') $('settingsOpen').click();
  else if (code === 'KeyA') openExtraMenu('taskLabelMenu', $('taskLabel'));
  else if (code === 'KeyI') holdIntegralMenu(code);
  else if (code === 'KeyL' || code === 'KeyM') openExtraMenu(code === 'KeyL' ? 'logicMenu' : 'setsMenu', $(code === 'KeyL' ? 'logic' : 'sets'));
  else if (code === 'KeyU') toggleLargeMode();
  else if (code === 'KeyZ') holdExtraSymbol(code);
  else if (code === 'KeyQ') holdRootMenu(code);
  else if (code === 'KeyW') holdDirectRoot(code);
  else if (code === 'KeyN') holdNumberLine(code);
  else if (code === 'KeyE') holdPdfExport(code);
  else if (code === 'KeyD') holdPageView(code);
  else if (code === 'Insert') holdPaperChoice(code);
  else if (code === 'Delete') holdDeletePage(code);
  scheduleTutorialCheck();
}

function updateModifierModePreview() {
  for (const [mode, id] of [['powers', 'powerMode'], ['carries', 'carryMode']]) {
    const pending = [...modifierModeHolds.values()].find(held => held.mode === mode && !held.used);
    $(id).classList.toggle('mode-hold', !!pending);
    $(id).classList.toggle('mode-hold-ready', !!pending?.ready);
    const progress = $(id).querySelector('.mode-hold-progress rect');
    if (progress) progress.style.strokeDashoffset = pending ? String(100 * (1 - Math.min(1, (performance.now() - pending.started) / settings.holdDelay))) : '100';
  }
}

function animateModifierModeProgress() {
  updateModifierModePreview();
  if ([...modifierModeHolds.values()].some(held => !held.used && !held.ready)) requestAnimationFrame(animateModifierModeProgress);
}

function cancelModifierModeHolds() {
  for (const held of modifierModeHolds.values()) clearTimeout(held.timer);
  modifierModeHolds.clear();
  updateModifierModePreview();
}

function modifierModeAllowed(mode) {
  if (!tutorial) return true;
  const step = tutorial.steps[tutorial.index];
  return step?.kind === 'button' && step.target === (mode === 'powers' ? '#powerMode' : '#carryMode');
}

function initialiseModifierModes() {
  for (const id of ['powerMode', 'carryMode']) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'mode-hold-progress');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="5" pathLength="100" />';
    $(id).append(svg);
  }
  window.addEventListener('keydown', event => {
    if (!event.isTrusted) return;
    const modifier = event.key === 'Shift' || event.key === 'Control';
    // Any second key makes this a normal shortcut, never a standalone mode toggle.
    for (const [code, held] of modifierModeHolds) if (code !== event.code) held.used = true;
    updateModifierModePreview();
    if (!modifier || event.target !== $('editor') || event.altKey || event.metaKey ||
        event.key === 'Shift' && event.ctrlKey || event.key === 'Control' && event.shiftKey ||
        extraMenu || greekMenuOpen || relationMenuOpen || keyboardArea || stretchBracket) return;
    const mode = event.key === 'Shift' ? 'powers' : 'carries';
    if (!modifierModeAllowed(mode) || modifierModeHolds.has(event.code) || event.repeat) return;
    const held = { mode, target: event.target, ready: false, used: false, started: performance.now() };
    held.timer = setTimeout(() => { held.ready = true; updateModifierModePreview(); }, settings.holdDelay);
    modifierModeHolds.set(event.code, held);
    animateModifierModeProgress();
  }, true);
  window.addEventListener('keyup', event => {
    const held = modifierModeHolds.get(event.code);
    if (!held) return;
    clearTimeout(held.timer); modifierModeHolds.delete(event.code);
    updateModifierModePreview();
    if (!held.ready || held.used || document.activeElement !== held.target || !modifierModeAllowed(held.mode)) return;
    event.preventDefault(); event.stopImmediatePropagation();
    // Commit on release, so even a slowly entered Ctrl/Shift shortcut stays a shortcut.
    toggleSmallMode(held.mode);
    scheduleTutorialCheck();
  }, true);
  window.addEventListener('pointerdown', () => {
    for (const held of modifierModeHolds.values()) held.used = true;
    updateModifierModePreview();
  }, true);
  window.addEventListener('blur', cancelModifierModeHolds);
  document.addEventListener('focusout', event => {
    if (event.target === $('editor')) cancelModifierModeHolds();
  });
}

// Z, L and M follow the typed character across keyboard layouts.
function actionHoldCode(event) {
  const letter = String(event.key).toLowerCase();
  if (['z', 'l', 'm'].includes(letter)) return 'Key' + letter.toUpperCase();
  if (['KeyL', 'KeyM'].includes(event.code)) return '';
  return event.code === 'KeyZ' ? 'KeyY' : event.code;
}

function initialiseExtendedControls() {
  for (const [trigger, id] of [['parenOpenMore', 'bracketOpenMenu'], ['parenCloseMore', 'bracketCloseMenu'], ['rootMore', 'rootChoiceMenu'], ['integralMore', 'integralChoiceMenu'], ['logicMore', 'logicMenu'], ['setsMore', 'setsMenu'], ['miscMore', 'miscMenu'], ['taskLabelMore', 'taskLabelMenu']]) {
    $(trigger).onclick = event => extraMenu === id ? closeExtraMenu() : openExtraMenu(id, $(trigger), event);
    $(trigger).addEventListener('pointerdown', e => e.preventDefault());
  }
  for (const id of ['bracketOpenMenu', 'bracketCloseMenu', 'rootChoiceMenu', 'integralChoiceMenu', 'logicMenu', 'setsMenu', 'miscMenu', 'taskLabelMenu', 'paperChoiceMenu']) {
    $(id).addEventListener('pointerdown', event => event.preventDefault());
    for (const button of $(id).querySelectorAll('button')) button.onclick = event => chooseExtra(button, event);
  }
  window.addEventListener('pointerdown', event => {
    for (const code of [...actionHolds.keys()]) if (!actionHolds.get(code).fired) finishActionHold(code);
    if (extraMenu && !event.target.closest?.('#' + extraMenu + ',#parenOpenMore,#parenCloseMore,#rootMore,#integralMore,#logicMore,#setsMore,#miscMore,#taskLabelMore')) closeExtraMenu();
    if (keyboardArea?.mode === 'erase' && !event.target.closest?.('#virtualKeypad')) cancelKeyboardArea();
    else if (keyboardArea && event.target.closest?.('#paper')) {
      keyboardArea = null; document.querySelector('.keyboard-area')?.remove();
    }
  }, true);
  window.addEventListener('keydown', event => {
    for (const code of [...actionHolds.keys()]) if (code !== actionHoldCode(event)) finishActionHold(code, true);
    if (event.repeat && actionHolds.get(actionHoldCode(event))?.fired) { event.preventDefault(); event.stopImmediatePropagation(); return; }
    if (extraMenu && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (event.key === 'Escape') { closeExtraMenu(); return; }
      const buttons = [...$(extraMenu).querySelectorAll('button')];
      let i = Math.max(0, buttons.findIndex(b => b.classList.contains('menu-current')));
      if (event.key === 'Enter') { if (!event.repeat) chooseExtra(buttons[i], event); }
      else {
        buttons[i].classList.remove('menu-current');
        if (extraMenu === 'rootChoiceMenu' || extraMenu === 'integralChoiceMenu') {
          const row = Math.floor(i / 2), col = i % 2;
          if (event.key === 'ArrowLeft') i = row * 2;
          if (event.key === 'ArrowRight') i = row * 2 + 1;
          if (event.key === 'ArrowUp') i = Math.max(0, row - 1) * 2 + col;
          if (event.key === 'ArrowDown') i = Math.min(4, row + 1) * 2 + col;
        } else {
          const grid = ['bracketOpenMenu', 'bracketCloseMenu', 'logicMenu', 'setsMenu', 'miscMenu'].includes(extraMenu);
          const delta = grid && ['ArrowUp', 'ArrowDown'].includes(event.key) ? 4 : 1;
          i = (i + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -delta : delta) + buttons.length) % buttons.length;
        }
        buttons[i].classList.add('menu-current');
        buttons[i].scrollIntoView({ block: 'nearest' });
      }
      return;
    }
    const editor = event.target === $('editor');
    const plain = !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey;
    if (keyboardArea && plain && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(event.key)) {
      event.preventDefault(); event.stopImmediatePropagation();
      if (event.key === 'Escape') { cancelKeyboardArea(); return; }
      if (event.key === 'Enter') { if (keyboardArea.phase === 'place' && !event.repeat) confirmKeyboardArea(); return; }
      const area = keyboardArea;
      if (area.phase === 'select') {
        const p = area.cursor;
        if (event.key === 'ArrowLeft') p[0] = Math.max(0, p[0] - 1);
        if (event.key === 'ArrowRight') p[0] = Math.min(COLS - 1, p[0] + 1);
        if (event.key === 'ArrowUp') p[1] = Math.max(0, p[1] - 1);
        if (event.key === 'ArrowDown') p[1] = Math.min(ROWS - 1, p[1] + 1);
        renderKeyboardArea();
      } else {
        let col = pos % COLS, row = Math.floor(pos / COLS);
        if (event.key === 'ArrowLeft') col--;
        if (event.key === 'ArrowRight') col++;
        if (event.key === 'ArrowUp') row--;
        if (event.key === 'ArrowDown') row++;
        col = Math.max(0, Math.min(COLS - region.rect.w, col));
        row = Math.max(0, Math.min(ROWS - region.rect.h, row));
        select(row * COLS + col, true, true);
        region.target = { x: col, y: row }; renderRegion();
        const step = tutorial?.steps[tutorial.index];
        if (step?.kind === 'regionPlace' && pos === step.index) confirmKeyboardArea();
      }
      scheduleTutorialCheck();
      return;
    }
    const bracketKey = /^(?:Digit|Numpad)[89]$/.test(actionHoldCode(event));
    const zoomKey = event.key === '+' || event.key === '-';
    const supported = /^(?:Digit|Numpad)[5-7]$/.test(actionHoldCode(event)) || zoomKey || bracketKey || ['KeyF', 'KeyA', 'KeyL', 'KeyM', 'KeyB', 'KeyO', 'KeyS', 'KeyG', 'KeyK', 'KeyI', 'KeyU', 'KeyZ', 'KeyQ', 'KeyW', 'KeyN', 'KeyR', 'KeyX', 'KeyC', 'KeyE', 'KeyD', 'PageUp', 'PageDown', 'Insert', 'Delete'].includes(actionHoldCode(event));
    if (keyboardArea && plain && !supported) {
      event.preventDefault(); event.stopImmediatePropagation(); return;
    }
    if (!editor || !(plain || actionHoldCode(event) === 'KeyW' && !event.ctrlKey && !event.altKey && !event.metaKey || zoomKey && !event.ctrlKey && !event.altKey && !event.metaKey) || !event.isTrusted || !supported || !tutorialHoldAllowed(actionHoldCode(event)) || extraMenu || greekMenuOpen || relationMenuOpen) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (!actionHolds.has(actionHoldCode(event))) {
      const held = { key: event.key, target: event.target, ctrlKey: event.ctrlKey, shiftKey: event.shiftKey, fired: false };
      held.timer = setTimeout(() => {
        if (document.activeElement !== held.target || !tutorialHoldAllowed(actionHoldCode(event))) return;
        held.fired = true; runHeldAction(actionHoldCode(event));
      }, settings.holdDelay);
      actionHolds.set(actionHoldCode(event), held);
      const code = actionHoldCode(event);
      showButtonHoldProgress(held, actionHoldButton(code, held), () => actionHolds.get(code) === held);
    }
  }, true);
  window.addEventListener('keyup', event => {
    if (!actionHolds.has(actionHoldCode(event))) return;
    event.preventDefault(); event.stopImmediatePropagation(); finishActionHold(actionHoldCode(event), true);
  }, true);
  window.addEventListener('blur', () => {
    for (const code of [...actionHolds.keys()]) finishActionHold(code);
    closeExtraMenu(); cancelKeyboardArea();
  });
  document.addEventListener('focusout', event => {
    if (event.target === $('editor')) for (const code of [...actionHolds.keys()]) {
      if (!actionHolds.get(code).fired) finishActionHold(code);
    }
  });
  window.addEventListener('resize', closeExtraMenu);
  localiseInterface();
}
