import { X, Calendar } from 'lucide-react'

export default function FilterDrawer({ isOpen, onClose, filters, onFilterChange }) {
  if (!isOpen) return null

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value]
    onFilterChange({ ...filters, [category]: newValues })
  }

  const subjects = ['Yol nişanları', 'Trafik işarələri', 'Sürücülük texnikası', 'Təhlükəsizlik', 'Qanun maddələri', 'Praktik məsləhətlər', 'Sual-Cavab']
  const instructors = ['Ə.Talibov', 'R.Əliyev', 'V.Hüseynov', 'N.Quliyev', 'M.İsmayılov', 'G.Məmmədov', 'A.Həsənov', 'B.Zeynalova']

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between mb-8 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">Filtrlər</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-8 flex-1">
          {/* Language */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Dil</label>
            <div className="flex gap-3">
              {['az', 'ru', 'en'].map(lang => (
                <button
                  key={lang}
                  onClick={() => handleCheckboxChange('languages', lang)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 capitalize transition-all ${
                    filters.languages.includes(lang)
                      ? 'border-primary-600 text-primary-600 bg-primary-50'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Tarix Aralığı</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    dateRange: { ...filters.dateRange, start: e.target.value }
                  })}
                  className="w-full pl-3 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    dateRange: { ...filters.dateRange, end: e.target.value }
                  })}
                  className="w-full pl-3 pr-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-3">Mövzular</label>
            <div className="space-y-2">
              {subjects.map(subject => (
                <label key={subject} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    filters.subjects.includes(subject) ? 'bg-primary-600 border-primary-600' : 'border-gray-300 bg-white'
                  }`}>
                    {filters.subjects.includes(subject) && <X className="w-3.5 h-3.5 text-white transform rotate-45" style={{ transform: 'none' }}><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></X>}
                    {/* Re-using X icon as checkmark or just using CSS checkmark logic */}
                    {filters.subjects.includes(subject) && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={filters.subjects.includes(subject)}
                    onChange={() => handleCheckboxChange('subjects', subject)}
                  />
                  <span className={`text-sm font-medium ${filters.subjects.includes(subject) ? 'text-gray-900' : 'text-gray-600'}`}>
                    {subject}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Instructor */}
          <div>
             <label className="block text-sm font-bold text-gray-900 mb-3">Müəllim</label>
             <select
               value={filters.instructor}
               onChange={(e) => onFilterChange({ ...filters, instructor: e.target.value })}
               className="w-full p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 font-medium text-sm bg-white"
             >
               <option value="">Bütün müəllimlər</option>
               {instructors.map(inst => (
                 <option key={inst} value={inst}>{inst}</option>
               ))}
             </select>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2">
             <label className="flex items-center justify-between cursor-pointer group">
               <span className="font-medium text-gray-700">Yalnız video təkrarı olanlar</span>
               <div className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${filters.onlyWithReplay ? 'bg-primary-600' : 'bg-gray-200'}`}>
                 <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${filters.onlyWithReplay ? 'translate-x-5' : 'translate-x-0'}`} />
               </div>
               <input
                 type="checkbox"
                 className="hidden"
                 checked={filters.onlyWithReplay}
                 onChange={(e) => onFilterChange({ ...filters, onlyWithReplay: e.target.checked })}
               />
             </label>

             <label className="flex items-center justify-between cursor-pointer group">
               <span className="font-medium text-gray-700">Yalnız saxlanılanlar</span>
               <div className={`w-12 h-7 rounded-full transition-colors flex items-center px-1 ${filters.onlyBookmarked ? 'bg-primary-600' : 'bg-gray-200'}`}>
                 <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${filters.onlyBookmarked ? 'translate-x-5' : 'translate-x-0'}`} />
               </div>
               <input
                 type="checkbox"
                 className="hidden"
                 checked={filters.onlyBookmarked}
                 onChange={(e) => onFilterChange({ ...filters, onlyBookmarked: e.target.checked })}
               />
             </label>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex gap-3 shrink-0">
          <button
            onClick={() => onFilterChange({
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
            })}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Sıfırla
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-bold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
          >
            Nəticələri göstər
          </button>
        </div>
      </div>
    </div>
  )
}
