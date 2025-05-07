# DevFeedback API Dokümantasyonu

DevFeedback uygulaması için gereken API endpoint'leri ve ortak kullanılacak veri tipleri bu dokümanda tanımlanmıştır.

## Baz URL

```
http://localhost:5000/api/v1
```

## Kimlik Doğrulama

API, JWT (JSON Web Token) tabanlı kimlik doğrulama kullanır. Tüm kimlik doğrulama gerektiren isteklerde `Authorization` başlığında token gönderilmelidir.

```
Authorization: Bearer <token>
```

## Ortak Veri Tipleri

### User (Kullanıcı)

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}
```

### Post (Gönderi)

```typescript
interface Post {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author: User;
  likes: number;
  comments: number;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  tag: string; // Teknoloji etiketi
  color?: string; // Frontend tarafında kullanılan renk (opsiyonel)
}
```

### Comment (Yorum)

```typescript
interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  likes: number;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
}
```

## API Endpoints

### Kimlik Doğrulama

#### Kayıt Ol

- **URL**: `/auth/register`
- **Metod**: `POST`
- **Açıklama**: Yeni kullanıcı kaydı yapar
- **İstek Gövdesi**:
  ```typescript
  {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  ```
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    user: User;
    token: string;
  }
  ```

#### Giriş Yap

- **URL**: `/auth/login`
- **Metod**: `POST`
- **Açıklama**: Kullanıcı girişi sağlar
- **İstek Gövdesi**:
  ```typescript
  {
    email: string;
    password: string;
  }
  ```
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    user: User;
    token: string;
  }
  ```

#### Kullanıcı Bilgisi Al

- **URL**: `/auth/me`
- **Metod**: `GET`
- **Açıklama**: Giriş yapmış kullanıcının bilgilerini döndürür
- **Kimlik Doğrulama**: Gerekli
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    user: User;
  }
  ```

### Gönderiler

#### Tüm Gönderileri Listele

- **URL**: `/posts`
- **Metod**: `GET`
- **Açıklama**: Tüm gönderileri listeler
- **Sorgu Parametreleri**:
  - `tag` (opsiyonel): Belirli bir etiket ile filtreleme
  - `page` (opsiyonel, varsayılan: 1): Sayfa numarası
  - `limit` (opsiyonel, varsayılan: 10): Sayfa başına gönderi sayısı
  - `sort` (opsiyonel, varsayılan: 'newest'): Sıralama ('newest', 'oldest', 'most-liked', 'most-commented')
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    posts: Post[];
    pagination: {
      total: number; // Toplam gönderi sayısı
      pages: number; // Toplam sayfa sayısı
      page: number; // Mevcut sayfa
      limit: number; // Sayfa başına gönderi sayısı
    }
  }
  ```

#### Gönderi Oluştur

- **URL**: `/posts`
- **Metod**: `POST`
- **Açıklama**: Yeni bir gönderi oluşturur
- **Kimlik Doğrulama**: Gerekli
- **İstek Gövdesi**:
  ```typescript
  {
    title: string;
    description: string;
    tag: string;
  }
  ```
- **Başarılı Yanıt (201)**:
  ```typescript
  {
    success: true;
    post: Post;
  }
  ```

#### Gönderi Detayı

- **URL**: `/posts/:id`
- **Metod**: `GET`
- **Açıklama**: Belirli bir gönderinin detaylarını döndürür
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    post: Post;
    comments: Comment[];
  }
  ```

#### Gönderiyi Güncelle

- **URL**: `/posts/:id`
- **Metod**: `PUT`
- **Açıklama**: Var olan bir gönderiyi günceller
- **Kimlik Doğrulama**: Gerekli (sadece gönderi sahibi veya admin)
- **İstek Gövdesi**:
  ```typescript
  {
    title?: string;
    description?: string;
    tag?: string;
  }
  ```
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    post: Post;
  }
  ```

#### Gönderiyi Sil

- **URL**: `/posts/:id`
- **Metod**: `DELETE`
- **Açıklama**: Belirli bir gönderiyi siler
- **Kimlik Doğrulama**: Gerekli (sadece gönderi sahibi veya admin)
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    message: "Post deleted successfully";
  }
  ```

#### Gönderiyi Beğen

- **URL**: `/posts/:id/like`
- **Metod**: `POST`
- **Açıklama**: Belirli bir gönderiyi beğenir veya beğeniyi kaldırır (toggle)
- **Kimlik Doğrulama**: Gerekli
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    liked: boolean; // true: beğenildi, false: beğeni kaldırıldı
    likes: number; // toplam beğeni sayısı
  }
  ```

### Yorumlar

#### Gönderi Yorumlarını Listele

- **URL**: `/posts/:id/comments`
- **Metod**: `GET`
- **Açıklama**: Belirli bir gönderiye ait yorumları listeler
- **Sorgu Parametreleri**:
  - `page` (opsiyonel, varsayılan: 1): Sayfa numarası
  - `limit` (opsiyonel, varsayılan: 20): Sayfa başına yorum sayısı
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    comments: Comment[];
    pagination: {
      total: number;
      pages: number;
      page: number;
      limit: number;
    }
  }
  ```

#### Yorum Ekle

- **URL**: `/posts/:id/comments`
- **Metod**: `POST`
- **Açıklama**: Belirli bir gönderiye yorum ekler
- **Kimlik Doğrulama**: Gerekli
- **İstek Gövdesi**:
  ```typescript
  {
    content: string;
  }
  ```
- **Başarılı Yanıt (201)**:
  ```typescript
  {
    success: true;
    comment: Comment;
  }
  ```

#### Yorum Güncelle

- **URL**: `/comments/:id`
- **Metod**: `PUT`
- **Açıklama**: Var olan bir yorumu günceller
- **Kimlik Doğrulama**: Gerekli (sadece yorum sahibi veya admin)
- **İstek Gövdesi**:
  ```typescript
  {
    content: string;
  }
  ```
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    comment: Comment;
  }
  ```

#### Yorum Sil

- **URL**: `/comments/:id`
- **Metod**: `DELETE`
- **Açıklama**: Belirli bir yorumu siler
- **Kimlik Doğrulama**: Gerekli (sadece yorum sahibi veya admin)
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    message: "Comment deleted successfully";
  }
  ```

### Kategoriler/Etiketler

#### Kategorileri Listele

- **URL**: `/categories`
- **Metod**: `GET`
- **Açıklama**: Tüm kategorileri listeler
- **Başarılı Yanıt (200)**:
  ```typescript
  {
    success: true;
    categories: string[]; // Örn: ["React", "Node.js", "TypeScript", ...]
  }
  ```

## Hata İşleme

Tüm API hatalarında aşağıdaki formatta yanıt döner:

```typescript
{
  success: false;
  error: {
    message: string;
    code?: string; // Opsiyonel hata kodu
    details?: any; // Opsiyonel detay bilgileri
  }
}
```

## Durum Kodları

- `200 OK`: İstek başarılı
- `201 Created`: Yeni kaynak oluşturuldu
- `400 Bad Request`: İstek formatı hatalı
- `401 Unauthorized`: Kimlik doğrulama hatası
- `403 Forbidden`: Yetkisiz erişim
- `404 Not Found`: Kaynak bulunamadı
- `500 Internal Server Error`: Sunucu hatası 