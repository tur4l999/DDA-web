import { Play, Video, Info, User, Clock, Bookmark, AlertCircle, Check } from 'lucide-react'
import { useState } from 'react'

export default function LessonCard({ lesson, onJoin, onViewDetails, onToggleBookmark }) {
  const [isBookmarked, setIsBookmarked] = useState(lesson.bookmarked || false)

  const getStatusInfo = (status) => {
    const statusMap = {
      waiting: {
        label: 'Gözləyir',
        className: 'bg-primary-50 text-primary-700 border-primary-100',
        icon: '⏰'
      },
      started: {
        label: 'Aktiv',
        className: 'bg-green-50 text-green-700 border-green-100 animate-pulse',
        icon: '🔴'
      },
      completed: {
        label: 'Tamamlandı',
        className: 'bg-gray-50 text-gray-600 border-gray-100',
        icon: '✓'
      },
      cancelled: {
        label: 'Ləğv edildi',
        className: 'bg-red-50 text-red-600 border-red-100',
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

  const getEndTime = (date, duration) => {
    const d = new Date(date)
    d.setMinutes(d.getMinutes() + duration)
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const statusInfo = getStatusInfo(lesson.status)

  const handleBookmark = (e) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    onToggleBookmark?.(lesson.id, !isBookmarked)
  }

  const handleAction = () => {
    if (lesson.status === 'waiting') {
      alert("Dərs başlamayıb. Dərsə saatına yaxın zamanda yenidən yoxlayın.")
    } else if (lesson.status === 'started') {
      onJoin?.(lesson)
    } else if (lesson.status === 'completed') {
      alert("Dərs bitmişdir, təkrarını telegramda izləyə bilərsiniz.")
    } else if (lesson.status === 'cancelled') {
      alert("Dərs ləğv edilmiş və ya başqa saata keçirilmişdir.")
    }
  }

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-4 hover:border-primary-200 transition-all duration-300 hover:shadow-lg group flex flex-col sm:flex-row gap-4 items-start sm:items-center relative overflow-hidden">

      {/* Left: Time & Duration */}
      <div className="flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:gap-1 min-w-[100px] border-b sm:border-b-0 sm:border-r border-gray-100 pb-3 sm:pb-0 sm:pr-4 w-full sm:w-auto">
         <div className="text-xl font-black text-gray-900 tracking-tight">
            {formatTime(lesson.date)}
         </div>
         <div className="text-sm font-semibold text-gray-400 flex items-center gap-1">
            <span className="hidden sm:inline">-</span>
            <span>{getEndTime(lesson.date, lesson.duration)}</span>
         </div>
         <div className="ml-auto sm:ml-0 px-2 py-0.5 rounded-md bg-gray-50 text-gray-500 text-xs font-bold flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {lesson.duration} dəq
         </div>
      </div>

      {/* Middle: Content */}
      <div className="flex-1 w-full min-w-0">
         <div className="flex flex-wrap items-center gap-2 mb-2">
             <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs font-mono font-bold tracking-wider border border-gray-200">
               {lesson.code || '####'}
             </span>
             <span className={`px-2 py-0.5 rounded-md text-xs font-bold border ${
               lesson.language === 'az' ? 'bg-blue-50 text-blue-600 border-blue-100' :
               lesson.language === 'ru' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-gray-50 text-gray-600 border-gray-200'
             }`}>
               {getLanguageLabel(lesson.language)}
             </span>
             <div className={`px-2 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1 ${statusInfo.className}`}>
                <span>{statusInfo.icon}</span>
                <span>{statusInfo.label}</span>
             </div>
         </div>

         <h3 className="text-lg font-black text-gray-900 truncate pr-8 mb-1 group-hover:text-primary-600 transition-colors cursor-pointer" onClick={() => onViewDetails?.(lesson)}>
            {lesson.title}
         </h3>

         <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
            <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {lesson.instructor}
            </div>
            <span className="hidden sm:inline text-gray-300">•</span>
            <span className="truncate">{lesson.subject}</span>
         </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center justify-end w-full sm:w-auto gap-2 mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
         <button
            onClick={handleBookmark}
            className={`p-2.5 rounded-xl transition-all ${
              isBookmarked 
                ? 'bg-yellow-50 text-yellow-500'
                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

         {/* Dynamic Status Button */}
         {lesson.status === 'started' ? (
             <button
                onClick={handleAction}
                className="flex-1 sm:flex-none bg-primary-500 hover:bg-primary-600 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 min-w-[140px]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Dərsə Başla</span>
              </button>
         ) : lesson.status === 'waiting' ? (
             <button
                onClick={handleAction}
                className="flex-1 sm:flex-none bg-primary-500 hover:bg-primary-600 text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center space-x-2 min-w-[140px]"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Dərsə Başla</span>
              </button>
         ) : lesson.status === 'completed' ? (
            <button
                onClick={handleAction}
                className="flex-1 sm:flex-none bg-gray-50 text-gray-600 font-bold py-2.5 px-5 rounded-xl border-2 border-gray-200 hover:bg-gray-100 flex items-center justify-center space-x-2 min-w-[140px]"
            >
                <Check className="w-4 h-4" />
                <span>Tamamlandı</span>
            </button>
         ) : (
            <button
                onClick={handleAction}
                className="flex-1 sm:flex-none py-2.5 px-5 border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all flex items-center justify-center space-x-2 min-w-[140px]"
            >
                <AlertCircle className="w-4 h-4" />
                <span>Ləğv edilib</span>
            </button>
         )}

         {/* Details button is now mainly for 'Info', but status button is primary action */}
         <button
            onClick={() => onViewDetails?.(lesson)}
            className="p-2.5 border-2 border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center"
         >
            <Info className="w-5 h-5" />
         </button>

      </div>

    </div>
  )
}
