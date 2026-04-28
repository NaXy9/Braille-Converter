import { useRef, useState, useMemo } from 'react'
import { wrapText, buildSVG } from '../braille'

export default function PreviewPanel({ settings, mobileTab }) {
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef(null)

  const { svgMarkup, svgW, svgH, totalLines, cellCount, charCount } = useMemo(() => {
    const text = settings.text
    if (!text.trim()) return { svgMarkup: null, svgW: 0, svgH: 0, totalLines: 0, cellCount: 0, charCount: 0 }

    const lines = wrapText(text, settings.maxCols, settings.singleLine)
    const result = buildSVG({
      lines,
      dotRadius:   settings.dotRadius,
      cellW:       settings.cellW,
      cellH:       settings.cellH,
      lineSpacing: settings.lineSpacing,
      margin:      settings.margin,
      colorDot:    settings.colorDot,
      colorEmpty:  settings.colorEmpty,
      showEmpty:   settings.showEmpty,
      showGuide:   settings.showGuide,
    })
    const charCount = text.replace(/\n/g, '').length
    const totalCells = lines.reduce((s, l) => s + l.length, 0)
    return { ...result, cellCount: totalCells, charCount }
  }, [settings])

  const adjustZoom = (delta) => setZoom((z) => Math.min(4, Math.max(0.3, +(z + delta).toFixed(1))))
  const resetZoom  = () => setZoom(1)

  const isEmpty = !settings.text.trim()

  return (
    <section
      className={`preview-panel ${mobileTab === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}
    >
      {/* Toolbar */}
      <div
        style={{
          borderBottom: '1.5px solid #ccc5b5',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#f5f0e8',
          fontSize: 11,
          color: '#888',
          fontFamily: '"DM Mono", monospace',
          flexShrink: 0,
        }}
      >
        <span>Preview</span>
        <span>{Math.round(zoom * 100)}%</span>
      </div>

      {/* Canvas */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 20px',
          overflow: 'auto',
          position: 'relative',
        }}
      >
        {isEmpty ? (
          <div style={{ textAlign: 'center', color: '#bbb', fontFamily: '"DM Mono", monospace' }}>
            <div
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontSize: 40,
                fontWeight: 200,
                color: '#e0dbd0',
                marginBottom: 12,
                lineHeight: 1,
              }}
            >
              ⠃⠗⠁⠊⠇
            </div>
            <p style={{ fontSize: 11, letterSpacing: '0.08em' }}>Type text to begin rendering</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center top',
              transition: 'transform 0.25s',
              maxWidth: '100%',
              boxShadow: '0 4px 40px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)',
            }}
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        )}
      </div>

      {/* Zoom controls */}
      <div
        style={{
          position: 'absolute',
          bottom: 52,
          right: 16,
          display: 'flex',
          border: '1.5px solid #ccc5b5',
          background: '#f5f0e8',
        }}
      >
        {[
          { label: '−', action: () => adjustZoom(-0.2) },
          { label: '+', action: () => adjustZoom(+0.2) },
          { label: '1:1', action: resetZoom },
        ].map(({ label, action }) => (
          <button
            key={label}
            onClick={action}
            style={{
              width: label === '1:1' ? 44 : 36,
              height: 36,
              background: 'none',
              border: 'none',
              borderLeft: label === '−' ? 'none' : '1.5px solid #ccc5b5',
              cursor: 'pointer',
              fontSize: label === '1:1' ? 11 : 18,
              letterSpacing: label === '1:1' ? '0.05em' : 0,
              color: '#0d0d0d',
              fontFamily: '"DM Mono", monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#ede8de')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div
        style={{
          borderTop: '1.5px solid #ccc5b5',
          padding: '8px 16px',
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 10,
          color: '#999',
          background: '#f5f0e8',
          letterSpacing: '0.08em',
          fontFamily: '"DM Mono", monospace',
          flexShrink: 0,
        }}
      >
        {[
          ['Chars', charCount],
          ['Cells', cellCount],
          ['Lines', totalLines],
          ['Size', isEmpty ? '—' : `${svgW}×${svgH}px`],
        ].map(([label, val]) => (
          <span key={label}>
            {label}: <b style={{ color: '#0d0d0d', fontWeight: 500 }}>{val}</b>
          </span>
        ))}
      </div>
    </section>
  )
}
