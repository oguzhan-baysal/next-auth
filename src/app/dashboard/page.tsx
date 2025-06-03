import { auth, signOut } from "../../../lib/auth"
import Link from "next/link"

const LogoutButton = () => {
  const handleSignOut = async () => {
    "use server"
    await signOut({ redirectTo: "/" })
  }

  return (
    <form action={handleSignOut}>
      <button
        type="submit"
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Çıkış Yap
      </button>
    </form>
  )
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    return null
  }

  const isAdmin = session.user.role === 'admin'
  const isModerator = session.user.role === 'moderator'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isAdmin ? 'bg-red-100 text-red-800' :
                isModerator ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {isAdmin ? 'Admin' : isModerator ? 'Moderatör' : 'Kullanıcı'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  🔧 Admin Panel
                </Link>
              )}
              <span className="text-sm text-gray-700">
                Hoş geldin, {session.user?.name || session.user?.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {session.user?.image ? (
                    <img
                      className="h-20 w-20 rounded-full"
                      src={session.user.image}
                      alt="Profil fotoğrafı"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">
                        {session.user?.name?.charAt(0) || session.user?.email?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="ml-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Kullanıcı Bilgileri
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Hesap detaylarınız ve oturum bilgileri
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">İsim</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {session.user?.name || "Belirtilmemiş"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">E-posta</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {session.user?.email || "Belirtilmemiş"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Rol</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isAdmin ? 'bg-red-100 text-red-800' :
                        isModerator ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {isAdmin ? 'Admin' : isModerator ? 'Moderatör' : 'Kullanıcı'}
                      </span>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Oturum Durumu</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Aktif
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Role-based Quick Actions */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Aktivite
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Son giriş başarılı
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-white text-sm font-medium">🔒</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Güvenlik
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        Auth0 Korumalı
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin-only card */}
            {isAdmin && (
              <Link href="/admin" className="block">
                <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                          <span className="text-white text-sm font-medium">🔧</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Admin Panel
                          </dt>
                          <dd className="text-lg font-medium text-gray-900">
                            Sistemi Yönet
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Moderator-only card */}
            {isModerator && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">👮</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Moderatör
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          İçerik Denetimi
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular user card */}
            {!isAdmin && !isModerator && (
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white text-sm font-medium">👤</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Kullanıcı
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Standart Erişim
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Role Information */}
          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <span className="text-blue-400 text-lg">ℹ️</span>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    {isAdmin ? 'Admin Yetkileriniz' : isModerator ? 'Moderatör Yetkileriniz' : 'Kullanıcı Bilgisi'}
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    {isAdmin 
                      ? 'Sistem yönetimi, kullanıcı yönetimi ve tüm admin fonksiyonlarına erişiminiz var.'
                      : isModerator 
                      ? 'İçerik denetimi ve sınırlı yönetici fonksiyonlarına erişiminiz var.'
                      : 'Standart kullanıcı hesabınızla temel özelliklere erişebilirsiniz.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 