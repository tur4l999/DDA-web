import { Send, ArrowRight } from 'lucide-react'

export default function OnlineClasses({ onBack }) {
  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-gray-50">

      {/* Background Decor - Optional subtle gradient/blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-200/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/20 rounded-full blur-[100px]"></div>
      </div>

      {/* Main Content Container - Centered */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-10">

        {/* Glassmorphism Card */}
        <div className="max-w-md w-full bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500">

           {/* Icon */}
           <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 mb-8 transform hover:scale-110 transition-transform duration-300">
              <Send className="w-10 h-10 text-white ml-1" />
           </div>

           {/* Typography */}
           <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
             Video Dərslər <br/> Artıq Telegramda!
           </h1>

           <p className="text-gray-500 text-lg mb-8 leading-relaxed">
             Daha sürətli, keyfiyyətli və yenilənmiş dərslər üçün Telegram kanalımıza qoşulun.
           </p>

           {/* QR Code (Desktop Only) */}
           <div className="hidden md:block mb-8 p-4 bg-white border border-gray-100 rounded-2xl shadow-inner mx-auto w-fit">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/avtoimtahan&color=1F2937"
                alt="Telegram QR"
                className="w-32 h-32 opacity-90"
              />
              <p className="text-xs text-gray-400 mt-2 font-medium">Skan edin və qoşulun</p>
           </div>

           {/* CTA Button */}
           <a
             href="https://t.me/avtoimtahan"
             target="_blank"
             rel="noreferrer"
             className="group w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300"
           >
             <span>Kanalı İzlə</span>
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </a>

           {/* Optional: Back Button for Mobile if needed, though navigation is usually global */}
           {onBack && (
             <button
               onClick={onBack}
               className="mt-6 text-gray-400 font-medium hover:text-gray-600 transition-colors text-sm"
             >
               Geri qayıt
             </button>
           )}

        </div>
      </div>
    </div>
  )
}
