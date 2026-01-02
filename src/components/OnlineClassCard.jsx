import { Clock, User, Bell, Calendar, ArrowRight, Video } from 'lucide-react'

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

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month} • ${hours}:${minutes}`
  }

  return (
    <div className="bg-white rounded-3xl shadow-card border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100/50 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Ən yaxın dərslər</h3>
          {showViewAll && (
            <button 
              onClick={() => setCurrentPage && setCurrentPage('classes')}
              className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center gap-1 transition-colors px-2 py-1 hover:bg-primary-50 rounded-lg"
            >
              <span>Hamısı</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
      </div>

      <div className="p-2 space-y-2">
        {classes.map((cls) => (
          <div key={cls.id} className="group bg-white hover:bg-gray-50 rounded-2xl p-4 transition-all duration-200 border border-transparent hover:border-gray-100">
            {/* Top Row: Title & Status */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-bold text-gray-900 line-clamp-1">{cls.title}</h4>
              <div className="flex items-center gap-2 flex-shrink-0">
                  {cls.status === 'started' ? (
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                  ) : null}
                  <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-md uppercase">
                    {getLanguageLabel(cls.language)}
                  </span>
              </div>
            </div>

            {/* Info Row */}
            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium mb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{formatDate(cls.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{cls.duration} dəq</span>
              </div>
            </div>

            {/* Instructor & Action */}
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50 group-hover:border-gray-200/50">
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{cls.instructor}</span>
               </div>
               
               {cls.status === 'started' ? (
                   <button className="bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all shadow-sm shadow-primary-500/20 hover:shadow-primary-500/40">
                       Qoşul
                   </button>
               ) : (
                   <button className="text-gray-400 hover:text-primary-600 p-2 rounded-lg hover:bg-primary-50 transition-colors">
                       <Bell className="w-4 h-4" />
                   </button>
               )}
            </div>
          </div>
        ))}

        {classes.length === 0 && (
          <div className="text-center py-10">
            <Calendar className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-400">Yaxın zamanda dərs yoxdur</p>
          </div>
        )}
      </div>
    </div>
  )
}
