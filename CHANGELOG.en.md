# Changelog

[Deutsch](CHANGELOG.md) · **English** · [Français](CHANGELOG.fr.md)

## v0.6.5

- Double-height writing applies to all symbols, including logic, sets, currencies, punctuation and ↯. Attached commas and dots remain small.

- Startup note about Shift with an optional “do not remind me” choice; more punctuation and currency signs, plus the contradiction symbol in the symbol menus.

- Optional dark paper in dark mode: enable it in settings; off by default. PDF and print stay light.

- Root and integral menus use compact icons with separate size arrows; all symbols fit inside their buttons.

- Number-line label fields use dark backgrounds and light text in dark mode; paper and stored label colours remain unchanged.

- Holding G or K switches off the active set square or compass respectively; a short press still confirms the step.

- The point tool automatically switches off after placing or editing a point. Activate it again for another point.

- Consistent confirmation with Enter or the tool key; text dialogs wait for held keys to be released.

- The line-style button always shows only the active format: a solid or a dashed line.
- A line-style button and holding J switch new pen, ruler and compass strokes and number-line stems between solid and dashed. Stored strokes retain their style; fraction bars and maths symbols remain solid.
- Place labelled construction points by button or holding H. Mouse and keyboard snap at 5 mm, or 1 mm on millimetre paper; Enter asks for the label. Placing again edits the existing point.
- Styles and points work with .schmier, browser storage with consent, region copies, eraser, undo, PDF and print. Updated German, English and French help and key hints. Older documents still open.
- v0.6.5 released. Website updated in all six text variants; the live app and download contain the current release.

## v0.6

- After confirming a keyboard erase area (hold R again), the last pen and its colour are restored automatically.
- Fraction button and hold V: enter numerator and denominator as ordinary cell characters with a matching fraction bar. Grid-based centring, one undo step and no automatic calculation.
- Optional Linux Mint Cinnamon theme using the Schmierpapier dark palette in the separate linux-mint-theme folder, with installation and switching-back instructions.
- Pen, highlighter, eraser and Greek-symbol buttons also use dark backgrounds in dark mode, with readable icon colours. Actual ink colours are unchanged.
- Clicking the active eraser again returns to the last pen and its colour. Any pending keyboard erase selection is cancelled. Holding R still starts an erase area; holding R again confirms it.
- The eraser removes touched images as a whole. This also applies to the erase area selected by holding R; partial overlap is enough. Undo restores erased images.
- Zooming and panning preserve the original resolution. Only Apply removes invisible parts and resamples the finished crop to the chosen DPI resolution.
- The T… hint above the shortcut-hints button stays visible even when the other hints are switched off.
- The T… hint above the shortcut-hints button stays visible even when the other hints are switched off.
- Dark mode can follow the system/browser; choose Light, Dark or System in settings. Paper, PDF and print keep light colours.
- Parallel symbol ∥ added to Miscellaneous symbols.
- Holding B now inserts an image instead of New file, which remains available via its button and Ctrl+N. Select cells by mouse or arrows, choose a raster image, then adjust with wheel/+− and dragging/arrows. Enter applies, Esc cancels. Double-click to adjust again or delete.
- Settings offer 100–600 dpi, default 300. Images initially cover the area proportionally; later adjustments may leave space. Embedded crops are preserved in .schmier, browser backups, history, full-area copies, PDF and print.
- Published v0.6. Updated all six homepage text variants; the live app and download use the same current build.

## v0.5.5

- At the top and bottom, a new toolbar row always starts after Tutorial.
- Choose the top, bottom, left or right edge for the toolbar in settings. Top remains the default.
- Side panels adapt their width to window height, language and browser zoom, adding columns as needed. All buttons remain visible without scrolling the toolbar; separator lines preserve functional groups.
- The paper area, automatic zoom, symbol menus, shortcut hints, on-screen keypad and tutorial account for the position. PDF and print still contain only the pages.
- The position is part of preferences: stored locally with consent and included in .schmier files. Older preferences use Top.
- Published v0.5.5. The homepage summarises the 0.5 series in all six text variants; the live app and download use the current build.

## v0.5

- Released v0.5. Updated homepage release copy in all six text variants with concise user benefits; the live app and download use the same current build.
- Hold F to open settings, with a progress border and shortcut hint. A short F still types text; Ctrl/⌘+F still opens browser search.

- Moved commas and full stops slightly to the right to leave more space for subscripts; screen, PDF and print use the same position.
- Commas and full stops appear at the bottom right of their owner cell, leaving adjacent cells available for the next digit. Punctuation that occupies a cell is available through Miscellaneous symbols.
- Exercise labels such as 1a) fit across two cells, optionally double height; longer text shrinks automatically. Hold A to choose the size.
- Settings (gear button) offer a 200–3000 ms key-hold duration and handwriting or an embedded console font. Help and tutorial show the configured duration. Both fonts work offline, including PDF and print.
- Files and browser backups record the saving app version and font/hold settings. Opening older documents shows newer release summaries; old files without version information remain readable. Browser storage still requires consent.
- The set square shows enlarged scale readings at line start and end: while moving along the edge by keyboard, or near the edge with the mouse. It does not calculate line length.


## v0.4.4

- Released v0.4.4; updated homepage release notes in all six text variants with concise user benefits.
- Added the tutorial exercise 2 1/2 + 1/2 = 3: double-height whole numbers, plus and equals via U or button; normal numerators/denominators and fraction bars by mouse or keyboard. Navigation and the on-screen keypad remain available.
- Protected the transition from parameter prompts to variable-height placement: delayed key, click and focus events from native dialogs no longer commit or discard the preview. This covers definite integrals and indexed roots; placement responds only to fresh input after the dialog.
- The U writing mode now enlarges arithmetic, comparison, percent and per-mille signs too. This works with the keyboard, numeric keypad and symbol buttons; Ctrl/Shift+Enter keeps its fraction-equals function.
- The Miscellaneous symbols menu (hold Z) also includes ‰ (per mille) and ± (plus–minus, plus above minus).
- Root and integral menus now share the five bracket size rows: variable height above, double height above, normal (preselected), double height below and variable height below. Hold Q for roots or I for integrals, or use their menu arrows. Square roots/indefinite integrals are on the left; indexed roots/definite integrals are on the right. Arrows select a tile; Enter confirms.
- For variable height, the root degree or lower and upper integration limits are requested first. Cancellation changes nothing. The active cell then remains the start: Up/Down chooses the target row and Enter commits, or click the target row. The column stays fixed; Esc discards the red dashed preview. Degree and limits are previewed and attached at the final ends. Greek names in limits are still replaced, such as 2pi → 2π. Roots end at the top-right corner without a hook so a line can extend them. Save/load, whole-symbol copying, undo, PDF/printing and deletion from any occupied cell respect the full height. Previews are never saved or exported.
- The new Double-height text button, or holding U for about 0.6 seconds, toggles a persistent writing mode. A clockwise frame shows the hold time; the active button pulses, or stays outlined with reduced motion. A short U still writes u. Numbers and letters, including Greek letters, span two cells down from the current cell, one column per character. Writing advances right; Enter and automatic wrapping advance two rows while enabled. Hold U again or click the button to turn it off. For a mixed fraction, write the large whole-number 1, turn the mode off, then add the ordinary fraction beside it.
- Arithmetic and comparison signs such as +, −, ·, :, /, =, ≠, <, >, ≤, ≥, ≈, ≡, ∝, ±, ∓, % and ‰ are also double-height; punctuation stays normal-height. Persistent sub/superscript and double-height modes are mutually exclusive; individual Ctrl/Shift digits still allow small annotations. No half character is written at the bottom edge: choose a cell higher up. Large letters/numbers can be deleted from either cell, fully copied/cut, undone and preserved in .schmier, PDF and printing. U replaces the former direct ampersand shortcut; & remains in Miscellaneous symbols (hold Z). Names, searches and labels retain ordinary text entry. The tutorial temporarily resets the mode and restores it afterwards.
- Bracket menus now have five size rows: variable height above, double height above, normal (preselected), double height below and variable height below. Each row offers round, square, curly and angle brackets. Open with the menu arrow or hold 8/9; arrows select shape and row, Enter confirms the choice. For the tutorial calculation, still use the normal round bracket in the middle.
- For variable height, the cell active when height selection begins remains the starting cell. Up/Down moves the endpoint by whole cells within the chosen direction; heights from one cell to the page edge are available. A red dashed bracket previews the result; Enter commits it. Alternatively click the target row on the same page; the bracket stays in the starting column. Moving the mouse over the paper previews the target height before clicking. Esc, clicking outside the paper or leaving the window cancels without changing the document. Writing then continues to the right of the starting cell. Active sub/superscript mode does not change the selected bracket height.
- The entire bracket belongs to all occupied cells and can be deleted from any of them with Delete or Backspace. Undo/redo and .schmier files preserve its height. Select the full bracket span to copy or cut it; partial regions do not include it. PDF and printing include only committed brackets, not previews. Older documents with double-height symbols still load; older app versions cannot reliably display variable heights.

## v0.4.3

- Released v0.4.3; homepage release notes summarise user benefits in all six text variants.
- Moved subscript and superscript buttons directly before the equals sign in the symbol toolbar.
- Reordered the symbol toolbar: after the set square comes a separator, then comparisons, opening/closing brackets, roots, integrals, miscellaneous symbols, set theory and logic. Greek letters follow.
- All hold-key shortcuts show their wait as a clockwise progress frame on the corresponding button, including pen colours, highlighters, brackets and symbol menus, geometry tools, region tools, pages, zoom, files, PDF and key hints. After about 0.6 seconds the action runs and the frame disappears. Early release or cancellation removes it; short input keeps its normal function. For Shift/Ctrl the full frame remains until release, when the mode toggles. Direct mouse clicks need no hold time. The indicator also works in the tutorial and is excluded from documents, PDF and printing.
- Greek names in integral limits are replaced automatically: pi, omega, alpha, beta, phi, theta, psi, tau, lambda, rho, sigma, xi and zeta. The first letter determines case regardless of the remaining letters: omega → ω, Omega → Ω, 2pi → 2π, -Pi/2 → -Π/2. Complete names are recognised next to numbers and operators; other words remain unchanged. The 16-character limit applies after replacement.
- Added definite integrals to the three-row integral menu: indefinite on the left, definite on the right; normal in the middle, double height above/below. Lower and upper limits are entered in sequence like a root degree. Cancellation leaves data unchanged; limits survive save/load, copy, undo, PDF and printing and are deleted with the integral.
- New symbol menus: hold L for logic (default ∧), M for set theory (∈), Z for miscellaneous symbols (%). Combined & and %; added ∀, ∃ and ∄. Arrow/click or arrows/Enter select, Esc cancels; short letters and Ctrl+Z are preserved. Hold U remains a direct & shortcut. Extended the embedded offline symbol font while preserving its independent licence.
- Holding Shift/Ctrl shows a clockwise progress frame until ready to latch. Toggling still occurs on release; other input or loss of focus cancels. Updated key hints, built-in help and READMEs in all three languages. No upload.

- Development sources split under `src/`: HTML template, CSS, feature-specific JavaScript, shared foundations and one language file each for German, English and French. Brackets stay together; reading/saving and PDF/printing have their own files.
- Fonts and logos are source assets embedded without modification; the generated `schmierpapier.html` remains a single offline file. A manifest preserves the existing event and startup order.
- Added a reproducible Python build without extra packages: one-shot builds, automatic rebuilds with `--watch` and freshness verification with `--check`. Missing sources, sections and translations are reported; errors preserve the last good output.
- Documented source layout and build workflow in all three READMEs; added automated build tests. App version now comes from `src/version.txt`, set to 0.4.3. No publication or upload as part of this migration.

## v0.4.2

- Superscripts start slightly farther right; longer exponents extend rightwards beyond the cell border. They remain attached to their original cell, with matching PDF and print alignment.

- New wordmark logo and matching favicons added to the app and homepage. The app embeds its graphics directly and remains a single offline HTML file.

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
- Keyboard number lines: holding N starts a red arrow preview. Arrows and direction chords control and confirm the axis; holding N again also confirms. Manual labels, shared origins and return after two axes are preserved.

## v0.4

- Square-root button immediately after the brackets: its outline ends exactly at the top-right grid corner and can be extended with a pen line.
- Equals button with comparison-sign menu (=, ≠, <, >, ≤, ≥, ≈, ≡, ∝). Holding Enter opens the menu; short presses retain their usual behaviour.
- Roots and comparison signs support Ctrl/Shift for double-height forms, deletion from either cell, saving, copying, PDF and printing.
- Two main bracket buttons ( / ) with arrow menus for round, square, curly and angle brackets. Hold 8/9 for opening/closing bracket menus. Both number rows work; short digit input and Ctrl/Shift for subscripts/superscripts are preserved.
- Greek letters use a π main button and a tile menu matching the equals menu. Holding P opens it; short P remains text input. Ctrl/Shift and superscript/subscript modes are preserved.
- Keyboard lines have a red dashed preview: Left+Right for horizontal, Up+Down for vertical. Arrows adjust length and edge; repeat the pair to confirm, Esc to cancel. The current cell remains fully included in every direction. Horizontal lines start at the bottom edge.
- The grid-corner hit area is calculated relative to cell size and scales with page and browser zoom.
- Main Enter moves to the next row at the column last chosen by navigation or clicking. Automatic movement while typing does not change that column.
- Hold 1–4 in a writing cell to choose black, blue, green or red. Short digit input and Ctrl/Shift are preserved; both number rows are supported.
- Hold Shift/Ctrl alone and release to toggle superscript/subscript. Shortcuts are unchanged; the toggle commits only on release.
- Pressing Ctrl/Shift alone immediately highlights its button in yellow; the outline strengthens after the hold threshold. Release, a shortcut, a click or focus loss clears the preview. Active superscript/subscript pulses, or uses a static outline with reduced motion.
- Hold R to select a region for erasing highlights and lines. Arrows select, holding again confirms; writing is preserved.
- Hold C/X to select copy/cut regions. Hold again to confirm the source, use arrows for the destination, then Enter or another hold to paste. Esc cancels.
- Hold PageUp/PageDown for previous/next page. Hold Insert for the paper menu with squared paper selected by default; hold Delete to delete a page after confirmation.
- Hold E to export PDF, D to toggle single/double page view. Short e/d input is preserved.
- Tutorial: mouse and keyboard alternatives for lines, pen selection, superscripts, brackets, copying and moving. A new “3 ≠ π” exercise explains the sign menus, including held Enter/P. Incorrect inputs are blocked and explained.
- Tutorial streamlined: highlighter and eraser exercises removed. Reach target cells by keyboard to advance automatically without Enter. Ctrl/⌘+S is allowed when saving; E and D work in the matching exercises. Esc exits even when the final button has focus.
- Footer credit “By Benni ♥ Kirstin”, with & inside the heart.
- Help, tutorial and README updated in German, English and French. The changelog is also available in all three languages.
- Press N to skip opening the on-screen keypad in the tutorial; N remains unchanged outside the tutorial.
- The tutorial starts with cell 1,1 active; its first exercise navigates to the calculation’s starting point at row 6, column 5.
- Target-cell steps advance on clicking or keyboard arrival. Tutorial copy/move exercises also paste on reaching the destination; confirmation outside the tutorial is unchanged.
- Zooming in centres the selected cell in view. Hold + / - to zoom in/out by ten percentage points; short presses remain arithmetic input.
- README and homepage prominently clarify that Schmierpapier is not a calculator and does no arithmetic for students.
