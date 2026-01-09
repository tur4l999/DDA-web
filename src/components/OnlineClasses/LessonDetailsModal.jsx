import { X, Calendar, Clock, User, Globe, Play, Video, AlertCircle } from 'lucide-react'

export default function LessonDetailsModal({ lesson, isOpen, onClose, onJoin, onWatchReplay }) {
  if (!isOpen || !lesson) return null

  const getStatusInfo = (status) => {
    const statusMap = {
      waiting: { label: 'Gözləyir', className: 'bg-primary-50 text-primary-700 border-primary-100', icon: '⏰' },
      started: { label: 'Aktiv', className: 'bg-green-50 text-green-700 border-green-100', icon: '🔴' },
      completed: { label: 'Tamamlandı', className: 'bg-gray-50 text-gray-700 border-gray-200', icon: '✓' },
      cancelled: { label: 'Ləğv edildi', className: 'bg-red-50 text-red-700 border-red-100', icon: '✕' }
    }
    return statusMap[status] || statusMap.waiting
  }

  const getLanguageLabel = (lang) => {
    const langMap = { az: 'Azərbaycan dili', ru: 'Rus dili', en: 'İngilis dili' }
    return langMap[lang] || lang
  }

  const formatDateTime = (date) => {
    const d = new Date(date)
    return d.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  const statusInfo = getStatusInfo(lesson.status)

  const handleAction = () => {
    if (lesson.status === 'waiting') {
      alert("Dərs başlamayıb. Dərsə saatına yaxın zamanda yenidən yoxlayın.")
    } else if (lesson.status === 'started') {
      onJoin?.(lesson)
      onClose()
    } else if (lesson.status === 'completed') {
      alert("Dərs bitmişdir, təkrarını telegramda izləyə bilərsiniz.")
    } else if (lesson.status === 'cancelled') {
      alert("Dərs ləğv edilmiş və ya başqa saata keçirilmişdir.")
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all" onClick={onClose}>
        <div 
          className="bg-white rounded-[32px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Minimal Header */}
          <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-gray-100 flex items-center justify-between z-10">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Dərs məlumatları</span>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="px-8 py-8 space-y-8">
            {/* Title and Badge */}
            <div className="space-y-4">
               <div className="flex flex-wrap items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${statusInfo.className}`}>
                    <span>{statusInfo.icon}</span>
                    <span>{statusInfo.label}</span>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200 font-mono">
                    {lesson.code}
                  </div>
               </div>
               <h3 className="text-3xl font-black text-gray-900 leading-tight">{lesson.title}</h3>
               <p className="text-xl text-gray-500 font-medium">{lesson.subject}</p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Tarix</span>
                    </div>
                    <p className="text-gray-900 font-bold">{formatDateTime(lesson.date)}</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Müddət</span>
                    </div>
                    <p className="text-gray-900 font-bold">{lesson.duration} dəqiqə</p>
                </div>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <User className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Müəllim</span>
                    </div>
                    <p className="text-gray-900 font-bold">{lesson.instructor}</p>
                </div>
                 <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                        <Globe className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Dil</span>
                    </div>
                    <p className="text-gray-900 font-bold">{getLanguageLabel(lesson.language)}</p>
                </div>
            </div>

            {/* Description */}
            {lesson.description && (
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Haqqında</h4>
                <p className="text-gray-600 leading-relaxed text-lg">{lesson.description}</p>
              </div>
            )}

            {/* Cancel Reason */}
            {lesson.status === 'cancelled' && lesson.cancelReason && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                      <h4 className="font-bold text-red-900">Ləğv səbəbi</h4>
                      <p className="text-red-700 text-sm mt-1">{lesson.cancelReason}</p>
                  </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-8 pt-0 flex gap-3">
             {lesson.status === 'started' ? (
                 <button
                    onClick={handleAction}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-xl shadow-primary-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Dərsə qoşul</span>
                  </button>
             ) : lesson.status === 'waiting' ? (
                 <button
                    onClick={handleAction}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-xl shadow-primary-200 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Dərsə qoşul</span>
                  </button>
             ) : lesson.status === 'completed' ? (
                 <button
                    onClick={handleAction}
                    className="w-full bg-gray-50 text-gray-600 font-bold py-4 px-6 rounded-2xl border-2 border-gray-200 hover:bg-gray-100 flex items-center justify-center gap-2"
                  >
                    <Video className="w-5 h-5" />
                    <span>Təkrarı telegramda izlə</span>
                  </button>
             ) : (
                <button
                    onClick={handleAction}
                    className="w-full bg-red-50 text-red-600 font-bold py-4 px-6 rounded-2xl border-2 border-red-200 hover:bg-red-100 flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Ləğv edilib</span>
                  </button>
             )}
          </div>
        </div>
      </div>
    </>
  )
}
