import { Award, MapPin } from 'lucide-react'

export default function ProfileCard() {
  return (
    <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl shadow-soft-xl p-6 text-white overflow-hidden relative" style={{ minHeight: '200px' }}>
      {/* Subtle Background Illustration */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.08]">
        <svg className="absolute right-0 top-0 w-40 h-40" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="60" r="25" fill="white"/>
          <path d="M60 140C60 110 75 100 100 100C125 100 140 110 140 140V180H60V140Z" fill="white"/>
          <circle cx="150" cy="120" r="30" stroke="white" strokeWidth="4" fill="none"/>
          <path d="M140 120L150 110L160 120L150 130L140 120Z" fill="white"/>
        </svg>
      </div>

      {/* Subtle Decorative circles */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-white/[0.03] rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/[0.03] rounded-full -ml-12 -mb-12"></div>
      
      <div className="relative flex flex-col items-center text-center h-full justify-between">
        {/* Avatar + Info */}
        <div className="w-full">
          <div className="w-16 h-16 glass-effect-dark rounded-2xl flex items-center justify-center mb-4 ring-2 ring-white/20 shadow-soft-lg mx-auto">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
          </div>
          
          <h3 className="text-base font-semibold mb-1.5 text-shadow-sm">Tural Qarayev</h3>
          <div className="flex items-center justify-center gap-1.5 text-white/90 text-xs mb-4">
            <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Test Academy</span>
          </div>
        </div>

        {/* CTA + Stats */}
        <div className="w-full space-y-4">
          <button className="w-full bg-white hover:bg-neutral-50 text-primary-600 font-semibold py-3 px-4 rounded-xl transition-smooth text-sm shadow-soft-md hover:shadow-soft-lg flex items-center justify-center gap-2">
            <Award className="w-4 h-4" strokeWidth={2} />
            <span>Şəhadətnamə</span>
          </button>

          {/* Stats */}
          <div className="pt-4 border-t border-white/15">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <span className="font-bold text-xl block mb-0.5">4</span>
                <span className="text-white/80 text-[11px] font-medium">Tamamlanmış</span>
              </div>
              <div className="w-px h-10 bg-white/15"></div>
              <div className="text-center">
                <span className="font-bold text-xl block mb-0.5">20</span>
                <span className="text-white/80 text-[11px] font-medium">Qalır</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
