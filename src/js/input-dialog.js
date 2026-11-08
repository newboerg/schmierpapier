// Shared, release-gated input and confirmation. Registered before all tool capture handlers.
// @part part-01
const physicalInputKeys = new Map();
const swallowedInputKeys = new Set();
let inputRequest = null, focusedInputGate = null;
function inputKeyCode(event) { return event.code || 'key:' + event.key; }
function editableDialogField(node) {
  return node instanceof HTMLElement && node.id !== 'editor' &&
    node.matches('input:not([type=file]):not([type=checkbox]):not([type=radio]):not([type=button]):not([type=submit]),textarea,select');
}
function clearShortcutForInput(code) {
  finishActionHold(code);
  finishPenNumberHold(code);
  if (code === 'KeyP' && greekHold) {clearTimeout(greekHold.timer);greekHold=null;}
  if (['Enter','NumpadEnter'].includes(code) && enterHold) {clearTimeout(enterHold.timer);enterHold=null;}
  if (drawingShortcutHold?.code===code) finishDrawingShortcut();
  if (shortcutHintHold?.code===code) finishShortcutHintHold();
}
function clearPendingInputShortcuts() {
  for (const code of [...actionHolds.keys()]) finishActionHold(code);
  for (const code of [...penNumberHolds.keys()]) finishPenNumberHold(code);
  if (greekHold) {clearTimeout(greekHold.timer);greekHold=null;}
  if (enterHold) {clearTimeout(enterHold.timer);enterHold=null;}
  finishDrawingShortcut();finishShortcutHintHold();cancelModifierModeHolds();
  clearTimeout(arrowPending?.timer);arrowPending=null;
  lineKeys.clear();chordLatched=false;
}
function gatePending(keys) { return [...keys].some(code=>physicalInputKeys.has(code)); }
function refreshInputDialogGate() {
  if (!inputRequest) return;
  const locked=gatePending(inputRequest.blockedKeys);
  $('inputDialogValue').readOnly=locked;
  $('inputDialogAccept').disabled=locked;
  if(!locked&&inputRequest.options.confirm&&document.activeElement===$('inputDialog'))$('inputDialogAccept').focus();
  $('inputDialogHint').textContent=tr(locked ? 'Aktivierungstaste loslassen, dann eingeben.' : 'Enter bestätigt · Esc bricht ab');
}
function requestInput(label, options={}) {
  if(inputRequest) return Promise.resolve(null);
  clearPendingInputShortcuts();
  return new Promise(resolve=>{
    inputRequest={label,options,resolve,blockedKeys:new Set(physicalInputKeys.keys())};
    $('inputDialogTitle').textContent=options.confirm ? 'Bestätigung' : 'Eingabe';
    $('inputDialogLabel').textContent=label;
    $('inputDialogValue').hidden=!!options.confirm;
    $('inputDialogValue').value=String(options.value??'');
    $('inputDialogValue').maxLength=options.maxLength??10000;
    $('inputDialogValue').removeAttribute('aria-invalid');
    $('inputDialogError').textContent='';
    refreshInputDialogGate();localiseInterface();
    $('inputDialog').showModal();
    if(options.confirm)(gatePending(inputRequest.blockedKeys)?$('inputDialog'):$('inputDialogAccept')).focus();
    else {$('inputDialogValue').focus();$('inputDialogValue').select();}
  });
}
function requestConfirmation(label,options={}) {return requestInput(label,{...options,confirm:true}).then(value=>value===true);}
function finishInputDialog(value) {
  const request=inputRequest;if(!request)return;
  for(const code of physicalInputKeys.keys())swallowedInputKeys.add(code);
  clearPendingInputShortcuts();inputRequest=null;focusedInputGate=null;
  $('inputDialog').close();request.resolve(value);
}
function acceptInputDialog() {
  if(!inputRequest || gatePending(inputRequest.blockedKeys))return;
  if(inputRequest.options.confirm){finishInputDialog(true);return;}
  const value=$('inputDialogValue').value;
  const error=inputRequest.options.validate?.(value);
  if(error){$('inputDialogError').textContent=tr(error);$('inputDialogValue').setAttribute('aria-invalid','true');return;}
  finishInputDialog(value);
}
function initialiseInputDialog() {
  $('inputDialogForm').addEventListener('submit',event=>{event.preventDefault();acceptInputDialog();});
  $('inputDialogCancel').onclick=()=>finishInputDialog(null);
  $('inputDialog').addEventListener('cancel',event=>{event.preventDefault();finishInputDialog(null);});
}
function activeMenuActivation(id) {
  return {rootChoiceMenu:'q',integralChoiceMenu:'i',bracketOpenMenu:'8',bracketCloseMenu:'9',
    logicMenu:'l',setsMenu:'m',miscMenu:'z',taskLabelMenu:'a',paperChoiceMenu:'Insert'}[id];
}
// Text fields use Enter only: their activation letters must remain available as text.
function confirmActiveKeyboardTool(event,fresh) {
  if(event.isComposing || event.altKey || event.ctrlKey || event.metaKey || document.querySelector('dialog[open]'))return false;
  if(editableDialogField(event.target)||event.target.closest?.('#imageControls button'))return false;
  const key=event.key.length===1?event.key.toLowerCase():event.key;
  let action=null;
  if(extraMenu && (key==='Enter'||key===activeMenuActivation(extraMenu))) {
    action=()=>{const buttons=[...$(extraMenu).querySelectorAll('button')];chooseExtra(buttons.find(b=>b.classList.contains('menu-current'))||buttons[0],event);};
  } else if(greekMenuOpen && (key==='Enter'||key==='p')) {
    action=()=>chooseGreek($('greekMenu').querySelector('.menu-current')||$('greekMenu').querySelector('button'),event);
  } else if(relationMenuOpen && key==='Enter') {
    action=()=>chooseRelation($('relationMenu').querySelector('.menu-current')||$('relationMenu').querySelector('button'),event);
  } else if(stretchBracket) {
    const side=stretchBracket.side;
    const activation=side==='√'?'q':side==='∫'?'i':'([{<'.includes(side)?'8':'9';
    if(key==='Enter'||key===activation)action=()=>{if(!stretchBracket.pendingInput)commitStretchBracket();};
  } else if(keyboardArea) {
    const mode=keyboardArea.mode;
    const activation={erase:'r',cut:'x',copy:'c',strike:'s'}[mode] || (mode.startsWith('marker')?mode.slice(-1):'');
    if(key==='Enter'||key===activation)action=confirmKeyboardArea;
  } else if(keyboardLine && (key==='Enter'||keyboardLine.numberAxis && key==='n')) {
    action=()=>{if(!keyboardLine.awaitingDirection)keyboardChord(keyboardLine.horizontal);};
  } else if(constructionPointTool && (key==='Enter'||key==='h')) {
    action=placeConstructionPoint;
  } else if(imageSession && (key==='Enter'||key==='b')) {
    action=()=>{if(!imageSession.busy){if(imageSession.phase==='edit')applyImageSession();else chooseImageFile();}};
  }
  if(!action)return false;
  if(tutorial){tutorialGate(event);if(event.defaultPrevented)return true;}
  event.preventDefault();event.stopImmediatePropagation();
  if(fresh){if(event.isTrusted)swallowedInputKeys.add(inputKeyCode(event));action();scheduleTutorialCheck();}
  return true;
}
window.addEventListener('keydown',event=>{
  const code=inputKeyCode(event),fresh=!event.repeat&&(!event.isTrusted||!physicalInputKeys.has(code));
  if(event.isTrusted)physicalInputKeys.set(code,event.key);
  if(swallowedInputKeys.has(code)){event.preventDefault();event.stopImmediatePropagation();return;}
  if(inputRequest){
    event.stopImmediatePropagation();
    if(event.key==='Escape'){event.preventDefault();if(fresh)finishInputDialog(null);return;}
    if(gatePending(inputRequest.blockedKeys)){event.preventDefault();return;}
    if(event.key==='Enter'&&!event.isComposing){event.preventDefault();if(fresh){if(event.target===$('inputDialogCancel'))finishInputDialog(null);else acceptInputDialog();}return;}
    if(inputRequest.options.confirm){
      if(inputRequest.options.activationKeys?.includes(event.key)){event.preventDefault();if(fresh)acceptInputDialog();}
      return;
    }
    if((event.ctrlKey||event.metaKey)&&['s','o','n','p'].includes(event.key.toLowerCase()))event.preventDefault();
    return;
  }
  if(focusedInputGate?.target===event.target && gatePending(focusedInputGate.keys)){
    event.preventDefault();event.stopImmediatePropagation();return;
  }
  confirmActiveKeyboardTool(event,fresh);
},true);
window.addEventListener('keyup',event=>{
  const code=inputKeyCode(event);physicalInputKeys.delete(code);
  inputRequest?.blockedKeys.delete(code);focusedInputGate?.keys.delete(code);
  const blocked=inputRequest||swallowedInputKeys.has(code)||focusedInputGate?.target===event.target&&gatePending(focusedInputGate.keys);
  swallowedInputKeys.delete(code);refreshInputDialogGate();
  if(blocked){clearShortcutForInput(code);event.stopImmediatePropagation();}
},true);
window.addEventListener('focusin',event=>{
  focusedInputGate=editableDialogField(event.target)?{target:event.target,keys:new Set(physicalInputKeys.keys())}:null;
},true);
window.addEventListener('beforeinput',event=>{
  if(inputRequest&&gatePending(inputRequest.blockedKeys)||focusedInputGate?.target===event.target&&gatePending(focusedInputGate.keys)){
    event.preventDefault();event.stopImmediatePropagation();
  }
},true);
window.addEventListener('blur',()=>{physicalInputKeys.clear();swallowedInputKeys.clear();refreshInputDialogGate();});
window.addEventListener('close',event=>{
  if(event.target instanceof HTMLDialogElement&&!event.target.open){
    for(const code of physicalInputKeys.keys())swallowedInputKeys.add(code);
  }
},true);
