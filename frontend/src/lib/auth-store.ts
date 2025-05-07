import { create } from 'zustand';
import { authAPI } from './api';

// Kullanıcı tipi
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

// Kimlik doğrulama durumu
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Metodlar
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

// Auth store
export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  error: null,
  
  // Giriş
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await authAPI.login({ email, password });
      
      // Token ve kullanıcı bilgilerini kaydet
      localStorage.setItem('token', response.token);
      set({ 
        user: response.user,
        token: response.token,
        isLoading: false
      });
      
      return response;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Giriş sırasında bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Kayıt olma
  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const response = await authAPI.register({ name, email, password });
      
      // Token ve kullanıcı bilgilerini kaydet
      localStorage.setItem('token', response.token);
      set({ 
        user: response.user,
        token: response.token,
        isLoading: false
      });
      
      return response;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Kayıt sırasında bir hata oluştu"
      });
      throw error;
    }
  },
  
  // Çıkış yapma
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  
  // Kimlik doğrulama durumunu kontrol etme
  checkAuth: async () => {
    const token = get().token;
    
    if (!token) {
      return;
    }
    
    try {
      set({ isLoading: true });
      
      const response = await authAPI.me();
      set({ user: response.user, isLoading: false });
    } catch (error) {
      // Token geçersizse çıkış yap
      get().logout();
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Kimlik doğrulama sırasında bir hata oluştu"
      });
    }
  },
  
  // Hata mesajını temizleme
  clearError: () => {
    set({ error: null });
  }
})); 