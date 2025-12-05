import { Target, TrendingUp, CheckCircle, XCircle, Clock, MessageCircle, Search, AlertCircle, Play } from 'lucide-react'
import { useState } from 'react'

export default function QuestionsContent({ questions = [], onQuestionClick }) {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = {
    total: 20,
    correct: 15,
    incorrect: 3,
    unanswered: 2
  }

  const filteredQuestions = questions.filter(q => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'waiting' ? q.status === 'waiting' :
      filter === 'answered' ? q.status === 'answered' :
      true

    const matchesSearch = 
      searchQuery === '' ||
      q.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topicTitle.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const getStatusConfig = (status) => {
    const configs = {
      waiting: {
        label: 'Gözləyir',
        icon: Clock,
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200'
      },
      answered: {
        label: 'Cavablandı',
        icon: CheckCircle,
        className: 'bg-green-50 text-green-700 border-green-200'
      },
      closed: {
        label: 'Bağlandı',
        icon: CheckCircle,
        className: 'bg-gray-100 text-gray-600 border-gray-200'
      }
    }
    return configs[status] || configs.waiting
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'İndi'
    if (diffInHours < 24) return `${diffInHours} saat əvvəl`
    
    return date.toLocaleDateString('az-AZ', { 
      day: 'numeric',
      month: 'short'
    })
  }

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Sual-cavab Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Sual-cavab</h3>
        <p className="text-sm text-gray-600 mb-6">Müəllimə göndərdiyiniz suallar və cavablar</p>

        {/* Search and Filter */}
        {questions.length > 0 && (
          <div className="mb-6 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Mövzu və ya açar söz ilə axtarın..."
                className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007A3A] focus:border-transparent text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  filter === 'all'
                    ? 'bg-[#007A3A] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Hamısı ({questions.length})
              </button>
              <button
                onClick={() => setFilter('waiting')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  filter === 'waiting'
                    ? 'bg-[#007A3A] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Gözləyənlər ({questions.filter(q => q.status === 'waiting').length})
              </button>
              <button
                onClick={() => setFilter('answered')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  filter === 'answered'
                    ? 'bg-[#007A3A] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                Cavablananlar ({questions.filter(q => q.status === 'answered').length})
              </button>
            </div>
          </div>
        )}

        {/* Questions List */}
        {filteredQuestions.length > 0 ? (
          <div className="space-y-3">
            {filteredQuestions.map((question) => {
              const statusConfig = getStatusConfig(question.status)
              const StatusIcon = statusConfig.icon

              return (
                <div
                  key={question.id}
                  onClick={() => onQuestionClick(question)}
                  className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-md hover:border-[#007A3A] transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {question.topicCode} · {question.topicTitle}
                        </h4>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-xs font-medium whitespace-nowrap ${statusConfig.className}`}>
                          <StatusIcon className="w-3 h-3" />
                          <span>{statusConfig.label}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{formatDate(question.createdAt)}</p>
                      <p className="text-sm text-gray-700 line-clamp-2">{question.message}</p>
                      {question.replies && question.replies.length > 0 && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{question.replies.length} cavab</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button className="text-xs font-medium text-[#007A3A] hover:text-[#005A2A] flex items-center gap-1">
                      <span>Detallara bax</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : questions.length === 0 ? (
          // Empty state - no questions at all
          <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-900 font-semibold mb-2">Hələ sualınız yoxdur</p>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              Mövzudan çıxmadan "Müəllimlə əlaqə" ilə sual verin
            </p>
          </div>
        ) : (
          // No results for current filter/search
          <div className="text-center py-12 bg-gray-50 border border-gray-200 rounded-xl">
            <p className="text-gray-600 font-medium mb-1">Heç bir nəticə tapılmadı</p>
            <p className="text-sm text-gray-500">Başqa filtr və ya açar söz sınayın</p>
          </div>
        )}
      </div>

      {/* Quiz Stats Section */}
      <div className="pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Test statistikası</h3>

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
        <div className="grid sm:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-xl hover:border-[#007A3A] hover:shadow-sm transition-all text-left">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-red-600" />
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
      </div>
    </div>
  )
}
