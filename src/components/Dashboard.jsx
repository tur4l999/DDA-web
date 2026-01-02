import { useState } from 'react'
import { Menu, Settings, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar, ChevronRight, Monitor } from 'lucide-react'
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
      className="group flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 w-full h-full border border-gray-100/50"
    >
      <div className={`w-16 h-16 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform duration-300 flex items-center justify-center mb-4`}>
        <Icon className="w-8 h-8" strokeWidth={1.5} />
      </div>
      <span className="font-semibold text-gray-900 text-[15px] tracking-tight">{label}</span>
    </button>
  )

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header - Glassmorphism */}
      <header className="sticky top-0 z-30 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 px-8 py-5">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100/50"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="hidden lg:block text-xl font-bold text-gray-900 tracking-tight">Ana Səhifə</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden sm:flex items-center bg-white rounded-2xl px-5 py-2.5 shadow-sm border border-gray-100">
              <span className="text-sm text-gray-500 font-medium mr-2">Qalan vaxt:</span>
              <span className="text-gray-900 font-bold text-sm">44 gün</span>
            </div>
            
            <div className="hidden sm:flex items-center bg-white rounded-2xl px-4 py-2.5 gap-2 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm text-gray-700 font-medium focus:outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="az">AZ</option>
                <option value="ru">RU</option>
              </select>
            </div>

            <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

            <button className="p-2.5 text-gray-500 hover:text-primary-600 hover:bg-white rounded-2xl transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2.5 text-gray-500 hover:text-gray-900 hover:bg-white rounded-2xl transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-10 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto space-y-10 pb-12">
          
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

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8 lg:gap-10">
            {/* Left Content Column */}
            <div className="space-y-10">
              
              {/* Main Action Grid */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Tədris materialları</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
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
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Faydalı alətlər</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
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
              <section className="bg-white rounded-[32px] shadow-sm border border-gray-100/50 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">Son nəticələr</h3>
                  <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1.5 px-3 py-1.5 hover:bg-primary-50 rounded-xl transition-all">
                    Hamısına bax <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Result Item */}
                  <div className="flex items-center justify-between p-5 bg-gray-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Monitor className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">Simulyator İmtahanı</h4>
                        <p className="text-sm text-gray-500 font-medium mt-1">03.12.2025 • 19:15</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-gray-900 mb-2">30%</span>
                      <div className="w-32 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.4)]" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar Column */}
            <div className="space-y-8">
               <div className="sticky top-32 space-y-8">
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
