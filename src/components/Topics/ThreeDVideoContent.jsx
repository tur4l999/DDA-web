import { Play, Clock } from 'lucide-react'
import { useState } from 'react'
import ThreeDVideoModal from './ThreeDVideoModal'

const videos = [
  {
    id: 1,
    title: 'Yol nişanlarının yerləşdirilməsi',
    thumbnail: 'https://via.placeholder.com/640x360/007A3A/FFFFFF?text=3D+Video',
    duration: '12:40',
    topic: 'M1',
    views: '1.2K'
  },
  {
    id: 2,
    title: 'Qoşulma və ayrılma qaydaları',
    thumbnail: 'https://via.placeholder.com/640x360/005A2A/FFFFFF?text=3D+Video',
    duration: '8:15',
    topic: 'M2',
    views: '850'
  },
  {
    id: 3,
    title: 'Döngələrdə hərəkət etmə',
    thumbnail: 'https://via.placeholder.com/640x360/007A3A/FFFFFF?text=3D+Video',
    duration: '15:22',
    topic: 'M3',
    views: '2.1K'
  },
  {
    id: 4,
    title: 'Park etmə qaydaları',
    thumbnail: 'https://via.placeholder.com/640x360/005A2A/FFFFFF?text=3D+Video',
    duration: '10:05',
    topic: 'M4',
    views: '1.5K'
  },
  {
    id: 5,
    title: 'Əsas yol və keçid haqqı',
    thumbnail: 'https://via.placeholder.com/640x360/007A3A/FFFFFF?text=3D+Video',
    duration: '9:30',
    topic: 'M1',
    views: '980'
  },
  {
    id: 6,
    title: 'Piyadalara yol vermə',
    thumbnail: 'https://via.placeholder.com/640x360/005A2A/FFFFFF?text=3D+Video',
    duration: '7:45',
    topic: 'M2',
    views: '1.8K'
  }
]

export default function ThreeDVideoContent() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = (video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">3D Video Dərslər</h2>
          <p className="text-sm text-gray-600">İnteraktiv 3D videolarla daha yaxşı öyrən</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <div
              key={video.id}
              onClick={() => handleVideoClick(video)}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#007A3A] transition-all cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-100 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Play overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
                    <Play className="w-8 h-8 text-[#007A3A] ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {video.duration}
                </div>

                {/* Topic badge */}
                <div className="absolute top-2 left-2 bg-[#007A3A] text-white text-xs font-bold px-2 py-1 rounded">
                  {video.topic}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-[#007A3A] transition-colors">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{video.views} baxış</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <ThreeDVideoModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
