# Changelog

[Deutsch](CHANGELOG.md) · **English** · [Français](CHANGELOG.fr.md)

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
