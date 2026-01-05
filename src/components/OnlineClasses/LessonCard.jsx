import { Calendar, Clock, User, Globe, Bookmark, Info, Send, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function LessonCard({ lesson, onJoin, onViewDetails, onToggleBookmark }) {
  const [isBookmarked, setIsBookmarked] = useState(lesson.bookmarked || false)

  const getStatusInfo = (status) => {
    const statusMap = {
      waiting: {
        label: 'Gözlənilir',
        className: 'bg-gray-100 text-gray-600 border-gray-200',
        icon: '⏰'
      },
      started: {
        label: 'Canlı Yayım',
        className: 'bg-red-50 text-red-600 border-red-200 animate-pulse',
        icon: '🔴'
      },
      completed: {
        label: 'Bitdi',
        className: 'bg-gray-50 text-gray-400 border-gray-100',
        icon: '✓'
      },
      cancelled: {
        label: 'Ləğv',
        className: 'bg-red-50 text-red-500 border-red-100',
        icon: '✕'
      }
    }
    return statusMap[status] || statusMap.waiting
  }

  const getLanguageLabel = (lang) => {
    const langMap = { az: 'AZ', ru: 'RU', en: 'EN' }
    return langMap[lang] || lang.toUpperCase()
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
    <div className={`
      relative bg-white rounded-2xl border-2 p-5 transition-all duration-300 group
      ${lesson.status === 'started' ? 'border-red-100 shadow-lg shadow-red-100/50' : 'border-gray-100 hover:border-primary-200 hover:shadow-lg'}
    `}>
      {/* Time Stripe for visual flow */}
      <div className="absolute left-0 top-6 w-1 h-8 bg-gray-200 rounded-r-full group-hover:bg-primary-500 transition-colors" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 pl-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl font-black text-gray-900 tracking-tight">{formatTime(lesson.date)}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${statusInfo.className} flex items-center gap-1.5`}>
              <span className={lesson.status === 'started' ? 'animate-bounce' : ''}>{statusInfo.icon}</span>
              <span>{statusInfo.label}</span>
            </div>
          </div>
          <h3 className="text-lg font-black text-gray-900 group-hover:text-primary-600 transition-colors mb-1 line-clamp-2">
            {lesson.title}
          </h3>
          <p className="text-sm text-gray-500 font-medium">{lesson.subject}</p>
        </div>
        
        <button
          onClick={handleBookmark}
          className={`p-2 rounded-xl transition-all ml-2 ${
            isBookmarked
              ? 'bg-yellow-50 text-yellow-500'
              : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}
        >
          <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Instructor & Meta */}
      <div className="flex items-center justify-between mb-5 pl-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
             {/* Fallback avatar */}
             <User className="w-5 h-5 text-gray-400" />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-bold">Müəllim</p>
            <p className="text-sm font-bold text-gray-900">{lesson.instructor}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
           <div className="px-2.5 py-1 rounded-md bg-gray-100 text-xs font-bold text-gray-600 uppercase">
             {getLanguageLabel(lesson.language)}
           </div>
           <div className="px-2.5 py-1 rounded-md bg-gray-100 text-xs font-bold text-gray-600">
             {lesson.duration} dəq
           </div>
        </div>
      </div>

      {/* Completed State Message */}
      {lesson.status === 'completed' && (
        <div className="mb-4 mx-3 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-blue-700 mb-0.5">Dərs bitib</p>
            <p className="text-xs text-blue-600 leading-snug">
              Video izahı Telegram kanalımızda izləyə bilərsiniz.
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pl-3">
        {/* Join Button */}
        {(lesson.status === 'started' || canJoin) ? (
           <button
             onClick={() => onJoin?.(lesson)}
             className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-red-200 hover:shadow-red-300 flex items-center justify-center gap-2"
           >
             <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
             <span>Canlıya Qoşul</span>
           </button>
        ) : lesson.status === 'completed' ? (
           <a
             href="https://t.me/avtoimtahan"
             target="_blank"
             rel="noopener noreferrer"
             className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 flex items-center justify-center gap-2"
           >
             <Send className="w-4 h-4" />
             <span>Telegrama Keç</span>
           </a>
        ) : (
           <button
             disabled
             className="flex-1 bg-gray-100 text-gray-400 font-bold py-3 px-4 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
           >
             <Clock className="w-4 h-4" />
             <span>Gözlənilir</span>
           </button>
        )}

        <button
          onClick={() => onViewDetails?.(lesson)}
          className="px-4 py-3 bg-white border-2 border-gray-100 text-gray-600 hover:border-gray-300 hover:text-gray-900 font-bold rounded-xl transition-all"
        >
          <Info className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
