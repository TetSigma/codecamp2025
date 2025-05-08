import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useChatStore = create(
  persist(
    (set) => ({
      previousResponse: '',
      setPreviousResponse: (response: string) => set({ previousResponse: response }),
      clearPreviousResponse: () => set({ previousResponse: '' }),
    }),
    {
      name: 'chat-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
