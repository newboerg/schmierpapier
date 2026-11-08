// Saving records the producing app release independently of the document schema.
// Add future user-visible release summaries here, with matching locale keys.
// @part part-01
const APP_VERSION = '{{version}}';
const RELEASE_NOTES = [
  { version: '0.6.5', items: ["Optional dunkles Papier im Darkmode: in den Einstellungen aktivierbar, standardmäßig aus; PDF und Druck bleiben hell.", "Wurzel- und Integralmenüs zeigen kompakte Symbole mit getrennten Größenpfeilen; alle Zeichen bleiben innerhalb ihrer Buttons.", "Beschriftungsfelder am Zahlenstrahl sind im Darkmode dunkel mit heller Schrift; Papier und gespeicherte Beschriftungsfarben bleiben unverändert.", "G oder K lange halten schaltet das aktive Geodreieck beziehungsweise den Zirkel aus; kurzes Drücken bestätigt weiterhin den Schritt.", "Nach dem Setzen oder Bearbeiten eines Punkts schaltet sich das Punkt-Werkzeug automatisch aus. Für einen weiteren Punkt erneut aktivieren.", "Einheitliche Bestätigung per Enter oder Werkzeugtaste; Eingabedialoge warten auf das Loslassen gehaltener Tasten.", "Linien durchgezogen oder gestrichelt zeichnen (J halten) und beschriftete Konstruktionspunkte setzen (H halten)."] },
  { version: '0.6', items: ["Brüche bequem aus Zähler und Nenner als normale Kästchenschrift mit Bruchstrich einsetzen (V halten).", "Dunkles Farbschema nach Systemeinstellung oder eigener Wahl; Bilder in Kästchen einfügen und anpassen; Parallelzeichen."] },
  { version: '0.5.5', items: ['Werkzeugleiste oben, unten, links oder rechts anordnen; seitlich passen sich Breite und Spalten an das Fenster an.'] },
  { version: '0.5', items: [
    'Komma und Punkt sparen Kästchen; Aufgabenbezeichnungen passen in zwei Kästchen.',
    'Geodreieck: Skalenwerte an Strichanfang und Strichende besser sichtbar.',
    'Einstellungen für Haltezeit und Schrift; gespeicherte Dokumente merken sich die App-Version.'
  ] },
  { version: '0.4.4', items: ['Frei wählbare Höhen für Klammern, Wurzeln und Integrale; doppelhohe Schrift und gemischte Brüche im Tutorial.'] },
  { version: '0.4.3', items: ['Bestimmte Integrale, weitere mathematische Symbolmenüs und sichtbarer Fortschritt beim Halten von Tasten.'] },
  { version: '0.4.2', items: ['Mehr Werkzeuge per Tastatur bedienen; Symbol- und Größenmenüs sowie Tastenhinweise.'] },
  { version: '0.4', items: ['Erweiterte Tastaturbedienung und ein verständlicheres Tutorial.'] }
];
function compareAppVersions(a, b) {
  const left = a.split('.').map(Number), right = b.split('.').map(Number);
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    const delta = (left[i] || 0) - (right[i] || 0);
    if (delta) return Math.sign(delta);
  }
  return 0;
}
function documentForSave() {
  return { ...doc, savedWith: APP_VERSION, settings: { ...settings } };
}
function showSavedReleaseNotes(savedDocument) {
  // No version means an old file. Do not guess an exact release for it.
  if (savedDocument.savedWith === undefined || savedDocument.savedWith && compareAppVersions(savedDocument.savedWith, APP_VERSION) >= 0) return;
  const releases = RELEASE_NOTES.filter(release => compareAppVersions(release.version, APP_VERSION) <= 0 &&
    (!savedDocument.savedWith || compareAppVersions(release.version, savedDocument.savedWith) > 0));
  if (!releases.length) return;
  const dialog = $('releaseDialog');
  $('releaseOrigin').textContent = savedDocument.savedWith
    ? tr('Gespeichert mit Version:') + ' ' + savedDocument.savedWith + ' · ' + tr('Aktuelle Version:') + ' ' + APP_VERSION
    : tr('Dieser ältere Stand enthält keine Versionsangabe. Die folgenden Versionsübersichten dienen zur Orientierung.');
  $('releaseContent').replaceChildren();
  for (const release of releases) {
    const heading = document.createElement('h3'); heading.textContent = 'v' + release.version;
    const list = document.createElement('ul');
    for (const item of release.items) {
      const entry = document.createElement('li'); entry.textContent = tr(item); list.append(entry);
    }
    $('releaseContent').append(heading, list);
  }
  dialog.showModal();
  $('releaseClose').focus();
}
$('releaseClose').onclick = () => $('releaseDialog').close();
$('releaseDialog').addEventListener('close', () => select(pos));
