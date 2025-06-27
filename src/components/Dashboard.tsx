import { Navbar } from './Navbar';
import { Calendar, Sun } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser.ts';
import { LogEntry } from '../models/entry.ts';
import { formatDate } from '../util/date.ts';
import { useNavigate } from 'react-router-dom';
import { useDbContext } from '../context/DbContext.tsx';

export const Dashboard = () => {
  const { name } = useCurrentUser();
  const { logbook, loading } = useDbContext();
  const navigate = useNavigate();

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntry: LogEntry | undefined = logbook?.entriesByDay[todayKey];

  function handleEntryClick(dateKey: string) {
    navigate(`/entry/${dateKey}`);
  }

  function handleNewOrEditToday() {
    navigate(`/entry/${todayKey}`);
  }

  const sortedDates = logbook
    ? Object.keys(logbook).sort((a, b) => b.localeCompare(a))
    : [];

  const hasMotivation =
    logbook && (logbook.motivation || logbook.goals.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full flex items-center justify-center">
              <Sun className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-700">
                ברוכה הבאה, {name}!
              </h1>
              {!hasMotivation && (
                <p className="text-secondary-500 mt-1">
                  מוכנה לעקוב אחר התובנות שלך ולהתחיל במסע הצמיחה?
                </p>
              )}
              {logbook?.motivation && (
                <>
                  <div className="flex gap-4 mt-4">
                    <p className="text-secondary-500 ">מוטיבציה</p>
                    <p className="text-primary-700 font-semibold">
                      {logbook.motivation}
                    </p>
                  </div>
                </>
              )}
              {logbook?.goals && logbook.goals.length > 0 && (
                <>
                  <div className="flex gap-4 mt-4">
                    <p className="text-secondary-500 ">מטרות</p>
                    {logbook.goals.map((goal, index) => (
                      <p key={index} className="text-primary-700 font-semibold">
                        {goal}
                      </p>
                    ))}
                  </div>
                </>
              )}
              <button
                className="mt-4 bg-primary-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                onClick={() => navigate('/motivation')}
              >
                {hasMotivation
                  ? 'עריכת מוטיבציה ומטרות'
                  : 'הגדרת מוטיבציה ומטרות'}
              </button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-300 to-secondary-300 rounded-2xl shadow-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            מעקב יומי עבור {formatDate(new Date())}
          </h2>
          {todayEntry ? (
            <>
              <button
                className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors inline-flex items-center space-x-2 space-x-reverse shadow-sm"
                onClick={handleNewOrEditToday}
              >
                <span>הרשומה של היום</span>
              </button>
            </>
          ) : (
            <>
              <button
                className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors inline-flex items-center space-x-2 space-x-reverse shadow-sm"
                onClick={handleNewOrEditToday}
              >
                <span> עוד לא הזנת רשומה להיום. רוצה להתחיל?</span>
              </button>
            </>
          )}
        </div>

        {/* History Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-secondary-700 mb-4 text-right">
            רשומות אחרונות
          </h3>
          <div className="bg-white rounded-xl shadow-sm p-8 border border-neutral-100">
            {loading ? (
              <div className="text-center text-secondary-400">
                טוען נתונים...
              </div>
            ) : sortedDates.length === 0 ? (
              <div className="text-center text-secondary-400">
                אין רשומות עדיין
              </div>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {sortedDates.map((dateKey) => (
                  <li
                    key={dateKey}
                    className="py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 rounded-lg px-2"
                    onClick={() => handleEntryClick(dateKey)}
                  >
                    <span className="font-medium text-secondary-700">
                      {formatDate(new Date(dateKey))}
                    </span>
                    <Calendar className="h-5 w-5 text-primary-300" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
