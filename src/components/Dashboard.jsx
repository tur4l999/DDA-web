import { useState } from 'react'
import { Menu, Settings, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar, ChevronRight } from 'lucide-react'
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

  const QuickAction = ({ icon: Icon, label, onClick, colorClass = "text-primary-600 bg-primary-50" }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-gray-100 shadow-card hover:shadow-soft hover:-translate-y-1 transition-all duration-300 w-full h-full"
    >
      <div className={`w-14 h-14 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300 flex items-center justify-center mb-4`}>
        <Icon className="w-7 h-7" strokeWidth={2} />
      </div>
      <span className="font-semibold text-gray-900 text-base">{label}</span>
    </button>
  )

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50/50">
      {/* Header - Glassmorphism */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100/50"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="hidden lg:block text-lg font-bold text-gray-900 tracking-tight">Ana Səhifə</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center bg-gray-100/50 rounded-2xl px-4 py-2 border border-gray-200/50">
              <span className="text-sm text-gray-600 font-medium">Qalan vaxt: <span className="text-gray-900 font-bold">44 gün</span></span>
            </div>
            
            <div className="hidden sm:flex items-center bg-gray-100/50 rounded-2xl px-3 py-2 space-x-2 border border-gray-200/50">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm text-gray-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="az">AZ</option>
                <option value="ru">RU</option>
              </select>
            </div>

            <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

            <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto space-y-8 pb-10">
          
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
                Salam, Tural! 👋
              </h1>
              <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                Bu gün yol hərəkəti qaydalarını öyrənmək üçün əla gündür.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8">
            {/* Left Content Column */}
            <div className="space-y-8">
              
              {/* Main Action Grid */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Tədris materialları</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                  <QuickAction 
                    icon={BookOpen} 
                    label="Mövzular" 
                    onClick={() => setCurrentPage('topics')}
                    colorClass="bg-blue-50 text-blue-600"
                  />
                  <QuickAction 
                    icon={Video} 
                    label="3D Videolar" 
                    onClick={() => {}}
                    colorClass="bg-purple-50 text-purple-600"
                  />
                  <QuickAction 
                    icon={HelpCircle} 
                    label="Suallar" 
                    onClick={() => {}}
                    colorClass="bg-amber-50 text-amber-600"
                  />
                  <QuickAction 
                    icon={FileText} 
                    label="Video Dərslər" 
                    onClick={() => {}}
                    colorClass="bg-emerald-50 text-emerald-600"
                  />
                </div>
              </section>

              {/* Secondary Actions */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Faydalı alətlər</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                  <QuickAction 
                    icon={BookMarked} 
                    label="Maddələr" 
                    onClick={() => {}}
                    colorClass="bg-gray-100 text-gray-700"
                  />
                  <QuickAction 
                    icon={AlertTriangle} 
                    label="Cərimələr" 
                    onClick={() => setCurrentPage('penalties')}
                    colorClass="bg-rose-50 text-rose-600"
                  />
                  <QuickAction 
                    icon={BarChart3} 
                    label="Statistika" 
                    onClick={() => {}}
                    colorClass="bg-indigo-50 text-indigo-600"
                  />
                  <QuickAction 
                    icon={Calendar} 
                    label="Onlayn Dərslər" 
                    onClick={() => setCurrentPage('classes')}
                    colorClass="bg-primary-50 text-primary-600"
                  />
                </div>
              </section>

              {/* Recent Activity / Simulator Results */}
              <section className="bg-white rounded-3xl border border-gray-100 shadow-card p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Son nəticələr</h3>
                  <button className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    Hamısına bax <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Result Item */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100/80 transition-colors group cursor-pointer border border-gray-100/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                        <Monitor className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">Simulyator İmtahanı</h4>
                        <p className="text-sm text-gray-500 font-medium mt-0.5">03.12.2025 • 19:15</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="block text-lg font-bold text-gray-900 mb-1">30%</span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar Column */}
            <div className="space-y-8">
               <div className="sticky top-28 space-y-8">
                <ProfileCard />
                <OnlineClassCard maxItems={3} showViewAll={true} setCurrentPage={setCurrentPage} />
               </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
