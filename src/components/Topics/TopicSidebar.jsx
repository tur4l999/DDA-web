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
    if (topic.completed) return <Check className="w-4 h-4 text-primary-600" strokeWidth={2.5} />
    return <Circle className="w-4 h-4 text-neutral-300" />
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
      {/* Modern Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-neutral-900/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white shadow-soft-lg lg:shadow-none transform transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isCollapsed ? 'lg:hidden' : ''}`}>
        <div className="h-full flex flex-col">
          {/* Modern Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Mövzunu axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-400/30 focus:border-primary-400 bg-neutral-50 transition-smooth"
              />
            </div>

            {/* Modern Filters */}
            <div className="flex gap-2 mt-3">
              {['all', 'completed', 'incomplete'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-2 text-xs font-medium rounded-xl transition-smooth ${
                    filter === f
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
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
                    {/* Modern Expand/Collapse button for topics with subtopics */}
                    {hasSubTopics && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleExpand(topic.id)
                        }}
                        className="w-7 h-7 flex items-center justify-center text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-smooth flex-shrink-0"
                        title={isExpanded ? 'Bağla' : 'Aç'}
                      >
                        {isExpanded ? (
                          <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        ) : (
                          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                        )}
                      </button>
                    )}

                    {/* Modern Main topic button */}
                    <button
                      onClick={() => {
                        onTopicSelect(topic)
                        if (window.innerWidth < 1024) onClose()
                      }}
                      className={`flex-1 flex items-start gap-3 pr-4 py-3 text-left transition-smooth rounded-r-xl ${
                        !hasSubTopics ? 'pl-4' : 'pl-0'
                      } ${
                        currentTopic?.id === topic.id
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="mt-0.5">
                        {getTopicStatus(topic)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${
                          currentTopic?.id === topic.id ? 'text-primary-700' : 'text-neutral-900'
                        }`}>
                          {topic.code}. {topic.title}
                        </p>
                        {topic.progress > 0 && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                              <span className="font-medium">{topic.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary-500 rounded-full transition-smooth"
                                style={{ width: `${topic.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Modern Sub-topics (collapsible) */}
                  {hasSubTopics && isExpanded && (
                    <div className="bg-neutral-50/50">
                      {topic.subTopics.map((subTopic) => (
                        <button
                          key={subTopic.id}
                          onClick={() => {
                            onTopicSelect({ ...topic, ...subTopic, parentCode: topic.code, parentTitle: topic.title })
                            if (window.innerWidth < 1024) onClose()
                          }}
                          className={`w-full flex items-start gap-2 pl-12 pr-4 py-2.5 text-left transition-smooth rounded-r-xl ${
                            currentTopic?.id === subTopic.id
                              ? 'bg-primary-100 text-primary-700'
                              : 'hover:bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          <div className="mt-0.5">
                            {getTopicStatus(subTopic)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-medium ${
                              currentTopic?.id === subTopic.id ? 'text-primary-700' : 'text-neutral-700'
                            }`}>
                              {subTopic.code}. {subTopic.title}
                            </p>
                            {subTopic.progress > 0 && subTopic.progress < 100 && (
                              <div className="mt-1.5">
                                <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-primary-500 rounded-full transition-smooth"
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
