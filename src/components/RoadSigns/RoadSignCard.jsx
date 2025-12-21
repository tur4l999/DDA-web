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

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Content Section - Word Document Style */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Title & Category */}
          <div className="border-b border-gray-200 pb-4">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              {sign.code} {sign.name}
            </h3>
            <p className="text-sm text-gray-600">
              Kateqoriya: {categoryNames[sign.category]}
            </p>
          </div>

          {/* Image Section */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 flex items-center justify-center">
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
                  className="w-full h-48 lg:h-56 object-contain"
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

          {/* Description - Word Document Style */}
          <div className="space-y-4 text-base text-gray-800 leading-relaxed">
            <div className="space-y-2">
              <h4 className="font-bold text-gray-900 text-lg">Mənası:</h4>
              <p className="pl-4">{sign.meaning}</p>
            </div>
            
            {sign.application && (
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-lg">Harada tətbiq olunur:</h4>
                <p className="pl-4">{sign.application}</p>
              </div>
            )}
            
            {sign.specialCases && (
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-lg">Xüsusi hallar:</h4>
                <p className="pl-4">{sign.specialCases}</p>
              </div>
            )}

            {sign.detailedDescription && (
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-lg">Ətraflı məlumat:</h4>
                <div className="pl-4 space-y-2">
                  {sign.detailedDescription.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tags - Only common mistake */}
          {sign.commonMistake && (
            <div className="pt-4 border-t border-gray-200">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-orange-100 text-orange-700 border border-orange-200">
                ⚠️ Tez-tez səhv edilən nişan
              </span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors shadow-sm hover:shadow-md"
            >
              <FileQuestion className="w-5 h-5" />
              <span>Bu nişan üzrə sual həll et</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>Mövzuya bax</span>
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
