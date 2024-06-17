import { Navigate } from '@tanstack/react-router';
import useAuthStore from '../stores/useAuthStore';

type Properties = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<Properties> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to='/login' replace />;
  }

  return children;
};
