import { useEffect, useCallback } from 'react'
import { X } from 'lucide-react'

/**
 * Drawer Component - Mobile-friendly slide-in panel
 * 
 * Position: left, right, bottom
 */
export default function Drawer({ 
  isOpen, 
  onClose, 
  title,
  children,
  position = 'right',
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

  const sizes = {
    sm: 'max-w-xs',
    md: 'max-w-sm',
    lg: 'max-w-md',
    xl: 'max-w-lg',
    full: 'max-w-full',
  }

  const positionStyles = {
    left: `left-0 top-0 h-full w-full ${sizes[size]} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
    right: `right-0 top-0 h-full w-full ${sizes[size]} ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
    bottom: `bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl ${isOpen ? 'translate-y-0' : 'translate-y-full'}`,
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-modal-backdrop bg-neutral-900/40 transition-opacity duration-200 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed z-modal bg-white shadow-xl flex flex-col transition-transform duration-300 ease-out ${positionStyles[position]} ${className}`}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            {title && (
              <h2 className="text-lg font-semibold text-neutral-800">{title}</h2>
            )}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 -m-2 ml-auto text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        
        {/* Handle for bottom drawer */}
        {position === 'bottom' && (
          <div className="flex justify-center py-2">
            <div className="w-10 h-1 bg-neutral-200 rounded-full" />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  )
}
