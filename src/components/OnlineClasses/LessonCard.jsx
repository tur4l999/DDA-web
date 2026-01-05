import { Clock, User, Info, Send, PlayCircle, Lock } from 'lucide-react'

export default function LessonCard({ lesson, onJoin, onViewDetails }) {

  const formatTime = (date) => {
    const d = new Date(date)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const isStarted = lesson.status === 'started'
  const isCompleted = lesson.status === 'completed'
  const isWaiting = lesson.status === 'waiting'

  return (
    <div className={`
      group bg-white rounded-2xl p-5 border transition-all duration-200 relative overflow-hidden
      ${isStarted
         ? 'border-red-100 shadow-lg shadow-red-500/5 ring-1 ring-red-50'
         : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
      }
    `}>
      {/* Status Bar (Left Accent) */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5
         ${isStarted ? 'bg-red-500' : isCompleted ? 'bg-gray-200' : 'bg-blue-500'}
      `}></div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between pl-3">

         {/* Left: Time & Info */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">

            {/* Time Box */}
            <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center bg-gray-50 rounded-xl px-4 sm:px-0 py-2 sm:py-0 w-full sm:w-16 sm:h-16 flex-shrink-0 border border-gray-100">
               <span className="text-lg font-black text-gray-900">{formatTime(lesson.date)}</span>
               <span className="text-[10px] font-bold text-gray-400 uppercase hidden sm:block">GMT+4</span>
            </div>

            {/* Texts */}
            <div className="flex-1">
               <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-blue-600 transition-colors">
                     {lesson.title}
                  </h3>
                  {isStarted && (
                     <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600 animate-pulse whitespace-nowrap">
                        CANLI
                     </span>
                  )}
               </div>

               <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="font-medium text-gray-700 flex items-center gap-1 whitespace-nowrap">
                     <User className="w-3.5 h-3.5 text-gray-400" />
                     {lesson.instructor}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 hidden sm:block"></span>
                  <span className="flex items-center gap-1 whitespace-nowrap">
                     <Clock className="w-3.5 h-3.5 text-gray-400" />
                     {lesson.duration} dəq
                  </span>
               </div>
            </div>
         </div>

         {/* Right: Actions */}
         <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">

            {isStarted ? (
               <button
                  onClick={onJoin}
                  className="flex-1 md:flex-none bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2"
               >
                  <PlayCircle className="w-4 h-4" />
                  Qoşul
               </button>
            ) : isCompleted ? (
               <a
                  href="https://t.me/avtoimtahan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-none border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 hover:text-blue-600 px-4 py-3 md:py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group/btn"
               >
                  <span>Təkrar izlə</span>
                  <Send className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-blue-500" />
               </a>
            ) : (
               <div className="flex-1 md:flex-none bg-gray-50 text-gray-400 px-4 py-3 md:py-2.5 rounded-xl font-semibold text-sm border border-gray-100 flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock className="w-3.5 h-3.5" />
                  Gözlənilir
               </div>
            )}

            <button
               onClick={onViewDetails}
               className="p-3 md:p-2.5 rounded-xl text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors border border-transparent hover:border-gray-200"
               title="Ətraflı"
            >
               <Info className="w-5 h-5" />
            </button>
         </div>

      </div>
    </div>
  )
}
