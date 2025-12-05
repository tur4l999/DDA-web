import { Clock, User, Bell, Calendar, ArrowRight } from 'lucide-react'

export default function OnlineClassCard({ maxItems = 2, showViewAll = false, setCurrentPage }) {
  const classes = [
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
    }
  ]

  const getLanguageLabel = (lang) => {
    return lang === 'az' ? '🇦🇿 AZ' : '🇷🇺 RU'
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
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${day}.${month} ${hours}:${minutes}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Onlayn Dərslər</h3>
          {showViewAll && (
            <button 
              onClick={() => setCurrentPage && setCurrentPage('classes')}
              className="text-[#007A3A] hover:text-[#005A2A] text-sm font-medium flex items-center space-x-1 transition-colors"
            >
              <span>Hamısı</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="p-5 space-y-3 max-h-[calc(100vh-24rem)] overflow-y-auto">
        {classes.slice(0, maxItems).map((cls) => (
          <div key={cls.id} className="group relative bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 p-4 hover:border-[#007A3A] hover:shadow-md transition-all">
            <div className="absolute top-2 right-2 flex items-center space-x-1">
              <span className="bg-white px-2 py-1 rounded-lg text-xs font-bold shadow-sm border border-gray-200">
                {getLanguageLabel(cls.language)}
              </span>
            </div>
            <div className="flex items-start justify-between mb-3 pr-16">
              <h4 className="text-sm font-bold text-gray-900 line-clamp-2 flex-1 group-hover:text-primary-700 transition-colors">{cls.title}</h4>
            </div>
            <div className="mb-3">
              <span className={`${getStatusColor(cls.status)} px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm inline-block`}>
                {getStatusLabel(cls.status)}
              </span>
            </div>

            <div className="space-y-2 text-xs mb-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="bg-gray-100 rounded-lg p-1.5">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="truncate font-medium">{cls.instructor}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <div className="bg-gray-100 rounded-lg p-1.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">{formatDate(cls.date)} ({cls.duration} dəq)</span>
              </div>
            </div>

            {cls.status === 'started' && (
              <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Canlı Qoşul</span>
              </button>
            )}

            {cls.status === 'waiting' && (
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Xatırladat</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
