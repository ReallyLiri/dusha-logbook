import { MotivationSummaryCard } from '../components/MotivationSummaryCard';
import { useDbContext } from '../context/DbContext';
import { useNavigate } from 'react-router-dom';

export default function PreviousMotivationsPage() {
  const { logbook } = useDbContext();
  const navigate = useNavigate();

  const months = logbook?.motivationByMonth
    ? Object.keys(logbook.motivationByMonth).sort((a, b) => b.localeCompare(a))
    : [];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <button
        className="mb-6 text-primary-500 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← חזרה
      </button>
      <h1 className="text-2xl font-bold mb-6 text-secondary-700">
        היסטוריית מטרות
      </h1>
      {months.length === 0 ? (
        <div className="text-center text-secondary-400">אין מטרות קודמות</div>
      ) : (
        <div className="space-y-6">
          {months.map((month) => (
            <MotivationSummaryCard
              key={month}
              month={month}
              data={logbook!.motivationByMonth![month]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
