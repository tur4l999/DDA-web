import { useState, useMemo } from 'react'
import { Search, Filter, ArrowLeft, SlidersHorizontal, Calendar as CalendarIcon } from 'lucide-react'
import FilterDrawer from './FilterDrawer'
import LessonCard from './LessonCard'
import LessonDetailsModal from './LessonDetailsModal'
import VideoPlayerModal from './VideoPlayerModal'
import Toast from './Toast'
import SimpleCalendar from './SimpleCalendar'

export default function OnlineClasses({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [bookmarkedLessons, setBookmarkedLessons] = useState([])
  const [toast, setToast] = useState(null)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    weekdays: [],
    timeRange: { start: '', end: '' },
    statuses: [],
    subjects: [],
    languages: [],
    instructor: '',
    onlyJoinable: false,
    onlyBookmarked: false
  })

  // Generate 1 year of lessons
  const [lessons] = useState(() => {
    const classesData = []
    const startDate = new Date(2025, 0, 1)
    const subjects = ['Yol nişanları', 'Trafik işarələri', 'Sürücülük texnikası', 'Təhlükəsizlik', 'Qanun maddələri', 'Praktik məsləhətlər', 'Sual-Cavab']
    const instructors = ['Ə.Talibov', 'R.Əliyev', 'V.Hüseynov', 'N.Quliyev', 'M.İsmayılov', 'G.Məmmədov', 'A.Həsənov', 'B.Zeynalova']
    const languages = ['az', 'ru', 'en']
    
    for (let day = 0; day < 365; day++) {
      const currentDate = new Date(startDate)
      currentDate.setDate(currentDate.getDate() + day)
      
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        const lessonsPerDay = Math.floor(Math.random() * 2) + 2
        
        for (let i = 0; i < lessonsPerDay; i++) {
          const hour = 9 + (i * 4) + Math.floor(Math.random() * 2)
          const lessonDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hour, 0)
          
          const now = new Date()
          let status = 'waiting'
          
          if (lessonDate < now) {
            status = 'completed'
          } else if (Math.abs(lessonDate - now) < 2 * 60 * 60 * 1000) {
            status = 'started'
          }
          
          // 5% cancelled
          if (Math.random() < 0.05) {
            status = 'cancelled'
          }
          
          const subject = subjects[classesData.length % subjects.length]
          const code = String(Math.floor(Math.random() * 10000)).padStart(4, '0')

          classesData.push({
            id: classesData.length + 1,
            code: '#' + code,
            title: subject,
            instructor: instructors[classesData.length % instructors.length],
            date: lessonDate,
            duration: 45 + Math.floor(Math.random() * 4) * 15,
            status: status,
            subject: subject,
            language: languages[classesData.length % languages.length],
            description: `${subject} mövzusu üzrə ətraflı dərs. Nəzəri və praktiki məlumatlar.`,
            bookmarked: Math.random() > 0.9,
            cancelReason: status === 'cancelled' ? 'Texniki səbəblər üzündən ləğv edildi' : null
          })
        }
      }
    }
    
    return classesData.sort((a, b) => a.date - b.date) // Sort by date ascending for timeline
  })

  // Filtering logic
  const filteredLessons = useMemo(() => {
    let result = lessons

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(l => 
        l.title.toLowerCase().includes(query) ||
        l.subject.toLowerCase().includes(query) ||
        l.instructor.toLowerCase().includes(query)
      )
    }

    // Advanced filters
    const now = new Date()
    if (filters.dateRange.start) {
      const startDate = new Date(filters.dateRange.start)
      startDate.setHours(0, 0, 0, 0)
      result = result.filter(l => l.date >= startDate)
    }
    if (filters.dateRange.end) {
      const endDate = new Date(filters.dateRange.end)
      endDate.setHours(23, 59, 59, 999)
      result = result.filter(l => l.date <= endDate)
    }
    if (filters.subjects.length > 0) {
      result = result.filter(l => filters.subjects.includes(l.subject))
    }
    if (filters.languages.length > 0) {
      result = result.filter(l => filters.languages.includes(l.language))
    }
    if (filters.instructor) {
      result = result.filter(l => l.instructor === filters.instructor)
    }
    if (filters.onlyBookmarked) {
      result = result.filter(l => l.bookmarked)
    }

    return result
  }, [lessons, searchQuery, filters, bookmarkedLessons])

  // Group lessons by date
  const groupedLessons = useMemo(() => {
    const groups = {}
    filteredLessons.forEach(lesson => {
      const dateKey = lesson.date.toISOString().split('T')[0]
      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: lesson.date,
          lessons: []
        }
      }
      groups[dateKey].lessons.push(lesson)
    })

    // Sort groups by date
    return Object.values(groups).sort((a, b) => a.date - b.date)
  }, [filteredLessons])

  const handleJoin = (lesson) => {
    alert(`Dərsə qoşulunur: ${lesson.title}`)
  }

  const handleViewDetails = (lesson) => {
    setSelectedLesson(lesson)
    setIsDetailsOpen(true)
  }

  const handleWatchReplay = (lesson) => {
    // This is only for legacy/debug, as button is disabled now
    setSelectedLesson(lesson)
    setIsVideoOpen(true)
  }

  const handleToggleBookmark = (lessonId, bookmarked) => {
    const lesson = lessons.find(l => l.id === lessonId)
    if (!lesson) return

    setBookmarkedLessons(prev => {
      const isBookmarked = prev.some(l => l.id === lessonId)
      if (isBookmarked) {
        setToast('Saxlanılanlardan silindi')
        return prev.filter(l => l.id !== lessonId)
      } else {
        setToast('Saxlanılanlara əlavə edildi')
        return [lesson, ...prev]
      }
    })
  }

  const formatDateHeader = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('az-AZ', options)
  }

  const formatDateButton = (dateStr) => {
      if(!dateStr) return 'Tarix seç'
      const date = new Date(dateStr)
      return date.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="flex-1 h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 z-30 sticky top-0 shadow-sm">
        <div className="w-full px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-900">Onlayn Dərslər</h1>
                <p className="text-sm text-gray-600 font-semibold">{filteredLessons.length} dərs tapıldı</p>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3 flex-wrap sm:flex-nowrap items-center">
             {/* Custom Date Picker */}
             <div className="relative">
              <button
                 onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                 className={`h-12 px-4 border-2 rounded-xl focus:outline-none font-semibold flex items-center gap-2 transition-all min-w-[180px]
                   ${isCalendarOpen || filters.dateRange.start ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-white'}
                 `}
              >
                  <CalendarIcon className="w-5 h-5" />
                  <span>{formatDateButton(filters.dateRange.start)}</span>
              </button>

              {isCalendarOpen && (
                  <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsCalendarOpen(false)}></div>
                      <div className="absolute top-14 left-0 z-50">
                          <SimpleCalendar
                              selectedDate={filters.dateRange.start}
                              onChange={(date) => {
                                  if (date) {
                                      setFilters(prev => ({ ...prev, dateRange: { start: date, end: date } }))
                                  } else {
                                      setFilters(prev => ({ ...prev, dateRange: { start: '', end: '' } }))
                                  }
                              }}
                              onClose={() => setIsCalendarOpen(false)}
                          />
                      </div>
                  </>
              )}
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Mövzu, müəllim axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-semibold bg-gray-50 hover:bg-white transition-colors"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(true)}
              className="h-12 px-6 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-bold rounded-xl transition-all flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filtrlər</span>
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-y-auto w-full">
        <div className="w-full px-4 lg:px-8 py-8">
            {groupedLessons.length > 0 ? (
              <div className="space-y-8">
                {groupedLessons.map((group) => (
                    <div key={group.date.toISOString()} className="relative pl-6 border-l-4 border-gray-100/50">
                        {/* Day Header */}
                        <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm py-4 z-10 mb-4 border-b border-gray-200/50 -ml-6 pl-6">
                            <h2 className="text-2xl font-black text-gray-800 capitalize flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-primary-500 ring-4 ring-primary-100"></div>
                                {formatDateHeader(group.date)}
                            </h2>
                        </div>

                        {/* 2-Column Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-gray-100/50 to-transparent p-4 rounded-3xl -ml-2">
                            {group.lessons.map(lesson => (
                                <LessonCard
                                    key={lesson.id}
                                    lesson={lesson}
                                    onJoin={handleJoin}
                                    onViewDetails={handleViewDetails}
                                    onToggleBookmark={handleToggleBookmark}
                                />
                            ))}
                        </div>
                    </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="text-6xl mb-4">📅</div>
                <p className="text-xl font-bold text-gray-900 mb-2">Bu tarixlərdə dərs yoxdur</p>
                <p className="text-gray-500 font-medium">Başqa tarix seçin və ya filtrləri təmizləyin</p>
                <button
                    onClick={() => {
                        setSearchQuery('')
                        setFilters({
                            dateRange: { start: '', end: '' },
                            weekdays: [],
                            timeRange: { start: '', end: '' },
                            statuses: [],
                            subjects: [],
                            languages: [],
                            instructor: '',
                            onlyJoinable: false,
                            onlyBookmarked: false
                        })
                    }}
                    className="mt-6 px-6 py-2 bg-primary-50 text-primary-700 font-bold rounded-xl hover:bg-primary-100 transition-colors"
                >
                    Filtrləri təmizlə
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Modals */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />

      <LessonDetailsModal
        lesson={selectedLesson}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onJoin={handleJoin}
        onWatchReplay={handleWatchReplay}
      />

      <VideoPlayerModal
        lesson={selectedLesson}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />

      {/* Toast Notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
