import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpen, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
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

  return (
    <nav className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <BookOpen className="h-8 w-8 text-primary-300" />
            <h1 className="text-xl font-bold text-secondary-600">
              דושה-לוגבוק
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
                    {currentUser?.displayName ||
                      currentUser?.email?.split('@')[0] ||
                      'משתמש'}
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
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-neutral-100 sm:hidden">
                  <p className="text-sm font-medium text-secondary-700 text-right">
                    {currentUser?.displayName ||
                      currentUser?.email?.split('@')[0] ||
                      'משתמש'}
                  </p>
                  <p className="text-xs text-secondary-500 truncate text-right">
                    {currentUser?.email}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center justify-end space-x-2 space-x-reverse transition-colors"
                >
                  <span>התנתק</span>
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

export default Navbar;
