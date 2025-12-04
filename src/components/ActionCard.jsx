export default function ActionCard({ icon, title, iconColor }) {
  return (
    <button className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all hover:-translate-y-1 text-left group">
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
      </div>
    </button>
  )
}
