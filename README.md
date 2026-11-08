# Schmierpapier

**Deutsch** · [English](README.en.md) · [Français](README.fr.md)

Änderungen: [Changelog](CHANGELOG.md).

**Direkt ausprobieren:** [Live-Test im Browser](https://schmierpapier.org/schmierpapier.html) – ohne Download. Für die Offline-Nutzung die HTML-Datei wie unten beschrieben herunterladen.

**Direkter Download:** [HTML-Datei herunterladen](https://schmierpapier.org/download.php).

**Digitales Rechenpapier für Menschen, die im Mathematikunterricht kein normales Papier benutzen können.**

**Wichtig: Schmierpapier ist kein Taschenrechner und nimmt Schülerinnen und Schülern keine Rechenarbeit ab.** Es berechnet keine Ergebnisse und löst keine Aufgaben automatisch. Rechenwege, Zwischenschritte und Lösungen erarbeiten die Lernenden selbst – die Anwendung stellt dafür digitales Papier und Schreib- und Zeichenwerkzeuge bereit.

Schmierpapier bietet einen Platz zum Rechnen, Ausprobieren und Zeichnen direkt im Browser. Es richtet sich insbesondere an Schülerinnen und Schüler, für die das Schreiben oder Zeichnen auf Papier wegen motorischer Einschränkungen, unwillkürlicher Bewegungen oder anderer individueller Voraussetzungen nicht möglich oder schwer zugänglich ist.

Die Anwendung soll das eigenständige Arbeiten im Mathematikunterricht unterstützen: Rechnungen lassen sich mit Tastatur und Maus in Kästchen schreiben, Brüche übersichtlich anordnen und geometrische Konstruktionen mit digitalen Werkzeugen zeichnen. Viele Funktionen sind über Buttons erreichbar, sodass nicht für jede Eingabe eine Tastenkombination nötig ist.

Version **0.6.5**

Projektwebseite: [schmierpapier.org](https://schmierpapier.org). Das Logo im App-Header öffnet sie in einem neuen Tab.

## Neu in v0.6.5

- Optional dunkles Papier im Darkmode: in den Einstellungen aktivierbar, standardmäßig aus; PDF und Druck bleiben hell.

- G oder K lange halten schaltet das aktive Geodreieck beziehungsweise den Zirkel aus; kurzes Drücken bestätigt weiterhin den Schritt.

- Nach dem Setzen oder Bearbeiten eines Punkts schaltet sich das Punkt-Werkzeug automatisch aus. Für einen weiteren Punkt erneut aktivieren.

- Einheitliche Bestätigung per Enter oder Werkzeugtaste; Eingabedialoge warten auf das Loslassen gehaltener Tasten.

- Linientyp-Button und J halten schalten neue Stift-, Geodreieck- und Zirkelstriche sowie Zahlenstrahl-Hauptlinien zwischen durchgezogen und gestrichelt um. Gespeicherte Linien behalten ihren Typ; Bruchstriche und mathematische Zeichen bleiben durchgezogen.
- Konstruktionspunkte mit Beschriftung per Button oder H halten setzen. Maus und Tastatur rasten auf 5 mm beziehungsweise 1 mm bei Millimeterpapier ein; Enter fragt die Beschriftung ab. Erneutes Setzen bearbeitet den vorhandenen Punkt.
- Linientypen und Punkte funktionieren mit .schmier, Browserspeicherung bei Zustimmung, Bereichskopien, Radierer, Rückgängig, PDF und Druck. Hilfe und Tastenhinweise auf Deutsch, Englisch und Französisch aktualisiert. Ältere Dateien bleiben lesbar.
- v0.6.5 veröffentlicht. Webseite in allen sechs Textfassungen aktualisiert; Live-App und Download enthalten den aktuellen Stand.

## Neu in v0.6

- Bruch-Button und V halten: Zähler und Nenner abfragen und als normale Kästchenschrift mit passendem Bruchstrich einsetzen. Zentrierung im Raster, ein Rückgängig-Schritt und keine automatische Berechnung.
- Der Radierer löscht berührte Bilder als Ganzes. Das gilt auch für die mit R halten gewählte Radierfläche; eine teilweise Überlappung genügt. Rückgängig stellt gelöschte Bilder wieder her.
- Beim Zoomen und Verschieben bleibt die Originalauflösung erhalten. Erst Übernehmen schneidet unsichtbare Bildteile ab und skaliert den fertigen Ausschnitt auf die gewählte DPI-Auflösung.
- Darkmode folgt auf Wunsch System/Browser; Hell, Dunkel und System in den Einstellungen wählbar. Papier, PDF und Druck behalten ihre hellen Farben.
- Parallelzeichen ∥ im Menü Verschiedene Symbole.
- B halten öffnet Bild einfügen statt Neue Datei; diese bleibt per Button und Strg+N erreichbar. Kästchenbereich per Maus oder Pfeilen wählen, danach Rasterbild auswählen und mit Mausrad/+− sowie Ziehen/Pfeilen anpassen. Enter übernimmt, Esc verwirft. Doppelklick erlaubt erneutes Anpassen oder Löschen.
- Bildauflösung in den Einstellungen: 100–600 dpi, Standard 300. Zunächst proportional und flächendeckend eingepasst; anschließende Anpassungen dürfen Leerraum lassen. Eingebettete Ausschnitte bleiben in .schmier, Browsersicherung, Historie, vollständiger Bereichskopie, PDF und Druck erhalten.
- v0.6 veröffentlicht. Homepage in allen sechs Textfassungen aktualisiert; Live-App und Download verwenden denselben aktuellen Build.

## Neu in v0.5.5

- Werkzeugleiste in den Einstellungen oben, unten, links oder rechts anordnen. Oben bleibt der Standard.
- Seitlich wird die Breite an Fensterhöhe, Sprache und Browserzoom angepasst; bei Bedarf entstehen mehrere Spalten. Alle Buttons bleiben ohne Scrollen der Leiste sichtbar und in funktionalen Gruppen durch Linien getrennt.
- Papierbereich, automatische Zoomanpassung, Symbolmenüs, Tastenhinweise, Bildschirm-Nummernblock und Tutorial berücksichtigen die Position. PDF und Druck enthalten weiterhin nur die Seiten.
- Die Leistenposition gehört zu den Einstellungen: mit Zustimmung lokal gespeichert und in .schmier-Dateien enthalten. Ältere Einstellungen verwenden Oben.
- v0.5.5 veröffentlicht. Die Homepage fasst die Neuerungen der 0.5er-Reihe in allen sechs Textfassungen zusammen; Live-App und Download verwenden den aktuellen Build.

## Neu in v0.5

- Komma und Punkt stehen rechts unten am zugehörigen Kästchen und lassen die nächste Ziffer direkt daneben zu. Eigene Satzzeichen-Kästchen sind über Verschiedene Symbole verfügbar.
- Aufgabenbezeichnungen wie 1a) passen in zwei waagerechte Kästchen, wahlweise doppelhoch; längerer Text wird automatisch kleiner. A halten öffnet die Größenwahl.
- Die Einstellungen (Zahnrad oder F halten) erlauben 200–3000 ms Haltezeit für lange Tastendrücke und Handschrift oder eine eingebettete Konsolen-Schrift. Hilfe und Tutorial zeigen die eingestellte Dauer. Beide Schriften bleiben offline nutzbar, auch in PDF und Druck.
- Dateien und Browsersicherungen enthalten die speichernde App-Version sowie die Schrift-/Haltezeit-Einstellungen. Beim Öffnen älterer Stände erscheinen die neueren Versionsübersichten; alte Dateien ohne Versionsangabe bleiben lesbar. Browserspeicherung erfordert weiterhin Zustimmung.
- Das Geodreieck zeigt Skalenwerte an Strichanfang und -ende vergrößert an: per Tastatur beim Fahren am Rand, per Maus nur in Kantennähe. Es berechnet keine Strichlänge.
- v0.5 ist veröffentlicht und auf der Projektwebseite als Live-App und Download verfügbar.

## Neu in v0.4.4

- Tutorial um die Rechnung 2 1/2 + 1/2 = 3 ergänzt: ganze Zahlen, Plus und Gleichzeichen doppelhoch mit U oder Button; Zähler und Nenner normal, Bruchstriche wahlweise per Maus oder Tastatur. Navigation und Bildschirm-Nummernblock bleiben nutzbar.
- Der U-Schreibmodus vergrößert jetzt auch Rechen-, Vergleichs-, Prozent- und Promillezeichen. Das gilt für Tastatur, Nummernblock und Symbolbuttons; Strg/Shift+Enter für Bruch-Gleichzeichen bleibt erhalten.
- Im Menü Verschiedene Symbole (Z halten) stehen zusätzlich ‰ (Promille) und ± (Plusminus, Plus über Minus) zur Auswahl.
- Beim Schreiben eines großen Zeichens werden vorhandene normale Zeichen in seinen beiden Kästchen ersetzt. Normales Schreiben oder Leertaste in einem der belegten Kästchen ersetzt bzw. entfernt das große Zeichen als Ganzes. Rückgängig stellt den vorherigen Inhalt wieder her.
- Wurzel- und Integralmenüs haben wie die Klammern fünf Größenzeilen: beliebig nach oben, doppelhoch nach oben, normal (vorausgewählt), doppelhoch nach unten und beliebig nach unten. Q halten öffnet die Wurzeln, I halten die Integrale; die Menüpfeile sind gleichwertig. Links stehen Quadratwurzeln bzw. unbestimmte Integrale, rechts Wurzeln mit Exponent bzw. bestimmte Integrale. Pfeile wählen die Kachel, Enter bestätigt.
- Bei freier Höhe werden ein Wurzelexponent bzw. die untere und obere Integrationsgrenze zuerst abgefragt. Abbrechen verändert nichts. Danach bleibt das aktive Kästchen der Startpunkt: Hoch/Runter wählt die Zielzeile, Enter setzt das Zeichen, alternativ die Zielzeile anklicken. Die Spalte bleibt fest; Esc verwirft die rote gestrichelte Vorschau. Exponent und Grenzen werden mit angezeigt und an den endgültigen Enden befestigt. Griechische Namen in Integralgrenzen werden weiterhin ersetzt, etwa 2pi → 2π. Wurzeln enden oben rechts ohne Haken und lassen sich mit einer Linie fortsetzen. Speichern/Laden, Kopieren ganzer Zeichen, Rückgängig, PDF/Druck und Löschen aus jedem belegten Kästchen berücksichtigen die volle Höhe. Vorschauen werden nicht gespeichert oder exportiert.
- Der neue Button Doppelhohe Schrift oder U etwa 0,6 Sekunden halten schaltet einen dauerhaften Schreibmodus ein und aus. Während des Haltens füllt sich der Fortschrittsrahmen im Uhrzeigersinn; der aktive Button pulsiert, bei reduzierten Animationen bleibt er deutlich umrandet. Ein kurzer U-Tastendruck schreibt weiter den Buchstaben u. Zahlen und Buchstaben, auch griechische, werden ab dem aktuellen Kästchen zwei Kästchen nach unten hoch geschrieben, eine Spalte pro Zeichen. Danach geht es nach rechts; Enter und automatischer Zeilenumbruch gehen im aktiven Modus zwei Zeilen weiter. U erneut halten oder den Button anklicken beendet den Modus. So lässt sich zum Beispiel die große 1 eines gemischten Bruchs schreiben und der Bruch daneben anschließend normal ergänzen.
- Rechen- und Vergleichszeichen wie +, −, ·, :, /, =, ≠, <, >, ≤, ≥, ≈, ≡, ∝, ±, ∓, % und ‰ werden ebenfalls doppelhoch geschrieben; Satzzeichen bleiben normal hoch. Hoch-/Tiefstellen und doppelhohe Schrift sind als dauerhafte Modi gegenseitig ausschließend; einzelne Strg/Shift-Ziffern bleiben für kleine Anmerkungen verfügbar. Am unteren Seitenrand wird kein halbes Zeichen geschrieben: Wähle ein Kästchen weiter oben. Große Buchstaben/Zahlen lassen sich aus beiden Kästchen löschen, vollständig kopieren/ausschneiden, rückgängig machen und in .schmier, PDF und Druck erhalten. U ersetzt den früheren direkten Und-Shortcut; & bleibt im Menü Verschiedene Symbole (Z halten). Namen, Suchfelder und Beschriftungen behalten ihre normale Texteingabe. Das Tutorial setzt den Modus vorübergehend zurück und stellt ihn danach wieder her.
- Klammermenüs bieten jetzt fünf Größenzeilen: beliebig nach oben, doppelhoch nach oben, normal (vorausgewählt), doppelhoch nach unten und beliebig nach unten. Jede Zeile enthält runde, eckige, geschweifte und spitze Klammern. Öffnen per Menüpfeil oder 8/9 halten; Pfeiltasten wählen Form und Zeile, Enter bestätigt die Auswahl. Für die normale Tutorial-Rechnung weiterhin die normale runde Klammer in der Mitte wählen.
- Bei beliebiger Höhe bleibt das beim Öffnen der Höhenwahl aktive Kästchen der Startpunkt. Hoch/Runter verändert das Ende in ganzen Kästchen innerhalb der gewählten Richtung; die Höhe ist vom einzelnen Kästchen bis zum Seitenrand frei wählbar. Eine rote gestrichelte Klammer zeigt die Vorschau, Enter setzt sie endgültig. Alternativ die gewünschte Zielzeile auf derselben Seite anklicken; die Klammer bleibt in der Startspalte. Mausbewegungen über dem Papier zeigen die Zielhöhe vor dem Klick. Esc, ein Klick außerhalb des Papiers oder Verlassen des Fensters verwirft die Vorschau ohne Dokumentänderung. Danach geht die Schreibposition rechts neben das Startkästchen. Ein aktiver Hoch-/Tiefstellen-Modus verändert die gewählte Klammerhöhe nicht.
- Die gesamte Klammer gehört zu allen belegten Kästchen und lässt sich aus jedem davon mit Entf oder Rücktaste löschen. Rückgängig/Wiederholen und .schmier-Dateien erhalten die Höhe. Zum Kopieren oder Ausschneiden den vollständigen Klammerbereich auswählen; Teilbereiche enthalten die Klammer nicht. PDF und Druck übernehmen nur endgültige Klammern, keine Vorschauen. Ältere Dokumente mit doppelhohen Zeichen bleiben ladbar; ältere App-Versionen können frei gewählte Höhen nicht zuverlässig darstellen.

## Neu in v0.4.3

- Alle Halte-Tastenkürzel zeigen einen im Uhrzeigersinn gefüllten Fortschrittsrahmen am zugehörigen Button; kurzes Drücken bleibt unverändert.
- Bestimmte Integrale mit frei eingegebenen Grenzen, neue Menüs für Logik, Mengenlehre und verschiedene Symbole sowie ein sichtbarer Fortschrittsrahmen beim Halten von Shift/Strg.
- Thematische Quellen unter `src/` statt direkter Änderungen an der fertigen HTML-Datei.
- Ein lokaler Python-Build mit Watch- und Prüfmodus erzeugt weiterhin eine einzelne Offline-Datei; Sprachdateien, Schriften und Logos werden eingebettet.

## Neu in v0.4.2

- Tutorial an die aktuellen Klammermenüs angepasst: mittlere normale Vorauswahl, Größenzeilen und Pfeilnavigation werden erklärt. Hauptbutton, Menüpfeil und 8/9 halten sind gleichwertig erlaubt; falsche Formen, Größen oder Zusatztasten werden vor der Eingabe abgefangen und gezielt erklärt. Die optionale Tastenhilfe wird früh vorgestellt.

- Geteilte Buttons zeigen in der Tastenhilfe nur einen gemeinsamen Hinweis mittig über der Gruppe. Die Wurzelauswahl ist mit Q gekennzeichnet.

- 5/6/7 halten startet Textmarker-Bereiche in Pink/Neongelb/Neongrün; S halten startet Durchstreichen. Pfeile wählen, dieselbe Taste erneut halten bestätigt, Esc bricht ab. Dateikürzel Strg+N/O ergänzt, soweit der Browser sie weitergibt; B/O halten sind Alternativen für Neu/Öffnen. F11 für Vollbild und die neuen Kürzel in der Tastenhilfe ergänzt.

- Tastenhilfe vor dem Hilfebutton: Tastatur-Piktogramm oder T halten blendet dezente rote Shortcut-Hinweise über den Buttons ein/aus. Die Hinweise folgen dem Layout, erhalten den Fokus und bleiben aus Dateien, PDF und Druck ausgeschlossen. Auch in Tastatur-Zeichenmodi und im Tutorial verfügbar.

- G halten startet das Geodreieck per Tastatur: Position und Drehung bestätigen, markanten Stift am Rand führen, Strichanfang und -ende bestätigen. Links/Rechts fährt in 1-mm-Schritten, Hoch/Runter wechselt die Kante; rote Vorschau vor dem Zeichnen. Während der Zirkel-Radiuswahl schaltet G halten die Messhilfe ein/aus und beendet den Zirkel nicht. Mausbedienung bleibt erhalten.

- K halten startet den Zirkel per Tastatur am ausgewählten Kästchen. K oder Enter bestätigt nacheinander Mittelpunkt, Radius (Links/Rechts in 1 mm), Bogenanfang und Bogenende. Pfeile drehen den Zirkel; rote gestrichelte Vorschau vor dem Zeichnen, Esc bricht ab. Ein fertiger Bogen bleibt ein radierbarer Bleistiftstrich. Der Mausbutton behält den bisherigen Ablauf.

- Der Prozent-Shortcut folgt dem tatsächlich erkannten Buchstaben Z statt der physischen US-Tastenposition. Z halten funktioniert damit auch bei vertauschtem Y/Z; Y bleibt normale Texteingabe.

- I halten öffnet die Integral-Größenwahl (oben groß nach oben, mittig normal vorausgewählt, unten groß nach unten), auch über den neuen Menüpfeil erreichbar. U halten schreibt &, Z halten %. Kurze Buchstabeneingaben und Strg+Z bleiben erhalten.

- Geteilte Buttons sind ohne Zwischenraum und innere Eckrundungen verbunden. Der neue Pfeil neben √ öffnet dieselbe Wurzelauswahl wie Q halten; das Hauptzeichen fügt weiterhin direkt eine Quadratwurzel ein.

- Q-Menü um ⁿ√ erweitert: andere Wurzeln in drei Größen wählen und anschließend den Wurzelexponenten (2–9999, z. B. 3) selbst eingeben. Der Exponent steht links oben und bleibt bei Speichern, Kopieren, PDF und Druck erhalten.
- Große Wurzeln ohne Browserkonflikt: Q (Quadratwurzel) halten öffnet die Größenwahl; die normale Quadratwurzel links in der Mitte ist vorausgewählt. Darüber steht die große Variante nach oben, darunter die große nach unten. Beliebige Wurzeln stehen rechts daneben. Hoch/Runter wählt die Größe, Links/Rechts den Wurzeltyp; Enter bestätigt, Esc bricht ab. W halten bleibt die normale Wurzel; Shift+W halten bleibt groß nach oben. Strg+W ist wieder vollständig dem Browser überlassen.
- Klammermenüs bieten drei Größenzeilen: doppelhoch nach oben, normal (vorausgewählt), doppelhoch nach unten. Links/Rechts wählen die Form, Hoch/Runter die Größe, Enter bestätigt. Große Klammern sind damit auch bei aktivem Index-/Potenzmodus ohne Tastenkombination erreichbar.
- N halten wartet zunächst auf die erste Pfeiltaste für Orientierung und Richtung. Der Vorschaupfeil ist geschlossen und klar erkennbar. W halten fügt eine Wurzel ein; kurzes W bleibt Texteingabe.
- Zahlenstrahl per Tastatur: N halten startet die Pfeilvorschau; Pfeile ändern Länge/Kante, Links+Rechts bzw. Hoch+Runter wählen oder bestätigen die Richtung. Erneutes N halten bestätigt ebenfalls; Esc bricht ab. Beschriftung bleibt händisch.

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
- Unbestimmte und bestimmte Integrale in normaler oder doppelter Höhe. Das Menü mit I halten bietet rechts bestimmte Integrale; untere und obere Grenze werden nacheinander eingegeben (je 1–16 Zeichen ohne Leerzeichen). Grenzen bleiben in `.schmier`, Kopien, PDF und Druck erhalten. Es findet keine Berechnung statt.
- Griechische Namen werden in Integralgrenzen automatisch ersetzt: pi, omega, alpha, beta, phi, theta, psi, tau, lambda, rho, sigma, xi und zeta. Der erste Buchstabe bestimmt Groß-/Kleinschreibung, unabhängig von den restlichen Buchstaben: omega → ω, Omega → Ω, 2pi → 2π, -Pi/2 → -Π/2. Ganze Namen werden auch neben Zahlen und Rechenzeichen erkannt; andere Wörter bleiben unverändert. Die Grenze von 16 Zeichen gilt nach der Ersetzung.
- Symbolmenüs für Logik (L halten, Standard ∧), Mengenlehre (M halten, Standard ∈) und verschiedene Symbole (Z halten, Standard %, außerdem &, ∀, ∃, ∄). Hauptbutton schreibt den Standard; Pfeil öffnet die Auswahl, Pfeiltasten/Enter oder Klick wählen, Esc schließt. U halten schaltet jetzt doppelhohe Schrift; & bleibt im Symbolmenü.
- Griechische Buchstaben: Der π-Button schreibt Pi; sein Pfeil oder langes Halten von P im Kästchen öffnet das griechische Zeichenmenü. Pfeiltasten und Enter wählen, Esc schließt; kurzes P schreibt weiterhin p. Strg/Shift erzeugen Index/Potenz.
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
| I halten | Integralmenü: Hoch/Runter Größe, Links/Rechts unbestimmt/bestimmt; Grenzen nacheinander eingeben |
| U halten | Doppelhohe Schrift für Zahlen und Buchstaben ein-/ausschalten |
| L / M / Z halten | Logik / Mengenlehre / verschiedene Symbole auswählen |
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

**Halten** bedeutet etwa 0,6 Sekunden im aktiven Schreibkästchen, ohne Zusatztasten. Kurze Zahlen- und Buchstabeneingaben bleiben erhalten; kurzes Entf löscht Kästcheninhalt. Bei Strg/Shift wird erst beim Loslassen umgeschaltet, sofern keine andere Taste oder kein Mausklick hinzugekommen ist. In Namen, Such- und Beschriftungsfeldern gelten die Halte-Shortcuts nicht. Beim Tastaturstrich ändern die Pfeile Länge und Kästchenkante; Esc verwirft die Vorschau. Ein im Uhrzeigersinn gefüllter Rahmen am passenden Button zeigt die Haltezeit von Shift/Strg; ein vollständiger Rahmen bedeutet bereit. Kurzes Loslassen, weitere Taste, Klick oder Fokusverlust verwirft den Haltevorgang.

Die vollständige Beschreibung steht in der integrierten, durchsuchbaren Hilfe. Das Tutorial nutzt ein separates Übungsdokument und stellt anschließend das eigene Dokument wieder her.

## Tutorial

Das Tutorial verwendet ein separates Übungsdokument; das eigene Dokument bleibt erhalten. Aktiv ist anfangs Zeile 1, Spalte 1; das erste Navigationsziel ist Zeile 6, Spalte 5. Es stellt früh den verschiebbaren Bildschirm-Nummernblock vor, dessen Nutzung anschließend optional ist. Den Öffnungsschritt kannst du mit **N** überspringen; diese Funktion gilt nur im Tutorial.

Geübt werden `(12 + 8) · 3 = 60`, Unterstreichen, `2/4 = 1/2`, `2¹² = 4096`, `3 ≠ π`, Kopieren, Verschieben, Seitenansicht, Speichern und PDF-Export. Die Textmarker- und Radierer-Werkzeuge bleiben in der Anwendung verfügbar, sind aber nicht Teil des Tutorials.

Gold markierte Zielkästchen lassen sich anklicken oder mit Pfeiltasten, Tab und Pos1/Ende erreichen. Beim Erreichen geht es automatisch weiter, ohne Enter. Auch bei Kopier-/Verschiebeübungen wird am richtigen Ziel automatisch eingefügt; außerhalb des Tutorials bleibt die manuelle Bestätigung bestehen. Bei Stiften, Klammern, Hochstellen, Linien, Kopieren und Verschieben erklärt das Tutorial Maus- und Tastaturalternativen. Nicht passende Aktionen werden abgefangen und erklärt.

Im Speicherschritt funktioniert Strg+S, am Mac auch ⌘+S. E halten startet den PDF-Export, D halten wechselt die Ansicht in der entsprechenden Übung. Downloads enthalten nur die Übungsseiten. Esc beendet das Tutorial und stellt das eigene Dokument wieder her – auch auf dem Abschlussbildschirm.

## Entwicklung und Build

**Bearbeitet werden die Quellen unter `src/`, nicht die erzeugte `schmierpapier.html`.** Für die Benutzung genügt weiterhin die fertige HTML-Datei; nur die Entwicklung benötigt einen Build. Voraussetzung: **Python 3.10 oder neuer**, ohne zusätzliche Pakete, Node.js oder Internetzugriff.

Im Projekt-Hauptordner:

```sh
python3 build.py
python3 build.py --watch
python3 build.py --check
python3 -m unittest discover -s src/tests -v
```

- `python3 build.py` erzeugt die aktuelle `schmierpapier.html`.
- `--watch` baut nach dem Speichern geänderter Quellen automatisch neu. Mit Strg+C beenden; die fertige Datei im Browser neu laden.
- `--check` prüft ohne Schreiben, ob die Ausgabe zu den Quellen passt. Ein veralteter Build liefert einen Fehlerstatus.
- Der letzte Befehl prüft reproduzierbaren Build, fehlende Quellen/Übersetzungen, eingebettete Assets und automatischen Neuaufbau.

Unter Windows gegebenenfalls `py -3` statt `python3` verwenden. Eine alternative Ausgabe ist mit `python3 build.py --output /tmp/schmierpapier-test.html` möglich.

| Quelle | Zuständigkeit |
|---|---|
| `src/index.html`, `src/styles.css` | HTML-Grundgerüst und Darstellung |
| `src/js/*.js` | Thematische Feature-Dateien; alle Klammern gemeinsam in `brackets.js` |
| `src/js/file-io.js`, `src/js/export.js` | Lesen/Speichern bzw. PDF/Druck |
| `src/js/basics.js`, `src/js/keyboard.js`, `src/js/regions.js` | Gemeinsame Grundlagen, Tastensteuerung und Bereichsauswahl |
| `src/i18n/de.js`, `en.js`, `fr.js` | Je Sprache Oberfläche, Hilfe, Tutorial und Meldungen |
| `src/i18n/consent-eu.js` | Zusätzliche EU-Sprachen für den Speicherhinweis |
| `src/assets/` | Schriften und Logos, die beim Build eingebettet werden |
| `src/version.txt`, `src/build.json` | Entwicklungsversion, Quellen und Zusammenbaureihenfolge |

Einzelne Features können mehrere `// @part`-Abschnitte enthalten. Das Manifest setzt sie in der bewährten Reihenfolge zu einem klassischen Script mit gemeinsamem Gültigkeitsbereich zusammen. Neue JS-Dateien müssen dort aufgeführt werden. Die Sprachdateien enthalten dieselben UI-Schlüssel; fehlende Übersetzungen oder Hilfeartikel meldet der Build. Der Build ersetzt die Ausgabe nur nach erfolgreicher Prüfung; bei einem Fehler bleibt die letzte gültige HTML-Datei erhalten. `--check` ersetzt keine Funktionstests im Browser.

Details zu Abschnitten, Sprachdaten und Asset-Platzhaltern: [Quellen und Zusammenbau](src/README.md). `src/index.html` enthält Platzhalter und ist keine lauffähige Vorschau. Die fertige `schmierpapier.html` enthält CSS, JavaScript, Schriften und Logos vollständig und bleibt offline nutzbar. **Build und Watch-Modus laden nichts hoch.** Der Homepage-Ordner bleibt davon unabhängig.

Bei wichtigen Änderungen werden alle drei READMEs, Changelogs und betroffenen Hilfe-/Tutorialtexte gemeinsam gepflegt. Die unabhängigen Schriftlizenzen bleiben in den Metadaten und Hinweisen erhalten. Das Bildschirmraster verwendet weiterhin eine durchgehende SVG-Ebene für gleichmäßige Firefox-Darstellung.

## Lizenz

Der Anwendungscode steht unter der **GNU General Public License, Version 3 (GPL-3.0-only)**. Der vollständige Lizenztext steht in [LICENSE](LICENSE).

Die eingebetteten Schriften behalten ihre eigenen Lizenzen: die angepasste [Caveat](https://github.com/googlefonts/caveat) unter der SIL Open Font License 1.1 sowie die verwendete [DejaVu-Schrift](https://dejavu-fonts.github.io/) unter ihren jeweiligen Lizenzbedingungen. Die Copyright- und Lizenzhinweise sind in den eingebetteten Schriftmetadaten erhalten.

## Optional: Linux-Mint-Theme

Im separaten Ordner [linux-mint-theme](linux-mint-theme/README.md) liegt **Schmierpapier-Dark** für Linux Mint Cinnamon mit derselben dunklen Farbpalette. Die Anleitung erklärt Installation und Auswahl; das Installationsskript verändert das aktive Theme nicht.

Für GNOME Terminal liegt außerdem ein Skript zum dauerhaften Übernehmen der Palette mit Sicherung und Wiederherstellung bei.
