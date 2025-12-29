import { useState } from 'react'
import { Menu, Settings, Bell, Globe, BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar, User, Award, ArrowRight, Play, Clock } from 'lucide-react'
import { Card, Button, Progress, Badge } from './ui'
import OnlineClasses from './OnlineClasses'
import TopicsNew from './Topics/TopicsNew'
import PenaltiesPage from './PenaltiesPage'
import RoadSignsNew from './RoadSigns/RoadSignsNew'

export default function DashboardNew({ onMenuClick, currentPage, setCurrentPage }) {
  const [language, setLanguage] = useState('az')

  if (currentPage === 'classes') {
    return <OnlineClasses onBack={() => setCurrentPage('dashboard')} />
  }

  if (currentPage === 'topics') {
    return <TopicsNew onBack={() => setCurrentPage('dashboard')} />
  }

  if (currentPage === 'penalties') {
    return <PenaltiesPage onBack={() => setCurrentPage('dashboard')} />
  }

  if (currentPage === 'road-signs') {
    return <RoadSignsNew onBack={() => setCurrentPage('dashboard')} />
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      {/* Header - Simplified */}
      <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="hidden lg:block text-base font-semibold text-gray-900">Test Academy</h2>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Days remaining badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">44 gün qalır</span>
            </div>
            
            {/* Language selector */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <Globe className="w-4 h-4 text-gray-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="az">AZ</option>
                <option value="ru">RU</option>
              </select>
            </div>
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
            </button>
            
            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 py-8">
          {/* Welcome Section - Clean & Minimal */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              Salam, Tural Qarayev
            </h1>
            <p className="text-base text-gray-600">
              Hər gün 10 dəqiqə davam etsən, nəticəni tez görəcəksən
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8">
            {/* Left Column: Main Content */}
            <div className="space-y-6">
              {/* Continue Learning Card - Primary CTA */}
              <Card variant="default" className="border-primary-100 bg-gradient-to-br from-primary-50 to-white">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="success">Davam edir</Badge>
                      <span className="text-xs text-gray-500">Son baxış: 2 saat əvvəl</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Yol nişanları - Qadağan nişanları
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Mövzu 3.3 • 12 dəqiqə qalır
                    </p>
                    <Progress value={70} max={100} showLabel={false} className="mb-4" />
                  </div>
                  <Button 
                    onClick={() => setCurrentPage('topics')}
                    size="md"
                    className="flex-shrink-0"
                  >
                    Davam et
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>

              {/* Learning Modules Grid */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Təlim materialları</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={() => setCurrentPage('topics')}
                    className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
                      <BookOpen className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Mövzular</h3>
                    <p className="text-xs text-gray-500">27 fəsil</p>
                  </button>

                  <button className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
                      <Video className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Video Dərslər</h3>
                    <p className="text-xs text-gray-500">45 video</p>
                  </button>

                  <button className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
                      <HelpCircle className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Suallar</h3>
                    <p className="text-xs text-gray-500">800+ sual</p>
                  </button>

                  <button className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-3 group-hover:bg-primary-500 transition-colors">
                      <FileText className="w-5 h-5 text-primary-600 group-hover:text-white transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">İmtahan</h3>
                    <p className="text-xs text-gray-500">Test rejimi</p>
                  </button>
                </div>
              </div>

              {/* Additional Resources */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Əlavə resurslar</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <button className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                      <BookMarked className="w-5 h-5 text-gray-600 transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Maddələr</h3>
                    <p className="text-xs text-gray-500">Qanun</p>
                  </button>

                  <button
                    onClick={() => setCurrentPage('penalties')}
                    className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                      <AlertTriangle className="w-5 h-5 text-gray-600 transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Cərimələr</h3>
                    <p className="text-xs text-gray-500">Yol qaydaları</p>
                  </button>

                  <button className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                      <BarChart3 className="w-5 h-5 text-gray-600 transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Statistika</h3>
                    <p className="text-xs text-gray-500">Təhlil</p>
                  </button>

                  <button
                    onClick={() => setCurrentPage('classes')}
                    className="group bg-white border border-gray-100 rounded-lg p-4 hover:border-gray-200 hover:shadow-sm transition-all text-left"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-3 group-hover:bg-gray-100 transition-colors">
                      <Calendar className="w-5 h-5 text-gray-600 transition-colors" strokeWidth={2} />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Onlayn Dərslər</h3>
                    <p className="text-xs text-gray-500">Canlı</p>
                  </button>
                </div>
              </div>

              {/* Recent Test Results */}
              <Card variant="default">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Son test nəticələri</h3>
                  <Button variant="ghost" size="sm">
                    Hamısına bax
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success-50 flex items-center justify-center">
                        <span className="text-sm font-semibold text-success-700">90%</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">İmtahan simulyatoru</p>
                        <p className="text-xs text-gray-500">03.12.2025 • 9/10 düzgün</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warning-50 flex items-center justify-center">
                        <span className="text-sm font-semibold text-warning-700">60%</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Yol nişanları testi</p>
                        <p className="text-xs text-gray-500">02.12.2025 • 6/10 düzgün</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Profile & Progress */}
            <div className="space-y-6">
              {/* Profile Card - Minimal & Clean */}
              <Card variant="default" className="bg-gradient-to-br from-primary-500 to-primary-600 border-0 text-white">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                    <User className="w-8 h-8 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">Tural Qarayev</h3>
                  <p className="text-sm text-primary-100">Test Academy</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between py-2 border-t border-white/20">
                    <span className="text-sm text-primary-100">Tamamlanmış</span>
                    <span className="text-lg font-semibold">4 / 27</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t border-white/20">
                    <span className="text-sm text-primary-100">Davam edən</span>
                    <span className="text-lg font-semibold">3</span>
                  </div>
                </div>

                <Button variant="secondary" size="md" className="w-full">
                  <Award className="w-4 h-4" />
                  Şəhadətnamə
                </Button>
              </Card>

              {/* Upcoming Classes */}
              <Card variant="default">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-semibold text-gray-900">Növbəti dərslər</h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setCurrentPage('classes')}
                  >
                    Hamısı
                  </Button>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Yol nişanları</h4>
                        <p className="text-xs text-gray-500">Ə.Talibov</p>
                      </div>
                      <Badge variant="info">Canlı</Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>04.12.2025, 14:00</span>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 mb-1">Trafik qaydaları</h4>
                        <p className="text-xs text-gray-500">R.Əliyev</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>05.12.2025, 16:00</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Stats */}
              <Card variant="subtle">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Bu həftə</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Öyrənmə vaxtı</span>
                    <span className="text-sm font-semibold text-gray-900">2s 15d</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tamamlanmış dərslər</span>
                    <span className="text-sm font-semibold text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Test nəticəsi</span>
                    <span className="text-sm font-semibold text-success-600">85%</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
