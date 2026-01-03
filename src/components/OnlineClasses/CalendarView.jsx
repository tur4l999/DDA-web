import { ChevronLeft, ChevronRight, Video } from 'lucide-react'
import { useState } from 'react'

export default function CalendarView({ lessons, onSelectLesson, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)

  const getMonthStart = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  }

  const getMonthEnd = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }

  const getCalendarDays = () => {
    const start = getMonthStart(currentDate)
    const end = getMonthEnd(currentDate)
    const days = []

    // Əvvəlki aydan günlər
    const startDay = start.getDay() || 7 // Bazar günü 7 olaraq
    for (let i = startDay - 1; i > 0; i--) {
      const day = new Date(start)
      day.setDate(day.getDate() - i)
      days.push({ date: day, isCurrentMonth: false })
    }

    // Cari ayın günləri
    for (let i = 1; i <= end.getDate(); i++) {
      const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
      days.push({ date: day, isCurrentMonth: true })
    }

    // Növbəti aydan günlər (7-nin qatı etmək üçün)
    const remainingDays = 7 - (days.length % 7)
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        const day = new Date(end)
        day.setDate(day.getDate() + i)
        days.push({ date: day, isCurrentMonth: false })
      }
    }

    return days
  }

  const getLessonsForDay = (date) => {
    return lessons.filter(lesson => {
      const lessonDate = new Date(lesson.date)
      return lessonDate.toDateString() === date.toDateString()
    })
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const monthName = currentDate.toLocaleString('az-AZ', { month: 'long', year: 'numeric' })
  const weekDays = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B']
  const calendarDays = getCalendarDays()
  const today = new Date().toDateString()

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousMonth}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <div className="text-center">
            <h3 className="text-xl font-black text-white capitalize">{monthName}</h3>
            <button
              onClick={goToToday}
              className="text-sm text-primary-100 hover:text-white font-semibold transition-colors"
            >
              Bu günə qayıt
            </button>
          </div>

          <button
            onClick={goToNextMonth}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 border-b-2 border-gray-200 bg-gray-50">
        {weekDays.map(day => (
          <div key={day} className="py-3 text-center">
            <span className="text-xs font-black text-gray-600">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {calendarDays.map((day, index) => {
          const dayLessons = getLessonsForDay(day.date)
          const isToday = day.date.toDateString() === today
          const hasLessons = dayLessons.length > 0
          const hasReplay = dayLessons.some(l => l.status === 'completed' && l.replayUrl)
          const hasLive = dayLessons.some(l => l.status === 'started')

          const isSelected = selectedDay?.toDateString() === day.date.toDateString()

          return (
            <div
              key={index}
              className={`bg-white min-h-[100px] p-2 transition-all ${
                day.isCurrentMonth ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50 opacity-50'
              } ${isToday ? 'ring-2 ring-primary-500 ring-inset' : ''} ${
                isSelected ? 'bg-primary-50 ring-2 ring-primary-400' : ''
              }`}
              onClick={() => {
                if (day.isCurrentMonth) {
                  setSelectedDay(day.date)
                  onDateSelect?.(day.date)
                }
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-bold ${
                  isToday 
                    ? 'w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-xs'
                    : day.isCurrentMonth 
                      ? 'text-gray-900' 
                      : 'text-gray-400'
                }`}>
                  {day.date.getDate()}
                </span>
                {hasReplay && (
                  <Video className="w-3 h-3 text-primary-600" />
                )}
                {hasLive && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </div>

              {hasLessons && (
                <div className="space-y-1">
                  {dayLessons.slice(0, 2).map((lesson, idx) => (
                    <div
                      key={idx}
                      className={`text-xs p-1.5 rounded-lg font-semibold truncate ${
                        lesson.status === 'started' 
                          ? 'bg-green-100 text-green-800'
                          : lesson.status === 'completed'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-primary-100 text-primary-800'
                      }`}
                    >
                      {lesson.date.getHours()}:{String(lesson.date.getMinutes()).padStart(2, '0')} {lesson.title.substring(0, 10)}
                    </div>
                  ))}
                  {dayLessons.length > 2 && (
                    <div className="text-xs text-gray-500 font-bold text-center">
                      +{dayLessons.length - 2} daha
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="border-t-2 border-gray-200 px-6 py-4 bg-gray-50">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-700 font-semibold">Canlı dərs</span>
          </div>
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4 text-primary-600" />
            <span className="text-gray-700 font-semibold">Təkrar mövcud</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
            <span className="text-gray-700 font-semibold">Bu gün</span>
          </div>
        </div>
      </div>
    </div>
  )
}
