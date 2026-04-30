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

export default function ControlsPanel({ settings, set, onExport, onCopy, mobileTab, t, th }) {
  const [copyLabel, setCopyLabel] = useState(null)

  const handleCopy = async () => {
    await onCopy()
    setCopyLabel(t.copied)
    setTimeout(() => setCopyLabel(null), 2000)
  }

  const btnBase = {
    width: '100%',
    padding: '13px',
    border: 'none',
    fontFamily: '"Unbounded", sans-serif',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'all 0.18s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  }

  const inputStyle = {
    background: th.bg2,
    border: `1.5px solid ${th.border}`,
    color: th.text,
    fontFamily: '"DM Mono", monospace',
    outline: 'none',
  }

  return (
    <aside
      className={`controls-panel fade-up ${mobileTab === 'controls' ? 'mobile-visible' : 'mobile-hidden'}`}
      style={{ background: th.bg, borderRightColor: th.border }}
    >
      {/* INPUT */}
      <div>
        <SectionLabel th={th}>{t.sectionInput}</SectionLabel>
        <textarea
          value={settings.text}
          onChange={(e) => set('text', e.target.value)}
          placeholder={t.placeholder}
          spellCheck={false}
          style={{
            ...inputStyle,
            width: '100%',
            height: 100,
            borderRadius: 0,
            padding: 12,
            fontSize: 14,
            resize: 'none',
            lineHeight: 1.6,
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => (e.target.style.borderColor = th.text)}
          onBlur={(e) => (e.target.style.borderColor = th.border)}
        />
      </div>

      {/* TYPOGRAPHY */}
      <div>
        <SectionLabel th={th}>{t.sectionTypography}</SectionLabel>
        <SliderRow th={th} label={t.dotRadius}   value={settings.dotRadius}   min={2}  max={10} step={0.5} unit="px" onChange={(v) => set('dotRadius', v)} />
        <SliderRow th={th} label={t.cellWidth}   value={settings.cellW}       min={16} max={60} step={1}   unit="px" onChange={(v) => set('cellW', v)} />
        <SliderRow th={th} label={t.cellHeight}  value={settings.cellH}       min={24} max={80} step={1}   unit="px" onChange={(v) => set('cellH', v)} />
        <SliderRow th={th} label={t.lineSpacing} value={settings.lineSpacing}  min={4}  max={48} step={1}   unit="px" onChange={(v) => set('lineSpacing', v)} />
        <SliderRow th={th} label={t.margin}      value={settings.margin}      min={8}  max={80} step={2}   unit="px" onChange={(v) => set('margin', v)} />
      </div>

      {/* COLOURS */}
      <div>
        <SectionLabel th={th}>{t.sectionColours}</SectionLabel>
        <div className="flex gap-2.5 items-center">
          <ColorSwatch label={t.colorDot}   value={settings.colorDot}   onChange={(v) => set('colorDot', v)} th={th} />
          <ColorSwatch label={t.colorEmpty} value={settings.colorEmpty} onChange={(v) => set('colorEmpty', v)} th={th} />
        </div>
      </div>

      {/* OPTIONS */}
      <div>
        <SectionLabel th={th}>{t.sectionOptions}</SectionLabel>

        <div style={{ marginBottom: 12 }}>
          <select
            value={settings.singleLine ? 'single' : 'wrap'}
            onChange={(e) => set('singleLine', e.target.value === 'single')}
            style={{
              ...inputStyle,
              width: '100%',
              padding: '9px 12px',
              borderRadius: 0,
              fontSize: 12,
              cursor: 'pointer',
              appearance: 'none',
            }}
          >
            <option value="wrap">{t.wrapToWidth}</option>
            <option value="single">{t.singleLine}</option>
          </select>
        </div>

        <SliderRow th={th} label={t.maxWidth} value={settings.maxCols} min={5} max={60} step={1} unit="" onChange={(v) => set('maxCols', v)} />

        {[
          { key: 'showEmpty', label: t.showEmptyDots },
          { key: 'showGuide', label: t.showCellGuides },
        ].map(({ key, label }) => (
          <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, cursor: 'pointer', userSelect: 'none', marginTop: 8, color: th.text }}>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={(e) => set(key, e.target.checked)}
              style={{ width: 16, height: 16, accentColor: th.accent, cursor: 'pointer' }}
            />
            {label}
          </label>
        ))}
      </div>

      {/* EXPORT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SectionLabel th={th}>{t.sectionExport}</SectionLabel>

        <button
          onClick={onExport}
          style={{ ...btnBase, background: th.text, color: th.btnText }}
          onMouseEnter={(e) => { e.currentTarget.style.background = th.accent; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = th.text; e.currentTarget.style.transform = 'translateY(0)' }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <DownloadIcon /> {t.downloadSVG}
        </button>

        <button
          onClick={handleCopy}
          style={{ ...btnBase, background: 'none', color: th.text, border: `1.5px solid ${th.text}` }}
          onMouseEnter={(e) => { e.currentTarget.style.background = th.bg2; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
        >
          <CopyIcon /> {copyLabel ?? t.copySVG}
        </button>
      </div>
    </aside>
  )
}
