import { useState } from 'react'
import { ArrowLeft, Menu, Search, CheckCircle, Circle, Play, FileText, Video, HelpCircle, AlertTriangle, ChevronRight, Clock, BookOpen } from 'lucide-react'
import { Card, Button, Progress, Badge, Tabs, Input } from '../ui'
import ArticlesContent from './ArticlesContent'
import TextContent from './TextContent'
import ThreeDVideoContent from './ThreeDVideoContent'
import VideoContent from './VideoContent'
import QuestionsContent from './QuestionsContent'
import PenaltiesContent from './PenaltiesContent'
import VideoModal from '../Penalties/VideoModal'
import AskTeacherModal from './AskTeacherModal'
import QuestionThreadModal from './QuestionThreadModal'
import PaywallModal from './PaywallModal'
import Toast from './Toast'

export default function TopicsNew({ onBack }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('materials')
  const [selectedPenalty, setSelectedPenalty] = useState(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isAskTeacherModalOpen, setIsAskTeacherModalOpen] = useState(false)
  const [isQuestionThreadModalOpen, setIsQuestionThreadModalOpen] = useState(false)
  const [isPaywallModalOpen, setIsPaywallModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [questions, setQuestions] = useState([])
  const [toast, setToast] = useState(null)
  const [userPackage, setUserPackage] = useState('basic')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  
  const [currentTopic, setCurrentTopic] = useState({
    id: 1,
    code: 'M1',
    title: 'Ümumi müddəalar',
    category: 'Yol hərəkəti qaydaları',
    completed: false,
    progress: 45,
    duration: '15 dəqiqə',
    itemsTotal: 12,
    itemsCompleted: 5,
  })

  const topics = [
    { id: 1, code: 'M1', title: 'Ümumi müddəalar', completed: false, progress: 45 },
    { 
      id: 2, 
      code: 'M2', 
      title: 'Yol hərəkəti iştirakçılarının vəzifələri', 
      completed: false, 
      progress: 60,
      subTopics: [
        { id: '2.1', code: 'M2.1', title: 'NV-nin idarəetmə hüququ. Sürücülük vəsiqəsi.', completed: true, progress: 100 },
        { id: '2.2', code: 'M2.2', title: 'Yol hərəkəti iştirakçılarının vəzifələri.', completed: false, progress: 40 }
      ]
    },
    { 
      id: 3, 
      code: 'M3', 
      title: 'Yol nişanları', 
      completed: false, 
      progress: 55,
      subTopics: [
        { id: '3.1', code: 'M3.1', title: 'Xəbərdarlıq nişanları', completed: true, progress: 100 },
        { id: '3.2', code: 'M3.2', title: 'Üstünlük nişanları', completed: true, progress: 100 },
        { id: '3.3', code: 'M3.3', title: 'Qadağan nişanları', completed: false, progress: 70 },
      ]
    },
    { id: 4, code: 'M4', title: 'Yolun nişanlanma xətləri', completed: false, progress: 35 },
    { id: 5, code: 'M5', title: 'Nizamlayıcının və svetoforların siqnalları', completed: false, progress: 50 },
  ]

  const filteredTopics = topics.filter(topic => {
    if (filterStatus === 'completed') return topic.completed
    if (filterStatus === 'inProgress') return !topic.completed && topic.progress > 0
    if (filterStatus === 'new') return topic.progress === 0 || !topic.progress
    if (searchQuery) {
      return topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             topic.code.toLowerCase().includes(searchQuery.toLowerCase())
    }
    return true
  })

  const handleVideoClick = (penalty) => {
    setSelectedPenalty(penalty)
    setIsVideoModalOpen(true)
  }

  const handleExamClick = () => {
    alert('İmtahana başlanır...')
  }

  const handleContactTeacher = () => {
    setIsAskTeacherModalOpen(true)
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const tabs = [
    { value: 'materials', label: 'Materiallar', icon: BookOpen },
    { value: 'text', label: 'Mətn', icon: FileText },
    { value: 'video', label: 'Video', icon: Video },
    { value: 'questions', label: 'Suallar', icon: HelpCircle },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'materials':
        return <ArticlesContent />
      case 'text':
        return <TextContent />
      case '3dvideo':
        return <ThreeDVideoContent />
      case 'video':
        return <VideoContent />
      case 'questions':
        return <QuestionsContent />
      case 'penalties':
        return <PenaltiesContent topicRelated={true} onVideoClick={handleVideoClick} />
      default:
        return <ArticlesContent />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar with Topics */}
      <div className={`transition-all duration-200 ${isPanelCollapsed ? 'w-0' : 'w-80'} border-r border-gray-100 bg-white hidden lg:block`}>
        {!isPanelCollapsed && (
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="border-b border-gray-100 p-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Geri</span>
              </button>
              
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Təlim Mövzuları</h2>
              
              {/* Search */}
              <Input
                placeholder="Mövzu axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={Search}
                className="mb-3"
              />
              
              {/* Filter chips */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Hamısı
                </button>
                <button
                  onClick={() => setFilterStatus('inProgress')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    filterStatus === 'inProgress'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Davam edir
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    filterStatus === 'completed'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bitdi
                </button>
              </div>
            </div>

            {/* Topics List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {filteredTopics.map((topic) => (
                <div key={topic.id}>
                  <button
                    onClick={() => setCurrentTopic(topic)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      currentTopic.id === topic.id
                        ? 'bg-primary-50 border border-primary-100'
                        : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {topic.completed ? (
                          <CheckCircle className="w-5 h-5 text-success-500" strokeWidth={2} />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" strokeWidth={2} />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium ${
                            currentTopic.id === topic.id ? 'text-primary-700' : 'text-gray-500'
                          }`}>
                            {topic.code}
                          </span>
                          {topic.completed && (
                            <Badge variant="success" className="text-xs">Bitdi</Badge>
                          )}
                        </div>
                        
                        <h3 className={`text-sm font-medium mb-2 ${
                          currentTopic.id === topic.id ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {topic.title}
                        </h3>
                        
                        {topic.progress > 0 && !topic.completed && (
                          <Progress value={topic.progress} max={100} size="sm" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Subtopics */}
                  {topic.subTopics && currentTopic.id === topic.id && (
                    <div className="ml-8 mt-2 space-y-2">
                      {topic.subTopics.map((sub) => (
                        <button
                          key={sub.id}
                          className="w-full text-left p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-xs"
                        >
                          <div className="flex items-center gap-2">
                            {sub.completed ? (
                              <CheckCircle className="w-4 h-4 text-success-500" strokeWidth={2} />
                            ) : (
                              <Circle className="w-4 h-4 text-gray-300" strokeWidth={2} />
                            )}
                            <span className="text-gray-700 font-medium">{sub.code}</span>
                            <span className="text-gray-600 flex-1">{sub.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
        className="hidden lg:block absolute left-80 top-1/2 -translate-y-1/2 z-20 w-6 h-12 bg-white border border-gray-100 rounded-r-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
        style={{ left: isPanelCollapsed ? '0' : '320px' }}
      >
        <ChevronRight
          className={`w-4 h-4 text-gray-500 mx-auto transition-transform ${
            isPanelCollapsed ? '' : 'rotate-180'
          }`}
          strokeWidth={2}
        />
      </button>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topic Header */}
        <div className="bg-white border-b border-gray-100 px-4 lg:px-8 py-6">
          <div className="max-w-4xl mx-auto">
            {/* Mobile back button */}
            <button
              onClick={onBack}
              className="lg:hidden flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Geri</span>
            </button>

            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-primary-600">{currentTopic.code}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{currentTopic.category}</span>
                </div>
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                  {currentTopic.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{currentTopic.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>{currentTopic.itemsCompleted}/{currentTopic.itemsTotal} tamamlandı</span>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleExamClick}>
                Test et
                <Play className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress bar */}
            <Progress value={currentTopic.progress} max={100} showLabel={false} className="mb-4" />

            {/* Tabs */}
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Sticky bottom action bar - Mobile */}
        <div className="lg:hidden sticky bottom-0 bg-white border-t border-gray-100 px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <Button variant="ghost" size="sm" className="flex-1">
              Əvvəlki
            </Button>
            <Button size="sm" className="flex-1">
              Növbəti dərs
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <VideoModal
        penalty={selectedPenalty}
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      <AskTeacherModal
        isOpen={isAskTeacherModalOpen}
        onClose={() => setIsAskTeacherModalOpen(false)}
        currentTopic={currentTopic}
        onSubmit={(data) => showToast('Sualınız göndərildi', 'success')}
      />

      <QuestionThreadModal
        isOpen={isQuestionThreadModalOpen}
        onClose={() => setIsQuestionThreadModalOpen(false)}
        question={selectedQuestion}
        onReply={() => {}}
      />

      <PaywallModal
        isOpen={isPaywallModalOpen}
        onClose={() => setIsPaywallModalOpen(false)}
      />

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
