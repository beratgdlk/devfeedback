import { Elysia } from 'elysia';
import { requireRole } from '../middlewares/auth.middleware.js';
import * as userService from '../services/user.service.js';
import { UserUpdateSchema } from '../types/user.js';
export const userController = new Elysia({ prefix: '/users' })
    // Tüm kullanıcıları getir (admin yetkisi gerekli)
    .use(requireRole('admin'))
    .get('/', async ({ set }) => {
    try {
        const users = await userService.getUsers();
        return { status: 'success', data: users };
    }
    catch (error) {
        console.error('Kullanıcılar getirilirken hata:', error);
        set.status = 500;
        return { status: 'error', message: 'Sunucu hatası' };
    }
})
    // Belirli ID'ye sahip kullanıcıyı getir
    .get('/:id', async ({ params: { id }, user, set }) => {
    try {
        // Kendi profili veya admin değilse erişimi reddet
        if (user?.userId !== id && user?.role !== 'admin') {
            set.status = 403;
            return { status: 'error', message: 'Bu kullanıcı bilgilerine erişim yetkiniz yok' };
        }
        const foundUser = await userService.getUserById(id);
        if (!foundUser) {
            set.status = 404;
            return { status: 'error', message: 'Kullanıcı bulunamadı' };
        }
        return { status: 'success', data: foundUser };
    }
    catch (error) {
        console.error(`Kullanıcı ID: ${id} getirilirken hata:`, error);
        set.status = 500;
        return { status: 'error', message: 'Sunucu hatası' };
    }
})
    // Kullanıcı bilgilerini güncelle
    .put('/:id', async ({ params: { id }, body, user, set }) => {
    try {
        // Kendi profili veya admin değilse erişimi reddet
        if (user?.userId !== id && user?.role !== 'admin') {
            set.status = 403;
            return { status: 'error', message: 'Bu kullanıcıyı güncelleme yetkiniz yok' };
        }
        const updatedUser = await userService.updateUser(id, body);
        return { status: 'success', message: 'Kullanıcı güncellendi', data: updatedUser };
    }
    catch (error) {
        console.error(`Kullanıcı ID: ${id} güncellenirken hata:`, error);
        set.status = 500;
        return { status: 'error', message: 'Sunucu hatası' };
    }
}, {
    body: UserUpdateSchema
})
    // Kullanıcı sil (sadece admin)
    .delete('/:id', async ({ params: { id }, user, set }) => {
    try {
        // Admin değilse erişimi reddet
        if (user?.role !== 'admin') {
            set.status = 403;
            return { status: 'error', message: 'Kullanıcı silme yetkisine sahip değilsiniz' };
        }
        await userService.deleteUser(id);
        return { status: 'success', message: 'Kullanıcı başarıyla silindi' };
    }
    catch (error) {
        console.error(`Kullanıcı ID: ${id} silinirken hata:`, error);
        set.status = 500;
        return { status: 'error', message: 'Sunucu hatası' };
    }
});
