import { BookOpen, Video, BarChart3, Award, Settings } from 'lucide-react'

const iconMap = {
  BookOpen: <BookOpen className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-smooth" strokeWidth={2} />,
  Video: <Video className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-smooth" strokeWidth={2} />,
  BarChart3: <BarChart3 className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-smooth" strokeWidth={2} />,
  Award: <Award className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-smooth" strokeWidth={2} />,
  Settings: <Settings className="w-6 h-6 text-primary-600 group-hover:text-primary-700 transition-smooth" strokeWidth={2} />,
}

export default function ActionCard({ icon, title }) {
  return (
    <button className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-soft-md transition-smooth hover:-translate-y-1 text-left group">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-primary-50 group-hover:bg-primary-100 flex items-center justify-center transition-smooth">
          {iconMap[icon]}
        </div>
        <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-smooth">
          {title}
        </h3>
      </div>
    </button>
  )
}
