import { useState, useMemo } from 'react';
import Panel from '../ui/Panel';
import JsonInput from '../validator/JsonInput';
import SyntaxHighlight from './SyntaxHighlight';
import TreeViewNode from './TreeViewNode';
import Button from '../ui/Button';
import { buildTree } from '../../tools/viewer';
import type { ViewMode } from '../../types';

export default function Viewer() {
  const [jsonInput, setJsonInput] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('tree');
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    try {
      return { ok: true as const, data: JSON.parse(jsonInput) };
    } catch {
      return { ok: false as const };
    }
  }, [jsonInput]);

  const tree = useMemo(() => {
    if (!parsed.ok) return null;
    return buildTree(parsed.data);
  }, [parsed]);

  const prettyJson = useMemo(() => {
    if (!parsed.ok) return '';
    return JSON.stringify(parsed.data, null, 2);
  }, [parsed]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prettyJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <Panel title="Entrada JSON" grid>
        <JsonInput
          value={jsonInput}
          onChange={setJsonInput}
          placeholder={'Pega tu JSON aquí…'}
          rows={8}
        />
      </Panel>

      {parsed.ok && tree && (
        <>
          <Panel
            title="Vista"
            actions={
              <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
                <Button
                  variant={viewMode === 'tree' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('tree')}
                >
                  Árbol
                </Button>
                <Button
                  variant={viewMode === 'raw' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('raw')}
                >
                  JSON plano
                </Button>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? '✓ Copiado' : 'Copiar'}
                </Button>
              </div>
            }
          >
            <div style={{ maxHeight: 500, overflow: 'auto' }}>
              {viewMode === 'tree' ? (
                <TreeViewNode node={tree} depth={0} isLast />
              ) : (
                <SyntaxHighlight json={prettyJson} />
              )}
            </div>
          </Panel>
        </>
      )}

      {jsonInput.trim() && !parsed.ok && (
        <Panel>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-amber)' }}>
            El JSON no es válido. Pégalo en el Validador para ver los detalles del error.
          </p>
        </Panel>
      )}
    </div>
  );
}
