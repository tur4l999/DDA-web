import { useState } from 'react'
import { Play, Maximize2, Volume2, VolumeX } from 'lucide-react'
import ThreeDVideoModal from './ThreeDVideoModal'

export default function ThreeDVideoContent() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  const videos = [
    {
      id: 1,
      title: 'Yolayrıcıda dönmə qaydaları',
      duration: '3:45',
      description: '3D animasiya ilə yolayrıcıda düzgün dönmə texnikası'
    },
    {
      id: 2,
      title: 'Ötmə manevri',
      duration: '4:12',
      description: 'Təhlükəsiz ötmə qaydaları vizual izahat ilə'
    },
    {
      id: 3,
      title: 'Parklanma üsulları',
      duration: '5:30',
      description: 'Paralel, perpendikulyar və diaqonal parklanma'
    }
  ]

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Featured Video */}
      <div className="mb-8">
        <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden relative group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary-500/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-primary-500/30 transition-all">
                <Play className="w-10 h-10 text-white" fill="currentColor" />
              </div>
              <p className="text-white font-semibold text-lg">3D Simulasiya</p>
              <p className="text-white/60 text-sm mt-1">Interaktiv öyrənmə təcrübəsi</p>
            </div>
          </div>
          
          {/* Decorative 3D elements */}
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-primary-400/30 rounded-lg rotate-12" />
          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-primary-400/30 rounded-lg -rotate-12" />
          
          {/* Fullscreen button */}
          <button 
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation()
              setIsModalOpen(true)
            }}
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">{videos[0].title}</h3>
            <p className="text-sm text-slate-500 mt-1">{videos[0].description}</p>
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Video Grid */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Digər 3D videolar</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {videos.slice(1).map((video) => (
            <button
              key={video.id}
              onClick={() => setIsModalOpen(true)}
              className="card-interactive p-0 overflow-hidden text-left"
            >
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
                <Play className="w-10 h-10 text-white/80" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-slate-900">{video.title}</h4>
                  <span className="text-xs text-slate-500">{video.duration}</span>
                </div>
                <p className="text-sm text-slate-500">{video.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ThreeDVideoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
