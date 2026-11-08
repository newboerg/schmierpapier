// A latched writing mode for the whole-number part of mixed fractions, among other uses.

// @part part-01
let largeMode = false;
const tallTextMeasure = document.createElement('canvas').getContext('2d');

function isTallCharacter(text) {
  return typeof text === 'string' && Array.from(text).length === 1 &&
    /^[\p{L}\p{N}\p{P}\p{S}]$/u.test(text);
}

function tallCharacterWidth(text) {
  tallTextMeasure.font = '11px ' + writingFont();
  return Math.min(4.2, tallTextMeasure.measureText(text).width);
}

function updateLargeModeButton() {
  $('largeMode').setAttribute('aria-pressed', String(largeMode));
}

function toggleLargeMode() {
  largeMode = !largeMode;
  if (largeMode) {
    smallMode = null; smallFresh = false;
    $('carryMode').setAttribute('aria-pressed', 'false');
    $('powerMode').setAttribute('aria-pressed', 'false');
  }
  updateLargeModeButton();
  render(); select(pos);
  status(tr(largeMode ? 'Doppelhohe Schrift eingeschaltet' : 'Doppelhohe Schrift ausgeschaltet'));
}

function writeTallCharacter(index, text) {
  // Replace overlapping large letters as a whole; ordinary text in the two cells is overwritten.
  doc.tallBrackets[page] = doc.tallBrackets[page].filter(b => !b.text ||
    !bracketOccupies(b, index) && !bracketOccupies(b, index + COLS));
  for (const cell of [index, index + COLS]) {
    removeLabelsAt(cell);
    delete doc.pages[page][cell];
    delete doc.inks[page][cell];
  }
  doc.tallBrackets[page].push({ upper: index, side: text, color: ink, height: 2, text: true });
}

function drawTallCharacter(layer, character) {
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('class', 'tall-character');
  text.setAttribute('x', 7.5 + (character.upper % COLS) * 5);
  text.setAttribute('y', 10 + Math.floor(character.upper / COLS) * 5);
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('dominant-baseline', 'central');
  text.setAttribute('font-family', writingFont());
  text.setAttribute('font-size', '11');
  text.setAttribute('textLength', tallCharacterWidth(character.side));
  text.setAttribute('lengthAdjust', 'spacingAndGlyphs');
  text.setAttribute('fill', character.color);
  text.textContent = character.side;
  layer.append(text);
}

$('largeMode').onclick = toggleLargeMode;
function refreshTallTextFonts() {
  if (doc.tallBrackets.some(list => list.some(character => character.text))) render();
}
document.fonts.ready.then(refreshTallTextFonts);
document.fonts.addEventListener('loadingdone', refreshTallTextFonts);
