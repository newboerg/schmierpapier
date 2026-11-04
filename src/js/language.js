// language — assembled in src/build.json order; shared classic-script scope.

// @part part-01
/*
 * ÜBERSETZUNGEN
 * Statische UI-Texte und Hilfeinhalte für die vollständig lokale Sprachumschaltung.
 */
const UI_TRANSLATIONS = Object.fromEntries(Object.keys(LOCALE_DE.ui).map(key => [key, [LOCALE_EN.ui[key], LOCALE_FR.ui[key]]]));

// @part part-02
const LANGUAGE_KEY = 'schmierpapier.language';

function preferredLanguage() {
  try {
    const stored = readAppStorage(LANGUAGE_KEY);
    if (['de', 'en', 'fr'].includes(stored)) return stored
  } catch {}
  for (const candidate of navigator.languages?.length ? navigator.languages : [navigator.language || 'de']) {
    const base = candidate.toLowerCase().split(/[-_]/)[0];
    if (['de', 'en', 'fr'].includes(base)) return base
  }
  return 'de'
}
let language = preferredLanguage();

function holdTimeText(text) {
  if (typeof text !== 'string') return text;
  const seconds = (settings.holdDelay / 1000).toLocaleString(language, { maximumFractionDigits: 2 });
  return text.replace(/0[,.]6(?=\s*(?:Sekunden|seconds|seconde|s\b))/g, seconds);
}
function tr(source) { return holdTimeText(translateSource(source)); }
function translateSource(source) {
  if (typeof source !== 'string' || language === 'de') return source;
  const index = language === 'en' ? 0 : 1,
    trimmed = source.trim(),
    entry = UI_TRANSLATIONS[trimmed];
  if (entry) return source.replace(trimmed, entry[index]);
  let match;
  const patterns = LOCALES[language].dynamicPatterns;
  for (const [pattern, format] of patterns) {
    match = trimmed.match(pattern);
    if (match) return source.replace(trimmed, format(match))
  }
  for (const prefix of ['Datei konnte nicht geöffnet werden:', 'PDF-Export fehlgeschlagen:'])
    if (trimmed.startsWith(prefix)) return tr(prefix) + ' ' + tr(trimmed.slice(prefix.length).trim());
  if (trimmed.includes(' · ')) {
    const parts = trimmed.split(' · '),
      translated = parts.map(part => tr(part));
    if (translated.some((part, i) => part !== parts[i])) return translated.join(' · ')
  }
  return source;
}

// @part part-03
let localeObserver;
const localeSources = new WeakMap();

function translatedValue(node, key, value) {
  let slots = localeSources.get(node);
  if (!slots) {
    slots = {};
    localeSources.set(node, slots)
  }
  let slot = slots[key];
  if (!slot || value !== slot.output) slot = {
    source: value,
    output: value
  };
  const next = tr(slot.source);
  slot.output = next;
  slots[key] = slot;
  return next
}

function localiseInterface() {
  const visit = node => {
    if (node.nodeType === Node.TEXT_NODE) {
      const next = translatedValue(node, 'text', node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
      return
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if (node.matches('script,style,#name,.numberline-label,#helpContent,#helpNav,#language option,#storageConsentDialog')) return;
    for (const attr of ['title', 'aria-label', 'placeholder'])
      if (node.hasAttribute(attr)) {
        const old = node.getAttribute(attr),
          next = translatedValue(node, attr, old);
        if (old !== next) node.setAttribute(attr, next)
      }
    if (node.matches('.cells,#editor')) return;
    for (const child of [...node.childNodes]) visit(child);
  };
  // Disconnect while changing text, avoiding observer loops and preserving source strings.
  localeObserver?.disconnect();
  visit(document.documentElement);
  localeObserver?.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['title', 'aria-label', 'placeholder']
  });
}

function setLanguage(next, remember = true) {
  if (!['de', 'en', 'fr'].includes(next)) return;
  language = next;
  document.documentElement.lang = next;
  document.getElementById('language').value = next;
  if (remember) try {
    writeAppStorage(LANGUAGE_KEY, next)
  } catch {}
  if (document.getElementById('helpDialog').open) {
    document.getElementById('helpSearch').value = '';
    renderHelp()
  }
  updateKeypadLanguage();
  localiseInterface();
  scheduleToolbarLayout();
}

function initialiseLanguage() {
  // Greek names are UI labels; their option values and inserted letters stay untouched.
  const greekNames = {
    My: ['Mu', 'Mu'],
    Ny: ['Nu', 'Nu'],
    Omikron: ['Omicron', 'Omicron'],
    Rho: ['Rho', 'Rhô'],
    Phi: ['Phi', 'Phi'],
    Chi: ['Chi', 'Khi'],
    Psi: ['Psi', 'Psi'],
    Sigma: ['Sigma', 'Sigma']
  };
  for (const [symbol, source] of greekChoices) {
    const parts = source.split(' · ');
    let name = parts[1],
      size = '';
    if (name.endsWith(' klein')) {
      name = name.slice(0, -6);
      size = 'lower'
    } else if (name.endsWith(' groß')) {
      name = name.slice(0, -5);
      size = 'upper'
    } else if (name.endsWith(' am Wortende')) {
      name = name.slice(0, -12);
      size = 'final'
    }
    const names = greekNames[name] || [name, name];
    UI_TRANSLATIONS[source] = names.map((word, i) => parts[0] + ' · ' + word + (size === 'lower' ? (i ?
        ' minuscule' : ' lowercase') : size === 'upper' ? (i ? ' majuscule' : ' uppercase') : size ===
      'final' ? (i ? ' final' : ' final') : ''))
  }
  const nativeAlert = window.alert.bind(window),
    nativeConfirm = window.confirm.bind(window);
  window.alert = message => nativeAlert(tr(String(message)));
  window.confirm = message => nativeConfirm(tr(String(message)));
  localeObserver = new MutationObserver(() => localiseInterface());
  document.getElementById('language').addEventListener('change', e => setLanguage(e.target.value));
  setLanguage(language, false);
}
