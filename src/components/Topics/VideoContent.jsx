import { Play, Check } from 'lucide-react'
import { useState } from 'react'

export default function VideoContent() {
  const [watchedVideos, setWatchedVideos] = useState([])

  const videos = [
    { id: 1, title: 'Yol nişanlarına giriş', duration: '12:34', thumbnail: null },
    { id: 2, title: 'Qadağan edən nişanlar', duration: '08:15', thumbnail: null },
    { id: 3, title: 'Məcburi nişanlar', duration: '10:42', thumbnail: null }
  ]

  const toggleWatched = (videoId) => {
    setWatchedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    )
  }

  if (videos.length === 0) {
    return (
      <div className="max-w-[860px] mx-auto">
        <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <Play className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-600 font-medium mb-1">Bu mövzuda video yoxdur</p>
          <p className="text-sm text-gray-500">Tezliklə əlavə ediləcək</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Main Video Player */}
      <div className="mb-6">
        <div className="aspect-video bg-gray-900 rounded-xl overflow-hidden mb-4">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Play className="w-10 h-10 text-white" />
              </div>
              <p className="text-white font-medium">Video oynatıcı</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{videos[0].title}</h3>
            <p className="text-sm text-gray-500">{videos[0].duration}</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={watchedVideos.includes(videos[0].id)}
              onChange={() => toggleWatched(videos[0].id)}
              className="w-4 h-4 text-[#007A3A] rounded focus:ring-[#007A3A]"
            />
            <span className="text-sm font-medium text-gray-700">Videonu izlədim</span>
          </label>
        </div>
      </div>

      {/* Video List */}
      {videos.length > 1 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Video siyahısı</h3>
          <div className="space-y-2">
            {videos.map((video, index) => (
              <button
                key={video.id}
                className="w-full flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#007A3A] hover:shadow-sm transition-all group"
              >
                <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Play className="w-8 h-8 text-gray-400 group-hover:text-[#007A3A] transition-colors" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">Video {index + 1}</span>
                    {watchedVideos.includes(video.id) && (
                      <Check className="w-4 h-4 text-[#007A3A]" />
                    )}
                  </div>
                  <p className="font-medium text-gray-900 group-hover:text-[#007A3A] transition-colors">
                    {video.title}
                  </p>
                  <p className="text-sm text-gray-500">{video.duration}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
