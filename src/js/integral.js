// integral — assembled in src/build.json order; shared classic-script scope.

// @part part-01
$('integral').onclick = e => insertBracket('∫', e);

// Feature action called by the shared keyboard dispatcher.
function holdIntegralMenu(code) {
  openExtraMenu('integralChoiceMenu', $('integral'));
}

// Replace complete Latin names, preserving numbers/operators around them.
// Only the first letter determines the case: oMEGA → ω, Omega → Ω.
function normaliseIntegralLimit(text) {
  const letters = {
    pi: 'π', omega: 'ω', alpha: 'α', beta: 'β', phi: 'φ', theta: 'θ',
    psi: 'ψ', tau: 'τ', lambda: 'λ', rho: 'ρ', sigma: 'σ', xi: 'ξ', zeta: 'ζ'
  };
  return text.replace(/[a-z]+/gi, name => {
    const key = name.toLowerCase();
    if (!Object.hasOwn(letters, key)) return name;
    const symbol = letters[key];
    return name[0] === name[0].toUpperCase() ? symbol.toUpperCase() : symbol;
  });
}

// Limits use the existing per-cell annotations, just like an indexed root.
// Both prompts finish before the undo checkpoint, so cancelling changes nothing.
function askIntegralLimits() {
  const ask = key => {
    for (;;) {
      const value = prompt(tr(key), '');
      if (value === null) return null;
      const text = normaliseIntegralLimit(value.trim());
      if (Array.from(text).length >= 1 && Array.from(text).length <= 16 && !/[\s\u0000-\u001f\u007f]/.test(text)) return text;
      alert(tr('Bitte 1 bis 16 Zeichen ohne Leerzeichen eingeben.'));
    }
  };
  const lowerLimit = ask('Untere Integrationsgrenze eingeben, zum Beispiel 0 oder a:');
  if (lowerLimit === null) return null;
  const upperLimit = ask('Obere Integrationsgrenze eingeben, zum Beispiel 1 oder b:');
  if (upperLimit === null) return null;
  return { lower: lowerLimit, upper: upperLimit };
}

function insertDefiniteIntegral(modifiers = {}) {
  const upper = modifiers.ctrlKey ? pos : modifiers.shiftKey ? pos - COLS : pos;
  const tall = !!(modifiers.ctrlKey || modifiers.shiftKey);
  if (upper < 0 || tall && upper + COLS >= COUNT) return;
  const limits = askIntegralLimits();
  if (limits === null) { select(pos); return; }
  const previous = smallMode;
  smallMode = null;
  insertBracket('∫', modifiers);
  smallMode = previous;
  const lower = upper + (tall ? COLS : 0);
  doc.powers[page][upper] = { text: limits.upper, color: ink, integralLimit: true };
  doc.carries[page][lower] = { text: limits.lower, color: ink, integralLimit: true };
  changed();
  select(pos);
}

function removeIntegralLimits(upper, height = 1) {
  if (doc.powers[page][upper]?.integralLimit) delete doc.powers[page][upper];
  const lower = upper + (height - 1) * COLS;
  if (doc.carries[page][lower]?.integralLimit) delete doc.carries[page][lower];
}
