import React, { useState } from 'react'
import { ArrowLeft, Ticket, BookOpen, Crown } from 'lucide-react'
import TicketsView from './TicketsView'
import TopicsView from './TopicsView'
import FinalExamView from './FinalExamView'
import PaywallModal from '../Topics/PaywallModal'
import ExamRunner from './ExamRunner'
import { TOPIC_QUESTIONS } from '../../data/topicQuestions'

export default function ExamPage({ onBack, onStartExam }) {
  const [activeTab, setActiveTab] = useState('tickets') // 'tickets' | 'topics' | 'final'
  const [isPaywallOpen, setIsPaywallOpen] = useState(false)
  const [activeExam, setActiveExam] = useState(null)

  const handleTicketClick = (ticketId) => {
    // Start ticket exam with dummy questions
    setActiveExam({ type: 'ticket', id: ticketId, data: TOPIC_QUESTIONS })
  }

  const handleTopicClick = (topicId) => {
    // Start topic exam
    setActiveExam({ type: 'topic', id: topicId, data: TOPIC_QUESTIONS })
  }

  const handleFinalExamClick = (type) => {
    if (type === 'simulator') {
       // Simulator is premium
       setIsPaywallOpen(true)
       return
    }
    // Start final exam
    setActiveExam({ type: 'final', mode: type, data: TOPIC_QUESTIONS })
  }

  if (activeExam) {
    return <ExamRunner onClose={() => setActiveExam(null)} data={activeExam.data} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tickets':
        return <TicketsView onTicketClick={handleTicketClick} onLockClick={() => setIsPaywallOpen(true)} />
      case 'topics':
        return <TopicsView onTopicClick={handleTopicClick} />
      case 'final':
        return <FinalExamView onExamClick={handleFinalExamClick} />
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-hidden relative">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 px-4 py-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-[1600px] mx-auto w-full">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">İmtahan Mərkəzi</h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex p-1 bg-gray-100/80 rounded-xl w-full max-w-2xl mx-auto backdrop-blur-sm">
            {[
              { id: 'tickets', label: 'Biletlər', icon: Ticket },
              { id: 'topics', label: 'Mövzular', icon: BookOpen },
              { id: 'final', label: 'İmtahan', icon: Crown },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary-600' : ''}`} strokeWidth={2} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 lg:p-6 custom-scrollbar">
        <div className="max-w-[1600px] mx-auto pb-10">
          {renderContent()}
        </div>
      </main>

      {/* Paywall Modal */}
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} />
    </div>
  )
}
