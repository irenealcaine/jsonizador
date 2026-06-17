export function formatJson(json, indent) {
  const parsed = JSON.parse(json);
  const spaces = indent === 'tab' ? '\t' : indent;
  return JSON.stringify(parsed, null, spaces);
}

export function minifyJson(json) {
  const parsed = JSON.parse(json);
  return JSON.stringify(parsed);
}

export function parseJsonError(err, json) {
  const msg = err.message;

  let match = msg.match(/line\s+(\d+).*?column\s+(\d+)/i);
  if (match) {
    return { message: msg, line: parseInt(match[1]), column: parseInt(match[2]) };
  }

  match = msg.match(/position\s+(\d+)/i);
  if (match) {
    const pos = parseInt(match[1]);
    const before = json.slice(0, pos);
    const lastNewline = before.lastIndexOf('\n');
    return {
      message: msg,
      line: before.split('\n').length,
      column: pos - lastNewline,
    };
  }

  return { message: msg, line: null, column: null };
}

export function analyzeJson(data) {
  let keyCount = 0;
  let maxDepth = 0;

  function walk(value, depth) {
    maxDepth = Math.max(maxDepth, depth);
    if (typeof value === 'object' && value !== null) {
      if (Array.isArray(value)) {
        for (const item of value) {
          walk(item, depth + 1);
        }
      } else {
        const keys = Object.keys(value);
        keyCount += keys.length;
        for (const val of Object.values(value)) {
          walk(val, depth + 1);
        }
      }
    }
  }

  walk(data, 1);
  const bytes = new TextEncoder().encode(JSON.stringify(data)).length;

  return { keyCount, maxDepth, bytes };
}
