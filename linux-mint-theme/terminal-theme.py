#!/usr/bin/env python3
"""Apply/restore only GNOME Terminal profile colours; keep other settings intact."""
from pathlib import Path
import argparse
import datetime
import json
import os
import subprocess
import gi

gi.require_version('Gio', '2.0')
from gi.repository import Gio, GLib

COLOURS = {
    'use-theme-colors': False,
    'use-transparent-background': False,
    'background-color': '#17201d',
    'foreground-color': '#e1e9e4',
    'bold-color-same-as-fg': True,
    'cursor-colors-set': True,
    'cursor-background-color': '#a6d6b5',
    'cursor-foreground-color': '#17201d',
    'highlight-colors-set': True,
    'highlight-background-color': '#355e49',
    'highlight-foreground-color': '#edf3ef',
    'palette': [
        '#17201d', '#ff8585', '#6fd093', '#e5aa22',
        '#8faeff', '#ff65c5', '#a8dbbf', '#bacfc1',
        '#647a6c', '#ffb5a6', '#7fff00', '#eeff00',
        '#8faeff', '#ff65c5', '#a6d6b5', '#edf3ef',
    ],
}
SCHEMA = 'org.gnome.Terminal.Legacy.Profile'

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument('--apply', action='store_true', help='Palette dauerhaft im Standardprofil hinterlegen')
    group.add_argument('--restore', type=Path, help='Vorherige Farben aus einer Sicherung wiederherstellen')
    args = parser.parse_args()
    if args.restore:
        backup = json.loads(args.restore.expanduser().read_text())
        if backup.get('schema') != SCHEMA: parser.error('Unbekanntes Sicherungsformat.')
        profile_id = backup['profile']
    else:
        profiles = Gio.Settings.new('org.gnome.Terminal.ProfilesList')
        profile_id = profiles.get_string('default')
        if profile_id not in profiles.get_strv('list'): parser.error('Kein gültiges Standardprofil vorhanden.')
    import re
    if not re.fullmatch(r'[a-fA-F0-9-]{36}', profile_id): parser.error('Ungültige Profil-ID.')
    path = '/org/gnome/terminal/legacy/profiles:/:' + profile_id + '/'
    settings = Gio.Settings.new_with_path(SCHEMA, path)
    supported = settings.props.settings_schema.list_keys()
    values = {key: value for key, value in COLOURS.items() if key in supported}
    print('Terminalprofil:', settings.get_string('visible-name') or profile_id)
    if not args.apply and not args.restore:
        print('Hintergrund:', settings.get_string('background-color'))
        print('Text:', settings.get_string('foreground-color'))
        print('Mit --apply dauerhaft übernehmen; die bisherigen Farben werden gesichert.')
        return
    target_values = backup['values'] if args.restore else values
    if not set(target_values).issubset(COLOURS): parser.error('Sicherung enthält fremde Einstellungen.')
    for key in target_values:
        if key not in supported or not settings.is_writable(key): parser.error('Einstellung nicht schreibbar: '+key)
    before = {key: (settings.get_user_value(key).print_(True) if settings.get_user_value(key) is not None else None) for key in target_values}
    state = Path(os.environ.get('XDG_STATE_HOME', str(Path.home()/'.local/state')))/'schmierpapier'
    state.mkdir(parents=True, exist_ok=True, mode=0o700)
    stamp = datetime.datetime.now().astimezone().strftime('%Y%m%d-%H%M%S-%f')
    save = state/('terminal-colours-'+stamp+'.json')
    fd = os.open(save, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(fd, 'w') as file:
        json.dump({'schema': SCHEMA, 'profile': profile_id, 'values': before}, file, indent=2)
        file.write('\n')
    settings.delay()
    for key, value in target_values.items():
        if args.restore:
            if value is None: settings.reset(key); continue
            variant = GLib.Variant.parse(None, value, None, None)
        else:
            signature = settings.get_value(key).get_type_string()
            variant = GLib.Variant(signature, value)
        if not settings.set_value(key, variant): raise RuntimeError('Konnte Einstellung nicht setzen: '+key)
    settings.apply()
    Gio.Settings.sync()
    # Read the persistent backend in a separate process, rather than only our cache.
    for key in target_values:
        raw = subprocess.run(['dconf', 'read', path+key], capture_output=True, text=True, check=True).stdout.strip()
        expected = settings.get_user_value(key)
        if (not raw and expected is not None) or (raw and (expected is None or GLib.Variant.parse(None, raw, None, None).unpack() != expected.unpack())):
            raise RuntimeError('Dauerhafte Speicherung konnte nicht bestätigt werden: '+key+'; Sicherung: '+str(save))
    print('Farben dauerhaft gespeichert und aus dconf zurückgelesen.')
    print('Sicherung:', save)
    print('Wiederherstellen: python3 terminal-theme.py --restore '+str(save))

if __name__ == '__main__': main()
