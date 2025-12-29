import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

const iconMap = {
  CheckCircle: <CheckCircle className="w-6 h-6" />,
  AlertCircle: <AlertCircle className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
}

export default function StatsCard({ icon, label, value, iconBg }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-soft-md transition-smooth">
      <div className="flex items-center space-x-4">
        <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center text-white shadow-soft`}>
          {iconMap[icon]}
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-1.5 font-medium">{label}</p>
          <p className="text-2xl font-semibold text-neutral-900">{value}</p>
        </div>
      </div>
    </div>
  )
}
