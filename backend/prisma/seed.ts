import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/hash.js';

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Veritabanını temizliyorum...');
    
    // Veritabanından tüm kayıtları temizle
    await prisma.like.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    
    console.log('Örnek kullanıcılar oluşturuluyor...');
    
    // Admin kullanıcısı
    const adminPassword = await hashPassword('admin123');
    const admin = await prisma.user.create({
      data: {
        name: 'Admin Kullanıcı',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'admin'
      }
    });
    
    // Normal kullanıcılar
    const userPassword = await hashPassword('user123');
    const user1 = await prisma.user.create({
      data: {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        password: userPassword,
        role: 'user'
      }
    });
    
    const user2 = await prisma.user.create({
      data: {
        name: 'Ayşe Demir',
        email: 'ayse@example.com',
        password: userPassword,
        role: 'user'
      }
    });
    
    console.log('Örnek gönderiler oluşturuluyor...');
    
    // Gönderiler
    const post1 = await prisma.post.create({
      data: {
        title: 'React Hooks Nedir?',
        description: 'Bu yazıda React Hooks hakkında bilgi vereceğim...',
        authorId: user1.id,
        tag: 'React'
      }
    });
    
    const post2 = await prisma.post.create({
      data: {
        title: 'TypeScript İle Verimli Kod Yazma',
        description: 'TypeScript kullanarak daha güvenli kod yazmak için ipuçları...',
        authorId: user2.id,
        tag: 'TypeScript'
      }
    });
    
    const post3 = await prisma.post.create({
      data: {
        title: 'Node.js Backend Mimarisi',
        description: 'Ölçeklenebilir bir Node.js uygulaması nasıl geliştirilir...',
        authorId: admin.id,
        tag: 'Node.js'
      }
    });
    
    console.log('Örnek yorumlar oluşturuluyor...');
    
    // Yorumlar
    await prisma.comment.create({
      data: {
        content: 'Harika bir yazı olmuş, teşekkürler!',
        authorId: user2.id,
        postId: post1.id
      }
    });
    
    await prisma.comment.create({
      data: {
        content: 'Bu konuda bir örnek uygulama gösterir misiniz?',
        authorId: admin.id,
        postId: post1.id
      }
    });
    
    await prisma.comment.create({
      data: {
        content: 'TypeScript ile geliştirme yapmaya yeni başladım, çok faydalı oldu.',
        authorId: user1.id,
        postId: post2.id
      }
    });
    
    console.log('Örnek beğeniler oluşturuluyor...');
    
    // Beğeniler
    await prisma.like.create({
      data: {
        userId: user2.id,
        postId: post1.id
      }
    });
    
    await prisma.like.create({
      data: {
        userId: admin.id,
        postId: post1.id
      }
    });
    
    await prisma.like.create({
      data: {
        userId: user1.id,
        postId: post2.id
      }
    });
    
    console.log('Seed işlemi başarıyla tamamlandı!');
  } catch (error) {
    console.error('Seed işlemi sırasında hata oluştu:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed(); 