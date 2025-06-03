import { auth } from "../../../../lib/auth"
import Link from "next/link"

// Mock data - gerçek uygulamada bu API'den gelecek
const systemStats = {
  totalUsers: 5,
  activeUsers: 4,
  adminUsers: 1,
  moderatorUsers: 1,
  regularUsers: 3,
  onlineUsers: 2,
  todayLogins: 8,
  thisWeekLogins: 35,
  systemUptime: "99.9%",
  lastBackup: "2025-06-03T02:00:00Z",
  serverLoad: 23.5,
  memoryUsage: 67.2,
  diskUsage: 45.1
}

const recentActivities = [
  {
    id: 1,
    user: "John Doe",
    action: "Giriş yaptı",
    timestamp: "2025-06-03T10:30:00Z",
    type: "login"
  },
  {
    id: 2,
    user: "Admin User",
    action: "Kullanıcı rolü güncelledi",
    timestamp: "2025-06-03T09:45:00Z",
    type: "admin"
  },
  {
    id: 3,
    user: "Jane Smith",
    action: "Profil güncelledi",
    timestamp: "2025-06-03T09:15:00Z",
    type: "profile"
  },
  {
    id: 4,
    user: "Bob Wilson",
    action: "Çıkış yaptı",
    timestamp: "2025-06-03T08:30:00Z",
    type: "logout"
  }
]

export default async function StatisticsPage() {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'login': return '🔓'
      case 'logout': return '🔒'
      case 'admin': return '🔧'
      case 'profile': return '👤'
      default: return '📋'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'login': return 'text-green-600'
      case 'logout': return 'text-gray-600'
      case 'admin': return 'text-purple-600'
      case 'profile': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/admin"
                className="text-blue-600 hover:text-blue-500"
              >
                ← Admin Panel
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Sistem İstatistikleri</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Overview Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Genel Bakış</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xl">👥</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Toplam Kullanıcı</p>
                  <p className="text-2xl font-semibold text-gray-900">{systemStats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xl">🟢</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Aktif Kullanıcı</p>
                  <p className="text-2xl font-semibold text-gray-900">{systemStats.activeUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Online</p>
                  <p className="text-2xl font-semibold text-gray-900">{systemStats.onlineUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-500 rounded-md flex items-center justify-center">
                    <span className="text-white text-xl">📈</span>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Bugün Giriş</p>
                  <p className="text-2xl font-semibold text-gray-900">{systemStats.todayLogins}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Breakdown */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Kullanıcı Dağılımı</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-600">Admin</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{systemStats.adminUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-600">Moderatör</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{systemStats.moderatorUsers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                    <span className="text-sm text-gray-600">Kullanıcı</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{systemStats.regularUsers}</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Sistem Sağlığı</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sistem Uptime</span>
                  <span className="text-sm font-medium text-green-600">{systemStats.systemUptime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sunucu Yükü</span>
                  <span className="text-sm font-medium text-gray-900">{systemStats.serverLoad}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bellek Kullanımı</span>
                  <span className="text-sm font-medium text-gray-900">{systemStats.memoryUsage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Disk Kullanımı</span>
                  <span className="text-sm font-medium text-gray-900">{systemStats.diskUsage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Son Yedek</span>
                  <span className="text-sm font-medium text-gray-900">{formatDate(systemStats.lastBackup)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Son Aktiviteler</h3>
            </div>
            <div className="overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="text-2xl">{getActivityIcon(activity.type)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.user}
                        </p>
                        <p className={`text-sm ${getActivityColor(activity.type)}`}>
                          {activity.action}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-sm text-gray-500">
                        {formatDate(activity.timestamp)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Login Statistics */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Giriş İstatistikleri</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{systemStats.todayLogins}</div>
                <div className="text-sm text-gray-500 mt-1">Bugün</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{systemStats.thisWeekLogins}</div>
                <div className="text-sm text-gray-500 mt-1">Bu Hafta</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">156</div>
                <div className="text-sm text-gray-500 mt-1">Bu Ay</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 