# Project maintenance

- After validating homepage updates, immediately upload the changed public website files using the connection details in `homepage/ftp.txt`, always upload the current root `schmierpapier.html` alongside them, then verify the public site, live app and download. This is an ongoing user authorization; do not ask again for each homepage update. Never upload or expose `ftp.txt` or its credentials.
- Keep homepage release copy concise and focused on user benefits. Preserve clear headings; avoid detailed key bindings and operation instructions in the release overview. Maintain all six text variants (German, English and French, each standard and simple).
- Keep `CHANGELOG.md` (German), `CHANGELOG.en.md` (English), and `CHANGELOG.fr.md` (French) aligned when recording changes. Preserve their language links and the matching links from each README.
- Keep `README.md` (German), `README.en.md` (English), and `README.fr.md` (French) aligned. Whenever an important feature, workflow, supported language, version, setup requirement, file format, or licence changes, update all three READMEs in the same change as needed.
- Keep the language links between the three READMEs working. The German README is the default GitHub entry point; translations should cover the same information.
- Document new or changed features in the application's built-in help in German, English, and French. Update affected tutorial instructions in all three languages as well.
- Preserve the single-file, offline operation of `schmierpapier.html` and the independent licence notices for its embedded fonts.

- The published application release is v0.5. Keep all three changelogs aligned and preserve previous release history. Use the version requested by the user for future development.

- Application sources now live under `src/`. Edit those sources, never the generated root `schmierpapier.html`. After app changes run `python3 build.py` and `python3 build.py --check`; include the regenerated HTML with the source change. The build requires only Python 3.10+ standard-library modules. `python3 build.py --watch` rebuilds after saves.
- Preserve `src/build.json` section order and the shared classic-script scope. New JS files/parts must be listed there. Keep locale keys/help coverage aligned in `src/i18n/de.js`, `en.js`, and `fr.js`. Read `src/README.md` for the source map and assembly rules. Font/logo assets under `src/assets/` must remain embedded in the generated output.
- The user started v0.5.5 development and explicitly suspended all uploads. Do not upload or publish app or homepage changes until the user requests the next upload. This overrides the automatic homepage deployment workflow above. Build/watch/check remain local-only.

- The homepage uses a SHA-256 hash in its Content-Security-Policy for the inline `site-i18n` script. Whenever its script content or translations change, recompute the hash from the exact UTF-8 text between the script tags before browser testing and deployment; keep the CSP in place.

- Keep offline release summaries in `src/js/release-notes.js` and their DE/EN/FR UI translations aligned with new changelog entries. `savedWith` stores the app release, while `version: 1` remains the document schema.

- Current development version is v0.5.5; the published release remains v0.5. Record development changes in matching v0.5.5 sections.
