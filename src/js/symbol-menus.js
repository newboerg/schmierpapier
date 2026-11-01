// Shared mechanics for thematic mathematical symbol menus.

// @part part-01
function registerSymbolMenu(name, buttonId, symbols) {
  const menu = $(name + 'Menu');
  for (const [symbol, label] of symbols) {
    const button = document.createElement('button');
    button.dataset.symbol = symbol;
    button.dataset.textSymbol = 'true';
    button.title = label;
    button.setAttribute('aria-label', label);
    button.textContent = symbol;
    menu.append(button);
  }
  $(buttonId).onclick = () => insertMathSymbol(symbols[0][0]);
}

function insertMathSymbol(symbol) {
  smallMode ? writeSmallSequence(symbol) : write(symbol);
}
