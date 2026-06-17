export function generateSchemaFromFields(fields) {
  if (!fields || fields.length === 0) return {};
  return {
    type: 'object',
    properties: buildProperties(fields),
    ...(buildRequired(fields).length > 0 && { required: buildRequired(fields) }),
  };
}

function buildProperties(fields) {
  const properties = {};
  for (const field of fields) {
    if (!field.key && field.type !== 'array') continue;
    const key = field.key || `item_${field.id.slice(-4)}`;
    properties[key] = fieldToSchema(field);
  }
  return properties;
}

function buildRequired(fields) {
  return fields
    .filter((f) => f.key && f.required !== false)
    .map((f) => f.key);
}

function fieldToSchema(field) {
  switch (field.type) {
    case 'string':
      return { type: 'string' };
    case 'number':
      return { type: 'number' };
    case 'boolean':
      return { type: 'boolean' };
    case 'null':
      return { type: 'null' };
    case 'object': {
      const schema = {
        type: 'object',
        properties: buildProperties(field.children),
      };
      const req = buildRequired(field.children);
      if (req.length > 0) schema.required = req;
      return schema;
    }
    case 'array': {
      if (field.children.length > 0) {
        return { type: 'array', items: fieldToSchema(field.children[0]) };
      }
      return { type: 'array' };
    }
    default:
      return {};
  }
}

export function generateSchema(data) {
  return walk(data, '#');
}

function walk(value, path) {
  if (value === null) {
    return { type: 'null' };
  }

  if (Array.isArray(value)) {
    const items = value.length > 0
      ? value.reduce((acc, item, i) => {
          const schema = walk(item, `${path}/items/${i}`);
          return mergeSchemas(acc, schema);
        }, null)
      : {};
    return {
      type: 'array',
      items: items || {},
    };
  }

  if (typeof value === 'object') {
    const properties = {};
    const required = [];
    for (const [key, val] of Object.entries(value)) {
      properties[key] = walk(val, `${path}/${key}`);
      if (val !== null && val !== undefined) {
        required.push(key);
      }
    }
    const schema = {
      type: 'object',
      properties,
    };
    if (required.length > 0) {
      schema.required = required;
    }
    return schema;
  }

  if (typeof value === 'string') {
    return { type: 'string' };
  }

  if (typeof value === 'number') {
    return { type: 'number' };
  }

  if (typeof value === 'boolean') {
    return { type: 'boolean' };
  }

  return {};
}

function mergeSchemas(a, b) {
  if (!a) return b;
  if (!b) return a;

  if (a.type !== b.type) {
    const types = [...new Set([a.type, b.type].filter(Boolean))];
    return { type: types.length === 1 ? types[0] : types };
  }

  if (a.type === 'object' && b.type === 'object') {
    const merged = { type: 'object', properties: { ...a.properties, ...b.properties } };
    const required = [...new Set([...(a.required || []), ...(b.required || [])])];
    if (required.length > 0) merged.required = required;
    return merged;
  }

  if (a.type === 'array' && b.type === 'array') {
    return { type: 'array', items: mergeSchemas(a.items, b.items) };
  }

  return a;
}
