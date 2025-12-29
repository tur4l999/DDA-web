import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { useState } from 'react'

function AccordionCard({ title, content, type = 'default' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`rounded-2xl overflow-hidden transition-smooth shadow-soft ${
      type === 'warning' 
        ? 'bg-red-50/50 border border-red-200' 
        : 'bg-white'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-neutral-50/50 transition-smooth"
      >
        <div className="flex items-center gap-3">
          {type === 'warning' && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" strokeWidth={2} />}
          <span className="font-medium text-neutral-900">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-neutral-400 flex-shrink-0" strokeWidth={2} />
        ) : (
          <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0" strokeWidth={2} />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-neutral-700 text-educational">
          {content}
        </div>
      )}
    </div>
  )
}

function TableOfContents({ sections, activeSection }) {
  return (
    <div className="hidden xl:block sticky top-32 w-64">
      <div className="bg-white rounded-2xl p-5 shadow-soft">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">Bu bölmədə</h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block text-sm py-2 px-3 rounded-xl transition-smooth ${
                activeSection === section.id
                  ? 'text-primary-700 font-medium bg-primary-50'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
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
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Giriş</h2>
            <p className="text-neutral-700 text-educational mb-4">
              Yol hərəkəti iştirakçıları yol hərəkətinin qaydalarını bilməli və onlara əməl etməlidirlər. 
              Yol hərəkəti iştirakçıları öz hərəkətlərini yol hərəkətinin vəziyyətinə, yol şəraitinə və 
              digər yol hərəkəti iştirakçılarının mövqeyinə uyğunlaşdırmalıdırlar.
            </p>
            <p className="text-neutral-700 text-educational">
              Hər bir sürücü nəqliyyat vasitəsini idarə etməzdən əvvəl özünü yaxşı hiss etdiyinə əmin 
              olmalıdır. Yorğun, xəstə və ya hər hansı başqa səbəbdən özünü pis hiss edən sürücü 
              nəqliyyat vasitəsini idarə etməməlidir.
            </p>
          </div>

          <div id="definitions" className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Əsas anlayışlar</h2>
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
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Qaydalar</h2>
            <div className="bg-neutral-50 rounded-2xl p-6 mb-4 shadow-soft">
              <h3 className="font-semibold text-neutral-900 mb-4">Sürücünün vəzifələri</h3>
              <ul className="space-y-3 text-neutral-700 text-educational">
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold flex-shrink-0">1.</span>
                  <span>Sürücülük vəsiqəsi və nəqliyyat vasitəsinin qeydiyyat sənədləri olmalıdır</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold flex-shrink-0">2.</span>
                  <span>Texniki baxışdan keçmə şəhadətnaməsi olmalıdır</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary-600 font-bold flex-shrink-0">3.</span>
                  <span>İcbari sığorta sənədi olmalıdır</span>
                </li>
              </ul>
            </div>
          </div>

          <div id="examples" className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">Praktik nümunələr</h2>
            <p className="text-neutral-700 text-educational mb-4">
              Gün ərzində sürücü bir neçə dəfə yol hərəkəti iştirakçılarının davranışını müşahidə edir və 
              onlara uyğun reaksiya verməlidir. Bu nümunələr həyati vəziyyətlərə əsaslanır.
            </p>
          </div>
        </article>

        {/* Modern CTA Section */}
        <div className="mt-8 p-6 bg-primary-50 rounded-2xl shadow-soft">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-1.5">Mövzunu başa vurdunuz?</h3>
              <p className="text-sm text-neutral-600">İmtahana başlayın və biliklərinizi yoxlayın</p>
            </div>
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-smooth shadow-soft-md hover:shadow-soft-lg whitespace-nowrap">
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
