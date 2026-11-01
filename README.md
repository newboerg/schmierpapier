# Schmierpapier

**Deutsch** · [English](README.en.md) · [Français](README.fr.md)

Änderungen: [Changelog](CHANGELOG.md).

**Direkt ausprobieren:** [Live-Test im Browser](https://htmlpreview.github.io/?https://github.com/newboerg/schmierpapier/blob/main/schmierpapier.html) – ohne Download. Für die Offline-Nutzung die HTML-Datei wie unten beschrieben herunterladen.

**Digitales Rechenpapier für Menschen, die im Mathematikunterricht kein normales Papier benutzen können.**

**Wichtig: Schmierpapier ist kein Taschenrechner und nimmt Schülerinnen und Schülern keine Rechenarbeit ab.** Es berechnet keine Ergebnisse und löst keine Aufgaben automatisch. Rechenwege, Zwischenschritte und Lösungen erarbeiten die Lernenden selbst – die Anwendung stellt dafür digitales Papier und Schreib- und Zeichenwerkzeuge bereit.

Schmierpapier bietet einen Platz zum Rechnen, Ausprobieren und Zeichnen direkt im Browser. Es richtet sich insbesondere an Schülerinnen und Schüler, für die das Schreiben oder Zeichnen auf Papier wegen motorischer Einschränkungen, unwillkürlicher Bewegungen oder anderer individueller Voraussetzungen nicht möglich oder schwer zugänglich ist.

Die Anwendung soll das eigenständige Arbeiten im Mathematikunterricht unterstützen: Rechnungen lassen sich mit Tastatur und Maus in Kästchen schreiben, Brüche übersichtlich anordnen und geometrische Konstruktionen mit digitalen Werkzeugen zeichnen. Viele Funktionen sind über Buttons erreichbar, sodass nicht für jede Eingabe eine Tastenkombination nötig ist.

Version **0.4**

Projektwebseite: [schmierpapier.org](https://schmierpapier.org). Das Logo im App-Header öffnet sie in einem neuen Tab.

## Neu in v0.4

- Wurzelzeichen mit exakt verlängerbarem Balken und Vergleichszeichen-Menü neben `=`; Strg/Shift erzeugen doppelhohe Formen.
- Griechische Zeichen über den π-Button und sein Menü. Klammermenüs durch Halten von 8/9, griechisches Menü durch P und Vergleichsmenü durch Enter.
- Linien per Tastatur mit roter gestrichelter Vorschau: Links+Rechts startet waagerecht, Hoch+Runter senkrecht. Das aktuelle Kästchen bleibt enthalten; waagerechte Striche starten unten.
- Halte-Shortcuts für Stiftfarben, Hoch-/Tiefstellen, Bereichsradierer, Kopieren, Ausschneiden, Seiten, Ansicht und PDF. Aktive Hoch-/Tiefstellen-Modi pulsieren; beim Drücken von Strg/Shift erscheint sofort eine gelbe Vorschau.
- Enter verwendet die zuletzt per Navigation oder Klick gewählte Spalte als Zeilenanfang. Der Trefferbereich an Rasterecken wächst mit Blatt- und Browserzoom.
- Überarbeitetes Tutorial mit Maus-/Tastaturalternativen und „3 ≠ π“, ohne Textmarker- und Radierübungen. Strg+S, PDF per E, Ansicht per D und Abschluss per Esc werden erklärt.
- Fußzeile „Von Benni ♥ Kirstin“ mit `&` im Herz.

## Starten

1. [schmierpapier.html](schmierpapier.html) herunterladen. Auf GitHub die Datei öffnen und **„Download raw file“** auswählen.
2. Die heruntergeladene HTML-Datei in einem aktuellen Browser öffnen, zum Beispiel per Doppelklick.
3. Ein Kästchen anklicken und losschreiben. Die integrierte **Hilfe** erklärt alle Funktionen und Tastenkürzel. Das **Tutorial** führt mit praktischen Aufgaben durch die wichtigsten Werkzeuge.

Eine Installation, ein Benutzerkonto oder ein Server sind nicht erforderlich. Die Anwendung besteht aus einer einzigen HTML-Datei. JavaScript, Schriften, Übersetzungen, Hilfe und Tutorial sind eingebettet; die Anwendung funktioniert vollständig offline.

**Tastaturhinweis:** Laptoptastaturen ohne vollwertigen Nummernblock können durch nötige Fn-Tastenkombinationen schwieriger zu bedienen sein. Empfohlen wird eine vollwertige Tastatur mit separatem Nummernblock, bei Bedarf als externe Tastatur am Laptop.

Das Tutorial stellt den Bildschirm-Nummernblock gleich zu Beginn vor; danach ist seine Nutzung optional.

Ein verschiebbarer Bildschirm-Nummernblock ist über einen Button im Kopf erreichbar. Er bleibt über dem Papier und lässt beim Anklicken den Fokus im aktiven Eingabefeld; die übrige Arbeitsfläche bleibt bedienbar.

## Was Schmierpapier kann

### Rechnen in Kästchen

- Faktoren durchstreichen: Bereich mit roter gestrichelter Vorschau auswählen und diagonal in der Stiftfarbe wegstreichen; Esc bricht ab.
- Kariertes DIN-A4-Papier mit 5-mm-Kästchen und Randlinien.
- Ein normales Zeichen pro Kästchen; Navigation mit Pfeiltasten oder Mausklick.
- Zahlen über die obere Zahlenreihe oder den Nummernblock, Buchstaben über die Tastatur.
- Eingebettete Handschrift und vier Stiftfarben: Schwarz, Blau, Grün und Rot.
- Hochzahlen, mehrstellige Exponenten, Indizes und Überträge, auch über dauerhafte Schreibmodi. Aktive Modi pulsieren; bei reduzierten Animationen werden sie fest umrandet.
- Runde, eckige, geschweifte und spitze Klammern über Hauptbuttons und Pfeilmenüs, auch über zwei Kästchen Höhe.
- Wurzelzeichen sowie Vergleichszeichen wie `=`, `≠`, `<`, `>`, `≤`, `≥` und `≈`, auch doppelhoch.
- Besondere Gleichzeichen zwischen zwei übereinanderliegenden Kästchen für Bruchrechnungen.
- Buttons für Integral, griechische Buchstaben, `&` und `%`. Der π-Button schreibt Pi; sein Pfeil oder langes Halten von P im Kästchen öffnet das griechische Zeichenmenü. Pfeiltasten und Enter wählen, Esc schließt; kurzes P schreibt weiterhin p. Strg/Shift erzeugen Index/Potenz.
- Rechenzeichen in der Schreibweise `·` für Multiplikation und `:` für Division.

### Zeichnen und Markieren

- Waagerechte und senkrechte Stiftlinien auf Karopapier.
- Zusätzlich schräge Stiftlinien auf Millimeterpapier, mit 1-mm-Rastung.
- Linien verlängern, ohne doppelte Abschnitte zu erzeugen; vollständig nachgezogene Abschnitte entfernen.
- Textmarker in Pink, Neongelb und Neongrün.
- Radierer für Textmarker und gezeichnete Striche. Schrift wird mit Entf oder Rücktaste gelöscht.
- Bereiche mit Zeichen, Farben und Zeichnungen kopieren oder mit der Schere verschieben.
- Rückgängig und Wiederholen.

### Geometriewerkzeuge

- **Geodreieck:** transparent und zum Papier maßstabsgetreu. Am Nullpunkt verschieben, an den Spitzen drehen und mit der rechten Maustaste entlang der Kanten zeichnen. Eine rote gestrichelte Vorschau macht den aktuellen Strich sichtbar. In der Doppelseitenansicht lässt sich das Geodreieck direkt auf die andere Seite ziehen.
- **Zirkel:** Mittelpunkt setzen, einen freien Radius wählen und mit gedrückter rechter Maustaste Kreise oder Kreisbögen zeichnen. Ein zusammenhängend gezeichneter Bogen lässt sich als Ganzes radieren. Während der Radiuswahl lässt sich optional das Geodreieck am Mittelpunkt einblenden: Der Geodreieck-Button pulsiert als Hinweis auf diese Messhilfe. Sie dreht sich mit und verschwindet beim Bestätigen des Radius.
- **Zahlenstrahlen und Koordinatenachsen:** waagerecht oder senkrecht mit Pfeil und Teilstrichen zeichnen. Bei rechtwinklig gekreuzten Zahlenstrahlen richtet sich die Teilung am gemeinsamen Nullpunkt aus. Beschriftungen werden von Hand eingegeben; Zahlen werden nicht automatisch eingesetzt. Nach zwei gezeichneten Strahlen kehrt die Anwendung zum vorherigen Werkzeug zurück.

### Seiten und Ansicht

- Mehrere Seiten in einem Dokument, wahlweise einzeln oder als Doppelseite. Ein dezenter blauer Leuchtrand zeigt in der Doppelseitenansicht die aktive Seite.
- Neue Seiten direkt als Karopapier hinzufügen; über den kleinen Pfeil daneben Millimeterpapier wählen.
- Die Papierart wird beim Erstellen einer Seite festgelegt. Beide Papierarten können im selben Dokument vorkommen.
- Auf Millimeterpapier rasten die entsprechenden Zeichenwerkzeuge bei 1 mm ein. Die Schreibkästchen bleiben 5 mm groß.
- Zoom, automatische Anpassung an die Fensterbreite und Vollbild. Beim Hineinzoomen wird das ausgewählte Kästchen im sichtbaren Bereich zentriert. + oder - halten zoomt um zehn Prozentpunkte; kurze Tastendrücke schreiben weiterhin Rechenzeichen.
- Oberfläche, Tooltips, Hilfe und Tutorial auf **Deutsch, Englisch und Französisch**. Beim ersten Start wird nach Möglichkeit die Browsersprache verwendet; eine eigene Auswahl wird bei Zustimmung zur Browserspeicherung im Browser gemerkt.

## Speichern und Weitergeben

- **`.schmier speichern`** lädt eine bearbeitbare Datei mit allen Seiten und Inhalten herunter. Über **„Datei laden“** lässt sie sich später wieder öffnen.
- **PDF exportieren** gibt alle vorhandenen Seiten als DIN-A4-Dokument aus. Die PDF-Seiten sind Bilder; der Text ist darin nicht als normaler PDF-Text auswählbar.
- **Drucken** öffnet den Druckdialog des Browsers. Für maßstabsgetreue Zeichnungen A4 und tatsächliche Größe beziehungsweise 100 % wählen.
- Nach Zustimmung wird eine automatische Sicherung im lokalen Browserspeicher versucht. Ob sie beim Öffnen einer lokalen HTML-Datei verfügbar ist, hängt vom Browser und seinen Einstellungen ab. Für eine unabhängige Sicherung die `.schmier`-Datei herunterladen.

Rechnungen werden von der Anwendung nicht an einen Server übertragen. Die gewählte Sprache verändert keine eingegebenen Texte, Beschriftungen oder Zeichnungen.

## Browserspeicherung und Zustimmung

Beim ersten Öffnen fragt die Anwendung, ob Dokument und Einstellungen (Sprache, Seitenansicht und Zoom) lokal im Browser gespeichert werden dürfen. Es werden keine Cookies gesetzt. Nur nach Zustimmung werden diese Daten und die Zustimmung selbst gespeichert.

Bei **„Nicht speichern“** bleibt alles nur im Arbeitsspeicher bis zum Schließen oder Neuladen der Seite. Vorhandene Browserdaten dieser Anwendung werden gelöscht. Auch die Ablehnung wird nicht gespeichert; deshalb erscheint die Frage beim nächsten Start erneut. Über den **Speicher-Button mit Schild im Kopf** lässt sich die Entscheidung jederzeit ändern. Manuell angeforderte `.schmier`- und PDF-Downloads sowie Drucken funktionieren weiterhin.

Die Speicherabfrage wird unabhängig von der Anwendungssprache in der bevorzugten unterstützten Browsersprache angezeigt. Sie enthält alle **24 EU-Amtssprachen**; für andere Sprachen wird Englisch verwendet. Die übrige Anwendung bleibt auf Deutsch, Englisch und Französisch verfügbar.

## Erste Tastenkürzel

| Eingabe | Funktion |
| --- | --- |
| Pfeiltasten | Ein Kästchen weitergehen |
| Enter | Nächste Zeile in der zuletzt per Navigation oder Klick gewählten Spalte |
| Enter am Nummernblock | `=` schreiben |
| Shift + Ziffer | Eine Hochzahl schreiben |
| Strg + Ziffer | Einen Index beziehungsweise Übertrag schreiben |
| Strg + Enter / Shift + Enter | Gleichzeichen über die untere / obere Kästchengrenze |
| Strg + Z | Rückgängig |
| Strg + Y | Wiederholen |
| Strg + S | Als `.schmier` herunterladen |
| F1 | Hilfe öffnen |
| + / - halten | Zehn Prozentpunkte hinein-/herauszoomen; beim Hineinzoomen wird das ausgewählte Kästchen zentriert |
| 1–4 halten | Stift wählen: Schwarz, Blau, Grün, Rot |
| 8 / 9 halten | Menü für öffnende / schließende Klammern |
| P halten | Griechisches Zeichenmenü, π vorausgewählt |
| Enter halten | Vergleichszeichen-Menü |
| Shift allein halten und loslassen | Hochstellen ein-/ausschalten |
| Strg allein halten und loslassen | Tiefstellen ein-/ausschalten |
| Links+Rechts gleichzeitig | Waagerechten Strich starten/bestätigen |
| Hoch+Runter gleichzeitig | Senkrechten Strich starten/bestätigen |
| R halten | Radierbereich starten; erneut halten bestätigt |
| C / X halten | Kopier-/Ausschneidebereich starten und bestätigen; am Ziel Enter oder erneut halten |
| PageUp / PageDown halten | Vorherige / nächste Seite |
| Einfügen halten | Papierauswahl: Karo vorausgewählt, alternativ Millimeterpapier |
| Entf halten | Aktuelle Seite nach Bestätigung löschen; letzte Seite bleibt |
| D halten | Einzel-/Doppelseite wechseln |
| E halten | Alle Seiten als PDF exportieren |
| Esc | Vorschau, Auswahl oder Menü abbrechen; Tutorial beenden |

**Halten** bedeutet etwa 0,6 Sekunden im aktiven Schreibkästchen, ohne Zusatztasten. Kurze Zahlen- und Buchstabeneingaben bleiben erhalten; kurzes Entf löscht Kästcheninhalt. Bei Strg/Shift wird erst beim Loslassen umgeschaltet, sofern keine andere Taste oder kein Mausklick hinzugekommen ist. In Namen, Such- und Beschriftungsfeldern gelten die Halte-Shortcuts nicht. Beim Tastaturstrich ändern die Pfeile Länge und Kästchenkante; Esc verwirft die Vorschau.

Die vollständige Beschreibung steht in der integrierten, durchsuchbaren Hilfe. Das Tutorial nutzt ein separates Übungsdokument und stellt anschließend das eigene Dokument wieder her.

## Tutorial

Das Tutorial verwendet ein separates Übungsdokument; das eigene Dokument bleibt erhalten. Aktiv ist anfangs Zeile 1, Spalte 1; das erste Navigationsziel ist Zeile 6, Spalte 5. Es stellt früh den verschiebbaren Bildschirm-Nummernblock vor, dessen Nutzung anschließend optional ist. Den Öffnungsschritt kannst du mit **N** überspringen; diese Funktion gilt nur im Tutorial.

Geübt werden `(12 + 8) · 3 = 60`, Unterstreichen, `2/4 = 1/2`, `2¹² = 4096`, `3 ≠ π`, Kopieren, Verschieben, Seitenansicht, Speichern und PDF-Export. Die Textmarker- und Radierer-Werkzeuge bleiben in der Anwendung verfügbar, sind aber nicht Teil des Tutorials.

Gold markierte Zielkästchen lassen sich anklicken oder mit Pfeiltasten, Tab und Pos1/Ende erreichen. Beim Erreichen geht es automatisch weiter, ohne Enter. Auch bei Kopier-/Verschiebeübungen wird am richtigen Ziel automatisch eingefügt; außerhalb des Tutorials bleibt die manuelle Bestätigung bestehen. Bei Stiften, Klammern, Hochstellen, Linien, Kopieren und Verschieben erklärt das Tutorial Maus- und Tastaturalternativen. Nicht passende Aktionen werden abgefangen und erklärt.

Im Speicherschritt funktioniert Strg+S, am Mac auch ⌘+S. E halten startet den PDF-Export, D halten wechselt die Ansicht in der entsprechenden Übung. Downloads enthalten nur die Übungsseiten. Esc beendet das Tutorial und stellt das eigene Dokument wieder her – auch auf dem Abschlussbildschirm.

## Entwicklung

Die Anwendung bleibt bewusst in einer einzigen HTML-Datei. HTML, CSS und JavaScript sind lesbar formatiert; Abschnittskommentare erklären Dokumentstruktur, Koordinaten, Zeichenwerkzeuge, Speicherung und Übersetzungen. Die eingebetteten Schriftdateien bleiben kompakte Base64-Daten. Es ist kein Build-Schritt erforderlich. Bei wichtigen Änderungen werden alle drei READMEs, die drei Changelogs und die betroffenen Hilfe- und Tutorialtexte gemeinsam aktualisiert.

Das Bildschirmraster wird als durchgehende SVG-Ebene gezeichnet, damit die Linien auch bei unterschiedlichen Zoomstufen in Firefox gleichmäßig dargestellt werden.

## Lizenz

Der Anwendungscode steht unter der **GNU General Public License, Version 3 (GPL-3.0-only)**. Der vollständige Lizenztext steht in [LICENSE](LICENSE).

Die eingebetteten Schriften behalten ihre eigenen Lizenzen: die angepasste [Caveat](https://github.com/googlefonts/caveat) unter der SIL Open Font License 1.1 sowie die verwendete [DejaVu-Schrift](https://dejavu-fonts.github.io/) unter ihren jeweiligen Lizenzbedingungen. Die Copyright- und Lizenzhinweise sind in den eingebetteten Schriftmetadaten erhalten.
