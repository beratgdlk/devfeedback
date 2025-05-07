import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const likePost = async (postId, userId) => {
    try {
        // Önceden beğenilmiş mi kontrol et
        const existingLike = await prisma.like.findFirst({
            where: {
                userId,
                postId
            }
        });
        if (existingLike) {
            // Beğeni varsa kaldır
            await prisma.like.delete({
                where: { id: existingLike.id }
            });
            return { liked: false };
        }
        else {
            // Beğeni yoksa ekle
            await prisma.like.create({
                data: {
                    userId,
                    postId
                }
            });
            return { liked: true };
        }
    }
    catch (error) {
        console.error(`Gönderi ID: ${postId} beğenilirken hata oluştu:`, error);
        throw error;
    }
};
export const likeComment = async (commentId, userId) => {
    try {
        // Önceden beğenilmiş mi kontrol et
        const existingLike = await prisma.like.findFirst({
            where: {
                userId,
                commentId
            }
        });
        if (existingLike) {
            // Beğeni varsa kaldır
            await prisma.like.delete({
                where: { id: existingLike.id }
            });
            return { liked: false };
        }
        else {
            // Beğeni yoksa ekle
            await prisma.like.create({
                data: {
                    userId,
                    commentId
                }
            });
            return { liked: true };
        }
    }
    catch (error) {
        console.error(`Yorum ID: ${commentId} beğenilirken hata oluştu:`, error);
        throw error;
    }
};
