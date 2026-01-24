import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Check, X, RotateCcw, Eye, ArrowRight } from 'lucide-react'
import { TOPIC_QUESTIONS } from '../../data/topicQuestions'

export default function TopicExam({ onClose, topic }) {
  // Take first 10 questions and force correct answer to index 1 (Option 2)
  const [questions] = useState(() => {
    return TOPIC_QUESTIONS.slice(0, 10).map(q => ({
      ...q,
      correctAnswer: 1 // Force correct answer to 2nd option
    }))
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { [questionId]: optionIndex }
  const [wrongCount, setWrongCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes
  const [feedback, setFeedback] = useState(null) // { type: 'correct'|'incorrect', message: string }
  const [isFinished, setIsFinished] = useState(false)
  const [result, setResult] = useState(null) // 'pass' | 'fail'

  const currentQuestion = questions[currentIndex]

  // Timer
  useEffect(() => {
    if (isFinished) return
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          setIsFinished(true)
          setResult('fail') // Time out count as fail? Or just end? Usually fail.
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isFinished])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleAnswer = (optionIndex) => {
    if (feedback) return // Prevent multiple clicks during feedback

    const isCorrect = optionIndex === currentQuestion.correctAnswer

    // Save answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }))

    if (isCorrect) {
      setFeedback({ type: 'correct', message: 'Cavab doğrudur' })
    } else {
      setFeedback({ type: 'incorrect', message: 'Cavab səhfdir' })
      setWrongCount(prev => prev + 1)
    }

    // Wait 1 second then proceed
    setTimeout(() => {
      setFeedback(null)

      if (!isCorrect) {
        // If it was the 2nd wrong answer, fail
        if (wrongCount + 1 >= 2) {
          setIsFinished(true)
          setResult('fail')
          return
        }
      }

      // If last question
      if (currentIndex === questions.length - 1) {
        setIsFinished(true)
        // If we haven't failed yet, we pass (assuming < 2 wrongs)
        setResult('pass')
      } else {
        setCurrentIndex(prev => prev + 1)
      }
    }, 1000)
  }

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-[#1a1a1a] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="bg-[#242424] rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl border border-gray-800">
          {result === 'pass' ? (
            <>
              <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Təbriklər!</h2>
              <p className="text-gray-400 mb-8">Siz mövzu imtahanını uğurla tamamladınız.</p>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-5 h-5" />
                  Digər mövzuya keçid et
                </button>
                <button
                  onClick={onClose} // Or handle results view logic
                  className="w-full py-4 bg-[#333] hover:bg-[#444] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Nəticələrə bax
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <X className="w-12 h-12 text-red-500" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Təəssüf ki...</h2>
              <p className="text-gray-400 mb-8">İmtahandan kəsildiniz. 2 səhv cavab verdiniz.</p>

              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => {
                    // Reset everything
                    setCurrentIndex(0)
                    setAnswers({})
                    setWrongCount(0)
                    setTimeLeft(900)
                    setIsFinished(false)
                    setResult(null)
                  }}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Yenidən cəhd et
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-[#333] hover:bg-[#444] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  Nəticələrə bax
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col text-white">
      {/* Feedback Overlay */}
      {feedback && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className={`text-4xl font-bold animate-in zoom-in duration-300 ${
            feedback.type === 'correct' ? 'text-green-500' : 'text-red-500'
          }`}>
            {feedback.message}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 max-w-5xl mx-auto w-full gap-8">

        {/* Image Area */}
        <div className="w-full max-w-2xl bg-[#242424] rounded-2xl overflow-hidden border border-gray-800 relative aspect-video flex items-center justify-center">
          {currentQuestion.image ? (
            <img
              src={currentQuestion.image}
              alt="Question"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-gray-600">No Image</div>
          )}
        </div>

        {/* Question Text */}
        <h1 className="text-xl md:text-2xl font-bold text-center leading-relaxed text-white">
          {currentQuestion.text}
        </h1>

        {/* Options */}
        <div className="w-full flex flex-col gap-3">
          {currentQuestion.options.map((option, idx) => {
            // Determine styles based on interaction
            // Since we don't show correct answer immediately unless it's the one we picked (feedback phase),
            // checking "feedback" state is enough.
            // Actually requirement: "Cavab doğru olarsa, cavab yaşıl olacaq... Və ya səhf olarsa, həm cavab qırmızı olacaq"
            // This means we only color the clicked one?
            // "lakin burada cavab seçiləndə doğru cavab göstərilməyəcək" -> Only show feedback for selected.

            const isSelected = answers[currentQuestion.id] === idx
            let btnClass = "w-full p-4 bg-[#242424] hover:bg-[#333] rounded-xl text-left transition-all border border-transparent text-gray-200 font-medium"

            if (feedback && isSelected) {
               if (feedback.type === 'correct') {
                 btnClass = "w-full p-4 bg-green-900/50 border-green-500/50 text-white rounded-xl text-left font-medium shadow-[0_0_15px_rgba(34,197,94,0.3)]"
               } else {
                 btnClass = "w-full p-4 bg-red-900/50 border-red-500/50 text-white rounded-xl text-left font-medium shadow-[0_0_15px_rgba(239,68,68,0.3)]"
               }
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={btnClass}
                disabled={!!feedback}
              >
                {idx + 1}. {option}
              </button>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#242424] border-t border-gray-800 p-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 rounded-lg text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            Geriyə
          </button>

          {/* Pagination */}
          <div className="flex items-center gap-2">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold border transition-colors ${
                  idx === currentIndex
                    ? 'bg-gray-200 text-gray-900 border-gray-200'
                    : idx < currentIndex
                      ? 'bg-[#333] text-gray-500 border-gray-700'
                      : 'bg-transparent text-gray-600 border-gray-700'
                }`}
              >
                {idx + 1}
              </div>
            ))}
          </div>

          {/* Timer */}
          <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold text-xl tabular-nums shadow-lg">
            {formatTime(timeLeft)}
          </div>

        </div>
      </div>
    </div>
  )
}
