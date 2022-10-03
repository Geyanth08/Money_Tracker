import { useAuthContext } from './useAuthContext';
import { useTransactionsContext } from './useTransactionsContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: transactionsDispatch } = useTransactionsContext();
  const logout = () => {
    // Remove user from localStorage
    localStorage.removeItem('user');

    // Remove from user from Global Storage
    dispatch({ type: 'LOGOUT' });
    transactionsDispatch({ type: 'SET_TRANSACTIONS', payload: null });
  };

  return { logout };
};
