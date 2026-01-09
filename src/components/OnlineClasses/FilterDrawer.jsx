import { X, User, Globe, Filter } from 'lucide-react'
import { useState } from 'react'

export default function FilterDrawer({ isOpen, onClose, filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters)

  const instructors = [
    'Ə.Talibov', 'R.Əliyev', 'V.Hüseynov', 'N.Quliyev', 
    'M.İsmayılov', 'G.Məmmədov', 'A.Həsənov', 'B.Zeynalova'
  ]

  const handleApply = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters = {
      dateRange: { start: '', end: '' }, // Preserve structure but empty
      weekdays: [],
      timeRange: { start: '', end: '' },
      statuses: [],
      subjects: [],
      languages: [],
      instructor: '',
      onlyJoinable: false,
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
      <div className="fixed inset-0 bg-black/40 z-50 transition-opacity" onClick={onClose}></div>
      
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto animate-scale-in">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary-600" />
              Filtrlər
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">

            {/* Dil */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-bold text-gray-900 mb-3">
                <Globe className="w-4 h-4 text-primary-600" />
                <span>Dərs dili</span>
              </label>
              <div className="flex gap-3">
                {['az', 'ru', 'en'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => toggleArrayFilter('languages', lang)}
                    className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                      localFilters.languages.includes(lang)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-100 bg-white text-gray-600 hover:border-gray-200'
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
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 font-semibold text-gray-700 bg-gray-50"
              >
                <option value="">Hamısı</option>
                {instructors.map(instructor => (
                  <option key={instructor} value={instructor}>{instructor}</option>
                ))}
              </select>
            </div>

            {/* Yadda saxlanılanlar Toggle */}
            <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-gray-100">
              <span className="font-bold text-gray-900">Yalnız yadda saxlanılanlar</span>
              <input
                type="checkbox"
                checked={localFilters.onlyBookmarked}
                onChange={(e) => setLocalFilters(prev => ({ ...prev, onlyBookmarked: e.target.checked }))}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
            </label>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3.5 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-white hover:border-gray-300 transition-all"
            >
              Sıfırla
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-6 py-3.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-200 transition-all"
            >
              Nəticələri göstər
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
