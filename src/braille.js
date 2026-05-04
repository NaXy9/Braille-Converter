// English Grade 1 Braille
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

// Russian Braille
export const RU_BRAILLE = {
  а: 0b000001,
  б: 0b000011,
  в: 0b111010,
  г: 0b011011,
  д: 0b011001,
  е: 0b010001,
  ж: 0b011010,
  з: 0b110101,
  и: 0b001010,
  й: 0b101111,
  к: 0b000101,
  л: 0b000111,
  м: 0b001101,
  н: 0b011101,
  о: 0b010101,
  п: 0b001111,
  р: 0b010111,
  с: 0b001110,
  т: 0b011110,
  у: 0b100101,
  ф: 0b001011,
  х: 0b010011,
  ц: 0b001001,
  ч: 0b011111,
  ш: 0b110001,
  щ: 0b101101,
  ъ: 0b110111,
  ы: 0b101110,
  ь: 0b111110,
  э: 0b101010,
  ю: 0b110011,
  я: 0b101011,
  ё: 0b100001,
  ' ': 0b000000, '.': 0b110010, ',': 0b000010, '!': 0b010110,
  '?': 0b100110, '-': 0b100000,
}

// Grade 2 (UEB) contractions
const WORD_SIGNS = {
  'but':       '\u2803',
  'can':       '\u2809',
  'do':        '\u2819',
  'every':     '\u2811',
  'from':      '\u280b',
  'go':        '\u281b',
  'have':      '\u2813',
  'just':      '\u281a',
  'knowledge': '\u2805',
  'like':      '\u2807',
  'more':      '\u280d',
  'not':       '\u281d',
  'people':    '\u280f',
  'quite':     '\u281f',
  'rather':    '\u2817',
  'so':        '\u280e',
  'that':      '\u281e',
  'us':        '\u2815',
  'very':      '\u2827',
  'will':      '\u283a',
  'it':        '\u280a',
  'you':       '\u281d', // ⠽  — note: shares cell with 'not' sign; context = word sign
  'as':        '\u2801',
  'in':        '\u2814',
}

// Override 'you' — it uses y-sign
WORD_SIGNS['you'] = '\u283d'

const CONTRACTIONS = {
  // Strong group signs
  'and':  '\u282f',
  'for':  '\u283f',
  'of':   '\u2837',
  'the':  '\u282e',
  'with': '\u283e',
  'ing':  '\u282c',
  'his':  '\u2826',
  'was':  '\u2834',
  'ch':   '\u2821',
  'gh':   '\u2823',
  'sh':   '\u2829',
  'th':   '\u2839',
  'wh':   '\u2831',
  'ed':   '\u282b',
  'er':   '\u283b',
  'ou':   '\u2833',
  'ow':   '\u282a',
  'st':   '\u280c',
  'ar':   '\u281c',
  'en':   '\u2822',
  'bb':   '\u2806',
  'cc':   '\u2816',
  'dd':   '\u2836',
  'ff':   '\u2806',
  'gg':   '\u2836',
}

// Pre-sorted by pattern length descending for greedy matching
const CONTRACTION_LIST = Object.entries(CONTRACTIONS).sort((a, b) => b[0].length - a[0].length)

export function applyGrade2(text) {
  const tokens = text.toLowerCase().split(/(\b[a-z]+\b)/)
  return tokens.map((token) => {
    if (!/^[a-z]+$/.test(token)) return token

    if (WORD_SIGNS[token]) return WORD_SIGNS[token]

    let word = token
    let out = ''
    while (word.length > 0) {
      let matched = false
      for (const [pat, br] of CONTRACTION_LIST) {
        if (word.startsWith(pat)) {
          out += br
          word = word.slice(pat.length)
          matched = true
          break
        }
      }
      if (!matched) {
        out += word[0]
        word = word.slice(1)
      }
    }
    return out
  }).join('')
}

export const DOT_POS = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
]

export function charToBraille(ch) {
  const cp = ch.codePointAt(0)
  if (cp >= 0x2800 && cp <= 0x28ff) return cp - 0x2800

  const lower = ch.toLowerCase()
  const isCyrillic = /[а-яёА-ЯЁ]/.test(ch)
  let bits = isCyrillic ? RU_BRAILLE[lower] : EN_BRAILLE[lower]
  if (bits === undefined) bits = EN_BRAILLE[lower] ?? RU_BRAILLE[lower] ?? 0b000000
  return bits
}

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
  dotStroke = null,
}) {

  const dotColGap = cellW * 0.4
  const dotRowGap = cellH * 0.25
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
          const strokeAttrs = dotStroke ? ` stroke="${dotStroke.color}" stroke-width="${dotStroke.width}"` : ''
          dots += `<circle cx="${cx}" cy="${cy}" r="${dotRadius}" fill="${colorDot}"${strokeAttrs}/>`
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
