import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'
import { useEffect } from 'react'

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
}

const colors = {
  success: 'text-success-600',
  error: 'text-error-600',
  info: 'text-info-600',
}

const Toast = ({ 
  message, 
  type = 'success',
  duration = 3000,
  onClose 
}) => {
  const Icon = icons[type]

  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <Icon className={`w-5 h-5 flex-shrink-0 ${colors[type]}`} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Toast
