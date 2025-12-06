import { Bookmark, Calendar, Clock, User, Play, Video, ExternalLink, X } from 'lucide-react'
import { useState } from 'react'

const filterChips = [
  { id: 'all', label: 'Hamısı' },
  { id: 'thisWeek', label: 'Bu həftə' },
  { id: 'started', label: 'Başladı' },
  { id: 'waiting', label: 'Gözləyir' },
  { id: 'completed', label: 'Tamamlandı' },
  { id: 'hasReplay', label: 'Təkrar videosu olanlar' }
]

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
  const [chipFilter, setChipFilter] = useState('all')

  const getStatusColor = (status) => {
    switch(status) {
      case 'started': return 'bg-green-50 text-green-700 border-green-200'
      case 'waiting': return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'completed': return 'bg-gray-100 text-gray-600 border-gray-200'
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  const getStatusLabel = (status) => {
    const labels = {
      started: 'Başladı',
      waiting: 'Gözləyir',
      completed: 'Tamamlandı',
      cancelled: 'Ləğv edildi'
    }
    return labels[status] || status
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('az-AZ', { 
      day: 'numeric',
      month: 'long',
      weekday: 'long'
    })
  }

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('az-AZ', { 
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getLanguageLabel = (lang) => {
    const languages = { az: 'AZ', ru: 'RU', en: 'EN' }
    return languages[lang] || lang.toUpperCase()
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Tabs - Sticky */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => onTabChange('bookmarks')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'bookmarks'
                ? 'text-[#007A3A] border-[#007A3A]'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Bookmark className="w-4 h-4" />
              <span>Saxlanılanlar</span>
              {bookmarkedLessons.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 bg-[#007A3A] text-white text-xs rounded-full">
                  {bookmarkedLessons.length}
                </span>
              )}
            </div>
          </button>
          <button
            onClick={() => onTabChange('selectedDay')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'selectedDay'
                ? 'text-[#007A3A] border-[#007A3A]'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Seçilmiş gün</span>
            </div>
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'bookmarks' && (
          <div className="p-4 space-y-4">
            {/* Bookmarked Lessons */}
            {bookmarkedLessons.length > 0 ? (
              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
                {bookmarkedLessons.map(lesson => (
                  <div
                    key={lesson.id}
                    className="bg-gray-50 border border-gray-200 rounded-xl p-3 hover:border-[#007A3A] transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 flex-1">
                        {lesson.title}
                      </h4>
                      <button
                        onClick={() => onRemoveBookmark(lesson.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white transition-colors flex-shrink-0"
                      >
                        <Bookmark className="w-4 h-4 text-[#007A3A] fill-[#007A3A]" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(lesson.status)}`}>
                        {getStatusLabel(lesson.status)}
                      </span>
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-medium">
                        {getLanguageLabel(lesson.language)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(lesson.date)}</span>
                      </div>
                      <span>•</span>
                      <span>{lesson.duration} dəq</span>
                      {lesson.instructor && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{lesson.instructor}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {(lesson.status === 'started' || lesson.status === 'waiting') && (
                        <button
                          onClick={() => onJoinLesson(lesson)}
                          className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                            lesson.status === 'started'
                              ? 'bg-[#007A3A] hover:bg-[#005A2A] text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {lesson.status === 'started' ? 'Dərsə qoşul' : 'Xatırlat'}
                        </button>
                      )}
                      {lesson.hasReplay && (
                        <button className="flex-1 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                          <Play className="w-3 h-3" />
                          <span>Təkrar</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium mb-1">Saxlanılan dərs yoxdur</p>
                <p className="text-xs text-gray-500">
                  Dərs kartındakı işarə düyməsini basın
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'selectedDay' && (
          <div className="p-4">
            {selectedDate ? (
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  {formatDate(selectedDate)}
                </h3>
                {lessonsForDate && lessonsForDate.length > 0 ? (
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-3">
                    {lessonsForDate.map(lesson => (
                      <div
                        key={lesson.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-3 hover:border-[#007A3A] transition-all cursor-pointer"
                        onClick={() => onViewDetails(lesson)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatTime(lesson.date)}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusColor(lesson.status)}`}>
                            {getStatusLabel(lesson.status)}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sm text-gray-900 mb-2">
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <span>{lesson.duration} dəq</span>
                          <span>•</span>
                          <span>{getLanguageLabel(lesson.language)}</span>
                          {lesson.instructor && (
                            <>
                              <span>•</span>
                              <span>{lesson.instructor}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 font-medium mb-1">Bu gün üçün dərs yoxdur</p>
                    <button
                      onClick={() => onTabChange('bookmarks')}
                      className="mt-3 text-sm text-[#007A3A] hover:text-[#005A2A] font-medium"
                    >
                      Saxlanılanlara baxın →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium mb-1">Gün seçilməyib</p>
                <p className="text-xs text-gray-500">Təqvimdən gün seçin</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
