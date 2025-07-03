import React, { useState } from 'react';
import { LogEntry } from '../../models/entry';
import { MenstrualCycleSelector } from '../MenstruationCycle';

const BLOOD_COLOR_OPTIONS = ['ורוד בהיר', 'אדום רגיל', 'אדום בוהק', 'חום'];
const LUMPS_OPTIONS = ['גדולים', 'קטנים'];
const AFTERWARDS_OPTIONS = [
  'סחרחורות',
  'אנרגיה',
  'חוסר-אנרגיה',
  'כאבי מפרקים',
  'נשירת שיער',
  'טשטוש בראייה',
  'מיגרנות',
  'אחר',
];

type Props = {
  value: LogEntry['menstruation'] | undefined;
  onChange: (menstruation: LogEntry['menstruation']) => void;
  editMode: boolean;
};

export const EntryMenstruationSection: React.FC<Props> = ({
  value,
  onChange,
  editMode,
}) => {
  value = value || {};
  const [customBloodColor, setCustomBloodColor] = useState(
    value.bloodColor && !BLOOD_COLOR_OPTIONS.includes(value.bloodColor)
      ? value.bloodColor
      : ''
  );
  const [customAfterwards, setCustomAfterwards] = useState<string>('');

  const handleBloodColor = (color: string) => {
    if (value.bloodColor === color) {
      onChange({ ...value, bloodColor: '' });
      setCustomBloodColor('');
    } else {
      onChange({ ...value, bloodColor: color });
      setCustomBloodColor('');
    }
  };

  const handleCustomBloodColorFocus = () => {
    if (value.bloodColor && BLOOD_COLOR_OPTIONS.includes(value.bloodColor)) {
      onChange({ ...value, bloodColor: '' });
    }
  };

  const handleLumps = (lump: string) => {
    onChange({ ...value, lumps: lump });
  };

  const handleAfterwards = (option: string) => {
    const arr = value.afterwards || [];
    if (option === 'אחר') {
      if (customAfterwards && !arr.includes(customAfterwards)) {
        onChange({ ...value, afterwards: [...arr, customAfterwards] });
        setCustomAfterwards('');
      }
      return;
    }
    if (arr.includes(option)) {
      onChange({ ...value, afterwards: arr.filter((v) => v !== option) });
    } else {
      onChange({ ...value, afterwards: [...arr, option] });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-secondary-500 mb-2">יום במחזור</label>
        <MenstrualCycleSelector
          selectedDay={value.day ?? null}
          setSelectedDay={(day) => {
            if (editMode) onChange({ ...value, day: day ?? undefined });
          }}
          editMode={editMode}
        />
      </div>
      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      <div>
        <label className="block text-secondary-500 mb-2">אורך המחזור</label>
        <input
          type="number"
          defaultValue={28}
          className="border rounded px-2 py-1 w-full"
          value={value.numOfDays ?? ''}
          onChange={(e) =>
            onChange({ ...value, numOfDays: Number(e.target.value) })
          }
          disabled={!editMode}
        />
      </div>
      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      <div>
        <label className="block text-secondary-500 mb-2">
          משך הווסת (ימים)
        </label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-full"
          value={value.numOfDays ?? ''}
          onChange={(e) =>
            onChange({ ...value, numOfDays: Number(e.target.value) })
          }
          disabled={!editMode}
        />
      </div>
      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      <div>
        <label className="block text-secondary-500 mb-2">צבע הדם</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {BLOOD_COLOR_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              disabled={!editMode}
              className={`px-3 py-1 rounded-full border text-sm transition-all ${
                value.bloodColor === option
                  ? 'bg-primary-400 text-white border-primary-400'
                  : 'bg-white text-primary-500 border-primary-200 hover:bg-primary-50'
              }${editMode ? '' : ' cursor-default'}`}
              style={!editMode ? { pointerEvents: 'none' } : {}}
              onClick={() => handleBloodColor(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {editMode && (
          <input
            type="text"
            className="border rounded px-2 py-1 w-full mt-2"
            placeholder="צייני צבע אחר..."
            value={customBloodColor}
            onFocus={handleCustomBloodColorFocus}
            onChange={(e) => {
              setCustomBloodColor(e.target.value);
              onChange({ ...value, bloodColor: e.target.value });
            }}
            disabled={!editMode}
          />
        )}
      </div>
      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      <div>
        <label className="block text-secondary-500 mb-2">גושים</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {LUMPS_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              disabled={!editMode}
              className={`px-3 py-1 rounded-full border text-sm transition-all ${
                value.lumps === option
                  ? 'bg-primary-400 text-white border-primary-400'
                  : 'bg-white text-primary-500 border-primary-200 hover:bg-primary-50'
              }${editMode ? '' : ' cursor-default'}`}
              style={!editMode ? { pointerEvents: 'none' } : {}}
              onClick={() => handleLumps(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      <div>
        <label className="block text-secondary-500 mb-2">כאבים</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {[
            { label: 'כן', value: true },
            { label: 'לא', value: false },
          ].map(({ label, value: boolVal }) => (
            <button
              key={label}
              type="button"
              disabled={!editMode}
              className={`px-3 py-1 rounded-full border text-sm transition-all ${
                value.pain === boolVal
                  ? 'bg-primary-400 text-white border-primary-400'
                  : 'bg-white text-primary-500 border-primary-200 hover:bg-primary-50'
              }${editMode ? '' : ' cursor-default'}`}
              style={!editMode ? { pointerEvents: 'none' } : {}}
              onClick={() =>
                onChange({
                  ...value,
                  pain: value.pain === boolVal ? undefined : boolVal,
                })
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      <div>
        <label className="block text-secondary-500 mb-2">הפרשה דביקה</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {[
            { label: 'כן', value: true },
            { label: 'לא', value: false },
          ].map(({ label, value: boolVal }) => (
            <button
              key={label}
              type="button"
              disabled={!editMode}
              className={`px-3 py-1 rounded-full border text-sm transition-all ${
                value.sticky === boolVal
                  ? 'bg-primary-400 text-white border-primary-400'
                  : 'bg-white text-primary-500 border-primary-200 hover:bg-primary-50'
              }${editMode ? '' : ' cursor-default'}`}
              style={!editMode ? { pointerEvents: 'none' } : {}}
              onClick={() =>
                onChange({
                  ...value,
                  sticky: value.sticky === boolVal ? undefined : boolVal,
                })
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-4 border-t border-neutral-200 opacity-60" />
      <div>
        <label className="block text-secondary-500 mb-2">אחרי הווסת</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {AFTERWARDS_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              disabled={!editMode}
              className={`px-3 py-1 rounded-full border text-sm transition-all ${
                value.afterwards?.includes(option)
                  ? 'bg-primary-400 text-white border-primary-400'
                  : 'bg-white text-primary-500 border-primary-200 hover:bg-primary-50'
              }${editMode ? '' : ' cursor-default'}`}
              style={!editMode ? { pointerEvents: 'none' } : {}}
              onClick={() => handleAfterwards(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {editMode && (
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              className="border rounded px-2 py-1 flex-1"
              placeholder="הוסיפי ערך חופשי..."
              value={customAfterwards}
              onChange={(e) => setCustomAfterwards(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAfterwards('אחר');
                }
              }}
              disabled={!editMode}
            />
            <button
              type="button"
              className="bg-primary-400 text-white px-3 py-1 rounded"
              onClick={() => handleAfterwards('אחר')}
              disabled={!editMode || !customAfterwards.trim()}
            >
              הוסיפי
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
