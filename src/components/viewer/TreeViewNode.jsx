import { useState, useMemo, useEffect } from 'react';

const typeColors = {
  string: 'var(--color-green)',
  number: 'var(--color-blue)',
  boolean: 'var(--color-amber)',
  null: 'var(--color-text-muted)',
};

function highlightText(text, query) {
  if (!query || !text) return text;
  const str = String(text);
  const idx = str.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {str.slice(0, idx)}
      <span style={{ background: 'rgba(232, 148, 63, 0.3)', borderRadius: 2 }}>{str.slice(idx, idx + query.length)}</span>
      {str.slice(idx + query.length)}
    </>
  );
}

function matchesQuery(node, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  if (String(node.key).toLowerCase().includes(q)) return true;
  if (String(node.value).toLowerCase().includes(q)) return true;
  return false;
}

function hasMatchingDescendant(node, query) {
  if (!query) return false;
  return node.children.some((child) => matchesQuery(child, query) || hasMatchingDescendant(child, query));
}

export default function TreeViewNode({ node, depth, isLast, searchQuery = '' }) {
  const childHasMatch = useMemo(() => hasMatchingDescendant(node, searchQuery), [node, searchQuery]);
  const [expanded, setExpanded] = useState(depth < 2);

  useEffect(() => {
    if (searchQuery && childHasMatch) {
      setExpanded(true);
    } else if (!searchQuery) {
      setExpanded(depth < 2);
    }
  }, [searchQuery, childHasMatch, depth]);

  const hasChildren = node.children.length > 0;
  const indent = depth * 16;
  const nodeMatches = matchesQuery(node, searchQuery);

  const toggle = () => {
    if (hasChildren) setExpanded((v) => !v);
  };

  const renderValue = () => {
    if (node.type === 'object') {
      const count = node.children.length;
      const filteredChildren = searchQuery
        ? node.children.filter((child) => matchesQuery(child, searchQuery) || hasMatchingDescendant(child, searchQuery))
        : node.children;

      return expanded ? (
        <>
          <span style={{ color: 'var(--color-text-muted)' }}>{'{'}</span>
          <div style={{ paddingLeft: 16 }}>
            {filteredChildren.map((child, i) => (
              <TreeViewNode key={String(child.key)} node={child} depth={depth + 1} isLast={i === filteredChildren.length - 1} searchQuery={searchQuery} />
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
      const filteredChildren = searchQuery
        ? node.children.filter((child) => matchesQuery(child, searchQuery) || hasMatchingDescendant(child, searchQuery))
        : node.children;

      return expanded ? (
        <>
          <span style={{ color: 'var(--color-text-muted)' }}>{'['}</span>
          <div style={{ paddingLeft: 16 }}>
            {filteredChildren.map((child, i) => (
              <TreeViewNode key={String(child.key)} node={child} depth={depth + 1} isLast={i === filteredChildren.length - 1} searchQuery={searchQuery} />
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
        <span style={{ color: typeColors[node.type] }}>
          {searchQuery ? highlightText(valueDisplay, searchQuery) : valueDisplay}
        </span>
        {!isLast && <span style={{ color: 'var(--color-text-muted)' }}>,</span>}
      </>
    );
  };

  return (
    <div style={{
      fontFamily: 'var(--font-mono)',
      fontWeight: 'var(--font-mono-weight)',
      fontSize: '0.8125rem',
      lineHeight: 1.8,
      background: nodeMatches && searchQuery ? 'rgba(107, 143, 207, 0.08)' : undefined,
    }}>
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
            {searchQuery ? highlightText(`"${node.key}"`, searchQuery) : `"${node.key}"`}
            <span style={{ color: 'var(--color-text-muted)', marginLeft: 4 }}>:</span>
          </span>
        )}

        <div style={{ flex: 1 }}>{renderValue()}</div>
      </div>
    </div>
  );
}
