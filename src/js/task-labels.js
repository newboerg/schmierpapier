// Task prefixes fit a two-cell-wide box; size comes from the rendered font metrics.
// @part part-01
function labelOccupies(index, label, cell) {
  const dx = cell % COLS - index % COLS;
  const dy = Math.floor(cell / COLS) - Math.floor(index / COLS);
  return dx >= 0 && dx < 2 && dy >= 0 && dy < label.height;
}
function removeLabelsAt(index) {
  for (const [key, label] of Object.entries(doc.taskLabels[page])) {
    if (labelOccupies(+key, label, index)) delete doc.taskLabels[page][key];
  }
}
function taskLabelFontSize(label) {
  const base = label.height === 2 ? 11 : 5.5;
  tallTextMeasure.font = base + 'px ' + writingFont();
  return base * Math.min(1, 9.2 / Math.max(.01, tallTextMeasure.measureText(label.text).width));
}
async function insertTaskLabel(height = 1) {
  const index = pos;
  if (index % COLS >= COLS - 1 || index + (height - 1) * COLS >= COUNT) {
    status(tr('Für diese Aufgabenbezeichnung fehlen Kästchen am Seitenrand.')); select(pos); return;
  }
  const value = await requestInput(tr('Aufgabenbezeichnung eingeben (zum Beispiel 1a):'), {value:doc.taskLabels[page][index]?.text || ''});
  if (value === null || !value.trim()) { select(pos); return; }
  const text = value.replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
  if (text.length > 10000) { alert(tr('Die Aufgabenbezeichnung ist zu lang (maximal 10000 Zeichen).')); select(pos); return; }
  checkpoint();
  for (let row = 0; row < height; row++) for (let col = 0; col < 2; col++) {
    const cell = index + row * COLS + col;
    removeLabelsAt(cell);
    doc.tallBrackets[page] = doc.tallBrackets[page].filter(b => {
      if (!bracketOccupies(b, cell)) return true;
      if (b.side === '∫') removeIntegralLimits(b.upper, b.height ?? 2);
      if (b.side === '√' && doc.powers[page][b.upper]?.rootDegree) delete doc.powers[page][b.upper];
      return false;
    });
    for (const field of ['pages', 'inks', 'powers', 'carries', 'decimalMarks']) delete doc[field][page][cell];
    delete doc.fractionEquals[page][cell]; delete doc.fractionEquals[page][cell - COLS];
  }
  doc.taskLabels[page][index] = { text, color: ink, height };
  changed(); select(Math.min(COUNT - 1, index + 2));
}
function drawTaskLabels(layer) {
  for (const [index, label] of Object.entries(doc.taskLabels[page])) {
    geoSvg('text', { x: 10 + (+index % COLS) * 5,
      y: 5 + Math.floor(+index / COLS) * 5 + label.height * 2.5,
      'text-anchor': 'middle', 'dominant-baseline': 'central',
      'font-size': taskLabelFontSize(label), fill: label.color, class: 'task-label' }, layer).textContent = label.text;
  }
}
function initialiseTaskLabels() {
  $('taskLabel').onclick = event => insertTaskLabel(event.ctrlKey || event.shiftKey || largeMode ? 2 : 1);
  $('taskLabelMore').onclick = () => openExtraMenu('taskLabelMenu', $('taskLabel'));
  for (const button of document.querySelectorAll('#taskLabelMenu button')) {
    button.onclick = () => { closeExtraMenu(); insertTaskLabel(Number(button.dataset.taskHeight)); };
  }
  for (const button of [$('taskLabel'), $('taskLabelMore')]) button.addEventListener('pointerdown', event => event.preventDefault());
  document.fonts.addEventListener('loadingdone', () => {
    if (doc.taskLabels.some(labels => Object.keys(labels).length)) render();
  });
}
