import { useState } from 'react'
import { Maximize2 } from 'lucide-react'
import SignDetailModal from './SignDetailModal'

export default function SignListItem({ sign, groupName }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  return (
    <>
      <div className="bg-white border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
        <div className="flex gap-6 p-6">
          {/* Left: Sign Image */}
          <div 
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
          >
            <div className="relative">
              <div className="w-32 h-32 bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center justify-center transition-all duration-200"
                style={{ 
                  borderColor: isImageHovered ? '#22c55e' : '#E5E7EB'
                }}
              >
                {/* Placeholder - replace with actual image */}
                <div className="text-center p-4">
                  <div className="text-3xl font-bold text-gray-300 mb-1">{sign.code}</div>
                  <div className="text-xs text-gray-400">Şəkil</div>
                </div>
              </div>
              
              {/* Zoom icon on hover */}
              {isImageHovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <Maximize2 className="w-4 h-4 text-primary-600" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Sign Info */}
          <div className="flex-1 min-w-0">
            {/* Code and Name */}
            <div className="mb-3">
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {sign.code}. {sign.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500">{groupName}</span>
                {sign.groupId && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700">
                    Qrup {sign.groupId}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2.5 text-sm text-gray-700 leading-relaxed">
              <div>
                <span className="font-semibold text-gray-900">Mənası:</span> {sign.meaning}
              </div>
              {sign.application && (
                <div>
                  <span className="font-semibold text-gray-900">Harada tətbiq olunur:</span> {sign.application}
                </div>
              )}
              {sign.specialNote && (
                <div>
                  <span className="font-semibold text-gray-900">Xüsusi hallar:</span> {sign.specialNote}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for enlarged view */}
      {isModalOpen && (
        <SignDetailModal
          sign={sign}
          groupName={groupName}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
