import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { useState } from 'react'

function AccordionCard({ title, content, type = 'default' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${
      type === 'warning' 
        ? 'border-red-200 bg-red-50/50' 
        : 'border-gray-200 bg-white'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {type === 'warning' && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-gray-700 leading-relaxed">
          {content}
        </div>
      )}
    </div>
  )
}

function TableOfContents({ sections, activeSection }) {
  return (
    <div className="hidden xl:block sticky top-32 w-64">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Bu bölmədə</h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block text-sm py-1 transition-colors ${
                activeSection === section.id
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default function TextContent({ content }) {
  const sections = [
    { id: 'intro', title: 'Giriş' },
    { id: 'definitions', title: 'Əsas anlayışlar' },
    { id: 'rules', title: 'Qaydalar' },
    { id: 'examples', title: 'Nümunələr' }
  ]

  return (
    <div className="flex gap-6">
      {/* Main content */}
      <div className="flex-1 max-w-[860px]">
        <article className="prose prose-sm max-w-none">
          <div id="intro" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Giriş</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Yol hərəkəti iştirakçıları yol hərəkətinin qaydalarını bilməli və onlara əməl etməlidirlər. 
              Yol hərəkəti iştirakçıları öz hərəkətlərini yol hərəkətinin vəziyyətinə, yol şəraitinə və 
              digər yol hərəkəti iştirakçılarının mövqeyinə uyğunlaşdırmalıdırlar.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Hər bir sürücü nəqliyyat vasitəsini idarə etməzdən əvvəl özünü yaxşı hiss etdiyinə əmin 
              olmalıdır. Yorğun, xəstə və ya hər hansı başqa səbəbdən özünü pis hiss edən sürücü 
              nəqliyyat vasitəsini idarə etməməlidir.
            </p>
          </div>

          <div id="definitions" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Əsas anlayışlar</h2>
            <div className="space-y-3">
              <AccordionCard
                title="Yol hərəkəti iştirakçısı"
                content="Sürücü, sərnişin, piyada və ya digər şəkildə yol hərəkətində iştirak edən şəxs."
              />
              <AccordionCard
                title="Nəqliyyat vasitəsi"
                content="Yolda hərəkət etmək üçün nəzərdə tutulmuş vasitə (avtomobil, motosikl, velosiped və s.)."
              />
              <AccordionCard
                title="Yol-nəqliyyat hadisəsi"
                content="Yolda baş verən və nəticəsində insanların xəsarətlənməsi və ya ölümü, nəqliyyat vasitələrinin, yüklərin, yol tikililərinin və ya digər maddi dəyərlərin zədələnməsi ilə nəticələnən hadisə."
                type="warning"
              />
            </div>
          </div>

          <div id="rules" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Qaydalar</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Sürücünün vəzifələri</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-primary-600 font-bold">1.</span>
                  <span>Sürücülük vəsiqəsi və nəqliyyat vasitəsinin qeydiyyat sənədləri olmalıdır</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-600 font-bold">2.</span>
                  <span>Texniki baxışdan keçmə şəhadətnaməsi olmalıdır</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-600 font-bold">3.</span>
                  <span>İcbari sığorta sənədi olmalıdır</span>
                </li>
              </ul>
            </div>
          </div>

          <div id="examples" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Praktik nümunələr</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Gün ərzində sürücü bir neçə dəfə yol hərəkəti iştirakçılarının davranışını müşahidə edir və 
              onlara uyğun reaksiya verməlidir. Bu nümunələr həyati vəziyyətlərə əsaslanır.
            </p>
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-8 p-6 bg-primary-600/5 border border-primary-600/20 rounded-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Mövzunu başa vurdunuz?</h3>
              <p className="text-sm text-gray-600">İmtahana başlayın və biliklərinizi yoxlayın</p>
            </div>
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-colors shadow-sm whitespace-nowrap">
              İmtahana başla
            </button>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents sections={sections} activeSection="intro" />
    </div>
  )
}
