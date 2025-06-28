import React from 'react';
import { LogEntry } from '../../models/entry';
import { CloudSun, Moon, Coffee, Banana } from 'lucide-react';

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
      <div className="flex w-full items-center justify-center gap-2 ">
        <CloudSun className="text-primary-500" />
        <Banana className="text-primary-700" />
        <Coffee className="text-primary-500" />
        <Moon className="text-primary-700" />
      </div>

      <label className="block text-secondary-600 mb-1">ארוחות</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {(editMode || value.breakfast) && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-secondary-600">
              ארוחת בוקר
            </label>
            <input
              type="text"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full"
              placeholder="פרטים"
              value={value.breakfast || ''}
              onChange={(e) =>
                onChange({ ...value, breakfast: e.target.value })
              }
            />
          </div>
        )}
        {(editMode || value.energyAfterBreakfast !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              אנרגיה אחרי ארוחת בוקר
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="בין 1 ל-10"
              value={value.energyAfterBreakfast ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  energyAfterBreakfast:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {(editMode || value.lunch) && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-secondary-600">
              ארוחת צהריים
            </label>
            <input
              type="text"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full"
              placeholder="פרטים"
              value={value.lunch || ''}
              onChange={(e) => onChange({ ...value, lunch: e.target.value })}
            />
          </div>
        )}
        {(editMode || value.energyAfterLunch !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              אנרגיה אחרי ארוחת צהריים
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="בין 1 ל-10"
              value={value.energyAfterLunch ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  energyAfterLunch:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {(editMode || value.dinner) && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-secondary-600">
              ארוחת ערב
            </label>
            <input
              type="text"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full"
              placeholder="פרטים"
              value={value.dinner || ''}
              onChange={(e) => onChange({ ...value, dinner: e.target.value })}
            />
          </div>
        )}
        {(editMode || value.energyAfterDinner !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              אנרגיה אחרי ארוחת ערב
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="בין 1 ל-10"
              value={value.energyAfterDinner ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  energyAfterDinner:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {(editMode || value.between) && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-secondary-600">
              נשנושים
            </label>
            <input
              type="text"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full"
              placeholder="פרטים"
              value={value.between || ''}
              onChange={(e) => onChange({ ...value, between: e.target.value })}
            />
          </div>
        )}
        {(editMode || value.water !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              מים
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="כמות כוסות"
              value={value.water ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  water:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {(editMode || value.tea !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              תה
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="כמות כוסות"
              value={value.tea ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  tea:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {(editMode || value.coffee !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              קפה
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="כמות כוסות"
              value={value.coffee ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  coffee:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {(editMode || value.morningFormula !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              פורמולה בוקר
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="כמות כפיות"
              value={value.morningFormula ?? ''}
              onChange={(e) =>
                onChange({
                  ...value,
                  morningFormula:
                    e.target.value === '' ? undefined : Number(e.target.value),
                })
              }
            />
          </div>
        )}
        {(editMode || value.eveningFormula !== undefined) && (
          <div className="space-y-1 w-auto whitespace-nowrap">
            <label className="block text-sm font-medium text-secondary-600">
              פורמולה ערב
            </label>
            <input
              type="number"
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full md:w-auto"
              placeholder="כמות כפיות"
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
        )}
      </div>

      <div className="max-h-[40vh] flex items-center justify-center md:mb-0">
        <img
          src="/img/person4.png"
          alt="Person"
          className="object-cover max-h-[40vh]"
          draggable="false"
        />
      </div>
    </div>
  );
};
