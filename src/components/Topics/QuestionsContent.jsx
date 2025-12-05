import { Play, AlertCircle, CheckCircle } from 'lucide-react'

export default function QuestionsContent() {
  const stats = {
    total: 20,
    correct: 15,
    incorrect: 3,
    unanswered: 2
  }

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Ümumi sual</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
          <p className="text-sm text-green-700">Düzgün</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{stats.incorrect}</p>
          <p className="text-sm text-red-700">Səhv</p>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="bg-[#007A3A] text-white rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg mb-2">Mövzu üzrə test</h3>
            <p className="text-green-100 text-sm">
              {stats.total} sual • Təxmini müddət: 20 dəqiqə
            </p>
          </div>
          <button className="px-6 py-3 bg-white hover:bg-gray-50 text-[#007A3A] font-semibold rounded-xl transition-colors shadow-sm flex items-center gap-2 whitespace-nowrap">
            <Play className="w-5 h-5" />
            <span>Testə başla</span>
          </button>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#007A3A] hover:shadow-sm transition-all text-left">
          <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Səhv etdiklərim</p>
            <p className="text-sm text-gray-500">{stats.incorrect} səhv sual</p>
          </div>
        </button>

        <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#007A3A] hover:shadow-sm transition-all text-left">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">Düzgün cavablarım</p>
            <p className="text-sm text-gray-500">{stats.correct} düzgün cavab</p>
          </div>
        </button>
      </div>

      {/* Empty state for practice questions */}
      <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl">
        <p className="text-gray-600 font-medium mb-1">Sınaq sualları</p>
        <p className="text-sm text-gray-500">Tezliklə əlavə ediləcək</p>
      </div>
    </div>
  )
}
