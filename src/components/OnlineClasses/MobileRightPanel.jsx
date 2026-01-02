import { Bookmark, Calendar, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import RightPanel from './RightPanel'

export default function MobileRightPanel({
  activeTab,
  onTabChange,
  bookmarkedLessons,
  onRemoveBookmark,
  selectedDate,
  lessonsForDate,
  onJoinLesson,
  onViewDetails
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const tabInfo = {
    bookmarks: {
      icon: Bookmark,
      label: 'Saxlanılanlar',
      count: bookmarkedLessons.length
    },
    selectedDay: {
      icon: Calendar,
      label: 'Seçilmiş gün',
      count: lessonsForDate?.length || 0
    }
  }

  const currentTabInfo = tabInfo[activeTab]
  const Icon = currentTabInfo.icon

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-gray-200 shadow-2xl">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-gradient-to-r from-primary-500 to-primary-700 text-white"
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5" />
          <span className="font-semibold">{currentTabInfo.label}</span>
          {currentTabInfo.count > 0 && (
            <span className="px-2 py-0.5 bg-white text-primary-600 text-xs rounded-full font-bold">
              {currentTabInfo.count}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="max-h-[70vh] overflow-hidden">
          <RightPanel
            activeTab={activeTab}
            onTabChange={onTabChange}
            bookmarkedLessons={bookmarkedLessons}
            onRemoveBookmark={onRemoveBookmark}
            selectedDate={selectedDate}
            lessonsForDate={lessonsForDate}
            onJoinLesson={onJoinLesson}
            onViewDetails={onViewDetails}
          />
        </div>
      )}
    </div>
  )
}
