import React, { useState } from 'react';
import { LogEntry } from '../../models/entry';
import { PersonStanding, Activity } from 'lucide-react';

const FEELINGS_OPTIONS = {
  training: ['שחרור', 'החמרה', 'אנרגטיות', 'עייפות', 'כאב', 'הקלה', 'רוגע'],
  meals: [
    'כבדות',
    'נפיחות בטנית',
    'גיהוקים',
    'שיהוקים',
    'עצירות',
    'יציאות רכות',
    'אנרגטיות',
    'חום',
    'קור',
  ],
  general: [
    'עצב',
    'שמחה',
    'הפתעה',
    'כעס',
    'פחד',
    'גועל',
    'דאגה',
    'תסכול',
    'תשוקה',
    'אופטימיות',
    'פסימיות',
  ],
};

type Props = {
  value: LogEntry['feelings'] | undefined;
  onChange: (feelings: LogEntry['feelings']) => void;
  editMode: boolean;
};

const getLabel = (field: string) => {
  switch (field) {
    case 'general':
      return 'רגשות שעלו בי';
    case 'training':
      return 'אחרי תנועה';
    case 'meals':
      return 'אחרי ארוחה';
    default:
      return '';
  }
};

export const EntryFeelingsSection: React.FC<Props> = ({
  value,
  onChange,
  editMode,
}) => {
  value = value || {};
  const [customInputs, setCustomInputs] = useState<{ [k: string]: string }>({});

  const handleSelect = (field: keyof LogEntry['feelings'], option: string) => {
    const arr = value?.[field] || [];
    if (arr.includes(option)) {
      onChange({ ...value, [field]: arr.filter((v) => v !== option) });
    } else {
      onChange({ ...value, [field]: [...arr, option] });
    }
  };

  const handleCustomAdd = (field: keyof LogEntry['feelings']) => {
    const val = (customInputs[field] || '').trim();
    if (!val) return;
    const arr = value?.[field] || [];
    if (!arr.includes(val)) {
      onChange({ ...value, [field]: [...arr, val] });
    }
    setCustomInputs((prev) => ({ ...prev, [field]: '' }));
  };

  const handleCustomInput = (field: keyof LogEntry['feelings'], v: string) => {
    setCustomInputs((prev) => ({ ...prev, [field]: v }));
  };

  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-center gap-2 ">
        <Activity className="text-primary-500" />
        <PersonStanding className="text-primary-700" />
      </div>

      <label className="block text-primary-500 mb-1">איך הרגשת היום?</label>
      {(['training', 'meals', 'general'] as const)
        .filter((field) => editMode || (value?.[field] && value[field]?.length))
        .map((field, idx, arr) => (
          <React.Fragment key={field}>
            <div className="mb-4">
              <label className="block text-secondary-500 mb-4">
                {getLabel(field)}
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {FEELINGS_OPTIONS[field].map((option) => (
                  <button
                    key={option}
                    type="button"
                    disabled={!editMode}
                    className={`px-3 py-1 rounded-full border text-sm transition-all ${
                      value?.[field]?.includes(option)
                        ? 'bg-primary-400 text-white border-primary-400'
                        : 'bg-white text-primary-500 border-primary-200 hover:bg-primary-50'
                    }${editMode ? '' : ' cursor-default'}${editMode ? '' : ''}`}
                    style={!editMode ? { pointerEvents: 'none' } : {}}
                    onClick={() => handleSelect(field, option)}
                  >
                    {option}
                  </button>
                ))}
                {value?.[field]
                  ?.filter((v) => !FEELINGS_OPTIONS[field].includes(v))
                  .map((custom) => (
                    <button
                      key={custom}
                      type="button"
                      disabled={!editMode}
                      className={`px-3 py-1 rounded-full border text-sm transition-all bg-primary-100 text-primary-700 border-primary-200${editMode ? '' : ' cursor-default'}`}
                      style={!editMode ? { pointerEvents: 'none' } : {}}
                      onClick={() => handleSelect(field, custom)}
                    >
                      {custom}
                    </button>
                  ))}
              </div>
              {editMode && (
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 flex-1"
                    placeholder="הוסיפי ערך חופשי..."
                    value={customInputs[field] || ''}
                    onChange={(e) => handleCustomInput(field, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleCustomAdd(field);
                      }
                    }}
                    disabled={!editMode}
                  />
                  <button
                    type="button"
                    className="bg-primary-400 text-white px-3 py-1 rounded"
                    onClick={() => handleCustomAdd(field)}
                    disabled={!editMode || !(customInputs[field] || '').trim()}
                  >
                    הוסיפי
                  </button>
                </div>
              )}
            </div>
            {idx < arr.length - 1 && (
              <hr className="my-4 border-t border-neutral-200 opacity-60" />
            )}
          </React.Fragment>
        ))}

      <div className="w-full flex items-center justify-center md:mb-0">
        <img
          src="/img/person3.png"
          alt="Person"
          className="object-cover w-full h-full md:max-w-[30vw]"
          draggable="false"
        />
      </div>
    </div>
  );
};
