import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { EntryPage } from './components/EntryPage';
import { MotivationPage } from './components/MotivationPage';
import { DbProvider } from './context/DbContext.tsx';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/entry/:day" element={<EntryPage />} />
      <Route path="/motivation" element={<MotivationPage />} />
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
