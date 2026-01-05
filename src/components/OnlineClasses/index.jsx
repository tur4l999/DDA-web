import { useState, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, Filter, CalendarDays, BookOpen, GraduationCap, X } from 'lucide-react'
import LessonCard from './LessonCard'
import LessonDetailsModal from './LessonDetailsModal'
import TelegramPromo from './TelegramPromo'
import Toast from './Toast'

export default function OnlineClasses({ onBack }) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [toast, setToast] = useState(null)

  // Mock Data Generator
  const [lessons] = useState(() => {
    const classesData = []
    // Start from today to ensure we see relevant data
    const today = new Date()
    const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7) // 1 week back

    const subjects = [
      'Yol Nişanları',
      'Hərəkət Qaydaları',
      'Cərimələr və Qanun',
      'Sürücülük Psixologiyası',
      'Texniki Quruluş',
      'İlk Yardım'
    ]

    const instructors = [
      { id: 't1', name: 'Əli Talibov', avatar: 'AT' },
      { id: 't2', name: 'Rəşad Əliyev', avatar: 'RƏ' },
      { id: 't3', name: 'Vüsal Hüseynov', avatar: 'VH' },
      { id: 't4', name: 'Nurlan Quliyev', avatar: 'NQ' }
    ]

    const languages = ['az', 'ru']

    // Generate for 30 days
    for (let day = 0; day < 30; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + day)

      // Skip Sundays maybe? No, let's keep it busy.

      // Multiple lessons per day (3-6 lessons)
      const lessonsCount = 3 + Math.floor(Math.random() * 4)

      for (let i = 0; i < lessonsCount; i++) {
        // Random time between 09:00 and 20:00
        const hour = 9 + Math.floor(Math.random() * 12)
        const lessonDate = new Date(currentDate)
        lessonDate.setHours(hour, 0, 0, 0)
        
        // Determine status based on real time
        const now = new Date()
        let status = 'waiting'
        if (lessonDate < now) {
          status = 'completed'
        } else if (lessonDate.getTime() - now.getTime() < 60 * 60 * 1000 && lessonDate > now) {
           // Starts within hour or is current (simplified logic)
           status = 'waiting'
        }

        // Simulate a "Live" class if it's within the current hour (rough approx for demo)
        const diffMinutes = (now - lessonDate) / 1000 / 60
        if (diffMinutes >= 0 && diffMinutes <= 60) {
            status = 'started'
        }

        const instructor = instructors[Math.floor(Math.random() * instructors.length)]
        const subject = subjects[Math.floor(Math.random() * subjects.length)]

        classesData.push({
          id: `${day}-${i}`,
          title: `${subject} - Dərs ${Math.floor(Math.random() * 10) + 1}`,
          instructor: instructor.name,
          instructorId: instructor.id,
          date: lessonDate,
          duration: 45 + (Math.random() > 0.5 ? 15 : 0),
          status: status,
          subject: subject,
          language: languages[Math.floor(Math.random() * languages.length)],
          description: `${subject} mövzusu üzrə ətraflı izah. Sual-cavab sessiyası daxildir.`,
          bookmarked: false
        })
      }
    }

    return classesData.sort((a, b) => a.date - b.date)
  })

  // Date Navigation
  const weekDays = useMemo(() => {
    const days = []
    // Center around selected date or just show current week?
    // Let's show a sliding window of 7 days starting from selectedDate - 2 days (to see some past)
    // Or better: Standard calendar strip logic.
    // Let's just show 7 days starting from selectedDate for simplicity in navigation
    const start = new Date(selectedDate)
    // Adjust to start of week? Or just 5 days around?
    // Let's do: 3 days before, 3 days after
    start.setDate(start.getDate() - 3)

    for (let i = 0; i < 7; i++) {
        const d = new Date(start)
        d.setDate(d.getDate() + i)
        days.push(d)
    }
    return days
  }, [selectedDate])

  const handlePrevDay = () => {
    const prev = new Date(selectedDate)
    prev.setDate(prev.getDate() - 1)
    setSelectedDate(prev)
  }

  const handleNextDay = () => {
    const next = new Date(selectedDate)
    next.setDate(next.getDate() + 1)
    setSelectedDate(next)
  }

  // Filtering
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      // Date Match
      const isSameDate = lesson.date.toDateString() === selectedDate.toDateString()
      if (!isSameDate) return false

      // Instructor Match
      if (selectedInstructor !== 'all' && lesson.instructor !== selectedInstructor) return false

      // Subject Match
      if (selectedSubject !== 'all' && lesson.subject !== selectedSubject) return false

      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return (
          lesson.title.toLowerCase().includes(q) ||
          lesson.instructor.toLowerCase().includes(q) ||
          lesson.subject.toLowerCase().includes(q)
        )
      }

      return true
    }).sort((a, b) => a.date - b.date) // Time sort
  }, [lessons, selectedDate, selectedInstructor, selectedSubject, searchQuery])

  const instructors = useMemo(() => [...new Set(lessons.map(l => l.instructor))], [lessons])
  const subjects = useMemo(() => [...new Set(lessons.map(l => l.subject))], [lessons])

  // Handlers
  const handleJoin = (lesson) => {
    if (lesson.status === 'started') {
       window.open('https://t.me/avtoimtahan', '_blank')
    }
  }

  const handleToggleBookmark = (id) => {
    setToast('Dərs yadda saxlanıldı (Demo)')
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50/50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dərs Cədvəli</h1>
                <p className="text-sm text-gray-500 font-medium">Bu günə olan dərsləri izləyin</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-none lg:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Axtarış..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white border-2 focus:border-primary-500 rounded-xl text-sm font-semibold transition-all outline-none"
                />
              </div>

              <select
                value={selectedInstructor}
                onChange={(e) => setSelectedInstructor(e.target.value)}
                className="px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-primary-500 transition-all cursor-pointer"
              >
                <option value="all">Bütün Müəllimlər</option>
                {instructors.map(i => <option key={i} value={i}>{i}</option>)}
              </select>

               <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="hidden sm:block px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-700 outline-none focus:border-primary-500 transition-all cursor-pointer"
              >
                <option value="all">Bütün Fənlər</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Date Strip */}
          <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-2 border border-gray-100">
             <button onClick={handlePrevDay} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all">
               <ChevronLeft className="w-5 h-5 text-gray-600" />
             </button>

             <div className="flex-1 flex justify-center gap-2 overflow-x-auto no-scrollbar px-2">
               {weekDays.map(date => {
                 const isSelected = date.toDateString() === selectedDate.toDateString()
                 const isToday = date.toDateString() === new Date().toDateString()

                 return (
                   <button
                     key={date.toISOString()}
                     onClick={() => setSelectedDate(date)}
                     className={`
                       flex flex-col items-center justify-center min-w-[60px] h-16 rounded-xl transition-all relative overflow-hidden
                       ${isSelected ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30 scale-105' : 'hover:bg-white hover:shadow-sm text-gray-500'}
                       ${isToday && !isSelected ? 'bg-white border-2 border-primary-100 text-primary-600' : ''}
                     `}
                   >
                     <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                        {date.toLocaleDateString('az-AZ', { weekday: 'short' })}
                     </span>
                     <span className={`text-xl font-black ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                       {date.getDate()}
                     </span>
                     {isToday && (
                       <div className={`absolute bottom-1 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-primary-500'}`} />
                     )}
                   </button>
                 )
               })}
             </div>

             <button onClick={handleNextDay} className="p-2 hover:bg-white hover:shadow-md rounded-xl transition-all">
               <ChevronRight className="w-5 h-5 text-gray-600" />
             </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

          {/* Left: Schedule Feed */}
          <div>
             <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-gray-900">
                 {selectedDate.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long' })}
               </h2>
               <span className="px-3 py-1 bg-gray-200 rounded-full text-xs font-bold text-gray-600">
                 {filteredLessons.length} Dərs
               </span>
             </div>

             {filteredLessons.length > 0 ? (
               <div className="space-y-4">
                 {filteredLessons.map((lesson, idx) => (
                   <div key={lesson.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                     <LessonCard
                       lesson={lesson}
                       onJoin={handleJoin}
                       onViewDetails={() => {
                         setSelectedLesson(lesson)
                         setIsDetailsOpen(true)
                       }}
                       onToggleBookmark={handleToggleBookmark}
                     />
                   </div>
                 ))}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                 <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                   <CalendarDays className="w-10 h-10 text-gray-300" />
                 </div>
                 <h3 className="text-lg font-bold text-gray-900">Dərs tapılmadı</h3>
                 <p className="text-gray-500 text-sm max-w-xs text-center mt-2">
                   Bu tarix üçün planlaşdırılmış dərs yoxdur və ya axtarış nəticə vermədi.
                 </p>
                 <button
                   onClick={() => setSelectedDate(new Date())}
                   className="mt-6 px-6 py-2 bg-primary-50 text-primary-600 font-bold rounded-xl text-sm hover:bg-primary-100 transition-colors"
                 >
                   Bu günə qayıt
                 </button>
               </div>
             )}
          </div>

          {/* Right: Sidebar Info */}
          <div className="space-y-6">
            <TelegramPromo />

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900">Müəllimlərimiz</h3>
              </div>
              <div className="space-y-4">
                {['Əli Talibov', 'Rəşad Əliyev', 'Vüsal Hüseynov'].map(name => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                      {name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
              <h3 className="font-bold text-green-800 mb-2">Canlı Dərslər Haqqında</h3>
              <p className="text-xs text-green-700 leading-relaxed">
                Canlı dərslər Zoom üzərindən keçirilir. Dərs başladığı zaman "Canlıya Qoşul" düyməsi aktiv olacaq.
                Qaçırdığınız dərslərin təkrarını Telegram kanalımızdan izləyə bilərsiniz.
              </p>
            </div>
          </div>

        </div>
      </div>

      <LessonDetailsModal
        lesson={selectedLesson}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onJoin={handleJoin}
      />

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
