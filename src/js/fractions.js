// Fraction convenience input produces ordinary characters, decimal marks and a pen line.
// @part part-01
function fractionCells(value) {
  const cells = [];
  for (const character of Array.from(value.trim().replace(/÷/g, ':').replace(/\*/g, '·'))) {
    if (character === '.' || character === ',') {
      if (!cells.length) cells.push({ text: ' ', mark: character });
      else cells[cells.length - 1].mark = character;
    } else cells.push({ text: character });
  }
  return cells;
}
async function insertFraction() {
  if (tutorial || imageSession || document.querySelector('dialog[open]')) return;
  finishActionHold('KeyV');
  const start = pos, col = start % COLS, row = Math.floor(start / COLS);
  if (row >= ROWS - 1) {
    alert(tr('Für den Bruch fehlt unten eine zweite Kästchenzeile.')); select(start); return;
  }
  const numerator = await requestInput(tr('Zähler eingeben (zum Beispiel 12):'), {value:''});
  if (numerator === null || !numerator.trim()) { select(start); return; }
  const denominator = await requestInput(tr('Nenner eingeben (zum Beispiel 25):'), {value:''});
  if (denominator === null || !denominator.trim()) { select(start); return; }
  if (/[\u0000-\u001f\u007f]/.test(numerator + denominator)) {
    alert(tr('Bitte Zähler und Nenner jeweils in einer Zeile eingeben.')); select(start); return;
  }
  const top = fractionCells(numerator), bottom = fractionCells(denominator);
  const width = Math.max(top.length, bottom.length);
  if (width > COLS - col) {
    alert(tr('Der Bruch passt hier nicht auf das Blatt. Wähle ein Kästchen weiter links oder kürzere Eingaben.'));
    select(start); return;
  }
  cancelKeyboardArea(); cancelKeyboardLine(); cancelRegion(); cancelStrike();
  hideCompass(); cancelNumberLine(false); finishMark(); resetCorner();
  checkpoint();
  // Clear the two occupied rows, including spanning characters, as for ordinary replacement.
  for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < width; dx++) {
    const index = start + dy * COLS + dx;
    removeLabelsAt(index);
    doc.tallBrackets[page] = doc.tallBrackets[page].filter(bracket => {
      if (!bracketOccupies(bracket, index)) return true;
      if (bracket.side === '∫') removeIntegralLimits(bracket.upper, bracket.height ?? 2);
      if (bracket.side === '√' && doc.powers[page][bracket.upper]?.rootDegree) delete doc.powers[page][bracket.upper];
      return false;
    });
    for (const field of ['pages', 'inks', 'powers', 'carries', 'decimalMarks']) delete doc[field][page][index];
    delete doc.fractionEquals[page][index]; delete doc.fractionEquals[page][index - COLS];
  }
  for (const [dy, cells] of [[0, top], [1, bottom]]) {
    const offset = Math.floor((width - cells.length) / 2);
    cells.forEach((cell, i) => {
      const index = start + dy * COLS + offset + i;
      if (cell.text !== ' ') { doc.pages[page][index] = cell.text; doc.inks[page][index] = ink; }
      if (cell.mark) writeDecimalMark(cell.mark, index);
    });
  }
  // Existing strokes count as coverage. Only fill missing parts, never toggle a bar off.
  const x1 = col + 1, x2 = x1 + width, y = row + 2;
  const intervals = doc.lines[page].filter(l => Math.abs(l[1]-y)<1e-7 && Math.abs(l[3]-y)<1e-7)
    .map(l => [Math.min(l[0],l[2]), Math.max(l[0],l[2])]).sort((a,b) => a[0]-b[0]);
  let covered = x1;
  for (const [left, right] of intervals) {
    if (left > covered + 1e-7) break;
    covered = Math.max(covered, right);
  }
  if (covered < x2 - 1e-7) doc.lines[page] = toggleLineCoverage(doc.lines[page], [x1,y], [x2,y], ink, false);
  decimalInput = null;
  changed(); select(row * COLS + Math.min(COLS - 1, col + width), true, true);
}
function initialiseFractions() {
  $('fractionInsert').onclick = insertFraction;
  $('fractionInsert').addEventListener('pointerdown', event => event.preventDefault());
}
