import { useState, useMemo } from 'react'
import { Search, ChevronDown, List, AlertTriangle, ArrowUpCircle, Ban, Navigation, Info, Wrench, Plus, Filter } from 'lucide-react'
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
      color: 'bg-slate-100',
      iconColor: 'text-slate-600'
    },
    {
      id: 'warning',
      name: 'Xəbərdarlıq',
      icon: AlertTriangle,
      description: 'Təhlükə barədə xəbərdarlıq',
      count: roadSignsData.filter(s => s.category === 'warning').length,
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      id: 'priority',
      name: 'Üstünlük',
      icon: ArrowUpCircle,
      description: 'Keçid hüququnu müəyyən edir',
      count: roadSignsData.filter(s => s.category === 'priority').length,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'prohibitory',
      name: 'Qadağan',
      icon: Ban,
      description: 'Hərəkəti məhdudlaşdırır',
      count: roadSignsData.filter(s => s.category === 'prohibitory').length,
      color: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      id: 'mandatory',
      name: 'Məcburi',
      icon: Navigation,
      description: 'Məcburi hərəkət istiqaməti',
      count: roadSignsData.filter(s => s.category === 'mandatory').length,
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'information',
      name: 'İnformasiya',
      icon: Info,
      description: 'Yol şəraiti barədə məlumat',
      count: roadSignsData.filter(s => s.category === 'information').length,
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 'service',
      name: 'Xidmət',
      icon: Wrench,
      description: 'Obyektlər barədə məlumat',
      count: roadSignsData.filter(s => s.category === 'service').length,
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 'additional',
      name: 'Əlavə',
      icon: Plus,
      description: 'Lövhəciklər',
      count: roadSignsData.filter(s => s.category === 'additional').length,
      color: 'bg-slate-50',
      iconColor: 'text-slate-600'
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
        sign.description?.toLowerCase().includes(query)
      )
    }

    return signs
  }, [selectedGroup, searchQuery])

  const selectedGroupData = groups.find(g => g.id === selectedGroup)

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Yol Nişanları</h1>
           <p className="text-slate-500 text-sm">Bütün yol nişanlarının kataloqu və izahı</p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
           onClick={() => setIsMobileGroupsOpen(!isMobileGroupsOpen)}
           className="md:hidden flex items-center justify-between px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm"
        >
           <span className="font-medium text-slate-700 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {selectedGroupData.name}
           </span>
           <ChevronDown className={`w-4 h-4 transition-transform ${isMobileGroupsOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
           <div className="bg-white rounded-2xl border border-slate-200 p-4 sticky top-4">
              <div className="relative mb-4">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input
                    type="text"
                    placeholder="Axtar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                 />
              </div>

              <div className="space-y-1">
                 {groups.map((group) => {
                    const Icon = group.icon
                    const isSelected = selectedGroup === group.id
                    return (
                       <button
                          key={group.id}
                          onClick={() => setSelectedGroup(group.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                             isSelected 
                                ? 'bg-primary-50 text-primary-700' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`}
                       >
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-primary-600' : 'text-slate-400'}`} />
                          <span className="flex-1 text-left">{group.name}</span>
                          {group.count !== undefined && (
                             <span className="text-xs text-slate-400 bg-white px-1.5 py-0.5 rounded-md border border-slate-100">{group.count}</span>
                          )}
                       </button>
                    )
                 })}
              </div>
           </div>
        </aside>

        {/* Mobile Drawer (if open) */}
        {isMobileGroupsOpen && (
           <div className="md:hidden bg-white border border-slate-200 rounded-xl p-2 mb-4">
               {groups.map((group) => {
                  const Icon = group.icon
                  const isSelected = selectedGroup === group.id
                  return (
                     <button
                        key={group.id}
                        onClick={() => {
                           setSelectedGroup(group.id)
                           setIsMobileGroupsOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-3 border-b last:border-0 border-slate-50 ${
                           isSelected ? 'text-primary-700 font-medium' : 'text-slate-600'
                        }`}
                     >
                        <Icon className="w-4 h-4" />
                        {group.name}
                     </button>
                  )
               })}
           </div>
        )}

        {/* Grid Content */}
        <main className="flex-1">
           {/* Mobile Search */}
           <div className="md:hidden relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                 type="text"
                 placeholder="Nişan axtar..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-9 pr-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
           </div>

           {filteredSigns.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                 {filteredSigns.map((sign) => (
                    <RoadSignCard key={sign.id} sign={sign} />
                 ))}
              </div>
           ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                 <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900">Nişan tapılmadı</h3>
                 <p className="text-slate-500 mt-1">Axtarış sorğusunu dəyişdirin</p>
              </div>
           )}
        </main>
      </div>
    </div>
  )
}

export default RoadSigns
