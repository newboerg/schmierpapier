# Changelog

**Deutsch** · [English](CHANGELOG.en.md) · [Français](CHANGELOG.fr.md)

## v0.4.2

- Potenzen beginnen etwas weiter rechts und wachsen bei längeren Exponenten über den Kästchenrand hinaus nach rechts. Die Zuordnung zum ursprünglichen Kästchen bleibt erhalten; PDF und Druck folgen derselben Ausrichtung.

- Neues Logo mit Schriftzug in App und Homepage sowie passende Favicons eingebunden. Die App enthält die Grafik direkt und bleibt eine einzelne, offline nutzbare HTML-Datei.

- Tutorial an die aktuellen Klammermenüs angepasst: mittlere normale Vorauswahl, Größenzeilen und Pfeilnavigation werden erklärt. Hauptbutton, Menüpfeil und 8/9 halten sind gleichwertig erlaubt; falsche Formen, Größen oder Zusatztasten werden vor der Eingabe abgefangen und gezielt erklärt. Die optionale Tastenhilfe wird früh vorgestellt.

- Geteilte Buttons zeigen in der Tastenhilfe nur einen gemeinsamen Hinweis mittig über der Gruppe. Die Wurzelauswahl ist mit Q gekennzeichnet.

- 5/6/7 halten startet Textmarker-Bereiche in Pink/Neongelb/Neongrün; S halten startet Durchstreichen. Pfeile wählen, dieselbe Taste erneut halten bestätigt, Esc bricht ab. Dateikürzel Strg+N/O ergänzt, soweit der Browser sie weitergibt; B/O halten sind Alternativen für Neu/Öffnen. F11 für Vollbild und die neuen Kürzel in der Tastenhilfe ergänzt.

- Tastenhilfe: Der Tastaturbutton direkt vor „Hilfe“ oder T halten blendet dezente rote Tastenhinweise über den Buttons ein und aus. Die Anzeige folgt dem Layout, erhält den Fokus und funktioniert auch in Tastatur-Zeichenmodi und im Tutorial. Dateien, PDF und Druck enthalten keine Hinweise.
- Geodreieck per Tastatur: G halten startet die Bedienung. Position und Drehung bestätigen, den gut sichtbaren Stift am Rand führen und Strichanfang/-ende bestätigen. Links/Rechts bewegt ihn in 1-mm-Schritten, Hoch/Runter wechselt die Kante. Vor dem Zeichnen erscheint eine rote Vorschau. Während der Radiuswahl des Zirkels schaltet G halten stattdessen die Messhilfe ein und aus, ohne den Zirkel zu beenden. Die Mausbedienung bleibt erhalten.
- Zirkel per Tastatur: K halten startet am ausgewählten Kästchen. K oder Enter bestätigt nacheinander Mittelpunkt, Radius, Bogenanfang und Bogenende. Links/Rechts verändert den Radius in 1-mm-Schritten; Pfeile drehen den Zirkel. Der Bogen erscheint zunächst rot gestrichelt und wird erst beim Bestätigen als zusammenhängender Bleistiftstrich gezeichnet. Esc bricht ab. Fertige Bögen lassen sich als Ganzes radieren. Der Mausbutton behält seinen bisherigen Ablauf.
- Prozent-Shortcut für unterschiedliche Tastaturbelegungen korrigiert: Maßgeblich ist der erkannte Buchstabe Z statt der physischen US-Tastenposition. Z halten schreibt auch bei vertauschtem Y/Z ein Prozentzeichen; Y bleibt normale Texteingabe.
- Integral und weitere Zeichen per Tastatur: I halten oder der neue Menüpfeil öffnet die Integral-Größenwahl. Oben steht die große Variante nach oben, mittig die vorausgewählte normale Form, unten die große Variante nach unten. U halten schreibt &, Z halten %. Kurze Buchstabeneingaben und Strg+Z bleiben erhalten.
- Geteilte Buttons schließen ohne Zwischenraum und ohne innere Eckrundungen aneinander an. Der neue Pfeil neben √ öffnet dieselbe Wurzelauswahl wie Q halten; der Hauptbutton fügt weiterhin direkt eine Quadratwurzel ein.
- Beliebige Wurzeln: Im Q-Menü eine ⁿ√-Variante in der gewünschten Größe wählen und im zweiten Schritt den Wurzelexponenten selbst eingeben (2–9999, beispielsweise 3 für die dritte Wurzel). Der Exponent steht klein links oben und bleibt bei Speichern, Kopieren, PDF und Druck erhalten.
- Wurzelauswahl ohne Browserkonflikt: Q halten öffnet das Menü mit drei Zeilen und zwei Spalten. Links stehen Quadratwurzeln, rechts beliebige Wurzeln; oben jeweils groß nach oben, mittig normal, unten groß nach unten. Die normale Quadratwurzel links in der Mitte ist vorausgewählt. Hoch/Runter wählt die Größe, Links/Rechts den Wurzeltyp; Enter bestätigt, Esc bricht ab. W halten fügt weiterhin eine normale Wurzel ein, Shift+W halten eine große nach oben. Strg+W bleibt vollständig dem Browser überlassen.
- Klammerauswahl: Erste Zeile doppelhoch nach oben, mittlere Zeile normal, dritte Zeile doppelhoch nach unten. Die normale runde Klammer ist vorausgewählt. Links/Rechts wählt die Form, Hoch/Runter die Größe, Enter bestätigt. Große Klammern sind auch bei aktivem Index-/Potenzmodus ohne Tastenkombination erreichbar.
- Richtung und Vorschaupfeil des Zahlenstrahls korrigiert: Nach N halten legt erst die erste Pfeiltaste Orientierung und Pfeilrichtung fest. Der Vorschaupfeil hat eine klare, geschlossene Spitze. W halten fügt eine Wurzel ein; kurzes W bleibt Texteingabe.
- Zahlenstrahl per Tastatur: N halten startet die Auswahl mit roter Pfeilvorschau nach der Richtungswahl. Pfeile und Richtungskombinationen steuern und bestätigen den Strahl; erneutes N halten bestätigt ebenfalls. Händische Beschriftung, gemeinsame Nullpunkte bei kreuzenden Achsen und die Rückkehr zum vorherigen Werkzeug nach zwei Strahlen bleiben erhalten.

## v0.4

- Wurzelbutton direkt nach den Klammern: Die Kontur endet oben rechts exakt am Raster und lässt sich mit einem Stiftstrich verlängern.
- Gleichzeichen mit Vergleichszeichen-Menü (=, ≠, <, >, ≤, ≥, ≈, ≡, ∝). Langes Enter öffnet das Menü; kurze Eingaben behalten ihre Funktion.
- Wurzeln und Vergleichszeichen unterstützen Strg/Shift für doppelhohe Formen, Löschen aus beiden Kästchen, Speichern, Kopieren, PDF und Druck.
- Klammern als zwei Hauptbuttons ( / ) mit Pfeilmenüs für runde, eckige, geschweifte und spitze Klammern. Langes Halten von 8/9 öffnet die Menüs für öffnende/schließende Klammern. Obere Zahlenreihe und Nummernblock funktionieren; kurze Zifferneingabe sowie Strg/Shift für Index/Potenz bleiben erhalten.
- Griechische Zeichen als π-Hauptbutton mit Kachelmenü wie beim Gleichzeichen. Langes P öffnet die Auswahl; kurzes P bleibt Texteingabe. Strg/Shift sowie Hoch-/Tiefstellen-Modi bleiben erhalten.
- Tastaturstriche mit roter gestrichelter Vorschau: Links+Rechts für waagerecht, Hoch+Runter für senkrecht. Pfeile ändern Länge und Kante; erneute Kombination bestätigt, Esc bricht ab. Das aktuelle Kästchen bleibt in jeder Richtung vollständig enthalten. Waagerechte Striche starten unten.
- Der Trefferbereich an Rasterecken wird relativ zur Kästchengröße berechnet und wächst mit Blatt- und Browserzoom.
- Normales Enter springt in der nächsten Zeile zur zuletzt durch Navigation oder Klick gewählten Spalte. Automatisches Weiterrücken beim Schreiben verändert diese Zielspalte nicht.
- Langes Halten von 1–4 im Schreibkästchen wählt Schwarz, Blau, Grün oder Rot. Kurze Zifferneingabe und Strg/Shift bleiben erhalten; obere Zahlenreihe und Nummernblock werden unterstützt.
- Shift/Strg allein halten und loslassen schaltet Hoch-/Tiefstellen ein oder aus. Kombinationen bleiben unverändert; die Bestätigung erfolgt erst beim Loslassen.
- Strg/Shift allein drücken hebt den zugehörigen Button sofort gelb hervor; nach der Haltezeit verstärkt sich die Umrandung. Loslassen, Tastenkombination, Klick oder Fokusverlust entfernt die Vorschau. Aktives Hoch-/Tiefstellen pulsiert; bei reduzierten Animationen bleibt eine feste Umrandung.
- R halten startet die Bereichsauswahl zum Radieren von Textmarkern und Linien. Pfeile wählen, erneutes Halten bestätigt; Schrift bleibt erhalten.
- C/X halten markiert Kopier-/Ausschneidebereiche. Erneutes Halten bestätigt die Quelle, Pfeile wählen das Ziel, Enter oder weiteres Halten fügt ein. Esc bricht ab.
- PageUp/PageDown halten blättert zurück/vor. Einfügen halten öffnet die Papierauswahl mit Karo als Vorgabe; Entf halten löscht eine Seite nach Bestätigung.
- E halten exportiert PDF, D halten wechselt Einzel-/Doppelseite. Kurze e/d-Eingaben bleiben erhalten.
- Tutorial: Maus und Tastatur sind Alternativen für Linien, Stiftwahl, Hochstellen, Klammern, Kopieren und Verschieben. Neue Übung „3 ≠ π“ erklärt die Zeichenmenüs einschließlich langem Enter/P. Falsche Eingaben werden abgefangen und erklärt.
- Tutorial vereinfacht: Textmarker- und Radierübungen entfernt. Zielkästchen sind per Tastatur erreichbar; beim Ankommen geht es ohne Enter weiter. Strg/⌘+S ist beim Speichern erlaubt; E und D funktionieren in den passenden Übungen. Esc beendet auch den Abschlussbildschirm mit fokussiertem Abschlussbutton.
- Fußzeile „Von Benni ♥ Kirstin“ mit & im Herz.
- Hilfe, Tutorial und README in Deutsch, Englisch und Französisch aktualisiert. Der Changelog ist ebenfalls in allen drei Sprachen verfügbar.
- Im Tutorial lässt sich das Öffnen des Bildschirm-Nummernblocks mit N überspringen; außerhalb des Tutorials bleibt N unverändert.
- Das Tutorial startet mit Kästchen 1,1 aktiv; die erste Übung navigiert zum bisherigen Rechnungsstart in Zeile 6, Spalte 5.
- Zielkästchen-Schritte gehen bei Klick oder Tastaturnavigation automatisch weiter. In Tutorial-Kopier-/Verschiebeübungen bestätigt das Erreichen des Zielkästchens auch das Einfügen; außerhalb bleibt die Bestätigung unverändert.
- Hineinzoomen richtet den sichtbaren Bereich auf das ausgewählte Kästchen aus. + / - halten zoomt um zehn Prozentpunkte hinein/heraus; kurze Tastendrücke bleiben Rechenzeichen.
- README und Homepage stellen deutlich klar: Schmierpapier ist kein Taschenrechner und nimmt Schülerinnen und Schülern keine Rechenarbeit ab.
