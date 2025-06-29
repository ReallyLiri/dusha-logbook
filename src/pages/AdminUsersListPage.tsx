import { useEffect, useState } from 'react';
import { fetchAllUsers } from '../util/db';
import { useNavigate } from 'react-router-dom';
import { LogBook } from '../models/entry.ts';

export default function AdminUsersListPage() {
  const [users, setUsers] = useState<LogBook['user'][]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllUsers().then((data) => {
      setUsers(data.filter(Boolean));
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-secondary-700">
        כל המשתמשים
      </h1>
      {loading ? (
        <div className="text-center text-secondary-400">טוען...</div>
      ) : users.length === 0 ? (
        <div className="text-center text-secondary-400">אין משתמשים</div>
      ) : (
        <table className="min-w-full bg-white rounded-xl shadow-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 text-right">שם</th>
              <th className="py-2 px-4 text-right">אימייל</th>
              <th className="py-2 px-4 text-right">צפייה</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className="border-t">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-primary-500 hover:underline"
                    onClick={() => navigate(`/admin/view/${user.uid}`)}
                  >
                    צפייה
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
