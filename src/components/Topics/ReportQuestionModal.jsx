import React, { useState } from 'react'
import { X, MessageSquareWarning, Send, AlertCircle } from 'lucide-react'

export default function ReportQuestionModal({ isOpen, onClose, questionId, questionText }) {
  const [feedback, setFeedback] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!feedback.trim()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log('Report submitted for question:', questionId, 'Feedback:', feedback)
      setIsSuccess(true)
      setIsSubmitting(false)
      setFeedback('')

      // Close modal after success message
      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 2000)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <MessageSquareWarning className="w-4 h-4 text-red-500" />
            </div>
            <h3 className="font-bold text-gray-900">Səhvlik bildir</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in slide-in-from-bottom-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                <Send className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">Təşəkkür edirik!</h4>
              <p className="text-gray-500">
                Fikriniz qeydə alındı. Tezliklə nəzərdən keçiriləcək.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="flex gap-2 p-3 bg-gray-50 rounded-xl mb-4 border border-gray-100">
                   <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                   <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                     <span className="font-medium text-gray-700 block mb-0.5">Sual:</span>
                     {questionText}
                   </p>
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fikrinizi qeyd edin
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Məsələn: Bu sualın cavab variantlarında yanlışlıq var..."
                  className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none resize-none text-gray-700 placeholder:text-gray-400 transition-all"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-xl transition-colors"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  disabled={!feedback.trim() || isSubmitting}
                  className="flex-1 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl shadow-lg shadow-primary-600/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Göndər</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
