// export — assembled in src/build.json order; shared classic-script scope.

// @part part-01
// Eigenständiger PDF-Export: JPEG-Seiten werden ohne Bibliotheken in eine PDF eingebettet.

/*
 * PDF UND DRUCK
 * PDF zeichnet die Dokumentinhalte unabhängig vom Bildschirmzoom auf A4-Canvasflächen.
 * Für Browserdruck werden separate Seitenkopien ohne Werkzeuge und Eingabefelder aufgebaut.
 */
async function pdfExport() {
  const button = $('pdf');
  button.disabled = true;
  button.textContent = 'PDF wird erstellt …';
  try {
    await document.fonts.load('16px ' + (settings.font === 'console' ? 'OfflineConsole' : 'OfflineHandschrift'));
    await document.fonts.load('16px OfflineSymbols');
    await document.fonts.ready;
    const encoder = new TextEncoder(),
      parts = [],
      offsets = [0];
    let length = 0;
    const append = x => {
      const bytes = typeof x === 'string' ? encoder.encode(x) : x;
      parts.push(bytes);
      length += bytes.length
    };
    const object = (id, body) => {
      offsets[id] = length;
      append(`${id} 0 obj\n${body}\nendobj\n`)
    };
    append('%PDF-1.4\n');
    const n = doc.pages.length;
    object(1, '<< /Type /Catalog /Pages 2 0 R >>');
    object(2, `<< /Type /Pages /Count ${n} /Kids [${doc.pages.map((_,i)=>`${3+i*3} 0 R`).join(' ')}] >>`);
    for (let p = 0; p < n; p++) {
      const scale = 8,
        canvas = document.createElement('canvas');
      canvas.width = 210 * scale;
      canvas.height = 297 * scale;
      const c = canvas.getContext('2d');
      paintPaperGrid(c, scale, paperTypeAt(p));
      c.globalAlpha = .5;
      for (const [k, color] of Object.entries(doc.highlights[p])) {
        c.fillStyle = color;
        c.fillRect((5 + (+k % COLS) * 5) * scale, (5 + Math.floor(+k / COLS) * 5) * scale, 5 * scale, 5 *
          scale)
      }
      c.globalAlpha = 1;
      c.strokeStyle = '#172e65';
      c.lineWidth = .45 * scale;
      c.lineCap = 'round';
      for (const [x1, y1, x2, y2, color] of doc.lines[p]) {
        c.strokeStyle = color || '#172e65';
        c.beginPath();
        c.moveTo(x1 * 5 * scale, y1 * 5 * scale);
        c.lineTo(x2 * 5 * scale, y2 * 5 * scale);
        c.stroke()
      }
      c.strokeStyle = '#555b60';
      c.lineWidth = .2 * scale;
      for (const [x1, y1, x2, y2] of doc.pencilLines[p]) {
        c.beginPath();
        c.moveTo(x1 * scale, y1 * scale);
        c.lineTo(x2 * scale, y2 * scale);
        c.stroke()
      }
      for (const axis of doc.numberLines[p]) {
        const shape = numberLineShape(axis, doc.numberLines[p], doc.lines[p], doc.pencilLines[p]);
        c.strokeStyle = axis[4];
        c.fillStyle = axis[4];
        c.lineWidth = .3 * scale;
        c.beginPath();
        for (const [x1, y1, x2, y2] of shape.segments) {
          c.moveTo(x1 * scale, y1 * scale);
          c.lineTo(x2 * scale, y2 * scale)
        }
        c.stroke();
        if (shape.arrow.length) {
          c.beginPath();
          shape.arrow.forEach(([x, y], i) => i ? c.lineTo(x * scale, y * scale) : c.moveTo(x * scale, y *
            scale));
          c.closePath();
          c.fill()
        }
        c.save();
        c.font = `${3.6*scale}px ${writingFont()}`;
        c.textBaseline = 'middle';
        for (const label of shape.labels) {
          c.textAlign = label.anchor === 'end' ? 'right' : label.anchor === 'start' ? 'left' : 'center';
          c.fillText(label.text, label.x * scale, label.y * scale, 10 * scale)
        }
        c.restore()
      }
      for (const [index, color] of Object.entries(doc.fractionEquals[p])) {
        const x = (7.5 + (+index % COLS) * 5) * scale,
          y = (10 + Math.floor(+index / COLS) * 5) * scale;
        c.strokeStyle = color;
        c.lineWidth = .35 * scale;
        for (const offset of [-.65, .65]) {
          c.beginPath();
          c.moveTo(x - 1.5 * scale, y + offset * scale);
          c.lineTo(x + 1.5 * scale, y + offset * scale);
          c.stroke()
        }
      }
      for (const bracket of doc.tallBrackets[p]) {
        if (bracket.text) {
          c.save(); c.fillStyle = bracket.color;
          c.font = `${11*scale}px ${writingFont()}`;
          c.textAlign = 'center'; c.textBaseline = 'middle';
          c.fillText(bracket.side, (7.5 + (bracket.upper % COLS) * 5) * scale,
            (10 + Math.floor(bracket.upper / COLS) * 5) * scale, 4.2 * scale);
          c.restore(); continue;
        }
        if (isGreek(bracket.side)) {
          c.save();
          c.fillStyle = bracket.color;
          c.font = `${8*scale}px ${settings.font === "console" ? writingFont() : "OfflineSymbols"}`;
          c.textAlign = 'center';
          c.textBaseline = 'middle';
          c.fillText(bracket.side, (7.5 + (bracket.upper % COLS) * 5) * scale, (10 + Math.floor(bracket
            .upper / COLS) * 5) * scale, 4 * scale);
          c.restore();
          continue
        }
        c.save();
        c.scale(scale, scale);
        c.strokeStyle = bracket.color;
        c.lineWidth = .35;
        c.stroke(new Path2D(bracketPath(bracket)));
        c.restore()
      }
      c.font = `${5.5*scale}px ${writingFont()}`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.fillStyle = '#172e65';
      for (const [k, v] of Object.entries(doc.pages[p])) {
        c.fillStyle = doc.inks[p][k] || '#172e65';
        if (v === '√') {
          c.save(); c.scale(scale, scale); c.strokeStyle = doc.inks[p][k] || '#172e65'; c.lineWidth = .35;
          c.stroke(new Path2D(rootPath(+k))); c.restore();
        } else c.fillText(v, (7.5 + (+k % COLS) * 5) * scale, (7.5 + Math.floor(+k / COLS) * 5) * scale)
      }
      c.font = `${3.3*scale}px ${writingFont()}`;
      c.textAlign = 'right';
      c.textBaseline = 'bottom';
      for (const [k, carry] of Object.entries(doc.carries[p])) {
        c.fillStyle = carry.color;
        if (carry.integralLimit) {
          c.save(); c.font = `${2*scale}px ${writingFont()}`; c.textAlign = 'left';
          c.fillText(carry.text, (8.1 + (+k % COLS) * 5) * scale, (10 + Math.floor(+k / COLS) * 5) * scale);
          c.restore();
          continue;
        }
        c.fillText(carry.text, (10.2 + (+k % COLS) * 5) * scale, (10.6 + Math.floor(+k / COLS) * 5) * scale)
      }
      c.textBaseline = 'top';
      for (const [k, power] of Object.entries(doc.powers[p])) {
        c.fillStyle = power.color;
        if (power.integralLimit) {
          c.save(); c.font = `${2*scale}px ${writingFont()}`; c.textAlign = 'left';
          c.fillText(power.text, (9.3 + (+k % COLS) * 5) * scale, (5 + Math.floor(+k / COLS) * 5) * scale);
          c.restore();
        } else if (power.rootDegree) {
          c.save();
          c.font = `${2*scale}px ${writingFont()}`;
          c.textAlign = 'left';
          c.fillText(power.text, (5.1 + (+k % COLS) * 5) * scale, (5.1 + Math.floor(+k / COLS) * 5) * scale, 3 * scale);
          c.restore();
        } else {
          c.save();
          c.textAlign = 'left';
          c.fillText(power.text, (9 + (+k % COLS) * 5) * scale, (4.4 + Math.floor(+k / COLS) * 5) * scale);
          c.restore();
        }
      }
      c.save();
      c.font = `${4.2*scale}px ${writingFont()}`; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
      for (const [index, mark] of Object.entries(doc.decimalMarks[p])) {
        c.fillStyle = mark.color;
        c.fillText(mark.text, (DECIMAL_MARK_X + (+index % COLS) * 5) * scale, (9.7 + Math.floor(+index / COLS) * 5) * scale);
      }
      for (const [index, label] of Object.entries(doc.taskLabels[p])) {
        c.font = `${taskLabelFontSize(label)*scale}px ${writingFont()}`;
        c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = label.color;
        c.fillText(label.text, (10 + (+index % COLS) * 5) * scale,
          (5 + Math.floor(+index / COLS) * 5 + label.height * 2.5) * scale, 9.2 * scale);
      }
      c.restore();
      paintFreehand(c, scale, doc.freehand[p]);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .95));
      if (!blob) throw Error('Bild konnte nicht erzeugt werden.');
      const bytes = new Uint8Array(await blob.arrayBuffer()),
        id = 3 + p * 3;
      object(id,
        `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.2756 841.8898] /Resources << /XObject << /Im ${id+1} 0 R >> >> /Contents ${id+2} 0 R >>`
        );
      offsets[id + 1] = length;
      append(
        `${id+1} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`
        );
      append(bytes);
      append('\nendstream\nendobj\n');
      const stream = 'q 595.2756 0 0 841.8898 0 0 cm /Im Do Q';
      object(id + 2, `<< /Length ${encoder.encode(stream).length} >>\nstream\n${stream}\nendstream`);
      button.textContent = `PDF: Blatt ${p+1} / ${n}`;
      await new Promise(resolve => setTimeout(resolve, 0))
    }
    const start = length;
    append(`xref\n0 ${3+n*3}\n0000000000 65535 f \n`);
    for (let i = 1; i < 3 + n * 3; i++) append(String(offsets[i]).padStart(10, '0') + ' 00000 n \n');
    append(`trailer\n<< /Size ${3+n*3} /Root 1 0 R >>\nstartxref\n${start}\n%%EOF`);
    download(new Blob(parts, {
      type: 'application/pdf'
    }), filename() + '.pdf');
    status('PDF exportiert · alle Blätter enthalten');
    if (tutorial) {
      tutorial.exported = true;
      scheduleTutorialCheck()
    }
  } catch (err) {
    alert('PDF-Export fehlgeschlagen: ' + err.message)
  } finally {
    button.disabled = false;
    button.textContent = 'PDF exportieren'
  }
}
$('pdf').onclick = pdfExport;

function preparePrint() {
  document.getElementById('printSheets')?.remove();
  const sheets = document.createElement('div');
  sheets.id = 'printSheets';
  const originalPage = page;
  for (let p = 0; p < doc.pages.length; p++) {
    page = p;
    renderLines();
    const sheet = $('paper').cloneNode(true);
    sheet.removeAttribute('id');
    sheet.className = 'paper' + (paperTypeAt() === 'millimeter' ? ' millimeter' : '');
    setPaperGrid(sheet, paperTypeAt(p));
    sheet.querySelector('.editor')?.remove();
    sheet.querySelector('.geo-overlay')?.remove();
    sheet.querySelector('.compass-overlay')?.remove();
    sheet.querySelector('.axis-label-editor')?.remove();
    sheet.querySelectorAll('.region-box,.paper-badge,.keyboard-line-preview,.keyboard-area,.stretch-bracket-preview').forEach(el => el.remove());
    sheet.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    sheet.querySelectorAll('.cell').forEach((el, index) => {
      el.classList.remove('selected');
      el.textContent = doc.pages[p][index] === '√' ? '' : (doc.pages[p][index] || '');
      el.style.color = doc.inks[p][index] || '#172e65';
      el.style.backgroundColor = doc.highlights[p][index] ? doc.highlights[p][index] + '80' : '';
      for (const [field, css] of [
          ['carries', 'carry'],
          ['powers', 'carry power']
        ]) {
        const value = doc[field][p][index];
        if (value) {
          const small = document.createElement('span');
          small.className = css + (field === 'powers' && value.rootDegree ? ' root-degree' : '') + (value.integralLimit ? ' integral-limit' : '');
          small.textContent = value.text;
          small.style.color = value.color;
          el.append(small)
        }
      }
    });
    sheets.append(sheet);
  }
  page = originalPage;
  renderLines();
  document.body.append(sheets);
}
window.addEventListener('beforeprint', preparePrint);
window.addEventListener('afterprint', () => document.getElementById('printSheets')?.remove());
$('print').onclick = async () => {
  await document.fonts.ready;
  window.print()
};

// Feature action called by the shared keyboard dispatcher.
function holdPdfExport(code) {
  $('pdf').click();
}
