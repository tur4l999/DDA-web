import { X } from 'lucide-react'

export default function RoadSignModal({ sign, isOpen, onClose }) {
  if (!isOpen || !sign) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-soft-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg">
              {sign.code}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-2">{sign.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Sign Image */}
        <div className="p-8 bg-surface-50">
          <div className="w-40 h-40 mx-auto bg-white rounded-2xl shadow-soft flex items-center justify-center overflow-hidden">
            {sign.image ? (
              <img 
                src={sign.image} 
                alt={sign.name}
                className="w-full h-full object-contain p-4"
              />
            ) : (
              <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center">
                <span className="text-slate-400 text-lg font-medium">{sign.code}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-slate-800 mb-2">Təsvir</h4>
          <p className="text-sm text-slate-600 leading-relaxed">{sign.description}</p>
          
          {sign.additionalInfo && (
            <div className="mt-4 p-4 bg-primary-50 rounded-xl">
              <h5 className="text-sm font-semibold text-primary-800 mb-1">Əlavə məlumat</h5>
              <p className="text-sm text-primary-700">{sign.additionalInfo}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full btn-secondary py-2.5"
          >
            Bağla
          </button>
        </div>
      </div>
    </div>
  )
}
