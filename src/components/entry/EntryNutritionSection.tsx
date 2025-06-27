import React from 'react';
import { LogEntry } from '../../models/entry';

type Props = {
  value: LogEntry['nutrition'] | undefined;
  onChange: (nutrition: LogEntry['nutrition']) => void;
  editMode: boolean;
};

export const EntryNutritionSection: React.FC<Props> = ({
  value,
  onChange,
  editMode,
}) => {
  value = value || {};
  return (
    <div className="space-y-4">
      <label className="block text-secondary-600 mb-1">ארוחות</label>
      <input
        type="text"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="ארוחת בוקר"
        value={value.breakfast || ''}
        onChange={(e) => onChange({ ...value, breakfast: e.target.value })}
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="אנרגיה אחרי בוקר"
        value={value.energyAfterBreakfast ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            energyAfterBreakfast:
              e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
      <input
        type="text"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="ארוחת צהריים"
        value={value.lunch || ''}
        onChange={(e) => onChange({ ...value, lunch: e.target.value })}
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="אנרגיה אחרי צהריים"
        value={value.energyAfterLunch ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            energyAfterLunch:
              e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
      <input
        type="text"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="ארוחת ערב"
        value={value.dinner || ''}
        onChange={(e) => onChange({ ...value, dinner: e.target.value })}
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="אנרגיה אחרי ערב"
        value={value.energyAfterDinner ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            energyAfterDinner:
              e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
      <input
        type="text"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="נשנושים"
        value={value.between || ''}
        onChange={(e) => onChange({ ...value, between: e.target.value })}
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="מים (כוסות)"
        value={value.water ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            water: e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="תה (כוסות)"
        value={value.tea ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            tea: e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="קפה (כוסות)"
        value={value.coffee ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            coffee: e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="פורמולה בוקר (כפיות)"
        value={value.morningFormula ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            morningFormula:
              e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
      <input
        type="number"
        disabled={!editMode}
        className="border rounded px-2 py-1 w-full mb-2"
        placeholder="פורמולה ערב (כפיות)"
        value={value.eveningFormula ?? ''}
        onChange={(e) =>
          onChange({
            ...value,
            eveningFormula:
              e.target.value === '' ? undefined : Number(e.target.value),
          })
        }
      />
    </div>
  );
};
