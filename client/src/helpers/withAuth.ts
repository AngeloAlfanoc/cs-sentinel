import { jwtDecode } from 'jwt-decode';
import { decodeType } from '../types/auth';

const withAuth = (normal: string) => {
  const user = JSON.parse(localStorage.getItem('user')!) as any;
  if (user) {
    try {
      const decoded = jwtDecode<decodeType>(user.token);
      const currentTime = Date.now() / 1000;

      return decoded && decoded.exp > currentTime ? normal : './login.lazy';
    } catch (error) {
      console.error('Failed to decode token', error);
    }
  }
  return './login.lazy';
};

export default withAuth;
