export default function StatsCard({ icon, label, value, iconBg }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}
