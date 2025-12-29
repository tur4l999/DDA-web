import { Menu } from 'lucide-react'
import PenaltiesContent from './Topics/PenaltiesContent'

export default function PenaltiesPage({ onMenuClick }) {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center gap-4">
            {/* Page title */}
            <div className="flex-1">
              <h1 className="text-base lg:text-lg font-semibold text-gray-900">
                İnzibati Xətalar Məcəlləsi
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">Yol hərəkəti qaydalarının pozulmasına görə cərimələr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 lg:px-6 py-8">
          <PenaltiesContent topicRelated={false} />
        </div>
      </main>
    </div>
  )
}
