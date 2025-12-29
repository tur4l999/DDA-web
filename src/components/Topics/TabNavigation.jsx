import { FileText, Video, HelpCircle, BookOpen, BookMarked, MessageCircle, AlertTriangle, Lock, FileCheck } from 'lucide-react'

const tabs = [
  { id: 'materials', label: 'Maddələr', icon: BookMarked, requiresPackage: false },
  { id: 'text', label: 'Dərs materialı', icon: FileText, requiresPackage: false },
  { id: '3dvideo', label: '3D video', icon: Video, requiresPackage: false },
  { id: 'video', label: 'Video dərs', icon: BookOpen, requiresPackage: true },
  { id: 'questions', label: 'Suallar', icon: HelpCircle, requiresPackage: false },
  { id: 'contact', label: 'Müəllimlə əlaqə', icon: MessageCircle, requiresPackage: false },
  { id: 'penalties', label: 'Cərimələr', icon: AlertTriangle, requiresPackage: false }
]

export default function TabNavigation({ activeTab, onTabChange, onExamClick, onContactClick, userPackage = 'basic', onPaywallOpen }) {
  return (
    <div className="sticky top-[65px] z-10 bg-white border-b border-neutral-100">
      <div className="px-4 lg:px-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2 -mx-4 px-4 lg:mx-0 lg:px-0">
          {/* Tab buttons */}
          <div className="flex items-center gap-1 flex-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isContactTab = tab.id === 'contact'
              const isLocked = tab.requiresPackage && userPackage === 'basic'
              const hasAccess = !isLocked || ['premium', 'standard'].includes(userPackage)
              const isActive = activeTab === tab.id && hasAccess
              
              return (
                <div key={tab.id} className="relative group">
                  <button
                    onClick={() => {
                      if (isContactTab) {
                        onContactClick?.()
                      } else if (isLocked) {
                        onPaywallOpen?.()
                      } else {
                        onTabChange(tab.id)
                      }
                    }}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : isLocked
                          ? 'text-neutral-400 hover:bg-neutral-50 cursor-not-allowed'
                          : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="hidden sm:inline">{tab.label}</span>
                    {isLocked && <Lock className="w-3 h-3 text-neutral-400" />}
                  </button>
                  
                  {/* Tooltip for locked tabs */}
                  {isLocked && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-neutral-800 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Paket tələb olunur
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-800" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onExamClick}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shadow-sm ml-2"
          >
            <FileCheck className="w-4 h-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">İmtahan ver</span>
          </button>
        </div>
      </div>
    </div>
  )
}
