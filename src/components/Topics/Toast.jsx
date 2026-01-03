import { CheckCircle, X, AlertCircle, Info } from 'lucide-react'
import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const config = {
    success: {
      icon: CheckCircle,
      bgClass: 'bg-green-50 border-green-200',
      iconClass: 'text-green-600',
      textClass: 'text-green-900'
    },
    error: {
      icon: AlertCircle,
      bgClass: 'bg-red-50 border-red-200',
      iconClass: 'text-red-600',
      textClass: 'text-red-900'
    },
    info: {
      icon: Info,
      bgClass: 'bg-primary-50 border-primary-200',
      iconClass: 'text-primary-600',
      textClass: 'text-primary-900'
    }
  }

  const { icon: Icon, bgClass, iconClass, textClass } = config[type] || config.success

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-[60] animate-slide-up">
      <div className={`flex items-center gap-3 p-4 rounded-xl border shadow-lg ${bgClass}`}>
        <Icon className={`w-5 h-5 flex-shrink-0 ${iconClass}`} />
        <p className={`flex-1 text-sm font-medium ${textClass}`}>{message}</p>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
