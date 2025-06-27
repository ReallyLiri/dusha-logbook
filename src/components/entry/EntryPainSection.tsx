import React from 'react';
import { PainLocation, LogEntry, PainDetails } from '../../models/entry';

type Location = {
  location: PainLocation;
  side: 'left' | 'right' | 'both';
};

type Props = {
  value: LogEntry['pain'];
  onChange: (pain: LogEntry['pain']) => void;
  editMode: boolean;
};

export const EntryPainSection: React.FC<Props> = ({
  value,
  onChange,
  editMode,
}) => {
  const handleLocationChange = (
    idx: number,
    field: keyof Location,
    val: PainLocation | 'left' | 'right' | 'both'
  ) => {
    const updated = value.locations.map((l, i) =>
      i === idx ? { ...l, [field]: val } : l
    );
    onChange({ ...value, locations: updated });
  };
  const handleAddLocation = () => {
    onChange({
      ...value,
      locations: [
        ...value.locations,
        { location: 'arm' as PainLocation, side: 'left' as 'left' },
      ],
    });
  };
  const handleRemoveLocation = (idx: number) => {
    onChange({
      ...value,
      locations: value.locations.filter((_, i) => i !== idx),
    });
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
      [key]: [...(value[key] as PainDetails[]), { where: '', level: 0 }],
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
      <label className="block text-secondary-600 mb-1">מיקומים</label>
      {value.locations.map((loc, idx) => (
        <div key={idx} className="flex gap-2 items-center mb-2">
          <select
            disabled={!editMode}
            className="border rounded px-2 py-1"
            value={loc.location}
            onChange={(e) =>
              handleLocationChange(
                idx,
                'location',
                e.target.value as PainLocation
              )
            }
          >
            <option value="arm">יד</option>
            <option value="front">קדמי</option>
            <option value="back">גב</option>
            <option value="head">ראש</option>
            <option value="foot">רגל</option>
          </select>
          <select
            disabled={!editMode}
            className="border rounded px-2 py-1"
            value={loc.side}
            onChange={(e) =>
              handleLocationChange(
                idx,
                'side',
                e.target.value as 'left' | 'right' | 'both'
              )
            }
          >
            <option value="left">שמאל</option>
            <option value="right">ימין</option>
            <option value="both">שניהם</option>
          </select>
          {editMode && (
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleRemoveLocation(idx)}
            >
              הסר
            </button>
          )}
        </div>
      ))}
      {editMode && (
        <button
          type="button"
          className="text-primary-500"
          onClick={handleAddLocation}
        >
          הוסף מיקום
        </button>
      )}
      {(
        [
          'detailsBefore',
          'detailsAfterTherapy',
          'detailsAfterTraining',
        ] as const
      ).map((key) => (
        <div key={key}>
          <label className="block text-secondary-600 mt-4 mb-1">
            {key === 'detailsBefore' && 'רמת כאב לפני טיפול'}
            {key === 'detailsAfterTherapy' && 'רמת כאב אחרי טיפול'}
            {key === 'detailsAfterTraining' && 'רמת כאב אחרי אימון'}
          </label>
          {(value[key] as PainDetails[]).map((det, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                disabled={!editMode}
                className="border rounded px-2 py-1"
                value={det.where}
                onChange={(e) =>
                  handleDetailsChange(key, idx, 'where', e.target.value)
                }
              />
              <input
                type="number"
                min={0}
                max={10}
                disabled={!editMode}
                className="border rounded px-2 py-1 w-16"
                value={det.level}
                onChange={(e) =>
                  handleDetailsChange(key, idx, 'level', Number(e.target.value))
                }
              />
              {editMode && (
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveDetails(key, idx)}
                >
                  הסר
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
              הוסף
            </button>
          )}
        </div>
      ))}
    </div>
  );
};
