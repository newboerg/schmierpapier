// file-io — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function persist() {
  if (tutorial) return;
  clearTimeout(saveTimer);
  if (!storageAllowed) {
    status('Keine Browserspeicherung · nur diese Sitzung');
    return;
  }
  saveTimer = setTimeout(() => {
    if (!storageAllowed) return;
    try {
      writeAppStorage(KEY, JSON.stringify(doc));
      status('Im Browser gespeichert')
    } catch {
      status('Browserspeicher nicht verfügbar – bitte als .schmier speichern')
    }
  }, 250)
}

// @part part-02
function filename() {
  return (doc.name.replace(/[<>:"/\\|?*\x00-\x1f]/g, '_') || 'Schmierpapier')
}

function download(blob, name) {
  const url = URL.createObjectURL(blob),
    a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

function saveFile() {
  doc.name = $('name').value.trim() || 'Mein Rechenblatt';
  download(new Blob([JSON.stringify(doc, null, 2)], {
    type: 'application/json'
  }), filename() + '.schmier');
  persist();
  if (tutorial) { tutorial.saved = true; scheduleTutorialCheck(); }
}

// @part part-03
$('save').onclick = saveFile;
$('open').onclick = () => $('openFile').click();

/*
 * DATEIPRÜFUNG UND MIGRATION
 * Importe werden normalisiert und geprüft, bevor sie den aktuellen Dokumentstand ersetzen.
 * Ältere Raster werden auf das Schreibfeld mit freiem Kästchenrahmen abgebildet.
 */
function validateDocument(data) {
  if (!data || data.version !== 1 || typeof data.name !== 'string' || !Array.isArray(data.pages) || !data
    .pages.length || data.pages.length > 200) throw Error('Ungültiges Dateiformat (maximal 200 Blätter).');
  if (data.grid !== undefined && !['full-a4', 'inset-a4'].includes(data.grid)) throw Error(
    'Unbekanntes Raster.');
  if (data.grid !== 'inset-a4') {
    data = JSON.parse(JSON.stringify(data));
    const full = data.grid === 'full-a4',
      oldCols = full ? 42 : 38,
      oldRows = full ? 59 : 54;
    const remap = index => {
      if (!/^\d+$/.test(String(index)) || +index >= oldCols * oldRows) throw Error(
        'Ungültige alte Kästchenposition.');
      const row = Math.floor(+index / oldCols) + (full ? -1 : 2),
        col = (+index % oldCols) + (full ? -1 : 1);
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) throw Error(
        'Das Dokument enthält Zeichen im freizuhaltenden Kästchenrahmen.');
      return row * COLS + col
    };
    for (const field of ['pages', 'inks', 'highlights', 'carries', 'powers', 'fractionEquals']) {
      if (data[field]) data[field] = data[field].map(values => {
        if (!values || typeof values !== 'object' || Array.isArray(values)) throw Error(
          'Ungültiges Blatt.');
        return Object.fromEntries(Object.entries(values).map(([index, value]) => [remap(index), value]))
      })
    }
    if (data.tallBrackets) data.tallBrackets = data.tallBrackets.map(list => list.map(b => ({
      ...b,
      upper: remap(b.upper)
    })));
    data.grid = 'inset-a4'
  }
  const lines = data.pages.map((_, i) => {
    const list = data.lines?.[i] ?? [];
    if (!Array.isArray(list) || list.length > 10000) throw Error('Ungültige Linien.');
    return list.map(line => {
      if (!Array.isArray(line) || ![4, 5].includes(line.length) || !line.slice(0, 4).every(Number
          .isFinite) || (line.length === 5 && !INKS.includes(line[4]))) throw Error(
        'Ungültige Linie.');
      const [x1, y1, x2, y2] = line;
      if (x1 < 0 || x1 > 42 || x2 < 0 || x2 > 42 || y1 < 0 || y1 > 59.4 || y2 < 0 || y2 > 59.4)
      throw Error('Ungültige Linienposition.');
      return [...line]
    })
  });
  const colors = (field, allowed) => data.pages.map((_, i) => {
    const values = data[field]?.[i] ?? {};
    if (!values || typeof values !== 'object' || Array.isArray(values)) throw Error('Ungültige Farben.');
    const clean = {};
    for (const [k, v] of Object.entries(values)) {
      if (!/^\d+$/.test(k) || +k >= COUNT || !allowed.includes(v)) throw Error('Ungültige Farbe.');
      clean[+k] = v
    }
    return clean
  });
  const smallDigits = field => data.pages.map((_, i) => {
    const values = data[field]?.[i] ?? {};
    if (!values || typeof values !== 'object' || Array.isArray(values)) throw Error(
      'Ungültige Überträge.');
    const clean = {};
    for (const [k, v] of Object.entries(values)) {
      if (!/^\d+$/.test(k) || +k >= COUNT || !v || typeof v.text !== 'string' || (!Array.from(v.text)
          .length || Array.from(v.text).length > 16 || /[\s\u0000-\u001f\u007f]/.test(v.text)) || !INKS
        .includes(v.color)) throw Error('Ungültiger Übertrag.');
      clean[+k] = {
        text: v.text,
        color: v.color,
        ...(field === 'powers' && v.rootDegree === true ? { rootDegree: true } : {}),
        ...(v.integralLimit === true ? { integralLimit: true } : {})
      }
    }
    return clean
  });
  const tallBrackets = data.pages.map((_, i) => {
    const list = data.tallBrackets?.[i] ?? [];
    if (!Array.isArray(list) || list.length > COUNT * 60) throw Error('Ungültige Klammern.');
    return list.map(b => {
      if (!b || !Number.isInteger(b.upper) || b.upper < 0 || b.upper >= COUNT || (!['[', ']',
          '(', ')', '{', '}', '∫', '√', ...relationSymbols
        ].includes(b.side) && !isGreek(b.side) && !(b.text === true && isTallCharacter(b.side))) || !INKS.includes(b.color)) throw Error(
        'Ungültige Klammer.');
      const height = b.height === undefined ? 2 : b.height;
      if (!Number.isInteger(height) || height < 1 || height > ROWS ||
          b.upper + (height - 1) * COLS >= COUNT ||
          b.height !== undefined && !['(', ')', '[', ']', '{', '}', '<', '>', '√', '∫'].includes(b.side) && b.text !== true ||
          b.text !== undefined && (b.text !== true || !isTallCharacter(b.side) || height !== 2))
        throw Error('Ungültige Klammerhöhe.');
      return {
        upper: b.upper,
        side: b.side,
        color: b.color,
        ...(b.height !== undefined ? { height } : {}),
        ...(b.text === true ? { text: true } : {})
      }
    })
  });
  const pencilLines = data.pages.map((_, i) => {
    const list = data.pencilLines?.[i] ?? [];
    if (!Array.isArray(list) || list.length > 100000) throw Error('Ungültige Bleistiftlinien.');
    return list.map(line => {
      if (!Array.isArray(line) || ![4, 5].includes(line.length) || !line.slice(0, 4).every(Number
          .isFinite) || (line.length === 5 && (typeof line[4] !== 'string' || !/^[a-zA-Z0-9_-]{1,80}$/
          .test(line[4]))) || line[0] < 0 || line[0] > 210 || line[2] < 0 || line[2] > 210 || line[
        1] < 0 || line[1] > 297 || line[3] < 0 || line[3] > 297) throw Error(
        'Ungültige Bleistiftlinie.');
      return [...line]
    })
  });
  let freehandPoints = 0;
  const freehand = data.pages.map((_, index) => {
    const strokes = data.freehand?.[index] ?? [];
    if (!Array.isArray(strokes) || strokes.length > 10000) throw Error('Ungültige Bleistiftlinien.');
    return strokes.map(stroke => {
      if (!stroke || !INKS.includes(stroke.color) || !Number.isFinite(stroke.width) ||
        stroke.width < .1 || stroke.width > 3 || !Array.isArray(stroke.points) ||
        !stroke.points.length || stroke.points.length > 50000) throw Error('Ungültige Bleistiftlinie.');
      freehandPoints += stroke.points.length;
      if (freehandPoints > 500000) throw Error('Die Datei ist zu groß.');
      const points = stroke.points.map(point => {
        if (!Array.isArray(point) || point.length !== 2 || !point.every(Number.isFinite) ||
          point[0] < -1e-7 || point[0] > 210 + 1e-7 || point[1] < -1e-7 || point[1] > 297 + 1e-7) {
          throw Error('Ungültige Bleistiftlinie.');
        }
        return [Math.max(0, Math.min(210, point[0])), Math.max(0, Math.min(297, point[1]))];
      });
      return { color: stroke.color, width: stroke.width, points };
    });
  });
  const numberLines = data.pages.map((_, i) => {
    const list = data.numberLines?.[i] ?? [];
    if (!Array.isArray(list) || list.length > 10000) throw Error('Ungültige Zahlenstrahlen.');
    return list.map(axis => {
      if (!Array.isArray(axis) || ![5, 6].includes(axis.length) || !axis.slice(0, 4).every(
          isMillimeterCoordinate) || !INKS.includes(axis[4])) throw Error('Ungültiger Zahlenstrahl.');
      const [x1, y1, x2, y2] = axis;
      if (x1 < 0 || x1 > 42 || x2 < 0 || x2 > 42 || y1 < 0 || y1 > 59.4 || y2 < 0 || y2 > 59.4 || (
          x1 !== x2 && y1 !== y2) || (x1 === x2 && y1 === y2)) throw Error(
        'Ungültige Zahlenstrahlposition.');
      const values = axis[5] ?? {};
      if (!values || typeof values !== 'object' || Array.isArray(values)) throw Error(
        'Ungültige Zahlenstrahlmarken.');
      const labels = {},
        length = Math.hypot(x2 - x1, y2 - y1) * 5;
      for (const [key, text] of Object.entries(values)) {
        if (!/^(0|[1-9]\d*)(\.\d{1,3})?$/.test(key) || +key > length + 1e-7 || typeof text !==
          'string' || Array.from(text).length > 12 || /[\u0000-\u001f\u007f]/.test(text)) throw Error(
          'Ungültige Zahlenstrahlmarke.');
        if (text) labels[key] = text
      }
      return [...axis.slice(0, 5), labels]
    })
  });
  if (data.paperType !== undefined && !['squared', 'millimeter'].includes(data.paperType)) throw Error(
    'Unbekannte Papierart.');
  return {
    version: 1,
    grid: 'inset-a4',
    paperTypes: data.pages.map((_, i) => {
      const type = data.paperTypes?.[i] ?? data.paperType ?? 'squared';
      if (!['squared', 'millimeter'].includes(type)) throw Error('Unbekannte Papierart.');
      return type
    }),
    lines,
    freehand,
    pencilLines,
    numberLines,
    tallBrackets,
    carries: smallDigits('carries'),
    powers: smallDigits('powers'),
    fractionEquals: colors('fractionEquals', INKS).map(values => {
      for (const key of Object.keys(values))
        if (+key >= COUNT - COLS) throw Error('Gleichzeichen außerhalb des Blatts.');
      return values
    }),
    inks: colors('inks', INKS),
    highlights: colors('highlights', MARKERS),
    name: data.name.slice(0, 80),
    pages: data.pages.map(p => {
      if (!p || typeof p !== 'object' || Array.isArray(p)) throw Error('Ungültiges Blatt.');
      const clean = {};
      for (const [key, value] of Object.entries(p)) {
        if (!/^\d+$/.test(key) || +key >= COUNT || typeof value !== 'string' || Array.from(value)
          .length !== 1) throw Error('Ungültiger Kästcheninhalt.');
        clean[+key] = value
      }
      return clean
    })
  }
}

function validate(data) {
  const result = validateDocument(data);
  result.pencilLines.forEach(groupLegacyCompassArcs);
  return result
}
$('openFile').onchange = async e => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    if (file.size > 10000000) throw Error('Die Datei ist zu groß.');
    const loaded = validate(JSON.parse(await file.text()));
    if ((doc.pages.some(p => Object.keys(p).length) || doc.lines.some(lines => lines.length) || doc
        .pencilLines.some(lines => lines.length) || doc.freehand.some(strokes => strokes.length) || doc.numberLines.some(lines => lines.length) || doc
        .highlights.some(h => Object.keys(h).length) || doc.carries.some(c => Object.keys(c).length) ||
        doc.powers.some(c => Object.keys(c).length) || doc.fractionEquals.some(c => Object.keys(c)
        .length) || doc.tallBrackets.some(b => b.length)) && !confirm(
        'Aktuelles Dokument ersetzen? Vorher bei Bedarf als .schmier speichern.')) return;
    checkpoint();
    doc = loaded;
    page = 0;
    pos = 0;
  returnColumn = 0;
    changed()
  } catch (err) {
    alert('Datei konnte nicht geöffnet werden: ' + err.message)
  } finally {
    e.target.value = ''
  }
};

// Feature action called by the shared keyboard dispatcher.
function holdFileAction(code) {
  $(code === 'KeyB' ? 'newFile' : 'open').click();
}
