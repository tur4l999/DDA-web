import { FileText, Video, HelpCircle, BookOpen } from 'lucide-react'

const tabs = [
  { id: 'text', label: 'Mətn', icon: FileText },
  { id: 'materials', label: 'Dərs materialı', icon: BookOpen },
  { id: 'video', label: '3D video', icon: Video },
  { id: 'questions', label: 'Suallar', icon: HelpCircle }
]

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className="sticky top-[73px] sm:top-[89px] z-20 bg-white border-b border-gray-200">
      <div className="px-4 lg:px-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-[#007A3A] border-[#007A3A]'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
