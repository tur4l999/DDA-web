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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => card.page && setCurrentPage(card.page)}
          className="group bg-white rounded-3xl p-6 hover:shadow-card hover:-translate-y-1 transition-all duration-300 text-left min-h-[160px] flex flex-col justify-between border border-gray-100/50"
        >
          <div className="w-14 h-14 rounded-2xl bg-gray-50 group-hover:bg-primary-50 group-hover:text-primary-600 flex items-center justify-center transition-all duration-300 mb-4 text-gray-400">
            <card.icon className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-1.5 leading-tight tracking-tight">{card.title}</h3>
            <p className="text-sm text-gray-500 font-medium">{card.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
