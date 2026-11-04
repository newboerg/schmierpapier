# Quellen und Zusammenbau

Die fertige Datei ist `../schmierpapier.html`. Sie wird aus diesen Quellen erzeugt und nicht direkt bearbeitet. Alle App-Teilquellen liegen unter `src/`; `../build.py` ist das einzige benötigte Build-Werkzeug. Es verwendet nur die Python-Standardbibliothek (Python 3.10 oder neuer).

```sh
python3 build.py          # Einmalig erzeugen (im Projekt-Hauptordner)
python3 build.py --watch  # Nach jedem Speichern einer Quelle automatisch neu erzeugen
python3 build.py --check  # Prüfen, ob die erzeugte Datei aktuell ist; nichts schreiben
python3 -m unittest discover -s src/tests -v
```

Unter Windows gegebenenfalls `py -3` statt `python3` verwenden. `--watch` läuft, bis du Strg+C drückst. Die fertige Datei im Browser neu laden, um Änderungen zu sehen. `src/index.html` enthält Build-Platzhalter und ist keine ausführbare Vorschau.

| Quelle | Inhalt |
|---|---|
| `index.html` | Grundgerüst und Buttons, mit deutschen Fallback-Texten |
| `styles.css` | Layout, Papier und Werkzeugdarstellung |
| `version.txt` | Aktuelle Entwicklungsversion |
| `js/basics.js`, `js/editor.js`, `js/rendering.js` | Gemeinsamer Zustand, Kästchen, Schreiben und Darstellung |
| `js/history.js`, `js/undo.js`, `js/redo.js` | Gemeinsame Historie und ihre Buttons |
| `js/settings.js`, `js/decimal-marks.js`, `js/task-labels.js`, `js/release-notes.js` | Einstellungen, Satzzeichenebene, zweispaltige Aufgabenbezeichnungen und Offline-Versionsübersichten |
| `js/toolbar-layout.js` | Andocken und gruppiertes Packen der Leiste, sichtbare Arbeitsfläche und Menüpositionierung |
| `js/hold-progress.js` | Gemeinsamer Fortschrittsrahmen und Buttonzuordnung der Halte-Tasten |
| `js/keyboard.js` | Halte-Tasten, Tastenkombinationen und Weiterleitung an Features |
| `js/regions.js`, `js/geometry.js` | Gemeinsame Bereichsauswahl und Geometriehilfen |
| `js/file-io.js` | Lesen, Speichern, Dokumentprüfung und lokale Sicherung |
| `js/export.js` | PDF und Druck |
| `js/compass.js`, `js/set-square.js`, `js/number-line.js` | Geometriewerkzeuge |
| `js/brackets.js` | Klammerformen und gemeinsame freie Höhenwahl für Klammern, Wurzeln und Integrale |
| `js/large-text.js` | Einrastender U-Modus, doppelhohe Buchstaben/Zahlen und ihre Darstellung |
| `js/integral.js` | Unbestimmte und bestimmte Integrale, Eingabe und Zuordnung der Grenzen |
| `js/symbol-menus.js`, `js/logic.js`, `js/sets.js`, `js/percent.js` | Gemeinsame Symbolmenüs und deren Logik-, Mengen- und verschiedene Zeichen |
| Übrige `js/*.js` | Einzelne Features wie Wurzeln, Integral, Marker, Radierer, Durchstreichen, Ansichten, Seiten, Hilfe und Tutorial |
| `i18n/de.js`, `i18n/en.js`, `i18n/fr.js` | Je Sprache UI-Texte, Hilfe, Tutorial-Übersetzungen, Meldungsformate und Speicherhinweise |
| `i18n/consent-eu.js` | Zusätzliche EU-Sprachen nur für den Speicherhinweis |
| `assets/fonts/` | Eingebettete Schriften mit unveränderten Lizenz-Metadaten |
| `assets/logos/` | Eingebettete SVG-Logos |
| `build.json` | Verwendete Dateien, Assets und genaue Zusammenbaureihenfolge |
| `tests/test_build.py` | Tests für Build, Übersetzungsprüfung, Assets und Watch-Modus |

## JavaScript-Reihenfolge

Dies ist bewusst kein neues ES-Modulsystem. Der Build setzt die Dateien zu **einem klassischen Script mit gemeinsamem Gültigkeitsbereich** zusammen. Das erhält die bisherige Funktionssichtbarkeit und die Reihenfolge der Ereignisbehandlung, die etwa für Tutorial und Tastaturwerkzeuge wichtig ist.

Einige Feature-Dateien haben mehrere Abschnitte, markiert mit `// @part part-01` usw. `build.json` legt fest, an welcher Stelle jeder Abschnitt im fertigen Script steht. Ein Abschnitt wird genau einmal eingebunden. Vorhandene Abschnitte beim Bearbeiten nicht umbenennen oder löschen, ohne das Manifest anzupassen. Innerhalb eines passenden Abschnitts lassen sich Funktionen normal ändern und ergänzen. Für eine neue JS-Datei einen Abschnitt anlegen und in `build.json` aufnehmen; unaufgeführte JS-Dateien meldet der Build als Fehler.

Deutschsprachige Texte dienen weiterhin auch als stabile Übersetzungsschlüssel in HTML und Logik. Die eigentlichen Sprachdaten liegen in den drei Sprachdateien. `helpInitial` und `helpAdditions` bewahren die bestehende Reihenfolge der Hilfeartikel; neue Artikel in allen drei Sprachdateien unter `helpAdditions` ergänzen, sie werden automatisch übernommen. `dynamicPatterns` übersetzt zusammengesetzte Meldungen. Neue UI-Schlüssel müssen in allen drei Sprachdateien vorkommen; die Gesamtzahl der Hilfeartikel muss übereinstimmen.

## Assets und Ausgabe

`{{styles}}` und `{{scripts}}` im HTML-Grundgerüst werden durch CSS und JavaScript ersetzt. `{{version}}` stammt aus `version.txt`. Asset-Platzhalter wie `{{asset:assets/logos/wordmark.svg}}` werden anhand von `build.json` als Base64-Daten-URLs eingebettet. Daher benötigt die fertige HTML-Datei weiterhin keine zusätzlichen Dateien und kein Internet.

Der Build schreibt reproduzierbar und ersetzt die Ausgabe erst nach erfolgreicher Prüfung. Bei fehlenden Quellen, nicht aufgeführten Abschnitten oder unvollständigen Sprachdaten bleibt die letzte gültige HTML-Datei erhalten. `--check` ist eine Quellen-/Ausgabeprüfung, kein Ersatz für Funktionstests im Browser. Eine alternative Ausgabe ist mit `python3 build.py --output /tmp/schmierpapier-test.html` möglich.

Die Lizenzen und Herkunftshinweise der Caveat-/DejaVu-Schriften bleiben in HTML und Schrift-Metadaten erhalten. Schriftdateien nicht ohne ihre Hinweise ersetzen.

**Kein Upload:** Build und Watch-Modus arbeiten ausschließlich lokal. Sie laden keine Pakete und übertragen keine Dateien. Zur Veröffentlichung wird die erzeugte `schmierpapier.html` benötigt, nicht der `src`-Ordner. Die bestehende Homepage ist eine separate Quelle in `../homepage/`.

Neue Release-Übersichten in `js/release-notes.js` pflegen, einschließlich aller UI-Übersetzungen. `savedWith` ist die speichernde App-Version; `version: 1` bleibt die Dateiformat-Version. `settings` enthält Haltezeit und Schrift; `decimalMarks` und `taskLabels` sind seitenparallele Kästchen-Maps. Neue Persistenzschlüssel immer in der Widerrufsliste von `storage-consent.js` führen.

`settings.toolbarPosition` akzeptiert `top`, `bottom`, `left`, `right` (Standard: `top`). Die seitliche Packung misst die echten übersetzten Gruppen bei mehreren Breiten und wählt die schmalste passende Anordnung. Die CSS-Variablen `--toolbar-top/bottom/left/right` reservieren Platz; `workspaceViewport()` beschreibt die unverdeckte Fläche. Neue Button-Gruppen im Header als `.toolbar-group` mit übersetztem `aria-label` ergänzen. `positionToolbarMenu()` setzt Menüs zur Arbeitsfläche hin. Layoutbeobachter dürfen durch unveränderte Zoom-Beschriftungen keine weiteren Layouts auslösen.
