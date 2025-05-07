# DevFeedback - Geliştiriciler için Geri Bildirim Platformu

Matrix temalı, modern ve performanslı bir geliştiriciler arası soru-cevap ve geri bildirim platformu.

## Teknolojiler

- **Frontend**: Next.js 15.3.2, React 19, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Form Yönetimi**: React Hook Form, Zod
- **Animasyonlar**: CSS Animations, Framer Motion
- **UI Kütüphanesi**: ShadCN UI

## Başlangıç

Geliştirme sunucusunu başlatmak için:

```bash
npm run dev
```

Bu komut, uygulamayı 3002 portunda ve tüm ağ arayüzlerinde (`0.0.0.0`) başlatır. Aşağıdaki URL'lerden erişilebilir:

- [http://localhost:3002](http://localhost:3002)
- http://[bilgisayarınızın-ip-adresi]:3002

## Mimari Yapı

Proje, modern bir frontend yaklaşımıyla geliştirilmiştir:

- **App Router**: Next.js 13+ app router mimarisi
- **Sunucu Bileşenleri**: Performans için sunucu taraflı render edilmiş bileşenler
- **İstemci Bileşenleri**: Etkileşimli bileşenler için `"use client"` direktifi
- **Hydration Optimization**: Sunucu ve istemci eşleşmesi için optimizasyonlar

## Özellikler

- Matrix temalı kullanıcı arayüzü
- Giriş/kayıt sayfaları
- Ana sayfa soru listesi
- Kategorilere göre filtreleme
- Gönderi detay sayfaları
- Tema kontrolü (Matrix animasyonu durdurma/başlatma)

## Backend İletişimi (Gelecek Entegrasyon)

Backend ile iletişim için aşağıdaki API istekleri planlanmıştır:

- Kullanıcı yönetimi (kayıt, giriş, oturum işlemleri)
- Gönderi listeleme, oluşturma, detay görüntüleme
- Yorum sistemi
- Kategori yönetimi

## Stil ve Tasarım

Uygulama, aşağıdaki temel tasarım prensipleriyle geliştirilmiştir:

- Matrix teması (yeşil, siyah ana renkler)
- Retro terminal görünümü
- Responsive tasarım (mobil, tablet, masaüstü)
- Animasyonlu UI bileşenleri
- Karanlık mod odaklı

## Performans Optimizasyonları

- Matrix animasyonları için GPU hızlandırma
- İntersection Observer ile görünür olmayan bileşenlerin durdurulması
- Sunucu bileşenleri ile daha hızlı ilk yükleme
- `will-change` ve diğer CSS optimizasyonları

## Backend Geliştirme Rehberi

Backend geliştiricileri için API yapısını [API.md](../API.md) dosyasında bulabilirsiniz.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
