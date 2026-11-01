"""Build-contract tests; no browser, network, package install or deployment."""
from pathlib import Path
import base64
import hashlib
import json
import shutil
import signal
import subprocess
import sys
import tempfile
import time
import unittest

ROOT = Path(__file__).resolve().parents[2]


class BuildTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="schmier-build-test-")
        self.addCleanup(self.temporary.cleanup)
        self.project = Path(self.temporary.name)
        shutil.copyfile(ROOT / "build.py", self.project / "build.py")
        shutil.copytree(ROOT / "src", self.project / "src", ignore=shutil.ignore_patterns("__pycache__"))
        self.output = self.project / "schmierpapier.html"

    def run_build(self, *arguments):
        return subprocess.run([sys.executable, str(self.project / "build.py"), *arguments],
                              capture_output=True, text=True, timeout=15)

    def test_reproducible_and_check_detects_manual_edits(self):
        self.assertEqual(self.run_build().returncode, 0)
        first = self.output.read_bytes()
        self.assertEqual(self.run_build().returncode, 0)
        self.assertEqual(first, self.output.read_bytes())
        self.assertEqual(self.run_build("--check").returncode, 0)
        self.output.write_bytes(first + b"\n<!-- manual edit -->")
        self.assertNotEqual(self.run_build("--check").returncode, 0)
        self.assertTrue(self.output.read_bytes().endswith(b"<!-- manual edit -->"))

    def test_missing_source_preserves_last_good_output(self):
        self.assertEqual(self.run_build().returncode, 0)
        first = self.output.read_bytes()
        (self.project / "src/js/roots.js").unlink()
        result = self.run_build()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("Missing source", result.stderr)
        self.assertEqual(first, self.output.read_bytes())

    def test_missing_translation_is_reported(self):
        path = self.project / "src/i18n/fr.js"
        text = path.read_text(encoding="utf-8")
        start = text.index("{", text.index("const LOCALE_FR"))
        data, end = json.JSONDecoder().raw_decode(text[start:])
        data["ui"].pop(next(iter(data["ui"])))
        path.write_text(text[:start] + json.dumps(data, ensure_ascii=False) + text[start + end:], encoding="utf-8")
        result = self.run_build()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("missing UI keys", result.stderr)
        self.assertFalse(self.output.exists())

    def test_assets_are_embedded_byte_for_byte(self):
        self.assertEqual(self.run_build().returncode, 0)
        result = self.output.read_text(encoding="utf-8")
        manifest = json.loads((self.project / "src/build.json").read_text())
        for asset in manifest["assets"]:
            original = (self.project / "src" / asset["file"]).read_bytes()
            uri = f"data:{asset['mime']};base64," + base64.b64encode(original).decode()
            self.assertIn(uri, result)
        self.assertIn("font licenses", result)
        self.assertNotIn("{{asset:", result)
        self.assertNotIn('<script src=', result)
        self.assertNotIn('<link rel="stylesheet"', result)

    def test_watch_rebuilds_after_source_change(self):
        process = subprocess.Popen([sys.executable, str(self.project / "build.py"), "--watch"],
                                   stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        try:
            deadline = time.monotonic() + 6
            while not self.output.exists() and time.monotonic() < deadline:
                time.sleep(0.05)
            self.assertTrue(self.output.exists())
            time.sleep(0.7)  # Let watch take its initial source snapshot.
            previous = hashlib.sha256(self.output.read_bytes()).digest()
            (self.project / "src/version.txt").write_text("9.8.7\n")
            deadline = time.monotonic() + 6
            while time.monotonic() < deadline:
                if hashlib.sha256(self.output.read_bytes()).digest() != previous:
                    break
                time.sleep(0.1)
            self.assertIn("v 9.8.7", self.output.read_text(encoding="utf-8"))
            self.assertEqual(self.run_build("--check").returncode, 0)
        finally:
            process.send_signal(signal.SIGINT)
            process.communicate(timeout=5)


if __name__ == "__main__":
    unittest.main()
