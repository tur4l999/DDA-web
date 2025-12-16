import { X } from 'lucide-react'
import { useEffect } from 'react'

export default function SignDetailModal({ sign, groupName, onClose }) {
  // Prevent scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {sign.code} {sign.name}
            </h2>
            <p className="text-sm text-gray-500">Kateqoriya: {groupName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Large Image */}
          <div className="bg-gray-50 rounded-xl p-8 mb-6 flex items-center justify-center">
            <div className="w-full max-w-[300px]">
              <div className="relative bg-white rounded-lg border-2 border-gray-200 shadow-lg" style={{ paddingBottom: '100%' }}>
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="text-8xl font-bold text-gray-300 mb-3">{sign.code}</div>
                    <div className="text-sm text-gray-400">Nişan şəkli (böyüdülmüş)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Mənası:</h3>
              <p className="text-gray-700 leading-relaxed">{sign.meaning}</p>
            </div>

            {sign.application && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Harada tətbiq olunur:</h3>
                <p className="text-gray-700 leading-relaxed">{sign.application}</p>
              </div>
            )}

            {sign.specialNote && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Xüsusi hallar:</h3>
                <p className="text-gray-700 leading-relaxed">{sign.specialNote}</p>
              </div>
            )}

            {sign.additionalInfo && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Əlavə məlumat:</h3>
                <p className="text-gray-700 leading-relaxed">{sign.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
