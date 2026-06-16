import { useMemo } from 'react';
import { tokenize } from '../../tools/viewer';

interface SyntaxHighlightProps {
  json: string;
}

const tokenStyles: Record<string, React.CSSProperties> = {
  key: { color: 'var(--color-blue)' },
  string: { color: 'var(--color-green)' },
  number: { color: 'var(--color-blue)' },
  boolean: { color: 'var(--color-amber)' },
  null: { color: 'var(--color-text-muted)' },
  brace: { color: 'var(--color-text-muted)' },
  bracket: { color: 'var(--color-text-muted)' },
  comma: { color: 'var(--color-text-muted)' },
  colon: { color: 'var(--color-text-muted)' },
  whitespace: {},
};

export default function SyntaxHighlight({ json }: SyntaxHighlightProps) {
  const tokens = useMemo(() => tokenize(json), [json]);

  return (
    <pre style={{
      margin: 0,
      padding: '12px',
      fontSize: '0.8125rem',
      lineHeight: 1.6,
      fontFamily: 'var(--font-mono)',
      background: 'var(--color-bg)',
      border: '1px solid var(--color-border)',
      overflow: 'auto',
      maxHeight: 500,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    }}>
      <code>
        {tokens.map((token, i) => (
          <span key={i} style={tokenStyles[token.type] || {}}>{token.value}</span>
        ))}
      </code>
    </pre>
  );
}
