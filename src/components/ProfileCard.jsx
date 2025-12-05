import { Award, MapPin } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl shadow-xl p-6 text-white border border-white/20 overflow-hidden relative">
      {/* Background Illustration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <svg className="absolute right-0 top-0 w-48 h-48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Person silhouette */}
          <circle cx="100" cy="60" r="25" fill="white"/>
          <path d="M60 140C60 110 75 100 100 100C125 100 140 110 140 140V180H60V140Z" fill="white"/>
          {/* Road sign */}
          <circle cx="150" cy="120" r="30" stroke="white" strokeWidth="4" fill="none"/>
          <path d="M140 120L150 110L160 120L150 130L140 120Z" fill="white"/>
        </svg>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
      
      <div className="relative flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-3 ring-2 ring-white/30 shadow-lg">
          <div className="w-12 h-12 rounded-xl bg-white/30 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-1">Tural Qarayev</h3>
        <div className="flex items-center gap-1.5 text-green-100 text-sm mb-4">
          <MapPin className="w-4 h-4" strokeWidth={2} />
          <span>Test Academy</span>
        </div>

        {/* Primary CTA */}
        <button className="w-full bg-white hover:bg-gray-50 text-primary-700 font-semibold py-3 px-5 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
          <Award className="w-4 h-4" strokeWidth={2} />
          <span>Şəhadətnamə Müraciəti</span>
        </button>
      </div>

      {/* Stats */}
      <div className="relative mt-5 pt-5 border-t border-white/20">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <span className="font-bold text-2xl block">4</span>
            <span className="text-green-100 text-xs">Tamamlanmış</span>
          </div>
          <div className="w-px h-10 bg-white/20"></div>
          <div className="text-center">
            <span className="font-bold text-2xl block">20</span>
            <span className="text-green-100 text-xs">Tamamlanmamış</span>
          </div>
        </div>
      </div>
    </div>
  )
}
