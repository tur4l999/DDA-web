import { FileText, Video, HelpCircle, BookOpen, BookMarked, MessageCircle, AlertTriangle } from 'lucide-react'

const tabs = [
  { id: 'materials', label: 'Maddələr', icon: BookMarked },
  { id: 'text', label: 'Dərs materialı', icon: FileText },
  { id: '3dvideo', label: '3D video', icon: Video },
  { id: 'video', label: 'Video dərs', icon: BookOpen },
  { id: 'questions', label: 'Suallar', icon: HelpCircle },
  { id: 'contact', label: 'Müəllimlə əlaqə', icon: MessageCircle },
  { id: 'penalties', label: 'Cərimələr', icon: AlertTriangle }
]

export default function TabNavigation({ activeTab, onTabChange, onExamClick, onContactClick }) {
  return (
    <div className="sticky top-[73px] sm:top-[89px] z-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 lg:px-6 py-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {/* Regular tabs */}
          <div className="flex gap-1 flex-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isContactTab = tab.id === 'contact'
              
              return (
                <button
                  key={tab.id}
                  onClick={() => isContactTab ? onContactClick?.() : onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium whitespace-nowrap transition-all rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-[#007A3A]/10 text-[#007A3A]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          {/* Primary CTA - İmtahan ver */}
          <button
            onClick={onExamClick}
            className="flex items-center gap-2 px-4 py-2 bg-[#007A3A] hover:bg-[#005A2A] text-white text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>İmtahan ver</span>
          </button>
        </div>
      </div>
    </div>
  )
}
