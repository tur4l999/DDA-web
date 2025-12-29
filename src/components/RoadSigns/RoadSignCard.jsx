import { useState } from 'react'
import { ChevronDown, ChevronUp, Info } from 'lucide-react'
import RoadSignModal from './RoadSignModal'

export default function RoadSignCard({ sign }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="card-interactive p-5">
        <div className="flex items-start gap-4">
          {/* Sign Image */}
          <div className="w-20 h-20 bg-surface-100 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden">
            {sign.image ? (
              <img 
                src={sign.image} 
                alt={sign.name}
                className="w-full h-full object-contain p-2"
              />
            ) : (
              <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center">
                <span className="text-slate-400 text-xs font-medium">{sign.code}</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">
                  {sign.code}
                </span>
                <h3 className="text-base font-semibold text-slate-900 mt-1.5 leading-snug">
                  {sign.name}
                </h3>
              </div>
              
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors flex-shrink-0"
                title="Ətraflı bax"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>

            {/* Short Description */}
            <p className={`text-sm text-slate-600 mt-2 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
              {sign.description}
            </p>

            {/* Expand Button */}
            {sign.description && sign.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 mt-2 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <span>Gizlət</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Daha çox</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <RoadSignModal
        sign={sign}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
