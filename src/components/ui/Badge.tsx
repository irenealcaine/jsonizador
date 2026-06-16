import type { ReactNode } from 'react';

interface BadgeProps {
  variant: 'valid' | 'invalid' | 'info';
  children: ReactNode;
}

const colors: Record<string, { bg: string; color: string; border: string }> = {
  valid: { bg: 'rgba(91, 170, 128, 0.12)', color: 'var(--color-green)', border: 'var(--color-green)' },
  invalid: { bg: 'rgba(232, 148, 63, 0.12)', color: 'var(--color-amber)', border: 'var(--color-amber)' },
  info: { bg: 'rgba(107, 143, 207, 0.12)', color: 'var(--color-blue)', border: 'var(--color-blue)' },
};

export default function Badge({ variant, children }: BadgeProps) {
  const c = colors[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 10px',
        fontSize: '0.75rem',
        fontWeight: 500,
        fontFamily: 'var(--font-ui)',
        lineHeight: 1.4,
        background: c.bg,
        color: c.color,
        border: `1px solid ${c.border}`,
      }}
    >
      {children}
    </span>
  );
}
