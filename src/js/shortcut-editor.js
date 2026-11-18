// @part part-01
let shortcutDraft = null, recordingShortcut = null, recordedModifier = null;

function shortcutLabel(binding) {
  const [mask, key] = binding.split(/:(.*)/s);
  const names = {
    Enter:'Return', NumpadEnter:'Enter (Nummernblock)', Control:'Strg', Shift:'Shift', Alt:'Alt', Meta:'Meta',
    Space:'Leertaste', Escape:'Esc', Backspace:'Rücktaste', Delete:'Entf', Insert:'Einfg',
    PageUp:'Bild ↑', PageDown:'Bild ↓', ArrowLeft:'←', ArrowRight:'→', ArrowUp:'↑', ArrowDown:'↓',
    Home:'Pos1', End:'Ende', NumpadDivide:'Num /', NumpadMultiply:'Num ×', NumpadDecimal:'Num ,'
  };
  const modifiers = [[CTRL,'Strg'],[SHIFT,'Shift'],[ALT,'Alt'],[META,'Meta']]
    .filter(([bit]) => Number(mask) & bit).map(([, name]) => tr(name));
  const display = names[key] || (key.startsWith('Numpad') ? 'Num ' + key.slice(6) : key.toUpperCase());
  return [...modifiers, tr(display)].join(' + ');
}

function shortcutDisplay(definition, bindings = tutorial ? {} : settings.shortcuts) {
  return shortcutLabel(bindings[definition.id] || definition.binding) + (definition.hold ? '…' : '');
}

function stopShortcutRecording() {
  const previous = recordingShortcut;
  recordingShortcut = null;
  recordedModifier = null;
  if (previous) updateShortcutEditor();
}

function updateShortcutEditor() {
  const conflicts = shortcutConflicts(shortcutDraft);
  for (const row of $('shortcutList').querySelectorAll('[data-shortcut]')) {
    const definition = shortcutById.get(row.dataset.shortcut);
    const button = row.querySelector('button');
    const active = recordingShortcut === definition.id;
    const label = definition.id === 'newline' && $('combineEnter').checked ? 'Gleichzeichen (zweite Taste)' : definition.label;
    const name = tr(label) + (/^(power|carry)\d$/.test(definition.id) ? ' ' + definition.key : '');
    row.querySelector('.shortcut-name').textContent = name;
    row.classList.toggle('shortcut-conflict', conflicts.has(definition.id));
    button.setAttribute('aria-pressed', String(active));
    button.setAttribute('aria-invalid', String(conflicts.has(definition.id)));
    button.textContent = active ? tr('Taste drücken …') : shortcutDisplay(definition, shortcutDraft);
    button.setAttribute('aria-label', name + ' · ' + button.textContent);
  }
  $('shortcutConflict').textContent = conflicts.size ? tr('Doppelte Belegung. Weise den markierten Funktionen verschiedene Tasten zu.') : '';
  $('shortcutSave').disabled = conflicts.size > 0 || Boolean(recordingShortcut);
  $('shortcutRecording').textContent = recordingShortcut ? tr('Drücke die gewünschte Taste oder Tastenkombination. Eine einzelne Umschalttaste wird beim Loslassen übernommen.') : '';
  $('shortcutRecordCancel').hidden = !recordingShortcut;
}

function openShortcutEditor() {
  clearPendingInputShortcuts();
  shortcutDraft = { ...settings.shortcuts };
  $('combineEnter').checked = settings.combineEnter;
  const list = $('shortcutList');
  const switchRow = $('combineEnterRow');
  list.replaceChildren();
  for (const definition of shortcutDefinitions) {
    const row = document.createElement('div');
    row.className = 'shortcut-row';
    row.dataset.shortcut = definition.id;
    const label = document.createElement('span');
    label.className = 'shortcut-name';
    const button = document.createElement('button');
    button.type = 'button';
    button.onclick = () => {
      if (recordingShortcut === definition.id) stopShortcutRecording();
      else {
        recordingShortcut = definition.id;
        recordedModifier = null;
        updateShortcutEditor();
      }
    };
    row.append(label, button);
    list.append(row);
    if (definition.id === 'equal') list.append(switchRow);
  }
  updateShortcutEditor();
  $('shortcutDialog').showModal();
  $('shortcutTitle').focus();
}

function recordShortcut(binding) {
  if (!validShortcut(binding)) return;
  const id = recordingShortcut;
  if (binding === shortcutById.get(id).binding) delete shortcutDraft[id];
  else shortcutDraft[id] = binding;
  stopShortcutRecording();
}

function initialiseShortcutEditor() {
  const dialog = $('shortcutDialog');
  $('shortcutsOpen').onclick = openShortcutEditor;
  $('combineEnter').onchange = updateShortcutEditor;
  $('shortcutRecordCancel').onclick = () => {
    const id = recordingShortcut;
    stopShortcutRecording();
    if (id) $('shortcutList').querySelector('[data-shortcut="' + id + '"] button').focus();
  };
  $('shortcutReset').onclick = () => {
    shortcutDraft = {};
    $('combineEnter').checked = false;
    stopShortcutRecording();
    updateShortcutEditor();
  };
  $('shortcutCancel').onclick = () => dialog.close();
  $('shortcutSave').onclick = () => {
    if (recordingShortcut || shortcutConflicts(shortcutDraft).size) return;
    applySettings({ ...settings, shortcuts: shortcutDraft, combineEnter: $('combineEnter').checked }, true);
    persist();
    dialog.close();
  };
  dialog.addEventListener('close', () => {
    shortcutDraft = recordingShortcut = recordedModifier = null;
    $('shortcutsOpen').focus();
  });
}

for (const type of ['keydown', 'keyup']) window.addEventListener(type, event => {
  if (!$('shortcutDialog').open) return;
  event.stopImmediatePropagation();
  if (!recordingShortcut) return;
  event.preventDefault();
  if (event.repeat || event.isComposing) return;
  if (type === 'keydown') {
    const binding = physicalShortcut(event);
    if (Object.hasOwn(shortcutModifiers, event.key)) recordedModifier = { code: event.code, binding };
    else recordShortcut(binding);
  } else if (recordedModifier?.code === event.code) recordShortcut(recordedModifier.binding);
}, true);
