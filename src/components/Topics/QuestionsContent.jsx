import { Check, Circle, HelpCircle } from 'lucide-react'
import { useState } from 'react'

export default function QuestionsContent() {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const question = {
    id: 1,
    text: 'Aşağıdakılardan hansı yol nişanı sürücüyə üstünlük verir?',
    image: null,
    options: [
      { id: 'a', text: 'Qadağan edən nişan' },
      { id: 'b', text: 'Məcburi nişan' },
      { id: 'c', text: 'Üstünlük nişanı', isCorrect: true },
      { id: 'd', text: 'Xəbərdarlıq nişanı' }
    ]
  }

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsSubmitted(true)
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    setIsSubmitted(false)
  }

  const getOptionStyle = (option) => {
    if (!isSubmitted) {
      return selectedAnswer === option.id
        ? 'border-primary-500 bg-primary-50'
        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
    }
    
    if (option.isCorrect) {
      return 'border-accent-500 bg-accent-50'
    }
    
    if (selectedAnswer === option.id && !option.isCorrect) {
      return 'border-red-500 bg-red-50'
    }
    
    return 'border-slate-200 opacity-60'
  }

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Question Card */}
      <div className="card p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <HelpCircle className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <span className="text-sm font-medium text-primary-600 mb-2 block">Sual 1 / 10</span>
            <h2 className="text-lg font-semibold text-slate-900 leading-relaxed">
              {question.text}
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => !isSubmitted && setSelectedAnswer(option.id)}
              disabled={isSubmitted}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${getOptionStyle(option)}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-colors ${
                selectedAnswer === option.id
                  ? 'border-primary-500 bg-primary-500 text-white'
                  : 'border-slate-300 text-slate-400'
              }`}>
                {isSubmitted && option.isCorrect ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <span className="text-sm font-semibold uppercase">{option.id}</span>
                )}
              </div>
              <span className={`font-medium ${
                isSubmitted && option.isCorrect ? 'text-accent-700' : 'text-slate-700'
              }`}>
                {option.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === 0 ? 'bg-primary-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
        
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cavabı yoxla
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="btn-primary"
          >
            Növbəti sual
          </button>
        )}
      </div>

      {/* Result Message */}
      {isSubmitted && (
        <div className={`mt-6 p-4 rounded-2xl ${
          question.options.find(o => o.id === selectedAnswer)?.isCorrect
            ? 'bg-accent-50 border border-accent-200'
            : 'bg-red-50 border border-red-200'
        }`}>
          <p className={`font-medium ${
            question.options.find(o => o.id === selectedAnswer)?.isCorrect
              ? 'text-accent-700'
              : 'text-red-700'
          }`}>
            {question.options.find(o => o.id === selectedAnswer)?.isCorrect
              ? '✓ Doğru cavab!'
              : '✕ Səhv cavab. Düzgün cavab: Üstünlük nişanı'
            }
          </p>
        </div>
      )}
    </div>
  )
}
