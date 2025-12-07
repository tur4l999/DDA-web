import { Play, AlertCircle, Info, Clock, Scale, Search, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function PenaltiesContent({ topicRelated = false, onVideoClick }) {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedPenalty, setExpandedPenalty] = useState(null)

  // Real cərimələr - İXM əsasında
  const penalties = [
    {
      id: 1,
      article: '327.1',
      title: 'Yol nişanlarının və ya yolların hərəkət hissəsinin işarələrinin tələblərinə riayət edilməməsi',
      fine: 'qırx manat',
      fineAmount: 40,
      points: null,
      hasVideo: true,
      videoDuration: '2:15',
      videoThumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
      relatedArticles: ['Maddə 49'],
      fullDescription: `Maddə 49. Nəqliyyat vasitələrinin yolun hərəkət hissəsində yerləşməsi

I. Normal hərəkət zamanı nəqliyyat vasitələrinin sürücüləri vəziyyətdən asılı olaraq, yolun hərəkət hissəsinin sağ kənarı ilə hərəkət etməlidirlər. Yaşayış məntəqələrindən kənarda, habelə yaşayış məntəqələrində 5.1 və ya 5.3 nişanları ilə işarələnmiş yolun hərəkət hissəsində hərəkət istiqamətində sağ zolaq boş olduğu halda sol zolaqlarla hərəkət etmək qadağandır.

II. Hər istiqamətdə azı iki hərəkət zolağı olan ikitərəfli hərəkət yollarında qarşıdan hərəkət üçün nəzərdə tutulmuş tərəfə keçmək qadağandır.

III. Üç hərəkət zolağı olan ikitərəfli hərəkət yollarında nəqliyyat vasitələri yolun hərəkət hissəsinin mərkəzində yerləşən və hər iki istiqamət üçün sol kənar hesab olunan orta zolağa keçməməlidirlər. Orta zolağa keçməyə yalnız ötmə, yandan keçmə və sola, yaxud geriyə dönmə üçün icazə verilir.`,
      isCommon: true
    },
    {
      id: 2,
      article: '327.2',
      title: 'Svetoforun və ya nizamlayıcının qadağanedici işarəsi verilərkən hərəkətin davam etdirilməsi',
      fine: 'yüz manat',
      fineAmount: 100,
      points: '3 bal',
      hasVideo: true,
      videoDuration: '1:50',
      videoThumbnail: 'https://images.unsplash.com/photo-1502489597346-dad15683d4c2?w=400',
      relatedArticles: ['Maddə 48'],
      fullDescription: `Maddə 48. Nəqliyyat vasitələrinin üstün hərəkət rejimi ilə hərəkəti və bununla əlaqədar digər sürücülərin vəzifələri

I. Üstündə "polis", "təcili tibbi yardım", "yanğınsöndürən" yazılar olan, habelə Azərbaycan Respublikasının müvafiq icra hakimiyyəti orqanının müəyyən etdiyi digər nəqliyyat vasitələri xüsusi tapşırığı yerinə yetirərkən üstün hərəkət rejiminə malikdirlər. Bu şəraitdə onların sürücüləri xüsusi işıq və səs siqnallarını qoşmalıdırlar.

II. Yuxarıda nəzərdə tutulmuş nəqliyyat vasitələrindən biri yaxınlaşdıqda, hərəkətdə iştirak edən digər nəqliyyat vasitələrinin sürücüləri sağa dönmə işıq göstəricisini yandırmalı, üstün hərəkət rejimi ilə gedən nəqliyyat vasitələri üçün zolağı boşaltmalı və ya yol qırağına mümkün qədər yaxın hərəkət etməli, zərurət olduqda isə nəqliyyat vasitəsini dayandırmalıdırlar.`,
      isCommon: true
    },
    {
      id: 3,
      article: '327.2',
      title: '3.1 "Giriş qadağandır" yol nişanının tələbinin pozulması',
      fine: 'yüz manat',
      fineAmount: 100,
      points: '3 bal',
      hasVideo: true,
      videoDuration: '2:20',
      videoThumbnail: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400',
      relatedArticles: ['Maddə 49'],
      fullDescription: 'Yol nişanlarına əməl edilməməsi ilə bağlı pozuntular.',
      isCommon: true
    },
    {
      id: 4,
      article: '327.2',
      title: 'Əks istiqamətli hərəkət zolağına çıxmaqla ötmə və ya manevr etmə qaydalarının pozulması',
      fine: 'yüz manat',
      fineAmount: 100,
      points: '3 bal',
      hasVideo: true,
      videoDuration: '2:35',
      videoThumbnail: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400',
      relatedArticles: ['Maddə 49', 'Maddə 50'],
      fullDescription: `Maddə 50. Hərəkət sürəti və nəqliyyat vasitələri arasında ara məsafəsi

I. Sürücü hərəkətin intensivliyini, nəqliyyat vasitəsinin, yükün xüsusiyyətlərini və vəziyyətini, yol və meteoroloji şərati, xüsusən hərəkət istiqamətində görmə şəraitini nəzərə almaqla, nəqliyyat vasitəsini müəyyən olunmuş sürət məhdudiyyətindən çox olmayan sürətlə sürməlidir.

II. Nəqliyyat vasitələri yaşayış məntəqələri daxilində — saatda 60 kilometrdən çox olmayan sürətlə (səlahiyyətli orqanlar yolun müəyyən sahələrində daha yuxarı hədd müəyyən edə bilərlər, lakin bu hədd saatda 90 kilometrdən çox ola bilməz), yaşayış zonalarında və həyət ərazilərində isə saatda 20 kilometrdən çox olmayan sürətlə hərəkət etməlidirlər.`,
      isCommon: true
    },
    {
      id: 5,
      article: '327.3',
      title: 'Dəmiryol keçidlərinin keçilmə qaydalarının pozulması',
      fine: 'yüz manat',
      fineAmount: 100,
      points: '4 bal',
      hasVideo: true,
      videoDuration: '2:10',
      videoThumbnail: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400',
      relatedArticles: ['Maddə 48'],
      fullDescription: 'Dəmiryol keçidlərində təhlükəsizlik qaydalarına riayət edilməməsi.',
      isCommon: true
    },
    {
      id: 6,
      article: '327.3',
      title: 'Nəqliyyat vasitəsini saxlamaq tələbinin yerinə yetirilməməsi',
      fine: 'yüz manat',
      fineAmount: 100,
      points: '4 bal',
      hasVideo: false,
      relatedArticles: ['Maddə 48'],
      fullDescription: 'Azərbaycan Respublikasının müvafiq icra hakimiyyəti orqanı əməkdaşının nəqliyyat vasitəsini saxlamaq tələbinin yerinə yetirilməməsi.',
      isCommon: false
    },
    {
      id: 7,
      article: '327.4',
      title: 'Birtərəfli hərəkət yollarında əks istiqamətdə hərəkət etməyə görə',
      fine: 'yüz əlli manat',
      fineAmount: 150,
      points: '4 bal',
      hasVideo: true,
      videoDuration: '1:55',
      videoThumbnail: 'https://images.unsplash.com/photo-1512941675424-1c7b94c55e86?w=400',
      relatedArticles: ['Maddə 49'],
      fullDescription: 'Birtərəfli hərəkət yollarında müəyyən edilmiş hərəkət istiqamətinin əksinə hərəkət etməyə, habelə 1.1, 1.3 və 1.11 üfüqi nişanlanma xətlərinin tələblərini pozmaqla nəqliyyat vasitəsini tam olaraq əks istiqamətli nəqliyyat axınının hərəkət zolağına keçirərək nəqliyyat axınına əks istiqamətdə hərəkət etməyə görə.',
      isCommon: true
    },
    {
      id: 8,
      article: '327.5',
      title: 'Avtomagistrallarda texniki sürəti 50 km/saatdan az olan nəqliyyat vasitələrinin hərəkət etməsinə görə',
      fine: 'yüz manat',
      fineAmount: 100,
      points: '4 bal',
      hasVideo: true,
      videoDuration: '2:00',
      videoThumbnail: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400',
      relatedArticles: ['Maddə 50'],
      fullDescription: `Maddə 50. Hərəkət sürəti və nəqliyyat vasitələri arasında ara məsafəsi

III. Sürücü sürətdən və hərəkət şəraitindən asılı olaraq elə ara məsafəsi seçməlidir ki, eyni zolaqda özündən qabaqda gedən nəqliyyat vasitəsi sürəti kəskin azaltdıqda və ya gözlənilmədən dayandıqda, onunla toqquşmanın qarşısını almaq mümkün olsun.

V. Üstün hərəkət rejimli nəqliyyat vasitələri zərurətdən irəli gələn sürətlə hərəkət edə bilərlər. Göstərilən nəqliyyat vasitələrinin sürücüləri yol-nəqliyyat hadisələrinin qarşısını almaq üçün hər cür tədbir görməlidirlər.`,
      isCommon: false
    },
    {
      id: 9,
      article: '327.6',
      title: 'Yol hərəkəti qaydalarını pozan nəqliyyat vasitəsi sürücüsünün yol nəqliyyat hadisəsi yerindən yayınmasına görə',
      fine: 'yüz manat',
      fineAmount: 100,
      points: '4 bal',
      hasVideo: true,
      videoDuration: '2:25',
      videoThumbnail: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400',
      relatedArticles: ['Maddə 48'],
      fullDescription: 'Yol-nəqliyyat hadisəsi baş verəndə hadisə yerini tərk etməyə görə.',
      isCommon: false
    }
  ]

  const filteredPenalties = useMemo(() => {
    return penalties.filter(p => {
      // Filter by category
      if (filter === 'common' && !p.isCommon) return false
      if (filter === 'video' && !p.hasVideo) return false
      if (filter === 'points' && !p.points) return false
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        return (
          p.title.toLowerCase().includes(query) ||
          p.article.toLowerCase().includes(query) ||
          p.fine.toLowerCase().includes(query) ||
          (p.points && p.points.toLowerCase().includes(query))
        )
      }
      
      return true
    })
  }, [penalties, filter, searchQuery])

  const getFineColor = (amount) => {
    if (amount >= 150) return 'from-red-500 to-red-600'
    if (amount >= 100) return 'from-orange-500 to-orange-600'
    return 'from-yellow-500 to-yellow-600'
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cərimə axtar (maddə, açıqlama, məbləğ)..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007A3A]/20 focus:border-[#007A3A] text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
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
        <button
          onClick={() => setFilter('points')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
            filter === 'points'
              ? 'bg-[#007A3A] text-white'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          Ballı cərimələr
        </button>
      </div>

      {/* Penalties list - Compact cards with embedded small videos */}
      <div className="space-y-3">
        {filteredPenalties.map(penalty => {
          const isExpanded = expandedPenalty === penalty.id
          
          return (
            <div
              key={penalty.id}
              className="bg-white border border-gray-200 rounded-xl hover:shadow-lg hover:border-[#007A3A] transition-all"
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-10 h-10 bg-gradient-to-br ${getFineColor(penalty.fineAmount)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <AlertCircle className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>

                  {/* Left side: Info */}
                  <div className="flex-1 min-w-0">
                    {/* Related Article above title */}
                    {penalty.relatedArticles && penalty.relatedArticles.length > 0 && (
                      <span className="text-xs font-semibold text-gray-500 mb-1.5 inline-block">
                        {penalty.relatedArticles.join(', ')}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-sm font-bold text-gray-900 leading-tight mb-2">{penalty.title}</h3>

                    {/* Fine & Points - smaller and refined */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <div className={`bg-gradient-to-br ${getFineColor(penalty.fineAmount)} text-white px-2.5 py-1 rounded-md text-xs font-bold whitespace-nowrap shadow-sm`}>
                        {penalty.fine}
                      </div>
                      {penalty.points && (
                        <>
                          <span className="text-gray-300 font-bold text-sm">+</span>
                          <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-md border border-red-200">
                            {penalty.points}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Expand/Collapse button for full description */}
                    {penalty.fullDescription && (
                      <button
                        onClick={() => setExpandedPenalty(isExpanded ? null : penalty.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#007A3A] hover:text-[#005A2A] transition-colors mt-2"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5" />
                            Açıqlamanı gizlət
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5" />
                            Ətraflı açıqlama
                          </>
                        )}
                      </button>
                    )}

                    {/* Expanded description */}
                    {isExpanded && penalty.fullDescription && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                          {penalty.fullDescription}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right side: İXM Badge + Video (always aligned) */}
                  <div className="flex flex-col gap-2 items-end flex-shrink-0">
                    {/* İXM Badge - larger */}
                    <span className="text-sm font-bold text-white bg-gradient-to-r from-gray-700 to-gray-800 px-3 py-1.5 rounded-lg shadow-sm whitespace-nowrap">
                      İXM {penalty.article}
                    </span>

                    {/* Video thumbnail (if exists) */}
                    {penalty.hasVideo && (
                      <button
                        onClick={() => onVideoClick?.(penalty)}
                        className="group w-36 bg-gray-100 rounded-lg overflow-hidden hover:ring-2 hover:ring-[#007A3A] transition-all"
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
            </div>
          )
        })}
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
