import { Triangle, Circle, Octagon, Square, Info, Wrench, PlusCircle } from 'lucide-react'

const groups = [
  {
    id: 1,
    name: 'Xəbərdarlıq nişanları',
    count: 34,
    icon: Triangle,
    color: '#EF4444'
  },
  {
    id: 2,
    name: 'Üstünlük nişanları',
    count: 12,
    icon: Triangle,
    color: '#F59E0B'
  },
  {
    id: 3,
    name: 'Qadağan nişanları',
    count: 28,
    icon: Circle,
    color: '#DC2626'
  },
  {
    id: 4,
    name: 'Məcburi nişanlar',
    count: 16,
    icon: Circle,
    color: '#3B82F6'
  },
  {
    id: 5,
    name: 'İnformasiya nişanları',
    count: 22,
    icon: Square,
    color: '#10B981'
  },
  {
    id: 6,
    name: 'Xidmət nişanları',
    count: 18,
    icon: Info,
    color: '#8B5CF6'
  },
  {
    id: 7,
    name: 'Əlavə nişanlar',
    count: 14,
    icon: PlusCircle,
    color: '#6B7280'
  }
]

export default function GroupSidebar({ selectedGroup, setSelectedGroup, className = '' }) {
  return (
    <div className={`w-80 flex-shrink-0 ${className}`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sticky top-32 max-h-[calc(100vh-9rem)] overflow-y-auto">
        <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Qruplar</h3>
        <div className="space-y-2">
          {groups.map((group) => {
            const Icon = group.icon
            const isActive = selectedGroup === group.id

            return (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left relative ${
                  isActive
                    ? 'bg-primary-50 shadow-sm'
                    : 'hover:bg-gray-50'
                }`}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary-600 rounded-r-full" />
                )}

                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? 'bg-primary-100' : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-primary-600' : 'text-gray-600'
                    }`}
                    strokeWidth={2}
                  />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold ${
                    isActive ? 'text-primary-700' : 'text-gray-900'
                  }`}>
                    {group.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {group.count} nişan
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
