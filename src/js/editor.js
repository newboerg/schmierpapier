// editor — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function write(text) {
  if (smallMode) {
    writeSmallSequence(text);
    return
  }
  const chars = Array.from(text.replace(/÷/g, ':').replace(/\*/g, '·').replace(/\r/g, ''));
  if (!chars.length) return;
  if (largeMode && isTallCharacter(chars[0]) && pos + COLS >= COUNT) {
    status(tr('Für doppelhohe Schrift fehlt unten ein Kästchen.'));
    select(pos); return;
  }
  checkpoint();
  let cursor = pos,
    startCol = pos % COLS;
  for (const ch of chars) {
    if (ch === '\n') {
      cursor = (Math.floor(cursor / COLS) + (largeMode ? 2 : 1)) * COLS + startCol;
      if (cursor >= COUNT) break;
      continue
    }
    if (/[\u0000-\u001f\u007f]/.test(ch)) continue;
    if (cursor >= COUNT) break;
    if (largeMode && isTallCharacter(ch)) {
      if (cursor + COLS >= COUNT) {
        status(tr('Für doppelhohe Schrift fehlt unten ein Kästchen.'));
        break;
      }
      writeTallCharacter(cursor, ch);
    } else if (ch === ' ') {
      delete doc.pages[page][cursor];
      doc.tallBrackets[page] = doc.tallBrackets[page].filter(b => !b.text || !bracketOccupies(b, cursor));
    } else {
      doc.tallBrackets[page] = doc.tallBrackets[page].filter(b => !b.text || !bracketOccupies(b, cursor));
      doc.pages[page][cursor] = ch;
      doc.inks[page][cursor] = ink
    }
    cursor += largeMode && cursor % COLS === COLS - 1 ? COLS + 1 : 1;
  }
  pos = Math.min(cursor, COUNT - 1);
  changed();
  select(pos)
}

// @part part-02
$('cells').addEventListener('click', e => {
  const cell = e.target.closest('.cell');
  if (cell && tool === 'pen') select(Number(cell.dataset.index), true, true)
});
$('editor').addEventListener('input', e => {
  if (!e.isComposing) {
    const value = e.target.value;
    if (value) write(value)
  }
});
$('editor').addEventListener('click', () => {
  returnColumn = pos % COLS;
  $('editor').select();
});
$('editor').addEventListener('paste', e => {
  e.preventDefault();
  write(e.clipboardData.getData('text/plain'))
});
$('editor').addEventListener('keydown', e => {
  if (smallMode && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && /^(?:Digit|Numpad)[0-9]$/.test(
      e.code)) {
    e.preventDefault();
    writeSmallSequence(e.code.slice(-1));
    return
  }
  if (smallMode && (e.key === 'Backspace' || e.key === 'Delete')) {
    e.preventDefault();
    const entry = doc[smallMode][page][pos];
    if (entry) {
      checkpoint();
      const text = e.key === 'Backspace' ? Array.from(entry.text).slice(0, -1).join('') : '';
      if (text) entry.text = text;
      else delete doc[smallMode][page][pos];
      changed();
      select(pos);
      return
    }
  }
  if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey && (e.code === 'Digit8' || e.code ===
    'Digit9')) {
    e.preventDefault();
    write(e.code === 'Digit8' ? '[' : ']');
    return
  }
  if (e.code === 'NumpadMultiply') {
    e.preventDefault();
    write('·');
    return
  }
  if (e.code === 'NumpadDivide') {
    e.preventDefault();
    write(':');
    return
  }
  if (e.key === 'Enter' && (e.ctrlKey || e.shiftKey) && !e.altKey && !e.metaKey) {
    e.preventDefault();
    const upper = e.ctrlKey ? pos : pos - COLS;
    if (upper >= 0 && upper + COLS < COUNT) {
      checkpoint();
      doc.fractionEquals[page][upper] = ink;
      changed();
      select(pos)
    }
    return
  }
  const digit = e.code.match(/^(?:Digit|Numpad)([0-9])$/);
  if (digit && !e.metaKey && !e.altKey) {
    if (e.ctrlKey && !e.shiftKey) {
      e.preventDefault();
      writeCarry(digit[1]);
      return
    }
    if (e.shiftKey && !e.ctrlKey) {
      e.preventDefault();
      writePower(digit[1]);
      return
    }
  }
  if (e.code === 'NumpadEnter') {
    e.preventDefault();
    write('=');
    return
  }
  if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey && /^Digit[0-9]$/.test(e.code)) {
    e.preventDefault();
    write(e.code.slice(-1));
    return
  }
  const col = pos % COLS,
    row = Math.floor(pos / COLS);
  let target;
  if (e.key === 'ArrowLeft') target = pos - 1;
  if (e.key === 'ArrowRight') target = pos + 1;
  if (e.key === 'ArrowUp') target = pos - COLS;
  if (e.key === 'ArrowDown') target = pos + COLS;
  if (e.key === 'Enter') target = Math.min(row + (largeMode ? 2 : 1), ROWS - 1) * COLS + returnColumn;
  if (e.key === 'Home') target = row * COLS;
  if (e.key === 'End') target = row * COLS + COLS - 1;
  if (e.key === 'Tab') target = pos + (e.shiftKey ? -1 : 1);
  if (target !== undefined) {
    e.preventDefault();
    select(target, true, e.key !== 'Enter');
    if (tutorial?.steps[tutorial.index]?.kind === 'cell') nodes[pos].scrollIntoView({ block: 'nearest', inline: 'nearest' });
    return
  }
  if (e.key === 'Backspace' || e.key === 'Delete') {
    e.preventDefault();
    checkpoint();
    if (e.key === 'Backspace' && !doc.pages[page][pos] && !doc.carries[page][pos] && !doc.powers[page][
        pos] && !doc.fractionEquals[page][pos] && !doc.fractionEquals[page][pos - COLS] && !doc
      .tallBrackets[page].some(b => bracketOccupies(b, pos))) pos = Math.max(0, pos -
    1);
    const bracketIndex = doc.tallBrackets[page].findIndex(b => bracketOccupies(b, pos));
    if (bracketIndex >= 0) {
      const removed = doc.tallBrackets[page].splice(bracketIndex, 1)[0];
      if (removed.side === '∫') removeIntegralLimits(removed.upper, removed.height ?? 2);
      if (removed.side === '√' && doc.powers[page][removed.upper]?.rootDegree) delete doc.powers[page][removed.upper];
    }
    else if (doc.fractionEquals[page][pos]) delete doc.fractionEquals[page][pos];
    else if (doc.fractionEquals[page][pos - COLS]) delete doc.fractionEquals[page][pos - COLS];
    else if (doc.pages[page][pos] === '∫' && (doc.powers[page][pos]?.integralLimit || doc.carries[page][pos]?.integralLimit)) {
      removeIntegralLimits(pos);
      delete doc.pages[page][pos];
    }
    else if (doc.powers[page][pos]) delete doc.powers[page][pos];
    else if (doc.carries[page][pos]) delete doc.carries[page][pos];
    else delete doc.pages[page][pos];
    changed();
    select(pos)
  }
});
