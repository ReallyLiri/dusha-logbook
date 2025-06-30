import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

const disclaimerText = `ההתחברות מהווה הסכמה לתנאי השימוש ולמדיניות הפרטיות`;
const modalContent = (
  <div className="text-right text-secondary-700 text-sm space-y-4">
    <div>
      <span role="img" aria-label="policy">
        📄
      </span>{' '}
      <b>מדיניות פרטיות:</b>
      <br />
      יומן DUSHA הוא יומן אישי לתיעוד מידע גופני, רגשי ותזונתי.
      <br />
      השימוש ביומן כולל איסוף מידע אישי כגון:
      <ul className="list-disc pr-5">
        <li>מידע גופני (כאבים, מחזור חודשי, תרגול)</li>
        <li>מידע רגשי</li>
        <li>תזונה יומית</li>
      </ul>
      כל המידע נשמר בצורה מאובטחת בשרתים של Google Firebase (או כל שירות שתבחרי
      לציין).
      <br />
      המידע נגיש רק למשתמשת שהזינה אותו ולי – [שמך], לצורך ליווי אישי, מעקב
      ותכנון שיעורים או תפריטים מותאמים.
      <br />
      המידע לא יועבר לגורם שלישי, ולא ייעשה בו כל שימוש מסחרי.
      <br />
      המשתמשת רשאית לבקש למחוק את המידע שלה בכל עת.
      <br />
      <b>חשוב:</b> היומן אינו מהווה אבחנה רפואית, טיפול פסיכולוגי או ייעוץ רפואי
      מוסמך.
    </div>
    <div>
      <span role="img" aria-label="terms">
        📑
      </span>{' '}
      <b>תנאי שימוש:</b>
      <br />
      השימוש ביומן הוא אישי בלבד, לכל משתמשת שנרשמת לתהליך הליווי שלי.
      <br />
      אין להעתיק, לשכפל או להעביר את תכני היומן לאחרים ללא אישור מפורש.
      <br />
      אני לא אחראית על ניתוח או שימוש לא נכון במידע המוזן.
      <br />
      התהליך המלווה באמצעות היומן אינו מחליף ייעוץ רפואי, פסיכולוגי או תזונתי
      מוסמך.
      <br />
      כל שימוש ביומן מהווה הסכמה למדיניות הפרטיות ותנאי השימוש.
    </div>
  </div>
);

export const Login: React.FC = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
    } catch (error: unknown) {
      setError('שגיאה בהתחברות. נא לנסות שוב.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50 flex items-center justify-center px-4 py-2">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl">
        <div className="max-h-[50vh] flex-shrink-0 flex items-center justify-center mb-[-1.5rem] z-10">
          <img
            src="/img/person1.png"
            alt="Login Illustration"
            className="object-cover w-full h-full max-h-[50vh]"
            draggable="false"
          />
        </div>
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary-300 to-secondary-300 px-8 py-10">
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <h1 className="text-2xl font-bold text-white">Dusha's House</h1>
              </div>
              <p className="text-white/90 text-center mt-2 text-sm">
                יומן מעקב
              </p>
            </div>

            <div className="px-8 py-8">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm text-center">
                  {error}
                </div>
              )}

              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-secondary-700 mb-2">
                  ברוכים הבאים
                </h2>
              </div>

              {/* Disclaimer Checkbox */}
              <div className="flex items-center mb-6 justify-center">
                <input
                  id="disclaimer"
                  type="checkbox"
                  checked={disclaimerChecked}
                  onChange={(e) => setDisclaimerChecked(e.target.checked)}
                  className="accent-primary-400 w-4 h-4 ml-2 cursor-pointer"
                />
                <label
                  htmlFor="disclaimer"
                  className="text-[14px] text-primary-500 underline cursor-pointer hover:text-primary-700"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                  }}
                >
                  {disclaimerText}
                </label>
              </div>

              <button
                onClick={handleGoogleLogin}
                disabled={loading || !disclaimerChecked}
                className="w-full bg-white border-2 border-neutral-200 text-secondary-700 py-4 px-6 rounded-lg font-medium hover:bg-neutral-50 hover:border-neutral-300 focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 space-x-reverse shadow-sm"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-secondary-400 border-t-transparent"></div>
                    <span>מתחברת...</span>
                  </div>
                ) : (
                  <>
                    <GoogleIcon />
                    <span>התחברות עם Google</span>
                  </>
                )}
              </button>

              {/* Modal */}
              {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2">
                  <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 relative mx-auto">
                    <button
                      className="absolute top-2 left-2 text-secondary-400 hover:text-secondary-600 text-lg"
                      onClick={() => setShowModal(false)}
                      aria-label="סגור"
                    >
                      ✕
                    </button>
                    <div className="overflow-y-auto max-h-[70vh] pr-2">
                      {modalContent}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
