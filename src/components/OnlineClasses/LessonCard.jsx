import { Calendar, Clock, User, Globe, Bookmark, Play, Video, Info } from 'lucide-react'
import { useState } from 'react'

export default function LessonCard({ lesson, onJoin, onViewDetails, onToggleBookmark }) {
  const [isBookmarked, setIsBookmarked] = useState(lesson.bookmarked || false)

  const getStatusInfo = (status) => {
    const statusMap = {
      waiting: {
        label: 'Gözləyir',
        className: 'bg-primary-500 text-white',
        icon: '⏰'
      },
      started: {
        label: 'Başladı',
        className: 'bg-green-500 text-white',
        icon: '🔴'
      },
      completed: {
        label: 'Tamamlandı',
        className: 'bg-gray-500 text-white',
        icon: '✓'
      },
      cancelled: {
        label: 'Ləğv edildi',
        className: 'bg-red-500 text-white',
        icon: '✕'
      }
    }
    return statusMap[status] || statusMap.waiting
  }

  const getLanguageLabel = (lang) => {
    const langMap = { az: 'AZ', ru: 'RU', en: 'EN' }
    return langMap[lang] || lang.toUpperCase()
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    return `${day}.${month}.${year}`
  }

  const formatTime = (date) => {
    const d = new Date(date)
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const statusInfo = getStatusInfo(lesson.status)
  const canJoin = lesson.status === 'started' || (lesson.status === 'waiting' && Math.abs(lesson.date - new Date()) < 10 * 60 * 1000)

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onToggleBookmark?.(lesson.id, !isBookmarked)
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-5 hover:shadow-xl transition-all duration-300 hover:border-primary-200 group relative overflow-hidden">
      {/* Top Bar with Code and Language */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
         <div className="flex items-center gap-2">
             <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-mono font-bold tracking-wider">
               {lesson.code || '####'}
             </span>
             <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
               lesson.language === 'az' ? 'bg-blue-50 text-blue-600' :
               lesson.language === 'ru' ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-600'
             }`}>
               {getLanguageLabel(lesson.language)}
             </span>
         </div>
         <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusInfo.className} flex items-center space-x-1`}>
            <span>{statusInfo.icon}</span>
            <span>{statusInfo.label}</span>
         </div>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-bold text-gray-900">{formatDate(lesson.date)}</span>
            <span className="text-sm font-bold text-primary-600">{formatTime(lesson.date)}</span>
          </div>
          <h3 className="text-lg font-black text-gray-900 group-hover:text-primary-600 transition-colors mb-1">
            {lesson.title}
          </h3>
          <p className="text-sm text-gray-600 font-medium">{lesson.subject}</p>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-lg transition-all ${
              isBookmarked 
                ? 'bg-yellow-100 text-yellow-600' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3">
          <Clock className="w-4 h-4 text-primary-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 font-semibold">Müddət</p>
            <p className="text-sm font-bold text-gray-900">{lesson.duration} dəq</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3">
          <Globe className="w-4 h-4 text-primary-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 font-semibold">Dil</p>
            <p className="text-sm font-bold text-gray-900">{getLanguageLabel(lesson.language)}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3 col-span-2">
          <User className="w-4 h-4 text-primary-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-gray-500 font-semibold">Müəllim</p>
            <p className="text-sm font-bold text-gray-900">{lesson.instructor}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {/* Primary action based on status */}
        {lesson.status === 'started' && (
          <button
            onClick={() => onJoin?.(lesson)}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Dərsə qoşul</span>
          </button>
        )}

        {lesson.status === 'waiting' && canJoin && (
          <button
            onClick={() => onJoin?.(lesson)}
            className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Dərsə qoşul</span>
          </button>
        )}

        {/* Completed State - Disabled Telegram Button */}
        {lesson.status === 'completed' && (
          <button
            disabled
            className="flex-1 bg-gray-50 text-gray-400 font-semibold py-3 px-4 rounded-xl border-2 border-gray-100 cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Video className="w-4 h-4" />
            <span>Təkrarı telegramda izlə</span>
          </button>
        )}

        {/* Secondary action - Details */}
        <button
          onClick={() => onViewDetails?.(lesson)}
          className={`px-4 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center space-x-2 ${
             lesson.status === 'cancelled' ? 'w-full' : ''
          }`}
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Detallara bax</span>
        </button>
      </div>
    </div>
  )
}
