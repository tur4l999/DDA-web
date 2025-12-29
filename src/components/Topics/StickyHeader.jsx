import { Menu, ChevronRight } from 'lucide-react'

export default function StickyHeader({ topic, onMenuToggle }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500 font-medium hidden sm:inline">Mövzular</span>
            <ChevronRight className="w-4 h-4 text-slate-300 hidden sm:block" />
            <span className="text-slate-900 font-semibold truncate">
              {topic?.code}. {topic?.title}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
