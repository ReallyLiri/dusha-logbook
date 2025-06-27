import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchFromDb, setData, setEntryData } from '../util/db.ts';
import { useAuth } from './AuthContext.tsx';
import { LogBook, LogEntry } from '../models/entry.ts';

export const DbContext = createContext<{
  fetchLogbook: () => Promise<void>;
  setDayEntry: (dateKey: string, entry: LogEntry) => Promise<void>;
  setProperties: (data: Partial<LogBook>) => Promise<void>;
  logbook: LogBook | null;
  loading: boolean;
} | null>(null);

export const DbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currentUser } = useAuth();
  const [logbook, setLogbook] = useState<LogBook | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchLogbook = useCallback(async () => {
    if (!currentUser) {
      return;
    }
    setLoading(true);
    setLogbook(await fetchFromDb(currentUser.uid));
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    fetchLogbook();
  }, [fetchLogbook]);

  const setDayEntry = useCallback(
    async (dateKey: string, entry: LogEntry) => {
      if (!currentUser) {
        return;
      }
      setLoading(true);
      const setter = await setEntryData(currentUser.uid, dateKey, entry);
      setLogbook(setter);
      setLoading(false);
    },
    [currentUser]
  );

  const setProperties = useCallback(
    async (data: Partial<LogBook>) => {
      if (!currentUser) {
        return;
      }
      const setter = await setData(currentUser.uid, data);
      setLogbook(setter);
    },
    [currentUser]
  );

  return (
    <DbContext.Provider
      value={{ fetchLogbook, setDayEntry, setProperties, logbook, loading }}
    >
      {children}
    </DbContext.Provider>
  );
};

export const useDbContext = () => {
  const ctx = useContext(DbContext);
  if (!ctx) {
    throw new Error('useDbContext must be used within a DbProvider');
  }
  return ctx;
};
