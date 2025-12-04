import { Clock, User, Bell } from 'lucide-react'

export default function OnlineClassCard({ maxItems = 2 }) {
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-lg font-bold text-gray-900">Yaxında Olan Dərslər</h3>
      </div>
      <div className="p-6 space-y-3">
        {classes.slice(0, maxItems).map((cls) => (
          <div key={cls.id} className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg border border-primary-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-sm font-bold text-gray-900 line-clamp-2 flex-1 pr-2">{cls.title}</h4>
              <span className={`${getStatusColor(cls.status)} px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap`}>
                {getStatusLabel(cls.status)}
              </span>
            </div>

            <div className="space-y-2 text-xs mb-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{cls.instructor}</span>
              </div>

              <div className="flex items-center space-x-2 text-gray-700">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{formatDate(cls.date)} ({cls.duration} dəq)</span>
              </div>
            </div>

            {cls.status === 'started' && (
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-3 rounded-lg transition-colors text-sm">
                Canlı Qoşul
              </button>
            )}

            {cls.status === 'waiting' && (
              <button className="w-full bg-white hover:bg-gray-50 text-primary-600 font-semibold py-2 px-3 rounded-lg transition-colors text-sm border border-primary-300 flex items-center justify-center space-x-2">
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
