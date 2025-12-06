import { Search, ChevronDown, ChevronRight, Check, Circle } from 'lucide-react'
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
    if (topic.completed) return <Check className="w-4 h-4 text-[#007A3A]" />
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
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-all duration-200 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'lg:hidden' : ''}`}>
        <div className="h-full flex flex-col">
          {/* Search */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Mövzunu axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007A3A]/20 focus:border-[#007A3A]"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 mt-3">
              {['all', 'completed', 'incomplete'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    filter === f
                      ? 'bg-[#007A3A] text-white'
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
          <div className="flex-1 overflow-y-auto">
            {filteredTopics.map((topic) => {
              const hasSubTopics = topic.subTopics && topic.subTopics.length > 0
              const isExpanded = expandedTopics.includes(topic.id)

              return (
                <div key={topic.id}>
                  <div className="flex items-start">
                    {/* Expand/Collapse button for topics with subtopics */}
                    {hasSubTopics && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(topic.id)
                        }}
                        className="w-8 h-11 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    )}

                    {/* Main topic button */}
                    <button
                      onClick={() => {
                        onTopicSelect(topic)
                        if (window.innerWidth < 1024) onClose()
                      }}
                      className={`flex-1 flex items-start gap-3 pr-4 py-3 text-left transition-colors border-r-4 ${
                        !hasSubTopics ? 'pl-4' : 'pl-0'
                      } ${
                        currentTopic?.id === topic.id
                          ? 'bg-[#007A3A]/5 border-[#007A3A]'
                          : 'border-transparent hover:bg-gray-50'
                      }`}
                    >
                      <div className="mt-0.5">
                        {getTopicStatus(topic)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          currentTopic?.id === topic.id ? 'text-[#007A3A]' : 'text-gray-900'
                        }`}>
                          {topic.code}. {topic.title}
                        </p>
                        {topic.progress > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                              <span>{topic.progress}%</span>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#007A3A] rounded-full transition-all"
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
                    <div className="bg-gray-50/50 border-r-4 border-transparent">
                      {topic.subTopics.map((subTopic) => (
                        <button
                          key={subTopic.id}
                          onClick={() => {
                            onTopicSelect({ ...topic, ...subTopic, parentCode: topic.code, parentTitle: topic.title })
                            if (window.innerWidth < 1024) onClose()
                          }}
                          className={`w-full flex items-start gap-2 pl-12 pr-4 py-2.5 text-left transition-colors ${
                            currentTopic?.id === subTopic.id
                              ? 'bg-[#007A3A]/10 text-[#007A3A]'
                              : 'hover:bg-gray-100/80 text-gray-700'
                          }`}
                        >
                          <div className="mt-0.5">
                            {getTopicStatus(subTopic)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium ${
                              currentTopic?.id === subTopic.id ? 'text-[#007A3A]' : 'text-gray-700'
                            }`}>
                              {subTopic.code}. {subTopic.title}
                            </p>
                            {subTopic.progress > 0 && subTopic.progress < 100 && (
                              <div className="mt-1.5">
                                <div className="h-0.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-[#007A3A] rounded-full transition-all"
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
