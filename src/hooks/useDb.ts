import { useCallback, useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext.tsx';
import { LogBook, LogEntry } from '../models/entry.ts';

const COLLECTION_NAME = 'logbook';

const empty = (): LogBook => ({
  entriesByDay: {},
  goals: [],
  targets: [],
  motivation: '',
});

export function useDb() {
  const { currentUser } = useAuth();
  const [logbook, setLogbook] = useState<LogBook>(empty());
  const [loading, setLoading] = useState(true);

  const fetchLogbook = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    setLoading(true);
    const docRef = doc(collection(db, COLLECTION_NAME), currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLogbook(docSnap.data() as LogBook);
    } else {
      setLogbook(empty());
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    fetchLogbook();
  }, [fetchLogbook]);

  const setLogEntry = useCallback(
    async (dateKey: string, entry: LogEntry) => {
      if (!currentUser) {
        return;
      }
      const docRef = doc(collection(db, COLLECTION_NAME), currentUser.uid);
      await setDoc(docRef, { [dateKey]: entry }, { merge: true });
      setLogbook((prev) => ({ ...prev, [dateKey]: entry }));
    },
    [currentUser]
  );

  return { logbook, loading, refresh: fetchLogbook, setLogEntry };
}
