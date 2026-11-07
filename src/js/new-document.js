// new-document — assembled in src/build.json order; shared classic-script scope.

// @part part-01
$('newFile').onclick = () => {
  const hasContent = doc.pages.some(p => Object.keys(p).length) || ['lines', 'pencilLines', 'numberLines', 'freehand',
      'tallBrackets', 'images'
    ].some(field => doc[field].some(p => p.length)) || ['highlights', 'carries', 'powers', 'fractionEquals', 'decimalMarks', 'taskLabels']
    .some(field => doc[field].some(p => Object.keys(p).length));
  if (hasContent && !confirm(
      'Neue Datei erstellen? Das aktuelle Dokument wird ersetzt. Speichere es vorher bei Bedarf als .schmier-Datei.'
      )) return;
  cancelKeyboardArea(); cancelKeyboardLine(); cancelStrike();
  hideCompass();
  cancelNumberLine(false);
  finishMark();
  cancelRegion();
  checkpoint();
  resetCorner();
  doc = validate({
    version: 1,
    grid: 'inset-a4',
    name: 'Mein Rechenblatt',
    pages: [{}]
  });
  page = 0;
  pos = 0;
  returnColumn = 0;
  changed();
  select(pos);
};
