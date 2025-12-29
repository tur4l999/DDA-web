import { Target, TrendingUp, CheckCircle, XCircle, HelpCircle } from 'lucide-react'

export default function QuestionsContent() {
  const stats = {
    total: 24,
    correct: 18,
    incorrect: 4,
    unanswered: 2
  }

  const sampleQuestions = [
    {
      id: 1,
      text: 'Sürücü hərəkət zamanı əsas yola çıxarkən hansı qaydaya əməl etməlidir?',
      options: ['Sol tərəfə işarə verir', 'Yavaşlayır və yol verir', 'Sürəti artırır', 'Siqnal verir'],
      correctAnswer: 1,
      userAnswer: 1,
      difficulty: 'medium'
    },
    {
      id: 2,
      text: 'Yol nişanı "Dayanmaq qadağandır" hansı rəngdədir?',
      options: ['Qırmızı', 'Sarı', 'Mavi', 'Yaşıl'],
      correctAnswer: 0,
      userAnswer: null,
      difficulty: 'easy'
    },
    {
      id: 3,
      text: 'Şəhər daxilində icazə verilən maksimum sürət nə qədərdir?',
      options: ['40 km/s', '50 km/s', '60 km/s', '70 km/s'],
      correctAnswer: 2,
      userAnswer: 1,
      difficulty: 'easy'
    },
    {
      id: 4,
      text: 'Döngədə hərəkət edərkən hansı sürücü üstünlük hüququna malikdir?',
      options: ['Döngəyə daxil olan', 'Döngədə olan', 'Sağdan gələn', 'Soldan gələn'],
      correctAnswer: 1,
      userAnswer: null,
      difficulty: 'hard'
    },
    {
      id: 5,
      text: 'Təhlükəli yük daşıyan avtomobillər hansı nişanla işarələnməlidir?',
      options: ['Qırmızı üçbucaq', 'Narıncı romb', 'Sarı kvadrat', 'Mavi dairə'],
      correctAnswer: 1,
      userAnswer: 1,
      difficulty: 'medium'
    },
    {
      id: 6,
      text: 'Piyada keçidi qarşısında sürücü nə etməlidir?',
      options: ['Sürəti artırır', 'Siqnal verir', 'Yavaşlayır və hazır olur', 'Davam edir'],
      correctAnswer: 2,
      userAnswer: 3,
      difficulty: 'easy'
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'hard': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Asan'
      case 'medium': return 'Orta'
      case 'hard': return 'Çətin'
      default: return difficulty
    }
  }

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-600">Ümumi</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.correct}</p>
              <p className="text-xs text-gray-600">Düzgün</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.incorrect}</p>
              <p className="text-xs text-gray-600">Səhv</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.unanswered}</p>
              <p className="text-xs text-gray-600">Cavabsız</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Ümumi nəticə</h3>
            <p className="text-sm text-white/80">Bu mövzu üzrə irəliləyişiniz</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">{Math.round((stats.correct / stats.total) * 100)}%</p>
            <p className="text-xs text-white/80">Düzgün cavab</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all"
            style={{ width: `${(stats.correct / stats.total) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Suallar</h3>
          <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-lg transition-colors">
            Yeni test başlat
          </button>
        </div>

        {sampleQuestions.map((question, index) => {
          const isCorrect = question.userAnswer === question.correctAnswer
          const isAnswered = question.userAnswer !== null

          return (
            <div 
              key={question.id}
              className={`bg-white border-2 rounded-xl p-5 transition-all hover:shadow-md ${
                isAnswered
                  ? isCorrect 
                    ? 'border-green-200 bg-green-50/30' 
                    : 'border-red-200 bg-red-50/30'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                  isAnswered
                    ? isCorrect
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <p className="text-sm font-semibold text-gray-900 leading-relaxed">
                      {question.text}
                    </p>
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${getDifficultyColor(question.difficulty)}`}>
                      {getDifficultyLabel(question.difficulty)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          isAnswered
                            ? optIndex === question.correctAnswer
                              ? 'bg-green-100 border-2 border-green-500 text-green-900 font-semibold'
                              : optIndex === question.userAnswer && !isCorrect
                                ? 'bg-red-100 border-2 border-red-500 text-red-900'
                                : 'bg-gray-50 text-gray-600'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer'
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                        {option}
                        {isAnswered && optIndex === question.correctAnswer && (
                          <CheckCircle className="w-4 h-4 text-green-600 inline-block ml-2" />
                        )}
                        {isAnswered && optIndex === question.userAnswer && !isCorrect && (
                          <XCircle className="w-4 h-4 text-red-600 inline-block ml-2" />
                        )}
                      </div>
                    ))}
                  </div>

                  {isAnswered && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                    }`}>
                      <p className={`text-xs font-semibold ${
                        isCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {isCorrect ? '✓ Düzgün cavab!' : '✗ Səhv cavab'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
