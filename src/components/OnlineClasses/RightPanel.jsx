import { Bookmark, Calendar, Clock, User, Play, X, ChevronRight } from 'lucide-react'

export default function RightPanel({ 
  activeTab, 
  onTabChange, 
  bookmarkedLessons, 
  onRemoveBookmark,
  selectedDate,
  lessonsForDate,
  onJoinLesson,
  onViewDetails
}) {
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
    const options = { weekday: 'long', day: 'numeric', month: 'long' }
    return date.toLocaleDateString('az-AZ', options)
  }

  return (
    <div className="card h-full flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => onTabChange('bookmarks')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'bookmarks'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saxlanılanlar</span>
        </button>
        <button
          onClick={() => onTabChange('selectedDay')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'selectedDay'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Seçilmiş gün</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
        {activeTab === 'bookmarks' && (
          <div className="space-y-3">
            {bookmarkedLessons.length > 0 ? (
              bookmarkedLessons.map(lesson => (
                <div 
                  key={lesson.id}
                  className="bg-surface-50 rounded-xl p-4 hover:bg-surface-100 transition-colors group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-semibold text-slate-900 flex-1">{lesson.title}</h4>
                    <button
                      onClick={() => onRemoveBookmark(lesson.id)}
                      className="p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(lesson.date)}
                    </span>
                  </div>
                  <button
                    onClick={() => onViewDetails(lesson)}
                    className="w-full flex items-center justify-center gap-1 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    <span>Detallara bax</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-500">Saxlanılan dərs yoxdur</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'selectedDay' && (
          <div className="space-y-3">
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-900">{formatSelectedDate(selectedDate)}</p>
              <p className="text-xs text-slate-500">{lessonsForDate.length} dərs</p>
            </div>
            
            {lessonsForDate.length > 0 ? (
              lessonsForDate.map(lesson => (
                <div 
                  key={lesson.id}
                  className="bg-surface-50 rounded-xl p-4 hover:bg-surface-100 transition-colors"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <Clock className="w-3 h-3" />
                    <span className="font-medium">
                      {new Date(lesson.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span>•</span>
                    <span>{lesson.duration} dəq</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-2">{lesson.title}</h4>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                    <User className="w-3 h-3" />
                    <span>{lesson.instructor}</span>
                  </div>
                  
                  {lesson.status === 'started' && (
                    <button
                      onClick={() => onJoinLesson(lesson)}
                      className="w-full btn-primary py-2 text-sm"
                    >
                      <Play className="w-4 h-4" />
                      <span>Qoşul</span>
                    </button>
                  )}
                  
                  {lesson.status !== 'started' && (
                    <button
                      onClick={() => onViewDetails(lesson)}
                      className="w-full btn-secondary py-2 text-sm"
                    >
                      Detallara bax
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-500">Bu gün üçün dərs yoxdur</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
