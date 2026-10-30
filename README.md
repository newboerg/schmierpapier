# Schmierpapier

**Deutsch** · [English](README.en.md) · [Français](README.fr.md)

**Direkt ausprobieren:** [Live-Test im Browser](https://htmlpreview.github.io/?https://github.com/newboerg/schmierpapier/blob/main/schmierpapier.html) – ohne Download. Für die Offline-Nutzung die HTML-Datei wie unten beschrieben herunterladen.

**Digitales Rechenpapier für Menschen, die im Mathematikunterricht kein normales Papier benutzen können.**

Schmierpapier bietet einen Platz zum Rechnen, Ausprobieren und Zeichnen direkt im Browser. Es richtet sich insbesondere an Schülerinnen und Schüler, für die das Schreiben oder Zeichnen auf Papier wegen motorischer Einschränkungen, unwillkürlicher Bewegungen oder anderer individueller Voraussetzungen nicht möglich oder schwer zugänglich ist.

Die Anwendung soll das eigenständige Arbeiten im Mathematikunterricht unterstützen: Rechnungen lassen sich mit Tastatur und Maus in Kästchen schreiben, Brüche übersichtlich anordnen und geometrische Konstruktionen mit digitalen Werkzeugen zeichnen. Viele Funktionen sind über Buttons erreichbar, sodass nicht für jede Eingabe eine Tastenkombination nötig ist.

Von **Hr. Neuberg aus der Tech-IT** · Version **0.3**

## Starten

1. [schmierpapier.html](schmierpapier.html) herunterladen. Auf GitHub die Datei öffnen und **„Download raw file“** auswählen.
2. Die heruntergeladene HTML-Datei in einem aktuellen Browser öffnen, zum Beispiel per Doppelklick.
3. Ein Kästchen anklicken und losschreiben. Die integrierte **Hilfe** erklärt alle Funktionen und Tastenkürzel. Das **Tutorial** führt mit praktischen Aufgaben durch die wichtigsten Werkzeuge.

Eine Installation, ein Benutzerkonto oder ein Server sind nicht erforderlich. Die Anwendung besteht aus einer einzigen HTML-Datei. JavaScript, Schriften, Übersetzungen, Hilfe und Tutorial sind eingebettet; die Anwendung funktioniert vollständig offline.

## Was Schmierpapier kann

### Rechnen in Kästchen

- Kariertes DIN-A4-Papier mit 5-mm-Kästchen und Randlinien.
- Ein normales Zeichen pro Kästchen; Navigation mit Pfeiltasten oder Mausklick.
- Zahlen über die obere Zahlenreihe oder den Nummernblock, Buchstaben über die Tastatur.
- Eingebettete Handschrift und vier Stiftfarben: Schwarz, Blau, Grün und Rot.
- Hochzahlen, mehrstellige Exponenten, Indizes und Überträge, auch über dauerhafte Schreibmodi.
- Runde, eckige und geschweifte Klammern, auch über zwei Kästchen Höhe.
- Besondere Gleichzeichen zwischen zwei übereinanderliegenden Kästchen für Bruchrechnungen.
- Buttons für Integral, griechische Buchstaben, `&` und `%`.
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
- **Zirkel:** Mittelpunkt setzen, einen freien Radius wählen und mit gedrückter rechter Maustaste Kreise oder Kreisbögen zeichnen. Ein zusammenhängend gezeichneter Bogen lässt sich als Ganzes radieren.
- **Zahlenstrahlen und Koordinatenachsen:** waagerecht oder senkrecht mit Pfeil und Teilstrichen zeichnen. Bei rechtwinklig gekreuzten Zahlenstrahlen richtet sich die Teilung am gemeinsamen Nullpunkt aus. Beschriftungen werden von Hand eingegeben; Zahlen werden nicht automatisch eingesetzt. Nach zwei gezeichneten Strahlen kehrt die Anwendung zum vorherigen Werkzeug zurück.

### Seiten und Ansicht

- Mehrere Seiten in einem Dokument, wahlweise einzeln oder als Doppelseite.
- Neue Seiten direkt als Karopapier hinzufügen; über den kleinen Pfeil daneben Millimeterpapier wählen.
- Die Papierart wird beim Erstellen einer Seite festgelegt. Beide Papierarten können im selben Dokument vorkommen.
- Auf Millimeterpapier rasten die entsprechenden Zeichenwerkzeuge bei 1 mm ein. Die Schreibkästchen bleiben 5 mm groß.
- Zoom, automatische Anpassung an die Fensterbreite und Vollbild.
- Oberfläche, Tooltips, Hilfe und Tutorial auf **Deutsch, Englisch und Französisch**. Beim ersten Start wird nach Möglichkeit die Browsersprache verwendet; eine eigene Auswahl wird im Browser gemerkt.

## Speichern und Weitergeben

- **`.schmier speichern`** lädt eine bearbeitbare Datei mit allen Seiten und Inhalten herunter. Über **„Datei laden“** lässt sie sich später wieder öffnen.
- **PDF exportieren** gibt alle vorhandenen Seiten als DIN-A4-Dokument aus. Die PDF-Seiten sind Bilder; der Text ist darin nicht als normaler PDF-Text auswählbar.
- **Drucken** öffnet den Druckdialog des Browsers. Für maßstabsgetreue Zeichnungen A4 und tatsächliche Größe beziehungsweise 100 % wählen.
- Eine automatische Sicherung im lokalen Browserspeicher wird versucht. Ob sie beim Öffnen einer lokalen HTML-Datei verfügbar ist, hängt vom Browser und seinen Einstellungen ab. Für eine unabhängige Sicherung die `.schmier`-Datei herunterladen.

Rechnungen werden von der Anwendung nicht an einen Server übertragen. Die gewählte Sprache verändert keine eingegebenen Texte, Beschriftungen oder Zeichnungen.

## Erste Tastenkürzel

| Eingabe | Funktion |
| --- | --- |
| Pfeiltasten | Ein Kästchen weitergehen |
| Enter | Zum Anfang der nächsten Zeile |
| Enter am Nummernblock | `=` schreiben |
| Shift + Ziffer | Eine Hochzahl schreiben |
| Strg + Ziffer | Einen Index beziehungsweise Übertrag schreiben |
| Strg + Enter / Shift + Enter | Gleichzeichen über die untere / obere Kästchengrenze |
| Strg + Z | Rückgängig |
| Strg + Y | Wiederholen |
| Strg + S | Als `.schmier` herunterladen |
| F1 | Hilfe öffnen |

Die vollständige Beschreibung steht in der integrierten, durchsuchbaren Hilfe. Das Tutorial nutzt ein separates Übungsdokument und stellt anschließend das eigene Dokument wieder her.

## Entwicklung

Die Anwendung bleibt bewusst in einer einzigen HTML-Datei. HTML, CSS und JavaScript sind lesbar formatiert; Abschnittskommentare erklären Dokumentstruktur, Koordinaten, Zeichenwerkzeuge, Speicherung und Übersetzungen. Die eingebetteten Schriftdateien bleiben kompakte Base64-Daten. Es ist kein Build-Schritt erforderlich. Bei wichtigen Änderungen werden diese README, die englische und französische Fassung sowie die betroffenen Hilfetexte gemeinsam aktualisiert.

## Lizenz

Der Anwendungscode steht unter der **GNU General Public License, Version 3 (GPL-3.0-only)**. Der vollständige Lizenztext steht in [LICENSE](LICENSE).

Die eingebetteten Schriften behalten ihre eigenen Lizenzen: die angepasste [Caveat](https://github.com/googlefonts/caveat) unter der SIL Open Font License 1.1 sowie die verwendete [DejaVu-Schrift](https://dejavu-fonts.github.io/) unter ihren jeweiligen Lizenzbedingungen. Die Copyright- und Lizenzhinweise sind in den eingebetteten Schriftmetadaten erhalten.
