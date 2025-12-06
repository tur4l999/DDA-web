import { Play, ChevronRight } from 'lucide-react'

export default function PenaltyCard({ penalty, onVideoClick }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md hover:border-[#007A3A] transition-all">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <penalty.icon className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">
            {penalty.title}
          </h3>
          <p className="text-xs text-gray-500">
            {penalty.fineRange}
          </p>
        </div>
      </div>

      {/* Video Preview */}
      {penalty.hasVideo && (
        <button
          onClick={() => onVideoClick(penalty)}
          className="w-full aspect-video bg-gray-100 rounded-xl overflow-hidden relative group hover:bg-gray-200 transition-colors"
        >
          {penalty.thumbnail ? (
            <img src={penalty.thumbnail} alt={penalty.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 text-gray-700 fill-gray-700" />
              </div>
            </div>
          )}
          
          {/* Video metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-medium">{penalty.videoDuration}</span>
              <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded">AZ</span>
            </div>
          </div>
        </button>
      )}

      {/* Details button */}
      <button className="w-full mt-3 flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#007A3A] hover:bg-gray-50 rounded-lg transition-colors">
        <span>Ətraflı</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
