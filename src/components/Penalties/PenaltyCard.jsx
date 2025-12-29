import { Play, Clock } from 'lucide-react'

export default function PenaltyCard({ penalty, onVideoClick }) {
  const Icon = penalty.icon

  return (
    <div className="card-interactive p-5">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-red-500" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-900 mb-1 leading-snug">
            {penalty.title}
          </h3>
          <p className="text-sm font-medium text-primary-600">
            {penalty.fineRange}
          </p>
        </div>
      </div>

      {/* Video Button */}
      {penalty.hasVideo && (
        <button
          onClick={() => onVideoClick(penalty)}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl transition-colors text-sm"
        >
          <Play className="w-4 h-4" />
          <span>Videoya bax</span>
          {penalty.videoDuration && (
            <span className="flex items-center gap-1 text-slate-500 text-xs">
              <Clock className="w-3 h-3" />
              {penalty.videoDuration}
            </span>
          )}
        </button>
      )}
    </div>
  )
}
