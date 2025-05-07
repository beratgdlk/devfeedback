import { Elysia } from 'elysia';
import { requireAuth } from '../middlewares/auth.middleware.js';
import * as commentService from '../services/comment.service.js';
import * as postService from '../services/post.service.js';
import * as likeService from '../services/like.service.js';
import { CommentCreateSchema } from '../types/comment.js';

export const commentController = new Elysia()
  // Gönderiye ait yorumları getir
  .get('/posts/:id/comments', async ({ params: { id }, set }) => {
    try {
      // Gönderinin varlığını kontrol et
      const post = await postService.getPostById(id);
      
      if (!post) {
        set.status = 404;
        return { status: 'error', message: 'Gönderi bulunamadı' };
      }
      
      const comments = await commentService.getCommentsByPostId(id);
      
      return { status: 'success', data: comments };
    } catch (error) {
      console.error(`Gönderi ID: ${id} için yorumlar getirilirken hata:`, error);
      set.status = 500;
      return { status: 'error', message: 'Sunucu hatası' };
    }
  })
  
  // Gönderiye yorum ekle (kimlik doğrulama gerekli)
  .use(requireAuth)
  .post('/posts/:id/comments', async ({ params: { id }, body, user, set }) => {
    try {
      if (!user) {
        set.status = 401;
        return { status: 'error', message: 'Yetkilendirme başarısız' };
      }
      
      // Gönderinin varlığını kontrol et
      const post = await postService.getPostById(id);
      
      if (!post) {
        set.status = 404;
        return { status: 'error', message: 'Gönderi bulunamadı' };
      }
      
      const comment = await commentService.createComment(id, body, user.userId);
      
      return { status: 'success', message: 'Yorum eklendi', data: comment };
    } catch (error) {
      console.error(`Gönderi ID: ${id} için yorum eklenirken hata:`, error);
      set.status = 500;
      return { status: 'error', message: 'Sunucu hatası' };
    }
  }, {
    body: CommentCreateSchema
  })
  
  // Yorum sil (sadece yazar veya admin)
  .delete('/comments/:id', async ({ params: { id }, user, set }) => {
    try {
      if (!user) {
        set.status = 401;
        return { status: 'error', message: 'Yetkilendirme başarısız' };
      }
      
      // Kullanıcı yorumun yazarı mı kontrol et
      const isAuthor = await commentService.isUserCommentAuthor(id, user.userId);
      
      if (!isAuthor && user.role !== 'admin') {
        set.status = 403;
        return { status: 'error', message: 'Bu yorumu silme yetkiniz yok' };
      }
      
      await commentService.deleteComment(id);
      
      return { status: 'success', message: 'Yorum başarıyla silindi' };
    } catch (error) {
      console.error(`Yorum ID: ${id} silinirken hata:`, error);
      set.status = 500;
      return { status: 'error', message: 'Sunucu hatası' };
    }
  })
  
  // Yorumu beğen/beğeniyi geri çek
  .post('/comments/:id/like', async ({ params: { id }, user, set }) => {
    try {
      if (!user) {
        set.status = 401;
        return { status: 'error', message: 'Yetkilendirme başarısız' };
      }
      
      const result = await likeService.likeComment(id, user.userId);
      
      return { 
        status: 'success', 
        message: result.liked ? 'Yorum beğenildi' : 'Yorum beğenisi kaldırıldı',
        data: result
      };
    } catch (error) {
      console.error(`Yorum ID: ${id} beğenilirken hata:`, error);
      set.status = 500;
      return { status: 'error', message: 'Sunucu hatası' };
    }
  }); 