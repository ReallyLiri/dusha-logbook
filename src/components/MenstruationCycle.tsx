import { useState } from 'react';

type Props = {
  selectedDay: number | null;
  setSelectedDay: (day: number | null) => void;
  editMode?: boolean;
};

export function MenstrualCycleSelector({
  selectedDay,
  setSelectedDay,
  editMode = true,
}: Props) {
  const getPhaseColor = (day: number) => {
    if (day >= 1 && day <= 5) return 'bg-red-500';
    if (day >= 6 && day <= 14) return 'bg-orange-400';
    if (day >= 15 && day <= 19) return 'bg-pink-500';
    if (day >= 20 && day <= 28) return 'bg-blue-400';
    return 'bg-gray-300';
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(selectedDay === day ? null : day);
  };

  const getDayPosition = (day: number) => {
    const angle = ((day - 1) * 360) / 28 - 90;
    const radius = 140;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <div
      className="flex flex-col items-center justify-center "
      style={{ height: '24rem' }}
    >
      <div className="relative w-96 h-96">
        <div className="absolute inset-0 rounded-full md:border-2 md:border-gray-200"></div>

        {Array.from({ length: 28 }, (_, i) => {
          const day = i + 1;
          const position = getDayPosition(day);
          const isSelected = selectedDay === day;

          return (
            <button
              key={day}
              type="button"
              onClick={() => editMode && handleDayClick(day)}
              className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white transition-all duration-200 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110${editMode ? ' cursor-pointer' : ' cursor-default'} ${getPhaseColor(day)} ${
                isSelected
                  ? 'ring-4 ring-gray-800 scale-125 z-20'
                  : 'hover:shadow-lg z-10'
              }`}
              style={{
                left: `50%`,
                top: `50%`,
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
              }}
              disabled={!editMode}
            >
              {day}
            </button>
          );
        })}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
            <div>
              <div className="text-lg font-bold text-gray-700">
                {selectedDay ? `יום ${selectedDay}` : 'בחרי יום'}
              </div>
              {selectedDay && (
                <button
                  type="button"
                  onClick={() => editMode && setSelectedDay(null)}
                  className={`text-xs text-gray-500 hover:text-gray-700 mt-1 pointer-events-auto${editMode ? '' : ' cursor-default'}`}
                  disabled={!editMode}
                >
                  ניקוי בחירה
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
