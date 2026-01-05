import { Calendar, Clock, User, Globe, Bookmark, Info, Send, PlayCircle } from 'lucide-react'

export default function LessonCard({ lesson, onJoin, onViewDetails }) {

  const formatTime = (date) => {
    const d = new Date(date)
    return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  const isStarted = lesson.status === 'started'
  const isCompleted = lesson.status === 'completed'
  const isWaiting = lesson.status === 'waiting'

  return (
    <div className="group relative bg-white rounded-[2rem] p-6 md:p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 border border-gray-100 hover:border-gray-200">

      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        
        {/* Time Column */}
        <div className="flex md:flex-col items-center md:items-start gap-3 min-w-[100px]">
           <span className="text-3xl font-black text-gray-900 tracking-tight">{formatTime(lesson.date)}</span>
           <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 uppercase tracking-wider
             ${isStarted ? 'bg-red-50 text-red-600 border-red-100' : ''}
             ${isCompleted ? 'bg-gray-100 text-gray-500 border-gray-200' : ''}
             ${isWaiting ? 'bg-blue-50 text-blue-600 border-blue-100' : ''}
           `}>
              {isStarted && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
              {isStarted ? 'Canlı' : isCompleted ? 'Bitdi' : 'Gözlənilir'}
           </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 space-y-3">
           <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                {lesson.title}
              </h3>
              <p className="text-gray-500 font-medium">{lesson.subject}</p>
           </div>

           <div className="flex items-center gap-4 text-sm font-semibold text-gray-500">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                 <User className="w-4 h-4" />
                 <span>{lesson.instructor}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                 <Clock className="w-4 h-4" />
                 <span>{lesson.duration} dəq</span>
              </div>
           </div>
        </div>

        {/* Action Column */}
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
           {isStarted ? (
              <button
                onClick={onJoin}
                className="flex-1 md:flex-none h-14 px-8 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                 <PlayCircle className="w-5 h-5" />
                 <span>Qoşul</span>
              </button>
           ) : isCompleted ? (
              <a
                href="https://t.me/avtoimtahan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none h-14 px-6 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
              >
                 <Send className="w-5 h-5" />
                 <span>Telegram</span>
              </a>
           ) : (
              <div className="flex-1 md:flex-none h-14 px-6 bg-gray-50 text-gray-400 rounded-2xl font-bold flex items-center justify-center gap-2 cursor-not-allowed">
                 <Clock className="w-5 h-5" />
                 <span>Tezliklə</span>
              </div>
           )}

           <button
             onClick={onViewDetails}
             className="h-14 w-14 flex items-center justify-center rounded-2xl border-2 border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-300 transition-all"
           >
             <Info className="w-6 h-6" />
           </button>
        </div>

      </div>
    </div>
  )
}
