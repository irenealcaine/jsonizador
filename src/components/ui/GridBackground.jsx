export default function GridBackground({ children, className = '', style }) {
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
