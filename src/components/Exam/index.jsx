import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

const MOCK_QUESTIONS = [
  {
    id: 1,
    question: "Bu nişan nəyi bildirir?",
    image: null, // Add image path if available
    options: [
      { id: 'a', text: "Dayanmaq qadağandır" },
      { id: 'b', text: "Durmaq qadağandır" },
      { id: 'c', text: "Giriş qadağandır" },
      { id: 'd', text: "Bütün məhdudiyyətlərin sonu" }
    ],
    correctAnswer: 'b',
    explanation: "Bu nişan 3.28 'Durmaq qadağandır' nişanıdır. Nəqliyyat vasitələrinin durmasını qadağan edir."
  },
  {
    id: 2,
    question: "Hansı traektoriya üzrə geriyə dönməyə icazə verilir?",
    image: null,
    options: [
      { id: 'a', text: "Yalnız A" },
      { id: 'b', text: "Yalnız B" },
      { id: 'c', text: "Hər ikisi" },
      { id: 'd', text: "Heç biri" }
    ],
    correctAnswer: 'a',
    explanation: "B traektoriyası üzrə dönmə zamanı bütöv xəttin tələbi pozulur."
  }
];

export default function Exam({ onBack }) {
  const [gameState, setGameState] = useState('start'); // start, playing, result
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: selectedOptionId }
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const totalQuestions = MOCK_QUESTIONS.length;

  const handleStart = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowFeedback(false);
  };

  const handleAnswer = (optionId) => {
    if (showFeedback) return; // Prevent changing answer
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowFeedback(false);
    } else {
      setGameState('result');
    }
  };

  if (gameState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">İmtahan Simulyatoru</h1>
        <p className="text-slate-500 mb-8">
          Real imtahan rejimində biliklərinizi yoxlayın. 10 sual, 15 dəqiqə vaxt.
        </p>
        <Button size="lg" onClick={handleStart} className="w-full md:w-auto px-12">
          İmtahana Başla
        </Button>
      </div>
    );
  }

  if (gameState === 'result') {
    const correctCount = MOCK_QUESTIONS.filter(q => answers[q.id] === q.correctAnswer).length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    return (
      <div className="max-w-2xl mx-auto py-8 text-center">
        <Card className="p-8">
          <div className="mb-6">
             {score >= 90 ? (
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
             ) : (
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertCircle className="w-12 h-12 text-orange-600" />
                </div>
             )}
             <h2 className="text-3xl font-bold text-slate-900 mb-2">
                {score >= 90 ? 'Təbrik edirik!' : 'Nəticəniz'}
             </h2>
             <p className="text-slate-500">
                {score >= 90 ? 'Siz imtahandan keçdiniz.' : 'Təəssüf ki, imtahandan kəsildiniz.'}
             </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
             <div className="bg-slate-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-slate-900">{totalQuestions}</div>
                <div className="text-xs text-slate-500">Ümumi Sual</div>
             </div>
             <div className="bg-green-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-green-600">{correctCount}</div>
                <div className="text-xs text-green-600">Düzgün</div>
             </div>
             <div className="bg-red-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-red-600">{totalQuestions - correctCount}</div>
                <div className="text-xs text-red-600">Səhv</div>
             </div>
          </div>

          <div className="flex gap-4 justify-center">
             <Button variant="secondary" onClick={() => setGameState('start')}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Təkrar et
             </Button>
             <Button onClick={() => setGameState('playing')}>Səhvlərə bax</Button> 
             {/* Simple retry for now, ideally would show mistake list */}
          </div>
        </Card>
      </div>
    );
  }

  // Playing State
  return (
    <div className="max-w-3xl mx-auto pb-10">
      {/* Header / Progress */}
      <div className="mb-6 flex items-center justify-between">
         <span className="text-sm font-bold text-slate-500">
            Sual {currentQuestionIndex + 1} / {totalQuestions}
         </span>
         <div className="flex-1 mx-4 h-2 bg-slate-200 rounded-full">
            <div 
               className="h-full bg-primary-500 rounded-full transition-all duration-300"
               style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
         </div>
         <span className="text-sm font-bold text-slate-900">14:20</span>
      </div>

      <Card className="p-6 md:p-8">
         <h2 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">
            {currentQuestion.question}
         </h2>

         {currentQuestion.image && (
            <div className="mb-6 rounded-xl overflow-hidden border border-slate-200">
               <img src={currentQuestion.image} alt="Question" className="w-full h-auto" />
            </div>
         )}

         <div className="space-y-3">
            {currentQuestion.options.map((option) => {
               const isSelected = answers[currentQuestion.id] === option.id;
               const isCorrect = option.id === currentQuestion.correctAnswer;
               
               let variant = "secondary"; // default style
               let extraClasses = "justify-start text-left h-auto py-4 px-5 border-2 hover:border-slate-300";
               
               if (showFeedback) {
                  if (isSelected && isCorrect) {
                     extraClasses += " border-green-500 bg-green-50 text-green-700";
                  } else if (isSelected && !isCorrect) {
                     extraClasses += " border-red-500 bg-red-50 text-red-700";
                  } else if (isCorrect) {
                     extraClasses += " border-green-500 bg-green-50 text-green-700"; // Show correct answer
                  } else {
                     extraClasses += " opacity-50";
                  }
               } else if (isSelected) {
                  extraClasses += " border-primary-500 bg-primary-50 text-primary-700";
               }

               return (
                  <button
                     key={option.id}
                     onClick={() => handleAnswer(option.id)}
                     disabled={showFeedback}
                     className={`w-full rounded-xl flex items-center gap-4 transition-all ${extraClasses}`}
                  >
                     <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                        showFeedback && isCorrect ? 'border-green-500 bg-green-500 text-white' :
                        showFeedback && isSelected && !isCorrect ? 'border-red-500 bg-red-500 text-white' :
                        'border-slate-300 text-slate-500'
                     }`}>
                        {option.id.toUpperCase()}
                     </span>
                     <span className="font-medium text-lg">{option.text}</span>
                  </button>
               );
            })}
         </div>

         {/* Feedback & Next */}
         {showFeedback && (
            <div className="mt-8 pt-6 border-t border-slate-100 animate-slide-up">
               <div className={`p-4 rounded-xl mb-6 ${
                  answers[currentQuestion.id] === currentQuestion.correctAnswer 
                     ? 'bg-green-50 text-green-800' 
                     : 'bg-red-50 text-red-800'
               }`}>
                  <p className="font-bold mb-1">
                     {answers[currentQuestion.id] === currentQuestion.correctAnswer ? 'Düzgündür!' : 'Səhvdir!'}
                  </p>
                  <p className="text-sm">{currentQuestion.explanation}</p>
               </div>
               
               <Button onClick={handleNext} fullWidth size="lg">
                  {currentQuestionIndex < totalQuestions - 1 ? 'Növbəti Sual' : 'Nəticəni Göstər'}
                  <ArrowRight className="w-5 h-5 ml-2" />
               </Button>
            </div>
         )}
      </Card>
    </div>
  );
}
