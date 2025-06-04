import Link from "next/link"
import { auth } from "../../lib/auth"

export default async function HomePage() {
  const session = await auth()
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Next.js Auth0 Demo
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Dashboard&apos;a Git
                  </Link>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-sm font-medium text-purple-600 hover:text-purple-500"
                    >
                      Admin Panel
                    </Link>
                  )}
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Auth0 ile</span>
            <span className="block text-blue-600">Güvenli Kimlik Doğrulama</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Next.js 14, TypeScript ve Auth0 kullanarak oluşturulan modern yetkilendirme sistemi. 
            JWT tabanlı oturum yönetimi ve middleware ile sayfa koruması.
          </p>

          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Dashboard&apos;a Git
                  </Link>
                  {isAdmin ? (
                    <Link
                      href="/admin"
                      className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                    >
                      🔧 Admin Panel
                    </Link>
                  ) : (
                    <div className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                      Hoş geldin, {session.user?.name || session.user?.email}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
                  >
                    Giriş Yap
                  </Link>
                  <div className="flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                    Demo Uygulaması
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
                🔐
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                Auth0 Entegrasyonu
              </h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                OAuth 2.0 standartlarında güvenli kimlik doğrulama
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                🛡️
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                Middleware Koruması
              </h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Next.js middleware ile otomatik sayfa koruması
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white mx-auto">
                ⚡
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 text-center">
                Rol Bazlı Yetkilendirme
              </h3>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Admin, moderatör ve kullanıcı rolleri ile erişim kontrolü
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Kullanılan Teknolojiler
          </h2>
          <div className="flex justify-center items-center space-x-8 flex-wrap">
            <div className="bg-white rounded-lg shadow-sm p-4 m-2">
              <span className="text-lg font-medium text-gray-900">Next.js 15</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 m-2">
              <span className="text-lg font-medium text-gray-900">TypeScript</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 m-2">
              <span className="text-lg font-medium text-gray-900">Auth0</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 m-2">
              <span className="text-lg font-medium text-gray-900">NextAuth.js</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-4 m-2">
              <span className="text-lg font-medium text-gray-900">TailwindCSS</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
