import React from 'react';
import { LogEntry } from '../../models/entry';

type Props = {
  value: LogEntry['feelings'];
  onChange: (feelings: LogEntry['feelings']) => void;
  editMode: boolean;
};

export const EntryFeelingsSection: React.FC<Props> = ({
  value,
  onChange,
  editMode,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-secondary-600 mb-1">הרגשות</label>
      {(['therapy', 'training', 'meals'] as const).map((field) => (
        <div key={field}>
          <label className="block text-secondary-500 mb-1">
            {field === 'therapy' && 'טיפול'}
            {field === 'training' && 'אימון'}
            {field === 'meals' && 'ארוחות'}
          </label>
          <textarea
            disabled={!editMode}
            className="border rounded px-2 py-1 w-full mb-2"
            placeholder={field}
            value={value[field].join(', ')}
            onChange={(e) =>
              onChange({
                ...value,
                [field]: e.target.value
                  .split(',')
                  .map((s) => s.trim())
                  .filter(Boolean),
              })
            }
          />
        </div>
      ))}
    </div>
  );
};
