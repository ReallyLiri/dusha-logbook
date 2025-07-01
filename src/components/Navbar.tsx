import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useCurrentUser } from '../hooks/useCurrentUser.ts';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { name } = useCurrentUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const adminEmails = ['reallyliri@gmail.com', 'daniellegr1994@gmail.com'];
  const isAdmin = adminEmails.includes(currentUser?.email || '');

  return (
    <nav className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 space-x-reverse cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <h1 className="text-xl text-center font-bold text-secondary-600">
              Dusha's House
            </h1>
          </div>
          <div
            className="flex items-center space-x-2 space-x-reverse cursor-pointer"
            onClick={() => (window.location.href = '/')}
          >
            <h1 className="text-lg text-center font-bold text-primary-500">
              יומן מעקב אישי לחיבור בין גוף, תנועה ורגש
            </h1>
          </div>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 space-x-reverse px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300"
            >
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="h-8 w-8 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full flex items-center justify-center overflow-hidden">
                  {currentUser?.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt="Profile"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-secondary-700">
                    {name}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-secondary-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-auto bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
                {isAdmin && (
                  <Link
                    to="/admin/view"
                    className="w-full flex flex-row-reverse items-center justify-end px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    <span className="mr-2 text-right w-full">ניהול</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full flex flex-row-reverse items-center justify-end px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <span className="mr-2 text-right w-full">התנתקות</span>
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
