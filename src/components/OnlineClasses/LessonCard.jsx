import { Video, Clock, Bookmark, RotateCcw, CheckCircle2, User, Calendar as CalendarIcon, Play } from 'lucide-react'

export default function LessonCard({ lesson, onJoin, onViewDetails, onWatchReplay, onToggleBookmark }) {
  const isStarted = lesson.status === 'started'
  const isWaiting = lesson.status === 'waiting'
  const isCompleted = lesson.status === 'completed'
  const hasReplay = isCompleted && lesson.replayUrl

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-card transition-all duration-300 overflow-hidden flex flex-col h-full relative">
      {/* Top Banner with Code and Language */}
      <div className="h-2 bg-gray-100 group-hover:bg-primary-500 transition-colors duration-300" />

      <div className="p-5 flex-1 flex flex-col">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-2">
            <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border border-gray-200">
              #{String(lesson.id).padStart(4, '0')}
            </span>
            <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide border uppercase ${
              lesson.language === 'az'
                ? 'bg-blue-50 text-blue-600 border-blue-100'
                : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {lesson.language}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleBookmark(lesson.id)
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              lesson.bookmarked
                ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100'
                : 'text-gray-300 hover:bg-gray-50 hover:text-gray-500'
            }`}
          >
            <Bookmark className="w-5 h-5" fill={lesson.bookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Title & Info */}
        <h3
          className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-primary-700 transition-colors cursor-pointer"
          onClick={() => onViewDetails(lesson)}
        >
          {lesson.title}
        </h3>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <User className="w-4 h-4 text-gray-400" />
            <span>{lesson.instructor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <span>
              {new Date(lesson.date).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short' })}
              <span className="mx-1">•</span>
              {new Date(lesson.date).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Action Button - Pushed to bottom */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          {isStarted ? (
            <button
              onClick={() => onJoin(lesson)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 animate-pulse"
            >
              <Video className="w-4 h-4" />
              Qoşul
            </button>
          ) : isWaiting ? (
            <div className="flex gap-2">
              <button
                onClick={() => onViewDetails(lesson)}
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-bold transition-all border border-gray-200 flex items-center justify-center gap-2"
              >
                Ətraflı
              </button>
            </div>
          ) : hasReplay ? (
            <button
              disabled
              className="w-full bg-gray-50 text-gray-400 py-3 rounded-xl font-bold transition-all border border-gray-100 flex items-center justify-center gap-2 cursor-not-allowed select-none"
            >
              <RotateCcw className="w-4 h-4" />
              Təkrarı telegramda izlə
            </button>
          ) : (
            <button
              disabled
              className="w-full bg-gray-50 text-gray-400 py-3 rounded-xl font-bold border border-gray-100 flex items-center justify-center gap-2 cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              Bitib
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
