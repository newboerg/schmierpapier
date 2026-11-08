// tutorial — assembled in src/build.json order; shared classic-script scope.

// @part part-01
let tutorial = null;

// @part part-02
const TOUR_RED = '[data-tool="pen"][data-color="#cc3030"]',
  TOUR_BLUE = '[data-tool="pen"][data-color="#172e65"]',
  TOUR_PINK = '[data-tool="marker"][data-color="#ff65c5"]';

// @part part-03
/*
 * GEFÜHRTES TUTORIAL
 * Die Übungen verwenden ein separates Dokument. Beim Beenden wird der gesicherte
 * Arbeitszustand wiederhergestellt; tutorialGate() lässt nur passende Aktionen zu.
 */
const TOUR_START = 5 * COLS + 4;

function tutorialSteps() {
  const at = (row, col) => (row - 1) * COLS + col - 1;
  const button = (target, title, text, done, extra = {}) => ({
    target,
    title,
    text,
    kind: 'button',
    done,
    ...extra
  });
  const typing = (title, text, expected, done) => ({
    target: '#editor',
    title,
    text,
    kind: 'typing',
    expected,
    done
  });
  const cell = (index, title, text) => {
    const note = LOCALE_DE.tutorialNavigation;
    const combined = text + ' ' + note;
    const translated = UI_TRANSLATIONS[text] || [text, text];
    UI_TRANSLATIONS[combined] = [
      translated[0] + LOCALE_EN.tutorialNavigation,
      translated[1] + LOCALE_FR.tutorialNavigation
    ];
    return {
      target: () => nodes[index], title, text: combined, kind: 'cell', index,
      done: () => pos === index
    };
  };
  const line = (title, text, start, end) => ({
    target: 'lineArea',
    title,
    text,
    kind: 'line',
    start,
    end,
    done: () => tourHasLine(start, end)
  });
  const calc = TOUR_START,
    num = at(10, 5),
    den = at(11, 5),
    eq = at(10, 7),
    num2 = at(10, 9),
    den2 = at(11, 9),
    power = at(15, 5),
    copy = at(20, 5),
    move = at(22, 5);
  const mixedTall = (index, symbol) => doc.tallBrackets[0].some(b => b.text && b.upper === index && b.side === symbol && b.height === 2);
  const value = (start, length) => Array.from({
    length
  }, (_, i) => doc.pages[0][start + i] || '').join('');
  return [
    cell(calc, 'Hier beginnt deine Rechnung',
      'Aktiv ist Zeile 1 · Spalte 1. Gehe fünfmal nach unten und viermal nach rechts zum gold markierten Kästchen in Zeile 6 · Spalte 5. Dort geht es automatisch weiter, ohne Enter. Du kannst das Ziel auch anklicken. Wir rechnen (12 + 8) · 3 = 60 und schreiben danach einen Bruch. Dies ist ein separates Übungsblatt; dein Dokument bleibt erhalten. Die Werkzeugleiste bleibt an deiner gewählten Position. Die goldenen Hinweise zeigen dir auch dort den passenden Button.'
      ),
    button('#keypadToggle', 'Der Bildschirm-Nummernblock',
      'Öffne den Bildschirm-Nummernblock über den gold markierten Button. Du kannst ihn an seiner Titelleiste verschieben und mit × wieder schließen. Ab jetzt darfst du bei allen passenden Eingaben wahlweise seine Tasten oder deine Tastatur verwenden. Die Tasten +, ·, : und = entsprechen den Rechentasten; = schreibt das Gleichzeichen. Der Fokus bleibt im Kästchen. Wenn du den Bildschirm-Nummernblock nicht brauchst, drücke N zum Überspringen. Optional kannst du T halten oder den Tastaturbutton vor Hilfe anklicken: Dann erscheinen die passenden Tasten über den Buttons. Ein … bedeutet halten; dieselbe Aktion blendet die Hinweise wieder aus.',
      () => !$('virtualKeypad').hidden || tutorial.keypadSkipped),
    button('#parenOpen', 'Eine Klammer öffnen',
      'Klicke auf ( oder öffne die Auswahl mit dem kleinen Pfeil daneben beziehungsweise durch etwa 0,6 Sekunden langes Halten von 8. Die normale runde Klammer in der mittleren Zeile ist vorausgewählt: Enter bestätigt. Links/Rechts wählt die Form, Hoch/Runter die Größe: oben groß nach oben, mittig normal, unten groß nach unten. Für (12 + 8) brauchen wir jetzt die normale runde Klammer ohne Strg oder Shift. 9 halten öffnet später die schließenden Klammern; kurzes 8/9 schreibt weiterhin die Zahl.',
      () => doc.pages[0][calc] === '('),
    typing('Die erste Zahl',
      'Tippe 12 mit der oberen Zahlenreihe, dem Nummernblock oder dem Bildschirm-Nummernblock. Jede Ziffer bekommt ein eigenes Kästchen.',
      '12', () => value(calc + 1, 2) === '12'),
    typing('Plus schreiben', 'Drücke die Plus-Taste +. Sie steht zwischen den beiden Zahlen.', '+', () =>
      doc.pages[0][calc + 3] === '+'),
    typing('Die zweite Zahl', 'Tippe die 8 am Nummernblock. In der Klammer steht jetzt 12 + 8.', '8', () =>
      doc.pages[0][calc + 4] === '8'),
    button('#parenClose', 'Die Klammer schließen',
      'Klicke auf ) oder öffne mit dem kleinen Pfeil daneben beziehungsweise 9 halten die Auswahl. Bestätige die vorausgewählte normale runde Klammer in der mittleren Zeile mit Enter. Falls du die Auswahl verschoben hast: Links/Rechts wählt die Form, Hoch/Runter die Größe. Wir brauchen wieder die normale Form ohne Strg oder Shift. Damit ist (12 + 8) vollständig. Obere Zahlenreihe und Nummernblock funktionieren; kurzes Drücken schreibt normale Ziffern.',
      () => doc.pages[0][calc + 5] === ')'),
    typing('Mit drei multiplizieren',
      'Drücke die Mal-Taste * am Nummernblock. Sie wird als Rechenpunkt · geschrieben.', '·', () => doc
      .pages[0][calc + 6] === '·'),
    typing('Den Faktor schreiben',
      'Tippe die 3 am Nummernblock. Erst rechnest du die Klammer aus: 12 + 8 = 20. Dann 20 · 3.', '3', () =>
      doc.pages[0][calc + 7] === '3'), {
      target: '#editor',
      title: 'Das Gleichzeichen',
      text: 'Drücke Enter am Nummernblock. Es schreibt =. Die normale Enter-Taste wechselt dagegen zur nächsten Zeile.',
      kind: 'key',
      keys: ['NumpadEnter'],
      byCode: true,
      done: () => doc.pages[0][calc + 8] === '='
    },
    button(TOUR_RED, 'Das Ergebnis farbig schreiben',
      'Wähle den roten Stift per Klick oder halte 4 etwa 0,6 Sekunden gedrückt und lasse los. Die Stifte sind von links nach rechts nummeriert: 1 Schwarz, 2 Blau, 3 Grün, 4 Rot. Obere Zahlenreihe und Nummernblock funktionieren. Beim langen Halten wird keine Zahl geschrieben. Damit hebt sich das Ergebnis von der Rechnung ab.', () => ink ===
      '#cc3030'),
    typing('Das Ergebnis: 60', 'Tippe 60 am Nummernblock. Die Rechnung lautet jetzt (12 + 8) · 3 = 60.',
      '60', () => value(calc + 9, 2) === '60' && doc.inks[0][calc + 9] === '#cc3030'),
    line('Die Rechnung unterstreichen',
      'Maus: Warte am goldenen Startpunkt unter der öffnenden Klammer auf den grünen Punkt und ziehe mit rechts bis zum Ziel unter der letzten 0. Oder Tastatur: Das erste Kästchen ist bereits gewählt. Drücke Links+Rechts gleichzeitig und lasse beide los. Drücke zehnmal Rechts, dann erneut Links+Rechts gleichzeitig zum Bestätigen. Die rote gestrichelte Vorschau liegt unten; Hoch/Runter wechselt die Kante, Esc bricht nur die Vorschau ab. Beide Wege zählen.',
      [5, 7], [16, 7]),
    button(TOUR_BLUE, 'Blauer Stift für den Bruch',
      'Wähle den blauen Stift per Klick oder halte 2 etwa 0,6 Sekunden gedrückt und lasse los. Beide Wege sind erlaubt; das Halten schreibt keine Ziffer. Jetzt schreiben wir 2/4 = 1/2 unter die erste Rechnung.',
      () => tool === 'pen' && ink === '#172e65'),
    cell(num, 'Den Zähler platzieren',
      'Klicke auf Zeile 10 · Spalte 5. Hier steht der Zähler des ersten Bruchs.'),
    typing('Zähler 2', 'Tippe die 2 am Nummernblock. Zwei Viertel lassen sich zu einem Halb kürzen.', '2',
    () => doc.pages[0][num] === '2'), {
      target: '#editor',
      title: 'Zur selben Spalte zurück',
      text: 'Die Eingabe ist nach rechts gesprungen. Drücke einmal Pfeil nach links, um wieder über dem Zähler 2 zu stehen.',
      kind: 'key',
      keys: ['ArrowLeft'],
      done: () => pos === num
    }, {
      target: '#editor',
      title: 'Zum Nenner gehen',
      text: 'Drücke einmal Pfeil nach unten. So gelangst du in das Kästchen direkt unter der 2.',
      kind: 'key',
      keys: ['ArrowDown'],
      done: () => pos === den
    },
    typing('Nenner 4', 'Tippe die 4 am Nummernblock. Oben steht die 2 und direkt darunter die 4.', '4',
    () => doc.pages[0][den] === '4'),
    line('Den Bruchstrich ziehen',
      'Maus: Ziehe mit rechts zwischen den goldenen Punkten eine Kästchenbreite zwischen 2 und 4. Oder Tastatur: Der Zähler 2 ist bereits gewählt. Links+Rechts gleichzeitig drücken und loslassen; der Strich liegt unten genau zwischen Zähler und Nenner. Erneutes Links+Rechts bestätigt. Hier musst du die Vorschau nicht verlängern.',
      [5, 11], [6, 11]),
    cell(eq, 'Platz für das Gleichzeichen',
      'Klicke auf Zeile 10 · Spalte 7. Zwischen dem ersten und dem gekürzten Bruch lassen wir ein Kästchen Abstand.'
      ), {
      target: '#editor',
      title: 'Gleichzeichen auf Bruchhöhe',
      text: 'Halte Strg und drücke Enter. Die zwei Striche des Gleichzeichens sitzen an der Grenze zum unteren Kästchen, genau auf Höhe des Bruchstrichs. Shift + Enter setzt es stattdessen nach oben.',
      kind: 'key',
      keys: ['Enter'],
      ctrl: true,
      done: () => !!doc.fractionEquals[0][eq]
    },
    cell(num2, 'Den gekürzten Bruch schreiben',
      'Klicke auf Zeile 10 · Spalte 9. Hier kommt der Zähler des gekürzten Bruchs hin.'),
    typing('Gekürzter Zähler 1',
      'Tippe die 1 am Nummernblock. Beim Kürzen durch 2 wird aus dem Zähler 2 eine 1.', '1', () => doc
      .pages[0][num2] === '1'), {
      target: '#editor',
      title: 'Wieder dieselbe Spalte',
      text: 'Drücke einmal Pfeil nach links. Wir wollen den Nenner genau unter die 1 schreiben.',
      kind: 'key',
      keys: ['ArrowLeft'],
      done: () => pos === num2
    }, {
      target: '#editor',
      title: 'Unter die 1 wechseln',
      text: 'Drücke einmal Pfeil nach unten. Jetzt bist du im Nenner-Kästchen.',
      kind: 'key',
      keys: ['ArrowDown'],
      done: () => pos === den2
    },
    typing('Gekürzter Nenner 2',
      'Tippe die 2 am Nummernblock. Beim Kürzen durch 2 wird aus dem Nenner 4 eine 2.', '2', () => doc
      .pages[0][den2] === '2'),
    line('Den zweiten Bruchstrich ergänzen',
      'Maus: Ziehe mit rechts zwischen den goldenen Punkten zwischen 1 und 2. Oder Tastatur: Die 1 ist bereits gewählt. Drücke Links+Rechts gleichzeitig, lasse los und bestätige mit erneutem Links+Rechts. Jetzt steht dort 2/4 = 1/2: Beide Brüche haben denselben Wert.',
      [9, 11], [10, 11]),
    cell(power, 'Noch eine echte Potenzrechnung',
      'Klicke auf Zeile 15 · Spalte 5. Wir ergänzen 2¹² = 4096, um eine mehrstellige Hochzahl auszuprobieren.'
      ),
    typing('Die Basis 2', 'Tippe die 2 am Nummernblock. Diese normal große Zahl ist die Basis.', '2', () =>
      doc.pages[0][power] === '2'),
    button('#powerMode', 'Hochstellen einschalten',
      'Klicke auf Hochstellen oder halte Shift allein etwa 0,6 Sekunden und lasse los. Der Modus hängt die nächste Eingabe klein oben rechts an die 2 an. Strg allein halten und loslassen schaltet entsprechend Tiefstellen; mit anderen Tasten bleiben es normale Tastenkombinationen. Der Rahmen um den gelben Button füllt sich dabei im Uhrzeigersinn; wenn er vollständig ist, kannst du zum Umschalten loslassen.',
      () => smallMode === 'powers'),
    typing('Den Exponenten 12 schreiben',
      'Tippe nacheinander 1 und 2. Solange Hochstellen aktiv ist, funktionieren auch die oberen Zahlentasten als Ziffern. Beide kleinen Ziffern gehören zur Basis 2.',
      '12', () => doc.powers[0][power]?.text === '12'),
    button('#powerMode', 'Hochstellen ausschalten',
      'Klicke erneut auf Hochstellen oder halte Shift allein etwa 0,6 Sekunden und lasse los. Die nächste Eingabe wird normal groß. Strg allein länger halten und loslassen schaltet Tiefstellen entsprechend ein oder aus.',
      () => smallMode === null), {
      target: '#editor',
      title: 'Potenz und Ergebnis trennen',
      text: 'Drücke Enter am Nummernblock, um hinter 2¹² ein Gleichzeichen zu schreiben.',
      kind: 'key',
      keys: ['NumpadEnter'],
      byCode: true,
      done: () => doc.pages[0][power + 1] === '='
    },
    typing('Das Ergebnis der Potenz',
      'Tippe 4096 am Nummernblock. Die 2 zwölfmal als Faktor miteinander multipliziert ergibt 4096.',
      '4096', () => value(power + 2, 4) === '4096'),
    cell(at(18, 5), 'Drei mit Pi vergleichen',
      'Klicke auf Zeile 18 · Spalte 5. Wir schreiben 3 ≠ π: Pi ist ungefähr 3,14 und deshalb nicht gleich 3.'),
    typing('Die Zahl 3 schreiben', 'Schreibe 3 mit deiner Tastatur oder dem Bildschirm-Nummernblock.',
      '3', () => doc.pages[0][at(18, 5)] === '3'), {
      target: '#relationMore', title: 'Ungleich aus dem Zeichenmenü',
      text: 'Öffne den kleinen Pfeil neben = oder halte Enter kurz gedrückt. Wähle ≠ per Klick oder mit Pfeiltasten und Enter. Hier brauchen wir das normale Zeichen, ohne Strg oder Shift.',
      kind: 'symbol', symbol: '≠',
      done: () => doc.pages[0][at(18, 6)] === '≠'
    }, {
      target: '#greekMore', title: 'Pi ergänzen',
      text: 'Öffne den Pfeil neben π oder halte P gedrückt. Pi ist im Menü vorausgewählt: Bestätige mit Enter oder klicke π. Auch der π-Hauptbutton funktioniert. Nun steht dort 3 ≠ π.',
      kind: 'symbol', symbol: 'π',
      done: () => doc.pages[0][at(18, 7)] === 'π'
    },
    cell(at(25, 5), "Einen gemischten Bruch schreiben", "Gehe zu Zeile 25 · Spalte 5 oder klicke dort. Wir schreiben 2 1/2 + 1/2 = 3. Die ganze 2, Plus, Gleichzeichen und Ergebnis werden doppelhoch; Zähler und Nenner normal groß. Die Brüche stehen wirklich übereinander, nicht als Schrägstrich."),
    button('#largeMode', "Doppelhohe Schrift einschalten", "Klicke auf den Button für doppelhohe Schrift oder halte U etwa 0,6 Sekunden. Der Rahmen zeigt die Wartezeit; der aktive Button pulsiert. Jetzt werden Zahlen, Buchstaben und Rechenzeichen über zwei Kästchen nach unten geschrieben.", () => largeMode),
    typing("Die ganze 2 groß schreiben", "Schreibe 2 mit Tastatur oder Bildschirm-Nummernblock. Die große 2 belegt Zeile 25 und 26 in Spalte 5. Daneben bauen wir den ersten halben Bruch auf.", "2", () => mixedTall(at(25, 5), '2')),
    button('#largeMode', "Zur normalen Schrift zurück", "Klicke erneut auf doppelhohe Schrift oder halte U erneut. Der Button hört auf zu pulsieren. Die nächsten Ziffern werden normal groß geschrieben; die bereits geschriebenen großen Zeichen bleiben groß.", () => !largeMode),
    typing("Erster Zähler: 1", "Schreibe die normal große 1 direkt rechts neben die große 2. Sie ist der Zähler des ersten halben Bruchs.", "1", () => doc.pages[0][at(25, 6)] === '1'),
    cell(at(26, 6), "Unter den ersten Zähler", "Gehe zu Zeile 26 · Spalte 6 oder klicke dort. Hier kommt der Nenner des ersten halben Bruchs hin."),
    typing("Erster Nenner: 2", "Schreibe die normal große 2 unter die 1.", "2", () => doc.pages[0][at(26, 6)] === '2'),
    line("Den gemischten Bruch vervollständigen", "Maus: Ziehe mit rechts zwischen den goldenen Punkten zwischen 1 und 2. Tastatur: Der Zähler ist ausgewählt. Drücke Links+Rechts gleichzeitig, lasse los und bestätige erneut mit Links+Rechts. Die Vorschau liegt unten zwischen Zähler und Nenner. Jetzt steht dort 2 1/2.", [6, 26], [7, 26]),
    cell(at(25, 8), "Platz für das große Plus", "Gehe zu Zeile 25 · Spalte 8 oder klicke dort. Das Plus steht auf derselben Höhe wie die große 2."),
    button('#largeMode', "Doppelhohe Schrift einschalten", "Klicke auf den Button für doppelhohe Schrift oder halte U etwa 0,6 Sekunden. Der Rahmen zeigt die Wartezeit; der aktive Button pulsiert. Jetzt werden Zahlen, Buchstaben und Rechenzeichen über zwei Kästchen nach unten geschrieben.", () => largeMode),
    typing("Das Plus doppelhoch schreiben", "Schreibe +. Im aktiven U-Modus wird auch das Rechenzeichen doppelhoch, passend zur ganzen 2.", "+", () => mixedTall(at(25, 8), '+')),
    button('#largeMode', "Zur normalen Schrift zurück", "Klicke erneut auf doppelhohe Schrift oder halte U erneut. Der Button hört auf zu pulsieren. Die nächsten Ziffern werden normal groß geschrieben; die bereits geschriebenen großen Zeichen bleiben groß.", () => !largeMode),
    cell(at(25, 10), "Den zweiten halben Bruch platzieren", "Gehe zu Zeile 25 · Spalte 10 oder klicke dort. Hier beginnt der zweite Bruch 1/2."),
    typing("Zweiter Zähler: 1", "Schreibe die normal große 1 für den zweiten Zähler.", "1", () => doc.pages[0][at(25, 10)] === '1'),
    cell(at(26, 10), "Unter den zweiten Zähler", "Gehe zu Zeile 26 · Spalte 10 oder klicke dort. Der Nenner steht direkt unter seiner 1."),
    typing("Zweiter Nenner: 2", "Schreibe 2. Beide halben Brüche haben nun Zähler und Nenner.", "2", () => doc.pages[0][at(26, 10)] === '2'),
    line("Den zweiten Halb-Bruch unterstreichen", "Maus: Ziehe den Bruchstrich mit rechts zwischen den goldenen Punkten. Tastatur: Links+Rechts gleichzeitig, loslassen, erneut Links+Rechts zum Bestätigen. Der Strich trennt die zweite 1 von ihrer 2.", [10, 26], [11, 26]),
    cell(at(25, 12), "Platz für das große Gleichzeichen", "Gehe zu Zeile 25 · Spalte 12 oder klicke dort. Hier kommt das doppelhohe Gleichzeichen hin."),
    button('#largeMode', "Doppelhohe Schrift einschalten", "Klicke auf den Button für doppelhohe Schrift oder halte U etwa 0,6 Sekunden. Der Rahmen zeigt die Wartezeit; der aktive Button pulsiert. Jetzt werden Zahlen, Buchstaben und Rechenzeichen über zwei Kästchen nach unten geschrieben.", () => largeMode),
    typing("Das Gleichzeichen doppelhoch schreiben", "Drücke Enter am Nummernblock oder = am Bildschirm-Nummernblock. Auch die normale Zeichentaste = ist erlaubt. Im U-Modus wird das Gleichzeichen doppelhoch; Strg oder Shift brauchen wir hier nicht.", "=", () => mixedTall(at(25, 12), '=')),
    cell(at(25, 14), "Platz für das große Ergebnis", "Gehe zu Zeile 25 · Spalte 14 oder klicke dort. Doppelhohe Schrift bleibt für das Ergebnis eingeschaltet."),
    typing("Das Ergebnis: eine ganze 3", "Schreibe 3. Ein Halb plus ein Halb ergibt ein Ganzes; zusammen mit der 2 sind es 3. Jetzt steht 2 1/2 + 1/2 = 3 mit großen ganzen Zahlen und großen Rechenzeichen auf dem Papier.", "3", () => mixedTall(at(25, 14), '3')),
    button('#largeMode', "Zur normalen Schrift zurück", "Klicke erneut auf doppelhohe Schrift oder halte U erneut. Der Button hört auf zu pulsieren. Die nächsten Ziffern werden normal groß geschrieben; die bereits geschriebenen großen Zeichen bleiben groß.", () => !largeMode),
    button('#copyRegion', 'Eine fertige Rechnung kopieren',
      'Klicke auf Kopieren oder halte C etwa 0,6 Sekunden. Wir kopieren die unterstrichene Rechnung aus Zeile 6.',
      () => region?.mode === 'copy'), {
      target: () => nodes[calc],
      title: 'Die ganze Rechnung auswählen',
      text: 'Maus: Ziehe mit links von der öffnenden Klammer bis zur letzten 0 in Zeile 6. Tastatur: Halte C, falls noch kein Bereich sichtbar ist, drücke zehnmal Rechts und halte C erneut zum Bestätigen. Der Bereich enthält die ganze Rechnung samt Unterstreichung.',
      kind: 'regionSelect',
      index: calc,
      w: 11,
      h: 1,
      done: () => region?.phase === 'place' && region.rect.w === 11 && region.rect.h === 1
    }, {
      target: () => nodes[copy],
      title: 'Die Kopie absetzen',
      text: 'Klicke auf Zeile 20 · Spalte 5 oder gehe mit den Pfeiltasten zum gold markierten Ziel. Im Tutorial wird dort automatisch eingefügt, ohne Enter. Das Ziel ist die linke obere Ecke der Kopie; das Original bleibt erhalten.',
      kind: 'regionPlace',
      index: copy,
      w: 11,
      h: 1,
      done: () => !region && value(copy, 11) === '(12+8)·3=60'
    },
    button('#cutRegion', 'Die Kopie verschieben',
      'Klicke auf die Schere oder halte X etwa 0,6 Sekunden. Beim Verschieben wird der Ursprung erst beim Einfügen entfernt.',
      () => region?.mode === 'cut'), {
      target: () => nodes[copy],
      title: 'Die kopierte Rechnung auswählen',
      text: 'Maus: Ziehe in Zeile 20 von der öffnenden Klammer bis zur letzten 0. Tastatur: Halte X, falls nötig, drücke zehnmal Rechts und halte X erneut, um den Quellbereich zu bestätigen.',
      kind: 'regionSelect',
      index: copy,
      w: 11,
      h: 1,
      done: () => region?.phase === 'place' && region.rect.w === 11 && region.rect.h === 1
    }, {
      target: () => nodes[move],
      title: 'An einem neuen Ort einfügen',
      text: 'Klicke auf Zeile 22 · Spalte 5 oder gehe mit den Pfeiltasten zum gold markierten Ziel. Im Tutorial wird beim Erreichen automatisch eingefügt, ohne Enter. Farben, Zeichen und Unterstreichung werden mitverschoben.',
      kind: 'regionPlace',
      index: move,
      w: 11,
      h: 1,
      done: () => !region && value(move, 11) === '(12+8)·3=60' && !doc.pages[0][copy]
    },
    button('#undo', 'Verschieben rückgängig machen',
      'Klicke auf ↶ oder drücke Strg + Z. Die kopierte Rechnung kehrt in Zeile 20 zurück.', () => value(
        copy, 11) === '(12+8)·3=60' && !doc.pages[0][move], {
        shortcut: 'undo'
      }),
    button('#redo', 'Verschieben wiederholen',
      'Klicke auf ↷ oder drücke Strg + Y. Damit schiebst du die Rechnung wieder in Zeile 22.', () => value(
        move, 11) === '(12+8)·3=60' && !doc.pages[0][copy], {
        shortcut: 'redo'
      }),
    button('#add', 'Ein Blatt hinzufügen',
      'Klicke auf „＋ Seite“ oder halte Einfügen etwa 0,6 Sekunden. Im Papiermenü ist Karo vorausgewählt: Bestätige mit Enter. Die neue Seite wird aktiviert. Außerhalb dieser Übung kannst du dort auch Millimeterpapier wählen.', () =>
      doc.pages.length === 2 && page === 1),
    button('#prev', 'Zurückblättern',
      'Klicke auf „Zurück“ oder halte PageUp (Bild ↑), um zur ersten Seite zurückzublättern.', () => page ===
      0),
    button('#next', 'Vorblättern', 'Klicke auf „Vor“ oder halte PageDown (Bild ↓), um zur zweiten Seite zu blättern.', () => page ===
    1), {
      target: '#pageView',
      title: 'Zwei Blätter nebeneinander',
      text: 'Wähle „Doppelseite“ oder halte D etwa 0,6 Sekunden. D schaltet zwischen Einzel- und Doppelseite um. Beide Seiten werden an die Fensterbreite angepasst.',
      kind: 'select',
      value: '2',
      done: () => pageView === '2'
    }, {
      target: () => document.querySelector('.companion .cell[data-index="' + calc + '"]'),
      title: 'Das andere Blatt aktivieren',
      text: 'Klicke links auf die gold markierte Klammer in Zeile 6 oder halte PageUp (Bild ↑), um die erste Seite zu aktivieren.',
      kind: 'companion',
      done: () => page === 0
    },
    button('#save', 'Das Übungsblatt als Datei sichern',
      'Klicke auf „.schmier speichern“ oder drücke Strg+S (am Mac auch ⌘+S). Du lädst eine bearbeitbare Sicherung des Übungsblatts herunter. Eigene Dokumente öffnest du später über „Datei laden“.',
      () => tutorial.saved, { shortcut: 'save' }),
    button('#pdf', 'Die Rechnungen als PDF exportieren',
      'Klicke auf „PDF exportieren“ oder halte E etwa 0,6 Sekunden. Warte auf die PDF mit allen Übungsseiten. Farben, Bruchstriche und Hochzahlen bleiben erhalten. Danach kannst du das Tutorial mit Esc beenden.',
      () => tutorial.exported),
  ];
}

function tourHasLine(start, end) {
  const h = start[1] === end[1],
    low = Math.min(h ? start[0] : start[1], h ? end[0] : end[1]),
    high = Math.max(h ? start[0] : start[1], h ? end[0] : end[1]);
  for (let n = low; n < high; n++)
    if (!doc.lines[0].some(([x1, y1, x2, y2]) => h ? y1 === start[1] && y2 === start[1] && Math.min(x1, x2) <=
        n && Math.max(x1, x2) >= n + 1 : x1 === start[0] && x2 === start[0] && Math.min(y1, y2) <= n && Math
        .max(y1, y2) >= n + 1)) return false;
  return true;
}

function tourElement(step) {
  if (step.target === 'lineArea') return $('paper');
  return typeof step.target === 'function' ? step.target() : document.querySelector(step.target)
}

function positionTutorial() {
  if (!tutorial || tutorial.finished) return;
  const step = tutorial.steps[tutorial.index],
    el = tourElement(step),
    halo = $('tutorialHalo');
  if (!el || !halo) return;
  const r = el.getBoundingClientRect();
  let left = r.left - 12,
    top = r.top - 12,
    width = r.width + 24,
    height = r.height + 24;
  if (step.index !== undefined && (step.w || step.h)) {
    const paper = $('paper').getBoundingClientRect();
    width = (step.w || 1) * 5 * paper.width / 210 + 24;
    height = (step.h || 1) * 5 * paper.height / 297 + 24
  }
  halo.classList.toggle('line-guidance', step.kind === 'line');
  if (step.kind === 'line') {
    const x = r.left + step.start[0] * 5 * r.width / 210,
      y = r.top + step.start[1] * 5 * r.height / 297,
      dx = (step.end[0] - step.start[0]) * 5 * r.width / 210;
    left = x - 16;
    top = y - 24;
    width = dx + 32;
    height = 48;
    halo.style.setProperty('--travel', dx + 'px');
  }
  Object.assign(halo.style, {
    left: left + 'px',
    top: top + 'px',
    width: width + 'px',
    height: height + 'px'
  });
}

function tourFeedback(message) {
  if ($('tutorialError')) $('tutorialError').textContent = message
}

function showTutorialStep() {
  const step = tutorial.steps[tutorial.index];
  tutorial.stepInput = '';
  tutorial.saved = false;
  tutorial.exported = false;
  $('tutorialProgress').textContent = `Übung ${tutorial.index+1} von ${tutorial.steps.length}`;
  $('tutorialTitle').textContent = step.title;
  $('tutorialText').textContent = tr(step.text) + (['line','regionSelect','regionPlace'].includes(step.kind) || ['#parenOpen','#parenClose'].includes(step.target) ? '\n\n' + tr('Alternativ bestätigt Enter den aktuellen Schritt. Die Aktivierungstaste nach dem Loslassen einmal drücken bestätigt ebenfalls, sofern sie nicht zur Texteingabe dient.') : '');
  $('tutorialError').textContent = '';
  $('tutorialFill').style.width = (tutorial.index / tutorial.steps.length * 100) + '%';
  const target = tourElement(step);
  if (step.kind === 'line') {
    keyboardLine = null;
    select((step.start[1] - 2) * COLS + step.start[0] - 1);
  } else if (['typing', 'key', 'symbol', 'cell', 'companion'].includes(step.kind) || tutorialPenDigit() || keyboardArea ||
      ['KeyR', 'KeyC', 'KeyX', 'KeyE', 'KeyD', 'PageUp', 'PageDown', 'Insert', 'Delete', 'ShiftLeft', 'ControlLeft', 'KeyU'].some(tutorialHoldAllowed) || step.target === '#save' ||
      ['#parenOpen', '#parenClose'].includes(step.target)) select(pos);
  else $('editor').blur();
  const scrollTarget = step.kind === 'line' ? nodes[Math.max(0, (step.start[1] - 1) * COLS + step.start[0] -
    1)] : target;
  scrollTarget?.scrollIntoView({
    block: 'nearest',
    inline: 'nearest'
  });
  positionTutorial();
}

function startTutorial() {
  cancelStretchBracket();
  cancelModifierModeHolds();
  for (const code of [...actionHolds.keys()]) finishActionHold(code);
  closeExtraMenu(); cancelKeyboardArea();
  for (const code of [...penNumberHolds.keys()]) finishPenNumberHold(code);
  closeRelationMenu(); closeGreekMenu(); cancelKeyboardLine();
  toggleKeypad(false);
  cancelStrike();
  finishPenGesture();
  if (tutorial) return;
  cancelNumberLine(false);
  finishMark();
  cancelRegion();
  resetCorner();
  clearTimeout(saveTimer);
  const backup = {
    compass: {
      ...compass,
      stroke: null,
      move: null
    },
    geo: {
      ...geo,
      gesture: null
    },
    doc,
    page,
    pos,
    returnColumn,
    history,
    future,
    pageView,
    manualZoom,
    smallMode,
    smallFresh,
    largeMode,
    tool,
    ink,
    markerColor,
    scrollX: window.scrollX,
    scrollY: window.scrollY
  };
  tutorial = {
    backup,
    index: 0,
    steps: tutorialSteps(),
    finished: false,
    timer: null
  };
  compass = {
    ...compass,
    active: false,
    stroke: null,
    move: null
  };
  geo = {
    ...geo,
    visible: false,
    placing: false,
    gesture: null
  };
  doc = validate({
    version: 1,
    grid: 'inset-a4',
    name: 'Tutorial – Übungsblatt',
    pages: [{}]
  });
  page = 0;
  pos = 0;
  returnColumn = pos % COLS;
  history = [];
  future = [];
  largeMode = false;
  updateLargeModeButton();
  smallMode = null;
  smallFresh = false;
  tool = 'pen';
  ink = '#172e65';
  pageView = '1';
  manualZoom = null;
  $('pageView').value = '1';
  $('paper').classList.remove('marking');
  $('carryMode').setAttribute('aria-pressed', 'false');
  $('powerMode').setAttribute('aria-pressed', 'false');
  document.querySelectorAll('.swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool ===
    'pen' && b.dataset.color === ink)));
  const coach = document.createElement('section');
  coach.id = 'tutorialCoach';
  coach.setAttribute('role', 'region');
  coach.setAttribute('aria-label', 'Geführtes Tutorial');
  coach.innerHTML =
    '<div id="tutorialProgress"></div><div id="tutorialTrack"><span id="tutorialFill"></span></div><h2 id="tutorialTitle"></h2><p id="tutorialText"></p><p id="tutorialError" role="status" aria-live="polite"></p><button id="tutorialStop" title="Tutorial beenden und zum eigenen Dokument zurückkehren">Tutorial beenden</button>';
  const halo = document.createElement('div');
  halo.id = 'tutorialHalo';
  halo.setAttribute('aria-hidden', 'true');
  halo.innerHTML =
    '<span class="tour-start-dot"></span><span class="tour-end-dot"></span><span class="tour-travel-dot"></span>';
  document.body.append(halo, coach);
  document.body.classList.add('in-tutorial');
  $('tutorialStop').onclick = () => endTutorial();
  render();
  window.scrollTo(0, 0);
  status('Tutorial · separates Übungsblatt · keine automatische Speicherung');
  showTutorialStep();
}

function endTutorial() {
  if (!tutorial) return;
  cancelModifierModeHolds();
  for (const code of [...actionHolds.keys()]) finishActionHold(code);
  closeExtraMenu(); cancelKeyboardArea();
  for (const code of [...penNumberHolds.keys()]) finishPenNumberHold(code);
  closeRelationMenu(); closeGreekMenu(); cancelKeyboardLine();
  clearTimeout(enterHold?.timer); enterHold = null;
  clearTimeout(greekHold?.timer); greekHold = null;
  const backup = tutorial.backup;
  clearTimeout(tutorial.timer);
  cancelRegion();
  resetCorner();
  markDrag = null;
  tutorial = null;
  ({
    compass,
    geo,
    doc,
    page,
    pos,
    returnColumn,
    history,
    future,
    pageView,
    manualZoom,
    smallMode,
    smallFresh,
    largeMode,
    tool,
    ink,
    markerColor
  } = backup);
  $('tutorialCoach')?.remove();
  $('tutorialHalo')?.remove();
  document.body.classList.remove('in-tutorial');
  $('pageView').value = pageView;
  $('carryMode').setAttribute('aria-pressed', String(smallMode === 'carries'));
  $('powerMode').setAttribute('aria-pressed', String(smallMode === 'powers'));
  updateLargeModeButton();
  $('paper').classList.toggle('marking', tool !== 'pen');
  document.querySelectorAll('.swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.tool ===
    tool && (tool === 'eraser' || b.dataset.color === (tool === 'pen' ? ink : markerColor)))));
  render();
  persist();
  window.scrollTo(backup.scrollX, backup.scrollY);
}

function checkTutorial() {
  if (!tutorial || tutorial.finished) return;
  const step = tutorial.steps[tutorial.index];
  if (!step.done()) {
    positionTutorial();
    return
  }
  if (++tutorial.index < tutorial.steps.length) {
    showTutorialStep();
    return
  }
  tutorial.finished = true;
  $('tutorialHalo').style.display = 'none';
  $('tutorialProgress').textContent = 'Tutorial abgeschlossen';
  $('tutorialFill').style.width = '100%';
  $('tutorialTitle').textContent = 'Geschafft!';
  $('tutorialText').textContent =
    'Du hast die wichtigsten Werkzeuge selbst ausprobiert. Drücke Esc oder klicke unten, um das Tutorial zu beenden und zu deinem unveränderten Dokument zurückzukehren. Die heruntergeladenen Dateien enthalten nur das Übungsblatt.';
  $('tutorialError').textContent = '';
  $('tutorialStop').textContent = 'Zurück zu meinem Dokument';
  $('tutorialStop').focus();
}

function scheduleTutorialCheck() {
  if (!tutorial || tutorial.finished) return;
  clearTimeout(tutorial.timer);
  tutorial.timer = setTimeout(checkTutorial, 0)
}

function tutorialGate(e) {
  if (!tutorial) return;
  if (e.target.closest?.('#shortcutHintsToggle')) return;
  if (e.type === 'keydown' && (e.code === 'KeyN' || e.key?.toLowerCase() === 'n') &&
      !e.ctrlKey && !e.altKey && !e.metaKey && !tutorial.finished) {
    if (tutorial.steps[tutorial.index]?.target === '#keypadToggle') {
      e.preventDefault(); e.stopImmediatePropagation();
      tutorial.keypadSkipped = true;
      checkTutorial();
      return;
    }
    if (e.repeat && tutorial.keypadSkipped) {
      e.preventDefault(); e.stopImmediatePropagation(); return;
    }
  }
  if (tutorial.finished && e.type === 'keydown' && e.key === 'Escape') {
    e.preventDefault(); e.stopImmediatePropagation(); endTutorial(); return;
  }
  if (e.type === 'keydown' && e.repeat && (penNumberHolds.get(e.code)?.selected || actionHolds.get(e.code)?.fired)) {
    e.preventDefault(); e.stopImmediatePropagation(); return;
  }
  if (e.target.closest?.('#tutorialCoach,.language-picker,#storageConsentOpen,#storageConsentDialog,#inputDialog,#virtualKeypad,#keypadToggle')) {
    // Check after button handlers; generated input events still pass the exercise gate.
    if (e.type === 'click') scheduleTutorialCheck();
    return;
  }
  if (e.type === 'keydown' && e.key === 'Escape') {
    if (keyboardLine || relationMenuOpen || greekMenuOpen || keyboardArea || extraMenu) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    endTutorial();
    return
  }
  if (['keyup', 'pointercancel', 'pointerleave'].includes(e.type)) return;
  const step = tutorial.steps[tutorial.index];
  let allowed = false;
  if (!tutorial.finished) {
    const target = tourElement(step),
      onTarget = target && (e.target === target || target.contains(e.target));
    const onEditor = e.target === $('editor');
    const onPaper = $('paper').contains(e.target);
    const point = onPaper && typeof e.clientX === 'number' ? markerPoint(e) : null;
    const index = point ? point[1] * COLS + point[0] : null;
    const keyEvent = e.type === 'keydown',
      modifierKey = keyEvent && ['Control', 'Shift', 'Alt', 'Meta'].includes(e.key);
    if (modifierKey) {
      allowed = true
    } else if (keyboardArea && keyEvent && onEditor && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey &&
        (e.key.startsWith('Arrow') || e.key === 'Enter' || tutorialHoldAllowed(e.code))) {
      allowed = true;
    } else if (extraMenu && (step.target === '#add' || step.target === '#parenOpen' || step.target === '#parenClose')) {
      const wanted = step.target === '#add' ? 'squared' : step.target === '#parenOpen' ? '(' : ')';
      const choice = e.target.closest?.('#' + extraMenu + ' button');
      const plain = !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey;
      if (plain && ['#parenOpen', '#parenClose'].includes(step.target) &&
          e.target.closest?.(step.target + ',' + step.target + 'More')) allowed = true;
      if (choice) allowed = plain && !choice.dataset.size && (choice.dataset.paper || choice.dataset.symbol) === wanted;
      if (keyEvent && onEditor) {
        const current = $(extraMenu).querySelector('.menu-current');
        allowed = plain && (e.key.startsWith('Arrow') || (e.key === 'Enter' || e.key === activeMenuActivation(extraMenu)) && !current?.dataset.size && (current?.dataset.paper || current?.dataset.symbol) === wanted);
      }
    } else if (step.kind === 'button') {
      if (['#parenOpen', '#parenClose'].includes(step.target) &&
          e.target.closest?.(step.target === '#parenOpen' ? '#parenOpenMore' : '#parenCloseMore') &&
          !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) allowed = true;
      if (keyEvent && onEditor && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey &&
          tutorialHoldAllowed(e.code)) allowed = true;
      if (keyEvent && onEditor && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey &&
          new RegExp('^(?:Digit|Numpad)' + tutorialPenDigit() + '$').test(e.code)) allowed = true;
      if (onTarget && ['pointerdown', 'pointerup', 'pointermove', 'click', 'focusin'].includes(e.type)) {
        allowed = e.type === 'pointermove' || (step.modifier === 'ctrl' ? e.ctrlKey && !e.shiftKey && !e
          .altKey && !e.metaKey : !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey);
      }
      if (keyEvent && onTarget && ['Enter', ' '].includes(e.key)) allowed = step.modifier === 'ctrl' ? e
        .ctrlKey && !e.shiftKey : !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey;
      if (keyEvent && step.shortcut && (e.ctrlKey || e.metaKey) && !e.altKey) {
        allowed = step.shortcut === 'save' ? e.key.toLowerCase() === 's' && !e.shiftKey : step.shortcut === 'undo' ? e.key.toLowerCase() === 'z' && !e.shiftKey : (e.key
        .toLowerCase() === 'y' || e.key.toLowerCase() === 'z' && e.shiftKey)
      }
    } else if (step.kind === 'symbol') {
      const greek = step.symbol === 'π';
      const menu = greek ? '#greekMenu' : '#relationMenu';
      const trigger = greek ? '#greekMore,#greek' : '#relationMore';
      const menuTarget = e.target.closest?.(menu);
      const choice = e.target.closest?.(menu + ' button');
      const plain = !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey;
      if (plain && e.target.closest?.(trigger)) allowed = true;
      if (plain && menuTarget) allowed = e.type === 'pointermove' || choice?.dataset.symbol === step.symbol;
      if (plain && keyEvent && onEditor) {
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) allowed = greek ? greekMenuOpen : relationMenuOpen;
        if (e.key === 'Enter') {
          const current = document.querySelector(menu + ' .menu-current');
          allowed = !(greek ? greekMenuOpen : relationMenuOpen) ? !greek : current?.dataset.symbol === step.symbol;
        }
        if (greek && e.code === 'KeyP') allowed = !greekMenuOpen || document.querySelector(menu + ' .menu-current')?.dataset.symbol === step.symbol;
      }
    } else if (step.kind === 'typing') {
      if (keyEvent && onEditor && !e.ctrlKey && !e.altKey && !e.metaKey) {
        let value = e.key;
        if (/^Digit\d$/.test(e.code)) value = e.code.slice(-1);
        if (/^Numpad\d$/.test(e.code)) value = e.code.slice(-1);
        if (e.code === 'NumpadMultiply' || value === '*') value = '·';
        if (e.code === 'NumpadDivide' || value === '÷') value = ':';
        if (e.code === 'NumpadEnter') value = '=';
        allowed = typeof value === 'string' && value.length === 1 && step.expected.startsWith(tutorial
          .stepInput + value);
        if (allowed) tutorial.stepInput += value
      }
      if (['beforeinput', 'input', 'compositionend'].includes(e.type) && onEditor) {
        const data = e.data ?? '';
        allowed = !!data && step.expected.startsWith(tutorial.stepInput || data)
      }
    } else if (step.kind === 'key') {
      allowed = keyEvent && onEditor && step.keys.includes(step.byCode ? e.code : e.key) && e.ctrlKey === !!
        step.ctrl && !e.altKey && !e.shiftKey && !e.metaKey
    } else if (step.kind === 'select') {
      if (keyEvent && onEditor && tutorialHoldAllowed(e.code)) allowed = true;
      else allowed = onTarget && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey;
      if (e.type === 'change') allowed = onTarget && e.target.value === step.value && (step.target !==
        '#greek' || !greekModifiers.ctrlKey && !greekModifiers.shiftKey);
    } else if (['cell', 'paint', 'regionSelect', 'regionPlace'].includes(step.kind)) {
      const w = step.w || 1,
        h = step.h || 1,
        last = step.index + (h - 1) * COLS + w - 1;
      const within = index !== null && inRegion(index, {
        x: step.index % COLS,
        y: Math.floor(step.index / COLS),
        w,
        h
      });
      allowed = onPaper && (step.kind === 'paint' ? within : index === (step.kind === 'regionSelect' && e
          .type === 'pointerup' ? last : step.index)) && ['pointerdown', 'pointerup', 'pointermove', 'click']
        .includes(e.type) && (e.type === 'pointermove' || e.button === 0);
      if (step.kind === 'cell' && keyEvent && onEditor && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        allowed = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Tab', 'Home', 'End'].includes(e.key);
      }
      if (step.kind === 'regionSelect' && region?.dragging && e.type === 'pointermove') allowed = true;
    } else if (step.kind === 'companion') {
      if (keyEvent && onEditor && tutorialHoldAllowed(e.code)) allowed = true;
      else allowed = !!e.target.closest?.('.companion') && ['pointerdown', 'pointerup', 'pointermove', 'click']
        .includes(e.type)
    } else if (step.kind === 'line') {
      if (keyEvent && onEditor && !e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey && (e.key.startsWith('Arrow') || e.key === 'Enter' && keyboardLine)) allowed = true;
      if (onPaper && e.type === 'pointermove') allowed = true;
      if (onPaper && ['pointerdown', 'pointerup', 'click'].includes(e.type)) {
        const p = paperPoint(e),
          grid = [Math.round(p[0] / 5), Math.round(p[1] / 5)];
        allowed = e.button === 2 && (e.type === 'pointerdown' ? grid[0] === step.start[0] && grid[1] === step
          .start[1] && armed : grid[0] === step.end[0] && grid[1] === step.end[1]);
      }
    }
  }
  if (!allowed) {
    e.preventDefault();
    e.stopImmediatePropagation();
    if (e.type === 'pointermove') return;
    if (e.type === 'pointerup' && $('paper').hasPointerCapture(e.pointerId)) $('paper').releasePointerCapture(
      e.pointerId);
    if (e.type === 'pointerup' && step?.kind === 'paint' && markDrag) {
      finishMark()
    }
    if (e.type === 'pointerup' && step?.kind === 'line') {
      resetCorner();
      renderLines()
    }
    if (e.type === 'pointerup' && step?.kind === 'regionSelect' && region) {
      region.dragging = false;
      region.phase = 'select';
      region.rect = null;
      renderRegion()
    }
    const reason = ['#parenOpen', '#parenClose'].includes(step?.target) ? "Für diese Rechnung brauchst du die normale runde Klammer in der mittleren Zeile, ganz links. Hoch/Runter wechselt die Größe, Links/Rechts die Form. Bestätige ohne Strg oder Shift; die großen Formen gehören nicht zu diesem Schritt." : step?.kind === 'typing' ?
      'Diese Eingabe passt noch nicht zur Rechnung. Tippe genau die angegebene Zeichenfolge. Für normale Zahlen nimm die obere Zahlenreihe oder den Nummernblock.' :
      step?.modifier ? 'Für diese große Klammer musst du Strg beim Klicken gedrückt halten.' : step?.kind ===
      'line' ?
      'Zeichne genau die gold markierte Strecke: mit rechts vom grünen Startpunkt zum Ziel oder per Links+Rechts, Pfeiltasten und erneut Links+Rechts. Andere Strecken gehören noch nicht zu dieser Übung.' :
      step?.kind === 'symbol' ? 'Wähle genau das geforderte Zeichen ohne Strg oder Shift. Öffne dazu den markierten Menüpfeil oder nutze das erklärte Halten der Taste.' :
      step?.kind === 'select' ?
      'Wähle bitte genau den genannten Eintrag – in dieser Übung ohne Strg, Shift oder Alt.' :
      'Dieses Werkzeug oder Kästchen ist jetzt noch nicht dran. Führe zuerst die Aktion im gold markierten Bereich aus.';
    tourFeedback(reason);
    return;
  }
  if (e.type === 'click' && step?.target === '#save') tutorial.saved = true;
  scheduleTutorialCheck();
}
for (const type of ['pointerdown', 'pointerup', 'pointermove', 'click', 'keydown', 'beforeinput', 'input',
    'paste', 'change', 'compositionend'
  ]) window.addEventListener(type, tutorialGate, true);
window.addEventListener('resize', positionTutorial);
window.addEventListener('scroll', positionTutorial, true);
$('tutorialStart').onclick = startTutorial;

// @part part-04
function tutorialPenDigit() {
  if (!tutorial || tutorial.finished) return null;
  const step = tutorial.steps[tutorial.index];
  if (step?.kind !== 'button') return null;
  const target = tourElement(step);
  if (target?.dataset.tool !== 'pen') return null;
  const index = [...document.querySelectorAll('.swatch[data-tool="pen"]')].indexOf(target);
  return index < 0 ? null : String(index + 1);
}

// @part part-05
function tutorialHoldAllowed(code) {
  if (!tutorial) return true;
  const step = tutorial.steps[tutorial.index];
  if (!step) return false;
  if (keyboardArea) {
    const expected = { erase: 'KeyR', copy: 'KeyC', cut: 'KeyX' }[keyboardArea.mode];
    if (code === expected) return true;
    if (keyboardArea.phase === 'place' && ['PageUp', 'PageDown'].includes(code)) return false;
  }
  if (step.kind === 'select' && step.target === '#pageView' && code === 'KeyD') return true;
  if (step.kind === 'companion' && code === 'PageUp') return true;
  if (step.kind === 'paint' && tool === 'eraser' && code === 'KeyR') return true;
  if (step.kind === 'regionSelect' && (code === 'KeyC' && region?.mode === 'copy' || code === 'KeyX' && region?.mode === 'cut')) return true;
  if (step.kind !== 'button') return false;
  if (/^Shift(?:Left|Right)$/.test(code) && step.target === '#powerMode') return true;
  if (/^Control(?:Left|Right)$/.test(code) && step.target === '#carryMode') return true;
  const target = tourElement(step);
  return code === 'KeyU' && step.target === '#largeMode' || code === 'KeyE' && step.target === '#pdf' ||
    /^(?:Digit|Numpad)8$/.test(code) && step.target === '#parenOpen' || /^(?:Digit|Numpad)9$/.test(code) && step.target === '#parenClose' ||
    code === 'KeyR' && target?.dataset.tool === 'eraser' ||
    code === 'KeyC' && step.target === '#copyRegion' || code === 'KeyX' && step.target === '#cutRegion' ||
    code === 'PageUp' && step.target === '#prev' || code === 'PageDown' && step.target === '#next' ||
    code === 'Insert' && step.target === '#add' || code === 'Delete' && step.target === '#remove';
}
