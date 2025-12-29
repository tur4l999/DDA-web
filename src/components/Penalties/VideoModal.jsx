import { X } from 'lucide-react'

export default function VideoModal({ penalty, isOpen, onClose }) {
  if (!isOpen || !penalty) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-soft-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">{penalty.title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-slate-900">
          {penalty.videoUrl ? (
            <iframe
              src={penalty.videoUrl}
              className="w-full h-full"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-slate-400">Video tezliklə əlavə olunacaq</p>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-6 py-4 bg-surface-50">
          <div className="flex items-center gap-4">
            <span className="badge-primary">
              {penalty.fineRange}
            </span>
            {penalty.videoDuration && (
              <span className="text-sm text-slate-500">
                {penalty.videoDuration}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
