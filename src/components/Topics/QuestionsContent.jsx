import { useState } from 'react'
import { Target, CheckCircle, XCircle, HelpCircle, ChevronLeft, ChevronRight, BookOpen, X, ZoomIn } from 'lucide-react'

export default function QuestionsContent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [selectedImageModal, setSelectedImageModal] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})

  const stats = {
    total: 24,
    correct: 18,
    incorrect: 4,
    unanswered: 2
  }

  const sampleQuestions = [
    {
      id: 1,
      text: 'Şəkildə göstərilən yol nişanı nəyi bildirir?',
      options: ['Dayanmaq qadağandır', 'Durmaq qadağandır', 'Ötmə qadağandır', 'Sürət məhdudiyyəti'],
      correctAnswer: 1,
      explanation: '"Durmaq qadağandır" nişanı mavi fonda qırmızı dairə içərisində bir xətt şəklindədir. Bu nişan olan ərazidə nəqliyyat vasitələrinin daimi olaraq dayanması qadağandır, lakin yük-boşaltma və sərnişin düşürmə üçün qısa müddətli dayanma icazə verilir.',
      difficulty: 'medium',
      image: 'https://images.unsplash.com/photo-1449247666642-264389f5f5b1?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      text: 'Yol nişanı "Dayanmaq qadağandır" hansı rəngdədir?',
      options: ['Qırmızı', 'Sarı', 'Mavi', 'Yaşıl'],
      correctAnswer: 0,
      explanation: 'Qadağan edici yol nişanları qırmızı rəngdə olur. "Dayanmaq qadağandır" nişanı mavi fonda qırmızı dairə şəklindədir.',
      difficulty: 'easy',
      image: null
    },
    {
      id: 3,
      text: 'Şəhər daxilində icazə verilən maksimum sürət nə qədərdir?',
      options: ['40 km/s', '50 km/s', '60 km/s', '70 km/s'],
      correctAnswer: 2,
      explanation: 'Azərbaycan Respublikasında şəhər və yaşayış məntəqələri daxilində nəqliyyat vasitələri üçün icazə verilən maksimum sürət 60 km/saatdır. Bu, piyada və digər yol istifadəçilərinin təhlükəsizliyini təmin etmək üçün müəyyən edilmişdir.',
      difficulty: 'easy',
      image: null
    },
    {
      id: 4,
      text: 'Döngədə hərəkət edərkən hansı sürücü üstünlük hüququna malikdir?',
      options: ['Döngəyə daxil olan', 'Döngədə olan', 'Sağdan gələn', 'Soldan gələn'],
      correctAnswer: 1,
      explanation: 'Döngədə artıq hərəkət edən nəqliyyat vasitələri üstünlük hüququna malikdir. Döngəyə daxil olmaq istəyən sürücülər döngədə olan nəqliyyata yol verməlidirlər.',
      difficulty: 'hard',
      image: null
    },
    {
      id: 5,
      text: 'Təhlükəli yük daşıyan avtomobillər hansı nişanla işarələnməlidir?',
      options: ['Qırmızı üçbucaq', 'Narıncı romb', 'Sarı kvadrat', 'Mavi dairə'],
      correctAnswer: 1,
      explanation: 'Təhlükəli yük daşıyan nəqliyyat vasitələri narıncı rəngdə romb şəklində xüsusi tanınma nişanı ilə işarələnməlidir. Bu, yolda digər sürücüləri xəbərdar etmək üçündür.',
      difficulty: 'medium',
      image: null
    },
    {
      id: 6,
      text: 'Piyada keçidi qarşısında sürücü nə etməlidir?',
      options: ['Sürəti artırır', 'Siqnal verir', 'Yavaşlayır və hazır olur', 'Davam edir'],
      correctAnswer: 2,
      explanation: 'Piyada keçidi qarşısında sürücü sürəti azaltmalı və piyadalara yol vermək üçün hazır olmalıdır. Piyada təhlükəsizliyi yol hərəkətinin ən vacib aspektlərindən biridir.',
      difficulty: 'easy',
      image: null
    },
    {
      id: 7,
      text: 'Avtomobil yolunda maksimum yol verməkdən imtina edilə bilməz?',
      options: ['Təcili yardım avtomobilləri', 'Taksi avtomobilləri', 'Marşrut avtomobilləri', 'Avtobus'],
      correctAnswer: 0,
      explanation: 'Təcili yardım avtomobilləri xüsusi siqnalları işıqlandırılmış halda hərəkət edərkən bütün nəqliyyat vasitələri onlara yol verməlidirlər.',
      difficulty: 'medium',
      image: null
    },
    {
      id: 8,
      text: 'Yolun sol tərəfində dayanmaq icazə verilirmi?',
      options: ['Heç vaxt', 'Yalnız birməhəllili yollarda', 'Hər yerdə', 'Yalnız gecə saatlarında'],
      correctAnswer: 1,
      explanation: 'Yolun sol tərəfində dayanmaq yalnız birməhəllili yollarda və yolun hər iki tərəfində fasilə xətti olan hallarda icazə verilir.',
      difficulty: 'hard',
      image: null
    },
    {
      id: 9,
      text: 'Qırmızı svetofor siqnalında nə etməlisiniz?',
      options: ['Yavaş-yavaş keçmək', 'Dayanmaq', 'Sürətlə keçmək', 'Gözləmək'],
      correctAnswer: 1,
      explanation: 'Qırmızı svetofor siqnalı hərəkəti qadağan edir. Sürücü dayanma xəttindən əvvəl dayanmalıdır.',
      difficulty: 'easy',
      image: null
    },
    {
      id: 10,
      text: 'Şəhər xaricində icazə verilən maksimum sürət nə qədərdir?',
      options: ['70 km/s', '80 km/s', '90 km/s', '100 km/s'],
      correctAnswer: 2,
      explanation: 'Şəhər xaricində yaşayış məntəqələri xaricində icazə verilən maksimum sürət 90 km/saatdır.',
      difficulty: 'easy',
      image: null
    },
    {
      id: 11,
      text: 'Nəqliyyat vasitəsinin texniki vəziyyəti hansı hallarda yoxlanılır?',
      options: ['İldə 1 dəfə', 'İldə 2 dəfə', 'Hər ay', 'Hər həftə'],
      correctAnswer: 0,
      explanation: 'Nəqliyyat vasitələrinin texniki vəziyyəti ildə bir dəfə müntəzəm yoxlanılır.',
      difficulty: 'medium',
      image: null
    },
    {
      id: 12,
      text: 'Avtomagistralda minimum sürət nə qədərdir?',
      options: ['40 km/s', '50 km/s', '60 km/s', '70 km/s'],
      correctAnswer: 2,
      explanation: 'Avtomagistralda minimum hərəkət sürəti 60 km/saatdır. Bu, yolun axıcılığını təmin etmək üçün müəyyən edilmişdir.',
      difficulty: 'hard',
      image: null
    }
  ]

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const userAnswer = userAnswers[currentQuestion.id]
  const isAnswered = userAnswer !== undefined

  const handleAnswerSelect = (optionIndex) => {
    if (isAnswered) return // Prevent re-answering
    
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }))
    
    // Auto-expand explanation if wrong answer
    if (optionIndex !== currentQuestion.correctAnswer) {
      setShowExplanation(true)
    } else {
      setShowExplanation(false)
    }
  }

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index)
    const question = sampleQuestions[index]
    const answer = userAnswers[question.id]
    
    // Show explanation if question was answered incorrectly
    if (answer !== undefined && answer !== question.correctAnswer) {
      setShowExplanation(true)
    } else {
      setShowExplanation(false)
    }
  }

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      goToQuestion(currentQuestionIndex - 1)
    }
  }

  const goToNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      goToQuestion(currentQuestionIndex + 1)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'hard': return 'bg-rose-100 text-rose-700 border-rose-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
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

  const isCorrect = isAnswered && userAnswer === currentQuestion.correctAnswer

  return (
    <div className="max-w-[900px] mx-auto pb-8">
      {/* Stats Overview - Modern & Minimal */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-4 mb-6 shadow-sm">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-2 shadow-lg shadow-blue-500/25">
              <Target className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{stats.total}</p>
            <p className="text-xs text-gray-500 font-medium">Ümumi</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl mb-2 shadow-lg shadow-emerald-500/25">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{stats.correct}</p>
            <p className="text-xs text-gray-500 font-medium">Düzgün</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl mb-2 shadow-lg shadow-rose-500/25">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{stats.incorrect}</p>
            <p className="text-xs text-gray-500 font-medium">Səhv</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-xl mb-2 shadow-lg shadow-gray-500/25">
              <HelpCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-0.5">{stats.unanswered}</p>
            <p className="text-xs text-gray-500 font-medium">Cavabsız</p>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border-2 border-gray-200 rounded-3xl shadow-xl overflow-hidden mb-6 transition-all duration-300 hover:shadow-2xl">
        {/* Question Header */}
        <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#007A3A] to-[#005A2A] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#007A3A]/30">
                {currentQuestionIndex + 1}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Sual {currentQuestionIndex + 1} / {sampleQuestions.length}</p>
                <p className="text-xs text-gray-500">Bu mövzu üzrə test sualları</p>
              </div>
            </div>
            <span className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {getDifficultyLabel(currentQuestion.difficulty)}
            </span>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-8">
          {/* Question Image (if exists) */}
          {currentQuestion.image && (
            <div className="mb-6 relative group">
              <img 
                src={currentQuestion.image} 
                alt="Sual şəkli"
                className="w-full rounded-2xl shadow-lg cursor-pointer transition-transform hover:scale-[1.02]"
                onClick={() => setSelectedImageModal(currentQuestion.image)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-2xl transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
                  <ZoomIn className="w-6 h-6 text-gray-700" />
                </div>
              </div>
            </div>
          )}

          {/* Question Text */}
          <p className="text-lg font-semibold text-gray-900 leading-relaxed mb-6">
            {currentQuestion.text}
          </p>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, optIndex) => {
              const isThisCorrect = optIndex === currentQuestion.correctAnswer
              const isThisSelected = optIndex === userAnswer
              const showAsCorrect = isAnswered && isThisCorrect
              const showAsWrong = isAnswered && isThisSelected && !isThisCorrect

              return (
                <button
                  key={optIndex}
                  onClick={() => handleAnswerSelect(optIndex)}
                  disabled={isAnswered}
                  className={`w-full px-5 py-4 rounded-2xl text-left text-sm font-medium transition-all duration-300 ${
                    showAsCorrect
                      ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-500 text-emerald-900 shadow-lg shadow-emerald-500/20'
                      : showAsWrong
                        ? 'bg-gradient-to-r from-rose-50 to-rose-100 border-2 border-rose-500 text-rose-900 shadow-lg shadow-rose-500/20'
                        : isAnswered
                          ? 'bg-gray-50 border-2 border-gray-200 text-gray-500'
                          : 'bg-gray-50 border-2 border-gray-200 text-gray-700 hover:bg-gradient-to-r hover:from-[#007A3A]/5 hover:to-[#007A3A]/10 hover:border-[#007A3A] hover:shadow-md cursor-pointer active:scale-[0.98]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        showAsCorrect
                          ? 'bg-emerald-500 text-white'
                          : showAsWrong
                            ? 'bg-rose-500 text-white'
                            : isAnswered
                              ? 'bg-gray-200 text-gray-600'
                              : 'bg-gray-200 text-gray-700'
                      }`}>
                        {String.fromCharCode(65 + optIndex)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {showAsCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    )}
                    {showAsWrong && (
                      <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Result Badge */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border-2 mb-4 ${
              isCorrect 
                ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-300' 
                : 'bg-gradient-to-r from-rose-50 to-rose-100 border-rose-300'
            }`}>
              <div className="flex items-center justify-between">
                <p className={`font-bold text-sm ${
                  isCorrect ? 'text-emerald-800' : 'text-rose-800'
                }`}>
                  {isCorrect ? '✓ Əla! Düzgün cavab verdiz' : '✗ Təəssüf ki, cavab düzgün deyil'}
                </p>
                {!isCorrect && (
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/80 hover:bg-white rounded-xl text-xs font-semibold text-gray-700 transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    {showExplanation ? 'İzahı gizlət' : 'İzaha bax'}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Explanation Section */}
          {isAnswered && (isCorrect || showExplanation) && (
            <div className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
              isCorrect
                ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-200'
                : 'bg-gradient-to-br from-blue-50 to-white border-blue-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  isCorrect ? 'bg-emerald-500' : 'bg-blue-500'
                } shadow-lg`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-gray-900 mb-2">İzah</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation - Compact for 50 questions */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3">
        <div className="flex items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentQuestionIndex === 0}
            className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              currentQuestionIndex === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-[#007A3A] to-[#005A2A] text-white hover:shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Question Numbers - Scrollable */}
          <div className="flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5 min-w-min px-0.5 py-1">
              {sampleQuestions.map((_, index) => {
                const questionAnswer = userAnswers[sampleQuestions[index].id]
                const isQuestionAnswered = questionAnswer !== undefined
                const isQuestionCorrect = isQuestionAnswered && questionAnswer === sampleQuestions[index].correctAnswer
                
                return (
                  <button
                    key={index}
                    onClick={() => goToQuestion(index)}
                    className={`flex-shrink-0 w-8 h-8 rounded-lg font-semibold text-xs transition-all ${
                      index === currentQuestionIndex
                        ? 'bg-gradient-to-br from-[#007A3A] to-[#005A2A] text-white shadow-md ring-2 ring-[#007A3A]/30 ring-offset-1 scale-110'
                        : isQuestionAnswered
                          ? isQuestionCorrect
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm'
                            : 'bg-rose-500 text-white hover:bg-rose-600 shadow-sm'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-300'
                    } hover:scale-105 active:scale-95`}
                  >
                    {index + 1}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentQuestionIndex === sampleQuestions.length - 1}
            className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              currentQuestionIndex === sampleQuestions.length - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-[#007A3A] to-[#005A2A] text-white hover:shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImageModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImageModal(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] animate-in zoom-in duration-200">
            <button
              onClick={() => setSelectedImageModal(null)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <img
              src={selectedImageModal}
              alt="Böyüdülmüş şəkil"
              className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}
