import { ChevronLeft, ChevronRight, Clock, Video } from 'lucide-react'
import { useState, useMemo } from 'react'

export default function CalendarView({ lessons, onSelectLesson, onDateSelect }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const endDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

  const daysInMonth = useMemo(() => {
    const days = []
    const d = new Date(startDay)
    // Pad start (0 is Sunday, 1 is Monday... we want Monday start)
    // JS getDay(): 0 = Sun, 1 = Mon... 6 = Sat
    // We want Mon = 0, Sun = 6
    let startDayOfWeek = startDay.getDay()
    if (startDayOfWeek === 0) startDayOfWeek = 7

    // Add empty slots for days before the 1st
    for (let i = 1; i < startDayOfWeek; i++) {
      days.push(null)
    }

    // Add actual days
    const tempDate = new Date(startDay)
    while (tempDate <= endDay) {
      days.push(new Date(tempDate))
      tempDate.setDate(tempDate.getDate() + 1)
    }
    return days
  }, [currentDate])

  const getDayLessons = (date) => {
    if (!date) return []
    return lessons.filter(l =>
      l.date.getDate() === date.getDate() &&
      l.date.getMonth() === date.getMonth() &&
      l.date.getFullYear() === date.getFullYear()
    )
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const today = new Date()

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 capitalize">
          {currentDate.toLocaleDateString('az-AZ', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-gray-100">
        {['B.e', 'Ç.a', 'Ç', 'C.a', 'C', 'Ş', 'B'].map(day => (
          <div key={day} className="py-3 text-center text-sm font-semibold text-gray-500 bg-gray-50/50">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 auto-rows-fr flex-1 bg-gray-50/30 overflow-y-auto">
        {daysInMonth.map((date, idx) => {
          if (!date) return <div key={idx} className="bg-gray-50/50 border-b border-r border-gray-100" />

          const dayLessons = getDayLessons(date)
          const isToday = date.getDate() === today.getDate() &&
                         date.getMonth() === today.getMonth() &&
                         date.getFullYear() === today.getFullYear()

          return (
            <div
              key={idx}
              onClick={() => onDateSelect(date)}
              className={`min-h-[100px] border-b border-r border-gray-100 p-2 transition-all relative group ${
                'hover:bg-white cursor-pointer'
              } ${isToday ? 'bg-primary-50/30' : ''}`}
            >
              <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1 ${
                isToday ? 'bg-primary-600 text-white' : 'text-gray-700'
              }`}>
                {date.getDate()}
              </span>

              <div className="space-y-1">
                {dayLessons.slice(0, 3).map(lesson => (
                  <div
                    key={lesson.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectLesson(lesson)
                    }}
                    className={`text-[10px] px-1.5 py-1 rounded-md truncate border cursor-pointer transition-transform hover:scale-105 ${
                      lesson.status === 'started'
                        ? 'bg-green-100 text-green-700 border-green-200 font-bold'
                        : lesson.status === 'waiting'
                        ? 'bg-blue-50 text-blue-700 border-blue-100'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {lesson.status === 'started' && '🔴 '}{lesson.title}
                  </div>
                ))}
                {dayLessons.length > 3 && (
                  <div className="text-[10px] text-gray-400 font-medium pl-1">
                    + {dayLessons.length - 3} daha
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
