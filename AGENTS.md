# Project maintenance

- After validating homepage updates, immediately upload the changed public website files using the connection details in `homepage/ftp.txt`, always upload the current root `schmierpapier.html` alongside them, then verify the public site, live app and download. This is an ongoing user authorization; do not ask again for each homepage update. Never upload or expose `ftp.txt` or its credentials.
- Keep homepage release copy concise and focused on user benefits. Preserve clear headings; avoid detailed key bindings and operation instructions in the release overview. Maintain all six text variants (German, English and French, each standard and simple).
- Keep `CHANGELOG.md` (German), `CHANGELOG.en.md` (English), and `CHANGELOG.fr.md` (French) aligned when recording changes. Preserve their language links and the matching links from each README.
- Keep `README.md` (German), `README.en.md` (English), and `README.fr.md` (French) aligned. Whenever an important feature, workflow, supported language, version, setup requirement, file format, or licence changes, update all three READMEs in the same change as needed.
- Keep the language links between the three READMEs working. The German README is the default GitHub entry point; translations should cover the same information.
- Document new or changed features in the application's built-in help in German, English, and French. Update affected tutorial instructions in all three languages as well.
- Preserve the single-file, offline operation of `schmierpapier.html` and the independent licence notices for its embedded fonts.

- The current application release is v0.4.2. Record changes since v0.4 in the v0.4.2 section of all three changelogs; preserve the original v0.4 release history.
