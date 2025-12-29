import { Search, Plus, Minus, Check, Circle } from 'lucide-react'
import { useState } from 'react'

export default function TopicSidebar({ isOpen, onClose, currentTopic, topics, onTopicSelect, isCollapsed }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('all')
  const [expandedTopics, setExpandedTopics] = useState([])

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    if (filter === 'completed') return matchesSearch && topic.completed
    if (filter === 'incomplete') return matchesSearch && !topic.completed
    return matchesSearch
  })

  const getTopicStatus = (topic) => {
    if (topic.completed) return <Check className="w-4 h-4 text-accent-600" />
    return <Circle className="w-4 h-4 text-slate-300" />
  }

  const toggleExpand = (topicId) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/60 transform transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'lg:hidden' : ''}`}>
        <div className="h-full flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Mövzunu axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 py-2.5 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 mt-3">
              {['all', 'completed', 'incomplete'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                    filter === f
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f === 'all' && 'Hamısı'}
                  {f === 'completed' && 'Tamamlanan'}
                  {f === 'incomplete' && 'Tamamlanmayan'}
                </button>
              ))}
            </div>
          </div>

          {/* Topics list */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredTopics.map((topic) => {
              const hasSubTopics = topic.subTopics && topic.subTopics.length > 0
              const isExpanded = expandedTopics.includes(topic.id)

              return (
                <div key={topic.id}>
                  <div className="flex items-start">
                    {/* Expand/Collapse button */}
                    {hasSubTopics && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(topic.id)
                        }}
                        className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0 ml-2 mt-2"
                        title={isExpanded ? 'Bağla' : 'Aç'}
                      >
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5" strokeWidth={2} />
                        ) : (
                          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                        )}
                      </button>
                    )}

                    {/* Main topic button */}
                    <button
                      onClick={() => {
                        onTopicSelect(topic)
                        if (window.innerWidth < 1024) onClose()
                      }}
                      className={`flex-1 flex items-start gap-3 pr-4 py-3 text-left transition-all duration-200 relative ${
                        !hasSubTopics ? 'pl-4' : 'pl-1'
                      } ${
                        currentTopic?.id === topic.id
                          ? 'bg-primary-50'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Active indicator */}
                      {currentTopic?.id === topic.id && (
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-500 rounded-l-full" />
                      )}
                      
                      <div className="mt-0.5">
                        {getTopicStatus(topic)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium leading-relaxed ${
                          currentTopic?.id === topic.id ? 'text-primary-700' : 'text-slate-800'
                        }`}>
                          {topic.code}. {topic.title}
                        </p>
                        {topic.progress > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                              <span>{topic.progress}%</span>
                            </div>
                            <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                                style={{ width: `${topic.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Sub-topics */}
                  {hasSubTopics && isExpanded && (
                    <div className="bg-slate-50/50">
                      {topic.subTopics.map((subTopic) => (
                        <button
                          key={subTopic.id}
                          onClick={() => {
                            onTopicSelect({ ...topic, ...subTopic, parentCode: topic.code, parentTitle: topic.title })
                            if (window.innerWidth < 1024) onClose()
                          }}
                          className={`w-full flex items-start gap-2 pl-12 pr-4 py-2.5 text-left transition-all duration-200 relative ${
                            currentTopic?.id === subTopic.id
                              ? 'bg-primary-50'
                              : 'hover:bg-slate-100/80'
                          }`}
                        >
                          {currentTopic?.id === subTopic.id && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-l-full" />
                          )}
                          
                          <div className="mt-0.5">
                            {getTopicStatus(subTopic)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium leading-relaxed ${
                              currentTopic?.id === subTopic.id ? 'text-primary-700' : 'text-slate-700'
                            }`}>
                              {subTopic.code}. {subTopic.title}
                            </p>
                            {subTopic.progress > 0 && subTopic.progress < 100 && (
                              <div className="mt-1.5">
                                <div className="h-0.5 bg-slate-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary-500 rounded-full transition-all"
                                    style={{ width: `${subTopic.progress}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
