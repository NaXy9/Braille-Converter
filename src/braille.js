// English Grade 1 Braille
// Dot layout:  1 4
//              2 5
//              3 6
// Bits: bit 0 = dot1, bit 1 = dot2, ... bit 5 = dot6
export const EN_BRAILLE = {
  a: 0b000001, b: 0b000011, c: 0b001001, d: 0b011001,
  e: 0b010001, f: 0b001011, g: 0b011011, h: 0b010011,
  i: 0b001010, j: 0b011010, k: 0b000101, l: 0b000111,
  m: 0b001101, n: 0b011101, o: 0b010101, p: 0b001111,
  q: 0b011111, r: 0b010111, s: 0b001110, t: 0b011110,
  u: 0b100101, v: 0b100111, w: 0b111010, x: 0b101101,
  y: 0b111101, z: 0b110101,
  1: 0b000001, 2: 0b000011, 3: 0b001001, 4: 0b011001,
  5: 0b010001, 6: 0b001011, 7: 0b011011, 8: 0b010011,
  9: 0b001010, 0: 0b011010,
  ' ': 0b000000, '.': 0b110010, ',': 0b000010, '!': 0b010110,
  '?': 0b100110, ':': 0b010010, ';': 0b000110, '-': 0b100000,
  "'": 0b000100, '"': 0b000100, '/': 0b100100,
}

// Russian Braille (unified Russian standard)
export const RU_BRAILLE = {
  а: 0b000001, б: 0b000011, в: 0b111010, г: 0b001011,
  д: 0b011001, е: 0b010001, ж: 0b011011, з: 0b110101,
  и: 0b011010, й: 0b111011, к: 0b000101, л: 0b000111,
  м: 0b001101, н: 0b011101, о: 0b010101, п: 0b001111,
  р: 0b010111, с: 0b001110, т: 0b011110, у: 0b111010,
  ф: 0b001011, х: 0b101101, ц: 0b001001, ч: 0b111101,
  ш: 0b110001, щ: 0b110011, ъ: 0b011100, ы: 0b101110,
  ь: 0b001100, э: 0b100110, ю: 0b110110, я: 0b000001,
  ё: 0b011111,
  ' ': 0b000000, '.': 0b110010, ',': 0b000010, '!': 0b010110,
  '?': 0b100110, '-': 0b100000,
}

// Dot positions [col, row] within a cell (0-indexed)
export const DOT_POS = [
  [0, 0], // dot 1
  [0, 1], // dot 2
  [0, 2], // dot 3
  [1, 0], // dot 4
  [1, 1], // dot 5
  [1, 2], // dot 6
]

/**
 * Convert a single character to its Braille bit pattern.
 * Language is auto-detected: Cyrillic → Russian Braille, else English.
 */
export function charToBraille(ch) {
  const lower = ch.toLowerCase()
  const isCyrillic = /[а-яёА-ЯЁ]/.test(ch)
  let bits = isCyrillic ? RU_BRAILLE[lower] : EN_BRAILLE[lower]
  if (bits === undefined) bits = EN_BRAILLE[lower] ?? RU_BRAILLE[lower] ?? 0b000000
  return bits
}

/**
 * Wrap text into lines of at most `maxCols` cells.
 * Respects explicit newlines; wraps at word boundaries.
 */
export function wrapText(text, maxCols, singleLine = false) {
  const inputLines = text.split('\n')
  const lines = []

  for (const inputLine of inputLines) {
    if (singleLine) {
      lines.push(inputLine.split(''))
      continue
    }

    const words = inputLine.split(' ')
    let current = []

    for (const word of words) {
      const chars = word.split('')

      if (current.length > 0 && current.length + chars.length + 1 > maxCols) {
        lines.push(current)
        current = [...chars]
      } else {
        if (current.length > 0) current.push(' ')
        current.push(...chars)
      }

      if (current.length >= maxCols) {
        lines.push(current)
        current = []
      }
    }

    if (current.length > 0) lines.push(current)
  }

  return lines
}

/**
 * Build SVG markup string from the given settings.
 * Returns { svgMarkup, svgW, svgH, totalLines, cellCount }
 */
export function buildSVG({
  lines,
  dotRadius,
  cellW,
  cellH,
  lineSpacing,
  margin,
  colorDot,
  colorEmpty,
  showEmpty,
  showGuide,
  dotStroke = null, // optional: { color, width } — preview-only, not in exported SVG
}) {
  const dotColGap = cellW / 2
  const dotRowGap = cellH / 3
  const lineHeight = cellH + lineSpacing
  const totalLines = lines.length
  const maxLineLen = Math.max(...lines.map((l) => l.length), 1)
  const svgW = margin * 2 + maxLineLen * cellW
  const svgH = margin * 2 + totalLines * lineHeight - lineSpacing

  let guides = ''
  let dots = ''
  let cellCount = 0

  for (let li = 0; li < lines.length; li++) {
    const lineChars = lines[li]
    for (let ci = 0; ci < lineChars.length; ci++) {
      const bits = charToBraille(lineChars[ci])
      const x0 = margin + ci * cellW
      const y0 = margin + li * lineHeight

      if (showGuide) {
        guides += `<rect x="${x0}" y="${y0}" width="${cellW - 2}" height="${cellH - 2}" fill="none" stroke="#ddd" stroke-width="0.5" stroke-dasharray="2,2"/>`
      }

      for (let d = 0; d < 6; d++) {
        const [col, row] = DOT_POS[d]
        const cx = (x0 + (col + 0.5) * dotColGap).toFixed(1)
        const cy = (y0 + (row + 0.5) * dotRowGap).toFixed(1)
        const active = (bits >> d) & 1

        if (active) {
          const strokeAttrs = dotStroke ? ` stroke="${dotStroke.color}" stroke-width="${dotStroke.width}"` : ""; dots += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${colorDot}"${strokeAttrs}/>`;
          cellCount++
        } else if (showEmpty) {
          dots += `<circle cx="${cx}" cy="${cy}" r="${(dotRadius * 0.55).toFixed(2)}" fill="${colorEmpty}"/>`
        }
      }
    }
  }

  const svgMarkup =
    `<svg xmlns="http://www.w3.org/2000/svg" ` +
    `width="${svgW}" height="${svgH}" ` +
    `viewBox="0 0 ${svgW} ${svgH}" ` +
    `shape-rendering="geometricPrecision">` +
    guides +
    dots +
    `</svg>`

  return { svgMarkup, svgW, svgH, totalLines, cellCount }
}
