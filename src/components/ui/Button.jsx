const baseStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: 'var(--font-ui)',
  fontWeight: 500,
  lineHeight: 1,
  border: '1px solid',
  transition: 'background 0.15s, color 0.15s',
  whiteSpace: 'nowrap',
};

const variants = {
  primary: {
    background: 'var(--color-blue)',
    color: '#fff',
    borderColor: 'var(--color-blue)',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-blue)',
    borderColor: 'var(--color-border)',
  },
  danger: {
    background: 'transparent',
    color: 'var(--color-amber)',
    borderColor: 'var(--color-amber)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-secondary)',
    borderColor: 'transparent',
  },
};

const sizes = {
  sm: { padding: '4px 10px', fontSize: '0.75rem' },
  md: { padding: '8px 16px', fontSize: '0.8125rem' },
};

export default function Button({ variant = 'secondary', size = 'md', children, style, ...props }) {
  return (
    <button
      style={{
        ...baseStyle,
        ...variants[variant],
        ...sizes[size],
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
