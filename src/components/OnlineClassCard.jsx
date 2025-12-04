import { Clock, User, Bell } from 'lucide-react'

export default function OnlineClassCard() {
  const classes = [
    {
      id: 1,
      title: 'Mənzil 3.1. Yol nişanları',
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
    <div className="space-y-4">
      {classes.map((cls) => (
        <div key={cls.id} className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl border border-primary-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-sm font-bold text-gray-900 line-clamp-2 flex-1">{cls.title}</h4>
            <span className={`${getStatusColor(cls.status)} px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2`}>
              {getStatusLabel(cls.status)}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center space-x-2 text-gray-700">
              <User className="w-4 h-4" />
              <span>{cls.instructor}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-700">
              <Clock className="w-4 h-4" />
              <span>{formatDate(cls.date)} ({cls.duration} dəq)</span>
            </div>
          </div>

          {cls.status === 'started' && (
            <button className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm">
              Canlı Qoşul
            </button>
          )}

          {cls.status === 'waiting' && (
            <button className="w-full mt-3 bg-white hover:bg-gray-50 text-primary-600 font-medium py-2 px-3 rounded-lg transition-colors text-sm border border-primary-300 flex items-center justify-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Xatırladat</span>
            </button>
          )}
        </div>
      ))}
    </div>
  )
}
