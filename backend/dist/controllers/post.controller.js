import { Elysia } from 'elysia';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middlewares/auth.middleware.js';
const prisma = new PrismaClient();
export const postController = new Elysia({ prefix: '/posts' })
    // Tüm gönderileri getir
    .get('/', async ({ set }) => {
    try {
        const posts = await prisma.post.findMany({
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
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return {
            status: 'success',
            data: posts
        };
    }
    catch (error) {
        console.error('Gönderi getirme hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Belirli bir gönderiyi getir
    .get('/:id', async ({ params, set }) => {
    try {
        const { id } = params;
        const post = await prisma.post.findUnique({
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
        if (!post) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Gönderi bulunamadı'
            };
        }
        return {
            status: 'success',
            data: post
        };
    }
    catch (error) {
        console.error('Gönderi getirme hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Kullanıcının kendi gönderilerini getir
    .use(requireAuth)
    .get('/user/:userId', async ({ params, user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme gerekli'
            };
        }
        const { userId } = params;
        // Eğer başka bir kullanıcının gönderileri isteniyorsa admin yetkisi gerekli
        if (userId !== user.userId && user.role !== 'ADMIN') {
            set.status = 403;
            return {
                status: 'error',
                message: 'Bu işlem için yetkiniz bulunmamaktadır'
            };
        }
        const posts = await prisma.post.findMany({
            where: { authorId: userId },
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
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return {
            status: 'success',
            data: posts
        };
    }
    catch (error) {
        console.error('Kullanıcı gönderileri getirme hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Kullanıcının beğendiği gönderileri getir
    .use(requireAuth)
    .get('/liked', async ({ user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme gerekli'
            };
        }
        // Kullanıcının beğendiği gönderileri bul
        const likedPosts = await prisma.like.findMany({
            where: { userId: user.userId, postId: { not: null } },
            select: {
                post: {
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
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // Null olmayan postları çıkart
        const posts = likedPosts
            .filter(like => like.post !== null)
            .map(like => like.post);
        return {
            status: 'success',
            data: posts
        };
    }
    catch (error) {
        console.error('Beğenilen gönderileri getirme hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Yeni gönderi oluştur
    .use(requireAuth)
    .post('/', async ({ body, user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme gerekli'
            };
        }
        const postData = body;
        const { title, description, tag } = postData;
        const post = await prisma.post.create({
            data: {
                title,
                description,
                tag,
                authorId: user.userId
            }
        });
        return {
            status: 'success',
            message: 'Gönderi başarıyla oluşturuldu',
            data: post
        };
    }
    catch (error) {
        console.error('Gönderi oluşturma hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Gönderiyi güncelle
    .use(requireAuth)
    .put('/:id', async ({ params, body, user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme gerekli'
            };
        }
        const { id } = params;
        const postData = body;
        const { title, description, tag } = postData;
        // Gönderiyi bul
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (!post) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Gönderi bulunamadı'
            };
        }
        // Yetki kontrolü
        if (post.authorId !== user.userId && user.role !== 'ADMIN') {
            set.status = 403;
            return {
                status: 'error',
                message: 'Bu işlem için yetkiniz bulunmamaktadır'
            };
        }
        // Gönderiyi güncelle
        const updatedPost = await prisma.post.update({
            where: { id },
            data: {
                title,
                description,
                tag
            }
        });
        return {
            status: 'success',
            message: 'Gönderi başarıyla güncellendi',
            data: updatedPost
        };
    }
    catch (error) {
        console.error('Gönderi güncelleme hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Gönderi sil
    .use(requireAuth)
    .delete('/:id', async ({ params, user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme gerekli'
            };
        }
        const { id } = params;
        // Gönderiyi bul
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (!post) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Gönderi bulunamadı'
            };
        }
        // Yetki kontrolü
        if (post.authorId !== user.userId && user.role !== 'ADMIN') {
            set.status = 403;
            return {
                status: 'error',
                message: 'Bu işlem için yetkiniz bulunmamaktadır'
            };
        }
        // Gönderiyi sil
        await prisma.post.delete({
            where: { id }
        });
        return {
            status: 'success',
            message: 'Gönderi başarıyla silindi'
        };
    }
    catch (error) {
        console.error('Gönderi silme hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Gönderiyi beğen/beğenmekten vazgeç
    .use(requireAuth)
    .post('/:id/like', async ({ params, user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme gerekli'
            };
        }
        const { id } = params;
        // Gönderiyi bul
        const post = await prisma.post.findUnique({
            where: { id }
        });
        if (!post) {
            set.status = 404;
            return {
                status: 'error',
                message: 'Gönderi bulunamadı'
            };
        }
        // Kullanıcının bu gönderiyi daha önce beğenip beğenmediğini kontrol et
        const existingLike = await prisma.like.findFirst({
            where: {
                userId: user.userId,
                postId: id
            }
        });
        if (existingLike) {
            // Beğeniyi kaldır
            await prisma.like.delete({
                where: { id: existingLike.id }
            });
            return {
                status: 'success',
                message: 'Gönderi beğenisi kaldırıldı'
            };
        }
        else {
            // Beğeni ekle
            await prisma.like.create({
                data: {
                    userId: user.userId,
                    postId: id
                }
            });
            return {
                status: 'success',
                message: 'Gönderi beğenildi'
            };
        }
    }
    catch (error) {
        console.error('Gönderi beğenme hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
});
