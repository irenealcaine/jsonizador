import { useState, useMemo, useCallback, useEffect } from 'react';
import Panel from '../ui/Panel';
import Button from '../ui/Button';
import FieldList from './FieldList';
import Preview from './Preview';
import SchemaView from './SchemaView';
import { buildJsonFromFields } from '../../tools/creator';
import { generateSchemaFromFields } from '../../tools/schema';

const STORAGE_KEY = 'opencode-jsonizador-imported-fields';

export default function Creator() {
  const [fields, setFields] = useState([]);
  const [copied, setCopied] = useState(false);
  const [showSchema, setShowSchema] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFields(parsed);
        }
      } catch {}
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const json = useMemo(() => {
    const obj = buildJsonFromFields(fields);
    return JSON.stringify(obj, null, 2);
  }, [fields]);

  const schema = useMemo(() => {
    return generateSchemaFromFields(fields);
  }, [fields]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [json]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'datos.json';
    a.click();
    URL.revokeObjectURL(url);
  }, [json]);

  const handleClear = useCallback(() => {
    setFields([]);
  }, []);

  const toggleSchema = useCallback(() => {
    setShowSchema((v) => !v);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <Panel
        title="Editor de campos"
        grid
      >
        <FieldList
          fields={fields}
          onChange={setFields}
          parentType="object"
        />

        {fields.length === 0 && (
          <p style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.875rem',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
            marginTop: 8,
          }}>
            Añade un campo raíz para empezar a construir tu JSON.
          </p>
        )}
      </Panel>

      <Panel
        title={showSchema ? 'Schema JSON' : 'Vista previa'}
        actions={
          <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
            {showSchema ? (
              <Button variant="secondary" size="sm" onClick={toggleSchema}>
                ← Vista previa
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleSchema}
                disabled={fields.length === 0}
              >
                Schema
              </Button>
            )}
            {!showSchema && (
              <>
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  {copied ? '✓ Copiado' : 'Copiar'}
                </Button>
                <Button variant="primary" size="sm" onClick={handleDownload}>
                  Descargar .json
                </Button>
                {fields.length > 0 && (
                  <Button variant="danger" size="sm" onClick={handleClear}>
                    Limpiar
                  </Button>
                )}
              </>
            )}
          </div>
        }
      >
        {showSchema ? (
          <SchemaView data={schema} />
        ) : (
          <Preview json={json} />
        )}
      </Panel>
    </div>
  );
}
