import { useState } from 'react'
import { Menu, Settings, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar } from 'lucide-react'
import OnlineClassCard from './OnlineClassCard'
import ProfileCard from './ProfileCard'
import OnlineClasses from './OnlineClasses'
import TopicsPage from './Topics'
import PenaltiesPage from './PenaltiesPage'
import RoadSigns from './RoadSigns'

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

  if (currentPage === 'road-signs') {
    return <RoadSigns />
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Modern sticky header with glassmorphism */}
      <header className="glass-effect border-b border-neutral-200/60 px-4 lg:px-8 py-3.5 sticky top-0 z-10 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-neutral-600 hover:text-neutral-900 p-2 rounded-xl hover:bg-neutral-100 transition-smooth"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="hidden lg:block text-sm text-neutral-900 font-semibold">Test Academy</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center bg-neutral-100 rounded-2xl px-4 py-2">
              <span className="text-sm text-neutral-700 font-medium">44 gün</span>
            </div>
            <div className="hidden sm:flex items-center bg-neutral-100 rounded-2xl px-3 py-2 space-x-2">
              <Globe className="w-4 h-4 text-neutral-600" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm text-neutral-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="az">Azərbaycan</option>
                <option value="ru">Русский</option>
              </select>
            </div>
            <button className="text-neutral-600 hover:text-neutral-900 relative p-2 rounded-xl hover:bg-neutral-100 transition-smooth">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
            </button>
            <button className="text-neutral-600 hover:text-neutral-900 p-2 rounded-xl hover:bg-neutral-100 transition-smooth">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-neutral-50">
        {/* Modern Hero Section */}
        <div className="gradient-bg relative px-4 lg:px-8 pt-10 pb-3 -mx-4 lg:-mx-8 overflow-visible min-h-[260px] lg:min-h-[220px]">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-[0.08]">
            <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0 400C240 300 480 500 720 400C960 300 1200 500 1440 400V600H0V400Z" fill="white"/>
              <circle cx="200" cy="100" r="60" fill="white" opacity="0.15"/>
              <circle cx="1200" cy="150" r="80" fill="white" opacity="0.1"/>
            </svg>
          </div>

          <div className="max-w-[1200px] mx-auto relative z-10 h-full flex flex-col justify-between">
            {/* Top Zone: Greeting + Profile */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
              {/* Modern Greeting */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-semibold text-white mb-2 text-shadow-sm">
                  Salam, Tural Qarayev!
                </h1>
                <p className="text-white/95 text-sm lg:text-base text-shadow-sm">
                  Hər gün 10 dəqiqə davam etsən, nəticəni tez görəcəksən.
                </p>
              </div>

              {/* Profile Card - Absolute positioned for overlap, locked to right column */}
              <div className="hidden lg:block absolute right-0 top-10 w-[400px] z-30">
                <div className="relative -mb-28">
                  <ProfileCard />
                </div>
              </div>
            </div>

            {/* Bottom Zone: 4 Modern Cards */}
            <div className="mt-auto pt-6">
              <div className="lg:max-w-[calc(100%-424px)]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-full">
                  <button
                    onClick={() => setCurrentPage('topics')}
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-lg hover:-translate-y-1 max-w-full overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                      <BookOpen className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm">Təlim Mövzuları</h3>
                  </button>

                  <button
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-lg hover:-translate-y-1 max-w-full overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                      <Video className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm">3D Video</h3>
                  </button>

                  <button
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-lg hover:-translate-y-1 max-w-full overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                      <HelpCircle className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm">Suallar</h3>
                  </button>

                  <button
                    className="group bg-white/95 backdrop-blur-sm hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-lg hover:-translate-y-1 max-w-full overflow-hidden"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                      <FileText className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                    </div>
                    <h3 className="font-semibold text-neutral-900 text-sm">Video Dərslər</h3>
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

        {/* Main Content - Clean Background */}
        <div className="px-4 lg:px-8 pt-4 pb-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6">
              {/* Left Column: Modules + Results - LOCKED BOUNDARY */}
              <div className="space-y-6 max-w-full overflow-hidden">
                {/* Other 4 Modules - Modern Cards */}
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-full">
                    <button
                      className="group bg-white hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-md hover:-translate-y-0.5 max-w-full overflow-hidden shadow-soft"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                        <BookMarked className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                      </div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Maddələr</h3>
                    </button>

                    <button
                      onClick={() => setCurrentPage('penalties')}
                      className="group bg-white hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-md hover:-translate-y-0.5 max-w-full overflow-hidden shadow-soft"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                        <AlertTriangle className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                      </div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Cərimələr</h3>
                    </button>

                    <button
                      className="group bg-white hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-md hover:-translate-y-0.5 max-w-full overflow-hidden shadow-soft"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                        <BarChart3 className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                      </div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Statistika</h3>
                    </button>

                    <button
                      onClick={() => setCurrentPage('classes')}
                      className="group bg-white hover:bg-white rounded-2xl p-4 transition-smooth text-left hover:shadow-soft-md hover:-translate-y-0.5 max-w-full overflow-hidden shadow-soft"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-50 group-hover:bg-primary-500 flex items-center justify-center transition-smooth mb-3">
                        <Calendar className="w-5 h-5 text-primary-600 group-hover:text-white transition-smooth" strokeWidth={2} />
                      </div>
                      <h3 className="font-semibold text-neutral-900 text-sm">Onlayn Dərslər</h3>
                    </button>
                  </div>
                </div>

                {/* Simulator Results - Modern Clean Card */}
                <div className="bg-white rounded-2xl shadow-soft">
                  <div className="px-6 py-5">
                    <h3 className="text-base font-semibold text-neutral-900">Simulyator Nəticələri</h3>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-smooth cursor-pointer">
                        <div>
                          <p className="text-sm font-semibold text-neutral-900">03.12.2025 19:15</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <p className="text-xs text-neutral-500 font-medium">30% (3/10)</p>
                          <div className="w-24 bg-neutral-200 rounded-full h-2 overflow-hidden">
                            <div className="bg-primary-500 h-2 rounded-full transition-smooth" style={{ width: '30%' }}></div>
                          </div>
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
