import { Menu, Settings, Bell, ExternalLink } from 'lucide-react'
import StatsCard from './StatsCard'
import ActionCard from './ActionCard'
import ProfileCard from './ProfileCard'
import OnlineClassCard from './OnlineClassCard'

export default function Dashboard({ onMenuClick }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-sm text-gray-500">Test Academy</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Tural Qarayev</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="gradient-bg px-4 lg:px-8 pt-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Salam, Tural Qarayev!
              </h1>
              <p className="text-green-50 text-sm lg:text-base">
                Yenilədirilmiş şəxsi kabinetə xoş gəlmisiniz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
              <StatsCard
                icon="❌"
                label="Səhvlər"
                value="6"
                iconBg="bg-red-500"
              />
              <StatsCard
                icon="✅"
                label="Nailiyyətlər"
                value="0/8"
                iconBg="bg-primary-500"
              />
              <StatsCard
                icon="📊"
                label="Tərəqqi"
                value="30%"
                iconBg="bg-primary-600"
              />
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 -mt-16 pb-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
                  <ActionCard
                    icon="📚"
                    title="Təlim mövzuları"
                    iconColor="text-primary-600"
                  />
                  <ActionCard
                    icon="🎥"
                    title="Video dərslər"
                    iconColor="text-primary-600"
                  />
                  <ActionCard
                    icon="✅"
                    title="İmtahan"
                    iconColor="text-primary-600"
                  />
                  <ActionCard
                    icon="📊"
                    title="Statistika"
                    iconColor="text-primary-600"
                  />
                  <ActionCard
                    icon="🏆"
                    title="Nailiyyətlər"
                    iconColor="text-primary-600"
                  />
                  <ActionCard
                    icon="⚙️"
                    title="Tənzimləmələr"
                    iconColor="text-primary-600"
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Simulyator nəticələri</h3>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
                      <span>İmtahana Başla</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">S/S</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tarix</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nəticə</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">1</td>
                          <td className="py-3 px-4 text-sm text-gray-600">03.12.2025 19:15</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">30%</span>
                                  <span className="text-xs text-gray-500">3/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                              </div>
                              <button className="text-red-500 hover:text-red-700">✕</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Mövzular üzrə imtahan nəticələri</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">S/S</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mövzu</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nəticə</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">1</td>
                          <td className="py-3 px-4 text-sm text-gray-600">3.1. Yol nişanları...</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">0%</span>
                                  <span className="text-xs text-gray-500">0/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                              </div>
                              <button className="text-red-500 hover:text-red-700">✕</button>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">2</td>
                          <td className="py-3 px-4 text-sm text-gray-600">3.1. Yol nişanları...</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">0%</span>
                                  <span className="text-xs text-gray-500">0/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                              </div>
                              <button className="text-red-500 hover:text-red-700">✕</button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                      Bütün Nəticələrə Bax
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ProfileCard />
                <OnlineClassCard
                  date="2025-06-11 20:30:00"
                  status="Tamamlandı"
                />
                <OnlineClassCard
                  date="2025-06-18 20:30:00"
                  status="Tamamlandı"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
