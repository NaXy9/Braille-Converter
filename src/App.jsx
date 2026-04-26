import { useSettings }   from './useSettings'
import { useSVGExport }  from './useSVGExport'
import ControlsPanel     from './components/ControlsPanel'
import PreviewPanel      from './components/PreviewPanel'

export default function App() {
  const { settings, set } = useSettings()
  const { exportSVG, copySVG } = useSVGExport(settings)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header
        style={{
          borderBottom: '1.5px solid #ccc5b5',
          padding: '18px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: '#f5f0e8',
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontFamily: '"Unbounded", sans-serif',
            fontWeight: 900,
            fontSize: 13,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          Brai<span style={{ color: '#c8440a' }}>●</span>lle
          <br />
          Converter
        </div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#888',
            fontWeight: 300,
            fontFamily: '"DM Mono", monospace',
          }}
        >
          SVG Export Tool — EN / RU
        </div>
      </header>

      {/* Main layout */}
      <main style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <ControlsPanel
          settings={settings}
          set={set}
          onExport={exportSVG}
          onCopy={copySVG}
        />
        <PreviewPanel settings={settings} />
      </main>
    </div>
  )
}
