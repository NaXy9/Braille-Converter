import { useRef, useState, useMemo } from 'react'
import { wrapText, buildSVG, applyGrade2 } from '../braille'

export default function PreviewPanel({ settings, mobileTab, t, th }) {
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef(null)

  const { svgMarkup, svgW, svgH, totalLines, cellCount, charCount } = useMemo(() => {
    const text = settings.text
    if (!text.trim()) return { svgMarkup: null, svgW: 0, svgH: 0, totalLines: 0, cellCount: 0, charCount: 0 }

    const processedText = settings.grade2 ? applyGrade2(text) : text
    const lines = wrapText(processedText, settings.maxCols, settings.singleLine)
    const isDark = th?.bg === '#141414'
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
      dotStroke:   isDark ? { color: 'rgba(255,255,255,0.18)', width: 1 } : null,
    })
    const charCount = text.replace(/\n/g, '').length
    const totalCells = lines.reduce((s, l) => s + l.length, 0)
    return { ...result, cellCount: totalCells, charCount }
  }, [settings, th])

  const adjustZoom = (delta) => setZoom((z) => Math.min(4, Math.max(0.3, +(z + delta).toFixed(1))))
  const resetZoom  = () => setZoom(1)
  const isEmpty = !settings.text.trim()

  return (
    <section
      className={`preview-panel ${mobileTab === 'preview' ? 'mobile-visible' : 'mobile-hidden'}`}
      style={{ background: th.bg2 }}
    >
      {/* Toolbar */}
      <div
        style={{
          borderBottom: `1.5px solid ${th.border}`,
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: th.bg,
          fontSize: 11,
          color: th.textMute,
          fontFamily: '"DM Mono", monospace',
          flexShrink: 0,
        }}
      >
        <span>{t.previewHint}</span>
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
          <div style={{ textAlign: 'center', fontFamily: '"DM Mono", monospace' }}>
            <div
              style={{
                fontFamily: '"Unbounded", sans-serif',
                fontSize: 40,
                fontWeight: 200,
                color: th.textFaint,
                marginBottom: 12,
                lineHeight: 1,
              }}
            >
              ⠃⠗⠁⠊⠇
            </div>
            <p style={{ fontSize: 11, letterSpacing: '0.08em', color: th.textFaint }}>{t.emptyHint}</p>
          </div>
        ) : (
          <div
            ref={containerRef}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center top',
              transition: 'transform 0.25s',
              maxWidth: '100%',
              boxShadow: `0 4px 40px ${th.shadow}, 0 1px 4px ${th.shadow}`,
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
          border: `1.5px solid ${th.border}`,
          background: th.bg,
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
              borderLeft: label === '−' ? 'none' : `1.5px solid ${th.border}`,
              cursor: 'pointer',
              fontSize: label === '1:1' ? 11 : 18,
              letterSpacing: label === '1:1' ? '0.05em' : 0,
              color: th.text,
              fontFamily: '"DM Mono", monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = th.bg2)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div
        style={{
          borderTop: `1.5px solid ${th.border}`,
          padding: '8px 16px',
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          fontSize: 10,
          color: th.textDim,
          background: th.bg,
          letterSpacing: '0.08em',
          fontFamily: '"DM Mono", monospace',
          flexShrink: 0,
        }}
      >
        {[
          [t.chars, charCount],
          [t.cells, cellCount],
          [t.lines, totalLines],
          [t.size, isEmpty ? '—' : `${svgW}×${svgH}px`],
        ].map(([label, val]) => (
          <span key={label}>
            {label}: <b style={{ color: th.text, fontWeight: 500 }}>{val}</b>
          </span>
        ))}
      </div>
    </section>
  )
}
