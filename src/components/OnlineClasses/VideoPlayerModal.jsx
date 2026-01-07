import { X } from 'lucide-react'

export default function VideoPlayerModal({ lesson, isOpen, onClose }) {
  if (!isOpen || !lesson) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden relative animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        <iframe
          src={lesson.replayUrl}
          title={lesson.title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}
