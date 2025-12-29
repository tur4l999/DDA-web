import { useEffect } from 'react'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

/**
 * Toast Notification Component
 * 
 * Variants: success, error, warning, info
 */
export default function Toast({ 
  message, 
  variant = 'success',
  duration = 3000,
  onClose,
  className = '',
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const variants = {
    success: {
      bg: 'bg-success-50 border-success-200',
      text: 'text-success-700',
      icon: CheckCircle,
    },
    error: {
      bg: 'bg-error-50 border-error-200',
      text: 'text-error-700',
      icon: XCircle,
    },
    warning: {
      bg: 'bg-warning-50 border-warning-200',
      text: 'text-warning-700',
      icon: AlertCircle,
    },
    info: {
      bg: 'bg-info-50 border-info-200',
      text: 'text-info-700',
      icon: Info,
    },
  }

  const config = variants[variant]
  const Icon = config.icon

  return (
    <div 
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-toast flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-up ${config.bg} ${className}`}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 ${config.text}`} />
      <span className={`text-sm font-medium ${config.text}`}>{message}</span>
      <button
        onClick={onClose}
        className={`p-1 -m-1 ml-2 rounded-lg hover:bg-black/5 transition-colors ${config.text}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
