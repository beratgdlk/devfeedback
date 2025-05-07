import { create } from 'zustand';
import { postAPI, commentAPI } from './api';

// Post tipi
export interface Post {
  id: string;
  title: string;
  description: string;
  tag: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  _count: {
    comments: number;
    likes: number;
  };
  // İsteğe bağlı yorum verileri
  comments?: Comment[];
}

// Yorum tipi
export interface Comment {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  _count: {
    likes: number;
  };
}

// Post oluşturma veri tipi
export interface PostCreate {
  title: string;
  description: string;
  tag: string;
}

// Post güncelleme veri tipi
export interface PostUpdate {
  title?: string;
  description?: string;
  tag?: string;
}

// Store durumu
interface PostState {
  posts: Post[];
  currentPost: Post | null;
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  
  // Metodlar
  fetchPosts: () => Promise<void>;
  fetchPost: (id: string) => Promise<void>;
  fetchComments: (postId: string) => Promise<void>;
  createPost: (data: PostCreate) => Promise<void>;
  updatePost: (id: string, data: PostUpdate) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  createComment: (postId: string, content: string) => Promise<void>;
  deleteComment: (id: string) => Promise<void>;
  likeComment: (id: string) => Promise<void>;
  clearError: () => void;
}

// Post store
export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  currentPost: null,
  comments: [],
  isLoading: false,
  error: null,
  
  // Tüm gönderileri getir
  fetchPosts: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await postAPI.getPosts();
      set({ posts: response.data, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Gönderiler yüklenirken bir hata oluştu"
      });
    }
  },
  
  // Belirli bir gönderiyi getir
  fetchPost: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await postAPI.getPost(id);
      set({ currentPost: response.data, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Gönderi yüklenirken bir hata oluştu"
      });
    }
  },
  
  // Gönderiye ait yorumları getir
  fetchComments: async (postId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await commentAPI.getComments(postId);
      set({ comments: response.data, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Yorumlar yüklenirken bir hata oluştu"
      });
    }
  },
  
  // Yeni gönderi oluştur
  createPost: async (data: PostCreate) => {
    try {
      set({ isLoading: true, error: null });
      
      await postAPI.createPost(data);
      
      // Gönderileri yeniden yükle
      await get().fetchPosts();
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Gönderi oluşturulurken bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Gönderi güncelle
  updatePost: async (id: string, data: PostUpdate) => {
    try {
      set({ isLoading: true, error: null });
      
      await postAPI.updatePost(id, data);
      
      // Gönderiyi ve listeyi yeniden yükle
      if (get().currentPost?.id === id) {
        await get().fetchPost(id);
      }
      await get().fetchPosts();
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Gönderi güncellenirken bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Gönderi sil
  deletePost: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await postAPI.deletePost(id);
      
      // Silinen gönderiyi kaldır ve listeyi güncelle
      const updatedPosts = get().posts.filter(post => post.id !== id);
      set({ posts: updatedPosts, currentPost: null, isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Gönderi silinirken bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Gönderiyi beğen/beğenme
  likePost: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await postAPI.likePost(id);
      
      // Eğer mevcut gönderi ise verileri yenile
      if (get().currentPost?.id === id) {
        await get().fetchPost(id);
      }
      
      // Listenin beğeni sayılarını güncelle
      await get().fetchPosts();
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Gönderi beğenilirken bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Yorum ekle
  createComment: async (postId: string, content: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await commentAPI.createComment(postId, content);
      
      // Yorumları ve mevcut gönderiyi yeniden yükle
      await get().fetchComments(postId);
      if (get().currentPost?.id === postId) {
        await get().fetchPost(postId);
      }
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Yorum eklenirken bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Yorum sil
  deleteComment: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await commentAPI.deleteComment(id);
      
      // Silinen yorumu kaldır
      const updatedComments = get().comments.filter(comment => comment.id !== id);
      set({ comments: updatedComments, isLoading: false });
      
      // Eğer mevcut gönderi varsa, yorum sayısını güncelle
      if (get().currentPost) {
        await get().fetchPost(get().currentPost!.id);
      }
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Yorum silinirken bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Yorumu beğen/beğenme
  likeComment: async (id: string) => {
    try {
      set({ isLoading: true, error: null });
      
      await commentAPI.likeComment(id);
      
      // Yorumları yeniden yükle
      if (get().currentPost) {
        await get().fetchComments(get().currentPost!.id);
      }
      
      set({ isLoading: false });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Yorum beğenilirken bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Hata mesajını temizleme
  clearError: () => {
    set({ error: null });
  }
})); 