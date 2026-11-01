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
      existing = list.find(b => b.upper === upper && b.side === side);
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
