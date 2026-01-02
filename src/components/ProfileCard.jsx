import { Award, MapPin, ChevronRight, Trophy } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6 relative overflow-hidden group hover:shadow-soft transition-all duration-300">
      
      {/* Soft Background Accent */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-50 to-primary-100/50"></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-sm">
                <div className="w-full h-full rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden relative">
                     {/* Placeholder Avatar */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300"></div>
                    <span className="relative text-2xl font-bold text-gray-500">TQ</span>
                </div>
            </div>
            
            <button className="bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-900 p-2 rounded-xl border border-gray-100 shadow-sm transition-all">
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>

        <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Tural Qarayev</h3>
            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Test Academy</span>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100/50">
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">Tamamlanıb</div>
            </div>
            <div className="bg-gray-50 rounded-2xl p-3 border border-gray-100/50">
                <div className="text-2xl font-bold text-gray-400">20</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">Qalır</div>
            </div>
        </div>

        {/* CTA */}
        <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-200 shadow-sm shadow-primary-500/20 hover:shadow-primary-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 group/btn">
            <Award className="w-5 h-5" />
            <span>Şəhadətnamə</span>
        </button>
      </div>
    </div>
  )
}
