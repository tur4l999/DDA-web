import { useState } from 'react'
import { Menu, Settings, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar } from 'lucide-react'
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

      <main className="flex-1 overflow-y-auto bg-gray-50">
        {/* Hero Section */}
        <div className="gradient-bg relative px-4 lg:px-8 pt-8 pb-32 -mx-4 lg:-mx-8 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.08]">
            <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 300C240 200 480 400 720 300C960 200 1200 400 1440 300V600H0V300Z" fill="white"/>
              <circle cx="200" cy="100" r="60" fill="white" opacity="0.3"/>
              <circle cx="1200" cy="150" r="80" fill="white" opacity="0.2"/>
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Greeting + Quick Actions */}
              <div className="lg:col-span-2">
                {/* Greeting */}
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                    Salam, Tural Qarayev!
                  </h1>
                  <p className="text-white/90 text-base lg:text-lg max-w-xl leading-relaxed">
                    Hər gün 10 dəqiqə davam etsən, nəticəni tez görəcəksən. Bu gün bir mövzu tamamla!
                  </p>
                </div>

                {/* Quick Actions - First 4 */}
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <button
                    onClick={() => setCurrentPage('topics')}
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white border border-white/60 hover:border-white rounded-2xl p-5 transition-all duration-200 text-left hover:shadow-xl hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-3">
                      <BookOpen className="w-6 h-6 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Təlim Mövzuları</h3>
                    <p className="text-xs text-gray-600">Bütün kurs mövzuları</p>
                  </button>

                  <button
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white border border-white/60 hover:border-white rounded-2xl p-5 transition-all duration-200 text-left hover:shadow-xl hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-3">
                      <Video className="w-6 h-6 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">3D Video</h3>
                    <p className="text-xs text-gray-600">Praktiki videolar</p>
                  </button>

                  <button
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white border border-white/60 hover:border-white rounded-2xl p-5 transition-all duration-200 text-left hover:shadow-xl hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-3">
                      <HelpCircle className="w-6 h-6 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Suallar</h3>
                    <p className="text-xs text-gray-600">Test sualları</p>
                  </button>

                  <button
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white border border-white/60 hover:border-white rounded-2xl p-5 transition-all duration-200 text-left hover:shadow-xl hover:scale-[1.02]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-3">
                      <FileText className="w-6 h-6 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Video Dərslər</h3>
                    <p className="text-xs text-gray-600">Təlim videoları</p>
                  </button>
                </div>
              </div>

              {/* Right: Profile Card */}
              <div className="lg:block">
                <ProfileCard />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Other Modules */}
              <div className="lg:col-span-2 space-y-6">
                {/* Remaining Action Cards */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Digər modullar</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                      className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-3">
                        <BookMarked className="w-6 h-6 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Maddələr</h3>
                      <p className="text-xs text-gray-500">Qanun maddələri</p>
                    </button>

                    <button
                      onClick={() => setCurrentPage('penalties')}
                      className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-3">
                        <AlertTriangle className="w-6 h-6 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Cərimələr</h3>
                      <p className="text-xs text-gray-500">Cərimə məlumatları</p>
                    </button>

                    <button
                      className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-3">
                        <BarChart3 className="w-6 h-6 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Statistika</h3>
                      <p className="text-xs text-gray-500">Nəticələriniz</p>
                    </button>

                    <button
                      onClick={() => setCurrentPage('classes')}
                      className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-3">
                        <Calendar className="w-6 h-6 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-0.5">Onlayn Dərslər</h3>
                      <p className="text-xs text-gray-500">Canlı dərslər</p>
                    </button>
                  </div>
                </div>

                {/* Progress Mini */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">Tərəqqi</h3>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#007A3A]">4</p>
                      <p className="text-xs text-gray-600">Tamamlanmış</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-400">20</p>
                      <p className="text-xs text-gray-600">Qalır</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">24</p>
                      <p className="text-xs text-gray-600">Ümumi</p>
                    </div>
                  </div>
                  <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute h-full bg-[#007A3A] rounded-full transition-all duration-500" style={{width: '16.7%'}}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">16.7% tamamlandı</p>
                </div>

                {/* Simulator Results */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
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
              </div>

              {/* Right Column: Online Classes */}
              <div>
                <OnlineClassCard maxItems={3} showViewAll={true} setCurrentPage={setCurrentPage} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
