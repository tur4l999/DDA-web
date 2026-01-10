import { useState } from 'react'
import { Menu, Settings, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar, ChevronRight, Monitor, Wallet, Ticket } from 'lucide-react'
import OnlineClassCard from './OnlineClassCard'
import ProfileCard from './ProfileCard'
import OnlineClasses from './OnlineClasses'
import TopicsPage from './Topics'
import PenaltiesPage from './PenaltiesPage'
import RoadSigns from './RoadSigns'
import UserStatistics from './UserStatistics'
import ResultsPage from './ResultsPage'
import ExamPage from './Exam/ExamPage'
import CertificateApplication from './CertificateApplication'
import PracticalExperience from './PracticalExperience'

export default function Dashboard({ onMenuClick, currentPage, setCurrentPage }) {
  const [language, setLanguage] = useState('az')
  const [selectedResultId, setSelectedResultId] = useState(null)

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

  if (currentPage === 'results') {
    return <ResultsPage resultId={selectedResultId} onBack={() => { setCurrentPage('dashboard'); setSelectedResultId(null); }} />
  }

  if (currentPage === 'exam') {
    return <ExamPage onBack={() => setCurrentPage('dashboard')} onStartExam={(params) => console.log('Start Exam:', params)} />
  }

  if (currentPage === 'certificate') {
    return <CertificateApplication onBack={() => setCurrentPage('dashboard')} />
  }

  if (currentPage === 'practical-experience') {
    return <PracticalExperience onBack={() => setCurrentPage('dashboard')} />
  }

  const handleExamClick = (examId) => {
    setSelectedResultId(examId);
    setCurrentPage('results');
  };

  const QuickAction = ({ icon: Icon, label, onClick, colorClass = "text-primary-600 bg-primary-50" }) => (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-5 bg-white rounded-2xl shadow-sm hover:shadow-card hover:-translate-y-1 transition-all duration-300 w-full h-full border border-gray-100/50"
    >
      <div className={`w-12 h-12 rounded-xl ${colorClass} group-hover:scale-110 transition-transform duration-300 flex items-center justify-center mb-3`}>
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <span className="font-semibold text-gray-900 text-sm tracking-tight">{label}</span>
    </button>
  )

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
      {/* Header - Glassmorphism */}
      <header className="sticky top-0 z-30 bg-gray-50/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100/50"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="hidden lg:block text-lg font-bold text-gray-900 tracking-tight">Ana Səhifə</h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100">
              <span className="text-xs text-gray-500 font-medium mr-2">Qalan vaxt:</span>
              <span className="text-gray-900 font-bold text-xs">44 gün</span>
            </div>

            <div className="hidden sm:flex items-center bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 gap-2">
              <Wallet className="w-3.5 h-3.5 text-primary-600" />
              <span className="text-gray-900 font-bold text-xs">50.00 ₼</span>
            </div>

            <div className="hidden sm:flex items-center bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 gap-2">
              <Ticket className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-gray-900 font-bold text-xs">5 bilet</span>
            </div>
            
            <div className="hidden sm:flex items-center bg-white rounded-xl px-3 py-2 gap-2 shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
              <Globe className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-xs text-gray-700 font-medium focus:outline-none cursor-pointer appearance-none pr-4"
              >
                <option value="az">AZ</option>
                <option value="ru">RU</option>
              </select>
            </div>

            <div className="h-6 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

            <button className="p-2 text-gray-500 hover:text-primary-600 hover:bg-white rounded-xl transition-all relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-xl transition-all">
              <Settings className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto space-y-8 pb-10">
          
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">
            {/* Left Content Column */}
            <div className="space-y-8">
              
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                    Salam, Tural! 👋
                  </h1>
                  <p className="text-gray-500 text-base max-w-xl leading-relaxed">
                    Bu gün yol hərəkəti qaydalarını öyrənmək üçün əla gündür.
                  </p>
                </div>
              </div>

              {/* Combined Sections */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Bölmələr</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
                  <QuickAction 
                    icon={BookOpen} 
                    label="Mövzular" 
                    onClick={() => setCurrentPage('topics')}
                    colorClass="bg-primary-50 text-primary-600"
                  />
                  <QuickAction 
                    icon={Calendar}
                    label="Onlayn Dərslər"
                    onClick={() => setCurrentPage('classes')}
                    colorClass="bg-primary-50 text-primary-600"
                  />
                  <QuickAction 
                    icon={HelpCircle} 
                    label="İmtahanlar"
                    onClick={() => setCurrentPage('exam')}
                    colorClass="bg-primary-50 text-primary-600"
                  />
                  <QuickAction 
                    icon={AlertTriangle} 
                    label="Cərimələr" 
                    onClick={() => setCurrentPage('penalties')}
                    colorClass="bg-primary-50 text-primary-600"
                  />
                </div>
              </section>

              {/* User Statistics Section */}
              <section>
                <UserStatistics onExamClick={handleExamClick} />
              </section>

              {/* Recent Activity / Simulator Results */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Son nəticələr</h3>
                  <button className="text-xs font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1 px-2.5 py-1.5 hover:bg-primary-50 rounded-lg transition-all">
                    Hamısına bax <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  {/* Result Item */}
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-500 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                        <Monitor className="w-5 h-5" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">Simulyator İmtahanı</h4>
                        <p className="text-xs text-gray-500 font-medium mt-0.5">03.12.2025 • 19:15</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="block text-xl font-bold text-gray-900 mb-1.5">30%</span>
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.4)]" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar Column */}
            <div className="space-y-6 sticky top-6">
              <ProfileCard />
              <OnlineClassCard maxItems={3} showViewAll={true} setCurrentPage={setCurrentPage} />
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}
