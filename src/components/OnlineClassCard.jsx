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
    },
    {
      id: 2,
      title: 'Sual-Cavab Sessiyası',
      instructor: 'Moderator',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 19.5 * 60 * 60 * 1000),
      duration: 45,
      status: 'started',
    },
    {
      id: 3,
      title: 'Trafik işarələri',
      instructor: 'R.Əliyev',
      date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000),
      duration: 60,
      status: 'waiting',
    }
  ]

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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white">Onlayn Dərslər</h3>
          </div>
          {showViewAll && (
            <button 
              onClick={() => setCurrentPage && setCurrentPage('classes')}
              className="text-white/90 hover:text-white text-sm font-medium flex items-center space-x-1 transition-colors"
            >
              <span>Hamısı</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <div className="p-5 space-y-3 max-h-[calc(100vh-24rem)] overflow-y-auto">
        {classes.slice(0, maxItems).map((cls) => (
          <div key={cls.id} className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-100 p-4 hover:border-primary-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-900 line-clamp-2 flex-1 pr-2 group-hover:text-primary-700 transition-colors">{cls.title}</h4>
              <span className={`${getStatusColor(cls.status)} px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-sm`}>
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
