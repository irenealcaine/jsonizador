let counter = 0;
export function generateId() {
  counter++;
  return `field-${counter}-${crypto.randomUUID().slice(0, 8)}`;
}

export function createEmptyField(type = 'string') {
  return {
    id: generateId(),
    key: '',
    type,
    value: '',
    children: [],
  };
}

export function buildJsonFromFields(fields) {
  const result = {};
  for (const field of fields) {
    if (!field.key && field.type !== 'array') continue;
    result[field.key || `item_${field.id.slice(-4)}`] = buildValue(field);
  }
  return result;
}

function buildValue(field) {
  switch (field.type) {
    case 'string':
      return field.value;
    case 'number':
      return field.value === '' ? 0 : Number(field.value);
    case 'boolean':
      return field.value === 'true';
    case 'null':
      return null;
    case 'object': {
      const obj = {};
      for (const child of field.children) {
        const k = child.key || `key_${child.id.slice(-4)}`;
        obj[k] = buildValue(child);
      }
      return obj;
    }
    case 'array': {
      return field.children.map(buildValue);
    }
  }
}

export function duplicateField(field) {
  return {
    ...field,
    id: generateId(),
    key: field.key ? `${field.key}_copy` : '',
    children: field.children.map(duplicateField),
  };
}
