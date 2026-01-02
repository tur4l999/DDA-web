import { BookOpen, Video, HelpCircle, FileText, BookMarked, AlertTriangle, BarChart3, Calendar } from 'lucide-react'

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
    description: 'Test sualları',
    page: null
  },
  {
    id: 4,
    icon: FileText,
    title: 'Video Dərslər',
    description: 'Təlim videoları',
    page: null
  },
  {
    id: 5,
    icon: BookMarked,
    title: 'Maddələr',
    description: 'Qanun maddələri',
    page: null
  },
  {
    id: 6,
    icon: AlertTriangle,
    title: 'Cərimələr',
    description: 'Cərimə məlumatları',
    page: 'penalties'
  },
  {
    id: 7,
    icon: BarChart3,
    title: 'Statistika',
    description: 'Nəticələriniz',
    page: null
  },
  {
    id: 8,
    icon: Calendar,
    title: 'Onlayn Dərslər',
    description: 'Canlı dərslər',
    page: 'classes'
  }
]

export default function ModularActionCards({ setCurrentPage }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => card.page && setCurrentPage(card.page)}
          className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-primary-500 transition-all duration-200 text-left min-h-[140px] flex flex-col justify-between"
        >
          <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-primary-500/10 flex items-center justify-center transition-colors duration-200 mb-4">
            <card.icon className="w-6 h-6 text-gray-600 group-hover:text-primary-600 transition-colors duration-200" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">{card.title}</h3>
            <p className="text-xs text-gray-500">{card.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
