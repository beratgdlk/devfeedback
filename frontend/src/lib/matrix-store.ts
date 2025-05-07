"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Post türünü tanımlama
export interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  author: string;
  likes: number;
  comments: Comment[];
  createdAt: string;
  tag: string;
  color: string;
}

// Yorum türünü tanımlama
export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  technology?: string; // Yorumlar için teknoloji seçimi
  title?: string; // Yorumlar için başlık ekleme
}

interface MatrixStoreState {
  isMatrixPaused: boolean;
  toggleMatrixPause: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  likedPosts: string[]; // Beğenilen gönderilerin idleri
  toggleLike: (postId: string) => void;
  isPostLiked: (postId: string) => boolean;
}

export const useMatrixStore = create<MatrixStoreState>()(
  persist(
    (set, get) => ({
      isMatrixPaused: false,
      toggleMatrixPause: () => set((state) => ({ isMatrixPaused: !state.isMatrixPaused })),
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      likedPosts: [],
      toggleLike: (postId: string) => set((state) => ({
        likedPosts: state.likedPosts.includes(postId)
          ? state.likedPosts.filter(id => id !== postId)
          : [...state.likedPosts, postId]
      })),
      isPostLiked: (postId: string) => {
        return get().likedPosts.includes(postId);
      }
    }),
    {
      name: 'matrix-store',
    }
  )
); 