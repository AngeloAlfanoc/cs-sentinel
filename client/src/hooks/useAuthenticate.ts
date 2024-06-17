import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router'; // Import useNavigate for redirection
import useJwtToken from './useJwtToken';
import useAuthStore from '../stores/useAuthStore';

export const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user')!) as any;
  return user && user.token;
};

function useAuthenticate() {
  const token = useJwtToken();
  const { setUser, clearUser, setLoading } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    if (token) {
      setUser(token);
    } else {
      clearUser();
    }
    setLoading(false);
  }, [token, setUser, clearUser, navigate, setLoading]);
}

export default useAuthenticate;
