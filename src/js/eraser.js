// eraser — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function pointSegmentDistanceSquared(point, a, b) {
  const dx = b[0] - a[0],
    dy = b[1] - a[1],
    length = dx * dx + dy * dy,
    t = length ? Math.max(0, Math.min(1, ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / length)) : 0;
  return (point[0] - a[0] - t * dx) ** 2 + (point[1] - a[1] - t * dy) ** 2
}

function segmentDistanceSquared(a, b, c, d) {
  const rx = b[0] - a[0],
    ry = b[1] - a[1],
    sx = d[0] - c[0],
    sy = d[1] - c[1],
    cross = rx * sy - ry * sx;
  if (Math.abs(cross) > 1e-12) {
    const qx = c[0] - a[0],
      qy = c[1] - a[1],
      t = (qx * sy - qy * sx) / cross,
      u = (qx * ry - qy * rx) / cross;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return 0
  }
  return Math.min(pointSegmentDistanceSquared(a, c, d), pointSegmentDistanceSquared(b, c, d),
    pointSegmentDistanceSquared(c, a, b), pointSegmentDistanceSquared(d, a, b));
}

function imageTouchedByEraser(image, from, to, radius = 1.2) {
  const r = imageRectMM(image);
  const inside = p => p[0] >= r.x && p[0] <= r.x + r.w && p[1] >= r.y && p[1] <= r.y + r.h;
  if (inside(from) || inside(to)) return true;
  const corners = [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]];
  return corners.some((corner, i) => segmentDistanceSquared(from, to, corner, corners[(i + 1) % 4]) <= radius ** 2);
}

function eraseLineSweep(point) {
  const previous = markDrag.lastPaper || point,
    radius = 1.2;
  const keep = (line, scale, width) => segmentDistanceSquared(previous, point, [line[0] * scale, line[1] *
    scale
  ], [line[2] * scale, line[3] * scale]) > (radius + width / 2) ** 2;
  const normal = doc.lines[page],
    pencil = doc.pencilLines[page],
    axes = doc.numberLines[page];
  doc.lines[page] = normal.filter(line => keep(line, 5, .45));
  const erasedStrokes = new Set(pencil.filter(line => line[4] && !keep(line, 1, .2)).map(line => line[4]));
  doc.pencilLines[page] = pencil.filter(line => line[4] ? !erasedStrokes.has(line[4]) : keep(line, 1, .2));
  doc.numberLines[page] = axes.filter(axis => {
    const shape = numberLineShape(axis),
      segments = [...shape.segments];
    if (shape.arrow.length)
      for (let i = 0; i < shape.arrow.length; i++) segments.push([...shape.arrow[i], ...shape.arrow[(i +
        1) % shape.arrow.length]]);
    return segments.every(line => keep(line, 1, .3))
  });
  const points = doc.constructionPoints?.[page] || [];
  if (doc.constructionPoints) doc.constructionPoints[page] = points.filter(p =>
    pointSegmentDistanceSquared([p.x,p.y],previous,point) > (radius+1) ** 2);
  const erasedPoints = points.length !== (doc.constructionPoints?.[page]?.length || 0);
  const images = doc.images?.[page] || [];
  if (doc.images) doc.images[page] = images.filter(image => !imageTouchedByEraser(image, previous, point, radius));
  const erasedImages = images.length !== (doc.images?.[page]?.length || 0);
  const erasedNotes = eraseFreehand(page, previous, point, radius);
  markDrag.lastPaper = point;
  if (erasedPoints || erasedImages || erasedNotes || axes.length !== doc.numberLines[page].length || normal.length !== doc.lines[page].length || pencil
    .length !== doc.pencilLines[page].length) renderLines();
}

// @part part-02
function eraseKeyboardRectangle(r) {
  // Like the existing eraser: preserve writing, remove whole touched strokes.
  const left = 5 + r.x * 5 + .15, top = 5 + r.y * 5 + .15;
  const right = 5 + (r.x + r.w) * 5 - .15, bottom = 5 + (r.y + r.h) * 5 - .15;
  const corners = [[left, top], [right, top], [right, bottom], [left, bottom]];
  const inside = p => p[0] >= left && p[0] <= right && p[1] >= top && p[1] <= bottom;
  const touches = (a, b) => inside(a) || inside(b) || corners.some((p, i) =>
    segmentDistanceSquared(a, b, p, corners[(i + 1) % 4]) < 1e-8);
  checkpoint();
  if (doc.constructionPoints) doc.constructionPoints[page] = doc.constructionPoints[page].filter(point =>
    point.x+1<left || point.x-1>right || point.y+1<top || point.y-1>bottom);
  if (doc.images) doc.images[page] = doc.images[page].filter(image =>
    image.x >= r.x + r.w || image.x + image.w <= r.x || image.y >= r.y + r.h || image.y + image.h <= r.y);
  for (const key of Object.keys(doc.highlights[page])) if (inRegion(+key, r)) delete doc.highlights[page][key];
  doc.lines[page] = doc.lines[page].filter(l => !touches(l.slice(0, 2).map(v => v * 5), l.slice(2, 4).map(v => v * 5)));
  const pencil = doc.pencilLines[page];
  const erased = new Set(pencil.filter(l => l[4] && touches(l.slice(0, 2), l.slice(2, 4))).map(l => l[4]));
  doc.pencilLines[page] = pencil.filter(l => l[4] ? !erased.has(l[4]) : !touches(l.slice(0, 2), l.slice(2, 4)));
  doc.freehand[page] = doc.freehand[page].filter(stroke => !stroke.points.some((p, i) =>
    touches(i ? stroke.points[i - 1] : p, p)));
  doc.numberLines[page] = doc.numberLines[page].filter(axis => {
    const shape = numberLineShape(axis);
    return !shape.segments.some(l => touches(l.slice(0, 2), l.slice(2, 4))) &&
      !shape.arrow.some((p, i) => touches(p, shape.arrow[(i + 1) % shape.arrow.length]));
  });
  cancelKeyboardArea();
  document.querySelector('.swatch[data-tool="pen"][data-color="' + ink + '"]').click();
  persist();
}
