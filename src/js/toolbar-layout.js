// The toolbar keeps one DOM tree: docking never duplicates controls or their listeners.
// @part part-01
let toolbarLayoutReady = false;
let toolbarLayoutFrame = 0;
let toolbarLayoutBusy = false;

function scheduleToolbarLayout() {
  if (toolbarLayoutReady && !toolbarLayoutFrame) toolbarLayoutFrame = requestAnimationFrame(syncToolbarLayout);
}

function setToolbarStyle(element, key, value) {
  if (element.style.getPropertyValue(key) !== value) element.style.setProperty(key, value);
}

function applyToolbarPosition(position) {
  const changed = document.documentElement.dataset.toolbarPosition !== position;
  document.documentElement.dataset.toolbarPosition = position;
  if (!toolbarLayoutReady) return;
  if (changed) {
    closeExtraMenu(); closeGreekMenu(); closeRelationMenu();
    $('addSheetMenu').hidePopover();
  }
  syncToolbarLayout();
}

function packToolbarGroups(groups, height, gap) {
  let column = 0, y = 0;
  const placements = [];
  for (const group of groups) {
    const size = Math.ceil(group.getBoundingClientRect().height);
    if (size > height) return null;
    if (y && y + size > height) { column++; y = 0; }
    placements.push({ group, column, y });
    y += size + gap;
  }
  return { placements, columns: column + 1 };
}

function clearToolbarFlow(groups) {
  $('toolbar').removeAttribute('data-flow');
  document.querySelectorAll('.toolbar-flow-separator').forEach(node => node.remove());
  for (const group of groups) for (const item of group.children) {
    if (item.dataset.toolbarFlow !== 'true') continue;
    for (const property of ['position', 'left', 'top', 'width', 'height']) item.style.removeProperty(property);
    delete item.dataset.toolbarFlow;
  }
}

function measureToolbarFlow(groups, width, height, gap) {
  let column = 0, x = 0, y = 0, rowHeight = 0;
  const items = [], separators = [];
  const nextRow = () => { x = 0; y += rowHeight + 5; rowHeight = 0; };
  for (let index = 0; index < groups.length; index++) {
    const group = groups[index];
    const controls = [...group.children].filter(item => !item.classList.contains('palette-label'));
    let first = true;
    for (const item of controls) {
      const rect = item.getBoundingClientRect();
      const w = Math.ceil(rect.width), h = Math.ceil(rect.height);
      if (!w || !h) continue;
      if (w > width || h > height) return null;
      const separator = first && index > 0;
      if (x && x + w + (separator ? 8 : 0) > width) nextRow();
      if (y + h + (separator && !x ? 5 : 0) > height) { column++; x = 0; y = 0; rowHeight = 0; }
      if (separator) {
        if (x) { separators.push({ x: column * (width + gap) + x + 2, y, w: 1, h: 32 }); x += 8; }
        else { separators.push({ x: column * (width + gap), y, w: width, h: 1 }); y += 5; }
      }
      items.push({ item, x: column * (width + gap) + x, y, w, h });
      x += w + 4; rowHeight = Math.max(rowHeight, h); first = false;
    }
  }
  return { columns: column + 1, items, separators };
}

function syncToolbarLayout() {
  toolbarLayoutFrame = 0;
  if (!toolbarLayoutReady || toolbarLayoutBusy || window.matchMedia('print').matches) return;
  toolbarLayoutBusy = true;
  try {
    const toolbar = $('toolbar'), root = document.documentElement;
    const side = ['left', 'right'].includes(settings.toolbarPosition);
    const groups = [...$('toolbarGroups').querySelectorAll(':scope > .toolbar-group')];
    clearToolbarFlow(groups);
    if (side) {
      const padding = 8, gap = 8, border = 1;
      // The document scrollbar is outside the toolbar and must stay reachable.
      const maxToolbarWidth = Math.max(140, document.documentElement.clientWidth - 4);
      const brandWidth = [...toolbar.querySelector('.brand-block').children].reduce((sum, child) => sum + child.getBoundingClientRect().width, 12);
      const brandHeight = Math.ceil(toolbar.querySelector('.brand-block').getBoundingClientRect().height);
      const height = Math.max(36, innerHeight - padding * 2 - brandHeight - gap);
      setToolbarStyle($('toolbarGroups'), 'height', height + 'px');
      // Headings are optional in compact layouts; separators and accessible group
      // names remain. Prefer another column to smaller controls.
      toolbar.toggleAttribute('data-compact', innerHeight < 650);
      function measure() {
        let best = null;
        const maxColumn = Math.min(380, innerWidth - padding * 2);
        for (let width = Math.min(140, maxColumn); width <= maxColumn; width += 8) {
          setToolbarStyle(toolbar, 'width', (width + padding * 2 + border) + 'px');
          setToolbarStyle(toolbar, '--dock-column-width', width + 'px');
          const packed = packToolbarGroups(groups, height, gap);
          if (!packed) continue;
          const total = Math.max(brandWidth, packed.columns * width + (packed.columns - 1) * gap) + padding * 2 + border;
          if (total > maxToolbarWidth) continue;
          if (!best || total < best.total) best = { ...packed, width, total };
        }
        return best;
      }
      let best = measure();
      if (!best && !toolbar.hasAttribute('data-compact')) {
        toolbar.setAttribute('data-compact', '');
        best = measure();
      }
      if (!best) {
        // In tight viewports, continue a group across columns instead of hiding a
        // control. Its DOM/ARIA group and separator before the next group remain.
        const maxColumn = Math.min(380, innerWidth - padding * 2);
        for (let width = Math.min(140, maxColumn); width <= maxColumn; width += 8) {
          setToolbarStyle(toolbar, 'width', (width + padding * 2 + border) + 'px');
          setToolbarStyle(toolbar, '--dock-column-width', width + 'px');
          const packed = measureToolbarFlow(groups, width, height, gap);
          if (!packed) continue;
          const total = Math.max(brandWidth, packed.columns * width + (packed.columns - 1) * gap) + padding * 2 + border;
          if (total <= maxToolbarWidth && (!best || total < best.total)) best = { ...packed, width, total };
        }
      }
      if (best) {
        setToolbarStyle(toolbar, '--dock-column-width', best.width + 'px');
        setToolbarStyle(toolbar, 'width', best.total + 'px');
        if (best.items) {
          toolbar.setAttribute('data-flow', '');
          for (const { item, x, y, w, h } of best.items) {
            item.dataset.toolbarFlow = 'true';
            for (const [property, value] of Object.entries({ position: 'absolute', left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px' }))
              setToolbarStyle(item, property, value);
          }
          for (const separator of best.separators) {
            const line = document.createElement('span');
            line.className = 'toolbar-flow-separator'; line.setAttribute('aria-hidden', 'true');
            Object.assign(line.style, { left: separator.x + 'px', top: separator.y + 'px', width: separator.w + 'px', height: separator.h + 'px' });
            $('toolbarGroups').append(line);
          }
        } else {
          for (const { group, column, y } of best.placements) {
            setToolbarStyle(group, 'left', column * (best.width + gap) + 'px');
            setToolbarStyle(group, 'top', y + 'px');
          }
        }
      }
    } else {
      toolbar.style.removeProperty('width');
      $('toolbarGroups').style.removeProperty('height');
      for (const group of groups) {
        group.style.removeProperty('left'); group.style.removeProperty('top');
      }
    }
    const bounds = toolbar.getBoundingClientRect();
    for (const edge of ['top', 'bottom', 'left', 'right']) {
      const size = settings.toolbarPosition === edge ? Math.ceil(side ? bounds.width : bounds.height) : 0;
      setToolbarStyle(root, '--toolbar-' + edge, size + 'px');
    }
    scaleSpread();
    scheduleShortcutHints();
    if (tutorial) positionTutorial();
  } finally { toolbarLayoutBusy = false; }
}

function workspaceViewport() {
  const toolbar = $('toolbar').getBoundingClientRect();
  const position = settings.toolbarPosition;
  return {
    top: position === 'top' ? toolbar.bottom : 0,
    bottom: position === 'bottom' ? toolbar.top : innerHeight,
    left: position === 'left' ? toolbar.right : 0,
    right: position === 'right' ? toolbar.left : innerWidth
  };
}

function positionToolbarMenu(menu, anchor) {
  const rect = anchor.getBoundingClientRect();
  const width = menu.offsetWidth, height = menu.offsetHeight;
  const bar = $('toolbar').getBoundingClientRect();
  let left = rect.left, top = bar.bottom + 5;
  if (settings.toolbarPosition === 'bottom') top = bar.top - height - 5;
  if (settings.toolbarPosition === 'left') { left = bar.right + 8; top = rect.top; }
  if (settings.toolbarPosition === 'right') { left = bar.left - width - 8; top = rect.top; }
  menu.style.left = Math.max(8, Math.min(left, innerWidth - width - 8)) + 'px';
  menu.style.top = Math.max(8, Math.min(top, innerHeight - height - 8)) + 'px';
}

function initialiseToolbarLayout() {
  toolbarLayoutReady = true;
  document.documentElement.dataset.toolbarPosition = settings.toolbarPosition;
  syncToolbarLayout();
  window.addEventListener('resize', scheduleToolbarLayout);
  window.addEventListener('afterprint', scheduleToolbarLayout);
  window.visualViewport?.addEventListener('resize', scheduleToolbarLayout);
  document.fonts.ready.then(scheduleToolbarLayout);
  document.fonts.addEventListener('loadingdone', scheduleToolbarLayout);
  new ResizeObserver(scheduleToolbarLayout).observe($('toolbar'));
  new MutationObserver(records => {
    if (records.some(record => record.type !== 'childList' ||
        [...record.addedNodes, ...record.removedNodes].some(node => !node.classList?.contains('toolbar-flow-separator')))) scheduleToolbarLayout();
  }).observe($('toolbar'), {
    childList: true, subtree: true, characterData: true, attributes: true,
    attributeFilter: ['aria-label', 'hidden']
  });
}
