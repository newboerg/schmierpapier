# Schmierpapier-Dark für Linux Mint

Ein dunkles, grün getöntes Theme mit den Farben des Schmierpapier-Darkmodes.
Gedacht für **Linux Mint mit Cinnamon**. Enthalten sind GTK 3, klassisches GTK 4,
Cinnamon, Fensterrahmen sowie die Legacy-Komponenten der Mint-Y-Grundlage.

Das Theme ist bereits fertig erzeugt und braucht weder Internet noch zusätzliche
Python-Pakete. Grundlage ist Mint-Y-Dark; dessen Formen und Assets bleiben erhalten.
**Die Installation aktiviert nichts automatisch und benötigt kein sudo.**

## Installieren und auswählen

1. Diesen Ordner vollständig auf deinen Mint-Rechner kopieren.
2. Im Dateimanager den Ordner öffnen, rechtsklicken und **Im Terminal öffnen**.
3. Ausführen:

   ```sh
   python3 install.py
   ```

   Dadurch entsteht `~/.themes/Schmierpapier-Dark`. Eine vorhandene eigene
   Installation wird zuvor in einen versteckten Sicherungsordner daneben verschoben.
4. **Systemeinstellungen → Themen** öffnen. Je nach Mint-Version zuerst
   **Erweiterte Einstellungen** öffnen.
5. **Schmierpapier-Dark** für **Anwendungen** und **Schreibtisch** auswählen.
   Falls separat angeboten, auch bei **Fensterrahmen** auswählen. Symbole und
   Mauszeiger kannst du behalten; sie gehören nicht zu dieser Farbpalette.
6. Geöffnete Programme schließen und erneut öffnen. Wird das Theme noch nicht
   angeboten, die Themeneinstellungen erneut öffnen; gegebenenfalls ab- und anmelden.

Cinnamons offizielles Benutzer-Theme-Verzeichnis ist `~/.themes`:
[Installationshinweis von Cinnamon Spices](https://cinnamon-spices.linuxmint.com/themes).

Ohne Skript kannst du den mitgelieferten Ordner **Schmierpapier-Dark** nach
`~/.themes/` kopieren; die vollständige Struktur einschließlich Assets beibehalten.

Nur prüfen, ohne etwas zu installieren:

```sh
python3 install.py --pruefen
```

## Die Farben

| Verwendung | Exakte Farbe aus Schmierpapier |
|---|---|
| Dunkler Hintergrund / Inhaltsflächen | `#17201d` |
| Fenster, Menüs und Cinnamon-Leiste | `#222e28` |
| Buttons und Eingabefelder | `#2d3b33` |
| Hover | `#415448` |
| Auswahl / aktive Buttons | `#355e49` |
| Grüner Akzent | `#36795e` |
| Rahmen | `#708579`, `#647a6c` |
| Fokusrahmen | `#a6d6b5` |
| Text | `#e1e9e4`, `#edf3ef` |
| Zurückhaltender Text | `#bacfc1` |
| Links | `#a8dbbf` |

Alle Farbwerte stehen zusätzlich in `palette.json`. Mint-Y definiert die
Bedienelemente und ihre Zustände; die mitgelieferten Regeln färben sie in diese
Palette um. Schatten, Transparenzen und vorhandene Symbolgrafiken können weitere
abgeleitete Farben zeigen. Ein Desktop-Hintergrundbild wird nicht geändert.

## Zurückwechseln und entfernen

In **Systemeinstellungen → Themen** wieder die zuvor verwendeten Themes auswählen,
beispielsweise **Mint-Y-Dark**. Anschließend kannst du den Ordner
`~/.themes/Schmierpapier-Dark` im Dateimanager löschen. Mit **Strg+H** werden
versteckte Ordner sichtbar. Vorhandene Sicherungen liegen dort als
`.Schmierpapier-Dark-Sicherung-DATUM` und lassen sich bei Bedarf zurückbenennen.
Die Datei- und Programmeinstellungen bleiben erhalten.

## Grenzen

Die Anleitung bezieht sich auf **Cinnamon**. Bei Mint MATE/Xfce ist nur ein Teil der
Komponenten nutzbar; die Cinnamon-Leiste gehört dort nicht zur Oberfläche.
Programme mit eigener Oberfläche, manche Flatpaks, Qt-Anwendungen und moderne
libadwaita-Anwendungen übernehmen ein GTK-Theme möglicherweise nicht vollständig.
Das Skript überschreibt deshalb keine globale `~/.config/gtk-4.0/gtk.css` und
verändert keine Flatpak-Berechtigungen. Ein noch laufendes Programm kann seine
alte Darstellung bis zum nächsten Start behalten.

Die GTK-CSS-Dateien und der Installer wurden lokal geprüft. Eine vollständige
Sichtprüfung aller Cinnamon-Applets und jeder Mint-Version ist damit nicht abgedeckt.

## Selbst neu erzeugen

Nur nötig, wenn du die Quellen ändern möchtest. Die Anpassungen stehen lesbar in
`overrides/` und `build-theme.py`. Eine installierte Mint-Y-Dark-Fassung wird als
Grundlage eingelesen:

```sh
python3 build-theme.py
# Oder mit einer anderen Mint-Y-Dark-Kopie:
python3 build-theme.py --base /pfad/zu/Mint-Y-Dark
python3 install.py
```

Der Build verändert nur den mitgelieferten Ordner `Schmierpapier-Dark`, nicht die
System-Themes oder die Schmierpapier-App. Bei einem Mint-Y-Update bleibt deine
Kopie unverändert, bis du sie selbst neu erzeugst und installierst.

Basis: [Linux Mint / mint-themes](https://github.com/linuxmint/mint-themes).
Lizenz: **GPL-3.0-or-later**. Herkunftshinweise: `NOTICE.md` und
`UPSTREAM-COPYRIGHT`; vollständiger Lizenztext: `COPYING`.

## Dieselben Farben im Mint-Terminal

Für GNOME Terminal (das Standardterminal von Mint Cinnamon) gibt es zusätzlich
`terminal-theme.py`. Es verwendet die auf Mint üblichen Systempakete
`python3-gi`, GSettings und dconf. Es verändert nur die Farbeinstellungen des
Standardprofils, einschließlich Auswahl, Cursor und der 16 ANSI-Farben.

```sh
python3 terminal-theme.py          # Aktuelles Profil und Farben anzeigen
python3 terminal-theme.py --apply  # Sichern und dauerhaft übernehmen
```

Kein sudo verwenden. Die bisherigen Werte werden unter
`~/.local/state/schmierpapier/terminal-colours-DATUM.json` gesichert; bei gesetztem
`XDG_STATE_HOME` liegt die Sicherung dort im Unterordner `schmierpapier`.
Das Skript gibt den genauen Pfad und den Wiederherstellungsbefehl aus:

```sh
python3 terminal-theme.py --restore /pfad/zur/terminal-colours-DATUM.json
```

Die Farben bleiben nach dem Schließen des Terminals und nach einem Neustart
hinterlegt. Vorhandene Fenster desselben Profils übernehmen sie üblicherweise
direkt; falls nötig ein neues Terminalfenster öffnen. Die virtuelle Linux-Konsole
(Strg+Alt+F-Tasten) und andere Terminalprogramme werden damit nicht umgestellt.
