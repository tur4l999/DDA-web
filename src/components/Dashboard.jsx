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
      {/* Header - Minimal with blur */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden lg:block text-sm text-slate-500 font-medium">Test Academy</span>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Days badge */}
            <div className="hidden sm:flex items-center bg-primary-50 text-primary-700 rounded-xl px-3 py-2">
              <span className="text-sm font-semibold">44 gün</span>
            </div>
            
            {/* Language selector */}
            <div className="hidden sm:flex items-center bg-slate-50 rounded-xl px-3 py-2 gap-2">
              <Globe className="w-4 h-4 text-slate-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm text-slate-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="az">Azərbaycan</option>
                <option value="ru">Русский</option>
              </select>
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white"></span>
            </button>
            
            {/* Settings */}
            <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-surface-50">
        {/* Hero Section - Softer gradient */}
        <div className="gradient-primary relative px-4 lg:px-8 pt-10 pb-6">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none" preserveAspectRatio="none">
              <circle cx="100" cy="50" r="80" fill="white" opacity="0.2"/>
              <circle cx="1340" cy="100" r="120" fill="white" opacity="0.15"/>
              <circle cx="700" cy="150" r="60" fill="white" opacity="0.1"/>
            </svg>
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
              {/* Greeting */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                    Salam, Tural Qarayev!
                  </h1>
                  <p className="text-white/80 text-sm lg:text-base leading-relaxed">
                    Hər gün 10 dəqiqə davam etsən, nəticəni tez görəcəksən.
                  </p>
                </div>

                {/* Quick Action Cards - First Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <ActionCard
                    icon={BookOpen}
                    title="Təlim Mövzuları"
                    onClick={() => setCurrentPage('topics')}
                  />
                  <ActionCard
                    icon={Video}
                    title="3D Video"
                    onClick={() => {}}
                  />
                  <ActionCard
                    icon={HelpCircle}
                    title="Suallar"
                    onClick={() => {}}
                  />
                  <ActionCard
                    icon={FileText}
                    title="Video Dərslər"
                    onClick={() => {}}
                  />
                </div>
              </div>

              {/* Profile Card - Desktop */}
              <div className="hidden lg:block">
                <ProfileCard />
              </div>
            </div>

            {/* Mobile Profile Card */}
            <div className="lg:hidden mt-6">
              <ProfileCard />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
              {/* Left Column */}
              <div className="space-y-8">
                {/* Second Row Action Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <ActionCard
                    icon={BookMarked}
                    title="Maddələr"
                    onClick={() => {}}
                    variant="light"
                  />
                  <ActionCard
                    icon={AlertTriangle}
                    title="Cərimələr"
                    onClick={() => setCurrentPage('penalties')}
                    variant="light"
                  />
                  <ActionCard
                    icon={BarChart3}
                    title="Statistika"
                    onClick={() => {}}
                    variant="light"
                  />
                  <ActionCard
                    icon={Calendar}
                    title="Onlayn Dərslər"
                    onClick={() => setCurrentPage('classes')}
                    variant="light"
                  />
                </div>

                {/* Simulator Results */}
                <div className="card">
                  <div className="px-6 py-4 border-b border-slate-100">
                    <h3 className="text-base font-semibold text-slate-900">Simulyator Nəticələri</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-surface-50 rounded-2xl hover:bg-surface-100 transition-colors cursor-pointer">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">03.12.2025 19:15</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-xs text-slate-500 font-medium">30% (3/10)</p>
                          <div className="w-24 bg-slate-200 rounded-full h-1.5">
                            <div className="bg-primary-500 h-1.5 rounded-full transition-all" style={{ width: '30%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Online Classes */}
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

// Action Card Component
function ActionCard({ icon: Icon, title, onClick, variant = 'default' }) {
  const isLight = variant === 'light'
  
  return (
    <button
      onClick={onClick}
      className={`group text-left p-4 rounded-2xl transition-all duration-200 ${
        isLight
          ? 'bg-white border border-slate-200/80 hover:border-primary-200 hover:shadow-soft-md'
          : 'bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors duration-200 ${
        isLight
          ? 'bg-primary-50 group-hover:bg-primary-100'
          : 'bg-white/20 group-hover:bg-white/30'
      }`}>
        <Icon className={`w-5 h-5 ${isLight ? 'text-primary-600' : 'text-white'}`} strokeWidth={1.75} />
      </div>
      <h3 className={`font-semibold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
        {title}
      </h3>
    </button>
  )
}
