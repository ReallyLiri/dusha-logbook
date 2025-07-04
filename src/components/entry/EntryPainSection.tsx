import React from 'react';
import { LogEntry, PainDetails } from '../../models/entry';
import { BodySelect } from '../body/BodySelect.tsx';

type Props = {
  value: LogEntry['pain'] | undefined;
  onChange: (pain: LogEntry['pain']) => void;
  editMode: boolean;
};

export const EntryPainSection: React.FC<Props> = ({
  value,
  onChange,
  editMode,
}) => {
  value = value || {
    locations: [],
    detailsBefore: [],
    detailsAfter: [],
  };

  const handleDetailsChange = (
    key: keyof Omit<LogEntry['pain'], 'locations'>,
    idx: number,
    field: keyof PainDetails,
    val: string | number
  ) => {
    const arr = (value[key] as PainDetails[]).map((d, i) =>
      i === idx ? { ...d, [field]: val } : d
    );
    onChange({ ...value, [key]: arr });
  };
  const handleAddDetails = (key: keyof Omit<LogEntry['pain'], 'locations'>) => {
    onChange({
      ...value,
      [key]: [...(value[key] as PainDetails[]), { where: '', level: '' }],
    });
  };
  const handleRemoveDetails = (
    key: keyof Omit<LogEntry['pain'], 'locations'>,
    idx: number
  ) => {
    onChange({
      ...value,
      [key]: (value[key] as PainDetails[]).filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-secondary-600 mb-1">כאבים בגוף</label>
      <BodySelect
        editMode={editMode}
        locations={value.locations}
        setLocations={(locations) => onChange({ ...value, locations })}
      />

      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      {(['detailsBefore', 'detailsAfter'] as const)
        .filter((key) => editMode || (value[key] as PainDetails[]).length > 0)
        .map((key, i) => (
          <div key={key}>
            {i > 0 && (
              <hr className="my-4 border-t border-neutral-200 opacity-60" />
            )}
            <label className="block text-secondary-600 mt-4 mb-1">
              {key === 'detailsBefore' && 'פירוט: כאבים לפני תנועה'}
              {key === 'detailsAfter' && 'פירוט: כאבים לאחר תנועה'}
            </label>
            {(value[key] as PainDetails[]).map((det, idx) => (
              <div key={idx} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  disabled={!editMode}
                  className="border rounded px-2 py-1"
                  placeholder="מיקום הכאב"
                  value={det.where}
                  onChange={(e) =>
                    handleDetailsChange(key, idx, 'where', e.target.value)
                  }
                />
                <input
                  type="number"
                  min={1}
                  max={10}
                  disabled={!editMode}
                  placeholder="כאב בין 1 ל-10"
                  className="border rounded px-2 py-1 w-32"
                  value={det.level}
                  onChange={(e) =>
                    handleDetailsChange(
                      key,
                      idx,
                      'level',
                      Number(e.target.value)
                    )
                  }
                />
                {editMode && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleRemoveDetails(key, idx)}
                  >
                    הסרה
                  </button>
                )}
              </div>
            ))}
            {editMode && (
              <button
                type="button"
                className="text-primary-500"
                onClick={() => handleAddDetails(key)}
              >
                הוספה
              </button>
            )}
          </div>
        ))}
    </div>
  );
};
