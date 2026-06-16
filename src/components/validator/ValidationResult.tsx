import { useEffect, useState, useCallback } from 'react';
import { parseJsonError, analyzeJson } from '../../tools/validator';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Select from '../ui/Select';
import type { JsonErrorInfo, JsonStats, FormatIndent } from '../../types';

interface ValidationResultProps {
  json: string;
}

type Mode = 'formatted' | 'minified' | null;

type ValidationState =
  | { status: 'idle' }
  | { status: 'valid'; data: unknown; stats: JsonStats }
  | { status: 'invalid'; error: JsonErrorInfo };

export default function ValidationResult({ json }: ValidationResultProps) {
  const [state, setState] = useState<ValidationState>({ status: 'idle' });
  const [indent, setIndent] = useState<FormatIndent>(2);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<Mode>(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (!json.trim()) {
      setState({ status: 'idle' });
      setMode(null);
      setOutput('');
      return;
    }

    const timer = setTimeout(() => {
      try {
        const data = JSON.parse(json);
        const stats = analyzeJson(data);
        setState({ status: 'valid', data, stats });
      } catch (e) {
        const error = parseJsonError(e as SyntaxError, json);
        setState({ status: 'invalid', error });
        setMode(null);
        setOutput('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [json]);

  const handleFormat = useCallback(() => {
    if (state.status !== 'valid') return;
    setMode('formatted');
    setOutput(JSON.stringify(state.data, null, indent === 'tab' ? '\t' : indent));
  }, [state, indent]);

  const handleMinify = useCallback(() => {
    if (state.status !== 'valid') return;
    setMode('minified');
    setOutput(JSON.stringify(state.data));
  }, [state]);

  useEffect(() => {
    if (mode === 'formatted' && state.status === 'valid') {
      setOutput(JSON.stringify(state.data, null, indent === 'tab' ? '\t' : indent));
    }
  }, [indent, mode, state]);

  const handleCopyResult = useCallback((text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  if (state.status === 'idle') {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      {/* Status badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
        {state.status === 'valid' ? (
          <Badge variant="valid">✓ JSON válido</Badge>
        ) : (
          <Badge variant="invalid">✗ JSON inválido</Badge>
        )}
      </div>

      {/* Error detail */}
      {state.status === 'invalid' && (
        <div style={{
          background: 'rgba(232, 148, 63, 0.10)',
          border: '1px solid var(--color-amber)',
          padding: '12px',
          fontSize: '0.8125rem',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.6,
        }}>
          {state.error.line !== null && (
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-amber)', marginBottom: 4 }}>
              Error en línea {state.error.line}, columna {state.error.column}
            </div>
          )}
          <div style={{ color: 'var(--color-text)' }}>{state.error.message}</div>
        </div>
      )}

      {/* Stats + actions */}
      {state.status === 'valid' && (
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
            {[
              { label: 'Claves', value: state.stats.keyCount },
              { label: 'Profundidad máxima', value: `${state.stats.maxDepth} niveles` },
              { label: 'Tamaño', value: `${state.stats.bytes} bytes` },
            ].map((stat) => (
              <div key={stat.label} style={{
                padding: '6px 10px',
                border: '1px solid var(--color-border-light)',
                background: 'var(--color-bg)',
              }}>
                <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 2 }}>{stat.label}</div>
                <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-mono)', color: 'var(--color-blue)' }}>{stat.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="secondary" size="sm" onClick={handleMinify}>
              Minificar
            </Button>
            <Select
              value={String(indent)}
              onChange={(e) => setIndent(e.target.value === 'tab' ? 'tab' : Number(e.target.value) as FormatIndent)}
              options={[
                { value: '2', label: '2 espacios' },
                { value: '4', label: '4 espacios' },
                { value: 'tab', label: 'Tabulación' },
              ]}
            />
            <Button variant="secondary" size="sm" onClick={handleFormat}>
              Formatear
            </Button>
            {output && (
              <Button variant="ghost" size="sm" onClick={() => handleCopyResult(output)}>
                {copied ? '✓ Copiado' : 'Copiar'}
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Output */}
      {output && (
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
          <code style={{ color: 'var(--color-text)' }}>{output}</code>
        </pre>
      )}
    </div>
  );
}
