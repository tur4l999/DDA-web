import { Play, AlertCircle, Info, Clock, Scale, Search, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { Play, AlertCircle, Info, Clock, Scale, Search, ChevronDown, ChevronUp, Video } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function PenaltiesContent({ topicRelated = false, onVideoClick }) {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedPenalty, setExpandedPenalty] = useState(null)

  // Real cərimələr - İXM əsasında - Enhanced Mock Data
  const penalties = [
    {
      id: 1,
      article: '327.1',
      title: 'Yol nişanlarının və ya yolların hərəkət hissəsinin işarələrinin tələblərinə riayət edilməməsi',
      fine: '40 ₼',
      fineAmount: 40,
      points: null,
      relatedArticles: ['Maddə 49'],
      fullDescription: `Maddə 49. Nəqliyyat vasitələrinin yolun hərəkət hissəsində yerləşməsi

I. Normal hərəkət zamanı nəqliyyat vasitələrinin sürücüləri vəziyyətən asılı olaraq, yolun hərəkət hissəsinin sağ kənarı ilə hərəkət etməlidirlər. Yaşayış məntəqələrindən kənarda, habelə yaşayış məntəqələrində 5.1 və ya 5.3 nişanları ilə işarələnmiş yolun hərəkət hissəsində hərəkət istiqamətində sağ zolaq boş olduğu halda sol zolaqlarla hərəkət etmək qadağandır.

II. Hər istiqamətdə azı iki hərəkət zolağı olan ikitərəfli hərəkət yollarında qarşıdan hərəkət üçün nəzərdə tutulmuş tərəfə keçmək qadağandır.

III. Üç hərəkət zolağı olan ikitərəfli hərəkət yollarında nəqliyyat vasitələri yolun hərəkət hissəsinin mərkəzində yerləşən və hər iki istiqamət üçün sol kənar hesab olunan orta zolağa keçməməlidirlər. Orta zolağa keçməyə yalnız ötmə, yandan keçmə və sola, yaxud geriyə dönmə üçün icazə verilir.`,
      isCommon: true
I. Normal hərəkət zamanı nəqliyyat vasitələrinin sürücüləri vəziyyətdən asılı olaraq, yolun hərəkət hissəsinin sağ kənarı ilə hərəkət etməlidirlər. Yaşayış məntəqələrindən kənarda, habelə yaşayış məntəqələrində 5.1 və ya 5.3 nişanları ilə işarələnmiş yolun hərəkət hissəsində hərəkət istiqamətində sağ zolaq boş olduğu halda sol zolaqlarla hərəkət etmək qadağandır.`,
      isCommon: true,
      videos: [
        {
          id: 'v1',
          title: 'Yol nişanlarının tələbləri',
          duration: '2:15',
          thumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400'
        },
        {
          id: 'v2',
          title: 'Nişanlanma xətləri',
          duration: '3:45',
          thumbnail: 'https://images.unsplash.com/photo-1572565691454-067df76f498c?w=400'
        }
      ]
    },
    {
      id: 2,
      article: '327.2',
      title: 'Svetoforun və ya nizamlayıcının qadağanedici işarəsi verilərkən hərəkətin davam etdirilməsi',
      fine: '100 ₼',
      fineAmount: 100,
      points: '3 bal',
      relatedArticles: ['Maddə 48'],
      fullDescription: `Maddə 48. Nəqliyyat vasitələrinin üstün hərəkət rejimi ilə hərəkəti və bununla əlaqədar digər sürücülərin vəzifələri.

Svetoforun qırmızı işığında və ya nizamlayıcının qadağanedici jestində hərəkəti davam etdirmək ciddi qayda pozuntusudur və qəza şəraiti yaradır.`,
      isCommon: true,
      videos: [
        {
          id: 'v3',
          title: 'Svetofor qaydaları',
          duration: '1:50',
          thumbnail: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?w=400'
        }
      ]
    },
    {
      id: 3,
      article: '327.2',
      title: '3.1 "Giriş qadağandır" yol nişanının tələbinin pozulması',
      fine: '100 ₼',
      fineAmount: 100,
      points: '3 bal',
      relatedArticles: ['Maddə 49'],
      fullDescription: 'Bu nişan yolun müəyyən hissəsinə nəqliyyat vasitələrinin girişini qadağan edir. Adətən birtərəfli hərəkət olan yolların əks tərəfində quraşdırılır.',
      isCommon: true,
      videos: []
    },
    {
      id: 4,
      article: '327.4',
      title: 'Birtərəfli hərəkət yollarında əks istiqamətdə hərəkət etməyə görə',
      fine: '150 ₼',
      fineAmount: 150,
      points: '4 bal',
      relatedArticles: ['Maddə 49'],
      fullDescription: 'Birtərəfli hərəkət yollarında müəyyən edilmiş hərəkət istiqamətinin əksinə hərəkət etməyə, habelə 1.1, 1.3 və 1.11 üfüqi nişanlanma xətlərinin tələblərini pozmaqla nəqliyyat vasitəsini tam olaraq əks istiqamətli nəqliyyat axınının hərəkət zolağına keçirərək nəqliyyat axınına əks istiqamətdə hərəkət etməyə görə.',
      isCommon: true,
      videos: [
        {
          id: 'v4',
          title: 'Birtərəfli yol qaydaları',
          duration: '4:20',
          thumbnail: 'https://images.unsplash.com/photo-1512941675424-1c7b94c55e86?w=400'
        },
        {
          id: 'v5',
          title: 'Qəza şəraiti nümunələri',
          duration: '2:10',
          thumbnail: 'https://images.unsplash.com/photo-1596520779836-39825b09455a?w=400'
        }
      ]
    },
    {
      id: 5,
      article: '338.1',
      title: 'Piyadalara yol verilməməsi',
      fine: '50 ₼',
      fineAmount: 50,
      points: null,
      relatedArticles: ['Maddə 54'],
      fullDescription: 'Piyada keçidlərində və ya yol ayrıclarında piyadalara yol verilməməsi.',
      isCommon: true,
      videos: [
         {
          id: 'v6',
          title: 'Piyada keçidi qaydaları',
          duration: '3:00',
          thumbnail: 'https://images.unsplash.com/photo-1554672408-730436b60dde?w=400'
        }
      ]
    }
  ]

  const filteredPenalties = useMemo(() => {
    return penalties.filter(p => {
      // Filter by category
      if (filter === 'common' && !p.isCommon) return false
      if (filter === 'video' && (!p.videos || p.videos.length === 0)) return false
      if (filter === 'points' && !p.points) return false
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        return (
          p.title.toLowerCase().includes(query) ||
          p.article.toLowerCase().includes(query) ||
          p.fine.toLowerCase().includes(query) ||
          (p.points && p.points.toLowerCase().includes(query)) ||
          (p.fullDescription && p.fullDescription.toLowerCase().includes(query))
        )
      }
      
      return true
    })
  }, [penalties, filter, searchQuery])

  const getFineColor = (amount) => {
    if (amount >= 150) return 'from-rose-500 to-rose-600 shadow-rose-200'
    if (amount >= 100) return 'from-orange-500 to-orange-600 shadow-orange-200'
    return 'from-amber-500 to-amber-600 shadow-amber-200'
  }

  const FilterButton = ({ id, label }) => (
    <button
      onClick={() => setFilter(id)}
      className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
        filter === id
          ? 'bg-primary-600 text-white shadow-lg shadow-primary-200 transform -translate-y-0.5'
          : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50 hover:border-gray-200'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Search & Header Action */}
      <div className="mb-6 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <div className="max-w-[1200px] mx-auto pb-12">
      {/* Search Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Axtarış (məsələn: svetofor, 327.1, 100 manat)..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary-500 rounded-2xl transition-all duration-300 outline-none text-gray-900 font-medium placeholder:text-gray-400"
          />
        </div>

        {/* New Button: See all penalties */}
        <button
          className="flex-shrink-0 bg-white border border-gray-200 hover:border-primary-500 text-gray-700 hover:text-primary-600 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md flex items-center gap-2"
        >
           <span>Bütün cərimələrə bax</span>
           <ArrowRight className="w-4 h-4" />
        </button>
        <div className="flex flex-wrap gap-3">
          <FilterButton id="all" label="Bütün cərimələr" />
          <FilterButton id="common" label="Tez-tez rast gəlinən" />
          <FilterButton id="video" label="Video izahlı" />
          <FilterButton id="points" label="Ballı cərimələr" />
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 px-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          {filteredPenalties.length} nəticə tapıldı
        </span>
      </div>

      {/* Penalties List */}
      <div className="space-y-4">
        {filteredPenalties.map(penalty => {
          const isExpanded = expandedPenalty === penalty.id
          
          return (
            <div
              key={penalty.id}
              className={`group bg-white border border-gray-100 rounded-2xl transition-all duration-300 overflow-hidden ${
                isExpanded ? 'shadow-xl ring-2 ring-primary-500/10' : 'shadow-sm hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Card Header/Summary */}
              <div
                className="p-5 cursor-pointer"
                onClick={() => setExpandedPenalty(isExpanded ? null : penalty.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon/Badge Section */}
                  <div className="hidden sm:flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 font-bold border border-gray-100 shadow-sm">
                      <Scale className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Tags Row */}
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-gray-900 text-white shadow-sm">
                        İXM {penalty.article}
                      </span>

                      {/* Fine + Points Combined Badge */}
                      <div className={`bg-gradient-to-br ${getFineColor(penalty.fineAmount)} text-white px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap shadow-sm flex items-center gap-1.5`}>
                        <span>{penalty.fine}</span>
                        {penalty.points && (
                          <>
                            <span className="opacity-80">+</span>
                            <span>{penalty.points}</span>
                          </>
                        )}
                      </div>
                      <div className={`inline-flex items-center bg-gradient-to-br ${getFineColor(penalty.fineAmount)} text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm whitespace-nowrap`}>
                        {penalty.fine} {penalty.points && ` + ${penalty.points}`}
                      </div>

                      {penalty.relatedArticles?.map((art, idx) => (
                         <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                           {art}
                         </span>
                      ))}

                      {penalty.videos && penalty.videos.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100 gap-1.5">
                          <Video className="w-3 h-3" />
                          {penalty.videos.length} Video
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-primary-700 transition-colors">
                        {penalty.title}
                      </h3>
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <div className="mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50">
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* Law Text */}
                    <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                        <Info className="w-4 h-4 text-primary-600" />
                        Qanunvericilik
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                        {penalty.fullDescription}
                      </p>
                    </div>

                    {/* Videos Section */}
                    {penalty.videos && penalty.videos.length > 0 && (
                      <div>
                        <h4 className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-4">
                          <Play className="w-4 h-4 text-primary-600" />
                          Video İzahlar ({penalty.videos.length})
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {penalty.videos.map((video) => (
                            <button
                              key={video.id}
                              onClick={() => onVideoClick?.(video)}
                              className="group/video relative block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md hover:border-primary-200 transition-all text-left"
                            >
                              <div className="relative aspect-video bg-gray-900">
                                <img
                                  src={video.thumbnail}
                                  alt={video.title}
                                  className="w-full h-full object-cover opacity-90 group-hover/video:opacity-100 transition-opacity"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover/video:scale-110 transition-transform">
                                    <Play className="w-4 h-4 text-primary-600 ml-0.5" fill="currentColor" />
                                  </div>
                                </div>
                                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/70 text-white text-[10px] font-bold rounded">
                                  {video.duration}
                                </div>
                              </div>
                              <div className="p-3">
                                <h5 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover/video:text-primary-700">
                                  {video.title}
                                </h5>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  Baxış üçün toxunun
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredPenalties.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white border border-dashed border-gray-300 rounded-2xl text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Nəticə tapılmadı</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            Axtarış sorğusunu dəyişdirin və ya filtrləri təmizləyin.
          </p>
          <button
            onClick={() => {setSearchQuery(''); setFilter('all')}}
            className="mt-4 text-primary-600 font-semibold text-sm hover:underline"
          >
            Filtrləri təmizlə
          </button>
        </div>
      )}
    </div>
  )
}
