import { useState, useMemo } from 'react'
import { Search, ChevronDown, List, AlertTriangle, ArrowUpCircle, Ban, Navigation, Info, Wrench, Plus } from 'lucide-react'
import RoadSignCard from './RoadSignCard'
import { roadSignsData } from './roadSignsData'

const RoadSigns = () => {
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileGroupsOpen, setIsMobileGroupsOpen] = useState(false)

  const groups = [
    {
      id: 'all',
      name: 'Hamısı',
      icon: List,
      description: 'Bütün nişanlar',
      color: 'bg-gray-100',
      iconColor: 'text-gray-600'
    },
    {
      id: 'warning',
      name: 'Xəbərdarlıq nişanları',
      icon: AlertTriangle,
      description: 'Yol təhlükələri haqqında məlumat verir',
      count: roadSignsData.filter(s => s.category === 'warning').length,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      id: 'priority',
      name: 'Üstünlük nişanları',
      icon: ArrowUpCircle,
      description: 'Yolda hərəkət prioriteti müəyyən edir',
      count: roadSignsData.filter(s => s.category === 'priority').length,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'prohibitory',
      name: 'Qadağan nişanları',
      icon: Ban,
      description: 'Müəyyən hərəkətləri qadağan edir',
      count: roadSignsData.filter(s => s.category === 'prohibitory').length,
      color: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      id: 'mandatory',
      name: 'Məcburi nişanlar',
      icon: Navigation,
      description: 'Müəyyən istiqamətə hərəkət tələb edir',
      count: roadSignsData.filter(s => s.category === 'mandatory').length,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'information',
      name: 'İnformasiya nişanları',
      icon: Info,
      description: 'Yol şəraiti haqqında məlumat verir',
      count: roadSignsData.filter(s => s.category === 'information').length,
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'service',
      name: 'Xidmət nişanları',
      icon: Wrench,
      description: 'Yol xidmətləri haqqında məlumat',
      count: roadSignsData.filter(s => s.category === 'service').length,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 'additional',
      name: 'Əlavə nişanlar',
      icon: Plus,
      description: 'Digər nişanları tamamlayır',
      count: roadSignsData.filter(s => s.category === 'additional').length,
      color: 'bg-gray-50',
      iconColor: 'text-gray-600'
    }
  ]

  const filteredSigns = useMemo(() => {
    let signs = roadSignsData

    // Group filter
    if (selectedGroup !== 'all') {
      signs = signs.filter(sign => sign.category === selectedGroup)
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      signs = signs.filter(sign => 
        sign.name.toLowerCase().includes(query) ||
        sign.code.toLowerCase().includes(query) ||
        sign.description.toLowerCase().includes(query)
      )
    }

    return signs
  }, [selectedGroup, searchQuery])

  const selectedGroupData = groups.find(g => g.id === selectedGroup)

  return (
    <div className="flex flex-col h-full bg-[#F5F7FA]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-[1400px] mx-auto">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Yol nişanları</h1>
            <p className="text-sm lg:text-base text-gray-600 mt-2">
              Burada bütün yol nişanlarını qruplar üzrə görə, hər nişanın şəkli və izahı ilə tanış ola bilərsən.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* Left Sidebar - Desktop */}
            <aside className="hidden lg:block lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-6">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nişan axtar…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 px-3 py-2">Qruplar</h2>
                <div className="mt-3 space-y-1">
                  {groups.map((group) => {
                    const IconComponent = group.icon
                    return (
                      <button
                        key={group.id}
                        onClick={() => setSelectedGroup(group.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all relative ${
                          selectedGroup === group.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {selectedGroup === group.id && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-600 rounded-r-full" />
                        )}
                        <IconComponent className={`w-5 h-5 ${
                          selectedGroup === group.id ? 'text-primary-600' : group.iconColor
                        }`} />
                        <div className="flex-1 text-left">
                          <div className={`text-sm font-semibold ${
                            selectedGroup === group.id ? 'text-primary-700' : 'text-gray-900'
                          }`}>
                            {group.name}
                          </div>
                          {group.count !== undefined && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {group.count} nişan
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Mobile Groups Dropdown */}
            <div className="lg:hidden">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-4">
                {/* Search Bar - Mobile */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nişan axtar…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                  />
                </div>
                
                <button
                  onClick={() => setIsMobileGroupsOpen(!isMobileGroupsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2"
                >
                  <div className="flex items-center gap-3">
                    {selectedGroupData?.icon && (
                      <selectedGroupData.icon className={`w-5 h-5 ${selectedGroupData.iconColor}`} />
                    )}
                    <span className="font-semibold text-gray-900">{selectedGroupData?.name}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                    isMobileGroupsOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {isMobileGroupsOpen && (
                  <div className="mt-2 space-y-1 border-t border-gray-100 pt-2">
                    {groups.map((group) => {
                      const IconComponent = group.icon
                      return (
                        <button
                          key={group.id}
                          onClick={() => {
                            setSelectedGroup(group.id)
                            setIsMobileGroupsOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                            selectedGroup === group.id
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-gray-700'
                          }`}
                        >
                          <IconComponent className={`w-5 h-5 ${
                            selectedGroup === group.id ? 'text-primary-600' : group.iconColor
                          }`} />
                          <div className="flex-1 text-left">
                            <div className="text-sm font-semibold">{group.name}</div>
                            {group.count !== undefined && (
                              <div className="text-xs text-gray-500">{group.count} nişan</div>
                            )}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Content Area */}
            <main className="flex-1 overflow-y-auto">
              <div className="space-y-6">
                {/* Group Header */}
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {selectedGroup !== 'all' && `${groups.findIndex(g => g.id === selectedGroup)}. `}
                    {selectedGroupData?.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{selectedGroupData?.description}</p>
                </div>

                {/* Road Signs List */}
                {filteredSigns.length > 0 ? (
                  <div className="space-y-6 pb-6">
                    {filteredSigns.map((sign) => (
                      <RoadSignCard key={sign.id} sign={sign} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Heç bir nişan tapılmadı
                    </h3>
                    <p className="text-gray-600">
                      Axtarış və ya filtr kriteriyalarınızı dəyişdirərək yenidən cəhd edin.
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadSigns
