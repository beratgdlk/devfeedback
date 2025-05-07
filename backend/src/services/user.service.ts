import { PrismaClient } from '@prisma/client';
import { User, UserUpdate } from '../types/user.js';
import { hashPassword } from '../utils/hash.js';

const prisma = new PrismaClient();

export const getUsers = async () => {
  try {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  } catch (error) {
    console.error('Kullanıcılar getirilirken hata oluştu:', error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  } catch (error) {
    console.error(`Kullanıcı ID: ${id} getirilirken hata oluştu:`, error);
    throw error;
  }
};

export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const hashedPassword = await hashPassword(userData.password);
    
    return await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  } catch (error) {
    console.error('Kullanıcı oluşturulurken hata oluştu:', error);
    throw error;
  }
};

export const updateUser = async (id: string, userData: UserUpdate) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: userData,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
  } catch (error) {
    console.error(`Kullanıcı ID: ${id} güncellenirken hata oluştu:`, error);
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({
      where: { id }
    });
  } catch (error) {
    console.error(`Kullanıcı ID: ${id} silinirken hata oluştu:`, error);
    throw error;
  }
}; 