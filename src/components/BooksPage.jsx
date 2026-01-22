import { useState } from 'react'
import { ArrowLeft, Book, ChevronLeft, ChevronRight, X, Lock, Smartphone } from 'lucide-react'
import WatermarkOverlay from './Topics/WatermarkOverlay'

const LimitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null
  return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onClose}>
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-all">
                  <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col items-center text-center pt-2">
                  <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner ring-4 ring-primary-50/50">
                      <Smartphone className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">Mobil Tətbiqə Keç</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                      Yalnız mobil tətbiqdə kitabın pdfini əldə etmək olar.
                  </p>
                  <button onClick={onClose} className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                      Bağla
                  </button>
              </div>
          </div>
      </div>
  )
}

export default function BooksPage({ onBack }) {
  const [selectedBook, setSelectedBook] = useState(null)

  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [showLimitModal, setShowLimitModal] = useState(false)

  const books = [
    { id: 1, title: 'Yol Hərəkəti Qaydaları', author: 'DDA Nəşriyyatı', coverColor: 'bg-primary-500' },
    { id: 2, title: 'İnzibati Xətalar Məcəlləsi', author: 'DDA Nəşriyyatı', coverColor: 'bg-amber-500' },
  ]

  // Mock Content
  const bookContent = [
    `FƏSİL I. ÜMUMİ MÜDDƏALAR

Maddə 1. Qanunun təyinatı

1. Bu Qanun Azərbaycan Respublikası ərazisində yol hərəkətinin hüquqi əsaslarını, yol hərəkəti iştirakçılarının və yol hərəkəti təhlükəsizliyinin təmin edilməsi sahəsində dövlət orqanlarının, habelə digər hüquqi və fiziki şəxslərin hüquq və vəzifələrini müəyyən edir.
2. Azərbaycan Respublikasında yol hərəkəti vahid qaydada bu Qanunla, habelə ona uyğun olaraq qəbul edilmiş digər normativ hüquqi aktlarla tənzimlənir.
3. Bu Qanunun müddəaları beynəlxalq hüququn hamılıqla qəbul edilmiş prinsiplərinə və normalarına, Azərbaycan Respublikasının tərəfdar çıxdığı beynəlxalq müqavilələrə zidd olduqda, həmin beynəlxalq müqavilələr tətbiq edilir.`,

    `Maddə 4. Yol hərəkəti iştirakçıları

1. Yol hərəkəti iştirakçıları — yollardan istifadə edən və ya yollarda hərəkətlə bağlı olan şəxslər: sürücülər, piyadalar, sərnişinlər, velosipedçilər, mal-qara ötürənlər, habelə yollarda tikinti, təmir və istismar işlərini yerinə yetirən işçilərdir.
2. Yol hərəkəti iştirakçılarının hüquqları və vəzifələri bu Qanunla və ona uyğun olaraq qəbul edilmiş digər normativ hüquqi aktlarla müəyyən edilir.
3. Yol hərəkəti iştirakçıları yol hərəkəti qaydalarına riayət etməli, yol hərəkəti təhlükəsizliyini təmin etməli, digər hərəkət iştirakçılarına təhlükə və ya maneə yaratmamalı, yolları, yol qurğularını və texniki vasitələrini zədələməməlidirlər.`,

    `FƏSİL IV. YOL NİŞANLARI VƏ NİŞANLANMA XƏTLƏRİ

Maddə 60. Xəbərdarlıq nişanları

1. Xəbərdarlıq nişanları sürücülərə yolda qarşıdakı təhlükə barədə məlumat vermək üçün nəzərdə tutulur.
2. Xəbərdarlıq nişanlarının təsviri və tətbiqi qaydaları müvafiq icra hakimiyyəti orqanı tərəfindən müəyyən edilir.
3. Sürücülər xəbərdarlıq nişanlarının tələblərinə uyğun olaraq hərəkət sürətini seçməli və lazımi ehtiyat tədbirlərini görməlidirlər.`,

    `Maddə 61. Üstünlük nişanları

1. Üstünlük nişanları yolayrıclarını, yolun daralan hissələrini keçmək növbəliliyini müəyyən edir.
2. "Baş yol" nişanı nizamlanmayan yolayrıclarında üstün keçid hüququ verir.
3. "Yol verin" nişanı sürücüdən kəsişdiyi yolla hərəkət edən nəqliyyat vasitəsinə yol verməyi tələb edir.`,

    `Maddə 62. Qadağan nişanları

1. Qadağan nişanları yol hərəkətinə müəyyən məhdudiyyətlər qoyur və ya bu məhdudiyyətləri ləğv edir.
2. "Giriş qadağandır" nişanı bütün nəqliyyat vasitələrinin (marşrut nəqliyyat vasitələri istisna olmaqla) həmin istiqamətdə hərəkətini qadağan edir.
3. Qadağan nişanlarının təsir zonası nişanın qoyulduğu yerdən ən yaxın yolayrıcına qədər, yolayrıcı olmadıqda isə yaşayış məntəqəsinin sonuna qədərdir.`,

    `Maddə 63. Məcburi hərəkət istiqaməti nişanları

1. Məcburi hərəkət istiqaməti nişanları sürücülərə müəyyən istiqamətlərdə hərəkət etməyi əmr edir.
2. Bu nişanlar yalnız oxlarla göstərilən istiqamətlərdə hərəkətə icazə verir.
3. Dairəvi hərəkət təşkil edilmiş yolayrıclarında hərəkət istiqaməti müvafiq nişanlarla tənzimlənir.`,

    `Maddə 64. Məlumatverici-göstərici nişanlar

1. Məlumatverici-göstərici nişanlar hərəkət rejimi, habelə yaşayış məntəqələri və digər obyektlərin yerləşməsi barədə məlumat verir.
2. Bu nişanlar sürücülərə marşrut seçməkdə və təyin olunan yerə çatmaqda kömək edir.`
  ]

  if (selectedBook) {
     return (
        <div className="flex-1 flex flex-col h-screen bg-gray-50 overflow-hidden relative">
           {/* Reader Header */}
           <header className="bg-white border-b border-gray-200/50 px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-sm">
             <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                      setSelectedBook(null)
                      setCurrentPageIndex(0)
                  }}
                  className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors"
                >
                   <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                   <h1 className="text-sm md:text-base font-bold text-gray-900 line-clamp-1">{selectedBook.title}</h1>
                   <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 hidden sm:block">Səhifə {currentPageIndex + 1} / {bookContent.length}</span>
                      {currentPageIndex >= 4 && (
                          <span className="text-[10px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded border border-amber-100 font-medium flex items-center gap-1">
                             <Lock className="w-3 h-3" /> Limit
                          </span>
                      )}
                   </div>
                </div>
             </div>
           </header>

           {/* Reader Content */}
           <div className="flex-1 overflow-y-auto bg-gray-100/50 p-4 lg:p-8 flex justify-center custom-scrollbar">
              <div className="max-w-3xl w-full bg-white shadow-lg shadow-gray-200/50 min-h-[800px] p-8 md:p-16 relative flex flex-col rounded-xl overflow-hidden ring-1 ring-gray-900/5">
                  {/* Watermark Overlay */}
                  <WatermarkOverlay />

                  {/* Content Container */}
                  <div className="flex-1 relative z-10">
                     <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center pb-6 border-b border-gray-100">
                        {selectedBook.title} - Səhifə {currentPageIndex + 1}
                     </h2>
                     <div className="prose prose-lg max-w-none text-gray-700 leading-loose text-justify font-serif">
                         {bookContent[currentPageIndex].split('\n').map((paragraph, idx) => (
                             <p key={idx} className="mb-4">{paragraph}</p>
                         ))}
                     </div>
                  </div>

                  {/* Pagination Footer */}
                  <div className="mt-12 pt-8 flex items-center justify-between border-t border-gray-100 relative z-30">
                     <button
                        disabled={currentPageIndex === 0}
                        onClick={() => setCurrentPageIndex(p => Math.max(0, p - 1))}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Əvvəlki</span>
                     </button>

                     <span className="text-xs font-mono font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                        {currentPageIndex + 1} of {bookContent.length}
                     </span>

                     <button
                        onClick={() => {
                           // Allow up to page 5 (index 4). If user is on index 4 (Page 5) and clicks Next, show modal.
                           if (currentPageIndex < 4) {
                               if (currentPageIndex + 1 < bookContent.length) {
                                   setCurrentPageIndex(p => p + 1)
                               }
                           } else {
                               setShowLimitModal(true)
                           }
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors shadow-sm shadow-primary-500/20 active:scale-95 transform duration-100"
                     >
                        <span className="hidden sm:inline">Növbəti</span>
                        <ChevronRight className="w-4 h-4" />
                     </button>
                  </div>
              </div>
           </div>

           <LimitModal isOpen={showLimitModal} onClose={() => setShowLimitModal(false)} />
        </div>
     )
  }

  return (
    <div className="flex-1 flex flex-col h-screen bg-gray-50 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200/50 px-6 py-4 sticky top-0 z-20 shadow-sm">
             <div className="flex items-center gap-4 max-w-[1600px] mx-auto w-full">
                <button onClick={onBack} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors">
                   <ArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">Kitabxana</h1>
             </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
            <div className="max-w-[1600px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-6">
                {books.map(book => (
                    <button
                        key={book.id}
                        onClick={() => setSelectedBook(book)}
                        className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-left h-full"
                    >
                        <div className={`aspect-[2/3] w-full ${book.coverColor} p-6 flex items-center justify-center relative overflow-hidden group-hover:brightness-95 transition-all`}>
                             <Book className="w-12 h-12 lg:w-16 lg:h-16 text-white/60 transform group-hover:scale-110 transition-transform duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                             {/* Spine Effect */}
                             <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20" />
                             <div className="absolute left-1 top-0 bottom-0 w-[1px] bg-black/10" />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-gray-900 text-sm lg:text-base line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">{book.title}</h3>
                            <p className="text-xs text-gray-500 mt-auto">{book.author}</p>
                        </div>
                    </button>
                ))}
            </div>
        </main>
    </div>
  )
}
