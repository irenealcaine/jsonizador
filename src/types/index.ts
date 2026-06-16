export interface JsonStats {
  keyCount: number;
  maxDepth: number;
  bytes: number;
}

export interface JsonErrorInfo {
  message: string;
  line: number | null;
  column: number | null;
}

export interface TreeNode {
  key: string | number;
  value: unknown;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  children: TreeNode[];
}

export interface SyntaxToken {
  type: 'key' | 'string' | 'number' | 'boolean' | 'null' | 'brace' | 'bracket' | 'comma' | 'colon' | 'whitespace';
  value: string;
}

export type FieldType = 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array';

export interface FieldNode {
  id: string;
  key: string;
  type: FieldType;
  value: string;
  children: FieldNode[];
}

export type FormatIndent = 'tab' | 2 | 4;

export type ViewMode = 'tree' | 'raw';
