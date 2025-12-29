import { X, Maximize2, Minimize2, RotateCcw, Play, Pause } from 'lucide-react'
import { useState } from 'react'

export default function ThreeDVideoModal({ isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/90"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-slate-900 rounded-2xl shadow-soft-xl overflow-hidden animate-scale-in ${
        isFullscreen ? 'fixed inset-4' : 'max-w-4xl w-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">3D Simulasiya</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-slate-700 rounded-xl transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-slate-400" />
              ) : (
                <Maximize2 className="w-5 h-5 text-slate-400" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Video Area */}
        <div className={`aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative ${
          isFullscreen ? 'h-[calc(100%-120px)]' : ''
        }`}>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary-500/20 rounded-full flex items-center justify-center">
              {isPlaying ? (
                <Pause className="w-12 h-12 text-white" />
              ) : (
                <Play className="w-12 h-12 text-white" fill="currentColor" />
              )}
            </div>
            <p className="text-white/60 text-lg">3D Simulasiya</p>
            <p className="text-white/40 text-sm mt-2">Yüklənir...</p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-8 left-8 w-20 h-20 border-2 border-primary-400/20 rounded-xl rotate-12" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-2 border-primary-400/20 rounded-xl -rotate-12" />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 bg-primary-600 hover:bg-primary-700 rounded-xl flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" fill="currentColor" />
              )}
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-xl transition-colors">
              <RotateCcw className="w-5 h-5 text-slate-400" />
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="flex-1 mx-6">
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-primary-500 rounded-full" />
            </div>
          </div>
          
          <span className="text-sm text-slate-400 font-medium">1:23 / 3:45</span>
        </div>
      </div>
    </div>
  )
}
