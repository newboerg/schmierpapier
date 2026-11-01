// small-scripts — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let smallMode = null,
  smallFresh = false;

// @part part-02
function toggleSmallMode(mode) {
  largeMode = false;
  updateLargeModeButton();
  const previous = smallMode;
  if (previous === mode) {
    smallMode = null;
    if (mode === 'powers') {
      if (pos % COLS < COLS - 1) pos++
    } else if (pos + COLS < COUNT) pos += COLS
  } else {
    smallMode = mode;
    smallFresh = true;
    if (mode === 'powers' && !previous && pos % COLS > 0 && !doc.pages[page][pos] && doc.pages[page][pos - 1])
      pos--
  }
  $('carryMode').setAttribute('aria-pressed', String(smallMode === 'carries'));
  $('powerMode').setAttribute('aria-pressed', String(smallMode === 'powers'));
  render();
  select(pos);
}

// @part part-03
function writeSmallSequence(text) {
  const value = Array.from(text).filter(ch => !/[\s\u0000-\u001f\u007f]/.test(ch)).join('');
  if (!value) return;
  checkpoint();
  const previous = smallFresh ? '' : (doc[smallMode][page][pos]?.text || '');
  doc[smallMode][page][pos] = {
    text: Array.from(previous + value).slice(0, 16).join(''),
    color: ink
  };
  smallFresh = false;
  changed();
  select(pos);
}
