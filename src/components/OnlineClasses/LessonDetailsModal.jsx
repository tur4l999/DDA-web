import { X, Calendar, Clock, User, Globe, Play, Video, MapPin } from 'lucide-react'

export default function LessonDetailsModal({ lesson, isOpen, onClose, onJoin, onWatchReplay }) {
  if (!isOpen || !lesson) return null

  const getStatusInfo = (status) => {
    const statusMap = {
      waiting: { label: 'Gözləyir', className: 'bg-primary-50 text-primary-700' },
      started: { label: 'Başladı', className: 'bg-accent-50 text-accent-700' },
      completed: { label: 'Tamamlandı', className: 'bg-slate-100 text-slate-600' },
      cancelled: { label: 'Ləğv edildi', className: 'bg-red-50 text-red-600' }
    }
    return statusMap[status] || statusMap.waiting
  }

  const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  const statusInfo = getStatusInfo(lesson.status)
  const hasReplay = lesson.status === 'completed' && lesson.replayUrl
  const canJoin = lesson.status === 'started'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-soft-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="gradient-primary px-6 py-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          <span className={`inline-block ${statusInfo.className} px-3 py-1 rounded-lg text-xs font-medium mb-3`}>
            {statusInfo.label}
          </span>
          <h2 className="text-xl font-bold text-white mb-1">{lesson.title}</h2>
          <p className="text-primary-100">{lesson.subject}</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
              <Calendar className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-xs text-slate-500">Tarix</p>
                <p className="text-sm font-semibold text-slate-900">{formatDate(lesson.date)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
              <Clock className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-xs text-slate-500">Müddət</p>
                <p className="text-sm font-semibold text-slate-900">{lesson.duration} dəq</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
              <User className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-xs text-slate-500">Müəllim</p>
                <p className="text-sm font-semibold text-slate-900">{lesson.instructor}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
              <Globe className="w-5 h-5 text-primary-500" />
              <div>
                <p className="text-xs text-slate-500">Dil</p>
                <p className="text-sm font-semibold text-slate-900">
                  {lesson.language === 'az' ? 'Azərbaycan' : lesson.language === 'ru' ? 'Русский' : 'English'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {lesson.description && (
            <div>
              <h4 className="text-sm font-semibold text-slate-800 mb-2">Təsvir</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{lesson.description}</p>
            </div>
          )}

          {/* Replay indicator */}
          {hasReplay && (
            <div className="p-3 bg-violet-50 border border-violet-100 rounded-xl flex items-center gap-2">
              <Video className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Təkrar video mövcuddur</span>
            </div>
          )}

          {/* Cancelled reason */}
          {lesson.status === 'cancelled' && lesson.cancelReason && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-700">{lesson.cancelReason}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          {canJoin && (
            <button
              onClick={() => {
                onJoin(lesson)
                onClose()
              }}
              className="flex-1 btn-primary py-3"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Dərsə qoşul</span>
            </button>
          )}

          {hasReplay && (
            <button
              onClick={() => {
                onWatchReplay(lesson)
                onClose()
              }}
              className="flex-1 btn-primary py-3"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Təkrara bax</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="btn-secondary py-3 px-6"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  )
}
