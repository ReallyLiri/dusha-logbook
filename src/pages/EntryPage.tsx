import { useParams, useNavigate } from 'react-router-dom';
import { LogEntry } from '../models/entry.ts';
import { formatDate } from '../util/date.ts';
import { useEffect, useState } from 'react';
import { useDbContext } from '../context/DbContext.tsx';

export const EntryPage = () => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const { logbook, setDayEntry, loading } = useDbContext();
  const [entry, setEntry] = useState<LogEntry | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex flex-col items-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative">
        <button
          className="absolute top-4 left-4 text-secondary-400 hover:text-secondary-600"
          onClick={() => navigate(-1)}
        >
          חזרה
        </button>
        <h2 className="text-xl font-bold mt-8 mb-2 text-primary-500 text-center">
          {formatDate(new Date(day))}
        </h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="flex justify-center gap-4 mt-6">
            {editMode ? (
              <button
                type="submit"
                className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                disabled={saving}
              >
                שמירה
              </button>
            ) : (
              <button
                type="button"
                className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                onClick={() => setEditMode(true)}
              >
                ערוך
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
