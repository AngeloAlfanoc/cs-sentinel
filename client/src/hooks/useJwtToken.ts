/* eslint-disable unicorn/no-null */
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import useAuthStore from '../stores/useAuthStore';
import { decodeType } from '../types/auth';
import { useNavigate } from '@tanstack/react-router';

function useJwtToken() {
  const [decodedToken, setDecodedToken] = useState<decodeType | null>(null);
  const { login } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    function decodeToken() {
      const user = JSON.parse(localStorage.getItem('user')!) as any;
      if (user) {
        try {
          const decoded = jwtDecode<decodeType>(user.token);
          const currentTime = Date.now() / 1000;

          if (decoded && decoded.exp > currentTime) {
            setDecodedToken(decoded);
            login(decoded);
          } else {
            setDecodedToken(null);
            navigate({ to: '/login' });
          }
        } catch (error) {
          console.error('Failed to decode token', error);
          setDecodedToken(null);
          navigate({ to: '/login' });
        }
      }
    }

    // Decode the token when the component mounts
    decodeToken();
    // Add an event listener for the 'storage' event to handle token updates
    window.addEventListener('storage', decodeToken);
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('storage', decodeToken);
  }, [login, navigate]);

  // Return the decodedToken state
  return decodedToken;
}

// Export the useJwtToken hook for use in other components
export default useJwtToken;
