import { useState } from 'react'
import { useSettings }             from './useSettings'
import { useSVGExport }            from './useSVGExport'
import { TRANSLATIONS, useLocale } from './i18n'
import { THEMES, useTheme }        from './theme'
import ControlsPanel               from './components/ControlsPanel'
import PreviewPanel                from './components/PreviewPanel'

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="2"  x2="12" y2="4"/>
      <line x1="12" y1="20" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="2"  y1="12" x2="4"  y2="12"/>
      <line x1="20" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function App() {
  const { settings, set }       = useSettings()
  const { exportSVG, copySVG }  = useSVGExport(settings)
  const [mobileTab, setMobileTab] = useState('controls')
  const [locale, setLocale]     = useState(useLocale)
  const [themeName, setThemeName] = useState(useTheme)
  const t  = TRANSLATIONS[locale]
  const th = THEMES[themeName]

  const toggleLocale = () => {
    const next = locale === 'en' ? 'ru' : 'en'
    setLocale(next)
    localStorage.setItem('braille-locale', next)
  }

  const toggleTheme = () => {
    const next = themeName === 'light' ? 'dark' : 'light'
    setThemeName(next)
    localStorage.setItem('braille-theme', next)
  }

  const headerBtn = {
    padding: '6px 10px',
    background: 'none',
    border: `1.5px solid ${th.border}`,
    fontFamily: '"DM Mono", monospace',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.1em',
    color: th.text,
    cursor: 'pointer',
    transition: 'all 0.15s',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: th.bg, color: th.text }}>
      <header
        style={{
          borderBottom: `1.5px solid ${th.border}`,
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: th.bg,
          zIndex: 100,
          gap: 12,
        }}
      >
        <div
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            lineHeight: 1,
            flexShrink: 0,
            color: th.text,
          }}
        >
          Brai<span style={{ color: th.accent }}>●</span>lle
          <br />
          Converter
        </div>

        <div className="desktop-subtitle" style={{ color: th.textMute }}>{t.subtitle}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            title={themeName === 'light' ? t.themeDark : t.themeLight}
            style={headerBtn}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = th.text }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = th.border }}
          >
            {themeName === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            style={headerBtn}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = th.text }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = th.border }}
          >
            {locale === 'en' ? 'RU' : 'EN'}
          </button>

          {/* Mobile tab switcher */}
          <div className="mobile-tab-switcher">
            {['controls', 'preview'].map((tab) => (
              <button
                key={tab}
                onClick={() => setMobileTab(tab)}
                style={{
                  padding: '6px 10px',
                  background: mobileTab === tab ? th.text : 'none',
                  color: mobileTab === tab ? th.bg : th.textMute,
                  border: `1.5px solid ${mobileTab === tab ? th.text : th.border}`,
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 10,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {tab === 'controls' ? t.tabEdit : t.tabView}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="main-layout">
        <ControlsPanel
          settings={settings}
          set={set}
          onExport={exportSVG}
          onCopy={copySVG}
          mobileTab={mobileTab}
          t={t}
          th={th}
        />
        <PreviewPanel settings={settings} mobileTab={mobileTab} t={t} th={th} />
      </main>
    </div>
  )
}
