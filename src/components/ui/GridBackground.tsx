import type { ReactNode } from 'react';

interface GridBackgroundProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GridBackground({ children, className = '', style }: GridBackgroundProps) {
  return (
    <div className={`grid-bg ${className}`} style={{
      padding: 'var(--spacing-lg)',
      minHeight: 200,
      ...style,
    }}>
      {children}
    </div>
  );
}
