import { create } from 'zustand';
import { User } from '../types/user';

interface AuthState {
  isAuthenticated: boolean;
  user?: {
    exp: number;
    iat: number;
    user: User;
  };
  role: any;
  login: (userDetails: any) => void;
  logout: () => void;
  setAuthenticated: () => void;
  clearUser: () => void;
  setUser: (userDetails: any) => void;
  setLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: undefined,
  role: undefined,
  login: (userDetails) => {
    return set({ isAuthenticated: true, user: userDetails });
  },
  setAuthenticated: () => set({ isAuthenticated: true }),
  logout: () => {
    localStorage.removeItem('user');
    return set({ isAuthenticated: false, user: undefined });
  },
  setUser: (userDetails) => set({ isAuthenticated: true, user: userDetails }),
  clearUser: () => set({ isAuthenticated: false, user: undefined }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading: isLoading })
}));

export default useAuthStore;
