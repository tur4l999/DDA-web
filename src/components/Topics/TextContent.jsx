import { ChevronDown, ChevronUp, FileText } from 'lucide-react'
import { useState } from 'react'

function SummaryAccordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0 text-primary-600">
            <FileText className="w-5 h-5" />
          </div>
          <span className="font-semibold text-gray-900 text-base sm:text-lg">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-gray-100 bg-white">
            {children}
        </div>
      )}
    </div>
  )
}

export default function TextContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Summary 1 */}
      <SummaryAccordion title="Mövzu 1. Ümumi müddəalar (YHQ Qanun maddə 1)" defaultOpen={true}>
        <div className="p-6 sm:p-8 text-gray-800 leading-relaxed space-y-6">
            {/* Intro */}
            <div className="space-y-4">
                <p>
                    Yol hərəkəti qaydaları "Yol hərəkəti haqqında" Azərbaycan Respublikasının Qanununda təsbit olunmuşdur. Bu qaydaları öyrənmək üçün ilk növbədə onların mətnində istifadə edilən termin və anlayışları bilmək lazımdır. "Yol hərəkəti haqqında" Qanununda aşağıdakı termin və anlayışlardan istifadə olunur:
                </p>
            </div>

            {/* Definitions List */}
            <div className="space-y-4">
                <p>
                    <span className="text-red-600 font-bold">1) yol hərəkəti</span> - xüsusi nəzərdə tutulmuş yollarda NV-nin köməyi ilə və ya belə kömək olmadan hərəkət etmək, habelə sərnişin və yük daşınması üzrə fiziki və hüquqi şəxslərin tələbatlarını ödəmək prosesində yaranan ictimai münasibətlərin məcmusudur;
                </p>
                <p>
                    <span className="text-red-600 font-bold">2) yol hərəkətinin təşkili</span> - NV-nin və ya piyadaların təhlükəsizliyini, fasiləsiz və rahat hərəkətini, optimal sürətini təmin etmək məqsədilə küçə-yol şəbəkəsində həyata keçirilən və yol hərəkətinin ayrılmaz hissəsi olan mühəndis və təşkilati tədbirlər sistemidir;
                </p>
                 <p>
                    <span className="text-red-600 font-bold">2-1) yol hərəkətinin təşkilinin texniki vasitələri</span> - yollarda hərəkətin təşkili və tənzimlənməsi, o cümlədən NV-nin və piyadaların təhlükəsizliyinin və fasiləsiz hərəkətinin təmin edilməsi, yolların buraxıcılıq qabiliyyətinin artırılması üçün tətbiq edilən qurğular, avadanlıqlar və təsvirlərdir (svetoforlar, yol nişanları, nişanlama xətləri, qoruyucu sədlər, dirəkciklər və s.);
                </p>
                 <p>
                    <span className="text-red-600 font-bold">3) yol hərəkətinin təhlükəsizliyi</span> - yol hərəkəti iştirakçılarının və cəmiyyətin yol-nəqliyyat hadisələrindən və onların nəticələrindən müdafiə olunma dərəcəsini göstərən yol hərəkəti vəziyyətidir;
                </p>
                 <p>
                    <span className="text-red-600 font-bold">4) beynəlxalq yol hərəkəti</span> - bir dövlətin fiziki və ya hüquqi şəxsinə məxsus olan və başqa dövlətin ərazisinə müvəqqəti gətirilərək və orada qeydiyyata alınmayan NV-nin iştirak etdiyi yol hərəkətidir;
                </p>
            </div>

            {/* Images Placeholder */}
            <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative overflow-hidden group">
                        <span className="text-gray-400 font-medium">Şəkil (a)</span>
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-gray-600">a</div>
                     </div>
                     <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative overflow-hidden group">
                        <span className="text-gray-400 font-medium">Şəkil (b)</span>
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-gray-600">b</div>
                     </div>
                     <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative overflow-hidden group">
                        <span className="text-gray-400 font-medium">Şəkil (c)</span>
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-gray-600">c</div>
                     </div>
                     <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative overflow-hidden group">
                        <span className="text-gray-400 font-medium">Şəkil (d)</span>
                        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/80 flex items-center justify-center text-sm font-bold text-gray-600">d</div>
                     </div>
                </div>
                <p className="text-sm text-gray-500 text-center italic mt-2">
                    Şək. 1.1 (a, b, c, d). Y-yolun ümumi eni; H-hərəkət hissəsi; Z-hərəkət zolağı; S-səki; A-ayırıcı zolaq; Ç-yol çiyini; T-tramvay yolları.
                </p>
            </div>

             {/* More Definitions */}
            <div className="space-y-4">
                 <p>
                    <span className="text-red-600 font-bold">5) avtomobil yolu</span> - yol hərəkəti qaydalarına, dövlət standartlarına və digər normativ hüquqi aktlara uyğun olan ölçülərə və kütləyə malik avtomobillərin, avtobusların, motosikletlərin müəyyənləşdirilmiş sürətlə təhlükəsiz və rahat hərəkətini təmin etmək üçün nəzərdə tutulan yoldur (Şək. 1.1);
                </p>
                 <p>
                    <span className="text-red-600 font-bold">6) avtomagistral</span> - NV-nin hərəkəti üçün xüsusi çəkilmiş və nəzərdə tutulmuş elə bir yoldur ki: həmin yol boyunca yerləşən təsərrüfat, istehsal və ya tikinti təyinatlı obyektlər digər NV tərəfindən istifadə edilə bilməz; ayrı-ayrı yerləri istisna olmaqla və ya müvəqqəti qaydanın müəyyənləşdirildiyi hallardan başqa, əks istiqamətlərdə hərəkət istiqamətləri üçün ayrı-ayrı hərəkət hissələri vardır, həm də bu hissələr arasında hərəkət üçün nəzərdə tutulmayan ayırıcı zolağın və ya müstəsna hallarda başqa vasitələrin köməyi ilə hədd qoyulmuşdur; dəmiryol, tramvay yolları və başqa yollarla, habelə piyada zolaqları ilə bir səviyyədə kəsişmələri yoxdur (Şək. 1.2); hərəkət hissəsində NV-nin dayanması və ya durması qadağan edilir, hər 50 km-dən çox olmayan məsafədə xüsusi istirahət yerləri və dayanacaq meydançaları ilə təchiz edilir.
                </p>
            </div>
        </div>
      </SummaryAccordion>

       {/* Summary 2 - Placeholder */}
      <SummaryAccordion title="Mövzu 2. Sürücülük vəsiqəsi">
         <div className="p-6 sm:p-8 text-gray-800 leading-relaxed">
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bu mövzu üçün konspekt hazırlanır</h3>
                <p className="text-gray-500 max-w-sm">
                    Bu bölmədə sürücülük vəsiqəsi və NV-nin idarəetmə hüququ haqqında məlumatlar yer alacaq.
                </p>
            </div>
         </div>
      </SummaryAccordion>
    </div>
  )
}
