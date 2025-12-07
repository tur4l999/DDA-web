import { Play, AlertCircle, Info, Clock, Scale } from 'lucide-react'
import { useState } from 'react'

export default function PenaltiesContent({ topicRelated = false, onVideoClick }) {
  const [filter, setFilter] = useState('all')

  // Mövzuya bağlı cərimələr (example data)
  const penalties = [
    {
      id: 1,
      title: 'Sürət limitinin pozulması',
      fineRange: '40-200',
      fineMin: 40,
      fineMax: 200,
      description: 'Müəyyən edilmiş sürət limitindən artıq sürətlə hərəkət etmə',
      article: 'İXM maddə 124.1',
      hasVideo: true,
      videoDuration: '2:15',
      videoThumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
      isCommon: true,
      severity: 'high'
    },
    {
      id: 2,
      title: 'Qadağan edən nişanın pozulması',
      fineRange: '60-150',
      fineMin: 60,
      fineMax: 150,
      description: 'Qadağan edən yol nişanlarına əməl edilməməsi',
      article: 'İXM maddə 125.2',
      hasVideo: true,
      videoDuration: '1:45',
      videoThumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
      isCommon: true,
      severity: 'medium'
    },
    {
      id: 3,
      title: 'Təhlükəsizlik kəmərinin taxılmaması',
      fineRange: '30-50',
      fineMin: 30,
      fineMax: 50,
      description: 'Sürücü və sərnişinlərin təhlükəsizlik kəməri taxmaması',
      article: 'İXM maddə 122.3',
      hasVideo: true,
      videoDuration: '1:20',
      videoThumbnail: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400',
      isCommon: false,
      severity: 'low'
    },
    {
      id: 4,
      title: 'Qırmızı işıqda keçmək',
      fineRange: '100-200',
      fineMin: 100,
      fineMax: 200,
      description: 'Svetoforun qırmızı siqnalında hərəkət etmə',
      article: 'İXM maddə 126.4',
      hasVideo: true,
      videoDuration: '2:30',
      videoThumbnail: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?w=400',
      isCommon: true,
      severity: 'high'
    },
    {
      id: 5,
      title: 'Mobil telefon istifadəsi',
      fineRange: '50-100',
      fineMin: 50,
      fineMax: 100,
      description: 'Sürət zamanı mobil telefon istifadə edilməsi',
      article: 'İXM maddə 123.5',
      hasVideo: true,
      videoDuration: '1:50',
      videoThumbnail: 'https://images.unsplash.com/photo-1512941675424-1c7b94c55e86?w=400',
      isCommon: true,
      severity: 'medium'
    },
    {
      id: 6,
      title: 'Piyada keçidində dayanmamaq',
      fineRange: '80-150',
      fineMin: 80,
      fineMax: 150,
      description: 'Piyada keçidində piyadaya yol verməmək',
      article: 'İXM maddə 124.8',
      hasVideo: true,
      videoDuration: '2:05',
      videoThumbnail: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400',
      isCommon: true,
      severity: 'high'
    }
  ]

  const filteredPenalties = penalties.filter(p => {
    if (filter === 'common') return p.isCommon
    if (filter === 'video') return p.hasVideo
    return true
  })

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'high': return 'from-red-500 to-red-600'
      case 'medium': return 'from-orange-500 to-orange-600'
      case 'low': return 'from-yellow-500 to-yellow-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getSeverityBg = (severity) => {
    switch(severity) {
      case 'high': return 'bg-red-50 border-red-200'
      case 'medium': return 'bg-orange-50 border-orange-200'
      case 'low': return 'bg-yellow-50 border-yellow-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto">
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

      {/* Penalties list - Compact cards with embedded small videos */}
      <div className="space-y-4">
        {filteredPenalties.map(penalty => (
          <div
            key={penalty.id}
            className="bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-[#007A3A] transition-all"
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                {/* Left side: Icon + Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-3">
                    {/* Icon */}
                    <div className={`w-10 h-10 bg-gradient-to-br ${getSeverityColor(penalty.severity)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <AlertCircle className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>

                    {/* Title & Fine */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-gray-900 mb-1">{penalty.title}</h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className={`bg-gradient-to-br ${getSeverityColor(penalty.severity)} text-white px-3 py-1 rounded-lg text-sm font-bold`}>
                          {penalty.fineMin}-{penalty.fineMax} AZN
                        </div>
                        {penalty.article && (
                          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {penalty.article}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">{penalty.description}</p>
                </div>

                {/* Right side: Small video thumbnail (YouTube style) */}
                {penalty.hasVideo && (
                  <button
                    onClick={() => onVideoClick?.(penalty)}
                    className="group w-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-[#007A3A] transition-all"
                  >
                    <div className="relative aspect-video bg-gray-200">
                      <img 
                        src={penalty.videoThumbnail} 
                        alt={penalty.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                      
                      {/* Play overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/95 group-hover:bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-md">
                          <Play className="w-4 h-4 text-[#007A3A] ml-0.5" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                        {penalty.videoDuration}
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
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
