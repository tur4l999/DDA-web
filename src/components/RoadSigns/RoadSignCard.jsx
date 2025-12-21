import { useState } from 'react'
import { BookOpen, FileQuestion, ZoomIn } from 'lucide-react'
import RoadSignModal from './RoadSignModal'

const RoadSignCard = ({ sign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  const categoryNames = {
    warning: 'Xəbərdarlıq nişanları',
    priority: 'Üstünlük nişanları',
    prohibitory: 'Qadağan nişanları',
    mandatory: 'Məcburi nişanlar',
    information: 'İnformasiya nişanları',
    service: 'Xidmət nişanları',
    additional: 'Əlavə nişanlar'
  }

  const importanceColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-green-100 text-green-700 border-green-200'
  }

  const importanceLabels = {
    high: 'Yüksək',
    medium: 'Orta',
    low: 'Aşağı'
  }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-300 group">
        {/* Image Section */}
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center min-h-[200px]">
          <div 
            className="relative cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <div className={`bg-white rounded-xl shadow-md border-2 border-gray-200 p-6 transition-all duration-300 ${
              isImageHovered ? 'border-primary-400 shadow-xl scale-105' : ''
            }`}>
              <img
                src={sign.image || '/placeholder-sign.png'}
                alt={sign.name}
                className="w-full h-40 object-contain"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3ENişan%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
            
            {/* Zoom indicator */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 rounded-xl ${
              isImageHovered ? 'bg-opacity-20' : ''
            }`}>
              {isImageHovered && (
                <div className="bg-white rounded-full p-3 shadow-lg">
                  <ZoomIn className="w-6 h-6 text-primary-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title & Category */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {sign.code} {sign.name}
            </h3>
            <p className="text-xs text-gray-500">
              Kateqoriya: {categoryNames[sign.category]}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <div>
              <span className="font-semibold text-gray-900">Mənası:</span>{' '}
              {sign.meaning}
            </div>
            {sign.application && (
              <div>
                <span className="font-semibold text-gray-900">Harada tətbiq olunur:</span>{' '}
                {sign.application}
              </div>
            )}
            {sign.specialCases && (
              <div>
                <span className="font-semibold text-gray-900">Xüsusi hallar:</span>{' '}
                {sign.specialCases}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
              importanceColors[sign.examImportance]
            }`}>
              İmtahan: {importanceLabels[sign.examImportance]}
            </span>
            {sign.commonMistake && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                Çox səhv edilir
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-xl transition-colors shadow-sm hover:shadow-md"
            >
              <FileQuestion className="w-4 h-4" />
              <span className="text-sm">Bu nişan üzrə sual həll et</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="sm:w-auto flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl border border-gray-200 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">Mövzuya bax</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <RoadSignModal
        sign={sign}
        categoryName={categoryNames[sign.category]}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default RoadSignCard
