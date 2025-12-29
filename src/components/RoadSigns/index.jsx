import { useState, useMemo } from 'react'
import { Search, ChevronDown, List, AlertTriangle, ArrowUpCircle, Ban, Navigation, Info, Wrench, Plus, ArrowLeft } from 'lucide-react'
import RoadSignCard from './RoadSignCard'
import { roadSignsData } from './roadSignsData'
import { SearchInput } from '../ui/Input'
import Badge from '../ui/Badge'

const RoadSigns = ({ onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileGroupsOpen, setIsMobileGroupsOpen] = useState(false)

  const groups = [
    {
      id: 'all',
      name: 'Hamısı',
      icon: List,
      description: 'Bütün yol nişanları',
      color: 'neutral'
    },
    {
      id: 'warning',
      name: 'Xəbərdarlıq',
      icon: AlertTriangle,
      description: 'Yol təhlükələri haqqında məlumat verir',
      count: roadSignsData.filter(s => s.category === 'warning').length,
      color: 'warning'
    },
    {
      id: 'priority',
      name: 'Üstünlük',
      icon: ArrowUpCircle,
      description: 'Yolda hərəkət prioriteti müəyyən edir',
      count: roadSignsData.filter(s => s.category === 'priority').length,
      color: 'info'
    },
    {
      id: 'prohibitory',
      name: 'Qadağan',
      icon: Ban,
      description: 'Müəyyən hərəkətləri qadağan edir',
      count: roadSignsData.filter(s => s.category === 'prohibitory').length,
      color: 'error'
    },
    {
      id: 'mandatory',
      name: 'Məcburi',
      icon: Navigation,
      description: 'Müəyyən istiqamətə hərəkət tələb edir',
      count: roadSignsData.filter(s => s.category === 'mandatory').length,
      color: 'info'
    },
    {
      id: 'information',
      name: 'İnformasiya',
      icon: Info,
      description: 'Yol şəraiti haqqında məlumat verir',
      count: roadSignsData.filter(s => s.category === 'information').length,
      color: 'success'
    },
    {
      id: 'service',
      name: 'Xidmət',
      icon: Wrench,
      description: 'Yol xidmətləri haqqında məlumat',
      count: roadSignsData.filter(s => s.category === 'service').length,
      color: 'primary'
    },
    {
      id: 'additional',
      name: 'Əlavə',
      icon: Plus,
      description: 'Digər nişanları tamamlayır',
      count: roadSignsData.filter(s => s.category === 'additional').length,
      color: 'neutral'
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
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-100 px-4 lg:px-6 py-4 sticky top-0 z-sticky">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            {onBack && (
              <button
                onClick={onBack}
                className="p-2 -m-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-neutral-800">Yol nişanları</h1>
              <p className="text-sm text-neutral-500 mt-0.5">
                {filteredSigns.length} nişan tapıldı
              </p>
            </div>
          </div>
          
          {/* Search - Mobile */}
          <div className="lg:hidden">
            <SearchInput
              placeholder="Nişan axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            
            {/* Left Sidebar - Desktop */}
            <aside className="hidden lg:block lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-card p-4 sticky top-24">
                {/* Search */}
                <SearchInput
                  placeholder="Nişan axtar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="mb-4"
                />
                
                <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide px-3 mb-2">
                  Qruplar
                </h2>
                
                <nav className="space-y-1">
                  {groups.map((group) => {
                    const IconComponent = group.icon
                    const isActive = selectedGroup === group.id
                    
                    return (
                      <button
                        key={group.id}
                        onClick={() => setSelectedGroup(group.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                          isActive
                            ? 'bg-primary-50 text-primary-700'
                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                        }`}
                      >
                        <IconComponent className={`w-5 h-5 flex-shrink-0 ${
                          isActive ? 'text-primary-600' : 'text-neutral-400'
                        }`} strokeWidth={1.5} />
                        <div className="flex-1 text-left">
                          <div className={`text-sm font-medium ${
                            isActive ? 'text-primary-700' : 'text-neutral-700'
                          }`}>
                            {group.name}
                          </div>
                        </div>
                        {group.count !== undefined && (
                          <span className={`text-xs ${isActive ? 'text-primary-600' : 'text-neutral-400'}`}>
                            {group.count}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Mobile Groups Dropdown */}
            <div className="lg:hidden">
              <div className="bg-white rounded-2xl shadow-card p-4">
                <button
                  onClick={() => setIsMobileGroupsOpen(!isMobileGroupsOpen)}
                  className="w-full flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-3">
                    {selectedGroupData?.icon && (
                      <selectedGroupData.icon className="w-5 h-5 text-primary-600" strokeWidth={1.5} />
                    )}
                    <span className="font-medium text-neutral-800">{selectedGroupData?.name}</span>
                    {selectedGroupData?.count !== undefined && (
                      <Badge variant="neutral" size="sm">{selectedGroupData.count}</Badge>
                    )}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${
                    isMobileGroupsOpen ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {isMobileGroupsOpen && (
                  <div className="mt-2 pt-2 border-t border-neutral-100 space-y-1">
                    {groups.map((group) => {
                      const IconComponent = group.icon
                      const isActive = selectedGroup === group.id
                      
                      return (
                        <button
                          key={group.id}
                          onClick={() => {
                            setSelectedGroup(group.id)
                            setIsMobileGroupsOpen(false)
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                            isActive
                              ? 'bg-primary-50 text-primary-700'
                              : 'text-neutral-600 hover:bg-neutral-50'
                          }`}
                        >
                          <IconComponent className={`w-5 h-5 ${
                            isActive ? 'text-primary-600' : 'text-neutral-400'
                          }`} strokeWidth={1.5} />
                          <span className="flex-1 text-left text-sm font-medium">{group.name}</span>
                          {group.count !== undefined && (
                            <span className="text-xs text-neutral-400">{group.count}</span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Content Area */}
            <main className="flex-1 overflow-y-auto min-w-0">
              {/* Section Header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-neutral-800 mb-1">
                  {selectedGroupData?.name}
                </h2>
                <p className="text-sm text-neutral-500">{selectedGroupData?.description}</p>
              </div>

              {/* Signs Grid */}
              {filteredSigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
                  {filteredSigns.map((sign) => (
                    <RoadSignCard key={sign.id} sign={sign} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-2">
                    Heç bir nişan tapılmadı
                  </h3>
                  <p className="text-neutral-500">
                    Axtarış və ya filtr kriteriyalarınızı dəyişdirin.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadSigns
