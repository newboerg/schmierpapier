// help — assembled in src/build.json order; shared classic-script scope.

// @part part-01
const HELP_TRANSLATIONS = {
  en: [...LOCALE_EN.helpInitial, ...LOCALE_EN.helpAdditions],
  fr: [...LOCALE_FR.helpInitial, ...LOCALE_FR.helpAdditions]
};

// @part part-02
function currentHelpArticles() {
  const articles = language === 'de' ? HELP_ARTICLES : HELP_TRANSLATIONS[language];
  return [...articles, LOCALES[language].languageTopic];
}

// @part part-03
/*
 * INTEGRIERTE HILFE
 * Die Suchoberfläche verwendet die Artikel der aktuellen Sprache.
 * Suchbegriffe werden als Text behandelt, nie als ausführbares HTML.
 */
const HELP_ARTICLES = [...LOCALE_DE.helpInitial, ...LOCALE_DE.helpAdditions];


// @part part-04

// @part part-05


// @part part-06

// @part part-07




let helpReturnFocus = null;
const helpPlainText = article => {
  const el = document.createElement('div');
  el.innerHTML = article.html;
  return article.title + ' ' + article.keywords + ' ' + el.textContent
};
const helpNormalize = text => text.toLocaleLowerCase('de').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/ß/g, 'ss');

function renderHelp() {
  const articles = currentHelpArticles(),
    query = $('helpSearch').value.trim(),
    terms = helpNormalize(query).split(/\s+/).filter(Boolean),
    results = articles.map((article, index) => ({
      article,
      index
    })).filter(({
      article
    }) => terms.every(term => helpNormalize(helpPlainText(article)).includes(term)));
  const nav = $('helpNav'),
    content = $('helpContent');
  nav.replaceChildren();
  content.replaceChildren();
  $('helpCount').textContent = query ? `${results.length} von ${articles.length} Themen gefunden` :
    `${articles.length} Themen · Suchwörter lassen sich kombinieren`;
  $('helpClear').disabled = !query;
  if (!results.length) {
    const empty = document.createElement('p');
    empty.className = 'help-empty';
    empty.textContent =
      'Keine passenden Themen gefunden. Versuche ein anderes Wort, zum Beispiel „Bruch“, „Potenz“, „Linie“ oder „Strg“. Mit dem ✕ neben der Suche siehst du wieder alle Themen.';
    content.append(empty)
  }
  for (const {
      article,
      index
    }
    of results) {
    const section = document.createElement('article');
    section.className = 'help-article';
    section.id = 'help-article-' + index;
    const title = document.createElement('h3');
    title.textContent = article.title;
    section.append(title);
    const body = document.createElement('div');
    body.innerHTML = article.html;
    section.append(body);
    content.append(section);
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = article.title;
    button.title = tr('Zum Hilfethema „' + article.title + '“ springen');
    button.onclick = () => section.scrollIntoView({
      block: 'start'
    });
    nav.append(button);
  }
  // Only static help HTML is inserted. Search text is used as text, never as markup.
  const words = query.split(/\s+/).filter(Boolean);
  if (words.length) {
    const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    let pattern;
    try {
      pattern = new RegExp('(' + escaped.join('|') + ')', 'giu')
    } catch {}
    if (pattern) {
      const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT),
        texts = [];
      while (walker.nextNode()) texts.push(walker.currentNode);
      for (const node of texts) {
        const parts = node.textContent.split(pattern);
        if (parts.length === 1) continue;
        const fragment = document.createDocumentFragment();
        parts.forEach((part, i) => {
          if (i % 2) {
            const mark = document.createElement('mark');
            mark.textContent = part;
            fragment.append(mark)
          } else fragment.append(document.createTextNode(part))
        });
        node.replaceWith(fragment)
      }
    }
  }
  content.scrollTop = 0;
  nav.scrollTop = 0;
}

function openHelp() {
  if (tutorial || $('helpDialog').open) return;
  finishCompassStroke();
  cancelNumberLine(false);
  finishMark();
  cancelRegion();
  resetCorner();
  renderLines();
  helpReturnFocus = document.activeElement;
  $('helpSearch').value = '';
  renderHelp();
  $('helpDialog').showModal();
  document.body.classList.add('help-open');
  $('helpSearch').focus();
}

function closeHelp() {
  $('helpDialog').close()
}
$('helpOpen').onclick = openHelp;
$('helpClose').onclick = closeHelp;
$('helpSearch').addEventListener('input', renderHelp);
$('helpClear').onclick = () => {
  $('helpSearch').value = '';
  renderHelp();
  $('helpSearch').focus()
};
$('helpDialog').addEventListener('close', () => {
  document.body.classList.remove('help-open');
  if (helpReturnFocus?.isConnected) helpReturnFocus.focus({
    preventScroll: true
  })
});
window.addEventListener('keydown', e => {
  if ($('helpDialog').open) {
    e.stopImmediatePropagation();
    if (e.key === 'Escape') {
      e.preventDefault();
      closeHelp()
    } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
      e.preventDefault();
      $('helpSearch').focus();
      $('helpSearch').select()
    }
    return;
  }
  if (e.key === 'F1' && !tutorial) {
    e.preventDefault();
    e.stopImmediatePropagation();
    openHelp()
  }
}, true);

// @part part-08
