import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
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
      <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
        {/* Modern Content Section */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Modern Title & Category */}
          <div className="pb-4">
            <h3 className="text-xl lg:text-2xl font-semibold text-neutral-900 mb-2">
              {sign.code} {sign.name}
            </h3>
            <p className="text-sm text-neutral-600 font-medium">
              Kateqoriya: {categoryNames[sign.category]}
            </p>
          </div>

          {/* Modern Image Section */}
          <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-2xl p-8 flex items-center justify-center">
            <div 
              className="relative cursor-pointer"
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <div className={`bg-white rounded-2xl shadow-soft-md p-6 transition-smooth ${
                isImageHovered ? 'shadow-soft-lg scale-105' : ''
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
              
              {/* Modern Zoom indicator */}
              <div className={`absolute inset-0 flex items-center justify-center bg-neutral-900 bg-opacity-0 transition-smooth rounded-2xl ${
                isImageHovered ? 'bg-opacity-10' : ''
              }`}>
                {isImageHovered && (
                  <div className="bg-white rounded-full p-3 shadow-soft-lg">
                    <ZoomIn className="w-6 h-6 text-primary-600" strokeWidth={2} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Modern Description with Better Typography */}
          <div className="space-y-5 text-base text-neutral-700 text-educational">
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-900 text-lg">Mənası:</h4>
              <p className="pl-4">{sign.meaning}</p>
            </div>
            
            {sign.application && (
              <div className="space-y-2">
                <h4 className="font-semibold text-neutral-900 text-lg">Harada tətbiq olunur:</h4>
                <p className="pl-4">{sign.application}</p>
              </div>
            )}
            
            {sign.specialCases && (
              <div className="space-y-2">
                <h4 className="font-semibold text-neutral-900 text-lg">Xüsusi hallar:</h4>
                <p className="pl-4">{sign.specialCases}</p>
              </div>
            )}

            {sign.detailedDescription && (
              <div className="space-y-2">
                <h4 className="font-semibold text-neutral-900 text-lg">Ətraflı məlumat:</h4>
                <div className="pl-4 space-y-3">
                  {sign.detailedDescription.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
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
