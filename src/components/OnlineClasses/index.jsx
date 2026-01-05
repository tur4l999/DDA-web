import { useState, useMemo } from 'react'
import { ChevronLeft, Calendar, Send, X } from 'lucide-react'
import LessonCard from './LessonCard'
import LessonDetailsModal from './LessonDetailsModal'
import Toast from './Toast'

export default function OnlineClasses({ onBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [showTelegramAlert, setShowTelegramAlert] = useState(true)
  const [toast, setToast] = useState(null)

  // Mock Data Generator
  const [lessons] = useState(() => {
    const classesData = []
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3)

    const subjects = ['Yol Nişanları', 'Hərəkət Qaydaları', 'Cərimələr', 'Psixologiya', 'Texniki Quruluş', 'İlk Yardım']
    const instructors = [
      { name: 'Əli Talibov', avatar: 'AT' },
      { name: 'Rəşad Əliyev', avatar: 'RƏ' },
      { name: 'Vüsal Hüseynov', avatar: 'VH' }
    ]
    const languages = ['az', 'ru']

    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + day)
      const lessonsCount = 2 + Math.floor(Math.random() * 4) // 2-5 lessons

      for (let i = 0; i < lessonsCount; i++) {
        const hour = 10 + (i * 2)
        const lessonDate = new Date(currentDate)
        lessonDate.setHours(hour, 0, 0, 0)
        
        const now = new Date()
        let status = 'waiting'
        if (lessonDate < now) status = 'completed'
        else if (lessonDate.getTime() - now.getTime() < 60 * 60 * 1000) status = 'waiting'

        // Simulating live
        const diff = (now - lessonDate) / 1000 / 60
        if (diff >= 0 && diff <= 60) status = 'started'

        const instructor = instructors[Math.floor(Math.random() * instructors.length)]
        const subject = subjects[Math.floor(Math.random() * subjects.length)]

        classesData.push({
          id: `${day}-${i}`,
          title: `${subject}`,
          instructor: instructor.name,
          date: lessonDate,
          duration: 60,
          status: status,
          subject: subject,
          language: languages[Math.floor(Math.random() * languages.length)],
          description: `${subject} mövzusu üzrə tam izah və sual-cavab sessiyası.`,
          bookmarked: false
        })
      }
    }
    return classesData.sort((a, b) => a.date - b.date)
  })

  // Date Strip Logic
  const weekDates = useMemo(() => {
    const dates = []
    const start = new Date(selectedDate)
    start.setDate(start.getDate() - 3)
    for(let i=0; i<7; i++) {
        const d = new Date(start)
        d.setDate(d.getDate() + i)
        dates.push(d)
    }
    return dates
  }, [selectedDate])

  // Filter
  const filteredLessons = useMemo(() => {
    return lessons.filter(l => {
        if (l.date.toDateString() !== selectedDate.toDateString()) return false
        return true
    })
  }, [lessons, selectedDate])

  return (
    <div className="flex flex-col h-full bg-gray-50/50">

      {/* 1. Header & Navigation Area */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">

        {/* Top Alert (Dismissible) */}
        {showTelegramAlert && (
          <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-center gap-3 text-sm font-medium relative transition-all">
             <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>Videolar və təkrar dərslər Telegram kanalımızda!</span>
                <a href="https://t.me/avtoimtahan" target="_blank" className="underline font-bold hover:text-blue-100">Abunə ol</a>
             </div>
             <button onClick={() => setShowTelegramAlert(false)} className="absolute right-4 p-1 hover:bg-white/10 rounded-full">
                <X className="w-4 h-4" />
             </button>
          </div>
        )}

        <div className="max-w-4xl mx-auto w-full">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-4 py-4">
               <div className="flex items-center gap-3">
                  <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600">
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900">Dərs Cədvəli</h1>
               </div>

               <div className="flex items-center gap-2">
                 <button
                   onClick={() => setSelectedDate(new Date())}
                   className="hidden md:block px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                 >
                   Bu gün
                 </button>
                 <a
                   href="https://t.me/avtoimtahan"
                   target="_blank"
                   className="px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-2"
                 >
                   <Send className="w-4 h-4" />
                   <span className="hidden sm:inline">Telegram</span>
                 </a>
               </div>
            </div>

            {/* Date Scroller (iOS Style) */}
            <div className="flex items-center justify-between px-4 pb-4 overflow-x-auto no-scrollbar gap-2">
               {weekDates.map(date => {
                 const isSelected = date.toDateString() === selectedDate.toDateString()
                 const isToday = date.toDateString() === new Date().toDateString()

                 return (
                   <button
                     key={date.toISOString()}
                     onClick={() => setSelectedDate(date)}
                     className={`
                       flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-xl transition-all relative
                       ${isSelected
                          ? 'bg-gray-900 text-white shadow-lg scale-105 z-10'
                          : 'bg-transparent text-gray-500 hover:bg-gray-100'
                       }
                     `}
                   >
                     {isToday && !isSelected && (
                        <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                     )}
                     <span className="text-[10px] font-bold uppercase tracking-wide opacity-80">
                        {date.toLocaleDateString('az-AZ', { weekday: 'short' })}
                     </span>
                     <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                       {date.getDate()}
                     </span>
                   </button>
                 )
               })}
            </div>
        </div>
      </div>

      {/* 2. Main Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto">
         <div className="max-w-4xl mx-auto w-full px-4 py-8 space-y-6">

            {/* Context Header */}
            <div className="flex items-center justify-between">
               <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  {selectedDate.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long' })}
               </h2>
               {filteredLessons.length > 0 && (
                   <span className="text-sm font-medium text-gray-500 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
                      {filteredLessons.length} dərs
                   </span>
               )}
            </div>

            {/* Lesson List */}
            {filteredLessons.length > 0 ? (
               <div className="relative border-l-2 border-gray-200 ml-3 md:ml-4 space-y-8 pb-10">
                 {filteredLessons.map((lesson, idx) => (
                   <div key={lesson.id} className="relative pl-6 md:pl-8">
                      {/* Timeline Dot */}
                      <div className={`
                         absolute -left-[9px] top-6 w-4 h-4 rounded-full border-4 border-white shadow-sm
                         ${lesson.status === 'started' ? 'bg-red-500 ring-4 ring-red-100' :
                           lesson.status === 'completed' ? 'bg-gray-400' : 'bg-blue-500'}
                      `}></div>

                      <LessonCard
                        lesson={lesson}
                        onJoin={() => {
                            if (lesson.status === 'started') window.open('https://t.me/avtoimtahan', '_blank')
                        }}
                        onViewDetails={() => {
                          setSelectedLesson(lesson)
                          setIsDetailsOpen(true)
                        }}
                      />
                   </div>
                 ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                     <Calendar className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Dərs yoxdur</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">Bu tarix üçün planlaşdırılmış dərs tapılmadı. Başqa günləri yoxlayın.</p>
               </div>
            )}

            {/* Bottom Note */}
            <div className="text-center pt-8 border-t border-gray-100">
               <p className="text-sm text-gray-400">
                  Bütün video dərslər və materiallar <a href="https://t.me/avtoimtahan" target="_blank" className="text-blue-600 hover:underline">Telegram kanalımızda</a> arxivlənir.
               </p>
            </div>

         </div>
      </div>

      <LessonDetailsModal
        lesson={selectedLesson}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
