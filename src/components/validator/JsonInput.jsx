export default function JsonInput({ value, onChange, placeholder, rows = 12 }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      spellCheck={false}
      style={{
        width: '100%',
        resize: 'vertical',
        padding: '12px',
        fontSize: '0.8125rem',
        lineHeight: 1.6,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text)',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        outline: 'none',
      }}
    />
  );
}
