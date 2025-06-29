import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/Login.tsx';
import { Home } from './pages/Home.tsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EntryPage } from './pages/EntryPage.tsx';
import { MotivationPage } from './pages/MotivationPage.tsx';
import { DbProvider } from './context/DbContext.tsx';
import AdminUsersListPage from './pages/AdminUsersListPage';
import AdminUserDetailPage from './pages/AdminUserDetailPage';
import AdminUserEntryPage from './pages/AdminUserEntryPage';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entry/:day" element={<EntryPage />} />
      <Route path="/motivation" element={<MotivationPage />} />
      <Route path="/admin/view" element={<AdminUsersListPage />} />
      <Route path="/admin/view/:uid" element={<AdminUserDetailPage />} />
      <Route path="/admin/view/:uid/:day" element={<AdminUserEntryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <DbProvider>
          <AppContent />
        </DbProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
