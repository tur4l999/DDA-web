import { Menu } from 'lucide-react'

export default function StickyHeader({ topic, onMenuToggle }) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Topic title - full width */}
          <div className="flex-1">
            <h1 className="text-base lg:text-lg font-semibold text-gray-900">
              {topic.code} · {topic.title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
