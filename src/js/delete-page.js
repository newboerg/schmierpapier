// delete-page — assembled in src/build.json order; shared classic-script scope.

// @part part-01
$('remove').onclick = () => {
  if (doc.pages.length > 1 && confirm('Dieses Blatt wirklich löschen?')) {
    cancelRegion();
    checkpoint();
    doc.paperTypes?.splice(page, 1);
    doc.pages.splice(page, 1);
    doc.freehand.splice(page, 1);
    doc.lines.splice(page, 1);
    doc.pencilLines.splice(page, 1);
    doc.numberLines.splice(page, 1);
    doc.inks.splice(page, 1);
    doc.highlights.splice(page, 1);
    doc.decimalMarks.splice(page, 1);
    doc.taskLabels.splice(page, 1);
    doc.carries.splice(page, 1);
    doc.powers.splice(page, 1);
    doc.fractionEquals.splice(page, 1);
    doc.tallBrackets.splice(page, 1);
    page = Math.min(page, doc.pages.length - 1);
    pos = 0;
  returnColumn = 0;
    changed()
  }
};

// Feature action called by the shared keyboard dispatcher.
function holdDeletePage(code) {
  cancelKeyboardArea(); $('remove').click(); select(pos);
}
