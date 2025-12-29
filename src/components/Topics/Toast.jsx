import { CheckCircle, AlertCircle, X } from 'lucide-react'

export default function Toast({ message, type = 'success', onClose }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-soft-lg backdrop-blur-xl ${
        type === 'success' 
          ? 'bg-accent-50 text-accent-800 border border-accent-200' 
          : 'bg-red-50 text-red-800 border border-red-200'
      }`}>
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-accent-600" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-600" />
        )}
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
