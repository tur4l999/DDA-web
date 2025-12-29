import { X, RotateCcw } from 'lucide-react'

const weekdays = [
  { value: 1, label: 'Bazar ertəsi' },
  { value: 2, label: 'Çərşənbə axşamı' },
  { value: 3, label: 'Çərşənbə' },
  { value: 4, label: 'Cümə axşamı' },
  { value: 5, label: 'Cümə' }
]

const statuses = [
  { value: 'waiting', label: 'Gözləyir' },
  { value: 'started', label: 'Başladı' },
  { value: 'completed', label: 'Tamamlandı' },
  { value: 'cancelled', label: 'Ləğv edildi' }
]

const languages = [
  { value: 'az', label: 'Azərbaycan' },
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' }
]

export default function FilterDrawer({ isOpen, onClose, filters, onFilterChange }) {
  if (!isOpen) return null

  const handleReset = () => {
    onFilterChange({
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
  }

  const toggleWeekday = (value) => {
    const newWeekdays = filters.weekdays.includes(value)
      ? filters.weekdays.filter(d => d !== value)
      : [...filters.weekdays, value]
    onFilterChange({ ...filters, weekdays: newWeekdays })
  }

  const toggleStatus = (value) => {
    const newStatuses = filters.statuses.includes(value)
      ? filters.statuses.filter(s => s !== value)
      : [...filters.statuses, value]
    onFilterChange({ ...filters, statuses: newStatuses })
  }

  const toggleLanguage = (value) => {
    const newLanguages = filters.languages.includes(value)
      ? filters.languages.filter(l => l !== value)
      : [...filters.languages, value]
    onFilterChange({ ...filters, languages: newLanguages })
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-soft-xl z-50 flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">Filtrlər</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="btn-ghost text-sm text-slate-500"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sıfırla</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">Tarix aralığı</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => onFilterChange({
                  ...filters,
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })}
                className="input py-2 text-sm"
              />
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => onFilterChange({
                  ...filters,
                  dateRange: { ...filters.dateRange, end: e.target.value }
                })}
                className="input py-2 text-sm"
              />
            </div>
          </div>

          {/* Weekdays */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">Həftənin günləri</label>
            <div className="flex flex-wrap gap-2">
              {weekdays.map(day => (
                <button
                  key={day.value}
                  onClick={() => toggleWeekday(day.value)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    filters.weekdays.includes(day.value)
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">Status</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map(status => (
                <button
                  key={status.value}
                  onClick={() => toggleStatus(status.value)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    filters.statuses.includes(status.value)
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">Dil</label>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button
                  key={lang.value}
                  onClick={() => toggleLanguage(lang.value)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    filters.languages.includes(lang.value)
                      ? 'bg-primary-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyJoinable}
                onChange={(e) => onFilterChange({ ...filters, onlyJoinable: e.target.checked })}
                className="w-5 h-5 rounded-lg border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-slate-700">Yalnız qoşula bilən</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.onlyWithReplay}
                onChange={(e) => onFilterChange({ ...filters, onlyWithReplay: e.target.checked })}
                className="w-5 h-5 rounded-lg border-slate-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-slate-700">Yalnız təkrar video olanlar</span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full btn-primary py-3"
          >
            Tətbiq et
          </button>
        </div>
      </div>
    </>
  )
}
