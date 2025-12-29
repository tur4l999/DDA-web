import { Clock, User, Bell, Calendar, ArrowRight } from 'lucide-react'

export default function OnlineClassCard({ maxItems = 2, showViewAll = false, setCurrentPage }) {
  const allClasses = [
    {
      id: 1,
      title: 'Yol nişanları',
      instructor: 'Ə.Talibov',
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 16.5 * 60 * 60 * 1000),
      duration: 60,
      status: 'waiting',
      language: 'az'
    },
    {
      id: 2,
      title: 'Sual-Cavab Sessiyası',
      instructor: 'Moderator',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 19.5 * 60 * 60 * 1000),
      duration: 45,
      status: 'started',
      language: 'ru'
    },
    {
      id: 3,
      title: 'Trafik işarələri',
      instructor: 'R.Əliyev',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000),
      duration: 60,
      status: 'waiting',
      language: 'az'
    },
    {
      id: 4,
      title: 'Sürət limitləri',
      instructor: 'Ə.Talibov',
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000),
      duration: 60,
      status: 'started',
      language: 'az'
    }
  ]

  // Filter: only "started" and "waiting" status, sorted by date
  const classes = allClasses
    .filter(cls => cls.status === 'started' || cls.status === 'waiting')
    .sort((a, b) => a.date - b.date)
    .slice(0, maxItems)

  const getLanguageLabel = (lang) => {
    const flags = {
      az: 'AZ',
      ru: 'RU',
      en: 'EN'
    }
    return flags[lang] || lang.toUpperCase()
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'started': return 'bg-primary-100 text-primary-700'
      case 'waiting': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'started': return 'Başladı'
      case 'waiting': return 'Gözləyir'
      default: return status
    }
  }

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-900">Ən yaxın dərslər</h3>
          {showViewAll && (
            <button 
              onClick={() => setCurrentPage && setCurrentPage('classes')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1 transition-smooth"
            >
              <span>Hamısı</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="px-4 pb-4 space-y-3">
        {classes.map((cls) => (
          <div key={cls.id} className="group bg-neutral-50 hover:bg-white rounded-2xl p-4 hover:shadow-soft-md transition-smooth border border-transparent hover:border-primary-200">
            {/* Header with title and status */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h4 className="text-sm font-semibold text-neutral-900 line-clamp-1 flex-1">{cls.title}</h4>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`${getStatusColor(cls.status)} px-2.5 py-1.5 rounded-xl text-xs font-semibold`}>
                  {getStatusLabel(cls.status)}
                </span>
                <span className="bg-neutral-100 text-neutral-700 px-2.5 py-1.5 rounded-xl text-xs font-semibold">
                  {getLanguageLabel(cls.language)}
                </span>
              </div>
            </div>

            {/* Date/Time/Duration info */}
            <div className="flex items-center gap-4 text-xs text-neutral-600 mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">{formatDate(cls.date)}</span>
              </div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">{cls.duration} dəq</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
              <User className="w-3.5 h-3.5" />
              <span>{cls.instructor}</span>
            </div>

            {/* Modern CTA */}
            {cls.status === 'started' && (
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-smooth text-sm flex items-center justify-center gap-2 shadow-soft-md hover:shadow-soft-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Dərsə qoşul</span>
              </button>
            )}

            {cls.status === 'waiting' && (
              <button className="w-full bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-300 font-medium py-2.5 px-4 rounded-xl transition-smooth text-sm flex items-center justify-center gap-2 shadow-soft">
                <Bell className="w-4 h-4" />
                <span>Xatırlat</span>
              </button>
            )}
          </div>
        ))}

        {/* Modern Empty state */}
        {classes.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-sm text-neutral-500 font-medium">Yaxın zamanda dərs yoxdur</p>
          </div>
        )}
      </div>
    </div>
  )
}
