// storage-consent — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * SPRACHE UND UI-LOKALISIERUNG
 * Sprach- und Ansichtseinstellungen liegen außerhalb des gespeicherten Dokuments.
 */
/* Persistenz ist ausschließlich nach ausdrücklicher Zustimmung erlaubt.
 * Eine Ablehnung wird absichtlich nicht gespeichert; beim nächsten Start wird erneut gefragt.
 */
// Die Speicherentscheidung verwendet ausschließlich die Browsersprache,
// unabhängig von der auf Deutsch/Englisch/Französisch beschränkten App-Oberfläche.
const CONSENT_TRANSLATIONS = { ...CONSENT_EU, de: LOCALE_DE.consent, en: LOCALE_EN.consent, fr: LOCALE_FR.consent };

function consentBrowserLanguage() {
  // Manche Emulatoren ändern nur die Hauptsprache, nicht die Liste weiterer Sprachen.
  const preferences = [navigator.language, ...(navigator.languages || [])].filter(Boolean);
  for (const candidate of preferences) {
    const base = String(candidate).toLowerCase().split(/[-_]/)[0];
    if (Object.hasOwn(CONSENT_TRANSLATIONS, base)) return base;
  }
  return 'en';
}

function renderStorageConsent() {
  const locale = consentBrowserLanguage();
  const [title, details, refusal, manual, decline, accept] = CONSENT_TRANSLATIONS[locale];
  const dialog = $('storageConsentDialog');
  dialog.lang = locale;
  $('storageConsentTitle').textContent = title;
  const paragraphs = dialog.querySelectorAll('p');
  [details, refusal, manual].forEach((text, index) => { paragraphs[index].textContent = text; });
  $('storageDecline').textContent = decline;
  $('storageAccept').textContent = accept;
}

const STORAGE_CONSENT_KEY = 'schmierpapier.storageConsent';
const APP_STORAGE_KEYS = [STORAGE_CONSENT_KEY, 'schmierpapier.v1', 'schmierpapier.language',
  'schmierpapier.pageView', 'schmierpapier.zoom'];
let storageAllowed = false;
let initialStoragePrompt = false;
try { storageAllowed = localStorage.getItem(STORAGE_CONSENT_KEY) === 'accepted-v1'; } catch {}

function readAppStorage(key) {
  return storageAllowed ? localStorage.getItem(key) : null;
}
function writeAppStorage(key, value) {
  if (storageAllowed) localStorage.setItem(key, value);
}
function removeAppStorage(key) {
  if (storageAllowed) localStorage.removeItem(key);
}
function openStorageConsent(initial = false) {
  renderStorageConsent();
  if ($('storageConsentDialog').open) return;
  initialStoragePrompt = initial;
  $('storageConsentDialog').showModal();
  $('storageDecline').focus();
}
function chooseStorage(allow) {
  clearTimeout(saveTimer);
  const firstChoice = initialStoragePrompt;
  initialStoragePrompt = false;
  storageAllowed = allow;
  $('storageConsentDialog').close();
  if (!allow) {
    let cleared = true;
    for (const key of APP_STORAGE_KEYS) {
      try { localStorage.removeItem(key); } catch { cleared = false; }
    }
    status(cleared ? 'Keine Browserspeicherung · nur diese Sitzung' :
      'Speicherung aus · vorhandene Browserdaten konnten nicht vollständig gelöscht werden');
    return;
  }
  try {
    if (firstChoice) {
      const saved = readAppStorage(KEY);
      if (saved) doc = validate(JSON.parse(saved));
      page = 0; pos = 0;
      const savedView = readAppStorage('schmierpapier.pageView');
      pageView = savedView === '1' ? '1' : '2';
      $('pageView').value = pageView;
      const savedZoom = Number(readAppStorage('schmierpapier.zoom'));
      manualZoom = savedZoom >= .25 && savedZoom <= 2 ? savedZoom : null;
      setLanguage(preferredLanguage(), false);
      render();
    }
  } catch { status('Gespeicherter Stand konnte nicht geladen werden.'); }
  try {
    writeAppStorage(STORAGE_CONSENT_KEY, 'accepted-v1');
    writeAppStorage(LANGUAGE_KEY, language);
    const preferences = tutorial ? tutorial.backup : { pageView, manualZoom };
    writeAppStorage('schmierpapier.pageView', preferences.pageView);
    if (preferences.manualZoom === null) removeAppStorage('schmierpapier.zoom');
    else writeAppStorage('schmierpapier.zoom', String(preferences.manualZoom));
    status('Browserspeicherung erlaubt');
  } catch { status('Browserspeicher nicht verfügbar – bitte als .schmier speichern'); }
  persist();
}
