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

  const [classes] = useState([
    {
      id: 1,
      title: 'Yol nişanları',
      instructor: 'Ə.Talibov',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 16.5 * 60 * 60 * 1000),
      duration: 60,
      status: 'waiting',
      subject: 'Yol nişanları'
    },
    {
      id: 2,
      title: 'Sual-Cavab Sessiyası',
      instructor: 'Moderator',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 19.5 * 60 * 60 * 1000),
      duration: 45,
      status: 'started',
      subject: 'Ümumi'
    },
    {
      id: 3,
      title: 'Trafik işarələri',
      instructor: 'R.Əliyev',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000),
      duration: 60,
      status: 'waiting',
      subject: 'Trafik'
    },
    {
      id: 4,
      title: 'Təcrübəli sürücülükdən məsləhətlər',
      instructor: 'V.Hüseynov',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      duration: 50,
      status: 'completed',
      subject: 'Ümumi'
    }
  ])

  const filteredClasses = classes.filter(cls => {
    const matchesSearch = cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cls.instructor.toLowerCase().includes(searchQuery.toLowerCase())

    if (selectedDate) {
      const classDate = cls.date.toISOString().split('T')[0]
      return matchesSearch && classDate === selectedDate
    }
    return matchesSearch
  })

  const getStatusColor = (status) => {
    switch(status) {
      case 'waiting': return { bg: 'bg-gradient-to-br from-blue-50 to-blue-100', border: 'border-blue-300', text: 'text-blue-700', badge: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' }
      case 'started': return { bg: 'bg-gradient-to-br from-green-50 to-green-100', border: 'border-green-300', text: 'text-green-700', badge: 'bg-gradient-to-r from-green-500 to-green-600 text-white' }
      case 'completed': return { bg: 'bg-gradient-to-br from-gray-50 to-gray-100', border: 'border-gray-300', text: 'text-gray-700', badge: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white' }
      default: return { bg: 'bg-gradient-to-br from-gray-50 to-gray-100', border: 'border-gray-300', text: 'text-gray-700', badge: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white' }
    }
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

      <main className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Planlaşdırılmış Dərslər</h3>
              <p className="text-gray-600">Bütün canlı dərslərin siyahısı</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" />
                <input
                  type="text"
                  placeholder={language === 'az' ? 'Mövzu, müəllim adını axtarın...' : 'Поиск по теме, инструктору...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:shadow-md bg-white"
                />
              </div>

              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-500" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all shadow-sm hover:shadow-md bg-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => {
                  const colors = getStatusColor(cls.status)
                  return (
                    <div
                      key={cls.id}
                      className={`${colors.bg} border-2 ${colors.border} rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold text-gray-900">{cls.title}</h4>
                              <p className={`text-sm ${colors.text} font-medium`}>{cls.subject}</p>
                            </div>
                            <span className={`${colors.badge} px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ml-4 shadow-md`}>
                              {getStatusLabel(cls.status)}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-gray-600 text-xs mb-1">Müəllim</p>
                              <p className="font-semibold text-gray-900">{cls.instructor}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs mb-1">Tarix və Saat</p>
                              <p className="font-semibold text-gray-900">{formatDate(cls.date)}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs mb-1">Müddət</p>
                              <p className="font-semibold text-gray-900">{cls.duration} dəq</p>
                            </div>
                            <div>
                              {cls.status === 'started' && (
                                <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 w-full text-sm shadow-md hover:shadow-lg transform hover:scale-105">
                                  🔴 Canlı Qoşul
                                </button>
                              )}
                              {cls.status === 'waiting' && (
                                <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 w-full text-sm shadow-md hover:shadow-lg transform hover:scale-105">
                                  🔔 Xatırladat
                                </button>
                              )}
                              {cls.status === 'completed' && (
                                <button className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-2.5 px-5 rounded-xl transition-all duration-300 w-full text-sm shadow-md hover:shadow-lg transform hover:scale-105">
                                  ▶️ Yenidən İzlə
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">Axtarış nəticəsi tapılmadı</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
