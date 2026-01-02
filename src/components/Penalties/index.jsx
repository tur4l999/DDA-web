import { useState } from 'react'
import { ArrowLeft, Search, SlidersHorizontal, AlertTriangle, Ban, Car, Users, Zap, Shield, X } from 'lucide-react'
import PenaltyCard from './PenaltyCard'
import VideoModal from './VideoModal'

const penaltiesData = [
  {
    id: 1,
    category: 'Əsas pozuntu növləri',
    penalties: [
      {
        id: 101,
        icon: AlertTriangle,
        title: 'Sürət limitinin pozulması',
        fineRange: '40-200 manat',
        hasVideo: true,
        videoDuration: '2:15',
        thumbnail: null,
        videoUrl: null
      },
      {
        id: 102,
        icon: Ban,
        title: 'Qadağan edən nişanın pozulması',
        fineRange: '60-150 manat',
        hasVideo: true,
        videoDuration: '1:45',
        thumbnail: null,
        videoUrl: null
      },
      {
        id: 103,
        icon: Shield,
        title: 'Təhlükəsizlik kəmərinin taxılmaması',
        fineRange: '30-50 manat',
        hasVideo: true,
        videoDuration: '1:20',
        thumbnail: null,
        videoUrl: null
      }
    ]
  },
  {
    id: 2,
    category: 'Sürücü davranışı',
    penalties: [
      {
        id: 201,
        icon: Car,
        title: 'Yolun solunda hərəkət',
        fineRange: '100-300 manat',
        hasVideo: true,
        videoDuration: '2:30',
        thumbnail: null,
        videoUrl: null
      },
      {
        id: 202,
        icon: Users,
        title: 'Piyada keçidində dayandıq',
        fineRange: '50-100 manat',
        hasVideo: true,
        videoDuration: '1:50',
        thumbnail: null,
        videoUrl: null
      },
      {
        id: 203,
        icon: Zap,
        title: 'Təcili yardım maşınına ötürmə',
        fineRange: '200-400 manat',
        hasVideo: false,
        videoDuration: null,
        thumbnail: null,
        videoUrl: null
      }
    ]
  }
]

export default function PenaltiesPage({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedPenalty, setSelectedPenalty] = useState(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const handleVideoClick = (penalty) => {
    setSelectedPenalty(penalty)
    setIsVideoModalOpen(true)
  }

  const filteredData = penaltiesData.map(category => ({
    ...category,
    penalties: category.penalties.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.penalties.length > 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Cərimələr</h1>
                <p className="text-xs text-gray-500">İnzibati Xətalar Məcəlləsi</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Pozuntu növünü axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-4 lg:px-6 py-6 max-w-6xl mx-auto">
        {filteredData.length > 0 ? (
          <div className="space-y-8">
            {filteredData.map(category => (
              <div key={category.id}>
                <h2 className="text-base font-semibold text-gray-900 mb-4">
                  {category.category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.penalties.map(penalty => (
                    <PenaltyCard
                      key={penalty.id}
                      penalty={penalty}
                      onVideoClick={handleVideoClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium mb-1">Heç bir nəticə tapılmadı</p>
            <p className="text-sm text-gray-500">Axtarış sorğusunu dəyişin</p>
          </div>
        )}
      </main>

      {/* Video Modal */}
      <VideoModal
        penalty={selectedPenalty}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Filter Panel (placeholder) */}
      {isFilterOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl z-50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Filtrlər</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cərimə aralığı
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kateqoriya
                </label>
                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm">
                  <option>Hamısı</option>
                  <option>Əsas pozuntu növləri</option>
                  <option>Sürücü davranışı</option>
                </select>
              </div>

              <button className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors">
                Tətbiq et
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
