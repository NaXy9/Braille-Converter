export default function SectionLabel({ children }) {
  return (
    <div className="section-label flex items-center gap-2 mb-2.5"
         style={{ fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c8440a', fontWeight: 500 }}>
      {children}
    </div>
  )
}
