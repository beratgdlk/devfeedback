import jwt from 'jsonwebtoken';

// Bu değeri güvenli bir ortam değişkeni ile değiştirin
export const JWT_SECRET = 'gizli-anahtar-burada-olmalı';
export const TOKEN_EXPIRY = '7d'; // Token süresi 7 gün

export const generateToken = (userId: string, role: string) => {
  return jwt.sign(
    { userId, role }, 
    JWT_SECRET, 
    { expiresIn: TOKEN_EXPIRY }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string, role: string };
  } catch (error) {
    return null;
  }
}; 