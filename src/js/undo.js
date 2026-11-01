// undo — assembled in src/build.json order; shared classic-script scope.

// @part part-01
$('undo').onclick = () => restore(history, future);
