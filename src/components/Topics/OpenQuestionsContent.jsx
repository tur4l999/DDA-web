import { FileQuestion, Printer, Download } from 'lucide-react'

export default function OpenQuestionsContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Controls (optional) */}
      <div className="flex justify-end gap-2 px-2">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
            <Printer className="w-4 h-4" />
            <span>Çap et</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>PDF Yüklə</span>
        </button>
      </div>

      {/* A4 Document Container */}
      <div className="bg-white text-gray-900 shadow-sm border border-gray-200 min-h-[800px] p-8 sm:p-12 md:p-16 relative mx-auto rounded-sm">

        {/* Document Header */}
        <div className="border-b-2 border-gray-900 pb-6 mb-8 flex justify-between items-end">
            <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">Açıq tipli suallar</h1>
                <p className="text-gray-600 mt-2 font-serif italic">Mövzu üzrə biliklərin yoxlanılması üçün suallar</p>
            </div>
            <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-gray-400">DDA-DOC-2025</div>
                <div className="text-xs text-gray-400 mt-1">Bakı, Azərbaycan</div>
            </div>
        </div>

        {/* Content */}
        <div className="space-y-10 font-serif text-lg leading-relaxed">

            <section>
                <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-bold text-xl">1.</span>
                    <h3 className="font-bold text-xl">Yol hərəkətinin təşkili</h3>
                </div>
                <p className="pl-8 mb-4">
                    "Yol hərəkətinin təşkili" anlayışına nələr daxildir və bu prosesdə hansı texniki vasitələrdən istifadə olunur? Svetoforların, yol nişanlarının və nişanlama xətlərinin hər birinin rolunu ayrı-ayrılıqda izah edin.
                </p>
                <div className="pl-8">
                     <div className="w-full h-32 border-b border-gray-300 bg-[linear-gradient(transparent_31px,rgba(0,0,0,0.1)_32px)] bg-[length:100%_32px] leading-8 text-gray-400 italic font-handwriting">
                        Cavab üçün yer...
                     </div>
                </div>
            </section>

            <section>
                <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-bold text-xl">2.</span>
                    <h3 className="font-bold text-xl">Sürücünün vəzifələri</h3>
                </div>
                <p className="pl-8 mb-4">
                    Yol hərəkəti iştirakçısı kimi sürücünün əsas vəzifələri hansılardır? Qanunvericiliyə əsasən sürücü yol polisləri ilə ünsiyyət zamanı hansı sənədləri təqdim etməlidir və hansı hallarda imtina etmək hüququna malikdir?
                </p>
                <div className="pl-8">
                     <div className="w-full h-32 border-b border-gray-300 bg-[linear-gradient(transparent_31px,rgba(0,0,0,0.1)_32px)] bg-[length:100%_32px] leading-8">
                     </div>
                </div>
            </section>

            <section>
                <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-bold text-xl">3.</span>
                    <h3 className="font-bold text-xl">Piyadaların təhlükəsizliyi</h3>
                </div>
                <p className="pl-8 mb-4">
                   Piyada keçidlərində hərəkət qaydaları pozulduqda sürücülər üçün nəzərdə tutulan cərimələr hansılardır? Nizamlanmayan piyada keçidlərində sürücü piyadaya yol vermək üçün hansı tədbirləri görməlidir?
                </p>
                <div className="pl-8">
                     <div className="w-full h-32 border-b border-gray-300 bg-[linear-gradient(transparent_31px,rgba(0,0,0,0.1)_32px)] bg-[length:100%_32px] leading-8">
                     </div>
                </div>
            </section>

        </div>

        {/* Footer */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
            <span className="text-xs text-gray-400 font-sans">Səhifə 1</span>
        </div>
      </div>
    </div>
  )
}
