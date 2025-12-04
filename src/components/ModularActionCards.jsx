import { BookOpen, Video, HelpCircle, FileText, AlertTriangle, BarChart3, Award, BookMarked, Settings } from 'lucide-react'

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
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700'
  },
  {
    id: 3,
    icon: HelpCircle,
    title: 'Suallar',
    description: 'Test sualları',
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700'
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
    color: 'from-pink-500 to-pink-600',
    hoverColor: 'hover:from-pink-600 hover:to-pink-700'
  },
  {
    id: 7,
    icon: BarChart3,
    title: 'Statistika',
    description: 'Nəticələrim',
    color: 'from-cyan-500 to-cyan-600',
    hoverColor: 'hover:from-cyan-600 hover:to-cyan-700'
  },
  {
    id: 8,
    icon: Award,
    title: 'Nailiyyətlər',
    description: 'Suallar',
    color: 'from-yellow-500 to-yellow-600',
    hoverColor: 'hover:from-yellow-600 hover:to-yellow-700'
  },
  {
    id: 9,
    icon: Settings,
    title: 'Tənzimləmələr',
    description: 'İmtahanlar',
    color: 'from-indigo-500 to-indigo-600',
    hoverColor: 'hover:from-indigo-600 hover:to-indigo-700'
  }
]

export default function ModularActionCards({ setCurrentPage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => {
            if (card.id === 7) setCurrentPage('classes')
          }}
          className={`bg-gradient-to-br ${card.color} ${card.hoverColor} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
        >
          <div className="flex flex-col items-start">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-4 group-hover:bg-white/30 transition-colors">
              <card.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-left leading-tight mb-1">{card.title}</h3>
            <p className="text-sm text-white/80 text-left">{card.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
}
