import { useRef, useState, useCallback } from 'react';

export default function JsonInput({ value, onChange, placeholder, rows = 12 }) {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
    };
    reader.readAsText(file);
  }, [onChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
    e.target.value = '';
  }, [handleFile]);

  const handleClickImport = useCallback(() => {
    fileRef.current?.click();
  }, []);

  return (
    <div
      style={{ position: 'relative' }}
      onDragOver={handleDragOver}
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileRef}
        type="file"
        accept=".json,application/json"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
        <button
          onClick={handleClickImport}
          style={{
            background: 'none',
            border: '1px solid var(--color-border)',
            padding: '3px 10px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            color: 'var(--color-blue)',
            cursor: 'pointer',
            lineHeight: 1.4,
          }}
        >
          Importar archivo
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        spellCheck={false}
        style={{
          width: '100%',
          resize: 'vertical',
          padding: '12px',
          fontSize: '0.8125rem',
          lineHeight: 1.6,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text)',
          background: 'var(--color-bg)',
          border: dragging
            ? '2px dashed var(--color-blue)'
            : '1px solid var(--color-border)',
          outline: 'none',
        }}
      />

      {dragging && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(26, 29, 33, 0.85)',
          zIndex: 10,
          pointerEvents: 'none',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.9375rem',
          color: 'var(--color-blue)',
          fontWeight: 500,
        }}>
          Suelta tu archivo JSON aquí
        </div>
      )}
    </div>
  );
}
