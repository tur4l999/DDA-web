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
          className="group bg-white rounded-2xl p-4 hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-left min-h-[140px] flex flex-col justify-between border border-gray-100/50"
        >
          <div className="w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-primary-50 group-hover:text-primary-600 flex items-center justify-center transition-all duration-300 mb-3 text-gray-400">
            <card.icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-sm mb-1 leading-tight tracking-tight">{card.title}</h3>
            <p className="text-xs text-gray-500 font-medium">{card.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
