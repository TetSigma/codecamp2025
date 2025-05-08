import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: any) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', 
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
