import { create } from 'zustand';
import type { UserRole } from '@/types/member';

interface AuthState {
  userId: string | null;
  email: string | null;
  displayName: string | null;
  role: UserRole | null;
  isLoading: boolean;
  setUser: (userId: string, email: string | null, displayName: string | null, role: UserRole) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  email: null,
  displayName: null,
  role: null,
  isLoading: true,
  setUser: (userId, email, displayName, role) =>
    set({ userId, email, displayName, role, isLoading: false }),
  clearUser: () =>
    set({ userId: null, email: null, displayName: null, role: null, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
}));
