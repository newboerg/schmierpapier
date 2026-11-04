// greek — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let greekMenuOpen = false, greekHold = null, greekModifiers = {};

// @part part-02
const greekChoices = [["ω", "ω · Omega klein"], ["Ω", "Ω · Omega groß"], ["π", "π · Pi"], ["α", "α · Alpha"], ["β", "β · Beta"], ["γ", "γ · Gamma"], ["δ", "δ · Delta"], ["ε", "ε · Epsilon"], ["ζ", "ζ · Zeta"], ["η", "η · Eta"], ["θ", "θ · Theta"], ["ι", "ι · Iota"], ["κ", "κ · Kappa"], ["λ", "λ · Lambda"], ["μ", "μ · My"], ["ν", "ν · Ny"], ["ξ", "ξ · Xi"], ["ο", "ο · Omikron"], ["ρ", "ρ · Rho"], ["σ", "σ · Sigma"], ["ς", "ς · Sigma am Wortende"], ["τ", "τ · Tau"], ["υ", "υ · Ypsilon"], ["φ", "φ · Phi"], ["χ", "χ · Chi"], ["ψ", "ψ · Psi"], ["Α", "Α · Alpha groß"], ["Β", "Β · Beta groß"], ["Γ", "Γ · Gamma groß"], ["Δ", "Δ · Delta groß"], ["Ε", "Ε · Epsilon groß"], ["Ζ", "Ζ · Zeta groß"], ["Η", "Η · Eta groß"], ["Θ", "Θ · Theta groß"], ["Ι", "Ι · Iota groß"], ["Κ", "Κ · Kappa groß"], ["Λ", "Λ · Lambda groß"], ["Μ", "Μ · My groß"], ["Ν", "Ν · Ny groß"], ["Ξ", "Ξ · Xi groß"], ["Ο", "Ο · Omikron groß"], ["Π", "Π · Pi groß"], ["Ρ", "Ρ · Rho groß"], ["Σ", "Σ · Sigma groß"], ["Τ", "Τ · Tau groß"], ["Υ", "Υ · Ypsilon groß"], ["Φ", "Φ · Phi groß"], ["Χ", "Χ · Chi groß"], ["Ψ", "Ψ · Psi groß"]];

// @part part-03
function isGreek(symbol) {
  return typeof symbol === 'string' && /^[\u0370-\u03ff]$/.test(symbol)
}

// @part part-04
function insertGreek(symbol, modifiers = {}) {
  if (smallMode) writeSmallSequence(symbol);
  else if (modifiers.ctrlKey) writeCarry(symbol);
  else if (modifiers.shiftKey) writePower(symbol);
  else write(symbol);
}

// @part part-05
function closeGreekMenu() {
  greekMenuOpen = false;
  $('greekMenu').hidden = true;
  $('greekMore').setAttribute('aria-expanded', 'false');
}

function openGreekMenu(modifiers = {}) {
  closeExtraMenu();
  closeRelationMenu();
  greekModifiers = { ctrlKey: !!modifiers.ctrlKey, shiftKey: !!modifiers.shiftKey };
  greekMenuOpen = true;
  const menu = $('greekMenu');
  menu.hidden = false;
  $('greekMore').setAttribute('aria-expanded', 'true');
  positionToolbarMenu(menu, $('greekMore'));
  menu.querySelectorAll('button').forEach(button => button.classList.toggle('menu-current', button.dataset.symbol === 'π'));
  menu.querySelector('.menu-current')?.scrollIntoView({ block: 'nearest' });
}

function chooseGreek(button, event = {}) {
  const modifiers = { ctrlKey: greekModifiers.ctrlKey || event.ctrlKey, shiftKey: greekModifiers.shiftKey || event.shiftKey };
  closeGreekMenu();
  insertGreek(button.dataset.symbol, modifiers);
}
