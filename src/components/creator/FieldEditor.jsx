const fieldTypes = [
  { value: 'string', label: 'string' },
  { value: 'number', label: 'number' },
  { value: 'boolean', label: 'boolean' },
  { value: 'null', label: 'null' },
  { value: 'object', label: 'object' },
  { value: 'array', label: 'array' },
];

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '4px 0',
  flexWrap: 'wrap',
};

export default function FieldEditor({ field, onChange, onDelete, onDuplicate, isArrayItem, dragHandleProps, children }) {
  const handleKeyChange = (key) => {
    onChange({ ...field, key });
  };

  const handleTypeChange = (type) => {
    const newField = {
      ...field,
      type,
      value: '',
      children: type === 'object' || type === 'array' ? field.children : [],
    };
    onChange(newField);
  };

  const handleValueChange = (value) => {
    onChange({ ...field, value });
  };

  const isComposite = field.type === 'object' || field.type === 'array';

  return (
    <div style={{ borderLeft: '2px solid var(--color-border-light)', paddingLeft: 8, marginLeft: 0 }}>
      <div style={rowStyle}>
        {/* Drag handle */}
        {dragHandleProps && (
          <span {...dragHandleProps} style={{
            cursor: 'grab',
            color: 'var(--color-text-muted)',
            fontSize: '0.75rem',
            userSelect: 'none',
            lineHeight: 1,
            display: 'inline-flex',
            alignItems: 'center',
            ...dragHandleProps.style,
          }}>
            ⠿
          </span>
        )}

        {!isArrayItem && (
          <input
            type="text"
            value={field.key}
            onChange={(e) => handleKeyChange(e.target.value)}
            placeholder="clave"
            style={{
              width: 100,
              padding: '3px 6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-blue)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              outline: 'none',
            }}
          />
        )}

        {!isArrayItem && (
          <span style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>:</span>
        )}

        <select
          value={field.type}
          onChange={(e) => handleTypeChange(e.target.value)}
          style={{
            padding: '3px 6px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: isComposite ? 'var(--color-blue)' : 'var(--color-text-secondary)',
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {fieldTypes.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>

        {field.type === 'string' && (
          <input
            type="text"
            value={field.value}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder='"valor"'
            style={{
              flex: 1,
              minWidth: 120,
              padding: '3px 6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-green)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              outline: 'none',
            }}
          />
        )}

        {field.type === 'number' && (
          <input
            type="number"
            value={field.value}
            onChange={(e) => handleValueChange(e.target.value)}
            placeholder="0"
            style={{
              flex: 1,
              minWidth: 100,
              padding: '3px 6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-blue)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              outline: 'none',
            }}
          />
        )}

        {field.type === 'boolean' && (
          <select
            value={field.value}
            onChange={(e) => handleValueChange(e.target.value)}
            style={{
              flex: 1,
              minWidth: 100,
              padding: '3px 6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-amber)',
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        )}

        {field.type === 'null' && (
          <span style={{
            flex: 1,
            padding: '3px 6px',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
          }}>
            null
          </span>
        )}

        <button
          onClick={onDuplicate}
          title="Duplicar campo"
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            padding: '2px 6px',
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            lineHeight: 1.4,
          }}
        >
          +copy
        </button>

        <button
          onClick={onDelete}
          title="Eliminar campo"
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            padding: '2px 6px',
            fontSize: '0.7rem',
            color: 'var(--color-amber)',
            cursor: 'pointer',
            lineHeight: 1.4,
          }}
        >
          ✕
        </button>
      </div>

      {isComposite && children}
    </div>
  );
}
