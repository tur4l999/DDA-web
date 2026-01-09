import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function SimpleCalendar({ selectedDate, onChange, onClose }) {
  const [currentDate, setCurrentDate] = useState(selectedDate ? new Date(selectedDate) : new Date())
  const [view, setView] = useState('days') // days, months, years

  const months = [
    'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun',
    'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'
  ]

  const daysOfWeek = ['B.E', 'Ç.A', 'Ç', 'C.A', 'C', 'Ş', 'B']

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (year, month) => {
    // 0 = Sunday, 1 = Monday... but we want Monday to be 0 for our grid
    let day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    // Adjust for timezone offset to ensure the string value is correct for the input
    // But since we pass Date object or string up, let's pass a string 'YYYY-MM-DD'
    // to match input type='date' behavior, or better yet, the Date object.
    // The parent expects 'YYYY-MM-DD' usually for the filter logic.

    // Creating YYYY-MM-DD string in local time
    const offset = newDate.getTimezoneOffset()
    const localDate = new Date(newDate.getTime() - (offset * 60 * 1000))
    onChange(localDate.toISOString().split('T')[0])
    onClose()
  }

  const renderDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>)
    }

    // Days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = new Date(year, month, day).toDateString()
      const isSelected = selectedDate && new Date(selectedDate).toDateString() === dateString
      const isToday = new Date().toDateString() === dateString

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-10 w-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all
            ${isSelected
              ? 'bg-primary-600 text-white shadow-md scale-110'
              : isToday
                ? 'bg-primary-50 text-primary-600 border border-primary-200'
                : 'text-gray-700 hover:bg-gray-100'
            }
          `}
        >
          {day}
        </button>
      )
    }
    return days
  }

  return (
    <div className="p-4 bg-white rounded-3xl shadow-2xl border border-gray-100 w-[320px] animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          className="text-lg font-black text-gray-900 hover:bg-gray-50 px-3 py-1 rounded-lg transition-colors"
        >
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </button>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-600"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map(day => (
          <div key={day} className="h-10 flex items-center justify-center text-xs font-bold text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {renderDays()}
      </div>

      {/* Clear Button */}
      {selectedDate && (
        <button
            onClick={() => { onChange(''); onClose() }}
            className="w-full mt-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
        >
            Tarixi təmizlə
        </button>
      )}
    </div>
  )
}
