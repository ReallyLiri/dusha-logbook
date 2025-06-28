import { useParams, useNavigate } from 'react-router-dom';
import { LogEntry } from '../models/entry.ts';
import { formatDate } from '../util/date.ts';
import { useEffect, useState } from 'react';
import { useDbContext } from '../context/DbContext.tsx';
import { EntryPainSection } from '../components/entry/EntryPainSection';
import { EntryNutritionSection } from '../components/entry/EntryNutritionSection';
import { EntryFeelingsSection } from '../components/entry/EntryFeelingsSection';
import { Check, Pencil } from 'lucide-react';

const TABS = [
  { key: 'pain', label: 'כאבים' },
  { key: 'nutrition', label: 'תזונה' },
  { key: 'feelings', label: 'הרגשה' },
];

export const EntryPage = () => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const { logbook, setDayEntry, loading } = useDbContext();
  const [entry, setEntry] = useState<Partial<LogEntry> | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[0].key);

  useEffect(() => {
    if (loading) {
      return;
    }
    const entry = logbook?.entriesByDay?.[day || ''];
    setEntry(entry);
    setEditMode(!entry);
  }, [day, loading, logbook?.entriesByDay]);

  if (!day) {
    return <div>Invalid entry</div>;
  }

  const handleSave = async () => {
    if (!entry) {
      return;
    }
    setSaving(true);
    await setDayEntry(day, entry);
    setSaving(false);
    setEditMode(false);
  };

  if (loading) {
    return <div className="text-center text-secondary-600">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex flex-col items-center py-12 px-4 overflow-x-hidden">
      <div className="absolute top-0 left-0 w-60 h-60 bg-[#f4d9c8] rounded-full opacity-60 z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-[#e89f92] rounded-full opacity-40 z-0" />

      <div className="max-w-[80vw] w-full bg-white rounded-2xl shadow-xl p-8 relative">
        <button
          className="absolute top-4 left-4 text-secondary-400 hover:text-secondary-600"
          onClick={() => navigate('/')}
        >
          חזרה
        </button>
        <h2 className="text-xl font-bold mt-8 mb-2 text-primary-500 text-center">
          יומן מעקב
        </h2>
        <h2 className="text-m mb-8 text-primary-700 text-center">
          {formatDate(new Date(day))}
        </h2>

        {!editMode && (
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center gap-2"
              onClick={() => setEditMode(true)}
            >
              <span>עריכה</span>
              <Pencil />
            </button>
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          {editMode && (
            <div className="flex justify-center mb-6">
              <button
                type="submit"
                className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center gap-2"
                disabled={saving}
              >
                שמירה
                <Check />
              </button>
            </div>
          )}
          <div className="mb-6 flex justify-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === tab.key ? 'bg-primary-700 text-white' : 'bg-neutral-100 text-secondary-700'}`}
                onClick={() => setActiveTab(tab.key)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          {activeTab === 'pain' && (
            <EntryPainSection
              value={entry?.pain}
              onChange={(pain) => setEntry((e) => ({ ...(e || {}), pain }))}
              editMode={editMode}
            />
          )}
          {activeTab === 'nutrition' && (
            <EntryNutritionSection
              value={entry?.nutrition}
              onChange={(nutrition) =>
                setEntry((e) => ({ ...(e || {}), nutrition }))
              }
              editMode={editMode}
            />
          )}
          {activeTab === 'feelings' && (
            <EntryFeelingsSection
              value={entry?.feelings}
              onChange={(feelings) =>
                setEntry((e) => ({ ...(e || {}), feelings }))
              }
              editMode={editMode}
            />
          )}
        </form>
      </div>
    </div>
  );
};
