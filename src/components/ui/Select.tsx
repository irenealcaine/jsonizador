import { type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
}

const style: React.CSSProperties = {
  padding: '4px 28px 4px 8px',
  fontSize: '0.75rem',
  fontFamily: 'var(--font-ui)',
  fontWeight: 500,
  color: 'var(--color-blue)',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 0,
  appearance: 'none',
  cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5' viewBox='0 0 8 5'%3E%3Cpath d='M0 0l4 5 4-5z' fill='%232B4570'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
};

export default function Select({ options, style: overrideStyle, ...props }: SelectProps) {
  return (
    <select style={{ ...style, ...overrideStyle }} {...props}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
