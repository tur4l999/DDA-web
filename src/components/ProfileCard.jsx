import { Award, MapPin, User } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-soft-lg border border-slate-200/60 overflow-hidden">
      {/* Header with subtle gradient */}
      <div className="gradient-primary px-6 py-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center ring-2 ring-white/30 shadow-soft">
            <User className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">Tural Qarayev</h3>
            <div className="flex items-center gap-1.5 text-white/80 text-sm mt-0.5">
              <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Test Academy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Certificate Button */}
        <button className="w-full btn-primary py-3 text-sm">
          <Award className="w-4 h-4" strokeWidth={2} />
          <span>Şəhadətnamə</span>
        </button>

        {/* Stats */}
        <div className="flex items-center justify-around py-4 bg-surface-50 rounded-2xl">
          <div className="text-center">
            <span className="block text-2xl font-bold text-slate-900">4</span>
            <span className="text-xs text-slate-500 font-medium">Tamamlanmış</span>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-slate-900">20</span>
            <span className="text-xs text-slate-500 font-medium">Qalır</span>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Ümumi irəliləyiş</span>
            <span className="text-sm font-semibold text-primary-600">17%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
              style={{ width: '17%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
