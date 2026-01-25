import { ArrowRight } from 'lucide-react'

const RoadSignCard = ({ sign, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center text-center cursor-pointer transition-all hover:shadow-lg hover:border-primary-200 hover:-translate-y-1 group relative overflow-hidden h-full"
    >
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-30 transition-opacity" />

      {/* Image */}
      <div className="h-32 flex items-center justify-center mb-4 w-full relative z-10">
        <img
          src={sign.image || '/placeholder-sign.png'}
          alt={sign.name}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Crect fill="%23f3f4f6" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%239ca3af" text-anchor="middle" dominant-baseline="middle"%3ENişan%3C/text%3E%3C/svg%3E'
          }}
        />
      </div>

      {/* Info */}
      <div className="w-full relative z-10 flex flex-col items-center flex-1">
        <span className="inline-block font-bold text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-600 mb-2 group-hover:bg-primary-100 group-hover:text-primary-700 transition-colors">
          {sign.code}
        </span>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] flex items-center justify-center group-hover:text-primary-700 transition-colors">
          {sign.name}
        </h3>

        {/* Spacer to push hint to bottom if needed, though flex-col handles it */}
        <div className="flex-1" />

        {/* Action Hint */}
        <div className="mt-3 text-xs font-medium text-gray-400 flex items-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          Ətraflı <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  )
}

export default RoadSignCard
