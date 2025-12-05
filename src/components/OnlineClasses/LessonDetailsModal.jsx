import { X, Calendar, Clock, User, Globe, Play, Video, AlertCircle } from 'lucide-react'

export default function LessonDetailsModal({ lesson, isOpen, onClose, onJoin, onWatchReplay }) {
  if (!isOpen || !lesson) return null

  const getStatusInfo = (status) => {
    const statusMap = {
      waiting: { label: 'Gözləyir', className: 'bg-blue-500 text-white', icon: '⏰' },
      started: { label: 'Başladı', className: 'bg-green-500 text-white', icon: '🔴' },
      completed: { label: 'Tamamlandı', className: 'bg-gray-500 text-white', icon: '✓' },
      cancelled: { label: 'Ləğv edildi', className: 'bg-red-500 text-white', icon: '✕' }
    }
    return statusMap[status] || statusMap.waiting
  }

  const getLanguageLabel = (lang) => {
    const langMap = { az: 'Azərbaycan dili', ru: 'Rus dili', en: 'İngilis dili' }
    return langMap[lang] || lang
  }

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('az-AZ', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const statusInfo = getStatusInfo(lesson.status)
  const canJoin = lesson.status === 'started' || (lesson.status === 'waiting' && Math.abs(lesson.date - new Date()) < 10 * 60 * 1000)
  const hasReplay = lesson.status === 'completed' && lesson.replayUrl

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-5 rounded-t-3xl flex items-center justify-between z-10">
            <h2 className="text-xl font-black text-white">Dərs Detalları</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Title and Status */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-2xl font-black text-gray-900 flex-1">{lesson.title}</h3>
                <div className={`px-4 py-2 rounded-xl text-sm font-bold ${statusInfo.className} flex items-center space-x-1.5 shadow-md whitespace-nowrap ml-3`}>
                  <span>{statusInfo.icon}</span>
                  <span>{statusInfo.label}</span>
                </div>
              </div>
              <p className="text-lg text-gray-600 font-semibold">{lesson.subject}</p>
            </div>

            {/* Description */}
            {lesson.description && (
              <div className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">Dərs haqqında</h4>
                <p className="text-gray-700 leading-relaxed">{lesson.description}</p>
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 border-2 border-blue-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Tarix və Saat</span>
                </div>
                <p className="text-lg font-black text-blue-900">{formatDateTime(lesson.date)}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 border-2 border-purple-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Müddət</span>
                </div>
                <p className="text-lg font-black text-purple-900">{lesson.duration} dəqiqə</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 border-2 border-green-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Müəllim</span>
                </div>
                <p className="text-lg font-black text-green-900">{lesson.instructor}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 border-2 border-orange-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-gray-900">Dərs dili</span>
                </div>
                <p className="text-lg font-black text-orange-900">{getLanguageLabel(lesson.language)}</p>
              </div>
            </div>

            {/* Replay Section */}
            {lesson.status === 'completed' && (
              <div className="border-t-2 border-gray-200 pt-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Video className="w-6 h-6 text-purple-600" />
                  <h4 className="text-lg font-black text-gray-900">Təkrar Video</h4>
                </div>

                {hasReplay ? (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-5">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-bold text-purple-900">Təkrar video mövcuddur</span>
                    </div>
                    <p className="text-sm text-purple-700 mb-4">Bu dərsin təkrar videosunu istədiyiniz vaxt izləyə bilərsiniz.</p>
                    <button
                      onClick={() => onWatchReplay?.(lesson)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      <span>Təkrara bax</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-gray-400" />
                      <span className="font-bold text-gray-700">Təkrar video hələ yüklənməyib</span>
                    </div>
                    <p className="text-sm text-gray-600">Dərsin təkrar videosu tezliklə əlavə ediləcək.</p>
                  </div>
                )}
              </div>
            )}

            {/* Cancelled reason */}
            {lesson.status === 'cancelled' && lesson.cancelReason && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-bold text-red-900">Ləğv səbəbi</span>
                </div>
                <p className="text-red-800">{lesson.cancelReason}</p>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-gray-50 px-6 py-4 rounded-b-3xl border-t-2 border-gray-200">
            <div className="flex gap-3">
              {canJoin && (
                <button
                  onClick={() => {
                    onJoin?.(lesson)
                    onClose()
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-black py-3.5 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>Dərsə qoşul</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 font-bold py-3.5 px-6 rounded-xl hover:bg-gray-50 transition-all"
              >
                Bağla
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
