import { Award, MapPin, ChevronRight, Trophy } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100/50 p-5 relative overflow-hidden group hover:shadow-card transition-all duration-300">
      
      {/* Soft Background Accent */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-primary-50/80 via-primary-50/50 to-transparent"></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-xl bg-white p-1 shadow-sm">
                <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden relative">
                     {/* Placeholder Avatar */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    <span className="relative text-xl font-bold text-gray-500">TQ</span>
                </div>
            </div>
            
            <button className="bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-900 p-2 rounded-lg border border-gray-100 shadow-sm transition-all hover:scale-105 active:scale-95">
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>

        <div className="mb-5">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Tural Qarayev</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Test Academy</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all group/stat">
                <div className="text-xl font-bold text-gray-900 group-hover/stat:text-primary-600 transition-colors">4</div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-1">Tamamlanıb</div>
            </div>
            <div className="bg-gray-50/80 rounded-xl p-3 border border-gray-100/50 hover:bg-white hover:shadow-sm transition-all group/stat">
                <div className="text-xl font-bold text-gray-400 group-hover/stat:text-gray-600 transition-colors">20</div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mt-1">Qalır</div>
            </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 active:translate-y-0 active:shadow-none flex items-center justify-center gap-2 group/btn text-sm">
            <Award className="w-4 h-4" />
            <span>Şəhadətnamə</span>
        </button>
      </div>
    </div>
  )
}
