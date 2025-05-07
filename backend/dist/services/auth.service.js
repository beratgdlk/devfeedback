import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/token.js';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
const prisma = new PrismaClient();
// Email doğrulama için transporter oluşturma
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'devfeedback@example.com', // Test için sahte e-posta adresi
        pass: 'password123', // Test için sahte şifre
    },
});
class AuthService {
    // Kullanıcı kaydı
    async register(name, email, password) {
        // Email kullanımda mı kontrol et
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error('Bu email adresi zaten kullanımda');
        }
        // Şifreyi hashle
        const hashedPassword = await bcrypt.hash(password, 10);
        // Doğrulama token'ı oluştur
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat geçerli
        // Kullanıcıyı oluştur
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER',
                verificationToken,
                verificationExpires,
                isVerified: false,
            },
        });
        // JWT token oluştur
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        // Doğrulama e-postası gönder
        try {
            await this.sendVerificationEmail(user.email, verificationToken);
        }
        catch (error) {
            console.error('Email gönderme hatası:', error);
        }
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
    // Kullanıcı girişi
    async login(email, password) {
        // Kullanıcıyı bul
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new Error('Geçersiz email veya şifre');
        }
        // Şifre kontrolü
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error('Geçersiz email veya şifre');
        }
        // JWT token oluştur
        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
            token,
        };
    }
    // Kullanıcı bilgilerini getir
    async me(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        };
    }
    // Email doğrulama
    async verifyEmail(token) {
        const user = await prisma.user.findFirst({
            where: {
                verificationToken: token,
                verificationExpires: {
                    gt: new Date()
                }
            }
        });
        if (!user) {
            throw new Error('Geçersiz veya süresi dolmuş doğrulama bağlantısı');
        }
        // Kullanıcıyı doğrulanmış olarak işaretle
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationExpires: null
            }
        });
        return {
            message: 'Email adresiniz başarıyla doğrulandı'
        };
    }
    // Doğrulama e-postası gönder
    async sendVerificationEmail(email, token) {
        const verificationUrl = `http://localhost:3001/verify-email?token=${token}`;
        const mailOptions = {
            from: 'DevFeedback <devfeedback@example.com>',
            to: email,
            subject: 'DevFeedback - Email Adresi Doğrulama',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #33FF33; text-align: center;">DevFeedback Email Doğrulama</h2>
          <p>Merhaba,</p>
          <p>DevFeedback hesabınızı oluşturduğunuz için teşekkür ederiz. Email adresinizi doğrulamak için aşağıdaki bağlantıya tıklayın:</p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${verificationUrl}" style="background-color: #33FF33; color: #000; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Email Adresimi Doğrula</a>
          </div>
          <p>Bu bağlantı 24 saat boyunca geçerlidir.</p>
          <p>Eğer bu hesabı siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz.</p>
          <p>Teşekkürler,<br/>DevFeedback Ekibi</p>
        </div>
      `
        };
        return transporter.sendMail(mailOptions);
    }
    // Doğrulama e-postasını yeniden gönder
    async resendVerificationEmail(userId) {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            throw new Error('Kullanıcı bulunamadı');
        }
        if (user.isVerified) {
            throw new Error('Email adresiniz zaten doğrulanmış');
        }
        // Yeni token oluştur
        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat geçerli
        // Kullanıcı bilgilerini güncelle
        await prisma.user.update({
            where: { id: user.id },
            data: {
                verificationToken,
                verificationExpires
            }
        });
        // Doğrulama e-postası gönder
        try {
            await this.sendVerificationEmail(user.email, verificationToken);
        }
        catch (error) {
            console.error('Email gönderme hatası:', error);
            throw new Error('Email gönderilirken bir hata oluştu');
        }
        return {
            message: 'Doğrulama e-postası başarıyla gönderildi'
        };
    }
}
export default new AuthService();
