import { create } from 'zustand';
import type { SessionStatus } from '@/types/session';

interface SessionState {
  sessionId: string | null;
  customerId: string | null;
  designerId: string | null;
  status: SessionStatus;
  createdAt: number | null;
  confirmedAt: number | null;

  startSession: (sessionId: string, customerId: string, designerId: string) => void;
  setStatus: (status: SessionStatus) => void;
  confirmSession: () => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  customerId: null,
  designerId: null,
  status: 'scanning',
  createdAt: null,
  confirmedAt: null,

  startSession: (sessionId, customerId, designerId) =>
    set({
      sessionId,
      customerId,
      designerId,
      status: 'scanning',
      createdAt: Date.now(),
      confirmedAt: null,
    }),

  setStatus: (status) => set({ status }),

  confirmSession: () =>
    set({ status: 'confirmed', confirmedAt: Date.now() }),

  clearSession: () =>
    set({
      sessionId: null,
      customerId: null,
      designerId: null,
      status: 'scanning',
      createdAt: null,
      confirmedAt: null,
    }),
}));
