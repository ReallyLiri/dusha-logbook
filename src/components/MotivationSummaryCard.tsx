import { formatMonth } from '../util/date';

export type MotivationSummaryCardProps = {
  month: string;
  data: {
    motivation: string;
    goals: string[];
    targets: { name: string; from: string; to: string }[];
  };
};

export function MotivationSummaryCard({
  month,
  data,
}: MotivationSummaryCardProps) {
  const isCurrentMonth = month === new Date().toISOString().slice(0, 7);
  const monthDate = new Date(month + '-01');
  return (
    <div className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-4 mb-4">
      <h3 className="text-lg font-bold text-secondary-700 mb-2">
        {isCurrentMonth ? 'המטרות שלי לחודש זה' : formatMonth(monthDate)}
      </h3>
      {data.motivation && (
        <div className="mb-2">
          <span className="font-semibold text-primary-700">מוטיבציה:</span>{' '}
          {data.motivation}
        </div>
      )}
      {data.goals && data.goals.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold text-primary-700">מטרות:</span>
          <ul className="list-disc pr-4">
            {data.goals.map((goal: string, idx: number) => (
              <li key={idx}>{goal}</li>
            ))}
          </ul>
        </div>
      )}
      {data.targets && data.targets.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold text-primary-700">יעדים:</span>
          <ul className="list-disc pr-4">
            {data.targets.map(
              (
                target: { name: string; from: string; to: string },
                idx: number
              ) =>
                (target.from || target.to) && (
                  <li key={idx}>
                    <span className="text-secondary-500">{target.name}:</span>
                    {target.from && ` ${target.from}`}
                    {target.to && ` ← ${target.to}`}
                  </li>
                )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
