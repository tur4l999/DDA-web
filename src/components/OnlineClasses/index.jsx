import { useState, useMemo } from 'react'
import { ChevronLeft, Calendar, Send, History } from 'lucide-react'
import LessonCard from './LessonCard'
import LessonDetailsModal from './LessonDetailsModal'
import Toast from './Toast'

const MONTHS_AZ = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'Iyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr']
const WEEKDAYS_AZ = ['Bazar', 'Bazar ertəsi', 'Çərşənbə axşamı', 'Çərşənbə', 'Cümə axşamı', 'Cümə', 'Şənbə']
const MONTHS_SHORT_AZ = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyun', 'İyul', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek']

export default function OnlineClasses({ onBack }) {
  const [activeTab, setActiveTab] = useState('upcoming') // 'upcoming' | 'past'
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [toast, setToast] = useState(null)

  // Mock Data Generator
  const [lessons] = useState(() => {
    const classesData = []
    const today = new Date()

    // Generate dates: 2 days ago to 10 days in future
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - 2)

    const subjects = ['Yol Nişanları', 'Hərəkət Qaydaları', 'Cərimələr', 'Psixologiya', 'Texniki Quruluş', 'İlk Yardım']
    const instructors = [
      { name: 'Əli Talibov' },
      { name: 'Rəşad Əliyev' },
      { name: 'Vüsal Hüseynov' }
    ]

    for (let day = 0; day < 14; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + day)
      // Randomly skip some days to test grouping
      if (Math.random() > 0.4) continue;

      const lessonsCount = 1 + Math.floor(Math.random() * 3)

      for (let i = 0; i < lessonsCount; i++) {
        const hour = 10 + (i * 3)
        const lessonDate = new Date(currentDate)
        lessonDate.setHours(hour, 0, 0, 0)
        
        const now = new Date()
        let status = 'waiting'
        if (lessonDate < now) status = 'completed'

        // Make one 'live' for demo if close to now (mocking)
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
          subject: subject,
          description: `${subject} mövzusu üzrə tam izah.`
        })
      }
    }
    return classesData.sort((a, b) => a.date - b.date)
  })

  // Grouping Logic
  const groupedLessons = useMemo(() => {
    // 1. Filter based on tab
    const filtered = lessons.filter(l => {
      if (activeTab === 'upcoming') {
        // Include started (live) and waiting
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
       return activeTab === 'upcoming' ? a.date - b.date : b.date - a.date // Ascending for upcoming, Descending for past
    })
  }, [lessons, activeTab])

  // Helper to format Date Header
  const getHeaderDateString = (date) => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) return 'Bu gün'
    if (date.toDateString() === tomorrow.toDateString()) return 'Sabah'

    // Manual Format: "7 Avqust, Cümə"
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
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             {/* Title & Back */}
             <div className="flex items-center gap-3">
                <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dərs Cədvəli</h1>
             </div>

             {/* Tabs & Actions */}
             <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto overflow-x-auto no-scrollbar">
                <div className="flex bg-gray-100 p-1 rounded-xl">
                   <button
                     onClick={() => setActiveTab('upcoming')}
                     className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'upcoming' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     Qarşıdan gələn
                   </button>
                   <button
                     onClick={() => setActiveTab('past')}
                     className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'past' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                   >
                     <History className="w-4 h-4" />
                     <span>Arxiv</span>
                   </button>
                </div>

                <a
                   href="https://t.me/avtoimtahan"
                   target="_blank"
                   className="hidden md:flex ml-auto px-4 py-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-sm items-center gap-2 transition-colors"
                >
                   <Send className="w-4 h-4" />
                   Telegram Kanalı
                </a>
             </div>
          </div>
        </div>
      </div>

      {/* Main Content List */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 space-y-10">

           {/* Telegram Banner (Mobile Only) */}
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
                  <div className="flex items-center gap-4 mb-4">
                     <div className="flex flex-col items-center justify-center w-12 h-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                        <span className="text-[10px] font-bold text-gray-400 uppercase">{getMonthShort(group.date)}</span>
                        <span className="text-xl font-black text-gray-900 leading-none">{group.date.getDate()}</span>
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-gray-900 capitalize">
                           {getHeaderDateString(group.date)}
                        </h3>
                        <p className="text-gray-500 font-medium text-sm">
                           {group.items.length} dərs planlaşdırılıb
                        </p>
                     </div>
                  </div>

                  {/* Lessons Grid/List */}
                  <div className="space-y-4 pl-0 md:pl-16">
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
                   {activeTab === 'upcoming' ? 'Dərs tapılmadı' : 'Arxiv boşdur'}
                </h2>
                <p className="text-gray-500 max-w-sm">
                   {activeTab === 'upcoming'
                      ? 'Hazırda planlaşdırılmış yeni dərs yoxdur. Zəhmət olmasa daha sonra yoxlayın.'
                      : 'Keçmiş dərslərin siyahısı burada görünəcək.'}
                </p>
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
