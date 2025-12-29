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

  const classes = allClasses
    .filter(cls => cls.status === 'started' || cls.status === 'waiting')
    .sort((a, b) => a.date - b.date)
    .slice(0, maxItems)

  const getLanguageLabel = (lang) => {
    const flags = { az: 'AZ', ru: 'RU', en: 'EN' }
    return flags[lang] || lang.toUpperCase()
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'started': return 'bg-accent-50 text-accent-700'
      case 'waiting': return 'bg-primary-50 text-primary-700'
      default: return 'bg-slate-100 text-slate-600'
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
    <div className="card">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">Ən yaxın dərslər</h3>
          {showViewAll && (
            <button 
              onClick={() => setCurrentPage && setCurrentPage('classes')}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center gap-1 transition-colors group"
            >
              <span>Hamısı</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Classes List */}
      <div className="p-4 space-y-3">
        {classes.map((cls) => (
          <div 
            key={cls.id} 
            className="group bg-surface-50 hover:bg-white border border-transparent hover:border-slate-200 rounded-2xl p-4 transition-all duration-200 hover:shadow-soft"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h4 className="text-sm font-semibold text-slate-900 line-clamp-1 flex-1">
                {cls.title}
              </h4>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className={`${getStatusColor(cls.status)} px-2.5 py-1 rounded-lg text-xs font-medium`}>
                  {getStatusLabel(cls.status)}
                </span>
                <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-xs font-medium">
                  {getLanguageLabel(cls.language)}
                </span>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">{formatDate(cls.date)}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">{cls.duration} dəq</span>
              </div>
            </div>

            {/* Instructor */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
              <User className="w-3.5 h-3.5" />
              <span>{cls.instructor}</span>
            </div>

            {/* CTA */}
            {cls.status === 'started' && (
              <button className="w-full btn-primary py-2.5 text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Dərsə qoşul</span>
              </button>
            )}

            {cls.status === 'waiting' && (
              <button className="w-full btn-secondary py-2.5 text-sm">
                <Bell className="w-4 h-4" />
                <span>Xatırlat</span>
              </button>
            )}
          </div>
        ))}

        {/* Empty State */}
        {classes.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Yaxın zamanda dərs yoxdur</p>
          </div>
        )}
      </div>
    </div>
  )
}
