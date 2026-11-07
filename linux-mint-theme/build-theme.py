#!/usr/bin/env python3
"""Create the distributable theme from an installed Mint-Y-Dark (Python stdlib)."""
from pathlib import Path
import argparse, json, re, shutil

ROOT = Path(__file__).resolve().parent
PALETTE = {
    'background': '#17201d', 'surface': '#222e28', 'control': '#2d3b33',
    'hover': '#415448', 'selected': '#355e49', 'accent': '#36795e',
    'border': '#708579', 'surface_border': '#647a6c', 'focus': '#a6d6b5',
    'text': '#e1e9e4', 'control_text': '#edf3ef', 'muted_text': '#bacfc1',
    'link': '#a8dbbf', 'error': '#ffb5a6', 'warning': '#e5aa22',
}

def recolour(match):
    value = match.group(0)
    raw = value[1:]
    if len(raw) == 3:
        raw = ''.join(c * 2 for c in raw)
    r, g, b = (int(raw[i:i+2], 16) for i in (0, 2, 4))
    high, low = max(r,g,b), min(r,g,b)
    if high - low <= 28:
        level = (r+g+b)/3
        if level < 28: return PALETTE['background']
        if level < 47: return PALETTE['surface']
        if level < 63: return PALETTE['control']
        if level < 90: return PALETTE['hover']
        if level < 150: return PALETTE['border']
        if level < 195: return PALETTE['muted_text']
        return PALETTE['control_text'] if level >= 240 else PALETTE['text']
    if g > r * 1.2 and g > b * 1.1:
        return PALETTE['focus'] if (r+g+b)/3 > 150 else PALETTE['accent']
    return value

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', type=Path, default=Path('/usr/share/themes/Mint-Y-Dark'))
    args = parser.parse_args()
    base = args.base.resolve()
    if not (base/'gtk-3.0/gtk.css').is_file() or not (base/'cinnamon/cinnamon.css').is_file():
        parser.error('Mint-Y-Dark mit GTK 3 und Cinnamon fehlt. --base PFAD angeben.')
    theme = ROOT/'Schmierpapier-Dark'
    theme.mkdir(exist_ok=True)
    for component in ['gtk-2.0', 'gtk-3.0', 'gtk-4.0', 'cinnamon', 'xfwm4', 'openbox-3']:
        if (base/component).is_dir():
            shutil.copytree(base/component, theme/component, dirs_exist_ok=True)
    # Mint-Y-Dark uses the shared Mint-Y Metacity decoration.
    metacity = base/'metacity-1'
    if not metacity.is_dir(): metacity = base.parent/'Mint-Y/metacity-1'
    if metacity.is_dir(): shutil.copytree(metacity, theme/'metacity-1', dirs_exist_ok=True)
    for path in theme.rglob('*'):
        if path.is_file() and (path.suffix in {'.css', '.svg', '.xml', '.themerc'} or path.name in {'gtkrc', 'themerc'}):
            text = path.read_text()
            text = re.sub(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b', recolour, text)
            # Some packaged Mint-Y revisions reference a thumbnail asset they omit.
            if path.suffix == '.css' and not (path.parent/'assets/thumbnail-frame.png').exists():
                text = text.replace('border-image: url("assets/thumbnail-frame.png") 3 3 6 4;', 'border-image: none; border-color: #708579;')
            path.write_text(text)
    for version in ['gtk-3.0','gtk-4.0']:
        folder = theme/version
        if folder.exists():
            overrides = (ROOT/'overrides'/('gtk3.css' if version=='gtk-3.0' else 'gtk4.css')).read_text()
            for name in ['gtk.css','gtk-dark.css']:
                path = folder/name
                original = path.read_text() if path.exists() else (folder/'gtk.css').read_text()
                path.write_text(original+'\n/* Schmierpapier palette overrides */\n'+overrides)
    path = theme/'cinnamon/cinnamon.css'
    path.write_text(path.read_text()+'\n/* Schmierpapier palette overrides */\n'+(ROOT/'overrides/cinnamon.css').read_text())
    (theme/'index.theme').write_text('''[Desktop Entry]
Type=X-GNOME-Metatheme
Name=Schmierpapier-Dark
Comment=Schmierpapier dark green palette, based on Mint-Y-Dark

[X-GNOME-Metatheme]
GtkTheme=Schmierpapier-Dark
MetacityTheme=Schmierpapier-Dark
IconTheme=Mint-Y
CursorTheme=Bibata-Modern-Classic
ButtonLayout=:minimize,maximize,close
''')
    (theme/'.schmierpapier-theme').write_text('Schmierpapier-Dark\n')
    (ROOT/'palette.json').write_text(json.dumps(PALETTE, indent=2)+'\n')
    for name in ['COPYING','UPSTREAM-COPYRIGHT','NOTICE.md']:
        shutil.copy2(ROOT/name,theme/name)
    print('Erstellt:', theme)

if __name__ == '__main__': main()
