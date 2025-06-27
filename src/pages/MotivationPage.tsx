import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LogBook } from '../models/entry.ts';
import { useDbContext } from '../context/DbContext.tsx';

const TARGET_NAMES = [
  'גמישות',
  'יציבה',
  'כוח',
  'מפרקים',
  'רמת אנרגיה',
  'תזונה',
  'דיבור פנימי',
];

export const MotivationPage = () => {
  const { logbook, setProperties } = useDbContext();
  const navigate = useNavigate();
  const [motivation, setMotivation] = useState(logbook?.motivation || '');
  const [goals, setGoals] = useState<string[]>(logbook?.goals || []);
  const [targets, setTargets] = useState<LogBook['targets']>(
    TARGET_NAMES.map(
      (name) =>
        logbook?.targets?.find((t) => t.name === name) || {
          name,
          from: '',
          to: '',
        }
    )
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMotivation(logbook?.motivation || '');
    setGoals(logbook?.goals || []);
    setTargets(
      TARGET_NAMES.map(
        (name) =>
          logbook?.targets?.find((t) => t.name === name) || {
            name,
            from: '',
            to: '',
          }
      )
    );
  }, [logbook]);

  const handleGoalChange = (idx: number, value: string) => {
    setGoals(goals.map((g, i) => (i === idx ? value : g)));
  };
  const handleAddGoal = () => setGoals([...goals, '']);
  const handleRemoveGoal = (idx: number) =>
    setGoals(goals.filter((_, i) => i !== idx));

  const handleSave = async () => {
    setSaving(true);
    await setProperties({
      motivation,
      goals,
      targets: targets.filter((t) => t.from && t.to),
    });
    setSaving(false);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex flex-col items-center py-12 px-4 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-60px] left-[-60px] w-60 h-60 bg-[#f4d9c8] rounded-full opacity-60 z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-[#e89f92] rounded-full opacity-40 z-0" />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative z-10">
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
            <div className="overflow-x-auto">
              <table className="min-w-full border border-neutral-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-right font-medium text-secondary-600"></th>
                    <th className="px-2 py-1 text-right font-medium text-secondary-600">
                      התחלה
                    </th>
                    <th className="px-2 py-1 text-right font-medium text-secondary-600">
                      יעד
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {targets.map((target, idx) => (
                    <tr key={target.name}>
                      <td className="px-2 py-1 text-secondary-700 whitespace-nowrap">
                        {target.name}
                      </td>
                      <td className="px-2 py-1">
                        <input
                          value={target.from}
                          onChange={(e) =>
                            setTargets(
                              targets.map((t, i) =>
                                i === idx ? { ...t, from: e.target.value } : t
                              )
                            )
                          }
                          className="w-full border border-neutral-200 rounded-lg px-2 py-1"
                        />
                      </td>
                      <td className="px-2 py-1">
                        <input
                          value={target.to}
                          onChange={(e) =>
                            setTargets(
                              targets.map((t, i) =>
                                i === idx ? { ...t, to: e.target.value } : t
                              )
                            )
                          }
                          className="w-full border border-neutral-200 rounded-lg px-2 py-1"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
