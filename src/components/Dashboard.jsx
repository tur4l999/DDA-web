import { useState } from 'react'
import { Menu, Settings, Bell, ExternalLink, Search, Calendar, Globe } from 'lucide-react'
import ModularActionCards from './ModularActionCards'
import OnlineClassCard from './OnlineClassCard'
import ProfileCard from './ProfileCard'
import OnlineClasses from './OnlineClasses'

export default function Dashboard({ onMenuClick, currentPage, setCurrentPage }) {
  const [language, setLanguage] = useState('az')

  if (currentPage === 'classes') {
    return <OnlineClasses onBack={() => setCurrentPage('dashboard')} />
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="hidden lg:block text-sm text-gray-900 font-semibold">Test Academy</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-2 space-x-2">
              <Globe className="w-4 h-4 text-gray-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm text-gray-700 font-medium focus:outline-none"
              >
                <option value="az">Azərbaycan</option>
                <option value="ru">Русский</option>
              </select>
            </div>
            <button className="text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="gradient-bg relative px-4 lg:px-8 pt-8 pb-12 -mx-4 lg:-mx-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Salam, Tural Qarayev!
              </h1>
              <p className="text-green-50 text-sm lg:text-base">
                Sürücülük kursuna xoş gəlmisiniz
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-white/50 mb-6 max-w-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">✅</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Tamamlanmış</p>
                      <p className="text-xl font-black text-primary-600">4</p>
                    </div>
                  </div>
                  <div className="w-px h-10 bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">📝</span>
                    <div>
                      <p className="text-xs font-semibold text-gray-600">Tamamlanmamış</p>
                      <p className="text-xl font-black text-orange-600">20</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-gray-600">Ümumi</p>
                  <p className="text-xl font-black text-gray-900">24</p>
                </div>
              </div>
              <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500" style={{width: '16.7%'}}></div>
                <div className="absolute h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500" style={{width: '83.3%', left: '16.7%'}}></div>
              </div>
              <div className="flex items-center justify-between mt-1.5 text-xs font-semibold">
                <span className="text-primary-600">16.7%</span>
                <span className="text-orange-600">83.3%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 -mt-48 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 mt-48">
                <ModularActionCards setCurrentPage={setCurrentPage} />

                <div className="mt-8 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>🎮</span>
                      <span>Simulyator Nəticələri</span>
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 hover:shadow-md transition-all">
                        <div>
                          <p className="text-sm font-bold text-gray-900">03.12.2025 19:15</p>
                          <p className="text-xs text-gray-600 font-semibold">30% (3/10)</p>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-3 shadow-inner">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full shadow-sm" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>📚</span>
                      <span>Mövzular Üzrə Nəticələr</span>
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 hover:shadow-md transition-all">
                        <div>
                          <p className="text-sm font-bold text-gray-900">3.1. Yol nişanları</p>
                          <p className="text-xs text-gray-600 font-semibold">0% (0/10)</p>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-3 shadow-inner">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full shadow-sm" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ProfileCard />
                <OnlineClassCard maxItems={10} showViewAll={true} setCurrentPage={setCurrentPage} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
