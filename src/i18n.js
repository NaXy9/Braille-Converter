export const TRANSLATIONS = {
  en: {
    // Header
    subtitle: 'SVG Export Tool — EN / RU',

    // Mobile tabs
    tabEdit: 'Edit',
    tabView: 'View',

    // Sections
    sectionInput: 'Input',
    sectionTypography: 'Typography',
    sectionColours: 'Colours',
    sectionOptions: 'Options',
    sectionExport: 'Export',

    // Input
    placeholder: 'Type text here... / Введите текст...',

    // Sliders
    dotRadius: 'Dot Radius',
    cellWidth: 'Cell Width',
    cellHeight: 'Cell Height',
    lineSpacing: 'Line Spacing',
    margin: 'Margin',
    maxWidth: 'Max width (cells)',

    // Colors
    colorDot: 'Dot fill',
    colorEmpty: 'Empty dot',

    // Options
    wrapToWidth: 'Wrap to width',
    singleLine: 'Single line',
    showEmptyDots: 'Show empty dots',
    showCellGuides: 'Show cell guides',

    // Export
    downloadSVG: 'Download SVG',
    copySVG: 'Copy SVG code',
    copied: '✓ Copied!',

    // Preview
    previewHint: 'Preview — adjust settings and type text',
    emptyHint: 'Type text to begin rendering',

    // Stats
    chars: 'Chars',
    cells: 'Cells',
    lines: 'Lines',
    size: 'Size',
  },

  ru: {
    // Header
    subtitle: 'Экспорт SVG — EN / RU',

    // Mobile tabs
    tabEdit: 'Правка',
    tabView: 'Вид',

    // Sections
    sectionInput: 'Текст',
    sectionTypography: 'Типографика',
    sectionColours: 'Цвета',
    sectionOptions: 'Параметры',
    sectionExport: 'Экспорт',

    // Input
    placeholder: 'Введите текст... / Type text here...',

    // Sliders
    dotRadius: 'Радиус точки',
    cellWidth: 'Ширина ячейки',
    cellHeight: 'Высота ячейки',
    lineSpacing: 'Межстрочный интервал',
    margin: 'Отступ',
    maxWidth: 'Макс. ширина (ячеек)',

    // Colors
    colorDot: 'Цвет точки',
    colorEmpty: 'Пустая точка',

    // Options
    wrapToWidth: 'Перенос по ширине',
    singleLine: 'Одна строка',
    showEmptyDots: 'Показывать пустые точки',
    showCellGuides: 'Показывать сетку ячеек',

    // Export
    downloadSVG: 'Скачать SVG',
    copySVG: 'Копировать SVG',
    copied: '✓ Скопировано!',

    // Preview
    previewHint: 'Превью — настройте параметры и введите текст',
    emptyHint: 'Введите текст для отображения',

    // Stats
    chars: 'Симв',
    cells: 'Ячеек',
    lines: 'Строк',
    size: 'Размер',
  },
}

export function useLocale() {
  const saved = typeof localStorage !== 'undefined'
    ? localStorage.getItem('braille-locale')
    : null
  return (saved === 'ru' || saved === 'en') ? saved : 'en'
}
