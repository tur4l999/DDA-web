import { useState } from 'react'
import { ZoomIn, Info } from 'lucide-react'
import RoadSignModal from './RoadSignModal'

const RoadSignCard = ({ sign }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categoryNames = {
    warning: 'Xəbərdarlıq',
    priority: 'Üstünlük',
    prohibitory: 'Qadağan',
    mandatory: 'Məcburi',
    information: 'İnformasiya',
    service: 'Xidmət',
    additional: 'Əlavə'
  }

  return (
    <>
      <div 
        className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-primary-200 transition-all cursor-pointer group flex flex-col md:flex-row items-center md:items-start p-4 gap-4 h-full"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Section */}
        <div className="w-24 h-24 flex-shrink-0 bg-slate-50 rounded-lg flex items-center justify-center p-2 border border-slate-100 group-hover:bg-white transition-colors">
            <img
              src={sign.image || '/placeholder-sign.png'}
              alt={sign.name}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3ENişan%3C/text%3E%3C/svg%3E'
              }}
            />
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 text-center md:text-left">
           <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="text-xs font-bold text-slate-400">{sign.code}</span>
              <span className="text-[10px] uppercase tracking-wide text-primary-600 bg-primary-50 px-1.5 py-0.5 rounded-full font-bold">
                 {categoryNames[sign.category]}
              </span>
           </div>
           
           <h3 className="font-bold text-slate-900 text-sm md:text-base leading-tight mb-2 line-clamp-2">
              {sign.name}
           </h3>
           
           <p className="text-xs text-slate-500 line-clamp-3">
              {sign.meaning}
           </p>
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
