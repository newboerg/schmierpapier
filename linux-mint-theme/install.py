#!/usr/bin/env python3
"""Install the bundled theme for this user. Never changes the active theme."""
from pathlib import Path
import argparse
import datetime
import os
import shutil
import tempfile

NAME = 'Schmierpapier-Dark'
ROOT = Path(__file__).resolve().parent

def main():
    parser = argparse.ArgumentParser(description='Schmierpapier-Dark installieren, ohne es automatisch zu aktivieren.')
    parser.add_argument('--ziel', type=Path, default=Path.home()/'.themes', help='Theme-Verzeichnis (Standard: ~/.themes)')
    parser.add_argument('--pruefen', action='store_true', help='Nur Quellen und Ziel prüfen; nichts installieren')
    args = parser.parse_args()
    source = ROOT/NAME
    for name in ['index.theme', 'gtk-3.0/gtk.css', 'cinnamon/cinnamon.css', '.schmierpapier-theme']:
        if not (source/name).is_file(): parser.error('Theme-Datei fehlt: '+name)
    target_root = args.ziel.expanduser().resolve()
    target = target_root/NAME
    if source.resolve() == target: parser.error('Quellordner und Installationsziel sind identisch.')
    if target.is_symlink(): parser.error('Das Ziel ist ein symbolischer Link. Bitte einen anderen Zielordner wählen.')
    if target.exists() and not (target/'.schmierpapier-theme').is_file():
        parser.error('Das Ziel enthält fremde Dateien. Es wird nicht überschrieben.')
    print('Quelle:', source)
    print('Ziel:  ', target)
    if args.pruefen:
        print('Prüfung erfolgreich. Nichts verändert.')
        return
    target_root.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix='.schmierpapier-install-', dir=target_root))
    backup = None
    try:
        shutil.copytree(source, staging/NAME)
        # Include maintenance sources and original notices with every installed copy.
        shutil.copytree(ROOT/'overrides', staging/NAME/'sources/overrides')
        for file in ['build-theme.py', 'install.py', 'terminal-theme.py', 'palette.json', 'README.md', 'COPYING', 'UPSTREAM-COPYRIGHT', 'NOTICE.md']:
            shutil.copy2(ROOT/file, staging/NAME/'sources'/file)
        if target.exists():
            stamp = datetime.datetime.now().strftime('%Y%m%d-%H%M%S-%f')
            backup = target_root/('.'+NAME+'-Sicherung-'+stamp)
            target.rename(backup)
        try:
            (staging/NAME).rename(target)
        except OSError:
            if backup is not None: backup.rename(target)
            raise
    finally:
        shutil.rmtree(staging)
    if backup: print('Vorherige Fassung gesichert:', backup)
    print('Installiert. Jetzt Systemeinstellungen → Themen → Erweiterte Einstellungen öffnen.')
    print('Bei Anwendungen und Schreibtisch „Schmierpapier-Dark“ wählen; Fensterrahmen ebenfalls, falls angeboten.')
    print('Das aktuell ausgewählte Theme wurde nicht verändert.')

if __name__ == '__main__': main()
