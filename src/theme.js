export const THEMES = {
  light: {
    bg:       '#f5f0e8',
    bg2:      '#ede8de',
    border:   '#ccc5b5',
    text:     '#0d0d0d',
    textMute: '#888',
    textDim:  '#999',
    textFaint:'#bbb',
    accent:   '#c8440a',
    thumb:    '#0d0d0d',
    btnText:  '#f5f0e8',
    emptyDot: '#e0dbd0',
    shadow:   'rgba(0,0,0,0.08)',
  },
  dark: {
    bg:       '#141414',
    bg2:      '#1e1e1e',
    border:   '#333',
    text:     '#f0ece4',
    textMute: '#777',
    textDim:  '#666',
    textFaint:'#444',
    accent:   '#e05a1a',
    thumb:    '#f0ece4',
    btnText:  '#141414',
    emptyDot: '#2a2a2a',
    shadow:   'rgba(0,0,0,0.4)',
  },
}

export function useTheme() {
  const saved = typeof localStorage !== 'undefined'
    ? localStorage.getItem('braille-theme')
    : null
  return (saved === 'dark' || saved === 'light') ? saved : 'light'
}
