import { useState, useEffect, useRef } from 'react'
import { Clock, ZoomIn, CheckCircle, XCircle, HelpCircle, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { TOPIC_QUESTIONS } from '../../data/topicQuestions'

export default function QuestionsContent({ topic }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({})
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const scrollContainerRef = useRef(null)

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

  // Reset explanation on change
  useEffect(() => {
    setShowExplanation(false)
  }, [currentQuestionIndex])

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

  const currentQuestion = TOPIC_QUESTIONS[currentQuestionIndex]
  const isAnswered = userAnswers[currentQuestion.id] !== undefined
  const isCorrect = isAnswered && userAnswers[currentQuestion.id] === currentQuestion.correctAnswer

  // Media Logic
  const hasVideo = showExplanation && currentQuestion.video
  const hasMedia = hasVideo || !!currentQuestion.image

  const ImageModal = () => (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={() => setIsZoomed(false)}
    >
      <img
        src={currentQuestion.image}
        alt="Question"
        className="max-w-full max-h-full object-contain rounded-lg"
      />
    </div>
  )

  return (
    <div className="flex flex-col min-h-full relative">

      {/* Main Content Body */}
      <div className="flex-1 pb-32"> {/* Large padding bottom for footer space */}
        <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-start max-w-[1400px] mx-auto">

          {/* Right Column: Media (Image/Video) */}
          {hasMedia && (
            <div className="w-full lg:w-1/2 sticky top-4">
              {hasVideo ? (
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                  <video
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                    src={currentQuestion.video}
                  >
                    Video dəstəklənmir.
                  </video>
                </div>
              ) : (
                <div
                  className="relative group cursor-zoom-in w-full"
                  onClick={() => setIsZoomed(true)}
                >
                  <img
                    src={currentQuestion.image}
                    alt="Question"
                    className="w-full h-auto object-contain rounded-xl border border-gray-200 shadow-sm transition-transform hover:shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <ZoomIn className="w-10 h-10 text-white drop-shadow-md" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Left Column: Text & Options */}
          <div className={`w-full ${hasMedia ? 'lg:w-1/2' : 'max-w-3xl mx-auto'}`}>

            {/* Question Number & Text */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
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
                    containerClass = "p-3 rounded-xl bg-green-50 border-green-500/20 cursor-default flex items-start gap-4"
                    radioBorder = "border-green-500"
                    radioBg = "bg-green-500"
                  } else if (isSelected) {
                    containerClass = "p-3 rounded-xl bg-red-50 border-red-500/20 cursor-default flex items-start gap-4"
                    radioBorder = "border-red-500"
                    radioBg = "bg-red-500"
                  } else {
                    containerClass = "p-3 rounded-xl opacity-50 cursor-default flex items-start gap-4"
                  }
                } else if (isSelected) {
                   // While selecting (if we allowed re-select, but here we lock immediately)
                   // But logically isAnswered covers it.
                }

                return (
                  <div
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={containerClass}
                  >
                    {/* Custom Radio Button */}
                    <div className={`mt-1 w-5 h-5 rounded-full border-[2px] flex items-center justify-center flex-shrink-0 transition-colors ${radioBorder} ${radioBg}`}>
                      {(isAnswered && (isThisCorrect || isSelected)) && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>

                    <span className={`text-lg ${isAnswered && isThisCorrect ? 'font-medium text-green-900' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Explanation Button (Moved here) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm active:scale-95 flex items-center gap-2"
              >
                {showExplanation ? 'İzahı gizlət' : 'İzaha bax'}
              </button>
            </div>

            {/* Explanation Content */}
            {showExplanation && currentQuestion.explanation && (
               <div className="mt-6 p-5 bg-green-50 rounded-xl border border-green-100 text-green-900 transition-all duration-300 ease-in-out opacity-100 translate-y-0">
                 <div className="flex gap-2 items-start mb-2">
                   <BookOpen className="w-5 h-5 text-green-700 mt-0.5" />
                   <h3 className="font-bold text-green-800">İzah</h3>
                 </div>
                 <p className="leading-relaxed text-green-800/90">
                   {currentQuestion.explanation}
                 </p>
               </div>
            )}

            {/* Feedback Message */}
            {isAnswered && (
               <div className={`mt-6 flex items-center gap-3 p-4 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                 {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                 <div>
                   <p className="font-bold">{isCorrect ? 'Düzgün cavab!' : 'Səhv cavab'}</p>
                 </div>
               </div>
            )}

          </div>
        </div>
      </div>

      {/* Bottom Control Bar - Sticky/Fixed effect */}
      {/* Using negative margin to extend to edges of parent padding, and sticky to stay at bottom of view */}
      <div className="sticky -bottom-8 -mx-4 lg:-mx-6 bg-white border-t border-gray-200 px-4 lg:px-6 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-40 flex flex-col gap-3">

        {/* Progress Bar (Optional visual indicator) */}
        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
           <div
             className="h-full bg-primary-500 transition-all duration-300"
             style={{ width: `${((currentQuestionIndex + 1) / TOPIC_QUESTIONS.length) * 100}%` }}
           />
        </div>

        <div className="flex items-center justify-between gap-4">

          {/* Timer */}
          <div className="flex items-center gap-2 text-gray-700 font-mono font-medium bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap">
            <Clock className="w-4 h-4 text-gray-400" />
            {formatTime(elapsedTime)}
          </div>

          {/* Pagination Strip */}
          <div
            ref={scrollContainerRef}
            className="flex-1 flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 mx-2"
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

          {/* Nav Buttons (Compact) */}
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
    </div>
  )
}
