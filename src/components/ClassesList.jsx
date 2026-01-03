import { useState } from 'react'
import { ChevronLeft, ChevronRight, Clock, User } from 'lucide-react'

const classesData = []
const startDate = new Date(2025, 0, 6) // Pazartesi, 6 Ocak 2025
for (let day = 0; day < 365; day++) {
  const currentDate = new Date(startDate)
  currentDate.setDate(currentDate.getDate() + day)

  // Hafta içi gündüz saatları: 09:00 ve 18:00
  if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
    classesData.push({
      id: classesData.length + 1,
      title: `Sürücülük Kursu ${classesData.length + 1}`,
      instructor: ['Ə.Talibov', 'R.Əliyev', 'V.Hüseynov', 'N.Quliyev'][classesData.length % 4],
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0),
      duration: 60,
      status: classesData.length % 5 === 0 ? 'completed' : classesData.length % 3 === 0 ? 'started' : 'waiting',
      subject: ['Yol nişanları', 'Trafik', 'Təhlükəsizlik'][classesData.length % 3]
    })

    classesData.push({
      id: classesData.length + 1,
      title: `Sürücülük Kursu ${classesData.length + 1}`,
      instructor: ['M.İsmayılov', 'G.Məmmədov', 'A.Həsənov', 'B.Zeynalova'][classesData.length % 4],
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 18, 0),
      duration: 60,
      status: classesData.length % 5 === 0 ? 'completed' : classesData.length % 3 === 0 ? 'started' : 'waiting',
      subject: ['Qanun', 'Texnika', 'Sürücülük'][classesData.length % 3]
    })
  }
}

export default function ClassesList() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 6))
  const [selectedSubject, setSelectedSubject] = useState('all')

  const getWeekStart = (date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  const weekStart = getWeekStart(currentDate)
  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart)
    day.setDate(day.getDate() + i)
    weekDays.push(day)
  }

  const filteredClasses = classesData.filter(cls => {
    const clsDate = new Date(cls.date)
    const isInWeek = weekDays.some(day =>
      day.getFullYear() === clsDate.getFullYear() &&
      day.getMonth() === clsDate.getMonth() &&
      day.getDate() === clsDate.getDate()
    )

    if (!isInWeek) return false
    if (selectedSubject === 'all') return true
    return cls.subject === selectedSubject
  })

  const groupedByDay = {}
  filteredClasses.forEach(cls => {
    const dateKey = cls.date.toISOString().split('T')[0]
    if (!groupedByDay[dateKey]) {
      groupedByDay[dateKey] = []
    }
    groupedByDay[dateKey].push(cls)
  })

  const dayNames = ['Bazar', 'Bazar ertəsi', 'Çərşənbə', 'Çərşənbə axşamı', 'Cümə', 'Şənbə', 'Bazar günü']
  const subjects = ['all', 'Yol nişanları', 'Trafik', 'Təhlükəsizlik', 'Qanun', 'Texnika', 'Sürücülük']

  const getStatusColor = (status) => {
    switch(status) {
      case 'started': return { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700' }
      case 'completed': return { bg: 'bg-gray-50', border: 'border-gray-200', badge: 'bg-gray-100 text-gray-700' }
      default: return { bg: 'bg-primary-50', border: 'border-primary-200', badge: 'bg-primary-100 text-primary-700' }
    }
  }

  const getStatusLabel = (status) => {
    const labels = { 'started': 'Başladı', 'completed': 'Tamamlandı', 'waiting': 'Gözləyir' }
    return labels[status] || status
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="border-b border-gray-200 px-6 py-4">
        <h3 className="text-xl font-bold text-gray-900">Dərslər Cədvəli</h3>
        <p className="text-sm text-gray-600">Hər həftə 10 dərs (5 gündə 2 dəfə)</p>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() - 7)
              setCurrentDate(newDate)
            }}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Əvvəlki</span>
          </button>

          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">
              {weekStart.toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })} -
              {weekDays[6].toLocaleDateString('az-AZ', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
            <p className="text-sm text-gray-600">
              {filteredClasses.length} dərs bu həftədə
            </p>
          </div>

          <button
            onClick={() => {
              const newDate = new Date(currentDate)
              newDate.setDate(newDate.getDate() + 7)
              setCurrentDate(newDate)
            }}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium"
          >
            <span>Sonrakı</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {subjects.map(subject => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                selectedSubject === subject
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {subject === 'all' ? 'Hamısı' : subject}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {weekDays.map((day, idx) => {
            const dateKey = day.toISOString().split('T')[0]
            const dayClasses = groupedByDay[dateKey] || []
            const isWeekend = day.getDay() === 0 || day.getDay() === 6

            if (isWeekend) return null

            return (
              <div key={dateKey}>
                <div className="flex items-center space-x-3 mb-3 pb-2 border-b border-gray-200">
                  <div className="bg-primary-100 rounded-lg px-3 py-2">
                    <p className="font-bold text-primary-700">{day.getDate()}</p>
                    <p className="text-xs text-primary-600">{dayNames[day.getDay()]}</p>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{dayClasses.length} dərs</p>
                </div>

                {dayClasses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ml-0 mb-4">
                    {dayClasses.map(cls => {
                      const colors = getStatusColor(cls.status)
                      return (
                        <div
                          key={cls.id}
                          className={`${colors.bg} border ${colors.border} rounded-lg p-4 hover:shadow-md transition-all`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-semibold text-gray-900 text-sm">{cls.title}</p>
                              <p className="text-xs text-gray-600">{cls.subject}</p>
                            </div>
                            <span className={`${colors.badge} px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2`}>
                              {getStatusLabel(cls.status)}
                            </span>
                          </div>

                          <div className="space-y-1 text-xs mb-3">
                            <div className="flex items-center space-x-2 text-gray-700">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{cls.date.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })} ({cls.duration} dəq)</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-700">
                              <User className="w-3.5 h-3.5" />
                              <span>{cls.instructor}</span>
                            </div>
                          </div>

                          {cls.status === 'started' && (
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-3 rounded text-xs transition-colors">
                              Canlı Qoşul
                            </button>
                          )}
                          {cls.status === 'waiting' && (
                            <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-3 rounded text-xs transition-colors">
                              Xatırladat
                            </button>
                          )}
                          {cls.status === 'completed' && (
                            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-3 rounded text-xs transition-colors">
                              Yenidən İzlə
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 ml-0 mb-4 italic">Bu gün dərs yoxdur</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
