import { Elysia, t } from 'elysia';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// Mock kullanıcı veritabanı
const users = [];
let nextId = 1;
// JWT secret ve token süresi
const JWT_SECRET = 'gizli-anahtar-burada-olmalı'; // Bu değeri güvenli bir ortam değişkeni ile değiştirin
const TOKEN_EXPIRY = '7d'; // Token süresi 7 gün
export const authController = new Elysia({ prefix: '/auth' })
    .post('/register', async ({ body }) => {
    const { email, password } = body;
    // Email kontrolü
    if (users.find(user => user.email === email)) {
        return {
            status: 'error',
            message: 'Bu email adresi zaten kullanılıyor'
        };
    }
    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);
    // Yeni kullanıcı oluştur
    const newUser = {
        id: nextId++,
        email,
        password: hashedPassword,
        createdAt: new Date()
    };
    users.push(newUser);
    return {
        status: 'success',
        message: 'Kullanıcı başarıyla oluşturuldu',
        user: {
            id: newUser.id,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    };
}, {
    body: t.Object({
        email: t.String(),
        password: t.String()
    })
})
    .post('/login', async ({ body }) => {
    const { email, password } = body;
    // Kullanıcıyı bul
    const user = users.find(user => user.email === email);
    if (!user) {
        return {
            status: 'error',
            message: 'Geçersiz email veya şifre'
        };
    }
    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return {
            status: 'error',
            message: 'Geçersiz email veya şifre'
        };
    }
    // JWT token oluştur
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    return {
        status: 'success',
        token
    };
}, {
    body: t.Object({
        email: t.String(),
        password: t.String()
    })
})
    .get('/me', async ({ headers }) => {
    // Authorization header'ını kontrol et
    const authHeader = headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            status: 'error',
            message: 'Token bulunamadı'
        };
    }
    // Token'ı al
    const token = authHeader.split(' ')[1];
    try {
        // Token'ı doğrula
        const payload = jwt.verify(token, JWT_SECRET);
        if (!payload || !payload.userId) {
            return {
                status: 'error',
                message: 'Geçersiz token'
            };
        }
        // Kullanıcıyı bul
        const user = users.find(user => user.id === payload.userId);
        if (!user) {
            return {
                status: 'error',
                message: 'Kullanıcı bulunamadı'
            };
        }
        // Kullanıcı bilgilerini dön (şifre hariç)
        return {
            status: 'success',
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt
            }
        };
    }
    catch (error) {
        return {
            status: 'error',
            message: 'Geçersiz token'
        };
    }
});
