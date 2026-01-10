import { useState } from 'react'
import RoadSignModal from './RoadSignModal'

const RoadSignCard = ({ sign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      <div
        onClick={() => setIsModalOpen(true)}
        className="group bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-lg hover:border-primary-200 transition-all cursor-pointer flex flex-col items-center text-center h-full"
      >
        <div className="h-32 flex items-center justify-center mb-3 w-full relative">
          <img
            src={sign.image || '/placeholder-sign.png'}
            alt={sign.name}
            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3ENişan%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>

        <div className="mt-auto w-full">
          <span className="inline-block text-primary-700 font-bold text-xs bg-primary-50 px-2 py-1 rounded-md mb-2">
            {sign.code}
          </span>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
            {sign.name}
          </h3>
        </div>
      </div>

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
