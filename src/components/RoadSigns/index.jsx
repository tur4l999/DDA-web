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
      color: 'bg-slate-50',
      iconColor: 'text-slate-500'
    },
    {
      id: 'warning',
      name: 'Xəbərdarlıq nişanları',
      icon: AlertTriangle,
      description: 'Yol təhlükələri haqqında məlumat verir',
      count: roadSignsData.filter(s => s.category === 'warning').length,
      color: 'bg-amber-50',
      iconColor: 'text-amber-500'
    },
    {
      id: 'priority',
      name: 'Üstünlük nişanları',
      icon: ArrowUpCircle,
      description: 'Yolda hərəkət prioriteti müəyyən edir',
      count: roadSignsData.filter(s => s.category === 'priority').length,
      color: 'bg-primary-50',
      iconColor: 'text-primary-500'
    },
    {
      id: 'prohibitory',
      name: 'Qadağan nişanları',
      icon: Ban,
      description: 'Müəyyən hərəkətləri qadağan edir',
      count: roadSignsData.filter(s => s.category === 'prohibitory').length,
      color: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      id: 'mandatory',
      name: 'Məcburi nişanlar',
      icon: Navigation,
      description: 'Müəyyən istiqamətə hərəkət tələb edir',
      count: roadSignsData.filter(s => s.category === 'mandatory').length,
      color: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      id: 'information',
      name: 'İnformasiya nişanları',
      icon: Info,
      description: 'Yol şəraiti haqqında məlumat verir',
      count: roadSignsData.filter(s => s.category === 'information').length,
      color: 'bg-accent-50',
      iconColor: 'text-accent-600'
    },
    {
      id: 'service',
      name: 'Xidmət nişanları',
      icon: Wrench,
      description: 'Yol xidmətləri haqqında məlumat',
      count: roadSignsData.filter(s => s.category === 'service').length,
      color: 'bg-violet-50',
      iconColor: 'text-violet-500'
    },
    {
      id: 'additional',
      name: 'Əlavə nişanlar',
      icon: Plus,
      description: 'Digər nişanları tamamlayır',
      count: roadSignsData.filter(s => s.category === 'additional').length,
      color: 'bg-slate-50',
      iconColor: 'text-slate-500'
    }
  ]

  const filteredSigns = useMemo(() => {
    let signs = roadSignsData

    if (selectedGroup !== 'all') {
      signs = signs.filter(sign => sign.category === selectedGroup)
    }

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
    <div className="flex flex-col h-full bg-surface-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-6 py-5">
        <div className="max-w-[1400px] mx-auto">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900">Yol nişanları</h1>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              Burada bütün yol nişanlarını qruplar üzrə görə, hər nişanın şəkli və izahı ilə tanış ola bilərsiniz.
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
              <div className="card p-4 sticky top-6">
                {/* Search Bar */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nişan axtar…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-12"
                  />
                </div>
                
                <h2 className="text-base font-semibold text-slate-900 px-3 py-2">Qruplar</h2>
                <div className="mt-2 space-y-1">
                  {groups.map((group) => {
                    const IconComponent = group.icon
                    return (
                      <button
                        key={group.id}
                        onClick={() => setSelectedGroup(group.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 relative ${
                          selectedGroup === group.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {selectedGroup === group.id && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />
                        )}
                        <div className={`w-8 h-8 rounded-lg ${group.color} flex items-center justify-center`}>
                          <IconComponent className={`w-4 h-4 ${
                            selectedGroup === group.id ? 'text-primary-600' : group.iconColor
                          }`} />
                        </div>
                        <div className="flex-1 text-left">
                          <div className={`text-sm font-medium ${
                            selectedGroup === group.id ? 'text-primary-700' : 'text-slate-800'
                          }`}>
                            {group.name}
                          </div>
                          {group.count !== undefined && (
                            <div className="text-xs text-slate-500 mt-0.5">
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
              <div className="card p-4 space-y-4">
                {/* Search Bar - Mobile */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Nişan axtar…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-12"
                  />
                </div>
                
                <button
                  onClick={() => setIsMobileGroupsOpen(!isMobileGroupsOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {selectedGroupData?.icon && (
                      <div className={`w-8 h-8 rounded-lg ${selectedGroupData.color} flex items-center justify-center`}>
                        <selectedGroupData.icon className={`w-4 h-4 ${selectedGroupData.iconColor}`} />
                      </div>
                    )}
                    <span className="font-medium text-slate-900">{selectedGroupData?.name}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    isMobileGroupsOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {isMobileGroupsOpen && (
                  <div className="space-y-1 border-t border-slate-100 pt-3 animate-fade-in">
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
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${group.color} flex items-center justify-center`}>
                            <IconComponent className={`w-4 h-4 ${
                              selectedGroup === group.id ? 'text-primary-600' : group.iconColor
                            }`} />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="text-sm font-medium">{group.name}</div>
                            {group.count !== undefined && (
                              <div className="text-xs text-slate-500">{group.count} nişan</div>
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
            <main className="flex-1 overflow-y-auto scrollbar-thin">
              <div className="space-y-6">
                {/* Group Header */}
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-slate-900">
                    {selectedGroup !== 'all' && `${groups.findIndex(g => g.id === selectedGroup)}. `}
                    {selectedGroupData?.name}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 leading-relaxed">{selectedGroupData?.description}</p>
                </div>

                {/* Road Signs List */}
                {filteredSigns.length > 0 ? (
                  <div className="space-y-4 pb-6">
                    {filteredSigns.map((sign) => (
                      <RoadSignCard key={sign.id} sign={sign} />
                    ))}
                  </div>
                ) : (
                  <div className="card p-12 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      Heç bir nişan tapılmadı
                    </h3>
                    <p className="text-slate-500">
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
