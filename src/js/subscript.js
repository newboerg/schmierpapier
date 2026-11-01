// subscript — assembled in src/build.json order; shared classic-script scope.

// @part part-01
$('carryMode').onclick = () => toggleSmallMode('carries');

// @part part-02
function writeCarry(text) {
  checkpoint();
  doc.carries[page][pos] = {
    text,
    color: ink
  };
  if (pos + COLS < COUNT) pos += COLS;
  changed();
  select(pos)
}
