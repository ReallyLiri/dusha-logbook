import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchFromDb } from '../util/db';
import { EntryHistorySection } from './Home';
import { LogBook } from '../models/entry';

export default function AdminUserDetailPage() {
  const { uid } = useParams();
  const [logbook, setLogbook] = useState<LogBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (uid) {
      fetchFromDb(uid).then((data) => {
        setLogbook(data);
        setLoading(false);
      });
    }
  }, [uid]);

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

  function handleEntryClick(dateKey: string) {
    if (uid) navigate(`/admin/view/${uid}/${dateKey}`);
  }

  if (loading) {
    return <div className="text-center text-secondary-600 py-8">טוען...</div>;
  }

  if (!logbook) {
    return (
      <div className="text-center text-secondary-400 py-8">לא נמצאו נתונים</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-4">
        <Link to="/admin/view" className="text-primary-500 hover:underline">
          חזרה לכל המשתמשים ←
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4 text-secondary-700">
        {logbook.user.name} ({logbook.user.email})
      </h1>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        {logbook.motivation && (
          <div className="mb-2">
            <span className="font-semibold text-primary-700">מוטיבציה:</span>{' '}
            {logbook.motivation}
          </div>
        )}
        {logbook.goals && logbook.goals.length > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-primary-700">מטרות:</span>
            <ul className="list-disc pr-4">
              {logbook.goals.map((goal, idx) => (
                <li key={idx}>{goal}</li>
              ))}
            </ul>
          </div>
        )}
        {logbook.targets && logbook.targets.length > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-primary-700">יעדים:</span>
            <ul className="list-disc pr-4">
              {logbook.targets.map((target, idx) => (
                <li key={idx}>
                  {target.name}: {target.from} ← {target.to}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
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
    </div>
  );
}
