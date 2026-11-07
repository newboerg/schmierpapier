// history — assembled in src/build.json order; shared classic-script scope.

// @part part-01
function checkpoint() {
  history.push(JSON.stringify({
    doc,
    page,
    pos,
    returnColumn
  }));
  trimHistory(history);
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
  trimHistory(to);
  const state = JSON.parse(from.pop());
  doc = state.doc;
  page = state.page;
  pos = state.pos;
  returnColumn = state.returnColumn ?? pos % COLS;
  changed()
}

// Embedded pictures can make snapshots large; keep undo memory bounded.
function trimHistory(stack) {
  let bytes = stack.reduce((sum, snapshot) => sum + snapshot.length, 0);
  while (stack.length > 1 && (stack.length > 150 || bytes > 50000000)) bytes -= stack.shift().length;
}
