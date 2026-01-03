import React, { useState } from 'react';
import { ArrowLeft, Calendar, CheckCircle, XCircle, Clock, Award, ChevronRight } from 'lucide-react';

export default function ResultsPage({ resultId, onBack }) {
  const [selectedId, setSelectedId] = useState(resultId);

  // Mock Data
  const results = [
    { id: 1, date: '11.12.2025', time: '10:00', score: 94, status: 'passed' },
    { id: 2, date: '09.12.2025', time: '15:10', score: 82, status: 'passed' },
    { id: 3, date: '07.12.2025', time: '11:20', score: 85, status: 'passed' },
    { id: 4, date: '05.12.2025', time: '16:45', score: 68, status: 'failed' },
    { id: 5, date: '03.12.2025', time: '09:30', score: 72, status: 'passed' },
    { id: 6, date: '01.12.2025', time: '14:00', score: 65, status: 'failed' },
  ];

  // Mock Questions for Detail View
  // Using useState to keep mock data stable across renders if needed, but for now simple constant is fine
  // provided it's deterministic enough for the session or re-calculated on mount.
  // We'll just generate it once inside the component render or outside.
  // Better to memoize or keep simple.

  const mockQuestions = React.useMemo(() => {
    return Array(10).fill(null).map((_, i) => {
        const options = ['A', 'B', 'C', 'D'];
        const correctOpt = options[Math.floor(Math.random() * options.length)];
        // 70% chance of being correct
        const isCorrect = Math.random() > 0.3;
        let userOpt = correctOpt;

        if (!isCorrect) {
            // Pick a wrong answer
            const wrongOptions = options.filter(o => o !== correctOpt);
            userOpt = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
        }

        return {
            id: i + 1,
            text: `Yol hərəkəti qaydaları üzrə sual #${i + 1}. Aşağıdakı nişan nəyi bildirir?`,
            isCorrect: isCorrect,
            userAnswer: userOpt,
            correctAnswer: correctOpt,
            options: ['Dayanmaq qadağandır', 'Giriş qadağandır', 'Sürət həddi', 'Ötmə qadağandır']
        };
    });
  }, []); // Empty dependency array ensures it doesn't change on every render

  if (selectedId) {
    // Detail View
    const result = results.find(r => r.id === selectedId) || { date: 'Unknown', time: '00:00', score: 0 };

    return (
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSelectedId(null)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-900">İmtahan Nəticəsi</h2>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {result.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {result.time}</span>
              <span className={`font-bold ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                {result.score}% {result.score >= 70 ? '(Keçdi)' : '(Kəsilmə)'}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto space-y-6">
            {mockQuestions.map((q) => (
              <div key={q.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 flex-shrink-0 ${q.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {q.isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-4">{q.text}</h3>

                    <div className="space-y-3">
                      {q.options.map((optText, idx) => {
                         const optLabel = ['A', 'B', 'C', 'D'][idx];
                         let itemClass = "p-4 rounded-xl border border-gray-200 flex items-center gap-3";

                         const isUserAnswer = optLabel === q.userAnswer;
                         const isCorrectAnswer = optLabel === q.correctAnswer;

                         // Logic:
                         // 1. If User Answer matches this option:
                         //    - If Correct: Green
                         //    - If Wrong: Red
                         // 2. If User Answer does NOT match, but this IS the Correct answer (and user was wrong):
                         //    - Green (to show what was right)

                         if (isUserAnswer) {
                            itemClass = q.isCorrect
                                ? "p-4 rounded-xl border border-green-200 bg-green-50 flex items-center gap-3"
                                : "p-4 rounded-xl border border-red-200 bg-red-50 flex items-center gap-3";
                         } else if (isCorrectAnswer && !q.isCorrect) {
                            itemClass = "p-4 rounded-xl border border-green-200 bg-green-50 flex items-center gap-3";
                         }

                         return (
                           <div key={idx} className={itemClass}>
                             <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                               isUserAnswer
                                 ? (q.isCorrect ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700')
                                 : (isCorrectAnswer && !q.isCorrect ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-500')
                             }`}>
                               {optLabel}
                             </span>
                             <span className="text-gray-900 font-medium">{optText}</span>
                           </div>
                         );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // List View
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-gray-50">
       <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-bold text-gray-900">Nəticələrim</h2>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto grid gap-4">
             {results.map((result) => (
               <div
                 key={result.id}
                 onClick={() => setSelectedId(result.id)}
                 className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
               >
                 <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                     result.score >= 70 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                   }`}>
                     <Award className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900">İmtahan #{result.id}</h4>
                     <p className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                       <Calendar className="w-3.5 h-3.5" /> {result.date}
                       <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                       <Clock className="w-3.5 h-3.5" /> {result.time}
                     </p>
                   </div>
                 </div>

                 <div className="flex items-center gap-6">
                   <div className="text-right">
                     <span className={`block text-xl font-bold ${result.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                       {result.score}%
                     </span>
                     <span className="text-xs font-medium text-gray-400">
                       {result.score >= 70 ? 'Keçdi' : 'Kəsilmə'}
                     </span>
                   </div>
                   <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-primary-600 transition-colors" />
                 </div>
               </div>
             ))}
          </div>
        </main>
    </div>
  );
}
