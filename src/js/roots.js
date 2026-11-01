// roots — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/* v0.4: Zeichenpalette und Tastaturstriche teilen die bestehenden Dokumentformate. */


function rootPath(index, height = 5) {
  const x = 5 + (index % COLS) * 5, y = 5 + Math.floor(index / COLS) * 5;
  // Der Endpunkt liegt exakt auf der oberen rechten Rasterecke, ohne Endhaken.
  return `M ${x+.25} ${y+height*.56} L ${x+1.2} ${y+height*.48} L ${x+2.1} ${y+height-.55} L ${x+3.55} ${y} H ${x+5}`;
}

// @part part-02
function insertIndexedRoot(modifiers) {
  const index = modifiers.ctrlKey ? pos : modifiers.shiftKey ? pos - COLS : pos;
  if (index < 0 || (modifiers.ctrlKey || modifiers.shiftKey) && index + COLS >= COUNT) return;
  let degree;
  for (;;) {
    degree = prompt(tr('Wurzelexponent eingeben (2–9999), zum Beispiel 3 für die dritte Wurzel:'), '');
    if (degree === null) { select(pos); return; }
    degree = degree.trim();
    if (/^[1-9][0-9]{0,3}$/.test(degree) && Number(degree) >= 2) break;
    alert(tr('Bitte eine ganze Zahl von 2 bis 9999 eingeben.'));
  }
  const previous = smallMode;
  smallMode = null;
  insertBracket('√', modifiers);
  smallMode = previous;
  doc.powers[page][index] = { text: degree, color: ink, rootDegree: true };
  changed();
  select(pos);
}

// Feature action called by the shared keyboard dispatcher.
function holdRootMenu(code) {
  openExtraMenu('rootChoiceMenu', $('root'));
}

// Feature action called by the shared keyboard dispatcher.
function holdDirectRoot(code) {
  insertBracket('√', actionHolds.get(code) || {});
}
