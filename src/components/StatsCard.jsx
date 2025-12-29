import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

const iconMap = {
  CheckCircle: <CheckCircle className="w-6 h-6" />,
  AlertCircle: <AlertCircle className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
}

export default function StatsCard({ icon, label, value, iconBg }) {
  return (
    <div className="card p-6 hover:shadow-soft-md transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center text-white`}>
          {iconMap[icon]}
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  )
}
