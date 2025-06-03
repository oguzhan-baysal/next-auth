import { auth } from "../../../lib/auth"
import Link from "next/link"

export default async function AdminPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Erişim Reddedildi</h1>
          <p className="mt-2 text-red-500">Bu sayfaya erişim yetkiniz bulunmamaktadır.</p>
          <Link href="/dashboard" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Dashboard&apos;a Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                ← Dashboard&apos;a Dön
              </Link>
              <span className="text-sm text-gray-700">
                {session.user?.name || session.user?.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Yönetim Paneli</h2>
          <p className="text-gray-600">
            Sistem yönetimi ve kullanıcı kontrolü için admin araçları
          </p>
        </div>

        {/* Admin Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Kullanıcı Yönetimi */}
          <Link href="/admin/users" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xl font-medium">👥</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Kullanıcı Yönetimi
                  </h3>
                  <p className="text-sm text-gray-500">
                    Kullanıcıları listele ve rollerini yönet
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Sistem İstatistikleri */}
          <Link href="/admin/statistics" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xl font-medium">📊</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Sistem İstatistikleri
                  </h3>
                  <p className="text-sm text-gray-500">
                    Kullanım istatistikleri ve raporlar
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Güvenlik Ayarları */}
          <div className="bg-white rounded-lg shadow-md p-6 opacity-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xl font-medium">🔒</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Güvenlik Ayarları
                </h3>
                <p className="text-sm text-gray-500">
                  Sistem güvenliği ve Auth0 ayarları
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                  Yakında
                </span>
              </div>
            </div>
          </div>

          {/* Sistem Logları */}
          <div className="bg-white rounded-lg shadow-md p-6 opacity-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xl font-medium">📝</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Sistem Logları
                </h3>
                <p className="text-sm text-gray-500">
                  Uygulama logları ve hata takibi
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                  Yakında
                </span>
              </div>
            </div>
          </div>

          {/* Ayarlar */}
          <div className="bg-white rounded-lg shadow-md p-6 opacity-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xl font-medium">⚙️</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Sistem Ayarları
                </h3>
                <p className="text-sm text-gray-500">
                  Genel uygulama konfigürasyonu
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                  Yakında
                </span>
              </div>
            </div>
          </div>

          {/* Backup & Export */}
          <div className="bg-white rounded-lg shadow-md p-6 opacity-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-indigo-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-xl font-medium">💾</span>
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Yedekleme & Export
                </h3>
                <p className="text-sm text-gray-500">
                  Veri yedekleme ve dışa aktarma
                </p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                  Yakında
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hızlı İstatistikler</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-gray-500">Aktif Admin</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-gray-500">Toplam Kullanıcı</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-gray-500">Aktif Oturum</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-2xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-gray-500">Sistem Uptime</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 