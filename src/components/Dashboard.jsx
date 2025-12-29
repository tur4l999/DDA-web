import { useState } from 'react'
import { Menu, Settings, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar, Search } from 'lucide-react'
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

  const modules = [
    { 
      icon: BookOpen, 
      title: "Təlim Mövzuları", 
      action: () => setCurrentPage('topics'),
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    { 
      icon: Video, 
      title: "3D Video", 
      action: () => {},
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    },
    { 
      icon: HelpCircle, 
      title: "Suallar", 
      action: () => {},
      color: "text-orange-500",
      bg: "bg-orange-50"
    },
    { 
      icon: FileText, 
      title: "Video Dərslər", 
      action: () => {},
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    { 
      icon: BookMarked, 
      title: "Maddələr", 
      action: () => {},
      color: "text-violet-500",
      bg: "bg-violet-50"
    },
    { 
      icon: AlertTriangle, 
      title: "Cərimələr", 
      action: () => setCurrentPage('penalties'),
      color: "text-red-500",
      bg: "bg-red-50"
    },
    { 
      icon: BarChart3, 
      title: "Statistika", 
      action: () => {},
      color: "text-cyan-500",
      bg: "bg-cyan-50"
    },
    { 
      icon: Calendar, 
      title: "Onlayn Dərslər", 
      action: () => setCurrentPage('classes'),
      color: "text-primary-500",
      bg: "bg-primary-50"
    }
  ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50/50">
      {/* Minimal Sticky Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-20">
        <div className="px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-500 hover:text-gray-900 transition-colors p-1"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar - Modern Addition */}
            <div className="hidden md:flex items-center relative w-64 lg:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              <input 
                type="text" 
                placeholder="Axtar..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary-100 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-6">
            <div className="hidden sm:flex items-center bg-gray-50 rounded-2xl px-4 py-2 border border-gray-100">
              <span className="text-sm text-gray-600 font-medium">44 gün qalıb</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
              <Globe className="w-4 h-4" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="az">AZ</option>
                <option value="ru">RU</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {/* Clean Hero Section */}
        <div className="relative px-6 lg:px-10 pt-10 pb-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
              
              {/* Left Column */}
              <div className="space-y-8">
                {/* Greeting */}
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                    Salam, Tural! 👋
                  </h1>
                  <p className="text-gray-500 text-lg">
                    Bu gün öyrənmək üçün əla gündür.
                  </p>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {modules.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="group bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between h-32"
                    >
                      <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center transition-colors mb-3`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} strokeWidth={2} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-[15px] group-hover:text-primary-600 transition-colors">
                        {item.title}
                      </h3>
                    </button>
                  ))}
                </div>

                {/* Simulator Results */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Simulyator Nəticələri</h3>
                    <button className="text-sm font-medium text-primary-600 hover:text-primary-700">Hamısına bax</button>
                  </div>
                  <div className="p-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary-100 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-100 font-bold text-gray-900">
                            30%
                          </div>
                          <div>
                            <p className="text-base font-semibold text-gray-900">İmtahan Simulyasiyası</p>
                            <p className="text-sm text-gray-400">03.12.2025 • 19:15</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="hidden sm:block w-32 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div className="bg-primary-500 h-full rounded-full w-[30%]"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Sticky Sidebar */}
              <div className="space-y-6 lg:sticky lg:top-6">
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
