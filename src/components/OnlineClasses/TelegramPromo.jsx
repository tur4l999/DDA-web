import { Send } from 'lucide-react'

export default function TelegramPromo() {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
          <Send className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-xl font-bold mb-2">Videolar Telegramda!</h3>
        <p className="text-blue-100 text-sm mb-4 leading-relaxed">
          Dərslərin video izahları və təkrarı yalnız paket almış istifadəçilər üçün Telegram kanalımızda paylaşılır.
        </p>

        <a
          href="https://t.me/avtoimtahan"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
          Kanalı İzlə
        </a>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-24 h-24 bg-black/10 rounded-full blur-xl" />
    </div>
  )
}
