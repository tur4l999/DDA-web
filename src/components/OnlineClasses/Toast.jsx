import { X, Check } from 'lucide-react'
import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="fixed bottom-6 right-6 z-[70] animate-slide-up">
      <div className="bg-gray-900/90 backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 pr-10 relative">
        <div className="bg-green-500 rounded-full p-1">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </div>
        <span className="font-semibold">{message}</span>
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
