import { ChevronRight, Bookmark, X } from 'lucide-react'

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
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 h-full flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => onTabChange('bookmarks')}
          className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 ${
            activeTab === 'bookmarks'
              ? 'border-primary-600 text-primary-600 bg-primary-50/10'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Saxlanılanlar
        </button>
        <button
          onClick={() => onTabChange('selectedDay')}
          className={`flex-1 py-4 text-sm font-bold transition-colors border-b-2 ${
            activeTab === 'selectedDay'
              ? 'border-primary-600 text-primary-600 bg-primary-50/10'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Seçilən Gün
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        {activeTab === 'bookmarks' ? (
          <div className="space-y-3">
            {bookmarkedLessons.length > 0 ? (
              bookmarkedLessons.map(lesson => (
                <div key={lesson.id} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm hover:shadow-md transition-all group relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveBookmark(lesson.id)
                    }}
                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">#{lesson.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                      lesson.language === 'az' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                    }`}>{lesson.language}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1 pr-6 cursor-pointer hover:text-primary-600" onClick={() => onViewDetails(lesson)}>{lesson.title}</h4>
                  <p className="text-xs text-gray-500 mb-2">{new Date(lesson.date).toLocaleDateString()}</p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Bookmark className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium text-sm">Hələ heç nə yoxdur</p>
                <p className="text-gray-400 text-xs mt-1">Bəyəndiyiniz dərsləri saxlayın</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 border-l-4 border-primary-500 pl-3">
              {selectedDate.toLocaleDateString('az-AZ', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>

            {lessonsForDate.length > 0 ? (
              lessonsForDate.map(lesson => (
                <div key={lesson.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded text-xs">
                      {new Date(lesson.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border ${
                      lesson.language === 'az' ? 'bg-white border-blue-100 text-blue-600' : 'bg-white border-red-100 text-red-600'
                    }`}>{lesson.language}</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-3">{lesson.title}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetails(lesson)}
                      className="flex-1 bg-white border border-gray-200 text-gray-700 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50"
                    >
                      Ətraflı
                    </button>
                    {lesson.status === 'started' && (
                      <button
                        onClick={() => onJoinLesson(lesson)}
                        className="flex-1 bg-primary-600 text-white py-1.5 rounded-lg text-xs font-bold hover:bg-primary-700"
                      >
                        Qoşul
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 text-sm py-8">Bu tarixdə dərs planlaşdırılmayıb</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
