// Clockwise feedback shared by all long-key shortcuts; no input interception.

// @part part-01
const buttonHoldProgress = new Map();

function showButtonHoldProgress(held, button, isPending) {
  if (!button) return;
  buttonHoldProgress.get(button)?.();
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'hold-progress');
  svg.setAttribute('aria-hidden', 'true');
  svg.innerHTML = '<rect x="1.5" y="1.5" width="calc(100% - 3px)" height="calc(100% - 3px)" rx="5" pathLength="100" />';
  const rect = svg.firstElementChild, started = performance.now();
  let frame = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    svg.remove();
    button.classList.remove('hold-pending');
    if (buttonHoldProgress.get(button) === stop) buttonHoldProgress.delete(button);
  };
  buttonHoldProgress.set(button, stop);
  button.classList.add('hold-pending');
  button.append(svg);
  const tick = () => {
    if (!isPending() || held.fired || held.opened || held.selected || document.activeElement !== held.target) {
      stop(); return;
    }
    rect.style.strokeDashoffset = String(100 * (1 - Math.min(1, (performance.now() - started) / 600)));
    frame = requestAnimationFrame(tick);
  };
  tick();
}

function actionHoldButton(code, held) {
  if (held.key === '+' || held.key === '-') return $(held.key === '+' ? 'zoomIn' : 'zoomOut');
  if (/^(?:Digit|Numpad)[5-7]$/.test(code))
    return document.querySelectorAll('.swatch[data-tool="marker"]')[Number(code.slice(-1)) - 5];
  if (/^(?:Digit|Numpad)[89]$/.test(code)) return $(code.endsWith('8') ? 'parenOpen' : 'parenClose');
  const ids = {
    KeyB: 'newFile', KeyO: 'open', KeyS: 'strikeToggle', KeyG: 'geoToggle', KeyK: 'compassToggle',
    KeyI: 'integral', KeyL: 'logic', KeyM: 'sets', KeyU: 'percent', KeyZ: 'percent',
    KeyQ: 'root', KeyW: 'root', KeyN: 'numberLineToggle', KeyR: null, KeyX: 'cutRegion',
    KeyC: 'copyRegion', KeyE: 'pdf', KeyD: 'pageView', PageUp: 'prev', PageDown: 'next',
    Insert: 'add', Delete: 'remove'
  };
  return code === 'KeyR' ? document.querySelector('.swatch[data-tool="eraser"]') : $(ids[code]);
}
