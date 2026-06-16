import { useState } from 'react';
import Panel from '../ui/Panel';
import JsonInput from './JsonInput';
import ValidationResult from './ValidationResult';

export default function Validator() {
  const [jsonInput, setJsonInput] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <Panel title="Entrada JSON" grid>
        <JsonInput
          value={jsonInput}
          onChange={setJsonInput}
          placeholder={'Pega tu JSON aquí…\ne.g. {"nombre": "Juan", "edad": 30}'}
        />
      </Panel>

      <Panel title="Resultado">
        <ValidationResult json={jsonInput} />
      </Panel>
    </div>
  );
}
