import { Link } from 'react-router-dom';

export default function ToolCard({ title, description, icon, to, color }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <article style={{
        position: 'relative',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        padding: 'var(--spacing-lg)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = 'none';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--color-border)';
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.5rem',
          color,
          display: 'block',
          marginBottom: 'var(--spacing-sm)',
        }}>
          {icon}
        </span>
        <h3 style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--color-text)',
          marginBottom: 'var(--spacing-xs)',
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.8125rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          margin: 0,
        }}>
          {description}
        </p>

        <span style={{ position: 'absolute', top: -1, left: -1, fontFamily: 'var(--font-mono)', fontSize: 11, color, opacity: 0.4, lineHeight: 1 }}>┌</span>
        <span style={{ position: 'absolute', top: -1, right: -1, fontFamily: 'var(--font-mono)', fontSize: 11, color, opacity: 0.4, lineHeight: 1 }}>┐</span>
        <span style={{ position: 'absolute', bottom: -1, left: -1, fontFamily: 'var(--font-mono)', fontSize: 11, color, opacity: 0.4, lineHeight: 1 }}>└</span>
        <span style={{ position: 'absolute', bottom: -1, right: -1, fontFamily: 'var(--font-mono)', fontSize: 11, color, opacity: 0.4, lineHeight: 1 }}>┘</span>
      </article>
    </Link>
  );
}
