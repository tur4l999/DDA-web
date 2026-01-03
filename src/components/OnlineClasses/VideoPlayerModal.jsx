import { X, Calendar, User, Globe, Clock } from 'lucide-react'

export default function VideoPlayerModal({ lesson, isOpen, onClose }) {
  if (!isOpen || !lesson) return null

  const getLanguageLabel = (lang) => {
    const langMap = { az: 'AZ', ru: 'RU', en: 'EN' }
    return langMap[lang] || lang.toUpperCase()
  }

  const formatDateTime = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-600 px-6 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-black text-white mb-1">{lesson.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-primary-100">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-semibold">{formatDateTime(lesson.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span className="font-semibold">{lesson.instructor}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="w-4 h-4" />
                  <span className="font-semibold">{getLanguageLabel(lesson.language)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="font-semibold">{lesson.duration} dəq</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors ml-4"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            {lesson.replayUrl ? (
              // Əgər video URL-i varsa
              lesson.replayUrl.includes('youtube.com') || lesson.replayUrl.includes('youtu.be') ? (
                <iframe
                  src={lesson.replayUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={lesson.title}
                />
              ) : (
                <video
                  src={lesson.replayUrl}
                  controls
                  className="w-full h-full"
                  autoPlay
                >
                  Brauzeriniz video formatını dəstəkləmir.
                </video>
              )
            ) : (
              // Video yoxdursa
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 font-bold text-lg">Video yüklənir...</p>
                </div>
              </div>
            )}
          </div>

          {/* Metadata Footer */}
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-semibold mb-1">Mövzu</p>
                <p className="text-white font-bold">{lesson.subject}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm font-semibold mb-1">Status</p>
                <p className="text-green-400 font-bold">Təkrar video</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
