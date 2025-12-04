import { BookOpen, Video, BarChart3, Award, Settings } from 'lucide-react'

const iconMap = {
  BookOpen: <BookOpen className="w-8 h-8 text-primary-600" />,
  Video: <Video className="w-8 h-8 text-primary-600" />,
  BarChart3: <BarChart3 className="w-8 h-8 text-primary-600" />,
  Award: <Award className="w-8 h-8 text-primary-600" />,
  Settings: <Settings className="w-8 h-8 text-primary-600" />,
}

export default function ActionCard({ icon, title }) {
  return (
    <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-left group">
      <div className="flex items-center space-x-4">
        {iconMap[icon]}
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
      </div>
    </button>
  )
}
