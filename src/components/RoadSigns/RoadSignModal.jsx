import { X, BookOpen, FileQuestion, AlertCircle } from 'lucide-react'

const RoadSignModal = ({ sign, categoryName, isOpen, onClose }) => {
  if (!isOpen) return null

  const importanceLabels = {
    high: 'Yüksək',
    medium: 'Orta',
    low: 'Aşağı'
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {sign.code} {sign.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {categoryName}
            </p>
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

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                sign.examImportance === 'high'
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : sign.examImportance === 'medium'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}>
                İmtahan üçün vaciblik: {importanceLabels[sign.examImportance]}
              </span>
              {sign.commonMistake && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 text-orange-700 border border-orange-200">
                  Tez-tez səhv edilir
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors shadow-sm hover:shadow-md">
              <FileQuestion className="w-5 h-5" />
              <span>Bu nişan üzrə sual həll et</span>
            </button>
            <button className="sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 transition-colors">
              <BookOpen className="w-5 h-5" />
              <span>Mövzuya bax</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadSignModal
