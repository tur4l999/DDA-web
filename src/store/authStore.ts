/**
 * Auth Store - User authentication state / İstifadəçi autentifikasiya vəziyyəti
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  premiumUntil?: string;
  streak: number;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions / Aksiyalar
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  
  setUser: (user) => set({ user, isAuthenticated: true }),
  
  setToken: (token) => set({ token }),
  
  login: async (user, token) => {
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },
  
  logout: async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null,
  })),
  
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userJson = await AsyncStorage.getItem('user');
      
      if (token && userJson) {
        const user = JSON.parse(userJson);
        set({ user, token, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ isLoading: false });
    }
  },
}));
