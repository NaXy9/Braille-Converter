export default function ColorSwatch({ label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label style={{ fontSize: '10px', color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: '100%', height: 34 }}
      />
    </div>
  )
}
