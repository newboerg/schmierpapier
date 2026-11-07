// Embedded raster images; editing is a transaction until explicitly confirmed.
// @part part-01
let imageSession = null;
const imageCache = new Map();
const IMAGE_PIXEL_LIMIT = 36000000;
const IMAGE_DATA_LIMIT = 50000000;
function imageRectMM(rect) {
  return { x: 5 + rect.x * 5, y: 5 + rect.y * 5, w: rect.w * 5, h: rect.h * 5 };
}
function imageWithinRect(image, rect) {
  return image.x >= rect.x && image.y >= rect.y && image.x + image.w <= rect.x + rect.w && image.y + image.h <= rect.y + rect.h;
}
function validateImages(data) {
  let total = 0;
  return data.pages.map((_, p) => {
    const list = data.images?.[p] ?? [];
    if (!Array.isArray(list) || list.length > 100) throw Error('Ungültige Bilddaten.');
    return list.map(image => {
      if (!image || !['x', 'y', 'w', 'h'].every(key => Number.isInteger(image[key])) ||
          image.x < 0 || image.y < 0 || image.w < 1 || image.h < 1 ||
          image.x + image.w > COLS || image.y + image.h > ROWS ||
          ![100, 200, 300, 400, 500, 600].includes(image.dpi) ||
          typeof image.src !== 'string' || !/^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(image.src)) throw Error('Ungültige Bilddaten.');
      total += image.src.length;
      if (total > IMAGE_DATA_LIMIT) throw Error('Die Datei ist zu groß.');
      // Check PNG signature and IHDR before a browser decoder allocates pixels.
      const header = atob(image.src.slice(22, 66));
      const read32 = i => ((header.charCodeAt(i) * 0x1000000) + (header.charCodeAt(i+1) << 16) + (header.charCodeAt(i+2) << 8) + header.charCodeAt(i+3));
      if (header.slice(0, 8) !== '\x89PNG\r\n\x1a\n' || header.slice(12, 16) !== 'IHDR') throw Error('Ungültige Bilddaten.');
      const width = read32(16), height = read32(20);
      if (width < 1 || height < 1 || width * height > IMAGE_PIXEL_LIMIT || width > 7200 || height > 7200) throw Error('Die Datei ist zu groß.');
      return { x: image.x, y: image.y, w: image.w, h: image.h, src: image.src, dpi: image.dpi };
    });
  });
}
function loadEmbeddedImage(src) {
  if (!imageCache.has(src)) {
    const image = new Image();
    const promise = new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => { imageCache.delete(src); reject(Error('Bild konnte nicht geladen werden.')); };
      image.src = src;
    });
    // The document keeps its own data URLs; the cache need not retain old edits forever.
    if (imageCache.size >= 2) imageCache.delete(imageCache.keys().next().value);
    imageCache.set(src, promise);
  }
  return imageCache.get(src);
}
function renderImages(includeOriginal = false) {
  let layer = $('paper').querySelector('.image-layer');
  if (!layer) {
    layer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    layer.setAttribute('class', 'image-layer'); layer.setAttribute('viewBox', '0 0 210 297');
    layer.setAttribute('aria-hidden', 'true'); $('paper').insertBefore(layer, $('cells'));
  }
  layer.replaceChildren();
  for (const image of doc.images?.[page] || []) {
    if (!includeOriginal && imageSession?.page === page && imageSession.document === doc && imageSession.original === image) continue;
    const r = imageRectMM(image);
    const el = document.createElementNS(layer.namespaceURI, 'image');
    for (const key of ['x', 'y', 'width', 'height']) el.setAttribute(key, ({x:r.x,y:r.y,width:r.w,height:r.h})[key]);
    el.setAttribute('href', image.src); el.setAttribute('preserveAspectRatio', 'none'); layer.append(el);
  }
}
async function paintImages(context, p, scale) {
  for (const image of doc.images?.[p] || []) {
    const decoded = await loadEmbeddedImage(image.src), r = imageRectMM(image);
    context.drawImage(decoded, r.x * scale, r.y * scale, r.w * scale, r.h * scale);
  }
}
function imageCell(point) {
  return [Math.max(0, Math.min(COLS - 1, Math.floor((point[0] - 5) / 5))),
    Math.max(0, Math.min(ROWS - 1, Math.floor((point[1] - 5) / 5)))];
}
function startImageSession() {
  if (tutorial || document.querySelector('dialog[open]')) return;
  if (imageSession) { cancelImageSession(); return; }
  cancelKeyboardArea(); cancelKeyboardLine(); cancelRegion(); cancelStrike();
  hideCompass(); cancelNumberLine(false); finishMark(); resetCorner();
  geo.visible = false; renderGeo();
  cancelModifierModeHolds();
  for (const code of [...actionHolds.keys()]) finishActionHold(code);
  const point = [pos % COLS, Math.floor(pos / COLS)];
  imageSession = { document: doc, page, phase: 'select', anchor: point, cursor: point,
    rect: regionRect(point, point), zoom: 1, offsetX: 0, offsetY: 0, dpi: settings.imageDpi };
  $('editor').blur(); renderImageSession();
}
function cancelImageSession(focus = true) {
  if (!imageSession) return;
  if (imageSession.sourceUrl) URL.revokeObjectURL(imageSession.sourceUrl);
  imageSession = null; $('imageFile').value = '';
  $('paper').classList.remove('image-mode');
  $('paper').querySelector('.image-preview')?.remove();
  $('imageControls').hidden = true; $('insertImage').setAttribute('aria-pressed', 'false');
  renderImages();
  if (focus) select(pos);
}
function renderImageSession() {
  $('paper').querySelector('.image-preview')?.remove();
  const session = imageSession;
  if (!session || session.page !== page || session.document !== doc) return;
  $('insertImage').setAttribute('aria-pressed', 'true'); $('paper').classList.add('image-mode');
  $('imageControls').hidden = false;
  const editing = session.phase === 'edit';
  $('imageInstruction').textContent = editing ?
    'Bild anpassen: Mausrad oder +/− zum Zoomen, Ziehen oder Pfeiltasten zum Verschieben. Enter übernimmt, Esc bricht ab.' :
    'Bildbereich markieren: Ziehen oder Pfeiltasten, dann Enter oder Bild auswählen. Esc bricht ab.';
  for (const id of ['imageZoomIn', 'imageZoomOut', 'imageApply']) $(id).disabled = !editing || session.busy;
  $('imageDelete').hidden = !session.original;
  $('imageChoose').disabled = !!session.busy;
  const r = imageRectMM(session.rect);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'image-preview'); svg.setAttribute('viewBox', '0 0 210 297');
  if (session.source) {
    const frame = document.createElementNS(svg.namespaceURI, 'svg');
    for (const [key, value] of Object.entries({x:r.x,y:r.y,width:r.w,height:r.h,viewBox:`0 0 ${r.w} ${r.h}`,overflow:'hidden'})) frame.setAttribute(key,value);
    const bounds = imagePlacement(session);
    const el = document.createElementNS(svg.namespaceURI, 'image');
    for (const [key,value] of Object.entries({x:bounds.x,y:bounds.y,width:bounds.w,height:bounds.h,href:session.source.src,preserveAspectRatio:'none'})) el.setAttribute(key,value);
    frame.append(el); svg.append(frame);
  }
  const outline = document.createElementNS(svg.namespaceURI, 'rect');
  for (const [key,value] of Object.entries({x:r.x,y:r.y,width:r.w,height:r.h,fill:'none',stroke:'#d52d35','stroke-width':.45,'stroke-dasharray':'1.5 1'})) outline.setAttribute(key,value);
  svg.append(outline); $('paper').append(svg);
}
function imagePlacement(session) {
  const r = imageRectMM(session.rect), source = session.source;
  const cover = Math.max(r.w / source.naturalWidth, r.h / source.naturalHeight) * session.zoom;
  const w = source.naturalWidth * cover, h = source.naturalHeight * cover;
  return { x: (r.w - w) / 2 + session.offsetX, y: (r.h - h) / 2 + session.offsetY, w, h };
}
function zoomImage(factor) {
  if (imageSession?.phase !== 'edit' || imageSession.busy) return;
  imageSession.zoom = Math.max(.05, Math.min(20, imageSession.zoom * factor));
  renderImageSession();
}
function chooseImageFile() {
  if (!imageSession || imageSession.busy) return;
  imageSession.dragging = false; imageSession.phase = imageSession.source ? 'edit' : 'choose';
  $('imageFile').value = ''; $('imageFile').click(); renderImageSession();
}
async function acceptImageFile(file) {
  const session = imageSession;
  if (!session || !file) return;
  session.busy = true; renderImageSession();
  let url;
  try {
    if (!/^image\/(png|jpeg|webp|gif|bmp)$/.test(file.type) || file.size > 20000000) throw Error('Bitte eine Bilddatei (PNG, JPEG, WebP, GIF oder BMP) bis 20 MB auswählen.');
    url = URL.createObjectURL(file);
    const source = new Image(); source.src = url; await source.decode();
    if (source.naturalWidth * source.naturalHeight > 64000000) throw Error('Das Bild ist zu groß (maximal 64 Megapixel).');
    if (imageSession !== session) return;
    // Retain the original pixels throughout editing. Only Apply crops/resamples.
    if (session.sourceUrl) URL.revokeObjectURL(session.sourceUrl);
    session.sourceUrl = url;
    url = null; // Owned by the session until replacement, confirmation or cancel.
    session.source = source; session.zoom = 1; session.offsetX = session.offsetY = 0; session.phase = 'edit';
  } catch (error) {
    if (imageSession === session) alert(tr(error.message));
  } finally {
    if (url) URL.revokeObjectURL(url);
    if (imageSession === session) { session.busy = false; renderImageSession(); }
  }
}
async function applyImageSession() {
  const session = imageSession;
  if (!session || session.phase !== 'edit' || session.busy) return;
  try {
    const r = imageRectMM(session.rect), bounds = imagePlacement(session), canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(r.w / 25.4 * session.dpi));
    canvas.height = Math.max(1, Math.round(r.h / 25.4 * session.dpi));
    if (canvas.width * canvas.height > IMAGE_PIXEL_LIMIT) throw Error('Das Bild ist zu groß (maximal 36 Megapixel).');
    const context = canvas.getContext('2d');
    context.scale(canvas.width / r.w, canvas.height / r.h);
    context.drawImage(session.source, bounds.x, bounds.y, bounds.w, bounds.h);
    const src = pngWithDpi(canvas, session.dpi);
    const existing = (doc.images || []).flat().filter(image => image !== session.original).reduce((sum,image) => sum + image.src.length,0);
    if (src.length + existing > IMAGE_DATA_LIMIT) throw Error('Die Datei ist zu groß.');
    if (!session.original && (doc.images?.[page]?.length || 0) >= 100) throw Error('Maximal 100 Bilder pro Seite.');
    checkpoint();
    doc.images ??= doc.pages.map(() => []);
    const image = { ...session.rect, src, dpi: session.dpi };
    if (session.original) doc.images[page].splice(doc.images[page].indexOf(session.original), 1, image);
    else doc.images[page].push(image);
    cancelImageSession(false); changed(); select(pos);
  } catch (error) { alert(tr(error.message)); }
}
async function editImage(image) {
  startImageSession();
  const session = imageSession;
  if (!session) return;
  session.rect = {x:image.x,y:image.y,w:image.w,h:image.h}; session.original = image; session.dpi = image.dpi;
  session.phase = 'choose'; session.busy = true;
  renderImages(); renderImageSession();
  try {
    const source = await loadEmbeddedImage(image.src);
    if (imageSession === session) { session.source = source; session.phase = 'edit'; }
  } catch (error) { if (imageSession === session) { cancelImageSession(); alert(tr(error.message)); } }
  finally { if (imageSession === session) {session.busy = false; renderImageSession();} }
}
function initialiseImages() {
  $('insertImage').onclick = startImageSession;
  $('imageChoose').onclick = chooseImageFile;
  $('imageFile').onchange = event => acceptImageFile(event.target.files[0]);
  $('imageApply').onclick = applyImageSession;
  $('imageCancel').onclick = () => cancelImageSession();
  $('imageZoomIn').onclick = () => zoomImage(1.1);
  $('imageZoomOut').onclick = () => zoomImage(1 / 1.1);
  $('imageDelete').onclick = () => {
    if (!imageSession?.original) return;
    checkpoint(); doc.images[page].splice(doc.images[page].indexOf(imageSession.original), 1);
    cancelImageSession(false); changed(); select(pos);
  };
}
window.addEventListener('keydown', event => {
  if (!imageSession || document.querySelector('dialog[open]')) return;
  if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); cancelImageSession(); return; }
  // Leave Tab and focused panel buttons available for assistive technology.
  if (event.key === 'Tab' || event.target.closest?.('#imageControls') && ['Enter', ' '].includes(event.key)) return;
  event.preventDefault(); event.stopImmediatePropagation();
  if (imageSession.busy) return;
  if (event.key === 'Enter' && !event.repeat) {
    if (imageSession.phase === 'edit') applyImageSession(); else chooseImageFile();
  } else if (event.key.startsWith('Arrow')) {
    const dx = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
    const dy = event.key === 'ArrowUp' ? -1 : event.key === 'ArrowDown' ? 1 : 0;
    if (imageSession.phase === 'select') {
      imageSession.cursor = [Math.max(0,Math.min(COLS-1,imageSession.cursor[0]+dx)), Math.max(0,Math.min(ROWS-1,imageSession.cursor[1]+dy))];
      imageSession.rect = regionRect(imageSession.anchor,imageSession.cursor);
    } else if (imageSession.phase === 'edit') {
      imageSession.offsetX += dx; imageSession.offsetY += dy;
    }
    renderImageSession();
  } else if (['+', '=', 'Add'].includes(event.key)) zoomImage(1.1);
  else if (['-', '−', 'Subtract'].includes(event.key)) zoomImage(1/1.1);
}, true);
window.addEventListener('pointerdown', event => {
  if (!imageSession || !event.target.closest?.('#paper') || event.button !== 0) return;
  event.preventDefault(); event.stopImmediatePropagation();
  if (imageSession.busy) return;
  const point = paperPoint(event);
  if (imageSession.phase === 'select') {
    imageSession.anchor = imageSession.cursor = imageCell(point);
    imageSession.rect = regionRect(imageSession.anchor,imageSession.cursor);
  } else if (imageSession.phase !== 'edit') return;
  imageSession.dragging = { id:event.pointerId, last:point };
  $('paper').setPointerCapture(event.pointerId); renderImageSession();
},true);
window.addEventListener('pointermove', event => {
  if (!imageSession?.dragging || imageSession.dragging.id !== event.pointerId) return;
  event.preventDefault(); event.stopImmediatePropagation();
  const point = paperPoint(event);
  if (imageSession.phase === 'select') {
    imageSession.cursor = imageCell(point); imageSession.rect = regionRect(imageSession.anchor,imageSession.cursor);
  } else {
    imageSession.offsetX += point[0]-imageSession.dragging.last[0]; imageSession.offsetY += point[1]-imageSession.dragging.last[1];
  }
  imageSession.dragging.last = point; renderImageSession();
},true);
window.addEventListener('pointerup', event => {
  if (!imageSession?.dragging || imageSession.dragging.id !== event.pointerId) return;
  event.preventDefault(); event.stopImmediatePropagation(); imageSession.dragging = false;
  if ($('paper').hasPointerCapture(event.pointerId)) $('paper').releasePointerCapture(event.pointerId);
  if (imageSession.phase === 'select') chooseImageFile();
},true);
window.addEventListener('pointercancel', () => { if (imageSession) imageSession.dragging = false; },true);
window.addEventListener('wheel', event => {
  if (imageSession?.phase !== 'edit' || !event.target.closest?.('#paper')) return;
  event.preventDefault(); event.stopImmediatePropagation(); zoomImage(event.deltaY < 0 ? 1.1 : 1/1.1);
}, {capture:true,passive:false});
window.addEventListener('click', event => {
  if (imageSession && event.target.closest?.('#paper')) { event.preventDefault(); event.stopImmediatePropagation(); }
},true);
window.addEventListener('dblclick', event => {
  if (imageSession || tutorial || !event.target.closest?.('#paper')) return;
  const [x,y] = imageCell(paperPoint(event));
  const image = [...(doc.images?.[page] || [])].reverse().find(i => x>=i.x && y>=i.y && x<i.x+i.w && y<i.y+i.h);
  if (image) {event.preventDefault(); event.stopImmediatePropagation(); editImage(image);}
},true);

// Canvas defaults to 96 dpi metadata. Write the requested physical resolution too.
function pngWithDpi(canvas, dpi) {
  const binary = atob(canvas.toDataURL('image/png').split(',')[1]);
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  const chunk = new Uint8Array(21), view = new DataView(chunk.buffer);
  view.setUint32(0, 9); chunk.set([112, 72, 89, 115], 4); // pHYs
  const pixelsPerMetre = Math.round(dpi / .0254);
  view.setUint32(8, pixelsPerMetre); view.setUint32(12, pixelsPerMetre); chunk[16] = 1;
  let crc = 0xffffffff;
  for (const byte of chunk.slice(4,17)) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  view.setUint32(17, (crc ^ 0xffffffff) >>> 0);
  // Drop any existing pHYs chunk, then add ours after the IHDR.
  const pieces = [bytes.slice(0,33),chunk];
  for (let offset=33;offset<bytes.length;) {
    const size = new DataView(bytes.buffer).getUint32(offset) + 12;
    if (String.fromCharCode(...bytes.slice(offset+4,offset+8)) !== 'pHYs') pieces.push(bytes.slice(offset,offset+size));
    offset += size;
  }
  const length = pieces.reduce((sum,piece) => sum+piece.length,0), output = new Uint8Array(length);
  let offset = 0; for (const piece of pieces) {output.set(piece,offset);offset+=piece.length;}
  let result = ''; for (let i=0;i<output.length;i+=32768) result += String.fromCharCode(...output.subarray(i,i+32768));
  return 'data:image/png;base64,'+btoa(result);
}
