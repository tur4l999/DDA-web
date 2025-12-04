import { useState } from 'react'
import { Menu, Settings, Bell, ExternalLink, Search, Calendar, Globe } from 'lucide-react'
import ModularActionCards from './ModularActionCards'
import OnlineClassCard from './OnlineClassCard'
import ClassesList from './ClassesList'
import ProfileCard from './ProfileCard'

export default function Dashboard({ onMenuClick, currentPage, setCurrentPage }) {
  const [language, setLanguage] = useState('az')

  if (currentPage === 'classes') {
    return <ClassesPage onBack={() => setCurrentPage('dashboard')} onMenuClick={onMenuClick} language={language} />
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

      <main className="flex-1 overflow-y-auto">
        <div className="gradient-bg relative px-4 lg:px-8 pt-8 pb-12 -mx-4 lg:-mx-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Salam, Tural Qarayev!
              </h1>
              <p className="text-green-50 text-sm lg:text-base">
                Sürücülük kursuna xoş gəlmisiniz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tamamlanmış</p>
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-4xl font-black text-primary-600">4</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{width: '16.7%'}}></div>
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tamamlanmamış</p>
                  <span className="text-2xl">📝</span>
                </div>
                <p className="text-4xl font-black text-orange-600">20</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{width: '83.3%'}}></div>
                </div>
              </div>
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/50">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Tərəqqi</p>
                  <span className="text-2xl">📊</span>
                </div>
                <p className="text-4xl font-black text-primary-600">30%</p>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ModularActionCards setCurrentPage={setCurrentPage} />

                <div className="mt-8 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-4 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>🎮</span>
                      <span>Simulyator Nəticələri</span>
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 hover:shadow-md transition-all">
                        <div>
                          <p className="text-sm font-bold text-gray-900">03.12.2025 19:15</p>
                          <p className="text-xs text-gray-600 font-semibold">30% (3/10)</p>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-3 shadow-inner">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full shadow-sm" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                      <span>📚</span>
                      <span>Mövzular Üzrə Nəticələr</span>
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 hover:shadow-md transition-all">
                        <div>
                          <p className="text-sm font-bold text-gray-900">3.1. Yol nişanları</p>
                          <p className="text-xs text-gray-600 font-semibold">0% (0/10)</p>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-3 shadow-inner">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full shadow-sm" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <ProfileCard />
                <OnlineClassCard maxItems={10} showViewAll={true} setCurrentPage={setCurrentPage} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ClassesPage({ onBack, onMenuClick, language }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // 1 illik dərslər - günə 2-3 dərs
  const [classes] = useState(() => {
    const classesData = []
    const startDate = new Date(2025, 0, 1)
    const subjects = ['Yol nişanları', 'Trafik işarələri', 'Sürücülük texnikası', 'Təhlükəsizlik', 'Qanun maddələri', 'Praktik məsləhətlər', 'Sual-Cavab']
    const instructors = ['Ə.Talibov', 'R.Əliyev', 'V.Hüseynov', 'N.Quliyev', 'M.İsmayılov', 'G.Məmmədov', 'A.Həsənov', 'B.Zeynalova']
    const languages = ['az', 'ru']
    
    for (let day = 0; day < 365; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + day)
      
      // Həftə içi günlər
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const lessonsPerDay = Math.floor(Math.random() * 2) + 2 // 2-3 dərs
        
        for (let i = 0; i < lessonsPerDay; i++) {
          const hour = 9 + (i * 4) + Math.floor(Math.random() * 2)
          const lessonDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, 0)
          
          const now = new Date()
          let status = 'waiting'
          if (lessonDate < now) {
            status = 'completed'
          } else if (Math.abs(lessonDate - now) < 2 * 60 * 60 * 1000) {
            status = 'started'
          }
          
          classesData.push({
            id: classesData.length + 1,
            title: subjects[classesData.length % subjects.length],
            instructor: instructors[classesData.length % instructors.length],
            date: lessonDate,
            duration: 45 + Math.floor(Math.random() * 4) * 15,
            status: status,
            subject: subjects[classesData.length % subjects.length],
            language: languages[classesData.length % 2]
          })
        }
      }
    }
    
    return classesData.sort((a, b) => b.date - a.date)
  })

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesLanguage = selectedLanguage === 'all' || cls.language === selectedLanguage
    const matchesStatus = selectedStatus === 'all' || cls.status === selectedStatus
    const matchesSubject = selectedSubject === 'all' || cls.subject === selectedSubject

    if (selectedDate) {
      const classDate = cls.date.toISOString().split('T')[0]
      return matchesSearch && classDate === selectedDate && matchesLanguage && matchesStatus && matchesSubject
    }
    return matchesSearch && matchesLanguage && matchesStatus && matchesSubject
  })

  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedClasses = filteredClasses.slice(startIndex, startIndex + itemsPerPage)

  const subjects = ['all', ...new Set(classes.map(c => c.subject))]

  const getStatusColor = (status) => {
    switch(status) {
      case 'waiting': return { bg: 'bg-gradient-to-br from-blue-50 to-blue-100', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white', icon: '⏰' }
      case 'started': return { bg: 'bg-gradient-to-br from-green-50 to-green-100', border: 'border-green-300', text: 'text-green-700', badge: 'bg-gradient-to-r from-green-500 to-green-600 text-white', icon: '🔴' }
      case 'completed': return { bg: 'bg-gradient-to-br from-gray-50 to-gray-100', border: 'border-gray-300', text: 'text-gray-700', badge: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white', icon: '✅' }
      default: return { bg: 'bg-gradient-to-br from-gray-50 to-gray-100', border: 'border-gray-300', text: 'text-gray-700', badge: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white', icon: '📝' }
    }
  }

  const getLanguageLabel = (lang) => {
    return lang === 'az' ? '🇦🇿 AZ' : '🇷🇺 RU'
  }

  const getStatusLabel = (status) => {
    const labels = {
      waiting: language === 'az' ? 'Gözləyir' : 'Ожидание',
      started: language === 'az' ? 'Başladı' : 'Начато',
      completed: language === 'az' ? 'Tamamlandı' : 'Завершено',
    }
    return labels[status] || status
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat(language === 'az' ? 'az-AZ' : 'ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold px-5 py-2 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-105 flex items-center space-x-2"
            >
              <span>←</span>
              <span>Geri</span>
            </button>
            <h2 className="text-xl font-bold text-gray-900">🎓 Canlı Dərslər</h2>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white shadow-xl">
              <h3 className="text-3xl font-black mb-2 flex items-center space-x-3">
                <span>🎓</span>
                <span>Onlayn Dərslər</span>
              </h3>
              <p className="text-green-100">Bütün canlı və keçmiş dərslərin siyahısı - {filteredClasses.length} dərs tapıldı</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border-2 border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <span>🔍</span>
                <span>Axtarış və Filtr</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" />
                  <input
                    type="text"
                    placeholder={language === 'az' ? 'Mövzu, müəllim adını axtarın...' : 'Поиск по теме, инструктору...'}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:shadow-md bg-white font-medium"
                  />
                </div>

                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:shadow-md bg-white font-medium"
                  />
                </div>

                <div className="relative">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => {
                      setSelectedLanguage(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="w-full pl-4 pr-10 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:shadow-md bg-white font-medium appearance-none cursor-pointer"
                  >
                    <option value="all">🌐 Bütün dillər</option>
                    <option value="az">🇦🇿 Azərbaycan dili</option>
                    <option value="ru">🇷🇺 Rus dili</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => { setSelectedStatus('all'); setCurrentPage(1) }}
                  className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 text-sm ${
                    selectedStatus === 'all'
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📚 Hamısı
                </button>
                <button
                  onClick={() => { setSelectedStatus('started'); setCurrentPage(1) }}
                  className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 text-sm ${
                    selectedStatus === 'started'
                      ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🔴 Canlı Dərslər
                </button>
                <button
                  onClick={() => { setSelectedStatus('waiting'); setCurrentPage(1) }}
                  className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 text-sm ${
                    selectedStatus === 'waiting'
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⏰ Gözləyən
                </button>
                <button
                  onClick={() => { setSelectedStatus('completed'); setCurrentPage(1) }}
                  className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 text-sm ${
                    selectedStatus === 'completed'
                      ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ✅ Tamamlanmış
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {subjects.map(subject => (
                  <button
                    key={subject}
                    onClick={() => {
                      setSelectedSubject(subject)
                      setCurrentPage(1)
                    }}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 text-xs ${
                      selectedSubject === subject
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-md scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {subject === 'all' ? '📖 Hamısı' : subject}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
              {paginatedClasses.length > 0 ? (
                paginatedClasses.map((cls) => {
                  const colors = getStatusColor(cls.status)
                  return (
                    <div
                      key={cls.id}
                      className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] group relative overflow-hidden`}
                    >
                      <div className="absolute top-3 right-3 flex items-center space-x-2">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold shadow-md">
                          {getLanguageLabel(cls.language)}
                        </span>
                        <span className={`${colors.badge} px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center space-x-1`}>
                          <span>{colors.icon}</span>
                          <span>{getStatusLabel(cls.status)}</span>
                        </span>
                      </div>

                      <div className="pr-40 mb-4">
                        <h4 className="text-lg font-black text-gray-900 group-hover:text-primary-700 transition-colors mb-1">
                          {cls.title}
                        </h4>
                        <p className={`text-sm ${colors.text} font-bold`}>📚 {cls.subject}</p>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                          <p className="text-gray-600 text-xs mb-1 font-semibold uppercase tracking-wider">👨‍🏫 Müəllim</p>
                          <p className="font-bold text-gray-900 text-sm">{cls.instructor}</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                          <p className="text-gray-600 text-xs mb-1 font-semibold uppercase tracking-wider">📅 Tarix</p>
                          <p className="font-bold text-gray-900 text-sm">{formatDate(cls.date)}</p>
                        </div>
                        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-gray-200">
                          <p className="text-gray-600 text-xs mb-1 font-semibold uppercase tracking-wider">⏱️ Müddət</p>
                          <p className="font-bold text-gray-900 text-sm">{cls.duration} dəq</p>
                        </div>
                      </div>

                      <div>
                        {cls.status === 'started' && (
                          <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black py-3 px-5 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                            </span>
                            <span>CANLI QOŞUL</span>
                          </button>
                        )}
                        {cls.status === 'waiting' && (
                          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-3 px-5 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                            <span>🔔</span>
                            <span>XATIRLADAT</span>
                          </button>
                        )}
                        {cls.status === 'completed' && (
                          <button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-black py-3 px-5 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2">
                            <span>▶️</span>
                            <span>YENİDƏN İZLƏ</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="col-span-full text-center py-16 bg-white rounded-2xl shadow-lg">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl font-bold text-gray-900 mb-2">Heç bir nəticə tapılmadı</p>
                  <p className="text-gray-600">Axtarış və ya filtr parametrlərini dəyişdirərək yenidən cəhd edin</p>
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  ← Əvvəlki
                </button>
                
                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-11 h-11 rounded-xl font-bold transition-all duration-300 text-sm ${
                          currentPage === pageNum
                            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg scale-110'
                            : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2.5 rounded-xl font-bold transition-all duration-300 text-sm ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  Sonrakı →
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
