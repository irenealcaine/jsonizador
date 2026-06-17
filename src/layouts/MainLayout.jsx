import { NavLink, Outlet } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/validator', label: 'Validador' },
  { to: '/viewer', label: 'Visualizador' },
  { to: '/creator', label: 'Creador' },
];

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{
        height: 'var(--header-height)',
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--spacing-lg)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--color-blue)',
            border: '1px solid var(--color-blue)',
            padding: '2px 6px',
            lineHeight: 1.3,
          }}>{'{ }'}</span>
          <span style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            letterSpacing: '-0.01em',
          }}>jsonizador</span>
        </NavLink>

        <nav style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                padding: '6px 12px',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: isActive ? 'var(--color-blue)' : 'var(--color-text-secondary)',
                background: isActive ? 'var(--color-bg)' : 'transparent',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid var(--color-blue)' : '2px solid transparent',
                transition: 'color 0.15s, background 0.15s',
                whiteSpace: 'nowrap',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main style={{
        flex: 1,
        maxWidth: 'var(--max-width)',
        width: '100%',
        margin: '0 auto',
        padding: 'var(--spacing-xl) var(--spacing-lg)',
      }}>
        <Outlet />
      </main>
    </div>
  );
}
