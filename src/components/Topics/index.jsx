import { useState } from 'react'
import TopicSidebar from './TopicSidebar'
import StickyHeader from './StickyHeader'
import TabNavigation from './TabNavigation'
import TextContent from './TextContent'
import VideoContent from './VideoContent'
import QuestionsContent from './QuestionsContent'
import PenaltiesContent from './PenaltiesContent'
import VideoModal from '../Penalties/VideoModal'
import AskTeacherModal from './AskTeacherModal'
import QuestionThreadModal from './QuestionThreadModal'
import Toast from './Toast'

export default function TopicsPage({ onBack }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('materials')
  const [selectedPenalty, setSelectedPenalty] = useState(null)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isAskTeacherModalOpen, setIsAskTeacherModalOpen] = useState(false)
  const [isQuestionThreadModalOpen, setIsQuestionThreadModalOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [questions, setQuestions] = useState([])
  const [toast, setToast] = useState(null)
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
    { id: 3, code: 'M3', title: 'Yol xətləri', category: 'Nişanlar', completed: false, progress: 0 },
    { id: 4, code: 'M4', title: 'Sürücünün vəzifələri', category: 'Qanunlar', completed: false, progress: 20 },
    { id: 5, code: 'M5', title: 'Siqnallar', category: 'Əməliyyatlar', completed: false, progress: 0 }
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
        return (
          <div className="max-w-[860px] mx-auto">
            <div className="text-center py-16 bg-gray-50 border border-gray-200 rounded-xl">
              <p className="text-gray-600 font-medium mb-1">3D Video</p>
              <p className="text-sm text-gray-500">3D videolar tezliklə əlavə ediləcək</p>
            </div>
          </div>
        )
      case 'video':
        return <VideoContent />
      case 'questions':
        return <QuestionsContent questions={questions} onQuestionClick={handleQuestionClick} />
      case 'penalties':
        return <PenaltiesContent topicRelated={true} onVideoClick={handleVideoClick} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <TopicSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentTopic={currentTopic}
        topics={topics}
        onTopicSelect={setCurrentTopic}
      />

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
        />

        <main className="flex-1 px-4 lg:px-6 py-8">
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

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
