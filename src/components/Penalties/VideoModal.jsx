import { X } from 'lucide-react'

export default function VideoModal({ penalty, isOpen, onClose }) {
  if (!isOpen || !penalty) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">{penalty.title}</h2>
              <p className="text-sm text-gray-400">{penalty.fineRange}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Video Player */}
          <div className="relative bg-black aspect-video">
            {penalty.videoUrl ? (
              <video
                src={penalty.videoUrl}
                controls
                className="w-full h-full"
                autoPlay
              >
                Brauzeriniz video formatını dəstəkləmir.
              </video>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 font-medium">Video yüklənir...</p>
                </div>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="bg-gray-800 px-6 py-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Müddət: {penalty.videoDuration}</span>
              <span>•</span>
              <span>Dil: Azərbaycan</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
