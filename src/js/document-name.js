// document-name — assembled in src/build.json order; shared classic-script scope.

// @part part-01
$('name').addEventListener('change', () => {
  checkpoint();
  doc.name = $('name').value.trim() || 'Mein Rechenblatt';
  changed()
});
