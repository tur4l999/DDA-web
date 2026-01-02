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
    if (topic.completed) return <Check className="w-4 h-4 text-primary-600" />
    return <Circle className="w-4 h-4 text-gray-300" />
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
          className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-100/50 transform transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'lg:hidden' : ''}`}>
        <div className="h-full flex flex-col">
          {/* Search */}
          <div className="p-5 border-b border-gray-100/50">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Mövzunu axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 bg-gray-50/50 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-1 no-scrollbar">
              {['all', 'completed', 'incomplete'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    filter === f
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
            {filteredTopics.map((topic) => {
              const hasSubTopics = topic.subTopics && topic.subTopics.length > 0
              const isExpanded = expandedTopics.includes(topic.id)

              return (
                <div key={topic.id} className="rounded-2xl overflow-hidden">
                  <div className="flex items-start">
                    {/* Expand/Collapse button for topics with subtopics */}
                    {hasSubTopics && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(topic.id)
                        }}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors flex-shrink-0 mt-1.5 ml-1"
                        title={isExpanded ? 'Bağla' : 'Aç'}
                      >
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        ) : (
                          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        )}
                      </button>
                    )}

                    {/* Main topic button */}
                    <button
                      onClick={() => {
                        onTopicSelect(topic)
                        if (window.innerWidth < 1024) onClose()
                      }}
                      className={`flex-1 flex items-start gap-3 p-3.5 text-left transition-all rounded-xl ${
                        !hasSubTopics ? 'pl-3.5' : 'pl-1'
                      } ${
                        currentTopic?.id === topic.id
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {getTopicStatus(topic)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-relaxed font-medium">
                          <span className="font-semibold text-gray-400 opacity-70 mr-1">{topic.code}.</span>
                          {topic.title}
                        </p>
                        {topic.progress > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                              <span className="font-medium">Tərəqqi</span>
                              <span className="font-bold text-gray-700">{topic.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(20,184,166,0.3)]"
                                style={{ width: `${topic.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Sub-topics (collapsible) */}
                  {hasSubTopics && isExpanded && (
                    <div className="ml-5 pl-4 border-l-2 border-gray-100 my-1 space-y-1">
                      {topic.subTopics.map((subTopic) => (
                        <button
                          key={subTopic.id}
                          onClick={() => {
                            onTopicSelect({ ...topic, ...subTopic, parentCode: topic.code, parentTitle: topic.title })
                            if (window.innerWidth < 1024) onClose()
                          }}
                          className={`w-full flex items-start gap-2.5 p-3 text-left transition-colors rounded-xl ${
                            currentTopic?.id === subTopic.id
                              ? 'bg-primary-50 text-primary-700 font-medium'
                              : 'hover:bg-gray-50 text-gray-600'
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {getTopicStatus(subTopic)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs leading-relaxed font-medium">
                              <span className="text-gray-400 mr-1 font-semibold">{subTopic.code}</span>
                              {subTopic.title}
                            </p>
                            {subTopic.progress > 0 && subTopic.progress < 100 && (
                              <div className="mt-2">
                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
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
