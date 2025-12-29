import { useState } from 'react'
import { X, Send, User, Clock, CheckCircle, MessageCircle } from 'lucide-react'

export default function QuestionThreadModal({ isOpen, onClose, question, onReply }) {
  const [reply, setReply] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen || !question) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reply.trim()) return

    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 500))

    onReply(question.id, {
      id: Date.now(),
      content: reply.trim(),
      author: 'Tural Qarayev',
      isTeacher: false,
      createdAt: new Date()
    })

    setReply('')
    setIsSubmitting(false)
  }

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toLocaleDateString('az-AZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-soft-xl max-w-2xl w-full max-h-[80vh] flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Sual müzakirəsi</h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                <span>{formatDate(question.createdAt)}</span>
                {question.status === 'answered' && (
                  <span className="flex items-center gap-1 text-accent-600">
                    <CheckCircle className="w-3 h-3" />
                    Cavablandı
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
          {/* Original Question */}
          <div className="bg-primary-50 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-900">Siz</span>
            </div>
            <p className="text-slate-700 leading-relaxed">{question.question}</p>
          </div>

          {/* Replies */}
          {question.replies?.map(reply => (
            <div
              key={reply.id}
              className={`rounded-2xl p-4 ${
                reply.isTeacher ? 'bg-accent-50' : 'bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  reply.isTeacher ? 'bg-accent-600' : 'bg-slate-400'
                }`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-900">
                  {reply.author}
                  {reply.isTeacher && (
                    <span className="ml-1 text-xs text-accent-600">(Müəllim)</span>
                  )}
                </span>
              </div>
              <p className="text-slate-700 leading-relaxed">{reply.content}</p>
            </div>
          ))}
        </div>

        {/* Reply Input */}
        <div className="p-4 border-t border-slate-100 flex-shrink-0">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Cavab yazın..."
              className="input py-2"
            />
            <button
              type="submit"
              disabled={!reply.trim() || isSubmitting}
              className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
