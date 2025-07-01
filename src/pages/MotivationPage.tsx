import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDbContext } from '../context/DbContext.tsx';
import { format } from 'date-fns';
import { formatMonth } from '../util/date.ts';

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
  const { logbook, setProperties, loading } = useDbContext();
  const navigate = useNavigate();
  const currentMonth = format(new Date(), 'yyyy-MM');
  const monthData = (logbook?.motivationByMonth &&
    (
      logbook.motivationByMonth as Record<
        string,
        {
          motivation: string;
          goals: string[];
          targets: { name: string; from: string; to: string }[];
        }
      >
    )[currentMonth]) || { motivation: '', goals: [], targets: [] };
  const [motivation, setMotivation] = useState(monthData.motivation);
  const [goals, setGoals] = useState<string[]>(monthData.goals);
  const [targets, setTargets] = useState<
    {
      name: string;
      from: string;
      to: string;
    }[]
  >(
    TARGET_NAMES.map(
      (name) =>
        monthData.targets.find((t: { name: string }) => t.name === name) || {
          name,
          from: '',
          to: '',
        }
    )
  );
  const [selectedTargets, setSelectedTargets] = useState<string[]>(
    (monthData.targets || []).map((t: { name: string }) => t.name)
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const monthData = (logbook?.motivationByMonth &&
      (
        logbook.motivationByMonth as Record<
          string,
          {
            motivation: string;
            goals: string[];
            targets: { name: string; from: string; to: string }[];
          }
        >
      )[currentMonth]) || { motivation: '', goals: [], targets: [] };
    setMotivation(monthData.motivation);
    setGoals(monthData.goals);
    setTargets(
      TARGET_NAMES.map(
        (name) =>
          monthData.targets.find((t: { name: string }) => t.name === name) || {
            name,
            from: '',
            to: '',
          }
      )
    );
    setSelectedTargets(
      (monthData.targets || []).map((t: { name: string }) => t.name)
    );
  }, [logbook, currentMonth]);

  const handleGoalChange = (idx: number, value: string) => {
    setGoals(goals.map((g, i) => (i === idx ? value : g)));
  };
  const handleAddGoal = () => setGoals([...goals, '']);
  const handleRemoveGoal = (idx: number) =>
    setGoals(goals.filter((_, i) => i !== idx));

  const handleSelectTarget = (name: string) => {
    if (selectedTargets.includes(name)) {
      setSelectedTargets(selectedTargets.filter((n) => n !== name));
      setTargets(
        targets.map((t) => (t.name === name ? { ...t, from: '', to: '' } : t))
      );
    } else {
      setSelectedTargets([...selectedTargets, name]);
    }
  };
  const handleRemoveTarget = (name: string) => {
    setSelectedTargets(selectedTargets.filter((n) => n !== name));
    setTargets(
      targets.map((t) => (t.name === name ? { ...t, from: '', to: '' } : t))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    await setProperties({
      motivationByMonth: {
        ...logbook?.motivationByMonth,
        [currentMonth]: {
          motivation,
          goals,
          targets: targets.filter((t) => t.from && t.to),
        },
      },
    });
    setSaving(false);
    navigate('/');
  };

  if (loading) {
    return <div className="text-center text-secondary-600">טוען...</div>;
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex flex-col items-center py-12 px-4 overflow-hidden">
      <div className="absolute top-[-60px] left-[-60px] w-60 h-60 bg-[#f4d9c8] rounded-full opacity-60 z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-80 h-80 bg-[#e89f92] rounded-full opacity-40 z-0" />
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 relative z-10">
        <button
          className="absolute top-4 left-4 text-secondary-400 hover:text-secondary-600"
          onClick={() => navigate('/')}
        >
          חזרה
        </button>
        <h2 className="text-xl font-bold mb-4 text-secondary-700 text-center">
          הגדרת מוטיבציה ומטרות - {formatMonth(new Date())}
        </h2>
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-6">
            <div className="mb-4">
              <label className="block text-secondary-600 mb-1">
                המוטיבציה שלי לחודש זה
              </label>
              <textarea
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2"
                rows={2}
              />
            </div>
            <hr className="my-4 border-t border-neutral-200 opacity-60" />
            <div className="mb-4">
              <label className="block text-secondary-600 mb-1">
                המטרות שלי לחודש זה
              </label>
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
              <label className="block text-secondary-600 mb-1">
                היעדים שלי לחודש זה
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {TARGET_NAMES.map((name) => (
                  <button
                    type="button"
                    key={name}
                    className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                      selectedTargets.includes(name)
                        ? 'bg-primary-400 text-white border-primary-400'
                        : 'bg-white text-primary-500 border-primary-300 hover:bg-primary-50'
                    }`}
                    onClick={() => handleSelectTarget(name)}
                  >
                    {name}
                    {selectedTargets.includes(name) && (
                      <span className="mr-2">×</span>
                    )}
                  </button>
                ))}
              </div>
              {selectedTargets.length > 0 && (
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {targets
                        .filter((target: { name: string }) =>
                          selectedTargets.includes(target.name)
                        )
                        .map(
                          (target: {
                            name: string;
                            from: string;
                            to: string;
                          }) => (
                            <tr key={target.name}>
                              <td className="px-2 py-1 text-secondary-700 whitespace-nowrap">
                                {target.name}
                              </td>
                              <td className="px-2 py-1">
                                <input
                                  value={target.from}
                                  onChange={(e) =>
                                    setTargets(
                                      targets.map(
                                        (t: {
                                          name: string;
                                          from: string;
                                          to: string;
                                        }) =>
                                          t.name === target.name
                                            ? { ...t, from: e.target.value }
                                            : t
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
                                      targets.map(
                                        (t: {
                                          name: string;
                                          from: string;
                                          to: string;
                                        }) =>
                                          t.name === target.name
                                            ? { ...t, to: e.target.value }
                                            : t
                                      )
                                    )
                                  }
                                  className="w-full border border-neutral-200 rounded-lg px-2 py-1"
                                />
                              </td>
                              <td className="px-2 py-1">
                                <button
                                  type="button"
                                  className="text-red-500 text-xs"
                                  onClick={() =>
                                    handleRemoveTarget(target.name)
                                  }
                                >
                                  הסרה
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              )}
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
