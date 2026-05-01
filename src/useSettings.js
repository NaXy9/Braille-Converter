import { useState, useCallback } from 'react'

const DEFAULTS = {
  text:        'Hello World',
  dotRadius:   4,
  cellW:       32,  // увеличено с 28 для лучшего визуального разделения ячеек
  cellH:       40,
  lineSpacing: 16,
  margin:      28,
  maxCols:     20,
  colorDot:    '#1a1a1a',
  colorEmpty:  '#e0dbd0',
  showEmpty:   true,
  showGuide:   false,
  singleLine:  false,
}

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULTS)

  const set = useCallback((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  return { settings, set }
}
