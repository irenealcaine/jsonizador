import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md';
  children: ReactNode;
}

const baseStyle: React.CSSProperties = {
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

const variants: Record<string, React.CSSProperties> = {
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

const sizes: Record<string, React.CSSProperties> = {
  sm: { padding: '4px 10px', fontSize: '0.75rem' },
  md: { padding: '8px 16px', fontSize: '0.8125rem' },
};

export default function Button({ variant = 'secondary', size = 'md', children, style, ...props }: ButtonProps) {
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
