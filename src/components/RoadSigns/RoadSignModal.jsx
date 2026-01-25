import { useEffect, useState, useRef } from 'react'
import { X, AlertCircle, ChevronLeft, ChevronRight, Info, SplitSquareHorizontal, Check } from 'lucide-react'

const RoadSignModal = ({ sign, categoryName, allSigns = [], isOpen, onClose }) => {
  const [internalSign, setInternalSign] = useState(sign)
  const [isComparing, setIsComparing] = useState(false)
  const [compareSign, setCompareSign] = useState(null)
  const scrollContainerRef = useRef(null)

  // Sync prop changes
  useEffect(() => {
    setInternalSign(sign)
    // Reset comparison on new open
    if (isOpen) {
        setIsComparing(false)
        setCompareSign(null)
    }
  }, [sign, isOpen])

  // Navigation Logic
  const currentIndex = internalSign && allSigns ? allSigns.findIndex(s => s.id === internalSign.id) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex !== -1 && currentIndex < allSigns.length - 1

  const handlePrev = (e) => {
    e?.stopPropagation()
    if (hasPrev) setInternalSign(allSigns[currentIndex - 1])
  }

  const handleNext = (e) => {
    e?.stopPropagation()
    if (hasNext) setInternalSign(allSigns[currentIndex + 1])
  }

  const handleSignSelect = (selected) => {
      if (isComparing) {
          setCompareSign(selected)
      } else {
          setInternalSign(selected)
      }
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [internalSign, isOpen, currentIndex, allSigns])

  if (!isOpen || !internalSign) return null

  const SignDetailView = ({ data, isCompact = false }) => (
      <div className={`flex flex-col ${isCompact ? 'gap-4' : 'md:flex-row gap-8 md:gap-12'} items-start h-full overflow-y-auto p-6 md:p-8 custom-scrollbar`}>
          {/* Image */}
          <div className={`${isCompact ? 'w-full' : 'w-full md:w-1/3'} flex-shrink-0`}>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8 flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full opacity-50 blur-2xl" />
                <img
                src={data.image || '/placeholder-sign.png'}
                alt={data.name}
                className="w-full h-auto max-h-[250px] object-contain drop-shadow-xl relative z-10"
                />
            </div>
            <div className="mt-4 text-center">
                 <span className="inline-block bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-lg text-sm mb-2">
                   {data.code}
                 </span>
                 <h3 className="font-bold text-gray-900 leading-tight">
                   {data.name}
                 </h3>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-4 w-full">
                <div className="bg-primary-50/50 p-4 rounded-xl border border-primary-100/50">
                    <h4 className="flex items-center gap-2 text-xs font-bold text-primary-700 uppercase tracking-wide mb-1">
                        <AlertCircle className="w-3 h-3" /> Mənası
                    </h4>
                    <p className="text-gray-900 font-medium leading-relaxed">
                        {data.meaning}
                    </p>
                </div>

                {data.detailedDescription && (
                    <div className="text-sm text-gray-600 space-y-2 text-justify">
                        {data.detailedDescription}
                    </div>
                )}

                 {data.application && (
                   <div className="bg-blue-50/30 p-3 rounded-lg border border-blue-100/30">
                     <span className="text-xs font-bold text-blue-700 block mb-1">Tətbiqi</span>
                     <p className="text-xs text-blue-900/80">{data.application}</p>
                   </div>
                 )}

                 {data.specialCases && (
                   <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100/30">
                     <span className="text-xs font-bold text-amber-700 block mb-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Xüsusi hallar
                     </span>
                     <p className="text-xs text-amber-900/80">{data.specialCases}</p>
                   </div>
                 )}
          </div>
      </div>
  )

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" />

      <div
        className="relative w-full max-w-7xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white z-20 shadow-sm">
          <div className="flex items-center gap-3">
             <h2 className="text-base sm:text-lg font-bold text-gray-900 flex items-center gap-2">
               {isComparing ? 'Nişanların müqayisəsi' : (categoryName || 'Nişan haqqında məlumat')}
             </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setIsComparing(!isComparing)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    isComparing
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                  <SplitSquareHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Müqayisə et</span>
              </button>

              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-hidden relative flex flex-col">

          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
             {/* Left Panel (Always Visible) */}
             <div className={`flex-1 overflow-hidden transition-all duration-300 ${isComparing ? 'border-r border-gray-200' : ''}`}>
                 {/* Desktop Nav Buttons (only in single mode) */}
                 {!isComparing && hasPrev && (
                    <button onClick={handlePrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-lg z-10 hidden sm:flex hover:scale-110 transition-transform"><ChevronLeft className="w-6 h-6" /></button>
                 )}
                 {!isComparing && hasNext && (
                    <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-lg z-10 hidden sm:flex hover:scale-110 transition-transform"><ChevronRight className="w-6 h-6" /></button>
                 )}

                 <SignDetailView data={internalSign} isCompact={isComparing} />
             </div>

             {/* Right Panel (Comparison) */}
             {isComparing && (
                 <div className="flex-1 overflow-hidden bg-gray-50/50">
                     {compareSign ? (
                         <div className="relative h-full">
                            <button
                                onClick={() => setCompareSign(null)}
                                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-sm hover:bg-red-50 text-red-500 z-10"
                                title="Sil"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <SignDetailView data={compareSign} isCompact={true} />
                         </div>
                     ) : (
                         <div className="h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center animate-fade-in">
                             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                 <SplitSquareHorizontal className="w-8 h-8 text-gray-300" />
                             </div>
                             <p className="font-medium text-lg text-gray-600">Müqayisə etmək üçün nişan seçin</p>
                             <p className="text-sm mt-2">Aşağıdakı siyahıdan hər hansı bir nişana klikləyin</p>
                         </div>
                     )}
                 </div>
             )}
          </div>

          {/* Footer Selection Strip */}
          <div className="h-24 sm:h-28 bg-white border-t border-gray-200 flex-shrink-0 flex flex-col">
              <div className="px-4 py-1 bg-gray-50 border-b border-gray-100 text-[10px] sm:text-xs font-medium text-gray-500 flex justify-between">
                  <span>{isComparing ? 'Müqayisə ediləcək nişanı seçin' : 'Digər nişanlar'}</span>
                  <span>{allSigns.length} nişan</span>
              </div>
              <div
                ref={scrollContainerRef}
                className="flex-1 flex items-center gap-2 overflow-x-auto px-4 py-2 custom-scrollbar scroll-smooth"
              >
                  {allSigns.map((s) => {
                      const isActive = s.id === internalSign.id
                      const isCompareActive = compareSign?.id === s.id

                      return (
                        <button
                            key={s.id}
                            onClick={() => handleSignSelect(s)}
                            className={`flex-shrink-0 h-14 w-14 sm:h-16 sm:w-16 p-1 rounded-xl border-2 transition-all relative group ${
                                isActive
                                    ? 'border-primary-500 bg-primary-50 shadow-md scale-105'
                                    : isCompareActive
                                        ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                                        : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                            }`}
                        >
                            <img
                                src={s.image}
                                alt={s.name}
                                className="w-full h-full object-contain"
                            />
                            {/* Indicators */}
                            {isActive && !isComparing && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center border border-white">
                                    <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                            )}
                            {isCompareActive && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-white">
                                    <span className="text-[8px] text-white font-bold">2</span>
                                </div>
                            )}
                            {isActive && isComparing && (
                                <div className="absolute -top-1 -left-1 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center border border-white">
                                    <span className="text-[8px] text-white font-bold">1</span>
                                </div>
                            )}

                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-20">
                                {s.code}
                            </div>
                        </button>
                      )
                  })}
              </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RoadSignModal
