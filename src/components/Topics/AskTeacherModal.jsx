import { useState } from 'react'
import { X, Send, MessageCircle } from 'lucide-react'

export default function AskTeacherModal({ isOpen, onClose, currentTopic, onSubmit }) {
  const [question, setQuestion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    onSubmit({
      id: Date.now(),
      question: question.trim(),
      topic: currentTopic,
      status: 'pending',
      createdAt: new Date(),
      replies: []
    })

    setQuestion('')
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-soft-xl max-w-lg w-full animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Müəllimlə əlaqə</h3>
              <p className="text-xs text-slate-500">{currentTopic?.code}. {currentTopic?.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Sualınızı yazın
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Bu mövzu ilə bağlı sualınızı yazın..."
              className="input min-h-[120px] resize-none"
              rows={4}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Ləğv et
            </button>
            <button
              type="submit"
              disabled={!question.trim() || isSubmitting}
              className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Göndərilir...' : 'Göndər'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
