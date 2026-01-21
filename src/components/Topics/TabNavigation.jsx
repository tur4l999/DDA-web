import { FileText, Video, HelpCircle, BookOpen, BookMarked, MessageCircle, AlertTriangle, Lock, GraduationCap } from 'lucide-react'

const tabs = [
  { id: 'materials', label: 'Maddələr', icon: BookMarked, requiresPackage: false },
  { id: 'text', label: 'Dərs materialı', icon: FileText, requiresPackage: false },
  { id: '3dvideo', label: '3D video', icon: Video, requiresPackage: false },
  { id: 'video', label: 'Video dərs', icon: BookOpen, requiresPackage: true },
  { id: 'questions', label: 'Testlər', icon: HelpCircle, requiresPackage: false },
  { id: 'contact', label: 'Müəllimlə əlaqə', icon: MessageCircle, requiresPackage: false },
  { id: 'penalties', label: 'Mövzu üzrə Cərimələr', icon: AlertTriangle, requiresPackage: false }
]

export default function TabNavigation({ activeTab, onTabChange, onExamClick, onContactClick, userPackage = 'basic', onPaywallOpen }) {
  return (
    <div className="bg-white border-b border-gray-100/50 shadow-sm">
      <div className="px-4 lg:px-6 pb-2 pt-1">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-0.5">
          {/* Regular tabs - No flex-1 to allow button to stay closer */}
          <div className="flex gap-1">
            {tabs.map(tab => {
              const Icon = tab.icon
              const isContactTab = tab.id === 'contact'
              const isLocked = tab.requiresPackage && userPackage === 'basic'
              const hasAccess = !isLocked || ['premium', 'standard'].includes(userPackage)
              
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
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all rounded-lg ${
                      activeTab === tab.id && hasAccess
                        ? 'bg-primary-50 text-primary-700 ring-1 ring-primary-100'
                        : isLocked
                          ? 'text-gray-400 hover:bg-gray-50 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>{tab.label}</span>
                    {isLocked && <Lock className="w-3 h-3 text-gray-400" />}
                  </button>
                  
                  {/* Tooltip */}
                  {isLocked && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-gray-900 text-white text-[10px] font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
                      Paket tələb olunur
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Primary CTA - Mövzu imtahanı - Added left margin for separation */}
          <button
            onClick={onExamClick}
            className="ml-8 flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 active:scale-95 flex-shrink-0 border border-primary-400/20 group"
          >
            <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
            <span>Mövzu imtahanı</span>
          </button>
        </div>
      </div>
    </div>
  )
}
