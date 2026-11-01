# Changelog

[Deutsch](CHANGELOG.md) · **English** · [Français](CHANGELOG.fr.md)

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
