import { PrismaClient } from '@prisma/client';
import { PostCreate, PostUpdate } from '../types/post.js';

const prisma = new PrismaClient();

export const getPosts = async () => {
  try {
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Gönderiler getirilirken hata oluştu:', error);
    throw error;
  }
};

export const getPostById = async (id: string) => {
  try {
    return await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Gönderi ID: ${id} getirilirken hata oluştu:`, error);
    throw error;
  }
};

export const createPost = async (postData: PostCreate, authorId: string) => {
  try {
    return await prisma.post.create({
      data: {
        ...postData,
        authorId
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });
  } catch (error) {
    console.error('Gönderi oluşturulurken hata oluştu:', error);
    throw error;
  }
};

export const updatePost = async (id: string, postData: PostUpdate) => {
  try {
    return await prisma.post.update({
      where: { id },
      data: postData,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });
  } catch (error) {
    console.error(`Gönderi ID: ${id} güncellenirken hata oluştu:`, error);
    throw error;
  }
};

export const deletePost = async (id: string) => {
  try {
    return await prisma.post.delete({
      where: { id }
    });
  } catch (error) {
    console.error(`Gönderi ID: ${id} silinirken hata oluştu:`, error);
    throw error;
  }
};

export const isUserPostAuthor = async (postId: string, userId: string): Promise<boolean> => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true }
    });
    
    return post?.authorId === userId;
  } catch (error) {
    console.error(`Gönderi yazarı kontrol edilirken hata oluştu:`, error);
    throw error;
  }
}; 