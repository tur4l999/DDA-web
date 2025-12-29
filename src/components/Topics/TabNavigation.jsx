import { FileText, Video, HelpCircle, BookOpen, BookMarked, MessageCircle, AlertTriangle, Lock } from 'lucide-react'

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
    <div className="sticky top-[57px] z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="px-4 lg:px-6 py-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {/* Tabs */}
          <div className="flex gap-1 flex-1">
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 rounded-xl ${
                      activeTab === tab.id && hasAccess
                        ? 'bg-primary-50 text-primary-700'
                        : isLocked
                          ? 'text-slate-400 hover:bg-slate-50 cursor-not-allowed'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                    <span>{tab.label}</span>
                    {isLocked && <Lock className="w-3 h-3 ml-0.5" />}
                  </button>
                  
                  {/* Tooltip */}
                  {isLocked && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Paket tələb olunur
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Exam Button */}
          <button
            onClick={onExamClick}
            className="btn-primary py-2 px-4 text-sm whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>İmtahan ver</span>
          </button>
        </div>
      </div>
    </div>
  )
}
