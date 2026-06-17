import { useMemo, useState } from 'react';
import Button from '../ui/Button';

export default function SchemaView({ data }) {
  const [copied, setCopied] = useState(false);

  const schemaText = useMemo(() => {
    if (!data) return '';
    return JSON.stringify(data, null, 2);
  }, [data]);

  const handleCopy = () => {
    navigator.clipboard.writeText(schemaText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--spacing-sm)' }}>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? '✓ Copiado' : 'Copiar schema'}
        </Button>
      </div>
      <pre style={{
        margin: 0,
        padding: '12px',
        fontSize: '0.8125rem',
        lineHeight: 1.6,
        fontFamily: 'var(--font-mono)',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        overflow: 'auto',
        maxHeight: 400,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
      }}>
        <code style={{ color: 'var(--color-blue)' }}>
          {schemaText || 'Genera un JSON para ver su schema.'}
        </code>
      </pre>
    </div>
  );
}
