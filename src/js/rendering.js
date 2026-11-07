// rendering — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function renderLines() {
  renderImages();
  const layer = $('lineLayer');
  layer.replaceChildren();
  renderFreehand();
  drawDecimalMarks(layer);
  drawTaskLabels(layer);

  function line(coords, preview = false) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    ['x1', 'y1', 'x2', 'y2'].forEach((key, i) => el.setAttribute(key, coords[i] * 5));
    el.setAttribute('class', 'drawn-line' + (preview ? ' line-preview' : ''));
    el.style.stroke = preview ? ink : (coords[4] || '#172e65');
    layer.append(el)
  }
  for (const coords of doc.lines[page]) line(coords);
  for (const axis of doc.numberLines[page]) drawNumberLineSvg(layer, axis);
  if (numberLineTool.active && numberLineTool.page === page && numberLineTool.start) {
    const end = numberLineTool.end || numberLineTool.start;
    drawNumberLineSvg(layer, [...numberLineTool.start, ...end, ink], true)
  }
  drawPencilStrokes(layer, doc.pencilLines[page]);
  for (const [index, color] of Object.entries(doc.fractionEquals[page])) {
    const x = 7.5 + (+index % COLS) * 5,
      y = 10 + Math.floor(+index / COLS) * 5;
    for (const offset of [-.65, .65]) {
      const bar = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      bar.setAttribute('x1', x - 1.5);
      bar.setAttribute('x2', x + 1.5);
      bar.setAttribute('y1', y + offset);
      bar.setAttribute('y2', y + offset);
      bar.setAttribute('class', 'drawn-line');
      bar.style.stroke = color;
      bar.style.strokeWidth = '.35';
      layer.append(bar)
    }
  }
  for (const [index, symbol] of Object.entries(doc.pages[page])) {
    if (symbol !== '√') continue;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', rootPath(+index));
    path.setAttribute('fill', 'none');
    path.setAttribute('class', 'drawn-line');
    path.style.stroke = doc.inks[page][index] || '#172e65';
    path.style.strokeWidth = '.35';
    layer.append(path);
  }
  for (const bracket of doc.tallBrackets[page]) {
    if (bracket.text) { drawTallCharacter(layer, bracket); continue; }
    if (isGreek(bracket.side)) {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', 7.5 + (bracket.upper % COLS) * 5);
      text.setAttribute('y', 10 + Math.floor(bracket.upper / COLS) * 5);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'central');
      text.setAttribute('font-family', settings.font === 'console' ? writingFont() : 'OfflineSymbols');
      text.setAttribute('font-size', '8');
      text.setAttribute('textLength', '4');
      text.setAttribute('lengthAdjust', 'spacingAndGlyphs');
      text.setAttribute('fill', bracket.color);
      text.textContent = bracket.side;
      layer.append(text);
      continue
    }
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', bracketPath(bracket));
    path.setAttribute('fill', 'none');
    path.setAttribute('class', 'drawn-line');
    path.style.stroke = bracket.color;
    path.style.strokeWidth = '.35';
    layer.append(path);
  }
  if (drag) line([...drag.start, ...drag.end], true);
  drawKeyboardLine();
  drawStretchBracketPreview();
  if (armed && corner) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', corner[0] * 5);
    dot.setAttribute('cy', corner[1] * 5);
    dot.setAttribute('r', '.8');
    dot.setAttribute('class', 'corner-dot');
    layer.append(dot)
  }
}

// @part part-02
function drawPencilStrokes(layer, lines) {
  const strokes = new Map();
  for (const line of lines) {
    if (line[4]) {
      if (!strokes.has(line[4])) strokes.set(line[4], []);
      strokes.get(line[4]).push(line)
    } else {
      const el = geoSvg('line', {
        x1: line[0],
        y1: line[1],
        x2: line[2],
        y2: line[3],
        class: 'pencil-line'
      }, layer)
    }
  }
  for (const [id, segments] of strokes) {
    let path = '',
      last = null;
    for (const [x1, y1, x2, y2] of segments) {
      if (!last || Math.hypot(x1 - last[0], y1 - last[1]) > .003) path += 'M ' + x1 + ' ' + y1 + ' ';
      path += 'L ' + x2 + ' ' + y2 + ' ';
      last = [x2, y2]
    }
    geoSvg('path', {
      d: path,
      class: 'pencil-line',
      'data-pencil-stroke': id,
      'stroke-linejoin': 'round'
    }, layer)
  }
}
