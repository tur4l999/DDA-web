import { useState } from 'react'
import TopicSidebar from './TopicSidebar'
import StickyHeader from './StickyHeader'
import TabNavigation from './TabNavigation'
import TextContent from './TextContent'
import VideoContent from './VideoContent'
import ThreeDVideoContent from './ThreeDVideoContent'
import QuestionsContent from './QuestionsContent'
import PenaltiesContent from './PenaltiesContent'
import ArticlesContent from './ArticlesContent'
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
  const [userPackage, setUserPackage] = useState('basic')
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
    setQuestions(prev => [questionData, ...prev])
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
    { id: 1, code: 'M1', title: 'Ümumi müddəalar', completed: false, progress: 45 },
    { 
      id: 2, 
      code: 'M2', 
      title: 'Yol hərəkəti iştirakçılarının vəzifələri, NV-nin idarəetmə hüququ, sürücülük vəsiqəsi', 
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
        { id: '3.1', code: 'M3.1', title: 'Yol nişanlarının tətbiqi. Xəbərdarlıq nişanları.', completed: true, progress: 100 },
        { id: '3.2', code: 'M3.2', title: 'Üstünlük nişanları.', completed: true, progress: 100 },
        { id: '3.3', code: 'M3.3', title: 'Qadağan nişanları.', completed: false, progress: 70 },
        { id: '3.4', code: 'M3.4', title: 'Məcburi hərəkət istiqaməti nişanları.', completed: false, progress: 50 },
        { id: '3.5', code: 'M3.5', title: 'Məlumatverici-göstərici nişanlar.', completed: false, progress: 40 },
        { id: '3.6', code: 'M3.6', title: 'Servis nişanları.', completed: false, progress: 80 },
        { id: '3.7', code: 'M3.7', title: 'Əlavə məlumat nişanları (lövhəcikləri).', completed: false, progress: 30 },
        { id: '3.8', code: 'M3.8', title: 'Nəqliyyat vasitələrinin tanınma nişanları.', completed: false, progress: 60 }
      ]
    },
    { id: 4, code: 'M4', title: 'Yolun nişanlanma xətləri', completed: false, progress: 35 },
    { id: 5, code: 'M5', title: 'Nizamlayıcının və svetoforların siqnalları', completed: false, progress: 50 },
    { id: 6, code: 'M6', title: 'Xüsusi siqnalların tətbiqi', completed: false, progress: 65 },
    { id: 7, code: 'M7', title: 'Qəza dayanma siqnalının və qəza dayanma nişanının tətbiqi', completed: false, progress: 30 },
    { id: 8, code: 'M8', title: 'Hərəkətə başlama və manevretmə', completed: false, progress: 55 },
    { id: 9, code: 'M9', title: 'NV-nin yolun hərəkət hissəsində yerləşdiyilməsi', completed: false, progress: 40 },
    { id: 10, code: 'M10', title: 'Hərəkət sürəti', completed: false, progress: 45 },
    { id: 11, code: 'M11', title: 'Ötmə və qarşılıqlı keçmə', completed: false, progress: 50 },
    { 
      id: 12, 
      code: 'M12', 
      title: 'Dayanma, durma və parklanma', 
      completed: false, 
      progress: 60,
      subTopics: [
        { id: '12.1', code: 'M12.1', title: 'Dayanma və durma', completed: true, progress: 100 },
        { id: '12.2', code: 'M12.2', title: 'Parklanma', completed: false, progress: 40 }
      ]
    },
    { id: 13, code: 'M13', title: 'Yolayrıcıların keçilməsi', completed: false, progress: 70 },
    { id: 14, code: 'M14', title: 'Piyada keçidləri və ümumi istifadədə olan NV-nin dayanması', completed: false, progress: 80 },
    { id: 15, code: 'M15', title: 'Avtomagistrallarda hərəkət', completed: false, progress: 25 },
    { id: 16, code: 'M16', title: 'Dəmiryol keçidlərində hərəkət', completed: false, progress: 60 },
    { id: 17, code: 'M17', title: 'NV-nin üstün hərəkət rejimi ilə hərəkəti və bununla əlaqədar digər sürücülərin vəzifələri', completed: false, progress: 45 },
    { id: 18, code: 'M18', title: 'Yaşayış zonalarında hərəkət. Sürmə təlimi', completed: false, progress: 55 },
    { id: 19, code: 'M19', title: 'NV-də səs siqnalları və xarici işıq cihazlarının istifadə edilməsi', completed: false, progress: 80 },
    { id: 20, code: 'M20', title: 'Nasaz NV və onların yedəyə alınması', completed: false, progress: 70 },
    { id: 21, code: 'M21', title: 'Adamların və yüklərin daşınması', completed: false, progress: 55 },
    { id: 22, code: 'M22', title: 'NV-nin nasazlıqları və istismarı qadağan edən səbəblər', completed: false, progress: 65 },
    { id: 23, code: 'M23', title: 'Yol hərəkəti təhlükəsizliyinin əsasları', completed: false, progress: 85 },
    { id: 24, code: 'M24', title: 'İlk tibbi yardımın göstərilməsi', completed: false, progress: 90 },
    { id: 25, code: 'M25', title: 'Velosiped, kiçik elektik nəqliyyat vasitələri, moped və at arabalarının sürülməsinə dair tələblər', completed: false, progress: 40 },
    { id: 26, code: 'M26', title: 'Sürücülərin cavabdehliyi', completed: false, progress: 50 },
    { 
      id: 27, 
      code: 'M27', 
      title: 'Avtomobilin quruluşu', 
      completed: false, 
      progress: 35,
      subTopics: [
        { id: '27.1', code: 'M27.1', title: 'Avtomobilin ümumi quruluşu', completed: false, progress: 60 },
        { id: '27.2', code: 'M27.2', title: 'Benzin DYM', completed: false, progress: 40 },
        { id: '27.3', code: 'M27.3', title: 'Dizel DYM', completed: false, progress: 30 },
        { id: '27.4', code: 'M27.4', title: 'Çarxqolu-sürgüqolu mexanizmi', completed: false, progress: 20 },
        { id: '27.5', code: 'M27.5', title: 'Qaz paylama mexanizmi', completed: false, progress: 50 },
        { id: '27.6', code: 'M27.6', title: 'Mühərrikin yağlama sistemi', completed: false, progress: 70 }
      ]
    }
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
        return null
    }
  }

  return (
    <div className="min-h-screen bg-surface-50 flex relative">
      {/* Sidebar with collapse */}
      <div className={`transition-all duration-300 ease-out ${isPanelCollapsed ? 'w-0' : 'w-80'} relative`}>
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
        className="absolute top-1/2 -translate-y-1/2 z-50 w-6 h-12 bg-white border border-slate-200 rounded-r-lg shadow-soft hover:shadow-soft-md hover:bg-primary-50 hover:border-primary-200 transition-all flex items-center justify-center group"
        style={{ left: isPanelCollapsed ? '0' : '320px' }}
        title={isPanelCollapsed ? 'Paneli aç' : 'Paneli gizlət'}
      >
        <svg
          className={`w-3 h-3 text-slate-400 group-hover:text-primary-600 transition-all ${isPanelCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <StickyHeader
          topic={currentTopic}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />

        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onExamClick={handleExamClick}
          onContactClick={handleContactTeacher}
          userPackage={userPackage}
          onPaywallOpen={() => setIsPaywallModalOpen(true)}
        />

        <main className={`flex-1 px-4 lg:px-8 py-8 transition-all duration-300 ${isPanelCollapsed ? 'max-w-[1200px] mx-auto' : ''}`}>
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

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
