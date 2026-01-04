import { useState, useEffect, useRef } from 'react'
import { Clock, ZoomIn, ChevronLeft, ChevronRight, CheckCircle, XCircle, HelpCircle, BookOpen } from 'lucide-react'
import { TOPIC_QUESTIONS } from '../../data/topicQuestions'

export default function QuestionsContent({ topic }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState({}) // { questionId: selectedOptionIndex }
  const [elapsedTime, setElapsedTime] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const scrollContainerRef = useRef(null)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Scroll active pagination button into view
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

  // Reset explanation when question changes
  useEffect(() => {
    setShowExplanation(false)
  }, [currentQuestionIndex])

  // Format time as HH:MM:SS
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleAnswerSelect = (optionIndex) => {
    // Only allow answering once
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

  // Swipe handlers
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null) // Reset
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleQuestionChange(currentQuestionIndex + 1)
    }
    if (isRightSwipe) {
      handleQuestionChange(currentQuestionIndex - 1)
    }
  }

  const currentQuestion = TOPIC_QUESTIONS[currentQuestionIndex]
  const isAnswered = userAnswers[currentQuestion.id] !== undefined
  const isCorrect = isAnswered && userAnswers[currentQuestion.id] === currentQuestion.correctAnswer

  // Determine if there is media to show
  const hasVideo = showExplanation && currentQuestion.video
  const hasImage = !!currentQuestion.image
  const hasMedia = hasVideo || hasImage

  // Image zoom modal
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
    <div className="flex flex-col h-[calc(100vh-140px)] relative group">

      {/* Top Control Bar */}
      <div className="bg-white border-b border-gray-100 pb-2 mb-2 z-10">
        <div className="max-w-6xl mx-auto flex flex-col gap-3">

          {/* Timer and Controls */}
          <div className="flex items-center justify-between px-4 md:px-0">
            <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-3 py-1.5 rounded-lg font-mono text-lg font-medium">
              <Clock className="w-5 h-5" />
              {formatTime(elapsedTime)}
            </div>

            {/* Explanation Toggle Button (Always visible) */}
             <button
               onClick={() => setShowExplanation(!showExplanation)}
               className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
             >
               <BookOpen className="w-4 h-4" />
               {showExplanation ? 'İzahı gizlət' : 'İzaha bax'}
             </button>
          </div>

          {/* Navigation Buttons */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto p-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
          >
            {TOPIC_QUESTIONS.map((q, idx) => {
              const status = userAnswers[q.id] !== undefined
                ? (userAnswers[q.id] === q.correctAnswer ? 'correct' : 'incorrect')
                : 'unanswered'

              let btnClass = "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-sm font-medium transition-all duration-200 border "

              if (idx === currentQuestionIndex) {
                btnClass += "ring-2 ring-primary-500 ring-offset-2 z-10 "
              }

              if (status === 'correct') {
                btnClass += "bg-green-100 border-green-200 text-green-700 hover:bg-green-200"
              } else if (status === 'incorrect') {
                btnClass += "bg-red-100 border-red-200 text-red-700 hover:bg-red-200"
              } else {
                if (idx === currentQuestionIndex) {
                   btnClass += "bg-primary-600 border-primary-600 text-white shadow-md"
                } else {
                   btnClass += "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                }
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
        </div>
      </div>

      {/* Navigation Arrows (Desktop/Tablet) */}
      <button
        onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
        disabled={currentQuestionIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white border border-gray-200 shadow-md text-gray-500 hover:text-primary-600 hover:border-primary-200 transition-all disabled:opacity-0 disabled:pointer-events-none -ml-4 lg:-ml-12 xl:-ml-16 hidden md:flex`}
        aria-label="Əvvəlki sual"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
        disabled={currentQuestionIndex === TOPIC_QUESTIONS.length - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white border border-gray-200 shadow-md text-gray-500 hover:text-primary-600 hover:border-primary-200 transition-all disabled:opacity-0 disabled:pointer-events-none -mr-4 lg:-mr-12 xl:-mr-16 hidden md:flex`}
        aria-label="Növbəti sual"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Content Area - Scrollable & Swipeable */}
      <div
        className="flex-1 overflow-y-auto px-4 pb-8"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Layout Container: 2 columns on desktop, 1 on mobile */}
        <div className={`mx-auto ${hasMedia ? 'max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start' : 'max-w-3xl'}`}>

          {/* Media Column (Image/Video) - Visual Right on Desktop (Order Last via flex/grid?)
              Wait, standard grid fills Left then Right.
              If we want Image on Right:
              DOM Order: Text, Image.
              Mobile: Text, Image. (Text on top)
              But usually on mobile Image on Top is preferred?
              User said "Sualın şəkili sağda" (Desktop specific).
              Let's use Flex with order manipulation for max control.
              Desktop: Row. Text Left, Image Right.
              Mobile: Col. Image Top? Or Text Top?
              Common practice: Image Top.
              So: DOM order -> Image, Text.
              Desktop: flex-row-reverse. (Image becomes Right, Text becomes Left).
              Mobile: flex-col. (Image Top, Text Bottom).

              Let's switch to Flex for this control.
          */}

          <div className={`flex flex-col lg:flex-row-reverse gap-8 items-start w-full ${!hasMedia && 'lg:flex-col'}`}>

             {/* Media Container */}
             {hasMedia && (
               <div className="w-full lg:w-1/2">
                 {hasVideo ? (
                   <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200 sticky top-0">
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
                    currentQuestion.image && (
                      <div
                        className="relative group cursor-zoom-in w-full sticky top-0"
                        onClick={() => setIsZoomed(true)}
                      >
                        <img
                          src={currentQuestion.image}
                          alt="Question"
                          className="w-full h-auto object-contain rounded-2xl border border-gray-200 shadow-sm transition-transform hover:scale-[1.01]"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <ZoomIn className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    )
                 )}
               </div>
             )}

             {/* Text & Options Container */}
             <div className={`w-full ${hasMedia ? 'lg:w-1/2' : 'w-full'}`}>
                {/* Question Text */}
                <h2 className={`text-xl md:text-2xl font-medium text-gray-900 mb-6 leading-relaxed ${!hasMedia && 'text-center'}`}>
                  {currentQuestion.text}
                </h2>

                {/* Options */}
                <div className="space-y-3 w-full">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = userAnswers[currentQuestion.id] === index
                    const isThisCorrect = index === currentQuestion.correctAnswer

                    let buttonStyle = "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                    let icon = null

                    if (isAnswered) {
                      if (isThisCorrect) {
                        buttonStyle = "bg-green-50 border-green-500 text-green-700 font-medium ring-1 ring-green-500"
                        icon = <CheckCircle className="w-5 h-5 text-green-600" />
                      } else if (isSelected) {
                        buttonStyle = "bg-red-50 border-red-500 text-red-700 font-medium ring-1 ring-red-500"
                        icon = <XCircle className="w-5 h-5 text-red-600" />
                      } else {
                        buttonStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60"
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        className={`w-full p-4 text-left border rounded-2xl transition-all duration-200 flex items-center justify-between group ${buttonStyle} ${!isAnswered && 'shadow-sm hover:shadow-md'}`}
                      >
                        <span className="text-base">{option}</span>
                        {icon}
                      </button>
                    )
                  })}
                </div>

                {/* Feedback Section - Answer Status */}
                {isAnswered && (
                  <div className={`mt-6 rounded-2xl w-full animate-in fade-in slide-in-from-bottom-2 duration-300 overflow-hidden border ${
                    isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'
                  }`}>
                    <div className="p-4 flex gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <HelpCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className={`font-semibold mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                          {isCorrect ? 'Düzgün cavab!' : 'Səhv cavab'}
                        </p>
                        <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isCorrect
                            ? 'Əla! Qaydaları yaxşı bilirsiniz.'
                            : 'Diqqətli olun. Düzgün cavab yaşıl rənglə işarələnib.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Explanation Section */}
                {showExplanation && currentQuestion.explanation && (
                  <div className={`mt-4 rounded-2xl w-full animate-in fade-in slide-in-from-bottom-2 duration-300 border p-4 ${
                    isAnswered
                      ? (isCorrect ? 'bg-green-50/50 border-green-100' : 'bg-red-50/50 border-red-100')
                      : 'bg-primary-50/50 border-primary-100'
                  }`}>
                    <div className="flex gap-2 mb-2">
                      <BookOpen className={`w-4 h-4 mt-0.5 ${
                        isAnswered
                          ? (isCorrect ? 'text-green-600' : 'text-red-600')
                          : 'text-primary-600'
                      }`} />
                      <span className={`font-semibold text-sm ${
                         isAnswered
                          ? (isCorrect ? 'text-green-800' : 'text-red-800')
                          : 'text-primary-800'
                      }`}>İzah</span>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                       isAnswered
                          ? (isCorrect ? 'text-green-800' : 'text-red-800')
                          : 'text-gray-700'
                    }`}>
                      {currentQuestion.explanation}
                    </p>
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>

      {/* Image Zoom Portal */}
      {isZoomed && currentQuestion.image && <ImageModal />}
    </div>
  )
}
