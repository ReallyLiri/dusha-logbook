import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Calendar, Plus, Sun } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser.ts';
import { db } from '../config/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

// Mock LogEntry type
interface LogEntry {
  mood: string;
  notes: string;
}

function formatHebrewDate(date: Date) {
  return date.toLocaleDateString('he-IL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export const Dashboard: React.FC = () => {
  const { name, uid } = useCurrentUser();
  const [logbook, setLogbook] = useState<Record<string, LogEntry>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    async function fetchLogbook() {
      setLoading(true);
      // Firestore: logbook collection, doc is user id
      const docRef = doc(collection(db, 'logbook'), uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLogbook(docSnap.data() as Record<string, LogEntry>);
      } else {
        setLogbook({});
      }
      setLoading(false);
    }
    fetchLogbook();
  }, [uid]);

  const todayKey = new Date().toISOString().slice(0, 10);
  const todayEntry = logbook[todayKey];

  function handleEntryClick(dateKey: string) {
    setSelectedDate(dateKey);
    setViewMode(true);
  }

  function handleNewOrEditToday() {
    setSelectedDate(todayKey);
    setViewMode(false);
  }

  // Sorted date keys, newest first
  const sortedDates = Object.keys(logbook).sort((a, b) => b.localeCompare(a));

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
              <p className="text-secondary-500 mt-1">
                מוכנה לעקוב אחר התובנות שלך ולהמשיך במסע הצמיחה?
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary-300 to-secondary-300 rounded-2xl shadow-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            מעקב יומי עבור יום {formatHebrewDate(new Date())}
          </h2>
          {todayEntry ? (
            <>
              <p className="text-white/90 mb-6">
                כבר יש לך רשומה להיום. רוצה לערוך?
              </p>
              <button
                className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors inline-flex items-center space-x-2 space-x-reverse shadow-sm"
                onClick={handleNewOrEditToday}
              >
                <span>ערכי את הרשומה של היום</span>
                <Plus className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <p className="text-white/90 mb-6">
                עוד לא הזנת רשומה להיום. רוצה להתחיל?
              </p>
              <button
                className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors inline-flex items-center space-x-2 space-x-reverse shadow-sm"
                onClick={handleNewOrEditToday}
              >
                <span>התחילי מעקב יומי</span>
                <Plus className="h-5 w-5" />
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
                      {formatHebrewDate(new Date(dateKey))}
                    </span>
                    <Calendar className="h-5 w-5 text-primary-300" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Record View/Edit Modal (Mock) */}
        {selectedDate && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
              <button
                className="absolute top-4 left-4 text-secondary-400 hover:text-secondary-600"
                onClick={() => setSelectedDate(null)}
              >
                סגור
              </button>
              <h2 className="text-xl font-bold mb-4 text-secondary-700">
                {viewMode ? 'צפייה ברשומה' : 'עריכת רשומה'} ליום{' '}
                {formatHebrewDate(new Date(selectedDate))}
              </h2>
              <div className="mb-4">
                {/* Mock record data */}
                <div className="text-secondary-600">
                  מצב רוח: {logbook[selectedDate]?.mood || '---'}
                </div>
                <div className="text-secondary-600">
                  הערות: {logbook[selectedDate]?.notes || '---'}
                </div>
              </div>
              {!viewMode && (
                <div className="text-center text-secondary-400">
                  עריכת רשומה (ממשק עריכה יתווסף בהמשך)
                </div>
              )}
              {viewMode && (
                <button
                  className="mt-4 bg-primary-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-500 transition-colors"
                  onClick={() => setViewMode(false)}
                >
                  ערוך
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
