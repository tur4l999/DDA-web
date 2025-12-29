import { useState } from 'react'
import { ZoomIn } from 'lucide-react'
import RoadSignModal from './RoadSignModal'
import Badge from '../ui/Badge'

const categoryConfig = {
  warning: { name: 'Xəbərdarlıq', variant: 'warning' },
  priority: { name: 'Üstünlük', variant: 'info' },
  prohibitory: { name: 'Qadağan', variant: 'error' },
  mandatory: { name: 'Məcburi', variant: 'info' },
  information: { name: 'İnformasiya', variant: 'success' },
  service: { name: 'Xidmət', variant: 'primary' },
  additional: { name: 'Əlavə', variant: 'neutral' }
}

const RoadSignCard = ({ sign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  const category = categoryConfig[sign.category] || { name: 'Digər', variant: 'neutral' }

  return (
    <>
      <div className="bg-white rounded-2xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow duration-200">
        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <Badge variant={category.variant} size="sm" className="mb-2">
                {category.name}
              </Badge>
              <h3 className="font-semibold text-neutral-800 leading-snug">
                <span className="text-primary-600">{sign.code}</span>{' '}
                {sign.name}
              </h3>
            </div>
          </div>

          {/* Content Layout - Image + Description */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Image */}
            <div 
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              <div className={`relative bg-neutral-50 rounded-xl p-3 border border-neutral-100 transition-all duration-200 ${
                isImageHovered ? 'border-primary-200 shadow-md' : ''
              }`}>
                <img
                  src={sign.image || '/placeholder-sign.png'}
                  alt={sign.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%23f1f5f9" width="100" height="100" rx="8"/%3E%3Ctext x="50%25" y="50%25" font-family="system-ui" font-size="12" fill="%2394a3b8" text-anchor="middle" dominant-baseline="middle"%3ENişan%3C/text%3E%3C/svg%3E'
                  }}
                />
                
                {/* Zoom icon on hover */}
                <div className={`absolute inset-0 flex items-center justify-center bg-neutral-900/0 rounded-xl transition-all ${
                  isImageHovered ? 'bg-neutral-900/10' : ''
                }`}>
                  {isImageHovered && (
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <ZoomIn className="w-4 h-4 text-primary-600" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                {sign.meaning || sign.description}
              </p>
              
              {sign.application && (
                <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
                  <span className="font-medium text-neutral-700">Tətbiqi: </span>
                  {sign.application}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <RoadSignModal
        sign={sign}
        categoryName={category.name}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

export default RoadSignCard
