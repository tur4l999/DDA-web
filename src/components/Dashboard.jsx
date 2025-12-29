import { useState } from 'react'
import { Menu, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar, Play, ArrowRight, ChevronRight, Clock, Award } from 'lucide-react'
import OnlineClasses from './OnlineClasses'
import TopicsPage from './Topics'
import PenaltiesPage from './PenaltiesPage'
import RoadSigns from './RoadSigns'
import Button from './ui/Button'
import Card, { CardContent } from './ui/Card'
import Badge from './ui/Badge'
import Progress, { ProgressCircle } from './ui/Progress'

export default function Dashboard({ onMenuClick, currentPage, setCurrentPage }) {
  const [language, setLanguage] = useState('az')

  // Route to other pages
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
    <div className="flex-1 flex flex-col min-h-screen bg-neutral-50">
      {/* Header - Clean, minimal */}
      <header className="bg-white border-b border-neutral-100 px-4 lg:px-6 py-3 sticky top-0 z-sticky">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -m-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-neutral-800">Test Academy</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Days remaining badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">44 gün qalıb</span>
            </div>
            
            {/* Language selector */}
            <div className="hidden sm:flex items-center bg-neutral-100 rounded-lg px-3 py-1.5 gap-2">
              <Globe className="w-4 h-4 text-neutral-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm text-neutral-700 font-medium focus:outline-none cursor-pointer"
              >
                <option value="az">AZ</option>
                <option value="ru">RU</option>
              </select>
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
          
          {/* Welcome Section */}
          <section className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-neutral-800 mb-1">
                  Salam, Tural! 👋
                </h2>
                <p className="text-neutral-500">
                  Hər gün 10 dəqiqə davam etsən, nəticəni tez görəcəksən.
                </p>
              </div>
              
              {/* Quick Stats - Desktop */}
              <div className="hidden lg:flex items-center gap-4">
                <Card padding="sm" className="flex items-center gap-3 min-w-[140px]">
                  <ProgressCircle value={4} max={24} size={44} variant="primary" />
                  <div>
                    <p className="text-xs text-neutral-500">Tamamlanmış</p>
                    <p className="text-lg font-bold text-neutral-800">4/24</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Continue Learning Card */}
            <Card variant="elevated" className="gradient-primary p-6 lg:p-8 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1">
                  <Badge variant="success" size="sm" className="mb-3 bg-white/20 text-white border-0">
                    Son öyrənilən
                  </Badge>
                  <h3 className="text-xl lg:text-2xl font-bold mb-2">
                    M3. Yol nişanları
                  </h3>
                  <p className="text-white/80 mb-4 text-sm lg:text-base">
                    Qadağan nişanları bölməsində qalmısınız. Davam edin!
                  </p>
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <p className="text-white/60 text-xs mb-1">İrəliləyiş</p>
                      <p className="text-lg font-semibold">55%</p>
                    </div>
                    <div className="w-px h-8 bg-white/20" />
                    <div>
                      <p className="text-white/60 text-xs mb-1">Qalan mövzular</p>
                      <p className="text-lg font-semibold">5 bölmə</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => setCurrentPage('topics')}
                    rightIcon={<Play className="w-4 h-4" />}
                    className="bg-white text-primary-700 hover:bg-white/90"
                  >
                    Davam et
                  </Button>
                </div>
              </div>
            </Card>
          </section>

          {/* Main Modules Grid */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-800">Öyrənmə modulları</h3>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Topics */}
              <ModuleCard
                icon={BookOpen}
                title="Təlim Mövzuları"
                description="24 mövzu"
                progress={17}
                color="primary"
                onClick={() => setCurrentPage('topics')}
              />
              
              {/* 3D Video */}
              <ModuleCard
                icon={Video}
                title="3D Video"
                description="Video dərslər"
                progress={45}
                color="info"
              />
              
              {/* Questions */}
              <ModuleCard
                icon={HelpCircle}
                title="Suallar"
                description="Test sualları"
                progress={30}
                color="warning"
              />
              
              {/* Video Lessons */}
              <ModuleCard
                icon={FileText}
                title="Video Dərslər"
                description="Müəllim izahları"
                progress={60}
                color="success"
              />
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - More Modules + Stats */}
            <div className="lg:col-span-2 space-y-6">
              {/* Additional Modules */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-800">Əlavə resurslar</h3>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <SmallModuleCard
                    icon={BookMarked}
                    title="Maddələr"
                    onClick={() => {}}
                  />
                  <SmallModuleCard
                    icon={AlertTriangle}
                    title="Cərimələr"
                    onClick={() => setCurrentPage('penalties')}
                  />
                  <SmallModuleCard
                    icon={BarChart3}
                    title="Statistika"
                    onClick={() => {}}
                  />
                  <SmallModuleCard
                    icon={Calendar}
                    title="Onlayn Dərslər"
                    onClick={() => setCurrentPage('classes')}
                  />
                </div>
              </section>

              {/* Recent Results */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-800">Son nəticələr</h3>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                    Hamısına bax
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <Card>
                  <div className="divide-y divide-neutral-100">
                    <ResultRow
                      date="03.12.2025"
                      time="19:15"
                      score={30}
                      correct={3}
                      total={10}
                    />
                    <ResultRow
                      date="02.12.2025"
                      time="14:30"
                      score={70}
                      correct={7}
                      total={10}
                    />
                    <ResultRow
                      date="01.12.2025"
                      time="10:00"
                      score={90}
                      correct={9}
                      total={10}
                    />
                  </div>
                </Card>
              </section>
            </div>

            {/* Right Column - Upcoming Classes */}
            <div className="space-y-6">
              {/* Mobile Stats */}
              <div className="lg:hidden">
                <Card className="flex items-center justify-around py-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-800">4</p>
                    <p className="text-xs text-neutral-500">Tamamlanmış</p>
                  </div>
                  <div className="w-px h-10 bg-neutral-100" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neutral-800">20</p>
                    <p className="text-xs text-neutral-500">Qalır</p>
                  </div>
                  <div className="w-px h-10 bg-neutral-100" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">17%</p>
                    <p className="text-xs text-neutral-500">İrəliləyiş</p>
                  </div>
                </Card>
              </div>

              {/* Upcoming Online Classes */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-800">Növbəti dərslər</h3>
                  <button 
                    onClick={() => setCurrentPage('classes')}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    Hamısına bax
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-3">
                  <UpcomingClassCard
                    title="Yol nişanları"
                    instructor="Ə.Talibov"
                    date="Bugün"
                    time="15:00"
                    isLive
                  />
                  <UpcomingClassCard
                    title="Sürücülük texnikası"
                    instructor="R.Əliyev"
                    date="Sabah"
                    time="10:00"
                  />
                  <UpcomingClassCard
                    title="Qanun maddələri"
                    instructor="V.Hüseynov"
                    date="05.01"
                    time="14:00"
                  />
                </div>
              </section>

              {/* Quick Actions */}
              <section>
                <Card className="bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200" padding="lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-neutral-800">İmtahana hazırsınız?</h4>
                      <p className="text-sm text-neutral-500">Simulyator ilə test edin</p>
                    </div>
                  </div>
                  <Button variant="primary" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Simulyatora keç
                  </Button>
                </Card>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Module Card Component
function ModuleCard({ icon: Icon, title, description, progress, color, onClick }) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-600',
    info: 'bg-info-50 text-info-600',
    warning: 'bg-warning-50 text-warning-600',
    success: 'bg-success-50 text-success-600',
  }

  const progressColors = {
    primary: 'primary',
    info: 'primary',
    warning: 'warning',
    success: 'success',
  }

  return (
    <Card 
      variant="interactive" 
      onClick={onClick}
      className="group"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorClasses[color]} transition-transform group-hover:scale-110`}>
        <Icon className="w-5 h-5" strokeWidth={1.5} />
      </div>
      <h4 className="font-semibold text-neutral-800 mb-1">{title}</h4>
      <p className="text-sm text-neutral-500 mb-3">{description}</p>
      <Progress value={progress} variant={progressColors[color]} size="sm" />
    </Card>
  )
}

// Small Module Card
function SmallModuleCard({ icon: Icon, title, onClick }) {
  return (
    <Card 
      variant="interactive" 
      onClick={onClick}
      padding="sm"
      className="flex items-center gap-3"
    >
      <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
        <Icon className="w-4 h-4 text-neutral-600 group-hover:text-primary-600 transition-colors" strokeWidth={1.5} />
      </div>
      <span className="font-medium text-sm text-neutral-700">{title}</span>
    </Card>
  )
}

// Result Row Component
function ResultRow({ date, time, score, correct, total }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'success'
    if (score >= 50) return 'warning'
    return 'error'
  }

  return (
    <div className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
      <div>
        <p className="font-medium text-neutral-800">{date}</p>
        <p className="text-sm text-neutral-500">{time}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm text-neutral-500">{correct}/{total} düzgün</p>
        </div>
        <Badge variant={getScoreColor(score)} size="md">
          {score}%
        </Badge>
      </div>
    </div>
  )
}

// Upcoming Class Card
function UpcomingClassCard({ title, instructor, date, time, isLive }) {
  return (
    <Card padding="sm" className="flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-neutral-800 truncate">{title}</h4>
          {isLive && (
            <Badge variant="error" size="sm" dot>
              CANLI
            </Badge>
          )}
        </div>
        <p className="text-sm text-neutral-500">{instructor}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-medium text-neutral-800">{date}</p>
        <p className="text-sm text-neutral-500">{time}</p>
      </div>
    </Card>
  )
}
