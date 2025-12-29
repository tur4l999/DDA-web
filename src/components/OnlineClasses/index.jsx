import { useState, useMemo } from 'react'
import { Search, Filter, List, Calendar as CalendarIcon, ArrowLeft, SlidersHorizontal, Bookmark } from 'lucide-react'
import FilterDrawer from './FilterDrawer'
import LessonCard from './LessonCard'
import LessonDetailsModal from './LessonDetailsModal'
import VideoPlayerModal from './VideoPlayerModal'
import CalendarView from './CalendarView'
import RightPanel from './RightPanel'
import MobileRightPanel from './MobileRightPanel'
import Toast from './Toast'

export default function OnlineClasses({ onBack }) {
  const [view, setView] = useState('list') // 'list' or 'calendar'
  const [searchQuery, setSearchQuery] = useState('')
  const [quickFilter, setQuickFilter] = useState('all')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [bookmarkedLessons, setBookmarkedLessons] = useState([])
  const [rightPanelTab, setRightPanelTab] = useState('bookmarks')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [toast, setToast] = useState(null)
  const itemsPerPage = 9

  // Auto-switch tab based on view mode
  const handleViewChange = (newView) => {
    setView(newView)
    if (newView === 'calendar') {
      setRightPanelTab('selectedDay')
      setSelectedDate(new Date())
    } else {
      setRightPanelTab('bookmarks')
    }
  }

  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    weekdays: [],
    timeRange: { start: '', end: '' },
    statuses: [],
    subjects: [],
    languages: [],
    instructor: '',
    onlyJoinable: false,
    onlyWithReplay: false,
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
          let replayUrl = null
          
          if (lessonDate < now) {
            status = 'completed'
            // 80% completed lessons have replay
            if (Math.random() > 0.2) {
              replayUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            }
          } else if (Math.abs(lessonDate - now) < 2 * 60 * 60 * 1000) {
            status = 'started'
          }
          
          // 5% cancelled
          if (Math.random() < 0.05) {
            status = 'cancelled'
            replayUrl = null
          }
          
          const subject = subjects[classesData.length % subjects.length]
          
          classesData.push({
            id: classesData.length + 1,
            title: subject,
            instructor: instructors[classesData.length % instructors.length],
            date: lessonDate,
            duration: 45 + Math.floor(Math.random() * 4) * 15,
            status: status,
            subject: subject,
            language: languages[classesData.length % languages.length],
            replayUrl: replayUrl,
            description: `${subject} mövzusu üzrə ətraflı dərs. Nəzəri və praktiki məlumatlar.`,
            bookmarked: Math.random() > 0.9,
            cancelReason: status === 'cancelled' ? 'Texniki səbəblər üzündən ləğv edildi' : null
          })
        }
      }
    }
    
    return classesData.sort((a, b) => b.date - a.date)
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

    // Quick filters
    const now = new Date()
    if (quickFilter === 'week') {
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      result = result.filter(l => l.date >= now && l.date <= weekFromNow)
    } else if (quickFilter === 'month') {
      const monthFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
      result = result.filter(l => l.date >= now && l.date <= monthFromNow)
    } else if (quickFilter === 'next7') {
      const next7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      result = result.filter(l => l.date >= now && l.date <= next7Days)
    } else if (quickFilter === 'waiting') {
      result = result.filter(l => l.status === 'waiting')
    } else if (quickFilter === 'started') {
      result = result.filter(l => l.status === 'started')
    } else if (quickFilter === 'completed') {
      result = result.filter(l => l.status === 'completed')
    } else if (quickFilter === 'replay') {
      result = result.filter(l => l.status === 'completed' && l.replayUrl)
    } else if (quickFilter === 'bookmarked') {
      result = result.filter(l => bookmarkedLessons.some(b => b.id === l.id))
    }

    // Advanced filters
    if (filters.dateRange.start) {
      result = result.filter(l => l.date >= new Date(filters.dateRange.start))
    }
    if (filters.dateRange.end) {
      result = result.filter(l => l.date <= new Date(filters.dateRange.end))
    }
    if (filters.weekdays.length > 0) {
      result = result.filter(l => filters.weekdays.includes(l.date.getDay()))
    }
    if (filters.statuses.length > 0) {
      result = result.filter(l => filters.statuses.includes(l.status))
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
    if (filters.onlyJoinable) {
      result = result.filter(l => l.status === 'started' || (l.status === 'waiting' && Math.abs(l.date - now) < 10 * 60 * 1000))
    }
    if (filters.onlyWithReplay) {
      result = result.filter(l => l.replayUrl)
    }
    if (filters.onlyBookmarked) {
      result = result.filter(l => l.bookmarked)
    }

    return result
  }, [lessons, searchQuery, quickFilter, filters, bookmarkedLessons])

  // Get next upcoming lesson
  const nextLesson = useMemo(() => {
    const now = new Date()
    const upcoming = lessons
      .filter(l => l.date > now && (l.status === 'waiting' || l.status === 'started'))
      .sort((a, b) => a.date - b.date)
    return upcoming[0]
  }, [lessons])

  // Pagination
  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage)
  const paginatedLessons = filteredLessons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleJoin = (lesson) => {
    alert(`Dərsə qoşulunur: ${lesson.title}`)
  }

  const handleViewDetails = (lesson) => {
    setSelectedLesson(lesson)
    setIsDetailsOpen(true)
  }

  const handleWatchReplay = (lesson) => {
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
        setRightPanelTab('bookmarks')
        setToast('Saxlanılanlara əlavə edildi')
        return [lesson, ...prev]
      }
    })
  }

  const handleRemoveBookmark = (lessonId) => {
    setBookmarkedLessons(prev => prev.filter(l => l.id !== lessonId))
  }

  const handleDateSelectFromCalendar = (date) => {
    setSelectedDate(date)
    setRightPanelTab('selectedDay')
  }

  const lessonsForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    return filteredLessons.filter(lesson => {
      const lessonDate = new Date(lesson.date)
      return lessonDate.toDateString() === selectedDate.toDateString()
    })
  }, [selectedDate, filteredLessons])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
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

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => handleViewChange('list')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center space-x-2 ${
                  view === 'list'
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">Siyahı</span>
              </button>
              <button
                onClick={() => handleViewChange('calendar')}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all flex items-center space-x-2 ${
                  view === 'calendar'
                    ? 'bg-white text-primary-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Təqvim</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Mövzu, müəllim və ya açar söz yazın..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-semibold"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 border-2 border-gray-200 text-gray-700 font-bold rounded-xl transition-all flex items-center space-x-2"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filtrlər</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {view === 'calendar' ? (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,480px)] xl:grid-cols-[1fr_minmax(400px,600px)] gap-6">
            {/* Left Column: Calendar */}
            <div className="max-w-full overflow-hidden">
              <CalendarView
                lessons={filteredLessons}
                onSelectLesson={handleViewDetails}
                onDateSelect={handleDateSelectFromCalendar}
              />
            </div>

            {/* Right Panel - Smart Sidebar */}
            <div className="hidden lg:block sticky top-24 h-[calc(100vh-8rem)] max-w-full overflow-hidden">
              <RightPanel
                activeTab={rightPanelTab}
                onTabChange={setRightPanelTab}
                bookmarkedLessons={bookmarkedLessons}
                onRemoveBookmark={handleRemoveBookmark}
                selectedDate={selectedDate}
                lessonsForDate={lessonsForSelectedDate}
                onJoinLesson={handleJoin}
                onViewDetails={handleViewDetails}
              />
            </div>
          </div>
        ) : (
          <div>
            {/* Next Up Card */}
            {nextLesson && (
              <div className="bg-gradient-to-r from-[#007A3A] to-[#005A2A] rounded-2xl p-6 mb-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-green-100 font-medium mb-2 text-sm">Növbəti dərs</p>
                <h3 className="text-xl font-bold text-white mb-3">{nextLesson.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-green-50">
                  <span className="font-medium">
                    {(() => {
                      const d = new Date(nextLesson.date)
                      const day = String(d.getDate()).padStart(2, '0')
                      const month = String(d.getMonth() + 1).padStart(2, '0')
                      const year = d.getFullYear()
                      const hours = String(d.getHours()).padStart(2, '0')
                      const minutes = String(d.getMinutes()).padStart(2, '0')
                      return `${day}.${month}.${year} ${hours}:${minutes}`
                    })()}
                  </span>
                  <span>•</span>
                  <span className="font-medium">{nextLesson.instructor}</span>
                  <span>•</span>
                  <span className="font-medium">{nextLesson.duration} dəq</span>
                </div>
              </div>
              <button
                onClick={() => handleJoin(nextLesson)}
                disabled={nextLesson.status !== 'started'}
                className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all ${
                  nextLesson.status === 'started'
                    ? 'bg-white text-[#007A3A] hover:bg-gray-50'
                    : 'bg-white/30 text-white/50 cursor-not-allowed'
                }`}
              >
                {nextLesson.status === 'started' ? 'Dərsə qoşul' : 'Tezliklə'}
              </button>
            </div>
          </div>
            )}

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => { setQuickFilter('all'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  quickFilter === 'all'
                    ? 'bg-[#007A3A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Hamısı
              </button>
              <button
                onClick={() => { setQuickFilter('week'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  quickFilter === 'week'
                    ? 'bg-[#007A3A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Bu həftə
              </button>
              <button
                onClick={() => { setQuickFilter('started'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  quickFilter === 'started'
                    ? 'bg-[#007A3A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Başladı
              </button>
              <button
                onClick={() => { setQuickFilter('waiting'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  quickFilter === 'waiting'
                    ? 'bg-[#007A3A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Gözləyir
              </button>
              <button
                onClick={() => { setQuickFilter('completed'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  quickFilter === 'completed'
                    ? 'bg-[#007A3A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Tamamlandı
              </button>
              <button
                onClick={() => { setQuickFilter('replay'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  quickFilter === 'replay'
                    ? 'bg-[#007A3A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Təkrar videosu olanlar
              </button>
              <button
                onClick={() => { setQuickFilter('bookmarked'); setCurrentPage(1) }}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  quickFilter === 'bookmarked'
                    ? 'bg-[#007A3A] text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                Saxlanılanlar
              </button>
            </div>

            {/* Content */}
            {paginatedLessons.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                  {paginatedLessons.map(lesson => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      onJoin={handleJoin}
                      onViewDetails={handleViewDetails}
                      onWatchReplay={handleWatchReplay}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        currentPage === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      ← Əvvəlki
                    </button>

                    <div className="flex items-center gap-1">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                              currentPage === pageNum
                                ? 'bg-primary-600 text-white shadow-lg scale-110'
                                : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        currentPage === totalPages
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Sonrakı →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl font-bold text-gray-900 mb-2">Heç bir dərs tapılmadı</p>
                <p className="text-gray-600">Axtarış və ya filtr parametrlərini dəyişdirin</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={(newFilters) => {
          setFilters(newFilters)
          setCurrentPage(1)
        }}
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

      {/* Mobile Right Panel - Only for Calendar View */}
      {view === 'calendar' && (
        <MobileRightPanel
          activeTab={rightPanelTab}
          onTabChange={setRightPanelTab}
          bookmarkedLessons={bookmarkedLessons}
          onRemoveBookmark={handleRemoveBookmark}
          selectedDate={selectedDate}
          lessonsForDate={lessonsForSelectedDate}
          onJoinLesson={handleJoin}
          onViewDetails={handleViewDetails}
        />
      )}

      {/* Toast Notification */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
