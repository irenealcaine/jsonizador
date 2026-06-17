export function generateTemplate(data) {
  return walk(data);
}

let _idCounter = 0;
function uid() {
  _idCounter++;
  return `field-${_idCounter}-${crypto.randomUUID().slice(0, 8)}`;
}

function valueToField(key, value) {
  if (value === null) {
    return { id: uid(), key, type: 'null', value: '', children: [], required: true };
  }

  if (typeof value === 'string') {
    return { id: uid(), key, type: 'string', value: '', children: [], required: true };
  }

  if (typeof value === 'number') {
    return { id: uid(), key, type: 'number', value: '0', children: [], required: true };
  }

  if (typeof value === 'boolean') {
    return { id: uid(), key, type: 'boolean', value: 'false', children: [], required: true };
  }

  if (Array.isArray(value)) {
    const children = value.length > 0 ? [valueToField('0', value[0])] : [];
    return { id: uid(), key, type: 'array', value: '', children, required: true };
  }

  if (typeof value === 'object') {
    const children = Object.entries(value).map(([k, v]) => valueToField(k, v));
    return { id: uid(), key, type: 'object', value: '', children, required: true };
  }

  return { id: uid(), key, type: 'string', value: '', children: [], required: true };
}

export function templateToFields(data) {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return [];
  }
  return Object.entries(data).map(([k, v]) => valueToField(k, v));
}

export function structureMatches(a, b) {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;

  const typeA = Array.isArray(a) ? 'array' : typeof a;
  const typeB = Array.isArray(b) ? 'array' : typeof b;

  if (typeA !== typeB) return false;

  if (typeA === 'object') {
    const keysA = Object.keys(a).sort();
    const keysB = Object.keys(b).sort();
    if (keysA.length !== keysB.length) return false;
    if (!keysA.every((k, i) => k === keysB[i])) return false;
    return keysA.every((k) => structureMatches(a[k], b[k]));
  }

  if (typeA === 'array') {
    if (a.length === 0 && b.length === 0) return true;
    if (a.length === 0 || b.length === 0) return false;
    return structureMatches(a[0], b[0]);
  }

  return true;
}

function walk(value) {
  if (value === null) return null;

  if (typeof value === 'string') return '';

  if (typeof value === 'number') return 0;

  if (typeof value === 'boolean') return false;

  if (Array.isArray(value)) {
    if (value.length === 0) return [];

    const allObjects = value.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item));
    if (allObjects) {
      const allKeys = new Map();
      for (const item of value) {
        for (const [k, v] of Object.entries(item)) {
          if (!allKeys.has(k)) {
            allKeys.set(k, v);
          }
        }
      }
      const template = {};
      for (const [key, val] of allKeys) {
        template[key] = walk(val);
      }
      return template;
    }

    return [walk(value[0])];
  }

  if (typeof value === 'object') {
    const template = {};
    for (const [key, val] of Object.entries(value)) {
      template[key] = walk(val);
    }
    return template;
  }

  return null;
}
