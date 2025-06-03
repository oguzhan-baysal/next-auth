# 🎬 Demo Setup Guide

Bu dosya demo sunumları ve test etmek için Auth0'da test kullanıcıları oluşturma rehberidir.

## 🔧 Auth0'da Test Kullanıcıları Oluşturma

### Adım 1: Auth0 Dashboard'a Giriş
1. [Auth0 Dashboard](https://manage.auth0.com) açın
2. Sol menüden **"User Management"** → **"Users"** seçin

### Adım 2: Admin Kullanıcı Oluşturma
1. **"Create User"** butonuna tıklayın
2. Aşağıdaki bilgileri girin:
   - **Email**: `admin@example.com`
   - **Password**: `Admin123!`
   - **Connection**: `Username-Password-Authentication`
3. **"Create"** butonuna tıklayın

### Adım 3: Moderator Kullanıcı Oluşturma
1. **"Create User"** butonuna tıklayın
2. Aşağıdaki bilgileri girin:
   - **Email**: `moderator@example.com`
   - **Password**: `Moderator123!`
   - **Connection**: `Username-Password-Authentication`
3. **"Create"** butonuna tıklayın

### Adım 4: Normal Kullanıcılar Oluşturma
1. **User 1**:
   - **Email**: `user@example.com`
   - **Password**: `User123!`
   - **Connection**: `Username-Password-Authentication`

2. **User 2**:
   - **Email**: `demo@example.com`
   - **Password**: `Demo123!`
   - **Connection**: `Username-Password-Authentication`

## 🧪 Test Senaryoları

### 📋 Test Checklist

#### ✅ Admin Flow Testi
- [ ] `admin@example.com` ile giriş yapıldı
- [ ] Dashboard'da "Admin Panel" butonu görünüyor
- [ ] `/admin` sayfasına erişim sağlandı
- [ ] Kullanıcı Yönetimi sayfası açıldı
- [ ] Sistem İstatistikleri sayfası açıldı
- [ ] Kullanıcı rolü değiştirme işlemi test edildi

#### ✅ Moderator Flow Testi  
- [ ] `moderator@example.com` ile giriş yapıldı
- [ ] Dashboard'da moderator badge görünüyor
- [ ] `/admin` sayfasına erişim engellendi
- [ ] Moderator yetkilerine uygun içerik görünüyor

#### ✅ User Flow Testi
- [ ] `user@example.com` ile giriş yapıldı
- [ ] Dashboard'da sadece kullanıcı yetkilerine uygun içerik
- [ ] `/admin` URL'sine direkt erişim engellendi
- [ ] Otomatik yönlendirme çalışıyor

#### ✅ Middleware Koruması Testi
- [ ] Çıkış yapıldı (logout)
- [ ] `/dashboard` URL'sine direkt erişim denendi
- [ ] `/admin` URL'sine direkt erişim denendi
- [ ] Otomatik login sayfasına yönlendirme çalışıyor

#### ✅ Responsive Test
- [ ] Desktop görünüm test edildi
- [ ] Tablet görünüm test edildi
- [ ] Mobile görünüm test edildi

## 🎯 Demo Sunum Senaryosu

### 1. Proje Tanıtımı (2 dk)
- Ana sayfayı göster (`http://localhost:3000`)
- Teknoloji stack'ini anlatın
- Özellikler listesini vurgula

### 2. Authentication Flow (3 dk)
- "Giriş Yap" butonuna tıkla
- Auth0 login sayfasını göster
- `user@example.com` ile giriş yap
- Dashboard'a yönlendirmeyi göster

### 3. Role-Based Access (4 dk)
- User dashboard'unu göster
- `/admin` URL'sine gitmeye çalış
- Erişim reddini göster
- Çıkış yap ve `admin@example.com` ile giriş yap
- Admin panel'e erişimi göster

### 4. Admin Panel Features (5 dk)
- Admin dashboard'unu göster
- Kullanıcı Yönetimi sayfasını aç
- Kullanıcı rol değiştirme işlemini göster
- Sistem İstatistikleri sayfasını göster
- Filtreleme ve arama özelliklerini test et

### 5. Security & Middleware (2 dk)
- Browser'da direkt URL erişimini dene
- Developer Tools'da network tab'ını aç
- Middleware'in çalışmasını göster

## 🔍 Troubleshooting

### Problem: Kullanıcı oluşturulamıyor
**Çözüm**: Auth0'da "Database" connection'ın aktif olduğundan emin olun

### Problem: Giriş yapılamıyor  
**Çözüm**: 
1. Email/şifre doğruluğunu kontrol edin
2. Auth0 Application Settings'te callback URL'leri kontrol edin
3. `.env.local` dosyasındaki değişkenleri kontrol edin

### Problem: Admin panel'e erişilemiyor
**Çözüm**:
1. `lib/auth.ts` dosyasında email'in admin listesinde olduğunu kontrol edin
2. Browser cache'ini temizleyin
3. Çıkış yapıp tekrar giriş yapın

### Problem: Sayfa yüklenmesinde hata
**Çözüm**:
1. Development server'ı yeniden başlatın: `npm run dev`
2. `npm run build` ile build hatalarını kontrol edin
3. Browser console'da JavaScript hatalarını kontrol edin

## 📊 Demo Performans Metrikleri

- **First Load**: ~2-3 saniye
- **Authentication Time**: ~1-2 saniye  
- **Page Navigation**: <500ms
- **Build Size**: ~105kB (First Load JS)

## 🎥 Kayıt Önerileri

Demo videosunu çekerken:
1. **1080p** çözünürlük kullanın
2. **Chrome DevTools** açık tutun
3. **Network** tab'ında istekleri gösterin
4. **Slow motion** kullanarak adımları net gösterin
5. **Voiceover** ile teknik detayları açıklayın

---

**🚀 Demo hazır! Başarılı sunum için tüm adımları takip edin.** 