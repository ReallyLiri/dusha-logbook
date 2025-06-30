import { Navbar } from '../components/Navbar.tsx';
import { Calendar, Sparkles, Sun } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser.ts';
import { LogEntry, LogBook } from '../models/entry.ts';
import { formatDate } from '../util/date.ts';
import { useNavigate } from 'react-router-dom';
import { useDbContext } from '../context/DbContext.tsx';
import { useState, useMemo } from 'react';

export const Home = () => {
  const { name } = useCurrentUser();
  const { logbook, loading } = useDbContext();
  const navigate = useNavigate();
  const [dateFilter, setDateFilter] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntry: Partial<LogEntry> | undefined =
    logbook?.entriesByDay[todayKey];

  function handleEntryClick(dateKey: string) {
    navigate(`/entry/${dateKey}`);
  }

  function handleNewOrEditToday() {
    navigate(`/entry/${todayKey}`);
  }

  const sortedDates = logbook
    ? Object.keys(logbook.entriesByDay).sort((a, b) => b.localeCompare(a))
    : [];

  const dateRange = useMemo(() => {
    if (sortedDates.length === 0) return { min: '', max: '' };
    return {
      min: sortedDates[sortedDates.length - 1],
      max: sortedDates[0],
    };
  }, [sortedDates]);

  const filteredDates = useMemo(() => {
    return sortedDates.filter((date) => {
      if (dateFilter.from && date < dateFilter.from) return false;
      if (dateFilter.to && date > dateFilter.to) return false;
      return true;
    });
  }, [sortedDates, dateFilter]);

  const hasMotivation =
    logbook && (logbook.motivation || logbook.goals.length > 0);

  if (loading) {
    return <div className="text-center text-secondary-600">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lg p-2 md:p-8 flex-1 w-full">
            <div className="flex items-center space-x-3 space-x-reverse mb-4">
              <div className="text-right">
                <h1 className="text-2xl sm:text-3xl font-bold text-secondary-700 flex items-center gap-4">
                  ברוכה הבאה, {name}!
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full flex items-center justify-center">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                </h1>
                {!hasMotivation && (
                  <p className="text-secondary-500 mt-1">
                    מוכנה לעקוב אחר התובנות שלך ולהתחיל במסע הצמיחה?
                  </p>
                )}
                <div className="flex flex-col md:flex-row gap-2 md:gap-[15vw]">
                  {logbook?.motivation && (
                    <div>
                      <div className="flex gap-4 mt-4">
                        <p className=" text-primary-700 font-semibold">
                          מוטיבציה
                        </p>
                        <p className="text-secondary-500">
                          {logbook.motivation}
                        </p>
                      </div>
                    </div>
                  )}
                  {logbook?.goals && logbook.goals.length > 0 && (
                    <div>
                      <p className="text-primary-700 mt-4 font-semibold">
                        מטרות
                      </p>
                      <ul className="mt-2 text-secondary-700 list-disc pr-4">
                        {logbook.goals.map((goal, index) => (
                          <li key={index} className=" text-secondary-500">
                            {goal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {logbook && logbook.targets && logbook.targets.length > 0 && (
                    <div>
                      <p className="text-primary-700 mt-4 font-semibold">
                        יעדים
                      </p>
                      <ul className="mt-2 text-secondary-700 list-disc pr-4">
                        {logbook.targets.map(
                          (target, idx) =>
                            (target.from || target.to) && (
                              <li key={idx}>
                                <span className="text-secondary-500">
                                  {target.name}:
                                </span>
                                {target.from && ` ${target.from}`}
                                {target.to && ` ← ${target.to}`}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <button
                  className="bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors flex items-center gap-2"
                  onClick={() => navigate('/motivation')}
                >
                  {hasMotivation
                    ? 'עריכת מוטיבציה ומטרות'
                    : 'הגדרת מוטיבציה ומטרות'}
                  <Sparkles />
                </button>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 max-h-[50vh] flex-shrink-0 hidden md:flex items-center justify-center md:mb-0">
            <img
              src="/img/person2.png"
              alt="Welcome Illustration"
              className="object-cover w-full h-full max-h-[50vh]"
              draggable="false"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-300 to-secondary-300 rounded-2xl shadow-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            מעקב יומי עבור
            <span className="block md:inline"> {formatDate(new Date())}</span>
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
        <EntryHistorySection
          logbook={logbook}
          loading={loading}
          onEntryClick={handleEntryClick}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          dateRange={dateRange}
          filteredDates={filteredDates}
          sortedDates={sortedDates}
        />
      </main>
    </div>
  );
};

export function EntryHistorySection({
  logbook,
  loading,
  onEntryClick,
  dateFilter,
  setDateFilter,
  dateRange,
  filteredDates,
  sortedDates,
}: {
  logbook: LogBook | null;
  loading: boolean;
  onEntryClick: (dateKey: string) => void;
  dateFilter: { from: string; to: string };
  setDateFilter: React.Dispatch<
    React.SetStateAction<{ from: string; to: string }>
  >;
  dateRange: { min: string; max: string };
  filteredDates: string[];
  sortedDates: string[];
}) {
  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h3 className="text-xl font-semibold text-secondary-700 text-right">
          המעקב שלי
        </h3>
        {sortedDates.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <label className="text-sm text-secondary-600 whitespace-nowrap">
              סינון לפי תאריך:
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                min={dateRange.min}
                max={dateRange.max}
                value={dateFilter.from}
                onChange={(e) =>
                  setDateFilter((prev: any) => ({
                    ...prev,
                    from: e.target.value,
                  }))
                }
                className="border border-neutral-300 rounded px-2 py-1 text-sm"
              />
              <span className="text-secondary-500 self-center">עד</span>
              <input
                type="date"
                min={dateRange.min}
                max={dateRange.max}
                value={dateFilter.to}
                onChange={(e) =>
                  setDateFilter((prev: any) => ({
                    ...prev,
                    to: e.target.value,
                  }))
                }
                className="border border-neutral-300 rounded px-2 py-1 text-sm"
              />
              {(dateFilter.from || dateFilter.to) && (
                <button
                  onClick={() => setDateFilter({ from: '', to: '' })}
                  className="text-primary-500 hover:text-primary-700 text-sm"
                >
                  נקה
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 border border-neutral-100">
        {loading ? (
          <div className="text-center text-secondary-400">טוען נתונים...</div>
        ) : sortedDates.length === 0 ? (
          <div className="text-center text-secondary-400">אין רשומות עדיין</div>
        ) : filteredDates.length === 0 ? (
          <div className="text-center text-secondary-400">
            אין רשומות בטווח התאריכים שנבחר
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {filteredDates.map((dateKey: string) => (
              <li
                key={dateKey}
                className="py-4 flex items-center justify-between cursor-pointer hover:bg-neutral-50 rounded-lg px-2"
                onClick={() => onEntryClick(dateKey)}
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
  );
}
