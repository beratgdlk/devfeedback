import { Elysia, t } from 'elysia';
import { PrismaClient } from '@prisma/client';
import { UserCreateSchema } from '../types/user.js';
import authService from '../services/auth.service.js';
import { requireAuth } from '../middlewares/auth.middleware.js';
const prisma = new PrismaClient();
export const authController = new Elysia({ prefix: '/auth' })
    .post('/register', async ({ body, set }) => {
    try {
        const { name, email, password } = body;
        // Email kontrolü
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            set.status = 400;
            return {
                status: 'error',
                message: 'Bu email adresi zaten kullanılıyor'
            };
        }
        // Auth service'i kullan
        const result = await authService.register(name, email, password);
        return {
            status: 'success',
            message: 'Kullanıcı başarıyla oluşturuldu. Email adresinizi doğrulamak için mailinizi kontrol edin.',
            user: result.user,
            token: result.token
        };
    }
    catch (error) {
        console.error('Kullanıcı kaydı sırasında hata:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
}, {
    body: UserCreateSchema
})
    .post('/login', async ({ body, set }) => {
    try {
        const { email, password } = body;
        // Auth service'i kullan
        const result = await authService.login(email, password);
        return {
            status: 'success',
            message: 'Giriş başarılı',
            user: result.user,
            token: result.token
        };
    }
    catch (error) {
        console.error('Giriş sırasında hata:', error);
        set.status = 401;
        return {
            status: 'error',
            message: error instanceof Error ? error.message : 'Giriş yapılamadı'
        };
    }
}, {
    body: t.Object({
        email: t.String(),
        password: t.String()
    })
})
    .use(requireAuth)
    .get('/me', async ({ user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme başarısız'
            };
        }
        const result = await authService.me(user.userId);
        return {
            status: 'success',
            data: result.user
        };
    }
    catch (error) {
        console.error('Me endpoint hatası:', error);
        set.status = 500;
        return {
            status: 'error',
            message: 'Sunucu hatası'
        };
    }
})
    // Email doğrulama - Authentication gerektirmez
    .get('/verify-email/:token', async ({ params, set }) => {
    try {
        const { token } = params;
        const result = await authService.verifyEmail(token);
        return {
            status: 'success',
            message: result.message
        };
    }
    catch (error) {
        console.error('Email doğrulama hatası:', error);
        set.status = 400;
        return {
            status: 'error',
            message: error instanceof Error ? error.message : 'Doğrulama yapılamadı'
        };
    }
}, {
    params: t.Object({
        token: t.String(),
    }),
})
    // Doğrulama emailini yeniden gönder - Authentication gerektirir
    .use(requireAuth)
    .post('/resend-verification', async ({ user, set }) => {
    try {
        if (!user) {
            set.status = 401;
            return {
                status: 'error',
                message: 'Yetkilendirme başarısız'
            };
        }
        const result = await authService.resendVerificationEmail(user.userId);
        return {
            status: 'success',
            message: result.message
        };
    }
    catch (error) {
        console.error('Doğrulama emaili gönderme hatası:', error);
        set.status = 400;
        return {
            status: 'error',
            message: error instanceof Error ? error.message : 'Email gönderilemedi'
        };
    }
});
