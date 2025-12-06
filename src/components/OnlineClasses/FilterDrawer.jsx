import { X, Calendar, Clock, User, Globe, Tag, Filter } from 'lucide-react'
import { useState } from 'react'

export default function FilterDrawer({ isOpen, onClose, filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters)

  const subjects = [
    'Yol nişanları', 'Trafik işarələri', 'Sürücülük texnikası', 
    'Təhlükəsizlik', 'Qanun maddələri', 'Praktik məsləhətlər', 'Sual-Cavab'
  ]

  const instructors = [
    'Ə.Talibov', 'R.Əliyev', 'V.Hüseynov', 'N.Quliyev', 
    'M.İsmayılov', 'G.Məmmədov', 'A.Həsənov', 'B.Zeynalova'
  ]

  const weekdays = [
    { id: 1, label: 'Bazar ertəsi' },
    { id: 2, label: 'Çərşənbə axşamı' },
    { id: 3, label: 'Çərşənbə' },
    { id: 4, label: 'Cümə axşamı' },
    { id: 5, label: 'Cümə' }
  ]

  const handleApply = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters = {
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
    }
    setLocalFilters(resetFilters)
  }

  const toggleArrayFilter = (key, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }))
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      
      <div className="fixed right-0 top-0 h-full w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                <Filter className="w-5 h-5 text-primary-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Ətraflı Filtrlər</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Tarix aralığı */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span>Tarix aralığı</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={localFilters.dateRange.start}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
                className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="date"
                value={localFilters.dateRange.end}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
                className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Həftənin günləri */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <Calendar className="w-4 h-4 text-primary-600" />
              <span>Həftənin günləri</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {weekdays.map(day => (
                <button
                  key={day.id}
                  onClick={() => toggleArrayFilter('weekdays', day.id)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    localFilters.weekdays.includes(day.id)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Saat aralığı */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <Clock className="w-4 h-4 text-primary-600" />
              <span>Saat aralığı</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="time"
                value={localFilters.timeRange.start}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  timeRange: { ...prev.timeRange, start: e.target.value }
                }))}
                className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <input
                type="time"
                value={localFilters.timeRange.end}
                onChange={(e) => setLocalFilters(prev => ({
                  ...prev,
                  timeRange: { ...prev.timeRange, end: e.target.value }
                }))}
                className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-bold text-gray-900 mb-3 block">Status</label>
            <div className="flex flex-wrap gap-2">
              {['waiting', 'started', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => toggleArrayFilter('statuses', status)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                    localFilters.statuses.includes(status)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status === 'waiting' && 'Gözləyir'}
                  {status === 'started' && 'Başladı'}
                  {status === 'completed' && 'Tamamlandı'}
                  {status === 'cancelled' && 'Ləğv edildi'}
                </button>
              ))}
            </div>
          </div>

          {/* Mövzular */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <Tag className="w-4 h-4 text-primary-600" />
              <span>Mövzular</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => toggleArrayFilter('subjects', subject)}
                  className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                    localFilters.subjects.includes(subject)
                      ? 'bg-violet-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          {/* Dil */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <Globe className="w-4 h-4 text-primary-600" />
              <span>Dərs dili</span>
            </label>
            <div className="flex gap-2">
              {['az', 'ru', 'en'].map(lang => (
                <button
                  key={lang}
                  onClick={() => toggleArrayFilter('languages', lang)}
                  className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                    localFilters.languages.includes(lang)
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {lang === 'az' && 'AZ'}
                  {lang === 'ru' && 'RU'}
                  {lang === 'en' && 'EN'}
                </button>
              ))}
            </div>
          </div>

          {/* Müəllim */}
          <div>
            <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
              <User className="w-4 h-4 text-primary-600" />
              <span>Müəllim</span>
            </label>
            <select
              value={localFilters.instructor}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, instructor: e.target.value }))}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-semibold"
            >
              <option value="">Hamısı</option>
              {instructors.map(instructor => (
                <option key={instructor} value={instructor}>{instructor}</option>
              ))}
            </select>
          </div>

          {/* Toggle filtrlər */}
          <div className="space-y-3 pt-4 border-t-2 border-gray-200">
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="font-semibold text-gray-900">Yalnız qoşula biləcəyim dərslər</span>
              <input
                type="checkbox"
                checked={localFilters.onlyJoinable}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, onlyJoinable: e.target.checked }))}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="font-semibold text-gray-900">Təkrar videosu olanlar</span>
              <input
                type="checkbox"
                checked={localFilters.onlyWithReplay}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, onlyWithReplay: e.target.checked }))}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <span className="font-semibold text-gray-900">Yadda saxlanılanlar</span>
              <input
                type="checkbox"
                checked={localFilters.onlyBookmarked}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, onlyBookmarked: e.target.checked }))}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t-2 border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Sıfırla
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-bold rounded-xl hover:from-primary-700 hover:to-primary-800 shadow-lg transition-all"
          >
            Tətbiq et
          </button>
        </div>
      </div>
    </>
  )
}
