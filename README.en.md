# Schmierpapier

[Deutsch](README.md) · **English** · [Français](README.fr.md)

**Digital maths paper for people who cannot use ordinary paper in maths lessons.**

Schmierpapier provides a place to calculate, experiment and draw directly in the browser. It is intended particularly for students for whom writing or drawing on paper is impossible or difficult because of motor impairments, involuntary movements or other individual circumstances.

The application supports independent work in maths lessons: use the keyboard and mouse to write calculations in cells, arrange fractions clearly and draw geometric constructions with digital tools. Many features are available through buttons, so a keyboard shortcut is not required for every action.

By **Mr Neuberg from Tech-IT** · Version **0.3**

## Getting started

1. Download [schmierpapier.html](schmierpapier.html). On GitHub, open the file and choose **“Download raw file”**.
2. Open the downloaded HTML file in a current browser, for example by double-clicking it.
3. Click a cell and start typing. The built-in **Help** explains all features and keyboard shortcuts. The **Tutorial** introduces the main tools through practical exercises.

No installation, account or server is required. The application consists of a single HTML file. JavaScript, fonts, translations, help and tutorial are embedded; everything works offline.

## What Schmierpapier can do

### Calculating in cells

- A4 squared paper with 5 mm cells and margin lines.
- One normal character per cell; navigate with arrow keys or mouse clicks.
- Enter digits using the top number row or numeric keypad, and letters using the keyboard.
- Embedded handwriting font and four pen colours: black, blue, green and red.
- Superscripts, multi-digit exponents, subscripts and carry digits, including persistent writing modes.
- Round, square and curly brackets, including double-height versions spanning two cells.
- Special equals signs across two vertically adjacent cells for fraction calculations.
- Buttons for integrals, Greek letters, `&` and `%`.
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
- **Compass:** place the centre, choose a free radius and hold the right mouse button to draw circles or arcs. An arc drawn in one continuous gesture can be erased as a whole.
- **Number lines and coordinate axes:** draw horizontal or vertical lines with arrows and ticks. When number lines cross at right angles, their ticks align with the shared origin. Labels are entered by hand; numbers are never filled in automatically. After two number lines, the application returns to the previous tool.

### Pages and view

- Multiple pages in one document, displayed individually or as a double page.
- Add squared pages directly; use the adjacent dropdown arrow to choose millimetre paper.
- Paper type is fixed when a page is created. Both types can appear in the same document.
- On millimetre paper, the relevant drawing tools snap every 1 mm. Writing cells remain 5 mm wide.
- Zoom, automatic fit to window width and fullscreen.
- Interface, tooltips, help and tutorial in **German, English and French**. On first use, a supported browser language is selected when possible; a manual selection is remembered in the browser.

## Saving and sharing

- **Save .schmier** downloads an editable file with all pages and their contents. Reopen it later using **Load file**.
- **Export PDF** exports all actual pages as an A4 document. PDF pages are images; their text cannot be selected as ordinary PDF text.
- **Print** opens the browser print dialog. For drawings with accurate physical measurements, select A4 and actual size or 100%.
- The app attempts to autosave in local browser storage. Availability when opening a local HTML file depends on the browser and its settings. Download a `.schmier` file for an independent backup.

The application does not transmit calculations to a server. Changing the language does not alter entered text, labels or drawings.

## Useful keyboard shortcuts

| Input | Action |
| --- | --- |
| Arrow keys | Move one cell |
| Enter | Start of the next row |
| Numpad Enter | Write `=` |
| Shift + digit | Write a superscript digit |
| Ctrl + digit | Write a subscript or carry digit |
| Ctrl + Enter / Shift + Enter | Equals sign across the lower / upper cell boundary |
| Ctrl + Z | Undo |
| Ctrl + Y | Redo |
| Ctrl + S | Download a `.schmier` file |
| F1 | Open help |

The built-in, searchable help contains the full instructions. The tutorial uses a separate practice document and restores your own document afterwards.

## Development

The application deliberately stays in one HTML file. HTML, CSS and JavaScript are formatted for readability, with section comments explaining document structure, coordinates, drawing tools, storage and translations. Embedded fonts remain compact Base64 data. No build step is required. Important changes are reflected in all three READMEs and the affected built-in help texts together.

## Licence

The application code is licensed under the **GNU General Public License, version 3 (GPL-3.0-only)**. The full licence text is in [LICENSE](LICENSE).

The embedded fonts retain their own licences: the modified [Caveat](https://github.com/googlefonts/caveat) under the SIL Open Font License 1.1, and the [DejaVu font](https://dejavu-fonts.github.io/) under its applicable font licence terms. Copyright and licence notices are preserved in the embedded font metadata.
