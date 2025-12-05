import { useState } from 'react'
import { Menu, Settings, Bell, ExternalLink, Search, Calendar, Globe } from 'lucide-react'
import ModularActionCards from './ModularActionCards'
import OnlineClassCard from './OnlineClassCard'
import ProfileCard from './ProfileCard'
import OnlineClasses from './OnlineClasses'
import TopicsPage from './Topics'
import PenaltiesPage from './Penalties'

export default function Dashboard({ onMenuClick, currentPage, setCurrentPage }) {
  const [language, setLanguage] = useState('az')

  if (currentPage === 'classes') {
    return <OnlineClasses onBack={() => setCurrentPage('dashboard')} />
  }

  if (currentPage === 'topics') {
    return <TopicsPage onBack={() => setCurrentPage('dashboard')} />
  }

  if (currentPage === 'penalties') {
    return <PenaltiesPage onBack={() => setCurrentPage('dashboard')} />
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

            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/60 mb-8 max-w-2xl">
              <div className="grid grid-cols-3 gap-8 mb-5">
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Tamamlanmış</p>
                  <p className="text-4xl font-bold text-gray-900">4</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Tamamlanmamış</p>
                  <p className="text-4xl font-bold text-gray-900">20</p>
                </div>
                <div className="text-center">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Ümumi</p>
                  <p className="text-4xl font-bold text-gray-900">24</p>
                </div>
              </div>
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute h-full bg-[#007A3A] rounded-full transition-all duration-500" style={{width: '16.7%'}}></div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-medium text-gray-600">16.7% tamamlandı</span>
                <span className="text-xs font-medium text-gray-400">83.3% qalır</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 -mt-48 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 mt-48">
                <ModularActionCards setCurrentPage={setCurrentPage} />

                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900">Simulyator Nəticələri</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">03.12.2025 19:15</p>
                          <p className="text-xs text-gray-500">30% (3/10)</p>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#007A3A] h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-200">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h3 className="text-base font-semibold text-gray-900">Mövzular Üzrə Nəticələr</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">3.1. Yol nişanları</p>
                          <p className="text-xs text-gray-500">0% (0/10)</p>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-[#007A3A] h-2 rounded-full" style={{ width: '0%' }}></div>
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
