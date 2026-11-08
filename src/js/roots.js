// roots — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/* v0.4: Zeichenpalette und Tastaturstriche teilen die bestehenden Dokumentformate. */


function rootPath(index, height = 5) {
  const x = 5 + (index % COLS) * 5, y = 5 + Math.floor(index / COLS) * 5;
  // Der Endpunkt liegt exakt auf der oberen rechten Rasterecke, ohne Endhaken.
  return `M ${x+.25} ${y+height*.56} L ${x+1.2} ${y+height*.48} L ${x+2.1} ${y+height-.55} L ${x+3.55} ${y} H ${x+5}`;
}

// @part part-02
async function askRootDegree() {
  const value=await requestInput(tr('Wurzelexponent eingeben (2–9999), zum Beispiel 3 für die dritte Wurzel:'), {
    value:'',maxLength:4,
    validate:value=>/^[1-9][0-9]{0,3}$/.test(value.trim())&&Number(value.trim())>=2?null:'Bitte eine ganze Zahl von 2 bis 9999 eingeben.'
  });
  return value===null?null:value.trim();
}

async function insertIndexedRoot(modifiers) {
  const index = modifiers.ctrlKey ? pos : modifiers.shiftKey ? pos - COLS : pos;
  if (index < 0 || (modifiers.ctrlKey || modifiers.shiftKey) && index + COLS >= COUNT) return;
  const degree = await askRootDegree();
  if (degree === null) { select(pos); return; }
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
