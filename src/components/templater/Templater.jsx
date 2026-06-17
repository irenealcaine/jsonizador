import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Panel from '../ui/Panel';
import Button from '../ui/Button';
import JsonInput from '../validator/JsonInput';
import { generateTemplate, structureMatches, templateToFields } from '../../tools/templater';

const STORAGE_KEY = 'opencode-jsonizador-imported-fields';

export default function Templater() {
  const navigate = useNavigate();
  const [jsonInput, setJsonInput] = useState('');
  const [editedJson, setEditedJson] = useState('');
  const [copied, setCopied] = useState(false);

  const parsed = useMemo(() => {
    try {
      return { ok: true, data: JSON.parse(jsonInput) };
    } catch {
      return { ok: false };
    }
  }, [jsonInput]);

  const template = useMemo(() => {
    if (!parsed.ok) return null;
    return generateTemplate(parsed.data);
  }, [parsed]);

  const templateJson = useMemo(() => {
    if (!template) return '';
    return JSON.stringify(template, null, 2);
  }, [template]);

  useEffect(() => {
    setEditedJson(templateJson);
  }, [templateJson]);

  const parseEdited = useMemo(() => {
    try {
      const data = JSON.parse(editedJson);
      return { ok: true, data };
    } catch {
      return { ok: false };
    }
  }, [editedJson]);

  const structureMatch = useMemo(() => {
    if (!parseEdited.ok || !template) return null;
    return structureMatches(template, parseEdited.data);
  }, [parseEdited, template]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(editedJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [editedJson]);

  const handleEditInCreator = useCallback(() => {
    if (!parseEdited.ok) return;
    const fields = templateToFields(parseEdited.data);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
    navigate('/creator');
  }, [parseEdited, navigate]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <Panel title="Entrada JSON" grid>
        <JsonInput
          value={jsonInput}
          onChange={setJsonInput}
          placeholder={'Pega o sube un JSON aquí\u2026\ne.g. [{"nombre": "Juan", "edad": 30}, {"nombre": "Ana"}]'}
        />
      </Panel>

      {parsed.ok && template && (
        <Panel
          title="Plantilla generada"
          actions={
            <div style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
              <Button
                variant="primary"
                size="sm"
                onClick={handleEditInCreator}
                disabled={!parseEdited.ok}
              >
                Editar
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? '✓ Copiado' : 'Copiar'}
              </Button>
            </div>
          }
        >
          {structureMatch === false && (
            <div style={{
              padding: '8px 12px',
              marginBottom: 'var(--spacing-sm)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              color: 'var(--color-amber)',
              background: 'rgba(232, 148, 63, 0.10)',
              border: '1px solid var(--color-amber)',
            }}>
              ⚠ La estructura de la plantilla ya no coincide con el JSON original.
            </div>
          )}
          <textarea
            value={editedJson}
            onChange={(e) => setEditedJson(e.target.value)}
            spellCheck={false}
            style={{
              width: '100%',
              minHeight: 200,
              resize: 'vertical',
              padding: '12px',
              fontSize: '0.8125rem',
              lineHeight: 1.6,
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-blue)',
              background: 'var(--color-bg)',
              border: structureMatch === false
                ? '2px solid var(--color-amber)'
                : '1px solid var(--color-border)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          {parseEdited.ok === false && editedJson.trim() && (
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--color-amber)',
              marginTop: 4,
            }}>
              El JSON editado no es válido.
            </p>
          )}
        </Panel>
      )}

      {jsonInput.trim() && !parsed.ok && (
        <Panel>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-amber)' }}>
            El JSON no es válido.
          </p>
        </Panel>
      )}
    </div>
  );
}
