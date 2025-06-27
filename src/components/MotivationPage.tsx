import { useDb } from '../hooks/useDb.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LogBook } from '../models/entry.ts';

export const MotivationPage = () => {
  const { logbook, refresh, setProperties } = useDb();
  const navigate = useNavigate();
  const [motivation, setMotivation] = useState(logbook.motivation || '');
  const [goals, setGoals] = useState<string[]>(logbook.goals || []);
  const [targets, setTargets] = useState<LogBook['targets']>(
    logbook.targets || []
  );
  const [saving, setSaving] = useState(false);

  const handleGoalChange = (idx: number, value: string) => {
    setGoals(goals.map((g, i) => (i === idx ? value : g)));
  };
  const handleAddGoal = () => setGoals([...goals, '']);
  const handleRemoveGoal = (idx: number) =>
    setGoals(goals.filter((_, i) => i !== idx));

  const handleTargetChange = (idx: number, field: string, value: string) => {
    setTargets(
      targets.map((t, i) => (i === idx ? { ...t, [field]: value } : t))
    );
  };
  const handleAddTarget = () =>
    setTargets([...targets, { name: '', from: '', to: '' }]);
  const handleRemoveTarget = (idx: number) =>
    setTargets(targets.filter((_, i) => i !== idx));

  const handleSave = async () => {
    setSaving(true);
    await setProperties({ motivation, goals, targets });
    await refresh();
    setSaving(false);
    navigate('/');
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
          הגדרת מוטיבציה ומטרות
        </h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div>
            <label className="block text-secondary-600 mb-1">מוטיבציה</label>
            <textarea
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2"
              rows={2}
            />
          </div>
          <hr className="my-4 border-t border-neutral-200 opacity-60" />
          <div>
            <label className="block text-secondary-600 mb-1">מטרות</label>
            {goals.map((goal, idx) => (
              <div key={idx} className="flex items-center mb-2">
                <input
                  value={goal}
                  onChange={(e) => handleGoalChange(idx, e.target.value)}
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                />
                <button
                  type="button"
                  className="mr-2 text-red-500"
                  onClick={() => handleRemoveGoal(idx)}
                >
                  הסרה
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-primary-500"
              onClick={handleAddGoal}
            >
              הוספת מטרה
            </button>
          </div>
          <hr className="my-4 border-t border-neutral-200 opacity-60" />
          <div>
            <label className="block text-secondary-600 mb-1">יעדים</label>
            {targets.map((target, idx) => (
              <div
                key={idx}
                className="mb-2 border border-neutral-100 rounded-lg p-2"
              >
                <input
                  placeholder="שם יעד"
                  value={target.name}
                  onChange={(e) =>
                    handleTargetChange(idx, 'name', e.target.value)
                  }
                  className="w-full border border-neutral-200 rounded-lg px-3 py-2 mb-1"
                />
                <div className="flex gap-2">
                  <input
                    placeholder="מ"
                    value={target.from}
                    onChange={(e) =>
                      handleTargetChange(idx, 'from', e.target.value)
                    }
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                  />
                  <input
                    placeholder="עד"
                    value={target.to}
                    onChange={(e) =>
                      handleTargetChange(idx, 'to', e.target.value)
                    }
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                  />
                </div>
                <button
                  type="button"
                  className="mt-1 text-red-500"
                  onClick={() => handleRemoveTarget(idx)}
                >
                  הסר יעד
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 text-primary-500"
              onClick={handleAddTarget}
            >
              הוספת יעד
            </button>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
              disabled={saving}
            >
              שמירה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
