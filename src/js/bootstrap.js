// bootstrap — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * START
 * Lokale Sicherung laden, Dokument zeichnen und danach die Oberflächensprache anwenden.
 */
try {
  const saved = readAppStorage(KEY);
  if (saved) {
    doc = validate(JSON.parse(saved));
    status('Letzten Stand wiederhergestellt')
  } else status(storageAllowed ? 'Automatische Browsersicherung bereit' : 'Keine Browserspeicherung · nur diese Sitzung')
} catch {
  status('Browserspeicher nicht verfügbar – bitte als .schmier speichern')
}
initialiseImages();
initialiseToolbarLayout();
applySettings(settings);
render();
initialiseLanguage();

// @part part-02
initialiseSettings();
initialiseTaskLabels();
initialiseFractions();
showSavedReleaseNotes(doc);
initialiseShortcutHints();
initialiseKeypad();
initialiseStrike();
initialiseModifierModes();
initialiseStretchBrackets();
initialiseExtendedControls();
initialiseMathTools();
window.addEventListener('languagechange', renderStorageConsent);
window.addEventListener('load', renderStorageConsent);
window.addEventListener('focus', () => {
  if ($('storageConsentDialog').open) renderStorageConsent();
});
$('storageConsentOpen').onclick = () => openStorageConsent();
$('storageAccept').onclick = () => chooseStorage(true);
$('storageDecline').onclick = () => chooseStorage(false);
$('storageConsentDialog').addEventListener('cancel', event => event.preventDefault());
if (!storageAllowed) openStorageConsent(true);
