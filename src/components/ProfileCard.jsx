import { Award, MapPin, ChevronRight, Trophy } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100/50 p-6 relative overflow-hidden group hover:shadow-card transition-all duration-300">
      
      {/* Soft Background Accent */}
      <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-br from-primary-50/80 via-primary-50/50 to-transparent"></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-5">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-white p-1.5 shadow-sm">
                <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden relative">
                     {/* Placeholder Avatar */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    <span className="relative text-2xl font-bold text-gray-500">TQ</span>
                </div>
            </div>
            
            <button className="bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-900 p-2.5 rounded-xl border border-gray-100 shadow-sm transition-all hover:scale-105 active:scale-95">
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Tural Qarayev</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium mt-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>Test Academy</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all group/stat">
                <div className="text-2xl font-bold text-gray-900 group-hover/stat:text-primary-600 transition-colors">4</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">Tamamlanıb</div>
            </div>
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all group/stat">
                <div className="text-2xl font-bold text-gray-400 group-hover/stat:text-gray-600 transition-colors">20</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">Qalır</div>
            </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3.5 px-4 rounded-2xl transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none flex items-center justify-center gap-2 group/btn">
            <Award className="w-5 h-5" />
            <span>Şəhadətnamə</span>
        </button>
      </div>
    </div>
  )
}
