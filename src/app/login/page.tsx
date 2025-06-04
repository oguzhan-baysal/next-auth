import { auth, signIn } from "../../../lib/auth"
import Link from "next/link"

export default async function LoginPage() {
  const session = await auth()

  const handleSignIn = async () => {
    "use server"
    await signIn("auth0", { redirectTo: "/dashboard" })
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Zaten Giriş Yaptınız
          </h2>
          <p className="text-gray-600 mb-6">
            Hoş geldin, {session.user?.name || session.user?.email}
          </p>
          <Link
            href="/dashboard"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 inline-block"
          >
            Dashboard&apos;a Git
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Login Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Giriş Yap
              </h2>
              <p className="mt-2 text-gray-600">
                Auth0 ile güvenli kimlik doğrulama
              </p>
            </div>

            <form action={handleSignIn}>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                <span className="mr-2">🔐</span>
                Auth0 ile Giriş Yap
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Modern web uygulamaları için güvenli, ölçeklenebilir ve kullanıcı dostu
                kimlik doğrulama sistemi. Auth0&apos;ın OAuth servisleri ile Next.js&apos;in güçlü
                middleware yapısını birleştiren demo uygulaması.
              </p>
            </div>
          </div>

          {/* Demo Test Users */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                🧪 Demo Test Kullanıcıları
              </h3>
              <p className="mt-2 text-gray-600">
                Farklı rolleri test etmek için bu hesapları kullanın
              </p>
            </div>

            <div className="space-y-4">
              {/* Admin User */}
              <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    🔴 Admin
                  </span>
                  <span className="text-xs text-gray-500">Tam Yetki</span>
                </div>
                <div className="text-sm font-mono text-gray-900">
                  <div><strong>Email:</strong> admin@example.com</div>
                  <div><strong>Şifre:</strong> Admin123!</div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  ✅ Admin Panel • ✅ Kullanıcı Yönetimi • ✅ Sistem İstatistikleri
                </div>
              </div>

              {/* Moderator User */}
              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    🟡 Moderator
                  </span>
                  <span className="text-xs text-gray-500">Sınırlı Yetki</span>
                </div>
                <div className="text-sm font-mono text-gray-900">
                  <div><strong>Email:</strong> moderator@example.com</div>
                  <div><strong>Şifre:</strong> Moderator123!</div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  ✅ Dashboard • ❌ Admin Panel • ✅ İçerik Denetimi
                </div>
              </div>

              {/* Regular Users */}
              <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    🟢 Kullanıcı
                  </span>
                  <span className="text-xs text-gray-500">Standart Yetki</span>
                </div>
                <div className="text-sm font-mono space-y-1 text-gray-900">
                  <div><strong>Email:</strong> user@example.com • <strong>Şifre:</strong> User123!</div>
                  <div><strong>Email:</strong> demo@example.com • <strong>Şifre:</strong> Demo123!</div>
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  ✅ Dashboard • ❌ Admin Panel • ✅ Temel Özellikler
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                🎯 Test Edilecek Özellikler:
              </h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• <strong>Rol Bazlı Erişim:</strong> Admin panel sadece admin&apos;ler için</li>
                <li>• <strong>Middleware Koruması:</strong> URL&apos;lere direkt erişim engeli</li>
                <li>• <strong>Dinamik UI:</strong> Role göre değişen arayüz</li>
                <li>• <strong>Kullanıcı Yönetimi:</strong> Admin&apos;ler kullanıcı rollerini değiştirebilir</li>
                <li>• <strong>Sistem İstatistikleri:</strong> Gerçek zamanlı dashboard</li>
              </ul>
            </div>

            {/* Warning */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-blue-400 text-sm">💡</span>
                </div>
                <div className="ml-2">
                  <p className="text-xs text-blue-700">
                    Bu kullanıcılar demo amaçlı oluşturulmuştur. Gerçek uygulamada 
                    rol yetkileri veritabanından yönetilmelidir.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
} 