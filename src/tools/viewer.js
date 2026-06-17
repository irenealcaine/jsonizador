export function buildTree(value, key = '') {
  if (value === null) {
    return { key, value: null, type: 'null', children: [] };
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return {
        key,
        value,
        type: 'array',
        children: value.map((item, index) => buildTree(item, index)),
      };
    }
    return {
      key,
      value,
      type: 'object',
      children: Object.entries(value).map(([k, v]) => buildTree(v, k)),
    };
  }

  return {
    key,
    value,
    type: typeof value,
    children: [],
  };
}

export function tokenize(json) {
  const raw = [];

  const re = /("(?:[^"\\]|\\.)*")|(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(\btrue\b)|(\bfalse\b)|(\bnull\b)|([\[\]{}])|(,)|(:)|(\s+)|(.+?)/g;

  let m;
  while ((m = re.exec(json)) !== null) {
    if (m[1] !== undefined) raw.push({ type: 'string', value: m[1] });
    else if (m[2] !== undefined) raw.push({ type: 'number', value: m[2] });
    else if (m[3] !== undefined) raw.push({ type: 'boolean', value: m[3] });
    else if (m[4] !== undefined) raw.push({ type: 'boolean', value: m[4] });
    else if (m[5] !== undefined) raw.push({ type: 'null', value: m[5] });
    else if (m[6] !== undefined) raw.push({ type: /[{}]/.test(m[6]) ? 'brace' : 'bracket', value: m[6] });
    else if (m[7] !== undefined) raw.push({ type: 'comma', value: m[7] });
    else if (m[8] !== undefined) raw.push({ type: 'colon', value: m[8] });
    else if (m[9] !== undefined) raw.push({ type: 'whitespace', value: m[9] });
    else if (m[10] !== undefined) raw.push({ type: 'unknown', value: m[10] });
  }

  const tokens = [];
  for (let i = 0; i < raw.length; i++) {
    if (raw[i].type === 'string') {
      let j = i + 1;
      while (j < raw.length && raw[j].type === 'whitespace') j++;
      if (j < raw.length && raw[j].type === 'colon') {
        tokens.push({ type: 'key', value: raw[i].value });
        continue;
      }
    }
    tokens.push(raw[i]);
  }

  return tokens;
}
