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
    <div className="min-h-screen bg-surface-50">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Cərimələr</h1>
                <p className="text-xs text-slate-500">İnzibati Xətalar Məcəlləsi</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Pozuntu növünü axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input pl-11"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-4 lg:px-6 py-8 max-w-6xl mx-auto">
        {filteredData.length > 0 ? (
          <div className="space-y-8">
            {filteredData.map(category => (
              <div key={category.id}>
                <h2 className="text-base font-semibold text-slate-900 mb-4">
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
          <div className="text-center py-16 card">
            <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-900 font-semibold mb-1">Heç bir nəticə tapılmadı</p>
            <p className="text-sm text-slate-500">Axtarış sorğusunu dəyişin</p>
          </div>
        )}
      </main>

      {/* Video Modal */}
      <VideoModal
        penalty={selectedPenalty}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Filter Panel */}
      {isFilterOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            onClick={() => setIsFilterOpen(false)}
          />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-soft-xl z-50 p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Filtrlər</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cərimə aralığı
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="input py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Kateqoriya
                </label>
                <select className="input py-2 text-sm">
                  <option>Hamısı</option>
                  <option>Əsas pozuntu növləri</option>
                  <option>Sürücü davranışı</option>
                </select>
              </div>

              <button className="w-full btn-primary py-2.5 text-sm">
                Tətbiq et
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
