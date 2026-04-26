# Braille Converter

Convert English and Russian text into clean, transparent SVG Braille artwork — built for designers.

## Features

- **Auto language detection** — Cyrillic characters use Russian Braille standard; Latin uses English Grade 1. Mixed text works seamlessly.
- **Transparent SVG export** — downloaded files have no background, just dots. Drop them onto any surface in your design tool.
- **Full typographic control** — dot radius, cell width/height, line spacing, margin.
- **Color pickers** — filled dot color and empty dot color.
- **Layout modes** — word-wrap with configurable max width, or single-line.
- **Cell guides** — toggle a dashed grid overlay for alignment reference.
- **Zoom** — preview at 30%–400%.
- **Copy SVG code** — paste directly into Figma, Illustrator, or any editor.

## Stack

- **React 18** + **Vite 5** — fast dev, instant HMR
- **Tailwind CSS 3** — utility-first styling
- **DM Mono** + **Unbounded** — Google Fonts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── braille.js          # Lookup tables + SVG generation logic (pure functions)
├── useSettings.js      # All control state in one hook
├── useSVGExport.js     # Download + clipboard export logic
├── App.jsx             # Root layout (header + panels)
├── index.css           # Tailwind directives + global styles
├── main.jsx            # Entry point
└── components/
    ├── ControlsPanel.jsx   # Left sidebar with all controls
    ├── PreviewPanel.jsx    # Right side: SVG canvas, zoom, stats
    ├── SectionLabel.jsx    # Styled section heading
    ├── SliderRow.jsx       # Labelled range slider
    └── ColorSwatch.jsx     # Color picker with label
```

## Braille Standards

- **English**: Grade 1 Braille (uncontracted), covering a–z, 0–9, common punctuation.
- **Russian**: Unified Russian Braille standard (1993), covering а–я, ё, common punctuation.

## Extending

To add Grade 2 English contractions or additional languages, extend the lookup tables in `src/braille.js` and update `charToBraille()`.
