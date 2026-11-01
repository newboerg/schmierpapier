// basics — assembled in src/build.json order; shared classic-script scope.

// @part part-01
'use strict';

// @part part-02
/*
 * DOKUMENT UND WERKZEUGZUSTAND
 * A4: 210 × 297 mm. Das Schreibfeld beginnt bei (5 mm, 5 mm).
 * 40 Spalten × 57 Zeilen lassen einen freien Rahmen von mindestens einem Kästchen.
 */
const COLS = 40,
  ROWS = 57,
  COUNT = COLS * ROWS,
  KEY = 'schmierpapier.v1';
const $ = id => document.getElementById(id);
let doc = {
    version: 1,
    grid: 'inset-a4',
    paperTypes: ['squared'],
    name: 'Mein Rechenblatt',
    pages: [{}],
    freehand: [[]],
    lines: [
      []
    ],
    pencilLines: [
      []
    ],
    numberLines: [
      []
    ],
    inks: [{}],
    highlights: [{}],
    carries: [{}],
    powers: [{}],
    fractionEquals: [{}],
    tallBrackets: [
      []
    ]
  },
  page = 0,
  pos = 0,
  returnColumn = 0,
  history = [],
  future = [],
  saveTimer;
const INKS = ['#202124', '#172e65', '#19763b', '#cc3030'],
  MARKERS = ['#ff65c5', '#eeff00', '#7fff00'];

// @part part-03
let tool = 'pen',
  ink = '#172e65',
  markerColor = '#eeff00',
  markDrag = null;
const nodes = [];
for (let i = 0; i < COUNT; i++) {
  const el = document.createElement('div');
  el.className = 'cell';
  el.setAttribute('role', 'gridcell');
  el.dataset.index = i;
  $('cells').append(el);
  nodes.push(el)
}

// @part part-04
function paperTypeAt(index = page) {
  return doc.paperTypes?.[index] || doc.paperType || 'squared'
}

function drawingGridStep() {
  return paperTypeAt() === 'millimeter' ? 1 : 5
}

function isMillimeterCoordinate(value) {
  return Number.isFinite(value) && Math.abs(value * 5 - Math.round(value * 5)) < 1e-7
}

function snapPaperPoint(point) {
  const step = drawingGridStep();
  return point.map((value, i) => Math.max(0, Math.min(Math.floor((i === 0 ? 210 : 297) / step) * step, Math
    .round(value / step) * step)))
}

function paperGridPoint(point) {
  return snapPaperPoint(point).map(value => Math.round(value * 1000 / 5) / 1000)
}

function setPaperGrid(sheet, type) {
  let grid = sheet.querySelector('.paper-grid');
  if (grid?.dataset.paperType === type) return;
  if (!grid) {
    grid = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    grid.setAttribute('class', 'paper-grid');
    grid.setAttribute('viewBox', '0 0 210 297');
    grid.setAttribute('preserveAspectRatio', 'none');
    grid.setAttribute('aria-hidden', 'true');
    sheet.prepend(grid);
  }
  grid.dataset.paperType = type;
  grid.replaceChildren();
  const levels = type === 'millimeter'
    ? [[1, '#f6dbc3', 'fine'], [5, '#edc29d', 'medium'], [10, '#dfab7c', 'major']]
    : [[5, type === 'blank' ? '#aab5ad40' : '#96b7da80', 'regular']];
  for (const [step, colour, weight] of levels) {
    const segments = [];
    for (let x = 0; x <= 210; x += step) segments.push(`M ${x} 0 V 297`);
    for (let y = 0; y <= 297; y += step) segments.push(`M 0 ${y} H 210`);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'grid-' + weight);
    path.setAttribute('stroke', colour);
    path.setAttribute('d', segments.join(' '));
    grid.append(path);
  }
}

function applyPaperType() {
  const micro = paperTypeAt() === 'millimeter';
  $('paper').classList.toggle('millimeter', micro);
  setPaperGrid($('paper'), paperTypeAt());
  const label = $('paperInfo');
  if (label) label.textContent = micro ? 'DIN A4 · Millimeterpapier · Zeichnen: 1 mm · Schrift: 5 mm' :
    'DIN A4 · 5 mm kariert · 1 Zeichen pro Kästchen'
}

function paintPaperGrid(c, scale, type) {
  const micro = type === 'millimeter';
  c.fillStyle = micro ? '#fffdf8' : '#fffefa';
  c.fillRect(0, 0, 210 * scale, 297 * scale);
  const lines = (step, color, width) => {
    c.strokeStyle = color;
    c.lineWidth = width * scale;
    c.beginPath();
    for (let x = 0; x <= 210; x += step) {
      c.moveTo(x * scale, 0);
      c.lineTo(x * scale, 297 * scale)
    }
    for (let y = 0; y <= 297; y += step) {
      c.moveTo(0, y * scale);
      c.lineTo(210 * scale, y * scale)
    }
    c.stroke()
  };
  if (micro) {
    lines(1, '#f6dbc3', .09);
    lines(5, '#edc29d', .14);
    lines(10, '#dfab7c', .2)
  } else {
    lines(5, '#b4cbe3', .18);
    c.strokeStyle = '#dd9999';
    c.lineWidth = .25 * scale;
    c.beginPath();
    for (const x of [25, 185]) {
      c.moveTo(x * scale, 0);
      c.lineTo(x * scale, 297 * scale)
    }
    c.stroke()
  }
}

function paperPoint(e) {
  const r = $('paper').getBoundingClientRect();
  return [(e.clientX - r.left) * 210 / r.width, (e.clientY - r.top) * 297 / r.height]
}

// @part part-05
/*
 * RENDERN, AUSWAHL UND TEXTEINGABE
 * Dokumentänderungen laufen über checkpoint() für Undo und changed() für Darstellung/Autosave.
 * Werkzeugvorschauen sind UI-Zustand und werden nicht als Dokumentinhalt gespeichert.
 */
function status(s) {
  $('status').textContent = s
}

// @part part-06
function render() {
  if (stretchBracket && (stretchBracket.page !== page || stretchBracket.document !== doc)) cancelStretchBracket(false);
  if (keyboardArea?.phase === 'select' && keyboardArea.page !== page) cancelKeyboardArea();
  if (keyboardLine && keyboardLine.page !== page) keyboardLine = null;
  applyPaperType();
  if (compass.active && compass.page !== page) hideCompass(false, false);
  if (numberLabelSession) finishNumberLabels(false);
  if (numberLineTool.active && numberLineTool.page !== page) cancelNumberLine(false);
  resetCorner();
  renderLines();
  renderRegion();
  renderKeyboardArea();
  nodes.forEach((el, i) => {
    el.textContent = doc.pages[page][i] === '√' ? '' : (doc.pages[page][i] || '');
    const carry = doc.carries[page][i];
    if (carry) {
      const small = document.createElement('span');
      small.className = 'carry' + (carry.integralLimit ? ' integral-limit' : '');
      small.textContent = carry.text;
      small.style.color = carry.color;
      el.append(small)
    }
    const power = doc.powers[page][i];
    if (power) {
      const small = document.createElement('span');
      small.className = 'carry power' + (power.rootDegree ? ' root-degree' : '') + (power.integralLimit ? ' integral-limit' : '');
      small.textContent = power.text;
      small.style.color = power.color;
      el.append(small)
    }
    el.classList.toggle('selected', i === pos);
    styleCell(i)
  });
  $('name').value = doc.name;
  $('pageLabel').textContent = `Seite ${page+1} von ${doc.pages.length}`;
  $('prev').disabled = page === 0;
  $('next').disabled = page === doc.pages.length - 1;
  $('remove').disabled = doc.pages.length === 1;
  $('undo').disabled = !history.length;
  $('redo').disabled = !future.length;
  select(pos, false);
  renderSpread();
  applyPaperType();
  renderGeo();
  renderCompass()
}

function select(i, focus = true, rememberColumn = false) {
  nodes[pos]?.classList.remove('selected');
  pos = Math.max(0, Math.min(COUNT - 1, i));
  if (rememberColumn) returnColumn = pos % COLS;
  nodes[pos].classList.add('selected');
  const ed = $('editor');
  ed.style.left = (5 + (pos % COLS) * 5) + 'mm';
  ed.style.top = (5 + Math.floor(pos / COLS) * 5) + 'mm';
  ed.value = doc.pages[page][pos] || '';
  ed.style.color = doc.pages[page][pos] === '√' ? 'transparent' : (doc.inks[page][pos] || ink);
  ed.style.backgroundColor = doc.highlights[page][pos] ? doc.highlights[page][pos] + '80' : (tool !== 'pen' ?
    'transparent' : '#eff8ed');
  $('position').textContent = `Zeile ${Math.floor(pos/COLS)+1} · Spalte ${pos%COLS+1}`;
  if (focus) {
    ed.focus({
      preventScroll: true
    });
    ed.select()
  }
}

function changed() {
  render();
  persist()
}

// @part part-07
/*
 * SEITEN UND DATEIEN
 * Parallele Seitenlisten enthalten die Inhalte jeder Seite. Beim Einfügen/Löschen
 * müssen alle Listen dieselbe Seitenposition behalten.
 */
function travel(delta) {
  page += delta;
  render();
  select(pos, true, true)
}
