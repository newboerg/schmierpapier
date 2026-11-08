// geometry — assembled in src/build.json order; shared classic-script scope.

// @part part-01
// Geodreieck: echte Millimeter im A4-Koordinatensystem. Lange Kante 160 mm,
// Höhe 80 mm. Der Nullpunkt liegt mittig auf der langen Kante.
const GEO_VERTICES = [
  [-80, 0],
  [80, 0],
  [0, -80]
];

/*
 * GEODREIECK
 * Die SVG-Darstellung ist vom Dokument getrennt. Zeichnen projiziert den Mauspunkt auf
 * eine gewählte Außenkante; nur die resultierende Bleistiftstrecke wird übernommen.
 */
function geoSvg(tag, attrs = {}, parent) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  if (parent) parent.append(el);
  return el
}

// @part part-02
function clipPencilLine(line, left, top, right, bottom) {
  const [x1, y1, x2, y2] = line, dx = x2 - x1, dy = y2 - y1;
  let t0 = 0,
    t1 = 1;
  for (const [p, q] of [
      [-dx, x1 - left],
      [dx, right - x1],
      [-dy, y1 - top],
      [dy, bottom - y1]
    ]) {
    if (Math.abs(p) < 1e-10) {
      if (q < 0) return null;
      continue
    }
    const t = q / p;
    if (p < 0) t0 = Math.max(t0, t);
    else t1 = Math.min(t1, t);
    if (t0 > t1) return null
  }
  return {
    line: [x1 + dx * t0, y1 + dy * t0, x1 + dx * t1, y1 + dy * t1],
    t0,
    t1
  };
}

/*
 * STRECKEN BESCHNEIDEN UND BLEISTIFTÜBERLAPPUNGEN
 * Diese Geometrie wird sowohl von den Bereichswerkzeugen als auch den Zeichenwerkzeugen genutzt.
 */
function splitPencilRegion(lines, r) {
  const inside = [],
    outside = [];
  for (const line of lines) {
    const clipped = clipPencilLine(line, (r.x + 1) * 5, (r.y + 1) * 5, (r.x + 1 + r.w) * 5, (r.y + 1 + r.h) *
      5);
    if (!clipped) {
      outside.push([...line]);
      continue
    }
    const c = clipped.line;
    if (Math.hypot(c[2] - c[0], c[3] - c[1]) < .001) {
      outside.push([...line]);
      continue
    }
    inside.push([...c, ...line.slice(4)]);
    if (clipped.t0 > 1e-6) outside.push([line[0], line[1], c[0], c[1], ...line.slice(4)]);
    if (clipped.t1 < 1 - 1e-6) outside.push([c[2], c[3], line[2], line[3], ...line.slice(4)])
  }
  return {
    inside,
    outside
  };
}

function togglePencilCoverage(lines, a, b, dashed = dashedLines()) {
  const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (length < .3) return lines;
  const ux = (b[0] - a[0]) / length,
    uy = (b[1] - a[1]) / length,
    tolerance = .04;
  const project = (x, y) => (x - a[0]) * ux + (y - a[1]) * uy,
    point = t => [a[0] + ux * t, a[1] + uy * t];
  const matches = [],
    others = [];
  for (const line of lines) {
    const d1 = Math.abs((line[0] - a[0]) * uy - (line[1] - a[1]) * ux),
      d2 = Math.abs((line[2] - a[0]) * uy - (line[3] - a[1]) * ux);
    if (d1 < tolerance && d2 < tolerance) {
      const ts = [project(line[0], line[1]), project(line[2], line[3])].sort((x, y) => x - y);
      matches.push({
        line,
        lo: ts[0],
        hi: ts[1]
      })
    } else others.push(line)
  }
  const intervals = matches.map(m => [Math.max(0, m.lo), Math.min(length, m.hi)]).filter(([lo, hi]) => hi >
    lo).sort((a, b) => a[0] - b[0]);
  let covered = 0;
  for (const [lo, hi] of intervals) {
    if (lo > covered + tolerance) break;
    covered = Math.max(covered, hi)
  }
  if (covered >= length - tolerance) {
    for (const m of matches) {
      if (m.hi <= 0 || m.lo >= length) {
        others.push(m.line);
        continue
      }
      if (m.lo < 0) others.push([...point(m.lo), ...point(0), ...m.line.slice(4)]);
      if (m.hi > length) others.push([...point(length), ...point(m.hi), ...m.line.slice(4)])
    }
    return others
  }
  const result = lines.map(line => [...line]);
  let cursor = 0;
  for (const [lo, hi] of intervals) {
    if (lo > cursor + tolerance) result.push([...point(cursor), ...point(lo), ...(dashed ? ['', true] : [])]);
    cursor = Math.max(cursor, hi)
  }
  if (cursor < length - tolerance) result.push([...point(cursor), ...point(length), ...(dashed ? ['', true] : [])]);
  return result;
}
