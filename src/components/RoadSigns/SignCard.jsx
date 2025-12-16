import { useState } from 'react'
import { ExternalLink, BookOpen, Maximize2 } from 'lucide-react'
import SignDetailModal from './SignDetailModal'

export default function SignCard({ sign, groupName }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageHovered, setIsImageHovered] = useState(false)

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-primary-300 group">
        {/* Sign Image Section */}
        <div 
          className="relative bg-gray-50 p-8 flex items-center justify-center cursor-pointer"
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <div className="relative">
            {/* Image placeholder with aspect ratio */}
            <div className="w-full max-w-[180px] mx-auto">
              <div className={`relative bg-white rounded-lg border-2 shadow-md transition-all duration-200 ${
                isImageHovered ? 'border-primary-400 shadow-lg' : 'border-gray-200'
              }`} style={{ paddingBottom: '100%' }}>
                {/* This would be replaced with actual image */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-gray-300 mb-2">{sign.code}</div>
                    <div className="text-xs text-gray-400">Nişan şəkli</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoom icon on hover */}
            {isImageHovered && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-lg">
                <div className="bg-white rounded-full p-2 shadow-lg">
                  <Maximize2 className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Name and Code */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {sign.code} {sign.name}
            </h3>
            <p className="text-xs text-gray-500">Kateqoriya: {groupName}</p>
          </div>

          {/* Description */}
          <div className="mb-4 space-y-2">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Mənası:</span> {sign.meaning}
            </div>
            {sign.application && (
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Harada tətbiq olunur:</span> {sign.application}
              </div>
            )}
            {sign.specialNote && (
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Xüsusi hallar:</span> {sign.specialNote}
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {sign.examImportance === 'high' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                İmtahan üçün vacib
              </span>
            )}
            {sign.examImportance === 'medium' && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                Orta əhəmiyyətli
              </span>
            )}
            {sign.commonMistakes && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                Çox səhv edilir
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
              <ExternalLink className="w-4 h-4" />
              <span>Bu nişan üzrə sual həll et</span>
            </button>
            <button className="sm:w-auto px-4 py-2.5 border-2 border-gray-300 hover:border-primary-500 text-gray-700 hover:text-primary-700 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Mövzuya bax</span>
            </button>
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
