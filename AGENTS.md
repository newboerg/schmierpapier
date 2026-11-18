# Project maintenance

- After validating homepage updates, immediately upload the changed public website files using the connection details in `homepage/ftp.txt`, always upload the current root `schmierpapier.html` alongside them, then verify the public site, live app and download. This is an ongoing user authorization; do not ask again for each homepage update. Never upload or expose `ftp.txt` or its credentials.
- Keep homepage release copy concise and focused on user benefits. Preserve clear headings; avoid detailed key bindings and operation instructions in the release overview. Maintain all six text variants (German, English and French, each standard and simple).
- Keep `CHANGELOG.md` (German), `CHANGELOG.en.md` (English), and `CHANGELOG.fr.md` (French) aligned when recording changes. Preserve their language links and the matching links from each README.
- Keep `README.md` (German), `README.en.md` (English), and `README.fr.md` (French) aligned. Whenever an important feature, workflow, supported language, version, setup requirement, file format, or licence changes, update all three READMEs in the same change as needed.
- Keep the language links between the three READMEs working. The German README is the default GitHub entry point; translations should cover the same information.
- Document new or changed features in the application's built-in help in German, English, and French. Update affected tutorial instructions in all three languages as well.
- Preserve the single-file, offline operation of `schmierpapier.html` and the independent licence notices for its embedded fonts.

- The published application release is v0.6.5. Keep all three changelogs aligned and preserve previous release history. Use the version requested by the user for future development.

- Application sources now live under `src/`. Edit those sources, never the generated root `schmierpapier.html`. After app changes run `python3 build.py` and `python3 build.py --check`; include the regenerated HTML with the source change. The build requires only Python 3.10+ standard-library modules. `python3 build.py --watch` rebuilds after saves.
- Preserve `src/build.json` section order and the shared classic-script scope. New JS files/parts must be listed there. Keep locale keys/help coverage aligned in `src/i18n/de.js`, `en.js`, and `fr.js`. Read `src/README.md` for the source map and assembly rules. Font/logo assets under `src/assets/` must remain embedded in the generated output.
- The user authorised publishing v0.6.5. Homepage updates follow the deployment workflow above; build/watch/check remain local-only.

- Homepage assets are separate: `homepage/css/site.css`, `homepage/js/site.js`, six `homepage/js/i18n/*.js` files, `homepage/img/` and `homepage/files/`. Keep the same-origin-only CSP; no inline script hash is needed. After CSS/JS edits run `python3 homepage/tools/refresh-assets.py` before browser testing and upload assets before replacing index.html. Never overwrite the private server download counter; bot filtering is a header-based statistics heuristic, not access control. See `homepage/README.md`.

- Keep offline release summaries in `src/js/release-notes.js` and their DE/EN/FR UI translations aligned with new changelog entries. `savedWith` stores the app release, while `version: 1` remains the document schema.

- The user authorised publishing the keyboard startup notice, expanded symbol menus and double-height symbol fix as part of v0.6.5.

- Homepage illustrations and pictograms must be external SVG assets, including all six preview variants and badges. Do not reintroduce inline SVG/canvas illustrations or embedded raster pictures; keep `previewSrc` and localized SVG captions aligned.
