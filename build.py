#!/usr/bin/env python3
"""Build the standalone offline app using Python's standard library only.

Usage: python3 build.py [--check | --watch] [--output PATH]
Sources, assets, languages and assembly order live entirely under src/.
"""
from __future__ import annotations

import argparse
import base64
import json
import os
from pathlib import Path
import re
import sys
import tempfile
import time

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
DEFAULT_OUTPUT = ROOT / "schmierpapier.html"
PART = re.compile(r"^// @part ([a-zA-Z0-9_-]+)\s*$", re.MULTILINE)
ASSET = re.compile(r"\{\{asset:([^}]+)\}\}")
LOCALE_FIELDS = {"ui", "helpInitial", "helpAdditions", "consent", "languageTopic", "tutorialNavigation"}


class BuildError(Exception):
    """An actionable source/manifest error; leave the last good HTML untouched."""


def source(relative: str) -> Path:
    path = (SRC / relative).resolve()
    if not path.is_relative_to(SRC.resolve()):
        raise BuildError(f"Source path escapes src/: {relative}")
    if not path.is_file():
        raise BuildError(f"Missing source: src/{relative}")
    return path


def read(relative: str) -> str:
    return source(relative).read_text(encoding="utf-8")


def locale_data(relative: str, code: str) -> dict:
    content = read(relative)
    marker = f"const LOCALE_{code.upper()} = "
    if marker not in content:
        raise BuildError(f"Missing {marker.strip()} in src/{relative}")
    try:
        data, _ = json.JSONDecoder().raw_decode(content.split(marker, 1)[1].lstrip())
    except (ValueError, TypeError) as error:
        raise BuildError(f"Invalid locale data in src/{relative}: {error}") from error
    if set(data) != LOCALE_FIELDS:
        raise BuildError(f"Locale {code}: expected fields {sorted(LOCALE_FIELDS)}")
    if not isinstance(data["ui"], dict) or not all(
        isinstance(k, str) and isinstance(v, str) and v.strip() for k, v in data["ui"].items()
    ):
        raise BuildError(f"Locale {code}: UI translations must be nonempty strings")
    for article in data["helpInitial"] + data["helpAdditions"] + [data["languageTopic"]]:
        if not all(isinstance(article.get(key), str) and article[key].strip()
                   for key in ("title", "html")):
            raise BuildError(f"Locale {code}: help articles need title and html")
    return data


def validate_languages() -> None:
    locales = {code: locale_data(f"i18n/{code}.js", code) for code in ("de", "en", "fr")}
    reference = set(locales["de"]["ui"])
    count = len(locales["de"]["helpInitial"]) + len(locales["de"]["helpAdditions"])
    for code, data in locales.items():
        keys = set(data["ui"])
        if keys != reference:
            missing = sorted(reference - keys)
            extra = sorted(keys - reference)
            raise BuildError(f"Locale {code}: missing UI keys {missing}; extra keys {extra}")
        if len(data["helpInitial"]) + len(data["helpAdditions"]) != count:
            raise BuildError(f"Locale {code}: help article count differs from German")
        if not data["tutorialNavigation"].strip():
            raise BuildError(f"Locale {code}: missing tutorial navigation text")


def render() -> bytes:
    manifest = json.loads(read("build.json"))
    version = read(manifest["version"]).strip()
    if not re.fullmatch(r"\d+\.\d+(?:\.\d+)?(?:-[a-zA-Z0-9.-]+)?", version):
        raise BuildError("Invalid src/version.txt: expected e.g. 0.4.3")
    validate_languages()

    assets = {}
    for item in manifest["assets"]:
        name = item["file"]
        if name in assets:
            raise BuildError(f"Duplicate asset in src/build.json: {name}")
        data = source(name).read_bytes()
        if not data:
            raise BuildError(f"Empty asset: src/{name}")
        assets[name] = f"data:{item['mime']};base64," + base64.b64encode(data).decode("ascii")

    parts = {}
    for name in dict.fromkeys(item["file"] for item in manifest["scripts"]):
        content = read(name)
        matches = list(PART.finditer(content))
        if not matches:
            raise BuildError(f"No // @part markers in src/{name}")
        for index, match in enumerate(matches):
            key = (name, match[1])
            if key in parts:
                raise BuildError(f"Duplicate part: src/{name} [{match[1]}]")
            end = matches[index + 1].start() if index + 1 < len(matches) else len(content)
            parts[key] = content[match.end():end].strip()

    # One strict classic script preserves shared scope, function hoisting and event order.
    scripts = ["'use strict';"]
    scripts.extend(f"// Source: src/{name}\n{read(name).strip()}" for name in manifest["languages"])
    used = set()
    for item in manifest["scripts"]:
        key = (item["file"], item["part"])
        if key in used:
            raise BuildError(f"Part assembled twice: {key}")
        if key not in parts:
            raise BuildError(f"Missing part: {key}")
        used.add(key)
        scripts.append(f"// Source: src/{key[0]} [{key[1]}]\n{parts[key]}")
    if used != set(parts):
        raise BuildError(f"Unreferenced source parts: {sorted(set(parts) - used)}")
    listed_js = set(manifest["languages"]) | {item["file"] for item in manifest["scripts"]}
    found_js = {str(path.relative_to(SRC)) for path in SRC.rglob("*.js")}
    if listed_js != found_js:
        raise BuildError(f"Unlisted/missing JS sources: {sorted(listed_js ^ found_js)}")

    script = "\n\n".join(scripts)
    if re.search(r"</script", script, re.IGNORECASE):
        raise BuildError("Literal </script in JS sources; write <\\/script inside strings instead")
    template = read(manifest["template"])
    if template.count("{{styles}}") != 1 or template.count("{{scripts}}") != 1:
        raise BuildError("src/index.html must contain exactly one {{styles}} and {{scripts}}")
    html = template.replace("{{styles}}", "\n".join(read(name) for name in manifest["styles"]))
    html = html.replace("{{scripts}}", script).replace("{{version}}", version)

    def embed(match: re.Match) -> str:
        name = match[1]
        if name not in assets:
            raise BuildError(f"Unknown asset placeholder: {name}")
        return assets[name]

    html = ASSET.sub(embed, html)
    if re.search(r"\{\{(?:styles|scripts|version|asset:)[^}]*\}\}", html):
        raise BuildError("Unresolved build placeholder")
    if len(re.findall(r"<script\b", html, re.IGNORECASE)) != 1:
        raise BuildError("The offline app must have exactly one inline script")
    if re.search(r"<(?:script|link)\b[^>]*(?:src|href)=[\"']https?://", html, re.IGNORECASE):
        raise BuildError("External script/style dependency found in the offline app")
    return html.encode("utf-8")


def build(output: Path, check: bool = False) -> bool:
    try:
        data = render()
        current = output.read_bytes() if output.exists() else None
        if check:
            if current != data:
                print(f"Out of date: {output}. Run python3 build.py", file=sys.stderr)
                return False
            print(f"Up to date: {output.name} ({len(data):,} bytes)")
            return True
        if current == data:
            print(f"Unchanged: {output.name}")
            return True
        output.parent.mkdir(parents=True, exist_ok=True)
        temporary = None
        try:
            with tempfile.NamedTemporaryFile(dir=output.parent, prefix=".schmier-build-", delete=False) as file:
                temporary = Path(file.name)
                file.write(data)
            temporary.chmod(output.stat().st_mode & 0o777 if output.exists() else 0o644)
            os.replace(temporary, output)
        finally:
            if temporary and temporary.exists():
                temporary.unlink()
        print(f"Built: {output} ({len(data):,} bytes)")
        return True
    except (BuildError, OSError, ValueError, KeyError, TypeError) as error:
        print(f"Build failed: {error}", file=sys.stderr)
        return False


def snapshot() -> tuple:
    return tuple((str(p), p.stat().st_mtime_ns, p.stat().st_size)
                 for p in sorted(SRC.rglob("*")) if p.is_file() and "__pycache__" not in p.parts)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    modes = parser.add_mutually_exclusive_group()
    modes.add_argument("--check", action="store_true", help="Verify the output matches src/ without writing")
    modes.add_argument("--watch", action="store_true", help="Rebuild automatically after source changes")
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT, help="Output HTML (default: schmierpapier.html)")
    args = parser.parse_args()
    ok = build(args.output.resolve(), args.check)
    if not args.watch:
        return 0 if ok else 1
    print("Watching src/. Press Ctrl+C to stop. No network access or uploads.", flush=True)
    previous = snapshot()
    try:
        while True:
            time.sleep(0.5)
            current = snapshot()
            if current != previous:
                previous = current
                build(args.output.resolve())
    except KeyboardInterrupt:
        print("\nStopped watching.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
