// Decimal separators are a third cell layer, independent of the main character.
// @part part-01
// Slightly beyond the cell edge, leaving room for the right-aligned subscript.
const DECIMAL_MARK_X = 10.5;
let decimalInput = null;
function writeDecimalMark(character, index) {
  doc.decimalMarks[page][index] = { text: character, color: ink };
}
function drawDecimalMarks(layer) {
  for (const [index, mark] of Object.entries(doc.decimalMarks[page])) {
    geoSvg('text', { x: DECIMAL_MARK_X + (+index % COLS) * 5, y: 9.7 + Math.floor(+index / COLS) * 5,
      class: 'decimal-mark', 'font-size': 4.2, fill: mark.color,
      'text-anchor': 'start', 'dominant-baseline': 'alphabetic' }, layer).textContent = mark.text;
  }
}
