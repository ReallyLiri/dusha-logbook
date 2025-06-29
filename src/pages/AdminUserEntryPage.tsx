import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromDb } from '../util/db';
import { EntryPage } from './EntryPage';
import { LogBook } from '../models/entry';

export default function AdminUserEntryPage() {
  const { uid, day } = useParams();
  const [logbook, setLogbook] = useState<LogBook | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (uid) {
      fetchFromDb(uid).then((data) => {
        setLogbook(data);
        setEmail(data.user.email);
        setLoading(false);
      });
    }
  }, [uid]);

  if (loading) {
    return <div className="text-center text-secondary-600 py-8">טוען...</div>;
  }

  if (!logbook || !day) {
    return (
      <div className="text-center text-secondary-400 py-8">לא נמצאו נתונים</div>
    );
  }

  return <EntryPage adminView={{ logbook, day, email }} />;
}
