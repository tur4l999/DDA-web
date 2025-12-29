import { CheckCircle, X } from 'lucide-react'

export default function Toast({ message, onClose }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="flex items-center gap-3 px-4 py-3 bg-slate-800 text-white rounded-xl shadow-soft-lg">
        <CheckCircle className="w-5 h-5 text-accent-400" />
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
