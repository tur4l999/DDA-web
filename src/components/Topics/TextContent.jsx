import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { useState } from 'react'

function AccordionCard({ title, content, type = 'default' }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
      type === 'warning' 
        ? 'border-red-200 bg-red-50/50' 
        : 'border-slate-200 bg-white'
    }`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {type === 'warning' && <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
          <span className="font-medium text-slate-900">{title}</span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed animate-fade-in">
          {content}
        </div>
      )}
    </div>
  )
}

function TableOfContents({ sections, activeSection }) {
  return (
    <div className="hidden xl:block sticky top-32 w-64">
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Bu bölmədə</h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`block text-sm py-1 transition-colors ${
                activeSection === section.id
                  ? 'text-primary-600 font-medium'
                  : 'text-slate-500 hover:text-slate-700'
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Giriş</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Yol hərəkəti iştirakçıları yol hərəkətinin qaydalarını bilməli və onlara əməl etməlidirlər. 
              Yol hərəkəti iştirakçıları öz hərəkətlərini yol hərəkətinin vəziyyətinə, yol şəraitinə və 
              digər yol hərəkəti iştirakçılarının mövqeyinə uyğunlaşdırmalıdırlar.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Hər bir sürücü nəqliyyat vasitəsini idarə etməzdən əvvəl özünü yaxşı hiss etdiyinə əmin 
              olmalıdır. Yorğun, xəstə və ya hər hansı başqa səbəbdən özünü pis hiss edən sürücü 
              nəqliyyat vasitəsini idarə etməməlidir.
            </p>
          </div>

          <div id="definitions" className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Əsas anlayışlar</h2>
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Qaydalar</h2>
            <div className="bg-surface-50 border border-slate-200 rounded-2xl p-6 mb-4">
              <h3 className="font-semibold text-slate-900 mb-3">Sürücünün vəzifələri</h3>
              <ul className="space-y-2 text-slate-600">
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Praktik nümunələr</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Gün ərzində sürücü bir neçə dəfə yol hərəkəti iştirakçılarının davranışını müşahidə edir və 
              onlara uyğun reaksiya verməlidir. Bu nümunələr həyati vəziyyətlərə əsaslanır.
            </p>
          </div>
        </article>

        {/* CTA Section */}
        <div className="mt-8 p-6 bg-primary-50 border border-primary-100 rounded-2xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Mövzunu başa vurdunuz?</h3>
              <p className="text-sm text-slate-600">İmtahana başlayın və biliklərinizi yoxlayın</p>
            </div>
            <button className="btn-primary whitespace-nowrap">
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
