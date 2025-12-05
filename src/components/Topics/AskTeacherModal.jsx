import { X, Paperclip, Send, CheckCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

export default function AskTeacherModal({ isOpen, onClose, currentTopic, onSubmit }) {
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [priority, setPriority] = useState('normal')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const maxLength = 1000
  const remainingChars = maxLength - message.length

  const handleSubmit = async () => {
    if (!message.trim() || isSubmitting) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    const questionData = {
      id: Date.now(),
      topicId: currentTopic.id,
      topicCode: currentTopic.code,
      topicTitle: currentTopic.title,
      message: message.trim(),
      file: file?.name || null,
      priority,
      status: 'waiting',
      createdAt: new Date().toISOString(),
      replies: []
    }

    onSubmit?.(questionData)

    setIsSubmitting(false)
    setIsSuccess(true)

    // Show success state for 1.5s then close
    setTimeout(() => {
      setIsSuccess(false)
      setMessage('')
      setFile(null)
      setPriority('normal')
      onClose()
    }, 1500)
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={isSuccess ? null : onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <div 
          className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl w-full sm:max-w-[580px] pointer-events-auto max-h-[90vh] sm:max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {isSuccess ? (
            // Success State
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sualınız göndərildi</h3>
              <p className="text-sm text-gray-600 text-center">Müəllim tezliklə cavab verəcək</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Müəllimə sual ver</h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Mövzu: <span className="font-medium text-gray-900">{currentTopic.code} · {currentTopic.title}</span>
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {/* Message Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Sual <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value.slice(0, maxLength))}
                    placeholder="Sualınızı yazın…"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007A3A] focus:border-transparent resize-none text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs ${remainingChars < 100 ? 'text-orange-600' : 'text-gray-500'}`}>
                      {remainingChars} simvol qalıb
                    </span>
                  </div>
                </div>

                {/* File Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Əlavə fayl (opsional)
                  </label>
                  {file ? (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <Paperclip className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 flex-1 truncate">{file.name}</span>
                      <button
                        onClick={removeFile}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center gap-3 p-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
                      <Paperclip className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-600">Şəkil əlavə et</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Prioritet
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPriority('normal')}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
                        priority === 'normal'
                          ? 'bg-[#007A3A]/10 border-[#007A3A] text-[#007A3A]'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Adi
                    </button>
                    <button
                      onClick={() => setPriority('urgent')}
                      className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg border-2 transition-all ${
                        priority === 'urgent'
                          ? 'bg-orange-50 border-orange-500 text-orange-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Təcili
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3 px-6 py-5 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ləğv et
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!message.trim() || isSubmitting}
                  className="flex-1 px-4 py-3 bg-[#007A3A] hover:bg-[#005A2A] text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#007A3A] flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Göndərilir...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Göndər</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
