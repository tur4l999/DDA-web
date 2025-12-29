import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

/**
 * Modal Component
 * 
 * Sizes: sm, md, lg, xl, full
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  className = '',
}) {
  // Close on escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-[calc(100vw-2rem)] lg:max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-xl animate-scale-in max-h-[calc(100vh-2rem)] flex flex-col ${className}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between p-5 border-b border-neutral-100">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-neutral-500 mt-1">{description}</p>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 -m-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * Modal Footer - For action buttons
 */
export function ModalFooter({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-end gap-3 pt-5 border-t border-neutral-100 ${className}`}>
      {children}
    </div>
  )
}
