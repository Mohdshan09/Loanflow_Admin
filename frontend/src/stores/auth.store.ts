import { create } from 'zustand';
import type { AuthResponse } from '../types/auth.types';

type User = AuthResponse['user'];

interface AuthState {
  token: string | null;
  user: User | null;
  isInitialized: boolean;

  login: (token: string, user: User, rememberMe: boolean) => void;

  logout: () => void;

  restoreSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isInitialized: false,

  login: (token, user, rememberMe) => {
    // Clear previous auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem('token', token);
    storage.setItem('user', JSON.stringify(user));

    set({
      token,
      user,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');

    set({
      token: null,
      user: null,
      isInitialized: true,
    });
  },

  restoreSession: () => {
    const token = localStorage.getItem('token') ?? sessionStorage.getItem('token');

    const userString = localStorage.getItem('user') ?? sessionStorage.getItem('user');

    if (!token || !userString) {
      set({
        token: null,
        user: null,
        isInitialized: true,
      });

      return;
    }

    try {
      const user = JSON.parse(userString) as User;

      set({
        token,
        user,
        isInitialized: true,
      });
    } catch {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');

      set({
        token: null,
        user: null,
        isInitialized: true,
      });
    }
  },
}));
