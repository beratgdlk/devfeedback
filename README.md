# DevFeedback Platformu

Matrix temalı, geliştiriciler arası bilgi paylaşımı ve geri bildirim platformu.

## Proje Açıklaması

DevFeedback, geliştiricilerin teknik sorularını paylaşabileceği, deneyimli geliştiricilerden geri bildirim alabileceği ve yazılım geliştirme topluluğuna katkıda bulunabileceği bir platformdur. Retro Matrix temasıyla nostaljik bir kullanıcı deneyimi sunar.

## Güncel Durum

Platform aktif geliştirme aşamasındadır. Front-end ve back-end bileşenleri paralel olarak geliştirilmektedir. Tüm katkılar açık ve takım üyeleri tarafından değerlendirilmektedir.

## Teknoloji Yığını

### Frontend
- **Framework**: Next.js 15+
- **Diller**: TypeScript, JavaScript
- **Stil**: Tailwind CSS
- **State Yönetimi**: Zustand
- **Form Validasyonu**: React Hook Form + Zod
- **UI Kütüphanesi**: ShadCN UI

### Backend 
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

### Backend Geliştirme

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
├── backend/                # Backend API
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

## Ortak Çalışma Prensipleri

### Git İş Akışı
- **Branch Stratejisi**: Feature branch → Pull Request → Code Review → Merge
- **Branch İsimlendirme**: `feature/özellik-adı`, `bugfix/hata-açıklaması`, `hotfix/acil-düzeltme`
- **Commit Mesajları**: Anlamlı ve açıklayıcı olmalı (örn. "Kullanıcı giriş formu eklendi")

### Kod Standartları
- TypeScript için ESLint ve Prettier yapılandırması takip edilmelidir
- Her yeni özellik için birim testleri yazılmalıdır
- Responsive tasarım prensiplerine uyulmalıdır

### Geliştirme Süreci
1. İş öğeleri GitHub Issues üzerinden takip edilir
2. Kodlama öncesi tasarım ve yaklaşım ekip ile paylaşılır
3. Pull Request'ler en az bir ekip üyesi tarafından incelenir
4. CI/CD pipeline testleri geçilmelidir

## API Entegrasyonu
- Frontend ve backend arasındaki iletişim API.md'de tanımlanan standartlara göre yapılır
- API, REST prensiplerine uygun olarak tasarlanmıştır
- Tüm istekler JWT token ile yetkilendirilir

## Katkıda Bulunma

1. Bu repo'yu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. 