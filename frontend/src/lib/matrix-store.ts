"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MatrixStoreState {
  isMatrixPaused: boolean;
  toggleMatrixPause: () => void;
}

// Matrix animasyonunu global olarak yönetmek için store
export const useMatrixStore = create<MatrixStoreState>()(
  persist(
    (set) => ({
      isMatrixPaused: false,
      toggleMatrixPause: () => set((state) => ({ isMatrixPaused: !state.isMatrixPaused })),
    }),
    {
      name: 'matrix-animation-store', // store adı
    }
  )
); 