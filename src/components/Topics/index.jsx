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
import Toast from '../ui/Toast'
import Progress from '../ui/Progress'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle } from 'lucide-react'

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
    <div className="min-h-screen bg-neutral-50 flex relative">
      {/* Sidebar with topics */}
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
        className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 z-40 w-6 h-14 bg-white border border-neutral-200 rounded-r-lg items-center justify-center hover:bg-neutral-50 transition-all group shadow-sm ${
          isPanelCollapsed ? 'left-0' : 'left-[320px]'
        }`}
        title={isPanelCollapsed ? 'Paneli aç' : 'Paneli gizlət'}
      >
        {isPanelCollapsed ? (
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600" />
        )}
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header with topic info */}
        <header className="bg-white border-b border-neutral-100 sticky top-0 z-sticky">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 -m-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <BookOpen className="w-5 h-5" />
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="primary" size="sm">{currentTopic.code}</Badge>
                  {currentTopic.completed && (
                    <CheckCircle className="w-4 h-4 text-success-500" />
                  )}
                </div>
                <h1 className="text-lg font-semibold text-neutral-800 truncate">
                  {currentTopic.title}
                </h1>
              </div>

              {/* Progress */}
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-32">
                  <Progress value={currentTopic.progress} size="md" showLabel />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onExamClick={handleExamClick}
          onContactClick={handleContactTeacher}
          userPackage={userPackage}
          onPaywallOpen={() => setIsPaywallModalOpen(true)}
        />

        {/* Content */}
        <main className={`flex-1 px-4 lg:px-6 py-6 lg:py-8 transition-all duration-200 ${
          isPanelCollapsed ? 'max-w-4xl mx-auto w-full' : ''
        }`}>
          {renderContent()}
        </main>

        {/* Bottom Navigation - Mobile */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 px-4 py-3 safe-bottom z-sticky">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex-1" size="md">
              <ChevronLeft className="w-4 h-4" />
              Əvvəlki
            </Button>
            <Button variant="primary" className="flex-1" size="md">
              Növbəti
              <ChevronRight className="w-4 h-4" />
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
      {toast && (
        <Toast 
          message={toast.message} 
          variant={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
}
