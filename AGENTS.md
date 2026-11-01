# Project maintenance

- After validating homepage updates, immediately upload the changed public website files using the connection details in `homepage/ftp.txt`, always upload the current root `schmierpapier.html` alongside them, then verify the public site, live app and download. This is an ongoing user authorization; do not ask again for each homepage update. Never upload or expose `ftp.txt` or its credentials.
- Keep homepage release copy concise and focused on user benefits. Preserve clear headings; avoid detailed key bindings and operation instructions in the release overview. Maintain all six text variants (German, English and French, each standard and simple).
- Keep `CHANGELOG.md` (German), `CHANGELOG.en.md` (English), and `CHANGELOG.fr.md` (French) aligned when recording changes. Preserve their language links and the matching links from each README.
- Keep `README.md` (German), `README.en.md` (English), and `README.fr.md` (French) aligned. Whenever an important feature, workflow, supported language, version, setup requirement, file format, or licence changes, update all three READMEs in the same change as needed.
- Keep the language links between the three READMEs working. The German README is the default GitHub entry point; translations should cover the same information.
- Document new or changed features in the application's built-in help in German, English, and French. Update affected tutorial instructions in all three languages as well.
- Preserve the single-file, offline operation of `schmierpapier.html` and the independent licence notices for its embedded fonts.

- The published application release is v0.4.2; upcoming development changes belong to v0.4.3. Record new changes in matching v0.4.3 sections of all three changelogs, preserving the existing v0.4.2 and v0.4 release history. Do not assign new changes to v0.4.2.

- Application sources now live under `src/`. Edit those sources, never the generated root `schmierpapier.html`. After app changes run `python3 build.py` and `python3 build.py --check`; include the regenerated HTML with the source change. The build requires only Python 3.10+ standard-library modules. `python3 build.py --watch` rebuilds after saves.
- Preserve `src/build.json` section order and the shared classic-script scope. New JS files/parts must be listed there. Keep locale keys/help coverage aligned in `src/i18n/de.js`, `en.js`, and `fr.js`. Read `src/README.md` for the source map and assembly rules. Font/logo assets under `src/assets/` must remain embedded in the generated output.
- Deployment is currently on hold at the user's request. Do not upload or publish until the user explicitly requests the next upload; build/watch/check are local-only. Before a future authorized upload, rebuild the current app and verify it with `--check`.
