import { CheckCircle, X } from 'lucide-react'
import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-20 xl:bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-[#007A3A] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 min-w-[280px]">
        <CheckCircle className="w-5 h-5 flex-shrink-0" />
        <span className="font-semibold flex-1">{message}</span>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
