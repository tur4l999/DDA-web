import { Award } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl shadow-lg p-4 text-white border border-white/20 overflow-hidden relative">
      {/* Background Illustration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg className="absolute right-0 top-0 w-32 h-32" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="60" r="25" fill="white"/>
          <path d="M60 140C60 110 75 100 100 100C125 100 140 110 140 140V180H60V140Z" fill="white"/>
          <circle cx="150" cy="120" r="30" stroke="white" strokeWidth="4" fill="none"/>
          <path d="M140 120L150 110L160 120L150 130L140 120Z" fill="white"/>
        </svg>
      </div>
      
      <div className="relative flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center ring-2 ring-white/30 shadow-lg flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate">Tural Qarayev</h3>
          <p className="text-xs text-green-100">Test Academy</p>
          <div className="flex items-center gap-3 mt-1 text-xs">
            <div>
              <span className="font-bold">4</span>
              <span className="text-green-100 ml-1">Tamamlanmış</span>
            </div>
            <span className="text-white/30">•</span>
            <div>
              <span className="font-bold">20</span>
              <span className="text-green-100 ml-1">Qalır</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-white hover:bg-gray-50 text-primary-700 font-semibold px-3 py-2 rounded-lg transition-all duration-200 text-xs shadow-lg hover:shadow-xl flex items-center gap-1 flex-shrink-0">
          <Award className="w-3.5 h-3.5" strokeWidth={2} />
          <span className="hidden sm:inline">Şəhadətnamə</span>
        </button>
      </div>
    </div>
  )
}
