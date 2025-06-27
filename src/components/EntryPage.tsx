import { useParams, useNavigate } from 'react-router-dom';
import { useDb } from '../hooks/useDb.ts';
import { LogEntry } from '../models/entry.ts';
import { formatDate } from '../util/date.ts';
import { useState } from 'react';

export const EntryPage = () => {
  const { day } = useParams<{ day: string }>();
  const navigate = useNavigate();
  const { logbook, setDayEntry } = useDb();
  const entry: LogEntry | undefined = day ? logbook[day] : undefined;
  const [editMode, setEditMode] = useState(!entry);
  const [form, setForm] = useState<LogEntry>(entry || { mood: '', notes: '' });
  const [saving, setSaving] = useState(false);

  if (!day) return <div>Invalid entry</div>;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    await setDayEntry(day, form);
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
        <h2 className="text-xl font-bold mb-4 text-secondary-700 text-center">
          {editMode ? 'עריכת רשומה' : 'צפייה ברשומה'} ליום{' '}
          {formatDate(new Date(day))}
        </h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <label className="block text-secondary-600 mb-1">מצב רוח</label>
            {editMode ? (
              <input
                name="mood"
                value={form.mood}
                onChange={handleChange}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                required
              />
            ) : (
              <div className="text-secondary-700">{form.mood || '---'}</div>
            )}
          </div>
          <div>
            <label className="block text-secondary-600 mb-1">הערות</label>
            {editMode ? (
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                rows={4}
              />
            ) : (
              <div className="text-secondary-700 whitespace-pre-line">
                {form.notes || '---'}
              </div>
            )}
          </div>
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
