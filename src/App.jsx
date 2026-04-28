import { useState } from 'react'
import { useSettings }   from './useSettings'
import { useSVGExport }  from './useSVGExport'
import ControlsPanel     from './components/ControlsPanel'
import PreviewPanel      from './components/PreviewPanel'

export default function App() {
  const { settings, set } = useSettings()
  const { exportSVG, copySVG } = useSVGExport(settings)
  const [mobileTab, setMobileTab] = useState('controls')

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          borderBottom: '1.5px solid #ccc5b5',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: '#f5f0e8',
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
          }}
        >
          Brai<span style={{ color: '#c8440a' }}>●</span>lle
          <br />
          Converter
        </div>

        <div className="desktop-subtitle">
          SVG Export Tool — EN / RU
        </div>

        <div className="mobile-tab-switcher">
          {['controls', 'preview'].map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              style={{
                padding: '6px 10px',
                background: mobileTab === tab ? '#0d0d0d' : 'none',
                color: mobileTab === tab ? '#f5f0e8' : '#888',
                border: '1.5px solid ' + (mobileTab === tab ? '#0d0d0d' : '#ccc5b5'),
                fontFamily: '"DM Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {tab === 'controls' ? 'Edit' : 'View'}
            </button>
          ))}
        </div>
      </header>

      <main className="main-layout">
        <ControlsPanel
          settings={settings}
          set={set}
          onExport={exportSVG}
          onCopy={copySVG}
          mobileTab={mobileTab}
        />
        <PreviewPanel settings={settings} mobileTab={mobileTab} />
      </main>
    </div>
  )
}
