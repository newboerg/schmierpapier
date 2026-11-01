// superscript — assembled in src/build.json order; shared classic-script scope.

// @part part-01
$('powerMode').onclick = () => toggleSmallMode('powers');

// @part part-02
function writePower(text) {
  checkpoint();
  doc.powers[page][pos] = {
    text,
    color: ink
  };
  pos = Math.min(pos + 1, COUNT - 1);
  changed();
  select(pos)
}
