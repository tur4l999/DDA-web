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

      {/* Penalties list - PROMINENT CARDS */}
      <div className="space-y-5 mb-10">
        {filteredPenalties.map(penalty => (
          <div
            key={penalty.id}
            className={`bg-white border-2 rounded-2xl overflow-hidden hover:shadow-2xl transition-all ${getSeverityBg(penalty.severity)}`}
          >
            <div className="p-6">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${getSeverityColor(penalty.severity)} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <AlertCircle className="w-7 h-7 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">{penalty.title}</h3>
                    
                    {/* Fine amount - PROMINENT */}
                    <div className={`bg-gradient-to-br ${getSeverityColor(penalty.severity)} text-white px-5 py-3 rounded-xl shadow-lg flex-shrink-0`}>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black">{penalty.fineMin}</span>
                        <span className="text-sm font-semibold">-</span>
                        <span className="text-2xl font-black">{penalty.fineMax}</span>
                        <span className="text-sm font-bold ml-1">AZN</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-base text-gray-700 mb-4 leading-relaxed">{penalty.description}</p>

                  {/* Article reference */}
                  {penalty.article && (
                    <div className="flex items-center gap-2 mb-4">
                      <Scale className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                        {penalty.article}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video section - COMPACT GRID */}
      {filteredPenalties.some(p => p.hasVideo) && (
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[#007A3A] rounded-full"></div>
            <h3 className="text-lg font-bold text-gray-900">Video izahlar</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredPenalties.filter(p => p.hasVideo).map(penalty => (
              <button
                key={`video-${penalty.id}`}
                onClick={() => onVideoClick?.(penalty)}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-[#007A3A] transition-all"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <img 
                    src={penalty.videoThumbnail} 
                    alt={penalty.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-lg">
                      <Play className="w-5 h-5 text-[#007A3A] ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {penalty.videoDuration}
                  </div>
                </div>

                {/* Title */}
                <div className="p-2.5">
                  <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 group-hover:text-[#007A3A] transition-colors leading-tight">
                    {penalty.title}
                  </h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

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
