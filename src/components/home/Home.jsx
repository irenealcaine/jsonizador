import ToolCard from './ToolCard';

const tools = [
  {
    title: 'Validador',
    description: 'Pega y valida JSON al instante. Encuentra errores exactos con línea y columna, minifica o formatea con indentación configurable.',
    icon: '{ }',
    to: '/validator',
    color: 'var(--color-blue)',
  },
  {
    title: 'Visualizador',
    description: 'Explora cualquier JSON como árbol colapsable o con resaltado de sintaxis por tipo de dato. Copia el resultado formateado.',
    icon: '[ ]',
    to: '/viewer',
    color: 'var(--color-green)',
  },
  {
    title: 'Creador',
    description: 'Construye JSON desde cero campo por campo. Tipado visual, anidamiento ilimitado y reordenación por arrastre.',
    icon: '+/\u2013',
    to: '/creator',
    color: 'var(--color-amber)',
  },
];

export default function Home() {
  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
        <h1 style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '1.75rem',
          fontWeight: 500,
          color: 'var(--color-text)',
          marginBottom: 'var(--spacing-sm)',
          letterSpacing: '-0.02em',
        }}>
          jsonizador
        </h1>
        <p style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.9375rem',
          color: 'var(--color-text-secondary)',
          maxWidth: 520,
        }}>
          Herramientas de taller para estructuras de datos JSON. Validación, exploración visual y edición desde el navegador.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 'var(--spacing-lg)',
      }}>
        {tools.map((tool) => (
          <ToolCard key={tool.to} {...tool} />
        ))}
      </div>
    </div>
  );
}
