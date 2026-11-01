// history — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function checkpoint() {
  history.push(JSON.stringify({
    doc,
    page,
    pos,
    returnColumn
  }));
  if (history.length > 150) history.shift();
  future = []
}

// @part part-02
function restore(from, to) {
  finishPenGesture();
  if (!from.length) return;
  finishNumberLabels();
  cancelRegion();
  to.push(JSON.stringify({
    doc,
    page,
    pos,
    returnColumn
  }));
  const state = JSON.parse(from.pop());
  doc = state.doc;
  page = state.page;
  pos = state.pos;
  returnColumn = state.returnColumn ?? pos % COLS;
  changed()
}
