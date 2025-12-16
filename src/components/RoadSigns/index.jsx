import { useState } from 'react'
import { Search, ChevronLeft, Triangle, Circle, Octagon, Square, Info, Wrench, PlusCircle } from 'lucide-react'
import SignCard from './SignCard'
import GroupSidebar from './GroupSidebar'
import { roadSignsData } from './roadSignsData'

export default function RoadSigns({ onBack }) {
  const [selectedGroup, setSelectedGroup] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [isMobileGroupsOpen, setIsMobileGroupsOpen] = useState(false)

  // Filter signs based on selected group, search query, and active filter
  const getFilteredSigns = () => {
    let signs = []
    let searchingAllGroups = false

    // If search query exists, search across ALL groups
    if (searchQuery.trim()) {
      searchingAllGroups = true
      // Search in all groups
      Object.keys(roadSignsData).forEach(groupId => {
        const groupSigns = roadSignsData[groupId].map(sign => ({
          ...sign,
          groupId: parseInt(groupId),
          groupName: groups.find(g => g.id === parseInt(groupId))?.name
        }))
        signs = [...signs, ...groupSigns]
      })
      
      // Filter by search query
      signs = signs.filter(sign =>
        sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sign.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    } else {
      // No search query - show selected group only
      signs = roadSignsData[selectedGroup] || []
    }

    // Apply additional filters
    if (activeFilter === 'exam') {
      signs = signs.filter(sign => sign.examImportance === 'high')
    } else if (activeFilter === 'mistakes') {
      signs = signs.filter(sign => sign.commonMistakes)
    }

    return { signs, searchingAllGroups }
  }

  const { signs: filteredSigns, searchingAllGroups } = getFilteredSigns()
  const currentGroup = groups.find(g => g.id === selectedGroup)

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F5F7FA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-6 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            {/* Left side - Title and subtitle */}
            <div className="flex items-center gap-4 flex-1 min-w-[250px]">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Yol nişanları</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Burada bütün yol nişanlarını qruplar üzrə görə, hər nişanın şəkli və izahı ilə tanış ola bilərsən.
                </p>
              </div>
            </div>

            {/* Right side - Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Nişan adı və ya nömrə ilə axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-6">
          {/* Mobile Group Selector */}
          <div className="lg:hidden w-full mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Qrup seç</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-medium bg-white shadow-sm"
            >
              {groups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.name} ({group.count} nişan)
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-6 relative">
            {/* Left Sidebar - Desktop */}
            <GroupSidebar
              selectedGroup={selectedGroup}
              setSelectedGroup={setSelectedGroup}
              className="hidden lg:block"
            />

            {/* Right Content Area */}
            <div className="flex-1 min-w-0">
              {/* Group Header */}
              <div className="mb-6">
                {searchingAllGroups ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Axtarış nəticələri
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      "{searchQuery}" üzrə bütün qruplarda {filteredSigns.length} nişan tapıldı
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {currentGroup?.id}. {currentGroup?.name}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {currentGroup?.description}
                    </p>
                  </>
                )}
              </div>

              {/* Filter Chips */}
              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === 'all'
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500'
                  }`}
                >
                  Hamısı
                </button>
                <button
                  onClick={() => setActiveFilter('exam')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === 'exam'
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500'
                  }`}
                >
                  İmtahana düşənlər
                </button>
                <button
                  onClick={() => setActiveFilter('mistakes')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === 'mistakes'
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-500'
                  }`}
                >
                  Ən çox səhv edilənlər
                </button>
              </div>

              {/* Signs Grid */}
              {filteredSigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSigns.map((sign, index) => (
                    <SignCard 
                      key={`${sign.groupId || selectedGroup}-${sign.code}-${index}`} 
                      sign={sign} 
                      groupName={sign.groupName || currentGroup?.name} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-2">Axtarış üzrə nəticə tapılmadı</p>
                    <p className="text-gray-400 text-sm">
                      Başqa açar söz və ya nişan kodu ilə yenidən cəhd edin
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Groups data
const groups = [
  {
    id: 1,
    name: 'Xəbərdarlıq nişanları',
    count: 34,
    icon: Triangle,
    description: 'Sürücüləri yolda qarşıya çıxa biləcək təhlükələr və xüsusi yol şəraiti barədə əvvəlcədən xəbərdar edən nişanlar.'
  },
  {
    id: 2,
    name: 'Üstünlük nişanları',
    count: 12,
    icon: Triangle,
    description: 'Yol hərəkətində üstünlük ardıcıllığını müəyyənləşdirən və tənzimləyən nişanlar.'
  },
  {
    id: 3,
    name: 'Qadağan nişanları',
    count: 28,
    icon: Circle,
    description: 'Müəyyən hərəkət növlərini qadağan edən və ya məhdudlaşdıran nişanlar.'
  },
  {
    id: 4,
    name: 'Məcburi nişanlar',
    count: 16,
    icon: Circle,
    description: 'Sürücülərin mütləq yerinə yetirməli olduğu hərəkət qaydalarını göstərən nişanlar.'
  },
  {
    id: 5,
    name: 'İnformasiya nişanları',
    count: 22,
    icon: Square,
    description: 'Yol, ərazilər və ya müəssisələr haqqında məlumat verən nişanlar.'
  },
  {
    id: 6,
    name: 'Xidmət nişanları',
    count: 18,
    icon: Info,
    description: 'Yol qırağında yerləşən xidmət obyektləri haqqında məlumat verən nişanlar.'
  },
  {
    id: 7,
    name: 'Əlavə nişanlar',
    count: 14,
    icon: PlusCircle,
    description: 'Digər yol nişanlarının təsir dairəsini dəqiqləşdirən və ya məhdudlaşdıran əlavə lövhələr.'
  }
]
