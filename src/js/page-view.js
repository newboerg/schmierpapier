// page-view — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let pageView = '2';
try {
  pageView = readAppStorage('schmierpapier.pageView') === '1' ? '1' : '2'
} catch {}
$('pageView').value = pageView;
$('pageView').onchange = () => {
  pageView = $('pageView').value;
  try {
    if (!tutorial) writeAppStorage('schmierpapier.pageView', pageView)
  } catch {}
  renderSpread()
};

// @part part-02
function renderSpread() {
  scaleSpread();
  const spread = $('spread');
  spread.dataset.view = pageView;
  spread.querySelector('.companion')?.remove();
  spread.querySelectorAll('.paper-badge').forEach(el => el.remove());
  const badge = document.createElement('span');
  badge.className = 'paper-badge';
  badge.textContent = `Blatt ${page+1}`;
  $('paper').append(badge);
  if (pageView === '1') return;
  const other = page % 2 === 0 ? page + 1 : page - 1;
  if (other >= doc.pages.length) {
    const blank = document.createElement('div');
    blank.className = 'paper companion blank-page';
    setPaperGrid(blank, 'blank');
    const button = document.createElement('button');
    button.textContent = '＋ Neues Blatt';
    button.title = 'Ein zweites Blatt hinzufügen';
    button.onclick = () => $('add').click();
    blank.append(button);
    spread.append(blank);
    return
  }
  const savedPage = page;
  page = other;
  renderLines();
  const companion = $('paper').cloneNode(true);
  page = savedPage;
  renderLines();
  companion.querySelector('.editor')?.remove();
  companion.querySelector('.geo-overlay')?.remove();
  companion.querySelector('.compass-overlay')?.remove();
  companion.querySelector('.axis-label-editor')?.remove();
  companion.querySelectorAll('.region-box,.paper-badge,.keyboard-line-preview,.keyboard-area,.stretch-bracket-preview').forEach(el => el.remove());
  companion.removeAttribute('id');
  companion.className = 'paper companion' + (paperTypeAt(other) === 'millimeter' ? ' millimeter' : '');
  setPaperGrid(companion, paperTypeAt(other));
  companion.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
  const otherBadge = document.createElement('span');
  otherBadge.className = 'paper-badge';
  otherBadge.textContent = `Blatt ${other+1}`;
  companion.append(otherBadge);
  companion.querySelectorAll('.cell').forEach((el, index) => {
    el.classList.remove('selected');
    el.textContent = doc.pages[other][index] === '√' ? '' : (doc.pages[other][index] || '');
    el.style.color = doc.inks[other][index] || '#172e65';
    el.style.backgroundColor = doc.highlights[other][index] ? doc.highlights[other][index] + '80' : '';
    for (const [field, css] of [
        ['carries', 'carry'],
        ['powers', 'carry power']
      ]) {
      const value = doc[field][other][index];
      if (value) {
        const small = document.createElement('span');
        small.className = css + (field === 'powers' && value.rootDegree ? ' root-degree' : '') + (value.integralLimit ? ' integral-limit' : '');
        small.textContent = value.text;
        small.style.color = value.color;
        el.append(small)
      }
    }
  });
  companion.addEventListener('click', e => {
    const r = companion.getBoundingClientRect(),
      x = (e.clientX - r.left) * 210 / r.width,
      y = (e.clientY - r.top) * 297 / r.height,
      col = Math.floor((x - 5) / 5),
      row = Math.floor((y - 5) / 5);
    if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return;
    page = other;
    pos = row * COLS + col;
    if (region?.phase === 'place') {
      pasteRegion([col, row]);
      return
    }
    render();
    select(pos, true, true)
  });
  if (other < page) spread.insertBefore(companion, $('paper'));
  else spread.append(companion);
}

// Feature action called by the shared keyboard dispatcher.
function holdPageTravel(code) {
  if (keyboardArea?.phase === 'select') cancelKeyboardArea();
  const delta = code === 'PageUp' ? -1 : 1;
  if (page + delta >= 0 && page + delta < doc.pages.length) travel(delta);
  if (keyboardArea?.phase === 'place' && region) {
    region.target = { x: pos % COLS, y: Math.floor(pos / COLS) }; renderRegion();
  }
}

// Feature action called by the shared keyboard dispatcher.
function holdPageView(code) {
  $('pageView').value = pageView === '2' ? '1' : '2';
  $('pageView').dispatchEvent(new Event('change', { bubbles: true }));
}
