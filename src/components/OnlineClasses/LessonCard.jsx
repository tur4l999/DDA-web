import { Clock, User, Info, Send, PlayCircle, Lock } from 'lucide-react'

export default function LessonCard({ lesson, onJoin, onViewDetails }) {

  const formatTime = (date) => {
    const d = new Date(date)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const isStarted = lesson.status === 'started'
  const isCompleted = lesson.status === 'completed'
  const isWaiting = lesson.status === 'waiting'
  const isAz = lesson.language === 'az'

  return (
    <div className={`
      group bg-white rounded-3xl p-5 border transition-all duration-300 relative overflow-hidden flex flex-col h-full
      ${isStarted
         ? 'border-red-100 shadow-xl shadow-red-500/10 ring-1 ring-red-50'
         : 'border-gray-100 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1'
      }
    `}>
      {/* Top Row: Language & Status */}
      <div className="flex items-center justify-between mb-4">
         <div className={`
            px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border
            ${isAz ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-orange-50 text-orange-700 border-orange-100'}
         `}>
            {isAz ? 'AZ' : 'RU'}
         </div>

         {isStarted ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-red-600 border border-red-200">
               <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
               <span className="text-[10px] font-bold uppercase">Canlı</span>
            </div>
         ) : isCompleted ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
               <span className="text-[10px] font-bold uppercase">Bitdi</span>
            </div>
         ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
               <span className="text-[10px] font-bold uppercase">Gözlənilir</span>
            </div>
         )}
      </div>

      {/* Main Content */}
      <div className="flex-1">
         <div className="flex items-end gap-2 mb-2">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
               {formatTime(lesson.date)}
            </h2>
            <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">GMT+4</span>
         </div>

         <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {lesson.title}
         </h3>

         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
               <User className="w-4 h-4 text-gray-400" />
               <span className="truncate">{lesson.instructor}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
               <Clock className="w-4 h-4 text-gray-400" />
               <span>{lesson.duration} dəq</span>
            </div>
         </div>
      </div>

      {/* Actions Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
         {isStarted ? (
            <button
               onClick={onJoin}
               className="flex-1 bg-red-600 hover:bg-red-700 text-white h-10 rounded-xl font-bold text-sm shadow-md shadow-red-500/20 transition-all flex items-center justify-center gap-2"
            >
               <PlayCircle className="w-4 h-4" />
               Qoşul
            </button>
         ) : isCompleted ? (
            <a
               href="https://t.me/avtoimtahan"
               target="_blank"
               rel="noopener noreferrer"
               className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2"
            >
               <span>Təkrar izlə</span>
               <Send className="w-3.5 h-3.5" />
            </a>
         ) : (
            <div className="flex-1 bg-gray-50 text-gray-400 h-10 rounded-xl font-bold text-sm border border-gray-100 flex items-center justify-center gap-2 cursor-not-allowed">
               <Lock className="w-3.5 h-3.5" />
               Gözlənilir
            </div>
         )}

         <button
            onClick={onViewDetails}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-all"
         >
            <Info className="w-5 h-5" />
         </button>
      </div>
    </div>
  )
}
