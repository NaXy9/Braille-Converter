import { useState } from 'react'
import SectionLabel from './SectionLabel'
import SliderRow from './SliderRow'
import ColorSwatch from './ColorSwatch'

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  )
}

export default function ControlsPanel({ settings, set, onExport, onCopy }) {
  const [copyLabel, setCopyLabel] = useState(null)

  const handleCopy = async () => {
    await onCopy()
    setCopyLabel('✓ Copied!')
    setTimeout(() => setCopyLabel(null), 2000)
  }

  const btnBase = {
    width: '100%',
    padding: '14px',
    border: 'none',
    fontFamily: '"Unbounded", sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.18s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  }

  return (
    <aside
      className="fade-up"
      style={{
        borderRight: '1.5px solid #ccc5b5',
        padding: '32px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        background: '#f5f0e8',
        width: 380,
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* INPUT */}
      <div>
        <SectionLabel>Input</SectionLabel>
        <textarea
          value={settings.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder="Type text here... / Введите текст..."
          spellCheck={false}
          style={{
            width: '100%',
            height: 110,
            background: '#ede8de',
            border: '1.5px solid #ccc5b5',
            borderRadius: 0,
            padding: 14,
            fontFamily: '"DM Mono", monospace',
            fontSize: 14,
            color: '#0d0d0d',
            resize: 'none',
            outline: 'none',
            lineHeight: 1.6,
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#0d0d0d')}
          onBlur={(e) => (e.target.style.borderColor = '#ccc5b5')}
        />
      </div>

      {/* TYPOGRAPHY */}
      <div>
        <SectionLabel>Typography</SectionLabel>
        <SliderRow label="Dot Radius"   value={settings.dotRadius}   min={2}  max={10} step={0.5} unit="px" onChange={(v) => set('dotRadius', v)} />
        <SliderRow label="Cell Width"   value={settings.cellW}       min={16} max={60} step={1}   unit="px" onChange={(v) => set('cellW', v)} />
        <SliderRow label="Cell Height"  value={settings.cellH}       min={24} max={80} step={1}   unit="px" onChange={(v) => set('cellH', v)} />
        <SliderRow label="Line Spacing" value={settings.lineSpacing}  min={4}  max={48} step={1}   unit="px" onChange={(v) => set('lineSpacing', v)} />
        <SliderRow label="Margin"       value={settings.margin}      min={8}  max={80} step={2}   unit="px" onChange={(v) => set('margin', v)} />
      </div>

      {/* COLOURS */}
      <div>
        <SectionLabel>Colours</SectionLabel>
        <div className="flex gap-2.5 items-center">
          <ColorSwatch label="Dot fill"  value={settings.colorDot}   onChange={(v) => set('colorDot', v)} />
          <ColorSwatch label="Empty dot" value={settings.colorEmpty} onChange={(v) => set('colorEmpty', v)} />
        </div>
      </div>

      {/* OPTIONS */}
      <div>
        <SectionLabel>Options</SectionLabel>

        <div style={{ marginBottom: 12 }}>
          <select
            value={settings.singleLine ? 'single' : 'wrap'}
            onChange={(e) => set('singleLine', e.target.value === 'single')}
            style={{
              width: '100%',
              padding: '9px 12px',
              background: '#ede8de',
              border: '1.5px solid #ccc5b5',
              borderRadius: 0,
              fontFamily: '"DM Mono", monospace',
              fontSize: 12,
              color: '#0d0d0d',
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="wrap">Wrap to width</option>
            <option value="single">Single line</option>
          </select>
        </div>

        <SliderRow
          label="Max width (cells)"
          value={settings.maxCols}
          min={5} max={60} step={1} unit=""
          onChange={(v) => set('maxCols', v)}
        />

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, cursor: 'pointer', userSelect: 'none', marginTop: 8 }}>
          <input
            type="checkbox"
            checked={settings.showEmpty}
            onChange={(e) => set('showEmpty', e.target.checked)}
            style={{ width: 16, height: 16, accentColor: '#0d0d0d', cursor: 'pointer' }}
          />
          Show empty dots
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, cursor: 'pointer', userSelect: 'none', marginTop: 8 }}>
          <input
            type="checkbox"
            checked={settings.showGuide}
            onChange={(e) => set('showGuide', e.target.checked)}
            style={{ width: 16, height: 16, accentColor: '#0d0d0d', cursor: 'pointer' }}
          />
          Show cell guides
        </label>
      </div>

      {/* EXPORT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SectionLabel>Export</SectionLabel>

        <button
          onClick={onExport}
          style={{ ...btnBase, background: '#0d0d0d', color: '#f5f0e8' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#c8440a'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#0d0d0d'; e.currentTarget.style.transform = 'translateY(0)' }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <DownloadIcon /> Download SVG
        </button>

        <button
          onClick={handleCopy}
          style={{ ...btnBase, background: 'none', color: '#0d0d0d', border: '1.5px solid #0d0d0d' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#ede8de'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <CopyIcon /> {copyLabel ?? 'Copy SVG code'}
        </button>
      </div>
    </aside>
  )
}
