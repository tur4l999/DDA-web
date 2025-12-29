import { X } from 'lucide-react'

export default function VideoPlayerModal({ lesson, isOpen, onClose }) {
  if (!isOpen || !lesson) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/90"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-slate-900 rounded-2xl shadow-soft-xl max-w-4xl w-full overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">{lesson.title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black">
          {lesson.replayUrl ? (
            <iframe
              src={lesson.replayUrl}
              className="w-full h-full"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-slate-400">Video mövcud deyil</p>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-6 py-4 bg-slate-800/50">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>{lesson.instructor}</span>
            <span>•</span>
            <span>{lesson.duration} dəq</span>
          </div>
        </div>
      </div>
    </div>
  )
}
