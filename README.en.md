# Schmierpapier

[Deutsch](README.md) · **English** · [Français](README.fr.md)

Changes: [Changelog](CHANGELOG.en.md).

**Try it now:** [Live demo in your browser](https://htmlpreview.github.io/?https://github.com/newboerg/schmierpapier/blob/main/schmierpapier.html) – no download needed. For offline use, download the HTML file as described below.

**Digital maths paper for people who cannot use ordinary paper in maths lessons.**

**Important: Schmierpapier is not a calculator and does not do any arithmetic for students.** It does not calculate answers or solve tasks automatically. Students work out their own methods, intermediate steps and solutions; the app provides digital paper and tools for writing and drawing.

Schmierpapier provides a place to calculate, experiment and draw directly in the browser. It is intended particularly for students for whom writing or drawing on paper is impossible or difficult because of motor impairments, involuntary movements or other individual circumstances.

The application supports independent work in maths lessons: use the keyboard and mouse to write calculations in cells, arrange fractions clearly and draw geometric constructions with digital tools. Many features are available through buttons, so a keyboard shortcut is not required for every action.

Version **0.4**

Project website: [schmierpapier.org](https://schmierpapier.org). The logo in the app header opens it in a new tab.

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
- Buttons for integrals, Greek letters, `&` and `%`. The π button inserts Pi; its arrow or holding P in a cell opens the Greek menu. Use arrows and Enter to choose, Esc to close; a short P still writes p. Ctrl/Shift insert subscript/superscript.
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

**Hold** means about 0.6 seconds in an active writing cell, without modifiers. Short digit and letter input is preserved; short Delete erases cell content. Ctrl/Shift toggles commit only on release if no other key or mouse click was used. Hold shortcuts do not apply in names, search or label fields. While drawing a keyboard line, arrows change its length and cell edge; Esc discards the preview.

The built-in, searchable help contains the full instructions. The tutorial uses a separate practice document and restores your own document afterwards.

## Tutorial

The tutorial uses a separate practice document, preserving your own work. Row 1, column 1 is initially active; the first navigation target is row 6, column 5. It introduces the movable on-screen numeric keypad early; using it afterwards is optional.

Practise `(12 + 8) · 3 = 60`, underlining, `2/4 = 1/2`, `2¹² = 4096`, `3 ≠ π`, copying, moving, page view, saving and PDF export. Highlighters and the eraser remain available in the app but are not tutorial exercises.

Click gold target cells or reach them with arrows, Tab and Home/End. Reaching a target advances automatically, without Enter. Copy/move exercises also paste automatically at the correct destination; outside the tutorial, manual confirmation is still required. The tutorial explains mouse and keyboard alternatives for pens, brackets, superscripts, lines, copying and moving. Incorrect actions are blocked and explained.

The save exercise accepts Ctrl+S, also ⌘+S on Mac. Hold E to export PDF, or D to change view in its matching exercise. Downloads contain practice pages only. Esc exits the tutorial and restores your document, including from the final screen.

## Development

The application deliberately stays in one HTML file. HTML, CSS and JavaScript are formatted for readability, with section comments explaining document structure, coordinates, drawing tools, storage and translations. Embedded fonts remain compact Base64 data. No build step is required. Important changes are reflected together in all three READMEs, all three changelogs and the affected help and tutorial texts.

The on-screen grid uses a continuous SVG layer so its lines remain consistent at different zoom levels in Firefox.

## Licence

The application code is licensed under the **GNU General Public License, version 3 (GPL-3.0-only)**. The full licence text is in [LICENSE](LICENSE).

The embedded fonts retain their own licences: the modified [Caveat](https://github.com/googlefonts/caveat) under the SIL Open Font License 1.1, and the [DejaVu font](https://dejavu-fonts.github.io/) under its applicable font licence terms. Copyright and licence notices are preserved in the embedded font metadata.
