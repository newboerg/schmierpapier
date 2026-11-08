// add-page — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function addSheet(type = 'squared') {
  if (doc.pages.length >= 200) {
    status('Maximal 200 Blätter pro Dokument.');
    return
  }
  cancelRegion();
  checkpoint();
  doc.paperTypes ??= doc.pages.map(() => paperTypeAt());
  doc.paperTypes.splice(page + 1, 0, type);
  doc.pages.splice(page + 1, 0, {});
  (doc.images ??= doc.pages.slice(0, -1).map(() => [])).splice(page + 1, 0, []);
  (doc.constructionPoints ??= doc.pages.slice(0, -1).map(() => [])).splice(page + 1, 0, []);
  doc.freehand.splice(page + 1, 0, []);
  doc.lines.splice(page + 1, 0, []);
  doc.pencilLines.splice(page + 1, 0, []);
  doc.numberLines.splice(page + 1, 0, []);
  doc.inks.splice(page + 1, 0, {});
  doc.highlights.splice(page + 1, 0, {});
  doc.decimalMarks.splice(page + 1, 0, {});
  doc.taskLabels.splice(page + 1, 0, {});
  doc.carries.splice(page + 1, 0, {});
  doc.powers.splice(page + 1, 0, {});
  doc.fractionEquals.splice(page + 1, 0, {});
  doc.tallBrackets.splice(page + 1, 0, []);
  page++;
  pos = 0;
  returnColumn = 0;
  changed();
  select(pos)
};
$('add').onclick = () => {
  $('addSheetMenu').hidePopover();
  addSheet()
};
$('addSheetArrow').addEventListener('click', () => {
  requestAnimationFrame(() => {
    if ($('addSheetMenu').matches(':popover-open')) positionToolbarMenu($('addSheetMenu'), $('addSheetArrow'));
  });
});
$('addMillimeter').onclick = () => {
  $('addSheetMenu').hidePopover();
  addSheet('millimeter')
};

// Feature action called by the shared keyboard dispatcher.
function holdPaperChoice(code) {
  cancelKeyboardArea();
  openExtraMenu('paperChoiceMenu', $('add'));
}
