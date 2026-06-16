import type { ReactNode } from 'react';

interface PanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
  grid?: boolean;
  actions?: ReactNode;
}

const cornerStyle: React.CSSProperties = {
  position: 'absolute',
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--color-blue)',
  opacity: 0.4,
  lineHeight: 1,
  pointerEvents: 'none',
};

export default function Panel({ title, children, className = '', grid = false, actions }: PanelProps) {
  return (
    <section className={`panel ${grid ? 'grid-bg' : ''} ${className}`}
      style={{ position: 'relative', background: 'var(--color-surface)', border: '1px solid var(--color-border)', padding: 'var(--spacing-lg)' }}
    >
      <span style={{ ...cornerStyle, top: -1, left: -1 }}>┌</span>
      <span style={{ ...cornerStyle, top: -1, right: -1 }}>┐</span>
      <span style={{ ...cornerStyle, bottom: -1, left: -1 }}>└</span>
      <span style={{ ...cornerStyle, bottom: -1, right: -1 }}>┘</span>

      {title && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
          <h2 style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--color-blue)',
          }}>{title}</h2>
          {actions && <div style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'center' }}>{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}
