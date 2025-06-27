import { useAuth } from '../context/AuthContext.tsx';

export const useCurrentUser = () => {
  const { currentUser } = useAuth();

  return {
    name:
      currentUser?.displayName || currentUser?.email?.split('@')[0] || 'משתמשת',
  };
};
