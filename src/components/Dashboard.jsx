import { useState } from 'react'
import { Menu, Settings, Bell, ExternalLink, BookOpen, School } from 'lucide-react'
import StatsCard from './StatsCard'
import ActionCard from './ActionCard'
import OnlineClassCard from './OnlineClassCard'

export default function Dashboard({ onMenuClick, currentPage, setCurrentPage }) {
  if (currentPage === 'classes') {
    return <ClassesPage onBack={() => setCurrentPage('dashboard')} onMenuClick={onMenuClick} />
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center space-x-2">
              <School className="w-5 h-5 text-primary-600" />
              <h2 className="text-sm text-gray-900 font-medium">Test Academy</h2>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2 cursor-pointer">
              <span className="text-sm font-medium text-gray-700">Tural Qarayev</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="relative px-4 lg:px-8 pt-0 pb-24">
          <div className="absolute inset-0 gradient-bg -z-10 h-80 opacity-20" style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3994642/pexels-photo-3994642.jpeg?auto=compress&cs=tinysrgb&w=1200")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.08,
          }}></div>

          <div className="gradient-bg relative px-4 lg:px-6 pt-8 pb-24 rounded-b-3xl -mx-4 lg:-mx-8 mb-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    Salam, Tural Qarayev!
                  </h1>
                  <p className="text-green-50 text-sm lg:text-base">
                    Yenilədirilmiş şəxsi kabinetə xoş gəlmisiniz
                  </p>
                </div>
                <div className="text-right hidden lg:block">
                  <p className="text-green-50 text-sm mb-2">Profil</p>
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center ring-2 ring-white/20">
                    <span className="text-4xl">👤</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <StatsCard
                  icon="CheckCircle"
                  label="Tamamlanmış"
                  value="4"
                  iconBg="bg-primary-500"
                />
                <StatsCard
                  icon="AlertCircle"
                  label="Tamamlanmamış"
                  value="20"
                  iconBg="bg-orange-500"
                />
                <StatsCard
                  icon="TrendingUp"
                  label="Tərəqqi"
                  value="30%"
                  iconBg="bg-primary-600"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-6">
                  <ActionCard
                    icon="BookOpen"
                    title="Təlim mövzuları"
                  />
                  <ActionCard
                    icon="Video"
                    title="Video dərslər"
                  />
                  <button
                    onClick={() => setCurrentPage('classes')}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-left group border-2 border-primary-600"
                  >
                    <div className="flex items-center space-x-4">
                      <BookOpen className="w-8 h-8 text-primary-600" />
                      <h3 className="text-lg font-semibold text-primary-600 group-hover:text-primary-700 transition-colors">
                        Canlı Dərslər
                      </h3>
                    </div>
                  </button>
                  <ActionCard
                    icon="BarChart3"
                    title="Statistika"
                  />
                  <ActionCard
                    icon="Award"
                    title="Nailiyyətlər"
                  />
                  <ActionCard
                    icon="Settings"
                    title="Tənzimləmələr"
                  />
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Simulyator nəticələri</h3>
                    <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
                      <span>İmtahana Başla</span>
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">S/S</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tarix</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nəticə</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">1</td>
                          <td className="py-3 px-4 text-sm text-gray-600">03.12.2025 19:15</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">30%</span>
                                  <span className="text-xs text-gray-500">3/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Mövzular üzrə imtahan nəticələri</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">S/S</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Mövzu</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Nəticə</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm text-gray-900">1</td>
                          <td className="py-3 px-4 text-sm text-gray-600">3.1. Yol nişanları...</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-900">0%</span>
                                  <span className="text-xs text-gray-500">0/10</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gray-300 h-2 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                      Bütün Nəticələrə Bax
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <OnlineClassCard />
                <OnlineClassCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function ClassesPage({ onBack, onMenuClick }) {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: 'Mənzil 3.1. Yol nişanları',
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
      title: 'Mənzil 3.2. Trafik işarələri',
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

  const getStatusColor = (status) => {
    switch(status) {
      case 'waiting': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100' }
      case 'started': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', badge: 'bg-green-100' }
      case 'completed': return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-100' }
      case 'cancelled': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', badge: 'bg-red-100' }
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', badge: 'bg-gray-100' }
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'waiting': return 'Gözləyir'
      case 'started': return 'Başladı'
      case 'completed': return 'Tamamlandı'
      case 'cancelled': return 'Ləğv edildi'
      default: return status
    }
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('az-AZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={onBack}
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              ← Geri
            </button>
            <h2 className="text-xl font-bold text-gray-900">Canlı Dərslər</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900 relative">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        <div className="px-4 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Planlaşdırılmış Dərslər</h3>
              <p className="text-gray-600">Bütün canlı dərslərin tam siyahısı</p>
            </div>

            <div className="space-y-4">
              {classes.map((cls) => {
                const colors = getStatusColor(cls.status)
                return (
                  <div
                    key={cls.id}
                    className={`${colors.bg} border ${colors.border} rounded-xl p-6 hover:shadow-md transition-shadow`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{cls.title}</h4>
                            <p className={`text-sm ${colors.text}`}>{cls.subject}</p>
                          </div>
                          <span className={`${colors.badge} ${colors.text} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap`}>
                            {getStatusLabel(cls.status)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 text-xs mb-1">Müəllim</p>
                            <p className="font-medium text-gray-900">{cls.instructor}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs mb-1">Tarix</p>
                            <p className="font-medium text-gray-900">{formatDate(cls.date)}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-xs mb-1">Müddət</p>
                            <p className="font-medium text-gray-900">{cls.duration} dəqiqə</p>
                          </div>
                          <div className="flex items-end">
                            {cls.status === 'started' && (
                              <button className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                Canlı Dərsə Qoşul
                              </button>
                            )}
                            {cls.status === 'waiting' && (
                              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                Xatırladat
                              </button>
                            )}
                            {cls.status === 'completed' && (
                              <button className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm">
                                Yenidən İzlə
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
