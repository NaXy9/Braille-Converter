export default function SliderRow({ label, value, min, max, step = 1, unit = 'px', onChange, th }) {
  return (
    <div className="flex flex-col gap-1.5 mb-1">
      <div className="flex justify-between" style={{ fontSize: '11px', color: th?.textMute ?? '#666' }}>
        <span>{label}</span>
        <span style={{ fontWeight: 500, color: th?.text ?? '#0d0d0d', minWidth: 32, textAlign: 'right' }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(step % 1 !== 0 ? parseFloat(e.target.value) : parseInt(e.target.value))}
        style={{ '--thumb-color': th?.thumb ?? '#0d0d0d', '--track-color': th?.border ?? '#ccc5b5' }}
      />
    </div>
  )
}
