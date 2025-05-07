# DevFeedback Platformu

Matrix temalı, geliştiriciler arası bilgi paylaşımı ve geri bildirim platformu.

## Proje Açıklaması

DevFeedback, geliştiricilerin teknik sorularını paylaşabileceği, deneyimli geliştiricilerden geri bildirim alabileceği ve yazılım geliştirme topluluğuna katkıda bulunabileceği bir platformdur. Retro Matrix temasıyla nostaljik bir kullanıcı deneyimi sunar.

## Teknoloji Yığını

### Frontend
- **Framework**: Next.js 15+
- **Diller**: TypeScript, JavaScript
- **Stil**: Tailwind CSS
- **State Yönetimi**: Zustand
- **Form Validasyonu**: React Hook Form + Zod
- **UI Kütüphanesi**: ShadCN UI

### Backend (Planlanan)
- **Framework**: Node.js (Express/NestJS)
- **Veritabanı**: MongoDB/PostgreSQL
- **Kimlik Doğrulama**: JWT
- **API Dokümantasyonu**: [API.md](API.md)

## Başlangıç

### Frontend Geliştirme

```bash
cd frontend
npm install
npm run dev
```

Frontend uygulaması `http://localhost:3002` adresinde çalışacaktır.

### Backend Geliştirme (Gelecekte)

```bash
cd backend
npm install
npm run dev
```

Backend API `http://localhost:5000` adresinde çalışacaktır.

## Özellikler

- Matrix animasyonlu tema
- Kullanıcı kayıt ve giriş sistemi
- Gönderi oluşturma ve listeleme
- Teknoloji kategorilerine göre filtreleme
- Gönderilere yorum yapabilme
- Beğeni/oylama sistemi

## Proje Yapısı

```
devfeedback/
├── frontend/               # Next.js frontend uygulaması
│   ├── src/
│   │   ├── app/            # App Router sayfaları
│   │   ├── components/     # UI bileşenleri
│   │   └── lib/            # Yardımcı fonksiyonlar ve hooks
│   └── public/             # Statik dosyalar
├── backend/                # Backend API (planlanan)
│   ├── src/                
│   │   ├── controllers/    # API controller'ları
│   │   ├── models/         # Veritabanı modelleri
│   │   ├── routes/         # API route'ları
│   │   └── services/       # İş mantığı servisleri
│   └── tests/              # Backend testleri
└── API.md                  # API dokümantasyonu
```

## Frontend Tasarım Detayları

- **Ana Tema**: Matrix (Yeşil, Siyah)
- **Login/Register Renkleri**: 
  - Login: Turuncu (dönüştürülmüş #ff9900)
  - Register: Mor (#9900FF)
- **Animasyonlar**:
  - Matrix yağmuru
  - Marquee şeritleri
  - Hover efektleri

## Backend Geliştirme Kılavuzu

Backend geliştiricileri için, [API.md](API.md) dosyasında tanımlanan endpoint'lerin implementasyonu beklenmektedir. API, frontend ile aşağıdaki özellikleri desteklemelidir:

1. Kullanıcı kayıt/giriş sistemi (JWT kullanarak)
2. Gönderi CRUD işlemleri
3. Yorum sistemi
4. Beğeni sistemi
5. Kategori/Etiket yönetimi

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. 