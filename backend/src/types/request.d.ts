import { User } from './user';

// JWT'den çözülen kullanıcı bilgisi
export interface DecodedUser {
  userId: string;
  role: string;
}

// Elysia context için genişletilmiş tipler
declare module 'elysia' {
  interface Context {
    user?: DecodedUser;
  }
} 