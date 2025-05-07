import { PrismaClient } from '@prisma/client';
import { CommentCreate } from '../types/comment.js';

const prisma = new PrismaClient();

export const getCommentsByPostId = async (postId: string) => {
  try {
    return await prisma.comment.findMany({
      where: { postId },
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
            likes: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  } catch (error) {
    console.error(`Gönderi ID: ${postId} için yorumlar getirilirken hata oluştu:`, error);
    throw error;
  }
};

export const createComment = async (postId: string, data: CommentCreate, authorId: string) => {
  try {
    return await prisma.comment.create({
      data: {
        content: data.content,
        authorId,
        postId
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
    console.error('Yorum oluşturulurken hata oluştu:', error);
    throw error;
  }
};

export const deleteComment = async (id: string) => {
  try {
    return await prisma.comment.delete({
      where: { id }
    });
  } catch (error) {
    console.error(`Yorum ID: ${id} silinirken hata oluştu:`, error);
    throw error;
  }
};

export const isUserCommentAuthor = async (commentId: string, userId: string): Promise<boolean> => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true }
    });
    
    return comment?.authorId === userId;
  } catch (error) {
    console.error(`Yorum yazarı kontrol edilirken hata oluştu:`, error);
    throw error;
  }
}; 