import { Play, ChevronRight } from 'lucide-react'

export default function PenaltyCard({ penalty, onVideoClick }) {
  return (
    <div className="bg-white rounded-2xl p-4 hover:shadow-soft-md transition-smooth shadow-soft">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <penalty.icon className="w-5 h-5 text-primary-600" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-neutral-900 text-sm mb-1 leading-tight">
            {penalty.title}
          </h3>
          <p className="text-xs text-neutral-500 font-medium">
            {penalty.fineRange}
          </p>
        </div>
      </div>

      {/* Modern Video Preview */}
      {penalty.hasVideo && (
        <button
          onClick={() => onVideoClick(penalty)}
          className="w-full aspect-video bg-neutral-100 rounded-xl overflow-hidden relative group hover:bg-neutral-200 transition-smooth"
        >
          {penalty.thumbnail ? (
            <img src={penalty.thumbnail} alt={penalty.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-soft-lg group-hover:scale-110 transition-smooth">
                <Play className="w-6 h-6 text-primary-600 fill-primary-600" />
              </div>
            </div>
          )}
          
          {/* Video metadata overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center justify-between text-white text-xs">
              <span className="font-medium">{penalty.videoDuration}</span>
              <span className="glass-effect-dark px-2 py-1 rounded-lg font-semibold">AZ</span>
            </div>
          </div>
        </button>
      )}

      {/* Modern Details button */}
      <button className="w-full mt-3 flex items-center justify-between px-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-smooth">
        <span>Ətraflı</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
