import { ArrowLeft, Menu } from 'lucide-react'

export default function StickyHeader({ topic, onBack, onMenuToggle, progress }) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium hidden sm:inline">Təlim mövzuları</span>
            </button>
          </div>

          {/* Center */}
          <div className="flex-1 text-center">
            <h1 className="text-base lg:text-lg font-semibold text-gray-900">
              {topic.code} · {topic.title}
            </h1>
          </div>

          {/* Right - Progress */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-medium text-gray-900">{progress.completed}/{progress.total}</p>
              <p className="text-xs text-gray-500">tamamlandı</p>
            </div>
            <div className="w-20">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#007A3A] rounded-full transition-all"
                  style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile progress */}
      <div className="sm:hidden px-4 pb-3">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-600">{progress.completed}/{progress.total} tamamlandı</span>
          <span className="font-medium text-gray-900">{Math.round((progress.completed / progress.total) * 100)}%</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#007A3A] rounded-full transition-all"
            style={{ width: `${(progress.completed / progress.total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
