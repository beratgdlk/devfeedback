import { Elysia } from 'elysia';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/token.js';

// JWT token doğrulama middleware'i
export const authMiddleware = new Elysia()
  .derive(({ headers }) => {
    const authHeader = headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null };
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, role: string };
      return { user: decoded };
    } catch (error) {
      return { user: null };
    }
  });

// Kimlik doğrulama gerektiren korumalı rotalar için
export const requireAuth = new Elysia()
  .use(authMiddleware)
  .derive(({ user, set }) => {
    if (!user) {
      set.status = 401;
      return { error: 'Yetkilendirme başarısız. Lütfen giriş yapın.' };
    }
    return {};
  });

// Belirli bir role sahip kullanıcılar için
export const requireRole = (role: string) => new Elysia()
  .use(requireAuth)
  .derive(({ user, set }) => {
    if (user?.role !== role) {
      set.status = 403;
      return { error: 'Bu işlem için yetkiniz bulunmamaktadır.' };
    }
    return {};
  }); 