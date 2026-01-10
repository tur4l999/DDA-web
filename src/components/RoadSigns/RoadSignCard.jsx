import { useState } from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'

const RoadSignCard = ({ sign }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-white rounded-2xl border transition-all cursor-pointer overflow-hidden ${
        isExpanded
          ? 'border-primary-500 shadow-md ring-1 ring-primary-500'
          : 'border-gray-100 hover:shadow-lg hover:border-primary-200'
      }`}
    >
      <div className="p-4 flex flex-col items-center text-center">
        {/* Image */}
        <div className="h-32 flex items-center justify-center mb-3 w-full relative">
          <img
            src={sign.image || '/placeholder-sign.png'}
            alt={sign.name}
            className={`max-h-full max-w-full object-contain transition-transform duration-300 ${
              isExpanded ? 'scale-105' : 'group-hover:scale-110'
            }`}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3ENişan%3C/text%3E%3C/svg%3E'
            }}
          />
        </div>

        {/* Header Info */}
        <div className="w-full">
          <span className={`inline-block font-bold text-xs px-2 py-1 rounded-md mb-2 transition-colors ${
            isExpanded ? 'bg-primary-100 text-primary-800' : 'bg-primary-50 text-primary-700'
          }`}>
            {sign.code}
          </span>
          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
            {sign.name}
          </h3>
        </div>

        {/* Chevron Indicator */}
        <div className={`mt-2 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-primary-500' : 'text-gray-300'}`} />
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 space-y-3 text-left animate-slide-up border-t border-gray-100 mt-2">
           <div className="pt-3">
             <div className="flex items-start gap-2 text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
               <AlertCircle className="w-4 h-4 text-primary-600" />
               Mənası
             </div>
             <p className="text-sm text-gray-800 leading-relaxed">
               {sign.meaning}
             </p>
           </div>

           {sign.application && (
             <div>
               <div className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                 Harada tətbiq olunur
               </div>
               <p className="text-sm text-gray-600 leading-relaxed">
                 {sign.application}
               </p>
             </div>
           )}

            {sign.specialCases && (
             <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
               <div className="text-xs font-semibold text-yellow-700 mb-1 uppercase tracking-wide">
                 Xüsusi hallar
               </div>
               <p className="text-sm text-yellow-800 leading-relaxed">
                 {sign.specialCases}
               </p>
             </div>
           )}
        </div>
      )}
    </div>
  )
}

export default RoadSignCard
