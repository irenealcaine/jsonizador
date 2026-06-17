import { useState } from 'react';

const typeColors = {
  string: 'var(--color-green)',
  number: 'var(--color-blue)',
  boolean: 'var(--color-amber)',
  null: 'var(--color-text-muted)',
};

export default function TreeViewNode({ node, depth, isLast }) {
  const [expanded, setExpanded] = useState(depth < 2);
  const hasChildren = node.children.length > 0;

  const indent = depth * 16;

  const toggle = () => {
    if (hasChildren) setExpanded((v) => !v);
  };

  const renderValue = () => {
    if (node.type === 'object') {
      const count = node.children.length;
      return expanded ? (
        <>
          <span style={{ color: 'var(--color-text-muted)' }}>{'{'}</span>
          <div style={{ paddingLeft: 16 }}>
            {node.children.map((child, i) => (
              <TreeViewNode key={String(child.key)} node={child} depth={depth + 1} isLast={i === node.children.length - 1} />
            ))}
          </div>
          <span style={{ color: 'var(--color-text-muted)' }}>{'}'}{!isLast ? ',' : ''}</span>
        </>
      ) : (
        <span style={{ color: 'var(--color-text-muted)' }}>{`{ ${count} ${count === 1 ? 'clave' : 'claves'} }`}</span>
      );
    }

    if (node.type === 'array') {
      const count = node.children.length;
      return expanded ? (
        <>
          <span style={{ color: 'var(--color-text-muted)' }}>{'['}</span>
          <div style={{ paddingLeft: 16 }}>
            {node.children.map((child, i) => (
              <TreeViewNode key={String(child.key)} node={child} depth={depth + 1} isLast={i === node.children.length - 1} />
            ))}
          </div>
          <span style={{ color: 'var(--color-text-muted)' }}>{']'}{!isLast ? ',' : ''}</span>
        </>
      ) : (
        <span style={{ color: 'var(--color-text-muted)' }}>{`[ ${count} ${count === 1 ? 'item' : 'items'} ]`}</span>
      );
    }

    let valueDisplay;
    switch (node.type) {
      case 'string':
        valueDisplay = `"${node.value}"`;
        break;
      case 'null':
        valueDisplay = 'null';
        break;
      default:
        valueDisplay = String(node.value);
    }

    return (
      <>
        <span style={{ color: typeColors[node.type] }}>{valueDisplay}</span>
        {!isLast && <span style={{ color: 'var(--color-text-muted)' }}>,</span>}
      </>
    );
  };

  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--font-mono-weight)', fontSize: '0.8125rem', lineHeight: 1.8 }}>
      <div style={{ paddingLeft: indent, display: 'flex', alignItems: 'flex-start' }}>
        <span
          onClick={toggle}
          style={{
            display: 'inline-block',
            width: 14,
            flexShrink: 0,
            cursor: hasChildren ? 'pointer' : 'default',
            color: 'var(--color-text-muted)',
            userSelect: 'none',
            fontSize: '0.7rem',
          }}
        >
          {hasChildren ? (expanded ? '▼' : '▶') : ' '}
        </span>

        {String(node.key) && (
          <span style={{ color: 'var(--color-blue)', marginRight: 6 }}>
            "{node.key}"
            <span style={{ color: 'var(--color-text-muted)', marginLeft: 4 }}>:</span>
          </span>
        )}

        <div style={{ flex: 1 }}>{renderValue()}</div>
      </div>
    </div>
  );
}
