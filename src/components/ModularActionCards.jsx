import { BookOpen, Video, HelpCircle, BookMarked, AlertTriangle, BarChart3, Calendar } from 'lucide-react'

const cards = [
  {
    id: 1,
    icon: BookOpen,
    title: 'Təlim Mövzuları',
    description: 'Bütün kurs mövzuları',
    page: 'topics'
  },
  {
    id: 2,
    icon: Video,
    title: '3D Video',
    description: 'Praktiki videolar',
    page: null
  },
  {
    id: 3,
    icon: HelpCircle,
    title: 'Suallar',
    description: 'Test sualları hazırlığı',
    page: null
  },
  {
    id: 4,
    icon: BookMarked,
    title: 'Maddələr',
    description: 'Qanun maddələri',
    page: null
  },
  {
    id: 5,
    icon: AlertTriangle,
    title: 'Cərimələr',
    description: 'İnzibati xətalar',
    page: 'penalties'
  },
  {
    id: 6,
    icon: BarChart3,
    title: 'Statistika',
    description: 'Nəticələriniz',
    page: null
  },
  {
    id: 7,
    icon: Calendar,
    title: 'Onlayn Dərslər',
    description: 'Canlı dərslər',
    page: 'classes'
  }
]

export default function ModularActionCards({ setCurrentPage }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => card.page && setCurrentPage(card.page)}
          className="group bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-[#007A3A] transition-all text-left min-h-[120px] flex flex-col justify-between"
        >
          <div className="w-11 h-11 rounded-xl bg-gray-50 group-hover:bg-[#007A3A]/10 flex items-center justify-center transition-colors mb-3">
            <card.icon className="w-5 h-5 text-gray-600 group-hover:text-[#007A3A] transition-colors" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-0.5 leading-tight">{card.title}</h3>
            <p className="text-xs text-gray-500 leading-snug">{card.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
