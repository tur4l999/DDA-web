import { X, Send, Clock, CheckCircle2, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function QuestionThreadModal({ isOpen, onClose, question, onReply }) {
  const [replyMessage, setReplyMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReply = async () => {
    if (!replyMessage.trim() || isSubmitting) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))

    onReply?.(question.id, {
      id: Date.now(),
      author: 'user',
      message: replyMessage.trim(),
      createdAt: new Date().toISOString()
    })

    setReplyMessage('')
    setIsSubmitting(false)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'İndi'
    if (diffInHours < 24) return `${diffInHours} saat əvvəl`
    
    return date.toLocaleDateString('az-AZ', { 
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusConfig = (status) => {
    const configs = {
      waiting: {
        label: 'Gözləyir',
        icon: Clock,
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
      },
      answered: {
        label: 'Cavablandı',
        icon: CheckCircle2,
        className: 'bg-green-50 text-green-700 border-green-200'
      },
      closed: {
        label: 'Bağlandı',
        icon: CheckCircle2,
        className: 'bg-gray-100 text-gray-600 border-gray-200'
      }
    }
    return configs[status] || configs.waiting
  }

  if (!isOpen || !question) return null

  const statusConfig = getStatusConfig(question.status)
  const StatusIcon = statusConfig.icon

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <div 
          className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-[680px] pointer-events-auto max-h-[90vh] sm:max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between px-6 py-5 border-b border-gray-200">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-semibold text-gray-900">Sual-cavab</h2>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium ${statusConfig.className}`}>
                  <StatusIcon className="w-3.5 h-3.5" />
                  <span>{statusConfig.label}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Mövzu: <span className="font-medium text-gray-900">{question.topicCode} · {question.topicTitle}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Thread */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
            {/* User Question */}
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-[#007A3A] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
                T
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-sm text-gray-900 whitespace-pre-wrap">{question.message}</p>
                  {question.file && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MessageCircle className="w-4 h-4" />
                        <span>Fayl: {question.file}</span>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1.5 ml-1">{formatDate(question.createdAt)}</p>
              </div>
            </div>

            {/* Replies */}
            {question.replies?.map((reply) => (
              <div key={reply.id} className={`flex gap-3 ${reply.author === 'teacher' ? '' : 'pl-11'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold ${
                  reply.author === 'teacher'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-[#007A3A] text-white'
                }`}>
                  {reply.author === 'teacher' ? 'M' : 'T'}
                </div>
                <div className="flex-1">
                  <div className={`border rounded-2xl p-4 ${
                    reply.author === 'teacher'
                      ? 'bg-blue-50 border-blue-200 rounded-tl-sm'
                      : 'bg-gray-50 border-gray-200 rounded-tl-sm'
                  }`}>
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{reply.message}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5 ml-1">{formatDate(reply.createdAt)}</p>
                </div>
              </div>
            ))}

            {/* Empty replies state */}
            {(!question.replies || question.replies.length === 0) && (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Müəllim cavabı gözlənilir</p>
                <p className="text-xs text-gray-500 mt-1">Cavab verildikdə bildiriş alacaqsınız</p>
              </div>
            )}
          </div>

          {/* Reply Input */}
          {question.status !== 'closed' && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleReply()}
                  placeholder="Cavab yazın…"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007A3A] focus:border-transparent text-sm"
                />
                <button
                  onClick={handleReply}
                  disabled={!replyMessage.trim() || isSubmitting}
                  className="px-5 py-3 bg-[#007A3A] hover:bg-[#005A2A] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#007A3A] flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
