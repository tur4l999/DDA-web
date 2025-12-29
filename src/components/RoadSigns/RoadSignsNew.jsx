import { useState, useMemo } from 'react'
import { Search, ChevronDown, AlertTriangle, ArrowUpCircle, Ban, Navigation, Info, Wrench, Plus, ArrowLeft } from 'lucide-react'
import { Card, Input, Badge } from '../ui'
import RoadSignCard from './RoadSignCard'
import { roadSignsData } from './roadSignsData'

const RoadSignsNew = ({ onBack }) => {
  const [selectedGroup, setSelectedGroup] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileGroupsOpen, setIsMobileGroupsOpen] = useState(false)

  const groups = [
    {
      id: 'all',
      name: 'Bütün nişanlar',
      description: 'Hamısını göstər',
      count: roadSignsData.length,
      color: 'bg-gray-50',
      iconColor: 'text-gray-600',
      Icon: null
    },
    {
      id: 'warning',
      name: 'Xəbərdarlıq',
      description: 'Yol təhlükələri haqqında məlumat',
      count: roadSignsData.filter(s => s.category === 'warning').length,
      color: 'bg-warning-50',
      iconColor: 'text-warning-600',
      Icon: AlertTriangle
    },
    {
      id: 'priority',
      name: 'Üstünlük',
      description: 'Hərəkət prioritetini müəyyən edir',
      count: roadSignsData.filter(s => s.category === 'priority').length,
      color: 'bg-info-50',
      iconColor: 'text-info-600',
      Icon: ArrowUpCircle
    },
    {
      id: 'prohibitory',
      name: 'Qadağan',
      description: 'Müəyyən hərəkətləri qadağan edir',
      count: roadSignsData.filter(s => s.category === 'prohibitory').length,
      color: 'bg-error-50',
      iconColor: 'text-error-600',
      Icon: Ban
    },
    {
      id: 'mandatory',
      name: 'Məcburi',
      description: 'İstiqamət tələb edir',
      count: roadSignsData.filter(s => s.category === 'mandatory').length,
      color: 'bg-info-50',
      iconColor: 'text-info-600',
      Icon: Navigation
    },
    {
      id: 'information',
      name: 'İnformasiya',
      description: 'Yol şəraiti haqqında məlumat',
      count: roadSignsData.filter(s => s.category === 'information').length,
      color: 'bg-success-50',
      iconColor: 'text-success-600',
      Icon: Info
    },
    {
      id: 'service',
      name: 'Xidmət',
      description: 'Yol xidmətləri',
      count: roadSignsData.filter(s => s.category === 'service').length,
      color: 'bg-primary-50',
      iconColor: 'text-primary-600',
      Icon: Wrench
    },
    {
      id: 'additional',
      name: 'Əlavə',
      description: 'Digər nişanları tamamlayır',
      count: roadSignsData.filter(s => s.category === 'additional').length,
      color: 'bg-gray-50',
      iconColor: 'text-gray-600',
      Icon: Plus
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
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 lg:px-8 py-6">
        <div className="max-w-[1400px] mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Geri</span>
          </button>
          
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Yol nişanları</h1>
              <p className="text-base text-gray-600">
                Bütün yol nişanlarını qruplar üzrə görün və hər nişanın izahı ilə tanış olun
              </p>
            </div>
            <Badge variant="neutral">
              {filteredSigns.length} nişan
            </Badge>
          </div>

          {/* Search */}
          <Input
            type="text"
            placeholder="Nişan adı və ya kod axtar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={Search}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 h-full">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <Card variant="default" className="sticky top-8">
                <h2 className="text-base font-semibold text-gray-900 mb-4">Qruplar</h2>
                <div className="space-y-1">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setSelectedGroup(group.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                        selectedGroup === group.id
                          ? 'bg-primary-50 text-primary-700 border border-primary-100'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {group.Icon ? (
                        <div className={`w-10 h-10 rounded-lg ${group.color} flex items-center justify-center flex-shrink-0`}>
                          <group.Icon className={`w-5 h-5 ${group.iconColor}`} strokeWidth={2} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                          <span className="text-xl">📋</span>
                        </div>
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm mb-0.5">{group.name}</div>
                        <div className="text-xs text-gray-500">{group.count} nişan</div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </aside>

            {/* Mobile Groups Dropdown */}
            <div className="lg:hidden">
              <Card variant="default">
                <button
                  onClick={() => setIsMobileGroupsOpen(!isMobileGroupsOpen)}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {selectedGroupData?.Icon && (
                      <div className={`w-10 h-10 rounded-lg ${selectedGroupData.color} flex items-center justify-center`}>
                        <selectedGroupData.Icon className={`w-5 h-5 ${selectedGroupData.iconColor}`} strokeWidth={2} />
                      </div>
                    )}
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{selectedGroupData?.name}</div>
                      <div className="text-xs text-gray-500">{selectedGroupData?.count} nişan</div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isMobileGroupsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isMobileGroupsOpen && (
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
                    {groups.map((group) => (
                      <button
                        key={group.id}
                        onClick={() => {
                          setSelectedGroup(group.id)
                          setIsMobileGroupsOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                          selectedGroup === group.id
                            ? 'bg-primary-50 text-primary-700'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {group.Icon && (
                          <div className={`w-10 h-10 rounded-lg ${group.color} flex items-center justify-center`}>
                            <group.Icon className={`w-5 h-5 ${group.iconColor}`} strokeWidth={2} />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-sm">{group.name}</div>
                          <div className="text-xs text-gray-500">{group.count} nişan</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            {/* Content */}
            <main className="flex-1 min-w-0 overflow-y-auto">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {selectedGroupData?.name}
                </h2>
                <p className="text-sm text-gray-600">{selectedGroupData?.description}</p>
              </div>

              {filteredSigns.length > 0 ? (
                <div className="space-y-4 pb-8">
                  {filteredSigns.map((sign) => (
                    <RoadSignCard key={sign.id} sign={sign} />
                  ))}
                </div>
              ) : (
                <Card variant="subtle" className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Heç bir nişan tapılmadı
                  </h3>
                  <p className="text-gray-600">
                    Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin
                  </p>
                </Card>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadSignsNew
