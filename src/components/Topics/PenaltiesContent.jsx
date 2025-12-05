import { Play, AlertCircle, Info } from 'lucide-react'
import { useState } from 'react'

export default function PenaltiesContent({ topicRelated = false, onVideoClick }) {
  const [filter, setFilter] = useState('all')

  // Mövzuya bağlı cərimələr (example data)
  const penalties = [
    {
      id: 1,
      title: 'Sürət limitinin pozulması',
      fineRange: '40-200 manat',
      description: 'Müəyyən edilmiş sürət limitindən artıq sürətlə hərəkət etmə',
      article: 'İXM maddə 124.1',
      hasVideo: true,
      videoDuration: '2:15',
      isCommon: true
    },
    {
      id: 2,
      title: 'Qadağan edən nişanın pozulması',
      fineRange: '60-150 manat',
      description: 'Qadağan edən yol nişanlarına əməl edilməməsi',
      article: 'İXM maddə 125.2',
      hasVideo: true,
      videoDuration: '1:45',
      isCommon: true
    },
    {
      id: 3,
      title: 'Təhlükəsizlik kəmərinin taxılmaması',
      fineRange: '30-50 manat',
      description: 'Sürücü və sərnişinlərin təhlükəsizlik kəməri taxmaması',
      article: 'İXM maddə 122.3',
      hasVideo: true,
      videoDuration: '1:20',
      isCommon: false
    }
  ]

  const filteredPenalties = penalties.filter(p => {
    if (filter === 'common') return p.isCommon
    if (filter === 'video') return p.hasVideo
    return true
  })

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Context info */}
      {topicRelated && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">Bu mövzu üzrə əlaqəli cərimələr</p>
            <p className="text-xs text-blue-700">Yalnız bu mövzu ilə əlaqəli inzibati xətalar göstərilir</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-[#007A3A] text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Hamısı
        </button>
        <button
          onClick={() => setFilter('common')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            filter === 'common'
              ? 'bg-[#007A3A] text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Ən çox rast gəlinən
        </button>
        <button
          onClick={() => setFilter('video')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            filter === 'video'
              ? 'bg-[#007A3A] text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Video olanlar
        </button>
      </div>

      {/* Penalties list */}
      <div className="space-y-4">
        {filteredPenalties.map(penalty => (
          <div
            key={penalty.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-[#007A3A] transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{penalty.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{penalty.description}</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-[#007A3A]">{penalty.fineRange}</span>
                  {penalty.article && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{penalty.article}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Video preview */}
            {penalty.hasVideo && (
              <button
                onClick={() => onVideoClick?.(penalty)}
                className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden relative group hover:bg-gray-200 transition-colors"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-gray-700 fill-gray-700" />
                  </div>
                </div>

                {/* Metadata overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="font-medium">{penalty.videoDuration}</span>
                    <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">AZ</span>
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredPenalties.length === 0 && (
        <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl">
          <p className="text-gray-600 font-medium mb-1">Heç bir nəticə tapılmadı</p>
          <p className="text-sm text-gray-500">Başqa filtr seçin</p>
        </div>
      )}
    </div>
  )
}
