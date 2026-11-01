// comparisons — assembled in src/build.json order; shared classic-script scope.

// @part part-01
const relationSymbols = ['=', '≠', '<', '>', '≤', '≥', '≈', '≡', '∝'];
let relationModifiers = {}, enterHold = null, relationMenuOpen = false;

// @part part-02
function relationPath(symbol, index) {
  const x = 5 + (index % COLS) * 5, y = 5 + Math.floor(index / COLS) * 5;
  const bar = offset => `M ${x+.7} ${y+5+offset} H ${x+4.3} `;
  const chevron = symbol === '<' || symbol === '≤'
    ? `M ${x+4.1} ${y+2} L ${x+.9} ${y+5} L ${x+4.1} ${y+8}`
    : `M ${x+.9} ${y+2} L ${x+4.1} ${y+5} L ${x+.9} ${y+8}`;
  if (['<', '>', '≤', '≥'].includes(symbol)) return chevron + (['≤', '≥'].includes(symbol) ? bar(4) : '');
  if (symbol === '≠') return bar(-.8) + bar(.8) + `M ${x+1.3} ${y+8} L ${x+3.7} ${y+2}`;
  if (symbol === '≡') return bar(-1.8) + bar(0) + bar(1.8);
  if (symbol === '≈') return [-1, 1].map(o => `M ${x+.6} ${y+5+o} C ${x+1.8} ${y+2+o} ${x+3.2} ${y+8+o} ${x+4.4} ${y+5+o}`).join(' ');
  if (symbol === '∝') return `M ${x+4.3} ${y+2.6} C ${x+2.2} ${y+2.6} ${x+2.8} ${y+7.4} ${x+1.2} ${y+7.4} C ${x-.3} ${y+7.4} ${x-.3} ${y+2.6} ${x+1.2} ${y+2.6} C ${x+2.8} ${y+2.6} ${x+2.2} ${y+7.4} ${x+4.3} ${y+7.4}`;
  return bar(-.8) + bar(.8);
}

function insertRelation(symbol, event = {}) {
  if (symbol === '=' && (event.ctrlKey || event.shiftKey)) {
    const upper = event.ctrlKey ? pos : pos - COLS;
    if (upper < 0 || upper + COLS >= COUNT) return;
    checkpoint();
    doc.fractionEquals[page][upper] = ink;
    changed();
    select(pos);
  } else insertBracket(symbol, event);
}

// @part part-03
function closeRelationMenu() {
  $('relationMenu').hidden = true;
  $('relationMore').setAttribute('aria-expanded', 'false');
  relationMenuOpen = false;
}

function openRelationMenu(modifiers = {}) {
  closeExtraMenu();
  closeGreekMenu();
  relationModifiers = { ctrlKey: !!modifiers.ctrlKey, shiftKey: !!modifiers.shiftKey };
  relationMenuOpen = true;
  const menu = $('relationMenu');
  menu.hidden = false;
  $('relationMore').setAttribute('aria-expanded', 'true');
  const rect = $('relationMore').getBoundingClientRect();
  menu.style.left = Math.max(8, Math.min(rect.left, innerWidth - menu.offsetWidth - 8)) + 'px';
  menu.style.top = Math.max(8, Math.min(rect.bottom + 5, innerHeight - menu.offsetHeight - 8)) + 'px';
  menu.querySelectorAll('button').forEach((button, i) => button.classList.toggle('menu-current', i === 0));
}

function chooseRelation(button, event = {}) {
  const modifiers = { ctrlKey: relationModifiers.ctrlKey || event.ctrlKey, shiftKey: relationModifiers.shiftKey || event.shiftKey };
  closeRelationMenu();
  insertRelation(button.dataset.symbol, modifiers);
}
