// brackets — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * ZEICHEN UND KOORDINATEN
 * Schreibpositionen sind flache Indizes: Zeile * COLS + Spalte.
 * Normale Linien und Zahlenstrahlen verwenden 5-mm-Einheiten (1 mm = 0,2 Einheiten).
 * Bleistiftlinien, Geodreieck und Zirkel verwenden echte Millimeter.
 * Die Papierart steuert nur die Zeichenrastung; Schreibkästchen bleiben immer 5 mm groß.
 */
function bracketPath(bracket) {
  if (bracket.height !== undefined) return stretchBracketPath(bracket);
  const x = 5 + (bracket.upper % COLS) * 5,
    y = 5 + Math.floor(bracket.upper / COLS) * 5;
  if (bracket.side === '√') return rootPath(bracket.upper, 10);
  if (relationSymbols.includes(bracket.side)) return relationPath(bracket.side, bracket.upper);
  if (bracket.side === '{')
  return `M ${x+3.8} ${y+.5} C ${x+1.5} ${y+.5} ${x+2.8} ${y+3.7} ${x+1.2} ${y+5} C ${x+2.8} ${y+6.3} ${x+1.5} ${y+9.5} ${x+3.8} ${y+9.5}`;
  if (bracket.side === '}')
  return `M ${x+1.2} ${y+.5} C ${x+3.5} ${y+.5} ${x+2.2} ${y+3.7} ${x+3.8} ${y+5} C ${x+2.2} ${y+6.3} ${x+3.5} ${y+9.5} ${x+1.2} ${y+9.5}`;
  if (bracket.side === '∫') return `M ${x+4} ${y+.8} C ${x+1.2} ${y-1} ${x+3.5} ${y+10.8} ${x+1} ${y+9.2}`;
  if (bracket.side === '(') return `M ${x+3.5} ${y+.6} C ${x+.8} ${y+2.2} ${x+.8} ${y+7.8} ${x+3.5} ${y+9.4}`;
  if (bracket.side === ')')
  return `M ${x+1.5} ${y+.6} C ${x+4.2} ${y+2.2} ${x+4.2} ${y+7.8} ${x+1.5} ${y+9.4}`;
  return bracket.side === '[' ? `M ${x+3.5} ${y+.6} H ${x+1.5} V ${y+9.4} H ${x+3.5}` :
    `M ${x+1.5} ${y+.6} H ${x+3.5} V ${y+9.4} H ${x+1.5}`
}

function insertBracket(side, event) {
  if (event.ctrlKey || event.shiftKey) {
    const upper = event.ctrlKey ? pos : pos - COLS;
    if (upper < 0 || upper + COLS >= COUNT) return;
    checkpoint();
    const list = doc.tallBrackets[page],
      existing = list.find(b => b.upper === upper && b.side === side && (b.height ?? 2) === 2);
    if (existing) existing.color = ink;
    else list.push({
      upper,
      side,
      color: ink
    });
    if (pos % COLS < COLS - 1) pos++;
    changed();
    select(pos)
  } else write(side);
}

// @part part-02
$('braceOpen').onclick = e => insertBracket('{', e);
$('braceClose').onclick = e => insertBracket('}', e);
$('parenOpen').onclick = e => insertBracket('(', e);
$('parenClose').onclick = e => insertBracket(')', e);
$('bracketOpen').onclick = e => insertBracket('[', e);
$('bracketClose').onclick = e => insertBracket(']', e);

// Feature action called by the shared keyboard dispatcher.
function holdBracketMenu(code) {
  const opening = code.endsWith('8');
  openExtraMenu(opening ? 'bracketOpenMenu' : 'bracketCloseMenu',
    $(opening ? 'parenOpenMore' : 'parenCloseMore'), actionHolds.get(code));
}

// Variable-height brackets use an optional height in cells; old records stay two cells tall.
let stretchBracket = null;

function bracketLastIndex(bracket) {
  return bracket.upper + ((bracket.height ?? 2) - 1) * COLS;
}

function bracketOccupies(bracket, index) {
  return index % COLS === bracket.upper % COLS && index >= bracket.upper && index <= bracketLastIndex(bracket);
}

function stretchBracketPath(bracket) {
  const x = 5 + (bracket.upper % COLS) * 5, y = 5 + Math.floor(bracket.upper / COLS) * 5;
  const h = bracket.height * 5, mid = y + h / 2;
  if (bracket.side === '√') return rootPath(bracket.upper, h);
  if (bracket.side === '∫') return `M ${x+4} ${y+.8} C ${x+1.2} ${y-1} ${x+3.5} ${y+h+.8} ${x+1} ${y+h-.8}`;
  if (bracket.side === '(' || bracket.side === ')') {
    const end = x + (bracket.side === '(' ? 3.5 : 1.5), bend = x + (bracket.side === '(' ? .8 : 4.2);
    return `M ${end} ${y+.6} C ${bend} ${y+h*.22} ${bend} ${y+h*.78} ${end} ${y+h-.6}`;
  }
  if (bracket.side === '[' || bracket.side === ']') {
    const end = x + (bracket.side === '[' ? 3.5 : 1.5), back = x + (bracket.side === '[' ? 1.5 : 3.5);
    return `M ${end} ${y+.6} H ${back} V ${y+h-.6} H ${end}`;
  }
  if (bracket.side === '{' || bracket.side === '}') {
    const opening = bracket.side === '{', end = x + (opening ? 3.8 : 1.2),
      outer = x + (opening ? 1.5 : 3.5), inner = x + (opening ? 2.8 : 2.2), tip = x + (opening ? 1.2 : 3.8);
    return `M ${end} ${y+.5} C ${outer} ${y+.5} ${inner} ${mid-1.3} ${tip} ${mid} C ${inner} ${mid+1.3} ${outer} ${y+h-.5} ${end} ${y+h-.5}`;
  }
  const end = x + (bracket.side === '<' ? 4.1 : .9), tip = x + (bracket.side === '<' ? .9 : 4.1);
  return `M ${end} ${y+.6} L ${tip} ${mid} L ${end} ${y+h-.6}`;
}

function stretchBracketRecord() {
  const state = stretchBracket;
  return { upper: Math.min(state.anchor, state.end), height: Math.abs(state.end - state.anchor) / COLS + 1,
    side: state.side, color: state.color };
}

function drawStretchBracketPreview() {
  if (!stretchBracket || stretchBracket.page !== page || stretchBracket.document !== doc) return;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', stretchBracketPath(stretchBracketRecord()));
  path.setAttribute('class', 'stretch-bracket-preview');
  $('lineLayer').append(path);
  const record = stretchBracketRecord(), x = 5 + record.upper % COLS * 5,
    y = 5 + Math.floor(record.upper / COLS) * 5, parameters = stretchBracket.parameters;
  const label = (value, left, top, hanging = false) => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('class', 'stretch-bracket-preview');
    text.setAttribute('x', left); text.setAttribute('y', top);
    text.setAttribute('font-family', 'OfflineHandschrift, OfflineSymbols, cursive');
    text.setAttribute('font-size', '2');
    if (hanging) text.setAttribute('dominant-baseline', 'hanging');
    text.style.fill = '#d52d35'; text.style.stroke = 'none';
    text.textContent = value;
    $('lineLayer').append(text);
  };
  if (parameters.degree) label(parameters.degree, x + .1, y + .1, true);
  if (parameters.limits) {
    label(parameters.limits.upper, x + 4.3, y, true);
    label(parameters.limits.lower, x + 3.1, y + record.height * 5);
  }
}

function keepBracketCellVisible(index) {
  const rect = nodes[index].getBoundingClientRect();
  const top = document.querySelector('header').getBoundingClientRect().bottom + 8;
  if (rect.top < top) window.scrollBy(0, rect.top - top);
  else if (rect.bottom > innerHeight - 12) window.scrollBy(0, rect.bottom - innerHeight + 12);
}

function cancelStretchBracket(restorePosition = true) {
  const state = stretchBracket;
  stretchBracket = null;
  document.querySelectorAll('.stretch-bracket-preview').forEach(node => node.remove());
  if (state && restorePosition && state.page === page && state.document === doc) {
    select(state.anchor);
    keepBracketCellVisible(state.anchor);
    status(tr('Größenauswahl abgebrochen'));
  }
}

function beginStretchBracket(side, direction, parameters = {}) {
  cancelStretchBracket();
  finishPenGesture();
  hideCompass();
  geo.visible = false; geo.keyboard = null; geo.gesture = null;
  $('geoOverlay')?.remove(); $('geoToggle').setAttribute('aria-pressed', 'false');
  cancelNumberLine(false); cancelKeyboardLine(); cancelKeyboardArea(); cancelRegion(); cancelStrike(); finishMark(); resetCorner();
  const row = Math.floor(pos / COLS), targetRow = Math.max(0, Math.min(ROWS - 1, row + direction));
  stretchBracket = { anchor: pos, end: targetRow * COLS + pos % COLS, page, document: doc, side, direction, color: ink, parameters,
    pendingInput: !!(parameters.degree || parameters.limits), inputAfter: performance.now() };
  if (stretchBracket.pendingInput) {
    const state = stretchBracket;
    // Native prompts may deliver their final key/focus events after returning.
    // Keep the preview alive through that handoff; accept only a fresh input afterwards.
    const activate = () => {
      if (stretchBracket !== state) return;
      if (!document.hasFocus()) { requestAnimationFrame(activate); return; }
      requestAnimationFrame(() => {
        if (stretchBracket !== state) return;
        if (!document.hasFocus()) { requestAnimationFrame(activate); return; }
        state.inputAfter = performance.now();
        state.pendingInput = false;
      });
    };
    requestAnimationFrame(activate);
  }
  status(tr('Höhe wählen: Hoch/Runter oder Zielkästchen anklicken · Enter bestätigt · Esc bricht ab'));
  select(stretchBracket.end);
  renderLines();
}

function setStretchBracketRow(row) {
  const state = stretchBracket, startRow = Math.floor(state.anchor / COLS);
  row = Math.max(0, Math.min(ROWS - 1, row));
  row = state.direction < 0 ? Math.min(startRow, row) : Math.max(startRow, row);
  state.end = row * COLS + state.anchor % COLS;
  select(state.end, false);
  renderLines();
}

function commitStretchBracket() {
  const state = stretchBracket;
  if (!state || state.page !== page || state.document !== doc) { cancelStretchBracket(false); return; }
  const record = stretchBracketRecord();
  checkpoint();
  const existing = doc.tallBrackets[page].find(b => b.upper === record.upper && b.side === record.side && (b.height ?? 2) === record.height);
  if (existing) existing.color = record.color;
  else doc.tallBrackets[page].push(record);
  if (record.side === '√') {
    if (doc.powers[page][record.upper]?.rootDegree) delete doc.powers[page][record.upper];
    if (state.parameters.degree) doc.powers[page][record.upper] = { text: state.parameters.degree, color: record.color, rootDegree: true };
  }
  if (record.side === '∫') {
    removeIntegralLimits(record.upper, record.height);
    if (state.parameters.limits) {
      doc.powers[page][record.upper] = { text: state.parameters.limits.upper, color: record.color, integralLimit: true };
      doc.carries[page][bracketLastIndex(record)] = { text: state.parameters.limits.lower, color: record.color, integralLimit: true };
    }
  }
  stretchBracket = null;
  changed();
  select(state.anchor % COLS < COLS - 1 ? state.anchor + 1 : state.anchor);
  keepBracketCellVisible(pos);
  status(tr('Zeichen eingefügt'));
}

function initialiseStretchBrackets() {
  window.addEventListener('keydown', event => {
    if (!stretchBracket) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (stretchBracket.pendingInput || event.timeStamp < stretchBracket.inputAfter) return;
    if (event.key === 'Escape') { cancelStretchBracket(); return; }
    if (event.key === 'Enter' && !event.repeat) { commitStretchBracket(); return; }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      setStretchBracketRow(Math.floor(stretchBracket.end / COLS) + (event.key === 'ArrowUp' ? -1 : 1));
      keepBracketCellVisible(stretchBracket.end);
    }
  }, true);
  const paperRow = event => {
    const rect = $('paper').getBoundingClientRect();
    return Math.floor(((event.clientY - rect.top) * 297 / rect.height - 5) / 5);
  };
  window.addEventListener('pointermove', event => {
    if (!stretchBracket || !event.target.closest?.('#paper')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (stretchBracket.pendingInput || event.timeStamp < stretchBracket.inputAfter) return;
    setStretchBracketRow(paperRow(event));
  }, true);
  window.addEventListener('pointerdown', event => {
    if (!stretchBracket) return;
    if (stretchBracket.pendingInput || event.timeStamp < stretchBracket.inputAfter) {
      event.preventDefault(); event.stopImmediatePropagation(); return;
    }
    if (!event.target.closest?.('#paper')) { cancelStretchBracket(); return; }
    event.preventDefault(); event.stopImmediatePropagation();
    if (event.button === 0) setStretchBracketRow(paperRow(event));
  }, true);
  window.addEventListener('click', event => {
    if (!stretchBracket || !event.target.closest?.('#paper')) return;
    event.preventDefault(); event.stopImmediatePropagation();
    if (stretchBracket.pendingInput || event.timeStamp < stretchBracket.inputAfter) return;
    setStretchBracketRow(paperRow(event));
    commitStretchBracket();
  }, true);
  window.addEventListener('blur', event => {
    if (stretchBracket?.pendingInput || stretchBracket && event.timeStamp < stretchBracket.inputAfter) return;
    cancelStretchBracket();
  });
}

// Parameter entry finishes before placement starts; cancelling never changes the document.
function beginStretchChoice(button) {
  const parameters = {};
  if (button.dataset.rootDegree) {
    parameters.degree = askRootDegree();
    if (parameters.degree === null) { select(pos); return; }
  }
  if (button.dataset.definite) {
    parameters.limits = askIntegralLimits();
    if (parameters.limits === null) { select(pos); return; }
  }
  beginStretchBracket(button.dataset.symbol, button.dataset.stretch === 'up' ? -1 : 1, parameters);
}
