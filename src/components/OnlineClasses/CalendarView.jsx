import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const monthNames = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
  'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
]

const dayNames = ['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B']

export default function CalendarView({ lessons, onSelectLesson, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  
  let startDay = firstDayOfMonth.getDay()
  startDay = startDay === 0 ? 6 : startDay - 1

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getLessonsForDay = (day) => {
    const date = new Date(year, month, day)
    return lessons.filter(lesson => {
      const lessonDate = new Date(lesson.date)
      return lessonDate.toDateString() === date.toDateString()
    })
  }

  const today = new Date()
  const isToday = (day) => {
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year
  }

  const handleDayClick = (day) => {
    const date = new Date(year, month, day)
    onDateSelect?.(date)
  }

  const days = []
  for (let i = 0; i < startDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={nextMonth}
            className="w-9 h-9 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Day Names */}
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((day, i) => (
            <div key={i} className="text-center text-xs font-medium text-slate-400 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={index} className="aspect-square" />
            }

            const dayLessons = getLessonsForDay(day)
            const hasLessons = dayLessons.length > 0
            const hasLive = dayLessons.some(l => l.status === 'started')

            return (
              <button
                key={index}
                onClick={() => handleDayClick(day)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
                  isToday(day)
                    ? 'bg-primary-600 text-white'
                    : hasLessons
                      ? 'bg-primary-50 hover:bg-primary-100 text-slate-900'
                      : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className={`text-sm font-medium ${isToday(day) ? 'text-white' : ''}`}>
                  {day}
                </span>
                {hasLessons && (
                  <div className="flex items-center gap-0.5">
                    {hasLive && (
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
                    )}
                    {!hasLive && (
                      <span className={`w-1.5 h-1.5 rounded-full ${isToday(day) ? 'bg-white/60' : 'bg-primary-400'}`} />
                    )}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-primary-400 rounded-full" />
          <span>Dərs var</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
          <span>Canlı</span>
        </div>
      </div>
    </div>
  )
}
