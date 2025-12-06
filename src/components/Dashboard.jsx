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
        <div className="gradient-bg relative px-4 lg:px-8 pt-8 pb-6 -mx-4 lg:-mx-8 overflow-visible min-h-[280px] lg:min-h-[240px]">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.06]">
            <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 400C240 300 480 500 720 400C960 300 1200 500 1440 400V600H0V400Z" fill="white"/>
              <circle cx="200" cy="100" r="60" fill="white" opacity="0.2"/>
              <circle cx="1200" cy="150" r="80" fill="white" opacity="0.15"/>
            </svg>
          </div>

          <div className="max-w-[1200px] mx-auto relative z-10 h-full flex flex-col justify-between">
            {/* Top Zone: Greeting + Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
              {/* Greeting */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  Salam, Tural Qarayev!
                </h1>
                <p className="text-white/90 text-sm lg:text-base">
                  Hər gün 10 dəqiqə davam etsən, nəticəni tez görəcəksən.
                </p>
              </div>

              {/* Profile Card - Absolute positioned for overlap, locked to right column */}
              <div className="hidden lg:block absolute right-0 top-8 w-[400px] z-30">
                <div className="relative -mb-28">
                  <ProfileCard />
                </div>
              </div>
            </div>

            {/* Bottom Zone: 4 Cards pushed to hero bottom */}
            <div className="mt-auto pt-4">
              <div className="lg:max-w-[calc(100%-424px)]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-full">
                  <button
                    onClick={() => setCurrentPage('topics')}
                    className="group bg-white hover:bg-white border border-gray-200 hover:border-white rounded-xl p-3 transition-all duration-200 text-left hover:shadow-xl hover:-translate-y-0.5 max-w-full overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-2">
                      <BookOpen className="w-4 h-4 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">Təlim Mövzuları</h3>
                  </button>

                  <button
                    className="group bg-white hover:bg-white border border-gray-200 hover:border-white rounded-xl p-3 transition-all duration-200 text-left hover:shadow-xl hover:-translate-y-0.5 max-w-full overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-2">
                      <Video className="w-4 h-4 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">3D Video</h3>
                  </button>

                  <button
                    className="group bg-white hover:bg-white border border-gray-200 hover:border-white rounded-xl p-3 transition-all duration-200 text-left hover:shadow-xl hover:-translate-y-0.5 max-w-full overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-2">
                      <HelpCircle className="w-4 h-4 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">Suallar</h3>
                  </button>

                  <button
                    className="group bg-white hover:bg-white border border-gray-200 hover:border-white rounded-xl p-3 transition-all duration-200 text-left hover:shadow-xl hover:-translate-y-0.5 max-w-full overflow-hidden"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#007A3A]/10 group-hover:bg-[#007A3A] flex items-center justify-center transition-colors duration-200 mb-2">
                      <FileText className="w-4 h-4 text-[#007A3A] group-hover:text-white transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">Video Dərslər</h3>
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Profile Card */}
            <div className="lg:hidden mt-4">
              <ProfileCard />
            </div>
          </div>
        </div>

        {/* Main Content - White Background */}
        <div className="px-4 lg:px-8 pt-6 pb-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
              {/* Left Column: Modules + Results - LOCKED BOUNDARY */}
              <div className="space-y-6 max-w-full overflow-hidden">
                {/* Other 4 Modules - 1 row */}
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-full">
                    <button
                      className="group bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left hover:-translate-y-0.5 max-w-full overflow-hidden"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-2">
                        <BookMarked className="w-4 h-4 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">Maddələr</h3>
                    </button>

                    <button
                      onClick={() => setCurrentPage('penalties')}
                      className="group bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left hover:-translate-y-0.5 max-w-full overflow-hidden"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-2">
                        <AlertTriangle className="w-4 h-4 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">Cərimələr</h3>
                    </button>

                    <button
                      className="group bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left hover:-translate-y-0.5 max-w-full overflow-hidden"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-2">
                        <BarChart3 className="w-4 h-4 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">Statistika</h3>
                    </button>

                    <button
                      onClick={() => setCurrentPage('classes')}
                      className="group bg-white border border-gray-200 rounded-xl p-3 hover:shadow-lg hover:border-[#007A3A] transition-all duration-200 text-left hover:-translate-y-0.5 max-w-full overflow-hidden"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors duration-200 mb-2">
                        <Calendar className="w-4 h-4 text-gray-600 group-hover:text-[#007A3A] transition-colors duration-200" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm">Onlayn Dərslər</h3>
                    </button>
                  </div>
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

              {/* Right Column: Online Classes - LOCKED BOUNDARY, clear space for profile overlap */}
              <div className="lg:pt-32 max-w-full overflow-hidden">
                <OnlineClassCard maxItems={3} showViewAll={true} setCurrentPage={setCurrentPage} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
