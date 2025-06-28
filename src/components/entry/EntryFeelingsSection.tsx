import React from 'react';
import { LogEntry } from '../../models/entry';
import { PersonStanding, Activity } from 'lucide-react';

type Props = {
  value: LogEntry['feelings'] | undefined;
  onChange: (feelings: LogEntry['feelings']) => void;
  editMode: boolean;
};

const getLabel = (field: string) => {
  switch (field) {
    case 'general':
      return 'בכללי';
    case 'training':
      return 'אחרי טיפול או אימון';
    case 'meals':
      return 'אחרי ארוחה';
    default:
      return '';
  }
};

const getPlaceholder = (field: string) => {
  switch (field) {
    case 'training':
      return 'איך הרגשת אחרי האימון או הטיפול? שחרור, החמרה, אנרגטיות, עייפות ...';
    case 'meals':
      return 'איך הרגשת אחרי ארוחה? כבדות, נפיחות, עצירות, יציאות רכות, אנרגטיות ...';
    case 'general':
      return 'תובנות או מחשבות שעלו לי. משהו נחמד להגיד לעצמי.';
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
  return (
    <div className="space-y-4">
      <div className="flex w-full items-center justify-center gap-2 ">
        <Activity className="text-primary-500" />
        <PersonStanding className="text-primary-700" />
      </div>

      <label className="block text-primary-500 mb-1">איך הרגשת היום?</label>
      {(['training', 'meals', 'general'] as const)
        .filter((field) => editMode || value?.[field])
        .map((field) => (
          <div key={field}>
            <label className="block text-secondary-500 mb-1">
              {getLabel(field)}
            </label>
            <textarea
              disabled={!editMode}
              className="border rounded px-2 py-1 w-full mb-2"
              placeholder={getPlaceholder(field)}
              value={value?.[field] || ''}
              onChange={(e) =>
                onChange({
                  ...(value || {}),
                  [field]: e.target.value.trim(),
                })
              }
            />
          </div>
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
