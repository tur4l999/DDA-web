import { useState, useEffect, useRef } from 'react'
import { Clock, ZoomIn, CheckCircle, XCircle, HelpCircle, BookOpen, ChevronLeft, ChevronRight, PlayCircle, Image as ImageIcon, Check, X, Flag } from 'lucide-react'
import { TOPIC_QUESTIONS } from '../../data/topicQuestions'
import ReportQuestionModal from './ReportQuestionModal'
import WatermarkOverlay from './WatermarkOverlay'

// Mock user data - In a real app, this would come from a global context or auth hook
const CURRENT_USER = {
  fullName: "Tural Kazımov Rəşad oğlu",
  phone: "+994 50 123 45 67"
}

export default function QuestionsContent({ topic }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [activeMediaType, setActiveMediaType] = useState('image') // 'image' or 'video'
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const scrollContainerRef = useRef(null)

  const currentQuestion = TOPIC_QUESTIONS[currentQuestionIndex]
  const isAnswered = userAnswers[currentQuestion.id] !== undefined
  const isCorrect = isAnswered && userAnswers[currentQuestion.id] === currentQuestion.correctAnswer

  const hasVideo = !!currentQuestion.video
  const hasImage = !!currentQuestion.image
  const hasMedia = hasVideo || hasImage

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Auto-scroll pagination
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeBtn = scrollContainerRef.current.children[currentQuestionIndex]
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }, [currentQuestionIndex])

  // Reset state on question change
  useEffect(() => {
    setShowExplanation(false)
    setActiveMediaType('image')
  }, [currentQuestionIndex])

  // Switch to video when explanation is shown (if video exists)
  useEffect(() => {
    if (showExplanation && hasVideo) {
      setActiveMediaType('video')
    } else if (!showExplanation) {
      setActiveMediaType('image')
    }
  }, [showExplanation, hasVideo])

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (optionIndex) => {
    if (userAnswers[currentQuestion.id] !== undefined) return
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }))
  }

  const handleQuestionChange = (index) => {
    if (index >= 0 && index < TOPIC_QUESTIONS.length) {
      setCurrentQuestionIndex(index)
    }
  }

  const toggleMediaType = () => {
    setActiveMediaType(prev => prev === 'image' ? 'video' : 'image')
  }

  const ImageModal = () => (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out overflow-y-auto"
      onClick={() => setIsZoomed(false)}
    >
       <div className="bg-white rounded-2xl max-w-2xl w-full p-6 flex flex-col gap-6 my-auto relative" onClick={e => e.stopPropagation()}>

         {/* 1. Image (Top) */}
         <div
           className="w-full bg-gray-50 rounded-xl overflow-hidden border border-gray-100 relative group"
           onContextMenu={(e) => e.preventDefault()}
         >
             <img
              src={currentQuestion.image}
              alt="Question"
              className="w-full h-auto object-contain max-h-[50vh]"
            />
            <WatermarkOverlay
              text={CURRENT_USER.fullName}
              subtext={CURRENT_USER.phone}
            />
         </div>

         {/* 2. Question Text (Middle) */}
         <div>
            <div className="flex items-center justify-between mb-2">
               <h1 className="text-lg font-bold text-gray-500">{currentQuestionIndex + 1}</h1>
               <button
                 onClick={() => setIsZoomed(false)}
                 className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors"
               >
                 <XCircle className="w-6 h-6" />
               </button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-relaxed">{currentQuestion.text}</h2>
         </div>

         {/* 3. Options (Bottom) - with logic */}
         <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, index) => {
                const isSelected = userAnswers[currentQuestion.id] === index
                const isThisCorrect = index === currentQuestion.correctAnswer

                // Determine styling (reusing main view logic)
                let containerClass = "p-3 rounded-xl transition-all duration-200 border-2 border-transparent hover:bg-gray-50 cursor-pointer flex items-start gap-4 group"
                let radioBorder = "border-gray-300 group-hover:border-gray-400"
                let radioBg = "bg-transparent"

                if (isAnswered) {
                  if (isThisCorrect) {
                    containerClass = "p-3 rounded-xl bg-green-600 border-green-600 text-white cursor-default flex items-start gap-4 shadow-md scale-[1.01]"
                    radioBorder = "border-white"
                    radioBg = "bg-white"
                  } else if (isSelected) {
                    containerClass = "p-3 rounded-xl bg-red-600 border-red-600 text-white cursor-default flex items-start gap-4 shadow-md"
                    radioBorder = "border-white"
                    radioBg = "bg-white"
                  } else {
                    containerClass = "p-3 rounded-xl opacity-50 cursor-default flex items-start gap-4"
                  }
                }

                return (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={containerClass}
                  >
                    {isAnswered && (isThisCorrect || (isSelected && !isThisCorrect)) ? (
                      <div className="mt-1 w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {isThisCorrect ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <X className="w-6 h-6 text-white" />
                        )}
                      </div>
                    ) : (
                      <div className={`mt-1 w-5 h-5 rounded-full border-[2px] flex items-center justify-center flex-shrink-0 transition-colors ${radioBorder} ${radioBg}`}>
                        {(isAnswered && (isThisCorrect || isSelected)) && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    )}

                    <span className={`text-lg font-medium ${isAnswered && (isThisCorrect || isSelected) ? 'text-white' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </div>
                )
            })}
         </div>

         {/* Close Button at bottom */}
          <button
              onClick={() => setIsZoomed(false)}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
            >
              Bağla
          </button>
       </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-full relative">

      {/* Main Content Body */}
      <div className="flex-1 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start max-w-[1400px] mx-auto">

          {/* Left Column: Text & Options */}
          <div className="w-full lg:w-1/2 max-w-3xl order-2 lg:order-1">

            {/* Question Number & Text */}
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-500 mb-2">
                {currentQuestionIndex + 1}
              </h1>
              <h2 className="text-xl font-bold text-gray-900 leading-relaxed">
                {currentQuestion.text}
              </h2>
            </div>

            {/* Options List */}
            <div className="flex flex-col gap-3 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = userAnswers[currentQuestion.id] === index
                const isThisCorrect = index === currentQuestion.correctAnswer

                // Determine styling
                let containerClass = "p-3 rounded-xl transition-all duration-200 border-2 border-transparent hover:bg-gray-50 cursor-pointer flex items-start gap-4 group"
                let radioBorder = "border-gray-300 group-hover:border-gray-400"
                let radioBg = "bg-transparent"

                if (isAnswered) {
                  if (isThisCorrect) {
                    containerClass = "p-3 rounded-xl bg-green-600 border-green-600 text-white cursor-default flex items-start gap-4 shadow-md scale-[1.01]"
                    radioBorder = "border-white"
                    radioBg = "bg-white"
                  } else if (isSelected) {
                    containerClass = "p-3 rounded-xl bg-red-600 border-red-600 text-white cursor-default flex items-start gap-4 shadow-md"
                    radioBorder = "border-white"
                    radioBg = "bg-white"
                  } else {
                    containerClass = "p-3 rounded-xl opacity-50 cursor-default flex items-start gap-4"
                  }
                }

                return (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={containerClass}
                  >
                    {/* Icon or Radio Button */}
                    {isAnswered && (isThisCorrect || (isSelected && !isThisCorrect)) ? (
                      <div className="mt-1 w-6 h-6 flex items-center justify-center flex-shrink-0">
                        {isThisCorrect ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <X className="w-6 h-6 text-white" />
                        )}
                      </div>
                    ) : (
                      <div className={`mt-1 w-5 h-5 rounded-full border-[2px] flex items-center justify-center flex-shrink-0 transition-colors ${radioBorder} ${radioBg}`}>
                        {(isAnswered && (isThisCorrect || isSelected)) && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                    )}

                    <span className={`text-lg font-medium ${isAnswered && (isThisCorrect || isSelected) ? 'text-white' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Actions Row */}
            <div className="flex flex-col gap-4">
               {/* Feedback Message */}
               {isAnswered && (
                  <div className={`flex items-center gap-3 p-4 rounded-xl border ${isCorrect ? 'bg-green-100 border-green-500 text-green-900' : 'bg-red-100 border-red-500 text-red-900'}`}>
                    {isCorrect ? <CheckCircle className="w-6 h-6 text-green-700" /> : <XCircle className="w-6 h-6 text-red-700" />}
                  </div>
               )}

               {/* Explanation Button & Report */}
               <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm active:scale-95 flex items-center gap-2"
                  >
                    {showExplanation ? 'İzahı gizlət' : 'İzaha bax'}
                  </button>

                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all border border-gray-200 hover:border-red-100 group font-medium"
                    title="Sualda səhvlik bildir"
                  >
                    <Flag className="w-4 h-4 transition-transform group-hover:rotate-12" />
                    <span>Səhv bildir</span>
                  </button>
               </div>
            </div>
          </div>

          {/* Right Column: Media */}
          <div className="w-full lg:w-1/2 pt-8 order-1 lg:order-2">
             {hasMedia && (
                <div className="relative group w-full mb-6">
                  {/* Media Container */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-black/5">

                    {activeMediaType === 'video' && hasVideo ? (
                      <video
                        controls
                        autoPlay
                        className="w-full h-full object-contain bg-black"
                        src={currentQuestion.video}
                      >
                        Video dəstəklənmir.
                      </video>
                    ) : (
                      // Image View
                      <div
                        className="w-full h-full relative cursor-zoom-in group/image"
                        onClick={() => setIsZoomed(true)}
                        onContextMenu={(e) => e.preventDefault()}
                      >
                         <img
                           src={currentQuestion.image}
                           alt="Question"
                           className="w-full h-full object-contain"
                         />
                         <WatermarkOverlay
                           text={CURRENT_USER.fullName}
                           subtext={CURRENT_USER.phone}
                         />
                         <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover/image:opacity-100 pointer-events-none">
                            <ZoomIn className="w-10 h-10 text-white drop-shadow-md" />
                         </div>
                      </div>
                    )}

                    {/* Switcher Arrows */}
                    {hasVideo && hasImage && showExplanation && (
                       <>
                         <button
                           onClick={toggleMediaType}
                           className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-primary-600 transition-all z-10"
                           title={activeMediaType === 'image' ? "Videoya bax" : "Şəkilə bax"}
                         >
                           <ChevronLeft className="w-6 h-6" />
                         </button>
                         <button
                           onClick={toggleMediaType}
                           className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-md flex items-center justify-center text-gray-700 hover:text-primary-600 transition-all z-10"
                           title={activeMediaType === 'image' ? "Videoya bax" : "Şəkilə bax"}
                         >
                           <ChevronRight className="w-6 h-6" />
                         </button>

                         <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 pointer-events-none">
                            {activeMediaType === 'video' ? <PlayCircle className="w-3.5 h-3.5" /> : <ImageIcon className="w-3.5 h-3.5" />}
                            <span>{activeMediaType === 'video' ? 'Video izah' : 'Sual şəkli'}</span>
                         </div>
                       </>
                    )}
                  </div>
                </div>
             )}
          </div>
        </div>

        {/* Explanation Section - Full Width Below Columns */}
        {showExplanation && currentQuestion.explanation && (
           <div className="max-w-[1400px] mx-auto mt-6 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="p-6 bg-green-50 rounded-2xl border border-green-100 text-green-900 shadow-sm">
                 <div className="flex gap-3 items-start mb-3">
                   <div className="p-2 bg-green-100 rounded-lg">
                      <BookOpen className="w-6 h-6 text-green-700" />
                   </div>
                   <div>
                      <h3 className="font-bold text-lg text-green-800">İzah</h3>
                      <p className="leading-relaxed text-green-800/90 text-base mt-1">
                        {currentQuestion.explanation}
                      </p>
                   </div>
                 </div>
              </div>
           </div>
        )}

      </div>

      {/* Bottom Control Bar */}
      <div className="sticky -bottom-8 -mx-4 lg:-mx-6 bg-white border-t border-gray-200 px-4 lg:px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40 flex flex-col gap-4">

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
           <div
             className="h-full bg-primary-500 transition-all duration-300"
             style={{ width: `${((currentQuestionIndex + 1) / TOPIC_QUESTIONS.length) * 100}%` }}
           />
        </div>

        <div className="flex items-center justify-between gap-4">

          {/* Timer */}
          <div className="flex items-center gap-2 text-gray-900 text-xl font-bold tracking-wide tabular-nums whitespace-nowrap">
            {formatTime(elapsedTime)}
          </div>

          {/* Pagination Strip */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 mx-2 py-2"
          >
            {TOPIC_QUESTIONS.map((q, idx) => {
              const status = userAnswers[q.id] !== undefined
                ? (userAnswers[q.id] === q.correctAnswer ? 'correct' : 'incorrect')
                : 'unanswered'

              let btnClass = "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-sm font-medium transition-all duration-200 border "

              if (idx === currentQuestionIndex) {
                 btnClass += "ring-2 ring-primary-500 ring-offset-1 z-10 bg-primary-600 text-white border-primary-600 shadow-md transform scale-110"
              } else if (status === 'correct') {
                btnClass += "bg-green-100 border-green-200 text-green-700"
              } else if (status === 'incorrect') {
                btnClass += "bg-red-100 border-red-200 text-red-700"
              } else {
                btnClass += "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }

              return (
                <button
                  key={q.id}
                  onClick={() => handleQuestionChange(idx)}
                  className={btnClass}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center gap-2">
             <button
                onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
                disabled={currentQuestionIndex === 0}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
             >
               <ChevronLeft className="w-5 h-5" />
             </button>
             <button
                onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
                disabled={currentQuestionIndex === TOPIC_QUESTIONS.length - 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
             >
               <ChevronRight className="w-5 h-5" />
             </button>
          </div>

        </div>
      </div>

      {/* Image Zoom Portal */}
      {isZoomed && currentQuestion.image && <ImageModal />}

      {/* Report Modal */}
      <ReportQuestionModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        questionId={currentQuestion.id}
        questionText={currentQuestion.text}
      />
    </div>
  )
}
