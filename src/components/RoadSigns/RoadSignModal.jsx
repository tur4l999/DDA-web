import { X, AlertCircle } from 'lucide-react'

const RoadSignModal = ({ sign, categoryName, isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {sign.code} {sign.name}
            </h2>
            {categoryName && (
              <p className="text-sm text-gray-600 mt-1">
                {categoryName}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Section */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
              <img
                src={sign.image || '/placeholder-sign.png'}
                alt={sign.name}
                className="w-full max-w-sm h-64 object-contain mx-auto"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3ENişan%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary-600" />
                Mənası
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {sign.meaning}
              </p>
            </div>

            {sign.application && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Harada tətbiq olunur
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {sign.application}
                </p>
              </div>
            )}

            {sign.specialCases && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Xüsusi hallar
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {sign.specialCases}
                </p>
              </div>
            )}

            {sign.detailedDescription && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Ətraflı məlumat
                </h3>
                <div className="text-gray-700 leading-relaxed space-y-2">
                  {sign.detailedDescription.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadSignModal
