import { Menu } from 'lucide-react'

export default function StickyHeader({ topic, onMenuToggle }) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100/50 shadow-sm">
      <div className="px-4 lg:px-6 py-2">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Topic title - full width */}
          <div className="flex-1">
            <h1 className="text-base lg:text-lg font-bold text-gray-900 tracking-tight line-clamp-1">
              <span className="text-primary-600 mr-2">{topic.code}</span>
              {topic.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
