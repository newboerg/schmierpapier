# Schmierpapier

[Deutsch](README.md) · **English** · [Français](README.fr.md)

Changes: [Changelog](CHANGELOG.en.md).

**Try it now:** [Live demo in your browser](https://schmierpapier.org/schmierpapier.html) – no download needed. For offline use, download the HTML file as described below.

**Direct download:** [Download the HTML file](https://schmierpapier.org/download.php).

**Digital maths paper for people who cannot use ordinary paper in maths lessons.**

**Important: Schmierpapier is not a calculator and does not do any arithmetic for students.** It does not calculate answers or solve tasks automatically. Students work out their own methods, intermediate steps and solutions; the app provides digital paper and tools for writing and drawing.

Schmierpapier provides a place to calculate, experiment and draw directly in the browser. It is intended particularly for students for whom writing or drawing on paper is impossible or difficult because of motor impairments, involuntary movements or other individual circumstances.

The application supports independent work in maths lessons: use the keyboard and mouse to write calculations in cells, arrange fractions clearly and draw geometric constructions with digital tools. Many features are available through buttons, so a keyboard shortcut is not required for every action.

Version **0.5.5 (development)**

Project website: [schmierpapier.org](https://schmierpapier.org). The logo in the app header opens it in a new tab.

## New in v0.5.5 (development)

- Choose the top, bottom, left or right edge for the toolbar in settings. Top remains the default.
- Side panels adapt their width to window height, language and browser zoom, adding columns as needed. All buttons remain visible without scrolling the toolbar; separator lines preserve functional groups.
- The paper area, automatic zoom, symbol menus, shortcut hints, on-screen keypad and tutorial account for the position. PDF and print still contain only the pages.
- The position is part of preferences: stored locally with consent and included in .schmier files. Older preferences use Top.
- v0.5.5 remains local for now. The published version is still v0.5; no uploads until authorised.

## New in v0.5

- Commas and full stops appear at the bottom right of their owner cell, leaving adjacent cells available for the next digit. Punctuation that occupies a cell is available through Miscellaneous symbols.
- Exercise labels such as 1a) fit across two cells, optionally double height; longer text shrinks automatically. Hold A to choose the size.
- Settings (gear button or hold F) offer a 200–3000 ms key-hold duration and handwriting or an embedded console font. Help and tutorial show the configured duration. Both fonts work offline, including PDF and print.
- Files and browser backups record the saving app version and font/hold settings. Opening older documents shows newer release summaries; old files without version information remain readable. Browser storage still requires consent.
- The set square shows enlarged scale readings at line start and end: while moving along the edge by keyboard, or near the edge with the mouse. It does not calculate line length.
- v0.5 is released and available on the project website as a live app and download.

## New in v0.4.4

- Added the tutorial exercise 2 1/2 + 1/2 = 3: double-height whole numbers, plus and equals via U or button; normal numerators/denominators and fraction bars by mouse or keyboard. Navigation and the on-screen keypad remain available.
- The U writing mode now enlarges arithmetic, comparison, percent and per-mille signs too. This works with the keyboard, numeric keypad and symbol buttons; Ctrl/Shift+Enter keeps its fraction-equals function.
- The Miscellaneous symbols menu (hold Z) also includes ‰ (per mille) and ± (plus–minus, plus above minus).
- Writing a large character replaces ordinary text in both occupied cells. Ordinary typing or Space in either occupied cell replaces or removes the whole large character. Undo restores the previous content.
- Root and integral menus now share the five bracket size rows: variable height above, double height above, normal (preselected), double height below and variable height below. Hold Q for roots or I for integrals, or use their menu arrows. Square roots/indefinite integrals are on the left; indexed roots/definite integrals are on the right. Arrows select a tile; Enter confirms.
- For variable height, the root degree or lower and upper integration limits are requested first. Cancellation changes nothing. The active cell then remains the start: Up/Down chooses the target row and Enter commits, or click the target row. The column stays fixed; Esc discards the red dashed preview. Degree and limits are previewed and attached at the final ends. Greek names in limits are still replaced, such as 2pi → 2π. Roots end at the top-right corner without a hook so a line can extend them. Save/load, whole-symbol copying, undo, PDF/printing and deletion from any occupied cell respect the full height. Previews are never saved or exported.
- The new Double-height text button, or holding U for about 0.6 seconds, toggles a persistent writing mode. A clockwise frame shows the hold time; the active button pulses, or stays outlined with reduced motion. A short U still writes u. Numbers and letters, including Greek letters, span two cells down from the current cell, one column per character. Writing advances right; Enter and automatic wrapping advance two rows while enabled. Hold U again or click the button to turn it off. For a mixed fraction, write the large whole-number 1, turn the mode off, then add the ordinary fraction beside it.
- Arithmetic and comparison signs such as +, −, ·, :, /, =, ≠, <, >, ≤, ≥, ≈, ≡, ∝, ±, ∓, % and ‰ are also double-height; punctuation stays normal-height. Persistent sub/superscript and double-height modes are mutually exclusive; individual Ctrl/Shift digits still allow small annotations. No half character is written at the bottom edge: choose a cell higher up. Large letters/numbers can be deleted from either cell, fully copied/cut, undone and preserved in .schmier, PDF and printing. U replaces the former direct ampersand shortcut; & remains in Miscellaneous symbols (hold Z). Names, searches and labels retain ordinary text entry. The tutorial temporarily resets the mode and restores it afterwards.
- Bracket menus now have five size rows: variable height above, double height above, normal (preselected), double height below and variable height below. Each row offers round, square, curly and angle brackets. Open with the menu arrow or hold 8/9; arrows select shape and row, Enter confirms the choice. For the tutorial calculation, still use the normal round bracket in the middle.
- For variable height, the cell active when height selection begins remains the starting cell. Up/Down moves the endpoint by whole cells within the chosen direction; heights from one cell to the page edge are available. A red dashed bracket previews the result; Enter commits it. Alternatively click the target row on the same page; the bracket stays in the starting column. Moving the mouse over the paper previews the target height before clicking. Esc, clicking outside the paper or leaving the window cancels without changing the document. Writing then continues to the right of the starting cell. Active sub/superscript mode does not change the selected bracket height.
- The entire bracket belongs to all occupied cells and can be deleted from any of them with Delete or Backspace. Undo/redo and .schmier files preserve its height. Select the full bracket span to copy or cut it; partial regions do not include it. PDF and printing include only committed brackets, not previews. Older documents with double-height symbols still load; older app versions cannot reliably display variable heights.

## New in v0.4.3

- All hold-key shortcuts show a clockwise progress frame on their corresponding button; short presses are unchanged.
- Definite integrals with entered limits, new logic, set theory and miscellaneous symbol menus, and a visible progress frame while holding Shift/Ctrl.
- Feature sources under `src/` replace direct editing of the finished HTML file.
- A local Python build with watch/check modes still produces one offline file, embedding languages, fonts and logos.

## New in v0.4.2

- Tutorial aligned with current bracket menus: explains the middle normal default, size rows and arrow navigation. Main button, menu arrow and held 8/9 are equivalent; wrong shapes, sizes or modifiers are blocked before insertion with specific feedback. Optional key hints are introduced early.

- Split buttons show one shared key hint centred above the group. The root menu is labelled Q.

- Hold 5/6/7 for pink/neon-yellow/neon-green highlight regions; hold S for strike-through. Arrows select, holding the same key again confirms, Esc cancels. Ctrl+N/O added where delivered by the browser; hold B/O for New/Open alternatives. F11 fullscreen and new key hints added.

- Key hints before Help: click the keyboard icon or hold T to toggle subtle red shortcut labels above buttons. Hints follow the layout, preserve focus and stay out of files, PDF and print. Also available in keyboard drawing modes and the tutorial.

- Hold G for keyboard set-square control: confirm position and rotation, move a prominent pencil along the edge, confirm line start/end. Left/Right move by 1 mm, Up/Down change edge; red preview before drawing. During compass radius selection, holding G toggles the measuring guide without ending the compass. Mouse control is preserved.

- Hold K for a keyboard compass at the selected cell. K or Enter confirms centre, radius (Left/Right in 1 mm), arc start and arc end. Arrows rotate the compass; a red dashed preview precedes drawing, Esc cancels. A completed arc remains one erasable pencil stroke. The mouse button retains its existing workflow.

- The percent shortcut follows the recognised letter Z instead of the physical US key position. Holding Z therefore also works with swapped Y/Z layouts; Y remains ordinary text input.

- Hold I for integral sizes (large above, normal preselected in the middle, large below), also available from the new menu arrow. Hold U for &, Z for %. Short letter input and Ctrl+Z are preserved.

- Split buttons join without gaps or rounded inner corners. The new arrow next to √ opens the same root menu as holding Q; the main button still inserts a square root directly.

- Q menu adds ⁿ√: choose another root in three sizes, then enter its index (2–9999, e.g. 3). The upper-left index is preserved in saved files, copies, PDF and print.
- Large roots without browser conflicts: hold Q (German: Quadratwurzel) for the size menu, with the normal square root in the middle row on the left preselected, large variants above and below, and indexed roots in the right column. Up/Down choose size, Left/Right root type; Enter confirms, Esc cancels. Holding W keeps normal roots; holding Shift+W keeps large roots above. Ctrl+W is left entirely to the browser.
- Bracket menus offer three size rows: double-height above, normal (preselected), double-height below. Left/Right choose shape, Up/Down size, Enter confirms. Large brackets are accessible without key combinations even with sub/superscript active.
- Holding N now waits for the first arrow key to choose orientation and direction. The preview arrowhead is solid and clearly shaped. Holding W inserts a square root; a short W remains text input.
- Keyboard number lines: hold N for an arrow preview; arrows adjust length/edge, Left+Right or Up+Down select or confirm the direction. Holding N again also confirms; Esc cancels. Labels remain manual.

## New in v0.4

- Square roots with an exactly extendable bar and a comparison menu beside `=`; Ctrl/Shift insert double-height forms.
- Greek letters through the π button and its menu. Hold 8/9 for bracket menus, P for Greek letters and Enter for comparison signs.
- Keyboard lines with a red dashed preview: Left+Right starts horizontal, Up+Down vertical. The current cell stays included; horizontal lines start at the bottom.
- Hold shortcuts for pen colours, superscript/subscript, region erasing, copying, cutting, pages, view and PDF. Active small-text modes pulse; pressing Ctrl/Shift immediately shows a yellow preview.
- Enter uses the column last chosen by navigation or clicking as the next row’s start. Corner hit areas scale with page and browser zoom.
- Revised tutorial with mouse/keyboard alternatives and “3 ≠ π”, without highlighter or eraser exercises. It explains Ctrl+S, PDF with E, view with D and exiting with Esc.
- Footer credit “By Benni ♥ Kirstin”, with `&` inside the heart.

## Getting started

1. Download [schmierpapier.html](schmierpapier.html). On GitHub, open the file and choose **“Download raw file”**.
2. Open the downloaded HTML file in a current browser, for example by double-clicking it.
3. Click a cell and start typing. The built-in **Help** explains all features and keyboard shortcuts. The **Tutorial** introduces the main tools through practical exercises.

No installation, account or server is required. The application consists of a single HTML file. JavaScript, fonts, translations, help and tutorial are embedded; everything works offline.

**Keyboard note:** Laptop keyboards without a full numeric keypad can be harder to use when keypad functions require Fn key combinations. A full-size keyboard with a separate numeric keypad is recommended; an external keyboard can be connected to a laptop.

The tutorial introduces the on-screen numeric keypad near the beginning; using it afterwards is optional. Press **N** to skip opening it; this shortcut applies only in the tutorial.

A movable on-screen numeric keypad is available from the header. It stays above the paper and preserves focus in the active input when clicked; the rest of the workspace remains usable.

## What Schmierpapier can do

### Calculating in cells

- Cross out factors: select a region with a red dashed preview and strike it diagonally in the pen colour; Esc cancels.
- A4 squared paper with 5 mm cells and margin lines.
- One normal character per cell; navigate with arrow keys or mouse clicks.
- Enter digits using the top number row or numeric keypad, and letters using the keyboard.
- Embedded handwriting font and four pen colours: black, blue, green and red.
- Superscripts, multi-digit exponents, subscripts and carry digits, including persistent writing modes. Active modes pulse; reduced-motion settings use a static outline.
- Round, square, curly and angle brackets through main buttons and arrow menus, including double-height forms spanning two cells.
- Square roots and comparison signs such as `=`, `≠`, `<`, `>`, `≤`, `≥` and `≈`, also in double-height forms.
- Special equals signs across two vertically adjacent cells for fraction calculations.
- Indefinite and definite integrals at normal or double height. Hold I for the menu; definite integrals are on the right. Enter the lower and upper limits in order (1–16 characters each, without spaces). Limits survive `.schmier` files, copies, PDF and printing. Nothing is calculated.
- Greek names in integral limits are replaced automatically: pi, omega, alpha, beta, phi, theta, psi, tau, lambda, rho, sigma, xi and zeta. The first letter determines case regardless of the remaining letters: omega → ω, Omega → Ω, 2pi → 2π, -Pi/2 → -Π/2. Complete names are recognised next to numbers and operators; other words remain unchanged. The 16-character limit applies after replacement.
- Symbol menus for logic (hold L, default ∧), set theory (hold M, default ∈) and miscellaneous symbols (hold Z, default %, plus &, ∀, ∃, ∄). The main button writes the default; its arrow opens selection, arrows/Enter or clicks choose, Esc closes. Hold U now toggles double-height text; & stays in the symbol menu.
- Greek letters: the π button inserts Pi; its arrow or holding P in a cell opens the Greek menu. Use arrows and Enter to choose, Esc to close; a short P still writes p. Ctrl/Shift insert subscript/superscript.
- Mathematical notation using `·` for multiplication and `:` for division.

### Drawing and highlighting

- Horizontal and vertical pen lines on squared paper.
- Diagonal pen lines are also available on millimetre paper, snapping every 1 mm.
- Extend lines without creating duplicate sections; remove fully retraced sections.
- Pink, neon yellow and neon green highlighters.
- An eraser for highlights and drawn strokes. Delete or Backspace removes written characters.
- Copy regions containing text, colours and drawings, or move them with the scissors tool.
- Undo and redo.

### Geometry tools

- **Set square:** transparent and drawn to scale relative to the paper. Drag its zero point to move it, drag a vertex to rotate it and hold the right mouse button to draw along its edges. A red dashed preview makes the current stroke visible. In Double page view, drag the set square directly onto the other page.
- **Compass:** place the centre, choose a free radius and hold the right mouse button to draw circles or arcs. An arc drawn in one continuous gesture can be erased as a whole. While choosing the radius, optionally show the set square at the centre: the set-square button pulses to indicate this measuring guide. It rotates with the pointer and disappears when the radius is confirmed.
- **Number lines and coordinate axes:** draw horizontal or vertical lines with arrows and ticks. When number lines cross at right angles, their ticks align with the shared origin. Labels are entered by hand; numbers are never filled in automatically. After two number lines, the application returns to the previous tool.

### Pages and view

- Multiple pages in one document, displayed individually or as a double page. A soft blue glowing outline marks the active page in Double page view.
- Add squared pages directly; use the adjacent dropdown arrow to choose millimetre paper.
- Paper type is fixed when a page is created. Both types can appear in the same document.
- On millimetre paper, the relevant drawing tools snap every 1 mm. Writing cells remain 5 mm wide.
- Zoom, automatic fit to window width and fullscreen. Zooming in centres the selected cell in view. Hold + or - to zoom by ten percentage points; short presses still write arithmetic signs.
- Interface, tooltips, help and tutorial in **German, English and French**. On first use, a supported browser language is selected when possible; a manual selection is remembered in the browser if storage is allowed.

## Saving and sharing

- **Save .schmier** downloads an editable file with all pages and their contents. Reopen it later using **Load file**.
- **Export PDF** exports all actual pages as an A4 document. PDF pages are images; their text cannot be selected as ordinary PDF text.
- **Print** opens the browser print dialog. For drawings with accurate physical measurements, select A4 and actual size or 100%.
- After consent, the app attempts to autosave in local browser storage. Availability when opening a local HTML file depends on the browser and its settings. Download a `.schmier` file for an independent backup.

The application does not transmit calculations to a server. Changing the language does not alter entered text, labels or drawings.

## Browser storage and consent

On first launch, the app asks whether documents and preferences (language, page view and zoom) may be stored locally in the browser. It sets no cookies. Only after consent are these data and the consent itself saved.

With **“Do not save”**, everything stays only in memory until the page is closed or reloaded. Existing browser data for this app is deleted. The refusal itself is not stored, so the question appears again next time. Use the **shield-shaped storage button in the header** to change your decision at any time. Explicitly requested `.schmier` and PDF downloads and printing still work.

The storage consent prompt uses the preferred supported browser language independently of the app language. It includes all **24 official EU languages**, with English as fallback. The rest of the application remains available in German, English and French.

## Useful keyboard shortcuts

| Input | Action |
| --- | --- |
| Arrow keys | Move one cell |
| Enter | Next row at the column last selected by navigation or clicking |
| Numpad Enter | Write `=` |
| Shift + digit | Write a superscript digit |
| Ctrl + digit | Write a subscript or carry digit |
| Ctrl + Enter / Shift + Enter | Equals sign across the lower / upper cell boundary |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + S | Download a `.schmier` file |
| F1 | Open help |
| Hold + / - | Zoom in/out by ten percentage points; zooming in centres the selected cell |
| Hold 1–4 | Choose pen: black, blue, green, red |
| Hold 8 / 9 | Opening / closing bracket menu |
| Hold P | Greek-letter menu, π preselected |
| Hold Enter | Comparison-sign menu |
| Hold I | Integral menu: Up/Down for size, Left/Right for indefinite/definite; enter limits in order |
| Hold U | Toggle double-height numbers and letters |
| Hold L / M / Z | Choose logic / set theory / miscellaneous symbols |
| Hold Shift alone and release | Toggle superscript |
| Hold Ctrl alone and release | Toggle subscript |
| Left+Right together | Start/confirm horizontal line |
| Up+Down together | Start/confirm vertical line |
| Hold R | Start an eraser region; hold again to confirm |
| Hold C / X | Select and confirm a copy/cut source; Enter or another hold pastes at the destination |
| Hold PageUp / PageDown | Previous / next page |
| Hold Insert | Paper menu: squared by default, or millimetre |
| Hold Delete | Delete the current page after confirmation; the last page is kept |
| Hold D | Toggle single/double page view |
| Hold E | Export all pages as PDF |
| Esc | Cancel preview, selection or menu; exit tutorial |

**Hold** means about 0.6 seconds in an active writing cell, without modifiers. Short digit and letter input is preserved; short Delete erases cell content. Ctrl/Shift toggles commit only on release if no other key or mouse click was used. Hold shortcuts do not apply in names, search or label fields. While drawing a keyboard line, arrows change its length and cell edge; Esc discards the preview. A clockwise progress frame on the matching button shows the Shift/Ctrl hold time; a full frame means ready. Early release, another key, a click or loss of focus cancels the hold.

The built-in, searchable help contains the full instructions. The tutorial uses a separate practice document and restores your own document afterwards.

## Tutorial

The tutorial uses a separate practice document, preserving your own work. Row 1, column 1 is initially active; the first navigation target is row 6, column 5. It introduces the movable on-screen numeric keypad early; using it afterwards is optional.

Practise `(12 + 8) · 3 = 60`, underlining, `2/4 = 1/2`, `2¹² = 4096`, `3 ≠ π`, copying, moving, page view, saving and PDF export. Highlighters and the eraser remain available in the app but are not tutorial exercises.

Click gold target cells or reach them with arrows, Tab and Home/End. Reaching a target advances automatically, without Enter. Copy/move exercises also paste automatically at the correct destination; outside the tutorial, manual confirmation is still required. The tutorial explains mouse and keyboard alternatives for pens, brackets, superscripts, lines, copying and moving. Incorrect actions are blocked and explained.

The save exercise accepts Ctrl+S, also ⌘+S on Mac. Hold E to export PDF, or D to change view in its matching exercise. Downloads contain practice pages only. Esc exits the tutorial and restores your document, including from the final screen.

## Development and build

**Edit the sources under `src/`, not the generated `schmierpapier.html`.** Users still need only the finished HTML file; only development requires a build. Requirement: **Python 3.10 or newer**, with no extra packages, Node.js or internet access.

From the project root:

```sh
python3 build.py
python3 build.py --watch
python3 build.py --check
python3 -m unittest discover -s src/tests -v
```

- `python3 build.py` generates the current `schmierpapier.html`.
- `--watch` rebuilds automatically after saving source changes. Stop with Ctrl+C; reload the finished file in your browser.
- `--check` verifies that the output matches the sources without writing. A stale build returns a failure status.
- The last command tests reproducibility, missing sources/translations, embedded assets and automatic rebuilding.

On Windows, use `py -3` instead of `python3` if needed. An alternative output is possible with `python3 build.py --output /tmp/schmierpapier-test.html`.

| Source | Responsibility |
|---|---|
| `src/index.html`, `src/styles.css` | HTML structure and presentation |
| `src/js/*.js` | Feature files; all brackets together in `brackets.js` |
| `src/js/file-io.js`, `src/js/export.js` | Reading/saving and PDF/printing |
| `src/js/basics.js`, `src/js/keyboard.js`, `src/js/regions.js` | Shared foundations, keyboard control and region selection |
| `src/i18n/de.js`, `en.js`, `fr.js` | Interface, help, tutorial and messages for each language |
| `src/i18n/consent-eu.js` | Additional EU languages for the storage notice |
| `src/assets/` | Fonts and logos embedded during the build |
| `src/version.txt`, `src/build.json` | Development version, sources and assembly order |

Features may contain several `// @part` sections. The manifest assembles them in the established order into one classic script with shared scope. New JS files must be listed there. Language files share the same UI keys; the build reports missing translations or help articles. Output is replaced only after successful validation; a failed build leaves the last good HTML untouched. `--check` does not replace browser functional tests.

Section, language-data and asset-placeholder details: [Source and assembly guide](src/README.md) (German). `src/index.html` contains placeholders and is not a runnable preview. The finished `schmierpapier.html` embeds all CSS, JavaScript, fonts and logos and remains fully offline. **Build and watch never upload anything.** The homepage directory remains independent.

Important changes keep all three READMEs, changelogs and affected help/tutorial texts aligned. Independent font licences remain in metadata and notices. The grid still uses one continuous SVG layer for consistent Firefox rendering.

## Licence

The application code is licensed under the **GNU General Public License, version 3 (GPL-3.0-only)**. The full licence text is in [LICENSE](LICENSE).

The embedded fonts retain their own licences: the modified [Caveat](https://github.com/googlefonts/caveat) under the SIL Open Font License 1.1, and the [DejaVu font](https://dejavu-fonts.github.io/) under its applicable font licence terms. Copyright and licence notices are preserved in the embedded font metadata.
