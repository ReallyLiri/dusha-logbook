import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import { Sparkles, TrendingUp, Calendar, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { currentUser } = useAuth();

  const getUserName = () => {
    return currentUser?.displayName || 
           currentUser?.email?.split('@')[0] || 
           'משתמש';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 space-x-reverse mb-4">
            <div className="h-12 w-12 bg-gradient-to-br from-primary-300 to-secondary-300 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-700">
                ברוך הבא, {getUserName()}!
              </h1>
              <p className="text-secondary-500 mt-1">
                מוכן לעקוב אחר התובנות שלך ולהמשיך במסע הצמיחה?
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-400" />
              </div>
              <div className="text-right">
                <p className="text-secondary-500 text-sm font-medium">סך הכל רשומות</p>
                <p className="text-2xl font-bold text-secondary-700 mt-1">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-secondary-400" />
              </div>
              <div className="text-right">
                <p className="text-secondary-500 text-sm font-medium">השבוע</p>
                <p className="text-2xl font-bold text-secondary-700 mt-1">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-400" />
              </div>
              <div className="text-right">
                <p className="text-secondary-500 text-sm font-medium">רצף</p>
                <p className="text-2xl font-bold text-secondary-700 mt-1">0 ימים</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-300 to-secondary-300 rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            התחל את הרשומה הראשונה שלך
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            התחל את מסע הגילוי העצמי והצמיחה שלך על ידי רישום התובנה הראשונה שלך.
            כל רשומה מקרבת אותך להבנה טובה יותר של עצמך.
          </p>
          <button className="bg-white text-secondary-600 px-8 py-3 rounded-lg font-semibold hover:bg-neutral-50 transition-colors inline-flex items-center space-x-2 space-x-reverse shadow-sm">
            <span>צור רשומה חדשה</span>
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {/* Recent Entries Placeholder */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-secondary-700 mb-4 text-right">רשומות אחרונות</h3>
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-neutral-100">
            <div className="h-16 w-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-neutral-400" />
            </div>
            <h4 className="text-lg font-medium text-secondary-600 mb-2">אין רשומות עדיין</h4>
            <p className="text-secondary-500 mb-4">
              התובנות והנתונים שלך יופיעו כאן ברגע שתתחיל לרשום רשומות.
            </p>
            <button className="text-primary-400 hover:text-primary-500 font-medium transition-colors">
              צור את הרשומה הראשונה שלך ←
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;