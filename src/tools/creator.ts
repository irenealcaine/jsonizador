import type { FieldNode, FieldType } from '../types';

let counter = 0;
export function generateId(): string {
  counter++;
  return `field-${counter}-${crypto.randomUUID().slice(0, 8)}`;
}

export function createEmptyField(type: FieldType = 'string'): FieldNode {
  return {
    id: generateId(),
    key: '',
    type,
    value: '',
    children: [],
  };
}

export function buildJsonFromFields(fields: FieldNode[]): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const field of fields) {
    if (!field.key && field.type !== 'array') continue;
    result[field.key || `item_${field.id.slice(-4)}`] = buildValue(field);
  }
  return result;
}

function buildValue(field: FieldNode): unknown {
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
      const obj: Record<string, unknown> = {};
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

export function duplicateField(field: FieldNode): FieldNode {
  return {
    ...field,
    id: generateId(),
    key: field.key ? `${field.key}_copy` : '',
    children: field.children.map(duplicateField),
  };
}
