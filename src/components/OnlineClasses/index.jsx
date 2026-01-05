import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, Calendar, User, BookOpen, Send } from 'lucide-react'
import LessonCard from './LessonCard'
import LessonDetailsModal from './LessonDetailsModal'
import Toast from './Toast'

export default function OnlineClasses({ onBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('all')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [toast, setToast] = useState(null)

  // Mock Data Generator (Keep robust data)
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
      const lessonsCount = 3 + Math.floor(Math.random() * 3)

      for (let i = 0; i < lessonsCount; i++) {
        const hour = 10 + (i * 3)
        const lessonDate = new Date(currentDate)
        lessonDate.setHours(hour, 0, 0, 0)
        
        const now = new Date()
        let status = 'waiting'
        if (lessonDate < now) status = 'completed'
        else if (lessonDate.getTime() - now.getTime() < 60 * 60 * 1000) status = 'waiting' // simplified

        // Simulating live
        const diff = (now - lessonDate) / 1000 / 60
        if (diff >= 0 && diff <= 60) status = 'started'

        const instructor = instructors[Math.floor(Math.random() * instructors.length)]
        const subject = subjects[Math.floor(Math.random() * subjects.length)]

        classesData.push({
          id: `${day}-${i}`,
          title: `${subject} - Dərs ${i + 1}`,
          instructor: instructor.name,
          date: lessonDate,
          duration: 60,
          status: status,
          subject: subject,
          language: languages[Math.floor(Math.random() * languages.length)],
          description: `${subject} mövzusu üzrə tam izah.`,
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
    start.setDate(start.getDate() - 2) // Show previous 2 days and next 4
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
        if (selectedInstructor !== 'all' && l.instructor !== selectedInstructor) return false
        if (searchQuery && !l.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
        return true
    })
  }, [lessons, selectedDate, selectedInstructor, searchQuery])

  const instructors = useMemo(() => [...new Set(lessons.map(l => l.instructor))], [lessons])

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Header & Navigation */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
          {/* Title Row */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-900" />
              </button>
              <div>
                 <h1 className="text-3xl font-black text-gray-900 tracking-tight">Cədvəl</h1>
              </div>
            </div>

            {/* Simple Date Toggle (Today) */}
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-full text-sm font-bold transition-colors"
            >
              Bu gün
            </button>
          </div>

          {/* Date Navigation & Filters Row */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">

            {/* Date Strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
               {weekDates.map(date => {
                 const isSelected = date.toDateString() === selectedDate.toDateString()
                 const isToday = date.toDateString() === new Date().toDateString()

                 return (
                   <button
                     key={date.toISOString()}
                     onClick={() => setSelectedDate(date)}
                     className={`
                       flex flex-col items-center justify-center w-14 h-16 rounded-2xl transition-all flex-shrink-0 border-2
                       ${isSelected
                          ? 'bg-gray-900 border-gray-900 text-white shadow-xl scale-110 z-10'
                          : 'bg-white border-transparent text-gray-400 hover:bg-gray-50'
                       }
                       ${isToday && !isSelected ? 'border-gray-200 text-gray-900' : ''}
                     `}
                   >
                     <span className="text-[10px] uppercase font-bold tracking-wider mb-0.5">
                        {date.toLocaleDateString('az-AZ', { weekday: 'short' })}
                     </span>
                     <span className="text-xl font-black">
                       {date.getDate()}
                     </span>
                   </button>
                 )
               })}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
               <div className="relative group">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                 <input
                   type="text"
                   placeholder="Axtar..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="pl-10 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 w-full md:w-48 transition-all"
                 />
               </div>

               <div className="relative">
                 <select
                   value={selectedInstructor}
                   onChange={(e) => setSelectedInstructor(e.target.value)}
                   className="appearance-none pl-4 pr-10 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
                 >
                   <option value="all">Bütün Müəllimlər</option>
                   {instructors.map(i => <option key={i} value={i}>{i}</option>)}
                 </select>
                 <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
               </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-8">

          {/* Telegram Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-blue-900/10 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="max-w-xl">
                   <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-50 mb-4 border border-white/10">
                      <Send className="w-3 h-3" />
                      <span>Rəsmi Kanal</span>
                   </div>
                   <h2 className="text-2xl md:text-3xl font-black mb-3">Dərsləri qaçırmayın!</h2>
                   <p className="text-blue-100 font-medium leading-relaxed">
                      Canlı yayımlar bitdikdən dərhal sonra video izahlar və təkrar dərslər yalnız Telegram kanalımızda paylaşılır.
                   </p>
                </div>
                <a
                   href="https://t.me/avtoimtahan"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="whitespace-nowrap bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg"
                >
                   Kanala Qoşul
                </a>
             </div>

             {/* Decor */}
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
             <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-black/10 rounded-full blur-3xl" />
          </div>

          {/* Schedule List */}
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
               <h3 className="text-xl font-bold text-gray-900">
                 {selectedDate.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', weekday: 'long' })}
               </h3>
               <span className="text-gray-400 font-medium text-sm">{filteredLessons.length} dərs</span>
            </div>

            {filteredLessons.length > 0 ? (
               <div className="space-y-4">
                 {filteredLessons.map((lesson, idx) => (
                   <LessonCard
                     key={lesson.id}
                     lesson={lesson}
                     onJoin={() => {
                        if (lesson.status === 'started') window.open('https://t.me/avtoimtahan', '_blank')
                     }}
                     onViewDetails={() => {
                       setSelectedLesson(lesson)
                       setIsDetailsOpen(true)
                     }}
                   />
                 ))}
               </div>
            ) : (
               <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-300">
                     <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Planlaşdırılmış dərs yoxdur</h3>
                  <p className="text-gray-500">Bu tarix üçün cədvəl boşdur.</p>
               </div>
            )}
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
