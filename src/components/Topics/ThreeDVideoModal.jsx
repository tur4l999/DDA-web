import { X, Maximize, Download, Share2 } from 'lucide-react'

export default function ThreeDVideoModal({ video, isOpen, onClose }) {
  if (!isOpen || !video) return null

  const handleFullscreen = () => {
    const elem = document.getElementById('video-player')
    if (elem) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-4 flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white">{video.title}</h3>
              <p className="text-sm text-white/70">{video.topic} • {video.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleFullscreen}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
                title="Tam ekran"
              >
                <Maximize className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={onClose}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Video Player */}
          <div id="video-player" className="bg-black aspect-video relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <div className="text-4xl">🎬</div>
                </div>
                <p className="text-sm opacity-70">Video player buraya inteqrasiya olunacaq</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 bg-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
                <Share2 className="w-4 h-4" />
                Paylaş
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                Yüklə
              </button>
            </div>
            <div className="text-sm text-gray-400">
              {video.views} baxış
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
