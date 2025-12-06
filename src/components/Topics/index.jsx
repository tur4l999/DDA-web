import { useState } from 'react'
import TopicSidebar from './TopicSidebar'
import StickyHeader from './StickyHeader'
import TabNavigation from './TabNavigation'
import TextContent from './TextContent'
import VideoContent from './VideoContent'
import ThreeDVideoContent from './ThreeDVideoContent'
import QuestionsContent from './QuestionsContent'
import PenaltiesContent from './PenaltiesContent'
import VideoModal from '../Penalties/VideoModal'
import AskTeacherModal from './AskTeacherModal'
import QuestionThreadModal from './QuestionThreadModal'
import PaywallModal from './PaywallModal'
import Toast from './Toast'

export default function TopicsPage({ onBack }) {
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
  const [userPackage, setUserPackage] = useState('basic') // 'basic', 'standard', 'premium'
  const [currentTopic, setCurrentTopic] = useState({
    id: 1,
    code: 'M1',
    title: 'Ümumi müddəalar',
    category: 'Yol hərəkəti qaydaları',
    completed: false,
    progress: 45
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

  const handleQuestionSubmit = (questionData) => {
    // Add question to list (optimistic UI)
    setQuestions(prev => [questionData, ...prev])
    
    // Show toast
    showToast('Sualınız göndərildi', 'success')
  }

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question)
    setIsQuestionThreadModalOpen(true)
  }

  const handleReply = (questionId, reply) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === questionId) {
        return {
          ...q,
          replies: [...(q.replies || []), reply],
          status: 'answered'
        }
      }
      return q
    }))

    // Update selected question if it's open
    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion(prev => ({
        ...prev,
        replies: [...(prev.replies || []), reply],
        status: 'answered'
      }))
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const topics = [
    { id: 1, code: 'M1', title: 'Ümumi müddəalar', category: 'Əsaslar', completed: false, progress: 45 },
    { id: 2, code: 'M2', title: 'Yol nişanları', category: 'Nişanlar', completed: true, progress: 100 },
    { 
      id: 3, 
      code: 'M3', 
      title: 'Yol xətləri', 
      category: 'Nişanlar', 
      completed: false, 
      progress: 35,
      subTopics: [
        { id: '3.1', code: 'M3.1', title: 'Kəsilməz xətlər', completed: true, progress: 100 },
        { id: '3.2', code: 'M3.2', title: 'Kəsilən xətlər', completed: true, progress: 100 },
        { id: '3.3', code: 'M3.3', title: 'Sarı rəngli xətlər', completed: false, progress: 60 },
        { id: '3.4', code: 'M3.4', title: 'Mavi rəngli xətlər', completed: false, progress: 0 },
        { id: '3.5', code: 'M3.5', title: 'Ox işarələri', completed: false, progress: 40 },
        { id: '3.6', code: 'M3.6', title: 'Piyada keçidi xətləri', completed: false, progress: 80 },
        { id: '3.7', code: 'M3.7', title: 'Dayanma xətləri', completed: false, progress: 20 },
        { id: '3.8', code: 'M3.8', title: 'Saxlama zonası xətləri', completed: false, progress: 0 }
      ]
    },
    { id: 4, code: 'M4', title: 'Sürücünün vəzifələri', category: 'Qanunlar', completed: false, progress: 20 },
    { 
      id: 5, 
      code: 'M5', 
      title: 'Siqnallar', 
      category: 'Əməliyyatlar', 
      completed: false, 
      progress: 50,
      subTopics: [
        { id: '5.1', code: 'M5.1', title: 'İşıqlı siqnallar', completed: true, progress: 100 },
        { id: '5.2', code: 'M5.2', title: 'Səs siqnalları', completed: false, progress: 0 }
      ]
    }
  ]

  const progress = {
    completed: 4,
    total: 24
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'materials':
        return (
          <div className="max-w-[860px] mx-auto">
            <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-gray-600 font-medium mb-1">Maddələr</p>
              <p className="text-sm text-gray-500">Qanun maddələri tezliklə əlavə ediləcək</p>
            </div>
          </div>
        )
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
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar with collapse */}
      <div className={`transition-all duration-200 ease-out ${isPanelCollapsed ? 'w-0' : 'w-80'} relative`}>
        <TopicSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentTopic={currentTopic}
          topics={topics}
          onTopicSelect={setCurrentTopic}
          isCollapsed={isPanelCollapsed}
        />
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
        className="absolute left-80 top-1/2 -translate-y-1/2 z-50 w-8 h-16 bg-white border border-gray-200 rounded-r-lg shadow-md hover:shadow-lg hover:bg-primary-50 hover:border-primary-300 transition-all flex items-center justify-center group"
        style={{ left: isPanelCollapsed ? '0' : '320px' }}
        title={isPanelCollapsed ? 'Paneli genişləndir' : 'Paneli yığışdır'}
      >
        <svg 
          className={`w-4 h-4 text-gray-600 group-hover:text-primary-700 transition-transform ${isPanelCollapsed ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <StickyHeader
          topic={currentTopic}
          onBack={onBack}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          progress={progress}
        />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onExamClick={handleExamClick}
          onContactClick={handleContactTeacher}
          userPackage={userPackage}
          onPaywallOpen={() => setIsPaywallModalOpen(true)}
        />

        <main className={`flex-1 px-4 lg:px-6 py-8 transition-all duration-200 ${isPanelCollapsed ? 'max-w-[1200px] mx-auto' : ''}`}>
          {renderContent()}
        </main>
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
        onSubmit={handleQuestionSubmit}
      />

      <QuestionThreadModal
        isOpen={isQuestionThreadModalOpen}
        onClose={() => setIsQuestionThreadModalOpen(false)}
        question={selectedQuestion}
        onReply={handleReply}
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
