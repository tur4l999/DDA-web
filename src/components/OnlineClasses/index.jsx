import { Send, X, ShieldCheck } from 'lucide-react'

export default function OnlineClasses({ onBack }) {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 p-6">
      {/* Main Glass Card */}
      <div className="max-w-5xl w-full bg-white/80 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-16 border border-white relative overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

        {/* Close Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/50 hover:bg-white text-gray-500 hover:text-gray-900 transition-all z-20"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Content */}
          <div className="space-y-8">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6 shadow-sm">
              <Send className="w-8 h-8 -ml-1 mt-1" />
            </div>

            {/* Typography */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                Video Dərslər <br />
                <span className="text-blue-500">Artıq Telegramda!</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                Daha sürətli, keyfiyyətli və yenilənmiş dərslər üçün Telegram kanalımıza qoşulun. İmtahanlara hazırlıq indi daha asan!
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg border border-white/50">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Rəsmi Kanal</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-lg border border-white/50">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>Canlı Yayım</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href="https://t.me/avtoimtahan"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                <Send className="w-5 h-5 -ml-1 mt-0.5 group-hover:rotate-12 transition-transform" />
                <span>Kanalı İzlə</span>
              </a>
            </div>
          </div>

          {/* Right Content - Visual/QR */}
          <div className="hidden lg:flex flex-col items-center justify-center relative">
            <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://t.me/avtoimtahan&color=1d4ed8&bgcolor=ffffff"
                alt="Telegram Channel QR Code"
                className="w-64 h-64 rounded-xl"
              />
              <div className="mt-4 text-center">
                <p className="font-bold text-gray-900">avtoimtahan</p>
                <p className="text-sm text-gray-500">Kameranızla skan edin</p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
          </div>

        </div>
      </div>
    </div>
  )
}
