import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export const useLanguageStore = create((set) => ({
  language: 'en',
  setLanguage: (language) => set({ language }),
}));