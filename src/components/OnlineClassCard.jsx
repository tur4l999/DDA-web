import { Calendar, ExternalLink } from 'lucide-react'

export default function OnlineClassCard({ date, status }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Onlayn dərs</h3>
        <button className="text-primary-600 hover:text-primary-700">
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status:</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700">
            {status}
          </span>
        </div>
      </div>
    </div>
  )
}
