import { BookOpen, Video, HelpCircle, FileText, AlertTriangle, BarChart3, Award, BookMarked } from 'lucide-react'

const cards = [
  {
    id: 1,
    icon: BookOpen,
    title: 'Təlim Mövzuları',
    description: 'Bütün kursu mövzuları',
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700'
  },
  {
    id: 2,
    icon: Video,
    title: '3D Video',
    description: 'Praktiki video dərslər',
    color: 'from-emerald-500 to-emerald-600',
    hoverColor: 'hover:from-emerald-600 hover:to-emerald-700'
  },
  {
    id: 3,
    icon: HelpCircle,
    title: 'Suallar',
    description: 'Test sualları',
    color: 'from-rose-500 to-rose-600',
    hoverColor: 'hover:from-rose-600 hover:to-rose-700'
  },
  {
    id: 4,
    icon: FileText,
    title: 'Video Dərslər',
    description: 'Mövzularla əlaqədar videolar',
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'hover:from-orange-600 hover:to-orange-700'
  },
  {
    id: 5,
    icon: BookMarked,
    title: 'Maddələr',
    description: 'Qanun maddələri',
    color: 'from-red-500 to-red-600',
    hoverColor: 'hover:from-red-600 hover:to-red-700'
  },
  {
    id: 6,
    icon: AlertTriangle,
    title: 'Cərimələr',
    description: 'Cərimə məlumatları',
    color: 'from-amber-500 to-amber-600',
    hoverColor: 'hover:from-amber-600 hover:to-amber-700'
  },
  {
    id: 7,
    icon: BarChart3,
    title: 'Statistika',
    description: 'Nəticələrim',
    color: 'from-sky-500 to-sky-600',
    hoverColor: 'hover:from-sky-600 hover:to-sky-700'
  },
  {
    id: 8,
    icon: Award,
    title: 'Nailiyyətlər',
    description: 'Suallar',
    color: 'from-violet-500 to-violet-600',
    hoverColor: 'hover:from-violet-600 hover:to-violet-700'
  }
]

export default function ModularActionCards({ setCurrentPage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <button
          key={card.id}
          className={`bg-gradient-to-br ${card.color} ${card.hoverColor} rounded-xl p-5 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
        >
          <div className="flex flex-col items-start h-full">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2.5 mb-3 group-hover:bg-white/30 transition-colors">
              <card.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-left leading-tight">{card.title}</h3>
            <p className="text-xs text-white/75 text-left mt-1">{card.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
