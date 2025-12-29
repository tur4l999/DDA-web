import { useState } from 'react'
import { Bookmark, Calendar, X, ChevronUp, ChevronDown, Clock, User, Play, ChevronRight } from 'lucide-react'

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

  const formatDate = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = d.getFullYear()
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${day}.${month}.${year} ${hours}:${minutes}`
  }

  const formatSelectedDate = (date) => {
    if (!date) return ''
    const options = { weekday: 'short', day: 'numeric', month: 'short' }
    return date.toLocaleDateString('az-AZ', options)
  }

  const count = activeTab === 'bookmarks' ? bookmarkedLessons.length : lessonsForDate.length

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-soft-lg z-40">
      {/* Toggle Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-3">
          {activeTab === 'bookmarks' ? (
            <Bookmark className="w-5 h-5 text-primary-600" />
          ) : (
            <Calendar className="w-5 h-5 text-primary-600" />
          )}
          <span className="text-sm font-semibold text-slate-900">
            {activeTab === 'bookmarks' ? 'Saxlanılanlar' : formatSelectedDate(selectedDate)}
          </span>
          <span className="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-slate-100 max-h-[60vh] overflow-y-auto">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 px-4">
            <button
              onClick={() => onTabChange('bookmarks')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'bookmarks'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-slate-500'
              }`}
            >
              Saxlanılanlar
            </button>
            <button
              onClick={() => onTabChange('selectedDay')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === 'selectedDay'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-slate-500'
              }`}
            >
              Seçilmiş gün
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {activeTab === 'bookmarks' && bookmarkedLessons.map(lesson => (
              <div 
                key={lesson.id}
                className="bg-surface-50 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-semibold text-slate-900 flex-1">{lesson.title}</h4>
                  <button
                    onClick={() => onRemoveBookmark(lesson.id)}
                    className="p-1 text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-slate-500 mb-3">
                  {formatDate(lesson.date)}
                </div>
                <button
                  onClick={() => {
                    onViewDetails(lesson)
                    setIsExpanded(false)
                  }}
                  className="w-full btn-secondary py-2 text-sm"
                >
                  Detallara bax
                </button>
              </div>
            ))}

            {activeTab === 'selectedDay' && lessonsForDate.map(lesson => (
              <div 
                key={lesson.id}
                className="bg-surface-50 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(lesson.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">{lesson.title}</h4>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                  <User className="w-3 h-3" />
                  <span>{lesson.instructor}</span>
                </div>
                
                {lesson.status === 'started' ? (
                  <button
                    onClick={() => {
                      onJoinLesson(lesson)
                      setIsExpanded(false)
                    }}
                    className="w-full btn-primary py-2 text-sm"
                  >
                    <Play className="w-4 h-4" />
                    <span>Qoşul</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onViewDetails(lesson)
                      setIsExpanded(false)
                    }}
                    className="w-full btn-secondary py-2 text-sm"
                  >
                    Detallara bax
                  </button>
                )}
              </div>
            ))}

            {((activeTab === 'bookmarks' && bookmarkedLessons.length === 0) ||
              (activeTab === 'selectedDay' && lessonsForDate.length === 0)) && (
              <div className="text-center py-8">
                {activeTab === 'bookmarks' ? (
                  <Bookmark className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                ) : (
                  <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                )}
                <p className="text-sm text-slate-500">
                  {activeTab === 'bookmarks' ? 'Saxlanılan dərs yoxdur' : 'Bu gün üçün dərs yoxdur'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
