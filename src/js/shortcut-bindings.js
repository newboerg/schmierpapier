// @part part-01
// Default inputs double as the common vocabulary used by the paper's tools.
const CTRL = 1, SHIFT = 2, ALT = 4, META = 8;
const shortcutDefinitions = [];
function defineShortcut(id, label, key, { code = key, mods = 0, aliases = [], hold = false, target = '', global = false } = {}) {
  shortcutDefinitions.push({ id, label, code, key, mods, binding: mods + ':' + key, aliases, hold, target, global });
}
defineShortcut('newline', 'Neue Zeile', 'Enter');
defineShortcut('equal', 'Gleichzeichen', 'NumpadEnter', { target: '#relationEqual' });
for (const [id, label, key, mods = 0] of [
  ['left','Kästchen nach links','ArrowLeft'], ['right','Kästchen nach rechts','ArrowRight'],
  ['up','Kästchen nach oben','ArrowUp'], ['down','Kästchen nach unten','ArrowDown'],
  ['home','Zeilenanfang','Home'], ['end','Zeilenende','End'],
  ['tab','Nächstes Kästchen','Tab'], ['backtab','Vorheriges Kästchen','Tab',SHIFT],
  ['backspace','Zeichen löschen / zurück','Backspace'], ['escape','Werkzeug oder Auswahl abbrechen','Escape']
]) defineShortcut(id, label, key, { mods, global: id === 'escape' });

for (const [id, label, key, target] of [
  ['previous','Vorherige Seite','PageUp','#prev'], ['next','Nächste Seite','PageDown','#next'],
  ['add','Papierart auswählen','Insert','#add'], ['delete','Seite löschen / kurz: Zeichen löschen','Delete','#remove'],
  ['zoomIn','Vergrößern / kurz: Plus','+','#zoomIn'], ['zoomOut','Verkleinern / kurz: Minus','-','#zoomOut']
]) defineShortcut(id, label, key, { hold: true, target });

for (const [id, label, key, target, mods = 0] of [
  ['hints','Tastenhinweise','t','#shortcutHintsToggle'], ['settings','Einstellungen','f','#settingsOpen'],
  ['image','Bild einfügen','b','#insertImage'], ['loadHold','Datei laden','o','#open'],
  ['strike','Durchstreichen','s','#strikeToggle'], ['spread','Einzel- oder Doppelseite','d','#pageView'],
  ['pdf','PDF exportieren','e','#pdf'], ['style','Linienart wechseln','j','#lineStyleToggle'],
  ['point','Konstruktionspunkt','h','#constructionPoint'], ['fraction','Bruch einfügen','v','#fractionInsert'],
  ['label','Aufgabenbezeichnung','a','#taskLabel'], ['cut','Bereich ausschneiden','x','#cutRegion'],
  ['copy','Bereich kopieren','c','#copyRegion'], ['large','Doppelhohe Schrift','u','#largeMode'],
  ['erase','Radierer','r','.swatch[data-tool="eraser"]'], ['compass','Zirkel','k','#compassToggle'],
  ['ruler','Geodreieck','g','#geoToggle'], ['axis','Zahlenstrahl','n','#numberLineToggle'],
  ['integral','Integrale auswählen','i','#integral'], ['greek','Griechische Zeichen','p','#greek'],
  ['root','Wurzeln auswählen','q','#root'], ['rootDirect','Wurzel einfügen','w',''],
  ['logic','Logikzeichen','l','#logic'], ['sets','Mengenzeichen','m','#sets'],
  ['misc','Verschiedene Symbole','z','#percent'], ['rootUp','Wurzel nach oben','w','',SHIFT],
  ['greekUp','Griechische Zeichen hochgestellt','p','',SHIFT]
]) defineShortcut(id, label, key, { code: 'Key' + key.toUpperCase(), hold: true, target, mods,
  global: ['hints','style','point','ruler','compass'].includes(id) });

for (const [i, label] of [
  'Schwarzer Stift','Blauer Stift','Grüner Stift','Roter Stift','Pinker Textmarker',
  'Gelber Textmarker','Grüner Textmarker','Öffnende Klammern','Schließende Klammern'
].entries()) {
  const key = String(i + 1);
  const target = i < 4 ? '.swatch[data-tool="pen"]' : i < 7 ? '.swatch[data-tool="marker"]' : i === 7 ? '#parenOpen' : '#parenClose';
  defineShortcut('digit' + key, label, key, { code: 'Digit' + key, aliases: ['0:Numpad' + key], hold: true, target });
}
for (const [id, label, key, target, mods = CTRL] of [
  ['new','Neue Datei','n','#newFile'], ['load','Datei laden','o','#open'],
  ['save','Datei speichern','s','#save'], ['undo','Rückgängig','z','#undo'],
  ['redo','Wiederholen','y','#redo'], ['redoAlt','Wiederholen (Alternative)','z','',CTRL | SHIFT],
  ['print','Drucken','p','#print']
]) defineShortcut(id,label,key,{ code:'Key'+key.toUpperCase(),mods,aliases:[((mods & ~CTRL)|META)+':'+key],target,global:true });
defineShortcut('help','Hilfe','F1',{target:'#helpOpen',global:true});
defineShortcut('fullscreen','Vollbild','F11',{target:'#fullscreen',global:true});
defineShortcut('powers','Hochstellen ein-/ausschalten','Shift',{code:'ShiftLeft',hold:true,target:'#powerMode'});
defineShortcut('carries','Tiefstellen ein-/ausschalten','Control',{code:'ControlLeft',hold:true,target:'#carryMode'});
defineShortcut('fractionDown','Bruch-Gleichzeichen nach unten','Enter',{mods:CTRL,aliases:['1:NumpadEnter']});
defineShortcut('fractionUp','Bruch-Gleichzeichen nach oben','Enter',{mods:SHIFT,aliases:['2:NumpadEnter']});
defineShortcut('squareOpen','Eckige Klammer auf','8',{code:'Digit8',mods:ALT});
defineShortcut('squareClose','Eckige Klammer zu','9',{code:'Digit9',mods:ALT});
defineShortcut('multiply','Malpunkt','NumpadMultiply');
defineShortcut('divide','Geteiltzeichen (Doppelpunkt)','NumpadDivide');
for (let digit = 0; digit <= 9; digit++) {
  defineShortcut('power'+digit,'Hochgestellte Ziffer',String(digit),{code:'Digit'+digit,mods:SHIFT,aliases:['2:Numpad'+digit]});
  defineShortcut('carry'+digit,'Tiefgestellte Ziffer',String(digit),{code:'Digit'+digit,mods:CTRL,aliases:['1:Numpad'+digit]});
}

const shortcutById = new Map(shortcutDefinitions.map(definition => [definition.id, definition]));
const activeShortcutKeys = new Map();
const originalShortcutEvents = new WeakMap();
const shortcutModifiers = { Control: CTRL, Shift: SHIFT, Alt: ALT, Meta: META };

function shortcutTriggers(definition, bindings) {
  const override = bindings[definition.id];
  return override ? [override] : [definition.binding, ...definition.aliases];
}

function validShortcut(value) {
  return typeof value === 'string' && /^(?:[0-9]|1[0-5]):(?:[\p{L}\p{N}\p{P}\p{S}]|Enter|Numpad(?:Enter|[0-9]|Multiply|Divide|Decimal)|Escape|Tab|Backspace|Delete|Insert|Home|End|PageUp|PageDown|Arrow(?:Up|Down|Left|Right)|F(?:[1-9]|1[0-9]|2[0-4])|Space|Control|Shift|Alt|Meta)$/u.test(value);
}

function shortcutConflicts(bindings) {
  const owners = new Map(), conflicts = new Set();
  for (const definition of shortcutDefinitions) {
    for (const trigger of shortcutTriggers(definition, bindings)) {
      const owner = owners.get(trigger);
      if (owner) { conflicts.add(owner); conflicts.add(definition.id); }
      else owners.set(trigger, definition.id);
    }
  }
  return conflicts;
}

function normaliseShortcuts(value) {
  const bindings = {};
  for (const definition of shortcutDefinitions) {
    const candidate = value?.[definition.id];
    if (validShortcut(candidate) && candidate !== definition.binding) bindings[definition.id] = candidate;
  }
  return shortcutConflicts(bindings).size ? {} : bindings;
}

function physicalShortcut(event) {
  let key = event.key;
  let mods = (event.ctrlKey ? CTRL : 0) | (event.shiftKey ? SHIFT : 0) |
    (event.altKey ? ALT : 0) | (event.metaKey ? META : 0);
  if (event.getModifierState('AltGraph')) return '';
  if (shortcutModifiers[key]) mods &= ~shortcutModifiers[key];
  else if (key === '+' || key === '-') mods &= ~SHIFT;
  if (/^Numpad(?:Enter|[0-9]|Multiply|Divide|Add|Subtract|Decimal)$/.test(event.code) &&
      (key.length === 1 || /^Numpad[1-9]$/.test(event.code) || ['Enter','Add','Subtract','Multiply','Divide','Decimal'].includes(key))) {
    if (event.code === 'NumpadAdd') key = '+';
    else if (event.code === 'NumpadSubtract') key = '-';
    else key = event.code;
  } else if (/^Digit[0-9]$/.test(event.code) && !['+','-'].includes(key)) key = event.code.slice(-1);
  else if (key === ' ') key = 'Space';
  else if (key.length === 1) key = key.toLowerCase();
  return mods + ':' + key;
}

function shortcutToolIsActive() {
  return extraMenu || greekMenuOpen || relationMenuOpen || keyboardArea || keyboardLine ||
    stretchBracket || constructionPointTool || imageSession || compass.keyboard || geo.keyboard;
}

function translateShortcutEvent(event, rawCode, release = false) {
  if (!event.isTrusted) return;
  let logical = activeShortcutKeys.get(rawCode);
  if (release) activeShortcutKeys.delete(rawCode);
  if (!logical && !release) {
    if (tutorial || event.isComposing || document.querySelector('dialog[open]') || editableDialogField(event.target)) return;
    const physical = physicalShortcut(event);
    const bindings = settings.shortcuts;
    const onPaper = event.target === $('editor') || event.target.closest?.('#paper,.image-controls');
    const definition = shortcutDefinitions.find(entry =>
      (entry.global || onPaper) && shortcutTriggers(entry, bindings).includes(physical));
    if (definition) {
      const effective = definition.id === 'newline' && settings.combineEnter ? shortcutById.get('equal') : definition;
      // Leave default events alone, including their physical code and modifier state.
      if (effective === definition && !bindings[definition.id]) return;
      const key = effective.key === 'NumpadEnter' ? 'Enter' :
        effective.key === 'NumpadMultiply' ? '*' : effective.key === 'NumpadDivide' ? '/' :
        effective.mods & SHIFT && /^[a-z]$/.test(effective.key) ? effective.key.toUpperCase() : effective.key;
      logical = { key, code: effective.code, mods: effective.mods | (shortcutModifiers[key] || 0),
        originalKey: event.key, originalMods: event.ctrlKey || event.altKey || event.metaKey, definition };
    } else {
      const displaced = shortcutDefinitions.find(entry => bindings[entry.id] &&
        (entry.global || onPaper) && (entry.binding === physical || entry.aliases.includes(physical)));
      if (!displaced || (physical === '0:Enter' || physical === '0:NumpadEnter') && shortcutToolIsActive()) return;
      // Leave ordinary browser typing available for the old key.
      logical = { key: 'Unidentified', code: '', mods: 0, originalKey: event.key };
    }
    activeShortcutKeys.set(rawCode, logical);
  }
  if (!logical) return;
  originalShortcutEvents.set(event, { ...logical, rawCode });
  Object.defineProperties(event, {
    key: { value: logical.key }, code: { value: logical.code },
    ctrlKey: { value: Boolean(logical.mods & CTRL) }, shiftKey: { value: Boolean(logical.mods & SHIFT) },
    altKey: { value: Boolean(logical.mods & ALT) }, metaKey: { value: Boolean(logical.mods & META) }
  });
}

function writeShortcutTap(eventKey, shortcut) {
  if (!shortcut) { write(eventKey); return; }
  if (!shortcut.originalMods && Array.from(shortcut.originalKey).length === 1) write(shortcut.originalKey);
}
