import { useState, useMemo } from 'react'
import { ChevronLeft, Calendar, Send, History, X } from 'lucide-react'
import LessonCard from './LessonCard'
import LessonDetailsModal from './LessonDetailsModal'
import Toast from './Toast'

const MONTHS_AZ = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'Iyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr']
const WEEKDAYS_AZ = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə']
const MONTHS_SHORT_AZ = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek']

export default function OnlineClasses({ onBack }) {
  const [activeTab, setActiveTab] = useState('upcoming') // 'upcoming' | 'past'
  const [selectedDateFilter, setSelectedDateFilter] = useState('') // ISO Date string YYYY-MM-DD
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [toast, setToast] = useState(null)

  // Mock Data Generator
  const [lessons] = useState(() => {
    const classesData = []
    const today = new Date()

    // Generate dates: 5 days past to 14 days in future
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 5)

    const subjects = ['Yol Nişanları', 'Hərəkət Qaydaları', 'Cərimələr', 'Psixologiya', 'Texniki Quruluş', 'İlk Yardım']
    const instructors = [
      { name: 'Əli Talibov' },
      { name: 'Rəşad Əliyev' },
      { name: 'Vüsal Hüseynov' }
    ]
    const languages = ['az', 'ru']

    for (let day = 0; day < 20; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + day)
      // Skip some random days
      if (Math.random() > 0.6) continue;

      const lessonsCount = 1 + Math.floor(Math.random() * 4)

      for (let i = 0; i < lessonsCount; i++) {
        const hour = 10 + (i * 3)
        const lessonDate = new Date(currentDate)
        lessonDate.setHours(hour, 0, 0, 0)
        
        const now = new Date()
        let status = 'waiting'
        if (lessonDate < now) status = 'completed'

        // Mock Live
        // const diff = (now - lessonDate) / 1000 / 60
        // if (diff >= 0 && diff <= 60) status = 'started'

        const subject = subjects[Math.floor(Math.random() * subjects.length)]

        classesData.push({
          id: `${day}-${i}`,
          title: subject,
          instructor: instructors[Math.floor(Math.random() * instructors.length)].name,
          date: lessonDate,
          duration: 60,
          status: status,
          language: languages[Math.floor(Math.random() * languages.length)],
          subject: subject,
          description: `${subject} mövzusu üzrə tam izah.`
        })
      }
    }
    return classesData.sort((a, b) => a.date - b.date)
  })

  // Grouping Logic
  const groupedLessons = useMemo(() => {
    // 1. Filter
    const filtered = lessons.filter(l => {
      // Date Filter takes precedence if set
      if (selectedDateFilter) {
        return l.date.toISOString().split('T')[0] === selectedDateFilter
      }

      // Otherwise Tab Logic
      if (activeTab === 'upcoming') {
        return l.status === 'started' || l.status === 'waiting'
      } else {
        return l.status === 'completed'
      }
    })

    // 2. Group by Date Key (YYYY-MM-DD)
    const groups = {}
    filtered.forEach(lesson => {
      const dateKey = lesson.date.toDateString()
      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: lesson.date,
          items: []
        }
      }
      groups[dateKey].items.push(lesson)
    })

    // 3. Convert to array and sort
    return Object.values(groups).sort((a, b) => {
       return activeTab === 'upcoming' && !selectedDateFilter
          ? a.date - b.date
          : b.date - a.date // Descending for Past or Specific Filter usually (but for specific day, order doesn't matter much)
    })
  }, [lessons, activeTab, selectedDateFilter])

  // Helper to format Date Header
  const getHeaderDateString = (date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return 'Bu gün'
    if (date.toDateString() === tomorrow.toDateString()) return 'Sabah'

    const day = date.getDate()
    const month = MONTHS_AZ[date.getMonth()]
    const weekday = WEEKDAYS_AZ[date.getDay()]
    return `${day} ${month}, ${weekday}`
  }

  const getMonthShort = (date) => {
    return MONTHS_SHORT_AZ[date.getMonth()]
  }

  return (
    <div className="flex flex-col h-full bg-gray-50/50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="w-full px-4 md:px-8 py-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">

             {/* Left: Title & Navigation */}
             <div className="flex items-center gap-4">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight hidden md:block">Dərs Cədvəli</h1>

                {/* Mobile Title */}
                <h1 className="text-xl font-bold text-gray-900 md:hidden">Cədvəl</h1>

                {/* Vertical Divider */}
                <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>

                {/* Tabs */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                   <button
                     onClick={() => { setActiveTab('upcoming'); setSelectedDateFilter('') }}
                     className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all ${activeTab === 'upcoming' && !selectedDateFilter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     Qarşıdan gələn
                   </button>
                   <button
                     onClick={() => { setActiveTab('past'); setSelectedDateFilter('') }}
                     className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'past' && !selectedDateFilter ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     <span className="hidden md:inline">Arxiv</span>
                     <span className="md:hidden">Keçmiş</span>
                   </button>
                </div>
             </div>

             {/* Right: Date Filter & Actions */}
             <div className="flex items-center gap-3 w-full xl:w-auto">

                {/* Date Picker Input */}
                <div className="relative flex-1 xl:flex-none">
                   <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <Calendar className="w-4 h-4" />
                   </div>
                   <input
                      type="date"
                      value={selectedDateFilter}
                      onChange={(e) => setSelectedDateFilter(e.target.value)}
                      className="w-full xl:w-48 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
                   />
                   {selectedDateFilter && (
                      <button
                        onClick={() => setSelectedDateFilter('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      >
                         <X className="w-3 h-3 text-gray-600" />
                      </button>
                   )}
                </div>

                <a
                   href="https://t.me/avtoimtahan"
                   target="_blank"
                   className="hidden md:flex ml-auto px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-sm items-center gap-2 transition-colors whitespace-nowrap"
                >
                   <Send className="w-4 h-4" />
                   Telegram
                </a>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content List */}
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4 md:px-8 py-8 space-y-12">

           {/* Mobile Telegram Banner */}
           <div className="md:hidden">
              <a
                 href="https://t.me/avtoimtahan"
                 target="_blank"
                 className="flex items-center justify-between bg-blue-600 text-white p-4 rounded-2xl shadow-lg shadow-blue-600/20"
              >
                 <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                       <Send className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-sm">
                       <p className="font-bold">Telegram Kanalı</p>
                       <p className="text-blue-100 text-xs">Videolar və təkrar dərslər</p>
                    </div>
                 </div>
                 <span className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold">Keçid</span>
              </a>
           </div>

           {groupedLessons.length > 0 ? (
             groupedLessons.map((group, idx) => (
               <div key={idx} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>

                  {/* Date Header */}
                  <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                     <div className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-2xl border border-gray-200 shadow-sm flex-shrink-0">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{getMonthShort(group.date)}</span>
                        <span className="text-2xl font-black text-gray-900 leading-none">{group.date.getDate()}</span>
                     </div>
                     <div>
                        <h3 className="text-2xl font-black text-gray-900 capitalize tracking-tight">
                           {getHeaderDateString(group.date)}
                        </h3>
                        <p className="text-gray-500 font-medium">
                           {group.items.length} dərs
                        </p>
                     </div>
                  </div>

                  {/* Responsive Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {group.items.map(lesson => (
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
               </div>
             ))
           ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                   <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                   {selectedDateFilter
                      ? 'Bu tarixdə dərs yoxdur'
                      : activeTab === 'upcoming' ? 'Dərs tapılmadı' : 'Arxiv boşdur'
                   }
                </h2>
                <p className="text-gray-500 max-w-sm">
                   {selectedDateFilter
                      ? 'Seçdiyiniz tarixdə planlaşdırılmış dərs tapılmadı. Başqa tarix seçin.'
                      : 'Hazırda göstəriləcək məlumat yoxdur.'
                   }
                </p>
                {selectedDateFilter && (
                   <button
                     onClick={() => setSelectedDateFilter('')}
                     className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                   >
                      Bütün tarixləri göstər
                   </button>
                )}
             </div>
           )}

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
