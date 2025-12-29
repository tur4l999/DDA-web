import { Calendar, Clock, User, Globe, Bookmark, Play, Video, Info } from 'lucide-react'
import { useState } from 'react'

export default function LessonCard({ lesson, onJoin, onViewDetails, onWatchReplay, onToggleBookmark }) {
  const [isBookmarked, setIsBookmarked] = useState(lesson.bookmarked || false)

  const getStatusInfo = (status) => {
    const statusMap = {
      waiting: {
        label: 'Gözləyir',
        className: 'bg-primary-50 text-primary-700',
        icon: '⏰'
      },
      started: {
        label: 'Başladı',
        className: 'bg-accent-50 text-accent-700',
        icon: '🔴'
      },
      completed: {
        label: 'Tamamlandı',
        className: 'bg-slate-100 text-slate-600',
        icon: '✓'
      },
      cancelled: {
        label: 'Ləğv edildi',
        className: 'bg-red-50 text-red-600',
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
  const hasReplay = lesson.status === 'completed' && lesson.replayUrl

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    onToggleBookmark?.(lesson.id, !isBookmarked)
  }

  return (
    <div className="card-interactive p-5 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-900">{formatDate(lesson.date)}</span>
            <span className="text-sm font-semibold text-primary-600">{formatTime(lesson.date)}</span>
          </div>
          <h3 className="text-base font-semibold text-slate-900 group-hover:text-primary-600 transition-colors mb-1">
            {lesson.title}
          </h3>
          <p className="text-sm text-slate-500">{lesson.subject}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`${statusInfo.className} px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1`}>
            <span>{statusInfo.icon}</span>
            <span>{statusInfo.label}</span>
          </span>
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-xl transition-all ${
              isBookmarked 
                ? 'bg-amber-50 text-amber-500' 
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-500'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <div className="flex items-center gap-2 bg-surface-50 rounded-xl p-3">
          <Globe className="w-4 h-4 text-primary-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-500">Dil</p>
            <p className="text-sm font-semibold text-slate-900">{getLanguageLabel(lesson.language)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-surface-50 rounded-xl p-3">
          <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-500">Müddət</p>
            <p className="text-sm font-semibold text-slate-900">{lesson.duration} dəq</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-surface-50 rounded-xl p-3 col-span-2">
          <User className="w-4 h-4 text-primary-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-500">Müəllim</p>
            <p className="text-sm font-semibold text-slate-900">{lesson.instructor}</p>
          </div>
        </div>
      </div>

      {/* Replay indicator */}
      {hasReplay && (
        <div className="mb-4 p-3 bg-violet-50 border border-violet-100 rounded-xl flex items-center gap-2">
          <Video className="w-4 h-4 text-violet-600" />
          <span className="text-sm font-medium text-violet-700">Təkrar video mövcuddur</span>
        </div>
      )}

      {lesson.status === 'completed' && !hasReplay && (
        <div className="mb-4 p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2">
          <Video className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-500">Təkrar video hələ yüklənməyib</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {lesson.status === 'started' && (
          <button
            onClick={() => onJoin?.(lesson)}
            className="flex-1 btn-primary py-3 text-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Dərsə qoşul</span>
          </button>
        )}

        {lesson.status === 'waiting' && canJoin && (
          <button
            onClick={() => onJoin?.(lesson)}
            className="flex-1 btn-primary py-3 text-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Dərsə qoşul</span>
          </button>
        )}

        {lesson.status === 'completed' && hasReplay && (
          <button
            onClick={() => onWatchReplay?.(lesson)}
            className="flex-1 btn-primary py-3 text-sm"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Təkrara bax</span>
          </button>
        )}

        <button
          onClick={() => onViewDetails?.(lesson)}
          className="btn-secondary py-3 px-4"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">Detallara bax</span>
        </button>
      </div>
    </div>
  )
}
