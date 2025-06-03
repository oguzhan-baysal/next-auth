# 🔐 Next.js Auth0 Yetkilendirme Sistemi

Modern web uygulamaları için güvenli, ölçeklenebir ve kullanıcı dostu bir kimlik doğrulama sistemi. Auth0'ın OAuth servisleri ile Next.js'in güçlü middleware yapısını birleştiren demo uygulaması.

## 🎯 Özellikler

- ✅ **Auth0 OAuth Entegrasyonu**: Endüstri standardı kimlik doğrulama
- ✅ **JWT Token Yönetimi**: Güvenli oturum kontrolü
- ✅ **Middleware Sayfa Koruması**: Otomatik yetkilendirme kontrolü
- ✅ **Responsive Tasarım**: Tüm cihazlarda uyumlu kullanıcı arayüzü
- ✅ **TypeScript**: Tam tip güvenliği
- ✅ **Modern UI**: TailwindCSS ile stillendirilmiş arayüz
- ✅ **Rol bazlı yetkilendirme** (Admin/Moderator/User)
- ✅ **Admin Panel** - Kullanıcı yönetimi
- ✅ **Sistem İstatistikleri** dashboard'u

## 🛠️ Teknoloji Stack'i

| Teknoloji | Versiyon | Amaç |
|-----------|----------|------|
| Next.js | 15.x | Ana framework (App Router) |
| NextAuth.js | v5 | Auth0 entegrasyonu |
| TypeScript | 5.x | Tip güvenliği |
| TailwindCSS | 4.x | UI styling |
| Auth0 | Latest | OAuth provider |

## 🚀 Hızlı Başlangıç

### 1. Projeyi Klonlayın

\`\`\`bash
git clone <repository-url>
cd next-auth
\`\`\`

### 2. Bağımlılıkları Yükleyin

\`\`\`bash
npm install
\`\`\`

### 3. Environment Değişkenlerini Ayarlayın

\`.env.local\` dosyası oluşturun:

\`\`\`env
# Auth0 Configuration
AUTH0_SECRET='your-auth0-secret-here'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://your-auth0-domain.auth0.com'
AUTH0_CLIENT_ID='your-auth0-client-id'
AUTH0_CLIENT_SECRET='your-auth0-client-secret'

# NextAuth Configuration
NEXTAUTH_SECRET='your-nextauth-secret-here'
NEXTAUTH_URL='http://localhost:3000'
\`\`\`

### 4. Auth0 Hesabı Kurulumu

1. [Auth0 Dashboard](https://auth0.com)'a gidin
2. Yeni bir Application oluşturun (Single Page Application)
3. Callback URLs: \`http://localhost:3000/api/auth/callback/auth0\`
4. Logout URLs: \`http://localhost:3000\`
5. Web Origins: \`http://localhost:3000\`

### 5. Geliştirme Sunucusunu Başlatın

\`\`\`bash
npm run dev
\`\`\`

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📁 Proje Yapısı

\`\`\`
next-auth/
├── lib/
│   ├── auth.ts              # NextAuth.js konfigürasyonu
│   └── utils.ts             # Utility fonksiyonları
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/
│   │   │   └── route.ts     # Auth API routes
│   │   ├── dashboard/
│   │   │   └── page.tsx     # Korumalı dashboard sayfası
│   │   ├── login/
│   │   │   └── page.tsx     # Login sayfası
│   │   ├── layout.tsx       # Ana layout
│   │   ├── page.tsx         # Ana sayfa
│   │   └── globals.css      # Global stiller
│   └── middleware.ts        # Route koruması
├── types/
│   └── next-auth.d.ts       # TypeScript tip tanımları
├── .env.example             # Environment örnek dosyası
└── README.md
\`\`\`

## 🔒 Güvenlik Özellikleri

### Kimlik Doğrulama
- **OAuth 2.0**: Endüstri standardı authentication
- **JWT Tokens**: Secure token-based sessions
- **HTTPS**: Tüm iletişimde SSL/TLS
- **CSRF Protection**: Cross-site request forgery koruması

### Middleware Koruması
- Otomatik route koruma
- Token validation
- Redirect logic
- Error handling

## 🎨 Kullanıcı Arayüzü

### Login Sayfası
- Modern, minimalist tasarım
- Auth0 OAuth butonları
- Loading states
- Error handling
- Mobile-first responsive

### Dashboard
- Kullanıcı profil bilgileri
- Oturum durumu
- Çıkış butonu
- Responsive layout

## 📊 Sayfa Akışları

### Kimlik Doğrulama Akışı
1. Kullanıcı `/login` sayfasına erişir
2. Auth0 OAuth flow başlatılır
3. Callback işlemi gerçekleşir
4. JWT token oluşturulur
5. Dashboard'a yönlendirilir

### Middleware Koruması
- Her sayfa isteğinde token doğrulanır
- Yetkilendirilmemiş kullanıcılar `/login`'e yönlendirilir
- Oturum açan kullanıcılar `/dashboard`'a erişebilir

## 🧪 Test Etme

### Manuel Test Senaryoları
- [ ] Başarılı giriş akışı
- [ ] Başarısız giriş denemeleri
- [ ] Token expiration handling
- [ ] Middleware route protection
- [ ] Responsive design testing

## 🔧 Geliştirme Komutları

\`\`\`bash
# Geliştirme sunucusu
npm run dev

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint
\`\`\`

## 📈 Performance

- **İlk Yükleme Süresi**: < 2 saniye
- **Sayfa Geçiş Süresi**: < 500ms
- **Bundle Optimization**: Tree shaking ve code splitting
- **SEO**: Next.js SSR/SSG avantajları

## 🚀 Deployment

### Vercel (Önerilen)
1. GitHub'a push yapın
2. Vercel'e bağlayın
3. Environment variables ekleyin
4. Deploy edin

### Diğer Platformlar
- Netlify
- AWS Amplify
- Custom server

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (\`git checkout -b feature/amazing-feature\`)
3. Commit yapın (\`git commit -m 'Add amazing feature'\`)
4. Push yapın (\`git push origin feature/amazing-feature\`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🆘 Destek

- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [NextAuth.js Dokümantasyonu](https://next-auth.js.org)
- [Auth0 Dokümantasyonu](https://auth0.com/docs)
- [TailwindCSS Dokümantasyonu](https://tailwindcss.com/docs)

## 📋 TODO

- [ ] Rol bazlı yetkilendirme (admin/user)
- [ ] Unit test coverage
- [ ] Docker konfigürasyonu
- [ ] Advanced error handling
- [ ] Analytics integration

---

**Geliştiren**: Frontend Development Team  
**Versiyon**: v1.0.0  
**Son Güncelleme**: 03 Haziran 2025

## 🧪 Demo Test Kullanıcıları

Projeyi test etmek için aşağıdaki hesaplarını kullanabilirsiniz:

### 🔴 Admin Kullanıcı
- **Email**: `admin@example.com`
- **Şifre**: `Admin123!`
- **Yetkiler**: Tam admin paneli erişimi, kullanıcı yönetimi, sistem istatistikleri

### 🟡 Moderator Kullanıcı  
- **Email**: `moderator@example.com`
- **Şifre**: `Moderator123!`
- **Yetkiler**: Sınırlı yönetici fonksiyonları

### 🟢 Normal Kullanıcı
- **Email**: `user@example.com`  
- **Şifre**: `User123!`
- **Yetkiler**: Standart kullanıcı dashboard'u

### 🟢 Normal Kullanıcı 2
- **Email**: `demo@example.com`
- **Şifre**: `Demo123!`
- **Yetkiler**: Standart kullanıcı dashboard'u

## 🎬 Demo Senaryoları

### 1. Admin Flow Testi
1. `admin@example.com` ile giriş yapın
2. Dashboard'da **Admin Panel** butonunu görün
3. `/admin` sayfasına erişin
4. **Kullanıcı Yönetimi** ve **Sistem İstatistikleri** sayfalarını test edin
5. Kullanıcı rollerini değiştirmeyi deneyin

### 2. Rol Bazlı Erişim Testi
1. `user@example.com` ile giriş yapın
2. `/admin` URL'sine direkt gitmeye çalışın
3. Otomatik yönlendirme ve erişim reddini görün
4. Dashboard'da sadece kullanıcı yetkilerini görün

### 3. Middleware Koruması Testi
1. Çıkış yapın (logout)
2. `/dashboard` veya `/admin` URL'lerine direkt gitmeye çalışın
3. Otomatik login sayfasına yönlendirmeyi görün

## 🛠️ Kurulum

```bash
# Repository'yi klonlayın
git clone <repository-url>
cd next-auth

# Bağımlılıkları yükleyin
npm install

# Environment dosyasını oluşturun
cp .env.example .env.local

# Development server'ı başlatın
npm run dev
```

## 🔐 Auth0 Konfigürasyonu

### Environment Variables (.env.local)
```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
AUTH0_ISSUER_BASE_URL=https://your-domain.auth0.com
```

### Auth0 Application Settings
- **Application Type**: Single Page Application
- **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback/auth0`
- **Allowed Logout URLs**: `http://localhost:3000`
- **Allowed Web Origins**: `http://localhost:3000`

## 🎨 Teknoloji Stack'i

- **Framework**: Next.js 15
- **Authentication**: NextAuth.js + Auth0  
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Deployment**: Vercel Ready

## 🔧 Geliştirme Notları

### Rol Sistemi
Roller `lib/auth.ts` dosyasında email bazlı olarak tanımlanmıştır:

```typescript
const ADMIN_EMAILS = ["admin@example.com"]
const MODERATOR_EMAILS = ["moderator@example.com"]
// Diğer tüm emailler otomatik "user" rolü alır
```

### Middleware Koruması
`src/middleware.ts` dosyası tüm korumalı route'ları yönetir:
- `/dashboard/*` - Giriş yapmış kullanıcılar
- `/admin/*` - Sadece admin rolü

## 📈 Özellik Roadmap

- [ ] Database entegrasyonu (kullanıcı rolleri için)
- [ ] Email doğrulama sistemi
- [ ] İki faktörlü kimlik doğrulama (2FA)
- [ ] Audit log sistemi
- [ ] Bulk kullanıcı işlemleri
- [ ] API endpoint'leri
- [ ] Unit & Integration testleri

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit yapın (`git commit -am 'Yeni özellik eklendi'`)
4. Branch'i push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

---

**🎯 Demo URL**: [localhost:3000](http://localhost:3000)  
**👨‍💻 Geliştirici**: [Your Name]  
**🏢 Şirket**: [Your Company]
