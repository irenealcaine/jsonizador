import { useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import FieldEditor from './FieldEditor';
import { createEmptyField, duplicateField } from '../../tools/creator';
import type { FieldNode } from '../../types';

interface FieldListProps {
  fields: FieldNode[];
  onChange: (fields: FieldNode[]) => void;
  parentType?: 'object' | 'array';
}

function SortableItem({
  field,
  index,
  fields,
  onChange,
  onDelete,
  onDuplicate,
  parentType,
}: {
  field: FieldNode;
  index: number;
  fields: FieldNode[];
  onChange: (fields: FieldNode[]) => void;
  onDelete: () => void;
  onDuplicate: () => void;
  parentType: 'object' | 'array';
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id, disabled: false });

  const style: React.CSSProperties = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition: transition || undefined,
    zIndex: isDragging ? 10 : undefined,
    position: isDragging ? 'relative' : undefined,
    opacity: isDragging ? 0.6 : 1,
    background: isDragging ? 'var(--color-surface)' : undefined,
    border: isDragging ? '1px solid var(--color-blue)' : undefined,
  } : {};

  const handleFieldChange = (updated: FieldNode) => {
    const next = [...fields];
    next[index] = updated;
    onChange(next);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <FieldEditor
        field={field}
        onChange={handleFieldChange}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        isArrayItem={parentType === 'array'}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        {(field.type === 'object' || field.type === 'array') && (
          <FieldList
            fields={field.children}
            onChange={(children) => {
              handleFieldChange({ ...field, children });
            }}
            parentType={field.type}
          />
        )}
      </FieldEditor>
    </div>
  );
}

export default function FieldList({ fields, onChange, parentType = 'object' }: FieldListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const next = [...fields];
    const [moved] = next.splice(oldIndex, 1);
    next.splice(newIndex, 0, moved);
    onChange(next);
  }, [fields, onChange]);

  const handleAddField = () => {
    onChange([...fields, createEmptyField('string')]);
  };

  const handleDelete = (id: string) => {
    onChange(fields.filter((f) => f.id !== id));
  };

  const handleDuplicate = (field: FieldNode) => {
    const idx = fields.findIndex((f) => f.id === field.id);
    const next = [...fields];
    next.splice(idx + 1, 0, duplicateField(field));
    onChange(next);
  };

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
          {fields.length === 0 && (
            <p style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.8125rem',
              color: 'var(--color-text-muted)',
              padding: '8px 0',
              fontStyle: 'italic',
            }}>
              {parentType === 'array'
                ? 'Añade elementos al array...'
                : 'Añade campos al objeto...'}
            </p>
          )}
          {fields.map((field, index) => (
            <SortableItem
              key={field.id}
              field={field}
              index={index}
              fields={fields}
              onChange={onChange}
              onDelete={() => handleDelete(field.id)}
              onDuplicate={() => handleDuplicate(field)}
              parentType={parentType}
            />
          ))}
        </SortableContext>
      </DndContext>

      <button
        onClick={handleAddField}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          marginTop: 8,
          padding: '4px 12px',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-ui)',
          fontWeight: 500,
          color: 'var(--color-blue)',
          background: 'none',
          border: '1px dashed var(--color-border)',
          cursor: 'pointer',
        }}
      >
        + Añadir {parentType === 'array' ? 'elemento' : 'campo'}
      </button>
    </div>
  );
}
