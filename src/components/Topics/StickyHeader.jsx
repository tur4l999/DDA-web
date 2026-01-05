import { useState, useRef, useEffect } from 'react'
import { Menu, ChevronDown, Search, Check } from 'lucide-react'

export default function StickyHeader({ topic, topics = [], onTopicSelect, onMenuToggle }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  // Filter topics based on search
  const filteredTopics = topics.filter(t =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleTopicClick = (selectedTopic) => {
    onTopicSelect?.(selectedTopic)
    setIsDropdownOpen(false)
    setSearchQuery('')
  }

  return (
    <div className="border-b border-gray-100/50">
      <div className="px-4 lg:px-6 pt-3 pb-1">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Topic title - Dropdown Trigger */}
          <div className="relative flex-1" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 group hover:bg-gray-50 -ml-2 px-2 py-1 rounded-lg transition-colors text-left"
            >
              <h1 className="text-base lg:text-lg font-bold text-gray-900 tracking-tight line-clamp-1">
                <span className="text-primary-600 mr-2">{topic.code}</span>
                {topic.title}
              </h1>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-full max-w-md bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                {/* Search */}
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Mövzu axtar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-400"
                    autoFocus
                  />
                </div>

                {/* Topics List */}
                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                  {filteredTopics.length > 0 ? (
                    filteredTopics.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleTopicClick(t)}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                          topic.id === t.id ? 'bg-primary-50 text-primary-900' : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                         <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                           topic.id === t.id ? 'bg-white text-primary-600 shadow-sm' : 'bg-gray-100 text-gray-500'
                         }`}>
                           {t.code}
                         </div>
                         <span className="flex-1 text-sm font-medium line-clamp-2">{t.title}</span>
                         {topic.id === t.id && <Check className="w-4 h-4 text-primary-600" />}
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      Mövzu tapılmadı
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
